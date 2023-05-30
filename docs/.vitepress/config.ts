import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blogs/',
  title: "Lance's blog",
  description: "Front-end developer and iOS developer",
  lang: 'zh-CN',
  // head 标签内容追加
  head: [
    ['link', { rel: 'icon', href: '../images/kitten.jpg' }]
  ],
  // 使用 git commit 获取时间戳。此选项允许默认主题显示页面的上次更新时间；通过 themeConfig.lastUpdatedText 选项自定义文本
  lastUpdated: true,
  markdown: {
    lineNumbers: true, // 开启行号
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '../images/kitten.jpg', // 站点左侧logo
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端',
        activeMatch: '^/frontend/',
        items: [
          { text: 'HTML', link: '/frontend/html/基础/元素' },
          { text: 'CSS', link: '/frontend/css/基础/CSS引入方式' },
          // { text: 'JavaScript', link: '/frontend/js/JavaScript基础知识' },
        ]
      },
      // { text: 'Examples', activeMatch: '^/other/', link: '/markdown-examples' }
    ],

    sidebar: {
      "/frontend/html/": [
        {
          text: 'HTML',
          items: [
            {
              text: '基础',
              items: [
                {
                  text: '元素',
                  link: '/frontend/html/基础/元素'
                },
                {
                  text: '表格Table',
                  link: '/frontend/html/基础/表格Table'
                }
              ]
            },
          ]
        }
      ],
      "/frontend/css/": [
        {
          text: 'CSS',
          items: [
            {
              text: '基础',
              items: [
                {
                  text: 'CSS引入方式',
                  link: '/frontend/css/基础/CSS引入方式'
                },
                {
                  text: '盒模型',
                  link: '/frontend/css/基础/盒模型'
                }
              ]
            },
          ]
        }
      ]
    },

    // sidebar: [
    //   {
    //     text: 'HTML',
    //     items: [
    //       {
    //         text: '基础',
    //         items: [
    //           {
    //             text: '元素',
    //             link: '/frontend/html/基础/元素'
    //           }
    //         ]
    //       },
    //     ]
    //   },
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/evestorm' }
    ],

    lastUpdatedText: '上次更新',
    outlineTitle: '目录',

    // 上一个和下一个链接上方显示的文本
    docFooter: {
      prev: '⬅️',
      next: '➡️'
    }
  },
  // 当设置为 true 时，VitePress 不会因死链接而导致构建失败。
  ignoreDeadLinks: true
})
