import { describe, expect, it } from "vitest";
import { formationDraftSchema } from "@/domain/stageos/schemas";
import {
  buildTemplatePositions,
  canvasToStage,
  createFormationDraft,
  getCanvasGeometry,
  reconcileFormationDraft,
  stageToCanvas,
  type DotSketchTemplate,
} from "@/features/formations/dotSketch";

const ids = Array.from({ length: 24 }, (_, index) => `S${String(index + 1).padStart(3, "0")}`);
const templates: DotSketchTemplate[] = ["grid", "staggered", "arc", "v"];

describe("免费黑点草图", () => {
  it.each(templates)("%s 模板为每名演员生成合法米制坐标", (template) => {
    const positions = buildTemplatePositions(ids, template);

    expect(positions).toHaveLength(ids.length);
    expect(new Set(positions.map((item) => item.performerId)).size).toBe(ids.length);
    expect(new Set(positions.map((item) => `${item.x.toFixed(4)},${item.z.toFixed(4)}`)).size).toBe(ids.length);
    for (const item of positions) {
      expect(item.x).toBeGreaterThanOrEqual(-7);
      expect(item.x).toBeLessThanOrEqual(7);
      expect(item.z).toBeGreaterThanOrEqual(0);
      expect(item.z).toBeLessThanOrEqual(8);
      expect(item.riserLevel).toBeGreaterThanOrEqual(0);
    }
  });

  it("人数变化时保留已有坐标并补齐新演员", () => {
    const initial = createFormationDraft(ids.slice(0, 3));
    initial.positions[0] = { performerId: "S001", x: 2.25, z: 3.5, riserLevel: 2 };

    const reconciled = reconcileFormationDraft(ids.slice(0, 4), initial);

    expect(reconciled.positions).toHaveLength(4);
    expect(reconciled.positions.find((item) => item.performerId === "S001")).toMatchObject({ x: 2.25, z: 3.5 });
    expect(reconciled.positions.some((item) => item.performerId === "S004")).toBe(true);
  });

  it("舞台坐标与 Canvas 坐标可往返并在边界内裁剪", () => {
    const geometry = getCanvasGeometry(900, 520);
    const canvasPoint = stageToCanvas({ x: 2.4, z: 5.1 }, geometry);
    const stagePoint = canvasToStage(canvasPoint, geometry);

    expect(stagePoint.x).toBeCloseTo(2.4, 5);
    expect(stagePoint.z).toBeCloseTo(5.1, 5);
    expect(canvasToStage({ x: -1000, y: 2000 }, geometry)).toMatchObject({ x: -7, z: 0 });
  });

  it("Schema 接受合法草图并拒绝越界坐标", () => {
    const valid = createFormationDraft(ids.slice(0, 2));
    expect(formationDraftSchema.safeParse(valid).success).toBe(true);
    expect(formationDraftSchema.safeParse({
      ...valid,
      positions: [{ performerId: "S001", x: 99, z: 2, riserLevel: 0 }],
    }).success).toBe(false);
  });
});
