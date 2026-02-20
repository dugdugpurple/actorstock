import { NextRequest, NextResponse } from "next/server";
import { buildActorOrderBy, buildActorWhere, parseActorFilters } from "@/lib/actors";
import { logError, logInfo } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const params: Record<string, string | string[] | undefined> = {};
    for (const [key, value] of request.nextUrl.searchParams.entries()) {
      const previous = params[key];
      if (!previous) {
        params[key] = value;
      } else if (Array.isArray(previous)) {
        params[key] = [...previous, value];
      } else {
        params[key] = [previous, value];
      }
    }

    const filters = parseActorFilters(params);
    const where = buildActorWhere(filters);

    const actors = await prisma.actor.findMany({
      where,
      orderBy: buildActorOrderBy(filters.sort),
      select: {
        id: true,
        name: true,
        ageRange: true,
        genderPresentation: true,
        styleTags: true,
        vibeTags: true,
        emotionTags: true,
        languages: true,
        bioShort: true,
        imageUrls: true,
        voiceSampleUrl: true,
        videoSampleUrl: true,
        viewCount: true,
        createdAt: true,
        updatedAt: true
      }
    });

    logInfo("GET /api/actors", { count: actors.length });

    return NextResponse.json({ data: actors });
  } catch (error) {
    logError("GET /api/actors failed", error);
    return NextResponse.json({ error: "Failed to fetch actors" }, { status: 500 });
  }
}
