import { h } from 'vue'
import CMD from '../../command'
import { EVENTS } from '../../events'

let style = {
   position: 'absolute',
   width: "100%",
   height: "100%",
   top: 0,
   left: 0,
   backgroundColor: "rgba(0, 0, 0, 0)",
   zIndex: 1
}
export default {
   name: 'vx-background',
   setup(props) {
      return () => {
         let myStyle = Object.assign({}, style, props.style)
         return h('div', {
            id: "vx-background",
            style: myStyle,
            onmousedown: $event => {
               CMD.emit(EVENTS.MOUSEDOWN_BACKGROUND, $event)
            },
            onmouseup: $event => {
               CMD.emit(EVENTS.MOUSEUP_BACKGROUND, $event)
            },
            onclick: $event => {
               CMD.emit(EVENTS.CLICK_BACKGROUND, $event)
            }
         })
      }
   }
}