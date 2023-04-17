import { h, onMounted, reactive, isVNode, watch, getCurrentInstance } from 'vue'
import createSprite from './createSprite'
import myData from '../data'
import { jsonData } from '../utils'
import { EVENTS } from '../events'
import cmd from '../command'
export default {
   name: 'stage',
   props: {
      background: {
         type: Object,
         default() {
            return {}
         }
      },
      content: {
         type: Object,
         default() {
            return {}
         }
      },
      fixed: {
         type: Object,
         default() {
            return {}
         }
      },
      overlayer: {
         type: Object,
         default() {
            return {}
         }
      },
      popwin: {
         type: Object,
         default() {
            return {}
         }
      },
      slots: [Object, Array]
   },
   setup(props) {
      const { appContext: { config: { globalProperties: global } } } = getCurrentInstance()
      const modules = myData.getModules()
      const appData = myData.getAppData()
      const pages = reactive({})
      const slots = isVNode(props.slots) ? [props.slots] : []
      if (slots.length == 0) {
         if (Array.isArray(props.slots)) {
            props.slots.forEach(element => {
               slots.push(h(element))
            })
         } else if (props.slots) {
            slots.push(h(props.slots))
         }
      }

      watch(modules, newPages => {
         Object.assign(pages, JSON.parse(JSON.stringify(newPages)))
      }, { deep: true })

      onMounted(() => {
         cmd.emit(EVENTS.STAGE_MOUNTED)
      })
      return () => {
         // 舞台内容分层显示容器组件
         var containerList = []
         // 主内容层
         const content = []
         // 固定内容
         const fixed = []
         // 弹层
         const overlayer = []
         // 遍历模块数据
         for (const key in pages) {
            if (pages.hasOwnProperty.call(pages, key)) {
               const item = pages[key];
               if (typeof item.visible == 'undefined' || item.visible == true) {
                  if (item.type == 'content') {
                     content.push(item)
                  } else if (item.type == 'fixed') {
                     fixed.push(item)
                  } else if (item.type == 'overlayer') {
                     overlayer.push(item)
                  }
               }
            }
         }
         containerList.push(createSprite({ AppSetup: global.AppSetup, name: 'vx-background', pams: props.background }), ...slots)
         if (content.length > 0) {
            containerList.push(createSprite({ AppSetup: global.AppSetup, name: 'vx-content', pams: { modules: content } }))
         }
         if (fixed.length > 0) {
            containerList.push(createSprite({ AppSetup: global.AppSetup, name: 'vx-fixed', pams: { modules: fixed } }))
         }
         if (overlayer.length > 0) {
            containerList.unshift(createSprite({ AppSetup: global.AppSetup, name: 'vx-mask' }))
            containerList.push(createSprite({ AppSetup: global.AppSetup, name: 'vx-overlayer', pams: { modules: overlayer } }))
         }

         // 用户自定义弹层窗口
         containerList.push(createSprite({ AppSetup: global.AppSetup, name: 'vx-popwin', pams: props.popwin }))
         // 消息提醒弹层
         containerList.push(createSprite({ AppSetup: global.AppSetup, name: 'vx-message' }))

         let style = {
            position: 'absolute',
            width: appData.size.width ? appData.size.width + "px" : "100%",
            height: appData.size.height ? appData.size.height + "px" : "100%",
            top: 0,
            left: 0,
            transformOrigin: "0 0",
            transform: appData.transform.value,
            zIndex: 0,
            userSelect: 'none',
            ...jsonData(appData.background)
         }
         return h('div', {
            id: "vx-stage",
            style,
            onclick(event) {
               cmd.emit(EVENTS.CLICK_STAGE, event)
            }
         }, containerList)
      }
   }
}