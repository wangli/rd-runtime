import { defineUserConfig, defaultTheme } from 'vuepress'
export default defineUserConfig({
   lang: 'zh-CN',
   title: 'letData ',
   description: '数据可视化引擎，数据可视化大屏运行环境',
   base: '/runtime/',
   theme: defaultTheme({
      navbar: [
      {
         text: '指南',
         link: '/',
      },
      {
         text: 'API参考',
         link: '/base/api.md',
      }],
      sidebar: {
         '/': [{
            isGroup: true,
            text: '指南',
            link: '/',
            children: ['/', '/guide/data.md', '/guide/init.md']
         }, {
            isGroup: true,
            text: '深入',
            children: ['/guide/more_data.md', '/guide/more_event.md', '/guide/more_action.md']
         }],
         "/base/": [{
            isGroup: true,
            text: 'api',
            children: ['/base/api.md', '/base/const.md']
         }]
      }
   }),
})