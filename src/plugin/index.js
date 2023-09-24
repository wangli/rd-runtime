import loadjs from '@/utils/loadjs'

class Plugin {
    app = null
    appData = null
    panel = {}
    constructor(app) {
        this.app = app
        this.appData = app.data
    }
    // 安装插件
    use(install) {
        if (install instanceof Function) {
            install(this.app, this)
        } else if (install && typeof install == 'object' && install.install && install.install instanceof Function) {
            install.install(this.app, this)
        }
    }
    // 异步插件安装
    useAsync({ url, name }) {
        return new Promise((resolve, reject) => {
            loadjs([url], {
                success: () => {
                    if (typeof name == 'string') {
                        this.use(window[name])
                    } else if (Array.isArray(name)) {
                        name.forEach(element => {
                            this.use(window[element])
                        })
                    }
                    resolve()
                },
                error: (err) => reject(err)
            })
        })
    }
    // 远程加载并应用
    useAsyncLoad(items) {
        return new Promise((resolve, reject) => {
            if (Array.isArray(items)) {
                let promises = []
                items.forEach(element => {
                    promises.push(this.useAsync(element))
                })
                Promise.all(promises).then(resolve, reject)
            } else {
                resolve()
            }
        })
    }
}


export default Plugin