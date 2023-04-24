import { reactive } from "vue"
import isPlainObject from 'lodash/isPlainObject'
import { removeArray } from "@/utils"
import { definePlugin } from './defineData'

export default class PluginData {
    // 数据集合
    data = {}
    dataList = reactive([])
    appData = null

    constructor(appData, _data) {
        this.appData = appData
        // 初始数据
        _data && this.fillData(_data)
    }
    // 填充数据
    fillData(data) {
        if (Array.isArray(data)) {
            data.forEach(element => {
                this.addPlugin(element)
            })
        }
    }
    addPlugin(option) {
        if (isPlainObject(option)) {
            if (option.id && this.data[option.id]) {
                console.warn('插件存在')
                return null
            } else if (option.url) {
                let pulugin = definePlugin(option)
                this.data[pulugin.id] = pulugin
                this.dataList.push(pulugin)
                return this.data[pulugin.id]
            }
        }
        console.warn('插件添加失败', option)
        return null
    }
    delPlugin(id) {
        if (this.data[id]) {
            removeArray(this.dataList, 'id', id)
            delete this.data[id]
        } else if (id) {
            let pulugins = Object.values(this.data)
            let pulugin = pulugins.find(item => item.url == id)
            if (pulugin) {
                if (this.data[pulugin.id]) {
                    removeArray(this.dataList, 'id', pulugin.id)
                    delete this.data[pulugin.id]
                }
            }
        }
    }// 返回一个数据对象
    getPlugin = function (id) {
        return this.data[id]
    }

    // 返回所有数据列表(数组)
    getPluginList = function () {
        return this.dataList
    }
    // 清空数据
    clearData = function () {
        let keys = Object.keys(this.data)
        keys.forEach(key => {
            delete this.data[key]
        });
        this.dataList.splice(0, this.dataList.length)
    }
}