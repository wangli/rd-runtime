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
   newMouleData(data) {
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
      this.mData.elements[newData.id] = newData
      return newData
   }

   // 删除模块
   delModule(id) {
      if (this.modules[id]) {
         delete this.modules[id]
         // 删除元素库
         delete this.mData.elements[id]
         return id
      } else {
         return false
      }
   }
   // 添加元件（元件、组合的基本属性）
   addElement(element, mid = 'default') {
      if (mid && element && typeof element != 'string') {
         if (this.modules[mid] && this.modules[mid]['components']) {
            this.modules[mid]['components'].push(element)
         } else {
            console.warn('模块添加元件数据失败')
         }
      }
   }
   // 删除元件
   delElement(id, mid = 'default') {
      if (mid && id) {
         if (this.modules[mid] && this.modules[mid]['components']) {
            return removeArray(this.modules[mid]['components'], 'id', id)
         } else {
            console.warn('模块删除元件数据失败')
            return false
         }
      } else {
         console.warn('mid && id 无效')
         return false
      }
   }
   // 删除模块数据
   delModuleData(mid, clear = false) {
      if (clear && this.modules[mid]) {
         let items = this.modules[mid]['components']
         if (Array.isArray(items)) {
            let ids = items.map(item => item.id)
            ids.forEach(id => {
               // 清除所有数据
               this.mData.delElementData(id)
            })
         }
         this.delModule(mid)
      } else {
         return this.delModule(mid)
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
         // 模块中元件列表不存在，创建一个空列表
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
      return this.modules[id] || null
   }
   // 返回当前所有
   getModules() {
      return this.modules
   }
   // 返回当前所有（数组）
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
   // 返回模块中的所有元件
   getModuleComponents(mid = 'default') {
      if (this.modules[mid] && this.modules[mid]['components']) {
         return this.modules[mid]['components']
      } else {
         return []
      }
   }
   // 清空所有模块数据
   clearModulesData() {
      let keys = Object.keys(this.modules)
      keys.forEach(key => {
         this.delModule(key)
      });
   }

}
