export default function (myData) {
    let anim = (typeof myData.anim == 'object' && myData.anim.options) ? myData.anim.options : {}
    return {
        position: 'absolute',
        width: myData.width > 0 ? myData.width + 'px' : '80px',
        height: myData.height > 0 ? myData.height + 'px' : '80px',
        top: myData.y + 'px',
        left: myData.x + 'px',
        zIndex: myData.selected ? 100000 + myData.zIndex : myData.zIndex,
        transform: 'rotate(' + myData.angle + 'deg)',
        opacity: myData.opacity / 100,
        padding: myData.padding,
        ...myData.border,
        ...myData.background,
        ...myData.shadow,
        ...anim
    }
}