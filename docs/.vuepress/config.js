import { blogPlugin } from '@vuepress/plugin-blog'
import { path } from '@vuepress/utils' // 添加路径工具
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { sitemapPlugin } from '@vuepress/plugin-sitemap'
export default defineUserConfig({
  lang: 'zh-CN',
  title: 'fishbread的博客',
  description: 'fishbread的博客,一个技术菜鸟的博客',
  // 1. 指定自定义主题目录
  theme: {
    name: 'vuepress-theme-fishbread',
    path: path.resolve(__dirname, './theme'),
  }, // 指向本地主题目录
  head: [
    // 添加图标
    ['link', { rel: 'icon', href: '/images/logo/original2.png' }],
    //全局注入脚本
  ],
  // 2. 主题配置会传递给自定义主题
  themeConfig: {
    // 你的自定义配置
    logo: '/images/logo/original2.png', // 建议使用相对路径
    navbar: [
      '/',// 首页链接（自动指向 README.md）
      // 其他导航项
    ],
  },
  plugins: [
    blogPlugin({
      // Only files under posts are articles 只将 posts/目录下的 Markdown 文件识别为博客文章
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith('posts/') : false,
      //热更新
      hotReload: true,
    }),
      //搜索
    searchPlugin({
      //在不同的页面显示不同的提示字
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
      // 排除页面
      isSearchable: (page) => page.path !== '/',
    }),
      //复制代码块
    copyCodePlugin({
      selector:'.markdown-body div[class*="language-"] pre ',
      locales: {
        '/posts/Koa/koa.html': {
          copy: '复制',
          copied: '已复制!'
        },
      },
    }),
    //shiki.js
    shikiPlugin({
      //为代码添加标题
      codeBlockTitle: true,
      //主题
      themes: {
        light: "rose-pine-dawn",
        dark: 'rose-pine-moon'
      }
    }),
      //站点地图
    sitemapPlugin({
      // 选项
      hostname: 'https://fishbread.net/'
    }),
  ],
  bundler: viteBundler(),
  //修改代码块
})
