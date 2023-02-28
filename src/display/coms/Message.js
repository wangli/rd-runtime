import { h, reactive } from 'vue'
import cmd from '../../command'

let style = {
   position: 'absolute',
   width: "100%",
   top: 0,
   left: 0,
   zIndex: 99999999
}
let itemStyle = {
   width: '60%',
   lineHeight: '18px',
   borderRadius: '6px',
   backgroundColor: 'rgba(255, 240, 0, 0.66)',
   textAlign: 'center',
   padding: '8px 5px',
   margin: '5px auto',
   boxShadow: '1px 1px 1px #00000022',
   fontSize: '14px',
   animation:'0.4s ease 0s 1 normal none running vx_enter'
}
export default {
   name: 'vx-message',
   setup() {
      const items = reactive([])
      // 添加消息事件
      cmd.addEventListener('message-send', res => {
         if (items.length == 0) {
            deleteItem();
         }
         items.push(res);
      })
      const deleteItem = function () {
         setTimeout(() => {
            if (items.length > 0) {
               items.splice(0, 1);
               if (items.length > 0) {
                  deleteItem()
               }
            }
         }, 3000);
      }
      return () => {
         if (items.length > 0) {
            return h('div', {
               id: "vx-message",
               style
            }, items.map((item) => {
               return h('div', { class: 'message_item', style: itemStyle }, item)
            }))
         } else {
            return h('div', {
               id: "vx-message",
               style
            })
         }
      }
   }
}