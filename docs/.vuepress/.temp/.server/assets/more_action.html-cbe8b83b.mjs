import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../app.97540ec7.mjs";
import "@vuepress/shared";
import "ts-debounce";
import "@vueuse/core";
import "@vue/devtools-api";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="动作管理" tabindex="-1"><a class="header-anchor" href="#动作管理" aria-hidden="true">#</a> 动作管理</h1><p>数据没有所有事件的集中管理，所有的事件都是和对用的元件对象相关联。</p><h2 id="动作数据对象" tabindex="-1"><a class="header-anchor" href="#动作数据对象" aria-hidden="true">#</a> 动作数据对象</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token string">&#39;AC_AFl3r23&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">action</span><span class="token operator">:</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">target</span><span class="token operator">:</span><span class="token string">&#39;as34253jk5j23l4k5j345l&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">description</span><span class="token operator">:</span><span class="token string">&#39;隐藏元件A&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="获取所有动作" tabindex="-1"><a class="header-anchor" href="#获取所有动作" aria-hidden="true">#</a> 获取所有动作</h2><ul><li>获取动作集合<br> 此对象是一个reactive的响应对象，以动作id作为键的集合</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>rdata<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
<span class="token keyword">const</span> actions<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">getActionsData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>获取动作列表<br> 此对象是一个普通数组，非响应</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>rdata<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
<span class="token comment">// 返回所有</span>
<span class="token keyword">const</span> actionList<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">getActionList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">//返回指定id数组的动作列表</span>
<span class="token keyword">const</span> actionList2<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">getActionList</span><span class="token punctuation">(</span>ids<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="添加新动作" tabindex="-1"><a class="header-anchor" href="#添加新动作" aria-hidden="true">#</a> 添加新动作</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>helper<span class="token punctuation">,</span>typeModel<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
<span class="token comment">// 示例取第一个动作</span>
<span class="token keyword">let</span> actionType<span class="token operator">=</span>typeModel<span class="token punctuation">.</span>events<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>action
<span class="token comment">// 动作类型，目标对象id，值，描述</span>
<span class="token keyword">const</span> action<span class="token operator">=</span>helper<span class="token punctuation">.</span><span class="token function">createActionData</span><span class="token punctuation">(</span>actionType<span class="token punctuation">,</span><span class="token string">&quot;target&quot;</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token string">&quot;隐藏target&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义动作方法" tabindex="-1"><a class="header-anchor" href="#自定义动作方法" aria-hidden="true">#</a> 自定义动作方法</h2><p>默认的几个动作也许无法满足开发需求，现在你可以创建一个自己的动作插件，让动作更丰富多彩。<br><strong>动作包含的基本特性</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;动作名称&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;动作类型，默认null&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;执行对象，默认component&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;动作参数，默认空字符&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">&quot;动作方法名，必须&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">handle</span><span class="token operator">:</span><span class="token string">&quot;动作方法函数，必须&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> controller <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> gsap <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;gsap&quot;</span>

<span class="token comment">// 设置一个新动作后，将同时在ActionTypes内添加描述</span>
<span class="token comment">// handle方法的第一个参数是目标数据对象</span>
controller<span class="token punctuation">.</span><span class="token function">useAction</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;渐变消失&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">action</span><span class="token operator">:</span><span class="token string">&#39;hide&#39;</span><span class="token punctuation">,</span>
    <span class="token function">handle</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        gsap<span class="token punctuation">.</span><span class="token function">to</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">opacity</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">.4</span><span class="token punctuation">,</span>
            <span class="token function-variable function">onComplete</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                target<span class="token punctuation">.</span>visible<span class="token operator">=</span><span class="token boolean">false</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/guide/more_action.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const more_action_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "more_action.html.vue"]]);
export {
  more_action_html as default
};
