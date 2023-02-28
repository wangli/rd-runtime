<template><div><h1 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构" aria-hidden="true">#</a> 数据结构</h1>
<p><img src="@source/assets/sc02.png" alt="数据结构图"></p>
<h2 id="参数说明" tabindex="-1"><a class="header-anchor" href="#参数说明" aria-hidden="true">#</a> 参数说明</h2>
<h3 id="app配置" tabindex="-1"><a class="header-anchor" href="#app配置" aria-hidden="true">#</a> app配置</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
   <span class="token comment">// 应用标题</span>
   <span class="token literal-property property">title</span><span class="token operator">:</span><span class="token string">""</span><span class="token punctuation">,</span>
   <span class="token comment">// 宽度</span>
   <span class="token literal-property property">width</span><span class="token operator">:</span><span class="token number">1920</span><span class="token punctuation">,</span>
   <span class="token comment">// 高度</span>
   <span class="token literal-property property">height</span><span class="token operator">:</span><span class="token number">1080</span><span class="token punctuation">,</span>
   <span class="token comment">// 整体背景样式，根据style样式定义</span>
   <span class="token literal-property property">background</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token comment">// 背景颜色</span>
      <span class="token literal-property property">backgroundColor</span><span class="token operator">:</span><span class="token string">'#000000'</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token comment">// 所有模块列表，当在模块中添加元件时，没有指定模块id，将自动分配到default模块</span>
   <span class="token literal-property property">modules</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token comment">// 动作列表</span>
   <span class="token literal-property property">actions</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token comment">// 全局动态数据源</span>
   <span class="token literal-property property">globalData</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token comment">// 数据api接口网络有关</span>
   <span class="token literal-property property">network</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token comment">// 默认外部数据主机地址</span>
      <span class="token literal-property property">host</span><span class="token operator">:</span><span class="token string">""</span><span class="token punctuation">,</span>
      <span class="token comment">// 默认模式</span>
      <span class="token literal-property property">method</span><span class="token operator">:</span><span class="token string">"GET"</span><span class="token punctuation">,</span>
      <span class="token comment">// 头部信息</span>
      <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="modules模块" tabindex="-1"><a class="header-anchor" href="#modules模块" aria-hidden="true">#</a> modules模块</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
   <span class="token comment">// 模块id，命令控制以id为标识，id可以自定义，但不可重复</span>
   <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token string">"default"</span><span class="token punctuation">,</span>
   <span class="token comment">// 名称</span>
   <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">""</span><span class="token punctuation">,</span>
   <span class="token comment">// 宽度</span>
   <span class="token literal-property property">width</span><span class="token operator">:</span><span class="token number">1920</span><span class="token punctuation">,</span>
   <span class="token comment">// 高度</span>
   <span class="token literal-property property">height</span><span class="token operator">:</span><span class="token number">1080</span><span class="token punctuation">,</span>
   <span class="token comment">// 整体背景样式，根据style样式定义</span>
   <span class="token literal-property property">background</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token comment">// 背景颜色</span>
      <span class="token literal-property property">backgroundColor</span><span class="token operator">:</span><span class="token string">'#000000'</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token comment">// 边框样式，根据style样式定义</span>
   <span class="token literal-property property">border</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token comment">// 是否可见</span>
   <span class="token literal-property property">visible</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
   <span class="token comment">// 模块层级，需要自己控制</span>
   <span class="token literal-property property">zIndex</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
   <span class="token comment">// 类型，模块的类型，通常是所在页面的层级位置。</span>
   <span class="token comment">// content是主内容区域，</span>
   <span class="token comment">// fixed是在content上的固定内容区域，</span>
   <span class="token comment">// overlayer是弹层（此弹层会有一个遮罩蒙版）</span>
   <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">"content"</span><span class="token punctuation">,</span>
   <span class="token comment">// 模板内的组件列表</span>
   <span class="token literal-property property">components</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="component组件-元件" tabindex="-1"><a class="header-anchor" href="#component组件-元件" aria-hidden="true">#</a> component组件(元件)</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
   <span class="token comment">// 组件标识，自动创建</span>
   <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token string">"Vexlse31"</span><span class="token punctuation">,</span>
   <span class="token comment">// 所在模块id</span>
   <span class="token literal-property property">mid</span><span class="token operator">:</span><span class="token string">"default"</span><span class="token punctuation">,</span>
   <span class="token comment">// 类型，用于对组件归类</span>
   <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">""</span><span class="token punctuation">,</span>
   <span class="token comment">// 名称</span>
   <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">""</span><span class="token punctuation">,</span>
   <span class="token comment">// 宽度</span>
   <span class="token literal-property property">width</span><span class="token operator">:</span><span class="token number">1920</span><span class="token punctuation">,</span>
   <span class="token comment">// 高度</span>
   <span class="token literal-property property">height</span><span class="token operator">:</span><span class="token number">1080</span><span class="token punctuation">,</span>
   <span class="token comment">// 整体背景样式，根据style样式定义</span>
   <span class="token literal-property property">background</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token comment">// 背景颜色</span>
      <span class="token literal-property property">backgroundColor</span><span class="token operator">:</span><span class="token string">'#000000'</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token comment">// 边框样式，根据style样式定义</span>
   <span class="token literal-property property">border</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token comment">// 内边距,根据style的样式定义</span>
   <span class="token literal-property property">padding</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token comment">// 是否可见</span>
   <span class="token literal-property property">visible</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
   <span class="token comment">// 模块层级，需要自己控制</span>
   <span class="token literal-property property">zIndex</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
   <span class="token comment">// 向组件传递的数据</span>
   <span class="token literal-property property">data</span><span class="token operator">:</span><span class="token string">""</span><span class="token punctuation">,</span>
   <span class="token comment">// 需要绑定的事件列表</span>
   <span class="token literal-property property">events</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="event事件" tabindex="-1"><a class="header-anchor" href="#event事件" aria-hidden="true">#</a> event事件</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
   <span class="token comment">// 事件名称</span>
   <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'点击'</span><span class="token punctuation">,</span>
   <span class="token comment">// 事件类型如click,interval,timeout等</span>
   <span class="token literal-property property">event</span><span class="token operator">:</span><span class="token string">"click"</span><span class="token punctuation">,</span>
   <span class="token comment">// 事件触发的动作列表，存储动作id</span>
   <span class="token literal-property property">actions</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="action动作" tabindex="-1"><a class="header-anchor" href="#action动作" aria-hidden="true">#</a> action动作</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
   <span class="token comment">// 动作id，自动生成</span>
   <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token string">'act1'</span><span class="token punctuation">,</span>
   <span class="token comment">// 动作</span>
   <span class="token literal-property property">action</span><span class="token operator">:</span><span class="token string">"show"</span><span class="token punctuation">,</span>
   <span class="token comment">// 目标id</span>
   <span class="token literal-property property">target</span><span class="token operator">:</span><span class="token string">"id"</span><span class="token punctuation">,</span>
   <span class="token comment">// 动作值</span>
   <span class="token literal-property property">value</span><span class="token operator">:</span><span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="globaldata全局" tabindex="-1"><a class="header-anchor" href="#globaldata全局" aria-hidden="true">#</a> globalData全局</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
   <span class="token comment">// 动作id，自动生成</span>
   <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token string">'act1'</span><span class="token punctuation">,</span>
   <span class="token comment">// 名称</span>
   <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"数据描述"</span><span class="token punctuation">,</span>
   <span class="token comment">// 数据类型source(原始值),remote(远程)</span>
   <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">"source"</span><span class="token punctuation">,</span>
   <span class="token comment">// 数据值</span>
   <span class="token literal-property property">value</span><span class="token operator">:</span><span class="token string">""</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="remote远程" tabindex="-1"><a class="header-anchor" href="#remote远程" aria-hidden="true">#</a> remote远程</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
   <span class="token comment">// id，自动生成</span>
   <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token string">'RD_xxxx'</span><span class="token punctuation">,</span>
   <span class="token comment">// 远程接口地址</span>
   <span class="token literal-property property">url</span><span class="token operator">:</span><span class="token string">"https://xxxxxxxxxxxxxx"</span><span class="token punctuation">,</span>
   <span class="token comment">// 发送的数据描述</span>
   <span class="token literal-property property">body</span><span class="token operator">:</span><span class="token string">""</span><span class="token punctuation">,</span>
   <span class="token comment">// 发送方式</span>
   <span class="token literal-property property">method</span><span class="token operator">:</span><span class="token string">"get"</span><span class="token punctuation">,</span>
   <span class="token comment">// 数据提取规则</span>
   <span class="token literal-property property">extractRule</span><span class="token operator">:</span><span class="token string">""</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="extractrule格式" tabindex="-1"><a class="header-anchor" href="#extractrule格式" aria-hidden="true">#</a> extractRule格式</h4>
<p>需要将数据处理成图表需要的二维数组的数据格式</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
   <span class="token comment">// 命名</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'year'</span><span class="token punctuation">,</span>
   <span class="token comment">// 路径(一般末尾指向的是一个数组)</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">'data.ued'</span><span class="token punctuation">,</span>
   <span class="token comment">// 需要对照的key（如果数组内是对象，需要单独提取的属性key名称）</span>
    <span class="token literal-property property">mapKey</span><span class="token operator">:</span><span class="token string">'year'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="body格式" tabindex="-1"><a class="header-anchor" href="#body格式" aria-hidden="true">#</a> body格式</h4>
<p>一个数组</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>
   <span class="token punctuation">{</span>
      <span class="token comment">// 发送的字段名</span>
      <span class="token literal-property property">key</span><span class="token operator">:</span><span class="token string">'id'</span><span class="token punctuation">,</span>
      <span class="token comment">// 字段值，可以是原始值，也可以是来自全局数据对象id（GD_xxxxxxx）</span>
      <span class="token literal-property property">value</span><span class="token operator">:</span><span class="token string">'11'</span><span class="token punctuation">,</span>
      <span class="token comment">// 如果value是一个json对象（一般来自全局数据对象），可以通过path路径取具体值</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">''</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2>
<h3 id="数据样例" tabindex="-1"><a class="header-anchor" href="#数据样例" aria-hidden="true">#</a> 数据样例</h3>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
   <span class="token comment">// 标题</span>
   <span class="token string-property property">"title"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
   <span class="token string-property property">"width"</span><span class="token operator">:</span> <span class="token number">1920</span><span class="token punctuation">,</span>
   <span class="token string-property property">"height"</span><span class="token operator">:</span> <span class="token number">1080</span><span class="token punctuation">,</span>
   <span class="token string-property property">"background"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token string-property property">"modules"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
   <span class="token punctuation">{</span>
      <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token string">"default"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"type"</span><span class="token operator">:</span> <span class="token string">"content"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"x"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token string-property property">"y"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token string-property property">"width"</span><span class="token operator">:</span> <span class="token number">500</span><span class="token punctuation">,</span>
      <span class="token string-property property">"height"</span><span class="token operator">:</span> <span class="token number">500</span><span class="token punctuation">,</span>
      <span class="token string-property property">"zIndex"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token string-property property">"background"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token string-property property">"backgroundColor"</span><span class="token operator">:</span> <span class="token string">"#f2f2f2"</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string-property property">"visible"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token string-property property">"components"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
         <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token string">"con01"</span><span class="token punctuation">,</span>
         <span class="token string-property property">"name"</span><span class="token operator">:</span> <span class="token string">"vx-container"</span><span class="token punctuation">,</span>
         <span class="token string-property property">"x"</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
         <span class="token string-property property">"y"</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
         <span class="token string-property property">"width"</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
         <span class="token string-property property">"height"</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
         <span class="token string-property property">"zIndex"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
         <span class="token string-property property">"background"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token string-property property">"backgroundColor"</span><span class="token operator">:</span> <span class="token string">"#ffa00030"</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token string-property property">"visible"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
         <span class="token string-property property">"mid"</span><span class="token operator">:</span> <span class="token string">"default"</span><span class="token punctuation">,</span>
         <span class="token string-property property">"data"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
         <span class="token string-property property">"events"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token string-property property">"name"</span><span class="token operator">:</span> <span class="token string">"点击"</span><span class="token punctuation">,</span>
            <span class="token string-property property">"event"</span><span class="token operator">:</span> <span class="token string">"click"</span><span class="token punctuation">,</span>
            <span class="token string-property property">"actions"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'1'</span><span class="token punctuation">]</span>
         <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
         <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token string">"con02"</span><span class="token punctuation">,</span>
         <span class="token string-property property">"name"</span><span class="token operator">:</span> <span class="token string">"vx-container"</span><span class="token punctuation">,</span>
         <span class="token string-property property">"x"</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
         <span class="token string-property property">"y"</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
         <span class="token string-property property">"width"</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
         <span class="token string-property property">"height"</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
         <span class="token string-property property">"zIndex"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
         <span class="token string-property property">"background"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token string-property property">"backgroundColor"</span><span class="token operator">:</span> <span class="token string">"#16a8f866"</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token string-property property">"visible"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
         <span class="token string-property property">"mid"</span><span class="token operator">:</span> <span class="token string">"default"</span><span class="token punctuation">,</span>
         <span class="token string-property property">"data"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
         <span class="token string-property property">"events"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token string-property property">"name"</span><span class="token operator">:</span> <span class="token string">"点击"</span><span class="token punctuation">,</span>
            <span class="token string-property property">"event"</span><span class="token operator">:</span> <span class="token string">"click"</span><span class="token punctuation">,</span>
            <span class="token string-property property">"actions"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'2'</span><span class="token punctuation">,</span> <span class="token string">'3'</span><span class="token punctuation">]</span>
         <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
         <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token string">"con03"</span><span class="token punctuation">,</span>
         <span class="token string-property property">"name"</span><span class="token operator">:</span> <span class="token string">"vx-container"</span><span class="token punctuation">,</span>
         <span class="token string-property property">"x"</span><span class="token operator">:</span> <span class="token number">180</span><span class="token punctuation">,</span>
         <span class="token string-property property">"y"</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
         <span class="token string-property property">"width"</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
         <span class="token string-property property">"height"</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
         <span class="token string-property property">"zIndex"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
         <span class="token string-property property">"background"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token string-property property">"backgroundColor"</span><span class="token operator">:</span> <span class="token string">"#86956866"</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token string-property property">"visible"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
         <span class="token string-property property">"mid"</span><span class="token operator">:</span> <span class="token string">"default"</span><span class="token punctuation">,</span>
         <span class="token string-property property">"data"</span><span class="token operator">:</span> <span class="token string">"哈哈"</span>
      <span class="token punctuation">}</span><span class="token punctuation">]</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token string">'fixed'</span><span class="token punctuation">,</span>
      <span class="token string-property property">"type"</span><span class="token operator">:</span> <span class="token string">"fixed"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"visible"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token string-property property">"components"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
         <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token string">"con05"</span><span class="token punctuation">,</span>
         <span class="token string-property property">"name"</span><span class="token operator">:</span> <span class="token string">"vx-box"</span><span class="token punctuation">,</span>
         <span class="token string-property property">"visible"</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
         <span class="token string-property property">"x"</span><span class="token operator">:</span><span class="token number">300</span>
      <span class="token punctuation">}</span><span class="token punctuation">]</span>
   <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token string-property property">"actions"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
      <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token string">'1'</span><span class="token punctuation">,</span>
      <span class="token string-property property">"action"</span><span class="token operator">:</span> <span class="token string">"show"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"target"</span><span class="token operator">:</span> <span class="token string">"con03"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"value"</span><span class="token operator">:</span> <span class="token boolean">false</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token string">'2'</span><span class="token punctuation">,</span>
      <span class="token string-property property">"action"</span><span class="token operator">:</span> <span class="token string">"show"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"target"</span><span class="token operator">:</span> <span class="token string">"con03"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"value"</span><span class="token operator">:</span> <span class="token boolean">true</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token string">'3'</span><span class="token punctuation">,</span>
      <span class="token string-property property">"action"</span><span class="token operator">:</span> <span class="token string">"sendData"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"target"</span><span class="token operator">:</span> <span class="token string">"con03"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"value"</span><span class="token operator">:</span> <span class="token string">"888"</span>
   <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token string-property property">"network"</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token string-property property">"host"</span><span class="token operator">:</span> <span class="token string">"https://www.xxx.com"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"method"</span><span class="token operator">:</span> <span class="token string">"GET"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"headers"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token string-property property">"globalData"</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token string-property property">"remote"</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="组件默认混入" tabindex="-1"><a class="header-anchor" href="#组件默认混入" aria-hidden="true">#</a> 组件默认混入</h3>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
   <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 添加的舞台id号</span>
      <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
         <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">""</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 组件类型</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
         <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">"shape"</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 是否可见</span>
      <span class="token literal-property property">visible</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
         <span class="token keyword">default</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// x坐标位置</span>
      <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
         <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">0</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// y坐标位置</span>
      <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
         <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">0</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 默认宽度</span>
      <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
         <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">0</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 默认高度</span>
      <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
         <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">0</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 边框样式</span>
      <span class="token literal-property property">border</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
         <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 透明度</span>
      <span class="token literal-property property">opacity</span><span class="token operator">:</span><span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span>Number<span class="token punctuation">,</span>
         <span class="token keyword">default</span><span class="token operator">:</span><span class="token number">1</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 背景样式</span>
      <span class="token literal-property property">background</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
         <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 阴影样式</span>
      <span class="token literal-property property">shadow</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
         <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// z轴深度</span>
      <span class="token literal-property property">zIndex</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
         <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">0</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 事件列队</span>
      <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span> Array<span class="token punctuation">,</span>
         <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 附加参数</span>
      <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
         <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 是否选中（属于辅助参数，值为true时zIndex值提升100000）</span>
      <span class="token literal-property property">selected</span><span class="token operator">:</span><span class="token punctuation">{</span>
         <span class="token literal-property property">type</span><span class="token operator">:</span>Boolean<span class="token punctuation">,</span>
         <span class="token keyword">default</span><span class="token operator">:</span><span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 传入数据</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> String <span class="token operator">|</span> Number <span class="token operator">|</span> Object <span class="token operator">|</span> Array
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 计算后的尺寸与位置对象（可用于之后的控制计算）</span>
      <span class="token function">rect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">,</span>
            <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>y<span class="token punctuation">,</span>
            <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width<span class="token punctuation">,</span>
            <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>height
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 计算后的基础样式</span>
      <span class="token function">style</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">'absolute'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">+</span> <span class="token string">'px'</span> <span class="token operator">:</span> <span class="token string">'auto'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">+</span> <span class="token string">'px'</span> <span class="token operator">:</span> <span class="token string">'auto'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">+</span> <span class="token string">'px'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">+</span> <span class="token string">'px'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">zIndex</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>selected <span class="token operator">?</span> <span class="token number">100000</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>zIndex <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>zIndex<span class="token punctuation">,</span>
            <span class="token literal-property property">transform</span><span class="token operator">:</span> <span class="token string">'rotate('</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>angle <span class="token operator">+</span> <span class="token string">'deg)'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">opacity</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>opacity <span class="token operator">/</span> <span class="token number">100</span><span class="token punctuation">,</span>
            <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>border<span class="token punctuation">,</span>
            <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>background<span class="token punctuation">,</span>
            <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>shadow
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></div></template>


