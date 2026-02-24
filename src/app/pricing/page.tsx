import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Zap, Building2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing · ACTORSTOCK.AI",
  description: "Transparent pricing for AI actor licensing. Free, Pro, and Enterprise plans."
};

const PLANS = [
  {
    name: "Starter",
    tagline: "Explore & experiment",
    price: "€0",
    period: "",
    Icon: Zap,
    badge: null,
    featured: false,
    features: [
      { label: "5 Standard licenses per month", included: true },
      { label: "Access to 200+ curated actors", included: true },
      { label: "720p image & video downloads", included: true },
      { label: "Community support (forum)", included: true },
      { label: "Commercial usage rights", included: true },
      { label: "Extended license", included: false },
      { label: "4K downloads", included: false },
      { label: "Analytics dashboard", included: false },
      { label: "Priority support", included: false },
      { label: "Actor exclusivity", included: false }
    ],
    cta: "Get Started Free",
    ctaStyle: "ghost" as const,
    href: "/login"
  },
  {
    name: "Pro",
    tagline: "For serious content teams",
    price: "€79",
    period: "/month",
    Icon: Sparkles,
    badge: "Most Popular",
    featured: true,
    features: [
      { label: "50 Standard or Extended licenses / month", included: true },
      { label: "Full actor library (2,400+)", included: true },
      { label: "4K image & video downloads", included: true },
      { label: "Priority email support (24h)", included: true },
      { label: "Full commercial usage rights", included: true },
      { label: "Extended license included", included: true },
      { label: "Analytics & performance dashboard", included: true },
      { label: "Custom watermark removal", included: true },
      { label: "Actor exclusivity", included: false },
      { label: "Dedicated account manager", included: false }
    ],
    cta: "Start 14-Day Free Trial",
    ctaStyle: "gold" as const,
    href: "/login"
  },
  {
    name: "Enterprise",
    tagline: "Unlimited scale & exclusivity",
    price: "Custom",
    period: "",
    Icon: Building2,
    badge: null,
    featured: false,
    features: [
      { label: "Unlimited license downloads", included: true },
      { label: "Full actor library (2,400+)", included: true },
      { label: "4K image & video downloads", included: true },
      { label: "Dedicated account manager", included: true },
      { label: "Full commercial usage rights", included: true },
      { label: "Extended & exclusive licensing", included: true },
      { label: "White-label licensing option", included: true },
      { label: "Custom contracts & SLA", included: true },
      { label: "API access & bulk export", included: true },
      { label: "Compliance & legal support", included: true }
    ],
    cta: "Contact Sales",
    ctaStyle: "ghost" as const,
    href: "/login"
  }
];

const COMPARISON_ROWS = [
  {
    feature: "Licenses per month",
    starter: "5 Standard",
    pro: "50 Std or Extended",
    enterprise: "Unlimited"
  },
  {
    feature: "Actor library",
    starter: "200+",
    pro: "2,400+",
    enterprise: "2,400+"
  },
  {
    feature: "Download resolution",
    starter: "720p",
    pro: "4K",
    enterprise: "4K"
  },
  {
    feature: "Extended license",
    starter: false,
    pro: true,
    enterprise: true
  },
  {
    feature: "Exclusivity",
    starter: false,
    pro: false,
    enterprise: true
  },
  {
    feature: "Analytics dashboard",
    starter: false,
    pro: true,
    enterprise: true
  },
  {
    feature: "API access",
    starter: false,
    pro: false,
    enterprise: true
  },
  {
    feature: "Support",
    starter: "Community",
    pro: "Priority email",
    enterprise: "Dedicated manager"
  },
  {
    feature: "Custom contracts",
    starter: false,
    pro: false,
    enterprise: true
  }
];

const FAQS = [
  {
    q: "Is there a free trial for Pro?",
    a: "Yes — the Pro plan includes a 14-day free trial. No credit card required to start."
  },
  {
    q: "Can I switch plans at any time?",
    a: "Absolutely. Upgrade or downgrade at the end of your billing cycle. No cancellation fees."
  },
  {
    q: "What happens if I exceed my monthly license limit?",
    a: "You can purchase top-up packs at any time, or upgrade to the next tier. We never cut access mid-month."
  },
  {
    q: "Are licenses perpetual or time-limited?",
    a: "Standard and Extended licenses are perpetual — once purchased, they don't expire. Exclusivity licenses are time-scoped (minimum 3 months)."
  }
];

function Cell({ val }: { val: boolean | string }) {
  if (typeof val === "boolean") {
    return val
      ? <span style={{ color: "#c8922a", fontWeight: 700 }}>✓</span>
      : <span style={{ color: "rgba(255,255,255,0.2)" }}><X size={14} /></span>;
  }
  return <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>{val}</span>;
}

export default function PricingPage() {
  return (
    <div className="container-shell py-8" style={{ paddingTop: "48px", paddingBottom: "80px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: "580px", margin: "0 auto 60px" }}>
        <p className="gs-section-eyebrow" style={{ justifyContent: "center", display: "flex" }}>
          Transparent Pricing
        </p>
        <h1 className="gs-section-title" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "16px" }}>
          Plans for Every Team
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", lineHeight: 1.7 }}>
          No hidden fees. Cancel any time. All plans include
          full commercial usage rights on every license purchased.
        </p>
      </div>

      {/* Plan Cards */}
      <div className="gs-pricing-grid" style={{ marginTop: 0 }}>
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`gs-plan-card${plan.featured ? " featured" : ""}`}
          >
            {plan.badge && (
              <span className="gs-plan-badge">{plan.badge}</span>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div className="gs-feature-icon" style={{ width: 40, height: 40 }}>
                <plan.Icon size={18} strokeWidth={1.8} />
              </div>
              <p className="gs-plan-name" style={{ margin: 0 }}>{plan.name}</p>
            </div>
            <div>
              <span className="gs-plan-price-amount">{plan.price}</span>
              {plan.period && (
                <span className="gs-plan-price-period">{plan.period}</span>
              )}
            </div>
            <p className="gs-plan-desc">{plan.tagline}</p>
            <div className="gs-plan-divider" />
            <ul className="gs-plan-features">
              {plan.features.map((f) => (
                <li
                  key={f.label}
                  className={`gs-plan-feature${f.included ? "" : " muted"}`}
                >
                  {f.included
                    ? <Check size={14} strokeWidth={2.5} className="gs-plan-feature-check" />
                    : <X size={14} strokeWidth={2} className="gs-plan-feature-check" style={{ opacity: 0.25 }} />
                  }
                  {f.label}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={plan.ctaStyle === "gold" ? "gs-btn-gold" : "gs-btn-ghost"}
              style={{ textAlign: "center" }}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", marginTop: "24px", fontSize: "0.78rem", color: "rgba(255,255,255,0.22)" }}>
        All prices exclude VAT where applicable · Enterprise pricing available on request
      </p>

      {/* Comparison Table */}
      <div style={{ marginTop: "72px" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", marginBottom: "28px", textAlign: "center" }}>
          Full Feature Comparison
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <th style={{ textAlign: "left", padding: "12px 16px", color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                  Feature
                </th>
                {["Starter", "Pro", "Enterprise"].map((n) => (
                  <th key={n} style={{ textAlign: "center", padding: "12px 16px", color: n === "Pro" ? "#c8922a" : "rgba(255,255,255,0.5)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.5px" }}>
                    {n}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}
                >
                  <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.65)", fontSize: "0.85rem" }}>
                    {row.feature}
                  </td>
                  <td style={{ textAlign: "center", padding: "14px 16px" }}>
                    <Cell val={row.starter} />
                  </td>
                  <td style={{ textAlign: "center", padding: "14px 16px" }}>
                    <Cell val={row.pro} />
                  </td>
                  <td style={{ textAlign: "center", padding: "14px 16px" }}>
                    <Cell val={row.enterprise} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing FAQ */}
      <div style={{ marginTop: "72px", maxWidth: "680px", margin: "72px auto 0" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", marginBottom: "28px", textAlign: "center" }}>
          Pricing FAQ
        </h2>
        <div className="gs-faq-list" style={{ margin: 0 }}>
          {FAQS.map((faq, i) => (
            <div key={i} className="gs-faq-item">
              <div style={{ padding: "20px 0" }}>
                <p style={{ fontWeight: 700, color: "rgba(255,255,255,0.85)", fontSize: "0.92rem", marginBottom: "8px" }}>
                  {faq.q}
                </p>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign: "center", marginTop: "64px", padding: "48px", border: "1px solid rgba(200,146,42,0.25)", borderRadius: "16px", background: "rgba(200,146,42,0.04)" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>
          Not sure which plan fits?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.9rem", marginBottom: "28px" }}>
          Talk to our team and get a personalised recommendation in under 24 hours.
        </p>
        <div className="gs-apply-btns">
          <Link href="/login" className="gs-btn-gold gs-btn-lg">
            Start Free Trial
          </Link>
          <Link href="/#faq" className="gs-btn-ghost gs-btn-lg">
            Read Full FAQ
          </Link>
        </div>
      </div>

    </div>
  );
}
