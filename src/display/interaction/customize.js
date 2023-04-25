import CMD from '@/command'
import { jsonData } from '@/utils'

/**
 * 执行动作列表
 * @param {*} actions 
 * @param {*} spid 
 */
const executeActions = function (actions, spid, data) {
   const appid = this.info.id
   // 元件内部触发的事件与绑定的动作关联，并根据发送参数合并或替换到动作中的动作值
   let actionsArr = jsonData(this.getActionList(actions))
   for (let i = 0, lg = actionsArr.length; i < lg; i++) {
      if (data && actionsArr[i].value && typeof actionsArr[i].value == 'object') {
         Object.assign(actionsArr[i].value, data)
      } else if (data) {
         actionsArr[i].value = data
      }
   }
   CMD.execute(actionsArr, spid, appid)
}

/**
 * 添加用户点击事件
 * @param {*} element 目标对象
 * @param {*} spid 元件id
 */
export default function (element, elementData, componentName) {
   const appData = this.data
   const actionData = this.data.aData
   const components = this.component.iComponents
   const appid = this.data.info.id
   const sprid = elementData.id
   let evts = {}
   if (componentName && components[componentName]) {
      let emits = components[componentName].emits || []
      // 元件内部触发
      let event = emits.find(n => n == element.event)

      if (event && typeof event == 'string') {
         // 事件名称要符合字母、数字、下划线、减号，大于1位小于33位，并已字母开头的规则
         if (/^[a-zA-Z][-_a-zA-Z0-9_-]{1,32}$/.test(event)) {
            // 将首字母转大写
            evts["on" + event.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())] = function (data) {
               if (/^solo-/.test(event) && data) {
                  if (element.actions && element.actions instanceof Array && element.actions.length > 0) {
                     // 如果自定义事件绑定了指定的动作，将参数传递给指定的动作
                     executeActions.call(appData, element.actions, sprid, data)
                  } else {
                     // solo单事件处理，事件参数就是动作id
                     CMD.execute(jsonData(actionData.getActionList(data)), sprid, appid)
                  }
               } else if (element.actions && element.actions instanceof Array) {
                  executeActions.call(appData, element.actions, sprid, data)
               }
            }
         } else {
            console.warn(event + "无效的事件名定义")
         }
      } else {
         console.warn(element.event + "事件没有定义")
      }
   }
   return evts
}