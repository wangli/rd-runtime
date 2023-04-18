import { reactive } from 'vue'
import { nanoid } from 'nanoid'

let moduleCunt = 1
// 组合计数
let groupCount = 1
// 元件计数
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
      title: title ? (title + spriteCount++) : '元件 ' + spriteCount++,
      x: defaultData.x || 0,
      y: defaultData.y || 0,
      width: defaultData.width || 0,
      height: defaultData.height || 0,
      data: defaultData.data || '',
      opacity: defaultData.opacity || 100,
      visible: defaultData.visible || true,
      selected: defaultData.selected || false,
      hover: defaultData.hover || false,
      background: defaultData.background,
      border: defaultData.border,
      shadow: defaultData.shadow,
      anim: defaultData.anim || {}
   })
   Object.assign(data, option)
   if (!data.id) {
      data.id = 'sprite_' + nanoid(10)
   }
   return data
}
export const createSimpleGroup = function (data, value = {}) {
   return Object.assign({
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
/**
 * 创建一个元件的基本数据副本，主要用于添加到模块，组合等容器中，各容器通过基本信息数据在取真正的元件数据
 * @param {object} data 
 * @param {object} value 
 * @returns 
 */
export const createSimpleSprite = function (data, value = {}) {
   return Object.assign({
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