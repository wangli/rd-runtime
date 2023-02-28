<template><div><h1 id="config" tabindex="-1"><a class="header-anchor" href="#config" aria-hidden="true">#</a> config</h1>
<h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2>
<p><code v-pre>config.js</code>  系统配置项</p>
<h3 id="配置结构" tabindex="-1"><a class="header-anchor" href="#配置结构" aria-hidden="true">#</a> 配置结构</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
   <span class="token literal-property property">system</span><span class="token operator">:</span> <span class="token punctuation">{</span>      
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'rxapp'</span><span class="token punctuation">,</span><span class="token comment">//系统标识（英文字母）</span>
      <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span><span class="token comment">//系统标题</span>
      <span class="token literal-property property">copyright</span><span class="token operator">:</span> <span class="token string">''</span><span class="token comment">//版权信息</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token comment">//    网络接口服务</span>
   <span class="token literal-property property">network</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span><span class="token comment">//主机地址</span>
      <span class="token literal-property property">authKey</span><span class="token operator">:</span> <span class="token string">'Authorization'</span><span class="token punctuation">,</span><span class="token comment">//令牌存储名称</span>
      <span class="token comment">//默认头部信息</span>
      <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token string-property property">'Access-Control-Allow-Origin'</span><span class="token operator">:</span> <span class="token string">'*'</span><span class="token punctuation">,</span>
         <span class="token string-property property">'Content-Type'</span><span class="token operator">:</span> <span class="token string">'application/json'</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">responseType</span><span class="token operator">:</span> <span class="token string">'json'</span><span class="token comment">//返回数据类型</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token comment">//样式风格配置</span>
   <span class="token literal-property property">style</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token string">'default'</span><span class="token punctuation">,</span><span class="token comment">//主题</span>
      <span class="token literal-property property">layout</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span><span class="token comment">//布局</span>
      <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token string">'14px'</span><span class="token punctuation">,</span><span class="token comment">//字号</span>
      <span class="token literal-property property">logo</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span><span class="token comment">//logo</span>
      <span class="token literal-property property">loginBackground</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span><span class="token comment">//登录页背景 </span>
      <span class="token literal-property property">headBackground</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span><span class="token comment">//内页头部背景</span>
      <span class="token literal-property property">customize</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token comment">//样式覆盖</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 接口请求状态码</span>
      <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">ok</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span><span class="token comment">//成功</span>
         <span class="token literal-property property">nothing</span><span class="token operator">:</span> <span class="token number">404</span><span class="token punctuation">,</span><span class="token comment">//找不到</span>
         <span class="token literal-property property">token</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token comment">//令牌失效</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token comment">//框架配置</span>
   <span class="token literal-property property">frame</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">login</span><span class="token operator">:</span> <span class="token string">'app_login'</span><span class="token punctuation">,</span><span class="token comment">//默认未登录组件</span>
      <span class="token literal-property property">main</span><span class="token operator">:</span> <span class="token string">'app_main'</span><span class="token comment">//默认主页面组件</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token comment">//导航菜单</span>
   <span class="token literal-property property">navs</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token comment">//权限</span>
   <span class="token literal-property property">authority</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="system" tabindex="-1"><a class="header-anchor" href="#system" aria-hidden="true">#</a> system.</h3>
<p>系统配置</p>
<ul>
<li>name</li>
<li>title</li>
<li>copyright</li>
</ul>
<h3 id="network" tabindex="-1"><a class="header-anchor" href="#network" aria-hidden="true">#</a> network.</h3>
<p>接口请求配置</p>
<ul>
<li>name</li>
<li>title</li>
<li>copyright</li>
</ul>
<h3 id="style" tabindex="-1"><a class="header-anchor" href="#style" aria-hidden="true">#</a> style.</h3>
<p>样式风格</p>
<ul>
<li>theme</li>
<li>layout</li>
<li>fontSize</li>
<li>logo</li>
<li>loginBackground</li>
<li>headBackground</li>
<li>customize</li>
</ul>
<h3 id="state" tabindex="-1"><a class="header-anchor" href="#state" aria-hidden="true">#</a> state.</h3>
<p>状态码</p>
<ul>
<li>code.
<ul>
<li>ok</li>
<li>token</li>
<li>nothing</li>
</ul>
</li>
</ul>
<h3 id="frame" tabindex="-1"><a class="header-anchor" href="#frame" aria-hidden="true">#</a> frame.</h3>
<p>框架配置</p>
<ul>
<li>login</li>
<li>main</li>
</ul>
<h3 id="navs" tabindex="-1"><a class="header-anchor" href="#navs" aria-hidden="true">#</a> navs.</h3>
<p>导航菜单</p>
<h3 id="authority" tabindex="-1"><a class="header-anchor" href="#authority" aria-hidden="true">#</a> authority.</h3>
<p>权限</p>
</div></template>


