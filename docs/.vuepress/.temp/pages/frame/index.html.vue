<template><div><h1 id="框架" tabindex="-1"><a class="header-anchor" href="#框架" aria-hidden="true">#</a> 框架</h1>
<h2 id="依赖层级" tabindex="-1"><a class="header-anchor" href="#依赖层级" aria-hidden="true">#</a> 依赖层级</h2>
<p><img src="@source/frame/gx.png" alt="依赖"></p>
<h2 id="基础示例" tabindex="-1"><a class="header-anchor" href="#基础示例" aria-hidden="true">#</a> 基础示例</h2>
<p>无具体业务开发依赖，通过rxp-core创建实例应用，同时包含：<code v-pre>应用创建</code>、<code v-pre>路由管理</code>、<code v-pre>服务端接口管理</code>、<code v-pre>数据存储管理</code>、<code v-pre>事件命令管理</code>等功能。</p>
<div class="custom-container warning"><p class="custom-container-title">提示</p>
<p><code v-pre>rxp-core</code>依赖（vue 3.2x、vue-router 4.x）</p>
</div>
<h3 id="create" tabindex="-1"><a class="header-anchor" href="#create" aria-hidden="true">#</a> create</h3>
<p><strong>创建一个应用</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> h <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> create <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'rxp-core'</span>

<span class="token comment">// 创建一个最简单的应用</span>
<span class="token keyword">const</span> app<span class="token operator">=</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
   <span class="token literal-property property">frame</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'main_page'</span><span class="token punctuation">,</span>
      <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token string">'这里什么东西都没有'</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pages" tabindex="-1"><a class="header-anchor" href="#pages" aria-hidden="true">#</a> pages</h3>
<p><strong>页面配置管理</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> h<span class="token punctuation">,</span> resolveComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> create <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'rxp-core'</span>

<span class="token comment">// 我是页面A</span>
<span class="token keyword">const</span> pageA <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'page_a'</span><span class="token punctuation">,</span> <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">'#/b'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">'我是页面A'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token comment">// 我是页面B</span>
<span class="token keyword">const</span> pageB <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'page_b'</span><span class="token punctuation">,</span> <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">'#/a'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">'我是页面B'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token comment">// 我是路由配置</span>
<span class="token keyword">const</span> pages <span class="token operator">=</span> <span class="token punctuation">[</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/a'</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'pageA'</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> pageA <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/b'</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'pageB'</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> pageB <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
<span class="token comment">// 创建一个最简单的应用</span>
<span class="token keyword">const</span> app<span class="token operator">=</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
   <span class="token literal-property property">frame</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'main_page'</span><span class="token punctuation">,</span>
      <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token comment">// 添加一个路由的组件</span>
         <span class="token keyword">const</span> routerView<span class="token operator">=</span><span class="token function">h</span><span class="token punctuation">(</span><span class="token function">resolveComponent</span><span class="token punctuation">(</span><span class="token string">'router-view'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
         <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> routerView
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   pages
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="request" tabindex="-1"><a class="header-anchor" href="#request" aria-hidden="true">#</a> request</h3>
<p><strong>服务端接口请求管理</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> updata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'rxp-core'</span>
<span class="token comment">// 添加一个接口请求方法</span>
updata<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
   <span class="token function">getlist</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token literal-property property">url</span><span class="token operator">:</span><span class="token string">'http://172.18.10.60:3002/'</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 使用方法</span>
updata<span class="token punctuation">.</span><span class="token function">getlist</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token operator">=></span><span class="token punctuation">{</span>
   <span class="token comment">// 正常返回</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">err</span><span class="token operator">=></span><span class="token punctuation">{</span>
   <span class="token comment">// 错误返回</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cmd" tabindex="-1"><a class="header-anchor" href="#cmd" aria-hidden="true">#</a> cmd</h3>
<p><strong>命令管理</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> cmd <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'rxp-core'</span>
<span class="token comment">// 添加一个命令</span>
cmd<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'refreshData'</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">// 执行命令了,大于一个name值</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 使用命令</span>
cmd<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token string">'refreshData'</span><span class="token punctuation">,</span><span class="token string">'hello'</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="统一开发平台" tabindex="-1"><a class="header-anchor" href="#统一开发平台" aria-hidden="true">#</a> 统一开发平台</h2>
<h3 id="路由页面" tabindex="-1"><a class="header-anchor" href="#路由页面" aria-hidden="true">#</a> 路由页面</h3>
<p>手动阀</p>
</div></template>


