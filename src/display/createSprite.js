import { h, isReactive, resolveComponent } from 'vue'
import { getAppGlobal } from '@/utils'
import createEvent from './createEvent'

/**
 * 创建组件
 * @param {String} componentName 组件名称
 * @param {String|Object} props 元素id或组件props
 * @param {String|Object} slots 用到插槽的内容
 * @returns 
 */
export default function (options) {
   const { name, props, slots, ref } = options
   const myApp = {
      AppSetup: getAppGlobal('AppSetup'),
      data: getAppGlobal('data'),
      component: getAppGlobal('component')
   }
   const mData = myApp.data.mData

   let componentName = name
   let component = null;
   if (!componentName) {
      console.warn('数据缺少组件' + props);
      component = "div";
   } else {
      component = resolveComponent(componentName);
      if (component == componentName) {
         console.warn(component + '组件没有找到');
         component = "div";
      }
   }
   if (typeof props == 'string') {
      // 如果是元素id
      const spriteData = mData.getElement(props)
      if (!spriteData) { return }
      let myProps = { id: props, options: spriteData.options, ref }
      if (spriteData.id) {
         // 绑定事件
         let event = { myApp, events: spriteData.events || [], data: spriteData, componentName }
         Object.assign(myProps, createEvent(event))
      }
      // 删除组件定义相关信息
      if (spriteData.data) {
         let _data = myApp.data.getDataSource(spriteData.data)
         // console.log(componentName, spriteData.title, _data, isReactive(_data))
         if (_data) {
            myProps.data = isReactive(_data) ? _data.data || _data : _data
         }
      }

      return h(component, myProps)
   } else if (typeof props != 'undefined') {
      // 如果是模块或组合
      let myProps = { ...props }
      if (props.events) {
         let event = { myApp, events: props.events || [], data: props, componentName }
         Object.assign(myProps, createEvent(event))
      }
      myProps['ref'] = ref || myProps.id
      // 删除组件定义相关信息
      if (myProps['name']) delete myProps['name']
      if (myProps['mid']) delete myProps['mid']

      return h(component, myProps, slots)
   } else {
      // 无信息返回组件
      return h(component, {}, "")
   }
}