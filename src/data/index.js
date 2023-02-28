import * as appData from './AppData'
import * as spriteData from './SprData'
import * as actData from './actionData'
import * as globalData from './GlobalData'
import * as plugin from '../plugin'
import * as remote from '../remote'
import initData from './initData'
import getTemplateData from './getTemplateData'
import { jsonData } from '../utils'
import { clear } from '../helper'
export default {
   getData() {
      let _appData = appData.getAppData()
      let modules = jsonData(spriteData.getModuleList())
      modules.forEach(module => {
         if (module.components && Array.isArray(module.components)) {
            module.components = module.components.map(element => {
               if (element.type == 'group') {
                  let groupData = spriteData.getGroup(element.id)
                  if (groupData.components) {
                     groupData.components = groupData.components.map(sprite => {
                        let sprData = spriteData.getSpriteData(sprite.id)
                        sprData.selected = false
                        return sprData
                     })
                  }
                  groupData.selected = false
                  return groupData
               } else {
                  let sprData = spriteData.getSpriteData(element.id)
                  sprData.selected = false
                  return sprData
               }
            })
         }
      });
      let _globalData = jsonData(globalData.getGDataList())
      _globalData.forEach((element, index) => {
         if (element.type == 'temp') {
            _globalData.splice(index, 1)
         }
      });
      return jsonData({
         id: _appData.info.id,
         title: _appData.info.title,
         creattime: _appData.info.creattime,
         uptime: _appData.info.uptime,
         cover: _appData.info.cover,
         description: _appData.info.description,
         width: _appData.size.width,
         height: _appData.size.height,
         scaleMode: _appData.scale.mode,
         background: _appData.background,
         network: _appData.network,
         globalData: _globalData,
         modules,
         actions: actData.getActionList(),
         plugins: plugin.getPluginList(),
         remote: remote.getList().map(n => {
            return {
               id: n.id,
               url: n.url,
               body: n.body || "",
               method: n.method || "",
               itval: n.itval || 0,
               extractRule: n.extractRule || ""
            }
         })
      })
   },
   init: initData,
   ...appData,
   ...spriteData,
   ...actData,
   ...globalData,
   ...plugin,
   getElement(id) {
      return spriteData.getSpriteData(id) || spriteData.getGroup(id)
   },
   getElements() {
      return [...spriteData.getGroupArrData(), ...spriteData.getSpriteArrData()]
   },
   getTemplateData,
   clearDataAll() {
      // 清空数据
      spriteData.clearSprites()
      actData.clearAction()
      globalData.clearGlobal()
      remote.clearRemote()
      plugin.clearPlugin()
      appData.resetAppData()
      clear()
   }
}