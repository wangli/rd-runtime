import CMD from '@/command'
import { interval } from '@/utils'
import getActions from './getActions'

/**
 * 添加定时任务事件
 * @param {*} element 目标对象
 * @param {*} elementData 元素数据
 */
export default function (eventItem, elementData) {
   const data = this.data
   const appid = this.data.info.id
   const sprid = elementData.id
   let it = null

   return {
      interval: '1',
      onInterval(evt) {
         if (it) {
            interval.del(it)
            it = null
         }
         if (evt.detail.value == 'mounted') {
            let pams = eventItem.pams || {}
            let delay = pams.delay || 1000
            it = interval.add(() => {
               // 执行动作
               if (eventItem.actions) {
                  CMD.execute(getActions(data, eventItem), sprid, appid)
               }
            }, parseInt(delay))
         }
      }
   }
}