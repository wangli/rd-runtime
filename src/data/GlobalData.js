import { reactive } from "vue"
import { getUrlParam, removeArray } from '@/utils'
import isPlainObject from 'lodash/isPlainObject'
import { defineGData } from './defineData'

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

export default class GlobalData {
   // 数据集合
   data = {}
   dataList = reactive([])
   appData = null

   constructor(appData, _data) {
      this.appData = appData
      // 初始数据
      _data && this.fillData(_data)
   }
   // 填充数据
   fillData(data) {
      // 添加一组url参数信息
      this.addGData({ id: 'GD_query', name: 'url参数', type: 'temp', value: { data: getUrlParam() } })
      if (Array.isArray(data)) {
         data.forEach(element => {
            this.addGData(element)
         })
      }
   }
   // 新增一个数据对象
   addGData = function (value, name = "", type = "source") {
      const remote = this.appData.rData
      if (isPlainObject(value) && value.id) {
         // 添加已有数据
         if (!this.data[value.id]) {
            if (value.type == 'remote') {
               value.value = remote.addRemote(value.value).id
               this.data[value.id] = reactiveData(value)
            } else {
               this.data[value.id] = reactiveData(value)
            }
            this.dataList.push(this.data[value.id])
            return this.data[value.id]
         } else {
            return this.data[value.id]
         }
      } else if (value) {
         // 新建数据并添加
         let newData = {}
         if (type == 'remote') {
            value = remote.addRemote(value).id
            newData = defineGData({ value, name, type })
         } else {
            newData = defineGData({ value, name, type })
         }
         this.data[newData.id] = reactiveData(newData)
         this.dataList.push(this.data[newData.id])
         return this.data[newData.id]
      } else {
         console.warn('无效全局数据添加')
         return false
      }
   }
   // 编辑一个数据对象
   editGData = function (res, value) {
      let id = null
      if (typeof res == 'string' && isPlainObject(value) && this.data[res]) {
         id = res
         this.data[id] = value
      } else if (isPlainObject(res) && typeof res.id == 'string' && this.data[res.id]) {
         id = res.id
         this.data[id] = res
      }
      if (id) {
         let index = this.dataList.findIndex(item => item.id == id)
         if (index > -1) {
            return this.dataList[index] = this.data[id]
         }
      }
      return false
   }
   // 删除一个数据对象
   delGData = function (id) {
      if (this.data[id]) {
         removeArray(this.dataList, 'id', id)
         delete this.data[id]
      }
   }
   // 返回一个数据对象
   getGData = function (id) {
      return this.data[id] || null
   }
   // 返回所有数据列表(数组)
   getGDataList = function () {
      return this.dataList
   }
   // 清空数据
   clearData = function () {
      let keys = Object.keys(this.data)
      keys.forEach(key => {
         delete this.data[key]
      });
      this.dataList.splice(0, this.dataList.length)
   }
   get GData() {
      return this.data
   }
}

