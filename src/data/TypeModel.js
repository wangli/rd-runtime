const actions = [{
   name: '显示隐藏',
   action: "show",
   target: 'component',
   valueType: 'boolean',
   value: true
},
{
   name: '轮换显示隐藏',
   action: "toggle",
   target: 'component',
   valueType: "undefined",
   value: null
},
{
   name: '发送数据',
   action: "sendData",
   target: 'component',
   valueType: 'object',
   value: null
}, {
   name: '打开外链',
   action: 'href',
   target: 'url',
   valueType: 'string',
   value: ''
}, {
   name: '页面切换',
   action: 'singleModule',
   target: 'modules',
   valueType: 'string',
   value: ""
}, {
   name: '开关弹窗',
   action: 'popup',
   target: 'module',
   valueType: 'string',
   value: ""
}]

/**
 * 此模块是数据相关定义、初始化、配置等
 */
export default {
   // 模块类型，content场景主内容，overlayer基础弹层内容
   get level() {
      return [{
         name: '主内容区',
         type: 'content'
      }, {
         name: '覆盖弹层',
         type: 'overlayer'
      }]
   },
   /**
    * 事件类型，click点击，interval定时器，timeout延迟
    * name：具体事件名称描述
    * event：事件类型
    * pams：附加参数
    * actions：需要执行的动作列表
    */
   get events() {
      return [{
         name: '点击',
         event: 'click',
         pams: '',
         actions: [],
         actionValue: {}
      },
      {
         name: '定时任务',
         event: 'interval',
         pams: { delay: 1000 },
         actions: [],
         actionValue: {}
      },
      {
         name: '延迟任务',
         event: 'timeout',
         pams: { delay: 1000 },
         actions: [],
         actionValue: {}
      }]
   },
   // 组件类型
   get component() {
      return [
         { name: '图表', type: 'chart' },
         { name: '文本', type: 'text' },
         { name: '表格', type: 'table' },
         { name: '形状', type: 'shape' },
         { name: '菜单', type: 'menu' },
         { name: '媒体', type: 'media' },
         { name: '地图', type: 'map' },
         { name: '3D', type: '3d' },
         { name: '其它', type: 'other' }
      ]
   },
   // 动作类型 ：显示隐藏，发送数据
   get actions() {
      return actions
   },
   // 数据类型
   get dataTypes() {
      return [
      {
         name: '静态数据',
         type: 'source'
      },
      {
         name: '远程数据',
         type: 'remote'
      },
      {
         name: '本地数据',
         type: 'local'
      }]
   }
}