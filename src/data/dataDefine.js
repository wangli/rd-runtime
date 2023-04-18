import { reactive, shallowReactive } from 'vue'

// 应用设置
export const defineAppSetup = function (option) {
    return shallowReactive(Object.assign({
        // 宽度
        width: 1920,
        // 高度
        height: 1080,
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
        size: {
            width: 800,
            height: 600
        },
        background: {
            backgroundColor: "#222222"
        },
        network: {
            host: '', method: 'GET', headers: {}
        },
        scaleMode: 'auto'
    })
}