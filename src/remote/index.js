import { reactive } from "vue"
import { removeArray, getAppGlobal } from "@/utils"
import RemoteData from "./RemoteData"

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

// 远程接口列表
export const getList = function () {
   return remoteList
}
// 添加远程请求api的方法
export const add = function (options) {
   if (options.id && remotes[options.id]) {
      return remotes[options.id]
   } else {
      let data = new RemoteData(options, this)
      remoteList.push(data)
      remotes[data.id] = data
      return data
   }
}

const delRemote = function (id) {
   removeArray(remoteList, 'id', id)
   remotes[id].destroy()
   delete remotes[id]
   return id
}

// 删除api请求对象
export const del = function (val) {
   if (val) {
      if (remotes[val]) {
         return delRemote(val)
      } else {
         for (let key in remotes) {
            if (remotes[key].url == val) {
               delRemote(key)
            }
         }
         return val
      }
   } else {
      let keys = Object.keys(remotes)
      keys.forEach(key => {
         delRemote(key)
      })
      remoteList.splice(0, remoteList.length)
      return true
   }
}

// 返回一个远端的数据请求对象
export const getRemote = function (id, url = false) {
   if (remotes[id]) {
      return remotes[id]
   } else if (url) {
      for (let key in remotes) {
         if (remotes[key].url == id) {
            return remotes[key]
         }
      }
   }
   return null
}
// 清空数据
export const clearRemote = function () {
   del()
}
/**
 * 请求数据
 * @param {*} refresh 强制重新请求
 * @param {*} api 接口地址
 * @param {*} callback 完成回调方法
 * @returns 
 */
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