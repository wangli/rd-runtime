import { computed, watch, isRef } from 'vue'
import CMD from '@/command'
import getValue from 'lodash/get'
import jsCookie from 'js-cookie'
import * as remote from '@/remote'

// 缩放变形相关样式
export const getTransform = function () {
    return computed(() => {
        if (this.AppSetup.scale) {
            if (this.info.scaleMode == 'auto') {
                let size = { width: this.app.appInfo.value.width, height: this.app.appInfo.value.height }
                if (this.scale.w > this.scale.h) {
                    let mvx = size.width * (this.scale.w - this.scale.h) / 2 / this.scale.value;
                    return "scale(" + this.scale.value + ")  translateX(" + mvx + "px)"
                } else {
                    let mvy = size.height * (this.scale.h - this.scale.w) / 2 / this.scale.value;
                    return "scale(" + this.scale.value + ")  translateY(" + mvy + "px)"
                }
            } else if (this.info.scaleMode == 'fill') {
                return "scale(" + this.scale.w + "," + this.scale.h + ")"
            } else {
                return ''
            }
        } else {
            return ''
        }
    })
}


export const clearUnwatch = function () {
    this.unwatch.forEach(stop => stop())
    this.unwatch = []
    for (const key in this.filterDatas) {
        this.filterDatas[key] = null
    }
    this.filterDatas = {}
}

const judgeDataTrigger = function (data, operator, value) {
    let targetValue = this.getDataSource(value)
    switch (operator) {
        case '==':
            return data == targetValue;
        case '>':
            return data > targetValue;
        case '<':
            return data < targetValue;
        case '>=':
            return data >= targetValue;
        case '<=':
            return data <= targetValue;

        default:
            return false;
    }
}

const actionTrigger = function (action, actionValue) {
    if (this.aData.actions[action]) {
        let myAction = JSON.parse(JSON.stringify(this.aData.actions[action]))
        if (typeof actionValue != 'undefined' && actionValue != null) {
            myAction.value = actionValue
        }
        CMD.execute(myAction, '', this.info.id)
    }
}
export const watchDataTrigger = function (data) {
    if (data && data.id && data.trigger) {
        let operator = data.trigger.operator
        let value = data.trigger.value
        let action = data.trigger.action
        let actionValue = data.trigger.actionValue
        if (operator && action) {
            if (data.type == 'source') {
                this.unwatch.push(watch(data, newData => {
                    let srcData = isRef(newData.value) ? newData.value.value : newData.value
                    if (judgeDataTrigger.call(this, srcData, operator, value)) {
                        actionTrigger.call(this, action, actionValue)
                    }
                }, { deep: true }))
            } else if (data.type == 'remote' && typeof data.value == 'string') {
                let _remote = remote.getRemote(data.value)
                if (_remote) {
                    this.unwatch.push(watch(_remote.data, newData => {
                        if (judgeDataTrigger.call(this, newData.data, operator, value)) {
                            actionTrigger.call(this, action, actionValue)
                        }
                    }, { deep: true }))
                }
            }
        }
    }
}

/**
 * 根据全局数据对象或远程数据对象放回绑定的数据源
 * @param {*} value 
 * @returns *
 */
export const getDataSource = function (value) {
    if (typeof value != 'string') return value
    if (/^RD_\S{10}$/.test(value) && remote.remotes[value]) {
        return remote.remotes[value].data
    } else if (this.gData) {
        const { GData } = this.gData
        const unwatch = this.unwatch
        const filterDatas = this.filterDatas
        let gdid = value
        let path = null

        if (/.\?+./.test(value)) {
            let arr = value.split('?')
            gdid = arr[0]
            path = arr[1]
        }
        if (/(^GD_\S{10})|(^GD_query)$/.test(gdid) && GData[gdid]) {
            if (GData[gdid].type == 'remote') {
                let _remote = remote.getRemote(GData[gdid].value)
                if (_remote) {
                    if (path) {
                        if (!filterDatas[value]) {
                            filterDatas[value] = ref(null)
                            unwatch.push(watch(_remote.data, newData => {
                                filterDatas[value].value = getValue(newData.data || newData, path)
                            }, { immediate: true }))
                        }
                        return filterDatas[value]
                    } else {
                        return _remote.data
                    }
                } else {
                    return null
                }
            } else if (GData[gdid].type == 'local') {
                let value = GData[gdid].value
                let data = null
                if (value.source == 'cookie') {
                    data = jsCookie.get(value.key)
                } else {
                    let res = value.source == 'local' ? localStorage.getItem(value.key) : sessionStorage.getItem(value.key)
                    try {
                        data = JSON.parse(res)
                    } catch (error) {
                        data = res
                    }
                }
                if (data && typeof data == 'object' && path) {
                    return getValue(data, path)
                }
                return data
            } else {
                if (path) {
                    return getValue(GData[gdid].value, path)
                } else {
                    return GData[gdid].value
                }
            }
        }
    }
    return value
}