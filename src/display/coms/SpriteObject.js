import { h, toRefs } from 'vue'
import createSprite from '../createSprite'
import createEvent from '../createEvent'
import createProps from '../createProps'
import { getAppGlobal } from '@/utils'
export default {
   name: 'vx-sprite',
   props: {
      id: {
         type: String
      }
   },
   setup(props, context) {
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
      return () => {
         let myProps = createProps(myData, { id: props.id, event, interaction: AppSetup.interaction })
         let slot = createSprite({ name: myData.name, props: myData.id })
         return h('div', myProps, slot)
      }
   }
}