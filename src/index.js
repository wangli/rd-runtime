import pageLifecycle from 'page-lifecycle'
import App from './app'
import Data from './data'
import Component from './component'
import ComponentMixin from './component/baseMixin'
import Controller from './controller'
import Command from './command'
import TypeModel from './data/TypeModel'
import * as Helper from './helper'
import * as Remote from './remote'
import * as Utils from './utils'
import * as Use from './plugin/use'
import * as Stage from './stage'
import { AppSetup } from './config'
import { EVENTS as events } from './events'
import { setProps } from './runtime'

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
// 应用
export const app = App
// 应用基本信息
export const appInfo = AppSetup
// 创建舞台
export const createStage = Stage.createStage
// 显示内容到舞台
export const displayStage = Stage.displayStage
// 删除舞台
export const removeStage = Stage.removeStage
// 销毁舞台
export const destroyStage = Stage.destroyStage
// 插件安装
export const use = Use.use
// 异步插件安装
export const useAsync = Use.useAsync
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
const runtime = setProps({
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
})
if (typeof __APP_VERSION__ != 'undefined') {
   console.log('%c' + __APP_VERSION__, 'color:#0aa100')
}
if (!('RD' in window)) {
   window['RD'] = runtime
}
// export default runtime