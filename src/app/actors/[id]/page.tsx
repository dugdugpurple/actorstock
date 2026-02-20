import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AGE_RANGE_LABELS, GENDER_LABELS } from "@/lib/constants";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function getIpFromHeaders(): string | null {
  const requestHeaders = headers();
  const forwarded = requestHeaders.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || null;
  }

  return requestHeaders.get("x-real-ip") ?? null;
}

export const dynamic = "force-dynamic";

export default async function ActorDetailPage({ params }: { params: { id: string } }) {
  const actor = await prisma.actor.findUnique({
    where: { id: params.id },
    include: {
      _count: {
        select: {
          orders: true,
          views: true
        }
      }
    }
  });

  if (!actor || !actor.isPublished) {
    notFound();
  }

  const session = getSession();

  await prisma.$transaction([
    prisma.actorView.create({
      data: {
        actorId: actor.id,
        userId: session?.userId ?? null,
        ipAddress: getIpFromHeaders()
      }
    }),
    prisma.actor.update({
      where: { id: actor.id },
      data: {
        viewCount: {
          increment: 1
        }
      }
    })
  ]);

  return (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-3">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <img src={actor.imageUrls[0]} alt={actor.name} className="h-full w-full object-cover" />
          </div>
          {actor.imageUrls.length > 1 ? (
            <div className="grid grid-cols-3 gap-3">
              {actor.imageUrls.slice(1).map((imageUrl) => (
                <div key={imageUrl} className="aspect-[4/5] overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
                  <img src={imageUrl} alt={`${actor.name} gallery`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-5">
          <div>
            <h1 className="font-[var(--font-heading)] text-4xl font-bold text-white">{actor.name}</h1>
            <p className="mt-2 text-slate-300">{actor.bioShort}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="calm">{AGE_RANGE_LABELS[actor.ageRange]}</Badge>
            <Badge variant="subtle">{GENDER_LABELS[actor.genderPresentation]}</Badge>
            <Badge variant="subtle">{actor.viewCount + 1} views</Badge>
            <Badge variant="subtle">{actor._count.orders} orders</Badge>
          </div>

          <Card>
            <CardContent className="space-y-3 p-5">
              <p className="text-sm font-semibold text-slate-200">Languages</p>
              <div className="flex flex-wrap gap-2">
                {actor.languages.map((language) => (
                  <Badge key={language} variant="accent">
                    {language.toUpperCase()}
                  </Badge>
                ))}
              </div>

              <p className="pt-3 text-sm font-semibold text-slate-200">Style / vibe / emotion</p>
              <div className="flex flex-wrap gap-2">
                {[...actor.styleTags, ...actor.vibeTags, ...actor.emotionTags].map((tag) => (
                  <Badge key={tag} variant="subtle">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {actor.voiceSampleUrl ? (
            <Card>
              <CardContent className="space-y-2 p-5">
                <p className="text-sm font-semibold text-slate-200">Voice sample</p>
                <audio controls className="w-full">
                  <source src={actor.voiceSampleUrl} />
                </audio>
              </CardContent>
            </Card>
          ) : null}

          {actor.videoSampleUrl ? (
            <Card>
              <CardContent className="space-y-2 p-5">
                <p className="text-sm font-semibold text-slate-200">Video sample</p>
                <video controls className="w-full rounded-lg border border-slate-800" src={actor.videoSampleUrl} />
              </CardContent>
            </Card>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Link href={`/license?actorId=${actor.id}`}>
              <Button size="lg">License this actor</Button>
            </Link>
            <Link href="/actors">
              <Button size="lg" variant="outline">
                Back to browse
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
