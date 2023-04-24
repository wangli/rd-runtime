import { h } from 'vue'
import baseComponent from '@/component/baseComponent'

export default {
   extends: baseComponent,
   name: 'vx-popwin',
   render() {
      let style = {
         position: 'absolute',
         width: "100%",
         zIndex: 50000
      }
      return h('div', {
         id: "vx-popwin",
         style,
      })
   }
}