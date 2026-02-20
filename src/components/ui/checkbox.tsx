import * as React from "react";
import { cn } from "@/lib/utils";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border-slate-700 bg-slate-900 text-fuchsia-500 focus:ring-fuchsia-400/40",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
