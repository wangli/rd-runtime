<template><div><h1 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h1>
<h2 id="create" tabindex="-1"><a class="header-anchor" href="#create" aria-hidden="true">#</a> create</h2>
<p>创建并返回一个vue3的应用实例（与vue3的createApp方法返回的是同一个东西）。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> create <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vapp2'</span>
<span class="token keyword">const</span> app<span class="token operator">=</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>参数</p>
<ul>
<li><code v-pre>Element | string</code> 页面的结构中已存在的DOM 元素ID或一个DOM对象</li>
<li><code v-pre>Object</code> 需要初始<code v-pre>配置项</code>的相关选项</li>
</ul>
</li>
<li>
<p>配置项说明</p>
<ul>
<li>config 框架配置</li>
<li>frame 框架模块</li>
<li>pages 页面列表（含多层路由）</li>
<li>plugin  使用插件</li>
</ul>
</li>
<li>
<p>返回<br>
vue3应用实例 <a href="https://v3.cn.vuejs.org/api/application-api.html#component" target="_blank" rel="noopener noreferrer">查看文档<ExternalLinkIcon/></a></p>
</li>
</ul>
<h2 id="updata" tabindex="-1"><a class="header-anchor" href="#updata" aria-hidden="true">#</a> updata.</h2>
<p>服务端接口处理,包含如下方法</p>
<ul>
<li><code v-pre>sand</code> 接口请求</li>
<li><code v-pre>assign</code> 扩展接口调用方法</li>
<li><code v-pre>addReq</code>  请求拦截</li>
<li><code v-pre>addRes</code>  获取拦截</li>
</ul>
<h3 id="requestobject" tabindex="-1"><a class="header-anchor" href="#requestobject" aria-hidden="true">#</a> requestObject</h3>
<p>请求对象  发起服务端接口请求的参数配置</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">url</span><span class="token operator">:</span><span class="token string">"/web/sso/ticketLogin"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span><span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"avt"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">method</span><span class="token operator">:</span><span class="token string">"GET"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">header</span><span class="token operator">:</span><span class="token punctuation">{</span> <span class="token string-property property">"Content-Type"</span><span class="token operator">:</span> <span class="token string">"multipart/form-data"</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>属性
<ul>
<li><code v-pre>url</code> （必填）请求地址</li>
<li><code v-pre>data</code> （非必填）（默认无）请求的参数</li>
<li><code v-pre>method</code> （非必填）（默认POST）请求方式</li>
<li><code v-pre>headers</code> （非必填）（默认根据配置项）头部信息</li>
</ul>
</li>
</ul>
<h3 id="send" tabindex="-1"><a class="header-anchor" href="#send" aria-hidden="true">#</a> send</h3>
<p>请求服务端接口</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> updata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vapp2'</span>
<span class="token comment">//新增一个调用方法扩展</span>
updata<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'/web/sso/ticketLogin'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token operator">=></span><span class="token punctuation">{</span>
  <span class="token comment">// 数据返回成功</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">err</span><span class="token operator">=></span><span class="token punctuation">{</span>
  <span class="token comment">// 数据返回失败</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>参数
<ul>
<li><code v-pre>Object</code> 接口请求方法的一个集合对象，或包含多个集合对象的数组</li>
</ul>
</li>
<li>请求对象 <code v-pre>接口方法中需要返回的对象</code> <code v-pre>requestObject</code></li>
<li>返回：<code v-pre>Promise</code></li>
</ul>
<h3 id="assign" tabindex="-1"><a class="header-anchor" href="#assign" aria-hidden="true">#</a> assign</h3>
<p>新增服务端接口调用方法名的方法。</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>在具体业务开发中，尽量使用此方法管理需要调用的接口对象，方便统一维护与管理。</p>
</div>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> updata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vapp2'</span>
<span class="token comment">//新增一个调用方法扩展</span>
updata<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'/web/sso/ticketLogin'</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">//使用时会返回一个Promise对象</span>
updata<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token operator">=></span><span class="token punctuation">{</span>
  <span class="token comment">// 正常返回</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">err</span><span class="token operator">=></span><span class="token punctuation">{</span>
  <span class="token comment">// 错误情况</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>参数
<ul>
<li><code v-pre>Object|Array</code> 接口请求方法的一个集合对象，或包含多个集合对象的数组</li>
</ul>
</li>
<li>请求对象 <code v-pre>接口方法中需要返回的对象</code> <code v-pre>requestObject</code></li>
</ul>
<h3 id="addreq" tabindex="-1"><a class="header-anchor" href="#addreq" aria-hidden="true">#</a> addReq</h3>
<p>添加一个数据请求拦截器，拦截器必须返回一个处理后的请求对象。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> updata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vapp2'</span>
<span class="token comment">//新增拦截</span>
updata<span class="token punctuation">.</span><span class="token function">addReq</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">options<span class="token punctuation">,</span>apiname</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> options
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>参数
<ul>
<li><code v-pre>Function</code> 需要有数据返回</li>
</ul>
</li>
<li>方法参数
<ul>
<li><code v-pre>Object</code>  请求对象  <code v-pre>requestObject</code></li>
<li><code v-pre>String</code>  请求接口方法名</li>
</ul>
</li>
</ul>
<h3 id="addres" tabindex="-1"><a class="header-anchor" href="#addres" aria-hidden="true">#</a> addRes</h3>
<p>添加一个数据返回拦截器，拦截器必须返回一个对数据处理后的数据。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> updata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vapp2'</span>
<span class="token comment">//新增拦截</span>
updata<span class="token punctuation">.</span><span class="token function">addRes</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">data<span class="token punctuation">,</span>apiname</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> data
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>参数
<ul>
<li><code v-pre>Function</code> 需要有数据返回</li>
</ul>
</li>
<li>方法参数
<ul>
<li><code v-pre>Object</code>  返回的数据结果</li>
<li><code v-pre>String</code>  请求接口方法名</li>
</ul>
</li>
</ul>
<h2 id="db" tabindex="-1"><a class="header-anchor" href="#db" aria-hidden="true">#</a> db.</h2>
<p>数据存储处理对象，保存到浏览器的localStorage中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> db <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vapp2'</span>
<span class="token comment">// 设置已定义的数据对象userInfo</span>
db<span class="token punctuation">.</span>userInfo<span class="token operator">=</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'avt'</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">12</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="setitems" tabindex="-1"><a class="header-anchor" href="#setitems" aria-hidden="true">#</a> setItems</h3>
<p>添加基本数据存储对象</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> db <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vapp2'</span>
<span class="token comment">//新增基本数据存储</span>
db<span class="token punctuation">.</span><span class="token function">setItems</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'userinfo'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>参数
<ul>
<li><code v-pre>Array</code> 定义需要做存储的数据对象数组</li>
</ul>
</li>
<li>返回
无</li>
</ul>
<h3 id="adddeep" tabindex="-1"><a class="header-anchor" href="#adddeep" aria-hidden="true">#</a> addDeep</h3>
<p>添加深度响应的数据存储对象</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> db <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vapp2'</span>
<span class="token comment">//新增基本数据存储</span>
db<span class="token punctuation">.</span><span class="token function">addDeep</span><span class="token punctuation">(</span><span class="token string">'userinfo'</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>参数
<ul>
<li><code v-pre>String</code> 定义需要做存储的数据对象数组</li>
</ul>
</li>
<li>返回
无</li>
</ul>
<h2 id="event" tabindex="-1"><a class="header-anchor" href="#event" aria-hidden="true">#</a> event.</h2>
<p>事件管理对象</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> event <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vapp2'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="on" tabindex="-1"><a class="header-anchor" href="#on" aria-hidden="true">#</a> on</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>{string} name</code> 事件名称</li>
<li><code v-pre>{function} fn</code> 事件触发的方法</li>
</ul>
</li>
<li>说明：<br>
添加事件，将对象的key,value值扩展到自身上</li>
</ul>
<h3 id="once" tabindex="-1"><a class="header-anchor" href="#once" aria-hidden="true">#</a> once</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>{string} name</code> 事件名称</li>
<li><code v-pre>{function} fn</code> 事件触发的方法</li>
</ul>
</li>
<li>说明：<br>
与on方法相同，但只执行一次</li>
</ul>
<h3 id="off" tabindex="-1"><a class="header-anchor" href="#off" aria-hidden="true">#</a> off</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>{string} name</code> 事件名称</li>
<li><code v-pre>{function} fn</code> 事件触发的方法</li>
</ul>
</li>
<li>说明：<br>
删除事件</li>
</ul>
<h3 id="emit" tabindex="-1"><a class="header-anchor" href="#emit" aria-hidden="true">#</a> emit</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>{string} name</code> 事件名称</li>
<li><code v-pre>{...arguments} object</code> 发送的参数</li>
</ul>
</li>
<li>说明：<br>
广播事件</li>
</ul>
<h2 id="config" tabindex="-1"><a class="header-anchor" href="#config" aria-hidden="true">#</a> config.</h2>
<p>配置管理对象</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> config <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vapp2'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="init" tabindex="-1"><a class="header-anchor" href="#init" aria-hidden="true">#</a> init</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>{object} config</code> 配置对象</li>
</ul>
</li>
<li>说明：<br>
初始化配置的内容（覆盖默认配置）</li>
</ul>
<h3 id="system" tabindex="-1"><a class="header-anchor" href="#system" aria-hidden="true">#</a> system.</h3>
<p>系统信息数据</p>
<ul>
<li><code v-pre>name</code> 系统名称标识</li>
<li><code v-pre>title</code> 系统标题</li>
<li><code v-pre>copyright</code> 版权信息</li>
</ul>
<h3 id="network" tabindex="-1"><a class="header-anchor" href="#network" aria-hidden="true">#</a> network.</h3>
<p>网络数据请起信息</p>
<ul>
<li><code v-pre>host</code>：<code v-pre>''</code> 主机地址</li>
<li><code v-pre>authKey</code>：<code v-pre>'Authorization'</code> 令牌标识</li>
<li><code v-pre>responseType</code>：<code v-pre>'json'</code> 返回数据类型</li>
<li><code v-pre>method</code>：<code v-pre>'POST'</code> 默认请求方法</li>
</ul>
<h3 id="state" tabindex="-1"><a class="header-anchor" href="#state" aria-hidden="true">#</a> state.</h3>
<p>状态码管理</p>
<ul>
<li><code v-pre>code</code> 系统名称标识
<ul>
<li><code v-pre>ok</code>：<code v-pre>200</code> 成功</li>
<li><code v-pre>nothing</code>：<code v-pre>404</code> 找不到</li>
<li><code v-pre>token</code>：<code v-pre>1000</code> 令牌失效</li>
<li><code v-pre>error</code>：<code v-pre>'error'</code> 错误</li>
</ul>
</li>
</ul>
<h3 id="navs" tabindex="-1"><a class="header-anchor" href="#navs" aria-hidden="true">#</a> navs.</h3>
<p>导航菜单信息</p>
<ul>
<li><code v-pre>menus</code> 所有菜单树</li>
<li><code v-pre>sendMenus</code> 二级导航菜单</li>
<li><code v-pre>currChannel</code> 当前打开的频道（所在一级菜单）</li>
<li><code v-pre>currPage</code> 当前页面</li>
<li><code v-pre>openPages</code> 已开页面列表</li>
</ul>
<h3 id="frame" tabindex="-1"><a class="header-anchor" href="#frame" aria-hidden="true">#</a> frame.</h3>
<p>框架级页面信息</p>
<ul>
<li><code v-pre>login</code>：<code v-pre>'app_login'</code> 登录页面</li>
<li><code v-pre>main</code>：<code v-pre>'app_main'</code> 内部主页面</li>
</ul>
<h3 id="pages" tabindex="-1"><a class="header-anchor" href="#pages" aria-hidden="true">#</a> pages.  *</h3>
<div class="custom-container danger"><p class="custom-container-title">DANGER</p>
<p>内部页面管理（未实现）</p>
</div>
<h3 id="style" tabindex="-1"><a class="header-anchor" href="#style" aria-hidden="true">#</a> style.  *</h3>
<div class="custom-container danger"><p class="custom-container-title">DANGER</p>
<p>样式主题（未实现）</p>
<ul>
<li><code v-pre>theme</code> 主题信息</li>
<li><code v-pre>customize</code> 基础ui样式定义</li>
</ul>
</div>
<h2 id="pages-1" tabindex="-1"><a class="header-anchor" href="#pages-1" aria-hidden="true">#</a> pages.</h2>
<p>页面管理对象</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> pages <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vapp2'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>pageRoute</strong> 建议路由基本信息</p>
<ul>
<li><code v-pre>label</code> 名称</li>
<li><code v-pre>icon</code> 图标</li>
<li><code v-pre>key</code> 路由唯一键值（或自动生成的哈希值）</li>
<li><code v-pre>opid</code>  唯一id</li>
<li><code v-pre>fullPath</code>  页面完全带参路径</li>
<li><code v-pre>hash</code>  哈希值</li>
<li><code v-pre>name</code>  页面路由对象名称</li>
<li><code v-pre>path</code>  页面路径</li>
<li><code v-pre>query</code> url请求参数</li>
<li><code v-pre>params</code> 路由请求参数</li>
<li><code v-pre>meta</code> 路由配置的meta值</li>
</ul>
<h3 id="go" tabindex="-1"><a class="header-anchor" href="#go" aria-hidden="true">#</a> go</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>value: number|string|RouteLocationRaw</code></li>
<li><code v-pre>replace: boolean</code> 是否替换当前</li>
</ul>
</li>
<li>说明：<br>
前进后退</li>
</ul>
<h3 id="push" tabindex="-1"><a class="header-anchor" href="#push" aria-hidden="true">#</a> push</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>RouteLocationRaw</code> vue-router4 RouteLocationRaw</li>
</ul>
</li>
<li>说明：<br>
跳转新的URL地址，加入历史堆栈</li>
</ul>
<h3 id="replace" tabindex="-1"><a class="header-anchor" href="#replace" aria-hidden="true">#</a> replace</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>RouteLocationRaw</code> vue-router4 RouteLocationRaw</li>
</ul>
</li>
<li>说明：<br>
跳转新的URL地址，替换当前历史堆栈位置</li>
</ul>
<h3 id="back" tabindex="-1"><a class="header-anchor" href="#back" aria-hidden="true">#</a> back</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>无</code></li>
</ul>
</li>
<li>说明：<br>
后退</li>
</ul>
<h3 id="close" tabindex="-1"><a class="header-anchor" href="#close" aria-hidden="true">#</a> close</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>pageRoute</code></li>
</ul>
</li>
<li>说明：<br>
关闭指定页面，以页面路由全路径来匹配</li>
</ul>
<h2 id="cmd" tabindex="-1"><a class="header-anchor" href="#cmd" aria-hidden="true">#</a> cmd.</h2>
<p>命令控制器管理</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> cmd <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vapp2'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="message" tabindex="-1"><a class="header-anchor" href="#message" aria-hidden="true">#</a> message</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>value: string</code> 消息内容</li>
<li><code v-pre>type: string</code> 消息类型</li>
<li><code v-pre>options: object</code> 消息配置参数</li>
</ul>
</li>
<li>说明：<br>
自带消息弹窗方法</li>
</ul>
<h3 id="add" tabindex="-1"><a class="header-anchor" href="#add" aria-hidden="true">#</a> add</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>name: string</code> 命令</li>
<li><code v-pre>action: function</code> 执行的方法动作</li>
</ul>
</li>
<li>说明：<br>
添加一个新的动作命令</li>
</ul>
<h3 id="del" tabindex="-1"><a class="header-anchor" href="#del" aria-hidden="true">#</a> del</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>name: string</code> 命令</li>
</ul>
</li>
<li>说明：<br>
删除一个动作命令</li>
</ul>
<h3 id="execute" tabindex="-1"><a class="header-anchor" href="#execute" aria-hidden="true">#</a> execute</h3>
<ul>
<li>参数：
<ul>
<li><code v-pre>name: string</code> 命令</li>
<li><code v-pre>arguments</code></li>
</ul>
</li>
<li>说明：<br>
执行一个命令</li>
</ul>
</div></template>


