import { blogPlugin } from '@vuepress/plugin-blog'
import { path } from '@vuepress/utils' // 添加路径工具
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { sitemapPlugin } from '@vuepress/plugin-sitemap'
import { seoPlugin } from '@vuepress/plugin-seo'
import { usePagesPlugin } from 'vuepress-plugin-use-pages'
import { cachePlugin } from '@vuepress/plugin-cache'
//按需引入
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
    ['meta', { name: 'baidu-site-verification', content: 'codeva-Ez9OaEuBsd' }], //百度认证
    ['meta', { name: 'sogou_site_verification', content: 'XiPFYo8kWi' }], //搜狗认值
    ['meta', { name: '360-site-verification', content: '46e0d7b8bc77089feb677875441e5b2a' }] //360认值
    //全局注入脚本
  ],
  // 2. 主题配置会传递给自定义主题
  themeConfig: {
    // 你的自定义配置
    logo: '/images/logo/original2.png', // 建议使用相对路径
    navbar: [// 首页链接（自动指向 README.md）目前没用
        {text: '首页',link: '/'},
        {text: '搜索', link: '/search'},
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
      isSearchable: (page) => {
        const excludedPaths = [
          '/', '/posts/search.html'
        ]
        return !excludedPaths.includes(page.path)
      },
      maxSuggestions: 10,
    }),
      //复制代码块
    copyCodePlugin({
      selector:'.content-markdown div[class*="language-"] pre ',
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
        light: "everforest-light",
        dark: 'everforest-dark'
      }
    }),
      //站点地图
    sitemapPlugin({
      // 选项
      hostname: 'https://fishbread.net/'
    }),
      //seo强化
    seoPlugin({
      // 选项
      hostname: 'https://fishbread.net/'
    }),
      //获取页面信息
      usePagesPlugin({
          startsWith: '/posts/markdown/',  // 只匹配以/posts/开头的路径
          file: 'posts.js'        // 可选：指定生成的文件名
      }),
      //缓存
      cachePlugin({
          //缓存方式
          type: "filesystem"
      }),
  ],
  bundler: viteBundler(),
  //修改代码块
})
