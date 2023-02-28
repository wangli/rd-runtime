import isPlainObject from 'lodash/isPlainObject'
import App from './app'
import { initSet, getMyApp, destroyMyApp, createMyApp, displayMyApp } from './app'
import { AppSetup } from './config'
import Data from './data'
import Component from './component'
import ComponentMixin from './component/baseMixin'
import Controller from './controller'
import Command from './command'
import TypeModel from './data/TypeModel'
import { EVENTS as events } from './events'
import * as Helper from './helper'
import * as Remote from './remote'
import * as Utils from './utils'
import loadjs from './utils/loadjs'
import pageLifecycle from 'page-lifecycle'

import './css.css'
export const utils = Utils
//数据
export const rdata = Data
// 组件
export const component = Component
// 组件混入
export const componentMixin = ComponentMixin
// 控制
export const controller = Controller
// 命令
export const cmd = Command
// 相关类型定义
export const typeModel = TypeModel
// 事件
export const EVENTS = events;
// 操作辅助
export const helper = Helper;
// 远程接口数据
export const remote = Remote

export const app = App
export const appInfo = AppSetup

// 创建舞台
export const createStage = function (options, props) {
   if (AppSetup.status == 'none' || AppSetup.status == 'remove' || AppSetup.status == 'destroy') {
      initSet(options)
      Data.resetAppData()
      // 创建应用
      if (createMyApp(props)) {
         // 注册组件到应用
         component.install()
         if (isPlainObject(options)) {
            // 显示到舞台
            displayStage(options)
         }
         return true
      } else {
         console.warn('应用已存在，不可重复创建')
         return false
      }
   } else {
      console.warn('应用创建失败')
      return false
   }
}
// 显示内容到舞台
export const displayStage = function (options) {
   let appSetup = initSet({})
   if (!getMyApp()) {
      if (createMyApp()) {
         component.reload()
      }
   }
   if (appSetup.status != 'display') {
      if (typeof options == 'string') {
         appSetup = initSet({ dom: options })
      } else if (isPlainObject(options)) {
         appSetup = initSet(options)
      }
      // 显示舞台
      displayMyApp()
   } else {
      console.warn('舞台已显示')
   }
}
// 删除舞台
export const removeStage = function () {
   // 卸载舞台应用
   destroyMyApp()
}
// 销毁舞台
export const destroyStage = function (clearData = true) {
   if (clearData) {
      // 清除数据
      Data.clearDataAll()
      // 清除动作插件（外置）
      Controller.removeAll()
   }
   // 清除组件
   Component.removeAll()
   // 清除动作事件
   Command.clear()
   // 助手临时数据
   Helper.clear()
   // 卸载舞台应用
   destroyMyApp()
   // 更改状态
   AppSetup.status = "destroy"
   console.log('%c灿destroy', 'color:#0aa100')
}
// 插件安装
export const use = function (install) {
   if (install instanceof Function) {
      install(runtime)
   } else if (install && typeof install == 'object' && install.install && install.install instanceof Function) {
      install.install(runtime)
   }
}
// 异步插件安装
export const useAsync = function ({ url, name }) {
   return new Promise((resolve, reject) => {
      loadjs(url, function () {
         if (typeof name == 'string') {
            use(window[name])
         } else if (Array.isArray(name)) {
            name.forEach(element => {
               use(window[element])
            })
         }
         resolve()
      })
   })
}
// 创建应用
export const createApp = function (config) {
   let _components = config.components || []
   let _actions = config.actions || []
   let _data = config.data || null
   let _slots = config.slots || null
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
   // 附加组件
   component.add(_components)
   // 附加动作
   use(_actions)
   // 创建场景
   let ok = createStage(appConfig, { slots: _slots })
   // 初始化数据
   rdata.init(_data)

   return ok
}
// 页面生命周期
pageLifecycle.addEventListener('statechange', function (event) {
   Command.emit(EVENTS.PAGE_STATE, { state: event.newState, oldState: event.oldState })
});
const runtime = {
   utils,
   rdata,
   component,
   componentMixin,
   controller,
   cmd,
   typeModel,
   EVENTS,
   helper,
   remote,
   app,
   appInfo,
   use,
   useAsync,
   createApp,
   displayStage,
   createStage,
   destroyStage
}
if (typeof __APP_VERSION__ != 'undefined') {
   console.log('%c' + __APP_VERSION__, 'color:#0aa100')
}
if (!('RD' in window)) {
   window['RD'] = runtime
}
// export default runtime