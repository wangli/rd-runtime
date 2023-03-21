import * as ge from "vue";
import { reactive as m, watch as oI, computed as Be, ref as fg, isReactive as bB, resolveComponent as Qe, h as q, isVNode as ee, onMounted as Ce, toRefs as hg, provide as Xg, createApp as Ee } from "vue";
function te(A, I) {
  for (var g = 0; g < I.length; g++) {
    const B = I[g];
    if (typeof B != "string" && !Array.isArray(B)) {
      for (const Q in B)
        if (Q !== "default" && !(Q in A)) {
          const e = Object.getOwnPropertyDescriptor(B, Q);
          e && Object.defineProperty(A, Q, e.get ? e : {
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
let GI;
try {
  new EventTarget(), GI = !0;
} catch {
  GI = !1;
}
class ie {
  constructor() {
    this.e = {};
  }
  addEventListener(I, g, B = !1) {
    this.t(I).push(g);
  }
  removeEventListener(I, g, B = !1) {
    const Q = this.t(I), e = Q.indexOf(g);
    e > -1 && Q.splice(e, 1);
  }
  dispatchEvent(I) {
    return I.target = this, Object.freeze(I), this.t(I.type).forEach((g) => g(I)), !0;
  }
  t(I) {
    return this.e[I] = this.e[I] || [];
  }
}
var ne = GI ? EventTarget : ie;
let oe = class {
  constructor(I) {
    this.type = I;
  }
};
var se = GI ? Event : oe;
class re extends se {
  constructor(I, g) {
    super(I), this.newState = g.newState, this.oldState = g.oldState, this.originalEvent = g.originalEvent;
  }
}
const pA = "active", gI = "passive", SA = "hidden", kA = "frozen", Bg = "terminated", Zg = typeof safari == "object" && safari.pushNotification, ae = "onpageshow" in self, ce = ["focus", "blur", "visibilitychange", "freeze", "resume", "pageshow", ae ? "pagehide" : "unload"], Pg = (A) => (A.preventDefault(), A.returnValue = "Are you sure?"), le = (A) => A.reduce((I, g, B) => (I[g] = B, I), {}), De = [[pA, gI, SA, Bg], [pA, gI, SA, kA], [SA, gI, pA], [kA, SA], [kA, pA], [kA, gI]].map(le), fe = (A, I) => {
  for (let g, B = 0; g = De[B]; ++B) {
    const Q = g[A], e = g[I];
    if (Q >= 0 && e >= 0 && e > Q)
      return Object.keys(g).slice(Q, e + 1);
  }
  return [];
}, fI = () => document.visibilityState === SA ? SA : document.hasFocus() ? pA : gI;
class he extends ne {
  constructor() {
    super();
    const I = fI();
    this.s = I, this.i = [], this.a = this.a.bind(this), ce.forEach((g) => addEventListener(g, this.a, !0)), Zg && addEventListener("beforeunload", (g) => {
      this.n = setTimeout(() => {
        g.defaultPrevented || g.returnValue.length > 0 || this.r(g, SA);
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
    !this.i.indexOf(I) > -1 && (this.i.length === 0 && addEventListener("beforeunload", Pg), this.i.push(I));
  }
  removeUnsavedChanges(I) {
    const g = this.i.indexOf(I);
    g > -1 && (this.i.splice(g, 1), this.i.length === 0 && removeEventListener("beforeunload", Pg));
  }
  r(I, g) {
    if (g !== this.s) {
      const B = this.s, Q = fe(B, g);
      for (let e = 0; e < Q.length - 1; ++e) {
        const C = Q[e], E = Q[e + 1];
        this.s = E, this.dispatchEvent(new re("statechange", { oldState: C, newState: E, originalEvent: I }));
      }
    }
  }
  a(I) {
    switch (Zg && clearTimeout(this.n), I.type) {
      case "pageshow":
      case "resume":
        this.r(I, fI());
        break;
      case "focus":
        this.r(I, pA);
        break;
      case "blur":
        this.s === pA && this.r(I, fI());
        break;
      case "pagehide":
      case "unload":
        this.r(I, I.persisted ? kA : Bg);
        break;
      case "visibilitychange":
        this.s !== kA && this.s !== Bg && this.r(I, fI());
        break;
      case "freeze":
        this.r(I, kA);
    }
  }
}
var ue = new he(), BI = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, EI = {}, ye = {
  get exports() {
    return EI;
  },
  set exports(A) {
    EI = A;
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
  function e(t, o, s, n, l) {
    if (typeof s != "function")
      throw new TypeError("The listener must be a function");
    var d = new Q(s, n || t, l), w = g ? g + o : o;
    return t._events[w] ? t._events[w].fn ? t._events[w] = [t._events[w], d] : t._events[w].push(d) : (t._events[w] = d, t._eventsCount++), t;
  }
  function C(t, o) {
    --t._eventsCount === 0 ? t._events = new B() : delete t._events[o];
  }
  function E() {
    this._events = new B(), this._eventsCount = 0;
  }
  E.prototype.eventNames = function() {
    var o = [], s, n;
    if (this._eventsCount === 0)
      return o;
    for (n in s = this._events)
      I.call(s, n) && o.push(g ? n.slice(1) : n);
    return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(s)) : o;
  }, E.prototype.listeners = function(o) {
    var s = g ? g + o : o, n = this._events[s];
    if (!n)
      return [];
    if (n.fn)
      return [n.fn];
    for (var l = 0, d = n.length, w = new Array(d); l < d; l++)
      w[l] = n[l].fn;
    return w;
  }, E.prototype.listenerCount = function(o) {
    var s = g ? g + o : o, n = this._events[s];
    return n ? n.fn ? 1 : n.length : 0;
  }, E.prototype.emit = function(o, s, n, l, d, w) {
    var X = g ? g + o : o;
    if (!this._events[X])
      return !1;
    var y = this._events[X], iA = arguments.length, cA, H;
    if (y.fn) {
      switch (y.once && this.removeListener(o, y.fn, void 0, !0), iA) {
        case 1:
          return y.fn.call(y.context), !0;
        case 2:
          return y.fn.call(y.context, s), !0;
        case 3:
          return y.fn.call(y.context, s, n), !0;
        case 4:
          return y.fn.call(y.context, s, n, l), !0;
        case 5:
          return y.fn.call(y.context, s, n, l, d), !0;
        case 6:
          return y.fn.call(y.context, s, n, l, d, w), !0;
      }
      for (H = 1, cA = new Array(iA - 1); H < iA; H++)
        cA[H - 1] = arguments[H];
      y.fn.apply(y.context, cA);
    } else {
      var TI = y.length, gA;
      for (H = 0; H < TI; H++)
        switch (y[H].once && this.removeListener(o, y[H].fn, void 0, !0), iA) {
          case 1:
            y[H].fn.call(y[H].context);
            break;
          case 2:
            y[H].fn.call(y[H].context, s);
            break;
          case 3:
            y[H].fn.call(y[H].context, s, n);
            break;
          case 4:
            y[H].fn.call(y[H].context, s, n, l);
            break;
          default:
            if (!cA)
              for (gA = 1, cA = new Array(iA - 1); gA < iA; gA++)
                cA[gA - 1] = arguments[gA];
            y[H].fn.apply(y[H].context, cA);
        }
    }
    return !0;
  }, E.prototype.on = function(o, s, n) {
    return e(this, o, s, n, !1);
  }, E.prototype.once = function(o, s, n) {
    return e(this, o, s, n, !0);
  }, E.prototype.removeListener = function(o, s, n, l) {
    var d = g ? g + o : o;
    if (!this._events[d])
      return this;
    if (!s)
      return C(this, d), this;
    var w = this._events[d];
    if (w.fn)
      w.fn === s && (!l || w.once) && (!n || w.context === n) && C(this, d);
    else {
      for (var X = 0, y = [], iA = w.length; X < iA; X++)
        (w[X].fn !== s || l && !w[X].once || n && w[X].context !== n) && y.push(w[X]);
      y.length ? this._events[d] = y.length === 1 ? y[0] : y : C(this, d);
    }
    return this;
  }, E.prototype.removeAllListeners = function(o) {
    var s;
    return o ? (s = g ? g + o : o, this._events[s] && C(this, s)) : (this._events = new B(), this._eventsCount = 0), this;
  }, E.prototype.off = E.prototype.removeListener, E.prototype.addListener = E.prototype.on, E.prefixed = g, E.EventEmitter = E, A.exports = E;
})(ye);
const AI = {}, we = 10;
function de(A) {
  var I = !0, g = new Date().getTime();
  return AI[A] ? (g - AI[A].time < we && (I = !1), AI[A].count++, AI[A].time = g) : AI[A] = {
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
}, zA = {
  // 执行动作
  ACTION: "action",
  // 设置应用
  APP_ACTION: "appAction"
};
var pI = {}, Me = {
  get exports() {
    return pI;
  },
  set exports(A) {
    pI = A;
  }
};
(function(A, I) {
  (function(g, B) {
    A.exports = B();
  })(BI, function() {
    var g = 1e3, B = 6e4, Q = 36e5, e = "millisecond", C = "second", E = "minute", t = "hour", o = "day", s = "week", n = "month", l = "quarter", d = "year", w = "date", X = "Invalid Date", y = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, iA = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, cA = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(D) {
      var c = ["th", "st", "nd", "rd"], r = D % 100;
      return "[" + D + (c[(r - 20) % 10] || c[r] || c[0]) + "]";
    } }, H = function(D, c, r) {
      var f = String(D);
      return !f || f.length >= c ? D : "" + Array(c + 1 - f.length).join(r) + D;
    }, TI = { s: H, z: function(D) {
      var c = -D.utcOffset(), r = Math.abs(c), f = Math.floor(r / 60), a = r % 60;
      return (c <= 0 ? "+" : "-") + H(f, 2, "0") + ":" + H(a, 2, "0");
    }, m: function D(c, r) {
      if (c.date() < r.date())
        return -D(r, c);
      var f = 12 * (r.year() - c.year()) + (r.month() - c.month()), a = c.clone().add(f, n), u = r - a < 0, h = c.clone().add(f + (u ? -1 : 1), n);
      return +(-(f + (r - a) / (u ? a - h : h - a)) || 0);
    }, a: function(D) {
      return D < 0 ? Math.ceil(D) || 0 : Math.floor(D);
    }, p: function(D) {
      return { M: n, y: d, w: s, d: o, D: w, h: t, m: E, s: C, ms: e, Q: l }[D] || String(D || "").toLowerCase().replace(/s$/, "");
    }, u: function(D) {
      return D === void 0;
    } }, gA = "en", GA = {};
    GA[gA] = cA;
    var XI = function(D) {
      return D instanceof lI;
    }, cI = function D(c, r, f) {
      var a;
      if (!c)
        return gA;
      if (typeof c == "string") {
        var u = c.toLowerCase();
        GA[u] && (a = u), r && (GA[u] = r, a = u);
        var h = c.split("-");
        if (!a && h.length > 1)
          return D(h[0]);
      } else {
        var S = c.name;
        GA[S] = c, a = S;
      }
      return !f && a && (gA = a), a || !f && gA;
    }, K = function(D, c) {
      if (XI(D))
        return D.clone();
      var r = typeof c == "object" ? c : {};
      return r.date = D, r.args = arguments, new lI(r);
    }, R = TI;
    R.l = cI, R.i = XI, R.w = function(D, c) {
      return K(D, { locale: c.$L, utc: c.$u, x: c.$x, $offset: c.$offset });
    };
    var lI = function() {
      function D(r) {
        this.$L = cI(r.locale, null, !0), this.parse(r);
      }
      var c = D.prototype;
      return c.parse = function(r) {
        this.$d = function(f) {
          var a = f.date, u = f.utc;
          if (a === null)
            return new Date(NaN);
          if (R.u(a))
            return new Date();
          if (a instanceof Date)
            return new Date(a);
          if (typeof a == "string" && !/Z$/i.test(a)) {
            var h = a.match(y);
            if (h) {
              var S = h[2] - 1 || 0, x = (h[7] || "0").substring(0, 3);
              return u ? new Date(Date.UTC(h[1], S, h[3] || 1, h[4] || 0, h[5] || 0, h[6] || 0, x)) : new Date(h[1], S, h[3] || 1, h[4] || 0, h[5] || 0, h[6] || 0, x);
            }
          }
          return new Date(a);
        }(r), this.$x = r.x || {}, this.init();
      }, c.init = function() {
        var r = this.$d;
        this.$y = r.getFullYear(), this.$M = r.getMonth(), this.$D = r.getDate(), this.$W = r.getDay(), this.$H = r.getHours(), this.$m = r.getMinutes(), this.$s = r.getSeconds(), this.$ms = r.getMilliseconds();
      }, c.$utils = function() {
        return R;
      }, c.isValid = function() {
        return this.$d.toString() !== X;
      }, c.isSame = function(r, f) {
        var a = K(r);
        return this.startOf(f) <= a && a <= this.endOf(f);
      }, c.isAfter = function(r, f) {
        return K(r) < this.startOf(f);
      }, c.isBefore = function(r, f) {
        return this.endOf(f) < K(r);
      }, c.$g = function(r, f, a) {
        return R.u(r) ? this[f] : this.set(a, r);
      }, c.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, c.valueOf = function() {
        return this.$d.getTime();
      }, c.startOf = function(r, f) {
        var a = this, u = !!R.u(f) || f, h = R.p(r), S = function(bA, Z) {
          var uA = R.w(a.$u ? Date.UTC(a.$y, Z, bA) : new Date(a.$y, Z, bA), a);
          return u ? uA : uA.endOf(o);
        }, x = function(bA, Z) {
          return R.w(a.toDate()[bA].apply(a.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Z)), a);
        }, L = this.$W, _ = this.$M, hA = this.$D, lA = "set" + (this.$u ? "UTC" : "");
        switch (h) {
          case d:
            return u ? S(1, 0) : S(31, 11);
          case n:
            return u ? S(1, _) : S(0, _ + 1);
          case s:
            var WA = this.$locale().weekStart || 0, $A = (L < WA ? L + 7 : L) - WA;
            return S(u ? hA - $A : hA + (6 - $A), _);
          case o:
          case w:
            return x(lA + "Hours", 0);
          case t:
            return x(lA + "Minutes", 1);
          case E:
            return x(lA + "Seconds", 2);
          case C:
            return x(lA + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, c.endOf = function(r) {
        return this.startOf(r, !1);
      }, c.$set = function(r, f) {
        var a, u = R.p(r), h = "set" + (this.$u ? "UTC" : ""), S = (a = {}, a[o] = h + "Date", a[w] = h + "Date", a[n] = h + "Month", a[d] = h + "FullYear", a[t] = h + "Hours", a[E] = h + "Minutes", a[C] = h + "Seconds", a[e] = h + "Milliseconds", a)[u], x = u === o ? this.$D + (f - this.$W) : f;
        if (u === n || u === d) {
          var L = this.clone().set(w, 1);
          L.$d[S](x), L.init(), this.$d = L.set(w, Math.min(this.$D, L.daysInMonth())).$d;
        } else
          S && this.$d[S](x);
        return this.init(), this;
      }, c.set = function(r, f) {
        return this.clone().$set(r, f);
      }, c.get = function(r) {
        return this[R.p(r)]();
      }, c.add = function(r, f) {
        var a, u = this;
        r = Number(r);
        var h = R.p(f), S = function(_) {
          var hA = K(u);
          return R.w(hA.date(hA.date() + Math.round(_ * r)), u);
        };
        if (h === n)
          return this.set(n, this.$M + r);
        if (h === d)
          return this.set(d, this.$y + r);
        if (h === o)
          return S(1);
        if (h === s)
          return S(7);
        var x = (a = {}, a[E] = B, a[t] = Q, a[C] = g, a)[h] || 1, L = this.$d.getTime() + r * x;
        return R.w(L, this);
      }, c.subtract = function(r, f) {
        return this.add(-1 * r, f);
      }, c.format = function(r) {
        var f = this, a = this.$locale();
        if (!this.isValid())
          return a.invalidDate || X;
        var u = r || "YYYY-MM-DDTHH:mm:ssZ", h = R.z(this), S = this.$H, x = this.$m, L = this.$M, _ = a.weekdays, hA = a.months, lA = function(Z, uA, ZI, DI) {
          return Z && (Z[uA] || Z(f, u)) || ZI[uA].slice(0, DI);
        }, WA = function(Z) {
          return R.s(S % 12 || 12, Z, "0");
        }, $A = a.meridiem || function(Z, uA, ZI) {
          var DI = Z < 12 ? "AM" : "PM";
          return ZI ? DI.toLowerCase() : DI;
        }, bA = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: L + 1, MM: R.s(L + 1, 2, "0"), MMM: lA(a.monthsShort, L, hA, 3), MMMM: lA(hA, L), D: this.$D, DD: R.s(this.$D, 2, "0"), d: String(this.$W), dd: lA(a.weekdaysMin, this.$W, _, 2), ddd: lA(a.weekdaysShort, this.$W, _, 3), dddd: _[this.$W], H: String(S), HH: R.s(S, 2, "0"), h: WA(1), hh: WA(2), a: $A(S, x, !0), A: $A(S, x, !1), m: String(x), mm: R.s(x, 2, "0"), s: String(this.$s), ss: R.s(this.$s, 2, "0"), SSS: R.s(this.$ms, 3, "0"), Z: h };
        return u.replace(iA, function(Z, uA) {
          return uA || bA[Z] || h.replace(":", "");
        });
      }, c.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, c.diff = function(r, f, a) {
        var u, h = R.p(f), S = K(r), x = (S.utcOffset() - this.utcOffset()) * B, L = this - S, _ = R.m(this, S);
        return _ = (u = {}, u[d] = _ / 12, u[n] = _, u[l] = _ / 3, u[s] = (L - x) / 6048e5, u[o] = (L - x) / 864e5, u[t] = L / Q, u[E] = L / B, u[C] = L / g, u)[h] || L, a ? _ : R.a(_);
      }, c.daysInMonth = function() {
        return this.endOf(n).$D;
      }, c.$locale = function() {
        return GA[this.$L];
      }, c.locale = function(r, f) {
        if (!r)
          return this.$L;
        var a = this.clone(), u = cI(r, f, !0);
        return u && (a.$L = u), a;
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
      }, D;
    }(), Tg = lI.prototype;
    return K.prototype = Tg, [["$ms", e], ["$s", C], ["$m", E], ["$H", t], ["$W", o], ["$M", n], ["$y", d], ["$D", w]].forEach(function(D) {
      Tg[D[1]] = function(c) {
        return this.$g(c, D[0], D[1]);
      };
    }), K.extend = function(D, c) {
      return D.$i || (D(c, lI, K), D.$i = !0), K;
    }, K.locale = cI, K.isDayjs = XI, K.unix = function(D) {
      return K(1e3 * D);
    }, K.en = GA[gA], K.Ls = GA, K.p = {}, K;
  });
})(Me);
const Ne = pI, LB = /* @__PURE__ */ te({
  __proto__: null,
  default: Ne
}, [pI]);
var Fe = typeof BI == "object" && BI && BI.Object === Object && BI, xB = Fe, Ge = xB, pe = typeof self == "object" && self && self.Object === Object && self, Se = Ge || pe || Function("return this")(), JA = Se, ke = JA, Re = ke.Symbol, ug = Re, Vg = ug, vB = Object.prototype, Ye = vB.hasOwnProperty, Je = vB.toString, II = Vg ? Vg.toStringTag : void 0;
function Ue(A) {
  var I = Ye.call(A, II), g = A[II];
  try {
    A[II] = void 0;
    var B = !0;
  } catch {
  }
  var Q = Je.call(A);
  return B && (I ? A[II] = g : delete A[II]), Q;
}
var He = Ue, me = Object.prototype, be = me.toString;
function Le(A) {
  return be.call(A);
}
var xe = Le, Wg = ug, ve = He, qe = xe, Ke = "[object Null]", ze = "[object Undefined]", $g = Wg ? Wg.toStringTag : void 0;
function _e(A) {
  return A == null ? A === void 0 ? ze : Ke : $g && $g in Object(A) ? ve(A) : qe(A);
}
var sI = _e;
function Oe(A, I) {
  return function(g) {
    return A(I(g));
  };
}
var je = Oe, Te = je, Xe = Te(Object.getPrototypeOf, Object), qB = Xe;
function Ze(A) {
  return A != null && typeof A == "object";
}
var TA = Ze, Pe = sI, Ve = qB, We = TA, $e = "[object Object]", AC = Function.prototype, IC = Object.prototype, KB = AC.toString, gC = IC.hasOwnProperty, BC = KB.call(Object);
function QC(A) {
  if (!We(A) || Pe(A) != $e)
    return !1;
  var I = Ve(A);
  if (I === null)
    return !0;
  var g = gC.call(I, "constructor") && I.constructor;
  return typeof g == "function" && g instanceof g && KB.call(g) == BC;
}
var EA = QC;
const AB = {
  dayjs(A, I) {
    return LB(A).format(I);
  }
}, xA = function(A, I, g, B) {
  let Q = A;
  if (I) {
    let e = I.split(".");
    for (let C of e)
      if (typeof Q[C] < "u")
        Q = Q[C];
      else {
        Q = null;
        break;
      }
  } else
    return typeof B == "object" && B.func ? AB[B.func].call(null, Q, B.rule) : Q;
  return g && Q instanceof Array ? Q.map((e) => xA(e, g, null, B)) : typeof B == "object" && B.func ? AB[B.func].call(null, Q, B.rule) : Q;
}, yg = function(A, I) {
  if (I && EA(I) && I.y && I.y instanceof Array && I.y.length > 0) {
    let g = [];
    if (I.x && I.x.name && I.x.path) {
      g.push([I.x.name]);
      let B = xA(A, I.x.path, I.x.mapKey, I.x.format);
      B && B.forEach((Q, e) => {
        g[e + 1] = [Q];
      }), I.y.forEach((Q) => {
        g[0].push(Q.name);
        let e = xA(A, Q.path, Q.mapKey, Q.format);
        e && e instanceof Array && e.forEach((C, E) => {
          g[E + 1] ? g[E + 1].push(C) : g[E + 1] = [C];
        });
      });
    } else
      I.y.forEach((B, Q) => {
        let e = xA(A, B.path, B.mapKey, B.format);
        e && e instanceof Array && (Q == 0 ? g.push([B.name]) : g[0].push(B.name), e.forEach((C, E) => {
          g[E + 1] ? g[E + 1].push(C) : g[E + 1] = [C];
        }));
      });
    return g;
  } else {
    if (I && EA(I) && I.name && I.path)
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
}, W = function(A) {
  if (typeof A == "string")
    try {
      return JSON.parse(A);
    } catch {
      return A;
    }
  else
    return A ? JSON.parse(JSON.stringify(A)) : {};
}, eC = function() {
  const A = function() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  };
  return A() + A() + A() + A() + A() + A() + A() + A();
};
let nA = {};
const CC = {
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
const EC = {
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
}, Qg = function(A) {
  return A ? Object.keys(A).map(function(I) {
    return encodeURIComponent(I) + "=" + encodeURIComponent(A[I]);
  }).join("&") : "";
}, rA = function(A, I, g) {
  if (A && A instanceof Array) {
    let B = I ? A.findIndex((Q) => Q[I] == g) : A.findIndex((Q) => Q == g);
    return B > -1 ? A.splice(B, 1) : !1;
  } else
    return !1;
}, zB = function(A, I = !0) {
  let g = location.href.slice(location.href.lastIndexOf("?")), B = {}, Q = /([^?=&#]+)=([^?=&#]+)/g;
  return g.replace(Q, (e, C, E) => B[C] = I ? decodeURIComponent(E) : E), A ? B[A] || "" : B;
}, tC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dayjs: LB,
  extractData: yg,
  getUrlParam: zB,
  guid: eC,
  interval: CC,
  jsonData: W,
  jsonToParams: Qg,
  removeArray: rA,
  timeout: EC
}, Symbol.toStringTag, { value: "Module" })), yA = new EI(), M = {
  /**
   * 添加需要托管的eventObj对象事件
   * @param {string} eventName 事件名称
   * @param {function} fun 事件方法
   * @param {object} eventObj  委托对象
   */
  addEventListener(A, I, g = null) {
    yA.on(A, I, g);
  },
  /**
   * 删除托管的eventObj对象事件
   * @param {string} eventName 事件名称
   * @param {function} fun 委托对象
   * @param {object} eventObj  委托对象
   */
  removeEventListener(A, I, g) {
    g && I ? yA.off(A, I, g) : I ? yA.off(A, I) : yA.off(A);
  },
  /**
   * 清除所有
   */
  clear(A) {
    yA.removeAllListeners(A);
  },
  /**
   * 发送命令
   * @param {string} eventName 事件名称
   * @param {object} args 参数 
   * @param {boolean} force 强制发送
   */
  emit(A, I, g = !1) {
    if (typeof g == "boolean" && g)
      yA.emit(A, I);
    else if (de(A)) {
      let B = arguments.length;
      if (B <= 3)
        yA.emit(A, I, g);
      else {
        let Q = [];
        for (i = 1; i < B; i++)
          Q[0] = arguments[i];
        yA.emit(A, ...Q);
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
      data: W(A)
    };
    this.emit(zA.ACTION, g);
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
    this.emit(zA.ACTION, {
      data: {
        action: "reviewData",
        target: A,
        value: I
      }
    });
  }
}, k = {
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
let $ = (A = 21) => {
  let I = "", g = crypto.getRandomValues(new Uint8Array(A));
  for (; A--; ) {
    let B = g[A] & 63;
    B < 36 ? I += B.toString(36) : B < 62 ? I += (B - 26).toString(36).toUpperCase() : B < 63 ? I += "_" : I += "-";
  }
  return I;
};
function hI(A, I, g, B) {
  A && A.getAttribute && A.getAttribute(I) && A.dispatchEvent(new CustomEvent(I, {
    detail: {
      component: g,
      value: B
    }
  }));
}
const PI = {}, IB = {
  add(A) {
    A.id && (PI[A.id] = A);
  },
  del(A) {
    A.id && delete PI[A.id];
  },
  get items() {
    return PI;
  }
}, vI = {
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
    this.AppSetup = k, IB.add(this), this.id && M.addEventListener(`run_function_${this.id}`, (A) => {
      this.cmdRunning && this.cmdRunning(A);
    });
  },
  mounted() {
    hI(this.$el, "timeout", this, "mounted"), hI(this.$el, "interval", this, "mounted");
  },
  beforeUnmount() {
    IB.del(this), this.id && M.removeEventListener(`run_function_${this.id}`), hI(this.$el, "timeout", this, "beforeUnmount"), hI(this.$el, "interval", this, "beforeUnmount");
  }
};
function iC() {
  this.__data__ = [], this.size = 0;
}
var nC = iC;
function oC(A, I) {
  return A === I || A !== A && I !== I;
}
var qI = oC, sC = qI;
function rC(A, I) {
  for (var g = A.length; g--; )
    if (sC(A[g][0], I))
      return g;
  return -1;
}
var KI = rC, aC = KI, cC = Array.prototype, lC = cC.splice;
function DC(A) {
  var I = this.__data__, g = aC(I, A);
  if (g < 0)
    return !1;
  var B = I.length - 1;
  return g == B ? I.pop() : lC.call(I, g, 1), --this.size, !0;
}
var fC = DC, hC = KI;
function uC(A) {
  var I = this.__data__, g = hC(I, A);
  return g < 0 ? void 0 : I[g][1];
}
var yC = uC, wC = KI;
function dC(A) {
  return wC(this.__data__, A) > -1;
}
var MC = dC, NC = KI;
function FC(A, I) {
  var g = this.__data__, B = NC(g, A);
  return B < 0 ? (++this.size, g.push([A, I])) : g[B][1] = I, this;
}
var GC = FC, pC = nC, SC = fC, kC = yC, RC = MC, YC = GC;
function XA(A) {
  var I = -1, g = A == null ? 0 : A.length;
  for (this.clear(); ++I < g; ) {
    var B = A[I];
    this.set(B[0], B[1]);
  }
}
XA.prototype.clear = pC;
XA.prototype.delete = SC;
XA.prototype.get = kC;
XA.prototype.has = RC;
XA.prototype.set = YC;
var zI = XA, JC = zI;
function UC() {
  this.__data__ = new JC(), this.size = 0;
}
var HC = UC;
function mC(A) {
  var I = this.__data__, g = I.delete(A);
  return this.size = I.size, g;
}
var bC = mC;
function LC(A) {
  return this.__data__.get(A);
}
var xC = LC;
function vC(A) {
  return this.__data__.has(A);
}
var qC = vC;
function KC(A) {
  var I = typeof A;
  return A != null && (I == "object" || I == "function");
}
var UA = KC, zC = sI, _C = UA, OC = "[object AsyncFunction]", jC = "[object Function]", TC = "[object GeneratorFunction]", XC = "[object Proxy]";
function ZC(A) {
  if (!_C(A))
    return !1;
  var I = zC(A);
  return I == jC || I == TC || I == OC || I == XC;
}
var wg = ZC, PC = JA, VC = PC["__core-js_shared__"], WC = VC, VI = WC, gB = function() {
  var A = /[^.]+$/.exec(VI && VI.keys && VI.keys.IE_PROTO || "");
  return A ? "Symbol(src)_1." + A : "";
}();
function $C(A) {
  return !!gB && gB in A;
}
var AE = $C, IE = Function.prototype, gE = IE.toString;
function BE(A) {
  if (A != null) {
    try {
      return gE.call(A);
    } catch {
    }
    try {
      return A + "";
    } catch {
    }
  }
  return "";
}
var QE = BE, eE = wg, CE = AE, EE = UA, tE = QE, iE = /[\\^$.*+?()[\]{}|]/g, nE = /^\[object .+?Constructor\]$/, oE = Function.prototype, sE = Object.prototype, rE = oE.toString, aE = sE.hasOwnProperty, cE = RegExp(
  "^" + rE.call(aE).replace(iE, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function lE(A) {
  if (!EE(A) || CE(A))
    return !1;
  var I = eE(A) ? cE : nE;
  return I.test(tE(A));
}
var DE = lE;
function fE(A, I) {
  return A?.[I];
}
var hE = fE, uE = DE, yE = hE;
function wE(A, I) {
  var g = yE(A, I);
  return uE(g) ? g : void 0;
}
var dg = wE, dE = dg, ME = JA, NE = dE(ME, "Map"), _B = NE, FE = dg, GE = FE(Object, "create"), _I = GE, BB = _I;
function pE() {
  this.__data__ = BB ? BB(null) : {}, this.size = 0;
}
var SE = pE;
function kE(A) {
  var I = this.has(A) && delete this.__data__[A];
  return this.size -= I ? 1 : 0, I;
}
var RE = kE, YE = _I, JE = "__lodash_hash_undefined__", UE = Object.prototype, HE = UE.hasOwnProperty;
function mE(A) {
  var I = this.__data__;
  if (YE) {
    var g = I[A];
    return g === JE ? void 0 : g;
  }
  return HE.call(I, A) ? I[A] : void 0;
}
var bE = mE, LE = _I, xE = Object.prototype, vE = xE.hasOwnProperty;
function qE(A) {
  var I = this.__data__;
  return LE ? I[A] !== void 0 : vE.call(I, A);
}
var KE = qE, zE = _I, _E = "__lodash_hash_undefined__";
function OE(A, I) {
  var g = this.__data__;
  return this.size += this.has(A) ? 0 : 1, g[A] = zE && I === void 0 ? _E : I, this;
}
var jE = OE, TE = SE, XE = RE, ZE = bE, PE = KE, VE = jE;
function ZA(A) {
  var I = -1, g = A == null ? 0 : A.length;
  for (this.clear(); ++I < g; ) {
    var B = A[I];
    this.set(B[0], B[1]);
  }
}
ZA.prototype.clear = TE;
ZA.prototype.delete = XE;
ZA.prototype.get = ZE;
ZA.prototype.has = PE;
ZA.prototype.set = VE;
var WE = ZA, QB = WE, $E = zI, At = _B;
function It() {
  this.size = 0, this.__data__ = {
    hash: new QB(),
    map: new (At || $E)(),
    string: new QB()
  };
}
var gt = It;
function Bt(A) {
  var I = typeof A;
  return I == "string" || I == "number" || I == "symbol" || I == "boolean" ? A !== "__proto__" : A === null;
}
var Qt = Bt, et = Qt;
function Ct(A, I) {
  var g = A.__data__;
  return et(I) ? g[typeof I == "string" ? "string" : "hash"] : g.map;
}
var OI = Ct, Et = OI;
function tt(A) {
  var I = Et(this, A).delete(A);
  return this.size -= I ? 1 : 0, I;
}
var it = tt, nt = OI;
function ot(A) {
  return nt(this, A).get(A);
}
var st = ot, rt = OI;
function at(A) {
  return rt(this, A).has(A);
}
var ct = at, lt = OI;
function Dt(A, I) {
  var g = lt(this, A), B = g.size;
  return g.set(A, I), this.size += g.size == B ? 0 : 1, this;
}
var ft = Dt, ht = gt, ut = it, yt = st, wt = ct, dt = ft;
function PA(A) {
  var I = -1, g = A == null ? 0 : A.length;
  for (this.clear(); ++I < g; ) {
    var B = A[I];
    this.set(B[0], B[1]);
  }
}
PA.prototype.clear = ht;
PA.prototype.delete = ut;
PA.prototype.get = yt;
PA.prototype.has = wt;
PA.prototype.set = dt;
var OB = PA, Mt = zI, Nt = _B, Ft = OB, Gt = 200;
function pt(A, I) {
  var g = this.__data__;
  if (g instanceof Mt) {
    var B = g.__data__;
    if (!Nt || B.length < Gt - 1)
      return B.push([A, I]), this.size = ++g.size, this;
    g = this.__data__ = new Ft(B);
  }
  return g.set(A, I), this.size = g.size, this;
}
var St = pt, kt = zI, Rt = HC, Yt = bC, Jt = xC, Ut = qC, Ht = St;
function VA(A) {
  var I = this.__data__ = new kt(A);
  this.size = I.size;
}
VA.prototype.clear = Rt;
VA.prototype.delete = Yt;
VA.prototype.get = Jt;
VA.prototype.has = Ut;
VA.prototype.set = Ht;
var mt = VA, bt = dg, Lt = function() {
  try {
    var A = bt(Object, "defineProperty");
    return A({}, "", {}), A;
  } catch {
  }
}(), jB = Lt, eB = jB;
function xt(A, I, g) {
  I == "__proto__" && eB ? eB(A, I, {
    configurable: !0,
    enumerable: !0,
    value: g,
    writable: !0
  }) : A[I] = g;
}
var Mg = xt, vt = Mg, qt = qI;
function Kt(A, I, g) {
  (g !== void 0 && !qt(A[I], g) || g === void 0 && !(I in A)) && vt(A, I, g);
}
var TB = Kt;
function zt(A) {
  return function(I, g, B) {
    for (var Q = -1, e = Object(I), C = B(I), E = C.length; E--; ) {
      var t = C[A ? E : ++Q];
      if (g(e[t], t, e) === !1)
        break;
    }
    return I;
  };
}
var _t = zt, Ot = _t, jt = Ot(), Tt = jt, SI = {}, Xt = {
  get exports() {
    return SI;
  },
  set exports(A) {
    SI = A;
  }
};
(function(A, I) {
  var g = JA, B = I && !I.nodeType && I, Q = B && !0 && A && !A.nodeType && A, e = Q && Q.exports === B, C = e ? g.Buffer : void 0, E = C ? C.allocUnsafe : void 0;
  function t(o, s) {
    if (s)
      return o.slice();
    var n = o.length, l = E ? E(n) : new o.constructor(n);
    return o.copy(l), l;
  }
  A.exports = t;
})(Xt, SI);
var Zt = JA, Pt = Zt.Uint8Array, Vt = Pt, CB = Vt;
function Wt(A) {
  var I = new A.constructor(A.byteLength);
  return new CB(I).set(new CB(A)), I;
}
var $t = Wt, Ai = $t;
function Ii(A, I) {
  var g = I ? Ai(A.buffer) : A.buffer;
  return new A.constructor(g, A.byteOffset, A.length);
}
var gi = Ii;
function Bi(A, I) {
  var g = -1, B = A.length;
  for (I || (I = Array(B)); ++g < B; )
    I[g] = A[g];
  return I;
}
var Qi = Bi, ei = UA, EB = Object.create, Ci = function() {
  function A() {
  }
  return function(I) {
    if (!ei(I))
      return {};
    if (EB)
      return EB(I);
    A.prototype = I;
    var g = new A();
    return A.prototype = void 0, g;
  };
}(), Ei = Ci, ti = Object.prototype;
function ii(A) {
  var I = A && A.constructor, g = typeof I == "function" && I.prototype || ti;
  return A === g;
}
var XB = ii, ni = Ei, oi = qB, si = XB;
function ri(A) {
  return typeof A.constructor == "function" && !si(A) ? ni(oi(A)) : {};
}
var ai = ri, ci = sI, li = TA, Di = "[object Arguments]";
function fi(A) {
  return li(A) && ci(A) == Di;
}
var hi = fi, tB = hi, ui = TA, ZB = Object.prototype, yi = ZB.hasOwnProperty, wi = ZB.propertyIsEnumerable, di = tB(function() {
  return arguments;
}()) ? tB : function(A) {
  return ui(A) && yi.call(A, "callee") && !wi.call(A, "callee");
}, PB = di, Mi = Array.isArray, rI = Mi, Ni = 9007199254740991;
function Fi(A) {
  return typeof A == "number" && A > -1 && A % 1 == 0 && A <= Ni;
}
var VB = Fi, Gi = wg, pi = VB;
function Si(A) {
  return A != null && pi(A.length) && !Gi(A);
}
var Ng = Si, ki = Ng, Ri = TA;
function Yi(A) {
  return Ri(A) && ki(A);
}
var Ji = Yi, tI = {}, Ui = {
  get exports() {
    return tI;
  },
  set exports(A) {
    tI = A;
  }
};
function Hi() {
  return !1;
}
var mi = Hi;
(function(A, I) {
  var g = JA, B = mi, Q = I && !I.nodeType && I, e = Q && !0 && A && !A.nodeType && A, C = e && e.exports === Q, E = C ? g.Buffer : void 0, t = E ? E.isBuffer : void 0, o = t || B;
  A.exports = o;
})(Ui, tI);
var bi = sI, Li = VB, xi = TA, vi = "[object Arguments]", qi = "[object Array]", Ki = "[object Boolean]", zi = "[object Date]", _i = "[object Error]", Oi = "[object Function]", ji = "[object Map]", Ti = "[object Number]", Xi = "[object Object]", Zi = "[object RegExp]", Pi = "[object Set]", Vi = "[object String]", Wi = "[object WeakMap]", $i = "[object ArrayBuffer]", An = "[object DataView]", In = "[object Float32Array]", gn = "[object Float64Array]", Bn = "[object Int8Array]", Qn = "[object Int16Array]", en = "[object Int32Array]", Cn = "[object Uint8Array]", En = "[object Uint8ClampedArray]", tn = "[object Uint16Array]", nn = "[object Uint32Array]", U = {};
U[In] = U[gn] = U[Bn] = U[Qn] = U[en] = U[Cn] = U[En] = U[tn] = U[nn] = !0;
U[vi] = U[qi] = U[$i] = U[Ki] = U[An] = U[zi] = U[_i] = U[Oi] = U[ji] = U[Ti] = U[Xi] = U[Zi] = U[Pi] = U[Vi] = U[Wi] = !1;
function on(A) {
  return xi(A) && Li(A.length) && !!U[bi(A)];
}
var sn = on;
function rn(A) {
  return function(I) {
    return A(I);
  };
}
var an = rn, kI = {}, cn = {
  get exports() {
    return kI;
  },
  set exports(A) {
    kI = A;
  }
};
(function(A, I) {
  var g = xB, B = I && !I.nodeType && I, Q = B && !0 && A && !A.nodeType && A, e = Q && Q.exports === B, C = e && g.process, E = function() {
    try {
      var t = Q && Q.require && Q.require("util").types;
      return t || C && C.binding && C.binding("util");
    } catch {
    }
  }();
  A.exports = E;
})(cn, kI);
var ln = sn, Dn = an, iB = kI, nB = iB && iB.isTypedArray, fn = nB ? Dn(nB) : ln, WB = fn;
function hn(A, I) {
  if (!(I === "constructor" && typeof A[I] == "function") && I != "__proto__")
    return A[I];
}
var $B = hn, un = Mg, yn = qI, wn = Object.prototype, dn = wn.hasOwnProperty;
function Mn(A, I, g) {
  var B = A[I];
  (!(dn.call(A, I) && yn(B, g)) || g === void 0 && !(I in A)) && un(A, I, g);
}
var Nn = Mn, Fn = Nn, Gn = Mg;
function pn(A, I, g, B) {
  var Q = !g;
  g || (g = {});
  for (var e = -1, C = I.length; ++e < C; ) {
    var E = I[e], t = B ? B(g[E], A[E], E, g, A) : void 0;
    t === void 0 && (t = A[E]), Q ? Gn(g, E, t) : Fn(g, E, t);
  }
  return g;
}
var Sn = pn;
function kn(A, I) {
  for (var g = -1, B = Array(A); ++g < A; )
    B[g] = I(g);
  return B;
}
var Rn = kn, Yn = 9007199254740991, Jn = /^(?:0|[1-9]\d*)$/;
function Un(A, I) {
  var g = typeof A;
  return I = I ?? Yn, !!I && (g == "number" || g != "symbol" && Jn.test(A)) && A > -1 && A % 1 == 0 && A < I;
}
var AQ = Un, Hn = Rn, mn = PB, bn = rI, Ln = tI, xn = AQ, vn = WB, qn = Object.prototype, Kn = qn.hasOwnProperty;
function zn(A, I) {
  var g = bn(A), B = !g && mn(A), Q = !g && !B && Ln(A), e = !g && !B && !Q && vn(A), C = g || B || Q || e, E = C ? Hn(A.length, String) : [], t = E.length;
  for (var o in A)
    (I || Kn.call(A, o)) && !(C && // Safari 9 has enumerable `arguments.length` in strict mode.
    (o == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    Q && (o == "offset" || o == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    e && (o == "buffer" || o == "byteLength" || o == "byteOffset") || // Skip index properties.
    xn(o, t))) && E.push(o);
  return E;
}
var _n = zn;
function On(A) {
  var I = [];
  if (A != null)
    for (var g in Object(A))
      I.push(g);
  return I;
}
var jn = On, Tn = UA, Xn = XB, Zn = jn, Pn = Object.prototype, Vn = Pn.hasOwnProperty;
function Wn(A) {
  if (!Tn(A))
    return Zn(A);
  var I = Xn(A), g = [];
  for (var B in A)
    B == "constructor" && (I || !Vn.call(A, B)) || g.push(B);
  return g;
}
var $n = Wn, Ao = _n, Io = $n, go = Ng;
function Bo(A) {
  return go(A) ? Ao(A, !0) : Io(A);
}
var IQ = Bo, Qo = Sn, eo = IQ;
function Co(A) {
  return Qo(A, eo(A));
}
var Eo = Co, oB = TB, to = SI, io = gi, no = Qi, oo = ai, sB = PB, rB = rI, so = Ji, ro = tI, ao = wg, co = UA, lo = EA, Do = WB, aB = $B, fo = Eo;
function ho(A, I, g, B, Q, e, C) {
  var E = aB(A, g), t = aB(I, g), o = C.get(t);
  if (o) {
    oB(A, g, o);
    return;
  }
  var s = e ? e(E, t, g + "", A, I, C) : void 0, n = s === void 0;
  if (n) {
    var l = rB(t), d = !l && ro(t), w = !l && !d && Do(t);
    s = t, l || d || w ? rB(E) ? s = E : so(E) ? s = no(E) : d ? (n = !1, s = to(t, !0)) : w ? (n = !1, s = io(t, !0)) : s = [] : lo(t) || sB(t) ? (s = E, sB(E) ? s = fo(E) : (!co(E) || ao(E)) && (s = oo(t))) : n = !1;
  }
  n && (C.set(t, s), Q(s, t, B, e, C), C.delete(t)), oB(A, g, s);
}
var uo = ho, yo = mt, wo = TB, Mo = Tt, No = uo, Fo = UA, Go = IQ, po = $B;
function gQ(A, I, g, B, Q) {
  A !== I && Mo(I, function(e, C) {
    if (Q || (Q = new yo()), Fo(e))
      No(A, I, C, g, gQ, B, Q);
    else {
      var E = B ? B(po(A, C), e, C + "", A, I, Q) : void 0;
      E === void 0 && (E = e), wo(A, C, E);
    }
  }, Go);
}
var So = gQ;
function ko(A) {
  return A;
}
var BQ = ko;
function Ro(A, I, g) {
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
var Yo = Ro, Jo = Yo, cB = Math.max;
function Uo(A, I, g) {
  return I = cB(I === void 0 ? A.length - 1 : I, 0), function() {
    for (var B = arguments, Q = -1, e = cB(B.length - I, 0), C = Array(e); ++Q < e; )
      C[Q] = B[I + Q];
    Q = -1;
    for (var E = Array(I + 1); ++Q < I; )
      E[Q] = B[Q];
    return E[I] = g(C), Jo(A, this, E);
  };
}
var Ho = Uo;
function mo(A) {
  return function() {
    return A;
  };
}
var bo = mo, Lo = bo, lB = jB, xo = BQ, vo = lB ? function(A, I) {
  return lB(A, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Lo(I),
    writable: !0
  });
} : xo, qo = vo, Ko = 800, zo = 16, _o = Date.now;
function Oo(A) {
  var I = 0, g = 0;
  return function() {
    var B = _o(), Q = zo - (B - g);
    if (g = B, Q > 0) {
      if (++I >= Ko)
        return arguments[0];
    } else
      I = 0;
    return A.apply(void 0, arguments);
  };
}
var jo = Oo, To = qo, Xo = jo, Zo = Xo(To), Po = Zo, Vo = BQ, Wo = Ho, $o = Po;
function As(A, I) {
  return $o(Wo(A, I, Vo), A + "");
}
var Is = As, gs = qI, Bs = Ng, Qs = AQ, es = UA;
function Cs(A, I, g) {
  if (!es(g))
    return !1;
  var B = typeof I;
  return (B == "number" ? Bs(g) && Qs(I, g.length) : B == "string" && I in g) ? gs(g[I], A) : !1;
}
var Es = Cs, ts = Is, is = Es;
function ns(A) {
  return ts(function(I, g) {
    var B = -1, Q = g.length, e = Q > 1 ? g[Q - 1] : void 0, C = Q > 2 ? g[2] : void 0;
    for (e = A.length > 3 && typeof e == "function" ? (Q--, e) : void 0, C && is(g[0], g[1], C) && (e = Q < 3 ? void 0 : e, Q = 1), I = Object(I); ++B < Q; ) {
      var E = g[B];
      E && A(I, E, B, e);
    }
    return I;
  });
}
var os = ns, ss = So, rs = os, as = rs(function(A, I, g) {
  ss(A, I, g);
}), QQ = as;
const j = {}, RI = m({}), DB = function(A) {
  if (A.name)
    if (j[A.name])
      console.warn("重复组件名:" + A.name);
    else {
      let I = QQ({}, vI, A);
      j[A.name] = I, RI[I.name] = {
        name: I.name,
        type: I.type,
        label: I.label,
        icon: I.icon
      }, nI.vm ? nI.vm.component(A.name, j[A.name]) : console.error("组件注册失败，缺少app");
    }
  else
    console.warn("缺少组件名");
}, cs = function(A) {
  Array.isArray(A) ? A.forEach((I) => {
    j[I] && (delete j[I], delete RI[I]);
  }) : A && typeof A == "string" && j[A] && (delete j[A], delete RI[A]);
}, ls = function() {
  return Object.values(j);
}, WI = function(A) {
  A instanceof Array ? A.forEach((I) => {
    DB(I);
  }) : typeof A == "object" && DB(A);
}, Ds = function() {
  Object.values(j).forEach((I) => {
    nI.vm ? (j[I.name] = QQ({}, vI, I), nI.vm.component(I.name, j[I.name])) : console.error("组件注册失败，缺少app");
  });
}, fs = [
  {
    name: "显示隐藏",
    action: "show",
    target: "component",
    valueType: "boolean",
    value: !0
  },
  {
    name: "轮换显示隐藏",
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
], aI = {
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
    return fs;
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
var LA = [];
const NA = {
  // 当前已安装组件
  get items() {
    return RI;
  },
  getComponentItems: ls,
  // 返回组件默认数据
  getComponentDefaultData(A) {
    let I = j[A];
    if (!I)
      return {};
    let g = {}, B = I.mixins || [], Q = {};
    for (const e of B)
      e.props && Object.assign(Q, e.props);
    Object.assign(Q, I.props);
    for (const e in Q)
      if (Object.hasOwnProperty.call(Q, e)) {
        const C = Q[e];
        typeof C.default == "function" ? g[e] = C.default.call() : g[e] = C.default;
      }
    return g.id = "sprite_" + $(10), g.name = A, g.type = I.type || "", g;
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
    return [...aI.events, ...this.getComponentEvents(A)];
  },
  // 添加组件
  add(A) {
    if (A)
      if (Array.isArray(A))
        A.forEach((I) => {
          LA.find((g) => g.name == I.name) ? console.warn(I.name + "组件名重复") : LA.push(I);
        });
      else
        return LA.find((I) => I.name == A.name) ? (console.warn(A.name + "组件名重复"), !1) : (LA.push(A), !0);
  },
  // 删除所有组件
  removeAll() {
    LA = [], cs(Object.keys(j));
  },
  // 安装组件
  install(A) {
    A ? Array.isArray(A) ? A.forEach((I) => {
      this.add(I) && WI(I);
    }) : this.add(A) && WI(A) : WI(LA);
  },
  reload() {
    Ds();
  }
}, aA = {}, G = m({}), F = {}, N = {}, sA = m({}), dA = {};
let hs = 1, us = 1, fB = 1;
const hB = function(A, I = {}) {
  let g = NA.getComponentDefaultData(A), B = g.title, Q = {
    id: null,
    gpid: null,
    mid: null,
    name: g.name,
    type: g.type,
    title: B ? B + fB++ : "元件 " + fB++,
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
  return Object.assign(Q, I), Q.id || (Q.id = "sprite_" + $(10)), Q;
}, uB = function(A, I) {
  let g = m({});
  return typeof A == "string" && NA.items[A] ? (Object.assign(g, hB(A, I)), N[g.id] = g, aA[g.id] = g, g) : typeof A == "object" ? A.id && N[A.id] ? (I ? Object.assign(N[A.id], I) : console.warn("元件" + A.id + "已存在"), N[A.id]) : A.name ? (Object.assign(g, hB(A.name, A)), N[g.id] = g, aA[g.id] = g, N[g.id]) : (console.error("元件添加失败", A), null) : null;
}, eQ = function(A) {
  return N[A] ? (delete N[A], delete aA[A], A) : !1;
}, yB = function(A = {}) {
  let I = {
    type: "content",
    name: "vx-module",
    title: "页面" + hs++,
    x: 0,
    y: 0,
    components: []
  };
  return Object.assign(I, A), I.id || (I.id = "mdu_" + $(10)), I;
}, QI = function(A, I) {
  if (A)
    return G[A] || (G[A] = yB(Object.assign({ id: A }, I)), aA[A] = G[A]), G[A].components || (G[A].components = []), G[A];
  if (I) {
    let g = yB(I);
    return G[g.id] = g, aA[g.id] = G[g.id], G[g.id];
  } else
    return null;
}, CQ = function(A) {
  return G[A] ? (delete G[A], delete aA[A], A) : !1;
}, wB = function(A = {}) {
  let I = m({
    id: null,
    gpid: null,
    mid: null,
    name: "vx-sprite-group",
    type: "group",
    title: "组合" + us++,
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
  return Object.assign(I, A), I.id || (I.id = "group_" + $(10)), I;
}, eg = function(A, I) {
  if (A)
    return F[A] ? Object.assign(F[A], I) : (F[A] = wB(Object.assign({ id: A }, I)), aA[A] = F[A]), F[A];
  {
    let g = wB(I);
    return F[g.id] = g, aA[g.id] = g, F[g.id];
  }
}, EQ = function(A) {
  return F[A] ? (delete F[A], delete aA[A], A) : !1;
}, O = function(A) {
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
}, tQ = function(A) {
  return G[A].components && G[A].components.length > 0 && G[A].components.map((g) => ({
    id: g.id,
    zIndex: g.zIndex
  })).sort((g, B) => B.zIndex - g.zIndex)[0].zIndex || 0;
}, CA = m({}), qA = function(A) {
  if (A && typeof A == "object") {
    let I = A.id = A.id || "AC_" + $(10);
    return CA[I] = A, I;
  } else
    return null;
}, Cg = function(A) {
  CA[A] && delete CA[A];
}, ys = function(A) {
  return CA[A];
}, ws = function() {
  return CA;
}, HA = function(A) {
  if (A) {
    let I = [];
    if (A instanceof Array)
      for (const g in A)
        I.push(CA[A[g]]);
    else
      typeof A == "string" && CA[A] && I.push(CA[A]);
    return I;
  } else
    return Object.values(CA);
}, Fg = function() {
  Object.keys(CA).forEach((I) => {
    delete CA[I];
  });
}, ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clearAction: Fg,
  delActionData: Cg,
  getActionData: ys,
  getActionList: HA,
  getActionsData: ws,
  setActionData: qA
}, Symbol.toStringTag, { value: "Module" }));
function Ms(A, I) {
  let g = I.id;
  return {
    style: {
      cursor: k.clickCursor
    },
    onClickCapture: function(B) {
      if (M.emit(b.CLICK_SPRITE, O(I), B), A.actions) {
        let Q = W(HA(A.actions));
        A.actionValue && typeof A.actionValue == "object" && Q.forEach((e) => {
          A.actionValue[e.id] && (e.value = A.actionValue[e.id]);
        }), M.execute(Q, g);
      }
    }
  };
}
const dB = function(A, I, g) {
  let B = W(HA(A));
  for (let Q = 0, e = B.length; Q < e; Q++)
    g && B[Q].value && typeof B[Q].value == "object" ? Object.assign(B[Q].value, g) : g && (B[Q].value = g);
  M.execute(B, I);
};
function Ns(A, I, g) {
  let B = {};
  if (g && j[g]) {
    let e = (j[g].emits || []).find((C) => C == A.event);
    e && typeof e == "string" ? /^[a-zA-Z][-_a-zA-Z0-9_-]{1,32}$/.test(e) ? B["on" + e.toLowerCase().replace(/( |^)[a-z]/g, (C) => C.toUpperCase())] = function(C) {
      /^solo-/.test(e) && C ? A.actions && A.actions instanceof Array && A.actions.length > 0 ? dB(A.actions, I, C) : M.execute(W(HA(C)), I) : A.actions && A.actions instanceof Array && dB(A.actions, I, C);
    } : console.warn(e + "无效的事件名定义") : console.warn(A.event + "事件没有定义");
  }
  return B;
}
function Fs(A, I) {
  let g = null;
  return {
    timeout: "1",
    onTimeout(B) {
      let Q = B.detail.value;
      if (g && (clearTimeout(g), g = null), Q == "mounted") {
        let C = (A.pams || {}).delay || 1e3;
        g = setTimeout(() => {
          A.actions && M.execute(HA(A.actions), I);
        }, parseInt(C));
      }
    }
  };
}
let DA = {};
const YI = {
  add(A, I = 1e3, g) {
    let B = g || "it_" + $(7);
    return DA[B] && clearInterval(DA[B]), DA[B] = setInterval(A, I), B;
  },
  del(A) {
    if (A)
      DA[A] && (clearInterval(DA[A]), delete DA[A]);
    else {
      for (const I in DA)
        clearInterval(DA[I]);
      DA = {};
    }
  }
};
function Gs(A, I) {
  let g = null;
  return {
    interval: "1",
    onInterval(B) {
      if (g && (YI.del(g), g = null), B.detail.value == "mounted") {
        let e = (A.pams || {}).delay || 1e3;
        g = YI.add(() => {
          A.actions && M.execute(HA(A.actions), I);
        }, parseInt(e));
      }
    }
  };
}
function MB(A, I = {}, g = "") {
  let B = {}, Q = I.id;
  return g && (B = {
    style: {}
  }), k.interaction ? A.forEach((e) => {
    switch (e.event) {
      case "click":
        Object.assign(B, Ms(e, I));
        break;
      case "timeout":
        Object.assign(B, Fs(e, Q));
        break;
      case "interval":
        Object.assign(B, Gs(e, Q));
        break;
      default:
        Object.assign(B, Ns(e, Q, g));
    }
  }) : I.type == "group" && !I.gpid ? Object.assign(B, {
    onClickCapture(e) {
      e.stopPropagation(), M.emit(b.CLICK_SPRITE, O(I), e);
    },
    onDblclickCapture(e) {
      e.stopPropagation(), M.emit(b.DBLCLICK_SPRITE, O(I), e);
    },
    onMousedownCapture(e) {
      M.emit(b.MOUSEDOWN_SPRITE, O(I), e);
    },
    onMouseoverCapture(e) {
      M.emit(b.MOUSEOVER_SPRITE, O(I), e);
    },
    onMouseoutCapture(e) {
      M.emit(b.MOUSEOUT_SPRITE, O(I), e);
    },
    onMouseupCapture(e) {
      M.emit(b.MOUSEUP_SPRITE, O(I), e);
    },
    onMouseleaveCapture(e) {
      M.emit(b.MOUSELEAVE_SPRITE, O(I), e);
    },
    onMouseenterCapture(e) {
      M.emit(b.MOUSEENTER_SPRITE, O(I), e);
    }
  }) : Object.assign(B, {
    onClick(e) {
      e.stopPropagation(), M.emit(b.CLICK_SPRITE, O(I), e);
    },
    onMousedown(e) {
      M.emit(b.MOUSEDOWN_SPRITE, O(I), e);
    },
    onMouseover(e) {
      M.emit(b.MOUSEOVER_SPRITE, O(I), e);
    },
    onMouseout(e) {
      M.emit(b.MOUSEOUT_SPRITE, O(I), e);
    },
    onMouseup(e) {
      M.emit(b.MOUSEUP_SPRITE, O(I), e);
    },
    onMouseleave(e) {
      M.emit(b.MOUSELEAVE_SPRITE, O(I), e);
    },
    onMouseenter(e) {
      M.emit(b.MOUSEENTER_SPRITE, O(I), e);
    }
  }), B;
}
const ps = function(A) {
  return A && typeof A == "object" ? A.id ? G[A.id] ? (console.warn("模块" + A.id + "已存在"), null) : QI(A.id, A) : QI(null, A) : typeof A == "string" ? G[A] ? (console.warn("模块" + A + "已存在"), null) : QI(A) : QI();
}, Gg = function(A, I = "default") {
  I && A && typeof A != "string" && (G[I] && G[I].components ? G[I].components.push(A) : console.warn("模块添加元件数据失败"));
}, pg = function(A, I = "default") {
  return I && A ? G[I] && G[I].components ? rA(G[I].components, "id", A) : (console.warn("模块删除元件数据失败"), !1) : (console.warn("mid && id 无效"), !1);
}, Ss = function(A) {
  return CQ(A);
}, ks = function(A) {
  return G[A] || null;
}, Rs = function() {
  return G;
}, Ys = function(A, I = "type") {
  if (A) {
    let g = Object.values(G);
    return typeof A == "string" ? g.filter((B) => B[I] == A) : typeof A == "function" ? g.filter((B) => A(B)) : g;
  } else
    return Object.values(G);
}, iQ = function(A = "default") {
  return G[A] && G[A].components ? G[A].components : [];
}, Js = function() {
  Object.keys(G).forEach((I) => {
    CQ(I);
  });
}, nQ = function(A, I = {}) {
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
}, oQ = function(A, I = "default") {
  if (A && typeof A == "object" && A.id && F[A.id])
    return console.warn("组合" + A.id + "已存在"), null;
  let g = null;
  A ? g = eg(A.id, Object.assign({ mid: I }, A)) : g = eg(null, { mid: I }), g.zIndex || (g.zIndex = tQ(I) + 1);
  let B = nQ(g);
  return Gg(B, g.mid), dA[g.id] = oI(g, (Q) => {
    sA[Q.id] && Object.keys(sA[Q.id]).forEach((C) => {
      sA[Q.id][C] = Q[C];
    });
  }), g;
}, Sg = function(A, I) {
  I && A && typeof A != "string" && (F[I] && F[I].components ? F[I].components.push(A) : console.warn("模块添加元件数据失败"));
}, sQ = function(A, I) {
  let g = !1;
  return I && A && F[I] && F[I].components && (g = rA(F[I].components, "id", A)), g || console.warn("模块删除元件数据失败"), g;
}, Us = function(A, I = "default") {
  if (Array.isArray(A)) {
    let g = { x1: 0, y1: 0, x2: 0, y2: 0 }, B = iQ(I), Q = [], e = [], C = [];
    if (A.forEach((t, o) => {
      let s = B.find((l) => l.id == t), n = s ? s.type == "group" ? F[t] : N[t] : null;
      if (n)
        if (o == 0 ? (g.x1 = n.x, g.y1 = n.y, g.x2 = n.x + n.width, g.y2 = n.y + n.height) : (g.x1 = n.x < g.x1 ? n.x : g.x1, g.y1 = n.y < g.y1 ? n.y : g.y1, g.x2 = n.x + n.width > g.x2 ? n.x + n.width : g.x2, g.y2 = n.y + n.height > g.y2 ? n.y + n.height : g.y2), n.type == "group") {
          let l = n.components ? n.components.map((d) => d.id) : [];
          e.push(...l), Q.push(n.id);
        } else
          e.push(t);
      else
        C.push(t);
    }), C.length > 0)
      return console.warn(C.join(), "元件无法组合"), !1;
    Q.length > 0 && Q.forEach((t) => {
      rQ(t);
    }), kg(A, !1);
    let E = oQ({
      x: g.x1,
      y: g.y1,
      width: g.x2 - g.x1,
      height: g.y2 - g.y1
    }, I);
    return E ? (A.forEach((t) => {
      N[t] && (N[t].x -= g.x1, N[t].y -= g.y1, N[t].gpid = E.id, N[t].hover = !1, N[t].selected = !1, Sg(fQ(N[t]), E.id));
    }), E) : !1;
  } else
    return !1;
}, rQ = function(A) {
  return A && F[A] && F[A].components && pg(F[A].id, F[A].mid) ? (dA[A] && typeof dA[A] == "function" && dA[A](), F[A].components.forEach((I) => {
    N[I.id].x += F[A].x, N[I.id].y += F[A].y, N[I.id].gpid = null, Gg(I, I.mid);
  }), EQ(A)) : !1;
}, aQ = function(A) {
  return F[A] || null;
}, cQ = function() {
  return F;
}, lQ = function() {
  return Object.values(F);
}, DQ = function() {
  Object.keys(F).forEach((I) => {
    EQ(I);
  });
}, Hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addElement: Sg,
  bind: Us,
  clearGroupsData: DQ,
  createSimpleGroup: nQ,
  delElement: sQ,
  getGroup: aQ,
  getGroupArrData: lQ,
  getGroups: cQ,
  newGroupData: oQ,
  unbind: rQ
}, Symbol.toStringTag, { value: "Module" })), NB = function(A, I = !0) {
  if (N[A] && N[A].mid) {
    let g = pg(A, N[A].mid);
    return I && eQ(A), g && dA[A] && typeof dA[A] == "function" && dA[A](), !!g;
  } else
    console.warn("删除模块内元件失败");
  return !1;
}, ms = function(A) {
  Object.keys(A).forEach((g) => {
    delete A[g];
  });
}, bs = function(A) {
  if (!A)
    return console.warn("添加元件失败,无数据信息"), !1;
  if (!A.mid)
    return console.warn("添加元件失败,无模块id" + mid), !1;
  A.zIndex || (A.zIndex = tQ(A.mid) + 1);
  let I = fQ(A);
  if (A.gpid && eg(A.gpid))
    Sg(I, A.gpid);
  else if (QI(A.mid))
    Gg(I, A.mid);
  else
    return console.warn("添加元件失败", I), !1;
  return dA[A.id] = oI(A, (g) => {
    sA[g.id] && Object.keys(sA[g.id]).forEach((Q) => {
      sA[g.id][Q] = g[Q];
    });
  }), N[A.id];
}, fQ = function(A, I = {}) {
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
  if (typeof A == "string" && typeof I == "object" ? B = uB(A, I) : typeof A == "object" && (B = uB(A, { mid: I, gpid: g })), bs(B))
    return N[B.id];
  throw "添加元件失败";
}, kg = function(A, I = !0) {
  if (A) {
    if (Array.isArray(A))
      return A.forEach((g) => {
        NB(g, I);
      }), !0;
    if (typeof A == "string")
      return NB(A, I);
  }
  return !1;
}, xs = function() {
  return N;
}, vs = function(A) {
  let I = Object.values(N);
  return A ? I.filter((g) => g.mid == A) : I;
}, qs = function(A) {
  return N[A] ? (Object.assign(N[A], Object.assign({}, NA.getComponentDefaultData(N[A].name), N[A])), N[A]) : null;
}, Ks = function() {
  Object.keys(N).forEach((I) => {
    ms(N[I]), eQ(I);
  });
}, Eg = ps, zs = Ss, _s = Rs, Os = ks, Rg = Ys, hQ = iQ, uQ = Js, JI = Ls, js = kg, yQ = xs, Yg = vs, tA = qs, wQ = Ks, Jg = Hs, jI = aQ, dQ = cQ, MQ = lQ, NQ = DQ, FQ = function(A) {
  if (N[A])
    return kg(A);
  if (F[A] && Array.isArray(F[A].components) && F[A].components.length > 0)
    return F[A].components.forEach((I) => {
      FQ(I.id);
    }), F[A].gpid ? sQ(A) : pg(A, F[A].mid);
}, GQ = function(A) {
  Array.isArray(A) && A.length > 0 ? A.forEach((I) => {
    if (typeof I == "object") {
      let g = [];
      I.components && (g = I.components, delete I.components), Eg(I), g.forEach((B) => {
        if (B.type == "group") {
          let Q = [];
          B.components && (Q = B.components, delete B.components), Jg.newGroupData(B, I.id), Q.forEach((e) => {
            JI(e, I.id, e.gpid);
          });
        } else
          JI(B, I.id);
      });
    }
  }) : Eg({ id: "default" });
}, Ug = function() {
  wQ(), NQ(), uQ();
}, Ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addSpriteData: JI,
  clearGroupsData: NQ,
  clearModulesData: uQ,
  clearSprites: Ug,
  clearSpritesData: wQ,
  delElementData: FQ,
  delModuleData: zs,
  delSpriteData: js,
  elements: aA,
  fillData: GQ,
  getGroup: jI,
  getGroupArrData: MQ,
  getGroups: dQ,
  getModule: Os,
  getModuleComponents: hQ,
  getModuleList: Rg,
  getModules: _s,
  getSpriteArrData: Yg,
  getSpriteData: tA,
  getSpritesData: yQ,
  group: Jg,
  newMouleData: Eg
}, Symbol.toStringTag, { value: "Module" }));
var Xs = sI, Zs = TA, Ps = "[object Symbol]";
function Vs(A) {
  return typeof A == "symbol" || Zs(A) && Xs(A) == Ps;
}
var Hg = Vs, Ws = rI, $s = Hg, Ar = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ir = /^\w*$/;
function gr(A, I) {
  if (Ws(A))
    return !1;
  var g = typeof A;
  return g == "number" || g == "symbol" || g == "boolean" || A == null || $s(A) ? !0 : Ir.test(A) || !Ar.test(A) || I != null && A in Object(I);
}
var Br = gr, pQ = OB, Qr = "Expected a function";
function mg(A, I) {
  if (typeof A != "function" || I != null && typeof I != "function")
    throw new TypeError(Qr);
  var g = function() {
    var B = arguments, Q = I ? I.apply(this, B) : B[0], e = g.cache;
    if (e.has(Q))
      return e.get(Q);
    var C = A.apply(this, B);
    return g.cache = e.set(Q, C) || e, C;
  };
  return g.cache = new (mg.Cache || pQ)(), g;
}
mg.Cache = pQ;
var er = mg, Cr = er, Er = 500;
function tr(A) {
  var I = Cr(A, function(B) {
    return g.size === Er && g.clear(), B;
  }), g = I.cache;
  return I;
}
var ir = tr, nr = ir, or = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, sr = /\\(\\)?/g, rr = nr(function(A) {
  var I = [];
  return A.charCodeAt(0) === 46 && I.push(""), A.replace(or, function(g, B, Q, e) {
    I.push(Q ? e.replace(sr, "$1") : B || g);
  }), I;
}), ar = rr;
function cr(A, I) {
  for (var g = -1, B = A == null ? 0 : A.length, Q = Array(B); ++g < B; )
    Q[g] = I(A[g], g, A);
  return Q;
}
var lr = cr, FB = ug, Dr = lr, fr = rI, hr = Hg, ur = 1 / 0, GB = FB ? FB.prototype : void 0, pB = GB ? GB.toString : void 0;
function SQ(A) {
  if (typeof A == "string")
    return A;
  if (fr(A))
    return Dr(A, SQ) + "";
  if (hr(A))
    return pB ? pB.call(A) : "";
  var I = A + "";
  return I == "0" && 1 / A == -ur ? "-0" : I;
}
var yr = SQ, wr = yr;
function dr(A) {
  return A == null ? "" : wr(A);
}
var Mr = dr, Nr = rI, Fr = Br, Gr = ar, pr = Mr;
function Sr(A, I) {
  return Nr(A) ? A : Fr(A, I) ? [A] : Gr(pr(A));
}
var kr = Sr, Rr = Hg, Yr = 1 / 0;
function Jr(A) {
  if (typeof A == "string" || Rr(A))
    return A;
  var I = A + "";
  return I == "0" && 1 / A == -Yr ? "-0" : I;
}
var Ur = Jr, Hr = kr, mr = Ur;
function br(A, I) {
  I = Hr(I, A);
  for (var g = 0, B = I.length; A != null && g < B; )
    A = A[mr(I[g++])];
  return g && g == B ? A : void 0;
}
var Lr = br, xr = Lr;
function vr(A, I, g) {
  var B = A == null ? void 0 : xr(A, I);
  return B === void 0 ? g : B;
}
var UI = vr;
const BA = m({
  title: "",
  id: "A_" + $(10),
  creattime: null,
  uptime: null,
  cover: null,
  description: ""
}), QA = m({ width: k.width, height: k.height }), wA = m({
  backgroundColor: k.backgroundColor
}), v = m({ value: 1, h: 1, w: 1, mode: k.scaleMode }), kQ = Be(() => {
  if (k.scale)
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
}), RQ = function(A) {
  if (A) {
    let I = A;
    typeof I == "string" && (I = document.querySelector(k.dom));
    let g = I.getBoundingClientRect();
    return g.width > 0 && g.height > 0 ? g : I.parentElement && I.parentElement.localName != "body" ? RQ(I.parentElement) : {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}, SB = function(A) {
  let I = RQ(k.dom) || {
    width: window.innerWidth,
    height: window.innerHeight
  }, g = I.height / A.height, B = I.width / A.width;
  return g < B ? { value: g, h: g, w: B } : { value: B, h: g, w: B };
}, AA = m({
  host: "",
  method: "GET",
  headers: {}
}), YQ = function(A) {
  return A.id ? BA.id = A.id : BA.id = "A_" + $(10), A.title && (BA.title = A.title), A.creattime && (BA.creattime = A.creattime), A.uptime && (BA.uptime = A.uptime), A.cover && (BA.cover = A.cover), A.description && (BA.description = A.description), A.width && (QA.width = A.width), A.height && (QA.height = A.height), A.scaleMode && (v.mode = A.scaleMode), Object.assign(v, SB(QA)), Object.assign(wA, A.background), Object.assign(AA, A.network), window.addEventListener("resize", (I) => {
    Object.assign(v, SB(QA));
  }), {
    info: BA,
    size: QA,
    scale: v,
    transform: kQ,
    background: wA
  };
}, qr = {
  info: BA,
  size: QA,
  background: wA
}, JQ = function() {
  QA.width = k.width, QA.height = k.height;
  for (const A in wA)
    Object.hasOwnProperty.call(wA, A) && delete wA[A];
  wA.backgroundColor = k.backgroundColor, v.mode = k.scaleMode, Object.assign(AA, {
    host: "",
    method: "GET",
    headers: {}
  }), Object.assign(BA, {
    title: "",
    id: "A_" + $(10),
    creattime: null,
    uptime: null,
    cover: null,
    description: ""
  });
}, UQ = function() {
  return {
    info: BA,
    size: QA,
    scale: v,
    transform: kQ,
    background: wA,
    get network() {
      return AA;
    }
  };
}, Kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appBase: qr,
  getAppData: UQ,
  initAppData: YQ,
  network: AA,
  resetAppData: JQ
}, Symbol.toStringTag, { value: "Module" }));
var zr = JA, _r = zr.isFinite;
function Or(A) {
  return typeof A == "number" && _r(A);
}
var jr = Or;
let $I = "token", Ag = "json";
function Tr(A) {
  $I = AA.token || "token", Ag = AA.responseType || "json";
  let I = /^(?!https?:\/\/)/.test(A.url) ? AA.host + A.url : A.url, g = localStorage.getItem($I) ? { Authorization: localStorage.getItem($I) } : {}, B = A.customize || {}, Q = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };
  (!AA.headers || typeof AA.headers == "string" && (AA.headers == "" || AA.headers == "null")) && (Q = {});
  let e = Object.assign({
    method: A.method || AA.method,
    mode: AA.mode || "cors",
    signal: A.signal,
    headers: new Headers(Object.assign(Q, g, A.headers))
  }, B);
  return e.method.toUpperCase() == "POST" ? e.body = e.headers.get("Content-Type") == "application/json" ? JSON.stringify(A.data) : A.data : I = /\?/.test(I) ? I + "&" + Qg(A.data) : I + "?" + Qg(A.data), new Promise((C, E) => {
    fetch(I, e).then((t) => Ag ? t[Ag]() : t.json(), E).then(C);
  });
}
const vA = {}, tg = [];
class Xr extends EI {
  constructor(I) {
    super(), this.id = "R_" + $(10), this.controller = new AbortController(), this.signal = this.controller.signal, this.isloading = !1, this.status = "wait", this.options = I, this.data = null, this.err = null;
  }
  //    请求数据
  request(I) {
    this.status != "request" && (this.isloading = !0, this.status = "request", this.emit("request", this), Tr({
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
    this.controller && this.controller.abort(), this.controller = null, this.signal = null, this.isloading = null, this.status = null, this.options = null, this.data = null, this.err = null, vA[this.id] && (rA(tg, "id", this.id), delete vA[this.id]);
  }
}
function Zr(A) {
  let I = A.url || "", g = A.body || {}, B = (I + JSON.stringify(g)).split("").sort().join(""), Q = tg.find((C) => C.test == B);
  if (Q && vA[Q.id])
    return vA[Q.id];
  let e = new Xr(A);
  return tg.push({
    id: e.id,
    test: B
  }), vA[e.id] = e, vA[e.id];
}
class Pr extends EI {
  constructor(I, g, B, Q, e) {
    super(), this.id = "RD_" + $(10), this.url = I, this.body = B, this.method = Q, this.data = m({}), this.sourceData = null, this.loading = fg(!1), this.isloading = !1, this.itval = e || 0, this.it = null, this.status = "wait", this.err = null, this.extractRule = g ? m(g) : m({});
    let C = Zr({ url: I, body: Dg(B), method: Q });
    C.on("request", () => {
      this.loading.value = !0, this.isloading = !0, this.status = "request";
    }), C.on("success", (E) => {
      this.sourceData = E, this.status = "success", this.loading.value = !1, this.isloading = !1, this.err = null, this.fillData(E), this.emit("success", this);
    }), C.on("error", (E) => {
      this.status = "success", this.loading.value = !1, this.isloading = !1, this.err = E, this.emit("error", E);
    }), this.req = C, this.unwatch = null, this.watchRule();
  }
  watchRule() {
    this.stopWatch(), this.watch = oI(this.extractRule, () => {
      this.sourceData && this.fillData(this.sourceData);
    }), this.sourceData && this.fillData(this.sourceData);
  }
  stopWatch() {
    this.unwatch && (this.unwatch(), this.unwatch = null);
  }
  setData(I = {}) {
    I.url && (this.url = I.url, this.req.options.url = I.url), I.method && (this.method = I.method, this.req.options.method = I.method), I.body && (this.body = I.body, this.req.options.body = Dg(I.body)), jr(I.itval) && (this.itval = I.itval);
  }
  // 修改规则
  setExtractRule(I) {
    if (this.extractRule instanceof Array && I instanceof Array || this.extractRule instanceof Object && I instanceof Object && !Array.isArray(this.extractRule) && !Array.isArray(I)) {
      for (const g in this.extractRule)
        delete this.extractRule[g];
      Object.assign(this.extractRule, I);
    } else
      this.extractRule = m(W(I)), this.watchRule();
  }
  // 返回规则（返回的是一个非响应式的数据对象）
  getExtractRule() {
    return W(this.extractRule);
  }
  //    请求数据
  request(I) {
    this.req.request(I), this.setinterval(this.itval);
  }
  // 开启轮询请求
  setinterval(I = 0) {
    k.interaction && I && I > 0 && (this.it = YI.add(() => {
      this.req.request();
    }, I * 1e3));
  }
  // 关闭轮询请求
  stopInterval() {
    this.it && (YI.del(this.it), this.it = null);
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
    this.clearData(), this.extractRule && (this.extractRule.x || this.extractRule.name || this.extractRule instanceof Array) ? Object.assign(this.data, { data: yg(I, this.extractRule) }) : Object.assign(this.data, { data: I });
  }
  /**
   * 销毁
   */
  destroy() {
    this.req.destroy(), this.clearData(), this.stopWatch(), this.stopInterval(), this.extractRule = null;
  }
}
function kB(A, I, g, B, Q) {
  return new Pr(A, I, g, B, Q);
}
const J = {}, _A = m([]), Vr = function() {
  return m({
    x: {
      name: "",
      path: "",
      mapKey: ""
    },
    y: []
  });
}, HQ = function() {
  return _A;
}, HI = function(A, I = null, g = null, B = null, Q = null) {
  let e = null;
  if (EA(A))
    e = kB(A.url, A.extractRule, A.body, A.method, A.itval), A.id && (e.id = A.id), _A.push(e), J[e.id] = e;
  else if (typeof A == "string")
    if (!J[A])
      e = kB(A, I, g, B, Q), _A.push(e), J[e.id] = e;
    else
      return J[A];
  return e;
}, Ig = function(A) {
  rA(_A, "id", A), J[A].destroy(), delete J[A];
}, mQ = function(A) {
  if (A)
    if (J[A])
      Ig(A);
    else
      for (let I in J)
        J[I].url == A && Ig(I);
  else
    Object.keys(J).forEach((g) => {
      Ig(g);
    }), _A.splice(0, _A.length);
}, bQ = function(A) {
  if (J[A])
    return J[A];
  for (let I in J)
    if (J[I].url == A)
      return J[I];
  return null;
}, bg = function() {
  mQ();
}, LQ = function(A = !1, I = "", g) {
  if (I && J[I])
    J[I].request(g);
  else
    for (let B in J)
      if (J[B].status != "success" || J[B].err || A)
        if (I) {
          if (J[B].url == I) {
            J[B].request(g);
            return;
          }
        } else
          J[B].request(g);
}, Wr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: HI,
  clearRemote: bg,
  createExtractRule: Vr,
  del: mQ,
  getList: HQ,
  getRemote: bQ,
  remotes: J,
  requestData: LQ
}, Symbol.toStringTag, { value: "Module" })), Y = {}, MA = m([]), RB = function(A = "", I = "", g = "source") {
  return {
    id: "GD_" + $(10),
    name: I,
    type: g,
    value: A instanceof Object ? m(A) : fg(A),
    uptime: new Date().getTime()
  };
}, gg = function(A) {
  return m({
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
}, ig = function(A, I = "", g = "source") {
  if (EA(A) && A.id)
    return Y[A.id] || (A.type == "remote" && (A.value = HI(A.value).id), Y[A.id] = gg(A), MA.push(Y[A.id])), Y[A.id];
  if (A) {
    let B = {};
    return g == "remote" && (A = HI(A).id), B = RB(A, I, g), Y[B.id] = gg(B), MA.push(Y[B.id]), Y[B.id];
  } else
    return console.warn("无效全局数据添加"), !1;
}, $r = function(A, I) {
  let g = null;
  if (typeof A == "string" && EA(I) && Y[A] ? (g = A, Y[g] = I) : EA(A) && typeof A.id == "string" && Y[A.id] && (g = A.id, Y[g] = A), g) {
    let B = MA.findIndex((Q) => Q.id == g);
    if (B > -1)
      return MA[B] = Y[g];
  }
  return !1;
}, Aa = function(A) {
  Y[A] && (rA(MA, "id", A), delete Y[A]);
}, Ia = function(A) {
  return Y[A] || null;
}, xQ = function() {
  return MA;
}, Lg = function() {
  Object.keys(Y).forEach((I) => {
    delete Y[I];
  }), MA.splice(0, MA.length);
}, ga = Y, Ba = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GData: ga,
  addGData: ig,
  clearGlobal: Lg,
  default: Y,
  delGData: Aa,
  editGData: $r,
  getGData: Ia,
  getGDataList: xQ
}, Symbol.toStringTag, { value: "Module" })), eA = {}, OA = m([]), Qa = function(A) {
  let I = Object.assign({
    id: "PD_" + $(10),
    uptime: new Date().getTime()
  }, A);
  return I.name && !I.title && (I.title = I.name), m(I);
}, vQ = function(A) {
  if (EA(A)) {
    if (A.id && eA[A.id])
      return console.warn("插件存在"), null;
    if (A.url) {
      let I = Qa(A);
      return eA[I.id] = I, OA.push(I), eA[I.id];
    }
  }
  return console.warn("插件添加失败", A), null;
}, ea = function(A) {
  if (eA[A])
    rA(OA, "id", A), delete eA[A];
  else if (A) {
    let g = Object.values(eA).find((B) => B.url == A);
    g && eA[g.id] && (rA(OA, "id", g.id), delete eA[g.id]);
  }
}, Ca = function(A) {
  return eA[A] || null;
}, qQ = function() {
  return OA;
}, xg = function() {
  Object.keys(eA).forEach((I) => {
    delete eA[I];
  }), OA.splice(0, OA.length);
}, Ea = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addPlugin: vQ,
  clearPlugin: xg,
  delPlugin: ea,
  getPlugin: Ca,
  getPluginList: qQ
}, Symbol.toStringTag, { value: "Module" })), ta = "data:application/wasm;base64,AGFzbQEAAAABzAEdYAJ/fwF/YAN/f38Bf2ACf38AYAF/AX9gA39/fwBgAX8AYAV/f39/fwBgBH9/f38AYAABf2AFf39/f38Bf2AGf39/f39/AGAEf39/fwF/YAF/AX5gAABgBn9/f39/fwF/YAl/f39/f39+fn4AYAV/f35/fwBgBX9/fX9/AGADf398AGAFf398f38AYAR/fn9/AGAEf31/fwBgBH98f38AYAd/f39/f39/AX9gA398fwF/YAR/fH9/AX9gAn5/AX9gA35/fwF/YAF8AX8CvwsfES4vcmljaF93YXNtX2JnLmpzGl9fd2JpbmRnZW5fb2JqZWN0X2Ryb3BfcmVmAAURLi9yaWNoX3dhc21fYmcuanMVX193YmluZGdlbl9udW1iZXJfbmV3ABwRLi9yaWNoX3dhc21fYmcuanMUX193YmluZGdlbl9pc19vYmplY3QAAxEuL3JpY2hfd2FzbV9iZy5qcxlfX3diaW5kZ2VuX2pzdmFsX2xvb3NlX2VxAAARLi9yaWNoX3dhc21fYmcuanMWX193YmluZGdlbl9ib29sZWFuX2dldAADES4vcmljaF93YXNtX2JnLmpzFV9fd2JpbmRnZW5fbnVtYmVyX2dldAACES4vcmljaF93YXNtX2JnLmpzFV9fd2JpbmRnZW5fc3RyaW5nX2dldAACES4vcmljaF93YXNtX2JnLmpzFF9fd2JpbmRnZW5fZXJyb3JfbmV3AAARLi9yaWNoX3dhc21fYmcuanMaX193YmdfZ2V0XzI3ZmUzZGFjMWM0ZDAyMjQAABEuL3JpY2hfd2FzbV9iZy5qcx1fX3diZ19sZW5ndGhfZTQ5OGZiYzI0ZjljMWQ0ZgADES4vcmljaF93YXNtX2JnLmpzGl9fd2JnX25ld19iNTI1ZGUxN2Y0NGE4OTQzAAgRLi9yaWNoX3dhc21fYmcuanMWX193YmluZGdlbl9pc19mdW5jdGlvbgADES4vcmljaF93YXNtX2JnLmpzG19fd2JnX25leHRfYjdkNTMwYzA0ZmQ4YjIxNwADES4vcmljaF93YXNtX2JnLmpzG19fd2JnX25leHRfODg1NjBlYzA2YTA5NGRlYQADES4vcmljaF93YXNtX2JnLmpzG19fd2JnX2RvbmVfMWViZWMwM2JiZDkxOTg0MwADES4vcmljaF93YXNtX2JnLmpzHF9fd2JnX3ZhbHVlXzZhYzhkYTVjYzViM2VmZGEAAxEuL3JpY2hfd2FzbV9iZy5qcx9fX3diZ19pdGVyYXRvcl81NWYxMTQ0NDYyMjFhYTVhAAgRLi9yaWNoX3dhc21fYmcuanMaX193YmdfZ2V0X2JhZjQ4NTVmOWE5ODYxODYAABEuL3JpY2hfd2FzbV9iZy5qcxtfX3diZ19jYWxsXzk1ZDFlYTQ4OGQwM2U0ZTgAABEuL3JpY2hfd2FzbV9iZy5qcxpfX3diZ19zZXRfMTcyMjRiYzU0OGRkMWQ3YgAEES4vcmljaF93YXNtX2JnLmpzHl9fd2JnX2lzQXJyYXlfMzlkMjg5OTdiZjZiOTZiNAADES4vcmljaF93YXNtX2JnLmpzLV9fd2JnX2luc3RhbmNlb2ZfQXJyYXlCdWZmZXJfYTY5ZjAyZWU0YzRmNTA2NQADES4vcmljaF93YXNtX2JnLmpzJF9fd2JnX2lzU2FmZUludGVnZXJfOGM0Nzg5MDI5ZTg4NTE1OQADES4vcmljaF93YXNtX2JnLmpzHV9fd2JnX2J1ZmZlcl9jZjY1YzA3ZGUzNGI5YTA4AAMRLi9yaWNoX3dhc21fYmcuanMaX193YmdfbmV3XzUzN2I3MzQxY2U5MGJiMzEAAxEuL3JpY2hfd2FzbV9iZy5qcxpfX3diZ19zZXRfMTc0OTllOGFhNDAwM2ViZAAEES4vcmljaF93YXNtX2JnLmpzHV9fd2JnX2xlbmd0aF8yN2EyYWZlOGFiNDJiMDlmAAMRLi9yaWNoX3dhc21fYmcuanMsX193YmdfaW5zdGFuY2VvZl9VaW50OEFycmF5XzAxY2ViZTc5Y2E2MDZjY2EAAxEuL3JpY2hfd2FzbV9iZy5qcxdfX3diaW5kZ2VuX2RlYnVnX3N0cmluZwACES4vcmljaF93YXNtX2JnLmpzEF9fd2JpbmRnZW5fdGhyb3cAAhEuL3JpY2hfd2FzbV9iZy5qcxFfX3diaW5kZ2VuX21lbW9yeQAIA4oCiAIEBgMEBgAABQYAAQULGQEEAgQOBQIYAgEFBQUBAAQBAgMFBQQFAgQaAQIECgAFDwoFABcDCQAAAgEbBAAEAAECBQAIAAUCBAQCAgQCAgAAAAMEAgICBAQCAgAGBAcAAQEHBwIHAgACAgAA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akECNgIAIAJBLGpBATYCACACQZSJwAA2AiAgAkEANgIYIAJBHTYCFCACIAJBEGo2AiggAiACQQhqNgIQIAEgAkEYahCpAQwNCyACIAApAgQ3AwggAkEkakEBNgIAIAJBLGpBATYCACACQYCJwAA2AiAgAkEANgIYIAJBHjYCFCACIAJBEGo2AiggAiACQQhqNgIQIAEgAkEYahCpAQwMCyACQSRqQQE2AgAgAkEsakEANgIAIAJB8IjAADYCICACQaCHwAA2AiggAkEANgIYIAEgAkEYahCpAQwLCyACQSRqQQE2AgAgAkEsakEANgIAIAJB3IjAADYCICACQaCHwAA2AiggAkEANgIYIAEgAkEYahCpAQwKCyACQSRqQQE2AgAgAkEsakEANgIAIAJByIjAADYCICACQaCHwAA2AiggAkEANgIYIAEgAkEYahCpAQwJCyACQSRqQQE2AgAgAkEsakEANgIAIAJBtIjAADYCICACQaCHwAA2AiggAkEANgIYIAEgAkEYahCpAQwICyACQSRqQQE2AgAgAkEsakEANgIAIAJBnIjAADYCICACQaCHwAA2AiggAkEANgIYIAEgAkEYahCpAQwHCyACQSRqQQE2AgAgAkEsakEANgIAIAJBjIjAADYCICACQaCHwAA2AiggAkEANgIYIAEgAkEYahCpAQwGCyACQSRqQQE2AgAgAkEsakEANgIAIAJBgIjAADYCICACQaCHwAA2AiggAkEANgIYIAEgAkEYahCpAQwFCyACQSRqQQE2AgAgAkEsakEANgIAIAJB9IfAADYCICACQaCHwAA2AiggAkEANgIYIAEgAkEYahCpAQwECyACQSRqQQE2AgAgAkEsakEANgIAIAJB4IfAADYCICACQaCHwAA2AiggAkEANgIYIAEgAkEYahCpAQwDCyACQSRqQQE2AgAgAkEsakEANgIAIAJByIfAADYCICACQaCHwAA2AiggAkEANgIYIAEgAkEYahCpAQwCCyACQSRqQQE2AgAgAkEsakEANgIAIAJBsIfAADYCICACQaCHwAA2AiggAkEANgIYIAEgAkEYahCpAQwBCyABIAAoAgQgAEEIaigCABDxAQsgAkEwaiQAC/AHAQh/AkACQCAAQQNqQXxxIgIgAGsiBSABSyAFQQRLcg0AIAEgBWsiB0EESQ0AIAdBA3Eh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QQMgBEEBSxtB/wFxQQFrDgMCAQADCyADQSBqIANB4ABqIANBD2oQIgJAIAMoAiBFBEAgA0HQAGogA0HgAGogA0EPahAfDAELIANB2ABqIANBKGooAgA2AgAgAyADKQMgNwNQCyADIAMoAlAgAygCVCADLwFYQQAgA0EgahBOIAMoAgQhBSADKAIADAMLIANBAjsBICADQQE2AiggA0Hdq8AANgIkIANBIGoMAgsgA0EDNgIoIANB3qvAADYCJCADQQI7ASAgA0EgagwBCyADQQM2AiggA0Hhq8AANgIkIANBAjsBICADQSBqCyEEIANB3ABqIAU2AgAgAyAENgJYIAMgBjYCVCADIAI2AlAgACADQdAAahA7IANBgAFqJAAL5QQBDn8jAEHwAGsiAiQAIAEoAggiBUEBcSABKAIEIQkgASgCACEKIAEoAgwhBCAFQQJPBEAgBUEBdiENIAJBIGohCwNAIAJBEGogCiAGQQV0IgNqIgFBIGoiByABEGUgAkEwaiAHIAEQZSACQdAAaiAAIAJBMGoQPCACQcgAaiIHIAJB6ABqKQMANwMAIAJBQGsiDiACQeAAaikDADcDACACQThqIg8gAkHYAGopAwA3AwAgAiACKQNQNwMwIAMgCWohA0EAIQEDQCACQTBqIAFqIgggCC0AACABIARqLQAAczoAACABQQFqIgFBEEcNAAtBACEBA0AgASACakFAayIIIAgtAAAgAkEQaiABai0AAHM6AAAgAUEBaiIBQRBHDQALIAMgAikDMDcAACADQRhqIAcpAwA3AAAgA0EQaiAOKQMANwAAIANBCGogDykDADcAACAEQQhqIAtBCGopAAA3AAAgBCALKQAANwAAIA0gBkEBaiIGRw0ACwsEQCAJIAVB/v///wBxQQR0IgFqIQMgAiABIApqIgFBEGoiBSABEJsBIAJBEGogBSABEJsBIAJBMGoQ0gEgAkE4aiACQRhqIgEpAwA3AwAgAiACKQMQNwMwIAJB0ABqIAAgAkEwahA8IAEgAkHYAGopAwA3AwAgAiACKQNQNwMQQQAhAQNAIAJBEGogAWoiACAALQAAIAEgBGotAABzOgAAIAFBAWoiAUEQRw0ACyADIAIpAxA3AAAgA0EIaiACQRhqKQMANwAAIAQgAikDADcAACAEQQhqIAJBCGopAwA3AAALIAJB8ABqJAAL/AQBCH8jAEEQayIHJAACfyACKAIEIgQEQEEBIAAgAigCACAEIAEoAgwRAQANARoLQQAgAkEMaigCACIDRQ0AGiACKAIIIgQgA0EMbGohCCAHQQxqIQkDQAJAAkACQAJAIAQvAQBBAWsOAgIBAAsCQCAEKAIEIgJBwQBPBEAgAUEMaigCACEDA0BBASAAQaixwABBwAAgAxEBAA0HGiACQUBqIgJBwABLDQALDAELIAJFDQMLAkAgAkE/TQRAIAJBqLHAAGosAABBv39MDQELIABBqLHAACACIAFBDGooAgARAQBFDQNBAQwFC0GoscAAQcAAQQAgAkHoscAAEPUBAAsgACAEKAIEIARBCGooAgAgAUEMaigCABEBAEUNAUEBDAMLIAQvAQIhAiAJQQA6AAAgB0EANgIIAkACQAJ/AkACQAJAIAQvAQBBAWsOAgEAAgsgBEEIagwCCyAELwECIgNB6AdPBEBBBEEFIANBkM4ASRshBQwDC0EBIQUgA0EKSQ0CQQJBAyADQeQASRshBQwCCyAEQQRqCygCACIFQQZJBEAgBQ0BQQAhBQwCCyAFQQVBmLHAABCHAgALIAdBCGogBWohBgJAIAVBAXFFBEAgAiEDDAELIAZBf2oiBiACIAJBCm4iA0EKbGtBMHI6AAALIAVBAUYNACAGQX5qIQIDQCACIANB//8DcSIGQQpuIgpBCnBBMHI6AAAgAkEBaiADIApBCmxrQTByOgAAIAZB5ABuIQMgAiAHQQhqRiACQX5qIQJFDQALCyAAIAdBCGogBSABQQxqKAIAEQEARQ0AQQEMAgsgBEEMaiIEIAhHDQALQQALIAdBEGokAAuWBQEOfyAAIAAoAhwiA0EWd0G//vz5A3EgA0Eed0HAgYOGfHFyIANzIgQgACgCECICQRZ3Qb/+/PkDcSACQR53QcCBg4Z8cXIgAnMiCyAAKAIUIgFzIgZzIgUgAyAAKAIYIgNBFndBv/78+QNxIANBHndBwIGDhnxxciADcyIHcyIIcyAFQQx3QY+evPgAcSAFQRR3QfDhw4d/cXJzNgIcIAAgBCAAKAIAIgVzIgwgAyABIAFBFndBv/78+QNxIAFBHndBwIGDhnxxcnMiCXMiAyAFQRZ3Qb/+/PkDcSAFQR53QcCBg4Z8cXIgBXMiBXMiAXMgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyczYCACAAIAcgAiAAKAIMIgFBFndBv/78+QNxIAFBHndBwIGDhnxxciABcyIHcyAEcyIKcyICIANzIAJBDHdBj568+ABxIAJBFHdB8OHDh39xcnM2AhggACAGIAEgACgCCCICQRZ3Qb/+/PkDcSACQR53QcCBg4Z8cXIgAnMiBnMgBHMiDSAIIAlzcyIBcyABQQx3QY+evPgAcSABQRR3QfDhw4d/cXJzNgIUIAAgCiADIAhzIgkgCyACIAAoAgQiAUEWd0G//vz5A3EgAUEed0HAgYOGfHFyIAFzIgpzIg5zcyICcyACQQx3QY+evPgAcSACQRR3QfDhw4d/cXJzNgIQIAAgASAFcyAEcyICIAMgB3NzIgQgDXMgBEEMd0GPnrz4AHEgBEEUd0Hw4cOHf3FyczYCDCAAIAYgCHMgDHMiBCAOcyAEQQx3QY+evPgAcSAEQRR3QfDhw4d/cXJzNgIIIAAgCSAKcyIAIAJzIABBDHdBj568+ABxIABBFHdB8OHDh39xcnM2AgQLhgUBDn8gACAAKAIcIgNBEndBg4aMGHEgA0Ead0H8+fNncXIgA3MiBCAAKAIQIgJBEndBg4aMGHEgAkEad0H8+fNncXIgAnMiCyAAKAIUIgFzIgZzIgUgAyAAKAIYIgNBEndBg4aMGHEgA0Ead0H8+fNncXIgA3MiB3MiCHMgBUEMd0GPnrz4AHEgBUEUd0Hw4cOHf3FyczYCHCAAIAQgACgCACIFcyIMIAMgASABQRJ3QYOGjBhxIAFBGndB/PnzZ3FycyIJcyIDIAVBEndBg4aMGHEgBUEad0H8+fNncXIgBXMiBXMiAXMgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyczYCACAAIAcgAiAAKAIMIgFBEndBg4aMGHEgAUEad0H8+fNncXIgAXMiB3MgBHMiCnMiAiADcyACQQx3QY+evPgAcSACQRR3QfDhw4d/cXJzNgIYIAAgBiABIAAoAggiAkESd0GDhowYcSACQRp3Qfz582dxciACcyIGcyAEcyINIAggCXNzIgFzIAFBDHdBj568+ABxIAFBFHdB8OHDh39xcnM2AhQgACAKIAMgCHMiCSALIAIgACgCBCIBQRJ3QYOGjBhxIAFBGndB/PnzZ3FyIAFzIgpzIg5zcyICcyACQQx3QY+evPgAcSACQRR3QfDhw4d/cXJzNgIQIAAgASAFcyAEcyICIAMgB3NzIgQgDXMgBEEMd0GPnrz4AHEgBEEUd0Hw4cOHf3FyczYCDCAAIAYgCHMgDHMiBCAOcyAEQQx3QY+evPgAcSAEQRR3QfDhw4d/cXJzNgIIIAAgCSAKcyIAIAJzIABBDHdBj568+ABxIABBFHdB8OHDh39xcnM2AgQLoQQBG38gACAAKAIcIgEgACgCBCICcyIJIAAoAhAiBCAAKAIIIgZzIgtzIg4gACgCDHMiBSAGcyIDIA5xIhIgBSAAKAIYIgxzIgdzIAMgACgCACIFcyIWIAIgDCAAKAIUcyIIIAVzIgJzIg8gASAGcyIMcyIXcXMgAyAIcyINIAcgASAEcyIQcyIGcyIYIAtxIAYgEHEiCnMiB3MiEyACIA9xIAYgCHMiCCAJcnMgB3MiB3EiESAMIA1xIApzIgogEiACIARzIhIgBXEgDHMgDXNzcyIEcyAKIAUgBnMiCiABIAJzIhlxIAggCUF/c3EgAXNzcyIBIAdzcSIUIBFzIAFxIhUgB3MiByADcSIaIAUgASAUcyIFcXMiFCAEIAEgEXMiAyAEIBNzIgRxcyIBIApxcyADIBVzIAFxIARzIgMgAXMiESAIcSIKcyITIAMgD3FzIAsgAyAFIAdzIgRzIgsgASAFcyIIcyIPcSAIIBBxIhBzIhVzIhsgCiACIANxcyIDIA8gGHFzIgIgCyANcSAJIBFxIgkgFHNzcyINczYCBCAAIAkgG3M2AgAgACAVIAQgF3FzIgkgByAOcXMiDiACIAYgCHFzIgJzNgIcIAAgDSABIBlxcyIGIAsgDHEgEHMgAnNzNgIUIAAgBCAWcSAacyADcyAOcyIBNgIQIAAgCSAFIBJxcyAGczYCCCAAIAEgAnM2AhggACABIBNzNgIMC/kEAQp/IwBBMGsiAyQAIANBAzoAKCADQoCAgICABDcDICADQQA2AhggA0EANgIQIAMgATYCDCADIAA2AggCfwJAAkAgAigCACIKRQRAIAJBFGooAgAiAEUNASACKAIQIQEgAEEDdCEFIABBf2pB/////wFxQQFqIQcgAigCCCEAA0AgAEEEaigCACIEBEAgAygCCCAAKAIAIAQgAygCDCgCDBEBAA0ECyABKAIAIANBCGogAUEEaigCABEAAA0DIAFBCGohASAAQQhqIQAgBUF4aiIFDQALDAELIAIoAgQiAEUNACAAQQV0IQsgAEF/akH///8/cUEBaiEHIAIoAgghAANAIABBBGooAgAiAQRAIAMoAgggACgCACABIAMoAgwoAgwRAQANAwsgAyAFIApqIgRBHGotAAA6ACggAyAEQRRqKQIANwMgIARBEGooAgAhBiACKAIQIQhBACEJQQAhAQJAAkACQCAEQQxqKAIAQQFrDgIAAgELIAZBA3QgCGoiDEEEaigCAEHEAEcNASAMKAIAKAIAIQYLQQEhAQsgAyAGNgIUIAMgATYCECAEQQhqKAIAIQECQAJAAkAgBEEEaigCAEEBaw4CAAIBCyABQQN0IAhqIgZBBGooAgBBxABHDQEgBigCACgCACEBC0EBIQkLIAMgATYCHCADIAk2AhggCCAEKAIAQQN0aiIBKAIAIANBCGogASgCBBEAAA0CIABBCGohACALIAVBIGoiBUcNAAsLIAcgAkEMaigCAEkEQCADKAIIIAIoAgggB0EDdGoiACgCACAAKAIEIAMoAgwoAgwRAQANAQtBAAwBC0EBCyADQTBqJAAL5AQBCX8jAEEQayIEJAACQAJAAn8CQCAAKAIIQQFGBEAgAEEMaigCACEHIARBDGogAUEMaigCACIFNgIAIAQgASgCCCICNgIIIAQgASgCBCIDNgIEIAQgASgCACIBNgIAIAAtACAhCSAAKAIcIQogAC0AGEEIcQ0BIAohCCAJIQYgAwwCCyAAKAIAIABBBGooAgAgARA2IQIMAwsgACgCACABIAMgACgCBCgCDBEBAA0BQQEhBiAAQQE6ACBBMCEIIABBMDYCHCAEQQA2AgQgBEHkk8AANgIAQQAgByADayIDIAMgB0sbIQdBAAshASAFBEAgBUEMbCEDA0ACfwJAAkACQCACLwEAQQFrDgICAQALIAJBBGooAgAMAgsgAkEIaigCAAwBCyACQQJqLwEAIgVB6AdPBEBBBEEFIAVBkM4ASRsMAQtBASAFQQpJDQAaQQJBAyAFQeQASRsLIQUgAkEMaiECIAEgBWohASADQXRqIgMNAAsLAn8CQCAHIAFLBEAgByABayIBIQMCQAJAAkAgBkEDcSICQQFrDgMAAQACC0EAIQMgASECDAELIAFBAXYhAiABQQFqQQF2IQMLIAJBAWohAiAAQQRqKAIAIQEgACgCACEGA0AgAkF/aiICRQ0CIAYgCCABKAIQEQAARQ0ACwwDCyAAKAIAIABBBGooAgAgBBA2DAELIAYgASAEEDYNAUEAIQIDQEEAIAIgA0YNARogAkEBaiECIAYgCCABKAIQEQAARQ0ACyACQX9qIANJCyECIAAgCToAICAAIAo2AhwMAQtBASECCyAEQRBqJAAgAgvBBAEIfyMAQSBrIgMkACADQRhqQgA3AwAgA0EQakIANwMAIANBCGpCADcDACADQgA3AwAgAyACIAJBEGoQSSABQcACaiEEQQAhAgNAIAIgA2oiBiAGKAIAIAIgBGooAgBzNgIAIAJBBGoiAkEgRw0ACyADEDJBACECA0AgAiADaiIEIAQoAgAiBEEEdiAEc0GAnoD4AHEiBiAEcyAGQQR0czYCACACQQRqIgJBIEcNAAsgAUHAAWohBiABQeABaiEIIAFBgAJqIQkgAUGgAmohCkHIACEEAkADQEEAIQIDQCACIANqIgUgBSgCACACIApqKAIAczYCACACQQRqIgJBIEcNAAsgAxA3IAMQMiAEQQhGBEBBACECA0AgAiADaiIEIAQoAgAgASACaigCAHM2AgAgAkEEaiICQSBHDQALIAAgAxBIIANBIGokAA8LQQAhAgNAIAIgA2oiBSAFKAIAIAIgCWooAgBzNgIAIAJBBGoiAkEgRw0ACyAEQXBqIQUgAxBPIAMQMkEAIQIDQCACIANqIgcgBygCACACIAhqKAIAczYCACACQQRqIgJBIEcNAAsgAxA4IAMQMiAFIARBaGoiB0kNAUEAIQIDQCACIANqIgUgBSgCACACIAZqKAIAczYCACACQQRqIgJBIEcNAAsgBkGAf2ohBiAIQYB/aiEIIAlBgH9qIQkgCkGAf2ohCiADEEMgAxAyIARBYGoiBEF4Rw0AC0F4IAdB6IzAABCIAgALIAcgBUH4jMAAEIgCAAuoBAIFfwF8IwBBkAFrIgMkAAJAIAAoAgAiBEGBARADBEBBByEEQQAhAAwBC0EBQQIgBBAEIgVBAUYbQQAgBRsiBUECRwRAQQAhAEEAIQQMAQsgA0EoaiAEEAUgA0EYaiADKAIoIAMrAzAQ6wEgAygCGARAQQMhBCADKwMgIQhBACEADAELIANBEGogBBAGAkACQCADKAIQIgVFBEAgA0EANgJcDAELIAMoAhQhBCADIAU2AnwgAyAENgKAASADIAQ2AnggA0EIaiADQfgAahDMASADQdgAaiADKAIIIAMoAgwQ7AEgAygCXEUNACADQUBrIANB4ABqKAIAIgU2AgAgAyADKQNYNwM4QQEhAEEFIQQgAygCPCEHDAELIANB6ABqIAAQhgECfyADKAJsIgYEQCADQdAAaiADQfAAaigCACIFNgIAIAMgAykDaDcDSCADKAJMIQdBBgwBCyADQRE2AkwgAyAANgJIIANBATYCjAEgA0EBNgKEASADQZiFwAA2AoABIANBADYCeCADIANByABqNgKIASADQThqIANB+ABqEEQgAygCQCEFIAMoAjwhB0ERCyEEIAZFIQAgBkEARyEGIAMoAlxFDQAgA0HYAGoQ5gELIAWtvyEICyADIAg5A4ABIAMgBzYCfCADIAU6AHkgAyAEOgB4IANB+ABqIAEgAhCeASAGBEAgA0HIAGoQ5gELIAAEQCADQThqEOYBCyADQZABaiQAC9UEAQR/IAAgARCfAiECAkACQAJAIAAQlgINACAAKAIAIQMCQCAAEIECRQRAIAEgA2ohASAAIAMQoAIiAEHc0MAAKAIARw0BIAIoAgRBA3FBA0cNAkHU0MAAIAE2AgAgACABIAIQ2AEPCyABIANqQRBqIQAMAgsgA0GAAk8EQCAAEF8MAQsgAEEMaigCACIEIABBCGooAgAiBUcEQCAFIAQ2AgwgBCAFNgIIDAELQczQwABBzNDAACgCAEF+IANBA3Z3cTYCAAsgAhD7AQRAIAAgASACENgBDAILAkBB4NDAACgCACACRwRAIAJB3NDAACgCAEcNAUHc0MAAIAA2AgBB1NDAAEHU0MAAKAIAIAFqIgE2AgAgACABEOkBDwtB4NDAACAANgIAQdjQwABB2NDAACgCACABaiIBNgIAIAAgAUEBcjYCBCAAQdzQwAAoAgBHDQFB1NDAAEEANgIAQdzQwABBADYCAA8LIAIQlQIiAyABaiEBAkAgA0GAAk8EQCACEF8MAQsgAkEMaigCACIEIAJBCGooAgAiAkcEQCACIAQ2AgwgBCACNgIIDAELQczQwABBzNDAACgCAEF+IANBA3Z3cTYCAAsgACABEOkBIABB3NDAACgCAEcNAUHU0MAAIAE2AgALDwsgAUGAAk8EQCAAIAEQXg8LIAFBeHFBxM7AAGohAgJ/QczQwAAoAgAiA0EBIAFBA3Z0IgFxBEAgAigCCAwBC0HM0MAAIAEgA3I2AgAgAgshASACIAA2AgggASAANgIMIAAgAjYCDCAAIAE2AggL+gMBCX8jAEEwayIBJAAgACgCBCEFIAAoAgghAyABQQA2AhggAUKAgICAEDcDEAJAAkACQAJAAkAgA0HgA00EQCABQSBqIAUgAxBFIAFBEGoQ5gEgAUEYaiABQShqKAIANgIAIAEgASkDIDcDEAwBCyADIANB4ANuIgRB4ANsayAEIQYDQCACQeADaiIIIANLDQIgAUEgaiACIAVqQeADEEUgASgCJCEJIAFBEGogASgCKCICENsBIAEoAhQgASgCGGogCSACEJwCGiABQQA2AiggASACIAEoAhhqNgIYIAFBIGoQ5gEgCCECIAZBf2oiBg0AC0UNACAAKAIIIgIgBEHgA2wiBEkNAiACIANLDQMgAUEgaiAEIAVqIAIgBGsQRSABKAIkIQQgAUEQaiABKAIoIgIQ2wEgASgCFCABKAIYaiAEIAIQnAIaIAFBADYCKCABIAIgASgCGGo2AhggAUEgahDmAQsgAUEAOwEgIAFBADoAIiABQQhqIAFBIGogAUEQahBpIAEoAgwhAiABKAIIDQMgAUEQahDmASAAEOYBIAFBMGokACACDwsgAkHgA2ogA0HYgMAAEIcCAAsgBCACQfiAwAAQiAIACyACIANB+IDAABCHAgALIAEgAjYCIEGAgMAAQSsgAUEgakG8gMAAQYiBwAAQjwEAC8UEAQd/IAAgACgCHCIEQRZ3Qb/+/PkDcSAEQR53QcCBg4Z8cXIiAiAAKAIYIgFBFndBv/78+QNxIAFBHndBwIGDhnxxciIDIAFzIgFzIAIgBHMiBEEMd0GPnrz4AHEgBEEUd0Hw4cOHf3FyczYCHCAAIAFBDHdBj568+ABxIAFBFHdB8OHDh39xciADIAAoAhQiAUEWd0G//vz5A3EgAUEed0HAgYOGfHFyIgIgAXMiAXNzNgIYIAAgAUEMd0GPnrz4AHEgAUEUd0Hw4cOHf3FyIAIgACgCECIBQRZ3Qb/+/PkDcSABQR53QcCBg4Z8cXIiAyABcyIBc3M2AhQgACABQQx3QY+evPgAcSABQRR3QfDhw4d/cXIgAyAAKAIMIgFBFndBv/78+QNxIAFBHndBwIGDhnxxciIFIAFzIgFzIARzczYCECAAIAAoAggiAkEWd0G//vz5A3EgAkEed0HAgYOGfHFyIgYgACgCBCIDQRZ3Qb/+/PkDcSADQR53QcCBg4Z8cXIiByADcyIDcyACIAZzIgJBDHdBj568+ABxIAJBFHdB8OHDh39xcnM2AgggACABQQx3QY+evPgAcSABQRR3QfDhw4d/cXIgAiAFc3MgBHM2AgwgACADQQx3QY+evPgAcSADQRR3QfDhw4d/cXIgByAAKAIAIgFBFndBv/78+QNxIAFBHndBwIGDhnxxciICIAFzIgFzcyAEczYCBCAAIAFBDHdBj568+ABxIAFBFHdB8OHDh39xciACcyAEczYCAAu1BAEHfyAAIAAoAhwiBEESd0GDhowYcSAEQRp3Qfz582dxciICIAAoAhgiAUESd0GDhowYcSABQRp3Qfz582dxciIDIAFzIgFzIAIgBHMiBEEMd0GPnrz4AHEgBEEUd0Hw4cOHf3FyczYCHCAAIAFBDHdBj568+ABxIAFBFHdB8OHDh39xciADIAAoAhQiAUESd0GDhowYcSABQRp3Qfz582dxciICIAFzIgFzczYCGCAAIAFBDHdBj568+ABxIAFBFHdB8OHDh39xciACIAAoAhAiAUESd0GDhowYcSABQRp3Qfz582dxciIDIAFzIgFzczYCFCAAIAFBDHdBj568+ABxIAFBFHdB8OHDh39xciADIAAoAgwiAUESd0GDhowYcSABQRp3Qfz582dxciIFIAFzIgFzIARzczYCECAAIAAoAggiAkESd0GDhowYcSACQRp3Qfz582dxciIGIAAoAgQiA0ESd0GDhowYcSADQRp3Qfz582dxciIHIANzIgNzIAIgBnMiAkEMd0GPnrz4AHEgAkEUd0Hw4cOHf3FyczYCCCAAIAFBDHdBj568+ABxIAFBFHdB8OHDh39xciACIAVzcyAEczYCDCAAIANBDHdBj568+ABxIANBFHdB8OHDh39xciAHIAAoAgAiAUESd0GDhowYcSABQRp3Qfz582dxciICIAFzIgFzcyAEczYCBCAAIAFBDHdBj568+ABxIAFBFHdB8OHDh39xciACcyAEczYCAAuMBAEHfyMAQSBrIgMkACADQRhqQgA3AwAgA0EQakIANwMAIANBCGpCADcDACADQgA3AwAgAyACIAJBEGoQ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QfCRwAAoAgARAAANASACKAIYQcuuwABBAiACKAIcKAIMEQEAIQQMAQsgASADQfCRwAAoAgARAAAhBAsgAEEBOgAFIAAgBDoABCACQUBrJAAL/QEBB38jAEHQAGsiAyQAIANBADYCICABIAJrIghBBHYiAUECIAFBAkkbIgYEQCADIQEgBiEHIAIhBQNAIANBKGogBUEQaiIJIAUQmwEgAUEIaiADQTBqKQMANwIAIAEgAykDKDcCACADIAMoAiBBAWoiBDYCICABQRBqIQEgCSEFIAdBf2oiBw0ACwsgCEEhTwRAIANBQGsgAiAGQQR0aiIBQRBqIAEQmwELIARBAk8EQCAAIAMpAwA3AAAgAEEYaiADQRhqKQMANwAAIABBEGogA0EQaikDADcAACAAQQhqIANBCGopAwA3AAAgA0HQAGokAA8LIARBAhCUAQALkAIBAX8jAEEwayIDJAAgAyACOgAUIAMgATYCECADQQhqQQAQrQEgA0EANgIgIAMgAykDCDcDGCADQShqIANBEGoQkAECQAJAAkAgAy0AKEUEQANAIAMtAClFDQIgAy0AKiECIAMoAiAiASADKAIYRgR/IANBGGogARCzASADKAIgBSABCyADKAIcaiACOgAAIAMgAygCIEEBajYCICADQShqIANBEGoQkAEgAy0AKEUNAAsLIABBADYCBCAAIAMoAiw2AgAgA0EYahDmASADKAIQIgJBhAFJDQIMAQsgACADKQMYNwIAIABBCGogA0EgaigCADYCACADKAIQIgJBgwFNDQELIAIQAAsgA0EwaiQAC50CAQR/IwBBIGsiAiQAEBAhBCABKAIAIgMgBBARIQEgAkEQahDRASACKAIUIAEgAigCECIFGyEBAkACQAJAAkACQCAFRQRAIAEQC0EBRg0BIABBAjoABCABQYQBSQ0DDAILIABBAzoABCAAIAE2AgAMAgsgASADEBIhAyACQQhqENEBIAIoAgwgAyACKAIIIgUbIQMCQAJAIAVFBEAgAiADNgIcIAJBHGoQxwENAiAAQQI6AAQgA0GEAUkNASADEAAMAQsgAEEDOgAEIAAgAzYCAAsgAUGEAU8NAQwCCyAAQQA6AAQgACADNgIAIAFBhAFPBEAgARAACyAEQYMBSw0CDAMLIAEQAAsgBEGDAU0NAQsgBBAACyACQSBqJAAL/QECCH8CfiMAQdAAayICJAAgASgCCCIGBEAgASgCDCEEIAEoAgQhByABKAIAIQgDQCACIAggBUEEdCIBaiIDQRBqIAMQmwEgASAHaiEDQQAhAQNAIAEgAmoiCSAJLQAAIAEgBGotAABzOgAAIAFBAWoiAUEQRw0ACyACQRBqENIBIAJBGGogAkEIaiIBKQMANwMAIAIgAikDADcDECACQTBqIAAgAkEQahBCIAEgAkE4aikDACIKNwMAIAIgAikDMCILNwMAIARBCGogCjcAACAEIAs3AAAgAyALNwAAIANBCGogCjcAACAGIAVBAWoiBUcNAAsLIAJB0ABqJAALkQIBBH8jAEEwayIDJAAgAigCBCEEIAIoAgghAhAKIQYgA0EgaiIFIAE2AgggBUEANgIEIAUgBjYCAAJ/AkACQCADKAIoBEAgA0EYaiADQShqKAIANgIAIAMgAykDIDcDEANAIAJFDQMgAkF/aiECIAMgBDYCICAEQQFqIQQgA0EIaiADQRBqIANBIGoQrAEgAygCCEUNAAsgAygCDCECIAMoAhAiAUGEAUkNASABEAAMAQsgAygCICECC0EBDAELIANBKGogA0EYaigCADYCACADIAMpAxA3AyAgAyADQSBqKAIANgIEIANBADYCACADKAIEIQIgAygCAAshASAAIAI2AgQgACABNgIAIANBMGokAAuLAgIDfwF+IwBBMGsiAiQAIAEoAgRFBEAgASgCDCEDIAJBEGoiBEEANgIAIAJCgICAgBA3AwggAiACQQhqNgIUIAJBKGogA0EQaikCADcDACACQSBqIANBCGopAgA3AwAgAiADKQIANwMYIAJBFGpBmI/AACACQRhqEDoaIAFBCGogBCgCADYCACABIAIpAwg3AgALIAEpAgAhBSABQoCAgIAQNwIAIAJBIGoiAyABQQhqIgEoAgA2AgAgAUEANgIAIAIgBTcDGEEMQQQQ9gEiAUUEQEEMQQQQmgIACyABIAIpAxg3AgAgAUEIaiADKAIANgIAIABB9JDAADYCBCAAIAE2AgAgAkEwaiQAC/wBAQN/IwBBMGsiAiQAIAJBEGogARCdASACQQhqIAIoAhQiA0GAICADQYAgSRtBACACKAIQGxCtASACQQA2AiAgAiACKQMINwMYIAJBKGogARCOAQJAAkAgAi0AKEUEQANAIAItAClF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CzYCAAutAQEBfwJAIAIEQAJ/AkACQAJAIAFBAE4EQCADKAIIRQ0CIAMoAgQiBA0BIAENAyACDAQLIABBCGpBADYCAAwFCyADKAIAIAQgAiABEO4BDAILIAENACACDAELIAEgAhD2AQsiAwRAIAAgAzYCBCAAQQhqIAE2AgAgAEEANgIADwsgACABNgIEIABBCGogAjYCAAwBCyAAIAE2AgQgAEEIakEANgIACyAAQQE2AgALqQEBA38jAEEwayICJAAgASgCBEUEQCABKAIMIQMgAkEQaiIEQQA2AgAgAkKAgICAEDcDCCACIAJBCGo2AhQgAkEoaiADQRBqKQIANwMAIAJBIGogA0EIaikCADcDACACIAMpAgA3AxggAkEUakGYj8AAIAJBGGoQOhogAUEIaiAEKAIANgIAIAEgAikDCDcCAAsgAEH0kMAANgIEIAAgATYCACACQTBqJAALmgEBAX8jAEEgayIEJAAgAAJ/QQAgAiADaiIDIAJJDQAaIAEoAgAhAiAEQRBqIAEQzQEgBCACQQF0IgIgAyACIANLGyICQQggAkEISxsiAiACQX9zQR92IARBEGoQfyAEKAIEIQMgBEEIaigCACAEKAIADQAaIAEgAjYCACABIAM2AgRBgYCAgHgLNgIEIAAgAzYCACAEQSBqJAALwgEDAX8CfgF8IwBBIGsiAiQAIAJBEGogASgCABAFIAIgAigCECACKwMYEOsBAkAgAigCAEUNACACKwMIIQUgASgCABAWRQ0AIAVEAAAAAAAA4MNmIQFCAEL///////////8AAn4gBZlEAAAAAAAA4ENjBEAgBbAMAQtCgICAgICAgICAfwtCgICAgICAgICAfyABGyAFRP///////99DZBsgBSAFYhshA0IBIQQLIAAgAzcDCCAAIAQ3AwAgAkEgaiQAC50BAQF/IwBBQGoiAiQAIAJCADcDOCACQThqIAAoAgAQHCACQRRqQQI2AgAgAkEcakEBNgIAIAIgAigCPCIANgIwIAIgAigCODYCLCACIAA2AiggAkEtNgIkIAJB1IvAADYCECACQQA2AgggAiACQShqNgIgIAIgAkEgajYCGCABIAJBCGoQqQEgAigCKARAIAIoAiwQJgsgAkFAayQAC5sBAgF/AX4jAEEwayICJAAgAkEIaiABEIMBAkACQCACKAIIQQFG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BkEYaiAGQQhqKAIAIgE2AgAgBiAGKQMAIgc3AxAgB6cgAUsEQCAGQRBqIAEQwQEgBigCGCEBCyAGKAIUIQIgACABNgIEIAAgAjYCACAGQSBqJAAPCxCSAgALewEBfyMAQTBrIgIkACACQeiBwAA2AgQgAiABNgIAIAJBFGpBAjYCACACQRxqQQI2AgAgAkEsakELNgIAIAJB8ITAADYCECACQQA2AgggAkEMNgIkIAIgADYCICACIAJBIGo2AhggAiACNgIoIAJBCGoQrwEgAkEwaiQAC3oBAn8gAUEHaiECIAAgAUECdGohAEEgIQECQAJAA0AgAkHYAE8NAiACQQhqQdgATw0BIAAgAWoiA0EcaiADQXxqKAIANgIAIAJBf2ohAiABQXxqIgENAAsPCyACQQhqQdgAQbiNwAAQlQEACyACQdgAQaiNwAAQlQEAC3oBAX8jAEEwayICJAAgAiABNgIEIAIgADYCACACQRRqQQI2AgAgAkEcakECNgIAIAJBLGpBLjYCACACQZSOwAA2AhAgAkEANgIIIAJBLjYCJCACIAJBIGo2AhggAiACQQRqNgIoIAIgAjYCICACQQhqQYiPwAAQxgEAC3cBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQRRqQQI2AgAgA0EcakECNgIAIANBLGpBLjYCACADQdyswAA2AhAgA0EANgIIIANBLjYCJCADIANBIGo2AhggAyADNgIoIAMgA0EEajYCICADQQhqIAIQxgEAC3cBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQRRqQQI2AgAgA0EcakECNgIAIANBLGpBLjYCACADQYizwAA2AhAgA0EANgIIIANBLjYCJCADIANBIGo2AhggAyADQQRqNgIoIAMgAzYCICADQQhqIAIQxgEAC3cBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQRRqQQI2AgAgA0EcakECNgIAIANBLGpBLjYCACADQaizwAA2AhAgA0EANgIIIANBLjYCJCADIANBIGo2AhggAyADQQRqNgIoIAMgAzYCICADQQhqIAIQxgEAC3cBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQRRqQQI2AgAgA0EcakECNgIAIANBLGpBLjYCACADQdyzwAA2AhAgA0EANgIIIANBLjYCJCADIANBIGo2AhggAyADQQRqNgIoIAMgAzYCICADQQhqIAIQxgEAC3cBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQRRqQQM2AgAgA0EcakECNgIAIANBLGpBLjYCACADQay0wAA2AhAgA0EANgIIIANBLjYCJCADIANBIGo2AhggAyADNgIoIAMgA0EEajYCICADQQhqIAIQxgEAC2kBAX8jAEEwayICJAAgAiABNgIoIAIgADYCJCACIAE2AiAgAkEIaiACQSBqEMwBIAJBEGogAigCCCACKAIMEOwBIAJBKGogAkEYaigCADYCACACIAIpAxA3AyAgAkEgahA/IAJBMGokAAtoAQJ/IwBBIGsiAyQAIANBADYCGAJAIAEgAmsiAUEQIAFBEEkiBBsiAUUNACADQQhqIAIgARCcAhogBA0AIAAgAykDCDcAACAAQQhqIANBEGopAwA3AAAgA0EgaiQADwsgAUEQEJQBAAtyAQN/IwBBIGsiAiQAAn9BASAAIAEQWg0AGiABKAIEIQMgASgCACEEIAJBADYCHCACQeSTwAA2AhggAkEBNgIUIAJBoKzAADYCECACQQA2AghBASAEIAMgAkEIahA6DQAaIABBBGogARBaCyACQSBqJAALaAECfyMAQSBrIgIkACACQRhqAn9BACABKAIIRQ0AGkEAIAEoAgQiAyABKAIAayIBIAEgA0sbCyIBNgIAIAJBATYCFCACIAE2AhAgAkEIaiACQRBqEMUBIAAgAikDCDcDACACQSBqJAALcgEBfyMAQTBrIgMkACADIAI2AgQgAyABNgIAIANBFGpBCzYCACADQQw2AgwgAyAANgIIIAMgAzYCECADQQI2AiwgA0ECNgIkIANB+IbAADYCICADQQA2AhggAyADQQhqNgIoIANBGGoQogEgA0EwaiQAC3wBA38gACAAEKECIgBBCBDtASAAayICEJ8CIQBB2NDAACABIAJrIgE2AgBB4NDAACAANgIAIAAgAUEBcjYCBEEIQQgQ7QEhAkEUQQgQ7QEhA0EQQQgQ7QEhBCAAIAEQnwIgBCADIAJBCGtqajYCBEHs0MAAQYCAgAE2AgALcgAjAEEwayIBJABB+MzAAC0AAARAIAFBFGpBAjYCACABQRxqQQE2AgAgAUGAkMAANgIQIAFBADYCCCABQS42AiQgASAANgIsIAEgAUEgajYCGCABIAFBLGo2AiAgAUEIakGokMAAEMYBAAsgAUEwaiQAC2EBAn8jAEEQayICJAAgACgCACIAQQhqKAIAIQMgAEEEaigCACEAIAIgARDUASADBEADQCACIAA2AgwgAiACQQxqEGQgAEEBaiEAIANBf2oiAw0ACwsgAhDPASACQRBqJAALaAEBfyMAQUBqIgEkACABQQA2AgggAUKAgICAEDcDACABQRBqIAEQ0wEgACABQRBqEKcBBEBBuIXAAEE3IAFBOGpB8IXAAEHMhsAAEI8BAAsgASgCBCABKAIIEAcgARDmASABQUBrJAALYwEBfyMAQSBrIgMkACADIAE2AgQgAyAANgIAIANBGGogAkEQaikCADcDACADQRBqIAJBCGopAgA3AwAgAyACKQIANwMIIANB/KzAACADQQRqQfyswAAgA0EIakG0lMAAEEoAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBgIXAACACQQhqEDogAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBmI/AACACQQhqEDogAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBzJHAACACQQhqEDogAkEgaiQAC1MBAn8jAEEgayICJAAgASgCBCEDIAEoAgAgAkEYaiAAQRBqKQIANwMAIAJBEGogAEEIaikCADcDACACIAApAgA3AwggAyACQQhqEDogAkEgaiQAC1kBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpB5LDAACACQQhqEDogAkEgaiQAC1MBAn8jAEEgayICJAAgACgCBCEDIAAoAgAgAkEYaiABQRBqKQIANwMAIAJBEGogAUEIaikCADcDACACIAEpAgA3AwggAyACQQhqEDogAkEgaiQAC1YBAX8jAEEgayICJAAgAiAANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBgIXAACACQQhqEDogAkEgaiQAC1YBAX8jAEEgayICJAAgAiAANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpB5LDAACACQQhqEDogAkEgaiQAC3UBA38jAEEQayIDJAAgASgCBCEFIAEoAggaIANBCGoiBCACKAIALQAAuBABNgIEIARBADYCACADKAIMIQIgAygCCCIERQRAIAEoAgAgBSACEBMgASABKAIEQQFqNgIECyAAIAQ2AgAgACACNgIEIANBEGokAAtIAQJ/AkAgAUUEQEEBIQIMAQsgAUEATgRAIAEgAUF/c0EfdiIDEPYBIgINASABIAMQmgIACxC8AQALIAAgAjYCBCAAIAE2AgALTgEBfyMAQTBrIgIkACACQRBqIAEQMyACQShqIAJBGGooAgA2AgAgAiACKQMQNwMgIAJBCGogAkEgahDMASAAIAIpAwg3AwAgAkEwaiQAC0YBAX8jAEEgayIBJAAgAUEYaiAAQRBqKQIANwMAIAFBEGogAEEIaikCADcDACABIAApAgA3AwggAUEIahCiASABQSBqJAALXwEDfyMAQRBrIgEkAAJAIAAoAgwiAgRAIAAoAggiA0UNASABIAI2AgggASAANgIEIAEgAzYCACABEM4BAAtBsI/AAEErQeSQwAAQsgEAC0Gwj8AAQStB1JDAABCyAQALTwEEfyMAQRBrIgIkACACQQhqIAEoAgAiAxAaEK0BIAIoAgghBCAAIAIoAgwiBTYCBCAAIAQ2AgAgASAFELkBIAAgAxAaNgIIIAJBEGokAAtSAQF/IwBBIGsiAyQAIANBDGpBATYCACADQRRqQQA2AgAgA0Hkk8AANgIQIANBADYCACADIAE2AhwgAyAANgIYIAMgA0EYajYCCCADIAIQxgEAC0sBAX8jAEEQayICJAAgAkEIaiAAIAFBARCCAQJAIAIoAgwiAEGBgICAeEcEQCAARQ0BIAIoAgggABCaAgALIAJBEGokAA8LELwBAAtLAQF/IwBBEGsiAyQAIANBCGogACABIAIQggECQCADKAIMIgBBgYCAgHhHBEAgAEUNASADKAIIIAAQmgIACyADQRBqJAAPCxC8AQALMwEBfyMAQRBrIgIkACACIABBCGo2AgggAiAANgIMIAEgAkEIaiACQQxqEH4gAkEQaiQAC0oBAX8gACgCACIAKAIAIAAoAggiA2sgAkkEfyAAIAMgAhC0ASAAKAIIBSADCyAAKAIEaiABIAIQnAIaIAAgACgCCCACajYCCEEAC0cBAX8gACgCACIAKAIAIAAoAggiA2sgAkkEQCAAIAMgAhB0IAAoAgghAwsgACgCBCADaiABIAIQnAIaIAAgAiADajYCCEEAC0cBAX8gACgCACIAKAIAIAAoAggiA2sgAkkEQCAAIAMgAhB1IAAoAgghAwsgACgCBCADaiABIAIQnAIaIAAgAiADajYCCEEAC0IBA38QHiIDEBciBBAYIQIgBEGEAU8EQCAEEAALIAIgACgCACABEBkgAkGEAU8EQCACEAALIANBhAFPBEAgAxAACwtDAQF/IAAoAgAgACgCCCIDayACSQR/IAAgAyACELQBIAAoAggFIAMLIAAoAgRqIAEgAhCcAhogACAAKAIIIAJqNgIIC0MBAX8Cf0EAIAEoAgAiAiABKAIETw0AGiABIAJBAWo2AgAgASgCCCgCACACEAghAUEBCyECIAAgATYCBCAAIAI2AgALSgEBfyMAQSBrIgAkACAAQRRqQQE2AgAgAEEcakEANgIAIABBpJLAADYCECAAQfSRwAA2AhggAEEANgIIIABBCGpBrJLAABDGAQALRgECfyABKAIEIQIgASgCACEDQQhBBBD2ASIBRQRAQQhBBBCaAgALIAEgAjYCBCABIAM2AgAgAEGEkcAANgIEIAAgATYCAAs7AgF/AXwgASgCGEEBcSECIAArAwAhAyABKAIQQQFGBEAgASADIAIgAUEUaigCABAsDwsgASADIAIQNAs7AQF/IwBBEGsiAiQAIAJBCGogAUEEaiABEIkBIAIoAgwhASAAIAIoAgg2AgAgACABNgIEIAJBEGokAAs7AQF/IwBBEGsiAiQAIAJBCGogACABEHAgAigCDCIAQYGAgIB4RwRAIAIoAgggABCaAgALIAJBEGokAAs7AQF/IwBBEGsiAiQAIAJBCGogACABEHogAigCDCIAQYGAgIB4RwRAIAIoAgggABCaAgALIAJBEGokAAs5AQF/IAFBEHZAACECIABBADYCCCAAQQAgAUGAgHxxIAJBf0YiARs2AgQgAEEAIAJBEHQgARs2AgALOQACQAJ/IAJBgIDEAEcEQEEBIAAgAiABKAIQEQAADQEaCyADDQFBAAsPCyAAIAMgBCABKAIMEQEACzcBAX8jAEEQayICJAAgAiABNgIMIAAgAkEMahCFASACKAIMIgBBhAFPBEAgABAACyACQRBqJAALNAEBfwJ/QQAgASgCBEEBRw0AGiABQQhqKAIAIgIgASgCAEYLIQEgACACNgIEIAAgATYCAAs/AQF/IwBBIGsiAiQAIAJBAToAGCACIAE2AhQgAiAANgIQIAJB7KzAADYCDCACQeSTwAA2AgggAkEIahCwAQALMAEBfwJAIAAoAgAiABACQQFHDQAgABAMIgAQC0EBRiEBIABBhAFJDQAgABAACyABCzMAAkAgAEH8////B0sNACAARQRAQQQPCyAAIABB/f///wdJQQJ0EPYBIgBFDQAgAA8LAAskAQF/IwBBEGsiAiQAIAIgADYCDCABIAJBDGoQfCACQRBqJAALMgAgACgCACEAIAEQ/QFFBEAgARD+AUUEQCAAIAEQiQIPCyAAIAEQjAEPCyAAIAEQiwELNgAgACgCACEAIAEQ/QFFBEAgARD+AUUEQCAAMQAAQQEgARBYDwsgACABEIcBDwsgACABEIgBCzIBAX8gACABKAIAIAEoAggiAksEfyABIAIQwAEgASgCCAUgAgs2AgQgACABKAIENgIACy4BAX8gASgCACICBEAgAEEBNgIIIAAgAjYCBCAAIAEoAgQ2AgAPCyAAQQA2AggLLQEBfyMAQRBrIgEkACABQQhqIABBCGooAgA2AgAgASAAKQIANwMAIAEQigEACzIBAX9BASEBIAAtAAQEfyABBSAAKAIAIgAoAgBB7K7AAEEBIABBBGooAgAoAgwRAQALCycAIAAgACgCBEEBcSABckECcjYCBCAAIAFqIgAgACgCBEEBcjYCBAs6AQJ/QfzMwAAtAAAhAUH8zMAAQQA6AABBgM3AACgCACECQYDNwABBADYCACAAIAI2AgQgACABNgIACycAIABCADcAACAAQRhqQgA3AAAgAEEQakIANwAAIABBCGpCADcAAAs0ACAAQQM6ACAgAEKAgICAgAQ3AhggAEEANgIQIABBADYCCCAAQaCFwAA2AgQgACABNgIACzIBAX8gASgCAEHarsAAQQEgASgCBCgCDBEBACECIABBADoABSAAIAI6AAQgACABNgIACyABAX8CQCAAQQRqKAIAIgFFDQAgACgCAEUNACABECYLCyMAAkAgAUH8////B00EQCAAIAFBBCACEO4BIgANAQsACyAACx8AIAEgA0YEQCAAIAIgARCcAhoPCyABIAMgBBCZAQALIwAgAiACKAIEQX5xNgIEIAAgAUEBcjYCBCAAIAFqIAE2AgALHgAgAEUEQBCSAgALIAAgAiADIAQgBSABKAIQEQkACx8BAn4gACkDACICIAJCP4ciA4UgA30gAkJ/VSABEFgLIAEBfyAAKAIAIAAoAggiAmsgAUkEQCAAIAIgARC0AQsLHAAgAEUEQBCSAgALIAAgAiADIAQgASgCEBEVAAscACAARQRAEJICAAsgACACIAMgBCABKAIQEQcACxwAIABFBEAQkgIACyAAIAIgAyAEIAEoAhARFgALHAAgAEUEQBCSAgALIAAgAiADIAQgASgCEBELAAscACAARQRAEJICAAsgACACIAMgBCABKAIQERQACx4AIAAgAUEDcjYCBCAAIAFqIgAgACgCBEEBcjYCBAsaACAARQRAEJICAAsgACACIAMgASgCEBEEAAsUACAAKAIABEAgAEEEaigCABAmCwsiACAALQAARQRAIAFB/LHAAEEFECkPCyABQfixwABBBBApCxgAIABFBEAQkgIACyAAIAIgASgCEBEAAAsRACAAKAIABEAgACgCBBAmCwsZAQF/IAAoAhAiAQR/IAEFIABBFGooAgALCxIAQQBBGSAAQQF2ayAAQR9GGwsWACAAIAFBAXI2AgQgACABaiABNgIACxQAIAAoAgAiAEGEAU8EQCAAEAALCxQAIAAgAjkDCCAAIAFBAEetNwMACxcAIAAgAjYCCCAAIAE2AgQgACACNgIACxAAIAAgAWpBf2pBACABa3ELDAAgACABIAIgAxArCwsAIAEEQCAAECYLCw8AIABBAXQiAEEAIABrcgsWACAAKAIAIAEgAiAAKAIEKAIMEQEACxkAIAEoAgBB2MXAAEEFIAEoAgQoAgwRAQALCgAgAEEIahDmAQsUACAAKAIAIAEgACgCBCgCDBEAAAsPACAAIAEgAiADIAQQIwALCAAgACABEEsLEAAgACgCACAAKAIEIAEQLQsWAEGAzcAAIAA2AgBB/MzAAEEBOgAACxAAIAEgACgCBCAAKAIIECkLEwAgAEGEkcAANgIEIAAgATYCAAsNACAALQAEQQJxQQF2CxAAIAEgACgCACAAKAIEECkLDQAgAC0AGEEQcUEEdgsNACAALQAYQSBxQQV2Cw0AIAAgASACELoBQQALCgBBACAAayAAcQsLACAALQAEQQNxRQsMACAAIAFBA3I2AgQLDQAgACgCACAAKAIEagsNACAAKAIAIAEQVkEACw4AIAAoAgAaA0AMAAsACwwAIAAgASACEJYBAAsMACAAIAEgAhCXAQALDAAgACABIAIQmAEACw0AIAA1AgBBASABEFgLDQAgACgCACABIAIQRwsNACAAKQMAQQEgARBYCw4AIAAoAgAtAAAgARBcCw4AIAAoAgApAwAgARBGCwsAIAAjAGokACMACw4AIAFBgIPAAEEKEPEBCwcAIAAQ5gELDAAgACgCACABEIQBCwwAQZiLwABBMhAdAAsOACABQciNwABBCBDxAQsOACABQdCNwABBChDxAQsKACAAKAIEQXhxCwoAIAAoAgRBAXELCgAgACgCDEEBcQsKACAAKAIMQQF2CwsAIAAoAgAgARB4CxkAIAAgAUGczcAAKAIAIgBBLyAAGxECAAALCwAgACgCACABEFoLCgAgACABIAIQVwsKACAAIAEgAhB9Cw4AIAFB/InAAEECEPEBCwcAIAAgAWoLBwAgACABawsHACAAQQhqCwcAIABBeGoLDABC69DdkbbiwrxICw0AQsi14M/KhtvTiX8LDQBCz8Kptu6ZpbSRfwsDAAELC5tMCQBBgIDAAAuqFWNhbGxlZCBgUmVzdWx0Ojp1bndyYXAoKWAgb24gYW4gYEVycmAgdmFsdWUAAQAAABQAAAAEAAAAAgAAAAMAAAAEAAAABAAAAAQAAABzcmNcbGliLnJzAABMABAACgAAABkAAAAyAAAAMTIzNDU2Nzg5MDA5ODc2NUwAEAAKAAAAHwAAADIAAABMABAACgAAACUAAAApAAAATAAQAAoAAAAqAAAAQAAAAEwAEAAKAAAANAAAADIAAABMABAACgAAADoAAAAyAAAATAAQAAoAAAA9AAAAIQAAAEwAEAAKAAAAQAAAACMAAAAFAAAAAAAAAAEAAAAGAAAABQAAAAAAAAABAAAABwAAABAAAABDOlxVc2Vyc1x3YW5nbGlwOFwuY2FyZ29ccmVnaXN0cnlcc3JjXGdpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyM1xnZW5lcmljLWFycmF5LTAuMTQuNlxzcmNcbGliLnJzAAAADAEQAGEAAAA1AgAACQAAAGEgc2VxdWVuY2VjYWxsZWQgYFJlc3VsdDo6dW53cmFwKClgIG9uIGFuIGBFcnJgIHZhbHVlAAAACAAAAAAAAAABAAAACQAAAAgAAAAAAAAAAQAAAAoAAABzcmNcdXRpbHMucnPYARAADAAAAAkAAAAFAAAA2AEQAAwAAAAJAAAAFwAAAHdhbmd0aW5neXUyMDE5MDPYARAADAAAAA0AAAAKAAAA2AEQAAwAAAAUAAAABQAAANgBEAAMAAAAFAAAABcAAADYARAADAAAABkAAAAKAAAAaW52YWxpZCB2YWx1ZTogLCBleHBlY3RlZCAAAFQCEAAPAAAAYwIQAAsAAAANAAAABAAAAAQAAAAOAAAADwAAABAAAACYAhAAAAAAABIAAAAMAAAABAAAABMAAAAUAAAAFQAAAGEgRGlzcGxheSBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB1bmV4cGVjdGVkbHkAFgAAAAAAAAABAAAAFwAAAC9ydXN0Yy9kNWE4MmJiZDI2ZTFhZDhiNzQwMWY2YTcxOGE5YzU3Yzk2OTA1NDgzL2xpYnJhcnkvYWxsb2Mvc3JjL3N0cmluZy5ycwAAAxAASwAAAOgJAAAJAAAAaW52YWxpZCB0eXBlOiAsIGV4cGVjdGVkIAAAAFwDEAAOAAAAagMQAAsAAABFcnJvcgAAABYAAAAEAAAABAAAABgAAABzdHJ1Y3QgdmFyaWFudAAAoAMQAA4AAAB0dXBsZSB2YXJpYW50AAAAuAMQAA0AAABuZXd0eXBlIHZhcmlhbnQA0AMQAA8AAAB1bml0IHZhcmlhbnToAxAADAAAAGVudW38AxAABAAAAG1hcAAIBBAAAwAAAHNlcXVlbmNlFAQQAAgAAABuZXd0eXBlIHN0cnVjdAAAJAQQAA4AAABPcHRpb24gdmFsdWU8BBAADAAAAHVuaXQgdmFsdWUAAFAEEAAKAAAAYnl0ZSBhcnJheQAAZAQQAAoAAABzdHJpbmcgAHgEEAAHAAAAY2hhcmFjdGVyIGBgiAQQAAsAAACTBBAAAQAAAGZsb2F0aW5nIHBvaW50IGCkBBAAEAAAAJMEEAABAAAAaW50ZWdlciBgAAAAxAQQAAkAAACTBBAAAQAAAGJvb2xlYW4gYAAAAOAEEAAJAAAAkwQQAAEAAAB1OAAAVHJpZWQgdG8gc2hyaW5rIHRvIGEgbGFyZ2VyIGNhcGFjaXR5AAUQACQAAAAvcnVzdGMvZDVhODJiYmQyNmUxYWQ4Yjc0MDFmNmE3MThhOWM1N2M5NjkwNTQ4My9saWJyYXJ5L2FsbG9jL3NyYy9yYXdfdmVjLnJzLAUQAEwAAACqAQAACQAAAB8AAAAEAAAABAAAACAAAABjbG9zdXJlIGludm9rZWQgcmVjdXJzaXZlbHkgb3IgYWZ0ZXIgYmVpbmcgZHJvcHBlZEpzVmFsdWUoKQDKBRAACAAAANIFEAABAAAAQzpcVXNlcnNcd2FuZ2xpcDhcLmNhcmdvXHJlZ2lzdHJ5XHNyY1xnaXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjNcYWVzLTAuOC4yXHNyY1xzb2Z0XGZpeHNsaWNlMzIucnMAAOQFEABiAAAASwAAACMAAADkBRAAYgAAAEwAAAAjAAAA5AUQAGIAAAAJAQAAJAAAAOQFEABiAAAAHgEAACgAAADkBRAAYgAAAIkEAAASAAAA5AUQAGIAAACJBAAAPQAAAOQFEABiAAAAFAUAACIAAADkBRAAYgAAABQFAAAJAAAAUGFkRXJyb3JVbnBhZEVycm9yR2VuZXJpY0FycmF5Ojpmcm9tX2l0ZXIgcmVjZWl2ZWQgIGVsZW1lbnRzIGJ1dCBleHBlY3RlZCAAANoGEAAhAAAA+wYQABcAAABDOlxVc2Vyc1x3YW5nbGlwOFwuY2FyZ29ccmVnaXN0cnlcc3JjXGdpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyM1xnZW5lcmljLWFycmF5LTAuMTQuNlxzcmNcbGliLnJzAAAAJAcQAGEAAABtAQAABQAAADAAAAAEAAAABAAAADEAAAAyAAAAMwAAAGNhbGxlZCBgT3B0aW9uOjp1bndyYXAoKWAgb24gYSBgTm9uZWAgdmFsdWVtZW1vcnkgYWxsb2NhdGlvbiBvZiAgYnl0ZXMgZmFpbGVkCgAA2wcQABUAAADwBxAADgAAAGxpYnJhcnkvc3RkL3NyYy9h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", ia = async (A = {}, I) => {
  let g;
  if (I.startsWith("data:")) {
    const B = I.replace(/^data:.*?base64,/, "");
    let Q;
    if (typeof Buffer == "function" && typeof Buffer.from == "function")
      Q = Buffer.from(B, "base64");
    else if (typeof atob == "function") {
      const e = atob(B);
      Q = new Uint8Array(e.length);
      for (let C = 0; C < e.length; C++)
        Q[C] = e.charCodeAt(C);
    } else
      throw new Error("Cannot decode base64-encoded data URL");
    g = await WebAssembly.instantiate(Q, A);
  } else {
    const B = await fetch(I), Q = B.headers.get("Content-Type") || "";
    if ("instantiateStreaming" in WebAssembly && Q.startsWith("application/wasm"))
      g = await WebAssembly.instantiateStreaming(B, A);
    else {
      const e = await B.arrayBuffer();
      g = await WebAssembly.instantiate(e, A);
    }
  }
  return g.instance.exports;
};
let z;
function na(A) {
  z = A;
}
const fA = new Array(128).fill(void 0);
fA.push(void 0, null, !0, !1);
function p(A) {
  return fA[A];
}
let CI = fA.length;
function oa(A) {
  A < 132 || (fA[A] = CI, CI = A);
}
function vg(A) {
  const I = p(A);
  return oa(A), I;
}
function T(A) {
  CI === fA.length && fA.push(fA.length + 1);
  const I = CI;
  return CI = fA[I], fA[I] = A, I;
}
function ng(A) {
  return A == null;
}
let uI = null;
function sa() {
  return (uI === null || uI.byteLength === 0) && (uI = new Float64Array(z.memory.buffer)), uI;
}
let yI = null;
function YA() {
  return (yI === null || yI.byteLength === 0) && (yI = new Int32Array(z.memory.buffer)), yI;
}
let iI = 0, wI = null;
function MI() {
  return (wI === null || wI.byteLength === 0) && (wI = new Uint8Array(z.memory.buffer)), wI;
}
const ra = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
let NI = new ra("utf-8");
const aa = typeof NI.encodeInto == "function" ? function(A, I) {
  return NI.encodeInto(A, I);
} : function(A, I) {
  const g = NI.encode(A);
  return I.set(g), {
    read: A.length,
    written: g.length
  };
};
function qg(A, I, g) {
  if (g === void 0) {
    const E = NI.encode(A), t = I(E.length);
    return MI().subarray(t, t + E.length).set(E), iI = E.length, t;
  }
  let B = A.length, Q = I(B);
  const e = MI();
  let C = 0;
  for (; C < B; C++) {
    const E = A.charCodeAt(C);
    if (E > 127)
      break;
    e[Q + C] = E;
  }
  if (C !== B) {
    C !== 0 && (A = A.slice(C)), Q = g(Q, B, B = C + A.length * 3);
    const E = MI().subarray(Q + C, Q + B), t = aa(A, E);
    C += t.written;
  }
  return iI = C, Q;
}
const ca = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
let KQ = new ca("utf-8", { ignoreBOM: !0, fatal: !0 });
KQ.decode();
function Kg(A, I) {
  return KQ.decode(MI().subarray(A, A + I));
}
function og(A) {
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
    let e = "[";
    Q > 0 && (e += og(A[0]));
    for (let C = 1; C < Q; C++)
      e += ", " + og(A[C]);
    return e += "]", e;
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
function la(A) {
  const I = qg(A, z.__wbindgen_malloc, z.__wbindgen_realloc), g = iI, B = z.encrypt(I, g);
  return vg(B);
}
function Da(A) {
  try {
    const B = z.__wbindgen_add_to_stack_pointer(-16);
    z.decrypt(B, T(A));
    var I = YA()[B / 4 + 0], g = YA()[B / 4 + 1];
    return Kg(I, g);
  } finally {
    z.__wbindgen_add_to_stack_pointer(16), z.__wbindgen_free(I, g);
  }
}
function zg(A, I) {
  try {
    return A.apply(this, I);
  } catch (g) {
    z.__wbindgen_exn_store(T(g));
  }
}
function fa(A) {
  vg(A);
}
function ha(A) {
  return T(A);
}
function ua(A) {
  const I = p(A);
  return typeof I == "object" && I !== null;
}
function ya(A, I) {
  return p(A) == p(I);
}
function wa(A) {
  const I = p(A);
  return typeof I == "boolean" ? I ? 1 : 0 : 2;
}
function da(A, I) {
  const g = p(I), B = typeof g == "number" ? g : void 0;
  sa()[A / 8 + 1] = ng(B) ? 0 : B, YA()[A / 4 + 0] = !ng(B);
}
function Ma(A, I) {
  const g = p(I), B = typeof g == "string" ? g : void 0;
  var Q = ng(B) ? 0 : qg(B, z.__wbindgen_malloc, z.__wbindgen_realloc), e = iI;
  YA()[A / 4 + 1] = e, YA()[A / 4 + 0] = Q;
}
function Na(A, I) {
  const g = new Error(Kg(A, I));
  return T(g);
}
function Fa(A, I) {
  const g = p(A)[I >>> 0];
  return T(g);
}
function Ga(A) {
  return p(A).length;
}
function pa() {
  const A = new Array();
  return T(A);
}
function Sa(A) {
  return typeof p(A) == "function";
}
function ka(A) {
  const I = p(A).next;
  return T(I);
}
function Ra() {
  return zg(function(A) {
    const I = p(A).next();
    return T(I);
  }, arguments);
}
function Ya(A) {
  return p(A).done;
}
function Ja(A) {
  const I = p(A).value;
  return T(I);
}
function Ua() {
  return T(Symbol.iterator);
}
function Ha() {
  return zg(function(A, I) {
    const g = Reflect.get(p(A), p(I));
    return T(g);
  }, arguments);
}
function ma() {
  return zg(function(A, I) {
    const g = p(A).call(p(I));
    return T(g);
  }, arguments);
}
function ba(A, I, g) {
  p(A)[I >>> 0] = vg(g);
}
function La(A) {
  return Array.isArray(p(A));
}
function xa(A) {
  let I;
  try {
    I = p(A) instanceof ArrayBuffer;
  } catch {
    I = !1;
  }
  return I;
}
function va(A) {
  return Number.isSafeInteger(p(A));
}
function qa(A) {
  const I = p(A).buffer;
  return T(I);
}
function Ka(A) {
  const I = new Uint8Array(p(A));
  return T(I);
}
function za(A, I, g) {
  p(A).set(p(I), g >>> 0);
}
function _a(A) {
  return p(A).length;
}
function Oa(A) {
  let I;
  try {
    I = p(A) instanceof Uint8Array;
  } catch {
    I = !1;
  }
  return I;
}
function ja(A, I) {
  const g = og(p(I)), B = qg(g, z.__wbindgen_malloc, z.__wbindgen_realloc), Q = iI;
  YA()[A / 4 + 1] = Q, YA()[A / 4 + 0] = B;
}
function Ta(A, I) {
  throw new Error(Kg(A, I));
}
function Xa() {
  const A = z.memory;
  return T(A);
}
URL = globalThis.URL;
const FA = await ia({ "./rich_wasm_bg.js": { __wbindgen_object_drop_ref: fa, __wbindgen_number_new: ha, __wbindgen_is_object: ua, __wbindgen_jsval_loose_eq: ya, __wbindgen_boolean_get: wa, __wbindgen_number_get: da, __wbindgen_string_get: Ma, __wbindgen_error_new: Na, __wbg_get_27fe3dac1c4d0224: Fa, __wbg_length_e498fbc24f9c1d4f: Ga, __wbg_new_b525de17f44a8943: pa, __wbindgen_is_function: Sa, __wbg_next_b7d530c04fd8b217: ka, __wbg_next_88560ec06a094dea: Ra, __wbg_done_1ebec03bbd919843: Ya, __wbg_value_6ac8da5cc5b3efda: Ja, __wbg_iterator_55f114446221aa5a: Ua, __wbg_get_baf4855f9a986186: Ha, __wbg_call_95d1ea488d03e4e8: ma, __wbg_set_17224bc548dd1d7b: ba, __wbg_isArray_39d28997bf6b96b4: La, __wbg_instanceof_ArrayBuffer_a69f02ee4c4f5065: xa, __wbg_isSafeInteger_8c4789029e885159: va, __wbg_buffer_cf65c07de34b9a08: qa, __wbg_new_537b7341ce90bb31: Ka, __wbg_set_17499e8aa4003ebd: za, __wbg_length_27a2afe8ab42b09f: _a, __wbg_instanceof_Uint8Array_01cebe79ca606cca: Oa, __wbindgen_debug_string: ja, __wbindgen_throw: Ta, __wbindgen_memory: Xa } }, ta), Za = FA.memory, Pa = FA.encrypt, Va = FA.decrypt, Wa = FA.__wbindgen_malloc, $a = FA.__wbindgen_realloc, Ac = FA.__wbindgen_add_to_stack_pointer, Ic = FA.__wbindgen_free, gc = FA.__wbindgen_exn_store, Bc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  __wbindgen_add_to_stack_pointer: Ac,
  __wbindgen_exn_store: gc,
  __wbindgen_free: Ic,
  __wbindgen_malloc: Wa,
  __wbindgen_realloc: $a,
  decrypt: Va,
  encrypt: Pa,
  memory: Za
}, Symbol.toStringTag, { value: "Module" }));
na(Bc);
const Qc = function(A) {
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
}, YB = function(A) {
  let I = typeof A == "string" ? A : JSON.stringify(A), g = la(I);
  return new Blob([new Uint8Array(g).buffer]);
}, JB = async function(A) {
  let I = null;
  if (typeof A == "string")
    I = A;
  else if (A instanceof Blob) {
    let g = await Qc(A), B = Array.prototype.slice.call(new Uint8Array(g));
    I = Da(B);
  } else if (A && typeof A == "object" && typeof A != "function" && !Array.isArray(A))
    return A;
  try {
    return JSON.parse(I);
  } catch {
    Promise.reject("数据格式无效");
  }
};
function ec(A) {
  let I = A ? W(A) : {};
  Ug(), Fg(), Lg(), bg(), xg();
  let g = [], B = [];
  I.modules && (g = I.modules, delete I.modules), I.actions && (B = I.actions, delete I.actions), I.remote && I.remote instanceof Array && (I.remote.forEach((Q) => {
    HI(Q);
  }), delete I.remote), I.globalData && (ig({
    id: "GD_query",
    name: "url参数",
    type: "temp",
    value: { data: zB() }
  }), I.globalData.forEach((Q) => {
    ig(Q);
  }), delete I.globalData), Array.isArray(I.plugins) && (I.plugins.forEach((Q) => {
    vQ(Q);
  }), delete I.plugins), YQ(I), GQ(g), B.forEach((Q) => {
    qA(Q);
  }), M.emit(b.DATA_LOADED, !0), LQ(!0);
}
function UB() {
  let A = UQ(), I = W(Rg());
  I.forEach((B) => {
    B.components && Array.isArray(B.components) && (B.components = B.components.map((Q) => {
      if (Q.type == "group") {
        let e = jI(Q.id);
        return e.components && (e.components = e.components.map((C) => {
          let E = tA(C.id);
          return E.selected = !1, E;
        })), e.selected = !1, e;
      } else {
        let e = tA(Q.id);
        return e.selected = !1, e;
      }
    }));
  });
  let g = W(xQ());
  return g.forEach((B, Q) => {
    B.type == "temp" && g.splice(Q, 1);
  }), W({
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
    actions: HA(),
    plugins: qQ(),
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
function Cc(...A) {
  let I = new Date().getTime(), g = {
    id: "A_" + $(10),
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
var sg = function() {
}, mI = {}, _g = {}, bI = {};
function Ec(A, I) {
  A = A.push ? A : [A];
  var g = [], B = A.length, Q = B, e, C, E, t;
  for (e = function(o, s) {
    s.length && g.push(o), Q--, Q || I(g);
  }; B--; ) {
    if (C = A[B], E = _g[C], E) {
      e(C, E);
      continue;
    }
    t = bI[C] = bI[C] || [], t.push(e);
  }
}
function zQ(A, I) {
  if (A) {
    var g = bI[A];
    if (_g[A] = I, !!g)
      for (; g.length; )
        g[0](A, I), g.splice(0, 1);
  }
}
function rg(A, I) {
  A.call && (A = { success: A }), I.length ? (A.error || sg)(I) : (A.success || sg)(A);
}
function _Q(A, I, g, B) {
  var Q = document, e = g.async, C = (g.numRetries || 0) + 1, E = g.before || sg, t = A.replace(/[\?|#].*$/, ""), o = A.replace(/^(css|img|module|nomodule)!/, ""), s, n, l;
  if (B = B || 0, /(^css!|\.css$)/.test(t))
    l = Q.createElement("link"), l.rel = "stylesheet", l.href = o, s = "hideFocus" in l, s && l.relList && (s = 0, l.rel = "preload", l.as = "style");
  else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(t))
    l = Q.createElement("img"), l.src = o;
  else if (l = Q.createElement("script"), l.src = o, l.async = e === void 0 ? !0 : e, n = "noModule" in l, /^module!/.test(t)) {
    if (!n)
      return I(A, "l");
    l.type = "module";
  } else if (/^nomodule!/.test(t) && n)
    return I(A, "l");
  l.onload = l.onerror = l.onbeforeload = function(d) {
    var w = d.type[0];
    if (s)
      try {
        l.sheet.cssText.length || (w = "e");
      } catch (X) {
        X.code != 18 && (w = "e");
      }
    if (w == "e") {
      if (B += 1, B < C)
        return _Q(A, I, g, B);
    } else if (l.rel == "preload" && l.as == "style")
      return l.rel = "stylesheet";
    I(A, w, d.defaultPrevented);
  }, E(A, l) !== !1 && Q.head.appendChild(l);
}
function tc(A, I, g) {
  A = A.push ? A : [A];
  var B = A.length, Q = B, e = [], C, E;
  for (C = function(t, o, s) {
    if (o == "e" && e.push(t), o == "b")
      if (s)
        e.push(t);
      else
        return;
    B--, B || I(e);
  }, E = 0; E < Q; E++)
    _Q(A[E], C, g);
}
function jA(A, I, g) {
  var B, Q;
  if (I && I.trim && (B = I), Q = (B ? g : I) || {}, B) {
    if (B in mI)
      throw "LoadJS";
    mI[B] = !0;
  }
  function e(C, E) {
    tc(A, function(t) {
      rg(Q, t), C && rg({ success: C, error: E }, t), zQ(B, t);
    }, Q);
  }
  if (Q.returnPromise)
    return new Promise(e);
  e();
}
jA.ready = function(I, g) {
  return Ec(I, function(B) {
    rg(g, B);
  }), jA;
};
jA.done = function(I) {
  zQ(I, []);
};
jA.reset = function() {
  mI = {}, _g = {}, bI = {};
};
jA.isDefined = function(I) {
  return I in mI;
};
const LI = {}, ic = function(A) {
  return Object.assign(LI, A), LI;
}, ag = function(A) {
  A instanceof Function ? A(LI) : A && typeof A == "object" && A.install && A.install instanceof Function && A.install(LI);
}, OQ = function({ url: A, name: I }) {
  return new Promise((g, B) => {
    jA(A, function() {
      typeof I == "string" ? ag(window[I]) : Array.isArray(I) && I.forEach((Q) => {
        ag(window[Q]);
      }), g();
    });
  });
}, nc = function(A) {
  return new Promise((I, g) => {
    if (Array.isArray(A)) {
      let B = [];
      A.forEach((Q) => {
        B.push(OQ(Q));
      }), Promise.all(B).then(I, g);
    } else
      I();
  });
}, P = {
  getData(A = !1) {
    if (A == !1)
      return UB();
    {
      let I = UB();
      return YB(I);
    }
  },
  // init: initData,
  async init(A) {
    let I = await JB(A);
    return I && Array.isArray(I.plugins) && await nc(I.plugins), ec(I), I;
  },
  encrypt: YB,
  decrypt: JB,
  ...Kr,
  ...Ts,
  ...ds,
  ...Ba,
  ...Ea,
  getElement(A) {
    return tA(A) || jI(A);
  },
  getElements() {
    return [...MQ(), ...Yg()];
  },
  getTemplateData: Cc,
  clearDataAll() {
    Ug(), Fg(), Lg(), bg(), xg(), JQ(), Og();
  }
}, { events: oc } = aI, jQ = function(A, I) {
  let g = oc.find((B) => B.event == A) || NA.getComponentEvents(I).find((B) => B.event == A);
  return g ? W(g) : !1;
}, mA = function(A, I, g = !1) {
  let B = tA(A);
  return I ? g ? B.events ? B.events.findIndex((Q) => Q.event == I) : -1 : B.events ? B.events.find((Q) => Q.event == I) : null : B.events || null;
}, sc = function(A, I, g) {
  let B = mA(A, I);
  if (B)
    return B;
  let Q = tA(A), e = jQ(I, Q.name);
  return Q && e ? (Q.events || (Q.events = []), g && (e.pams = g), Q.events.push(e), Q.events[Q.events.length - 1]) : (console.warn(Q ? I + "事件名称不对" : "缺少组件数据"), null);
}, rc = function(A, I, g) {
  let B = mA(A, I, !0);
  if (B > -1) {
    let Q = tA(A);
    return Q.events[B].pams = g, Q.events[B];
  }
  return null;
}, ac = function(A, I) {
  let g = mA(A, I, !0);
  if (g > -1) {
    let B = tA(A);
    return B.events.splice(g, 1), B.events;
  }
  return null;
};
let { actions: cc } = aI;
const lc = function(A, I = "", g, B = "") {
  let Q = cc.find((e) => e.action == A);
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
}, Dc = function(A) {
  return A.id ? qA(A) : (console.warn("没有要修改的动作信息"), null);
}, fc = function(A, I, g = "") {
  if (g && typeof I == "string") {
    let B = mA(I, g);
    return B ? B.actions.findIndex((Q) => Q == A) < 0 && B.actions.push(A) : console.warn(I + "中" + g + "事件不存在"), B;
  } else if (typeof I == "object" && I.actions && I.actions instanceof Array)
    return I.actions.push(A), I;
}, hc = function(A, I, g, B) {
  if (g && typeof I == "string") {
    let Q = mA(I, g);
    return Q ? typeof B < "u" && (Q.actionValue || (Q.actionValue = {}), Q.actionValue[A] = B) : console.warn(I + "中" + g + "事件不存在"), Q;
  }
}, uc = function(A, I, g = "", B = !1) {
  if (g && typeof I == "string") {
    let Q = mA(I, g);
    return Q && rA(Q.actions, "", A), B && Cg(A), Q;
  } else if (typeof I == "object" && I.actions && I.actions instanceof Array)
    return rA(I.actions, "", A), B && Cg(A), I;
}, yc = function(A, I) {
  let g = [];
  if (A) {
    let B = tA(A);
    if (Array.isArray(B.events))
      if (I) {
        let Q = B.events.find((e) => e.event == I);
        Q && (g = Q.actions.map((e) => ({
          sname: B.title,
          sid: B.id,
          event: Q.event,
          id: e
        })));
      } else
        g = B.events.map((Q) => Q.actions ? Q.actions.map((e) => ({
          sname: B.title,
          sid: B.id,
          event: Q.event,
          id: e
        })) : []).flat();
  } else
    g = Yg().map((B) => B.events && B.events.length > 0 ? B.events.map((Q) => Q.actions ? Q.actions.map((e) => ({
      sname: B.title,
      sid: B.id,
      event: Q.event,
      id: e
    })) : []).flat() : []).flat();
  return g;
}, cg = W, wc = yg;
let RA = {}, lg = [];
const Og = function() {
  lg.forEach((A) => {
    A();
  }), lg = [];
  for (const A in RA)
    RA[A] = null;
  RA = {};
}, jg = function(A) {
  if (typeof A != "string")
    return A;
  if (/^RD_\S{10}$/.test(A) && J[A])
    return J[A].data;
  {
    let I = A, g = null;
    if (/.\?+./.test(A)) {
      let B = A.split("?");
      I = B[0], g = B[1];
    }
    if (/(^GD_\S{10})|(^GD_query)$/.test(I) && Y[I])
      if (Y[I].type == "remote") {
        let B = bQ(Y[I].value);
        return B ? g ? (RA[A] || (RA[A] = fg(null), lg.push(oI(B.data, (Q) => {
          RA[A].value = UI(Q.data || Q, g);
        }, { immediate: !0 }))), RA[A]) : B.data : null;
      } else
        return g ? UI(Y[I].value, g) : Y[I].value;
  }
  return null;
}, Dg = function(A) {
  let I = {};
  return A && Array.isArray(A) && A.forEach((g) => {
    if (EA(g))
      if (typeof g.value == "string" && g.key) {
        let B = jg(g.value);
        B ? bB(B) ? I[g.key] = g.path ? UI(B.data, g.path) : B.data : I[g.key] = g.path ? UI(B, g.path) : B : I[g.key] = g.value;
      } else
        g.key && (I[g.key] = g.value);
  }), I;
}, dc = function(A, I = "up") {
  const g = P.elements, B = P.getElement(A);
  if (B) {
    if (!B.mid) {
      console.warn("页面上找不到" + A);
      return;
    }
  } else {
    console.warn("元件不存在" + A);
    return;
  }
  let Q = hQ(B.mid).map((e) => ({
    id: e.id,
    zIndex: e.zIndex
  })).sort((e, C) => C.zIndex - e.zIndex);
  if (I == "up") {
    let e = Q.findIndex((C) => C.id == A);
    if (e > 0) {
      let C = Q[e - 1].id, E = g[C].zIndex;
      g[C].zIndex = g[A].zIndex, g[A].zIndex = E;
    }
  } else if (I == "down") {
    let e = Q.findIndex((C) => C.id == A);
    if (e < Q.length - 1 && e > -1) {
      let C = Q[e + 1].id, E = g[C].zIndex;
      g[C].zIndex = g[A].zIndex, g[A].zIndex = E;
    }
  } else if (I == "top") {
    let e = Q.findIndex((C) => C.id == A);
    if (e > 0) {
      g[A].zIndex = Q[0].zIndex;
      for (let C = 0; C < e; C++)
        g[Q[C].id].zIndex--;
    }
  } else if (I == "bottom") {
    let e = Q.findIndex((C) => C.id == A);
    if (e < Q.length - 1 && e > -1) {
      g[A].zIndex = Q[Q.length - 1].zIndex;
      for (let C = e + 1, E = Q.length; C < E; C++)
        g[Q[C].id].zIndex++;
    }
  }
}, TQ = function(A, I, g = null) {
  const B = yQ(), Q = dQ();
  if (B[A]) {
    let e = cg(B[A]);
    return e.title += "_c", delete e.id, delete e.zIndex, Object.assign(e, I), JI(e, e.mid, g);
  } else if (Q[A]) {
    let e = cg(Q[A]);
    e.title += "_c", delete e.id, delete e.zIndex, Object.assign(e, I);
    let C = [];
    e.components && (C = e.components, delete e.components);
    let E = Jg.newGroupData(e, e.mid);
    return C.forEach((t) => {
      TQ(t.id, { gpid: E.id }, E.id);
    }), E;
  }
}, Mc = function(A, I) {
  Rg().forEach((g) => {
    if (I) {
      if (typeof I == "string") {
        if (g.id == I)
          return;
      } else if (I instanceof Array && I.find((B) => B == g.id))
        return;
    }
    g.type != "fixed" && (g.id == A ? g.visible = !0 : g.visible = !1);
  });
}, Nc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAction: fc,
  addEvent: sc,
  changeModuleShow: Mc,
  clear: Og,
  copy: TQ,
  createActionData: lc,
  editAction: hc,
  editActionData: Dc,
  editEvent: rc,
  extractData: wc,
  getBodyData: Dg,
  getDataSource: jg,
  getEvent: mA,
  getSpriteActions: yc,
  jsonData: cg,
  newEventData: jQ,
  removeAction: uc,
  removeEvent: ac,
  setZindex: dc
}, Symbol.toStringTag, { value: "Module" }));
function V(A, I, g = "") {
  let B = null;
  if (A ? (B = Qe(A), B == A && (console.warn(B + "组件没有找到"), B = "div")) : (console.warn("数据缺少组件" + I), B = "div"), typeof I == "string") {
    const Q = tA(I) || jI(I);
    if (!Q)
      return;
    let e = { ...Q, key: I };
    if (Q.id && Object.assign(e, MB(Q.events || [], Q, A)), e.name && delete e.name, e.mid && delete e.mid, e.anim && e.anim.name && k.interaction ? e.class = e.anim.name : typeof e.anim == "string" && delete e.anim, e.data) {
      let C = jg(e.data);
      C && (bB(C) ? e.data = C.data || C : e.data = C);
    }
    return q(B, e);
  } else if (typeof I < "u") {
    let Q = { ...I };
    return (I.events || I.type == "group") && Object.assign(Q, MB(I.events || [], I, A)), Q.ref = Q.id, Q.name && delete Q.name, Q.mid && delete Q.mid, q(B, Q, g);
  } else
    return q(B, {}, "");
}
const Fc = {
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
    const I = P.getModules(), g = P.getAppData(), B = m({}), Q = ee(A.slots) ? [A.slots] : [];
    return Q.length == 0 && (Array.isArray(A.slots) ? A.slots.forEach((e) => {
      Q.push(q(e));
    }) : A.slots && Q.push(q(A.slots))), oI(I, (e) => {
      Object.assign(B, JSON.parse(JSON.stringify(e)));
    }, { deep: !0 }), Ce(() => {
      M.emit(b.STAGE_MOUNTED);
    }), () => {
      var e = [];
      const C = [], E = [], t = [];
      for (const s in B)
        if (B.hasOwnProperty.call(B, s)) {
          const n = B[s];
          (typeof n.visible > "u" || n.visible == !0) && (n.type == "content" ? C.push(n) : n.type == "fixed" ? E.push(n) : n.type == "overlayer" && t.push(n));
        }
      e.push(V("vx-background", A.background), ...Q), C.length > 0 && e.push(V("vx-content", { modules: C })), E.length > 0 && e.push(V("vx-fixed", { modules: E })), t.length > 0 && (e.unshift(V("vx-mask")), e.push(V("vx-overlayer", { modules: t }))), e.push(V("vx-popwin", A.popwin)), e.push(V("vx-message"));
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
        ...W(g.background)
      };
      return q("div", {
        id: "vx-stage",
        style: o,
        onclick(s) {
          M.emit(b.CLICK_STAGE, s);
        }
      }, e);
    };
  }
}, Gc = {
  name: "vx-module",
  props: ["components"],
  setup(A) {
    const { components: I } = hg(A);
    return (g) => {
      const B = [];
      return I.value && I.value.forEach((Q, e) => {
        Q.visible && (Q.type == "group" ? B.push(V("vx-sprite-group", Q.id)) : B.push(V(Q.name, Q.id)));
      }), q("div", {
        id: g.id,
        style: g.style
      }, B);
    };
  }
}, pc = {
  name: "vx-plane",
  props: ["components"],
  setup() {
    return (A) => {
      const I = [];
      return A.components && A.components.forEach((g, B) => {
        g.visible && I.push(V(g.name, g.id));
      }), q("div", {
        id: A.id,
        style: A.style
      }, I);
    };
  }
}, Sc = {
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
let kc = {
  position: "absolute",
  width: "auto",
  height: "auto",
  top: 0,
  left: 0,
  zIndex: 1e4
};
const Rc = {
  name: "vx-content",
  props: ["modules"],
  setup(A) {
    return () => {
      const I = A.modules, g = [];
      for (const B in I)
        if (I.hasOwnProperty.call(I, B)) {
          const Q = I[B];
          (typeof Q.visible > "u" || Q.visible == !0) && g.push(V("vx-module", Q));
        }
      return q("div", {
        id: "vx-content",
        style: kc
      }, g);
    };
  }
};
let Yc = {
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 2e4
};
const Jc = {
  name: "vx-fixed",
  props: ["modules"],
  setup(A) {
    return () => {
      const I = A.modules, g = [];
      for (const B in I)
        if (I.hasOwnProperty.call(I, B)) {
          const Q = I[B];
          (typeof Q.visible > "u" || Q.visible == !0) && g.push(V("vx-module", Q));
        }
      return q("div", {
        id: "vx-fixed",
        style: Yc
      }, g);
    };
  }
};
let Uc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 4e4
};
const Hc = {
  name: "vx-overlayer",
  props: ["modules"],
  setup(A) {
    return () => {
      const I = A.modules, g = [];
      for (const B in I)
        if (I.hasOwnProperty.call(I, B)) {
          const Q = I[B];
          (typeof Q.visible > "u" || Q.visible == !0) && g.push(V("vx-module", Q));
        }
      return q("div", {
        id: "vx-overlayer",
        style: Uc
      }, g);
    };
  }
};
let HB = {
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 99999999
}, mc = {
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
const bc = {
  name: "vx-message",
  setup() {
    const A = m([]);
    M.addEventListener("message-send", (g) => {
      A.length == 0 && I(), A.push(g);
    });
    const I = function() {
      setTimeout(() => {
        A.length > 0 && (A.splice(0, 1), A.length > 0 && I());
      }, 3e3);
    };
    return () => A.length > 0 ? q("div", {
      id: "vx-message",
      style: HB
    }, A.map((g) => q("div", { class: "message_item", style: mc }, g))) : q("div", {
      id: "vx-message",
      style: HB
    });
  }
}, Lc = {
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
let xc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0)",
  zIndex: 1
};
const vc = {
  name: "vx-background",
  setup(A) {
    return () => {
      let I = Object.assign({}, xc, A.style);
      return q("div", {
        id: "vx-background",
        style: I,
        onmousedown: (g) => {
          M.emit(b.MOUSEDOWN_BACKGROUND, g);
        },
        onmouseup: (g) => {
          M.emit(b.MOUSEUP_BACKGROUND, g);
        },
        onclick: (g) => {
          M.emit(b.CLICK_BACKGROUND, g);
        }
      });
    };
  }
}, qc = {
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
    const { x: I, y: g, id: B } = hg(A);
    return Xg("offsetX", I), Xg("offsetY", g), (Q) => {
      const e = [];
      Q.components && Q.components.forEach((E, t) => {
        E.visible && e.push(V(E.name, E.id));
      });
      let C = ["element_sprite", { element_selected: Q.selected }, { element_hover: Q.hover }];
      return q("div", { id: B.value, style: Q.style, class: C }, e);
    };
  }
}, Kc = {
  name: "vx-sprite",
  setup(A, I) {
    const { id: g } = hg(A);
    return (B) => {
      let Q = "";
      typeof I.slots.default == "function" && (Q = I.slots.default());
      let e = ["element_sprite", { element_selected: B.$parent.selected }, { element_hover: B.$parent.hover }];
      return B.$parent.gpid && (e = ["element_sprite"]), q("div", { id: g.value || B.$parent.id, style: B.$parent.style, class: e }, Q);
    };
  }
}, zc = [Gc, pc, Sc, Hc, Rc, Jc, bc, Lc, vc, qc, Kc], _c = {
  install: (A) => {
    zc.forEach((I) => {
      A.component(I.name, I);
    });
  }
};
window && typeof window.Vue > "u" && (window.Vue = ge);
var IA = null;
const XQ = function(A = {}) {
  return IA ? !1 : (IA = Ee(Fc, A), IA.use(_c), IA.mixin(vI), k.status = "create", window && (window.myapp = IA), console.log("%c灿create", "color:#0aa100"), !0);
}, Oc = function() {
  if (IA) {
    let A = k.dom;
    return typeof A == "string" && document.querySelector(A) || A instanceof HTMLElement ? (IA.mount(A), k.status = "display", console.log("%c灿display", "color:#0aa100"), !0) : (console.error(A + "错误"), !1);
  } else
    return console.warn("app没有创建"), !1;
}, ZQ = function() {
  IA && (IA.unmount(), IA = null, k.status = "remove", console.log("%c灿remove", "color:#0aa100"));
}, FI = function(A) {
  return A && Object.assign(k, A), k;
}, jc = function() {
  return IA;
}, nI = {
  appSetup: k,
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
}, dI = {}, eI = aI.actions, mB = function(A, I, g) {
  if (KA[A]) {
    let B = eI.find((Q) => Q.action == A);
    if (B) {
      let Q = {};
      B.target == "component" || B.target == "components" ? I instanceof Array ? (Q = [], I.forEach((e) => {
        Q.push(P.getElement(e));
      })) : I && (Q = P.getElement(I)) : B.target == "app" ? Q = P.getAppData() : B.target == "url" ? Q = I : B.target == "modules" ? Q = P.getModuleList() : B.target == "module" && (Q = P.getModule(I)), KA[A].call(B, Q, g);
    } else {
      let Q = P.getElement(I) || P.getModule(I);
      Q && (targetData = Q), KA[A].call({}, targetData, g);
    }
  } else
    console.warn(item.action + "动作不存在");
}, xI = {
  // 元件动作
  [zA.ACTION](A) {
    A.data && (A.data instanceof Array ? A.data.forEach((I) => {
      mB(I.action, I.target, I.value);
    }) : A.data instanceof Object && typeof A.data != "function" && mB(A.data.action, A.data.target, A.data.value));
  },
  // 应用动作
  [zA.APP_ACTION](A) {
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
    eI.find((g) => g.action == I.action) ? console.warn(A, "已存在") : I.action && A.handle ? KA[I.action] ? console.warn(I.action + "动作已存在") : (eI.push(I), KA[I.action] = A.handle, dI[I.action] = I) : I.action ? console.warn(A, "缺少动作方法函数") : console.warn(A, "缺少action名称");
  },
  remove(A) {
    if (dI[A]) {
      let I = eI.findIndex((g) => g.action == A);
      I > -1 && eI.splice(I, 1), delete KA[A], delete dI[A];
    }
  },
  removeAll() {
    Object.keys(dI).forEach((I) => {
      this.remove(I);
    });
  }
};
for (const A in zA) {
  let I = zA[A];
  M.addEventListener(I, xI[I], xI);
}
const Tc = function(A, I) {
  return k.status == "none" || k.status == "remove" || k.status == "destroy" ? (FI(A), P.resetAppData(), XQ(I) ? (NA.install(), EA(A) && PQ(A), !0) : (console.warn("应用已存在，不可重复创建"), !1)) : (console.warn("应用创建失败"), !1);
}, PQ = function(A) {
  let I = FI({});
  jc() || XQ() && NA.reload(), I.status != "display" ? (typeof A == "string" ? I = FI({ dom: A }) : EA(A) && (I = FI(A)), Oc()) : console.warn("舞台已显示");
}, Xc = function() {
  ZQ();
}, Zc = function(A = !0) {
  A && (P.clearDataAll(), xI.removeAll()), NA.removeAll(), M.clear(), Og(), ZQ(), k.status = "destroy", console.log("%c灿destroy", "color:#0aa100");
};
const Pc = tC, VQ = P, WQ = NA, Vc = vI, Wc = xI, $c = M, Al = aI, $Q = b, Il = Nc, gl = Wr, Bl = nI, Ql = k, Ae = Tc, el = PQ, sl = Xc, Cl = Zc, Ie = ag, El = OQ, tl = function(A) {
  let I = A.components || [], g = A.actions || [], B = A.data || null, Q = A.slots || null, e = {
    width: A.width,
    height: A.height,
    backgroundColor: A.backgroundColor,
    scaleMode: A.scaleMode,
    dom: A.dom,
    interaction: A.interaction,
    clickCursor: A.clickCursor,
    scale: A.scale
  };
  Object.keys(e).forEach((t) => {
    typeof e[t] > "u" && delete e[t];
  }), WQ.add(I), Ie(g);
  let E = Ae(e, { slots: Q });
  return VQ.init(B), E;
};
ue.addEventListener("statechange", function(A) {
  M.emit($Q.PAGE_STATE, { state: A.newState, oldState: A.oldState });
});
const il = ic({
  utils: Pc,
  rdata: VQ,
  component: WQ,
  componentMixin: Vc,
  controller: Wc,
  cmd: $c,
  typeModel: Al,
  EVENTS: $Q,
  helper: Il,
  remote: gl,
  app: Bl,
  appInfo: Ql,
  use: Ie,
  useAsync: El,
  createApp: tl,
  displayStage: el,
  createStage: Ae,
  destroyStage: Cl
});
console.log("%crd-runtime:1.8.1", "color:#0aa100");
"RD" in window || (window.RD = il);
export {
  $Q as EVENTS,
  Bl as app,
  Ql as appInfo,
  $c as cmd,
  WQ as component,
  Vc as componentMixin,
  Wc as controller,
  tl as createApp,
  Ae as createStage,
  Cl as destroyStage,
  el as displayStage,
  Il as helper,
  VQ as rdata,
  gl as remote,
  sl as removeStage,
  Al as typeModel,
  Ie as use,
  El as useAsync,
  Pc as utils
};
//# sourceMappingURL=rd-runtime.mjs.map
