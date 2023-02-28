# 参数定义  

## EVENTS  
内置事件  
 ```js:no-line-numbers
 import { EVENTS } from 'rd-runtime'
 ```   

 ### CLICK_BACKGROUND
 `EVENTS.CLICK_BACKGROUND`
 点击舞台背景

 ### CLICK_SPRITE
 `EVENTS.CLICK_SPRITE`
 点击舞台元件获取id信息

 ### MOUSEOVER_SPRITE
 `EVENTS.MOUSEOVER_SPRITE`
 鼠标经过舞台元件

 ### MOUSEOUT_SPRITE
 `EVENTS.MOUSEOUT_SPRITE`
 鼠标离开舞台元件

 ### MOUSEOUT_SPRITE
 `EVENTS.STAGE_MOUNTED`
 舞台渲染完毕


```js:no-line-numbers
 import { EVENTS,cmd } from 'rd-runtime'
 cmd.addEventLister(EVENTS.CLICK_SPRITE,res=>{
     //元件的基本信息
 })
 cmd.addEventLister(EVENTS.MOUSEOVER_SPRITE,res=>{
     //元件的基本信息
 })
 cmd.addEventLister(EVENTS.MOUSEOUT_SPRITE,res=>{
     //元件的基本信息
 })
```

## typeModel  
相关数据选择模型  
 ```js:no-line-numbers
 import { typeModel } from 'rd-runtime'
 ```   

 ### events   
 事件类型列表  
 * 属性
 ```js:no-line-numbers
typeModel.events
 ```
 * 返回
 ```js:no-line-numbers
[{
   name: '点击',
   event: 'click',
   pams: '',
   actions: []
},
{
   name: '定时任务',
   event: 'interval',
   pams: 1000,
   actions: []
},
{
   name: '延迟任务',
   event: 'timeout',
   pams: 1000,
   actions: []
}]
 ```    
 
 ### component   
 组件类型列表
 * 属性
 ```js:no-line-numbers
 typeModel.component
 ```    
 * 返回
 ```js:no-line-numbers
[
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
 ```  

 ### actions   
 基本动作类型列表
 * 属性
 ```js:no-line-numbers
 typeModel.actions
 ```    
 * 返回
 ```js:no-line-numbers
[{
   name: '显示',
   action: "show",
   type: 'Boolean',
   target: 'component',
   value: true
}, {
   name: '发送数据',
   action: "sendData",
   type: 'Object',
   target: 'component',
   value: ""
}, {
   name: '打开外链',
   action: 'href',
   target: 'url',
   value: ''
}, {
   name: '页面切换',
   action: 'singleModule',
   target: 'modules',
   type: 'String',
   value: ""
}]
 ```  

 ### dataType   
 数据类型
 * 属性
 ```js:no-line-numbers
 typeModel.dataType
 ```    
 * 返回
 ```js:no-line-numbers
[
   { name: '原始数据', type: 'source' },
   { name: '远程数据', type: 'remote' },
   { name: '本地数据', type: 'local' },
]
 ```  
