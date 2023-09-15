import { ref, reactive, shallowReactive } from 'vue'
import { nanoid } from 'nanoid'

// 应用设置
export const defineAppSetup = function (option) {
    return shallowReactive(Object.assign({
        // 宽度
        width: 800,
        // 高度
        height: 600,
        // 背景色
        backgroundColor: "#222222",
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
            host: '', method: 'GET', headers: {}
        },
        scaleMode: 'auto'
    })
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
    const { id, value = "", name = "", type = "source", uptime } = option
    return {
        id: id || "GD_" + nanoid(10),
        name,
        type,
        value: (value instanceof Object) ? reactive(value) : ref(value),
        uptime: uptime || new Date().getTime()
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