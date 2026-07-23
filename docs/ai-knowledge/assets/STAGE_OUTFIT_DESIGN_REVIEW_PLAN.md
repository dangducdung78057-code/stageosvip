# StageOS Stage Outfit Design Review Plan

## Overview

- Source Collection: `stage_outfit_design`
- Baseline Commit: `09a56b7feb77324125acd34c83fa32999238a58f`
- Total Records: 254
- Unique Asset IDs: 254
- Category Counts:
  - `OUTFIT_MASK`: 48
  - `STAGE_OUTFIT_ASSET`: 172
  - `STAGE_OUTFIT_PREVIEW`: 28
  - `COLOR_PALETTE`: 6
  - Other: 0
- Manifest Trace: 254/254
- Catalog Shard Consistency: 254/254
- Duplicate SHA Groups: 113 groups covering 230 records
- UNKNOWN Records: 172 (`layer=UNKNOWN`)
- Records Marked Unreviewed: 254
- Current Fast-Track Eligible Records: 0
- Structurally Pre-Grouped for Fast Review: 226
- Exception Queue Count: 254 (overlapping signals; unique-record union)
- Review Mode: `BATCH_AUTOMATED_WITH_EXCEPTION_QUEUE`

The current library is metadata-only. All 254 records state that they have not received per-image semantic review, so no record currently satisfies the required reviewed confidence gate. Automated grouping is a planning aid, not a semantic decision or metadata mutation.

The available contact sheet is `stage_outfit_design_contact_sheet.jpg` (1120 × 5056, 828,908 bytes). Final review still requires extraction and SHA verification of the source image represented by each record.

## Category Audit

| Category | Records | Layer Distribution | Status Distribution | Source Type Distribution | Extension Distribution | Dimension Distribution | Duplicate SHA Groups | UNKNOWN |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: |
| OUTFIT_MASK | 48 | Accent 24; Lower 24 | IMPLEMENTATION_ASSET 48 | IMPLEMENTATION_IMAGE 48 | PNG 48 | 1024×1536: 48 | 24 | 0 |
| STAGE_OUTFIT_ASSET | 172 | UNKNOWN 172 | IMPLEMENTATION_ASSET 172 | IMPLEMENTATION_IMAGE 172 | PNG 170; JPG 2 | 1024×1536: 96; 1024×1024: 64; 32×32: 2; ten other sizes: 1 each | 74 | 172 |
| STAGE_OUTFIT_PREVIEW | 28 | FullBody 28 | IMPLEMENTATION_ASSET 28 | IMPLEMENTATION_IMAGE 28 | PNG 28 | 1024×1536: 24; 376×2612: 2; 376×2397: 1; 376×2977: 1 | 12 | 0 |
| COLOR_PALETTE | 6 | N/A 6 | DIGITAL_REFERENCE 6 | IMAGE_REFERENCE 6 | PNG 6 | 1024×1024: 6 | 3 | 0 |

The ten single-occurrence `STAGE_OUTFIT_ASSET` dimensions are `180×180`, `256×144`, `1×1`, `200×200`, `1600×1100`, `376×1474`, `1800×620`, `376×1440`, `376×1644`, and `376×1397`.

All SHA fields and source paths are populated. No record is missing from `asset_index.json`, its category shard, or `stage_outfit_design.csv`.

## Processing Groups

### Group A: OUTFIT_MASK

- Asset IDs: `OUTFIT_MASK_0001–OUTFIT_MASK_0048`
- Record Count: 48
- Current Structure:
  - Accent masks: 24
  - Lower masks: 24
  - PNG: 48
  - 1024×1536: 48
  - Exact-SHA duplicate groups: 24, covering all 48 records
- Automated Processing Allowed Fields for a future authorized patch:
  - `description`
  - `tags`
  - `visualSearch`
  - `notes`
- Automated Checks:
  - Require `mask` in the filename and `/masks/` in the source path.
  - Preserve current `Accent` or `Lower` layer.
  - Record alpha/partition/coverage purpose only after source-image inspection.
  - Do not infer garment style from a technical mask.
- Manual Review Exceptions:
  - File does not decode as a mask-like technical image.
  - Alpha or partition purpose is unclear.
  - Filename and actual covered region disagree.
  - Duplicate pair has conflicting source context or intended usage.
- Estimated Batches: 1 batch of 48

### Group B: STAGE_OUTFIT_ASSET

- Asset IDs: `OUTFIT_ASSET_0001–OUTFIT_ASSET_0172`
- Record Count: 172
- Current Layer: `UNKNOWN` for all 172
- Automated Processing Allowed Fields for a future authorized patch:
  - `description`
  - `tags`
  - `visualSearch`
  - `layer`
  - `notes`
- Layer may only leave `UNKNOWN` after source-image evidence and HIGH or MEDIUM review confidence.

#### B1: Accent

- Record Count: 32
- Asset IDs:
  - `0001–0003`, `0013–0015`, `0025–0027`, `0037–0039`
  - `0049–0051`, `0061–0063`, `0073–0075`, `0085–0087`
  - `0097–0100`, `0148–0151`
- Deterministic Signals: `accent-*`, `/accent`, `/cloud-collars/`, or `CC-*`
- Estimated Batches: 1

#### B2: Footwear

- Record Count: 24
- Asset IDs:
  - `0004–0006`, `0016–0018`, `0028–0030`, `0040–0042`
  - `0052–0054`, `0064–0066`, `0076–0078`, `0088–0090`
- Deterministic Signals: `footwear-front`, `footwear-front-left`, `footwear-front-right`
- Estimated Batches: 1

#### B3: Full Body

- Record Count: 44
- Asset IDs:
  - `0101–0124`
  - `0131–0134`
  - `0144–0147`
  - `0158–0169`
- Deterministic Signals: role-specific `basic-white` or `base` filenames and `/base-garments/` paths
- Estimated Batches: 1

#### B4: Lower

- Record Count: 24
- Asset IDs:
  - `0007–0009`, `0019–0021`, `0031–0033`, `0043–0045`
  - `0055–0057`, `0067–0069`, `0079–0081`, `0091–0093`
- Deterministic Signals: `lower-front`, `lower-front-left`, `lower-front-right`
- Estimated Batches: 1

#### B5: Upper

- Record Count: 24
- Asset IDs:
  - `0010–0012`, `0022–0024`, `0034–0036`, `0046–0048`
  - `0058–0060`, `0070–0072`, `0082–0084`, `0094–0096`
- Deterministic Signals: `upper-front`, `upper-front-left`, `upper-front-right`
- Estimated Batches: 1

#### B6: Unknown / Exception-First

- Record Count: 24
- Asset IDs:
  - `0125–0130`
  - `0135–0143`
  - `0152–0157`
  - `0170–0172`
- Filename families include direction boards, review images, matrices, overview graphics, placeholders, and application icons.
- These files must not be assigned a garment layer from filenames alone.
- Estimated Batches: 1

#### Group B Manual Review Exceptions

- Current `layer=UNKNOWN`
- Composite board, matrix, review sheet, or overview image
- Placeholder, icon, or non-garment application asset
- Filename and directory imply different roles
- Exact duplicate appears under release-candidate and canonical paths
- Multi-view family is incomplete or has inconsistent imagery
- File is too small to support reliable garment semantics

Group B uses 6 batches, each no larger than 50 records.

### Group C: STAGE_OUTFIT_PREVIEW

- Asset IDs: `OUTFIT_PREVIEW_0001–OUTFIT_PREVIEW_0028`
- Record Count: 28
- Automated Processing Allowed Fields for a future authorized patch:
  - `description`
  - `tags`
  - `visualSearch`
  - `notes`
- Metadata Signal Groups:
  - Role-wearing previews: `OUTFIT_PREVIEW_0001–OUTFIT_PREVIEW_0024` (24)
  - Mobile/UI screenshots: `OUTFIT_PREVIEW_0025–OUTFIT_PREVIEW_0028` (4)
- Current metadata does not identify any record as a verified single-item preview.
- Composite, UI, review, and role-wearing images must not be treated as single garment assets.
- Manual Review Exceptions:
  - More than one garment or role appears.
  - UI chrome or review annotations are present.
  - Screenshot dimensions indicate a long mobile page.
  - Preview-to-asset mapping is not one-to-one.
  - Exact duplicate exists under another source path.
- Estimated Batches: 1 batch of 28

### Group D: COLOR_PALETTE

- Asset IDs: `PALETTE_0001–PALETTE_0006`
- Record Count: 6
- Files:
  - `free-four-role-composition.png` (two source paths)
  - `premium-four-role-composition.png` (two source paths)
  - `signature-four-role-composition.png` (two source paths)
- Automated Processing Allowed Fields for a future authorized patch:
  - `description`
  - `tags`
  - `visualSearch`
  - `notes`
- Color Rules:
  - Record only visible color names and approximate hex values.
  - Do not claim Pantone, brand colors, certified standards, or physical material colors.
  - Preserve `layer=N/A`, `status=DIGITAL_REFERENCE`, and `sourceType=IMAGE_REFERENCE`.
- Manual Review Exceptions:
  - Composite palette cannot be separated reliably by role.
  - Approximate colors change materially across duplicated source paths.
  - Source image is not a palette/composition reference.
- Estimated Batches: 1 batch of 6

## Duplicate and Relationship Analysis

### Exact SHA Duplicates

- Duplicate Groups: 113
- Records in Duplicate Groups: 230
- Group Size Distribution:
  - 109 groups with 2 records
  - 4 groups with 3 records
- Category Distribution:
  - OUTFIT_MASK: 24 groups / 48 records
  - STAGE_OUTFIT_ASSET: 74 groups / 152 records
  - STAGE_OUTFIT_PREVIEW: 12 groups / 24 records
  - COLOR_PALETTE: 3 groups / 6 records
- Relationship Status: `VERIFIED_RELATION` for byte-identical content only
- Retention Status: `UNRESOLVED`

Identical SHA does not authorize deletion, merging, or selection of a canonical record.

### Same Basename Across Paths

- Same-Basename Groups: 51
- Records in Same-Basename Groups: 234
- Group Size Distribution:
  - 29 groups with 2 records
  - 22 groups with 8 records
- 29 groups / 58 records also share one SHA: `VERIFIED_RELATION`
- 22 groups / 176 records do not have one shared SHA: `LIKELY_RELATION`

Filename identity alone does not prove that files are interchangeable.

### Mask, Asset, Preview, and Multi-View Signals

- Mask-to-asset candidates: 48 mask records have matching role/layer/view filename tokens in asset paths.
  - Status: `LIKELY_RELATION`
- Asset-to-preview candidates: 24 role-wearing previews have matching role/view tokens in asset families.
  - Status: `LIKELY_RELATION`
- Multi-view families: 32 directory-and-stem families covering 96 asset records.
  - Status: `LIKELY_RELATION`
- Unknown design boards, placeholders, icons, and screenshots:
  - Status: `UNRESOLVED`
- `NO_RELATION` is not assigned automatically; absence of a filename match is insufficient negative evidence.

Only SHA equality establishes `VERIFIED_RELATION`. All filename- or path-derived associations require source-image review.

## Fast-Track Rules

A record can enter a future metadata patch candidate set only when all conditions are met:

1. File type and technical purpose are clear.
2. Category, status, source type, path, and visible content agree.
3. Source image has been extracted and its SHA verified.
4. Source evidence identifies one unambiguous asset.
5. The image is not a composite being treated as a single asset.
6. Duplicate disposition and related-file mapping are resolved.
7. Review confidence is `HIGH` or `MEDIUM`.
8. Any proposed layer is supported by visible source evidence.

Current Fast-Track Eligible Records: **0**.

Reason: all 254 records are explicitly marked as not individually semantically reviewed, and the current Catalog contains no per-record HIGH/MEDIUM review confidence or verified source-evidence result.

Structurally Pre-Grouped for Fast Review: **226**.

This planning count excludes the 24 unknown asset files and 4 UI screenshots. It does not override duplicate review or source-image validation.

## Exception Queue

Exception signals overlap. The unique-record union is 254 because every record still requires source-image review.

| Exception Signal | Record Count | Required Action |
| --- | ---: | --- |
| Needs original per-image semantic review | 254 | Extract source, verify SHA, inspect image, assign confidence |
| Exact-SHA duplicate membership | 230 | Retain records; decide duplicate disposition without automatic deletion |
| `layer=UNKNOWN` | 172 | Confirm visible layer before any layer update |
| Composite-name signal | 22 | Confirm collection/composite handling |
| Asset naming/directory contradiction or non-garment filename | 24 | Review before classification; keep UNKNOWN if unresolved |
| Mobile/UI screenshot preview | 4 | Keep separate from single-item garment assets |
| Same basename across multiple paths | 234 | Resolve source/version relationship; do not infer equivalence |
| Mask-to-asset potential mapping | 48 | Verify region and role mapping visually |
| Asset-to-preview potential mapping | 24 | Verify role/view and one-to-many relationship |
| Multi-view family membership | 96 | Confirm family completeness and consistent style |

Only exceptions stop within their own batch. Successfully verified records may continue through the fast path.

## Execution Strategy

1. Extract only the current batch's originals from the known source archive.
2. Verify exact filename mapping, readability, positive dimensions, and SHA-256.
3. Review images by the deterministic processing groups above.
4. Assign review status and HIGH/MEDIUM/LOW confidence.
5. Update only qualified records and only fields authorized by the execution task.
6. Keep `asset_index.json` and the category shard synchronized.
7. Validate counts, IDs, SHA stability, source trace, duplicate boundaries, and unrelated-record stability.
8. Use one commit and push per batch.
9. Stop only exception records; do not block unrelated verified records.

### Suggested Batches

| Batch | Scope | Count |
| --- | --- | ---: |
| Mask | OUTFIT_MASK | 48 |
| Asset Accent | STAGE_OUTFIT_ASSET / Accent signal | 32 |
| Asset Footwear | STAGE_OUTFIT_ASSET / Footwear signal | 24 |
| Asset Full Body | STAGE_OUTFIT_ASSET / Full-body signal | 44 |
| Asset Lower | STAGE_OUTFIT_ASSET / Lower signal | 24 |
| Asset Upper | STAGE_OUTFIT_ASSET / Upper signal | 24 |
| Asset Unknown | STAGE_OUTFIT_ASSET / Exception-first | 24 |
| Preview | STAGE_OUTFIT_PREVIEW | 28 |
| Palette | COLOR_PALETTE | 6 |
| **Total** | — | **254** |

Suggested Batch Count: **9**.

No batch exceeds 50 records.

## Plan Boundary

This plan does not modify metadata, Catalog JSON, Manifest CSV, images, Schema, source code, dependencies, database state, or Storage. It does not authorize installation, build, test, deployment, commit, or push.
