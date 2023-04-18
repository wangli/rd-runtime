import { getSpriteData } from '../data/ElementData'
import { jsonData } from '../utils/index'
import TypeModel from '../data/TypeModel'
import component from '../component'

const { events } = TypeModel

// 创建一个新的事件对象数据
export const newEventData = function (name, cmpName) {
   let event = events.find(n => n.event == name) || component.getComponentEvents(cmpName).find(n => n.event == name)
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
   let cmp = getSpriteData(id)

   if (eventName) {

      if (index) {
         return cmp['events'] ? cmp['events'].findIndex(n => n.event == eventName) : -1
      } else {
         return cmp['events'] ? cmp['events'].find(n => n.event == eventName) : null
      }

   } else {
      return cmp['events'] || null
   }
}

/**
 * 为元件添加一个事件
 * @param {string} id 元件id
 * @param {string} eventName 事件名称 
 * @param {string} pams 事件参数 
 */
export const addEvent = function (id, eventName, pams) {
   let event = getEvent(id, eventName)
   if (event) return event
   let cmp = getSpriteData(id)
   let newEvent = newEventData(eventName, cmp.name)
   if (cmp && newEvent) {
      if (!cmp['events']) {
         cmp['events'] = []
      }
      if (pams) {
         newEvent['pams'] = pams
      }

      cmp['events'].push(newEvent)
      return cmp['events'][cmp['events'].length - 1]
   } else if (!cmp) {
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
   let eventIndex = getEvent(id, eventName, true)
   if (eventIndex > -1) {
      let cmp = getSpriteData(id)
      cmp['events'][eventIndex].pams = pams
      return cmp['events'][eventIndex]
   }
   return null
}
/**
 * 删除删除某一事件
 * @param {*} id 元件id
 * @param {*} eventName 事件名称 
 */
export const removeEvent = function (id, eventName) {
   let eventIndex = getEvent(id, eventName, true)
   if (eventIndex > -1) {
      let cmp = getSpriteData(id)
      cmp['events'].splice(eventIndex, 1)
      return cmp['events']
   }
   return null
}