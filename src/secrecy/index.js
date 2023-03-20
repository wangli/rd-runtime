import * as crypt from './rich_wasm'

// 读取文件
const readFile = function (file) {
    return new Promise((resolve, reject) => {
        if (file instanceof Blob) {
            var reader = new FileReader()
            reader.onload = function (evt) {
                resolve(evt.target.result)
            }
            reader.onerror = (event) => {
                reject(event)
            }
            reader.readAsArrayBuffer(file)
        } else {
            reject("不是二进制文件")
        }
    })
}
// 数据编码
export const encrypt = function (value) {
    let string = typeof value == 'string' ? value : JSON.stringify(value)
    let data = crypt.encrypt(string)
    let blob = new Blob([new Uint8Array(data).buffer])
    return blob
}

// 数据解码
export const decrypt = async function (file) {
    let data = null
    if (typeof file == 'string') {
        data = file
    } else if (file instanceof Blob) {
        let res = await readFile(file, 'buffer')
        let arr = Array.prototype.slice.call(new Uint8Array(res))
        data = crypt.decrypt(arr)
    } else if (file && typeof file == 'object' && typeof file != 'function' && !Array.isArray(file)) {
        return file
    }
    try {
        return JSON.parse(data)
    } catch (error) {
        Promise.reject('数据格式无效')
    }
}