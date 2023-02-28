import { isReactive, ref, watch } from 'vue'
import isPlainObject from 'lodash/isPlainObject'
import getValue from 'lodash/get'
import Data from '@/data'
import { getSpritesData, addSpriteData, getModuleList, getGroups, getModuleComponents, group } from '@/data/SprData'
import GData from '@/data/GlobalData'
import * as remote from '../remote'
import { jsonData as JD, extractData as ED } from '@/utils'

export * from './event';
export * from './action';

export const jsonData = JD
export const extractData = ED


let filterDatas = {}
let unwatch = []


export const clear = function () {
   unwatch.forEach(stop => {
      stop()
   })
   unwatch = []
   for (const key in filterDatas) {
      filterDatas[key] = null
   }
   filterDatas = {}
}

/**
 * 根据全局数据对象或远程数据对象放回绑定的数据源
 * @param {*} value 
 * @returns 
 */
export const getDataSource = function (value) {
   if (typeof value != 'string') return value

   if (/^RD_\S{10}$/.test(value) && remote.remotes[value]) {
      return remote.remotes[value].data
   } else {
      let gdid = value
      let path = null

      if (/.\?+./.test(value)) {
         let arr = value.split('?')
         gdid = arr[0]
         path = arr[1]
      }
      if (/(^GD_\S{10})|(^GD_query)$/.test(gdid) && GData[gdid]) {
         if (GData[gdid].type == 'remote') {
            let _remote = remote.getRemote(GData[gdid].value)
            if (_remote) {
               if (path) {
                  if (!filterDatas[value]) {
                     filterDatas[value] = ref(null)
                     unwatch.push(watch(_remote.data, newData => {
                        filterDatas[value].value = getValue(newData.data || newData, path)
                     }, { immediate: true }))
                  }
                  return filterDatas[value]
               } else {
                  return _remote.data
               }
            } else {
               return null
            }
         } else {
            if (path) {
               return getValue(GData[gdid].value, path)
            } else {
               return GData[gdid].value
            }
         }
      }
   }
   return null
}
/**
 * 转换接口传参转换（数组转请求body值）
 * @param {Array} data 
 * @returns 
 */
export const getBodyData = function (data) {
   let _o = {}
   if (data && Array.isArray(data)) {
      data.forEach(element => {
         if (isPlainObject(element)) {
            if (typeof element.value == 'string' && element.key) {
               let _val = getDataSource(element.value)
               if (_val) {
                  if (isReactive(_val)) {
                     _o[element.key] = element.path ? getValue(_val.data, element.path) : _val.data
                  } else {
                     _o[element.key] = element.path ? getValue(_val, element.path) : _val
                  }
               } else {
                  _o[element.key] = element.value
               }
            } else if (element.key) {
               _o[element.key] = element.value
            }
         }
      });
   }
   return _o
}

/**
 * 调整元件层级
 * @param {string}} spid 
 * @param {string} level 
 */
export const setZindex = function (spid, level = 'up') {
   // 所有舞台元件
   const elements = Data.elements
   // 获取元件的数据对象
   const sprite = Data.getElement(spid)
   if (!sprite) {
      console.warn('元件不存在' + spid)
      return
   } else if (!sprite.mid) {
      console.warn('页面上找不到' + spid)
      return
   }
   // 获取所有元件的zIndex排序
   let sprs = getModuleComponents(sprite.mid).map(item => {
      return {
         id: item.id,
         zIndex: item.zIndex
      }
   }).sort((a, b) => {
      return b.zIndex - a.zIndex
   })
   if (level == 'up') {
      // 层级向上
      let index = sprs.findIndex(n => n.id == spid)
      if (index > 0) {
         let upId = sprs[index - 1].id
         let upzIndex = elements[upId].zIndex
         elements[upId].zIndex = elements[spid].zIndex
         elements[spid].zIndex = upzIndex

      }
   } else if (level == 'down') {
      // 层级向下
      let index = sprs.findIndex(n => n.id == spid)
      if (index < sprs.length - 1 && index > -1) {
         let upId = sprs[index + 1].id
         let upzIndex = elements[upId].zIndex
         elements[upId].zIndex = elements[spid].zIndex
         elements[spid].zIndex = upzIndex

      }
   } else if (level == 'top') {
      // 层级置顶
      let index = sprs.findIndex(n => n.id == spid)
      if (index > 0) {
         elements[spid].zIndex = sprs[0].zIndex
         for (let i = 0; i < index; i++) {
            elements[sprs[i].id].zIndex--
         }
      }
   } else if (level == 'bottom') {
      // 层级最底
      let index = sprs.findIndex(n => n.id == spid)
      if (index < sprs.length - 1 && index > -1) {
         elements[spid].zIndex = sprs[sprs.length - 1].zIndex
         for (let i = index + 1, lg = sprs.length; i < lg; i++) {
            elements[sprs[i].id].zIndex++
         }
      }
   }
}
/**
 * 复制组件
 */
export const copy = function (sid, option, gpid = null) {
   // 所有舞台元件
   const spritesData = getSpritesData()
   const groupsData = getGroups()
   if (spritesData[sid]) {
      let sprData = jsonData(spritesData[sid])
      sprData.title += "_c"
      delete sprData.id
      delete sprData.zIndex
      Object.assign(sprData, option)
      return addSpriteData(sprData, sprData.mid, gpid)
   } else if (groupsData[sid]) {
      let element = jsonData(groupsData[sid])
      element.title += "_c"
      delete element.id
      delete element.zIndex
      Object.assign(element, option)
      // 组合处理
      let groupComponents = []
      if (element.components) {
         groupComponents = element.components
         delete element.components
      }
      let newGroup = group.newGroupData(element, element.mid)
      groupComponents.forEach(sprite => {
         copy(sprite.id, { gpid: newGroup.id }, newGroup.id)
      })
      return newGroup
   }
}

/**
 * 切换模块
 * @param {*} id 需要显示的模块id
 * @param {*} ids 跳过不处理的id数组
 */
export const changeModuleShow = function (id, ids) {
   getModuleList().forEach(element => {
      if (ids) {
         if (typeof ids == 'string') {
            if (element.id == ids) return
         } else if (ids instanceof Array) {
            if (ids.find(myid => myid == element.id)) return
         }
      }
      if (element.type != 'fixed') {
         if (element.id == id) {
            element.visible = true
         } else {
            element.visible = false
         }
      }
   });
}