import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", {
  variants: {
    variant: {
      default: "bg-slate-200 text-slate-900",
      subtle: "border border-slate-700 bg-slate-900 text-slate-300",
      accent: "border border-fuchsia-400/35 bg-fuchsia-500/15 text-fuchsia-200",
      calm: "border border-indigo-400/35 bg-indigo-500/15 text-indigo-200"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
