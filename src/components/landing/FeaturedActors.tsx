import { ChevronDown } from "lucide-react";
import { ActorCard, type Actor } from "@/components/landing/ActorCard";

type FeaturedActorsProps = {
  actors: Actor[];
};

const filters = ["Female", "Male", "Style", "Age", "Ethnicity"];

export function FeaturedActors({ actors }: FeaturedActorsProps) {
  return (
    <section aria-labelledby="featured-actors-heading" className="space-y-5 rounded-2xl border border-slate-700/70 bg-slate-900/45 p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <h2 id="featured-actors-heading" className="text-2xl font-semibold text-slate-100">
          Featured AI Actors
        </h2>

        <div className="w-full lg:max-w-xs">
          <label htmlFor="actor-search" className="sr-only">
            Search actors
          </label>
          <input
            id="actor-search"
            type="search"
            aria-label="Search actors"
            placeholder="Search actors..."
            className="h-10 w-full rounded-md border border-slate-600 bg-slate-800 px-3 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/55 p-2">
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-md bg-slate-200 px-3 text-sm font-medium text-slate-900 transition hover:bg-white"
        >
          All
        </button>

        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className="inline-flex h-9 items-center gap-1 rounded-md border border-slate-600 bg-slate-800 px-3 text-sm text-slate-200 transition hover:bg-slate-700"
          >
            {filter}
            <ChevronDown size={14} className="text-slate-400" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {actors.map((actor) => (
          <ActorCard key={actor.name} actor={actor} />
        ))}
      </div>
    </section>
  );
}
