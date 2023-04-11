import * as vue from 'vue'
import { createApp } from 'vue'
import { nanoid } from 'nanoid'
import Stage from './display/stage'
import Display from './display'
import baseMixin from './component/baseMixin'


if (window && typeof window.Vue == 'undefined') {
   window.Vue = vue
}

class RuntimeApp extends EventEmitter {
   constructor(option = {}) {
      super()
      this.id = option.id || nanoid(10)
      // vue应用
      this.myapp = null
      if (option.props) {
         this.create(option.props)
      }
      this.config = {
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
      }
   }
   // 创建
   create(props = {}) {
      if (!this.myapp) {
         this.myapp = createApp(Stage, props)
         // 安装内部默认组件
         this.myapp.use(Display)
         // 全局混入
         this.myapp.mixin(baseMixin)
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
      if (this.myapp) {
         let dom = this.config.dom
         if ((typeof dom == 'string' && document.querySelector(dom)) || dom instanceof HTMLElement) {
            this.myapp.mount(dom)
            this.config.status = "display"
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
   // 销毁
   destroy() {
      if (this.myapp) {
         this.myapp.unmount()
         this.myapp = null
         // 更改状态
         this.config.status = "remove"
         console.log('%c灿remove', 'color:#0aa100')
      }
   }
   initSet(options) {
      options && Object.assign(this.config, options)
      return this.config
   }
   getMyApp() {
      return this.myapp
   }
}

export default RuntimeApp