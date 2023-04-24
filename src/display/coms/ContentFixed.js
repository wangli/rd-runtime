import { h } from 'vue'
import baseComponent from '@/component/baseComponent'
import createSprite from '../createSprite'

let style = {
   position: 'absolute',
   width: "100%",
   top: 0,
   left: 0,
   zIndex: 20000
}
export default {
   extends: baseComponent,
   name: 'vx-fixed',
   props: ['modules'],
   setup(props) {
      return () => {
         const modules = props.modules
         const content = [];
         for (const key in modules) {
            if (modules.hasOwnProperty.call(modules, key)) {
               const item = modules[key];
               if (typeof item.visible == 'undefined' || item.visible == true) {
                  content.push(createSprite({ name: 'vx-module', props: item }))
               }
            }
         }
         return h('div', {
            id: "vx-fixed",
            style,
         }, content)
      }
   }
}