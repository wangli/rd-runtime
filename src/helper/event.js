import { jsonData } from '@/utils'
import DataOptions from '@/data/DataOptions'

// 创建一个新的事件对象数据
export const newEventData = function (name, cmpName) {
   const { component } = this.app
   let event = DataOptions.events.find(n => n.event == name) || component.getMyEvents(cmpName).find(n => n.event == name)
   if (event) {
      return jsonData(event)
   } else {
      return false
   }
}

/**
 * 返回事件信息，eventName不传时返回所有事件列表
 * @param {string} id 元件id
 * @param {string} eventName 事件类型
 * @param {boolean} index 只返回事件所在列表的索引位置
 * @returns 
 */
export const getEvent = function (id, eventName, index = false) {
   let element = this.appData.getElement(id)
   if (eventName) {
      if (index) {
         return element['events'] ? element['events'].findIndex(n => n.event == eventName) : -1
      } else {
         return element['events'] ? element['events'].find(n => n.event == eventName) : null
      }
   } else {
      return element['events'] || null
   }
}

/**
 * 为元件添加一个事件
 * @param {string} id 元件id
 * @param {string} eventName 事件名称 
 * @param {string} pams 事件参数 
 */
export const addEvent = function (id, eventName, pams) {
   const appData = this.appData
   let event = this.getEvent(id, eventName)
   if (event) return event
   let element = appData.getElement(id)
   let newEvent = this.newEventData(eventName, element.name)
   if (element && newEvent) {
      if (!element['events']) {
         element['events'] = []
      }
      if (pams) {
         newEvent['pams'] = pams
      }

      element['events'].push(newEvent)
      return element['events'][element['events'].length - 1]
   } else if (!element) {
      console.warn('缺少组件数据')
   } else {
      console.warn(eventName + '事件名称不对')
   }
   return null
}

/**
 * 编辑元件事件参数
 * @param {string} id 元件id
 * @param {string} eventName 事件名称 
 * @param {string} pams 事件参数 
 */
export const editEvent = function (id, eventName, pams) {
   const appData = this.appData
   let eventIndex = this.getEvent(id, eventName, true)
   if (eventIndex > -1) {
      let element = appData.getElement(id)
      element['events'][eventIndex].pams = pams
      return element['events'][eventIndex]
   }
   return null
}
/**
 * 删除删除某一事件
 * @param {*} id 元件id
 * @param {*} eventName 事件名称 
 */
export const removeEvent = function (id, eventName) {
   const appData = this.appData
   let eventIndex = this.getEvent(id, eventName, true)
   if (eventIndex > -1) {
      let element = appData.getElement(id)
      element['events'].splice(eventIndex, 1)
      return element['events']
   }
   return null
}