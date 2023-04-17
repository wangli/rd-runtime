import * as CC from "vue";
import { reactive as H, watch as aI, computed as EC, ref as dg, isReactive as KB, resolveComponent as eC, h as q, isVNode as tC, onMounted as iC, toRefs as Gg, provide as IB, createApp as nC } from "vue";
function oC(A, I) {
  for (var g = 0; g < I.length; g++) {
    const B = I[g];
    if (typeof B != "string" && !Array.isArray(B)) {
      for (const Q in B)
        if (Q !== "default" && !(Q in A)) {
          const C = Object.getOwnPropertyDescriptor(B, Q);
          C && Object.defineProperty(A, Q, C.get ? C : {
            enumerable: !0,
            get: () => B[Q]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(A, Symbol.toStringTag, { value: "Module" }));
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
let kI;
try {
  new EventTarget(), kI = !0;
} catch {
  kI = !1;
}
class sC {
  constructor() {
    this.e = {};
  }
  addEventListener(I, g, B = !1) {
    this.t(I).push(g);
  }
  removeEventListener(I, g, B = !1) {
    const Q = this.t(I), C = Q.indexOf(g);
    C > -1 && Q.splice(C, 1);
  }
  dispatchEvent(I) {
    return I.target = this, Object.freeze(I), this.t(I.type).forEach((g) => g(I)), !0;
  }
  t(I) {
    return this.e[I] = this.e[I] || [];
  }
}
var aC = kI ? EventTarget : sC;
let rC = class {
  constructor(I) {
    this.type = I;
  }
};
var cC = kI ? Event : rC;
class DC extends cC {
  constructor(I, g) {
    super(I), this.newState = g.newState, this.oldState = g.oldState, this.originalEvent = g.originalEvent;
  }
}
const pA = "active", BI = "passive", kA = "hidden", SA = "frozen", tg = "terminated", gB = typeof safari == "object" && safari.pushNotification, lC = "onpageshow" in self, hC = ["focus", "blur", "visibilitychange", "freeze", "resume", "pageshow", lC ? "pagehide" : "unload"], BB = (A) => (A.preventDefault(), A.returnValue = "Are you sure?"), fC = (A) => A.reduce((I, g, B) => (I[g] = B, I), {}), yC = [[pA, BI, kA, tg], [pA, BI, kA, SA], [kA, BI, pA], [SA, kA], [SA, pA], [SA, BI]].map(fC), wC = (A, I) => {
  for (let g, B = 0; g = yC[B]; ++B) {
    const Q = g[A], C = g[I];
    if (Q >= 0 && C >= 0 && C > Q)
      return Object.keys(g).slice(Q, C + 1);
  }
  return [];
}, yI = () => document.visibilityState === kA ? kA : document.hasFocus() ? pA : BI;
class uC extends aC {
  constructor() {
    super();
    const I = yI();
    this.s = I, this.i = [], this.a = this.a.bind(this), hC.forEach((g) => addEventListener(g, this.a, !0)), gB && addEventListener("beforeunload", (g) => {
      this.n = setTimeout(() => {
        g.defaultPrevented || g.returnValue.length > 0 || this.r(g, kA);
      }, 0);
    });
  }
  get state() {
    return this.s;
  }
  get pageWasDiscarded() {
    return document.wasDiscarded || !1;
  }
  addUnsavedChanges(I) {
    !this.i.indexOf(I) > -1 && (this.i.length === 0 && addEventListener("beforeunload", BB), this.i.push(I));
  }
  removeUnsavedChanges(I) {
    const g = this.i.indexOf(I);
    g > -1 && (this.i.splice(g, 1), this.i.length === 0 && removeEventListener("beforeunload", BB));
  }
  r(I, g) {
    if (g !== this.s) {
      const B = this.s, Q = wC(B, g);
      for (let C = 0; C < Q.length - 1; ++C) {
        const E = Q[C], e = Q[C + 1];
        this.s = e, this.dispatchEvent(new DC("statechange", { oldState: E, newState: e, originalEvent: I }));
      }
    }
  }
  a(I) {
    switch (gB && clearTimeout(this.n), I.type) {
      case "pageshow":
      case "resume":
        this.r(I, yI());
        break;
      case "focus":
        this.r(I, pA);
        break;
      case "blur":
        this.s === pA && this.r(I, yI());
        break;
      case "pagehide":
      case "unload":
        this.r(I, I.persisted ? SA : tg);
        break;
      case "visibilitychange":
        this.s !== SA && this.s !== tg && this.r(I, yI());
        break;
      case "freeze":
        this.r(I, SA);
    }
  }
}
var dC = new uC(), QI = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, tI = {}, GC = {
  get exports() {
    return tI;
  },
  set exports(A) {
    tI = A;
  }
};
(function(A) {
  var I = Object.prototype.hasOwnProperty, g = "~";
  function B() {
  }
  Object.create && (B.prototype = /* @__PURE__ */ Object.create(null), new B().__proto__ || (g = !1));
  function Q(t, o, s) {
    this.fn = t, this.context = o, this.once = s || !1;
  }
  function C(t, o, s, n, D) {
    if (typeof s != "function")
      throw new TypeError("The listener must be a function");
    var d = new Q(s, n || t, D), u = g ? g + o : o;
    return t._events[u] ? t._events[u].fn ? t._events[u] = [t._events[u], d] : t._events[u].push(d) : (t._events[u] = d, t._eventsCount++), t;
  }
  function E(t, o) {
    --t._eventsCount === 0 ? t._events = new B() : delete t._events[o];
  }
  function e() {
    this._events = new B(), this._eventsCount = 0;
  }
  e.prototype.eventNames = function() {
    var o = [], s, n;
    if (this._eventsCount === 0)
      return o;
    for (n in s = this._events)
      I.call(s, n) && o.push(g ? n.slice(1) : n);
    return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(s)) : o;
  }, e.prototype.listeners = function(o) {
    var s = g ? g + o : o, n = this._events[s];
    if (!n)
      return [];
    if (n.fn)
      return [n.fn];
    for (var D = 0, d = n.length, u = new Array(d); D < d; D++)
      u[D] = n[D].fn;
    return u;
  }, e.prototype.listenerCount = function(o) {
    var s = g ? g + o : o, n = this._events[s];
    return n ? n.fn ? 1 : n.length : 0;
  }, e.prototype.emit = function(o, s, n, D, d, u) {
    var Z = g ? g + o : o;
    if (!this._events[Z])
      return !1;
    var w = this._events[Z], iA = arguments.length, DA, L;
    if (w.fn) {
      switch (w.once && this.removeListener(o, w.fn, void 0, !0), iA) {
        case 1:
          return w.fn.call(w.context), !0;
        case 2:
          return w.fn.call(w.context, s), !0;
        case 3:
          return w.fn.call(w.context, s, n), !0;
        case 4:
          return w.fn.call(w.context, s, n, D), !0;
        case 5:
          return w.fn.call(w.context, s, n, D, d), !0;
        case 6:
          return w.fn.call(w.context, s, n, D, d, u), !0;
      }
      for (L = 1, DA = new Array(iA - 1); L < iA; L++)
        DA[L - 1] = arguments[L];
      w.fn.apply(w.context, DA);
    } else {
      var PI = w.length, gA;
      for (L = 0; L < PI; L++)
        switch (w[L].once && this.removeListener(o, w[L].fn, void 0, !0), iA) {
          case 1:
            w[L].fn.call(w[L].context);
            break;
          case 2:
            w[L].fn.call(w[L].context, s);
            break;
          case 3:
            w[L].fn.call(w[L].context, s, n);
            break;
          case 4:
            w[L].fn.call(w[L].context, s, n, D);
            break;
          default:
            if (!DA)
              for (gA = 1, DA = new Array(iA - 1); gA < iA; gA++)
                DA[gA - 1] = arguments[gA];
            w[L].fn.apply(w[L].context, DA);
        }
    }
    return !0;
  }, e.prototype.on = function(o, s, n) {
    return C(this, o, s, n, !1);
  }, e.prototype.once = function(o, s, n) {
    return C(this, o, s, n, !0);
  }, e.prototype.removeListener = function(o, s, n, D) {
    var d = g ? g + o : o;
    if (!this._events[d])
      return this;
    if (!s)
      return E(this, d), this;
    var u = this._events[d];
    if (u.fn)
      u.fn === s && (!D || u.once) && (!n || u.context === n) && E(this, d);
    else {
      for (var Z = 0, w = [], iA = u.length; Z < iA; Z++)
        (u[Z].fn !== s || D && !u[Z].once || n && u[Z].context !== n) && w.push(u[Z]);
      w.length ? this._events[d] = w.length === 1 ? w[0] : w : E(this, d);
    }
    return this;
  }, e.prototype.removeAllListeners = function(o) {
    var s;
    return o ? (s = g ? g + o : o, this._events[s] && E(this, s)) : (this._events = new B(), this._eventsCount = 0), this;
  }, e.prototype.off = e.prototype.removeListener, e.prototype.addListener = e.prototype.on, e.prefixed = g, e.EventEmitter = e, A.exports = e;
})(GC);
const II = {}, MC = 10;
function NC(A) {
  var I = !0, g = new Date().getTime();
  return II[A] ? (g - II[A].time < MC && (I = !1), II[A].count++, II[A].time = g) : II[A] = {
    count: 1,
    time: g
  }, I;
}
const b = {
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
}, OA = {
  // 执行动作
  ACTION: "action",
  // 设置应用
  APP_ACTION: "appAction"
};
var SI = {}, FC = {
  get exports() {
    return SI;
  },
  set exports(A) {
    SI = A;
  }
};
(function(A, I) {
  (function(g, B) {
    A.exports = B();
  })(QI, function() {
    var g = 1e3, B = 6e4, Q = 36e5, C = "millisecond", E = "second", e = "minute", t = "hour", o = "day", s = "week", n = "month", D = "quarter", d = "year", u = "date", Z = "Invalid Date", w = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, iA = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, DA = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(l) {
      var c = ["th", "st", "nd", "rd"], a = l % 100;
      return "[" + l + (c[(a - 20) % 10] || c[a] || c[0]) + "]";
    } }, L = function(l, c, a) {
      var h = String(l);
      return !h || h.length >= c ? l : "" + Array(c + 1 - h.length).join(a) + l;
    }, PI = { s: L, z: function(l) {
      var c = -l.utcOffset(), a = Math.abs(c), h = Math.floor(a / 60), r = a % 60;
      return (c <= 0 ? "+" : "-") + L(h, 2, "0") + ":" + L(r, 2, "0");
    }, m: function l(c, a) {
      if (c.date() < a.date())
        return -l(a, c);
      var h = 12 * (a.year() - c.year()) + (a.month() - c.month()), r = c.clone().add(h, n), y = a - r < 0, f = c.clone().add(h + (y ? -1 : 1), n);
      return +(-(h + (a - r) / (y ? r - f : f - r)) || 0);
    }, a: function(l) {
      return l < 0 ? Math.ceil(l) || 0 : Math.floor(l);
    }, p: function(l) {
      return { M: n, y: d, w: s, d: o, D: u, h: t, m: e, s: E, ms: C, Q: D }[l] || String(l || "").toLowerCase().replace(/s$/, "");
    }, u: function(l) {
      return l === void 0;
    } }, gA = "en", FA = {};
    FA[gA] = DA;
    var VI = function(l) {
      return l instanceof hI;
    }, lI = function l(c, a, h) {
      var r;
      if (!c)
        return gA;
      if (typeof c == "string") {
        var y = c.toLowerCase();
        FA[y] && (r = y), a && (FA[y] = a, r = y);
        var f = c.split("-");
        if (!r && f.length > 1)
          return l(f[0]);
      } else {
        var k = c.name;
        FA[k] = c, r = k;
      }
      return !h && r && (gA = r), r || !h && gA;
    }, K = function(l, c) {
      if (VI(l))
        return l.clone();
      var a = typeof c == "object" ? c : {};
      return a.date = l, a.args = arguments, new hI(a);
    }, R = PI;
    R.l = lI, R.i = VI, R.w = function(l, c) {
      return K(l, { locale: c.$L, utc: c.$u, x: c.$x, $offset: c.$offset });
    };
    var hI = function() {
      function l(a) {
        this.$L = lI(a.locale, null, !0), this.parse(a);
      }
      var c = l.prototype;
      return c.parse = function(a) {
        this.$d = function(h) {
          var r = h.date, y = h.utc;
          if (r === null)
            return new Date(NaN);
          if (R.u(r))
            return new Date();
          if (r instanceof Date)
            return new Date(r);
          if (typeof r == "string" && !/Z$/i.test(r)) {
            var f = r.match(w);
            if (f) {
              var k = f[2] - 1 || 0, x = (f[7] || "0").substring(0, 3);
              return y ? new Date(Date.UTC(f[1], k, f[3] || 1, f[4] || 0, f[5] || 0, f[6] || 0, x)) : new Date(f[1], k, f[3] || 1, f[4] || 0, f[5] || 0, f[6] || 0, x);
            }
          }
          return new Date(r);
        }(a), this.$x = a.x || {}, this.init();
      }, c.init = function() {
        var a = this.$d;
        this.$y = a.getFullYear(), this.$M = a.getMonth(), this.$D = a.getDate(), this.$W = a.getDay(), this.$H = a.getHours(), this.$m = a.getMinutes(), this.$s = a.getSeconds(), this.$ms = a.getMilliseconds();
      }, c.$utils = function() {
        return R;
      }, c.isValid = function() {
        return this.$d.toString() !== Z;
      }, c.isSame = function(a, h) {
        var r = K(a);
        return this.startOf(h) <= r && r <= this.endOf(h);
      }, c.isAfter = function(a, h) {
        return K(a) < this.startOf(h);
      }, c.isBefore = function(a, h) {
        return this.endOf(h) < K(a);
      }, c.$g = function(a, h, r) {
        return R.u(a) ? this[h] : this.set(r, a);
      }, c.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, c.valueOf = function() {
        return this.$d.getTime();
      }, c.startOf = function(a, h) {
        var r = this, y = !!R.u(h) || h, f = R.p(a), k = function(bA, P) {
          var wA = R.w(r.$u ? Date.UTC(r.$y, P, bA) : new Date(r.$y, P, bA), r);
          return y ? wA : wA.endOf(o);
        }, x = function(bA, P) {
          return R.w(r.toDate()[bA].apply(r.toDate("s"), (y ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(P)), r);
        }, m = this.$W, z = this.$M, yA = this.$D, lA = "set" + (this.$u ? "UTC" : "");
        switch (f) {
          case d:
            return y ? k(1, 0) : k(31, 11);
          case n:
            return y ? k(1, z) : k(0, z + 1);
          case s:
            var $A = this.$locale().weekStart || 0, AI = (m < $A ? m + 7 : m) - $A;
            return k(y ? yA - AI : yA + (6 - AI), z);
          case o:
          case u:
            return x(lA + "Hours", 0);
          case t:
            return x(lA + "Minutes", 1);
          case e:
            return x(lA + "Seconds", 2);
          case E:
            return x(lA + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, c.endOf = function(a) {
        return this.startOf(a, !1);
      }, c.$set = function(a, h) {
        var r, y = R.p(a), f = "set" + (this.$u ? "UTC" : ""), k = (r = {}, r[o] = f + "Date", r[u] = f + "Date", r[n] = f + "Month", r[d] = f + "FullYear", r[t] = f + "Hours", r[e] = f + "Minutes", r[E] = f + "Seconds", r[C] = f + "Milliseconds", r)[y], x = y === o ? this.$D + (h - this.$W) : h;
        if (y === n || y === d) {
          var m = this.clone().set(u, 1);
          m.$d[k](x), m.init(), this.$d = m.set(u, Math.min(this.$D, m.daysInMonth())).$d;
        } else
          k && this.$d[k](x);
        return this.init(), this;
      }, c.set = function(a, h) {
        return this.clone().$set(a, h);
      }, c.get = function(a) {
        return this[R.p(a)]();
      }, c.add = function(a, h) {
        var r, y = this;
        a = Number(a);
        var f = R.p(h), k = function(z) {
          var yA = K(y);
          return R.w(yA.date(yA.date() + Math.round(z * a)), y);
        };
        if (f === n)
          return this.set(n, this.$M + a);
        if (f === d)
          return this.set(d, this.$y + a);
        if (f === o)
          return k(1);
        if (f === s)
          return k(7);
        var x = (r = {}, r[e] = B, r[t] = Q, r[E] = g, r)[f] || 1, m = this.$d.getTime() + a * x;
        return R.w(m, this);
      }, c.subtract = function(a, h) {
        return this.add(-1 * a, h);
      }, c.format = function(a) {
        var h = this, r = this.$locale();
        if (!this.isValid())
          return r.invalidDate || Z;
        var y = a || "YYYY-MM-DDTHH:mm:ssZ", f = R.z(this), k = this.$H, x = this.$m, m = this.$M, z = r.weekdays, yA = r.months, lA = function(P, wA, WI, fI) {
          return P && (P[wA] || P(h, y)) || WI[wA].slice(0, fI);
        }, $A = function(P) {
          return R.s(k % 12 || 12, P, "0");
        }, AI = r.meridiem || function(P, wA, WI) {
          var fI = P < 12 ? "AM" : "PM";
          return WI ? fI.toLowerCase() : fI;
        }, bA = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: m + 1, MM: R.s(m + 1, 2, "0"), MMM: lA(r.monthsShort, m, yA, 3), MMMM: lA(yA, m), D: this.$D, DD: R.s(this.$D, 2, "0"), d: String(this.$W), dd: lA(r.weekdaysMin, this.$W, z, 2), ddd: lA(r.weekdaysShort, this.$W, z, 3), dddd: z[this.$W], H: String(k), HH: R.s(k, 2, "0"), h: $A(1), hh: $A(2), a: AI(k, x, !0), A: AI(k, x, !1), m: String(x), mm: R.s(x, 2, "0"), s: String(this.$s), ss: R.s(this.$s, 2, "0"), SSS: R.s(this.$ms, 3, "0"), Z: f };
        return y.replace(iA, function(P, wA) {
          return wA || bA[P] || f.replace(":", "");
        });
      }, c.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, c.diff = function(a, h, r) {
        var y, f = R.p(h), k = K(a), x = (k.utcOffset() - this.utcOffset()) * B, m = this - k, z = R.m(this, k);
        return z = (y = {}, y[d] = z / 12, y[n] = z, y[D] = z / 3, y[s] = (m - x) / 6048e5, y[o] = (m - x) / 864e5, y[t] = m / Q, y[e] = m / B, y[E] = m / g, y)[f] || m, r ? z : R.a(z);
      }, c.daysInMonth = function() {
        return this.endOf(n).$D;
      }, c.$locale = function() {
        return FA[this.$L];
      }, c.locale = function(a, h) {
        if (!a)
          return this.$L;
        var r = this.clone(), y = lI(a, h, !0);
        return y && (r.$L = y), r;
      }, c.clone = function() {
        return R.w(this.$d, this);
      }, c.toDate = function() {
        return new Date(this.valueOf());
      }, c.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, c.toISOString = function() {
        return this.$d.toISOString();
      }, c.toString = function() {
        return this.$d.toUTCString();
      }, l;
    }(), AB = hI.prototype;
    return K.prototype = AB, [["$ms", C], ["$s", E], ["$m", e], ["$H", t], ["$W", o], ["$M", n], ["$y", d], ["$D", u]].forEach(function(l) {
      AB[l[1]] = function(c) {
        return this.$g(c, l[0], l[1]);
      };
    }), K.extend = function(l, c) {
      return l.$i || (l(c, hI, K), l.$i = !0), K;
    }, K.locale = lI, K.isDayjs = VI, K.unix = function(l) {
      return K(1e3 * l);
    }, K.en = FA[gA], K.Ls = FA, K.p = {}, K;
  });
})(FC);
const pC = SI, OB = /* @__PURE__ */ oC({
  __proto__: null,
  default: pC
}, [SI]);
var kC = typeof QI == "object" && QI && QI.Object === Object && QI, zB = kC, SC = zB, RC = typeof self == "object" && self && self.Object === Object && self, JC = SC || RC || Function("return this")(), YA = JC, YC = YA, UC = YC.Symbol, Mg = UC, QB = Mg, TB = Object.prototype, LC = TB.hasOwnProperty, HC = TB.toString, gI = QB ? QB.toStringTag : void 0;
function bC(A) {
  var I = LC.call(A, gI), g = A[gI];
  try {
    A[gI] = void 0;
    var B = !0;
  } catch {
  }
  var Q = HC.call(A);
  return B && (I ? A[gI] = g : delete A[gI]), Q;
}
var mC = bC, xC = Object.prototype, vC = xC.toString;
function qC(A) {
  return vC.call(A);
}
var KC = qC, CB = Mg, OC = mC, zC = KC, TC = "[object Null]", jC = "[object Undefined]", EB = CB ? CB.toStringTag : void 0;
function _C(A) {
  return A == null ? A === void 0 ? jC : TC : EB && EB in Object(A) ? OC(A) : zC(A);
}
var rI = _C;
function XC(A, I) {
  return function(g) {
    return A(I(g));
  };
}
var ZC = XC, PC = ZC, VC = PC(Object.getPrototypeOf, Object), jB = VC;
function WC(A) {
  return A != null && typeof A == "object";
}
var XA = WC, $C = rI, AE = jB, IE = XA, gE = "[object Object]", BE = Function.prototype, QE = Object.prototype, _B = BE.toString, CE = QE.hasOwnProperty, EE = _B.call(Object);
function eE(A) {
  if (!IE(A) || $C(A) != gE)
    return !1;
  var I = AE(A);
  if (I === null)
    return !0;
  var g = CE.call(I, "constructor") && I.constructor;
  return typeof g == "function" && g instanceof g && _B.call(g) == EE;
}
var eA = eE;
const eB = {
  dayjs(A, I) {
    return OB(A).format(I);
  }
}, xA = function(A, I, g, B) {
  let Q = A;
  if (I) {
    let C = I.split(".");
    for (let E of C)
      if (typeof Q[E] < "u")
        Q = Q[E];
      else {
        Q = null;
        break;
      }
  } else
    return typeof B == "object" && B.func ? eB[B.func].call(null, Q, B.rule) : Q;
  return g && Q instanceof Array ? Q.map((C) => xA(C, g, null, B)) : typeof B == "object" && B.func ? eB[B.func].call(null, Q, B.rule) : Q;
}, Ng = function(A, I) {
  if (I && eA(I) && I.y && I.y instanceof Array && I.y.length > 0) {
    let g = [];
    if (I.x && I.x.name && I.x.path) {
      g.push([I.x.name]);
      let B = xA(A, I.x.path, I.x.mapKey, I.x.format);
      B && B.forEach((Q, C) => {
        g[C + 1] = [Q];
      }), I.y.forEach((Q) => {
        g[0].push(Q.name);
        let C = xA(A, Q.path, Q.mapKey, Q.format);
        C && C instanceof Array && C.forEach((E, e) => {
          g[e + 1] ? g[e + 1].push(E) : g[e + 1] = [E];
        });
      });
    } else
      I.y.forEach((B, Q) => {
        let C = xA(A, B.path, B.mapKey, B.format);
        C && C instanceof Array && (Q == 0 ? g.push([B.name]) : g[0].push(B.name), C.forEach((E, e) => {
          g[e + 1] ? g[e + 1].push(E) : g[e + 1] = [E];
        }));
      });
    return g;
  } else {
    if (I && eA(I) && I.name && I.path)
      return {
        [I.name]: xA(A, I.path, I.mapKey, I.format)
      };
    if (I && I instanceof Array) {
      let g = {};
      return I.forEach((B) => {
        g[B.name] = xA(A, B.path, B.mapKey, B.format);
      }), g;
    } else
      return console.log("数据未处理"), A;
  }
}, $ = function(A) {
  if (typeof A == "string")
    try {
      return JSON.parse(A);
    } catch {
      return A;
    }
  else
    return A ? JSON.parse(JSON.stringify(A)) : {};
}, tE = function() {
  const A = function() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  };
  return A() + A() + A() + A() + A() + A() + A() + A();
};
let nA = {};
const iE = {
  add(A, I, g) {
    let B = I || 1e3, Q = g || "id_" + new Date().getTime() + Math.floor(Math.random() * 1e3);
    return nA[Q] && clearInterval(nA[Q]), nA[Q] = setInterval(A, B), Q;
  },
  del(A) {
    if (A)
      nA[A] && (clearInterval(nA[A]), delete nA[A]);
    else {
      for (const I in nA)
        Object.hasOwnProperty.call(nA, I) && clearInterval(nA[I]);
      nA = {};
    }
  }
};
let oA = {};
const nE = {
  add(A, I, g) {
    let B = I || 1e3, Q = g || "id_" + new Date().getTime() + Math.floor(Math.random() * 1e3);
    return oA[Q] && clearTimeout(oA[Q]), oA[Q] = setTimeout(A, B), Q;
  },
  del(A) {
    if (A)
      oA[A] && (clearTimeout(oA[A]), delete oA[A]);
    else {
      for (const I in oA)
        Object.hasOwnProperty.call(oA, I) && clearTimeout(oA[I]);
      oA = {};
    }
  }
}, ig = function(A) {
  return A ? Object.keys(A).map(function(I) {
    return encodeURIComponent(I) + "=" + encodeURIComponent(A[I]);
  }).join("&") : "";
}, aA = function(A, I, g) {
  if (A && A instanceof Array) {
    let B = I ? A.findIndex((Q) => Q[I] == g) : A.findIndex((Q) => Q == g);
    return B > -1 ? A.splice(B, 1) : !1;
  } else
    return !1;
}, XB = function(A, I = !0) {
  let g = location.href.slice(location.href.lastIndexOf("?")), B = {}, Q = /([^?=&#]+)=([^?=&#]+)/g;
  return g.replace(Q, (C, E, e) => B[E] = I ? decodeURIComponent(e) : e), A ? B[A] || "" : B;
}, oE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dayjs: OB,
  extractData: Ng,
  getUrlParam: XB,
  guid: tE,
  interval: iE,
  jsonData: $,
  jsonToParams: ig,
  removeArray: aA,
  timeout: nE
}, Symbol.toStringTag, { value: "Module" })), uA = new tI(), G = {
  /**
   * 添加需要托管的eventObj对象事件
   * @param {string} eventName 事件名称
   * @param {function} fun 事件方法
   * @param {object} eventObj  委托对象
   */
  addEventListener(A, I, g = null) {
    uA.on(A, I, g);
  },
  /**
   * 删除托管的eventObj对象事件
   * @param {string} eventName 事件名称
   * @param {function} fun 委托对象
   * @param {object} eventObj  委托对象
   */
  removeEventListener(A, I, g) {
    g && I ? uA.off(A, I, g) : I ? uA.off(A, I) : uA.off(A);
  },
  /**
   * 清除所有
   */
  clear(A) {
    uA.removeAllListeners(A);
  },
  /**
   * 发送命令
   * @param {string} eventName 事件名称
   * @param {object} args 参数 
   * @param {boolean} force 强制发送
   */
  emit(A, I, g = !1) {
    if (typeof g == "boolean" && g)
      uA.emit(A, I);
    else if (NC(A)) {
      let B = arguments.length;
      if (B <= 3)
        uA.emit(A, I, g);
      else {
        let Q = [];
        for (i = 1; i < B; i++)
          Q[0] = arguments[i];
        uA.emit(A, ...Q);
      }
    }
  },
  /**
   * 执行命令
   * @param {*} action 
   * @param {*} target 
   */
  execute(A, I = "") {
    let g = {
      target: I,
      data: $(A)
    };
    this.emit(OA.ACTION, g);
  },
  /**
   * 消息提示
   */
  message(A) {
    this.emit("message-send", A);
  },
  /**
   * 执行元件内的cmdRunning方法
   * @param {string} id 元件id 
   * @param {*} data 
   */
  running(A, I) {
    this.emit("run_function_" + A, I);
  },
  /**
   * 执行数据更新
   * @param {string} target 目标对象id 
   * @param {*} value 数据值
   */
  reviewData(A, I) {
    this.emit(OA.ACTION, {
      data: {
        action: "reviewData",
        target: A,
        value: I
      }
    });
  }
}, S = {
  // 宽度
  width: 1920,
  // 高度
  height: 1080,
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
};
let _ = (A = 21) => {
  let I = "", g = crypto.getRandomValues(new Uint8Array(A));
  for (; A--; ) {
    let B = g[A] & 63;
    B < 36 ? I += B.toString(36) : B < 62 ? I += (B - 26).toString(36).toUpperCase() : B < 63 ? I += "_" : I += "-";
  }
  return I;
};
function wI(A, I, g, B) {
  A && A.getAttribute && A.getAttribute(I) && A.dispatchEvent(new CustomEvent(I, {
    detail: {
      component: g,
      value: B
    }
  }));
}
const $I = {}, tB = {
  add(A) {
    A.id && ($I[A.id] = A);
  },
  del(A) {
    A.id && delete $I[A.id];
  },
  get items() {
    return $I;
  }
}, KI = {
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
      let A = typeof this.anim == "object" && this.anim.options ? this.anim.options : {};
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
        ...A
      };
    }
  },
  created() {
    this.AppSetup = S, tB.add(this), this.id && G.addEventListener(`run_function_${this.id}`, (A) => {
      this.cmdRunning && this.cmdRunning(A);
    });
  },
  mounted() {
    wI(this.$el, "timeout", this, "mounted"), wI(this.$el, "interval", this, "mounted");
  },
  beforeUnmount() {
    tB.del(this), this.id && G.removeEventListener(`run_function_${this.id}`), wI(this.$el, "timeout", this, "beforeUnmount"), wI(this.$el, "interval", this, "beforeUnmount");
  }
};
function sE() {
  this.__data__ = [], this.size = 0;
}
var aE = sE;
function rE(A, I) {
  return A === I || A !== A && I !== I;
}
var OI = rE, cE = OI;
function DE(A, I) {
  for (var g = A.length; g--; )
    if (cE(A[g][0], I))
      return g;
  return -1;
}
var zI = DE, lE = zI, hE = Array.prototype, fE = hE.splice;
function yE(A) {
  var I = this.__data__, g = lE(I, A);
  if (g < 0)
    return !1;
  var B = I.length - 1;
  return g == B ? I.pop() : fE.call(I, g, 1), --this.size, !0;
}
var wE = yE, uE = zI;
function dE(A) {
  var I = this.__data__, g = uE(I, A);
  return g < 0 ? void 0 : I[g][1];
}
var GE = dE, ME = zI;
function NE(A) {
  return ME(this.__data__, A) > -1;
}
var FE = NE, pE = zI;
function kE(A, I) {
  var g = this.__data__, B = pE(g, A);
  return B < 0 ? (++this.size, g.push([A, I])) : g[B][1] = I, this;
}
var SE = kE, RE = aE, JE = wE, YE = GE, UE = FE, LE = SE;
function ZA(A) {
  var I = -1, g = A == null ? 0 : A.length;
  for (this.clear(); ++I < g; ) {
    var B = A[I];
    this.set(B[0], B[1]);
  }
}
ZA.prototype.clear = RE;
ZA.prototype.delete = JE;
ZA.prototype.get = YE;
ZA.prototype.has = UE;
ZA.prototype.set = LE;
var TI = ZA, HE = TI;
function bE() {
  this.__data__ = new HE(), this.size = 0;
}
var mE = bE;
function xE(A) {
  var I = this.__data__, g = I.delete(A);
  return this.size = I.size, g;
}
var vE = xE;
function qE(A) {
  return this.__data__.get(A);
}
var KE = qE;
function OE(A) {
  return this.__data__.has(A);
}
var zE = OE;
function TE(A) {
  var I = typeof A;
  return A != null && (I == "object" || I == "function");
}
var UA = TE, jE = rI, _E = UA, XE = "[object AsyncFunction]", ZE = "[object Function]", PE = "[object GeneratorFunction]", VE = "[object Proxy]";
function WE(A) {
  if (!_E(A))
    return !1;
  var I = jE(A);
  return I == ZE || I == PE || I == XE || I == VE;
}
var Fg = WE, $E = YA, Ae = $E["__core-js_shared__"], Ie = Ae, Ag = Ie, iB = function() {
  var A = /[^.]+$/.exec(Ag && Ag.keys && Ag.keys.IE_PROTO || "");
  return A ? "Symbol(src)_1." + A : "";
}();
function ge(A) {
  return !!iB && iB in A;
}
var Be = ge, Qe = Function.prototype, Ce = Qe.toString;
function Ee(A) {
  if (A != null) {
    try {
      return Ce.call(A);
    } catch {
    }
    try {
      return A + "";
    } catch {
    }
  }
  return "";
}
var ee = Ee, te = Fg, ie = Be, ne = UA, oe = ee, se = /[\\^$.*+?()[\]{}|]/g, ae = /^\[object .+?Constructor\]$/, re = Function.prototype, ce = Object.prototype, De = re.toString, le = ce.hasOwnProperty, he = RegExp(
  "^" + De.call(le).replace(se, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function fe(A) {
  if (!ne(A) || ie(A))
    return !1;
  var I = te(A) ? he : ae;
  return I.test(oe(A));
}
var ye = fe;
function we(A, I) {
  return A?.[I];
}
var ue = we, de = ye, Ge = ue;
function Me(A, I) {
  var g = Ge(A, I);
  return de(g) ? g : void 0;
}
var pg = Me, Ne = pg, Fe = YA, pe = Ne(Fe, "Map"), ZB = pe, ke = pg, Se = ke(Object, "create"), jI = Se, nB = jI;
function Re() {
  this.__data__ = nB ? nB(null) : {}, this.size = 0;
}
var Je = Re;
function Ye(A) {
  var I = this.has(A) && delete this.__data__[A];
  return this.size -= I ? 1 : 0, I;
}
var Ue = Ye, Le = jI, He = "__lodash_hash_undefined__", be = Object.prototype, me = be.hasOwnProperty;
function xe(A) {
  var I = this.__data__;
  if (Le) {
    var g = I[A];
    return g === He ? void 0 : g;
  }
  return me.call(I, A) ? I[A] : void 0;
}
var ve = xe, qe = jI, Ke = Object.prototype, Oe = Ke.hasOwnProperty;
function ze(A) {
  var I = this.__data__;
  return qe ? I[A] !== void 0 : Oe.call(I, A);
}
var Te = ze, je = jI, _e = "__lodash_hash_undefined__";
function Xe(A, I) {
  var g = this.__data__;
  return this.size += this.has(A) ? 0 : 1, g[A] = je && I === void 0 ? _e : I, this;
}
var Ze = Xe, Pe = Je, Ve = Ue, We = ve, $e = Te, At = Ze;
function PA(A) {
  var I = -1, g = A == null ? 0 : A.length;
  for (this.clear(); ++I < g; ) {
    var B = A[I];
    this.set(B[0], B[1]);
  }
}
PA.prototype.clear = Pe;
PA.prototype.delete = Ve;
PA.prototype.get = We;
PA.prototype.has = $e;
PA.prototype.set = At;
var It = PA, oB = It, gt = TI, Bt = ZB;
function Qt() {
  this.size = 0, this.__data__ = {
    hash: new oB(),
    map: new (Bt || gt)(),
    string: new oB()
  };
}
var Ct = Qt;
function Et(A) {
  var I = typeof A;
  return I == "string" || I == "number" || I == "symbol" || I == "boolean" ? A !== "__proto__" : A === null;
}
var et = Et, tt = et;
function it(A, I) {
  var g = A.__data__;
  return tt(I) ? g[typeof I == "string" ? "string" : "hash"] : g.map;
}
var _I = it, nt = _I;
function ot(A) {
  var I = nt(this, A).delete(A);
  return this.size -= I ? 1 : 0, I;
}
var st = ot, at = _I;
function rt(A) {
  return at(this, A).get(A);
}
var ct = rt, Dt = _I;
function lt(A) {
  return Dt(this, A).has(A);
}
var ht = lt, ft = _I;
function yt(A, I) {
  var g = ft(this, A), B = g.size;
  return g.set(A, I), this.size += g.size == B ? 0 : 1, this;
}
var wt = yt, ut = Ct, dt = st, Gt = ct, Mt = ht, Nt = wt;
function VA(A) {
  var I = -1, g = A == null ? 0 : A.length;
  for (this.clear(); ++I < g; ) {
    var B = A[I];
    this.set(B[0], B[1]);
  }
}
VA.prototype.clear = ut;
VA.prototype.delete = dt;
VA.prototype.get = Gt;
VA.prototype.has = Mt;
VA.prototype.set = Nt;
var PB = VA, Ft = TI, pt = ZB, kt = PB, St = 200;
function Rt(A, I) {
  var g = this.__data__;
  if (g instanceof Ft) {
    var B = g.__data__;
    if (!pt || B.length < St - 1)
      return B.push([A, I]), this.size = ++g.size, this;
    g = this.__data__ = new kt(B);
  }
  return g.set(A, I), this.size = g.size, this;
}
var Jt = Rt, Yt = TI, Ut = mE, Lt = vE, Ht = KE, bt = zE, mt = Jt;
function WA(A) {
  var I = this.__data__ = new Yt(A);
  this.size = I.size;
}
WA.prototype.clear = Ut;
WA.prototype.delete = Lt;
WA.prototype.get = Ht;
WA.prototype.has = bt;
WA.prototype.set = mt;
var xt = WA, vt = pg, qt = function() {
  try {
    var A = vt(Object, "defineProperty");
    return A({}, "", {}), A;
  } catch {
  }
}(), VB = qt, sB = VB;
function Kt(A, I, g) {
  I == "__proto__" && sB ? sB(A, I, {
    configurable: !0,
    enumerable: !0,
    value: g,
    writable: !0
  }) : A[I] = g;
}
var kg = Kt, Ot = kg, zt = OI;
function Tt(A, I, g) {
  (g !== void 0 && !zt(A[I], g) || g === void 0 && !(I in A)) && Ot(A, I, g);
}
var WB = Tt;
function jt(A) {
  return function(I, g, B) {
    for (var Q = -1, C = Object(I), E = B(I), e = E.length; e--; ) {
      var t = E[A ? e : ++Q];
      if (g(C[t], t, C) === !1)
        break;
    }
    return I;
  };
}
var _t = jt, Xt = _t, Zt = Xt(), Pt = Zt, RI = {}, Vt = {
  get exports() {
    return RI;
  },
  set exports(A) {
    RI = A;
  }
};
(function(A, I) {
  var g = YA, B = I && !I.nodeType && I, Q = B && !0 && A && !A.nodeType && A, C = Q && Q.exports === B, E = C ? g.Buffer : void 0, e = E ? E.allocUnsafe : void 0;
  function t(o, s) {
    if (s)
      return o.slice();
    var n = o.length, D = e ? e(n) : new o.constructor(n);
    return o.copy(D), D;
  }
  A.exports = t;
})(Vt, RI);
var Wt = YA, $t = Wt.Uint8Array, Ai = $t, aB = Ai;
function Ii(A) {
  var I = new A.constructor(A.byteLength);
  return new aB(I).set(new aB(A)), I;
}
var gi = Ii, Bi = gi;
function Qi(A, I) {
  var g = I ? Bi(A.buffer) : A.buffer;
  return new A.constructor(g, A.byteOffset, A.length);
}
var Ci = Qi;
function Ei(A, I) {
  var g = -1, B = A.length;
  for (I || (I = Array(B)); ++g < B; )
    I[g] = A[g];
  return I;
}
var ei = Ei, ti = UA, rB = Object.create, ii = function() {
  function A() {
  }
  return function(I) {
    if (!ti(I))
      return {};
    if (rB)
      return rB(I);
    A.prototype = I;
    var g = new A();
    return A.prototype = void 0, g;
  };
}(), ni = ii, oi = Object.prototype;
function si(A) {
  var I = A && A.constructor, g = typeof I == "function" && I.prototype || oi;
  return A === g;
}
var $B = si, ai = ni, ri = jB, ci = $B;
function Di(A) {
  return typeof A.constructor == "function" && !ci(A) ? ai(ri(A)) : {};
}
var li = Di, hi = rI, fi = XA, yi = "[object Arguments]";
function wi(A) {
  return fi(A) && hi(A) == yi;
}
var ui = wi, cB = ui, di = XA, AQ = Object.prototype, Gi = AQ.hasOwnProperty, Mi = AQ.propertyIsEnumerable, Ni = cB(function() {
  return arguments;
}()) ? cB : function(A) {
  return di(A) && Gi.call(A, "callee") && !Mi.call(A, "callee");
}, IQ = Ni, Fi = Array.isArray, cI = Fi, pi = 9007199254740991;
function ki(A) {
  return typeof A == "number" && A > -1 && A % 1 == 0 && A <= pi;
}
var gQ = ki, Si = Fg, Ri = gQ;
function Ji(A) {
  return A != null && Ri(A.length) && !Si(A);
}
var Sg = Ji, Yi = Sg, Ui = XA;
function Li(A) {
  return Ui(A) && Yi(A);
}
var Hi = Li, iI = {}, bi = {
  get exports() {
    return iI;
  },
  set exports(A) {
    iI = A;
  }
};
function mi() {
  return !1;
}
var xi = mi;
(function(A, I) {
  var g = YA, B = xi, Q = I && !I.nodeType && I, C = Q && !0 && A && !A.nodeType && A, E = C && C.exports === Q, e = E ? g.Buffer : void 0, t = e ? e.isBuffer : void 0, o = t || B;
  A.exports = o;
})(bi, iI);
var vi = rI, qi = gQ, Ki = XA, Oi = "[object Arguments]", zi = "[object Array]", Ti = "[object Boolean]", ji = "[object Date]", _i = "[object Error]", Xi = "[object Function]", Zi = "[object Map]", Pi = "[object Number]", Vi = "[object Object]", Wi = "[object RegExp]", $i = "[object Set]", An = "[object String]", In = "[object WeakMap]", gn = "[object ArrayBuffer]", Bn = "[object DataView]", Qn = "[object Float32Array]", Cn = "[object Float64Array]", En = "[object Int8Array]", en = "[object Int16Array]", tn = "[object Int32Array]", nn = "[object Uint8Array]", on = "[object Uint8ClampedArray]", sn = "[object Uint16Array]", an = "[object Uint32Array]", U = {};
U[Qn] = U[Cn] = U[En] = U[en] = U[tn] = U[nn] = U[on] = U[sn] = U[an] = !0;
U[Oi] = U[zi] = U[gn] = U[Ti] = U[Bn] = U[ji] = U[_i] = U[Xi] = U[Zi] = U[Pi] = U[Vi] = U[Wi] = U[$i] = U[An] = U[In] = !1;
function rn(A) {
  return Ki(A) && qi(A.length) && !!U[vi(A)];
}
var cn = rn;
function Dn(A) {
  return function(I) {
    return A(I);
  };
}
var ln = Dn, JI = {}, hn = {
  get exports() {
    return JI;
  },
  set exports(A) {
    JI = A;
  }
};
(function(A, I) {
  var g = zB, B = I && !I.nodeType && I, Q = B && !0 && A && !A.nodeType && A, C = Q && Q.exports === B, E = C && g.process, e = function() {
    try {
      var t = Q && Q.require && Q.require("util").types;
      return t || E && E.binding && E.binding("util");
    } catch {
    }
  }();
  A.exports = e;
})(hn, JI);
var fn = cn, yn = ln, DB = JI, lB = DB && DB.isTypedArray, wn = lB ? yn(lB) : fn, BQ = wn;
function un(A, I) {
  if (!(I === "constructor" && typeof A[I] == "function") && I != "__proto__")
    return A[I];
}
var QQ = un, dn = kg, Gn = OI, Mn = Object.prototype, Nn = Mn.hasOwnProperty;
function Fn(A, I, g) {
  var B = A[I];
  (!(Nn.call(A, I) && Gn(B, g)) || g === void 0 && !(I in A)) && dn(A, I, g);
}
var pn = Fn, kn = pn, Sn = kg;
function Rn(A, I, g, B) {
  var Q = !g;
  g || (g = {});
  for (var C = -1, E = I.length; ++C < E; ) {
    var e = I[C], t = B ? B(g[e], A[e], e, g, A) : void 0;
    t === void 0 && (t = A[e]), Q ? Sn(g, e, t) : kn(g, e, t);
  }
  return g;
}
var Jn = Rn;
function Yn(A, I) {
  for (var g = -1, B = Array(A); ++g < A; )
    B[g] = I(g);
  return B;
}
var Un = Yn, Ln = 9007199254740991, Hn = /^(?:0|[1-9]\d*)$/;
function bn(A, I) {
  var g = typeof A;
  return I = I ?? Ln, !!I && (g == "number" || g != "symbol" && Hn.test(A)) && A > -1 && A % 1 == 0 && A < I;
}
var CQ = bn, mn = Un, xn = IQ, vn = cI, qn = iI, Kn = CQ, On = BQ, zn = Object.prototype, Tn = zn.hasOwnProperty;
function jn(A, I) {
  var g = vn(A), B = !g && xn(A), Q = !g && !B && qn(A), C = !g && !B && !Q && On(A), E = g || B || Q || C, e = E ? mn(A.length, String) : [], t = e.length;
  for (var o in A)
    (I || Tn.call(A, o)) && !(E && // Safari 9 has enumerable `arguments.length` in strict mode.
    (o == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    Q && (o == "offset" || o == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    C && (o == "buffer" || o == "byteLength" || o == "byteOffset") || // Skip index properties.
    Kn(o, t))) && e.push(o);
  return e;
}
var _n = jn;
function Xn(A) {
  var I = [];
  if (A != null)
    for (var g in Object(A))
      I.push(g);
  return I;
}
var Zn = Xn, Pn = UA, Vn = $B, Wn = Zn, $n = Object.prototype, Ao = $n.hasOwnProperty;
function Io(A) {
  if (!Pn(A))
    return Wn(A);
  var I = Vn(A), g = [];
  for (var B in A)
    B == "constructor" && (I || !Ao.call(A, B)) || g.push(B);
  return g;
}
var go = Io, Bo = _n, Qo = go, Co = Sg;
function Eo(A) {
  return Co(A) ? Bo(A, !0) : Qo(A);
}
var EQ = Eo, eo = Jn, to = EQ;
function io(A) {
  return eo(A, to(A));
}
var no = io, hB = WB, oo = RI, so = Ci, ao = ei, ro = li, fB = IQ, yB = cI, co = Hi, Do = iI, lo = Fg, ho = UA, fo = eA, yo = BQ, wB = QQ, wo = no;
function uo(A, I, g, B, Q, C, E) {
  var e = wB(A, g), t = wB(I, g), o = E.get(t);
  if (o) {
    hB(A, g, o);
    return;
  }
  var s = C ? C(e, t, g + "", A, I, E) : void 0, n = s === void 0;
  if (n) {
    var D = yB(t), d = !D && Do(t), u = !D && !d && yo(t);
    s = t, D || d || u ? yB(e) ? s = e : co(e) ? s = ao(e) : d ? (n = !1, s = oo(t, !0)) : u ? (n = !1, s = so(t, !0)) : s = [] : fo(t) || fB(t) ? (s = e, fB(e) ? s = wo(e) : (!ho(e) || lo(e)) && (s = ro(t))) : n = !1;
  }
  n && (E.set(t, s), Q(s, t, B, C, E), E.delete(t)), hB(A, g, s);
}
var Go = uo, Mo = xt, No = WB, Fo = Pt, po = Go, ko = UA, So = EQ, Ro = QQ;
function eQ(A, I, g, B, Q) {
  A !== I && Fo(I, function(C, E) {
    if (Q || (Q = new Mo()), ko(C))
      po(A, I, E, g, eQ, B, Q);
    else {
      var e = B ? B(Ro(A, E), C, E + "", A, I, Q) : void 0;
      e === void 0 && (e = C), No(A, E, e);
    }
  }, So);
}
var Jo = eQ;
function Yo(A) {
  return A;
}
var tQ = Yo;
function Uo(A, I, g) {
  switch (g.length) {
    case 0:
      return A.call(I);
    case 1:
      return A.call(I, g[0]);
    case 2:
      return A.call(I, g[0], g[1]);
    case 3:
      return A.call(I, g[0], g[1], g[2]);
  }
  return A.apply(I, g);
}
var Lo = Uo, Ho = Lo, uB = Math.max;
function bo(A, I, g) {
  return I = uB(I === void 0 ? A.length - 1 : I, 0), function() {
    for (var B = arguments, Q = -1, C = uB(B.length - I, 0), E = Array(C); ++Q < C; )
      E[Q] = B[I + Q];
    Q = -1;
    for (var e = Array(I + 1); ++Q < I; )
      e[Q] = B[Q];
    return e[I] = g(E), Ho(A, this, e);
  };
}
var mo = bo;
function xo(A) {
  return function() {
    return A;
  };
}
var vo = xo, qo = vo, dB = VB, Ko = tQ, Oo = dB ? function(A, I) {
  return dB(A, "toString", {
    configurable: !0,
    enumerable: !1,
    value: qo(I),
    writable: !0
  });
} : Ko, zo = Oo, To = 800, jo = 16, _o = Date.now;
function Xo(A) {
  var I = 0, g = 0;
  return function() {
    var B = _o(), Q = jo - (B - g);
    if (g = B, Q > 0) {
      if (++I >= To)
        return arguments[0];
    } else
      I = 0;
    return A.apply(void 0, arguments);
  };
}
var Zo = Xo, Po = zo, Vo = Zo, Wo = Vo(Po), $o = Wo, As = tQ, Is = mo, gs = $o;
function Bs(A, I) {
  return gs(Is(A, I, As), A + "");
}
var Qs = Bs, Cs = OI, Es = Sg, es = CQ, ts = UA;
function is(A, I, g) {
  if (!ts(g))
    return !1;
  var B = typeof I;
  return (B == "number" ? Es(g) && es(I, g.length) : B == "string" && I in g) ? Cs(g[I], A) : !1;
}
var ns = is, os = Qs, ss = ns;
function as(A) {
  return os(function(I, g) {
    var B = -1, Q = g.length, C = Q > 1 ? g[Q - 1] : void 0, E = Q > 2 ? g[2] : void 0;
    for (C = A.length > 3 && typeof C == "function" ? (Q--, C) : void 0, E && ss(g[0], g[1], E) && (C = Q < 3 ? void 0 : C, Q = 1), I = Object(I); ++B < Q; ) {
      var e = g[B];
      e && A(I, e, B, C);
    }
    return I;
  });
}
var rs = as, cs = Jo, Ds = rs, ls = Ds(function(A, I, g) {
  cs(A, I, g);
}), iQ = ls;
const j = {}, YI = H({}), GB = function(A) {
  if (A.name)
    if (j[A.name])
      console.warn("重复组件名:" + A.name);
    else {
      let I = iQ({}, KI, A);
      j[A.name] = I, YI[I.name] = {
        name: I.name,
        type: I.type,
        label: I.label,
        icon: I.icon
      }, sI.vm ? sI.vm.component(A.name, j[A.name]) : console.error("组件注册失败，缺少app");
    }
  else
    console.warn("缺少组件名");
}, hs = function(A) {
  Array.isArray(A) ? A.forEach((I) => {
    j[I] && (delete j[I], delete YI[I]);
  }) : A && typeof A == "string" && j[A] && (delete j[A], delete YI[A]);
}, fs = function() {
  return Object.values(j);
}, Ig = function(A) {
  A instanceof Array ? A.forEach((I) => {
    GB(I);
  }) : typeof A == "object" && GB(A);
}, ys = function() {
  Object.values(j).forEach((I) => {
    sI.vm ? (j[I.name] = iQ({}, KI, I), sI.vm.component(I.name, j[I.name])) : console.error("组件注册失败，缺少app");
  });
}, ws = [
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
], DI = {
  // 模块类型，content场景主内容，overlayer基础弹层内容
  get level() {
    return [{
      name: "主内容区",
      type: "content"
    }, {
      name: "覆盖弹层",
      type: "overlayer"
    }];
  },
  /**
   * 事件类型，click点击，interval定时器，timeout延迟
   * name：具体事件名称描述
   * event：事件类型
   * pams：附加参数
   * actions：需要执行的动作列表
   */
  get events() {
    return [
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
    ];
  },
  // 组件类型
  get component() {
    return [
      { name: "图表", type: "chart" },
      { name: "文本", type: "text" },
      { name: "表格", type: "table" },
      { name: "形状", type: "shape" },
      { name: "菜单", type: "menu" },
      { name: "媒体", type: "media" },
      { name: "地图", type: "map" },
      { name: "3D", type: "3d" },
      { name: "其它", type: "other" }
    ];
  },
  // 动作类型 ：显示隐藏，发送数据
  get actions() {
    return ws;
  },
  // 数据类型
  get dataTypes() {
    return [
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
    ];
  }
};
var mA = [];
const NA = {
  // 当前已安装组件
  get items() {
    return YI;
  },
  getComponentItems: fs,
  // 返回组件默认数据
  getComponentDefaultData(A) {
    let I = j[A];
    if (!I)
      return {};
    let g = {}, B = I.mixins || [], Q = {};
    for (const C of B)
      C.props && Object.assign(Q, C.props);
    Object.assign(Q, I.props);
    for (const C in Q)
      if (Object.hasOwnProperty.call(Q, C)) {
        const E = Q[C];
        typeof E.default == "function" ? g[C] = E.default.call() : g[C] = E.default;
      }
    return g.id = "sprite_" + _(10), g.name = A, g.type = I.type || "", g;
  },
  // 返回组件自定义事件
  getComponentEvents(A) {
    let I = j[A];
    if (!I)
      return [];
    let g = [], B = I.emits || [];
    for (const Q in B)
      g.push({
        name: B[Q],
        event: B[Q],
        pams: "",
        actions: /^solo-/.test(A) ? null : []
      });
    return g;
  },
  // 返回组件事件（含默认事件）
  getEvents(A) {
    return [...DI.events, ...this.getComponentEvents(A)];
  },
  // 添加组件
  add(A) {
    if (A)
      if (Array.isArray(A))
        A.forEach((I) => {
          mA.find((g) => g.name == I.name) ? console.warn(I.name + "组件名重复") : mA.push(I);
        });
      else
        return mA.find((I) => I.name == A.name) ? (console.warn(A.name + "组件名重复"), !1) : (mA.push(A), !0);
  },
  // 删除所有组件
  removeAll() {
    mA = [], hs(Object.keys(j));
  },
  // 安装组件
  install(A) {
    A ? Array.isArray(A) ? A.forEach((I) => {
      this.add(I) && Ig(I);
    }) : this.add(A) && Ig(A) : Ig(mA);
  },
  reload() {
    ys();
  }
}, rA = {}, F = H({}), N = {}, M = {}, sA = H({}), GA = {};
let us = 1, ds = 1, MB = 1;
const NB = function(A, I = {}) {
  let g = NA.getComponentDefaultData(A), B = g.title, Q = {
    id: null,
    gpid: null,
    mid: null,
    name: g.name,
    type: g.type,
    title: B ? B + MB++ : "元件 " + MB++,
    x: g.x || 0,
    y: g.y || 0,
    width: g.width || 0,
    height: g.height || 0,
    data: g.data || "",
    opacity: g.opacity || 100,
    visible: g.visible || !0,
    selected: g.selected || !1,
    hover: g.hover || !1,
    background: g.background,
    border: g.border,
    shadow: g.shadow,
    anim: g.anim || {}
  };
  return Object.assign(Q, I), Q.id || (Q.id = "sprite_" + _(10)), Q;
}, FB = function(A, I) {
  let g = H({});
  return typeof A == "string" && NA.items[A] ? (Object.assign(g, NB(A, I)), M[g.id] = g, rA[g.id] = g, g) : typeof A == "object" ? A.id && M[A.id] ? (I ? Object.assign(M[A.id], I) : console.warn("元件" + A.id + "已存在"), M[A.id]) : A.name ? (Object.assign(g, NB(A.name, A), I), M[g.id] = g, rA[g.id] = g, M[g.id]) : (console.error("元件添加失败", A), null) : null;
}, nQ = function(A) {
  return M[A] ? (delete M[A], delete rA[A], A) : !1;
}, pB = function(A = {}) {
  let I = {
    type: "content",
    name: "vx-module",
    title: "页面" + us++,
    x: 0,
    y: 0,
    components: []
  };
  return Object.assign(I, A), I.id || (I.id = "mdu_" + _(10)), I;
}, CI = function(A, I) {
  if (A)
    return F[A] || (F[A] = pB(Object.assign({ id: A }, I)), rA[A] = F[A]), F[A].components || (F[A].components = []), F[A];
  if (I) {
    let g = pB(I);
    return F[g.id] = g, rA[g.id] = F[g.id], F[g.id];
  } else
    return null;
}, ng = function(A) {
  return F[A] ? (delete F[A], delete rA[A], A) : !1;
}, kB = function(A = {}) {
  let I = H({
    id: null,
    gpid: null,
    mid: null,
    name: "vx-sprite-group",
    type: "group",
    title: "组合" + ds++,
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
    components: []
  });
  return Object.assign(I, A), I.id || (I.id = "group_" + _(10)), I;
}, og = function(A, I) {
  if (A)
    return N[A] ? Object.assign(N[A], I) : (N[A] = kB(Object.assign({ id: A }, I)), rA[A] = N[A]), N[A];
  {
    let g = kB(I);
    return N[g.id] = g, rA[g.id] = g, N[g.id];
  }
}, UI = function(A) {
  return N[A] ? (delete N[A], delete rA[A], A) : !1;
}, T = function(A) {
  let I = {
    id: null,
    gpid: null,
    mid: null,
    visible: null,
    name: null,
    type: null,
    zIndex: null
  };
  for (const g in I)
    Object.hasOwnProperty.call(I, g) && (I[g] = A[g] || null);
  return I;
}, oQ = function(A) {
  return F[A].components && F[A].components.length > 0 && F[A].components.map((g) => ({
    id: g.id,
    zIndex: g.zIndex || 0
  })).sort((g, B) => B.zIndex - g.zIndex)[0].zIndex || 0;
}, EA = H({}), qA = function(A) {
  if (A && typeof A == "object") {
    let I = A.id = A.id || "AC_" + _(10);
    return EA[I] = A, I;
  } else
    return null;
}, sg = function(A) {
  EA[A] && delete EA[A];
}, Gs = function(A) {
  return EA[A];
}, Ms = function() {
  return EA;
}, LA = function(A) {
  if (A) {
    let I = [];
    if (A instanceof Array)
      for (const g in A)
        I.push(EA[A[g]]);
    else
      typeof A == "string" && EA[A] && I.push(EA[A]);
    return I;
  } else
    return Object.values(EA);
}, Rg = function() {
  Object.keys(EA).forEach((I) => {
    delete EA[I];
  });
}, Ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clearAction: Rg,
  delActionData: sg,
  getActionData: Gs,
  getActionList: LA,
  getActionsData: Ms,
  setActionData: qA
}, Symbol.toStringTag, { value: "Module" }));
function Fs(A, I) {
  let g = I.id;
  return {
    style: {
      cursor: S.clickCursor
    },
    onClickCapture: function(B) {
      if (G.emit(b.CLICK_SPRITE, T(I), B), A.actions) {
        let Q = $(LA(A.actions));
        A.actionValue && typeof A.actionValue == "object" && Q.forEach((C) => {
          A.actionValue[C.id] && (C.value = A.actionValue[C.id]);
        }), G.execute(Q, g);
      }
    }
  };
}
const SB = function(A, I, g) {
  let B = $(LA(A));
  for (let Q = 0, C = B.length; Q < C; Q++)
    g && B[Q].value && typeof B[Q].value == "object" ? Object.assign(B[Q].value, g) : g && (B[Q].value = g);
  G.execute(B, I);
};
function ps(A, I, g) {
  let B = {};
  if (g && j[g]) {
    let C = (j[g].emits || []).find((E) => E == A.event);
    C && typeof C == "string" ? /^[a-zA-Z][-_a-zA-Z0-9_-]{1,32}$/.test(C) ? B["on" + C.toLowerCase().replace(/( |^)[a-z]/g, (E) => E.toUpperCase())] = function(E) {
      /^solo-/.test(C) && E ? A.actions && A.actions instanceof Array && A.actions.length > 0 ? SB(A.actions, I, E) : G.execute($(LA(E)), I) : A.actions && A.actions instanceof Array && SB(A.actions, I, E);
    } : console.warn(C + "无效的事件名定义") : console.warn(A.event + "事件没有定义");
  }
  return B;
}
function ks(A, I) {
  let g = null;
  return {
    timeout: "1",
    onTimeout(B) {
      let Q = B.detail.value;
      if (g && (clearTimeout(g), g = null), Q == "mounted") {
        let E = (A.pams || {}).delay || 1e3;
        g = setTimeout(() => {
          A.actions && G.execute(LA(A.actions), I);
        }, parseInt(E));
      }
    }
  };
}
let hA = {};
const LI = {
  add(A, I = 1e3, g) {
    let B = g || "it_" + _(7);
    return hA[B] && clearInterval(hA[B]), hA[B] = setInterval(A, I), B;
  },
  del(A) {
    if (A)
      hA[A] && (clearInterval(hA[A]), delete hA[A]);
    else {
      for (const I in hA)
        clearInterval(hA[I]);
      hA = {};
    }
  }
};
function Ss(A, I) {
  let g = null;
  return {
    interval: "1",
    onInterval(B) {
      if (g && (LI.del(g), g = null), B.detail.value == "mounted") {
        let C = (A.pams || {}).delay || 1e3;
        g = LI.add(() => {
          A.actions && G.execute(LA(A.actions), I);
        }, parseInt(C));
      }
    }
  };
}
function RB(A, I = {}, g = "") {
  let B = {}, Q = I.id;
  return g && (B = {
    style: {}
  }), S.interaction ? A.forEach((C) => {
    switch (C.event) {
      case "click":
        Object.assign(B, Fs(C, I));
        break;
      case "timeout":
        Object.assign(B, ks(C, Q));
        break;
      case "interval":
        Object.assign(B, Ss(C, Q));
        break;
      default:
        Object.assign(B, ps(C, Q, g));
    }
  }) : I.type == "group" && !I.gpid ? Object.assign(B, {
    onClickCapture(C) {
      C.stopPropagation(), G.emit(b.CLICK_SPRITE, T(I), C);
    },
    onDblclickCapture(C) {
      C.stopPropagation(), G.emit(b.DBLCLICK_SPRITE, T(I), C);
    },
    onMousedownCapture(C) {
      G.emit(b.MOUSEDOWN_SPRITE, T(I), C);
    },
    onMouseoverCapture(C) {
      G.emit(b.MOUSEOVER_SPRITE, T(I), C);
    },
    onMouseoutCapture(C) {
      G.emit(b.MOUSEOUT_SPRITE, T(I), C);
    },
    onMouseupCapture(C) {
      G.emit(b.MOUSEUP_SPRITE, T(I), C);
    },
    onMouseleaveCapture(C) {
      G.emit(b.MOUSELEAVE_SPRITE, T(I), C);
    },
    onMouseenterCapture(C) {
      G.emit(b.MOUSEENTER_SPRITE, T(I), C);
    }
  }) : Object.assign(B, {
    onClick(C) {
      C.stopPropagation(), G.emit(b.CLICK_SPRITE, T(I), C);
    },
    onMousedown(C) {
      G.emit(b.MOUSEDOWN_SPRITE, T(I), C);
    },
    onMouseover(C) {
      G.emit(b.MOUSEOVER_SPRITE, T(I), C);
    },
    onMouseout(C) {
      G.emit(b.MOUSEOUT_SPRITE, T(I), C);
    },
    onMouseup(C) {
      G.emit(b.MOUSEUP_SPRITE, T(I), C);
    },
    onMouseleave(C) {
      G.emit(b.MOUSELEAVE_SPRITE, T(I), C);
    },
    onMouseenter(C) {
      G.emit(b.MOUSEENTER_SPRITE, T(I), C);
    }
  }), B;
}
const sQ = function(A, I = {}) {
  let g = Object.assign({
    id: A.id,
    gpid: A.gpid,
    mid: A.mid,
    visible: A.visible,
    name: A.name,
    title: A.title,
    type: A.type,
    zIndex: A.zIndex
  }, I);
  return sA[g.id] = g, sA[g.id];
}, aQ = function(A, I = "default") {
  if (A && typeof A == "object" && A.id && N[A.id])
    return console.warn("组合" + A.id + "已存在"), null;
  let g = null;
  A ? g = og(A.id, Object.assign({ mid: I }, A)) : g = og(null, { mid: I }), g.zIndex || (g.zIndex = oQ(I) + 1);
  let B = sQ(g);
  return Lg(B, g.mid), GA[g.id] = aI(g, (Q) => {
    sA[Q.id] && Object.keys(sA[Q.id]).forEach((E) => {
      sA[Q.id][E] = Q[E];
    });
  }), g;
}, Jg = function(A, I) {
  I && A && typeof A != "string" && (N[I] && N[I].components ? N[I].components.push(A) : console.warn("模块添加元件数据失败"));
}, rQ = function(A, I) {
  let g = !1;
  return I && A && N[I] && N[I].components && (g = aA(N[I].components, "id", A)), g || console.warn("模块删除元件数据失败"), g;
}, Rs = function(A, I = "default") {
  if (Array.isArray(A)) {
    let g = { x1: 0, y1: 0, x2: 0, y2: 0 }, B = uQ(I), Q = [], C = [], E = [];
    if (A.forEach((t, o) => {
      let s = B.find((D) => D.id == t), n = s ? s.type == "group" ? N[t] : M[t] : null;
      if (n)
        if (o == 0 ? (g.x1 = n.x, g.y1 = n.y, g.x2 = n.x + n.width, g.y2 = n.y + n.height) : (g.x1 = n.x < g.x1 ? n.x : g.x1, g.y1 = n.y < g.y1 ? n.y : g.y1, g.x2 = n.x + n.width > g.x2 ? n.x + n.width : g.x2, g.y2 = n.y + n.height > g.y2 ? n.y + n.height : g.y2), n.type == "group") {
          let D = n.components ? n.components.map((d) => d.id) : [];
          C.push(...D), Q.push(n.id);
        } else
          C.push(t);
      else
        E.push(t);
    }), E.length > 0)
      return console.warn(E.join(), "元件无法组合"), !1;
    Q.length > 0 && Q.forEach((t) => {
      cQ(t);
    }), Yg(A, !1);
    let e = aQ({
      x: g.x1,
      y: g.y1,
      width: g.x2 - g.x1,
      height: g.y2 - g.y1
    }, I);
    return e ? (A.forEach((t) => {
      M[t] && (M[t].x -= g.x1, M[t].y -= g.y1, M[t].gpid = e.id, M[t].hover = !1, M[t].selected = !1, Jg(wQ(M[t]), e.id));
    }), e) : !1;
  } else
    return !1;
}, cQ = function(A) {
  return A && N[A] && N[A].components && Hg(N[A].id, N[A].mid) ? (GA[A] && typeof GA[A] == "function" && GA[A](), N[A].components.forEach((I) => {
    M[I.id].x += N[A].x, M[I.id].y += N[A].y, M[I.id].gpid = null, Lg(I, I.mid);
  }), UI(A)) : !1;
}, DQ = function(A) {
  return N[A] || null;
}, lQ = function() {
  return N;
}, hQ = function() {
  return Object.values(N);
}, fQ = function(A) {
  if (A) {
    if (Array.isArray(A))
      return A.forEach((I) => {
        UI(I);
      }), !0;
    if (typeof A == "string")
      return UI(A);
  }
  return !1;
}, yQ = function() {
  Object.keys(N).forEach((I) => {
    UI(I);
  });
}, Js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addElement: Jg,
  bind: Rs,
  clearGroupsData: yQ,
  createSimpleGroup: sQ,
  delElement: rQ,
  delGroupData: fQ,
  getGroup: DQ,
  getGroupArrData: hQ,
  getGroups: lQ,
  newGroupData: aQ,
  unbind: cQ
}, Symbol.toStringTag, { value: "Module" })), JB = function(A, I = !0) {
  if (M[A] && M[A].mid) {
    let g = Hg(A, M[A].mid);
    return I && nQ(A), g && GA[A] && typeof GA[A] == "function" && GA[A](), !!g;
  } else
    console.warn("删除模块内元件失败");
  return !1;
}, Ys = function(A) {
  Object.keys(A).forEach((g) => {
    delete A[g];
  });
}, Us = function(A) {
  if (!A)
    return console.warn("添加元件失败,无数据信息"), !1;
  if (!A.mid)
    return console.warn("添加元件失败,无模块id" + mid), !1;
  A.zIndex || (A.zIndex = oQ(A.mid) + 1);
  let I = wQ(A);
  if (A.gpid && og(A.gpid))
    Jg(I, A.gpid);
  else if (CI(A.mid))
    Lg(I, A.mid);
  else
    return console.warn("添加元件失败", I), !1;
  return GA[A.id] = aI(A, (g) => {
    sA[g.id] && Object.keys(sA[g.id]).forEach((Q) => {
      sA[g.id][Q] = g[Q];
    });
  }), M[A.id];
}, wQ = function(A, I = {}) {
  let g = Object.assign({
    id: A.id,
    gpid: A.gpid,
    mid: A.mid,
    visible: A.visible,
    name: A.name,
    title: A.title,
    type: A.type,
    zIndex: A.zIndex
  }, I);
  return sA[g.id] = g, sA[g.id];
}, Ls = function(A, I = "default", g = null) {
  let B = null;
  if (typeof A == "string" && typeof I == "object" ? B = FB(A, I) : typeof A == "object" && (B = FB(A, { mid: I, gpid: g })), Us(B))
    return M[B.id];
  throw "添加元件失败";
}, Yg = function(A, I = !0) {
  if (A) {
    if (Array.isArray(A))
      return A.forEach((g) => {
        JB(g, I);
      }), !0;
    if (typeof A == "string")
      return JB(A, I);
  }
  return !1;
}, Hs = function() {
  return M;
}, bs = function(A) {
  let I = Object.values(M);
  return A ? I.filter((g) => g.mid == A) : I;
}, ms = function(A) {
  return M[A] ? (Object.assign(M[A], Object.assign({}, NA.getComponentDefaultData(M[A].name), M[A])), M[A]) : null;
}, xs = function() {
  Object.keys(M).forEach((I) => {
    Ys(M[I]), nQ(I);
  });
}, Ug = function(A) {
  if (M[A])
    return Yg(A);
  if (N[A])
    return Array.isArray(N[A].components) && N[A].components.length > 0 && (N[A].components.forEach((I) => {
      Ug(I.id);
    }), N[A].gpid ? rQ(A) : Hg(A, N[A].mid)), fQ(A);
}, vs = function(A) {
  return A && typeof A == "object" ? A.id ? F[A.id] ? (console.warn("模块" + A.id + "已存在"), null) : CI(A.id, A) : CI(null, A) : typeof A == "string" ? F[A] ? (console.warn("模块" + A + "已存在"), null) : CI(A) : CI();
}, Lg = function(A, I = "default") {
  I && A && typeof A != "string" && (F[I] && F[I].components ? F[I].components.push(A) : console.warn("模块添加元件数据失败"));
}, Hg = function(A, I = "default") {
  return I && A ? F[I] && F[I].components ? aA(F[I].components, "id", A) : (console.warn("模块删除元件数据失败"), !1) : (console.warn("mid && id 无效"), !1);
}, qs = function(A, I = !1) {
  if (I && F[A]) {
    let g = F[A].components;
    Array.isArray(g) && g.map((Q) => Q.id).forEach((Q) => {
      Ug(Q);
    }), ng(A);
  } else
    return ng(A);
}, Ks = function(A) {
  return F[A] || null;
}, Os = function() {
  return F;
}, zs = function(A, I = "type") {
  if (A) {
    let g = Object.values(F);
    return typeof A == "string" ? g.filter((B) => B[I] == A) : typeof A == "function" ? g.filter((B) => A(B)) : g;
  } else
    return Object.values(F);
}, uQ = function(A = "default") {
  return F[A] && F[A].components ? F[A].components : [];
}, Ts = function() {
  Object.keys(F).forEach((I) => {
    ng(I);
  });
}, ag = vs, js = qs, _s = Os, Xs = Ks, bg = zs, dQ = uQ, GQ = Ts, nI = Ls, Zs = Yg, mg = Hs, xg = bs, tA = ms, MQ = xs, XI = Js, ZI = DQ, vg = lQ, NQ = hQ, FQ = yQ, Ps = Ug, pQ = function(A) {
  Array.isArray(A) && A.length > 0 ? A.forEach((I) => {
    if (typeof I == "object") {
      let g = [];
      I.components && (g = I.components, delete I.components), ag(I), g.forEach((B) => {
        if (B.type == "group") {
          let Q = [];
          B.components && (Q = B.components, delete B.components), XI.newGroupData(B, I.id), Q.forEach((C) => {
            nI(C, I.id, C.gpid);
          });
        } else
          nI(B, I.id);
      });
    }
  }) : ag({ id: "default" });
}, qg = function() {
  MQ(), FQ(), GQ();
}, Vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addSpriteData: nI,
  clearGroupsData: FQ,
  clearModulesData: GQ,
  clearSprites: qg,
  clearSpritesData: MQ,
  delElementData: Ps,
  delModuleData: js,
  delSpriteData: Zs,
  elements: rA,
  fillData: pQ,
  getGroup: ZI,
  getGroupArrData: NQ,
  getGroups: vg,
  getModule: Xs,
  getModuleComponents: dQ,
  getModuleList: bg,
  getModules: _s,
  getSpriteArrData: xg,
  getSpriteData: tA,
  getSpritesData: mg,
  group: XI,
  newMouleData: ag
}, Symbol.toStringTag, { value: "Module" }));
var Ws = rI, $s = XA, Aa = "[object Symbol]";
function Ia(A) {
  return typeof A == "symbol" || $s(A) && Ws(A) == Aa;
}
var Kg = Ia, ga = cI, Ba = Kg, Qa = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ca = /^\w*$/;
function Ea(A, I) {
  if (ga(A))
    return !1;
  var g = typeof A;
  return g == "number" || g == "symbol" || g == "boolean" || A == null || Ba(A) ? !0 : Ca.test(A) || !Qa.test(A) || I != null && A in Object(I);
}
var ea = Ea, kQ = PB, ta = "Expected a function";
function Og(A, I) {
  if (typeof A != "function" || I != null && typeof I != "function")
    throw new TypeError(ta);
  var g = function() {
    var B = arguments, Q = I ? I.apply(this, B) : B[0], C = g.cache;
    if (C.has(Q))
      return C.get(Q);
    var E = A.apply(this, B);
    return g.cache = C.set(Q, E) || C, E;
  };
  return g.cache = new (Og.Cache || kQ)(), g;
}
Og.Cache = kQ;
var ia = Og, na = ia, oa = 500;
function sa(A) {
  var I = na(A, function(B) {
    return g.size === oa && g.clear(), B;
  }), g = I.cache;
  return I;
}
var aa = sa, ra = aa, ca = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Da = /\\(\\)?/g, la = ra(function(A) {
  var I = [];
  return A.charCodeAt(0) === 46 && I.push(""), A.replace(ca, function(g, B, Q, C) {
    I.push(Q ? C.replace(Da, "$1") : B || g);
  }), I;
}), ha = la;
function fa(A, I) {
  for (var g = -1, B = A == null ? 0 : A.length, Q = Array(B); ++g < B; )
    Q[g] = I(A[g], g, A);
  return Q;
}
var ya = fa, YB = Mg, wa = ya, ua = cI, da = Kg, Ga = 1 / 0, UB = YB ? YB.prototype : void 0, LB = UB ? UB.toString : void 0;
function SQ(A) {
  if (typeof A == "string")
    return A;
  if (ua(A))
    return wa(A, SQ) + "";
  if (da(A))
    return LB ? LB.call(A) : "";
  var I = A + "";
  return I == "0" && 1 / A == -Ga ? "-0" : I;
}
var Ma = SQ, Na = Ma;
function Fa(A) {
  return A == null ? "" : Na(A);
}
var pa = Fa, ka = cI, Sa = ea, Ra = ha, Ja = pa;
function Ya(A, I) {
  return ka(A) ? A : Sa(A, I) ? [A] : Ra(Ja(A));
}
var Ua = Ya, La = Kg, Ha = 1 / 0;
function ba(A) {
  if (typeof A == "string" || La(A))
    return A;
  var I = A + "";
  return I == "0" && 1 / A == -Ha ? "-0" : I;
}
var ma = ba, xa = Ua, va = ma;
function qa(A, I) {
  I = xa(I, A);
  for (var g = 0, B = I.length; A != null && g < B; )
    A = A[va(I[g++])];
  return g && g == B ? A : void 0;
}
var Ka = qa, Oa = Ka;
function za(A, I, g) {
  var B = A == null ? void 0 : Oa(A, I);
  return B === void 0 ? g : B;
}
var HI = za;
const BA = H({
  title: "",
  id: "A_" + _(10),
  creattime: null,
  uptime: null,
  cover: null,
  description: ""
}), QA = H({ width: S.width, height: S.height }), dA = H({
  backgroundColor: S.backgroundColor
}), v = H({ value: 1, h: 1, w: 1, mode: S.scaleMode }), RQ = EC(() => {
  if (S.scale)
    if (v.mode == "auto")
      if (v.w > v.h) {
        let A = QA.width * (v.w - v.h) / 2 / v.value;
        return "scale(" + v.value + ")  translateX(" + A + "px)";
      } else {
        let A = QA.height * (v.h - v.w) / 2 / v.value;
        return "scale(" + v.value + ")  translateY(" + A + "px)";
      }
    else
      return v.mode == "fill" ? "scale(" + v.w + "," + v.h + ")" : "";
  else
    return "";
}), JQ = function(A) {
  if (A) {
    let I = A;
    typeof I == "string" && (I = document.querySelector(S.dom));
    let g = I.getBoundingClientRect();
    return g.width > 0 && g.height > 0 ? g : I.parentElement && I.parentElement.localName != "body" ? JQ(I.parentElement) : {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}, HB = function(A) {
  let I = JQ(S.dom) || {
    width: window.innerWidth,
    height: window.innerHeight
  }, g = I.height / A.height, B = I.width / A.width;
  return g < B ? { value: g, h: g, w: B } : { value: B, h: g, w: B };
}, AA = H({
  host: "",
  method: "GET",
  headers: {}
}), YQ = function(A) {
  return A.id ? BA.id = A.id : BA.id = "A_" + _(10), A.title && (BA.title = A.title), A.creattime && (BA.creattime = A.creattime), A.uptime && (BA.uptime = A.uptime), A.cover && (BA.cover = A.cover), A.description && (BA.description = A.description), A.width && (QA.width = A.width), A.height && (QA.height = A.height), A.scaleMode && (v.mode = A.scaleMode), Object.assign(v, HB(QA)), Object.assign(dA, A.background), Object.assign(AA, A.network), window.addEventListener("resize", (I) => {
    Object.assign(v, HB(QA));
  }), {
    info: BA,
    size: QA,
    scale: v,
    transform: RQ,
    background: dA
  };
}, Ta = {
  info: BA,
  size: QA,
  background: dA
}, UQ = function() {
  QA.width = S.width, QA.height = S.height;
  for (const A in dA)
    Object.hasOwnProperty.call(dA, A) && delete dA[A];
  dA.backgroundColor = S.backgroundColor, v.mode = S.scaleMode, Object.assign(AA, {
    host: "",
    method: "GET",
    headers: {}
  }), Object.assign(BA, {
    title: "",
    id: "A_" + _(10),
    creattime: null,
    uptime: null,
    cover: null,
    description: ""
  });
}, LQ = function() {
  return {
    info: BA,
    size: QA,
    scale: v,
    transform: RQ,
    background: dA,
    get network() {
      return AA;
    }
  };
}, ja = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appBase: Ta,
  getAppData: LQ,
  initAppData: YQ,
  network: AA,
  resetAppData: UQ
}, Symbol.toStringTag, { value: "Module" }));
var _a = YA, Xa = _a.isFinite;
function Za(A) {
  return typeof A == "number" && Xa(A);
}
var Pa = Za;
let gg = "token", Bg = "json";
function Va(A) {
  gg = AA.token || "token", Bg = AA.responseType || "json";
  let I = /^(?!https?:\/\/)/.test(A.url) ? AA.host + A.url : A.url, g = localStorage.getItem(gg) ? { Authorization: localStorage.getItem(gg) } : {}, B = A.customize || {}, Q = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };
  (!AA.headers || typeof AA.headers == "string" && (AA.headers == "" || AA.headers == "null")) && (Q = {});
  let C = Object.assign({
    method: A.method || AA.method,
    mode: AA.mode || "cors",
    signal: A.signal,
    headers: new Headers(Object.assign(Q, g, A.headers))
  }, B);
  return C.method.toUpperCase() == "POST" ? C.body = C.headers.get("Content-Type") == "application/json" ? JSON.stringify(A.data) : A.data : I = /\?/.test(I) ? I + "&" + ig(A.data) : I + "?" + ig(A.data), new Promise((E, e) => {
    fetch(I, C).then((t) => Bg ? t[Bg]() : t.json(), e).then(E);
  });
}
const vA = {}, rg = [];
class Wa extends tI {
  constructor(I) {
    super(), this.id = "R_" + _(10), this.controller = new AbortController(), this.signal = this.controller.signal, this.isloading = !1, this.status = "wait", this.options = I, this.data = null, this.err = null;
  }
  //    请求数据
  request(I) {
    this.status != "request" && (this.isloading = !0, this.status = "request", this.emit("request", this), Va({
      url: this.options.url || "",
      data: this.options.body || {},
      method: this.options.method,
      signal: this.signal
    }).then((g) => {
      this.data = g, this.status = "success", this.isloading = !1, this.err = null, this.emit("success", g), I && I(this);
    }, (g) => {
      this.status = "success", this.isloading = !1, this.err = g, this.emit("error", g), I && I(this);
    }));
  }
  destroy() {
    this.controller && this.controller.abort(), this.controller = null, this.signal = null, this.isloading = null, this.status = null, this.options = null, this.data = null, this.err = null, vA[this.id] && (aA(rg, "id", this.id), delete vA[this.id]);
  }
}
function $a(A) {
  let I = A.url || "", g = A.body || {}, B = (I + JSON.stringify(g)).split("").sort().join(""), Q = rg.find((E) => E.test == B);
  if (Q && vA[Q.id])
    return vA[Q.id];
  let C = new Wa(A);
  return rg.push({
    id: C.id,
    test: B
  }), vA[C.id] = C, vA[C.id];
}
class Ar extends tI {
  constructor(I, g, B, Q, C) {
    super(), this.id = "RD_" + _(10), this.url = I, this.body = B, this.method = Q, this.data = H({}), this.sourceData = null, this.loading = dg(!1), this.isloading = !1, this.itval = C || 0, this.it = null, this.status = "wait", this.err = null, this.extractRule = g ? H(g) : H({});
    let E = $a({ url: I, body: ug(B), method: Q });
    E.on("request", () => {
      this.loading.value = !0, this.isloading = !0, this.status = "request";
    }), E.on("success", (e) => {
      this.sourceData = e, this.status = "success", this.loading.value = !1, this.isloading = !1, this.err = null, this.fillData(e), this.emit("success", this);
    }), E.on("error", (e) => {
      this.status = "success", this.loading.value = !1, this.isloading = !1, this.err = e, this.emit("error", e);
    }), this.req = E, this.unwatch = null, this.watchRule();
  }
  watchRule() {
    this.stopWatch(), this.watch = aI(this.extractRule, () => {
      this.sourceData && this.fillData(this.sourceData);
    }), this.sourceData && this.fillData(this.sourceData);
  }
  stopWatch() {
    this.unwatch && (this.unwatch(), this.unwatch = null);
  }
  setData(I = {}) {
    I.url && (this.url = I.url, this.req.options.url = I.url), I.method && (this.method = I.method, this.req.options.method = I.method), I.body && (this.body = I.body, this.req.options.body = ug(I.body)), Pa(I.itval) && (this.itval = I.itval);
  }
  // 修改规则
  setExtractRule(I) {
    if (this.extractRule instanceof Array && I instanceof Array || this.extractRule instanceof Object && I instanceof Object && !Array.isArray(this.extractRule) && !Array.isArray(I)) {
      for (const g in this.extractRule)
        delete this.extractRule[g];
      Object.assign(this.extractRule, I);
    } else
      this.extractRule = H($(I)), this.watchRule();
  }
  // 返回规则（返回的是一个非响应式的数据对象）
  getExtractRule() {
    return $(this.extractRule);
  }
  //    请求数据
  request(I) {
    this.req.request(I), this.setinterval(this.itval);
  }
  // 开启轮询请求
  setinterval(I = 0) {
    S.interaction && I && I > 0 && (this.it = LI.add(() => {
      this.req.request();
    }, I * 1e3));
  }
  // 关闭轮询请求
  stopInterval() {
    this.it && (LI.del(this.it), this.it = null);
  }
  //    清除数据
  clearData() {
    this.status == "request" && this.req.controller && this.req.controller.abort(), Object.keys(this.data).forEach((g) => {
      delete this.data[g];
    });
  }
  /**
   * 填充数据
   * @param {*} data 
   */
  fillData(I) {
    this.clearData(), this.extractRule && (this.extractRule.x || this.extractRule.name || this.extractRule instanceof Array) ? Object.assign(this.data, { data: Ng(I, this.extractRule) }) : Object.assign(this.data, { data: I });
  }
  /**
   * 销毁
   */
  destroy() {
    this.req.destroy(), this.clearData(), this.stopWatch(), this.stopInterval(), this.extractRule = null;
  }
}
function bB(A, I, g, B, Q) {
  return new Ar(A, I, g, B, Q);
}
const Y = {}, zA = H([]), Ir = function() {
  return H({
    x: {
      name: "",
      path: "",
      mapKey: ""
    },
    y: []
  });
}, HQ = function() {
  return zA;
}, bI = function(A, I = null, g = null, B = null, Q = null) {
  let C = null;
  if (eA(A))
    C = bB(A.url, A.extractRule, A.body, A.method, A.itval), A.id && (C.id = A.id), zA.push(C), Y[C.id] = C;
  else if (typeof A == "string")
    if (!Y[A])
      C = bB(A, I, g, B, Q), zA.push(C), Y[C.id] = C;
    else
      return Y[A];
  return C;
}, Qg = function(A) {
  aA(zA, "id", A), Y[A].destroy(), delete Y[A];
}, bQ = function(A) {
  if (A)
    if (Y[A])
      Qg(A);
    else
      for (let I in Y)
        Y[I].url == A && Qg(I);
  else
    Object.keys(Y).forEach((g) => {
      Qg(g);
    }), zA.splice(0, zA.length);
}, mQ = function(A) {
  if (Y[A])
    return Y[A];
  for (let I in Y)
    if (Y[I].url == A)
      return Y[I];
  return null;
}, zg = function() {
  bQ();
}, xQ = function(A = !1, I = "", g) {
  if (I && Y[I])
    Y[I].request(g);
  else
    for (let B in Y)
      if (Y[B].status != "success" || Y[B].err || A)
        if (I) {
          if (Y[B].url == I) {
            Y[B].request(g);
            return;
          }
        } else
          Y[B].request(g);
}, gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: bI,
  clearRemote: zg,
  createExtractRule: Ir,
  del: bQ,
  getList: HQ,
  getRemote: mQ,
  remotes: Y,
  requestData: xQ
}, Symbol.toStringTag, { value: "Module" })), J = {}, MA = H([]), mB = function(A = "", I = "", g = "source") {
  return {
    id: "GD_" + _(10),
    name: I,
    type: g,
    value: A instanceof Object ? H(A) : dg(A),
    uptime: new Date().getTime()
  };
}, Cg = function(A) {
  return H({
    get id() {
      return A.id || "";
    },
    get type() {
      return A.type || "";
    },
    name: A.name,
    value: A.value,
    uptime: A.uptime || ""
  });
}, cg = function(A, I = "", g = "source") {
  if (eA(A) && A.id)
    return J[A.id] || (A.type == "remote" && (A.value = bI(A.value).id), J[A.id] = Cg(A), MA.push(J[A.id])), J[A.id];
  if (A) {
    let B = {};
    return g == "remote" && (A = bI(A).id), B = mB(A, I, g), J[B.id] = Cg(B), MA.push(J[B.id]), J[B.id];
  } else
    return console.warn("无效全局数据添加"), !1;
}, Br = function(A, I) {
  let g = null;
  if (typeof A == "string" && eA(I) && J[A] ? (g = A, J[g] = I) : eA(A) && typeof A.id == "string" && J[A.id] && (g = A.id, J[g] = A), g) {
    let B = MA.findIndex((Q) => Q.id == g);
    if (B > -1)
      return MA[B] = J[g];
  }
  return !1;
}, Qr = function(A) {
  J[A] && (aA(MA, "id", A), delete J[A]);
}, Cr = function(A) {
  return J[A] || null;
}, vQ = function() {
  return MA;
}, Tg = function() {
  Object.keys(J).forEach((I) => {
    delete J[I];
  }), MA.splice(0, MA.length);
}, Er = J, er = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GData: Er,
  addGData: cg,
  clearGlobal: Tg,
  default: J,
  delGData: Qr,
  editGData: Br,
  getGData: Cr,
  getGDataList: vQ
}, Symbol.toStringTag, { value: "Module" })), CA = {}, TA = H([]), tr = function(A) {
  let I = Object.assign({
    id: "PD_" + _(10),
    uptime: new Date().getTime()
  }, A);
  return I.name && !I.title && (I.title = I.name), H(I);
}, qQ = function(A) {
  if (eA(A)) {
    if (A.id && CA[A.id])
      return console.warn("插件存在"), null;
    if (A.url) {
      let I = tr(A);
      return CA[I.id] = I, TA.push(I), CA[I.id];
    }
  }
  return console.warn("插件添加失败", A), null;
}, ir = function(A) {
  if (CA[A])
    aA(TA, "id", A), delete CA[A];
  else if (A) {
    let g = Object.values(CA).find((B) => B.url == A);
    g && CA[g.id] && (aA(TA, "id", g.id), delete CA[g.id]);
  }
}, nr = function(A) {
  return CA[A] || null;
}, KQ = function() {
  return TA;
}, jg = function() {
  Object.keys(CA).forEach((I) => {
    delete CA[I];
  }), TA.splice(0, TA.length);
}, or = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addPlugin: qQ,
  clearPlugin: jg,
  delPlugin: ir,
  getPlugin: nr,
  getPluginList: KQ
}, Symbol.toStringTag, { value: "Module" })), sr = "data:application/wasm;base64,AGFzbQEAAAAB4gEfYAJ/fwF/YAN/f38Bf2ACf38AYAN/f38AYAF/AX9gAX8AYAV/f39/fwBgBH9/f38AYAR/f39/AX9gAAF/YAV/f39/fwF/YAZ/f39/f38AYAF/AX5gAABgBn9/f39/fwF/YAd/f39/f39/AGAJf39/f39/f39/AGAJf39/f39/fn5+AGAFf39+f38AYAV/f31/fwBgA39/fABgBX9/fH9/AGAEf35/fwBgBH99f38AYAR/fH9/AGAHf39/f39/fwF/YAN/fH8Bf2AEf3x/fwF/YAJ+fwF/YAN+f38Bf2ABfAF/Ar8LHxEuL3JpY2hfd2FzbV9iZy5qcxpfX3diaW5kZ2VuX29iamVjdF9kcm9wX3JlZgAFES4vcmljaF93YXNtX2JnLmpzFV9fd2JpbmRnZW5fbnVtYmVyX25ldwAeES4vcmljaF93YXNtX2JnLmpzFF9fd2JpbmRnZW5faXNfb2JqZWN0AAQRLi9yaWNoX3dhc21fYmcuanMZX193YmluZGdlbl9qc3ZhbF9sb29zZV9lcQAAES4vcmljaF93YXNtX2JnLmpzFl9fd2JpbmRnZW5fYm9vbGVhbl9nZXQABBEuL3JpY2hfd2FzbV9iZy5qcxVfX3diaW5kZ2VuX251bWJlcl9nZXQAAhEuL3JpY2hfd2FzbV9iZy5qcxVfX3diaW5kZ2VuX3N0cmluZ19nZXQAAhEuL3JpY2hfd2FzbV9iZy5qcxRfX3diaW5kZ2VuX2Vycm9yX25ldwAAES4vcmljaF93YXNtX2JnLmpzGl9fd2JnX2dldF8yN2ZlM2RhYzFjNGQwMjI0AAARLi9yaWNoX3dhc21fYmcuanMdX193YmdfbGVuZ3RoX2U0OThmYmMyNGY5YzFkNGYABBEuL3JpY2hfd2FzbV9iZy5qcxpfX3diZ19uZXdfYjUyNWRlMTdmNDRhODk0MwAJES4vcmljaF93YXNtX2JnLmpzFl9fd2JpbmRnZW5faXNfZnVuY3Rpb24ABBEuL3JpY2hfd2FzbV9iZy5qcxtfX3diZ19uZXh0X2I3ZDUzMGMwNGZkOGIyMTcABBEuL3JpY2hfd2FzbV9iZy5qcxtfX3diZ19uZXh0Xzg4NTYwZWMwNmEwOTRkZWEABBEuL3JpY2hfd2FzbV9iZy5qcxtfX3diZ19kb25lXzFlYmVjMDNiYmQ5MTk4NDMABBEuL3JpY2hfd2FzbV9iZy5qcxxfX3diZ192YWx1ZV82YWM4ZGE1Y2M1YjNlZmRhAAQRLi9yaWNoX3dhc21fYmcuanMfX193YmdfaXRlcmF0b3JfNTVmMTE0NDQ2MjIxYWE1YQAJES4vcmljaF93YXNtX2JnLmpzGl9fd2JnX2dldF9iYWY0ODU1ZjlhOTg2MTg2AAARLi9yaWNoX3dhc21fYmcuanMbX193YmdfY2FsbF85NWQxZWE0ODhkMDNlNGU4AAARLi9yaWNoX3dhc21fYmcuanMaX193Ymdfc2V0XzE3MjI0YmM1NDhkZDFkN2IAAxEuL3JpY2hfd2FzbV9iZy5qcx5fX3diZ19pc0FycmF5XzM5ZDI4OTk3YmY2Yjk2YjQABBEuL3JpY2hfd2FzbV9iZy5qcy1fX3diZ19pbnN0YW5jZW9mX0FycmF5QnVmZmVyX2E2OWYwMmVlNGM0ZjUwNjUABBEuL3JpY2hfd2FzbV9iZy5qcyRfX3diZ19pc1NhZmVJbnRlZ2VyXzhjNDc4OTAyOWU4ODUxNTkABBEuL3JpY2hfd2FzbV9iZy5qcx1fX3diZ19idWZmZXJfY2Y2NWMwN2RlMzRiOWEwOAAEES4vcmljaF93YXNtX2JnLmpzGl9fd2JnX25ld181MzdiNzM0MWNlOTBiYjMxAAQRLi9yaWNoX3dhc21fYmcuanMaX193Ymdfc2V0XzE3NDk5ZThhYTQwMDNlYmQAAxEuL3JpY2hfd2FzbV9iZy5qcx1fX3diZ19sZW5ndGhfMjdhMmFmZThhYjQyYjA5ZgAEES4vcmljaF93YXNtX2JnLmpzLF9fd2JnX2luc3RhbmNlb2ZfVWludDhBcnJheV8wMWNlYmU3OWNhNjA2Y2NhAAQRLi9yaWNoX3dhc21fYmcuanMXX193YmluZGdlbl9kZWJ1Z19zdHJpbmcAAhEuL3JpY2hfd2FzbV9iZy5qcxBfX3diaW5kZ2VuX3Rocm93AAIRLi9yaWNoX3dhc21fYmcuanMRX193YmluZGdlbl9tZW1vcnkACQOcApoCAwYEDwMIBgAABQYAAQUIGwEDAg4DEAUCGgIBBQUFAQADAQIEBQUDBQIDHAECAwsABRELBQAZBAoAAAIBHQADAwAABQECAAkABQIDAwIDAgIDAgIAAAAEAwICAgIDAwICAAYIAwcAAQEHBwIDBwIAAgIAAAMFAAADAgYCCwACAgMDAwMDAAMAAgECAgAEAwcAAAAAAAAAAAMDAQICBAUCAwIBAgMAAQEBAgMCDQIAAgICAgIKAgICBAQCAAAAAAICBQQCBQUCAgUDAQYDDgACBhITChUCBwUAAQUEBAIFFAMACAIEAQAFAAYAAAAFAgQABAQBBAQCBAAAAwMDAAMBAAAABAAFAA0ABAQEBAACAAEBAAAABAQMDAwFBAUBcAFWVgUDAQARBgkBfwFBgIDAAAsHsgEKBm1lbW9yeQIACXNlY3JldGtleQCKAQh2YWxpZGF0ZQCBAQdlbmNyeXB0AKMBB2RlY3J5cHQAugERX193YmluZGdlbl9tYWxsb2MA1wESX193YmluZGdlbl9yZWFsbG9jAOgBH19fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIAoQIPX193YmluZGdlbl9mcmVlAIECFF9fd2JpbmRnZW5fZXhuX3N0b3JlAIsCCaUBAQBBAQtV/AHZAYUCwwG4ArACogKGAiaFArgCpgK4AsQBV64BjQGjApECZrQBuAKEAqQC9gGeAuwBzAFkiQK4AtoB9wH0Ae4B7gHwAZoB8QHxAe4B7wHyAesBigKxAZsCqQG4AsUBWK8B9QG3ArUC5gFwiQHLAYwCtgK4AsYBlgKwAdwBqgGrApcCjgKGAqUBU7gCtgKgAkp0tQGfAp0CcrIBrQJzCurdBJoCviwCHH8EfiMAQcAKayIEJAACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgASkDACIfUEUEQCABKQMIIiBQDQEgASkDECIhUA0CIB8gIXwiIiAfVA0DIB8gIFQNBCABLAAaIREgAS8BGCEBIAQgHz4CACAEQQFBAiAfQoCAgIAQVCIDGzYCoAEgBEEAIB9CIIinIAMbNgIEIARBCGpBAEGYARCvAhogBCAgPgKoASAEQQFBAiAgQoCAgIAQVCIDGzYCyAIgBEEAICBCIIinIAMbNgKsASAEQbABakEAQZgBEK8CGiAEICE+AtACIARBAUECICFCgICAgBBUIgMbNgLwAyAEQQAgIUIgiKcgAxs2AtQCIARB2AJqQQBBmAEQrwIaIARB+ANqQQRyQQBBnAEQrwIaIARBATYC+AMgBEEBNgKYBSABrUIwhkIwhyAiQn98eX1CwprB6AR+QoChzaC0AnxCIIinIgNBEHRBEHUhDwJAIAFBEHRBEHUiBkEATgRAIAQgARAqGiAEQagBaiABECoaIARB0AJqIAEQKhoMAQsgBEH4A2pBACAGa0EQdEEQdRAqGgsCQCAPQX9MBEAgBEEAIA9rQRB0QRB1IgEQMSAEQagBaiABEDEgBEHQAmogARAxDAELIARB+ANqIANB//8DcRAxCyAEKAKgASEGIARBmAlqIARBoAEQrgIaIAQgBjYCuAogBiAEKALwAyIIIAYgCEsbIgNBKEsNEiADRQRAQQAhAwwHCyADQQFxIQkgA0EBRg0FIANBfnEhCiAEQZgJaiEBIARB0AJqIQUDQCABIAcgASgCACILIAUoAgBqIg1qIhA2AgAgAUEEaiIHIAcoAgAiEiAFQQRqKAIAaiIHIA0gC0kgECANSXJqIg02AgAgByASSSANIAdJciEHIAVBCGohBSABQQhqIQEgCiAMQQJqIgxHDQALDAULQeeqwABBHEGEq8AAEL4BAAtBlKvAAEEdQbSrwAAQvgEAC0HEq8AAQRxB4KvAABC+AQALQfCrwABBNkGorMAAEL4BAAtBuKzAAEE3QfCswAAQvgEACyAJBH8gDEECdCIBIARBmAlqaiINIA0oAgAiDSAEQdACaiABaigCAGoiASAHaiIFNgIAIAEgDUkgBSABSXIFIAcLRQ0AIANBJ0sNASAEQZgJaiADQQJ0akEBNgIAIANBAWohAwsgBCADNgK4CiAEKAKYBSINIAMgDSADSxsiAUEpTw0MIAFBAnQhAQJAA0AgAQRAQX8gAUF8aiIBIARBmAlqaigCACIDIAEgBEH4A2pqKAIAIgVHIAMgBUsbIgVFDQEMAgsLQX9BACABGyEFCyAFIBFOBEAgBkEpTw0PIAZFBEBBACEGDAQLIAZBf2pB/////wNxIgFBAWoiA0EDcSEFIAFBA0kEQCAEIQFCACEfDAMLIANB/P///wdxIQcgBCEBQgAhHwNAIAEgATUCAEIKfiAffCIfPgIAIAFBBGoiAyADNQIAQgp+IB9CIIh8Ih8+AgAgAUEIaiIDIAM1AgBCCn4gH0IgiHwiHz4CACABQQxqIgMgAzUCAEIKfiAfQiCIfCIfPgIAIB9CIIghHyABQRBqIQEgB0F8aiIHDQALDAILIA9BAWohDwwJCyADQShBpNjAABCeAQALIAUEQANAIAEgATUCAEIKfiAffCIfPgIAIAFBBGohASAfQiCIIR8gBUF/aiIFDQALCyAfpyIBRQ0AIAZBJ0sNASAEIAZBAnRqIAE2AgAgBkEBaiEGCyAEIAY2AqABIAQoAsgCIgNBKU8NCCADRQRAQQAhAwwDCyADQX9qQf////8DcSIBQQFqIgZBA3EhBSABQQNJBEAgBEGoAWohAUIAIR8MAgsgBkH8////B3EhByAEQagBaiEBQgAhHwNAIAEgATUCAEIKfiAffCIfPgIAIAFBBGoiBiAGNQIAQgp+IB9CIIh8Ih8+AgAgAUEIaiIGIAY1AgBCCn4gH0IgiHwiHz4CACABQQxqIgYgBjUCAEIKfiAfQiCIfCIfPgIAIB9CIIghHyABQRBqIQEgB0F8aiIHDQALDAELIAZBKEGk2MAAEJ4BAAsgBQRAA0AgASABNQIAQgp+IB98Ih8+AgAgAUEEaiEBIB9CIIghHyAFQX9qIgUNAAsLIB+nIgFFDQAgA0EnSw0BIARBqAFqIANBAnRqIAE2AgAgA0EBaiEDCyAEIAM2AsgCIAhBKU8NASAIRQRAIARBADYC8AMMBAsgCEF/akH/////A3EiAUEBaiIDQQNxIQUgAUEDSQRAIARB0AJqIQFCACEfDAMLIANB/P///wdxIQcgBEHQAmohAUIAIR8DQCABIAE1AgBCCn4gH3wiHz4CACABQQRqIgMgAzUCAEIKfiAfQiCIfCIfPgIAIAFBCGoiAyADNQIAQgp+IB9CIIh8Ih8+AgAgAUEMaiIDIAM1AgBCCn4gH0IgiHwiHz4CACAfQiCIIR8gAUEQaiEBIAdBfGoiBw0ACwwCCyADQShBpNjAABCeAQALIAhBKEGk2MAAEJkCAAsgBQRAA0AgASABNQIAQgp+IB98Ih8+AgAgAUEEaiEBIB9CIIghHyAFQX9qIgUNAAsLIAQgH6ciAQR/IAhBJ0sNAiAEQdACaiAIQQJ0aiABNgIAIAhBAWoFIAgLNgLwAwsgBEGgBWogBEH4A2pBoAEQrgIaIAQgDTYCwAYgBEGgBWpBARAqIRUgBCgCmAUhASAEQcgGaiAEQfgDakGgARCuAhogBCABNgLoByAEQcgGakECECohFiAEKAKYBSEBIARB8AdqIARB+ANqQaABEK4CGiAEIAE2ApAJIARB8AdqQQMQKiEXAkAgBCgCoAEiBiAEKAKQCSISIAYgEksbIgNBKE0EQCAEQZwFaiEYIARBxAZqIRkgBEHsB2ohGiAEKAKYBSEQIAQoAsAGIRMgBCgC6AchFEEAIQgDQCAIIQ0gA0ECdCEBAkADQCABBEBBfyABIBpqKAIAIgggAUF8aiIBIARqKAIAIgVHIAggBUsbIgVFDQEMAgsLQX9BACABGyEFC0EAIQkgBUEBTQRAIAMEQEEBIQdBACEMIANBAUcEQCADQX5xIQkgBCIBQfAHaiEFA0AgASAHIAEoAgAiByAFKAIAQX9zaiIGaiIKNgIAIAFBBGoiCCAIKAIAIgsgBUEEaigCAEF/c2oiCCAGIAdJIAogBklyaiIGNgIAIAggC0kgBiAISXIhByAFQQhqIQUgAUEIaiEBIAkgDEECaiIMRw0ACwsgA0EBcQR/IAQgDEECdCIBaiIGIAYoAgAiBiABIBdqKAIAQX9zaiIBIAdqIgg2AgAgASAGSSAIIAFJcgUgBwtFDQgLIAQgAzYCoAFBCCEJIAMhBgsgBiAUIAYgFEsbIgNBKU8NBCADQQJ0IQECQANAIAEEQEF/IAEgGWooAgAiCCABQXxqIgEgBGooAgAiBUcgCCAFSxsiBUUNAQwCCwtBf0EAIAEbIQULAkAgBUEBSwRAIAYhAwwBCyADBEBBASEHQQAhDCADQQFHBEAgA0F+cSEKIAQiAUHIBmohBQNAIAEgByABKAIAIgcgBSgCAEF/c2oiBmoiCzYCACABQQRqIgggCCgCACIOIAVBBGooAgBBf3NqIgggBiAHSSALIAZJcmoiBjYCACAIIA5JIAYgCElyIQcgBUEIaiEFIAFBCGohASAKIAxBAmoiDEcNAAsLIANBAXEEfyAEIAxBAnQiAWoiBiAGKAIAIgYgASAWaigCAEF/c2oiASAHaiIINgIAIAEgBkkgCCABSXIFIAcLRQ0ICyAEIAM2AqABIAlBBHIhCQsCQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAyATIAMgE0sbIghBKUkEQCAIQQJ0IQECQANAIAEEQEF/IAEgGGooAgAiBiABQXxqIgEgBGooAgAiBUcgBiAFSxsiBUUNAQwCCwtBf0EAIAEbIQULAkAgBUEBSwRAIAMhCAwBCyAIBEBBASEHQQAhDCAIQQFHBEAgCEF+cSEKIAQiAUGgBWohBQNAIAEgByABKAIAIgcgBSgCAEF/c2oiA2oiCzYCACABQQRqIgYgBigCACIOIAVBBGooAgBBf3NqIgYgAyAHSSALIANJcmoiAzYCACAGIA5JIAMgBklyIQcgBUEIaiEFIAFBCGohASAKIAxBAmoiDEcNAAsLIAhBAXEEfyAEIAxBAnQiAWoiAyADKAIAIgMgASAVaigCAEF/c2oiASAHaiIGNgIAIAEgA0kgBiABSXIFIAcLRQ0YCyAEIAg2AqABIAlBAmohCQsgCCAQIAggEEsbIgZBKU8NFyAGQQJ0IQECQANAIAEEQEF/IAFBfGoiASAEQfgDamooAgAiAyABIARqKAIAIgVHIAMgBUsbIgVFDQEMAgsLQX9BACABGyEFCwJAIAVBAUsEQCAIIQYMAQsgBgRAQQEhB0EAIQwgBkEBRwRAIAZBfnEhCiAEIgFB+ANqIQUDQCABIAcgASgCACIHIAUoAgBBf3NqIgNqIgs2AgAgAUEEaiIIIAgoAgAiDiAFQQRqKAIAQX9zaiIIIAMgB0kgCyADSXJqIgM2AgAgCCAOSSADIAhJciEHIAVBCGohBSABQQhqIQEgCiAMQQJqIgxHDQALCyAGQQFxBH8gBCAMQQJ0IgFqIgMgAygCACIDIARB+ANqIAFqKAIAQX9zaiIBIAdqIgg2AgAgASADSSAIIAFJcgUgBwtFDRgLIAQgBjYCoAEgCUEBaiEJCyANQRFGDQIgAiANaiAJQTBqOgAAIAYgBCgCyAIiCiAGIApLGyIBQSlPDRUgDUEBaiEIIAFBAnQhAQJAA0AgAQRAQX8gAUF8aiIBIARBqAFqaigCACIDIAEgBGooAgAiBUcgAyAFSxsiA0UNAQwCCwtBf0EAIAEbIQMLIARBmAlqIARBoAEQrgIaIAQgBjYCuAogBiAEKALwAyILIAYgC0sbIglBKEsNBAJAIAlFBEBBACEJDAELQQAhB0EAIQwgCUEBRwRAIAlBfnEhGyAEQZgJaiEBIARB0AJqIQUDQCABIAcgASgCACIcIAUoAgBqIgdqIh02AgAgAUEEaiIOIA4oAgAiHiAFQQRqKAIAaiIOIAcgHEkgHSAHSXJqIgc2AgAgDiAeSSAHIA5JciEHIAVBCGohBSABQQhqIQEgGyAMQQJqIgxHDQALCyAJQQFxBH8gDEECdCIBIARBmAlqaiIFIAcgBSgCACIFIARB0AJqIAFqKAIAaiIBaiIHNgIAIAEgBUkgByABSXIFIAcLRQ0AIAlBJ0sNAiAEQZgJaiAJQQJ0akEBNgIAIAlBAWohCQsgBCAJNgK4CiAQIAkgECAJSxsiAUEpTw0VIAFBAnQhAQJAA0AgAQRAQX8gAUF8aiIBIARBmAlqaigCACIFIAEgBEH4A2pqKAIAIgdHIAUgB0sbIgVFDQEMAgsLQX9BACABGyEFCyADIBFIIAUgEUhyRQRAIAZBKU8NGCAGRQRAQQAhBgwJCyAGQX9qQf////8DcSIBQQFqIgNBA3EhBSABQQNJBEAgBCEBQgAhHwwICyADQfz///8HcSEHIAQhAUIAIR8DQCABIAE1AgBCCn4gH3wiHz4CACABQQRqIgMgAzUCAEIKfiAfQiCIfCIfPgIAIAFBCGoiAyADNQIAQgp+IB9CIIh8Ih8+AgAgAUEMaiIDIAM1AgBCCn4gH0IgiHwiHz4CACAfQiCIIR8gAUEQaiEBIAdBfGoiBw0ACwwHCyAFIBFODQUgAyARSARAIARBARAqGiAEKAKgASIBIAQoApgFIgMgASADSxsiAUEpTw0WIAFBAnQhASAEQXxqIQMgBEH0A2ohBgJAA0AgAQRAIAEgA2ohBSABIAZqIQcgAUF8aiEBQX8gBygCACIHIAUoAgAiBUcgByAFSxsiBUUNAQwCCwtBf0EAIAEbIQULIAVBAk8NBgsgDUERTw0DIAIgCGohBkF/IQUgDSEBAkADQCABQX9GDQEgBUEBaiEFIAEgAmogAUF/aiIDIQEtAABBOUYNAAsgAiADaiIBQQFqIgYgBi0AAEEBajoAACANIANBAmpJDQYgAUECakEwIAUQrwIaDAYLIAJBMToAACANBEAgAkEBakEwIA0QrwIaCyAIQRFJBEAgBkEwOgAAIA9BAWohDyANQQJqIQgMBgsgCEERQeCtwAAQngEACyAIQShBpNjAABCZAgALIAlBKEGk2MAAEJ4BAAtBEUERQcCtwAAQngEACyAIQRFB0K3AABCZAgALIAlBKEGk2MAAEJkCAAsgCEERTQRAIAAgDzsBCCAAIAg2AgQgACACNgIAIARBwApqJAAPCyAIQRFB8K3AABCZAgALIAUEQANAIAEgATUCAEIKfiAffCIfPgIAIAFBBGohASAfQiCIIR8gBUF/aiIFDQALCyAfpyIBRQ0AIAZBJ0sNASAEIAZBAnRqIAE2AgAgBkEBaiEGCyAEIAY2AqABIApBKU8NASAKRQRAQQAhCgwECyAKQX9qQf////8DcSIBQQFqIgNBA3EhBSABQQNJBEAgBEGoAWohAUIAIR8MAwsgA0H8////B3EhByAEQagBaiEBQgAhHwNAIAEgATUCAEIKfiAffCIfPgIAIAFBBGoiAyADNQIAQgp+IB9CIIh8Ih8+AgAgAUEIaiIDIAM1AgBCCn4gH0IgiHwiHz4CACABQQxqIgMgAzUCAEIKfiAfQiCIfCIfPgIAIB9CIIghHyABQRBqIQEgB0F8aiIHDQALDAILIAZBKEGk2MAAEJ4BAAsgCkEoQaTYwAAQmQIACyAFBEADQCABIAE1AgBCCn4gH3wiHz4CACABQQRqIQEgH0IgiCEfIAVBf2oiBQ0ACwsgH6ciAUUNACAKQSdLDQEgBEGoAWogCkECdGogATYCACAKQQFqIQoLIAQgCjYCyAIgC0EpTw0BIAtFBEBBACELDAQLIAtBf2pB/////wNxIgFBAWoiA0EDcSEFIAFBA0kEQCAEQdACaiEBQgAhHwwDCyADQfz///8HcSEHIARB0AJqIQFCACEfA0AgASABNQIAQgp+IB98Ih8+AgAgAUEEaiIDIAM1AgBCCn4gH0IgiHwiHz4CACABQQhqIgMgAzUCAEIKfiAfQiCIfCIfPgIAIAFBDGoiAyADNQIAQgp+IB9CIIh8Ih8+AgAgH0IgiCEfIAFBEGohASAHQXxqIgcNAAsMAgsgCkEoQaTYwAAQngEACyALQShBpNjAABCZAgALIAUEQANAIAEgATUCAEIKfiAffCIfPgIAIAFBBGohASAfQiCIIR8gBUF/aiIFDQALCyAfpyIBRQ0AIAtBJ0sNAyAEQdACaiALQQJ0aiABNgIAIAtBAWohCwsgBCALNgLwAyAGIBIgBiASSxsiA0EoTQ0ACwsMAgsgC0EoQaTYwAAQngEACyAIQShBpNjAABCeAQALIANBKEGk2MAAEJkCAAsgAUEoQaTYwAAQmQIAC0G02MAAQRpBpNjAABC+AQALIAZBKEGk2MAAEJkCAAucJgIcfwN+IwBB0AZrIgUkAAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAEpAwAiIlBFBEAgASkDCCIjUA0BIAEpAxAiIVANAiAhICJ8ICJUDQMgIiAjVA0EIAEvARghByAFICI+AgggBUEBQQIgIkKAgICAEFQiARs2AqgBIAVBACAiQiCIpyABGzYCDCAFQRBqQQBBmAEQrwIaIAVBsAFqQQRyQQBBnAEQrwIaIAVBATYCsAEgBUEBNgLQAiAHrUIwhkIwhyAiQn98eX1CwprB6AR+QoChzaC0AnxCIIinIgZBEHRBEHUhEgJAIAdBEHRBEHUiAUEATgRAIAVBCGogBxAqGgwBCyAFQbABakEAIAFrQRB0QRB1ECoaCwJAIBJBf0wEQCAFQQhqQQAgEmtBEHRBEHUQMQwBCyAFQbABaiAGQf//A3EQMQsgBSgC0AIhDSAFQagFaiAFQbABakGgARCuAhogBSANNgLIBgJAIAMiCkEKSQ0AAkAgDUEoSwRAIA0hAQwBCyAFQaAFaiEWIA0hAQNAAkAgAUUNACABQX9qQf////8DcSIJQQFqIgZBAXEgAUECdCEBAn8gCUUEQEIAISEgBUGoBWogAWoMAQsgBkH+////B3EhCCABIBZqIQFCACEhA0AgAUEEaiIGIAY1AgAgIUIghoQiI0KAlOvcA4AiIT4CACABIAE1AgAgIyAhQoCU69wDfn1CIIaEIiNCgJTr3AOAIiE+AgAgIyAhQoCU69wDfn0hISABQXhqIQEgCEF+aiIIDQALIAFBCGoLIQFFDQAgAUF8aiIBIAE1AgAgIUIghoRCgJTr3AOAPgIACyAKQXdqIgpBCU0NAiAFKALIBiIBQSlJDQALCwwSCwJ/An8CQCAKQQJ0QbiowABqKAIAIgkEQCAFKALIBiIKQSlPDQlBACAKRQ0DGiAKQX9qQf////8DcSIGQQFqIgFBAXEhByAKQQJ0IQogCa0hIiAGDQFCACEhIAVBqAVqIApqDAILQevYwABBG0Gk2MAAEL4BAAsgAUH+////B3EhCCAFIApqQaAFaiEBQgAhIQNAIAFBBGoiBiAGNQIAICFCIIaEIiMgIoAiIT4CACABIAE1AgAgIyAhICJ+fUIghoQiIyAigCIhPgIAICMgISAifn0hISABQXhqIQEgCEF+aiIIDQALIAFBCGoLIQEgBwRAIAFBfGoiASABNQIAICFCIIaEICKAPgIACyAFKALIBgsiASAFKAKoASIMIAEgDEsbIg5BKEsNBiAORQRAQQAhDgwJCyAOQQFxIRMgDkEBRgRAQQAhCgwICyAOQX5xIRBBACEKIAVBqAVqIQEgBUEIaiEIA0AgASABKAIAIhYgCCgCAGoiESAKQQFxaiIJNgIAIAFBBGoiBiAGKAIAIgcgCEEEaigCAGoiCiARIBZJIAkgEUlyaiIGNgIAIAogB0kgBiAKSXIhCiAIQQhqIQggAUEIaiEBIBAgC0ECaiILRw0ACwwHC0HnqsAAQRxBgK7AABC+AQALQZSrwABBHUGQrsAAEL4BAAtBxKvAAEEcQaCuwAAQvgEAC0Hwq8AAQTZBsK7AABC+AQALQbiswABBN0HArsAAEL4BAAsgCkEoQaTYwAAQmQIACyAOQShBpNjAABCZAgALIBMEfyALQQJ0IgcgBUGoBWpqIgEgASgCACIGIAVBCGogB2ooAgBqIgcgCmoiATYCACAHIAZJIAEgB0lyBSAKC0EBcUUNACAOQSdLDQEgBUGoBWogDkECdGpBATYCACAOQQFqIQ4LIAUgDjYCyAYgDiANIA4gDUsbIgFBKU8NCCABQQJ0IQECQANAIAEEQEF/IAFBfGoiASAFQbABamooAgAiByABIAVBqAVqaigCACIGRyAHIAZLGyIIRQ0BDAILC0F/QQAgARshCAsgCEEBTQRAIBJBAWohEgwFCyAMQSlPDQEgDEUEQEEAIQwMBAsgDEF/akH/////A3EiBkEBaiIBQQNxIQggBkEDSQRAIAVBCGohAUIAISEMAwsgAUH8////B3EhCSAFQQhqIQFCACEhA0AgASABNQIAQgp+ICF8IiE+AgAgAUEEaiIGIAY1AgBCCn4gIUIgiHwiIT4CACABQQhqIgYgBjUCAEIKfiAhQiCIfCIhPgIAIAFBDGoiBiAGNQIAQgp+ICFCIIh8IiE+AgAgIUIgiCEhIAFBEGohASAJQXxqIgkNAAsMAgsgDkEoQaTYwAAQngEACyAMQShBpNjAABCZAgALIAgEQANAIAEgATUCAEIKfiAhfCIhPgIAIAFBBGohASAhQiCIISEgCEF/aiIIDQALCyAhpyIBRQ0AIAxBJ0sNAiAFQQhqIAxBAnRqIAE2AgAgDEEBaiEMCyAFIAw2AqgBC0EAIQYCQCASQRB0QRB1IgcgBEEQdEEQdSIBTgRAIBIgBGtBEHRBEHUgAyAHIAFrIANJGyIKDQELQQAhCgwCCyAFQdgCaiAFQbABakGgARCuAhogBSANNgL4AyAFQdgCakEBECohGiAFKALQAiEBIAVBgARqIAVBsAFqQaABEK4CGiAFIAE2AqAFIAVBgARqQQIQKiEbIAUoAtACIQEgBUGoBWogBUGwAWpBoAEQrgIaIAUgATYCyAYgBUGsAWohHCAFQdQCaiEdIAVB/ANqIR4gBUGkBWohHyAFQagFakEDECohICAFKAKoASEGIAUoAtACIQ0gBSgC+AMhFyAFKAKgBSEYIAUoAsgGIRlBACEWAkADQCAWIRACQAJAAkACQAJAAkACQCAGQSlJBEAgEEEBaiEWIAZBAnQhCUEAIQECQAJAAkADQCABIAlGDQEgBUEIaiABaiABQQRqIQEoAgBFDQALIAYgGSAGIBlLGyIHQSlPDQQgB0ECdCEBAkADQCABBEBBfyABIB9qKAIAIgggAUF8aiIBIAVBCGpqKAIAIglHIAggCUsbIghFDQEMAgsLQX9BACABGyEIC0EAIRQgCEECSQRAIAcEQEEBIQtBACEGIAdBAUcEQCAHQX5xIRUgBUEIaiEBIAVBqAVqIQgDQCABIAEoAgAiDiAIKAIAQX9zaiIMIAtBAXFqIhE2AgAgAUEEaiIJIAkoAgAiEyAIQQRqKAIAQX9zaiIPIAwgDkkgESAMSXJqIgk2AgAgDyATSSAJIA9JciELIAhBCGohCCABQQhqIQEgFSAGQQJqIgZHDQALCyAHQQFxBH8gBkECdCIJIAVBCGpqIgEgASgCACIGIAkgIGooAgBBf3NqIgkgC2oiATYCACAJIAZJIAEgCUlyBSALC0EBcUUNFAsgBSAHNgKoAUEIIRQgByEGCyAGIBggBiAYSxsiCUEpTw0HIAlBAnQhAQNAIAFFDQJBfyABIB5qKAIAIgggAUF8aiIBIAVBCGpqKAIAIgdHIAggB0sbIghFDQALDAILIAogEEkNBCAKIANLDQUgCiAQRg0OIAIgEGpBMCAKIBBrEK8CGgwOC0F/QQAgARshCAsCQCAIQQFLBEAgBiEJDAELIAkEQEEBIQtBACEGIAlBAUcEQCAJQX5xIRUgBUEIaiEBIAVBgARqIQgDQCABIAEoAgAiDiAIKAIAQX9zaiIMIAtBAXFqIhE2AgAgAUEEaiIHIAcoAgAiEyAIQQRqKAIAQX9zaiIPIAwgDkkgESAMSXJqIgc2AgAgDyATSSAHIA9JciELIAhBCGohCCABQQhqIQEgFSAGQQJqIgZHDQALCyAJQQFxBH8gBkECdCIHIAVBCGpqIgEgASgCACIGIAcgG2ooAgBBf3NqIgcgC2oiATYCACAHIAZJIAEgB0lyBSALC0EBcUUNEQsgBSAJNgKoASAUQQRyIRQLIAkgFyAJIBdLGyIHQSlPDQUgB0ECdCEBAkADQCABBEBBfyABIB1qKAIAIgggAUF8aiIBIAVBCGpqKAIAIgZHIAggBksbIghFDQEMAgsLQX9BACABGyEICwJAIAhBAUsEQCAJIQcMAQsgBwRAQQEhC0EAIQYgB0EBRwRAIAdBfnEhFSAFQQhqIQEgBUHYAmohCANAIAEgASgCACIOIAgoAgBBf3NqIgwgC0EBcWoiETYCACABQQRqIgkgCSgCACITIAhBBGooAgBBf3NqIg8gDCAOSSARIAxJcmoiCTYCACAPIBNJIAkgD0lyIQsgCEEIaiEIIAFBCGohASAVIAZBAmoiBkcNAAsLIAdBAXEEfyAGQQJ0IgkgBUEIamoiASABKAIAIgYgCSAaaigCAEF/c2oiCSALaiIBNgIAIAkgBkkgASAJSXIFIAsLQQFxRQ0RCyAFIAc2AqgBIBRBAmohFAsgByANIAcgDUsbIgZBKU8NDiAGQQJ0IQECQANAIAEEQEF/IAEgHGooAgAiCCABQXxqIgEgBUEIamooAgAiCUcgCCAJSxsiCEUNAQwCCwtBf0EAIAEbIQgLAkAgCEEBSwRAIAchBgwBCyAGBEBBASELQQAhDCAGQQFHBEAgBkF+cSEOIAVBCGohASAFQbABaiEIA0AgASABKAIAIhEgCCgCAEF/c2oiDyALQQFxaiITNgIAIAFBBGoiByAHKAIAIgkgCEEEaigCAEF/c2oiFSAPIBFJIBMgD0lyaiIHNgIAIBUgCUkgByAVSXIhCyAIQQhqIQggAUEIaiEBIA4gDEECaiIMRw0ACwsgBkEBcQR/IAxBAnQiCSAFQQhqaiIBIAEoAgAiByAFQbABaiAJaigCAEF/c2oiCSALaiIBNgIAIAkgB0kgASAJSXIFIAsLQQFxRQ0RCyAFIAY2AqgBIBRBAWohFAsgAyAQRwRAIAIgEGogFEEwajoAACAGQSlPDQ8gBkUEQEEAIQYMCQsgBkF/akH/////A3EiB0EBaiIBQQNxIQggB0EDSQRAIAVBCGohAUIAISEMCAsgAUH8////B3EhCSAFQQhqIQFCACEhA0AgASABNQIAQgp+ICF8IiE+AgAgAUEEaiIHIAc1AgBCCn4gIUIgiHwiIT4CACABQQhqIgcgBzUCAEIKfiAhQiCIfCIhPgIAIAFBDGoiByAHNQIAQgp+ICFCIIh8IiE+AgAgIUIgiCEhIAFBEGohASAJQXxqIgkNAAsMBwsgAyADQeCuwAAQngEACwwNCyAHQShBpNjAABCZAgALIBAgCkHQrsAAEJoCAAsgCiADQdCuwAAQmQIACyAJQShBpNjAABCZAgALIAdBKEGk2MAAEJkCAAsgCARAA0AgASABNQIAQgp+ICF8IiE+AgAgAUEEaiEBICFCIIghISAIQX9qIggNAAsLICGnIgFFDQAgBkEnSw0CIAVBCGogBkECdGogATYCACAGQQFqIQYLIAUgBjYCqAEgCiAWRw0AC0EBIQYMAgsgBkEoQaTYwAAQngEACyAMQShBpNjAABCeAQALAkACQAJAAkACQAJAIA1BKUkEQCANRQRAQQAhDQwDCyANQX9qQf////8DcSIHQQFqIgFBA3EhCCAHQQNJBEAgBUGwAWohAUIAISEMAgsgAUH8////B3EhCSAFQbABaiEBQgAhIQNAIAEgATUCAEIFfiAhfCIhPgIAIAFBBGoiByAHNQIAQgV+ICFCIIh8IiE+AgAgAUEIaiIHIAc1AgBCBX4gIUIgiHwiIT4CACABQQxqIgcgBzUCAEIFfiAhQiCIfCIhPgIAICFCIIghISABQRBqIQEgCUF8aiIJDQALDAELIA1BKEGk2MAAEJkCAAsgCARAA0AgASABNQIAQgV+ICF8IiE+AgAgAUEEaiEBICFCIIghISAIQX9qIggNAAsLICGnIgFFDQAgDUEnSw0BIAVBsAFqIA1BAnRqIAE2AgAgDUEBaiENCyAFIA02AtACIAUoAqgBIgEgDSABIA1LGyIBQSlPDQUgAUECdCEBAkADQCABBEBBfyABQXxqIgEgBUGwAWpqKAIAIgkgASAFQQhqaigCACIHRyAJIAdLGyIIRQ0BDAILC0F/QQAgARshCAsCQAJAIAhB/wFxDgIAAQULIAZFDQQgCkF/aiIBIANPDQIgASACai0AAEEBcUUNBAsgCiADSw0CIAIgCmpBACEBIAIhCAJAA0AgASAKRg0BIAFBAWohASAIQX9qIgggCmoiBy0AAEE5Rg0ACyAHIActAABBAWo6AAAgCiAKIAFrQQFqTQ0EIAdBAWpBMCABQX9qEK8CGgwECwJ/QTEgCkUNABogAkExOgAAQTAgCkEBRg0AGiACQQFqQTAgCkF/ahCvAhpBMAsgEkEQdEGAgARqQRB1IhIgBEEQdEEQdUwgCiADT3INAzoAACAKQQFqIQoMAwsgDUEoQaTYwAAQngEACyABIANB8K7AABCeAQALIAogA0GAr8AAEJkCAAsgCiADTQ0AIAogA0GQr8AAEJkCAAsgACASOwEIIAAgCjYCBCAAIAI2AgAgBUHQBmokAA8LIAFBKEGk2MAAEJkCAAsgBkEoQaTYwAAQmQIAC0G02MAAQRpBpNjAABC+AQALziACD38BfiMAQRBrIggkAAJAAkACQAJAAkACQCAAQfUBTwRAQQhBCBD/ASEBQRRBCBD/ASEDQRBBCBD/ASEFQQBBEEEIEP8BQQJ0ayIEQYCAfCAFIAEgA2pqa0F3cUF9aiIBIAQgAUkbIABNDQYgAEEEakEIEP8BIQRBqOTAACgCAEUNBUEAIARrIQICf0EAIARBgAJJDQAaQR8gBEH///8HSw0AGiAEQQYgBEEIdmciAGt2QQFxIABBAXRrQT5qCyIHQQJ0QYzhwABqKAIAIgENAUEAIQBBACEDDAILQRAgAEEEakEQQQgQ/wFBe2ogAEsbQQgQ/wEhBAJAAkACQAJ/AkACQEGk5MAAKAIAIgUgBEEDdiIBdiIAQQNxRQRAIARBrOTAACgCAE0NCyAADQFBqOTAACgCACIARQ0LIAAQkgJoQQJ0QYzhwABqKAIAIgEQpwIgBGshAiABEPkBIgAEQANAIAAQpwIgBGsiAyACIAMgAkkiAxshAiAAIAEgAxshASAAEPkBIgANAAsLIAEiACAEELECIQUgABBhIAJBEEEIEP8BSQ0FIAAgBBCUAiAFIAIQ+wFBrOTAACgCACIGRQ0EIAZBeHFBnOLAAGohAUG05MAAKAIAIQNBpOTAACgCACIHQQEgBkEDdnQiBnFFDQIgASgCCAwDCwJAIABBf3NBAXEgAWoiAEEDdCICQaTiwABqKAIAIgFBCGooAgAiAyACQZziwABqIgJHBEAgAyACNgIMIAIgAzYCCAwBC0Gk5MAAIAVBfiAAd3E2AgALIAEgAEEDdBDzASABELMCIQIMCwsCQEEBIAFBH3EiAXQQggIgACABdHEQkgJoIgBBA3QiAkGk4sAAaigCACIDQQhqKAIAIgEgAkGc4sAAaiICRwRAIAEgAjYCDCACIAE2AggMAQtBpOTAAEGk5MAAKAIAQX4gAHdxNgIACyADIAQQlAIgAyAEELECIgUgAEEDdCAEayIEEPsBQazkwAAoAgAiAgRAIAJBeHFBnOLAAGohAEG05MAAKAIAIQECf0Gk5MAAKAIAIgZBASACQQN2dCICcQRAIAAoAggMAQtBpOTAACACIAZyNgIAIAALIQIgACABNgIIIAIgATYCDCABIAA2AgwgASACNgIIC0G05MAAIAU2AgBBrOTAACAENgIAIAMQswIhAgwKC0Gk5MAAIAYgB3I2AgAgAQshBiABIAM2AgggBiADNgIMIAMgATYCDCADIAY2AggLQbTkwAAgBTYCAEGs5MAAIAI2AgAMAQsgACACIARqEPMBCyAAELMCIgINBQwECyAEIAcQ+gF0IQZBACEAQQAhAwNAAkAgARCnAiIFIARJDQAgBSAEayIFIAJPDQAgASEDIAUiAg0AQQAhAiABIQAMAwsgAUEUaigCACIFIAAgBSABIAZBHXZBBHFqQRBqKAIAIgFHGyAAIAUbIQAgBkEBdCEGIAENAAsLIAAgA3JFBEBBACEDQQEgB3QQggJBqOTAACgCAHEiAEUNAyAAEJICaEECdEGM4cAAaigCACEACyAARQ0BCwNAIAAgAyAAEKcCIgEgBE8gASAEayIBIAJJcSIFGyEDIAEgAiAFGyECIAAQ+QEiAA0ACwsgA0UNAEGs5MAAKAIAIgAgBE9BACACIAAgBGtPGw0AIAMiACAEELECIQEgABBhAkAgAkEQQQgQ/wFPBEAgACAEEJQCIAEgAhD7ASACQYACTwRAIAEgAhBjDAILIAJBeHFBnOLAAGohAwJ/QaTkwAAoAgAiBUEBIAJBA3Z0IgJxBEAgAygCCAwBC0Gk5MAAIAIgBXI2AgAgAwshAiADIAE2AgggAiABNgIMIAEgAzYCDCABIAI2AggMAQsgACACIARqEPMBCyAAELMCIgINAQsCQAJAAkACQAJAAkACQEGs5MAAKAIAIgEgBEkEQEGw5MAAKAIAIgAgBEsNAiAIQQhBCBD/ASAEakEUQQgQ/wFqQRBBCBD/AWpBgIAEEP8BENEBIAgoAgAiAw0BQQAhAgwIC0G05MAAKAIAIQAgASAEayIBQRBBCBD/AUkEQEG05MAAQQA2AgBBrOTAACgCACEBQazkwABBADYCACAAIAEQ8wEgABCzAiECDAgLIAAgBBCxAiEDQazkwAAgATYCAEG05MAAIAM2AgAgAyABEPsBIAAgBBCUAiAAELMCIQIMBwsgCCgCCCEGQbzkwAAgCCgCBCIFQbzkwAAoAgBqIgA2AgBBwOTAAEHA5MAAKAIAIgEgACABIABLGzYCAAJAAkACQEG45MAAKAIABEBBjOLAACEAA0AgABCVAiADRg0CIAAoAggiAA0ACwwCC0HI5MAAKAIAIgBFIAMgAElyDQUMBwsgABCpAg0AIAAQqgIgBkcNACAAIgEoAgAiAkG45MAAKAIAIgdNBH8gAiABKAIEaiAHSwVBAAsNAQtByOTAAEHI5MAAKAIAIgAgAyADIABLGzYCACADIAVqIQFBjOLAACEAAkACQANAIAEgACgCAEcEQCAAKAIIIgANAQwCCwsgABCpAg0AIAAQqgIgBkYNAQtBuOTAACgCACECQYziwAAhAAJAA0AgACgCACACTQRAIAAQlQIgAksNAgsgACgCCCIADQALQQAhAAsgAiAAEJUCIg9BFEEIEP8BIg5rQWlqIgAQswIiAUEIEP8BIAFrIABqIgAgAEEQQQgQ/wEgAmpJGyIHELMCIQEgByAOELECIQBBCEEIEP8BIQlBFEEIEP8BIQtBEEEIEP8BIQxBuOTAACADIAMQswIiCkEIEP8BIAprIg0QsQIiCjYCAEGw5MAAIAVBCGogDCAJIAtqaiANamsiCTYCACAKIAlBAXI2AgRBCEEIEP8BIQtBFEEIEP8BIQxBEEEIEP8BIQ0gCiAJELECIA0gDCALQQhramo2AgRBxOTAAEGAgIABNgIAIAcgDhCUAkGM4sAAKQIAIRAgAUEIakGU4sAAKQIANwIAIAEgEDcCAEGY4sAAIAY2AgBBkOLAACAFNgIAQYziwAAgAzYCAEGU4sAAIAE2AgADQCAAQQQQsQIgAEEHNgIEIgBBBGogD0kNAAsgAiAHRg0HIAIgByACayIAIAIgABCxAhDqASAAQYACTwRAIAIgABBjDAgLIABBeHFBnOLAAGohAQJ/QaTkwAAoAgAiA0EBIABBA3Z0IgBxBEAgASgCCAwBC0Gk5MAAIAAgA3I2AgAgAQshACABIAI2AgggACACNgIMIAIgATYCDCACIAA2AggMBwsgACgCACECIAAgAzYCACAAIAAoAgQgBWo2AgQgAxCzAiIAQQgQ/wEhASACELMCIgVBCBD/ASEGIAMgASAAa2oiAyAEELECIQEgAyAEEJQCIAIgBiAFa2oiACADIARqayEEQbjkwAAoAgAgAEcEQCAAQbTkwAAoAgBGDQMgACgCBEEDcUEBRw0FAkAgABCnAiICQYACTwRAIAAQYQwBCyAAQQxqKAIAIgUgAEEIaigCACIGRwRAIAYgBTYCDCAFIAY2AggMAQtBpOTAAEGk5MAAKAIAQX4gAkEDdndxNgIACyACIARqIQQgACACELECIQAMBQtBuOTAACABNgIAQbDkwABBsOTAACgCACAEaiIANgIAIAEgAEEBcjYCBCADELMCIQIMBwsgACAAKAIEIAVqNgIEQbjkwAAoAgBBsOTAACgCACAFahCoAQwFC0Gw5MAAIAAgBGsiATYCAEG45MAAQbjkwAAoAgAiACAEELECIgM2AgAgAyABQQFyNgIEIAAgBBCUAiAAELMCIQIMBQtBtOTAACABNgIAQazkwABBrOTAACgCACAEaiIANgIAIAEgABD7ASADELMCIQIMBAtByOTAACADNgIADAELIAEgBCAAEOoBIARBgAJPBEAgASAEEGMgAxCzAiECDAMLIARBeHFBnOLAAGohAAJ/QaTkwAAoAgAiAkEBIARBA3Z0IgVxBEAgACgCCAwBC0Gk5MAAIAIgBXI2AgAgAAshAiAAIAE2AgggAiABNgIMIAEgADYCDCABIAI2AgggAxCzAiECDAILQczkwABB/x82AgBBmOLAACAGNgIAQZDiwAAgBTYCAEGM4sAAIAM2AgBBqOLAAEGc4sAANgIAQbDiwABBpOLAADYCAEGk4sAAQZziwAA2AgBBuOLAAEGs4sAANgIAQaziwABBpOLAADYCAEHA4sAAQbTiwAA2AgBBtOLAAEGs4sAANgIAQcjiwABBvOLAADYCAEG84sAAQbTiwAA2AgBB0OLAAEHE4sAANgIAQcTiwABBvOLAADYCAEHY4sAAQcziwAA2AgBBzOLAAEHE4sAANgIAQeDiwABB1OLAADYCAEHU4sAAQcziwAA2AgBB6OLAAEHc4sAANgIAQdziwABB1OLAADYCAEHk4sAAQdziwAA2AgBB8OLAAEHk4sAANgIAQeziwABB5OLAADYCAEH44sAAQeziwAA2AgBB9OLAAEHs4sAANgIAQYDjwABB9OLAADYCAEH84sAAQfTiwAA2AgBBiOPAAEH84sAANgIAQYTjwABB/OLAADYCAEGQ48AAQYTjwAA2AgBBjOPAAEGE48AANgIAQZjjwABBjOPAADYCAEGU48AAQYzjwAA2AgBBoOPAAEGU48AANgIAQZzjwABBlOPAADYCAEGo48AAQZzjwAA2AgBBsOPAAEGk48AANgIAQaTjwABBnOPAADYCAEG448AAQazjwAA2AgBBrOPAAEGk48AANgIAQcDjwABBtOPAADYCAEG048AAQazjwAA2AgBByOPAAEG848AANgIAQbzjwABBtOPAADYCAEHQ48AAQcTjwAA2AgBBxOPAAEG848AANgIAQdjjwABBzOPAADYCAEHM48AAQcTjwAA2AgBB4OPAAEHU48AANgIAQdTjwABBzOPAADYCAEHo48AAQdzjwAA2AgBB3OPAAEHU48AANgIAQfDjwABB5OPAADYCAEHk48AAQdzjwAA2AgBB+OPAAEHs48AANgIAQezjwABB5OPAADYCAEGA5MAAQfTjwAA2AgBB9OPAAEHs48AANgIAQYjkwABB/OPAADYCAEH848AAQfTjwAA2AgBBkOTAAEGE5MAANgIAQYTkwABB/OPAADYCAEGY5MAAQYzkwAA2AgBBjOTAAEGE5MAANgIAQaDkwABBlOTAADYCAEGU5MAAQYzkwAA2AgBBnOTAAEGU5MAANgIAQQhBCBD/ASEBQRRBCBD/ASECQRBBCBD/ASEGQbjkwAAgAyADELMCIgBBCBD/ASAAayIDELECIgA2AgBBsOTAACAFQQhqIAYgASACamogA2prIgE2AgAgACABQQFyNgIEQQhBCBD/ASEDQRRBCBD/ASECQRBBCBD/ASEFIAAgARCxAiAFIAIgA0EIa2pqNgIEQcTkwABBgICAATYCAAtBACECQbDkwAAoAgAiACAETQ0AQbDkwAAgACAEayIBNgIAQbjkwABBuOTAACgCACIAIAQQ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GGoQswEMDgsgAiAAKAIENgIIIAJBJGpBAjYCACACQSxqQQE2AgAgAkHAksAANgIgIAJBADYCGCACQR02AhQgAiACQRBqNgIoIAIgAkEIajYCECABIAJBGGoQswEMDQsgAiAAKQIENwMIIAJBJGpBATYCACACQSxqQQE2AgAgAkGsksAANgIgIAJBADYCGCACQR42AhQgAiACQRBqNgIoIAIgAkEIajYCECABIAJBGGoQswEMDAsgAkEkakEBNgIAIAJBLGpBADYCACACQZySwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCwsgAkEkakEBNgIAIAJBLGpBADYCACACQYiSwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCgsgAkEkakEBNgIAIAJBLGpBADYCACACQfSRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCQsgAkEkakEBNgIAIAJBLGpBADYCACACQeCRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMCAsgAkEkakEBNgIAIAJBLGpBADYCACACQciRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBwsgAkEkakEBNgIAIAJBLGpBADYCACACQbiRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBgsgAkEkakEBNgIAIAJBLGpBADYCACACQayRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBQsgAkEkakEBNgIAIAJBLGpBADYCACACQaCRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMBAsgAkEkakEBNgIAIAJBLGpBADYCACACQYyRwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMAwsgAkEkakEBNgIAIAJBLGpBADYCACACQfSQwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMAgsgAkEkakEBNgIAIAJBLGpBADYCACACQdyQwAA2AiAgAkHMkMAANgIoIAJBADYCGCABIAJBGGoQswEMAQsgASAAKAIEIABBCGooAgAQgwILIAJBMGokAAvwBwEIfwJAAkAgAEEDakF8cSICIABrIgUgAUsgBUEE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AiQgA0EgagwCCyADQQM2AiggA0Gev8AANgIkIANBAjsBICADQSBqDAELIANBAzYCKCADQaG/wAA2AiQgA0ECOwEgIANBIGoLIQQgA0HcAGogBTYCACADIAQ2AlggAyAGNgJUIAMgAjYCUCAAIANB0ABqED4gA0GAAWokAAvlBAEOfyMAQfAAayICJAAgASgCCCIFQQFxIAEoAgQhCSABKAIAIQogASgCDCEEIAVBAk8EQCAFQQF2IQ0gAkEgaiELA0AgAkEQaiAKIAZBBXQiA2oiAUEgaiIHIAEQaSACQTBqIAcgARBpIAJB0ABqIAAgAkEwahA/IAJByABqIgcgAkHoAGopAwA3AwAgAkFAayIOIAJB4ABqKQMANwMAIAJBOGoiDyACQdgAaikDADcDACACIAIpA1A3AzAgAyAJaiEDQQAhAQNAIAJBMGogAWoiCCAILQAAIAEgBGotAABzOgAAIAFBAWoiAUEQRw0AC0EAIQEDQCABIAJqQUBrIgggCC0AACACQRBqIAFqLQAAczoAACABQQFqIgFBEEcNAAsgAyACKQMwNwAAIANBGGogBykDADcAACADQRBqIA4pAwA3AAAgA0EIaiAPKQMANwAAIARBCGogC0EIaikAADcAACAEIAspAAA3AAAgDSAGQQFqIgZHDQALCwRAIAkgBUH+////AHFBBHQiAWohAyACIAEgCmoiAUEQaiIFIAEQpAEgAkEQaiAFIAEQpAEgAkEwahDjASACQThqIAJBGGoiASkDADcDACACIAIpAxA3AzAgAkHQAGogACACQTBqED8gASACQdgAaikDADcDACACIAIpA1A3AxBBACEBA0AgAkEQaiABaiIAIAAtAAAgASAEai0AAHM6AAAgAUEBaiIBQRBHDQALIAMgAikDEDcAACADQQhqIAJBGGopAwA3AAAgBCACKQMANwAAIARBCGogAkEIaikDADcAAAsgAkHwAGokAAv8BAEIfyMAQRBrIgckAAJ/IAIoAgQiBARAQQEgACACKAIAIAQgASgCDBEBAA0BGgtBACACQQxqKAIAIgNFDQAaIAIoAggiBCADQQxsaiEIIAdBDGohCQNAAkACQAJAAkAgBC8BAEEBaw4CAgEACwJAIAQoAgQiAkHBAE8EQCABQQxqKAIAIQMDQEEBIABB8MTAAEHAACADEQEADQcaIAJB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Qfj///8DcSEGQQAhAwNAIAIoAgAgAkF4aigCACACQXBqKAIAIAJBaGooAgAgAkFgaigCACACQVhqKAIAIAJBUGooAgAgAkFIaigCACADampqampqamohAyACQUBrIQIgBkF4aiIGDQALIAJBRGoLIQIgBARAIAJBBGohAgNAIAIoAgAgA2ohAyACQQhqIQIgBEF/aiIEDQALCyABQRRqKAIADQEgAyEEDAMLQQAhAyABQRRqKAIADQFBASECDAQLIANBD0sNACAHKAIERQ0CCyADIANqIgQgA0kNAQsgBEUNAAJAIARBf0oEQCAEQQEQiAIiAkUNASAEIQMMAwsQygEACyAEQQEQrAIAC0EBIQJBACEDCyAAQQA2AgggACACNgIEIAAgAzYCACAFIAA2AgwgBUEgaiABQRBqKQIANwMAIAVBGGogAUEIaikCADcDACAFIAEpAgA3AxAgBUEMakGYpcAAIAVBEGoQPQRAQYimwABBMyAFQShqQbymwABB5KbAABCYAQALIAVBMGokAAuHBAEDfyMAQaAKayIDJAAgA0EQakEAQYAEEK8CGgJAIAJBgQRJBEAgA0EQaiACIAEgAkHcicAAEOkBIANBEDYC8AkgA0GQBGoQLCADQfgGakHUgMAAKQAANwMAIANBzIDAACkAADcD8AYgA0GAB2ogA0GQBGpB8AIQrgIaIANBkApqIgRCADcAACAEQQhqQgA3AAAgAkFwcSIEQY98akH+e00NASADQZAKaiABIARqIAJBD3EiBRCuAhogA0GQCmogBWpBECAFayIFIAUQrwIaIANB+AlqIANBmApqKQMANwMAIAMgAykDkAo3A/AJIAMgA0EQaiAEaiIENgKMCiADIAJBBHYiAjYCiAogAyABNgKACiADIANBEGo2AoQKIAMgA0HgCWoiBTYCnAogAyACNgKYCiADIAE2ApAKIAMgA0EQajYClAogA0GAB2ogA0GQCmoQbSADIAU2ApgKIAMgBDYClAogAyADQfAJajYCkAogA0GAB2ogA0GQCmoQdyADKAKECiICRQ0BIANBCGogAygCiAogAygCjApBAEdqQQR0IgFBABC3ASADKAIIIQQgACADKAIMIgU2AgQgACAENgIAIAUgAiABEK4CGiAAIAE2AgggA0GgCmokAA8LIAJBgARBzInAABCZAgALQYKJwABB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CyACIAFBsKfAAEEAIAVBCWogA2pBJyADaxAyIAVBMGokAAvYAgIDfwF+IwBBQGoiAiQAIAJBIGogAEEIaigCADYCACACIAApAgA3AxggAkEoaiACQRhqEG4CQAJAIAIoAigEQEEAIQAgAkEANgIQIAJCgICAgBA3AwgMAQsgAkEQaiACQTRqKAIAIgA2AgAgAiACKQIsNwMIIABFBEBBACEADAELIAJBGGogAigCDCAAEF4gAigCGCEDIAJBKGogAigCHCIEIAIoAiAiABAzIAIoAigEQCACKQIsIgVCgICAgPAfg0KAgICAIFINAgsgAiAANgIwIAIgBDYCLCACIAM2AiggASgCBCEDIAEoAgggAEYEfyAEIAMgABDAAUUFQQALIQAgAkEoahD4AQsgAkEIahD4ASABEPgBIAJBQGskACAADwsgAiAANgI4IAIgBDYCNCACIAM2AjAgAiAFNwMoQYCAwABBKyACQShqQbyAwABBrIPAABCYAQALsAIBBH8CQAJAAkACQAJAAkAgAUEDakF8cSIDIAFGDQAgAyABayIDIAIgAyACSRsiBEUNAEEAIQNBASEFA0AgASADai0AAEEKRg0GIAQgA0EBaiIDRw0ACyAEIAJBeGoiA0sNAgwBCyACQXhqIQNBACEECwNAAkAgASAEaiIFKAIAQYqUqNAAcyIGQX9zIAZB//37d2pxQYCBgoR4cQ0AIAVBBGooAgBBipSo0ABzIgVBf3MgBUH//ft3anFBgIGChHhxDQAgBEEIaiIEIANNDQELCyAEIAJLDQELQQAhBSACIARGDQEDQCABIARqLQAAQQpGBEAgBCEDQQEhBQwECyAEQQFqIgQgAkcNAAsMAQsgBCACQYzGwAAQmAIACyACIQMLIAAgAzYCBCAAIAU2AgALtgIBA38jAEGACmsiAyQAIANBEGpBAEGABBCvAhogAkGBBEkEQCADQRBqIAIgASACQZyKwAAQ6QEgA0EQNgKQBCADQZAEahAsIANB+AZqQdSAwAApAAA3AwAgA0HMgMAAKQAANwPwBiADQYAHaiADQZAEakHwAhCuAhogAyACQQ9xBH9BzIDAAAUgAyABNgLwCSADIANB4AlqNgL8CSADIAJBBHYiATYC+AkgAyADQRBqNgL0CSADQYAHaiADQfAJahA4IANBCGogA0EQaiABEJYBIAMo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QaHCwABBASADKAIEKAIMEQEADQMgAygCGCEFDAELQQEhBCADKAIAQZXCwABBAiADKAIEKAIMEQEARQ0BDAILQQEhBCACQQE6ABcgAkH0wcAANgIcIAIgAykCADcDCCACIAJBF2o2AhAgAykCCCEGIAMpAhAhByACIAMtACA6ADggAiADKAIcNgI0IAIgBTYCMCACIAc3AyggAiAGNwMgIAIgAkEIajYCGCABIAJBGGpBvKXAACgCABEAAA0BIAIoAhhBk8LAAEECIAIoAhwoAgwRAQAhBAwBCyABIANBvKXAACgCABEAACEECyAAQQE6AAUgACAEOgAEIAJBQGskAAv9AQEHfyMAQdAAayIDJAAgA0EANgIgIAEgAmsiCEEEdiIBQQIgAUECSRsiBgRAIAMhASAGIQcgAiEFA0AgA0EoaiAFQRBqIgkgBRCkASABQQhqIANBMGopAwA3AgAgASADKQMoNwIAIAMgAygCIEEBaiIENgIgIAFBEGohASAJIQUgB0F/aiIHDQALCyAIQSFPBEAgA0FAayACIAZBBHRqIgFBEGogARCkAQsgBEECTwRAIAAgAykDADcAACAAQRhqIANBGGopAwA3AAAgAEEQaiADQRBqKQMANwAAIABBCGogA0EIaikDADcAACADQdAAaiQADwsgBEECEJ0BAAuSAgEBfyMAQTBrIgMkACADIAI6ABQgAyABNgIQIANBCGpBAEEAELcBIANBADYCICADIAMpAwg3AxggA0EoaiADQRBqEJkBAkACQAJAIAMtAChFBEADQCADLQApRQ0CIAMtACohAiADKAIgIgEgAygCGEYEfyADQRhqIAEQwQEgAygCIAUgAQsgAygCHGogAjoAACADIAMoAiBBAWo2AiAgA0EoaiADQRBqEJkBIAMtAChFDQALCyAAQQA2AgQgACADKAIsNgIAIANBGGoQ+AEgAygCECICQYQBSQ0CDAELIAAgAykDGDcCACAAQQhqIANBIGooAgA2AgAgAygCECICQYMBTQ0BCyACEAALIANBMGokAAudAgEEfyMAQSBrIgIkABAQIQQgASgCACIDIAQQESEBIAJBEGoQ4gEgAigCFCABIAIoAhAiBRshAQJAAkACQAJAAkAgBUUEQCABEAtBAUYNASAAQQI6AAQgAUGEAUkNAwwCCyAAQQM6AAQgACABNgIADAILIAEgAxASIQMgAkEIahDiASACKAIMIAMgAigCCCIFGyEDAkACQCAFRQRAIAIgAzYCHCACQRxqENYBDQIgAEECOgAEIANBhAFJDQEgAxAADAELIABBAzoABCAAIAM2AgALIAFBhAFPDQEMAgsgAEEAOgAEIAAgAzYCACABQYQBTwRAIAEQAAsgBEGDAUsNAgwDCyABEAALIARBgwFNDQELIAQQAAsgAkEgaiQAC4wCAQR/IwBBQGoiAyQAIAFBA24iBEH/////A3EgBEchBiAEQQJ0IQUCQCABIARBA2xrIgRFBEAgBSEBDAELAkACQAJAIAJFBEBBAiEBIARBf2oOAgMCAQsgBiAFQQRqIgEgBUlyIQYMAwsgA0EUakEBNgIAIANBHGpBATYCACADQTRqQQE2AgAgA0E8akEANgIAIANBmJ7AADYCECADQQA2AgggA0EuNgIkIANBtJ7AADYCMCADQeydwAA2AjggA0EANgIoIAMgA0EgajYCGCADIANBKGo2AiAgA0EIakGcn8AAENUBAAtBAyEBCyABIAVyIQELIAAgATYCBCAAIAZBAXM2AgAgA0FAayQAC/0BAgh/An4jAEHQAGsiAiQAIAEoAggiBgRAIAEoAgwhBCABKAIEIQcgASgCACEIA0AgAiAIIAVBBHQiAWoiA0EQaiADEKQBIAEgB2ohA0EAIQEDQCABIAJqIgkgCS0AACABIARqLQAAczoAACABQQFqIgFBEEcNAAsgAkEQahDjASACQRhqIAJBCGoiASkDADcDACACIAIpAwA3AxAgAkEwaiAAIAJBEGoQRSABIAJBOGopAwAiCjcDACACIAIpAzAiCzcDACAEQQhqIAo3AAAgBCALNwAAIAMgCzcAACADQQhqIAo3AAAgBiAFQQFqIgVHDQALCyACQdAAaiQAC/sBAgV/AX4jAEEwayICJAAgASgCBCEEIAJBCGogASgCCCIFENgBIAIgAikDCDcDECACIAJBEGooAgQiA0EBELcBIAIgAzYCICACIAIoAgQiBjYCHCACIAIoAgA2AhggAkEoaiAEIAUgBiADIAIoAhAgAigCFBAiAkACQCADAn8gAi0AKEEERgRAIAIoAiwMAQsgAikDKCIHQv8Bg0IEUg0BIAdCIIinCyIDTwRAIAIgAzYCIAsgACACKQMYNwIEIABBADYCACAAQQxqIAJBIGooAgA2AgAMAQsgAEEBNgIAIAAgBzcCBCACQRhqEPgBCyABEPgBIAJBMGokAAuRAgEEfyMAQTBrIgMkACACKAIEIQQgAigCCCECEAohBiADQSBqIgUgATYCCCAFQQA2AgQgBSAGNgIAAn8CQAJAIAMoAigEQCADQRhqIANBKGooAgA2AgAgAyADKQMgNwMQA0AgAkUNAyACQX9qIQIgAyAENgIgIARBAWohBCADQQhqIANBEGogA0EgahC2ASADKAIIRQ0ACyADKAIMIQIgAygCECIBQYQBSQ0BIAEQAAwBCyADKAIgIQILQQEMAQsgA0EoaiADQRhqKAIANgIAIAMgAykDEDcDICADIANBIGooAgA2AgQgA0EANgIAIAMoAgQhAiADKAIACyEBIAAgAjYCBCAAIAE2AgAgA0EwaiQAC4sCAgN/AX4jAEEwayICJAAgASgCBEUEQCABKAIMIQMgAkEQaiIEQQA2AgAgAkKAgICAEDcDCCACIAJBCGo2AhQgAkEoaiADQRBqKQIANwMAIAJBIGogA0EIaikCADcDACACIAMpAgA3AxggAkEUakHkosAAIAJBGGoQPRogAUEIaiAEKAIANgIAIAEgAikDCDcCAAsgASkCACEFIAFCgICAgBA3AgAgAkEgaiIDIAFBCGoiASgCADYCACABQQA2AgAgAiAFNwMYQQxBBBCIAiIBRQRAQQxBBBCsAgALIAEgAikDGDcCACABQQhqIAMoAgA2AgAgAEHApMAANgIEIAAgATYCACACQTBqJAAL/gEBA38jAEEwayICJAAgAkEQaiABEKYBIAJBCGogAigCFCIDQYAgIANBgCBJG0EAIAIoAhAbQQAQtwEgAkEANgIgIAIgAikDCDcDGCACQShqIAEQlwECQAJAIAItAChFBEADQCACLQApRQ0CIAItACohBCACKAIgIgMgAigCGEYEfyACQRhqIAMQwQEgAigCIAUgAwsgAigCHGogBDoAACACIAIoAiBBAWo2AiAgAkEoaiABEJcBIAItAChFDQALCyAAQQA2AgQgACACKAIsNgIAIAJBGGoQ+AEMAQsgACACKQMYNwIAIABBCGogAkEgaigCADYCAAsgAkEwaiQAC+UBAQF/IwBBEGsiAiQAIAAoAgAgAkEANgIMIAJBDGoCfyABQYABTwRAIAFBgBBP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AXwjAEEgayICJAAgAkEQaiABKAIAEAUgAiACKAIQIAIrAxgQ/QECQCACKAIARQ0AIAIrAwghBSABKAIAEBZFDQAgBUQAAAAAAADgw2YhAUIAQv///////////wACfiAFmUQAAAAAAADgQ2MEQCAFsAwBC0KAgICAgICAgIB/C0KAgICAgICAgIB/IAEbIAVE////////30NkGyAFIAViGyEDQgEhBAsgACADNwMIIAAgBDcDACACQSBqJAALnQEBAX8jAEFAaiICJAAgAkIANwM4IAJBOGogACgCABAcIAJBFGpBAjYCACACQRxqQQE2AgAgAiACKAI8IgA2AjAgAiACKAI4NgIsIAIgADYCKCACQS02AiQgAkGAlcAANgIQIAJBADYCCCACIAJBKGo2AiAgAiACQSBqNgIYIAEgAkEIahCzASACKAIoBEAgAigCLBAoCyACQUBrJAALmwECAX8BfiMAQTBrIgIkACACQQhqIAEQjAECQAJAIAIoAghBAUYEQCACKQMQIgNCf1UNAQsgASACQShqQbyEwAAQQCEBIABBAToAACAAIAE2AgQMAQsgAAJ/IANCgAJaBEAgAkEBOgAYIAIgAzcDICAAIAJBGGogAkEoahCbATYCBEEBDAELIAAgAzwAAUEACzoAAAsgAkEwaiQAC6EBAQF/IwBBIGsiAiQAAkACQCABKAIAEBtFBEAgASgCABAVDQEgAEEANgIEDAILIAJBEGogARC9ASAAQQhqIAJBGGooAgA2AgAgACACKQMQNwIADAELIAIgASgCABAYNgIMIAJBEGogAkEMahC9ASAAQQhqIAJBGGooAgA2AgAgACACKQMQNwIAIAIoAgwiAEGEAUkNACAAEAALIAJBIGokAAuRAQEDfyMAQYABayIDJAAgAC0AACECQQAhAANAIAAgA2pB/wBqQTBBNyACQQ9xIgRBCkkbIARqOgAAIABBf2ohACACIgRBBHYhAiAEQQ9LDQALIABBgAFqIgJBgQFPBEAgAkGAAUHQwsAAEJgCAAsgAUEBQeDCwABBAiAAIANqQYABakEAIABrEDIgA0GAAWokAAuSAQEDfyMAQYABayIDJAAgAC0AACECQQAhAANAIAAgA2pB/wBqQTBB1wAgAkEPcSIEQQpJGyAEajoAACAAQX9qIQAgAiIEQQR2IQIgBEEPSw0ACyAAQYABaiICQYEBTwRAIAJBgAFB0MLAABCYAgALIAFBAUHgwsAAQQIgACADakGAAWpBACAAaxAyIANBgAFqJAALlAEBA38jAEEQayIFJAACQCABLQAABEBBAiEDDAELIAIoAgAQDSEDIAVBCGoQ4gEgBSgCDCECIAUoAggiBARAQQEhAyABQQE6AAAMAQsCfyACIAMgBBsiBBAOBEAgAUEBOgAAQQIMAQsgBBAPIQJBAAshAyAEQYQBSQ0AIAQQAAsgACACNgIEIAAgAzYCACAFQRBqJAALtQEBA38jAEEQayIBJAAgACgCACICQRRqKAIAIQMCQAJ/AkACQCACQQxqKAIADgIAAQMLIAMNAkEAIQJB/KLAAAwBCyADDQEgAigCCCIDKAIEIQIgAygCAAshAyABIAI2AgQgASADNgIAIAFB9KTAACAAKAIEIgEoAgggACgCCCABLQAQEIABAAsgAUEANgIEIAEgAjYCDCABQeCkwAAgACgCBCIBKAIIIAAoAgggAS0AEBCAAQALjAEBA38jAEGAAWsiAyQAIAAoAgAhAANAIAIgA2pB/wBqQTBB1wAgAEEPcSIEQQpJGyAEajoAACACQX9qIQIgAEEPSyAAQQR2IQANAAsgAkGAAWoiAEGBAU8EQCAAQYABQdDCwAAQmAIACyABQQFB4MLAAEECIAIgA2pBgAFqQQAgAmsQMiADQYABaiQAC4sBAQN/IwBBgAFrIgMkACAAKAIAIQADQCACIANqQf8AakEwQTcgAEEPcSIEQQpJGyAEajoAACACQX9qIQIgAEEPSyAAQQR2IQANAAsgAkGAAWoiAEGBAU8EQCAAQYABQdDCwAAQmAIACyABQQFB4MLAAEECIAIgA2pBgAFqQQAgAmsQMiADQYABaiQAC4UBAQR/AkAgAkUNACACQQR0IAFqQXBqQQAgAhsiBC0ADyIFQW9qQf8BcUHwAUkNAEEAIAVrIQMgBEEQaiEEAkADQCADQX9GDQEgAyAEaiEGIANBAWohAyAGLQAAIAVGDQALQQAhAwwBCyACQQR0IAVrIQYgASEDCyAAIAY2AgQgACADNgIAC5IBAQN/IwBBEGsiAiQAAkACQCABKAIIBEAgAiABEMkBIAIoAgANAQsgAEEAOwEADAELIAIoAgQhBEEBIQMgASABKAIMQQFqNgIMIAJBCGogBBDTAQJAIAItAAhFBEAgAEEBOgABIABBAmogAi0ACToAAEEAIQMMAQsgACACKAIMNgIECyAAIAM6AAALIAJBEGokAAuKAQEBfyMAQUBqIgUkACAFIAE2AgwgBSAANgIIIAUgAzYCFCAFIAI2AhAgBUEkakECNgIAIAVBLGpBAjYCACAFQTxqQccANgIAIAVB5MHAADYCICAFQQA2AhggBUHGADYCNCAFIAVBMGo2AiggBSAFQRBqNgI4IAUgBUEIajYCMCAFQRhqIAQQ1QEAC5IBAQR/IwBBEGsiAiQAIAIgARDNAUEAIQEgAigCBCEDAkACQAJAAkACQAJAIAIoAgBBAWsOAgACAQsgACADNgIEDAMLIAJBCGogAxDTASACLQAIDQEgAi0ACSEEQQEhBQsgACAFOgABIABBAmogBDoAAAwCCyAAIAIoAgw2AgQLQQEhAQsgACABOgAAIAJBEGokAAt/AgF/AX4jAEEgayIGJAAgAQRAIAYgASADIAQgBSACKAIQEQYAIAZBGGogBkEIaigCACIBNgIAIAYgBikDACIHNwMQIAenIAFLBEAgBkEQaiABEM4BIAYoAhghAQsgBigCFCECIAAgATYCBCAAIAI2AgAgBkEgaiQADwsQpQIAC3sBAX8jAEEwayICJAAgAkG8hMAANgIEIAIgATYCACACQRRqQQI2AgAgAkEcakECNgIAIAJBLGpBCDYCACACQfCFwAA2AhAgAkEANgIIIAJBCTYCJCACIAA2AiAgAiACQSBqNgIYIAIgAjYCKCACQQhqELsBIAJBMGokAAt6AQJ/IAFBB2ohAiAAIAFBAnRqIQBBICEBAkACQANAIAJB2ABPDQIgAkEIakHYAE8NASAAIAFqIgNBHGogA0F8aigCADYCACACQX9qIQIgAUF8aiIBDQALDwsgAkEIakHYAEGQocAAEJ4BAAsgAkHYAEGAocAAEJ4BAAt6AQF/IwBBMGsiAiQAIAIgATYCBCACIAA2AgAgAkEUakECNgIAIAJBHGpBAjYCACACQSxqQS82AgAgAkHgocAANgIQIAJBADYCCCACQS82AiQgAiACQSBqNgIYIAIgAkEEajYCKCACIAI2AiAgAkEIakHUosAAENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0GcwMAANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgAzYCKCADIANBBGo2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0HQxsAANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0HwxsAANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0Gkx8AANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACENUBAAt3AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakEDNgIAIANBHGpBAjYCACADQSxqQS82AgAgA0H0x8AANgIQIANBADYCCCADQS82AiQgAyADQSBqNgIYIAMgAzYCKCADIANBBGo2AiAgA0EIaiACENUBAAtpAQF/IwBBMGsiAiQAIAIgATYCKCACIAA2AiQgAiABNgIgIAJBCGogAkEgahDdASACQRBqIAIoAgggAigCDBD+ASACQShqIAJBGGooAgA2AgAgAiACKQMQNwMgIAJBIGoQQiACQTBqJAALaAECfyMAQSBrIgMkACADQQA2AhgCQCABIAJrIgFBECABQRBJIgQbIgFFDQAgA0EIaiACIAEQrgIaIAQNACAAIAMpAwg3AAAgAEEIaiADQRBqKQMANwAAIANBIGokAA8LIAFBEBCdAQALcgEDfyMAQSBrIgIkAAJ/QQEgACABEF8NABogASgCBCEDIAEoAgAhBCACQQA2AhwgAkGwp8AANgIYIAJBATYCFCACQeC/wAA2AhAgAkEANgIIQQEgBCADIAJBCGoQPQ0AGiAAQQRqIAEQXwsgAkEgaiQAC2gBAn8jAEEgayICJAAgAkEYagJ/QQAgASgCCEUNABpBACABKAIEIgMgASgCAGsiASABIANLGwsiATYCACACQQE2AhQgAiABNgIQIAJBCGogAkEQahDUASAAIAIpAwg3AwAgAkEgaiQAC3IBAX8jAEEwayIDJAAgAyACNgIEIAMgATYCACADQRRqQQg2AgAgA0EJNgIMIAMgADYCCCADIAM2AhAgA0ECNgIsIANBAjYCJCADQaSQwAA2AiAgA0EANgIYIAMgA0EIajYCKCADQRhqEKsBIANBMGokAAt8AQN/IAAgABCzAiIAQQgQ/wEgAGsiAhCxAiEAQbDkwAAgASACayIBNgIAQbjkwAAgADYCACAAIAFBAXI2AgRBCEEIEP8BIQJBFEEIEP8BIQNBEEEIEP8BIQQgACABELECIAQgAyACQQhramo2AgRBxOTAAEGAgIABNgIAC3IAIwBBMGsiASQAQdDgwAAtAAAEQCABQRRqQQI2AgAgAUEcakEBNgIAIAFBzKPAADYCECABQQA2AgggAUEvNgIkIAEgADYCLCABIAFBIGo2AhggASABQSxqNgIgIAFBCGpB9KPAABDVAQALIAFBMGokAAthAQJ/IwBBEGsiAiQAIAAoAgAiAEEIaigCACEDIABBBGooAgAhACACIAEQ5QEgAwRAA0AgAiAANgIMIAIgAkEMahBoIABBAWohACADQX9qIgMNAAsLIAIQ4AEgAkEQaiQAC2gBAX8jAEFAaiIBJAAgAUEANgIIIAFCgICAgBA3AwAgAUEQaiABEOQBIAAgAUEQahCxAQRAQeSOwABBNyABQThqQZyPwABB+I/AABCYAQALIAEoAgQgASgCCBAHIAEQ+AEgAUFAayQAC2MBAX8jAEEgayIDJAAgAyABNgIEIAMgADYCACADQRhqIAJBEGopAgA3AwAgA0EQaiACQQhqKQIANwMAIAMgAikCADcDCCADQcTAwAAgA0EEakHEwMAAIANBCGpBgKjAABBNAAteACAAIAEgAiADECQhAAJAAkBBnYPAAC0AAAR/IAAgA0sNASABIAAgAmogAyAAaxC4AQVBAAsgAGogAEkNAQ8LIAAgA0HghsAAEJgCAAtB8IbAAEEqQZyHwAAQnAIAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrI7AACACQQhqED0gAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpB5KLAACACQQhqED0gAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBmKXAACACQQhqED0gAkEgaiQAC1MBAn8jAEEgayICJAAgASgCBCEDIAEoAgAgAkEYaiAAQRBqKQIANwMAIAJBEGogAEEIaikCADcDACACIAApAgA3AwggAyACQQhqED0gAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrMTAACACQQhqED0gAkEgaiQAC1MBAn8jAEEgayICJAAgACgCBCEDIAAoAgAgAkEYaiABQRBqKQIANwMAIAJBEGogAUEIaikCADcDACACIAEpAgA3AwggAyACQQhqED0gAkEgaiQAC1YBAX8jAEEgayICJAAgAiAANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrI7AACACQQhqED0gAkEgaiQAC1YBAX8jAEEgayICJAAgAiAANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBrMTAACACQQhqED0gAkEgaiQAC3UBA38jAEEQayIDJAAgASgCBCEFIAEoAggaIANBCGoiBCACKAIALQAAuBABNgIEIARBADYCACADKAIMIQIgAygCCCIERQRAIAEoAgAgBSACEBMgASABKAIEQQFqNgIECyAAIAQ2AgAgACACNgIEIANBEGokAAtcAQF/AkAgAUUEQEEBIQIMAQsgAUEATgRAIAFBf3NBH3YhAwJ/IAJFBEAgASADEIgCDAELIAEgAxDbAQsiAg0BIAEgAxCsAgALEMoBAAsgACACNgIEIAAgATYCAAtWAQJ/AkAgAEEDcEEDc0EDcCIERQRADAELQQAhAANAIAAgAkcEQCAAIAFqQT06AAAgAEEBaiEDQQEhACADIARJDQEMAgsLIAIgAkGsn8AAEJ4BAAsgAwtKAQF/IwBBIGsiAiQAIAIgASgCBCABKAIIEEggAkEYaiACQQhqKAIANgIAIAIgAikDADcDECAAIAJBEGoQeCABEPgBIAJBIGokAAtOAQF/IwBBMGsiAiQAIAJBEGogARA2IAJBKGogAkEYaigCADYCACACIAIpAxA3AyAgAkEIaiACQSBqEN0BIAAgAikDCDcDACACQTBqJAALRgEBfyMAQSBrIgEkACABQRhqIABBEGopAgA3AwAgAUEQaiAAQQhqKQIANwMAIAEgACkCADcDCCABQQhqEKsBIAFBIGokAAtfAQN/IwBBEGsiASQAAkAgACgCDCICBEAgACgCCCIDRQ0BIAEgAjYCCCABIAA2AgQgASADNgIAIAEQ3wEAC0H8osAAQStBsKTAABC+AQALQfyiwABBK0GgpMAAEL4BAAtRAQR/IwBBEGsiAiQAIAJBCGogASgCACIDEBpBABC3ASACKAIIIQQgACACKAIMIgU2AgQgACAENgIAIAEgBRDHASAAIAMQGjYCCCACQRBqJAALUgEBfyMAQSBrIgMkACADQQxqQQE2AgAgA0EUakEANgIAIANBsKfAADYCECADQQA2AgAgAyABNgIcIAMgADYCGCADIANBGGo2AgggAyACENUBAAtTAQF/IwBBIGsiAiQAIAJBDGpBATYCACACQRRqQQE2AgAgAkG8wMAANgIIIAJBADYCACACQcYANgIcIAIgADYCGCACIAJBGGo2AhAgAiABENUBAAtDAQN/AkAgAkUNAANAIAAtAAAiBCABLQAAIgVGBEAgAEEBaiEAIAFBAWohASACQX9qIgINAQwCCwsgBCAFayEDCyADC0sBAX8jAEEQayICJAAgAkEIaiAAIAFBARCLAQJAIAIoAgwiAEGBgICAeEcEQCAARQ0BIAIoAgggABCsAgALIAJBEGokAA8LEMoBAAtLAQF/IwBBEGsiAyQAIANBCGogACABIAIQiwECQCADKAIMIgBBgYCAgHhHBEAgAEUNASADKAIIIAAQrAIACyADQRBqJAAPCxDKAQALNAEBfyMAQRBrIgIkACACIABBCGo2AgggAiAANgIMIAEgAkEIaiACQQxqEIYBIAJBEGokAAtKAQF/IAAoAgAiACgCACAAKAIIIgNrIAJJBH8gACADIAIQwgEgACgCCAUgAwsgACgCBGogASACEK4CGiAAIAAoAgggAmo2AghBAAtHAQF/IAAoAgAiACgCACAAKAIIIgNrIAJJBEAgACADIAIQeyAAKAIIIQMLIAAoAgQgA2ogASACEK4CGiAAIAIgA2o2AghBAAtHAQF/IAAoAgAiACgCACAAKAIIIgNrIAJJBEAgACADIAIQfCAAKAIIIQMLIAAoAgQgA2ogASACEK4CGiAAIAIgA2o2AghBAAtCAQN/EB4iAxAXIgQQGCECIARBhAFPBEAgBBAACyACIAAoAgAgARAZIAJBhAFPBEAgAhAACyADQYQBTwRAIAMQAAsLQwEBfyAAKAIAIAAoAggiA2sgAkkEfyAAIAMgAhDCASAAKAIIBSADCyAAKAIEaiABIAIQrgIaIAAgACgCCCACajYCCAtDAQF/An9BACABKAIAIgIgASgCBE8NABogASACQQFqNgIAIAEoAggoAgAgAhAIIQFBAQshAiAAIAE2AgQgACACNgIAC0oBAX8jAEEgayIAJAAgAEEUakEBNgIAIABBHGpBADYCACAAQfClwAA2AhAgAEHApcAANgIYIABBADYCCCAAQQhqQfilwAAQ1QEAC0YBAn8gASgCBCECIAEoAgAhA0EIQQQQiAIiAUUEQEEIQQQQrAIACyABIAI2AgQgASADNgIAIABB0KTAADYCBCAAIAE2AgALOwIBfwF8IAEoAhhBAXEhAiAAKwMAIQMgASgCEEEBRgRAIAEgAyACIAFBFGooAgAQLg8LIAEgAyACEDcLOwEBfyMAQRBrIgIkACACQQhqIAFBBGogARCSASACKAIMIQEgACACKAIINgIAIAAgATYCBCACQRBqJAALPAEBfyMAQRBrIgIkACACQQhqIAAgARCCASACKAIMIgBBgYCAgHhHBEAgAigCCCAAEKwCAAsgAkEQaiQACzsBAX8jAEEQayICJAAgAkEIaiAAIAEQdiACKAIMIgBBgYCAgHhHBEAgAigCCCAAEKwCAAsgAkEQaiQACzsBAX8gAUEHaiICIAFJBEBB+JnAAEEzQaCbwAAQnAIACyAAIAJBA3Y2AgAgACABQQNqQQJ2QQNsNgIECzkBAX8gAUEQdkAAIQIgAEEANgIIIABBACABQYCAfHEgAkF/RiIBGzYCBCAAQQAgAkEQdCABGzYCAAs5AAJAAn8gAkGAgMQARwRAQQEgACACIAEoAhARAAANARoLIAMNAUEACw8LIAAgAyAEIAEoAgwRAQALNwEBfyMAQRBrIgIkACACIAE2AgwgACACQQxqEI4BIAIoAgwiAEGEAU8EQCAAEAALIAJBEGokAAs0AQF/An9BACABKAIEQQFHDQAaIAFBCGooAgAiAiABKAIARgshASAAIAI2AgQgACABNgIACz8BAX8jAEEgayICJAAgAkEBOgAYIAIgATYCFCACIAA2AhAgAkGswMAANgIMIAJBsKfAADYCCCACQQhqELwBAAswAQF/AkAgACgCACIAEAJBAUcNACAAEAwiABALQQFGIQEgAEGEAUkNACAAEAALIAELMwACQCAAQfz///8HSw0AIABFBEBBBA8LIAAgAEH9////B0lBAnQQiAIiAEUNACAADwsACzYBAX8jAEEQayICJAAgAkEIaiABENABIAIoAgwhASAAIAIoAgg2AgAgACABNgIEIAJBEGokAAslAQF/IwBBEGsiAiQAIAIgADYCDCABIAJBDGoQhAEgAkEQaiQACzIAIAAoAgAhACABEI8CRQRAIAEQkAJFBEAgACABEJsCDwsgACABEJUBDwsgACABEJQBCyYAAkAgACABEE4iAUUNACABELQCEJMCDQAgAUEAIAAQrwIaCyABCzYAIAAoAgAhACABEI8CRQRAIAEQkAJFBEAgADEAAEEBIAEQWw8LIAAgARCQAQ8LIAAgARCRAQsyAQF/IAAgASgCACABKAIIIgJLBH8gASACEM8BIAEoAggFIAILNgIEIAAgASgCBDYCAAsuAQF/IAEoAgAiAgRAIABBATYCCCAAIAI2AgQgACABKAIENgIADwsgAEEANgIICy0BAX8jAEEQayIBJAAgAUEIaiAAQQhqKAIANgIAIAEgACkCADcDACABEJMBAAsyAQF/QQEhASAALQAEBH8gAQUgACgCACIAKAIAQbTCwABBASAAQQRqKAIAKAIMEQEACwsnACAAIAAoAgRBAXEgAXJBAnI2AgQgACABaiIAIAAoAgRBAXI2AgQLOgECf0HU4MAALQAAIQFB1ODAAEEAOgAAQdjgwAAoAgAhAkHY4MAAQQA2AgAgACACNgIEIAAgATYCAAsnACAAQgA3AAAgAEEYakIANwAAIABBEGpCADcAACAAQQhqQgA3AAALNAAgAEEDOgAgIABCgICAgIAENwIYIABBADYCECAAQQA2AgggAEHMjsAANgIEIAAgATYCAAsyAQF/IAEoAgBBosLAAEEBIAEoAgQoAgwRAQAhAiAAQQA6AAUgACACOgAEIAAgATYCAAsgAQF/AkAgAEEEaigCACIBRQ0AIAAoAgBFDQAgARAoCwsmAQF/IwBBEGsiAyQAIAMgATYCDCADIAA2AgggA0EIaiACEL8BAAsjAAJAIAFB/P///wdNBEAgACABQQQgAhCAAiIADQELAAsgAAsfACABIANGBEAgACACIAEQrgIaDwsgASADIAQQogEACyMAIAIgAigCBEF+cTYCBCAAIAFBAXI2AgQgACABaiABNgIACx4AIABFBEAQpQIACyAAIAIgAyAEIAUgASgCEBEKAAsfAQJ+IAApAwAiAiACQj+HIgOFIAN9IAJCf1UgARBbCyABAX8gACgCACAAKAIIIgJrIAFJBEAgACACIAEQwgELCxwAIABFBEAQpQIACyAAIAIgAyAEIAEoAhARBwALHAAgAEUEQBClAgALIAAgAiADIAQgASgCEBEWAAscACAARQRAEKUCAAsgACACIAMgBCABKAIQERcACxwAIABFBEAQpQIACyAAIAIgAyAEIAEoAhARCAALHAAgAEUEQBClAgALIAAgAiADIAQgASgCEBEYAAseACAAIAFBA3I2AgQgACABaiIAIAAoAgRBAXI2AgQLGgAgAEUEQBClAgALIAAgAiADIAEoAhARAwALFAAgACgCAARAIABBBGooAgAQKAsLIgAgAC0AAEUEQCABQcTFwABBBRArDwsgAUHAxcAAQQQQKwsYACAARQRAEKUCAAsgACACIAEoAhARAAALEQAgACgCAARAIAAoAgQQKAsLGQEBfyAAKAIQIgEEfyABBSAAQRRqKAIACwsSAEEAQRkgAEEBdmsgAEEfRhsLFgAgACABQQFyNgIEIAAgAWogATYCAAsUACAAKAIAIgBBhAFPBEAgABAACwsUACAAIAI5AwggACABQQBHrTcDAAsXACAAIAI2AgggACABNgIEIAAgAjYCAAsQACAAIAFqQX9qQQAgAWtxCwwAIAAgASACIAMQLQsLACABBEAgABAoCwsPACAAQQF0IgBBACAAa3ILFgAgACgCACABIAIgACgCBCgCDBEBAAsZACABKAIAQaDZwABBBSABKAIEKAIMEQEACwoAIABBCGoQ+AELFAAgACgCACABIAAoAgQoAgwRAAALDwAgACABIAIgAyAEECUACwgAIAAgARBOCxAAIAAoAgAgACgCBCABEC8LEAAgASAAKAIEIAAoAggQKwsWAEHY4MAAIAA2AgBB1ODAAEEBOgAACxMAIABB0KTAADYCBCAAIAE2AgALDQAgAC0ABEECcUEBdgsQACABIAAoAgAgACgCBBArCw0AIAAtABhBEHFBBHYLDQAgAC0AGEEgcUEFdgsNACAAIAEgAhDIAUEACwoAQQAgAGsgAHELCwAgAC0ABEEDcUULDAAgACABQQNyNgIECw0AIAAoAgAgACgCBGoLDQAgACgCACABEFlBAAsOACAAKAIAGgNADAALAAsMACAAIAEgAhCfAQALDAAgACABIAIQoAEACwwAIAAgASACEKEBAAsNACAANQIAQQEgARBbCwwAIAAgASACEOcBAAsNACAAKAIAIAEgAhBKCw0AIAApAwBBASABEFsLDgAgACgCAC0AACABEGALDgAgACgCACkDACABEEkLCwAgACMAaiQAIwALDgAgAUH4iMAAQQoQgwILBwAgABD4AQsMACAAKAIAIAEQjQELDABBxJTAAEEyEB0ACw4AIAFBoKHAAEEIEIMCCwoAIAAoAgRBeHELCgAgACgCBEEBcQsKACAAKAIMQQFxCwoAIAAoAgxBAXYLCwAgACgCACABEH8LGQAgACABQfTgwAAoAgAiAEEwIAAbEQIAAAsLACAAKAIAIAEQXwsKACAAIAEgAhBaCwsAIAAgASACEIUBCw4AIAFBqJPAAEECEIMCCwcAIAAgAWoLBwAgACABawsHACAAQQhqCwcAIABBeGoLDQBCyLXgz8qG29OJfwsNAELujtXpx4aXxKR/CwwAQtf+oZ2h8ZeHHQsDAAELC/xbCQBBgIDAAAupCmNhbGxlZCBgUmVzdWx0Ojp1bndyYXAoKWAgb24gYW4gYEVycmAgdmFsdWUAAQAAAAQAAAAEAAAAAgAAAAMAAAAUAAAABAAAAAQAAAAxMjM0NTY3ODkwMDk4NzY1/////////////////////////////////////////////////////////z7///8/NDU2Nzg5Ojs8Pf////////8AAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGf///////xobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIz/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8CAABzcmNcbGliLnJzAAAAnwEQAAoAAAAaAAAALQAAAJ8BEAAKAAAALAAAADIAAACfARAACgAAADIAAAAyAAAAnwEQAAoAAAA4AAAAKQAAAJ8BEAAKAAAAPQAAAEAAAACfARAACgAAAEcAAAAyAAAAnwEQAAoAAABNAAAAMgAAAJ8BEAAKAAAAUAAAACEAAACfARAACgAAAFMAAAAjAAAABQAAAAAAAAABAAAABgAAAAUAAAAAAAAAAQAAAAcAAAAQAAAAQzpcVXNlcnNcd2FuZ2xpcDhcLmNhcmdvXHJlZ2lzdHJ5XHNyY1xnaXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjNcZ2VuZXJpYy1hcnJheS0wLjE0LjZcc3JjXGxpYi5ycwAAAGACEABhAAAANQIAAAkAAABpbnZhbGlkIHZhbHVlOiAsIGV4cGVjdGVkIAAA1AIQAA8AAADjAhAACwAAAEM6XFVzZXJzXHdhbmdsaXA4XC5jYXJnb1xyZWdpc3RyeVxzcmNcZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzXGJhc2U2NC0wLjIxLjBcc3JjXGVuY29kZS5ycwAAAAADEABdAAAAUAAAACcAAAB1c2l6ZSBvdmVyZmxvdyB3aGVuIGNhbGN1bGF0aW5nIGI2NCBsZW5ndGgAAAADEABdAAAAVwAAAAoAAAAKAAAAFAAAAAQAAAAEAAAAQzpcVXNlcnNcd2FuZ2xpcDhcLmNhcmdvXHJlZ2lzdHJ5XHNyY1xnaXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjNcYmFzZTY0LTAuMjEuMFxzcmNcZW5naW5lXG1vZC5yc2ludGVnZXIgb3ZlcmZs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XFVzZXJzXHdhbmdsaXA4XC5jYXJnb1xyZWdpc3RyeVxzcmNcZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzXGJhc2U2NC0wLjIxLjBcc3JjXGVuZ2luZVxnZW5lcmFsX3B1cnBvc2VcZGVjb2RlLnJzACsNEAB0AAAAJAAAABIAAABDOlxVc2Vyc1x3YW5nbGlwOFwuY2FyZ29ccmVnaXN0cnlcc3JjXGdpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyM1xiYXNlNjQtMC4yMS4wXHNyY1xlbmdpbmVcZ2VuZXJhbF9wdXJwb3NlXGRlY29kZV9zdWZmaXgucnMAsA0QAHsAAAAdAAAAFAAAAGludGVybmFsIGVycm9yOiBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGU6IAAAPA4QACoAAABJbXBvc3NpYmxlOiBtdXN0IG9ubHkgaGF2ZSAwIHRvIDggaW5wdXQgYnl0ZXMgaW4gbGFzdCBjaHVuaywgd2l0aCBubyBpbnZhbGlkIGxlbmd0aHNwDhAAVAAAALANEAB7AAAAhQAAAA4AAACwDRAAewAAAJoAAAAJAAAAaW50ZXJuYWwgZXJyb3I6IGVudGVyZWQgdW5yZWFjaGFibGUgY29kZTogAADsDhAAKgAAAEltcG9zc2libGUgcmVtYWluZGVyIA8QABQAAABDOlxVc2Vyc1x3YW5nbGlwOFwuY2FyZ29ccmVnaXN0cnlcc3JjXGdpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyM1xiYXNlNjQtMC4yMS4wXHNyY1xlbmNvZGUucnMAAAA8DxAAXQAAAG4AAAAWAAAAPA8QAF0AAACBAAAACQAAAEM6XFVzZXJzXHdhbmdsaXA4XC5jYXJnb1xyZWdpc3RyeVxzcmNcZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzXGFlcy0wLjguMlxzcmNcc29mdFxmaXhzbGljZTMyLnJzAAC8DxAAYgAAAEsAAAAjAAAAvA8QAGIAAABMAAAAIwAAALwPEABiAAAACQEAACQAAAC8DxAAYgAAAB4BAAAoAAAAvA8QAGIAAACJBAAAEgAAALwPEABiAAAAiQQAAD0AAAC8DxAAYgAAABQFAAAiAAAAvA8QAGIAAAAUBQAACQAAAFBhZEVycm9yR2VuZXJpY0Fy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N6sOYTkvGKE5MBxhSPMeoUxANGFQ8GqhUU9vIVKdvKFSAM9hU2XRoVMA2iFUAODhVa7iYVfs5CFZ0OihWSAA7lnwAX9aAHAABwAtAQEBAgECAQFICzAVEAFlBwIGAgIBBCMBHhtbCzoJCQEYBAEJAQMBBSsDPAgqGAEgNwEBAQQIBAEDBwoCHQE6AQEBAgQIAQkBCgIaAQICOQEEAgQCAgMDAR4CAwELAjkBBAUBAgQBFAIWBgEBOgEBAgEECAEHAwoCHgE7AQEBDAEJASgBAwE3AQEDBQMBBAcCCwIdAToBAgECAQMBBQIHAgsCHAI5AgEBAgQIAQkBCgIdAUgBBAECAwEBCAFRAQIHDAhiAQIJCwdJAhsBAQEBATcOAQUBAgULASQJAWYEAQYBAgICGQIEAxAEDQECAgYBDwEAAwADHQIeAh4CQAIBBwgBAgsJAS0DAQF1AiIBdgMEAgkBBgPbAgIBOgEBBwEBAQECCAYKAgEwHzEEMAcBAQUBKAkMAiAEAgIBAzgBAQIDAQEDOggCApgDAQ0BBwQBBgEDAsZAAAHDIQADjQFgIAAGaQIABAEKIAJQAgABAwEEARkCBQGXAhoSDQEmCBkLLgMwAQIEAgInAUMGAgICAgwBCAEvATMBAQMCAgUCAQEqAggB7gECAQQBAAEAEBAQAAIAAeIBlQUAAwECBQQoAwQBpQIABAACUANGCzEEewE2DykBAgIKAzEEAgIHAT0DJAUBCD4BDAI0CQoEAgFfAwIBAQIGAQIBnQEDCBUCOQIBAQEBFgEOBwMFwwgCAwEBFwFRAQIGAQECAQECAQLrAQIEBgIBAhsCVQgCAQECagEBAQIGAQFlAwIEAQUACQEC9QEKAgEBBAGQBAICBAEgCigGAgQIAQkGAgMuDQECAAcBBgEBUhYCBwECAQJ6BgMBAQIBBwEBSAIDAQEBAAILAjQFBQEBAQABBg8ABTsHAAE/BFEBAAIALgIXAAEBAwQFCAgCBx4ElAMANwQyCAEOARYFAQ8ABwERAgcBAgEFZAGgBwABPQQABAAHbQcAYIDwAHsJcHJvZHVjZXJzAghsYW5ndWFnZQEEUnVzdAAMcHJvY2Vzc2VkLWJ5AwVydXN0Yx0xLjY4LjEgKDg0NjBjYTgyMyAyMDIzLTAzLTIwKQZ3YWxydXMGMC4xOS4wDHdhc20tYmluZGdlbhIwLjIuODQgKGNlYThjYzNkMik=", ar = async (A = {}, I) => {
  let g;
  if (I.startsWith("data:")) {
    const B = I.replace(/^data:.*?base64,/, "");
    let Q;
    if (typeof Buffer == "function" && typeof Buffer.from == "function")
      Q = Buffer.from(B, "base64");
    else if (typeof atob == "function") {
      const C = atob(B);
      Q = new Uint8Array(C.length);
      for (let E = 0; E < C.length; E++)
        Q[E] = C.charCodeAt(E);
    } else
      throw new Error("Cannot decode base64-encoded data URL");
    g = await WebAssembly.instantiate(Q, A);
  } else {
    const B = await fetch(I), Q = B.headers.get("Content-Type") || "";
    if ("instantiateStreaming" in WebAssembly && Q.startsWith("application/wasm"))
      g = await WebAssembly.instantiateStreaming(B, A);
    else {
      const C = await B.arrayBuffer();
      g = await WebAssembly.instantiate(C, A);
    }
  }
  return g.instance.exports;
};
let O;
function rr(A) {
  O = A;
}
const fA = new Array(128).fill(void 0);
fA.push(void 0, null, !0, !1);
function p(A) {
  return fA[A];
}
let eI = fA.length;
function cr(A) {
  A < 132 || (fA[A] = eI, eI = A);
}
function _g(A) {
  const I = p(A);
  return cr(A), I;
}
function X(A) {
  eI === fA.length && fA.push(fA.length + 1);
  const I = eI;
  return eI = fA[I], fA[I] = A, I;
}
function Dg(A) {
  return A == null;
}
let uI = null;
function Dr() {
  return (uI === null || uI.byteLength === 0) && (uI = new Float64Array(O.memory.buffer)), uI;
}
let dI = null;
function JA() {
  return (dI === null || dI.byteLength === 0) && (dI = new Int32Array(O.memory.buffer)), dI;
}
let oI = 0, GI = null;
function NI() {
  return (GI === null || GI.byteLength === 0) && (GI = new Uint8Array(O.memory.buffer)), GI;
}
const lr = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
let FI = new lr("utf-8");
const hr = typeof FI.encodeInto == "function" ? function(A, I) {
  return FI.encodeInto(A, I);
} : function(A, I) {
  const g = FI.encode(A);
  return I.set(g), {
    read: A.length,
    written: g.length
  };
};
function Xg(A, I, g) {
  if (g === void 0) {
    const e = FI.encode(A), t = I(e.length);
    return NI().subarray(t, t + e.length).set(e), oI = e.length, t;
  }
  let B = A.length, Q = I(B);
  const C = NI();
  let E = 0;
  for (; E < B; E++) {
    const e = A.charCodeAt(E);
    if (e > 127)
      break;
    C[Q + E] = e;
  }
  if (E !== B) {
    E !== 0 && (A = A.slice(E)), Q = g(Q, B, B = E + A.length * 3);
    const e = NI().subarray(Q + E, Q + B), t = hr(A, e);
    E += t.written;
  }
  return oI = E, Q;
}
const fr = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
let OQ = new fr("utf-8", { ignoreBOM: !0, fatal: !0 });
OQ.decode();
function Zg(A, I) {
  return OQ.decode(NI().subarray(A, A + I));
}
function lg(A) {
  const I = typeof A;
  if (I == "number" || I == "boolean" || A == null)
    return `${A}`;
  if (I == "string")
    return `"${A}"`;
  if (I == "symbol") {
    const Q = A.description;
    return Q == null ? "Symbol" : `Symbol(${Q})`;
  }
  if (I == "function") {
    const Q = A.name;
    return typeof Q == "string" && Q.length > 0 ? `Function(${Q})` : "Function";
  }
  if (Array.isArray(A)) {
    const Q = A.length;
    let C = "[";
    Q > 0 && (C += lg(A[0]));
    for (let E = 1; E < Q; E++)
      C += ", " + lg(A[E]);
    return C += "]", C;
  }
  const g = /\[object ([^\]]+)\]/.exec(toString.call(A));
  let B;
  if (g.length > 1)
    B = g[1];
  else
    return toString.call(A);
  if (B == "Object")
    try {
      return "Object(" + JSON.stringify(A) + ")";
    } catch {
      return "Object";
    }
  return A instanceof Error ? `${A.name}: ${A.message}
${A.stack}` : B;
}
function yr(A) {
  const I = Xg(A, O.__wbindgen_malloc, O.__wbindgen_realloc), g = oI, B = O.encrypt(I, g);
  return _g(B);
}
function wr(A) {
  try {
    const B = O.__wbindgen_add_to_stack_pointer(-16);
    O.decrypt(B, X(A));
    var I = JA()[B / 4 + 0], g = JA()[B / 4 + 1];
    return Zg(I, g);
  } finally {
    O.__wbindgen_add_to_stack_pointer(16), O.__wbindgen_free(I, g);
  }
}
function Pg(A, I) {
  try {
    return A.apply(this, I);
  } catch (g) {
    O.__wbindgen_exn_store(X(g));
  }
}
function ur(A) {
  _g(A);
}
function dr(A) {
  return X(A);
}
function Gr(A) {
  const I = p(A);
  return typeof I == "object" && I !== null;
}
function Mr(A, I) {
  return p(A) == p(I);
}
function Nr(A) {
  const I = p(A);
  return typeof I == "boolean" ? I ? 1 : 0 : 2;
}
function Fr(A, I) {
  const g = p(I), B = typeof g == "number" ? g : void 0;
  Dr()[A / 8 + 1] = Dg(B) ? 0 : B, JA()[A / 4 + 0] = !Dg(B);
}
function pr(A, I) {
  const g = p(I), B = typeof g == "string" ? g : void 0;
  var Q = Dg(B) ? 0 : Xg(B, O.__wbindgen_malloc, O.__wbindgen_realloc), C = oI;
  JA()[A / 4 + 1] = C, JA()[A / 4 + 0] = Q;
}
function kr(A, I) {
  const g = new Error(Zg(A, I));
  return X(g);
}
function Sr(A, I) {
  const g = p(A)[I >>> 0];
  return X(g);
}
function Rr(A) {
  return p(A).length;
}
function Jr() {
  const A = new Array();
  return X(A);
}
function Yr(A) {
  return typeof p(A) == "function";
}
function Ur(A) {
  const I = p(A).next;
  return X(I);
}
function Lr() {
  return Pg(function(A) {
    const I = p(A).next();
    return X(I);
  }, arguments);
}
function Hr(A) {
  return p(A).done;
}
function br(A) {
  const I = p(A).value;
  return X(I);
}
function mr() {
  return X(Symbol.iterator);
}
function xr() {
  return Pg(function(A, I) {
    const g = Reflect.get(p(A), p(I));
    return X(g);
  }, arguments);
}
function vr() {
  return Pg(function(A, I) {
    const g = p(A).call(p(I));
    return X(g);
  }, arguments);
}
function qr(A, I, g) {
  p(A)[I >>> 0] = _g(g);
}
function Kr(A) {
  return Array.isArray(p(A));
}
function Or(A) {
  let I;
  try {
    I = p(A) instanceof ArrayBuffer;
  } catch {
    I = !1;
  }
  return I;
}
function zr(A) {
  return Number.isSafeInteger(p(A));
}
function Tr(A) {
  const I = p(A).buffer;
  return X(I);
}
function jr(A) {
  const I = new Uint8Array(p(A));
  return X(I);
}
function _r(A, I, g) {
  p(A).set(p(I), g >>> 0);
}
function Xr(A) {
  return p(A).length;
}
function Zr(A) {
  let I;
  try {
    I = p(A) instanceof Uint8Array;
  } catch {
    I = !1;
  }
  return I;
}
function Pr(A, I) {
  const g = lg(p(I)), B = Xg(g, O.__wbindgen_malloc, O.__wbindgen_realloc), Q = oI;
  JA()[A / 4 + 1] = Q, JA()[A / 4 + 0] = B;
}
function Vr(A, I) {
  throw new Error(Zg(A, I));
}
function Wr() {
  const A = O.memory;
  return X(A);
}
URL = globalThis.URL;
const cA = await ar({ "./rich_wasm_bg.js": { __wbindgen_object_drop_ref: ur, __wbindgen_number_new: dr, __wbindgen_is_object: Gr, __wbindgen_jsval_loose_eq: Mr, __wbindgen_boolean_get: Nr, __wbindgen_number_get: Fr, __wbindgen_string_get: pr, __wbindgen_error_new: kr, __wbg_get_27fe3dac1c4d0224: Sr, __wbg_length_e498fbc24f9c1d4f: Rr, __wbg_new_b525de17f44a8943: Jr, __wbindgen_is_function: Yr, __wbg_next_b7d530c04fd8b217: Ur, __wbg_next_88560ec06a094dea: Lr, __wbg_done_1ebec03bbd919843: Hr, __wbg_value_6ac8da5cc5b3efda: br, __wbg_iterator_55f114446221aa5a: mr, __wbg_get_baf4855f9a986186: xr, __wbg_call_95d1ea488d03e4e8: vr, __wbg_set_17224bc548dd1d7b: qr, __wbg_isArray_39d28997bf6b96b4: Kr, __wbg_instanceof_ArrayBuffer_a69f02ee4c4f5065: Or, __wbg_isSafeInteger_8c4789029e885159: zr, __wbg_buffer_cf65c07de34b9a08: Tr, __wbg_new_537b7341ce90bb31: jr, __wbg_set_17499e8aa4003ebd: _r, __wbg_length_27a2afe8ab42b09f: Xr, __wbg_instanceof_Uint8Array_01cebe79ca606cca: Zr, __wbindgen_debug_string: Pr, __wbindgen_throw: Vr, __wbindgen_memory: Wr } }, sr), $r = cA.memory, Ac = cA.secretkey, Ic = cA.validate, gc = cA.encrypt, Bc = cA.decrypt, Qc = cA.__wbindgen_malloc, Cc = cA.__wbindgen_realloc, Ec = cA.__wbindgen_add_to_stack_pointer, ec = cA.__wbindgen_free, tc = cA.__wbindgen_exn_store, ic = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  __wbindgen_add_to_stack_pointer: Ec,
  __wbindgen_exn_store: tc,
  __wbindgen_free: ec,
  __wbindgen_malloc: Qc,
  __wbindgen_realloc: Cc,
  decrypt: Bc,
  encrypt: gc,
  memory: $r,
  secretkey: Ac,
  validate: Ic
}, Symbol.toStringTag, { value: "Module" }));
rr(ic);
const nc = function(A) {
  return new Promise((I, g) => {
    if (A instanceof Blob) {
      var B = new FileReader();
      B.onload = function(Q) {
        I(Q.target.result);
      }, B.onerror = (Q) => {
        g(Q);
      }, B.readAsArrayBuffer(A);
    } else
      g("不是二进制文件");
  });
}, xB = function(A) {
  let I = typeof A == "string" ? A : JSON.stringify(A), g = yr(I);
  return new Blob([new Uint8Array(g).buffer]);
}, Eg = async function(A) {
  let I = null;
  if (typeof A == "string")
    I = A;
  else if (A instanceof Blob) {
    let g = await nc(A), B = Array.prototype.slice.call(new Uint8Array(g));
    I = wr(B);
  } else if (A && typeof A == "object" && typeof A != "function" && !Array.isArray(A))
    return A;
  try {
    return JSON.parse(I);
  } catch {
    Promise.reject("数据格式无效");
  }
};
function oc(A) {
  let I = A ? $(A) : {};
  qg(), Rg(), Tg(), zg(), jg();
  let g = [], B = [];
  I.modules && (g = I.modules, delete I.modules), I.actions && (B = I.actions, delete I.actions), I.remote && I.remote instanceof Array && (I.remote.forEach((Q) => {
    bI(Q);
  }), delete I.remote), I.globalData && (cg({
    id: "GD_query",
    name: "url参数",
    type: "temp",
    value: { data: XB() }
  }), I.globalData.forEach((Q) => {
    cg(Q);
  }), delete I.globalData), Array.isArray(I.plugins) && (I.plugins.forEach((Q) => {
    qQ(Q);
  }), delete I.plugins), YQ(I), pQ(g), B.forEach((Q) => {
    qA(Q);
  }), G.emit(b.DATA_LOADED, !0), xQ(!0);
}
function eg() {
  let A = LQ(), I = $(bg());
  I.forEach((B) => {
    B.components && Array.isArray(B.components) && (B.components = B.components.map((Q) => {
      if (Q.type == "group") {
        let C = ZI(Q.id);
        return C.components && (C.components = C.components.map((E) => {
          let e = tA(E.id);
          return e.selected = !1, e;
        })), C.selected = !1, C;
      } else {
        let C = tA(Q.id);
        return C.selected = !1, C;
      }
    }));
  });
  let g = $(vQ());
  return g.forEach((B, Q) => {
    B.type == "temp" && g.splice(Q, 1);
  }), $({
    id: A.info.id,
    title: A.info.title,
    creattime: A.info.creattime,
    uptime: A.info.uptime,
    cover: A.info.cover,
    description: A.info.description,
    width: A.size.width,
    height: A.size.height,
    scaleMode: A.scale.mode,
    background: A.background,
    network: A.network,
    globalData: g,
    modules: I,
    actions: LA(),
    plugins: KQ(),
    remote: HQ().map((B) => ({
      id: B.id,
      url: B.url,
      body: B.body || "",
      method: B.method || "",
      itval: B.itval || 0,
      extractRule: B.extractRule || ""
    }))
  });
}
function sc(...A) {
  let I = new Date().getTime(), g = {
    id: "A_" + _(10),
    title: "",
    creattime: I,
    uptime: I,
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
  return Object.assign({}, g, ...A);
}
var hg = function() {
}, mI = {}, Vg = {}, xI = {};
function ac(A, I) {
  A = A.push ? A : [A];
  var g = [], B = A.length, Q = B, C, E, e, t;
  for (C = function(o, s) {
    s.length && g.push(o), Q--, Q || I(g);
  }; B--; ) {
    if (E = A[B], e = Vg[E], e) {
      C(E, e);
      continue;
    }
    t = xI[E] = xI[E] || [], t.push(C);
  }
}
function zQ(A, I) {
  if (A) {
    var g = xI[A];
    if (Vg[A] = I, !!g)
      for (; g.length; )
        g[0](A, I), g.splice(0, 1);
  }
}
function fg(A, I) {
  A.call && (A = { success: A }), I.length ? (A.error || hg)(I) : (A.success || hg)(A);
}
function TQ(A, I, g, B) {
  var Q = document, C = g.async, E = (g.numRetries || 0) + 1, e = g.before || hg, t = A.replace(/[\?|#].*$/, ""), o = A.replace(/^(css|img|module|nomodule)!/, ""), s, n, D;
  if (B = B || 0, /(^css!|\.css$)/.test(t))
    D = Q.createElement("link"), D.rel = "stylesheet", D.href = o, s = "hideFocus" in D, s && D.relList && (s = 0, D.rel = "preload", D.as = "style");
  else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(t))
    D = Q.createElement("img"), D.src = o;
  else if (D = Q.createElement("script"), D.src = o, D.async = C === void 0 ? !0 : C, n = "noModule" in D, /^module!/.test(t)) {
    if (!n)
      return I(A, "l");
    D.type = "module";
  } else if (/^nomodule!/.test(t) && n)
    return I(A, "l");
  D.onload = D.onerror = D.onbeforeload = function(d) {
    var u = d.type[0];
    if (s)
      try {
        D.sheet.cssText.length || (u = "e");
      } catch (Z) {
        Z.code != 18 && (u = "e");
      }
    if (u == "e") {
      if (B += 1, B < E)
        return TQ(A, I, g, B);
    } else if (D.rel == "preload" && D.as == "style")
      return D.rel = "stylesheet";
    I(A, u, d.defaultPrevented);
  }, e(A, D) !== !1 && Q.head.appendChild(D);
}
function rc(A, I, g) {
  A = A.push ? A : [A];
  var B = A.length, Q = B, C = [], E, e;
  for (E = function(t, o, s) {
    if (o == "e" && C.push(t), o == "b")
      if (s)
        C.push(t);
      else
        return;
    B--, B || I(C);
  }, e = 0; e < Q; e++)
    TQ(A[e], E, g);
}
function jA(A, I, g) {
  var B, Q;
  if (I && I.trim && (B = I), Q = (B ? g : I) || {}, B) {
    if (B in mI)
      throw "LoadJS";
    mI[B] = !0;
  }
  function C(E, e) {
    rc(A, function(t) {
      fg(Q, t), E && fg({ success: E, error: e }, t), zQ(B, t);
    }, Q);
  }
  if (Q.returnPromise)
    return new Promise(C);
  C();
}
jA.ready = function(I, g) {
  return ac(I, function(B) {
    fg(g, B);
  }), jA;
};
jA.done = function(I) {
  zQ(I, []);
};
jA.reset = function() {
  mI = {}, Vg = {}, xI = {};
};
jA.isDefined = function(I) {
  return I in mI;
};
const vI = {}, cc = function(A) {
  return Object.assign(vI, A), vI;
}, yg = function(A) {
  A instanceof Function ? A(vI) : A && typeof A == "object" && A.install && A.install instanceof Function && A.install(vI);
}, jQ = function({ url: A, name: I }) {
  return new Promise((g, B) => {
    jA(A, function() {
      typeof I == "string" ? yg(window[I]) : Array.isArray(I) && I.forEach((Q) => {
        yg(window[Q]);
      }), g();
    });
  });
}, Dc = function(A) {
  return new Promise((I, g) => {
    if (Array.isArray(A)) {
      let B = [];
      A.forEach((Q) => {
        B.push(jQ(Q));
      }), Promise.all(B).then(I, g);
    } else
      I();
  });
}, V = {
  getData(A = !1) {
    if (A == !1)
      return eg();
    {
      let I = eg();
      return xB(I);
    }
  },
  // init: initData,
  async init(A) {
    let I = await Eg(A);
    return I && Array.isArray(I.plugins) && await Dc(I.plugins), oc(I), I;
  },
  encrypt: xB,
  decrypt: Eg,
  ...ja,
  ...Vs,
  ...Ns,
  ...er,
  ...or,
  async copyData(A, I) {
    let g = null;
    return A ? g = await Eg(A) : g = eg(), g.id = "A_" + _(10), I && Object.assign(g, I), g;
  },
  getElement(A) {
    return tA(A) || ZI(A);
  },
  getElements() {
    return [...NQ(), ...xg()];
  },
  getTemplateData: sc,
  clearDataAll() {
    qg(), Rg(), Tg(), zg(), jg(), UQ(), Wg();
  }
}, { events: lc } = DI, _Q = function(A, I) {
  let g = lc.find((B) => B.event == A) || NA.getComponentEvents(I).find((B) => B.event == A);
  return g ? $(g) : !1;
}, HA = function(A, I, g = !1) {
  let B = tA(A);
  return I ? g ? B.events ? B.events.findIndex((Q) => Q.event == I) : -1 : B.events ? B.events.find((Q) => Q.event == I) : null : B.events || null;
}, hc = function(A, I, g) {
  let B = HA(A, I);
  if (B)
    return B;
  let Q = tA(A), C = _Q(I, Q.name);
  return Q && C ? (Q.events || (Q.events = []), g && (C.pams = g), Q.events.push(C), Q.events[Q.events.length - 1]) : (console.warn(Q ? I + "事件名称不对" : "缺少组件数据"), null);
}, fc = function(A, I, g) {
  let B = HA(A, I, !0);
  if (B > -1) {
    let Q = tA(A);
    return Q.events[B].pams = g, Q.events[B];
  }
  return null;
}, yc = function(A, I) {
  let g = HA(A, I, !0);
  if (g > -1) {
    let B = tA(A);
    return B.events.splice(g, 1), B.events;
  }
  return null;
};
let { actions: wc } = DI;
const uc = function(A, I = "", g, B = "") {
  let Q = wc.find((C) => C.action == A);
  return Q ? Q.target == "component" ? qA({
    action: Q.action,
    target: I,
    value: typeof g < "u" ? g : Q.value,
    description: B || Q.name + tA(I).title
  }) : Q.target == "url" ? qA({
    action: Q.action,
    target: I,
    value: typeof g < "u" ? g : Q.value,
    description: B || Q.name
  }) : qA({
    action: A,
    target: I,
    value: g,
    description: B || Q.name
  }) : (console.warn(A + " 动作不存在"), null);
}, dc = function(A) {
  return A.id ? qA(A) : (console.warn("没有要修改的动作信息"), null);
}, Gc = function(A, I, g = "") {
  if (g && typeof I == "string") {
    let B = HA(I, g);
    return B ? B.actions.findIndex((Q) => Q == A) < 0 && B.actions.push(A) : console.warn(I + "中" + g + "事件不存在"), B;
  } else if (typeof I == "object" && I.actions && I.actions instanceof Array)
    return I.actions.push(A), I;
}, Mc = function(A, I, g, B) {
  if (g && typeof I == "string") {
    let Q = HA(I, g);
    return Q ? typeof B < "u" && (Q.actionValue || (Q.actionValue = {}), Q.actionValue[A] = B) : console.warn(I + "中" + g + "事件不存在"), Q;
  }
}, Nc = function(A, I, g = "", B = !1) {
  if (g && typeof I == "string") {
    let Q = HA(I, g);
    return Q && aA(Q.actions, "", A), B && sg(A), Q;
  } else if (typeof I == "object" && I.actions && I.actions instanceof Array)
    return aA(I.actions, "", A), B && sg(A), I;
}, Fc = function(A, I) {
  let g = [];
  if (A) {
    let B = tA(A);
    if (Array.isArray(B.events))
      if (I) {
        let Q = B.events.find((C) => C.event == I);
        Q && (g = Q.actions.map((C) => ({
          sname: B.title,
          sid: B.id,
          event: Q.event,
          id: C
        })));
      } else
        g = B.events.map((Q) => Q.actions ? Q.actions.map((C) => ({
          sname: B.title,
          sid: B.id,
          event: Q.event,
          id: C
        })) : []).flat();
  } else
    g = xg().map((B) => B.events && B.events.length > 0 ? B.events.map((Q) => Q.actions ? Q.actions.map((C) => ({
      sname: B.title,
      sid: B.id,
      event: Q.event,
      id: C
    })) : []).flat() : []).flat();
  return g;
}, _A = $, pc = Ng;
let RA = {}, wg = [];
const Wg = function() {
  wg.forEach((A) => {
    A();
  }), wg = [];
  for (const A in RA)
    RA[A] = null;
  RA = {};
}, $g = function(A) {
  if (typeof A != "string")
    return A;
  if (/^RD_\S{10}$/.test(A) && Y[A])
    return Y[A].data;
  {
    let I = A, g = null;
    if (/.\?+./.test(A)) {
      let B = A.split("?");
      I = B[0], g = B[1];
    }
    if (/(^GD_\S{10})|(^GD_query)$/.test(I) && J[I])
      if (J[I].type == "remote") {
        let B = mQ(J[I].value);
        return B ? g ? (RA[A] || (RA[A] = dg(null), wg.push(aI(B.data, (Q) => {
          RA[A].value = HI(Q.data || Q, g);
        }, { immediate: !0 }))), RA[A]) : B.data : null;
      } else
        return g ? HI(J[I].value, g) : J[I].value;
  }
  return null;
}, ug = function(A) {
  let I = {};
  return A && Array.isArray(A) && A.forEach((g) => {
    if (eA(g))
      if (typeof g.value == "string" && g.key) {
        let B = $g(g.value);
        B ? KB(B) ? I[g.key] = g.path ? HI(B.data, g.path) : B.data : I[g.key] = g.path ? HI(B, g.path) : B : I[g.key] = g.value;
      } else
        g.key && (I[g.key] = g.value);
  }), I;
}, kc = function(A, I = "up") {
  const g = V.elements, B = V.getElement(A);
  if (B) {
    if (!B.mid) {
      console.warn("页面上找不到" + A);
      return;
    }
  } else {
    console.warn("元件不存在" + A);
    return;
  }
  let Q = dQ(B.mid).map((C) => ({
    id: C.id,
    zIndex: C.zIndex
  })).sort((C, E) => E.zIndex - C.zIndex);
  if (I == "up") {
    let C = Q.findIndex((E) => E.id == A);
    if (C > 0) {
      let E = Q[C - 1].id, e = g[E].zIndex;
      g[E].zIndex = g[A].zIndex, g[A].zIndex = e;
    }
  } else if (I == "down") {
    let C = Q.findIndex((E) => E.id == A);
    if (C < Q.length - 1 && C > -1) {
      let E = Q[C + 1].id, e = g[E].zIndex;
      g[E].zIndex = g[A].zIndex, g[A].zIndex = e;
    }
  } else if (I == "top") {
    let C = Q.findIndex((E) => E.id == A);
    if (C > 0) {
      g[A].zIndex = Q[0].zIndex;
      for (let E = 0; E < C; E++)
        g[Q[E].id].zIndex--;
    }
  } else if (I == "bottom") {
    let C = Q.findIndex((E) => E.id == A);
    if (C < Q.length - 1 && C > -1) {
      g[A].zIndex = Q[Q.length - 1].zIndex;
      for (let E = C + 1, e = Q.length; E < e; E++)
        g[Q[E].id].zIndex++;
    }
  }
}, XQ = function(A, I, g = null) {
  const B = mg(), Q = vg();
  if (B[A]) {
    let C = _A(B[A]);
    return C.title += "_c", delete C.id, delete C.zIndex, Object.assign(C, I), nI(C, C.mid, g);
  } else if (Q[A]) {
    let C = _A(Q[A]);
    C.title += "_c", delete C.id, delete C.zIndex, Object.assign(C, I);
    let E = [];
    C.components && (E = C.components, delete C.components);
    let e = XI.newGroupData(C, C.mid);
    return E.forEach((t) => {
      XQ(t.id, { gpid: e.id }, e.id);
    }), e;
  }
}, ZQ = function(A, I) {
  const g = mg(), B = vg();
  if (g[A]) {
    let Q = _A(g[A]);
    return Q.title += "_c", I && (delete Q.id, delete Q.gpid, delete Q.mid, delete Q.zIndex, delete Q.lock, delete Q.bind, typeof Q.data == "string" && /(^GD_\S{10})|(^GD_query)|(^RD_\S{10})$/.test(Q.data) && (Q.data = ""), Q.events = []), Q;
  } else if (B[A]) {
    let Q = _A(B[A]);
    return Q.title += "_c", I && (delete Q.id, delete Q.gpid, delete Q.mid, delete Q.zIndex), Array.isArray(Q.components) && (Q.components = Q.components.map((C) => ZQ(C.id, I))), Q;
  }
}, PQ = function(A, I, g) {
  if (A && typeof A == "object") {
    let B = _A(A), Q = I || B.mid;
    if (B.type == "group" && Q) {
      let C = [];
      B.components && (C = B.components, delete B.components);
      let E = XI.newGroupData(B, Q);
      return C.forEach((e) => {
        PQ(e, Q, E.id);
      }), E;
    } else
      return Q ? nI(B, Q, g) : (console.warn("缺少页面数据"), !1);
  } else
    return console.warn("添加失败"), !1;
}, Sc = function(A, I) {
  bg().forEach((g) => {
    if (I) {
      if (typeof I == "string") {
        if (g.id == I)
          return;
      } else if (I instanceof Array && I.find((B) => B == g.id))
        return;
    }
    g.type != "fixed" && (g.id == A ? g.visible = !0 : g.visible = !1);
  });
}, Rc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: PQ,
  addAction: Gc,
  addEvent: hc,
  changeModuleShow: Sc,
  clear: Wg,
  copy: ZQ,
  copyAdd: XQ,
  createActionData: uc,
  editAction: Mc,
  editActionData: dc,
  editEvent: fc,
  extractData: pc,
  getBodyData: ug,
  getDataSource: $g,
  getEvent: HA,
  getSpriteActions: Fc,
  jsonData: _A,
  newEventData: _Q,
  removeAction: Nc,
  removeEvent: yc,
  setZindex: kc
}, Symbol.toStringTag, { value: "Module" }));
function W(A, I, g = "") {
  let B = null;
  if (A ? (B = eC(A), B == A && (console.warn(B + "组件没有找到"), B = "div")) : (console.warn("数据缺少组件" + I), B = "div"), typeof I == "string") {
    const Q = tA(I) || ZI(I);
    if (!Q)
      return;
    let C = { ...Q, key: I };
    if (Q.id && Object.assign(C, RB(Q.events || [], Q, A)), C.name && delete C.name, C.mid && delete C.mid, C.anim && C.anim.name && S.interaction ? C.class = C.anim.name : typeof C.anim == "string" && delete C.anim, C.data) {
      let E = $g(C.data);
      E && (KB(E) ? C.data = E.data || E : C.data = E);
    }
    return q(B, C);
  } else if (typeof I < "u") {
    let Q = { ...I };
    return (I.events || I.type == "group") && Object.assign(Q, RB(I.events || [], I, A)), Q.ref = Q.id, Q.name && delete Q.name, Q.mid && delete Q.mid, q(B, Q, g);
  } else
    return q(B, {}, "");
}
const Jc = {
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
  setup(A) {
    const I = V.getModules(), g = V.getAppData(), B = H({}), Q = tC(A.slots) ? [A.slots] : [];
    return Q.length == 0 && (Array.isArray(A.slots) ? A.slots.forEach((C) => {
      Q.push(q(C));
    }) : A.slots && Q.push(q(A.slots))), aI(I, (C) => {
      Object.assign(B, JSON.parse(JSON.stringify(C)));
    }, { deep: !0 }), iC(() => {
      G.emit(b.STAGE_MOUNTED);
    }), () => {
      var C = [];
      const E = [], e = [], t = [];
      for (const s in B)
        if (B.hasOwnProperty.call(B, s)) {
          const n = B[s];
          (typeof n.visible > "u" || n.visible == !0) && (n.type == "content" ? E.push(n) : n.type == "fixed" ? e.push(n) : n.type == "overlayer" && t.push(n));
        }
      C.push(W("vx-background", A.background), ...Q), E.length > 0 && C.push(W("vx-content", { modules: E })), e.length > 0 && C.push(W("vx-fixed", { modules: e })), t.length > 0 && (C.unshift(W("vx-mask")), C.push(W("vx-overlayer", { modules: t }))), C.push(W("vx-popwin", A.popwin)), C.push(W("vx-message"));
      let o = {
        position: "absolute",
        width: g.size.width ? g.size.width + "px" : "100%",
        height: g.size.height ? g.size.height + "px" : "100%",
        top: 0,
        left: 0,
        transformOrigin: "0 0",
        transform: g.transform.value,
        zIndex: 0,
        userSelect: "none",
        ...$(g.background)
      };
      return q("div", {
        id: "vx-stage",
        style: o,
        onclick(s) {
          G.emit(b.CLICK_STAGE, s);
        }
      }, C);
    };
  }
}, Yc = {
  name: "vx-module",
  props: ["components"],
  setup(A) {
    const { components: I } = Gg(A);
    return (g) => {
      const B = [];
      return I.value && I.value.forEach((Q, C) => {
        Q.visible && (Q.type == "group" ? B.push(W("vx-sprite-group", Q.id)) : B.push(W(Q.name, Q.id)));
      }), q("div", {
        id: g.id,
        style: g.style
      }, B);
    };
  }
}, Uc = {
  name: "vx-plane",
  props: ["components"],
  setup() {
    return (A) => {
      const I = [];
      return A.components && A.components.forEach((g, B) => {
        g.visible && I.push(W(g.name, g.id));
      }), q("div", {
        id: A.id,
        style: A.style
      }, I);
    };
  }
}, Lc = {
  name: "vx-popwin",
  render() {
    return q("div", {
      id: "vx-popwin",
      style: {
        position: "absolute",
        width: "100%",
        zIndex: 5e4
      }
    });
  }
};
let Hc = {
  position: "absolute",
  width: "auto",
  height: "auto",
  top: 0,
  left: 0,
  zIndex: 1e4
};
const bc = {
  name: "vx-content",
  props: ["modules"],
  setup(A) {
    return () => {
      const I = A.modules, g = [];
      for (const B in I)
        if (I.hasOwnProperty.call(I, B)) {
          const Q = I[B];
          (typeof Q.visible > "u" || Q.visible == !0) && g.push(W("vx-module", Q));
        }
      return q("div", {
        id: "vx-content",
        style: Hc
      }, g);
    };
  }
};
let mc = {
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 2e4
};
const xc = {
  name: "vx-fixed",
  props: ["modules"],
  setup(A) {
    return () => {
      const I = A.modules, g = [];
      for (const B in I)
        if (I.hasOwnProperty.call(I, B)) {
          const Q = I[B];
          (typeof Q.visible > "u" || Q.visible == !0) && g.push(W("vx-module", Q));
        }
      return q("div", {
        id: "vx-fixed",
        style: mc
      }, g);
    };
  }
};
let vc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 4e4
};
const qc = {
  name: "vx-overlayer",
  props: ["modules"],
  setup(A) {
    return () => {
      const I = A.modules, g = [];
      for (const B in I)
        if (I.hasOwnProperty.call(I, B)) {
          const Q = I[B];
          (typeof Q.visible > "u" || Q.visible == !0) && g.push(W("vx-module", Q));
        }
      return q("div", {
        id: "vx-overlayer",
        style: vc
      }, g);
    };
  }
};
let vB = {
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 99999999
}, Kc = {
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
const Oc = {
  name: "vx-message",
  setup() {
    const A = H([]);
    G.addEventListener("message-send", (g) => {
      A.length == 0 && I(), A.push(g);
    });
    const I = function() {
      setTimeout(() => {
        A.length > 0 && (A.splice(0, 1), A.length > 0 && I());
      }, 3e3);
    };
    return () => A.length > 0 ? q("div", {
      id: "vx-message",
      style: vB
    }, A.map((g) => q("div", { class: "message_item", style: Kc }, g))) : q("div", {
      id: "vx-message",
      style: vB
    });
  }
}, zc = {
  name: "vx-mask",
  render() {
    return q("div", {
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
      onClick: (I) => {
      }
    });
  }
};
let Tc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0)",
  zIndex: 1
};
const jc = {
  name: "vx-background",
  setup(A) {
    return () => {
      let I = Object.assign({}, Tc, A.style);
      return q("div", {
        id: "vx-background",
        style: I,
        onmousedown: (g) => {
          G.emit(b.MOUSEDOWN_BACKGROUND, g);
        },
        onmouseup: (g) => {
          G.emit(b.MOUSEUP_BACKGROUND, g);
        },
        onclick: (g) => {
          G.emit(b.CLICK_BACKGROUND, g);
        }
      });
    };
  }
}, _c = {
  name: "vx-sprite-group",
  props: {
    components: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(A) {
    const { x: I, y: g, id: B } = Gg(A);
    return IB("offsetX", I), IB("offsetY", g), (Q) => {
      const C = [];
      Q.components && Q.components.forEach((e, t) => {
        e.visible && C.push(W(e.name, e.id));
      });
      let E = ["element_sprite", { element_selected: Q.selected }, { element_hover: Q.hover }];
      return q("div", { id: B.value, style: Q.style, class: E }, C);
    };
  }
}, Xc = {
  name: "vx-sprite",
  setup(A, I) {
    const { id: g } = Gg(A);
    return (B) => {
      let Q = "";
      typeof I.slots.default == "function" && (Q = I.slots.default());
      let C = ["element_sprite", { element_selected: B.$parent.selected }, { element_hover: B.$parent.hover }];
      return B.$parent.gpid && (C = ["element_sprite"]), q("div", { id: g.value || B.$parent.id, style: B.$parent.style, class: C }, Q);
    };
  }
}, Zc = [Yc, Uc, Lc, qc, bc, xc, Oc, zc, jc, _c, Xc], Pc = {
  install: (A) => {
    Zc.forEach((I) => {
      A.component(I.name, I);
    });
  }
};
window && typeof window.Vue > "u" && (window.Vue = CC);
var IA = null;
const VQ = function(A = {}) {
  return IA ? !1 : (IA = nC(Jc, A), IA.use(Pc), IA.mixin(KI), S.status = "create", window && (window.myapp = IA), console.log("%c灿create", "color:#0aa100"), !0);
}, Vc = function() {
  if (IA) {
    let A = S.dom;
    return typeof A == "string" && document.querySelector(A) || A instanceof HTMLElement ? (IA.mount(A), S.status = "display", console.log("%c灿display", "color:#0aa100"), !0) : (console.error(A + "错误"), !1);
  } else
    return console.warn("app没有创建"), !1;
}, WQ = function() {
  IA && (IA.unmount(), IA = null, S.status = "remove", console.log("%c灿remove", "color:#0aa100"));
}, pI = function(A) {
  return A && Object.assign(S, A), S;
}, Wc = function() {
  return IA;
}, sI = {
  appSetup: S,
  get vm() {
    return IA;
  }
}, KA = {
  // 更新元件原始数据
  reviewData(A, I) {
    if (I && I.id) {
      console.warn(I.id + "不能替换");
      return;
    }
    Object.assign(A, I);
  },
  // 显示元件
  show(A, I) {
    A && (Array.isArray(A) ? A.forEach((g) => {
      g.visible = I;
    }) : A.visible = I);
  },
  // 切换显示
  toggle(A) {
    A && (Array.isArray(A) ? A.forEach((I) => {
      I.visible = !I.visible;
    }) : A.visible = !A.visible);
  },
  // 更新元件传递数据
  sendData(A, I) {
    A && (Array.isArray(A) ? A.forEach((g) => {
      g.data = I;
    }) : A.data = I);
  },
  // 链接跳转
  href(A, I = "_blank") {
    A && (I == "a" ? window.location.href = A : window.open(A, I));
  },
  // 模块切换显示
  singleModule(A, I) {
    A.filter((g) => g.type == "content").forEach((g) => {
      g.id == I ? g.visible = !0 : g.visible = !1;
    });
  },
  // 开关弹窗页面
  popup(A, I) {
    return A && A.type == "overlayer" && (typeof I == "boolean" ? A.visible = I : A.visible = !A.visible), A;
  }
}, MI = {}, EI = DI.actions, qB = function(A, I, g) {
  if (KA[A]) {
    let B = EI.find((Q) => Q.action == A);
    if (B) {
      let Q = {};
      B.target == "component" || B.target == "components" ? I instanceof Array ? (Q = [], I.forEach((C) => {
        Q.push(V.getElement(C));
      })) : I && (Q = V.getElement(I)) : B.target == "app" ? Q = V.getAppData() : B.target == "url" ? Q = I : B.target == "modules" ? Q = V.getModuleList() : B.target == "module" && (Q = V.getModule(I)), KA[A].call(B, Q, g);
    } else {
      let Q = V.getElement(I) || V.getModule(I);
      Q && (targetData = Q), KA[A].call({}, targetData, g);
    }
  } else
    console.warn(item.action + "动作不存在");
}, qI = {
  // 元件动作
  [OA.ACTION](A) {
    A.data && (A.data instanceof Array ? A.data.forEach((I) => {
      qB(I.action, I.target, I.value);
    }) : A.data instanceof Object && typeof A.data != "function" && qB(A.data.action, A.data.target, A.data.value));
  },
  // 应用动作
  [OA.APP_ACTION](A) {
  },
  // 添加一个动作
  useAction(A) {
    let I = {
      name: A.name || "无名动作",
      action: A.action || null,
      target: A.target || "component",
      valueType: A.valueType || null,
      value: A.value || ""
    };
    EI.find((g) => g.action == I.action) ? console.warn(A, "已存在") : I.action && A.handle ? KA[I.action] ? console.warn(I.action + "动作已存在") : (EI.push(I), KA[I.action] = A.handle, MI[I.action] = I) : I.action ? console.warn(A, "缺少动作方法函数") : console.warn(A, "缺少action名称");
  },
  remove(A) {
    if (MI[A]) {
      let I = EI.findIndex((g) => g.action == A);
      I > -1 && EI.splice(I, 1), delete KA[A], delete MI[A];
    }
  },
  removeAll() {
    Object.keys(MI).forEach((I) => {
      this.remove(I);
    });
  }
};
for (const A in OA) {
  let I = OA[A];
  G.addEventListener(I, qI[I], qI);
}
const $c = function(A, I) {
  return S.status == "none" || S.status == "remove" || S.status == "destroy" ? (pI(A), V.resetAppData(), VQ(I) ? (NA.install(), eA(A) && $Q(A), !0) : (console.warn("应用已存在，不可重复创建"), !1)) : (console.warn("应用创建失败"), !1);
}, $Q = function(A) {
  let I = pI({});
  Wc() || VQ() && NA.reload(), I.status != "display" ? (typeof A == "string" ? I = pI({ dom: A }) : eA(A) && (I = pI(A)), Vc()) : console.warn("舞台已显示");
}, AD = function() {
  WQ();
}, ID = function(A = !0) {
  A && (V.clearDataAll(), qI.removeAll()), NA.removeAll(), G.clear(), Wg(), WQ(), S.status = "destroy", console.log("%c灿destroy", "color:#0aa100");
};
const gD = oE, AC = V, IC = NA, BD = KI, QD = qI, CD = G, ED = DI, gC = b, eD = Rc, tD = gr, iD = sI, nD = S, BC = $c, oD = $Q, hD = AD, sD = ID, QC = yg, aD = jQ, rD = function(A) {
  let I = A.components || [], g = A.actions || [], B = A.data || null, Q = A.slots || null, C = {
    width: A.width,
    height: A.height,
    backgroundColor: A.backgroundColor,
    scaleMode: A.scaleMode,
    dom: A.dom,
    interaction: A.interaction,
    clickCursor: A.clickCursor,
    scale: A.scale
  };
  Object.keys(C).forEach((t) => {
    typeof C[t] > "u" && delete C[t];
  }), IC.add(I), QC(g);
  let e = BC(C, { slots: Q });
  return AC.init(B), e;
};
dC.addEventListener("statechange", function(A) {
  G.emit(gC.PAGE_STATE, { state: A.newState, oldState: A.oldState });
});
const cD = cc({
  utils: gD,
  rdata: AC,
  component: IC,
  componentMixin: BD,
  controller: QD,
  cmd: CD,
  typeModel: ED,
  EVENTS: gC,
  helper: eD,
  remote: tD,
  app: iD,
  appInfo: nD,
  use: QC,
  useAsync: aD,
  createApp: rD,
  displayStage: oD,
  createStage: BC,
  destroyStage: sD
});
console.log("%crd-runtime:1.8.9", "color:#0aa100");
"RD" in window || (window.RD = cD);
export {
  gC as EVENTS,
  iD as app,
  nD as appInfo,
  CD as cmd,
  IC as component,
  BD as componentMixin,
  QD as controller,
  rD as createApp,
  BC as createStage,
  sD as destroyStage,
  oD as displayStage,
  eD as helper,
  AC as rdata,
  tD as remote,
  hD as removeStage,
  ED as typeModel,
  QC as use,
  aD as useAsync,
  gD as utils
};
//# sourceMappingURL=rd-runtime.mjs.map
