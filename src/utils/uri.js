
// json转url参数
export const jsonToParams = function (data) {
    return data ? Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }).join("&") : ''
}

// 获取url参数值
export const getUrlParam = function (name, decode = true) {
    let url = location.href.slice(location.href.lastIndexOf('?'))
    let result = {}
    let reg = /([^?=&#]+)=([^?=&#]+)/g
    url.replace(reg, (n, x, y) => result[x] = decode ? decodeURIComponent(y) : y)
    return name ? result[name] || '' : result
}