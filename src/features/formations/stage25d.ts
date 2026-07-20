import type { StagePosition } from "@/domain/stageos/schemas";

export type Stage25DProjection = {
  x: number;
  y: number;
  scale: number;
  depth: number;
};

export function projectStage25D(
  position: Pick<StagePosition, "x" | "z" | "riserLevel">,
  width: number,
  height: number,
  stageWidthM = 14,
  stageDepthM = 8,
): Stage25DProjection {
  const depthRatio = Math.max(0, Math.min(1, position.z / stageDepthM));
  const floorWidth = width * (0.82 - depthRatio * 0.22);
  const meterX = floorWidth / stageWidthM;
  const floorBottom = height * 0.88;
  const floorHeight = height * 0.54;
  return {
    x: width / 2 + position.x * meterX,
    y: floorBottom - depthRatio * floorHeight - position.riserLevel * Math.max(12, height * 0.035),
    scale: 1 - depthRatio * 0.18,
    depth: position.z + position.riserLevel * 0.15,
  };
}

export function dragStage25D(
  start: StagePosition,
  delta: { x: number; y: number },
  width: number,
  height: number,
  stageWidthM = 14,
  stageDepthM = 8,
): StagePosition {
  const meterX = stageWidthM / Math.max(1, width * 0.7);
  const meterZ = stageDepthM / Math.max(1, height * 0.54);
  const x = Math.max(-stageWidthM / 2, Math.min(stageWidthM / 2, start.x + delta.x * meterX));
  const z = Math.max(0, Math.min(stageDepthM, start.z - delta.y * meterZ));
  return {
    performerId: start.performerId,
    x,
    z,
    riserLevel: Math.max(0, Math.min(4, Math.round((z - 1) / 1.25))),
  };
}
