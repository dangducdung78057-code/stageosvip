import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Download, LockKeyhole, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formationDraftSchema, type FormationDraft } from "@/domain/stageos/schemas";
import {
  buildTemplatePositions,
  canvasToStage,
  createFormationDraft,
  getCanvasGeometry,
  reconcileFormationDraft,
  stageToCanvas,
  type DotSketchTemplate,
} from "./dotSketch";

type DotSketchCanvasProps = {
  performerIds: string[];
  initialDraft?: FormationDraft;
  privacyConfirmed: boolean;
  onSave: (draft: FormationDraft) => Promise<void>;
};

const TEMPLATES: Array<{ id: DotSketchTemplate; label: string }> = [
  { id: "grid", label: "基础方阵" },
  { id: "staggered", label: "错位横排" },
  { id: "arc", label: "弧形" },
  { id: "v", label: "V 字" },
];

function cloneDraft(draft: FormationDraft): FormationDraft {
  return { ...draft, positions: draft.positions.map((item) => ({ ...item })) };
}

export function DotSketchCanvas({
  performerIds,
  initialDraft,
  privacyConfirmed,
  onSave,
}: DotSketchCanvasProps) {
  const normalizedIds = useMemo(() => performerIds.filter(Boolean), [performerIds]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draftRef = useRef<FormationDraft>(reconcileFormationDraft(normalizedIds, initialDraft));
  const savedRef = useRef<FormationDraft>(cloneDraft(draftRef.current));
  const draggingIdRef = useRef<string | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const next = reconcileFormationDraft(normalizedIds, initialDraft);
    draftRef.current = next;
    savedRef.current = cloneDraft(next);
    setDirty(false);
    setSelectedId(null);
    setRevision((value) => value + 1);
  }, [initialDraft, normalizedIds]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const dpr = window.devicePixelRatio || 1;
    const pixelWidth = Math.round(rect.width * dpr);
    const pixelHeight = Math.round(rect.height * dpr);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    const dark = document.documentElement.classList.contains("dark");
    const colors = dark
      ? { background: "#101317", grid: "#2f3740", boundary: "#87919c", dot: "#f4f5f7", text: "#d9dee5", selected: "#d1a13a" }
      : { background: "#f8fafc", grid: "#dbe2ea", boundary: "#66717e", dot: "#15191e", text: "#334155", selected: "#b7791f" };
    const draft = draftRef.current;
    const geometry = getCanvasGeometry(rect.width, rect.height, draft.stageWidthM, draft.stageDepthM);
    const left = geometry.originX - geometry.stagePixelWidth / 2;
    const top = geometry.originY - geometry.stagePixelDepth;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    for (let meter = -Math.floor(draft.stageWidthM / 2); meter <= Math.floor(draft.stageWidthM / 2); meter += 1) {
      const x = geometry.originX + meter * geometry.scale;
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x, geometry.originY);
      ctx.stroke();
    }
    for (let meter = 0; meter <= Math.floor(draft.stageDepthM); meter += 1) {
      const y = geometry.originY - meter * geometry.scale;
      ctx.beginPath();
      ctx.moveTo(left, y);
      ctx.lineTo(left + geometry.stagePixelWidth, y);
      ctx.stroke();
    }

    ctx.strokeStyle = colors.boundary;
    ctx.lineWidth = 2;
    ctx.strokeRect(left, top, geometry.stagePixelWidth, geometry.stagePixelDepth);
    ctx.fillStyle = colors.text;
    ctx.font = "11px system-ui";
    ctx.textAlign = "left";
    ctx.fillText("舞台后区", left + 8, top + 16);
    ctx.textAlign = "right";
    ctx.fillText("观众方向", left + geometry.stagePixelWidth - 8, geometry.originY - 8);

    for (const item of draft.positions) {
      const point = stageToCanvas(item, geometry);
      const selected = item.performerId === selectedId;
      ctx.beginPath();
      ctx.arc(point.x, point.y, selected ? 9 : 7, 0, Math.PI * 2);
      ctx.fillStyle = colors.dot;
      ctx.fill();
      if (selected) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
        ctx.strokeStyle = colors.selected;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      ctx.fillStyle = colors.text;
      ctx.font = "10px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(item.performerId, point.x, point.y - 13);
    }
  }, [selectedId]);

  const scheduleDraw = useCallback(() => {
    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => {
      animationFrameRef.current = null;
      draw();
    });
  }, [draw]);

  useEffect(() => {
    scheduleDraw();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(scheduleDraw);
    observer.observe(canvas);
    return () => {
      observer.disconnect();
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [revision, scheduleDraw]);

  function eventPoint(event: React.PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function hitTest(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const geometry = getCanvasGeometry(rect.width, rect.height, draftRef.current.stageWidthM, draftRef.current.stageDepthM);
    const pointer = eventPoint(event);
    return [...draftRef.current.positions].reverse().find((item) => {
      const point = stageToCanvas(item, geometry);
      return Math.hypot(pointer.x - point.x, pointer.y - point.y) <= 18;
    });
  }

  function movePerformer(performerId: string, canvasPoint: { x: number; y: number }) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const draft = draftRef.current;
    const geometry = getCanvasGeometry(rect.width, rect.height, draft.stageWidthM, draft.stageDepthM);
    const next = canvasToStage(canvasPoint, geometry, draft.stageWidthM, draft.stageDepthM);
    draft.positions = draft.positions.map((item) => item.performerId === performerId ? { performerId, ...next } : item);
    scheduleDraw();
  }

  function applyTemplate(template: DotSketchTemplate) {
    draftRef.current = {
      ...draftRef.current,
      template,
      positions: buildTemplatePositions(normalizedIds, template),
      updatedAt: new Date().toISOString(),
    };
    setDirty(true);
    setSelectedId(null);
    setRevision((value) => value + 1);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const next = formationDraftSchema.parse({ ...draftRef.current, updatedAt: new Date().toISOString() });
      await onSave(next);
      draftRef.current = next;
      savedRef.current = cloneDraft(next);
      setDirty(false);
      setRevision((value) => value + 1);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "草图保存失败，请稍后重试。");
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    draftRef.current = cloneDraft(savedRef.current);
    setDirty(false);
    setSelectedId(null);
    setError(null);
    setRevision((value) => value + 1);
  }

  function handleExport() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    draw();
    canvas.toBlob((blob) => {
      if (!blob) {
        setError("浏览器无法生成 PNG，请重试或更换浏览器。");
        return;
      }
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `stageos-dot-sketch-${new Date().toISOString().slice(0, 10)}.png`;
      anchor.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  if (!privacyConfirmed) {
    return (
      <div className="panel">
        <div className="panel-header"><h3 className="text-sm font-semibold">免费黑点草图</h3></div>
        <div className="panel-body space-y-3">
          <div className="rounded-md border border-warning/40 bg-warning/5 p-3 text-sm flex items-start gap-2">
            <LockKeyhole className="h-4 w-4 mt-0.5 text-warning shrink-0" aria-hidden="true" />
            <div>
              <div className="font-medium text-warning">完成隐私确认后解锁预览</div>
              <p className="mt-1 text-xs text-muted-foreground">草图仅使用匿名学生编号和位置，不展示姓名、联系方式或真实面部。</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="panel-header flex-wrap gap-2">
        <div>
          <h3 className="text-sm font-semibold">免费黑点草图</h3>
          <p className="text-xs text-muted-foreground mt-1">拖动匿名编号调整站位，坐标单位为米。</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={handleReset} disabled={!dirty || saving}>
            <RotateCcw className="h-4 w-4 mr-1" />重置
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} disabled={saving}>
            <Download className="h-4 w-4 mr-1" />导出 PNG
          </Button>
          <Button size="sm" onClick={handleSave} disabled={!dirty || saving}>
            <Save className="h-4 w-4 mr-1" />{saving ? "保存中" : dirty ? "保存草图" : "已保存"}
          </Button>
        </div>
      </div>
      <div className="panel-body space-y-3">
        <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          隐私说明：预览与导出仅包含匿名编号和队形坐标。请勿在编号中填写学生姓名或其他身份信息。
        </div>
        <div className="flex flex-wrap gap-2" aria-label="基础队形模板">
          {TEMPLATES.map((template) => (
            <Button
              key={template.id}
              type="button"
              size="sm"
              variant={draftRef.current.template === template.id ? "secondary" : "outline"}
              onClick={() => applyTemplate(template.id)}
              disabled={saving}
            >
              {template.label}
            </Button>
          ))}
        </div>
        <canvas
          ref={canvasRef}
          className="w-full h-[420px] md:h-[520px] touch-none rounded-md border border-border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          tabIndex={0}
          aria-label="免费版黑点队形草图。点击选择演员，拖动或使用方向键调整位置。"
          onPointerDown={(event) => {
            const item = hitTest(event);
            draggingIdRef.current = item?.performerId ?? null;
            setSelectedId(item?.performerId ?? null);
            if (item) event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!draggingIdRef.current) return;
            movePerformer(draggingIdRef.current, eventPoint(event));
          }}
          onPointerUp={(event) => {
            if (!draggingIdRef.current) return;
            draggingIdRef.current = null;
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            setDirty(true);
            setRevision((value) => value + 1);
          }}
          onPointerCancel={(event) => {
            draggingIdRef.current = null;
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            setRevision((value) => value + 1);
          }}
          onKeyDown={(event) => {
            if (!selectedId || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
            event.preventDefault();
            const step = event.shiftKey ? 0.5 : 0.1;
            const item = draftRef.current.positions.find((candidate) => candidate.performerId === selectedId);
            if (!item) return;
            const nextX = item.x + (event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0);
            const nextZ = item.z + (event.key === "ArrowDown" ? -step : event.key === "ArrowUp" ? step : 0);
            const geometry = getCanvasGeometry(100, 100, draftRef.current.stageWidthM, draftRef.current.stageDepthM);
            const clamped = canvasToStage(stageToCanvas({ x: nextX, z: nextZ }, geometry), geometry, draftRef.current.stageWidthM, draftRef.current.stageDepthM);
            draftRef.current.positions = draftRef.current.positions.map((candidate) => candidate.performerId === selectedId ? { performerId: selectedId, ...clamped } : candidate);
            setDirty(true);
            setRevision((value) => value + 1);
          }}
        />
        <div className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
          <span>{draftRef.current.positions.length} 个匿名站位</span>
          <span>方向键微调 0.1 米，Shift + 方向键调整 0.5 米</span>
        </div>
        {error && (
          <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />{error}
          </div>
        )}
      </div>
    </div>
  );
}
