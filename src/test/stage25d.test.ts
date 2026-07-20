import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { dragStage25D, projectStage25D } from "@/features/formations/stage25d";

describe("会员 2.5D 米制投影", () => {
  it("远处演员更小且投影位置更靠舞台后区", () => {
    const near = projectStage25D({ x: 0, z: 1, riserLevel: 0 }, 1000, 700);
    const far = projectStage25D({ x: 0, z: 7, riserLevel: 0 }, 1000, 700);

    expect(far.scale).toBeLessThan(near.scale);
    expect(far.y).toBeLessThan(near.y);
  });

  it("台阶层级只改变垂直投影，不改变共享 x/z", () => {
    const floor = projectStage25D({ x: 2, z: 4, riserLevel: 0 }, 900, 600);
    const riser = projectStage25D({ x: 2, z: 4, riserLevel: 3 }, 900, 600);

    expect(riser.x).toBe(floor.x);
    expect(riser.y).toBeLessThan(floor.y);
  });

  it("拖动保持匿名 ID 并裁剪到 14x8 米舞台", () => {
    const start = { performerId: "S001", x: 0, z: 3, riserLevel: 2 };
    const moved = dragStage25D(start, { x: 10000, y: -10000 }, 900, 600);

    expect(moved.performerId).toBe("S001");
    expect(moved.x).toBe(7);
    expect(moved.z).toBe(8);
    expect(moved.riserLevel).toBe(4);
  });
});

describe("会员服务端鉴权契约", () => {
  const root = resolve(__dirname, "../..");
  const migration = readFileSync(resolve(root, "supabase/migrations/20260720090000_user_entitlements.sql"), "utf8");
  const edgeFunction = readFileSync(resolve(root, "supabase/functions/preview-entitlement/index.ts"), "utf8");

  it("客户端只能读取自己的会员记录，不能自行升级", () => {
    expect(migration).toContain("FOR SELECT TO authenticated USING (user_id = auth.uid())");
    expect(migration).toContain("REVOKE INSERT, UPDATE, DELETE ON public.user_entitlements FROM authenticated, anon");
  });

  it("服务端按项目归属、隐私确认、状态和到期时间判定", () => {
    expect(edgeFunction).toContain("project.user_id !== userId");
    expect(edgeFunction).toContain('.eq("status", "confirmed")');
    expect(edgeFunction).toContain('entitlement?.status === "active" && unexpired');
    expect(edgeFunction).toContain('tier === "member" || tier === "custom"');
  });
});
