export type Actor = {
  name: string;
  metaPrimary: string;
  metaSecondary: string;
};

type ActorCardProps = {
  actor: Actor;
};

export function ActorCard({ actor }: ActorCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-700 bg-slate-900/70 p-3">
      <div className="relative mb-3 overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
        <div className="aspect-[3/4] w-full bg-gradient-to-b from-slate-600 to-slate-800" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-slate-500 px-3 py-1 text-[10px] uppercase tracking-wide text-slate-300">
            Portrait
          </span>
        </div>
      </div>

      <h3 className="text-base font-semibold text-slate-100">{actor.name}</h3>
      <p className="mt-1 text-sm text-slate-300">{actor.metaPrimary}</p>
      <p className="text-sm text-slate-400">{actor.metaSecondary}</p>

      <button
        type="button"
        className="mt-auto inline-flex h-9 items-center justify-center rounded-md border border-slate-600 bg-slate-800 px-3 text-sm font-medium text-slate-100 transition hover:bg-slate-700"
      >
        View Profile
      </button>
    </article>
  );
}
