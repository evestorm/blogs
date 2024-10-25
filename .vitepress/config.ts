import { defineConfig } from 'vitepress';
import { docsAuto } from '@yicode/yidocs-auto';

const { sideBar, navBar } = docsAuto();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blogs/',
  title: "Lance's blog",
  description: "Front-end developer and iOS developer",
  lang: 'zh-CN',
  // head 标签内容追加
  head: [
    ['link', { rel: 'icon', href: '/blogs/kitten.jpg' }]
  ],
  // 使用 git commit 获取时间戳。此选项允许默认主题显示页面的上次更新时间；通过 themeConfig.lastUpdatedText 选项自定义文本
  lastUpdated: false,
  cleanUrls: true,
  markdown: {
    // theme: 'one-dark-pro',
    lineNumbers: true, // 开启行号
  },
  outDir: './.vitepress/dist',
  srcDir: './markdown',
  titleTemplate: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/kitten.jpg', // 站点左侧logo
    outline: 'deep',
    // 上一个和下一个链接上方显示的文本
    docFooter: {
        prev: '上一页',
        next: '下一页'
    },
    nav: [...navBar],
    sidebar: sideBar as any,

    // 搜索
    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/evestorm' }
    ],

    lastUpdatedText: '上次更新',
    outlineTitle: '大纲',
  },
  // 当设置为 true 时，VitePress 不会因死链接而导致构建失败。
  ignoreDeadLinks: true,
  // vite: {
  //   optimizeDeps: {},
  //   plugins: []
  // },
})
