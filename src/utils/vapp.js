import { getCurrentInstance } from 'vue'
import { nanoid } from 'nanoid'

// 获取vue当前的全局参数对象
export const getAppGlobal = function (key = 'AppSetup') {
    const { appContext: { config: { globalProperties: global = {} } } } = getCurrentInstance()
    return global[key] || null
}

// 距离计算
export const getDomRect = function (_dom) {
    if (_dom) {
        let dom = (typeof _dom == 'string') ? document.querySelector(_dom) : _dom
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
    return null
}
// 返回一个根据窗口变化的缩放比
export const getScale = function (dom, _size) {
    let rect = getDomRect(dom) || {
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
// 获取列表项最大的深度值
export const getMaxZIndex = function (components) {
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
// 创建一个数据源对象的描述副本
export const createSimpleData = function (data) {
    let object = {
        id: null,
        gpid: null,
        mid: null,
        visible: null,
        name: null,
        type: null,
        zIndex: null
    }
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            object[key] = data[key]
        }
    }
    return object
}
export const getTemplateData = function (...override) {
    let time = new Date().getTime()
    let data = {
        id: 'A_' + nanoid(10),
        title: "",
        creattime: time,
        uptime: time,
        cover: "",
        description: "",
        background: { backgroundColor: "#111111" },
        width: 1080,
        height: 768,
        scaleMode: 'auto',
        network: {},
        globalData: [],
        modules: [],
        actions: [],
        plugins: [],
        remote: []
    }
    return Object.assign({}, data, ...override)
}