import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../app.97540ec7.mjs";
import "@vuepress/shared";
import "ts-debounce";
import "@vueuse/core";
import "@vue/devtools-api";
const _imports_0 = "/runtime/assets/sc01-10d6c2d3.png";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="框架介绍" tabindex="-1"><a class="header-anchor" href="#框架介绍" aria-hidden="true">#</a> 框架介绍</h1><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><ul><li>框架基于vue3开发</li><li>本框架主要应用与数据大屏相关的开发与建设，框架以数据驱动为核心，围绕：<strong>数据、事件与命令、控制与动作、组件、场景</strong>这几个模块搭建。</li><li>框架可应用与数据可视化大屏，可视化操作终端，操作演示终端相关业务的开发。</li></ul><h2 id="术语说明" tabindex="-1"><a class="header-anchor" href="#术语说明" aria-hidden="true">#</a> 术语说明</h2><ul><li>舞台：所有元件需要显示到页面的对象（displayStage方法上的指定的element）</li><li>组件：指的是框架内置或用户开发的vue组件</li><li>元件：指的是组件添加到舞台上后的对象</li><li>命令：通过cmd.execute执行的字符串值</li></ul><h2 id="数据驱动流程" tabindex="-1"><a class="header-anchor" href="#数据驱动流程" aria-hidden="true">#</a> 数据驱动流程</h2><p><img${ssrRenderAttr("src", _imports_0)} alt="图片"></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/index.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "index.html.vue"]]);
export {
  index_html as default
};
