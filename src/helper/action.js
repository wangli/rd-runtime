import { getSpriteData, getSpriteArrData } from '../data/SprData'
import { setActionData, delActionData } from '../data/actionData'
import TypeModel from '../data/TypeModel'
import { removeArray } from '../utils/index'

import * as HelperEvent from './event';

let { actions } = TypeModel


/**
 * 创建触发的动作
 * @param {string} actionName 动作名称
 * @param {string} target 目标对象
 * @param {string} value 附带参数
 */
export const createActionData = function (actionName, target = "", value, description = '') {
   let action = actions.find(n => n.action == actionName)
   if (action) {
      if (action.target == 'component') {
         return setActionData({
            action: action.action,
            target,
            value: (typeof value != 'undefined') ? value : action.value,
            description: description || (action.name + getSpriteData(target).title)
         })
      } else if (action.target == 'url') {
         return setActionData({
            action: action.action,
            target,
            value: (typeof value != 'undefined') ? value : action.value,
            description: description || action.name
         })
      } else {
         return setActionData({
            action: actionName,
            target,
            value,
            description: description || action.name
         })
      }
   } else {
      console.warn(actionName + ' 动作不存在')
      return null
   }
}
// 修改动作数据
export const editActionData = function (data) {
   if (data.id) {
      return setActionData(data)
   } else {
      console.warn('没有要修改的动作信息')
      return null
   }
}
/**
 * 为事件添加一个动作
 * @param {string} actionId 动作id
 * @param {object|string} target 添加的目标对象，事件的响应对象，元件id 
 * @param {string} eventName 事件名称，通过元件id添加动作时，必须包含一个事件名称
 */
export const addAction = function (actionId, target, eventName = "") {
   if (eventName && typeof target == 'string') {
      let event = HelperEvent.getEvent(target, eventName)
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
export const editAction = function (actionId, target, eventName, value) {
   if (eventName && typeof target == 'string') {
      let event = HelperEvent.getEvent(target, eventName)
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
export const removeAction = function (actionId, target, eventName = "", removeSource = false) {
   if (eventName && typeof target == 'string') {
      let event = HelperEvent.getEvent(target, eventName)
      if (event) {
         removeArray(event.actions, '', actionId)
      }
      if (removeSource) {
         delActionData(actionId)
      }
      return event
   } else if (typeof target == 'object' && target.actions && target.actions instanceof Array) {
      removeArray(target.actions, '', actionId)
      if (removeSource) {
         delActionData(actionId)
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
   let spriteActions = []
   if (id) {
      let sprite = getSpriteData(id)
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
      spriteActions = getSpriteArrData().map(sprite => {
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