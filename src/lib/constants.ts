import { AgeRange, GenderPresentation, OrderStatus, OrderType } from "@prisma/client";

export const AGE_RANGE_LABELS: Record<AgeRange, string> = {
  [AgeRange.AGE_18_25]: "18-25",
  [AgeRange.AGE_26_35]: "26-35",
  [AgeRange.AGE_36_45]: "36-45",
  [AgeRange.AGE_46_60]: "46-60",
  [AgeRange.AGE_60_PLUS]: "60+"
};

export const GENDER_LABELS: Record<GenderPresentation, string> = {
  [GenderPresentation.MALE]: "Male",
  [GenderPresentation.FEMALE]: "Female",
  [GenderPresentation.ANDROGYNOUS]: "Androgynous",
  [GenderPresentation.OTHER]: "Other"
};

export const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  [OrderType.SUBSCRIPTION]: "Subscription",
  [OrderType.PAY_PER_USE]: "Pay per use",
  [OrderType.REQUEST]: "Request custom"
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "Pending",
  [OrderStatus.PAID]: "Paid",
  [OrderStatus.ACTIVE]: "Active",
  [OrderStatus.CANCELLED]: "Cancelled"
};

export const STYLE_OPTIONS = [
  "commercial",
  "beauty",
  "lifestyle",
  "street",
  "fashion",
  "sports",
  "corporate",
  "finance",
  "tech",
  "editorial",
  "healthcare",
  "education",
  "gaming",
  "luxury",
  "automotive"
] as const;

export const VIBE_OPTIONS = [
  "warm",
  "trustworthy",
  "premium",
  "energetic",
  "bold",
  "youthful",
  "authoritative",
  "calm",
  "future",
  "empathetic",
  "friendly",
  "hype",
  "elegant",
  "welcoming",
  "dynamic"
] as const;

export const EMOTION_OPTIONS = [
  "friendly",
  "confident",
  "calm",
  "excited",
  "focused",
  "supportive",
  "joyful",
  "serious",
  "reassuring",
  "dramatic",
  "optimistic",
  "steady"
] as const;

export const LANGUAGE_OPTIONS = ["sk", "cs", "en", "de"] as const;
