import Link from "next/link";
import { OrderStatus } from "@prisma/client";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function LicenseSuccessPage({
  searchParams
}: {
  searchParams: { orderId?: string | string[] };
}) {
  const session = requireUser();

  const rawOrderId = Array.isArray(searchParams.orderId) ? searchParams.orderId[0] : searchParams.orderId;

  const order = rawOrderId
    ? await prisma.order.findFirst({
        where: {
          id: rawOrderId,
          userId: session.userId
        },
        include: {
          actor: {
            select: { id: true, name: true }
          },
          plan: {
            select: { id: true, name: true }
          }
        }
      })
    : null;

  const active = order ? order.status === OrderStatus.PAID || order.status === OrderStatus.ACTIVE : false;

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>{active ? "Your license is active" : "Order received"}</CardTitle>
        <CardDescription>
          {active
            ? "Mock checkout completed successfully."
            : "Your request is pending admin review."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-slate-300">
        {order ? (
          <>
            <p>
              Order ID: <span className="font-mono text-xs">{order.id}</span>
            </p>
            <p>Status: {order.status}</p>
            <p>Type: {order.type}</p>
            <p>Plan: {order.plan?.name ?? "N/A"}</p>
            <p>Actor: {order.actor?.name ?? "N/A"}</p>
          </>
        ) : (
          <p>Order details were not found.</p>
        )}

        <div className="flex flex-wrap gap-3 pt-3">
          <Link href="/account">
            <Button>Go to account</Button>
          </Link>
          <Link href="/actors">
            <Button variant="outline">Browse actors</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
