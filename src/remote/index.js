import { reactive } from "vue";
import createRemoteData from "./createRemoteData";
import { removeArray } from "../utils"
import isPlainObject from 'lodash/isPlainObject'

/**
 * 远端数据
 */
export const remotes = {}
const remoteList = reactive([])

// 创建规则

export const createExtractRule = function () {
   return reactive({
      x: {
         name: '',
         path: '',
         mapKey: ''
      },
      y: []
   })
}
//判断是否存在此请求
const issetApi = function (api) {
   for (let key in remotes) {
      if (remotes[key].url == api) {
         return remotes[key]
      }
   }
   return false
}
// 远程接口列表
export const getList = function () {
   return remoteList
}
// 添加远程请求api的方法
export const add = function (value, extractRule = null, body = null, method = null, itval = null) {
   let data = null
   if (isPlainObject(value)) {
      data = createRemoteData(value.url, value.extractRule, value.body, value.method, value.itval)
      value.id && (data.id = value.id)
      remoteList.push(data)
      remotes[data.id] = data
   } else if (typeof value == 'string') {
      if (!remotes[value]) {
         data = createRemoteData(value, extractRule, body, method, itval)
         remoteList.push(data)
         remotes[data.id] = data
      } else {
         return remotes[value]
      }
   }
   return data
}

const delRemote = function (id) {
   removeArray(remoteList, 'id', id)
   remotes[id].destroy()
   delete remotes[id]
}

// 删除api请求对象
export const del = function (val) {
   if (val) {
      if (remotes[val]) {
         delRemote(val)
      } else {
         for (let key in remotes) {
            if (remotes[key].url == val) {
               delRemote(key)
            }
         }
      }
   } else {
      let keys = Object.keys(remotes)
      keys.forEach(key => {
         delRemote(key)
      })
      remoteList.splice(0, remoteList.length)
   }
}

// 返回一个远端的数据请求对象
export const getRemote = function (id) {
   if (remotes[id]) {
      return remotes[id]
   } else {
      for (let key in remotes) {
         if (remotes[key].url == id) {
            return remotes[key]
         }
      }
      return null
   }
}
// 清空数据
export const clearRemote = function () {
   del()
}
// 请求数据
export const requestData = function (refresh = false, api = "", callback) {
   if (api && remotes[api]) {
      remotes[api].request(callback)
   } else {
      for (let key in remotes) {
         if (remotes[key].status != 'success' || remotes[key].err || refresh) {
            if (api) {
               if (remotes[key].url == api) {
                  remotes[key].request(callback)
                  return
               }
            } else {
               remotes[key].request(callback)
            }
         }
      }
   }
}