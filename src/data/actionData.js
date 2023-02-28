import { reactive } from 'vue'
import { nanoid } from 'nanoid'
// 动作数据集合
const actions = reactive({});

// 添加动作数据
export const setActionData = function (data) {
   if (data && typeof data == 'object') {
      let id = data.id = data.id || 'AC_' + nanoid(10)
      actions[id] = data
      return id
   } else {
      return null;
   }
}
// 删除动作数据
export const delActionData = function (id) {
   if (actions[id]) {
      delete actions[id]
   }
}
// 返回动作数据
export const getActionData = function (id) {
   return actions[id]
}
// 返回当前所有
export const getActionsData = function () {
   return actions
}
// 返回当前所有（数组）
export const getActionList = function (ids) {
   if (ids) {
      let list = []
      if (ids instanceof Array) {
         for (const key in ids) {
            list.push(actions[ids[key]])
         }
      } else if (typeof ids == 'string' && actions[ids]) {
         list.push(actions[ids])
      }
      return list
   } else {
      return Object.values(actions)
   }
}
/**
 * 清空数据
 */
export const clearAction = function () {
   let keys = Object.keys(actions)
   keys.forEach(key => {
      delete actions[key]
   });
}