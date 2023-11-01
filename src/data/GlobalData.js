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
      uptime: obj.uptime || '',
      trigger: obj.trigger
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
   /**
    * 新增一个数据对象
    * @param {*} value 值
    * @param {*} name 名称
    * @param {*} type 类型
    * @returns 
    */
   addGData(value, name = "", type = "source", trigger = null) {
      const remote = this.appData.rData
      let inData = null
      if (isPlainObject(value) && value.id) {
         // 添加已有数据
         if (this.data[value.id]) {
            // 返回当前存在的数据
            return this.data[value.id]
         }
         // 格式化原有数据
         inData = defineGData(value)
         // 远程数据赋值调用id
         if (inData.type == 'remote') {
            inData.value = remote.addRemote(inData.value).id
         }
      } else if (name) {
         // 新建数据并添加
         inData = defineGData({
            name,
            value: type == 'remote' ? remote.addRemote(value).id : value,
            type,
            trigger
         })
      } else {
         console.warn('无效全局数据添加,必须要有名称')
         return false
      }
      this.data[inData.id] = reactiveData(inData)
      this.dataList.push(this.data[inData.id])
      this.appData.watchDataTrigger(this.data[inData.id])
      return this.data[inData.id]

   }
   /**
    * 编辑一个数据对象
    * @param {string|object} res 
    * @param {object} value 
    * @returns 
    */
   editGData(res, value) {
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
   delGData(id) {
      if (this.data[id]) {
         removeArray(this.dataList, 'id', id)
         delete this.data[id]
      }
   }
   // 返回一个数据对象
   getGData(id) {
      return this.data[id] || null
   }
   // 返回所有数据列表(数组)
   getGDataList() {
      return this.dataList
   }
   // 清空数据
   clearData() {
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

