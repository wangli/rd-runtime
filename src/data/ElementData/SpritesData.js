import { watch } from 'vue'
import { initSpriteData, createSimpleData } from './msData'


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
   addSprite(data, mid = 'default', gpid = null) {
      // 建立一个新的元件数据对象（响应式的）
      let newData = null
      if (typeof data == 'string' && typeof mid == 'object') {
         newData = this.setSprite(data, mid)
      } else if (typeof data == 'object') {
         newData = this.setSprite(data, { mid, gpid })
      }
      if (this.appendSprite(newData)) {
         return newData
      }
      return null
   }
   setSprite(data, option) {
      let comp = this.mData.component
      let elements = this.mData.elements
      let sprites = this.sprites

      if (typeof data == 'string' && comp.iComponents[data]) {
         // 创建一个基础的原件对象
         let newData = initSpriteData(comp, data, option)
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
            let newData = initSpriteData(comp, data.name, Object.assign({}, data, option))
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
      let modules = this.mData.modules
      let groups = this.mData.groups

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
      let simpleSprite = createSimpleData.call(this.mData, newData)
      if (newData.gpid && groups.setGroup(newData.gpid)) {
         // 添加到组合中
         groups.addElement(simpleSprite, newData.gpid)
      } else if (modules.setModule(newData.mid)) {
         // 添加到模块中
         modules.addElement(simpleSprite, newData.mid)
      } else {
         console.warn('添加元件失败，无法加入组或模块', simpleSprite)
         return false
      }
      this.mData.watchSimples(newData)
      return newData
   }
   // 删除单个元件
   delOneSprite(id, source = true) {
      let elements = this.mData.elements
      let modules = this.mData.modules
      let groups = this.mData.groups
      let unwatchs = this.mData.unwatchs
      let sprites = this.sprites

      if (sprites[id]) {
         let res = null
         if (sprites[id]['gid']) {
            res = groups.delElement(id, sprites[id]['gid'])
         } else if (sprites[id]['mid']) {
            res = modules.delElement(id, sprites[id]['mid'])
         }
         if (source) {
            // 删除源头
            delete sprites[id]
            delete elements[id]
            if (res && unwatchs[id] && typeof unwatchs[id] == 'function') {
               unwatchs[id]()
            }
         }
         return res ? true : false
      } else {
         console.warn('删除模块内元件失败')
      }
      return false
   }

   // 删除元件
   delSprite(ids, source = true) {
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

   // 返回元件数据集合（以id键名）
   getSprites() {
      return this.sprites;
   }

   // 返回元件数据集合（数组）
   getSpriteList(mid) {
      let _sprites = Object.values(this.sprites)
      return mid ? _sprites.filter(item => item.mid == mid) : _sprites
   }
   // 返回元件数据
   getSprite(id) {
      if (id && this.sprites[id]) {
         let defData = this.mData.component.getDefaultData(this.sprites[id].name)
         Object.assign(this.sprites[id], Object.assign({}, defData, this.sprites[id]))
         return this.sprites[id]
      } else {
         return null
      }
   }
   // 清空所有组件数据
   clearSprites() {
      let keys = Object.keys(this.sprites)
      keys.forEach(key => {
         this.clearSpriteData(this.sprites[key])
         this.delSprite(key)
      });
   }
   // 清空组件内部数据
   clearSpriteData(sprite) {
      let keys = Object.keys(sprite)
      keys.forEach(key => {
         delete sprite[key]
      })
   }
}


