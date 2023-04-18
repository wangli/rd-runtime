/**
 * app基础布局与组件渲染数据
 */
import { computed, reactive } from 'vue'
import { nanoid } from 'nanoid'
import { defineAppSetup, defineAppInfo } from './dataDefine'
import { jsonData, getUrlParam, getScale } from './dataUtils'
import ElementData from './ElementData'

class AppData {
   // 应用配置
   AppSetup = defineAppSetup()
   // 应用
   app = null
   // vue实例
   vapp = null
   // 应用信息
   info = defineAppInfo()
   // 缩放信息
   scale = reactive({ value: 1, h: 1, w: 1 })
   // 样式缩放
   transform = computed(() => {
      if (this.AppSetup.scale) {
         if (this.info.scaleMode == 'auto') {
            if (this.scale.w > scale.h) {
               let mvx = this.size.width * (this.scale.w - this.scale.h) / 2 / this.scale.value;
               return "scale(" + this.scale.value + ")  translateX(" + mvx + "px)"
            } else {
               let mvy = this.size.height * (this.scale.h - this.scale.w) / 2 / this.scale.value;
               return "scale(" + this.scale.value + ")  translateY(" + mvy + "px)"
            }
         } else if (this.info.scaleMode == 'fill') {
            return "scale(" + this.scale.w + "," + scale.h + ")"
         } else {
            return ''
         }
      } else {
         return ''
      }
   })
   // 原始数据
   iData = {}
   // 管理对选
   mData = null

   constructor(app, option) {
      this.app = app
      Object.assign(this.AppSetup, option)
   }
   init(_data) {
      if (this.app.vapp) {
         this.vapp = this.app.vapp
         if (this.vapp.dom) {
            this.AppSetup.dom = this.vapp.dom
         }
      }
      if (_data && _data.id) {
         this.splitData(_data)

         this.initModules()
         // this.initActions()
         // this.initRemote()
         // this.initGlobalData()
         // this.initPlugins()
      } else {
         this.info.id = 'A_' + nanoid(10)
      }

      Object.assign(this.scale, getScale(this.AppSetup, this.size))

      // 窗口变化数据处理
      window.addEventListener('resize', (evt) => {
         Object.assign(this.scale, getScale(this.AppSetup, this.size))
      })

   }
   // 拆分数据
   splitData(_data) {
      this.iData = {}
      let data = _data ? jsonData(_data) : {}
      let keys = ['modules', 'actions', 'globalData', 'remote', 'plugins']
      keys.forEach(key => {
         if (data[key]) {
            this.iData[key] = data[key]
            delete data[key]
         }
      })
      this.iData.info = data
   }
   initData() {
      if (this.iData) {
         Object.assign(this.info, this.iData.info)
      }
   }
   // 模块数据
   initModules() {
      if (this.iData) {
         this.mData = new ElementData(this.app, this.iData.modules)
      }
   }
   // 动作数据
   initActions() {
      if (this.iData) {
         let actionsData = []
      }
   }
   // 远程接口数据
   initRemote() {
      // 填充远程接口数据
      if (this.iData.remote && Array.isArray(this.iData.remote)) {
         this.data.remote.forEach(element => {
            remote.add(element)
         })
      }
   }
   // 全局数据
   initGlobalData() {
      if (this.iData.globalData) {
         globalData.addGData({
            id: 'GD_query',
            name: 'url参数',
            type: 'temp',
            value: { data: getUrlParam() }
         })
         this.iData.globalData.forEach(element => {
            globalData.addGData(element)
         })
      }
   }
   //插件数据
   initPlugins() {
      if (Array.isArray(this.iData.plugins)) {
         this.iData.plugins.forEach(element => {
            plugin.addPlugin(element)
         })
      }
   }
   // 设置vue实例
   setApp(app) {
      if (app) {
         this.vapp = app
         if (app.dom) {
            this.AppSetup.dom = app.dom
         }
      }
   }
   // 重置数据
   resetData() {
      this.size.width = this.AppSetup.width
      this.size.height = this.AppSetup.height
      for (const key in this.background) {
         if (Object.hasOwnProperty.call(background, key)) {
            delete this.background[key]
         }
      }
      this.background.backgroundColor = this.AppSetup.backgroundColor
      this.scale.mode = this.AppSetup.scaleMode
      Object.assign(this.network, {
         host: '',
         method: 'GET',
         headers: {}
      })
      Object.assign(this.info, {
         title: "",
         id: 'A_' + nanoid(10),
         creattime: null,
         uptime: null,
         cover: null,
         description: ''
      })
   }
   // 返回数据
   getData() {
      return {
         info: this.info,
         size: this.size,
         scale: this.scale,
         transform: this.transform,
         background: this.background,
         network: this.network
      }
   }
}

export default AppData