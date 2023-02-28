import CMD from '../../command'
import * as actionData from '../../data/actionData'
import interval from '../../utils/interval'

/**
 * 添加定时任务事件
 * @param {*} element 目标对象
 * @param {*} spid 元件id
 */
export default function (element, spid) {
   let it = null

   return {
      interval: '1',
      onInterval(evt) {
         if (it) {
            interval.del(it)
            it = null
         }
         if (evt.detail.value == 'mounted') {
            let pams = element.pams || {}
            let delay = pams.delay || 1000
            it = interval.add(() => {
               // 执行动作
               if (element.actions) {
                  CMD.execute(actionData.getActionList(element.actions), spid)
               }
            }, parseInt(delay))
         }
      }
   }
}