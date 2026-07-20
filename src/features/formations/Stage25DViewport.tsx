import { useEffect, useRef, useState } from "react";
import { Application, Container, Graphics, Text, TextStyle } from "pixi.js";
import { AlertTriangle, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  appearanceDraftSchema,
  formationDraftSchema,
  type Appearance,
  type AppearanceDraft,
  type FormationDraft,
  type StagePosition,
} from "@/domain/stageos/schemas";
import { OUTFIT_MANIFEST, reconcileAppearanceDraft } from "@/domain/stageos/outfits";
import { reconcileFormationDraft } from "./dotSketch";
import { dragStage25D, projectStage25D } from "./stage25d";

export type Stage25DPerformer = {
  id: string;
  gender: "male" | "female";
  heightCm: number;
};

export type Stage25DViewportProps = {
  performers: Stage25DPerformer[];
  initialDraft?: FormationDraft;
  initialAppearance?: AppearanceDraft;
  programType?: string;
  backgroundColor?: string;
  title: string;
  onSave: (draft: FormationDraft, appearance: AppearanceDraft) => Promise<void>;
};

type DragState = {
  performerId: string;
  pointer: { x: number; y: number };
  position: StagePosition;
};

function colorNumber(value: string | undefined, fallback: number) {
  if (!value || !/^#[0-9a-f]{6}$/i.test(value)) return fallback;
  return Number.parseInt(value.slice(1), 16);
}

function cloneDraft(draft: FormationDraft): FormationDraft {
  return { ...draft, positions: draft.positions.map((item) => ({ ...item })) };
}

function cloneAppearance(draft: AppearanceDraft): AppearanceDraft {
  return { ...draft, entries: draft.entries.map((item) => ({ ...item })) };
}

function createFigure(performer: Stage25DPerformer, appearance: Appearance, selected: boolean) {
  const container = new Container();
  container.label = performer.id;
  container.eventMode = "static";
  container.cursor = "grab";

  container.addChild(new Graphics().ellipse(0, 5, 18, 5).fill({ color: 0x000000, alpha: 0.22 }));
  if (selected) {
    container.addChild(new Graphics().ellipse(0, 3, 24, 9).stroke({ color: 0xd1a13a, width: 3 }));
  }

  const body = new Graphics();
  body.circle(0, -48, 9).fill({ color: 0xd8b091 });
  body.roundRect(-11, -38, 22, 28, 6).fill({ color: colorNumber(appearance.upperColor, 0x355c7d) });
  body.roundRect(-11, -38, 22, 5, 3).fill({ color: colorNumber(appearance.accentColor, 0x9e4255) });
  if (performer.gender === "female") {
    body.poly([-12, -11, 12, -11, 17, 8, -17, 8]).fill({ color: colorNumber(appearance.lowerColor, 0x263444) });
  } else {
    body.rect(-10, -11, 8, 24).fill({ color: colorNumber(appearance.lowerColor, 0x263444) });
    body.rect(2, -11, 8, 24).fill({ color: colorNumber(appearance.lowerColor, 0x263444) });
  }
  body.rect(-9, 13, 7, 14).fill({ color: 0xd8b091 });
  body.rect(2, 13, 7, 14).fill({ color: 0xd8b091 });
  body.roundRect(-12, 25, 11, 5, 2).fill({ color: colorNumber(appearance.footwearColor, 0x15191e) });
  body.roundRect(1, 25, 11, 5, 2).fill({ color: colorNumber(appearance.footwearColor, 0x15191e) });
  body.roundRect(-10, -60, 20, 10, 5).fill({ color: 0x20252e });
  container.addChild(body);

  const label = new Text({
    text: `${performer.id}  ${performer.heightCm}cm`,
    style: new TextStyle({
      fill: 0xf8fafc,
      fontSize: 10,
      fontFamily: "system-ui",
      fontWeight: "600",
      stroke: { color: 0x111827, width: 3 },
    }),
  });
  label.anchor.set(0.5, 1);
  label.y = -67;
  container.addChild(label);
  return container;
}

export function Stage25DViewport({
  performers,
  initialDraft,
  initialAppearance,
  programType,
  backgroundColor,
  title,
  onSave,
}: Stage25DViewportProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const draftRef = useRef(reconcileFormationDraft(performers.map((item) => item.id), initialDraft));
  const savedRef = useRef(cloneDraft(draftRef.current));
  const appearanceRef = useRef(reconcileAppearanceDraft(performers.map((item) => item.id), programType, initialAppearance));
  const savedAppearanceRef = useRef(cloneAppearance(appearanceRef.current));
  const dragRef = useRef<DragState | null>(null);
  const figureMapRef = useRef(new Map<string, Container>());
  const [ready, setReady] = useState(false);
  const [revision, setRevision] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const next = reconcileFormationDraft(performers.map((item) => item.id), initialDraft);
    draftRef.current = next;
    savedRef.current = cloneDraft(next);
    const nextAppearance = reconcileAppearanceDraft(performers.map((item) => item.id), programType, initialAppearance);
    appearanceRef.current = nextAppearance;
    savedAppearanceRef.current = cloneAppearance(nextAppearance);
    setDirty(false);
    setSelectedId(null);
    setRevision((value) => value + 1);
  }, [initialAppearance, initialDraft, performers, programType]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    const app = new Application();
    appRef.current = app;
    void app.init({
      resizeTo: host,
      antialias: true,
      backgroundColor: 0x07111f,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      autoDensity: true,
    }).then(() => {
      if (cancelled) return;
      host.replaceChildren(app.canvas);
      app.canvas.className = "w-full h-full touch-none";
      app.canvas.setAttribute("aria-label", "会员 2.5D 舞台预览，可拖动匿名演员调整位置。");
      setReady(true);
    }).catch((cause) => {
      if (!cancelled) setError(cause instanceof Error ? cause.message : "PixiJS 初始化失败。");
    });
    return () => {
      cancelled = true;
      setReady(false);
      app.destroy(true, { children: true });
      appRef.current = null;
    };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let frame: number | null = null;
    const observer = new ResizeObserver(() => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = null;
        setRevision((value) => value + 1);
      });
    });
    observer.observe(host);
    return () => {
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const app = appRef.current;
    const host = hostRef.current;
    if (!ready || !app || !host) return;
    app.stage.removeAllListeners();
    const removed = app.stage.removeChildren();
    removed.forEach((item) => item.destroy({ children: true }));
    figureMapRef.current.clear();
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (width <= 0 || height <= 0) return;

    app.stage.addChild(new Graphics().rect(0, 0, width, height).fill({ color: 0x07111f }));
    app.stage.addChild(new Graphics()
      .roundRect(width * 0.18, height * 0.07, width * 0.64, height * 0.24, 14)
      .fill({ color: colorNumber(backgroundColor, 0x17324d) })
      .stroke({ color: 0x8fb7a3, alpha: 0.45, width: 2 }));
    const ledTitle = new Text({
      text: title || "StageOS 舞台预览",
      style: new TextStyle({ fill: 0xf4f1e8, fontFamily: "system-ui", fontSize: Math.max(14, width / 44), fontWeight: "600" }),
    });
    ledTitle.anchor.set(0.5);
    ledTitle.position.set(width / 2, height * 0.19);
    app.stage.addChild(ledTitle);

    app.stage.addChild(new Graphics().poly([
      width * 0.08, height * 0.88,
      width * 0.92, height * 0.88,
      width * 0.78, height * 0.32,
      width * 0.22, height * 0.32,
    ]).fill({ color: 0x29313b }).stroke({ color: 0x69717c, alpha: 0.7, width: 2 }));

    for (let level = 3; level >= 0; level -= 1) {
      const top = height * 0.46 + level * Math.max(34, height * 0.075);
      const inset = width * (0.14 + level * 0.035);
      app.stage.addChild(new Graphics()
        .roundRect(inset, top, width - inset * 2, Math.max(26, height * 0.055), 6)
        .fill({ color: 0x414c59 })
        .stroke({ color: 0x718096, width: 1.5, alpha: 0.75 }));
    }

    const performerById = new Map(performers.map((item) => [item.id, item]));
    const peopleLayer = new Container();
    const projected = draftRef.current.positions
      .map((position) => ({ position, projection: projectStage25D(position, width, height, draftRef.current.stageWidthM, draftRef.current.stageDepthM) }))
      .sort((a, b) => b.projection.depth - a.projection.depth);
    for (const item of projected) {
      const performer = performerById.get(item.position.performerId);
      const appearance = appearanceRef.current.entries.find((entry) => entry.performerId === item.position.performerId);
      if (!performer || !appearance) continue;
      const figure = createFigure(performer, appearance, selectedId === performer.id);
      figure.position.set(item.projection.x, item.projection.y);
      figure.scale.set(item.projection.scale);
      figure.on("pointerdown", (event) => {
        dragRef.current = {
          performerId: performer.id,
          pointer: { x: event.global.x, y: event.global.y },
          position: { ...item.position },
        };
        setSelectedId(performer.id);
        event.stopPropagation();
      });
      figureMapRef.current.set(performer.id, figure);
      peopleLayer.addChild(figure);
    }
    app.stage.addChild(peopleLayer);

    const audience = new Text({ text: "观众方向", style: new TextStyle({ fill: 0x9fb3c8, fontFamily: "system-ui", fontSize: 13 }) });
    audience.anchor.set(0.5);
    audience.position.set(width / 2, height - 16);
    app.stage.addChild(audience);

    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;
    app.stage.on("pointermove", (event) => {
      const drag = dragRef.current;
      if (!drag) return;
      const next = dragStage25D(drag.position, {
        x: event.global.x - drag.pointer.x,
        y: event.global.y - drag.pointer.y,
      }, width, height, draftRef.current.stageWidthM, draftRef.current.stageDepthM);
      draftRef.current.positions = draftRef.current.positions.map((position) => position.performerId === drag.performerId ? next : position);
      const figure = figureMapRef.current.get(drag.performerId);
      if (figure) {
        const projection = projectStage25D(next, width, height, draftRef.current.stageWidthM, draftRef.current.stageDepthM);
        figure.position.set(projection.x, projection.y);
        figure.scale.set(projection.scale);
      }
    });
    const finishDrag = () => {
      if (!dragRef.current) return;
      dragRef.current = null;
      setDirty(true);
      setRevision((value) => value + 1);
    };
    app.stage.on("pointerup", finishDrag);
    app.stage.on("pointerupoutside", finishDrag);
  }, [backgroundColor, performers, ready, revision, selectedId, title]);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const next = formationDraftSchema.parse({ ...draftRef.current, updatedAt: new Date().toISOString() });
      const nextAppearance = appearanceDraftSchema.parse({ ...appearanceRef.current, updatedAt: new Date().toISOString() });
      await onSave(next, nextAppearance);
      draftRef.current = next;
      savedRef.current = cloneDraft(next);
      appearanceRef.current = nextAppearance;
      savedAppearanceRef.current = cloneAppearance(nextAppearance);
      setDirty(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "2.5D 队形保存失败。");
    } finally {
      setSaving(false);
    }
  }

  function reset() {
    draftRef.current = cloneDraft(savedRef.current);
    appearanceRef.current = cloneAppearance(savedAppearanceRef.current);
    setDirty(false);
    setSelectedId(null);
    setError(null);
    setRevision((value) => value + 1);
  }

  function updateSelectedAppearance(patch: Partial<Omit<Appearance, "performerId">>) {
    if (!selectedId) return;
    appearanceRef.current.entries = appearanceRef.current.entries.map((entry) =>
      entry.performerId === selectedId ? { ...entry, ...patch } : entry,
    );
    setDirty(true);
    setRevision((value) => value + 1);
  }

  function applySelectedToAll() {
    const selected = appearanceRef.current.entries.find((entry) => entry.performerId === selectedId);
    if (!selected) return;
    appearanceRef.current.entries = appearanceRef.current.entries.map((entry) => ({
      ...entry,
      outfitId: selected.outfitId,
      upperColor: selected.upperColor,
      lowerColor: selected.lowerColor,
      footwearColor: selected.footwearColor,
      accentColor: selected.accentColor,
    }));
    setDirty(true);
    setRevision((value) => value + 1);
  }

  const selectedAppearance = appearanceRef.current.entries.find((entry) => entry.performerId === selectedId);

  return (
    <div className="panel">
      <div className="panel-header flex-wrap gap-2">
        <div>
          <h3 className="text-sm font-semibold">会员 2.5D 舞台</h3>
          <p className="text-xs text-muted-foreground mt-1">PixiJS 实时渲染，与黑点草图共用米制坐标。</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={reset} disabled={!dirty || saving}>
            <RotateCcw className="h-4 w-4 mr-1" />重置
          </Button>
          <Button size="sm" onClick={handleSave} disabled={!dirty || saving}>
            <Save className="h-4 w-4 mr-1" />{saving ? "保存中" : dirty ? "保存舞台" : "已保存"}
          </Button>
        </div>
      </div>
      <div className="panel-body space-y-3">
        <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          隐私说明：预览仅使用匿名编号、性别、身高与队形坐标，不显示真实面部。
        </div>
        <div className="rounded-md border border-border p-3 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-medium">服装与配色</div>
              <div className="text-xs text-muted-foreground">点击舞台人物后编辑；当前为程序化人物，正式多视角贴图尚未导入。</div>
            </div>
            <Button size="sm" variant="outline" onClick={applySelectedToAll} disabled={!selectedAppearance || saving}>同步到全员</Button>
          </div>
          {selectedAppearance ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <label className="text-xs text-muted-foreground">
                套装 · {selectedAppearance.performerId}
                <select
                  className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground"
                  value={selectedAppearance.outfitId}
                  onChange={(event) => updateSelectedAppearance({ outfitId: event.target.value })}
                >
                  {OUTFIT_MANIFEST.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
              </label>
              {([
                ["upperColor", "上装"],
                ["lowerColor", "下装"],
                ["footwearColor", "鞋履"],
                ["accentColor", "点缀"],
              ] as const).map(([field, label]) => (
                <label key={field} className="text-xs text-muted-foreground">
                  {label} · {selectedAppearance[field].toUpperCase()}
                  <input
                    type="color"
                    className="mt-1 h-9 w-full cursor-pointer rounded-md border border-input bg-background p-1"
                    value={selectedAppearance[field]}
                    onChange={(event) => updateSelectedAppearance({ [field]: event.target.value })}
                  />
                </label>
              ))}
            </div>
          ) : <div className="text-xs text-muted-foreground">请先点击一名演员。</div>}
        </div>
        <div ref={hostRef} className="h-[460px] md:h-[620px] overflow-hidden rounded-md border border-border bg-[#07111f]" />
        {!ready && !error && <div className="text-sm text-muted-foreground">正在初始化 PixiJS 舞台...</div>}
        {error && <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive flex gap-2"><AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />{error}</div>}
      </div>
    </div>
  );
}
