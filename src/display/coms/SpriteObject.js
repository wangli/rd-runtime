import { h, toRefs } from 'vue'
import baseComponent from '@/component/baseComponent'
export default {
   extends: baseComponent,
   name: 'vx-sprite',
   setup(props, context) {
      const { id } = toRefs(props)
      return (ctx) => {
         let slot = ""
         if (typeof context.slots.default == 'function') {
            slot = context.slots.default()
         }
         let myClass = ['element_sprite', { 'element_selected': ctx.$parent.selected }, { 'element_hover': ctx.$parent.hover }]

         if (ctx.$parent.gpid) {
            myClass = ['element_sprite']
         }
         return h('div', { id: id.value || ctx.$parent.id, style: ctx.$parent.style, class: myClass }, slot)
      }
   }
}