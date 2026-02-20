import type { LucideIcon } from "lucide-react";

export type WorkflowStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type StepCardProps = {
  step: WorkflowStep;
};

export function StepCard({ step }: StepCardProps) {
  const Icon = step.icon;

  return (
    <article className="flex h-full flex-col items-center rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-5 text-center">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-slate-300">
        <Icon size={18} />
      </span>

      <h3 className="mt-3 text-base font-semibold text-slate-100">{step.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{step.description}</p>
    </article>
  );
}
