import { h, toRefs, getCurrentInstance } from 'vue'
import createSprite from '../createSprite'
export default {
   name: 'vx-module',
   props: ['components'],
   setup(props) {
      const { appContext: { config: { globalProperties: global } } } = getCurrentInstance()
      const { components } = toRefs(props)
      return (context) => {
         // 组件内容
         const containerList = []
         // 遍历模块数据
         if (components.value) {
            components.value.forEach((item, i) => {
               if (item.visible) {
                  if (item.type == 'group') {
                     containerList.push(createSprite({ AppSetup: global.AppSetup, name: 'vx-sprite-group', pams: item.id }))
                  } else {
                     containerList.push(createSprite({ AppSetup: global.AppSetup, name: item.name, pams: item.id }))
                  }
               }
            })
         }
         return h('div', {
            id: context.id,
            style: context.style,
         }, containerList)
      }
   }
}