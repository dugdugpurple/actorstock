import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Clapperboard,
  FileCheck2,
  Gamepad2,
  Globe2,
  Layers3,
  MessageSquareText,
  Mic2,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Video
} from "lucide-react";

const capabilities = [
  {
    title: "Photoreal quality",
    description: "Studio-ready actor packs with consistent identity across campaigns.",
    icon: Sparkles
  },
  {
    title: "Voice preview built in",
    description: "Listen before licensing and match tone, language, and intent.",
    icon: Mic2
  },
  {
    title: "Licensing-first workflow",
    description: "Clear rights, simple checkout, and clean handoff for production teams.",
    icon: FileCheck2
  }
];

const actors = [
  {
    name: "Lena",
    metaPrimary: "Female · 20s · Caucasian",
    metaSecondary: "Confident English"
  },
  {
    name: "Maya",
    metaPrimary: "Female · 30s · South Asian",
    metaSecondary: "Friendly English/Spanish"
  },
  {
    name: "Erik",
    metaPrimary: "Male · 30s · Caucasian",
    metaSecondary: "Authoritative English/German"
  },
  {
    name: "Jared",
    metaPrimary: "Male · 30s · African American",
    metaSecondary: "Warm English/French"
  },
  {
    name: "Daniel",
    metaPrimary: "Male · 40s · Caucasian",
    metaSecondary: "Calm English"
  }
];

const useCases = [
  {
    title: "Advertising",
    subtitle: "Campaign launches with fast turnarounds",
    icon: Clapperboard
  },
  {
    title: "Corporate Video",
    subtitle: "Consistent presenters for internal and external content",
    icon: Video
  },
  {
    title: "Game Characters",
    subtitle: "Persona concepts with ready-to-test visual style",
    icon: Gamepad2
  }
];

const steps = [
  {
    title: "Select Talent",
    description: "Browse AI actors and shortlist by style, voice, and language fit.",
    icon: UserRoundCheck
  },
  {
    title: "Preview Voices",
    description: "Validate accent, pacing, and delivery before committing.",
    icon: MessageSquareText
  },
  {
    title: "License Content",
    description: "Choose one-time usage or recurring access with clean terms.",
    icon: ShieldCheck
  },
  {
    title: "Receive Files",
    description: "Move to production with asset-ready outputs.",
    icon: Send
  }
];

const logos = ["NEOAD", "GAME LOOP", "BYTE MEDIA", "LEARNCO", "PIXELFORGE", "ORBIT STUDIO"];

const differentiators = [
  {
    title: "Ready in minutes",
    description: "From actor discovery to rights activation without fragmented tools.",
    icon: Rocket
  },
  {
    title: "Consistent across channels",
    description: "One persona package for paid ads, social content, landing pages and e-learning.",
    icon: Layers3
  },
  {
    title: "Global content fit",
    description: "Multi-language actor profiles reduce market adaptation friction.",
    icon: Globe2
  }
];

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Great for solo creators and early campaigns",
    features: ["2 actors included", "60 voice minutes", "Commercial usage scope"],
    highlighted: false
  },
  {
    name: "Pro",
    price: "$149",
    period: "/month",
    description: "Best fit for agencies and content teams",
    features: ["10 actors included", "300 voice minutes", "Priority support + faster onboarding"],
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored licensing for scale and custom rights",
    features: ["Custom actor capacity", "Flexible legal terms", "Dedicated success manager"],
    highlighted: false
  }
];

const comparisonRows = [
  {
    label: "Persona consistency",
    actorstock: "Unified profile and metadata",
    diy: "Manual curation across tools"
  },
  {
    label: "Voice + visual workflow",
    actorstock: "Built-in preview and packaging",
    diy: "Fragmented and hard to validate"
  },
  {
    label: "Licensing clarity",
    actorstock: "Structured checkout and status flow",
    diy: "Custom legal coordination each time"
  },
  {
    label: "Time to launch",
    actorstock: "Hours to days",
    diy: "Days to weeks"
  }
];

const faqs = [
  {
    question: "What exactly do we license?",
    answer: "A complete AI actor package: visual identity assets, voice preview support, and rights-ready metadata."
  },
  {
    question: "Do you support one-time and subscription models?",
    answer: "Yes. Teams can use campaign-specific purchases or recurring plans for always-on production."
  },
  {
    question: "Can we start without selecting a specific actor?",
    answer: "Yes. You can submit a general request and map a final actor profile later with your team."
  },
  {
    question: "Is Stripe already connected?",
    answer: "Current flow is MVP mock checkout with architecture prepared for Stripe integration."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-12 pb-20 pt-6 sm:space-y-14 md:space-y-16 md:pt-8">
      <section className="reveal relative overflow-hidden rounded-[2rem] border border-fuchsia-400/20 bg-[#0b0d16]/90 px-5 py-7 shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(236,72,153,0.16),transparent_38%),radial-gradient(circle_at_82%_15%,rgba(217,70,239,0.14),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 soft-grid opacity-35" />

        <div className="relative grid gap-7 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/35 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-fuchsia-200">
              <BadgeCheck size={13} /> actorstock marketplace
            </span>

            <h1 className="mt-5 max-w-2xl text-[2rem] font-semibold leading-[1.02] text-white sm:text-[2.6rem] lg:text-[3.4rem]">
              License AI Actors
              <span className="mt-1 block bg-gradient-to-r from-fuchsia-300 via-pink-300 to-rose-200 bg-clip-text text-transparent">
                for Ambitious Content Teams.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
              Browse talent, preview voice, and activate usage rights with a clean production-ready flow.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
              <Link
                href="/actors"
                prefetch={false}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 text-xs font-semibold text-white transition hover:from-fuchsia-400 hover:to-pink-400 sm:h-11 sm:px-5 sm:text-sm"
              >
                Discover Actors <ArrowRight size={15} />
              </Link>
              <Link
                href="/license"
                prefetch={false}
                className="inline-flex h-10 items-center rounded-md border border-fuchsia-300/30 bg-[#121625] px-4 text-xs font-medium text-slate-200 transition hover:border-fuchsia-300/55 hover:text-white sm:h-11 sm:px-5 sm:text-sm"
              >
                Start Licensing
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
              <div className="rounded-lg border border-slate-700 bg-[#121625] px-3 py-2">
                <p className="text-lg font-semibold text-white sm:text-xl">500+</p>
                <p className="text-[11px] text-slate-400">Actor personas</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-[#121625] px-3 py-2">
                <p className="text-lg font-semibold text-white sm:text-xl">26</p>
                <p className="text-[11px] text-slate-400">Language variants</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-[#121625] px-3 py-2">
                <p className="text-lg font-semibold text-white sm:text-xl">24h</p>
                <p className="text-[11px] text-slate-400">Avg onboarding</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm">
            <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-fuchsia-500/25 blur-2xl" />
            <div className="absolute -right-8 bottom-14 h-32 w-32 rounded-full bg-pink-500/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[1.5rem] border border-fuchsia-300/25 bg-[#141828] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
              <div className="relative overflow-hidden rounded-[1.2rem] border border-slate-700 bg-[#1a1f30]">
                <div className="aspect-[3/4] bg-[radial-gradient(circle_at_30%_20%,rgba(244,114,182,0.4),transparent_40%),radial-gradient(circle_at_75%_25%,rgba(168,85,247,0.3),transparent_45%),linear-gradient(180deg,#272c3e_0%,#171b2b_100%)]" />
                <div className="absolute inset-x-4 bottom-4 rounded-xl border border-fuchsia-300/20 bg-[#0e1220]/90 px-4 py-2.5 text-xs text-slate-300 backdrop-blur">
                  <p className="font-semibold text-white">Maya</p>
                  <p>South Asian · 30s · Friendly English/Spanish</p>
                </div>
              </div>
            </div>

            <div className="absolute -left-2 top-6 rounded-lg border border-fuchsia-400/30 bg-[#101524]/92 px-2.5 py-1.5 text-[11px] text-fuchsia-200">
              HD portrait pack
            </div>
            <div className="absolute -right-3 bottom-20 rounded-lg border border-fuchsia-400/30 bg-[#101524]/92 px-2.5 py-1.5 text-[11px] text-fuchsia-200">
              Voice EN / ES
            </div>
          </div>
        </div>
      </section>

      <section id="voices" className="reveal rounded-[1.6rem] border border-fuchsia-400/20 bg-[#0d1220]/92 p-5 sm:p-6 lg:p-7">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <article className="rounded-xl border border-slate-700 bg-[linear-gradient(160deg,#151b2e_0%,#0d1220_100%)] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fuchsia-300">Experience the platform</p>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Built for modern content teams</h2>
            <p className="mt-3 max-w-lg text-sm text-slate-300">
              Everything from actor discovery to legal-ready licensing is designed for speed and consistency.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2.5 text-center">
              <div className="rounded-lg border border-slate-700 bg-[#101626] px-2 py-2">
                <p className="text-base font-semibold text-white sm:text-lg">4x</p>
                <p className="text-[11px] text-slate-400">faster setup</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-[#101626] px-2 py-2">
                <p className="text-base font-semibold text-white sm:text-lg">98%</p>
                <p className="text-[11px] text-slate-400">asset consistency</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-[#101626] px-2 py-2">
                <p className="text-base font-semibold text-white sm:text-lg">24/7</p>
                <p className="text-[11px] text-slate-400">catalog access</p>
              </div>
            </div>
          </article>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {capabilities.slice(0, 2).map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-xl border border-slate-700 bg-[#0f1321]/90 p-4 transition hover:border-fuchsia-400/40 hover:bg-[#13182a]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-fuchsia-300/25 bg-fuchsia-500/10 text-fuchsia-200">
                    <Icon size={16} />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-xs text-slate-300 sm:text-sm">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>

        <article className="mt-3 rounded-xl border border-slate-700 bg-[#0f1321]/90 p-4 transition hover:border-fuchsia-400/40 hover:bg-[#13182a]">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-fuchsia-300/25 bg-fuchsia-500/10 text-fuchsia-200">
            <FileCheck2 size={16} />
          </span>
          <h3 className="mt-3 text-base font-semibold text-white">{capabilities[2].title}</h3>
          <p className="mt-1.5 text-xs text-slate-300 sm:text-sm">{capabilities[2].description}</p>
        </article>
      </section>

      <section id="actors" className="reveal space-y-4 rounded-[1.8rem] border border-fuchsia-400/20 bg-[#0b0f1b]/92 p-5 sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Meet Our AI Actors</h2>
            <p className="mt-1.5 text-sm text-slate-300">Pick personas by style, age, language and campaign vibe.</p>
          </div>

          <label htmlFor="actor-search" className="sr-only">
            Search actors
          </label>
          <input
            id="actor-search"
            type="search"
            aria-label="Search actors"
            placeholder="Search actors..."
            className="h-10 w-full rounded-md border border-slate-600 bg-[#121829] px-3 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/45 lg:max-w-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-700 bg-[#101626] p-2">
          {[
            { label: "All", active: true },
            { label: "Female" },
            { label: "Male" },
            { label: "Style", icon: true },
            { label: "Age", icon: true },
            { label: "Ethnicity", icon: true }
          ].map((filter) => (
            <button
              key={filter.label}
              type="button"
              className={`inline-flex h-8 items-center gap-1 rounded-md px-3 text-xs font-medium transition ${
                filter.active
                  ? "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white"
                  : "border border-slate-600 bg-[#13192a] text-slate-200 hover:border-fuchsia-400/45"
              }`}
            >
              {filter.label}
              {filter.icon ? <ChevronDown size={13} /> : null}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {actors.map((actor) => (
            <article
              key={actor.name}
              className="group flex h-full flex-col rounded-xl border border-slate-700 bg-[#101424] p-3 transition hover:border-fuchsia-400/35"
            >
              <div className="relative mb-3 overflow-hidden rounded-lg border border-slate-700 bg-[#1a2032]">
                <div className="aspect-[3/4] bg-[radial-gradient(circle_at_35%_20%,rgba(244,114,182,0.28),transparent_35%),linear-gradient(180deg,#2a2f43_0%,#1a1f31_100%)]" />
              </div>

              <h3 className="text-base font-semibold text-white">{actor.name}</h3>
              <p className="mt-1 text-xs text-slate-300">{actor.metaPrimary}</p>
              <p className="text-xs text-slate-400">{actor.metaSecondary}</p>

              <button
                type="button"
                className="mt-auto inline-flex h-9 items-center justify-center rounded-md bg-fuchsia-500/15 text-xs font-semibold text-fuchsia-100 transition hover:bg-fuchsia-500/25"
              >
                View Profile
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-slate-700 bg-[#0f1424] p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">Ideal for Ads, Videos, Games & More</h2>
          <p className="mt-2 text-sm text-slate-300">One actor catalog, multiple production contexts and channels.</p>

          <ul className="mt-5 space-y-2.5 text-sm text-slate-200">
            <li className="flex items-center gap-3 rounded-lg border border-slate-700 bg-[#121829] px-3 py-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-fuchsia-300/25 bg-fuchsia-500/10 text-fuchsia-200">
                <Clapperboard size={15} />
              </span>
              Advertising campaigns
            </li>
            <li className="flex items-center gap-3 rounded-lg border border-slate-700 bg-[#121829] px-3 py-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-fuchsia-300/25 bg-fuchsia-500/10 text-fuchsia-200">
                <Video size={15} />
              </span>
              Corporate and e-learning video
            </li>
            <li className="flex items-center gap-3 rounded-lg border border-slate-700 bg-[#121829] px-3 py-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-fuchsia-300/25 bg-fuchsia-500/10 text-fuchsia-200">
                <Gamepad2 size={15} />
              </span>
              Game character prototyping
            </li>
          </ul>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="overflow-hidden rounded-xl border border-slate-700 bg-[#0f1321]">
                <div className="relative border-b border-slate-700 bg-[#1a2032]">
                  <div className="aspect-[4/3] bg-[radial-gradient(circle_at_65%_20%,rgba(217,70,239,0.28),transparent_40%),linear-gradient(180deg,#2a2f44_0%,#1b2031_100%)]" />
                  <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-fuchsia-300/30 bg-[#101423]/90 text-fuchsia-200">
                    <Icon size={14} />
                  </span>
                </div>
                <div className="space-y-1 p-4">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-300">{item.subtitle}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="licensing" className="reveal rounded-[1.8rem] border border-fuchsia-400/20 bg-[#0c111e]/92 p-5 sm:p-7">
        <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">Simple Licensing & Workflow</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-300">
          Move from talent selection to usable files with fewer handoffs and cleaner approvals.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="rounded-xl border border-slate-700 bg-[#121829] p-4 text-center">
                <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-fuchsia-300/30 bg-fuchsia-500/10 text-fuchsia-200">
                  <Icon size={17} />
                </span>
                <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-fuchsia-300">Step {index + 1}</p>
                <h3 className="mt-1 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-1.5 text-sm text-slate-300">{step.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-7 rounded-xl border border-slate-700 bg-[#0d121f] px-4 py-5 sm:px-6">
          <p className="text-center text-sm text-slate-300">Trusted by leading brands & studios</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {logos.map((logo) => (
              <div
                key={logo}
                className="rounded-md border border-slate-600 bg-[#111828] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fuchsia-300">Why teams switch</p>
          <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Faster output, lower production friction</h2>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-xl border border-slate-700 bg-[#0f1321] p-5 transition hover:border-fuchsia-400/35"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-fuchsia-300/25 bg-fuchsia-500/10 text-fuchsia-200">
                  <Icon size={18} />
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm text-slate-300">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="pricing" className="reveal space-y-5">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fuchsia-300">Flexible plans</p>
          <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Scale from pilot to full production</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-300">
            Start lean and upgrade as campaign volume, actor count, or rights complexity grows.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-xl border p-5 ${
                plan.highlighted
                  ? "border-fuchsia-300/50 bg-gradient-to-b from-fuchsia-500/20 to-[#141a2b]"
                  : "border-slate-700 bg-[#0f1424]"
              }`}
            >
              {plan.highlighted ? (
                <span className="inline-flex rounded-full border border-fuchsia-300/40 bg-fuchsia-500/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-fuchsia-100">
                  Most popular
                </span>
              ) : null}

              <h3 className="mt-2.5 text-xl font-semibold text-white">{plan.name}</h3>
              <p className="mt-1.5 text-3xl font-semibold text-white">
                {plan.price}
                <span className="text-base font-medium text-slate-300">{plan.period}</span>
              </p>
              <p className="mt-1.5 text-sm text-slate-300">{plan.description}</p>

              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 text-fuchsia-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/license"
                prefetch={false}
                className={`mt-5 inline-flex h-10 w-full items-center justify-center rounded-md text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white hover:from-fuchsia-400 hover:to-pink-400"
                    : "border border-slate-600 bg-[#111728] text-slate-200 hover:border-fuchsia-300/40"
                }`}
              >
                Choose {plan.name}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal overflow-hidden rounded-[1.7rem] border border-slate-700 bg-[#0d121f]">
        <div className="hidden md:block">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-slate-700 bg-[#11192b] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
            <span>Capability</span>
            <span>Actorstock</span>
            <span>DIY stack</span>
          </div>

          {comparisonRows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-slate-800 px-4 py-4 text-sm last:border-b-0"
            >
              <p className="text-slate-100">{row.label}</p>
              <p className="text-fuchsia-200">{row.actorstock}</p>
              <p className="text-slate-400">{row.diy}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 p-4 md:hidden">
          {comparisonRows.map((row) => (
            <article key={row.label} className="rounded-lg border border-slate-700 bg-[#121829] p-3">
              <h3 className="text-sm font-semibold text-white">{row.label}</h3>
              <p className="mt-2 text-xs text-fuchsia-200">Actorstock: {row.actorstock}</p>
              <p className="mt-1 text-xs text-slate-400">DIY: {row.diy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="reveal space-y-4 rounded-[1.7rem] border border-slate-700 bg-[#0f1423] p-5 sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fuchsia-300">FAQ</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Answers before you launch</h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((item) => (
            <details key={item.question} className="group rounded-lg border border-slate-700 bg-[#111829] px-4 py-3">
              <summary className="cursor-pointer list-none text-sm font-semibold text-white">{item.question}</summary>
              <p className="mt-2 text-sm text-slate-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="reveal relative overflow-hidden rounded-[2rem] border border-fuchsia-300/40 bg-gradient-to-r from-fuchsia-600/25 via-pink-600/15 to-rose-500/20 px-6 py-9 text-center sm:px-8 sm:py-11">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(251,113,133,0.28),transparent_45%)]" />

        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Ready to launch with AI actors?</h2>
          <p className="mt-2.5 text-sm text-slate-200">
            Start with a curated persona, validate voice, and move into production with licensing clarity.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <Link
              href="/license"
              prefetch={false}
              className="inline-flex h-10 items-center rounded-md bg-white px-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 sm:h-11 sm:px-5"
            >
              Get Started Now
            </Link>
            <Link
              href="/actors"
              prefetch={false}
              className="inline-flex h-10 items-center rounded-md border border-white/35 px-4 text-sm font-semibold text-white transition hover:bg-white/10 sm:h-11 sm:px-5"
            >
              Explore Actor Library
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
