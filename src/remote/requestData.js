import EventEmitter from 'eventemitter3'
import request from "../utils/request"
import { nanoid } from 'nanoid'
import { removeArray } from "../utils"

const reqs = {}
const ids = []

class RequestData extends EventEmitter {
   constructor(options) {
      super()
      this.id = "R_" + nanoid(10)
      this.controller = new AbortController()
      this.signal = this.controller.signal
      this.isloading = false
      this.status = 'wait'
      this.options = options
      this.data = null
      this.err = null
      // this.request()
   }
   //    请求数据
   request(callback) {
      if (this.status == 'request') return;
      this.isloading = true
      this.status = 'request'
      this.emit("request", this)
      request({
         url: this.options.url || "",
         data: this.options.body || {},
         method: this.options.method,
         signal: this.signal
      }).then(res => {
         this.data = res
         this.status = 'success'
         this.isloading = false
         this.err = null
         this.emit("success", res)
         callback && callback(this)
      }, err => {
         this.status = 'success'
         this.isloading = false
         this.err = err
         this.emit("error", err)
         callback && callback(this)
      })
   }
   destroy() {
      this.controller && this.controller.abort()
      this.controller = null
      this.signal = null
      this.isloading = null
      this.status = null
      this.options = null
      this.data = null
      this.err = null
      if (reqs[this.id]) {
         removeArray(ids, 'id', this.id)
         delete reqs[this.id]
      }
   }
}
// 添加一个新的请求对象
export default function (options) {
   let url = options.url || ""
   let body = options.body || {}
   let test = (url + JSON.stringify(body)).split("").sort().join("")
   let rid = ids.find(n => n.test == test)
   if (rid && reqs[rid.id]) {
      //    如果当前请求地址和参数相同，返回已有请求对象
      return reqs[rid.id]
   }
   let req = new RequestData(options)
   ids.push({
      id: req.id,
      test
   })
   reqs[req.id] = req
   return reqs[req.id]
}