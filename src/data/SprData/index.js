import * as modules from "./ModulesData"
import * as sprites from "./SpritesData"
import * as Groups from "./GroupData"
import { sprites as sps, groups as gps, delGroup } from './msData'

export { elements } from './msData'
// 新建模块
export const newMouleData = modules.newMouleData
// 删除模块
export const delModuleData = modules.delModuleData
export const getModules = modules.getModules
export const getModule = modules.getModule
export const getModuleList = modules.getModuleList
export const getModuleComponents = modules.getModuleComponents
export const clearModulesData = modules.clearModulesData
// 添加元件
export const addSpriteData = sprites.addSpriteData
// 删除元件
export const delSpriteData = sprites.delSpriteData
export const getSpritesData = sprites.getSpritesData
export const getSpriteArrData = sprites.getSpriteArrData
export const getSpriteData = sprites.getSpriteData
export const clearSpritesData = sprites.clearSpritesData
// 组合管理
export const group = Groups
export const getGroup = Groups.getGroup
export const getGroups = Groups.getGroups
export const getGroupArrData = Groups.getGroupArrData
export const clearGroupsData = Groups.clearGroupsData
// 删除元件
export const delElementData = function (id) {
   if (sps[id]) {
      return sprites.delSpriteData(id)
   } else if (gps[id]) {
      if (Array.isArray(gps[id].components) && gps[id].components.length > 0) {
         gps[id].components.forEach(element => {
            delElementData(element.id)
         })
         if (gps[id].gpid) {
            return Groups.delElement(id)
         } else {
            return modules.delElement(id, gps[id].mid)
         }
      }
   }
}
// 填充数据
export const fillData = function (data) {
   if (Array.isArray(data) && data.length > 0) {
      data.forEach(_module => {
         // 添加模块基本信息
         if (typeof _module == 'object') {
            let moduleComponents = []
            if (_module.components) {
               moduleComponents = _module.components
               delete _module.components
            }
            // 新模块
            newMouleData(_module)
            // 添加模块内元件
            moduleComponents.forEach(element => {
               if (element.type == 'group') {
                  // 组合处理
                  let groupComponents = []
                  if (element.components) {
                     groupComponents = element.components
                     delete element.components
                  }
                  group.newGroupData(element, _module.id)
                  groupComponents.forEach(sprite => {
                     addSpriteData(sprite, _module.id, sprite.gpid)
                  });
               } else {
                  addSpriteData(element, _module.id)
               }
            })
         }
      })
   } else {
      // 新默认模块
      newMouleData({ id: 'default' })
   }
}

/**
 * 清空数据
 */
export const clearSprites = function () {
   clearSpritesData()
   clearGroupsData()
   clearModulesData()
}