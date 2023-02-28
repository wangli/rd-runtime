import { reactive } from 'vue'
import { nanoid } from 'nanoid'
import comp from '@/component'

// 所有素材集合
export const elements = {}
// 模块数据集合
export const modules = reactive({})
// 组合数据集合
export const groups = {}
// 元件数据集合
export const sprites = {}
// 元件数据集合（简单副本）
export const simpleSprites = reactive({})
// 监听对象
export const unwatchs = {}

// 模块计数
let moduleCunt = 1
// 组合计数
let groupCount = 1
// 元件计数
let spriteCount = 1

// 返回组件默认基础数据
export const initCompData = function (name, option = {}) {
   let defaultData = comp.getComponentDefaultData(name)
   let title = defaultData.title
   let data = {
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
   }
   Object.assign(data, option)
   if (!data.id) {
      data.id = 'sprite_' + nanoid(10)
   }
   return data
}
export const setSprite = function (data, option) {
   let newData = reactive({})
   if (typeof data == 'string' && comp.items[data]) {
      // 创建一个基础的原件对象 
      Object.assign(newData, initCompData(data, option))
      sprites[newData.id] = newData
      elements[newData.id] = newData
      return newData
   } else if (typeof data == 'object') {
      // 根据初始化数据创建原件对象
      if (data.id && sprites[data.id]) {
         if (option) {
            Object.assign(sprites[data.id], option)
         } else {
            console.warn("元件" + data.id + '已存在')
         }
         return sprites[data.id]
      } else if (data.name) {
         // 重新初始化对象
         Object.assign(newData, initCompData(data.name, data))
         sprites[newData.id] = newData
         elements[newData.id] = newData
         return sprites[newData.id]
      } else {
         // 无任何数据描述
         console.error('元件添加失败', data)
         return null
      }
   } else {
      return null
   }
}
// 删除数据对象
export const delSprite = function (id) {
   if (sprites[id]) {
      delete sprites[id]
      delete elements[id]
      return id
   } else {
      return false
   }
}
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
// 配置模块
export const setModule = function (id, data) {
   if (id) {
      // 如果模块不存在，先创建一个模块
      if (!modules[id]) {
         modules[id] = initModuleData(Object.assign({ id }, data))
         elements[id] = modules[id]
      }
      // 模块中元件列表不存在，创建一个空列表
      if (!modules[id]['components']) modules[id]['components'] = []
      return modules[id]
   } else if (data) {
      let md = initModuleData(data)
      modules[md.id] = md
      elements[md.id] = modules[md.id]
      return modules[md.id]
   } else {
      return null
   }
}
// 删除模块
export const delModule = function (id) {
   if (modules[id]) {
      delete modules[id]
      delete elements[id]
      return id
   } else {
      return false
   }
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
// 配置组合
export const setGroup = function (id, data) {
   if (id) {
      // 如果模块不存在，先创建一个模块
      if (groups[id]) {
         Object.assign(groups[id], data)
      } else {
         groups[id] = initGroupData(Object.assign({ id }, data))
         elements[id] = groups[id]
      }
      return groups[id]
   } else {
      let group = initGroupData(data)
      groups[group.id] = group
      elements[group.id] = group
      return groups[group.id]
   }
}
// 删除组合
export const delGroup = function (id) {
   if (groups[id]) {
      delete groups[id]
      delete elements[id]
      return id
   } else {
      return false
   }
}