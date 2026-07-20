# StageOS Costume Asset Schema

## Current Asset Knowledge Schema Contract

当前契约定义 Asset Knowledge 记录必须具备的核心字段。它用于约束知识文档和 catalog 数据，不表示应用源码、数据库或 API 已经实现同名 schema。

```ts
type CostumeAssetReference = {
  assetId: string;
  category: "YUNJIAN" | "COSTUME" | "ACCESSORY" | "COLOR_PALETTE" | "UNCLASSIFIED";
  layer: string;
  title: string;
  description: string;
  tags: string[];
  visualSearch: {
    enabled: boolean;
    searchKeywords: string[];
  };
  productMatchStatus: "EXACT_MATCH" | "SIMILAR_MATCH" | "INSPIRED_MATCH" | "NOT_FOUND";
  programSuitability: string[];
  status: "DIGITAL_REFERENCE" | "REAL_PRODUCT" | "PLANNED";
};
```

- `assetId`：StageOS 内部稳定资产标识。
- `category`：使用统一的全大写 Category 枚举。
- `layer`：在人物外观中的逻辑层级。
- `title`：不含虚构品牌或商品信息的简洁资产标题。
- `description`：资产形制、材质及视觉说明。
- `tags`：人工或 AI 可使用的检索标签。
- `visualSearch`：未来视觉检索的启用状态与检索关键词。
- `productMatchStatus`：真实商品匹配状态。
- `programSuitability`：建议节目或舞台使用类型。
- `status`：资产在知识库生命周期中的状态。

## Category Enum

Category 只能使用以下值：

- `YUNJIAN`
- `COSTUME`
- `ACCESSORY`
- `COLOR_PALETTE`
- `UNCLASSIFIED`

Hanfu、Hair Ornament、Stage Costume 等细分概念应通过 `tags`、`layer` 或后续 subtype 字段表达，不得创建与本契约并列的新 Category 值。

`referenceImages`、`sourceZip`、`storedPath`、`image` 等来源与文件完整性字段属于 catalog 的附加操作字段，可以保留，但不替代上述核心契约。

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

## Planned Visual Search Runtime

`visualSearch`、`visualSearch.searchKeywords` 与 `productMatchStatus` 是当前 Asset Knowledge 核心字段。以下运行时字段仍为 **planned**；检索引擎、向量索引和商品匹配服务不属于当前源码实现或已部署能力：

```ts
type PlannedVisualSearchRuntime = {
  vectorIndexId?: string; // planned
  embeddingModel?: string; // planned
  lastIndexedAt?: string; // planned
};
```

- `vectorIndexId`（planned）：外部或内部向量索引中的记录标识。
- `embeddingModel`（planned）：生成视觉向量时使用的模型标识。
- `lastIndexedAt`（planned）：最近完成向量索引的时间。

这些运行时字段进入源码前必须经过 schema 设计、隐私与授权审查、迁移方案和测试验证。
