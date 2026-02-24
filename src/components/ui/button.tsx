import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold uppercase tracking-[0.04em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/40",
  {
    variants: {
      variant: {
        default:
          "bg-neon/[0.12] border border-neon text-white hover:bg-neon hover:text-black hover:shadow-[0_0_20px_rgba(0,212,255,0.6)]",
        outline:
          "border border-slate-700 bg-transparent text-slate-200 hover:border-neon hover:text-neon hover:bg-neon/[0.07]",
        secondary:
          "border border-slate-600 bg-slate-800/70 text-slate-200 hover:border-slate-500 hover:bg-slate-700/80",
        destructive: "bg-red-600/80 border border-red-500 text-white hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]",
        ghost: "text-slate-300 hover:text-neon hover:bg-neon/[0.07]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
