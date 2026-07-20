import type { FormationDraft, StagePosition } from "@/domain/stageos/schemas";

export type DotSketchTemplate = FormationDraft["template"];

export const DOT_STAGE_WIDTH_M = 14;
export const DOT_STAGE_DEPTH_M = 8;

export type CanvasGeometry = {
  scale: number;
  originX: number;
  originY: number;
  stagePixelWidth: number;
  stagePixelDepth: number;
};

function riserLevel(z: number): number {
  return Math.max(0, Math.min(4, Math.round((z - 1) / 1.25)));
}

function position(performerId: string, x: number, z: number): StagePosition {
  return { performerId, x, z, riserLevel: riserLevel(z) };
}

function gridPositions(ids: string[], staggered: boolean): StagePosition[] {
  const count = ids.length;
  if (count === 0) return [];
  const columns = Math.max(1, Math.ceil(Math.sqrt(count * 1.65)));
  const rows = Math.ceil(count / columns);
  const spacingX = Math.min(1.35, 11.5 / Math.max(1, columns - 1));
  const spacingZ = Math.min(1.2, 5.6 / Math.max(1, rows - 1));

  return ids.map((id, index) => {
    const row = Math.floor(index / columns);
    const rowCount = Math.min(columns, count - row * columns);
    const column = index - row * columns;
    const offset = staggered && row % 2 === 1 ? spacingX / 2 : 0;
    const x = (column - (rowCount - 1) / 2) * spacingX + offset;
    const z = 1.2 + row * spacingZ;
    return position(id, x, z);
  });
}

function arcPositions(ids: string[]): StagePosition[] {
  if (ids.length <= 1) return ids.map((id) => position(id, 0, 2.4));
  const radius = Math.min(5.5, 2.6 + ids.length * 0.07);
  return ids.map((id, index) => {
    const t = index / (ids.length - 1);
    const angle = Math.PI * (0.12 + t * 0.76);
    return position(id, Math.cos(angle) * radius, 1.05 + Math.sin(angle) * radius * 0.72);
  });
}

function vPositions(ids: string[]): StagePosition[] {
  const maxStep = Math.max(1, Math.ceil((ids.length - 1) / 2));
  const xStep = Math.min(0.68, 5.8 / maxStep);
  const zStep = Math.min(0.58, 6 / maxStep);
  return ids.map((id, index) => {
    if (index === 0) return position(id, 0, 1.1);
    const step = Math.ceil(index / 2);
    const side = index % 2 === 1 ? -1 : 1;
    return position(id, side * step * xStep, 1.1 + step * zStep);
  });
}

export function buildTemplatePositions(ids: string[], template: DotSketchTemplate): StagePosition[] {
  if (template === "arc") return arcPositions(ids);
  if (template === "v") return vPositions(ids);
  return gridPositions(ids, template === "staggered");
}

export function createFormationDraft(
  performerIds: string[],
  template: DotSketchTemplate = "grid",
): FormationDraft {
  return {
    version: 1,
    name: "当前队形",
    template,
    stageWidthM: DOT_STAGE_WIDTH_M,
    stageDepthM: DOT_STAGE_DEPTH_M,
    positions: buildTemplatePositions(performerIds, template),
    updatedAt: new Date().toISOString(),
  };
}

export function reconcileFormationDraft(
  performerIds: string[],
  existing?: FormationDraft,
): FormationDraft {
  if (!existing) return createFormationDraft(performerIds);
  const existingById = new Map(existing.positions.map((item) => [item.performerId, item]));
  const generated = buildTemplatePositions(performerIds, existing.template);
  return {
    ...existing,
    positions: generated.map((fallback) => existingById.get(fallback.performerId) ?? fallback),
  };
}

export function getCanvasGeometry(
  width: number,
  height: number,
  stageWidthM = DOT_STAGE_WIDTH_M,
  stageDepthM = DOT_STAGE_DEPTH_M,
): CanvasGeometry {
  const padding = Math.max(24, Math.min(40, width * 0.045));
  const scale = Math.max(1, Math.min((width - padding * 2) / stageWidthM, (height - padding * 2) / stageDepthM));
  const stagePixelWidth = stageWidthM * scale;
  const stagePixelDepth = stageDepthM * scale;
  return {
    scale,
    originX: width / 2,
    originY: (height + stagePixelDepth) / 2,
    stagePixelWidth,
    stagePixelDepth,
  };
}

export function stageToCanvas(point: Pick<StagePosition, "x" | "z">, geometry: CanvasGeometry) {
  return {
    x: geometry.originX + point.x * geometry.scale,
    y: geometry.originY - point.z * geometry.scale,
  };
}

export function canvasToStage(
  point: { x: number; y: number },
  geometry: CanvasGeometry,
  stageWidthM = DOT_STAGE_WIDTH_M,
  stageDepthM = DOT_STAGE_DEPTH_M,
) {
  const x = (point.x - geometry.originX) / geometry.scale;
  const z = (geometry.originY - point.y) / geometry.scale;
  const clampedX = Math.max(-stageWidthM / 2, Math.min(stageWidthM / 2, x));
  const clampedZ = Math.max(0, Math.min(stageDepthM, z));
  return { x: clampedX, z: clampedZ, riserLevel: riserLevel(clampedZ) };
}
