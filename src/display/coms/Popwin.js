import { h } from 'vue'

export default {
   name: 'vx-popwin',
   render() {
      let style = {
         position: 'absolute',
         width: "100%",
         zIndex: 50000
      }
      return h('div', {
         id: "vx-popwin",
         style,
      })
   }
}