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
  const demoActors = [
    {
      name: "Lena",
      age: "18-25",
      tags: "Lifestyle, Beauty",
      lang: "EN"
    },
    {
      name: "Maya",
      age: "26-35",
      tags: "Premium, Corporate",
      lang: "EN / ES"
    },
    {
      name: "Erik",
      age: "26-35",
      tags: "Tech, Finance",
      lang: "EN / DE"
    },
    {
      name: "Jared",
      age: "26-35",
      tags: "Gaming, Ads",
      lang: "EN / FR"
    },
    {
      name: "Daniel",
      age: "36-45",
      tags: "Narration, B2B",
      lang: "EN"
    },
    {
      name: "Nora",
      age: "26-35",
      tags: "E-learning, Startup",
      lang: "EN / SK"
    }
  ];

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
    <div className="container-shell space-y-6 py-8">
      <section>
        <h1 className="text-3xl font-bold text-white">Browse AI Actors</h1>
        <p className="mt-1 text-slate-400">Filter by age, style, vibe, emotion and language.</p>
      </section>

      {dbUnavailable ? (
        <section className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-300">
            <p className="font-semibold text-slate-100">Live database is currently unavailable.</p>
            <p className="mt-2 text-sm">
              Showing demo actor cards below. Full filtering and actor detail routes reactivate once DATABASE_URL is
              configured.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {demoActors.map((actor) => (
              <article
                key={actor.name}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-neon/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
              >
                <div className="aspect-[3/4] rounded-lg border border-slate-700 bg-slate-800/80" />
                <h3 className="mt-3 text-lg font-semibold text-white">{actor.name}</h3>
                <p className="text-sm text-slate-300">Age: {actor.age}</p>
                <p className="text-sm text-slate-400">Tags: {actor.tags}</p>
                <p className="text-sm text-slate-400">Language: {actor.lang}</p>
                <p className="mt-3 text-xs text-slate-500">Demo profile preview</p>
              </article>
            ))}
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
