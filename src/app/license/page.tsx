import { isDatabaseConnectionError, prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LicenseOrderForm } from "@/components/license-order-form";

export const dynamic = "force-dynamic";

export default async function LicensePage({
  searchParams
}: {
  searchParams: { actorId?: string | string[] };
}) {
  requireUser();

  const rawActorId = Array.isArray(searchParams.actorId) ? searchParams.actorId[0] : searchParams.actorId;
  const actorId = rawActorId && /^[0-9a-fA-F-]{36}$/.test(rawActorId) ? rawActorId : undefined;

  let plans: {
    id: string;
    name: string;
    priceMonthly: number | null;
    priceOneTime: number | null;
    includedActorsCount: number | null;
    includedVoiceMinutes: number | null;
  }[] = [];
  let actor: { id: string; name: string } | null = null;
  let dbUnavailable = false;

  try {
    [plans, actor] = await Promise.all([
      prisma.licensePlan.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          name: true,
          priceMonthly: true,
          priceOneTime: true,
          includedActorsCount: true,
          includedVoiceMinutes: true
        }
      }),
      actorId
        ? prisma.actor.findFirst({
            where: {
              id: actorId,
              isPublished: true
            },
            select: { id: true, name: true }
          })
        : Promise.resolve(null)
    ]);
  } catch (error) {
    if (isDatabaseConnectionError(error)) {
      dbUnavailable = true;
    } else {
      throw error;
    }
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-white">License Checkout</h1>
        <p className="mt-1 text-slate-400">
          Mock payment flow for MVP. Stripe webhook endpoint is prepared for future integration.
        </p>
      </section>

      {dbUnavailable ? (
        <Card>
          <CardHeader>
            <CardTitle>Database is not running</CardTitle>
            <CardDescription>
              This page needs PostgreSQL. Start DB and run migrations before creating license orders.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-slate-300">
            <p>`npm run db:up`</p>
            <p>`npm run prisma:migrate`</p>
            <p>`npm run prisma:seed`</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    {plan.priceMonthly
                      ? `${formatCurrency(plan.priceMonthly)}/month`
                      : plan.priceOneTime
                        ? `${formatCurrency(plan.priceOneTime)} one-time`
                        : "Custom pricing"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-slate-300">
                  <p>
                    Included actors: {plan.includedActorsCount === null ? "Custom" : plan.includedActorsCount}
                  </p>
                  <p>
                    Voice minutes: {plan.includedVoiceMinutes === null ? "Custom" : plan.includedVoiceMinutes}
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>

          <Card>
            <CardHeader>
              <CardTitle>Create order</CardTitle>
              <CardDescription>Subscription, pay-per-use, or custom request.</CardDescription>
            </CardHeader>
            <CardContent>
              <LicenseOrderForm plans={plans} actor={actor} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
