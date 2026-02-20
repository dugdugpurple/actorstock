import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(valueCents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(valueCents / 100);
}

export function parseCsv(value: string | null | undefined): string[] {
  if (!value) return [];

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}

export function compactText(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
