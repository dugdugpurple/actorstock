import { AgeRange, GenderPresentation, OrderStatus, OrderType } from "@prisma/client";
import { z } from "zod";
import { compactText, unique } from "@/lib/utils";

const tagsSchema = z.array(z.string().trim().min(1)).max(30).transform(unique);

export const actorCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  ageRange: z.nativeEnum(AgeRange),
  genderPresentation: z.nativeEnum(GenderPresentation),
  styleTags: tagsSchema.default([]),
  vibeTags: tagsSchema.default([]),
  emotionTags: tagsSchema.default([]),
  languages: z.array(z.string().trim().min(2).max(8)).min(1).max(10).transform(unique),
  bioShort: z.string().trim().min(20).max(360),
  imageUrls: z.array(z.string().trim().min(1)).min(1).max(12),
  voiceSampleUrl: z.string().trim().min(1).optional().nullable(),
  videoSampleUrl: z.string().trim().min(1).optional().nullable(),
  isPublished: z.boolean().default(false)
});

export const actorUpdateSchema = actorCreateSchema.partial();

export const orderCreateSchema = z
  .object({
    actorId: z.string().uuid().nullable().optional(),
    planId: z.string().uuid().nullable().optional(),
    type: z.nativeEnum(OrderType),
    companyName: z.string().trim().max(120).nullable().optional(),
    notes: z.string().trim().max(2000).nullable().optional()
  })
  .transform((value) => ({
    ...value,
    companyName: compactText(value.companyName),
    notes: compactText(value.notes)
  }))
  .refine((value) => value.type === OrderType.REQUEST || Boolean(value.planId), {
    message: "Plan is required for non-request order types",
    path: ["planId"]
  });

export const orderStatusUpdateSchema = z.object({
  status: z.nativeEnum(OrderStatus)
});

export const loginSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z.string().min(4).max(100)
});

export type ActorCreateInput = z.infer<typeof actorCreateSchema>;
export type ActorUpdateInput = z.infer<typeof actorUpdateSchema>;
export type OrderCreateInput = z.infer<typeof orderCreateSchema>;
