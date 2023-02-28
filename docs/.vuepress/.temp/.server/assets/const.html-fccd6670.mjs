import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../app.97540ec7.mjs";
import "@vuepress/shared";
import "ts-debounce";
import "@vueuse/core";
import "@vue/devtools-api";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="参数定义" tabindex="-1"><a class="header-anchor" href="#参数定义" aria-hidden="true">#</a> 参数定义</h1><h2 id="events" tabindex="-1"><a class="header-anchor" href="#events" aria-hidden="true">#</a> EVENTS</h2><p>内置事件</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">EVENTS</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
</code></pre></div><h3 id="click-background" tabindex="-1"><a class="header-anchor" href="#click-background" aria-hidden="true">#</a> CLICK_BACKGROUND</h3><p><code>EVENTS.CLICK_BACKGROUND</code> 点击舞台背景</p><h3 id="click-sprite" tabindex="-1"><a class="header-anchor" href="#click-sprite" aria-hidden="true">#</a> CLICK_SPRITE</h3><p><code>EVENTS.CLICK_SPRITE</code> 点击舞台元件获取id信息</p><h3 id="mouseover-sprite" tabindex="-1"><a class="header-anchor" href="#mouseover-sprite" aria-hidden="true">#</a> MOUSEOVER_SPRITE</h3><p><code>EVENTS.MOUSEOVER_SPRITE</code> 鼠标经过舞台元件</p><h3 id="mouseout-sprite" tabindex="-1"><a class="header-anchor" href="#mouseout-sprite" aria-hidden="true">#</a> MOUSEOUT_SPRITE</h3><p><code>EVENTS.MOUSEOUT_SPRITE</code> 鼠标离开舞台元件</p><h3 id="mouseout-sprite-1" tabindex="-1"><a class="header-anchor" href="#mouseout-sprite-1" aria-hidden="true">#</a> MOUSEOUT_SPRITE</h3><p><code>EVENTS.STAGE_MOUNTED</code> 舞台渲染完毕</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code> <span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">EVENTS</span><span class="token punctuation">,</span>cmd <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
 cmd<span class="token punctuation">.</span><span class="token function">addEventLister</span><span class="token punctuation">(</span><span class="token constant">EVENTS</span><span class="token punctuation">.</span><span class="token constant">CLICK_SPRITE</span><span class="token punctuation">,</span><span class="token parameter">res</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
     <span class="token comment">//元件的基本信息</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
 cmd<span class="token punctuation">.</span><span class="token function">addEventLister</span><span class="token punctuation">(</span><span class="token constant">EVENTS</span><span class="token punctuation">.</span><span class="token constant">MOUSEOVER_SPRITE</span><span class="token punctuation">,</span><span class="token parameter">res</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
     <span class="token comment">//元件的基本信息</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
 cmd<span class="token punctuation">.</span><span class="token function">addEventLister</span><span class="token punctuation">(</span><span class="token constant">EVENTS</span><span class="token punctuation">.</span><span class="token constant">MOUSEOUT_SPRITE</span><span class="token punctuation">,</span><span class="token parameter">res</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
     <span class="token comment">//元件的基本信息</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="typemodel" tabindex="-1"><a class="header-anchor" href="#typemodel" aria-hidden="true">#</a> typeModel</h2><p>相关数据选择模型</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> typeModel <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
</code></pre></div><h3 id="events-1" tabindex="-1"><a class="header-anchor" href="#events-1" aria-hidden="true">#</a> events</h3><p>事件类型列表</p><ul><li>属性</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>typeModel<span class="token punctuation">.</span>events
</code></pre></div><ul><li>返回</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;点击&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">event</span><span class="token operator">:</span> <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">pams</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;定时任务&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">event</span><span class="token operator">:</span> <span class="token string">&#39;interval&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">pams</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;延迟任务&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">event</span><span class="token operator">:</span> <span class="token string">&#39;timeout&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">pams</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre></div><h3 id="component" tabindex="-1"><a class="header-anchor" href="#component" aria-hidden="true">#</a> component</h3><p>组件类型列表</p><ul><li>属性</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>typeModel<span class="token punctuation">.</span>component
</code></pre></div><ul><li>返回</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;图表&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;chart&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;文本&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;text&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;表格&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;table&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;形状&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;shape&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;菜单&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;menu&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;媒体&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;media&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;地图&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;map&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;3D&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;3d&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;其它&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;other&#39;</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre></div><h3 id="actions" tabindex="-1"><a class="header-anchor" href="#actions" aria-hidden="true">#</a> actions</h3><p>基本动作类型列表</p><ul><li>属性</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>typeModel<span class="token punctuation">.</span>actions
</code></pre></div><ul><li>返回</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;显示&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">&quot;show&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Boolean&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;component&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;发送数据&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">&quot;sendData&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Object&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;component&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;打开外链&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">&#39;href&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;url&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;页面切换&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">&#39;singleModule&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;modules&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;String&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre></div><h3 id="datatype" tabindex="-1"><a class="header-anchor" href="#datatype" aria-hidden="true">#</a> dataType</h3><p>数据类型</p><ul><li>属性</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>typeModel<span class="token punctuation">.</span>dataType
</code></pre></div><ul><li>返回</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;原始数据&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;source&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;远程数据&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;remote&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;本地数据&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;local&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/base/const.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const const_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "const.html.vue"]]);
export {
  const_html as default
};
