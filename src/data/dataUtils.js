export * from '../utils'

// 距离计算
export const getDomRect = function (AppSetup, _dom) {
    if (_dom) {
        let dom = _dom
        if (typeof dom == 'string') {
            dom = document.querySelector(AppSetup.dom)
        }
        let rect = dom.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) {
            return rect
        } else if (dom.parentElement && dom.parentElement.localName != "body") {
            return getDomRect(dom.parentElement)
        } else {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    }
}
// 返回一个根据窗口变化的缩放比
export const getScale = function (AppSetup, _size) {
    let rect = getDomRect(AppSetup, AppSetup.dom) || {
        width: window.innerWidth,
        height: window.innerHeight
    }
    let h = rect.height / _size.height;
    let w = rect.width / _size.width;
    if (h < w) {
        return { value: h, h, w }
    } else {
        return { value: w, h, w }
    }
}

export const getMaxZIndex = function () {
    if (Array.isArray(components) && components.length > 0) {
        let comps = components.map(item => {
            return {
                id: item.id,
                zIndex: item.zIndex || 0
            }
        }).sort((a, b) => {
            return b.zIndex - a.zIndex
        })
        return comps[0].zIndex || 0
    } else {
        return 0
    }
}

