import { reactive } from "vue"
import DataOptions from "./DataOptions"

export default class EventData {
    // 数据集合
    data = reactive({})
    appData = null

    constructor(appData, _data) {
        this.appData = appData
        // 初始数据
        _data && this.fillData(_data)
    }
    // 填充数据
    fillData(data) {
        if (typeof data != 'object') return;
        let keys = Object.keys(data)
        if (Array.isArray(keys)) {
            keys.forEach(key => {
                this.data[key] = data[key]
            })
        }
    }
    /**
     * 为事件添加一个动作
     * @param {string} actionId 动作id
     * @param {string} eventName 事件名称，通过元素id添加动作时，必须包含一个事件名称
     */
    addGAction = function (actionId, eventName = "launch") {

        let event = DataOptions.appEvents.find(n => n.event == eventName)
        if (event) {
            // 如果事件不存在，创建一个新的事件对象
            if (!this.data[eventName]) {
                this.data[eventName] = event
            }
            // 添加动作
            if (this.data[eventName].actions.findIndex(n => n == actionId) < 0) {
                this.data[eventName].actions.push(actionId)
            } else {
                console.warn(actionId + '当前动作已存在')
            }
        } else {
            console.warn("当前应用中" + eventName + '事件不存在')
        }
    }
    /**
     * 编辑一个数据对象
     * 编辑当前元素向触发的动作传值
     * @param {*} actionId 
     * @param {*} eventName 
     * @param {*} value 
     * @returns 
     */
    editGAction = function (actionId, eventName, value) {
        if (eventName) {
            if (this.data[eventName]) {
                if (typeof value != 'undefined') {
                    if (!this.data[eventName].actionValue) {
                        this.data[eventName].actionValue = {}
                    }
                    this.data[eventName].actionValue[actionId] = value
                }
            } else {
                console.warn("当前应用中" + eventName + '事件不存在')
            }
        }
    }
    /**
     * 删除事件上的动作
     * @param {*} eventName 事件名称
     * @param {string} actionId  动作id
     * @returns 
     */
    delGAction = function (eventName = "", actionId) {
        if (this.data[eventName] && actionId) {
            let index = this.data[eventName].actions.findIndex(n => n == actionId)
            if (index > -1) {
                this.data[eventName].actions.splice(index, 1)
            }
        } else if (this.data[eventName]) {
            delete this.data[eventName]
            return eventName
        }
    }
    // 返回一个数据对象
    getGAction = function (eventName) {
        return eventName ? this.data[eventName] : this.data
    }
    // 清空数据
    clearData = function () {
        let keys = Object.keys(this.data)
        keys.forEach(key => {
            delete this.data[key]
        })
    }
}

