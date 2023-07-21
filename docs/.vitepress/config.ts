import { defineConfig } from 'vitepress';
import path from 'path';
import { autoGetSidebarOptionBySrcDir } from './sidebar';

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
  lastUpdated: true,
  markdown: {
    lineNumbers: true, // 开启行号
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/kitten.jpg', // 站点左侧logo
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端',
        activeMatch: '^/frontend/',
        items: [
          { text: 'HTML', link: '/frontend/html/HTML基础汇总' },
          { text: 'CSS', link: '/frontend/css/CSS基础汇总' },
          { text: 'JavaScript', link: '/frontend/js/JavaScript基础汇总' },
          { text: '性能优化', link: '/frontend/performance/大屏性能优化' },
        ]
      },
      {
        text: '教程',
        activeMatch: '^/other/',
        items: [
          { text: '博客搭建', link: '/other/教程/快速搭建VitePress博客并上线GitHubPages' }
        ]
      }
    ],

    // 左侧侧边栏
    sidebar: {
      "/frontend/html/": autoGetSidebarOptionBySrcDir(
        path.resolve(__dirname, "../frontend/html/"),
        "HTML"
      ),
      "/frontend/css/": autoGetSidebarOptionBySrcDir(
        path.resolve(__dirname, "../frontend/css/"),
        "CSS"
      ),
      "/frontend/js/": autoGetSidebarOptionBySrcDir(
        path.resolve(__dirname, "../frontend/js/"),
        "JavaScript"
      ),
      "/frontend/performance/": autoGetSidebarOptionBySrcDir(
        path.resolve(__dirname, "../frontend/performance/"),
        "性能优化"
      ),
      "other/教程/": autoGetSidebarOptionBySrcDir(
        path.resolve(__dirname, "../other/教程/"),
        "教程"
      )
    },

    // 右侧文章大纲
    outline: [1, 6],

    // 搜索
    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/evestorm' }
    ],

    lastUpdatedText: '上次更新',
    outlineTitle: '本页目录',

    // 上一个和下一个链接上方显示的文本
    docFooter: {
      prev: '⬅️',
      next: '➡️'
    }
  },
  // 当设置为 true 时，VitePress 不会因死链接而导致构建失败。
  ignoreDeadLinks: true
})
