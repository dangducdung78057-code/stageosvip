# StageOS Yunjian Semantic Review Plan

## Batch Information

- Batch ID：`YUNJIAN_REVIEW_BATCH_01`
- Total Records：50
- Current Status：`UNREVIEWED`
- Selection Rule：`category=YUNJIAN`
- Current Layer：50/50 为 `Shoulder`
- Source Collection：50/50 为 `yunjian_reference`
- Manifest Traceability：50/50
- Duplicate SHA Groups in Batch：0
- Duplicate SHA Records in Batch：0

原始图片不在 Git 中。人工复核必须结合网盘中的原图或 `visual-library/previews/yunjian_reference_contact_sheet.jpg`；contact sheet 只能用于批量定位和初筛，无法确认细节时必须查看原图。

只读依据：

- `visual-library/catalog/asset_index.json`
- `visual-library/source_manifests/yunjian_reference.csv`
- `visual-library/previews/yunjian_reference_contact_sheet.jpg`
- `ASSET_REVIEW_QUEUE.md`

## Per-record Review Fields

每条记录的人工复核结果应包含：

- `assetId`
- `originalFileName`
- `originalArchivePath`
- 当前 `category`
- 当前 `layer`
- `silhouette`
- `dominantColors`
- `pattern`
- `materialAppearance`
- `ornamentType`
- `fringeOrTassel`
- `symmetry`
- `stageSuitability`
- `ageSuitability`
- `visualSearchKeywords`
- `duplicateDisposition`
- `reviewStatus`
- `reviewerNotes`

上述建议字段在人工确认前不得根据文件名或批次归属自动填充。空值表示尚未完成判断，不表示系统已推断结论。

## Review Status Enum

- `NOT_REVIEWED`：尚未开始人工复核。
- `REVIEWED_CONFIRMED`：人工确认当前元数据无需修正。
- `REVIEWED_CORRECTED`：人工确认并提出元数据修正。
- `NEEDS_SOURCE_IMAGE`：contact sheet 信息不足，必须查看来源原图。
- `DUPLICATE_KEEP`：确认内容重复但因来源、上下文或使用价值需要保留。
- `DUPLICATE_MERGE_CANDIDATE`：人工确认可进入后续合并评估；该状态本身不授权删除或合并。

## Review Principles

- 不编造商品链接、品牌、价格或卖家。
- 不根据文件名猜测商品属性、材质、年代或工艺。
- 无法判断时使用 `UNKNOWN`，并在 `reviewerNotes` 中记录需要补充的证据。
- 相同 SHA-256 不自动删除；必须保留来源和使用上下文。
- 不把视觉相似认定为同款、同一商品或同一来源。
- 不把云肩自动认定为特定朝代、地域、民族或流派。
- 只有完成人工确认并通过后续变更审查，才能更新 `asset_index.json`。
- 本计划不授权自动分类、修改资产、合并重复项或更新运行时 Binding。

## Review Checklist

| assetId | originalFileName | originalArchivePath | currentCategory | currentLayer | reviewStatus | reviewerNotes |
|---|---|---|---|---|---|---|
| YUNJIAN_0001 | IMG_12790.jpg | IMG_12790.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0002 | IMG_12791.jpg | IMG_12791.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0003 | IMG_12792.jpg | IMG_12792.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0004 | IMG_12793.jpg | IMG_12793.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0005 | IMG_12794.jpg | IMG_12794.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0006 | IMG_12795.jpg | IMG_12795.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0007 | IMG_12796.jpg | IMG_12796.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0008 | IMG_12797.jpg | IMG_12797.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0009 | IMG_12798.jpg | IMG_12798.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0010 | IMG_12799.jpg | IMG_12799.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0011 | IMG_12800.jpg | IMG_12800.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0012 | IMG_12801.jpg | IMG_12801.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0013 | IMG_12802.jpg | IMG_12802.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0014 | IMG_12803.jpg | IMG_12803.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0015 | IMG_12804.jpg | IMG_12804.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0016 | IMG_12805.jpg | IMG_12805.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0017 | IMG_12806.jpg | IMG_12806.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0018 | IMG_12807.jpg | IMG_12807.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0019 | IMG_12808.jpg | IMG_12808.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0020 | IMG_12809.jpg | IMG_12809.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0021 | IMG_12810.jpg | IMG_12810.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0022 | IMG_12811.jpg | IMG_12811.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0023 | IMG_12812.jpg | IMG_12812.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0024 | IMG_12813.jpg | IMG_12813.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0025 | IMG_12814.jpg | IMG_12814.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0026 | IMG_12815.jpg | IMG_12815.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0027 | IMG_12816.jpg | IMG_12816.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0028 | IMG_12817.jpg | IMG_12817.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0029 | IMG_12818.jpg | IMG_12818.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0030 | IMG_12819.jpg | IMG_12819.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0031 | IMG_12820.jpg | IMG_12820.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0032 | IMG_12821.jpg | IMG_12821.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0033 | IMG_12822.jpg | IMG_12822.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0034 | IMG_12823.jpg | IMG_12823.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0035 | IMG_12824.jpg | IMG_12824.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0036 | IMG_12825.jpg | IMG_12825.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0037 | IMG_12826.jpg | IMG_12826.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0038 | IMG_12827.jpg | IMG_12827.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0039 | IMG_12828.jpg | IMG_12828.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0040 | IMG_12829.jpg | IMG_12829.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0041 | IMG_12830.jpg | IMG_12830.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0042 | IMG_12831.jpg | IMG_12831.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0043 | IMG_12832.jpg | IMG_12832.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0044 | IMG_12833.jpg | IMG_12833.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0045 | IMG_12834.jpg | IMG_12834.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0046 | IMG_12835.jpg | IMG_12835.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0047 | IMG_12836.jpg | IMG_12836.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0048 | IMG_12837.jpg | IMG_12837.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0049 | IMG_12838.jpg | IMG_12838.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |
| YUNJIAN_0050 | IMG_12839.jpg | IMG_12839.jpg | YUNJIAN | Shoulder | NOT_REVIEWED |  |

## Completion Gate

本批次只有在 50 条记录均由人工完成复核、需要原图的记录已补充证据、重复处置已单独确认并通过资产数据变更审查后，才可提议更新索引。计划完成不等同于数据变更获批。
