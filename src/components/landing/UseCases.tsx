import { GraduationCap, Megaphone } from "lucide-react";
import { UseCaseCard, type UseCase } from "@/components/landing/UseCaseCard";

type UseCasesProps = {
  useCases: UseCase[];
};

export function UseCases({ useCases }: UseCasesProps) {
  return (
    <section aria-labelledby="use-cases-heading" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-2xl border border-slate-700/70 bg-slate-900/45 p-6">
        <h2 id="use-cases-heading" className="text-2xl font-semibold text-slate-100">
          Ideal for Ads, Videos, Games & More
        </h2>

        <p className="mt-3 text-sm text-slate-300">AI actors for campaigns, content, training and gaming teams.</p>

        <ul className="mt-6 space-y-3">
          <li className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-200">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-slate-300">
              <Megaphone size={16} />
            </span>
            Advertising
          </li>
          <li className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-200">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-slate-300">
              <GraduationCap size={16} />
            </span>
            E-Learning
          </li>
        </ul>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((useCase) => (
          <UseCaseCard key={useCase.title} useCase={useCase} />
        ))}
      </div>
    </section>
  );
}
