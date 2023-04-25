import CMD from '@/command'
import { EVENTS } from '@/events'
import { createSimpleData } from '@/utils'
import * as interaction from './interaction'

/**
 * 对组件创建一组事件对象，并在h方法中通过props传递
 * @param {Array} events 事件
 * @param {String} id 组件id
 * @returns 
 */
export default function (options) {
   const { myApp = {}, events, data = {}, componentName = "" } = options
   let evts = {}
   if (componentName) {
      evts = {
         style: {}
      }
   }
   if (myApp.AppSetup && myApp.AppSetup.interaction) {
      // 开始交互动作
      events.forEach(item => {
         switch (item.event) {
            case 'click':
               // 用户点击元件
               Object.assign(evts, interaction.click.call(myApp, item, data))
               break
            case 'timeout':
               // 显示后延迟执行
               Object.assign(evts, interaction.timeout.call(myApp, item, data))
               break
            case 'interval':
               // 显示后定时执行
               Object.assign(evts, interaction.interval.call(myApp, item, data))
               break
            default:
               // 自定义事件
               Object.assign(evts, interaction.customize.call(myApp, item, data, componentName))
         }
      });
   } else {
      if (data.type == 'group' && !data.gpid) {
         Object.assign(evts, {
            onClickCapture(e) {
               e.stopPropagation()
               CMD.emit(EVENTS.CLICK_SPRITE, createSimpleData(data), e)
            },
            onDblclickCapture(e) {
               e.stopPropagation()
               CMD.emit(EVENTS.DBLCLICK_SPRITE, createSimpleData(data), e)
            },
            onMousedownCapture(e) {
               CMD.emit(EVENTS.MOUSEDOWN_SPRITE, createSimpleData(data), e)
            },
            onMouseoverCapture(e) {
               CMD.emit(EVENTS.MOUSEOVER_SPRITE, createSimpleData(data), e)
            },
            onMouseoutCapture(e) {
               CMD.emit(EVENTS.MOUSEOUT_SPRITE, createSimpleData(data), e)
            },
            onMouseupCapture(e) {
               CMD.emit(EVENTS.MOUSEUP_SPRITE, createSimpleData(data), e)
            },
            onMouseleaveCapture(e) {
               CMD.emit(EVENTS.MOUSELEAVE_SPRITE, createSimpleData(data), e)
            },
            onMouseenterCapture(e) {
               CMD.emit(EVENTS.MOUSEENTER_SPRITE, createSimpleData(data), e)
            }
         })
      } else {
         Object.assign(evts, {
            onClick(e) {
               e.stopPropagation()
               CMD.emit(EVENTS.CLICK_SPRITE, createSimpleData(data), e)
            },
            onMousedown(e) {
               CMD.emit(EVENTS.MOUSEDOWN_SPRITE, createSimpleData(data), e)
            },
            onMouseover(e) {
               CMD.emit(EVENTS.MOUSEOVER_SPRITE, createSimpleData(data), e)
            },
            onMouseout(e) {
               CMD.emit(EVENTS.MOUSEOUT_SPRITE, createSimpleData(data), e)
            },
            onMouseup(e) {
               CMD.emit(EVENTS.MOUSEUP_SPRITE, createSimpleData(data), e)
            },
            onMouseleave(e) {
               CMD.emit(EVENTS.MOUSELEAVE_SPRITE, createSimpleData(data), e)
            },
            onMouseenter(e) {
               CMD.emit(EVENTS.MOUSEENTER_SPRITE, createSimpleData(data), e)
            }
         })
      }
   }
   return evts
}