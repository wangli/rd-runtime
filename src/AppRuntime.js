import * as vue from 'vue'
import { createApp, shallowReactive } from 'vue'
import { nanoid } from 'nanoid'
import Data from './data'
import Stage from './display/stage'
import Display from './display'
import Component from './component'
import baseMixin from './component/baseMixin'
import Command from './command'
import * as Use from './plugin/use'
import * as Helper from './helper'


if (window && typeof window.Vue == 'undefined') {
   window.Vue = vue
}

const domlist = []

class AppRuntime extends EventEmitter {
   constructor(option = {}) {
      super()
      this.id = option.id || nanoid(10)
      // vue应用
      this.vapp = null
      this.dom = null
      this.component = new Component(this)
      this.data = new Data(this, option.options)
      this.AppSetup = this.data.AppSetup

      if (option.props) {
         // 创建应用
         this.create(option.props)
         if (option.display) {
            // 显示到舞台
            this.display()
         }
      }
   }
   initData(value) {
      this.data.init(value)
   }
   addComponent(items) {
      this.component.add(items)
   }
   use(value) {
      Use.use.call(this, value)
   }
   // 创建
   create(props = {}) {
      if (!this.vapp) {
         this.vapp = createApp(Stage, props)
         // 设置全局配置，可被所有组件访问
         this.vapp.config.globalProperties.AppSetup = this.AppSetup
         this.vapp.config.globalProperties.component = this.component
         // 安装内部默认组件
         this.vapp.use(Display)
         // 全局混入
         this.vapp.mixin(baseMixin)
         // 注册组件到应用
         this.component.install()
         // 应用状态设置
         this.config.status = "create"
         console.log('%c灿create', 'color:#0aa100')
         return true
      } else {
         return false
      }
   }
   // 显示
   display() {
      if (this.vapp) {
         if (this.config.dom instanceof HTMLElement) {
            this.dom = this.config.dom
         } else if (typeof dom == 'string') {
            this.dom = document.querySelector(dom)
         }
         if (this.dom) {
            if (domlist.includes(this.dom)) {
               console.error('app加载的DOM已有内容')
               return false
            }
            domlist.push(this.dom)
            this.vapp.mount(this.dom)
            this.config.status = "display"
            console.log('%c灿display', 'color:#0aa100')
            return true
         } else {
            console.error(this.config.dom + '错误')
            return false
         }
      } else {
         console.warn('app没有创建')
         return false
      }
   }
   // 删除
   remove() {
      if (this.vapp) {
         let index = domlist.findIndex(this.dom)
         if (index > -1) {
            domlist.splice(index, 1)
         }
         this.vapp.unmount()
         this.vapp = null
         // 更改状态
         this.config.status = "remove"
         console.log('%c灿remove', 'color:#0aa100')
      }
   }
   // 销毁
   destroy(clearData) {
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
      this.remove()
      // 更改状态
      this.config.status = "destroy"
      console.log('%c灿destroy', 'color:#0aa100')
   }
   initSet(options) {
      options && Object.assign(this.config, options)
      return this.config
   }
   getvapp() {
      return this.vapp
   }
}

export default AppRuntime