# StageOS Asset Binding Design

## Separation Principle

Asset Library 与 Runtime Binding 必须分离。

- Asset Library 负责来源、分类、描述、检索字段、图片完整性与生命周期状态。
- Runtime Binding 负责把已审核资产连接到 Outfit、2.5D Sprite/Mask 和 3D Material/Model。
- `DIGITAL_REFERENCE` 资产不能因为进入知识库就被视为可渲染资产。
- Binding 不得反向修改或覆盖原始资产来源记录。

## Mapping Flow

```text
Asset
  ↓
Binding
  ↓
Outfit Layer
  ↓
2.5D
  ↓
3D Material
```

## Planned Binding Contract

Binding 层未来至少需要描述：

- `assetId`：指向 Asset Library 中的稳定资产。
- `outfitId`：指向 Runtime Outfit Manifest。
- `outfitLayer`：映射到 Upper、Lower、Footwear、Accent 或扩展层。
- `spriteMask`：2.5D Sprite、Mask、视角与锚点信息。
- `materialSlot`：3D 的 `top`、`bottom`、`accent` 或未来材质槽。
- `modelAssetId`：可选的 3D 模型或挂件资产引用。
- `bindingStatus`：`PLANNED`、`READY_2D`、`READY_3D` 或 `BLOCKED`。

## Current Boundary

当前 catalog 只完成 Asset Library，不包含上述 Runtime Binding 字段。现有 2.5D 程序化人物与 3D GLB 颜色同步继续使用源码中的 Outfit/Appearance 数据；资产知识条目在 Binding 经审核和实现前不得直接进入运行时。

云肩、头饰和其他扩展配饰还需要 Sprite、遮罩、锚点、3D 模型或骨骼挂点，不能仅凭 `category` 和 `layer` 自动映射。
