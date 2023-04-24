import CMD from '../command'
import { CEVENTS } from '../events'
import Controller from './controller'
export default function (app) {
   /**
    * 将相关事件与动作绑定
    * 控制中心的任务是将个动作方法注册到事件中心，通过事件来触发动作命令
    * CEVENTS是一个事件触发类型常量
    * controller包含了根据相关事件对应的方法内处理的动作
    */
   const ctl = new Controller(app)
   for (const key in CEVENTS) {
      let event = CEVENTS[key]
      if (ctl[event]) {
         CMD.addEventListener(event, ctl[event], ctl)
      }
   }
   return ctl
}