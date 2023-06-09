import pageLifecycle from 'page-lifecycle'
import Command from './command'
import DataOptions from './data/DataOptions'
import * as Utils from './utils'
import * as Secrecy from './secrecy'
import * as Remote from './remote'
import { EVENTS as events } from './events'
import App from './App'
import './css.css'

// 常用该工具
export const utils = Utils
// 加密
export const secrecy = Secrecy
// 命令
export const cmd = Command
// 相关类型定义
export const dataOptions = DataOptions
// 事件
export const EVENTS = events
// 远程接口数据
export const remote = Remote

// 创建应用
export const createVapp = function (options) {
   const { dom, scale = true, interaction = true, clickCursor = 'pointer', display, plugins, slots, data } = options
   const config = { interaction, clickCursor, scale, dom }
   const app = new App({ config: Object.assign({ dom }, config) })
   if (Array.isArray(plugins)) {
      plugins.forEach(item => {
         app.use(item)
      })
   } else if (plugins) {
      app.use(plugins)
   }
   // 创建
   app.create({ slots })
   // 初始化数据
   if (data) {
      app.initData(data).then(ok => {
         if (ok && display == true) {
            app.display()
         }
      })
   }

   return app
}

// 页面生命周期
pageLifecycle.addEventListener('statechange', function (event) {
   Command.emit(EVENTS.PAGE_STATE, { state: event.newState, oldState: event.oldState })
})

if (typeof __APP_VERSION__ != 'undefined') {
   console.log('%c' + __APP_VERSION__, 'color:#0aa100')
}