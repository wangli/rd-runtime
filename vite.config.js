import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import wasm from "vite-plugin-wasm"
import topLevelAwait from "vite-plugin-top-level-await"
import path from 'path'
import config from './package.json'


let times = 0

function resolve(dir) {
  return path.join(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command == 'serve') {
    return {
      plugins: [topLevelAwait(), vue(), wasm()],
      resolve: {
        alias: {
          '@': resolve('src'),
          'rd-runtime': resolve('src/index.js'),
          'rd-components': resolve('libs/rd-components.js')
        }
      },
      server: {
        port: 2023
      },
    }
  }else{
    return {
      define: {
         "__APP_VERSION__": `'rd-runtime:${config.version}'`
      },
      build: {
         target: 'esnext',
         sourcemap: true,
         cssCodeSplit: true,
         lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'rd-runtime',
            formats: ['es'],
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
      plugins: [
         wasm(),
         {
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
   }
  }
})
