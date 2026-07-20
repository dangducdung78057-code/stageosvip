# StageOS Real Costume Asset System

## Purpose

真实服装资产体系用于记录可追溯的现实服装、配饰与舞台服装参考，并描述它们转化为 StageOS 数字资产的过程。真实商品信息是设计和采购参考，不自动等同于可直接渲染或可在产品中使用的资产。

## Asset Source

真实服装资产的来源类型定义为：

```text
REAL_PRODUCT
```

每项资产必须保留来源说明、参考图片及其适用范围。商品价格、库存和链接状态需要人工核验。

## Categories

- `Costume`：通用服装。
- `Yunjian`：云肩及肩部装饰层。
- `Hanfu`：汉服及相关传统服饰。
- `Accessory`：腰封、胸针、披帛、手持道具等配饰。
- `Hair Ornament`：头饰、发簪、冠饰及其他发部装饰。
- `Stage Costume`：为舞台表演设计或改造的专用服装。

## Asset Lifecycle

```text
REAL_PRODUCT
        ↓
DIGITAL_REFERENCE
        ↓
3D_READY
        ↓
IN_GAME_ASSET
```

- `REAL_PRODUCT`：具有现实来源的商品或实物服装。
- `DIGITAL_REFERENCE`：完成图片整理、分类、描述与使用场景标注的数字参考资料。
- `3D_READY`：具备建模、材质、授权和技术规格，可进入 3D 制作流程的资产。
- `IN_GAME_ASSET`：完成产品适配、性能验证和使用授权，可由 StageOS 正式调用的资产。

生命周期状态不得跳级推断。数字参考资料不代表已经完成 3D 制作，`3D_READY` 也不代表已经交付为产品资产。
