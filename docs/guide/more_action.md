# 动作管理     
数据没有所有事件的集中管理，所有的事件都是和对用的元件对象相关联。  


## 动作数据对象     
```js
{
    id:'AC_AFl3r23',
    action:'click',
    target:'as34253jk5j23l4k5j345l',
    value:false,
    description:'隐藏元件A'
}
```

## 获取所有动作

* 获取动作集合      
此对象是一个reactive的响应对象，以动作id作为键的集合    
```js
import {rdata} from 'rd-runtime'
const actions=rdata.getActionsData()
```

* 获取动作列表  
此对象是一个普通数组，非响应    
```js
import {rdata} from 'rd-runtime'
// 返回所有
const actionList=rdata.getActionList()
//返回指定id数组的动作列表
const actionList2=rdata.getActionList(ids)
```

## 添加新动作   
```js
import {helper,typeModel} from 'rd-runtime'
// 示例取第一个动作
let actionType=typeModel.events[0].action
// 动作类型，目标对象id，值，描述
const action=helper.createActionData(actionType,"target",false,"隐藏target")
```

## 自定义动作方法   
默认的几个动作也许无法满足开发需求，现在你可以创建一个自己的动作插件，让动作更丰富多彩。    
**动作包含的基本特性**  
```js
{
    name: '动作名称',
    type: "动作类型，默认null",
    target: '执行对象，默认component',
    value: "动作参数，默认空字符",
    action: "动作方法名，必须",
    handle:"动作方法函数，必须"
}
```
```js
import { controller } from 'rd-runtime'
import { gsap } from "gsap"

// 设置一个新动作后，将同时在ActionTypes内添加描述
// handle方法的第一个参数是目标数据对象
controller.useAction({
    name:'渐变消失',
    action:'hide',
    handle(target){
        gsap.to(target, {
            opacity: 0,
            duration: .4,
            onComplete:function() {
                target.visible=false
            }
        });
    }
})
```