import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { logError, logInfo } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { orderStatusUpdateSchema } from "@/lib/validations";

function ensureAdmin() {
  const session = getSession();
  return session?.role === UserRole.ADMIN ? session : null;
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = ensureAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const input = orderStatusUpdateSchema.parse(json);

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status: input.status }
    });

    logInfo("PATCH /api/admin/orders/[id]", {
      orderId: order.id,
      status: input.status,
      adminId: session.userId
    });

    return NextResponse.json({ order });
  } catch (error) {
    logError("PATCH /api/admin/orders/[id] failed", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 400 });
  }
}
