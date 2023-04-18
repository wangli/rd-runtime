import { watch } from 'vue'
import { initGroupData, createSimpleGroup, createSimpleSprite } from './msData'
import { removeArray } from '@/utils'


export default class GroupData {

   // 数据管理
   mData = null
   // 编组集合
   groups = {}

   constructor(mData) {
      this.mData = mData
   }

   // 添加一个组合
   newGroupData(data, mid = 'default') {
      if (data && typeof data == 'object' && data.id && this.groups[data.id]) {
         console.warn("组合" + data.id + '已存在')
         return null
      }
      let group = initGroupData(data)
      this.groups[group.id] = group
      this.elements[group.id] = group

      if (!group.zIndex) {
         // 设置在舞台的深度
         group.zIndex = this.mData.getMaxZIndex(mid) + 1
      }
      let simpleGroup = createSimpleGroup(group)
      this.addElement(simpleGroup, group.mid)

      this.mData.unwatchs[group.id] = watch(group, attsVary => {
         if (this.mData.simpleSprites[attsVary.id]) {
            let keys = Object.keys(this.mData.simpleSprites[attsVary.id])
            keys.forEach(key => {
               this.mData.simpleSprites[attsVary.id][key] = attsVary[key]
            })
         }
      })
      return group
   }
   // 删除组合
   delGroup(id) {
      if (this.groups[id]) {
         delete this.groups[id]
         delete this.mData.elements[id]
         return id
      } else {
         return false
      }
   }
   // 项组合添加元件（元件、组合的基本属性）
   addElement(element, gpid) {
      if (gpid && element && typeof element != 'string') {
         if (this.groups[gpid] && this.groups[gpid]['components']) {
            this.groups[gpid]['components'].push(element)
         } else {
            console.warn('模块添加元件数据失败')
         }
      }
   }
   // 从组合中删除元件
   delElement(id, gpid) {
      let del = false
      if (gpid && id && this.groups[gpid] && this.groups[gpid]['components']) {
         del = removeArray(this.groups[gpid]['components'], 'id', id)
      }
      if (!del) {
         console.warn('模块删除元件数据失败')
      }
      return del
   }
   // 组合元件
   bind(ids, mid = 'default') {
      if (Array.isArray(ids)) {
         let elements = this.mData.elements
         let modules = this.mData.modules
         let sprites = this.mData.sprites

         // 获取组合的边界
         let point = { x1: 0, y1: 0, x2: 0, y2: 0 }
         let moduleComps = modules.getModuleComponents(mid)
         // 是组合的id
         let gpids = []
         // 需要组合的实际元件
         let spids = []
         // 无效的id
         let invalids = []
         ids.forEach((id, i) => {
            let element = moduleComps.find(item => item.id == id)
            let spr = element ? element.type == 'group' ? this.groups[id] : elements[id] : null
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
               this.unbind(gpid)
            })
         }
         // 从模块中删除元件
         sprites.delSpriteData(ids, false)

         // 创建组合
         let group = this.newGroupData({
            x: point.x1,
            y: point.y1,
            width: point.x2 - point.x1,
            height: point.y2 - point.y1
         }, mid)
         if (group) {
            // 添加元件到组合
            ids.forEach(id => {
               if (elements[id]) {
                  elements[id].x -= point.x1
                  elements[id].y -= point.y1
                  elements[id].gpid = group.id
                  elements[id].hover = false
                  elements[id].selected = false
                  this.addElement(createSimpleSprite(elements[id]), group.id)
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
   // 解绑
   unbind(gpid) {
      let elements = this.mData.elements
      let modules = this.mData.modules
      let unwatchs = this.mData.unwatchs

      if (gpid && this.groups[gpid] && this.groups[gpid].components) {
         // 删除模块子集内的组合

         if (modules.delElement(this.groups[gpid].id, this.groups[gpid].mid)) {

            if (unwatchs[gpid] && typeof unwatchs[gpid] == 'function') {
               unwatchs[gpid]()
            }
            // 将组合内的元件添加到模块内
            this.mData.groups[gpid].components.forEach(element => {
               elements[element.id].x += groups[gpid].x
               elements[element.id].y += groups[gpid].y
               elements[element.id].gpid = null
               modules.addElement(element, element.mid)
            })
            // 删除组合
            return this.delGroup(gpid)
         } else {
            return false
         }
      }
      return false
   }
   // 配置组合
   setGroup = function (id, data) {
      if (id) {
         // 如果模块不存在，先创建一个模块
         if (this.groups[id]) {
            Object.assign(this.groups[id], data)
         } else {
            this.groups[id] = initGroupData(Object.assign({ id }, data))
            this.mData.elements[id] = this.groups[id]
         }
         return groups[id]
      } else {
         let group = initGroupData(data)
         this.groups[group.id] = group
         this.mData.elements[group.id] = group
         return group
      }
   }

   // 返回某个组合
   getGroup(id) {
      return this.groups[id] || null
   }
   // 返回当前所有组合
   getGroups() {
      return this.groups
   }
   // 返回当前所有（数组）
   getGroupArrData() {
      return Object.values(this.groups)
   }
   // 删除编组
   delGroupData(ids) {
      if (ids) {
         if (Array.isArray(ids)) {
            ids.forEach(_id => {
               this.delGroup(_id)
            })
            return true
         } else if (typeof ids == 'string') {
            return this.delGroup(ids)
         }
      }
      return false
   }
   // 清空所有组件数据
   clearGroupsData() {
      let keys = Object.keys(groups)
      keys.forEach(key => {
         this.delGroup(key)
      })
   }
}