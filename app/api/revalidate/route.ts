import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { CACHE_TAGS, SITE_URL } from "@/shared/lib/site-config";

type RevalidatePayload = {
  secret?: unknown;
  path?: unknown;
  paths?: unknown;
  tag?: unknown;
  tags?: unknown;
  event?: unknown;
  model?: unknown;
  uid?: unknown;
  contentType?: unknown;
  collectionType?: unknown;
  warm?: unknown;
  entry?: unknown;
};

type RevalidationPathTarget = {
  path: string;
  type?: "page" | "layout";
};

type WarmResult = {
  path: string;
  ok: boolean;
  status?: number;
  error?: string;
};

const WARM_EVENTS = new Set(["entry.create", "entry.publish"]);

const MODEL_ALIASES = {
  page: ["page", "pages"],
  news: ["novina", "novinas", "news", "article", "articles"],
  subdivision: ["subdivision", "subdivisions", "subdiv"],
  vidilenya: ["vidilenya", "vidilenyas", "department", "departments"],
  cycleCommission: [
    "cycle-commission",
    "cycle-commissions",
    "cyclecommission",
    "cyclecommissions",
    "cmk",
    "cmks",
  ],
  worker: ["worker", "workers", "teacher", "teachers", "person", "personnel", "employee"],
  group: ["group", "groups", "student-group", "student-groups"],
  partner: ["partner", "partners"],
  event: ["event", "events"],
  media: ["video", "videos", "panorama", "panoramas", "media", "upload-file", "file"],
  home: ["home", "homepage", "home-page", "home-hero", "hero", "slide", "slides", "advertisement"],
  header: ["header", "headers", "navigation", "menu"],
  footer: ["footer", "footers"],
};

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readScalarString(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return readString(value);
}

function readBearerSecret(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const match = authorization?.match(/^Bearer\s+(.+)$/i);

  return match?.[1]?.trim() ?? "";
}

function readRequestSecret(payload: RevalidatePayload, request: NextRequest) {
  return (
    readString(payload.secret) ||
    request.nextUrl.searchParams.get("secret")?.trim() ||
    readBearerSecret(request)
  );
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readField(source: unknown, key: string) {
  const record = asRecord(source);

  if (!record) {
    return undefined;
  }

  if (key in record) {
    return record[key];
  }

  const attributes = asRecord(record.attributes);

  return attributes?.[key];
}

function readTextField(source: unknown, keys: readonly string[]) {
  for (const key of keys) {
    const value = readScalarString(readField(source, key));

    if (value) {
      return value;
    }
  }

  return "";
}

function readRelationTextField(source: unknown, relationKey: string, fieldKey = "slug") {
  const relation = readField(source, relationKey);
  const directValue = readTextField(relation, [fieldKey]);

  if (directValue) {
    return directValue;
  }

  const data = readField(relation, "data");

  if (Array.isArray(data)) {
    for (const item of data) {
      const itemValue = readTextField(item, [fieldKey]);

      if (itemValue) {
        return itemValue;
      }
    }

    return "";
  }

  return readTextField(data, [fieldKey]);
}

function normalizePath(value: unknown) {
  const rawPath = readString(value);

  if (!rawPath) {
    return null;
  }

  let path = rawPath;

  if (/^[a-z][a-z\d+.-]*:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname;
    } catch {
      return null;
    }
  }

  const [withoutQuery] = path.split(/[?#]/);
  const normalized = `/${withoutQuery.replace(/^\/+/, "")}`
    .replace(/\/{2,}/g, "/")
    .replace(/\/+$/, "");
  const normalizedPath = normalized || "/";

  if (normalizedPath.length > 1024) {
    return null;
  }

  return normalizedPath;
}

function normalizeModelName(value: unknown) {
  const rawModel = readString(value);

  if (!rawModel) {
    return "";
  }

  const withoutNamespace = rawModel.includes("::")
    ? rawModel.split("::").at(-1) ?? rawModel
    : rawModel;
  const leafModel = withoutNamespace.split(".").at(-1) ?? withoutNamespace;

  return leafModel
    .replace(/([a-z\d])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function readPayloadModel(payload: RevalidatePayload) {
  return (
    normalizeModelName(payload.model) ||
    normalizeModelName(payload.uid) ||
    normalizeModelName(payload.contentType) ||
    normalizeModelName(payload.collectionType)
  );
}

function isModel(model: string, aliases: readonly string[]) {
  return aliases.includes(model);
}

function encodePathSegment(value: string) {
  try {
    return encodeURIComponent(decodeURIComponent(value));
  } catch {
    return encodeURIComponent(value);
  }
}

function readEntryPageUrl(entry: unknown) {
  return normalizePath(readTextField(entry, ["page_url", "pageUrl", "url_path", "urlPath"]));
}

function readLastPathSegment(value: unknown) {
  return normalizePath(value)?.split("/").filter(Boolean).at(-1) ?? "";
}

function readEntrySlug(entry: unknown) {
  return readTextField(entry, ["slug", "cmkSlug", "subdivSlug", "vidilenyaSlug"]);
}

function readNewsDateSegments(entry: unknown) {
  const date = readTextField(entry, ["date", "publishedAt", "createdAt"]);
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match) {
    return null;
  }

  return {
    year: match[1],
    month: match[2],
    day: match[3],
  };
}

function createTargetKey(target: RevalidationPathTarget) {
  return `${target.type ?? "literal"}:${target.path}`;
}

function addPathTarget(
  targets: Map<string, RevalidationPathTarget>,
  value: unknown,
  type?: RevalidationPathTarget["type"],
) {
  const path = normalizePath(value);

  if (!path) {
    return;
  }

  const target = { path, type };
  targets.set(createTargetKey(target), target);
}

function addSegmentPath(
  targets: Map<string, RevalidationPathTarget>,
  basePath: string,
  segment: string,
) {
  if (segment) {
    addPathTarget(targets, `${basePath}/${encodePathSegment(segment)}`);
  }
}

function addTags(tags: Set<string>, values: readonly string[]) {
  values.forEach((tag) => tags.add(tag));
}

function collectManualPathTargets(payload: RevalidatePayload) {
  const targets = new Map<string, RevalidationPathTarget>();

  addPathTarget(targets, payload.path);

  if (Array.isArray(payload.paths)) {
    payload.paths.forEach((path) => addPathTarget(targets, path));
  }

  addPathTarget(targets, readEntryPageUrl(payload.entry));

  return targets;
}

function collectModelRevalidation(payload: RevalidatePayload) {
  const model = readPayloadModel(payload);
  const entry = payload.entry;
  const targets = new Map<string, RevalidationPathTarget>();
  const tags = new Set<string>();
  const pageUrl = readEntryPageUrl(entry);

  if (pageUrl) {
    addTags(tags, [CACHE_TAGS.page, CACHE_TAGS.pageSeo, CACHE_TAGS.routes]);
    addPathTarget(targets, pageUrl);
  }

  if (!model) {
    return { tags, targets };
  }

  if (isModel(model, MODEL_ALIASES.page)) {
    addTags(tags, [CACHE_TAGS.page, CACHE_TAGS.pageSeo, CACHE_TAGS.routes]);
    return { tags, targets };
  }

  if (isModel(model, MODEL_ALIASES.news)) {
    const date = readNewsDateSegments(entry);
    const newsId = readTextField(entry, ["id", "documentId"]);

    addTags(tags, [CACHE_TAGS.news, CACHE_TAGS.home]);
    addPathTarget(targets, "/");
    addPathTarget(targets, "/novina");

    if (date) {
      addPathTarget(targets, `/novina/${date.year}/${date.month}`);
    } else {
      addPathTarget(targets, "/novina/[year]/[month]", "page");
    }

    if (date && newsId) {
      addPathTarget(targets, `/novina/${date.year}/${date.month}/${date.day}/${newsId}`);
    } else {
      addPathTarget(targets, "/novina/[year]/[month]/[day]/[id]", "page");
    }

    return { tags, targets };
  }

  if (isModel(model, MODEL_ALIASES.subdivision)) {
    const slug = readEntrySlug(entry) || readLastPathSegment(pageUrl);

    addTags(tags, [CACHE_TAGS.structure, CACHE_TAGS.routes, CACHE_TAGS.pageSeo]);
    addPathTarget(targets, "/structure/subdiv");
    addSegmentPath(targets, "/structure/subdiv", slug);

    if (!slug) {
      addPathTarget(targets, "/structure/subdiv/[subdivSlug]", "page");
    }

    return { tags, targets };
  }

  if (isModel(model, MODEL_ALIASES.vidilenya)) {
    const slug = readEntrySlug(entry) || readLastPathSegment(pageUrl);

    addTags(tags, [CACHE_TAGS.structure, CACHE_TAGS.routes, CACHE_TAGS.pageSeo]);
    addPathTarget(targets, "/structure/vidilenya");
    addSegmentPath(targets, "/structure/vidilenya", slug);

    if (!slug) {
      addPathTarget(targets, "/structure/vidilenya/[vidilenyaSlug]", "page");
    }

    return { tags, targets };
  }

  if (isModel(model, MODEL_ALIASES.cycleCommission)) {
    const slug = readEntrySlug(entry) || readLastPathSegment(pageUrl);

    addTags(tags, [
      CACHE_TAGS.structure,
      CACHE_TAGS.routes,
      CACHE_TAGS.pageSeo,
      CACHE_TAGS.personnel,
      CACHE_TAGS.schedule,
    ]);
    addPathTarget(targets, "/structure/cmks");
    addPathTarget(targets, "/pro-zhbphc/viklad-sklad");
    addPathTarget(targets, "/rozklad");
    addPathTarget(targets, "/rozklad/vikladach");
    addSegmentPath(targets, "/structure/cmks", slug);
    addPathTarget(targets, "/structure/cmks/[cmkSlug]/[teacherSlug]", "page");

    if (!slug) {
      addPathTarget(targets, "/structure/cmks/[cmkSlug]", "page");
    }

    return { tags, targets };
  }

  if (isModel(model, MODEL_ALIASES.worker)) {
    const teacherSlug = readEntrySlug(entry) || readTextField(entry, ["teacherSlug"]);
    const cmkSlug =
      readTextField(entry, ["cycle_commission_slug", "cycleCommissionSlug", "cmkSlug"]) ||
      readRelationTextField(entry, "cycle_commission") ||
      readRelationTextField(entry, "cycleCommission");

    addTags(tags, [
      CACHE_TAGS.personnel,
      CACHE_TAGS.schedule,
      CACHE_TAGS.structure,
      CACHE_TAGS.routes,
      CACHE_TAGS.pageSeo,
    ]);
    addPathTarget(targets, "/pro-zhbphc/viklad-sklad");
    addPathTarget(targets, "/pro-zhbphc/administracia");
    addPathTarget(targets, "/pro-zhbphc/kontakty");
    addPathTarget(targets, "/rozklad");
    addPathTarget(targets, "/rozklad/vikladach");
    addPathTarget(targets, "/structure/cmks");
    addSegmentPath(targets, "/rozklad/vikladach", teacherSlug);

    if (cmkSlug) {
      addSegmentPath(targets, "/structure/cmks", cmkSlug);
    }

    if (cmkSlug && teacherSlug) {
      addPathTarget(
        targets,
        `/structure/cmks/${encodePathSegment(cmkSlug)}/${encodePathSegment(teacherSlug)}`,
      );
    } else {
      addPathTarget(targets, "/structure/cmks/[cmkSlug]/[teacherSlug]", "page");
    }

    if (!teacherSlug) {
      addPathTarget(targets, "/rozklad/vikladach/[teacherSlug]", "page");
    }

    return { tags, targets };
  }

  if (isModel(model, MODEL_ALIASES.group)) {
    const groupName = readTextField(entry, ["name", "groupName", "slug"]);

    addTags(tags, [CACHE_TAGS.schedule, CACHE_TAGS.routes]);
    addPathTarget(targets, "/rozklad");
    addPathTarget(targets, "/rozklad/grupa");
    addSegmentPath(targets, "/rozklad/grupa", groupName);

    if (!groupName) {
      addPathTarget(targets, "/rozklad/grupa/[groupName]", "page");
    }

    return { tags, targets };
  }

  if (isModel(model, MODEL_ALIASES.partner)) {
    addTags(tags, [CACHE_TAGS.partners, CACHE_TAGS.home, CACHE_TAGS.page]);
    addPathTarget(targets, "/");
    return { tags, targets };
  }

  if (isModel(model, MODEL_ALIASES.event)) {
    addTags(tags, [CACHE_TAGS.events, CACHE_TAGS.home]);
    addPathTarget(targets, "/");
    return { tags, targets };
  }

  if (isModel(model, MODEL_ALIASES.media)) {
    addTags(tags, [CACHE_TAGS.media, CACHE_TAGS.routes]);
    addPathTarget(targets, "/pro-zhbphc/video-and-3d");
    return { tags, targets };
  }

  if (isModel(model, MODEL_ALIASES.home)) {
    addTags(tags, [CACHE_TAGS.home, CACHE_TAGS.header]);
    addPathTarget(targets, "/");
    return { tags, targets };
  }

  if (isModel(model, MODEL_ALIASES.header)) {
    addTags(tags, [CACHE_TAGS.header, CACHE_TAGS.routes]);
    addPathTarget(targets, "/", "layout");
    return { tags, targets };
  }

  if (isModel(model, MODEL_ALIASES.footer)) {
    addTags(tags, [CACHE_TAGS.footer, CACHE_TAGS.routes]);
    addPathTarget(targets, "/", "layout");
  }

  return { tags, targets };
}

function collectPathTargets(payload: RevalidatePayload) {
  const targets = collectManualPathTargets(payload);
  const modelTargets = collectModelRevalidation(payload).targets;

  modelTargets.forEach((target) => targets.set(createTargetKey(target), target));

  return Array.from(targets.values());
}

function collectTags(payload: RevalidatePayload) {
  const tags = new Set<string>();
  const addTag = (value: unknown) => {
    const tag = readString(value);

    if (tag) {
      tags.add(tag);
    }
  };

  addTag(payload.tag);

  if (Array.isArray(payload.tags)) {
    payload.tags.forEach(addTag);
  }

  collectModelRevalidation(payload).tags.forEach((tag) => tags.add(tag));

  return Array.from(tags);
}

function shouldWarmPaths(payload: RevalidatePayload) {
  return payload.warm === true || WARM_EVENTS.has(readString(payload.event));
}

async function warmPath(path: string): Promise<WarmResult> {
  try {
    const response = await fetch(new URL(path, SITE_URL), {
      cache: "no-store",
      headers: {
        "x-revalidate-warmup": "1",
      },
    });

    return {
      path,
      ok: response.ok,
      status: response.status,
    };
  } catch (error) {
    return {
      path,
      ok: false,
      error: error instanceof Error ? error.message : "Unknown warm-up error",
    };
  }
}

export async function POST(request: NextRequest) {
  let payload: RevalidatePayload;

  try {
    payload = (await request.json()) as RevalidatePayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  const secret = readRequestSecret(payload, request);

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET is not configured" },
      { status: 500 },
    );
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const tags = collectTags(payload);
  const pathTargets = collectPathTargets(payload);

  if (tags.length === 0 && pathTargets.length === 0) {
    const isWebhookPayload = Boolean(readString(payload.event));

    return NextResponse.json(
      {
        ok: isWebhookPayload,
        skipped: isWebhookPayload,
        error: isWebhookPayload ? undefined : "Missing paths or tags to revalidate",
      },
      { status: isWebhookPayload ? 200 : 400 },
    );
  }

  tags.forEach((tag) => revalidateTag(tag, "max"));
  pathTargets.forEach((target) => {
    if (target.type) {
      revalidatePath(target.path, target.type);
      return;
    }

    revalidatePath(target.path);
  });

  const literalPaths = pathTargets.filter((target) => !target.type).map((target) => target.path);
  const pathPatterns = pathTargets.filter((target) => target.type);
  const warmedPaths = shouldWarmPaths(payload)
    ? await Promise.all(literalPaths.map((path) => warmPath(path)))
    : [];

  return NextResponse.json({
    ok: true,
    event: readString(payload.event) || null,
    model: readPayloadModel(payload) || null,
    revalidatedTags: tags,
    revalidatedPaths: literalPaths,
    revalidatedPathPatterns: pathPatterns,
    warmedPaths,
  });
}
