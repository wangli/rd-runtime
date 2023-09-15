/**
 * app基础布局与组件渲染数据
 */
import { reactive } from 'vue'
import { jsonData, getScale, getParentSize } from '@/utils'
import { defineAppSetup, defineAppInfo } from './defineData'
import { EVENTS } from '@/events'
import cmd from '@/command'
import getData from './getData'
import ElementData from './ElementData'
import ActionData from './ActionData'
import GlobalData from './GlobalData'
import EventData from './EventData'
import RemoteData from './RemoteData'
import PluginData from './PluginData'
import * as ABind from './aBind'

class AppData {
   // 应用配置
   AppSetup = defineAppSetup()
   // 应用
   app = null
   // vue实例
   vapp = null
   // 应用信息
   info = defineAppInfo()
   // 原始数据
   iData = {}
   // 管理舞台元素数据
   mData = null
   // 管理动作事件数据
   aData = null
   // app事件管理
   eData = null
   // 管理全局数据
   gData = null
   // 管理接口数据
   rData = null
   // 插件管理
   pData = null
   // 监听对象
   unwatch = []
   // 过滤器
   filterDatas = {}

   constructor(app, option) {
      this.app = app
      Object.assign(this.AppSetup, option)
      // 缩放信息
      this.scale = reactive({ value: 1, h: 1, w: 1 })
      // 样式缩放
      this.transform = ABind.getTransform.call(this)
      // 模块数据
      this.mData = new ElementData(this)
      // 动作数据
      this.aData = new ActionData(this)
      // app事件数据
      this.eData = new EventData(this)
      // 远程数据
      this.rData = new RemoteData(this)
      // 全局数据
      this.gData = new GlobalData(this)
      // 插件数据
      this.pData = new PluginData(this)
   }
   init(_data) {
      if (this.app.vapp) {
         this.vapp = this.app.vapp
         if (this.vapp.dom) {
            this.AppSetup.dom = this.vapp.dom
         }
      }
      this.splitData(_data)
      this.initData()
      this.resetScale()
      // 窗口变化数据处理
      window.addEventListener('resize', () => this.resetScale())

   }
   // 缩放比例更新
   resetScale() {
      let size = { width: this.info.width, height: this.info.height }
      Object.assign(this.scale, getScale(this.AppSetup.dom, size))
   }
   // 拆分数据
   splitData(_data) {
      this.iData = {}
      let data = _data ? jsonData(_data) : {}
      let keys = ['modules', 'actions', 'globalData', 'remote', 'plugins', 'events']
      keys.forEach(key => {
         if (data[key]) {
            this.iData[key] = data[key]
            delete data[key]
         } else {
            this.iData[key] = []
         }
      })
      this.iData.info = data
   }
   initData() {
      if (this.iData) {
         // 应用基本信息
         this.initAppInfo(this.iData.info)
         // 模块数据
         this.mData.fillData(this.iData.modules)
         // 动作数据
         this.aData.fillData(this.iData.actions)
         // 事件数据
         this.eData.fillData(this.iData.events)
         // 远程数据
         this.rData.fillData(this.iData.remote)
         // 全局数据
         this.gData.fillData(this.iData.globalData)
         // 插件数据
         this.pData.fillData(this.iData.plugins)
         // 数据加载完成
         cmd.emit(EVENTS.DATA_LOADED, this)
         // 请求远端数据
         this.rData.requestData(true)
      }
      return this
   }
   initAppInfo(info) {
      Object.assign(this.info, info)
      if (this.AppSetup.dom.parentNode && this.info.parentSize) {
         let { ratio } = getParentSize(this.dom)
         this.info.height = this.info.width * ratio
      }
   }
   requestRemote() {
      // 请求远端数据
      this.rData.requestData(true)
   }
   // 返回元素
   getElement(id) {
      if (this.mData) {
         return this.mData.getElement(id)
      }
   }
   // 模块列表
   getModuleList() {
      return this.mData.getModuleList(...arguments)
   }
   // 元素列表
   getElementList() {
      return this.mData.getElements(...arguments)
   }
   // 动作列表
   getActionList() {
      return this.aData.getActionList(...arguments)
   }
   // 数据列表
   getGDataList() {
      return this.gData.getGDataList(...arguments)
   }
   // 接口列表
   getRemoteList() {
      return this.rData.getRemoteList(...arguments)
   }
   // 返回数据
   getAppData() {
      return {
         info: this.info,
         scale: this.scale,
         transform: this.transform
      }
   }
   // 返回所有数据
   getData() {
      return getData(this)
   }
   // 数据源处理
   getDataSource() {
      return ABind.getDataSource.call(this, ...arguments)
   }
   // 清除所有数据
   clearDataAll() {
      this.mData.clearData()
      this.aData.clearData()
      this.gData.clearData()
      this.rData.clearData()
      this.pData.clearData()
      this.eData.clearData()
      ABind.clearUnwatch.call(this)
   }
}


export default AppData