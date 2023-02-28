import { install, components, simpleComponents, getComponentItems, delComponent, reload } from './components'
import { nanoid } from 'nanoid'
import TypeModel from '../data/TypeModel'


var componentArray = []
export default {
   // 当前已安装组件
   get items() {
      return simpleComponents
   },
   getComponentItems,
   // 返回组件默认数据
   getComponentDefaultData(name) {
      let component = components[name]
      if (!component) return {}
      let data = {}
      let mixins = component['mixins'] || []
      let props = {}
      for (const val of mixins) {
         if (val['props']) {
            Object.assign(props, val['props'])
         }
      }
      Object.assign(props, component['props'])
      for (const key in props) {
         if (Object.hasOwnProperty.call(props, key)) {
            const element = props[key];
            if (typeof element['default'] == 'function') {
               data[key] = element['default'].call()
            } else {
               data[key] = element['default']
            }
         }
      }
      data['id'] = 'sprite_' + nanoid(10)
      data['name'] = name
      data['type'] = component.type || ""
      return data;
   },
   // 返回组件自定义事件
   getComponentEvents(name) {
      let component = components[name]
      if (!component) return []
      let data = []
      let emits = component['emits'] || []
      for (const key in emits) {
         data.push({
            name: emits[key],
            event: emits[key],
            pams: '',
            actions: /^solo-/.test(name) ? null : []
         })
      }
      return data
   },
   // 返回组件事件（含默认事件）
   getEvents(name) {
      return [...TypeModel.events, ...this.getComponentEvents(name)]
   },
   // 添加组件
   add(com) {
      if (com) {
         if (Array.isArray(com)) {
            com.forEach(element => {
               if (componentArray.find(item => item.name == element.name)) {
                  console.warn(element.name + '组件名重复')
               } else {
                  componentArray.push(element)
               }
            })
         } else {
            if (componentArray.find(item => item.name == com.name)) {
               console.warn(com.name + '组件名重复')
               return false
            } else {
               componentArray.push(com)
               return true
            }
         }
      }
   },
   // 删除所有组件
   removeAll() {
      componentArray = []
      delComponent(Object.keys(components))
   },
   // 安装组件
   install(com) {
      if (com) {
         // 安装单个组件
         if (Array.isArray(com)) {
            com.forEach(element => {
               if (this.add(element)) {
                  install(element)
               }
            });
         } else {
            if (this.add(com)) {
               install(com)
            }
         }
      } else {
         install(componentArray)
      }
   },
   reload() {
      reload()
   }
}