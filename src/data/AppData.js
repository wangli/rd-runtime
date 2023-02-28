/**
 * app基础布局与组件渲染数据
 */
import { computed, reactive } from 'vue'
import { nanoid } from 'nanoid'
import { AppSetup } from '../config'

// app名称
const info = reactive({
   title: "",
   id: 'A_' + nanoid(10),
   creattime: null,
   uptime: null,
   cover: null,
   description: ''
})
// 尺寸
const size = reactive({ width: AppSetup.width, height: AppSetup.height })
// 背景
const background = reactive({
   backgroundColor: AppSetup.backgroundColor
})
// 缩放信息
const scale = reactive({ value: 1, h: 1, w: 1, mode: AppSetup.scaleMode })
// 样式缩放
const transform = computed(() => {
   if (AppSetup.scale) {
      if (scale.mode == 'auto') {
         if (scale.w > scale.h) {
            let mvx = size.width * (scale.w - scale.h) / 2 / scale.value;
            return "scale(" + scale.value + ")  translateX(" + mvx + "px)"
         } else {
            let mvy = size.height * (scale.h - scale.w) / 2 / scale.value;
            return "scale(" + scale.value + ")  translateY(" + mvy + "px)"
         }
      } else if (scale.mode == 'fill') {
         return "scale(" + scale.w + "," + scale.h + ")"
      } else {
         return ''
      }
   } else {
      return ''
   }

})

const getDomRect = function (_dom) {
   if (_dom) {
      let dom = _dom
      if (typeof dom == 'string') {
         dom = document.querySelector(AppSetup.dom)
      }
      let rect = dom.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
         return rect
      } else if (dom.parentElement && dom.parentElement.localName != "body") {
         return getDomRect(dom.parentElement)
      } else {
         return {
            width: window.innerWidth,
            height: window.innerHeight
         }
      }
   }
}
// 返回一个根据窗口变化的缩放比
const getScale = function (_size) {
   let rect = getDomRect(AppSetup.dom) || {
      width: window.innerWidth,
      height: window.innerHeight
   }
   let h = rect.height / _size.height;
   let w = rect.width / _size.width;
   if (h < w) {
      return { value: h, h, w }
   } else {
      return { value: w, h, w }
   }
}

// 默认远端数据对象
export const network = reactive({
   host: '',
   method: 'GET',
   headers: {}
})

// 初始化APP基本参数
export const initAppData = function (options) {
   if (options.id) {
      info.id = options.id
   } else {
      info.id = 'A_' + nanoid(10)
   }
   // 基本信息
   options.title && (info.title = options.title)
   options.creattime && (info.creattime = options.creattime)
   options.uptime && (info.uptime = options.uptime)
   options.cover && (info.cover = options.cover)
   options.description && (info.description = options.description)
   // 尺寸
   options.width && (size.width = options.width)
   options.height && (size.height = options.height)
   options.scaleMode && (scale.mode = options.scaleMode)

   Object.assign(scale, getScale(size))
   Object.assign(background, options.background)
   Object.assign(network, options.network)

   // 窗口变化数据处理
   window.addEventListener('resize', (evt) => {
      Object.assign(scale, getScale(size))
   })

   return {
      info,
      size,
      scale,
      transform,
      background
   }
}
// 基本样式配置信息
export const appBase = {
   info,
   size,
   background
}

export const resetAppData = function () {
   size.width = AppSetup.width
   size.height = AppSetup.height
   for (const key in background) {
      if (Object.hasOwnProperty.call(background, key)) {
         delete background[key]
      }
   }
   background.backgroundColor = AppSetup.backgroundColor
   scale.mode = AppSetup.scaleMode
   Object.assign(network, {
      host: '',
      method: 'GET',
      headers: {}
   })
   Object.assign(info, {
      title: "",
      id: 'A_' + nanoid(10),
      creattime: null,
      uptime: null,
      cover: null,
      description: ''
   })
}

export const getAppData = function () {
   return {
      info,
      size,
      scale,
      transform,
      background,
      get network() {
         return network
      }
   }
}