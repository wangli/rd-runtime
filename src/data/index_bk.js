import AppData from './AppData'
import * as spriteData from './ElementData'
import * as actData from './actionData'
import * as globalData from './GlobalData'
import * as plugin from '../plugin'
import * as remote from '../remote'
import * as secrecy from '../secrecy'
import * as helper from '../helper'
import initData from './initData'
import getData from './getData'
import getTemplateData from './getTemplateData'
import { useAsyncLoad } from '../plugin/use'
import { nanoid } from 'nanoid'
export const o = {
   getData(blob = false) {
      if (blob == false) {
         return getData()
      } else {
         let data = getData()
         return secrecy.encrypt(data)
      }
   },
   // init: initData,
   async init(data) {
      let res = await secrecy.decrypt(data)
      if (res && Array.isArray(res.plugins)) {
         await useAsyncLoad(res.plugins)
      }
      initData(res)
      return res
   },
   encrypt: secrecy.encrypt,
   decrypt: secrecy.decrypt,

   ...spriteData,
   ...actData,
   ...globalData,
   ...plugin,
   async copyData(value, option) {
      let data = null
      if (value) {
         data = await secrecy.decrypt(value)
      } else {
         data = getData()
      }
      data.id = 'A_' + nanoid(10)
      if (option) {
         Object.assign(data, option)
      }
      return data
   },
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
      helper.clear()
   }
}

export default function (app, data) {
   return new AppData(app, data)
}