import Link from "next/link";
import { ORDER_STATUS_LABELS, ORDER_TYPE_LABELS } from "@/lib/constants";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = requireUser();

  const orders = await prisma.order.findMany({
    where: { userId: session.userId },
    include: {
      actor: {
        select: {
          id: true,
          name: true
        }
      },
      plan: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="container-shell space-y-6 py-8">
      <section className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-[var(--font-heading)] text-3xl font-bold text-white">My licenses</h1>
          <p className="mt-1 text-slate-400">All your license orders and requests in one place.</p>
        </div>
        <Link href="/license">
          <Button>Create new order</Button>
        </Link>
      </section>

      <section className="space-y-3">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle className="text-base">{ORDER_TYPE_LABELS[order.type]}</CardTitle>
                <CardDescription>{new Date(order.createdAt).toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-300">
                <p>
                  Status: <Badge variant="subtle">{ORDER_STATUS_LABELS[order.status]}</Badge>
                </p>
                <p>Plan: {order.plan?.name ?? "N/A"}</p>
                <p>Actor: {order.actor?.name ?? "N/A"}</p>
                <p>Company: {order.companyName ?? "N/A"}</p>
                {order.notes ? <p>Notes: {order.notes}</p> : null}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-sm text-slate-400">
              No orders yet. Create your first license request.
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
