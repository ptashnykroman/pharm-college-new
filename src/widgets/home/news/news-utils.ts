export const PAGE_SIZE = 3;

export const newsToneStyles = {
  primary: "bg-primary text-primary-foreground",
  gold: "bg-accent-gold text-accent-gold-foreground",
  deep: "bg-primary-deep text-primary-foreground",
} as const;


export function getNewsTagTone(
  tag: string | null,
  index: number,
): keyof typeof newsToneStyles {
  const source = (tag || "").toLowerCase();

  if (source.includes("конкурс") || source.includes("партнер")) {
    return "gold";
  }

  if (source.includes("под") || source.includes("випуск")) {
    return "deep";
  }

  return index % 3 === 1 ? "primary" : index % 3 === 2 ? "deep" : "gold";
}
