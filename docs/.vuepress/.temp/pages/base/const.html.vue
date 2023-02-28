<template><div><h1 id="参数定义" tabindex="-1"><a class="header-anchor" href="#参数定义" aria-hidden="true">#</a> 参数定义</h1>
<h2 id="events" tabindex="-1"><a class="header-anchor" href="#events" aria-hidden="true">#</a> EVENTS</h2>
<p>内置事件</p>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">EVENTS</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'rd-runtime'</span>
</code></pre></div><h3 id="click-background" tabindex="-1"><a class="header-anchor" href="#click-background" aria-hidden="true">#</a> CLICK_BACKGROUND</h3>
<p><code v-pre>EVENTS.CLICK_BACKGROUND</code>
点击舞台背景</p>
<h3 id="click-sprite" tabindex="-1"><a class="header-anchor" href="#click-sprite" aria-hidden="true">#</a> CLICK_SPRITE</h3>
<p><code v-pre>EVENTS.CLICK_SPRITE</code>
点击舞台元件获取id信息</p>
<h3 id="mouseover-sprite" tabindex="-1"><a class="header-anchor" href="#mouseover-sprite" aria-hidden="true">#</a> MOUSEOVER_SPRITE</h3>
<p><code v-pre>EVENTS.MOUSEOVER_SPRITE</code>
鼠标经过舞台元件</p>
<h3 id="mouseout-sprite" tabindex="-1"><a class="header-anchor" href="#mouseout-sprite" aria-hidden="true">#</a> MOUSEOUT_SPRITE</h3>
<p><code v-pre>EVENTS.MOUSEOUT_SPRITE</code>
鼠标离开舞台元件</p>
<h3 id="mouseout-sprite-1" tabindex="-1"><a class="header-anchor" href="#mouseout-sprite-1" aria-hidden="true">#</a> MOUSEOUT_SPRITE</h3>
<p><code v-pre>EVENTS.STAGE_MOUNTED</code>
舞台渲染完毕</p>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code> <span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">EVENTS</span><span class="token punctuation">,</span>cmd <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'rd-runtime'</span>
 cmd<span class="token punctuation">.</span><span class="token function">addEventLister</span><span class="token punctuation">(</span><span class="token constant">EVENTS</span><span class="token punctuation">.</span><span class="token constant">CLICK_SPRITE</span><span class="token punctuation">,</span><span class="token parameter">res</span><span class="token operator">=></span><span class="token punctuation">{</span>
     <span class="token comment">//元件的基本信息</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
 cmd<span class="token punctuation">.</span><span class="token function">addEventLister</span><span class="token punctuation">(</span><span class="token constant">EVENTS</span><span class="token punctuation">.</span><span class="token constant">MOUSEOVER_SPRITE</span><span class="token punctuation">,</span><span class="token parameter">res</span><span class="token operator">=></span><span class="token punctuation">{</span>
     <span class="token comment">//元件的基本信息</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
 cmd<span class="token punctuation">.</span><span class="token function">addEventLister</span><span class="token punctuation">(</span><span class="token constant">EVENTS</span><span class="token punctuation">.</span><span class="token constant">MOUSEOUT_SPRITE</span><span class="token punctuation">,</span><span class="token parameter">res</span><span class="token operator">=></span><span class="token punctuation">{</span>
     <span class="token comment">//元件的基本信息</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="typemodel" tabindex="-1"><a class="header-anchor" href="#typemodel" aria-hidden="true">#</a> typeModel</h2>
<p>相关数据选择模型</p>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> typeModel <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'rd-runtime'</span>
</code></pre></div><h3 id="events-1" tabindex="-1"><a class="header-anchor" href="#events-1" aria-hidden="true">#</a> events</h3>
<p>事件类型列表</p>
<ul>
<li>属性</li>
</ul>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code>typeModel<span class="token punctuation">.</span>events
</code></pre></div><ul>
<li>返回</li>
</ul>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'点击'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">event</span><span class="token operator">:</span> <span class="token string">'click'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">pams</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'定时任务'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">event</span><span class="token operator">:</span> <span class="token string">'interval'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">pams</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'延迟任务'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">event</span><span class="token operator">:</span> <span class="token string">'timeout'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">pams</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre></div><h3 id="component" tabindex="-1"><a class="header-anchor" href="#component" aria-hidden="true">#</a> component</h3>
<p>组件类型列表</p>
<ul>
<li>属性</li>
</ul>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code>typeModel<span class="token punctuation">.</span>component
</code></pre></div><ul>
<li>返回</li>
</ul>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'图表'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'chart'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'文本'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'text'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'表格'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'table'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'形状'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'shape'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'菜单'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'menu'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'媒体'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'media'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'地图'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'map'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'3D'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'3d'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'其它'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'other'</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre></div><h3 id="actions" tabindex="-1"><a class="header-anchor" href="#actions" aria-hidden="true">#</a> actions</h3>
<p>基本动作类型列表</p>
<ul>
<li>属性</li>
</ul>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code>typeModel<span class="token punctuation">.</span>actions
</code></pre></div><ul>
<li>返回</li>
</ul>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'显示'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">"show"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'Boolean'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'component'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'发送数据'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">"sendData"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'Object'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'component'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">""</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'打开外链'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">'href'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'url'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">''</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'页面切换'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">'singleModule'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'modules'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'String'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">""</span>
<span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre></div><h3 id="datatype" tabindex="-1"><a class="header-anchor" href="#datatype" aria-hidden="true">#</a> dataType</h3>
<p>数据类型</p>
<ul>
<li>属性</li>
</ul>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code>typeModel<span class="token punctuation">.</span>dataType
</code></pre></div><ul>
<li>返回</li>
</ul>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'原始数据'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'source'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'远程数据'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'remote'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'本地数据'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'local'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre></div></div></template>


