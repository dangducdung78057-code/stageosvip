# StageOS Visual Asset Knowledge v1

本知识库由 4 个用户提供的压缩包整理而成，实际提取并建立索引的图片共 **746 张**。

## 来源统计

- `1.zip`：311 张图片（归类为 `commercial_reference`）
- `9云肩.zip`：50 张图片（归类为 `yunjian_reference`）
- `stage-outfit-design (7).zip`：254 张图片（归类为 `stage_outfit_design`）
- `压缩包.zip`：131 张图片（归类为 `color_palette`）

## 合计

- 实际图片：**746**
- 预期图片：**746**
- 数量核对：**PASS**
- 重复哈希组：**114**
- 无法读取图片：**0**

## 重要边界

- `1.zip` 的 311 张图片保留为 `COMMERCIAL_COSTUME_REFERENCE`，尚未逐张人工细分为头饰、胸针、项链等。
- `9云肩.zip` 的 50 张图片归入 `YUNJIAN / Shoulder`。
- `stage-outfit-design (7).zip` 的 254 张图片按路径拆分为遮罩、预览、纹理、配色和其他实现资产。
- `压缩包.zip` 的 131 张图片归入 `COLOR_PALETTE`。
- 商品链接、价格、商家没有保存，因此没有编造。
- 每张图片均保留原文件名、原压缩包路径、SHA-256、尺寸和检索状态。

## 目录

```text
catalog/
  asset_index.json
  asset_index.csv
  *_assets.json
  duplicate_report.json
  broken_files.json
images/
  commercial_reference/
  yunjian_reference/
  stage_outfit_design/
  color_palette/
previews/
source_manifests/
```
