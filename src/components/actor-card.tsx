import Link from "next/link";
import { AgeRange } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AGE_RANGE_LABELS } from "@/lib/constants";

type ActorCardProps = {
  actor: {
    id: string;
    name: string;
    ageRange: AgeRange;
    styleTags: string[];
    vibeTags: string[];
    languages: string[];
    imageUrls: string[];
    viewCount: number;
  };
};

export function ActorCard({ actor }: ActorCardProps) {
  const tags = [...actor.styleTags, ...actor.vibeTags].slice(0, 3);

  return (
    <Link href={`/actors/${actor.id}`}>
      <Card className="group overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
          <img
            src={actor.imageUrls[0]}
            alt={actor.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <Badge variant="calm">{AGE_RANGE_LABELS[actor.ageRange]}</Badge>
          </div>
        </div>

        <CardContent className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-[var(--font-heading)] text-lg font-semibold text-white">{actor.name}</h3>
            <span className="text-xs text-slate-500">{actor.viewCount} views</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="subtle">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {actor.languages.map((language) => (
              <Badge key={language} variant="accent">
                {language.toUpperCase()}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
