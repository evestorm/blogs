---
date: 2023-01-14
---

# 快速搭建VitePress博客并上线GitHubPages

## 介绍

VitePress 是一个基于 Vue.js 的静态网站生成器，它能够帮助你方便快速地构建文档或博客等静态网站。网站还提供了响应式主题，可以支持 PC 和移动设备，并自带搜索和导航栏等实用功能。

使用 VitePress 搭建网站非常简单，只需要你熟悉 Markdown 语法，编辑好文档、页面等，就能够通过命令行在本地预览和构建网站，最后再将构建好的静态文件上传至托管服务器即可发布上线。又因为 VitePress 基于 Vue.js 构建，所以还具有组件化和灵活的插件机制，方便开发者进行二次开发。

## 安装

### 环境准备

- Node.js 版本 16+
- 安装 `pnpm`: `npm install -g pnpm`

### 新建项目

#### 创建并进入一个目录

```shell
mkdir blogs && cd blogs
```

#### 初始化

```shell
pnpm init
pnpm add -D vitepress
pnpm exec vitepress init
```

#### 运行

```shell
pnpm run docs:dev
```

## 配置

### 首页配置

```yaml
---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Lance's blog"
  text: "Front-end developer and iOS developer"
  tagline: 佛系敲码，认真干饭
  actions:
    - theme: brand
      text: 面试指南
      link: "https://github.com/evestorm/front-end-interview"
    - theme: alt
      text: 我的GitHub
      link: "https://github.com/evestorm/"

features:
  - icon: ⚡
    title: 前端
    details: JavaScript, Vue, React, Vite, Webpack, SwiftUI
  - icon: 🛡
    title: 后端
    details: NodeJS, Python3, Java, Go, MySQL
  - icon: 🌈
    title: 动效
    details: CSS3, SVG, Canvas, D3
---

```

### 导航栏和侧边栏设置

配置见本博客仓库 `main` 分支的 `docs/.vitepress/config.ts` 中，导航栏和侧边栏的目录结构见 `docs/` 。`config.ts` 中的配置项基本都有注释，直接提取即可。

### Logo 配置

Logo 放进 `docs/public`, 浏览器 icon 和博客左上角 Logo 配置如下：

```ts
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blogs/',
  ...
  // head 标签内容追加
  head: [
    ['link', { rel: 'icon', href: '/blogs/kitten.jpg' }] // [!code focus]
  ],
  themeConfig: {
    logo: '/kitten.jpg', // 站点左侧logo // [!code focus]
  }
  ...
}
```

### 本站搜索

`themeConfig` 中配置如下：

```js
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local', // 本地搜索 // [!code focus]
    },
  }
})
```

### 自定义容器

```md
::: tip
这是个提示
:::

::: warning
这是个警告
:::

::: danger
这是个危险
:::
```

这样写的效果对应为：

::: tip
这是个提示
:::

::: warning
这是个警告
:::

::: danger
这是个危险
:::

#### 自定义提示

```md
::: tip 提示标题
这是个提示
:::
```

::: tip 提示标题
这是个提示
:::

### 代码块中的行高亮显示

````
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

除了单行之外，还可以指定多个单行、范围或同时指定:

- 行范围: 例如 `{5-8}，{3-10}，{10-17}`
- 多个单行: 例如 `{4,7,9}`
- 行范围和单行: 例如 `{4,7-13,16,23-27,40}`

````
```js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```
````

```js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

### 开启代码行号

```js{3}
export default defineConfig({
  markdown: {
    lineNumbers: true
  }
})
```

### 模板语法

#### 插值

每一个 Markdown 文件将首先被编译成 HTML，接着作为一个 Vue 组件传入 vue-loader，这意味着你可以在文本中使用 Vue 风格的插值：

```vue
{{ 1 + 1 }}
```

输出：

{{ 2 }}

#### 指令

同样地，也可以使用指令:

```html
<ul>
  <li v-for="i in 3" :key="i">{{ i }}</li>
</ul>
```

输出：

<ul>
  <li v-for="i in 3" :key="i">{{ i }}</li>
</ul>

### `<script> & <style>` 以及使用组件

```vue
<script setup>
import HelloWorld from '/components/HelloWorld.vue';

import { useData } from 'vitepress';
const { page } = useData();
</script>

<pre class="pre-theme">
访问网站以及页面的数据：
{{ page }}
</pre>

<hello-world />

<style>
.pre-theme {
  background-color: yellow;
  color: black;
}
</style>
```

输出：

<script setup>
import HelloWorld from '/components/HelloWorld.vue';

import { useData } from 'vitepress';
const { page } = useData();
</script>

<pre class="pre-theme">
访问网站以及页面的数据：
{{ page }}
</pre>

<hello-world />

<style>
.pre-theme {
  background-color: yellow;
  color: black;
}
</style>

## 部署到 GitHub Pages

创建 GitHub 仓库。我的项目名为 `blogs`

把 `deploy.sh`（见本项目根目录下 `deploy.sh`） 文件里的 GitHub 地址换成自己的。

在 `packge.json` 文件里加入这行代码:

```json
{
  ...
  "scripts": {
    "deploy": "bash deploy.sh", // [!code focus]
    "test": "echo \"Error: no test specified\" && exit 1",
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  ...
}
```

最后在终端下的项目根目录下键入以下命令进行项目打包与上传GitHub Pages:

```shell
node deploy.sh
```

## 资源

- [VitePress](https://vitepress.dev/)
- [vitepress搭建文档库、博客](http://www.520wsl.com/course/blog/vitepress/vitepress%E6%90%AD%E5%BB%BA%E6%96%87%E6%A1%A3%E5%BA%93%E3%80%81%E5%8D%9A%E5%AE%A2.html)
- [VitePress 学习(全面拥抱vite)---翻译](https://juejin.cn/post/6965510644007665671)

完结。
