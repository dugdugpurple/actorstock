export type UseCase = {
  title: string;
  subtitle: string;
};

type UseCaseCardProps = {
  useCase: UseCase;
};

export function UseCaseCard({ useCase }: UseCaseCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900/70">
      <div className="relative border-b border-slate-700 bg-slate-800">
        <div className="aspect-[4/3] w-full bg-gradient-to-br from-slate-600 to-slate-800" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-slate-500 px-3 py-1 text-[10px] uppercase tracking-wide text-slate-300">
            Use Case Image
          </span>
        </div>
      </div>

      <div className="space-y-1 p-4">
        <h3 className="text-base font-semibold text-slate-100">{useCase.title}</h3>
        <p className="text-sm text-slate-300">{useCase.subtitle}</p>
      </div>
    </article>
  );
}
