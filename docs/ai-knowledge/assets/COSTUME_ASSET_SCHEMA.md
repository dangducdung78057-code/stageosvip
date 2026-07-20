# StageOS Costume Asset Schema

## Current Reference Schema

当前参考结构用于知识文档和资产目录规划，不表示源码中已经存在同名 TypeScript、数据库或 API schema。

```ts
type CostumeAssetReference = {
  assetId: string;
  name: string;
  category: string;
  layer: string;
  style: string[];
  referenceImages: string[];
  description: string;
  stageOSUsage: string[];
};
```

- `assetId`：StageOS 内部稳定资产标识。
- `name`：资产名称。
- `category`：真实服装资产分类。
- `layer`：在人物外观中的逻辑层级。
- `style`：风格、形制或视觉标签。
- `referenceImages`：关联参考图片索引。
- `description`：资产形制、材质及视觉说明。
- `stageOSUsage`：在 StageOS 中建议使用的节目、人物或舞台场景。

## Planned Product Metadata

以下字段均为 **planned**，不属于当前源码实现，也不应被视为已经部署的数据库字段：

```ts
type PlannedProductMetadata = {
  externalProductId?: string; // planned
  productUrl?: string; // planned
  capturedAt?: string; // planned
  availabilityNote?: string; // planned
  affiliate?: boolean; // planned
};
```

- `externalProductId`（planned）：外部平台商品 ID，不作为 StageOS 内部主键。
- `productUrl`（planned）：商品详情页的规范化链接。
- `capturedAt`（planned）：商品信息首次采集时间。
- `availabilityNote`（planned）：库存、起订量、定制周期或下架状态说明。
- `affiliate`（planned）：是否存在推广、返佣或其他利益关系。

## Planned Visual Search Extension

以下字段均为 **planned**，用于未来视觉检索与商品匹配能力。它们不属于当前参考结构、当前源码实现或已部署数据库字段：

```ts
type PlannedVisualSearchExtension = {
  visualSearch?: object; // planned
  searchKeywords?: string[]; // planned
  productMatchStatus?:
    | "EXACT_MATCH"
    | "SIMILAR_MATCH"
    | "INSPIRED_MATCH"
    | "NOT_FOUND"; // planned
};
```

- `visualSearch`（planned）：未来图片检索能力的扩展数据；具体结构需在实现前另行定义。
- `searchKeywords`（planned）：由人工或 AI 生成的检索关键词。
- `productMatchStatus`（planned）：商品匹配结果状态。
  - `EXACT_MATCH`：确认是同一商品或同一资产。
  - `SIMILAR_MATCH`：找到视觉和结构相似的商品。
  - `INSPIRED_MATCH`：仅作为设计灵感参考，不构成同款或相似款结论。
  - `NOT_FOUND`：尚未找到可确认的商品匹配。

规划字段进入源码前必须经过 schema 设计、隐私与授权审查、迁移方案和测试验证。
