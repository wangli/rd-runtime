import { isReactive } from 'vue'
import isPlainObject from 'lodash/isPlainObject'
import getValue from 'lodash/get'
/**
 * 转换接口传参转换（数组转请求body值）
 * @param {Array} data 
 * @returns 
 */
export const getBodyData = function (data) {
    if (!this.appData) {
        console.warn('缺少数据源')
        return null
    }
    let _o = {}
    if (data && Array.isArray(data)) {
        data.forEach(element => {
            if (isPlainObject(element)) {
                if (typeof element.value == 'string' && element.key) {
                    let _val = this.appData.getDataSource(element.value)
                    if (_val) {
                        if (isReactive(_val)) {
                            _o[element.key] = element.path ? getValue(_val.data, element.path) : _val.data
                        } else {
                            _o[element.key] = element.path ? getValue(_val, element.path) : _val
                        }
                    } else {
                        _o[element.key] = element.value
                    }
                } else if (element.key) {
                    _o[element.key] = element.value
                }
            }
        })
    }
    return _o
}