import { provide, h, toRefs } from 'vue'
import createSprite from '../createSprite'
// 原件组合容器
export default {
   name: 'vx-sprite-group',
   props: {
      components: {
         type: Array,
         default () {
            return []
         }
      }
   },
   setup(props) {
      const { x, y, id } = toRefs(props)
      provide('offsetX', x)
      provide('offsetY', y)
      // offset
      return (ctx) => {
         // 组件内容
         const containerList = [];
         // 遍历模块数据
         if (ctx.components) {
            ctx.components.forEach((item, i) => {
               if (item.visible) {
                  containerList.push(createSprite(item.name, item.id))
               }
            })
         }
         let myClass = ['element_sprite', { 'element_selected': ctx.selected }, { 'element_hover': ctx.hover }]

         return h('div', { id: id.value, style: ctx.style, class: myClass }, containerList)
      }
   }
}