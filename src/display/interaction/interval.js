import CMD from '@/command'
import { interval } from '@/utils'

/**
 * 添加定时任务事件
 * @param {*} element 目标对象
 * @param {*} spid 元件id
 */
export default function (element, spid) {
   const actionData = this.data.aData
   const appid = this.data.info.id
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
                  CMD.execute(actionData.getActionList(element.actions), spid, appid)
               }
            }, parseInt(delay))
         }
      }
   }
}