<template><div><h1 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手" aria-hidden="true">#</a> 快速上手</h1>
<h2 id="开发环境" tabindex="-1"><a class="header-anchor" href="#开发环境" aria-hidden="true">#</a> 开发环境</h2>
<ul>
<li>基础开发环境下载并安装<br>
<a href="https://nodejs.org/zh-cn/" target="_blank" rel="noopener noreferrer">node下载<ExternalLinkIcon/></a><br>
<a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank" rel="noopener noreferrer">chrome下载<ExternalLinkIcon/></a><br>
<a href="https://devtools.vuejs.org/guide/installation.html" target="_blank" rel="noopener noreferrer">vue.js devtools下载<ExternalLinkIcon/></a><br>
<a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">vs code下载<ExternalLinkIcon/></a><br>
<a href="https://classic.yarnpkg.com/en/docs/install" target="_blank" rel="noopener noreferrer">yarn 下载<ExternalLinkIcon/></a> <strong>推荐</strong></li>
</ul>
<p><strong>npm 和 yarn 仓库地址设置</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm <span class="token keyword">set</span> registry http<span class="token operator">:</span><span class="token operator">/</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">172.18.10.50</span><span class="token regex-delimiter">/</span></span>
yarn config <span class="token keyword">set</span> registry http<span class="token operator">:</span><span class="token operator">/</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">172.18.10.50</span><span class="token regex-delimiter">/</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="项目搭建" tabindex="-1"><a class="header-anchor" href="#项目搭建" aria-hidden="true">#</a> 项目搭建</h2>
<ol>
<li>git拉取框架</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>git clone http://172.18.10.32/TC/rxadminframe.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>切换到dev分支并创建自己的开发分支</p>
<ol start="2">
<li>初始化依赖包</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>yarn install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>开发运行</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>yarn dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token constant">RDP</span>
 <span class="token operator">|</span><span class="token operator">--</span> libs <span class="token comment">//外部独立模块</span>
 <span class="token operator">|</span><span class="token operator">--</span> node_modules <span class="token comment">//npm包模块</span>
 <span class="token operator">|</span><span class="token operator">--</span> <span class="token keyword">public</span> <span class="token comment">//公共资源文件（非打包）</span>
 <span class="token operator">|</span><span class="token operator">--</span> src <span class="token comment">//项目源码</span>
    <span class="token operator">|</span><span class="token operator">--</span> assets <span class="token comment">//项目静态资源，css，image，svg，字体等</span>
    <span class="token operator">|</span><span class="token operator">--</span> common <span class="token comment">//通用方法</span>
        <span class="token operator">|</span><span class="token operator">--</span> index<span class="token punctuation">.</span>js
        <span class="token operator">|</span><span class="token operator">--</span> <span class="token operator">...</span>
    <span class="token operator">|</span><span class="token operator">--</span> components <span class="token comment">//vue组件</span>
        <span class="token operator">|</span><span class="token operator">--</span> index<span class="token punctuation">.</span>js
        <span class="token operator">|</span><span class="token operator">--</span> <span class="token operator">...</span>
    <span class="token operator">|</span><span class="token operator">--</span> service <span class="token comment">//服务端api接口调用维护</span>
        <span class="token operator">|</span><span class="token operator">--</span> index<span class="token punctuation">.</span>js <span class="token comment">//接口导出</span>
        <span class="token operator">|</span><span class="token operator">--</span> <span class="token operator">...</span>
    <span class="token operator">|</span><span class="token operator">--</span> config <span class="token comment">//配置项</span>
        <span class="token operator">|</span><span class="token operator">--</span> index<span class="token punctuation">.</span>js <span class="token comment">//配置项导出</span>
        <span class="token operator">|</span><span class="token operator">--</span> <span class="token operator">...</span>
    <span class="token operator">|</span><span class="token operator">--</span> frame <span class="token comment">// 页面框架</span>
        <span class="token operator">|</span><span class="token operator">--</span> index<span class="token punctuation">.</span>js <span class="token comment">//框架导出</span>
        <span class="token operator">|</span><span class="token operator">--</span> <span class="token operator">...</span>
    <span class="token operator">|</span><span class="token operator">--</span> pages <span class="token comment">// 内部页面</span>
        <span class="token operator">|</span><span class="token operator">--</span> index<span class="token punctuation">.</span>js <span class="token comment">//页面路由配置导出</span>
        <span class="token operator">|</span><span class="token operator">--</span> <span class="token operator">...</span>
    <span class="token operator">|</span><span class="token operator">--</span> main<span class="token punctuation">.</span>js <span class="token comment">//项目启动入口</span>
 <span class="token operator">|</span><span class="token operator">--</span> <span class="token punctuation">.</span>env<span class="token punctuation">.</span>dev
 <span class="token operator">|</span><span class="token operator">--</span> <span class="token punctuation">.</span>env<span class="token punctuation">.</span>production
 <span class="token operator">|</span><span class="token operator">--</span> <span class="token punctuation">.</span>gitgnore
 <span class="token operator">|</span><span class="token operator">--</span> <span class="token punctuation">.</span>jsbeautifyrc
 <span class="token operator">|</span><span class="token operator">--</span> vite<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js
 <span class="token operator">|</span><span class="token operator">--</span> <span class="token keyword">package</span><span class="token punctuation">.</span>json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建页面" tabindex="-1"><a class="header-anchor" href="#创建页面" aria-hidden="true">#</a> 创建页面</h2>
<p>框架页面设计说明</p>
<ul>
<li>框架为两层的嵌套路由（当前为默认的，不可更改）</li>
<li>第一层定义为<code v-pre>系统模块</code>，当前框架系统模块不可自定义，是共用一个风格页面框架。</li>
<li>第二层为当前<code v-pre>系统模块</code>的内部具体页面，页面的层级结构建议设计为<code v-pre>扁平模式</code>，但可以在菜单上做多层的视觉体现。</li>
<li>页面具体路由地址由<code v-pre>系统模块</code>+<code v-pre>页面名称</code>组成。</li>
</ul>
<h3 id="创建模块" tabindex="-1"><a class="header-anchor" href="#创建模块" aria-hidden="true">#</a> 创建模块</h3>
<p>创建模块很简单，示例步骤如下</p>
<ol>
<li>在pages目录创建一个文件夹（模块名称，如：system）</li>
<li>在文件夹下创建一个默认输出程序（index.js），默认输出为vue-router的配置数组</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> About <span class="token keyword">from</span> <span class="token string">'./about.vue'</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'about'</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'about'</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> About <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>在pages的默认输出程序（index.js）内引入次模块</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> system <span class="token keyword">from</span> <span class="token string">'./system'</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
   system
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>开发具体页面（about.vue）</li>
</ol>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>about<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      about
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
   <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'about'</span><span class="token punctuation">,</span>
      <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>less<span class="token punctuation">"</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
   <span class="token selector">.about</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


