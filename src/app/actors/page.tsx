import { ActorCard } from "@/components/actor-card";
import { AgeRange } from "@prisma/client";
import { ActorFilters } from "@/components/actor-filters";
import { buildActorOrderBy, buildActorWhere, parseActorFilters } from "@/lib/actors";
import { isDatabaseConnectionError, prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ActorsPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters = parseActorFilters(searchParams);
  const where = buildActorWhere(filters);

  let actors: {
    id: string;
    name: string;
    ageRange: AgeRange;
    styleTags: string[];
    vibeTags: string[];
    languages: string[];
    imageUrls: string[];
    viewCount: number;
  }[] = [];
  let dbUnavailable = false;

  try {
    actors = await prisma.actor.findMany({
      where,
      orderBy: buildActorOrderBy(filters.sort),
      take: 60,
      select: {
        id: true,
        name: true,
        ageRange: true,
        styleTags: true,
        vibeTags: true,
        languages: true,
        imageUrls: true,
        viewCount: true
      }
    });
  } catch (error) {
    if (isDatabaseConnectionError(error)) {
      dbUnavailable = true;
    } else {
      throw error;
    }
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-white">Browse AI Actors</h1>
        <p className="mt-1 text-slate-400">Filter by age, style, vibe, emotion and language.</p>
      </section>

      {dbUnavailable ? (
        <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-300">
          <p className="font-semibold text-slate-100">Database is not running.</p>
          <p className="mt-2 text-sm">Start PostgreSQL and seed demo data to browse actors.</p>
          <div className="mt-4 space-y-1 text-xs text-slate-400">
            <p>`npm run db:up`</p>
            <p>`npm run prisma:migrate`</p>
            <p>`npm run prisma:seed`</p>
          </div>
        </section>
      ) : (
        <section className="grid gap-6 lg:grid-cols-[330px_1fr] lg:items-start">
          <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-auto lg:pr-1">
            <ActorFilters filters={filters} />
          </aside>

          <div className="space-y-3">
            <p className="text-sm text-slate-400">{actors.length} actors found</p>
            {actors.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {actors.map((actor) => (
                  <ActorCard key={actor.id} actor={actor} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-400">
                No actors matched current filters.
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
