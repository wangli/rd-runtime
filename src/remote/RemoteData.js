import EventEmitter from 'eventemitter3'
import isFinite from 'lodash/isFinite'
import requestData from './requestData'
import { reactive, ref, watch } from "vue"
import { jsonData, interval, extractData } from '@/utils'
import { nanoid } from 'nanoid'
import { getBodyData } from '@/helper/other'

/**
 * @param {string} url 接口地址
 * @param {object} extractRule 数据提取规则
 */
export default class extends EventEmitter {
   constructor(options, appData = {}) {
      super()
      const { id, url, extractRule, body, method, itval } = options
      this.appData = appData
      this.AppSetup = appData.AppSetup
      this.AppInfo = appData.info
      this.id = id || "RD_" + nanoid(10)
      this.url = url
      this.body = body
      this.method = method
      this.data = reactive({})
      this.sourceData = null
      // 加载状态
      this.loading = ref(false)
      this.isloading = false
      // 是否轮询请求（默认为0，大于0为间隔请求的秒数）
      this.itval = itval || 0
      this.it = null
      // 状态
      this.status = 'wait'
      // 错误信息
      this.err = null
      // 提取规则
      this.extractRule = extractRule ? reactive(extractRule) : reactive({})
      let req = requestData({ url, body: getBodyData.call(this, body), method }, this.AppInfo.network)
      req.on('request', () => {
         this.loading.value = true
         this.isloading = true
         this.status = 'request'
      })
      req.on('success', (res) => {
         this.sourceData = res
         this.status = 'success'
         this.loading.value = false
         this.isloading = false
         this.err = null
         this.fillData(res)
         this.emit("success", this)
      })
      req.on('error', (err) => {
         this.status = 'success'
         this.loading.value = false
         this.isloading = false
         this.err = err
         this.emit("error", err)
      })
      this.req = req
      this.unwatch = null
      // 监听规则变化
      this.watchRule()
   }
   watchRule() {
      this.stopWatch()
      // 监听规则变化
      this.watch = watch(this.extractRule, () => {
         this.sourceData && this.fillData(this.sourceData)
      })
      this.sourceData && this.fillData(this.sourceData)
   }
   stopWatch() {
      if (this.unwatch) {
         this.unwatch()
         this.unwatch = null
      }
   }
   setData(info = {}) {
      if (info.url) {
         this.url = info.url
         this.req.options.url = info.url
      }
      if (info.method) {
         this.method = info.method
         this.req.options.method = info.method
      }
      if (info.body) {
         this.body = info.body
         this.req.options.body = getBodyData.call(this.appData, info.body)
      }
      if (isFinite(info.itval)) {
         this.itval = info.itval
      }
   }
   // 修改规则
   setExtractRule(extractRule) {
      if ((this.extractRule instanceof Array && extractRule instanceof Array) || (this.extractRule instanceof Object && extractRule instanceof Object && !Array.isArray(this.extractRule) && !Array.isArray(extractRule))) {
         for (const key in this.extractRule) {
            delete this.extractRule[key]
         }
         Object.assign(this.extractRule, extractRule)
      } else {
         this.extractRule = reactive(jsonData(extractRule))
         this.watchRule()
      }
   }
   // 返回规则（返回的是一个非响应式的数据对象）
   getExtractRule() {
      return jsonData(this.extractRule)
   }
   //    请求数据
   request(callback) {
      this.req.request(callback)
      this.setinterval(this.itval)
   }
   // 开启轮询请求
   setinterval(timeval = 0) {
      if (this.AppSetup.interaction) {
         if (timeval && timeval > 0) {
            this.it = interval.add(() => {
               this.req.request()
            }, timeval * 1000)
         }
      }
   }
   // 关闭轮询请求
   stopInterval() {
      if (this.it) {
         interval.del(this.it)
         this.it = null
      }
   }
   //    清除数据
   clearData() {
      if (this.status == 'request' && this.req.controller) {
         this.req.controller.abort()
      }
      let keys = Object.keys(this.data)
      keys.forEach(key => {
         delete this.data[key]
      });
   }
   // 返回数据内容
   getData() {
      return {
         id: this.id,
         url: this.url,
         body: this.body || "",
         method: this.method || "",
         itval: this.itval || 0,
         extractRule: this.extractRule || ""
      }
   }
   /**
    * 填充数据
    * @param {*} data 
    */
   fillData(data) {
      // 清除数据
      this.clearData()
      if (this.extractRule && (this.extractRule.x || this.extractRule.name || this.extractRule instanceof Array)) {
         // 如果存在接口数据提取规则，将提取数据后赋值
         Object.assign(this.data, { data: extractData(data, this.extractRule) })
      } else {
         Object.assign(this.data, { data })
      }
   }
   /**
    * 销毁
    */
   destroy() {
      this.req.destroy()
      this.clearData()
      this.stopWatch()
      this.stopInterval()
      this.extractRule = null
   }
}