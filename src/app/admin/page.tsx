import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminDashboard } from "@/components/admin-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  requireAdmin();

  const [actors, orders, plans] = await Promise.all([
    prisma.actor.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.order.findMany({
      include: {
        user: { select: { email: true } },
        actor: { select: { name: true } },
        plan: { select: { name: true } }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.licensePlan.findMany({
      orderBy: { createdAt: "asc" },
      select: { id: true, name: true, isActive: true }
    })
  ]);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-white">Admin dashboard</h1>
        <p className="mt-1 text-slate-400">Manage actors, media, and license order statuses.</p>
      </section>

      <AdminDashboard
        initialActors={actors.map((actor) => ({
          ...actor,
          createdAt: actor.createdAt.toISOString(),
          updatedAt: actor.updatedAt.toISOString()
        }))}
        initialOrders={orders.map((order) => ({
          ...order,
          createdAt: order.createdAt.toISOString()
        }))}
        plans={plans}
      />
    </div>
  );
}
