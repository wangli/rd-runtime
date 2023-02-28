import app from '../app'
import baseMixin from './baseMixin'
import merge from 'lodash/merge'
import { reactive } from 'vue'

/**
 * 需要用户维护的组件管理
 */

// 已注册组件集合
export const components = {}
export const simpleComponents = reactive({})
// 添加组件
const addComponent = function (component) {
   if (component.name) {
      if (components[component.name]) {
         console.warn('重复组件名:' + component.name)
      } else {
         let item = merge({}, baseMixin, component)
         components[component.name] = item
         simpleComponents[item.name] = {
            name: item.name,
            type: item.type,
            label: item.label,
            icon: item.icon,
         }
         if (app.vm) {
            app.vm.component(component.name, components[component.name])
         } else {
            console.error('组件注册失败，缺少app')
         }
      }
   } else {
      console.warn('缺少组件名')
   }
}
export const delComponent = function (key) {
   if (Array.isArray(key)) {
      key.forEach(k => {
         if (components[k]) {
            delete components[k]
            delete simpleComponents[k]
         }
      })
   } else if (key && typeof key == 'string') {
      if (components[key]) {
         delete components[key]
         delete simpleComponents[key]
      }
   }
}
// 已注册组件列表
export const getComponentItems = function () {
   return Object.values(components)
}
/**
 * 安装组件通过外部添加
 * @param {*} com 
 */
export const install = function (com) {
   if (com instanceof Array) {
      com.forEach(element => {
         addComponent(element)
      });
   } else if (typeof com == 'object') {
      addComponent(com)
   }
}
// 重装组件
export const reload = function () {
   let items = Object.values(components)
   items.forEach(component => {
      if (app.vm) {
         components[component.name] = merge({}, baseMixin, component)
         app.vm.component(component.name, components[component.name])
      } else {
         console.error('组件注册失败，缺少app')
      }
   });
}