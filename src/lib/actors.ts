import { AgeRange, Prisma } from "@prisma/client";
import { parseCsv } from "@/lib/utils";

export type ActorSort = "newest" | "popular";

export type ActorFilterInput = {
  q?: string;
  ageRanges: AgeRange[];
  languages: string[];
  vibes: string[];
  emotions: string[];
  styles: string[];
  sort: ActorSort;
};

function toList(value: string | string[] | undefined): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.flatMap((entry) => parseCsv(entry));
  }

  return parseCsv(value);
}

function toAgeRanges(value: string | string[] | undefined): AgeRange[] {
  const values = toList(value);
  const allowed = new Set(Object.values(AgeRange));

  return values.filter((entry): entry is AgeRange => allowed.has(entry as AgeRange));
}

export function parseActorFilters(searchParams: Record<string, string | string[] | undefined>): ActorFilterInput {
  const qValue = searchParams.q;
  const q = (Array.isArray(qValue) ? qValue[0] : qValue)?.trim();

  const sortValue = Array.isArray(searchParams.sort) ? searchParams.sort[0] : searchParams.sort;
  const sort: ActorSort = sortValue === "popular" ? "popular" : "newest";

  return {
    q,
    ageRanges: toAgeRanges(searchParams.ageRange),
    languages: toList(searchParams.language),
    vibes: toList(searchParams.vibe),
    emotions: toList(searchParams.emotion),
    styles: toList(searchParams.style),
    sort
  };
}

export function buildActorWhere(filters: ActorFilterInput): Prisma.ActorWhereInput {
  const and: Prisma.ActorWhereInput[] = [{ isPublished: true }];

  if (filters.q) {
    and.push({
      OR: [
        { name: { contains: filters.q, mode: "insensitive" } },
        { bioShort: { contains: filters.q, mode: "insensitive" } },
        { styleTags: { has: filters.q.toLowerCase() } },
        { vibeTags: { has: filters.q.toLowerCase() } },
        { emotionTags: { has: filters.q.toLowerCase() } }
      ]
    });
  }

  if (filters.ageRanges.length > 0) {
    and.push({ ageRange: { in: filters.ageRanges } });
  }

  if (filters.languages.length > 0) {
    and.push({ languages: { hasSome: filters.languages } });
  }

  if (filters.vibes.length > 0) {
    and.push({ vibeTags: { hasSome: filters.vibes } });
  }

  if (filters.emotions.length > 0) {
    and.push({ emotionTags: { hasSome: filters.emotions } });
  }

  if (filters.styles.length > 0) {
    and.push({ styleTags: { hasSome: filters.styles } });
  }

  return { AND: and };
}

export function buildActorOrderBy(sort: ActorSort): Prisma.ActorOrderByWithRelationInput {
  if (sort === "popular") {
    return { viewCount: "desc" };
  }

  return { createdAt: "desc" };
}
