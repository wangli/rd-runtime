import { inject, h } from 'vue'
import baseComponent from '@/component/baseComponent'

export default {
   name: 'vx-container',
   extends: baseComponent,
   setup(props, context) {
      const style = inject('myStyle', {})
      let slot = "";
      if (typeof context.slots.default == 'function') {
         slot = context.slots.default()
      }

      return () => h('div', { style }, slot)
   }
}