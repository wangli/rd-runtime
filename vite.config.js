import { defineConfig } from 'vite'
const path = require('path')
const config = require('./package.json')

let times = 0

export default defineConfig({
   define: {
      "__APP_VERSION__": `'rd-runtime:${config.version}'`
   },
   build: {
      sourcemap: true,
      cssCodeSplit: true,
      lib: {
         entry: path.resolve(__dirname, 'src/index.js'),
         name: 'rd-runtime'
      },
      rollupOptions: {
         // 请确保外部化那些你的库中不需要的依赖
         external: ['vue'],
         output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: { vue: 'Vue' }
         }
      }
   },
   plugins: [{
      buildStart() {
         console.log('开始打包')
         times = new Date().getTime()
      },
      closeBundle() {
         times = new Date().getTime() - times
         console.log('结束打包，用时:' + (times / 1000) + 's')
      }
   }],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, 'src')
      }
   },
})