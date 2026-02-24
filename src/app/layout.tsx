import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ToastProvider } from "@/components/toast-provider";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "ACTORSTOCK.AI",
  description: "MVP catalog of licensable AI actors"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getSession();

  return (
    <html lang="en">
      <body className="font-[var(--font-body)]">
        <ToastProvider>
          <SiteHeader session={session ? { email: session.email, role: session.role } : null} />
          <main>{children}</main>
          <SiteFooter />
        </ToastProvider>
      </body>
    </html>
  );
}
