import Link from "next/link";
import { getSession } from "@/lib/auth";

export function SiteFooter() {
  const session = getSession();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-fuchsia-500/20 bg-[#06080f] text-slate-300">
      <div className="container-shell py-14">
        <div className="rounded-2xl border border-fuchsia-400/20 bg-[#0d1220] p-6 sm:p-8">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <p className="font-[var(--font-heading)] text-xl font-bold text-white">actorstock.ai</p>
              <p className="mt-3 max-w-md text-sm text-slate-400">
                Catalog and licensing layer for AI actors. Browse, validate media, and activate usage rights with a
                clean workflow.
              </p>

              <Link
                href="/license"
                prefetch={false}
                className="mt-5 inline-flex h-10 items-center rounded-md bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 text-sm font-semibold text-white transition hover:from-fuchsia-400 hover:to-pink-400"
              >
                Start Licensing
              </Link>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fuchsia-300">Explore</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="/#actors" className="transition hover:text-fuchsia-200">
                    Actors
                  </Link>
                </li>
                <li>
                  <Link href="/#voices" className="transition hover:text-fuchsia-200">
                    Voices
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="transition hover:text-fuchsia-200">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="transition hover:text-fuchsia-200">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fuchsia-300">Workspace</p>
              <ul className="mt-4 space-y-2 text-sm">
                {session ? (
                  <li>
                    <Link href="/account" prefetch={false} className="transition hover:text-fuchsia-200">
                      Account
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link href="/login" className="transition hover:text-fuchsia-200">
                      Login
                    </Link>
                  </li>
                )}
                {session?.role === "ADMIN" ? (
                  <li>
                    <Link href="/admin" prefetch={false} className="transition hover:text-fuchsia-200">
                      Admin
                    </Link>
                  </li>
                ) : null}
                <li>
                  <Link href="/actors" prefetch={false} className="transition hover:text-fuchsia-200">
                    Full catalog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-800 pt-5 text-xs text-slate-500">
            © {year} actorstock.ai. AI actor licensing marketplace MVP.
          </div>
        </div>
      </div>
    </footer>
  );
}
