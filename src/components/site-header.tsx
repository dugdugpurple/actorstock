"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/#demo", label: "Check Demo" },
  { href: "/#catalog", label: "Catalog" },
  { href: "/#vision", label: "Vision" },
  { href: "/#licensing", label: "Licensing" }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="neo-header">
        <div className="container-shell neo-nav-bar">
          <Link href="/" className="neo-logo-wrap" onClick={closeMenu} aria-label="Go to homepage">
            <span className="neo-logo-icon" />
            <span className="neo-logo-text">actorStock.ai</span>
          </Link>

          <nav className="neo-nav-menu" aria-label="Primary">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="neo-nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/actors" prefetch={false} className="neo-btn-solid neo-nav-cta">
            For creators
          </Link>

          <button
            type="button"
            className={`neo-hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobileMenu" className={`neo-mobile-overlay ${menuOpen ? "active" : ""}`}>
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}
        <Link href="/actors" prefetch={false} className="neo-btn-solid neo-mobile-cta" onClick={closeMenu}>
          For Creators
        </Link>
      </div>
    </>
  );
}
