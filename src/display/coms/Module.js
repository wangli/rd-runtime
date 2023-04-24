import { h, toRefs } from 'vue'
import baseComponent from '@/component/baseComponent'
import createSprite from '../createSprite'
export default {
   extends: baseComponent,
   name: 'vx-module',
   props: ['components'],
   setup(props) {
      const { components } = toRefs(props)
      return (context) => {
         // 组件内容
         const containerList = []
         // 遍历模块数据
         if (components.value) {
            components.value.forEach((item, i) => {
               if (item.visible) {
                  if (item.type == 'group') {
                     containerList.push(createSprite({ name: 'vx-sprite-group', props: item.id }))
                  } else {
                     containerList.push(createSprite({ name: item.name, props: item.id }))
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