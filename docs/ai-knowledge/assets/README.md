# StageOS Visual Asset Knowledge Library

本目录保存 StageOS 的真实服装与视觉参考资产知识。所有条目都是用户提供图片的数字参考记录，不等同于已确认的真实商品、可直接上线的 3D 资产或应用源码实现。

## 分类体系

- `YUNJIAN`：云肩及围绕肩颈的中式装饰结构，`layer=Shoulder`。
- `COSTUME`：上装、下装、整身服装、外罩和套装。
- `ACCESSORY`：头部、腰部、手持、肩部及其他非服装主体配饰。
- `COLOR_PALETTE`：色卡、配色方案和舞台色彩参考。
- `UNCLASSIFIED`：无法稳定判断或不符合上述类别的技术性/混合参考图。

## 索引文件

- `catalog/asset_index.json`：全部 746 条资产的总索引。
- `catalog/yunjian_assets.json`：YUNJIAN 分类索引。
- `catalog/costume_assets.json`：COSTUME 分类索引。
- `catalog/accessory_assets.json`：ACCESSORY 分类索引。
- `catalog/color_palette_assets.json`：COLOR_PALETTE 分类索引。
- `catalog/unclassified_assets.json`：UNCLASSIFIED 分类索引。

`extracted/` 保存按分类整理的原始图片副本；每张图片位于对应 `assetId` 子目录中，并保留原始文件名。`previews/` 保存分类联系表，用于人工快速审阅。

## 数据边界

- `sourceType` 统一为 `IMAGE_REFERENCE`，`status` 统一为 `DIGITAL_REFERENCE`。
- 本批次没有商品链接、价格、店铺、品牌、SKU、`externalProductId` 或 affiliate 数据。
- `productMatchStatus` 默认是 `NOT_FOUND`。
- `dominantColors` 留空，避免在未逐张精确取色时制造颜色结论。
- `ageSuitability` 为 `Unknown`；涉及儿童或学生使用时必须另行人工审核。
- `visualSearch` 仅表示未来可检索，不代表当前应用源码已经实现视觉搜索。
