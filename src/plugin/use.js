import loadjs from '../utils/loadjs'
import runtime from '../runtime'


// 安装插件
export const use = function (install) {
    if (install instanceof Function) {
        install(runtime)
    } else if (install && typeof install == 'object' && install.install && install.install instanceof Function) {
        install.install(runtime)
    }
}
// 异步插件安装
export const useAsync = function ({ url, name }) {
    return new Promise((resolve, reject) => {
        loadjs(url, function () {
            if (typeof name == 'string') {
                use(window[name])
            } else if (Array.isArray(name)) {
                name.forEach(element => {
                    use(window[element])
                })
            }
            resolve()
        })
    })
}
// 远程加载并应用

export const useAsyncLoad = function (items) {
    return new Promise((resolve, reject) => {
        if (Array.isArray(items)) {
            let promises = []
            items.forEach(element => {
                promises.push(useAsync(element))
            })
            Promise.all(promises).then(resolve, reject)
        } else {
            resolve()
        }
    })
}