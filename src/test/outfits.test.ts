import { describe, expect, it } from "vitest";
import { appearanceDraftSchema, outfitManifestItemSchema } from "@/domain/stageos/schemas";
import {
  OUTFIT_MANIFEST,
  OUTFIT_MANIFEST_VERSION,
  applyOutfitToAppearances,
  appearanceToGlbColors,
  createAppearanceDraft,
  reconcileAppearanceDraft,
} from "@/domain/stageos/outfits";

describe("统一服装与配色契约", () => {
  it("manifest 条目合法，并如实标记当前贴图尚未交付", () => {
    expect(OUTFIT_MANIFEST.length).toBeGreaterThan(0);
    for (const outfit of OUTFIT_MANIFEST) {
      expect(outfitManifestItemSchema.safeParse(outfit).success).toBe(true);
      expect(outfit.renderer.procedural).toBe(true);
      expect(outfit.renderer.sprite.status).toBe("planned");
      expect(outfit.renderer.sprite.atlasUrl).toBeUndefined();
      expect(outfit.renderer.sprite.requiredViews).toEqual(["front", "front-left", "front-right", "side", "back"]);
      expect(outfit.renderer.sprite.requiredMasks).toEqual(["upper", "lower", "footwear", "accent"]);
    }
  });

  it("现有男女人台 GLB 与材质槽写入 manifest", () => {
    for (const outfit of OUTFIT_MANIFEST) {
      expect(outfit.renderer.glb).toMatchObject({
        status: "ready",
        maleUrl: "/models/boy.glb",
        femaleUrl: "/models/girl.glb",
        materialSlots: ["top", "bottom", "accent"],
      });
    }
  });

  it("按节目生成每人一条合法外观数据", () => {
    const draft = createAppearanceDraft(["S001", "S002"], "folk_dance");

    expect(draft.manifestVersion).toBe(OUTFIT_MANIFEST_VERSION);
    expect(draft.entries).toHaveLength(2);
    expect(draft.entries.every((item) => item.outfitId === "movement-basic")).toBe(true);
    expect(appearanceDraftSchema.safeParse(draft).success).toBe(true);
  });

  it("人数变化时保留已选颜色并补齐新演员", () => {
    const existing = createAppearanceDraft(["S001"], "chorus");
    existing.entries[0].upperColor = "#123456";
    const next = reconcileAppearanceDraft(["S001", "S002"], "chorus", existing);

    expect(next.entries).toHaveLength(2);
    expect(next.entries.find((item) => item.performerId === "S001")?.upperColor).toBe("#123456");
    expect(next.entries.some((item) => item.performerId === "S002")).toBe(true);
  });

  it("仅接受 manifest 内的套装，并拒绝非法 HEX", () => {
    const entries = createAppearanceDraft(["S001"], "chorus").entries;
    expect(applyOutfitToAppearances(entries, "recitation-minimal")[0].outfitId).toBe("recitation-minimal");
    expect(applyOutfitToAppearances(entries, "missing-outfit")).toEqual(entries);
    expect(appearanceDraftSchema.safeParse({
      ...createAppearanceDraft(["S001"], "chorus"),
      entries: [{ ...entries[0], accentColor: "red" }],
    }).success).toBe(false);
  });

  it("3D 材质槽复用统一外观颜色，鞋履保留给后续模型槽", () => {
    const appearance = createAppearanceDraft(["S001"], "chorus").entries[0];
    appearance.upperColor = "#112233";
    appearance.lowerColor = "#445566";
    appearance.accentColor = "#778899";
    appearance.footwearColor = "#AABBCC";

    expect(appearanceToGlbColors(appearance)).toEqual({
      top: "#112233",
      bottom: "#445566",
      accent: "#778899",
    });
  });
});
