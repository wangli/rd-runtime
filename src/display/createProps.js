import createStyle from "./createStyle"
export default function (myData, { id, event, interaction }) {
    const myStyle = createStyle(myData)
    const myClass = ['element_sprite', { 'element_selected': myData.selected }, { 'element_hover': myData.hover }]
    if (myData['anim'] && myData['anim'].name && interaction) {
        myClass.push(myData['anim'].name)
    }
    return { id, style: myStyle, class: myClass, ...event }
}