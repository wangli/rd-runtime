# 开始  

内容的维护主要就是以数据为核心的维护

## 创建应用  
* 创建一个最基础的应用示例app.js
```js
   import { onMounted, h } from 'vue'
   import { createStage, component, rdata } from 'rd-runtime'
   import VxBox from './Box.vue'
   
   export default {
      setup() {
         // 添加组件
         component.add([VxBox])
         // 装载数据，初次创建可以省略
         rdata.init({})
         // 根据组件定义的name名称，返回一个组件默认数据
         // 组件返回的除了通用混入参数外，包含自定义的props参数
         let comData = component.getComponentDefaultData('vx-box')
         // 添加组件，并返回这个组件的响应数据对象
         let rcom = rdata.addSpriteData(comData)
         // 挂载完成显示内容
         onMounted(() => {
            // 创建一个舞台并显示内容到页面，#stage是页面中元素id，interaction开启交互动作
            createStage({dom:'#stage',interaction: true })
            // 添加一个定时器更新数据
            let count = 0;
            setInterval(() => {
               count++
               rcom.data = 'hello' + count;
            }, 1000);
         })
         return () => h('div', { id: "stage" });
      }
   }
```
[装载数据样例](/guide/data.html#数据样例)   
createStage方法创建一个舞台应用并挂载到dom中，参数可以是可读取的dom结构id，也开始是一个实体dom  
如果是vue中需要mounted中执行，第二个参数interaction值为是否开启交互动作

## 创建组件   
除了内置的基础分层组件之外，所有的组件由用户自行创建，并引入到此运行环境中才可使用，所有组件会默认混入[基础参数](/guide/data.html#组件默认混入)。创建的组件理论上可以随意定义自身的一些参数事件，但为了更好做组件之间的控制与维护，我们约定尽量参数的使用不要超过默认的混入参数范围。


### 混入参数  
* `x`  横坐标位置 `0`
* `y`  纵坐标位置 `0`
* `width` 宽度 `0`
* `height` 高度 `0`
* `zIndex` 层级深度 `0`
* `background` 背景样式对象 `{}`
* `border` 边框样式对象 `{}`
* `visible` 是否可见 `true`
* `data`  传入数据 `''`
* `options`  附加参数 `{}`

### 必要配置

* name  
必须给组件命名  

* type  
给组件定义类型名，用户组件的分组归类  

* style使用   
在组件的dom结构根节点需要绑定style对象
```html
<template>
   <div :style="style"></div>
</template>
```
### 自定义事件   
组件可以在emits中设置自定义事件触发名，并发送事件。当你的组件中存在emits数据配置时，通过组件方法getComponentEvents返回定义的事件列表。



### 示例组件
box.vue
```vue
<template>
   <div class="box" :style="style">
      <div @click="$emit('click-item',data)">{{data}}</div>
   </div>
</template>
<script>
   export default {
      name: 'vx-box',
      type: 'shape',
      emits:['click-item'],
      props: {
         width: {
            type: Number,
            default: 80
         },
         height: {
            type: Number,
            default: 80
         },
         x: {
            type: Number,
            default: 10
         },
         y: {
            type: Number,
            default: 10
         },
         background: {
            type: Object,
            default () {
               return { backgroundColor: '#89f56369' }
            }
         }
      },
   }
</script>
<style scoped>
   .box {
      text-align: center;
      line-height: 78px;
   }
</style>
```

## 舞台  

### 基础配置   
舞台的基本配置全部根据参数而定 [查看基本参数](data.html#app配置)  
通过`rdata.appBase`对象来获取和修改配置
```js
import { rdata } from 'rd-runtime'
const {info,size,background }=rdata.appBase
```
* info 介绍   
  * {title:'标题'}
* size 尺寸
  * {width:'宽度',height:'高度'}
* background 背景    
  * {backgroudColor:'颜色值'}
  背景参数以css的样式做为参考

### 开启动作交互
默认清空渲染到舞台上的元件是没有绑定动作事件，需要主动开启，其他参数[查看接口](../base/api.html#createStage)  
```js
import { createStage } from 'rd-runtime'
createStage({dom:"#stage",interaction:true})
```

## 元件  

### ID 

**id** 作为元件唯一的标识，是围绕元件所有操作的最重要属性。 
在创建元件时可以自己附带id属性，如果新建数据的id不存在将自动生成一个值，并赋在元件id属性上。

[其他基本数据](data.html#component组件-元件)

### 新建与添加    
1. 获取一个组件默认数据`component.getComponentDefaultData()`  
2. 通过组件数据添加一个新元件`rdata.addSpriteData()`

```js
   import { component, rdata } from 'rd-runtime'
   /**
    * 如果没有元件数据，需要通过某一组件创建一个新的元件
    * 先要通过组件获取元件的默认初始数据
    * 在调整数据后添加到元件中
    **/
   // 获取组件默认数据，componentName是你创建的的组件名称
   let compData=component.getComponentDefaultData('componentName')
   // 对初始的数据进行修改
   compData.x=100
   compData.y=100
   // 添加组件数据，添加成功后会返回带有id的一个响应式元件数据
   rdata.addSpriteData(compData)
   // 如果不需要修改初始数据可以直接通过组件名的方式添加元件
   rdata.addSpriteData('componentName')
```


### 删除与编辑    
通过元件id删除来删除元件，使用`rdata.delSpriteData()`  
元件数据是一个响应式的对象，因此可以直接深层次的修改上面的值，可以修改的值围绕组件定义的props的参数
```js
// 获取某一个元件的数据
let compData=rdata.getSpriteData(id)
// 直接编辑对象数据
compData.data=122
// 删除
rdata.delSpriteData(id)
```


### 添加事件   
1. 获取事件对象数据格式   
2. 选择一个事件对象类型
3. 添加事件到元件 

```js
   import { component, rdata, typeModel, helper } from 'rd-runtime'
   // 获取组件默认数据
   let compData=component.getComponentDefaultData('componentName')
   // 添加组件数据
   let sprData=rdata.addSpriteData(compData)
   // 拿到一个事件类型
   let eventType=typeModel.events[0].event
   // 选择第一个事件数据格式，添加到元件中
   helper.addEvent(sprData.id, eventType)
```

### 添加动作   
1. 获取动作对象数据格式    
2. 编辑动作参数
3. 添加动作到元件的事件中  

```js
   import { component, rdata, typeModel, helper } from 'rd-runtime'
   // 获取组件默认数据
   let compData=component.getComponentDefaultData('componentName')
   // 添加组件数据
   let sprData=rdata.addSpriteData(compData)
   // 拿到一个事件类型
   let eventType=typeModel.events[0].event
   // 选择第一个事件数据格式，添加到元件中
   helper.addEvent(sprData.id, eventType)

   // 假设需要控制的元件id是demo_id
   // 拿到一个动作数据，这里取show动作
   let actionModel=typeModel.events[0].action
   // 创建一个动作数据，返回动作id
   let actionId = helper.createActionData(actionModel.action, "demo_id", false)
   // 添加动作到事件中
   helper.addAction(actionId, demo_id, "show")
   
```

### 绑定数据   
任何元件都有一个默认的data传值，这个参数可以是在数据值可以直接在创建的元件的时候赋值   
```js
// 获取某一个元件的数据
let compData=rdata.getSpriteData(id)
// 直接编辑对象数据，可以是string,number,object,array四种类型
compData.data="这是你要传递的组件数据"
```
也可以是通过全局的数据配置来绑定，这里需要先通过一个`addGData`的方法先创建一个全局数据源，然后将此id赋给元件的data       
```js
import { rdata } from 'rd-runtime'
// 创建一个新的数据源
let dataID=rdata.addGData('我为人人，人人为我','数据名').id
// 为元件对象spriteData设置数据
spriteData.data=dataID
```


## 输入与输出数据    
```js
   import { rdata } from 'rd-runtime'
   // 初始化一个项目配置数据，mydata是一个json格式的数据对象
   rdata.init(initData)
   // 获取当前项目的所有配置数据
   let resData=rdata.getData()
```