# StageOS 服装资产库

## 真实商品服装资产

真实商品资产与 Outfit 视觉模板分离。商品记录用于采购参考，不代表实时库存、价格或适配结论。所有外部商品信息必须保留来源和核验时间。

### Current Implemented Schema

当前源码尚未实现独立的 `CostumeAsset` schema。现有 Outfit 与 Appearance 数据模型不包含商品采购元数据，不能将下述规划字段视为当前源码能力。

### Planned Product Metadata Extension

以下 `CostumeAsset` 为规划中的商品资产模型，不属于当前源码实现：

```ts
type CostumeAsset = {
  id: string;
  title: string;
  category: string;
  programTypes: string[];
  genderScope: string[];
  ageScope?: string[];
  colors: string[];
  sizes?: string[];
  imageIds: string[];
  productUrl?: string;
  platform?: string;
  sellerName?: string;
  priceSnapshot?: number;
  currency?: string;
  verifiedAt?: string;
  sourceNote?: string;
  status: "draft" | "verified" | "expired" | "unavailable";
};
```

## 云肩资料

云肩资料应记录形制、层数、纹样、尺寸、适配领型、颜色、固定方式、活动安全性和文化说明。商品云肩与舞台视觉参考图必须使用不同资产类型。

## 配饰资料

配饰包括头饰、腰封、胸针、披帛、手持道具和鞋履附件。每项应记录佩戴部位、重量、尖锐风险、脱落风险、快速穿脱方式及适用年龄。

## 商品链接字段设计

本节字段均属于 Planned Product Metadata Extension，不代表当前已实现的源码字段。其中 `externalProductId`、`capturedAt`、`availabilityNote` 与 `affiliate` 明确标记为 planned。

- `productUrl`：规范化商品详情链接。
- `platform`：平台标识。
- `sellerName`：店铺或供应方名称。
- `externalProductId`（planned）：平台商品 ID，不作为内部主键。
- `capturedAt`（planned）：首次采集时间。
- `verifiedAt`：最近人工核验时间。
- `priceSnapshot`：核验时价格快照，不表示当前价格。
- `availabilityNote`（planned）：库存、起订量或定制周期说明。
- `affiliate`（planned）：是否包含推广或佣金关系。

商品链接必须展示“仅供建议、需人工核验”的免责声明。

## 图片索引规则

- 图片使用内部 `imageId`，业务数据不直接依赖临时 URL。
- 保存原图哈希、来源、授权状态、尺寸、格式和采集时间。
- 区分主图、细节图、背面图、尺码图、材质图与舞台参考图。
- 同一商品图片按稳定顺序编号，不以文件修改时间排序。
- 生成缩略图和 Web 优化图时保留原图引用。
- 未确认授权的图片不得用于公开发布或模型训练。
- 学生上传图片不得进入公共服装资产库。
