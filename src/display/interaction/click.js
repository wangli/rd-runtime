import CMD from '@/command'
import { EVENTS } from '@/events'
import { jsonData, createSimpleData } from '@/utils'
/**
 * 添加用户点击事件
 * @param {*} element 目标对象
 * @param {*} data 元件信息
 */
export default function (element, elementData) {
   const AppSetup = this.AppSetup
   const actionData = this.data
   const appid = this.data.info.id
   let id = elementData.id
   // 用户点击元件
   return {
      style: {
         cursor: AppSetup.clickCursor
      },
      onClickCapture: function (evt) {
         CMD.emit(EVENTS.CLICK_SPRITE, createSimpleData(elementData), evt)
         if (element.actions) {
            let actions = jsonData(actionData.getActionList(element.actions))
            if (element.actionValue && typeof element.actionValue == 'object') {
               actions.forEach(action => {
                  if (element.actionValue[action.id]) {
                     action.value = element.actionValue[action.id]
                  }
               })
            }
            CMD.execute(actions, id, appid)
         }
      }
   }
}