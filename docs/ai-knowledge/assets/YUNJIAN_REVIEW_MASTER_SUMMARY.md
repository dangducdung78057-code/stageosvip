# StageOS Yunjian Review Master Summary

## Overview

- Review Scope: `YUNJIAN_0001–YUNJIAN_0050`
- Baseline Commit: `6b0463f380109706f059421663170b0f9496df64`
- Total Records: 50
- Batch Count: 5 (`01A–01E`)
- Reviewed Records: 50
- Confirmed Records: 10
- Outstanding Records: 40
- Review Completion Status: `YUNJIAN_REVIEW_COMPLETE_WITH_OUTSTANDING_EXPERT_ITEMS`

All 50 records have verified batch review coverage. Ten records have confirmed semantics and applied metadata; the remaining 40 retain their existing Catalog values pending expert classification or collection-level handling.

## Batch Summary

| Batch | Record Range | Reviewed | Confirmed | Excluded | Applied | Review / Completion Commit |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| 01A | YUNJIAN_0001–YUNJIAN_0010 | 10 | 9 | 1 | 9 | `aa2c5dcfc0124fc5f5d3098b74c46f97bc6b6e95` (review); `78e42597a7778c15d4ad972110758f82f0278758` (application) |
| 01B | YUNJIAN_0011–YUNJIAN_0020 | 10 | 0 | 10 | 0 | `52afbdd19a608b2da9a2a460c5ef6f67ee090b80` |
| 01C | YUNJIAN_0021–YUNJIAN_0030 | 10 | 1 | 9 | 1 | `2d10a6605da0e221dca84190c89749132d564ecd` |
| 01D | YUNJIAN_0031–YUNJIAN_0040 | 10 | 0 | 10 | 0 | `5554af9dabc19bfa6f66e4b8bb2061b02d2ea1dc` |
| 01E | YUNJIAN_0041–YUNJIAN_0050 | 10 | 0 | 10 | 0 | `6b0463f380109706f059421663170b0f9496df64` |
| **Total** | **YUNJIAN_0001–YUNJIAN_0050** | **50** | **10** | **40** | **10** | — |

No reviewed record has status `NEEDS_BETTER_SOURCE_IMAGE`. The 40 excluded records all retain `NEEDS_EXPERT_REVIEW`.

## Applied Metadata Summary

- Applied Asset IDs: `YUNJIAN_0002–YUNJIAN_0010`, `YUNJIAN_0021`
- Applied Record Count: 10
- Records Modified: 10
- Fields Updated: `description`, `tags`, `notes`
- Target Catalog Files:
  - `docs/ai-knowledge/assets/visual-library/catalog/yunjian_assets.json`
  - `docs/ai-knowledge/assets/visual-library/catalog/asset_index.json`

Commit-level comparison confirms that no other top-level fields changed. `title`, `visualSearch`, `category`, `layer`, `sourceType`, `status`, `productMatchStatus`, `image.sha256`, filenames, paths, and source fields remain unchanged.

## Outstanding Review Queue

The `Queue Class` below is a handling classification derived from the existing review notes; `currentStatus` remains the authoritative review status. The 40 records are partitioned as follows:

- `NEEDS_EXPERT_REVIEW`: 11 single-object or category/layer reassessment items
- `NEEDS_BETTER_SOURCE_IMAGE`: 0
- `REVIEWED_BUT_NO_METADATA_CHANGE`: 0
- `EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS`: 29 collection, composite, or multi-object items
- `OTHER`: 0

### Batch 01A

| assetId | batch | currentStatus | Queue Class | exclusionReason | recommendedNextAction |
| --- | --- | --- | --- | --- | --- |
| YUNJIAN_0001 | 01A | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Composite multi-item grid cannot receive one unified single-item semantic description. | Expert determines collection-level retention, splitting, or reclassification before any metadata update. |

### Batch 01B

| assetId | batch | currentStatus | Queue Class | exclusionReason | recommendedNextAction |
| --- | --- | --- | --- | --- | --- |
| YUNJIAN_0011 | 01B | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Several distinct garment concepts would be merged by one description. | Expert determines whether to split or place in a broader costume-reference category. |
| YUNJIAN_0012 | 01B | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source combines several full-garment designs. | Expert confirms knowledge category and record scope. |
| YUNJIAN_0013 | 01B | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Multiple garment concepts cannot be reduced to one cloud-shoulder description. | Expert determines the appropriate asset classification. |
| YUNJIAN_0014 | 01B | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Several full-garment designs are represented instead of one shoulder-layer asset. | Expert classifies or splits the source. |
| YUNJIAN_0015 | 01B | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source combines multiple silhouettes and garment types. | Expert determines intended Catalog scope. |
| YUNJIAN_0016 | 01B | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Multiple full-garment designs would be conflated by one record. | Expert classifies or splits the source. |
| YUNJIAN_0017 | 01B | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Twelve objects cannot be represented accurately by one description, color set, or motif set. | Expert decides whether to retain as a collection-level record or split it. |
| YUNJIAN_0018 | 01B | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Four objects have incompatible silhouettes, colors, motifs, and ornaments. | Expert decides collection-level handling or splitting. |
| YUNJIAN_0019 | 01B | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source combines four semantically distinct objects. | Expert determines collection scope without inferring a duplicate or merge decision. |
| YUNJIAN_0020 | 01B | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | One metadata description would merge four different objects. | Expert determines collection-level treatment. |

### Batch 01C

| assetId | batch | currentStatus | Queue Class | exclusionReason | recommendedNextAction |
| --- | --- | --- | --- | --- | --- |
| YUNJIAN_0022 | 01C | NEEDS_EXPERT_REVIEW | NEEDS_EXPERT_REVIEW | Visual content is clear, but no definite neckline or shoulder-collar structure is present. | Expert confirms whether the asset belongs to `YUNJIAN/Shoulder`. |
| YUNJIAN_0023 | 01C | NEEDS_EXPERT_REVIEW | NEEDS_EXPERT_REVIEW | Object appears as a side-hanging accessory rather than a clear shoulder-layer asset. | Expert reassesses category and layer. |
| YUNJIAN_0024 | 01C | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | One record represents six different objects. | Expert chooses collection retention or child-asset splitting. |
| YUNJIAN_0025 | 01C | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Four different structures cannot safely share one single-item semantic record. | Expert resolves collection boundaries. |
| YUNJIAN_0026 | 01C | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | One record contains four different objects. | Expert determines collection-level handling without adopting regional claims. |
| YUNJIAN_0027 | 01C | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source contains two objects with different uses and decoration. | Expert determines whether to split the record. |
| YUNJIAN_0028 | 01C | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source is a multi-element knowledge graphic rather than a single asset image. | Expert determines the appropriate knowledge-library granularity. |
| YUNJIAN_0029 | 01C | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Four structures cannot be merged into single-item metadata. | Expert chooses collection retention or splitting. |
| YUNJIAN_0030 | 01C | NEEDS_EXPERT_REVIEW | NEEDS_EXPERT_REVIEW | Object appears to be a fastener rather than a shoulder-collar asset. | Expert reassesses category and layer. |

### Batch 01D

| assetId | batch | currentStatus | Queue Class | exclusionReason | recommendedNextAction |
| --- | --- | --- | --- | --- | --- |
| YUNJIAN_0031 | 01D | NEEDS_EXPERT_REVIEW | NEEDS_EXPERT_REVIEW | Object belongs visually to a belt-plate or fastener category, not a clear shoulder collar. | Expert reclassifies the object. |
| YUNJIAN_0032 | 01D | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source is a fan collection and conflicts with `YUNJIAN/Shoulder`. | Expert reclassifies or splits the collection. |
| YUNJIAN_0033 | 01D | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source is a multi-object waist-accessory chart, not a single shoulder asset. | Expert reclassifies and decides whether to split it. |
| YUNJIAN_0034 | 01D | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source mixes six accessory classes despite including one cloud-shoulder example. | Expert chooses collection retention or splitting. |
| YUNJIAN_0035 | 01D | NEEDS_EXPERT_REVIEW | NEEDS_EXPERT_REVIEW | Source is unrelated to the current Yunjian category. | Expert reclassifies the asset. |
| YUNJIAN_0036 | 01D | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source is a multi-category object collection, not a single shoulder asset. | Expert reclassifies or splits the collection. |
| YUNJIAN_0037 | 01D | NEEDS_EXPERT_REVIEW | NEEDS_EXPERT_REVIEW | Object is an umbrella rather than a shoulder asset. | Expert reclassifies the asset. |
| YUNJIAN_0038 | 01D | NEEDS_EXPERT_REVIEW | NEEDS_EXPERT_REVIEW | Object is a lantern rather than a shoulder asset. | Expert reclassifies the asset. |
| YUNJIAN_0039 | 01D | NEEDS_EXPERT_REVIEW | NEEDS_EXPERT_REVIEW | Object is a waist fan rather than a shoulder asset. | Expert reclassifies the asset. |
| YUNJIAN_0040 | 01D | NEEDS_EXPERT_REVIEW | NEEDS_EXPERT_REVIEW | Object is a sachet rather than a shoulder asset. | Expert reclassifies the asset. |

### Batch 01E

| assetId | batch | currentStatus | Queue Class | exclusionReason | recommendedNextAction |
| --- | --- | --- | --- | --- | --- |
| YUNJIAN_0041 | 01E | NEEDS_EXPERT_REVIEW | NEEDS_EXPERT_REVIEW | Source shows a small floral-ornament process rather than a confirmed single cloud shoulder. | Expert reclassifies the asset. |
| YUNJIAN_0042 | 01E | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source is a multi-object accessory collection. | Expert determines classification and splitting. |
| YUNJIAN_0043 | 01E | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source contains four neck-accessory classes instead of one confirmed cloud shoulder. | Expert reclassifies or splits the source. |
| YUNJIAN_0044 | 01E | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source is a multi-object neck-accessory infographic. | Expert determines collection-level handling. |
| YUNJIAN_0045 | 01E | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source mixes a garment drape with multiple jewelry classes. | Expert reclassifies or splits the source. |
| YUNJIAN_0046 | 01E | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source mixes four accessory and drape classes. | Expert reclassifies or splits the source. |
| YUNJIAN_0047 | 01E | NEEDS_EXPERT_REVIEW | NEEDS_EXPERT_REVIEW | Objects belong visually to a hair-ornament category rather than a shoulder layer. | Expert reclassifies the asset. |
| YUNJIAN_0048 | 01E | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source contains two hair-accessory classes rather than one shoulder asset. | Expert reclassifies or splits the source. |
| YUNJIAN_0049 | 01E | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source contains two head-accessory forms rather than one shoulder asset. | Expert reclassifies or splits the source. |
| YUNJIAN_0050 | 01E | NEEDS_EXPERT_REVIEW | EXCLUDED_AS_COMPOSITE_OR_AMBIGUOUS | Source contains two headdress forms rather than one shoulder asset. | Expert reclassifies or splits the source. |

## Integrity Summary

- Asset Index Total: 746
- Yunjian Catalog Count: 50
- Unique Asset IDs: 746
- Review Coverage: 50/50
- Missing Review IDs: 0
- Duplicate Review IDs: 0
- Manifest Trace Errors: 0
- Category Errors: 0
- Layer Errors: 0
- Dual-File Mismatches: 0
- SHA Field Changes: 0
- Category Changes: 0
- Layer Changes: 0
- Source Count Delta: 0
- Product Metadata Violations: 0
- Unknown Enum Values: 0
- Unrelated Records Changed: 0
- Tracked Image Files Added: 0

The application commits changed exactly ten intended Yunjian records in both Catalog files, and each changed record only in `description`, `tags`, and `notes`.

## Final Status

`YUNJIAN_REVIEW_COMPLETE_WITH_OUTSTANDING_EXPERT_ITEMS`
