import { removeArray } from '@/utils'

/**
 * 为事件添加一个动作
 * @param {string} actionId 动作id
 * @param {object|string} target 添加的目标对象，事件的响应对象，元件id 
 * @param {string} eventName 事件名称，通过元件id添加动作时，必须包含一个事件名称
 */
export const addEventAction = function (actionId, target, eventName = "") {
   if (eventName && typeof target == 'string') {
      let event = this.getEvent(target, eventName)
      if (event) {
         if (event.actions.findIndex(n => n == actionId) < 0) {
            event.actions.push(actionId)
         }
      } else {
         console.warn(target + "中" + eventName + '事件不存在')
      }
      return event
   } else if (typeof target == 'object' && target.actions && target.actions instanceof Array) {
      target.actions.push(actionId)
      return target
   }
}
/**
 * 编辑当前元件向触发的动作传值
 * @param {*} actionId 
 * @param {*} target 
 * @param {*} eventName 
 * @param {*} value 
 */
export const editEventAction = function (actionId, target, eventName, value) {
   if (eventName && typeof target == 'string') {
      let event = this.getEvent(target, eventName)
      if (event) {
         if (typeof value != 'undefined') {
            if (!event.actionValue) {
               event.actionValue = {}
            }
            event.actionValue[actionId] = value
         }
      } else {
         console.warn(target + "中" + eventName + '事件不存在')
      }
      return event
   }
}
/**
 * 
 * @param {string} actionId  动作id
 * @param {*} target 目标对象
 * @param {*} eventName 事件名称
 * @param {*} removeSource 是否删除源头
 * @returns 
 */
export const removeEventAction = function (actionId, target, eventName = "", removeSource = false) {
   const data = this.appData
   if (eventName && typeof target == 'string') {
      let event = this.getEvent(target, eventName)
      if (event) {
         removeArray(event.actions, '', actionId)
      }
      if (removeSource) {
         data.aData.delActionData(actionId)
      }
      return event
   } else if (typeof target == 'object' && target.actions && target.actions instanceof Array) {
      removeArray(target.actions, '', actionId)
      if (removeSource) {
         data.aData.delActionData(actionId)
      }
      return target
   }
}
/**
 * @param {*} id 目标对象id
 * @param {*} event 事件名称
 * @returns 获取所有元件的所有动作id信息
 */
export const getSpriteActions = function (id, event) {
   const data = this.appData
   let spriteActions = []
   if (id) {
      let sprite = data.getElement(id)
      if (Array.isArray(sprite.events)) {
         if (event) {
            let eve = sprite.events.find(item => item.event == event)
            if (eve) {
               spriteActions = eve.actions.map(id => {
                  return {
                     sname: sprite.title,
                     sid: sprite.id,
                     event: eve.event,
                     id
                  }
               })
            }
         } else {
            spriteActions = sprite.events.map(myEvent => {
               if (myEvent.actions) {
                  return myEvent.actions.map(id => {
                     return {
                        sname: sprite.title,
                        sid: sprite.id,
                        event: myEvent.event,
                        id
                     }
                  })
               } else {
                  return []
               }
            }).flat()
         }
      }
   } else {
      spriteActions = data.mData.getSpriteList().map(sprite => {
         if (sprite.events && sprite.events.length > 0) {
            return sprite.events.map(event => {
               if (event.actions) {
                  return event.actions.map(id => {
                     return {
                        sname: sprite.title,
                        sid: sprite.id,
                        event: event.event,
                        id
                     }
                  })
               } else {
                  return []
               }
            }).flat()
         } else {
            return []
         }
      }).flat()
   }
   return spriteActions
}