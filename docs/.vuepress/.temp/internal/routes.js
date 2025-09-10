export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"F:/workall/GitHub/vuepress-my-docs/fish-bread.github.io/docs/.vuepress/.temp/pages/index.html.js"), meta: {} }],
  ["/posts/about.html", { loader: () => import(/* webpackChunkName: "posts_about.html" */"F:/workall/GitHub/vuepress-my-docs/fish-bread.github.io/docs/.vuepress/.temp/pages/posts/about.html.js"), meta: {"_blog":{}} }],
  ["/posts/search.html", { loader: () => import(/* webpackChunkName: "posts_search.html" */"F:/workall/GitHub/vuepress-my-docs/fish-bread.github.io/docs/.vuepress/.temp/pages/posts/search.html.js"), meta: {"_blog":{}} }],
  ["/posts/markdown/%E4%BB%8E%E9%9B%B6%E6%9E%84%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84vuepress%E4%B8%BB%E9%A2%98.html", { loader: () => import(/* webpackChunkName: "posts_markdown_从零构建自己的vuepress主题.html" */"F:/workall/GitHub/vuepress-my-docs/fish-bread.github.io/docs/.vuepress/.temp/pages/posts/markdown/从零构建自己的vuepress主题.html.js"), meta: {"_blog":{}} }],
  ["/posts/markdown/%E5%A6%82%E4%BD%95%E5%9C%A8vue3%E5%BC%95%E5%85%A5live2d.html", { loader: () => import(/* webpackChunkName: "posts_markdown_如何在vue3引入live2d.html" */"F:/workall/GitHub/vuepress-my-docs/fish-bread.github.io/docs/.vuepress/.temp/pages/posts/markdown/如何在vue3引入live2d.html.js"), meta: {"_blog":{}} }],
  ["/posts/markdown/%E7%94%A8electron-vite%E4%B8%BApython%E5%86%99gui%E9%A1%B5%E9%9D%A2.html", { loader: () => import(/* webpackChunkName: "posts_markdown_用electron-vite为python写gui页面.html" */"F:/workall/GitHub/vuepress-my-docs/fish-bread.github.io/docs/.vuepress/.temp/pages/posts/markdown/用electron-vite为python写gui页面.html.js"), meta: {"_blog":{}} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"F:/workall/GitHub/vuepress-my-docs/fish-bread.github.io/docs/.vuepress/.temp/pages/404.html.js"), meta: {} }],
]);
