import { NextResponse } from "next/server";
import { logError, logInfo } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const actor = await prisma.actor.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { orders: true, views: true }
        }
      }
    });

    if (!actor || !actor.isPublished) {
      return NextResponse.json({ error: "Actor not found" }, { status: 404 });
    }

    logInfo("GET /api/actors/[id]", { actorId: params.id });
    return NextResponse.json({ data: actor });
  } catch (error) {
    logError("GET /api/actors/[id] failed", error);
    return NextResponse.json({ error: "Failed to fetch actor" }, { status: 500 });
  }
}
