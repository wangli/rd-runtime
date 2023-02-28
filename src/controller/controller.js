import actions from './actions'
import Data from '../data'
import TypeModel from '../data/TypeModel'
import { CEVENTS } from '../events'


const uses = {}

const ActionTypes = TypeModel.actions
/**
 * 执行动作
 * @param {*} action 动作
 * @param {*} target 目标
 * @param {*} value 参数
 */
const executeAction = function (action, target, value) {
   if (actions[action]) {
      // 获取动作类型
      let actionType = ActionTypes.find(n => n.action == action)
      if (actionType) {
         // 类型存在
         let targetData = {}
         if (actionType.target == 'component' || actionType.target == 'components') {
            // 获取元件数据
            if (target instanceof Array) {
               targetData = []
               target.forEach(element => {
                  targetData.push(Data.getElement(element))
               });
            } else if (target) {
               targetData = Data.getElement(target)
            }
         } else if (actionType.target == 'app') {
            // 获取应用数据
            targetData = Data.getAppData()
         } else if (actionType.target == 'url') {
            // 一个打开外部链接动作
            targetData = target
         } else if (actionType.target == 'modules') {
            // 所有模块
            targetData = Data.getModuleList()
         } else if (actionType.target == 'module') {
            // 目标模块
            targetData = Data.getModule(target)
         }
         // 执行动作
         actions[action].call(actionType, targetData, value);
      } else {
         let myTargetData = Data.getElement(target) || Data.getModule(target)
         myTargetData && (targetData = myTargetData)
         // 执行动作
         actions[action].call({}, targetData, value);
      }
   } else {
      console.warn(item.action + '动作不存在')
   }
}


// 动作方法处理
export default {
   // 元件动作
   [CEVENTS.ACTION](res) {
      if (res.data) {
         if (res.data instanceof Array) {
            // 如果是一个数组
            res.data.forEach(item => {
               executeAction(item.action, item.target, item.value)
            });
         } else if (res.data instanceof Object && typeof res.data != 'function') {
            // 如果是单个动作对象
            executeAction(res.data.action, res.data.target, res.data.value)
         }
      }
   },
   // 应用动作
   [CEVENTS.APP_ACTION](res) {},
   // 添加一个动作
   useAction(_config) {
      let config = {
         name: _config.name || '无名动作',
         action: _config.action || null,
         target: _config.target || 'component',
         valueType: _config.valueType || null,
         value: _config.value || ""
      }
      if (ActionTypes.find(n => n.action == config.action)) {
         console.warn(_config, "已存在")
      } else if (config.action && _config.handle) {
         if (actions[config.action]) {
            console.warn(config.action + "动作已存在")
         } else {
            // 添加动作
            ActionTypes.push(config)
            actions[config.action] = _config.handle
            uses[config.action] = config
         }
      } else if (!config.action) {
         console.warn(_config, "缺少action名称")
      } else {
         console.warn(_config, "缺少动作方法函数")
      }
   },
   remove(action) {
      if (uses[action]) {
         let index = ActionTypes.findIndex(n => n.action == action)
         if (index > -1) {
            ActionTypes.splice(index, 1)
         }
         delete actions[action]
         delete uses[action]
      }
   },
   removeAll() {
      let keys = Object.keys(uses)
      keys.forEach(element => {
         this.remove(element)
      })
   }
}