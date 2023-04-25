import { h } from 'vue'
import { getAppGlobal } from '@/utils'
import createSprite from '../createSprite'
import createProps from '../createProps'
import { lifecycleHook } from '../hooks'
// 组件包裹层
export default {
   name: 'vx-sprite',
   props: {
      id: String
   },
   setup(props, context) {
      const vnode = { value: null }
      const AppSetup = getAppGlobal('AppSetup')
      const data = getAppGlobal('data')
      const component = getAppGlobal('component')
      lifecycleHook(vnode, props, context)
      return () => {
         const myData = data.getElement(props.id)
         let myProps = createProps(myData, { id: props.id, myApp: { AppSetup, data, component } })
         let slot = createSprite({ name: myData.name, props: myData.id })
         vnode.value = h('div', myProps, slot)
         return vnode.value
      }
   }
}