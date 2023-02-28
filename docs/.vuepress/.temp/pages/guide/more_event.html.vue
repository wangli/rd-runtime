<template><div><h1 id="事件管理" tabindex="-1"><a class="header-anchor" href="#事件管理" aria-hidden="true">#</a> 事件管理</h1>
<p>数据没有所有事件的集中管理，所有的事件都是和对用的元件对象相关联。</p>
<h2 id="内置事件" tabindex="-1"><a class="header-anchor" href="#内置事件" aria-hidden="true">#</a> 内置事件</h2>
<h3 id="元件点击事件" tabindex="-1"><a class="header-anchor" href="#元件点击事件" aria-hidden="true">#</a> 元件点击事件</h3>
<p>所有的元件都可以添加一个点击事件<code v-pre>click</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>   <span class="token keyword">import</span> <span class="token punctuation">{</span> helper <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'rd-runtime'</span>
   <span class="token comment">// 选择第一个事件数据格式，添加到元件中</span>
   helper<span class="token punctuation">.</span><span class="token function">addEvent</span><span class="token punctuation">(</span>sid<span class="token punctuation">,</span> <span class="token string">'click'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="元件延迟事件" tabindex="-1"><a class="header-anchor" href="#元件延迟事件" aria-hidden="true">#</a> 元件延迟事件</h3>
<p>延迟事件<code v-pre>timeout</code>,是在元件添加到舞台后（显示）执行的一个事件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>   <span class="token keyword">import</span> <span class="token punctuation">{</span> helper <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'rd-runtime'</span>
   <span class="token comment">// 选择第一个事件数据格式，添加到元件中</span>
   helper<span class="token punctuation">.</span><span class="token function">addEvent</span><span class="token punctuation">(</span>sid<span class="token punctuation">,</span> <span class="token string">'timeout'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


