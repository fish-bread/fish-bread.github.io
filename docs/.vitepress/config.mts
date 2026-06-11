import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', { rel: 'icon',  type: 'image/png', href: '/userHead.png' }]
  ],
  title: "FishBreadDocsBlog",
  description: "fishbread的个人博客",
  sitemap: {
    hostname: 'https://fishbread.net'
  }
})
