import { h, onMounted, isVNode } from 'vue'
import { jsonData, getAppGlobal } from '@/utils'
import { EVENTS } from '@/events'
import createSprite from './createSprite'
import cmd from '@/command'
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
      const data = getAppGlobal('data')
      const modules = data.mData.modules.getModules()
      const appData = data.getAppData()
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
         for (const key in modules) {
            if (modules.hasOwnProperty.call(modules, key)) {
               const item = modules[key];
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
         containerList.push(createSprite({ name: 'vx-background', props: props.background }), ...slots)
         
         if (content.length > 0) {
            containerList.push(createSprite({ name: 'vx-content', props: { modules: content } }))
         }
         if (fixed.length > 0) {
            containerList.push(createSprite({ name: 'vx-fixed', props: { modules: fixed } }))
         }
         if (overlayer.length > 0) {
            containerList.unshift(createSprite({ name: 'vx-mask' }))
            containerList.push(createSprite({ name: 'vx-overlayer', props: { modules: overlayer } }))
         }

         // 用户自定义弹层窗口
         containerList.push(createSprite({ name: 'vx-popwin', props: props.popwin }))
         // 消息提醒弹层
         containerList.push(createSprite({ name: 'vx-message' }))

         let style = {
            position: 'absolute',
            width: appData.info.width ? appData.info.width + "px" : "100%",
            height: appData.info.height ? appData.info.height + "px" : "100%",
            top: 0,
            left: 0,
            transformOrigin: "0 0",
            transform: appData.transform.value,
            zIndex: 0,
            userSelect: 'none',
            overflow: 'hidden',
            ...jsonData(appData.info.background)
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