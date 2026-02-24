import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { getSession } from "@/lib/auth";

function safeRedirectPath(value: string | string[] | undefined): string | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate) return undefined;
  if (!candidate.startsWith("/")) return undefined;
  if (candidate.startsWith("//")) return undefined;
  return candidate;
}

export default function LoginPage({
  searchParams
}: {
  searchParams: { from?: string | string[] };
}) {
  const session = getSession();
  if (session) {
    redirect(session.role === "ADMIN" ? "/admin" : "/account");
  }

  const redirectTo = safeRedirectPath(searchParams.from);

  return (
    <div className="container-shell space-y-6 py-8">
      <section className="text-center">
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-white">Welcome back</h1>
        <p className="mt-1 text-slate-400">Login to manage licenses and access admin dashboard.</p>
      </section>
      <LoginForm redirectTo={redirectTo} />
    </div>
  );
}
