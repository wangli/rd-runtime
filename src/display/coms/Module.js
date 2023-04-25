import { h, toRefs } from 'vue'
import baseComponent from '@/component/baseComponent'
import SpriteGroup from './SpriteGroup'
import SpriteObject from './SpriteObject'
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
                     containerList.push(h(SpriteGroup, { id: item.id }))
                  } else {
                     containerList.push(h(SpriteObject, { id: item.id }))
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