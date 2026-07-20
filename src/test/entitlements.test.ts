import { describe, expect, it } from "vitest";
import { canUsePreview, getEntitlements } from "@/domain/stageos/entitlements";

describe("StageOS entitlements", () => {
  it("免费版只开放黑点草图并限制为一个快照", () => {
    const free = getEntitlements("free");

    expect(free.previewModes).toEqual(["dot-sketch"]);
    expect(free.maxSnapshots).toBe(1);
    expect(canUsePreview("free", "stage-2.5d")).toBe(false);
    expect(canUsePreview("free", "stage-3d")).toBe(false);
  });

  it("会员版开放 2.5D 与 3D 预览", () => {
    expect(canUsePreview("member", "stage-2.5d")).toBe(true);
    expect(canUsePreview("member", "stage-3d")).toBe(true);
  });
});
