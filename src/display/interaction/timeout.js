import CMD from '../../command'
import * as actionData from '../../data/actionData'
/**
 * 添加用户延迟事件
 * @param {*} element 目标对象
 * @param {*} spid 元件id
 */
export default function (element, spid) {
   let it = null
   // 用户点击元件
   return {
      timeout: '1',
      onTimeout(evt) {
         let lifecycle = evt.detail.value
         if (it) {
            clearTimeout(it)
            it = null
         }
         if (lifecycle == 'mounted') {
            let pams = element.pams || {}
            let delay = pams.delay || 1000
            it = setTimeout(() => {
               // 执行动作
               if (element.actions) {
                  CMD.execute(actionData.getActionList(element.actions), spid)
               }
            }, parseInt(delay));
         }
      }
   }
}