import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../app.97540ec7.mjs";
import "@vuepress/shared";
import "ts-debounce";
import "@vueuse/core";
import "@vue/devtools-api";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="事件管理" tabindex="-1"><a class="header-anchor" href="#事件管理" aria-hidden="true">#</a> 事件管理</h1><p>数据没有所有事件的集中管理，所有的事件都是和对用的元件对象相关联。</p><h2 id="内置事件" tabindex="-1"><a class="header-anchor" href="#内置事件" aria-hidden="true">#</a> 内置事件</h2><h3 id="元件点击事件" tabindex="-1"><a class="header-anchor" href="#元件点击事件" aria-hidden="true">#</a> 元件点击事件</h3><p>所有的元件都可以添加一个点击事件<code>click</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>   <span class="token keyword">import</span> <span class="token punctuation">{</span> helper <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
   <span class="token comment">// 选择第一个事件数据格式，添加到元件中</span>
   helper<span class="token punctuation">.</span><span class="token function">addEvent</span><span class="token punctuation">(</span>sid<span class="token punctuation">,</span> <span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="元件延迟事件" tabindex="-1"><a class="header-anchor" href="#元件延迟事件" aria-hidden="true">#</a> 元件延迟事件</h3><p>延迟事件<code>timeout</code>,是在元件添加到舞台后（显示）执行的一个事件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>   <span class="token keyword">import</span> <span class="token punctuation">{</span> helper <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
   <span class="token comment">// 选择第一个事件数据格式，添加到元件中</span>
   helper<span class="token punctuation">.</span><span class="token function">addEvent</span><span class="token punctuation">(</span>sid<span class="token punctuation">,</span> <span class="token string">&#39;timeout&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/guide/more_event.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const more_event_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "more_event.html.vue"]]);
export {
  more_event_html as default
};
