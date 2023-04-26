import * as EB from "vue";
import { getCurrentInstance as sB, isReactive as pg, reactive as U, ref as Gg, watch as Mg, shallowReactive as nB, computed as aB, resolveComponent as oB, h as L, isVNode as rB, onMounted as Ng, onUnmounted as cB, provide as hB, toRefs as lB, createApp as DB } from "vue";
function uB(I, A) {
  for (var g = 0; g < A.length; g++) {
    const B = A[g];
    if (typeof B != "string" && !Array.isArray(B)) {
      for (const t in B)
        if (t !== "default" && !(t in I)) {
          const e = Object.getOwnPropertyDescriptor(B, t);
          e && Object.defineProperty(I, t, e.get ? e : {
            enumerable: !0,
            get: () => B[t]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(I, Symbol.toStringTag, { value: "Module" }));
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
let $A;
try {
  new EventTarget(), $A = !0;
} catch {
  $A = !1;
}
class fB {
  constructor() {
    this.e = {};
  }
  addEventListener(A, g, B = !1) {
    this.t(A).push(g);
  }
  removeEventListener(A, g, B = !1) {
    const t = this.t(A), e = t.indexOf(g);
    e > -1 && t.splice(e, 1);
  }
  dispatchEvent(A) {
    return A.target = this, Object.freeze(A), this.t(A.type).forEach((g) => g(A)), !0;
  }
  t(A) {
    return this.e[A] = this.e[A] || [];
  }
}
var wB = $A ? EventTarget : fB;
let dB = class {
  constructor(A) {
    this.type = A;
  }
};
var yB = $A ? Event : dB;
class pB extends yB {
  constructor(A, g) {
    super(A), this.newState = g.newState, this.oldState = g.oldState, this.originalEvent = g.originalEvent;
  }
}
const sA = "active", JA = "passive", nA = "hidden", aA = "frozen", dI = "terminated", XI = typeof safari == "object" && safari.pushNotification, GB = "onpageshow" in self, MB = ["focus", "blur", "visibilitychange", "freeze", "resume", "pageshow", GB ? "pagehide" : "unload"], ZI = (I) => (I.preventDefault(), I.returnValue = "Are you sure?"), NB = (I) => I.reduce((A, g, B) => (A[g] = B, A), {}), FB = [[sA, JA, nA, dI], [sA, JA, nA, aA], [nA, JA, sA], [aA, nA], [aA, sA], [aA, JA]].map(NB), kB = (I, A) => {
  for (let g, B = 0; g = FB[B]; ++B) {
    const t = g[I], e = g[A];
    if (t >= 0 && e >= 0 && e > t)
      return Object.keys(g).slice(t, e + 1);
  }
  return [];
}, zA = () => document.visibilityState === nA ? nA : document.hasFocus() ? sA : JA;
class SB extends wB {
  constructor() {
    super();
    const A = zA();
    this.s = A, this.i = [], this.a = this.a.bind(this), MB.forEach((g) => addEventListener(g, this.a, !0)), XI && addEventListener("beforeunload", (g) => {
      this.n = setTimeout(() => {
        g.defaultPrevented || g.returnValue.length > 0 || this.r(g, nA);
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
    !this.i.indexOf(A) > -1 && (this.i.length === 0 && addEventListener("beforeunload", ZI), this.i.push(A));
  }
  removeUnsavedChanges(A) {
    const g = this.i.indexOf(A);
    g > -1 && (this.i.splice(g, 1), this.i.length === 0 && removeEventListener("beforeunload", ZI));
  }
  r(A, g) {
    if (g !== this.s) {
      const B = this.s, t = kB(B, g);
      for (let e = 0; e < t.length - 1; ++e) {
        const Q = t[e], C = t[e + 1];
        this.s = C, this.dispatchEvent(new pB("statechange", { oldState: Q, newState: C, originalEvent: A }));
      }
    }
  }
  a(A) {
    switch (XI && clearTimeout(this.n), A.type) {
      case "pageshow":
      case "resume":
        this.r(A, zA());
        break;
      case "focus":
        this.r(A, sA);
        break;
      case "blur":
        this.s === sA && this.r(A, zA());
        break;
      case "pagehide":
      case "unload":
        this.r(A, A.persisted ? aA : dI);
        break;
      case "visibilitychange":
        this.s !== aA && this.s !== dI && this.r(A, zA());
        break;
      case "freeze":
        this.r(A, aA);
    }
  }
}
var RB = new SB(), mA = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, DA = {}, JB = {
  get exports() {
    return DA;
  },
  set exports(I) {
    DA = I;
  }
};
(function(I) {
  var A = Object.prototype.hasOwnProperty, g = "~";
  function B() {
  }
  Object.create && (B.prototype = /* @__PURE__ */ Object.create(null), new B().__proto__ || (g = !1));
  function t(E, s, n) {
    this.fn = E, this.context = s, this.once = n || !1;
  }
  function e(E, s, n, a, r) {
    if (typeof n != "function")
      throw new TypeError("The listener must be a function");
    var y = new t(n, a || E, r), d = g ? g + s : s;
    return E._events[d] ? E._events[d].fn ? E._events[d] = [E._events[d], y] : E._events[d].push(y) : (E._events[d] = y, E._eventsCount++), E;
  }
  function Q(E, s) {
    --E._eventsCount === 0 ? E._events = new B() : delete E._events[s];
  }
  function C() {
    this._events = new B(), this._eventsCount = 0;
  }
  C.prototype.eventNames = function() {
    var s = [], n, a;
    if (this._eventsCount === 0)
      return s;
    for (a in n = this._events)
      A.call(n, a) && s.push(g ? a.slice(1) : a);
    return Object.getOwnPropertySymbols ? s.concat(Object.getOwnPropertySymbols(n)) : s;
  }, C.prototype.listeners = function(s) {
    var n = g ? g + s : s, a = this._events[n];
    if (!a)
      return [];
    if (a.fn)
      return [a.fn];
    for (var r = 0, y = a.length, d = new Array(y); r < y; r++)
      d[r] = a[r].fn;
    return d;
  }, C.prototype.listenerCount = function(s) {
    var n = g ? g + s : s, a = this._events[n];
    return a ? a.fn ? 1 : a.length : 0;
  }, C.prototype.emit = function(s, n, a, r, y, d) {
    var G = g ? g + s : s;
    if (!this._events[G])
      return !1;
    var f = this._events[G], Z = arguments.length, W, J;
    if (f.fn) {
      switch (f.once && this.removeListener(s, f.fn, void 0, !0), Z) {
        case 1:
          return f.fn.call(f.context), !0;
        case 2:
          return f.fn.call(f.context, n), !0;
        case 3:
          return f.fn.call(f.context, n, a), !0;
        case 4:
          return f.fn.call(f.context, n, a, r), !0;
        case 5:
          return f.fn.call(f.context, n, a, r, y), !0;
        case 6:
          return f.fn.call(f.context, n, a, r, y, d), !0;
      }
      for (J = 1, W = new Array(Z - 1); J < Z; J++)
        W[J - 1] = arguments[J];
      f.fn.apply(f.context, W);
    } else {
      var rI = f.length, j;
      for (J = 0; J < rI; J++)
        switch (f[J].once && this.removeListener(s, f[J].fn, void 0, !0), Z) {
          case 1:
            f[J].fn.call(f[J].context);
            break;
          case 2:
            f[J].fn.call(f[J].context, n);
            break;
          case 3:
            f[J].fn.call(f[J].context, n, a);
            break;
          case 4:
            f[J].fn.call(f[J].context, n, a, r);
            break;
          default:
            if (!W)
              for (j = 1, W = new Array(Z - 1); j < Z; j++)
                W[j - 1] = arguments[j];
            f[J].fn.apply(f[J].context, W);
        }
    }
    return !0;
  }, C.prototype.on = function(s, n, a) {
    return e(this, s, n, a, !1);
  }, C.prototype.once = function(s, n, a) {
    return e(this, s, n, a, !0);
  }, C.prototype.removeListener = function(s, n, a, r) {
    var y = g ? g + s : s;
    if (!this._events[y])
      return this;
    if (!n)
      return Q(this, y), this;
    var d = this._events[y];
    if (d.fn)
      d.fn === n && (!r || d.once) && (!a || d.context === a) && Q(this, y);
    else {
      for (var G = 0, f = [], Z = d.length; G < Z; G++)
        (d[G].fn !== n || r && !d[G].once || a && d[G].context !== a) && f.push(d[G]);
      f.length ? this._events[y] = f.length === 1 ? f[0] : f : Q(this, y);
    }
    return this;
  }, C.prototype.removeAllListeners = function(s) {
    var n;
    return s ? (n = g ? g + s : s, this._events[n] && Q(this, n)) : (this._events = new B(), this._eventsCount = 0), this;
  }, C.prototype.off = C.prototype.removeListener, C.prototype.addListener = C.prototype.on, C.prefixed = g, C.EventEmitter = C, I.exports = C;
})(JB);
const kA = {}, mB = 10;
function YB(I) {
  var A = !0, g = (/* @__PURE__ */ new Date()).getTime();
  return kA[I] ? (g - kA[I].time < mB && (A = !1), kA[I].count++, kA[I].time = g) : kA[I] = {
    count: 1,
    time: g
  }, A;
}
const m = {
  //    点击舞台
  CLICK_STAGE: "click-stage",
  //    点击舞台背景
  CLICK_BACKGROUND: "click-background",
  //    点击元件
  CLICK_SPRITE: "click-sprite",
  //    双击元件
  DBLCLICK_SPRITE: "dblclick-sprite",
  //    鼠标按下舞台背景
  MOUSEDOWN_BACKGROUND: "mousedown-background",
  //    鼠标释放舞台背景
  MOUSEUP_BACKGROUND: "mouseup-background",
  //    鼠标经过元件
  MOUSEOVER_SPRITE: "mouseover-sprite",
  //    鼠标离开元件
  MOUSEOUT_SPRITE: "mouseout-sprite",
  //    鼠标按下元件
  MOUSEDOWN_SPRITE: "mousedown-sprite",
  //    鼠标释放元件
  MOUSEUP_SPRITE: "mouseup-sprite",
  //    鼠标移入元件
  MOUSEENTER_SPRITE: "mouseenter-sprite",
  //    鼠标移出元件
  MOUSELEAVE_SPRITE: "mouseleave-sprite",
  //    舞台渲染完毕
  STAGE_MOUNTED: "stage-mounted",
  // 数据加载完成
  DATA_LOADED: "data-loaded",
  // 页面状态
  PAGE_STATE: "page-state"
}, uA = {
  // 执行动作
  ACTION: "action",
  // 设置应用
  APP_ACTION: "appAction"
};
var AI = {}, UB = {
  get exports() {
    return AI;
  },
  set exports(I) {
    AI = I;
  }
};
(function(I, A) {
  (function(g, B) {
    I.exports = B();
  })(mA, function() {
    var g = 1e3, B = 6e4, t = 36e5, e = "millisecond", Q = "second", C = "minute", E = "hour", s = "day", n = "week", a = "month", r = "quarter", y = "year", d = "date", G = "Invalid Date", f = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Z = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, W = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(l) {
      var h = ["th", "st", "nd", "rd"], o = l % 100;
      return "[" + l + (h[(o - 20) % 10] || h[o] || h[0]) + "]";
    } }, J = function(l, h, o) {
      var D = String(l);
      return !D || D.length >= h ? l : "" + Array(h + 1 - D.length).join(o) + l;
    }, rI = { s: J, z: function(l) {
      var h = -l.utcOffset(), o = Math.abs(h), D = Math.floor(o / 60), c = o % 60;
      return (h <= 0 ? "+" : "-") + J(D, 2, "0") + ":" + J(c, 2, "0");
    }, m: function l(h, o) {
      if (h.date() < o.date())
        return -l(o, h);
      var D = 12 * (o.year() - h.year()) + (o.month() - h.month()), c = h.clone().add(D, a), w = o - c < 0, u = h.clone().add(D + (w ? -1 : 1), a);
      return +(-(D + (o - c) / (w ? c - u : u - c)) || 0);
    }, a: function(l) {
      return l < 0 ? Math.ceil(l) || 0 : Math.floor(l);
    }, p: function(l) {
      return { M: a, y, w: n, d: s, D: d, h: E, m: C, s: Q, ms: e, Q: r }[l] || String(l || "").toLowerCase().replace(/s$/, "");
    }, u: function(l) {
      return l === void 0;
    } }, j = "en", EA = {};
    EA[j] = W;
    var cI = function(l) {
      return l instanceof KA;
    }, qA = function l(h, o, D) {
      var c;
      if (!h)
        return j;
      if (typeof h == "string") {
        var w = h.toLowerCase();
        EA[w] && (c = w), o && (EA[w] = o, c = w);
        var u = h.split("-");
        if (!c && u.length > 1)
          return l(u[0]);
      } else {
        var N = h.name;
        EA[N] = h, c = N;
      }
      return !D && c && (j = c), c || !D && j;
    }, x = function(l, h) {
      if (cI(l))
        return l.clone();
      var o = typeof h == "object" ? h : {};
      return o.date = l, o.args = arguments, new KA(o);
    }, k = rI;
    k.l = qA, k.i = cI, k.w = function(l, h) {
      return x(l, { locale: h.$L, utc: h.$u, x: h.$x, $offset: h.$offset });
    };
    var KA = function() {
      function l(o) {
        this.$L = qA(o.locale, null, !0), this.parse(o);
      }
      var h = l.prototype;
      return h.parse = function(o) {
        this.$d = function(D) {
          var c = D.date, w = D.utc;
          if (c === null)
            return /* @__PURE__ */ new Date(NaN);
          if (k.u(c))
            return /* @__PURE__ */ new Date();
          if (c instanceof Date)
            return new Date(c);
          if (typeof c == "string" && !/Z$/i.test(c)) {
            var u = c.match(f);
            if (u) {
              var N = u[2] - 1 || 0, H = (u[7] || "0").substring(0, 3);
              return w ? new Date(Date.UTC(u[1], N, u[3] || 1, u[4] || 0, u[5] || 0, u[6] || 0, H)) : new Date(u[1], N, u[3] || 1, u[4] || 0, u[5] || 0, u[6] || 0, H);
            }
          }
          return new Date(c);
        }(o), this.$x = o.x || {}, this.init();
      }, h.init = function() {
        var o = this.$d;
        this.$y = o.getFullYear(), this.$M = o.getMonth(), this.$D = o.getDate(), this.$W = o.getDay(), this.$H = o.getHours(), this.$m = o.getMinutes(), this.$s = o.getSeconds(), this.$ms = o.getMilliseconds();
      }, h.$utils = function() {
        return k;
      }, h.isValid = function() {
        return this.$d.toString() !== G;
      }, h.isSame = function(o, D) {
        var c = x(o);
        return this.startOf(D) <= c && c <= this.endOf(D);
      }, h.isAfter = function(o, D) {
        return x(o) < this.startOf(D);
      }, h.isBefore = function(o, D) {
        return this.endOf(D) < x(o);
      }, h.$g = function(o, D, c) {
        return k.u(o) ? this[D] : this.set(c, o);
      }, h.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, h.valueOf = function() {
        return this.$d.getTime();
      }, h.startOf = function(o, D) {
        var c = this, w = !!k.u(D) || D, u = k.p(o), N = function(cA, O) {
          var eA = k.w(c.$u ? Date.UTC(c.$y, O, cA) : new Date(c.$y, O, cA), c);
          return w ? eA : eA.endOf(s);
        }, H = function(cA, O) {
          return k.w(c.toDate()[cA].apply(c.toDate("s"), (w ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(O)), c);
        }, Y = this.$W, q = this.$M, tA = this.$D, $ = "set" + (this.$u ? "UTC" : "");
        switch (u) {
          case y:
            return w ? N(1, 0) : N(31, 11);
          case a:
            return w ? N(1, q) : N(0, q + 1);
          case n:
            var NA = this.$locale().weekStart || 0, FA = (Y < NA ? Y + 7 : Y) - NA;
            return N(w ? tA - FA : tA + (6 - FA), q);
          case s:
          case d:
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
      }, h.endOf = function(o) {
        return this.startOf(o, !1);
      }, h.$set = function(o, D) {
        var c, w = k.p(o), u = "set" + (this.$u ? "UTC" : ""), N = (c = {}, c[s] = u + "Date", c[d] = u + "Date", c[a] = u + "Month", c[y] = u + "FullYear", c[E] = u + "Hours", c[C] = u + "Minutes", c[Q] = u + "Seconds", c[e] = u + "Milliseconds", c)[w], H = w === s ? this.$D + (D - this.$W) : D;
        if (w === a || w === y) {
          var Y = this.clone().set(d, 1);
          Y.$d[N](H), Y.init(), this.$d = Y.set(d, Math.min(this.$D, Y.daysInMonth())).$d;
        } else
          N && this.$d[N](H);
        return this.init(), this;
      }, h.set = function(o, D) {
        return this.clone().$set(o, D);
      }, h.get = function(o) {
        return this[k.p(o)]();
      }, h.add = function(o, D) {
        var c, w = this;
        o = Number(o);
        var u = k.p(D), N = function(q) {
          var tA = x(w);
          return k.w(tA.date(tA.date() + Math.round(q * o)), w);
        };
        if (u === a)
          return this.set(a, this.$M + o);
        if (u === y)
          return this.set(y, this.$y + o);
        if (u === s)
          return N(1);
        if (u === n)
          return N(7);
        var H = (c = {}, c[C] = B, c[E] = t, c[Q] = g, c)[u] || 1, Y = this.$d.getTime() + o * H;
        return k.w(Y, this);
      }, h.subtract = function(o, D) {
        return this.add(-1 * o, D);
      }, h.format = function(o) {
        var D = this, c = this.$locale();
        if (!this.isValid())
          return c.invalidDate || G;
        var w = o || "YYYY-MM-DDTHH:mm:ssZ", u = k.z(this), N = this.$H, H = this.$m, Y = this.$M, q = c.weekdays, tA = c.months, $ = function(O, eA, hI, OA) {
          return O && (O[eA] || O(D, w)) || hI[eA].slice(0, OA);
        }, NA = function(O) {
          return k.s(N % 12 || 12, O, "0");
        }, FA = c.meridiem || function(O, eA, hI) {
          var OA = O < 12 ? "AM" : "PM";
          return hI ? OA.toLowerCase() : OA;
        }, cA = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: Y + 1, MM: k.s(Y + 1, 2, "0"), MMM: $(c.monthsShort, Y, tA, 3), MMMM: $(tA, Y), D: this.$D, DD: k.s(this.$D, 2, "0"), d: String(this.$W), dd: $(c.weekdaysMin, this.$W, q, 2), ddd: $(c.weekdaysShort, this.$W, q, 3), dddd: q[this.$W], H: String(N), HH: k.s(N, 2, "0"), h: NA(1), hh: NA(2), a: FA(N, H, !0), A: FA(N, H, !1), m: String(H), mm: k.s(H, 2, "0"), s: String(this.$s), ss: k.s(this.$s, 2, "0"), SSS: k.s(this.$ms, 3, "0"), Z: u };
        return w.replace(Z, function(O, eA) {
          return eA || cA[O] || u.replace(":", "");
        });
      }, h.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, h.diff = function(o, D, c) {
        var w, u = k.p(D), N = x(o), H = (N.utcOffset() - this.utcOffset()) * B, Y = this - N, q = k.m(this, N);
        return q = (w = {}, w[y] = q / 12, w[a] = q, w[r] = q / 3, w[n] = (Y - H) / 6048e5, w[s] = (Y - H) / 864e5, w[E] = Y / t, w[C] = Y / B, w[Q] = Y / g, w)[u] || Y, c ? q : k.a(q);
      }, h.daysInMonth = function() {
        return this.endOf(a).$D;
      }, h.$locale = function() {
        return EA[this.$L];
      }, h.locale = function(o, D) {
        if (!o)
          return this.$L;
        var c = this.clone(), w = qA(o, D, !0);
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
      }, l;
    }(), _I = KA.prototype;
    return x.prototype = _I, [["$ms", e], ["$s", Q], ["$m", C], ["$H", E], ["$W", s], ["$M", a], ["$y", y], ["$D", d]].forEach(function(l) {
      _I[l[1]] = function(h) {
        return this.$g(h, l[0], l[1]);
      };
    }), x.extend = function(l, h) {
      return l.$i || (l(h, KA, x), l.$i = !0), x;
    }, x.locale = qA, x.isDayjs = cI, x.unix = function(l) {
      return x(1e3 * l);
    }, x.en = EA[j], x.Ls = EA, x.p = {}, x;
  });
})(UB);
const LB = AI, Fg = /* @__PURE__ */ uB({
  __proto__: null,
  default: LB
}, [AI]);
var HB = typeof mA == "object" && mA && mA.Object === Object && mA, kg = HB, bB = kg, xB = typeof self == "object" && self && self.Object === Object && self, vB = bB || xB || Function("return this")(), oA = vB, qB = oA, KB = qB.Symbol, JI = KB, PI = JI, Sg = Object.prototype, OB = Sg.hasOwnProperty, zB = Sg.toString, SA = PI ? PI.toStringTag : void 0;
function TB(I) {
  var A = OB.call(I, SA), g = I[SA];
  try {
    I[SA] = void 0;
    var B = !0;
  } catch {
  }
  var t = zB.call(I);
  return B && (A ? I[SA] = g : delete I[SA]), t;
}
var jB = TB, _B = Object.prototype, XB = _B.toString;
function ZB(I) {
  return XB.call(I);
}
var PB = ZB, VI = JI, VB = jB, WB = PB, $B = "[object Null]", At = "[object Undefined]", WI = VI ? VI.toStringTag : void 0;
function It(I) {
  return I == null ? I === void 0 ? At : $B : WI && WI in Object(I) ? VB(I) : WB(I);
}
var bA = It;
function gt(I, A) {
  return function(g) {
    return I(A(g));
  };
}
var Bt = gt, tt = Bt, et = tt(Object.getPrototypeOf, Object), Rg = et;
function Qt(I) {
  return I != null && typeof I == "object";
}
var dA = Qt, Ct = bA, it = Rg, Et = dA, st = "[object Object]", nt = Function.prototype, at = Object.prototype, Jg = nt.toString, ot = at.hasOwnProperty, rt = Jg.call(Object);
function ct(I) {
  if (!Et(I) || Ct(I) != st)
    return !1;
  var A = it(I);
  if (A === null)
    return !0;
  var g = ot.call(A, "constructor") && A.constructor;
  return typeof g == "function" && g instanceof g && Jg.call(g) == rt;
}
var CA = ct;
const $I = {
  dayjs(I, A) {
    return Fg(I).format(A);
  }
}, hA = function(I, A, g, B) {
  let t = I;
  if (A) {
    let e = A.split(".");
    for (let Q of e)
      if (typeof t[Q] < "u")
        t = t[Q];
      else {
        t = null;
        break;
      }
  } else
    return typeof B == "object" && B.func ? $I[B.func].call(null, t, B.rule) : t;
  return g && t instanceof Array ? t.map((e) => hA(e, g, null, B)) : typeof B == "object" && B.func ? $I[B.func].call(null, t, B.rule) : t;
}, mI = function(I, A) {
  if (A && CA(A) && A.y && A.y instanceof Array && A.y.length > 0) {
    let g = [];
    if (A.x && A.x.name && A.x.path) {
      g.push([A.x.name]);
      let B = hA(I, A.x.path, A.x.mapKey, A.x.format);
      B && B.forEach((t, e) => {
        g[e + 1] = [t];
      }), A.y.forEach((t) => {
        g[0].push(t.name);
        let e = hA(I, t.path, t.mapKey, t.format);
        e && e instanceof Array && e.forEach((Q, C) => {
          g[C + 1] ? g[C + 1].push(Q) : g[C + 1] = [Q];
        });
      });
    } else
      A.y.forEach((B, t) => {
        let e = hA(I, B.path, B.mapKey, B.format);
        e && e instanceof Array && (t == 0 ? g.push([B.name]) : g[0].push(B.name), e.forEach((Q, C) => {
          g[C + 1] ? g[C + 1].push(Q) : g[C + 1] = [Q];
        }));
      });
    return g;
  } else {
    if (A && CA(A) && A.name && A.path)
      return {
        [A.name]: hA(I, A.path, A.mapKey, A.format)
      };
    if (A && A instanceof Array) {
      let g = {};
      return A.forEach((B) => {
        g[B.name] = hA(I, B.path, B.mapKey, B.format);
      }), g;
    } else
      return console.log("数据未处理"), I;
  }
}, b = function(I) {
  if (typeof I == "string")
    try {
      return JSON.parse(I);
    } catch {
      return I;
    }
  else
    return I ? JSON.parse(JSON.stringify(I)) : {};
}, X = function(I, A, g) {
  if (I && I instanceof Array) {
    let B = A ? I.findIndex((t) => t[A] == g) : I.findIndex((t) => t == g);
    return B > -1 ? I.splice(B, 1) : !1;
  } else
    return !1;
};
let z = (I = 21) => crypto.getRandomValues(new Uint8Array(I)).reduce((A, g) => (g &= 63, g < 36 ? A += g.toString(36) : g < 62 ? A += (g - 26).toString(36).toUpperCase() : g > 62 ? A += "-" : A += "_", A), "");
const ht = function() {
  const I = function() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  };
  return I() + I() + I() + I() + I() + I() + I() + I();
};
let AA = {};
const UA = {
  add(I, A = 1e3, g) {
    let B = g || "it_" + z(7);
    return AA[B] && clearInterval(AA[B]), AA[B] = setInterval(I, A), B;
  },
  del(I) {
    if (I)
      AA[I] && (clearInterval(AA[I]), delete AA[I]);
    else {
      for (const A in AA)
        clearInterval(AA[A]);
      AA = {};
    }
  }
};
let P = {};
const lt = {
  add(I, A, g) {
    let B = A || 1e3, t = g || "id_" + (/* @__PURE__ */ new Date()).getTime() + Math.floor(Math.random() * 1e3);
    return P[t] && clearTimeout(P[t]), P[t] = setTimeout(I, B), t;
  },
  del(I) {
    if (I)
      P[I] && (clearTimeout(P[I]), delete P[I]);
    else {
      for (const A in P)
        Object.hasOwnProperty.call(P, A) && clearTimeout(P[A]);
      P = {};
    }
  }
}, _ = function(I = "AppSetup") {
  const { appContext: { config: { globalProperties: A = {} } } } = sB();
  return A[I] || null;
}, YI = function(I) {
  if (I) {
    let A = typeof I == "string" ? document.querySelector(I) : I, g = A.getBoundingClientRect();
    return g.width > 0 && g.height > 0 ? g : A.parentElement && A.parentElement.localName != "body" ? YI(A.parentElement) : {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  return null;
}, mg = function(I, A) {
  let g = YI(I) || {
    width: window.innerWidth,
    height: window.innerHeight
  }, B = g.height / A.height, t = g.width / A.width;
  return B < t ? { value: B, h: B, w: t } : { value: t, h: B, w: t };
}, Yg = function(I) {
  return Array.isArray(I) && I.length > 0 && I.map((g) => ({
    id: g.id,
    zIndex: g.zIndex || 0
  })).sort((g, B) => B.zIndex - g.zIndex)[0].zIndex || 0;
}, v = function(I) {
  let A = {
    id: null,
    gpid: null,
    mid: null,
    visible: null,
    name: null,
    type: null,
    zIndex: null
  };
  for (const g in A)
    Object.hasOwnProperty.call(A, g) && (A[g] = I[g]);
  return A;
}, Dt = function(...I) {
  let A = (/* @__PURE__ */ new Date()).getTime(), g = {
    id: "A_" + z(10),
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
  return Object.assign({}, g, ...I);
}, yI = function(I) {
  return I ? Object.keys(I).map(function(A) {
    return encodeURIComponent(A) + "=" + encodeURIComponent(I[A]);
  }).join("&") : "";
}, Ug = function(I, A = !0) {
  let g = location.href.slice(location.href.lastIndexOf("?")), B = {}, t = /([^?=&#]+)=([^?=&#]+)/g;
  return g.replace(t, (e, Q, C) => B[Q] = A ? decodeURIComponent(C) : C), I ? B[I] || "" : B;
}, ut = Fg, ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createSimpleData: v,
  dayjs: ut,
  extractData: mI,
  getAppGlobal: _,
  getDomRect: YI,
  getMaxZIndex: Yg,
  getScale: mg,
  getTemplateData: Dt,
  getUrlParam: Ug,
  guid: ht,
  interval: UA,
  jsonData: b,
  jsonToParams: yI,
  removeArray: X,
  timeout: lt
}, Symbol.toStringTag, { value: "Module" })), QA = new DA(), p = {
  /**
   * 添加需要托管的eventObj对象事件
   * @param {string} eventName 事件名称
   * @param {function} fun 事件方法
   * @param {object} eventObj  委托对象
   */
  addEventListener(I, A, g = null) {
    QA.on(I, A, g);
  },
  /**
   * 删除托管的eventObj对象事件
   * @param {string} eventName 事件名称
   * @param {function} fun 委托对象
   * @param {object} eventObj  委托对象
   */
  removeEventListener(I, A, g) {
    g && A ? QA.off(I, A, g) : A ? QA.off(I, A) : QA.off(I);
  },
  /**
   * 清除所有
   */
  clear(I) {
    QA.removeAllListeners(I);
  },
  /**
   * 发送命令
   * @param {string} eventName 事件名称
   * @param {object} args 参数 
   * @param {boolean} force 强制发送
   */
  emit(I, A, g = !1) {
    if (typeof g == "boolean" && g)
      QA.emit(I, A);
    else if (YB(I)) {
      let B = arguments.length;
      if (B <= 3)
        QA.emit(I, A, g);
      else {
        let t = [];
        for (i = 1; i < B; i++)
          t[0] = arguments[i];
        QA.emit(I, ...t);
      }
    }
  },
  /**
   * 执行命令
   * @param {*} action 动作
   * @param {*} sprid 操作元素id
   * @param {*} appid 来自应以id
   */
  execute(I, A = "", g) {
    let B = {
      sprid: A,
      appid: g,
      data: b(I)
    };
    this.emit(uA.ACTION, B);
  },
  /**
   * 消息提示
   */
  message(I) {
    this.emit("message-send", I);
  },
  /**
   * 执行元件内的cmdRunning方法
   * @param {string} id 元件id 
   * @param {*} data 
   */
  running(I, A) {
    this.emit("run_function_" + I, A);
  },
  /**
   * 执行数据更新
   * @param {string} sprid 目标对象id 
   * @param {*} value 数据值
   */
  reviewData(I, A) {
    this.emit(uA.ACTION, {
      data: {
        action: "reviewData",
        sprid: I,
        value: A
      }
    });
  }
}, wt = [{
  name: "主内容区",
  type: "content"
}, {
  name: "覆盖弹层",
  type: "overlayer"
}], dt = [
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
], yt = [
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
], pt = [
  { name: "图表", type: "chart" },
  { name: "文本", type: "text" },
  { name: "表格", type: "table" },
  { name: "形状", type: "shape" },
  { name: "菜单", type: "menu" },
  { name: "媒体", type: "media" },
  { name: "地图", type: "map" },
  { name: "3D", type: "3d" },
  { name: "其它", type: "other" }
], Gt = [
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
], xA = {
  get level() {
    return wt;
  },
  get actions() {
    return dt;
  },
  get dataTypes() {
    return yt;
  },
  get component() {
    return pt;
  },
  get events() {
    return Gt;
  }
}, Mt = "data:application/wasm;base64,AGFzbQEAAAAB4gEfYAJ/fwF/YAN/f38Bf2ACf38AYAN/f38AYAF/AX9gAX8AYAV/f39/fwBgBH9/f38AYAR/f39/AX9gAAF/YAV/f39/fwF/YAZ/f39/f38AYAF/AX5gAABgBn9/f39/fwF/YAd/f39/f39/AGAJf39/f39/f39/AGAJf39/f39/fn5+AGAFf39+f38AYAV/f31/fwBgA39/fABgBX9/fH9/AGAEf35/fwBgBH99f38AYAR/fH9/AGAHf39/f39/fwF/YAN/fH8Bf2AEf3x/fwF/YAJ+fwF/YAN+f38Bf2ABfAF/Ar8LHxEuL3JpY2hfd2FzbV9iZy5qcxpfX3diaW5kZ2VuX29iamVjdF9kcm9wX3JlZgAFES4vcmljaF93YXNtX2JnLmpzFV9fd2JpbmRnZW5fbnVtYmVyX25ldwAeES4vcmljaF93YXNtX2JnLmpzFF9fd2JpbmRnZW5faXNfb2JqZWN0AAQRLi9yaWNoX3dhc21fYmcuanMZX193YmluZGdlbl9qc3ZhbF9sb29zZV9lcQAAES4vcmljaF93YXNtX2JnLmpzFl9fd2JpbmRnZW5fYm9vbGVhbl9nZXQABBEuL3JpY2hfd2FzbV9iZy5qcxVfX3diaW5kZ2VuX251bWJlcl9nZXQAAhEuL3JpY2hfd2FzbV9iZy5qcxVfX3diaW5kZ2VuX3N0cmluZ19nZXQAAhEuL3JpY2hfd2FzbV9iZy5qcxRfX3diaW5kZ2VuX2Vycm9yX25ldwAAES4vcmljaF93YXNtX2JnLmpzGl9fd2JnX2dldF8yN2ZlM2RhYzFjNGQwMjI0AAARLi9yaWNoX3dhc21fYmcuanMdX193YmdfbGVuZ3RoX2U0OThmYmMyNGY5YzFkNGYABBEuL3JpY2hfd2FzbV9iZy5qcxpfX3diZ19uZXdfYjUyNWRlMTdmNDRhODk0MwAJES4vcmljaF93YXNtX2JnLmpzFl9fd2JpbmRnZW5faXNfZnVuY3Rpb24ABBEuL3JpY2hfd2FzbV9iZy5qcxtfX3diZ19uZXh0X2I3ZDUzMGMwNGZkOGIyMTcABBEuL3JpY2hfd2FzbV9iZy5qcxtfX3diZ19uZXh0Xzg4NTYwZWMwNmEwOTRkZWEABBEuL3JpY2hfd2FzbV9iZy5qcxtfX3diZ19kb25lXzFlYmVjMDNiYmQ5MTk4NDMABBEuL3JpY2hfd2FzbV9iZy5qcxxfX3diZ192YWx1ZV82YWM4ZGE1Y2M1YjNlZmRhAAQRLi9yaWNoX3dhc21fYmcuanMfX193YmdfaXRlcmF0b3JfNTVmMTE0NDQ2MjIxYWE1YQAJES4vcmljaF93YXNtX2JnLmpzGl9fd2JnX2dldF9iYWY0ODU1ZjlhOTg2MTg2AAARLi9yaWNoX3dhc21fYmcuanMbX193YmdfY2FsbF85NWQxZWE0ODhkMDNlNGU4AAARLi9yaWNoX3dhc21fYmcuanMaX193Ymdfc2V0XzE3MjI0YmM1NDhkZDFkN2IAAxEuL3JpY2hfd2FzbV9iZy5qcx5fX3diZ19pc0FycmF5XzM5ZDI4OTk3YmY2Yjk2YjQABBEuL3JpY2hfd2FzbV9iZy5qcy1fX3diZ19pbnN0YW5jZW9mX0FycmF5QnVmZmVyX2E2OWYwMmVlNGM0ZjUwNjUABBEuL3JpY2hfd2FzbV9iZy5qcyRfX3diZ19pc1NhZmVJbnRlZ2VyXzhjNDc4OTAyOWU4ODUxNTkABBEuL3JpY2hfd2FzbV9iZy5qcx1fX3diZ19idWZmZXJfY2Y2NWMwN2RlMzRiOWEwOAAEES4vcmljaF93YXNtX2JnLmpzGl9fd2JnX25ld181MzdiNzM0MWNlOTBiYjMxAAQRLi9yaWNoX3dhc21fYmcuanMaX193Ymdfc2V0XzE3NDk5ZThhYTQwMDNlYmQAAxEuL3JpY2hfd2FzbV9iZy5qcx1fX3diZ19sZW5ndGhfMjdhMmFmZThhYjQyYjA5ZgAEES4vcmljaF93YXNtX2JnLmpzLF9fd2JnX2luc3RhbmNlb2ZfVWludDhBcnJheV8wMWNlYmU3OWNhNjA2Y2NhAAQRLi9yaWNoX3dhc21fYmcuanMXX193YmluZGdlbl9kZWJ1Z19zdHJpbmcAAhEuL3JpY2hfd2FzbV9iZy5qcxBfX3diaW5kZ2VuX3Rocm93AAIRLi9yaWNoX3dhc21fYmcuanMRX193YmluZGdlbl9tZW1vcnkACQOcApoCAwYEDwMIBgAABQYAAQUIGwEDAg4DEAUCGgIBBQUFAQADAQIEBQUDBQIDHAECAwsABRELBQAZBAoAAAIBHQADAwAABQECAAkABQIDAwIDAgIDAgIA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AEHY4sAAQcziwAA2AgBBzOLAAEHE4sAANgIAQeDiwABB1OLAADYCAEHU4sAAQcziwAA2AgBB6OLAAEHc4sAANgIAQdziwABB1OLAADYCAEHk4sAAQdziwAA2AgBB8OLAAEHk4sAANgIAQeziwABB5OLAADYCAEH44sAAQeziwAA2AgBB9OLAAEHs4sAANgIAQYDjwABB9OLAADYCAEH84sAAQfTiwAA2AgBBiOPAAEH84sAANgIAQYTjwABB/OLAADYCAEGQ48AAQYTjwAA2AgBBjOPAAEGE48AANgIAQZjjwABBjOPAADYCAEGU48AAQYzjwAA2AgBBoOPAAEGU48AANgIAQZzjwABBlOPAADYCAEGo48AAQZzjwAA2AgBBsOPAAEGk48AANgIAQaTjwABBnOPAADYCAEG448AAQazjwAA2AgBBrOPAAEGk48AANgIAQcDjwABBtOPAADYCAEG048AAQazjwAA2AgBByOPAAEG848AANgIAQbzjwABBtOPAADYCAEHQ48AAQcTjwAA2AgBBxOPAAEG848AANgIAQdjjwABBzOPAADYCAEHM48AAQcTjwAA2AgBB4OPAAEHU48AANgIAQdTjwABBzOPAADYCAEHo48AAQdzjwAA2AgBB3OPAAEHU48AANgIAQfDjwABB5OPAADYCAEHk48AAQdzjwAA2AgBB+OPAAEHs48AANgIAQezjwABB5OPAADYCAEGA5MAAQfTjwAA2AgBB9OPAAEHs48AANgIAQYjkwABB/OPAADYCAEH848AAQfTjwAA2AgBBkOTAAEGE5MAANgIAQYTkwABB/OPAADYCAEGY5MAAQYzkwAA2AgBBjOTAAEGE5MAANgIAQaDkwABBlOTAADYCAEGU5MAAQYzkwAA2AgBBnOTAAEGU5MAANgIAQQhBCBD/ASEBQRRBCBD/ASECQRBBCBD/ASEGQbjkwAAgAyADELMCIgBBCBD/ASAAayIDELECIgA2AgBBsOTAACAFQQhqIAYgASACamogA2prIgE2AgAgACABQQFyNgIEQQhBCBD/ASEDQRRBCBD/ASECQRBBCBD/ASEFIAAgARCxAiAFIAIgA0EIa2pqNgIEQcTkwABBgICAATYCAAtBACECQbDkwAAoAgAiACAETQ0AQbDkwAAgACAEayIBNgIAQbjkwABBuOTAACgCACIAIAQQ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GGoQswEMDgsgAiAAKAIENgIIIAJBJGpBAjYCACACQSxqQQE2AgAgAkHAksAANgIgIAJBADYCGCACQR02AhQgAiACQRBqNgIoIAIgAkEIajYCECABIAJBGGoQswEMDQsgAiAAKQIENwMIIAJBJGpBATYCACACQSxqQQE2AgAgAkGsksAANgIgIAJBADYCGCACQR42AhQgAiACQRBqNgIoIAIgAkEIajYCECABIAJBGGoQswEMDAsgAkEkakEBNgIAIAJBLGpBADYCACACQZySwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCwsgAkEkakEBNgIAIAJBLGpBADYCACACQYiSwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCgsgAkEkakEBNgIAIAJBLGpBADYCACACQfSRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCQsgAkEkakEBNgIAIAJBLGpBADYCACACQeCRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCAsgAkEkakEBNgIAIAJBLGpBADYCACACQciRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBwsgAkEkakEBNgIAIAJBLGpBADYCACACQbiRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBgsgAkEkakEBNgIAIAJBLGpBADYCACACQayRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBQsgAkEkakEBNgIAIAJBLGpBADYCACACQaCRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBAsgAkEkakEBNgIAIAJBLGpBADYCACACQYyRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMAwsgAkEkakEBNgIAIAJBLGpBADYCACACQfSQwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMAgsgAkEkakEBNgIAIAJBLGpBADYCACACQdyQwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMAQsgASAAKAIEIABBCGooAgAQgwILIAJBMGokAAvwBwEIfwJAAkAgAEEDakF8cSICIABrIgUgAUsgBUEE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AiQgA0EgagwCCyADQQM2AiggA0Gev8AANgIkIANBAjsBICADQSBqDAELIANBAzYCKCADQaG/wAA2AiQgA0ECOwEgIANBIGoLIQQgA0HcAGogBTYCACADIAQ2AlggAyAGNgJUIAMgAjYCUCAAIANB0ABqED4gA0GAAWokAAvlBAEOfyMAQfAAayICJAAgASgCCCIFQQFxIAEoAgQhCSABKAIAIQogASgCDCEEIAVBAk8EQCAFQQF2IQ0gAkEgaiELA0AgAkEQaiAKIAZBBXQiA2oiAUEgaiIHIAEQaSACQTBqIAcgARBpIAJB0ABqIAAgAkEwahA/IAJByABqIgcgAkHoAGopAwA3AwAgAkFAayIOIAJB4ABqKQMANwMAIAJBOGoiDyACQdgAaikDADcDACACIAIpA1A3AzAgAyAJaiEDQQAhAQNAIAJBMGogAWoiCCAILQAAIAEgBGotAABzOgAAIAFBAWoiAUEQRw0AC0EAIQEDQCABIAJqQUBrIgggCC0AACACQRBqIAFqLQAAczoAACABQQFqIgFBEEcNAAsgAyACKQMwNwAAIANBGGogBykDADcAACADQRBqIA4pAwA3AAAgA0EIaiAPKQMANwAAIARBCGogC0EIaikAADcAACAEIAspAAA3AAAgDSAGQQFqIgZHDQALCwRAIAkgBUH+////AHFBBHQiAWohAyACIAEgCmoiAUEQaiIFIAEQpAEgAkEQaiAFIAEQpAEgAkEwahDjASACQThqIAJBGGoiASkDADcDACACIAIpAxA3AzAgAkHQAGogACACQTBqED8gASACQdgAaikDADcDACACIAIpA1A3AxBBACEBA0AgAkEQaiABaiIAIAAtAAAgASAEai0AAHM6AAAgAUEBaiIBQRBHDQALIAMgAikDEDcAACADQQhqIAJBGGopAwA3AAAgBCACKQMANwAAIARBCGogAkEIaikDADcAAAsgAkHwAGokAAv8BAEIfyMAQRBrIgckAAJ/IAIoAgQiBARAQQEgACACKAIAIAQgASgCDBEBAA0BGgtBACACQQxqKAIAIgNFDQAaIAIoAggiBCADQQxsaiEIIAdBDGohCQNAAkACQAJAAkAgBC8BAEEBaw4CAgEACwJAIAQoAgQiAkHBAE8EQCABQQxqKAIAIQMDQEEBIABB8MTAAEHAACADEQEADQcaIAJBQGoiAkHAAEsNAAsMAQsgAkUNAwsCQCACQT9NBEAgAkHwxMAAaiwAAEG/f0wNAQsgAEHwxMAAIAIgAUEMaigCABEBAEUNA0EBDAULQfDEwABBwABBACACQbDFwAAQhwIACyAAIAQoAgQgBEEIaigCACABQQxqKAIAEQEARQ0BQQEMAwsgBC8BAiECIAlBADoAACAHQQA2AggCQAJAAn8CQAJAAkAgBC8BAEEBaw4CAQACCyAEQQhqDAILIAQvAQIiA0HoB08EQEEEQQUgA0GQzgBJGyEFDAMLQQEhBSADQQpJDQJBAkEDIANB5ABJGyEFDAILIARBBGoLKAIAIgVBBkkEQCAFDQFBACEFDAILIAVBBUHgxMAAEJkCAAsgB0EIaiAFaiEGAkAgBUEBcUUEQCACIQMMAQsgBkF/aiIGIAIgAkEKbiIDQQpsa0EwcjoAAAsgBUEBRg0AIAZBfmohAgNAIAIgA0H//wNxIgZBCm4iCkEKcEEwcjoAACACQQFqIAMgCkEKbGtBMHI6AAAgBkHkAG4hAyACIAdBCGpGIAJBfmohAkUNAAsLIAAgB0EIaiAFIAFBDGooAgARAQBFDQBBAQwCCyAEQQxqIgQgCEcNAAtBAAsgB0EQaiQAC5YFAQ5/IAAgACgCHCIDQRZ3Qb/+/PkDcSADQR53QcCBg4Z8cXIgA3MiBCAAKAIQIgJBFndBv/78+QNxIAJBHndBwIGDhnxxciACcyILIAAoAhQiAXMiBnMiBSADIAAoAhgiA0EWd0G//vz5A3EgA0Eed0HAgYOGfHFyIANzIgdzIghzIAVBDHdBj568+ABxIAVBFHdB8OHDh39xcnM2AhwgACAEIAAoAgAiBXMiDCADIAEgAUEWd0G//vz5A3EgAUEed0HAgYOGfHFycyIJcyIDIAVBFndBv/78+QNxIAVBHndBwIGDhnxxciAFcyIFcyIBcyABQQx3QY+evPgAcSABQRR3QfDhw4d/cXJzNgIAIAAgByACIAAoAgwiAUEWd0G//vz5A3EgAUEed0HAgYOGfHFyIAFzIgdzIARzIgpzIgIgA3MgAkEMd0GPnrz4AHEgAkEUd0Hw4cOHf3FyczYCGCAAIAYgASAAKAIIIgJBFndBv/78+QNxIAJBHndBwIGDhnxxciACcyIGcyAEcyINIAggCXNzIgFzIAFBDHdBj568+ABxIAFBFHdB8OHDh39xcnM2AhQgACAKIAMgCHMiCSALIAIgACgCBCIBQRZ3Qb/+/PkDcSABQR53QcCBg4Z8cXIgAXMiCnMiDnNzIgJzIAJBDHdBj568+ABxIAJBFHdB8OHDh39xcnM2AhAgACABIAVzIARzIgIgAyAHc3MiBCANcyAEQQx3QY+evPgAcSAEQRR3QfDhw4d/cXJzNgIMIAAgBiAIcyAMcyIEIA5zIARBDHdBj568+ABxIARBFHdB8OHDh39xcnM2AgggACAJIApzIgAgAnMgAEEMd0GPnrz4AHEgAEEUd0Hw4cOHf3FyczYCBAuGBQEOfyAAIAAoAhwiA0ESd0GDhowYcSADQRp3Qfz582dxciADcyIEIAAoAhAiAkESd0GDhowYcSACQRp3Qfz582dxciACcyILIAAoAhQiAXMiBnMiBSADIAAoAhgiA0ESd0GDhowYcSADQRp3Qfz582dxciADcyIHcyIIcyAFQQx3QY+evPgAcSAFQRR3QfDhw4d/cXJzNgIcIAAgBCAAKAIAIgVzIgwgAyABIAFBEndBg4aMGHEgAUEad0H8+fNncXJzIglzIgMgBUESd0GDhowYcSAFQRp3Qfz582dxciAFcyIFcyIBcyABQQx3QY+evPgAcSABQRR3QfDhw4d/cXJzNgIAIAAgByACIAAoAgwiAUESd0GDhowYcSABQRp3Qfz582dxciABcyIHcyAEcyIKcyICIANzIAJBDHdBj568+ABxIAJBFHdB8OHDh39xcnM2AhggACAGIAEgACgCCCICQRJ3QYOGjBhxIAJBGndB/PnzZ3FyIAJzIgZzIARzIg0gCCAJc3MiAXMgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyczYCFCAAIAogAyAIcyIJIAsgAiAAKAIEIgFBEndBg4aMGHEgAUEad0H8+fNncXIgAXMiCnMiDnNzIgJzIAJBDHdBj568+ABxIAJBFHdB8OHDh39xcnM2AhAgACABIAVzIARzIgIgAyAHc3MiBCANcyAEQQx3QY+evPgAcSAEQRR3QfDhw4d/cXJzNgIMIAAgBiAIcyAMcyIEIA5zIARBDHdBj568+ABxIARBFHdB8OHDh39xcnM2AgggACAJIApzIgAgAnMgAEEMd0GPnrz4AHEgAEEUd0Hw4cOHf3FyczYCBAuhBAEbfyAAIAAoAhwiASAAKAIEIgJzIgkgACgCECIEIAAoAggiBnMiC3MiDiAAKAIMcyIFIAZzIgMgDnEiEiAFIAAoAhgiDHMiB3MgAyAAKAIAIgVzIhYgAiAMIAAoAhRzIgggBXMiAnMiDyABIAZzIgxzIhdxcyADIAhzIg0gByABIARzIhBzIgZzIhggC3EgBiAQcSIKcyIHcyITIAIgD3EgBiAIcyIIIAlycyAHcyIHcSIRIAwgDXEgCnMiCiASIAIgBHMiEiAFcSAMcyANc3NzIgRzIAogBSAGcyIKIAEgAnMiGXEgCCAJQX9zcSABc3NzIgEgB3NxIhQgEXMgAXEiFSAHcyIHIANxIhogBSABIBRzIgVxcyIUIAQgASARcyIDIAQgE3MiBHFzIgEgCnFzIAMgFXMgAXEgBHMiAyABcyIRIAhxIgpzIhMgAyAPcXMgCyADIAUgB3MiBHMiCyABIAVzIghzIg9xIAggEHEiEHMiFXMiGyAKIAIgA3FzIgMgDyAYcXMiAiALIA1xIAkgEXEiCSAUc3NzIg1zNgIEIAAgCSAbczYCACAAIBUgBCAXcXMiCSAHIA5xcyIOIAIgBiAIcXMiAnM2AhwgACANIAEgGXFzIgYgCyAMcSAQcyACc3M2AhQgACAEIBZxIBpzIANzIA5zIgE2AhAgACAJIAUgEnFzIAZzNgIIIAAgASACczYCGCAAIAEgE3M2AgwL+QQBCn8jAEEwayIDJAAgA0EDOgAoIANCgICAgIAENwMgIANBADYCGCADQQA2AhAgAyABNgIMIAMgADYCCAJ/AkACQCACKAIAIgpFBEAgAkEUaigCACIARQ0BIAIoAhAhASAAQQN0IQUgAEF/akH/////AXFBAWohByACKAIIIQADQCAAQQRqKAIAIgQEQCADKAIIIAAoAgAgBCADKAIMKAIMEQEADQQLIAEoAgAgA0EIaiABQQRqKAIAEQAADQMgAUEIaiEBIABBCGohACAFQXhqIgUNAAsMAQsgAigCBCIARQ0AIABBBXQhCyAAQX9qQf///z9xQQFqIQcgAigCCCEAA0AgAEEEaigCACIBBEAgAygCCCAAKAIAIAEgAygCDCgCDBEBAA0DCyADIAUgCmoiBEEcai0AADoAKCADIARBFGopAgA3AyAgBEEQaigCACEGIAIoAhAhCEEAIQlBACEBAkACQAJAIARBDGooAgBBAWsOAgACAQsgBkEDdCAIaiIMQQRqKAIAQcUARw0BIAwoAgAoAgAhBgtBASEBCyADIAY2AhQgAyABNgIQIARBCGooAgAhAQJAAkACQCAEQQRqKAIAQQFrDgIAAgELIAFBA3QgCGoiBkEEaigCAEHFAEcNASAGKAIAKAIAIQELQQEhCQsgAyABNgIcIAMgCTYCGCAIIAQoAgBBA3RqIgEoAgAgA0EIaiABKAIEEQAADQIgAEEIaiEAIAsgBUEgaiIFRw0ACwsgByACQQxqKAIASQRAIAMoAgggAigCCCAHQQN0aiIAKAIAIAAoAgQgAygCDCgCDBEBAA0BC0EADAELQQELIANBMGokAAvkBAEJfyMAQRBrIgQkAAJAAkACfwJAIAAoAghBAUYEQCAAQQxqKAIAIQcgBEEMaiABQQxqKAIAIgU2AgAgBCABKAIIIgI2AgggBCABKAIEIgM2AgQgBCABKAIAIgE2AgAgAC0AICEJIAAoAhwhCiAALQAYQQhxDQEgCiEIIAkhBiADDAILIAAoAgAgAEEEaigCACABEDkhAgwDCyAAKAIAIAEgAyAAKAIEKAIMEQEADQFBASEGIABBAToAIEEwIQggAEEwNgIcIARBADYCBCAEQbCnwAA2AgBBACAHIANrIgMgAyAHSxshB0EACyEBIAUEQCAFQQxsIQMDQAJ/AkACQAJAIAIvAQBBAWsOAgIBAAsgAkEEaigCAAwCCyACQQhqKAIADAELIAJBAmovAQAiBUHoB08EQEEEQQUgBUGQzgBJGwwBC0EBIAVBCkkNABpBAkEDIAVB5ABJGwshBSACQQxqIQIgASAFaiEBIANBdGoiAw0ACwsCfwJAIAcgAUsEQCAHIAFrIgEhAwJAAkACQCAGQQNxIgJBAWsOAwABAAILQQAhAyABIQIMAQsgAUEBdiECIAFBAWpBAXYhAwsgAkEBaiECIABBBGooAgAhASAAKAIAIQYDQCACQX9qIgJFDQIgBiAIIAEoAhARAABFDQALDAMLIAAoAgAgAEEEaigCACAEEDkMAQsgBiABIAQQOQ0BQQAhAgNAQQAgAiADRg0BGiACQQFqIQIgBiAIIAEoAhARAABFDQALIAJBf2ogA0kLIQIgACAJOgAgIAAgCjYCHAwBC0EBIQILIARBEGokACACC8EEAQh/IwBBIGsiAyQAIANBGGpCADcDACADQRBqQgA3AwAgA0EIakIANwMAIANCADcDACADIAIgAkEQahBMIAFBwAJqIQRBACECA0AgAiADaiIGIAYoAgAgAiAEaigCAHM2AgAgAkEEaiICQSBHDQALIAMQNUEAIQIDQCACIANqIgQgBCgCACIEQQR2IARzQYCegPgAcSIGIARzIAZBBHRzNgIAIAJBBGoiAkEgRw0ACyABQcABaiEGIAFB4AFqIQggAUGAAmohCSABQaACaiEKQcgAIQQCQANAQQAhAgNAIAIgA2oiBSAFKAIAIAIgCmooAgBzNgIAIAJBBGoiAkEgRw0ACyADEDogAxA1IARBCEYEQEEAIQIDQCACIANqIgQgBCgCACABIAJqKAIAczYCACACQQRqIgJBIEcNAAsgACADEEsgA0EgaiQADwtBACECA0AgAiADaiIFIAUoAgAgAiAJaigCAHM2AgAgAkEEaiICQSBHDQALIARBcGohBSADEFIgAxA1QQAhAgNAIAIgA2oiByAHKAIAIAIgCGooAgBzNgIAIAJBBGoiAkEgRw0ACyADEDsgAxA1IAUgBEFoaiIHSQ0BQQAhAgNAIAIgA2oiBSAFKAIAIAIgBmooAgBzNgIAIAJBBGoiAkEgRw0ACyAGQYB/aiEGIAhBgH9qIQggCUGAf2ohCSAKQYB/aiEKIAMQRiADEDUgBEFgaiIEQXhHDQALQXggB0HAoMAAEJoCAAsgByAFQdCgwAAQmgIAC6gEAgV/AXwjAEGQAWsiAyQAAkAgACgCACIEQYEBEAMEQEEHIQRBACEADAELQQFBAiAEEAQiBUEBRhtBACAFGyIFQQJHBEBBACEAQQAhBAwBCyADQShqIAQQBSADQRhqIAMoAiggAysDMBD9ASADKAIYBEBBAyEEIAMrAyAhCEEAIQAMAQsgA0EQaiAEEAYCQAJAIAMoAhAiBUUEQCADQQA2AlwMAQsgAygCFCEEIAMgBTYCfCADIAQ2AoABIAMgBDYCeCADQQhqIANB+ABqEN0BIANB2ABqIAMoAgggAygCDBD+ASADKAJcRQ0AIANBQGsgA0HgAGooAgAiBTYCACADIAMpA1g3AzhBASEAQQUhBCADKAI8IQcMAQsgA0HoAGogABCPAQJ/IAMoAmwiBgRAIANB0ABqIANB8ABqKAIAIgU2AgAgAyADKQNoNwNIIAMoAkwhB0EGDAELIANBETYCTCADIAA2AkggA0EBNgKMASADQQE2AoQBIANBxI7AADYCgAEgA0EANgJ4IAMgA0HIAGo2AogBIANBOGogA0H4AGoQRyADKAJAIQUgAygCPCEHQRELIQQgBkUhACAGQQBHIQYgAygCXEUNACADQdgAahD4AQsgBa2/IQgLIAMgCDkDgAEgAyAHNgJ8IAMgBToAeSADIAQ6AHggA0H4AGogASACEKcBIAYEQCADQcgAahD4AQsgAARAIANBOGoQ+AELIANBkAFqJAAL1QQBBH8gACABELECIQICQAJAAkAgABCoAg0AIAAoAgAhAwJAIAAQkwJFBEAgASADaiEBIAAgAxCyAiIAQbTkwAAoAgBHDQEgAigCBEEDcUEDRw0CQazkwAAgATYCACAAIAEgAhDqAQ8LIAEgA2pBEGohAAwCCyADQYACTwRAIAAQYQwBCyAAQQxqKAIAIgQgAEEIaigCACIFRwRAIAUgBDYCDCAEIAU2AggMAQtBpOTAAEGk5MAAKAIAQX4gA0EDdndxNgIACyACEI0CBEAgACABIAIQ6gEMAgsCQEG45MAAKAIAIAJHBEAgAkG05MAAKAIARw0BQbTkwAAgADYCAEGs5MAAQazkwAAoAgAgAWoiATYCACAAIAEQ+wEPC0G45MAAIAA2AgBBsOTAAEGw5MAAKAIAIAFqIgE2AgAgACABQQFyNgIEIABBtOTAACgCAEcNAUGs5MAAQQA2AgBBtOTAAEEANgIADwsgAhCnAiIDIAFqIQECQCADQYACTwRAIAIQYQwBCyACQQxqKAIAIgQgAkEIaigCACICRwRAIAIgBDYCDCAEIAI2AggMAQtBpOTAAEGk5MAAKAIAQX4gA0EDdndxNgIACyAAIAEQ+wEgAEG05MAAKAIARw0BQazkwAAgATYCAAsPCyABQYACTwRAIAAgARBjDwsgAUF4cUGc4sAAaiECAn9BpOTAACgCACIDQQEgAUEDdnQiAXEEQCACKAIIDAELQaTkwAAgASADcjYCACACCyEBIAIgADYCCCABIAA2AgwgACACNgIMIAAgATYCCAv6AwEJfyMAQTBrIgEkACAAKAIEIQUgACgCCCEDIAFBADYCGCABQoCAgIAQNwMQAkACQAJAAkACQCADQeADTQRAIAFBIGogBSADEEggAUEQahD4ASABQRhqIAFBKGooAgA2AgAgASABKQMgNwMQDAELIAMgA0HgA24iBEHgA2xrIAQhBgNAIAJB4ANqIgggA0sNAiABQSBqIAIgBWpB4AMQSCABKAIkIQkgAUEQaiABKAIoIgIQ7QEgASgCFCABKAIYaiAJIAIQrgIaIAFBADYCKCABIAIgASgCGGo2AhggAUEgahD4ASAIIQIgBkF/aiIGDQALRQ0AIAAoAggiAiAEQeADbCIESQ0CIAIgA0sNAyABQSBqIAQgBWogAiAEaxBIIAEoAiQhBCABQRBqIAEoAigiAhDtASABKAIUIAEoAhhqIAQgAhCuAhogAUEANgIoIAEgAiABKAIYajYCGCABQSBqEPgBCyABQQA7ASAgAUEAOgAiIAFBCGogAUEgaiABQRBqEG8gASgCDCECIAEoAggNAyABQRBqEPgBIAAQ+AEgAUEwaiQAIAIPCyACQeADaiADQbyDwAAQmQIACyAEIAJBzIPAABCaAgALIAIgA0HMg8AAEJkCAAsgASACNgIgQYCAwABBKyABQSBqQayAwABB3IPAABCYAQALxQQBB38gACAAKAIcIgRBFndBv/78+QNxIARBHndBwIGDhnxxciICIAAoAhgiAUEWd0G//vz5A3EgAUEed0HAgYOGfHFyIgMgAXMiAXMgAiAEcyIEQQx3QY+evPgAcSAEQRR3QfDhw4d/cXJzNgIcIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAMgACgCFCIBQRZ3Qb/+/PkDcSABQR53QcCBg4Z8cXIiAiABcyIBc3M2AhggACABQQx3QY+evPgAcSABQRR3QfDhw4d/cXIgAiAAKAIQIgFBFndBv/78+QNxIAFBHndBwIGDhnxxciIDIAFzIgFzczYCFCAAIAFBDHdBj568+ABxIAFBFHdB8OHDh39xciADIAAoAgwiAUEWd0G//vz5A3EgAUEed0HAgYOGfHFyIgUgAXMiAXMgBHNzNgIQIAAgACgCCCICQRZ3Qb/+/PkDcSACQR53QcCBg4Z8cXIiBiAAKAIEIgNBFndBv/78+QNxIANBHndBwIGDhnxxciIHIANzIgNzIAIgBnMiAkEMd0GPnrz4AHEgAkEUd0Hw4cOHf3FyczYCCCAAIAFBDHdBj568+ABxIAFBFHdB8OHDh39xciACIAVzcyAEczYCDCAAIANBDHdBj568+ABxIANBFHdB8OHDh39xciAHIAAoAgAiAUEWd0G//vz5A3EgAUEed0HAgYOGfHFyIgIgAXMiAXNzIARzNgIEIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAJzIARzNgIAC7UEAQd/IAAgACgCHCIEQRJ3QYOGjBhxIARBGndB/PnzZ3FyIgIgACgCGCIBQRJ3QYOGjBhxIAFBGndB/PnzZ3FyIgMgAXMiAXMgAiAEcyIEQQx3QY+evPgAcSAEQRR3QfDhw4d/cXJzNgIcIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAMgACgCFCIBQRJ3QYOGjBhxIAFBGndB/PnzZ3FyIgIgAXMiAXNzNgIYIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAIgACgCECIBQRJ3QYOGjBhxIAFBGndB/PnzZ3FyIgMgAXMiAXNzNgIUIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAMgACgCDCIBQRJ3QYOGjBhxIAFBGndB/PnzZ3FyIgUgAXMiAXMgBHNzNgIQIAAgACgCCCICQRJ3QYOGjBhxIAJBGndB/PnzZ3FyIgYgACgCBCIDQRJ3QYOGjBhxIANBGndB/PnzZ3FyIgcgA3MiA3MgAiAGcyICQQx3QY+evPgAcSACQRR3QfDhw4d/cXJzNgIIIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAIgBXNzIARzNgIMIAAgA0EMd0GPnrz4AHEgA0EUd0Hw4cOHf3FyIAcgACgCACIBQRJ3QYOGjBhxIAFBGndB/PnzZ3FyIgIgAXMiAXNzIARzNgIEIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAJzIARzNgIAC4wEAQd/IwBBIGsiAyQAIANBGGpCADcDACADQRBqQgA3AwAgA0EIakIANwMAIANCADcDACADIAIgAkEQahBMQQAhAgNAIAIgA2oiBCAEKAIAIAEgAmooAgBzNgIAIAJBBGoiAkEgRw0ACyABQYABaiEEIAFB4ABqIQYgAUFAayEHIAFBIGohCEEIIQkDQCADEDwgAxBDQQAhAgNAIAIgA2oiBSAFKAIAIAIgCGooAgBzNgIAIAJBBGoiAkEgRw0ACyAJQcgARgRAQQAhAgNAIAIgA2oiBCAEKAIAIgRBBHYgBHNBgJ6A+ABxIgYgBHMgBkEEdHM2AgAgAkEEaiICQSBHDQALIAFBwAJqIQEgAxA8QQAhAgNAIAIgA2oiBCAEKAIAIAEgAmooAgBzNgIAIAJBBGoiAkEgRw0ACyAAIAMQSyADQSBqJAAFIAMQPCADEE9BACECA0AgAiADaiIFIAUoAgAgAiAHaigCAHM2AgAgAkEEaiICQSBHDQALIAMQPCADEERBACECA0AgAiADaiIFIAUoAgAgAiAGaigCAHM2AgAgAkEEaiICQSBHDQALIAMQPCADEGdBACECA0AgAiADaiIFIAUoAgAgAiAEaigCAHM2AgAgAkEEaiICQSBHDQALIARBgAFqIQQgBkGAAWohBiAHQYABaiEHIAhBgAFqIQggCUEgaiEJDAELCwv2AwENfyAAIAAoAhwiAUEUd0GPnrz4AHEgAUEcd0Hw4cOHf3FyIAFzIgUgACgCECIDQRR3QY+evPgAcSADQRx3QfDhw4d/cXIgA3MiBiAAKAIUIgJzIgdzIgQgASAAKAIYIgFBFHdBj568+ABxIAFBHHdB8OHDh39xciABcyIIcyIJcyAEQRB3czYCHCAAIAUgACgCACIEcyIMIAEgAiACQRR3QY+evPgAcSACQRx3QfDhw4d/cXJzIgpzIgEgBEEUd0GPnrz4AHEgBEEcd0Hw4cOHf3FyIARzIgRzIgJzIAJBEHdzNgIAIAAgCCADIAAoAgwiAkEUd0GPnrz4AHEgAkEcd0Hw4cOHf3FyIAJzIghzIAVzIgtzIgMgAXMgA0EQd3M2AhggACAHIAIgACgCCCIDQRR3QY+evPgAcSADQRx3QfDhw4d/cXIgA3MiB3MgBXMiDSAJIApzcyICcyACQRB3czYCFCAAIAsgASAJcyIKIAYgAyAAKAIEIgJBFHdBj568+ABxIAJBHHdB8OHDh39xciACcyILcyIDc3MiBnMgBkEQd3M2AhAgACACIARzIAVzIgUgASAIc3MiASANcyABQRB3czYCDCAAIAcgCXMgDHMiASADcyABQRB3czYCCCAAIAogC3MiACAFcyAAQRB3czYCBAvtAwEGfyMAQTBrIgUkAAJAAkACQAJAAkAgAUEMaigCACIDBEAgASgCCCEHIANBf2pB/////wFxIgNBAWoiBkEHcSEEAn8gA0EHSQRAQQAhAyAHDAELIAdBPGohAiAGQfj///8DcSEGQQAhAwNAIAIoAgAgAkF4aigCACACQXBqKAIAIAJBaGooAgAgAkFgaigCACACQVhqKAIAIAJBUGooAgAgAkFIaigCACADampqampqamohAyACQUBrIQIgBkF4aiIGDQALIAJBRGoLIQIgBARAIAJBBGohAgNAIAIoAgAgA2ohAyACQQhqIQIgBEF/aiIEDQALCyABQRRqKAIADQEgAyEEDAMLQQAhAyABQRRqKAIADQFBASECDAQLIANBD0sNACAHKAIERQ0CCyADIANqIgQgA0kNAQsgBEUNAAJAIARBf0oEQCAEQQEQiAIiAkUNASAEIQMMAwsQygEACyAEQQEQrAIAC0EBIQJBACEDCyAAQQA2AgggACACNgIEIAAgAzYCACAFIAA2AgwgBUEgaiABQRBqKQIANwMAIAVBGGogAUEIaikCADcDACAFIAEpAgA3AxAgBUEMakGYpcAAIAVBEGoQPQRAQYimwABBMyAFQShqQbymwABB5KbAABCYAQALIAVBMGokAAuHBAEDfyMAQaAKayIDJAAgA0EQakEAQYAEEK8CGgJAIAJBgQRJBEAgA0EQaiACIAEgAkHcicAAEOkBIANBEDYC8AkgA0GQBGoQLCADQfgGakHUgMAAKQAANwMAIANBzIDAACkAADcD8AYgA0GAB2ogA0GQBGpB8AIQrgIaIANBkApqIgRCADcAACAEQQhqQgA3AAAgAkFwcSIEQY98akH+e00NASADQZAKaiABIARqIAJBD3EiBRCuAhogA0GQCmogBWpBECAFayIFIAUQrwIaIANB+AlqIANBmApqKQMANwMAIAMgAykDkAo3A/AJIAMgA0EQaiAEaiIENgKMCiADIAJBBHYiAjYCiAogAyABNgKACiADIANBEGo2AoQKIAMgA0HgCWoiBTYCnAogAyACNgKYCiADIAE2ApAKIAMgA0EQajYClAogA0GAB2ogA0GQCmoQbSADIAU2ApgKIAMgBDYClAogAyADQfAJajYCkAogA0GAB2ogA0GQCmoQdyADKAKECiICRQ0BIANBCGogAygCiAogAygCjApBAEdqQQR0IgFBABC3ASADKAIIIQQgACADKAIMIgU2AgQgACAENgIAIAUgAiABEK4CGiAAIAE2AgggA0GgCmokAA8LIAJBgARBzInAABCZAgALQYKJwABB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CyACIAFBsKfAAEEAIAVBCWogA2pBJyADaxAyIAVBMGokAAvYAgIDfwF+IwBBQGoiAiQAIAJBIGogAEEIaigCADYCACACIAApAgA3AxggAkEoaiACQRhqEG4CQAJAIAIoAigEQEEAIQAgAkEANgIQIAJCgICAgBA3AwgMAQsgAkEQaiACQTRqKAIAIgA2AgAgAiACKQIsNwMIIABFBEBBACEADAELIAJBGGogAigCDCAAEF4gAigCGCEDIAJBKGogAigCHCIEIAIoAiAiABAzIAIoAigEQCACKQIsIgVCgICAgPAfg0KAgICAIFINAgsgAiAANgIwIAIgBDYCLCACIAM2AiggASgCBCEDIAEoAgggAEYEfyAEIAMgABDAAUUFQQALIQAgAkEoahD4AQsgAkEIahD4ASABEPgBIAJBQGskACAADwsgAiAANgI4IAIgBDYCNCACIAM2AjAgAiAFNwMoQYCAwABBKyACQShqQbyAwABBrIPAABCYAQALsAIBBH8CQAJAAkACQAJAAkAgAUEDakF8cSIDIAFGDQAgAyABayIDIAIgAyACSRsiBEUNAEEAIQNBASEFA0AgASADai0AAEEKRg0GIAQgA0EBaiIDRw0ACyAEIAJBeGoiA0sNAgwBCyACQXhqIQNBACEECwNAAkAgASAEaiIFKAIAQYqUqNAAcyIGQX9zIAZB//37d2pxQYCBgoR4cQ0AIAVBBGooAgBBipSo0ABzIgVBf3MgBUH//ft3anFBgIGChHhxDQAgBEEIaiIEIANNDQELCyAEIAJLDQELQQAhBSACIARGDQEDQCABIARqLQAAQQpGBEAgBCEDQQEhBQwECyAEQQFqIgQgAkcNAAsMAQsgBCACQYzGwAAQmAIACyACIQMLIAAgAzYCBCAAIAU2AgALtgIBA38jAEGACmsiAyQAIANBEGpBAEGABBCvAhogAkGBBEkEQCADQRBqIAIgASACQZyKwAAQ6QEgA0EQNgKQBCADQZAEahAsIANB+AZqQdSAwAApAAA3AwAgA0HMgMAAKQAANwPwBiADQYAHaiADQZAEakHwAhCuAhogAyACQQ9xBH9BzIDAAAUgAyABNgLwCSADIANB4AlqNgL8CSADIAJBBHYiATYC+AkgAyADQRBqNgL0CSADQYAHaiADQfAJahA4IANBCGogA0EQaiABEJYBIAMo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QaHCwABBASADKAIEKAIMEQEADQMgAygCGCEFDAELQQEhBCADKAIAQZXCwABBAiADKAIEKAIMEQEARQ0BDAILQQEhBCACQQE6ABcgAkH0wcAANgIcIAIgAykCADcDCCACIAJBF2o2AhAgAykCCCEGIAMpAhAhByACIAMtACA6ADggAiADKAIcNgI0IAIgBTYCMCACIAc3AyggAiAGNwMgIAIgAkEIajYCGCABIAJBGGpBvKXAACgCABEAAA0BIAIoAhhBk8LAAEECIAIoAhwoAgwRAQAhBAwBCyABIANBvKXAACgCABEAACEECyAAQQE6AAUgACAEOgAEIAJBQGskAAv9AQEHfyMAQdAAayIDJAAgA0EANgIgIAEgAmsiCEEEdiIBQQIgAUECSRsiBgRAIAMhASAGIQcgAiEFA0AgA0EoaiAFQRBqIgkgBRCkASABQQhqIANBMGopAwA3AgAgASADKQMoNwIAIAMgAygCIEEBaiIENgIgIAFBEGohASAJIQUgB0F/aiIHDQALCyAIQSFPBEAgA0FAayACIAZBBHRqIgFBEGogARCkAQsgBEECTwRAIAAgAykDADcAACAAQRhqIANBGGopAwA3AAAgAEEQaiADQRBqKQMANwAAIABBCGogA0EIaikDADcAACADQdAAaiQADwsgBEECEJ0BAAuSAgEBfyMAQTBrIgMkACADIAI6ABQgAyABNgIQIANBCGpBAEEAELcBIANBADYCICADIAMpAwg3AxggA0EoaiADQRBqEJkBAkACQAJAIAMtAChFBEADQCADLQApRQ0CIAMtACohAiADKAIgIgEgAygCGEYEfyADQRhqIAEQwQEgAygCIAUgAQsgAygCHGogAjoAACADIAMoAiBBAWo2AiAgA0EoaiADQRBqEJkBIAMtAChFDQALCyAAQQA2AgQgACADKAIsNgIAIANBGGoQ+AEgAygCECICQYQBSQ0CDAELIAAgAykDGDcCACAAQQhqIANBIGooAgA2AgAgAygCECICQYMBTQ0BCyACEAALIANBMGokAAudAgEEfyMAQSBrIgIkABAQIQQgASgCACIDIAQQESEBIAJBEGoQ4gEgAigCFCABIAIoAhAiBRshAQJAAkACQAJAAkAgBUUEQCABEAtBAUYNASAAQQI6AAQgAUGEAUkNAwwCCyAAQQM6AAQgACABNgIADAILIAEgAxASIQMgAkEIahDiASACKAIMIAMgAigCCCIFGyEDAkACQCAFRQRAIAIgAzYCHCACQRxqENYBDQIgAEECOgAEIANBhAFJDQEgAxAADAELIABBAzoABCAAIAM2AgALIAFBhAFPDQEMAgsgAEEAOgAEIAAgAzYCACABQYQBTwRAIAEQAAsgBEGDAUsNAgwDCyABEAALIARBgwFNDQELIAQQAAsgAkEgaiQAC4wCAQR/IwBBQGoiAyQAIAFBA24iBEH/////A3EgBEchBiAEQQJ0IQUCQCABIARBA2xrIgRFBEAgBSEBDAELAkACQAJAIAJFBEBBAiEBIARBf2oOAgMCAQsgBiAFQQRqIgEgBUlyIQYMAwsgA0EUakEBNgIAIANBHGpBATYCACADQTRqQQE2AgAgA0E8akEANgIAIANBmJ7AADYCECADQQA2AgggA0EuNgIkIANBtJ7AADYCMCADQeydwAA2AjggA0EANgIoIAMgA0EgajYCGCADIANBKGo2AiAgA0EIakGcn8AAENUBAAtBAyEBCyABIAVyIQELIAAgATYCBCAAIAZBAXM2AgAgA0FAayQAC/0BAgh/An4jAEHQAGsiAiQAIAEoAggiBgRAIAEoAgwhBCABKAIEIQcgASgCACEIA0AgAiAIIAVBBHQiAWoiA0EQaiADEKQBIAEgB2ohA0EAIQEDQCABIAJqIgkgCS0AACABIARqLQAAczoAACABQQFqIgFBEEcNAAsgAkEQahDjASACQRhqIAJBCGoiASkDADcDACACIAIpAwA3AxAgAkEwaiAAIAJBEGoQRSABIAJBOGopAwAiCjcDACACIAIpAzAiCzcDACAEQQhqIAo3AAAgBCALNwAAIAMgCzcAACADQQhqIAo3AAAgBiAFQQFqIgVHDQALCyACQdAAaiQAC/sBAgV/AX4jAEEwayICJAAgASgCBCEEIAJBCGogASgCCCIFENgBIAIgAikDCDcDECACIAJBEGooAgQiA0EBELcBIAIgAzYCICACIAIoAgQiBjYCHCACIAIoAgA2AhggAkEoaiAEIAUgBiADIAIoAhAgAigCFBAiAkACQCADAn8gAi0AKEEERgRAIAIoAiwMAQsgAikDKCIHQv8Bg0IEUg0BIAdCIIinCyIDTwRAIAIgAzYCIAsgACACKQMYNwIEIABBADYCACAAQQxqIAJBIGooAgA2AgAMAQsgAEEBNgIAIAAgBzcCBCACQRhqEPgBCyABEPgBIAJBMGokAAuRAgEEfyMAQTBrIgMkACACKAIEIQQgAigCCCECEAohBiADQSBqIgUgATYCCCAFQQA2AgQgBSAGNgIAAn8CQAJAIAMoAigEQCADQRhqIANBKGooAgA2AgAgAyADKQMgNwMQA0AgAkUNAyACQX9qIQIgAyAENgIgIARBAWohBCADQQhqIANBEGogA0EgahC2ASADKAIIRQ0ACyADKAIMIQIgAygCECIBQYQBSQ0BIAEQAAwBCyADKAIgIQILQQEMAQsgA0EoaiADQRhqKAIANgIAIAMgAykDEDcDICADIANBIGooAgA2AgQgA0EANgIAIAMoAgQhAiADKAIACyEBIAAgAjYCBCAAIAE2AgAgA0EwaiQAC4sCAgN/AX4jAEEwayICJAAgASgCBEUEQCABKAIMIQMgAkEQaiIEQQA2AgAgAkKAgICAEDcDCCACIAJBCGo2AhQgAkEoaiADQRBqKQIANwMAIAJBIGogA0EIaikCADcDACACIAMpAgA3AxggAkEUakHkosAAIAJBGGoQPRogAUEIaiAEKAIANgIAIAEgAikDCDcCAAsgASkCACEFIAFCgICAgBA3AgAgAkEgaiIDIAFBCGoiASgCADYCACABQQA2AgAgAiAFNwMYQQxBBBCIAiIBRQRAQQxBBBCsAgALIAEgAikDGDcCACABQQhqIAMoAgA2AgAgAEHApMAANgIEIAAgATYCACACQTBqJAAL/gEBA38jAEEwayICJAAgAkEQaiABEKYBIAJBCGogAigCFCIDQYAgIANBgCBJG0EAIAIoAhAbQQAQtwEgAkEANgIgIAIgAikDCDcDGCACQShqIAEQlwECQAJAIAItAChFBEADQCACLQApRQ0CIAItACohBCACKAIgIgMgAigCGEYEfyACQRhqIAMQwQEgAigCIAUgAwsgAigCHGogBDoAACACIAIoAiBBAWo2AiAgAkEoaiABEJcBIAItAChFDQALCyAAQQA2AgQgACACKAIsNgIAIAJBGGoQ+AEMAQsgACACKQMYNwIAIABBCGogAkEgaigCADYCAAsgAkEwaiQAC+UBAQF/IwBBEGsiAiQAIAAoAgAgAkEANgIMIAJBDGoCfyABQYABTwRAIAFBgBBP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AXwjAEEgayICJAAgAkEQaiABKAIAEAUgAiACKAIQIAIrAxgQ/QECQCACKAIARQ0AIAIrAwghBSABKAIAEBZFDQAgBUQAAAAAAADgw2YhAUIAQv///////////wACfiAFmUQAAAAAAADgQ2MEQCAFsAwBC0KAgICAgICAgIB/C0KAgICAgICAgIB/IAEbIAVE////////30NkGyAFIAViGyEDQgEhBAsgACADNwMIIAAgBDcDACACQSBqJAALnQEBAX8jAEFAaiICJAAgAkIANwM4IAJBOGogACgCABAcIAJBFGpBAjYCACACQRxqQQE2AgAgAiACKAI8IgA2AjAgAiACKAI4NgIsIAIgADYCKCACQS02AiQgAkGAlcAANgIQIAJBADYCCCACIAJBKGo2AiAgAiACQSBqNgIYIAEgAkEIahCzASACKAIoBEAgAigCLBAoCyACQUBrJAALmwECAX8BfiMAQTBrIgIkACACQQhqIAEQjAECQAJAIAIoAghBAUYEQCACKQMQIgNCf1UNAQsgASACQShqQbyEwAAQQCEBIABBAToAACAAIAE2AgQMAQsgAAJ/IANCgAJaBEAgAkEBOgAYIAIgAzcDICAAIAJBGGogAkEoahCbATYCBEEBDAELIAAgAzwAAUEACzoAAAsgAkEwaiQAC6EBAQF/IwBBIGsiAiQAAkACQCABKAIAEBtFBEAgASgCABAVDQEgAEEANgIEDAILIAJBEGogARC9ASAAQQhqIAJBGGooAgA2AgAgACACKQMQNwIADAELIAIgASgCABAYNgIMIAJBEGogAkEMahC9ASAAQQhqIAJBGGooAgA2AgAgACACKQMQNwIAIAIoAgwiAEGEAUkNACAAEAALIAJBIGokAAuRAQEDfyMAQYABayIDJAAgAC0AACECQQAhAANAIAAgA2pB/wBqQTBBNyACQQ9xIgRBCkkbIARqOgAAIABBf2ohACACIgRBBHYhAiAEQQ9LDQALIABBgAFqIgJBgQFPBEAgAkGAAUHQwsAAEJgCAAsgAUEBQeDCwABBAiAAIANqQYABakEAIABrEDIgA0GAAWokAAuSAQEDfyMAQYABayIDJAAgAC0AACECQQAhAANAIAAgA2pB/wBqQTBB1wAgAkEPcSIEQQpJGyAEajoAACAAQX9qIQAgAiIEQQR2IQIgBEEPSw0ACyAA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QS82AgAgA0GcwMAANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgAzYCKCADIANBBGo2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0HQxsAANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0HwxsAANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0Gkx8AANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakEDNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0H0x8AANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgAzYCKCADIANBBGo2AiAgA0EIaiACENUBAAtpAQF/IwBBMGsiAiQAIAIgATYCKCACIAA2AiQgAiABNgIgIAJBCGogAkEgahDdASACQRBqIAIoAgggAigCDBD+ASACQShqIAJBGGooAgA2AgAgAiACKQMQNwMgIAJBIGoQQiACQTBqJAALaAECfyMAQSBrIgMkACADQQA2AhgCQCABIAJrIgFBECABQRBJIgQbIgFFDQAgA0EIaiACIAEQrgIaIAQNACAAIAMpAwg3AAAgAEEIaiADQRBqKQMANwAAIANBIGokAA8LIAFBEBCdAQALcgEDfyMAQSBrIgIkAAJ/QQEgACABEF8NABogASgCBCEDIAEoAgAhBCACQQA2AhwgAkGwp8AANgIYIAJBATYCFCACQeC/wAA2AhAgAkEANgIIQQEgBCADIAJBCGoQPQ0AGiAAQQRqIAEQXwsgAkEgaiQAC2gBAn8jAEEgayICJAAgAkEYagJ/QQAgASgCCEUNABpBACABKAIEIgMgASgCAGsiASABIANLGwsiATYCACACQQE2AhQgAiABNgIQIAJBCGogAkEQahDUASAAIAIpAwg3AwAgAkEgaiQAC3IBAX8jAEEwayIDJAAgAyACNgIEIAMgATYCACADQRRqQQg2AgAgA0EJNgIMIAMgADYCCCADIAM2AhAgA0ECNgIsIANBAjYCJCADQaSQwAA2AiAgA0EANgIYIAMgA0EIajYCKCADQRhqEKsBIANBMGokAAt8AQN/IAAgABCzAiIAQQgQ/wEgAGsiAhCxAiEAQbDkwAAgASACayIBNgIAQbjkwAAgADYCACAAIAFBAXI2AgRBCEEIEP8BIQJBFEEIEP8BIQNBEEEIEP8BIQQgACABELECIAQgAyACQQhramo2AgRBxOTAAEGAgIABNgIAC3IAIwBBMGsiASQAQdDgwAAtAAAEQCABQRRqQQI2AgAgAUEcakEBNgIAIAFBzKPAADYCECABQQA2AgggAUEvNgIkIAEgADYCLCABIAFBIGo2AhggASABQSxqNgIgIAFBCGpB9KPAABDVAQALIAFBMGokAAthAQJ/IwBBEGsiAiQAIAAoAgAiAEEIaigCACEDIABBBGooAgAhACACIAEQ5QEgAwRAA0AgAiAANgIMIAIgAkEMahBoIABBAWohACADQX9qIgMNAAsLIAIQ4AEgAkEQaiQAC2gBAX8jAEFAaiIBJAAgAUEANgIIIAFCgICAgBA3AwAgAUEQaiABEOQBIAAgAUEQahCxAQRAQeSOwABBNyABQThqQZyPwABB+I/AABCYAQALIAEoAgQgASgCCBAHIAEQ+AEgAUFAayQAC2MBAX8jAEEgayIDJAAgAyABNgIEIAMgADYCACADQRhqIAJBEGopAgA3AwAgA0EQaiACQQhqKQIANwMAIAMgAikCADcDCCADQcTAwAAgA0EEakHEwMAAIANBCGpBgKjAABBNAAteACAAIAEgAiADECQhAAJAAkBBnYPAAC0AAAR/IAAgA0sNASABIAAgAmogAyAAaxC4AQVBAAsgAGogAEkNAQ8LIAAgA0HghsAAEJgCAAtB8IbAAEEqQZyHwAAQnAIAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrI7AACACQQhqED0gAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpB5KLAACACQQhqED0gAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBmKXAACACQQhqED0gAkEgaiQAC1MBAn8jAEEgayICJAAgASgCBCEDIAEoAgAgAkEYaiAAQRBqKQIANwMAIAJBEGogAEEIaikCADcDACACIAApAgA3AwggAyACQQhqED0gAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrMTAACACQQhqED0gAkEgaiQAC1MBAn8jAEEgayICJAAgACgCBCEDIAAoAgAgAkEYaiABQRBqKQIANwMAIAJBEGogAUEIaikCADcDACACIAEpAgA3AwggAyACQQhqED0gAkEgaiQAC1YBAX8jAEEgayICJAAgAiAANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrI7AACACQQhqED0gAkEgaiQAC1YBAX8jAEEgayICJAAgAiAANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrMTAACACQQhqED0gAkEgaiQAC3UBA38jAEEQayIDJAAgASgCBCEFIAEoAggaIANBCGoiBCACKAIALQAAuBABNgIEIARBADYCACADKAIMIQIgAygCCCIERQRAIAEoAgAgBSACEBMgASABKAIEQQFqNgIECyAAIAQ2AgAgACACNgIEIANBEGokAAtcAQF/AkAgAUUEQEEBIQIMAQsgAUEATgRAIAFBf3NBH3YhAwJ/IAJFBEAgASADEIgCDAELIAEgAxDbAQsiAg0BIAEgAxCsAgALEMoBAAsgACACNgIEIAAgATYCAAtWAQJ/AkAgAEEDcEEDc0EDcCIERQRADAELQQAhAANAIAAgAkcEQCAAIAFqQT06AAAgAEEBaiEDQQEhACADIARJDQEMAgsLIAIgAkGsn8AAEJ4BAAsgAwtKAQF/IwBBIGsiAiQAIAIgASgCBCABKAIIEEggAkEYaiACQQhqKAIANgIAIAIgAikDADcDECAAIAJBEGoQeCABEPgBIAJBIGokAAtOAQF/IwBBMGsiAiQAIAJBEGogARA2IAJBKGogAkEYaigCADYCACACIAIpAxA3AyAgAkEIaiACQSBqEN0BIAAgAikDCDcDACACQTBqJAALRgEBfyMAQSBrIgEkACABQRhqIABBEGopAgA3AwAgAUEQaiAAQQhqKQIANwMAIAEgACkCADcDCCABQQhqEKsBIAFBIGokAAtfAQN/IwBBEGsiASQAAkAgACgCDCICBEAgACgCCCIDRQ0BIAEgAjYCCCABIAA2AgQgASADNgIAIAEQ3wEAC0H8osAAQStBsKTAABC+AQALQfyiwABBK0GgpMAAEL4BAAtRAQR/IwBBEGsiAiQAIAJBCGogASgCACIDEBpBABC3ASACKAIIIQQgACACKAIMIgU2AgQgACAENgIAIAEgBRDHASAAIAMQGjYCCCACQRBqJAALUgEBfyMAQSBrIgMkACADQQxqQQE2AgAgA0EUakEANgIAIANBsKfAADYCECADQQA2AgAgAyABNgIcIAMgADYCGCADIANBGGo2AgggAyACENUBAAtTAQF/IwBBIGsiAiQAIAJBDGpBATYCACACQRRqQQE2AgAgAkG8wMAANgIIIAJBADYCACACQcYANgIcIAIgADYCGCACIAJBGGo2AhAgAiABENUBAAtDAQN/AkAgAkUNAANAIAAtAAAiBCABLQAAIgVGBEAgAEEBaiEAIAFBAWohASACQX9qIgINAQwCCwsgBCAFayEDCyADC0sBAX8jAEEQayICJAAgAkEIaiAAIAFBARCLAQJAIAIoAgwiAEGBgICAeEcEQCAARQ0BIAIoAgggABCsAgALIAJBEGokAA8LEMoBAAtLAQF/IwBBEGsiAyQAIANBCGogACABIAIQiwECQCADKAIMIgBBgYCAgHhHBEAgAEUNASADKAIIIAAQrAIACyADQRBqJAAPCxDKAQALNAEBfyMAQRBrIgIkACACIABBCGo2AgggAiAANgIMIAEgAkEIaiACQQxqEIYBIAJBEGokAAtKAQF/IAAoAgAiACgCACAAKAIIIgNrIAJJBH8gACADIAIQwgEgACgCCAUgAwsgACgCBGogASACEK4CGiAAIAAoAgggAmo2AghBAAtHAQF/IAAoAgAiACgCACAAKAIIIgNrIAJJBEAgACADIAIQeyAAKAIIIQMLIAAoAgQgA2ogASACEK4CGiAAIAIgA2o2AghBAAtHAQF/IAAoAgAiACgCACAAKAIIIgNrIAJJBEAgACADIAIQfCAAKAIIIQMLIAAoAgQgA2ogASACEK4CGiAAIAIgA2o2AghBAAtCAQN/EB4iAxAXIgQQGCECIARBhAFPBEAgBBAACyACIAAoAgAgARAZIAJBhAFPBEAgAhAACyADQYQBTwRAIAMQAAsLQwEBfyAAKAIAIAAoAggiA2sgAkkEfyAAIAMgAhDCASAAKAIIBSADCyAAKAIEaiABIAIQrgIaIAAgACgCCCACajYCCAtDAQF/An9BACABKAIAIgIgASgCBE8NABogASACQQFqNgIAIAEoAggoAgAgAhAIIQFBAQshAiAAIAE2AgQgACACNgIAC0oBAX8jAEEgayIAJAAgAEEUakEBNgIAIABBHGpBADYCACAAQfClwAA2AhAgAEHApcAANgIYIABBADYCCCAAQQhqQfilwAAQ1QEAC0YBAn8gASgCBCECIAEoAgAhA0EIQQQQiAIiAUUEQEEIQQQQrAIACyABIAI2AgQgASADNgIAIABB0KTAADYCBCAAIAE2AgALOwIBfwF8IAEoAhhBAXEhAiAAKwMAIQMgASgCEEEBRgRAIAEgAyACIAFBFGooAgAQLg8LIAEgAyACEDcLOwEBfyMAQRBrIgIkACACQQhqIAFBBGogARCSASACKAIMIQEgACACKAIINgIAIAAgATYCBCACQRBqJAALPAEBfyMAQRBrIgIkACACQQhqIAAgARCCASACKAIMIgBBgYCAgHhHBEAgAigCCCAAEKwCAAsgAkEQaiQACzsBAX8jAEEQayICJAAgAkEIaiAAIAEQdiACKAIMIgBBgYCAgHhHBEAgAigCCCAAEKwCAAsgAkEQaiQACzsBAX8gAUEHaiICIAFJBEBB+JnAAEEzQaCbwAAQnAIACyAAIAJBA3Y2AgAgACABQQNqQQJ2QQNsNgIECzkBAX8gAUEQdkAAIQIgAEEANgIIIABBACABQYCAfHEgAkF/RiIBGzYCBCAAQQAgAkEQdCABGzYCAAs5AAJAAn8gAkGAgMQARwRAQQEgACACIAEoAhARAAANARoLIAMNAUEACw8LIAAgAyAEIAEoAgwRAQALNwEBfyMAQRBrIgIkACACIAE2AgwgACACQQxqEI4BIAIoAgwiAEGEAU8EQCAAEAALIAJBEGokAAs0AQF/An9BACABKAIEQQFHDQAaIAFBCGooAgAiAiABKAIARgshASAAIAI2AgQgACABNgIACz8BAX8jAEEgayICJAAgAkEBOgAYIAIgATYCFCACIAA2AhAgAkGswMAANgIMIAJBsKfAADYCCCACQQhqELwBAAswAQF/AkAgACgCACIAEAJBAUcNACAAEAwiABALQQFGIQEgAEGEAUkNACAAEAALIAELMwACQCAAQfz///8HSw0AIABFBEBBBA8LIAAgAEH9////B0lBAnQQiAIiAEUNACAADwsACzYBAX8jAEEQayICJAAgAkEIaiABENABIAIoAgwhASAAIAIoAgg2AgAgACABNgIEIAJBEGokAAslAQF/IwBBEGsiAiQAIAIgADYCDCABIAJBDGoQhAEgAkEQaiQACzIAIAAoAgAhACABEI8CRQRAIAEQkAJFBEAgACABEJsCDwsgACABEJUBDwsgACABEJQBCyYAAkAgACABEE4iAUUNACABELQCEJMCDQAgAUEAIAAQrwIaCyABCzYAIAAoAgAhACABEI8CRQRAIAEQkAJFBEAgADEAAEEBIAEQWw8LIAAgARCQAQ8LIAAgARCRAQsyAQF/IAAgASgCACABKAIIIgJLBH8gASACEM8BIAEoAggFIAILNgIEIAAgASgCBDYCAAsuAQF/IAEoAgAiAgRAIABBATYCCCAAIAI2AgQgACABKAIENgIADwsgAEEANgIICy0BAX8jAEEQayIBJAAgAUEIaiAAQQhqKAIANgIAIAEgACkCADcDACABEJMBAAsyAQF/QQEhASAALQAEBH8gAQUgACgCACIAKAIAQbTCwABBASAAQQRqKAIAKAIMEQEACwsnACAAIAAoAgRBAXEgAXJBAnI2AgQgACABaiIAIAAoAgRBAXI2AgQLOgECf0HU4MAALQAAIQFB1ODAAEEAOgAAQdjgwAAoAgAhAkHY4MAAQQA2AgAgACACNgIEIAAgATYCAAsnACAAQgA3AAAgAEEYakIANwAAIABBEGpCADcAACAAQQhqQgA3AAALNAAgAEEDOgAgIABCgICAgIAENwIYIABBADYCECAAQQA2AgggAEHMjsAANgIEIAAgATYCAAsyAQF/IAEoAgBBosLAAEEBIAEoAgQoAgwRAQAhAiAAQQA6AAUgACACOgAEIAAgATYCAAsgAQF/AkAgAEEEaigCACIBRQ0AIAAoAgBFDQAgARAoCwsmAQF/IwBBEGsiAyQAIAMgATYCDCADIAA2AgggA0EIaiACEL8BAAsjAAJAIAFB/P///wdNBEAgACABQQQgAhCAAiIADQELAAsgAAsfACABIANGBEAgACACIAEQrgIaDwsgASADIAQQogEACyMAIAIgAigCBEF+cTYCBCAAIAFBAXI2AgQgACABaiABNgIACx4AIABFBEAQpQIACyAAIAIgAyAEIAUgASgCEBEKAAsfAQJ+IAApAwAiAiACQj+HIgOFIAN9IAJCf1UgARBbCyABAX8gACgCACAAKAIIIgJrIAFJBEAgACACIAEQwgELCxwAIABFBEAQpQIACyAAIAIgAyAEIAEoAhARBwALHAAgAEUEQBClAgALIAAgAiADIAQgASgCEBEWAAscACAARQRAEKUCAAsgACACIAMgBCABKAIQERcACxwAIABFBEAQpQIACyAAIAIgAyAEIAEoAhARCAALHAAgAEUEQBClAgALIAAgAiADIAQgASgCEBEYAAseACAAIAFBA3I2AgQgACABaiIAIAAoAgRBAXI2AgQLGgAgAEUEQBClAgALIAAgAiADIAEoAhARAwALFAAgACgCAARAIABBBGooAgAQKAsLIgAgAC0AAEUEQCABQcTFwABBBRArDwsgAUHAxcAAQQQQKwsYACAARQRAEKUCAAsgACACIAEoAhARAAALEQAgACgCAARAIAAoAgQQKAsLGQEBfyAAKAIQIgEEfyABBSAAQRRqKAIACwsSAEEAQRkgAEEBdmsgAEEfRhsLFgAgACABQQFyNgIEIAAgAWogATYCAAsUACAAKAIAIgBBhAFPBEAgABAACwsUACAAIAI5AwggACABQQBHrTcDAAsXACAAIAI2AgggACABNgIEIAAgAjYCAAsQACAAIAFqQX9qQQAgAWtxCwwAIAAgASACIAMQLQsLACABBEAgABAoCwsPACAAQQF0IgBBACAAa3ILFgAgACgCACABIAIgACgCBCgCDBEBAAsZACABKAIAQaDZwABBBSABKAIEKAIMEQEACwoAIABBCGoQ+AELFAAgACgCACABIAAoAgQoAgwRAAALDwAgACABIAIgAyAEECUACwgAIAAgARBOCxAAIAAoAgAgACgCBCABEC8LEAAgASAAKAIEIAAoAggQKwsWAEHY4MAAIAA2AgBB1ODAAEEBOgAACxMAIABB0KTAADYCBCAAIAE2AgALDQAgAC0ABEECcUEBdgsQACABIAAoAgAgACgCBBArCw0AIAAtABhBEHFBBHYLDQAgAC0AGEEgcUEFdgsNACAAIAEgAhDIAUEACwoAQQAgAGsgAHELCwAgAC0ABEEDcUULDAAgACABQQNyNgIECw0AIAAoAgAgACgCBGoLDQAgACgCACABEFlBAAsOACAAKAIAGgNADAALAAsMACAAIAEgAhCfAQALDAAgACABIAIQoAEACwwAIAAgASACEKEBAAsNACAANQIAQQEgARBbCwwAIAAgASACEOcBAAsNACAAKAIAIAEgAhBKCw0AIAApAwBBASABEFsLDgAgACgCAC0AACABEGALDgAgACgCACkDACABEEkLCwAgACMAaiQAIwALDgAgAUH4iMAAQQoQgwILBwAgABD4AQsMACAAKAIAIAEQjQELDABBxJTAAEEyEB0ACw4AIAFBoKHAAEEIEIMCCwoAIAAoAgRBeHELCgAgACgCBEEBcQsKACAAKAIMQQFxCwoAIAAoAgxBAXYLCwAgACgCACABEH8LGQAgACABQfTgwAAoAgAiAEEwIAAbEQIAAAsLACAAKAIAIAEQXwsKACAAIAEgAhBaCwsAIAAgASACEIUBCw4AIAFBqJPAAEECEIMCCwcAIAAgAWoLBwAgACABawsHACAAQQhqCwcAIABBeGoLDQBCyLXgz8qG29OJfwsNAELujtXpx4aXxKR/CwwAQtf+oZ2h8ZeHHQsDAAELC/xbCQBBgIDAAAupCmNhbGxlZCBgUmVzdWx0Ojp1bndyYXAoKWAgb24gYW4gYEVycmAgdmFsdWUAAQAAAAQAAAAEAAAAAgAAAAMAAAAUAAAABAAAAAQAAAAxMjM0NTY3ODkwMDk4NzY1/////////////////////////////////////////////////////////z7///8/NDU2Nzg5Ojs8Pf////////8AAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGf///////xobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIz/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8CAABzcmNcbGliLnJzAAAAnwEQAAoAAAAaAAAALQAAAJ8BEAAKAAAALAAAADIAAACfARAACgAAADIAAAAyAAAAnwEQAAoAAAA4AAAAKQAAAJ8BEAAKAAAAPQAAAEAAAACfARAACgAAAEcAAAAyAAAAnwEQAAoAAABNAAAAMgAAAJ8BEAAKAAAAUAAAACEAAACfARAACgAAAFMAAAAjAAAABQAAAAAAAAABAAAABgAAAAUAAAAAAAAAAQAAAAcAAAAQAAAAQzpcVXNlcnNcd2FuZ2xpcDhcLmNhcmdvXHJlZ2lzdHJ5XHNyY1xnaXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjNcZ2VuZXJpYy1hcnJheS0wLjE0LjZcc3JjXGxpYi5ycwAAAGACEABhAAAANQIAAAkAAABpbnZhbGlkIHZhbHVlOiAsIGV4cGVjdGVkIAAA1AIQAA8AAADjAhAACwAAAEM6XFVzZXJzXHdhbmdsaXA4XC5jYXJnb1xyZWdpc3RyeVxzcmNcZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzXGJhc2U2NC0wLjIxLjBcc3JjXGVuY29kZS5ycwAAAAADEABdAAAAUAAAACcAAAB1c2l6ZSBvdmVyZmxvdyB3aGVuIGNhbGN1bGF0aW5nIGI2NCBsZW5ndGgAAAADEABdAAAAVwAAAAoAAAAKAAAAFAAAAAQAAAAEAAAAQzpcVXNlcnNcd2FuZ2xpcDhcLmNhcmdvXHJlZ2lzdHJ5XHNyY1xnaXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjNcYmFzZTY0LTAuMjEuMFxzcmNcZW5naW5lXG1vZC5yc2ludGVnZXIgb3ZlcmZs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XFVzZXJzXHdhbmdsaXA4XC5jYXJnb1xyZWdpc3RyeVxzcmNcZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzXGJhc2U2NC0wLjIxLjBcc3JjXGVuZ2luZVxnZW5lcmFsX3B1cnBvc2VcZGVjb2RlLnJzACsNEAB0AAAAJAAAABIAAABDOlxVc2Vyc1x3YW5nbGlwOFwuY2FyZ29ccmVnaXN0cnlcc3JjXGdpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyM1xiYXNlNjQtMC4yMS4wXHNyY1xlbmdpbmVcZ2VuZXJhbF9wdXJwb3NlXGRlY29kZV9zdWZmaXgucnMAsA0QAHsAAAAdAAAAFAAAAGludGVybmFsIGVycm9yOiBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGU6IAAAPA4QACoAAABJbXBvc3NpYmxlOiBtdXN0IG9ubHkgaGF2ZSAwIHRvIDggaW5wdXQgYnl0ZXMgaW4gbGFzdCBjaHVuaywgd2l0aCBubyBpbnZhbGlkIGxlbmd0aHNwDhAAVAAAALANEAB7AAAAhQAAAA4AAACwDRAAewAAAJoAAAAJAAAAaW50ZXJuYWwgZXJyb3I6IGVudGVyZWQgdW5yZWFjaGFibGUgY29kZTogAADsDhAAKgAAAEltcG9zc2libGUgcmVtYWluZGVyIA8QABQAAABDOlxVc2Vyc1x3YW5nbGlwOFwuY2FyZ29ccmVnaXN0cnlcc3JjXGdpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyM1xiYXNlNjQtMC4yMS4wXHNyY1xlbmNvZGUucnMAAAA8DxAAXQAAAG4AAAAWAAAAPA8QAF0AAACBAAAACQAAAEM6XFVzZXJzXHdhbmdsaXA4XC5jYXJnb1xyZWdpc3RyeVxzcmNcZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzXGFlcy0wLjguMlxzcmNcc29mdFxmaXhzbGljZTMyLnJzAAC8DxAAYgAAAEsAAAAjAAAAvA8QAGIAAABMAAAAIwAAALwPEABiAAAACQEAACQAAAC8DxAAYgAAAB4BAAAoAAAAvA8QAGIAAACJBAAAEgAAALwPEABiAAAAiQQAAD0AAAC8DxAAYgAAABQFAAAiAAAAvA8QAGIAAAAUBQAACQAAAFBhZEVycm9yR2VuZXJpY0Fy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N6sOYTkvGKE5MBxhSPMeoUxANGFQ8GqhUU9vIVKdvKFSAM9hU2XRoVMA2iFUAODhVa7iYVfs5CFZ0OihWSAA7lnwAX9aAHAABwAtAQEBAgECAQFICzAVEAFlBwIGAgIBBCMBHhtbCzoJCQEYBAEJAQMBBSsDPAgqGAEgNwEBAQQIBAEDBwoCHQE6AQEBAgQIAQkBCgIaAQICOQEEAgQCAgMDAR4CAwELAjkBBAUBAgQBFAIWBgEBOgEBAgEECAEHAwoCHgE7AQEBDAEJASgBAwE3AQEDBQMBBAcCCwIdAToBAgECAQMBBQIHAgsCHAI5AgEBAgQIAQkBCgIdAUgBBAECAwEBCAFRAQIHDAhiAQIJCwdJAhsBAQEBATcOAQUBAgULASQJAWYEAQYBAgICGQIEAxAEDQECAgYBDwEAAwADHQIeAh4CQAIBBwgBAgsJAS0DAQF1AiIBdgMEAgkBBgPbAgIBOgEBBwEBAQECCAYKAgEwHzEEMAcBAQUBKAkMAiAEAgIBAzgBAQIDAQEDOggCApgDAQ0BBwQBBgEDAsZAAAHDIQADjQFgIAAGaQIABAEKIAJQAgABAwEEARkCBQGXAhoSDQEmCBkLLgMwAQIEAgInAUMGAgICAgwBCAEvATMBAQMCAgUCAQEqAggB7gECAQQBAAEAEBAQAAIAAeIBlQUAAwECBQQoAwQBpQIABAACUANGCzEEewE2DykBAgIKAzEEAgIHAT0DJAUBCD4BDAI0CQoEAgFfAwIBAQIGAQIBnQEDCBUCOQIBAQEBFgEOBwMFwwgCAwEBFwFRAQIGAQECAQECAQLrAQIEBgIBAhsCVQgCAQECagEBAQIGAQFlAwIEAQUACQEC9QEKAgEBBAGQBAICBAEgCigGAgQIAQkGAgMuDQECAAcBBgEBUhYCBwECAQJ6BgMBAQIBBwEBSAIDAQEBAAILAjQFBQEBAQABBg8ABTsHAAE/BFEBAAIALgIXAAEBAwQFCAgCBx4ElAMANwQyCAEOARYFAQ8ABwERAgcBAgEFZAGgBwABPQQABAAHbQcAYIDwAHsJcHJvZHVjZXJzAghsYW5ndWFnZQEEUnVzdAAMcHJvY2Vzc2VkLWJ5AwVydXN0Yx0xLjY4LjEgKDg0NjBjYTgyMyAyMDIzLTAzLTIwKQZ3YWxydXMGMC4xOS4wDHdhc20tYmluZGdlbhIwLjIuODQgKGNlYThjYzNkMik=", Nt = async (I = {}, A) => {
  let g;
  if (A.startsWith("data:")) {
    const B = A.replace(/^data:.*?base64,/, "");
    let t;
    if (typeof Buffer == "function" && typeof Buffer.from == "function")
      t = Buffer.from(B, "base64");
    else if (typeof atob == "function") {
      const e = atob(B);
      t = new Uint8Array(e.length);
      for (let Q = 0; Q < e.length; Q++)
        t[Q] = e.charCodeAt(Q);
    } else
      throw new Error("Cannot decode base64-encoded data URL");
    g = await WebAssembly.instantiate(t, I);
  } else {
    const B = await fetch(A), t = B.headers.get("Content-Type") || "";
    if ("instantiateStreaming" in WebAssembly && t.startsWith("application/wasm"))
      g = await WebAssembly.instantiateStreaming(B, I);
    else {
      const e = await B.arrayBuffer();
      g = await WebAssembly.instantiate(e, I);
    }
  }
  return g.instance.exports;
};
let F;
function Ft(I) {
  F = I;
}
const IA = new Array(128).fill(void 0);
IA.push(void 0, null, !0, !1);
function M(I) {
  return IA[I];
}
let YA = IA.length;
function kt(I) {
  I < 132 || (IA[I] = YA, YA = I);
}
function UI(I) {
  const A = M(I);
  return kt(I), A;
}
function K(I) {
  YA === IA.length && IA.push(IA.length + 1);
  const A = YA;
  return YA = IA[A], IA[A] = I, A;
}
function pI(I) {
  return I == null;
}
let TA = null;
function St() {
  return (TA === null || TA.byteLength === 0) && (TA = new Float64Array(F.memory.buffer)), TA;
}
let jA = null;
function gA() {
  return (jA === null || jA.byteLength === 0) && (jA = new Int32Array(F.memory.buffer)), jA;
}
let iA = 0, _A = null;
function VA() {
  return (_A === null || _A.byteLength === 0) && (_A = new Uint8Array(F.memory.buffer)), _A;
}
const Rt = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
let WA = new Rt("utf-8");
const Jt = typeof WA.encodeInto == "function" ? function(I, A) {
  return WA.encodeInto(I, A);
} : function(I, A) {
  const g = WA.encode(I);
  return A.set(g), {
    read: I.length,
    written: g.length
  };
};
function fA(I, A, g) {
  if (g === void 0) {
    const C = WA.encode(I), E = A(C.length);
    return VA().subarray(E, E + C.length).set(C), iA = C.length, E;
  }
  let B = I.length, t = A(B);
  const e = VA();
  let Q = 0;
  for (; Q < B; Q++) {
    const C = I.charCodeAt(Q);
    if (C > 127)
      break;
    e[t + Q] = C;
  }
  if (Q !== B) {
    Q !== 0 && (I = I.slice(Q)), t = g(t, B, B = Q + I.length * 3);
    const C = VA().subarray(t + Q, t + B), E = Jt(I, C);
    Q += E.written;
  }
  return iA = Q, t;
}
const mt = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
let Lg = new mt("utf-8", { ignoreBOM: !0, fatal: !0 });
Lg.decode();
function iI(I, A) {
  return Lg.decode(VA().subarray(I, I + A));
}
function GI(I) {
  const A = typeof I;
  if (A == "number" || A == "boolean" || I == null)
    return `${I}`;
  if (A == "string")
    return `"${I}"`;
  if (A == "symbol") {
    const t = I.description;
    return t == null ? "Symbol" : `Symbol(${t})`;
  }
  if (A == "function") {
    const t = I.name;
    return typeof t == "string" && t.length > 0 ? `Function(${t})` : "Function";
  }
  if (Array.isArray(I)) {
    const t = I.length;
    let e = "[";
    t > 0 && (e += GI(I[0]));
    for (let Q = 1; Q < t; Q++)
      e += ", " + GI(I[Q]);
    return e += "]", e;
  }
  const g = /\[object ([^\]]+)\]/.exec(toString.call(I));
  let B;
  if (g.length > 1)
    B = g[1];
  else
    return toString.call(I);
  if (B == "Object")
    try {
      return "Object(" + JSON.stringify(I) + ")";
    } catch {
      return "Object";
    }
  return I instanceof Error ? `${I.name}: ${I.message}
${I.stack}` : B;
}
function Yt(I) {
  try {
    const B = F.__wbindgen_add_to_stack_pointer(-16), t = fA(I, F.__wbindgen_malloc, F.__wbindgen_realloc), e = iA;
    F.secretkey(B, t, e);
    var A = gA()[B / 4 + 0], g = gA()[B / 4 + 1];
    return iI(A, g);
  } finally {
    F.__wbindgen_add_to_stack_pointer(16), F.__wbindgen_free(A, g);
  }
}
function Ut(I, A) {
  const g = fA(I, F.__wbindgen_malloc, F.__wbindgen_realloc), B = iA, t = fA(A, F.__wbindgen_malloc, F.__wbindgen_realloc), e = iA;
  return F.validate(g, B, t, e) !== 0;
}
function Lt(I) {
  const A = fA(I, F.__wbindgen_malloc, F.__wbindgen_realloc), g = iA, B = F.encrypt(A, g);
  return UI(B);
}
function Ht(I) {
  try {
    const B = F.__wbindgen_add_to_stack_pointer(-16);
    F.decrypt(B, K(I));
    var A = gA()[B / 4 + 0], g = gA()[B / 4 + 1];
    return iI(A, g);
  } finally {
    F.__wbindgen_add_to_stack_pointer(16), F.__wbindgen_free(A, g);
  }
}
function LI(I, A) {
  try {
    return I.apply(this, A);
  } catch (g) {
    F.__wbindgen_exn_store(K(g));
  }
}
function bt(I) {
  UI(I);
}
function xt(I) {
  return K(I);
}
function vt(I) {
  const A = M(I);
  return typeof A == "object" && A !== null;
}
function qt(I, A) {
  return M(I) == M(A);
}
function Kt(I) {
  const A = M(I);
  return typeof A == "boolean" ? A ? 1 : 0 : 2;
}
function Ot(I, A) {
  const g = M(A), B = typeof g == "number" ? g : void 0;
  St()[I / 8 + 1] = pI(B) ? 0 : B, gA()[I / 4 + 0] = !pI(B);
}
function zt(I, A) {
  const g = M(A), B = typeof g == "string" ? g : void 0;
  var t = pI(B) ? 0 : fA(B, F.__wbindgen_malloc, F.__wbindgen_realloc), e = iA;
  gA()[I / 4 + 1] = e, gA()[I / 4 + 0] = t;
}
function Tt(I, A) {
  const g = new Error(iI(I, A));
  return K(g);
}
function jt(I, A) {
  const g = M(I)[A >>> 0];
  return K(g);
}
function _t(I) {
  return M(I).length;
}
function Xt() {
  const I = new Array();
  return K(I);
}
function Zt(I) {
  return typeof M(I) == "function";
}
function Pt(I) {
  const A = M(I).next;
  return K(A);
}
function Vt() {
  return LI(function(I) {
    const A = M(I).next();
    return K(A);
  }, arguments);
}
function Wt(I) {
  return M(I).done;
}
function $t(I) {
  const A = M(I).value;
  return K(A);
}
function Ae() {
  return K(Symbol.iterator);
}
function Ie() {
  return LI(function(I, A) {
    const g = Reflect.get(M(I), M(A));
    return K(g);
  }, arguments);
}
function ge() {
  return LI(function(I, A) {
    const g = M(I).call(M(A));
    return K(g);
  }, arguments);
}
function Be(I, A, g) {
  M(I)[A >>> 0] = UI(g);
}
function te(I) {
  return Array.isArray(M(I));
}
function ee(I) {
  let A;
  try {
    A = M(I) instanceof ArrayBuffer;
  } catch {
    A = !1;
  }
  return A;
}
function Qe(I) {
  return Number.isSafeInteger(M(I));
}
function Ce(I) {
  const A = M(I).buffer;
  return K(A);
}
function ie(I) {
  const A = new Uint8Array(M(I));
  return K(A);
}
function Ee(I, A, g) {
  M(I).set(M(A), g >>> 0);
}
function se(I) {
  return M(I).length;
}
function ne(I) {
  let A;
  try {
    A = M(I) instanceof Uint8Array;
  } catch {
    A = !1;
  }
  return A;
}
function ae(I, A) {
  const g = GI(M(A)), B = fA(g, F.__wbindgen_malloc, F.__wbindgen_realloc), t = iA;
  gA()[I / 4 + 1] = t, gA()[I / 4 + 0] = B;
}
function oe(I, A) {
  throw new Error(iI(I, A));
}
function re() {
  const I = F.memory;
  return K(I);
}
URL = globalThis.URL;
const V = await Nt({ "./rich_wasm_bg.js": { __wbindgen_object_drop_ref: bt, __wbindgen_number_new: xt, __wbindgen_is_object: vt, __wbindgen_jsval_loose_eq: qt, __wbindgen_boolean_get: Kt, __wbindgen_number_get: Ot, __wbindgen_string_get: zt, __wbindgen_error_new: Tt, __wbg_get_27fe3dac1c4d0224: jt, __wbg_length_e498fbc24f9c1d4f: _t, __wbg_new_b525de17f44a8943: Xt, __wbindgen_is_function: Zt, __wbg_next_b7d530c04fd8b217: Pt, __wbg_next_88560ec06a094dea: Vt, __wbg_done_1ebec03bbd919843: Wt, __wbg_value_6ac8da5cc5b3efda: $t, __wbg_iterator_55f114446221aa5a: Ae, __wbg_get_baf4855f9a986186: Ie, __wbg_call_95d1ea488d03e4e8: ge, __wbg_set_17224bc548dd1d7b: Be, __wbg_isArray_39d28997bf6b96b4: te, __wbg_instanceof_ArrayBuffer_a69f02ee4c4f5065: ee, __wbg_isSafeInteger_8c4789029e885159: Qe, __wbg_buffer_cf65c07de34b9a08: Ce, __wbg_new_537b7341ce90bb31: ie, __wbg_set_17499e8aa4003ebd: Ee, __wbg_length_27a2afe8ab42b09f: se, __wbg_instanceof_Uint8Array_01cebe79ca606cca: ne, __wbindgen_debug_string: ae, __wbindgen_throw: oe, __wbindgen_memory: re } }, Mt), ce = V.memory, he = V.secretkey, le = V.validate, De = V.encrypt, ue = V.decrypt, fe = V.__wbindgen_malloc, we = V.__wbindgen_realloc, de = V.__wbindgen_add_to_stack_pointer, ye = V.__wbindgen_free, pe = V.__wbindgen_exn_store, Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  __wbindgen_add_to_stack_pointer: de,
  __wbindgen_exn_store: pe,
  __wbindgen_free: ye,
  __wbindgen_malloc: fe,
  __wbindgen_realloc: we,
  decrypt: ue,
  encrypt: De,
  memory: ce,
  secretkey: he,
  validate: le
}, Symbol.toStringTag, { value: "Module" }));
Ft(Ge);
const Me = function(I) {
  return new Promise((A, g) => {
    if (I instanceof Blob) {
      var B = new FileReader();
      B.onload = function(t) {
        A(t.target.result);
      }, B.onerror = (t) => {
        g(t);
      }, B.readAsArrayBuffer(I);
    } else
      g("不是二进制文件");
  });
}, Hg = function(I) {
  let A = typeof I == "string" ? I : JSON.stringify(I), g = Lt(A);
  return new Blob([new Uint8Array(g).buffer]);
}, HI = async function(I) {
  let A = null;
  if (typeof I == "string")
    A = I;
  else if (I instanceof Blob) {
    let g = await Me(I), B = Array.prototype.slice.call(new Uint8Array(g));
    A = Ht(B);
  } else if (I && typeof I == "object" && typeof I != "function" && !Array.isArray(I))
    return I;
  try {
    return JSON.parse(A);
  } catch {
    Promise.reject("数据格式无效");
  }
}, Ne = function(I) {
  return typeof I == "string" && I.length > 2 && I.length < 16 ? Yt(I) : null;
}, Fe = function(I, A) {
  return typeof I == "string" && typeof A == "string" ? Ut(I, A) : !1;
}, ke = async function(I, A) {
  if (!I)
    return null;
  let g = "A_" + nanoid(10), B = await HI(I);
  return B && (B.id = g), A && Object.assign(B, A), { id: g, data: B };
}, Se = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  copyData: ke,
  decrypt: HI,
  encrypt: Hg,
  secretkey: Ne,
  validateKey: Fe
}, Symbol.toStringTag, { value: "Module" }));
var Re = oA, Je = Re.isFinite;
function me(I) {
  return typeof I == "number" && Je(I);
}
var Ye = me;
function Ue(I, A = {}) {
  let g = Object.assign({
    host: "",
    token: "token",
    responseType: "json",
    method: "get",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  }, A), B = /^(?!https?:\/\/)/.test(I.url) ? g.host + I.url : I.url, t = localStorage.getItem(g.token) ? { Authorization: localStorage.getItem(g.token) } : {}, e = I.customize || {};
  (!g.headers || typeof g.headers == "string") && (g.headers = {});
  let Q = Object.assign({
    method: I.method || g.method,
    mode: I.mode || g.mode,
    signal: I.signal,
    headers: new Headers(Object.assign(g.headers, t, I.headers))
  }, e);
  return Q.method.toUpperCase() == "POST" ? Q.body = Q.headers.get("Content-Type") == "application/json" ? JSON.stringify(I.data) : I.data : B = /\?/.test(B) ? B + "&" + yI(I.data) : B + "?" + yI(I.data), new Promise((C, E) => {
    fetch(B, Q).then((s) => g.responseType ? s[g.responseType]() : s.json(), E).then(C);
  });
}
const lA = {}, MI = [];
class Le extends DA {
  constructor(A) {
    super(), this.id = "R_" + z(10), this.controller = new AbortController(), this.signal = this.controller.signal, this.isloading = !1, this.status = "wait", this.options = A, this.data = null, this.err = null;
  }
  //    请求数据
  request(A) {
    this.status != "request" && (this.isloading = !0, this.status = "request", this.emit("request", this), Ue({
      url: this.options.url || "",
      data: this.options.body || {},
      method: this.options.method,
      signal: this.signal
    }).then((g) => {
      this.data = g, this.status = "success", this.isloading = !1, this.err = null, this.emit("success", g), A && A(this);
    }, (g) => {
      this.status = "success", this.isloading = !1, this.err = g, this.emit("error", g), A && A(this);
    }));
  }
  destroy() {
    this.controller && this.controller.abort(), this.controller = null, this.signal = null, this.isloading = null, this.status = null, this.options = null, this.data = null, this.err = null, lA[this.id] && (X(MI, "id", this.id), delete lA[this.id]);
  }
}
function He(I) {
  let A = I.url || "", g = I.body || {}, B = (A + JSON.stringify(g)).split("").sort().join(""), t = MI.find((Q) => Q.test == B);
  if (t && lA[t.id])
    return lA[t.id];
  let e = new Le(I);
  return MI.push({
    id: e.id,
    test: B
  }), lA[e.id] = e, lA[e.id];
}
var be = Array.isArray, vA = be, xe = bA, ve = dA, qe = "[object Symbol]";
function Ke(I) {
  return typeof I == "symbol" || ve(I) && xe(I) == qe;
}
var bI = Ke, Oe = vA, ze = bI, Te = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, je = /^\w*$/;
function _e(I, A) {
  if (Oe(I))
    return !1;
  var g = typeof I;
  return g == "number" || g == "symbol" || g == "boolean" || I == null || ze(I) ? !0 : je.test(I) || !Te.test(I) || A != null && I in Object(A);
}
var Xe = _e;
function Ze(I) {
  var A = typeof I;
  return I != null && (A == "object" || A == "function");
}
var rA = Ze, Pe = bA, Ve = rA, We = "[object AsyncFunction]", $e = "[object Function]", AQ = "[object GeneratorFunction]", IQ = "[object Proxy]";
function gQ(I) {
  if (!Ve(I))
    return !1;
  var A = Pe(I);
  return A == $e || A == AQ || A == We || A == IQ;
}
var xI = gQ, BQ = oA, tQ = BQ["__core-js_shared__"], eQ = tQ, lI = eQ, Ag = function() {
  var I = /[^.]+$/.exec(lI && lI.keys && lI.keys.IE_PROTO || "");
  return I ? "Symbol(src)_1." + I : "";
}();
function QQ(I) {
  return !!Ag && Ag in I;
}
var CQ = QQ, iQ = Function.prototype, EQ = iQ.toString;
function sQ(I) {
  if (I != null) {
    try {
      return EQ.call(I);
    } catch {
    }
    try {
      return I + "";
    } catch {
    }
  }
  return "";
}
var nQ = sQ, aQ = xI, oQ = CQ, rQ = rA, cQ = nQ, hQ = /[\\^$.*+?()[\]{}|]/g, lQ = /^\[object .+?Constructor\]$/, DQ = Function.prototype, uQ = Object.prototype, fQ = DQ.toString, wQ = uQ.hasOwnProperty, dQ = RegExp(
  "^" + fQ.call(wQ).replace(hQ, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function yQ(I) {
  if (!rQ(I) || oQ(I))
    return !1;
  var A = aQ(I) ? dQ : lQ;
  return A.test(cQ(I));
}
var pQ = yQ;
function GQ(I, A) {
  return I?.[A];
}
var MQ = GQ, NQ = pQ, FQ = MQ;
function kQ(I, A) {
  var g = FQ(I, A);
  return NQ(g) ? g : void 0;
}
var vI = kQ, SQ = vI, RQ = SQ(Object, "create"), EI = RQ, Ig = EI;
function JQ() {
  this.__data__ = Ig ? Ig(null) : {}, this.size = 0;
}
var mQ = JQ;
function YQ(I) {
  var A = this.has(I) && delete this.__data__[I];
  return this.size -= A ? 1 : 0, A;
}
var UQ = YQ, LQ = EI, HQ = "__lodash_hash_undefined__", bQ = Object.prototype, xQ = bQ.hasOwnProperty;
function vQ(I) {
  var A = this.__data__;
  if (LQ) {
    var g = A[I];
    return g === HQ ? void 0 : g;
  }
  return xQ.call(A, I) ? A[I] : void 0;
}
var qQ = vQ, KQ = EI, OQ = Object.prototype, zQ = OQ.hasOwnProperty;
function TQ(I) {
  var A = this.__data__;
  return KQ ? A[I] !== void 0 : zQ.call(A, I);
}
var jQ = TQ, _Q = EI, XQ = "__lodash_hash_undefined__";
function ZQ(I, A) {
  var g = this.__data__;
  return this.size += this.has(I) ? 0 : 1, g[I] = _Q && A === void 0 ? XQ : A, this;
}
var PQ = ZQ, VQ = mQ, WQ = UQ, $Q = qQ, AC = jQ, IC = PQ;
function yA(I) {
  var A = -1, g = I == null ? 0 : I.length;
  for (this.clear(); ++A < g; ) {
    var B = I[A];
    this.set(B[0], B[1]);
  }
}
yA.prototype.clear = VQ;
yA.prototype.delete = WQ;
yA.prototype.get = $Q;
yA.prototype.has = AC;
yA.prototype.set = IC;
var gC = yA;
function BC() {
  this.__data__ = [], this.size = 0;
}
var tC = BC;
function eC(I, A) {
  return I === A || I !== I && A !== A;
}
var sI = eC, QC = sI;
function CC(I, A) {
  for (var g = I.length; g--; )
    if (QC(I[g][0], A))
      return g;
  return -1;
}
var nI = CC, iC = nI, EC = Array.prototype, sC = EC.splice;
function nC(I) {
  var A = this.__data__, g = iC(A, I);
  if (g < 0)
    return !1;
  var B = A.length - 1;
  return g == B ? A.pop() : sC.call(A, g, 1), --this.size, !0;
}
var aC = nC, oC = nI;
function rC(I) {
  var A = this.__data__, g = oC(A, I);
  return g < 0 ? void 0 : A[g][1];
}
var cC = rC, hC = nI;
function lC(I) {
  return hC(this.__data__, I) > -1;
}
var DC = lC, uC = nI;
function fC(I, A) {
  var g = this.__data__, B = uC(g, I);
  return B < 0 ? (++this.size, g.push([I, A])) : g[B][1] = A, this;
}
var wC = fC, dC = tC, yC = aC, pC = cC, GC = DC, MC = wC;
function pA(I) {
  var A = -1, g = I == null ? 0 : I.length;
  for (this.clear(); ++A < g; ) {
    var B = I[A];
    this.set(B[0], B[1]);
  }
}
pA.prototype.clear = dC;
pA.prototype.delete = yC;
pA.prototype.get = pC;
pA.prototype.has = GC;
pA.prototype.set = MC;
var aI = pA, NC = vI, FC = oA, kC = NC(FC, "Map"), bg = kC, gg = gC, SC = aI, RC = bg;
function JC() {
  this.size = 0, this.__data__ = {
    hash: new gg(),
    map: new (RC || SC)(),
    string: new gg()
  };
}
var mC = JC;
function YC(I) {
  var A = typeof I;
  return A == "string" || A == "number" || A == "symbol" || A == "boolean" ? I !== "__proto__" : I === null;
}
var UC = YC, LC = UC;
function HC(I, A) {
  var g = I.__data__;
  return LC(A) ? g[typeof A == "string" ? "string" : "hash"] : g.map;
}
var oI = HC, bC = oI;
function xC(I) {
  var A = bC(this, I).delete(I);
  return this.size -= A ? 1 : 0, A;
}
var vC = xC, qC = oI;
function KC(I) {
  return qC(this, I).get(I);
}
var OC = KC, zC = oI;
function TC(I) {
  return zC(this, I).has(I);
}
var jC = TC, _C = oI;
function XC(I, A) {
  var g = _C(this, I), B = g.size;
  return g.set(I, A), this.size += g.size == B ? 0 : 1, this;
}
var ZC = XC, PC = mC, VC = vC, WC = OC, $C = jC, Ai = ZC;
function GA(I) {
  var A = -1, g = I == null ? 0 : I.length;
  for (this.clear(); ++A < g; ) {
    var B = I[A];
    this.set(B[0], B[1]);
  }
}
GA.prototype.clear = PC;
GA.prototype.delete = VC;
GA.prototype.get = WC;
GA.prototype.has = $C;
GA.prototype.set = Ai;
var xg = GA, vg = xg, Ii = "Expected a function";
function qI(I, A) {
  if (typeof I != "function" || A != null && typeof A != "function")
    throw new TypeError(Ii);
  var g = function() {
    var B = arguments, t = A ? A.apply(this, B) : B[0], e = g.cache;
    if (e.has(t))
      return e.get(t);
    var Q = I.apply(this, B);
    return g.cache = e.set(t, Q) || e, Q;
  };
  return g.cache = new (qI.Cache || vg)(), g;
}
qI.Cache = vg;
var gi = qI, Bi = gi, ti = 500;
function ei(I) {
  var A = Bi(I, function(B) {
    return g.size === ti && g.clear(), B;
  }), g = A.cache;
  return A;
}
var Qi = ei, Ci = Qi, ii = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ei = /\\(\\)?/g, si = Ci(function(I) {
  var A = [];
  return I.charCodeAt(0) === 46 && A.push(""), I.replace(ii, function(g, B, t, e) {
    A.push(t ? e.replace(Ei, "$1") : B || g);
  }), A;
}), ni = si;
function ai(I, A) {
  for (var g = -1, B = I == null ? 0 : I.length, t = Array(B); ++g < B; )
    t[g] = A(I[g], g, I);
  return t;
}
var oi = ai, Bg = JI, ri = oi, ci = vA, hi = bI, li = 1 / 0, tg = Bg ? Bg.prototype : void 0, eg = tg ? tg.toString : void 0;
function qg(I) {
  if (typeof I == "string")
    return I;
  if (ci(I))
    return ri(I, qg) + "";
  if (hi(I))
    return eg ? eg.call(I) : "";
  var A = I + "";
  return A == "0" && 1 / I == -li ? "-0" : A;
}
var Di = qg, ui = Di;
function fi(I) {
  return I == null ? "" : ui(I);
}
var wi = fi, di = vA, yi = Xe, pi = ni, Gi = wi;
function Mi(I, A) {
  return di(I) ? I : yi(I, A) ? [I] : pi(Gi(I));
}
var Ni = Mi, Fi = bI, ki = 1 / 0;
function Si(I) {
  if (typeof I == "string" || Fi(I))
    return I;
  var A = I + "";
  return A == "0" && 1 / I == -ki ? "-0" : A;
}
var Ri = Si, Ji = Ni, mi = Ri;
function Yi(I, A) {
  A = Ji(A, I);
  for (var g = 0, B = A.length; I != null && g < B; )
    I = I[mi(A[g++])];
  return g && g == B ? I : void 0;
}
var Ui = Yi, Li = Ui;
function Hi(I, A, g) {
  var B = I == null ? void 0 : Li(I, A);
  return B === void 0 ? g : B;
}
var II = Hi;
const NI = function(I) {
  if (!this.appData)
    return console.warn("缺少数据源"), null;
  let A = {};
  return I && Array.isArray(I) && I.forEach((g) => {
    if (CA(g))
      if (typeof g.value == "string" && g.key) {
        let B = this.appData.getDataSource(g.value);
        B ? pg(B) ? A[g.key] = g.path ? II(B.data, g.path) : B.data : A[g.key] = g.path ? II(B, g.path) : B : A[g.key] = g.value;
      } else
        g.key && (A[g.key] = g.value);
  }), A;
};
class bi extends DA {
  constructor(A, g = {}) {
    super();
    const { id: B, url: t, extractRule: e, body: Q, method: C, itval: E } = A;
    this.appData = g, this.AppSetup = g.AppSetup, this.AppInfo = g.info, this.id = B || "RD_" + z(10), this.url = t, this.body = Q, this.method = C, this.data = U({}), this.sourceData = null, this.loading = Gg(!1), this.isloading = !1, this.itval = E || 0, this.it = null, this.status = "wait", this.err = null, this.extractRule = e ? U(e) : U({});
    let s = He({ url: t, body: NI.call(this, Q), method: C }, this.AppInfo.network);
    s.on("request", () => {
      this.loading.value = !0, this.isloading = !0, this.status = "request";
    }), s.on("success", (n) => {
      this.sourceData = n, this.status = "success", this.loading.value = !1, this.isloading = !1, this.err = null, this.fillData(n), this.emit("success", this);
    }), s.on("error", (n) => {
      this.status = "success", this.loading.value = !1, this.isloading = !1, this.err = n, this.emit("error", n);
    }), this.req = s, this.unwatch = null, this.watchRule();
  }
  watchRule() {
    this.stopWatch(), this.watch = Mg(this.extractRule, () => {
      this.sourceData && this.fillData(this.sourceData);
    }), this.sourceData && this.fillData(this.sourceData);
  }
  stopWatch() {
    this.unwatch && (this.unwatch(), this.unwatch = null);
  }
  setData(A = {}) {
    A.url && (this.url = A.url, this.req.options.url = A.url), A.method && (this.method = A.method, this.req.options.method = A.method), A.body && (this.body = A.body, this.req.options.body = NI.call(this.appData, A.body)), Ye(A.itval) && (this.itval = A.itval);
  }
  // 修改规则
  setExtractRule(A) {
    if (this.extractRule instanceof Array && A instanceof Array || this.extractRule instanceof Object && A instanceof Object && !Array.isArray(this.extractRule) && !Array.isArray(A)) {
      for (const g in this.extractRule)
        delete this.extractRule[g];
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
    this.AppSetup.interaction && A && A > 0 && (this.it = UA.add(() => {
      this.req.request();
    }, A * 1e3));
  }
  // 关闭轮询请求
  stopInterval() {
    this.it && (UA.del(this.it), this.it = null);
  }
  //    清除数据
  clearData() {
    this.status == "request" && this.req.controller && this.req.controller.abort(), Object.keys(this.data).forEach((g) => {
      delete this.data[g];
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
    this.clearData(), this.extractRule && (this.extractRule.x || this.extractRule.name || this.extractRule instanceof Array) ? Object.assign(this.data, { data: mI(A, this.extractRule) }) : Object.assign(this.data, { data: A });
  }
  /**
   * 销毁
   */
  destroy() {
    this.req.destroy(), this.clearData(), this.stopWatch(), this.stopInterval(), this.extractRule = null;
  }
}
const S = {}, LA = U([]), Kg = function() {
  return U({
    x: {
      name: "",
      path: "",
      mapKey: ""
    },
    y: []
  });
}, xi = function() {
  return LA;
}, Og = function(I) {
  if (I.id && S[I.id])
    return S[I.id];
  {
    let A = new bi(I, this);
    return LA.push(A), S[A.id] = A, A;
  }
}, DI = function(I) {
  return X(LA, "id", I), S[I].destroy(), delete S[I], I;
}, gI = function(I) {
  if (I) {
    if (S[I])
      return DI(I);
    for (let A in S)
      S[A].url == I && DI(A);
    return I;
  } else
    return Object.keys(S).forEach((g) => {
      DI(g);
    }), LA.splice(0, LA.length), !0;
}, BI = function(I, A = !1) {
  if (S[I])
    return S[I];
  if (A) {
    for (let g in S)
      if (S[g].url == I)
        return S[g];
  }
  return null;
}, vi = function() {
  gI();
}, zg = function(I = !1, A = "", g) {
  if (A && S[A])
    S[A].request(g);
  else
    for (let B in S)
      if (S[B].status != "success" || S[B].err || I)
        if (A) {
          if (S[B].url == A) {
            S[B].request(g);
            return;
          }
        } else
          S[B].request(g);
}, qi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Og,
  clearRemote: vi,
  createExtractRule: Kg,
  del: gI,
  getList: xi,
  getRemote: BI,
  remotes: S,
  requestData: zg
}, Symbol.toStringTag, { value: "Module" })), Ki = function(I) {
  return nB(Object.assign({
    // 宽度
    width: 800,
    // 高度
    height: 600,
    // 背景色
    backgroundColor: "#222222",
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
    // 所在容器
    dom: null
  }, I));
}, Oi = function() {
  return U({
    title: "",
    id: "A_" + z(10),
    creattime: null,
    uptime: null,
    cover: null,
    description: "",
    width: 800,
    height: 600,
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
}, zi = function(I) {
  return Object.assign({
    id: "AC_" + z(10),
    action: "",
    target: "app",
    value: null,
    description: ""
  }, I);
}, Qg = function(I) {
  const { id: A, value: g = "", name: B = "", type: t = "source", uptime: e } = I;
  return {
    id: A || "GD_" + z(10),
    name: B,
    type: t,
    value: g instanceof Object ? U(g) : Gg(g),
    uptime: e || (/* @__PURE__ */ new Date()).getTime()
  };
}, Ti = function(I) {
  return U(Object.assign({
    id: "PD_" + z(10),
    name: "",
    title: "",
    url: "",
    password: "",
    version: "",
    uptime: (/* @__PURE__ */ new Date()).getTime()
  }, I));
};
function ji(I) {
  const A = I.getAppData(), g = I.mData, B = I.gData, t = I.aData, e = I.rData, Q = I.pData;
  let C = b(g.getModuleList());
  C.forEach((s) => {
    s.components && Array.isArray(s.components) && (s.components = s.components.map((n) => {
      if (n.type == "group") {
        let a = g.getGroup(n.id);
        return a.components && (a.components = a.components.map((r) => {
          let y = g.getSprite(r.id);
          return y.selected = !1, y;
        })), a.selected = !1, a;
      } else {
        let a = g.getSprite(n.id);
        return a.selected = !1, a;
      }
    }));
  });
  let E = b(B.getGDataList());
  return E.forEach((s, n) => {
    s.type == "temp" && E.splice(n, 1);
  }), b({
    ...A.info,
    globalData: E,
    modules: C,
    actions: t.getActionList(),
    plugins: Q.getPluginList(),
    remote: e.getRemoteList()
  });
}
let _i = 1, Xi = 1, Cg = 1;
const uI = function(I = {}) {
  let A = {
    type: "content",
    name: "vx-module",
    title: "页面" + _i++,
    x: 0,
    y: 0,
    components: []
  };
  return Object.assign(A, I), A.id || (A.id = "mdu_" + z(10)), A;
}, fI = function(I = {}) {
  let A = U({
    id: null,
    gpid: null,
    mid: null,
    name: "vx-sprite-group",
    type: "group",
    title: "组合" + Xi++,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    opacity: 100,
    visible: !0,
    selected: !1,
    hover: !1,
    padding: "",
    background: {},
    border: {},
    shadow: {},
    anim: {},
    events: [],
    components: []
  });
  return Object.assign(A, I), A.id || (A.id = "group_" + z(10)), A;
}, ig = function(I, A, g = {}) {
  let B = I.getDefaultData(A), t = B.title, e = U({
    id: null,
    gpid: null,
    mid: null,
    name: B.name,
    type: B.type,
    title: t ? t + Cg++ : "元件 " + Cg++,
    x: B.x || 0,
    y: B.y || 0,
    zIndex: B.zIndex || 0,
    width: B.width || 80,
    height: B.height || 80,
    angle: B.angle || 0,
    opacity: B.opacity || 100,
    visible: B.visible || !0,
    selected: B.selected || !1,
    hover: B.hover || !1,
    padding: B.padding || "",
    lock: B.lock || !1,
    background: B.background || {},
    border: B.border || {},
    shadow: B.shadow || {},
    anim: B.anim || {},
    options: B.options || {},
    events: B.events || [],
    data: B.data || ""
  });
  return Object.assign(e, g), e.id || (e.id = "sprite_" + z(10)), e;
}, Tg = function(I, A = {}) {
  let g = null;
  return I && typeof I == "object" && this && (I.type == "group" ? g = Object.assign({
    id: I.id,
    gpid: I.gpid,
    mid: I.mid,
    visible: I.visible,
    name: I.name,
    title: I.title,
    type: I.type,
    zIndex: I.zIndex,
    components: I.components ? I.components.map((B) => B.id) : []
  }, A) : g = Object.assign({
    id: I.id,
    gpid: I.gpid,
    mid: I.mid,
    visible: I.visible,
    name: I.name,
    title: I.title,
    type: I.type,
    zIndex: I.zIndex
  }, A)), g ? (this.esSimple[g.id] = g, this.esSimple[g.id]) : null;
};
class Zi {
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
    let g = uI(A);
    return Array.isArray(g.components) || (g.components = []), this.modules[g.id] = g, this.mData.elements[g.id] = g, g;
  }
  // 添加元件（元件、组合的基本属性）
  addElement(A, g = "default") {
    g && A && typeof A != "string" && (this.modules[g] && this.modules[g].components ? this.modules[g].components.push(A) : console.warn("模块添加元件数据失败"));
  }
  // 删除元件（只是在模块内删除，并为删除数据源）
  delElement(A, g = "default") {
    return g && A ? this.modules[g] && this.modules[g].components ? X(this.modules[g].components, "id", A) : (console.warn("模块删除元件数据失败"), !1) : (console.warn("mid && id 无效"), !1);
  }
  // 删除模块数据
  delModule(A, g = !1) {
    if (g && this.modules[A]) {
      let B = this.modules[A].components;
      return Array.isArray(B) && B.map((e) => e.id).forEach((e) => {
        this.mData.delElement(e, !0);
      }), delete this.modules[A], delete this.mData.elements[A], A;
    } else
      return this.modules[A] ? (delete this.modules[A], delete this.mData.elements[A], A) : null;
  }
  // 配置模块
  setModule = function(A, g) {
    let B = this.mData.elements;
    if (A)
      return this.modules[A] || (this.modules[A] = uI(Object.assign({ id: A }, g)), B[A] = modules[A]), this.modules[A].components || (modules[A].components = []), this.modules[A];
    if (g) {
      let t = uI(g);
      return this.modules[t.id] = t, B[t.id] = this.modules[t.id], this.modules[t.id];
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
  // 返回当前所有（数组）
  getModuleList(A, g = "type") {
    if (A) {
      let B = Object.values(this.modules);
      return typeof A == "string" ? B.filter((t) => t[g] == A) : typeof A == "function" ? B.filter((t) => A(t)) : B;
    } else
      return Object.values(this.modules);
  }
  // 返回模块中的所有元素
  getMyElements(A = "default", g = !1) {
    if (this.modules[A] && this.modules[A].components) {
      let B = this.modules[A].components;
      return g ? B.map((t) => this.mData.getElement(t.id)) : B;
    } else
      return [];
  }
  // 清空所有模块数据
  clearModules() {
    Object.keys(this.modules).forEach((g) => {
      this.delModule(g);
    });
  }
}
class Pi {
  // 数据管理
  mData = null;
  // 编组集合
  groups = {};
  constructor(A) {
    this.mData = A;
  }
  // 添加一个组合
  newGroup(A, g = "default") {
    if (A && typeof A == "object" && A.id && this.groups[A.id])
      return console.warn("组合" + A.id + "已存在"), null;
    let B = fI(Object.assign({ mid: g }, A));
    return this.groups[B.id] = B, this.mData.elements[B.id] = B, B.zIndex || (B.zIndex = this.mData.getMaxZIndex(g) + 1), this.mData.appendElement(Tg.call(this.mData, B), B.mid), this.mData.watchSimples(B), B;
  }
  // 删除组合，是否删除内部数据源
  delGroup(A, g = !1) {
    if (Array.isArray(A))
      return A.forEach((B) => {
        this.delGroup(B, g);
      }), A;
    if (typeof A == "string") {
      let B = this.mData.modules, t = this.mData.unwatchs;
      if (this.groups[A]) {
        if (g) {
          let e = this.groups[A].components;
          Array.isArray(e) && e.length > 0 && this.mData.delSprite(e.map((Q) => Q.id));
        }
        return B.delElement(this.groups[A].id, this.groups[A].mid), delete this.groups[A], delete this.mData.elements[A], t[A] && typeof t[A] == "function" && t[A](), A;
      }
    }
    return !1;
  }
  // 项组合添加元件（元件、组合的基本属性）
  addElement(A, g) {
    g && A && typeof A != "string" && (this.groups[g] && this.groups[g].components ? this.groups[g].components.push(A) : console.warn("模块添加元件数据失败"));
  }
  // 从组合中删除元件
  delElement(A, g) {
    let B = !1;
    return g && A && this.groups[g] && this.groups[g].components && (B = X(this.groups[g].components, "id", A)), B || console.warn("模块删除元件数据失败"), B;
  }
  // 创建新组合并加入已有元素
  newBindGroup(A, g = "default") {
    if (Array.isArray(A)) {
      let B = this.mData.elements, t = this.mData.modules, e = this.mData.sprites, Q = this.mData.esSimple, C = { x1: 0, y1: 0, x2: 0, y2: 0 }, E = t.getMyElements(g), s = [], n = [];
      if (A.forEach((r) => {
        /^group_/.test(r) ? s.push(...this.unbindGroup(r)) : s.push(r);
      }), s.forEach((r, y) => {
        let d = E.find((f) => f.id == r), G = d ? d.type == "group" ? this.groups[r] : B[r] : null;
        G ? y == 0 ? (C.x1 = G.x, C.y1 = G.y, C.x2 = G.x + G.width, C.y2 = G.y + G.height) : (C.x1 = G.x < C.x1 ? G.x : C.x1, C.y1 = G.y < C.y1 ? G.y : C.y1, C.x2 = G.x + G.width > C.x2 ? G.x + G.width : C.x2, C.y2 = G.y + G.height > C.y2 ? G.y + G.height : C.y2) : n.push(r);
      }), n.length > 0)
        return console.warn(n.join(), "元件无法组合"), !1;
      e.delSprite(s, !1);
      let a = this.newGroup({
        x: C.x1,
        y: C.y1,
        width: C.x2 - C.x1,
        height: C.y2 - C.y1
      }, g);
      return a ? (s.forEach((r) => {
        B[r] && (B[r].x -= C.x1, B[r].y -= C.y1, B[r].gpid = a.id, B[r].hover = !1, B[r].selected = !1, this.addElement(Q[r], a.id));
      }), console.log(a), a.selected = !0, a) : !1;
    } else
      return !1;
  }
  // 解绑
  unbindGroup(A, g = !0) {
    let B = this.mData.elements, t = this.mData.modules, e = this.mData.unwatchs, Q = this.mData.esSimple, C = this.groups[A];
    if (A && C && C.components) {
      e[A] && typeof e[A] == "function" && e[A]();
      let E = [], s = C.components;
      return this.delGroup(A), s.forEach((n) => {
        B[n.id].x += C.x, B[n.id].y += C.y, B[n.id].gpid = null, E.push(n.id), g && t.addElement(Q[n.id], n.mid);
      }), E;
    }
    return !1;
  }
  // 配置组合
  setGroup = function(A, g) {
    if (A)
      return this.groups[A] ? Object.assign(this.groups[A], g) : (this.groups[A] = fI(Object.assign({ id: A }, g)), this.mData.elements[A] = this.groups[A]), this.groups[A];
    {
      let B = fI(g);
      return this.groups[B.id] = B, this.mData.elements[B.id] = B, B;
    }
  };
  // 返回某个组合
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
    Object.keys(this.groups).forEach((g) => {
      this.delGroup(g);
    });
  }
}
class Vi {
  // 数据管理
  mData = null;
  // 元素集合
  sprites = {};
  constructor(A) {
    this.mData = A;
  }
  /**
   * 添加一个元件（或新建一个元件）
   * @param {*} data 
   * @param {*} mid 
   * @param {*} gpid 
   * @returns 
   */
  addSprite(A, g = "default", B = null) {
    let t = null;
    return typeof A == "string" && typeof g == "object" ? t = this.setSprite(A, g) : typeof A == "object" && (t = this.setSprite(A, { mid: g, gpid: B })), this.appendSprite(t) ? t : null;
  }
  setSprite(A, g) {
    let B = this.mData.component, t = this.mData.elements, e = this.sprites;
    if (typeof A == "string" && B.iComponents[A]) {
      let Q = ig(B, A, g);
      return e[Q.id] = Q, t[Q.id] = Q, Q;
    } else if (typeof A == "object") {
      if (A.id && e[A.id])
        return g ? Object.assign(e[A.id], g) : console.warn("元件" + A.id + "已存在"), e[A.id];
      if (A.name) {
        let Q = ig(B, A.name, Object.assign({}, A, g));
        return e[Q.id] = Q, t[Q.id] = Q, e[Q.id];
      } else
        return console.error("元件添加失败", A), null;
    } else
      return null;
  }
  appendSprite(A) {
    let g = this.mData.modules, B = this.mData.groups;
    if (!A)
      return console.warn("添加元件失败,无数据信息"), !1;
    if (!A.mid)
      return console.warn("添加元件失败,无模块id" + mid), !1;
    A.zIndex || (A.zIndex = this.mData.getMaxZIndex(A.mid) + 1);
    let t = Tg.call(this.mData, A);
    if (A.gpid && B.setGroup(A.gpid))
      B.addElement(t, A.gpid);
    else if (g.setModule(A.mid))
      g.addElement(t, A.mid);
    else
      return console.warn("添加元件失败，无法加入组或模块", t), !1;
    return this.mData.watchSimples(A), A;
  }
  // 删除单个元件
  delOneSprite(A, g = !0) {
    let B = this.mData.elements, t = this.mData.modules, e = this.mData.groups, Q = this.mData.unwatchs, C = this.sprites;
    if (C[A]) {
      let E = null;
      return C[A].gid ? E = e.delElement(A, C[A].gid) : C[A].mid && (E = t.delElement(A, C[A].mid)), g && (delete C[A], delete B[A], E && Q[A] && typeof Q[A] == "function" && Q[A]()), !!E;
    } else
      console.warn("删除模块内元件失败");
    return !1;
  }
  // 删除元件
  delSprite(A, g = !0) {
    if (A) {
      if (Array.isArray(A))
        return A.forEach((B) => {
          this.delOneSprite(B, g);
        }), !0;
      if (typeof A == "string")
        return this.delOneSprite(A, g);
    }
    return !1;
  }
  // 返回元件数据集合（以id键名）
  getSprites() {
    return this.sprites;
  }
  // 返回元件数据集合（数组）
  getSpriteList(A) {
    let g = Object.values(this.sprites);
    return A ? g.filter((B) => B.mid == A) : g;
  }
  // 返回元件数据
  getSprite(A) {
    if (A && this.sprites[A]) {
      let g = this.mData.component.getDefaultData(this.sprites[A].name);
      return Object.assign(this.sprites[A], Object.assign({}, g, this.sprites[A])), this.sprites[A];
    } else
      return null;
  }
  // 清空所有组件数据
  clearSprites() {
    Object.keys(this.sprites).forEach((g) => {
      this.clearSpriteData(this.sprites[g]), this.delSprite(g);
    });
  }
  // 清空组件内部数据
  clearSpriteData(A) {
    Object.keys(A).forEach((B) => {
      delete A[B];
    });
  }
}
const jg = function(I, A, g) {
  if (I && typeof I == "object") {
    let B = b(I), t = A || B.mid;
    if (B.type == "group" && t) {
      let e = [];
      B.components && (e = B.components, delete B.components);
      let Q = this.newGroup(B, t);
      return e.forEach((C) => {
        jg.call(this, C, t, Q.id);
      }), Q;
    } else
      return t ? this.addSprite(B, t, g) : (console.warn("缺少页面数据"), !1);
  } else
    return I && typeof I == "string" ? this.addSprite(I, A, g) : (console.warn("添加失败"), !1);
}, Wi = function(I, A = !0) {
  let g = this.sprites.sprites, B = this.groups.groups;
  if (g[I])
    return this.sprites.delSprite(I, A);
  if (B[I])
    return this.groups.delGroup(I, A);
}, $i = function(I) {
  Array.isArray(I) && I.length > 0 ? I.forEach((A) => {
    let g = [];
    typeof A == "object" && A.components && (g = A.components, delete A.components), this.newMoule(A), g.forEach((B) => {
      if (B.type == "group") {
        let t = [];
        B.components && (t = B.components, delete B.components), this.newGroup(B, A.id), t.forEach((e) => {
          this.addSprite(e, A.id, e.gpid);
        });
      } else
        this.addSprite(B, A.id);
    });
  }) : this.newMoule({ id: "default" });
}, AE = function(I) {
  let A = this.unwatchs, g = this.esSimple;
  I && (A[I.id] = Mg(I, (B) => {
    g[B.id] && Object.keys(g[B.id]).forEach((e) => {
      g[B.id][e] = B[e];
    });
  }));
};
class IE {
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
  // 元件数据集合（简单副本）
  esSimple = U({});
  // 监听对象
  unwatchs = {};
  // -------------------
  constructor(A, g) {
    this.AppSetup = A.app.AppSetup, this.component = A.app.component, this.modules = new Zi(this), this.groups = new Pi(this), this.sprites = new Vi(this), g && this.fillData(g);
  }
  // 填充数据
  fillData(A) {
    $i.call(this, A);
  }
  // 添加元素
  addElement() {
    return jg.call(this, ...arguments);
  }
  // 删除元素数据
  delElement() {
    return Wi.call(this, ...arguments);
  }
  // 返回单个元素
  getElement(A) {
    return this.elements[A];
  }
  // 返回所有元素（含编组）的数组列表
  getElements() {
    return [...this.groups.getGroupList(), ...this.sprites.getSpriteList()];
  }
  // 添加已有元素到模块
  appendElement() {
    return this.modules.addElement(...arguments);
  }
  // 移除模块内的已有元素
  removeElement() {
    return this.modules.delElement(...arguments);
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
    AE.call(this, ...arguments);
  }
  // 清空所有元素
  clearSprites() {
    return this.sprites.clearSprites(...arguments);
  }
  // 返回模块内元素的当前最大深度
  getMaxZIndex(A) {
    return Yg(this.getMyElements(A));
  }
  // 清空所有内容数据
  clearData() {
    this.sprites.clearSprites(), this.groups.clearGroups(), this.modules.clearModules();
  }
}
class gE {
  // 动作数据集合
  actions = U({});
  appData = null;
  constructor(A, g) {
    this.appData = A, g && this.fillData(g);
  }
  // 填充数据
  fillData(A) {
    Array.isArray(A) && A.forEach((g) => {
      this.setActionData(g);
    });
  }
  // 创建新动作
  createActionData(A, g) {
    let B = xA.actions.find((E) => E.action == A);
    if (!B)
      return console.warn(t + " 动作不存在"), null;
    let t = A, e = g.target || "", Q = g.value || B.value, C = g.description || B.description;
    return B.target == "component" && !C && (C = B.name + this.appData.getElement(e).title), this.setActionData({ action: t, target: e, value: Q, description: C });
  }
  // 修改动作数据
  editActionData(A) {
    return A.id ? this.setActionData(A) : (console.warn("没有要修改的动作信息"), null);
  }
  // 添加动作数据
  setActionData(A) {
    if (A && typeof A == "object") {
      let g = zi(A);
      return this.actions[g.id] = g, g.id;
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
      let g = [];
      if (A instanceof Array)
        for (const B in A)
          g.push(this.actions[A[B]]);
      else
        typeof A == "string" && this.actions[A] && g.push(this.actions[A]);
      return g;
    } else
      return Object.values(this.actions);
  };
  /**
   * 清空数据
   */
  clearData = function() {
    Object.keys(this.actions).forEach((g) => {
      delete this.actions[g];
    });
  };
}
const wI = function(I) {
  return U({
    get id() {
      return I.id || "";
    },
    get type() {
      return I.type || "";
    },
    name: I.name,
    value: I.value,
    uptime: I.uptime || ""
  });
};
class BE {
  // 数据集合
  data = {};
  dataList = U([]);
  appData = null;
  constructor(A, g) {
    this.appData = A, g && this.fillData(g);
  }
  // 填充数据
  fillData(A) {
    this.addGData({ id: "GD_query", name: "url参数", type: "temp", value: { data: Ug() } }), Array.isArray(A) && A.forEach((g) => {
      this.addGData(g);
    });
  }
  // 新增一个数据对象
  addGData = function(A, g = "", B = "source") {
    const t = this.appData.rData;
    if (CA(A) && A.id)
      return this.data[A.id] ? this.data[A.id] : (A.type == "remote" ? (A.value = t.addRemote(A.value).id, this.data[A.id] = wI(A)) : this.data[A.id] = wI(A), this.dataList.push(this.data[A.id]), this.data[A.id]);
    if (A) {
      let e = {};
      return B == "remote" ? (A = t.addRemote(A).id, e = Qg({ value: A, name: g, type: B })) : e = Qg({ value: A, name: g, type: B }), this.data[e.id] = wI(e), this.dataList.push(this.data[e.id]), this.data[e.id];
    } else
      return console.warn("无效全局数据添加"), !1;
  };
  // 编辑一个数据对象
  editGData = function(A, g) {
    let B = null;
    if (typeof A == "string" && CA(g) && this.data[A] ? (B = A, this.data[B] = g) : CA(A) && typeof A.id == "string" && this.data[A.id] && (B = A.id, this.data[B] = A), B) {
      let t = this.dataList.findIndex((e) => e.id == B);
      if (t > -1)
        return this.dataList[t] = this.data[B];
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
    Object.keys(this.data).forEach((g) => {
      delete this.data[g];
    }), this.dataList.splice(0, this.dataList.length);
  };
  get GData() {
    return this.data;
  }
}
class tE {
  remotes = U([]);
  appData = null;
  constructor(A, g) {
    this.appData = A, g && this.fillData(g);
  }
  // 填充数据
  fillData(A) {
    Array.isArray(A) && A.forEach((g) => {
      this.addRemote(g);
    });
  }
  addRemote() {
    let A = BI.call(this, ...arguments);
    return A || (A = Og.call(this.appData, ...arguments), A && A.id && this.remotes.findIndex((g) => g == A.id) < 0 && this.remotes.push(A.id)), A;
  }
  delRemote() {
    let A = gI.call(this, ...arguments);
    if (typeof A == "string" && this.remotes[A]) {
      let g = this.remotes.findIndex((B) => B == B);
      g >= 0 && this.remotes.splice(g, 1);
    }
    return A;
  }
  getRemote() {
    return BI.call(this, ...arguments);
  }
  requestData() {
    return zg.call(this, ...arguments);
  }
  createExtractRule() {
    return Kg.call(this, ...arguments);
  }
  getRemoteList() {
    return this.remotes.map((A) => S[A].getData());
  }
  // 清空数据
  clearData() {
    this.remotes.forEach((A) => {
      gI(A);
    }), this.remotes.splice(0, this.remotes.length);
  }
}
class eE {
  // 数据集合
  data = {};
  dataList = U([]);
  appData = null;
  constructor(A, g) {
    this.appData = A, g && this.fillData(g);
  }
  // 填充数据
  fillData(A) {
    Array.isArray(A) && A.forEach((g) => {
      this.addPlugin(g);
    });
  }
  addPlugin(A) {
    if (CA(A)) {
      if (A.id && this.data[A.id])
        return console.warn("插件存在"), null;
      if (A.url) {
        let g = Ti(A);
        return this.data[g.id] = g, this.dataList.push(g), this.data[g.id];
      }
    }
    return console.warn("插件添加失败", A), null;
  }
  delPlugin(A) {
    if (this.data[A])
      X(this.dataList, "id", A), delete this.data[A];
    else if (A) {
      let B = Object.values(this.data).find((t) => t.url == A);
      B && this.data[B.id] && (X(this.dataList, "id", B.id), delete this.data[B.id]);
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
    Object.keys(this.data).forEach((g) => {
      delete this.data[g];
    }), this.dataList.splice(0, this.dataList.length);
  };
}
const QE = function() {
  return aB(() => {
    if (this.AppSetup.scale)
      if (this.info.scaleMode == "auto") {
        let I = { width: this.info.width, height: this.info.height };
        if (this.scale.w > this.scale.h) {
          let A = I.width * (this.scale.w - this.scale.h) / 2 / this.scale.value;
          return "scale(" + this.scale.value + ")  translateX(" + A + "px)";
        } else {
          let A = I.height * (this.scale.h - this.scale.w) / 2 / this.scale.value;
          return "scale(" + this.scale.value + ")  translateY(" + A + "px)";
        }
      } else
        return this.info.scaleMode == "fill" ? "scale(" + this.scale.w + "," + this.scale.h + ")" : "";
    else
      return "";
  });
}, CE = function() {
  this.unwatch.forEach((I) => I()), this.unwatch = [];
  for (const I in filterDatas)
    filterDatas[I] = null;
  this.filterDatas = {};
}, iE = function(I) {
  if (typeof I != "string")
    return I;
  if (/^RD_\S{10}$/.test(I) && S[I])
    return S[I].data;
  if (this.gData) {
    const { GData: A } = this.gData, g = this.unwatch, B = this.filterDatas;
    let t = I, e = null;
    if (/.\?+./.test(I)) {
      let Q = I.split("?");
      t = Q[0], e = Q[1];
    }
    if (/(^GD_\S{10})|(^GD_query)$/.test(t) && A[t])
      if (A[t].type == "remote") {
        let Q = BI(A[t].value);
        return Q ? e ? (B[I] || (B[I] = ref(null), g.push(watch(Q.data, (C) => {
          B[I].value = II(C.data || C, e);
        }, { immediate: !0 }))), B[I]) : Q.data : null;
      } else
        return e ? II(A[t].value, e) : A[t].value;
  }
  return I;
};
class EE {
  // 应用配置
  AppSetup = Ki();
  // 应用
  app = null;
  // vue实例
  vapp = null;
  // 应用信息
  info = Oi();
  // 原始数据
  iData = {};
  // 管理舞台元素数据
  mData = null;
  // 管理动作事件数据
  aData = null;
  // 管理全局数据
  gData = null;
  // 管理接口数据
  rData = null;
  // 插件管理
  pData = null;
  // 监听对象
  unwatch = {};
  filterDatas = {};
  constructor(A, g) {
    this.app = A, Object.assign(this.AppSetup, g), this.scale = U({ value: 1, h: 1, w: 1 }), this.transform = QE.call(this), this.mData = new IE(this), this.aData = new gE(this), this.rData = new tE(this), this.gData = new BE(this), this.pData = new eE(this);
  }
  init(A) {
    this.app.vapp && (this.vapp = this.app.vapp, this.vapp.dom && (this.AppSetup.dom = this.vapp.dom)), this.splitData(A), this.initData(), this.resetScale(), window.addEventListener("resize", () => this.resetScale());
  }
  // 缩放比例更新
  resetScale() {
    let A = { width: this.info.width, height: this.info.height };
    Object.assign(this.scale, mg(this.AppSetup.dom, A));
  }
  // 拆分数据
  splitData(A) {
    this.iData = {};
    let g = A ? b(A) : {};
    ["modules", "actions", "globalData", "remote", "plugins"].forEach((t) => {
      g[t] ? (this.iData[t] = g[t], delete g[t]) : this.iData[t] = [];
    }), this.iData.info = g;
  }
  initData() {
    return this.iData && (Object.assign(this.info, this.iData.info), this.mData.fillData(this.iData.modules), this.aData.fillData(this.iData.actions), this.rData.fillData(this.iData.remote), this.gData.fillData(this.iData.globalData), this.pData.fillData(this.iData.plugins), p.emit(m.DATA_LOADED, this), this.rData.requestData(!0)), this;
  }
  requestRemote() {
    this.rData.requestData(!0);
  }
  // 返回元素
  getElement(A) {
    if (this.mData)
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
    return ji(this);
  }
  getDataSource() {
    return iE.call(this, ...arguments);
  }
  // 清除所有数据
  clearDataAll() {
    this.mData.clearData(), this.aData.clearData(), this.gData.clearData(), this.rData.clearData(), this.pData.clearData(), CE.call(this);
  }
}
function KI(I, A) {
  let g = b(I.getActionList(A.actions));
  return A.actionValue && typeof A.actionValue == "object" && g.forEach((B) => {
    A.actionValue[B.id] && (B.value = I.getDataSource(A.actionValue[B.id]));
  }), g;
}
function sE(I, A) {
  const g = this.AppSetup, B = this.data, t = this.data.info.id, e = A.id;
  return {
    style: {
      cursor: g.clickCursor
    },
    onClickCapture: function(Q) {
      if (p.emit(m.CLICK_SPRITE, v(A), Q), I.actions) {
        let C = KI(B, I);
        p.execute(C, e, t);
      }
    }
  };
}
const Eg = function(I, A, g) {
  const B = this.info.id;
  let t = b(this.getActionList(I));
  for (let e = 0, Q = t.length; e < Q; e++)
    g && t[e].value && typeof t[e].value == "object" ? Object.assign(t[e].value, g) : g && (t[e].value = g);
  p.execute(t, A, B);
};
function nE(I, A, g) {
  const B = this.data, t = this.data.aData, e = this.component.iComponents, Q = this.data.info.id, C = A.id;
  let E = {};
  if (g && e[g]) {
    let n = (e[g].emits || []).find((a) => a == I.event);
    n && typeof n == "string" ? /^[a-zA-Z][-_a-zA-Z0-9_-]{1,32}$/.test(n) ? E["on" + n.toLowerCase().replace(/( |^)[a-z]/g, (a) => a.toUpperCase())] = function(a) {
      /^solo-/.test(n) && a ? I.actions && I.actions instanceof Array && I.actions.length > 0 ? Eg.call(B, I.actions, C, a) : p.execute(b(t.getActionList(a)), C, Q) : I.actions && I.actions instanceof Array && Eg.call(B, I.actions, C, a);
    } : console.warn(n + "无效的事件名定义") : console.warn(I.event + "事件没有定义");
  }
  return E;
}
function aE(I, A) {
  const g = this.data, B = this.data.info.id, t = A.id;
  let e = null;
  return {
    timeout: "1",
    onTimeout(Q) {
      let C = Q.detail.value;
      if (e && (clearTimeout(e), e = null), C == "mounted") {
        let s = (I.pams || {}).delay || 1e3;
        e = setTimeout(() => {
          I.actions && p.execute(KI(g, I), t, B);
        }, parseInt(s));
      }
    }
  };
}
function oE(I, A) {
  const g = this.data, B = this.data.info.id, t = A.id;
  let e = null;
  return {
    interval: "1",
    onInterval(Q) {
      if (e && (UA.del(e), e = null), Q.detail.value == "mounted") {
        let E = (I.pams || {}).delay || 1e3;
        e = UA.add(() => {
          I.actions && p.execute(KI(g, I), t, B);
        }, parseInt(E));
      }
    }
  };
}
function FI(I) {
  const { myApp: A = {}, events: g, data: B = {}, componentName: t = "" } = I;
  let e = {};
  return t && (e = {
    style: {}
  }), A.AppSetup && A.AppSetup.interaction ? g.forEach((Q) => {
    switch (Q.event) {
      case "click":
        Object.assign(e, sE.call(A, Q, B));
        break;
      case "timeout":
        Object.assign(e, aE.call(A, Q, B));
        break;
      case "interval":
        Object.assign(e, oE.call(A, Q, B));
        break;
      default:
        Object.assign(e, nE.call(A, Q, B, t));
    }
  }) : B.type == "group" && !B.gpid ? Object.assign(e, {
    onClickCapture(Q) {
      Q.stopPropagation(), p.emit(m.CLICK_SPRITE, v(B), Q);
    },
    onDblclickCapture(Q) {
      Q.stopPropagation(), p.emit(m.DBLCLICK_SPRITE, v(B), Q);
    },
    onMousedownCapture(Q) {
      p.emit(m.MOUSEDOWN_SPRITE, v(B), Q);
    },
    onMouseoverCapture(Q) {
      p.emit(m.MOUSEOVER_SPRITE, v(B), Q);
    },
    onMouseoutCapture(Q) {
      p.emit(m.MOUSEOUT_SPRITE, v(B), Q);
    },
    onMouseupCapture(Q) {
      p.emit(m.MOUSEUP_SPRITE, v(B), Q);
    },
    onMouseleaveCapture(Q) {
      p.emit(m.MOUSELEAVE_SPRITE, v(B), Q);
    },
    onMouseenterCapture(Q) {
      p.emit(m.MOUSEENTER_SPRITE, v(B), Q);
    }
  }) : Object.assign(e, {
    onClick(Q) {
      Q.stopPropagation(), p.emit(m.CLICK_SPRITE, v(B), Q);
    },
    onMousedown(Q) {
      p.emit(m.MOUSEDOWN_SPRITE, v(B), Q);
    },
    onMouseover(Q) {
      p.emit(m.MOUSEOVER_SPRITE, v(B), Q);
    },
    onMouseout(Q) {
      p.emit(m.MOUSEOUT_SPRITE, v(B), Q);
    },
    onMouseup(Q) {
      p.emit(m.MOUSEUP_SPRITE, v(B), Q);
    },
    onMouseleave(Q) {
      p.emit(m.MOUSELEAVE_SPRITE, v(B), Q);
    },
    onMouseenter(Q) {
      p.emit(m.MOUSEENTER_SPRITE, v(B), Q);
    }
  }), e;
}
function T(I) {
  const { name: A, props: g, slots: B } = I, t = {
    AppSetup: _("AppSetup"),
    data: _("data"),
    component: _("component")
  }, e = t.data.mData;
  let Q = A, C = null;
  if (Q ? (C = oB(Q), C == Q && (console.warn(C + "组件没有找到"), C = "div")) : (console.warn("数据缺少组件" + g), C = "div"), typeof g == "string") {
    const E = e.getElement(g);
    if (!E)
      return;
    let s = { id: g, options: E.options };
    if (E.id) {
      let n = { myApp: t, events: E.events || [], data: E, componentName: Q };
      Object.assign(s, FI(n));
    }
    if (E.data) {
      let n = t.data.getDataSource(E.data);
      n && (s.data = pg(n) && n.data || n);
    }
    return L(C, s);
  } else if (typeof g < "u") {
    let E = { ...g };
    if (g.events) {
      let s = { myApp: t, events: g.events || [], data: g, componentName: Q };
      Object.assign(E, FI(s));
    }
    return E.ref = E.id, E.name && delete E.name, E.mid && delete E.mid, L(C, E, B);
  } else
    return L(C, {}, "");
}
const rE = {
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
  setup(I) {
    const A = _("data"), g = A.mData.modules.getModules(), B = A.getAppData(), t = rB(I.slots) ? [I.slots] : [];
    return t.length == 0 && (Array.isArray(I.slots) ? I.slots.forEach((e) => {
      t.push(L(e));
    }) : I.slots && t.push(L(I.slots))), Ng(() => {
      p.emit(m.STAGE_MOUNTED);
    }), () => {
      var e = [];
      const Q = [], C = [], E = [];
      for (const n in g)
        if (g.hasOwnProperty.call(g, n)) {
          const a = g[n];
          (typeof a.visible > "u" || a.visible == !0) && (a.type == "content" ? Q.push(a) : a.type == "fixed" ? C.push(a) : a.type == "overlayer" && E.push(a));
        }
      e.push(T({ name: "vx-background", props: I.background }), ...t), Q.length > 0 && e.push(T({ name: "vx-content", props: { modules: Q } })), C.length > 0 && e.push(T({ name: "vx-fixed", props: { modules: C } })), E.length > 0 && (e.unshift(T({ name: "vx-mask" })), e.push(T({ name: "vx-overlayer", props: { modules: E } }))), e.push(T({ name: "vx-popwin", props: I.popwin })), e.push(T({ name: "vx-message" }));
      let s = {
        position: "absolute",
        width: B.info.width ? B.info.width + "px" : "100%",
        height: B.info.height ? B.info.height + "px" : "100%",
        top: 0,
        left: 0,
        transformOrigin: "0 0",
        transform: B.transform.value,
        zIndex: 0,
        userSelect: "none",
        overflow: "hidden",
        ...b(B.info.background)
      };
      return L("div", {
        id: "vx-stage",
        style: s,
        onclick(n) {
          p.emit(m.CLICK_STAGE, n);
        }
      }, e);
    };
  }
};
function XA(I, A, g, B) {
  I && I.getAttribute && I.getAttribute(A) && I.dispatchEvent(new CustomEvent(A, {
    detail: {
      component: g,
      value: B
    }
  }));
}
const BA = {
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
      let I = typeof this.anim == "object" && this.anim.options ? this.anim.options : {};
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
        ...I
      };
    }
  },
  created() {
    this.id && p.addEventListener(`run_function_${this.id}`, (I) => {
      this.cmdRunning && this.cmdRunning(I);
    });
  },
  mounted() {
    XA(this.$el, "timeout", this, "mounted"), XA(this.$el, "interval", this, "mounted");
  },
  beforeUnmount() {
    this.id && p.removeEventListener(`run_function_${this.id}`), XA(this.$el, "timeout", this, "beforeUnmount"), XA(this.$el, "interval", this, "beforeUnmount");
  }
};
function cE(I) {
  let A = typeof I.anim == "object" && I.anim.options ? I.anim.options : {};
  return {
    position: "absolute",
    width: I.width > 0 ? I.width + "px" : "80px",
    height: I.height > 0 ? I.height + "px" : "80px",
    top: I.y + "px",
    left: I.x + "px",
    zIndex: I.selected ? 1e5 + I.zIndex : I.zIndex,
    transform: "rotate(" + I.angle + "deg)",
    opacity: I.opacity / 100,
    padding: I.padding,
    ...I.border,
    ...I.background,
    ...I.shadow,
    ...A
  };
}
function _g(I, { id: A, myApp: g }) {
  const B = cE(I), t = FI({ myApp: g, events: I.events || [], data: I, componentName: "" }), e = ["element_sprite", { element_selected: I.selected }, { element_hover: I.hover }];
  return I.anim && I.anim.name && g.AppSetup.interaction && e.push(I.anim.name), t.style && (Object.assign(B, t.style), delete t.style), { id: A, ...t, style: B, class: e };
}
const ZA = function(I, A, g, B) {
  I && I.getAttribute && I.getAttribute(A) && I.dispatchEvent(new CustomEvent(A, {
    detail: {
      component: g,
      value: B
    }
  }));
}, hE = function(I, A, g) {
  let B = null;
  Ng(() => {
    A.id && p.addEventListener(`run_function_${A.id}`, (t) => {
      I.cmdRunning && I.cmdRunning(t);
    }), I.value && I.value.el && (B = I.value.el, ZA(B, "timeout", I.value, "mounted"), ZA(B, "interval", I.value, "mounted"));
  }), cB(() => {
    A.id && p.removeEventListener(`run_function_${A.id}`), B && (ZA(B, "timeout", I.value, "beforeUnmount"), ZA(B, "interval", I.value, "beforeUnmount"));
  });
}, OI = {
  name: "vx-sprite",
  props: {
    id: String
  },
  setup(I, A) {
    const g = { value: null }, B = _("AppSetup"), t = _("data"), e = _("component"), Q = U({ x: 0, y: 0, width: 0, height: 0 });
    return hB("rect", Q), hE(g, I), () => {
      const C = t.getElement(I.id);
      Q.x = C.x, Q.y = C.y, Q.width = C.width, Q.height = C.height;
      let E = _g(C, { id: I.id, myApp: { AppSetup: B, data: t, component: e } }), s = T({ name: C.name, props: C.id });
      return g.value = L("div", E, s), g.value;
    };
  }
}, Xg = {
  name: "vx-sprite-group",
  props: {
    id: String
  },
  setup(I) {
    const A = _("AppSetup"), g = _("data"), B = _("component");
    return (t) => {
      const e = g.getElement(I.id);
      let Q = _g(e, { id: I.id, myApp: { AppSetup: A, data: g, component: B } });
      const C = [];
      return e.components && e.components.forEach((E, s) => {
        E.visible && C.push(L(OI, { id: E.id }));
      }), L("div", Q, C);
    };
  }
}, lE = {
  extends: BA,
  name: "vx-module",
  props: ["components"],
  setup(I) {
    const { components: A } = lB(I);
    return (g) => {
      const B = [];
      return A.value && A.value.forEach((t, e) => {
        t.visible && (t.type == "group" ? B.push(L(Xg, { id: t.id })) : B.push(L(OI, { id: t.id })));
      }), L("div", {
        id: g.id,
        style: g.style
      }, B);
    };
  }
}, DE = {
  extends: BA,
  name: "vx-plane",
  props: ["components"],
  setup() {
    return (I) => {
      const A = [];
      return I.components && I.components.forEach((g, B) => {
        g.visible && A.push(T({ name: g.name, props: g.id }));
      }), L("div", {
        id: I.id,
        style: I.style
      }, A);
    };
  }
}, uE = {
  extends: BA,
  name: "vx-popwin",
  render() {
    return L("div", {
      id: "vx-popwin",
      style: {
        position: "absolute",
        width: "100%",
        zIndex: 5e4
      }
    });
  }
};
let fE = {
  position: "absolute",
  width: "auto",
  height: "auto",
  top: 0,
  left: 0,
  zIndex: 1e4
};
const wE = {
  extends: BA,
  name: "vx-content",
  props: ["modules"],
  setup(I) {
    return () => {
      const A = I.modules, g = [];
      for (const B in A)
        if (A.hasOwnProperty.call(A, B)) {
          const t = A[B];
          (typeof t.visible > "u" || t.visible == !0) && g.push(T({ name: "vx-module", props: t }));
        }
      return L("div", {
        id: "vx-content",
        style: fE
      }, g);
    };
  }
};
let dE = {
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 2e4
};
const yE = {
  extends: BA,
  name: "vx-fixed",
  props: ["modules"],
  setup(I) {
    return () => {
      const A = I.modules, g = [];
      for (const B in A)
        if (A.hasOwnProperty.call(A, B)) {
          const t = A[B];
          (typeof t.visible > "u" || t.visible == !0) && g.push(T({ name: "vx-module", props: t }));
        }
      return L("div", {
        id: "vx-fixed",
        style: dE
      }, g);
    };
  }
};
let pE = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 4e4
};
const GE = {
  exports: BA,
  name: "vx-overlayer",
  props: ["modules"],
  setup(I) {
    return () => {
      const A = I.modules, g = [];
      for (const B in A)
        if (A.hasOwnProperty.call(A, B)) {
          const t = A[B];
          (typeof t.visible > "u" || t.visible == !0) && g.push(T({ name: "vx-module", props: t }));
        }
      return L("div", {
        id: "vx-overlayer",
        style: pE
      }, g);
    };
  }
};
let sg = {
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 99999999
}, ME = {
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
const NE = {
  extends: BA,
  name: "vx-message",
  setup() {
    const I = U([]);
    p.addEventListener("message-send", (g) => {
      I.length == 0 && A(), I.push(g);
    });
    const A = function() {
      setTimeout(() => {
        I.length > 0 && (I.splice(0, 1), I.length > 0 && A());
      }, 3e3);
    };
    return () => I.length > 0 ? L("div", {
      id: "vx-message",
      style: sg
    }, I.map((g) => L("div", { class: "message_item", style: ME }, g))) : L("div", {
      id: "vx-message",
      style: sg
    });
  }
}, FE = {
  exports: BA,
  name: "vx-mask",
  render() {
    return L("div", {
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
let kE = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0)",
  zIndex: 1
};
const SE = {
  name: "vx-background",
  setup(I) {
    return () => {
      let A = Object.assign({}, kE, I.style);
      return L("div", {
        id: "vx-background",
        style: A,
        onmousedown: (g) => {
          p.emit(m.MOUSEDOWN_BACKGROUND, g);
        },
        onmouseup: (g) => {
          p.emit(m.MOUSEUP_BACKGROUND, g);
        },
        onclick: (g) => {
          p.emit(m.CLICK_BACKGROUND, g);
        }
      });
    };
  }
}, RE = [lE, DE, uE, GE, wE, yE, NE, FE, SE, Xg, OI], JE = {
  install: (I) => {
    RE.forEach((A) => {
      I.component(A.name, A);
    });
  }
};
var mE = aI;
function YE() {
  this.__data__ = new mE(), this.size = 0;
}
var UE = YE;
function LE(I) {
  var A = this.__data__, g = A.delete(I);
  return this.size = A.size, g;
}
var HE = LE;
function bE(I) {
  return this.__data__.get(I);
}
var xE = bE;
function vE(I) {
  return this.__data__.has(I);
}
var qE = vE, KE = aI, OE = bg, zE = xg, TE = 200;
function jE(I, A) {
  var g = this.__data__;
  if (g instanceof KE) {
    var B = g.__data__;
    if (!OE || B.length < TE - 1)
      return B.push([I, A]), this.size = ++g.size, this;
    g = this.__data__ = new zE(B);
  }
  return g.set(I, A), this.size = g.size, this;
}
var _E = jE, XE = aI, ZE = UE, PE = HE, VE = xE, WE = qE, $E = _E;
function MA(I) {
  var A = this.__data__ = new XE(I);
  this.size = A.size;
}
MA.prototype.clear = ZE;
MA.prototype.delete = PE;
MA.prototype.get = VE;
MA.prototype.has = WE;
MA.prototype.set = $E;
var As = MA, Is = vI, gs = function() {
  try {
    var I = Is(Object, "defineProperty");
    return I({}, "", {}), I;
  } catch {
  }
}(), Zg = gs, ng = Zg;
function Bs(I, A, g) {
  A == "__proto__" && ng ? ng(I, A, {
    configurable: !0,
    enumerable: !0,
    value: g,
    writable: !0
  }) : I[A] = g;
}
var zI = Bs, ts = zI, es = sI;
function Qs(I, A, g) {
  (g !== void 0 && !es(I[A], g) || g === void 0 && !(A in I)) && ts(I, A, g);
}
var Pg = Qs;
function Cs(I) {
  return function(A, g, B) {
    for (var t = -1, e = Object(A), Q = B(A), C = Q.length; C--; ) {
      var E = Q[I ? C : ++t];
      if (g(e[E], E, e) === !1)
        break;
    }
    return A;
  };
}
var is = Cs, Es = is, ss = Es(), ns = ss, tI = {}, as = {
  get exports() {
    return tI;
  },
  set exports(I) {
    tI = I;
  }
};
(function(I, A) {
  var g = oA, B = A && !A.nodeType && A, t = B && !0 && I && !I.nodeType && I, e = t && t.exports === B, Q = e ? g.Buffer : void 0, C = Q ? Q.allocUnsafe : void 0;
  function E(s, n) {
    if (n)
      return s.slice();
    var a = s.length, r = C ? C(a) : new s.constructor(a);
    return s.copy(r), r;
  }
  I.exports = E;
})(as, tI);
var os = oA, rs = os.Uint8Array, cs = rs, ag = cs;
function hs(I) {
  var A = new I.constructor(I.byteLength);
  return new ag(A).set(new ag(I)), A;
}
var ls = hs, Ds = ls;
function us(I, A) {
  var g = A ? Ds(I.buffer) : I.buffer;
  return new I.constructor(g, I.byteOffset, I.length);
}
var fs = us;
function ws(I, A) {
  var g = -1, B = I.length;
  for (A || (A = Array(B)); ++g < B; )
    A[g] = I[g];
  return A;
}
var ds = ws, ys = rA, og = Object.create, ps = function() {
  function I() {
  }
  return function(A) {
    if (!ys(A))
      return {};
    if (og)
      return og(A);
    I.prototype = A;
    var g = new I();
    return I.prototype = void 0, g;
  };
}(), Gs = ps, Ms = Object.prototype;
function Ns(I) {
  var A = I && I.constructor, g = typeof A == "function" && A.prototype || Ms;
  return I === g;
}
var Vg = Ns, Fs = Gs, ks = Rg, Ss = Vg;
function Rs(I) {
  return typeof I.constructor == "function" && !Ss(I) ? Fs(ks(I)) : {};
}
var Js = Rs, ms = bA, Ys = dA, Us = "[object Arguments]";
function Ls(I) {
  return Ys(I) && ms(I) == Us;
}
var Hs = Ls, rg = Hs, bs = dA, Wg = Object.prototype, xs = Wg.hasOwnProperty, vs = Wg.propertyIsEnumerable, qs = rg(function() {
  return arguments;
}()) ? rg : function(I) {
  return bs(I) && xs.call(I, "callee") && !vs.call(I, "callee");
}, $g = qs, Ks = 9007199254740991;
function Os(I) {
  return typeof I == "number" && I > -1 && I % 1 == 0 && I <= Ks;
}
var AB = Os, zs = xI, Ts = AB;
function js(I) {
  return I != null && Ts(I.length) && !zs(I);
}
var TI = js, _s = TI, Xs = dA;
function Zs(I) {
  return Xs(I) && _s(I);
}
var Ps = Zs, HA = {}, Vs = {
  get exports() {
    return HA;
  },
  set exports(I) {
    HA = I;
  }
};
function Ws() {
  return !1;
}
var $s = Ws;
(function(I, A) {
  var g = oA, B = $s, t = A && !A.nodeType && A, e = t && !0 && I && !I.nodeType && I, Q = e && e.exports === t, C = Q ? g.Buffer : void 0, E = C ? C.isBuffer : void 0, s = E || B;
  I.exports = s;
})(Vs, HA);
var An = bA, In = AB, gn = dA, Bn = "[object Arguments]", tn = "[object Array]", en = "[object Boolean]", Qn = "[object Date]", Cn = "[object Error]", En = "[object Function]", sn = "[object Map]", nn = "[object Number]", an = "[object Object]", on = "[object RegExp]", rn = "[object Set]", cn = "[object String]", hn = "[object WeakMap]", ln = "[object ArrayBuffer]", Dn = "[object DataView]", un = "[object Float32Array]", fn = "[object Float64Array]", wn = "[object Int8Array]", dn = "[object Int16Array]", yn = "[object Int32Array]", pn = "[object Uint8Array]", Gn = "[object Uint8ClampedArray]", Mn = "[object Uint16Array]", Nn = "[object Uint32Array]", R = {};
R[un] = R[fn] = R[wn] = R[dn] = R[yn] = R[pn] = R[Gn] = R[Mn] = R[Nn] = !0;
R[Bn] = R[tn] = R[ln] = R[en] = R[Dn] = R[Qn] = R[Cn] = R[En] = R[sn] = R[nn] = R[an] = R[on] = R[rn] = R[cn] = R[hn] = !1;
function Fn(I) {
  return gn(I) && In(I.length) && !!R[An(I)];
}
var kn = Fn;
function Sn(I) {
  return function(A) {
    return I(A);
  };
}
var Rn = Sn, eI = {}, Jn = {
  get exports() {
    return eI;
  },
  set exports(I) {
    eI = I;
  }
};
(function(I, A) {
  var g = kg, B = A && !A.nodeType && A, t = B && !0 && I && !I.nodeType && I, e = t && t.exports === B, Q = e && g.process, C = function() {
    try {
      var E = t && t.require && t.require("util").types;
      return E || Q && Q.binding && Q.binding("util");
    } catch {
    }
  }();
  I.exports = C;
})(Jn, eI);
var mn = kn, Yn = Rn, cg = eI, hg = cg && cg.isTypedArray, Un = hg ? Yn(hg) : mn, IB = Un;
function Ln(I, A) {
  if (!(A === "constructor" && typeof I[A] == "function") && A != "__proto__")
    return I[A];
}
var gB = Ln, Hn = zI, bn = sI, xn = Object.prototype, vn = xn.hasOwnProperty;
function qn(I, A, g) {
  var B = I[A];
  (!(vn.call(I, A) && bn(B, g)) || g === void 0 && !(A in I)) && Hn(I, A, g);
}
var Kn = qn, On = Kn, zn = zI;
function Tn(I, A, g, B) {
  var t = !g;
  g || (g = {});
  for (var e = -1, Q = A.length; ++e < Q; ) {
    var C = A[e], E = B ? B(g[C], I[C], C, g, I) : void 0;
    E === void 0 && (E = I[C]), t ? zn(g, C, E) : On(g, C, E);
  }
  return g;
}
var jn = Tn;
function _n(I, A) {
  for (var g = -1, B = Array(I); ++g < I; )
    B[g] = A(g);
  return B;
}
var Xn = _n, Zn = 9007199254740991, Pn = /^(?:0|[1-9]\d*)$/;
function Vn(I, A) {
  var g = typeof I;
  return A = A ?? Zn, !!A && (g == "number" || g != "symbol" && Pn.test(I)) && I > -1 && I % 1 == 0 && I < A;
}
var BB = Vn, Wn = Xn, $n = $g, Aa = vA, Ia = HA, ga = BB, Ba = IB, ta = Object.prototype, ea = ta.hasOwnProperty;
function Qa(I, A) {
  var g = Aa(I), B = !g && $n(I), t = !g && !B && Ia(I), e = !g && !B && !t && Ba(I), Q = g || B || t || e, C = Q ? Wn(I.length, String) : [], E = C.length;
  for (var s in I)
    (A || ea.call(I, s)) && !(Q && // Safari 9 has enumerable `arguments.length` in strict mode.
    (s == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    t && (s == "offset" || s == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    e && (s == "buffer" || s == "byteLength" || s == "byteOffset") || // Skip index properties.
    ga(s, E))) && C.push(s);
  return C;
}
var Ca = Qa;
function ia(I) {
  var A = [];
  if (I != null)
    for (var g in Object(I))
      A.push(g);
  return A;
}
var Ea = ia, sa = rA, na = Vg, aa = Ea, oa = Object.prototype, ra = oa.hasOwnProperty;
function ca(I) {
  if (!sa(I))
    return aa(I);
  var A = na(I), g = [];
  for (var B in I)
    B == "constructor" && (A || !ra.call(I, B)) || g.push(B);
  return g;
}
var ha = ca, la = Ca, Da = ha, ua = TI;
function fa(I) {
  return ua(I) ? la(I, !0) : Da(I);
}
var tB = fa, wa = jn, da = tB;
function ya(I) {
  return wa(I, da(I));
}
var pa = ya, lg = Pg, Ga = tI, Ma = fs, Na = ds, Fa = Js, Dg = $g, ug = vA, ka = Ps, Sa = HA, Ra = xI, Ja = rA, ma = CA, Ya = IB, fg = gB, Ua = pa;
function La(I, A, g, B, t, e, Q) {
  var C = fg(I, g), E = fg(A, g), s = Q.get(E);
  if (s) {
    lg(I, g, s);
    return;
  }
  var n = e ? e(C, E, g + "", I, A, Q) : void 0, a = n === void 0;
  if (a) {
    var r = ug(E), y = !r && Sa(E), d = !r && !y && Ya(E);
    n = E, r || y || d ? ug(C) ? n = C : ka(C) ? n = Na(C) : y ? (a = !1, n = Ga(E, !0)) : d ? (a = !1, n = Ma(E, !0)) : n = [] : ma(E) || Dg(E) ? (n = C, Dg(C) ? n = Ua(C) : (!Ja(C) || Ra(C)) && (n = Fa(E))) : a = !1;
  }
  a && (Q.set(E, n), t(n, E, B, e, Q), Q.delete(E)), lg(I, g, n);
}
var Ha = La, ba = As, xa = Pg, va = ns, qa = Ha, Ka = rA, Oa = tB, za = gB;
function eB(I, A, g, B, t) {
  I !== A && va(A, function(e, Q) {
    if (t || (t = new ba()), Ka(e))
      qa(I, A, Q, g, eB, B, t);
    else {
      var C = B ? B(za(I, Q), e, Q + "", I, A, t) : void 0;
      C === void 0 && (C = e), xa(I, Q, C);
    }
  }, Oa);
}
var Ta = eB;
function ja(I) {
  return I;
}
var QB = ja;
function _a(I, A, g) {
  switch (g.length) {
    case 0:
      return I.call(A);
    case 1:
      return I.call(A, g[0]);
    case 2:
      return I.call(A, g[0], g[1]);
    case 3:
      return I.call(A, g[0], g[1], g[2]);
  }
  return I.apply(A, g);
}
var Xa = _a, Za = Xa, wg = Math.max;
function Pa(I, A, g) {
  return A = wg(A === void 0 ? I.length - 1 : A, 0), function() {
    for (var B = arguments, t = -1, e = wg(B.length - A, 0), Q = Array(e); ++t < e; )
      Q[t] = B[A + t];
    t = -1;
    for (var C = Array(A + 1); ++t < A; )
      C[t] = B[t];
    return C[A] = g(Q), Za(I, this, C);
  };
}
var Va = Pa;
function Wa(I) {
  return function() {
    return I;
  };
}
var $a = Wa, Ao = $a, dg = Zg, Io = QB, go = dg ? function(I, A) {
  return dg(I, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Ao(A),
    writable: !0
  });
} : Io, Bo = go, to = 800, eo = 16, Qo = Date.now;
function Co(I) {
  var A = 0, g = 0;
  return function() {
    var B = Qo(), t = eo - (B - g);
    if (g = B, t > 0) {
      if (++A >= to)
        return arguments[0];
    } else
      A = 0;
    return I.apply(void 0, arguments);
  };
}
var io = Co, Eo = Bo, so = io, no = so(Eo), ao = no, oo = QB, ro = Va, co = ao;
function ho(I, A) {
  return co(ro(I, A, oo), I + "");
}
var lo = ho, Do = sI, uo = TI, fo = BB, wo = rA;
function yo(I, A, g) {
  if (!wo(g))
    return !1;
  var B = typeof A;
  return (B == "number" ? uo(g) && fo(A, g.length) : B == "string" && A in g) ? Do(g[A], I) : !1;
}
var po = yo, Go = lo, Mo = po;
function No(I) {
  return Go(function(A, g) {
    var B = -1, t = g.length, e = t > 1 ? g[t - 1] : void 0, Q = t > 2 ? g[2] : void 0;
    for (e = I.length > 3 && typeof e == "function" ? (t--, e) : void 0, Q && Mo(g[0], g[1], Q) && (e = t < 3 ? void 0 : e, t = 1), A = Object(A); ++B < t; ) {
      var C = g[B];
      C && I(A, C, B, e);
    }
    return A;
  });
}
var Fo = No, ko = Ta, So = Fo, Ro = So(function(I, A, g) {
  ko(I, A, g);
}), yg = Ro;
class Jo {
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
    let g = this.iComponents[A];
    if (!g)
      return {};
    let B = {}, t = g.mixins || [], e = {};
    for (const Q of t)
      Q.props && Object.assign(e, Q.props);
    Object.assign(e, g.props);
    for (const Q in e)
      if (Object.hasOwnProperty.call(e, Q)) {
        const C = e[Q];
        typeof C.default == "function" ? B[Q] = C.default.call() : B[Q] = C.default;
      }
    return B.id = "sprite_" + z(10), B.name = A, B.type = g.type || "", B;
  }
  // 返回组件自定义事件
  getMyEvents(A) {
    let g = this.iComponents[A];
    if (!g)
      return [];
    let B = [], t = g.emits || [];
    for (const e in t)
      B.push({
        name: t[e],
        event: t[e],
        pams: "",
        actions: /^solo-/.test(A) ? null : []
      });
    return B;
  }
  // 返回组件事件（含默认事件）
  getEvents(A) {
    return [...xA.events, ...this.getMyEvents(A)];
  }
  // 添加组件（放入未安装列表）
  add(A) {
    return A ? Array.isArray(A) ? (A.forEach((g) => {
      this.componentItems.find((B) => B.name == g.name) ? console.warn(g.name + "组件名重复") : this.componentItems.push(g);
    }), !0) : this.componentItems.find((g) => g.name == A.name) ? (console.warn(A.name + "组件名重复"), !1) : (this.componentItems.push(A), !0) : !1;
  }
  // 删除组件
  del(A) {
    A && typeof A == "string" ? (X(this.componentItems, "name", A), this.iComponents[A] && (delete this.iComponents[A], delete this.iComponentsInfo[A])) : Array.isArray(A) && A.forEach((g) => this.del(g));
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
        let g = yg({}, A);
        this.iComponents[A.name] = g, this.iComponentsInfo[g.name] = {
          name: g.name,
          type: g.type,
          label: g.label,
          icon: g.icon
        }, this.app && this.app.vapp ? this.app.vapp.component(A.name, g) : console.error("组件注册失败，缺少vapp");
      }
    else
      Array.isArray(A) ? A.forEach((g) => this.__install(g)) : A && console.warn("缺少组件名");
  }
  // 安装组件
  install(A) {
    A ? Array.isArray(A) ? Array.isArray(A) && A.forEach((g) => this.install(g)) : this.add(A) && this.__install(A) : this.__install(this.componentItems);
  }
  // 重装组件（一般应用与vue实例变更）
  reload() {
    Object.values(this.iComponents).forEach((g) => {
      this.app && this.app.vapp ? (this.iComponents[g.name] = yg({}, BA, g), this.app.vapp.component(g.name, this.iComponents[g.name])) : console.error("组件注册失败，缺少app");
    });
  }
}
const mo = function() {
  return {
    // 更新元件原始数据
    reviewData(I, A) {
      if (A && A.id) {
        console.warn(A.id + "不能替换");
        return;
      }
      Object.assign(I, A);
    },
    // 显示元件
    show(I, A) {
      I && (Array.isArray(I) ? I.forEach((g) => {
        g.visible = A;
      }) : I.visible = A);
    },
    // 切换显示
    toggle(I) {
      I && (Array.isArray(I) ? I.forEach((A) => {
        A.visible = !A.visible;
      }) : I.visible = !I.visible);
    },
    // 更新元件传递数据
    sendData(I, A) {
      I && (Array.isArray(I) ? I.forEach((g) => {
        g.data = A;
      }) : I.data = A);
    },
    // 链接跳转
    href(I, A = "_blank") {
      I && (A == "a" ? window.location.href = I : window.open(I, A));
    },
    // 模块切换显示
    singleModule(I, A) {
      I.filter((g) => g.type == "content").forEach((g) => {
        g.id == A ? g.visible = !0 : g.visible = !1;
      });
    },
    // 开关弹窗页面
    popup(I, A) {
      return I && I.type == "overlayer" && (typeof A == "boolean" ? I.visible = A : I.visible = !I.visible), I;
    }
  };
}, RA = xA.actions, Yo = function(I) {
  return {
    name: I.name || "无名动作",
    action: I.action || null,
    target: I.target || "component",
    valueType: I.valueType || null,
    value: I.value || ""
  };
};
class Uo {
  app = null;
  // 动作方法集合
  actions = mo();
  // 外部插件添加的动作（用于可删除操作）
  uses = {};
  constructor(A) {
    this.app = A;
  }
  // 元素动作
  [uA.ACTION](A) {
    A.data && A.appid == this.app.id && (A.data instanceof Array ? A.data.forEach((g) => {
      this.executeAction(g.action, g.target, g.value);
    }) : A.data instanceof Object && typeof A.data != "function" && this.executeAction(A.data.action, A.data.target, A.data.value));
  }
  // 应用动作
  [uA.APP_ACTION]() {
  }
  // 添加一个动作
  useAction(A) {
    let g = Yo(A);
    RA.find((B) => B.action == g.action) ? console.warn(A, "已存在") : g.action && A.handle ? this.actions[g.action] ? console.warn(g.action + "动作已存在") : (RA.push(g), this.actions[g.action] = A.handle, this.uses[g.action] = g) : g.action ? console.warn(A, "缺少动作方法函数") : console.warn(A, "缺少action名称");
  }
  remove(A) {
    if (this.uses[A]) {
      let g = RA.findIndex((B) => B.action == A);
      g > -1 && RA.splice(g, 1), delete this.actions[A], delete this.uses[A];
    }
  }
  removeAll() {
    Object.keys(this.uses).forEach((g) => {
      this.remove(g);
    });
  }
  /**
   * 执行动作
   * @param {string} action 动作
   * @param {*} target 目标
   * @param {*} value 参数
   */
  executeAction(A, g, B) {
    if (this.actions[A]) {
      let { data: { mData: t } } = this.app, e = RA.find((Q) => Q.action == A);
      if (e) {
        let Q = {};
        e.target == "component" || e.target == "components" ? g instanceof Array ? (Q = [], g.forEach((C) => {
          Q.push(t.getElement(C));
        })) : g && (Q = t.getElement(g)) : e.target == "app" ? Q = data.getAppData() : e.target == "url" ? Q = g : e.target == "modules" ? Q = t.getModuleList() : e.target == "module" && (Q = t.getModule(g)), this.actions[A].call(this.app, Q, B);
      } else {
        let Q = t.getElement(g) || t.getModule(g);
        Q && (targetData = Q), this.actions[A].call(this.app, targetData, B);
      }
    } else
      console.warn(A + "动作不存在");
  }
}
function Lo(I) {
  const A = new Uo(I);
  for (const g in uA) {
    let B = uA[g];
    A[B] && p.addEventListener(B, A[B], A);
  }
  return A;
}
const Ho = function(I, A = "up") {
  const { mData: g } = this.appData, B = g.elements, t = g.getElement(I);
  if (t) {
    if (!t.mid) {
      console.warn("页面上找不到" + I);
      return;
    }
  } else {
    console.warn("元件不存在" + I);
    return;
  }
  let e = g.getMyElements(t.mid).map((Q) => ({
    id: Q.id,
    zIndex: Q.zIndex
  })).sort((Q, C) => C.zIndex - Q.zIndex);
  if (A == "up") {
    let Q = e.findIndex((C) => C.id == I);
    if (Q > 0) {
      let C = e[Q - 1].id, E = B[C].zIndex;
      B[C].zIndex = B[I].zIndex, B[I].zIndex = E;
    }
  } else if (A == "down") {
    let Q = e.findIndex((C) => C.id == I);
    if (Q < e.length - 1 && Q > -1) {
      let C = e[Q + 1].id, E = B[C].zIndex;
      B[C].zIndex = B[I].zIndex, B[I].zIndex = E;
    }
  } else if (A == "top") {
    let Q = e.findIndex((C) => C.id == I);
    if (Q > 0) {
      B[I].zIndex = e[0].zIndex;
      for (let C = 0; C < Q; C++)
        B[e[C].id].zIndex--;
    }
  } else if (A == "bottom") {
    let Q = e.findIndex((C) => C.id == I);
    if (Q < e.length - 1 && Q > -1) {
      B[I].zIndex = e[e.length - 1].zIndex;
      for (let C = Q + 1, E = e.length; C < E; C++)
        B[e[C].id].zIndex++;
    }
  }
}, bo = function(I, A, g = null) {
  const { mData: B } = this.appData, t = B.getSprites(), e = B.getGroups();
  if (t[I]) {
    let Q = b(t[I]);
    return Q.title += "_c", delete Q.id, delete Q.zIndex, Object.assign(Q, A), B.addSprite(Q, Q.mid, g);
  } else if (e[I]) {
    let Q = b(e[I]);
    Q.title += "_c", delete Q.id, delete Q.zIndex, Object.assign(Q, A);
    let C = [];
    Q.components && (C = Q.components, delete Q.components);
    let E = B.newGroup(Q, Q.mid);
    return C.forEach((s) => {
      this.copyAdd(s.id, { gpid: E.id }, E.id);
    }), E;
  }
}, xo = function(I, A) {
  const { mData: g } = this.appData, B = g.getSprites(), t = g.getGroups();
  if (B[I]) {
    let e = b(B[I]);
    return e.title += "_c", A && (delete e.id, delete e.gpid, delete e.mid, delete e.zIndex, delete e.lock, delete e.bind, typeof e.data == "string" && /(^GD_\S{10})|(^GD_query)|(^RD_\S{10})$/.test(e.data) && (e.data = ""), e.events = []), e;
  } else if (t[I]) {
    let e = b(t[I]);
    return e.title += "_c", A && (delete e.id, delete e.gpid, delete e.mid, delete e.zIndex), Array.isArray(e.components) && (e.components = e.components.map((Q) => this.copy(Q.id, A))), e;
  }
}, vo = function(I, A) {
  const { mData: g } = this.appData;
  g.getModuleList().forEach((B) => {
    if (A) {
      if (typeof A == "string") {
        if (B.id == A)
          return;
      } else if (A instanceof Array && A.find((t) => t == B.id))
        return;
    }
    B.type != "fixed" && (B.id == I ? B.visible = !0 : B.visible = !1);
  });
}, qo = function(I, A) {
  const { component: g } = this.app;
  let B = xA.events.find((t) => t.event == I) || g.getMyEvents(A).find((t) => t.event == I);
  return B ? b(B) : !1;
}, Ko = function(I, A, g = !1) {
  let B = this.appData.getElement(I);
  return A ? g ? B.events ? B.events.findIndex((t) => t.event == A) : -1 : B.events ? B.events.find((t) => t.event == A) : null : B.events || null;
}, Oo = function(I, A, g) {
  const B = this.appData;
  let t = this.getEvent(I, A);
  if (t)
    return t;
  let e = B.getElement(I), Q = this.newEventData(A, e.name);
  return e && Q ? (e.events || (e.events = []), g && (Q.pams = g), e.events.push(Q), e.events[e.events.length - 1]) : (console.warn(e ? A + "事件名称不对" : "缺少组件数据"), null);
}, zo = function(I, A, g) {
  const B = this.appData;
  let t = this.getEvent(I, A, !0);
  if (t > -1) {
    let e = B.getElement(I);
    return e.events[t].pams = g, e.events[t];
  }
  return null;
}, To = function(I, A) {
  const g = this.appData;
  let B = this.getEvent(I, A, !0);
  if (B > -1) {
    let t = g.getElement(I);
    return t.events.splice(B, 1), t.events;
  }
  return null;
}, jo = function(I, A, g = "") {
  if (g && typeof A == "string") {
    let B = this.getEvent(A, g);
    return B ? B.actions.findIndex((t) => t == I) < 0 && B.actions.push(I) : console.warn(A + "中" + g + "事件不存在"), B;
  } else if (typeof A == "object" && A.actions && A.actions instanceof Array)
    return A.actions.push(I), A;
}, _o = function(I, A, g, B) {
  if (g && typeof A == "string") {
    let t = this.getEvent(A, g);
    return t ? typeof B < "u" && (t.actionValue || (t.actionValue = {}), t.actionValue[I] = B) : console.warn(A + "中" + g + "事件不存在"), t;
  }
}, Xo = function(I, A, g = "", B = !1) {
  const t = this.appData;
  if (g && typeof A == "string") {
    let e = this.getEvent(A, g);
    return e && X(e.actions, "", I), B && t.aData.delActionData(I), e;
  } else if (typeof A == "object" && A.actions && A.actions instanceof Array)
    return X(A.actions, "", I), B && t.aData.delActionData(I), A;
}, Zo = function(I, A) {
  const g = this.appData;
  let B = [];
  if (I) {
    let t = g.getElement(I);
    if (Array.isArray(t.events))
      if (A) {
        let e = t.events.find((Q) => Q.event == A);
        e && (B = e.actions.map((Q) => ({
          sname: t.title,
          sid: t.id,
          event: e.event,
          id: Q
        })));
      } else
        B = t.events.map((e) => e.actions ? e.actions.map((Q) => ({
          sname: t.title,
          sid: t.id,
          event: e.event,
          id: Q
        })) : []).flat();
  } else
    B = g.mData.getSpriteList().map((t) => t.events && t.events.length > 0 ? t.events.map((e) => e.actions ? e.actions.map((Q) => ({
      sname: t.title,
      sid: t.id,
      event: e.event,
      id: Q
    })) : []).flat() : []).flat();
  return B;
};
class Po {
  app = null;
  appData = null;
  constructor(A) {
    this.app = A, this.appData = A.data;
  }
  jsonData() {
    return b.call(this, ...arguments);
  }
  extractData() {
    return mI.call(this, ...arguments);
  }
  setZindex() {
    return Ho.call(this, ...arguments);
  }
  copy() {
    return xo.call(this, ...arguments);
  }
  copyAdd() {
    return bo.call(this, ...arguments);
  }
  changeModuleShow() {
    return vo.call(this, ...arguments);
  }
  newEventData() {
    return qo.call(this, ...arguments);
  }
  getEvent() {
    return Ko.call(this, ...arguments);
  }
  addEvent() {
    return Oo.call(this, ...arguments);
  }
  editEvent() {
    return zo.call(this, ...arguments);
  }
  removeEvent() {
    return To.call(this, ...arguments);
  }
  addEventAction() {
    return jo.call(this, ...arguments);
  }
  editEventAction() {
    return _o.call(this, ...arguments);
  }
  removeEventAction() {
    return Xo.call(this, ...arguments);
  }
  getSpriteActions() {
    return Zo.call(this, ...arguments);
  }
  getBodyData() {
    return NI.call(this, ...arguments);
  }
}
var kI = function() {
}, QI = {}, jI = {}, CI = {};
function Vo(I, A) {
  I = I.push ? I : [I];
  var g = [], B = I.length, t = B, e, Q, C, E;
  for (e = function(s, n) {
    n.length && g.push(s), t--, t || A(g);
  }; B--; ) {
    if (Q = I[B], C = jI[Q], C) {
      e(Q, C);
      continue;
    }
    E = CI[Q] = CI[Q] || [], E.push(e);
  }
}
function CB(I, A) {
  if (I) {
    var g = CI[I];
    if (jI[I] = A, !!g)
      for (; g.length; )
        g[0](I, A), g.splice(0, 1);
  }
}
function SI(I, A) {
  I.call && (I = { success: I }), A.length ? (I.error || kI)(A) : (I.success || kI)(I);
}
function iB(I, A, g, B) {
  var t = document, e = g.async, Q = (g.numRetries || 0) + 1, C = g.before || kI, E = I.replace(/[\?|#].*$/, ""), s = I.replace(/^(css|img|module|nomodule)!/, ""), n, a, r;
  if (B = B || 0, /(^css!|\.css$)/.test(E))
    r = t.createElement("link"), r.rel = "stylesheet", r.href = s, n = "hideFocus" in r, n && r.relList && (n = 0, r.rel = "preload", r.as = "style");
  else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(E))
    r = t.createElement("img"), r.src = s;
  else if (r = t.createElement("script"), r.src = s, r.async = e === void 0 ? !0 : e, a = "noModule" in r, /^module!/.test(E)) {
    if (!a)
      return A(I, "l");
    r.type = "module";
  } else if (/^nomodule!/.test(E) && a)
    return A(I, "l");
  r.onload = r.onerror = r.onbeforeload = function(y) {
    var d = y.type[0];
    if (n)
      try {
        r.sheet.cssText.length || (d = "e");
      } catch (G) {
        G.code != 18 && (d = "e");
      }
    if (d == "e") {
      if (B += 1, B < Q)
        return iB(I, A, g, B);
    } else if (r.rel == "preload" && r.as == "style")
      return r.rel = "stylesheet";
    A(I, d, y.defaultPrevented);
  }, C(I, r) !== !1 && t.head.appendChild(r);
}
function Wo(I, A, g) {
  I = I.push ? I : [I];
  var B = I.length, t = B, e = [], Q, C;
  for (Q = function(E, s, n) {
    if (s == "e" && e.push(E), s == "b")
      if (n)
        e.push(E);
      else
        return;
    B--, B || A(e);
  }, C = 0; C < t; C++)
    iB(I[C], Q, g);
}
function wA(I, A, g) {
  var B, t;
  if (A && A.trim && (B = A), t = (B ? g : A) || {}, B) {
    if (B in QI)
      throw "LoadJS";
    QI[B] = !0;
  }
  function e(Q, C) {
    Wo(I, function(E) {
      SI(t, E), Q && SI({ success: Q, error: C }, E), CB(B, E);
    }, t);
  }
  if (t.returnPromise)
    return new Promise(e);
  e();
}
wA.ready = function(A, g) {
  return Vo(A, function(B) {
    SI(g, B);
  }), wA;
};
wA.done = function(A) {
  CB(A, []);
};
wA.reset = function() {
  QI = {}, jI = {}, CI = {};
};
wA.isDefined = function(A) {
  return A in QI;
};
const RI = function(I) {
  I instanceof Function ? I(this) : I && typeof I == "object" && I.install && I.install instanceof Function && I.install(this);
}, $o = function({ url: I, name: A }) {
  return new Promise((g, B) => {
    wA([I], {
      success: () => {
        typeof A == "string" ? RI.call(this, window[A]) : Array.isArray(A) && A.forEach((t) => {
          RI.call(this, window[t]);
        }), g();
      },
      error: (t) => B(t)
    });
  });
}, Ar = function(I) {
  return new Promise((A, g) => {
    if (Array.isArray(I)) {
      let B = [];
      I.forEach((t) => {
        B.push($o.call(this, t));
      }), Promise.all(B).then(A, g);
    } else
      A();
  });
};
window && typeof window.Vue > "u" && (window.Vue = EB);
const PA = [];
class Ir extends DA {
  constructor(A = {}) {
    super(), this.id = A.id || z(10), this.vapp = null, this.dom = null, this.component = new Jo(this), this.data = new EE(this, A.config), this.controller = Lo(this), this.AppSetup = this.data.AppSetup, this.helper = new Po(this);
  }
  async initData(A) {
    let g = await HI(A);
    return this.id = g.id, g && Array.isArray(g.plugins) && await Ar.call(this, g.plugins), this.data.init(g), {
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
      let g = this.data.getData();
      return Hg(g);
    }
  }
  // 添加组件
  addComponent(A) {
    this.component.add(A);
  }
  // 使用插件
  use(A) {
    RI.call(this, A);
  }
  // 创建
  create(A = {}) {
    return this.vapp ? !1 : (this.vapp = DB(rE, A), this.vapp.config.globalProperties.AppSetup = this.AppSetup, this.vapp.config.globalProperties.data = this.data, this.vapp.config.globalProperties.component = this.component, this.vapp.use(JE), this.component.install(), this.AppSetup.status = "create", console.log("%c灿create", "color:#0aa100"), !0);
  }
  // 显示
  display() {
    return this.vapp ? (this.AppSetup.dom instanceof HTMLElement ? this.dom = this.AppSetup.dom : typeof dom == "string" && (this.dom = document.querySelector(dom)), this.dom ? PA.includes(this.dom) ? (console.error("app加载的DOM已有内容"), !1) : (PA.push(this.dom), this.vapp.mount(this.dom), this.AppSetup.status = "display", console.log("%c灿display", "color:#0aa100"), !0) : (console.error(this.AppSetup.dom + "错误"), !1)) : (console.warn("app没有创建"), !1);
  }
  // 删除
  remove() {
    if (this.vapp) {
      let A = PA.findIndex((g) => g == this.dom);
      A > -1 && PA.splice(A, 1), this.vapp.unmount(), this.vapp = null, this.AppSetup.status = "remove", console.log("%c灿remove", "color:#0aa100");
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
const er = ft, Qr = Se, Cr = p, ir = xA, gr = m, Er = qi, sr = function(I, { display: A, components: g, actions: B, slots: t, data: e }) {
  let Q = new Ir({ config: I });
  return g && Q.use(g), B && Q.use(B), Q.create({ slots: t }), e && Q.initData(e).then((C) => {
    C && A == !0 && Q.display();
  }), Q;
};
RB.addEventListener("statechange", function(I) {
  p.emit(gr.PAGE_STATE, { state: I.newState, oldState: I.oldState });
});
console.log("%crd-runtime:2.0.1", "color:#0aa100");
export {
  gr as EVENTS,
  Cr as cmd,
  sr as createVapp,
  ir as dataOptions,
  Er as remote,
  Qr as secrecy,
  er as utils
};
//# sourceMappingURL=rd-runtime.mjs.map
