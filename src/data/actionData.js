import { reactive } from 'vue'
import { defineAction } from './defineData'
import DataOptions from '@/data/DataOptions'

export default class ActionData {

   // 动作数据集合
   actions = reactive({})
   appData = null

   constructor(appData, _data) {
      this.appData = appData
      // 初始数据
      _data && this.fillData(_data)
   }
   // 填充数据
   fillData(data) {
      if (Array.isArray(data)) {
         data.forEach(element => {
            this.setActionData(element)
         })
      }
   }
   /**
    * 创建新动作
    * @param {string} actionName 动作名称
    * @param {object} option 覆盖参数
    * @returns 
    */
   createActionData(actionName, option) {
      let actionData = DataOptions.actions.find(n => n.action == actionName)
      if (!actionData) {
         console.warn(action + ' 动作不存在')
         return null
      }
      let action = actionName
      let target = option.target || ''
      let value = option.value || actionData.value
      let description = option.description || actionData.description

      if (actionData.target == 'component' && !description) {
         description = actionData.name + this.appData.getElement(target).title
      }
      return this.setActionData({ action, target, value, description })
   }
   // 修改动作数据
   editActionData(data) {
      if (data.id) {
         return this.setActionData(data)
      } else {
         console.warn('没有要修改的动作信息')
         return null
      }
   }
   // 添加动作数据
   setActionData(data) {
      if (data && typeof data == 'object') {
         let newData = defineAction(data)
         this.actions[newData.id] = newData
         return newData.id
      } else {
         return null
      }
   }
   // 删除动作数据
   delActionData = function (id) {
      if (this.actions[id]) {
         delete this.actions[id]
      }
   }
   // 返回动作数据
   getActionData = function (id) {
      return this.actions[id]
   }
   // 返回当前所有
   getActionsData = function () {
      return this.actions
   }
   // 返回当前所有（数组）
   getActionList = function (ids) {
      if (ids) {
         let list = []
         if (ids instanceof Array) {
            for (const key in ids) {
               list.push(this.actions[ids[key]])
            }
         } else if (typeof ids == 'string' && this.actions[ids]) {
            list.push(this.actions[ids])
         }
         return list
      } else {
         return Object.values(this.actions)
      }
   }
   /**
    * 清空数据
    */
   clearData = function () {
      let keys = Object.keys(this.actions)
      keys.forEach(key => {
         delete this.actions[key]
      })
   }
}