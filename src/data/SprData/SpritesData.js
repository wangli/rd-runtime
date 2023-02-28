import { reactive, watch } from 'vue'
import comp from '@/component'
import { getMaxZIndex } from '@/utils/sprite'
import { sprites, simpleSprites, delSprite, setSprite, setModule, setGroup, unwatchs } from './msData'
import { addElement as moduleAddElement, delElement as moduleDelElement } from './ModulesData'
import { addElement as groupAddElement } from './GroupData'

// 删除单个元件
const delOneSprite = function (id, source = true) {
   if (sprites[id] && sprites[id]['mid']) {
      let res = moduleDelElement(id, sprites[id]['mid'])
      if (source) {
         // 删除源头
         delSprite(id)
      }
      if (res && unwatchs[id] && typeof unwatchs[id] == 'function') {
         unwatchs[id]()
      }
      return res ? true : false
   } else {
      console.warn('删除模块内元件失败')
   }
   return false
}

// 清空组件内数据
const clearSpriteData = function (sprite) {
   let keys = Object.keys(sprite)
   keys.forEach(key => {
      delete sprite[key]
   });
}

const appendSprite = function (newData) {
   if (!newData) {
      console.warn('添加元件失败,无数据信息')
      return false
   }
   if (!newData.mid) {
      console.warn('添加元件失败,无模块id' + mid)
      return false
   }
   if (!newData.zIndex) {
      // 设置在舞台的深度
      newData.zIndex = getMaxZIndex(newData.mid) + 1
   }
   // 创建一个简单的元件副本
   let simpleSprite = createSimpleSprite(newData)
   if (newData.gpid && setGroup(newData.gpid)) {
      // 添加到组合中
      groupAddElement(simpleSprite, newData.gpid)
   } else if (setModule(newData.mid)) {
      // 添加到模块中
      moduleAddElement(simpleSprite, newData.mid)
   } else {
      console.warn('添加元件失败', simpleSprite)
      return false
   }
   unwatchs[newData.id] = watch(newData, attsVary => {
      if (simpleSprites[attsVary.id]) {
         let keys = Object.keys(simpleSprites[attsVary.id])
         keys.forEach(key => {
            simpleSprites[attsVary.id][key] = attsVary[key]
         })
      }
   })
   return sprites[newData.id]
}
/**
 * 创建一个元件的基本数据副本，主要用于添加到模块，组合等容器中，各容器通过基本信息数据在取真正的元件数据
 * @param {object} data 
 * @param {object} value 
 * @returns 
 */
export const createSimpleSprite = function (data, value = {}) {
   let o = Object.assign({
      id: data.id,
      gpid: data.gpid,
      mid: data.mid,
      visible: data.visible,
      name: data.name,
      title: data.title,
      type: data.type,
      zIndex: data.zIndex
   }, value)
   simpleSprites[o.id] = o
   return simpleSprites[o.id]
}
/**
 * 添加一个元件（或新建一个元件）
 * @param {*} data 
 * @param {*} mid 
 * @param {*} gpid 
 * @returns 
 */
export const addSpriteData = function (data, mid = 'default', gpid = null) {
   // 建立一个新的元件数据对象（响应式的）
   let newData = null
   if (typeof data == 'string' && typeof mid == 'object') {
      newData = setSprite(data, mid)
   } else if (typeof data == 'object') {
      newData = setSprite(data, { mid, gpid })
   }
   if (appendSprite(newData)) {
      return sprites[newData.id]
   } else {
      throw '添加元件失败'
   }
}

// 删除元件
export const delSpriteData = function (ids, source = true) {
   if (ids) {
      if (Array.isArray(ids)) {
         ids.forEach(_id => {
            delOneSprite(_id, source)
         })
         return true
      } else if (typeof ids == 'string') {
         return delOneSprite(ids, source)
      }
   }
   return false
}

// 返回元件数据集合（以id键名）
export const getSpritesData = function () {
   return sprites;
}

// 返回元件数据集合（数组）
export const getSpriteArrData = function (mid) {
   let _sprites = Object.values(sprites)
   return mid ? _sprites.filter(item => item.mid == mid) : _sprites
}

// 返回元件数据
export const getSpriteData = function (id) {
   if (sprites[id]) {
      Object.assign(sprites[id], Object.assign({}, comp.getComponentDefaultData(sprites[id].name), sprites[id]))
      return sprites[id]
   } else {
      return null
   }
}

// 清空所有组件数据
export const clearSpritesData = function () {
   let keys = Object.keys(sprites)
   keys.forEach(key => {
      clearSpriteData(sprites[key])
      delSprite(key)
   });
}