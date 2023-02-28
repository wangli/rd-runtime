import { reactive } from 'vue'
import { nanoid } from 'nanoid'
import isPlainObject from 'lodash/isPlainObject'
import { removeArray } from "../utils"

// 数据集合
const data = {}
const dataList = reactive([])

const initData = function (option) {
   let _data = Object.assign({
      id: "PD_" + nanoid(10),
      uptime: new Date().getTime()
   }, option)
   if (_data.name && !_data.title) {
      _data.title = _data.name
   }
   return reactive(_data)
}

export const addPlugin = function (option) {
   if (isPlainObject(option)) {
      if (option.id && data[option.id]) {
         console.warn('插件存在')
         return null
      } else if (option.url) {
         let pulugin = initData(option)
         data[pulugin.id] = pulugin
         dataList.push(pulugin)
         return data[pulugin.id]
      }
   }
   console.warn('插件添加失败', option)
   return null
}
export const delPlugin = function (id) {
   if (data[id]) {
      removeArray(dataList, 'id', id)
      delete data[id]
   } else if (id) {
      let pulugins = Object.values(data)
      let pulugin = pulugins.find(item => item.url == id)
      if (pulugin) {
         if (data[pulugin.id]) {
            removeArray(dataList, 'id', pulugin.id)
            delete data[pulugin.id]
         }
      }
   }
}
// 返回一个数据对象
export const getPlugin = function (id) {
   return data[id] || null
}

// 返回所有数据列表(数组)
export const getPluginList = function () {
   return dataList
}
// 清空数据
export const clearPlugin = function () {
   let keys = Object.keys(data)
   keys.forEach(key => {
      delete data[key]
   });
   dataList.splice(0, dataList.length)
}