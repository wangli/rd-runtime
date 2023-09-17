import { h, toRefs, watch } from 'vue'
import { getAppGlobal } from '@/utils'
import baseComponent from '@/component/baseComponent'
import SpriteGroup from './SpriteGroup'
import SpriteObject from './SpriteObject'
export default {
   extends: baseComponent,
   name: 'vx-module',
   props: ['components', 'layout'],
   setup(props) {
      const AppSetup = getAppGlobal('AppSetup')
      const data = getAppGlobal('data')
      const appInfo = getAppGlobal('appInfo')
      const appData = data.getAppData()
      const { components } = toRefs(props)
      return (context) => {
         // 组件内容
         const containerList = []
         // 遍历模块数据
         if (components.value) {
            components.value.forEach((item, i) => {
               if (item.visible) {
                  if (AppSetup.develop && props.layout && props.layout.type == 'grid') {
                     let sVNode = null
                     if (item.type == 'group') {
                        sVNode = h(SpriteGroup, { id: item.id, layout: props.layout })
                     } else {
                        sVNode = h(SpriteObject, { id: item.id, layout: props.layout })
                     }
                     containerList.push(h('div', { className: 'rd_page_grid_wrapper' }, sVNode))
                  } else {
                     if (item.type == 'group') {
                        containerList.push(h(SpriteGroup, { id: item.id, layout: props.layout }))
                     } else {
                        containerList.push(h(SpriteObject, { id: item.id, layout: props.layout }))
                     }
                  }
               }
            })
         }
         let style = context.style
         if (props.layout && props.layout.type == 'grid') {
            let width = context.style.width == 'auto' ? appInfo.value.width + 'px' : context.style.width
            let height = context.style.height == 'auto' ? appInfo.value.height + 'px' : context.style.height
            style = Object.assign({}, context.style, {
               position: 'fixed',
               display: 'grid',
               overflow: props.layout.rows ? 'auto' : 'hidden auto',
               gridTemplateColumns: props.layout.colums || 'none',
               gridTemplateRows: props.layout.rows || 'none',
               gridTemplateAreas: props.layout.areas || 'none',
               width,
               height
            })
            if (style.gridTemplateRows == 'none') {
               style.maxHeight = style.height
               delete style.height
            }
         }
         return h('div', {
            id: context.id,
            style,
         }, containerList)
      }
   }
}