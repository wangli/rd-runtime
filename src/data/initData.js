import * as appData from './AppData'
import * as spriteData from './ElementData'
import * as actData from './actionData'
import * as globalData from './GlobalData'
import * as remote from '../remote'
import * as plugin from '../plugin'
import { jsonData, getUrlParam } from '../utils'
import cmd from '../command'
import { EVENTS } from '../events'

export default function (_data) {
   let data = _data ? jsonData(_data) : {}
   // 清空数据
   spriteData.clearSprites()
   actData.clearAction()
   globalData.clearGlobal()
   remote.clearRemote()
   plugin.clearPlugin()
   // 配置模块与动作
   let modulesData = []
   let actionsData = []
   if (data.modules) {
      modulesData = data.modules
      delete data.modules
   }
   if (data.actions) {
      actionsData = data.actions
      delete data.actions
   }
   // 填充远程接口数据
   if (data.remote && data.remote instanceof Array) {
      data.remote.forEach(element => {
         remote.add(element)
      });
      delete data.remote
   }
   // 填充全局数据
   if (data.globalData) {
      globalData.addGData({
         id: 'GD_query',
         name: 'url参数',
         type: 'temp',
         value: { data: getUrlParam() }
      })
      data.globalData.forEach(element => {
         globalData.addGData(element)
      })
      delete data.globalData
   }
   // 填充插件数据
   if (Array.isArray(data.plugins)) {
      data.plugins.forEach(element => {
         plugin.addPlugin(element)
      })
      delete data.plugins
   }
   // app基础配置
   appData.initAppData(data)
   // 填充模块数据
   spriteData.fillData(modulesData)
   // 添加动作数据
   actionsData.forEach(element => {
      actData.setActionData(element)
   });
   cmd.emit(EVENTS.DATA_LOADED, true)
   // 请求远端数据
   remote.requestData(true)
}