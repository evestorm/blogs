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

完结。
