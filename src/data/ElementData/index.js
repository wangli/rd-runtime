import { reactive } from 'vue'
import ModuleData from "./ModuleData"
import GroupsData from "./GroupData"
import SpritesData from "./SpritesData"
import { fillData, addElement, delElement, appendElement, removeElement, watchSimples } from './expand'
import { getMaxZIndex } from "@/utils"

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
   // 元素数据集合（简单副本）
   esSimple = reactive({})
   // 监听对象
   unwatchs = {}
   // -------------------
   constructor(appData, _data) {
      this.AppSetup = appData.app.AppSetup
      this.component = appData.app.component
      this.modules = new ModuleData(this)
      this.groups = new GroupsData(this)
      this.sprites = new SpritesData(this)
      // 初始数据
      _data && this.fillData(_data)
   }
   // 填充数据
   fillData(data) {
      fillData.call(this, data)
   }
   // 添加元素
   addElement() {
      return addElement.call(this, ...arguments)
   }
   // 删除元素数据
   delElement() {
      return delElement.call(this, ...arguments)
   }
   // 返回单个元素
   getElement(id) {
      return this.elements[id]
   }
   // 返回所有元素（含编组）的数组列表
   getElements() {
      return [...this.groups.getGroupList(), ...this.sprites.getSpriteList()]
   }
   // 添加已有元素到容器
   appendElement() {
      return appendElement.call(this, ...arguments)
   }
   // 移除容器内的已有元素
   removeElement() {
      return removeElement.call(this, ...arguments)
   }
   // 新建模块
   newMoule() {
      return this.modules.newMoule(...arguments)
   }
   // 删除模块
   delModule() {
      return this.modules.delModule(...arguments)
   }
   // 返回模块
   getModule() {
      return this.modules.getModule(...arguments)
   }
   // 返回所有模块键值对集合
   getModules() {
      return this.modules.getModules(...arguments)
   }
   // 返回所有模块数组列表
   getModuleList() {
      return this.modules.getModuleList(...arguments)
   }
   // 返回模块内所有元素
   getMyElements() {
      return this.modules.getMyElements(...arguments)
   }
   // 清除所有模块
   clearModules() {
      return this.modules.clearModules(...arguments)
   }
   // 添加一个新的组合
   newGroup() {
      return this.groups.newGroup(...arguments)
   }
   // 返回组合对象
   getGroup() {
      return this.groups.getGroup(...arguments)
   }
   // 返回所有组合的键值对集合
   getGroups() {
      return this.groups.getGroups(...arguments)
   }
   // 返回所有组合的数组集合
   getGroupList() {
      return this.groups.getGroupList(...arguments)
   }
   // 编组(创建新组合并加入已有元素)
   bindGroup() {
      return this.groups.newBindGroup(...arguments)
   }
   // 解绑恢复
   unbindGroup() {
      return this.groups.unbindGroup(...arguments)
   }
   // 清除所有组合
   clearGroups() {
      return this.groups.clearGroups(...arguments)
   }
   // 添加元素
   addSprite() {
      return this.sprites.addSprite(...arguments)
   }
   // 删除元素
   delSprite() {
      return this.sprites.delSprite(...arguments)
   }
   // 返回单个元素
   getSprite() {
      return this.sprites.getSprite(...arguments)
   }
   // 返回所有元素键值对集合
   getSprites() {
      return this.sprites.getSprites(...arguments)
   }
   // 返回所有元素数组列表
   getSpriteList() {
      return this.sprites.getSpriteList(...arguments)
   }
   // 监听原始数据信息到副本
   watchSimples() {
      watchSimples.call(this, ...arguments)
   }
   // 清空所有元素
   clearSprites() {
      return this.sprites.clearSprites(...arguments)
   }
   // 返回模块内元素的当前最大深度
   getMaxZIndex(mid) {
      return getMaxZIndex(this.getMyElements(mid))
   }
   // 清空所有内容数据
   clearData() {
      this.sprites.clearSprites()
      this.groups.clearGroups()
      this.modules.clearModules()
   }
}