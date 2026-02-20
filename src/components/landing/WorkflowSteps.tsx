import { StepCard, type WorkflowStep } from "@/components/landing/StepCard";

type WorkflowStepsProps = {
  steps: WorkflowStep[];
};

export function WorkflowSteps({ steps }: WorkflowStepsProps) {
  return (
    <section aria-labelledby="workflow-heading" className="rounded-2xl border border-slate-700/70 bg-slate-900/45 p-6 sm:p-8">
      <h2 id="workflow-heading" className="text-center text-2xl font-semibold text-slate-100">
        Simple Licensing &amp; Workflow
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <StepCard key={step.title} step={step} />
        ))}
      </div>
    </section>
  );
}
