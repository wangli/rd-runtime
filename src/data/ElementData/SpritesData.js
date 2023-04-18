import { reactive, watch } from 'vue'
import { initSpriteData, createSimpleSprite } from './msData'


export default class SpritesData {

   // 数据管理
   mData = null
   // 元素集合
   sprites = {}

   constructor(mData) {
      this.mData = mData
   }
   /**
    * 添加一个元件（或新建一个元件）
    * @param {*} data 
    * @param {*} mid 
    * @param {*} gpid 
    * @returns 
    */
   addSpriteData(data, mid = 'default', gpid = null) {
      // 建立一个新的元件数据对象（响应式的）
      let newData = null
      if (typeof data == 'string' && typeof mid == 'object') {
         newData = this.setSprite(data, mid)
      } else if (typeof data == 'object') {
         newData = this.setSprite(data, { mid, gpid })
      }
      if (this.appendSprite(newData)) {
         return this.sprites[newData.id]
      } else {
         throw '添加元件失败'
      }
   }
   setSprite(data, option) {
      let comp = this.mData.component
      let elements = this.mData.elements
      let sprites = this.sprites

      let newData = reactive({})
      if (typeof data == 'string' && comp.items[data]) {
         // 创建一个基础的原件对象 
         Object.assign(newData, initSpriteData(data, option))
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
            Object.assign(newData, initSpriteData(comp.iComponents, data.name, data), option)
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
   appendSprite(newData) {
      let unwatchs = this.mData.unwatchs
      let modules = this.mData.modules
      let groups = this.mData.groups
      let simpleSprites = this.mData.simpleSprites

      if (!newData) {
         console.warn('添加元件失败,无数据信息')
         return false
      }
      if (!newData.mid) {
         console.warn('添加元件失败,无模块id' + mid)
         return false
      }
      if (!newData.zIndex) {
         // 设置在舞台的深度
         newData.zIndex = this.mData.getMaxZIndex(newData.mid) + 1
      }
      // 创建一个简单的元件副本
      let simpleSprite = createSimpleSprite(newData)
      if (newData.gpid && groups.setGroup(newData.gpid)) {
         // 添加到组合中
         groups.addElement(simpleSprite, newData.gpid)
      } else if (modules.setModule(newData.mid)) {
         // 添加到模块中
         modules.addElement(simpleSprite, newData.mid)
      } else {
         console.warn('添加元件失败', simpleSprite)
         return false
      }
      unwatchs[newData.id] = watch(newData, attsVary => {
         if (simpleSprites[attsVary.id]) {
            let keys = Object.keys(simpleSprites[attsVary.id])
            keys.forEach(key => {
               simpleSprites[attsVary.id][key] = attsVary[key]
            })
         }
      })
      return this.sprites[newData.id]
   }
   // 删除单个元件
   delOneSprite(id, source = true) {
      let modules = this.mData.modules
      let unwatchs = this.mData.unwatchs

      if (this.sprites[id] && this.sprites[id]['mid']) {
         let res = modules.delElement(id, this.sprites[id]['mid'])
         if (source) {
            // 删除源头
            this.delSprite(id)
         }
         if (res && unwatchs[id] && typeof unwatchs[id] == 'function') {
            unwatchs[id]()
         }
         return res ? true : false
      } else {
         console.warn('删除模块内元件失败')
      }
      return false
   }

   // 删除元件
   delSpriteData(ids, source = true) {
      if (ids) {
         if (Array.isArray(ids)) {
            ids.forEach(_id => {
               this.delOneSprite(_id, source)
            })
            return true
         } else if (typeof ids == 'string') {
            return this.delOneSprite(ids, source)
         }
      }
      return false
   }

   // 删除数据对象
   delSprite(id) {
      if (this.sprites[id]) {
         delete this.sprites[id]
         delete this.mData.elements[id]
         return id
      } else {
         return false
      }
   }
   // 返回元件数据集合（以id键名）
   getSpritesData() {
      return this.sprites;
   }

   // 返回元件数据集合（数组）
   getSpriteArrData(mid) {
      let _sprites = Object.values(this.sprites)
      return mid ? _sprites.filter(item => item.mid == mid) : _sprites
   }
   // 返回元件数据
   getSpriteData(id) {
      if (this.sprites[id]) {
         let defData = this.mData.component.getComponentDefaultData(this.sprites[id].name)
         Object.assign(this.sprites[id], Object.assign({}, defData, this.sprites[id]))
         return this.sprites[id]
      } else {
         return null
      }
   }
   // 清空所有组件数据
   clearSpritesData() {
      let keys = Object.keys(this.sprites)
      keys.forEach(key => {
         this.clearSpriteData(this.sprites[key])
         this.delSprite(key)
      });
   }
   // 清空组件内数据
   clearSpriteData(sprite) {
      let keys = Object.keys(sprite)
      keys.forEach(key => {
         delete sprite[key]
      })
   }
}


