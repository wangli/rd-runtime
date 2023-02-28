<template><div><h1 id="公共组件" tabindex="-1"><a class="header-anchor" href="#公共组件" aria-hidden="true">#</a> 公共组件</h1>
<h2 id="rxp-form-data" tabindex="-1"><a class="header-anchor" href="#rxp-form-data" aria-hidden="true">#</a> rxp-form-data</h2>
<p>可配置提交表单</p>
<p><strong>Props 配置</strong></p>
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>config</td>
<td>object</td>
<td>配置参数</td>
<td>{form,items}</td>
</tr>
</tbody>
</table>
<ul>
<li>config
<ul>
<li>form
<ul>
<li><code v-pre>cols</code> number 表单列数 （默认：<code v-pre>2</code>）</li>
<li><code v-pre>buttons[]-&gt;button</code> array 按钮列表
<ul>
<li><code v-pre>txt:string</code> 按钮文本 （默认：<code v-pre>提交</code>）</li>
<li><code v-pre>onClick:string|function</code> 按钮事件，内置的三个类型：<code v-pre>confirm</code>确认、<code v-pre>cancel</code>取消、<code v-pre>reset</code>清空</li>
<li><code v-pre>attrType:string</code> html原生按钮type属性值</li>
<li><code v-pre>firstLine:boolean</code> 多行情况下，是否至于上方</li>
</ul>
</li>
<li><code v-pre>props</code> object naiveui原表单(Form组件)参数配置 （默认：<code v-pre>{inline: false}</code>）</li>
<li><code v-pre>bsProps</code> object 按钮列表容器的naiveui(space组件)参数配置</li>
<li><code v-pre>extPams</code> object 扩展字段信息（会合并到form表单最后输出的数据中）</li>
</ul>
</li>
<li>items[ ]-&gt;item
<ul>
<li><code v-pre>name:string</code> 组件名称 （组件名称会自动在开头拼接<code v-pre>n-</code>的字符串，因此使用的naiveui组件无需写此开头）</li>
<li><code v-pre>key:string</code>  提交的字段名称</li>
<li><code v-pre>label:string</code> 标签名称</li>
<li><code v-pre>default:any</code> 默认值，以组件需要传递的值类型为准</li>
<li><code v-pre>formItem:object</code> 表单项的参数配置（如栅格组件项）</li>
<li><code v-pre>props:object</code>  组件的Props属性</li>
</ul>
</li>
</ul>
</li>
</ul>
<p><strong>示例</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token comment">// 表单配置</span>
  <span class="token literal-property property">form</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">cols</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">buttons</span><span class="token operator">:</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span><span class="token literal-property property">txt</span><span class="token operator">:</span><span class="token string">'新增'</span><span class="token punctuation">,</span><span class="token literal-property property">onClick</span><span class="token operator">:</span><span class="token string">'confirm'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span><span class="token literal-property property">txt</span><span class="token operator">:</span><span class="token string">'清空'</span><span class="token punctuation">,</span><span class="token literal-property property">onClick</span><span class="token operator">:</span><span class="token string">'reset'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span><span class="token literal-property property">txt</span><span class="token operator">:</span><span class="token string">'返回'</span><span class="token punctuation">,</span><span class="token function">onClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 事件方法</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token literal-property property">inline</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token comment">// 添加一个表单验证</span>
      <span class="token literal-property property">rules</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">user</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'请输入姓名'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">trigger</span><span class="token operator">:</span> <span class="token string">'blur'</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">phone</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'请输入电话号码'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">trigger</span><span class="token operator">:</span> <span class="token string">'input'</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 表单项列表</span>
  <span class="token literal-property property">items</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'input'</span><span class="token punctuation">,</span> <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'姓名'</span><span class="token punctuation">,</span><span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">'user'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'input'</span><span class="token punctuation">,</span> <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'电话'</span><span class="token punctuation">,</span><span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">'phone'</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>事件</strong></p>
<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>confirm-data</td>
<td>确认数据操作</td>
<td>--</td>
</tr>
<tr>
<td>change-data</td>
<td>数据变更</td>
<td>--</td>
</tr>
<tr>
<td>cancel</td>
<td>取消操作</td>
<td>--</td>
</tr>
</tbody>
</table>
<h2 id="rxp-table-data" tabindex="-1"><a class="header-anchor" href="#rxp-table-data" aria-hidden="true">#</a> rxp-table-data</h2>
<p>可配置数据表格</p>
<p>Props 配置</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>table</td>
<td>object</td>
<td>表格配置（基于n-data-table的Props）</td>
<td>-</td>
</tr>
<tr>
<td>pagination</td>
<td>object</td>
<td>分页配置（基于n-pagination的Props）</td>
<td>-</td>
</tr>
<tr>
<td>filter</td>
<td>object</td>
<td>筛选配置</td>
<td>-</td>
</tr>
<tr>
<td>checkedKeys</td>
<td>object</td>
<td>勾选绑定</td>
<td>-</td>
</tr>
<tr>
<td>config</td>
<td>object</td>
<td>其它配置</td>
<td>-</td>
</tr>
</tbody>
</table>
<ul>
<li>
<p><code v-pre>pagination</code>  分页默认值</p>
<ul>
<li><code v-pre>page:number</code>: <code v-pre>1</code></li>
<li><code v-pre>itemCount:number</code>: <code v-pre>1</code></li>
<li><code v-pre>pageSize:number</code>: <code v-pre>20</code></li>
<li><code v-pre>pageSizes:array</code>: <code v-pre>[10, 20, 30, 40, 50]</code></li>
<li><code v-pre>showSizePicker:boolean</code>: <code v-pre>true</code></li>
</ul>
</li>
<li>
<p><code v-pre>filter</code> 同 <code v-pre>rxp-form-data</code> config组件配置</p>
</li>
<li>
<p><code v-pre>checkedKeys:array</code> 双向绑定的表格数据指定勾选的key值数组</p>
</li>
<li>
<p><code v-pre>config</code> 其它配置</p>
<ul>
<li><code v-pre>height:number</code>:<code v-pre>300</code> 默认高度</li>
<li><code v-pre>api:string</code>  需要调用的接口方法名，可以是updata的方法名，如果不存储默认调用updata的send方法</li>
<li><code v-pre>requestHandle:function</code> 请求数据钩子方法，方法实现需要返回处理后的数据</li>
<li><code v-pre>resolveHandle:function</code> 返回数据钩子方法，处理完返回的数据将直接赋值给列表项（需要返回数组形式），使用此方法后内置分页数据将不在受控。</li>
</ul>
</li>
</ul>
<p>事件</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>change</td>
<td>数据变化事件</td>
<td>--</td>
</tr>
</tbody>
</table>
<ul>
<li>change 事件返回对象属性
<ul>
<li>type 事件类型（data|filter|checked）</li>
<li>data 数据</li>
</ul>
</li>
</ul>
<h2 id="rxp-button" tabindex="-1"><a class="header-anchor" href="#rxp-button" aria-hidden="true">#</a> rxp-button</h2>
<p>基于n-button扩展的按钮</p>
<p>Props 配置（新增）</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>icon</td>
<td>string</td>
<td>按钮图标</td>
<td>-</td>
</tr>
<tr>
<td>api</td>
<td>string</td>
<td>loading状态处理，添加需要监听数据请求接口api的方法名</td>
<td>-</td>
</tr>
</tbody>
</table>
<h2 id="rxp-container" tabindex="-1"><a class="header-anchor" href="#rxp-container" aria-hidden="true">#</a> rxp-container</h2>
</div></template>


