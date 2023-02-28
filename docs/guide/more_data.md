# 数据绑定    
创建元件的时候可以默认设置data数据值，也可以绑定一个数据源。所有数据源都是一个全局的对象，可以被任何组件绑定，同时享有数据的共同更新。      
数据源分为四种，**原始配置**，**本地读取**，**远端读取**，**临时数据**。  
```js
import { rdata } from 'rd-runtime'
```

## 数据源   

### 全局普通数据    
1. 添加一个新的数据源   
2. 设置元件的data值为数据源的id     
```js
import { rdata } from 'rd-runtime'
// 创建字符串数据源
let dataID=rdata.addGData('我为人人，人人为我','数据名').id
// 创建json对象数据
let dataID2=rdata.addGData({name:'avd',age:'12'},'数据名').id
// 为元件对象spriteData设置数据
spriteData.data=dataID
```

### 全局远端数据  
1. 添加一个新的远端数据源
2. 设置元件的data值为数据源的id  
如果创建
```js
import { rdata } from 'rd-runtime'
/**
 * 创建一个普通的全局数据源，第一个参数是远端地址，第三个参数值是remote
 * */
let dataID=rdata.addGData('http://49.232.61.74:81','数据名','remote').id
/**
 * 创建一个可以发送数据参数的远端数据，此数据对象，需要包含url和body两个基础的值
 * GD_query是url参数对象
 * path为id获取url参数id值
 * */
let remoteDb=rdata.addGData({"url":"http://110.40.172.81:81","method":"post","body":[{"key":"name","value":"avd"},{"key":"id","value":"GD_query","path":"id"}]},'数据名','remote')

// 为元件对象spriteData设置数据
spriteData.data=dataID
```

### 独立远端数据    
```js
import { remote } from 'rd-runtime'
/**
 * 直接创建一个远端接口数据，可以附带一个extractRule提取数据规则（默认null），body发送的参数（默认null），method发送模式（默认null）
 * */
let dataID=remote.add('http://49.232.61.74:81',extractRule,body,method).id

// 为元件对象spriteData设置数据
spriteData.data=dataID
```

### 全局临时数据    
临时数据不会输出到配置文件中，但是作为数据源，可以被系统使用    
当前只有一种临时数据就是url参数对象，获取与使用的方式与其他一样，唯一区别就是id值是唯一固定的 
* id：`GD_query`
* type：`temp`
数据格式
```js
//全局数据id：GD_query，值是一个被data包括的json对象
{ "data": { "id": "11","sex":'1' } }
```

### 更新数据    
* 普通数据  
```js
import { rdata } from 'rd-runtime'
// 获取数据源，GD_c6Hu04lzpK是对应的数据源id
let data=rdata.getGData('GD_c6Hu04lzpK')
// data.value是数据值，如果是字符串内容，将包含一个value的属性
data.value.value="数据内容"
// 如果是一个对象，可以直接更新对象的key值内容
data.value.age=99
```

* 远端数据  
```js
   import { remote } from 'rd-runtime'
   /**
    * 远端数据更新使用 requestData方法，
    * 第一个参数表示是否强制更新
    * 第二个参数表示要更新的接口地址，如果不填写将更新所有
    */
   remote.requestData(true, url)
```

## 远端

### RemoteData远端对象  
使用`remote.add`方法可以创建一个远端的数据管理对象  
**RemoteData**  属性      
* `id`:string   唯一标识
* `url`:string  地址
* `body`:object  附带参数
* `method`:string  发送方式
* `data`:reactive   响应数据对象
* `sourceData`:object   原始接口数据
* `isloading`:boolean   是否在获取中
* `status`:string   当前状态（wait,request,success）
* `err`:object  错误信息
* `extractRule`:reactive    数据提取规则

**RemoteData**  方法   
* `clearData()`:function    清空（中断请求）数据方法
* `request()`  :function    请求数据方法    

**RemoteData**  事件   
* `success`    获取完成
* `error`      获取失败 
  
```js
import { remote } from 'rd-runtime'
// extractRule,body,method可以省略
let myRemoteData=remote.add('http://49.232.61.74:81',extractRule,body,method)
myRemoteData.on('success',my=>{
    // 获取成功
})
myRemoteData.request()
```

### extractRule规则     
数据提取    
**普通提取规则**    
* `name`：表示需要输出的属性名
* `path`：表示提取数据的路径
* `mapKey`：如果路径的值是一个数组，可以通过次值进行类似map的返回值

**图表数据规则**    

因为我们拿到的数据附加给图表相关的元件时，大部分并不是约定好的格式，因此需要制定一个中间转换的规则，最终满足图表的基本数据要求  
图表的数据以一个二维数组的形式呈现（类似excel表格），默认清空，第一行是需要描述的数据对象，第一列是数据x轴的项目列表，其他每一列是数据的表现     

* 规则主要是两个值x和y值
* `x` 是一个横向的数据的提取规则
* `y` 是一个纵向的多组数据的提取规则
* 任何一个规则都包含三个属性值name：姓名名称，path：提取深度路径，mapKey：提取所在深度的具体值

**示例：**  
```js
// 数据源
{
    data: {
        name: '销售业绩',
        count: 18,
        ued: [{
                year: '2010',
                perf: {zs: 66,ls: 99}
            },
            {
                year: '2011',
                perf: {zs: 99,ls: 80}
            },
            {
                year: '2012',
                perf: {zs: 70,ls: 60}
            }]
    }
}
//----------------------------------------------------
// 提取规则 1
{
    name:'year',path:'data.ued',mapKey:'year'
}
// 提取后数据1
{
    year:['2010','2011','2012']
}
//----------------------------------------------------
// 提取规则 2
[
    { name:'name',path:'data.name' }
    { name:'year',path:'data.ued',mapKey:'year' }
]
// 提取后数据2
{
    name:'销售业绩',
    year:['2010','2011','2012']
}
//----------------------------------------------------
// 提取规则 3
{
    x:{
        name:'年份',path:'data.ued',mapKey:'year'
    },
    y:[
        {name:'张三',path:'data.ued',mapKey:'perf.zs'},
        {name:'李四',path:'data.ued',mapKey:'perf.ls'}
    ]
}
// 提取后的数据3
 [
    [ '年份', '张三', '李四' ],
    [ '2010', 11, 99 ],
    [ '2011', 15, 80 ],
    [ '2012', 30, 60 ]
 ]
```


### body格式     
一个描述要传的字段信息列队的json数组    

**描述属性** 
* `key`：表示发送的字段名称
* `value`：表示发送字段值
* `path`：如果值是一个全局数据对象，可以通过path路径过去具体的值

**示例**    
```js
[
   {
        // 发送的字段名
        key:'uid',
        // 字段值，可以是原始值，也可以是来自全局数据对象id（GD_xxxxxxx）
        value:'GD_query',
        // 如果value是一个json对象（一般来自全局数据对象），可以通过path路径取具体值
        path:'id'
   },
   {
        key:'name',
        value:'GD_1mw1nDJZIO',
        path:'items.[1].name'
   },
   {
        key:'type',
        value:'blue',
   }
]

// 假设数据当前地址栏url：     
`https://www.xxx.com/?id=12`

// GD_1mw1nDJZIO 的数据是：  
{
    items:[
        {
            name:'avd',
            age:'12'
        },
        {
            name:'dav',
            age:'15'
        }
    ]
}

// 此body数据将被转为 
{
    uid:'12',
    name:'dav',
    type:'blue'
}
```
