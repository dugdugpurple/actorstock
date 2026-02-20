"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { OrderType } from "@prisma/client";
import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type PlanOption = {
  id: string;
  name: string;
  priceMonthly: number | null;
  priceOneTime: number | null;
};

export function LicenseOrderForm({
  plans,
  actor
}: {
  plans: PlanOption[];
  actor: { id: string; name: string } | null;
}) {
  const [type, setType] = useState<OrderType>(OrderType.SUBSCRIPTION);
  const [planId, setPlanId] = useState<string>(plans[0]?.id ?? "");
  const [companyName, setCompanyName] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const canUsePlan = type !== OrderType.REQUEST;

  const submitEnabled = useMemo(() => {
    if (canUsePlan && !planId) return false;
    return true;
  }, [canUsePlan, planId]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!submitEnabled) {
      toast({ title: "Select a plan", variant: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          actorId: actor?.id ?? null,
          planId: canUsePlan ? planId : null,
          companyName,
          notes
        })
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error ?? "Failed to create order");
      }

      toast({ title: "Order created", variant: "success" });
      router.push(`/license/success?orderId=${payload.order.id}`);
      router.refresh();
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {actor ? (
        <p className="rounded-md border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-300">
          Licensing actor: <strong>{actor.name}</strong>
        </p>
      ) : (
        <p className="rounded-md border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-300">
          Creating general license request (no actor selected).
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="type">License type</Label>
        <Select
          id="type"
          value={type}
          onChange={(event) => {
            const nextType = event.target.value as OrderType;
            setType(nextType);
            if (nextType === OrderType.REQUEST) {
              setPlanId("");
            } else if (!planId && plans[0]) {
              setPlanId(plans[0].id);
            }
          }}
        >
          <option value={OrderType.SUBSCRIPTION}>Subscription</option>
          <option value={OrderType.PAY_PER_USE}>Pay-per-use</option>
          <option value={OrderType.REQUEST}>Request custom</option>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="plan">Plan</Label>
        <Select
          id="plan"
          value={planId}
          onChange={(event) => setPlanId(event.target.value)}
          disabled={!canUsePlan || plans.length === 0}
        >
          {plans.length === 0 ? <option value="">No active plans</option> : null}
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">Company name</Label>
        <Input
          id="companyName"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          placeholder="e.g. PixelForge Studio"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Usage scope, geography, campaign duration..."
        />
      </div>

      <Button type="submit" className="w-full" disabled={!submitEnabled || isLoading}>
        {isLoading ? "Processing..." : "Create license order"}
      </Button>
    </form>
  );
}
