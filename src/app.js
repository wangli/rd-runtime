import * as vue from 'vue'
import { createApp } from 'vue'
import Stage from './display/stage'
import Display from './display'
import baseMixin from './component/baseMixin'
import { AppSetup } from './config'

if (window && typeof window.Vue == 'undefined') {
   window.Vue = vue
}
// 应用
var myapp = null
// 创建应用舞台方法
export const createMyApp = function (props = {}) {
   if (!myapp) {
      myapp = createApp(Stage, props)
      // 安装内部默认组件
      myapp.use(Display)
      // 全局混入
      myapp.mixin(baseMixin)
      // 应用状态设置
      AppSetup.status = "create"
      if (window) {
         window.myapp = myapp
      }
      console.log('%c灿create', 'color:#0aa100')
      return true
   } else {
      return false
   }
}
// 显示应用舞台
export const displayMyApp = function () {
   if (myapp) {
      let dom = AppSetup.dom
      if ((typeof dom == 'string' && document.querySelector(dom)) || dom instanceof HTMLElement) {
         myapp.mount(dom)
         AppSetup.status = "display"
         console.log('%c灿display', 'color:#0aa100')
         return true
      } else {
         console.error(dom + '错误')
         return false
      }
   } else {
      console.warn('app没有创建')
      return false
   }
}
// 销毁应用舞台方法
export const destroyMyApp = function () {
   if (myapp) {
      myapp.unmount()
      myapp = null
      // 更改状态
      AppSetup.status = "remove"
      console.log('%c灿remove', 'color:#0aa100')
   }
}
export const initSet = function (options) {
   options && Object.assign(AppSetup, options)
   return AppSetup
}
export const getMyApp = function () {
   return myapp
}
export default {
   appSetup: AppSetup,
   get vm() {
      return myapp
   }
}