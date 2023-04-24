import { h, isReactive, resolveComponent } from 'vue'
import { getAppGlobal } from '@/utils'
import creatEvent from './creatEvent'

/**
 * 创建组件
 * @param {String} componentName 组件名称
 * @param {String|Object} pams 元件id或组件props
 * @param {String|Object} slots 用到插槽的内容
 * @returns 
 */
export default function (options) {
   const { name, props: pams, slots: coms, data } = options
   const myApp = {
      AppSetup: getAppGlobal('AppSetup'),
      data: getAppGlobal('data'),
      component: getAppGlobal('component')
   }
   const mData = myApp.data.mData

   let componentName = name
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
      const spriteData = data ? data : mData.getSprite(pams) || mData.getGroup(pams)
      if (!spriteData) { return }
      let props = { ...spriteData, key: pams }
      if (spriteData.id) {
         // 绑定事件
         let event = { myApp, events: spriteData.events || [], data: spriteData, componentName }
         Object.assign(props, creatEvent(event))
      }
      // 删除组件定义相关信息
      if (props['name']) delete props['name']
      if (props['mid']) delete props['mid']
      if (props['anim'] && props['anim'].name && myApp.AppSetup.interaction) {
         props['class'] = props['anim'].name
      } else if (typeof props['anim'] == 'string') {
         delete props['anim']
      }
      if (props['data']) {
         let _data = myApp.data.getDataSource(props['data'])
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
         let event = { myApp, events: pams.events || [], data: pams, componentName }
         Object.assign(props, creatEvent(event))
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