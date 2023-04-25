import CMD from '@/command'
import { EVENTS } from '@/events'
import { createSimpleData } from '@/utils'
import getActions from './getActions'

/**
 * 添加用户点击事件
 * @param {*} event 事件
 * @param {*} elementData 元素数据
 */
export default function (eventItem, elementData) {
   const AppSetup = this.AppSetup
   const data = this.data
   const appid = this.data.info.id
   const sprid = elementData.id
   // 用户点击元件
   return {
      style: {
         cursor: AppSetup.clickCursor
      },
      onClickCapture: function (evt) {
         CMD.emit(EVENTS.CLICK_SPRITE, createSimpleData(elementData), evt)
         if (eventItem.actions) {
            let actions = getActions(data, eventItem)
            CMD.execute(actions, sprid, appid)
         }
      }
   }
}