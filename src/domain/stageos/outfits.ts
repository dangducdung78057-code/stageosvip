import type { Appearance, AppearanceDraft, OutfitManifestItem } from "./schemas";
import { getPaletteForProgram } from "@/lib/paletteLibrary";

export const OUTFIT_MANIFEST_VERSION = "stageos-outfits-1.0.0";

const REQUIRED_VIEWS = ["front", "front-left", "front-right", "side", "back"] as const;
const REQUIRED_MASKS = ["upper", "lower", "footwear", "accent"] as const;
const MATERIAL_SLOTS = ["top", "bottom", "accent"] as const;

export const OUTFIT_MANIFEST: OutfitManifestItem[] = [
  {
    id: "school-formal",
    label: "校园正式套装",
    genders: ["male", "female"],
    programTypes: ["chorus", "mixed_chorus", "host", "etiquette_award"],
    tags: ["正式", "合唱", "校园"],
    renderer: {
      procedural: true,
      sprite: { status: "planned", requiredViews: [...REQUIRED_VIEWS], requiredMasks: [...REQUIRED_MASKS] },
      glb: { status: "ready", maleUrl: "/models/boy.glb", femaleUrl: "/models/girl.glb", materialSlots: [...MATERIAL_SLOTS] },
    },
  },
  {
    id: "movement-basic",
    label: "轻量舞动套装",
    genders: ["male", "female"],
    programTypes: ["classical_dance", "folk_dance", "modern_jazz_street", "ballet", "cheerleading"],
    tags: ["舞蹈", "轻量", "无锐角"],
    renderer: {
      procedural: true,
      sprite: { status: "planned", requiredViews: [...REQUIRED_VIEWS], requiredMasks: [...REQUIRED_MASKS] },
      glb: { status: "ready", maleUrl: "/models/boy.glb", femaleUrl: "/models/girl.glb", materialSlots: [...MATERIAL_SLOTS] },
    },
  },
  {
    id: "recitation-minimal",
    label: "朗诵简洁套装",
    genders: ["male", "female"],
    programTypes: ["recitation", "drama"],
    tags: ["朗诵", "戏剧", "低干扰"],
    renderer: {
      procedural: true,
      sprite: { status: "planned", requiredViews: [...REQUIRED_VIEWS], requiredMasks: [...REQUIRED_MASKS] },
      glb: { status: "ready", maleUrl: "/models/boy.glb", femaleUrl: "/models/girl.glb", materialSlots: [...MATERIAL_SLOTS] },
    },
  },
  {
    id: "ensemble-classic",
    label: "器乐经典套装",
    genders: ["male", "female"],
    programTypes: ["western_orchestra", "folk_orchestra", "instrument"],
    tags: ["器乐", "坐姿", "经典"],
    renderer: {
      procedural: true,
      sprite: { status: "planned", requiredViews: [...REQUIRED_VIEWS], requiredMasks: [...REQUIRED_MASKS] },
      glb: { status: "ready", maleUrl: "/models/boy.glb", femaleUrl: "/models/girl.glb", materialSlots: [...MATERIAL_SLOTS] },
    },
  },
];

export function resolveOutfitId(programType?: string): string {
  return OUTFIT_MANIFEST.find((item) => item.programTypes.includes(programType ?? ""))?.id ?? OUTFIT_MANIFEST[0].id;
}

function colorsFor(programType?: string) {
  const palette = getPaletteForProgram(programType ?? "");
  return {
    upperColor: palette[0]?.hex ?? "#355C7D",
    lowerColor: palette[1]?.hex ?? "#263444",
    accentColor: palette[2]?.hex ?? "#9E4255",
    footwearColor: palette[3]?.hex ?? "#20252E",
  };
}

export function createAppearanceDraft(performerIds: string[], programType?: string): AppearanceDraft {
  const outfitId = resolveOutfitId(programType);
  const colors = colorsFor(programType);
  return {
    version: 1,
    manifestVersion: OUTFIT_MANIFEST_VERSION,
    entries: performerIds.map((performerId) => ({ performerId, outfitId, ...colors })),
    updatedAt: new Date().toISOString(),
  };
}

export function reconcileAppearanceDraft(
  performerIds: string[],
  programType?: string,
  existing?: AppearanceDraft,
): AppearanceDraft {
  const generated = createAppearanceDraft(performerIds, programType);
  if (!existing) return generated;
  const existingById = new Map(existing.entries.map((item) => [item.performerId, item]));
  return {
    ...existing,
    manifestVersion: OUTFIT_MANIFEST_VERSION,
    entries: generated.entries.map((fallback) => existingById.get(fallback.performerId) ?? fallback),
  };
}

export function applyOutfitToAppearances(entries: Appearance[], outfitId: string): Appearance[] {
  if (!OUTFIT_MANIFEST.some((item) => item.id === outfitId)) return entries;
  return entries.map((entry) => ({ ...entry, outfitId }));
}

export function appearanceToGlbColors(appearance: Appearance) {
  return {
    top: appearance.upperColor,
    bottom: appearance.lowerColor,
    accent: appearance.accentColor,
  };
}
