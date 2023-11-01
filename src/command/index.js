import EventEmitter from 'eventemitter3'
import buffer from './buffer'
import { CEVENTS } from '@/events'
import { jsonData } from '@/utils'

// 事件监听
const evtCenter = new EventEmitter()

/**
 * 根据事件委托命令发送中心
 * @module command
 */
const command = {
   /**
    * 添加需要托管的eventObj对象事件
    * @param {string} eventName 事件名称
    * @param {function} fun 事件方法
    * @param {object} eventObj  委托对象
    */
   addEventListener(eventName, fun, eventObj = null) {
      // 注册命令事件
      evtCenter.on(eventName, fun, eventObj)
   },
   /**
    * 删除托管的eventObj对象事件
    * @param {string} eventName 事件名称
    * @param {function} fun 委托对象
    * @param {object} eventObj  委托对象
    */
   removeEventListener(eventName, fun, eventObj) {
      if (eventObj && fun) {
         evtCenter.off(eventName, fun, eventObj)
      } else if (fun) {
         evtCenter.off(eventName, fun)
      } else {
         evtCenter.off(eventName)
      }
   },
   /**
    * 清除所有
    */
   clear(event) {
      evtCenter.removeAllListeners(event)
   },
   /**
    * 发送命令
    * @param {string} eventName 事件名称
    * @param {object} args 参数 
    * @param {boolean} force 强制发送
    */
   emit(eventName, args, force = false) {
      if (typeof force == 'boolean' && force) {
         evtCenter.emit(eventName, args)
      } else if (buffer(eventName, args)) {
         let len = arguments.length
         if (len <= 3) {
            evtCenter.emit(eventName, args, force)
         } else {
            let _args = []
            for (i = 1; i < len; i++) {
               _args[0] = arguments[i]
            }
            evtCenter.emit(eventName, ..._args)
         }
      }
   },
   /**
    * 执行命令
    * @param {*} action 动作
    * @param {*} sprid 操作元素id
    * @param {*} appid 来自应以id
    */
   execute(action, sprid = "", appid) {
      let sendData = {
         sprid,
         appid,
         data: jsonData(action)
      }
      this.emit(CEVENTS.ACTION, sendData)
   },
   /**
    * 消息提示
    */
   message(val) {
      this.emit('message-send', val)
   },
   /**
    * 执行元素内的cmdRunning方法
    * @param {string} id 元素id 
    * @param {*} data 
    */
   running(id, data) {
      this.emit('run_function_' + id, data)
   },
   /**
    * 执行数据更新
    * @param {string} sprid 目标对象id 
    * @param {*} value 数据值
    */
   reviewData(sprid, value) {
      this.emit(CEVENTS.ACTION, {
         data: {
            action: 'reviewData',
            sprid,
            value
         }
      })
   }
}

export default command