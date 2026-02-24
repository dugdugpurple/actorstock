"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type ToastVariant = "info" | "success" | "error";

type Toast = {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
};

type ToastInput = Omit<Toast, "id">;

type ToastContextValue = {
  toast: (input: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function variantClass(variant: ToastVariant) {
  if (variant === "success") return "border-emerald-500/30 bg-emerald-500/15 text-emerald-100";
  if (variant === "error") return "border-red-500/30 bg-red-500/15 text-red-100";
  return "border-[#00d4ff]/30 bg-[#00d4ff]/10 text-slate-100";
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((input: ToastInput) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, ...input }]);

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toastItem) => toastItem.id !== id));
    }, 3600);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toastItem) => (
          <div
            key={toastItem.id}
            className={cn(
              "pointer-events-auto rounded-lg border p-3 text-sm shadow-[0_8px_20px_rgba(2,6,23,0.5)] backdrop-blur-sm",
              variantClass(toastItem.variant)
            )}
          >
            <p className="font-semibold">{toastItem.title}</p>
            {toastItem.description ? <p className="mt-1 text-xs opacity-90">{toastItem.description}</p> : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return value;
}
