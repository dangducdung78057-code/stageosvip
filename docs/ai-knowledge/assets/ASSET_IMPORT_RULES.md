# StageOS Costume Asset Import Rules

## Image Naming Rules

参考图片使用以下命名格式：

```text
CATEGORY_ID_NUMBER
```

- `CATEGORY`：大写资产分类标识。
- `ID`：同一分类内的三位稳定序号。
- `NUMBER`：同一资产的图片序号；仅有一张图片时可以省略。

示例：

```text
YUNJIAN_001
YUNJIAN_001_02
ACCESSORY_001
ACCESSORY_001_02
```

文件扩展名不属于资产 ID。重命名图片时不得通过修改资产 ID 表达版本变化。

## Layer Classification Rules

- `Shoulder Layer`：云肩、披肩及其他覆盖肩颈区域的结构。
- `Upper Layer`：上装、外袍上部及主要躯干服装。
- `Lower Layer`：下装、裙装、裤装及外袍下部。
- `Accessory Layer`：腰封、胸针、披帛、手持道具和鞋履附件。
- `Hair Layer`：头饰、发簪、冠饰与发部装饰。
- `Pattern Layer`：纹样、刺绣、印花、贴花和可复用表面装饰。

每项资产应指定一个主要层级；需要跨层使用时，应在描述中记录辅助层级和组合限制。分类依据舞台视觉与渲染职责，不以商品平台分类直接替代。

## Catalog Location

未来资产索引文件统一存放于：

```text
docs/ai-knowledge/assets/catalog/asset_index.json
```

在正式 schema 和导入流程获批前，不创建或填充 `asset_index.json`。
