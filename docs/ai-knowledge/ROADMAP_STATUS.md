# StageOS 路线图状态

## 已完成

### 2.5D 服装编辑

- 支持匿名演员选择。
- 支持上装、下装、鞋履和点缀色编辑。
- 支持将选中外观同步到全员。
- 队形与外观使用一次 `stage_inputs.data` 更新保存。

### Outfit Manifest

- 建立统一 Appearance Schema。
- 建立 Outfit Manifest 版本与节目类型映射。
- 明确程序化渲染、Sprite 和 GLB 能力状态。
- 正式贴图缺失时保持 `planned` 状态。

### 2.5D → 3D 同步

- 3D 接收项目真实匿名演员 ID。
- 上装、下装和点缀色映射到 GLB 材质槽。
- 3D 临时色板可覆盖预览，但不改写保存外观。

## 待完成

### Supabase 部署

- 部署会员权益 migration。
- 部署 `preview-entitlement` Edge Function。
- 在远端环境验证 RLS、项目归属、隐私确认、到期时间和会员状态。

### 多视角贴图

- 交付正面、左前、右前、侧面和背面人物素材。
- 交付上装、下装、鞋履和点缀色遮罩。
- 建立 Sprite Atlas、锚点、方向切换和素材版本策略。

### GLB 鞋履材质

- 为男、女 GLB 增加稳定命名的鞋履材质槽。
- 更新 Manifest 材质槽契约。
- 将 `footwearColor` 接入 3D 渲染并补充测试。

## 状态说明

- `implemented`：本地代码、数据路径、错误处理和测试均存在。
- `partial`：已有真实代码，但远端、素材或完整路径仍有缺口。
- `planned`：只有契约、设计或占位，尚无完整实现。

