import Link from "next/link";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="rounded-2xl border border-slate-700/70 bg-slate-900/55 p-6 sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
        <div className="flex flex-col justify-center">
          <h1 id="hero-heading" className="text-3xl font-semibold leading-tight text-slate-100 sm:text-4xl lg:text-5xl">
            License AI Actors
            <span className="block">for Your Projects</span>
          </h1>

          <p className="mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
            Photorealistic AI talent for ads, videos, marketing and more.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/actors"
              prefetch={false}
              className="inline-flex h-11 items-center rounded-md bg-slate-100 px-5 text-sm font-medium text-slate-900 transition hover:bg-white"
            >
              Discover Actors
            </Link>
            <button
              type="button"
              className="inline-flex h-11 items-center rounded-md border border-slate-600 px-5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              Watch Demo
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/70">
          <div className="h-full min-h-[260px] w-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 lg:min-h-[340px]" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="rounded-full border border-slate-500 px-4 py-2 text-xs uppercase tracking-wide text-slate-300">
              Hero Visual Placeholder
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
