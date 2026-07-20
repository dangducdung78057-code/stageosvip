# StageOS 人物与 Outfit 系统

## 人物系统

人物以匿名演员 ID 为主键，只使用性别、身高、角色、分组、队形坐标和外观数据。系统不得依赖学生真实姓名或真实面部。

免费版使用黑点与编号。会员 2.5D 使用 PixiJS 程序化人物；3D 使用男、女 GLB 人台。2.5D 与 3D 应通过同一匿名演员 ID 和统一 Appearance 数据衔接。

## Outfit 数据模型

每个演员的 Appearance 至少包含：

```ts
type Appearance = {
  performerId: string;
  outfitId: string;
  upperColor: string;
  lowerColor: string;
  footwearColor: string;
  accentColor: string;
};
```

Outfit Manifest 负责描述适用节目、性别、标签以及程序化、Sprite、GLB 渲染能力。缺失资产必须标记为 `planned`，不得填写虚假可用地址。

## 上装

- 对应 `upperColor`。
- 2.5D 程序化人物直接换色。
- 3D 映射到 GLB 的 `top` 材质槽。

## 下装

- 对应 `lowerColor`。
- 2.5D 根据人物造型应用到裤装或裙装主体。
- 3D 映射到 GLB 的 `bottom` 材质槽。

## 鞋履

- 对应 `footwearColor`。
- 2.5D 已支持鞋履区域换色。
- 当前 GLB Manifest 尚无独立鞋履材质槽，因此 3D 鞋履渲染仍为待完成边界。

## 点缀色

- 对应 `accentColor`。
- 用于领口、腰封、裙摆、饰边或视觉识别层。
- 3D 映射到 GLB 的 `accent` 材质槽。

## 云肩等扩展层

云肩、披帛、腰封、头饰、胸针和节目专属配饰应作为可组合扩展层，不应写死在基础 Outfit 中。建议扩展字段：

```ts
type OutfitLayer = {
  id: string;
  kind: "yunjian" | "shawl" | "belt" | "headwear" | "brooch" | "custom";
  assetId: string;
  color?: string;
  visible: boolean;
  renderOrder: number;
};
```

扩展层需要分别声明 2.5D Sprite 素材、遮罩、锚点和 3D 模型或骨骼挂点状态。

