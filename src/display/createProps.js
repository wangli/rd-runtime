import createStyle from "./createStyle"
import createEvent from './createEvent'
export default function (myData, { id, myApp }) {
    const myStyle = createStyle(myData)
    const myEvent = createEvent({ myApp, events: myData.events || [], data: myData, componentName: "" })
    const myClass = ['element_sprite', { 'element_selected': myData.selected }, { 'element_hover': myData.hover }]
    if (myData['anim'] && myData['anim'].name && myApp.AppSetup.interaction) {
        myClass.push(myData['anim'].name)
    }
    if (myEvent.style) {
        Object.assign(myStyle, myEvent.style)
        delete myEvent.style
    }
    return { id, ...myEvent, style: myStyle, class: myClass }
}