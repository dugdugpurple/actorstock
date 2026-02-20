type TrustedLogosProps = {
  logos: string[];
};

export function TrustedLogos({ logos }: TrustedLogosProps) {
  return (
    <section className="rounded-2xl border border-slate-700/70 bg-slate-900/45 p-6 text-center sm:p-8">
      <p className="text-sm font-medium text-slate-200">Trusted by leading brands &amp; studios</p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {logos.map((logo) => (
          <div
            key={logo}
            className="min-w-32 rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300"
          >
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}
