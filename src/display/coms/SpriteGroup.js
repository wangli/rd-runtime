import { h, isReactive } from 'vue'
import SpriteObject from './SpriteObject'
import createProps from '../createProps'
import { getAppGlobal } from '@/utils'
// 原件组合容器
export default {
   name: 'vx-sprite-group',
   props: {
      id: String,
      layout: Object
   },
   setup(props) {
      const AppSetup = getAppGlobal('AppSetup')
      const data = getAppGlobal('data')
      const component = getAppGlobal('component')

      return (ctx) => {
         const myData = data.getElement(props.id)
         let myProps = createProps(myData, { id: props.id, myApp: { AppSetup, data, component } })
         let uData = myData.data
         if (myData.data) {
            uData = data.getDataSource(myData.data)
            if (uData && isReactive(uData)) {
               uData = uData.data
            }
         }
         if (props.layout && props.layout.type == 'grid') {
            myProps.style.position = 'relative'
            myProps.style.top = 'auto'
            myProps.style.left = 'auto'
         }
         // 组件内容
         const containerList = []
         // 遍历模块数据
         if (myData.components) {
            myData.components.forEach((item, i) => {
               if (item.visible) {
                  if (myData.cstatus && myData.childstatus) {
                     if (myData.childstatus[item.id] && myData.childstatus[item.id] == uData) {
                        containerList.push(h(SpriteObject, { id: item.id }))
                     }
                  } else {
                     containerList.push(h(SpriteObject, { id: item.id }))
                  }
               }
            })
         }
         myProps.id = myProps.id + '_outer'
         return h('div', myProps, containerList)
      }
   }
}