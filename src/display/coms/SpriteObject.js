import { h, provide, reactive, ref } from 'vue'
import { getAppGlobal } from '@/utils'
import createSprite from '../createSprite'
import createProps from '../createProps'
import { lifecycleHook } from '../hooks'
// 组件包裹层
export default {
   name: 'vx-sprite',
   props: {
      id: String,
      layout: Object
   },
   setup(props, context) {
      const vnode = { value: null, child: ref(null) }
      const AppSetup = getAppGlobal('AppSetup')
      const data = getAppGlobal('data')
      const component = getAppGlobal('component')
      const rect = reactive({ x: 0, y: 0, width: 0, height: 0 })
      provide('rect', rect)
      lifecycleHook(vnode, props, context)
      return () => {
         const myData = data.getElement(props.id)
         rect.x = myData.x
         rect.y = myData.y
         rect.width = myData.width
         rect.height = myData.height
         let myProps = createProps(myData, { id: props.id, myApp: { AppSetup, data, component } })
         let slot = createSprite({ name: myData.name, props: myData.id, ref: vnode.child })

         if (props.layout && props.layout.type == 'grid') {
            myProps.style.position = 'relative'
            myProps.style.top = 'auto'
            myProps.style.left = 'auto'
         }
         myProps.id = myProps.id + '_outer'
         vnode.value = h('div', myProps, slot)
         return vnode.value
      }
   }
}