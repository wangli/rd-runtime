import isPlainObject from 'lodash/isPlainObject'
import Data from './data'
import Component from './component'
import Controller from './controller'
import Command from './command'
import * as Helper from './helper'
import { initSet, getMyApp, destroyMyApp, createMyApp, displayMyApp } from './app'
import { AppSetup } from './config'
// 创建舞台
export const createStage = function (options, props) {
    if (AppSetup.status == 'none' || AppSetup.status == 'remove' || AppSetup.status == 'destroy') {
        initSet(options)
        Data.resetAppData()
        // 创建应用
        if (createMyApp(props)) {
            // 注册组件到应用
            Component.install()
            if (isPlainObject(options)) {
                // 显示到舞台
                displayStage(options)
            }
            return true
        } else {
            console.warn('应用已存在，不可重复创建')
            return false
        }
    } else {
        console.warn('应用创建失败')
        return false
    }
}
// 显示内容到舞台
export const displayStage = function (options) {
    let appSetup = initSet({})
    if (!getMyApp()) {
        if (createMyApp()) {
            Component.reload()
        }
    }
    if (appSetup.status != 'display') {
        if (typeof options == 'string') {
            appSetup = initSet({ dom: options })
        } else if (isPlainObject(options)) {
            appSetup = initSet(options)
        }
        // 显示舞台
        displayMyApp()
    } else {
        console.warn('舞台已显示')
    }
}

// 删除舞台
export const removeStage = function () {
    // 卸载舞台应用
    destroyMyApp()
}
// 销毁舞台
export const destroyStage = function (clearData = true) {
    if (clearData) {
        // 清除数据
        Data.clearDataAll()
        // 清除动作插件（外置）
        Controller.removeAll()
    }
    // 清除组件
    Component.removeAll()
    // 清除动作事件
    Command.clear()
    // 助手临时数据
    Helper.clear()
    // 卸载舞台应用
    destroyMyApp()
    // 更改状态
    AppSetup.status = "destroy"
    console.log('%c灿destroy', 'color:#0aa100')
}