// 对外用户事件
export const EVENTS = {
   //    点击舞台
   CLICK_STAGE: 'click-stage',
   //    点击舞台背景
   CLICK_BACKGROUND: 'click-background',
   //    点击元件
   CLICK_SPRITE: 'click-sprite',
   //    双击元件
   DBLCLICK_SPRITE: 'dblclick-sprite',
   //    鼠标按下舞台背景
   MOUSEDOWN_BACKGROUND: 'mousedown-background',
   //    鼠标释放舞台背景
   MOUSEUP_BACKGROUND: 'mouseup-background',
   //    鼠标经过元件
   MOUSEOVER_SPRITE: 'mouseover-sprite',
   //    鼠标离开元件
   MOUSEOUT_SPRITE: 'mouseout-sprite',
   //    鼠标按下元件
   MOUSEDOWN_SPRITE: 'mousedown-sprite',
   //    鼠标释放元件
   MOUSEUP_SPRITE: 'mouseup-sprite',
   //    鼠标移入元件
   MOUSEENTER_SPRITE: 'mouseenter-sprite',
   //    鼠标移出元件
   MOUSELEAVE_SPRITE: 'mouseleave-sprite',
   //    舞台渲染完毕
   STAGE_MOUNTED: 'stage-mounted',
   // 数据加载完成
   DATA_LOADED: 'data-loaded',
   // 页面状态
   PAGE_STATE: 'page-state'
}
// 内部控制事件
export const CEVENTS = {
   // 执行动作
   ACTION: 'action',
   // 设置应用
   APP_ACTION: 'appAction'
}