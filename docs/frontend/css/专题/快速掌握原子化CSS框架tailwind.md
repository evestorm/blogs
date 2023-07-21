---
date: 2023-05-27
---

## 简介

### 原子化 CSS

我们通常写 CSS 是这样的：

```html
<div class="container"></div>
```

```css
.container {
  font-size: 16px;
  border: 1px solid #000;
  padding: 4px;
}
```

![container](/assets/快速掌握原子化CSS框架tailwind/container.png)

而原子化 CSS 的写法是这样的：

```html
<div class="text-base p-1 border border-black border-solid"></div>
```

```css
.text-base {
    font-size: 16px;
}
.p-1 {
    padding: 4px;
}
.border {
    border-width: 1px;
}
.border-black {
    border-color: black;
}
.border-solid {
    border-style: solid;
}
```

![unocss](/assets/快速掌握原子化CSS框架tailwind/unocss.png)

定义一些细粒度的 class ，叫做原子 class ，然后在 HTML 里直接引入这些原子化的 class 。

### Tailwind.css

Tailwind 是流行的原子化 CSS 框架，它提供了一种基于类的方式来设计和布局页面。

引用官网说法:

> 本 CSS 框架本质上是一个工具集，包含了大量类似 flex、 pt-4、 text-center 以及 rotate-90 等工具类，可以组合使用并直接在 HTML 代码上实现任何 UI 设计。

## Tailwind.css 的优劣

### 优势

- 提高开发效率：通过对现有的 CSS 类进行组合，可以快速创建样式。
- 风格一致：由于遵循统一的命名规则，开发者可以轻松让整个网站的风格保持一致，使得在处理大型项目时更加容易维护。
- 可扩展性：Tailwind CSS 拥有全面而且灵活的自定义选项，开发者可以根据需要添加自己的自定义类别。

### 劣势

- 学习曲线较陡峭：需要学习和记忆大量的类名。
- HTML标记可能会变得冗长：因为需要使用多个类来达到所需的样式，因此在HTML元素上会添加多个类，增加了HTML标记的长度。
- 容易导致样式耦合：过于依赖 Class 类，可能会导致样式的耦合程度加强，难以进行灵活修改或调整。

## 使用

以 Vite + Vue3 举例 。

### 基础安装与使用

#### 创建项目

```bash
npm create vite@latest my-project -- --template vue
cd my-project
```

#### 安装 Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 配置模板路径

把这些路径添加到 `tailwind.config.js` 文件中的所有模板文件中。

> tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### 将 Tailwind 指令添加到 CSS 中

> style.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 开始构建

```bash
npm run dev
```

#### 开始在你的项目中使用 Tailwind

> App.vue

```vue
<template>
  <div class="w-32 h-32 bg-blue-500">
  </div>
</template>
```

如上语法，你将在页面看到一个正方形的蓝色盒子：

![blue-square](/assets/快速掌握原子化CSS框架tailwind/blue-square.png)

### 使用技巧

#### 语法检索技巧

Tailwind CSS 框架的核心思想是将每一种CSS样式都转换为一个类名，因此，在官方文档中按样式语法的方式进行搜索，可以快速找到所需样式的类名。例如，如果需要圆角的语法，只需在文档中搜索 Border Radius 即可。

![search-border](/assets/快速掌握原子化CSS框架tailwind/search-border.png)

#### 自定义 class 中使用 Tailwind 语法

有时候，由于页面上存在许多重复的元素，你可能需要创建自定义 class 来减少代码重复。

```html
<div class="p-2 text-gray-900 font-semibold">首页</div>
<div class="p-2 text-gray-900 font-semibold">产品展示</div>
<div class="p-2 text-gray-900 font-semibold">关于我们</div>
<div class="p-2 text-gray-900 font-semibold">加入我们</div>
```

以上的做法不仅会在开发过程中造成重复，也难以进行维护。因此，我们希望为每个元素分配一个类，使代码更加清晰易读，如下所示：

```html
<div class="menu">首页</div>
<div class="menu">产品展示</div>
<div class="menu">关于我们</div>
<div class="menu">加入我们</div>
```

现在问题是，如何使用 Tailwind CSS 的语法来为菜单定制样式呢？

Tailwind CSS 提供了 `@apply` 语法来帮助我们实现：

```scss
.menu {
  @apply p-2 text-gray-900 font-semibold;
}
```

**注意**

尽管使用 `@apply` 语法可以解决样式复用的问题，但并不推荐在早期就进行抽象，因为自定义 `class` 的做法会生成更多的样式代码，造成生成的 CSS 文件变得更大。

还有一个理由可以证明不使用自定义 class 会更好：你完全可以通过循环的语法来解决此问题：

```vue
<template>
  <div
    v-for="menu in ['首页', '产品展示', '关于我们', '加入我们']"
    :key="menu"
    class="p-2 text-gray-900 font-semibold">{{{ menu }}}</div>
</template>
```

这样未来维护时，不仅样式的修改变得更加容易，内容区也会变得更好维护。

关于样式复用的更多信息，可参考：<https://tailwindcss.com/docs/reusing-styles>

**提示**

如果进行的是组件级别的抽象，并且有需要让他人覆盖 class 的场景，则必须使用自定义 class 的方案，别无他选。（推荐组件级别的 class 复用使用 BEM 的命名规范）

#### 自定义样式中使用 Tailwind 的变量

通常情况下，使用 Tailwind 的原子类可以解决大部分问题。但是如果我们需要自定义样式代码，如何使用 Tailwind 中已经定义好的变量呢？

比如下面的代码中，希望为某个元素添加一个上边框，但是又想要使用到 Tailwind 配置中的 gray-200 颜色，该怎么办呢？

```css
div {
  border-top: 1px solid ?;
}
```

因为 Tailwind CSS 本身是一个 PostCSS 插件，所以理论上任何有关 TailwindCSS 的配置信息都可以通过 CSS 的方式拿到。

Tailwind CSS 提供了一个 theme 函数，可以拿到 `tailwind.config.js` 中配置的 `theme` 的值：

```css
div {
  border-top: 1px solid theme('colors.gray.200');
}
```

以上代码最后会被编译为：

```css
div {
  border-top: 1px solid #e5e7eb;
}
```

**注意**

Tailwind CSS 认为，所有不使用其变量的值都为魔法值。比如上方的代码，完全可以使用 1px solid #e5e7eb 来实现，但是未来如果要对颜色进行统一调整，这行代码将无法达到预期效果。

具体可参考文档：<https://tailwindcss.com/docs/functions-and-directives#theme>

#### 使用 Tailwind 配置之外的变量

有时候，你不得不使用一些超出 Tailwind 配置之外的值，当你接到一个需求：

> 在页面绘制一个宽139px，高77px，颜色为#165DFF的盒子。

你找遍了 Tailwind CSS 文档，都没找到可以直接使用的原子化 class ，这时候，你可能不得不写一些样式：

```css
div {
  width: 139px;
  height: 77px;
  background-color: #165DFF;
}
```

如果是这样，那岂不是违背了 Tailwind CSS 宣称的 **让开发人员不离开 HTML** 的目标？

针对这种情况，Tailwind 已经帮你考虑到了：

```html
<div class="w-[139px] h-[77px] bg-[#165DFF]"></div>
```

**提示**

使用这种方法有两个好处：

1. 开发人员不用离开 HTML，手感还是那个手感，效率更高
2. 同样的 class 还是只生成一份样式（10个w-[139px]最终只会生成一份样式代码），减少了打包后的样式文件大小

**注意**

尽管这种方法可以优雅地解决问题，但这种魔法值的方案并不被推荐，因为事实上，这种做法会让样式体系超出规范的范围。如果项目中充斥着这种代码，会给后期的维护造成困难。

参考文档：<https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values>

#### 全面且好用的响应式方案

在TailwindCSS中写响应式简直是福音，例如这个蓝色的盒子：

![blue-square](/assets/快速掌握原子化CSS框架tailwind/blue-square.png)

```html
<div class="w-32 h-32 bg-green-500" />
```

如果要想让其在 768px 以上的屏幕上显示为蓝色，你需要这样：

```css
@media (min-width: 768px) {
  div {
    @apply bg-blue-500;
  }
}
```

而 Tailwind CSS 只需要一行代码：

```html
<div class="w-32 h-32 bg-green-500 md:bg-blue-500" />
```

以上代码表示的含义是：默认显示绿色，在最小为 md(768px) 的屏幕下显示蓝色。

Tailwind CSS 响应式的规则为：

1. `mobile first` ，即移动端优先，你也可以理解为，什么断点都不设置就相当于断点为0
2. 断点的含义是大于等于，即 `min-width` ，而非 `max-width` 。具体可参考文档：<https://tailwindcss.com/docs/responsive-design#targeting-mobile-screens>

> 具体响应式断点可参考文档：<https://tailwindcss.com/docs/screens>

**高级用法**

你甚至可以结合任意值语法，实现各种变态的响应式需求，如：

> 让一个 `div` 在 `1300px` 以下（包含 `1300px` ）屏幕下显示绿色，以上显示蓝色。

```html
<div class="w-32 h-32 max-[1300px]:bg-green-500 bg-blue-500"></div>
```

#### 暗黑模式

使用暗黑模式前，你需要在 `tailwind.config.js` 中配置：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // more options...
}
```

然后，你只需要少量的代码，就可以使用暗黑模式了：

```html
<div class="w-32 h-32 bg-blue-500 dark:bg-green-500"></div>
```

更多使用方法可参考文档：<https://tailwindcss.com/docs/dark-mode>

#### 重写/覆盖 Tailwind 配置

如果你发现 Tailwind 默认的配置与你的团队 UI 规范不太一样，不要担心。TailwindCSS 提供了一整套功能来允许你重写或覆盖默认配置，包括每一个属性。这意味着你可以非常细致地调整和定制 Tailwind 的属性，以满足你的具体需求。

举个栗子，使用 Tailwind 的配置来实现 `Arco Design` 的字体颜色规范：

![text-color](/assets/快速掌握原子化CSS框架tailwind/text-color.png)

![tailwind-config](/assets/快速掌握原子化CSS框架tailwind/tailwind-config.png)

然后就可以使用了：

```html
<span class="text-primary">主色</span> / 
<span class="text-regular">常规色</span> / 
<span class="text-secondary">次要色</span> / 
<span class="text-disabled">禁用色</span> /
```

配置太多，就不赘述了，具体可参考：<https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js>

## 资源

- [TailwindCss 官网](https://tailwindcss.com/)
- [Tailwind 组件库（部分收费）](https://tailwindcomponents.com/)
- [Tailwind Awesome(收费)](https://www.tailwindawesome.com/)

### 文章摘录自

- [快速掌握 Tailwind：最流行的原子化 CSS 框架](https://juejin.cn/post/7231539903649398843)
- [TailwindCSS的使用，看这一篇就够了！](https://zhengxiaoping.xyz/fullstack/TailwindCSS%E4%BD%BF%E7%94%A8%E6%8A%80%E5%B7%A7.html)
