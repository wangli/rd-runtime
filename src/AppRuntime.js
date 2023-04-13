import * as vue from 'vue'
import { createApp } from 'vue'
import { nanoid } from 'nanoid'
import Data from './data'
import Stage from './display/stage'
import Display from './display'
import Component from './component'
import baseMixin from './component/baseMixin'
import Command from './command'
import * as Helper from './helper'


if (window && typeof window.Vue == 'undefined') {
   window.Vue = vue
}

const domlist = []

class AppRuntime extends EventEmitter {
   constructor(option = {}) {
      super()
      Data.resetAppData()
      this.id = option.id || nanoid(10)
      // vue应用
      this.vapp = null
      this.dom = null
      this.config = Object.assign({
         // 宽度
         width: 1920,
         // 高度
         height: 1080,
         // 背景色
         backgroundColor: "#222222",
         // 缩放模式
         scaleMode: 'auto',
         // 开启交互动作
         interaction: false,
         // 点击事件鼠标经过光标样式
         clickCursor: 'auto',
         // 是否开启整体缩放
         scale: false,
         // 当前应用状态，none未创建，create已创建，display已展示，destroy销毁
         status: 'none',
         // 所在容器
         dom: null
      }, option.options)

      if (option.props) {
         // 创建应用
         this.create(option.props)
         if (option.display) {
            // 显示到舞台
            this.display()
         }
      }
   }
   // 创建
   create(props = {}) {
      if (!this.vapp) {
         this.vapp = createApp(Stage, props)
         // 设置全局配置，可被所有组件访问
         this.vapp.config.globalProperties.appConfig = this.config
         // 安装内部默认组件
         this.vapp.use(Display)
         // 全局混入
         this.vapp.mixin(baseMixin)
         // 注册组件到应用
         Component.install()
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