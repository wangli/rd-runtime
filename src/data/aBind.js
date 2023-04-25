import { computed } from 'vue'
import getValue from 'lodash/get'
import * as remote from '@/remote'

// 缩放变形相关样式
export const getTransform = function () {
    return computed(() => {
        if (this.AppSetup.scale) {
            if (this.info.scaleMode == 'auto') {
                let size = { width: this.info.width, height: this.info.height }
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
    for (const key in filterDatas) {
        filterDatas[key] = null
    }
    this.filterDatas = {}
}

/**
 * 根据全局数据对象或远程数据对象放回绑定的数据源
 * @param {*} value 
 * @returns 
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