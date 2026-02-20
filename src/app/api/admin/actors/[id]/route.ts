import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { logError, logInfo } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { actorUpdateSchema } from "@/lib/validations";

function ensureAdmin() {
  const session = getSession();
  return session?.role === UserRole.ADMIN ? session : null;
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = ensureAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const input = actorUpdateSchema.parse(json);

    const actor = await prisma.actor.update({
      where: { id: params.id },
      data: input
    });

    logInfo("PUT /api/admin/actors/[id]", { actorId: actor.id, adminId: session.userId });
    return NextResponse.json({ actor });
  } catch (error) {
    logError("PUT /api/admin/actors/[id] failed", error);
    return NextResponse.json({ error: "Failed to update actor" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = ensureAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await prisma.actor.delete({ where: { id: params.id } });

    logInfo("DELETE /api/admin/actors/[id]", { actorId: params.id, adminId: session.userId });
    return NextResponse.json({ success: true });
  } catch (error) {
    logError("DELETE /api/admin/actors/[id] failed", error);
    return NextResponse.json({ error: "Failed to delete actor" }, { status: 400 });
  }
}
