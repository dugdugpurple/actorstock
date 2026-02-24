import Link from "next/link";
import {
  TrendingUp, ShieldCheck, Users, BarChart2, ChevronRight,
  Megaphone, GraduationCap, Building2, Tv2, Check
} from "lucide-react";
import { FAQSection } from "@/components/faq-section";

/* ── DATA ── */

const HERO_ACTORS = [
  {
    name: "KAI-88",
    img: "https://cdn.midjourney.com/e313108a-0498-45c0-9c7c-497c11e39af1/0_0.png"
  },
  {
    name: "NOVA-X",
    img: "https://cdn.midjourney.com/71fd83e7-18a5-4505-8afc-1a7ffd519a2d/0_1.png"
  },
  {
    name: "AURA-01",
    img: "https://cdn.midjourney.com/5a29b67b-d7f1-4cd9-b451-7d8dbfe6f7c0/0_2.png"
  }
];

const STATS = [
  { value: "2,400+", label: "AI Actors Available" },
  { value: "$2.1M", label: "Paid to Creators" },
  { value: "12,000+", label: "Brands & Agencies" },
  { value: "98%", label: "License Approval Rate" }
];

const BRANDS = [
  "Adidas", "Siemens", "Salesforce", "Stripe",
  "Canva", "HubSpot", "Notion", "Shopify"
];

const FEATURES = [
  {
    Icon: TrendingUp,
    title: "Revenue Share",
    body: "Earn passive income from every licensed download"
  },
  {
    Icon: ShieldCheck,
    title: "Licensing Security",
    body: "Full legal coverage and exclusivity guarantees"
  },
  {
    Icon: Users,
    title: "Enterprise Clients",
    body: "Get discovered by brands, SaaS firms, and agencies"
  },
  {
    Icon: BarChart2,
    title: "Performance Stats",
    body: "Track bookings, revenue, and usage trends"
  }
];

const FEATURED_ACTORS = [
  {
    name: "Jake Carter",
    type: "Edgy Charmer",
    badge: "Trending",
    img: "https://cdn.midjourney.com/e313108a-0498-45c0-9c7c-497c11e39af1/0_0.png"
  },
  {
    name: "Lena Cruz",
    type: "Feminine Lead",
    badge: "Top Pick",
    img: "https://cdn.midjourney.com/71fd83e7-18a5-4505-8afc-1a7ffd519a2d/0_1.png"
  },
  {
    name: "Tom Yates",
    type: "Corporate Pro",
    badge: null,
    img: "https://cdn.midjourney.com/4d8f53d7-8581-4298-8a27-6441dc51b84e/0_2.png"
  },
  {
    name: "Naoko Sasaki",
    type: "Stylish Inventor",
    badge: "New",
    img: "https://cdn.midjourney.com/bfc273bd-484a-4489-92d0-b87935c7326b/0_3.png"
  },
  {
    name: "AURA-01",
    type: "Futurist Icon",
    badge: null,
    img: "https://cdn.midjourney.com/5a29b67b-d7f1-4cd9-b451-7d8dbfe6f7c0/0_2.png"
  },
  {
    name: "Marcus Webb",
    type: "Luxury Presenter",
    badge: "Exclusive",
    img: "https://cdn.midjourney.com/e313108a-0498-45c0-9c7c-497c11e39af1/0_0.png"
  }
];

const USE_CASES = [
  {
    Icon: Megaphone,
    title: "Marketing & Ads",
    points: [
      "Product launch videos",
      "Social media campaigns",
      "Influencer-style content",
      "Retargeting ad creatives"
    ]
  },
  {
    Icon: Building2,
    title: "Corporate Training",
    points: [
      "Onboarding presentations",
      "Compliance training",
      "Internal comms videos",
      "Manager briefings"
    ]
  },
  {
    Icon: GraduationCap,
    title: "E-Learning",
    points: [
      "Course narration",
      "Language learning apps",
      "Interactive tutoring",
      "Assessment walkthroughs"
    ]
  },
  {
    Icon: Tv2,
    title: "Broadcast & Media",
    points: [
      "News presenter stand-ins",
      "Documentary narration",
      "Streaming show hosts",
      "Branded entertainment"
    ]
  }
];

const BUYER_STEPS = [
  {
    title: "Browse & Filter",
    body: "Search 2,400+ AI actors by look, style, language, and use case."
  },
  {
    title: "Choose License",
    body: "Select Standard, Extended, or Exclusive rights to fit your project."
  },
  {
    title: "Download & Deploy",
    body: "Get high-res media assets instantly. Use in any commercial context."
  }
];

const CREATOR_STEPS = [
  {
    title: "Create Your Actor",
    body: "Upload or generate your AI persona. Set a bio, archetype, and style."
  },
  {
    title: "Set Pricing & Terms",
    body: "Define your license tiers, rates, and exclusivity options."
  },
  {
    title: "Earn Passively",
    body: "Get 70% revenue share on every license sold. Withdraw monthly."
  }
];

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for individuals and early-stage projects.",
    badge: null,
    featured: false,
    features: [
      { label: "5 Standard licenses / month", included: true },
      { label: "Access to 200+ actors", included: true },
      { label: "720p media downloads", included: true },
      { label: "Community support", included: true },
      { label: "Extended license", included: false },
      { label: "Analytics dashboard", included: false }
    ],
    cta: "Get Started Free",
    href: "/login"
  },
  {
    name: "Pro",
    price: "€79",
    period: "/mo",
    desc: "For growing teams and frequent content creators.",
    badge: "Most Popular",
    featured: true,
    features: [
      { label: "50 Standard or Extended licenses / month", included: true },
      { label: "Full actor library (2,400+)", included: true },
      { label: "4K media downloads", included: true },
      { label: "Priority support", included: true },
      { label: "Analytics dashboard", included: true },
      { label: "Custom watermark removal", included: true }
    ],
    cta: "Start Pro Trial",
    href: "/login"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Unlimited usage, exclusivity, and dedicated account management.",
    badge: null,
    featured: false,
    features: [
      { label: "Unlimited licenses", included: true },
      { label: "Actor exclusivity options", included: true },
      { label: "White-label licensing", included: true },
      { label: "Dedicated account manager", included: true },
      { label: "Custom contracts & SLA", included: true },
      { label: "API access", included: true }
    ],
    cta: "Contact Sales",
    href: "/login"
  }
];

const TESTIMONIALS = [
  {
    stars: 5,
    text: "actorStock.ai cut our content production time in half. We now run regional campaigns with localised AI actors instead of flying crews to three countries.",
    name: "Sarah Mitchell",
    role: "Head of Growth · NovaBrands GmbH",
    img: "https://cdn.midjourney.com/71fd83e7-18a5-4505-8afc-1a7ffd519a2d/0_1.png"
  },
  {
    stars: 5,
    text: "The licensing process is crystal clear. I was worried about legal exposure using AI talent, but the platform's documentation gave our legal team full confidence.",
    name: "David Okonkwo",
    role: "VP Marketing · StackFlow Inc.",
    img: "https://cdn.midjourney.com/4d8f53d7-8581-4298-8a27-6441dc51b84e/0_2.png"
  },
  {
    stars: 5,
    text: "As a creator, I've earned more in three months here than in a year of traditional stock. The revenue share model is genuinely fair and transparent.",
    name: "Yuki Tanaka",
    role: "AI Actor Creator · Independent",
    img: "https://cdn.midjourney.com/bfc273bd-484a-4489-92d0-b87935c7326b/0_3.png"
  }
];

const STEPS = [
  { num: 1, title: "Create Your Actor", sub: "Generate or upload your AI character" },
  { num: 2, title: "Set Licensing", sub: "Define pricing and license terms" },
  { num: 3, title: "Start Earning", sub: "Get paid for every booking and download" }
];

const BAR_HEIGHTS = [14, 22, 18, 30, 26, 34, 38, 30, 42, 38, 46, 34, 52];

const RANKINGS = [
  {
    name: "Jake Carter",
    arch: "Edgy Charmer",
    bookings: 29,
    score: 92,
    img: "https://cdn.midjourney.com/e313108a-0498-45c0-9c7c-497c11e39af1/0_0.png"
  },
  {
    name: "Lena Cruz",
    arch: "Feminine Female",
    bookings: 22,
    score: 89,
    img: "https://cdn.midjourney.com/71fd83e7-18a5-4505-8afc-1a7ffd519a2d/0_1.png"
  },
  {
    name: "Tom Yates",
    arch: "Corporate Pro",
    bookings: 32,
    score: 87,
    img: "https://cdn.midjourney.com/4d8f53d7-8581-4298-8a27-6441dc51b84e/0_2.png"
  },
  {
    name: "Naoko Sasaki",
    arch: "Stylish Inventor",
    bookings: 32,
    score: 85,
    img: "https://cdn.midjourney.com/bfc273bd-484a-4489-92d0-b87935c7326b/0_3.png"
  }
];

/* ── PAGE ── */

export default function HomePage() {
  return (
    <div className="gs-home">

      {/* ── HERO ── */}
      <section className="gs-hero">
        <div className="gs-hero-left">
          <p className="gs-section-eyebrow">The AI Actor Marketplace</p>
          <h1 className="gs-hero-title">
            Monetize Your<br />AI Talent
          </h1>
          <p className="gs-hero-sub">
            License your digital actors, earn passive income.<br />
            Join the leading AI actor marketplace trusted by<br />
            12,000+ brands worldwide.
          </p>
          <div className="gs-hero-btns">
            <Link href="/actors" className="gs-btn-gold">
              Browse Actors
            </Link>
            <Link href="#how" className="gs-btn-ghost">
              How It Works
            </Link>
          </div>
        </div>

        <div className="gs-hero-right">
          {HERO_ACTORS.map((actor) => (
            <Link key={actor.name} href="/actors" className="gs-hero-actor">
              <img src={actor.img} alt={actor.name} loading="eager" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="gs-stats-strip">
        <div className="container-shell gs-stats-inner">
          {STATS.map((s) => (
            <div key={s.label} className="gs-stat-item">
              <span className="gs-stat-value">{s.value}</span>
              <span className="gs-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section className="gs-trusted">
        <div className="container-shell">
          <p className="gs-trusted-label">Trusted by leading brands</p>
          <div className="gs-trusted-logos">
            {BRANDS.map((brand) => (
              <span key={brand} className="gs-logo-pill">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="gs-features">
        <div className="container-shell gs-features-grid">
          {FEATURES.map(({ Icon, title, body }) => (
            <article key={title} className="gs-feature-card">
              <div className="gs-feature-icon">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── FEATURED ACTORS ── */}
      <section className="gs-actors-section">
        <div className="container-shell">
          <div className="gs-section-header">
            <div>
              <p className="gs-section-eyebrow">Top Performers</p>
              <h2 className="gs-section-title">Featured Actors</h2>
              <p className="gs-section-sub">
                Handpicked AI actors from our community of top creators.
              </p>
            </div>
            <Link href="/actors" className="gs-btn-ghost">
              Browse All Actors
            </Link>
          </div>

          <div className="gs-actors-grid">
            {FEATURED_ACTORS.map((actor) => (
              <Link key={actor.name} href="/actors" className="gs-actor-card">
                {actor.badge && (
                  <span className="gs-actor-badge">{actor.badge}</span>
                )}
                <img
                  src={actor.img}
                  alt={actor.name}
                  className="gs-actor-img"
                  loading="lazy"
                />
                <div className="gs-actor-overlay" />
                <div className="gs-actor-info">
                  <p className="gs-actor-name">{actor.name}</p>
                  <p className="gs-actor-type">{actor.type}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="gs-usecases" id="usecases">
        <div className="container-shell">
          <div className="gs-section-center">
            <p className="gs-section-eyebrow">Built for Every Industry</p>
            <h2 className="gs-section-title">Where AI Actors Fit</h2>
            <p className="gs-section-sub">
              From performance marketing to employee training — AI actors
              unlock a new level of scalable, cost-effective content.
            </p>
          </div>

          <div className="gs-usecase-grid">
            {USE_CASES.map(({ Icon, title, points }) => (
              <div key={title} className="gs-usecase-card">
                <div className="gs-usecase-icon-wrap">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <h4>{title}</h4>
                <ul className="gs-usecase-points">
                  {points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS + DASHBOARD ── */}
      <section id="how" className="gs-how">
        <div className="container-shell gs-how-inner">
          {/* Steps */}
          <div>
            <h2 className="gs-section-heading">How to Get Started</h2>
            <div className="gs-steps">
              {STEPS.map((step, i) => (
                <div key={step.num} className="gs-step-wrap">
                  <div className="gs-step-card">
                    <div className="gs-step-num-badge">{step.num}</div>
                    <p className="gs-step-title">{step.num}. {step.title}</p>
                    <p className="gs-step-sub">{step.sub}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ChevronRight className="gs-step-arrow" size={18} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="gs-dashboard">
            <div className="gs-dash-header">
              <div>
                <div className="gs-dash-earnings">
                  €5,382
                  <span className="gs-dash-growth">This Month +28%</span>
                </div>
                <div className="gs-dash-label">Daily Earnings</div>
              </div>
              <div className="gs-dash-bars" aria-hidden="true">
                {BAR_HEIGHTS.map((h, i) => (
                  <div key={i} className="gs-dash-bar" style={{ height: `${h}px` }} />
                ))}
              </div>
            </div>

            <div className="gs-dash-stats">
              <div className="gs-dash-stat">
                <span className="gs-dash-val">238</span>
                <span className="gs-dash-key">Licenses Sold</span>
              </div>
              <div className="gs-dash-divider" />
              <div className="gs-dash-stat">
                <span className="gs-dash-val">#7</span>
                <span className="gs-dash-key">Trending Rank</span>
              </div>
            </div>

            <div className="gs-dash-revenue">
              Revenue Generated<strong>€21,920</strong>
            </div>

            <div className="gs-rankings">
              {RANKINGS.map((actor, i) => (
                <Link key={actor.name} href="/actors" className="gs-rank-row">
                  <span className="gs-rank-pos">{i + 1}</span>
                  <img src={actor.img} alt={actor.name} className="gs-rank-img" />
                  <div className="gs-rank-info">
                    <p className="gs-rank-name">{actor.name}</p>
                    <p className="gs-rank-arch">{actor.arch}</p>
                    <p className="gs-rank-book">{actor.bookings} Bookings this month</p>
                  </div>
                  <span className="gs-rank-score">
                    {actor.score}
                    <span className="gs-rank-diamond"> ◇</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (dual perspective) ── */}
      <section className="gs-hiw" id="hiw">
        <div className="container-shell">
          <div className="gs-section-center">
            <p className="gs-section-eyebrow">Step by Step</p>
            <h2 className="gs-section-title">How It Works</h2>
            <p className="gs-section-sub">
              Whether you need AI talent or want to sell yours —
              the process is simple and transparent.
            </p>
          </div>

          <div className="gs-hiw-cols">
            {/* For Buyers */}
            <div>
              <p className="gs-hiw-col-label">For Buyers</p>
              {BUYER_STEPS.map((s, i) => (
                <div key={i} className="gs-hiw-step">
                  <div className="gs-hiw-num">{i + 1}</div>
                  <div className="gs-hiw-content">
                    <h4>{s.title}</h4>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* For Creators */}
            <div>
              <p className="gs-hiw-col-label">For Creators</p>
              {CREATOR_STEPS.map((s, i) => (
                <div key={i} className="gs-hiw-step">
                  <div className="gs-hiw-num">{i + 1}</div>
                  <div className="gs-hiw-content">
                    <h4>{s.title}</h4>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="gs-pricing" id="pricing">
        <div className="container-shell">
          <div className="gs-section-center">
            <p className="gs-section-eyebrow">Transparent Pricing</p>
            <h2 className="gs-section-title">Pick Your Plan</h2>
            <p className="gs-section-sub">
              No hidden fees. Cancel any time. All plans include
              full commercial usage rights.
            </p>
          </div>

          <div className="gs-pricing-grid">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`gs-plan-card${plan.featured ? " featured" : ""}`}
              >
                {plan.badge && (
                  <span className="gs-plan-badge">{plan.badge}</span>
                )}
                <p className="gs-plan-name">{plan.name}</p>
                <div>
                  <span className="gs-plan-price-amount">{plan.price}</span>
                  {plan.period && (
                    <span className="gs-plan-price-period">{plan.period}</span>
                  )}
                </div>
                <p className="gs-plan-desc">{plan.desc}</p>
                <div className="gs-plan-divider" />
                <ul className="gs-plan-features">
                  {plan.features.map((f) => (
                    <li
                      key={f.label}
                      className={`gs-plan-feature${f.included ? "" : " muted"}`}
                    >
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        className="gs-plan-feature-check"
                        style={{ opacity: f.included ? 1 : 0.3 }}
                      />
                      {f.label}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={plan.featured ? "gs-btn-gold" : "gs-btn-ghost"}
                  style={{ textAlign: "center" }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "0.8rem", color: "rgba(255,255,255,0.28)" }}>
            All plans include 14-day money-back guarantee · No credit card required for Free tier
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="gs-testimonials">
        <div className="container-shell">
          <div className="gs-section-center">
            <p className="gs-section-eyebrow">Social Proof</p>
            <h2 className="gs-section-title">Loved by Teams Worldwide</h2>
            <p className="gs-section-sub">
              See why thousands of marketers, creators, and learning designers
              rely on actorStock.ai every day.
            </p>
          </div>

          <div className="gs-testi-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="gs-testi-card">
                <div className="gs-testi-stars">{"★".repeat(t.stars)}</div>
                <p className="gs-testi-text">"{t.text}"</p>
                <div className="gs-testi-author">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="gs-testi-avatar"
                    loading="lazy"
                  />
                  <div>
                    <p className="gs-testi-name">{t.name}</p>
                    <p className="gs-testi-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── APPLY AS CREATOR CTA ── */}
      <section className="gs-apply" id="apply">
        <div className="container-shell">
          <p className="gs-section-eyebrow" style={{ justifyContent: "center", display: "flex" }}>
            Join Our Creator Network
          </p>
          <h2>Start Earning as a Creator</h2>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "1rem", marginBottom: "40px", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.65 }}>
            Upload your AI actors, set your licensing terms, and
            earn 70% revenue share on every sale. No upfront costs.
          </p>
          <div className="gs-apply-btns">
            <Link href="/actors" className="gs-btn-gold gs-btn-lg">
              Apply as Creator
            </Link>
            <Link href="/pricing" className="gs-btn-ghost gs-btn-lg">
              View All Plans
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
