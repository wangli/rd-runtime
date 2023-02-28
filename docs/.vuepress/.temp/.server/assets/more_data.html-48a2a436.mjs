import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../app.97540ec7.mjs";
import "@vuepress/shared";
import "ts-debounce";
import "@vueuse/core";
import "@vue/devtools-api";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="数据绑定" tabindex="-1"><a class="header-anchor" href="#数据绑定" aria-hidden="true">#</a> 数据绑定</h1><p>创建元件的时候可以默认设置data数据值，也可以绑定一个数据源。所有数据源都是一个全局的对象，可以被任何组件绑定，同时享有数据的共同更新。<br> 数据源分为四种，<strong>原始配置</strong>，<strong>本地读取</strong>，<strong>远端读取</strong>，<strong>临时数据</strong>。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> rdata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="数据源" tabindex="-1"><a class="header-anchor" href="#数据源" aria-hidden="true">#</a> 数据源</h2><h3 id="全局普通数据" tabindex="-1"><a class="header-anchor" href="#全局普通数据" aria-hidden="true">#</a> 全局普通数据</h3><ol><li>添加一个新的数据源</li><li>设置元件的data值为数据源的id</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> rdata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
<span class="token comment">// 创建字符串数据源</span>
<span class="token keyword">let</span> dataID<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">addGData</span><span class="token punctuation">(</span><span class="token string">&#39;我为人人，人人为我&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;数据名&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>id
<span class="token comment">// 创建json对象数据</span>
<span class="token keyword">let</span> dataID2<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">addGData</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;avd&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token string">&#39;12&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token string">&#39;数据名&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>id
<span class="token comment">// 为元件对象spriteData设置数据</span>
spriteData<span class="token punctuation">.</span>data<span class="token operator">=</span>dataID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全局远端数据" tabindex="-1"><a class="header-anchor" href="#全局远端数据" aria-hidden="true">#</a> 全局远端数据</h3><ol><li>添加一个新的远端数据源</li><li>设置元件的data值为数据源的id<br> 如果创建</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> rdata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
<span class="token doc-comment comment">/**
 * 创建一个普通的全局数据源，第一个参数是远端地址，第三个参数值是remote
 * */</span>
<span class="token keyword">let</span> dataID<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">addGData</span><span class="token punctuation">(</span><span class="token string">&#39;http://49.232.61.74:81&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;数据名&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;remote&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>id
<span class="token doc-comment comment">/**
 * 创建一个可以发送数据参数的远端数据，此数据对象，需要包含url和body两个基础的值
 * GD_query是url参数对象
 * path为id获取url参数id值
 * */</span>
<span class="token keyword">let</span> remoteDb<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">addGData</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string-property property">&quot;url&quot;</span><span class="token operator">:</span><span class="token string">&quot;http://110.40.172.81:81&quot;</span><span class="token punctuation">,</span><span class="token string-property property">&quot;method&quot;</span><span class="token operator">:</span><span class="token string">&quot;post&quot;</span><span class="token punctuation">,</span><span class="token string-property property">&quot;body&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string-property property">&quot;key&quot;</span><span class="token operator">:</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string-property property">&quot;value&quot;</span><span class="token operator">:</span><span class="token string">&quot;avd&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token string-property property">&quot;key&quot;</span><span class="token operator">:</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span><span class="token string-property property">&quot;value&quot;</span><span class="token operator">:</span><span class="token string">&quot;GD_query&quot;</span><span class="token punctuation">,</span><span class="token string-property property">&quot;path&quot;</span><span class="token operator">:</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token string">&#39;数据名&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;remote&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 为元件对象spriteData设置数据</span>
spriteData<span class="token punctuation">.</span>data<span class="token operator">=</span>dataID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="独立远端数据" tabindex="-1"><a class="header-anchor" href="#独立远端数据" aria-hidden="true">#</a> 独立远端数据</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> remote <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
<span class="token doc-comment comment">/**
 * 直接创建一个远端接口数据，可以附带一个extractRule提取数据规则（默认null），body发送的参数（默认null），method发送模式（默认null）
 * */</span>
<span class="token keyword">let</span> dataID<span class="token operator">=</span>remote<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;http://49.232.61.74:81&#39;</span><span class="token punctuation">,</span>extractRule<span class="token punctuation">,</span>body<span class="token punctuation">,</span>method<span class="token punctuation">)</span><span class="token punctuation">.</span>id

<span class="token comment">// 为元件对象spriteData设置数据</span>
spriteData<span class="token punctuation">.</span>data<span class="token operator">=</span>dataID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全局临时数据" tabindex="-1"><a class="header-anchor" href="#全局临时数据" aria-hidden="true">#</a> 全局临时数据</h3><p>临时数据不会输出到配置文件中，但是作为数据源，可以被系统使用<br> 当前只有一种临时数据就是url参数对象，获取与使用的方式与其他一样，唯一区别就是id值是唯一固定的</p><ul><li>id：<code>GD_query</code></li><li>type：<code>temp</code> 数据格式</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//全局数据id：GD_query，值是一个被data包括的json对象</span>
<span class="token punctuation">{</span> <span class="token string-property property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;11&quot;</span><span class="token punctuation">,</span><span class="token string-property property">&quot;sex&quot;</span><span class="token operator">:</span><span class="token string">&#39;1&#39;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新数据" tabindex="-1"><a class="header-anchor" href="#更新数据" aria-hidden="true">#</a> 更新数据</h3><ul><li>普通数据</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> rdata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
<span class="token comment">// 获取数据源，GD_c6Hu04lzpK是对应的数据源id</span>
<span class="token keyword">let</span> data<span class="token operator">=</span>rdata<span class="token punctuation">.</span><span class="token function">getGData</span><span class="token punctuation">(</span><span class="token string">&#39;GD_c6Hu04lzpK&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// data.value是数据值，如果是字符串内容，将包含一个value的属性</span>
data<span class="token punctuation">.</span>value<span class="token punctuation">.</span>value<span class="token operator">=</span><span class="token string">&quot;数据内容&quot;</span>
<span class="token comment">// 如果是一个对象，可以直接更新对象的key值内容</span>
data<span class="token punctuation">.</span>value<span class="token punctuation">.</span>age<span class="token operator">=</span><span class="token number">99</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>远端数据</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>   <span class="token keyword">import</span> <span class="token punctuation">{</span> remote <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
   <span class="token doc-comment comment">/**
    * 远端数据更新使用 requestData方法，
    * 第一个参数表示是否强制更新
    * 第二个参数表示要更新的接口地址，如果不填写将更新所有
    */</span>
   remote<span class="token punctuation">.</span><span class="token function">requestData</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="远端" tabindex="-1"><a class="header-anchor" href="#远端" aria-hidden="true">#</a> 远端</h2><h3 id="remotedata远端对象" tabindex="-1"><a class="header-anchor" href="#remotedata远端对象" aria-hidden="true">#</a> RemoteData远端对象</h3><p>使用<code>remote.add</code>方法可以创建一个远端的数据管理对象<br><strong>RemoteData</strong> 属性</p><ul><li><code>id</code>:string 唯一标识</li><li><code>url</code>:string 地址</li><li><code>body</code>:object 附带参数</li><li><code>method</code>:string 发送方式</li><li><code>data</code>:reactive 响应数据对象</li><li><code>sourceData</code>:object 原始接口数据</li><li><code>isloading</code>:boolean 是否在获取中</li><li><code>status</code>:string 当前状态（wait,request,success）</li><li><code>err</code>:object 错误信息</li><li><code>extractRule</code>:reactive 数据提取规则</li></ul><p><strong>RemoteData</strong> 方法</p><ul><li><code>clearData()</code>:function 清空（中断请求）数据方法</li><li><code>request()</code> :function 请求数据方法</li></ul><p><strong>RemoteData</strong> 事件</p><ul><li><code>success</code> 获取完成</li><li><code>error</code> 获取失败</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> remote <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rd-runtime&#39;</span>
<span class="token comment">// extractRule,body,method可以省略</span>
<span class="token keyword">let</span> myRemoteData<span class="token operator">=</span>remote<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;http://49.232.61.74:81&#39;</span><span class="token punctuation">,</span>extractRule<span class="token punctuation">,</span>body<span class="token punctuation">,</span>method<span class="token punctuation">)</span>
myRemoteData<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;success&#39;</span><span class="token punctuation">,</span><span class="token parameter">my</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">// 获取成功</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
myRemoteData<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="extractrule规则" tabindex="-1"><a class="header-anchor" href="#extractrule规则" aria-hidden="true">#</a> extractRule规则</h3><p>数据提取<br><strong>普通提取规则</strong></p><ul><li><code>name</code>：表示需要输出的属性名</li><li><code>path</code>：表示提取数据的路径</li><li><code>mapKey</code>：如果路径的值是一个数组，可以通过次值进行类似map的返回值</li></ul><p><strong>图表数据规则</strong></p><p>因为我们拿到的数据附加给图表相关的元件时，大部分并不是约定好的格式，因此需要制定一个中间转换的规则，最终满足图表的基本数据要求<br> 图表的数据以一个二维数组的形式呈现（类似excel表格），默认清空，第一行是需要描述的数据对象，第一列是数据x轴的项目列表，其他每一列是数据的表现</p><ul><li>规则主要是两个值x和y值</li><li><code>x</code> 是一个横向的数据的提取规则</li><li><code>y</code> 是一个纵向的多组数据的提取规则</li><li>任何一个规则都包含三个属性值name：姓名名称，path：提取深度路径，mapKey：提取所在深度的具体值</li></ul><p><strong>示例：</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 数据源</span>
<span class="token punctuation">{</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;销售业绩&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
        <span class="token literal-property property">ued</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
                <span class="token literal-property property">year</span><span class="token operator">:</span> <span class="token string">&#39;2010&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">perf</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">zs</span><span class="token operator">:</span> <span class="token number">66</span><span class="token punctuation">,</span><span class="token literal-property property">ls</span><span class="token operator">:</span> <span class="token number">99</span><span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">year</span><span class="token operator">:</span> <span class="token string">&#39;2011&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">perf</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">zs</span><span class="token operator">:</span> <span class="token number">99</span><span class="token punctuation">,</span><span class="token literal-property property">ls</span><span class="token operator">:</span> <span class="token number">80</span><span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">year</span><span class="token operator">:</span> <span class="token string">&#39;2012&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">perf</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">zs</span><span class="token operator">:</span> <span class="token number">70</span><span class="token punctuation">,</span><span class="token literal-property property">ls</span><span class="token operator">:</span> <span class="token number">60</span><span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//----------------------------------------------------</span>
<span class="token comment">// 提取规则 1</span>
<span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;year&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;data.ued&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">mapKey</span><span class="token operator">:</span><span class="token string">&#39;year&#39;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 提取后数据1</span>
<span class="token punctuation">{</span>
    <span class="token literal-property property">year</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;2010&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;2011&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;2012&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">//----------------------------------------------------</span>
<span class="token comment">// 提取规则 2</span>
<span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;data.name&#39;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;year&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;data.ued&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">mapKey</span><span class="token operator">:</span><span class="token string">&#39;year&#39;</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
<span class="token comment">// 提取后数据2</span>
<span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;销售业绩&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">year</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;2010&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;2011&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;2012&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">//----------------------------------------------------</span>
<span class="token comment">// 提取规则 3</span>
<span class="token punctuation">{</span>
    <span class="token literal-property property">x</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;年份&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;data.ued&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">mapKey</span><span class="token operator">:</span><span class="token string">&#39;year&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">y</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;data.ued&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">mapKey</span><span class="token operator">:</span><span class="token string">&#39;perf.zs&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;李四&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;data.ued&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">mapKey</span><span class="token operator">:</span><span class="token string">&#39;perf.ls&#39;</span><span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">// 提取后的数据3</span>
 <span class="token punctuation">[</span>
    <span class="token punctuation">[</span> <span class="token string">&#39;年份&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;李四&#39;</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span> <span class="token string">&#39;2010&#39;</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">99</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span> <span class="token string">&#39;2011&#39;</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">80</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span> <span class="token string">&#39;2012&#39;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">60</span> <span class="token punctuation">]</span>
 <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="body格式" tabindex="-1"><a class="header-anchor" href="#body格式" aria-hidden="true">#</a> body格式</h3><p>一个描述要传的字段信息列队的json数组</p><p><strong>描述属性</strong></p><ul><li><code>key</code>：表示发送的字段名称</li><li><code>value</code>：表示发送字段值</li><li><code>path</code>：如果值是一个全局数据对象，可以通过path路径过去具体的值</li></ul><p><strong>示例</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">[</span>
   <span class="token punctuation">{</span>
        <span class="token comment">// 发送的字段名</span>
        <span class="token literal-property property">key</span><span class="token operator">:</span><span class="token string">&#39;uid&#39;</span><span class="token punctuation">,</span>
        <span class="token comment">// 字段值，可以是原始值，也可以是来自全局数据对象id（GD_xxxxxxx）</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span><span class="token string">&#39;GD_query&#39;</span><span class="token punctuation">,</span>
        <span class="token comment">// 如果value是一个json对象（一般来自全局数据对象），可以通过path路径取具体值</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;id&#39;</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span>
        <span class="token literal-property property">key</span><span class="token operator">:</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span><span class="token string">&#39;GD_1mw1nDJZIO&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;items.[1].name&#39;</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span>
        <span class="token literal-property property">key</span><span class="token operator">:</span><span class="token string">&#39;type&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span><span class="token string">&#39;blue&#39;</span><span class="token punctuation">,</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token comment">// 假设数据当前地址栏url：     </span>
<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">https://www.xxx.com/?id=12</span><span class="token template-punctuation string">\`</span></span>

<span class="token comment">// GD_1mw1nDJZIO 的数据是：  </span>
<span class="token punctuation">{</span>
    <span class="token literal-property property">items</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;avd&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token string">&#39;12&#39;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;dav&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token string">&#39;15&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">// 此body数据将被转为 </span>
<span class="token punctuation">{</span>
    <span class="token literal-property property">uid</span><span class="token operator">:</span><span class="token string">&#39;12&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;dav&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">&#39;blue&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/guide/more_data.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const more_data_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "more_data.html.vue"]]);
export {
  more_data_html as default
};
