---
date: 2022-03-15
---

# CSS 基础汇总

## **引入 CSS 有哪几种方式**

### **导入式**

```html
<style type="text/css">
  @import "mystyle.css"; <!-- 此注意.css文件的路径 -->
</style>
```

### **外链式**

```html
<link rel="stylesheet" type="text/css" href="my.css" />
```

### **行内式**

```html
<!-- 直接在页面的标签里加 -->
<div style="border:1px red solid;">测试信息</div>
```

### **内嵌式**

```html
<!-- 在head部分加入 -->
<style type="text/css">div { margin: 0; }</style>
```

## **盒模型**

### **种类**

- 标准盒模型（W3C标准）：
  - **一个块的总宽度 = width + padding(左右) + border(左右) + margin(左右)**
- 怪异盒模型（IE标准）：
  - **一个块的总宽度 = width（包含了 padding、border 值） + margin(左右)**

**怪异盒模型触发条件**

如果 HTML 文件最顶部 doctype 缺失，则在 ie6、7、8 将会触发怪异模式(quirks);

### **通过 css 来设置盒模型**

```css
box-sizing: content-box; <!-- 标准模型 -->
box-sizing: border-box;  <!-- IE 模型 -->
box-sizing: inherit;     <!-- 从父元素来继承 box-sizing 属性的值 -->
```

### **block，inline 和 inline-block 的区别**

- 行内元素 `inline`
  - 不会独占一行；相邻的排同一行；一行排不下会换行
  - 不可设置宽高
  - `pending`、`margin` **水平方向上设置有效**，垂直方向上无效
- 行内块元素 `inline-block`
  - 和其他元素同一行（行内元素特点）
  - 可以设置宽高（块级元素特点）
  - `pending`、`margin` **设置有效**
- 块级元素 `block`
  - 独占一行
  - 可以设置宽高
  - `pending`、`margin` 设置有效

### **margin、padding**

#### **margin 和 padding 适合场景**

##### 何时应当使用 margin

- 需要在 border 外侧添加空白时。
- 空白处不需要背景（色）时。
- 上下相连的两个盒子之间的空白，需要相互抵消时。如 15px + 20px 的 margin ，将得到 20px 的空白。

##### 何时应当时用 padding

- 需要在 border 内测添加空白时。
- 空白处需要背景（色）时。
- 上下相连的两个盒子之间的空白，希望等于两者之和时。如 15px + 20px 的 padding ，将得到 35px 的空白。

### display: none、visibility: hidden 和 opacity: 0 的区别

- `display: none`           不占空间，不可点击 （回流 + 重绘）
- `visibility: hidden`  占据空间，不可点击 （重绘）
- `opacity: 0`                   占据空间，可以点击 （重建图层，性能较高）

更多：[分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/100)

### position

| **值**         | **是否脱标占有位置** | **可使用边偏移** | **描述**                                                     |
| -------------- | -------------------- | ---------------- | ------------------------------------------------------------ |
| static         | 不脱标，正常模式     | 不可以           | 自动（没有）定位（默认定位方式）                             |
| relative(自恋) | 不脱标，占有位置     | 可以             | 相对定位，相对于其原文档流的位置进行定位                     |
| absolute(拼爹) | 完全脱标，不占位置   | 可以             | 绝对定位，相对于其上一个已经定位（不为static）的父元素进行定位 |
| fixed(浏览器)  | 完全脱标，不占位置   | 可以             | 固定定位，相对于浏览器窗口进行定位（老IE不支持）             |
| inherit        |                      |                  | 规定从父元素继承 position 属性的值                           |

### 外边距合并

外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。 合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

- 当一个元素出现在另一个元素上面时，第一个元素的下外边距与第二个元素的上外边距会发生合并：

![上下外边距合并0](/assets/CSS基础/上下外边距合并0.png)

- 当一个元素包含在另一个元素中时（假设没有内边距或边框把外边距分隔开），它们的上和/或下外边距也会发生合并：

![上外边距合并](/assets/CSS基础/上外边距合并.png)

- 尽管看上去有些奇怪，但是外边距甚至可以与自身发生合并。

  - 假设有一个空元素，它有外边距，但是**没有边框或填充**。在这种情况下，上外边距与下外边距就碰到了一起，它们会发生合并：

  ![上下外边距合并](/assets/CSS基础/上下外边距合并.png)

- 如果这个外边距遇到另一个元素的外边距，它还会发生合并：

![所有外边距合并](/assets/CSS基础/所有外边距合并.png)

### ⚠️ 注意

只有普通文档流中**块框的垂直外边距才会发生外边距合并**。**行内框、浮动框或绝对定位**之间的外边距不会合并。

## 更多

更多 CSS 基础请点击[此处查看](https://willbchang.notion.site/9b71163f3dfa4f71bf588044a221c0c0)
