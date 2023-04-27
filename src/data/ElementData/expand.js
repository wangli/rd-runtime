import { watch } from 'vue'
import { jsonData } from '@/utils'

/**
 * 添加已有的数据模板
 * @param {string|object} value 可以是元素名称，也可是数据内容
 * @param {string|object} mid 模块id
 * @param {string} gid 组id
 * @returns 
 */
export const addElement = function (value, mid, gid) {
   if (value && typeof value == 'object') {
      let element = jsonData(value)
      let myMid = mid || element.mid
      if (element.type == 'group' && myMid) {
         // 组合处理
         let groupComponents = []
         if (element.components) {
            groupComponents = element.components
            delete element.components
         }
         let newGroup = this.newGroup(element, myMid)
         groupComponents.forEach(sprite => {
            addElement.call(this, sprite, myMid, newGroup.id)
         })
         return newGroup
      } else if (myMid) {
         return this.addSprite(element, myMid, gid)
      } else {
         console.warn('缺少页面数据')
         return false
      }
   } else if (value && typeof value == 'string') {
      return this.addSprite(value, mid, gid)
   } else {
      console.warn('添加失败')
      return false
   }
}

/**
 * 删除元素
 * @param {*} id 删除的id
 * @param {*} clear 是否清除原始数据
 */
export const delElement = function (id, clear = true) {

   let spritesData = this.sprites.sprites
   let groupsData = this.groups.groups

   if (spritesData[id]) {
      return this.sprites.delSprite(id, clear)
   } else if (groupsData[id]) {
      return this.groups.delGroup(id, clear)
   }
}
/**
 * 将元素追加到容器内
 * @param {*} element 元素内容（可以是对象，也可是是元素id）
 * @param {*} parentId 需要加入的容器id（模块或编组）
 */
export const appendElement = function (element, parentId) {
   if (this.modules.modules[parentId]) {
      return this.modules.addElement(element, parentId)
   } else if (this.groups.groups[parentId]) {
      return this.groups.addElement(element, parentId)
   }
   return null
}
/**
 * 将元素从容器内移除
 * @param {*} element 
 * @param {*} parentId 
 */
export const removeElement = function (id, parentId) {
   if (this.modules.modules[parentId]) {
      return this.modules.delElement(id, parentId)
   } else if (this.groups.groups[parentId]) {
      return this.groups.delElement(id, parentId)
   }
   return null
}

/**
 * 填充数据
 * @param {array} moduleList 
 */
export const fillData = function (moduleList) {
   if (Array.isArray(moduleList) && moduleList.length > 0) {
      moduleList.forEach(_module => {
         // 添加模块基本信息
         let moduleComponents = []
         if (typeof _module == 'object') {
            if (_module.components) {
               moduleComponents = _module.components
               delete _module.components
            }
         }
         // 创建模块
         this.newMoule(_module)
         // 添加模块内元素
         moduleComponents.forEach(element => {
            if (element.type == 'group') {
               // 组合处理
               let groupComponents = []
               if (element.components) {
                  groupComponents = element.components
                  delete element.components
               }
               this.newGroup(element, _module.id)
               groupComponents.forEach(sprite => {
                  this.addSprite(sprite, _module.id, sprite.gpid)
               });
            } else {
               this.addSprite(element, _module.id)
            }
         })
      })
   } else {
      // 新默认模块
      this.newMoule({ id: 'default' })
   }
}
/**
 * 监听数据变化时更新到副本
 * @param {*} data 
 */
export const watchSimples = function (data) {
   let unwatchs = this.unwatchs
   let esSimple = this.esSimple
   if (data) {
      unwatchs[data.id] = watch(data, attsVary => {
         if (esSimple[attsVary.id]) {
            let keys = Object.keys(esSimple[attsVary.id])
            keys.forEach(key => {
               esSimple[attsVary.id][key] = attsVary[key]
            })
         }
      })
   }
}