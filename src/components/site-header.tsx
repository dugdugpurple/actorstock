"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { UserRole } from "@prisma/client";
import { LogoutButton } from "@/components/logout-button";

type Session = {
  email: string;
  role: UserRole;
} | null;

const navItems = [
  { href: "/actors", label: "Browse" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#how", label: "How It Works" },
  { href: "/#faq", label: "FAQ" }
];

export function SiteHeader({ session }: { session: Session }) {
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

          <div className="neo-nav-auth">
            {session ? (
              <>
                <Link href="/account" className="neo-nav-link">
                  Account
                </Link>
                {session.role === "ADMIN" ? (
                  <Link href="/admin" className="neo-nav-link">
                    Admin
                  </Link>
                ) : null}
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/actors" prefetch={false} className="neo-nav-link">
                  For creators
                </Link>
                <Link href="/login" prefetch={false} className="neo-btn-solid">
                  Sign in
                </Link>
              </>
            )}
          </div>

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
        <button
          type="button"
          className="neo-mobile-close"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <X size={28} strokeWidth={1.8} />
        </button>

        {navItems.map((item) => (
          <Link key={item.label} href={item.href} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}
        {session ? (
          <>
            <Link href="/account" onClick={closeMenu}>
              Account
            </Link>
            {session.role === "ADMIN" ? (
              <Link href="/admin" onClick={closeMenu}>
                Admin
              </Link>
            ) : null}
            <div className="neo-mobile-cta" onClick={closeMenu}>
              <LogoutButton />
            </div>
          </>
        ) : (
          <>
            <Link href="/actors" prefetch={false} onClick={closeMenu}>
              For Creators
            </Link>
            <Link href="/login" prefetch={false} className="neo-btn-solid neo-mobile-cta" onClick={closeMenu}>
              Sign In
            </Link>
          </>
        )}
      </div>
    </>
  );
}
