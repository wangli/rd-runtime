import * as Modules from "./ModulesData"
import * as Sprites from "./SpritesData"
import * as Groups from "./GroupData"
import * as Element from './element'
export { elements } from './msData'
// 新建模块
export const newMouleData = Modules.newMouleData
// 删除模块
export const delModuleData = Modules.delModuleData
export const getModules = Modules.getModules
export const getModule = Modules.getModule
export const getModuleList = Modules.getModuleList
export const getModuleComponents = Modules.getModuleComponents
export const clearModulesData = Modules.clearModulesData
// 添加元件
export const addSpriteData = Sprites.addSpriteData
// 删除元件
export const delSpriteData = Sprites.delSpriteData
export const getSpritesData = Sprites.getSpritesData
export const getSpriteArrData = Sprites.getSpriteArrData
export const getSpriteData = Sprites.getSpriteData
export const clearSpritesData = Sprites.clearSpritesData
// 组合管理
export const group = Groups
export const getGroup = Groups.getGroup
export const getGroups = Groups.getGroups
export const getGroupArrData = Groups.getGroupArrData
export const clearGroupsData = Groups.clearGroupsData
// 删除元件
export const delElementData = Element.delElementData
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