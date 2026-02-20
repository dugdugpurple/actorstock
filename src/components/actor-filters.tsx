import { AgeRange } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  AGE_RANGE_LABELS,
  EMOTION_OPTIONS,
  LANGUAGE_OPTIONS,
  STYLE_OPTIONS,
  VIBE_OPTIONS
} from "@/lib/constants";
import { ActorFilterInput } from "@/lib/actors";

type ActorFiltersProps = {
  filters: ActorFilterInput;
};

function CheckboxGroup({
  name,
  options,
  selected
}: {
  name: string;
  options: readonly string[];
  selected: string[];
}) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-3">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2 text-sm text-slate-300">
          <Checkbox name={name} value={option} defaultChecked={selected.includes(option)} />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

export function ActorFilters({ filters }: ActorFiltersProps) {
  return (
    <Card className="border-slate-800/90 bg-slate-900/80">
      <CardContent className="p-5">
        <form method="get" className="space-y-5">
          <div className="grid gap-3 md:grid-cols-[2fr_1fr_auto]">
            <Input name="q" placeholder="Search name, bio, tags..." defaultValue={filters.q ?? ""} />
            <Select name="sort" defaultValue={filters.sort}>
              <option value="newest">Newest</option>
              <option value="popular">Most popular</option>
            </Select>
            <div className="flex gap-2">
              <Button type="submit" variant="secondary" className="w-full md:w-auto">
                Apply
              </Button>
              <a
                href="/actors"
                className="inline-flex h-10 items-center justify-center rounded-md border border-slate-700 px-3 text-sm font-medium text-slate-300 hover:bg-slate-900/80"
              >
                Reset
              </a>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-slate-800 p-4">
            <p className="text-sm font-semibold text-slate-200">Age range</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {(Object.values(AgeRange) as AgeRange[]).map((ageRange) => (
                <label key={ageRange} className="flex items-center gap-2 text-sm text-slate-300">
                  <Checkbox
                    name="ageRange"
                    value={ageRange}
                    defaultChecked={filters.ageRanges.includes(ageRange)}
                  />
                  <span>{AGE_RANGE_LABELS[ageRange]}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-slate-800 p-4">
            <p className="text-sm font-semibold text-slate-200">Languages</p>
            <CheckboxGroup name="language" options={LANGUAGE_OPTIONS} selected={filters.languages} />
          </div>

          <div className="space-y-4 rounded-lg border border-slate-800 p-4">
            <p className="text-sm font-semibold text-slate-200">Style</p>
            <CheckboxGroup name="style" options={STYLE_OPTIONS} selected={filters.styles} />
          </div>

          <div className="space-y-4 rounded-lg border border-slate-800 p-4">
            <p className="text-sm font-semibold text-slate-200">Vibe</p>
            <CheckboxGroup name="vibe" options={VIBE_OPTIONS} selected={filters.vibes} />
          </div>

          <div className="space-y-4 rounded-lg border border-slate-800 p-4">
            <p className="text-sm font-semibold text-slate-200">Emotion</p>
            <CheckboxGroup name="emotion" options={EMOTION_OPTIONS} selected={filters.emotions} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
