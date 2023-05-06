import { reactive } from 'vue'
import { nanoid } from 'nanoid'

let moduleCunt = 1
// 组合计数
let groupCount = 1
// 元素计数
let spriteCount = 1
// 初始化一个模块数据
export const initModuleData = function (option = {}) {
   let data = {
      type: 'content',
      name: 'vx-module',
      title: '页面' + moduleCunt++,
      x: 0,
      y: 0,
      components: []
   }
   Object.assign(data, option)
   if (!data.id) {
      data.id = 'mdu_' + nanoid(10)
   }
   return data
}

// 初始化一个组合数据
export const initGroupData = function (options = {}) {
   let data = reactive({
      id: null,
      gpid: null,
      mid: null,
      name: 'vx-sprite-group',
      type: 'group',
      title: '组合' + groupCount++,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      opacity: 100,
      visible: true,
      selected: false,
      hover: false,
      padding: '',
      background: {},
      border: {},
      shadow: {},
      anim: {},
      events: [],
      components: []
   })
   Object.assign(data, options)
   if (!data.id) {
      data.id = 'group_' + nanoid(10)
   }
   return data
}


// 返回组件默认基础数据
export const initSpriteData = function (comp, name, option = {}) {
   let defaultData = comp.getDefaultData(name)
   let title = defaultData.title
   let data = reactive({
      id: null,
      gpid: null,
      mid: null,
      name: defaultData.name,
      type: defaultData.type,
      title: title ? (title + spriteCount++) : '元素 ' + spriteCount++,
      x: defaultData.x || 0,
      y: defaultData.y || 0,
      zIndex: defaultData.zIndex || 0,
      width: defaultData.width || 80,
      height: defaultData.height || 80,
      angle: defaultData.angle || 0,
      opacity: defaultData.opacity || 100,
      visible: defaultData.visible || true,
      selected: defaultData.selected || false,
      hover: defaultData.hover || false,
      padding: defaultData.padding || '',
      lock: defaultData.lock || false,
      background: defaultData.background || {},
      border: defaultData.border || {},
      shadow: defaultData.shadow || {},
      anim: defaultData.anim || {},
      options: defaultData.options || {},
      events: defaultData.events || [],
      data: defaultData.data || ''
   })
   Object.assign(data, option)
   if (!data.id) {
      data.id = 'sprite_' + nanoid(10)
   }
   return data
}
/**
 * 创建数据简单描述副本
 * @param {*} data 
 * @param {*} value 
 * @returns 
 */
export const createSimpleData = function (data, value = {}) {
   let resData = null
   if (data && typeof data == 'object' && this) {
      if (data.type == 'group') {
         resData = Object.assign({
            id: data.id,
            gpid: data.gpid,
            mid: data.mid,
            visible: data.visible,
            name: data.name,
            title: data.title,
            type: data.type,
            zIndex: data.zIndex,
            components: data.components ? data.components.map(item => item.id) : []
         }, value)
      } else {
         resData = Object.assign({
            id: data.id,
            gpid: data.gpid,
            mid: data.mid,
            visible: data.visible,
            name: data.name,
            title: data.title,
            type: data.type,
            zIndex: data.zIndex
         }, value)
      }
   }
   if (resData) {
      this.esSimple[resData.id] = resData
      return this.esSimple[resData.id]
   }
   return null
}
