import { reactive } from "vue"
import * as remote from '@/remote'

export default class RemoteData {
    remotes = reactive([])
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
                this.addRemote(element)
            })
        }
    }
    addRemote() {
        let data = remote.getRemote.call(this, ...arguments)
        if (!data) {
            data = remote.add.call(this.appData, ...arguments)
            if (data && data.id && this.remotes.findIndex(id => id == data.id) < 0) {
                this.remotes.push(data.id)
            }
        }
        return data
    }
    delRemote() {
        let id = remote.del.call(this, ...arguments)
        if (typeof id == 'string' && this.remotes[id]) {
            let index = this.remotes.findIndex(id => id == id)
            if (index >= 0) {
                this.remotes.splice(index, 1)
            }
        }
        return id
    }
    getRemote() {
        return remote.getRemote.call(this, ...arguments)
    }
    requestData() {
        return remote.requestData.call(this, ...arguments)
    }
    createExtractRule() {
        return remote.createExtractRule.call(this, ...arguments)
    }
    getRemoteList() {
        return this.remotes.map(id => remote.remotes[id].getData())
    }
    // 清空数据
    clearData() {
        this.remotes.forEach(id => {
            remote.del(id)
        })
        this.remotes.splice(0, this.remotes.length)
    }
}