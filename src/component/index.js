import { reactive } from 'vue'
import { nanoid } from 'nanoid'
import { removeArray } from "@/utils"
import TypeModel from '@/data/TypeModel'
import baseMixin from './baseMixin'
import merge from 'lodash/merge'


class AppComponent {
   app = null
   // 所有已安装组件
   iComponents = {}
   // 所有已安装组件的信息内容
   iComponentsInfo = reactive({})
   // 所有组件
   componentItems = []

   constructor(app) {
      this.app = app
   }
   // 返回组件列表
   getItems() {
      return Object.values(this.iComponents)
   }
   // 返回组件默认数据
   getDefaultData(name) {
      let component = this.iComponents[name]
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
      return data
   }
   // 返回组件自定义事件
   getMyEvents(name) {
      let component = this.iComponents[name]
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
   }
   // 返回组件事件（含默认事件）
   getEvents(name) {
      return [...TypeModel.events, ...this.getMyEvents(name)]
   }
   // 添加组件（放入未安装列表）
   add(com) {
      if (!com) return false;
      if (Array.isArray(com)) {
         com.forEach(element => {
            if (this.componentItems.find(item => item.name == element.name)) {
               console.warn(element.name + '组件名重复')
            } else {
               this.componentItems.push(element)
            }
         })
         return true
      } else {
         if (this.componentItems.find(item => item.name == com.name)) {
            console.warn(com.name + '组件名重复')
            return false
         } else {
            this.componentItems.push(com)
            return true
         }
      }
   }
   // 删除组件
   del(key) {
      if (key && typeof key == 'string') {
         removeArray(this.componentItems, 'name', key)
         if (this.iComponents[key]) {
            delete this.iComponents[key]
            delete this.iComponentsInfo[key]
         }
      } else if (Array.isArray(key)) {
         key.forEach(k => this.del(k))
      }
   }
   // 删除所有组件
   delAll() {
      this.del(Object.keys(this.iComponents))
   }
   // 安装组件（注册组件到vue实例上）
   __install(component) {
      if (component && component.name) {
         if (this.iComponents[component.name]) {
            console.warn('重复组件名:' + component.name)
         } else {
            let item = merge({}, baseMixin, component)
            this.iComponents[component.name] = item
            this.iComponentsInfo[item.name] = {
               name: item.name,
               type: item.type,
               label: item.label,
               icon: item.icon,
            }
            if (this.app && this.app.vapp) {
               this.app.vapp.component(component.name, components[component.name])
            } else {
               console.error('组件注册失败，缺少vapp')
            }
         }
      } if (Array.isArray(component)) {
         component.forEach(item => this.__install(item))
      } else if (component) {
         console.warn('缺少组件名')
      }
   }
   // 安装组件
   install(com) {
      if (com) {
         if (!Array.isArray(com)) {
            if (this.add(com)) {
               this.__install(com)
            }
         } else if (Array.isArray(com)) {
            com.forEach(item => this.install(item))
         }
      } else {
         this.__install(this.componentItems)
      }
   }
   // 重装组件（一般应用与vue实例变更）
   reload() {
      let items = Object.values(this.iComponents)
      items.forEach(component => {
         if (this.app && this.app.vapp) {
            this.iComponents[component.name] = merge({}, baseMixin, component)
            this.app.vapp.component(component.name, this.iComponents[component.name])
         } else {
            console.error('组件注册失败，缺少app')
         }
      })
   }
}

export default AppComponent