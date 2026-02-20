import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/40",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-[0_10px_30px_rgba(192,38,211,0.38)] hover:brightness-110",
        outline:
          "border border-slate-700 bg-slate-900/80 text-slate-100 hover:border-fuchsia-400/40 hover:bg-slate-800/85",
        secondary: "bg-indigo-600 text-white hover:bg-indigo-500",
        destructive: "bg-red-600 text-white hover:bg-red-500",
        ghost: "text-slate-200 hover:bg-slate-800/70"
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
