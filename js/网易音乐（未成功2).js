window=this;
var CryptoJS = function(u, p) {
    var d = {}
      , l = d.lib = {}
      , s = function() {}
      , t = l.Base = {
        extend: function(a) {
            s.prototype = this;
            var c = new s;
            a && c.mixIn(a);
            c.hasOwnProperty("init") || (c.init = function() {
                c.$super.init.apply(this, arguments)
            }
            );
            c.init.prototype = c;
            c.$super = this;
            return c
        },
        create: function() {
            var a = this.extend();
            a.init.apply(a, arguments);
            return a
        },
        init: function() {},
        mixIn: function(a) {
            for (var c in a)
                a.hasOwnProperty(c) && (this[c] = a[c]);
            a.hasOwnProperty("toString") && (this.toString = a.toString)
        },
        clone: function() {
            return this.init.prototype.extend(this)
        }
    }
      , r = l.WordArray = t.extend({
        init: function(a, c) {
            a = this.words = a || [];
            this.sigBytes = c != p ? c : 4 * a.length
        },
        toString: function(a) {
            return (a || v).stringify(this)
        },
        concat: function(a) {
            var c = this.words
              , e = a.words
              , j = this.sigBytes;
            a = a.sigBytes;
            this.clamp();
            if (j % 4)
                for (var k = 0; k < a; k++)
                    c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - 8 * (k % 4) & 255) << 24 - 8 * ((j + k) % 4);
            else if (65535 < e.length)
                for (k = 0; k < a; k += 4)
                    c[j + k >>> 2] = e[k >>> 2];
            else
                c.push.apply(c, e);
            this.sigBytes += a;
            return this
        },
        clamp: function() {
            var a = this.words
              , c = this.sigBytes;
            a[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4);
            a.length = u.ceil(c / 4)
        },
        clone: function() {
            var a = t.clone.call(this);
            a.words = this.words.slice(0);
            return a
        },
        random: function(a) {
            for (var c = [], e = 0; e < a; e += 4)
                c.push(4294967296 * u.random() | 0);
            return new r.init(c,a)
        }
    })
      , w = d.enc = {}
      , v = w.Hex = {
        stringify: function(a) {
            var c = a.words;
            a = a.sigBytes;
            for (var e = [], j = 0; j < a; j++) {
                var k = c[j >>> 2] >>> 24 - 8 * (j % 4) & 255;
                e.push((k >>> 4).toString(16));
                e.push((k & 15).toString(16))
            }
            return e.join("")
        },
        parse: function(a) {
            for (var c = a.length, e = [], j = 0; j < c; j += 2)
                e[j >>> 3] |= parseInt(a.substr(j, 2), 16) << 24 - 4 * (j % 8);
            return new r.init(e,c / 2)
        }
    }
      , b = w.Latin1 = {
        stringify: function(a) {
            var c = a.words;
            a = a.sigBytes;
            for (var e = [], j = 0; j < a; j++)
                e.push(String.fromCharCode(c[j >>> 2] >>> 24 - 8 * (j % 4) & 255));
            return e.join("")
        },
        parse: function(a) {
            for (var c = a.length, e = [], j = 0; j < c; j++)
                e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4);
            return new r.init(e,c)
        }
    }
      , x = w.Utf8 = {
        stringify: function(a) {
            try {
                return decodeURIComponent(escape(b.stringify(a)))
            } catch (c) {
                throw Error("Malformed UTF-8 data")
            }
        },
        parse: function(a) {
            return b.parse(unescape(encodeURIComponent(a)))
        }
    }
      , q = l.BufferedBlockAlgorithm = t.extend({
        reset: function() {
            this.i7b = new r.init;
            this.tF4J = 0
        },
        tY4c: function(a) {
            "string" == typeof a && (a = x.parse(a));
            this.i7b.concat(a);
            this.tF4J += a.sigBytes
        },
        kW1x: function(a) {
            var c = this.i7b
              , e = c.words
              , j = c.sigBytes
              , k = this.blockSize
              , b = j / (4 * k)
              , b = a ? u.ceil(b) : u.max((b | 0) - this.Gh7a, 0);
            a = b * k;
            j = u.min(4 * a, j);
            if (a) {
                for (var q = 0; q < a; q += k)
                    this.qy3x(e, q);
                q = e.splice(0, a);
                c.sigBytes -= j
            }
            return new r.init(q,j)
        },
        clone: function() {
            var a = t.clone.call(this);
            a.i7b = this.i7b.clone();
            return a
        },
        Gh7a: 0
    });
    l.Hasher = q.extend({
        cfg: t.extend(),
        init: function(a) {
            this.cfg = this.cfg.extend(a);
            this.reset()
        },
        reset: function() {
            q.reset.call(this);
            this.le1x()
        },
        update: function(a) {
            this.tY4c(a);
            this.kW1x();
            return this
        },
        finalize: function(a) {
            a && this.tY4c(a);
            return this.mV2x()
        },
        blockSize: 16,
        lQ1x: function(a) {
            return function(b, e) {
                return (new a.init(e)).finalize(b)
            }
        },
        tX4b: function(a) {
            return function(b, e) {
                return (new n.HMAC.init(a,e)).finalize(b)
            }
        }
    });
    var n = d.algo = {};
    return d
}(Math);
//
function RSAKeyPair(a, b, c) {
    this.e = biFromHex(a),
    this.d = biFromHex(b),
    this.m = biFromHex(c),
    this.chunkSize = 2 * biHighIndex(this.m),
    this.radix = 16,
    this.barrett = new BarrettMu(this.m)
}

function twoDigit(a) {
    return (10 > a ? "0" : "") + String(a)
}

function encryptedString(a, b) {
    for (var f, g, h, i, j, k, l, c = new Array, d = b.length, e = 0; d > e;)
    c[e] = b.charCodeAt(e),
    e++;
    for (; 0 != c.length % a.chunkSize;)
    c[e++] = 0;
    for (f = c.length,
    g = "",
    e = 0; f > e; e += a.chunkSize) {
        for (j = new BigInt,
        h = 0,
        i = e; i < e + a.chunkSize; ++h)
        j.digits[h] = c[i++],
        j.digits[h] += c[i++] << 8;
        k = a.barrett.powMod(j, a.e),
        l = 16 == a.radix ? biToHex(k) : biToString(k, a.radix),
        g += l + " "
    }
    return g.substring(0, g.length - 1)
}

function decryptedString(a, b) {
    var e, f, g, h, c = b.split(" "),
        d = "";
    for (e = 0; e < c.length; ++e)
    for (h = 16 == a.radix ? biFromHex(c[e]) : biFromString(c[e], a.radix),
    g = a.barrett.powMod(h, a.d),
    f = 0; f <= biHighIndex(g); ++f)
    d += String.fromCharCode(255 & g.digits[f], g.digits[f] >> 8);
    return 0 == d.charCodeAt(d.length - 1) && (d = d.substring(0, d.length - 1)),
    d
}

function setMaxDigits(a) {
    maxDigits = a,
    ZERO_ARRAY = new Array(maxDigits);
    for (var b = 0; b < ZERO_ARRAY.length; b++)
    ZERO_ARRAY[b] = 0;
    bigZero = new BigInt,
    bigOne = new BigInt,
    bigOne.digits[0] = 1
}

function BigInt(a) {
    this.digits = "boolean" == typeof a && 1 == a ? null : ZERO_ARRAY.slice(0),
    this.isNeg = !1
}

function biFromDecimal(a) {
    for (var d, e, f, b = "-" == a.charAt(0), c = b ? 1 : 0; c < a.length && "0" == a.charAt(c);)++c;
    if (c == a.length) d = new BigInt;
    else {
        for (e = a.length - c,
        f = e % dpl10,
        0 == f && (f = dpl10),
        d = biFromNumber(Number(a.substr(c, f))),
        c += f; c < a.length;)
        d = biAdd(biMultiply(d, lr10), biFromNumber(Number(a.substr(c, dpl10)))),
        c += dpl10;
        d.isNeg = b
    }
    return d
}

function biCopy(a) {
    var b = new BigInt(!0);
    return b.digits = a.digits.slice(0),
    b.isNeg = a.isNeg,
    b
}

function biFromNumber(a) {
    var c, b = new BigInt;
    for (b.isNeg = 0 > a,
    a = Math.abs(a),
    c = 0; a > 0;)
    b.digits[c++] = a & maxDigitVal,
    a >>= biRadixBits;
    return b
}

function reverseStr(a) {
    var c, b = "";
    for (c = a.length - 1; c > -1; --c)
    b += a.charAt(c);
    return b
}

function biToString(a, b) {
    var d, e, c = new BigInt;
    for (c.digits[0] = b,
    d = biDivideModulo(a, c),
    e = hexatrigesimalToChar[d[1].digits[0]]; 1 == biCompare(d[0], bigZero);)
    d = biDivideModulo(d[0], c),
    digit = d[1].digits[0],
    e += hexatrigesimalToChar[d[1].digits[0]];
    return (a.isNeg ? "-" : "") + reverseStr(e)
}

function biToDecimal(a) {
    var c, d, b = new BigInt;
    for (b.digits[0] = 10,
    c = biDivideModulo(a, b),
    d = String(c[1].digits[0]); 1 == biCompare(c[0], bigZero);)
    c = biDivideModulo(c[0], b),
    d += String(c[1].digits[0]);
    return (a.isNeg ? "-" : "") + reverseStr(d)
}

function digitToHex(a) {
    var b = 15,
        c = "";
    for (i = 0; 4 > i; ++i)
    c += hexToChar[a & b],
    a >>>= 4;
    return reverseStr(c)
}

function biToHex(a) {
    var d, b = "";
    for (biHighIndex(a),
    d = biHighIndex(a); d > -1; --d)
    b += digitToHex(a.digits[d]);
    return b
}

function charToHex(a) {
    var h, b = 48,
        c = b + 9,
        d = 97,
        e = d + 25,
        f = 65,
        g = 90;
    return h = a >= b && c >= a ? a - b : a >= f && g >= a ? 10 + a - f : a >= d && e >= a ? 10 + a - d : 0
}

function hexToDigit(a) {
    var d, b = 0,
        c = Math.min(a.length, 4);
    for (d = 0; c > d; ++d)
    b <<= 4,
    b |= charToHex(a.charCodeAt(d));
    return b
}

function biFromHex(a) {
    var d, e, b = new BigInt,
        c = a.length;
    for (d = c,
    e = 0; d > 0; d -= 4, ++e)
    b.digits[e] = hexToDigit(a.substr(Math.max(d - 4, 0), Math.min(d, 4)));
    return b
}

function biFromString(a, b) {
    var g, h, i, j, c = "-" == a.charAt(0),
        d = c ? 1 : 0,
        e = new BigInt,
        f = new BigInt;
    for (f.digits[0] = 1,
    g = a.length - 1; g >= d; g--)
    h = a.charCodeAt(g),
    i = charToHex(h),
    j = biMultiplyDigit(f, i),
    e = biAdd(e, j),
    f = biMultiplyDigit(f, b);
    return e.isNeg = c,
    e
}

function biDump(a) {
    return (a.isNeg ? "-" : "") + a.digits.join(" ")
}

function biAdd(a, b) {
    var c, d, e, f;
    if (a.isNeg != b.isNeg) b.isNeg = !b.isNeg,
    c = biSubtract(a, b),
    b.isNeg = !b.isNeg;
    else {
        for (c = new BigInt,
        d = 0,
        f = 0; f < a.digits.length; ++f)
        e = a.digits[f] + b.digits[f] + d,
        c.digits[f] = 65535 & e,
        d = Number(e >= biRadix);
        c.isNeg = a.isNeg
    }
    return c
}

function biSubtract(a, b) {
    var c, d, e, f;
    if (a.isNeg != b.isNeg) b.isNeg = !b.isNeg,
    c = biAdd(a, b),
    b.isNeg = !b.isNeg;
    else {
        for (c = new BigInt,
        e = 0,
        f = 0; f < a.digits.length; ++f)
        d = a.digits[f] - b.digits[f] + e,
        c.digits[f] = 65535 & d,
        c.digits[f] < 0 && (c.digits[f] += biRadix),
        e = 0 - Number(0 > d);
        if (-1 == e) {
            for (e = 0,
            f = 0; f < a.digits.length; ++f)
            d = 0 - c.digits[f] + e,
            c.digits[f] = 65535 & d,
            c.digits[f] < 0 && (c.digits[f] += biRadix),
            e = 0 - Number(0 > d);
            c.isNeg = !a.isNeg
        } else c.isNeg = a.isNeg
    }
    return c
}

function biHighIndex(a) {
    for (var b = a.digits.length - 1; b > 0 && 0 == a.digits[b];)--b;
    return b
}

function biNumBits(a) {
    var e, b = biHighIndex(a),
        c = a.digits[b],
        d = (b + 1) * bitsPerDigit;
    for (e = d; e > d - bitsPerDigit && 0 == (32768 & c); --e)
    c <<= 1;
    return e
}

function biMultiply(a, b) {
    var d, h, i, k, c = new BigInt,
        e = biHighIndex(a),
        f = biHighIndex(b);
    for (k = 0; f >= k; ++k) {
        for (d = 0,
        i = k,
        j = 0; e >= j; ++j, ++i)
        h = c.digits[i] + a.digits[j] * b.digits[k] + d,
        c.digits[i] = h & maxDigitVal,
        d = h >>> biRadixBits;
        c.digits[k + e + 1] = d
    }
    return c.isNeg = a.isNeg != b.isNeg,
    c
}

function biMultiplyDigit(a, b) {
    var c, d, e, f;
    for (result = new BigInt,
    c = biHighIndex(a),
    d = 0,
    f = 0; c >= f; ++f)
    e = result.digits[f] + a.digits[f] * b + d,
    result.digits[f] = e & maxDigitVal,
    d = e >>> biRadixBits;
    return result.digits[1 + c] = d,
    result
}

function arrayCopy(a, b, c, d, e) {
    var g, h, f = Math.min(b + e, a.length);
    for (g = b,
    h = d; f > g; ++g, ++h)
    c[h] = a[g]
}

function biShiftLeft(a, b) {
    var e, f, g, h, c = Math.floor(b / bitsPerDigit),
        d = new BigInt;
    for (arrayCopy(a.digits, 0, d.digits, c, d.digits.length - c),
    e = b % bitsPerDigit,
    f = bitsPerDigit - e,
    g = d.digits.length - 1,
    h = g - 1; g > 0; --g, --h)
    d.digits[g] = d.digits[g] << e & maxDigitVal | (d.digits[h] & highBitMasks[e]) >>> f;
    return d.digits[0] = d.digits[g] << e & maxDigitVal,
    d.isNeg = a.isNeg,
    d
}

function biShiftRight(a, b) {
    var e, f, g, h, c = Math.floor(b / bitsPerDigit),
        d = new BigInt;
    for (arrayCopy(a.digits, c, d.digits, 0, a.digits.length - c),
    e = b % bitsPerDigit,
    f = bitsPerDigit - e,
    g = 0,
    h = g + 1; g < d.digits.length - 1; ++g, ++h)
    d.digits[g] = d.digits[g] >>> e | (d.digits[h] & lowBitMasks[e]) << f;
    return d.digits[d.digits.length - 1] >>>= e,
    d.isNeg = a.isNeg,
    d
}

function biMultiplyByRadixPower(a, b) {
    var c = new BigInt;
    return arrayCopy(a.digits, 0, c.digits, b, c.digits.length - b),
    c
}

function biDivideByRadixPower(a, b) {
    var c = new BigInt;
    return arrayCopy(a.digits, b, c.digits, 0, c.digits.length - b),
    c
}

function biModuloByRadixPower(a, b) {
    var c = new BigInt;
    return arrayCopy(a.digits, 0, c.digits, 0, b),
    c
}

function biCompare(a, b) {
    if (a.isNeg != b.isNeg) return 1 - 2 * Number(a.isNeg);
    for (var c = a.digits.length - 1; c >= 0; --c)
    if (a.digits[c] != b.digits[c]) return a.isNeg ? 1 - 2 * Number(a.digits[c] > b.digits[c]) : 1 - 2 * Number(a.digits[c] < b.digits[c]);
    return 0
}

function biDivideModulo(a, b) {
    var f, g, h, i, j, k, l, m, n, o, p, q, r, s, c = biNumBits(a),
        d = biNumBits(b),
        e = b.isNeg;
    if (d > c) return a.isNeg ? (f = biCopy(bigOne),
    f.isNeg = !b.isNeg,
    a.isNeg = !1,
    b.isNeg = !1,
    g = biSubtract(b, a),
    a.isNeg = !0,
    b.isNeg = e) : (f = new BigInt,
    g = biCopy(a)),
    new Array(f, g);
    for (f = new BigInt,
    g = a,
    h = Math.ceil(d / bitsPerDigit) - 1,
    i = 0; b.digits[h] < biHalfRadix;)
    b = biShiftLeft(b, 1), ++i, ++d,
    h = Math.ceil(d / bitsPerDigit) - 1;
    for (g = biShiftLeft(g, i),
    c += i,
    j = Math.ceil(c / bitsPerDigit) - 1,
    k = biMultiplyByRadixPower(b, j - h); - 1 != biCompare(g, k);)++f.digits[j - h],
    g = biSubtract(g, k);
    for (l = j; l > h; --l) {
        for (m = l >= g.digits.length ? 0 : g.digits[l],
        n = l - 1 >= g.digits.length ? 0 : g.digits[l - 1],
        o = l - 2 >= g.digits.length ? 0 : g.digits[l - 2],
        p = h >= b.digits.length ? 0 : b.digits[h],
        q = h - 1 >= b.digits.length ? 0 : b.digits[h - 1],
        f.digits[l - h - 1] = m == p ? maxDigitVal : Math.floor((m * biRadix + n) / p),
        r = f.digits[l - h - 1] * (p * biRadix + q),
        s = m * biRadixSquared + (n * biRadix + o); r > s;)--f.digits[l - h - 1],
        r = f.digits[l - h - 1] * (p * biRadix | q),
        s = m * biRadix * biRadix + (n * biRadix + o);
        k = biMultiplyByRadixPower(b, l - h - 1),
        g = biSubtract(g, biMultiplyDigit(k, f.digits[l - h - 1])),
        g.isNeg && (g = biAdd(g, k), --f.digits[l - h - 1])
    }
    return g = biShiftRight(g, i),
    f.isNeg = a.isNeg != e,
    a.isNeg && (f = e ? biAdd(f, bigOne) : biSubtract(f, bigOne),
    b = biShiftRight(b, i),
    g = biSubtract(b, g)),
    0 == g.digits[0] && 0 == biHighIndex(g) && (g.isNeg = !1),
    new Array(f, g)
}

function biDivide(a, b) {
    return biDivideModulo(a, b)[0]
}

function biModulo(a, b) {
    return biDivideModulo(a, b)[1]
}

function biMultiplyMod(a, b, c) {
    return biModulo(biMultiply(a, b), c)
}

function biPow(a, b) {
    for (var c = bigOne, d = a;;) {
        if (0 != (1 & b) && (c = biMultiply(c, d)),
        b >>= 1,
        0 == b) break;
        d = biMultiply(d, d)
    }
    return c
}

function biPowMod(a, b, c) {
    for (var d = bigOne, e = a, f = b;;) {
        if (0 != (1 & f.digits[0]) && (d = biMultiplyMod(d, e, c)),
        f = biShiftRight(f, 1),
        0 == f.digits[0] && 0 == biHighIndex(f)) break;
        e = biMultiplyMod(e, e, c)
    }
    return d
}

function BarrettMu(a) {
    this.modulus = biCopy(a),
    this.k = biHighIndex(this.modulus) + 1;
    var b = new BigInt;
    b.digits[2 * this.k] = 1,
    this.mu = biDivide(b, this.modulus),
    this.bkplus1 = new BigInt,
    this.bkplus1.digits[this.k + 1] = 1,
    this.modulo = BarrettMu_modulo,
    this.multiplyMod = BarrettMu_multiplyMod,
    this.powMod = BarrettMu_powMod
}

function BarrettMu_modulo(a) {
    var i, b = biDivideByRadixPower(a, this.k - 1),
        c = biMultiply(b, this.mu),
        d = biDivideByRadixPower(c, this.k + 1),
        e = biModuloByRadixPower(a, this.k + 1),
        f = biMultiply(d, this.modulus),
        g = biModuloByRadixPower(f, this.k + 1),
        h = biSubtract(e, g);
    for (h.isNeg && (h = biAdd(h, this.bkplus1)),
    i = biCompare(h, this.modulus) >= 0; i;)
    h = biSubtract(h, this.modulus),
    i = biCompare(h, this.modulus) >= 0;
    return h
}

function BarrettMu_multiplyMod(a, b) {
    var c = biMultiply(a, b);
    return this.modulo(c)
}

function BarrettMu_powMod(a, b) {
    var d, e, c = new BigInt;
    for (c.digits[0] = 1,
    d = a,
    e = b;;) {
        if (0 != (1 & e.digits[0]) && (c = this.multiplyMod(c, d)),
        e = biShiftRight(e, 1),
        0 == e.digits[0] && 0 == biHighIndex(e)) break;
        d = this.multiplyMod(d, d)
    }
    return c
}
var maxDigits, ZERO_ARRAY, bigZero, bigOne, dpl10, lr10, hexatrigesimalToChar, hexToChar, highBitMasks, lowBitMasks, biRadixBase = 2,
    biRadixBits = 16,
    bitsPerDigit = biRadixBits,
    biRadix = 65536,
    biHalfRadix = biRadix >>> 1,
    biRadixSquared = biRadix * biRadix,
    maxDigitVal = biRadix - 1,
    maxInteger = 9999999999999998;
setMaxDigits(20),
dpl10 = 15,
lr10 = biFromNumber(1e15),
hexatrigesimalToChar = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"),
hexToChar = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"),
highBitMasks = new Array(0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535),
lowBitMasks = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535);
! function() {
    function a(a) {
        var d, e, b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            c = "";
        for (d = 0; a > d; d += 1)
        e = Math.random() * b.length,
        e = Math.floor(e),
        c += b.charAt(e);
        return c
    }

    function b(a, b) {
        var c = CryptoJS.enc.Utf8.parse(b),
            d = CryptoJS.enc.Utf8.parse("0102030405060708"),
            e = CryptoJS.enc.Utf8.parse(a),
            f = CryptoJS.AES.encrypt(e, c, {
                iv: d,
                mode: CryptoJS.mode.CBC
            });
        return f.toString()
    }

    function c(a, b, c) {
        var d, e;
        return setMaxDigits(131),
        d = new RSAKeyPair(b, "", c),
        e = encryptedString(d, a)
    }

    function d(d, e, f, g) {
        var h = {}, i = a(16);
        return h.encText = b(d, g),
        h.encText = b(h.encText, i),
        h.encSecKey = c(i, e, f),
        h
    }

    function e(a, b, d, e) {
        var f = {};
        return f.encText = c(a + e, b, d),
        f
    }
    window.asrsea = d,
    window.ecnonasr = e
}();
//
(function(){for(var q=CryptoJS,x=q.lib.BlockCipher,r=q.algo,j=[],y=[],z=[],A=[],B=[],C=[],s=[],u=[],v=[],w=[],g=[],k=0;256>k;k++)g[k]=128>k?k<<1:k<<1^283;for(var n=0,l=0,k=0;256>k;k++){var f=l^l<<1^l<<2^l<<3^l<<4,f=f>>>8^f&255^99;j[n]=f;y[f]=n;var t=g[n],D=g[t],E=g[D],b=257*g[f]^16843008*f;z[n]=b<<24|b>>>8;A[n]=b<<16|b>>>16;B[n]=b<<8|b>>>24;C[n]=b;b=16843009*E^65537*D^257*t^16843008*n;s[f]=b<<24|b>>>8;u[f]=b<<16|b>>>16;v[f]=b<<8|b>>>24;w[f]=b;n?(n=t^g[g[g[E^t]]],l^=g[g[l]]):n=l=1}var F=[0,1,2,4,8,
16,32,64,128,27,54],r=r.AES=x.extend({_doReset:function(){for(var c=this._key,e=c.words,a=c.sigBytes/4,c=4*((this._nRounds=a+6)+1),b=this._keySchedule=[],h=0;h<c;h++)if(h<a)b[h]=e[h];else{var d=b[h-1];h%a?6<a&&4==h%a&&(d=j[d>>>24]<<24|j[d>>>16&255]<<16|j[d>>>8&255]<<8|j[d&255]):(d=d<<8|d>>>24,d=j[d>>>24]<<24|j[d>>>16&255]<<16|j[d>>>8&255]<<8|j[d&255],d^=F[h/a|0]<<24);b[h]=b[h-a]^d}e=this._invKeySchedule=[];for(a=0;a<c;a++)h=c-a,d=a%4?b[h]:b[h-4],e[a]=4>a||4>=h?d:s[j[d>>>24]]^u[j[d>>>16&255]]^v[j[d>>>
8&255]]^w[j[d&255]]},encryptBlock:function(c,e){this._doCryptBlock(c,e,this._keySchedule,z,A,B,C,j)},decryptBlock:function(c,e){var a=c[e+1];c[e+1]=c[e+3];c[e+3]=a;this._doCryptBlock(c,e,this._invKeySchedule,s,u,v,w,y);a=c[e+1];c[e+1]=c[e+3];c[e+3]=a},_doCryptBlock:function(c,e,a,b,h,d,j,m){for(var n=this._nRounds,f=c[e]^a[0],g=c[e+1]^a[1],k=c[e+2]^a[2],p=c[e+3]^a[3],l=4,t=1;t<n;t++)var q=b[f>>>24]^h[g>>>16&255]^d[k>>>8&255]^j[p&255]^a[l++],r=b[g>>>24]^h[k>>>16&255]^d[p>>>8&255]^j[f&255]^a[l++],s=
b[k>>>24]^h[p>>>16&255]^d[f>>>8&255]^j[g&255]^a[l++],p=b[p>>>24]^h[f>>>16&255]^d[g>>>8&255]^j[k&255]^a[l++],f=q,g=r,k=s;q=(m[f>>>24]<<24|m[g>>>16&255]<<16|m[k>>>8&255]<<8|m[p&255])^a[l++];r=(m[g>>>24]<<24|m[k>>>16&255]<<16|m[p>>>8&255]<<8|m[f&255])^a[l++];s=(m[k>>>24]<<24|m[p>>>16&255]<<16|m[f>>>8&255]<<8|m[g&255])^a[l++];p=(m[p>>>24]<<24|m[f>>>16&255]<<16|m[g>>>8&255]<<8|m[k&255])^a[l++];c[e]=q;c[e+1]=r;c[e+2]=s;c[e+3]=p},keySize:8});q.AES=x._createHelper(r)})();
//
var brx0 = "010001";
    brx0x= "00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7";
    brx = "0CoJUm6Qyw8W8jud";

function getpwd() {
    var brx0 = "010001";
    brx0x= "00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7";
    brx = "0CoJUm6Qyw8W8jud";

    var i7b = {
        phone: "17859232324",
        password: "bae5e3208a3c700e3db642b6631e95b9",
        rememberLogin: "true",
        checkToken: "9ca17ae2e6ffcda170e2e6ee97d6799a9da3ccbb4588a88aa2��ad85e838b8aa6c55a8eaa9fb0cd3b97928ed6d942b78dee9e",
        csrf_token: ""
    }

    var obj = window.asrsea(i7b, brx0, brx0x, brx)
    return obj.encText + "||" + obj.encSecKey
}