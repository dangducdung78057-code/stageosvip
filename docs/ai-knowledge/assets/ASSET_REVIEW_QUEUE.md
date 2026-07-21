# StageOS Asset Review Queue

## Current Queue

- Category：`UNCLASSIFIED`
- Count：60
- Action：待人工分类，不删除。

这些资产包含技术性 mask、应用图标、placeholder、舞台矩阵或其他当前无法稳定归入 `YUNJIAN`、`COSTUME`、`ACCESSORY`、`COLOR_PALETTE` 的内容。

## Review Rules

- 人工查看原图和上下文后再调整 Category 与 layer。
- 无法确认时继续保留 `UNCLASSIFIED`，不得硬猜。
- 不因重复、低信息量或暂时不可用而直接删除资产。
- 分类调整时必须同步总索引、分类索引、文件路径和联系表。
- 商品链接、品牌、价格、店铺和 SKU 不可从图片外推。

本队列只记录知识库审阅状态，不表示 Runtime Binding 或应用渲染已经完成。

## Visual Library UNKNOWN Layer Queue

- Dataset：`visual-library/catalog/asset_index.json`
- Condition：`layer=UNKNOWN`
- Count：483
- Action：进入后续逐张人工语义复核，不自动分类、不删除。

`UNKNOWN` 是知识库中合法的开放 layer 值，表示分类工作尚未完成，不表示文件损坏或导入失败。只有在查看原图、来源路径和使用上下文后，才能将其更新为更具体的 layer。

该队列与上方 `category=UNCLASSIFIED` 队列分别管理：前者记录 layer 待复核，后者记录 Category 待复核，不得将两者自动互相转换。视觉知识库记录进入运行时前仍需单独完成 Binding 和强类型校验。
