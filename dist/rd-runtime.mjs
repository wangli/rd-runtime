import * as Et from "vue";
import { getCurrentInstance as st, isReactive as pI, reactive as U, ref as GI, watch as MI, shallowReactive as nt, computed as ot, resolveComponent as at, h as L, isVNode as rt, onMounted as NI, onUnmounted as ct, provide as ht, toRefs as lt, createApp as Dt } from "vue";
function ut(g, A) {
  for (var I = 0; I < A.length; I++) {
    const t = A[I];
    if (typeof t != "string" && !Array.isArray(t)) {
      for (const B in t)
        if (B !== "default" && !(B in g)) {
          const e = Object.getOwnPropertyDescriptor(t, B);
          e && Object.defineProperty(g, B, e.get ? e : {
            enumerable: !0,
            get: () => t[B]
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
let $A;
try {
  new EventTarget(), $A = !0;
} catch {
  $A = !1;
}
class ft {
  constructor() {
    this.e = {};
  }
  addEventListener(A, I, t = !1) {
    this.t(A).push(I);
  }
  removeEventListener(A, I, t = !1) {
    const B = this.t(A), e = B.indexOf(I);
    e > -1 && B.splice(e, 1);
  }
  dispatchEvent(A) {
    return A.target = this, Object.freeze(A), this.t(A.type).forEach((I) => I(A)), !0;
  }
  t(A) {
    return this.e[A] = this.e[A] || [];
  }
}
var wt = $A ? EventTarget : ft;
let dt = class {
  constructor(A) {
    this.type = A;
  }
};
var yt = $A ? Event : dt;
class pt extends yt {
  constructor(A, I) {
    super(A), this.newState = I.newState, this.oldState = I.oldState, this.originalEvent = I.originalEvent;
  }
}
const sA = "active", JA = "passive", nA = "hidden", oA = "frozen", dg = "terminated", Xg = typeof safari == "object" && safari.pushNotification, Gt = "onpageshow" in self, Mt = ["focus", "blur", "visibilitychange", "freeze", "resume", "pageshow", Gt ? "pagehide" : "unload"], Zg = (g) => (g.preventDefault(), g.returnValue = "Are you sure?"), Nt = (g) => g.reduce((A, I, t) => (A[I] = t, A), {}), Ft = [[sA, JA, nA, dg], [sA, JA, nA, oA], [nA, JA, sA], [oA, nA], [oA, sA], [oA, JA]].map(Nt), kt = (g, A) => {
  for (let I, t = 0; I = Ft[t]; ++t) {
    const B = I[g], e = I[A];
    if (B >= 0 && e >= 0 && e > B)
      return Object.keys(I).slice(B, e + 1);
  }
  return [];
}, zA = () => document.visibilityState === nA ? nA : document.hasFocus() ? sA : JA;
class St extends wt {
  constructor() {
    super();
    const A = zA();
    this.s = A, this.i = [], this.a = this.a.bind(this), Mt.forEach((I) => addEventListener(I, this.a, !0)), Xg && addEventListener("beforeunload", (I) => {
      this.n = setTimeout(() => {
        I.defaultPrevented || I.returnValue.length > 0 || this.r(I, nA);
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
    !this.i.indexOf(A) > -1 && (this.i.length === 0 && addEventListener("beforeunload", Zg), this.i.push(A));
  }
  removeUnsavedChanges(A) {
    const I = this.i.indexOf(A);
    I > -1 && (this.i.splice(I, 1), this.i.length === 0 && removeEventListener("beforeunload", Zg));
  }
  r(A, I) {
    if (I !== this.s) {
      const t = this.s, B = kt(t, I);
      for (let e = 0; e < B.length - 1; ++e) {
        const Q = B[e], C = B[e + 1];
        this.s = C, this.dispatchEvent(new pt("statechange", { oldState: Q, newState: C, originalEvent: A }));
      }
    }
  }
  a(A) {
    switch (Xg && clearTimeout(this.n), A.type) {
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
        this.r(A, A.persisted ? oA : dg);
        break;
      case "visibilitychange":
        this.s !== oA && this.s !== dg && this.r(A, zA());
        break;
      case "freeze":
        this.r(A, oA);
    }
  }
}
var Rt = new St(), mA = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, DA = {}, Jt = {
  get exports() {
    return DA;
  },
  set exports(g) {
    DA = g;
  }
};
(function(g) {
  var A = Object.prototype.hasOwnProperty, I = "~";
  function t() {
  }
  Object.create && (t.prototype = /* @__PURE__ */ Object.create(null), new t().__proto__ || (I = !1));
  function B(E, s, n) {
    this.fn = E, this.context = s, this.once = n || !1;
  }
  function e(E, s, n, o, r) {
    if (typeof n != "function")
      throw new TypeError("The listener must be a function");
    var y = new B(n, o || E, r), d = I ? I + s : s;
    return E._events[d] ? E._events[d].fn ? E._events[d] = [E._events[d], y] : E._events[d].push(y) : (E._events[d] = y, E._eventsCount++), E;
  }
  function Q(E, s) {
    --E._eventsCount === 0 ? E._events = new t() : delete E._events[s];
  }
  function C() {
    this._events = new t(), this._eventsCount = 0;
  }
  C.prototype.eventNames = function() {
    var s = [], n, o;
    if (this._eventsCount === 0)
      return s;
    for (o in n = this._events)
      A.call(n, o) && s.push(I ? o.slice(1) : o);
    return Object.getOwnPropertySymbols ? s.concat(Object.getOwnPropertySymbols(n)) : s;
  }, C.prototype.listeners = function(s) {
    var n = I ? I + s : s, o = this._events[n];
    if (!o)
      return [];
    if (o.fn)
      return [o.fn];
    for (var r = 0, y = o.length, d = new Array(y); r < y; r++)
      d[r] = o[r].fn;
    return d;
  }, C.prototype.listenerCount = function(s) {
    var n = I ? I + s : s, o = this._events[n];
    return o ? o.fn ? 1 : o.length : 0;
  }, C.prototype.emit = function(s, n, o, r, y, d) {
    var G = I ? I + s : s;
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
          return f.fn.call(f.context, n, o), !0;
        case 4:
          return f.fn.call(f.context, n, o, r), !0;
        case 5:
          return f.fn.call(f.context, n, o, r, y), !0;
        case 6:
          return f.fn.call(f.context, n, o, r, y, d), !0;
      }
      for (J = 1, W = new Array(Z - 1); J < Z; J++)
        W[J - 1] = arguments[J];
      f.fn.apply(f.context, W);
    } else {
      var rg = f.length, j;
      for (J = 0; J < rg; J++)
        switch (f[J].once && this.removeListener(s, f[J].fn, void 0, !0), Z) {
          case 1:
            f[J].fn.call(f[J].context);
            break;
          case 2:
            f[J].fn.call(f[J].context, n);
            break;
          case 3:
            f[J].fn.call(f[J].context, n, o);
            break;
          case 4:
            f[J].fn.call(f[J].context, n, o, r);
            break;
          default:
            if (!W)
              for (j = 1, W = new Array(Z - 1); j < Z; j++)
                W[j - 1] = arguments[j];
            f[J].fn.apply(f[J].context, W);
        }
    }
    return !0;
  }, C.prototype.on = function(s, n, o) {
    return e(this, s, n, o, !1);
  }, C.prototype.once = function(s, n, o) {
    return e(this, s, n, o, !0);
  }, C.prototype.removeListener = function(s, n, o, r) {
    var y = I ? I + s : s;
    if (!this._events[y])
      return this;
    if (!n)
      return Q(this, y), this;
    var d = this._events[y];
    if (d.fn)
      d.fn === n && (!r || d.once) && (!o || d.context === o) && Q(this, y);
    else {
      for (var G = 0, f = [], Z = d.length; G < Z; G++)
        (d[G].fn !== n || r && !d[G].once || o && d[G].context !== o) && f.push(d[G]);
      f.length ? this._events[y] = f.length === 1 ? f[0] : f : Q(this, y);
    }
    return this;
  }, C.prototype.removeAllListeners = function(s) {
    var n;
    return s ? (n = I ? I + s : s, this._events[n] && Q(this, n)) : (this._events = new t(), this._eventsCount = 0), this;
  }, C.prototype.off = C.prototype.removeListener, C.prototype.addListener = C.prototype.on, C.prefixed = I, C.EventEmitter = C, g.exports = C;
})(Jt);
const kA = {}, mt = 10;
function Yt(g) {
  var A = !0, I = (/* @__PURE__ */ new Date()).getTime();
  return kA[g] ? (I - kA[g].time < mt && (A = !1), kA[g].count++, kA[g].time = I) : kA[g] = {
    count: 1,
    time: I
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
var Ag = {}, Ut = {
  get exports() {
    return Ag;
  },
  set exports(g) {
    Ag = g;
  }
};
(function(g, A) {
  (function(I, t) {
    g.exports = t();
  })(mA, function() {
    var I = 1e3, t = 6e4, B = 36e5, e = "millisecond", Q = "second", C = "minute", E = "hour", s = "day", n = "week", o = "month", r = "quarter", y = "year", d = "date", G = "Invalid Date", f = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Z = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, W = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(l) {
      var h = ["th", "st", "nd", "rd"], a = l % 100;
      return "[" + l + (h[(a - 20) % 10] || h[a] || h[0]) + "]";
    } }, J = function(l, h, a) {
      var D = String(l);
      return !D || D.length >= h ? l : "" + Array(h + 1 - D.length).join(a) + l;
    }, rg = { s: J, z: function(l) {
      var h = -l.utcOffset(), a = Math.abs(h), D = Math.floor(a / 60), c = a % 60;
      return (h <= 0 ? "+" : "-") + J(D, 2, "0") + ":" + J(c, 2, "0");
    }, m: function l(h, a) {
      if (h.date() < a.date())
        return -l(a, h);
      var D = 12 * (a.year() - h.year()) + (a.month() - h.month()), c = h.clone().add(D, o), w = a - c < 0, u = h.clone().add(D + (w ? -1 : 1), o);
      return +(-(D + (a - c) / (w ? c - u : u - c)) || 0);
    }, a: function(l) {
      return l < 0 ? Math.ceil(l) || 0 : Math.floor(l);
    }, p: function(l) {
      return { M: o, y, w: n, d: s, D: d, h: E, m: C, s: Q, ms: e, Q: r }[l] || String(l || "").toLowerCase().replace(/s$/, "");
    }, u: function(l) {
      return l === void 0;
    } }, j = "en", EA = {};
    EA[j] = W;
    var cg = function(l) {
      return l instanceof KA;
    }, qA = function l(h, a, D) {
      var c;
      if (!h)
        return j;
      if (typeof h == "string") {
        var w = h.toLowerCase();
        EA[w] && (c = w), a && (EA[w] = a, c = w);
        var u = h.split("-");
        if (!c && u.length > 1)
          return l(u[0]);
      } else {
        var N = h.name;
        EA[N] = h, c = N;
      }
      return !D && c && (j = c), c || !D && j;
    }, x = function(l, h) {
      if (cg(l))
        return l.clone();
      var a = typeof h == "object" ? h : {};
      return a.date = l, a.args = arguments, new KA(a);
    }, k = rg;
    k.l = qA, k.i = cg, k.w = function(l, h) {
      return x(l, { locale: h.$L, utc: h.$u, x: h.$x, $offset: h.$offset });
    };
    var KA = function() {
      function l(a) {
        this.$L = qA(a.locale, null, !0), this.parse(a);
      }
      var h = l.prototype;
      return h.parse = function(a) {
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
        }(a), this.$x = a.x || {}, this.init();
      }, h.init = function() {
        var a = this.$d;
        this.$y = a.getFullYear(), this.$M = a.getMonth(), this.$D = a.getDate(), this.$W = a.getDay(), this.$H = a.getHours(), this.$m = a.getMinutes(), this.$s = a.getSeconds(), this.$ms = a.getMilliseconds();
      }, h.$utils = function() {
        return k;
      }, h.isValid = function() {
        return this.$d.toString() !== G;
      }, h.isSame = function(a, D) {
        var c = x(a);
        return this.startOf(D) <= c && c <= this.endOf(D);
      }, h.isAfter = function(a, D) {
        return x(a) < this.startOf(D);
      }, h.isBefore = function(a, D) {
        return this.endOf(D) < x(a);
      }, h.$g = function(a, D, c) {
        return k.u(a) ? this[D] : this.set(c, a);
      }, h.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, h.valueOf = function() {
        return this.$d.getTime();
      }, h.startOf = function(a, D) {
        var c = this, w = !!k.u(D) || D, u = k.p(a), N = function(cA, O) {
          var eA = k.w(c.$u ? Date.UTC(c.$y, O, cA) : new Date(c.$y, O, cA), c);
          return w ? eA : eA.endOf(s);
        }, H = function(cA, O) {
          return k.w(c.toDate()[cA].apply(c.toDate("s"), (w ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(O)), c);
        }, Y = this.$W, q = this.$M, BA = this.$D, $ = "set" + (this.$u ? "UTC" : "");
        switch (u) {
          case y:
            return w ? N(1, 0) : N(31, 11);
          case o:
            return w ? N(1, q) : N(0, q + 1);
          case n:
            var NA = this.$locale().weekStart || 0, FA = (Y < NA ? Y + 7 : Y) - NA;
            return N(w ? BA - FA : BA + (6 - FA), q);
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
      }, h.endOf = function(a) {
        return this.startOf(a, !1);
      }, h.$set = function(a, D) {
        var c, w = k.p(a), u = "set" + (this.$u ? "UTC" : ""), N = (c = {}, c[s] = u + "Date", c[d] = u + "Date", c[o] = u + "Month", c[y] = u + "FullYear", c[E] = u + "Hours", c[C] = u + "Minutes", c[Q] = u + "Seconds", c[e] = u + "Milliseconds", c)[w], H = w === s ? this.$D + (D - this.$W) : D;
        if (w === o || w === y) {
          var Y = this.clone().set(d, 1);
          Y.$d[N](H), Y.init(), this.$d = Y.set(d, Math.min(this.$D, Y.daysInMonth())).$d;
        } else
          N && this.$d[N](H);
        return this.init(), this;
      }, h.set = function(a, D) {
        return this.clone().$set(a, D);
      }, h.get = function(a) {
        return this[k.p(a)]();
      }, h.add = function(a, D) {
        var c, w = this;
        a = Number(a);
        var u = k.p(D), N = function(q) {
          var BA = x(w);
          return k.w(BA.date(BA.date() + Math.round(q * a)), w);
        };
        if (u === o)
          return this.set(o, this.$M + a);
        if (u === y)
          return this.set(y, this.$y + a);
        if (u === s)
          return N(1);
        if (u === n)
          return N(7);
        var H = (c = {}, c[C] = t, c[E] = B, c[Q] = I, c)[u] || 1, Y = this.$d.getTime() + a * H;
        return k.w(Y, this);
      }, h.subtract = function(a, D) {
        return this.add(-1 * a, D);
      }, h.format = function(a) {
        var D = this, c = this.$locale();
        if (!this.isValid())
          return c.invalidDate || G;
        var w = a || "YYYY-MM-DDTHH:mm:ssZ", u = k.z(this), N = this.$H, H = this.$m, Y = this.$M, q = c.weekdays, BA = c.months, $ = function(O, eA, hg, OA) {
          return O && (O[eA] || O(D, w)) || hg[eA].slice(0, OA);
        }, NA = function(O) {
          return k.s(N % 12 || 12, O, "0");
        }, FA = c.meridiem || function(O, eA, hg) {
          var OA = O < 12 ? "AM" : "PM";
          return hg ? OA.toLowerCase() : OA;
        }, cA = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: Y + 1, MM: k.s(Y + 1, 2, "0"), MMM: $(c.monthsShort, Y, BA, 3), MMMM: $(BA, Y), D: this.$D, DD: k.s(this.$D, 2, "0"), d: String(this.$W), dd: $(c.weekdaysMin, this.$W, q, 2), ddd: $(c.weekdaysShort, this.$W, q, 3), dddd: q[this.$W], H: String(N), HH: k.s(N, 2, "0"), h: NA(1), hh: NA(2), a: FA(N, H, !0), A: FA(N, H, !1), m: String(H), mm: k.s(H, 2, "0"), s: String(this.$s), ss: k.s(this.$s, 2, "0"), SSS: k.s(this.$ms, 3, "0"), Z: u };
        return w.replace(Z, function(O, eA) {
          return eA || cA[O] || u.replace(":", "");
        });
      }, h.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, h.diff = function(a, D, c) {
        var w, u = k.p(D), N = x(a), H = (N.utcOffset() - this.utcOffset()) * t, Y = this - N, q = k.m(this, N);
        return q = (w = {}, w[y] = q / 12, w[o] = q, w[r] = q / 3, w[n] = (Y - H) / 6048e5, w[s] = (Y - H) / 864e5, w[E] = Y / B, w[C] = Y / t, w[Q] = Y / I, w)[u] || Y, c ? q : k.a(q);
      }, h.daysInMonth = function() {
        return this.endOf(o).$D;
      }, h.$locale = function() {
        return EA[this.$L];
      }, h.locale = function(a, D) {
        if (!a)
          return this.$L;
        var c = this.clone(), w = qA(a, D, !0);
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
    }(), _g = KA.prototype;
    return x.prototype = _g, [["$ms", e], ["$s", Q], ["$m", C], ["$H", E], ["$W", s], ["$M", o], ["$y", y], ["$D", d]].forEach(function(l) {
      _g[l[1]] = function(h) {
        return this.$g(h, l[0], l[1]);
      };
    }), x.extend = function(l, h) {
      return l.$i || (l(h, KA, x), l.$i = !0), x;
    }, x.locale = qA, x.isDayjs = cg, x.unix = function(l) {
      return x(1e3 * l);
    }, x.en = EA[j], x.Ls = EA, x.p = {}, x;
  });
})(Ut);
const Lt = Ag, FI = /* @__PURE__ */ ut({
  __proto__: null,
  default: Lt
}, [Ag]);
var Ht = typeof mA == "object" && mA && mA.Object === Object && mA, kI = Ht, bt = kI, xt = typeof self == "object" && self && self.Object === Object && self, vt = bt || xt || Function("return this")(), aA = vt, qt = aA, Kt = qt.Symbol, Jg = Kt, Pg = Jg, SI = Object.prototype, Ot = SI.hasOwnProperty, zt = SI.toString, SA = Pg ? Pg.toStringTag : void 0;
function Tt(g) {
  var A = Ot.call(g, SA), I = g[SA];
  try {
    g[SA] = void 0;
    var t = !0;
  } catch {
  }
  var B = zt.call(g);
  return t && (A ? g[SA] = I : delete g[SA]), B;
}
var jt = Tt, _t = Object.prototype, Xt = _t.toString;
function Zt(g) {
  return Xt.call(g);
}
var Pt = Zt, Vg = Jg, Vt = jt, Wt = Pt, $t = "[object Null]", AB = "[object Undefined]", Wg = Vg ? Vg.toStringTag : void 0;
function gB(g) {
  return g == null ? g === void 0 ? AB : $t : Wg && Wg in Object(g) ? Vt(g) : Wt(g);
}
var bA = gB;
function IB(g, A) {
  return function(I) {
    return g(A(I));
  };
}
var tB = IB, BB = tB, eB = BB(Object.getPrototypeOf, Object), RI = eB;
function QB(g) {
  return g != null && typeof g == "object";
}
var dA = QB, CB = bA, iB = RI, EB = dA, sB = "[object Object]", nB = Function.prototype, oB = Object.prototype, JI = nB.toString, aB = oB.hasOwnProperty, rB = JI.call(Object);
function cB(g) {
  if (!EB(g) || CB(g) != sB)
    return !1;
  var A = iB(g);
  if (A === null)
    return !0;
  var I = aB.call(A, "constructor") && A.constructor;
  return typeof I == "function" && I instanceof I && JI.call(I) == rB;
}
var CA = cB;
const $g = {
  dayjs(g, A) {
    return FI(g).format(A);
  }
}, hA = function(g, A, I, t) {
  let B = g;
  if (A) {
    let e = A.split(".");
    for (let Q of e)
      if (typeof B[Q] < "u")
        B = B[Q];
      else {
        B = null;
        break;
      }
  } else
    return typeof t == "object" && t.func ? $g[t.func].call(null, B, t.rule) : B;
  return I && B instanceof Array ? B.map((e) => hA(e, I, null, t)) : typeof t == "object" && t.func ? $g[t.func].call(null, B, t.rule) : B;
}, mg = function(g, A) {
  if (A && CA(A) && A.y && A.y instanceof Array && A.y.length > 0) {
    let I = [];
    if (A.x && A.x.name && A.x.path) {
      I.push([A.x.name]);
      let t = hA(g, A.x.path, A.x.mapKey, A.x.format);
      t && t.forEach((B, e) => {
        I[e + 1] = [B];
      }), A.y.forEach((B) => {
        I[0].push(B.name);
        let e = hA(g, B.path, B.mapKey, B.format);
        e && e instanceof Array && e.forEach((Q, C) => {
          I[C + 1] ? I[C + 1].push(Q) : I[C + 1] = [Q];
        });
      });
    } else
      A.y.forEach((t, B) => {
        let e = hA(g, t.path, t.mapKey, t.format);
        e && e instanceof Array && (B == 0 ? I.push([t.name]) : I[0].push(t.name), e.forEach((Q, C) => {
          I[C + 1] ? I[C + 1].push(Q) : I[C + 1] = [Q];
        }));
      });
    return I;
  } else {
    if (A && CA(A) && A.name && A.path)
      return {
        [A.name]: hA(g, A.path, A.mapKey, A.format)
      };
    if (A && A instanceof Array) {
      let I = {};
      return A.forEach((t) => {
        I[t.name] = hA(g, t.path, t.mapKey, t.format);
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
    let t = A ? g.findIndex((B) => B[A] == I) : g.findIndex((B) => B == I);
    return t > -1 ? g.splice(t, 1) : !1;
  } else
    return !1;
};
let z = (g = 21) => crypto.getRandomValues(new Uint8Array(g)).reduce((A, I) => (I &= 63, I < 36 ? A += I.toString(36) : I < 62 ? A += (I - 26).toString(36).toUpperCase() : I > 62 ? A += "-" : A += "_", A), "");
const hB = function() {
  const g = function() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  };
  return g() + g() + g() + g() + g() + g() + g() + g();
};
let AA = {};
const UA = {
  add(g, A = 1e3, I) {
    let t = I || "it_" + z(7);
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
const lB = {
  add(g, A, I) {
    let t = A || 1e3, B = I || "id_" + (/* @__PURE__ */ new Date()).getTime() + Math.floor(Math.random() * 1e3);
    return P[B] && clearTimeout(P[B]), P[B] = setTimeout(g, t), B;
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
}, _ = function(g = "AppSetup") {
  const { appContext: { config: { globalProperties: A = {} } } } = st();
  return A[g] || null;
}, Yg = function(g) {
  if (g) {
    let A = typeof g == "string" ? document.querySelector(g) : g, I = A.getBoundingClientRect();
    return I.width > 0 && I.height > 0 ? I : A.parentElement && A.parentElement.localName != "body" ? Yg(A.parentElement) : {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  return null;
}, mI = function(g, A) {
  let I = Yg(g) || {
    width: window.innerWidth,
    height: window.innerHeight
  }, t = I.height / A.height, B = I.width / A.width;
  return t < B ? { value: t, h: t, w: B } : { value: B, h: t, w: B };
}, YI = function(g) {
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
}, DB = function(...g) {
  let A = (/* @__PURE__ */ new Date()).getTime(), I = {
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
  return Object.assign({}, I, ...g);
}, yg = function(g) {
  return g ? Object.keys(g).map(function(A) {
    return encodeURIComponent(A) + "=" + encodeURIComponent(g[A]);
  }).join("&") : "";
}, UI = function(g, A = !0) {
  let I = location.href.slice(location.href.lastIndexOf("?")), t = {}, B = /([^?=&#]+)=([^?=&#]+)/g;
  return I.replace(B, (e, Q, C) => t[Q] = A ? decodeURIComponent(C) : C), g ? t[g] || "" : t;
}, uB = FI, fB = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createSimpleData: v,
  dayjs: uB,
  extractData: mg,
  getAppGlobal: _,
  getDomRect: Yg,
  getMaxZIndex: YI,
  getScale: mI,
  getTemplateData: DB,
  getUrlParam: UI,
  guid: hB,
  interval: UA,
  jsonData: b,
  jsonToParams: yg,
  removeArray: X,
  timeout: lB
}, Symbol.toStringTag, { value: "Module" })), QA = new DA(), p = {
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
    else if (Yt(g)) {
      let t = arguments.length;
      if (t <= 3)
        QA.emit(g, A, I);
      else {
        let B = [];
        for (i = 1; i < t; i++)
          B[0] = arguments[i];
        QA.emit(g, ...B);
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
    this.emit(uA.ACTION, t);
  },
  /**
   * 消息提示
   */
  message(g) {
    this.emit("message-send", g);
  },
  /**
   * 执行元件内的cmdRunning方法
   * @param {string} id 元件id 
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
    this.emit(uA.ACTION, {
      data: {
        action: "reviewData",
        sprid: g,
        value: A
      }
    });
  }
}, wB = [{
  name: "主内容区",
  type: "content"
}, {
  name: "覆盖弹层",
  type: "overlayer"
}], dB = [
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
], yB = [
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
], pB = [
  { name: "图表", type: "chart" },
  { name: "文本", type: "text" },
  { name: "表格", type: "table" },
  { name: "形状", type: "shape" },
  { name: "菜单", type: "menu" },
  { name: "媒体", type: "media" },
  { name: "地图", type: "map" },
  { name: "3D", type: "3d" },
  { name: "其它", type: "other" }
], GB = [
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
    return wB;
  },
  get actions() {
    return dB;
  },
  get dataTypes() {
    return yB;
  },
  get component() {
    return pB;
  },
  get events() {
    return GB;
  }
}, MB = "data:application/wasm;base64,AGFzbQEAAAAB4gEfYAJ/fwF/YAN/f38Bf2ACf38AYAN/f38AYAF/AX9gAX8AYAV/f39/fwBgBH9/f38AYAR/f39/AX9gAAF/YAV/f39/fwF/YAZ/f39/f38AYAF/AX5gAABgBn9/f39/fwF/YAd/f39/f39/AGAJf39/f39/f39/AGAJf39/f39/fn5+AGAFf39+f38AYAV/f31/fwBgA39/fABgBX9/fH9/AGAEf35/fwBgBH99f38AYAR/fH9/AGAHf39/f39/fwF/YAN/fH8Bf2AEf3x/fwF/YAJ+fwF/YAN+f38Bf2ABfAF/Ar8LHxEuL3JpY2hfd2FzbV9iZy5qcxpfX3diaW5kZ2VuX29iamVjdF9kcm9wX3JlZgAFES4vcmljaF93YXNtX2JnLmpzFV9fd2JpbmRnZW5fbnVtYmVyX25ldwAeES4vcmljaF93YXNtX2JnLmpzFF9fd2JpbmRnZW5faXNfb2JqZWN0AAQRLi9yaWNoX3dhc21fYmcuanMZX193YmluZGdlbl9qc3ZhbF9sb29zZV9lcQAAES4vcmljaF93YXNtX2JnLmpzFl9fd2JpbmRnZW5fYm9vbGVhbl9nZXQABBEuL3JpY2hfd2FzbV9iZy5qcxVfX3diaW5kZ2VuX251bWJlcl9nZXQAAhEuL3JpY2hfd2FzbV9iZy5qcxVfX3diaW5kZ2VuX3N0cmluZ19nZXQAAhEuL3JpY2hfd2FzbV9iZy5qcxRfX3diaW5kZ2VuX2Vycm9yX25ldwAAES4vcmljaF93YXNtX2JnLmpzGl9fd2JnX2dldF8yN2ZlM2RhYzFjNGQwMjI0AAARLi9yaWNoX3dhc21fYmcuanMdX193YmdfbGVuZ3RoX2U0OThmYmMyNGY5YzFkNGYABBEuL3JpY2hfd2FzbV9iZy5qcxpfX3diZ19uZXdfYjUyNWRlMTdmNDRhODk0MwAJES4vcmljaF93YXNtX2JnLmpzFl9fd2JpbmRnZW5faXNfZnVuY3Rpb24ABBEuL3JpY2hfd2FzbV9iZy5qcxtfX3diZ19uZXh0X2I3ZDUzMGMwNGZkOGIyMTcABBEuL3JpY2hfd2FzbV9iZy5qcxtfX3diZ19uZXh0Xzg4NTYwZWMwNmEwOTRkZWEABBEuL3JpY2hfd2FzbV9iZy5qcxtfX3diZ19kb25lXzFlYmVjMDNiYmQ5MTk4NDMABBEuL3JpY2hfd2FzbV9iZy5qcxxfX3diZ192YWx1ZV82YWM4ZGE1Y2M1YjNlZmRhAAQRLi9yaWNoX3dhc21fYmcuanMfX193YmdfaXRlcmF0b3JfNTVmMTE0NDQ2MjIxYWE1YQAJES4vcmljaF93YXNtX2JnLmpzGl9fd2JnX2dldF9iYWY0ODU1ZjlhOTg2MTg2AAARLi9yaWNoX3dhc21fYmcuanMbX193YmdfY2FsbF85NWQxZWE0ODhkMDNlNGU4AAARLi9yaWNoX3dhc21fYmcuanMaX193Ymdfc2V0XzE3MjI0YmM1NDhkZDFkN2IAAxEuL3JpY2hfd2FzbV9iZy5qcx5fX3diZ19pc0FycmF5XzM5ZDI4OTk3YmY2Yjk2YjQABBEuL3JpY2hfd2FzbV9iZy5qcy1fX3diZ19pbnN0YW5jZW9mX0FycmF5QnVmZmVyX2E2OWYwMmVlNGM0ZjUwNjUABBEuL3JpY2hfd2FzbV9iZy5qcyRfX3diZ19pc1NhZmVJbnRlZ2VyXzhjNDc4OTAyOWU4ODUxNTkABBEuL3JpY2hfd2FzbV9iZy5qcx1fX3diZ19idWZmZXJfY2Y2NWMwN2RlMzRiOWEwOAAEES4vcmljaF93YXNtX2JnLmpzGl9fd2JnX25ld181MzdiNzM0MWNlOTBiYjMxAAQRLi9yaWNoX3dhc21fYmcuanMaX193Ymdfc2V0XzE3NDk5ZThhYTQwMDNlYmQAAxEuL3JpY2hfd2FzbV9iZy5qcx1fX3diZ19sZW5ndGhfMjdhMmFmZThhYjQyYjA5ZgAEES4vcmljaF93YXNtX2JnLmpzLF9fd2JnX2luc3RhbmNlb2ZfVWludDhBcnJheV8wMWNlYmU3OWNhNjA2Y2NhAAQRLi9yaWNoX3dhc21fYmcuanMXX193YmluZGdlbl9kZWJ1Z19zdHJpbmcAAhEuL3JpY2hfd2FzbV9iZy5qcxBfX3diaW5kZ2VuX3Rocm93AAIRLi9yaWNoX3dhc21fYmcuanMRX193YmluZGdlbl9tZW1vcnkACQOcApoCAwYEDwMIBgAABQYAAQUIGwEDAg4DEAUCGgIBBQUFAQADAQIEBQUDBQIDHAECAwsABRELBQAZBAoAAAIBHQADAwAABQECAAkABQIDAwIDAgIDAgIA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AEHY4sAAQcziwAA2AgBBzOLAAEHE4sAANgIAQeDiwABB1OLAADYCAEHU4sAAQcziwAA2AgBB6OLAAEHc4sAANgIAQdziwABB1OLAADYCAEHk4sAAQdziwAA2AgBB8OLAAEHk4sAANgIAQeziwABB5OLAADYCAEH44sAAQeziwAA2AgBB9OLAAEHs4sAANgIAQYDjwABB9OLAADYCAEH84sAAQfTiwAA2AgBBiOPAAEH84sAANgIAQYTjwABB/OLAADYCAEGQ48AAQYTjwAA2AgBBjOPAAEGE48AANgIAQZjjwABBjOPAADYCAEGU48AAQYzjwAA2AgBBoOPAAEGU48AANgIAQZzjwABBlOPAADYCAEGo48AAQZzjwAA2AgBBsOPAAEGk48AANgIAQaTjwABBnOPAADYCAEG448AAQazjwAA2AgBBrOPAAEGk48AANgIAQcDjwABBtOPAADYCAEG048AAQazjwAA2AgBByOPAAEG848AANgIAQbzjwABBtOPAADYCAEHQ48AAQcTjwAA2AgBBxOPAAEG848AANgIAQdjjwABBzOPAADYCAEHM48AAQcTjwAA2AgBB4OPAAEHU48AANgIAQdTjwABBzOPAADYCAEHo48AAQdzjwAA2AgBB3OPAAEHU48AANgIAQfDjwABB5OPAADYCAEHk48AAQdzjwAA2AgBB+OPAAEHs48AANgIAQezjwABB5OPAADYCAEGA5MAAQfTjwAA2AgBB9OPAAEHs48AANgIAQYjkwABB/OPAADYCAEH848AAQfTjwAA2AgBBkOTAAEGE5MAANgIAQYTkwABB/OPAADYCAEGY5MAAQYzkwAA2AgBBjOTAAEGE5MAANgIAQaDkwABBlOTAADYCAEGU5MAAQYzkwAA2AgBBnOTAAEGU5MAANgIAQQhBCBD/ASEBQRRBCBD/ASECQRBBCBD/ASEGQbjkwAAgAyADELMCIgBBCBD/ASAAayIDELECIgA2AgBBsOTAACAFQQhqIAYgASACamogA2prIgE2AgAgACABQQFyNgIEQQhBCBD/ASEDQRRBCBD/ASECQRBBCBD/ASEFIAAgARCxAiAFIAIgA0EIa2pqNgIEQcTkwABBgICAATYCAAtBACECQbDkwAAoAgAiACAETQ0AQbDkwAAgACAEayIBNgIAQbjkwABBuOTAACgCACIAIAQQsQIiAzYCACADIAFBAXI2AgQgACAEEJQCIAAQswIhAgsgCEEQaiQAIAIL+RkCCn8IfkGeg8AALQAAIQ5BnIPAAC0AACEPAkACQAJAAkACQAJAAkACQAJAAkAgAkEHcSIHDgYABQECAwUEC0EIIQcMAwtBCiEHDAILQQshBwwBC0EMIQcLQQAhBkEAIAIgB2siCCAIIAJLGyIMQSBPDQEMAwsgAkUNASABIAJBf2oiAmotAAAiAUE9Rg0BIAFB3IDAAGotAABB/wFHDQEgACACNgIEIAAgAToAASAAQQA6AAAPCyAMQWBqIRACQAJAAkACQANAIApBYEYNASAKQSBqIgYgAksNAiALQRpqIARLDQMCQAJAIAEgCmoiCS0AACIHQdyAwABqMQAAIhFC/wFRDQAgCUEBai0AACIHQdyAwABqMQAAIhJC/wFRBEAgCkEBaiEKDAELIAlBAmotAAAiB0HcgMAAajEAACITQv8BUQRAIApBAmohCgwBCyAJQQNqLQAAIgdB3IDAAGoxAAAiFEL/AVEEQCAKQQNqIQoMAQsgCUEEai0AACIHQdyAwABqMQAAIhVC/wFRBEAgCkEEaiEKDAELIAlBBWotAAAiB0HcgMAAajEAACIWQv8BUQRAIApBBWohCgwBCyAJQQZqLQAAIgdB3IDAAGoxAAAiF0L/AVEEQCAKQQZqIQoMAQsgCUEHai0AACIHQdyAwABqMQAAIhhC/wFSDQEgCkEHaiEKCyAAIAetQgiGIAqtQiCGhDcCAA8LIAMgC2oiDSASQjSGIBFCOoaEIBNCLoaEIBRCKIaEIBVCIoaEIBZCHIaEIBdCFoaEIhIgGEIQhoQiEUIYhkKAgICAgOA/gyASQgiGQoCAgIDwH4OEIBFCCIhCgICA+A+DIBFCGIhCgID8B4OEIBFCKIhCgP4DgyARQjiIhISENwAAQQghByAJQQhqLQAAIghB3IDAAGoxAAAiEUL/AVENBEEJIQcgCUEJai0AACIIQdyAwABqMQAAIhJC/wFRDQRBCiEHIAlBCmotAAAiCEHcgMAAajEAACITQv8BUQ0EQQshByAJQQtqLQAAIghB3IDAAGoxAAAiFEL/AVENBEEMIQcgCUEMai0AACIIQdyAwABqMQAAIhVC/wFRDQRBDSEHIAlBDWotAAAiCEHcgMAAajEAACIWQv8BUQ0EQQ4hByAJQQ5qLQAAIghB3IDAAGoxAAAiF0L/AVENBEEPIQcgCUEPai0AACIIQdyAwABqMQAAIhhC/wFRDQQgDUEGaiASQjSGIBFCOoaEIBNCLoaEIBRCKIaEIBVCIoaEIBZCHIaEIBdCFoaEIhIgGEIQhoQiEUIYhkKAgICAgOA/gyASQgiGQoCAgIDwH4OEIBFCCIhCgICA+A+DIBFCGIhCgID8B4OEIBFCKIhCgP4DgyARQjiIhISENwAAQRAhBwJAIAlBEGotAAAiCEHcgMAAajEAACIRQv8BUQ0AQREhByAJQRFqLQAAIghB3IDAAGoxAAAiEkL/AVENAEESIQcgCUESai0AACIIQdyAwABqMQAAIhNC/wFRDQBBEyEHIAlBE2otAAAiCEHcgMAAajEAACIUQv8BUQ0AQRQhByAJQRRqLQAAIghB3IDAAGoxAAAiFUL/AVENAEEVIQcgCUEVai0AACIIQdyAwABqMQAAIhZC/wFRDQBBFiEHIAlBFmotAAAiCEHcgMAAajEAACIXQv8BUQ0AQRchByAJQRdqLQAAIghB3IDAAGoxAAAiGEL/AVENACANQQxqIBJCNIYgEUI6hoQgE0IuhoQgFEIohoQgFUIihoQgFkIchoQgF0IWhoQiEiAYQhCGhCIRQhiGQoCAgICA4D+DIBJCCIZCgICAgPAfg4QgEUIIiEKAgID4D4MgEUIYiEKAgPwHg4QgEUIoiEKA/gODIBFCOIiEhIQ3AABBGCEHIAlBGGotAAAiCEHcgMAAajEAACIRQv8BUQ0IQRkhByAJQRlqLQAAIghB3IDAAGoxAAAiEkL/AVENCEEaIQcgCUEaai0AACIIQdyAwABqMQAAIhNC/wFRDQhBGyEHIAlBG2otAAAiCEHcgMAAajEAACIUQv8BUQ0IQRwhByAJQRxqLQAAIghB3IDAAGoxAAAiFUL/AVENCEEdIQcgCUEdai0AACIIQdyAwABqMQAAIhZC/wFRDQhBHiEHIAlBHmotAAAiCEHcgMAAajEAACIXQv8BUQ0IQR8hByAJQR9qLQAAIghB3IDAAGoxAAAiGEL/AVENCCANQRJqIBJCNIYgEUI6hoQgE0IuhoQgFEIohoQgFUIihoQgFkIchoQgF0IWhoQiEiAYQhCGhCIRQhiGQoCAgICA4D+DIBJCCIZCgICAgPAfg4QgEUIIiEKAgID4D4MgEUIYiEKAgPwHg4QgEUIoiEKA/gODIBFCOIiEhIQ3AAAgBUF8aiEFIAtBGGohCyAGIgogEEsNBwwBCwsMBgtBYEEAQYSWwAAQmgIACyAKQSBqIAJBhJbAABCZAgALIAtBGmogBEGUlsAAEJkCAAsMAgsgAEEBOgAADwsCQAJAIAxBCEkNACAGIAxBeGoiCU8NAAJAAkACQAJAAkADQCAGQXhGDQIgBkEIaiIIIAJLDQMgC0F3Sw0EIAtBCGogBEsNBSABIAZqIgotAAAiB0HcgMAAajEAACIRQv8BUQ0BIApBAWotAAAiB0HcgMAAajEAACISQv8BUQRAIAZBAXIhBgwCCyAKQQJqLQAAIgdB3IDAAGoxAAAiE0L/AVEEQCAGQQJyIQYMAgsgCkEDai0AACIHQdyAwABqMQAAIhRC/wFRBEAgBkEDciEGDAILIApBBGotAAAiB0HcgMAAajEAACIVQv8BUQRAIAZBBHIhBgwCCyAKQQVqLQAAIgdB3IDAAGoxAAAiFkL/AVEEQCAGQQVyIQYMAgsgCkEGai0AACIHQdyAwABqMQAAIhdC/wFRBEAgBkEGciEGDAILIApBB2otAAAiB0HcgMAAajEAACIYQv8BUgRAIAMgC2ogEkI0hiARQjqGhCATQi6GhCAUQiiGhCAVQiKGhCAWQhyGhCAXQhaGhCISIBhCEIaEIhFCGIZCgICAgIDgP4MgEkIIhkKAgICA8B+DhCARQgiIQoCAgPgPgyARQhiIQoCA/AeDhCARQiiIQoD+A4MgEUI4iISEhDcAACAFQX9qIQUgC0EGaiELIAgiBiAJTw0IDAELCyAGQQdyIQYLIAAgBq1CIIYgB61CCIaENwIADwtBeCAGQQhqQaSWwAAQmgIACyAGQQhqIAJBpJbAABCZAgALIAsgC0EIakG0lsAAEJoCAAsgC0EIaiAEQbSWwAAQmQIACyAGIQgLAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgBUECSQRAIAshBQwBCyAFQX9qIQogAiAIayEHA0AgCCACSw0DIAtBeUsNBCALQQZqIgUgBEsNBSACIAhGDQYgASAIaiIJLQAAIgZB3IDAAGoxAAAiEUL/AVENEyAHQQJJDQcgCUEBai0AACIGQdyAwABqMQAAIhJC/wFRDQIgB0ECTQ0IIAlBAmotAAAiBkHcgMAAajEAACITQv8BUQ0JIAdBA00NCiAJQQNqLQAAIgZB3IDAAGoxAAAiFEL/AVENCyAHQQRNDQwgCUEEai0AACIGQdyAwABqMQAAIhVC/wFRDQ0gB0EFTQ0OIAlBBWotAAAiBkHcgMAAajEAACIWQv8BUQ0PIAdBBk0NECAJQQZqLQAAIgZB3IDAAGoxAAAiF0L/AVENESAHQQdNDRIgCUEHai0AACIGQdyAwABqMQAAIhhC/wFRBEAgCEEHaiEIDBQLIAMgC2oiBkEEaiASQjSGIBFCOoaEIBNCLoaEIBRCKIaEIBVCIoaEIBZCHIaEIBdCFoaEIhIgGEIQhoQiEUIYhkKAgICAgOA/gyASQgiGQoCAgIDwH4OEQiCIPQAAIAYgEUIIiEKAgID4D4MgEUIYiEKAgPwHg4QgEUIoiEKA/gODIBFCOIiEhD4AACAHQXhqIQcgCEEIaiEIIAUhCyAKQX9qIgoNAAsLIAAgASACIAggAyAEIAUgDkEARyAPEDQPCyAIQQFqIQgMEAsgCCACQcSWwAAQmAIACyALIAtBBmpB1JbAABCaAgALIAtBBmogBEHUlsAAEJkCAAtBAEEAQeSWwAAQngEAC0EBQQFB9JbAABCeAQALQQJBAkGEl8AAEJ4BAAsgCEECaiEIDAkLQQNBA0GUl8AAEJ4BAAsgCEEDaiEIDAcLQQRBBEGkl8AAEJ4BAAsgCEEEaiEIDAULQQVBBUG0l8AAEJ4BAAsgCEEFaiEIDAMLQQZBBkHEl8AAEJ4BAAsgCEEGaiEIDAELQQdBB0HUl8AAEJ4BAAsgACAGrUIIhiAIrUIghoQ3AgAPCyAAIAitQgiGIAcgCnKtQiCGhDcCAAunEAIIfxZ+IwBBMGsiBSQAAkACQAJAAkACQAJAIAEpAwAiDFBFBEAgASkDCCINUEUEQCABKQMQIgtQRQRAIAsgDHwiCyAMWgRAIAwgDVoEQAJAAkAgC0L//////////x9YBEAgBSABLwEYIgE7AQggBSAMIA19Ig03AwAgASABQWBqIAEgC0KAgICAEFQiAxsiBEFwaiAEIAtCIIYgCyADGyILQoCAgICAgMAAVCIDGyIEQXhqIAQgC0IQhiALIAMbIgtCgICAgICAgIABVCIDGyIEQXxqIAQgC0IIhiALIAMbIgtCgICAgICAgIAQVCIDGyIEQX5qIAQgC0IEhiALIAMbIgtCgICAgICAgIDAAFQiAxsgC0IChiALIAMbIg5CP4enQX9zaiIDa0EQdEEQdSIEQQBIDQIgBUJ/IAStIg+IIgsgDYM3AxAgDSALVg0NIAUgATsBCCAFIAw3AwAgBSALIAyDNwMQIAwgC1YNDUGgfyADa0EQdEEQdUHQAGxBsKcFakHOEG0iAUHRAE8NASABQQR0IgFBoK/AAGopAwAiEUL/////D4MiCyAMIA9CP4MiDIYiEEIgiCIXfiISQiCIIh0gEUIgiCIPIBd+fCAPIBBC/////w+DIhF+IhBCIIgiHnwgEkL/////D4MgCyARfkIgiHwgEEL/////D4N8QoCAgIAIfEIgiCEZQgFBACADIAFBqK/AAGovAQBqa0E/ca0iEoYiEUJ/fCEVIAsgDSAMhiIMQiCIIg1+IhBC/////w+DIAsgDEL/////D4MiDH5CIIh8IAwgD34iDEL/////D4N8QoCAgIAIfEIgiCEWIA0gD34hDSAMQiCIIQwgEEIgiCEQIAFBqq/AAGovAQAhAQJ/AkACQCAPIA4gDkJ/hUI/iIYiDkIgiCIafiIfIAsgGn4iE0IgiCIbfCAPIA5C/////w+DIg5+IhhCIIgiHHwgE0L/////D4MgCyAOfkIgiHwgGEL/////D4N8QoCAgIAIfEIgiCIYfEIBfCITIBKIpyIDQZDOAE8EQCADQcCEPUkNASADQYDC1y9JDQJBCEEJIANBgJTr3ANJIgQbIQZBgMLXL0GAlOvcAyAEGwwDCyADQeQATwRAQQJBAyADQegHSSIEGyEGQeQAQegHIAQbDAMLIANBCUshBkEBQQogA0EKSRsMAgtBBEEFIANBoI0GSSIEGyEGQZDOAEGgjQYgBBsMAQtBBkEHIANBgK3iBEkiBBshBkHAhD1BgK3iBCAEGwshBCAZfCEUIBMgFYMhCyAGIAFrQQFqIQggEyANIBB8IAx8IBZ8IiB9QgF8IhYgFYMhDUEAIQEDQCADIARuIQcCQAJAAkAgAUERRwRAIAEgAmoiCiAHQTBqIgk6AAAgFiADIAQgB2xrIgOtIBKGIhAgC3wiDFYNDSABIAZHDQMgAUEBaiIBQREgAUERSxshA0IBIQwDQCAMIQ4gDSEPIAEgA0YNAiABIAJqIAtCCn4iCyASiKdBMGoiBDoAACABQQFqIQEgDkIKfiEMIA9CCn4iDSALIBWDIgtYDQALIAFBf2oiBkERTw0CIA0gC30iEiARWiEDIAwgEyAUfX4iEyAMfCEQIBIgEVQNDiATIAx9IhIgC1gNDiACIAZqIQYgD0IKfiALIBF8fSETIBEgEn0hFSASIAt9IRRCACEPA0AgCyARfCIMIBJUIA8gFHwgCyAVfFpyRQRAQQEhAwwQCyAGIARBf2oiBDoAACAPIBN8IhYgEVohAyAMIBJaDRAgDyARfSEPIAwhCyAWIBFaDQALDA8LQRFBEUG8u8AAEJ4BAAsgA0ERQdy7wAAQngEACyABQRFB7LvAABCZAgALIAFBAWohASAEQQpJIARBCm4hBEUNAAtBoLvAAEEZQZC7wAAQvgEAC0HQusAAQS1BgLvAABC+AQALIAFB0QBB4LnAABCeAQALQbCnwABBHUHwp8AAEL4BAAtBuKzAAEE3QbC6wAAQvgEAC0Hwq8AAQTZBoLrAABC+AQALQcSrwABBHEGQusAAEL4BAAtBlKvAAEEdQYC6wAAQvgEAC0HnqsAAQRxB8LnAABC+AQALIAFBAWohAwJAIAFBEUkEQCAWIAx9Ig0gBK0gEoYiDlohASATIBR9IhJCAXwhESANIA5UIBJCf3wiEiAMWHINASALIA58IgwgHXwgHnwgGXwgDyAXIBp9fnwgG30gHH0gGH0hDyAbIBx8IBh8IB98IQ1CACAUIAsgEHx8fSEVQgIgICAMIBB8fH0hFANAIAwgEHwiFyASVCANIBV8IA8gEHxackUEQCALIBB8IQxBASEBDAMLIAogCUF/aiIJOgAAIAsgDnwhCyANIBR8IRMgFyASVARAIAwgDnwhDCAOIA98IQ8gDSAOfSENIBMgDloNAQsLIBMgDlohASALIBB8IQwMAQsgA0ERQcy7wAAQmQIACwJAAkAgAUUgESAMWHJFBEAgDCAOfCILIBFUIBEgDH0gCyARfVpyDQELIAxCAlpBACAMIBZCfHxYGw0BIABBADYCAAwFCyAAQQA2AgAMBAsgACAIOwEIIAAgAzYCBAwCCyALIQwLAkACQCADRSAQIAxYckUEQCAMIBF8IgsgEFQgECAMfSALIBB9WnINAQsgDkIUfiAMWEEAIAwgDkJYfiANfFgbDQEgAEEANgIADAMLIABBADYCAAwCCyAAIAg7AQggACABNgIECyAAIAI2AgALIAVBMGokAA8LIAVBADYCICAFQRBqIAUgBUEYahCsAQAL4Q8CCH8CfgJAIAFBG0kNAEEAIAFBZmoiBiAGIAFLGyEJAkACQANAIAVBGmogAU0EQCAHQWBGDQIgB0EgaiIGIANLDQMgAiAHaiIEIAAgBWoiBykAACIMQjiGIg1COoinQdyCwABqLQAAOgAAIARBAWogDSAMQiiGQoCAgICAgMD/AIOEIg1CNIinQT9xQdyCwABqLQAAOgAAIARBAmogDSAMQhiGQoCAgICA4D+DIAxCCIZCgICAgPAfg4SEIg1CLoinQT9xQdyCwABqLQAAOgAAIARBA2ogDUIoiKdBP3FB3ILAAGotAAA6AAAgBEEEaiANQiKIp0E/cUHcgsAAai0AADoAACAEQQZqIAxCCIhCgICA+A+DIAxCGIhCgID8B4OEIAxCKIhCgP4DgyAMQjiIhIQiDKciCEEWdkE/cUHcgsAAai0AADoAACAEQQdqIAhBEHZBP3FB3ILAAGotAAA6AAAgBEEFaiAMIA2EQhyIp0E/cUHcgsAAai0AADoAACAEQQhqIAdBBmopAAAiDEI4hiINQjqIp0HcgsAAai0AADoAACAEQQlqIA0gDEIohkKAgICAgIDA/wCDhCINQjSIp0E/cUHcgsAAai0AADoAACAEQQpqIA0gDEIYhkKAgICAgOA/gyAMQgiGQoCAgIDwH4OEhCINQi6Ip0E/cUHcgsAAai0AADoAACAEQQtqIA1CKIinQT9xQdyCwABqLQAAOgAAIARBDGogDUIiiKdBP3FB3ILAAGotAAA6AAAgBEENaiANIAxCCIhCgICA+A+DIAxCGIhCgID8B4OEIAxCKIhCgP4DgyAMQjiIhIQiDIRCHIinQT9xQdyCwABqLQAAOgAAIARBDmogDKciCEEWdkE/cUHcgsAAai0AADoAACAEQQ9qIAhBEHZBP3FB3ILAAGotAAA6AAAgBEEQaiAHQQxqKQAAIgxCOIYiDUI6iKdB3ILAAGotAAA6AAAgBEERaiANIAxCKIZCgICAgICAwP8Ag4QiDUI0iKdBP3FB3ILAAGotAAA6AAAgBEESaiANIAxCGIZCgICAgIDgP4MgDEIIhkKAgICA8B+DhIQiDUIuiKdBP3FB3ILAAGotAAA6AAAgBEETaiANQiiIp0E/cUHcgsAAai0AADoAACAEQRRqIA1CIoinQT9xQdyCwABqLQAAOgAAIARBFmogDEIIiEKAgID4D4MgDEIYiEKAgPwHg4QgDEIoiEKA/gODIAxCOIiEhCIMpyIIQRZ2QT9xQdyCwABqLQAAOgAAIARBF2ogCEEQdkE/cUHcgsAAai0AADoAACAEQRVqIAwgDYRCHIinQT9xQdyCwABqLQAAOgAAIARBGGogB0ESaikAACIMQjiGIg1COoinQdyCwABqLQAAOgAAIARBGWogDSAMQiiGQoCAgICAgMD/AIOEIg1CNIinQT9xQdyCwABqLQAAOgAAIARBGmogDSAMQhiGQoCAgICA4D+DIAxCCIZCgICAgPAfg4SEIg1CLoinQT9xQdyCwABqLQAAOgAAIARBG2ogDUIoiKdBP3FB3ILAAGotAAA6AAAgBEEcaiANQiKIp0E/cUHcgsAAai0AADoAACAEQR1qIA0gDEIIiEKAgID4D4MgDEIYiEKAgPwHg4QgDEIoiEKA/gODIAxCOIiEhCIMhEIciKdBP3FB3ILAAGotAAA6AAAgBEEeaiAMpyIHQRZ2QT9xQdyCwABqLQAAOgAAIARBH2ogB0EQdkE/cUHcgsAAai0AADoAACAGIQcgBUEYaiIFIAlNDQEMBAsLIAVBGmogAUHYmMAAEJkCAAtBYEEAQeiYwAAQmgIACyAHQSBqIANB6JjAABCZAgALAkACQAJAAkACQAJAAkACQAJAAkACQCAFIAEgAUEDcCIIayIJTwRAIAYhBAwBCwNAIAVBfEsNAiAFQQNqIgcgAUsNAyAGQXtLDQQgBkEEaiIEIANLDQUgAiAGaiIGIAAgBWoiBS0AACIKQQJ2QdyCwABqLQAAOgAAIAZBA2ogBUECai0AACILQT9xQdyCwABqLQAAOgAAIAZBAmogBUEBai0AACIFQQJ0IAtBBnZyQT9xQdyCwABqLQAAOgAAIAZBAWogCkEEdCAFQQR2ckE/cUHcgsAAai0AADoAACAEIQYgByIFIAlJDQALCwJAAkAgCEF/ag4CAAELCyAEIANPDQVBAiEHIAIgBGogACAJai0AACIAQQJ2QdyCwABqLQAAOgAAIARBAWoiASADSQRAIABBBHRBMHEhBQwKCyABIANBqJnAABCeAQALIAQgA08NBSACIARqIAAgCWotAAAiBUECdkHcgsAAai0AADoAACAJQQFqIgYgAU8NBiAEQQFqIgEgA08NByABIAJqIAVBBHQgACAGai0AACIAQQR2ckE/cUHcgsAAai0AADoAACAEQQJqIgEgA0kEQCAAQQJ0QTxxIQVBAyEHDAkLIAEgA0HomcAAEJ4BAAsgBSAFQQNqQfiYwAAQmgIACyAFQQNqIAFB+JjAABCZAgALIAYgBkEEakGImcAAEJoCAAsgBkEEaiADQYiZwAAQmQIACyAEIANBmJnAABCeAQALIAQgA0G4mcAAEJ4BAAsgBiABQciZwAAQngEACyABIANB2JnAABCeAQALIAEgAmogBUHcgsAAai0AADoAACAEIAdqIQQLIAQL0AgBBH8jAEHwAGsiBSQAIAUgAzYCDCAFIAI2AggCQAJAAkACQCAFAn8CQAJAIAFBgQJPBEADQCAAIAZqIAZBf2oiByEGQYACaiwAAEG/f0wNAAsgB0GBAmoiBiABSQ0CIAFB/31qIAdHDQQgBSAGNgIUDAELIAUgATYCFAsgBSAANgIQQbCnwAAhB0EADAELIAAgB2pBgQJqLAAAQb9/TA0BIAUgBjYCFCAFIAA2AhBBjMrAACEHQQULNgIcIAUgBzYCGAJAIAIgAUsiBiADIAFLckUEQAJ/AkACQCACIANNBEACQAJAIAJFDQAgAiABTwRAIAEgAkYNAQwCCyAAIAJqLAAAQUBIDQELIAMhAgsgBSACNgIgIAIgASIGSQRAIAJBAWoiA0EAIAJBfWoiBiAGIAJLGyIGSQ0GIAAgA2ogACAGamshBgNAIAZBf2ohBiAAIAJqIAJBf2oiByECLAAAQUBIDQALIAdBAWohBgsCQCAGRQ0AIAYgAU8EQCABIAZGDQEMCgsgACAGaiwAAEG/f0wNCQsgASAGRg0HAkAgACAGaiIBLAAAIgBBf0wEQCABLQABQT9xIQMgAEEfcSECIABBX0sNASACQQZ0IANyIQAMBAsgBSAAQf8BcTYCJEEBDAQLIAEtAAJBP3EgA0EGdHIhAyAAQXBPDQEgAyACQQx0ciEADAILIAVB5ABqQcYANgIAIAVB3ABqQcYANgIAIAVB1ABqQS82AgAgBUE8akEENgIAIAVBxABqQQQ2AgAgBUHwysAANgI4IAVBADYCMCAFQS82AkwgBSAFQcgAajYCQCAFIAVBGGo2AmAgBSAFQRBqNgJYIAUgBUEMajYCUCAFIAVBCGo2AkgMCAsgAkESdEGAgPAAcSABLQADQT9xIANBBnRyciIAQYCAxABGDQULIAUgADYCJEEBIABBgAFJDQAaQQIgAEGAEEkNABpBA0EEIABBgIAESRsLIQcgBSAGNgIoIAUgBiAHajYCLCAFQTxqQQU2AgAgBUHEAGpBBTYCACAFQewAakHGADYCACAFQeQAakHGADYCACAFQdwAakHIADYCACAFQdQAakHJADYCACAFQcTLwAA2AjggBUEANgIwIAVBLzYCTCAFIAVByABqNgJAIAUgBUEYajYCaCAFIAVBEGo2AmAgBSAFQShqNgJYIAUgBUEkajYCUCAFIAVBIGo2AkgMBQsgBSACIAMgBhs2AiggBUE8akEDNgIAIAVBxABqQQM2AgAgBUHcAGpBxgA2AgAgBUHUAGpBxgA2AgAgBUG0ysAANgI4IAVBADYCMCAFQS82AkwgBSAFQcgAajYCQCAFIAVBGGo2AlggBSAFQRBqNgJQIAUgBUEoajYCSAwECyAGIANBiMzAABCaAgALIAAgAUEAIAYgBBCHAgALQZ28wABBKyAEEL4BAAsgACABIAYgASAEEIcCAAsgBUEwaiAEENUBAAuICgEBfyMAQTBrIgIkAAJ/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAAtAABBAWsOEQECAwQFBgcICQoLDA0ODxARAAsgAiAALQABOgAIIAJBJGpBAjYCACACQSxqQQE2AgAgAkGYk8AANgIgIAJBADYCGCACQRk2AhQgAiACQRBqNgIoIAIgAkEIajYCECABIAJBGGoQswEMEQsgAiAAKQMINwMIIAJBJGpBAjYCACACQSxqQQE2AgAgAkH8ksAANgIgIAJBADYCGCACQRo2AhQgAiACQRBqNgIoIAIgAkEIajYCECABIAJBGGoQswEMEAsgAiAAKQMINwMIIAJBJGpBAjYCACACQSxqQQE2AgAgAkH8ksAANgIgIAJBADYCGCACQRs2AhQgAiACQRBqNgIoIAIgAkEIajYCECABIAJBGGoQswEMDwsgAiAAKwMIOQMIIAJBJGpBAjYCACACQSxqQQE2AgAgAkHgksAANgIgIAJBADYCGCACQRw2AhQgAiACQRBqNgIoIAIgAkEIajYCECABIAJBGGoQswEMDgsgAiAAKAIENgIIIAJBJGpBAjYCACACQSxqQQE2AgAgAkHAksAANgIgIAJBADYCGCACQR02AhQgAiACQRBqNgIoIAIgAkEIajYCECABIAJBGGoQswEMDQsgAiAAKQIENwMIIAJBJGpBATYCACACQSxqQQE2AgAgAkGsksAANgIgIAJBADYCGCACQR42AhQgAiACQRBqNgIoIAIgAkEIajYCECABIAJBGGoQswEMDAsgAkEkakEBNgIAIAJBLGpBADYCACACQZySwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCwsgAkEkakEBNgIAIAJBLGpBADYCACACQYiSwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCgsgAkEkakEBNgIAIAJBLGpBADYCACACQfSRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCQsgAkEkakEBNgIAIAJBLGpBADYCACACQeCRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCAsgAkEkakEBNgIAIAJBLGpBADYCACACQciRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBwsgAkEkakEBNgIAIAJBLGpBADYCACACQbiRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBgsgAkEkakEBNgIAIAJBLGpBADYCACACQayRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBQsgAkEkakEBNgIAIAJBLGpBADYCACACQaCRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBAsgAkEkakEBNgIAIAJBLGpBADYCACACQYyRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMAwsgAkEkakEBNgIAIAJBLGpBADYCACACQfSQwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMAgsgAkEkakEBNgIAIAJBLGpBADYCACACQdyQwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMAQsgASAAKAIEIABBCGooAgAQgwILIAJBMGokAAvwBwEIfwJAAkAgAEEDakF8cSICIABrIgUgAUsgBUEE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AiQgA0EgagwCCyADQQM2AiggA0Gev8AANgIkIANBAjsBICADQSBqDAELIANBAzYCKCADQaG/wAA2AiQgA0ECOwEgIANBIGoLIQQgA0HcAGogBTYCACADIAQ2AlggAyAGNgJUIAMgAjYCUCAAIANB0ABqED4gA0GAAWokAAvlBAEOfyMAQfAAayICJAAgASgCCCIFQQFxIAEoAgQhCSABKAIAIQogASgCDCEEIAVBAk8EQCAFQQF2IQ0gAkEgaiELA0AgAkEQaiAKIAZBBXQiA2oiAUEgaiIHIAEQaSACQTBqIAcgARBpIAJB0ABqIAAgAkEwahA/IAJByABqIgcgAkHoAGopAwA3AwAgAkFAayIOIAJB4ABqKQMANwMAIAJBOGoiDyACQdgAaikDADcDACACIAIpA1A3AzAgAyAJaiEDQQAhAQNAIAJBMGogAWoiCCAILQAAIAEgBGotAABzOgAAIAFBAWoiAUEQRw0AC0EAIQEDQCABIAJqQUBrIgggCC0AACACQRBqIAFqLQAAczoAACABQQFqIgFBEEcNAAsgAyACKQMwNwAAIANBGGogBykDADcAACADQRBqIA4pAwA3AAAgA0EIaiAPKQMANwAAIARBCGogC0EIaikAADcAACAEIAspAAA3AAAgDSAGQQFqIgZHDQALCwRAIAkgBUH+////AHFBBHQiAWohAyACIAEgCmoiAUEQaiIFIAEQpAEgAkEQaiAFIAEQpAEgAkEwahDjASACQThqIAJBGGoiASkDADcDACACIAIpAxA3AzAgAkHQAGogACACQTBqED8gASACQdgAaikDADcDACACIAIpA1A3AxBBACEBA0AgAkEQaiABaiIAIAAtAAAgASAEai0AAHM6AAAgAUEBaiIBQRBHDQALIAMgAikDEDcAACADQQhqIAJBGGopAwA3AAAgBCACKQMANwAAIARBCGogAkEIaikDADcAAAsgAkHwAGokAAv8BAEIfyMAQRBrIgckAAJ/IAIoAgQiBARAQQEgACACKAIAIAQgASgCDBEBAA0BGgtBACACQQxqKAIAIgNFDQAaIAIoAggiBCADQQxsaiEIIAdBDGohCQNAAkACQAJAAkAgBC8BAEEBaw4CAgEACwJAIAQoAgQiAkHBAE8EQCABQQxqKAIAIQMDQEEBIABB8MTAAEHAACADEQEADQcaIAJB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Qfj///8DcSEGQQAhAwNAIAIoAgAgAkF4aigCACACQXBqKAIAIAJBaGooAgAgAkFgaigCACACQVhqKAIAIAJBUGooAgAgAkFIaigCACADampqampqamohAyACQUBrIQIgBkF4aiIGDQALIAJBRGoLIQIgBARAIAJBBGohAgNAIAIoAgAgA2ohAyACQQhqIQIgBEF/aiIEDQALCyABQRRqKAIADQEgAyEEDAMLQQAhAyABQRRqKAIADQFBASECDAQLIANBD0sNACAHKAIERQ0CCyADIANqIgQgA0kNAQsgBEUNAAJAIARBf0oEQCAEQQEQiAIiAkUNASAEIQMMAwsQygEACyAEQQEQrAIAC0EBIQJBACEDCyAAQQA2AgggACACNgIEIAAgAzYCACAFIAA2AgwgBUEgaiABQRBqKQIANwMAIAVBGGogAUEIaikCADcDACAFIAEpAgA3AxAgBUEMakGYpcAAIAVBEGoQPQRAQYimwABBMyAFQShqQbymwABB5KbAABCYAQALIAVBMGokAAuHBAEDfyMAQaAKayIDJAAgA0EQakEAQYAEEK8CGgJAIAJBgQRJBEAgA0EQaiACIAEgAkHcicAAEOkBIANBEDYC8AkgA0GQBGoQLCADQfgGakHUgMAAKQAANwMAIANBzIDAACkAADcD8AYgA0GAB2ogA0GQBGpB8AIQrgIaIANBkApqIgRCADcAACAEQQhqQgA3AAAgAkFwcSIEQY98akH+e00NASADQZAKaiABIARqIAJBD3EiBRCuAhogA0GQCmogBWpBECAFayIFIAUQrwIaIANB+AlqIANBmApqKQMANwMAIAMgAykDkAo3A/AJIAMgA0EQaiAEaiIENgKMCiADIAJBBHYiAjYCiAogAyABNgKACiADIANBEGo2AoQKIAMgA0HgCWoiBTYCnAogAyACNgKYCiADIAE2ApAKIAMgA0EQajYClAogA0GAB2ogA0GQCmoQbSADIAU2ApgKIAMgBDYClAogAyADQfAJajYCkAogA0GAB2ogA0GQCmoQdyADKAKECiICRQ0BIANBCGogAygCiAogAygCjApBAEdqQQR0IgFBABC3ASADKAIIIQQgACADKAIMIgU2AgQgACAENgIAIAUgAiABEK4CGiAAIAE2AgggA0GgCmokAA8LIAJBgARBzInAABCZAgALQYKJwABB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CyACIAFBsKfAAEEAIAVBCWogA2pBJyADaxAyIAVBMGokAAvYAgIDfwF+IwBBQGoiAiQAIAJBIGogAEEIaigCADYCACACIAApAgA3AxggAkEoaiACQRhqEG4CQAJAIAIoAigEQEEAIQAgAkEANgIQIAJCgICAgBA3AwgMAQsgAkEQaiACQTRqKAIAIgA2AgAgAiACKQIsNwMIIABFBEBBACEADAELIAJBGGogAigCDCAAEF4gAigCGCEDIAJBKGogAigCHCIEIAIoAiAiABAzIAIoAigEQCACKQIsIgVCgICAgPAfg0KAgICAIFINAgsgAiAANgIwIAIgBDYCLCACIAM2AiggASgCBCEDIAEoAgggAEYEfyAEIAMgABDAAUUFQQALIQAgAkEoahD4AQsgAkEIahD4ASABEPgBIAJBQGskACAADwsgAiAANgI4IAIgBDYCNCACIAM2AjAgAiAFNwMoQYCAwABBKyACQShqQbyAwABBrIPAABCYAQALsAIBBH8CQAJAAkACQAJAAkAgAUEDakF8cSIDIAFGDQAgAyABayIDIAIgAyACSRsiBEUNAEEAIQNBASEFA0AgASADai0AAEEKRg0GIAQgA0EBaiIDRw0ACyAEIAJBeGoiA0sNAgwBCyACQXhqIQNBACEECwNAAkAgASAEaiIFKAIAQYqUqNAAcyIGQX9zIAZB//37d2pxQYCBgoR4cQ0AIAVBBGooAgBBipSo0ABzIgVBf3MgBUH//ft3anFBgIGChHhxDQAgBEEIaiIEIANNDQELCyAEIAJLDQELQQAhBSACIARGDQEDQCABIARqLQAAQQpGBEAgBCEDQQEhBQwECyAEQQFqIgQgAkcNAAsMAQsgBCACQYzGwAAQmAIACyACIQMLIAAgAzYCBCAAIAU2AgALtgIBA38jAEGACmsiAyQAIANBEGpBAEGABBCvAhogAkGBBEkEQCADQRBqIAIgASACQZyKwAAQ6QEgA0EQNgKQBCADQZAEahAsIANB+AZqQdSAwAApAAA3AwAgA0HMgMAAKQAANwPwBiADQYAHaiADQZAEakHwAhCuAhogAyACQQ9xBH9BzIDAAAUgAyABNgLwCSADIANB4AlqNgL8CSADIAJBBHYiATYC+AkgAyADQRBqNgL0CSADQYAHaiADQfAJahA4IANBCGogA0EQaiABEJYBIAMo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QaHCwABBASADKAIEKAIMEQEADQMgAygCGCEFDAELQQEhBCADKAIAQZXCwABBAiADKAIEKAIMEQEARQ0BDAILQQEhBCACQQE6ABcgAkH0wcAANgIcIAIgAykCADcDCCACIAJBF2o2AhAgAykCCCEGIAMpAhAhByACIAMtACA6ADggAiADKAIcNgI0IAIgBTYCMCACIAc3AyggAiAGNwMgIAIgAkEIajYCGCABIAJBGGpBvKXAACgCABEAAA0BIAIoAhhBk8LAAEECIAIoAhwoAgwRAQAhBAwBCyABIANBvKXAACgCABEAACEECyAAQQE6AAUgACAEOgAEIAJBQGskAAv9AQEHfyMAQdAAayIDJAAgA0EANgIgIAEgAmsiCEEEdiIBQQIgAUECSRsiBgRAIAMhASAGIQcgAiEFA0AgA0EoaiAFQRBqIgkgBRCkASABQQhqIANBMGopAwA3AgAgASADKQMoNwIAIAMgAygCIEEBaiIENgIgIAFBEGohASAJIQUgB0F/aiIHDQALCyAIQSFPBEAgA0FAayACIAZBBHRqIgFBEGogARCkAQsgBEECTwRAIAAgAykDADcAACAAQRhqIANBGGopAwA3AAAgAEEQaiADQRBqKQMANwAAIABBCGogA0EIaikDADcAACADQdAAaiQADwsgBEECEJ0BAAuSAgEBfyMAQTBrIgMkACADIAI6ABQgAyABNgIQIANBCGpBAEEAELcBIANBADYCICADIAMpAwg3AxggA0EoaiADQRBqEJkBAkACQAJAIAMtAChFBEADQCADLQApRQ0CIAMtACohAiADKAIgIgEgAygCGEYEfyADQRhqIAEQwQEgAygCIAUgAQsgAygCHGogAjoAACADIAMoAiBBAWo2AiAgA0EoaiADQRBqEJkBIAMtAChFDQALCyAAQQA2AgQgACADKAIsNgIAIANBGGoQ+AEgAygCECICQYQBSQ0CDAELIAAgAykDGDcCACAAQQhqIANBIGooAgA2AgAgAygCECICQYMBTQ0BCyACEAALIANBMGokAAudAgEEfyMAQSBrIgIkABAQIQQgASgCACIDIAQQESEBIAJBEGoQ4gEgAigCFCABIAIoAhAiBRshAQJAAkACQAJAAkAgBUUEQCABEAtBAUYNASAAQQI6AAQgAUGEAUkNAwwCCyAAQQM6AAQgACABNgIADAILIAEgAxASIQMgAkEIahDiASACKAIMIAMgAigCCCIFGyEDAkACQCAFRQRAIAIgAzYCHCACQRxqENYBDQIgAEECOgAEIANBhAFJDQEgAxAADAELIABBAzoABCAAIAM2AgALIAFBhAFPDQEMAgsgAEEAOgAEIAAgAzYCACABQYQBTwRAIAEQAAsgBEGDAUsNAgwDCyABEAALIARBgwFNDQELIAQQAAsgAkEgaiQAC4wCAQR/IwBBQGoiAyQAIAFBA24iBEH/////A3EgBEchBiAEQQJ0IQUCQCABIARBA2xrIgRFBEAgBSEBDAELAkACQAJAIAJFBEBBAiEBIARBf2oOAgMCAQsgBiAFQQRqIgEgBUlyIQYMAwsgA0EUakEBNgIAIANBHGpBATYCACADQTRqQQE2AgAgA0E8akEANgIAIANBmJ7AADYCECADQQA2AgggA0EuNgIkIANBtJ7AADYCMCADQeydwAA2AjggA0EANgIoIAMgA0EgajYCGCADIANBKGo2AiAgA0EIakGcn8AAENUBAAtBAyEBCyABIAVyIQELIAAgATYCBCAAIAZBAXM2AgAgA0FAayQAC/0BAgh/An4jAEHQAGsiAiQAIAEoAggiBgRAIAEoAgwhBCABKAIEIQcgASgCACEIA0AgAiAIIAVBBHQiAWoiA0EQaiADEKQBIAEgB2ohA0EAIQEDQCABIAJqIgkgCS0AACABIARqLQAAczoAACABQQFqIgFBEEcNAAsgAkEQahDjASACQRhqIAJBCGoiASkDADcDACACIAIpAwA3AxAgAkEwaiAAIAJBEGoQRSABIAJBOGopAwAiCjcDACACIAIpAzAiCzcDACAEQQhqIAo3AAAgBCALNwAAIAMgCzcAACADQQhqIAo3AAAgBiAFQQFqIgVHDQALCyACQdAAaiQAC/sBAgV/AX4jAEEwayICJAAgASgCBCEEIAJBCGogASgCCCIFENgBIAIgAikDCDcDECACIAJBEGooAgQiA0EBELcBIAIgAzYCICACIAIoAgQiBjYCHCACIAIoAgA2AhggAkEoaiAEIAUgBiADIAIoAhAgAigCFBAiAkACQCADAn8gAi0AKEEERgRAIAIoAiwMAQsgAikDKCIHQv8Bg0IEUg0BIAdCIIinCyIDTwRAIAIgAzYCIAsgACACKQMYNwIEIABBADYCACAAQQxqIAJBIGooAgA2AgAMAQsgAEEBNgIAIAAgBzcCBCACQRhqEPgBCyABEPgBIAJBMGokAAuRAgEEfyMAQTBrIgMkACACKAIEIQQgAigCCCECEAohBiADQSBqIgUgATYCCCAFQQA2AgQgBSAGNgIAAn8CQAJAIAMoAigEQCADQRhqIANBKGooAgA2AgAgAyADKQMgNwMQA0AgAkUNAyACQX9qIQIgAyAENgIgIARBAWohBCADQQhqIANBEGogA0EgahC2ASADKAIIRQ0ACyADKAIMIQIgAygCECIBQYQBSQ0BIAEQAAwBCyADKAIgIQILQQEMAQsgA0EoaiADQRhqKAIANgIAIAMgAykDEDcDICADIANBIGooAgA2AgQgA0EANgIAIAMoAgQhAiADKAIACyEBIAAgAjYCBCAAIAE2AgAgA0EwaiQAC4sCAgN/AX4jAEEwayICJAAgASgCBEUEQCABKAIMIQMgAkEQaiIEQQA2AgAgAkKAgICAEDcDCCACIAJBCGo2AhQgAkEoaiADQRBqKQIANwMAIAJBIGogA0EIaikCADcDACACIAMpAgA3AxggAkEUakHkosAAIAJBGGoQPRogAUEIaiAEKAIANgIAIAEgAikDCDcCAAsgASkCACEFIAFCgICAgBA3AgAgAkEgaiIDIAFBCGoiASgCADYCACABQQA2AgAgAiAFNwMYQQxBBBCIAiIBRQRAQQxBBBCsAgALIAEgAikDGDcCACABQQhqIAMoAgA2AgAgAEHApMAANgIEIAAgATYCACACQTBqJAAL/gEBA38jAEEwayICJAAgAkEQaiABEKYBIAJBCGogAigCFCIDQYAgIANBgCBJG0EAIAIoAhAbQQAQtwEgAkEANgIgIAIgAikDCDcDGCACQShqIAEQlwECQAJAIAItAChFBEADQCACLQApRQ0CIAItACohBCACKAIgIgMgAigCGEYEfyACQRhqIAMQwQEgAigCIAUgAwsgAigCHGogBDoAACACIAIoAiBBAWo2AiAgAkEoaiABEJcBIAItAChFDQALCyAAQQA2AgQgACACKAIsNgIAIAJBGGoQ+AEMAQsgACACKQMYNwIAIABBCGogAkEgaigCADYCAAsgAkEwaiQAC+UBAQF/IwBBEGsiAiQAIAAoAgAgAkEANgIMIAJBDGoCfyABQYABTwRAIAFBgBBP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AXwjAEEgayICJAAgAkEQaiABKAIAEAUgAiACKAIQIAIrAxgQ/QECQCACKAIARQ0AIAIrAwghBSABKAIAEBZFDQAgBUQAAAAAAADgw2YhAUIAQv///////////wACfiAFmUQAAAAAAADgQ2MEQCAFsAwBC0KAgICAgICAgIB/C0KAgICAgICAgIB/IAEbIAVE////////30NkGyAFIAViGyEDQgEhBAsgACADNwMIIAAgBDcDACACQSBqJAALnQEBAX8jAEFAaiICJAAgAkIANwM4IAJBOGogACgCABAcIAJBFGpBAjYCACACQRxqQQE2AgAgAiACKAI8IgA2AjAgAiACKAI4NgIsIAIgADYCKCACQS02AiQgAkGAlcAANgIQIAJBADYCCCACIAJBKGo2AiAgAiACQSBqNgIYIAEgAkEIahCzASACKAIoBEAgAigCLBAoCyACQUBrJAALmwECAX8BfiMAQTBrIgIkACACQQhqIAEQjAECQAJAIAIoAghBAUYEQCACKQMQIgNCf1UNAQsgASACQShqQbyEwAAQQCEBIABBAToAACAAIAE2AgQMAQsgAAJ/IANCgAJaBEAgAkEBOgAYIAIgAzcDICAAIAJBGGogAkEoahCbATYCBEEBDAELIAAgAzwAAUEACzoAAAsgAkEwaiQAC6EBAQF/IwBBIGsiAiQAAkACQCABKAIAEBtFBEAgASgCABAVDQEgAEEANgIEDAILIAJBEGogARC9ASAAQQhqIAJBGGooAgA2AgAgACACKQMQNwIADAELIAIgASgCABAYNgIMIAJBEGogAkEMahC9ASAAQQhqIAJBGGooAgA2AgAgACACKQMQNwIAIAIoAgwiAEGEAUkNACAAEAALIAJBIGokAAuRAQEDfyMAQYABayIDJAAgAC0AACECQQAhAANAIAAgA2pB/wBqQTBBNyACQQ9xIgRBCkkbIARqOgAAIABBf2ohACACIgRBBHYhAiAEQQ9LDQALIABBgAFqIgJBgQFPBEAgAkGAAUHQwsAAEJgCAAsgAUEBQeDCwABBAiAAIANqQYABakEAIABrEDIgA0GAAWokAAuSAQEDfyMAQYABayIDJAAgAC0AACECQQAhAANAIAAgA2pB/wBqQTBB1wAgAkEPcSIEQQpJGyAEajoAACAAQX9qIQAgAiIEQQR2IQIgBEEPSw0ACyAA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QS82AgAgA0GcwMAANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgAzYCKCADIANBBGo2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0HQxsAANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0HwxsAANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0Gkx8AANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakEDNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0H0x8AANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgAzYCKCADIANBBGo2AiAgA0EIaiACENUBAAtpAQF/IwBBMGsiAiQAIAIgATYCKCACIAA2AiQgAiABNgIgIAJBCGogAkEgahDdASACQRBqIAIoAgggAigCDBD+ASACQShqIAJBGGooAgA2AgAgAiACKQMQNwMgIAJBIGoQQiACQTBqJAALaAECfyMAQSBrIgMkACADQQA2AhgCQCABIAJrIgFBECABQRBJIgQbIgFFDQAgA0EIaiACIAEQrgIaIAQNACAAIAMpAwg3AAAgAEEIaiADQRBqKQMANwAAIANBIGokAA8LIAFBEBCdAQALcgEDfyMAQSBrIgIkAAJ/QQEgACABEF8NABogASgCBCEDIAEoAgAhBCACQQA2AhwgAkGwp8AANgIYIAJBATYCFCACQeC/wAA2AhAgAkEANgIIQQEgBCADIAJBCGoQPQ0AGiAAQQRqIAEQXwsgAkEgaiQAC2gBAn8jAEEgayICJAAgAkEYagJ/QQAgASgCCEUNABpBACABKAIEIgMgASgCAGsiASABIANLGwsiATYCACACQQE2AhQgAiABNgIQIAJBCGogAkEQahDUASAAIAIpAwg3AwAgAkEgaiQAC3IBAX8jAEEwayIDJAAgAyACNgIEIAMgATYCACADQRRqQQg2AgAgA0EJNgIMIAMgADYCCCADIAM2AhAgA0ECNgIsIANBAjYCJCADQaSQwAA2AiAgA0EANgIYIAMgA0EIajYCKCADQRhqEKsBIANBMGokAAt8AQN/IAAgABCzAiIAQQgQ/wEgAGsiAhCxAiEAQbDkwAAgASACayIBNgIAQbjkwAAgADYCACAAIAFBAXI2AgRBCEEIEP8BIQJBFEEIEP8BIQNBEEEIEP8BIQQgACABELECIAQgAyACQQhramo2AgRBxOTAAEGAgIABNgIAC3IAIwBBMGsiASQAQdDgwAAtAAAEQCABQRRqQQI2AgAgAUEcakEBNgIAIAFBzKPAADYCECABQQA2AgggAUEvNgIkIAEgADYCLCABIAFBIGo2AhggASABQSxqNgIgIAFBCGpB9KPAABDVAQALIAFBMGokAAthAQJ/IwBBEGsiAiQAIAAoAgAiAEEIaigCACEDIABBBGooAgAhACACIAEQ5QEgAwRAA0AgAiAANgIMIAIgAkEMahBoIABBAWohACADQX9qIgMNAAsLIAIQ4AEgAkEQaiQAC2gBAX8jAEFAaiIBJAAgAUEANgIIIAFCgICAgBA3AwAgAUEQaiABEOQBIAAgAUEQahCxAQRAQeSOwABBNyABQThqQZyPwABB+I/AABCYAQALIAEoAgQgASgCCBAHIAEQ+AEgAUFAayQAC2MBAX8jAEEgayIDJAAgAyABNgIEIAMgADYCACADQRhqIAJBEGopAgA3AwAgA0EQaiACQQhqKQIANwMAIAMgAikCADcDCCADQcTAwAAgA0EEakHEwMAAIANBCGpBgKjAABBNAAteACAAIAEgAiADECQhAAJAAkBBnYPAAC0AAAR/IAAgA0sNASABIAAgAmogAyAAaxC4AQVBAAsgAGogAEkNAQ8LIAAgA0HghsAAEJgCAAtB8IbAAEEqQZyHwAAQnAIAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrI7AACACQQhqED0gAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpB5KLAACACQQhqED0gAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBmKXAACACQQhqED0gAkEgaiQAC1MBAn8jAEEgayICJAAgASgCBCEDIAEoAgAgAkEYaiAAQRBqKQIANwMAIAJBEGogAEEIaikCADcDACACIAApAgA3AwggAyACQQhqED0gAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrMTAACACQQhqED0gAkEgaiQAC1MBAn8jAEEgayICJAAgACgCBCEDIAAoAgAgAkEYaiABQRBqKQIANwMAIAJBEGogAUEIaikCADcDACACIAEpAgA3AwggAyACQQhqED0gAkEgaiQAC1YBAX8jAEEgayICJAAgAiAANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrI7AACACQQhqED0gAkEgaiQAC1YBAX8jAEEgayICJAAgAiAANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrMTAACACQQhqED0gAkEgaiQAC3UBA38jAEEQayIDJAAgASgCBCEFIAEoAggaIANBCGoiBCACKAIALQAAuBABNgIEIARBADYCACADKAIMIQIgAygCCCIERQRAIAEoAgAgBSACEBMgASABKAIEQQFqNgIECyAAIAQ2AgAgACACNgIEIANBEGokAAtcAQF/AkAgAUUEQEEBIQIMAQsgAUEATgRAIAFBf3NBH3YhAwJ/IAJFBEAgASADEIgCDAELIAEgAxDbAQsiAg0BIAEgAxCsAgALEMoBAAsgACACNgIEIAAgATYCAAtWAQJ/AkAgAEEDcEEDc0EDcCIERQRADAELQQAhAANAIAAgAkcEQCAAIAFqQT06AAAgAEEBaiEDQQEhACADIARJDQEMAgsLIAIgAkGsn8AAEJ4BAAsgAwtKAQF/IwBBIGsiAiQAIAIgASgCBCABKAIIEEggAkEYaiACQQhqKAIANgIAIAIgAikDADcDECAAIAJBEGoQeCABEPgBIAJBIGokAAtOAQF/IwBBMGsiAiQAIAJBEGogARA2IAJBKGogAkEYaigCADYCACACIAIpAxA3AyAgAkEIaiACQSBqEN0BIAAgAikDCDcDACACQTBqJAALRgEBfyMAQSBrIgEkACABQRhqIABBEGopAgA3AwAgAUEQaiAAQQhqKQIANwMAIAEgACkCADcDCCABQQhqEKsBIAFBIGokAAtfAQN/IwBBEGsiASQAAkAgACgCDCICBEAgACgCCCIDRQ0BIAEgAjYCCCABIAA2AgQgASADNgIAIAEQ3wEAC0H8osAAQStBsKTAABC+AQALQfyiwABBK0GgpMAAEL4BAAtRAQR/IwBBEGsiAiQAIAJBCGogASgCACIDEBpBABC3ASACKAIIIQQgACACKAIMIgU2AgQgACAENgIAIAEgBRDHASAAIAMQGjYCCCACQRBqJAALUgEBfyMAQSBrIgMkACADQQxqQQE2AgAgA0EUakEANgIAIANBsKfAADYCECADQQA2AgAgAyABNgIcIAMgADYCGCADIANBGGo2AgggAyACENUBAAtTAQF/IwBBIGsiAiQAIAJBDGpBATYCACACQRRqQQE2AgAgAkG8wMAANgIIIAJBADYCACACQcYANgIcIAIgADYCGCACIAJBGGo2AhAgAiABENUBAAtDAQN/AkAgAkUNAANAIAAtAAAiBCABLQAAIgVGBEAgAEEBaiEAIAFBAWohASACQX9qIgINAQwCCwsgBCAFayEDCyADC0sBAX8jAEEQayICJAAgAkEIaiAAIAFBARCLAQJAIAIoAgwiAEGBgICAeEcEQCAARQ0BIAIoAgggABCsAgALIAJBEGokAA8LEMoBAAtLAQF/IwBBEGsiAyQAIANBCGogACABIAIQiwECQCADKAIMIgBBgYCAgHhHBEAgAEUNASADKAIIIAAQrAIACyADQRBqJAAPCxDKAQALNAEBfyMAQRBrIgIkACACIABBCGo2AgggAiAANgIMIAEgAkEIaiACQQxqEIYBIAJBEGokAAtKAQF/IAAoAgAiACgCACAAKAIIIgNrIAJJBH8gACADIAIQwgEgACgCCAUgAwsgACgCBGogASACEK4CGiAAIAAoAgggAmo2AghBAAtHAQF/IAAoAgAiACgCACAAKAIIIgNrIAJJBEAgACADIAIQeyAAKAIIIQMLIAAoAgQgA2ogASACEK4CGiAAIAIgA2o2AghBAAtHAQF/IAAoAgAiACgCACAAKAIIIgNrIAJJBEAgACADIAIQfCAAKAIIIQMLIAAoAgQgA2ogASACEK4CGiAAIAIgA2o2AghBAAtCAQN/EB4iAxAXIgQQGCECIARBhAFPBEAgBBAACyACIAAoAgAgARAZIAJBhAFPBEAgAhAACyADQYQBTwRAIAMQAAsLQwEBfyAAKAIAIAAoAggiA2sgAkkEfyAAIAMgAhDCASAAKAIIBSADCyAAKAIEaiABIAIQrgIaIAAgACgCCCACajYCCAtDAQF/An9BACABKAIAIgIgASgCBE8NABogASACQQFqNgIAIAEoAggoAgAgAhAIIQFBAQshAiAAIAE2AgQgACACNgIAC0oBAX8jAEEgayIAJAAgAEEUakEBNgIAIABBHGpBADYCACAAQfClwAA2AhAgAEHApcAANgIYIABBADYCCCAAQQhqQfilwAAQ1QEAC0YBAn8gASgCBCECIAEoAgAhA0EIQQQQiAIiAUUEQEEIQQQQrAIACyABIAI2AgQgASADNgIAIABB0KTAADYCBCAAIAE2AgALOwIBfwF8IAEoAhhBAXEhAiAAKwMAIQMgASgCEEEBRgRAIAEgAyACIAFBFGooAgAQLg8LIAEgAyACEDcLOwEBfyMAQRBrIgIkACACQQhqIAFBBGogARCSASACKAIMIQEgACACKAIINgIAIAAgATYCBCACQRBqJAALPAEBfyMAQRBrIgIkACACQQhqIAAgARCCASACKAIMIgBBgYCAgHhHBEAgAigCCCAAEKwCAAsgAkEQaiQACzsBAX8jAEEQayICJAAgAkEIaiAAIAEQdiACKAIMIgBBgYCAgHhHBEAgAigCCCAAEKwCAAsgAkEQaiQACzsBAX8gAUEHaiICIAFJBEBB+JnAAEEzQaCbwAAQnAIACyAAIAJBA3Y2AgAgACABQQNqQQJ2QQNsNgIECzkBAX8gAUEQdkAAIQIgAEEANgIIIABBACABQYCAfHEgAkF/RiIBGzYCBCAAQQAgAkEQdCABGzYCAAs5AAJAAn8gAkGAgMQARwRAQQEgACACIAEoAhARAAANARoLIAMNAUEACw8LIAAgAyAEIAEoAgwRAQALNwEBfyMAQRBrIgIkACACIAE2AgwgACACQQxqEI4BIAIoAgwiAEGEAU8EQCAAEAALIAJBEGokAAs0AQF/An9BACABKAIEQQFHDQAaIAFBCGooAgAiAiABKAIARgshASAAIAI2AgQgACABNgIACz8BAX8jAEEgayICJAAgAkEBOgAYIAIgATYCFCACIAA2AhAgAkGswMAANgIMIAJBsKfAADYCCCACQQhqELwBAAswAQF/AkAgACgCACIAEAJBAUcNACAAEAwiABALQQFGIQEgAEGEAUkNACAAEAALIAELMwACQCAAQfz///8HSw0AIABFBEBBBA8LIAAgAEH9////B0lBAnQQiAIiAEUNACAADwsACzYBAX8jAEEQayICJAAgAkEIaiABENABIAIoAgwhASAAIAIoAgg2AgAgACABNgIEIAJBEGokAAslAQF/IwBBEGsiAiQAIAIgADYCDCABIAJBDGoQhAEgAkEQaiQACzIAIAAoAgAhACABEI8CRQRAIAEQkAJFBEAgACABEJsCDwsgACABEJUBDwsgACABEJQBCyYAAkAgACABEE4iAUUNACABELQCEJMCDQAgAUEAIAAQrwIaCyABCzYAIAAoAgAhACABEI8CRQRAIAEQkAJFBEAgADEAAEEBIAEQWw8LIAAgARCQAQ8LIAAgARCRAQsyAQF/IAAgASgCACABKAIIIgJLBH8gASACEM8BIAEoAggFIAILNgIEIAAgASgCBDYCAAsuAQF/IAEoAgAiAgRAIABBATYCCCAAIAI2AgQgACABKAIENgIADwsgAEEANgIICy0BAX8jAEEQayIBJAAgAUEIaiAAQQhqKAIANgIAIAEgACkCADcDACABEJMBAAsyAQF/QQEhASAALQAEBH8gAQUgACgCACIAKAIAQbTCwABBASAAQQRqKAIAKAIMEQEACwsnACAAIAAoAgRBAXEgAXJBAnI2AgQgACABaiIAIAAoAgRBAXI2AgQLOgECf0HU4MAALQAAIQFB1ODAAEEAOgAAQdjgwAAoAgAhAkHY4MAAQQA2AgAgACACNgIEIAAgATYCAAsnACAAQgA3AAAgAEEYakIANwAAIABBEGpCADcAACAAQQhqQgA3AAALNAAgAEEDOgAgIABCgICAgIAENwIYIABBADYCECAAQQA2AgggAEHMjsAANgIEIAAgATYCAAsyAQF/IAEoAgBBosLAAEEBIAEoAgQoAgwRAQAhAiAAQQA6AAUgACACOgAEIAAgATYCAAsgAQF/AkAgAEEEaigCACIBRQ0AIAAoAgBFDQAgARAoCwsmAQF/IwBBEGsiAyQAIAMgATYCDCADIAA2AgggA0EIaiACEL8BAAsjAAJAIAFB/P///wdNBEAgACABQQQgAhCAAiIADQELAAsgAAsfACABIANGBEAgACACIAEQrgIaDwsgASADIAQQogEACyMAIAIgAigCBEF+cTYCBCAAIAFBAXI2AgQgACABaiABNgIACx4AIABFBEAQpQIACyAAIAIgAyAEIAUgASgCEBEKAAsfAQJ+IAApAwAiAiACQj+HIgOFIAN9IAJCf1UgARBbCyABAX8gACgCACAAKAIIIgJrIAFJBEAgACACIAEQwgELCxwAIABFBEAQpQIACyAAIAIgAyAEIAEoAhARBwALHAAgAEUEQBClAgALIAAgAiADIAQgASgCEBEWAAscACAARQRAEKUCAAsgACACIAMgBCABKAIQERcACxwAIABFBEAQpQIACyAAIAIgAyAEIAEoAhARCAALHAAgAEUEQBClAgALIAAgAiADIAQgASgCEBEYAAseACAAIAFBA3I2AgQgACABaiIAIAAoAgRBAXI2AgQLGgAgAEUEQBClAgALIAAgAiADIAEoAhARAwALFAAgACgCAARAIABBBGooAgAQKAsLIgAgAC0AAEUEQCABQcTFwABBBRArDwsgAUHAxcAAQQQQKwsYACAARQRAEKUCAAsgACACIAEoAhARAAALEQAgACgCAARAIAAoAgQQKAsLGQEBfyAAKAIQIgEEfyABBSAAQRRqKAIACwsSAEEAQRkgAEEBdmsgAEEfRhsLFgAgACABQQFyNgIEIAAgAWogATYCAAsUACAAKAIAIgBBhAFPBEAgABAACwsUACAAIAI5AwggACABQQBHrTcDAAsXACAAIAI2AgggACABNgIEIAAgAjYCAAsQACAAIAFqQX9qQQAgAWtxCwwAIAAgASACIAMQLQsLACABBEAgABAoCwsPACAAQQF0IgBBACAAa3ILFgAgACgCACABIAIgACgCBCgCDBEBAAsZACABKAIAQaDZwABBBSABKAIEKAIMEQEACwoAIABBCGoQ+AELFAAgACgCACABIAAoAgQoAgwRAAALDwAgACABIAIgAyAEECUACwgAIAAgARBOCxAAIAAoAgAgACgCBCABEC8LEAAgASAAKAIEIAAoAggQKwsWAEHY4MAAIAA2AgBB1ODAAEEBOgAACxMAIABB0KTAADYCBCAAIAE2AgALDQAgAC0ABEECcUEBdgsQACABIAAoAgAgACgCBBArCw0AIAAtABhBEHFBBHYLDQAgAC0AGEEgcUEFdgsNACAAIAEgAhDIAUEACwoAQQAgAGsgAHELCwAgAC0ABEEDcUULDAAgACABQQNyNgIECw0AIAAoAgAgACgCBGoLDQAgACgCACABEFlBAAsOACAAKAIAGgNADAALAAsMACAAIAEgAhCfAQALDAAgACABIAIQoAEACwwAIAAgASACEKEBAAsNACAANQIAQQEgARBbCwwAIAAgASACEOcBAAsNACAAKAIAIAEgAhBKCw0AIAApAwBBASABEFsLDgAgACgCAC0AACABEGALDgAgACgCACkDACABEEkLCwAgACMAaiQAIwALDgAgAUH4iMAAQQoQgwILBwAgABD4AQsMACAAKAIAIAEQjQELDABBxJTAAEEyEB0ACw4AIAFBoKHAAEEIEIMCCwoAIAAoAgRBeHELCgAgACgCBEEBcQsKACAAKAIMQQFxCwoAIAAoAgxBAXYLCwAgACgCACABEH8LGQAgACABQfTgwAAoAgAiAEEwIAAbEQIAAAsLACAAKAIAIAEQXwsKACAAIAEgAhBaCwsAIAAgASACEIUBCw4AIAFBqJPAAEECEIMCCwcAIAAgAWoLBwAgACABawsHACAAQQhqCwcAIABBeGoLDQBCyLXgz8qG29OJfwsNAELujtXpx4aXxKR/CwwAQtf+oZ2h8ZeHHQsDAAELC/xbCQBBgIDAAAupCmNhbGxlZCBgUmVzdWx0Ojp1bndyYXAoKWAgb24gYW4gYEVycmAgdmFsdWUAAQAAAAQAAAAEAAAAAgAAAAMAAAAUAAAABAAAAAQAAAAxMjM0NTY3ODkwMDk4NzY1/////////////////////////////////////////////////////////z7///8/NDU2Nzg5Ojs8Pf////////8AAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGf///////xobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIz/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8CAABzcmNcbGliLnJzAAAAnwEQAAoAAAAaAAAALQAAAJ8BEAAKAAAALAAAADIAAACfARAACgAAADIAAAAyAAAAnwEQAAoAAAA4AAAAKQAAAJ8BEAAKAAAAPQAAAEAAAACfARAACgAAAEcAAAAyAAAAnwEQAAoAAABNAAAAMgAAAJ8BEAAKAAAAUAAAACEAAACfARAACgAAAFMAAAAjAAAABQAAAAAAAAABAAAABgAAAAUAAAAAAAAAAQAAAAcAAAAQAAAAQzpcVXNlcnNcd2FuZ2xpcDhcLmNhcmdvXHJlZ2lzdHJ5XHNyY1xnaXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjNcZ2VuZXJpYy1hcnJheS0wLjE0LjZcc3JjXGxpYi5ycwAAAGACEABhAAAANQIAAAkAAABpbnZhbGlkIHZhbHVlOiAsIGV4cGVjdGVkIAAA1AIQAA8AAADjAhAACwAAAEM6XFVzZXJzXHdhbmdsaXA4XC5jYXJnb1xyZWdpc3RyeVxzcmNcZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzXGJhc2U2NC0wLjIxLjBcc3JjXGVuY29kZS5ycwAAAAADEABdAAAAUAAAACcAAAB1c2l6ZSBvdmVyZmxvdyB3aGVuIGNhbGN1bGF0aW5nIGI2NCBsZW5ndGgAAAADEABdAAAAVwAAAAoAAAAKAAAAFAAAAAQAAAAEAAAAQzpcVXNlcnNcd2FuZ2xpcDhcLmNhcmdvXHJlZ2lzdHJ5XHNyY1xnaXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjNcYmFzZTY0LTAuMjEuMFxzcmNcZW5naW5lXG1vZC5yc2ludGVnZXIgb3ZlcmZs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XFVzZXJzXHdhbmdsaXA4XC5jYXJnb1xyZWdpc3RyeVxzcmNcZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzXGJhc2U2NC0wLjIxLjBcc3JjXGVuZ2luZVxnZW5lcmFsX3B1cnBvc2VcZGVjb2RlLnJzACsNEAB0AAAAJAAAABIAAABDOlxVc2Vyc1x3YW5nbGlwOFwuY2FyZ29ccmVnaXN0cnlcc3JjXGdpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyM1xiYXNlNjQtMC4yMS4wXHNyY1xlbmdpbmVcZ2VuZXJhbF9wdXJwb3NlXGRlY29kZV9zdWZmaXgucnMAsA0QAHsAAAAdAAAAFAAAAGludGVybmFsIGVycm9yOiBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGU6IAAAPA4QACoAAABJbXBvc3NpYmxlOiBtdXN0IG9ubHkgaGF2ZSAwIHRvIDggaW5wdXQgYnl0ZXMgaW4gbGFzdCBjaHVuaywgd2l0aCBubyBpbnZhbGlkIGxlbmd0aHNwDhAAVAAAALANEAB7AAAAhQAAAA4AAACwDRAAewAAAJoAAAAJAAAAaW50ZXJuYWwgZXJyb3I6IGVudGVyZWQgdW5yZWFjaGFibGUgY29kZTogAADsDhAAKgAAAEltcG9zc2libGUgcmVtYWluZGVyIA8QABQAAABDOlxVc2Vyc1x3YW5nbGlwOFwuY2FyZ29ccmVnaXN0cnlcc3JjXGdpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyM1xiYXNlNjQtMC4yMS4wXHNyY1xlbmNvZGUucnMAAAA8DxAAXQAAAG4AAAAWAAAAPA8QAF0AAACBAAAACQAAAEM6XFVzZXJzXHdhbmdsaXA4XC5jYXJnb1xyZWdpc3RyeVxzcmNcZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzXGFlcy0wLjguMlxzcmNcc29mdFxmaXhzbGljZTMyLnJzAAC8DxAAYgAAAEsAAAAjAAAAvA8QAGIAAABMAAAAIwAAALwPEABiAAAACQEAACQAAAC8DxAAYgAAAB4BAAAoAAAAvA8QAGIAAACJBAAAEgAAALwPEABiAAAAiQQAAD0AAAC8DxAAYgAAABQFAAAiAAAAvA8QAGIAAAAUBQAACQAAAFBhZEVycm9yR2VuZXJpY0Fy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N6sOYTkvGKE5MBxhSPMeoUxANGFQ8GqhUU9vIVKdvKFSAM9hU2XRoVMA2iFUAODhVa7iYVfs5CFZ0OihWSAA7lnwAX9aAHAABwAtAQEBAgECAQFICzAVEAFlBwIGAgIBBCMBHhtbCzoJCQEYBAEJAQMBBSsDPAgqGAEgNwEBAQQIBAEDBwoCHQE6AQEBAgQIAQkBCgIaAQICOQEEAgQCAgMDAR4CAwELAjkBBAUBAgQBFAIWBgEBOgEBAgEECAEHAwoCHgE7AQEBDAEJASgBAwE3AQEDBQMBBAcCCwIdAToBAgECAQMBBQIHAgsCHAI5AgEBAgQIAQkBCgIdAUgBBAECAwEBCAFRAQIHDAhiAQIJCwdJAhsBAQEBATcOAQUBAgULASQJAWYEAQYBAgICGQIEAxAEDQECAgYBDwEAAwADHQIeAh4CQAIBBwgBAgsJAS0DAQF1AiIBdgMEAgkBBgPbAgIBOgEBBwEBAQECCAYKAgEwHzEEMAcBAQUBKAkMAiAEAgIBAzgBAQIDAQEDOggCApgDAQ0BBwQBBgEDAsZAAAHDIQADjQFgIAAGaQIABAEKIAJQAgABAwEEARkCBQGXAhoSDQEmCBkLLgMwAQIEAgInAUMGAgICAgwBCAEvATMBAQMCAgUCAQEqAggB7gECAQQBAAEAEBAQAAIAAeIBlQUAAwECBQQoAwQBpQIABAACUANGCzEEewE2DykBAgIKAzEEAgIHAT0DJAUBCD4BDAI0CQoEAgFfAwIBAQIGAQIBnQEDCBUCOQIBAQEBFgEOBwMFwwgCAwEBFwFRAQIGAQECAQECAQLrAQIEBgIBAhsCVQgCAQECagEBAQIGAQFlAwIEAQUACQEC9QEKAgEBBAGQBAICBAEgCigGAgQIAQkGAgMuDQECAAcBBgEBUhYCBwECAQJ6BgMBAQIBBwEBSAIDAQEBAAILAjQFBQEBAQABBg8ABTsHAAE/BFEBAAIALgIXAAEBAwQFCAgCBx4ElAMANwQyCAEOARYFAQ8ABwERAgcBAgEFZAGgBwABPQQABAAHbQcAYIDwAHsJcHJvZHVjZXJzAghsYW5ndWFnZQEEUnVzdAAMcHJvY2Vzc2VkLWJ5AwVydXN0Yx0xLjY4LjEgKDg0NjBjYTgyMyAyMDIzLTAzLTIwKQZ3YWxydXMGMC4xOS4wDHdhc20tYmluZGdlbhIwLjIuODQgKGNlYThjYzNkMik=", NB = async (g = {}, A) => {
  let I;
  if (A.startsWith("data:")) {
    const t = A.replace(/^data:.*?base64,/, "");
    let B;
    if (typeof Buffer == "function" && typeof Buffer.from == "function")
      B = Buffer.from(t, "base64");
    else if (typeof atob == "function") {
      const e = atob(t);
      B = new Uint8Array(e.length);
      for (let Q = 0; Q < e.length; Q++)
        B[Q] = e.charCodeAt(Q);
    } else
      throw new Error("Cannot decode base64-encoded data URL");
    I = await WebAssembly.instantiate(B, g);
  } else {
    const t = await fetch(A), B = t.headers.get("Content-Type") || "";
    if ("instantiateStreaming" in WebAssembly && B.startsWith("application/wasm"))
      I = await WebAssembly.instantiateStreaming(t, g);
    else {
      const e = await t.arrayBuffer();
      I = await WebAssembly.instantiate(e, g);
    }
  }
  return I.instance.exports;
};
let F;
function FB(g) {
  F = g;
}
const gA = new Array(128).fill(void 0);
gA.push(void 0, null, !0, !1);
function M(g) {
  return gA[g];
}
let YA = gA.length;
function kB(g) {
  g < 132 || (gA[g] = YA, YA = g);
}
function Ug(g) {
  const A = M(g);
  return kB(g), A;
}
function K(g) {
  YA === gA.length && gA.push(gA.length + 1);
  const A = YA;
  return YA = gA[A], gA[A] = g, A;
}
function pg(g) {
  return g == null;
}
let TA = null;
function SB() {
  return (TA === null || TA.byteLength === 0) && (TA = new Float64Array(F.memory.buffer)), TA;
}
let jA = null;
function IA() {
  return (jA === null || jA.byteLength === 0) && (jA = new Int32Array(F.memory.buffer)), jA;
}
let iA = 0, _A = null;
function VA() {
  return (_A === null || _A.byteLength === 0) && (_A = new Uint8Array(F.memory.buffer)), _A;
}
const RB = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
let WA = new RB("utf-8");
const JB = typeof WA.encodeInto == "function" ? function(g, A) {
  return WA.encodeInto(g, A);
} : function(g, A) {
  const I = WA.encode(g);
  return A.set(I), {
    read: g.length,
    written: I.length
  };
};
function fA(g, A, I) {
  if (I === void 0) {
    const C = WA.encode(g), E = A(C.length);
    return VA().subarray(E, E + C.length).set(C), iA = C.length, E;
  }
  let t = g.length, B = A(t);
  const e = VA();
  let Q = 0;
  for (; Q < t; Q++) {
    const C = g.charCodeAt(Q);
    if (C > 127)
      break;
    e[B + Q] = C;
  }
  if (Q !== t) {
    Q !== 0 && (g = g.slice(Q)), B = I(B, t, t = Q + g.length * 3);
    const C = VA().subarray(B + Q, B + t), E = JB(g, C);
    Q += E.written;
  }
  return iA = Q, B;
}
const mB = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
let LI = new mB("utf-8", { ignoreBOM: !0, fatal: !0 });
LI.decode();
function ig(g, A) {
  return LI.decode(VA().subarray(g, g + A));
}
function Gg(g) {
  const A = typeof g;
  if (A == "number" || A == "boolean" || g == null)
    return `${g}`;
  if (A == "string")
    return `"${g}"`;
  if (A == "symbol") {
    const B = g.description;
    return B == null ? "Symbol" : `Symbol(${B})`;
  }
  if (A == "function") {
    const B = g.name;
    return typeof B == "string" && B.length > 0 ? `Function(${B})` : "Function";
  }
  if (Array.isArray(g)) {
    const B = g.length;
    let e = "[";
    B > 0 && (e += Gg(g[0]));
    for (let Q = 1; Q < B; Q++)
      e += ", " + Gg(g[Q]);
    return e += "]", e;
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
function YB(g) {
  try {
    const t = F.__wbindgen_add_to_stack_pointer(-16), B = fA(g, F.__wbindgen_malloc, F.__wbindgen_realloc), e = iA;
    F.secretkey(t, B, e);
    var A = IA()[t / 4 + 0], I = IA()[t / 4 + 1];
    return ig(A, I);
  } finally {
    F.__wbindgen_add_to_stack_pointer(16), F.__wbindgen_free(A, I);
  }
}
function UB(g, A) {
  const I = fA(g, F.__wbindgen_malloc, F.__wbindgen_realloc), t = iA, B = fA(A, F.__wbindgen_malloc, F.__wbindgen_realloc), e = iA;
  return F.validate(I, t, B, e) !== 0;
}
function LB(g) {
  const A = fA(g, F.__wbindgen_malloc, F.__wbindgen_realloc), I = iA, t = F.encrypt(A, I);
  return Ug(t);
}
function HB(g) {
  try {
    const t = F.__wbindgen_add_to_stack_pointer(-16);
    F.decrypt(t, K(g));
    var A = IA()[t / 4 + 0], I = IA()[t / 4 + 1];
    return ig(A, I);
  } finally {
    F.__wbindgen_add_to_stack_pointer(16), F.__wbindgen_free(A, I);
  }
}
function Lg(g, A) {
  try {
    return g.apply(this, A);
  } catch (I) {
    F.__wbindgen_exn_store(K(I));
  }
}
function bB(g) {
  Ug(g);
}
function xB(g) {
  return K(g);
}
function vB(g) {
  const A = M(g);
  return typeof A == "object" && A !== null;
}
function qB(g, A) {
  return M(g) == M(A);
}
function KB(g) {
  const A = M(g);
  return typeof A == "boolean" ? A ? 1 : 0 : 2;
}
function OB(g, A) {
  const I = M(A), t = typeof I == "number" ? I : void 0;
  SB()[g / 8 + 1] = pg(t) ? 0 : t, IA()[g / 4 + 0] = !pg(t);
}
function zB(g, A) {
  const I = M(A), t = typeof I == "string" ? I : void 0;
  var B = pg(t) ? 0 : fA(t, F.__wbindgen_malloc, F.__wbindgen_realloc), e = iA;
  IA()[g / 4 + 1] = e, IA()[g / 4 + 0] = B;
}
function TB(g, A) {
  const I = new Error(ig(g, A));
  return K(I);
}
function jB(g, A) {
  const I = M(g)[A >>> 0];
  return K(I);
}
function _B(g) {
  return M(g).length;
}
function XB() {
  const g = new Array();
  return K(g);
}
function ZB(g) {
  return typeof M(g) == "function";
}
function PB(g) {
  const A = M(g).next;
  return K(A);
}
function VB() {
  return Lg(function(g) {
    const A = M(g).next();
    return K(A);
  }, arguments);
}
function WB(g) {
  return M(g).done;
}
function $B(g) {
  const A = M(g).value;
  return K(A);
}
function Ae() {
  return K(Symbol.iterator);
}
function ge() {
  return Lg(function(g, A) {
    const I = Reflect.get(M(g), M(A));
    return K(I);
  }, arguments);
}
function Ie() {
  return Lg(function(g, A) {
    const I = M(g).call(M(A));
    return K(I);
  }, arguments);
}
function te(g, A, I) {
  M(g)[A >>> 0] = Ug(I);
}
function Be(g) {
  return Array.isArray(M(g));
}
function ee(g) {
  let A;
  try {
    A = M(g) instanceof ArrayBuffer;
  } catch {
    A = !1;
  }
  return A;
}
function Qe(g) {
  return Number.isSafeInteger(M(g));
}
function Ce(g) {
  const A = M(g).buffer;
  return K(A);
}
function ie(g) {
  const A = new Uint8Array(M(g));
  return K(A);
}
function Ee(g, A, I) {
  M(g).set(M(A), I >>> 0);
}
function se(g) {
  return M(g).length;
}
function ne(g) {
  let A;
  try {
    A = M(g) instanceof Uint8Array;
  } catch {
    A = !1;
  }
  return A;
}
function oe(g, A) {
  const I = Gg(M(A)), t = fA(I, F.__wbindgen_malloc, F.__wbindgen_realloc), B = iA;
  IA()[g / 4 + 1] = B, IA()[g / 4 + 0] = t;
}
function ae(g, A) {
  throw new Error(ig(g, A));
}
function re() {
  const g = F.memory;
  return K(g);
}
URL = globalThis.URL;
const V = await NB({ "./rich_wasm_bg.js": { __wbindgen_object_drop_ref: bB, __wbindgen_number_new: xB, __wbindgen_is_object: vB, __wbindgen_jsval_loose_eq: qB, __wbindgen_boolean_get: KB, __wbindgen_number_get: OB, __wbindgen_string_get: zB, __wbindgen_error_new: TB, __wbg_get_27fe3dac1c4d0224: jB, __wbg_length_e498fbc24f9c1d4f: _B, __wbg_new_b525de17f44a8943: XB, __wbindgen_is_function: ZB, __wbg_next_b7d530c04fd8b217: PB, __wbg_next_88560ec06a094dea: VB, __wbg_done_1ebec03bbd919843: WB, __wbg_value_6ac8da5cc5b3efda: $B, __wbg_iterator_55f114446221aa5a: Ae, __wbg_get_baf4855f9a986186: ge, __wbg_call_95d1ea488d03e4e8: Ie, __wbg_set_17224bc548dd1d7b: te, __wbg_isArray_39d28997bf6b96b4: Be, __wbg_instanceof_ArrayBuffer_a69f02ee4c4f5065: ee, __wbg_isSafeInteger_8c4789029e885159: Qe, __wbg_buffer_cf65c07de34b9a08: Ce, __wbg_new_537b7341ce90bb31: ie, __wbg_set_17499e8aa4003ebd: Ee, __wbg_length_27a2afe8ab42b09f: se, __wbg_instanceof_Uint8Array_01cebe79ca606cca: ne, __wbindgen_debug_string: oe, __wbindgen_throw: ae, __wbindgen_memory: re } }, MB), ce = V.memory, he = V.secretkey, le = V.validate, De = V.encrypt, ue = V.decrypt, fe = V.__wbindgen_malloc, we = V.__wbindgen_realloc, de = V.__wbindgen_add_to_stack_pointer, ye = V.__wbindgen_free, pe = V.__wbindgen_exn_store, Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
FB(Ge);
const Me = function(g) {
  return new Promise((A, I) => {
    if (g instanceof Blob) {
      var t = new FileReader();
      t.onload = function(B) {
        A(B.target.result);
      }, t.onerror = (B) => {
        I(B);
      }, t.readAsArrayBuffer(g);
    } else
      I("不是二进制文件");
  });
}, HI = function(g) {
  let A = typeof g == "string" ? g : JSON.stringify(g), I = LB(A);
  return new Blob([new Uint8Array(I).buffer]);
}, Hg = async function(g) {
  let A = null;
  if (typeof g == "string")
    A = g;
  else if (g instanceof Blob) {
    let I = await Me(g), t = Array.prototype.slice.call(new Uint8Array(I));
    A = HB(t);
  } else if (g && typeof g == "object" && typeof g != "function" && !Array.isArray(g))
    return g;
  try {
    return JSON.parse(A);
  } catch {
    Promise.reject("数据格式无效");
  }
}, Ne = function(g) {
  return typeof g == "string" && g.length > 2 && g.length < 16 ? YB(g) : null;
}, Fe = function(g, A) {
  return typeof g == "string" && typeof A == "string" ? UB(g, A) : !1;
}, ke = async function(g, A) {
  if (!g)
    return null;
  let I = "A_" + nanoid(10), t = await Hg(g);
  return t && (t.id = I), A && Object.assign(t, A), { id: I, data: t };
}, Se = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  copyData: ke,
  decrypt: Hg,
  encrypt: HI,
  secretkey: Ne,
  validateKey: Fe
}, Symbol.toStringTag, { value: "Module" }));
var Re = aA, Je = Re.isFinite;
function me(g) {
  return typeof g == "number" && Je(g);
}
var Ye = me;
function Ue(g, A = {}) {
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
  }, A), t = /^(?!https?:\/\/)/.test(g.url) ? I.host + g.url : g.url, B = localStorage.getItem(I.token) ? { Authorization: localStorage.getItem(I.token) } : {}, e = g.customize || {};
  (!I.headers || typeof I.headers == "string") && (I.headers = {});
  let Q = Object.assign({
    method: g.method || I.method,
    mode: g.mode || I.mode,
    signal: g.signal,
    headers: new Headers(Object.assign(I.headers, B, g.headers))
  }, e);
  return Q.method.toUpperCase() == "POST" ? Q.body = Q.headers.get("Content-Type") == "application/json" ? JSON.stringify(g.data) : g.data : t = /\?/.test(t) ? t + "&" + yg(g.data) : t + "?" + yg(g.data), new Promise((C, E) => {
    fetch(t, Q).then((s) => I.responseType ? s[I.responseType]() : s.json(), E).then(C);
  });
}
const lA = {}, Mg = [];
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
    }).then((I) => {
      this.data = I, this.status = "success", this.isloading = !1, this.err = null, this.emit("success", I), A && A(this);
    }, (I) => {
      this.status = "success", this.isloading = !1, this.err = I, this.emit("error", I), A && A(this);
    }));
  }
  destroy() {
    this.controller && this.controller.abort(), this.controller = null, this.signal = null, this.isloading = null, this.status = null, this.options = null, this.data = null, this.err = null, lA[this.id] && (X(Mg, "id", this.id), delete lA[this.id]);
  }
}
function He(g) {
  let A = g.url || "", I = g.body || {}, t = (A + JSON.stringify(I)).split("").sort().join(""), B = Mg.find((Q) => Q.test == t);
  if (B && lA[B.id])
    return lA[B.id];
  let e = new Le(g);
  return Mg.push({
    id: e.id,
    test: t
  }), lA[e.id] = e, lA[e.id];
}
var be = Array.isArray, vA = be, xe = bA, ve = dA, qe = "[object Symbol]";
function Ke(g) {
  return typeof g == "symbol" || ve(g) && xe(g) == qe;
}
var bg = Ke, Oe = vA, ze = bg, Te = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, je = /^\w*$/;
function _e(g, A) {
  if (Oe(g))
    return !1;
  var I = typeof g;
  return I == "number" || I == "symbol" || I == "boolean" || g == null || ze(g) ? !0 : je.test(g) || !Te.test(g) || A != null && g in Object(A);
}
var Xe = _e;
function Ze(g) {
  var A = typeof g;
  return g != null && (A == "object" || A == "function");
}
var rA = Ze, Pe = bA, Ve = rA, We = "[object AsyncFunction]", $e = "[object Function]", AQ = "[object GeneratorFunction]", gQ = "[object Proxy]";
function IQ(g) {
  if (!Ve(g))
    return !1;
  var A = Pe(g);
  return A == $e || A == AQ || A == We || A == gQ;
}
var xg = IQ, tQ = aA, BQ = tQ["__core-js_shared__"], eQ = BQ, lg = eQ, AI = function() {
  var g = /[^.]+$/.exec(lg && lg.keys && lg.keys.IE_PROTO || "");
  return g ? "Symbol(src)_1." + g : "";
}();
function QQ(g) {
  return !!AI && AI in g;
}
var CQ = QQ, iQ = Function.prototype, EQ = iQ.toString;
function sQ(g) {
  if (g != null) {
    try {
      return EQ.call(g);
    } catch {
    }
    try {
      return g + "";
    } catch {
    }
  }
  return "";
}
var nQ = sQ, oQ = xg, aQ = CQ, rQ = rA, cQ = nQ, hQ = /[\\^$.*+?()[\]{}|]/g, lQ = /^\[object .+?Constructor\]$/, DQ = Function.prototype, uQ = Object.prototype, fQ = DQ.toString, wQ = uQ.hasOwnProperty, dQ = RegExp(
  "^" + fQ.call(wQ).replace(hQ, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function yQ(g) {
  if (!rQ(g) || aQ(g))
    return !1;
  var A = oQ(g) ? dQ : lQ;
  return A.test(cQ(g));
}
var pQ = yQ;
function GQ(g, A) {
  return g?.[A];
}
var MQ = GQ, NQ = pQ, FQ = MQ;
function kQ(g, A) {
  var I = FQ(g, A);
  return NQ(I) ? I : void 0;
}
var vg = kQ, SQ = vg, RQ = SQ(Object, "create"), Eg = RQ, gI = Eg;
function JQ() {
  this.__data__ = gI ? gI(null) : {}, this.size = 0;
}
var mQ = JQ;
function YQ(g) {
  var A = this.has(g) && delete this.__data__[g];
  return this.size -= A ? 1 : 0, A;
}
var UQ = YQ, LQ = Eg, HQ = "__lodash_hash_undefined__", bQ = Object.prototype, xQ = bQ.hasOwnProperty;
function vQ(g) {
  var A = this.__data__;
  if (LQ) {
    var I = A[g];
    return I === HQ ? void 0 : I;
  }
  return xQ.call(A, g) ? A[g] : void 0;
}
var qQ = vQ, KQ = Eg, OQ = Object.prototype, zQ = OQ.hasOwnProperty;
function TQ(g) {
  var A = this.__data__;
  return KQ ? A[g] !== void 0 : zQ.call(A, g);
}
var jQ = TQ, _Q = Eg, XQ = "__lodash_hash_undefined__";
function ZQ(g, A) {
  var I = this.__data__;
  return this.size += this.has(g) ? 0 : 1, I[g] = _Q && A === void 0 ? XQ : A, this;
}
var PQ = ZQ, VQ = mQ, WQ = UQ, $Q = qQ, AC = jQ, gC = PQ;
function yA(g) {
  var A = -1, I = g == null ? 0 : g.length;
  for (this.clear(); ++A < I; ) {
    var t = g[A];
    this.set(t[0], t[1]);
  }
}
yA.prototype.clear = VQ;
yA.prototype.delete = WQ;
yA.prototype.get = $Q;
yA.prototype.has = AC;
yA.prototype.set = gC;
var IC = yA;
function tC() {
  this.__data__ = [], this.size = 0;
}
var BC = tC;
function eC(g, A) {
  return g === A || g !== g && A !== A;
}
var sg = eC, QC = sg;
function CC(g, A) {
  for (var I = g.length; I--; )
    if (QC(g[I][0], A))
      return I;
  return -1;
}
var ng = CC, iC = ng, EC = Array.prototype, sC = EC.splice;
function nC(g) {
  var A = this.__data__, I = iC(A, g);
  if (I < 0)
    return !1;
  var t = A.length - 1;
  return I == t ? A.pop() : sC.call(A, I, 1), --this.size, !0;
}
var oC = nC, aC = ng;
function rC(g) {
  var A = this.__data__, I = aC(A, g);
  return I < 0 ? void 0 : A[I][1];
}
var cC = rC, hC = ng;
function lC(g) {
  return hC(this.__data__, g) > -1;
}
var DC = lC, uC = ng;
function fC(g, A) {
  var I = this.__data__, t = uC(I, g);
  return t < 0 ? (++this.size, I.push([g, A])) : I[t][1] = A, this;
}
var wC = fC, dC = BC, yC = oC, pC = cC, GC = DC, MC = wC;
function pA(g) {
  var A = -1, I = g == null ? 0 : g.length;
  for (this.clear(); ++A < I; ) {
    var t = g[A];
    this.set(t[0], t[1]);
  }
}
pA.prototype.clear = dC;
pA.prototype.delete = yC;
pA.prototype.get = pC;
pA.prototype.has = GC;
pA.prototype.set = MC;
var og = pA, NC = vg, FC = aA, kC = NC(FC, "Map"), bI = kC, II = IC, SC = og, RC = bI;
function JC() {
  this.size = 0, this.__data__ = {
    hash: new II(),
    map: new (RC || SC)(),
    string: new II()
  };
}
var mC = JC;
function YC(g) {
  var A = typeof g;
  return A == "string" || A == "number" || A == "symbol" || A == "boolean" ? g !== "__proto__" : g === null;
}
var UC = YC, LC = UC;
function HC(g, A) {
  var I = g.__data__;
  return LC(A) ? I[typeof A == "string" ? "string" : "hash"] : I.map;
}
var ag = HC, bC = ag;
function xC(g) {
  var A = bC(this, g).delete(g);
  return this.size -= A ? 1 : 0, A;
}
var vC = xC, qC = ag;
function KC(g) {
  return qC(this, g).get(g);
}
var OC = KC, zC = ag;
function TC(g) {
  return zC(this, g).has(g);
}
var jC = TC, _C = ag;
function XC(g, A) {
  var I = _C(this, g), t = I.size;
  return I.set(g, A), this.size += I.size == t ? 0 : 1, this;
}
var ZC = XC, PC = mC, VC = vC, WC = OC, $C = jC, Ai = ZC;
function GA(g) {
  var A = -1, I = g == null ? 0 : g.length;
  for (this.clear(); ++A < I; ) {
    var t = g[A];
    this.set(t[0], t[1]);
  }
}
GA.prototype.clear = PC;
GA.prototype.delete = VC;
GA.prototype.get = WC;
GA.prototype.has = $C;
GA.prototype.set = Ai;
var xI = GA, vI = xI, gi = "Expected a function";
function qg(g, A) {
  if (typeof g != "function" || A != null && typeof A != "function")
    throw new TypeError(gi);
  var I = function() {
    var t = arguments, B = A ? A.apply(this, t) : t[0], e = I.cache;
    if (e.has(B))
      return e.get(B);
    var Q = g.apply(this, t);
    return I.cache = e.set(B, Q) || e, Q;
  };
  return I.cache = new (qg.Cache || vI)(), I;
}
qg.Cache = vI;
var Ii = qg, ti = Ii, Bi = 500;
function ei(g) {
  var A = ti(g, function(t) {
    return I.size === Bi && I.clear(), t;
  }), I = A.cache;
  return A;
}
var Qi = ei, Ci = Qi, ii = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ei = /\\(\\)?/g, si = Ci(function(g) {
  var A = [];
  return g.charCodeAt(0) === 46 && A.push(""), g.replace(ii, function(I, t, B, e) {
    A.push(B ? e.replace(Ei, "$1") : t || I);
  }), A;
}), ni = si;
function oi(g, A) {
  for (var I = -1, t = g == null ? 0 : g.length, B = Array(t); ++I < t; )
    B[I] = A(g[I], I, g);
  return B;
}
var ai = oi, tI = Jg, ri = ai, ci = vA, hi = bg, li = 1 / 0, BI = tI ? tI.prototype : void 0, eI = BI ? BI.toString : void 0;
function qI(g) {
  if (typeof g == "string")
    return g;
  if (ci(g))
    return ri(g, qI) + "";
  if (hi(g))
    return eI ? eI.call(g) : "";
  var A = g + "";
  return A == "0" && 1 / g == -li ? "-0" : A;
}
var Di = qI, ui = Di;
function fi(g) {
  return g == null ? "" : ui(g);
}
var wi = fi, di = vA, yi = Xe, pi = ni, Gi = wi;
function Mi(g, A) {
  return di(g) ? g : yi(g, A) ? [g] : pi(Gi(g));
}
var Ni = Mi, Fi = bg, ki = 1 / 0;
function Si(g) {
  if (typeof g == "string" || Fi(g))
    return g;
  var A = g + "";
  return A == "0" && 1 / g == -ki ? "-0" : A;
}
var Ri = Si, Ji = Ni, mi = Ri;
function Yi(g, A) {
  A = Ji(A, g);
  for (var I = 0, t = A.length; g != null && I < t; )
    g = g[mi(A[I++])];
  return I && I == t ? g : void 0;
}
var Ui = Yi, Li = Ui;
function Hi(g, A, I) {
  var t = g == null ? void 0 : Li(g, A);
  return t === void 0 ? I : t;
}
var gg = Hi;
const Ng = function(g) {
  if (!this.appData)
    return console.warn("缺少数据源"), null;
  let A = {};
  return g && Array.isArray(g) && g.forEach((I) => {
    if (CA(I))
      if (typeof I.value == "string" && I.key) {
        let t = this.appData.getDataSource(I.value);
        t ? pI(t) ? A[I.key] = I.path ? gg(t.data, I.path) : t.data : A[I.key] = I.path ? gg(t, I.path) : t : A[I.key] = I.value;
      } else
        I.key && (A[I.key] = I.value);
  }), A;
};
class bi extends DA {
  constructor(A, I = {}) {
    super();
    const { id: t, url: B, extractRule: e, body: Q, method: C, itval: E } = A;
    this.appData = I, this.AppSetup = I.AppSetup, this.AppInfo = I.info, this.id = t || "RD_" + z(10), this.url = B, this.body = Q, this.method = C, this.data = U({}), this.sourceData = null, this.loading = GI(!1), this.isloading = !1, this.itval = E || 0, this.it = null, this.status = "wait", this.err = null, this.extractRule = e ? U(e) : U({});
    let s = He({ url: B, body: Ng.call(this, Q), method: C }, this.AppInfo.network);
    s.on("request", () => {
      this.loading.value = !0, this.isloading = !0, this.status = "request";
    }), s.on("success", (n) => {
      this.sourceData = n, this.status = "success", this.loading.value = !1, this.isloading = !1, this.err = null, this.fillData(n), this.emit("success", this);
    }), s.on("error", (n) => {
      this.status = "success", this.loading.value = !1, this.isloading = !1, this.err = n, this.emit("error", n);
    }), this.req = s, this.unwatch = null, this.watchRule();
  }
  watchRule() {
    this.stopWatch(), this.watch = MI(this.extractRule, () => {
      this.sourceData && this.fillData(this.sourceData);
    }), this.sourceData && this.fillData(this.sourceData);
  }
  stopWatch() {
    this.unwatch && (this.unwatch(), this.unwatch = null);
  }
  setData(A = {}) {
    A.url && (this.url = A.url, this.req.options.url = A.url), A.method && (this.method = A.method, this.req.options.method = A.method), A.body && (this.body = A.body, this.req.options.body = Ng.call(this.appData, A.body)), Ye(A.itval) && (this.itval = A.itval);
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
    this.clearData(), this.extractRule && (this.extractRule.x || this.extractRule.name || this.extractRule instanceof Array) ? Object.assign(this.data, { data: mg(A, this.extractRule) }) : Object.assign(this.data, { data: A });
  }
  /**
   * 销毁
   */
  destroy() {
    this.req.destroy(), this.clearData(), this.stopWatch(), this.stopInterval(), this.extractRule = null;
  }
}
const S = {}, LA = U([]), KI = function() {
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
}, OI = function(g) {
  if (g.id && S[g.id])
    return S[g.id];
  {
    let A = new bi(g, this);
    return LA.push(A), S[A.id] = A, A;
  }
}, Dg = function(g) {
  return X(LA, "id", g), S[g].destroy(), delete S[g], g;
}, Ig = function(g) {
  if (g) {
    if (S[g])
      return Dg(g);
    for (let A in S)
      S[A].url == g && Dg(A);
    return g;
  } else
    return Object.keys(S).forEach((I) => {
      Dg(I);
    }), LA.splice(0, LA.length), !0;
}, tg = function(g, A = !1) {
  if (S[g])
    return S[g];
  if (A) {
    for (let I in S)
      if (S[I].url == g)
        return S[I];
  }
  return null;
}, vi = function() {
  Ig();
}, zI = function(g = !1, A = "", I) {
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
}, qi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: OI,
  clearRemote: vi,
  createExtractRule: KI,
  del: Ig,
  getList: xi,
  getRemote: tg,
  remotes: S,
  requestData: zI
}, Symbol.toStringTag, { value: "Module" })), Ki = function(g) {
  return nt(Object.assign({
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
  }, g));
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
}, zi = function(g) {
  return Object.assign({
    id: "AC_" + z(10),
    action: "",
    target: "app",
    value: null,
    description: ""
  }, g);
}, QI = function(g) {
  const { id: A, value: I = "", name: t = "", type: B = "source", uptime: e } = g;
  return {
    id: A || "GD_" + z(10),
    name: t,
    type: B,
    value: I instanceof Object ? U(I) : GI(I),
    uptime: e || (/* @__PURE__ */ new Date()).getTime()
  };
}, Ti = function(g) {
  return U(Object.assign({
    id: "PD_" + z(10),
    name: "",
    title: "",
    url: "",
    password: "",
    version: "",
    uptime: (/* @__PURE__ */ new Date()).getTime()
  }, g));
};
function ji(g) {
  const A = g.getAppData(), I = g.mData, t = g.gData, B = g.aData, e = g.rData, Q = g.pData;
  let C = b(I.getModuleList());
  C.forEach((s) => {
    s.components && Array.isArray(s.components) && (s.components = s.components.map((n) => {
      if (n.type == "group") {
        let o = I.getGroup(n.id);
        return o.components && (o.components = o.components.map((r) => {
          let y = I.getSprite(r.id);
          return y.selected = !1, y;
        })), o.selected = !1, o;
      } else {
        let o = I.getSprite(n.id);
        return o.selected = !1, o;
      }
    }));
  });
  let E = b(t.getGDataList());
  return E.forEach((s, n) => {
    s.type == "temp" && E.splice(n, 1);
  }), b({
    ...A.info,
    globalData: E,
    modules: C,
    actions: B.getActionList(),
    plugins: Q.getPluginList(),
    remote: e.getRemoteList()
  });
}
let _i = 1, Xi = 1, CI = 1;
const ug = function(g = {}) {
  let A = {
    type: "content",
    name: "vx-module",
    title: "页面" + _i++,
    x: 0,
    y: 0,
    components: []
  };
  return Object.assign(A, g), A.id || (A.id = "mdu_" + z(10)), A;
}, fg = function(g = {}) {
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
  return Object.assign(A, g), A.id || (A.id = "group_" + z(10)), A;
}, iI = function(g, A, I = {}) {
  let t = g.getDefaultData(A), B = t.title, e = U({
    id: null,
    gpid: null,
    mid: null,
    name: t.name,
    type: t.type,
    title: B ? B + CI++ : "元件 " + CI++,
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
    lock: t.lock || !1,
    background: t.background || {},
    border: t.border || {},
    shadow: t.shadow || {},
    anim: t.anim || {},
    options: t.options || {},
    events: t.events || [],
    data: t.data || ""
  });
  return Object.assign(e, I), e.id || (e.id = "sprite_" + z(10)), e;
}, TI = function(g, A = {}) {
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
    let I = ug(A);
    return Array.isArray(I.components) || (I.components = []), this.modules[I.id] = I, this.mData.elements[I.id] = I, I;
  }
  // 添加元件（元件、组合的基本属性）
  addElement(A, I = "default") {
    I && A && typeof A != "string" && (this.modules[I] && this.modules[I].components ? this.modules[I].components.push(A) : console.warn("模块添加元件数据失败"));
  }
  // 删除元件（只是在模块内删除，并为删除数据源）
  delElement(A, I = "default") {
    return I && A ? this.modules[I] && this.modules[I].components ? X(this.modules[I].components, "id", A) : (console.warn("模块删除元件数据失败"), !1) : (console.warn("mid && id 无效"), !1);
  }
  // 删除模块数据
  delModule(A, I = !1) {
    if (I && this.modules[A]) {
      let t = this.modules[A].components;
      return Array.isArray(t) && t.map((e) => e.id).forEach((e) => {
        this.mData.delElement(e, !0);
      }), delete this.modules[A], delete this.mData.elements[A], A;
    } else
      return this.modules[A] ? (delete this.modules[A], delete this.mData.elements[A], A) : null;
  }
  // 配置模块
  setModule = function(A, I) {
    let t = this.mData.elements;
    if (A)
      return this.modules[A] || (this.modules[A] = ug(Object.assign({ id: A }, I)), t[A] = modules[A]), this.modules[A].components || (modules[A].components = []), this.modules[A];
    if (I) {
      let B = ug(I);
      return this.modules[B.id] = B, t[B.id] = this.modules[B.id], this.modules[B.id];
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
  getModuleList(A, I = "type") {
    if (A) {
      let t = Object.values(this.modules);
      return typeof A == "string" ? t.filter((B) => B[I] == A) : typeof A == "function" ? t.filter((B) => A(B)) : t;
    } else
      return Object.values(this.modules);
  }
  // 返回模块中的所有元素
  getMyElements(A = "default", I = !1) {
    if (this.modules[A] && this.modules[A].components) {
      let t = this.modules[A].components;
      return I ? t.map((B) => this.mData.getElement(B.id)) : t;
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
class Pi {
  // 数据管理
  mData = null;
  // 编组集合
  groups = {};
  constructor(A) {
    this.mData = A;
  }
  // 添加一个组合
  newGroup(A, I = "default") {
    if (A && typeof A == "object" && A.id && this.groups[A.id])
      return console.warn("组合" + A.id + "已存在"), null;
    let t = fg(Object.assign({ mid: I }, A));
    return this.groups[t.id] = t, this.mData.elements[t.id] = t, t.zIndex || (t.zIndex = this.mData.getMaxZIndex(I) + 1), this.mData.appendElement(TI.call(this.mData, t), t.mid), this.mData.watchSimples(t), t;
  }
  // 删除组合，是否删除内部数据源
  delGroup(A, I = !1) {
    if (Array.isArray(A))
      return A.forEach((t) => {
        this.delGroup(t, I);
      }), A;
    if (typeof A == "string") {
      let t = this.mData.modules, B = this.mData.unwatchs;
      if (this.groups[A]) {
        if (I) {
          let e = this.groups[A].components;
          Array.isArray(e) && e.length > 0 && this.mData.delSprite(e.map((Q) => Q.id));
        }
        return t.delElement(this.groups[A].id, this.groups[A].mid), delete this.groups[A], delete this.mData.elements[A], B[A] && typeof B[A] == "function" && B[A](), A;
      }
    }
    return !1;
  }
  // 项组合添加元件（元件、组合的基本属性）
  addElement(A, I) {
    I && A && typeof A != "string" && (this.groups[I] && this.groups[I].components ? this.groups[I].components.push(A) : console.warn("模块添加元件数据失败"));
  }
  // 从组合中删除元件
  delElement(A, I) {
    let t = !1;
    return I && A && this.groups[I] && this.groups[I].components && (t = X(this.groups[I].components, "id", A)), t || console.warn("模块删除元件数据失败"), t;
  }
  // 创建新组合并加入已有元素
  newBindGroup(A, I = "default") {
    if (Array.isArray(A)) {
      let t = this.mData.elements, B = this.mData.modules, e = this.mData.sprites, Q = this.mData.esSimple, C = { x1: 0, y1: 0, x2: 0, y2: 0 }, E = B.getMyElements(I), s = [], n = [];
      if (A.forEach((r) => {
        /^group_/.test(r) ? s.push(...this.unbindGroup(r)) : s.push(r);
      }), s.forEach((r, y) => {
        let d = E.find((f) => f.id == r), G = d ? d.type == "group" ? this.groups[r] : t[r] : null;
        G ? y == 0 ? (C.x1 = G.x, C.y1 = G.y, C.x2 = G.x + G.width, C.y2 = G.y + G.height) : (C.x1 = G.x < C.x1 ? G.x : C.x1, C.y1 = G.y < C.y1 ? G.y : C.y1, C.x2 = G.x + G.width > C.x2 ? G.x + G.width : C.x2, C.y2 = G.y + G.height > C.y2 ? G.y + G.height : C.y2) : n.push(r);
      }), n.length > 0)
        return console.warn(n.join(), "元件无法组合"), !1;
      e.delSprite(s, !1);
      let o = this.newGroup({
        x: C.x1,
        y: C.y1,
        width: C.x2 - C.x1,
        height: C.y2 - C.y1
      }, I);
      return o ? (s.forEach((r) => {
        t[r] && (t[r].x -= C.x1, t[r].y -= C.y1, t[r].gpid = o.id, t[r].hover = !1, t[r].selected = !1, this.addElement(Q[r], o.id));
      }), console.log(o), o.selected = !0, o) : !1;
    } else
      return !1;
  }
  // 解绑
  unbindGroup(A, I = !0) {
    let t = this.mData.elements, B = this.mData.modules, e = this.mData.unwatchs, Q = this.mData.esSimple, C = this.groups[A];
    if (A && C && C.components) {
      e[A] && typeof e[A] == "function" && e[A]();
      let E = [], s = C.components;
      return this.delGroup(A), s.forEach((n) => {
        t[n.id].x += C.x, t[n.id].y += C.y, t[n.id].gpid = null, E.push(n.id), I && B.addElement(Q[n.id], n.mid);
      }), E;
    }
    return !1;
  }
  // 配置组合
  setGroup = function(A, I) {
    if (A)
      return this.groups[A] ? Object.assign(this.groups[A], I) : (this.groups[A] = fg(Object.assign({ id: A }, I)), this.mData.elements[A] = this.groups[A]), this.groups[A];
    {
      let t = fg(I);
      return this.groups[t.id] = t, this.mData.elements[t.id] = t, t;
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
    Object.keys(this.groups).forEach((I) => {
      this.delGroup(I);
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
  addSprite(A, I = "default", t = null) {
    let B = null;
    return typeof A == "string" && typeof I == "object" ? B = this.setSprite(A, I) : typeof A == "object" && (B = this.setSprite(A, { mid: I, gpid: t })), this.appendSprite(B) ? B : null;
  }
  setSprite(A, I) {
    let t = this.mData.component, B = this.mData.elements, e = this.sprites;
    if (typeof A == "string" && t.iComponents[A]) {
      let Q = iI(t, A, I);
      return e[Q.id] = Q, B[Q.id] = Q, Q;
    } else if (typeof A == "object") {
      if (A.id && e[A.id])
        return I ? Object.assign(e[A.id], I) : console.warn("元件" + A.id + "已存在"), e[A.id];
      if (A.name) {
        let Q = iI(t, A.name, Object.assign({}, A, I));
        return e[Q.id] = Q, B[Q.id] = Q, e[Q.id];
      } else
        return console.error("元件添加失败", A), null;
    } else
      return null;
  }
  appendSprite(A) {
    let I = this.mData.modules, t = this.mData.groups;
    if (!A)
      return console.warn("添加元件失败,无数据信息"), !1;
    if (!A.mid)
      return console.warn("添加元件失败,无模块id" + mid), !1;
    A.zIndex || (A.zIndex = this.mData.getMaxZIndex(A.mid) + 1);
    let B = TI.call(this.mData, A);
    if (A.gpid && t.setGroup(A.gpid))
      t.addElement(B, A.gpid);
    else if (I.setModule(A.mid))
      I.addElement(B, A.mid);
    else
      return console.warn("添加元件失败，无法加入组或模块", B), !1;
    return this.mData.watchSimples(A), A;
  }
  // 删除单个元件
  delOneSprite(A, I = !0) {
    let t = this.mData.elements, B = this.mData.modules, e = this.mData.groups, Q = this.mData.unwatchs, C = this.sprites;
    if (C[A]) {
      let E = null;
      return C[A].gid ? E = e.delElement(A, C[A].gid) : C[A].mid && (E = B.delElement(A, C[A].mid)), I && (delete C[A], delete t[A], E && Q[A] && typeof Q[A] == "function" && Q[A]()), !!E;
    } else
      console.warn("删除模块内元件失败");
    return !1;
  }
  // 删除元件
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
  // 返回元件数据集合（以id键名）
  getSprites() {
    return this.sprites;
  }
  // 返回元件数据集合（数组）
  getSpriteList(A) {
    let I = Object.values(this.sprites);
    return A ? I.filter((t) => t.mid == A) : I;
  }
  // 返回元件数据
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
const jI = function(g, A, I) {
  if (g && typeof g == "object") {
    let t = b(g), B = A || t.mid;
    if (t.type == "group" && B) {
      let e = [];
      t.components && (e = t.components, delete t.components);
      let Q = this.newGroup(t, B);
      return e.forEach((C) => {
        jI.call(this, C, B, Q.id);
      }), Q;
    } else
      return B ? this.addSprite(t, B, I) : (console.warn("缺少页面数据"), !1);
  } else
    return g && typeof g == "string" ? this.addSprite(g, A, I) : (console.warn("添加失败"), !1);
}, Wi = function(g, A = !0) {
  let I = this.sprites.sprites, t = this.groups.groups;
  if (I[g])
    return this.sprites.delSprite(g, A);
  if (t[g])
    return this.groups.delGroup(g, A);
}, $i = function(g, A) {
  return this.modules.modules[A] ? this.modules.addElement(g, A) : this.groups.groups[A] ? this.groups.addElement(g, A) : null;
}, AE = function(g, A) {
  return this.modules.modules[A] ? this.modules.delElement(g, A) : this.groups.groups[A] ? this.groups.delElement(g, A) : null;
}, gE = function(g) {
  Array.isArray(g) && g.length > 0 ? g.forEach((A) => {
    let I = [];
    typeof A == "object" && A.components && (I = A.components, delete A.components), this.newMoule(A), I.forEach((t) => {
      if (t.type == "group") {
        let B = [];
        t.components && (B = t.components, delete t.components), this.newGroup(t, A.id), B.forEach((e) => {
          this.addSprite(e, A.id, e.gpid);
        });
      } else
        this.addSprite(t, A.id);
    });
  }) : this.newMoule({ id: "default" });
}, IE = function(g) {
  let A = this.unwatchs, I = this.esSimple;
  g && (A[g.id] = MI(g, (t) => {
    I[t.id] && Object.keys(I[t.id]).forEach((e) => {
      I[t.id][e] = t[e];
    });
  }));
};
class tE {
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
  constructor(A, I) {
    this.AppSetup = A.app.AppSetup, this.component = A.app.component, this.modules = new Zi(this), this.groups = new Pi(this), this.sprites = new Vi(this), I && this.fillData(I);
  }
  // 填充数据
  fillData(A) {
    gE.call(this, A);
  }
  // 添加元素
  addElement() {
    return jI.call(this, ...arguments);
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
  // 添加已有元素到容器
  appendElement() {
    return $i.call(this, ...arguments);
  }
  // 移除容器内的已有元素
  removeElement() {
    return AE.call(this, ...arguments);
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
    IE.call(this, ...arguments);
  }
  // 清空所有元素
  clearSprites() {
    return this.sprites.clearSprites(...arguments);
  }
  // 返回模块内元素的当前最大深度
  getMaxZIndex(A) {
    return YI(this.getMyElements(A));
  }
  // 清空所有内容数据
  clearData() {
    this.sprites.clearSprites(), this.groups.clearGroups(), this.modules.clearModules();
  }
}
class BE {
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
  // 创建新动作
  createActionData(A, I) {
    let t = xA.actions.find((E) => E.action == A);
    if (!t)
      return console.warn(B + " 动作不存在"), null;
    let B = A, e = I.target || "", Q = I.value || t.value, C = I.description || t.description;
    return t.target == "component" && !C && (C = t.name + this.appData.getElement(e).title), this.setActionData({ action: B, target: e, value: Q, description: C });
  }
  // 修改动作数据
  editActionData(A) {
    return A.id ? this.setActionData(A) : (console.warn("没有要修改的动作信息"), null);
  }
  // 添加动作数据
  setActionData(A) {
    if (A && typeof A == "object") {
      let I = zi(A);
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
const wg = function(g) {
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
class eE {
  // 数据集合
  data = {};
  dataList = U([]);
  appData = null;
  constructor(A, I) {
    this.appData = A, I && this.fillData(I);
  }
  // 填充数据
  fillData(A) {
    this.addGData({ id: "GD_query", name: "url参数", type: "temp", value: { data: UI() } }), Array.isArray(A) && A.forEach((I) => {
      this.addGData(I);
    });
  }
  // 新增一个数据对象
  addGData = function(A, I = "", t = "source") {
    const B = this.appData.rData;
    if (CA(A) && A.id)
      return this.data[A.id] ? this.data[A.id] : (A.type == "remote" ? (A.value = B.addRemote(A.value).id, this.data[A.id] = wg(A)) : this.data[A.id] = wg(A), this.dataList.push(this.data[A.id]), this.data[A.id]);
    if (A) {
      let e = {};
      return t == "remote" ? (A = B.addRemote(A).id, e = QI({ value: A, name: I, type: t })) : e = QI({ value: A, name: I, type: t }), this.data[e.id] = wg(e), this.dataList.push(this.data[e.id]), this.data[e.id];
    } else
      return console.warn("无效全局数据添加"), !1;
  };
  // 编辑一个数据对象
  editGData = function(A, I) {
    let t = null;
    if (typeof A == "string" && CA(I) && this.data[A] ? (t = A, this.data[t] = I) : CA(A) && typeof A.id == "string" && this.data[A.id] && (t = A.id, this.data[t] = A), t) {
      let B = this.dataList.findIndex((e) => e.id == t);
      if (B > -1)
        return this.dataList[B] = this.data[t];
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
class QE {
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
    let A = tg.call(this, ...arguments);
    return A || (A = OI.call(this.appData, ...arguments), A && A.id && this.remotes.findIndex((I) => I == A.id) < 0 && this.remotes.push(A.id)), A;
  }
  delRemote() {
    let A = Ig.call(this, ...arguments);
    if (typeof A == "string" && this.remotes[A]) {
      let I = this.remotes.findIndex((t) => t == t);
      I >= 0 && this.remotes.splice(I, 1);
    }
    return A;
  }
  getRemote() {
    return tg.call(this, ...arguments);
  }
  requestData() {
    return zI.call(this, ...arguments);
  }
  createExtractRule() {
    return KI.call(this, ...arguments);
  }
  getRemoteList() {
    return this.remotes.map((A) => S[A].getData());
  }
  // 清空数据
  clearData() {
    this.remotes.forEach((A) => {
      Ig(A);
    }), this.remotes.splice(0, this.remotes.length);
  }
}
class CE {
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
    if (CA(A)) {
      if (A.id && this.data[A.id])
        return console.warn("插件存在"), null;
      if (A.url) {
        let I = Ti(A);
        return this.data[I.id] = I, this.dataList.push(I), this.data[I.id];
      }
    }
    return console.warn("插件添加失败", A), null;
  }
  delPlugin(A) {
    if (this.data[A])
      X(this.dataList, "id", A), delete this.data[A];
    else if (A) {
      let t = Object.values(this.data).find((B) => B.url == A);
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
const iE = function() {
  return ot(() => {
    if (this.AppSetup.scale)
      if (this.info.scaleMode == "auto") {
        let g = { width: this.info.width, height: this.info.height };
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
}, EE = function() {
  this.unwatch.forEach((g) => g()), this.unwatch = [];
  for (const g in filterDatas)
    filterDatas[g] = null;
  this.filterDatas = {};
}, sE = function(g) {
  if (typeof g != "string")
    return g;
  if (/^RD_\S{10}$/.test(g) && S[g])
    return S[g].data;
  if (this.gData) {
    const { GData: A } = this.gData, I = this.unwatch, t = this.filterDatas;
    let B = g, e = null;
    if (/.\?+./.test(g)) {
      let Q = g.split("?");
      B = Q[0], e = Q[1];
    }
    if (/(^GD_\S{10})|(^GD_query)$/.test(B) && A[B])
      if (A[B].type == "remote") {
        let Q = tg(A[B].value);
        return Q ? e ? (t[g] || (t[g] = ref(null), I.push(watch(Q.data, (C) => {
          t[g].value = gg(C.data || C, e);
        }, { immediate: !0 }))), t[g]) : Q.data : null;
      } else
        return e ? gg(A[B].value, e) : A[B].value;
  }
  return g;
};
class nE {
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
  // 过滤器
  filterDatas = {};
  constructor(A, I) {
    this.app = A, Object.assign(this.AppSetup, I), this.scale = U({ value: 1, h: 1, w: 1 }), this.transform = iE.call(this), this.mData = new tE(this), this.aData = new BE(this), this.rData = new QE(this), this.gData = new eE(this), this.pData = new CE(this);
  }
  init(A) {
    this.app.vapp && (this.vapp = this.app.vapp, this.vapp.dom && (this.AppSetup.dom = this.vapp.dom)), this.splitData(A), this.initData(), this.resetScale(), window.addEventListener("resize", () => this.resetScale());
  }
  // 缩放比例更新
  resetScale() {
    let A = { width: this.info.width, height: this.info.height };
    Object.assign(this.scale, mI(this.AppSetup.dom, A));
  }
  // 拆分数据
  splitData(A) {
    this.iData = {};
    let I = A ? b(A) : {};
    ["modules", "actions", "globalData", "remote", "plugins"].forEach((B) => {
      I[B] ? (this.iData[B] = I[B], delete I[B]) : this.iData[B] = [];
    }), this.iData.info = I;
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
  // 数据源处理
  getDataSource() {
    return sE.call(this, ...arguments);
  }
  // 清除所有数据
  clearDataAll() {
    this.mData.clearData(), this.aData.clearData(), this.gData.clearData(), this.rData.clearData(), this.pData.clearData(), EE.call(this);
  }
}
function Kg(g, A) {
  let I = b(g.getActionList(A.actions));
  return A.actionValue && typeof A.actionValue == "object" && I.forEach((t) => {
    A.actionValue[t.id] && (t.value = g.getDataSource(A.actionValue[t.id]));
  }), I;
}
function oE(g, A) {
  const I = this.AppSetup, t = this.data, B = this.data.info.id, e = A.id;
  return {
    style: {
      cursor: I.clickCursor
    },
    onClickCapture: function(Q) {
      if (p.emit(m.CLICK_SPRITE, v(A), Q), g.actions) {
        let C = Kg(t, g);
        p.execute(C, e, B);
      }
    }
  };
}
const EI = function(g, A, I) {
  const t = this.info.id;
  let B = b(this.getActionList(g));
  for (let e = 0, Q = B.length; e < Q; e++)
    I && B[e].value && typeof B[e].value == "object" ? Object.assign(B[e].value, I) : I && (B[e].value = I);
  p.execute(B, A, t);
};
function aE(g, A, I) {
  const t = this.data, B = this.data.aData, e = this.component.iComponents, Q = this.data.info.id, C = A.id;
  let E = {};
  if (I && e[I]) {
    let n = (e[I].emits || []).find((o) => o == g.event);
    n && typeof n == "string" ? /^[a-zA-Z][-_a-zA-Z0-9_-]{1,32}$/.test(n) ? E["on" + n.toLowerCase().replace(/( |^)[a-z]/g, (o) => o.toUpperCase())] = function(o) {
      /^solo-/.test(n) && o ? g.actions && g.actions instanceof Array && g.actions.length > 0 ? EI.call(t, g.actions, C, o) : p.execute(b(B.getActionList(o)), C, Q) : g.actions && g.actions instanceof Array && EI.call(t, g.actions, C, o);
    } : console.warn(n + "无效的事件名定义") : console.warn(g.event + "事件没有定义");
  }
  return E;
}
function rE(g, A) {
  const I = this.data, t = this.data.info.id, B = A.id;
  let e = null;
  return {
    timeout: "1",
    onTimeout(Q) {
      let C = Q.detail.value;
      if (e && (clearTimeout(e), e = null), C == "mounted") {
        let s = (g.pams || {}).delay || 1e3;
        e = setTimeout(() => {
          g.actions && p.execute(Kg(I, g), B, t);
        }, parseInt(s));
      }
    }
  };
}
function cE(g, A) {
  const I = this.data, t = this.data.info.id, B = A.id;
  let e = null;
  return {
    interval: "1",
    onInterval(Q) {
      if (e && (UA.del(e), e = null), Q.detail.value == "mounted") {
        let E = (g.pams || {}).delay || 1e3;
        e = UA.add(() => {
          g.actions && p.execute(Kg(I, g), B, t);
        }, parseInt(E));
      }
    }
  };
}
function Fg(g) {
  const { myApp: A = {}, events: I, data: t = {}, componentName: B = "" } = g;
  let e = {};
  return B && (e = {
    style: {}
  }), A.AppSetup && A.AppSetup.interaction ? I.forEach((Q) => {
    switch (Q.event) {
      case "click":
        Object.assign(e, oE.call(A, Q, t));
        break;
      case "timeout":
        Object.assign(e, rE.call(A, Q, t));
        break;
      case "interval":
        Object.assign(e, cE.call(A, Q, t));
        break;
      default:
        Object.assign(e, aE.call(A, Q, t, B));
    }
  }) : t.type == "group" && !t.gpid ? Object.assign(e, {
    onClickCapture(Q) {
      Q.stopPropagation(), p.emit(m.CLICK_SPRITE, v(t), Q);
    },
    onDblclickCapture(Q) {
      Q.stopPropagation(), p.emit(m.DBLCLICK_SPRITE, v(t), Q);
    },
    onMousedownCapture(Q) {
      p.emit(m.MOUSEDOWN_SPRITE, v(t), Q);
    },
    onMouseoverCapture(Q) {
      p.emit(m.MOUSEOVER_SPRITE, v(t), Q);
    },
    onMouseoutCapture(Q) {
      p.emit(m.MOUSEOUT_SPRITE, v(t), Q);
    },
    onMouseupCapture(Q) {
      p.emit(m.MOUSEUP_SPRITE, v(t), Q);
    },
    onMouseleaveCapture(Q) {
      p.emit(m.MOUSELEAVE_SPRITE, v(t), Q);
    },
    onMouseenterCapture(Q) {
      p.emit(m.MOUSEENTER_SPRITE, v(t), Q);
    }
  }) : Object.assign(e, {
    onClick(Q) {
      Q.stopPropagation(), p.emit(m.CLICK_SPRITE, v(t), Q);
    },
    onMousedown(Q) {
      p.emit(m.MOUSEDOWN_SPRITE, v(t), Q);
    },
    onMouseover(Q) {
      p.emit(m.MOUSEOVER_SPRITE, v(t), Q);
    },
    onMouseout(Q) {
      p.emit(m.MOUSEOUT_SPRITE, v(t), Q);
    },
    onMouseup(Q) {
      p.emit(m.MOUSEUP_SPRITE, v(t), Q);
    },
    onMouseleave(Q) {
      p.emit(m.MOUSELEAVE_SPRITE, v(t), Q);
    },
    onMouseenter(Q) {
      p.emit(m.MOUSEENTER_SPRITE, v(t), Q);
    }
  }), e;
}
function T(g) {
  const { name: A, props: I, slots: t } = g, B = {
    AppSetup: _("AppSetup"),
    data: _("data"),
    component: _("component")
  }, e = B.data.mData;
  let Q = A, C = null;
  if (Q ? (C = at(Q), C == Q && (console.warn(C + "组件没有找到"), C = "div")) : (console.warn("数据缺少组件" + I), C = "div"), typeof I == "string") {
    const E = e.getElement(I);
    if (!E)
      return;
    let s = { id: I, options: E.options };
    if (E.id) {
      let n = { myApp: B, events: E.events || [], data: E, componentName: Q };
      Object.assign(s, Fg(n));
    }
    if (E.data) {
      let n = B.data.getDataSource(E.data);
      n && (s.data = pI(n) && n.data || n);
    }
    return L(C, s);
  } else if (typeof I < "u") {
    let E = { ...I };
    if (I.events) {
      let s = { myApp: B, events: I.events || [], data: I, componentName: Q };
      Object.assign(E, Fg(s));
    }
    return E.ref = E.id, E.name && delete E.name, E.mid && delete E.mid, L(C, E, t);
  } else
    return L(C, {}, "");
}
const hE = {
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
    const A = _("data"), I = A.mData.modules.getModules(), t = A.getAppData(), B = rt(g.slots) ? [g.slots] : [];
    return B.length == 0 && (Array.isArray(g.slots) ? g.slots.forEach((e) => {
      B.push(L(e));
    }) : g.slots && B.push(L(g.slots))), NI(() => {
      p.emit(m.STAGE_MOUNTED);
    }), () => {
      var e = [];
      const Q = [], C = [], E = [];
      for (const n in I)
        if (I.hasOwnProperty.call(I, n)) {
          const o = I[n];
          (typeof o.visible > "u" || o.visible == !0) && (o.type == "content" ? Q.push(o) : o.type == "fixed" ? C.push(o) : o.type == "overlayer" && E.push(o));
        }
      e.push(T({ name: "vx-background", props: g.background }), ...B), Q.length > 0 && e.push(T({ name: "vx-content", props: { modules: Q } })), C.length > 0 && e.push(T({ name: "vx-fixed", props: { modules: C } })), E.length > 0 && (e.unshift(T({ name: "vx-mask" })), e.push(T({ name: "vx-overlayer", props: { modules: E } }))), e.push(T({ name: "vx-popwin", props: g.popwin })), e.push(T({ name: "vx-message" }));
      let s = {
        position: "absolute",
        width: t.info.width ? t.info.width + "px" : "100%",
        height: t.info.height ? t.info.height + "px" : "100%",
        top: 0,
        left: 0,
        transformOrigin: "0 0",
        transform: t.transform.value,
        zIndex: 0,
        userSelect: "none",
        overflow: "hidden",
        ...b(t.info.background)
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
function XA(g, A, I, t) {
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
    XA(this.$el, "timeout", this, "mounted"), XA(this.$el, "interval", this, "mounted");
  },
  beforeUnmount() {
    this.id && p.removeEventListener(`run_function_${this.id}`), XA(this.$el, "timeout", this, "beforeUnmount"), XA(this.$el, "interval", this, "beforeUnmount");
  }
};
function lE(g) {
  let A = typeof g.anim == "object" && g.anim.options ? g.anim.options : {};
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
    ...g.border,
    ...g.background,
    ...g.shadow,
    ...A
  };
}
function _I(g, { id: A, myApp: I }) {
  const t = lE(g), B = Fg({ myApp: I, events: g.events || [], data: g, componentName: "" }), e = ["element_sprite", { element_selected: g.selected }, { element_hover: g.hover }];
  return g.anim && g.anim.name && I.AppSetup.interaction && e.push(g.anim.name), B.style && (Object.assign(t, B.style), delete B.style), { id: A, ...B, style: t, class: e };
}
const ZA = function(g, A, I, t) {
  g && g.getAttribute && g.getAttribute(A) && g.dispatchEvent(new CustomEvent(A, {
    detail: {
      component: I,
      value: t
    }
  }));
}, DE = function(g, A, I) {
  let t = null;
  NI(() => {
    A.id && p.addEventListener(`run_function_${A.id}`, (B) => {
      g.cmdRunning && g.cmdRunning(B);
    }), g.value && g.value.el && (t = g.value.el, ZA(t, "timeout", g.value, "mounted"), ZA(t, "interval", g.value, "mounted"));
  }), ct(() => {
    A.id && p.removeEventListener(`run_function_${A.id}`), t && (ZA(t, "timeout", g.value, "beforeUnmount"), ZA(t, "interval", g.value, "beforeUnmount"));
  });
}, Og = {
  name: "vx-sprite",
  props: {
    id: String
  },
  setup(g, A) {
    const I = { value: null }, t = _("AppSetup"), B = _("data"), e = _("component"), Q = U({ x: 0, y: 0, width: 0, height: 0 });
    return ht("rect", Q), DE(I, g), () => {
      const C = B.getElement(g.id);
      Q.x = C.x, Q.y = C.y, Q.width = C.width, Q.height = C.height;
      let E = _I(C, { id: g.id, myApp: { AppSetup: t, data: B, component: e } }), s = T({ name: C.name, props: C.id });
      return I.value = L("div", E, s), I.value;
    };
  }
}, XI = {
  name: "vx-sprite-group",
  props: {
    id: String
  },
  setup(g) {
    const A = _("AppSetup"), I = _("data"), t = _("component");
    return (B) => {
      const e = I.getElement(g.id);
      let Q = _I(e, { id: g.id, myApp: { AppSetup: A, data: I, component: t } });
      const C = [];
      return e.components && e.components.forEach((E, s) => {
        E.visible && C.push(L(Og, { id: E.id }));
      }), L("div", Q, C);
    };
  }
}, uE = {
  extends: tA,
  name: "vx-module",
  props: ["components"],
  setup(g) {
    const { components: A } = lt(g);
    return (I) => {
      const t = [];
      return A.value && A.value.forEach((B, e) => {
        B.visible && (B.type == "group" ? t.push(L(XI, { id: B.id })) : t.push(L(Og, { id: B.id })));
      }), L("div", {
        id: I.id,
        style: I.style
      }, t);
    };
  }
}, fE = {
  extends: tA,
  name: "vx-plane",
  props: ["components"],
  setup() {
    return (g) => {
      const A = [];
      return g.components && g.components.forEach((I, t) => {
        I.visible && A.push(T({ name: I.name, props: I.id }));
      }), L("div", {
        id: g.id,
        style: g.style
      }, A);
    };
  }
}, wE = {
  extends: tA,
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
let dE = {
  position: "absolute",
  width: "auto",
  height: "auto",
  top: 0,
  left: 0,
  zIndex: 1e4
};
const yE = {
  extends: tA,
  name: "vx-content",
  props: ["modules"],
  setup(g) {
    return () => {
      const A = g.modules, I = [];
      for (const t in A)
        if (A.hasOwnProperty.call(A, t)) {
          const B = A[t];
          (typeof B.visible > "u" || B.visible == !0) && I.push(T({ name: "vx-module", props: B }));
        }
      return L("div", {
        id: "vx-content",
        style: dE
      }, I);
    };
  }
};
let pE = {
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 2e4
};
const GE = {
  extends: tA,
  name: "vx-fixed",
  props: ["modules"],
  setup(g) {
    return () => {
      const A = g.modules, I = [];
      for (const t in A)
        if (A.hasOwnProperty.call(A, t)) {
          const B = A[t];
          (typeof B.visible > "u" || B.visible == !0) && I.push(T({ name: "vx-module", props: B }));
        }
      return L("div", {
        id: "vx-fixed",
        style: pE
      }, I);
    };
  }
};
let ME = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 4e4
};
const NE = {
  exports: tA,
  name: "vx-overlayer",
  props: ["modules"],
  setup(g) {
    return () => {
      const A = g.modules, I = [];
      for (const t in A)
        if (A.hasOwnProperty.call(A, t)) {
          const B = A[t];
          (typeof B.visible > "u" || B.visible == !0) && I.push(T({ name: "vx-module", props: B }));
        }
      return L("div", {
        id: "vx-overlayer",
        style: ME
      }, I);
    };
  }
};
let sI = {
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 99999999
}, FE = {
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
const kE = {
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
    return () => g.length > 0 ? L("div", {
      id: "vx-message",
      style: sI
    }, g.map((I) => L("div", { class: "message_item", style: FE }, I))) : L("div", {
      id: "vx-message",
      style: sI
    });
  }
}, SE = {
  exports: tA,
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
let RE = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0)",
  zIndex: 1
};
const JE = {
  name: "vx-background",
  setup(g) {
    return () => {
      let A = Object.assign({}, RE, g.style);
      return L("div", {
        id: "vx-background",
        style: A,
        onmousedown: (I) => {
          p.emit(m.MOUSEDOWN_BACKGROUND, I);
        },
        onmouseup: (I) => {
          p.emit(m.MOUSEUP_BACKGROUND, I);
        },
        onclick: (I) => {
          p.emit(m.CLICK_BACKGROUND, I);
        }
      });
    };
  }
}, mE = [uE, fE, wE, NE, yE, GE, kE, SE, JE, XI, Og], YE = {
  install: (g) => {
    mE.forEach((A) => {
      g.component(A.name, A);
    });
  }
};
var UE = og;
function LE() {
  this.__data__ = new UE(), this.size = 0;
}
var HE = LE;
function bE(g) {
  var A = this.__data__, I = A.delete(g);
  return this.size = A.size, I;
}
var xE = bE;
function vE(g) {
  return this.__data__.get(g);
}
var qE = vE;
function KE(g) {
  return this.__data__.has(g);
}
var OE = KE, zE = og, TE = bI, jE = xI, _E = 200;
function XE(g, A) {
  var I = this.__data__;
  if (I instanceof zE) {
    var t = I.__data__;
    if (!TE || t.length < _E - 1)
      return t.push([g, A]), this.size = ++I.size, this;
    I = this.__data__ = new jE(t);
  }
  return I.set(g, A), this.size = I.size, this;
}
var ZE = XE, PE = og, VE = HE, WE = xE, $E = qE, As = OE, gs = ZE;
function MA(g) {
  var A = this.__data__ = new PE(g);
  this.size = A.size;
}
MA.prototype.clear = VE;
MA.prototype.delete = WE;
MA.prototype.get = $E;
MA.prototype.has = As;
MA.prototype.set = gs;
var Is = MA, ts = vg, Bs = function() {
  try {
    var g = ts(Object, "defineProperty");
    return g({}, "", {}), g;
  } catch {
  }
}(), ZI = Bs, nI = ZI;
function es(g, A, I) {
  A == "__proto__" && nI ? nI(g, A, {
    configurable: !0,
    enumerable: !0,
    value: I,
    writable: !0
  }) : g[A] = I;
}
var zg = es, Qs = zg, Cs = sg;
function is(g, A, I) {
  (I !== void 0 && !Cs(g[A], I) || I === void 0 && !(A in g)) && Qs(g, A, I);
}
var PI = is;
function Es(g) {
  return function(A, I, t) {
    for (var B = -1, e = Object(A), Q = t(A), C = Q.length; C--; ) {
      var E = Q[g ? C : ++B];
      if (I(e[E], E, e) === !1)
        break;
    }
    return A;
  };
}
var ss = Es, ns = ss, os = ns(), as = os, Bg = {}, rs = {
  get exports() {
    return Bg;
  },
  set exports(g) {
    Bg = g;
  }
};
(function(g, A) {
  var I = aA, t = A && !A.nodeType && A, B = t && !0 && g && !g.nodeType && g, e = B && B.exports === t, Q = e ? I.Buffer : void 0, C = Q ? Q.allocUnsafe : void 0;
  function E(s, n) {
    if (n)
      return s.slice();
    var o = s.length, r = C ? C(o) : new s.constructor(o);
    return s.copy(r), r;
  }
  g.exports = E;
})(rs, Bg);
var cs = aA, hs = cs.Uint8Array, ls = hs, oI = ls;
function Ds(g) {
  var A = new g.constructor(g.byteLength);
  return new oI(A).set(new oI(g)), A;
}
var us = Ds, fs = us;
function ws(g, A) {
  var I = A ? fs(g.buffer) : g.buffer;
  return new g.constructor(I, g.byteOffset, g.length);
}
var ds = ws;
function ys(g, A) {
  var I = -1, t = g.length;
  for (A || (A = Array(t)); ++I < t; )
    A[I] = g[I];
  return A;
}
var ps = ys, Gs = rA, aI = Object.create, Ms = function() {
  function g() {
  }
  return function(A) {
    if (!Gs(A))
      return {};
    if (aI)
      return aI(A);
    g.prototype = A;
    var I = new g();
    return g.prototype = void 0, I;
  };
}(), Ns = Ms, Fs = Object.prototype;
function ks(g) {
  var A = g && g.constructor, I = typeof A == "function" && A.prototype || Fs;
  return g === I;
}
var VI = ks, Ss = Ns, Rs = RI, Js = VI;
function ms(g) {
  return typeof g.constructor == "function" && !Js(g) ? Ss(Rs(g)) : {};
}
var Ys = ms, Us = bA, Ls = dA, Hs = "[object Arguments]";
function bs(g) {
  return Ls(g) && Us(g) == Hs;
}
var xs = bs, rI = xs, vs = dA, WI = Object.prototype, qs = WI.hasOwnProperty, Ks = WI.propertyIsEnumerable, Os = rI(function() {
  return arguments;
}()) ? rI : function(g) {
  return vs(g) && qs.call(g, "callee") && !Ks.call(g, "callee");
}, $I = Os, zs = 9007199254740991;
function Ts(g) {
  return typeof g == "number" && g > -1 && g % 1 == 0 && g <= zs;
}
var At = Ts, js = xg, _s = At;
function Xs(g) {
  return g != null && _s(g.length) && !js(g);
}
var Tg = Xs, Zs = Tg, Ps = dA;
function Vs(g) {
  return Ps(g) && Zs(g);
}
var Ws = Vs, HA = {}, $s = {
  get exports() {
    return HA;
  },
  set exports(g) {
    HA = g;
  }
};
function An() {
  return !1;
}
var gn = An;
(function(g, A) {
  var I = aA, t = gn, B = A && !A.nodeType && A, e = B && !0 && g && !g.nodeType && g, Q = e && e.exports === B, C = Q ? I.Buffer : void 0, E = C ? C.isBuffer : void 0, s = E || t;
  g.exports = s;
})($s, HA);
var In = bA, tn = At, Bn = dA, en = "[object Arguments]", Qn = "[object Array]", Cn = "[object Boolean]", En = "[object Date]", sn = "[object Error]", nn = "[object Function]", on = "[object Map]", an = "[object Number]", rn = "[object Object]", cn = "[object RegExp]", hn = "[object Set]", ln = "[object String]", Dn = "[object WeakMap]", un = "[object ArrayBuffer]", fn = "[object DataView]", wn = "[object Float32Array]", dn = "[object Float64Array]", yn = "[object Int8Array]", pn = "[object Int16Array]", Gn = "[object Int32Array]", Mn = "[object Uint8Array]", Nn = "[object Uint8ClampedArray]", Fn = "[object Uint16Array]", kn = "[object Uint32Array]", R = {};
R[wn] = R[dn] = R[yn] = R[pn] = R[Gn] = R[Mn] = R[Nn] = R[Fn] = R[kn] = !0;
R[en] = R[Qn] = R[un] = R[Cn] = R[fn] = R[En] = R[sn] = R[nn] = R[on] = R[an] = R[rn] = R[cn] = R[hn] = R[ln] = R[Dn] = !1;
function Sn(g) {
  return Bn(g) && tn(g.length) && !!R[In(g)];
}
var Rn = Sn;
function Jn(g) {
  return function(A) {
    return g(A);
  };
}
var mn = Jn, eg = {}, Yn = {
  get exports() {
    return eg;
  },
  set exports(g) {
    eg = g;
  }
};
(function(g, A) {
  var I = kI, t = A && !A.nodeType && A, B = t && !0 && g && !g.nodeType && g, e = B && B.exports === t, Q = e && I.process, C = function() {
    try {
      var E = B && B.require && B.require("util").types;
      return E || Q && Q.binding && Q.binding("util");
    } catch {
    }
  }();
  g.exports = C;
})(Yn, eg);
var Un = Rn, Ln = mn, cI = eg, hI = cI && cI.isTypedArray, Hn = hI ? Ln(hI) : Un, gt = Hn;
function bn(g, A) {
  if (!(A === "constructor" && typeof g[A] == "function") && A != "__proto__")
    return g[A];
}
var It = bn, xn = zg, vn = sg, qn = Object.prototype, Kn = qn.hasOwnProperty;
function On(g, A, I) {
  var t = g[A];
  (!(Kn.call(g, A) && vn(t, I)) || I === void 0 && !(A in g)) && xn(g, A, I);
}
var zn = On, Tn = zn, jn = zg;
function _n(g, A, I, t) {
  var B = !I;
  I || (I = {});
  for (var e = -1, Q = A.length; ++e < Q; ) {
    var C = A[e], E = t ? t(I[C], g[C], C, I, g) : void 0;
    E === void 0 && (E = g[C]), B ? jn(I, C, E) : Tn(I, C, E);
  }
  return I;
}
var Xn = _n;
function Zn(g, A) {
  for (var I = -1, t = Array(g); ++I < g; )
    t[I] = A(I);
  return t;
}
var Pn = Zn, Vn = 9007199254740991, Wn = /^(?:0|[1-9]\d*)$/;
function $n(g, A) {
  var I = typeof g;
  return A = A ?? Vn, !!A && (I == "number" || I != "symbol" && Wn.test(g)) && g > -1 && g % 1 == 0 && g < A;
}
var tt = $n, Ao = Pn, go = $I, Io = vA, to = HA, Bo = tt, eo = gt, Qo = Object.prototype, Co = Qo.hasOwnProperty;
function io(g, A) {
  var I = Io(g), t = !I && go(g), B = !I && !t && to(g), e = !I && !t && !B && eo(g), Q = I || t || B || e, C = Q ? Ao(g.length, String) : [], E = C.length;
  for (var s in g)
    (A || Co.call(g, s)) && !(Q && // Safari 9 has enumerable `arguments.length` in strict mode.
    (s == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    B && (s == "offset" || s == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    e && (s == "buffer" || s == "byteLength" || s == "byteOffset") || // Skip index properties.
    Bo(s, E))) && C.push(s);
  return C;
}
var Eo = io;
function so(g) {
  var A = [];
  if (g != null)
    for (var I in Object(g))
      A.push(I);
  return A;
}
var no = so, oo = rA, ao = VI, ro = no, co = Object.prototype, ho = co.hasOwnProperty;
function lo(g) {
  if (!oo(g))
    return ro(g);
  var A = ao(g), I = [];
  for (var t in g)
    t == "constructor" && (A || !ho.call(g, t)) || I.push(t);
  return I;
}
var Do = lo, uo = Eo, fo = Do, wo = Tg;
function yo(g) {
  return wo(g) ? uo(g, !0) : fo(g);
}
var Bt = yo, po = Xn, Go = Bt;
function Mo(g) {
  return po(g, Go(g));
}
var No = Mo, lI = PI, Fo = Bg, ko = ds, So = ps, Ro = Ys, DI = $I, uI = vA, Jo = Ws, mo = HA, Yo = xg, Uo = rA, Lo = CA, Ho = gt, fI = It, bo = No;
function xo(g, A, I, t, B, e, Q) {
  var C = fI(g, I), E = fI(A, I), s = Q.get(E);
  if (s) {
    lI(g, I, s);
    return;
  }
  var n = e ? e(C, E, I + "", g, A, Q) : void 0, o = n === void 0;
  if (o) {
    var r = uI(E), y = !r && mo(E), d = !r && !y && Ho(E);
    n = E, r || y || d ? uI(C) ? n = C : Jo(C) ? n = So(C) : y ? (o = !1, n = Fo(E, !0)) : d ? (o = !1, n = ko(E, !0)) : n = [] : Lo(E) || DI(E) ? (n = C, DI(C) ? n = bo(C) : (!Uo(C) || Yo(C)) && (n = Ro(E))) : o = !1;
  }
  o && (Q.set(E, n), B(n, E, t, e, Q), Q.delete(E)), lI(g, I, n);
}
var vo = xo, qo = Is, Ko = PI, Oo = as, zo = vo, To = rA, jo = Bt, _o = It;
function et(g, A, I, t, B) {
  g !== A && Oo(A, function(e, Q) {
    if (B || (B = new qo()), To(e))
      zo(g, A, Q, I, et, t, B);
    else {
      var C = t ? t(_o(g, Q), e, Q + "", g, A, B) : void 0;
      C === void 0 && (C = e), Ko(g, Q, C);
    }
  }, jo);
}
var Xo = et;
function Zo(g) {
  return g;
}
var Qt = Zo;
function Po(g, A, I) {
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
var Vo = Po, Wo = Vo, wI = Math.max;
function $o(g, A, I) {
  return A = wI(A === void 0 ? g.length - 1 : A, 0), function() {
    for (var t = arguments, B = -1, e = wI(t.length - A, 0), Q = Array(e); ++B < e; )
      Q[B] = t[A + B];
    B = -1;
    for (var C = Array(A + 1); ++B < A; )
      C[B] = t[B];
    return C[A] = I(Q), Wo(g, this, C);
  };
}
var Aa = $o;
function ga(g) {
  return function() {
    return g;
  };
}
var Ia = ga, ta = Ia, dI = ZI, Ba = Qt, ea = dI ? function(g, A) {
  return dI(g, "toString", {
    configurable: !0,
    enumerable: !1,
    value: ta(A),
    writable: !0
  });
} : Ba, Qa = ea, Ca = 800, ia = 16, Ea = Date.now;
function sa(g) {
  var A = 0, I = 0;
  return function() {
    var t = Ea(), B = ia - (t - I);
    if (I = t, B > 0) {
      if (++A >= Ca)
        return arguments[0];
    } else
      A = 0;
    return g.apply(void 0, arguments);
  };
}
var na = sa, oa = Qa, aa = na, ra = aa(oa), ca = ra, ha = Qt, la = Aa, Da = ca;
function ua(g, A) {
  return Da(la(g, A, ha), g + "");
}
var fa = ua, wa = sg, da = Tg, ya = tt, pa = rA;
function Ga(g, A, I) {
  if (!pa(I))
    return !1;
  var t = typeof A;
  return (t == "number" ? da(I) && ya(A, I.length) : t == "string" && A in I) ? wa(I[A], g) : !1;
}
var Ma = Ga, Na = fa, Fa = Ma;
function ka(g) {
  return Na(function(A, I) {
    var t = -1, B = I.length, e = B > 1 ? I[B - 1] : void 0, Q = B > 2 ? I[2] : void 0;
    for (e = g.length > 3 && typeof e == "function" ? (B--, e) : void 0, Q && Fa(I[0], I[1], Q) && (e = B < 3 ? void 0 : e, B = 1), A = Object(A); ++t < B; ) {
      var C = I[t];
      C && g(A, C, t, e);
    }
    return A;
  });
}
var Sa = ka, Ra = Xo, Ja = Sa, ma = Ja(function(g, A, I) {
  Ra(g, A, I);
}), yI = ma;
class Ya {
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
    let t = {}, B = I.mixins || [], e = {};
    for (const Q of B)
      Q.props && Object.assign(e, Q.props);
    Object.assign(e, I.props);
    for (const Q in e)
      if (Object.hasOwnProperty.call(e, Q)) {
        const C = e[Q];
        typeof C.default == "function" ? t[Q] = C.default.call() : t[Q] = C.default;
      }
    return t.id = "sprite_" + z(10), t.name = A, t.type = I.type || "", t;
  }
  // 返回组件自定义事件
  getMyEvents(A) {
    let I = this.iComponents[A];
    if (!I)
      return [];
    let t = [], B = I.emits || [];
    for (const e in B)
      t.push({
        name: B[e],
        event: B[e],
        pams: "",
        actions: /^solo-/.test(A) ? null : []
      });
    return t;
  }
  // 返回组件事件（含默认事件）
  getEvents(A) {
    return [...xA.events, ...this.getMyEvents(A)];
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
        let I = yI({}, A);
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
      this.app && this.app.vapp ? (this.iComponents[I.name] = yI({}, tA, I), this.app.vapp.component(I.name, this.iComponents[I.name])) : console.error("组件注册失败，缺少app");
    });
  }
}
const Ua = function() {
  return {
    // 更新元件原始数据
    reviewData(g, A) {
      if (A && A.id) {
        console.warn(A.id + "不能替换");
        return;
      }
      Object.assign(g, A);
    },
    // 显示元件
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
    // 更新元件传递数据
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
}, RA = xA.actions, La = function(g) {
  return {
    name: g.name || "无名动作",
    action: g.action || null,
    target: g.target || "component",
    valueType: g.valueType || null,
    value: g.value || ""
  };
};
class Ha {
  app = null;
  // 动作方法集合
  actions = Ua();
  // 外部插件添加的动作（用于可删除操作）
  uses = {};
  constructor(A) {
    this.app = A;
  }
  // 元素动作
  [uA.ACTION](A) {
    A.data && A.appid == this.app.id && (A.data instanceof Array ? A.data.forEach((I) => {
      this.executeAction(I.action, I.target, I.value);
    }) : A.data instanceof Object && typeof A.data != "function" && this.executeAction(A.data.action, A.data.target, A.data.value));
  }
  // 应用动作
  [uA.APP_ACTION]() {
  }
  // 添加一个动作
  useAction(A) {
    let I = La(A);
    RA.find((t) => t.action == I.action) ? console.warn(A, "已存在") : I.action && A.handle ? this.actions[I.action] ? console.warn(I.action + "动作已存在") : (RA.push(I), this.actions[I.action] = A.handle, this.uses[I.action] = I) : I.action ? console.warn(A, "缺少动作方法函数") : console.warn(A, "缺少action名称");
  }
  remove(A) {
    if (this.uses[A]) {
      let I = RA.findIndex((t) => t.action == A);
      I > -1 && RA.splice(I, 1), delete this.actions[A], delete this.uses[A];
    }
  }
  removeAll() {
    Object.keys(this.uses).forEach((I) => {
      this.remove(I);
    });
  }
  /**
   * 执行动作
   * @param {string} action 动作
   * @param {*} target 目标
   * @param {*} value 参数
   */
  executeAction(A, I, t) {
    if (this.actions[A]) {
      let { data: { mData: B } } = this.app, e = RA.find((Q) => Q.action == A);
      if (e) {
        let Q = {};
        e.target == "component" || e.target == "components" ? I instanceof Array ? (Q = [], I.forEach((C) => {
          Q.push(B.getElement(C));
        })) : I && (Q = B.getElement(I)) : e.target == "app" ? Q = data.getAppData() : e.target == "url" ? Q = I : e.target == "modules" ? Q = B.getModuleList() : e.target == "module" && (Q = B.getModule(I)), this.actions[A].call(this.app, Q, t);
      } else {
        let Q = B.getElement(I) || B.getModule(I);
        Q && (targetData = Q), this.actions[A].call(this.app, targetData, t);
      }
    } else
      console.warn(A + "动作不存在");
  }
}
function ba(g) {
  const A = new Ha(g);
  for (const I in uA) {
    let t = uA[I];
    A[t] && p.addEventListener(t, A[t], A);
  }
  return A;
}
const xa = function(g, A = "up") {
  const { mData: I } = this.appData, t = I.elements, B = I.getElement(g);
  if (B) {
    if (!B.mid) {
      console.warn("页面上找不到" + g);
      return;
    }
  } else {
    console.warn("元件不存在" + g);
    return;
  }
  let e = I.getMyElements(B.mid).map((Q) => ({
    id: Q.id,
    zIndex: Q.zIndex
  })).sort((Q, C) => C.zIndex - Q.zIndex);
  if (A == "up") {
    let Q = e.findIndex((C) => C.id == g);
    if (Q > 0) {
      let C = e[Q - 1].id, E = t[C].zIndex;
      t[C].zIndex = t[g].zIndex, t[g].zIndex = E;
    }
  } else if (A == "down") {
    let Q = e.findIndex((C) => C.id == g);
    if (Q < e.length - 1 && Q > -1) {
      let C = e[Q + 1].id, E = t[C].zIndex;
      t[C].zIndex = t[g].zIndex, t[g].zIndex = E;
    }
  } else if (A == "top") {
    let Q = e.findIndex((C) => C.id == g);
    if (Q > 0) {
      t[g].zIndex = e[0].zIndex;
      for (let C = 0; C < Q; C++)
        t[e[C].id].zIndex--;
    }
  } else if (A == "bottom") {
    let Q = e.findIndex((C) => C.id == g);
    if (Q < e.length - 1 && Q > -1) {
      t[g].zIndex = e[e.length - 1].zIndex;
      for (let C = Q + 1, E = e.length; C < E; C++)
        t[e[C].id].zIndex++;
    }
  }
}, va = function(g, A, I = null) {
  const { mData: t } = this.appData, B = t.getSprites(), e = t.getGroups();
  if (B[g]) {
    let Q = b(B[g]);
    return Q.title += "_c", delete Q.id, delete Q.zIndex, Object.assign(Q, A), t.addSprite(Q, Q.mid, I);
  } else if (e[g]) {
    let Q = b(e[g]);
    Q.title += "_c", delete Q.id, delete Q.zIndex, Object.assign(Q, A);
    let C = [];
    Q.components && (C = Q.components, delete Q.components);
    let E = t.newGroup(Q, Q.mid);
    return C.forEach((s) => {
      this.copyAdd(s.id, { gpid: E.id }, E.id);
    }), E;
  }
}, qa = function(g, A) {
  const { mData: I } = this.appData, t = I.getSprites(), B = I.getGroups();
  if (t[g]) {
    let e = b(t[g]);
    return e.title += "_c", A && (delete e.id, delete e.gpid, delete e.mid, delete e.zIndex, delete e.lock, delete e.bind, typeof e.data == "string" && /(^GD_\S{10})|(^GD_query)|(^RD_\S{10})$/.test(e.data) && (e.data = ""), e.events = []), e;
  } else if (B[g]) {
    let e = b(B[g]);
    return e.title += "_c", A && (delete e.id, delete e.gpid, delete e.mid, delete e.zIndex), Array.isArray(e.components) && (e.components = e.components.map((Q) => this.copy(Q.id, A))), e;
  }
}, Ka = function(g, A) {
  const { mData: I } = this.appData;
  I.getModuleList().forEach((t) => {
    if (A) {
      if (typeof A == "string") {
        if (t.id == A)
          return;
      } else if (A instanceof Array && A.find((B) => B == t.id))
        return;
    }
    t.type != "fixed" && (t.id == g ? t.visible = !0 : t.visible = !1);
  });
}, Oa = function(g, A) {
  const { component: I } = this.app;
  let t = xA.events.find((B) => B.event == g) || I.getMyEvents(A).find((B) => B.event == g);
  return t ? b(t) : !1;
}, za = function(g, A, I = !1) {
  let t = this.appData.getElement(g);
  return A ? I ? t.events ? t.events.findIndex((B) => B.event == A) : -1 : t.events ? t.events.find((B) => B.event == A) : null : t.events || null;
}, Ta = function(g, A, I) {
  const t = this.appData;
  let B = this.getEvent(g, A);
  if (B)
    return B;
  let e = t.getElement(g), Q = this.newEventData(A, e.name);
  return e && Q ? (e.events || (e.events = []), I && (Q.pams = I), e.events.push(Q), e.events[e.events.length - 1]) : (console.warn(e ? A + "事件名称不对" : "缺少组件数据"), null);
}, ja = function(g, A, I) {
  const t = this.appData;
  let B = this.getEvent(g, A, !0);
  if (B > -1) {
    let e = t.getElement(g);
    return e.events[B].pams = I, e.events[B];
  }
  return null;
}, _a = function(g, A) {
  const I = this.appData;
  let t = this.getEvent(g, A, !0);
  if (t > -1) {
    let B = I.getElement(g);
    return B.events.splice(t, 1), B.events;
  }
  return null;
}, Xa = function(g, A, I = "") {
  if (I && typeof A == "string") {
    let t = this.getEvent(A, I);
    return t ? t.actions.findIndex((B) => B == g) < 0 && t.actions.push(g) : console.warn(A + "中" + I + "事件不存在"), t;
  } else if (typeof A == "object" && A.actions && A.actions instanceof Array)
    return A.actions.push(g), A;
}, Za = function(g, A, I, t) {
  if (I && typeof A == "string") {
    let B = this.getEvent(A, I);
    return B ? typeof t < "u" && (B.actionValue || (B.actionValue = {}), B.actionValue[g] = t) : console.warn(A + "中" + I + "事件不存在"), B;
  }
}, Pa = function(g, A, I = "", t = !1) {
  const B = this.appData;
  if (I && typeof A == "string") {
    let e = this.getEvent(A, I);
    return e && X(e.actions, "", g), t && B.aData.delActionData(g), e;
  } else if (typeof A == "object" && A.actions && A.actions instanceof Array)
    return X(A.actions, "", g), t && B.aData.delActionData(g), A;
}, Va = function(g, A) {
  const I = this.appData;
  let t = [];
  if (g) {
    let B = I.getElement(g);
    if (Array.isArray(B.events))
      if (A) {
        let e = B.events.find((Q) => Q.event == A);
        e && (t = e.actions.map((Q) => ({
          sname: B.title,
          sid: B.id,
          event: e.event,
          id: Q
        })));
      } else
        t = B.events.map((e) => e.actions ? e.actions.map((Q) => ({
          sname: B.title,
          sid: B.id,
          event: e.event,
          id: Q
        })) : []).flat();
  } else
    t = I.mData.getSpriteList().map((B) => B.events && B.events.length > 0 ? B.events.map((e) => e.actions ? e.actions.map((Q) => ({
      sname: B.title,
      sid: B.id,
      event: e.event,
      id: Q
    })) : []).flat() : []).flat();
  return t;
};
class Wa {
  app = null;
  appData = null;
  constructor(A) {
    this.app = A, this.appData = A.data;
  }
  jsonData() {
    return b.call(this, ...arguments);
  }
  extractData() {
    return mg.call(this, ...arguments);
  }
  setZindex() {
    return xa.call(this, ...arguments);
  }
  copy() {
    return qa.call(this, ...arguments);
  }
  copyAdd() {
    return va.call(this, ...arguments);
  }
  changeModuleShow() {
    return Ka.call(this, ...arguments);
  }
  newEventData() {
    return Oa.call(this, ...arguments);
  }
  getEvent() {
    return za.call(this, ...arguments);
  }
  addEvent() {
    return Ta.call(this, ...arguments);
  }
  editEvent() {
    return ja.call(this, ...arguments);
  }
  removeEvent() {
    return _a.call(this, ...arguments);
  }
  addEventAction() {
    return Xa.call(this, ...arguments);
  }
  editEventAction() {
    return Za.call(this, ...arguments);
  }
  removeEventAction() {
    return Pa.call(this, ...arguments);
  }
  getSpriteActions() {
    return Va.call(this, ...arguments);
  }
  getBodyData() {
    return Ng.call(this, ...arguments);
  }
}
var kg = function() {
}, Qg = {}, jg = {}, Cg = {};
function $a(g, A) {
  g = g.push ? g : [g];
  var I = [], t = g.length, B = t, e, Q, C, E;
  for (e = function(s, n) {
    n.length && I.push(s), B--, B || A(I);
  }; t--; ) {
    if (Q = g[t], C = jg[Q], C) {
      e(Q, C);
      continue;
    }
    E = Cg[Q] = Cg[Q] || [], E.push(e);
  }
}
function Ct(g, A) {
  if (g) {
    var I = Cg[g];
    if (jg[g] = A, !!I)
      for (; I.length; )
        I[0](g, A), I.splice(0, 1);
  }
}
function Sg(g, A) {
  g.call && (g = { success: g }), A.length ? (g.error || kg)(A) : (g.success || kg)(g);
}
function it(g, A, I, t) {
  var B = document, e = I.async, Q = (I.numRetries || 0) + 1, C = I.before || kg, E = g.replace(/[\?|#].*$/, ""), s = g.replace(/^(css|img|module|nomodule)!/, ""), n, o, r;
  if (t = t || 0, /(^css!|\.css$)/.test(E))
    r = B.createElement("link"), r.rel = "stylesheet", r.href = s, n = "hideFocus" in r, n && r.relList && (n = 0, r.rel = "preload", r.as = "style");
  else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(E))
    r = B.createElement("img"), r.src = s;
  else if (r = B.createElement("script"), r.src = s, r.async = e === void 0 ? !0 : e, o = "noModule" in r, /^module!/.test(E)) {
    if (!o)
      return A(g, "l");
    r.type = "module";
  } else if (/^nomodule!/.test(E) && o)
    return A(g, "l");
  r.onload = r.onerror = r.onbeforeload = function(y) {
    var d = y.type[0];
    if (n)
      try {
        r.sheet.cssText.length || (d = "e");
      } catch (G) {
        G.code != 18 && (d = "e");
      }
    if (d == "e") {
      if (t += 1, t < Q)
        return it(g, A, I, t);
    } else if (r.rel == "preload" && r.as == "style")
      return r.rel = "stylesheet";
    A(g, d, y.defaultPrevented);
  }, C(g, r) !== !1 && B.head.appendChild(r);
}
function Ar(g, A, I) {
  g = g.push ? g : [g];
  var t = g.length, B = t, e = [], Q, C;
  for (Q = function(E, s, n) {
    if (s == "e" && e.push(E), s == "b")
      if (n)
        e.push(E);
      else
        return;
    t--, t || A(e);
  }, C = 0; C < B; C++)
    it(g[C], Q, I);
}
function wA(g, A, I) {
  var t, B;
  if (A && A.trim && (t = A), B = (t ? I : A) || {}, t) {
    if (t in Qg)
      throw "LoadJS";
    Qg[t] = !0;
  }
  function e(Q, C) {
    Ar(g, function(E) {
      Sg(B, E), Q && Sg({ success: Q, error: C }, E), Ct(t, E);
    }, B);
  }
  if (B.returnPromise)
    return new Promise(e);
  e();
}
wA.ready = function(A, I) {
  return $a(A, function(t) {
    Sg(I, t);
  }), wA;
};
wA.done = function(A) {
  Ct(A, []);
};
wA.reset = function() {
  Qg = {}, jg = {}, Cg = {};
};
wA.isDefined = function(A) {
  return A in Qg;
};
const Rg = function(g) {
  g instanceof Function ? g(this) : g && typeof g == "object" && g.install && g.install instanceof Function && g.install(this);
}, gr = function({ url: g, name: A }) {
  return new Promise((I, t) => {
    wA([g], {
      success: () => {
        typeof A == "string" ? Rg.call(this, window[A]) : Array.isArray(A) && A.forEach((B) => {
          Rg.call(this, window[B]);
        }), I();
      },
      error: (B) => t(B)
    });
  });
}, Ir = function(g) {
  return new Promise((A, I) => {
    if (Array.isArray(g)) {
      let t = [];
      g.forEach((B) => {
        t.push(gr.call(this, B));
      }), Promise.all(t).then(A, I);
    } else
      A();
  });
};
window && typeof window.Vue > "u" && (window.Vue = Et);
const PA = [];
class tr extends DA {
  constructor(A = {}) {
    super(), this.id = A.id || z(10), this.vapp = null, this.dom = null, this.component = new Ya(this), this.data = new nE(this, A.config), this.controller = ba(this), this.AppSetup = this.data.AppSetup, this.helper = new Wa(this);
  }
  async initData(A) {
    let I = await Hg(A);
    return this.id = I.id, I && Array.isArray(I.plugins) && await Ir.call(this, I.plugins), this.data.init(I), {
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
      return HI(I);
    }
  }
  // 添加组件
  addComponent(A) {
    this.component.add(A);
  }
  // 使用插件
  use(A) {
    Rg.call(this, A);
  }
  // 创建
  create(A = {}) {
    return this.vapp ? !1 : (this.vapp = Dt(hE, A), this.vapp.config.globalProperties.AppSetup = this.AppSetup, this.vapp.config.globalProperties.data = this.data, this.vapp.config.globalProperties.component = this.component, this.vapp.use(YE), this.component.install(), this.AppSetup.status = "create", console.log("%c灿create", "color:#0aa100"), !0);
  }
  // 显示
  display() {
    return this.vapp ? (this.AppSetup.dom instanceof HTMLElement ? this.dom = this.AppSetup.dom : typeof dom == "string" && (this.dom = document.querySelector(dom)), this.dom ? PA.includes(this.dom) ? (console.error("app加载的DOM已有内容"), !1) : (PA.push(this.dom), this.vapp.mount(this.dom), this.AppSetup.status = "display", console.log("%c灿display", "color:#0aa100"), !0) : (console.error(this.AppSetup.dom + "错误"), !1)) : (console.warn("app没有创建"), !1);
  }
  // 删除
  remove() {
    if (this.vapp) {
      let A = PA.findIndex((I) => I == this.dom);
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
const Cr = fB, ir = Se, Er = p, sr = xA, Br = m, nr = qi, or = function(g) {
  const { dom: A, scale: I = !0, interaction: t = !0, clickCursor: B = "pointer", display: e, plugins: Q, slots: C, data: E } = g, s = { interaction: t, clickCursor: B, scale: I, dom: A }, n = new tr({ config: Object.assign({ dom: A }, s) });
  return Array.isArray(Q) ? Q.forEach((o) => {
    n.use(o);
  }) : Q && n.use(Q), n.create({ slots: C }), E && n.initData(E).then((o) => {
    o && e == !0 && n.display();
  }), n;
};
Rt.addEventListener("statechange", function(g) {
  p.emit(Br.PAGE_STATE, { state: g.newState, oldState: g.oldState });
});
console.log("%crd-runtime:2.0.5", "color:#0aa100");
export {
  Br as EVENTS,
  Er as cmd,
  or as createVapp,
  sr as dataOptions,
  nr as remote,
  ir as secrecy,
  Cr as utils
};
//# sourceMappingURL=rd-runtime.mjs.map
