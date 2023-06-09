import { h } from 'vue'
import baseComponent from '@/component/baseComponent'

export default {
   exports: baseComponent,
   name: 'vx-mask',
   render() {
      let style = {
         position: 'absolute',
         width: "100%",
         height: "100%",
         top: 0,
         left: 0,
         backgroundColor: "rgba(0, 0, 0, .8)",
         zIndex: 30000
      }
      return h('div', {
         id: "vx-mask",
         style,
         onClick: $event => {

         }
      })
   }
}