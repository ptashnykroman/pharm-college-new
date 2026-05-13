import { print } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

import {
  DEFAULT_REVALIDATE_SECONDS,
  STRAPI_GRAPHQL_URL,
} from "@/shared/lib/site-config";

type GraphQLErrorPayload = {
  message: string;
};

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: GraphQLErrorPayload[];
};

type QueryOptions = {
  revalidate?: number | false;
  tags?: string[];
};

const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);
const GRAPHQL_REQUEST_RETRIES = 2;

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function executeGraphQLRequest<TData>(
  query: string,
  variables: unknown,
  options: QueryOptions = {},
) {
  let response: Response | null = null;

  for (let attempt = 0; attempt <= GRAPHQL_REQUEST_RETRIES; attempt += 1) {
    response = await fetch(STRAPI_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        revalidate:
          options.revalidate === undefined
            ? DEFAULT_REVALIDATE_SECONDS
            : options.revalidate,
        tags: options.tags,
      },
    });

    if (
      response.ok ||
      !RETRYABLE_STATUS_CODES.has(response.status) ||
      attempt === GRAPHQL_REQUEST_RETRIES
    ) {
      break;
    }

    await wait(400 * (attempt + 1));
  }

  if (!response?.ok) {
    throw new Error(`GraphQL request failed with status ${response?.status ?? "unknown"}`);
  }

  const payload = (await response.json()) as GraphQLResponse<TData>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  if (!payload.data) {
    throw new Error("GraphQL response did not include data");
  }

  return payload.data;
}

export async function executeGraphQL<TData, TVariables>(
  document: TypedDocumentNode<TData, TVariables>,
  variables: TVariables,
  options: QueryOptions = {},
) {
  return executeGraphQLRequest<TData>(print(document), variables, options);
}

export async function executeGraphQLRaw<
  TData,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
>(query: string, variables: TVariables, options: QueryOptions = {}) {
  return executeGraphQLRequest<TData>(query, variables, options);
}
