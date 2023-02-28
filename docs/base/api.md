
# runtime管理

## 应用管理

### 对象列表   
* `rdata`：数据管理
* `component`：组件管理
* `componentMixin`：组件混入对象
* `cmd`：事件命令
* `EVENTS`：应用内置事件
* `helper`：操作助手
* `remote`：远程数据管理
* `typeModel`：类型数据配置
* `app`：应用配置
* `use`：插件方法
* `createStage`：创建舞台
* `displayStage`：显示舞台
* `destroyStage`：销毁应用

### app  
*  `app.appSetup`：应用的基本配置信息
   * `interaction: false` 开启交互动作
   * `clickCursor: 'auto'` 点击事件鼠标经过光标样式
   * `scale: false` 是否开启整体缩放
   * `status: 'none'` 当前应用状态，none未创建，create已创建，display已展示，destroy销毁
   * `dom: null` 所在页面容器
*  `app.vm`：vue的实例对象

`app.appSetup` => `AppSetup` 对象会注入到添加到舞台的每一个元件的属性中，在生命周期created后可以使用


### createStage 
 * 方法函数  
 ```js:no-line-numbers
 import { createStage } from 'rd-runtime'
 createStage(show:Object)
 ```   
 创建舞台，创建舞台后，默认挂载到页面（如果之前已经显示过页面）  
 * 参数  
    | 参数    | 类型   | 默认  | 说明           |
    | ------- | ------ | ----- | -------------- |
    | opstions     | Object | --- | 应用的配置参数  |

   - opstions 参数       

   | 参数        | 类型    | 说明                                 |
   | ----------- | ------- | ------------------------------------ |
   | dom | string  | 所在页面的DOM容器id或HTMLElement对象，默认`null` |
   | interaction | boolean | 开启交互动作，默认`false`            |
   | clickCursor | string  | 鼠标经过点击内容光标样式，默认`auto` |
   | scale | boolean  | 是否开启整体缩放，默认`false` |

### displayStage 
 * 方法函数  
 ```js:no-line-numbers
 import { displayStage } from 'rd-runtime'
 displayStage(options:Object)
 ```   
 将舞台内容显示到页面上，如果是DOM元素的id值，请确保此DOM已存在页面中  
 * 参数  
    | 参数    | 类型   | 说明           |
    | ------- | ------ | -------------- |
    | options | object | 应用的配置参数 |

   - opstions 参数       
   参见 createStage    

 
### removeStage 
 * 方法函数  
 ```js:no-line-numbers
 import { removeStage } from 'rd-runtime'
 removeStage()
 ```   
 删除舞台应用（不会彻底销毁，可以通过displayStage方法重新显示） 


### destroyStage 
 * 方法函数  
 ```js:no-line-numbers
 import { destroyStage } from 'rd-runtime'
 destroyStage(clearData:Boolean)
 ```   
 销毁应用，包含所有注册的组件库 
 * 参数  
    | 参数    | 类型   | 默认  | 说明           |
    | ------- | ------ | ----- | -------------- |
    | clearData  | Boolean | true |是否清除数据内容  |


### use
 * 方法函数  
 ```js:no-line-numbers
 import { use } from 'rd-runtime'
 use(install:Function|Object)
 ```   
 插件安装， install可以是一个方法，也可以是一个带有install方法的对象。     
 install方法接收一个完整的rd-runtime对象
 * 参数  
    | 参数    | 类型   | 默认  | 说明           |
    | ------- | ------ | ----- | -------------- |
    | install  | Object | -- |插件安装方法或对象  |


## cmd  
命令控制器  
 ```js:no-line-numbers
 import { cmd } from 'rd-runtime'
 ```   

### execute  
 * 方法函数  
 ```js:no-line-numbers
 cmd.execute(action:String|Object, target:Object)  
 ```  
 执行一个命令    
 * 参数  
    | 参数   | 类型   | 必要 | 说明     |
    | ------ | ------ | ---- | -------- |
    | action | string | 必填 | 命令     |
    | target | object | -    | 执行对象 |

### addEventListener  
 * 方法函数  
 ```js:no-line-numbers
 cmd.addEventListener(eventName:String, fun:Function)  
 ```  
 添加一个事件方法    
 * 参数  
    | 参数      | 类型     | 必要 | 说明 |
    | --------- | -------- | ---- | ---- |
    | eventName | string   | 必填 | 命令 |
    | fun       | function | 必填 | 方法 |
[eventName系统内置](const.md)

### removeEventListener  
 * 方法函数  
 ```js:no-line-numbers
 cmd.removeEventListener(eventName:String, fun:Function)  
 ```  
 删除一个事件方法    
 * 参数  
    | 参数      | 类型     | 必要 | 说明 |
    | --------- | -------- | ---- | ---- |
    | eventName | string   | 必填 | 命令 |
    | fun       | Function | 必填 | 方法 |


## rdata  
运行时数据对象  
 ```js:no-line-numbers
 import { rdata } from 'rd-runtime'
 ```   
### init  
 * 方法函数  
 ```js:no-line-numbers
 rdata.init(options:JsonData)
 ```   
 初始化整个应用的数据对象  
 * 参数  
    | 参数    | 类型     | 说明         |
    | ------- | -------- | ------------ |
    | options | JsonData | 完整数据对象 |

### getSpriteData  
 * 方法函数  
 ```js:no-line-numbers
 rdata.getSpriteData(id:String)
 ```   
 返回一个组件数据  
 * 参数  
    | 参数 | 类型   | 说明               |
    | ---- | ------ | ------------------ |
    | id   | string | 舞台中生成的组件id |

### addSpriteData  
 * 方法函数  
 ```js:no-line-numbers
 rdata.addSpriteData(SpriteData:JsonData)
 ```   
 添加一个组件数据  
 * 参数  
    | 参数       | 类型     | 说明                     |
    | ---------- | -------- | ------------------------ |
    | SpriteData | jsonData | 环境中存在的组件数据对象 |

### delSpriteData  
 * 方法函数  
 ```js:no-line-numbers
 rdata.delSpriteData(id:String)
 ```   
 删除指定组件数据    
 * 参数  
    | 参数 | 类型   | 说明               |
    | ---- | ------ | ------------------ |
    | id   | string | 舞台中生成的组件id |

### getSpritesData  
 * 方法函数  
 ```js:no-line-numbers
 rdata.getSpritesData()
 ```   
 返回所有组件数据

### getSpriteArrData  
 * 方法函数  
 ```js:no-line-numbers
 rdata.getSpriteArrData()
 ```   
 返回所有组件数据（数组）


### getActionsData  
 * 方法函数  
 ```js:no-line-numbers
 rdata.getActionsData()
 ```   
 返回所有动作数据

### getModule  
 * 方法函数  
 ```js:no-line-numbers
 rdata.getModule(id)
 ```    
 返回指定模块数据  
 * 参数  
    | 参数 | 类型   | 说明               |
    | ---- | ------ | ------------------ |
    | id   | string | 舞台中生成的模块id |


### getModules  
 * 方法函数  
 ```js:no-line-numbers
 rdata.getModules()
 ```    
 返回所有模块数据

### getAppData  
 * 方法函数  
 ```js:no-line-numbers
 rdata.getAppData()
 ```    
 返回app配置数据

### getData  
 * 方法函数  
 ```js:no-line-numbers
 rdata.getData()
 ```    
 返回所有数据

### addGData   
 * 方法函数  
 ```js:no-line-numbers
 rdata.addGData(value:String|Object, name:String, type:String)
 ```    
 * 参数  
    | 参数  | 类型     | 说明         |
    | ----- | -------- | ------------ |
    | value | jsonData | 数据值       |
    | name  | string   | 数据对象名称 |
    | type  | string   | 数据来源     |
 返回一个响应数据对象  

### delGData   
 * 方法函数  
 ```js:no-line-numbers
 rdata.delGData(id:String)
 ```    
 删除一个数据对象  


### getGData   
 * 方法函数  
 ```js:no-line-numbers
 rdata.getGData(id:String)
 ```    
 返回一个数据对象  

### getGDataList   
 * 方法函数  
 ```js:no-line-numbers
 rdata.getGDataList()
 ```    
 返回所有数据对象列表，是一个响应对象  




## remote    
远端数据对象  
 ```js:no-line-numbers
 import { remote } from 'rd-runtime'
 ```   

### remotes    
* 以id为key的远端数据对象`remote`集合   
 ```js:no-line-numbers
 remote.remotes
 ```   
 * remote对象  
 ```js:no-line-numbers
 {
    id:'自动生成的唯一标识',
    url:'接口地址',
    body:'附带的请求数据',
    method:'请求方式',
    data:'reactive对象，返回被过滤的数据',
    sourceData:'原数据，唯过滤',
    isloading:'是否在加载中',
    status:'wait|request|success',
    err:'错误信息',
    extractRule:'过滤规则',
    //request请求远程数据方法，请求成功后会更新数据到data中
    request()
 }
 ```   

### add   
 * 方法函数  
 ```js:no-line-numbers
 remote.add(value:String|Object,, extractRule:Object, body:Array, method:String, itval:Number)
 ```    
 * 参数  
    | 参数  | 类型   | 说明                 |
    | ----- | ------ | -------------------- |
    | value | jsonData | 接口url地址或已有结构对象 |
    | extractRule | Object | 过滤规则 |
    | body | string | 请求的附带参数 Payload |
    | method | string | 请求方式 |
    | itval | number | 轮询请求间隔秒数，0为不做轮询请求 |
 添加一个远端数据对象  
* 返回 `remote`
* body `Payload` 数组
  * `key` 字段名
  * `value` 值，可以是GD_开头的全局数据id
  * `path` value对象取值路径 `a.[1].c`


### del   
 * 方法函数  
 ```js:no-line-numbers
 remote.del(value:String)
 ```    
 * 参数  
    | 参数  | 类型   | 说明                 |
    | ----- | ------ | -------------------- |
    | value | string | 接口地址或请求对象id |
 删除一个远端请求对象，如果value值为空，将删除所有请求对象
 
### getRemote   
 * 方法函数  
 ```js:no-line-numbers
 remote.getRemote(id:String)
 ```    
 * 返回 `remote`
 返回一个远端请求对象  

### getList   
 * 方法函数  
 ```js:no-line-numbers
 remote.getList()
 ```    
 返回所有远端请求对象列表

### requestData   
 * 方法函数  
 ```js:no-line-numbers
 remote.requestData(refresh:Boolean,api:string)
 ```    
 * 参数  
    | 参数    | 类型    | 说明               |
    | ------- | ------- | ------------------ |
    | refresh | boolean | 是否刷新数据       |
    | api     | string  | 单独请求的接口地址 |
请求远端数据  



## component  
组件对象  
 ```js:no-line-numbers
 import { component } from 'rd-runtime'
 ```   
  
 ### install   
 * 方法函数  
 ```js:no-line-numbers
 component.install(com:Object|Array)
 ```    
 安装组件   
  * 参数  
    | 参数 | 类型   | 必要 | 说明     |
    | ---- | ------ | ---- | -------- |
    | com  | object | 必填 | 组件对象 |
  

 ### items   
 * 组件属性
 ```js:no-line-numbers
 component.items
 ```    
 获取当前所有已安装的组件数组

 
 ### getComponentDefaultData   
 * 方法函数  
 ```js:no-line-numbers
 component.getComponentDefaultData(name:String)
 ```    
 返回组件的默认数据   
  * 参数  
    | 参数 | 类型   | 必要 | 说明     |
    | ---- | ------ | ---- | -------- |
    | name | string | 必填 | 组件名称 |

 
 ### getComponentEvents   
 * 方法函数  
 ```js:no-line-numbers
 component.getComponentEvents(name:String)
 ```    
 返回组件的自定义事件列表   
  * 参数  
    | 参数 | 类型   | 必要 | 说明     |
    | ---- | ------ | ---- | -------- |
    | name | string | 必填 | 组件名称 |


 ## helper  
操作助手  
 ```js:no-line-numbers
 import { helper } from 'rd-runtime'
 ```   

 ### addEvent  
  * 方法函数  
 ```js:no-line-numbers
 helper.addEvent(id:String,eventName)
 ```    
 添加一个元件事件   
  * 参数  
    | 参数      | 类型   | 必要 | 说明   |
    | --------- | ------ | ---- | ------ |
    | id        | string | 必填 | 元件id |
    | eventName | string | 必填 | 事件名 |

 ### removeEvent  
  * 方法函数  
 ```js:no-line-numbers
 helper.removeEvent(id:String,eventName)
 ```    
 删除一个元件事件   
  * 参数  
    | 参数      | 类型   | 必要 | 说明   |
    | --------- | ------ | ---- | ------ |
    | id        | string | 必填 | 元件id |
    | eventName | string | 必填 | 事件名 |

 ### getEvent  
  * 方法函数  
 ```js:no-line-numbers
 helper.getEvent(id:String,eventName:String,index:Boolean)
 ```    
 返回事件信息，eventName不传时返回所有事件列表   
  * 参数  
    | 参数      | 类型    | 必要 | 说明           |
    | --------- | ------- | ---- | -------------- |
    | id        | string  | 必填 | 元件id         |
    | eventName | string  | 必填 | 事件名         |
    | index     | boolean | --   | 只返回索引位置 |

 
 ### createActionData  
  * 方法函数  
 ```js:no-line-numbers
 helper.createActionData(actionName:String,target:String,value:Any)
 ```    
 创建触发的动作   
  * 参数  
    | 参数       | 类型   | 必要 | 说明     |
    | ---------- | ------ | ---- | -------- |
    | actionName | string | 必填 | 动作id   |
    | target     | string | 必填 | 执行目标 |
    | value      | any    | --   | 动作参数 |
  * 返回   
  创建成功返回动作id
  
 ### addAction  
  * 方法函数  
 ```js:no-line-numbers
 helper.addAction(actionName:String,target:String|Object,eventName:String)
 ```    
 为事件添加一个动作   
  * 参数  
    | 参数       | 类型   | 必要   | 说明                                                 |
    | ---------- | ------ | ------ | ---------------------------------------------------- |
    | actionName | string | 必填   | 动作id                                               |
    | target     | object | string | 必填                                                 | 添加的目标对象，事件的响应对象，元件id |
    | eventName  | string | --     | 事件名称，通过元件id添加动作时，必须包含一个事件名称 |
  * 返回   
  创建成功返回动作所在的事件对象
 
 ### removeAction  
  * 方法函数  
 ```js:no-line-numbers
 helper.removeAction(actionId:String,target:String|Object,eventName="", removeSource = true)
 ```    
 为事件添加一个动作   
  * 参数  
    | 参数         | 类型    | 必要   | 说明         |
    | ------------ | ------- | ------ | ------------ |
    | actionId     | string  | 必填   | 动作id       |
    | target       | object  | string | 必填         | 目标对象 |
    | eventName    | string  | --     | 事件名称     |
    | removeSource | boolean | --     | 是否删除源头 |
  * 返回   
  创建成功返回动作所在的事件对象


 ### getSpriteActions  
  * 方法函数  
 ```js:no-line-numbers
 helper.getSpriteActions()
 ```    
  * 返回   
  获取所有元件的所有动作id信息，一般用于排查当前动作是否被关联

 ### setZindex  
  * 方法函数  
 ```js:no-line-numbers
 helper.setZindex(target:String, level = 'up')
 ```    
 元件层级调整(zIndex值的调整)   
  * 参数  
    | 参数       | 类型   | 必要   | 说明                                                 |
    | ---------- | ------ | ------ | ---------------------------------------------------- |
    | target | string | 必填   | 元件id  |
    | level  | string | string | 调整方式（up,down,top,bottom） |
 
### copy  
  * 方法函数  
 ```js:no-line-numbers
 helper.copy(sid)
 ```    
 复制组件（复制并显示到舞台）

 ### changeModuleShow  
  * 方法函数  
 ```js:no-line-numbers
 helper.changeModuleShow(id)
 ```    
 切换页面（module作为页面显示）
  * 参数  
    | 参数       | 类型   | 必要   | 说明                                                 |
    | ---------- | ------ | ------ | ---------------------------------------------------- |
    | id | string | 必填   | 模块id  |
 