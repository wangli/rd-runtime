import { modules, setModule, delModule } from './msData'
import { delElementData } from './element'
import { removeArray } from '@/utils'


// 创建一个新的模块，并添加
export const newMouleData = function (data) {
   if (data && typeof data == 'object') {
      if (data.id) {
         if (modules[data.id]) {
            console.warn("模块" + data.id + '已存在')
            return null
         } else {
            return setModule(data.id, data)
         }
      } else {
         return setModule(null, data)
      }
   } else if (typeof data == 'string') {
      if (modules[data]) {
         console.warn("模块" + data + '已存在')
         return null
      } else {
         // 如果是一个不存在的模块id，初始化模块
         return setModule(data)
      }
   } else {
      // 新建模块
      return setModule()
   }
}

// 添加元件（元件、组合的基本属性）
export const addElement = function (element, mid = 'default') {
   if (mid && element && typeof element != 'string') {
      if (modules[mid] && modules[mid]['components']) {
         modules[mid]['components'].push(element)
      } else {
         console.warn('模块添加元件数据失败')
      }
   }
}
// 删除元件
export const delElement = function (id, mid = 'default') {
   if (mid && id) {
      if (modules[mid] && modules[mid]['components']) {
         return removeArray(modules[mid]['components'], 'id', id)
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
export const delModuleData = function (mid, clear = false) {
   if (clear && modules[mid]) {
      let items = modules[mid]['components']
      if (Array.isArray(items)) {
         let ids = items.map(item => item.id)
         ids.forEach(id => {
            delElementData(id)
         })
      }
      delModule(mid)
   } else {
      return delModule(mid)
   }
}
// 返回某个模块
export const getModule = function (id) {
   return modules[id] || null
}
// 返回当前所有
export const getModules = function () {
   return modules
}

// 返回当前所有（数组）
export const getModuleList = function (filter, key = 'type') {
   if (filter) {
      let items = Object.values(modules)
      if (typeof filter == 'string') {
         return items.filter(item => item[key] == filter)
      } else if (typeof filter == 'function') {
         return items.filter(item => filter(item))
      } else {
         return items
      }
   } else {
      return Object.values(modules)
   }
}
// 返回模块中的所有元件
export const getModuleComponents = function (mid = 'default') {
   if (modules[mid] && modules[mid]['components']) {
      return modules[mid]['components']
   } else {
      return []
   }
}
// 清空所有模块数据
export const clearModulesData = function () {
   let keys = Object.keys(modules)
   keys.forEach(key => {
      delModule(key)
   });
}