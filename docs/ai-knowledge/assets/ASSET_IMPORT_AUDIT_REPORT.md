# StageOS Asset Import Audit Report

## Result

本批次完成 746 张视觉参考图片的本地整理与索引，JSON、路径、SHA-256 和图片可读性校验均通过。

## Input ZIP Files

实际用于图片导入的 ZIP：

- `StageOS_Commercial_311_part01_of_04.zip`
- `StageOS_Commercial_311_part02_of_04.zip`
- `StageOS_Commercial_311_part03_of_04.zip`
- `StageOS_Commercial_311_part04_of_04.zip`
- `StageOS_Yunjian_50_part01_of_02.zip`
- `StageOS_Yunjian_50_part02_of_02.zip`
- `StageOS_StageOutfit_254_part01_of_01.zip`
- `StageOS_ColorPalette_131_part01_of_03.zip`
- `StageOS_ColorPalette_131_part02_of_03.zip`
- `StageOS_ColorPalette_131_part03_of_03.zip`

元数据来源：

- `StageOS_Asset_Knowledge_Metadata_Only.zip`

发现但未重复导入：

- `StageOS_Color_Palette_Knowledge_v1.zip`：内容与 3 个 ColorPalette 分卷对应，为避免重复索引，仅采用分卷集合。

## Source Counts

- Commercial：311（309 个 JPG/PNG 等常规图片，2 个 HEIC）
- Yunjian：50
- StageOutfit：254
- ColorPalette：131
- Total：746

非色卡来源合计 615，与任务中的预期 615 一致。由于本次同时纳入 131 张色卡，总图片数为 746，即相对 615 增加 131；该差异来自明确要求单独纳入的 color-palettes 来源，不是重复或漏算。

## Classification Summary

- YUNJIAN: 73
- COSTUME: 329
- ACCESSORY: 147
- COLOR_PALETTE: 137
- UNCLASSIFIED: 60

Commercial 集合使用分页联系表进行保守视觉复核。StageOutfit 的技术性 mask、应用图标、placeholder 与舞台矩阵不属于可稳定判断的真实服装主体，因此进入 `UNCLASSIFIED`；未硬猜其商品或服饰类别。

## Data Quality

- Missing files：0
- Broken/unreadable files：0
- SHA-256 mismatches：0
- Duplicate hash groups：114
- Duplicate files beyond the first copy：118
- Unclassified assets：60

重复图片仍保留独立记录，因为任务要求为每个输入图片建立索引；重复统计用于后续去重决策。

## Product Metadata Boundary

本批次未记录或编造商品链接、价格、品牌、店铺、SKU、`externalProductId` 或 affiliate。全部资产均为 `IMAGE_REFERENCE` / `DIGITAL_REFERENCE`，`productMatchStatus=NOT_FOUND`。

## Repository Scope

- 是否修改 `src/`、`public/`、`supabase/`、`package.json` 或 `pnpm-lock.yaml`：否。
- 最终变更范围：仅 `docs/ai-knowledge/assets/` 及其子目录。
- 未执行 install、build、test 或 deploy。
