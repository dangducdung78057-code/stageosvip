# StageOS Yunjian Review Batch 01A Metadata Patch Plan

## Patch Metadata

- Batch ID: `YUNJIAN_REVIEW_BATCH_01A`
- Source Review Commit: `aa2c5dcfc0124fc5f5d3098b74c46f97bc6b6e95`
- Baseline Commit: `aa2c5dcfc0124fc5f5d3098b74c46f97bc6b6e95`
- Candidate Records: 9 (`YUNJIAN_0002`–`YUNJIAN_0010`)
- Excluded Records: 1 (`YUNJIAN_0001`)
- Patch Mode: `PLAN_ONLY`
- Catalog Files Potentially Affected:
  - `docs/ai-knowledge/assets/visual-library/catalog/yunjian_assets.json`
- Index Files Potentially Affected:
  - `docs/ai-knowledge/assets/visual-library/catalog/asset_index.json`
- Schema Version or Contract Reference: `docs/ai-knowledge/assets/COSTUME_ASSET_SCHEMA.md`; catalog `schemaVersion: 1.0`
- Generated Date: `2026-07-22` (Asia/Shanghai)
- Patch Status: `READY_FOR_HUMAN_REVIEW`

The nine candidates occur in both the Yunjian category shard and the total asset index. A later patch must update the two JSON copies atomically and keep each duplicated record identical. No generation script for these catalogs was found in the repository. The relevant top-level generated summaries (`totalAssets`, `sourceStats`, `categorySummary`, `dataQuality`, and shard `count`) are not derived from the proposed semantic fields and must remain unchanged.

`asset_index.csv` and `source_manifests/yunjian_reference.csv` do not contain `title`, `description`, `tags`, `visualSearch`, or `notes`. Because this plan proposes no category or layer change, neither CSV is a patch target. The catalog records contain no per-record update timestamp or audit-version field. The catalog `schemaVersion` remains `1.0` because this plan uses existing fields only.

### Stable Update Rules

- Keep the existing tag order (`yunjian_reference`, `yunjian`, `shoulder`) and append only new, normalized, unique tags in lexical order. This avoids reorder-only diffs.
- Preserve the existing `visualSearch` object exactly. Although the Markdown contract names `visualSearch.searchKeywords`, the imported catalog currently uses `enabled` plus `searchIntent`; adding a new property requires a separately approved catalog-format migration.
- Append the notes sentence after the existing note. Do not delete the historical statement that the record was unreviewed at import time.
- Material, metal, pearl, bead, and color terms describe visible appearance only.
- Do not change source identity, paths, archive information, status, source type, product metadata, image dimensions, or SHA-256.

## Record Patch Plans

### YUNJIAN_0002

- assetId: `YUNJIAN_0002`
- sourceReviewStatus: `REVIEWED_CONFIRMED`
- sourceReviewerConfidence: `HIGH`
- currentValues:
  - title: `Yunjian 0002`
  - description: `用户保存的真实网购/视觉参考图片；商品链接未保存，适合视觉检索与设计参考。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`]
  - visualSearch: `{ enabled: true, searchIntent: [same_product, similar_product, similar_style] }`
  - category: `YUNJIAN`
  - layer: `Shoulder`
  - notes: `未逐张人工语义复核；来源集合与路径已核验。`
- proposedValues:
  - description: `经原图核验：象牙色尖角轮廓云肩，可见花卉与蝴蝶状纹样、扇贝形边缘、串珠状流苏和水滴状垂饰；材质词仅描述视觉外观。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`, `beaded_fringe`, `butterfly_motif`, `floral_motif`, `ivory`, `pointed_silhouette`, `scalloped_edge`]
  - notes: `未逐张人工语义复核；来源集合与路径已核验。 后续审计：2026-07-22 原图语义复核为 REVIEWED_CONFIRMED（HIGH），来源 SHA-256 已核验。`
- changedFields: [`description`, `tags`, `notes`]
- unchangedFields: [`title`, `visualSearch`, `category`, `layer`]
- knowledgeOnlyFields: `silhouette`, `dominantColors`, `pattern`, `materialAppearance`, `ornamentType`, `fringeOrTassel`, `symmetry`, `stageSuitability`, `ageSuitability`, `duplicateDisposition` = `NO_DIRECT_SCHEMA_MAPPING`; `visualSearchKeywords` = `KNOWLEDGE_ONLY` pending catalog-format alignment.
- schemaMappingNotes: Visible traits are mapped only to existing `description` and `tags`; no raw review-only field is added.
- validationRequirements: Update both target JSON records identically; preserve SHA-256, paths, source fields, status and product metadata; parse both JSON files; keep totals/counts unchanged.
- patchEligibility: `ELIGIBLE`

### YUNJIAN_0003

- assetId: `YUNJIAN_0003`
- sourceReviewStatus: `REVIEWED_CONFIRMED`
- sourceReviewerConfidence: `HIGH`
- currentValues:
  - title: `Yunjian 0003`
  - description: `用户保存的真实网购/视觉参考图片；商品链接未保存，适合视觉检索与设计参考。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`]
  - visualSearch: `{ enabled: true, searchIntent: [same_product, similar_product, similar_style] }`
  - category: `YUNJIAN`
  - layer: `Shoulder`
  - notes: `未逐张人工语义复核；来源集合与路径已核验。`
- proposedValues:
  - description: `经原图核验：珊瑚粉扇形轮廓云肩，可见大型花卉纹样、金色与银灰色视觉线饰、扇贝形边缘及橙色串珠状流苏。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`, `coral_pink`, `fan_silhouette`, `floral_motif`, `gold_like_threadwork`, `orange_bead_fringe`, `scalloped_edge`]
  - notes: `未逐张人工语义复核；来源集合与路径已核验。 后续审计：2026-07-22 原图语义复核为 REVIEWED_CONFIRMED（HIGH），来源 SHA-256 已核验。`
- changedFields: [`description`, `tags`, `notes`]
- unchangedFields: [`title`, `visualSearch`, `category`, `layer`]
- knowledgeOnlyFields: `silhouette`, `dominantColors`, `pattern`, `materialAppearance`, `ornamentType`, `fringeOrTassel`, `symmetry`, `stageSuitability`, `ageSuitability`, `duplicateDisposition` = `NO_DIRECT_SCHEMA_MAPPING`; `visualSearchKeywords` = `KNOWLEDGE_ONLY` pending catalog-format alignment.
- schemaMappingNotes: Gold- and silver-like wording describes appearance only; similarity to another record is not written as a merge conclusion.
- validationRequirements: Update both target JSON records identically; preserve SHA-256, paths, source fields, status and product metadata; parse both JSON files; keep totals/counts unchanged.
- patchEligibility: `ELIGIBLE`

### YUNJIAN_0004

- assetId: `YUNJIAN_0004`
- sourceReviewStatus: `REVIEWED_CONFIRMED`
- sourceReviewerConfidence: `HIGH`
- currentValues:
  - title: `Yunjian 0004`
  - description: `用户保存的真实网购/视觉参考图片；商品链接未保存，适合视觉检索与设计参考。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`]
  - visualSearch: `{ enabled: true, searchIntent: [same_product, similar_product, similar_style] }`
  - category: `YUNJIAN`
  - layer: `Shoulder`
  - notes: `未逐张人工语义复核；来源集合与路径已核验。`
- proposedValues:
  - description: `经原图核验：浅蓝色扇形云肩，由重复花瓣状层片构成，可见蓝色花卉装饰、银灰色视觉线饰、扇贝形边缘和深蓝色垂饰。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`, `blue_floral_motif`, `dark_blue_pendant`, `light_blue`, `petal_panel`, `radial_symmetry`, `scalloped_edge`]
  - notes: `未逐张人工语义复核；来源集合与路径已核验。 后续审计：2026-07-22 原图语义复核为 REVIEWED_CONFIRMED（HIGH），来源 SHA-256 已核验。`
- changedFields: [`description`, `tags`, `notes`]
- unchangedFields: [`title`, `visualSearch`, `category`, `layer`]
- knowledgeOnlyFields: `silhouette`, `dominantColors`, `pattern`, `materialAppearance`, `ornamentType`, `fringeOrTassel`, `symmetry`, `stageSuitability`, `ageSuitability`, `duplicateDisposition` = `NO_DIRECT_SCHEMA_MAPPING`; `visualSearchKeywords` = `KNOWLEDGE_ONLY` pending catalog-format alignment.
- schemaMappingNotes: The proposed text records visible construction and color only; it does not infer material composition.
- validationRequirements: Update both target JSON records identically; preserve SHA-256, paths, source fields, status and product metadata; parse both JSON files; keep totals/counts unchanged.
- patchEligibility: `ELIGIBLE`

### YUNJIAN_0005

- assetId: `YUNJIAN_0005`
- sourceReviewStatus: `REVIEWED_CONFIRMED`
- sourceReviewerConfidence: `HIGH`
- currentValues:
  - title: `Yunjian 0005`
  - description: `用户保存的真实网购/视觉参考图片；商品链接未保存，适合视觉检索与设计参考。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`]
  - visualSearch: `{ enabled: true, searchIntent: [same_product, similar_product, similar_style] }`
  - category: `YUNJIAN`
  - layer: `Shoulder`
  - notes: `未逐张人工语义复核；来源集合与路径已核验。`
- proposedValues:
  - description: `经原图核验：浅粉色尖角轮廓云肩，可见密集蝴蝶状与花卉纹样、扇贝形肩片、串珠状流苏和水滴状垂饰。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`, `beaded_fringe`, `blush_pink`, `butterfly_motif`, `floral_motif`, `pointed_silhouette`, `scalloped_panel`]
  - notes: `未逐张人工语义复核；来源集合与路径已核验。 后续审计：2026-07-22 原图语义复核为 REVIEWED_CONFIRMED（HIGH），来源 SHA-256 已核验。`
- changedFields: [`description`, `tags`, `notes`]
- unchangedFields: [`title`, `visualSearch`, `category`, `layer`]
- knowledgeOnlyFields: `silhouette`, `dominantColors`, `pattern`, `materialAppearance`, `ornamentType`, `fringeOrTassel`, `symmetry`, `stageSuitability`, `ageSuitability`, `duplicateDisposition` = `NO_DIRECT_SCHEMA_MAPPING`; `visualSearchKeywords` = `KNOWLEDGE_ONLY` pending catalog-format alignment.
- schemaMappingNotes: Visible similarity to YUNJIAN_0002 remains review knowledge and is not converted into a duplicate relation.
- validationRequirements: Update both target JSON records identically; preserve SHA-256, paths, source fields, status and product metadata; parse both JSON files; keep totals/counts unchanged.
- patchEligibility: `ELIGIBLE`

### YUNJIAN_0006

- assetId: `YUNJIAN_0006`
- sourceReviewStatus: `REVIEWED_CONFIRMED`
- sourceReviewerConfidence: `HIGH`
- currentValues:
  - title: `Yunjian 0006`
  - description: `用户保存的真实网购/视觉参考图片；商品链接未保存，适合视觉检索与设计参考。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`]
  - visualSearch: `{ enabled: true, searchIntent: [same_product, similar_product, similar_style] }`
  - category: `YUNJIAN`
  - layer: `Shoulder`
  - notes: `未逐张人工语义复核；来源集合与路径已核验。`
- proposedValues:
  - description: `经原图核验：象牙色尖角轮廓云肩，左右构图不对称，可见深色山水状图形、绿色竹叶状图形、绿色垂饰和灰色长流苏。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`, `asymmetric`, `bamboo_like_motif`, `ink_style_landscape`, `ivory`, `jade_green_pendant`, `long_tassel`]
  - notes: `未逐张人工语义复核；来源集合与路径已核验。 后续审计：2026-07-22 原图语义复核为 REVIEWED_CONFIRMED（HIGH），来源 SHA-256 已核验；未推断地域或年代。`
- changedFields: [`description`, `tags`, `notes`]
- unchangedFields: [`title`, `visualSearch`, `category`, `layer`]
- knowledgeOnlyFields: `silhouette`, `dominantColors`, `pattern`, `materialAppearance`, `ornamentType`, `fringeOrTassel`, `symmetry`, `stageSuitability`, `ageSuitability`, `duplicateDisposition` = `NO_DIRECT_SCHEMA_MAPPING`; `visualSearchKeywords` = `KNOWLEDGE_ONLY` pending catalog-format alignment.
- schemaMappingNotes: Landscape- and bamboo-like terms identify visible shapes only and do not assign period or region.
- validationRequirements: Update both target JSON records identically; preserve SHA-256, paths, source fields, status and product metadata; parse both JSON files; keep totals/counts unchanged.
- patchEligibility: `ELIGIBLE`

### YUNJIAN_0007

- assetId: `YUNJIAN_0007`
- sourceReviewStatus: `REVIEWED_CONFIRMED`
- sourceReviewerConfidence: `HIGH`
- currentValues:
  - title: `Yunjian 0007`
  - description: `用户保存的真实网购/视觉参考图片；商品链接未保存，适合视觉检索与设计参考。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`]
  - visualSearch: `{ enabled: true, searchIntent: [same_product, similar_product, similar_style] }`
  - category: `YUNJIAN`
  - layer: `Shoulder`
  - notes: `未逐张人工语义复核；来源集合与路径已核验。`
- proposedValues:
  - description: `经原图核验：象牙色圆形多瓣轮廓云肩，可见金色鸟状纹样、深色包边、深红色珠状点缀和中央圆章状装饰。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`, `bird_like_motif`, `central_medallion`, `dark_red_bead`, `gold_like_embroidery`, `ivory`, `lobed_panel`, `round_silhouette`]
  - notes: `未逐张人工语义复核；来源集合与路径已核验。 后续审计：2026-07-22 原图语义复核为 REVIEWED_CONFIRMED（HIGH），来源 SHA-256 已核验；未推断纹样的文化归属。`
- changedFields: [`description`, `tags`, `notes`]
- unchangedFields: [`title`, `visualSearch`, `category`, `layer`]
- knowledgeOnlyFields: `silhouette`, `dominantColors`, `pattern`, `materialAppearance`, `ornamentType`, `fringeOrTassel`, `symmetry`, `stageSuitability`, `ageSuitability`, `duplicateDisposition` = `NO_DIRECT_SCHEMA_MAPPING`; `visualSearchKeywords` = `KNOWLEDGE_ONLY` pending catalog-format alignment.
- schemaMappingNotes: Bird-like and medallion-like terms are morphological descriptions, not cultural attribution.
- validationRequirements: Update both target JSON records identically; preserve SHA-256, paths, source fields, status and product metadata; parse both JSON files; keep totals/counts unchanged.
- patchEligibility: `ELIGIBLE`

### YUNJIAN_0008

- assetId: `YUNJIAN_0008`
- sourceReviewStatus: `REVIEWED_CONFIRMED`
- sourceReviewerConfidence: `HIGH`
- currentValues:
  - title: `Yunjian 0008`
  - description: `用户保存的真实网购/视觉参考图片；商品链接未保存，适合视觉检索与设计参考。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`]
  - visualSearch: `{ enabled: true, searchIntent: [same_product, similar_product, similar_style] }`
  - category: `YUNJIAN`
  - layer: `Shoulder`
  - notes: `未逐张人工语义复核；来源集合与路径已核验。`
- proposedValues:
  - description: `经原图核验：金色扇形轮廓云肩，可见云纹状卷曲图形、层叠珠状装饰、珍珠色流苏状边缘、反光圆片和中央长垂饰；金属与珍珠词仅描述外观。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`, `beaded_decoration`, `cloud_like_scroll`, `gold_like`, `metallic_sheen`, `pearl_like_fringe`, `reflective_disc`, `symmetric_fan`]
  - notes: `未逐张人工语义复核；来源集合与路径已核验。 后续审计：2026-07-22 原图语义复核为 REVIEWED_CONFIRMED（HIGH），来源 SHA-256 已核验；金属、珠石或纤维成分均未推断。`
- changedFields: [`description`, `tags`, `notes`]
- unchangedFields: [`title`, `visualSearch`, `category`, `layer`]
- knowledgeOnlyFields: `silhouette`, `dominantColors`, `pattern`, `materialAppearance`, `ornamentType`, `fringeOrTassel`, `symmetry`, `stageSuitability`, `ageSuitability`, `duplicateDisposition` = `NO_DIRECT_SCHEMA_MAPPING`; `visualSearchKeywords` = `KNOWLEDGE_ONLY` pending catalog-format alignment.
- schemaMappingNotes: Reflective, metallic, pearl-like, and gold-like language remains explicitly visual.
- validationRequirements: Update both target JSON records identically; preserve SHA-256, paths, source fields, status and product metadata; parse both JSON files; keep totals/counts unchanged.
- patchEligibility: `ELIGIBLE`

### YUNJIAN_0009

- assetId: `YUNJIAN_0009`
- sourceReviewStatus: `REVIEWED_CONFIRMED`
- sourceReviewerConfidence: `HIGH`
- currentValues:
  - title: `Yunjian 0009`
  - description: `用户保存的真实网购/视觉参考图片；商品链接未保存，适合视觉检索与设计参考。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`]
  - visualSearch: `{ enabled: true, searchIntent: [same_product, similar_product, similar_style] }`
  - category: `YUNJIAN`
  - layer: `Shoulder`
  - notes: `未逐张人工语义复核；来源集合与路径已核验。`
- proposedValues:
  - description: `经原图核验：珊瑚红不规则扇贝形轮廓云肩，可见金色混合纹样、橙色珠状点缀和三条带流苏末端的长装饰片。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`, `coral_red`, `embroidered_hanging_panel`, `gold_like_embroidery`, `orange_bead`, `scalloped_outline`, `tassel_end`]
  - notes: `未逐张人工语义复核；来源集合与路径已核验。 后续审计：2026-07-22 原图语义复核为 REVIEWED_CONFIRMED（HIGH），来源 SHA-256 已核验；未推断纹样含义、地域或年代。`
- changedFields: [`description`, `tags`, `notes`]
- unchangedFields: [`title`, `visualSearch`, `category`, `layer`]
- knowledgeOnlyFields: `silhouette`, `dominantColors`, `pattern`, `materialAppearance`, `ornamentType`, `fringeOrTassel`, `symmetry`, `stageSuitability`, `ageSuitability`, `duplicateDisposition` = `NO_DIRECT_SCHEMA_MAPPING`; `visualSearchKeywords` = `KNOWLEDGE_ONLY` pending catalog-format alignment.
- schemaMappingNotes: Similarity to YUNJIAN_0003 is not converted into a duplicate or merge relation.
- validationRequirements: Update both target JSON records identically; preserve SHA-256, paths, source fields, status and product metadata; parse both JSON files; keep totals/counts unchanged.
- patchEligibility: `ELIGIBLE`

### YUNJIAN_0010

- assetId: `YUNJIAN_0010`
- sourceReviewStatus: `REVIEWED_CONFIRMED`
- sourceReviewerConfidence: `HIGH`
- currentValues:
  - title: `Yunjian 0010`
  - description: `用户保存的真实网购/视觉参考图片；商品链接未保存，适合视觉检索与设计参考。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`]
  - visualSearch: `{ enabled: true, searchIntent: [same_product, similar_product, similar_style] }`
  - category: `YUNJIAN`
  - layer: `Shoulder`
  - notes: `未逐张人工语义复核；来源集合与路径已核验。`
- proposedValues:
  - description: `经原图核验：浅蓝色圆形放射轮廓云肩，可见八片大型外层肩片、内圈扇贝形结构、白色花卉细节、竹叶状图形和珍珠色扣状点缀。`
  - tags: [`yunjian_reference`, `yunjian`, `shoulder`, `bamboo_like_motif`, `light_blue`, `pearl_like_fastener`, `radial_panel`, `round_silhouette`, `scalloped_inner_ring`, `white_floral_detail`]
  - notes: `未逐张人工语义复核；来源集合与路径已核验。 后续审计：2026-07-22 原图语义复核为 REVIEWED_CONFIRMED（HIGH），来源 SHA-256 已核验；珍珠色仅描述可见外观。`
- changedFields: [`description`, `tags`, `notes`]
- unchangedFields: [`title`, `visualSearch`, `category`, `layer`]
- knowledgeOnlyFields: `silhouette`, `dominantColors`, `pattern`, `materialAppearance`, `ornamentType`, `fringeOrTassel`, `symmetry`, `stageSuitability`, `ageSuitability`, `duplicateDisposition` = `NO_DIRECT_SCHEMA_MAPPING`; `visualSearchKeywords` = `KNOWLEDGE_ONLY` pending catalog-format alignment.
- schemaMappingNotes: Similarity to YUNJIAN_0004 is not converted into a duplicate relation; pearl-like wording does not claim composition.
- validationRequirements: Update both target JSON records identically; preserve SHA-256, paths, source fields, status and product metadata; parse both JSON files; keep totals/counts unchanged.
- patchEligibility: `ELIGIBLE`

## Excluded Record

- assetId: `YUNJIAN_0001`
- Exclusion Reason: The verified source is a nine-item combination overview image and requires expert review before any unified semantic metadata can be assigned.
- Current Decision: `NEEDS_EXPERT_REVIEW`
- Patch Eligibility: `EXCLUDED`
- Constraint: It must not enter the metadata update until an expert determines whether the collage is retained as a collection-level record or represented through another approved model.

## Patch Summary

- Candidate Records: 9
- Records with Actual Changes: 9
- No Change Required: 0
- Blocked by Schema Mapping: 0
- Title Changes: 0
- Description Changes: 9
- Tags Changes: 9
- Visual Search Changes: 0
- Category Changes: 0
- Layer Changes: 0
- Notes Changes: 9
- Catalog Files Requiring Update: 1
- Index Files Requiring Update: 1

The review-only fields remain available in the final review document. They do not block the three direct, auditable changes proposed for each candidate.

## Execution Preconditions

Before any later task applies this plan:

1. Obtain human approval of this plan and its exact proposed values.
2. Freeze the target list to exactly `visual-library/catalog/yunjian_assets.json` and `visual-library/catalog/asset_index.json` unless a new baseline proves another synchronized representation exists.
3. Revalidate the Git baseline and require a clean working tree before editing.
4. Create a recoverable pre-change diff or equivalent backup before mutation.
5. Update each candidate atomically in both target JSON files.
6. Parse every catalog JSON file successfully after the patch.
7. Confirm `totalAssets` remains 746 and the Yunjian shard `count` remains 50.
8. Confirm all asset IDs remain unique and the candidate set remains exactly nine records.
9. Confirm every `image.sha256`, image dimension, source archive, source collection, original path, stored path, source type, status, product metadata field, and product match status is unchanged.
10. Confirm manifest tracing is unchanged and no manifest or CSV file was modified.
11. Confirm category remains `YUNJIAN` and layer remains `Shoulder` for all nine candidates.
12. Confirm no brand, seller, price, product URL, dynasty, region, physical material composition, Pantone value, standard color code, or duplicate merge claim was introduced.
13. Revalidate the baseline again if HEAD changes before execution.
14. Commit the later metadata patch separately, with no source-code, dependency, image, ZIP, or unrelated documentation changes.

This document is a plan only. It does not authorize or perform catalog mutation.
