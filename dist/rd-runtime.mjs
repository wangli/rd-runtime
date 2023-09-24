import * as ht from "vue";
import { getCurrentInstance as lt, isReactive as sg, reactive as U, ref as bg, watch as JI, shallowReactive as Dt, computed as mI, resolveComponent as ut, h as R, onMounted as YI, onUnmounted as UI, isVNode as ft, provide as dt, toRefs as yt, createApp as wt } from "vue";
function pt(g, A) {
  for (var I = 0; I < A.length; I++) {
    const t = A[I];
    if (typeof t != "string" && !Array.isArray(t)) {
      for (const e in t)
        if (e !== "default" && !(e in g)) {
          const B = Object.getOwnPropertyDescriptor(t, e);
          B && Object.defineProperty(g, e, B.get ? B : {
            enumerable: !0,
            get: () => t[e]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(g, Symbol.toStringTag, { value: "Module" }));
}
/*!
 Copyright 2018 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*! lifecycle.mjs v0.1.1 */
let tg;
try {
  new EventTarget(), tg = !0;
} catch {
  tg = !1;
}
class Gt {
  constructor() {
    this.e = {};
  }
  addEventListener(A, I, t = !1) {
    this.t(A).push(I);
  }
  removeEventListener(A, I, t = !1) {
    const e = this.t(A), B = e.indexOf(I);
    B > -1 && e.splice(B, 1);
  }
  dispatchEvent(A) {
    return A.target = this, Object.freeze(A), this.t(A.type).forEach((I) => I(A)), !0;
  }
  t(A) {
    return this.e[A] = this.e[A] || [];
  }
}
var Mt = tg ? EventTarget : Gt;
let Nt = class {
  constructor(A) {
    this.type = A;
  }
};
var Ft = tg ? Event : Nt;
class kt extends Ft {
  constructor(A, I) {
    super(A), this.newState = I.newState, this.oldState = I.oldState, this.originalEvent = I.originalEvent;
  }
}
const nA = "active", YA = "passive", sA = "hidden", aA = "frozen", Mg = "terminated", AI = typeof safari == "object" && safari.pushNotification, St = "onpageshow" in self, Rt = ["focus", "blur", "visibilitychange", "freeze", "resume", "pageshow", St ? "pagehide" : "unload"], gI = (g) => (g.preventDefault(), g.returnValue = "Are you sure?"), Jt = (g) => g.reduce((A, I, t) => (A[I] = t, A), {}), mt = [[nA, YA, sA, Mg], [nA, YA, sA, aA], [sA, YA, nA], [aA, sA], [aA, nA], [aA, YA]].map(Jt), Yt = (g, A) => {
  for (let I, t = 0; I = mt[t]; ++t) {
    const e = I[g], B = I[A];
    if (e >= 0 && B >= 0 && B > e)
      return Object.keys(I).slice(e, B + 1);
  }
  return [];
}, _A = () => document.visibilityState === sA ? sA : document.hasFocus() ? nA : YA;
class Ut extends Mt {
  constructor() {
    super();
    const A = _A();
    this.s = A, this.i = [], this.a = this.a.bind(this), Rt.forEach((I) => addEventListener(I, this.a, !0)), AI && addEventListener("beforeunload", (I) => {
      this.n = setTimeout(() => {
        I.defaultPrevented || I.returnValue.length > 0 || this.r(I, sA);
      }, 0);
    });
  }
  get state() {
    return this.s;
  }
  get pageWasDiscarded() {
    return document.wasDiscarded || !1;
  }
  addUnsavedChanges(A) {
    !this.i.indexOf(A) > -1 && (this.i.length === 0 && addEventListener("beforeunload", gI), this.i.push(A));
  }
  removeUnsavedChanges(A) {
    const I = this.i.indexOf(A);
    I > -1 && (this.i.splice(I, 1), this.i.length === 0 && removeEventListener("beforeunload", gI));
  }
  r(A, I) {
    if (I !== this.s) {
      const t = this.s, e = Yt(t, I);
      for (let B = 0; B < e.length - 1; ++B) {
        const Q = e[B], C = e[B + 1];
        this.s = C, this.dispatchEvent(new kt("statechange", { oldState: Q, newState: C, originalEvent: A }));
      }
    }
  }
  a(A) {
    switch (AI && clearTimeout(this.n), A.type) {
      case "pageshow":
      case "resume":
        this.r(A, _A());
        break;
      case "focus":
        this.r(A, nA);
        break;
      case "blur":
        this.s === nA && this.r(A, _A());
        break;
      case "pagehide":
      case "unload":
        this.r(A, A.persisted ? aA : Mg);
        break;
      case "visibilitychange":
        this.s !== aA && this.s !== Mg && this.r(A, _A());
        break;
      case "freeze":
        this.r(A, aA);
    }
  }
}
var Lt = new Ut(), UA = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, fA = {}, Ht = {
  get exports() {
    return fA;
  },
  set exports(g) {
    fA = g;
  }
};
(function(g) {
  var A = Object.prototype.hasOwnProperty, I = "~";
  function t() {
  }
  Object.create && (t.prototype = /* @__PURE__ */ Object.create(null), new t().__proto__ || (I = !1));
  function e(E, n, s) {
    this.fn = E, this.context = n, this.once = s || !1;
  }
  function B(E, n, s, a, o) {
    if (typeof s != "function")
      throw new TypeError("The listener must be a function");
    var l = new e(s, a || E, o), D = I ? I + n : n;
    return E._events[D] ? E._events[D].fn ? E._events[D] = [E._events[D], l] : E._events[D].push(l) : (E._events[D] = l, E._eventsCount++), E;
  }
  function Q(E, n) {
    --E._eventsCount === 0 ? E._events = new t() : delete E._events[n];
  }
  function C() {
    this._events = new t(), this._eventsCount = 0;
  }
  C.prototype.eventNames = function() {
    var n = [], s, a;
    if (this._eventsCount === 0)
      return n;
    for (a in s = this._events)
      A.call(s, a) && n.push(I ? a.slice(1) : a);
    return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(s)) : n;
  }, C.prototype.listeners = function(n) {
    var s = I ? I + n : n, a = this._events[s];
    if (!a)
      return [];
    if (a.fn)
      return [a.fn];
    for (var o = 0, l = a.length, D = new Array(l); o < l; o++)
      D[o] = a[o].fn;
    return D;
  }, C.prototype.listenerCount = function(n) {
    var s = I ? I + n : n, a = this._events[s];
    return a ? a.fn ? 1 : a.length : 0;
  }, C.prototype.emit = function(n, s, a, o, l, D) {
    var G = I ? I + n : n;
    if (!this._events[G])
      return !1;
    var u = this._events[G], Z = arguments.length, W, m;
    if (u.fn) {
      switch (u.once && this.removeListener(n, u.fn, void 0, !0), Z) {
        case 1:
          return u.fn.call(u.context), !0;
        case 2:
          return u.fn.call(u.context, s), !0;
        case 3:
          return u.fn.call(u.context, s, a), !0;
        case 4:
          return u.fn.call(u.context, s, a, o), !0;
        case 5:
          return u.fn.call(u.context, s, a, o, l), !0;
        case 6:
          return u.fn.call(u.context, s, a, o, l, D), !0;
      }
      for (m = 1, W = new Array(Z - 1); m < Z; m++)
        W[m - 1] = arguments[m];
      u.fn.apply(u.context, W);
    } else {
      var Dg = u.length, _;
      for (m = 0; m < Dg; m++)
        switch (u[m].once && this.removeListener(n, u[m].fn, void 0, !0), Z) {
          case 1:
            u[m].fn.call(u[m].context);
            break;
          case 2:
            u[m].fn.call(u[m].context, s);
            break;
          case 3:
            u[m].fn.call(u[m].context, s, a);
            break;
          case 4:
            u[m].fn.call(u[m].context, s, a, o);
            break;
          default:
            if (!W)
              for (_ = 1, W = new Array(Z - 1); _ < Z; _++)
                W[_ - 1] = arguments[_];
            u[m].fn.apply(u[m].context, W);
        }
    }
    return !0;
  }, C.prototype.on = function(n, s, a) {
    return B(this, n, s, a, !1);
  }, C.prototype.once = function(n, s, a) {
    return B(this, n, s, a, !0);
  }, C.prototype.removeListener = function(n, s, a, o) {
    var l = I ? I + n : n;
    if (!this._events[l])
      return this;
    if (!s)
      return Q(this, l), this;
    var D = this._events[l];
    if (D.fn)
      D.fn === s && (!o || D.once) && (!a || D.context === a) && Q(this, l);
    else {
      for (var G = 0, u = [], Z = D.length; G < Z; G++)
        (D[G].fn !== s || o && !D[G].once || a && D[G].context !== a) && u.push(D[G]);
      u.length ? this._events[l] = u.length === 1 ? u[0] : u : Q(this, l);
    }
    return this;
  }, C.prototype.removeAllListeners = function(n) {
    var s;
    return n ? (s = I ? I + n : n, this._events[s] && Q(this, s)) : (this._events = new t(), this._eventsCount = 0), this;
  }, C.prototype.off = C.prototype.removeListener, C.prototype.addListener = C.prototype.on, C.prefixed = I, C.EventEmitter = C, g.exports = C;
})(Ht);
const JA = {}, bt = 10;
function xt(g) {
  var A = !0, I = (/* @__PURE__ */ new Date()).getTime();
  return JA[g] ? (I - JA[g].time < bt && (A = !1), JA[g].count++, JA[g].time = I) : JA[g] = {
    count: 1,
    time: I
  }, A;
}
const Y = {
  //    点击舞台
  CLICK_STAGE: "click-stage",
  //    点击舞台背景
  CLICK_BACKGROUND: "click-background",
  //    点击元素
  CLICK_SPRITE: "click-sprite",
  //    双击元素
  DBLCLICK_SPRITE: "dblclick-sprite",
  //    鼠标按下舞台背景
  MOUSEDOWN_BACKGROUND: "mousedown-background",
  //    鼠标释放舞台背景
  MOUSEUP_BACKGROUND: "mouseup-background",
  //    鼠标经过元素
  MOUSEOVER_SPRITE: "mouseover-sprite",
  //    鼠标离开元素
  MOUSEOUT_SPRITE: "mouseout-sprite",
  //    鼠标按下元素
  MOUSEDOWN_SPRITE: "mousedown-sprite",
  //    鼠标释放元素
  MOUSEUP_SPRITE: "mouseup-sprite",
  //    鼠标移入元素
  MOUSEENTER_SPRITE: "mouseenter-sprite",
  //    鼠标移出元素
  MOUSELEAVE_SPRITE: "mouseleave-sprite",
  //    舞台渲染完毕
  STAGE_MOUNTED: "stage-mounted",
  // 数据加载完成
  DATA_LOADED: "data-loaded",
  // 页面状态
  PAGE_STATE: "page-state"
}, dA = {
  // 执行动作
  ACTION: "action",
  // 设置应用
  APP_ACTION: "appAction"
};
var eg = {}, vt = {
  get exports() {
    return eg;
  },
  set exports(g) {
    eg = g;
  }
};
(function(g, A) {
  (function(I, t) {
    g.exports = t();
  })(UA, function() {
    var I = 1e3, t = 6e4, e = 36e5, B = "millisecond", Q = "second", C = "minute", E = "hour", n = "day", s = "week", a = "month", o = "quarter", l = "year", D = "date", G = "Invalid Date", u = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Z = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, W = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(f) {
      var h = ["th", "st", "nd", "rd"], r = f % 100;
      return "[" + f + (h[(r - 20) % 10] || h[r] || h[0]) + "]";
    } }, m = function(f, h, r) {
      var d = String(f);
      return !d || d.length >= h ? f : "" + Array(h + 1 - d.length).join(r) + f;
    }, Dg = { s: m, z: function(f) {
      var h = -f.utcOffset(), r = Math.abs(h), d = Math.floor(r / 60), c = r % 60;
      return (h <= 0 ? "+" : "-") + m(d, 2, "0") + ":" + m(c, 2, "0");
    }, m: function f(h, r) {
      if (h.date() < r.date())
        return -f(r, h);
      var d = 12 * (r.year() - h.year()) + (r.month() - h.month()), c = h.clone().add(d, a), w = r - c < 0, y = h.clone().add(d + (w ? -1 : 1), a);
      return +(-(d + (r - c) / (w ? c - y : y - c)) || 0);
    }, a: function(f) {
      return f < 0 ? Math.ceil(f) || 0 : Math.floor(f);
    }, p: function(f) {
      return { M: a, y: l, w: s, d: n, D, h: E, m: C, s: Q, ms: B, Q: o }[f] || String(f || "").toLowerCase().replace(/s$/, "");
    }, u: function(f) {
      return f === void 0;
    } }, _ = "en", EA = {};
    EA[_] = W;
    var ug = function(f) {
      return f instanceof TA;
    }, zA = function f(h, r, d) {
      var c;
      if (!h)
        return _;
      if (typeof h == "string") {
        var w = h.toLowerCase();
        EA[w] && (c = w), r && (EA[w] = r, c = w);
        var y = h.split("-");
        if (!c && y.length > 1)
          return f(y[0]);
      } else {
        var N = h.name;
        EA[N] = h, c = N;
      }
      return !d && c && (_ = c), c || !d && _;
    }, x = function(f, h) {
      if (ug(f))
        return f.clone();
      var r = typeof h == "object" ? h : {};
      return r.date = f, r.args = arguments, new TA(r);
    }, k = Dg;
    k.l = zA, k.i = ug, k.w = function(f, h) {
      return x(f, { locale: h.$L, utc: h.$u, x: h.$x, $offset: h.$offset });
    };
    var TA = function() {
      function f(r) {
        this.$L = zA(r.locale, null, !0), this.parse(r);
      }
      var h = f.prototype;
      return h.parse = function(r) {
        this.$d = function(d) {
          var c = d.date, w = d.utc;
          if (c === null)
            return /* @__PURE__ */ new Date(NaN);
          if (k.u(c))
            return /* @__PURE__ */ new Date();
          if (c instanceof Date)
            return new Date(c);
          if (typeof c == "string" && !/Z$/i.test(c)) {
            var y = c.match(u);
            if (y) {
              var N = y[2] - 1 || 0, H = (y[7] || "0").substring(0, 3);
              return w ? new Date(Date.UTC(y[1], N, y[3] || 1, y[4] || 0, y[5] || 0, y[6] || 0, H)) : new Date(y[1], N, y[3] || 1, y[4] || 0, y[5] || 0, y[6] || 0, H);
            }
          }
          return new Date(c);
        }(r), this.$x = r.x || {}, this.init();
      }, h.init = function() {
        var r = this.$d;
        this.$y = r.getFullYear(), this.$M = r.getMonth(), this.$D = r.getDate(), this.$W = r.getDay(), this.$H = r.getHours(), this.$m = r.getMinutes(), this.$s = r.getSeconds(), this.$ms = r.getMilliseconds();
      }, h.$utils = function() {
        return k;
      }, h.isValid = function() {
        return this.$d.toString() !== G;
      }, h.isSame = function(r, d) {
        var c = x(r);
        return this.startOf(d) <= c && c <= this.endOf(d);
      }, h.isAfter = function(r, d) {
        return x(r) < this.startOf(d);
      }, h.isBefore = function(r, d) {
        return this.endOf(d) < x(r);
      }, h.$g = function(r, d, c) {
        return k.u(r) ? this[d] : this.set(c, r);
      }, h.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, h.valueOf = function() {
        return this.$d.getTime();
      }, h.startOf = function(r, d) {
        var c = this, w = !!k.u(d) || d, y = k.p(r), N = function(hA, z) {
          var BA = k.w(c.$u ? Date.UTC(c.$y, z, hA) : new Date(c.$y, z, hA), c);
          return w ? BA : BA.endOf(n);
        }, H = function(hA, z) {
          return k.w(c.toDate()[hA].apply(c.toDate("s"), (w ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(z)), c);
        }, L = this.$W, q = this.$M, eA = this.$D, $ = "set" + (this.$u ? "UTC" : "");
        switch (y) {
          case l:
            return w ? N(1, 0) : N(31, 11);
          case a:
            return w ? N(1, q) : N(0, q + 1);
          case s:
            var SA = this.$locale().weekStart || 0, RA = (L < SA ? L + 7 : L) - SA;
            return N(w ? eA - RA : eA + (6 - RA), q);
          case n:
          case D:
            return H($ + "Hours", 0);
          case E:
            return H($ + "Minutes", 1);
          case C:
            return H($ + "Seconds", 2);
          case Q:
            return H($ + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, h.endOf = function(r) {
        return this.startOf(r, !1);
      }, h.$set = function(r, d) {
        var c, w = k.p(r), y = "set" + (this.$u ? "UTC" : ""), N = (c = {}, c[n] = y + "Date", c[D] = y + "Date", c[a] = y + "Month", c[l] = y + "FullYear", c[E] = y + "Hours", c[C] = y + "Minutes", c[Q] = y + "Seconds", c[B] = y + "Milliseconds", c)[w], H = w === n ? this.$D + (d - this.$W) : d;
        if (w === a || w === l) {
          var L = this.clone().set(D, 1);
          L.$d[N](H), L.init(), this.$d = L.set(D, Math.min(this.$D, L.daysInMonth())).$d;
        } else
          N && this.$d[N](H);
        return this.init(), this;
      }, h.set = function(r, d) {
        return this.clone().$set(r, d);
      }, h.get = function(r) {
        return this[k.p(r)]();
      }, h.add = function(r, d) {
        var c, w = this;
        r = Number(r);
        var y = k.p(d), N = function(q) {
          var eA = x(w);
          return k.w(eA.date(eA.date() + Math.round(q * r)), w);
        };
        if (y === a)
          return this.set(a, this.$M + r);
        if (y === l)
          return this.set(l, this.$y + r);
        if (y === n)
          return N(1);
        if (y === s)
          return N(7);
        var H = (c = {}, c[C] = t, c[E] = e, c[Q] = I, c)[y] || 1, L = this.$d.getTime() + r * H;
        return k.w(L, this);
      }, h.subtract = function(r, d) {
        return this.add(-1 * r, d);
      }, h.format = function(r) {
        var d = this, c = this.$locale();
        if (!this.isValid())
          return c.invalidDate || G;
        var w = r || "YYYY-MM-DDTHH:mm:ssZ", y = k.z(this), N = this.$H, H = this.$m, L = this.$M, q = c.weekdays, eA = c.months, $ = function(z, BA, fg, jA) {
          return z && (z[BA] || z(d, w)) || fg[BA].slice(0, jA);
        }, SA = function(z) {
          return k.s(N % 12 || 12, z, "0");
        }, RA = c.meridiem || function(z, BA, fg) {
          var jA = z < 12 ? "AM" : "PM";
          return fg ? jA.toLowerCase() : jA;
        }, hA = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: L + 1, MM: k.s(L + 1, 2, "0"), MMM: $(c.monthsShort, L, eA, 3), MMMM: $(eA, L), D: this.$D, DD: k.s(this.$D, 2, "0"), d: String(this.$W), dd: $(c.weekdaysMin, this.$W, q, 2), ddd: $(c.weekdaysShort, this.$W, q, 3), dddd: q[this.$W], H: String(N), HH: k.s(N, 2, "0"), h: SA(1), hh: SA(2), a: RA(N, H, !0), A: RA(N, H, !1), m: String(H), mm: k.s(H, 2, "0"), s: String(this.$s), ss: k.s(this.$s, 2, "0"), SSS: k.s(this.$ms, 3, "0"), Z: y };
        return w.replace(Z, function(z, BA) {
          return BA || hA[z] || y.replace(":", "");
        });
      }, h.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, h.diff = function(r, d, c) {
        var w, y = k.p(d), N = x(r), H = (N.utcOffset() - this.utcOffset()) * t, L = this - N, q = k.m(this, N);
        return q = (w = {}, w[l] = q / 12, w[a] = q, w[o] = q / 3, w[s] = (L - H) / 6048e5, w[n] = (L - H) / 864e5, w[E] = L / e, w[C] = L / t, w[Q] = L / I, w)[y] || L, c ? q : k.a(q);
      }, h.daysInMonth = function() {
        return this.endOf(a).$D;
      }, h.$locale = function() {
        return EA[this.$L];
      }, h.locale = function(r, d) {
        if (!r)
          return this.$L;
        var c = this.clone(), w = zA(r, d, !0);
        return w && (c.$L = w), c;
      }, h.clone = function() {
        return k.w(this.$d, this);
      }, h.toDate = function() {
        return new Date(this.valueOf());
      }, h.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, h.toISOString = function() {
        return this.$d.toISOString();
      }, h.toString = function() {
        return this.$d.toUTCString();
      }, f;
    }(), $g = TA.prototype;
    return x.prototype = $g, [["$ms", B], ["$s", Q], ["$m", C], ["$H", E], ["$W", n], ["$M", a], ["$y", l], ["$D", D]].forEach(function(f) {
      $g[f[1]] = function(h) {
        return this.$g(h, f[0], f[1]);
      };
    }), x.extend = function(f, h) {
      return f.$i || (f(h, TA, x), f.$i = !0), x;
    }, x.locale = zA, x.isDayjs = ug, x.unix = function(f) {
      return x(1e3 * f);
    }, x.en = EA[_], x.Ls = EA, x.p = {}, x;
  });
})(vt);
const qt = eg, LI = /* @__PURE__ */ pt({
  __proto__: null,
  default: qt
}, [eg]);
var Kt = typeof UA == "object" && UA && UA.Object === Object && UA, HI = Kt, Ot = HI, zt = typeof self == "object" && self && self.Object === Object && self, Tt = Ot || zt || Function("return this")(), rA = Tt, jt = rA, _t = jt.Symbol, xg = _t, II = xg, bI = Object.prototype, Xt = bI.hasOwnProperty, Zt = bI.toString, mA = II ? II.toStringTag : void 0;
function Pt(g) {
  var A = Xt.call(g, mA), I = g[mA];
  try {
    g[mA] = void 0;
    var t = !0;
  } catch {
  }
  var e = Zt.call(g);
  return t && (A ? g[mA] = I : delete g[mA]), e;
}
var Vt = Pt, Wt = Object.prototype, $t = Wt.toString;
function Ae(g) {
  return $t.call(g);
}
var ge = Ae, tI = xg, Ie = Vt, te = ge, ee = "[object Null]", Be = "[object Undefined]", eI = tI ? tI.toStringTag : void 0;
function Qe(g) {
  return g == null ? g === void 0 ? Be : ee : eI && eI in Object(g) ? Ie(g) : te(g);
}
var KA = Qe;
function ie(g, A) {
  return function(I) {
    return g(A(I));
  };
}
var Ce = ie, Ee = Ce, ne = Ee(Object.getPrototypeOf, Object), xI = ne;
function se(g) {
  return g != null && typeof g == "object";
}
var pA = se, ae = KA, oe = xI, re = pA, ce = "[object Object]", he = Function.prototype, le = Object.prototype, vI = he.toString, De = le.hasOwnProperty, ue = vI.call(Object);
function fe(g) {
  if (!re(g) || ae(g) != ce)
    return !1;
  var A = oe(g);
  if (A === null)
    return !0;
  var I = De.call(A, "constructor") && A.constructor;
  return typeof I == "function" && I instanceof I && vI.call(I) == ue;
}
var iA = fe;
const BI = {
  dayjs(g, A) {
    return LI(g).format(A);
  }
}, lA = function(g, A, I, t) {
  let e = g;
  if (A) {
    let B = A.split(".");
    for (let Q of B)
      if (typeof e[Q] < "u")
        e = e[Q];
      else {
        e = null;
        break;
      }
  } else
    return typeof t == "object" && t.func ? BI[t.func].call(null, e, t.rule) : e;
  return I && e instanceof Array ? e.map((B) => lA(B, I, null, t)) : typeof t == "object" && t.func ? BI[t.func].call(null, e, t.rule) : e;
}, vg = function(g, A) {
  if (A && iA(A) && A.y && A.y instanceof Array && A.y.length > 0) {
    let I = [];
    if (A.x && A.x.name && A.x.path) {
      I.push([A.x.name]);
      let t = lA(g, A.x.path, A.x.mapKey, A.x.format);
      t && t.forEach((e, B) => {
        I[B + 1] = [e];
      }), A.y.forEach((e) => {
        I[0].push(e.name);
        let B = lA(g, e.path, e.mapKey, e.format);
        B && B instanceof Array && B.forEach((Q, C) => {
          I[C + 1] ? I[C + 1].push(Q) : I[C + 1] = [Q];
        });
      });
    } else
      A.y.forEach((t, e) => {
        let B = lA(g, t.path, t.mapKey, t.format);
        B && B instanceof Array && (e == 0 ? I.push([t.name]) : I[0].push(t.name), B.forEach((Q, C) => {
          I[C + 1] ? I[C + 1].push(Q) : I[C + 1] = [Q];
        }));
      });
    return I;
  } else {
    if (A && iA(A) && A.name && A.path)
      return {
        [A.name]: lA(g, A.path, A.mapKey, A.format)
      };
    if (A && A instanceof Array) {
      let I = {};
      return A.forEach((t) => {
        I[t.name] = lA(g, t.path, t.mapKey, t.format);
      }), I;
    } else
      return console.log("数据未处理"), g;
  }
}, b = function(g) {
  if (typeof g == "string")
    try {
      return JSON.parse(g);
    } catch {
      return g;
    }
  else
    return g ? JSON.parse(JSON.stringify(g)) : {};
}, X = function(g, A, I) {
  if (g && g instanceof Array) {
    let t = A ? g.findIndex((e) => e[A] == I) : g.findIndex((e) => e == I);
    return t > -1 ? g.splice(t, 1) : !1;
  } else
    return !1;
};
let T = (g = 21) => crypto.getRandomValues(new Uint8Array(g)).reduce((A, I) => (I &= 63, I < 36 ? A += I.toString(36) : I < 62 ? A += (I - 26).toString(36).toUpperCase() : I > 62 ? A += "-" : A += "_", A), "");
const de = function() {
  const g = function() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  };
  return g() + g() + g() + g() + g() + g() + g() + g();
};
let AA = {};
const oA = {
  add(g, A = 1e3, I) {
    let t = I || "it_" + T(7);
    return AA[t] && clearInterval(AA[t]), AA[t] = setInterval(g, A), t;
  },
  del(g) {
    if (g)
      AA[g] && (clearInterval(AA[g]), delete AA[g]);
    else {
      for (const A in AA)
        clearInterval(AA[A]);
      AA = {};
    }
  }
};
let P = {};
const Ng = {
  add(g, A, I) {
    let t = A || 1e3, e = I || "id_" + (/* @__PURE__ */ new Date()).getTime() + Math.floor(Math.random() * 1e3);
    return P[e] && clearTimeout(P[e]), P[e] = setTimeout(g, t), e;
  },
  del(g) {
    if (g)
      P[g] && (clearTimeout(P[g]), delete P[g]);
    else {
      for (const A in P)
        Object.hasOwnProperty.call(P, A) && clearTimeout(P[A]);
      P = {};
    }
  }
}, K = function(g = "AppSetup") {
  const { appContext: { config: { globalProperties: A = {} } } } = lt();
  return A[g] || null;
}, qg = function(g) {
  return g && g != document.body && g.parentNode ? g.parentNode.clientWidth > 0 && g.parentNode.clientHeight > 0 ? {
    width: g.parentNode.clientWidth,
    height: g.parentNode.clientHeight,
    ratio: g.parentNode.clientHeight / g.parentNode.clientWidth
  } : qg(g.parentNode) : {
    width: window.outerWidth,
    height: window.outerHeight,
    ratio: window.outerHeight / window.outerWidth
  };
}, Kg = function(g) {
  if (g) {
    let A = typeof g == "string" ? document.querySelector(g) : g, I = A.getBoundingClientRect();
    return I.width > 0 && I.height > 0 ? I : A.parentElement && A.parentElement.localName != "body" ? Kg(A.parentElement) : {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  return null;
}, qI = function(g, A) {
  let I = Kg(g) || {
    width: window.innerWidth,
    height: window.innerHeight
  }, t = I.height / A.height, e = I.width / A.width;
  return t < e ? { value: t, h: t, w: e } : { value: e, h: t, w: e };
}, KI = function(g) {
  return Array.isArray(g) && g.length > 0 && g.map((I) => ({
    id: I.id,
    zIndex: I.zIndex || 0
  })).sort((I, t) => t.zIndex - I.zIndex)[0].zIndex || 0;
}, v = function(g) {
  let A = {
    id: null,
    gpid: null,
    mid: null,
    visible: null,
    name: null,
    type: null,
    zIndex: null
  };
  for (const I in A)
    Object.hasOwnProperty.call(A, I) && (A[I] = g[I]);
  return A;
}, ye = function(...g) {
  let A = (/* @__PURE__ */ new Date()).getTime(), I = {
    id: "A_" + T(10),
    title: "",
    creattime: A,
    uptime: A,
    cover: "",
    description: "",
    background: { backgroundColor: "#111111" },
    width: 1080,
    height: 768,
    scaleMode: "auto",
    network: {},
    globalData: [],
    modules: [],
    actions: [],
    plugins: [],
    remote: []
  };
  return Object.assign({}, I, ...g);
}, Fg = function(g) {
  return g ? Object.keys(g).map(function(A) {
    return encodeURIComponent(A) + "=" + encodeURIComponent(g[A]);
  }).join("&") : "";
}, OI = function(g, A = !0) {
  let I = location.search || location.hash, t = {}, e = /([^?=&#]+)=([^?=&#]+)/g;
  return I.replace(e, (B, Q, C) => t[Q] = A ? decodeURIComponent(C) : C), g ? t[g] || "" : t;
}, we = LI, pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createSimpleData: v,
  dayjs: we,
  extractData: vg,
  getAppGlobal: K,
  getDomRect: Kg,
  getMaxZIndex: KI,
  getParentSize: qg,
  getScale: qI,
  getTemplateData: ye,
  getUrlParam: OI,
  guid: de,
  interval: oA,
  jsonData: b,
  jsonToParams: Fg,
  removeArray: X,
  timeout: Ng
}, Symbol.toStringTag, { value: "Module" })), QA = new fA(), p = {
  /**
   * 添加需要托管的eventObj对象事件
   * @param {string} eventName 事件名称
   * @param {function} fun 事件方法
   * @param {object} eventObj  委托对象
   */
  addEventListener(g, A, I = null) {
    QA.on(g, A, I);
  },
  /**
   * 删除托管的eventObj对象事件
   * @param {string} eventName 事件名称
   * @param {function} fun 委托对象
   * @param {object} eventObj  委托对象
   */
  removeEventListener(g, A, I) {
    I && A ? QA.off(g, A, I) : A ? QA.off(g, A) : QA.off(g);
  },
  /**
   * 清除所有
   */
  clear(g) {
    QA.removeAllListeners(g);
  },
  /**
   * 发送命令
   * @param {string} eventName 事件名称
   * @param {object} args 参数 
   * @param {boolean} force 强制发送
   */
  emit(g, A, I = !1) {
    if (typeof I == "boolean" && I)
      QA.emit(g, A);
    else if (xt(g)) {
      let t = arguments.length;
      if (t <= 3)
        QA.emit(g, A, I);
      else {
        let e = [];
        for (i = 1; i < t; i++)
          e[0] = arguments[i];
        QA.emit(g, ...e);
      }
    }
  },
  /**
   * 执行命令
   * @param {*} action 动作
   * @param {*} sprid 操作元素id
   * @param {*} appid 来自应以id
   */
  execute(g, A = "", I) {
    let t = {
      sprid: A,
      appid: I,
      data: b(g)
    };
    this.emit(dA.ACTION, t);
  },
  /**
   * 消息提示
   */
  message(g) {
    this.emit("message-send", g);
  },
  /**
   * 执行元素内的cmdRunning方法
   * @param {string} id 元素id 
   * @param {*} data 
   */
  running(g, A) {
    this.emit("run_function_" + g, A);
  },
  /**
   * 执行数据更新
   * @param {string} sprid 目标对象id 
   * @param {*} value 数据值
   */
  reviewData(g, A) {
    this.emit(dA.ACTION, {
      data: {
        action: "reviewData",
        sprid: g,
        value: A
      }
    });
  }
}, Ge = [{
  name: "主内容区",
  type: "content"
}, {
  name: "覆盖弹层",
  type: "overlayer"
}, {
  name: "固定层",
  type: "fixed"
}], Me = [
  {
    name: "显示隐藏",
    action: "show",
    target: "component",
    valueType: "boolean",
    value: !0
  },
  {
    name: "显示开关",
    action: "toggle",
    target: "component",
    valueType: "undefined",
    value: null
  },
  {
    name: "发送数据",
    action: "sendData",
    target: "component",
    valueType: "object",
    value: null
  },
  {
    name: "打开外链",
    action: "href",
    target: "url",
    valueType: "string",
    value: ""
  },
  {
    name: "页面切换",
    action: "singleModule",
    target: "modules",
    valueType: "string",
    value: ""
  },
  {
    name: "开关弹窗",
    action: "popup",
    target: "module",
    valueType: "string",
    value: ""
  }
], Ne = [
  {
    name: "静态数据",
    type: "source"
  },
  {
    name: "远程数据",
    type: "remote"
  },
  {
    name: "本地数据",
    type: "local"
  }
], Fe = [
  { name: "图表", type: "chart" },
  { name: "文本", type: "text" },
  { name: "表格", type: "table" },
  { name: "形状", type: "shape" },
  { name: "菜单", type: "menu" },
  { name: "媒体", type: "media" },
  { name: "地图", type: "map" },
  { name: "3D", type: "3d" },
  { name: "其它", type: "other" }
], ke = [
  {
    name: "点击",
    event: "click",
    pams: "",
    actions: [],
    actionValue: {}
  },
  {
    name: "定时任务",
    event: "interval",
    pams: { delay: 1e3 },
    actions: [],
    actionValue: {}
  },
  {
    name: "延迟任务",
    event: "timeout",
    pams: { delay: 1e3 },
    actions: [],
    actionValue: {}
  }
], Se = [
  {
    name: "应用启动",
    event: "launch",
    pams: null,
    actions: [],
    actionValue: {}
  },
  {
    name: "定时任务",
    event: "interval",
    pams: { delay: 1e3 },
    actions: [],
    actionValue: {}
  },
  {
    name: "延迟任务",
    event: "timeout",
    pams: { delay: 1e3 },
    actions: [],
    actionValue: {}
  }
], GA = {
  get level() {
    return Ge;
  },
  get actions() {
    return Me;
  },
  get dataTypes() {
    return Ne;
  },
  get component() {
    return Fe;
  },
  get events() {
    return ke;
  },
  get appEvents() {
    return Se;
  }
}, Re = "data:application/wasm;base64,AGFzbQEAAAAB4gEfYAJ/fwF/YAN/f38Bf2ACf38AYAN/f38AYAF/AX9gAX8AYAV/f39/fwBgBH9/f38AYAR/f39/AX9gAAF/YAV/f39/fwF/YAZ/f39/f38AYAF/AX5gAABgBn9/f39/fwF/YAd/f39/f39/AGAJf39/f39/f39/AGAJf39/f39/fn5+AGAFf39+f38AYAV/f31/fwBgA39/fABgBX9/fH9/AGAEf35/fwBgBH99f38AYAR/fH9/AGAHf39/f39/fwF/YAN/fH8Bf2AEf3x/fwF/YAJ+fwF/YAN+f38Bf2ABfAF/Ar8LHxEuL3JpY2hfd2FzbV9iZy5qcxpfX3diaW5kZ2VuX29iamVjdF9kcm9wX3JlZgAFES4vcmljaF93YXNtX2JnLmpzFV9fd2JpbmRnZW5fbnVtYmVyX25ldwAeES4vcmljaF93YXNtX2JnLmpzFF9fd2JpbmRnZW5faXNfb2JqZWN0AAQRLi9yaWNoX3dhc21fYmcuanMZX193YmluZGdlbl9qc3ZhbF9sb29zZV9lcQAAES4vcmljaF93YXNtX2JnLmpzFl9fd2JpbmRnZW5fYm9vbGVhbl9nZXQABBEuL3JpY2hfd2FzbV9iZy5qcxVfX3diaW5kZ2VuX251bWJlcl9nZXQAAhEuL3JpY2hfd2FzbV9iZy5qcxVfX3diaW5kZ2VuX3N0cmluZ19nZXQAAhEuL3JpY2hfd2FzbV9iZy5qcxRfX3diaW5kZ2VuX2Vycm9yX25ldwAAES4vcmljaF93YXNtX2JnLmpzGl9fd2JnX2dldF8yN2ZlM2RhYzFjNGQwMjI0AAARLi9yaWNoX3dhc21fYmcuanMdX193YmdfbGVuZ3RoX2U0OThmYmMyNGY5YzFkNGYABBEuL3JpY2hfd2FzbV9iZy5qcxpfX3diZ19uZXdfYjUyNWRlMTdmNDRhODk0MwAJES4vcmljaF93YXNtX2JnLmpzFl9fd2JpbmRnZW5faXNfZnVuY3Rpb24ABBEuL3JpY2hfd2FzbV9iZy5qcxtfX3diZ19uZXh0X2I3ZDUzMGMwNGZkOGIyMTcABBEuL3JpY2hfd2FzbV9iZy5qcxtfX3diZ19uZXh0Xzg4NTYwZWMwNmEwOTRkZWEABBEuL3JpY2hfd2FzbV9iZy5qcxtfX3diZ19kb25lXzFlYmVjMDNiYmQ5MTk4NDMABBEuL3JpY2hfd2FzbV9iZy5qcxxfX3diZ192YWx1ZV82YWM4ZGE1Y2M1YjNlZmRhAAQRLi9yaWNoX3dhc21fYmcuanMfX193YmdfaXRlcmF0b3JfNTVmMTE0NDQ2MjIxYWE1YQAJES4vcmljaF93YXNtX2JnLmpzGl9fd2JnX2dldF9iYWY0ODU1ZjlhOTg2MTg2AAARLi9yaWNoX3dhc21fYmcuanMbX193YmdfY2FsbF85NWQxZWE0ODhkMDNlNGU4AAARLi9yaWNoX3dhc21fYmcuanMaX193Ymdfc2V0XzE3MjI0YmM1NDhkZDFkN2IAAxEuL3JpY2hfd2FzbV9iZy5qcx5fX3diZ19pc0FycmF5XzM5ZDI4OTk3YmY2Yjk2YjQABBEuL3JpY2hfd2FzbV9iZy5qcy1fX3diZ19pbnN0YW5jZW9mX0FycmF5QnVmZmVyX2E2OWYwMmVlNGM0ZjUwNjUABBEuL3JpY2hfd2FzbV9iZy5qcyRfX3diZ19pc1NhZmVJbnRlZ2VyXzhjNDc4OTAyOWU4ODUxNTkABBEuL3JpY2hfd2FzbV9iZy5qcx1fX3diZ19idWZmZXJfY2Y2NWMwN2RlMzRiOWEwOAAEES4vcmljaF93YXNtX2JnLmpzGl9fd2JnX25ld181MzdiNzM0MWNlOTBiYjMxAAQRLi9yaWNoX3dhc21fYmcuanMaX193Ymdfc2V0XzE3NDk5ZThhYTQwMDNlYmQAAxEuL3JpY2hfd2FzbV9iZy5qcx1fX3diZ19sZW5ndGhfMjdhMmFmZThhYjQyYjA5ZgAEES4vcmljaF93YXNtX2JnLmpzLF9fd2JnX2luc3RhbmNlb2ZfVWludDhBcnJheV8wMWNlYmU3OWNhNjA2Y2NhAAQRLi9yaWNoX3dhc21fYmcuanMXX193YmluZGdlbl9kZWJ1Z19zdHJpbmcAAhEuL3JpY2hfd2FzbV9iZy5qcxBfX3diaW5kZ2VuX3Rocm93AAIRLi9yaWNoX3dhc21fYmcuanMRX193YmluZGdlbl9tZW1vcnkACQOcApoCAwYEDwMIBgAABQYAAQUIGwEDAg4DEAUCGgIBBQUFAQADAQIEBQUDBQIDHAECAwsABRELBQAZBAoAAAIBHQADAwAABQECAAkABQIDAwIDAgIDAgIAAAAEAwICAgIDAwICAAYIAwcAAQEHBwIDBwIAAgIAAAMFAAADAgYCCwACAgMDAwMDAAMAAgECAgAEAwcAAAAAAAAAAAMDAQICBAUCAwIBAgMAAQEBAgMCDQIAAgICAgIKAgICBAQCAAAAAAICBQQCBQUCAgUDAQYDDgACBhITChUCBwUAAQUEBAIFFAMACAIEAQAFAAYAAAAFAgQABAQBBAQCBAAAAwMDAAMBAAAABAAFAA0ABAQEBAACAAEBAAAABAQMDAwFBAUBcAFWVgUDAQARBgkBfwFBgIDAAAsHsgEKBm1lbW9yeQIACXNlY3JldGtleQCKAQh2YWxpZGF0ZQCBAQdlbmNyeXB0AKMBB2RlY3J5cHQAugERX193YmluZGdlbl9tYWxsb2MA1wESX193YmluZGdlbl9yZWFsbG9jAOgBH19fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIAoQIPX193YmluZGdlbl9mcmVlAIECFF9fd2JpbmRnZW5fZXhuX3N0b3JlAIsCCaUBAQBBAQtV/AHZAYUCwwG4ArACogKGAiaFArgCpgK4AsQBV64BjQGjApECZrQBuAKEAqQC9gGeAuwBzAFkiQK4AtoB9wH0Ae4B7gHwAZoB8QHxAe4B7wHyAesBigKxAZsCqQG4AsUBWK8B9QG3ArUC5gFwiQHLAYwCtgK4AsYBlgKwAdwBqgGrApcCjgKGAqUBU7gCtgKgAkp0tQGfAp0CcrIBrQJzCurdBJoCviwCHH8EfiMAQcAKayIEJAACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgASkDACIfUEUEQCABKQMIIiBQDQEgASkDECIhUA0CIB8gIXwiIiAfVA0DIB8gIFQNBCABLAAaIREgAS8BGCEBIAQgHz4CACAEQQFBAiAfQoCAgIAQVCIDGzYCoAEgBEEAIB9CIIinIAMbNgIEIARBCGpBAEGYARCvAhogBCAgPgKoASAEQQFBAiAgQoCAgIAQVCIDGzYCyAIgBEEAICBCIIinIAMbNgKsASAEQbABakEAQZgBEK8CGiAEICE+AtACIARBAUECICFCgICAgBBUIgMbNgLwAyAEQQAgIUIgiKcgAxs2AtQCIARB2AJqQQBBmAEQrwIaIARB+ANqQQRyQQBBnAEQrwIaIARBATYC+AMgBEEBNgKYBSABrUIwhkIwhyAiQn98eX1CwprB6AR+QoChzaC0AnxCIIinIgNBEHRBEHUhDwJAIAFBEHRBEHUiBkEATgRAIAQgARAqGiAEQagBaiABECoaIARB0AJqIAEQKhoMAQsgBEH4A2pBACAGa0EQdEEQdRAqGgsCQCAPQX9MBEAgBEEAIA9rQRB0QRB1IgEQMSAEQagBaiABEDEgBEHQAmogARAxDAELIARB+ANqIANB//8DcRAxCyAEKAKgASEGIARBmAlqIARBoAEQrgIaIAQgBjYCuAogBiAEKALwAyIIIAYgCEsbIgNBKEsNEiADRQRAQQAhAwwHCyADQQFxIQkgA0EBRg0FIANBfnEhCiAEQZgJaiEBIARB0AJqIQUDQCABIAcgASgCACILIAUoAgBqIg1qIhA2AgAgAUEEaiIHIAcoAgAiEiAFQQRqKAIAaiIHIA0gC0kgECANSXJqIg02AgAgByASSSANIAdJciEHIAVBCGohBSABQQhqIQEgCiAMQQJqIgxHDQALDAULQeeqwABBHEGEq8AAEL4BAAtBlKvAAEEdQbSrwAAQvgEAC0HEq8AAQRxB4KvAABC+AQALQfCrwABBNkGorMAAEL4BAAtBuKzAAEE3QfCswAAQvgEACyAJBH8gDEECdCIBIARBmAlqaiINIA0oAgAiDSAEQdACaiABaigCAGoiASAHaiIFNgIAIAEgDUkgBSABSXIFIAcLRQ0AIANBJ0sNASAEQZgJaiADQQJ0akEBNgIAIANBAWohAwsgBCADNgK4CiAEKAKYBSINIAMgDSADSxsiAUEpTw0MIAFBAnQhAQJAA0AgAQRAQX8gAUF8aiIBIARBmAlqaigCACIDIAEgBEH4A2pqKAIAIgVHIAMgBUsbIgVFDQEMAgsLQX9BACABGyEFCyAFIBFOBEAgBkEpTw0PIAZFBEBBACEGDAQLIAZBf2pB/////wNxIgFBAWoiA0EDcSEFIAFBA0kEQCAEIQFCACEfDAMLIANB/P///wdxIQcgBCEBQgAhHwNAIAEgATUCAEIKfiAffCIfPgIAIAFBBGoiAyADNQIAQgp+IB9CIIh8Ih8+AgAgAUEIaiIDIAM1AgBCCn4gH0IgiHwiHz4CACABQQxqIgMgAzUCAEIKfiAfQiCIfCIfPgIAIB9CIIghHyABQRBqIQEgB0F8aiIHDQALDAILIA9BAWohDwwJCyADQShBpNjAABCeAQALIAUEQANAIAEgATUCAEIKfiAffCIfPgIAIAFBBGohASAfQiCIIR8gBUF/aiIFDQALCyAfpyIBRQ0AIAZBJ0sNASAEIAZBAnRqIAE2AgAgBkEBaiEGCyAEIAY2AqABIAQoAsgCIgNBKU8NCCADRQRAQQAhAwwDCyADQX9qQf////8DcSIBQQFqIgZBA3EhBSABQQNJBEAgBEGoAWohAUIAIR8MAgsgBkH8////B3EhByAEQagBaiEBQgAhHwNAIAEgATUCAEIKfiAffCIfPgIAIAFBBGoiBiAGNQIAQgp+IB9CIIh8Ih8+AgAgAUEIaiIGIAY1AgBCCn4gH0IgiHwiHz4CACABQQxqIgYgBjUCAEIKfiAfQiCIfCIfPgIAIB9CIIghHyABQRBqIQEgB0F8aiIHDQALDAELIAZBKEGk2MAAEJ4BAAsgBQRAA0AgASABNQIAQgp+IB98Ih8+AgAgAUEEaiEBIB9CIIghHyAFQX9qIgUNAAsLIB+nIgFFDQAgA0EnSw0BIARBqAFqIANBAnRqIAE2AgAgA0EBaiEDCyAEIAM2AsgCIAhBKU8NASAIRQRAIARBADYC8AMMBAsgCEF/akH/////A3EiAUEBaiIDQQNxIQUgAUEDSQRAIARB0AJqIQFCACEfDAMLIANB/P///wdxIQcgBEHQAmohAUIAIR8DQCABIAE1AgBCCn4gH3wiHz4CACABQQRqIgMgAzUCAEIKfiAfQiCIfCIfPgIAIAFBCGoiAyADNQIAQgp+IB9CIIh8Ih8+AgAgAUEMaiIDIAM1AgBCCn4gH0IgiHwiHz4CACAfQiCIIR8gAUEQaiEBIAdBfGoiBw0ACwwCCyADQShBpNjAABCeAQALIAhBKEGk2MAAEJkCAAsgBQRAA0AgASABNQIAQgp+IB98Ih8+AgAgAUEEaiEBIB9CIIghHyAFQX9qIgUNAAsLIAQgH6ciAQR/IAhBJ0sNAiAEQdACaiAIQQJ0aiABNgIAIAhBAWoFIAgLNgLwAwsgBEGgBWogBEH4A2pBoAEQrgIaIAQgDTYCwAYgBEGgBWpBARAqIRUgBCgCmAUhASAEQcgGaiAEQfgDakGgARCuAhogBCABNgLoByAEQcgGakECECohFiAEKAKYBSEBIARB8AdqIARB+ANqQaABEK4CGiAEIAE2ApAJIARB8AdqQQMQKiEXAkAgBCgCoAEiBiAEKAKQCSISIAYgEksbIgNBKE0EQCAEQZwFaiEYIARBxAZqIRkgBEHsB2ohGiAEKAKYBSEQIAQoAsAGIRMgBCgC6AchFEEAIQgDQCAIIQ0gA0ECdCEBAkADQCABBEBBfyABIBpqKAIAIgggAUF8aiIBIARqKAIAIgVHIAggBUsbIgVFDQEMAgsLQX9BACABGyEFC0EAIQkgBUEBTQRAIAMEQEEBIQdBACEMIANBAUcEQCADQX5xIQkgBCIBQfAHaiEFA0AgASAHIAEoAgAiByAFKAIAQX9zaiIGaiIKNgIAIAFBBGoiCCAIKAIAIgsgBUEEaigCAEF/c2oiCCAGIAdJIAogBklyaiIGNgIAIAggC0kgBiAISXIhByAFQQhqIQUgAUEIaiEBIAkgDEECaiIMRw0ACwsgA0EBcQR/IAQgDEECdCIBaiIGIAYoAgAiBiABIBdqKAIAQX9zaiIBIAdqIgg2AgAgASAGSSAIIAFJcgUgBwtFDQgLIAQgAzYCoAFBCCEJIAMhBgsgBiAUIAYgFEsbIgNBKU8NBCADQQJ0IQECQANAIAEEQEF/IAEgGWooAgAiCCABQXxqIgEgBGooAgAiBUcgCCAFSxsiBUUNAQwCCwtBf0EAIAEbIQULAkAgBUEBSwRAIAYhAwwBCyADBEBBASEHQQAhDCADQQFHBEAgA0F+cSEKIAQiAUHIBmohBQNAIAEgByABKAIAIgcgBSgCAEF/c2oiBmoiCzYCACABQQRqIgggCCgCACIOIAVBBGooAgBBf3NqIgggBiAHSSALIAZJcmoiBjYCACAIIA5JIAYgCElyIQcgBUEIaiEFIAFBCGohASAKIAxBAmoiDEcNAAsLIANBAXEEfyAEIAxBAnQiAWoiBiAGKAIAIgYgASAWaigCAEF/c2oiASAHaiIINgIAIAEgBkkgCCABSXIFIAcLRQ0ICyAEIAM2AqABIAlBBHIhCQsCQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAyATIAMgE0sbIghBKUkEQCAIQQJ0IQECQANAIAEEQEF/IAEgGGooAgAiBiABQXxqIgEgBGooAgAiBUcgBiAFSxsiBUUNAQwCCwtBf0EAIAEbIQULAkAgBUEBSwRAIAMhCAwBCyAIBEBBASEHQQAhDCAIQQFHBEAgCEF+cSEKIAQiAUGgBWohBQNAIAEgByABKAIAIgcgBSgCAEF/c2oiA2oiCzYCACABQQRqIgYgBigCACIOIAVBBGooAgBBf3NqIgYgAyAHSSALIANJcmoiAzYCACAGIA5JIAMgBklyIQcgBUEIaiEFIAFBCGohASAKIAxBAmoiDEcNAAsLIAhBAXEEfyAEIAxBAnQiAWoiAyADKAIAIgMgASAVaigCAEF/c2oiASAHaiIGNgIAIAEgA0kgBiABSXIFIAcLRQ0YCyAEIAg2AqABIAlBAmohCQsgCCAQIAggEEsbIgZBKU8NFyAGQQJ0IQECQANAIAEEQEF/IAFBfGoiASAEQfgDamooAgAiAyABIARqKAIAIgVHIAMgBUsbIgVFDQEMAgsLQX9BACABGyEFCwJAIAVBAUsEQCAIIQYMAQsgBgRAQQEhB0EAIQwgBkEBRwRAIAZBfnEhCiAEIgFB+ANqIQUDQCABIAcgASgCACIHIAUoAgBBf3NqIgNqIgs2AgAgAUEEaiIIIAgoAgAiDiAFQQRqKAIAQX9zaiIIIAMgB0kgCyADSXJqIgM2AgAgCCAOSSADIAhJciEHIAVBCGohBSABQQhqIQEgCiAMQQJqIgxHDQALCyAGQQFxBH8gBCAMQQJ0IgFqIgMgAygCACIDIARB+ANqIAFqKAIAQX9zaiIBIAdqIgg2AgAgASADSSAIIAFJcgUgBwtFDRgLIAQgBjYCoAEgCUEBaiEJCyANQRFGDQIgAiANaiAJQTBqOgAAIAYgBCgCyAIiCiAGIApLGyIBQSlPDRUgDUEBaiEIIAFBAnQhAQJAA0AgAQRAQX8gAUF8aiIBIARBqAFqaigCACIDIAEgBGooAgAiBUcgAyAFSxsiA0UNAQwCCwtBf0EAIAEbIQMLIARBmAlqIARBoAEQrgIaIAQgBjYCuAogBiAEKALwAyILIAYgC0sbIglBKEsNBAJAIAlFBEBBACEJDAELQQAhB0EAIQwgCUEBRwRAIAlBfnEhGyAEQZgJaiEBIARB0AJqIQUDQCABIAcgASgCACIcIAUoAgBqIgdqIh02AgAgAUEEaiIOIA4oAgAiHiAFQQRqKAIAaiIOIAcgHEkgHSAHSXJqIgc2AgAgDiAeSSAHIA5JciEHIAVBCGohBSABQQhqIQEgGyAMQQJqIgxHDQALCyAJQQFxBH8gDEECdCIBIARBmAlqaiIFIAcgBSgCACIFIARB0AJqIAFqKAIAaiIBaiIHNgIAIAEgBUkgByABSXIFIAcLRQ0AIAlBJ0sNAiAEQZgJaiAJQQJ0akEBNgIAIAlBAWohCQsgBCAJNgK4CiAQIAkgECAJSxsiAUEpTw0VIAFBAnQhAQJAA0AgAQRAQX8gAUF8aiIBIARBmAlqaigCACIFIAEgBEH4A2pqKAIAIgdHIAUgB0sbIgVFDQEMAgsLQX9BACABGyEFCyADIBFIIAUgEUhyRQRAIAZBKU8NGCAGRQRAQQAhBgwJCyAGQX9qQf////8DcSIBQQFqIgNBA3EhBSABQQNJBEAgBCEBQgAhHwwICyADQfz///8HcSEHIAQhAUIAIR8DQCABIAE1AgBCCn4gH3wiHz4CACABQQRqIgMgAzUCAEIKfiAfQiCIfCIfPgIAIAFBCGoiAyADNQIAQgp+IB9CIIh8Ih8+AgAgAUEMaiIDIAM1AgBCCn4gH0IgiHwiHz4CACAfQiCIIR8gAUEQaiEBIAdBfGoiBw0ACwwHCyAFIBFODQUgAyARSARAIARBARAqGiAEKAKgASIBIAQoApgFIgMgASADSxsiAUEpTw0WIAFBAnQhASAEQXxqIQMgBEH0A2ohBgJAA0AgAQRAIAEgA2ohBSABIAZqIQcgAUF8aiEBQX8gBygCACIHIAUoAgAiBUcgByAFSxsiBUUNAQwCCwtBf0EAIAEbIQULIAVBAk8NBgsgDUERTw0DIAIgCGohBkF/IQUgDSEBAkADQCABQX9GDQEgBUEBaiEFIAEgAmogAUF/aiIDIQEtAABBOUYNAAsgAiADaiIBQQFqIgYgBi0AAEEBajoAACANIANBAmpJDQYgAUECakEwIAUQrwIaDAYLIAJBMToAACANBEAgAkEBakEwIA0QrwIaCyAIQRFJBEAgBkEwOgAAIA9BAWohDyANQQJqIQgMBgsgCEERQeCtwAAQngEACyAIQShBpNjAABCZAgALIAlBKEGk2MAAEJ4BAAtBEUERQcCtwAAQngEACyAIQRFB0K3AABCZAgALIAlBKEGk2MAAEJkCAAsgCEERTQRAIAAgDzsBCCAAIAg2AgQgACACNgIAIARBwApqJAAPCyAIQRFB8K3AABCZAgALIAUEQANAIAEgATUCAEIKfiAffCIfPgIAIAFBBGohASAfQiCIIR8gBUF/aiIFDQALCyAfpyIBRQ0AIAZBJ0sNASAEIAZBAnRqIAE2AgAgBkEBaiEGCyAEIAY2AqABIApBKU8NASAKRQRAQQAhCgwECyAKQX9qQf////8DcSIBQQFqIgNBA3EhBSABQQNJBEAgBEGoAWohAUIAIR8MAwsgA0H8////B3EhByAEQagBaiEBQgAhHwNAIAEgATUCAEIKfiAffCIfPgIAIAFBBGoiAyADNQIAQgp+IB9CIIh8Ih8+AgAgAUEIaiIDIAM1AgBCCn4gH0IgiHwiHz4CACABQQxqIgMgAzUCAEIKfiAfQiCIfCIfPgIAIB9CIIghHyABQRBqIQEgB0F8aiIHDQALDAILIAZBKEGk2MAAEJ4BAAsgCkEoQaTYwAAQmQIACyAFBEADQCABIAE1AgBCCn4gH3wiHz4CACABQQRqIQEgH0IgiCEfIAVBf2oiBQ0ACwsgH6ciAUUNACAKQSdLDQEgBEGoAWogCkECdGogATYCACAKQQFqIQoLIAQgCjYCyAIgC0EpTw0BIAtFBEBBACELDAQLIAtBf2pB/////wNxIgFBAWoiA0EDcSEFIAFBA0kEQCAEQdACaiEBQgAhHwwDCyADQfz///8HcSEHIARB0AJqIQFCACEfA0AgASABNQIAQgp+IB98Ih8+AgAgAUEEaiIDIAM1AgBCCn4gH0IgiHwiHz4CACABQQhqIgMgAzUCAEIKfiAfQiCIfCIfPgIAIAFBDGoiAyADNQIAQgp+IB9CIIh8Ih8+AgAgH0IgiCEfIAFBEGohASAHQXxqIgcNAAsMAgsgCkEoQaTYwAAQngEACyALQShBpNjAABCZAgALIAUEQANAIAEgATUCAEIKfiAffCIfPgIAIAFBBGohASAfQiCIIR8gBUF/aiIFDQALCyAfpyIBRQ0AIAtBJ0sNAyAEQdACaiALQQJ0aiABNgIAIAtBAWohCwsgBCALNgLwAyAGIBIgBiASSxsiA0EoTQ0ACwsMAgsgC0EoQaTYwAAQngEACyAIQShBpNjAABCeAQALIANBKEGk2MAAEJkCAAsgAUEoQaTYwAAQmQIAC0G02MAAQRpBpNjAABC+AQALIAZBKEGk2MAAEJkCAAucJgIcfwN+IwBB0AZrIgUkAAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAEpAwAiIlBFBEAgASkDCCIjUA0BIAEpAxAiIVANAiAhICJ8ICJUDQMgIiAjVA0EIAEvARghByAFICI+AgggBUEBQQIgIkKAgICAEFQiARs2AqgBIAVBACAiQiCIpyABGzYCDCAFQRBqQQBBmAEQrwIaIAVBsAFqQQRyQQBBnAEQrwIaIAVBATYCsAEgBUEBNgLQAiAHrUIwhkIwhyAiQn98eX1CwprB6AR+QoChzaC0AnxCIIinIgZBEHRBEHUhEgJAIAdBEHRBEHUiAUEATgRAIAVBCGogBxAqGgwBCyAFQbABakEAIAFrQRB0QRB1ECoaCwJAIBJBf0wEQCAFQQhqQQAgEmtBEHRBEHUQMQwBCyAFQbABaiAGQf//A3EQMQsgBSgC0AIhDSAFQagFaiAFQbABakGgARCuAhogBSANNgLIBgJAIAMiCkEKSQ0AAkAgDUEoSwRAIA0hAQwBCyAFQaAFaiEWIA0hAQNAAkAgAUUNACABQX9qQf////8DcSIJQQFqIgZBAXEgAUECdCEBAn8gCUUEQEIAISEgBUGoBWogAWoMAQsgBkH+////B3EhCCABIBZqIQFCACEhA0AgAUEEaiIGIAY1AgAgIUIghoQiI0KAlOvcA4AiIT4CACABIAE1AgAgIyAhQoCU69wDfn1CIIaEIiNCgJTr3AOAIiE+AgAgIyAhQoCU69wDfn0hISABQXhqIQEgCEF+aiIIDQALIAFBCGoLIQFFDQAgAUF8aiIBIAE1AgAgIUIghoRCgJTr3AOAPgIACyAKQXdqIgpBCU0NAiAFKALIBiIBQSlJDQALCwwSCwJ/An8CQCAKQQJ0QbiowABqKAIAIgkEQCAFKALIBiIKQSlPDQlBACAKRQ0DGiAKQX9qQf////8DcSIGQQFqIgFBAXEhByAKQQJ0IQogCa0hIiAGDQFCACEhIAVBqAVqIApqDAILQevYwABBG0Gk2MAAEL4BAAsgAUH+////B3EhCCAFIApqQaAFaiEBQgAhIQNAIAFBBGoiBiAGNQIAICFCIIaEIiMgIoAiIT4CACABIAE1AgAgIyAhICJ+fUIghoQiIyAigCIhPgIAICMgISAifn0hISABQXhqIQEgCEF+aiIIDQALIAFBCGoLIQEgBwRAIAFBfGoiASABNQIAICFCIIaEICKAPgIACyAFKALIBgsiASAFKAKoASIMIAEgDEsbIg5BKEsNBiAORQRAQQAhDgwJCyAOQQFxIRMgDkEBRgRAQQAhCgwICyAOQX5xIRBBACEKIAVBqAVqIQEgBUEIaiEIA0AgASABKAIAIhYgCCgCAGoiESAKQQFxaiIJNgIAIAFBBGoiBiAGKAIAIgcgCEEEaigCAGoiCiARIBZJIAkgEUlyaiIGNgIAIAogB0kgBiAKSXIhCiAIQQhqIQggAUEIaiEBIBAgC0ECaiILRw0ACwwHC0HnqsAAQRxBgK7AABC+AQALQZSrwABBHUGQrsAAEL4BAAtBxKvAAEEcQaCuwAAQvgEAC0Hwq8AAQTZBsK7AABC+AQALQbiswABBN0HArsAAEL4BAAsgCkEoQaTYwAAQmQIACyAOQShBpNjAABCZAgALIBMEfyALQQJ0IgcgBUGoBWpqIgEgASgCACIGIAVBCGogB2ooAgBqIgcgCmoiATYCACAHIAZJIAEgB0lyBSAKC0EBcUUNACAOQSdLDQEgBUGoBWogDkECdGpBATYCACAOQQFqIQ4LIAUgDjYCyAYgDiANIA4gDUsbIgFBKU8NCCABQQJ0IQECQANAIAEEQEF/IAFBfGoiASAFQbABamooAgAiByABIAVBqAVqaigCACIGRyAHIAZLGyIIRQ0BDAILC0F/QQAgARshCAsgCEEBTQRAIBJBAWohEgwFCyAMQSlPDQEgDEUEQEEAIQwMBAsgDEF/akH/////A3EiBkEBaiIBQQNxIQggBkEDSQRAIAVBCGohAUIAISEMAwsgAUH8////B3EhCSAFQQhqIQFCACEhA0AgASABNQIAQgp+ICF8IiE+AgAgAUEEaiIGIAY1AgBCCn4gIUIgiHwiIT4CACABQQhqIgYgBjUCAEIKfiAhQiCIfCIhPgIAIAFBDGoiBiAGNQIAQgp+ICFCIIh8IiE+AgAgIUIgiCEhIAFBEGohASAJQXxqIgkNAAsMAgsgDkEoQaTYwAAQngEACyAMQShBpNjAABCZAgALIAgEQANAIAEgATUCAEIKfiAhfCIhPgIAIAFBBGohASAhQiCIISEgCEF/aiIIDQALCyAhpyIBRQ0AIAxBJ0sNAiAFQQhqIAxBAnRqIAE2AgAgDEEBaiEMCyAFIAw2AqgBC0EAIQYCQCASQRB0QRB1IgcgBEEQdEEQdSIBTgRAIBIgBGtBEHRBEHUgAyAHIAFrIANJGyIKDQELQQAhCgwCCyAFQdgCaiAFQbABakGgARCuAhogBSANNgL4AyAFQdgCakEBECohGiAFKALQAiEBIAVBgARqIAVBsAFqQaABEK4CGiAFIAE2AqAFIAVBgARqQQIQKiEbIAUoAtACIQEgBUGoBWogBUGwAWpBoAEQrgIaIAUgATYCyAYgBUGsAWohHCAFQdQCaiEdIAVB/ANqIR4gBUGkBWohHyAFQagFakEDECohICAFKAKoASEGIAUoAtACIQ0gBSgC+AMhFyAFKAKgBSEYIAUoAsgGIRlBACEWAkADQCAWIRACQAJAAkACQAJAAkACQCAGQSlJBEAgEEEBaiEWIAZBAnQhCUEAIQECQAJAAkADQCABIAlGDQEgBUEIaiABaiABQQRqIQEoAgBFDQALIAYgGSAGIBlLGyIHQSlPDQQgB0ECdCEBAkADQCABBEBBfyABIB9qKAIAIgggAUF8aiIBIAVBCGpqKAIAIglHIAggCUsbIghFDQEMAgsLQX9BACABGyEIC0EAIRQgCEECSQRAIAcEQEEBIQtBACEGIAdBAUcEQCAHQX5xIRUgBUEIaiEBIAVBqAVqIQgDQCABIAEoAgAiDiAIKAIAQX9zaiIMIAtBAXFqIhE2AgAgAUEEaiIJIAkoAgAiEyAIQQRqKAIAQX9zaiIPIAwgDkkgESAMSXJqIgk2AgAgDyATSSAJIA9JciELIAhBCGohCCABQQhqIQEgFSAGQQJqIgZHDQALCyAHQQFxBH8gBkECdCIJIAVBCGpqIgEgASgCACIGIAkgIGooAgBBf3NqIgkgC2oiATYCACAJIAZJIAEgCUlyBSALC0EBcUUNFAsgBSAHNgKoAUEIIRQgByEGCyAGIBggBiAYSxsiCUEpTw0HIAlBAnQhAQNAIAFFDQJBfyABIB5qKAIAIgggAUF8aiIBIAVBCGpqKAIAIgdHIAggB0sbIghFDQALDAILIAogEEkNBCAKIANLDQUgCiAQRg0OIAIgEGpBMCAKIBBrEK8CGgwOC0F/QQAgARshCAsCQCAIQQFLBEAgBiEJDAELIAkEQEEBIQtBACEGIAlBAUcEQCAJQX5xIRUgBUEIaiEBIAVBgARqIQgDQCABIAEoAgAiDiAIKAIAQX9zaiIMIAtBAXFqIhE2AgAgAUEEaiIHIAcoAgAiEyAIQQRqKAIAQX9zaiIPIAwgDkkgESAMSXJqIgc2AgAgDyATSSAHIA9JciELIAhBCGohCCABQQhqIQEgFSAGQQJqIgZHDQALCyAJQQFxBH8gBkECdCIHIAVBCGpqIgEgASgCACIGIAcgG2ooAgBBf3NqIgcgC2oiATYCACAHIAZJIAEgB0lyBSALC0EBcUUNEQsgBSAJNgKoASAUQQRyIRQLIAkgFyAJIBdLGyIHQSlPDQUgB0ECdCEBAkADQCABBEBBfyABIB1qKAIAIgggAUF8aiIBIAVBCGpqKAIAIgZHIAggBksbIghFDQEMAgsLQX9BACABGyEICwJAIAhBAUsEQCAJIQcMAQsgBwRAQQEhC0EAIQYgB0EBRwRAIAdBfnEhFSAFQQhqIQEgBUHYAmohCANAIAEgASgCACIOIAgoAgBBf3NqIgwgC0EBcWoiETYCACABQQRqIgkgCSgCACITIAhBBGooAgBBf3NqIg8gDCAOSSARIAxJcmoiCTYCACAPIBNJIAkgD0lyIQsgCEEIaiEIIAFBCGohASAVIAZBAmoiBkcNAAsLIAdBAXEEfyAGQQJ0IgkgBUEIamoiASABKAIAIgYgCSAaaigCAEF/c2oiCSALaiIBNgIAIAkgBkkgASAJSXIFIAsLQQFxRQ0RCyAFIAc2AqgBIBRBAmohFAsgByANIAcgDUsbIgZBKU8NDiAGQQJ0IQECQANAIAEEQEF/IAEgHGooAgAiCCABQXxqIgEgBUEIamooAgAiCUcgCCAJSxsiCEUNAQwCCwtBf0EAIAEbIQgLAkAgCEEBSwRAIAchBgwBCyAGBEBBASELQQAhDCAGQQFHBEAgBkF+cSEOIAVBCGohASAFQbABaiEIA0AgASABKAIAIhEgCCgCAEF/c2oiDyALQQFxaiITNgIAIAFBBGoiByAHKAIAIgkgCEEEaigCAEF/c2oiFSAPIBFJIBMgD0lyaiIHNgIAIBUgCUkgByAVSXIhCyAIQQhqIQggAUEIaiEBIA4gDEECaiIMRw0ACwsgBkEBcQR/IAxBAnQiCSAFQQhqaiIBIAEoAgAiByAFQbABaiAJaigCAEF/c2oiCSALaiIBNgIAIAkgB0kgASAJSXIFIAsLQQFxRQ0RCyAFIAY2AqgBIBRBAWohFAsgAyAQRwRAIAIgEGogFEEwajoAACAGQSlPDQ8gBkUEQEEAIQYMCQsgBkF/akH/////A3EiB0EBaiIBQQNxIQggB0EDSQRAIAVBCGohAUIAISEMCAsgAUH8////B3EhCSAFQQhqIQFCACEhA0AgASABNQIAQgp+ICF8IiE+AgAgAUEEaiIHIAc1AgBCCn4gIUIgiHwiIT4CACABQQhqIgcgBzUCAEIKfiAhQiCIfCIhPgIAIAFBDGoiByAHNQIAQgp+ICFCIIh8IiE+AgAgIUIgiCEhIAFBEGohASAJQXxqIgkNAAsMBwsgAyADQeCuwAAQngEACwwNCyAHQShBpNjAABCZAgALIBAgCkHQrsAAEJoCAAsgCiADQdCuwAAQmQIACyAJQShBpNjAABCZAgALIAdBKEGk2MAAEJkCAAsgCARAA0AgASABNQIAQgp+ICF8IiE+AgAgAUEEaiEBICFCIIghISAIQX9qIggNAAsLICGnIgFFDQAgBkEnSw0CIAVBCGogBkECdGogATYCACAGQQFqIQYLIAUgBjYCqAEgCiAWRw0AC0EBIQYMAgsgBkEoQaTYwAAQngEACyAMQShBpNjAABCeAQALAkACQAJAAkACQAJAIA1BKUkEQCANRQRAQQAhDQwDCyANQX9qQf////8DcSIHQQFqIgFBA3EhCCAHQQNJBEAgBUGwAWohAUIAISEMAgsgAUH8////B3EhCSAFQbABaiEBQgAhIQNAIAEgATUCAEIFfiAhfCIhPgIAIAFBBGoiByAHNQIAQgV+ICFCIIh8IiE+AgAgAUEIaiIHIAc1AgBCBX4gIUIgiHwiIT4CACABQQxqIgcgBzUCAEIFfiAhQiCIfCIhPgIAICFCIIghISABQRBqIQEgCUF8aiIJDQALDAELIA1BKEGk2MAAEJkCAAsgCARAA0AgASABNQIAQgV+ICF8IiE+AgAgAUEEaiEBICFCIIghISAIQX9qIggNAAsLICGnIgFFDQAgDUEnSw0BIAVBsAFqIA1BAnRqIAE2AgAgDUEBaiENCyAFIA02AtACIAUoAqgBIgEgDSABIA1LGyIBQSlPDQUgAUECdCEBAkADQCABBEBBfyABQXxqIgEgBUGwAWpqKAIAIgkgASAFQQhqaigCACIHRyAJIAdLGyIIRQ0BDAILC0F/QQAgARshCAsCQAJAIAhB/wFxDgIAAQULIAZFDQQgCkF/aiIBIANPDQIgASACai0AAEEBcUUNBAsgCiADSw0CIAIgCmpBACEBIAIhCAJAA0AgASAKRg0BIAFBAWohASAIQX9qIgggCmoiBy0AAEE5Rg0ACyAHIActAABBAWo6AAAgCiAKIAFrQQFqTQ0EIAdBAWpBMCABQX9qEK8CGgwECwJ/QTEgCkUNABogAkExOgAAQTAgCkEBRg0AGiACQQFqQTAgCkF/ahCvAhpBMAsgEkEQdEGAgARqQRB1IhIgBEEQdEEQdUwgCiADT3INAzoAACAKQQFqIQoMAwsgDUEoQaTYwAAQngEACyABIANB8K7AABCeAQALIAogA0GAr8AAEJkCAAsgCiADTQ0AIAogA0GQr8AAEJkCAAsgACASOwEIIAAgCjYCBCAAIAI2AgAgBUHQBmokAA8LIAFBKEGk2MAAEJkCAAsgBkEoQaTYwAAQmQIAC0G02MAAQRpBpNjAABC+AQALziACD38BfiMAQRBrIggkAAJAAkACQAJAAkACQCAAQfUBTwRAQQhBCBD/ASEBQRRBCBD/ASEDQRBBCBD/ASEFQQBBEEEIEP8BQQJ0ayIEQYCAfCAFIAEgA2pqa0F3cUF9aiIBIAQgAUkbIABNDQYgAEEEakEIEP8BIQRBqOTAACgCAEUNBUEAIARrIQICf0EAIARBgAJJDQAaQR8gBEH///8HSw0AGiAEQQYgBEEIdmciAGt2QQFxIABBAXRrQT5qCyIHQQJ0QYzhwABqKAIAIgENAUEAIQBBACEDDAILQRAgAEEEakEQQQgQ/wFBe2ogAEsbQQgQ/wEhBAJAAkACQAJ/AkACQEGk5MAAKAIAIgUgBEEDdiIBdiIAQQNxRQRAIARBrOTAACgCAE0NCyAADQFBqOTAACgCACIARQ0LIAAQkgJoQQJ0QYzhwABqKAIAIgEQpwIgBGshAiABEPkBIgAEQANAIAAQpwIgBGsiAyACIAMgAkkiAxshAiAAIAEgAxshASAAEPkBIgANAAsLIAEiACAEELECIQUgABBhIAJBEEEIEP8BSQ0FIAAgBBCUAiAFIAIQ+wFBrOTAACgCACIGRQ0EIAZBeHFBnOLAAGohAUG05MAAKAIAIQNBpOTAACgCACIHQQEgBkEDdnQiBnFFDQIgASgCCAwDCwJAIABBf3NBAXEgAWoiAEEDdCICQaTiwABqKAIAIgFBCGooAgAiAyACQZziwABqIgJHBEAgAyACNgIMIAIgAzYCCAwBC0Gk5MAAIAVBfiAAd3E2AgALIAEgAEEDdBDzASABELMCIQIMCwsCQEEBIAFBH3EiAXQQggIgACABdHEQkgJoIgBBA3QiAkGk4sAAaigCACIDQQhqKAIAIgEgAkGc4sAAaiICRwRAIAEgAjYCDCACIAE2AggMAQtBpOTAAEGk5MAAKAIAQX4gAHdxNgIACyADIAQQlAIgAyAEELECIgUgAEEDdCAEayIEEPsBQazkwAAoAgAiAgRAIAJBeHFBnOLAAGohAEG05MAAKAIAIQECf0Gk5MAAKAIAIgZBASACQQN2dCICcQRAIAAoAggMAQtBpOTAACACIAZyNgIAIAALIQIgACABNgIIIAIgATYCDCABIAA2AgwgASACNgIIC0G05MAAIAU2AgBBrOTAACAENgIAIAMQswIhAgwKC0Gk5MAAIAYgB3I2AgAgAQshBiABIAM2AgggBiADNgIMIAMgATYCDCADIAY2AggLQbTkwAAgBTYCAEGs5MAAIAI2AgAMAQsgACACIARqEPMBCyAAELMCIgINBQwECyAEIAcQ+gF0IQZBACEAQQAhAwNAAkAgARCnAiIFIARJDQAgBSAEayIFIAJPDQAgASEDIAUiAg0AQQAhAiABIQAMAwsgAUEUaigCACIFIAAgBSABIAZBHXZBBHFqQRBqKAIAIgFHGyAAIAUbIQAgBkEBdCEGIAENAAsLIAAgA3JFBEBBACEDQQEgB3QQggJBqOTAACgCAHEiAEUNAyAAEJICaEECdEGM4cAAaigCACEACyAARQ0BCwNAIAAgAyAAEKcCIgEgBE8gASAEayIBIAJJcSIFGyEDIAEgAiAFGyECIAAQ+QEiAA0ACwsgA0UNAEGs5MAAKAIAIgAgBE9BACACIAAgBGtPGw0AIAMiACAEELECIQEgABBhAkAgAkEQQQgQ/wFPBEAgACAEEJQCIAEgAhD7ASACQYACTwRAIAEgAhBjDAILIAJBeHFBnOLAAGohAwJ/QaTkwAAoAgAiBUEBIAJBA3Z0IgJxBEAgAygCCAwBC0Gk5MAAIAIgBXI2AgAgAwshAiADIAE2AgggAiABNgIMIAEgAzYCDCABIAI2AggMAQsgACACIARqEPMBCyAAELMCIgINAQsCQAJAAkACQAJAAkACQEGs5MAAKAIAIgEgBEkEQEGw5MAAKAIAIgAgBEsNAiAIQQhBCBD/ASAEakEUQQgQ/wFqQRBBCBD/AWpBgIAEEP8BENEBIAgoAgAiAw0BQQAhAgwIC0G05MAAKAIAIQAgASAEayIBQRBBCBD/AUkEQEG05MAAQQA2AgBBrOTAACgCACEBQazkwABBADYCACAAIAEQ8wEgABCzAiECDAgLIAAgBBCxAiEDQazkwAAgATYCAEG05MAAIAM2AgAgAyABEPsBIAAgBBCUAiAAELMCIQIMBwsgCCgCCCEGQbzkwAAgCCgCBCIFQbzkwAAoAgBqIgA2AgBBwOTAAEHA5MAAKAIAIgEgACABIABLGzYCAAJAAkACQEG45MAAKAIABEBBjOLAACEAA0AgABCVAiADRg0CIAAoAggiAA0ACwwCC0HI5MAAKAIAIgBFIAMgAElyDQUMBwsgABCpAg0AIAAQqgIgBkcNACAAIgEoAgAiAkG45MAAKAIAIgdNBH8gAiABKAIEaiAHSwVBAAsNAQtByOTAAEHI5MAAKAIAIgAgAyADIABLGzYCACADIAVqIQFBjOLAACEAAkACQANAIAEgACgCAEcEQCAAKAIIIgANAQwCCwsgABCpAg0AIAAQqgIgBkYNAQtBuOTAACgCACECQYziwAAhAAJAA0AgACgCACACTQRAIAAQlQIgAksNAgsgACgCCCIADQALQQAhAAsgAiAAEJUCIg9BFEEIEP8BIg5rQWlqIgAQswIiAUEIEP8BIAFrIABqIgAgAEEQQQgQ/wEgAmpJGyIHELMCIQEgByAOELECIQBBCEEIEP8BIQlBFEEIEP8BIQtBEEEIEP8BIQxBuOTAACADIAMQswIiCkEIEP8BIAprIg0QsQIiCjYCAEGw5MAAIAVBCGogDCAJIAtqaiANamsiCTYCACAKIAlBAXI2AgRBCEEIEP8BIQtBFEEIEP8BIQxBEEEIEP8BIQ0gCiAJELECIA0gDCALQQhramo2AgRBxOTAAEGAgIABNgIAIAcgDhCUAkGM4sAAKQIAIRAgAUEIakGU4sAAKQIANwIAIAEgEDcCAEGY4sAAIAY2AgBBkOLAACAFNgIAQYziwAAgAzYCAEGU4sAAIAE2AgADQCAAQQQQsQIgAEEHNgIEIgBBBGogD0kNAAsgAiAHRg0HIAIgByACayIAIAIgABCxAhDqASAAQYACTwRAIAIgABBjDAgLIABBeHFBnOLAAGohAQJ/QaTkwAAoAgAiA0EBIABBA3Z0IgBxBEAgASgCCAwBC0Gk5MAAIAAgA3I2AgAgAQshACABIAI2AgggACACNgIMIAIgATYCDCACIAA2AggMBwsgACgCACECIAAgAzYCACAAIAAoAgQgBWo2AgQgAxCzAiIAQQgQ/wEhASACELMCIgVBCBD/ASEGIAMgASAAa2oiAyAEELECIQEgAyAEEJQCIAIgBiAFa2oiACADIARqayEEQbjkwAAoAgAgAEcEQCAAQbTkwAAoAgBGDQMgACgCBEEDcUEBRw0FAkAgABCnAiICQYACTwRAIAAQYQwBCyAAQQxqKAIAIgUgAEEIaigCACIGRwRAIAYgBTYCDCAFIAY2AggMAQtBpOTAAEGk5MAAKAIAQX4gAkEDdndxNgIACyACIARqIQQgACACELECIQAMBQtBuOTAACABNgIAQbDkwABBsOTAACgCACAEaiIANgIAIAEgAEEBcjYCBCADELMCIQIMBwsgACAAKAIEIAVqNgIEQbjkwAAoAgBBsOTAACgCACAFahCoAQwFC0Gw5MAAIAAgBGsiATYCAEG45MAAQbjkwAAoAgAiACAEELECIgM2AgAgAyABQQFyNgIEIAAgBBCUAiAAELMCIQIMBQtBtOTAACABNgIAQazkwABBrOTAACgCACAEaiIANgIAIAEgABD7ASADELMCIQIMBAtByOTAACADNgIADAELIAEgBCAAEOoBIARBgAJPBEAgASAEEGMgAxCzAiECDAMLIARBeHFBnOLAAGohAAJ/QaTkwAAoAgAiAkEBIARBA3Z0IgVxBEAgACgCCAwBC0Gk5MAAIAIgBXI2AgAgAAshAiAAIAE2AgggAiABNgIMIAEgADYCDCABIAI2AgggAxCzAiECDAILQczkwABB/x82AgBBmOLAACAGNgIAQZDiwAAgBTYCAEGM4sAAIAM2AgBBqOLAAEGc4sAANgIAQbDiwABBpOLAADYCAEGk4sAAQZziwAA2AgBBuOLAAEGs4sAANgIAQaziwABBpOLAADYCAEHA4sAAQbTiwAA2AgBBtOLAAEGs4sAANgIAQcjiwABBvOLAADYCAEG84sAAQbTiwAA2AgBB0OLAAEHE4sAANgIAQcTiwABBvOLAADYCAEHY4sAAQcziwAA2AgBBzOLAAEHE4sAANgIAQeDiwABB1OLAADYCAEHU4sAAQcziwAA2AgBB6OLAAEHc4sAANgIAQdziwABB1OLAADYCAEHk4sAAQdziwAA2AgBB8OLAAEHk4sAANgIAQeziwABB5OLAADYCAEH44sAAQeziwAA2AgBB9OLAAEHs4sAANgIAQYDjwABB9OLAADYCAEH84sAAQfTiwAA2AgBBiOPAAEH84sAANgIAQYTjwABB/OLAADYCAEGQ48AAQYTjwAA2AgBBjOPAAEGE48AANgIAQZjjwABBjOPAADYCAEGU48AAQYzjwAA2AgBBoOPAAEGU48AANgIAQZzjwABBlOPAADYCAEGo48AAQZzjwAA2AgBBsOPAAEGk48AANgIAQaTjwABBnOPAADYCAEG448AAQazjwAA2AgBBrOPAAEGk48AANgIAQcDjwABBtOPAADYCAEG048AAQazjwAA2AgBByOPAAEG848AANgIAQbzjwABBtOPAADYCAEHQ48AAQcTjwAA2AgBBxOPAAEG848AANgIAQdjjwABBzOPAADYCAEHM48AAQcTjwAA2AgBB4OPAAEHU48AANgIAQdTjwABBzOPAADYCAEHo48AAQdzjwAA2AgBB3OPAAEHU48AANgIAQfDjwABB5OPAADYCAEHk48AAQdzjwAA2AgBB+OPAAEHs48AANgIAQezjwABB5OPAADYCAEGA5MAAQfTjwAA2AgBB9OPAAEHs48AANgIAQYjkwABB/OPAADYCAEH848AAQfTjwAA2AgBBkOTAAEGE5MAANgIAQYTkwABB/OPAADYCAEGY5MAAQYzkwAA2AgBBjOTAAEGE5MAANgIAQaDkwABBlOTAADYCAEGU5MAAQYzkwAA2AgBBnOTAAEGU5MAANgIAQQhBCBD/ASEBQRRBCBD/ASECQRBBCBD/ASEGQbjkwAAgAyADELMCIgBBCBD/ASAAayIDELECIgA2AgBBsOTAACAFQQhqIAYgASACamogA2prIgE2AgAgACABQQFyNgIEQQhBCBD/ASEDQRRBCBD/ASECQRBBCBD/ASEFIAAgARCxAiAFIAIgA0EIa2pqNgIEQcTkwABBgICAATYCAAtBACECQbDkwAAoAgAiACAETQ0AQbDkwAAgACAEayIBNgIAQbjkwABBuOTAACgCACIAIAQQ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GGoQswEMDgsgAiAAKAIENgIIIAJBJGpBAjYCACACQSxqQQE2AgAgAkHAksAANgIgIAJBADYCGCACQR02AhQgAiACQRBqNgIoIAIgAkEIajYCECABIAJBGGoQswEMDQsgAiAAKQIENwMIIAJBJGpBATYCACACQSxqQQE2AgAgAkGsksAANgIgIAJBADYCGCACQR42AhQgAiACQRBqNgIoIAIgAkEIajYCECABIAJBGGoQswEMDAsgAkEkakEBNgIAIAJBLGpBADYCACACQZySwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCwsgAkEkakEBNgIAIAJBLGpBADYCACACQYiSwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCgsgAkEkakEBNgIAIAJBLGpBADYCACACQfSRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCQsgAkEkakEBNgIAIAJBLGpBADYCACACQeCRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCAsgAkEkakEBNgIAIAJBLGpBADYCACACQciRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBwsgAkEkakEBNgIAIAJBLGpBADYCACACQbiRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBgsgAkEkakEBNgIAIAJBLGpBADYCACACQayRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBQsgAkEkakEBNgIAIAJBLGpBADYCACACQaCRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBAsgAkEkakEBNgIAIAJBLGpBADYCACACQYyRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMAwsgAkEkakEBNgIAIAJBLGpBADYCACACQfSQwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMAgsgAkEkakEBNgIAIAJBLGpBADYCACACQdyQwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMAQsgASAAKAIEIABBCGooAgAQgwILIAJBMGokAAvwBwEIfwJAAkAgAEEDakF8cSICIABrIgUgAUsgBUEE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AiQgA0EgagwCCyADQQM2AiggA0Gev8AANgIkIANBAjsBICADQSBqDAELIANBAzYCKCADQaG/wAA2AiQgA0ECOwEgIANBIGoLIQQgA0HcAGogBTYCACADIAQ2AlggAyAGNgJUIAMgAjYCUCAAIANB0ABqED4gA0GAAWokAAvlBAEOfyMAQfAAayICJAAgASgCCCIFQQFxIAEoAgQhCSABKAIAIQogASgCDCEEIAVBAk8EQCAFQQF2IQ0gAkEgaiELA0AgAkEQaiAKIAZBBXQiA2oiAUEgaiIHIAEQaSACQTBqIAcgARBpIAJB0ABqIAAgAkEwahA/IAJByABqIgcgAkHoAGopAwA3AwAgAkFAayIOIAJB4ABqKQMANwMAIAJBOGoiDyACQdgAaikDADcDACACIAIpA1A3AzAgAyAJaiEDQQAhAQNAIAJBMGogAWoiCCAILQAAIAEgBGotAABzOgAAIAFBAWoiAUEQRw0AC0EAIQEDQCABIAJqQUBrIgggCC0AACACQRBqIAFqLQAAczoAACABQQFqIgFBEEcNAAsgAyACKQMwNwAAIANBGGogBykDADcAACADQRBqIA4pAwA3AAAgA0EIaiAPKQMANwAAIARBCGogC0EIaikAADcAACAEIAspAAA3AAAgDSAGQQFqIgZHDQALCwRAIAkgBUH+////AHFBBHQiAWohAyACIAEgCmoiAUEQaiIFIAEQpAEgAkEQaiAFIAEQpAEgAkEwahDjASACQThqIAJBGGoiASkDADcDACACIAIpAxA3AzAgAkHQAGogACACQTBqED8gASACQdgAaikDADcDACACIAIpA1A3AxBBACEBA0AgAkEQaiABaiIAIAAtAAAgASAEai0AAHM6AAAgAUEBaiIBQRBHDQALIAMgAikDEDcAACADQQhqIAJBGGopAwA3AAAgBCACKQMANwAAIARBCGogAkEIaikDADcAAAsgAkHwAGokAAv8BAEIfyMAQRBrIgckAAJ/IAIoAgQiBARAQQEgACACKAIAIAQgASgCDBEBAA0BGgtBACACQQxqKAIAIgNFDQAaIAIoAggiBCADQQxsaiEIIAdBDGohCQNAAkACQAJAAkAgBC8BAEEBaw4CAgEACwJAIAQoAgQiAkHBAE8EQCABQQxqKAIAIQMDQEEBIABB8MTAAEHAACADEQEADQcaIAJBQGoiAkHAAEsNAAsMAQsgAkUNAwsCQCACQT9NBEAgAkHwxMAAaiwAAEG/f0wNAQsgAEHwxMAAIAIgAUEMaigCABEBAEUNA0EBDAULQfDEwABBwABBACACQbDFwAAQhwIACyAAIAQoAgQgBEEIaigCACABQQxqKAIAEQEARQ0BQQEMAwsgBC8BAiECIAlBADoAACAHQQA2AggCQAJAAn8CQAJAAkAgBC8BAEEBaw4CAQACCyAEQQhqDAILIAQvAQIiA0HoB08EQEEEQQUgA0GQzgBJGyEFDAMLQQEhBSADQQpJDQJBAkEDIANB5ABJGyEFDAILIARBBGoLKAIAIgVBBkkEQCAFDQFBACEFDAILIAVBBUHgxMAAEJkCAAsgB0EIaiAFaiEGAkAgBUEBcUUEQCACIQMMAQsgBkF/aiIGIAIgAkEKbiIDQQpsa0EwcjoAAAsgBUEBRg0AIAZBfmohAgNAIAIgA0H//wNxIgZBCm4iCkEKcEEwcjoAACACQQFqIAMgCkEKbGtBMHI6AAAgBkHkAG4hAyACIAdBCGpGIAJBfmohAkUNAAsLIAAgB0EIaiAFIAFBDGooAgARAQBFDQBBAQwCCyAEQQxqIgQgCEcNAAtBAAsgB0EQaiQAC5YFAQ5/IAAgACgCHCIDQRZ3Qb/+/PkDcSADQR53QcCBg4Z8cXIgA3MiBCAAKAIQIgJBFndBv/78+QNxIAJBHndBwIGDhnxxciACcyILIAAoAhQiAXMiBnMiBSADIAAoAhgiA0EWd0G//vz5A3EgA0Eed0HAgYOGfHFyIANzIgdzIghzIAVBDHdBj568+ABxIAVBFHdB8OHDh39xcnM2AhwgACAEIAAoAgAiBXMiDCADIAEgAUEWd0G//vz5A3EgAUEed0HAgYOGfHFycyIJcyIDIAVBFndBv/78+QNxIAVBHndBwIGDhnxxciAFcyIFcyIBcyABQQx3QY+evPgAcSABQRR3QfDhw4d/cXJzNgIAIAAgByACIAAoAgwiAUEWd0G//vz5A3EgAUEed0HAgYOGfHFyIAFzIgdzIARzIgpzIgIgA3MgAkEMd0GPnrz4AHEgAkEUd0Hw4cOHf3FyczYCGCAAIAYgASAAKAIIIgJBFndBv/78+QNxIAJBHndBwIGDhnxxciACcyIGcyAEcyINIAggCXNzIgFzIAFBDHdBj568+ABxIAFBFHdB8OHDh39xcnM2AhQgACAKIAMgCHMiCSALIAIgACgCBCIBQRZ3Qb/+/PkDcSABQR53QcCBg4Z8cXIgAXMiCnMiDnNzIgJzIAJBDHdBj568+ABxIAJBFHdB8OHDh39xcnM2AhAgACABIAVzIARzIgIgAyAHc3MiBCANcyAEQQx3QY+evPgAcSAEQRR3QfDhw4d/cXJzNgIMIAAgBiAIcyAMcyIEIA5zIARBDHdBj568+ABxIARBFHdB8OHDh39xcnM2AgggACAJIApzIgAgAnMgAEEMd0GPnrz4AHEgAEEUd0Hw4cOHf3FyczYCBAuGBQEOfyAAIAAoAhwiA0ESd0GDhowYcSADQRp3Qfz582dxciADcyIEIAAoAhAiAkESd0GDhowYcSACQRp3Qfz582dxciACcyILIAAoAhQiAXMiBnMiBSADIAAoAhgiA0ESd0GDhowYcSADQRp3Qfz582dxciADcyIHcyIIcyAFQQx3QY+evPgAcSAFQRR3QfDhw4d/cXJzNgIcIAAgBCAAKAIAIgVzIgwgAyABIAFBEndBg4aMGHEgAUEad0H8+fNncXJzIglzIgMgBUESd0GDhowYcSAFQRp3Qfz582dxciAFcyIFcyIBcyABQQx3QY+evPgAcSABQRR3QfDhw4d/cXJzNgIAIAAgByACIAAoAgwiAUESd0GDhowYcSABQRp3Qfz582dxciABcyIHcyAEcyIKcyICIANzIAJBDHdBj568+ABxIAJBFHdB8OHDh39xcnM2AhggACAGIAEgACgCCCICQRJ3QYOGjBhxIAJBGndB/PnzZ3FyIAJzIgZzIARzIg0gCCAJc3MiAXMgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyczYCFCAAIAogAyAIcyIJIAsgAiAAKAIEIgFBEndBg4aMGHEgAUEad0H8+fNncXIgAXMiCnMiDnNzIgJzIAJBDHdBj568+ABxIAJBFHdB8OHDh39xcnM2AhAgACABIAVzIARzIgIgAyAHc3MiBCANcyAEQQx3QY+evPgAcSAEQRR3QfDhw4d/cXJzNgIMIAAgBiAIcyAMcyIEIA5zIARBDHdBj568+ABxIARBFHdB8OHDh39xcnM2AgggACAJIApzIgAgAnMgAEEMd0GPnrz4AHEgAEEUd0Hw4cOHf3FyczYCBAuhBAEbfyAAIAAoAhwiASAAKAIEIgJzIgkgACgCECIEIAAoAggiBnMiC3MiDiAAKAIMcyIFIAZzIgMgDnEiEiAFIAAoAhgiDHMiB3MgAyAAKAIAIgVzIhYgAiAMIAAoAhRzIgggBXMiAnMiDyABIAZzIgxzIhdxcyADIAhzIg0gByABIARzIhBzIgZzIhggC3EgBiAQcSIKcyIHcyITIAIgD3EgBiAIcyIIIAlycyAHcyIHcSIRIAwgDXEgCnMiCiASIAIgBHMiEiAFcSAMcyANc3NzIgRzIAogBSAGcyIKIAEgAnMiGXEgCCAJQX9zcSABc3NzIgEgB3NxIhQgEXMgAXEiFSAHcyIHIANxIhogBSABIBRzIgVxcyIUIAQgASARcyIDIAQgE3MiBHFzIgEgCnFzIAMgFXMgAXEgBHMiAyABcyIRIAhxIgpzIhMgAyAPcXMgCyADIAUgB3MiBHMiCyABIAVzIghzIg9xIAggEHEiEHMiFXMiGyAKIAIgA3FzIgMgDyAYcXMiAiALIA1xIAkgEXEiCSAUc3NzIg1zNgIEIAAgCSAbczYCACAAIBUgBCAXcXMiCSAHIA5xcyIOIAIgBiAIcXMiAnM2AhwgACANIAEgGXFzIgYgCyAMcSAQcyACc3M2AhQgACAEIBZxIBpzIANzIA5zIgE2AhAgACAJIAUgEnFzIAZzNgIIIAAgASACczYCGCAAIAEgE3M2AgwL+QQBCn8jAEEwayIDJAAgA0EDOgAoIANCgICAgIAENwMgIANBADYCGCADQQA2AhAgAyABNgIMIAMgADYCCAJ/AkACQCACKAIAIgpFBEAgAkEUaigCACIARQ0BIAIoAhAhASAAQQN0IQUgAEF/akH/////AXFBAWohByACKAIIIQADQCAAQQRqKAIAIgQEQCADKAIIIAAoAgAgBCADKAIMKAIMEQEADQQLIAEoAgAgA0EIaiABQQRqKAIAEQAADQMgAUEIaiEBIABBCGohACAFQXhqIgUNAAsMAQsgAigCBCIARQ0AIABBBXQhCyAAQX9qQf///z9xQQFqIQcgAigCCCEAA0AgAEEEaigCACIBBEAgAygCCCAAKAIAIAEgAygCDCgCDBEBAA0DCyADIAUgCmoiBEEcai0AADoAKCADIARBFGopAgA3AyAgBEEQaigCACEGIAIoAhAhCEEAIQlBACEBAkACQAJAIARBDGooAgBBAWsOAgACAQsgBkEDdCAIaiIMQQRqKAIAQcUARw0BIAwoAgAoAgAhBgtBASEBCyADIAY2AhQgAyABNgIQIARBCGooAgAhAQJAAkACQCAEQQRqKAIAQQFrDgIAAgELIAFBA3QgCGoiBkEEaigCAEHFAEcNASAGKAIAKAIAIQELQQEhCQsgAyABNgIcIAMgCTYCGCAIIAQoAgBBA3RqIgEoAgAgA0EIaiABKAIEEQAADQIgAEEIaiEAIAsgBUEgaiIFRw0ACwsgByACQQxqKAIASQRAIAMoAgggAigCCCAHQQN0aiIAKAIAIAAoAgQgAygCDCgCDBEBAA0BC0EADAELQQELIANBMGokAAvkBAEJfyMAQRBrIgQkAAJAAkACfwJAIAAoAghBAUYEQCAAQQxqKAIAIQcgBEEMaiABQQxqKAIAIgU2AgAgBCABKAIIIgI2AgggBCABKAIEIgM2AgQgBCABKAIAIgE2AgAgAC0AICEJIAAoAhwhCiAALQAYQQhxDQEgCiEIIAkhBiADDAILIAAoAgAgAEEEaigCACABEDkhAgwDCyAAKAIAIAEgAyAAKAIEKAIMEQEADQFBASEGIABBAToAIEEwIQggAEEwNgIcIARBADYCBCAEQbCnwAA2AgBBACAHIANrIgMgAyAHSxshB0EACyEBIAUEQCAFQQxsIQMDQAJ/AkACQAJAIAIvAQBBAWsOAgIBAAsgAkEEaigCAAwCCyACQQhqKAIADAELIAJBAmovAQAiBUHoB08EQEEEQQUgBUGQzgBJGwwBC0EBIAVBCkkNABpBAkEDIAVB5ABJGwshBSACQQxqIQIgASAFaiEBIANBdGoiAw0ACwsCfwJAIAcgAUsEQCAHIAFrIgEhAwJAAkACQCAGQQNxIgJBAWsOAwABAAILQQAhAyABIQIMAQsgAUEBdiECIAFBAWpBAXYhAwsgAkEBaiECIABBBGooAgAhASAAKAIAIQYDQCACQX9qIgJFDQIgBiAIIAEoAhARAABFDQALDAMLIAAoAgAgAEEEaigCACAEEDkMAQsgBiABIAQQOQ0BQQAhAgNAQQAgAiADRg0BGiACQQFqIQIgBiAIIAEoAhARAABFDQALIAJBf2ogA0kLIQIgACAJOgAgIAAgCjYCHAwBC0EBIQILIARBEGokACACC8EEAQh/IwBBIGsiAyQAIANBGGpCADcDACADQRBqQgA3AwAgA0EIakIANwMAIANCADcDACADIAIgAkEQahBMIAFBwAJqIQRBACECA0AgAiADaiIGIAYoAgAgAiAEaigCAHM2AgAgAkEEaiICQSBHDQALIAMQNUEAIQIDQCACIANqIgQgBCgCACIEQQR2IARzQYCegPgAcSIGIARzIAZBBHRzNgIAIAJBBGoiAkEgRw0ACyABQcABaiEGIAFB4AFqIQggAUGAAmohCSABQaACaiEKQcgAIQQCQANAQQAhAgNAIAIgA2oiBSAFKAIAIAIgCmooAgBzNgIAIAJBBGoiAkEgRw0ACyADEDogAxA1IARBCEYEQEEAIQIDQCACIANqIgQgBCgCACABIAJqKAIAczYCACACQQRqIgJBIEcNAAsgACADEEsgA0EgaiQADwtBACECA0AgAiADaiIFIAUoAgAgAiAJaigCAHM2AgAgAkEEaiICQSBHDQALIARBcGohBSADEFIgAxA1QQAhAgNAIAIgA2oiByAHKAIAIAIgCGooAgBzNgIAIAJBBGoiAkEgRw0ACyADEDsgAxA1IAUgBEFoaiIHSQ0BQQAhAgNAIAIgA2oiBSAFKAIAIAIgBmooAgBzNgIAIAJBBGoiAkEgRw0ACyAGQYB/aiEGIAhBgH9qIQggCUGAf2ohCSAKQYB/aiEKIAMQRiADEDUgBEFgaiIEQXhHDQALQXggB0HAoMAAEJoCAAsgByAFQdCgwAAQmgIAC6gEAgV/AXwjAEGQAWsiAyQAAkAgACgCACIEQYEBEAMEQEEHIQRBACEADAELQQFBAiAEEAQiBUEBRhtBACAFGyIFQQJHBEBBACEAQQAhBAwBCyADQShqIAQQBSADQRhqIAMoAiggAysDMBD9ASADKAIYBEBBAyEEIAMrAyAhCEEAIQAMAQsgA0EQaiAEEAYCQAJAIAMoAhAiBUUEQCADQQA2AlwMAQsgAygCFCEEIAMgBTYCfCADIAQ2AoABIAMgBDYCeCADQQhqIANB+ABqEN0BIANB2ABqIAMoAgggAygCDBD+ASADKAJcRQ0AIANBQGsgA0HgAGooAgAiBTYCACADIAMpA1g3AzhBASEAQQUhBCADKAI8IQcMAQsgA0HoAGogABCPAQJ/IAMoAmwiBgRAIANB0ABqIANB8ABqKAIAIgU2AgAgAyADKQNoNwNIIAMoAkwhB0EGDAELIANBETYCTCADIAA2AkggA0EBNgKMASADQQE2AoQBIANBxI7AADYCgAEgA0EANgJ4IAMgA0HIAGo2AogBIANBOGogA0H4AGoQRyADKAJAIQUgAygCPCEHQRELIQQgBkUhACAGQQBHIQYgAygCXEUNACADQdgAahD4AQsgBa2/IQgLIAMgCDkDgAEgAyAHNgJ8IAMgBToAeSADIAQ6AHggA0H4AGogASACEKcBIAYEQCADQcgAahD4AQsgAARAIANBOGoQ+AELIANBkAFqJAAL1QQBBH8gACABELECIQICQAJAAkAgABCoAg0AIAAoAgAhAwJAIAAQkwJFBEAgASADaiEBIAAgAxCyAiIAQbTkwAAoAgBHDQEgAigCBEEDcUEDRw0CQazkwAAgATYCACAAIAEgAhDqAQ8LIAEgA2pBEGohAAwCCyADQYACTwRAIAAQYQwBCyAAQQxqKAIAIgQgAEEIaigCACIFRwRAIAUgBDYCDCAEIAU2AggMAQtBpOTAAEGk5MAAKAIAQX4gA0EDdndxNgIACyACEI0CBEAgACABIAIQ6gEMAgsCQEG45MAAKAIAIAJHBEAgAkG05MAAKAIARw0BQbTkwAAgADYCAEGs5MAAQazkwAAoAgAgAWoiATYCACAAIAEQ+wEPC0G45MAAIAA2AgBBsOTAAEGw5MAAKAIAIAFqIgE2AgAgACABQQFyNgIEIABBtOTAACgCAEcNAUGs5MAAQQA2AgBBtOTAAEEANgIADwsgAhCnAiIDIAFqIQECQCADQYACTwRAIAIQYQwBCyACQQxqKAIAIgQgAkEIaigCACICRwRAIAIgBDYCDCAEIAI2AggMAQtBpOTAAEGk5MAAKAIAQX4gA0EDdndxNgIACyAAIAEQ+wEgAEG05MAAKAIARw0BQazkwAAgATYCAAsPCyABQYACTwRAIAAgARBjDwsgAUF4cUGc4sAAaiECAn9BpOTAACgCACIDQQEgAUEDdnQiAXEEQCACKAIIDAELQaTkwAAgASADcjYCACACCyEBIAIgADYCCCABIAA2AgwgACACNgIMIAAgATYCCAv6AwEJfyMAQTBrIgEkACAAKAIEIQUgACgCCCEDIAFBADYCGCABQoCAgIAQNwMQAkACQAJAAkACQCADQeADTQRAIAFBIGogBSADEEggAUEQahD4ASABQRhqIAFBKGooAgA2AgAgASABKQMgNwMQDAELIAMgA0HgA24iBEHgA2xrIAQhBgNAIAJB4ANqIgggA0sNAiABQSBqIAIgBWpB4AMQSCABKAIkIQkgAUEQaiABKAIoIgIQ7QEgASgCFCABKAIYaiAJIAIQrgIaIAFBADYCKCABIAIgASgCGGo2AhggAUEgahD4ASAIIQIgBkF/aiIGDQALRQ0AIAAoAggiAiAEQeADbCIESQ0CIAIgA0sNAyABQSBqIAQgBWogAiAEaxBIIAEoAiQhBCABQRBqIAEoAigiAhDtASABKAIUIAEoAhhqIAQgAhCuAhogAUEANgIoIAEgAiABKAIYajYCGCABQSBqEPgBCyABQQA7ASAgAUEAOgAiIAFBCGogAUEgaiABQRBqEG8gASgCDCECIAEoAggNAyABQRBqEPgBIAAQ+AEgAUEwaiQAIAIPCyACQeADaiADQbyDwAAQmQIACyAEIAJBzIPAABCaAgALIAIgA0HMg8AAEJkCAAsgASACNgIgQYCAwABBKyABQSBqQayAwABB3IPAABCYAQALxQQBB38gACAAKAIcIgRBFndBv/78+QNxIARBHndBwIGDhnxxciICIAAoAhgiAUEWd0G//vz5A3EgAUEed0HAgYOGfHFyIgMgAXMiAXMgAiAEcyIEQQx3QY+evPgAcSAEQRR3QfDhw4d/cXJzNgIcIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAMgACgCFCIBQRZ3Qb/+/PkDcSABQR53QcCBg4Z8cXIiAiABcyIBc3M2AhggACABQQx3QY+evPgAcSABQRR3QfDhw4d/cXIgAiAAKAIQIgFBFndBv/78+QNxIAFBHndBwIGDhnxxciIDIAFzIgFzczYCFCAAIAFBDHdBj568+ABxIAFBFHdB8OHDh39xciADIAAoAgwiAUEWd0G//vz5A3EgAUEed0HAgYOGfHFyIgUgAXMiAXMgBHNzNgIQIAAgACgCCCICQRZ3Qb/+/PkDcSACQR53QcCBg4Z8cXIiBiAAKAIEIgNBFndBv/78+QNxIANBHndBwIGDhnxxciIHIANzIgNzIAIgBnMiAkEMd0GPnrz4AHEgAkEUd0Hw4cOHf3FyczYCCCAAIAFBDHdBj568+ABxIAFBFHdB8OHDh39xciACIAVzcyAEczYCDCAAIANBDHdBj568+ABxIANBFHdB8OHDh39xciAHIAAoAgAiAUEWd0G//vz5A3EgAUEed0HAgYOGfHFyIgIgAXMiAXNzIARzNgIEIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAJzIARzNgIAC7UEAQd/IAAgACgCHCIEQRJ3QYOGjBhxIARBGndB/PnzZ3FyIgIgACgCGCIBQRJ3QYOGjBhxIAFBGndB/PnzZ3FyIgMgAXMiAXMgAiAEcyIEQQx3QY+evPgAcSAEQRR3QfDhw4d/cXJzNgIcIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAMgACgCFCIBQRJ3QYOGjBhxIAFBGndB/PnzZ3FyIgIgAXMiAXNzNgIYIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAIgACgCECIBQRJ3QYOGjBhxIAFBGndB/PnzZ3FyIgMgAXMiAXNzNgIUIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAMgACgCDCIBQRJ3QYOGjBhxIAFBGndB/PnzZ3FyIgUgAXMiAXMgBHNzNgIQIAAgACgCCCICQRJ3QYOGjBhxIAJBGndB/PnzZ3FyIgYgACgCBCIDQRJ3QYOGjBhxIANBGndB/PnzZ3FyIgcgA3MiA3MgAiAGcyICQQx3QY+evPgAcSACQRR3QfDhw4d/cXJzNgIIIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAIgBXNzIARzNgIMIAAgA0EMd0GPnrz4AHEgA0EUd0Hw4cOHf3FyIAcgACgCACIBQRJ3QYOGjBhxIAFBGndB/PnzZ3FyIgIgAXMiAXNzIARzNgIEIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAJzIARzNgIAC4wEAQd/IwBBIGsiAyQAIANBGGpCADcDACADQRBqQgA3AwAgA0EIakIANwMAIANCADcDACADIAIgAkEQahBMQQAhAgNAIAIgA2oiBCAEKAIAIAEgAmooAgBzNgIAIAJBBGoiAkEgRw0ACyABQYABaiEEIAFB4ABqIQYgAUFAayEHIAFBIGohCEEIIQkDQCADEDwgAxBDQQAhAgNAIAIgA2oiBSAFKAIAIAIgCGooAgBzNgIAIAJBBGoiAkEgRw0ACyAJQcgARgRAQQAhAgNAIAIgA2oiBCAEKAIAIgRBBHYgBHNBgJ6A+ABxIgYgBHMgBkEEdHM2AgAgAkEEaiICQSBHDQALIAFBwAJqIQEgAxA8QQAhAgNAIAIgA2oiBCAEKAIAIAEgAmooAgBzNgIAIAJBBGoiAkEgRw0ACyAAIAMQSyADQSBqJAAFIAMQPCADEE9BACECA0AgAiADaiIFIAUoAgAgAiAHaigCAHM2AgAgAkEEaiICQSBHDQALIAMQPCADEERBACECA0AgAiADaiIFIAUoAgAgAiAGaigCAHM2AgAgAkEEaiICQSBHDQALIAMQPCADEGdBACECA0AgAiADaiIFIAUoAgAgAiAEaigCAHM2AgAgAkEEaiICQSBHDQALIARBgAFqIQQgBkGAAWohBiAHQYABaiEHIAhBgAFqIQggCUEgaiEJDAELCwv2AwENfyAAIAAoAhwiAUEUd0GPnrz4AHEgAUEcd0Hw4cOHf3FyIAFzIgUgACgCECIDQRR3QY+evPgAcSADQRx3QfDhw4d/cXIgA3MiBiAAKAIUIgJzIgdzIgQgASAAKAIYIgFBFHdBj568+ABxIAFBHHdB8OHDh39xciABcyIIcyIJcyAEQRB3czYCHCAAIAUgACgCACIEcyIMIAEgAiACQRR3QY+evPgAcSACQRx3QfDhw4d/cXJzIgpzIgEgBEEUd0GPnrz4AHEgBEEcd0Hw4cOHf3FyIARzIgRzIgJzIAJBEHdzNgIAIAAgCCADIAAoAgwiAkEUd0GPnrz4AHEgAkEcd0Hw4cOHf3FyIAJzIghzIAVzIgtzIgMgAXMgA0EQd3M2AhggACAHIAIgACgCCCIDQRR3QY+evPgAcSADQRx3QfDhw4d/cXIgA3MiB3MgBXMiDSAJIApzcyICcyACQRB3czYCFCAAIAsgASAJcyIKIAYgAyAAKAIEIgJBFHdBj568+ABxIAJBHHdB8OHDh39xciACcyILcyIDc3MiBnMgBkEQd3M2AhAgACACIARzIAVzIgUgASAIc3MiASANcyABQRB3czYCDCAAIAcgCXMgDHMiASADcyABQRB3czYCCCAAIAogC3MiACAFcyAAQRB3czYCBAvtAwEGfyMAQTBrIgUkAAJAAkACQAJAAkAgAUEMaigCACIDBEAgASgCCCEHIANBf2pB/////wFxIgNBAWoiBkEHcSEEAn8gA0EHSQRAQQAhAyAHDAELIAdBPGohAiAGQfj///8DcSEGQQAhAwNAIAIoAgAgAkF4aigCACACQXBqKAIAIAJBaGooAgAgAkFgaigCACACQVhqKAIAIAJBUGooAgAgAkFIaigCACADampqampqamohAyACQUBrIQIgBkF4aiIGDQALIAJBRGoLIQIgBARAIAJBBGohAgNAIAIoAgAgA2ohAyACQQhqIQIgBEF/aiIEDQALCyABQRRqKAIADQEgAyEEDAMLQQAhAyABQRRqKAIADQFBASECDAQLIANBD0sNACAHKAIERQ0CCyADIANqIgQgA0kNAQsgBEUNAAJAIARBf0oEQCAEQQEQiAIiAkUNASAEIQMMAwsQygEACyAEQQEQrAIAC0EBIQJBACEDCyAAQQA2AgggACACNgIEIAAgAzYCACAFIAA2AgwgBUEgaiABQRBqKQIANwMAIAVBGGogAUEIaikCADcDACAFIAEpAgA3AxAgBUEMakGYpcAAIAVBEGoQPQRAQYimwABBMyAFQShqQbymwABB5KbAABCYAQALIAVBMGokAAuHBAEDfyMAQaAKayIDJAAgA0EQakEAQYAEEK8CGgJAIAJBgQRJBEAgA0EQaiACIAEgAkHcicAAEOkBIANBEDYC8AkgA0GQBGoQLCADQfgGakHUgMAAKQAANwMAIANBzIDAACkAADcD8AYgA0GAB2ogA0GQBGpB8AIQrgIaIANBkApqIgRCADcAACAEQQhqQgA3AAAgAkFwcSIEQY98akH+e00NASADQZAKaiABIARqIAJBD3EiBRCuAhogA0GQCmogBWpBECAFayIFIAUQrwIaIANB+AlqIANBmApqKQMANwMAIAMgAykDkAo3A/AJIAMgA0EQaiAEaiIENgKMCiADIAJBBHYiAjYCiAogAyABNgKACiADIANBEGo2AoQKIAMgA0HgCWoiBTYCnAogAyACNgKYCiADIAE2ApAKIAMgA0EQajYClAogA0GAB2ogA0GQCmoQbSADIAU2ApgKIAMgBDYClAogAyADQfAJajYCkAogA0GAB2ogA0GQCmoQdyADKAKECiICRQ0BIANBCGogAygCiAogAygCjApBAEdqQQR0IgFBABC3ASADKAIIIQQgACADKAIMIgU2AgQgACAENgIAIAUgAiABEK4CGiAAIAE2AgggA0GgCmokAA8LIAJBgARBzInAABCZAgALQYKJwABBKyADQYAHakGwicAAQfyJwAAQmAEAC7sDAQV/IwBBgAFrIgUkAAJAAkACQAJAIAEoAhgiAkEQcUUEQCACQSBxDQEgAEEBIAEQWyECDAQLQYABIQIgBUGAAWohBAJAAkADQCACRQRAQQAhAgwDCyAEQX9qQTBB1wAgAKciA0EPcSIGQQpJGyAGajoAACAAQhBaBEAgBEF+aiIEQTBB1wAgA0H/AXEiA0GgAUkbIANBBHZqOgAAIAJBfmohAiAAQoACVCAAQgiIIQBFDQEMAgsLIAJBf2ohAgsgAkGBAU8NAgsgAUEBQeDCwABBAiACIAVqQYABIAJrEDIhAgwDC0GAASECIAVBgAFqIQQCQAJAA0AgAkUEQEEAIQIMAwsgBEF/akEwQTcgAKciA0EPcSIGQQpJGyAGajoAACAAQhBaBEAgBEF+aiIEQTBBNyADQf8BcSIDQaABSRsgA0EEdmo6AAAgAkF+aiECIABCgAJUIABCCIghAEUNAQwCCwsgAkF/aiECCyACQYEBTw0CCyABQQFB4MLAAEECIAIgBWpBgAEgAmsQMiECDAILIAJBgAFB0MLAABCYAgALIAJBgAFB0MLAABCYAgALIAVBgAFqJAAgAguRAwELfyMAQTBrIgMkACADQoGAgICgATcDICADIAI2AhwgA0EANgIYIAMgAjYCFCADIAE2AhAgAyACNgIMIANBADYCCCAAKAIEIQggACgCACEJIAAoAgghCgJ/A0ACQCAGRQRAAkAgBCACSw0AA0AgASAEaiEGAn8gAiAEayIFQQhPBEAgAyAGIAUQXSADKAIEIQAgAygCAAwBC0EAIQBBACAFRQ0AGgNAQQEgACAGai0AAEEKRg0BGiAFIABBAWoiAEcNAAsgBSEAQQALQQFHBEAgAiEEDAILIAAgBGoiAEEBaiEEAkAgACACTw0AIAAgAWotAABBCkcNAEEAIQYgBCEFIAQhAAwECyAEIAJNDQALC0EBIQYgAiIAIAciBUcNAQtBAAwCCwJAIAotAAAEQCAJQYzCwABBBCAIKAIMEQEADQELIAEgB2ohCyAAIAdrIQwgCiAAIAdHBH8gCyAMakF/ai0AAEEKRgUgDQs6AAAgBSEHIAkgCyAMIAgoAgwRAQBFDQELC0EBCyADQTBqJAALrQMBDn8gAEEcaiABKAIcIgIgASgCGCIEQQF2c0HVqtWqBXEiByACcyICIAEoAhQiBSABKAIQIgZBAXZzQdWq1aoFcSIIIAVzIgVBAnZzQbPmzJkDcSIJIAJzIgIgASgCDCIDIAEoAggiC0EBdnNB1arVqgVxIgwgA3MiAyABKAIEIgogASgCACIBQQF2c0HVqtWqBXEiDSAKcyIKQQJ2c0Gz5syZA3EiDiADcyIDQQR2c0GPnrz4AHEiDyACczYAACAAQRhqIAlBAnQgBXMiAiAOQQJ0IApzIgVBBHZzQY+evPgAcSIJIAJzNgAAIABBFGogD0EEdCADczYAACAAIAQgB0EBdHMiAiAGIAhBAXRzIgRBAnZzQbPmzJkDcSIHIAJzIgIgCyAMQQF0cyIGIAEgDUEBdHMiAUECdnNBs+bMmQNxIgggBnMiBkEEdnNBj568+ABxIgMgAnM2AAwgACAJQQR0IAVzNgAQIAAgB0ECdCAEcyICIAhBAnQgAXMiAUEEdnNBj568+ABxIgQgAnM2AAggACADQQR0IAZzNgAEIAAgBEEEdCABczYAAAukAwENfyAAIAIoAAwiAyABKAAMIgRBAXZzQdWq1aoFcSIIIANzIgMgAigACCIFIAEoAAgiBkEBdnNB1arVqgVxIgkgBXMiBUECdnNBs+bMmQNxIgsgA3MiAyACKAAEIgcgASgABCIKQQF2c0HVqtWqBXEiDCAHcyIHIAIoAAAiAiABKAAAIgFBAXZzQdWq1aoFcSINIAJzIgJBAnZzQbPmzJkDcSIOIAdzIgdBBHZzQY+evPgAcSIPIANzNgIcIAAgBCAIQQF0cyIDIAYgCUEBdHMiBEECdnNBs+bMmQNxIgggA3MiAyAKIAxBAXRzIgYgASANQQF0cyIBQQJ2c0Gz5syZA3EiCSAGcyIGQQR2c0GPnrz4AHEiCiADczYCGCAAIAtBAnQgBXMiAyAOQQJ0IAJzIgJBBHZzQY+evPgAcSIFIANzNgIUIAAgD0EEdCAHczYCDCAAIAhBAnQgBHMiAyAJQQJ0IAFzIgFBBHZzQY+evPgAcSIEIANzNgIQIAAgCkEEdCAGczYCCCAAIAVBBHQgAnM2AgQgACAEQQR0IAFzNgIAC9QCAQF/IwBB8ABrIgYkACAGIAE2AgwgBiAANgIIIAYgAzYCFCAGIAI2AhAgBkHdwMAANgIYIAZBAjYCHAJAIAQoAghFBEAgBkHMAGpBxwA2AgAgBkHEAGpBxwA2AgAgBkHkAGpBBDYCACAGQewAakEDNgIAIAZBwMHAADYCYCAGQQA2AlggBkHGADYCPCAGIAZBOGo2AmgMAQsgBkEwaiAEQRBqKQIANwMAIAZBKGogBEEIaikCADcDACAGIAQpAgA3AyAgBkHkAGpBBDYCACAGQewAakEENgIAIAZB1ABqQS42AgAgBkHMAGpBxwA2AgAgBkHEAGpBxwA2AgAgBkGcwcAANgJgIAZBADYCWCAGQcYANgI8IAYgBkE4ajYCaCAGIAZBIGo2AlALIAYgBkEQajYCSCAGIAZBCGo2AkAgBiAGQRhqNgI4IAZB2ABqIAUQ1QEAC48DAQV/AkACQAJAAkAgAUEJTwRAQRBBCBD/ASABSw0BDAILIAAQISEEDAILQRBBCBD/ASEBC0EIQQgQ/wEhA0EUQQgQ/wEhAkEQQQgQ/wEhBUEAQRBBCBD/AUECdGsiBkGAgHwgBSACIANqamtBd3FBfWoiAyAGIANJGyABayAATQ0AIAFBECAAQQRqQRBBCBD/AUF7aiAASxtBCBD/ASIDakEQQQgQ/wFqQXxqECEiAkUNACACELQCIQACQCABQX9qIgQgAnFFBEAgACEBDAELIAIgBGpBACABa3EQtAIhAkEQQQgQ/wEhBCAAEKcCIAJBACABIAIgAGsgBEsbaiIBIABrIgJrIQQgABCTAkUEQCABIAQQ4QEgACACEOEBIAAgAhBBDAELIAAoAgAhACABIAQ2AgQgASAAIAJqNgIACyABEJMCDQEgARCnAiICQRBBCBD/ASADak0NASABIAMQsQIhACABIAMQ4QEgACACIANrIgMQ4QEgACADEEEMAQsgBA8LIAEQswIgARCTAhoLpQMBCH8gACAAKAIcIgNBFHdBj568+ABxIANBHHdB8OHDh39xciICIAAoAhgiAUEUd0GPnrz4AHEgAUEcd0Hw4cOHf3FyIgQgAXMiBnMgAiADcyIDQRB3czYCHCAAIAQgACgCFCIBQRR3QY+evPgAcSABQRx3QfDhw4d/cXIiAiABcyIFcyAGQRB3czYCGCAAIAIgACgCECIBQRR3QY+evPgAcSABQRx3QfDhw4d/cXIiBCABcyIGcyAFQRB3czYCFCAAIAAoAggiAUEUd0GPnrz4AHEgAUEcd0Hw4cOHf3FyIgUgACgCBCICQRR3QY+evPgAcSACQRx3QfDhw4d/cXIiByACcyICcyABIAVzIgVBEHdzNgIIIAAgBCAAKAIMIgFBFHdBj568+ABxIAFBHHdB8OHDh39xciIIIAFzIgFzIAZBEHdzIANzNgIQIAAgBSAIcyABQRB3cyADczYCDCAAIAcgACgCACIBQRR3QY+evPgAcSABQRx3QfDhw4d/cXIiBCABcyIBcyACQRB3cyADczYCBCAAIAFBEHcgBHMgA3M2AgAL8wIBBH8CQAJAAkACQAJAAkACQCAHIAhWBEAgByAIfSAIWA0HIAcgBn0gBlZBACAHIAZCAYZ9IAhCAYZaGw0BIAYgCFYEQCAHIAYgCH0iBn0gBlgNAwsMBwsMBgsgAyACSw0BDAQLIAMgAksNASABIANqIAEhCwJAA0AgAyAJRg0BIAlBAWohCSALQX9qIgsgA2oiCi0AAEE5Rg0ACyAKIAotAABBAWo6AAAgAyAJa0EBaiADTw0DIApBAWpBMCAJQX9qEK8CGgwDCwJ/QTEgA0UNABogAUExOgAAQTAgA0EBRg0AGiABQQFqQTAgA0F/ahCvAhpBMAsgBEEQdEGAgARqQRB1IgQgBUEQdEEQdUwgAyACT3INAjoAACADQQFqIQMMAgsgAyACQcy9wAAQmQIACyADIAJB3L3AABCZAgALIAMgAk0NACADIAJB7L3AABCZAgALIAAgBDsBCCAAIAM2AgQgACABNgIADwsgAEEANgIAC5cDAQJ/AkACQAJAIAIEQCABLQAAQTFJDQECQCADQRB0QRB1IgdBAU4EQCAFIAE2AgRBAiEGIAVBAjsBACADQf//A3EiAyACTw0BIAVBAjsBGCAFQQI7AQwgBSADNgIIIAVBIGogAiADayICNgIAIAVBHGogASADajYCACAFQRRqQQE2AgAgBUEQakGav8AANgIAQQMhBiACIARPDQUgBCACayEEDAQLIAVBAjsBGCAFQQA7AQwgBUECNgIIIAVBmL/AADYCBCAFQQI7AQAgBUEgaiACNgIAIAVBHGogATYCACAFQRBqQQAgB2siATYCAEEDIQYgBCACTQ0EIAQgAmsiAiABTQ0EIAIgB2ohBAwDCyAFQQA7AQwgBSACNgIIIAVBEGogAyACazYCACAERQ0DIAVBAjsBGCAFQSBqQQE2AgAgBUEcakGav8AANgIADAILQfy7wABBIUGgvsAAEL4BAAtBsL7AAEEhQdS+wAAQvgEACyAFQQA7ASQgBUEoaiAENgIAQQQhBgsgACAGNgIEIAAgBTYCAAvWAgENfyAAIAAoAhwiA0EYdyADcyIFIAAoAhAiAkEYdyACcyIHIAAoAhQiBHMiCHMiBiAAKAIYIgFBGHcgAXMiCSADcyIDcyAGQRB3czYCHCAAIAUgACgCACIGcyIMIAEgBCAEQRh3cyIKcyIEIAZBGHcgBnMiBnMiAXMgAUEQd3M2AgAgACAJIAIgACgCDCIBQRh3IAFzIglzIAVzIgtzIgIgBHMgAkEQd3M2AhggACAIIAEgACgCCCICQRh3IAJzIghzIAVzIg0gAyAKc3MiAXMgAUEQd3M2AhQgACALIAMgBHMiCiAHIAIgACgCBCIBQRh3IAFzIgtzIgJzcyIHcyAHQRB3czYCECAAIAEgBnMgBXMiBSAEIAlzcyIEIA1zIARBEHdzNgIMIAAgAyAIcyAMcyIDIAJzIANBEHdzNgIIIAAgCiALcyIAIAVzIABBEHdzNgIEC8sDAQZ/QQEhAgJAIAEoAgAiBkEnIAEoAgQoAhAiBxEAAA0AQYKAxAAhAkEwIQECQAJ/AkACQAJAAkACQAJAAkAgACgCACIADigIAQEBAQEBAQECBAEBAwEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEFAAsgAEHcAEYNBAsgABBVRQ0EIABBAXJnQQJ2QQdzDAULQfQAIQEMBQtB8gAhAQwEC0HuACEBDAMLIAAhAQwCC0GBgMQAIQIgABB1BEAgACEBDAILIABBAXJnQQJ2QQdzCyEBIAAhAgtBBSEDA0AgAyEFIAIhBEGBgMQAIQJB3AAhAAJAAkACQAJAAkACQCAEQYCAvH9qQQMgBEH//8MASxtBAWsOAwEFAAILQQAhA0H9ACEAIAQhAgJAAkACQCAFQf8BcUEBaw4FBwUAAQIEC0ECIQNB+wAhAAwFC0EDIQNB9QAhAAwEC0EEIQNB3AAhAAwDC0GAgMQAIQIgASIAQYCAxABHDQMLIAZBJyAHEQAAIQIMBAsgBUEBIAEbIQNBMEHXACAEIAFBAnR2QQ9xIgBBCkkbIABqIQAgAUF/akEAIAEbIQELCyAGIAAgBxEAAEUNAAtBAQ8LIAIL3wIBB39BASEJAkACQCACRQ0AIAEgAkEBdGohCiAAQYD+A3FBCHYhCyAAQf8BcSENA0AgAUECaiEMIAcgAS0AASICaiEIIAsgAS0AACIBRwRAIAEgC0sNAiAIIQcgDCIBIApGDQIMAQsCQAJAIAggB08EQCAIIARLDQEgAyAHaiEBA0AgAkUNAyACQX9qIQIgAS0AACABQQFqIQEgDUcNAAtBACEJDAULIAcgCEHAzMAAEJoCAAsgCCAEQcDMwAAQmQIACyAIIQcgDCIBIApHDQALCyAGRQ0AIAUgBmohAyAAQf//A3EhAQNAAkAgBUEBaiEAAn8gACAFLQAAIgJBGHRBGHUiBEEATg0AGiAAIANGDQEgBS0AASAEQf8AcUEIdHIhAiAFQQJqCyEFIAEgAmsiAUEASA0CIAlBAXMhCSADIAVHDQEMAgsLQZ28wABBK0HQzMAAEL4BAAsgCUEBcQvrAgEFfyAAQQt0IQRBISEDQSEhAgJAA0ACQAJAQX8gA0EBdiABaiIDQQJ0QfTZwABqKAIAQQt0IgUgBEcgBSAESRsiBUEBRgRAIAMhAgwBCyAFQf8BcUH/AUcNASADQQFqIQELIAIgAWshAyACIAFLDQEMAgsLIANBAWohAQsCfwJAAn8CQCABQSBNBEAgAUECdCIDQfTZwABqKAIAQRV2IQIgAUEgRw0BQdcFIQNBHwwCCyABQSFB1NnAABCeAQALIANB+NnAAGooAgBBFXYhAyABRQ0BIAFBf2oLQQJ0QfTZwABqKAIAQf///wBxDAELQQALIQECQCADIAJBf3NqRQ0AIAAgAWshBSACQdcFIAJB1wVLGyEEIANBf2ohAEEAIQEDQAJAIAIgBEcEQCABIAJB+NrAAGotAABqIgEgBU0NAQwDCyAEQdcFQeTZwAAQngEACyAAIAJBAWoiAkcNAAsgACECCyACQQFxC4YDAgV/An4jAEFAaiIFJABBASEHAkAgAC0ABA0AIAAtAAUhCCAAKAIAIgYoAhgiCUEEcUUEQCAGKAIAQZXCwABBl8LAACAIG0ECQQMgCBsgBigCBCgCDBEBAA0BIAYoAgAgASACIAYoAgQoAgwRAQANASAGKAIAQeDBwABBAiAGKAIEKAIMEQEADQEgAyAGIAQoAgwRAAAhBwwBCyAIRQRAIAYoAgBBkMLAAEEDIAYoAgQoAgwRAQANASAGKAIYIQkLIAVBAToAFyAFQfTBwAA2AhwgBSAGKQIANwMIIAUgBUEXajYCECAGKQIIIQogBikCECELIAUgBi0AIDoAOCAFIAYoAhw2AjQgBSAJNgIwIAUgCzcDKCAFIAo3AyAgBSAFQQhqNgIYIAVBCGogASACEEoNACAFQQhqQeDBwABBAhBKDQAgAyAFQRhqIAQoAgwRAAANACAFKAIYQZPCwABBAiAFKAIcKAIMEQEAIQcLIABBAToABSAAIAc6AAQgBUFAayQAIAAL2QIBAn8jAEEQayICJAAgACgCACEAAkACfwJAIAFBgAFPBEAgAkEANgIMIAFBgBBPDQEgAiABQT9xQYABcjoADSACIAFBBnZBwAFyOgAMQQIMAgsgACgCCCIDIAAoAgBGBH8gACADEMEBIAAoAggFIAMLIAAoAgRqIAE6AAAgACAAKAIIQQFqNgIIDAILIAFBgIAETwRAIAIgAUE/cUGAAXI6AA8gAiABQQZ2QT9xQYABcjoADiACIAFBDHZBP3FBgAFyOgANIAIgAUESdkEHcUHwAXI6AAxBBAwBCyACIAFBP3FBgAFyOgAOIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADUEDCyEBIAAoAgAgACgCCCIDayABSQR/IAAgAyABEMIBIAAoAggFIAMLIAAoAgRqIAJBDGogARCuAhogACAAKAIIIAFqNgIICyACQRBqJABBAAvTAgECfyMAQRBrIgIkACAAKAIAIQACQAJ/AkAgAUGAAU8EQCACQQA2AgwgAUGAEE8NASACIAFBP3FBgAFyOgANIAIgAUEGdkHAAXI6AAxBAgwCCyAAKAIIIgMgACgCAEYEQCAAIAMQfSAAKAIIIQMLIAAgA0EBajYCCCAAKAIEIANqIAE6AAAMAgsgAUGAgARPBEAgAiABQT9xQYABcjoADyACIAFBBnZBP3FBgAFyOgAOIAIgAUEMdkE/cUGAAXI6AA0gAiABQRJ2QQdxQfABcjoADEEEDAELIAIgAUE/cUGAAXI6AA4gAiABQQx2QeABcjoADCACIAFBBnZBP3FBgAFyOgANQQMLIQEgACgCACAAKAIIIgNrIAFJBEAgACADIAEQeyAAKAIIIQMLIAAoAgQgA2ogAkEMaiABEK4CGiAAIAEgA2o2AggLIAJBEGokAEEAC8oCAQJ/IwBBEGsiAiQAAkACfwJAIAFBgAFPBEAgAkEANgIMIAFBgBBPDQEgAiABQT9xQYABcjoADSACIAFBBnZBwAFyOgAMQQIMAgsgACgCCCIDIAAoAgBGBEAgACADEH4gACgCCCEDCyAAIANBAWo2AgggACgCBCADaiABOgAADAILIAFBgIAETwRAIAIgAUE/cUGAAXI6AA8gAiABQQZ2QT9xQYABcjoADiACIAFBDHZBP3FBgAFyOgANIAIgAUESdkEHcUHwAXI6AAxBBAwBCyACIAFBP3FBgAFyOgAOIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADUEDCyEBIAAoAgAgACgCCCIDayABSQRAIAAgAyABEHwgACgCCCEDCyAAKAIEIANqIAJBDGogARCuAhogACABIANqNgIICyACQRBqJAALsQIBB38CQCACQQ9NBEAgACEDDAELIABBACAAa0EDcSIGaiEEIAYEQCAAIQMgASEFA0AgAyAFLQAAOgAAIAVBAWohBSADQQFqIgMgBEkNAAsLIAQgAiAGayIIQXxxIgdqIQMCQCABIAZqIgZBA3EiAgRAIAdBAUgNASAGQXxxIgVBBGohAUEAIAJBA3QiCWtBGHEhAiAFKAIAIQUDQCAEIAUgCXYgASgCACIFIAJ0cjYCACABQQRqIQEgBEEEaiIEIANJDQALDAELIAdBAUgNACAGIQEDQCAEIAEoAgA2AgAgAUEEaiEBIARBBGoiBCADSQ0ACwsgCEEDcSECIAYgB2ohAQsgAgRAIAIgA2ohAgNAIAMgAS0AADoAACABQQFqIQEgA0EBaiIDIAJJDQALCyAAC8ACAgV/AX4jAEEwayIFJABBJyEDAkAgAEKQzgBUBEAgACEIDAELA0AgBUEJaiADaiIEQXxqIAAgAEKQzgCAIghCkM4Afn2nIgZB//8DcUHkAG4iB0EBdEHiwsAAai8AADsAACAEQX5qIAYgB0HkAGxrQf//A3FBAXRB4sLAAGovAAA7AAAgA0F8aiEDIABC/8HXL1YgCCEADQALCyAIpyIEQeMASwRAIANBfmoiAyAFQQlqaiAIpyIEIARB//8DcUHkAG4iBEHkAGxrQf//A3FBAXRB4sLAAGovAAA7AAALAkAgBEEKTwRAIANBfmoiAyAFQQlqaiAEQQF0QeLCwABqLwAAOwAADAELIANBf2oiAyAFQQlqaiAEQTBqOgAACyACIAFBsKfAAEEAIAVBCWogA2pBJyADaxAyIAVBMGokAAvYAgIDfwF+IwBBQGoiAiQAIAJBIGogAEEIaigCADYCACACIAApAgA3AxggAkEoaiACQRhqEG4CQAJAIAIoAigEQEEAIQAgAkEANgIQIAJCgICAgBA3AwgMAQsgAkEQaiACQTRqKAIAIgA2AgAgAiACKQIsNwMIIABFBEBBACEADAELIAJBGGogAigCDCAAEF4gAigCGCEDIAJBKGogAigCHCIEIAIoAiAiABAzIAIoAigEQCACKQIsIgVCgICAgPAfg0KAgICAIFINAgsgAiAANgIwIAIgBDYCLCACIAM2AiggASgCBCEDIAEoAgggAEYEfyAEIAMgABDAAUUFQQALIQAgAkEoahD4AQsgAkEIahD4ASABEPgBIAJBQGskACAADwsgAiAANgI4IAIgBDYCNCACIAM2AjAgAiAFNwMoQYCAwABBKyACQShqQbyAwABBrIPAABCYAQALsAIBBH8CQAJAAkACQAJAAkAgAUEDakF8cSIDIAFGDQAgAyABayIDIAIgAyACSRsiBEUNAEEAIQNBASEFA0AgASADai0AAEEKRg0GIAQgA0EBaiIDRw0ACyAEIAJBeGoiA0sNAgwBCyACQXhqIQNBACEECwNAAkAgASAEaiIFKAIAQYqUqNAAcyIGQX9zIAZB//37d2pxQYCBgoR4cQ0AIAVBBGooAgBBipSo0ABzIgVBf3MgBUH//ft3anFBgIGChHhxDQAgBEEIaiIEIANNDQELCyAEIAJLDQELQQAhBSACIARGDQEDQCABIARqLQAAQQpGBEAgBCEDQQEhBQwECyAEQQFqIgQgAkcNAAsMAQsgBCACQYzGwAAQmAIACyACIQMLIAAgAzYCBCAAIAU2AgALtgIBA38jAEGACmsiAyQAIANBEGpBAEGABBCvAhogAkGBBEkEQCADQRBqIAIgASACQZyKwAAQ6QEgA0EQNgKQBCADQZAEahAsIANB+AZqQdSAwAApAAA3AwAgA0HMgMAAKQAANwPwBiADQYAHaiADQZAEakHwAhCuAhogAyACQQ9xBH9BzIDAAAUgAyABNgLwCSADIANB4AlqNgL8CSADIAJBBHYiATYC+AkgAyADQRBqNgL0CSADQYAHaiADQfAJahA4IANBCGogA0EQaiABEJYBIAMo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QaHCwABBASADKAIEKAIMEQEADQMgAygCGCEFDAELQQEhBCADKAIAQZXCwABBAiADKAIEKAIMEQEARQ0BDAILQQEhBCACQQE6ABcgAkH0wcAANgIcIAIgAykCADcDCCACIAJBF2o2AhAgAykCCCEGIAMpAhAhByACIAMtACA6ADggAiADKAIcNgI0IAIgBTYCMCACIAc3AyggAiAGNwMgIAIgAkEIajYCGCABIAJBGGpBvKXAACgCABEAAA0BIAIoAhhBk8LAAEECIAIoAhwoAgwRAQAhBAwBCyABIANBvKXAACgCABEAACEECyAAQQE6AAUgACAEOgAEIAJBQGskAAv9AQEHfyMAQdAAayIDJAAgA0EANgIgIAEgAmsiCEEEdiIBQQIgAUECSRsiBgRAIAMhASAGIQcgAiEFA0AgA0EoaiAFQRBqIgkgBRCkASABQQhqIANBMGopAwA3AgAgASADKQMoNwIAIAMgAygCIEEBaiIENgIgIAFBEGohASAJIQUgB0F/aiIHDQALCyAIQSFPBEAgA0FAayACIAZBBHRqIgFBEGogARCkAQsgBEECTwRAIAAgAykDADcAACAAQRhqIANBGGopAwA3AAAgAEEQaiADQRBqKQMANwAAIABBCGogA0EIaikDADcAACADQdAAaiQADwsgBEECEJ0BAAuSAgEBfyMAQTBrIgMkACADIAI6ABQgAyABNgIQIANBCGpBAEEAELcBIANBADYCICADIAMpAwg3AxggA0EoaiADQRBqEJkBAkACQAJAIAMtAChFBEADQCADLQApRQ0CIAMtACohAiADKAIgIgEgAygCGEYEfyADQRhqIAEQwQEgAygCIAUgAQsgAygCHGogAjoAACADIAMoAiBBAWo2AiAgA0EoaiADQRBqEJkBIAMtAChFDQALCyAAQQA2AgQgACADKAIsNgIAIANBGGoQ+AEgAygCECICQYQBSQ0CDAELIAAgAykDGDcCACAAQQhqIANBIGooAgA2AgAgAygCECICQYMBTQ0BCyACEAALIANBMGokAAudAgEEfyMAQSBrIgIkABAQIQQgASgCACIDIAQQESEBIAJBEGoQ4gEgAigCFCABIAIoAhAiBRshAQJAAkACQAJAAkAgBUUEQCABEAtBAUYNASAAQQI6AAQgAUGEAUkNAwwCCyAAQQM6AAQgACABNgIADAILIAEgAxASIQMgAkEIahDiASACKAIMIAMgAigCCCIFGyEDAkACQCAFRQRAIAIgAzYCHCACQRxqENYBDQIgAEECOgAEIANBhAFJDQEgAxAADAELIABBAzoABCAAIAM2AgALIAFBhAFPDQEMAgsgAEEAOgAEIAAgAzYCACABQYQBTwRAIAEQAAsgBEGDAUsNAgwDCyABEAALIARBgwFNDQELIAQQAAsgAkEgaiQAC4wCAQR/IwBBQGoiAyQAIAFBA24iBEH/////A3EgBEchBiAEQQJ0IQUCQCABIARBA2xrIgRFBEAgBSEBDAELAkACQAJAIAJFBEBBAiEBIARBf2oOAgMCAQsgBiAFQQRqIgEgBUlyIQYMAwsgA0EUakEBNgIAIANBHGpBATYCACADQTRqQQE2AgAgA0E8akEANgIAIANBmJ7AADYCECADQQA2AgggA0EuNgIkIANBtJ7AADYCMCADQeydwAA2AjggA0EANgIoIAMgA0EgajYCGCADIANBKGo2AiAgA0EIakGcn8AAENUBAAtBAyEBCyABIAVyIQELIAAgATYCBCAAIAZBAXM2AgAgA0FAayQAC/0BAgh/An4jAEHQAGsiAiQAIAEoAggiBgRAIAEoAgwhBCABKAIEIQcgASgCACEIA0AgAiAIIAVBBHQiAWoiA0EQaiADEKQBIAEgB2ohA0EAIQEDQCABIAJqIgkgCS0AACABIARqLQAAczoAACABQQFqIgFBEEcNAAsgAkEQahDjASACQRhqIAJBCGoiASkDADcDACACIAIpAwA3AxAgAkEwaiAAIAJBEGoQRSABIAJBOGopAwAiCjcDACACIAIpAzAiCzcDACAEQQhqIAo3AAAgBCALNwAAIAMgCzcAACADQQhqIAo3AAAgBiAFQQFqIgVHDQALCyACQdAAaiQAC/sBAgV/AX4jAEEwayICJAAgASgCBCEEIAJBCGogASgCCCIFENgBIAIgAikDCDcDECACIAJBEGooAgQiA0EBELcBIAIgAzYCICACIAIoAgQiBjYCHCACIAIoAgA2AhggAkEoaiAEIAUgBiADIAIoAhAgAigCFBAiAkACQCADAn8gAi0AKEEERgRAIAIoAiwMAQsgAikDKCIHQv8Bg0IEUg0BIAdCIIinCyIDTwRAIAIgAzYCIAsgACACKQMYNwIEIABBADYCACAAQQxqIAJBIGooAgA2AgAMAQsgAEEBNgIAIAAgBzcCBCACQRhqEPgBCyABEPgBIAJBMGokAAuRAgEEfyMAQTBrIgMkACACKAIEIQQgAigCCCECEAohBiADQSBqIgUgATYCCCAFQQA2AgQgBSAGNgIAAn8CQAJAIAMoAigEQCADQRhqIANBKGooAgA2AgAgAyADKQMgNwMQA0AgAkUNAyACQX9qIQIgAyAENgIgIARBAWohBCADQQhqIANBEGogA0EgahC2ASADKAIIRQ0ACyADKAIMIQIgAygCECIBQYQBSQ0BIAEQAAwBCyADKAIgIQILQQEMAQsgA0EoaiADQRhqKAIANgIAIAMgAykDEDcDICADIANBIGooAgA2AgQgA0EANgIAIAMoAgQhAiADKAIACyEBIAAgAjYCBCAAIAE2AgAgA0EwaiQAC4sCAgN/AX4jAEEwayICJAAgASgCBEUEQCABKAIMIQMgAkEQaiIEQQA2AgAgAkKAgICAEDcDCCACIAJBCGo2AhQgAkEoaiADQRBqKQIANwMAIAJBIGogA0EIaikCADcDACACIAMpAgA3AxggAkEUakHkosAAIAJBGGoQPRogAUEIaiAEKAIANgIAIAEgAikDCDcCAAsgASkCACEFIAFCgICAgBA3AgAgAkEgaiIDIAFBCGoiASgCADYCACABQQA2AgAgAiAFNwMYQQxBBBCIAiIBRQRAQQxBBBCsAgALIAEgAikDGDcCACABQQhqIAMoAgA2AgAgAEHApMAANgIEIAAgATYCACACQTBqJAAL/gEBA38jAEEwayICJAAgAkEQaiABEKYBIAJBCGogAigCFCIDQYAgIANBgCBJG0EAIAIoAhAbQQAQtwEgAkEANgIgIAIgAikDCDcDGCACQShqIAEQlwECQAJAIAItAChFBEADQCACLQApRQ0CIAItACohBCACKAIgIgMgAigCGEYEfyACQRhqIAMQwQEgAigCIAUgAwsgAigCHGogBDoAACACIAIoAiBBAWo2AiAgAkEoaiABEJcBIAItAChFDQALCyAAQQA2AgQgACACKAIsNgIAIAJBGGoQ+AEMAQsgACACKQMYNwIAIABBCGogAkEgaigCADYCAAsgAkEwaiQAC+UBAQF/IwBBEGsiAiQAIAAoAgAgAkEANgIMIAJBDGoCfyABQYABTwRAIAFBgBBP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AXwjAEEgayICJAAgAkEQaiABKAIAEAUgAiACKAIQIAIrAxgQ/QECQCACKAIARQ0AIAIrAwghBSABKAIAEBZFDQAgBUQAAAAAAADgw2YhAUIAQv///////////wACfiAFmUQAAAAAAADgQ2MEQCAFsAwBC0KAgICAgICAgIB/C0KAgICAgICAgIB/IAEbIAVE////////30NkGyAFIAViGyEDQgEhBAsgACADNwMIIAAgBDcDACACQSBqJAALnQEBAX8jAEFAaiICJAAgAkIANwM4IAJBOGogACgCABAcIAJBFGpBAjYCACACQRxqQQE2AgAgAiACKAI8IgA2AjAgAiACKAI4NgIsIAIgADYCKCACQS02AiQgAkGAlcAANgIQIAJBADYCCCACIAJBKGo2AiAgAiACQSBqNgIYIAEgAkEIahCzASACKAIoBEAgAigCLBAoCyACQUBrJAALmwECAX8BfiMAQTBrIgIkACACQQhqIAEQjAECQAJAIAIoAghBAUYEQCACKQMQIgNCf1UNAQsgASACQShqQbyEwAAQQCEBIABBAToAACAAIAE2AgQMAQsgAAJ/IANCgAJaBEAgAkEBOgAYIAIgAzcDICAAIAJBGGogAkEoahCbATYCBEEBDAELIAAgAzwAAUEACzoAAAsgAkEwaiQAC6EBAQF/IwBBIGsiAiQAAkACQCABKAIAEBtFBEAgASgCABAVDQEgAEEANgIEDAILIAJBEGogARC9ASAAQQhqIAJBGGooAgA2AgAgACACKQMQNwIADAELIAIgASgCABAYNgIMIAJBEGogAkEMahC9ASAAQQhqIAJBGGooAgA2AgAgACACKQMQNwIAIAIoAgwiAEGEAUkNACAAEAALIAJBIGokAAuRAQEDfyMAQYABayIDJAAgAC0AACECQQAhAANAIAAgA2pB/wBqQTBBNyACQQ9xIgRBCkkbIARqOgAAIABBf2ohACACIgRBBHYhAiAEQQ9LDQALIABBgAFqIgJBgQFPBEAgAkGAAUHQwsAAEJgCAAsgAUEBQeDCwABBAiAAIANqQYABakEAIABrEDIgA0GAAWokAAuSAQEDfyMAQYABayIDJAAgAC0AACECQQAhAANAIAAgA2pB/wBqQTBB1wAgAkEPcSIEQQpJGyAEajoAACAAQX9qIQAgAiIEQQR2IQIgBEEPSw0ACyAAQYABaiICQYEBTwRAIAJBgAFB0MLAABCYAgALIAFBAUHgwsAAQQIgACADakGAAWpBACAAaxAyIANBgAFqJAALlAEBA38jAEEQayIFJAACQCABLQAABEBBAiEDDAELIAIoAgAQDSEDIAVBCGoQ4gEgBSgCDCECIAUoAggiBARAQQEhAyABQQE6AAAMAQsCfyACIAMgBBsiBBAOBEAgAUEBOgAAQQIMAQsgBBAPIQJBAAshAyAEQYQBSQ0AIAQQAAsgACACNgIEIAAgAzYCACAFQRBqJAALtQEBA38jAEEQayIBJAAgACgCACICQRRqKAIAIQMCQAJ/AkACQCACQQxqKAIADgIAAQMLIAMNAkEAIQJB/KLAAAwBCyADDQEgAigCCCIDKAIEIQIgAygCAAshAyABIAI2AgQgASADNgIAIAFB9KTAACAAKAIEIgEoAgggACgCCCABLQAQEIABAAsgAUEANgIEIAEgAjYCDCABQeCkwAAgACgCBCIBKAIIIAAoAgggAS0AEBCAAQALjAEBA38jAEGAAWsiAyQAIAAoAgAhAANAIAIgA2pB/wBqQTBB1wAgAEEPcSIEQQpJGyAEajoAACACQX9qIQIgAEEPSyAAQQR2IQANAAsgAkGAAWoiAEGBAU8EQCAAQYABQdDCwAAQmAIACyABQQFB4MLAAEECIAIgA2pBgAFqQQAgAmsQMiADQYABaiQAC4sBAQN/IwBBgAFrIgMkACAAKAIAIQADQCACIANqQf8AakEwQTcgAEEPcSIEQQpJGyAEajoAACACQX9qIQIgAEEPSyAAQQR2IQANAAsgAkGAAWoiAEGBAU8EQCAAQYABQdDCwAAQmAIACyABQQFB4MLAAEECIAIgA2pBgAFqQQAgAmsQMiADQYABaiQAC4UBAQR/AkAgAkUNACACQQR0IAFqQXBqQQAgAhsiBC0ADyIFQW9qQf8BcUHwAUkNAEEAIAVrIQMgBEEQaiEEAkADQCADQX9GDQEgAyAEaiEGIANBAWohAyAGLQAAIAVGDQALQQAhAwwBCyACQQR0IAVrIQYgASEDCyAAIAY2AgQgACADNgIAC5IBAQN/IwBBEGsiAiQAAkACQCABKAIIBEAgAiABEMkBIAIoAgANAQsgAEEAOwEADAELIAIoAgQhBEEBIQMgASABKAIMQQFqNgIMIAJBCGogBBDTAQJAIAItAAhFBEAgAEEBOgABIABBAmogAi0ACToAAEEAIQMMAQsgACACKAIMNgIECyAAIAM6AAALIAJBEGokAAuKAQEBfyMAQUBqIgUkACAFIAE2AgwgBSAANgIIIAUgAzYCFCAFIAI2AhAgBUEkakECNgIAIAVBLGpBAjYCACAFQTxqQccANgIAIAVB5MHAADYCICAFQQA2AhggBUHGADYCNCAFIAVBMGo2AiggBSAFQRBqNgI4IAUgBUEIajYCMCAFQRhqIAQQ1QEAC5IBAQR/IwBBEGsiAiQAIAIgARDNAUEAIQEgAigCBCEDAkACQAJAAkACQAJAIAIoAgBBAWsOAgACAQsgACADNgIEDAMLIAJBCGogAxDTASACLQAIDQEgAi0ACSEEQQEhBQsgACAFOgABIABBAmogBDoAAAwCCyAAIAIoAgw2AgQLQQEhAQsgACABOgAAIAJBEGokAAt/AgF/AX4jAEEgayIGJAAgAQRAIAYgASADIAQgBSACKAIQEQYAIAZBGGogBkEIaigCACIBNgIAIAYgBikDACIHNwMQIAenIAFLBEAgBkEQaiABEM4BIAYoAhghAQsgBigCFCECIAAgATYCBCAAIAI2AgAgBkEgaiQADwsQpQIAC3sBAX8jAEEwayICJAAgAkG8hMAANgIEIAIgATYCACACQRRqQQI2AgAgAkEcakECNgIAIAJBLGpBCDYCACACQfCFwAA2AhAgAkEANgIIIAJBCTYCJCACIAA2AiAgAiACQSBqNgIYIAIgAjYCKCACQQhqELsBIAJBMGokAAt6AQJ/IAFBB2ohAiAAIAFBAnRqIQBBICEBAkACQANAIAJB2ABPDQIgAkEIakHYAE8NASAAIAFqIgNBHGogA0F8aigCADYCACACQX9qIQIgAUF8aiIBDQALDwsgAkEIakHYAEGQocAAEJ4BAAsgAkHYAEGAocAAEJ4BAAt6AQF/IwBBMGsiAiQAIAIgATYCBCACIAA2AgAgAkEUakECNgIAIAJBHGpBAjYCACACQSxqQS82AgAgAkHgocAANgIQIAJBADYCCCACQS82AiQgAiACQSBqNgIYIAIgAkEEajYCKCACIAI2AiAgAkEIakHUosAAENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0GcwMAANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgAzYCKCADIANBBGo2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0HQxsAANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0HwxsAANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0Gkx8AANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakEDNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0H0x8AANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgAzYCKCADIANBBGo2AiAgA0EIaiACENUBAAtpAQF/IwBBMGsiAiQAIAIgATYCKCACIAA2AiQgAiABNgIgIAJBCGogAkEgahDdASACQRBqIAIoAgggAigCDBD+ASACQShqIAJBGGooAgA2AgAgAiACKQMQNwMgIAJBIGoQQiACQTBqJAALaAECfyMAQSBrIgMkACADQQA2AhgCQCABIAJrIgFBECABQRBJIgQbIgFFDQAgA0EIaiACIAEQrgIaIAQNACAAIAMpAwg3AAAgAEEIaiADQRBqKQMANwAAIANBIGokAA8LIAFBEBCdAQALcgEDfyMAQSBrIgIkAAJ/QQEgACABEF8NABogASgCBCEDIAEoAgAhBCACQQA2AhwgAkGwp8AANgIYIAJBATYCFCACQeC/wAA2AhAgAkEANgIIQQEgBCADIAJBCGoQPQ0AGiAAQQRqIAEQXwsgAkEgaiQAC2gBAn8jAEEgayICJAAgAkEYagJ/QQAgASgCCEUNABpBACABKAIEIgMgASgCAGsiASABIANLGwsiATYCACACQQE2AhQgAiABNgIQIAJBCGogAkEQahDUASAAIAIpAwg3AwAgAkEgaiQAC3IBAX8jAEEwayIDJAAgAyACNgIEIAMgATYCACADQRRqQQg2AgAgA0EJNgIMIAMgADYCCCADIAM2AhAgA0ECNgIsIANBAjYCJCADQaSQwAA2AiAgA0EANgIYIAMgA0EIajYCKCADQRhqEKsBIANBMGokAAt8AQN/IAAgABCzAiIAQQgQ/wEgAGsiAhCxAiEAQbDkwAAgASACayIBNgIAQbjkwAAgADYCACAAIAFBAXI2AgRBCEEIEP8BIQJBFEEIEP8BIQNBEEEIEP8BIQQgACABELECIAQgAyACQQhramo2AgRBxOTAAEGAgIABNgIAC3IAIwBBMGsiASQAQdDgwAAtAAAEQCABQRRqQQI2AgAgAUEcakEBNgIAIAFBzKPAADYCECABQQA2AgggAUEvNgIkIAEgADYCLCABIAFBIGo2AhggASABQSxqNgIgIAFBCGpB9KPAABDVAQALIAFBMGokAAthAQJ/IwBBEGsiAiQAIAAoAgAiAEEIaigCACEDIABBBGooAgAhACACIAEQ5QEgAwRAA0AgAiAANgIMIAIgAkEMahBoIABBAWohACADQX9qIgMNAAsLIAIQ4AEgAkEQaiQAC2gBAX8jAEFAaiIBJAAgAUEANgIIIAFCgICAgBA3AwAgAUEQaiABEOQBIAAgAUEQahCxAQRAQeSOwABBNyABQThqQZyPwABB+I/AABCYAQALIAEoAgQgASgCCBAHIAEQ+AEgAUFAayQAC2MBAX8jAEEgayIDJAAgAyABNgIEIAMgADYCACADQRhqIAJBEGopAgA3AwAgA0EQaiACQQhqKQIANwMAIAMgAikCADcDCCADQcTAwAAgA0EEakHEwMAAIANBCGpBgKjAABBNAAteACAAIAEgAiADECQhAAJAAkBBnYPAAC0AAAR/IAAgA0sNASABIAAgAmogAyAAaxC4AQVBAAsgAGogAEkNAQ8LIAAgA0HghsAAEJgCAAtB8IbAAEEqQZyHwAAQnAIAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrI7AACACQQhqED0gAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpB5KLAACACQQhqED0gAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBmKXAACACQQhqED0gAkEgaiQAC1MBAn8jAEEgayICJAAgASgCBCEDIAEoAgAgAkEYaiAAQRBqKQIANwMAIAJBEGogAEEIaikCADcDACACIAApAgA3AwggAyACQQhqED0gAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrMTAACACQQhqED0gAkEgaiQAC1MBAn8jAEEgayICJAAgACgCBCEDIAAoAgAgAkEYaiABQRBqKQIANwMAIAJBEGogAUEIaikCADcDACACIAEpAgA3AwggAyACQQhqED0gAkEgaiQAC1YBAX8jAEEgayICJAAgAiAANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrI7AACACQQhqED0gAkEgaiQAC1YBAX8jAEEgayICJAAgAiAANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrMTAACACQQhqED0gAkEgaiQAC3UBA38jAEEQayIDJAAgASgCBCEFIAEoAggaIANBCGoiBCACKAIALQAAuBABNgIEIARBADYCACADKAIMIQIgAygCCCIERQRAIAEoAgAgBSACEBMgASABKAIEQQFqNgIECyAAIAQ2AgAgACACNgIEIANBEGokAAtcAQF/AkAgAUUEQEEBIQIMAQsgAUEATgRAIAFBf3NBH3YhAwJ/IAJFBEAgASADEIgCDAELIAEgAxDbAQsiAg0BIAEgAxCsAgALEMoBAAsgACACNgIEIAAgATYCAAtWAQJ/AkAgAEEDcEEDc0EDcCIERQRADAELQQAhAANAIAAgAkcEQCAAIAFqQT06AAAgAEEBaiEDQQEhACADIARJDQEMAgsLIAIgAkGsn8AAEJ4BAAsgAwtKAQF/IwBBIGsiAiQAIAIgASgCBCABKAIIEEggAkEYaiACQQhqKAIANgIAIAIgAikDADcDECAAIAJBEGoQeCABEPgBIAJBIGokAAtOAQF/IwBBMGsiAiQAIAJBEGogARA2IAJBKGogAkEYaigCADYCACACIAIpAxA3AyAgAkEIaiACQSBqEN0BIAAgAikDCDcDACACQTBqJAALRgEBfyMAQSBrIgEkACABQRhqIABBEGopAgA3AwAgAUEQaiAAQQhqKQIANwMAIAEgACkCADcDCCABQQhqEKsBIAFBIGokAAtfAQN/IwBBEGsiASQAAkAgACgCDCICBEAgACgCCCIDRQ0BIAEgAjYCCCABIAA2AgQgASADNgIAIAEQ3wEAC0H8osAAQStBsKTAABC+AQALQfyiwABBK0GgpMAAEL4BAAtRAQR/IwBBEGsiAiQAIAJBCGogASgCACIDEBpBABC3ASACKAIIIQQgACACKAIMIgU2AgQgACAENgIAIAEgBRDHASAAIAMQGjYCCCACQRBqJAALUgEBfyMAQSBrIgMkACADQQxqQQE2AgAgA0EUakEANgIAIANBsKfAADYCECADQQA2AgAgAyABNgIcIAMgADYCGCADIANBGGo2AgggAyACENUBAAtTAQF/IwBBIGsiAiQAIAJBDGpBATYCACACQRRqQQE2AgAgAkG8wMAANgIIIAJBADYCACACQcYANgIcIAIgADYCGCACIAJBGGo2AhAgAiABENUBAAtDAQN/AkAgAkUNAANAIAAtAAAiBCABLQAAIgVGBEAgAEEBaiEAIAFBAWohASACQX9qIgINAQwCCwsgBCAFayEDCyADC0sBAX8jAEEQayICJAAgAkEIaiAAIAFBARCLAQJAIAIoAgwiAEGBgICAeEcEQCAARQ0BIAIoAgggABCsAgALIAJBEGokAA8LEMoBAAtLAQF/IwBBEGsiAyQAIANBCGogACABIAIQiwECQCADKAIMIgBBgYCAgHhHBEAgAEUNASADKAIIIAAQrAIACyADQRBqJAAPCxDKAQALNAEBfyMAQRBrIgIkACACIABBCGo2AgggAiAANgIMIAEgAkEIaiACQQxqEIYBIAJBEGokAAtKAQF/IAAoAgAiACgCACAAKAIIIgNrIAJJBH8gACADIAIQwgEgACgCCAUgAwsgACgCBGogASACEK4CGiAAIAAoAgggAmo2AghBAAtHAQF/IAAoAgAiACgCACAAKAIIIgNrIAJJBEAgACADIAIQeyAAKAIIIQMLIAAoAgQgA2ogASACEK4CGiAAIAIgA2o2AghBAAtHAQF/IAAoAgAiACgCACAAKAIIIgNrIAJJBEAgACADIAIQfCAAKAIIIQMLIAAoAgQgA2ogASACEK4CGiAAIAIgA2o2AghBAAtCAQN/EB4iAxAXIgQQGCECIARBhAFPBEAgBBAACyACIAAoAgAgARAZIAJBhAFPBEAgAhAACyADQYQBTwRAIAMQAAsLQwEBfyAAKAIAIAAoAggiA2sgAkkEfyAAIAMgAhDCASAAKAIIBSADCyAAKAIEaiABIAIQrgIaIAAgACgCCCACajYCCAtDAQF/An9BACABKAIAIgIgASgCBE8NABogASACQQFqNgIAIAEoAggoAgAgAhAIIQFBAQshAiAAIAE2AgQgACACNgIAC0oBAX8jAEEgayIAJAAgAEEUakEBNgIAIABBHGpBADYCACAAQfClwAA2AhAgAEHApcAANgIYIABBADYCCCAAQQhqQfilwAAQ1QEAC0YBAn8gASgCBCECIAEoAgAhA0EIQQQQiAIiAUUEQEEIQQQQrAIACyABIAI2AgQgASADNgIAIABB0KTAADYCBCAAIAE2AgALOwIBfwF8IAEoAhhBAXEhAiAAKwMAIQMgASgCEEEBRgRAIAEgAyACIAFBFGooAgAQLg8LIAEgAyACEDcLOwEBfyMAQRBrIgIkACACQQhqIAFBBGogARCSASACKAIMIQEgACACKAIINgIAIAAgATYCBCACQRBqJAALPAEBfyMAQRBrIgIkACACQQhqIAAgARCCASACKAIMIgBBgYCAgHhHBEAgAigCCCAAEKwCAAsgAkEQaiQACzsBAX8jAEEQayICJAAgAkEIaiAAIAEQdiACKAIMIgBBgYCAgHhHBEAgAigCCCAAEKwCAAsgAkEQaiQACzsBAX8gAUEHaiICIAFJBEBB+JnAAEEzQaCbwAAQnAIACyAAIAJBA3Y2AgAgACABQQNqQQJ2QQNsNgIECzkBAX8gAUEQdkAAIQIgAEEANgIIIABBACABQYCAfHEgAkF/RiIBGzYCBCAAQQAgAkEQdCABGzYCAAs5AAJAAn8gAkGAgMQARwRAQQEgACACIAEoAhARAAANARoLIAMNAUEACw8LIAAgAyAEIAEoAgwRAQALNwEBfyMAQRBrIgIkACACIAE2AgwgACACQQxqEI4BIAIoAgwiAEGEAU8EQCAAEAALIAJBEGokAAs0AQF/An9BACABKAIEQQFHDQAaIAFBCGooAgAiAiABKAIARgshASAAIAI2AgQgACABNgIACz8BAX8jAEEgayICJAAgAkEBOgAYIAIgATYCFCACIAA2AhAgAkGswMAANgIMIAJBsKfAADYCCCACQQhqELwBAAswAQF/AkAgACgCACIAEAJBAUcNACAAEAwiABALQQFGIQEgAEGEAUkNACAAEAALIAELMwACQCAAQfz///8HSw0AIABFBEBBBA8LIAAgAEH9////B0lBAnQQiAIiAEUNACAADwsACzYBAX8jAEEQayICJAAgAkEIaiABENABIAIoAgwhASAAIAIoAgg2AgAgACABNgIEIAJBEGokAAslAQF/IwBBEGsiAiQAIAIgADYCDCABIAJBDGoQhAEgAkEQaiQACzIAIAAoAgAhACABEI8CRQRAIAEQkAJFBEAgACABEJsCDwsgACABEJUBDwsgACABEJQBCyYAAkAgACABEE4iAUUNACABELQCEJMCDQAgAUEAIAAQrwIaCyABCzYAIAAoAgAhACABEI8CRQRAIAEQkAJFBEAgADEAAEEBIAEQWw8LIAAgARCQAQ8LIAAgARCRAQsyAQF/IAAgASgCACABKAIIIgJLBH8gASACEM8BIAEoAggFIAILNgIEIAAgASgCBDYCAAsuAQF/IAEoAgAiAgRAIABBATYCCCAAIAI2AgQgACABKAIENgIADwsgAEEANgIICy0BAX8jAEEQayIBJAAgAUEIaiAAQQhqKAIANgIAIAEgACkCADcDACABEJMBAAsyAQF/QQEhASAALQAEBH8gAQUgACgCACIAKAIAQbTCwABBASAAQQRqKAIAKAIMEQEACwsnACAAIAAoAgRBAXEgAXJBAnI2AgQgACABaiIAIAAoAgRBAXI2AgQLOgECf0HU4MAALQAAIQFB1ODAAEEAOgAAQdjgwAAoAgAhAkHY4MAAQQA2AgAgACACNgIEIAAgATYCAAsnACAAQgA3AAAgAEEYakIANwAAIABBEGpCADcAACAAQQhqQgA3AAALNAAgAEEDOgAgIABCgICAgIAENwIYIABBADYCECAAQQA2AgggAEHMjsAANgIEIAAgATYCAAsyAQF/IAEoAgBBosLAAEEBIAEoAgQoAgwRAQAhAiAAQQA6AAUgACACOgAEIAAgATYCAAsgAQF/AkAgAEEEaigCACIBRQ0AIAAoAgBFDQAgARAoCwsmAQF/IwBBEGsiAyQAIAMgATYCDCADIAA2AgggA0EIaiACEL8BAAsjAAJAIAFB/P///wdNBEAgACABQQQgAhCAAiIADQELAAsgAAsfACABIANGBEAgACACIAEQrgIaDwsgASADIAQQogEACyMAIAIgAigCBEF+cTYCBCAAIAFBAXI2AgQgACABaiABNgIACx4AIABFBEAQpQIACyAAIAIgAyAEIAUgASgCEBEKAAsfAQJ+IAApAwAiAiACQj+HIgOFIAN9IAJCf1UgARBbCyABAX8gACgCACAAKAIIIgJrIAFJBEAgACACIAEQwgELCxwAIABFBEAQpQIACyAAIAIgAyAEIAEoAhARBwALHAAgAEUEQBClAgALIAAgAiADIAQgASgCEBEWAAscACAARQRAEKUCAAsgACACIAMgBCABKAIQERcACxwAIABFBEAQpQIACyAAIAIgAyAEIAEoAhARCAALHAAgAEUEQBClAgALIAAgAiADIAQgASgCEBEYAAseACAAIAFBA3I2AgQgACABaiIAIAAoAgRBAXI2AgQLGgAgAEUEQBClAgALIAAgAiADIAEoAhARAwALFAAgACgCAARAIABBBGooAgAQKAsLIgAgAC0AAEUEQCABQcTFwABBBRArDwsgAUHAxcAAQQQQKwsYACAARQRAEKUCAAsgACACIAEoAhARAAALEQAgACgCAARAIAAoAgQQKAsLGQEBfyAAKAIQIgEEfyABBSAAQRRqKAIACwsSAEEAQRkgAEEBdmsgAEEfRhsLFgAgACABQQFyNgIEIAAgAWogATYCAAsUACAAKAIAIgBBhAFPBEAgABAACwsUACAAIAI5AwggACABQQBHrTcDAAsXACAAIAI2AgggACABNgIEIAAgAjYCAAsQACAAIAFqQX9qQQAgAWtxCwwAIAAgASACIAMQLQsLACABBEAgABAoCwsPACAAQQF0IgBBACAAa3ILFgAgACgCACABIAIgACgCBCgCDBEBAAsZACABKAIAQaDZwABBBSABKAIEKAIMEQEACwoAIABBCGoQ+AELFAAgACgCACABIAAoAgQoAgwRAAALDwAgACABIAIgAyAEECUACwgAIAAgARBOCxAAIAAoAgAgACgCBCABEC8LEAAgASAAKAIEIAAoAggQKwsWAEHY4MAAIAA2AgBB1ODAAEEBOgAACxMAIABB0KTAADYCBCAAIAE2AgALDQAgAC0ABEECcUEBdgsQACABIAAoAgAgACgCBBArCw0AIAAtABhBEHFBBHYLDQAgAC0AGEEgcUEFdgsNACAAIAEgAhDIAUEACwoAQQAgAGsgAHELCwAgAC0ABEEDcUULDAAgACABQQNyNgIECw0AIAAoAgAgACgCBGoLDQAgACgCACABEFlBAAsOACAAKAIAGgNADAALAAsMACAAIAEgAhCfAQALDAAgACABIAIQoAEACwwAIAAgASACEKEBAAsNACAANQIAQQEgARBbCwwAIAAgASACEOcBAAsNACAAKAIAIAEgAhBKCw0AIAApAwBBASABEFsLDgAgACgCAC0AACABEGALDgAgACgCACkDACABEEkLCwAgACMAaiQAIwALDgAgAUH4iMAAQQoQgwILBwAgABD4AQsMACAAKAIAIAEQjQELDABBxJTAAEEyEB0ACw4AIAFBoKHAAEEIEIMCCwoAIAAoAgRBeHELCgAgACgCBEEBcQsKACAAKAIMQQFxCwoAIAAoAgxBAXYLCwAgACgCACABEH8LGQAgACABQfTgwAAoAgAiAEEwIAAbEQIAAAsLACAAKAIAIAEQXwsKACAAIAEgAhBaCwsAIAAgASACEIUBCw4AIAFBqJPAAEECEIMCCwcAIAAgAWoLBwAgACABawsHACAAQQhqCwcAIABBeGoLDQBCyLXgz8qG29OJfwsNAELujtXpx4aXxKR/CwwAQtf+oZ2h8ZeHHQsDAAELC/xbCQBBgIDAAAupCmNhbGxlZCBgUmVzdWx0Ojp1bndyYXAoKWAgb24gYW4gYEVycmAgdmFsdWUAAQAAAAQAAAAEAAAAAgAAAAMAAAAUAAAABAAAAAQAAAAxMjM0NTY3ODkwMDk4NzY1/////////////////////////////////////////////////////////z7///8/NDU2Nzg5Ojs8Pf////////8AAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGf///////xobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIz/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8CAABzcmNcbGliLnJzAAAAnwEQAAoAAAAaAAAALQAAAJ8BEAAKAAAALAAAADIAAACfARAACgAAADIAAAAyAAAAnwEQAAoAAAA4AAAAKQAAAJ8BEAAKAAAAPQAAAEAAAACfARAACgAAAEcAAAAyAAAAnwEQAAoAAABNAAAAMgAAAJ8BEAAKAAAAUAAAACEAAACfARAACgAAAFMAAAAjAAAABQAAAAAAAAABAAAABgAAAAUAAAAAAAAAAQAAAAcAAAAQAAAAQzpcVXNlcnNcd2FuZ2xpcDhcLmNhcmdvXHJlZ2lzdHJ5XHNyY1xnaXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjNcZ2VuZXJpYy1hcnJheS0wLjE0LjZcc3JjXGxpYi5ycwAAAGACEABhAAAANQIAAAkAAABpbnZhbGlkIHZhbHVlOiAsIGV4cGVjdGVkIAAA1AIQAA8AAADjAhAACwAAAEM6XFVzZXJzXHdhbmdsaXA4XC5jYXJnb1xyZWdpc3RyeVxzcmNcZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzXGJhc2U2NC0wLjIxLjBcc3JjXGVuY29kZS5ycwAAAAADEABdAAAAUAAAACcAAAB1c2l6ZSBvdmVyZmxvdyB3aGVuIGNhbGN1bGF0aW5nIGI2NCBsZW5ndGgAAAADEABdAAAAVwAAAAoAAAAKAAAAFAAAAAQAAAAEAAAAQzpcVXNlcnNcd2FuZ2xpcDhcLmNhcmdvXHJlZ2lzdHJ5XHNyY1xnaXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjNcYmFzZTY0LTAuMjEuMFxzcmNcZW5naW5lXG1vZC5yc2ludGVnZXIgb3ZlcmZs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XFVzZXJzXHdhbmdsaXA4XC5jYXJnb1xyZWdpc3RyeVxzcmNcZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzXGJhc2U2NC0wLjIxLjBcc3JjXGVuZ2luZVxnZW5lcmFsX3B1cnBvc2VcZGVjb2RlLnJzACsNEAB0AAAAJAAAABIAAABDOlxVc2Vyc1x3YW5nbGlwOFwuY2FyZ29ccmVnaXN0cnlcc3JjXGdpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyM1xiYXNlNjQtMC4yMS4wXHNyY1xlbmdpbmVcZ2VuZXJhbF9wdXJwb3NlXGRlY29kZV9zdWZmaXgucnMAsA0QAHsAAAAdAAAAFAAAAGludGVybmFsIGVycm9yOiBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGU6IAAAPA4QACoAAABJbXBvc3NpYmxlOiBtdXN0IG9ubHkgaGF2ZSAwIHRvIDggaW5wdXQgYnl0ZXMgaW4gbGFzdCBjaHVuaywgd2l0aCBubyBpbnZhbGlkIGxlbmd0aHNwDhAAVAAAALANEAB7AAAAhQAAAA4AAACwDRAAewAAAJoAAAAJAAAAaW50ZXJuYWwgZXJyb3I6IGVudGVyZWQgdW5yZWFjaGFibGUgY29kZTogAADsDhAAKgAAAEltcG9zc2libGUgcmVtYWluZGVyIA8QABQAAABDOlxVc2Vyc1x3YW5nbGlwOFwuY2FyZ29ccmVnaXN0cnlcc3JjXGdpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyM1xiYXNlNjQtMC4yMS4wXHNyY1xlbmNvZGUucnMAAAA8DxAAXQAAAG4AAAAWAAAAPA8QAF0AAACBAAAACQAAAEM6XFVzZXJzXHdhbmdsaXA4XC5jYXJnb1xyZWdpc3RyeVxzcmNcZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzXGFlcy0wLjguMlxzcmNcc29mdFxmaXhzbGljZTMyLnJzAAC8DxAAYgAAAEsAAAAjAAAAvA8QAGIAAABMAAAAIwAAALwPEABiAAAACQEAACQAAAC8DxAAYgAAAB4BAAAoAAAAvA8QAGIAAACJBAAAEgAAALwPEABiAAAAiQQAAD0AAAC8DxAAYgAAABQFAAAiAAAAvA8QAGIAAAAUBQAACQAAAFBhZEVycm9yR2VuZXJpY0Fy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N6sOYTkvGKE5MBxhSPMeoUxANGFQ8GqhUU9vIVKdvKFSAM9hU2XRoVMA2iFUAODhVa7iYVfs5CFZ0OihWSAA7lnwAX9aAHAABwAtAQEBAgECAQFICzAVEAFlBwIGAgIBBCMBHhtbCzoJCQEYBAEJAQMBBSsDPAgqGAEgNwEBAQQIBAEDBwoCHQE6AQEBAgQIAQkBCgIaAQICOQEEAgQCAgMDAR4CAwELAjkBBAUBAgQBFAIWBgEBOgEBAgEECAEHAwoCHgE7AQEBDAEJASgBAwE3AQEDBQMBBAcCCwIdAToBAgECAQMBBQIHAgsCHAI5AgEBAgQIAQkBCgIdAUgBBAECAwEBCAFRAQIHDAhiAQIJCwdJAhsBAQEBATcOAQUBAgULASQJAWYEAQYBAgICGQIEAxAEDQECAgYBDwEAAwADHQIeAh4CQAIBBwgBAgsJAS0DAQF1AiIBdgMEAgkBBgPbAgIBOgEBBwEBAQECCAYKAgEwHzEEMAcBAQUBKAkMAiAEAgIBAzgBAQIDAQEDOggCApgDAQ0BBwQBBgEDAsZAAAHDIQADjQFgIAAGaQIABAEKIAJQAgABAwEEARkCBQGXAhoSDQEmCBkLLgMwAQIEAgInAUMGAgICAgwBCAEvATMBAQMCAgUCAQEqAggB7gECAQQBAAEAEBAQAAIAAeIBlQUAAwECBQQoAwQBpQIABAACUANGCzEEewE2DykBAgIKAzEEAgIHAT0DJAUBCD4BDAI0CQoEAgFfAwIBAQIGAQIBnQEDCBUCOQIBAQEBFgEOBwMFwwgCAwEBFwFRAQIGAQECAQECAQLrAQIEBgIBAhsCVQgCAQECagEBAQIGAQFlAwIEAQUACQEC9QEKAgEBBAGQBAICBAEgCigGAgQIAQkGAgMuDQECAAcBBgEBUhYCBwECAQJ6BgMBAQIBBwEBSAIDAQEBAAILAjQFBQEBAQABBg8ABTsHAAE/BFEBAAIALgIXAAEBAwQFCAgCBx4ElAMANwQyCAEOARYFAQ8ABwERAgcBAgEFZAGgBwABPQQABAAHbQcAYIDwAHsJcHJvZHVjZXJzAghsYW5ndWFnZQEEUnVzdAAMcHJvY2Vzc2VkLWJ5AwVydXN0Yx0xLjY4LjEgKDg0NjBjYTgyMyAyMDIzLTAzLTIwKQZ3YWxydXMGMC4xOS4wDHdhc20tYmluZGdlbhIwLjIuODQgKGNlYThjYzNkMik=", Je = async (g = {}, A) => {
  let I;
  if (A.startsWith("data:")) {
    const t = A.replace(/^data:.*?base64,/, "");
    let e;
    if (typeof Buffer == "function" && typeof Buffer.from == "function")
      e = Buffer.from(t, "base64");
    else if (typeof atob == "function") {
      const B = atob(t);
      e = new Uint8Array(B.length);
      for (let Q = 0; Q < B.length; Q++)
        e[Q] = B.charCodeAt(Q);
    } else
      throw new Error("Cannot decode base64-encoded data URL");
    I = await WebAssembly.instantiate(e, g);
  } else {
    const t = await fetch(A), e = t.headers.get("Content-Type") || "";
    if ("instantiateStreaming" in WebAssembly && e.startsWith("application/wasm"))
      I = await WebAssembly.instantiateStreaming(t, g);
    else {
      const B = await t.arrayBuffer();
      I = await WebAssembly.instantiate(B, g);
    }
  }
  return I.instance.exports;
};
let F;
function me(g) {
  F = g;
}
const gA = new Array(128).fill(void 0);
gA.push(void 0, null, !0, !1);
function M(g) {
  return gA[g];
}
let HA = gA.length;
function Ye(g) {
  g < 132 || (gA[g] = HA, HA = g);
}
function Og(g) {
  const A = M(g);
  return Ye(g), A;
}
function O(g) {
  HA === gA.length && gA.push(gA.length + 1);
  const A = HA;
  return HA = gA[A], gA[A] = g, A;
}
function kg(g) {
  return g == null;
}
let XA = null;
function Ue() {
  return (XA === null || XA.byteLength === 0) && (XA = new Float64Array(F.memory.buffer)), XA;
}
let ZA = null;
function IA() {
  return (ZA === null || ZA.byteLength === 0) && (ZA = new Int32Array(F.memory.buffer)), ZA;
}
let CA = 0, PA = null;
function gg() {
  return (PA === null || PA.byteLength === 0) && (PA = new Uint8Array(F.memory.buffer)), PA;
}
const Le = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
let Ig = new Le("utf-8");
const He = typeof Ig.encodeInto == "function" ? function(g, A) {
  return Ig.encodeInto(g, A);
} : function(g, A) {
  const I = Ig.encode(g);
  return A.set(I), {
    read: g.length,
    written: I.length
  };
};
function yA(g, A, I) {
  if (I === void 0) {
    const C = Ig.encode(g), E = A(C.length);
    return gg().subarray(E, E + C.length).set(C), CA = C.length, E;
  }
  let t = g.length, e = A(t);
  const B = gg();
  let Q = 0;
  for (; Q < t; Q++) {
    const C = g.charCodeAt(Q);
    if (C > 127)
      break;
    B[e + Q] = C;
  }
  if (Q !== t) {
    Q !== 0 && (g = g.slice(Q)), e = I(e, t, t = Q + g.length * 3);
    const C = gg().subarray(e + Q, e + t), E = He(g, C);
    Q += E.written;
  }
  return CA = Q, e;
}
const be = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
let zI = new be("utf-8", { ignoreBOM: !0, fatal: !0 });
zI.decode();
function ag(g, A) {
  return zI.decode(gg().subarray(g, g + A));
}
function Sg(g) {
  const A = typeof g;
  if (A == "number" || A == "boolean" || g == null)
    return `${g}`;
  if (A == "string")
    return `"${g}"`;
  if (A == "symbol") {
    const e = g.description;
    return e == null ? "Symbol" : `Symbol(${e})`;
  }
  if (A == "function") {
    const e = g.name;
    return typeof e == "string" && e.length > 0 ? `Function(${e})` : "Function";
  }
  if (Array.isArray(g)) {
    const e = g.length;
    let B = "[";
    e > 0 && (B += Sg(g[0]));
    for (let Q = 1; Q < e; Q++)
      B += ", " + Sg(g[Q]);
    return B += "]", B;
  }
  const I = /\[object ([^\]]+)\]/.exec(toString.call(g));
  let t;
  if (I.length > 1)
    t = I[1];
  else
    return toString.call(g);
  if (t == "Object")
    try {
      return "Object(" + JSON.stringify(g) + ")";
    } catch {
      return "Object";
    }
  return g instanceof Error ? `${g.name}: ${g.message}
${g.stack}` : t;
}
function xe(g) {
  try {
    const t = F.__wbindgen_add_to_stack_pointer(-16), e = yA(g, F.__wbindgen_malloc, F.__wbindgen_realloc), B = CA;
    F.secretkey(t, e, B);
    var A = IA()[t / 4 + 0], I = IA()[t / 4 + 1];
    return ag(A, I);
  } finally {
    F.__wbindgen_add_to_stack_pointer(16), F.__wbindgen_free(A, I);
  }
}
function ve(g, A) {
  const I = yA(g, F.__wbindgen_malloc, F.__wbindgen_realloc), t = CA, e = yA(A, F.__wbindgen_malloc, F.__wbindgen_realloc), B = CA;
  return F.validate(I, t, e, B) !== 0;
}
function qe(g) {
  const A = yA(g, F.__wbindgen_malloc, F.__wbindgen_realloc), I = CA, t = F.encrypt(A, I);
  return Og(t);
}
function Ke(g) {
  try {
    const t = F.__wbindgen_add_to_stack_pointer(-16);
    F.decrypt(t, O(g));
    var A = IA()[t / 4 + 0], I = IA()[t / 4 + 1];
    return ag(A, I);
  } finally {
    F.__wbindgen_add_to_stack_pointer(16), F.__wbindgen_free(A, I);
  }
}
function zg(g, A) {
  try {
    return g.apply(this, A);
  } catch (I) {
    F.__wbindgen_exn_store(O(I));
  }
}
function Oe(g) {
  Og(g);
}
function ze(g) {
  return O(g);
}
function Te(g) {
  const A = M(g);
  return typeof A == "object" && A !== null;
}
function je(g, A) {
  return M(g) == M(A);
}
function _e(g) {
  const A = M(g);
  return typeof A == "boolean" ? A ? 1 : 0 : 2;
}
function Xe(g, A) {
  const I = M(A), t = typeof I == "number" ? I : void 0;
  Ue()[g / 8 + 1] = kg(t) ? 0 : t, IA()[g / 4 + 0] = !kg(t);
}
function Ze(g, A) {
  const I = M(A), t = typeof I == "string" ? I : void 0;
  var e = kg(t) ? 0 : yA(t, F.__wbindgen_malloc, F.__wbindgen_realloc), B = CA;
  IA()[g / 4 + 1] = B, IA()[g / 4 + 0] = e;
}
function Pe(g, A) {
  const I = new Error(ag(g, A));
  return O(I);
}
function Ve(g, A) {
  const I = M(g)[A >>> 0];
  return O(I);
}
function We(g) {
  return M(g).length;
}
function $e() {
  const g = new Array();
  return O(g);
}
function AB(g) {
  return typeof M(g) == "function";
}
function gB(g) {
  const A = M(g).next;
  return O(A);
}
function IB() {
  return zg(function(g) {
    const A = M(g).next();
    return O(A);
  }, arguments);
}
function tB(g) {
  return M(g).done;
}
function eB(g) {
  const A = M(g).value;
  return O(A);
}
function BB() {
  return O(Symbol.iterator);
}
function QB() {
  return zg(function(g, A) {
    const I = Reflect.get(M(g), M(A));
    return O(I);
  }, arguments);
}
function iB() {
  return zg(function(g, A) {
    const I = M(g).call(M(A));
    return O(I);
  }, arguments);
}
function CB(g, A, I) {
  M(g)[A >>> 0] = Og(I);
}
function EB(g) {
  return Array.isArray(M(g));
}
function nB(g) {
  let A;
  try {
    A = M(g) instanceof ArrayBuffer;
  } catch {
    A = !1;
  }
  return A;
}
function sB(g) {
  return Number.isSafeInteger(M(g));
}
function aB(g) {
  const A = M(g).buffer;
  return O(A);
}
function oB(g) {
  const A = new Uint8Array(M(g));
  return O(A);
}
function rB(g, A, I) {
  M(g).set(M(A), I >>> 0);
}
function cB(g) {
  return M(g).length;
}
function hB(g) {
  let A;
  try {
    A = M(g) instanceof Uint8Array;
  } catch {
    A = !1;
  }
  return A;
}
function lB(g, A) {
  const I = Sg(M(A)), t = yA(I, F.__wbindgen_malloc, F.__wbindgen_realloc), e = CA;
  IA()[g / 4 + 1] = e, IA()[g / 4 + 0] = t;
}
function DB(g, A) {
  throw new Error(ag(g, A));
}
function uB() {
  const g = F.memory;
  return O(g);
}
URL = globalThis.URL;
const V = await Je({ "./rich_wasm_bg.js": { __wbindgen_object_drop_ref: Oe, __wbindgen_number_new: ze, __wbindgen_is_object: Te, __wbindgen_jsval_loose_eq: je, __wbindgen_boolean_get: _e, __wbindgen_number_get: Xe, __wbindgen_string_get: Ze, __wbindgen_error_new: Pe, __wbg_get_27fe3dac1c4d0224: Ve, __wbg_length_e498fbc24f9c1d4f: We, __wbg_new_b525de17f44a8943: $e, __wbindgen_is_function: AB, __wbg_next_b7d530c04fd8b217: gB, __wbg_next_88560ec06a094dea: IB, __wbg_done_1ebec03bbd919843: tB, __wbg_value_6ac8da5cc5b3efda: eB, __wbg_iterator_55f114446221aa5a: BB, __wbg_get_baf4855f9a986186: QB, __wbg_call_95d1ea488d03e4e8: iB, __wbg_set_17224bc548dd1d7b: CB, __wbg_isArray_39d28997bf6b96b4: EB, __wbg_instanceof_ArrayBuffer_a69f02ee4c4f5065: nB, __wbg_isSafeInteger_8c4789029e885159: sB, __wbg_buffer_cf65c07de34b9a08: aB, __wbg_new_537b7341ce90bb31: oB, __wbg_set_17499e8aa4003ebd: rB, __wbg_length_27a2afe8ab42b09f: cB, __wbg_instanceof_Uint8Array_01cebe79ca606cca: hB, __wbindgen_debug_string: lB, __wbindgen_throw: DB, __wbindgen_memory: uB } }, Re), fB = V.memory, dB = V.secretkey, yB = V.validate, wB = V.encrypt, pB = V.decrypt, GB = V.__wbindgen_malloc, MB = V.__wbindgen_realloc, NB = V.__wbindgen_add_to_stack_pointer, FB = V.__wbindgen_free, kB = V.__wbindgen_exn_store, SB = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  __wbindgen_add_to_stack_pointer: NB,
  __wbindgen_exn_store: kB,
  __wbindgen_free: FB,
  __wbindgen_malloc: GB,
  __wbindgen_realloc: MB,
  decrypt: pB,
  encrypt: wB,
  memory: fB,
  secretkey: dB,
  validate: yB
}, Symbol.toStringTag, { value: "Module" }));
me(SB);
const RB = function(g) {
  return new Promise((A, I) => {
    if (g instanceof Blob) {
      var t = new FileReader();
      t.onload = function(e) {
        A(e.target.result);
      }, t.onerror = (e) => {
        I(e);
      }, t.readAsArrayBuffer(g);
    } else
      I("不是二进制文件");
  });
}, TI = function(g) {
  let A = typeof g == "string" ? g : JSON.stringify(g), I = qe(A);
  return new Blob([new Uint8Array(I).buffer]);
}, Tg = async function(g) {
  let A = null;
  if (typeof g == "string")
    A = g;
  else if (g instanceof Blob) {
    let I = await RB(g), t = Array.prototype.slice.call(new Uint8Array(I));
    A = Ke(t);
  } else if (g && typeof g == "object" && typeof g != "function" && !Array.isArray(g))
    return g;
  try {
    return JSON.parse(A);
  } catch {
    Promise.reject("数据格式无效");
  }
}, JB = function(g) {
  return typeof g == "string" && g.length > 2 && g.length < 16 ? xe(g) : null;
}, mB = function(g, A) {
  return typeof g == "string" && typeof A == "string" ? ve(g, A) : !1;
}, YB = async function(g, A) {
  if (!g)
    return null;
  let I = "A_" + T(10), t = await Tg(g);
  return t && (t.id = I), A && Object.assign(t, A), { id: I, data: t };
}, UB = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  copyData: YB,
  decrypt: Tg,
  encrypt: TI,
  secretkey: JB,
  validateKey: mB
}, Symbol.toStringTag, { value: "Module" }));
var LB = rA, HB = LB.isFinite;
function bB(g) {
  return typeof g == "number" && HB(g);
}
var xB = bB;
function vB(g, A = {}) {
  let I = Object.assign({
    host: "",
    token: "token",
    responseType: "json",
    method: "get",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  }, A), t = /^(?!https?:\/\/)/.test(g.url) ? I.host + g.url : g.url, e = localStorage.getItem(I.token) ? { Authorization: localStorage.getItem(I.token) } : {}, B = g.customize || {};
  (!I.headers || typeof I.headers == "string") && (I.headers = {});
  let Q = Object.assign({
    method: g.method || I.method,
    mode: g.mode || I.mode,
    signal: g.signal,
    headers: new Headers(Object.assign(I.headers, e, g.headers))
  }, B);
  return Q.method.toUpperCase() == "POST" ? Q.body = Q.headers.get("Content-Type") == "application/json" ? JSON.stringify(g.data) : g.data : t = /\?/.test(t) ? t + "&" + Fg(g.data) : t + "?" + Fg(g.data), new Promise((C, E) => {
    fetch(t, Q).then((n) => I.responseType ? n[I.responseType]() : n.json(), E).then(C);
  });
}
const DA = {}, Rg = [];
class qB extends fA {
  constructor(A) {
    super(), this.id = "R_" + T(10), this.controller = new AbortController(), this.signal = this.controller.signal, this.isloading = !1, this.status = "wait", this.options = A, this.data = null, this.err = null;
  }
  //    请求数据
  request(A) {
    this.status != "request" && (this.isloading = !0, this.status = "request", this.emit("request", this), vB({
      url: this.options.url || "",
      data: this.options.body || {},
      method: this.options.method,
      signal: this.signal
    }).then((I) => {
      this.data = I, this.status = "success", this.isloading = !1, this.err = null, this.emit("success", I), A && A(this);
    }, (I) => {
      this.status = "success", this.isloading = !1, this.err = I, this.emit("error", I), A && A(this);
    }));
  }
  destroy() {
    this.controller && this.controller.abort(), this.controller = null, this.signal = null, this.isloading = null, this.status = null, this.options = null, this.data = null, this.err = null, DA[this.id] && (X(Rg, "id", this.id), delete DA[this.id]);
  }
}
function KB(g) {
  let A = g.url || "", I = g.body || {}, t = (A + JSON.stringify(I)).split("").sort().join(""), e = Rg.find((Q) => Q.test == t);
  if (e && DA[e.id])
    return DA[e.id];
  let B = new qB(g);
  return Rg.push({
    id: B.id,
    test: t
  }), DA[B.id] = B, DA[B.id];
}
var OB = Array.isArray, OA = OB, zB = KA, TB = pA, jB = "[object Symbol]";
function _B(g) {
  return typeof g == "symbol" || TB(g) && zB(g) == jB;
}
var jg = _B, XB = OA, ZB = jg, PB = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, VB = /^\w*$/;
function WB(g, A) {
  if (XB(g))
    return !1;
  var I = typeof g;
  return I == "number" || I == "symbol" || I == "boolean" || g == null || ZB(g) ? !0 : VB.test(g) || !PB.test(g) || A != null && g in Object(A);
}
var $B = WB;
function AQ(g) {
  var A = typeof g;
  return g != null && (A == "object" || A == "function");
}
var cA = AQ, gQ = KA, IQ = cA, tQ = "[object AsyncFunction]", eQ = "[object Function]", BQ = "[object GeneratorFunction]", QQ = "[object Proxy]";
function iQ(g) {
  if (!IQ(g))
    return !1;
  var A = gQ(g);
  return A == eQ || A == BQ || A == tQ || A == QQ;
}
var _g = iQ, CQ = rA, EQ = CQ["__core-js_shared__"], nQ = EQ, dg = nQ, QI = function() {
  var g = /[^.]+$/.exec(dg && dg.keys && dg.keys.IE_PROTO || "");
  return g ? "Symbol(src)_1." + g : "";
}();
function sQ(g) {
  return !!QI && QI in g;
}
var aQ = sQ, oQ = Function.prototype, rQ = oQ.toString;
function cQ(g) {
  if (g != null) {
    try {
      return rQ.call(g);
    } catch {
    }
    try {
      return g + "";
    } catch {
    }
  }
  return "";
}
var hQ = cQ, lQ = _g, DQ = aQ, uQ = cA, fQ = hQ, dQ = /[\\^$.*+?()[\]{}|]/g, yQ = /^\[object .+?Constructor\]$/, wQ = Function.prototype, pQ = Object.prototype, GQ = wQ.toString, MQ = pQ.hasOwnProperty, NQ = RegExp(
  "^" + GQ.call(MQ).replace(dQ, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function FQ(g) {
  if (!uQ(g) || DQ(g))
    return !1;
  var A = lQ(g) ? NQ : yQ;
  return A.test(fQ(g));
}
var kQ = FQ;
function SQ(g, A) {
  return g?.[A];
}
var RQ = SQ, JQ = kQ, mQ = RQ;
function YQ(g, A) {
  var I = mQ(g, A);
  return JQ(I) ? I : void 0;
}
var Xg = YQ, UQ = Xg, LQ = UQ(Object, "create"), og = LQ, iI = og;
function HQ() {
  this.__data__ = iI ? iI(null) : {}, this.size = 0;
}
var bQ = HQ;
function xQ(g) {
  var A = this.has(g) && delete this.__data__[g];
  return this.size -= A ? 1 : 0, A;
}
var vQ = xQ, qQ = og, KQ = "__lodash_hash_undefined__", OQ = Object.prototype, zQ = OQ.hasOwnProperty;
function TQ(g) {
  var A = this.__data__;
  if (qQ) {
    var I = A[g];
    return I === KQ ? void 0 : I;
  }
  return zQ.call(A, g) ? A[g] : void 0;
}
var jQ = TQ, _Q = og, XQ = Object.prototype, ZQ = XQ.hasOwnProperty;
function PQ(g) {
  var A = this.__data__;
  return _Q ? A[g] !== void 0 : ZQ.call(A, g);
}
var VQ = PQ, WQ = og, $Q = "__lodash_hash_undefined__";
function Ai(g, A) {
  var I = this.__data__;
  return this.size += this.has(g) ? 0 : 1, I[g] = WQ && A === void 0 ? $Q : A, this;
}
var gi = Ai, Ii = bQ, ti = vQ, ei = jQ, Bi = VQ, Qi = gi;
function MA(g) {
  var A = -1, I = g == null ? 0 : g.length;
  for (this.clear(); ++A < I; ) {
    var t = g[A];
    this.set(t[0], t[1]);
  }
}
MA.prototype.clear = Ii;
MA.prototype.delete = ti;
MA.prototype.get = ei;
MA.prototype.has = Bi;
MA.prototype.set = Qi;
var ii = MA;
function Ci() {
  this.__data__ = [], this.size = 0;
}
var Ei = Ci;
function ni(g, A) {
  return g === A || g !== g && A !== A;
}
var rg = ni, si = rg;
function ai(g, A) {
  for (var I = g.length; I--; )
    if (si(g[I][0], A))
      return I;
  return -1;
}
var cg = ai, oi = cg, ri = Array.prototype, ci = ri.splice;
function hi(g) {
  var A = this.__data__, I = oi(A, g);
  if (I < 0)
    return !1;
  var t = A.length - 1;
  return I == t ? A.pop() : ci.call(A, I, 1), --this.size, !0;
}
var li = hi, Di = cg;
function ui(g) {
  var A = this.__data__, I = Di(A, g);
  return I < 0 ? void 0 : A[I][1];
}
var fi = ui, di = cg;
function yi(g) {
  return di(this.__data__, g) > -1;
}
var wi = yi, pi = cg;
function Gi(g, A) {
  var I = this.__data__, t = pi(I, g);
  return t < 0 ? (++this.size, I.push([g, A])) : I[t][1] = A, this;
}
var Mi = Gi, Ni = Ei, Fi = li, ki = fi, Si = wi, Ri = Mi;
function NA(g) {
  var A = -1, I = g == null ? 0 : g.length;
  for (this.clear(); ++A < I; ) {
    var t = g[A];
    this.set(t[0], t[1]);
  }
}
NA.prototype.clear = Ni;
NA.prototype.delete = Fi;
NA.prototype.get = ki;
NA.prototype.has = Si;
NA.prototype.set = Ri;
var hg = NA, Ji = Xg, mi = rA, Yi = Ji(mi, "Map"), jI = Yi, CI = ii, Ui = hg, Li = jI;
function Hi() {
  this.size = 0, this.__data__ = {
    hash: new CI(),
    map: new (Li || Ui)(),
    string: new CI()
  };
}
var bi = Hi;
function xi(g) {
  var A = typeof g;
  return A == "string" || A == "number" || A == "symbol" || A == "boolean" ? g !== "__proto__" : g === null;
}
var vi = xi, qi = vi;
function Ki(g, A) {
  var I = g.__data__;
  return qi(A) ? I[typeof A == "string" ? "string" : "hash"] : I.map;
}
var lg = Ki, Oi = lg;
function zi(g) {
  var A = Oi(this, g).delete(g);
  return this.size -= A ? 1 : 0, A;
}
var Ti = zi, ji = lg;
function _i(g) {
  return ji(this, g).get(g);
}
var Xi = _i, Zi = lg;
function Pi(g) {
  return Zi(this, g).has(g);
}
var Vi = Pi, Wi = lg;
function $i(g, A) {
  var I = Wi(this, g), t = I.size;
  return I.set(g, A), this.size += I.size == t ? 0 : 1, this;
}
var AC = $i, gC = bi, IC = Ti, tC = Xi, eC = Vi, BC = AC;
function FA(g) {
  var A = -1, I = g == null ? 0 : g.length;
  for (this.clear(); ++A < I; ) {
    var t = g[A];
    this.set(t[0], t[1]);
  }
}
FA.prototype.clear = gC;
FA.prototype.delete = IC;
FA.prototype.get = tC;
FA.prototype.has = eC;
FA.prototype.set = BC;
var _I = FA, XI = _I, QC = "Expected a function";
function Zg(g, A) {
  if (typeof g != "function" || A != null && typeof A != "function")
    throw new TypeError(QC);
  var I = function() {
    var t = arguments, e = A ? A.apply(this, t) : t[0], B = I.cache;
    if (B.has(e))
      return B.get(e);
    var Q = g.apply(this, t);
    return I.cache = B.set(e, Q) || B, Q;
  };
  return I.cache = new (Zg.Cache || XI)(), I;
}
Zg.Cache = XI;
var iC = Zg, CC = iC, EC = 500;
function nC(g) {
  var A = CC(g, function(t) {
    return I.size === EC && I.clear(), t;
  }), I = A.cache;
  return A;
}
var sC = nC, aC = sC, oC = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, rC = /\\(\\)?/g, cC = aC(function(g) {
  var A = [];
  return g.charCodeAt(0) === 46 && A.push(""), g.replace(oC, function(I, t, e, B) {
    A.push(e ? B.replace(rC, "$1") : t || I);
  }), A;
}), hC = cC;
function lC(g, A) {
  for (var I = -1, t = g == null ? 0 : g.length, e = Array(t); ++I < t; )
    e[I] = A(g[I], I, g);
  return e;
}
var DC = lC, EI = xg, uC = DC, fC = OA, dC = jg, yC = 1 / 0, nI = EI ? EI.prototype : void 0, sI = nI ? nI.toString : void 0;
function ZI(g) {
  if (typeof g == "string")
    return g;
  if (fC(g))
    return uC(g, ZI) + "";
  if (dC(g))
    return sI ? sI.call(g) : "";
  var A = g + "";
  return A == "0" && 1 / g == -yC ? "-0" : A;
}
var wC = ZI, pC = wC;
function GC(g) {
  return g == null ? "" : pC(g);
}
var MC = GC, NC = OA, FC = $B, kC = hC, SC = MC;
function RC(g, A) {
  return NC(g) ? g : FC(g, A) ? [g] : kC(SC(g));
}
var JC = RC, mC = jg, YC = 1 / 0;
function UC(g) {
  if (typeof g == "string" || mC(g))
    return g;
  var A = g + "";
  return A == "0" && 1 / g == -YC ? "-0" : A;
}
var LC = UC, HC = JC, bC = LC;
function xC(g, A) {
  A = HC(A, g);
  for (var I = 0, t = A.length; g != null && I < t; )
    g = g[bC(A[I++])];
  return I && I == t ? g : void 0;
}
var vC = xC, qC = vC;
function KC(g, A, I) {
  var t = g == null ? void 0 : qC(g, A);
  return t === void 0 ? I : t;
}
var bA = KC;
const Jg = function(g) {
  if (!this.appData)
    return console.warn("缺少数据源"), null;
  let A = {};
  return g && Array.isArray(g) && g.forEach((I) => {
    if (iA(I))
      if (typeof I.value == "string" && I.key) {
        let t = this.appData.getDataSource(I.value);
        t ? sg(t) ? A[I.key] = I.path ? bA(t.data, I.path) : t.data : A[I.key] = I.path ? bA(t, I.path) : t : A[I.key] = I.value;
      } else
        I.key && (A[I.key] = I.value);
  }), A;
};
class OC extends fA {
  constructor(A, I = {}) {
    super();
    const { id: t, url: e, extractRule: B, body: Q, method: C, itval: E } = A;
    this.appData = I, this.AppSetup = I.AppSetup, this.AppInfo = I.info, this.id = t || "RD_" + T(10), this.url = e, this.body = Q, this.method = C, this.data = U({}), this.sourceData = null, this.loading = bg(!1), this.isloading = !1, this.itval = E || 0, this.it = null, this.status = "wait", this.err = null, this.extractRule = B ? U(B) : U({});
    let n = KB({ url: e, body: Jg.call(this, Q), method: C }, this.AppInfo.network);
    n.on("request", () => {
      this.loading.value = !0, this.isloading = !0, this.status = "request";
    }), n.on("success", (s) => {
      this.sourceData = s, this.status = "success", this.loading.value = !1, this.isloading = !1, this.err = null, this.fillData(s), this.emit("success", this);
    }), n.on("error", (s) => {
      this.status = "success", this.loading.value = !1, this.isloading = !1, this.err = s, this.emit("error", s);
    }), this.req = n, this.unwatch = null, this.watchRule();
  }
  watchRule() {
    this.stopWatch(), this.watch = JI(this.extractRule, () => {
      this.sourceData && this.fillData(this.sourceData);
    }), this.sourceData && this.fillData(this.sourceData);
  }
  stopWatch() {
    this.unwatch && (this.unwatch(), this.unwatch = null);
  }
  setData(A = {}) {
    A.url && (this.url = A.url, this.req.options.url = A.url), A.method && (this.method = A.method, this.req.options.method = A.method), A.body && (this.body = A.body, this.req.options.body = Jg.call(this.appData, A.body)), xB(A.itval) && (this.itval = A.itval);
  }
  // 修改规则
  setExtractRule(A) {
    if (this.extractRule instanceof Array && A instanceof Array || this.extractRule instanceof Object && A instanceof Object && !Array.isArray(this.extractRule) && !Array.isArray(A)) {
      for (const I in this.extractRule)
        delete this.extractRule[I];
      Object.assign(this.extractRule, A);
    } else
      this.extractRule = U(b(A)), this.watchRule();
  }
  // 返回规则（返回的是一个非响应式的数据对象）
  getExtractRule() {
    return b(this.extractRule);
  }
  //    请求数据
  request(A) {
    this.req.request(A), this.setinterval(this.itval);
  }
  // 开启轮询请求
  setinterval(A = 0) {
    this.AppSetup.interaction && A && A > 0 && (this.it = oA.add(() => {
      this.req.request();
    }, A * 1e3));
  }
  // 关闭轮询请求
  stopInterval() {
    this.it && (oA.del(this.it), this.it = null);
  }
  //    清除数据
  clearData() {
    this.status == "request" && this.req.controller && this.req.controller.abort(), Object.keys(this.data).forEach((I) => {
      delete this.data[I];
    });
  }
  // 返回数据内容
  getData() {
    return {
      id: this.id,
      url: this.url,
      body: this.body || "",
      method: this.method || "",
      itval: this.itval || 0,
      extractRule: this.extractRule || ""
    };
  }
  /**
   * 填充数据
   * @param {*} data 
   */
  fillData(A) {
    this.clearData(), this.extractRule && (this.extractRule.x || this.extractRule.name || this.extractRule instanceof Array) ? Object.assign(this.data, { data: vg(A, this.extractRule) }) : Object.assign(this.data, { data: A });
  }
  /**
   * 销毁
   */
  destroy() {
    this.req.destroy(), this.clearData(), this.stopWatch(), this.stopInterval(), this.extractRule = null;
  }
}
const S = {}, xA = U([]), PI = function() {
  return U({
    x: {
      name: "",
      path: "",
      mapKey: ""
    },
    y: []
  });
}, zC = function() {
  return xA;
}, VI = function(g) {
  if (g.id && S[g.id])
    return S[g.id];
  {
    let A = new OC(g, this);
    return xA.push(A), S[A.id] = A, A;
  }
}, yg = function(g) {
  return X(xA, "id", g), S[g].destroy(), delete S[g], g;
}, Bg = function(g) {
  if (g) {
    if (S[g])
      return yg(g);
    for (let A in S)
      S[A].url == g && yg(A);
    return g;
  } else
    return Object.keys(S).forEach((I) => {
      yg(I);
    }), xA.splice(0, xA.length), !0;
}, Qg = function(g, A = !1) {
  if (S[g])
    return S[g];
  if (A) {
    for (let I in S)
      if (S[I].url == g)
        return S[I];
  }
  return null;
}, TC = function() {
  Bg();
}, WI = function(g = !1, A = "", I) {
  if (A && S[A])
    S[A].request(I);
  else
    for (let t in S)
      if (S[t].status != "success" || S[t].err || g)
        if (A) {
          if (S[t].url == A) {
            S[t].request(I);
            return;
          }
        } else
          S[t].request(I);
}, jC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: VI,
  clearRemote: TC,
  createExtractRule: PI,
  del: Bg,
  getList: zC,
  getRemote: Qg,
  remotes: S,
  requestData: WI
}, Symbol.toStringTag, { value: "Module" })), _C = function(g) {
  return Dt(Object.assign({
    // 缩放模式
    scaleMode: "auto",
    // 开启交互动作
    interaction: !1,
    // 点击事件鼠标经过光标样式
    clickCursor: "auto",
    // 是否开启整体缩放
    scale: !1,
    // 当前应用状态，none未创建，create已创建，display已展示，destroy销毁
    status: "none",
    // 是否在编辑状态
    develop: !1,
    // 所在容器
    dom: null
  }, g));
}, XC = function() {
  return U({
    title: "",
    id: "A_" + T(10),
    creattime: null,
    uptime: null,
    cover: null,
    description: "",
    width: 800,
    height: 600,
    parentSize: !1,
    background: {
      backgroundColor: "#222222"
    },
    network: {
      host: "",
      method: "GET",
      headers: {}
    },
    scaleMode: "auto"
  });
}, ZC = function(g) {
  return Object.assign({
    id: "AC_" + T(10),
    action: "",
    target: "app",
    value: null,
    description: ""
  }, g);
}, aI = function(g) {
  const { id: A, value: I = "", name: t = "", type: e = "source", uptime: B } = g;
  return {
    id: A || "GD_" + T(10),
    name: t,
    type: e,
    value: I instanceof Object ? U(I) : bg(I),
    uptime: B || (/* @__PURE__ */ new Date()).getTime()
  };
}, PC = function(g) {
  return U(Object.assign({
    id: "PD_" + T(10),
    name: "",
    title: "",
    url: "",
    password: "",
    version: "",
    uptime: (/* @__PURE__ */ new Date()).getTime()
  }, g));
};
function VC(g) {
  const A = g.getAppData(), I = g.mData, t = g.gData, e = g.aData, B = g.eData, Q = g.rData, C = g.pData;
  let E = b(I.getModuleList());
  E.forEach((s) => {
    s.components && Array.isArray(s.components) && (s.components = s.components.map((a) => {
      if (a.type == "group") {
        let o = I.getGroup(a.id);
        return o.components && (o.components = o.components.map((l) => {
          let D = I.getSprite(l.id);
          return D.selected = !1, D;
        })), o.selected = !1, o;
      } else {
        let o = I.getSprite(a.id);
        return o.selected = !1, o;
      }
    }));
  });
  let n = b(t.getGDataList());
  return n.forEach((s, a) => {
    s.type == "temp" && n.splice(a, 1);
  }), b({
    ...A.info,
    globalData: n,
    modules: E,
    actions: e.getActionList(),
    events: B.getGAction(),
    plugins: C.getPluginList(),
    remote: Q.getRemoteList()
  });
}
let WC = 1, $C = 1, oI = 1;
const wg = function(g = {}) {
  let A = {
    type: "content",
    name: "vx-module",
    title: "页面" + WC++,
    x: 0,
    y: 0,
    layout: null,
    components: []
  };
  return Object.assign(A, g), A.id || (A.id = "mdu_" + T(10)), A;
}, pg = function(g = {}) {
  let A = U({
    id: null,
    gpid: null,
    mid: null,
    name: "vx-sprite-group",
    type: "group",
    title: "组合" + $C++,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    opacity: 100,
    visible: !0,
    selected: !1,
    hover: !1,
    padding: "",
    filter: "",
    cstatus: !1,
    childstatus: {},
    background: {},
    border: {},
    shadow: {},
    anim: {},
    events: [],
    components: []
  });
  return Object.assign(A, g), A.id || (A.id = "group_" + T(10)), A;
}, rI = function(g, A, I = {}) {
  let t = g.getDefaultData(A), e = t.title, B = U({
    id: null,
    gpid: null,
    mid: null,
    name: t.name,
    type: t.type,
    title: e ? e + oI++ : "元素 " + oI++,
    x: t.x || 0,
    y: t.y || 0,
    zIndex: t.zIndex || 0,
    width: t.width || 80,
    height: t.height || 80,
    angle: t.angle || 0,
    opacity: t.opacity || 100,
    visible: t.visible || !0,
    selected: t.selected || !1,
    hover: t.hover || !1,
    padding: t.padding || "",
    filter: t.filter || "",
    lock: t.lock || !1,
    background: t.background || {},
    border: t.border || {},
    shadow: t.shadow || {},
    anim: t.anim || {},
    options: t.options || {},
    events: t.events || [],
    data: t.data || ""
  });
  return Object.assign(B, I), B.id || (B.id = "sprite_" + T(10)), B;
}, $I = function(g, A = {}) {
  let I = null;
  return g && typeof g == "object" && this && (g.type == "group" ? I = Object.assign({
    id: g.id,
    gpid: g.gpid,
    mid: g.mid,
    visible: g.visible,
    name: g.name,
    title: g.title,
    type: g.type,
    zIndex: g.zIndex,
    components: g.components ? g.components.map((t) => t.id) : []
  }, A) : I = Object.assign({
    id: g.id,
    gpid: g.gpid,
    mid: g.mid,
    visible: g.visible,
    name: g.name,
    title: g.title,
    type: g.type,
    zIndex: g.zIndex
  }, A)), I ? (this.esSimple[I.id] = I, this.esSimple[I.id]) : null;
};
class AE {
  // 数据管理
  mData = null;
  // 模块集合
  modules = U({});
  constructor(A) {
    this.mData = A;
  }
  // 创建一个新的模块，并添加
  newMoule(A) {
    if (A && typeof A == "object") {
      if (A.id && this.modules[A.id])
        return console.warn("模块" + A.id + "已存在"), null;
    } else if (typeof A == "string" && this.modules[A])
      return console.warn("模块" + A + "已存在"), null;
    let I = wg(A);
    return Array.isArray(I.components) || (I.components = []), this.modules[I.id] = I, this.mData.elements[I.id] = this.modules[I.id], I;
  }
  // 添加元素（元素、组合的基本属性）
  addElement(A, I = "default") {
    I && A && typeof A != "string" && (this.modules[I] && this.modules[I].components ? this.modules[I].components.push(A) : console.warn("模块添加元素数据失败"));
  }
  // 删除元素（只是在模块内删除，并为删除数据源）
  delElement(A, I = "default") {
    return I && A ? this.modules[I] && this.modules[I].components ? X(this.modules[I].components, "id", A) : (console.warn("模块删除元素数据失败"), !1) : (console.warn("mid && id 无效"), !1);
  }
  /**
   * 删除模块数据
   * @param {*} mid 模块id
   * @param {*} clear 是否清除所有模块内数据
   * @returns 
   */
  delModule(A, I = !1) {
    if (I && this.modules[A]) {
      let t = this.modules[A].components;
      return Array.isArray(t) && t.map((B) => B.id).forEach((B) => {
        this.mData.delElement(B, !0);
      }), delete this.modules[A], delete this.mData.elements[A], A;
    } else
      return this.modules[A] ? (delete this.modules[A], delete this.mData.elements[A], A) : null;
  }
  // 配置模块
  setModule = function(A, I) {
    let t = this.mData.elements;
    if (A)
      return this.modules[A] || (this.modules[A] = wg(Object.assign({ id: A }, I)), t[A] = modules[A]), this.modules[A].components || (modules[A].components = []), this.modules[A];
    if (I) {
      let e = wg(I);
      return this.modules[e.id] = e, t[e.id] = this.modules[e.id], this.modules[e.id];
    } else
      return null;
  };
  // 返回某个模块
  getModule(A) {
    return A ? this.modules[A] : null;
  }
  // 返回当前所有
  getModules() {
    return this.modules;
  }
  /**
   * 返回当前所有（数组）
   * @param {string|function} filter 过滤键值，或自定义过滤方法
   * @param {string} key 过滤键名
   * @returns 
   */
  getModuleList(A, I = "type") {
    if (A) {
      let t = Object.values(this.modules);
      return typeof A == "string" ? t.filter((e) => e[I] == A) : typeof A == "function" ? t.filter((e) => A(e)) : t;
    } else
      return Object.values(this.modules);
  }
  /**
   * 返回模块中的所有元素
   * @param {*} mid 模块id
   * @param {*} source 是否是原始数据
   * @returns 
   */
  getMyElements(A = "default", I = !1) {
    if (this.modules[A] && this.modules[A].components) {
      let t = this.modules[A].components;
      return I ? t.map((e) => this.mData.getElement(e.id)) : t;
    } else
      return [];
  }
  // 清空所有模块数据
  clearModules() {
    Object.keys(this.modules).forEach((I) => {
      this.delModule(I);
    });
  }
}
class gE {
  // 数据管理
  mData = null;
  // 编组集合
  groups = {};
  constructor(A) {
    this.mData = A;
  }
  /**
   * 添加一个组合
   * @param {object} data 数据对象
   * @param {string} mid 模块id
   * @returns 
   */
  newGroup(A, I = "default") {
    if (A && typeof A == "object" && A.id && this.groups[A.id])
      return console.warn("组合" + A.id + "已存在"), null;
    let t = pg(Object.assign({ mid: I }, A));
    return this.groups[t.id] = t, this.mData.elements[t.id] = t, t.zIndex || (t.zIndex = this.mData.getMaxZIndex(I) + 1), this.mData.appendElement($I.call(this.mData, t), t.mid), this.mData.watchSimples(t), t;
  }
  /**
   * 删除组合，是否删除内部数据源
   * @param {string|array} val 
   * @param {boolean} clearSource 
   * @returns 
   */
  delGroup(A, I = !1) {
    if (Array.isArray(A))
      return A.forEach((t) => {
        this.delGroup(t, I);
      }), A;
    if (typeof A == "string") {
      let t = this.mData.modules, e = this.mData.unwatchs;
      if (this.groups[A]) {
        if (I) {
          let B = this.groups[A].components;
          Array.isArray(B) && B.length > 0 && this.mData.delSprite(B.map((Q) => Q.id));
        }
        return t.delElement(this.groups[A].id, this.groups[A].mid), delete this.groups[A], delete this.mData.elements[A], e[A] && typeof e[A] == "function" && e[A](), A;
      }
    }
    return !1;
  }
  // 项组合添加元素（元素、组合的基本属性）
  addElement(A, I) {
    I && A && typeof A != "string" && (this.groups[I] && this.groups[I].components ? this.groups[I].components.push(A) : console.warn("模块添加元素数据失败"));
  }
  // 从组合中删除元素
  delElement(A, I) {
    let t = !1;
    return I && A && this.groups[I] && this.groups[I].components && (t = X(this.groups[I].components, "id", A)), t || console.warn("模块删除元素数据失败"), t;
  }
  /**
   * 创建新组合并加入已有元素
   * @param {array} ids 需要绑定编组的元素id
   * @param {string} mid 当前模块id
   * @returns 
   */
  newBindGroup(A, I = "default") {
    if (Array.isArray(A)) {
      let t = this.mData.elements, e = this.mData.modules, B = this.mData.sprites, Q = this.mData.esSimple, C = { x1: 0, y1: 0, x2: 0, y2: 0 }, E = e.getMyElements(I), n = [], s = [];
      if (A.forEach((o) => {
        /^group_/.test(o) ? n.push(...this.unbindGroup(o)) : n.push(o);
      }), n.forEach((o, l) => {
        let D = E.find((u) => u.id == o), G = D ? D.type == "group" ? this.groups[o] : t[o] : null;
        G ? l == 0 ? (C.x1 = G.x, C.y1 = G.y, C.x2 = G.x + G.width, C.y2 = G.y + G.height) : (C.x1 = G.x < C.x1 ? G.x : C.x1, C.y1 = G.y < C.y1 ? G.y : C.y1, C.x2 = G.x + G.width > C.x2 ? G.x + G.width : C.x2, C.y2 = G.y + G.height > C.y2 ? G.y + G.height : C.y2) : s.push(o);
      }), s.length > 0)
        return console.warn(s.join(), "元素无法组合"), !1;
      B.delSprite(n, !1);
      let a = this.newGroup({
        x: C.x1,
        y: C.y1,
        width: C.x2 - C.x1,
        height: C.y2 - C.y1
      }, I);
      return a ? (n.forEach((o, l) => {
        t[o] && (t[o].x -= C.x1, t[o].y -= C.y1, t[o].gpid = a.id, t[o].hover = !1, t[o].selected = !1, this.addElement(Q[o], a.id));
      }), a.selected = !0, a) : !1;
    } else
      return !1;
  }
  /**
   * 编组解绑，并删除这个组合
   * @param {*} gpid 组合id
   * @param {*} add 是否移除后添加到源有模块中
   * @returns 
   */
  unbindGroup(A, I = !0) {
    let t = this.mData.elements, e = this.mData.modules, B = this.mData.unwatchs, Q = this.mData.esSimple, C = this.groups[A], E = C.zIndex;
    if (A && C && C.components) {
      B[A] && typeof B[A] == "function" && B[A]();
      let n = [], s = C.components, a = e.getMyElements(C.mid);
      if (Array.isArray(a) && a.length > 0) {
        a = a.sort((D, G) => D.zIndex - G.zIndex);
        let o = a.findIndex((D) => D.id == C.id) + 1, l = s.length;
        for (let D = o, G = a.length; D < G; D++) {
          let u = t[a[D].id];
          u && (u.zIndex += l);
        }
      }
      return this.delGroup(A), s.forEach((o, l) => {
        t[o.id].x += C.x, t[o.id].y += C.y, t[o.id].gpid = null, t[o.id].zIndex = E + l, n.push(o.id), I && e.addElement(Q[o.id], o.mid);
      }), n;
    }
    return !1;
  }
  // 配置组合
  setGroup = function(A, I) {
    if (A)
      return this.groups[A] ? Object.assign(this.groups[A], I) : (this.groups[A] = pg(Object.assign({ id: A }, I)), this.mData.elements[A] = this.groups[A]), this.groups[A];
    {
      let t = pg(I);
      return this.groups[t.id] = t, this.mData.elements[t.id] = t, t;
    }
  };
  /**
   * 返回某个组合
   * @param {string} id 
   * @returns 
   */
  getGroup(A) {
    return A ? this.groups[A] : null;
  }
  // 返回当前所有组合
  getGroups() {
    return this.groups;
  }
  // 返回当前所有（数组）
  getGroupList() {
    return Object.values(this.groups);
  }
  // 清空所有组件数据
  clearGroups() {
    Object.keys(this.groups).forEach((I) => {
      this.delGroup(I);
    });
  }
}
class IE {
  // 数据管理
  mData = null;
  // 元素集合
  sprites = {};
  constructor(A) {
    this.mData = A;
  }
  /**
   * 添加一个元素（或新建一个元素）
   * @param {*} data 
   * @param {*} mid 
   * @param {*} gpid 
   * @returns 
   */
  addSprite(A, I = "default", t = null) {
    let e = null;
    return typeof A == "string" && typeof I == "object" ? e = this.setSprite(A, I) : typeof A == "object" && (e = this.setSprite(A, { mid: I, gpid: t })), this.appendSprite(e) ? e : null;
  }
  setSprite(A, I) {
    let t = this.mData.component, e = this.mData.elements, B = this.sprites;
    if (typeof A == "string" && t.iComponents[A]) {
      let Q = rI(t, A, I);
      return B[Q.id] = Q, e[Q.id] = Q, Q;
    } else if (typeof A == "object") {
      if (A.id && B[A.id])
        return I ? Object.assign(B[A.id], I) : console.warn("元素" + A.id + "已存在"), B[A.id];
      if (A.name) {
        let Q = rI(t, A.name, Object.assign({}, A, I));
        return B[Q.id] = Q, e[Q.id] = Q, B[Q.id];
      } else
        return console.error("元素添加失败", A), null;
    } else
      return null;
  }
  appendSprite(A) {
    let I = this.mData.modules, t = this.mData.groups;
    if (!A)
      return console.warn("添加元素失败,无数据信息"), !1;
    if (!A.mid)
      return console.warn("添加元素失败,无模块id" + mid), !1;
    A.zIndex || (A.zIndex = this.mData.getMaxZIndex(A.mid) + 1);
    let e = $I.call(this.mData, A);
    if (A.gpid && t.setGroup(A.gpid))
      t.addElement(e, A.gpid);
    else if (I.setModule(A.mid))
      I.addElement(e, A.mid);
    else
      return console.warn("添加元素失败，无法加入组或模块", e), !1;
    return this.mData.watchSimples(A), A;
  }
  // 删除单个元素
  delOneSprite(A, I = !0) {
    let t = this.mData.elements, e = this.mData.modules, B = this.mData.groups, Q = this.mData.unwatchs, C = this.sprites;
    if (C[A]) {
      let E = null;
      return C[A].gid ? E = B.delElement(A, C[A].gid) : C[A].mid && (E = e.delElement(A, C[A].mid)), I && (delete C[A], delete t[A], E && Q[A] && typeof Q[A] == "function" && Q[A]()), !!E;
    } else
      console.warn("删除模块内元素失败");
    return !1;
  }
  // 删除元素
  delSprite(A, I = !0) {
    if (A) {
      if (Array.isArray(A))
        return A.forEach((t) => {
          this.delOneSprite(t, I);
        }), !0;
      if (typeof A == "string")
        return this.delOneSprite(A, I);
    }
    return !1;
  }
  // 返回元素数据集合（以id键名）
  getSprites() {
    return this.sprites;
  }
  /**
   * 返回元素数据集合（数组）
   * @param {string} mid 模块id
   * @returns 
   */
  getSpriteList(A) {
    let I = Object.values(this.sprites);
    return A ? I.filter((t) => t.mid == A) : I;
  }
  // 返回元素数据
  getSprite(A) {
    if (A && this.sprites[A]) {
      let I = this.mData.component.getDefaultData(this.sprites[A].name);
      return Object.assign(this.sprites[A], Object.assign({}, I, this.sprites[A])), this.sprites[A];
    } else
      return null;
  }
  // 清空所有组件数据
  clearSprites() {
    Object.keys(this.sprites).forEach((I) => {
      this.clearSpriteData(this.sprites[I]), this.delSprite(I);
    });
  }
  // 清空组件内部数据
  clearSpriteData(A) {
    Object.keys(A).forEach((t) => {
      delete A[t];
    });
  }
}
const At = function(g, A, I) {
  if (g && typeof g == "object") {
    let t = b(g), e = A || t.mid;
    if (t.type == "group" && e) {
      let B = [];
      t.components && (B = t.components, delete t.components);
      let Q = this.newGroup(t, e);
      return B.forEach((C) => {
        At.call(this, C, e, Q.id);
      }), Q;
    } else
      return e ? this.addSprite(t, e, I) : (console.warn("缺少页面数据"), !1);
  } else
    return g && typeof g == "string" ? this.addSprite(g, A, I) : (console.warn("添加失败"), !1);
}, tE = function(g, A = !0) {
  let I = this.sprites.sprites, t = this.groups.groups;
  if (I[g])
    return this.sprites.delSprite(g, A);
  if (t[g])
    return this.groups.delGroup(g, A);
}, eE = function(g, A) {
  return this.modules.modules[A] ? this.modules.addElement(g, A) : this.groups.groups[A] ? this.groups.addElement(g, A) : null;
}, BE = function(g, A) {
  return this.modules.modules[A] ? this.modules.delElement(g, A) : this.groups.groups[A] ? this.groups.delElement(g, A) : null;
}, QE = function(g) {
  Array.isArray(g) && g.length > 0 ? g.forEach((A) => {
    let I = [];
    typeof A == "object" && A.components && (I = A.components, delete A.components), this.newMoule(A), I.forEach((t) => {
      if (t.type == "group") {
        let e = [];
        t.components && (e = t.components, delete t.components), this.newGroup(t, A.id), e.forEach((B) => {
          this.addSprite(B, A.id, B.gpid);
        });
      } else
        this.addSprite(t, A.id);
    });
  }) : this.newMoule({ id: "default" });
}, iE = function(g) {
  let A = this.unwatchs, I = this.esSimple;
  g && (A[g.id] = JI(g, (t) => {
    I[t.id] && Object.keys(I[t.id]).forEach((B) => {
      I[t.id][B] = t[B];
    });
  }));
};
class CE {
  AppSetup = null;
  component = null;
  // 模块管理
  modules = null;
  // 组合管理
  groups = null;
  // 元素管理
  sprites = null;
  // 所有元素集合
  elements = {};
  // 元素数据集合（简单副本）
  esSimple = U({});
  // 监听对象
  unwatchs = {};
  // -------------------
  constructor(A, I) {
    this.AppSetup = A.app.AppSetup, this.component = A.app.component, this.modules = new AE(this), this.groups = new gE(this), this.sprites = new IE(this), I && this.fillData(I);
  }
  // 填充数据
  fillData(A) {
    QE.call(this, A);
  }
  // 添加元素
  addElement() {
    return At.call(this, ...arguments);
  }
  // 删除元素数据
  delElement() {
    return tE.call(this, ...arguments);
  }
  // 返回单个元素
  getElement(A) {
    return this.elements[A];
  }
  // 返回所有元素（含编组）的数组列表
  getElements() {
    return [...this.groups.getGroupList(), ...this.sprites.getSpriteList()];
  }
  // 添加已有元素到容器
  appendElement() {
    return eE.call(this, ...arguments);
  }
  // 移除容器内的已有元素
  removeElement() {
    return BE.call(this, ...arguments);
  }
  // 新建模块
  newMoule() {
    return this.modules.newMoule(...arguments);
  }
  // 删除模块
  delModule() {
    return this.modules.delModule(...arguments);
  }
  // 返回模块
  getModule() {
    return this.modules.getModule(...arguments);
  }
  // 返回所有模块键值对集合
  getModules() {
    return this.modules.getModules(...arguments);
  }
  // 返回所有模块数组列表
  getModuleList() {
    return this.modules.getModuleList(...arguments);
  }
  // 返回模块内所有元素
  getMyElements() {
    return this.modules.getMyElements(...arguments);
  }
  // 清除所有模块
  clearModules() {
    return this.modules.clearModules(...arguments);
  }
  // 添加一个新的组合
  newGroup() {
    return this.groups.newGroup(...arguments);
  }
  // 返回组合对象
  getGroup() {
    return this.groups.getGroup(...arguments);
  }
  // 返回所有组合的键值对集合
  getGroups() {
    return this.groups.getGroups(...arguments);
  }
  // 返回所有组合的数组集合
  getGroupList() {
    return this.groups.getGroupList(...arguments);
  }
  // 编组(创建新组合并加入已有元素)
  bindGroup() {
    return this.groups.newBindGroup(...arguments);
  }
  // 解绑恢复
  unbindGroup() {
    return this.groups.unbindGroup(...arguments);
  }
  // 清除所有组合
  clearGroups() {
    return this.groups.clearGroups(...arguments);
  }
  // 添加元素
  addSprite() {
    return this.sprites.addSprite(...arguments);
  }
  // 删除元素
  delSprite() {
    return this.sprites.delSprite(...arguments);
  }
  // 返回单个元素
  getSprite() {
    return this.sprites.getSprite(...arguments);
  }
  // 返回所有元素键值对集合
  getSprites() {
    return this.sprites.getSprites(...arguments);
  }
  // 返回所有元素数组列表
  getSpriteList() {
    return this.sprites.getSpriteList(...arguments);
  }
  // 监听原始数据信息到副本
  watchSimples() {
    iE.call(this, ...arguments);
  }
  // 清空所有元素
  clearSprites() {
    return this.sprites.clearSprites(...arguments);
  }
  // 返回模块内元素的当前最大深度
  getMaxZIndex(A) {
    return KI(this.getMyElements(A));
  }
  // 清空所有内容数据
  clearData() {
    this.sprites.clearSprites(), this.groups.clearGroups(), this.modules.clearModules();
  }
}
class EE {
  // 动作数据集合
  actions = U({});
  appData = null;
  constructor(A, I) {
    this.appData = A, I && this.fillData(I);
  }
  // 填充数据
  fillData(A) {
    Array.isArray(A) && A.forEach((I) => {
      this.setActionData(I);
    });
  }
  /**
   * 创建新动作
   * @param {string} actionName 动作名称
   * @param {object} option 覆盖参数
   * @returns 
   */
  createActionData(A, I) {
    let t = GA.actions.find((E) => E.action == A);
    if (!t)
      return console.warn(e + " 动作不存在"), null;
    let e = A, B = I.target || "", Q = I.value || t.value, C = I.description || t.description;
    return t.target == "component" && !C && (C = t.name + this.appData.getElement(B).title), this.setActionData({ action: e, target: B, value: Q, description: C });
  }
  // 修改动作数据
  editActionData(A) {
    return A.id ? this.setActionData(A) : (console.warn("没有要修改的动作信息"), null);
  }
  // 添加动作数据
  setActionData(A) {
    if (A && typeof A == "object") {
      let I = ZC(A);
      return this.actions[I.id] = I, I.id;
    } else
      return null;
  }
  // 删除动作数据
  delActionData = function(A) {
    this.actions[A] && delete this.actions[A];
  };
  // 返回动作数据
  getActionData = function(A) {
    return this.actions[A];
  };
  // 返回当前所有
  getActionsData = function() {
    return this.actions;
  };
  // 返回当前所有（数组）
  getActionList = function(A) {
    if (A) {
      let I = [];
      if (A instanceof Array)
        for (const t in A)
          I.push(this.actions[A[t]]);
      else
        typeof A == "string" && this.actions[A] && I.push(this.actions[A]);
      return I;
    } else
      return Object.values(this.actions);
  };
  /**
   * 清空数据
   */
  clearData = function() {
    Object.keys(this.actions).forEach((I) => {
      delete this.actions[I];
    });
  };
}
const Gg = function(g) {
  return U({
    get id() {
      return g.id || "";
    },
    get type() {
      return g.type || "";
    },
    name: g.name,
    value: g.value,
    uptime: g.uptime || ""
  });
};
class nE {
  // 数据集合
  data = {};
  dataList = U([]);
  appData = null;
  constructor(A, I) {
    this.appData = A, I && this.fillData(I);
  }
  // 填充数据
  fillData(A) {
    this.addGData({ id: "GD_query", name: "url参数", type: "temp", value: { data: OI() } }), Array.isArray(A) && A.forEach((I) => {
      this.addGData(I);
    });
  }
  /**
   * 新增一个数据对象
   * @param {*} value 值
   * @param {*} name 名称
   * @param {*} type 类型
   * @returns 
   */
  addGData = function(A, I = "", t = "source") {
    const e = this.appData.rData;
    if (iA(A) && A.id)
      return this.data[A.id] ? this.data[A.id] : (A.type == "remote" ? (A.value = e.addRemote(A.value).id, this.data[A.id] = Gg(A)) : this.data[A.id] = Gg(A), this.dataList.push(this.data[A.id]), this.data[A.id]);
    if (A) {
      let B = {};
      return t == "remote" ? (A = e.addRemote(A).id, B = aI({ value: A, name: I, type: t })) : B = aI({ value: A, name: I, type: t }), this.data[B.id] = Gg(B), this.dataList.push(this.data[B.id]), this.data[B.id];
    } else
      return console.warn("无效全局数据添加"), !1;
  };
  /**
   * 编辑一个数据对象
   * @param {string|object} res 
   * @param {object} value 
   * @returns 
   */
  editGData = function(A, I) {
    let t = null;
    if (typeof A == "string" && iA(I) && this.data[A] ? (t = A, this.data[t] = I) : iA(A) && typeof A.id == "string" && this.data[A.id] && (t = A.id, this.data[t] = A), t) {
      let e = this.dataList.findIndex((B) => B.id == t);
      if (e > -1)
        return this.dataList[e] = this.data[t];
    }
    return !1;
  };
  // 删除一个数据对象
  delGData = function(A) {
    this.data[A] && (X(this.dataList, "id", A), delete this.data[A]);
  };
  // 返回一个数据对象
  getGData = function(A) {
    return this.data[A] || null;
  };
  // 返回所有数据列表(数组)
  getGDataList = function() {
    return this.dataList;
  };
  // 清空数据
  clearData = function() {
    Object.keys(this.data).forEach((I) => {
      delete this.data[I];
    }), this.dataList.splice(0, this.dataList.length);
  };
  get GData() {
    return this.data;
  }
}
class sE {
  // 数据集合
  data = U({});
  appData = null;
  constructor(A, I) {
    this.appData = A, I && this.fillData(I);
  }
  // 填充数据
  fillData(A) {
    if (typeof A != "object")
      return;
    let I = Object.keys(A);
    Array.isArray(I) && I.forEach((t) => {
      this.data[t] = A[t];
    });
  }
  /**
   * 为事件添加一个动作
   * @param {string} actionId 动作id
   * @param {string} eventName 事件名称，通过元素id添加动作时，必须包含一个事件名称
   */
  addGAction = function(A, I = "launch") {
    let t = GA.appEvents.find((e) => e.event == I);
    t ? (this.data[I] || (this.data[I] = JSON.parse(JSON.stringify(t))), this.data[I].actions.findIndex((e) => e == A) < 0 ? this.data[I].actions.push(A) : console.warn(A + "当前动作已存在")) : console.warn("当前应用中" + I + "事件不存在");
  };
  /**
   * 编辑一个数据对象
   * 编辑当前元素向触发的动作传值
   * @param {*} actionId 
   * @param {*} eventName 
   * @param {*} value 
   * @returns 
   */
  editGAction = function(A, I, t) {
    I && (this.data[I] ? typeof t < "u" && (this.data[I].actionValue || (this.data[I].actionValue = {}), this.data[I].actionValue[A] = t) : console.warn("当前应用中" + I + "事件不存在"));
  };
  /**
   * 删除事件上的动作
   * @param {*} eventName 事件名称
   * @param {string} actionId  动作id
   * @returns 
   */
  delGAction = function(A = "", I) {
    if (this.data[A] && I) {
      let t = this.data[A].actions.findIndex((e) => e == I);
      t > -1 && this.data[A].actions.splice(t, 1);
    } else if (this.data[A])
      return delete this.data[A], A;
  };
  // 返回一个数据对象
  getGAction = function(A) {
    return A ? this.data[A] : this.data;
  };
  // 清空数据
  clearData = function() {
    Object.keys(this.data).forEach((I) => {
      delete this.data[I];
    });
  };
}
class aE {
  remotes = U([]);
  appData = null;
  constructor(A, I) {
    this.appData = A, I && this.fillData(I);
  }
  // 填充数据
  fillData(A) {
    Array.isArray(A) && A.forEach((I) => {
      this.addRemote(I);
    });
  }
  addRemote() {
    let A = Qg.call(this, ...arguments);
    return A || (A = VI.call(this.appData, ...arguments), A && A.id && this.remotes.findIndex((I) => I == A.id) < 0 && this.remotes.push(A.id)), A;
  }
  delRemote() {
    let A = Bg.call(this, ...arguments);
    if (typeof A == "string" && this.remotes[A]) {
      let I = this.remotes.findIndex((t) => t == t);
      I >= 0 && this.remotes.splice(I, 1);
    }
    return A;
  }
  getRemote() {
    return Qg.call(this, ...arguments);
  }
  requestData() {
    return WI.call(this, ...arguments);
  }
  createExtractRule() {
    return PI.call(this, ...arguments);
  }
  getRemoteList() {
    return this.remotes.map((A) => S[A].getData());
  }
  // 清空数据
  clearData() {
    this.remotes.forEach((A) => {
      Bg(A);
    }), this.remotes.splice(0, this.remotes.length);
  }
}
class oE {
  // 数据集合
  data = {};
  dataList = U([]);
  appData = null;
  constructor(A, I) {
    this.appData = A, I && this.fillData(I);
  }
  // 填充数据
  fillData(A) {
    Array.isArray(A) && A.forEach((I) => {
      this.addPlugin(I);
    });
  }
  addPlugin(A) {
    if (iA(A)) {
      if (A.id && this.data[A.id])
        return console.warn("插件存在"), null;
      if (A.url) {
        let I = PC(A);
        return this.data[I.id] = I, this.dataList.push(I), this.data[I.id];
      }
    }
    return console.warn("插件添加失败", A), null;
  }
  delPlugin(A) {
    if (this.data[A])
      X(this.dataList, "id", A), delete this.data[A];
    else if (A) {
      let t = Object.values(this.data).find((e) => e.url == A);
      t && this.data[t.id] && (X(this.dataList, "id", t.id), delete this.data[t.id]);
    }
  }
  // 返回一个数据对象
  getPlugin = function(A) {
    return this.data[A];
  };
  // 返回所有数据列表(数组)
  getPluginList = function() {
    return this.dataList;
  };
  // 清空数据
  clearData = function() {
    Object.keys(this.data).forEach((I) => {
      delete this.data[I];
    }), this.dataList.splice(0, this.dataList.length);
  };
}
/*! js-cookie v3.0.5 | MIT */
function VA(g) {
  for (var A = 1; A < arguments.length; A++) {
    var I = arguments[A];
    for (var t in I)
      g[t] = I[t];
  }
  return g;
}
var rE = {
  read: function(g) {
    return g[0] === '"' && (g = g.slice(1, -1)), g.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(g) {
    return encodeURIComponent(g).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function mg(g, A) {
  function I(e, B, Q) {
    if (!(typeof document > "u")) {
      Q = VA({}, A, Q), typeof Q.expires == "number" && (Q.expires = new Date(Date.now() + Q.expires * 864e5)), Q.expires && (Q.expires = Q.expires.toUTCString()), e = encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var C = "";
      for (var E in Q)
        Q[E] && (C += "; " + E, Q[E] !== !0 && (C += "=" + Q[E].split(";")[0]));
      return document.cookie = e + "=" + g.write(B, e) + C;
    }
  }
  function t(e) {
    if (!(typeof document > "u" || arguments.length && !e)) {
      for (var B = document.cookie ? document.cookie.split("; ") : [], Q = {}, C = 0; C < B.length; C++) {
        var E = B[C].split("="), n = E.slice(1).join("=");
        try {
          var s = decodeURIComponent(E[0]);
          if (Q[s] = g.read(n, s), e === s)
            break;
        } catch {
        }
      }
      return e ? Q[e] : Q;
    }
  }
  return Object.create(
    {
      set: I,
      get: t,
      remove: function(e, B) {
        I(
          e,
          "",
          VA({}, B, {
            expires: -1
          })
        );
      },
      withAttributes: function(e) {
        return mg(this.converter, VA({}, this.attributes, e));
      },
      withConverter: function(e) {
        return mg(VA({}, this.converter, e), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(A) },
      converter: { value: Object.freeze(g) }
    }
  );
}
var cE = mg(rE, { path: "/" });
const hE = function() {
  return mI(() => {
    if (this.AppSetup.scale)
      if (this.info.scaleMode == "auto") {
        let g = { width: this.app.appInfo.value.width, height: this.app.appInfo.value.height };
        if (this.scale.w > this.scale.h) {
          let A = g.width * (this.scale.w - this.scale.h) / 2 / this.scale.value;
          return "scale(" + this.scale.value + ")  translateX(" + A + "px)";
        } else {
          let A = g.height * (this.scale.h - this.scale.w) / 2 / this.scale.value;
          return "scale(" + this.scale.value + ")  translateY(" + A + "px)";
        }
      } else
        return this.info.scaleMode == "fill" ? "scale(" + this.scale.w + "," + this.scale.h + ")" : "";
    else
      return "";
  });
}, lE = function() {
  this.unwatch.forEach((g) => g()), this.unwatch = [];
  for (const g in this.filterDatas)
    this.filterDatas[g] = null;
  this.filterDatas = {};
}, DE = function(g) {
  if (typeof g != "string")
    return g;
  if (/^RD_\S{10}$/.test(g) && S[g])
    return S[g].data;
  if (this.gData) {
    const { GData: A } = this.gData, I = this.unwatch, t = this.filterDatas;
    let e = g, B = null;
    if (/.\?+./.test(g)) {
      let Q = g.split("?");
      e = Q[0], B = Q[1];
    }
    if (/(^GD_\S{10})|(^GD_query)$/.test(e) && A[e])
      if (A[e].type == "remote") {
        let Q = Qg(A[e].value);
        return Q ? B ? (t[g] || (t[g] = ref(null), I.push(watch(Q.data, (C) => {
          t[g].value = bA(C.data || C, B);
        }, { immediate: !0 }))), t[g]) : Q.data : null;
      } else if (A[e].type == "local") {
        let Q = A[e].value, C = null;
        if (Q.source == "cookie")
          C = cE.get(Q.key);
        else {
          let E = Q.source == "local" ? localStorage.getItem(Q.key) : sessionStorage.getItem(Q.key);
          try {
            C = JSON.parse(E);
          } catch {
            C = E;
          }
        }
        return C && typeof C == "object" && B ? bA(C, B) : C;
      } else
        return B ? bA(A[e].value, B) : A[e].value;
  }
  return g;
};
class uE {
  // 应用配置
  AppSetup = _C();
  // 应用
  app = null;
  // vue实例
  vapp = null;
  // 应用信息
  info = XC();
  // 原始数据
  iData = {};
  // 管理舞台元素数据
  mData = null;
  // 管理动作事件数据
  aData = null;
  // app事件管理
  eData = null;
  // 管理全局数据
  gData = null;
  // 管理接口数据
  rData = null;
  // 插件管理
  pData = null;
  // 监听对象
  unwatch = [];
  // 过滤器
  filterDatas = {};
  constructor(A, I) {
    this.app = A, Object.assign(this.AppSetup, I), this.scale = U({ value: 1, h: 1, w: 1 }), this.transform = hE.call(this), this.mData = new CE(this), this.aData = new EE(this), this.eData = new sE(this), this.rData = new aE(this), this.gData = new nE(this), this.pData = new oE(this);
  }
  init(A) {
    this.app.vapp && (this.vapp = this.app.vapp, this.vapp.dom && (this.AppSetup.dom = this.vapp.dom)), this.splitData(A), this.initData(), this.resetScale(), window.addEventListener("resize", () => this.resetScale());
  }
  // 缩放比例更新
  resetScale() {
    let A = { width: this.app.appInfo.value.width, height: this.app.appInfo.value.height };
    Object.assign(this.scale, qI(this.AppSetup.dom, A));
  }
  // 拆分数据
  splitData(A) {
    this.iData = {};
    let I = A ? b(A) : {};
    ["modules", "actions", "globalData", "remote", "plugins", "events"].forEach((e) => {
      I[e] ? (this.iData[e] = I[e], delete I[e]) : this.iData[e] = [];
    }), this.iData.info = I;
  }
  initData() {
    return this.iData && (this.initAppInfo(this.iData.info), this.mData.fillData(this.iData.modules), this.aData.fillData(this.iData.actions), this.eData.fillData(this.iData.events), this.rData.fillData(this.iData.remote), this.gData.fillData(this.iData.globalData), this.pData.fillData(this.iData.plugins), p.emit(Y.DATA_LOADED, this), this.rData.requestData(!0)), this;
  }
  initAppInfo(A) {
    Object.assign(this.info, A);
  }
  requestRemote() {
    this.rData.requestData(!0);
  }
  // 返回元素
  getElement(A) {
    return this.mData.getElement(A);
  }
  // 模块列表
  getModuleList() {
    return this.mData.getModuleList(...arguments);
  }
  // 元素列表
  getElementList() {
    return this.mData.getElements(...arguments);
  }
  // 动作列表
  getActionList() {
    return this.aData.getActionList(...arguments);
  }
  // 数据列表
  getGDataList() {
    return this.gData.getGDataList(...arguments);
  }
  // 接口列表
  getRemoteList() {
    return this.rData.getRemoteList(...arguments);
  }
  // 返回数据
  getAppData() {
    return {
      info: this.info,
      scale: this.scale,
      transform: this.transform
    };
  }
  // 返回所有数据
  getData() {
    return VC(this);
  }
  // 数据源处理
  getDataSource() {
    return DE.call(this, ...arguments);
  }
  // 清除所有数据
  clearDataAll() {
    this.mData.clearData(), this.aData.clearData(), this.gData.clearData(), this.rData.clearData(), this.pData.clearData(), this.eData.clearData(), lE.call(this);
  }
}
function uA(g, A) {
  let I = b(g.getActionList(A.actions));
  return A.actionValue && typeof A.actionValue == "object" && I.forEach((t) => {
    A.actionValue[t.id] && (t.value = g.getDataSource(A.actionValue[t.id]));
  }), I;
}
function fE(g, A) {
  const I = this.AppSetup, t = this.data, e = this.data.info.id, B = A.id;
  return {
    style: {
      cursor: I.clickCursor
    },
    onClickCapture: function(Q) {
      if (p.emit(Y.CLICK_SPRITE, v(A), Q), g.actions) {
        let C = uA(t, g);
        p.execute(C, B, e);
      }
    }
  };
}
const cI = function(g, A, I) {
  const t = this.info.id;
  let e = b(this.getActionList(g));
  for (let B = 0, Q = e.length; B < Q; B++)
    I && e[B].value && typeof e[B].value == "object" ? Object.assign(e[B].value, I) : I && (e[B].value = I);
  p.execute(e, A, t);
};
function dE(g, A, I) {
  const t = this.data, e = this.data.aData, B = this.component.iComponents, Q = this.data.info.id, C = A.id;
  let E = {};
  if (I && B[I]) {
    let s = (B[I].emits || []).find((a) => a == g.event);
    s && typeof s == "string" ? /^[a-zA-Z][-_a-zA-Z0-9_-]{1,32}$/.test(s) ? E["on" + s.toLowerCase().replace(/( |^)[a-z]/g, (a) => a.toUpperCase())] = function(a) {
      /^solo-/.test(s) && a ? g.actions && g.actions instanceof Array && g.actions.length > 0 ? cI.call(t, g.actions, C, a) : p.execute(b(e.getActionList(a)), C, Q) : g.actions && g.actions instanceof Array && cI.call(t, g.actions, C, a);
    } : console.warn(s + "无效的事件名定义") : console.warn(g.event + "事件没有定义");
  }
  return E;
}
function yE(g, A) {
  const I = this.data, t = this.data.info.id, e = A.id;
  let B = null;
  return {
    timeout: "1",
    onTimeout(Q) {
      let C = Q.detail.value;
      if (B && (clearTimeout(B), B = null), C == "mounted") {
        let n = (g.pams || {}).delay || 1e3;
        B = setTimeout(() => {
          g.actions && p.execute(uA(I, g), e, t);
        }, parseInt(n));
      }
    }
  };
}
function wE(g, A) {
  const I = this.data, t = this.data.info.id, e = A.id;
  let B = null;
  return {
    interval: "1",
    onInterval(Q) {
      if (B && (oA.del(B), B = null), Q.detail.value == "mounted") {
        let E = (g.pams || {}).delay || 1e3;
        B = oA.add(() => {
          g.actions && p.execute(uA(I, g), e, t);
        }, parseInt(E));
      }
    }
  };
}
function Yg(g) {
  const { myApp: A = {}, events: I, data: t = {}, componentName: e = "" } = g;
  let B = {};
  return e && (B = {
    style: {}
  }), A.AppSetup && A.AppSetup.interaction ? I.forEach((Q) => {
    switch (Q.event) {
      case "click":
        Object.assign(B, fE.call(A, Q, t));
        break;
      case "timeout":
        Object.assign(B, yE.call(A, Q, t));
        break;
      case "interval":
        Object.assign(B, wE.call(A, Q, t));
        break;
      default:
        Object.assign(B, dE.call(A, Q, t, e));
    }
  }) : t.type == "group" && !t.gpid ? Object.assign(B, {
    onClickCapture(Q) {
      Q.stopPropagation(), p.emit(Y.CLICK_SPRITE, v(t), Q);
    },
    onDblclickCapture(Q) {
      Q.stopPropagation(), p.emit(Y.DBLCLICK_SPRITE, v(t), Q);
    },
    onMousedownCapture(Q) {
      p.emit(Y.MOUSEDOWN_SPRITE, v(t), Q);
    },
    onMouseoverCapture(Q) {
      p.emit(Y.MOUSEOVER_SPRITE, v(t), Q);
    },
    onMouseoutCapture(Q) {
      p.emit(Y.MOUSEOUT_SPRITE, v(t), Q);
    },
    onMouseupCapture(Q) {
      p.emit(Y.MOUSEUP_SPRITE, v(t), Q);
    },
    onMouseleaveCapture(Q) {
      p.emit(Y.MOUSELEAVE_SPRITE, v(t), Q);
    },
    onMouseenterCapture(Q) {
      p.emit(Y.MOUSEENTER_SPRITE, v(t), Q);
    }
  }) : Object.assign(B, {
    onClick(Q) {
      Q.stopPropagation(), p.emit(Y.CLICK_SPRITE, v(t), Q);
    },
    onMousedown(Q) {
      p.emit(Y.MOUSEDOWN_SPRITE, v(t), Q);
    },
    onMouseover(Q) {
      p.emit(Y.MOUSEOVER_SPRITE, v(t), Q);
    },
    onMouseout(Q) {
      p.emit(Y.MOUSEOUT_SPRITE, v(t), Q);
    },
    onMouseup(Q) {
      p.emit(Y.MOUSEUP_SPRITE, v(t), Q);
    },
    onMouseleave(Q) {
      p.emit(Y.MOUSELEAVE_SPRITE, v(t), Q);
    },
    onMouseenter(Q) {
      p.emit(Y.MOUSEENTER_SPRITE, v(t), Q);
    }
  }), B;
}
function j(g) {
  const { name: A, props: I, slots: t, ref: e } = g, B = {
    AppSetup: K("AppSetup"),
    data: K("data"),
    component: K("component")
  }, Q = B.data.mData;
  let C = A, E = null;
  if (C ? (E = ut(C), E == C && (console.warn(E + "组件没有找到"), E = "div")) : (console.warn("数据缺少组件" + I), E = "div"), typeof I == "string") {
    const n = Q.getElement(I);
    if (!n)
      return;
    let s = { id: I, options: n.options, ref: e };
    if (n.id) {
      let a = { myApp: B, events: n.events || [], data: n, componentName: C };
      Object.assign(s, Yg(a));
    }
    if (n.data) {
      let a = B.data.getDataSource(n.data);
      a && (s.data = sg(a) && a.data || a);
    }
    return R(E, s);
  } else if (typeof I < "u") {
    let n = { ...I };
    if (I.events) {
      let s = { myApp: B, events: I.events || [], data: I, componentName: C };
      Object.assign(n, Yg(s));
    }
    return n.ref = e || n.id, n.name && delete n.name, n.mid && delete n.mid, R(E, n, t);
  } else
    return R(E, {}, "");
}
const WA = function(g, A, I, t) {
  g && g.getAttribute && g.getAttribute(A) && g.dispatchEvent(new CustomEvent(A, {
    detail: {
      component: I,
      value: t
    }
  }));
}, pE = function(g, A, I) {
  let t = null;
  YI(() => {
    A.id && p.addEventListener(`run_function_${A.id}`, (e) => {
      g.child && g.child.value && g.child.value.cmdRunning && g.child.value.cmdRunning(e);
    }), g.value && g.value.el && (t = g.value.el, WA(t, "timeout", g.value, "mounted"), WA(t, "interval", g.value, "mounted"));
  }), UI(() => {
    A.id && p.removeEventListener(`run_function_${A.id}`), t && (WA(t, "timeout", g.value, "beforeUnmount"), WA(t, "interval", g.value, "beforeUnmount"));
  });
}, GE = function(g) {
  YI(() => {
    if (p.emit(Y.STAGE_MOUNTED), g.AppSetup.interaction) {
      const A = g.info.id, I = g.eData.getGAction("launch"), t = g.eData.getGAction("interval"), e = g.eData.getGAction("timeout");
      if (I && Array.isArray(I.actions) && p.execute(uA(g, I), "app", A), t && Array.isArray(t.actions)) {
        let B = t.pams && t.pams.delay || 1e3;
        oA.add(() => p.execute(uA(g, t), "app", A), parseInt(B));
      }
      if (e && Array.isArray(e.actions)) {
        let B = e.pams && e.pams.delay || 1e3;
        Ng.add(() => p.execute(uA(g, e), "app", A), parseInt(B));
      }
    }
  }), UI(() => {
    oA.del(), Ng.del();
  });
}, ME = {
  name: "stage",
  props: {
    background: {
      type: Object,
      default() {
        return {};
      }
    },
    content: {
      type: Object,
      default() {
        return {};
      }
    },
    fixed: {
      type: Object,
      default() {
        return {};
      }
    },
    overlayer: {
      type: Object,
      default() {
        return {};
      }
    },
    popwin: {
      type: Object,
      default() {
        return {};
      }
    },
    slots: [Object, Array]
  },
  setup(g) {
    const A = K("data"), I = K("appInfo"), t = A.mData.modules.getModules(), e = A.getAppData(), B = ft(g.slots) ? [g.slots] : [];
    return B.length == 0 && (Array.isArray(g.slots) ? g.slots.forEach((Q) => {
      B.push(R(Q));
    }) : g.slots && B.push(R(g.slots))), GE(A), () => {
      var Q = [];
      const C = [], E = [], n = [];
      for (const o in t)
        if (t.hasOwnProperty.call(t, o)) {
          const l = t[o];
          (typeof l.visible > "u" || l.visible == !0) && (l.type == "content" ? C.push(l) : l.type == "fixed" ? E.push(l) : l.type == "overlayer" && n.push(l));
        }
      Q.push(j({ name: "vx-background", props: g.background }), ...B), C.length > 0 && Q.push(j({ name: "vx-content", props: { modules: C } })), E.length > 0 && Q.push(j({ name: "vx-fixed", props: { modules: E } })), n.length > 0 && (Q.unshift(j({ name: "vx-mask" })), Q.push(j({ name: "vx-overlayer", props: { modules: n } }))), Q.push(j({ name: "vx-popwin", props: g.popwin })), Q.push(j({ name: "vx-message" }));
      let s = b(I.value.background);
      if (s && s.backgroundColor && /\blinear-gradient\(([^()]*|\([^()]*\))*\)/.test(s.backgroundColor)) {
        let o = s.backgroundColor;
        delete s.backgroundColor, s.backgroundImage ? s.backgroundImage = s.backgroundImage + "," + o : s.backgroundImage = o;
      }
      let a = {
        position: "absolute",
        width: I.value.width ? I.value.width + "px" : "100%",
        height: I.value.height ? I.value.height + "px" : "100%",
        top: 0,
        left: 0,
        transformOrigin: "0 0",
        transform: e.transform.value,
        zIndex: 0,
        userSelect: "none",
        overflow: "hidden",
        ...s
      };
      return R("div", {
        id: "vx-stage",
        style: a,
        onclick(o) {
          p.emit(Y.CLICK_STAGE, o);
        }
      }, Q);
    };
  }
};
function $A(g, A, I, t) {
  g && g.getAttribute && g.getAttribute(A) && g.dispatchEvent(new CustomEvent(A, {
    detail: {
      component: I,
      value: t
    }
  }));
}
const tA = {
  props: {
    id: { type: String, default: "" },
    // 是否可见
    visible: { type: Boolean, default: !0 },
    // 横坐标
    x: { type: Number, default: 0 },
    // 纵坐标
    y: { type: Number, default: 0 },
    // 宽度
    width: { type: Number, default: 0 },
    // 高度
    height: { type: Number, default: 0 },
    // 透明
    opacity: { type: Number, default: 100 },
    // 角度
    angle: { type: Number, default: 0 },
    // 边框
    border: { type: Object, default() {
      return {};
    } },
    // 内边距
    padding: { type: String, default: "" },
    // 背景
    background: { type: Object, default() {
      return {};
    } },
    // 阴影
    shadow: { type: Object, default() {
      return {};
    } },
    // 深度
    zIndex: { type: Number, default: 0 },
    // 事件名称
    events: { type: Array, default() {
      return [];
    } },
    // 附加配置项
    options: { type: Object, default() {
      return {};
    } },
    // 是否被选中
    selected: { type: Boolean, default: !1 },
    // 锁
    lock: { type: Boolean, default: !1 },
    // 划过
    hover: { type: Boolean, default: !1 },
    // 捆绑玉约束
    bind: { type: Boolean, default: !1 },
    // 动效
    anim: { type: Object, default() {
      return {};
    } },
    // 数据
    data: [String, Number, Object, Array],
    // 标题（说明）
    title: String
  },
  computed: {
    rect() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    },
    style() {
      let g = typeof this.anim == "object" && this.anim.options ? this.anim.options : {};
      return {
        position: "absolute",
        width: this.width > 0 ? this.width + "px" : "auto",
        height: this.height > 0 ? this.height + "px" : "auto",
        top: this.y + "px",
        left: this.x + "px",
        zIndex: this.selected ? 1e5 + this.zIndex : this.zIndex,
        transform: "rotate(" + this.angle + "deg)",
        opacity: this.opacity / 100,
        padding: this.padding,
        ...this.border,
        ...this.background,
        ...this.shadow,
        ...g
      };
    }
  },
  created() {
    this.id && p.addEventListener(`run_function_${this.id}`, (g) => {
      this.cmdRunning && this.cmdRunning(g);
    });
  },
  mounted() {
    $A(this.$el, "timeout", this, "mounted"), $A(this.$el, "interval", this, "mounted");
  },
  beforeUnmount() {
    this.id && p.removeEventListener(`run_function_${this.id}`), $A(this.$el, "timeout", this, "beforeUnmount"), $A(this.$el, "interval", this, "beforeUnmount");
  }
};
function NE(g) {
  let A = typeof g.anim == "object" && g.anim.options ? g.anim.options : {}, I = b(g.background);
  if (I && I.backgroundColor && /\blinear-gradient\(([^()]*|\([^()]*\))*\)/.test(I.backgroundColor)) {
    let t = I.backgroundColor;
    delete I.backgroundColor, I.backgroundImage ? I.backgroundImage = I.backgroundImage + "," + t : I.backgroundImage = t;
  }
  return {
    position: "absolute",
    width: g.width > 0 ? g.width + "px" : "80px",
    height: g.height > 0 ? g.height + "px" : "80px",
    top: g.y + "px",
    left: g.x + "px",
    zIndex: g.selected ? 1e5 + g.zIndex : g.zIndex,
    transform: "rotate(" + g.angle + "deg)",
    opacity: g.opacity / 100,
    padding: g.padding,
    overflow: g.overflow || "visible",
    filter: g.filter || "",
    ...I,
    ...g.border,
    ...g.shadow,
    ...A
  };
}
function gt(g, { id: A, myApp: I }) {
  const t = NE(g), e = Yg({ myApp: I, events: g.events || [], data: g, componentName: "" }), B = ["element_sprite", { element_selected: g.selected }, { element_hover: g.hover }];
  return g.anim && g.anim.name && I.AppSetup.interaction && (B.push(g.anim.name), g.anim.init && typeof g.anim.init == "object" && Object.assign(t, g.anim.init)), e.style && (Object.assign(t, e.style), delete e.style), { id: A, ...e, style: t, class: B };
}
const vA = {
  name: "vx-sprite",
  props: {
    id: String,
    layout: Object
  },
  setup(g, A) {
    const I = { value: null, child: bg(null) }, t = K("AppSetup"), e = K("data"), B = K("component"), Q = U({ x: 0, y: 0, width: 0, height: 0 });
    return dt("rect", Q), pE(I, g), () => {
      const C = e.getElement(g.id);
      Q.x = C.x, Q.y = C.y, Q.width = C.width, Q.height = C.height;
      let E = gt(C, { id: g.id, myApp: { AppSetup: t, data: e, component: B } }), n = j({ name: C.name, props: C.id, ref: I.child });
      return g.layout && g.layout.type == "grid" && (E.style.position = "relative", E.style.top = "auto", E.style.left = "auto"), E.id = E.id + "_outer", I.value = R("div", E, n), I.value;
    };
  }
}, Ug = {
  name: "vx-sprite-group",
  props: {
    id: String,
    layout: Object
  },
  setup(g) {
    const A = K("AppSetup"), I = K("data"), t = K("component");
    return (e) => {
      const B = I.getElement(g.id);
      let Q = gt(B, { id: g.id, myApp: { AppSetup: A, data: I, component: t } }), C = B.data;
      B.data && (C = I.getDataSource(B.data), C && sg(C) && (C = C.data)), g.layout && g.layout.type == "grid" && (Q.style.position = "relative", Q.style.top = "auto", Q.style.left = "auto");
      const E = [];
      return B.components && B.components.forEach((n, s) => {
        n.visible && (B.cstatus && B.childstatus ? B.childstatus[n.id] && B.childstatus[n.id] == C && E.push(R(vA, { id: n.id })) : E.push(R(vA, { id: n.id })));
      }), Q.id = Q.id + "_outer", R("div", Q, E);
    };
  }
}, FE = {
  extends: tA,
  name: "vx-module",
  props: ["components", "layout"],
  setup(g) {
    const A = K("AppSetup"), I = K("data"), t = K("appInfo");
    I.getAppData();
    const { components: e } = yt(g);
    return (B) => {
      const Q = [];
      e.value && e.value.forEach((E, n) => {
        if (E.visible)
          if (A.develop && g.layout && g.layout.type == "grid") {
            let s = null;
            E.type == "group" ? s = R(Ug, { id: E.id, layout: g.layout }) : s = R(vA, { id: E.id, layout: g.layout }), Q.push(R("div", { className: "rd_page_grid_wrapper" }, s));
          } else
            E.type == "group" ? Q.push(R(Ug, { id: E.id, layout: g.layout })) : Q.push(R(vA, { id: E.id, layout: g.layout }));
      });
      let C = B.style;
      if (g.layout && g.layout.type == "grid") {
        let E = B.style.width == "auto" ? t.value.width + "px" : B.style.width, n = B.style.height == "auto" ? t.value.height + "px" : B.style.height;
        C = Object.assign({}, B.style, {
          position: "fixed",
          display: "grid",
          overflow: g.layout.rows ? "auto" : "hidden auto",
          gridTemplateColumns: g.layout.colums || "none",
          gridTemplateRows: g.layout.rows || "none",
          gridTemplateAreas: g.layout.areas || "none",
          width: E,
          height: n
        }), C.gridTemplateRows == "none" && (C.maxHeight = C.height, delete C.height);
      }
      return R("div", {
        id: B.id,
        style: C
      }, Q);
    };
  }
}, kE = {
  extends: tA,
  name: "vx-plane",
  props: ["components"],
  setup() {
    return (g) => {
      const A = [];
      return g.components && g.components.forEach((I, t) => {
        I.visible && A.push(j({ name: I.name, props: I.id }));
      }), R("div", {
        id: g.id,
        style: g.style
      }, A);
    };
  }
}, SE = {
  extends: tA,
  name: "vx-popwin",
  render() {
    return R("div", {
      id: "vx-popwin",
      style: {
        position: "absolute",
        width: "100%",
        zIndex: 5e4
      }
    });
  }
};
let RE = {
  position: "absolute",
  width: "auto",
  height: "auto",
  top: 0,
  left: 0,
  zIndex: 1e4
};
const JE = {
  extends: tA,
  name: "vx-content",
  props: ["modules"],
  setup(g) {
    return () => {
      const A = g.modules, I = [];
      for (const t in A)
        if (A.hasOwnProperty.call(A, t)) {
          const e = A[t];
          (typeof e.visible > "u" || e.visible == !0) && I.push(j({ name: "vx-module", props: e }));
        }
      return R("div", {
        id: "vx-content",
        style: RE
      }, I);
    };
  }
};
let mE = {
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 2e4
};
const YE = {
  extends: tA,
  name: "vx-fixed",
  props: ["modules"],
  setup(g) {
    return () => {
      const A = g.modules, I = [];
      for (const t in A)
        if (A.hasOwnProperty.call(A, t)) {
          const e = A[t];
          (typeof e.visible > "u" || e.visible == !0) && I.push(j({ name: "vx-module", props: e }));
        }
      return R("div", {
        id: "vx-fixed",
        style: mE
      }, I);
    };
  }
};
let UE = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 4e4
};
const LE = {
  exports: tA,
  name: "vx-overlayer",
  props: ["modules"],
  setup(g) {
    return () => {
      const A = g.modules, I = [];
      for (const t in A)
        if (A.hasOwnProperty.call(A, t)) {
          const e = A[t];
          (typeof e.visible > "u" || e.visible == !0) && I.push(j({ name: "vx-module", props: e }));
        }
      return R("div", {
        id: "vx-overlayer",
        style: UE
      }, I);
    };
  }
};
let hI = {
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 99999999
}, HE = {
  width: "60%",
  lineHeight: "18px",
  borderRadius: "6px",
  backgroundColor: "rgba(255, 240, 0, 0.66)",
  textAlign: "center",
  padding: "8px 5px",
  margin: "5px auto",
  boxShadow: "1px 1px 1px #00000022",
  fontSize: "14px",
  animation: "0.4s ease 0s 1 normal none running vx_enter"
};
const bE = {
  extends: tA,
  name: "vx-message",
  setup() {
    const g = U([]);
    p.addEventListener("message-send", (I) => {
      g.length == 0 && A(), g.push(I);
    });
    const A = function() {
      setTimeout(() => {
        g.length > 0 && (g.splice(0, 1), g.length > 0 && A());
      }, 3e3);
    };
    return () => g.length > 0 ? R("div", {
      id: "vx-message",
      style: hI
    }, g.map((I) => R("div", { class: "message_item", style: HE }, I))) : R("div", {
      id: "vx-message",
      style: hI
    });
  }
}, xE = {
  exports: tA,
  name: "vx-mask",
  render() {
    return R("div", {
      id: "vx-mask",
      style: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, .8)",
        zIndex: 3e4
      },
      onClick: (A) => {
      }
    });
  }
};
let vE = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0)",
  zIndex: 1
};
const qE = {
  name: "vx-background",
  setup(g) {
    return () => {
      let A = Object.assign({}, vE, g.style);
      return R("div", {
        id: "vx-background",
        style: A,
        onmousedown: (I) => {
          p.emit(Y.MOUSEDOWN_BACKGROUND, I);
        },
        onmouseup: (I) => {
          p.emit(Y.MOUSEUP_BACKGROUND, I);
        },
        onclick: (I) => {
          p.emit(Y.CLICK_BACKGROUND, I);
        }
      });
    };
  }
}, KE = [FE, kE, SE, LE, JE, YE, bE, xE, qE, Ug, vA], OE = {
  install: (g) => {
    KE.forEach((A) => {
      g.component(A.name, A);
    });
  }
};
var zE = hg;
function TE() {
  this.__data__ = new zE(), this.size = 0;
}
var jE = TE;
function _E(g) {
  var A = this.__data__, I = A.delete(g);
  return this.size = A.size, I;
}
var XE = _E;
function ZE(g) {
  return this.__data__.get(g);
}
var PE = ZE;
function VE(g) {
  return this.__data__.has(g);
}
var WE = VE, $E = hg, An = jI, gn = _I, In = 200;
function tn(g, A) {
  var I = this.__data__;
  if (I instanceof $E) {
    var t = I.__data__;
    if (!An || t.length < In - 1)
      return t.push([g, A]), this.size = ++I.size, this;
    I = this.__data__ = new gn(t);
  }
  return I.set(g, A), this.size = I.size, this;
}
var en = tn, Bn = hg, Qn = jE, Cn = XE, En = PE, nn = WE, sn = en;
function kA(g) {
  var A = this.__data__ = new Bn(g);
  this.size = A.size;
}
kA.prototype.clear = Qn;
kA.prototype.delete = Cn;
kA.prototype.get = En;
kA.prototype.has = nn;
kA.prototype.set = sn;
var an = kA, on = Xg, rn = function() {
  try {
    var g = on(Object, "defineProperty");
    return g({}, "", {}), g;
  } catch {
  }
}(), It = rn, lI = It;
function cn(g, A, I) {
  A == "__proto__" && lI ? lI(g, A, {
    configurable: !0,
    enumerable: !0,
    value: I,
    writable: !0
  }) : g[A] = I;
}
var Pg = cn, hn = Pg, ln = rg;
function Dn(g, A, I) {
  (I !== void 0 && !ln(g[A], I) || I === void 0 && !(A in g)) && hn(g, A, I);
}
var tt = Dn;
function un(g) {
  return function(A, I, t) {
    for (var e = -1, B = Object(A), Q = t(A), C = Q.length; C--; ) {
      var E = Q[g ? C : ++e];
      if (I(B[E], E, B) === !1)
        break;
    }
    return A;
  };
}
var fn = un, dn = fn, yn = dn(), wn = yn, ig = {}, pn = {
  get exports() {
    return ig;
  },
  set exports(g) {
    ig = g;
  }
};
(function(g, A) {
  var I = rA, t = A && !A.nodeType && A, e = t && !0 && g && !g.nodeType && g, B = e && e.exports === t, Q = B ? I.Buffer : void 0, C = Q ? Q.allocUnsafe : void 0;
  function E(n, s) {
    if (s)
      return n.slice();
    var a = n.length, o = C ? C(a) : new n.constructor(a);
    return n.copy(o), o;
  }
  g.exports = E;
})(pn, ig);
var Gn = rA, Mn = Gn.Uint8Array, Nn = Mn, DI = Nn;
function Fn(g) {
  var A = new g.constructor(g.byteLength);
  return new DI(A).set(new DI(g)), A;
}
var kn = Fn, Sn = kn;
function Rn(g, A) {
  var I = A ? Sn(g.buffer) : g.buffer;
  return new g.constructor(I, g.byteOffset, g.length);
}
var Jn = Rn;
function mn(g, A) {
  var I = -1, t = g.length;
  for (A || (A = Array(t)); ++I < t; )
    A[I] = g[I];
  return A;
}
var Yn = mn, Un = cA, uI = Object.create, Ln = function() {
  function g() {
  }
  return function(A) {
    if (!Un(A))
      return {};
    if (uI)
      return uI(A);
    g.prototype = A;
    var I = new g();
    return g.prototype = void 0, I;
  };
}(), Hn = Ln, bn = Object.prototype;
function xn(g) {
  var A = g && g.constructor, I = typeof A == "function" && A.prototype || bn;
  return g === I;
}
var et = xn, vn = Hn, qn = xI, Kn = et;
function On(g) {
  return typeof g.constructor == "function" && !Kn(g) ? vn(qn(g)) : {};
}
var zn = On, Tn = KA, jn = pA, _n = "[object Arguments]";
function Xn(g) {
  return jn(g) && Tn(g) == _n;
}
var Zn = Xn, fI = Zn, Pn = pA, Bt = Object.prototype, Vn = Bt.hasOwnProperty, Wn = Bt.propertyIsEnumerable, $n = fI(function() {
  return arguments;
}()) ? fI : function(g) {
  return Pn(g) && Vn.call(g, "callee") && !Wn.call(g, "callee");
}, Qt = $n, As = 9007199254740991;
function gs(g) {
  return typeof g == "number" && g > -1 && g % 1 == 0 && g <= As;
}
var it = gs, Is = _g, ts = it;
function es(g) {
  return g != null && ts(g.length) && !Is(g);
}
var Vg = es, Bs = Vg, Qs = pA;
function is(g) {
  return Qs(g) && Bs(g);
}
var Cs = is, qA = {}, Es = {
  get exports() {
    return qA;
  },
  set exports(g) {
    qA = g;
  }
};
function ns() {
  return !1;
}
var ss = ns;
(function(g, A) {
  var I = rA, t = ss, e = A && !A.nodeType && A, B = e && !0 && g && !g.nodeType && g, Q = B && B.exports === e, C = Q ? I.Buffer : void 0, E = C ? C.isBuffer : void 0, n = E || t;
  g.exports = n;
})(Es, qA);
var as = KA, os = it, rs = pA, cs = "[object Arguments]", hs = "[object Array]", ls = "[object Boolean]", Ds = "[object Date]", us = "[object Error]", fs = "[object Function]", ds = "[object Map]", ys = "[object Number]", ws = "[object Object]", ps = "[object RegExp]", Gs = "[object Set]", Ms = "[object String]", Ns = "[object WeakMap]", Fs = "[object ArrayBuffer]", ks = "[object DataView]", Ss = "[object Float32Array]", Rs = "[object Float64Array]", Js = "[object Int8Array]", ms = "[object Int16Array]", Ys = "[object Int32Array]", Us = "[object Uint8Array]", Ls = "[object Uint8ClampedArray]", Hs = "[object Uint16Array]", bs = "[object Uint32Array]", J = {};
J[Ss] = J[Rs] = J[Js] = J[ms] = J[Ys] = J[Us] = J[Ls] = J[Hs] = J[bs] = !0;
J[cs] = J[hs] = J[Fs] = J[ls] = J[ks] = J[Ds] = J[us] = J[fs] = J[ds] = J[ys] = J[ws] = J[ps] = J[Gs] = J[Ms] = J[Ns] = !1;
function xs(g) {
  return rs(g) && os(g.length) && !!J[as(g)];
}
var vs = xs;
function qs(g) {
  return function(A) {
    return g(A);
  };
}
var Ks = qs, Cg = {}, Os = {
  get exports() {
    return Cg;
  },
  set exports(g) {
    Cg = g;
  }
};
(function(g, A) {
  var I = HI, t = A && !A.nodeType && A, e = t && !0 && g && !g.nodeType && g, B = e && e.exports === t, Q = B && I.process, C = function() {
    try {
      var E = e && e.require && e.require("util").types;
      return E || Q && Q.binding && Q.binding("util");
    } catch {
    }
  }();
  g.exports = C;
})(Os, Cg);
var zs = vs, Ts = Ks, dI = Cg, yI = dI && dI.isTypedArray, js = yI ? Ts(yI) : zs, Ct = js;
function _s(g, A) {
  if (!(A === "constructor" && typeof g[A] == "function") && A != "__proto__")
    return g[A];
}
var Et = _s, Xs = Pg, Zs = rg, Ps = Object.prototype, Vs = Ps.hasOwnProperty;
function Ws(g, A, I) {
  var t = g[A];
  (!(Vs.call(g, A) && Zs(t, I)) || I === void 0 && !(A in g)) && Xs(g, A, I);
}
var $s = Ws, Aa = $s, ga = Pg;
function Ia(g, A, I, t) {
  var e = !I;
  I || (I = {});
  for (var B = -1, Q = A.length; ++B < Q; ) {
    var C = A[B], E = t ? t(I[C], g[C], C, I, g) : void 0;
    E === void 0 && (E = g[C]), e ? ga(I, C, E) : Aa(I, C, E);
  }
  return I;
}
var ta = Ia;
function ea(g, A) {
  for (var I = -1, t = Array(g); ++I < g; )
    t[I] = A(I);
  return t;
}
var Ba = ea, Qa = 9007199254740991, ia = /^(?:0|[1-9]\d*)$/;
function Ca(g, A) {
  var I = typeof g;
  return A = A ?? Qa, !!A && (I == "number" || I != "symbol" && ia.test(g)) && g > -1 && g % 1 == 0 && g < A;
}
var nt = Ca, Ea = Ba, na = Qt, sa = OA, aa = qA, oa = nt, ra = Ct, ca = Object.prototype, ha = ca.hasOwnProperty;
function la(g, A) {
  var I = sa(g), t = !I && na(g), e = !I && !t && aa(g), B = !I && !t && !e && ra(g), Q = I || t || e || B, C = Q ? Ea(g.length, String) : [], E = C.length;
  for (var n in g)
    (A || ha.call(g, n)) && !(Q && // Safari 9 has enumerable `arguments.length` in strict mode.
    (n == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    e && (n == "offset" || n == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    B && (n == "buffer" || n == "byteLength" || n == "byteOffset") || // Skip index properties.
    oa(n, E))) && C.push(n);
  return C;
}
var Da = la;
function ua(g) {
  var A = [];
  if (g != null)
    for (var I in Object(g))
      A.push(I);
  return A;
}
var fa = ua, da = cA, ya = et, wa = fa, pa = Object.prototype, Ga = pa.hasOwnProperty;
function Ma(g) {
  if (!da(g))
    return wa(g);
  var A = ya(g), I = [];
  for (var t in g)
    t == "constructor" && (A || !Ga.call(g, t)) || I.push(t);
  return I;
}
var Na = Ma, Fa = Da, ka = Na, Sa = Vg;
function Ra(g) {
  return Sa(g) ? Fa(g, !0) : ka(g);
}
var st = Ra, Ja = ta, ma = st;
function Ya(g) {
  return Ja(g, ma(g));
}
var Ua = Ya, wI = tt, La = ig, Ha = Jn, ba = Yn, xa = zn, pI = Qt, GI = OA, va = Cs, qa = qA, Ka = _g, Oa = cA, za = iA, Ta = Ct, MI = Et, ja = Ua;
function _a(g, A, I, t, e, B, Q) {
  var C = MI(g, I), E = MI(A, I), n = Q.get(E);
  if (n) {
    wI(g, I, n);
    return;
  }
  var s = B ? B(C, E, I + "", g, A, Q) : void 0, a = s === void 0;
  if (a) {
    var o = GI(E), l = !o && qa(E), D = !o && !l && Ta(E);
    s = E, o || l || D ? GI(C) ? s = C : va(C) ? s = ba(C) : l ? (a = !1, s = La(E, !0)) : D ? (a = !1, s = Ha(E, !0)) : s = [] : za(E) || pI(E) ? (s = C, pI(C) ? s = ja(C) : (!Oa(C) || Ka(C)) && (s = xa(E))) : a = !1;
  }
  a && (Q.set(E, s), e(s, E, t, B, Q), Q.delete(E)), wI(g, I, s);
}
var Xa = _a, Za = an, Pa = tt, Va = wn, Wa = Xa, $a = cA, Ao = st, go = Et;
function at(g, A, I, t, e) {
  g !== A && Va(A, function(B, Q) {
    if (e || (e = new Za()), $a(B))
      Wa(g, A, Q, I, at, t, e);
    else {
      var C = t ? t(go(g, Q), B, Q + "", g, A, e) : void 0;
      C === void 0 && (C = B), Pa(g, Q, C);
    }
  }, Ao);
}
var Io = at;
function to(g) {
  return g;
}
var ot = to;
function eo(g, A, I) {
  switch (I.length) {
    case 0:
      return g.call(A);
    case 1:
      return g.call(A, I[0]);
    case 2:
      return g.call(A, I[0], I[1]);
    case 3:
      return g.call(A, I[0], I[1], I[2]);
  }
  return g.apply(A, I);
}
var Bo = eo, Qo = Bo, NI = Math.max;
function io(g, A, I) {
  return A = NI(A === void 0 ? g.length - 1 : A, 0), function() {
    for (var t = arguments, e = -1, B = NI(t.length - A, 0), Q = Array(B); ++e < B; )
      Q[e] = t[A + e];
    e = -1;
    for (var C = Array(A + 1); ++e < A; )
      C[e] = t[e];
    return C[A] = I(Q), Qo(g, this, C);
  };
}
var Co = io;
function Eo(g) {
  return function() {
    return g;
  };
}
var no = Eo, so = no, FI = It, ao = ot, oo = FI ? function(g, A) {
  return FI(g, "toString", {
    configurable: !0,
    enumerable: !1,
    value: so(A),
    writable: !0
  });
} : ao, ro = oo, co = 800, ho = 16, lo = Date.now;
function Do(g) {
  var A = 0, I = 0;
  return function() {
    var t = lo(), e = ho - (t - I);
    if (I = t, e > 0) {
      if (++A >= co)
        return arguments[0];
    } else
      A = 0;
    return g.apply(void 0, arguments);
  };
}
var uo = Do, fo = ro, yo = uo, wo = yo(fo), po = wo, Go = ot, Mo = Co, No = po;
function Fo(g, A) {
  return No(Mo(g, A, Go), g + "");
}
var ko = Fo, So = rg, Ro = Vg, Jo = nt, mo = cA;
function Yo(g, A, I) {
  if (!mo(I))
    return !1;
  var t = typeof A;
  return (t == "number" ? Ro(I) && Jo(A, I.length) : t == "string" && A in I) ? So(I[A], g) : !1;
}
var Uo = Yo, Lo = ko, Ho = Uo;
function bo(g) {
  return Lo(function(A, I) {
    var t = -1, e = I.length, B = e > 1 ? I[e - 1] : void 0, Q = e > 2 ? I[2] : void 0;
    for (B = g.length > 3 && typeof B == "function" ? (e--, B) : void 0, Q && Ho(I[0], I[1], Q) && (B = e < 3 ? void 0 : B, e = 1), A = Object(A); ++t < e; ) {
      var C = I[t];
      C && g(A, C, t, B);
    }
    return A;
  });
}
var xo = bo, vo = Io, qo = xo, Ko = qo(function(g, A, I) {
  vo(g, A, I);
}), kI = Ko;
class Oo {
  app = null;
  // 所有已安装组件
  iComponents = {};
  // 所有已安装组件的信息内容
  iComponentsInfo = U({});
  // 所有组件
  componentItems = [];
  constructor(A) {
    this.app = A;
  }
  // 返回组件列表
  getItems() {
    return Object.values(this.iComponents);
  }
  // 返回组件默认数据
  getDefaultData(A) {
    let I = this.iComponents[A];
    if (!I)
      return {};
    let t = {}, e = I.mixins || [], B = {};
    for (const Q of e)
      Q.props && Object.assign(B, Q.props);
    Object.assign(B, I.props);
    for (const Q in B)
      if (Object.hasOwnProperty.call(B, Q)) {
        const C = B[Q];
        typeof C.default == "function" ? t[Q] = C.default.call() : t[Q] = C.default;
      }
    return t.id = "sprite_" + T(10), t.name = A, t.type = I.type || "", t;
  }
  // 返回组件自定义事件
  getMyEvents(A) {
    let I = this.iComponents[A];
    if (!I)
      return [];
    let t = [], e = I.emits || [];
    for (const B in e)
      t.push({
        name: e[B],
        event: e[B],
        pams: "",
        actions: /^solo-/.test(A) ? null : []
      });
    return t;
  }
  // 返回组件事件（含默认事件）
  getEvents(A) {
    return [...GA.events, ...this.getMyEvents(A)];
  }
  // 添加组件（放入未安装列表）
  add(A) {
    return A ? Array.isArray(A) ? (A.forEach((I) => {
      this.componentItems.find((t) => t.name == I.name) ? console.warn(I.name + "组件名重复") : this.componentItems.push(I);
    }), !0) : this.componentItems.find((I) => I.name == A.name) ? (console.warn(A.name + "组件名重复"), !1) : (this.componentItems.push(A), !0) : !1;
  }
  // 删除组件
  del(A) {
    A && typeof A == "string" ? (X(this.componentItems, "name", A), this.iComponents[A] && (delete this.iComponents[A], delete this.iComponentsInfo[A])) : Array.isArray(A) && A.forEach((I) => this.del(I));
  }
  // 删除所有组件
  removeAll() {
    this.del(Object.keys(this.iComponents));
  }
  // 安装组件（注册组件到vue实例上）
  __install(A) {
    if (A && A.name)
      if (this.iComponents[A.name])
        console.warn("重复组件名:" + A.name);
      else {
        let I = kI({}, A);
        this.iComponents[A.name] = I, this.iComponentsInfo[I.name] = {
          name: I.name,
          type: I.type,
          label: I.label,
          icon: I.icon
        }, this.app && this.app.vapp ? this.app.vapp.component(A.name, I) : console.error("组件注册失败，缺少vapp");
      }
    else
      Array.isArray(A) ? A.forEach((I) => this.__install(I)) : A && console.warn("缺少组件名");
  }
  // 安装组件
  install(A) {
    A ? Array.isArray(A) ? Array.isArray(A) && A.forEach((I) => this.install(I)) : this.add(A) && this.__install(A) : this.__install(this.componentItems);
  }
  // 重装组件（一般应用与vue实例变更）
  reload() {
    Object.values(this.iComponents).forEach((I) => {
      this.app && this.app.vapp ? (this.iComponents[I.name] = kI({}, tA, I), this.app.vapp.component(I.name, this.iComponents[I.name])) : console.error("组件注册失败，缺少app");
    });
  }
}
const zo = function() {
  return {
    // 更新元素原始数据
    reviewData(g, A) {
      if (A && A.id) {
        console.warn(A.id + "不能替换");
        return;
      }
      Object.assign(g, A);
    },
    // 显示元素
    show(g, A) {
      g && (Array.isArray(g) ? g.forEach((I) => {
        I.visible = A;
      }) : g.visible = A);
    },
    // 切换显示
    toggle(g) {
      g && (Array.isArray(g) ? g.forEach((A) => {
        A.visible = !A.visible;
      }) : g.visible = !g.visible);
    },
    // 更新元素传递数据
    sendData(g, A) {
      g && (Array.isArray(g) ? g.forEach((I) => {
        I.data = A;
      }) : g.data = A);
    },
    // 链接跳转
    href(g, A = "_blank") {
      g && (A == "a" ? window.location.href = g : window.open(g, A));
    },
    // 模块切换显示
    singleModule(g, A) {
      g.filter((I) => I.type == "content").forEach((I) => {
        I.id == A ? I.visible = !0 : I.visible = !1;
      });
    },
    // 开关弹窗页面
    popup(g, A) {
      return g && g.type == "overlayer" && (typeof A == "boolean" ? g.visible = A : g.visible = !g.visible), g;
    }
  };
}, LA = GA.actions, To = function(g) {
  return {
    name: g.name || "无名动作",
    action: g.action || null,
    target: g.target || "component",
    valueType: g.valueType || null,
    value: g.value || ""
  };
}, SI = function(g, A, I) {
  if (this.actions[g]) {
    let { data: { mData: t } } = this.app, e = LA.find((B) => B.action == g);
    if (e) {
      let B = {};
      e.target == "component" || e.target == "components" ? A instanceof Array ? (B = [], A.forEach((Q) => {
        B.push(t.getElement(Q));
      })) : A && (B = t.getElement(A)) : e.target == "app" ? B = data.getAppData() : e.target == "url" ? B = A : e.target == "modules" ? B = t.getModuleList() : e.target == "module" && (B = t.getModule(A)), this.actions[g].call(this.app, B, I);
    } else {
      let B = t.getElement(A) || t.getModule(A);
      B && (targetData = B), this.actions[g].call(this.app, targetData, I);
    }
  } else
    console.warn(g + "动作不存在");
}, RI = {
  // 元素动作
  [dA.ACTION](g) {
    g.data && g.appid == this.app.id && (g.data instanceof Array ? g.data.forEach((A) => {
      SI.call(this, A.action, A.target, A.value);
    }) : g.data instanceof Object && typeof g.data != "function" && SI.call(this, g.data.action, g.data.target, g.data.value));
  },
  // 应用动作
  [dA.APP_ACTION]() {
  }
};
class jo {
  app = null;
  // 动作方法集合
  actions = zo();
  // 外部插件添加的动作（用于可删除操作）
  uses = {};
  constructor(A) {
    this.app = A;
  }
  /**
   * 添加一个动作
   * @param {object} _config 
   */
  useAction(A) {
    let I = To(A);
    LA.find((t) => t.action == I.action) ? console.warn(A, "已存在") : I.action && A.handle ? this.actions[I.action] ? console.warn(I.action + "动作已存在") : (LA.push(I), this.actions[I.action] = A.handle, this.uses[I.action] = I) : I.action ? console.warn(A, "缺少动作方法函数") : console.warn(A, "缺少action名称");
  }
  // 删除动作
  remove(A) {
    if (this.uses[A]) {
      let I = LA.findIndex((t) => t.action == A);
      I > -1 && LA.splice(I, 1), delete this.actions[A], delete this.uses[A];
    }
  }
  // 删除所有动作
  removeAll() {
    Object.keys(this.uses).forEach((I) => {
      this.remove(I);
    });
  }
}
function _o(g) {
  const A = new jo(g);
  for (const I in dA) {
    let t = dA[I];
    RI[t] && p.addEventListener(t, RI[t], A);
  }
  return A;
}
const Xo = function(g, A) {
  const I = this.appData.getElement(g), t = I ? I.gpid || I.mid : null, e = t ? this.appData.getElement(t) : null;
  if (e && Array.isArray(e.components) && typeof A < "u") {
    let B = e.components.findIndex((Q) => Q.id == g);
    if (B > -1 && e.components[A]) {
      let Q = e.components.splice(B, 1);
      return e.components.splice(A, 0, Q[0]), !0;
    }
  }
  return !1;
}, Zo = function(g, A = "up") {
  const { mData: I } = this.appData, t = I.elements, e = I.getElement(g);
  if (e) {
    if (!e.mid) {
      console.warn("页面上找不到" + g);
      return;
    }
  } else {
    console.warn("元素不存在" + g);
    return;
  }
  let B = I.getMyElements(e.mid).map((Q) => ({
    id: Q.id,
    zIndex: Q.zIndex
  })).sort((Q, C) => C.zIndex - Q.zIndex);
  if (A == "up") {
    let Q = B.findIndex((C) => C.id == g);
    if (Q > 0) {
      let C = B[Q - 1].id, E = t[C].zIndex;
      t[C].zIndex = t[g].zIndex, t[g].zIndex = E;
    }
  } else if (A == "down") {
    let Q = B.findIndex((C) => C.id == g);
    if (Q < B.length - 1 && Q > -1) {
      let C = B[Q + 1].id, E = t[C].zIndex;
      t[C].zIndex = t[g].zIndex, t[g].zIndex = E;
    }
  } else if (A == "top") {
    let Q = B.findIndex((C) => C.id == g);
    if (Q > 0) {
      t[g].zIndex = B[0].zIndex;
      for (let C = 0; C < Q; C++)
        t[B[C].id].zIndex--;
    }
  } else if (A == "bottom") {
    let Q = B.findIndex((C) => C.id == g);
    if (Q < B.length - 1 && Q > -1) {
      t[g].zIndex = B[B.length - 1].zIndex;
      for (let C = Q + 1, E = B.length; C < E; C++)
        t[B[C].id].zIndex++;
    }
  }
}, Po = function(g, A, I = null) {
  const { mData: t } = this.appData, e = t.getSprites(), B = t.getGroups();
  if (e[g]) {
    let Q = b(e[g]);
    return Q.title += "_c", delete Q.id, delete Q.zIndex, Object.assign(Q, A), t.addSprite(Q, Q.mid, I);
  } else if (B[g]) {
    let Q = b(B[g]);
    Q.title += "_c", delete Q.id, delete Q.zIndex, Object.assign(Q, A);
    let C = [];
    Q.components && Array.isArray(Q.components) && (C = Q.components.sort((n, s) => n.zIndex - s.zIndex), delete Q.components);
    let E = t.newGroup(Q, Q.mid);
    return C.forEach((n, s) => {
      let a = E.zIndex + 1 + s;
      this.copyAdd(n.id, { gpid: E.id, zIndex: a }, E.id);
    }), E;
  }
}, Vo = function(g, A) {
  const { mData: I } = this.appData, t = I.getSprites(), e = I.getGroups();
  if (t[g]) {
    let B = b(t[g]);
    return B.title += "_c", A && (delete B.id, delete B.gpid, delete B.mid, delete B.zIndex, delete B.lock, delete B.bind, typeof B.data == "string" && /(^GD_\S{10})|(^GD_query)|(^RD_\S{10})$/.test(B.data) && (B.data = ""), B.events = []), B;
  } else if (e[g]) {
    let B = b(e[g]);
    return B.title += "_c", A && (delete B.id, delete B.gpid, delete B.mid, delete B.zIndex), Array.isArray(B.components) && (B.components = B.components.map((Q) => this.copy(Q.id, A))), B;
  }
}, Wo = function(g, A) {
  const { mData: I } = this.appData;
  I.getModuleList().forEach((t) => {
    if (A) {
      if (typeof A == "string") {
        if (t.id == A)
          return;
      } else if (A instanceof Array && A.find((e) => e == t.id))
        return;
    }
    t.type != "fixed" && (t.id == g ? t.visible = !0 : t.visible = !1);
  });
}, $o = function(g, A) {
  const { component: I } = this.app;
  let t = GA.events.find((e) => e.event == g) || I.getMyEvents(A).find((e) => e.event == g);
  return t ? b(t) : !1;
}, Ar = function(g, A, I = !1) {
  let t = this.appData.getElement(g);
  return A ? I ? t.events ? t.events.findIndex((e) => e.event == A) : -1 : t.events ? t.events.find((e) => e.event == A) : null : t.events || null;
}, gr = function(g, A, I) {
  const t = this.appData;
  let e = this.getEvent(g, A);
  if (e)
    return e;
  let B = t.getElement(g), Q = this.newEventData(A, B.name);
  return B && Q ? (B.events || (B.events = []), I && (Q.pams = I), B.events.push(Q), B.events[B.events.length - 1]) : (console.warn(B ? A + "事件名称不对" : "缺少组件数据"), null);
}, Ir = function(g, A, I) {
  const t = this.appData;
  let e = this.getEvent(g, A, !0);
  if (e > -1) {
    let B = t.getElement(g);
    return B.events[e].pams = I, B.events[e];
  }
  return null;
}, tr = function(g, A) {
  const I = this.appData;
  let t = this.getEvent(g, A, !0);
  if (t > -1) {
    let e = I.getElement(g);
    return e.events.splice(t, 1), e.events;
  }
  return null;
}, er = function(g, A, I = "") {
  if (A == "app")
    this.appData.eData.addGAction(g, I);
  else if (I && typeof A == "string") {
    let t = this.getEvent(A, I);
    return t ? t.actions.findIndex((e) => e == g) < 0 && t.actions.push(g) : console.warn(A + "中" + I + "事件不存在"), t;
  } else if (typeof A == "object" && A.actions && A.actions instanceof Array)
    return A.actions.push(g), A;
}, Br = function(g, A, I, t) {
  if (A == "app")
    this.appData.eData.editGAction(g, I, t);
  else if (I && typeof A == "string") {
    let e = this.getEvent(A, I);
    return e ? typeof t < "u" && (e.actionValue || (e.actionValue = {}), e.actionValue[g] = t) : console.warn(A + "中" + I + "事件不存在"), e;
  }
}, Qr = function(g, A, I = "", t = !1) {
  const e = this.appData;
  if (A == "app")
    this.appData.eData.delGAction(I, g);
  else if (I && typeof A == "string") {
    let B = this.getEvent(A, I);
    return B && X(B.actions, "", g), t && e.aData.delActionData(g), B;
  } else if (typeof A == "object" && A.actions && A.actions instanceof Array)
    return X(A.actions, "", g), t && e.aData.delActionData(g), A;
}, ir = function(g, A) {
  const I = this.appData;
  let t = [];
  if (g) {
    let e = I.getElement(g);
    if (Array.isArray(e.events))
      if (A) {
        let B = e.events.find((Q) => Q.event == A);
        B && (t = B.actions.map((Q) => ({
          sname: e.title,
          sid: e.id,
          event: B.event,
          id: Q
        })));
      } else
        t = e.events.map((B) => B.actions ? B.actions.map((Q) => ({
          sname: e.title,
          sid: e.id,
          event: B.event,
          id: Q
        })) : []).flat();
  } else
    t = I.mData.getSpriteList().map((e) => e.events && e.events.length > 0 ? e.events.map((B) => B.actions ? B.actions.map((Q) => ({
      sname: e.title,
      sid: e.id,
      event: B.event,
      id: Q
    })) : []).flat() : []).flat();
  return t;
};
function Cr(g, A) {
  let I = A ? JSON.stringify(A) : "{}";
  if (I) {
    const t = I.match(/\$\{(.+?)\}/g);
    if (t)
      t.forEach((e) => {
        let B = e.match(/\$\{(.+?)\}/);
        if (B && B[1]) {
          let Q = g.getDataSource(B[1]);
          if (Q)
            if (sg(Q)) {
              let C = Q.data || Q;
              I = I.replace(e, JSON.stringify(C));
            } else
              typeof Q == "string" ? I = I.replace(e, Q) : I = I.replace(e, JSON.stringify(Q));
        }
      });
    else
      return A;
  }
  return JSON.parse(I);
}
class Er {
  app = null;
  appData = null;
  constructor(A) {
    this.app = A, this.appData = A.data;
  }
  jsonData() {
    return b.call(this, ...arguments);
  }
  extractData() {
    return vg.call(this, ...arguments);
  }
  setIndex() {
    return Xo.call(this, ...arguments);
  }
  setZindex() {
    return Zo.call(this, ...arguments);
  }
  copy() {
    return Vo.call(this, ...arguments);
  }
  copyAdd() {
    return Po.call(this, ...arguments);
  }
  changeModuleShow() {
    return Wo.call(this, ...arguments);
  }
  newEventData() {
    return $o.call(this, ...arguments);
  }
  getEvent() {
    return Ar.call(this, ...arguments);
  }
  addEvent() {
    return gr.call(this, ...arguments);
  }
  editEvent() {
    return Ir.call(this, ...arguments);
  }
  removeEvent() {
    return tr.call(this, ...arguments);
  }
  addEventAction() {
    return er.call(this, ...arguments);
  }
  editEventAction() {
    return Br.call(this, ...arguments);
  }
  removeEventAction() {
    return Qr.call(this, ...arguments);
  }
  getSpriteActions() {
    return ir.call(this, ...arguments);
  }
  getBodyData() {
    return Jg.call(this, ...arguments);
  }
  handleOptions() {
    return Cr.call(this, this.appData, ...arguments);
  }
}
var Lg = function() {
}, Eg = {}, Wg = {}, ng = {};
function nr(g, A) {
  g = g.push ? g : [g];
  var I = [], t = g.length, e = t, B, Q, C, E;
  for (B = function(n, s) {
    s.length && I.push(n), e--, e || A(I);
  }; t--; ) {
    if (Q = g[t], C = Wg[Q], C) {
      B(Q, C);
      continue;
    }
    E = ng[Q] = ng[Q] || [], E.push(B);
  }
}
function rt(g, A) {
  if (g) {
    var I = ng[g];
    if (Wg[g] = A, !!I)
      for (; I.length; )
        I[0](g, A), I.splice(0, 1);
  }
}
function Hg(g, A) {
  g.call && (g = { success: g }), A.length ? (g.error || Lg)(A) : (g.success || Lg)(g);
}
function ct(g, A, I, t) {
  var e = document, B = I.async, Q = (I.numRetries || 0) + 1, C = I.before || Lg, E = g.replace(/[\?|#].*$/, ""), n = g.replace(/^(css|img|module|nomodule)!/, ""), s, a, o;
  if (t = t || 0, /(^css!|\.css$)/.test(E))
    o = e.createElement("link"), o.rel = "stylesheet", o.href = n, s = "hideFocus" in o, s && o.relList && (s = 0, o.rel = "preload", o.as = "style");
  else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(E))
    o = e.createElement("img"), o.src = n;
  else if (o = e.createElement("script"), o.src = n, o.async = B === void 0 ? !0 : B, a = "noModule" in o, /^module!/.test(E)) {
    if (!a)
      return A(g, "l");
    o.type = "module";
  } else if (/^nomodule!/.test(E) && a)
    return A(g, "l");
  o.onload = o.onerror = o.onbeforeload = function(l) {
    var D = l.type[0];
    if (s)
      try {
        o.sheet.cssText.length || (D = "e");
      } catch (G) {
        G.code != 18 && (D = "e");
      }
    if (D == "e") {
      if (t += 1, t < Q)
        return ct(g, A, I, t);
    } else if (o.rel == "preload" && o.as == "style")
      return o.rel = "stylesheet";
    A(g, D, l.defaultPrevented);
  }, C(g, o) !== !1 && e.head.appendChild(o);
}
function sr(g, A, I) {
  g = g.push ? g : [g];
  var t = g.length, e = t, B = [], Q, C;
  for (Q = function(E, n, s) {
    if (n == "e" && B.push(E), n == "b")
      if (s)
        B.push(E);
      else
        return;
    t--, t || A(B);
  }, C = 0; C < e; C++)
    ct(g[C], Q, I);
}
function wA(g, A, I) {
  var t, e;
  if (A && A.trim && (t = A), e = (t ? I : A) || {}, t) {
    if (t in Eg)
      throw "LoadJS";
    Eg[t] = !0;
  }
  function B(Q, C) {
    sr(g, function(E) {
      Hg(e, E), Q && Hg({ success: Q, error: C }, E), rt(t, E);
    }, e);
  }
  if (e.returnPromise)
    return new Promise(B);
  B();
}
wA.ready = function(A, I) {
  return nr(A, function(t) {
    Hg(I, t);
  }), wA;
};
wA.done = function(A) {
  rt(A, []);
};
wA.reset = function() {
  Eg = {}, Wg = {}, ng = {};
};
wA.isDefined = function(A) {
  return A in Eg;
};
class ar {
  app = null;
  appData = null;
  panel = {};
  constructor(A) {
    this.app = A, this.appData = A.data;
  }
  // 安装插件
  use(A) {
    A instanceof Function ? A(this.app, this) : A && typeof A == "object" && A.install && A.install instanceof Function && A.install(this.app, this);
  }
  // 异步插件安装
  useAsync({ url: A, name: I }) {
    return new Promise((t, e) => {
      wA([A], {
        success: () => {
          typeof I == "string" ? this.use(window[I]) : Array.isArray(I) && I.forEach((B) => {
            this.use(window[B]);
          }), t();
        },
        error: (B) => e(B)
      });
    });
  }
  // 远程加载并应用
  useAsyncLoad(A) {
    return new Promise((I, t) => {
      if (Array.isArray(A)) {
        let e = [];
        A.forEach((B) => {
          e.push(this.useAsync(B));
        }), Promise.all(e).then(I, t);
      } else
        I();
    });
  }
}
window && typeof window.Vue > "u" && (window.Vue = ht);
const Ag = [];
class or extends fA {
  constructor(A = {}) {
    super(), this.id = A.id || T(10), this.vapp = null, this.dom = null, this.component = new Oo(this), this.data = new uE(this, A.config), this.controller = _o(this), this.AppSetup = this.data.AppSetup, this.helper = new Er(this), this.plugin = new ar(this), this.appInfo = mI(() => {
      if (this.AppSetup.status == "display" && this.dom && this.dom.parentNode && this.data.info.parentSize) {
        let { ratio: I } = qg(this.dom);
        return Object.assign({}, this.data.info, { height: this.data.info.width * I });
      } else
        return this.data.info;
    });
  }
  async initData(A) {
    let I = await Tg(A);
    return this.id = I.id, I && Array.isArray(I.plugins) && await this.plugin.useAsyncLoad(I.plugins), this.data.init(I), {
      id: this.data.info.id,
      info: this.data.info,
      mData: this.data.mData,
      aData: this.data.aData,
      gData: this.data.gData,
      pData: this.data.pData,
      rData: this.data.rData
    };
  }
  // 获取应用数据
  getData(A = !1) {
    if (A == !1)
      return this.data.getData();
    {
      let I = this.data.getData();
      return TI(I);
    }
  }
  // 添加组件
  addComponent(A) {
    this.component.add(A);
  }
  // 使用插件
  use(A) {
    this.plugin.use(A);
  }
  // 创建
  create(A = {}) {
    return this.vapp ? !1 : (this.vapp = wt(ME, A), this.vapp.config.globalProperties.AppSetup = this.AppSetup, this.vapp.config.globalProperties.data = this.data, this.vapp.config.globalProperties.component = this.component, this.vapp.config.globalProperties.helper = this.helper, this.vapp.config.globalProperties.appInfo = this.appInfo, this.vapp.use(OE), this.component.install(), this.AppSetup.status = "create", console.log("%c灿create", "color:#0aa100"), !0);
  }
  // 显示
  display() {
    return this.vapp ? (this.AppSetup.dom instanceof HTMLElement ? this.dom = this.AppSetup.dom : typeof this.AppSetup.dom == "string" && (this.dom = document.querySelector(this.AppSetup.dom)), this.dom ? Ag.includes(this.dom) ? (console.error("app加载的DOM已有内容"), !1) : (Ag.push(this.dom), this.vapp.mount(this.dom), this.AppSetup.status = "display", this.data.resetScale(), console.log("%c灿display", "color:#0aa100"), !0) : (console.error(this.AppSetup.dom + "错误"), !1)) : (console.warn("app没有创建"), !1);
  }
  // 删除
  remove() {
    if (this.vapp) {
      let A = Ag.findIndex((I) => I == this.dom);
      A > -1 && Ag.splice(A, 1), this.vapp.unmount(), this.vapp = null, this.AppSetup.status = "remove", console.log("%c灿remove", "color:#0aa100");
    }
  }
  // 销毁
  destroy(A) {
    A && (this.data.clearDataAll(), this.controller.removeAll()), this.component.removeAll(), p.clear(), this.remove(), this.AppSetup.status = "destroy", console.log("%c灿destroy", "color:#0aa100");
  }
  initSet(A) {
    return A && Object.assign(this.AppSetup, A), this.AppSetup;
  }
  getvapp() {
    return this.vapp;
  }
}
const lr = pe, Dr = UB, ur = p, fr = GA, rr = Y, dr = jC, yr = function(g) {
  const {
    dom: A,
    scale: I = !0,
    interaction: t = !0,
    develop: e = !1,
    clickCursor: B = "pointer",
    display: Q,
    plugins: C,
    slots: E,
    data: n
  } = g, s = { interaction: t, clickCursor: B, scale: I, dom: A, develop: e }, a = new or({ config: Object.assign({ dom: A }, s) });
  return Array.isArray(C) ? C.forEach((o) => {
    a.use(o);
  }) : C && a.use(C), a.create({ slots: E }), n && a.initData(n).then((o) => {
    o && Q == !0 && a.display();
  }), a;
};
Lt.addEventListener("statechange", function(g) {
  p.emit(rr.PAGE_STATE, { state: g.newState, oldState: g.oldState });
});
console.log("%crd-runtime:2.1.2", "color:#0aa100");
export {
  rr as EVENTS,
  ur as cmd,
  yr as createVapp,
  fr as dataOptions,
  dr as remote,
  Dr as secrecy,
  lr as utils
};
//# sourceMappingURL=rd-runtime.mjs.map
