import { z } from "zod";

const studentSchema = z.object({
  studentId: z.string().trim().min(1),
  gender: z.enum(["male", "female"]),
  heightCm: z.number().finite().positive(),
  roleLabel: z.string().trim().optional(),
});

const hexColorSchema = z.string().regex(/^#[0-9a-f]{6}$/i, "颜色必须为 6 位 HEX。");

export const appearanceSchema = z.object({
  performerId: z.string().trim().min(1),
  outfitId: z.string().trim().min(1),
  upperColor: hexColorSchema,
  lowerColor: hexColorSchema,
  footwearColor: hexColorSchema,
  accentColor: hexColorSchema,
});

export const appearanceDraftSchema = z.object({
  version: z.literal(1),
  manifestVersion: z.string().trim().min(1),
  entries: z.array(appearanceSchema).max(300),
  updatedAt: z.string().datetime(),
});

export const outfitManifestItemSchema = z.object({
  id: z.string().trim().min(1),
  label: z.string().trim().min(1),
  genders: z.array(z.enum(["male", "female"])).min(1),
  programTypes: z.array(z.string().trim().min(1)),
  tags: z.array(z.string().trim().min(1)),
  renderer: z.object({
    procedural: z.literal(true),
    sprite: z.object({
      status: z.enum(["planned", "ready"]),
      atlasUrl: z.string().trim().min(1).optional(),
      requiredViews: z.array(z.enum(["front", "front-left", "front-right", "side", "back"])),
      requiredMasks: z.array(z.enum(["upper", "lower", "footwear", "accent"])),
    }),
    glb: z.object({
      status: z.enum(["planned", "ready"]),
      maleUrl: z.string().trim().min(1).optional(),
      femaleUrl: z.string().trim().min(1).optional(),
      materialSlots: z.array(z.enum(["top", "bottom", "accent"])),
    }),
  }),
});

export const stagePositionSchema = z.object({
  performerId: z.string().trim().min(1),
  x: z.number().finite().min(-15).max(15),
  z: z.number().finite().min(0).max(20),
  riserLevel: z.number().int().min(0).max(8),
});

export const formationDraftSchema = z.object({
  version: z.literal(1),
  name: z.string().trim().min(1).max(80),
  template: z.enum(["grid", "staggered", "arc", "v"]),
  stageWidthM: z.number().finite().positive().max(30),
  stageDepthM: z.number().finite().positive().max(20),
  positions: z.array(stagePositionSchema).max(300),
  updatedAt: z.string().datetime(),
});

export const stageInputSchema = z.object({
  schoolStage: z.string().trim().optional(),
  programType: z.string().trim().optional(),
  programTheme: z.string().trim().optional(),
  venueType: z.string().trim().optional(),
  performerCount: z.number().int().positive().optional(),
  maleCount: z.number().int().nonnegative().optional(),
  femaleCount: z.number().int().nonnegative().optional(),
  perPersonBudget: z.number().finite().nonnegative().optional(),
  screenThemeColor: z.string().trim().optional(),
  lightingStyle: z.string().trim().optional(),
  specialExpectation: z.string().trim().optional(),
  performanceDate: z.string().trim().optional(),
  rehearsalFrequencyPerWeek: z.union([z.literal(2), z.literal(3), z.literal(5)]).optional(),
  students: z.array(studentSchema).optional(),
  confirmedFormation: z.object({
    summary: z.string().trim().optional(),
    rows: z.number().int().positive().optional(),
    layoutName: z.string().trim().optional(),
    spacingRule: z.string().trim().optional(),
  }).optional(),
  formationDraft: formationDraftSchema.optional(),
  appearanceDraft: appearanceDraftSchema.optional(),
}).superRefine((value, ctx) => {
  if (
    value.performerCount !== undefined &&
    value.maleCount !== undefined &&
    value.femaleCount !== undefined &&
    value.maleCount + value.femaleCount !== value.performerCount
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["performerCount"],
      message: "男生数与女生数之和必须等于总人数。",
    });
  }

  if (
    value.performerCount !== undefined &&
    value.students &&
    value.students.length > 0 &&
    value.students.length !== value.performerCount
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["students"],
      message: "学生名录数量必须与总人数一致。",
    });
  }
});

export const planEngineMetadataSchema = z.object({
  engine: z.enum(["local_rules", "ai_assisted"]),
  generatedAt: z.string().datetime(),
  schemaVersion: z.string(),
  knowledgeVersion: z.string(),
  constraintVersion: z.string(),
  paletteVersion: z.string(),
  fallbackUsed: z.boolean(),
});

export type StageInput = z.infer<typeof stageInputSchema>;
export type StagePosition = z.infer<typeof stagePositionSchema>;
export type FormationDraft = z.infer<typeof formationDraftSchema>;
export type Appearance = z.infer<typeof appearanceSchema>;
export type AppearanceDraft = z.infer<typeof appearanceDraftSchema>;
export type OutfitManifestItem = z.infer<typeof outfitManifestItemSchema>;
export type PlanEngineMetadata = z.infer<typeof planEngineMetadataSchema>;
