import { provide, h, toRefs } from 'vue'
import SpriteObject from './SpriteObject'
import createEvent from '../createEvent'
import createProps from '../createProps'
import { getAppGlobal } from '@/utils'
// 原件组合容器
export default {
   name: 'vx-sprite-group',
   props: {
      id: {
         type: String
      }
   },
   setup(props) {
      const AppSetup = getAppGlobal('AppSetup')
      const data = getAppGlobal('data')
      const component = getAppGlobal('component')
      const myData = data.getElement(props.id)
      let event = createEvent({
         myApp: { AppSetup, data, component },
         events: myData.events || [],
         data: myData,
         componentName: ""
      })
      provide('offsetX', myData.x)
      provide('offsetY', myData.y)

      // offset
      return (ctx) => {
         const myProps = createProps(myData, { id: props.id, event, interaction: AppSetup.interaction })
         // 组件内容
         const containerList = []
         // 遍历模块数据
         if (myData.components) {
            myData.components.forEach((item, i) => {
               if (item.visible) {
                  containerList.push(h(SpriteObject, { id: item.id }))
               }
            })
         }
         return h('div', myProps, containerList)
      }
   }
}