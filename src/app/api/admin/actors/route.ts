import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { logError, logInfo } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { actorCreateSchema } from "@/lib/validations";

function ensureAdmin() {
  const session = getSession();
  return session?.role === UserRole.ADMIN ? session : null;
}

export async function POST(request: Request) {
  const session = ensureAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const input = actorCreateSchema.parse(json);

    const actor = await prisma.actor.create({ data: input });

    logInfo("POST /api/admin/actors", { actorId: actor.id, adminId: session.userId });
    return NextResponse.json({ actor });
  } catch (error) {
    logError("POST /api/admin/actors failed", error);
    return NextResponse.json({ error: "Failed to create actor" }, { status: 400 });
  }
}
