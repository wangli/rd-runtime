import { reactive, watch } from 'vue'
import { sprites, simpleSprites, groups, setGroup, delGroup, unwatchs } from './msData'
import { addElement as moduleAddElement, delElement as moduleDelElement, getModuleComponents } from './ModulesData'
import { delSpriteData, createSimpleSprite } from "./SpritesData"
import { getMaxZIndex } from '@/utils/sprite'
import { removeArray } from '@/utils'

export const createSimpleGroup = function (data, value = {}) {
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
// 添加一个组合
export const newGroupData = function (data, mid = 'default') {
   if (data && typeof data == 'object' && data.id && groups[data.id]) {
      console.warn("组合" + data.id + '已存在')
      return null
   }
   let group = null
   if (data) {
      group = setGroup(data.id, Object.assign({ mid }, data))
   } else {
      group = setGroup(null, { mid })
   }
   if (!group.zIndex) {
      // 设置在舞台的深度
      group.zIndex = getMaxZIndex(mid) + 1
   }
   let simpleGroup = createSimpleGroup(group)
   moduleAddElement(simpleGroup, group.mid)

   unwatchs[group.id] = watch(group, attsVary => {
      if (simpleSprites[attsVary.id]) {
         let keys = Object.keys(simpleSprites[attsVary.id])
         keys.forEach(key => {
            simpleSprites[attsVary.id][key] = attsVary[key]
         })
      }
   })
   return group
}
// 项组合添加元件（元件、组合的基本属性）
export const addElement = function (element, gpid) {
   if (gpid && element && typeof element != 'string') {
      if (groups[gpid] && groups[gpid]['components']) {
         groups[gpid]['components'].push(element)
      } else {
         console.warn('模块添加元件数据失败')
      }
   }
}
// 从组合中删除元件
export const delElement = function (id, gpid) {
   let del = false
   if (gpid && id && groups[gpid] && groups[gpid]['components']) {
      del = removeArray(groups[gpid]['components'], 'id', id)
   }
   if (!del) {
      console.warn('模块删除元件数据失败')
   }
   return del
}
// 组合元件
export const bind = function (ids, mid = 'default') {
   if (Array.isArray(ids)) {
      // 获取组合的边界
      let point = { x1: 0, y1: 0, x2: 0, y2: 0 }
      let moduleComps = getModuleComponents(mid)
      // 是组合的id
      let gpids = []
      // 需要组合的实际元件
      let spids = []
      // 无效的id
      let invalids = []
      ids.forEach((id, i) => {
         let element = moduleComps.find(item => item.id == id)
         let spr = element ? element.type == 'group' ? groups[id] : sprites[id] : null
         if (spr) {
            if (i == 0) {
               point.x1 = spr.x
               point.y1 = spr.y
               point.x2 = spr.x + spr.width
               point.y2 = spr.y + spr.height
            } else {
               point.x1 = spr.x < point.x1 ? spr.x : point.x1
               point.y1 = spr.y < point.y1 ? spr.y : point.y1
               point.x2 = spr.x + spr.width > point.x2 ? spr.x + spr.width : point.x2
               point.y2 = spr.y + spr.height > point.y2 ? spr.y + spr.height : point.y2
            }
            if (spr.type == 'group') {
               let sps = spr.components ? spr.components.map(item => item.id) : []
               spids.push(...sps)
               gpids.push(spr.id)
            } else {
               spids.push(id)
            }
         } else {
            invalids.push(id)
         }
      })
      if (invalids.length > 0) {
         console.warn(invalids.join(), "元件无法组合")
         return false
      }
      // 将组合的解除
      if (gpids.length > 0) {
         gpids.forEach(gpid => {
            unbind(gpid)
         });
      }
      // 从模块中删除元件
      delSpriteData(ids, false)
      // 创建组合
      let group = newGroupData({
         x: point.x1,
         y: point.y1,
         width: point.x2 - point.x1,
         height: point.y2 - point.y1
      }, mid)
      if (group) {
         // 添加元件到组合
         ids.forEach(id => {
            if (sprites[id]) {
               sprites[id].x -= point.x1
               sprites[id].y -= point.y1
               sprites[id].gpid = group.id
               sprites[id].hover = false
               sprites[id].selected = false
               addElement(createSimpleSprite(sprites[id]), group.id)
            }
         })
         return group
      } else {
         return false
      }
   } else {
      return false
   }
}
export const unbind = function (gpid) {
   if (gpid && groups[gpid] && groups[gpid].components) {
      // 删除模块子集内的组合
      if (moduleDelElement(groups[gpid].id, groups[gpid].mid)) {

         if (unwatchs[gpid] && typeof unwatchs[gpid] == 'function') {
            unwatchs[gpid]()
         }

         // 将组合内的元件添加到模块内
         groups[gpid].components.forEach(element => {
            sprites[element.id].x += groups[gpid].x
            sprites[element.id].y += groups[gpid].y
            sprites[element.id].gpid = null
            moduleAddElement(element, element.mid)
         })
         // 删除组合
         return delGroup(gpid)
      } else {
         return false
      }
   }
   return false
}


// 返回某个组合
export const getGroup = function (id) {
   return groups[id] || null
}

// 返回当前所有组合
export const getGroups = function () {
   return groups
}

// 返回当前所有（数组）
export const getGroupArrData = function () {
   return Object.values(groups)
}

// 清空所有组件数据
export const clearGroupsData = function () {
   let keys = Object.keys(groups)
   keys.forEach(key => {
      delGroup(key)
   });
}