import { h } from 'vue'
import baseComponent from '@/component/baseComponent'
import createSprite from '../createSprite'
export default {
   extends: baseComponent,
   name: 'vx-plane',
   props: ['components'],
   setup() {
      return (context) => {
         // 组件内容
         const containerList = [];

         // 遍历模块数据
         if (context.components) {
            context.components.forEach((item, i) => {
               if (item.visible) {
                  containerList.push(createSprite({ name: item.name, props: item.id }))
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