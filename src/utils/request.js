/**
 * 获取服务端api接口数据
 */

import { network } from '../data/AppData'
import { jsonToParams } from './index'

let token = 'token'
let responseType = 'json'
export default function (_obj) {
   token = network.token || 'token'
   responseType = network.responseType || 'json'
   // 地址
   let url = /^(?!https?:\/\/)/.test(_obj.url) ? network.host + _obj.url : _obj.url
   // 令牌
   let authorization = localStorage.getItem(token) ? { 'Authorization': localStorage.getItem(token) } : {}
   // 完全自定义覆盖
   let customize = _obj.customize || {}
   // 头部信息
   let headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
   }
   // 如果 headers为'','null',false删除默认配置
   if (!network.headers || (typeof network.headers == 'string' && (network.headers == '' || network.headers == 'null'))) {
      headers = {}
   }
   // 请求对象
   let obj = Object.assign({
      method: _obj.method || network.method,
      mode: network.mode || 'cors',
      signal: _obj.signal,
      headers: new Headers(Object.assign(headers, authorization, _obj.headers))
   }, customize)
   if (obj.method.toUpperCase() == "POST") {
      obj.body = (obj.headers.get('Content-Type') == 'application/json') ? JSON.stringify(_obj.data) : _obj.data
   } else {
      url = /\?/.test(url) ? url + "&" + jsonToParams(_obj.data) : url + "?" + jsonToParams(_obj.data)
   }
   //    请求数据
   return new Promise((resolve, reject) => {
      fetch(url, obj).then(response => {
         if (responseType) {
            return response[responseType]()
         } else {
            return response.json()
         }
      }, reject).then(resolve);
   })
}