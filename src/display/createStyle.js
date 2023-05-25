import { jsonData } from '@/utils'
export default function (myData) {
    let anim = (typeof myData.anim == 'object' && myData.anim.options) ? myData.anim.options : {}

    let background = jsonData(myData.background)
    if (background && background.backgroundColor) {
        if (/\blinear-gradient\(([^()]*|\([^()]*\))*\)/.test(background.backgroundColor)) {
            let backgroundColor = background.backgroundColor
            delete background.backgroundColor
            if (background.backgroundImage) {
                background.backgroundImage = background.backgroundImage + "," + backgroundColor
            } else {
                background.backgroundImage = backgroundColor
            }
        }
    }
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
        ...background,
        ...myData.border,
        ...myData.shadow,
        ...anim
    }
}