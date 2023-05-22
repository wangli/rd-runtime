import { isReactive } from "vue"

// 处理组件的options内容
export default function (data, options) {
    let res = options ? JSON.stringify(options) : "{}"
    if (res) {
        const tplList = res.match(/\$\{(.+?)\}/g)
        if (tplList) {
            tplList.forEach(item => {
                let str = item.match(/\$\{(.+?)\}/)
                if (str && str[1]) {
                    let _data = data.getDataSource(str[1])
                    if (_data) {
                        if (isReactive(_data)) {
                            let mydata = _data.data || _data
                            res = res.replace(item, JSON.stringify(mydata))
                        } else if (typeof _data == 'string') {
                            res = res.replace(item, _data)
                        } else {
                            res = res.replace(item, JSON.stringify(_data))
                        }
                    }
                }
            })
        } else {
            return options
        }
    }

    return JSON.parse(res)
}