import { initGroupData, createSimpleData } from './msData'
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
   newGroup(data, mid = 'default') {
      if (data && typeof data == 'object' && data.id && this.groups[data.id]) {
         console.warn("组合" + data.id + '已存在')
         return null
      }
      let group = initGroupData(Object.assign({ mid }, data))
      this.groups[group.id] = group
      this.mData.elements[group.id] = group

      if (!group.zIndex) {
         // 设置在舞台的深度
         group.zIndex = this.mData.getMaxZIndex(mid) + 1
      }
      this.mData.appendElement(createSimpleData.call(this.mData, group), group.mid)
      this.mData.watchSimples(group)

      return group
   }
   // 删除组合，是否删除内部数据源
   delGroup(val, clearSource = false) {
      if (Array.isArray(val)) {
         val.forEach(id => {
            this.delGroup(id, clearSource)
         })
         return val
      } else if (typeof val == 'string') {
         let modules = this.mData.modules
         let unwatchs = this.mData.unwatchs

         if (this.groups[val]) {
            if (clearSource) {
               let components = this.groups[val].components
               if (Array.isArray(components) && components.length > 0) {
                  this.mData.delSprite(components.map(element => element.id))
               }
            }
            modules.delElement(this.groups[val].id, this.groups[val].mid)
            delete this.groups[val]
            delete this.mData.elements[val]
            if (unwatchs[val] && typeof unwatchs[val] == 'function') {
               unwatchs[val]()
            }
            return val
         }
      }
      return false
   }
   // 项组合添加元件（元件、组合的基本属性）
   addElement(element, gpid) {
      if (gpid && element && typeof element != 'string') {
         if (this.groups[gpid] && this.groups[gpid]['components']) {
            this.groups[gpid]['components'].push(element)
            // this.esSimple[gpid]
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
   // 创建新组合并加入已有元素
   newBindGroup(ids, mid = 'default') {
      if (Array.isArray(ids)) {
         let elements = this.mData.elements
         let modules = this.mData.modules
         let sprites = this.mData.sprites
         let esSimple = this.mData.esSimple

         // 获取组合的边界
         let point = { x1: 0, y1: 0, x2: 0, y2: 0 }
         let moduleComps = modules.getMyElements(mid)
         // 需要组合的实际元件
         let spids = []
         // 无效的id
         let invalids = []
         // 处理id
         ids.forEach(val => {
            if (/^group_/.test(val)) {
               // 解绑组合元素，并追加到绑定列表
               spids.push(...this.unbindGroup(val,))
            } else {
               spids.push(val)
            }
         })
         // 尺寸位置对比
         spids.forEach((id, i) => {
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
            } else {
               invalids.push(id)
            }
         })
         if (invalids.length > 0) {
            console.warn(invalids.join(), "元件无法组合")
            return false
         }
         // 从模块中移除元素（非组合）
         sprites.delSprite(spids, false)

         // 创建组合
         let group = this.newGroup({
            x: point.x1,
            y: point.y1,
            width: point.x2 - point.x1,
            height: point.y2 - point.y1
         }, mid)
         if (group) {
            // 添加元件到组合
            spids.forEach(id => {
               if (elements[id]) {
                  elements[id].x -= point.x1
                  elements[id].y -= point.y1
                  elements[id].gpid = group.id
                  elements[id].hover = false
                  elements[id].selected = false
                  this.addElement(esSimple[id], group.id)
               }
            })
            console.log(group)
            group.selected = true
            return group
         } else {
            return false
         }
      } else {
         return false
      }
   }
   // 解绑
   unbindGroup(gpid, add = true) {
      let elements = this.mData.elements
      let modules = this.mData.modules
      let unwatchs = this.mData.unwatchs
      let esSimple = this.mData.esSimple
      let myGroup = this.groups[gpid]

      if (gpid && myGroup && myGroup.components) {
         // 删除模块子集内的组合

         if (unwatchs[gpid] && typeof unwatchs[gpid] == 'function') {
            unwatchs[gpid]()
         }
         let ids = []
         // 将组合内的元件添加到模块内
         let components = myGroup.components
         // 删除组合
         this.delGroup(gpid)
         components.forEach(element => {
            elements[element.id].x += myGroup.x
            elements[element.id].y += myGroup.y
            elements[element.id].gpid = null
            ids.push(element.id)
            add && modules.addElement(esSimple[element.id], element.mid)
         })
         return ids
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
         return this.groups[id]
      } else {
         let group = initGroupData(data)
         this.groups[group.id] = group
         this.mData.elements[group.id] = group
         return group
      }
   }

   // 返回某个组合
   getGroup(id) {
      return id ? this.groups[id] : null
   }
   // 返回当前所有组合
   getGroups() {
      return this.groups
   }
   // 返回当前所有（数组）
   getGroupList() {
      return Object.values(this.groups)
   }
   // 清空所有组件数据
   clearGroups() {
      let keys = Object.keys(this.groups)
      keys.forEach(key => {
         this.delGroup(key)
      })
   }
}