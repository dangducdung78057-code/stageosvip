# StageOS 项目上下文

## 项目定位

StageOS（艺演助手）是面向学校演出、校园艺术活动与集体节目的舞台编排工作台。系统围绕匿名演员资料、队形、服装、色卡、舞台预览、风险检查、倒排计划与导出，形成可追溯的项目流程。

生产主线采用 Vite、React、TypeScript、Supabase、Zustand、Zod、PixiJS 和 React Three Fiber。无 AI Token 时，本地规则引擎仍应可用。

## 当前阶段

当前处于新仓库恢复基线后的持续开发阶段。Git 基线为 `main` 分支上的 v0 导入快照，`stageos-v0-import-baseline` 版本标签标识基线，并通过治理规则保护。

当前重点是把已有的原型与局部能力收敛为可部署、可鉴权、可保存、可测试的完整产品路径。

## 已完成能力

- 本地规则方案生成路径。
- 免费黑点队形草图：模板、拖拽、保存与 PNG 导出。
- PixiJS 会员 2.5D 舞台预览。
- 2.5D 人物服装与配色编辑。
- Outfit Manifest 与统一 Appearance 数据模型。
- 单人编辑结果同步到全员。
- 队形与外观在 `stage_inputs.data` 中原子保存。
- 3D 使用项目真实匿名演员 ID。
- 2.5D 外观的上装、下装与点缀色同步到 3D GLB。
- 3D 临时色板覆盖，不改写已保存外观。
- 会员权益 migration 与 Edge Function 的本地源码。

## 未完成边界

- Supabase migration 与 Edge Function 尚未部署到远端环境。
- 正式多视角人物贴图和 Sprite Atlas 尚未交付。
- 当前 GLB 没有独立鞋履材质槽，鞋履颜色暂未在 3D 中渲染。
- 真实支付、会员开通回调和生产运营流程尚未完成。
- 本地实现、自动化测试通过和远端上线是三种不同状态，不得混用。
