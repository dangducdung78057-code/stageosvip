import { describe, expect, it } from "vitest";
import { generateLocalPlan } from "@/features/plan-engine/generateLocalPlan";

const validInput = {
  schoolStage: "primary",
  programType: "chorus",
  programTheme: "春日合唱",
  venueType: "室内礼堂",
  performerCount: 12,
  maleCount: 5,
  femaleCount: 7,
  perPersonBudget: 220,
  performanceDate: "2026-09-01",
  rehearsalFrequencyPerWeek: 3 as const,
};

describe("generateLocalPlan", () => {
  it("无 AI Token 时生成带来源元数据的完整本地规则方案", () => {
    const plan = generateLocalPlan(validInput);

    expect(plan.metadata.engine).toBe("local_rules");
    expect(plan.metadata.fallbackUsed).toBe(false);
    expect(plan.metadata.schemaVersion).toMatch(/^\d+\.\d+\.\d+$/);
    expect(plan.costumePlan.femalePlan.length).toBeGreaterThan(0);
    expect(plan.costumePlan.malePlan.length).toBeGreaterThan(0);
    expect(plan.reverseSchedule.length).toBeGreaterThan(0);
    expect(plan.visualPlan.palette.length).toBeGreaterThan(0);
    expect(plan.visualPlan.formation.name).toBeTruthy();
    expect(plan.constraints.length).toBeGreaterThan(0);
  });

  it("拒绝人数合计不一致的输入", () => {
    expect(() => generateLocalPlan({
      ...validInput,
      maleCount: 4,
    })).toThrow("男生数与女生数之和必须等于总人数");
  });
});
