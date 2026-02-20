import { getSession } from "@/lib/auth";
import { Navbar } from "@/components/landing/Navbar";

export function SiteHeader() {
  const session = getSession();

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="h-[2px] w-full bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-400 to-pink-500/0" />
      <Navbar session={session} />
    </header>
  );
}
