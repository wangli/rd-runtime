import * as vue from 'vue'
import EventEmitter from 'eventemitter3'
import { createApp } from 'vue'
import { nanoid } from 'nanoid'
import { getParentSize } from '@/utils'
import Data from './data'
import Stage from './display/stage'
import Display from './display'
import Component from './component'
import Command from './command'
import controller from './controller'
import Helper from './helper'
import * as Plugin from './plugin'
import * as secrecy from './secrecy'

if (window && typeof window.Vue == 'undefined') {
    window.Vue = vue
}

const domlist = []

export default class App extends EventEmitter {
    constructor(option = {}) {
        super()
        this.id = option.id || nanoid(10)
        // vue应用
        this.vapp = null
        this.dom = null
        this.component = new Component(this)
        this.data = new Data(this, option.config)
        this.controller = controller(this)
        this.AppSetup = this.data.AppSetup
        this.helper = new Helper(this)
    }
    async initData(value) {
        let res = await secrecy.decrypt(value)
        this.id = res.id
        if (res && Array.isArray(res.plugins)) {
            await Plugin.useAsyncLoad.call(this, res.plugins)
        }
        this.data.init(res)
        // if (display && this.AppSetup.status != "display") {
        //     this.display()
        // }
        return {
            id: this.data.info.id,
            info: this.data.info,
            mData: this.data.mData,
            aData: this.data.aData,
            gData: this.data.gData,
            pData: this.data.pData,
            rData: this.data.rData
        }
    }
    // 获取应用数据
    getData(blob = false) {
        if (blob == false) {
            return this.data.getData()
        } else {
            let data = this.data.getData()
            return secrecy.encrypt(data)
        }
    }
    // 添加组件
    addComponent(items) {
        this.component.add(items)
    }
    // 使用插件
    use(value) {
        Plugin.use.call(this, value)
    }
    // 创建
    create(props = {}) {
        if (!this.vapp) {
            this.vapp = createApp(Stage, props)
            // 设置全局配置，可被所有组件访问
            this.vapp.config.globalProperties.AppSetup = this.AppSetup
            this.vapp.config.globalProperties.data = this.data
            this.vapp.config.globalProperties.component = this.component
            this.vapp.config.globalProperties.helper = this.helper
            // 安装内部默认组件
            this.vapp.use(Display)
            // 注册组件到应用
            this.component.install()
            // 应用状态设置
            this.AppSetup.status = "create"
            console.log('%c灿create', 'color:#0aa100')
            return true
        } else {
            return false
        }
    }
    // 显示
    display() {
        if (this.vapp) {
            if (this.AppSetup.dom instanceof HTMLElement) {
                this.dom = this.AppSetup.dom
            } else if (typeof dom == 'string') {
                this.dom = document.querySelector(dom)
            }
            if (this.dom) {
                if (domlist.includes(this.dom)) {
                    console.error('app加载的DOM已有内容')
                    return false
                }
                domlist.push(this.dom)
                if (this.dom.parentNode && this.data.info.parentSize) {
                    let { ratio } = getParentSize(this.dom)
                    this.AppSetup.height = this.AppSetup.width * ratio
                    this.data.info.height = this.data.info.width * ratio
                }
                this.vapp.mount(this.dom)
                this.AppSetup.status = "display"
                console.log('%c灿display', 'color:#0aa100')
                return true
            } else {
                console.error(this.AppSetup.dom + '错误')
                return false
            }
        } else {
            console.warn('app没有创建')
            return false
        }
    }
    // 删除
    remove() {
        if (this.vapp) {
            let index = domlist.findIndex(item => item == this.dom)
            if (index > -1) {
                domlist.splice(index, 1)
            }
            this.vapp.unmount()
            this.vapp = null
            // 更改状态
            this.AppSetup.status = "remove"
            console.log('%c灿remove', 'color:#0aa100')
        }
    }
    // 销毁
    destroy(clearData) {
        if (clearData) {
            // 清除数据
            this.data.clearDataAll()
            // 清除动作插件（外置）
            this.controller.removeAll()
        }
        // 清除组件
        this.component.removeAll()
        // 清除动作事件
        Command.clear()
        // 卸载舞台应用
        this.remove()
        // 更改状态
        this.AppSetup.status = "destroy"
        console.log('%c灿destroy', 'color:#0aa100')
    }
    initSet(options) {
        options && Object.assign(this.AppSetup, options)
        return this.AppSetup
    }
    getvapp() {
        return this.vapp
    }
}
