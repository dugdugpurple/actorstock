import { OrderStatus, OrderType } from "@prisma/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { logError, logInfo } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { orderCreateSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const input = orderCreateSchema.parse(body);

    if (input.actorId) {
      const actor = await prisma.actor.findFirst({
        where: { id: input.actorId, isPublished: true },
        select: { id: true }
      });

      if (!actor) {
        return NextResponse.json({ error: "Actor not found" }, { status: 404 });
      }
    }

    if (input.planId) {
      const plan = await prisma.licensePlan.findFirst({
        where: { id: input.planId, isActive: true },
        select: { id: true }
      });

      if (!plan) {
        return NextResponse.json({ error: "Plan not found" }, { status: 404 });
      }
    }

    const status = input.type === OrderType.REQUEST ? OrderStatus.PENDING : OrderStatus.ACTIVE;

    const order = await prisma.order.create({
      data: {
        userId: session.userId,
        actorId: input.actorId ?? null,
        planId: input.planId ?? null,
        type: input.type,
        status,
        companyName: input.companyName,
        notes: input.notes
      }
    });

    logInfo("POST /api/orders", { orderId: order.id, userId: session.userId });

    return NextResponse.json({
      order,
      mockPayment: input.type !== OrderType.REQUEST
    });
  } catch (error) {
    logError("POST /api/orders failed", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 400 });
  }
}
