import { ref, reactive, isReactive, shallowReactive, computed } from 'vue'
import { nanoid } from 'nanoid'



// 应用设置
export const defineAppSetup = function (option) {
    return shallowReactive(Object.assign({
        // 缩放模式
        scaleMode: 'auto',
        // 开启交互动作
        interaction: false,
        // 点击事件鼠标经过光标样式
        clickCursor: 'auto',
        // 是否开启整体缩放
        scale: false,
        // 当前应用状态，none未创建，create已创建，display已展示，destroy销毁
        status: 'none',
        // 是否在编辑状态
        develop: false,
        // 所在容器
        dom: null
    }, option))
}

// 应用信息
export const defineAppInfo = function () {
    return reactive({
        title: "",
        id: 'A_' + nanoid(10),
        creattime: null,
        uptime: null,
        cover: null,
        description: '',
        width: 800,
        height: 600,
        parentSize: false,
        background: {
            backgroundColor: "#222222"
        },
        network: {
            host: '',
            method: 'GET',
            offline: false,
            headers: {},
            watch: ''
        },
        scaleMode: 'auto'
    })
}

export const computedAppInfo = function (appinfo) {
    if (isReactive(appinfo)) {
        return computed(() => {
            return appinfo
        })
    }
    return null
}

// 应用信息
export const defineAction = function (option) {
    return Object.assign({
        id: 'AC_' + nanoid(10),
        action: '',
        target: 'app',
        value: null,
        description: ""
    }, option)
}

// 全局数据信息
export const defineGData = function (option) {
    const { id, value = "", name = "", type = "source", uptime, trigger } = option
    let myValue = value
    if (type != 'remote') {
        myValue = (value instanceof Object) ? reactive(value) : ref(value)
    }
    return {
        id: id || "GD_" + nanoid(10),
        name,
        type,
        value: myValue,
        uptime: uptime || new Date().getTime(),
        trigger: Object.assign({
            operator: '',
            value: '',
            action: '',
            actionValue: null
        }, trigger)
    }
}

// 插件数据信息
export const definePlugin = function (option) {
    return reactive(Object.assign({
        id: "PD_" + nanoid(10),
        name: '',
        title: '',
        url: '',
        password: '',
        version: '',
        uptime: new Date().getTime()
    }, option))
}

// 应用事件
export const defineGEvent = function (option) {
    return Object.assign({
        event: "launch",
        pams: { delay: 1000 },
        actions: [],
        actionValue: {}
    }, option)
}
// 资源数据信息
export const defineAssets = function (option) {
    const { id, url = "", type = 'other', uptime } = option
    return reactive({
        id: id || "AS_" + nanoid(10),
        url,
        type,
        uptime: uptime || new Date().getTime()
    })
}

// 脚本函数信息
export const defineFunction = function (option) {
    const { id, name, description = '', value = '', uptime } = option
    return reactive({
        id: id || "FU_" + nanoid(10),
        name,
        description,
        value,
        uptime: uptime || new Date().getTime()
    })
}
