import CMD from '@/command'
import getActions from './getActions'

/**
 * 添加用户延迟事件
 * @param {*} element 目标对象
 * @param {*} elementData 元素数据
 */
export default function (eventItem, elementData) {
   const data = this.data
   const appid = this.data.info.id
   const sprid = elementData.id
   let it = null
   // 用户点击元素
   return {
      timeout: '1',
      onTimeout(evt) {
         let lifecycle = evt.detail.value
         if (it) {
            clearTimeout(it)
            it = null
         }
         if (lifecycle == 'mounted') {
            let pams = eventItem.pams || {}
            let delay = pams.delay || 1000
            it = setTimeout(() => {
               // 执行动作
               if (eventItem.actions) {
                  CMD.execute(getActions(data, eventItem), sprid, appid)
               }
            }, parseInt(delay))
         }
      }
   }
}