# 事件管理     
数据没有所有事件的集中管理，所有的事件都是和对用的元件对象相关联。  

## 内置事件     

### 元件点击事件    
所有的元件都可以添加一个点击事件`click`    
```js
   import { helper } from 'rd-runtime'
   // 选择第一个事件数据格式，添加到元件中
   helper.addEvent(sid, 'click')
```

### 元件延迟事件    
延迟事件`timeout`,是在元件添加到舞台后（显示）执行的一个事件    

```js
   import { helper } from 'rd-runtime'
   // 选择第一个事件数据格式，添加到元件中
   helper.addEvent(sid, 'timeout')
```
