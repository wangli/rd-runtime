import loadjs from '@/utils/loadjs'

// 安装插件
export const use = function (install) {
    if (install instanceof Function) {
        install(this)
    } else if (install && typeof install == 'object' && install.install && install.install instanceof Function) {
        install.install(this)
    }
}
// 异步插件安装
export const useAsync = function ({ url, name }) {
    return new Promise((resolve, reject) => {
        loadjs([url], {
            success: () => {
                if (typeof name == 'string') {
                    use.call(this, window[name])
                } else if (Array.isArray(name)) {
                    name.forEach(element => {
                        use.call(this, window[element])
                    })
                }
                resolve()
            },
            error: (err) => reject(err)
        })
    })
}
// 远程加载并应用
export const useAsyncLoad = function (items) {
    return new Promise((resolve, reject) => {
        if (Array.isArray(items)) {
            let promises = []
            items.forEach(element => {
                promises.push(useAsync.call(this, element))
            })
            Promise.all(promises).then(resolve, reject)
        } else {
            resolve()
        }
    })
}