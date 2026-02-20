import Link from "next/link";
import type { UserRole } from "@prisma/client";
import { ChevronDown, Menu } from "lucide-react";
import { LogoutButton } from "@/components/logout-button";

type NavbarProps = {
  session: {
    email: string;
    role: UserRole;
  } | null;
};

const menuItems = [
  { href: "/#actors", label: "Actors" },
  { href: "/#voices", label: "Voices", hasChevron: true },
  { href: "/#licensing", label: "Licensing" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" }
];

export function Navbar({ session }: NavbarProps) {
  return (
    <div className="container-shell">
      <nav
        aria-label="Primary"
        className="flex h-16 items-center justify-between gap-4 rounded-b-xl border-x border-b border-fuchsia-500/20 bg-[#0b0d16]/85 px-4 shadow-[0_18px_42px_rgba(0,0,0,0.35)] backdrop-blur"
      >
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          actorstock.ai
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex items-center gap-1 text-sm text-slate-300 transition hover:text-fuchsia-200"
            >
              {item.label}
              {item.hasChevron ? <ChevronDown size={15} className="text-slate-500" aria-hidden="true" /> : null}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              <Link href="/account" prefetch={false} className="text-sm text-slate-200 transition hover:text-fuchsia-200">
                Account
              </Link>
              {session.role === "ADMIN" ? (
                <Link href="/admin" prefetch={false} className="text-sm text-slate-200 transition hover:text-fuchsia-200">
                  Admin
                </Link>
              ) : null}
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex h-9 items-center rounded-md bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 text-sm font-semibold text-white transition hover:from-fuchsia-400 hover:to-pink-400"
              >
                Sign Up
              </Link>
              <Link href="/login" className="text-sm text-slate-300 transition hover:text-fuchsia-200">
                Log in
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-700 bg-slate-900/80 text-slate-300 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
      </nav>
    </div>
  );
}
