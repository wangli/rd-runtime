import pageLifecycle from 'page-lifecycle'
import Controller from './controller'
import Command from './command'
import TypeModel from './data/TypeModel'
import * as Helper from './helper'
import * as Utils from './utils'
import { EVENTS as events } from './events'
import { setProps } from './runtime'
import AppRuntime from './AppRuntime'

import './css.css'
export const utils = Utils


// 控制
export const controller = Controller
// 命令
export const cmd = Command
// 相关类型定义
export const typeModel = TypeModel
// 事件
export const EVENTS = events
// 操作辅助
export const helper = Helper
// 创建应用
export const createApp = function (config, { components, actions, slots }) {
   // 应用控制表现
   let appConfig = {
      width: config.width,
      height: config.height,
      backgroundColor: config.backgroundColor,
      scaleMode: config.scaleMode,
      dom: config.dom,
      interaction: config.interaction,
      clickCursor: config.clickCursor,
      scale: config.scale
   }
   // 过滤未定义对象
   let keys = Object.keys(appConfig)
   keys.forEach(key => {
      if (typeof appConfig[key] == 'undefined') {
         delete appConfig[key]
      }
   })
   let app = new AppRuntime({ options: appConfig })
   // 附加组件
   app.use(components)
   // 附加动作
   app.use(actions)
   // 创建
   app.create({ slots })
   // 初始化数据
   app.initData(_data)

   return app
}
// 页面生命周期
pageLifecycle.addEventListener('statechange', function (event) {
   Command.emit(EVENTS.PAGE_STATE, { state: event.newState, oldState: event.oldState })
})

const runtime = setProps({
})
if (typeof __APP_VERSION__ != 'undefined') {
   console.log('%c' + __APP_VERSION__, 'color:#0aa100')
}
if (!('RD' in window)) {
   window['RD'] = runtime
}