# StageOS Costume Asset Schema

## Current Asset Knowledge Schema Contract

当前契约定义 Asset Knowledge 记录必须具备的核心字段。它用于约束知识文档和 catalog 数据，不表示应用源码、数据库或 API 已经实现同名 schema。

```ts
type AssetKnowledgeCategory =
  | "YUNJIAN"
  | "COSTUME"
  | "ACCESSORY"
  | "COLOR_PALETTE"
  | "UNCLASSIFIED"
  | "COMMERCIAL_COSTUME_REFERENCE"
  | "OUTFIT_MASK"
  | "STAGE_OUTFIT_ASSET"
  | "STAGE_OUTFIT_PREVIEW";

type AssetKnowledgeSourceType =
  | "IMAGE_REFERENCE"
  | "IMPLEMENTATION_IMAGE";

type AssetKnowledgeStatus =
  | "DIGITAL_REFERENCE"
  | "REAL_PRODUCT"
  | "PLANNED"
  | "IMPLEMENTATION_ASSET";

type AssetKnowledgeProductMatchStatus =
  | "EXACT_MATCH"
  | "SIMILAR_MATCH"
  | "INSPIRED_MATCH"
  | "NOT_FOUND"
  | "NOT_APPLICABLE";

type CostumeAssetReference = {
  assetId: string;
  sourceType: AssetKnowledgeSourceType;
  category: AssetKnowledgeCategory;
  layer: string;
  title: string;
  description: string;
  tags: string[];
  visualSearch: {
    enabled: boolean;
    searchKeywords: string[];
  };
  productMatchStatus: AssetKnowledgeProductMatchStatus;
  programSuitability: string[];
  status: AssetKnowledgeStatus;
};
```

- `assetId`：StageOS 内部稳定资产标识。
- `sourceType`：区分视觉参考图片与实现过程图片。
- `category`：使用统一的全大写 Category 枚举。
- `layer`：在人物外观中的逻辑层级；保持开放字符串，以容纳知识库中的技术层和未来扩展层。
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
- `COMMERCIAL_COSTUME_REFERENCE`
- `OUTFIT_MASK`
- `STAGE_OUTFIT_ASSET`
- `STAGE_OUTFIT_PREVIEW`

Hanfu、Hair Ornament、Stage Costume 等细分概念应通过 `tags`、`layer` 或后续 subtype 字段表达，不得创建与本契约并列的新 Category 值。

`referenceImages`、`sourceZip`、`storedPath`、`image` 等来源与文件完整性字段属于 catalog 的附加操作字段，可以保留，但不替代上述核心契约。

## Visual Asset Extension Enums

视觉资产知识库在原有服装参考枚举之外保留以下扩展值：

- `COMMERCIAL_COSTUME_REFERENCE`：有现实服饰视觉来源、但缺少可核验商品链接且尚未逐张语义细分的参考图片。
- `OUTFIT_MASK`：用于服装区域、颜色或材质控制的技术遮罩。
- `STAGE_OUTFIT_ASSET`：StageOS 服装设计或交付流程中的实现资产。
- `STAGE_OUTFIT_PREVIEW`：设计确认、评审或展示用途的预览资产。
- `IMPLEMENTATION_IMAGE`：实现、遮罩、预览或交付流程生成的图片，不等同于真实商品参考。
- `IMPLEMENTATION_ASSET`：服务于实现或交付流程的知识库资产状态，必须与 `DIGITAL_REFERENCE` 区分。
- `NOT_APPLICABLE`：资产不属于商品匹配对象，因此不运行或不要求商品匹配。

原有枚举继续有效：

- Category：`YUNJIAN`、`COSTUME`、`ACCESSORY`、`COLOR_PALETTE`、`UNCLASSIFIED`。
- Source Type：`IMAGE_REFERENCE`。
- Status：`DIGITAL_REFERENCE`、`REAL_PRODUCT`、`PLANNED`。
- Product Match Status：`EXACT_MATCH`、`SIMILAR_MATCH`、`INSPIRED_MATCH`、`NOT_FOUND`。

## Layer Rules

`layer` 仍为开放字符串，不建立封闭枚举。视觉资产知识库当前使用的值包括：

- `UNKNOWN`：合法的知识库值，表示尚未完成语义分类，不代表数据损坏或导入错误；记录必须进入后续人工语义复核队列。
- `N/A`：仅用于色卡等不存在服装层级的资产，不应用于可判断服装层级的记录。
- `Accent`：点缀、局部装饰或对应技术遮罩层。
- `Lower`：下装或下半身相关层。
- `FullBody`：整身服装或完整角色预览层。
- `Shoulder`：肩颈区域及云肩层。

知识库允许在不破坏既有记录的前提下增加 layer 字符串；进入运行时前必须通过 Binding 或转换层映射到运行时认可的强类型层级。

## Product Match Status Rules

- `NOT_APPLICABLE` 仅用于色卡、遮罩、实现图片、技术预览等没有商品匹配语义的资产。
- 对具有商品或实物匹配语义、但尚未找到可信匹配的参考图片，应使用 `NOT_FOUND`，不得用 `NOT_APPLICABLE` 隐藏未完成的检索工作。
- `NOT_APPLICABLE` 不代表匹配失败，也不代表商品不存在。

## Knowledge Library and Runtime Boundary

视觉资产知识库是可追溯的研究、设计和检索资料库，不是 StageOS 运行时的强类型输入。Catalog 中的扩展枚举、开放 layer、文件来源字段和审计状态不得直接替代 Runtime Binding、Outfit Layer 或 3D Material 契约。

运行时使用任何知识库记录前，必须经过显式选择、Binding 映射、运行时 schema 校验和资产可用性验证。`IMPLEMENTATION_ASSET` 表示实现流程资料；`DIGITAL_REFERENCE` 表示数字参考资料，两者不得互换或自动升级。知识库枚举对齐不表示应用源码、数据库、API 或渲染管线已经支持这些值。

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
