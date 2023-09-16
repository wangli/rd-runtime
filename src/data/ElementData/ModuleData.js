import { reactive } from 'vue'
import { initModuleData } from './msData'
import { removeArray } from '@/utils'

export default class ModuleData {
   // 数据管理
   mData = null
   // 模块集合
   modules = reactive({})

   constructor(mData) {
      this.mData = mData
   }
   // 创建一个新的模块，并添加
   newMoule(data) {
      if (data && typeof data == 'object') {
         if (data.id && this.modules[data.id]) {
            console.warn("模块" + data.id + '已存在')
            return null
         }
      } else if (typeof data == 'string' && this.modules[data]) {
         console.warn("模块" + data + '已存在')
         return null
      }
      let newData = initModuleData(data)
      if (!Array.isArray(newData.components)) newData.components = []
      this.modules[newData.id] = newData
      // 加入元素库
      this.mData.elements[newData.id] = this.modules[newData.id]
      return newData
   }
   // 添加元素（元素、组合的基本属性）
   addElement(element, mid = 'default') {
      if (mid && element && typeof element != 'string') {
         if (this.modules[mid] && this.modules[mid]['components']) {
            this.modules[mid]['components'].push(element)
         } else {
            console.warn('模块添加元素数据失败')
         }
      }
   }
   // 删除元素（只是在模块内删除，并为删除数据源）
   delElement(id, mid = 'default') {
      if (mid && id) {
         if (this.modules[mid] && this.modules[mid]['components']) {
            return removeArray(this.modules[mid]['components'], 'id', id)
         } else {
            console.warn('模块删除元素数据失败')
            return false
         }
      } else {
         console.warn('mid && id 无效')
         return false
      }
   }
   /**
    * 删除模块数据
    * @param {*} mid 模块id
    * @param {*} clear 是否清除所有模块内数据
    * @returns 
    */
   delModule(mid, clear = false) {
      if (clear && this.modules[mid]) {
         let items = this.modules[mid]['components']
         if (Array.isArray(items)) {
            let ids = items.map(item => item.id)
            ids.forEach(id => {
               // 清除所有数据
               this.mData.delElement(id, true)
            })
         }
         delete this.modules[mid]
         delete this.mData.elements[mid]
         return mid
      } else if (this.modules[mid]) {
         delete this.modules[mid]
         delete this.mData.elements[mid]
         return mid
      } else {
         return null
      }
   }

   // 配置模块
   setModule = function (id, data) {
      let elements = this.mData.elements

      if (id) {
         // 如果模块不存在，先创建一个模块
         if (!this.modules[id]) {
            this.modules[id] = initModuleData(Object.assign({ id }, data))
            elements[id] = modules[id]
         }
         // 模块中元素列表不存在，创建一个空列表
         if (!this.modules[id]['components']) modules[id]['components'] = []
         return this.modules[id]
      } else if (data) {
         let md = initModuleData(data)
         this.modules[md.id] = md
         elements[md.id] = this.modules[md.id]
         return this.modules[md.id]
      } else {
         return null
      }
   }

   // 返回某个模块
   getModule(id) {
      return id ? this.modules[id] : null
   }
   // 返回当前所有
   getModules() {
      return this.modules
   }
   /**
    * 返回当前所有（数组）
    * @param {string|function} filter 过滤键值，或自定义过滤方法
    * @param {string} key 过滤键名
    * @returns 
    */
   getModuleList(filter, key = 'type') {
      if (filter) {
         let items = Object.values(this.modules)
         if (typeof filter == 'string') {
            return items.filter(item => item[key] == filter)
         } else if (typeof filter == 'function') {
            return items.filter(item => filter(item))
         } else {
            return items
         }
      } else {
         return Object.values(this.modules)
      }
   }
   /**
    * 返回模块中的所有元素
    * @param {*} mid 模块id
    * @param {*} source 是否是原始数据
    * @returns 
    */
   getMyElements(mid = 'default', source = false) {
      if (this.modules[mid] && this.modules[mid]['components']) {
         let components = this.modules[mid]['components']
         return source ? components.map(item => this.mData.getElement(item.id)) : components
      } else {
         return []
      }
   }
   // 清空所有模块数据
   clearModules() {
      let keys = Object.keys(this.modules)
      keys.forEach(key => {
         this.delModule(key)
      })
   }
}
