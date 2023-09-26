import { initActions } from './actions'
import { CEVENTS } from '@/events'
import DataOptions from '@/data/DataOptions'

const ActionTypes = DataOptions.actions

const defineAction = function (_config) {
   return {
      name: _config.name || '无名动作',
      action: _config.action || null,
      target: _config.target || 'component',
      valueType: _config.valueType || null,
      value: _config.value || ""
   }
}

/**
 * 执行动作，需要绑定控制器
 * @param {string} action 动作
 * @param {*} target 目标
 * @param {*} value 参数
 */
const executeAction = function (action, target, value) {
   if (this.actions[action]) {
      let { data: { mData: ElementData, rData: remoteData } } = this.app
      // 获取动作类型
      let actionType = ActionTypes.find(n => n.action == action)
      if (actionType) {
         // 类型存在
         let targetData = {}
         if (actionType.target == 'component' || actionType.target == 'components') {
            // 获取元素数据
            if (target instanceof Array) {
               targetData = []
               target.forEach(element => {
                  targetData.push(ElementData.getElement(element))
               });
            } else if (target) {
               targetData = ElementData.getElement(target)
            }
         } else if (actionType.target == 'app') {
            // 获取应用数据
            targetData = data.getAppData()
         } else if (actionType.target == 'url') {
            // 一个打开外部链接动作
            targetData = target
         } else if (actionType.target == 'modules') {
            // 所有模块
            targetData = ElementData.getModuleList()
         } else if (actionType.target == 'module') {
            // 目标模块
            targetData = ElementData.getModule(target)
         } else if (actionType.target == 'remote') {
            // 远程请求
            targetData = remoteData.getRemote(target, true)
         }
         // 执行动作
         this.actions[action].call(this.app, targetData, value);
      } else {
         let myTargetData = ElementData.getElement(target) || ElementData.getModule(target)
         myTargetData && (targetData = myTargetData)
         // 执行动作
         this.actions[action].call(this.app, targetData, value);
      }
   } else {
      console.warn(action + '动作不存在')
   }
}

// 处理动作
export const ActionTrigger = {
   // 元素动作
   [CEVENTS.ACTION](res) {
      if (res.data && res.appid == this.app.id) {
         if (res.data instanceof Array) {
            // 如果是一个数组
            res.data.forEach(item => {
               executeAction.call(this, item.action, item.target, item.value)
            });
         } else if (res.data instanceof Object && typeof res.data != 'function') {
            // 如果是单个动作对象
            executeAction.call(this, res.data.action, res.data.target, res.data.value)
         }
      }
   },
   // 应用动作
   [CEVENTS.APP_ACTION]() { }
}

export class Controller {
   app = null
   // 动作方法集合
   actions = initActions()
   // 外部插件添加的动作（用于可删除操作）
   uses = {}
   constructor(app) {
      this.app = app
   }
   /**
    * 添加一个动作
    * @param {object} _config 
    */
   useAction(_config) {
      let config = defineAction(_config)
      if (ActionTypes.find(n => n.action == config.action)) {
         console.warn(_config, "已存在")
      } else if (config.action && _config.handle) {
         if (this.actions[config.action]) {
            console.warn(config.action + "动作已存在")
         } else {
            // 添加动作
            ActionTypes.push(config)
            this.actions[config.action] = _config.handle
            this.uses[config.action] = config
         }
      } else if (!config.action) {
         console.warn(_config, "缺少action名称")
      } else {
         console.warn(_config, "缺少动作方法函数")
      }
   }
   // 删除动作
   remove(action) {
      if (this.uses[action]) {
         let index = ActionTypes.findIndex(n => n.action == action)
         if (index > -1) {
            ActionTypes.splice(index, 1)
         }
         delete this.actions[action]
         delete this.uses[action]
      }
   }
   // 删除所有动作
   removeAll() {
      let keys = Object.keys(this.uses)
      keys.forEach(element => {
         this.remove(element)
      })
   }
}
