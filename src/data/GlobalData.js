import { reactive, ref } from "vue"
import { nanoid } from 'nanoid'
import * as remote from '../remote'
import { removeArray } from "../utils"
import isPlainObject from 'lodash/isPlainObject'

// 数据集合
const data = {}
const dataList = reactive([])

const initData = function (value = "", name = "", type = "source") {
   return {
      id: "GD_" + nanoid(10),
      name,
      type,
      value: (value instanceof Object) ? reactive(value) : ref(value),
      uptime: new Date().getTime()
   }
}

const reactiveData = function (obj) {
   return reactive({
      get id() {
         return obj.id || ""
      },
      get type() {
         return obj.type || ""
      },
      name: obj.name,
      value: obj.value,
      uptime: obj.uptime || ''
   })
}

// 新增一个数据对象
export const addGData = function (value, name = "", type = "source") {
   if (isPlainObject(value) && value.id) {
      // 添加已有数据
      if (!data[value.id]) {
         if (value.type == 'remote') {
            value.value = remote.add(value.value).id
            data[value.id] = reactiveData(value)
         } else {
            data[value.id] = reactiveData(value)
         }
         dataList.push(data[value.id])
         return data[value.id]
      } else {
         return data[value.id]
      }
   } else if (value) {
      // 新建数据并添加
      let newData = {}
      if (type == 'remote') {
         value = remote.add(value).id
         newData = initData(value, name, type)
      } else {
         newData = initData(value, name, type)
      }
      data[newData.id] = reactiveData(newData)
      dataList.push(data[newData.id])
      return data[newData.id]
   } else {
      console.warn('无效全局数据添加')
      return false
   }
}
// 编辑一个数据对象
export const editGData = function (res, value) {
   let id = null
   if (typeof res == 'string' && isPlainObject(value) && data[res]) {
      id = res
      data[id] = value
   } else if (isPlainObject(res) && typeof res.id == 'string' && data[res.id]) {
      id = res.id
      data[id] = res
   }
   if (id) {
      let index = dataList.findIndex(item => item.id == id)
      if (index > -1) {
         return dataList[index] = data[id]
      }
   }
   return false
}
// 删除一个数据对象
export const delGData = function (id) {
   if (data[id]) {
      removeArray(dataList, 'id', id)
      delete data[id]
   }
}

// 返回一个数据对象
export const getGData = function (id) {
   return data[id] || null
}

// 返回所有数据列表(数组)
export const getGDataList = function () {
   return dataList
}
// 清空数据
export const clearGlobal = function () {
   let keys = Object.keys(data)
   keys.forEach(key => {
      delete data[key]
   });
   dataList.splice(0, dataList.length)
}
export const GData = data

// 默认输出完整数据对象
export default data