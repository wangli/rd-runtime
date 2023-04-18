import ModuleData from "./ModuleData"
import GroupsData from "./GroupData"
import SpritesData from "./SpritesData"
import { getMaxZIndex } from "../dataUtils"

export default class ElementData {
   AppSetup = null
   component = null
   // 模块管理
   modules = null
   // 组合管理
   groups = null
   // 元素管理
   sprites = null
   // 所有元素集合
   elements = {}
   // 元件数据集合（简单副本）
   simpleSprites = reactive({})
   // 监听对象
   unwatchs = {}
   // -------------------
   constructor(app, _data) {
      this.AppSetup = app.AppSetup
      this.component = app.component
      this.modules = new ModuleData(this)
      this.groups = new GroupsData(this)
      this.sprites = new SpritesData(this)
      if (_data) {
         this.fillData(_data)
      }
   }
   getMaxZIndex(mid) {
      return getMaxZIndex(this.modules[mid].components)
   }
   // 填充数据
   fillData(moduleList) {
      if (Array.isArray(moduleList) && moduleList.length > 0) {
         moduleList.forEach(_module => {
            // 添加模块基本信息
            if (typeof _module == 'object') {
               let moduleComponents = []
               if (_module.components) {
                  moduleComponents = _module.components
                  delete _module.components
               }
            }
            // 创建模块
            this.newMouleData(_module)
            // 添加模块内元件
            moduleComponents.forEach(element => {
               if (element.type == 'group') {
                  // 组合处理
                  let groupComponents = []
                  if (element.components) {
                     groupComponents = element.components
                     delete element.components
                  }
                  this.newGroupData(element, _module.id)
                  groupComponents.forEach(sprite => {
                     this.addSpriteData(sprite, _module.id, sprite.gpid)
                  });
               } else {
                  this.addSpriteData(element, _module.id)
               }
            })
         })
      } else {
         // 新默认模块
         this.newMouleData({ id: 'default' })
      }
   }
   // 删除元素数据
   delElementData(id) {
      let spritesData = this.sprites.sprites
      let groupsData = this.groups.groups

      if (spritesData[id]) {
         return this.sprites.delSpriteData(id)
      } else if (groupsData[id]) {
         if (Array.isArray(groupsData[id].components) && groupsData[id].components.length > 0) {
            groupsData[id].components.forEach(element => {
               this.delElementData(element.id)
            })
            if (groupsData[id].gpid) {
               this.groups.delElement(id)
            } else {
               this.modules.delElement(id, groupsData[id].mid)
            }
         }
         return this.groups.delGroupData(id)
      }
   }
   clearSprites() {
      this.sprites.clearSpritesData()
      this.groups.clearGroupsData()
      this.modules.clearModulesData()
   }
   newMouleData() {
      this.modules.newMouleData.call(this, ...arguments)
   }
   delModuleData() {
      this.modules.delModuleData.call(this, ...arguments)
   }
   getModules() {
      this.modules.getModules.call(this, ...arguments)
   }
   getModule() {
      this.modules.getModule.call(this, ...arguments)
   }
   getModuleList() {
      this.modules.getModuleList.call(this, ...arguments)
   }
   getModuleComponents() {
      this.modules.getModuleComponents.call(this, ...arguments)
   }
   clearModulesData() {
      this.modules.clearModulesData.call(this, ...arguments)
   }
   newGroupData() {
      this.groups.newGroupData.call(this, ...arguments)
   }
   getGroup() {
      this.groups.getGroup.call(this, ...arguments)
   }
   getGroups() {
      this.groups.getGroups.call(this, ...arguments)
   }
   getGroupArrData() {
      this.groups.getGroupArrData.call(this, ...arguments)
   }
   clearGroupsData() {
      this.groups.clearGroupsData.call(this, ...arguments)
   }
   addSpriteData() {
      this.sprites.addSpriteData.call(this, ...arguments)
   }
   delSpriteData() {
      this.sprites.delSpriteData.call(this, ...arguments)
   }
   getSpritesData() {
      this.sprites.getSpritesData.call(this, ...arguments)
   }
   getSpriteArrData() {
      this.sprites.getSpriteArrData.call(this, ...arguments)
   }
   getSpriteData() {
      this.sprites.getSpriteData.call(this, ...arguments)
   }
   clearSpritesData() {
      this.sprites.clearSpritesData.call(this, ...arguments)
   }
}