window=this;navigator = {};//如果需要用到浏览器协议头，请在<加载代码> 按钮 右侧选择 navigator.js
var JSEncrypt={};
! function(t) {
    var e;

    function i(t, e, i) {
        null != t && ("number" == typeof t ? this.fromNumber(t, e, i) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
    }

    function r() {
        return new i(null)
    }
    "Microsoft Internet Explorer" == navigator.appName ? (i.prototype.am = function(t, e, i, r, s, n) {
        for (var o = 32767 & e, h = e >> 15; --n >= 0;) {
            var a = 32767 & this[t],
                u = this[t++] >> 15,
                c = h * a + u * o;
            s = ((a = o * a + ((32767 & c) << 15) + i[r] + (1073741823 & s)) >>> 30) + (c >>> 15) + h * u + (s >>> 30),
            i[r++] = 1073741823 & a
        }
        return s
    },
    e = 30) : "Netscape" != navigator.appName ? (i.prototype.am = function(t, e, i, r, s, n) {
        for (; --n >= 0;) {
            var o = e * this[t++] + i[r] + s;
            s = Math.floor(o / 67108864),
            i[r++] = 67108863 & o
        }
        return s
    },
    e = 26) : (i.prototype.am = function(t, e, i, r, s, n) {
        for (var o = 16383 & e, h = e >> 14; --n >= 0;) {
            var a = 16383 & this[t],
                u = this[t++] >> 14,
                c = h * a + u * o;
            s = ((a = o * a + ((16383 & c) << 14) + i[r] + s) >> 28) + (c >> 14) + h * u,
            i[r++] = 268435455 & a
        }
        return s
    },
    e = 28),
    i.prototype.DB = e,
    i.prototype.DM = (1 << e) - 1,
    i.prototype.DV = 1 << e;
    i.prototype.FV = Math.pow(2, 52),
    i.prototype.F1 = 52 - e,
    i.prototype.F2 = 2 * e - 52;
    var s, n, o = "0123456789abcdefghijklmnopqrstuvwxyz",
        h = new Array;
    for (s = "0".charCodeAt(0),
    n = 0; n <= 9; ++n)
    h[s++] = n;
    for (s = "a".charCodeAt(0),
    n = 10; n < 36; ++n)
    h[s++] = n;
    for (s = "A".charCodeAt(0),
    n = 10; n < 36; ++n)
    h[s++] = n;

    function a(t) {
        return o.charAt(t)
    }

    function u(t, e) {
        var i = h[t.charCodeAt(e)];
        return null == i ? -1 : i
    }

    function c(t) {
        var e = r();
        return e.fromInt(t),
        e
    }

    function f(t) {
        var e, i = 1;
        return 0 != (e = t >>> 16) && (t = e,
        i += 16),
        0 != (e = t >> 8) && (t = e,
        i += 8),
        0 != (e = t >> 4) && (t = e,
        i += 4),
        0 != (e = t >> 2) && (t = e,
        i += 2),
        0 != (e = t >> 1) && (t = e,
        i += 1),
        i
    }

    function p(t) {
        this.m = t
    }

    function l(t) {
        this.m = t,
        this.mp = t.invDigit(),
        this.mpl = 32767 & this.mp,
        this.mph = this.mp >> 15,
        this.um = (1 << t.DB - 15) - 1,
        this.mt2 = 2 * t.t
    }

    function d(t, e) {
        return t & e
    }

    function g(t, e) {
        return t | e
    }

    function m(t, e) {
        return t ^ e
    }

    function y(t, e) {
        return t & ~e
    }

    function b(t) {
        if (0 == t) return -1;
        var e = 0;
        return 0 == (65535 & t) && (t >>= 16,
        e += 16),
        0 == (255 & t) && (t >>= 8,
        e += 8),
        0 == (15 & t) && (t >>= 4,
        e += 4),
        0 == (3 & t) && (t >>= 2,
        e += 2),
        0 == (1 & t) && ++e,
        e
    }

    function T(t) {
        for (var e = 0; 0 != t;)
        t &= t - 1, ++e;
        return e
    }

    function S() {}

    function R(t) {
        return t
    }

    function E(t) {
        this.r2 = r(),
        this.q3 = r(),
        i.ONE.dlShiftTo(2 * t.t, this.r2),
        this.mu = this.r2.divide(t),
        this.m = t
    }
    p.prototype.convert = function(t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
    },
    p.prototype.revert = function(t) {
        return t
    },
    p.prototype.reduce = function(t) {
        t.divRemTo(this.m, null, t)
    },
    p.prototype.mulTo = function(t, e, i) {
        t.multiplyTo(e, i),
        this.reduce(i)
    },
    p.prototype.sqrTo = function(t, e) {
        t.squareTo(e),
        this.reduce(e)
    },
    l.prototype.convert = function(t) {
        var e = r();
        return t.abs().dlShiftTo(this.m.t, e),
        e.divRemTo(this.m, null, e),
        t.s < 0 && e.compareTo(i.ZERO) > 0 && this.m.subTo(e, e),
        e
    },
    l.prototype.revert = function(t) {
        var e = r();
        return t.copyTo(e),
        this.reduce(e),
        e
    },
    l.prototype.reduce = function(t) {
        for (; t.t <= this.mt2;)
        t[t.t++] = 0;
        for (var e = 0; e < this.m.t; ++e) {
            var i = 32767 & t[e],
                r = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (t[i = e + this.m.t] += this.m.am(0, r, t, e, 0, this.m.t); t[i] >= t.DV;)
            t[i] -= t.DV,
            t[++i]++
        }
        t.clamp(),
        t.drShiftTo(this.m.t, t),
        t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    },
    l.prototype.mulTo = function(t, e, i) {
        t.multiplyTo(e, i),
        this.reduce(i)
    },
    l.prototype.sqrTo = function(t, e) {
        t.squareTo(e),
        this.reduce(e)
    },
    i.prototype.copyTo = function(t) {
        for (var e = this.t - 1; e >= 0; --e)
        t[e] = this[e];
        t.t = this.t,
        t.s = this.s
    },
    i.prototype.fromInt = function(t) {
        this.t = 1,
        this.s = t < 0 ? -1 : 0,
        t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
    },
    i.prototype.fromString = function(t, e) {
        var r;
        if (16 == e) r = 4;
        else if (8 == e) r = 3;
        else if (256 == e) r = 8;
        else if (2 == e) r = 1;
        else if (32 == e) r = 5;
        else {
            if (4 != e) return void this.fromRadix(t, e);
            r = 2
        }
        this.t = 0,
        this.s = 0;
        for (var s = t.length, n = !1, o = 0; --s >= 0;) {
            var h = 8 == r ? 255 & t[s] : u(t, s);
            h < 0 ? "-" == t.charAt(s) && (n = !0) : (n = !1,
            0 == o ? this[this.t++] = h : o + r > this.DB ? (this[this.t - 1] |= (h & (1 << this.DB - o) - 1) << o,
            this[this.t++] = h >> this.DB - o) : this[this.t - 1] |= h << o, (o += r) >= this.DB && (o -= this.DB))
        }
        8 == r && 0 != (128 & t[0]) && (this.s = -1,
        o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)),
        this.clamp(),
        n && i.ZERO.subTo(this, this)
    },
    i.prototype.clamp = function() {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)--this.t
    },
    i.prototype.dlShiftTo = function(t, e) {
        var i;
        for (i = this.t - 1; i >= 0; --i)
        e[i + t] = this[i];
        for (i = t - 1; i >= 0; --i)
        e[i] = 0;
        e.t = this.t + t,
        e.s = this.s
    },
    i.prototype.drShiftTo = function(t, e) {
        for (var i = t; i < this.t; ++i)
        e[i - t] = this[i];
        e.t = Math.max(this.t - t, 0),
        e.s = this.s
    },
    i.prototype.lShiftTo = function(t, e) {
        var i, r = t % this.DB,
            s = this.DB - r,
            n = (1 << s) - 1,
            o = Math.floor(t / this.DB),
            h = this.s << r & this.DM;
        for (i = this.t - 1; i >= 0; --i)
        e[i + o + 1] = this[i] >> s | h,
        h = (this[i] & n) << r;
        for (i = o - 1; i >= 0; --i)
        e[i] = 0;
        e[o] = h,
        e.t = this.t + o + 1,
        e.s = this.s,
        e.clamp()
    },
    i.prototype.rShiftTo = function(t, e) {
        e.s = this.s;
        var i = Math.floor(t / this.DB);
        if (i >= this.t) e.t = 0;
        else {
            var r = t % this.DB,
                s = this.DB - r,
                n = (1 << r) - 1;
            e[0] = this[i] >> r;
            for (var o = i + 1; o < this.t; ++o)
            e[o - i - 1] |= (this[o] & n) << s,
            e[o - i] = this[o] >> r;
            r > 0 && (e[this.t - i - 1] |= (this.s & n) << s),
            e.t = this.t - i,
            e.clamp()
        }
    },
    i.prototype.subTo = function(t, e) {
        for (var i = 0, r = 0, s = Math.min(t.t, this.t); i < s;)
        r += this[i] - t[i],
        e[i++] = r & this.DM,
        r >>= this.DB;
        if (t.t < this.t) {
            for (r -= t.s; i < this.t;)
            r += this[i],
            e[i++] = r & this.DM,
            r >>= this.DB;
            r += this.s
        } else {
            for (r += this.s; i < t.t;)
            r -= t[i],
            e[i++] = r & this.DM,
            r >>= this.DB;
            r -= t.s
        }
        e.s = r < 0 ? -1 : 0,
        r < -1 ? e[i++] = this.DV + r : r > 0 && (e[i++] = r),
        e.t = i,
        e.clamp()
    },
    i.prototype.multiplyTo = function(t, e) {
        var r = this.abs(),
            s = t.abs(),
            n = r.t;
        for (e.t = n + s.t; --n >= 0;)
        e[n] = 0;
        for (n = 0; n < s.t; ++n)
        e[n + r.t] = r.am(0, s[n], e, n, 0, r.t);
        e.s = 0,
        e.clamp(),
        this.s != t.s && i.ZERO.subTo(e, e)
    },
    i.prototype.squareTo = function(t) {
        for (var e = this.abs(), i = t.t = 2 * e.t; --i >= 0;)
        t[i] = 0;
        for (i = 0; i < e.t - 1; ++i) {
            var r = e.am(i, e[i], t, 2 * i, 0, 1);
            (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV,
            t[i + e.t + 1] = 1)
        }
        t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)),
        t.s = 0,
        t.clamp()
    },
    i.prototype.divRemTo = function(t, e, s) {
        var n = t.abs();
        if (!(n.t <= 0)) {
            var o = this.abs();
            if (o.t < n.t) return null != e && e.fromInt(0),
            void(null != s && this.copyTo(s));
            null == s && (s = r());
            var h = r(),
                a = this.s,
                u = t.s,
                c = this.DB - f(n[n.t - 1]);
            c > 0 ? (n.lShiftTo(c, h),
            o.lShiftTo(c, s)) : (n.copyTo(h),
            o.copyTo(s));
            var p = h.t,
                l = h[p - 1];
            if (0 != l) {
                var d = l * (1 << this.F1) + (p > 1 ? h[p - 2] >> this.F2 : 0),
                    g = this.FV / d,
                    m = (1 << this.F1) / d,
                    v = 1 << this.F2,
                    y = s.t,
                    b = y - p,
                    T = null == e ? r() : e;
                for (h.dlShiftTo(b, T),
                s.compareTo(T) >= 0 && (s[s.t++] = 1,
                s.subTo(T, s)),
                i.ONE.dlShiftTo(p, T),
                T.subTo(h, h); h.t < p;)
                h[h.t++] = 0;
                for (; --b >= 0;) {
                    var S = s[--y] == l ? this.DM : Math.floor(s[y] * g + (s[y - 1] + v) * m);
                    if ((s[y] += h.am(0, S, s, b, 0, p)) < S) for (h.dlShiftTo(b, T),
                    s.subTo(T, s); s[y] < --S;)
                    s.subTo(T, s)
                }
                null != e && (s.drShiftTo(p, e),
                a != u && i.ZERO.subTo(e, e)),
                s.t = p,
                s.clamp(),
                c > 0 && s.rShiftTo(c, s),
                a < 0 && i.ZERO.subTo(s, s)
            }
        }
    },
    i.prototype.invDigit = function() {
        if (this.t < 1) return 0;
        var t = this[0];
        if (0 == (1 & t)) return 0;
        var e = 3 & t;
        return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
    },
    i.prototype.isEven = function() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    },
    i.prototype.exp = function(t, e) {
        if (t > 4294967295 || t < 1) return i.ONE;
        var s = r(),
            n = r(),
            o = e.convert(this),
            h = f(t) - 1;
        for (o.copyTo(s); --h >= 0;)
        if (e.sqrTo(s, n), (t & 1 << h) > 0) e.mulTo(n, o, s);
        else {
            var a = s;
            s = n,
            n = a
        }
        return e.revert(s)
    },
    i.prototype.toString = function(t) {
        if (this.s < 0) return "-" + this.negate().toString(t);
        var e;
        if (16 == t) e = 4;
        else if (8 == t) e = 3;
        else if (2 == t) e = 1;
        else if (32 == t) e = 5;
        else {
            if (4 != t) return this.toRadix(t);
            e = 2
        }
        var i, r = (1 << e) - 1,
            s = !1,
            n = "",
            o = this.t,
            h = this.DB - o * this.DB % e;
        if (o-- > 0) for (h < this.DB && (i = this[o] >> h) > 0 && (s = !0,
        n = a(i)); o >= 0;)
        h < e ? (i = (this[o] & (1 << h) - 1) << e - h,
        i |= this[--o] >> (h += this.DB - e)) : (i = this[o] >> (h -= e) & r,
        h <= 0 && (h += this.DB, --o)),
        i > 0 && (s = !0),
        s && (n += a(i));
        return s ? n : "0"
    },
    i.prototype.negate = function() {
        var t = r();
        return i.ZERO.subTo(this, t),
        t
    },
    i.prototype.abs = function() {
        return this.s < 0 ? this.negate() : this
    },
    i.prototype.compareTo = function(t) {
        var e = this.s - t.s;
        if (0 != e) return e;
        var i = this.t;
        if (0 != (e = i - t.t)) return this.s < 0 ? -e : e;
        for (; --i >= 0;)
        if (0 != (e = this[i] - t[i])) return e;
        return 0
    },
    i.prototype.bitLength = function() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + f(this[this.t - 1] ^ this.s & this.DM)
    },
    i.prototype.mod = function(t) {
        var e = r();
        return this.abs().divRemTo(t, null, e),
        this.s < 0 && e.compareTo(i.ZERO) > 0 && t.subTo(e, e),
        e
    },
    i.prototype.modPowInt = function(t, e) {
        var i;
        return i = t < 256 || e.isEven() ? new p(e) : new l(e),
        this.exp(t, i)
    },
    i.ZERO = c(0),
    i.ONE = c(1),
    S.prototype.convert = R,
    S.prototype.revert = R,
    S.prototype.mulTo = function(t, e, i) {
        t.multiplyTo(e, i)
    },
    S.prototype.sqrTo = function(t, e) {
        t.squareTo(e)
    },
    E.prototype.convert = function(t) {
        if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
        if (t.compareTo(this.m) < 0) return t;
        var e = r();
        return t.copyTo(e),
        this.reduce(e),
        e
    },
    E.prototype.revert = function(t) {
        return t
    },
    E.prototype.reduce = function(t) {
        for (t.drShiftTo(this.m.t - 1, this.r2),
        t.t > this.m.t + 1 && (t.t = this.m.t + 1,
        t.clamp()),
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;)
        t.dAddOffset(1, this.m.t + 1);
        for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;)
        t.subTo(this.m, t)
    },
    E.prototype.mulTo = function(t, e, i) {
        t.multiplyTo(e, i),
        this.reduce(i)
    },
    E.prototype.sqrTo = function(t, e) {
        t.squareTo(e),
        this.reduce(e)
    };
    var D = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
        w = (1 << 26) / D[D.length - 1];

    function x() {
        this.i = 0,
        this.j = 0,
        this.S = new Array
    }
    i.prototype.chunkSize = function(t) {
        return Math.floor(Math.LN2 * this.DB / Math.log(t))
    },
    i.prototype.toRadix = function(t) {
        if (null == t && (t = 10),
        0 == this.signum() || t < 2 || t > 36) return "0";
        var e = this.chunkSize(t),
            i = Math.pow(t, e),
            s = c(i),
            n = r(),
            o = r(),
            h = "";
        for (this.divRemTo(s, n, o); n.signum() > 0;)
        h = (i + o.intValue()).toString(t).substr(1) + h,
        n.divRemTo(s, n, o);
        return o.intValue().toString(t) + h
    },
    i.prototype.fromRadix = function(t, e) {
        this.fromInt(0),
        null == e && (e = 10);
        for (var r = this.chunkSize(e), s = Math.pow(e, r), n = !1, o = 0, h = 0, a = 0; a < t.length; ++a) {
            var c = u(t, a);
            c < 0 ? "-" == t.charAt(a) && 0 == this.signum() && (n = !0) : (h = e * h + c, ++o >= r && (this.dMultiply(s),
            this.dAddOffset(h, 0),
            o = 0,
            h = 0))
        }
        o > 0 && (this.dMultiply(Math.pow(e, o)),
        this.dAddOffset(h, 0)),
        n && i.ZERO.subTo(this, this)
    },
    i.prototype.fromNumber = function(t, e, r) {
        if ("number" == typeof e) if (t < 2) this.fromInt(1);
        else for (this.fromNumber(t, r),
        this.testBit(t - 1) || this.bitwiseTo(i.ONE.shiftLeft(t - 1), g, this),
        this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e);)
        this.dAddOffset(2, 0),
        this.bitLength() > t && this.subTo(i.ONE.shiftLeft(t - 1), this);
        else {
            var s = new Array,
                n = 7 & t;
            s.length = 1 + (t >> 3),
            e.nextBytes(s),
            n > 0 ? s[0] &= (1 << n) - 1 : s[0] = 0,
            this.fromString(s, 256)
        }
    },
    i.prototype.bitwiseTo = function(t, e, i) {
        var r, s, n = Math.min(t.t, this.t);
        for (r = 0; r < n; ++r)
        i[r] = e(this[r], t[r]);
        if (t.t < this.t) {
            for (s = t.s & this.DM,
            r = n; r < this.t; ++r)
            i[r] = e(this[r], s);
            i.t = this.t
        } else {
            for (s = this.s & this.DM,
            r = n; r < t.t; ++r)
            i[r] = e(s, t[r]);
            i.t = t.t
        }
        i.s = e(this.s, t.s),
        i.clamp()
    },
    i.prototype.changeBit = function(t, e) {
        var r = i.ONE.shiftLeft(t);
        return this.bitwiseTo(r, e, r),
        r
    },
    i.prototype.addTo = function(t, e) {
        for (var i = 0, r = 0, s = Math.min(t.t, this.t); i < s;)
        r += this[i] + t[i],
        e[i++] = r & this.DM,
        r >>= this.DB;
        if (t.t < this.t) {
            for (r += t.s; i < this.t;)
            r += this[i],
            e[i++] = r & this.DM,
            r >>= this.DB;
            r += this.s
        } else {
            for (r += this.s; i < t.t;)
            r += t[i],
            e[i++] = r & this.DM,
            r >>= this.DB;
            r += t.s
        }
        e.s = r < 0 ? -1 : 0,
        r > 0 ? e[i++] = r : r < -1 && (e[i++] = this.DV + r),
        e.t = i,
        e.clamp()
    },
    i.prototype.dMultiply = function(t) {
        this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t,
        this.clamp()
    },
    i.prototype.dAddOffset = function(t, e) {
        if (0 != t) {
            for (; this.t <= e;)
            this[this.t++] = 0;
            for (this[e] += t; this[e] >= this.DV;)
            this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e]
        }
    },
    i.prototype.multiplyLowerTo = function(t, e, i) {
        var r, s = Math.min(this.t + t.t, e);
        for (i.s = 0,
        i.t = s; s > 0;)
        i[--s] = 0;
        for (r = i.t - this.t; s < r; ++s)
        i[s + this.t] = this.am(0, t[s], i, s, 0, this.t);
        for (r = Math.min(t.t, e); s < r; ++s)
        this.am(0, t[s], i, s, 0, e - s);
        i.clamp()
    },
    i.prototype.multiplyUpperTo = function(t, e, i) {
        --e;
        var r = i.t = this.t + t.t - e;
        for (i.s = 0; --r >= 0;)
        i[r] = 0;
        for (r = Math.max(e - this.t, 0); r < t.t; ++r)
        i[this.t + r - e] = this.am(e - r, t[r], i, 0, 0, this.t + r - e);
        i.clamp(),
        i.drShiftTo(1, i)
    },
    i.prototype.modInt = function(t) {
        if (t <= 0) return 0;
        var e = this.DV % t,
            i = this.s < 0 ? t - 1 : 0;
        if (this.t > 0) if (0 == e) i = this[0] % t;
        else for (var r = this.t - 1; r >= 0; --r)
        i = (e * i + this[r]) % t;
        return i
    },
    i.prototype.millerRabin = function(t) {
        var e = this.subtract(i.ONE),
            s = e.getLowestSetBit();
        if (s <= 0) return !1;
        var n = e.shiftRight(s);
        (t = t + 1 >> 1) > D.length && (t = D.length);
        for (var o = r(), h = 0; h < t; ++h) {
            o.fromInt(D[Math.floor(Math.random() * D.length)]);
            var a = o.modPow(n, this);
            if (0 != a.compareTo(i.ONE) && 0 != a.compareTo(e)) {
                for (var u = 1; u++ < s && 0 != a.compareTo(e);)
                if (0 == (a = a.modPowInt(2, this)).compareTo(i.ONE)) return !1;
                if (0 != a.compareTo(e)) return !1
            }
        }
        return !0
    },
    i.prototype.clone = function() {
        var t = r();
        return this.copyTo(t),
        t
    },
    i.prototype.intValue = function() {
        if (this.s < 0) {
            if (1 == this.t) return this[0] - this.DV;
            if (0 == this.t) return -1
        } else {
            if (1 == this.t) return this[0];
            if (0 == this.t) return 0
        }
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
    },
    i.prototype.byteValue = function() {
        return 0 == this.t ? this.s : this[0] << 24 >> 24
    },
    i.prototype.shortValue = function() {
        return 0 == this.t ? this.s : this[0] << 16 >> 16
    },
    i.prototype.signum = function() {
        return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
    },
    i.prototype.toByteArray = function() {
        var t = this.t,
            e = new Array;
        e[0] = this.s;
        var i, r = this.DB - t * this.DB % 8,
            s = 0;
        if (t-- > 0) for (r < this.DB && (i = this[t] >> r) != (this.s & this.DM) >> r && (e[s++] = i | this.s << this.DB - r); t >= 0;)
        r < 8 ? (i = (this[t] & (1 << r) - 1) << 8 - r,
        i |= this[--t] >> (r += this.DB - 8)) : (i = this[t] >> (r -= 8) & 255,
        r <= 0 && (r += this.DB, --t)),
        0 != (128 & i) && (i |= -256),
        0 == s && (128 & this.s) != (128 & i) && ++s, (s > 0 || i != this.s) && (e[s++] = i);
        return e
    },
    i.prototype.equals = function(t) {
        return 0 == this.compareTo(t)
    },
    i.prototype.min = function(t) {
        return this.compareTo(t) < 0 ? this : t
    },
    i.prototype.max = function(t) {
        return this.compareTo(t) > 0 ? this : t
    },
    i.prototype.and = function(t) {
        var e = r();
        return this.bitwiseTo(t, d, e),
        e
    },
    i.prototype.or = function(t) {
        var e = r();
        return this.bitwiseTo(t, g, e),
        e
    },
    i.prototype.xor = function(t) {
        var e = r();
        return this.bitwiseTo(t, m, e),
        e
    },
    i.prototype.andNot = function(t) {
        var e = r();
        return this.bitwiseTo(t, y, e),
        e
    },
    i.prototype.not = function() {
        for (var t = r(), e = 0; e < this.t; ++e)
        t[e] = this.DM & ~this[e];
        return t.t = this.t,
        t.s = ~this.s,
        t
    },
    i.prototype.shiftLeft = function(t) {
        var e = r();
        return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
        e
    },
    i.prototype.shiftRight = function(t) {
        var e = r();
        return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
        e
    },
    i.prototype.getLowestSetBit = function() {
        for (var t = 0; t < this.t; ++t)
        if (0 != this[t]) return t * this.DB + b(this[t]);
        return this.s < 0 ? this.t * this.DB : -1
    },
    i.prototype.bitCount = function() {
        for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i)
        t += T(this[i] ^ e);
        return t
    },
    i.prototype.testBit = function(t) {
        var e = Math.floor(t / this.DB);
        return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
    },
    i.prototype.setBit = function(t) {
        return this.changeBit(t, g)
    },
    i.prototype.clearBit = function(t) {
        return this.changeBit(t, y)
    },
    i.prototype.flipBit = function(t) {
        return this.changeBit(t, m)
    },
    i.prototype.add = function(t) {
        var e = r();
        return this.addTo(t, e),
        e
    },
    i.prototype.subtract = function(t) {
        var e = r();
        return this.subTo(t, e),
        e
    },
    i.prototype.multiply = function(t) {
        var e = r();
        return this.multiplyTo(t, e),
        e
    },
    i.prototype.divide = function(t) {
        var e = r();
        return this.divRemTo(t, e, null),
        e
    },
    i.prototype.remainder = function(t) {
        var e = r();
        return this.divRemTo(t, null, e),
        e
    },
    i.prototype.divideAndRemainder = function(t) {
        var e = r(),
            i = r();
        return this.divRemTo(t, e, i),
        new Array(e, i)
    },
    i.prototype.modPow = function(t, e) {
        var i, s, n = t.bitLength(),
            o = c(1);
        if (n <= 0) return o;
        i = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6,
        s = n < 8 ? new p(e) : e.isEven() ? new E(e) : new l(e);
        var h = new Array,
            a = 3,
            u = i - 1,
            d = (1 << i) - 1;
        if (h[1] = s.convert(this),
        i > 1) {
            var g = r();
            for (s.sqrTo(h[1], g); a <= d;)
            h[a] = r(),
            s.mulTo(g, h[a - 2], h[a]),
            a += 2
        }
        var m, v, y = t.t - 1,
            b = !0,
            T = r();
        for (n = f(t[y]) - 1; y >= 0;) {
            for (n >= u ? m = t[y] >> n - u & d : (m = (t[y] & (1 << n + 1) - 1) << u - n,
            y > 0 && (m |= t[y - 1] >> this.DB + n - u)),
            a = i; 0 == (1 & m);)
            m >>= 1, --a;
            if ((n -= a) < 0 && (n += this.DB, --y),
            b) h[m].copyTo(o),
            b = !1;
            else {
                for (; a > 1;)
                s.sqrTo(o, T),
                s.sqrTo(T, o),
                a -= 2;
                a > 0 ? s.sqrTo(o, T) : (v = o,
                o = T,
                T = v),
                s.mulTo(T, h[m], o)
            }
            for (; y >= 0 && 0 == (t[y] & 1 << n);)
            s.sqrTo(o, T),
            v = o,
            o = T,
            T = v, --n < 0 && (n = this.DB - 1, --y)
        }
        return s.revert(o)
    },
    i.prototype.modInverse = function(t) {
        var e = t.isEven();
        if (this.isEven() && e || 0 == t.signum()) return i.ZERO;
        for (var r = t.clone(), s = this.clone(), n = c(1), o = c(0), h = c(0), a = c(1); 0 != r.signum();) {
            for (; r.isEven();)
            r.rShiftTo(1, r),
            e ? (n.isEven() && o.isEven() || (n.addTo(this, n),
            o.subTo(t, o)),
            n.rShiftTo(1, n)) : o.isEven() || o.subTo(t, o),
            o.rShiftTo(1, o);
            for (; s.isEven();)
            s.rShiftTo(1, s),
            e ? (h.isEven() && a.isEven() || (h.addTo(this, h),
            a.subTo(t, a)),
            h.rShiftTo(1, h)) : a.isEven() || a.subTo(t, a),
            a.rShiftTo(1, a);
            r.compareTo(s) >= 0 ? (r.subTo(s, r),
            e && n.subTo(h, n),
            o.subTo(a, o)) : (s.subTo(r, s),
            e && h.subTo(n, h),
            a.subTo(o, a))
        }
        return 0 != s.compareTo(i.ONE) ? i.ZERO : a.compareTo(t) >= 0 ? a.subtract(t) : a.signum() < 0 ? (a.addTo(t, a),
        a.signum() < 0 ? a.add(t) : a) : a
    },
    i.prototype.pow = function(t) {
        return this.exp(t, new S)
    },
    i.prototype.gcd = function(t) {
        var e = this.s < 0 ? this.negate() : this.clone(),
            i = t.s < 0 ? t.negate() : t.clone();
        if (e.compareTo(i) < 0) {
            var r = e;
            e = i,
            i = r
        }
        var s = e.getLowestSetBit(),
            n = i.getLowestSetBit();
        if (n < 0) return e;
        for (s < n && (n = s),
        n > 0 && (e.rShiftTo(n, e),
        i.rShiftTo(n, i)); e.signum() > 0;)
        (s = e.getLowestSetBit()) > 0 && e.rShiftTo(s, e), (s = i.getLowestSetBit()) > 0 && i.rShiftTo(s, i),
        e.compareTo(i) >= 0 ? (e.subTo(i, e),
        e.rShiftTo(1, e)) : (i.subTo(e, i),
        i.rShiftTo(1, i));
        return n > 0 && i.lShiftTo(n, i),
        i
    },
    i.prototype.isProbablePrime = function(t) {
        var e, i = this.abs();
        if (1 == i.t && i[0] <= D[D.length - 1]) {
            for (e = 0; e < D.length; ++e)
            if (i[0] == D[e]) return !0;
            return !1
        }
        if (i.isEven()) return !1;
        for (e = 1; e < D.length;) {
            for (var r = D[e], s = e + 1; s < D.length && r < w;)
            r *= D[s++];
            for (r = i.modInt(r); e < s;)
            if (r % D[e++] == 0) return !1
        }
        return i.millerRabin(t)
    },
    i.prototype.square = function() {
        var t = r();
        return this.squareTo(t),
        t
    },
    x.prototype.init = function(t) {
        var e, i, r;
        for (e = 0; e < 256; ++e)
        this.S[e] = e;
        for (i = 0,
        e = 0; e < 256; ++e)
        i = i + this.S[e] + t[e % t.length] & 255,
        r = this.S[e],
        this.S[e] = this.S[i],
        this.S[i] = r;
        this.i = 0,
        this.j = 0
    },
    x.prototype.next = function() {
        var t;
        return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        t = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = t,
        this.S[t + this.S[this.i] & 255]
    };
    var K, B, A, U = 256;
    if (null == B) {
        var O;
        if (B = new Array,
        A = 0,
        window.crypto && window.crypto.getRandomValues) {
            var V = new Uint32Array(256);
            for (window.crypto.getRandomValues(V),
            O = 0; O < V.length; ++O)
            B[A++] = 255 & V[O]
        }
        var J = function(t) {
            if (this.count = this.count || 0,
            this.count >= 256 || A >= U) window.removeEventListener ? window.removeEventListener("mousemove", J) : window.detachEvent && window.detachEvent("onmousemove", J);
            else {
                this.count += 1;
                var e = t.x + t.y;
                B[A++] = 255 & e
            }
        };
        window.addEventListener ? window.addEventListener("mousemove", J) : window.attachEvent && window.attachEvent("onmousemove", J)
    }

    function N() {
        if (null == K) {
            for (K = new x; A < U;) {
                var t = Math.floor(65536 * Math.random());
                B[A++] = 255 & t
            }
            for (K.init(B),
            A = 0; A < B.length; ++A)
            B[A] = 0;
            A = 0
        }
        return K.next()
    }

    function I() {}

    function P(t, e) {
        return new i(t, e)
    }

    function M() {
        this.n = null,
        this.e = 0,
        this.d = null,
        this.p = null,
        this.q = null,
        this.dmp1 = null,
        this.dmq1 = null,
        this.coeff = null
    }
    I.prototype.nextBytes = function(t) {
        var e;
        for (e = 0; e < t.length; ++e)
        t[e] = N()
    },
    M.prototype.doPublic = function(t) {
        return t.modPowInt(this.e, this.n)
    },
    M.prototype.setPublic = function(t, e) {
        null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = P(t, 16),
        this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
    },
    M.prototype.encrypt = function(t) {
        var e = function(t, e) {
            if (e < t.length + 11) return console.error("Message too long for RSA"),
            null;
            for (var r = new Array, s = t.length - 1; s >= 0 && e > 0;) {
                var n = t.charCodeAt(s--);
                n < 128 ? r[--e] = n : n > 127 && n < 2048 ? (r[--e] = 63 & n | 128,
                r[--e] = n >> 6 | 192) : (r[--e] = 63 & n | 128,
                r[--e] = n >> 6 & 63 | 128,
                r[--e] = n >> 12 | 224)
            }
            r[--e] = 0;
            for (var o = new I, h = new Array; e > 2;) {
                for (h[0] = 0; 0 == h[0];)
                o.nextBytes(h);
                r[--e] = h[0]
            }
            return r[--e] = 2,
            r[--e] = 0,
            new i(r)
        }(t, this.n.bitLength() + 7 >> 3);
        if (null == e) return null;
        var r = this.doPublic(e);
        if (null == r) return null;
        var s = r.toString(16);
        return 0 == (1 & s.length) ? s : "0" + s
    },
    M.prototype.doPrivate = function(t) {
        if (null == this.p || null == this.q) return t.modPow(this.d, this.n);
        for (var e = t.mod(this.p).modPow(this.dmp1, this.p), i = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(i) < 0;)
        e = e.add(this.p);
        return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i)
    },
    M.prototype.setPrivate = function(t, e, i) {
        null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = P(t, 16),
        this.e = parseInt(e, 16),
        this.d = P(i, 16)) : console.error("Invalid RSA private key")
    },
    M.prototype.setPrivateEx = function(t, e, i, r, s, n, o, h) {
        null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = P(t, 16),
        this.e = parseInt(e, 16),
        this.d = P(i, 16),
        this.p = P(r, 16),
        this.q = P(s, 16),
        this.dmp1 = P(n, 16),
        this.dmq1 = P(o, 16),
        this.coeff = P(h, 16)) : console.error("Invalid RSA private key")
    },
    M.prototype.generate = function(t, e) {
        var r = new I,
            s = t >> 1;
        this.e = parseInt(e, 16);
        for (var n = new i(e, 16);;) {
            for (; this.p = new i(t - s, 1, r),
            0 != this.p.subtract(i.ONE).gcd(n).compareTo(i.ONE) || !this.p.isProbablePrime(10););
            for (; this.q = new i(s, 1, r),
            0 != this.q.subtract(i.ONE).gcd(n).compareTo(i.ONE) || !this.q.isProbablePrime(10););
            if (this.p.compareTo(this.q) <= 0) {
                var o = this.p;
                this.p = this.q,
                this.q = o
            }
            var h = this.p.subtract(i.ONE),
                a = this.q.subtract(i.ONE),
                u = h.multiply(a);
            if (0 == u.gcd(n).compareTo(i.ONE)) {
                this.n = this.p.multiply(this.q),
                this.d = n.modInverse(u),
                this.dmp1 = this.d.mod(h),
                this.dmq1 = this.d.mod(a),
                this.coeff = this.q.modInverse(this.p);
                break
            }
        }
    },
    M.prototype.decrypt = function(t) {
        var e = P(t, 16),
            i = this.doPrivate(e);
        return null == i ? null : function(t, e) {
            for (var i = t.toByteArray(), r = 0; r < i.length && 0 == i[r];)++r;
            if (i.length - r != e - 1 || 2 != i[r]) return null;
            for (++r; 0 != i[r];)
            if (++r >= i.length) return null;
            for (var s = ""; ++r < i.length;) {
                var n = 255 & i[r];
                n < 128 ? s += String.fromCharCode(n) : n > 191 && n < 224 ? (s += String.fromCharCode((31 & n) << 6 | 63 & i[r + 1]), ++r) : (s += String.fromCharCode((15 & n) << 12 | (63 & i[r + 1]) << 6 | 63 & i[r + 2]),
                r += 2)
            }
            return s
        }(i, this.n.bitLength() + 7 >> 3)
    },

    function() {
        M.prototype.generateAsync = function(t, e, s) {
            var n = new I,
                o = t >> 1;
            this.e = parseInt(e, 16);
            var h = new i(e, 16),
                a = this,
                u = function() {
                    var e = function() {
                        if (a.p.compareTo(a.q) <= 0) {
                            var t = a.p;
                            a.p = a.q,
                            a.q = t
                        }
                        var e = a.p.subtract(i.ONE),
                            r = a.q.subtract(i.ONE),
                            n = e.multiply(r);
                        0 == n.gcd(h).compareTo(i.ONE) ? (a.n = a.p.multiply(a.q),
                        a.d = h.modInverse(n),
                        a.dmp1 = a.d.mod(e),
                        a.dmq1 = a.d.mod(r),
                        a.coeff = a.q.modInverse(a.p),
                        setTimeout(function() {
                            s()
                        }, 0)) : setTimeout(u, 0)
                    }, c = function() {
                        a.q = r(),
                        a.q.fromNumberAsync(o, 1, n, function() {
                            a.q.subtract(i.ONE).gcda(h, function(t) {
                                0 == t.compareTo(i.ONE) && a.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(c, 0)
                            })
                        })
                    }, f = function() {
                        a.p = r(),
                        a.p.fromNumberAsync(t - o, 1, n, function() {
                            a.p.subtract(i.ONE).gcda(h, function(t) {
                                0 == t.compareTo(i.ONE) && a.p.isProbablePrime(10) ? setTimeout(c, 0) : setTimeout(f, 0)
                            })
                        })
                    };
                    setTimeout(f, 0)
                };
            setTimeout(u, 0)
        };
        i.prototype.gcda = function(t, e) {
            var i = this.s < 0 ? this.negate() : this.clone(),
                r = t.s < 0 ? t.negate() : t.clone();
            if (i.compareTo(r) < 0) {
                var s = i;
                i = r,
                r = s
            }
            var n = i.getLowestSetBit(),
                o = r.getLowestSetBit();
            if (o < 0) e(i);
            else {
                n < o && (o = n),
                o > 0 && (i.rShiftTo(o, i),
                r.rShiftTo(o, r));
                var h = function() {
                    (n = i.getLowestSetBit()) > 0 && i.rShiftTo(n, i), (n = r.getLowestSetBit()) > 0 && r.rShiftTo(n, r),
                    i.compareTo(r) >= 0 ? (i.subTo(r, i),
                    i.rShiftTo(1, i)) : (r.subTo(i, r),
                    r.rShiftTo(1, r)),
                    i.signum() > 0 ? setTimeout(h, 0) : (o > 0 && r.lShiftTo(o, r),
                    setTimeout(function() {
                        e(r)
                    }, 0))
                };
                setTimeout(h, 10)
            }
        };
        i.prototype.fromNumberAsync = function(t, e, r, s) {
            if ("number" == typeof e) if (t < 2) this.fromInt(1);
            else {
                this.fromNumber(t, r),
                this.testBit(t - 1) || this.bitwiseTo(i.ONE.shiftLeft(t - 1), g, this),
                this.isEven() && this.dAddOffset(1, 0);
                var n = this,
                    o = function() {
                        n.dAddOffset(2, 0),
                        n.bitLength() > t && n.subTo(i.ONE.shiftLeft(t - 1), n),
                        n.isProbablePrime(e) ? setTimeout(function() {
                            s()
                        }, 0) : setTimeout(o, 0)
                    };
                setTimeout(o, 0)
            } else {
                var h = new Array,
                    a = 7 & t;
                h.length = 1 + (t >> 3),
                e.nextBytes(h),
                a > 0 ? h[0] &= (1 << a) - 1 : h[0] = 0,
                this.fromString(h, 256)
            }
        }
    }();
    var L = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        q = "=";

    function C(t) {
        var e, i, r = "";
        for (e = 0; e + 3 <= t.length; e += 3)
        i = parseInt(t.substring(e, e + 3), 16),
        r += L.charAt(i >> 6) + L.charAt(63 & i);
        for (e + 1 == t.length ? (i = parseInt(t.substring(e, e + 1), 16),
        r += L.charAt(i << 2)) : e + 2 == t.length && (i = parseInt(t.substring(e, e + 2), 16),
        r += L.charAt(i >> 2) + L.charAt((3 & i) << 4));
        (3 & r.length) > 0;)
        r += q;
        return r
    }

    function H(t) {
        var e, i, r = "",
            s = 0;
        for (e = 0; e < t.length && t.charAt(e) != q; ++e)
        v = L.indexOf(t.charAt(e)),
        v < 0 || (0 == s ? (r += a(v >> 2),
        i = 3 & v,
        s = 1) : 1 == s ? (r += a(i << 2 | v >> 4),
        i = 15 & v,
        s = 2) : 2 == s ? (r += a(i),
        r += a(v >> 2),
        i = 3 & v,
        s = 3) : (r += a(i << 2 | v >> 4),
        r += a(15 & v),
        s = 0));
        return 1 == s && (r += a(i << 2)),
        r
    }
    /*! asn1-1.0.2.js (c) 2013 Kenji Urushima | kjur.github.com/jsrsasign/license
     */
    var j = j || {};
    j.env = j.env || {};
    var k = j,
        F = Object.prototype,
        _ = ["toString", "valueOf"];
    j.env.parseUA = function(t) {
        var e, i = function(t) {
            var e = 0;
            return parseFloat(t.replace(/\./g, function() {
                return 1 == e++ ? "" : "."
            }))
        }, r = navigator,
            s = {
                ie: 0,
                opera: 0,
                gecko: 0,
                webkit: 0,
                chrome: 0,
                mobile: null,
                air: 0,
                ipad: 0,
                iphone: 0,
                ipod: 0,
                ios: null,
                android: 0,
                webos: 0,
                caja: r && r.cajaVersion,
                secure: !1,
                os: null
            }, n = t || navigator && navigator.userAgent,
            o = window && window.location,
            h = o && o.href;
        return s.secure = h && 0 === h.toLowerCase().indexOf("https"),
        n && (/windows|win32/i.test(n) ? s.os = "windows" : /macintosh/i.test(n) ? s.os = "macintosh" : /rhino/i.test(n) && (s.os = "rhino"),
            /KHTML/.test(n) && (s.webkit = 1), (e = n.match(/AppleWebKit\/([^\s]*)/)) && e[1] && (s.webkit = i(e[1]),
            / Mobile\//.test(n) ? (s.mobile = "Apple", (e = n.match(/OS ([^\s]*)/)) && e[1] && (e = i(e[1].replace("_", "."))),
        s.ios = e,
        s.ipad = s.ipod = s.iphone = 0, (e = n.match(/iPad|iPod|iPhone/)) && e[0] && (s[e[0].toLowerCase()] = s.ios)) : ((e = n.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/)) && (s.mobile = e[0]),
            /webOS/.test(n) && (s.mobile = "WebOS", (e = n.match(/webOS\/([^\s]*);/)) && e[1] && (s.webos = i(e[1]))),
            / Android/.test(n) && (s.mobile = "Android", (e = n.match(/Android ([^\s]*);/)) && e[1] && (s.android = i(e[1])))), (e = n.match(/Chrome\/([^\s]*)/)) && e[1] ? s.chrome = i(e[1]) : (e = n.match(/AdobeAIR\/([^\s]*)/)) && (s.air = e[0])),
        s.webkit || ((e = n.match(/Opera[\s\/]([^\s]*)/)) && e[1] ? (s.opera = i(e[1]), (e = n.match(/Version\/([^\s]*)/)) && e[1] && (s.opera = i(e[1])), (e = n.match(/Opera Mini[^;]*/)) && (s.mobile = e[0])) : (e = n.match(/MSIE\s([^;]*)/)) && e[1] ? s.ie = i(e[1]) : (e = n.match(/Gecko\/([^\s]*)/)) && (s.gecko = 1, (e = n.match(/rv:([^\s\)]*)/)) && e[1] && (s.gecko = i(e[1]))))),
        s
    },
    j.env.ua = j.env.parseUA(),
    j.isFunction = function(t) {
        return "function" == typeof t || "[object Function]" === F.toString.apply(t)
    },
    j._IEEnumFix = j.env.ua.ie ? function(t, e) {
        var i, r, s;
        for (i = 0; i < _.length; i += 1)
        s = e[r = _[i]],
        k.isFunction(s) && s != F[r] && (t[r] = s)
    } : function() {},
    j.extend = function(t, e, i) {
        if (!e || !t) throw new Error("extend failed, please check that all dependencies are included.");
        var r, s = function() {};
        if (s.prototype = e.prototype,
        t.prototype = new s,
        t.prototype.constructor = t,
        t.superclass = e.prototype,
        e.prototype.constructor == F.constructor && (e.prototype.constructor = e),
        i) {
            for (r in i)
            k.hasOwnProperty(i, r) && (t.prototype[r] = i[r]);
            k._IEEnumFix(t.prototype, i)
        }
    },
    /**
     * @fileOverview
     * @name asn1-1.0.js
     * @author Kenji Urushima kenji.urushima@gmail.com
     * @version 1.0.2 (2013-May-30)
     * @since 2.1
     * @license <a href="http://kjur.github.io/jsrsasign/license/">MIT License</a>
     */
        "undefined" != typeof KJUR && KJUR || (KJUR = {}),
    void 0 !== KJUR.asn1 && KJUR.asn1 || (KJUR.asn1 = {}),
    KJUR.asn1.ASN1Util = new function() {
        this.integerToByteHex = function(t) {
            var e = t.toString(16);
            return e.length % 2 == 1 && (e = "0" + e),
            e
        },
        this.bigIntToMinTwosComplementsHex = function(t) {
            var e = t.toString(16);
            if ("-" != e.substr(0, 1)) e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
            else {
                var r = e.substr(1).length;
                r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2);
                for (var s = "", n = 0; n < r; n++)
                s += "f";
                e = new i(s, 16).xor(t).add(i.ONE).toString(16).replace(/^-/, "")
            }
            return e
        },
        this.getPEMStringFromHex = function(t, e) {
            var i = CryptoJS.enc.Hex.parse(t),
                r = CryptoJS.enc.Base64.stringify(i).replace(/(.{64})/g, "$1\r\n");
            return "-----BEGIN " + e + "-----\r\n" + (r = r.replace(/\r\n$/, "")) + "\r\n-----END " + e + "-----\r\n"
        }
    },
    KJUR.asn1.ASN1Object = function() {
        this.getLengthHexFromValue = function() {
            if (void 0 === this.hV || null == this.hV) throw "this.hV is null or undefined.";
            if (this.hV.length % 2 == 1) throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
            var t = this.hV.length / 2,
                e = t.toString(16);
            if (e.length % 2 == 1 && (e = "0" + e),
            t < 128) return e;
            var i = e.length / 2;
            if (i > 15) throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
            return (128 + i).toString(16) + e
        },
        this.getEncodedHex = function() {
            return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
            this.hL = this.getLengthHexFromValue(),
            this.hTLV = this.hT + this.hL + this.hV,
            this.isModified = !1),
            this.hTLV
        },
        this.getValueHex = function() {
            return this.getEncodedHex(),
            this.hV
        },
        this.getFreshValueHex = function() {
            return ""
        }
    },
    KJUR.asn1.DERAbstractString = function(t) {
        KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
        this.getString = function() {
            return this.s
        },
        this.setString = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = t,
            this.hV = stohex(this.s)
        },
        this.setStringHex = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = t
        },
        this.getFreshValueHex = function() {
            return this.hV
        },
        void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
    },
    j.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERAbstractTime = function(t) {
        KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
        this.localDateToUTC = function(t) {
            return utc = t.getTime() + 6e4 * t.getTimezoneOffset(),
            new Date(utc)
        },
        this.formatDate = function(t, e) {
            var i = this.zeroPadding,
                r = this.localDateToUTC(t),
                s = String(r.getFullYear());
            return "utc" == e && (s = s.substr(2, 2)),
            s + i(String(r.getMonth() + 1), 2) + i(String(r.getDate()), 2) + i(String(r.getHours()), 2) + i(String(r.getMinutes()), 2) + i(String(r.getSeconds()), 2) + "Z"
        },
        this.zeroPadding = function(t, e) {
            return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
        },
        this.getString = function() {
            return this.s
        },
        this.setString = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = t,
            this.hV = stohex(this.s)
        },
        this.setByDateValue = function(t, e, i, r, s, n) {
            var o = new Date(Date.UTC(t, e - 1, i, r, s, n, 0));
            this.setByDate(o)
        },
        this.getFreshValueHex = function() {
            return this.hV
        }
    },
    j.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERAbstractStructured = function(t) {
        KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
        this.setByASN1ObjectArray = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.asn1Array = t
        },
        this.appendASN1Object = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.asn1Array.push(t)
        },
        this.asn1Array = new Array,
        void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
    },
    j.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERBoolean = function() {
        KJUR.asn1.DERBoolean.superclass.constructor.call(this),
        this.hT = "01",
        this.hTLV = "0101ff"
    },
    j.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERInteger = function(t) {
        KJUR.asn1.DERInteger.superclass.constructor.call(this),
        this.hT = "02",
        this.setByBigInteger = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
        },
        this.setByInteger = function(t) {
            var e = new i(String(t), 10);
            this.setByBigInteger(e)
        },
        this.setValueHex = function(t) {
            this.hV = t
        },
        this.getFreshValueHex = function() {
            return this.hV
        },
        void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : void 0 !== t.hex && this.setValueHex(t.hex))
    },
    j.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERBitString = function(t) {
        KJUR.asn1.DERBitString.superclass.constructor.call(this),
        this.hT = "03",
        this.setHexValueIncludingUnusedBits = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.hV = t
        },
        this.setUnusedBitsAndHexValue = function(t, e) {
            if (t < 0 || 7 < t) throw "unused bits shall be from 0 to 7: u = " + t;
            var i = "0" + t;
            this.hTLV = null,
            this.isModified = !0,
            this.hV = i + e
        },
        this.setByBinaryString = function(t) {
            var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
            8 == e && (e = 0);
            for (var i = 0; i <= e; i++)
            t += "0";
            var r = "";
            for (i = 0; i < t.length - 1; i += 8) {
                var s = t.substr(i, 8),
                    n = parseInt(s, 2).toString(16);
                1 == n.length && (n = "0" + n),
                r += n
            }
            this.hTLV = null,
            this.isModified = !0,
            this.hV = "0" + e + r
        },
        this.setByBooleanArray = function(t) {
            for (var e = "", i = 0; i < t.length; i++)
            1 == t[i] ? e += "1" : e += "0";
            this.setByBinaryString(e)
        },
        this.newFalseArray = function(t) {
            for (var e = new Array(t), i = 0; i < t; i++)
            e[i] = !1;
            return e
        },
        this.getFreshValueHex = function() {
            return this.hV
        },
        void 0 !== t && (void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
    },
    j.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object),
    KJUR.asn1.DEROctetString = function(t) {
        KJUR.asn1.DEROctetString.superclass.constructor.call(this, t),
        this.hT = "04"
    },
    j.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString),
    KJUR.asn1.DERNull = function() {
        KJUR.asn1.DERNull.superclass.constructor.call(this),
        this.hT = "05",
        this.hTLV = "0500"
    },
    j.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERObjectIdentifier = function(t) {
        var e = function(t) {
            var e = t.toString(16);
            return 1 == e.length && (e = "0" + e),
            e
        }, r = function(t) {
            var r = "",
                s = new i(t, 10).toString(2),
                n = 7 - s.length % 7;
            7 == n && (n = 0);
            for (var o = "", h = 0; h < n; h++)
            o += "0";
            s = o + s;
            for (h = 0; h < s.length - 1; h += 7) {
                var a = s.substr(h, 7);
                h != s.length - 7 && (a = "1" + a),
                r += e(parseInt(a, 2))
            }
            return r
        };
        KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this),
        this.hT = "06",
        this.setValueHex = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = t
        },
        this.setValueOidString = function(t) {
            if (!t.match(/^[0-9.]+$/)) throw "malformed oid string: " + t;
            var i = "",
                s = t.split("."),
                n = 40 * parseInt(s[0]) + parseInt(s[1]);
            i += e(n),
            s.splice(0, 2);
            for (var o = 0; o < s.length; o++)
            i += r(s[o]);
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = i
        },
        this.setValueName = function(t) {
            if (void 0 === KJUR.asn1.x509.OID.name2oidList[t]) throw "DERObjectIdentifier oidName undefined: " + t;
            var e = KJUR.asn1.x509.OID.name2oidList[t];
            this.setValueOidString(e)
        },
        this.getFreshValueHex = function() {
            return this.hV
        },
        void 0 !== t && (void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
    },
    j.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERUTF8String = function(t) {
        KJUR.asn1.DERUTF8String.superclass.constructor.call(this, t),
        this.hT = "0c"
    },
    j.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString),
    KJUR.asn1.DERNumericString = function(t) {
        KJUR.asn1.DERNumericString.superclass.constructor.call(this, t),
        this.hT = "12"
    },
    j.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString),
    KJUR.asn1.DERPrintableString = function(t) {
        KJUR.asn1.DERPrintableString.superclass.constructor.call(this, t),
        this.hT = "13"
    },
    j.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString),
    KJUR.asn1.DERTeletexString = function(t) {
        KJUR.asn1.DERTeletexString.superclass.constructor.call(this, t),
        this.hT = "14"
    },
    j.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString),
    KJUR.asn1.DERIA5String = function(t) {
        KJUR.asn1.DERIA5String.superclass.constructor.call(this, t),
        this.hT = "16"
    },
    j.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString),
    KJUR.asn1.DERUTCTime = function(t) {
        KJUR.asn1.DERUTCTime.superclass.constructor.call(this, t),
        this.hT = "17",
        this.setByDate = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.date = t,
            this.s = this.formatDate(this.date, "utc"),
            this.hV = stohex(this.s)
        },
        void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
    },
    j.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime),
    KJUR.asn1.DERGeneralizedTime = function(t) {
        KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
        this.hT = "18",
        this.setByDate = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.date = t,
            this.s = this.formatDate(this.date, "gen"),
            this.hV = stohex(this.s)
        },
        void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
    },
    j.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime),
    KJUR.asn1.DERSequence = function(t) {
        KJUR.asn1.DERSequence.superclass.constructor.call(this, t),
        this.hT = "30",
        this.getFreshValueHex = function() {
            for (var t = "", e = 0; e < this.asn1Array.length; e++) {
                t += this.asn1Array[e].getEncodedHex()
            }
            return this.hV = t,
            this.hV
        }
    },
    j.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured),
    KJUR.asn1.DERSet = function(t) {
        KJUR.asn1.DERSet.superclass.constructor.call(this, t),
        this.hT = "31",
        this.getFreshValueHex = function() {
            for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                var i = this.asn1Array[e];
                t.push(i.getEncodedHex())
            }
            return t.sort(),
            this.hV = t.join(""),
            this.hV
        }
    },
    j.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured),
    KJUR.asn1.DERTaggedObject = function(t) {
        KJUR.asn1.DERTaggedObject.superclass.constructor.call(this),
        this.hT = "a0",
        this.hV = "",
        this.isExplicit = !0,
        this.asn1Object = null,
        this.setASN1Object = function(t, e, i) {
            this.hT = e,
            this.isExplicit = t,
            this.asn1Object = i,
            this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
            this.hTLV = null,
            this.isModified = !0) : (this.hV = null,
            this.hTLV = i.getEncodedHex(),
            this.hTLV = this.hTLV.replace(/^../, e),
            this.isModified = !1)
        },
        this.getFreshValueHex = function() {
            return this.hV
        },
        void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag),
        void 0 !== t.explicit && (this.isExplicit = t.explicit),
        void 0 !== t.obj && (this.asn1Object = t.obj,
        this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
    },
    j.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object),

    function(t) {
        "use strict";
        var e, i = {};
        i.decode = function(t) {
            var i;
            if (void 0 === e) {
                var r = "0123456789ABCDEF",
                    s = " \f\n\r\t?\u2028\u2029";
                for (e = [],
                i = 0; i < 16; ++i)
                e[r.charAt(i)] = i;
                for (r = r.toLowerCase(),
                i = 10; i < 16; ++i)
                e[r.charAt(i)] = i;
                for (i = 0; i < s.length; ++i)
                e[s.charAt(i)] = -1
            }
            var n = [],
                o = 0,
                h = 0;
            for (i = 0; i < t.length; ++i) {
                var a = t.charAt(i);
                if ("=" == a) break;
                if (-1 != (a = e[a])) {
                    if (void 0 === a) throw "Illegal character at offset " + i;
                    o |= a, ++h >= 2 ? (n[n.length] = o,
                    o = 0,
                    h = 0) : o <<= 4
                }
            }
            if (h) throw "Hex encoding incomplete: 4 bits missing";
            return n
        },
        window.Hex = i
    }(),

    function(t) {
        "use strict";
        var e, i = {};
        i.decode = function(t) {
            var i;
            if (void 0 === e) {
                var r = "= \f\n\r\t?\u2028\u2029";
                for (e = [],
                i = 0; i < 64; ++i)
                e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(i)] = i;
                for (i = 0; i < r.length; ++i)
                e[r.charAt(i)] = -1
            }
            var s = [],
                n = 0,
                o = 0;
            for (i = 0; i < t.length; ++i) {
                var h = t.charAt(i);
                if ("=" == h) break;
                if (-1 != (h = e[h])) {
                    if (void 0 === h) throw "Illegal character at offset " + i;
                    n |= h, ++o >= 4 ? (s[s.length] = n >> 16,
                    s[s.length] = n >> 8 & 255,
                    s[s.length] = 255 & n,
                    n = 0,
                    o = 0) : n <<= 6
                }
            }
            switch (o) {
                case 1:
                    throw "Base64 encoding incomplete: at least 2 bits missing";
                case 2:
                    s[s.length] = n >> 10;
                    break;
                case 3:
                    s[s.length] = n >> 16,
                    s[s.length] = n >> 8 & 255
            }
            return s
        },
        i.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
        i.unarmor = function(t) {
            var e = i.re.exec(t);
            if (e) if (e[1]) t = e[1];
            else {
                if (!e[2]) throw "RegExp out of sync";
                t = e[2]
            }
            return i.decode(t)
        },
        window.Base64 = i
    }(),

    function(t) {
        "use strict";
        var e = function(t, e) {
            var i = document.createElement(t);
            return i.className = e,
            i
        }, i = function(t) {
            return document.createTextNode(t)
        };

        function r(t, e) {
            t instanceof r ? (this.enc = t.enc,
            this.pos = t.pos) : (this.enc = t,
            this.pos = e)
        }

        function s(t, e, i, r, s) {
            this.stream = t,
            this.header = e,
            this.length = i,
            this.tag = r,
            this.sub = s
        }
        r.prototype.get = function(t) {
            if (void 0 === t && (t = this.pos++),
            t >= this.enc.length) throw "Requesting byte offset " + t + " on a stream of length " + this.enc.length;
            return this.enc[t]
        },
        r.prototype.hexDigits = "0123456789ABCDEF",
        r.prototype.hexByte = function(t) {
            return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
        },
        r.prototype.hexDump = function(t, e, i) {
            for (var r = "", s = t; s < e; ++s)
            if (r += this.hexByte(this.get(s)), !0 !== i) switch (15 & s) {
                case 7:
                    r += "  ";
                    break;
                case 15:
                    r += "\n";
                    break;
                default:
                    r += " "
            }
            return r
        },
        r.prototype.parseStringISO = function(t, e) {
            for (var i = "", r = t; r < e; ++r)
            i += String.fromCharCode(this.get(r));
            return i
        },
        r.prototype.parseStringUTF = function(t, e) {
            for (var i = "", r = t; r < e;) {
                var s = this.get(r++);
                i += s < 128 ? String.fromCharCode(s) : s > 191 && s < 224 ? String.fromCharCode((31 & s) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & s) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
            }
            return i
        },
        r.prototype.parseStringBMP = function(t, e) {
            for (var i = "", r = t; r < e; r += 2) {
                var s = this.get(r),
                    n = this.get(r + 1);
                i += String.fromCharCode((s << 8) + n)
            }
            return i
        },
        r.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
        r.prototype.parseTime = function(t, e) {
            var i = this.parseStringISO(t, e),
                r = this.reTime.exec(i);
            return r ? (i = r[1] + "-" + r[2] + "-" + r[3] + " " + r[4],
            r[5] && (i += ":" + r[5],
            r[6] && (i += ":" + r[6],
            r[7] && (i += "." + r[7]))),
            r[8] && (i += " UTC",
                "Z" != r[8] && (i += r[8],
            r[9] && (i += ":" + r[9]))),
            i) : "Unrecognized time: " + i
        },
        r.prototype.parseInteger = function(t, e) {
            var i = e - t;
            if (i > 4) {
                i <<= 3;
                var r = this.get(t);
                if (0 === r) i -= 8;
                else for (; r < 128;)
                r <<= 1, --i;
                return "(" + i + " bit)"
            }
            for (var s = 0, n = t; n < e; ++n)
            s = s << 8 | this.get(n);
            return s
        },
        r.prototype.parseBitString = function(t, e) {
            var i = this.get(t),
                r = (e - t - 1 << 3) - i,
                s = "(" + r + " bit)";
            if (r <= 20) {
                var n = i;
                s += " ";
                for (var o = e - 1; o > t; --o) {
                    for (var h = this.get(o), a = n; a < 8; ++a)
                    s += h >> a & 1 ? "1" : "0";
                    n = 0
                }
            }
            return s
        },
        r.prototype.parseOctetString = function(t, e) {
            var i = e - t,
                r = "(" + i + " byte) ";
            i > 100 && (e = t + 100);
            for (var s = t; s < e; ++s)
            r += this.hexByte(this.get(s));
            return i > 100 && (r += "…"),
            r
        },
        r.prototype.parseOID = function(t, e) {
            for (var i = "", r = 0, s = 0, n = t; n < e; ++n) {
                var o = this.get(n);
                if (r = r << 7 | 127 & o,
                s += 7, !(128 & o)) {
                    if ("" === i) {
                        var h = r < 80 ? r < 40 ? 0 : 1 : 2;
                        i = h + "." + (r - 40 * h)
                    } else i += "." + (s >= 31 ? "bigint" : r);
                    r = s = 0
                }
            }
            return i
        },
        s.prototype.typeName = function() {
            if (void 0 === this.tag) return "unknown";
            var t = this.tag >> 6,
                e = (this.tag,
                31 & this.tag);
            switch (t) {
                case 0:
                    switch (e) {
                        case 0:
                            return "EOC";
                        case 1:
                            return "BOOLEAN";
                        case 2:
                            return "INTEGER";
                        case 3:
                            return "BIT_STRING";
                        case 4:
                            return "OCTET_STRING";
                        case 5:
                            return "NULL";
                        case 6:
                            return "OBJECT_IDENTIFIER";
                        case 7:
                            return "ObjectDescriptor";
                        case 8:
                            return "EXTERNAL";
                        case 9:
                            return "REAL";
                        case 10:
                            return "ENUMERATED";
                        case 11:
                            return "EMBEDDED_PDV";
                        case 12:
                            return "UTF8String";
                        case 16:
                            return "SEQUENCE";
                        case 17:
                            return "SET";
                        case 18:
                            return "NumericString";
                        case 19:
                            return "PrintableString";
                        case 20:
                            return "TeletexString";
                        case 21:
                            return "VideotexString";
                        case 22:
                            return "IA5String";
                        case 23:
                            return "UTCTime";
                        case 24:
                            return "GeneralizedTime";
                        case 25:
                            return "GraphicString";
                        case 26:
                            return "VisibleString";
                        case 27:
                            return "GeneralString";
                        case 28:
                            return "UniversalString";
                        case 30:
                            return "BMPString";
                        default:
                            return "Universal_" + e.toString(16)
                    }
                case 1:
                    return "Application_" + e.toString(16);
                case 2:
                    return "[" + e + "]";
                case 3:
                    return "Private_" + e.toString(16)
            }
        },
        s.prototype.reSeemsASCII = /^[ -~]+$/,
        s.prototype.content = function() {
            if (void 0 === this.tag) return null;
            var t = this.tag >> 6,
                e = 31 & this.tag,
                i = this.posContent(),
                r = Math.abs(this.length);
            if (0 !== t) {
                if (null !== this.sub) return "(" + this.sub.length + " elem)";
                var s = this.stream.parseStringISO(i, i + Math.min(r, 100));
                return this.reSeemsASCII.test(s) ? s.substring(0, 200) + (s.length > 200 ? "…" : "") : this.stream.parseOctetString(i, i + r)
            }
            switch (e) {
                case 1:
                    return 0 === this.stream.get(i) ? "false" : "true";
                case 2:
                    return this.stream.parseInteger(i, i + r);
                case 3:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(i, i + r);
                case 4:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(i, i + r);
                case 6:
                    return this.stream.parseOID(i, i + r);
                case 16:
                case 17:
                    return "(" + this.sub.length + " elem)";
                case 12:
                    return this.stream.parseStringUTF(i, i + r);
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 26:
                    return this.stream.parseStringISO(i, i + r);
                case 30:
                    return this.stream.parseStringBMP(i, i + r);
                case 23:
                case 24:
                    return this.stream.parseTime(i, i + r)
            }
            return null
        },
        s.prototype.toString = function() {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
        },
        s.prototype.print = function(t) {
            if (void 0 === t && (t = ""),
            document.writeln(t + this),
            null !== this.sub) {
                t += "  ";
                for (var e = 0, i = this.sub.length; e < i; ++e)
                this.sub[e].print(t)
            }
        },
        s.prototype.toPrettyString = function(t) {
            void 0 === t && (t = "");
            var e = t + this.typeName() + " @" + this.stream.pos;
            if (this.length >= 0 && (e += "+"),
            e += this.length,
            32 & this.tag ? e += " (constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (e += " (encapsulates)"),
            e += "\n",
            null !== this.sub) {
                t += "  ";
                for (var i = 0, r = this.sub.length; i < r; ++i)
                e += this.sub[i].toPrettyString(t)
            }
            return e
        },
        s.prototype.toDOM = function() {
            var t = e("div", "node");
            t.asn1 = this;
            var r = e("div", "head"),
                s = this.typeName().replace(/_/g, " ");
            r.innerHTML = s;
            var n = this.content();
            if (null !== n) {
                n = String(n).replace(/</g, "&lt;");
                var o = e("span", "preview");
                o.appendChild(i(n)),
                r.appendChild(o)
            }
            t.appendChild(r),
            this.node = t,
            this.head = r;
            var h = e("div", "value");
            if (s = "Offset: " + this.stream.pos + "<br/>",
            s += "Length: " + this.header + "+",
            this.length >= 0 ? s += this.length : s += -this.length + " (undefined)",
            32 & this.tag ? s += "<br/>(constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (s += "<br/>(encapsulates)"),
            null !== n && (s += "<br/>Value:<br/><b>" + n + "</b>",
                "object" == typeof oids && 6 == this.tag)) {
                var a = oids[n];
                a && (a.d && (s += "<br/>" + a.d),
                a.c && (s += "<br/>" + a.c),
                a.w && (s += "<br/>(warning!)"))
            }
            h.innerHTML = s,
            t.appendChild(h);
            var u = e("div", "sub");
            if (null !== this.sub) for (var c = 0, f = this.sub.length; c < f; ++c)
            u.appendChild(this.sub[c].toDOM());
            return t.appendChild(u),
            r.onclick = function() {
                t.className = "node collapsed" == t.className ? "node" : "node collapsed"
            },
            t
        },
        s.prototype.posStart = function() {
            return this.stream.pos
        },
        s.prototype.posContent = function() {
            return this.stream.pos + this.header
        },
        s.prototype.posEnd = function() {
            return this.stream.pos + this.header + Math.abs(this.length)
        },
        s.prototype.fakeHover = function(t) {
            this.node.className += " hover",
            t && (this.head.className += " hover")
        },
        s.prototype.fakeOut = function(t) {
            var e = / ?hover/;
            this.node.className = this.node.className.replace(e, ""),
            t && (this.head.className = this.head.className.replace(e, ""))
        },
        s.prototype.toHexDOM_sub = function(t, r, s, n, o) {
            if (!(n >= o)) {
                var h = e("span", r);
                h.appendChild(i(s.hexDump(n, o))),
                t.appendChild(h)
            }
        },
        s.prototype.toHexDOM = function(t) {
            var r = e("span", "hex");
            if (void 0 === t && (t = r),
            this.head.hexNode = r,
            this.head.onmouseover = function() {
                this.hexNode.className = "hexCurrent"
            },
            this.head.onmouseout = function() {
                this.hexNode.className = "hex"
            },
            r.asn1 = this,
            r.onmouseover = function() {
                var e = !t.selected;
                e && (t.selected = this.asn1,
                this.className = "hexCurrent"),
                this.asn1.fakeHover(e)
            },
            r.onmouseout = function() {
                var e = t.selected == this.asn1;
                this.asn1.fakeOut(e),
                e && (t.selected = null,
                this.className = "hex")
            },
            this.toHexDOM_sub(r, "tag", this.stream, this.posStart(), this.posStart() + 1),
            this.toHexDOM_sub(r, this.length >= 0 ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent()),
            null === this.sub) r.appendChild(i(this.stream.hexDump(this.posContent(), this.posEnd())));
            else if (this.sub.length > 0) {
                var s = this.sub[0],
                    n = this.sub[this.sub.length - 1];
                this.toHexDOM_sub(r, "intro", this.stream, this.posContent(), s.posStart());
                for (var o = 0, h = this.sub.length; o < h; ++o)
                r.appendChild(this.sub[o].toHexDOM(t));
                this.toHexDOM_sub(r, "outro", this.stream, n.posEnd(), this.posEnd())
            }
            return r
        },
        s.prototype.toHexString = function(t) {
            return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
        },
        s.decodeLength = function(t) {
            var e = t.get(),
                i = 127 & e;
            if (i == e) return i;
            if (i > 3) throw "Length over 24 bits not supported at position " + (t.pos - 1);
            if (0 === i) return -1;
            e = 0;
            for (var r = 0; r < i; ++r)
            e = e << 8 | t.get();
            return e
        },
        s.hasContent = function(t, e, i) {
            if (32 & t) return !0;
            if (t < 3 || t > 4) return !1;
            var n = new r(i);
            if (3 == t && n.get(),
            n.get() >> 6 & 1) return !1;
            try {
                var o = s.decodeLength(n);
                return n.pos - i.pos + o == e
            } catch (t) {
                return !1
            }
        },
        s.decode = function(t) {
            t instanceof r || (t = new r(t, 0));
            var e = new r(t),
                i = t.get(),
                n = s.decodeLength(t),
                o = t.pos - e.pos,
                h = null;
            if (s.hasContent(i, n, t)) {
                var a = t.pos;
                if (3 == i && t.get(),
                h = [],
                n >= 0) {
                    for (var u = a + n; t.pos < u;)
                    h[h.length] = s.decode(t);
                    if (t.pos != u) throw "Content size is not correct for container starting at offset " + a
                } else try {
                    for (;;) {
                        var c = s.decode(t);
                        if (0 === c.tag) break;
                        h[h.length] = c
                    }
                    n = a - t.pos
                } catch (t) {
                    throw "Exception while decoding undefined length content: " + t
                }
            } else t.pos += n;
            return new s(e, o, n, i, h)
        },
        s.test = function() {
            for (var t = [{
                value: [39],
                expected: 39
            }, {
                value: [129, 201],
                expected: 201
            }, {
                value: [131, 254, 220, 186],
                expected: 16702650
            }], e = 0, i = t.length; e < i; ++e) {
                var n = new r(t[e].value, 0),
                    o = s.decodeLength(n);
                o != t[e].expected && document.write("In test[" + e + "] expected " + t[e].expected + " got " + o + "\n")
            }
        },
        window.ASN1 = s
    }(),
    ASN1.prototype.getHexStringValue = function() {
        var t = this.toHexString(),
            e = 2 * this.header,
            i = 2 * this.length;
        return t.substr(e, i)
    },
    M.prototype.parseKey = function(t) {
        try {
            var e = 0,
                i = 0,
                r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? Hex.decode(t) : Base64.unarmor(t),
                s = ASN1.decode(r);
            if (3 === s.sub.length && (s = s.sub[2].sub[0]),
            9 === s.sub.length) {
                e = s.sub[1].getHexStringValue(),
                this.n = P(e, 16),
                i = s.sub[2].getHexStringValue(),
                this.e = parseInt(i, 16);
                var n = s.sub[3].getHexStringValue();
                this.d = P(n, 16);
                var o = s.sub[4].getHexStringValue();
                this.p = P(o, 16);
                var h = s.sub[5].getHexStringValue();
                this.q = P(h, 16);
                var a = s.sub[6].getHexStringValue();
                this.dmp1 = P(a, 16);
                var u = s.sub[7].getHexStringValue();
                this.dmq1 = P(u, 16);
                var c = s.sub[8].getHexStringValue();
                this.coeff = P(c, 16)
            } else {
                if (2 !== s.sub.length) return !1;
                var f = s.sub[1].sub[0];
                e = f.sub[0].getHexStringValue(),
                this.n = P(e, 16),
                i = f.sub[1].getHexStringValue(),
                this.e = parseInt(i, 16)
            }
            return !0
        } catch (t) {
            return !1
        }
    },
    M.prototype.getPrivateBaseKey = function() {
        var t = {
            array: [new KJUR.asn1.DERInteger({
                int: 0
            }), new KJUR.asn1.DERInteger({
                bigint: this.n
            }), new KJUR.asn1.DERInteger({
                int: this.e
            }), new KJUR.asn1.DERInteger({
                bigint: this.d
            }), new KJUR.asn1.DERInteger({
                bigint: this.p
            }), new KJUR.asn1.DERInteger({
                bigint: this.q
            }), new KJUR.asn1.DERInteger({
                bigint: this.dmp1
            }), new KJUR.asn1.DERInteger({
                bigint: this.dmq1
            }), new KJUR.asn1.DERInteger({
                bigint: this.coeff
            })]
        };
        return new KJUR.asn1.DERSequence(t).getEncodedHex()
    },
    M.prototype.getPrivateBaseKeyB64 = function() {
        return C(this.getPrivateBaseKey())
    },
    M.prototype.getPublicBaseKey = function() {
        var t = {
            array: [new KJUR.asn1.DERObjectIdentifier({
                oid: "1.2.840.113549.1.1.1"
            }), new KJUR.asn1.DERNull]
        }, e = new KJUR.asn1.DERSequence(t);
        return t = {
            array: [new KJUR.asn1.DERInteger({
                bigint: this.n
            }), new KJUR.asn1.DERInteger({
                int: this.e
            })]
        },
        t = {
            hex: "00" + new KJUR.asn1.DERSequence(t).getEncodedHex()
        },
        t = {
            array: [e, new KJUR.asn1.DERBitString(t)]
        },
        new KJUR.asn1.DERSequence(t).getEncodedHex()
    },
    M.prototype.getPublicBaseKeyB64 = function() {
        return C(this.getPublicBaseKey())
    },
    M.prototype.wordwrap = function(t, e) {
        if (!t) return t;
        var i = "(.{1," + (e = e || 64) + "})( +|$\n?)|(.{1," + e + "})";
        return t.match(RegExp(i, "g")).join("\n")
    },
    M.prototype.getPrivateKey = function() {
        var t = "-----BEGIN RSA PRIVATE KEY-----\n";
        return t += this.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
        t += "-----END RSA PRIVATE KEY-----"
    },
    M.prototype.getPublicKey = function() {
        var t = "-----BEGIN PUBLIC KEY-----\n";
        return t += this.wordwrap(this.getPublicBaseKeyB64()) + "\n",
        t += "-----END PUBLIC KEY-----"
    },
    M.prototype.hasPublicKeyProperty = function(t) {
        return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
    },
    M.prototype.hasPrivateKeyProperty = function(t) {
        return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
    },
    M.prototype.parsePropertiesFrom = function(t) {
        this.n = t.n,
        this.e = t.e,
        t.hasOwnProperty("d") && (this.d = t.d,
        this.p = t.p,
        this.q = t.q,
        this.dmp1 = t.dmp1,
        this.dmq1 = t.dmq1,
        this.coeff = t.coeff)
    };
    var z = function(t) {
        M.call(this),
        t && ("string" == typeof t ? this.parseKey(t) : (this.hasPrivateKeyProperty(t) || this.hasPublicKeyProperty(t)) && this.parsePropertiesFrom(t))
    };
    (z.prototype = new M).constructor = z;
    var Z = function(t) {
        t = t || {},
        this.default_key_size = parseInt(t.default_key_size) || 1024,
        this.default_public_exponent = t.default_public_exponent || "010001",
        this.log = t.log || !1,
        this.key = null
    };
    Z.prototype.setKey = function(t) {
        this.log && this.key && console.warn("A key was already set, overriding existing."),
        this.key = new z(t)
    },
    Z.prototype.setPrivateKey = function(t) {
        this.setKey(t)
    },
    Z.prototype.setPublicKey = function(t) {
        this.setKey(t)
    },
    Z.prototype.decrypt = function(t) {
        try {
            return this.getKey().decrypt(H(t))
        } catch (t) {
            return !1
        }
    },
    Z.prototype.encrypt = function(t) {
        try {
            return this.getKey().encrypt(t)
        } catch (t) {
            return !1
        }
    },
    Z.prototype.getKey = function(t) {
        if (!this.key) {
            if (this.key = new z,
            t && "[object Function]" === {}.toString.call(t)) return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
            this.key.generate(this.default_key_size, this.default_public_exponent)
        }
        return this.key
    },
    Z.prototype.getPrivateKey = function() {
        return this.getKey().getPrivateKey()
    },
    Z.prototype.getPrivateKeyB64 = function() {
        return this.getKey().getPrivateBaseKeyB64()
    },
    Z.prototype.getPublicKey = function() {
        return this.getKey().getPublicKey()
    },
    Z.prototype.getPublicKeyB64 = function() {
        return this.getKey().getPublicBaseKeyB64()
    },
    JSEncrypt = Z
}(JSEncrypt);
//var s = r.JSEncrypt;
//t.exports = s

function getpwd(pwd) {

    var t = new JSEncrypt;
    return t.setPublicKey("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqE2M4+LDkmRX50waOx+aTBgUUUH8l7S1pFzdEKEtKULnYtKlA9eCxU4W8nmdVAxHEpatwr1Z5p7ZiDoWxINyatV24pVgiDKYIPlr7ubBJlbFX2RLPCfV+SCm7jrgx9hqnUr6zMxaYvbFOre+G+/loC+Q1Wl2RpMYaqOl9gL5UanTPS2rX+qdQdxzRZe2ytL3hMi87f4FPYwptZpbGorc/bYBrsRrt8KsMnGCCNcLODyiSdbrmOOyBWPwKhHvI/sOUXwib5D7NtYmsjqLjDaHxapnPsl6EiEzoFQvCRWDLyDBkuRE2Th3ni5/UCx+WgOhbLvwNSojqRu324CZlfkWewIDAQAB"),
    t.encrypt(pwd)

}