import { h, getCurrentInstance } from 'vue'
import createSprite from '../createSprite'

let style = {
   position: 'absolute',
   width: "100%",
   top: 0,
   left: 0,
   zIndex: 20000
}
export default {
   name: 'vx-fixed',
   props: ['modules'],
   setup(props) {
      const { appContext: { config: { globalProperties: global } } } = getCurrentInstance()
      return () => {
         const modules = props.modules
         const content = [];
         for (const key in modules) {
            if (modules.hasOwnProperty.call(modules, key)) {
               const item = modules[key];
               if (typeof item.visible == 'undefined' || item.visible == true) {
                  content.push(createSprite({ AppSetup: global.AppSetup, name: 'vx-module', pams: item }))
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