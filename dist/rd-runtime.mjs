import * as Mi from "vue";
import { reactive as k, watch as rt, computed as Ii, ref as sn, isReactive as gr, resolveComponent as Pi, h as U, isVNode as ki, onMounted as zi, toRefs as on, provide as Cn, createApp as Ri } from "vue";
function Li(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const s in r)
        if (s !== "default" && !(s in e)) {
          const o = Object.getOwnPropertyDescriptor(r, s);
          o && Object.defineProperty(e, s, o.get ? o : {
            enumerable: !0,
            get: () => r[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
var Je = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Gi = typeof Je == "object" && Je && Je.Object === Object && Je, mr = Gi, Ui = mr, Ni = typeof self == "object" && self && self.Object === Object && self, qi = Ui || Ni || Function("return this")(), Ae = qi, Fi = Ae, Hi = Fi.Symbol, an = Hi, Mn = an, br = Object.prototype, Ki = br.hasOwnProperty, Bi = br.toString, We = Mn ? Mn.toStringTag : void 0;
function Vi(e) {
  var t = Ki.call(e, We), n = e[We];
  try {
    e[We] = void 0;
    var r = !0;
  } catch {
  }
  var s = Bi.call(e);
  return r && (t ? e[We] = n : delete e[We]), s;
}
var Wi = Vi, Yi = Object.prototype, Ji = Yi.toString;
function Zi(e) {
  return Ji.call(e);
}
var Xi = Zi, In = an, Qi = Wi, es = Xi, ts = "[object Null]", ns = "[object Undefined]", Pn = In ? In.toStringTag : void 0;
function rs(e) {
  return e == null ? e === void 0 ? ns : ts : Pn && Pn in Object(e) ? Qi(e) : es(e);
}
var it = rs;
function is(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var ss = is, os = ss, as = os(Object.getPrototypeOf, Object), _r = as;
function ls(e) {
  return e != null && typeof e == "object";
}
var Ue = ls, us = it, cs = _r, fs = Ue, ds = "[object Object]", ps = Function.prototype, hs = Object.prototype, $r = ps.toString, ys = hs.hasOwnProperty, vs = $r.call(Object);
function gs(e) {
  if (!fs(e) || us(e) != ds)
    return !1;
  var t = cs(e);
  if (t === null)
    return !0;
  var n = ys.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && $r.call(n) == vs;
}
var se = gs, et = {}, ms = {
  get exports() {
    return et;
  },
  set exports(e) {
    et = e;
  }
};
(function(e) {
  var t = Object.prototype.hasOwnProperty, n = "~";
  function r() {
  }
  Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (n = !1));
  function s(u, f, d) {
    this.fn = u, this.context = f, this.once = d || !1;
  }
  function o(u, f, d, c, v) {
    if (typeof d != "function")
      throw new TypeError("The listener must be a function");
    var w = new s(d, c || u, v), O = n ? n + f : f;
    return u._events[O] ? u._events[O].fn ? u._events[O] = [u._events[O], w] : u._events[O].push(w) : (u._events[O] = w, u._eventsCount++), u;
  }
  function a(u, f) {
    --u._eventsCount === 0 ? u._events = new r() : delete u._events[f];
  }
  function l() {
    this._events = new r(), this._eventsCount = 0;
  }
  l.prototype.eventNames = function() {
    var f = [], d, c;
    if (this._eventsCount === 0)
      return f;
    for (c in d = this._events)
      t.call(d, c) && f.push(n ? c.slice(1) : c);
    return Object.getOwnPropertySymbols ? f.concat(Object.getOwnPropertySymbols(d)) : f;
  }, l.prototype.listeners = function(f) {
    var d = n ? n + f : f, c = this._events[d];
    if (!c)
      return [];
    if (c.fn)
      return [c.fn];
    for (var v = 0, w = c.length, O = new Array(w); v < w; v++)
      O[v] = c[v].fn;
    return O;
  }, l.prototype.listenerCount = function(f) {
    var d = n ? n + f : f, c = this._events[d];
    return c ? c.fn ? 1 : c.length : 0;
  }, l.prototype.emit = function(f, d, c, v, w, O) {
    var K = n ? n + f : f;
    if (!this._events[K])
      return !1;
    var $ = this._events[K], oe = arguments.length, de, P;
    if ($.fn) {
      switch ($.once && this.removeListener(f, $.fn, void 0, !0), oe) {
        case 1:
          return $.fn.call($.context), !0;
        case 2:
          return $.fn.call($.context, d), !0;
        case 3:
          return $.fn.call($.context, d, c), !0;
        case 4:
          return $.fn.call($.context, d, c, v), !0;
        case 5:
          return $.fn.call($.context, d, c, v, w), !0;
        case 6:
          return $.fn.call($.context, d, c, v, w, O), !0;
      }
      for (P = 1, de = new Array(oe - 1); P < oe; P++)
        de[P - 1] = arguments[P];
      $.fn.apply($.context, de);
    } else {
      var kt = $.length, Q;
      for (P = 0; P < kt; P++)
        switch ($[P].once && this.removeListener(f, $[P].fn, void 0, !0), oe) {
          case 1:
            $[P].fn.call($[P].context);
            break;
          case 2:
            $[P].fn.call($[P].context, d);
            break;
          case 3:
            $[P].fn.call($[P].context, d, c);
            break;
          case 4:
            $[P].fn.call($[P].context, d, c, v);
            break;
          default:
            if (!de)
              for (Q = 1, de = new Array(oe - 1); Q < oe; Q++)
                de[Q - 1] = arguments[Q];
            $[P].fn.apply($[P].context, de);
        }
    }
    return !0;
  }, l.prototype.on = function(f, d, c) {
    return o(this, f, d, c, !1);
  }, l.prototype.once = function(f, d, c) {
    return o(this, f, d, c, !0);
  }, l.prototype.removeListener = function(f, d, c, v) {
    var w = n ? n + f : f;
    if (!this._events[w])
      return this;
    if (!d)
      return a(this, w), this;
    var O = this._events[w];
    if (O.fn)
      O.fn === d && (!v || O.once) && (!c || O.context === c) && a(this, w);
    else {
      for (var K = 0, $ = [], oe = O.length; K < oe; K++)
        (O[K].fn !== d || v && !O[K].once || c && O[K].context !== c) && $.push(O[K]);
      $.length ? this._events[w] = $.length === 1 ? $[0] : $ : a(this, w);
    }
    return this;
  }, l.prototype.removeAllListeners = function(f) {
    var d;
    return f ? (d = n ? n + f : f, this._events[d] && a(this, d)) : (this._events = new r(), this._eventsCount = 0), this;
  }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = n, l.EventEmitter = l, e.exports = l;
})(ms);
const Ye = {}, bs = 10;
function _s(e) {
  var t = !0, n = new Date().getTime();
  return Ye[e] ? (n - Ye[e].time < bs && (t = !1), Ye[e].count++, Ye[e].time = n) : Ye[e] = {
    count: 1,
    time: n
  }, t;
}
const z = {
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
}, ze = {
  // 执行动作
  ACTION: "action",
  // 设置应用
  APP_ACTION: "appAction"
};
var ht = {}, $s = {
  get exports() {
    return ht;
  },
  set exports(e) {
    ht = e;
  }
};
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(Je, function() {
    var n = 1e3, r = 6e4, s = 36e5, o = "millisecond", a = "second", l = "minute", u = "hour", f = "day", d = "week", c = "month", v = "quarter", w = "year", O = "date", K = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, oe = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, de = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(g) {
      var y = ["th", "st", "nd", "rd"], p = g % 100;
      return "[" + g + (y[(p - 20) % 10] || y[p] || y[0]) + "]";
    } }, P = function(g, y, p) {
      var m = String(g);
      return !m || m.length >= y ? g : "" + Array(y + 1 - m.length).join(p) + g;
    }, kt = { s: P, z: function(g) {
      var y = -g.utcOffset(), p = Math.abs(y), m = Math.floor(p / 60), h = p % 60;
      return (y <= 0 ? "+" : "-") + P(m, 2, "0") + ":" + P(h, 2, "0");
    }, m: function g(y, p) {
      if (y.date() < p.date())
        return -g(p, y);
      var m = 12 * (p.year() - y.year()) + (p.month() - y.month()), h = y.clone().add(m, c), _ = p - h < 0, b = y.clone().add(m + (_ ? -1 : 1), c);
      return +(-(m + (p - h) / (_ ? h - b : b - h)) || 0);
    }, a: function(g) {
      return g < 0 ? Math.ceil(g) || 0 : Math.floor(g);
    }, p: function(g) {
      return { M: c, y: w, w: d, d: f, D: O, h: u, m: l, s: a, ms: o, Q: v }[g] || String(g || "").toLowerCase().replace(/s$/, "");
    }, u: function(g) {
      return g === void 0;
    } }, Q = "en", $e = {};
    $e[Q] = de;
    var zt = function(g) {
      return g instanceof lt;
    }, at = function g(y, p, m) {
      var h;
      if (!y)
        return Q;
      if (typeof y == "string") {
        var _ = y.toLowerCase();
        $e[_] && (h = _), p && ($e[_] = p, h = _);
        var b = y.split("-");
        if (!h && b.length > 1)
          return g(b[0]);
      } else {
        var D = y.name;
        $e[D] = y, h = D;
      }
      return !m && h && (Q = h), h || !m && Q;
    }, N = function(g, y) {
      if (zt(g))
        return g.clone();
      var p = typeof y == "object" ? y : {};
      return p.date = g, p.args = arguments, new lt(p);
    }, T = kt;
    T.l = at, T.i = zt, T.w = function(g, y) {
      return N(g, { locale: y.$L, utc: y.$u, x: y.$x, $offset: y.$offset });
    };
    var lt = function() {
      function g(p) {
        this.$L = at(p.locale, null, !0), this.parse(p);
      }
      var y = g.prototype;
      return y.parse = function(p) {
        this.$d = function(m) {
          var h = m.date, _ = m.utc;
          if (h === null)
            return new Date(NaN);
          if (T.u(h))
            return new Date();
          if (h instanceof Date)
            return new Date(h);
          if (typeof h == "string" && !/Z$/i.test(h)) {
            var b = h.match($);
            if (b) {
              var D = b[2] - 1 || 0, L = (b[7] || "0").substring(0, 3);
              return _ ? new Date(Date.UTC(b[1], D, b[3] || 1, b[4] || 0, b[5] || 0, b[6] || 0, L)) : new Date(b[1], D, b[3] || 1, b[4] || 0, b[5] || 0, b[6] || 0, L);
            }
          }
          return new Date(h);
        }(p), this.$x = p.x || {}, this.init();
      }, y.init = function() {
        var p = this.$d;
        this.$y = p.getFullYear(), this.$M = p.getMonth(), this.$D = p.getDate(), this.$W = p.getDay(), this.$H = p.getHours(), this.$m = p.getMinutes(), this.$s = p.getSeconds(), this.$ms = p.getMilliseconds();
      }, y.$utils = function() {
        return T;
      }, y.isValid = function() {
        return this.$d.toString() !== K;
      }, y.isSame = function(p, m) {
        var h = N(p);
        return this.startOf(m) <= h && h <= this.endOf(m);
      }, y.isAfter = function(p, m) {
        return N(p) < this.startOf(m);
      }, y.isBefore = function(p, m) {
        return this.endOf(m) < N(p);
      }, y.$g = function(p, m, h) {
        return T.u(p) ? this[m] : this.set(h, p);
      }, y.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, y.valueOf = function() {
        return this.$d.getTime();
      }, y.startOf = function(p, m) {
        var h = this, _ = !!T.u(m) || m, b = T.p(p), D = function(Te, B) {
          var ve = T.w(h.$u ? Date.UTC(h.$y, B, Te) : new Date(h.$y, B, Te), h);
          return _ ? ve : ve.endOf(f);
        }, L = function(Te, B) {
          return T.w(h.toDate()[Te].apply(h.toDate("s"), (_ ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(B)), h);
        }, R = this.$W, q = this.$M, ye = this.$D, pe = "set" + (this.$u ? "UTC" : "");
        switch (b) {
          case w:
            return _ ? D(1, 0) : D(31, 11);
          case c:
            return _ ? D(1, q) : D(0, q + 1);
          case d:
            var Be = this.$locale().weekStart || 0, Ve = (R < Be ? R + 7 : R) - Be;
            return D(_ ? ye - Ve : ye + (6 - Ve), q);
          case f:
          case O:
            return L(pe + "Hours", 0);
          case u:
            return L(pe + "Minutes", 1);
          case l:
            return L(pe + "Seconds", 2);
          case a:
            return L(pe + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, y.endOf = function(p) {
        return this.startOf(p, !1);
      }, y.$set = function(p, m) {
        var h, _ = T.p(p), b = "set" + (this.$u ? "UTC" : ""), D = (h = {}, h[f] = b + "Date", h[O] = b + "Date", h[c] = b + "Month", h[w] = b + "FullYear", h[u] = b + "Hours", h[l] = b + "Minutes", h[a] = b + "Seconds", h[o] = b + "Milliseconds", h)[_], L = _ === f ? this.$D + (m - this.$W) : m;
        if (_ === c || _ === w) {
          var R = this.clone().set(O, 1);
          R.$d[D](L), R.init(), this.$d = R.set(O, Math.min(this.$D, R.daysInMonth())).$d;
        } else
          D && this.$d[D](L);
        return this.init(), this;
      }, y.set = function(p, m) {
        return this.clone().$set(p, m);
      }, y.get = function(p) {
        return this[T.p(p)]();
      }, y.add = function(p, m) {
        var h, _ = this;
        p = Number(p);
        var b = T.p(m), D = function(q) {
          var ye = N(_);
          return T.w(ye.date(ye.date() + Math.round(q * p)), _);
        };
        if (b === c)
          return this.set(c, this.$M + p);
        if (b === w)
          return this.set(w, this.$y + p);
        if (b === f)
          return D(1);
        if (b === d)
          return D(7);
        var L = (h = {}, h[l] = r, h[u] = s, h[a] = n, h)[b] || 1, R = this.$d.getTime() + p * L;
        return T.w(R, this);
      }, y.subtract = function(p, m) {
        return this.add(-1 * p, m);
      }, y.format = function(p) {
        var m = this, h = this.$locale();
        if (!this.isValid())
          return h.invalidDate || K;
        var _ = p || "YYYY-MM-DDTHH:mm:ssZ", b = T.z(this), D = this.$H, L = this.$m, R = this.$M, q = h.weekdays, ye = h.months, pe = function(B, ve, Rt, ut) {
          return B && (B[ve] || B(m, _)) || Rt[ve].slice(0, ut);
        }, Be = function(B) {
          return T.s(D % 12 || 12, B, "0");
        }, Ve = h.meridiem || function(B, ve, Rt) {
          var ut = B < 12 ? "AM" : "PM";
          return Rt ? ut.toLowerCase() : ut;
        }, Te = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: R + 1, MM: T.s(R + 1, 2, "0"), MMM: pe(h.monthsShort, R, ye, 3), MMMM: pe(ye, R), D: this.$D, DD: T.s(this.$D, 2, "0"), d: String(this.$W), dd: pe(h.weekdaysMin, this.$W, q, 2), ddd: pe(h.weekdaysShort, this.$W, q, 3), dddd: q[this.$W], H: String(D), HH: T.s(D, 2, "0"), h: Be(1), hh: Be(2), a: Ve(D, L, !0), A: Ve(D, L, !1), m: String(L), mm: T.s(L, 2, "0"), s: String(this.$s), ss: T.s(this.$s, 2, "0"), SSS: T.s(this.$ms, 3, "0"), Z: b };
        return _.replace(oe, function(B, ve) {
          return ve || Te[B] || b.replace(":", "");
        });
      }, y.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, y.diff = function(p, m, h) {
        var _, b = T.p(m), D = N(p), L = (D.utcOffset() - this.utcOffset()) * r, R = this - D, q = T.m(this, D);
        return q = (_ = {}, _[w] = q / 12, _[c] = q, _[v] = q / 3, _[d] = (R - L) / 6048e5, _[f] = (R - L) / 864e5, _[u] = R / s, _[l] = R / r, _[a] = R / n, _)[b] || R, h ? q : T.a(q);
      }, y.daysInMonth = function() {
        return this.endOf(c).$D;
      }, y.$locale = function() {
        return $e[this.$L];
      }, y.locale = function(p, m) {
        if (!p)
          return this.$L;
        var h = this.clone(), _ = at(p, m, !0);
        return _ && (h.$L = _), h;
      }, y.clone = function() {
        return T.w(this.$d, this);
      }, y.toDate = function() {
        return new Date(this.valueOf());
      }, y.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, y.toISOString = function() {
        return this.$d.toISOString();
      }, y.toString = function() {
        return this.$d.toUTCString();
      }, g;
    }(), Tn = lt.prototype;
    return N.prototype = Tn, [["$ms", o], ["$s", a], ["$m", l], ["$H", u], ["$W", f], ["$M", c], ["$y", w], ["$D", O]].forEach(function(g) {
      Tn[g[1]] = function(y) {
        return this.$g(y, g[0], g[1]);
      };
    }), N.extend = function(g, y) {
      return g.$i || (g(y, lt, N), g.$i = !0), N;
    }, N.locale = at, N.isDayjs = zt, N.unix = function(g) {
      return N(1e3 * g);
    }, N.en = $e[Q], N.Ls = $e, N.p = {}, N;
  });
})($s);
const Os = ht, Or = /* @__PURE__ */ Li({
  __proto__: null,
  default: Os
}, [ht]), kn = {
  dayjs(e, t) {
    return Or(e).format(t);
  }
}, Me = function(e, t, n, r) {
  let s = e;
  if (t) {
    let o = t.split(".");
    for (let a of o)
      if (typeof s[a] < "u")
        s = s[a];
      else {
        s = null;
        break;
      }
  } else
    return typeof r == "object" && r.func ? kn[r.func].call(null, s, r.rule) : s;
  return n && s instanceof Array ? s.map((o) => Me(o, n, null, r)) : typeof r == "object" && r.func ? kn[r.func].call(null, s, r.rule) : s;
}, ln = function(e, t) {
  if (t && se(t) && t.y && t.y instanceof Array && t.y.length > 0) {
    let n = [];
    if (t.x && t.x.name && t.x.path) {
      n.push([t.x.name]);
      let r = Me(e, t.x.path, t.x.mapKey, t.x.format);
      r && r.forEach((s, o) => {
        n[o + 1] = [s];
      }), t.y.forEach((s) => {
        n[0].push(s.name);
        let o = Me(e, s.path, s.mapKey, s.format);
        o && o instanceof Array && o.forEach((a, l) => {
          n[l + 1] ? n[l + 1].push(a) : n[l + 1] = [a];
        });
      });
    } else
      t.y.forEach((r, s) => {
        let o = Me(e, r.path, r.mapKey, r.format);
        o && o instanceof Array && (s == 0 ? n.push([r.name]) : n[0].push(r.name), o.forEach((a, l) => {
          n[l + 1] ? n[l + 1].push(a) : n[l + 1] = [a];
        }));
      });
    return n;
  } else {
    if (t && se(t) && t.name && t.path)
      return {
        [t.name]: Me(e, t.path, t.mapKey, t.format)
      };
    if (t && t instanceof Array) {
      let n = {};
      return t.forEach((r) => {
        n[r.name] = Me(e, r.path, r.mapKey, r.format);
      }), n;
    } else
      return console.log("数据未处理"), e;
  }
}, Y = function(e) {
  if (typeof e == "string")
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
  else
    return e ? JSON.parse(JSON.stringify(e)) : {};
}, ws = function() {
  const e = function() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  };
  return e() + e() + e() + e() + e() + e() + e() + e();
};
let ae = {};
const xs = {
  add(e, t, n) {
    let r = t || 1e3, s = n || "id_" + new Date().getTime() + Math.floor(Math.random() * 1e3);
    return ae[s] && clearInterval(ae[s]), ae[s] = setInterval(e, r), s;
  },
  del(e) {
    if (e)
      ae[e] && (clearInterval(ae[e]), delete ae[e]);
    else {
      for (const t in ae)
        Object.hasOwnProperty.call(ae, t) && clearInterval(ae[t]);
      ae = {};
    }
  }
};
let le = {};
const Ss = {
  add(e, t, n) {
    let r = t || 1e3, s = n || "id_" + new Date().getTime() + Math.floor(Math.random() * 1e3);
    return le[s] && clearTimeout(le[s]), le[s] = setTimeout(e, r), s;
  },
  del(e) {
    if (e)
      le[e] && (clearTimeout(le[e]), delete le[e]);
    else {
      for (const t in le)
        Object.hasOwnProperty.call(le, t) && clearTimeout(le[t]);
      le = {};
    }
  }
}, Kt = function(e) {
  return e ? Object.keys(e).map(function(t) {
    return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
  }).join("&") : "";
}, ce = function(e, t, n) {
  if (e && e instanceof Array) {
    let r = t ? e.findIndex((s) => s[t] == n) : e.findIndex((s) => s == n);
    return r > -1 ? e.splice(r, 1) : !1;
  } else
    return !1;
}, wr = function(e, t = !0) {
  let n = location.href.slice(location.href.lastIndexOf("?")), r = {}, s = /([^?=&#]+)=([^?=&#]+)/g;
  return n.replace(s, (o, a, l) => r[a] = t ? decodeURIComponent(l) : l), e ? r[e] || "" : r;
}, As = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dayjs: Or,
  extractData: ln,
  getUrlParam: wr,
  guid: ws,
  interval: xs,
  jsonData: Y,
  jsonToParams: Kt,
  removeArray: ce,
  timeout: Ss
}, Symbol.toStringTag, { value: "Module" })), ge = new et(), x = {
  /**
   * 添加需要托管的eventObj对象事件
   * @param {string} eventName 事件名称
   * @param {function} fun 事件方法
   * @param {object} eventObj  委托对象
   */
  addEventListener(e, t, n = null) {
    ge.on(e, t, n);
  },
  /**
   * 删除托管的eventObj对象事件
   * @param {string} eventName 事件名称
   * @param {function} fun 委托对象
   * @param {object} eventObj  委托对象
   */
  removeEventListener(e, t, n) {
    n && t ? ge.off(e, t, n) : t ? ge.off(e, t) : ge.off(e);
  },
  /**
   * 清除所有
   */
  clear(e) {
    ge.removeAllListeners(e);
  },
  /**
   * 发送命令
   * @param {string} eventName 事件名称
   * @param {object} args 参数 
   * @param {boolean} force 强制发送
   */
  emit(e, t, n = !1) {
    if (typeof n == "boolean" && n)
      ge.emit(e, t);
    else if (_s(e)) {
      let r = arguments.length;
      if (r <= 3)
        ge.emit(e, t, n);
      else {
        let s = [];
        for (i = 1; i < r; i++)
          s[0] = arguments[i];
        ge.emit(e, ...s);
      }
    }
  },
  /**
   * 执行命令
   * @param {*} action 
   * @param {*} target 
   */
  execute(e, t = "") {
    let n = {
      target: t,
      data: Y(e)
    };
    this.emit(ze.ACTION, n);
  },
  /**
   * 消息提示
   */
  message(e) {
    this.emit("message-send", e);
  },
  /**
   * 执行元件内的cmdRunning方法
   * @param {string} id 元件id 
   * @param {*} data 
   */
  running(e, t) {
    this.emit("run_function_" + e, t);
  },
  /**
   * 执行数据更新
   * @param {string} target 目标对象id 
   * @param {*} value 数据值
   */
  reviewData(e, t) {
    this.emit(ze.ACTION, {
      data: {
        action: "reviewData",
        target: e,
        value: t
      }
    });
  }
}, j = {
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
let J = (e = 21) => {
  let t = "", n = crypto.getRandomValues(new Uint8Array(e));
  for (; e--; ) {
    let r = n[e] & 63;
    r < 36 ? t += r.toString(36) : r < 62 ? t += (r - 26).toString(36).toUpperCase() : r < 63 ? t += "_" : t += "-";
  }
  return t;
};
function ct(e, t, n, r) {
  e && e.getAttribute && e.getAttribute(t) && e.dispatchEvent(new CustomEvent(t, {
    detail: {
      component: n,
      value: r
    }
  }));
}
const Lt = {}, zn = {
  add(e) {
    e.id && (Lt[e.id] = e);
  },
  del(e) {
    e.id && delete Lt[e.id];
  },
  get items() {
    return Lt;
  }
}, Dt = {
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
      let e = typeof this.anim == "object" && this.anim.options ? this.anim.options : {};
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
        ...e
      };
    }
  },
  created() {
    this.AppSetup = j, zn.add(this), this.id && x.addEventListener(`run_function_${this.id}`, (e) => {
      this.cmdRunning && this.cmdRunning(e);
    });
  },
  mounted() {
    ct(this.$el, "timeout", this, "mounted"), ct(this.$el, "interval", this, "mounted");
  },
  beforeUnmount() {
    zn.del(this), this.id && x.removeEventListener(`run_function_${this.id}`), ct(this.$el, "timeout", this, "beforeUnmount"), ct(this.$el, "interval", this, "beforeUnmount");
  }
};
function Es() {
  this.__data__ = [], this.size = 0;
}
var Ds = Es;
function js(e, t) {
  return e === t || e !== e && t !== t;
}
var jt = js, Ts = jt;
function Cs(e, t) {
  for (var n = e.length; n--; )
    if (Ts(e[n][0], t))
      return n;
  return -1;
}
var Tt = Cs, Ms = Tt, Is = Array.prototype, Ps = Is.splice;
function ks(e) {
  var t = this.__data__, n = Ms(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : Ps.call(t, n, 1), --this.size, !0;
}
var zs = ks, Rs = Tt;
function Ls(e) {
  var t = this.__data__, n = Rs(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var Gs = Ls, Us = Tt;
function Ns(e) {
  return Us(this.__data__, e) > -1;
}
var qs = Ns, Fs = Tt;
function Hs(e, t) {
  var n = this.__data__, r = Fs(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var Ks = Hs, Bs = Ds, Vs = zs, Ws = Gs, Ys = qs, Js = Ks;
function Ne(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Ne.prototype.clear = Bs;
Ne.prototype.delete = Vs;
Ne.prototype.get = Ws;
Ne.prototype.has = Ys;
Ne.prototype.set = Js;
var Ct = Ne, Zs = Ct;
function Xs() {
  this.__data__ = new Zs(), this.size = 0;
}
var Qs = Xs;
function eo(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var to = eo;
function no(e) {
  return this.__data__.get(e);
}
var ro = no;
function io(e) {
  return this.__data__.has(e);
}
var so = io;
function oo(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Ee = oo, ao = it, lo = Ee, uo = "[object AsyncFunction]", co = "[object Function]", fo = "[object GeneratorFunction]", po = "[object Proxy]";
function ho(e) {
  if (!lo(e))
    return !1;
  var t = ao(e);
  return t == co || t == fo || t == uo || t == po;
}
var un = ho, yo = Ae, vo = yo["__core-js_shared__"], go = vo, Gt = go, Rn = function() {
  var e = /[^.]+$/.exec(Gt && Gt.keys && Gt.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function mo(e) {
  return !!Rn && Rn in e;
}
var bo = mo, _o = Function.prototype, $o = _o.toString;
function Oo(e) {
  if (e != null) {
    try {
      return $o.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var wo = Oo, xo = un, So = bo, Ao = Ee, Eo = wo, Do = /[\\^$.*+?()[\]{}|]/g, jo = /^\[object .+?Constructor\]$/, To = Function.prototype, Co = Object.prototype, Mo = To.toString, Io = Co.hasOwnProperty, Po = RegExp(
  "^" + Mo.call(Io).replace(Do, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function ko(e) {
  if (!Ao(e) || So(e))
    return !1;
  var t = xo(e) ? Po : jo;
  return t.test(Eo(e));
}
var zo = ko;
function Ro(e, t) {
  return e == null ? void 0 : e[t];
}
var Lo = Ro, Go = zo, Uo = Lo;
function No(e, t) {
  var n = Uo(e, t);
  return Go(n) ? n : void 0;
}
var cn = No, qo = cn, Fo = Ae, Ho = qo(Fo, "Map"), xr = Ho, Ko = cn, Bo = Ko(Object, "create"), Mt = Bo, Ln = Mt;
function Vo() {
  this.__data__ = Ln ? Ln(null) : {}, this.size = 0;
}
var Wo = Vo;
function Yo(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Jo = Yo, Zo = Mt, Xo = "__lodash_hash_undefined__", Qo = Object.prototype, ea = Qo.hasOwnProperty;
function ta(e) {
  var t = this.__data__;
  if (Zo) {
    var n = t[e];
    return n === Xo ? void 0 : n;
  }
  return ea.call(t, e) ? t[e] : void 0;
}
var na = ta, ra = Mt, ia = Object.prototype, sa = ia.hasOwnProperty;
function oa(e) {
  var t = this.__data__;
  return ra ? t[e] !== void 0 : sa.call(t, e);
}
var aa = oa, la = Mt, ua = "__lodash_hash_undefined__";
function ca(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = la && t === void 0 ? ua : t, this;
}
var fa = ca, da = Wo, pa = Jo, ha = na, ya = aa, va = fa;
function qe(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
qe.prototype.clear = da;
qe.prototype.delete = pa;
qe.prototype.get = ha;
qe.prototype.has = ya;
qe.prototype.set = va;
var ga = qe, Gn = ga, ma = Ct, ba = xr;
function _a() {
  this.size = 0, this.__data__ = {
    hash: new Gn(),
    map: new (ba || ma)(),
    string: new Gn()
  };
}
var $a = _a;
function Oa(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var wa = Oa, xa = wa;
function Sa(e, t) {
  var n = e.__data__;
  return xa(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var It = Sa, Aa = It;
function Ea(e) {
  var t = Aa(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var Da = Ea, ja = It;
function Ta(e) {
  return ja(this, e).get(e);
}
var Ca = Ta, Ma = It;
function Ia(e) {
  return Ma(this, e).has(e);
}
var Pa = Ia, ka = It;
function za(e, t) {
  var n = ka(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var Ra = za, La = $a, Ga = Da, Ua = Ca, Na = Pa, qa = Ra;
function Fe(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Fe.prototype.clear = La;
Fe.prototype.delete = Ga;
Fe.prototype.get = Ua;
Fe.prototype.has = Na;
Fe.prototype.set = qa;
var Sr = Fe, Fa = Ct, Ha = xr, Ka = Sr, Ba = 200;
function Va(e, t) {
  var n = this.__data__;
  if (n instanceof Fa) {
    var r = n.__data__;
    if (!Ha || r.length < Ba - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new Ka(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var Wa = Va, Ya = Ct, Ja = Qs, Za = to, Xa = ro, Qa = so, el = Wa;
function He(e) {
  var t = this.__data__ = new Ya(e);
  this.size = t.size;
}
He.prototype.clear = Ja;
He.prototype.delete = Za;
He.prototype.get = Xa;
He.prototype.has = Qa;
He.prototype.set = el;
var tl = He, nl = cn, rl = function() {
  try {
    var e = nl(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Ar = rl, Un = Ar;
function il(e, t, n) {
  t == "__proto__" && Un ? Un(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var fn = il, sl = fn, ol = jt;
function al(e, t, n) {
  (n !== void 0 && !ol(e[t], n) || n === void 0 && !(t in e)) && sl(e, t, n);
}
var Er = al;
function ll(e) {
  return function(t, n, r) {
    for (var s = -1, o = Object(t), a = r(t), l = a.length; l--; ) {
      var u = a[e ? l : ++s];
      if (n(o[u], u, o) === !1)
        break;
    }
    return t;
  };
}
var ul = ll, cl = ul, fl = cl(), dl = fl, yt = {}, pl = {
  get exports() {
    return yt;
  },
  set exports(e) {
    yt = e;
  }
};
(function(e, t) {
  var n = Ae, r = t && !t.nodeType && t, s = r && !0 && e && !e.nodeType && e, o = s && s.exports === r, a = o ? n.Buffer : void 0, l = a ? a.allocUnsafe : void 0;
  function u(f, d) {
    if (d)
      return f.slice();
    var c = f.length, v = l ? l(c) : new f.constructor(c);
    return f.copy(v), v;
  }
  e.exports = u;
})(pl, yt);
var hl = Ae, yl = hl.Uint8Array, vl = yl, Nn = vl;
function gl(e) {
  var t = new e.constructor(e.byteLength);
  return new Nn(t).set(new Nn(e)), t;
}
var ml = gl, bl = ml;
function _l(e, t) {
  var n = t ? bl(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var $l = _l;
function Ol(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var wl = Ol, xl = Ee, qn = Object.create, Sl = function() {
  function e() {
  }
  return function(t) {
    if (!xl(t))
      return {};
    if (qn)
      return qn(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), Al = Sl, El = Object.prototype;
function Dl(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || El;
  return e === n;
}
var Dr = Dl, jl = Al, Tl = _r, Cl = Dr;
function Ml(e) {
  return typeof e.constructor == "function" && !Cl(e) ? jl(Tl(e)) : {};
}
var Il = Ml, Pl = it, kl = Ue, zl = "[object Arguments]";
function Rl(e) {
  return kl(e) && Pl(e) == zl;
}
var Ll = Rl, Fn = Ll, Gl = Ue, jr = Object.prototype, Ul = jr.hasOwnProperty, Nl = jr.propertyIsEnumerable, ql = Fn(function() {
  return arguments;
}()) ? Fn : function(e) {
  return Gl(e) && Ul.call(e, "callee") && !Nl.call(e, "callee");
}, Tr = ql, Fl = Array.isArray, st = Fl, Hl = 9007199254740991;
function Kl(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Hl;
}
var Cr = Kl, Bl = un, Vl = Cr;
function Wl(e) {
  return e != null && Vl(e.length) && !Bl(e);
}
var dn = Wl, Yl = dn, Jl = Ue;
function Zl(e) {
  return Jl(e) && Yl(e);
}
var Xl = Zl, tt = {}, Ql = {
  get exports() {
    return tt;
  },
  set exports(e) {
    tt = e;
  }
};
function eu() {
  return !1;
}
var tu = eu;
(function(e, t) {
  var n = Ae, r = tu, s = t && !t.nodeType && t, o = s && !0 && e && !e.nodeType && e, a = o && o.exports === s, l = a ? n.Buffer : void 0, u = l ? l.isBuffer : void 0, f = u || r;
  e.exports = f;
})(Ql, tt);
var nu = it, ru = Cr, iu = Ue, su = "[object Arguments]", ou = "[object Array]", au = "[object Boolean]", lu = "[object Date]", uu = "[object Error]", cu = "[object Function]", fu = "[object Map]", du = "[object Number]", pu = "[object Object]", hu = "[object RegExp]", yu = "[object Set]", vu = "[object String]", gu = "[object WeakMap]", mu = "[object ArrayBuffer]", bu = "[object DataView]", _u = "[object Float32Array]", $u = "[object Float64Array]", Ou = "[object Int8Array]", wu = "[object Int16Array]", xu = "[object Int32Array]", Su = "[object Uint8Array]", Au = "[object Uint8ClampedArray]", Eu = "[object Uint16Array]", Du = "[object Uint32Array]", I = {};
I[_u] = I[$u] = I[Ou] = I[wu] = I[xu] = I[Su] = I[Au] = I[Eu] = I[Du] = !0;
I[su] = I[ou] = I[mu] = I[au] = I[bu] = I[lu] = I[uu] = I[cu] = I[fu] = I[du] = I[pu] = I[hu] = I[yu] = I[vu] = I[gu] = !1;
function ju(e) {
  return iu(e) && ru(e.length) && !!I[nu(e)];
}
var Tu = ju;
function Cu(e) {
  return function(t) {
    return e(t);
  };
}
var Mu = Cu, vt = {}, Iu = {
  get exports() {
    return vt;
  },
  set exports(e) {
    vt = e;
  }
};
(function(e, t) {
  var n = mr, r = t && !t.nodeType && t, s = r && !0 && e && !e.nodeType && e, o = s && s.exports === r, a = o && n.process, l = function() {
    try {
      var u = s && s.require && s.require("util").types;
      return u || a && a.binding && a.binding("util");
    } catch {
    }
  }();
  e.exports = l;
})(Iu, vt);
var Pu = Tu, ku = Mu, Hn = vt, Kn = Hn && Hn.isTypedArray, zu = Kn ? ku(Kn) : Pu, Mr = zu;
function Ru(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var Ir = Ru, Lu = fn, Gu = jt, Uu = Object.prototype, Nu = Uu.hasOwnProperty;
function qu(e, t, n) {
  var r = e[t];
  (!(Nu.call(e, t) && Gu(r, n)) || n === void 0 && !(t in e)) && Lu(e, t, n);
}
var Fu = qu, Hu = Fu, Ku = fn;
function Bu(e, t, n, r) {
  var s = !n;
  n || (n = {});
  for (var o = -1, a = t.length; ++o < a; ) {
    var l = t[o], u = r ? r(n[l], e[l], l, n, e) : void 0;
    u === void 0 && (u = e[l]), s ? Ku(n, l, u) : Hu(n, l, u);
  }
  return n;
}
var Vu = Bu;
function Wu(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var Yu = Wu, Ju = 9007199254740991, Zu = /^(?:0|[1-9]\d*)$/;
function Xu(e, t) {
  var n = typeof e;
  return t = t ?? Ju, !!t && (n == "number" || n != "symbol" && Zu.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Pr = Xu, Qu = Yu, ec = Tr, tc = st, nc = tt, rc = Pr, ic = Mr, sc = Object.prototype, oc = sc.hasOwnProperty;
function ac(e, t) {
  var n = tc(e), r = !n && ec(e), s = !n && !r && nc(e), o = !n && !r && !s && ic(e), a = n || r || s || o, l = a ? Qu(e.length, String) : [], u = l.length;
  for (var f in e)
    (t || oc.call(e, f)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (f == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (f == "offset" || f == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (f == "buffer" || f == "byteLength" || f == "byteOffset") || // Skip index properties.
    rc(f, u))) && l.push(f);
  return l;
}
var lc = ac;
function uc(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var cc = uc, fc = Ee, dc = Dr, pc = cc, hc = Object.prototype, yc = hc.hasOwnProperty;
function vc(e) {
  if (!fc(e))
    return pc(e);
  var t = dc(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !yc.call(e, r)) || n.push(r);
  return n;
}
var gc = vc, mc = lc, bc = gc, _c = dn;
function $c(e) {
  return _c(e) ? mc(e, !0) : bc(e);
}
var kr = $c, Oc = Vu, wc = kr;
function xc(e) {
  return Oc(e, wc(e));
}
var Sc = xc, Bn = Er, Ac = yt, Ec = $l, Dc = wl, jc = Il, Vn = Tr, Wn = st, Tc = Xl, Cc = tt, Mc = un, Ic = Ee, Pc = se, kc = Mr, Yn = Ir, zc = Sc;
function Rc(e, t, n, r, s, o, a) {
  var l = Yn(e, n), u = Yn(t, n), f = a.get(u);
  if (f) {
    Bn(e, n, f);
    return;
  }
  var d = o ? o(l, u, n + "", e, t, a) : void 0, c = d === void 0;
  if (c) {
    var v = Wn(u), w = !v && Cc(u), O = !v && !w && kc(u);
    d = u, v || w || O ? Wn(l) ? d = l : Tc(l) ? d = Dc(l) : w ? (c = !1, d = Ac(u, !0)) : O ? (c = !1, d = Ec(u, !0)) : d = [] : Pc(u) || Vn(u) ? (d = l, Vn(l) ? d = zc(l) : (!Ic(l) || Mc(l)) && (d = jc(u))) : c = !1;
  }
  c && (a.set(u, d), s(d, u, r, o, a), a.delete(u)), Bn(e, n, d);
}
var Lc = Rc, Gc = tl, Uc = Er, Nc = dl, qc = Lc, Fc = Ee, Hc = kr, Kc = Ir;
function zr(e, t, n, r, s) {
  e !== t && Nc(t, function(o, a) {
    if (s || (s = new Gc()), Fc(o))
      qc(e, t, a, n, zr, r, s);
    else {
      var l = r ? r(Kc(e, a), o, a + "", e, t, s) : void 0;
      l === void 0 && (l = o), Uc(e, a, l);
    }
  }, Hc);
}
var Bc = zr;
function Vc(e) {
  return e;
}
var Rr = Vc;
function Wc(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, n[0]);
    case 2:
      return e.call(t, n[0], n[1]);
    case 3:
      return e.call(t, n[0], n[1], n[2]);
  }
  return e.apply(t, n);
}
var Yc = Wc, Jc = Yc, Jn = Math.max;
function Zc(e, t, n) {
  return t = Jn(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, s = -1, o = Jn(r.length - t, 0), a = Array(o); ++s < o; )
      a[s] = r[t + s];
    s = -1;
    for (var l = Array(t + 1); ++s < t; )
      l[s] = r[s];
    return l[t] = n(a), Jc(e, this, l);
  };
}
var Xc = Zc;
function Qc(e) {
  return function() {
    return e;
  };
}
var ef = Qc, tf = ef, Zn = Ar, nf = Rr, rf = Zn ? function(e, t) {
  return Zn(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: tf(t),
    writable: !0
  });
} : nf, sf = rf, of = 800, af = 16, lf = Date.now;
function uf(e) {
  var t = 0, n = 0;
  return function() {
    var r = lf(), s = af - (r - n);
    if (n = r, s > 0) {
      if (++t >= of)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var cf = uf, ff = sf, df = cf, pf = df(ff), hf = pf, yf = Rr, vf = Xc, gf = hf;
function mf(e, t) {
  return gf(vf(e, t, yf), e + "");
}
var bf = mf, _f = jt, $f = dn, Of = Pr, wf = Ee;
function xf(e, t, n) {
  if (!wf(n))
    return !1;
  var r = typeof t;
  return (r == "number" ? $f(n) && Of(t, n.length) : r == "string" && t in n) ? _f(n[t], e) : !1;
}
var Sf = xf, Af = bf, Ef = Sf;
function Df(e) {
  return Af(function(t, n) {
    var r = -1, s = n.length, o = s > 1 ? n[s - 1] : void 0, a = s > 2 ? n[2] : void 0;
    for (o = e.length > 3 && typeof o == "function" ? (s--, o) : void 0, a && Ef(n[0], n[1], a) && (o = s < 3 ? void 0 : o, s = 1), t = Object(t); ++r < s; ) {
      var l = n[r];
      l && e(t, l, r, o);
    }
    return t;
  });
}
var jf = Df, Tf = Bc, Cf = jf, Mf = Cf(function(e, t, n) {
  Tf(e, t, n);
}), Lr = Mf;
const H = {}, gt = k({}), Xn = function(e) {
  if (e.name)
    if (H[e.name])
      console.warn("重复组件名:" + e.name);
    else {
      let t = Lr({}, Dt, e);
      H[e.name] = t, gt[t.name] = {
        name: t.name,
        type: t.type,
        label: t.label,
        icon: t.icon
      }, nt.vm ? nt.vm.component(e.name, H[e.name]) : console.error("组件注册失败，缺少app");
    }
  else
    console.warn("缺少组件名");
}, If = function(e) {
  Array.isArray(e) ? e.forEach((t) => {
    H[t] && (delete H[t], delete gt[t]);
  }) : e && typeof e == "string" && H[e] && (delete H[e], delete gt[e]);
}, Pf = function() {
  return Object.values(H);
}, Ut = function(e) {
  e instanceof Array ? e.forEach((t) => {
    Xn(t);
  }) : typeof e == "object" && Xn(e);
}, kf = function() {
  Object.values(H).forEach((t) => {
    nt.vm ? (H[t.name] = Lr({}, Dt, t), nt.vm.component(t.name, H[t.name])) : console.error("组件注册失败，缺少app");
  });
}, zf = [
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
], ot = {
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
    return zf;
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
var Ce = [];
const Ke = {
  // 当前已安装组件
  get items() {
    return gt;
  },
  getComponentItems: Pf,
  // 返回组件默认数据
  getComponentDefaultData(e) {
    let t = H[e];
    if (!t)
      return {};
    let n = {}, r = t.mixins || [], s = {};
    for (const o of r)
      o.props && Object.assign(s, o.props);
    Object.assign(s, t.props);
    for (const o in s)
      if (Object.hasOwnProperty.call(s, o)) {
        const a = s[o];
        typeof a.default == "function" ? n[o] = a.default.call() : n[o] = a.default;
      }
    return n.id = "sprite_" + J(10), n.name = e, n.type = t.type || "", n;
  },
  // 返回组件自定义事件
  getComponentEvents(e) {
    let t = H[e];
    if (!t)
      return [];
    let n = [], r = t.emits || [];
    for (const s in r)
      n.push({
        name: r[s],
        event: r[s],
        pams: "",
        actions: /^solo-/.test(e) ? null : []
      });
    return n;
  },
  // 返回组件事件（含默认事件）
  getEvents(e) {
    return [...ot.events, ...this.getComponentEvents(e)];
  },
  // 添加组件
  add(e) {
    if (e)
      if (Array.isArray(e))
        e.forEach((t) => {
          Ce.find((n) => n.name == t.name) ? console.warn(t.name + "组件名重复") : Ce.push(t);
        });
      else
        return Ce.find((t) => t.name == e.name) ? (console.warn(e.name + "组件名重复"), !1) : (Ce.push(e), !0);
  },
  // 删除所有组件
  removeAll() {
    Ce = [], If(Object.keys(H));
  },
  // 安装组件
  install(e) {
    e ? Array.isArray(e) ? e.forEach((t) => {
      this.add(t) && Ut(t);
    }) : this.add(e) && Ut(e) : Ut(Ce);
  },
  reload() {
    kf();
  }
}, fe = {}, E = k({}), A = {}, S = {}, ue = k({}), be = {};
let Rf = 1, Lf = 1, Qn = 1;
const er = function(e, t = {}) {
  let n = Ke.getComponentDefaultData(e), r = n.title, s = {
    id: null,
    gpid: null,
    mid: null,
    name: n.name,
    type: n.type,
    title: r ? r + Qn++ : "元件 " + Qn++,
    x: n.x || 0,
    y: n.y || 0,
    width: n.width || 0,
    height: n.height || 0,
    data: n.data || "",
    opacity: n.opacity || 100,
    visible: n.visible || !0,
    selected: n.selected || !1,
    hover: n.hover || !1,
    background: n.background,
    border: n.border,
    shadow: n.shadow,
    anim: n.anim || {}
  };
  return Object.assign(s, t), s.id || (s.id = "sprite_" + J(10)), s;
}, tr = function(e, t) {
  let n = k({});
  return typeof e == "string" && Ke.items[e] ? (Object.assign(n, er(e, t)), S[n.id] = n, fe[n.id] = n, n) : typeof e == "object" ? e.id && S[e.id] ? (t ? Object.assign(S[e.id], t) : console.warn("元件" + e.id + "已存在"), S[e.id]) : e.name ? (Object.assign(n, er(e.name, e)), S[n.id] = n, fe[n.id] = n, S[n.id]) : (console.error("元件添加失败", e), null) : null;
}, Gr = function(e) {
  return S[e] ? (delete S[e], delete fe[e], e) : !1;
}, nr = function(e = {}) {
  let t = {
    type: "content",
    name: "vx-module",
    title: "页面" + Rf++,
    x: 0,
    y: 0,
    components: []
  };
  return Object.assign(t, e), t.id || (t.id = "mdu_" + J(10)), t;
}, Ze = function(e, t) {
  if (e)
    return E[e] || (E[e] = nr(Object.assign({ id: e }, t)), fe[e] = E[e]), E[e].components || (E[e].components = []), E[e];
  if (t) {
    let n = nr(t);
    return E[n.id] = n, fe[n.id] = E[n.id], E[n.id];
  } else
    return null;
}, Ur = function(e) {
  return E[e] ? (delete E[e], delete fe[e], e) : !1;
}, rr = function(e = {}) {
  let t = k({
    id: null,
    gpid: null,
    mid: null,
    name: "vx-sprite-group",
    type: "group",
    title: "组合" + Lf++,
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
  return Object.assign(t, e), t.id || (t.id = "group_" + J(10)), t;
}, Bt = function(e, t) {
  if (e)
    return A[e] ? Object.assign(A[e], t) : (A[e] = rr(Object.assign({ id: e }, t)), fe[e] = A[e]), A[e];
  {
    let n = rr(t);
    return A[n.id] = n, fe[n.id] = n, A[n.id];
  }
}, Nr = function(e) {
  return A[e] ? (delete A[e], delete fe[e], e) : !1;
}, F = function(e) {
  let t = {
    id: null,
    gpid: null,
    mid: null,
    visible: null,
    name: null,
    type: null,
    zIndex: null
  };
  for (const n in t)
    Object.hasOwnProperty.call(t, n) && (t[n] = e[n] || null);
  return t;
}, qr = function(e) {
  return E[e].components && E[e].components.length > 0 && E[e].components.map((n) => ({
    id: n.id,
    zIndex: n.zIndex
  })).sort((n, r) => r.zIndex - n.zIndex)[0].zIndex || 0;
}, re = k({}), Pe = function(e) {
  if (e && typeof e == "object") {
    let t = e.id = e.id || "AC_" + J(10);
    return re[t] = e, t;
  } else
    return null;
}, Vt = function(e) {
  re[e] && delete re[e];
}, Gf = function(e) {
  return re[e];
}, Uf = function() {
  return re;
}, De = function(e) {
  if (e) {
    let t = [];
    if (e instanceof Array)
      for (const n in e)
        t.push(re[e[n]]);
    else
      typeof e == "string" && re[e] && t.push(re[e]);
    return t;
  } else
    return Object.values(re);
}, pn = function() {
  Object.keys(re).forEach((t) => {
    delete re[t];
  });
}, Nf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clearAction: pn,
  delActionData: Vt,
  getActionData: Gf,
  getActionList: De,
  getActionsData: Uf,
  setActionData: Pe
}, Symbol.toStringTag, { value: "Module" }));
function qf(e, t) {
  let n = t.id;
  return {
    style: {
      cursor: j.clickCursor
    },
    onClickCapture: function(r) {
      if (x.emit(z.CLICK_SPRITE, F(t), r), e.actions) {
        let s = Y(De(e.actions));
        e.actionValue && typeof e.actionValue == "object" && s.forEach((o) => {
          e.actionValue[o.id] && (o.value = e.actionValue[o.id]);
        }), x.execute(s, n);
      }
    }
  };
}
const ir = function(e, t, n) {
  let r = Y(De(e));
  for (let s = 0, o = r.length; s < o; s++)
    n && r[s].value && typeof r[s].value == "object" ? Object.assign(r[s].value, n) : n && (r[s].value = n);
  x.execute(r, t);
};
function Ff(e, t, n) {
  let r = {};
  if (n && H[n]) {
    let o = (H[n].emits || []).find((a) => a == e.event);
    o && typeof o == "string" ? /^[a-zA-Z][-_a-zA-Z0-9_-]{1,32}$/.test(o) ? r["on" + o.toLowerCase().replace(/( |^)[a-z]/g, (a) => a.toUpperCase())] = function(a) {
      /^solo-/.test(o) && a ? e.actions && e.actions instanceof Array && e.actions.length > 0 ? ir(e.actions, t, a) : x.execute(Y(De(a)), t) : e.actions && e.actions instanceof Array && ir(e.actions, t, a);
    } : console.warn(o + "无效的事件名定义") : console.warn(e.event + "事件没有定义");
  }
  return r;
}
function Hf(e, t) {
  let n = null;
  return {
    timeout: "1",
    onTimeout(r) {
      let s = r.detail.value;
      if (n && (clearTimeout(n), n = null), s == "mounted") {
        let a = (e.pams || {}).delay || 1e3;
        n = setTimeout(() => {
          e.actions && x.execute(De(e.actions), t);
        }, parseInt(a));
      }
    }
  };
}
let he = {};
const mt = {
  add(e, t = 1e3, n) {
    let r = n || "it_" + J(7);
    return he[r] && clearInterval(he[r]), he[r] = setInterval(e, t), r;
  },
  del(e) {
    if (e)
      he[e] && (clearInterval(he[e]), delete he[e]);
    else {
      for (const t in he)
        clearInterval(he[t]);
      he = {};
    }
  }
};
function Kf(e, t) {
  let n = null;
  return {
    interval: "1",
    onInterval(r) {
      if (n && (mt.del(n), n = null), r.detail.value == "mounted") {
        let o = (e.pams || {}).delay || 1e3;
        n = mt.add(() => {
          e.actions && x.execute(De(e.actions), t);
        }, parseInt(o));
      }
    }
  };
}
function sr(e, t = {}, n = "") {
  let r = {}, s = t.id;
  return n && (r = {
    style: {}
  }), j.interaction ? e.forEach((o) => {
    switch (o.event) {
      case "click":
        Object.assign(r, qf(o, t));
        break;
      case "timeout":
        Object.assign(r, Hf(o, s));
        break;
      case "interval":
        Object.assign(r, Kf(o, s));
        break;
      default:
        Object.assign(r, Ff(o, s, n));
    }
  }) : t.type == "group" && !t.gpid ? Object.assign(r, {
    onClickCapture(o) {
      o.stopPropagation(), x.emit(z.CLICK_SPRITE, F(t), o);
    },
    onDblclickCapture(o) {
      o.stopPropagation(), x.emit(z.DBLCLICK_SPRITE, F(t), o);
    },
    onMousedownCapture(o) {
      x.emit(z.MOUSEDOWN_SPRITE, F(t), o);
    },
    onMouseoverCapture(o) {
      x.emit(z.MOUSEOVER_SPRITE, F(t), o);
    },
    onMouseoutCapture(o) {
      x.emit(z.MOUSEOUT_SPRITE, F(t), o);
    },
    onMouseupCapture(o) {
      x.emit(z.MOUSEUP_SPRITE, F(t), o);
    },
    onMouseleaveCapture(o) {
      x.emit(z.MOUSELEAVE_SPRITE, F(t), o);
    },
    onMouseenterCapture(o) {
      x.emit(z.MOUSEENTER_SPRITE, F(t), o);
    }
  }) : Object.assign(r, {
    onClick(o) {
      o.stopPropagation(), x.emit(z.CLICK_SPRITE, F(t), o);
    },
    onMousedown(o) {
      x.emit(z.MOUSEDOWN_SPRITE, F(t), o);
    },
    onMouseover(o) {
      x.emit(z.MOUSEOVER_SPRITE, F(t), o);
    },
    onMouseout(o) {
      x.emit(z.MOUSEOUT_SPRITE, F(t), o);
    },
    onMouseup(o) {
      x.emit(z.MOUSEUP_SPRITE, F(t), o);
    },
    onMouseleave(o) {
      x.emit(z.MOUSELEAVE_SPRITE, F(t), o);
    },
    onMouseenter(o) {
      x.emit(z.MOUSEENTER_SPRITE, F(t), o);
    }
  }), r;
}
const Bf = function(e) {
  return e && typeof e == "object" ? e.id ? E[e.id] ? (console.warn("模块" + e.id + "已存在"), null) : Ze(e.id, e) : Ze(null, e) : typeof e == "string" ? E[e] ? (console.warn("模块" + e + "已存在"), null) : Ze(e) : Ze();
}, hn = function(e, t = "default") {
  t && e && typeof e != "string" && (E[t] && E[t].components ? E[t].components.push(e) : console.warn("模块添加元件数据失败"));
}, yn = function(e, t = "default") {
  return t && e ? E[t] && E[t].components ? ce(E[t].components, "id", e) : (console.warn("模块删除元件数据失败"), !1) : (console.warn("mid && id 无效"), !1);
}, Vf = function(e) {
  return Ur(e);
}, Wf = function(e) {
  return E[e] || null;
}, Yf = function() {
  return E;
}, Jf = function(e, t = "type") {
  if (e) {
    let n = Object.values(E);
    return typeof e == "string" ? n.filter((r) => r[t] == e) : typeof e == "function" ? n.filter((r) => e(r)) : n;
  } else
    return Object.values(E);
}, Fr = function(e = "default") {
  return E[e] && E[e].components ? E[e].components : [];
}, Zf = function() {
  Object.keys(E).forEach((t) => {
    Ur(t);
  });
}, Hr = function(e, t = {}) {
  let n = Object.assign({
    id: e.id,
    gpid: e.gpid,
    mid: e.mid,
    visible: e.visible,
    name: e.name,
    title: e.title,
    type: e.type,
    zIndex: e.zIndex
  }, t);
  return ue[n.id] = n, ue[n.id];
}, Kr = function(e, t = "default") {
  if (e && typeof e == "object" && e.id && A[e.id])
    return console.warn("组合" + e.id + "已存在"), null;
  let n = null;
  e ? n = Bt(e.id, Object.assign({ mid: t }, e)) : n = Bt(null, { mid: t }), n.zIndex || (n.zIndex = qr(t) + 1);
  let r = Hr(n);
  return hn(r, n.mid), be[n.id] = rt(n, (s) => {
    ue[s.id] && Object.keys(ue[s.id]).forEach((a) => {
      ue[s.id][a] = s[a];
    });
  }), n;
}, vn = function(e, t) {
  t && e && typeof e != "string" && (A[t] && A[t].components ? A[t].components.push(e) : console.warn("模块添加元件数据失败"));
}, Br = function(e, t) {
  let n = !1;
  return t && e && A[t] && A[t].components && (n = ce(A[t].components, "id", e)), n || console.warn("模块删除元件数据失败"), n;
}, Xf = function(e, t = "default") {
  if (Array.isArray(e)) {
    let n = { x1: 0, y1: 0, x2: 0, y2: 0 }, r = Fr(t), s = [], o = [], a = [];
    if (e.forEach((u, f) => {
      let d = r.find((v) => v.id == u), c = d ? d.type == "group" ? A[u] : S[u] : null;
      if (c)
        if (f == 0 ? (n.x1 = c.x, n.y1 = c.y, n.x2 = c.x + c.width, n.y2 = c.y + c.height) : (n.x1 = c.x < n.x1 ? c.x : n.x1, n.y1 = c.y < n.y1 ? c.y : n.y1, n.x2 = c.x + c.width > n.x2 ? c.x + c.width : n.x2, n.y2 = c.y + c.height > n.y2 ? c.y + c.height : n.y2), c.type == "group") {
          let v = c.components ? c.components.map((w) => w.id) : [];
          o.push(...v), s.push(c.id);
        } else
          o.push(u);
      else
        a.push(u);
    }), a.length > 0)
      return console.warn(a.join(), "元件无法组合"), !1;
    s.length > 0 && s.forEach((u) => {
      Vr(u);
    }), gn(e, !1);
    let l = Kr({
      x: n.x1,
      y: n.y1,
      width: n.x2 - n.x1,
      height: n.y2 - n.y1
    }, t);
    return l ? (e.forEach((u) => {
      S[u] && (S[u].x -= n.x1, S[u].y -= n.y1, S[u].gpid = l.id, S[u].hover = !1, S[u].selected = !1, vn(Xr(S[u]), l.id));
    }), l) : !1;
  } else
    return !1;
}, Vr = function(e) {
  return e && A[e] && A[e].components && yn(A[e].id, A[e].mid) ? (be[e] && typeof be[e] == "function" && be[e](), A[e].components.forEach((t) => {
    S[t.id].x += A[e].x, S[t.id].y += A[e].y, S[t.id].gpid = null, hn(t, t.mid);
  }), Nr(e)) : !1;
}, Wr = function(e) {
  return A[e] || null;
}, Yr = function() {
  return A;
}, Jr = function() {
  return Object.values(A);
}, Zr = function() {
  Object.keys(A).forEach((t) => {
    Nr(t);
  });
}, Qf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addElement: vn,
  bind: Xf,
  clearGroupsData: Zr,
  createSimpleGroup: Hr,
  delElement: Br,
  getGroup: Wr,
  getGroupArrData: Jr,
  getGroups: Yr,
  newGroupData: Kr,
  unbind: Vr
}, Symbol.toStringTag, { value: "Module" })), or = function(e, t = !0) {
  if (S[e] && S[e].mid) {
    let n = yn(e, S[e].mid);
    return t && Gr(e), n && be[e] && typeof be[e] == "function" && be[e](), !!n;
  } else
    console.warn("删除模块内元件失败");
  return !1;
}, ed = function(e) {
  Object.keys(e).forEach((n) => {
    delete e[n];
  });
}, td = function(e) {
  if (!e)
    return console.warn("添加元件失败,无数据信息"), !1;
  if (!e.mid)
    return console.warn("添加元件失败,无模块id" + mid), !1;
  e.zIndex || (e.zIndex = qr(e.mid) + 1);
  let t = Xr(e);
  if (e.gpid && Bt(e.gpid))
    vn(t, e.gpid);
  else if (Ze(e.mid))
    hn(t, e.mid);
  else
    return console.warn("添加元件失败", t), !1;
  return be[e.id] = rt(e, (n) => {
    ue[n.id] && Object.keys(ue[n.id]).forEach((s) => {
      ue[n.id][s] = n[s];
    });
  }), S[e.id];
}, Xr = function(e, t = {}) {
  let n = Object.assign({
    id: e.id,
    gpid: e.gpid,
    mid: e.mid,
    visible: e.visible,
    name: e.name,
    title: e.title,
    type: e.type,
    zIndex: e.zIndex
  }, t);
  return ue[n.id] = n, ue[n.id];
}, nd = function(e, t = "default", n = null) {
  let r = null;
  if (typeof e == "string" && typeof t == "object" ? r = tr(e, t) : typeof e == "object" && (r = tr(e, { mid: t, gpid: n })), td(r))
    return S[r.id];
  throw "添加元件失败";
}, gn = function(e, t = !0) {
  if (e) {
    if (Array.isArray(e))
      return e.forEach((n) => {
        or(n, t);
      }), !0;
    if (typeof e == "string")
      return or(e, t);
  }
  return !1;
}, rd = function() {
  return S;
}, id = function(e) {
  let t = Object.values(S);
  return e ? t.filter((n) => n.mid == e) : t;
}, sd = function(e) {
  return S[e] ? (Object.assign(S[e], Object.assign({}, Ke.getComponentDefaultData(S[e].name), S[e])), S[e]) : null;
}, od = function() {
  Object.keys(S).forEach((t) => {
    ed(S[t]), Gr(t);
  });
}, Wt = Bf, ad = Vf, ld = Yf, ud = Wf, mn = Jf, Qr = Fr, ei = Zf, bt = nd, cd = gn, ti = rd, bn = id, ie = sd, ni = od, _n = Qf, _t = Wr, ri = Yr, ii = Jr, si = Zr, oi = function(e) {
  if (S[e])
    return gn(e);
  if (A[e] && Array.isArray(A[e].components) && A[e].components.length > 0)
    return A[e].components.forEach((t) => {
      oi(t.id);
    }), A[e].gpid ? Br(e) : yn(e, A[e].mid);
}, ai = function(e) {
  Array.isArray(e) && e.length > 0 ? e.forEach((t) => {
    if (typeof t == "object") {
      let n = [];
      t.components && (n = t.components, delete t.components), Wt(t), n.forEach((r) => {
        if (r.type == "group") {
          let s = [];
          r.components && (s = r.components, delete r.components), _n.newGroupData(r, t.id), s.forEach((o) => {
            bt(o, t.id, o.gpid);
          });
        } else
          bt(r, t.id);
      });
    }
  }) : Wt({ id: "default" });
}, $n = function() {
  ni(), si(), ei();
}, fd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addSpriteData: bt,
  clearGroupsData: si,
  clearModulesData: ei,
  clearSprites: $n,
  clearSpritesData: ni,
  delElementData: oi,
  delModuleData: ad,
  delSpriteData: cd,
  elements: fe,
  fillData: ai,
  getGroup: _t,
  getGroupArrData: ii,
  getGroups: ri,
  getModule: ud,
  getModuleComponents: Qr,
  getModuleList: mn,
  getModules: ld,
  getSpriteArrData: bn,
  getSpriteData: ie,
  getSpritesData: ti,
  group: _n,
  newMouleData: Wt
}, Symbol.toStringTag, { value: "Module" }));
var dd = it, pd = Ue, hd = "[object Symbol]";
function yd(e) {
  return typeof e == "symbol" || pd(e) && dd(e) == hd;
}
var On = yd, vd = st, gd = On, md = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, bd = /^\w*$/;
function _d(e, t) {
  if (vd(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || gd(e) ? !0 : bd.test(e) || !md.test(e) || t != null && e in Object(t);
}
var $d = _d, li = Sr, Od = "Expected a function";
function wn(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Od);
  var n = function() {
    var r = arguments, s = t ? t.apply(this, r) : r[0], o = n.cache;
    if (o.has(s))
      return o.get(s);
    var a = e.apply(this, r);
    return n.cache = o.set(s, a) || o, a;
  };
  return n.cache = new (wn.Cache || li)(), n;
}
wn.Cache = li;
var wd = wn, xd = wd, Sd = 500;
function Ad(e) {
  var t = xd(e, function(r) {
    return n.size === Sd && n.clear(), r;
  }), n = t.cache;
  return t;
}
var Ed = Ad, Dd = Ed, jd = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Td = /\\(\\)?/g, Cd = Dd(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(jd, function(n, r, s, o) {
    t.push(s ? o.replace(Td, "$1") : r || n);
  }), t;
}), Md = Cd;
function Id(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, s = Array(r); ++n < r; )
    s[n] = t(e[n], n, e);
  return s;
}
var Pd = Id, ar = an, kd = Pd, zd = st, Rd = On, Ld = 1 / 0, lr = ar ? ar.prototype : void 0, ur = lr ? lr.toString : void 0;
function ui(e) {
  if (typeof e == "string")
    return e;
  if (zd(e))
    return kd(e, ui) + "";
  if (Rd(e))
    return ur ? ur.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Ld ? "-0" : t;
}
var Gd = ui, Ud = Gd;
function Nd(e) {
  return e == null ? "" : Ud(e);
}
var qd = Nd, Fd = st, Hd = $d, Kd = Md, Bd = qd;
function Vd(e, t) {
  return Fd(e) ? e : Hd(e, t) ? [e] : Kd(Bd(e));
}
var Wd = Vd, Yd = On, Jd = 1 / 0;
function Zd(e) {
  if (typeof e == "string" || Yd(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Jd ? "-0" : t;
}
var Xd = Zd, Qd = Wd, ep = Xd;
function tp(e, t) {
  t = Qd(t, e);
  for (var n = 0, r = t.length; e != null && n < r; )
    e = e[ep(t[n++])];
  return n && n == r ? e : void 0;
}
var np = tp, rp = np;
function ip(e, t, n) {
  var r = e == null ? void 0 : rp(e, t);
  return r === void 0 ? n : r;
}
var $t = ip;
const ee = k({
  title: "",
  id: "A_" + J(10),
  creattime: null,
  uptime: null,
  cover: null,
  description: ""
}), te = k({ width: j.width, height: j.height }), me = k({
  backgroundColor: j.backgroundColor
}), G = k({ value: 1, h: 1, w: 1, mode: j.scaleMode }), ci = Ii(() => {
  if (j.scale)
    if (G.mode == "auto")
      if (G.w > G.h) {
        let e = te.width * (G.w - G.h) / 2 / G.value;
        return "scale(" + G.value + ")  translateX(" + e + "px)";
      } else {
        let e = te.height * (G.h - G.w) / 2 / G.value;
        return "scale(" + G.value + ")  translateY(" + e + "px)";
      }
    else
      return G.mode == "fill" ? "scale(" + G.w + "," + G.h + ")" : "";
  else
    return "";
}), fi = function(e) {
  if (e) {
    let t = e;
    typeof t == "string" && (t = document.querySelector(j.dom));
    let n = t.getBoundingClientRect();
    return n.width > 0 && n.height > 0 ? n : t.parentElement && t.parentElement.localName != "body" ? fi(t.parentElement) : {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}, cr = function(e) {
  let t = fi(j.dom) || {
    width: window.innerWidth,
    height: window.innerHeight
  }, n = t.height / e.height, r = t.width / e.width;
  return n < r ? { value: n, h: n, w: r } : { value: r, h: n, w: r };
}, Z = k({
  host: "",
  method: "GET",
  headers: {}
}), di = function(e) {
  return e.id ? ee.id = e.id : ee.id = "A_" + J(10), e.title && (ee.title = e.title), e.creattime && (ee.creattime = e.creattime), e.uptime && (ee.uptime = e.uptime), e.cover && (ee.cover = e.cover), e.description && (ee.description = e.description), e.width && (te.width = e.width), e.height && (te.height = e.height), e.scaleMode && (G.mode = e.scaleMode), Object.assign(G, cr(te)), Object.assign(me, e.background), Object.assign(Z, e.network), window.addEventListener("resize", (t) => {
    Object.assign(G, cr(te));
  }), {
    info: ee,
    size: te,
    scale: G,
    transform: ci,
    background: me
  };
}, sp = {
  info: ee,
  size: te,
  background: me
}, pi = function() {
  te.width = j.width, te.height = j.height;
  for (const e in me)
    Object.hasOwnProperty.call(me, e) && delete me[e];
  me.backgroundColor = j.backgroundColor, G.mode = j.scaleMode, Object.assign(Z, {
    host: "",
    method: "GET",
    headers: {}
  }), Object.assign(ee, {
    title: "",
    id: "A_" + J(10),
    creattime: null,
    uptime: null,
    cover: null,
    description: ""
  });
}, hi = function() {
  return {
    info: ee,
    size: te,
    scale: G,
    transform: ci,
    background: me,
    get network() {
      return Z;
    }
  };
}, op = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appBase: sp,
  getAppData: hi,
  initAppData: di,
  network: Z,
  resetAppData: pi
}, Symbol.toStringTag, { value: "Module" }));
var ap = Ae, lp = ap.isFinite;
function up(e) {
  return typeof e == "number" && lp(e);
}
var cp = up;
let Nt = "token", qt = "json";
function fp(e) {
  Nt = Z.token || "token", qt = Z.responseType || "json";
  let t = /^(?!https?:\/\/)/.test(e.url) ? Z.host + e.url : e.url, n = localStorage.getItem(Nt) ? { Authorization: localStorage.getItem(Nt) } : {}, r = e.customize || {}, s = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };
  (!Z.headers || typeof Z.headers == "string" && (Z.headers == "" || Z.headers == "null")) && (s = {});
  let o = Object.assign({
    method: e.method || Z.method,
    mode: Z.mode || "cors",
    signal: e.signal,
    headers: new Headers(Object.assign(s, n, e.headers))
  }, r);
  return o.method.toUpperCase() == "POST" ? o.body = o.headers.get("Content-Type") == "application/json" ? JSON.stringify(e.data) : e.data : t = /\?/.test(t) ? t + "&" + Kt(e.data) : t + "?" + Kt(e.data), new Promise((a, l) => {
    fetch(t, o).then((u) => qt ? u[qt]() : u.json(), l).then(a);
  });
}
const Ie = {}, Yt = [];
class dp extends et {
  constructor(t) {
    super(), this.id = "R_" + J(10), this.controller = new AbortController(), this.signal = this.controller.signal, this.isloading = !1, this.status = "wait", this.options = t, this.data = null, this.err = null;
  }
  //    请求数据
  request(t) {
    this.status != "request" && (this.isloading = !0, this.status = "request", this.emit("request", this), fp({
      url: this.options.url || "",
      data: this.options.body || {},
      method: this.options.method,
      signal: this.signal
    }).then((n) => {
      this.data = n, this.status = "success", this.isloading = !1, this.err = null, this.emit("success", n), t && t(this);
    }, (n) => {
      this.status = "success", this.isloading = !1, this.err = n, this.emit("error", n), t && t(this);
    }));
  }
  destroy() {
    this.controller && this.controller.abort(), this.controller = null, this.signal = null, this.isloading = null, this.status = null, this.options = null, this.data = null, this.err = null, Ie[this.id] && (ce(Yt, "id", this.id), delete Ie[this.id]);
  }
}
function pp(e) {
  let t = e.url || "", n = e.body || {}, r = (t + JSON.stringify(n)).split("").sort().join(""), s = Yt.find((a) => a.test == r);
  if (s && Ie[s.id])
    return Ie[s.id];
  let o = new dp(e);
  return Yt.push({
    id: o.id,
    test: r
  }), Ie[o.id] = o, Ie[o.id];
}
class hp extends et {
  constructor(t, n, r, s, o) {
    super(), this.id = "RD_" + J(10), this.url = t, this.body = r, this.method = s, this.data = k({}), this.sourceData = null, this.loading = sn(!1), this.isloading = !1, this.itval = o || 0, this.it = null, this.status = "wait", this.err = null, this.extractRule = n ? k(n) : k({});
    let a = pp({ url: t, body: Qt(r), method: s });
    a.on("request", () => {
      this.loading.value = !0, this.isloading = !0, this.status = "request";
    }), a.on("success", (l) => {
      this.sourceData = l, this.status = "success", this.loading.value = !1, this.isloading = !1, this.err = null, this.fillData(l), this.emit("success", this);
    }), a.on("error", (l) => {
      this.status = "success", this.loading.value = !1, this.isloading = !1, this.err = l, this.emit("error", l);
    }), this.req = a, this.unwatch = null, this.watchRule();
  }
  watchRule() {
    this.stopWatch(), this.watch = rt(this.extractRule, () => {
      this.sourceData && this.fillData(this.sourceData);
    }), this.sourceData && this.fillData(this.sourceData);
  }
  stopWatch() {
    this.unwatch && (this.unwatch(), this.unwatch = null);
  }
  setData(t = {}) {
    t.url && (this.url = t.url, this.req.options.url = t.url), t.method && (this.method = t.method, this.req.options.method = t.method), t.body && (this.body = t.body, this.req.options.body = Qt(t.body)), cp(t.itval) && (this.itval = t.itval);
  }
  // 修改规则
  setExtractRule(t) {
    if (this.extractRule instanceof Array && t instanceof Array || this.extractRule instanceof Object && t instanceof Object && !Array.isArray(this.extractRule) && !Array.isArray(t)) {
      for (const n in this.extractRule)
        delete this.extractRule[n];
      Object.assign(this.extractRule, t);
    } else
      this.extractRule = k(Y(t)), this.watchRule();
  }
  // 返回规则（返回的是一个非响应式的数据对象）
  getExtractRule() {
    return Y(this.extractRule);
  }
  //    请求数据
  request(t) {
    this.req.request(t), this.setinterval(this.itval);
  }
  // 开启轮询请求
  setinterval(t = 0) {
    j.interaction && t && t > 0 && (this.it = mt.add(() => {
      this.req.request();
    }, t * 1e3));
  }
  // 关闭轮询请求
  stopInterval() {
    this.it && (mt.del(this.it), this.it = null);
  }
  //    清除数据
  clearData() {
    this.status == "request" && this.req.controller && this.req.controller.abort(), Object.keys(this.data).forEach((n) => {
      delete this.data[n];
    });
  }
  /**
   * 填充数据
   * @param {*} data 
   */
  fillData(t) {
    this.clearData(), this.extractRule && (this.extractRule.x || this.extractRule.name || this.extractRule instanceof Array) ? Object.assign(this.data, { data: ln(t, this.extractRule) }) : Object.assign(this.data, { data: t });
  }
  /**
   * 销毁
   */
  destroy() {
    this.req.destroy(), this.clearData(), this.stopWatch(), this.stopInterval(), this.extractRule = null;
  }
}
function fr(e, t, n, r, s) {
  return new hp(e, t, n, r, s);
}
const M = {}, Re = k([]), yp = function() {
  return k({
    x: {
      name: "",
      path: "",
      mapKey: ""
    },
    y: []
  });
}, yi = function() {
  return Re;
}, Ot = function(e, t = null, n = null, r = null, s = null) {
  let o = null;
  if (se(e))
    o = fr(e.url, e.extractRule, e.body, e.method, e.itval), e.id && (o.id = e.id), Re.push(o), M[o.id] = o;
  else if (typeof e == "string")
    if (!M[e])
      o = fr(e, t, n, r, s), Re.push(o), M[o.id] = o;
    else
      return M[e];
  return o;
}, Ft = function(e) {
  ce(Re, "id", e), M[e].destroy(), delete M[e];
}, vi = function(e) {
  if (e)
    if (M[e])
      Ft(e);
    else
      for (let t in M)
        M[t].url == e && Ft(t);
  else
    Object.keys(M).forEach((n) => {
      Ft(n);
    }), Re.splice(0, Re.length);
}, gi = function(e) {
  if (M[e])
    return M[e];
  for (let t in M)
    if (M[t].url == e)
      return M[t];
  return null;
}, xn = function() {
  vi();
}, mi = function(e = !1, t = "", n) {
  if (t && M[t])
    M[t].request(n);
  else
    for (let r in M)
      if (M[r].status != "success" || M[r].err || e)
        if (t) {
          if (M[r].url == t) {
            M[r].request(n);
            return;
          }
        } else
          M[r].request(n);
}, vp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Ot,
  clearRemote: xn,
  createExtractRule: yp,
  del: vi,
  getList: yi,
  getRemote: gi,
  remotes: M,
  requestData: mi
}, Symbol.toStringTag, { value: "Module" })), C = {}, _e = k([]), dr = function(e = "", t = "", n = "source") {
  return {
    id: "GD_" + J(10),
    name: t,
    type: n,
    value: e instanceof Object ? k(e) : sn(e),
    uptime: new Date().getTime()
  };
}, Ht = function(e) {
  return k({
    get id() {
      return e.id || "";
    },
    get type() {
      return e.type || "";
    },
    name: e.name,
    value: e.value,
    uptime: e.uptime || ""
  });
}, Jt = function(e, t = "", n = "source") {
  if (se(e) && e.id)
    return C[e.id] || (e.type == "remote" && (e.value = Ot(e.value).id), C[e.id] = Ht(e), _e.push(C[e.id])), C[e.id];
  if (e) {
    let r = {};
    return n == "remote" && (e = Ot(e).id), r = dr(e, t, n), C[r.id] = Ht(r), _e.push(C[r.id]), C[r.id];
  } else
    return console.warn("无效全局数据添加"), !1;
}, gp = function(e, t) {
  let n = null;
  if (typeof e == "string" && se(t) && C[e] ? (n = e, C[n] = t) : se(e) && typeof e.id == "string" && C[e.id] && (n = e.id, C[n] = e), n) {
    let r = _e.findIndex((s) => s.id == n);
    if (r > -1)
      return _e[r] = C[n];
  }
  return !1;
}, mp = function(e) {
  C[e] && (ce(_e, "id", e), delete C[e]);
}, bp = function(e) {
  return C[e] || null;
}, bi = function() {
  return _e;
}, Sn = function() {
  Object.keys(C).forEach((t) => {
    delete C[t];
  }), _e.splice(0, _e.length);
}, _p = C, $p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GData: _p,
  addGData: Jt,
  clearGlobal: Sn,
  default: C,
  delGData: mp,
  editGData: gp,
  getGData: bp,
  getGDataList: bi
}, Symbol.toStringTag, { value: "Module" })), ne = {}, Le = k([]), Op = function(e) {
  let t = Object.assign({
    id: "PD_" + J(10),
    uptime: new Date().getTime()
  }, e);
  return t.name && !t.title && (t.title = t.name), k(t);
}, _i = function(e) {
  if (se(e)) {
    if (e.id && ne[e.id])
      return console.warn("插件存在"), null;
    if (e.url) {
      let t = Op(e);
      return ne[t.id] = t, Le.push(t), ne[t.id];
    }
  }
  return console.warn("插件添加失败", e), null;
}, wp = function(e) {
  if (ne[e])
    ce(Le, "id", e), delete ne[e];
  else if (e) {
    let n = Object.values(ne).find((r) => r.url == e);
    n && ne[n.id] && (ce(Le, "id", n.id), delete ne[n.id]);
  }
}, xp = function(e) {
  return ne[e] || null;
}, $i = function() {
  return Le;
}, An = function() {
  Object.keys(ne).forEach((t) => {
    delete ne[t];
  }), Le.splice(0, Le.length);
}, Sp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addPlugin: _i,
  clearPlugin: An,
  delPlugin: wp,
  getPlugin: xp,
  getPluginList: $i
}, Symbol.toStringTag, { value: "Module" }));
function Ap(e) {
  let t = e ? Y(e) : {};
  $n(), pn(), Sn(), xn(), An();
  let n = [], r = [];
  t.modules && (n = t.modules, delete t.modules), t.actions && (r = t.actions, delete t.actions), t.remote && t.remote instanceof Array && (t.remote.forEach((s) => {
    Ot(s);
  }), delete t.remote), t.globalData && (Jt({
    id: "GD_query",
    name: "url参数",
    type: "temp",
    value: { data: wr() }
  }), t.globalData.forEach((s) => {
    Jt(s);
  }), delete t.globalData), Array.isArray(t.plugins) && (t.plugins.forEach((s) => {
    _i(s);
  }), delete t.plugins), di(t), ai(n), r.forEach((s) => {
    Pe(s);
  }), x.emit(z.DATA_LOADED, !0), mi(!0);
}
function Ep(...e) {
  let t = new Date().getTime(), n = {
    id: "A_" + J(10),
    title: "",
    creattime: t,
    uptime: t,
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
  return Object.assign({}, n, ...e);
}
const V = {
  getData() {
    let e = hi(), t = Y(mn());
    t.forEach((r) => {
      r.components && Array.isArray(r.components) && (r.components = r.components.map((s) => {
        if (s.type == "group") {
          let o = _t(s.id);
          return o.components && (o.components = o.components.map((a) => {
            let l = ie(a.id);
            return l.selected = !1, l;
          })), o.selected = !1, o;
        } else {
          let o = ie(s.id);
          return o.selected = !1, o;
        }
      }));
    });
    let n = Y(bi());
    return n.forEach((r, s) => {
      r.type == "temp" && n.splice(s, 1);
    }), Y({
      id: e.info.id,
      title: e.info.title,
      creattime: e.info.creattime,
      uptime: e.info.uptime,
      cover: e.info.cover,
      description: e.info.description,
      width: e.size.width,
      height: e.size.height,
      scaleMode: e.scale.mode,
      background: e.background,
      network: e.network,
      globalData: n,
      modules: t,
      actions: De(),
      plugins: $i(),
      remote: yi().map((r) => ({
        id: r.id,
        url: r.url,
        body: r.body || "",
        method: r.method || "",
        itval: r.itval || 0,
        extractRule: r.extractRule || ""
      }))
    });
  },
  init: Ap,
  ...op,
  ...fd,
  ...Nf,
  ...$p,
  ...Sp,
  getElement(e) {
    return ie(e) || _t(e);
  },
  getElements() {
    return [...ii(), ...bn()];
  },
  getTemplateData: Ep,
  clearDataAll() {
    $n(), pn(), Sn(), xn(), An(), pi(), En();
  }
}, { events: Dp } = ot, Oi = function(e, t) {
  let n = Dp.find((r) => r.event == e) || Ke.getComponentEvents(t).find((r) => r.event == e);
  return n ? Y(n) : !1;
}, je = function(e, t, n = !1) {
  let r = ie(e);
  return t ? n ? r.events ? r.events.findIndex((s) => s.event == t) : -1 : r.events ? r.events.find((s) => s.event == t) : null : r.events || null;
}, jp = function(e, t, n) {
  let r = je(e, t);
  if (r)
    return r;
  let s = ie(e), o = Oi(t, s.name);
  return s && o ? (s.events || (s.events = []), n && (o.pams = n), s.events.push(o), s.events[s.events.length - 1]) : (console.warn(s ? t + "事件名称不对" : "缺少组件数据"), null);
}, Tp = function(e, t, n) {
  let r = je(e, t, !0);
  if (r > -1) {
    let s = ie(e);
    return s.events[r].pams = n, s.events[r];
  }
  return null;
}, Cp = function(e, t) {
  let n = je(e, t, !0);
  if (n > -1) {
    let r = ie(e);
    return r.events.splice(n, 1), r.events;
  }
  return null;
};
let { actions: Mp } = ot;
const Ip = function(e, t = "", n, r = "") {
  let s = Mp.find((o) => o.action == e);
  return s ? s.target == "component" ? Pe({
    action: s.action,
    target: t,
    value: typeof n < "u" ? n : s.value,
    description: r || s.name + ie(t).title
  }) : s.target == "url" ? Pe({
    action: s.action,
    target: t,
    value: typeof n < "u" ? n : s.value,
    description: r || s.name
  }) : Pe({
    action: e,
    target: t,
    value: n,
    description: r || s.name
  }) : (console.warn(e + " 动作不存在"), null);
}, Pp = function(e) {
  return e.id ? Pe(e) : (console.warn("没有要修改的动作信息"), null);
}, kp = function(e, t, n = "") {
  if (n && typeof t == "string") {
    let r = je(t, n);
    return r ? r.actions.findIndex((s) => s == e) < 0 && r.actions.push(e) : console.warn(t + "中" + n + "事件不存在"), r;
  } else if (typeof t == "object" && t.actions && t.actions instanceof Array)
    return t.actions.push(e), t;
}, zp = function(e, t, n, r) {
  if (n && typeof t == "string") {
    let s = je(t, n);
    return s ? typeof r < "u" && (s.actionValue || (s.actionValue = {}), s.actionValue[e] = r) : console.warn(t + "中" + n + "事件不存在"), s;
  }
}, Rp = function(e, t, n = "", r = !1) {
  if (n && typeof t == "string") {
    let s = je(t, n);
    return s && ce(s.actions, "", e), r && Vt(e), s;
  } else if (typeof t == "object" && t.actions && t.actions instanceof Array)
    return ce(t.actions, "", e), r && Vt(e), t;
}, Lp = function(e, t) {
  let n = [];
  if (e) {
    let r = ie(e);
    if (Array.isArray(r.events))
      if (t) {
        let s = r.events.find((o) => o.event == t);
        s && (n = s.actions.map((o) => ({
          sname: r.title,
          sid: r.id,
          event: s.event,
          id: o
        })));
      } else
        n = r.events.map((s) => s.actions ? s.actions.map((o) => ({
          sname: r.title,
          sid: r.id,
          event: s.event,
          id: o
        })) : []).flat();
  } else
    n = bn().map((r) => r.events && r.events.length > 0 ? r.events.map((s) => s.actions ? s.actions.map((o) => ({
      sname: r.title,
      sid: r.id,
      event: s.event,
      id: o
    })) : []).flat() : []).flat();
  return n;
}, Zt = Y, Gp = ln;
let Oe = {}, Xt = [];
const En = function() {
  Xt.forEach((e) => {
    e();
  }), Xt = [];
  for (const e in Oe)
    Oe[e] = null;
  Oe = {};
}, Dn = function(e) {
  if (typeof e != "string")
    return e;
  if (/^RD_\S{10}$/.test(e) && M[e])
    return M[e].data;
  {
    let t = e, n = null;
    if (/.\?+./.test(e)) {
      let r = e.split("?");
      t = r[0], n = r[1];
    }
    if (/(^GD_\S{10})|(^GD_query)$/.test(t) && C[t])
      if (C[t].type == "remote") {
        let r = gi(C[t].value);
        return r ? n ? (Oe[e] || (Oe[e] = sn(null), Xt.push(rt(r.data, (s) => {
          Oe[e].value = $t(s.data || s, n);
        }, { immediate: !0 }))), Oe[e]) : r.data : null;
      } else
        return n ? $t(C[t].value, n) : C[t].value;
  }
  return null;
}, Qt = function(e) {
  let t = {};
  return e && Array.isArray(e) && e.forEach((n) => {
    if (se(n))
      if (typeof n.value == "string" && n.key) {
        let r = Dn(n.value);
        r ? gr(r) ? t[n.key] = n.path ? $t(r.data, n.path) : r.data : t[n.key] = n.path ? $t(r, n.path) : r : t[n.key] = n.value;
      } else
        n.key && (t[n.key] = n.value);
  }), t;
}, Up = function(e, t = "up") {
  const n = V.elements, r = V.getElement(e);
  if (r) {
    if (!r.mid) {
      console.warn("页面上找不到" + e);
      return;
    }
  } else {
    console.warn("元件不存在" + e);
    return;
  }
  let s = Qr(r.mid).map((o) => ({
    id: o.id,
    zIndex: o.zIndex
  })).sort((o, a) => a.zIndex - o.zIndex);
  if (t == "up") {
    let o = s.findIndex((a) => a.id == e);
    if (o > 0) {
      let a = s[o - 1].id, l = n[a].zIndex;
      n[a].zIndex = n[e].zIndex, n[e].zIndex = l;
    }
  } else if (t == "down") {
    let o = s.findIndex((a) => a.id == e);
    if (o < s.length - 1 && o > -1) {
      let a = s[o + 1].id, l = n[a].zIndex;
      n[a].zIndex = n[e].zIndex, n[e].zIndex = l;
    }
  } else if (t == "top") {
    let o = s.findIndex((a) => a.id == e);
    if (o > 0) {
      n[e].zIndex = s[0].zIndex;
      for (let a = 0; a < o; a++)
        n[s[a].id].zIndex--;
    }
  } else if (t == "bottom") {
    let o = s.findIndex((a) => a.id == e);
    if (o < s.length - 1 && o > -1) {
      n[e].zIndex = s[s.length - 1].zIndex;
      for (let a = o + 1, l = s.length; a < l; a++)
        n[s[a].id].zIndex++;
    }
  }
}, wi = function(e, t, n = null) {
  const r = ti(), s = ri();
  if (r[e]) {
    let o = Zt(r[e]);
    return o.title += "_c", delete o.id, delete o.zIndex, Object.assign(o, t), bt(o, o.mid, n);
  } else if (s[e]) {
    let o = Zt(s[e]);
    o.title += "_c", delete o.id, delete o.zIndex, Object.assign(o, t);
    let a = [];
    o.components && (a = o.components, delete o.components);
    let l = _n.newGroupData(o, o.mid);
    return a.forEach((u) => {
      wi(u.id, { gpid: l.id }, l.id);
    }), l;
  }
}, Np = function(e, t) {
  mn().forEach((n) => {
    if (t) {
      if (typeof t == "string") {
        if (n.id == t)
          return;
      } else if (t instanceof Array && t.find((r) => r == n.id))
        return;
    }
    n.type != "fixed" && (n.id == e ? n.visible = !0 : n.visible = !1);
  });
}, qp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAction: kp,
  addEvent: jp,
  changeModuleShow: Np,
  clear: En,
  copy: wi,
  createActionData: Ip,
  editAction: zp,
  editActionData: Pp,
  editEvent: Tp,
  extractData: Gp,
  getBodyData: Qt,
  getDataSource: Dn,
  getEvent: je,
  getSpriteActions: Lp,
  jsonData: Zt,
  newEventData: Oi,
  removeAction: Rp,
  removeEvent: Cp,
  setZindex: Up
}, Symbol.toStringTag, { value: "Module" }));
function W(e, t, n = "") {
  let r = null;
  if (e ? (r = Pi(e), r == e && (console.warn(r + "组件没有找到"), r = "div")) : (console.warn("数据缺少组件" + t), r = "div"), typeof t == "string") {
    const s = ie(t) || _t(t);
    if (!s)
      return;
    let o = { ...s, key: t };
    if (s.id && Object.assign(o, sr(s.events || [], s, e)), o.name && delete o.name, o.mid && delete o.mid, o.anim && o.anim.name && j.interaction ? o.class = o.anim.name : typeof o.anim == "string" && delete o.anim, o.data) {
      let a = Dn(o.data);
      a && (gr(a) ? o.data = a.data || a : o.data = a);
    }
    return U(r, o);
  } else if (typeof t < "u") {
    let s = { ...t };
    return (t.events || t.type == "group") && Object.assign(s, sr(t.events || [], t, e)), s.ref = s.id, s.name && delete s.name, s.mid && delete s.mid, U(r, s, n);
  } else
    return U(r, {}, "");
}
const Fp = {
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
  setup(e) {
    const t = V.getModules(), n = V.getAppData(), r = k({}), s = ki(e.slots) ? [e.slots] : [];
    return s.length == 0 && (Array.isArray(e.slots) ? e.slots.forEach((o) => {
      s.push(U(o));
    }) : e.slots && s.push(U(e.slots))), rt(t, (o) => {
      Object.assign(r, JSON.parse(JSON.stringify(o)));
    }, { deep: !0 }), zi(() => {
      x.emit(z.STAGE_MOUNTED);
    }), () => {
      var o = [];
      const a = [], l = [], u = [];
      for (const d in r)
        if (r.hasOwnProperty.call(r, d)) {
          const c = r[d];
          (typeof c.visible > "u" || c.visible == !0) && (c.type == "content" ? a.push(c) : c.type == "fixed" ? l.push(c) : c.type == "overlayer" && u.push(c));
        }
      o.push(W("vx-background", e.background), ...s), a.length > 0 && o.push(W("vx-content", { modules: a })), l.length > 0 && o.push(W("vx-fixed", { modules: l })), u.length > 0 && (o.unshift(W("vx-mask")), o.push(W("vx-overlayer", { modules: u }))), o.push(W("vx-popwin", e.popwin)), o.push(W("vx-message"));
      let f = {
        position: "absolute",
        width: n.size.width ? n.size.width + "px" : "100%",
        height: n.size.height ? n.size.height + "px" : "100%",
        top: 0,
        left: 0,
        transformOrigin: "0 0",
        transform: n.transform.value,
        zIndex: 0,
        userSelect: "none",
        ...Y(n.background)
      };
      return U("div", {
        id: "vx-stage",
        style: f,
        onclick(d) {
          x.emit(z.CLICK_STAGE, d);
        }
      }, o);
    };
  }
}, Hp = {
  name: "vx-module",
  props: ["components"],
  setup(e) {
    const { components: t } = on(e);
    return (n) => {
      const r = [];
      return t.value && t.value.forEach((s, o) => {
        s.visible && (s.type == "group" ? r.push(W("vx-sprite-group", s.id)) : r.push(W(s.name, s.id)));
      }), U("div", {
        id: n.id,
        style: n.style
      }, r);
    };
  }
}, Kp = {
  name: "vx-plane",
  props: ["components"],
  setup() {
    return (e) => {
      const t = [];
      return e.components && e.components.forEach((n, r) => {
        n.visible && t.push(W(n.name, n.id));
      }), U("div", {
        id: e.id,
        style: e.style
      }, t);
    };
  }
}, Bp = {
  name: "vx-popwin",
  render() {
    return U("div", {
      id: "vx-popwin",
      style: {
        position: "absolute",
        width: "100%",
        zIndex: 5e4
      }
    });
  }
};
let Vp = {
  position: "absolute",
  width: "auto",
  height: "auto",
  top: 0,
  left: 0,
  zIndex: 1e4
};
const Wp = {
  name: "vx-content",
  props: ["modules"],
  setup(e) {
    return () => {
      const t = e.modules, n = [];
      for (const r in t)
        if (t.hasOwnProperty.call(t, r)) {
          const s = t[r];
          (typeof s.visible > "u" || s.visible == !0) && n.push(W("vx-module", s));
        }
      return U("div", {
        id: "vx-content",
        style: Vp
      }, n);
    };
  }
};
let Yp = {
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 2e4
};
const Jp = {
  name: "vx-fixed",
  props: ["modules"],
  setup(e) {
    return () => {
      const t = e.modules, n = [];
      for (const r in t)
        if (t.hasOwnProperty.call(t, r)) {
          const s = t[r];
          (typeof s.visible > "u" || s.visible == !0) && n.push(W("vx-module", s));
        }
      return U("div", {
        id: "vx-fixed",
        style: Yp
      }, n);
    };
  }
};
let Zp = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 4e4
};
const Xp = {
  name: "vx-overlayer",
  props: ["modules"],
  setup(e) {
    return () => {
      const t = e.modules, n = [];
      for (const r in t)
        if (t.hasOwnProperty.call(t, r)) {
          const s = t[r];
          (typeof s.visible > "u" || s.visible == !0) && n.push(W("vx-module", s));
        }
      return U("div", {
        id: "vx-overlayer",
        style: Zp
      }, n);
    };
  }
};
let pr = {
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 99999999
}, Qp = {
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
const eh = {
  name: "vx-message",
  setup() {
    const e = k([]);
    x.addEventListener("message-send", (n) => {
      e.length == 0 && t(), e.push(n);
    });
    const t = function() {
      setTimeout(() => {
        e.length > 0 && (e.splice(0, 1), e.length > 0 && t());
      }, 3e3);
    };
    return () => e.length > 0 ? U("div", {
      id: "vx-message",
      style: pr
    }, e.map((n) => U("div", { class: "message_item", style: Qp }, n))) : U("div", {
      id: "vx-message",
      style: pr
    });
  }
}, th = {
  name: "vx-mask",
  render() {
    return U("div", {
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
      onClick: (t) => {
      }
    });
  }
};
let nh = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0)",
  zIndex: 1
};
const rh = {
  name: "vx-background",
  setup(e) {
    return () => {
      let t = Object.assign({}, nh, e.style);
      return U("div", {
        id: "vx-background",
        style: t,
        onmousedown: (n) => {
          x.emit(z.MOUSEDOWN_BACKGROUND, n);
        },
        onmouseup: (n) => {
          x.emit(z.MOUSEUP_BACKGROUND, n);
        },
        onclick: (n) => {
          x.emit(z.CLICK_BACKGROUND, n);
        }
      });
    };
  }
}, ih = {
  name: "vx-sprite-group",
  props: {
    components: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(e) {
    const { x: t, y: n, id: r } = on(e);
    return Cn("offsetX", t), Cn("offsetY", n), (s) => {
      const o = [];
      s.components && s.components.forEach((l, u) => {
        l.visible && o.push(W(l.name, l.id));
      });
      let a = ["element_sprite", { element_selected: s.selected }, { element_hover: s.hover }];
      return U("div", { id: r.value, style: s.style, class: a }, o);
    };
  }
}, sh = {
  name: "vx-sprite",
  setup(e, t) {
    const { id: n } = on(e);
    return (r) => {
      let s = "";
      typeof t.slots.default == "function" && (s = t.slots.default());
      let o = ["element_sprite", { element_selected: r.$parent.selected }, { element_hover: r.$parent.hover }];
      return r.$parent.gpid && (o = ["element_sprite"]), U("div", { id: n.value || r.$parent.id, style: r.$parent.style, class: o }, s);
    };
  }
}, oh = [Hp, Kp, Bp, Xp, Wp, Jp, eh, th, rh, ih, sh], ah = {
  install: (e) => {
    oh.forEach((t) => {
      e.component(t.name, t);
    });
  }
};
window && typeof window.Vue > "u" && (window.Vue = Mi);
var X = null;
const xi = function(e = {}) {
  return X ? !1 : (X = Ri(Fp, e), X.use(ah), X.mixin(Dt), j.status = "create", window && (window.myapp = X), console.log("%c灿create", "color:#0aa100"), !0);
}, lh = function() {
  if (X) {
    let e = j.dom;
    return typeof e == "string" && document.querySelector(e) || e instanceof HTMLElement ? (X.mount(e), j.status = "display", console.log("%c灿display", "color:#0aa100"), !0) : (console.error(e + "错误"), !1);
  } else
    return console.warn("app没有创建"), !1;
}, Si = function() {
  X && (X.unmount(), X = null, j.status = "remove", console.log("%c灿remove", "color:#0aa100"));
}, pt = function(e) {
  return e && Object.assign(j, e), j;
}, uh = function() {
  return X;
}, nt = {
  appSetup: j,
  get vm() {
    return X;
  }
}, ke = {
  // 更新元件原始数据
  reviewData(e, t) {
    if (t && t.id) {
      console.warn(t.id + "不能替换");
      return;
    }
    Object.assign(e, t);
  },
  // 显示元件
  show(e, t) {
    e && (Array.isArray(e) ? e.forEach((n) => {
      n.visible = t;
    }) : e.visible = t);
  },
  // 切换显示
  toggle(e) {
    e && (Array.isArray(e) ? e.forEach((t) => {
      t.visible = !t.visible;
    }) : e.visible = !e.visible);
  },
  // 更新元件传递数据
  sendData(e, t) {
    e && (Array.isArray(e) ? e.forEach((n) => {
      n.data = t;
    }) : e.data = t);
  },
  // 链接跳转
  href(e, t = "_blank") {
    e && (t == "a" ? window.location.href = e : window.open(e, t));
  },
  // 模块切换显示
  singleModule(e, t) {
    e.filter((n) => n.type == "content").forEach((n) => {
      n.id == t ? n.visible = !0 : n.visible = !1;
    });
  },
  // 开关弹窗页面
  popup(e, t) {
    return e && e.type == "overlayer" && (typeof t == "boolean" ? e.visible = t : e.visible = !e.visible), e;
  }
}, ft = {}, Xe = ot.actions, hr = function(e, t, n) {
  if (ke[e]) {
    let r = Xe.find((s) => s.action == e);
    if (r) {
      let s = {};
      r.target == "component" || r.target == "components" ? t instanceof Array ? (s = [], t.forEach((o) => {
        s.push(V.getElement(o));
      })) : t && (s = V.getElement(t)) : r.target == "app" ? s = V.getAppData() : r.target == "url" ? s = t : r.target == "modules" ? s = V.getModuleList() : r.target == "module" && (s = V.getModule(t)), ke[e].call(r, s, n);
    } else {
      let s = V.getElement(t) || V.getModule(t);
      s && (targetData = s), ke[e].call({}, targetData, n);
    }
  } else
    console.warn(item.action + "动作不存在");
}, wt = {
  // 元件动作
  [ze.ACTION](e) {
    e.data && (e.data instanceof Array ? e.data.forEach((t) => {
      hr(t.action, t.target, t.value);
    }) : e.data instanceof Object && typeof e.data != "function" && hr(e.data.action, e.data.target, e.data.value));
  },
  // 应用动作
  [ze.APP_ACTION](e) {
  },
  // 添加一个动作
  useAction(e) {
    let t = {
      name: e.name || "无名动作",
      action: e.action || null,
      target: e.target || "component",
      valueType: e.valueType || null,
      value: e.value || ""
    };
    Xe.find((n) => n.action == t.action) ? console.warn(e, "已存在") : t.action && e.handle ? ke[t.action] ? console.warn(t.action + "动作已存在") : (Xe.push(t), ke[t.action] = e.handle, ft[t.action] = t) : t.action ? console.warn(e, "缺少动作方法函数") : console.warn(e, "缺少action名称");
  },
  remove(e) {
    if (ft[e]) {
      let t = Xe.findIndex((n) => n.action == e);
      t > -1 && Xe.splice(t, 1), delete ke[e], delete ft[e];
    }
  },
  removeAll() {
    Object.keys(ft).forEach((t) => {
      this.remove(t);
    });
  }
};
for (const e in ze) {
  let t = ze[e];
  x.addEventListener(t, wt[t], wt);
}
var en = function() {
}, xt = {}, jn = {}, St = {};
function ch(e, t) {
  e = e.push ? e : [e];
  var n = [], r = e.length, s = r, o, a, l, u;
  for (o = function(f, d) {
    d.length && n.push(f), s--, s || t(n);
  }; r--; ) {
    if (a = e[r], l = jn[a], l) {
      o(a, l);
      continue;
    }
    u = St[a] = St[a] || [], u.push(o);
  }
}
function Ai(e, t) {
  if (e) {
    var n = St[e];
    if (jn[e] = t, !!n)
      for (; n.length; )
        n[0](e, t), n.splice(0, 1);
  }
}
function tn(e, t) {
  e.call && (e = { success: e }), t.length ? (e.error || en)(t) : (e.success || en)(e);
}
function Ei(e, t, n, r) {
  var s = document, o = n.async, a = (n.numRetries || 0) + 1, l = n.before || en, u = e.replace(/[\?|#].*$/, ""), f = e.replace(/^(css|img|module|nomodule)!/, ""), d, c, v;
  if (r = r || 0, /(^css!|\.css$)/.test(u))
    v = s.createElement("link"), v.rel = "stylesheet", v.href = f, d = "hideFocus" in v, d && v.relList && (d = 0, v.rel = "preload", v.as = "style");
  else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(u))
    v = s.createElement("img"), v.src = f;
  else if (v = s.createElement("script"), v.src = f, v.async = o === void 0 ? !0 : o, c = "noModule" in v, /^module!/.test(u)) {
    if (!c)
      return t(e, "l");
    v.type = "module";
  } else if (/^nomodule!/.test(u) && c)
    return t(e, "l");
  v.onload = v.onerror = v.onbeforeload = function(w) {
    var O = w.type[0];
    if (d)
      try {
        v.sheet.cssText.length || (O = "e");
      } catch (K) {
        K.code != 18 && (O = "e");
      }
    if (O == "e") {
      if (r += 1, r < a)
        return Ei(e, t, n, r);
    } else if (v.rel == "preload" && v.as == "style")
      return v.rel = "stylesheet";
    t(e, O, w.defaultPrevented);
  }, l(e, v) !== !1 && s.head.appendChild(v);
}
function fh(e, t, n) {
  e = e.push ? e : [e];
  var r = e.length, s = r, o = [], a, l;
  for (a = function(u, f, d) {
    if (f == "e" && o.push(u), f == "b")
      if (d)
        o.push(u);
      else
        return;
    r--, r || t(o);
  }, l = 0; l < s; l++)
    Ei(e[l], a, n);
}
function Ge(e, t, n) {
  var r, s;
  if (t && t.trim && (r = t), s = (r ? n : t) || {}, r) {
    if (r in xt)
      throw "LoadJS";
    xt[r] = !0;
  }
  function o(a, l) {
    fh(e, function(u) {
      tn(s, u), a && tn({ success: a, error: l }, u), Ai(r, u);
    }, s);
  }
  if (s.returnPromise)
    return new Promise(o);
  o();
}
Ge.ready = function(t, n) {
  return ch(t, function(r) {
    tn(n, r);
  }), Ge;
};
Ge.done = function(t) {
  Ai(t, []);
};
Ge.reset = function() {
  xt = {}, jn = {}, St = {};
};
Ge.isDefined = function(t) {
  return t in xt;
};
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
let At;
try {
  new EventTarget(), At = !0;
} catch {
  At = !1;
}
class dh {
  constructor() {
    this.e = {};
  }
  addEventListener(t, n, r = !1) {
    this.t(t).push(n);
  }
  removeEventListener(t, n, r = !1) {
    const s = this.t(t), o = s.indexOf(n);
    o > -1 && s.splice(o, 1);
  }
  dispatchEvent(t) {
    return t.target = this, Object.freeze(t), this.t(t.type).forEach((n) => n(t)), !0;
  }
  t(t) {
    return this.e[t] = this.e[t] || [];
  }
}
var ph = At ? EventTarget : dh;
let hh = class {
  constructor(t) {
    this.type = t;
  }
};
var yh = At ? Event : hh;
class vh extends yh {
  constructor(t, n) {
    super(t), this.newState = n.newState, this.oldState = n.oldState, this.originalEvent = n.originalEvent;
  }
}
const we = "active", Qe = "passive", xe = "hidden", Se = "frozen", nn = "terminated", yr = typeof safari == "object" && safari.pushNotification, gh = "onpageshow" in self, mh = ["focus", "blur", "visibilitychange", "freeze", "resume", "pageshow", gh ? "pagehide" : "unload"], vr = (e) => (e.preventDefault(), e.returnValue = "Are you sure?"), bh = (e) => e.reduce((t, n, r) => (t[n] = r, t), {}), _h = [[we, Qe, xe, nn], [we, Qe, xe, Se], [xe, Qe, we], [Se, xe], [Se, we], [Se, Qe]].map(bh), $h = (e, t) => {
  for (let n, r = 0; n = _h[r]; ++r) {
    const s = n[e], o = n[t];
    if (s >= 0 && o >= 0 && o > s)
      return Object.keys(n).slice(s, o + 1);
  }
  return [];
}, dt = () => document.visibilityState === xe ? xe : document.hasFocus() ? we : Qe;
class Oh extends ph {
  constructor() {
    super();
    const t = dt();
    this.s = t, this.i = [], this.a = this.a.bind(this), mh.forEach((n) => addEventListener(n, this.a, !0)), yr && addEventListener("beforeunload", (n) => {
      this.n = setTimeout(() => {
        n.defaultPrevented || n.returnValue.length > 0 || this.r(n, xe);
      }, 0);
    });
  }
  get state() {
    return this.s;
  }
  get pageWasDiscarded() {
    return document.wasDiscarded || !1;
  }
  addUnsavedChanges(t) {
    !this.i.indexOf(t) > -1 && (this.i.length === 0 && addEventListener("beforeunload", vr), this.i.push(t));
  }
  removeUnsavedChanges(t) {
    const n = this.i.indexOf(t);
    n > -1 && (this.i.splice(n, 1), this.i.length === 0 && removeEventListener("beforeunload", vr));
  }
  r(t, n) {
    if (n !== this.s) {
      const r = this.s, s = $h(r, n);
      for (let o = 0; o < s.length - 1; ++o) {
        const a = s[o], l = s[o + 1];
        this.s = l, this.dispatchEvent(new vh("statechange", { oldState: a, newState: l, originalEvent: t }));
      }
    }
  }
  a(t) {
    switch (yr && clearTimeout(this.n), t.type) {
      case "pageshow":
      case "resume":
        this.r(t, dt());
        break;
      case "focus":
        this.r(t, we);
        break;
      case "blur":
        this.s === we && this.r(t, dt());
        break;
      case "pagehide":
      case "unload":
        this.r(t, t.persisted ? Se : nn);
        break;
      case "visibilitychange":
        this.s !== Se && this.s !== nn && this.r(t, dt());
        break;
      case "freeze":
        this.r(t, Se);
    }
  }
}
var wh = new Oh();
const xh = As, Di = V, Pt = Ke, Sh = Dt, Ah = wt, Eh = x, Dh = ot, ji = z, jh = qp, Th = vp, Ch = nt, Mh = j, Ti = function(e, t) {
  return j.status == "none" || j.status == "remove" || j.status == "destroy" ? (pt(e), V.resetAppData(), xi(t) ? (Pt.install(), se(e) && Ci(e), !0) : (console.warn("应用已存在，不可重复创建"), !1)) : (console.warn("应用创建失败"), !1);
}, Ci = function(e) {
  let t = pt({});
  uh() || xi() && Pt.reload(), t.status != "display" ? (typeof e == "string" ? t = pt({ dom: e }) : se(e) && (t = pt(e)), lh()) : console.warn("舞台已显示");
}, Lh = function() {
  Si();
}, Ih = function(e = !0) {
  e && (V.clearDataAll(), wt.removeAll()), Ke.removeAll(), x.clear(), En(), Si(), j.status = "destroy", console.log("%c灿destroy", "color:#0aa100");
}, Et = function(e) {
  e instanceof Function ? e(rn) : e && typeof e == "object" && e.install && e.install instanceof Function && e.install(rn);
}, Ph = function({ url: e, name: t }) {
  return new Promise((n, r) => {
    Ge(e, function() {
      typeof t == "string" ? Et(window[t]) : Array.isArray(t) && t.forEach((s) => {
        Et(window[s]);
      }), n();
    });
  });
}, kh = function(e) {
  let t = e.components || [], n = e.actions || [], r = e.data || null, s = e.slots || null, o = {
    width: e.width,
    height: e.height,
    backgroundColor: e.backgroundColor,
    scaleMode: e.scaleMode,
    dom: e.dom,
    interaction: e.interaction,
    clickCursor: e.clickCursor,
    scale: e.scale
  };
  Object.keys(o).forEach((u) => {
    typeof o[u] > "u" && delete o[u];
  }), Pt.add(t), Et(n);
  let l = Ti(o, { slots: s });
  return Di.init(r), l;
};
wh.addEventListener("statechange", function(e) {
  x.emit(ji.PAGE_STATE, { state: e.newState, oldState: e.oldState });
});
const rn = {
  utils: xh,
  rdata: Di,
  component: Pt,
  componentMixin: Sh,
  controller: Ah,
  cmd: Eh,
  typeModel: Dh,
  EVENTS: ji,
  helper: jh,
  remote: Th,
  app: Ch,
  appInfo: Mh,
  use: Et,
  useAsync: Ph,
  createApp: kh,
  displayStage: Ci,
  createStage: Ti,
  destroyStage: Ih
};
console.log("%crd-runtime:1.7.7", "color:#0aa100");
"RD" in window || (window.RD = rn);
export {
  ji as EVENTS,
  Ch as app,
  Mh as appInfo,
  Eh as cmd,
  Pt as component,
  Sh as componentMixin,
  Ah as controller,
  kh as createApp,
  Ti as createStage,
  Ih as destroyStage,
  Ci as displayStage,
  jh as helper,
  Di as rdata,
  Th as remote,
  Lh as removeStage,
  Dh as typeModel,
  Et as use,
  Ph as useAsync,
  xh as utils
};
//# sourceMappingURL=rd-runtime.mjs.map
