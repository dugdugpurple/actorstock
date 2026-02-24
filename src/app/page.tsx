"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Persona = {
  name: string;
  age: string;
  eth: string;
  archetype: string;
  engine: string;
  img: string;
  brief: string;
};

const PERSONAS: Persona[] = [
  {
    name: "AURA-01",
    age: "24 Years",
    eth: "Nordic",
    archetype: "Professional",
    engine: "Neural Seed XL",
    img: "https://cdn.midjourney.com/5a29b67b-d7f1-4cd9-b451-7d8dbfe6f7c0/0_2.png",
    brief:
      "Optimized for high-end cinematic consistency. Features advanced micro-expression mapping and photorealistic skin subsurface scattering."
  },
  {
    name: "KAI-88",
    age: "31 Years",
    eth: "Europe",
    archetype: "Action Lead",
    engine: "Neural Seed Pro",
    img: "https://cdn.midjourney.com/e313108a-0498-45c0-9c7c-497c11e39af1/0_0.png",
    brief:
      "Designed for high-action performance. Neural weights balanced for intense emotional range and dynamic physical movement."
  },
  {
    name: "NOVA-X",
    age: "27 Years",
    eth: "Mixed",
    archetype: "Fashion Icon",
    engine: "Neural Seed XL",
    img: "https://cdn.midjourney.com/71fd83e7-18a5-4505-8afc-1a7ffd519a2d/0_1.png",
    brief:
      "Versatile archetype for global fashion campaigns. High-fashion structural symmetry with 8K texture fidelity."
  },
  {
    name: "KARIN",
    age: "29 Years",
    eth: "Middle East",
    archetype: "Corporate",
    engine: "Neural Seed Lite",
    img: "https://cdn.midjourney.com/4d8f53d7-8581-4298-8a27-6441dc51b84e/0_2.png",
    brief:
      "Corporate and lifestyle specialist. Optimized for natural speech synthesis and soft, approachable facial geometry."
  },
  {
    name: "ADELA",
    age: "28 Years",
    eth: "Latino",
    archetype: "Mass Appeal",
    engine: "Neural Seed XL",
    img: "https://cdn.midjourney.com/bfc273bd-484a-4489-92d0-b87935c7326b/0_3.png",
    brief:
      "Warm, authentic persona for mass-market appeal. Features high-diversity seed parameters for multi-context commercial use."
  }
];

const TYPE_WORDS = ["synthetic.", "limitless.", "instant.", "neural.", "stable."];

const FEATURES = [
  {
    title: "Hire a digital actor.",
    body: "No filming, no crew, no delays. Hyper-realistic AI talent ready for ads, video, and global campaigns - with commercial licensing fully covered."
  },
  {
    title: "Next-gen production.",
    body: "No casting, no locations. One actor, endless versions, multiple languages and emotions. Speed, control, and brand consistency."
  },
  {
    title: "Built for business.",
    body: "Clear licensing, optional exclusivity, and usage for social, web, and TV. No gray areas - just a clean commercial product."
  }
];

export default function HomePage() {
  const [activePersona, setActivePersona] = useState<Persona>(PERSONAS[0]);
  const [typedWord, setTypedWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const detailRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const alphabet = "01010101ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let drops: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array.from({ length: Math.floor(window.innerWidth / 16) }, () => 1);
    };

    resize();
    window.addEventListener("resize", resize);

    const interval = window.setInterval(() => {
      ctx.fillStyle = "rgba(2, 2, 5, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00d4ff";
      ctx.font = "16px monospace";

      drops.forEach((drop, index) => {
        const char = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(char, index * 16, drop * 16);

        if (drop * 16 > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        }
        drops[index] += 1;
      });
    }, 40);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const currentWord = TYPE_WORDS[wordIndex];
    let timeout: number;

    if (!isDeleting && typedWord === currentWord) {
      timeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && typedWord.length === 0) {
      timeout = window.setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPE_WORDS.length);
      }, 500);
    } else {
      timeout = window.setTimeout(() => {
        const nextLength = typedWord.length + (isDeleting ? -1 : 1);
        setTypedWord(currentWord.slice(0, nextLength));
      }, isDeleting ? 60 : 120);
    }

    return () => window.clearTimeout(timeout);
  }, [isDeleting, typedWord, wordIndex]);

  const handlePersonaSelect = (persona: Persona) => {
    setActivePersona(persona);
    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="neo-home">
      <canvas ref={canvasRef} className="neo-matrix-canvas" />
      <div className="neo-city-bg" />

      <section id="demo" className="neo-hero">
        <h1>
          <span className="neo-static-text">Future is</span>
          <span className="neo-type-target">{typedWord}</span>
        </h1>
        <p className="neo-hero-subtext">
          AI-engineered personas for next-gen digital cinema. Zero human restrictions, 100% legal safety. Website is
          still in progress, Regards Erik H.
        </p>
      </section>

      <section id="catalog" className="neo-slider-section">
        <div className="neo-slider-track">
          {PERSONAS.concat(PERSONAS).map((persona, index) => (
            <button
              key={`${persona.name}-${index}`}
              type="button"
              className="neo-actor-card"
              onClick={() => handlePersonaSelect(persona)}
              aria-label={`Show ${persona.name} details`}
            >
              <img src={persona.img} alt={persona.name} loading="lazy" />
              <div className="neo-card-overlay">
                <h4>{persona.name}</h4>
                <small>{persona.eth}</small>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section id="licensing" className="neo-detail-box" ref={detailRef}>
        <div className="neo-detail-img-box">
          <img src={activePersona.img} alt={activePersona.name} />
        </div>

        <div>
          <h2>{activePersona.name}</h2>
          <p className="neo-detail-subtitle">NEURAL MODEL GEN-4 / ACTIVE</p>

          <div className="neo-stat-grid">
            <div className="neo-stat-card">
              <label>Age</label>
              <span>{activePersona.age}</span>
            </div>
            <div className="neo-stat-card">
              <label>Ethnicity</label>
              <span>{activePersona.eth}</span>
            </div>
            <div className="neo-stat-card">
              <label>Archetype</label>
              <span>{activePersona.archetype}</span>
            </div>
            <div className="neo-stat-card">
              <label>Engine</label>
              <span>{activePersona.engine}</span>
            </div>
          </div>

          <div className="neo-detail-brief">
            <p>
              <strong>Character Brief:</strong> {activePersona.brief}
            </p>
          </div>

          <p className="neo-detail-note">
            This persona is a 100% synthetic asset. No real-world identity was used in the creation process, ensuring
            complete legal indemnity for global commercial distribution.
          </p>

          <Link href="/license" prefetch={false} className="neo-btn-solid neo-detail-cta">
            Initialize Deployment
          </Link>
        </div>
      </section>

      <section id="vision" className="neo-features-grid">
        {FEATURES.map((feature) => (
          <article key={feature.title} className="neo-feature-card">
            <div className="neo-accent-line" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
