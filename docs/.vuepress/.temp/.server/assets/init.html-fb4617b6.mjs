import { resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../app.97540ec7.mjs";
import "@vuepress/shared";
import "ts-debounce";
import "@vueuse/core";
import "@vue/devtools-api";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  const _component_RouterLink = resolveComponent("RouterLink");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h1><p>内容的维护主要就是以数据为核心的维护</p><h2 id="创建应用" tabindex="-1"><a class="header-anchor" href="#创建应用" aria-hidden="true">#</a> 创建应用</h2><ul><li>创建一个最基础的应用示例app.js</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>   <span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted<span class="token punctuation">,</span> h <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
   <span class="token keyword">import</span> <span class="token punctuation">{</span> createStage<span class="token punctuation">,</span> component<span class="token punctuation">,</span> rdata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
   <span class="token keyword">import</span> VxBox <span class="token keyword">from</span> <span class="token string">&#39;./Box.vue&#39;</span>
   
   <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
      <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token comment">// 添加组件</span>
         component<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">[</span>VxBox<span class="token punctuation">]</span><span class="token punctuation">)</span>
         <span class="token comment">// 装载数据，初次创建可以省略</span>
         rdata<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
         <span class="token comment">// 根据组件定义的name名称，返回一个组件默认数据</span>
         <span class="token comment">// 组件返回的除了通用混入参数外，包含自定义的props参数</span>
         <span class="token keyword">let</span> comData <span class="token operator">=</span> component<span class="token punctuation">.</span><span class="token function">getComponentDefaultData</span><span class="token punctuation">(</span><span class="token string">&#39;vx-box&#39;</span><span class="token punctuation">)</span>
         <span class="token comment">// 添加组件，并返回这个组件的响应数据对象</span>
         <span class="token keyword">let</span> rcom <span class="token operator">=</span> rdata<span class="token punctuation">.</span><span class="token function">addSpriteData</span><span class="token punctuation">(</span>comData<span class="token punctuation">)</span>
         <span class="token comment">// 挂载完成显示内容</span>
         <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// 创建一个舞台并显示内容到页面，#stage是页面中元素id，interaction开启交互动作</span>
            <span class="token function">createStage</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">dom</span><span class="token operator">:</span><span class="token string">&#39;#stage&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">interaction</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token comment">// 添加一个定时器更新数据</span>
            <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
               count<span class="token operator">++</span>
               rcom<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span> <span class="token operator">+</span> count<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span><span class="token punctuation">)</span>
         <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&quot;stage&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="/guide/data.html#%E6%95%B0%E6%8D%AE%E6%A0%B7%E4%BE%8B" target="_blank" rel="noopener noreferrer">装载数据样例`);
  _push(ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
  _push(`</a><br> createStage方法创建一个舞台应用并挂载到dom中，参数可以是可读取的dom结构id，也开始是一个实体dom<br> 如果是vue中需要mounted中执行，第二个参数interaction值为是否开启交互动作</p><h2 id="创建组件" tabindex="-1"><a class="header-anchor" href="#创建组件" aria-hidden="true">#</a> 创建组件</h2><p>除了内置的基础分层组件之外，所有的组件由用户自行创建，并引入到此运行环境中才可使用，所有组件会默认混入<a href="/guide/data.html#%E7%BB%84%E4%BB%B6%E9%BB%98%E8%AE%A4%E6%B7%B7%E5%85%A5" target="_blank" rel="noopener noreferrer">基础参数`);
  _push(ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
  _push(`</a>。创建的组件理论上可以随意定义自身的一些参数事件，但为了更好做组件之间的控制与维护，我们约定尽量参数的使用不要超过默认的混入参数范围。</p><h3 id="混入参数" tabindex="-1"><a class="header-anchor" href="#混入参数" aria-hidden="true">#</a> 混入参数</h3><ul><li><code>x</code> 横坐标位置 <code>0</code></li><li><code>y</code> 纵坐标位置 <code>0</code></li><li><code>width</code> 宽度 <code>0</code></li><li><code>height</code> 高度 <code>0</code></li><li><code>zIndex</code> 层级深度 <code>0</code></li><li><code>background</code> 背景样式对象 <code>{}</code></li><li><code>border</code> 边框样式对象 <code>{}</code></li><li><code>visible</code> 是否可见 <code>true</code></li><li><code>data</code> 传入数据 <code>&#39;&#39;</code></li><li><code>options</code> 附加参数 <code>{}</code></li></ul><h3 id="必要配置" tabindex="-1"><a class="header-anchor" href="#必要配置" aria-hidden="true">#</a> 必要配置</h3><ul><li><p>name<br> 必须给组件命名</p></li><li><p>type<br> 给组件定义类型名，用户组件的分组归类</p></li><li><p>style使用<br> 在组件的dom结构根节点需要绑定style对象</p></li></ul><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>style<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自定义事件" tabindex="-1"><a class="header-anchor" href="#自定义事件" aria-hidden="true">#</a> 自定义事件</h3><p>组件可以在emits中设置自定义事件触发名，并发送事件。当你的组件中存在emits数据配置时，通过组件方法getComponentEvents返回定义的事件列表。</p><h3 id="示例组件" tabindex="-1"><a class="header-anchor" href="#示例组件" aria-hidden="true">#</a> 示例组件</h3><p>box.vue</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>style<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>$emit(&#39;click-item&#39;,data)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{data}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
   <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;vx-box&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;shape&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">emits</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;click-item&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
            <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">80</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
            <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">80</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
            <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">10</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
            <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">10</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token literal-property property">background</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
            <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
               <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">backgroundColor</span><span class="token operator">:</span> <span class="token string">&#39;#89f56369&#39;</span> <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
   <span class="token selector">.box</span> <span class="token punctuation">{</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token property">line-height</span><span class="token punctuation">:</span> 78px<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="舞台" tabindex="-1"><a class="header-anchor" href="#舞台" aria-hidden="true">#</a> 舞台</h2><h3 id="基础配置" tabindex="-1"><a class="header-anchor" href="#基础配置" aria-hidden="true">#</a> 基础配置</h3><p>舞台的基本配置全部根据参数而定 `);
  _push(ssrRenderComponent(_component_RouterLink, { to: "/guide/data.html#app%E9%85%8D%E7%BD%AE" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`查看基本参数`);
      } else {
        return [
          createTextVNode("查看基本参数")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<br> 通过<code>rdata.appBase</code>对象来获取和修改配置</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> rdata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>info<span class="token punctuation">,</span>size<span class="token punctuation">,</span>background <span class="token punctuation">}</span><span class="token operator">=</span>rdata<span class="token punctuation">.</span>appBase
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>info 介绍 <ul><li>{title:&#39;标题&#39;}</li></ul></li><li>size 尺寸 <ul><li>{width:&#39;宽度&#39;,height:&#39;高度&#39;}</li></ul></li><li>background 背景 <ul><li>{backgroudColor:&#39;颜色值&#39;} 背景参数以css的样式做为参考</li></ul></li></ul><h3 id="开启动作交互" tabindex="-1"><a class="header-anchor" href="#开启动作交互" aria-hidden="true">#</a> 开启动作交互</h3><p>默认清空渲染到舞台上的元件是没有绑定动作事件，需要主动开启，其他参数`);
  _push(ssrRenderComponent(_component_RouterLink, { to: "/base/api.html#createStage" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`查看接口`);
      } else {
        return [
          createTextVNode("查看接口")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
<span class="token function">createStage</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">dom</span><span class="token operator">:</span><span class="token string">&quot;#stage&quot;</span><span class="token punctuation">,</span><span class="token literal-property property">interaction</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="元件" tabindex="-1"><a class="header-anchor" href="#元件" aria-hidden="true">#</a> 元件</h2><h3 id="id" tabindex="-1"><a class="header-anchor" href="#id" aria-hidden="true">#</a> ID</h3><p><strong>id</strong> 作为元件唯一的标识，是围绕元件所有操作的最重要属性。 在创建元件时可以自己附带id属性，如果新建数据的id不存在将自动生成一个值，并赋在元件id属性上。</p><p>`);
  _push(ssrRenderComponent(_component_RouterLink, { to: "/guide/data.html#component%E7%BB%84%E4%BB%B6-%E5%85%83%E4%BB%B6" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`其他基本数据`);
      } else {
        return [
          createTextVNode("其他基本数据")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</p><h3 id="新建与添加" tabindex="-1"><a class="header-anchor" href="#新建与添加" aria-hidden="true">#</a> 新建与添加</h3><ol><li>获取一个组件默认数据<code>component.getComponentDefaultData()</code></li><li>通过组件数据添加一个新元件<code>rdata.addSpriteData()</code></li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>   <span class="token keyword">import</span> <span class="token punctuation">{</span> component<span class="token punctuation">,</span> rdata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
   <span class="token doc-comment comment">/**
    * 如果没有元件数据，需要通过某一组件创建一个新的元件
    * 先要通过组件获取元件的默认初始数据
    * 在调整数据后添加到元件中
    **/</span>
   <span class="token comment">// 获取组件默认数据，componentName是你创建的的组件名称</span>
   <span class="token keyword">let</span> compData<span class="token operator">=</span>component<span class="token punctuation">.</span><span class="token function">getComponentDefaultData</span><span class="token punctuation">(</span><span class="token string">&#39;componentName&#39;</span><span class="token punctuation">)</span>
   <span class="token comment">// 对初始的数据进行修改</span>
   compData<span class="token punctuation">.</span>x<span class="token operator">=</span><span class="token number">100</span>
   compData<span class="token punctuation">.</span>y<span class="token operator">=</span><span class="token number">100</span>
   <span class="token comment">// 添加组件数据，添加成功后会返回带有id的一个响应式元件数据</span>
   rdata<span class="token punctuation">.</span><span class="token function">addSpriteData</span><span class="token punctuation">(</span>compData<span class="token punctuation">)</span>
   <span class="token comment">// 如果不需要修改初始数据可以直接通过组件名的方式添加元件</span>
   rdata<span class="token punctuation">.</span><span class="token function">addSpriteData</span><span class="token punctuation">(</span><span class="token string">&#39;componentName&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除与编辑" tabindex="-1"><a class="header-anchor" href="#删除与编辑" aria-hidden="true">#</a> 删除与编辑</h3><p>通过元件id删除来删除元件，使用<code>rdata.delSpriteData()</code><br> 元件数据是一个响应式的对象，因此可以直接深层次的修改上面的值，可以修改的值围绕组件定义的props的参数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 获取某一个元件的数据</span>
<span class="token keyword">let</span> compData<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">getSpriteData</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token comment">// 直接编辑对象数据</span>
compData<span class="token punctuation">.</span>data<span class="token operator">=</span><span class="token number">122</span>
<span class="token comment">// 删除</span>
rdata<span class="token punctuation">.</span><span class="token function">delSpriteData</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加事件" tabindex="-1"><a class="header-anchor" href="#添加事件" aria-hidden="true">#</a> 添加事件</h3><ol><li>获取事件对象数据格式</li><li>选择一个事件对象类型</li><li>添加事件到元件</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>   <span class="token keyword">import</span> <span class="token punctuation">{</span> component<span class="token punctuation">,</span> rdata<span class="token punctuation">,</span> typeModel<span class="token punctuation">,</span> helper <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
   <span class="token comment">// 获取组件默认数据</span>
   <span class="token keyword">let</span> compData<span class="token operator">=</span>component<span class="token punctuation">.</span><span class="token function">getComponentDefaultData</span><span class="token punctuation">(</span><span class="token string">&#39;componentName&#39;</span><span class="token punctuation">)</span>
   <span class="token comment">// 添加组件数据</span>
   <span class="token keyword">let</span> sprData<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">addSpriteData</span><span class="token punctuation">(</span>compData<span class="token punctuation">)</span>
   <span class="token comment">// 拿到一个事件类型</span>
   <span class="token keyword">let</span> eventType<span class="token operator">=</span>typeModel<span class="token punctuation">.</span>events<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>event
   <span class="token comment">// 选择第一个事件数据格式，添加到元件中</span>
   helper<span class="token punctuation">.</span><span class="token function">addEvent</span><span class="token punctuation">(</span>sprData<span class="token punctuation">.</span>id<span class="token punctuation">,</span> eventType<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加动作" tabindex="-1"><a class="header-anchor" href="#添加动作" aria-hidden="true">#</a> 添加动作</h3><ol><li>获取动作对象数据格式</li><li>编辑动作参数</li><li>添加动作到元件的事件中</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>   <span class="token keyword">import</span> <span class="token punctuation">{</span> component<span class="token punctuation">,</span> rdata<span class="token punctuation">,</span> typeModel<span class="token punctuation">,</span> helper <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
   <span class="token comment">// 获取组件默认数据</span>
   <span class="token keyword">let</span> compData<span class="token operator">=</span>component<span class="token punctuation">.</span><span class="token function">getComponentDefaultData</span><span class="token punctuation">(</span><span class="token string">&#39;componentName&#39;</span><span class="token punctuation">)</span>
   <span class="token comment">// 添加组件数据</span>
   <span class="token keyword">let</span> sprData<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">addSpriteData</span><span class="token punctuation">(</span>compData<span class="token punctuation">)</span>
   <span class="token comment">// 拿到一个事件类型</span>
   <span class="token keyword">let</span> eventType<span class="token operator">=</span>typeModel<span class="token punctuation">.</span>events<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>event
   <span class="token comment">// 选择第一个事件数据格式，添加到元件中</span>
   helper<span class="token punctuation">.</span><span class="token function">addEvent</span><span class="token punctuation">(</span>sprData<span class="token punctuation">.</span>id<span class="token punctuation">,</span> eventType<span class="token punctuation">)</span>

   <span class="token comment">// 假设需要控制的元件id是demo_id</span>
   <span class="token comment">// 拿到一个动作数据，这里取show动作</span>
   <span class="token keyword">let</span> actionModel<span class="token operator">=</span>typeModel<span class="token punctuation">.</span>events<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>action
   <span class="token comment">// 创建一个动作数据，返回动作id</span>
   <span class="token keyword">let</span> actionId <span class="token operator">=</span> helper<span class="token punctuation">.</span><span class="token function">createActionData</span><span class="token punctuation">(</span>actionModel<span class="token punctuation">.</span>action<span class="token punctuation">,</span> <span class="token string">&quot;demo_id&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
   <span class="token comment">// 添加动作到事件中</span>
   helper<span class="token punctuation">.</span><span class="token function">addAction</span><span class="token punctuation">(</span>actionId<span class="token punctuation">,</span> demo_id<span class="token punctuation">,</span> <span class="token string">&quot;show&quot;</span><span class="token punctuation">)</span>
   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="绑定数据" tabindex="-1"><a class="header-anchor" href="#绑定数据" aria-hidden="true">#</a> 绑定数据</h3><p>任何元件都有一个默认的data传值，这个参数可以是在数据值可以直接在创建的元件的时候赋值</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 获取某一个元件的数据</span>
<span class="token keyword">let</span> compData<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">getSpriteData</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token comment">// 直接编辑对象数据，可以是string,number,object,array四种类型</span>
compData<span class="token punctuation">.</span>data<span class="token operator">=</span><span class="token string">&quot;这是你要传递的组件数据&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以是通过全局的数据配置来绑定，这里需要先通过一个<code>addGData</code>的方法先创建一个全局数据源，然后将此id赋给元件的data</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> rdata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
<span class="token comment">// 创建一个新的数据源</span>
<span class="token keyword">let</span> dataID<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">addGData</span><span class="token punctuation">(</span><span class="token string">&#39;我为人人，人人为我&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;数据名&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>id
<span class="token comment">// 为元件对象spriteData设置数据</span>
spriteData<span class="token punctuation">.</span>data<span class="token operator">=</span>dataID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="输入与输出数据" tabindex="-1"><a class="header-anchor" href="#输入与输出数据" aria-hidden="true">#</a> 输入与输出数据</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>   <span class="token keyword">import</span> <span class="token punctuation">{</span> rdata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
   <span class="token comment">// 初始化一个项目配置数据，mydata是一个json格式的数据对象</span>
   rdata<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>initData<span class="token punctuation">)</span>
   <span class="token comment">// 获取当前项目的所有配置数据</span>
   <span class="token keyword">let</span> resData<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/guide/init.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const init_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "init.html.vue"]]);
export {
  init_html as default
};
