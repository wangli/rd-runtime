import { h, isReactive, resolveComponent } from 'vue'
import { getSpriteData, getGroup } from '../data/ElementData'
import { getDataSource } from '../helper'
import creatEvent from './creatEvent'
import getAppSetup from '@/utils/getAppSetup'
/**
 * 创建组件
 * @param {String} componentName 组件名称
 * @param {String|Object} pams 元件id或组件props
 * @param {String|Object} coms 用到插槽的内容
 * @returns 
 */
export default function (componentName, pams, coms = "") {
   const AppSetup = getAppSetup()
   let component = null;
   if (!componentName) {
      console.warn('数据缺少组件' + pams);
      component = "div";
   } else {
      component = resolveComponent(componentName);
      if (component == componentName) {
         console.warn(component + '组件没有找到');
         component = "div";
      }
   }
   if (typeof pams == 'string') {
      // 如果是元件id
      const spriteData = getSpriteData(pams) || getGroup(pams)
      if (!spriteData) { return }
      let props = { ...spriteData, key: pams }
      if (spriteData.id) {
         // 绑定事件
         Object.assign(props, creatEvent(spriteData.events || [], spriteData, componentName))
      }
      // 删除组件定义相关信息
      if (props['name']) delete props['name']
      if (props['mid']) delete props['mid']
      if (props['anim'] && props['anim'].name && AppSetup.interaction) {
         props['class'] = props['anim'].name
      } else if (typeof props['anim'] == 'string') {
         delete props['anim']
      }
      if (props['data']) {
         let _data = getDataSource(props['data'])
         if (_data) {
            if (isReactive(_data)) {
               props['data'] = _data.data || _data
            } else {
               props['data'] = _data
            }
         }
      }

      return h(component, props)
   } else if (typeof pams != 'undefined') {
      // 如果是模块或组合
      let props = { ...pams };
      if (pams.events || pams.type == 'group') {
         Object.assign(props, creatEvent(pams.events || [], pams, componentName))
      }
      props['ref'] = props.id
      // 删除组件定义相关信息
      if (props['name']) delete props['name']
      if (props['mid']) delete props['mid']

      return h(component, props, coms)
   } else {
      // 无信息返回组件
      return h(component, {}, "")
   }
}