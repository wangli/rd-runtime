import { inject, h } from 'vue'

export default {
   name: 'vx-container',
   setup(props, context) {
      const style = inject('myStyle', {})
      let slot = "";
      if (typeof context.slots.default == 'function') {
         slot = context.slots.default()
      }

      return () => h('div', { style }, slot)
   }
}