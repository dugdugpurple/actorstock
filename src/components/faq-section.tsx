"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is actorStock.ai?",
    a: "actorStock.ai is a two-sided marketplace for AI actors. Buyers license digital talent for commercial content — ads, e-learning, corporate video, and more. Creators upload and monetise their AI personas, earning 70% revenue share on every license sold."
  },
  {
    q: "How does licensing work?",
    a: "When you purchase a license, you receive the right to use the actor's likeness in your project according to the selected tier. Standard licenses cover most digital use cases. Extended licenses include broadcast, out-of-home, and unlimited views. Exclusive licenses remove the actor from the marketplace for your territory and duration."
  },
  {
    q: "Can I use AI actors commercially?",
    a: "Yes. All licenses on actorStock.ai include full commercial usage rights. This covers digital advertising, social media, websites, apps, and more. Extended and Exclusive tiers also cover broadcast and print. Each license comes with a downloadable agreement your legal team can review."
  },
  {
    q: "How are creators paid?",
    a: "Creators earn 70% of every license fee their actors generate. Payments are processed on the 1st of each month via bank transfer or PayPal, with a minimum payout threshold of €50. Real-time earnings are visible in your creator dashboard."
  },
  {
    q: "What file formats and resolutions are provided?",
    a: "Downloads include high-resolution still images (PNG/JPEG) and video clips (MP4). Free tier provides 720p. Pro and Enterprise tiers unlock 4K resolution. All assets include transparent-background variants for easy compositing."
  },
  {
    q: "Is exclusivity available?",
    a: "Yes. Exclusive licensing can be requested for any actor. Once an exclusivity license is active, the actor is removed from the public marketplace for the agreed territory and duration. Exclusivity pricing is negotiated directly — contact our sales team to get started."
  },
  {
    q: "How do I become a creator on actorStock.ai?",
    a: "Apply via the Creators page. After submitting your AI actor portfolio, our curation team reviews within 5 business days. Accepted creators gain access to the full creator dashboard — pricing controls, analytics, and payout settings."
  },
  {
    q: "What industries use AI actors most?",
    a: "Our top verticals are marketing & advertising, corporate L&D (learning and development), e-learning platforms, broadcast media, and SaaS product explainers. AI actors are increasingly used to localise content for multiple markets without reshooting."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="gs-faq" id="faq">
      <div className="container-shell">
        <div className="gs-section-center">
          <p className="gs-section-eyebrow">Got Questions?</p>
          <h2 className="gs-section-title">Frequently Asked Questions</h2>
          <p className="gs-section-sub">
            Everything you need to know about licensing AI actors and
            earning as a creator.
          </p>
        </div>

        <div className="gs-faq-list">
          {FAQS.map((faq, i) => (
            <div key={i} className="gs-faq-item">
              <button
                className="gs-faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                {faq.q}
                <ChevronDown
                  size={18}
                  className={`gs-faq-chevron${openIndex === i ? " open" : ""}`}
                />
              </button>
              {openIndex === i && (
                <p className="gs-faq-answer">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
