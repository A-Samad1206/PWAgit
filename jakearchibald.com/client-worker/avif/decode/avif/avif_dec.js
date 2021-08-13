var avif_dec = (function () {
  var _scriptDir =
    typeof document !== 'undefined' && document.currentScript
      ? document.currentScript.src
      : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return function (avif_dec) {
    avif_dec = avif_dec || {};

    var d;
    d || (d = typeof avif_dec !== 'undefined' ? avif_dec : {});
    var aa, ba;
    d.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var r = {},
      t;
    for (t in d) d.hasOwnProperty(t) && (r[t] = d[t]);
    var u = !1,
      v = !1,
      ca = !1,
      da = !1;
    u = 'object' === typeof window;
    v = 'function' === typeof importScripts;
    da = !u && !ca && !v;
    var w = '',
      x,
      z,
      ea,
      fa;
    if (u || v)
      v
        ? (w = self.location.href)
        : document.currentScript && (w = document.currentScript.src),
        _scriptDir && (w = _scriptDir),
        0 !== w.indexOf('blob:')
          ? (w = w.substr(0, w.lastIndexOf('/') + 1))
          : (w = ''),
        (x = function (a) {
          var b = new XMLHttpRequest();
          b.open('GET', a, !1);
          b.send(null);
          return b.responseText;
        }),
        v &&
          (z = function (a) {
            var b = new XMLHttpRequest();
            b.open('GET', a, !1);
            b.responseType = 'arraybuffer';
            b.send(null);
            return new Uint8Array(b.response);
          });
    var ha = d.print || console.log.bind(console),
      B = d.printErr || console.warn.bind(console);
    for (t in r) r.hasOwnProperty(t) && (d[t] = r[t]);
    r = null;
    var ia = 0,
      D;
    d.wasmBinary && (D = d.wasmBinary);
    var noExitRuntime;
    d.noExitRuntime && (noExitRuntime = d.noExitRuntime);
    'object' !== typeof WebAssembly && A('no native wasm support detected');
    var E,
      ja = new WebAssembly.Table({
        initial: 675,
        maximum: 675,
        element: 'anyfunc',
      }),
      ka = !1,
      la =
        'undefined' !== typeof TextDecoder ? new TextDecoder('utf8') : void 0;
    function ma(a, b, c) {
      var e = b + c;
      for (c = b; a[c] && !(c >= e); ) ++c;
      if (16 < c - b && a.subarray && la) return la.decode(a.subarray(b, c));
      for (e = ''; b < c; ) {
        var f = a[b++];
        if (f & 128) {
          var g = a[b++] & 63;
          if (192 == (f & 224)) e += String.fromCharCode(((f & 31) << 6) | g);
          else {
            var h = a[b++] & 63;
            f =
              224 == (f & 240)
                ? ((f & 15) << 12) | (g << 6) | h
                : ((f & 7) << 18) | (g << 12) | (h << 6) | (a[b++] & 63);
            65536 > f
              ? (e += String.fromCharCode(f))
              : ((f -= 65536),
                (e += String.fromCharCode(
                  55296 | (f >> 10),
                  56320 | (f & 1023),
                )));
          }
        } else e += String.fromCharCode(f);
      }
      return e;
    }
    function na(a, b, c) {
      var e = F;
      if (0 < c) {
        c = b + c - 1;
        for (var f = 0; f < a.length; ++f) {
          var g = a.charCodeAt(f);
          if (55296 <= g && 57343 >= g) {
            var h = a.charCodeAt(++f);
            g = (65536 + ((g & 1023) << 10)) | (h & 1023);
          }
          if (127 >= g) {
            if (b >= c) break;
            e[b++] = g;
          } else {
            if (2047 >= g) {
              if (b + 1 >= c) break;
              e[b++] = 192 | (g >> 6);
            } else {
              if (65535 >= g) {
                if (b + 2 >= c) break;
                e[b++] = 224 | (g >> 12);
              } else {
                if (b + 3 >= c) break;
                e[b++] = 240 | (g >> 18);
                e[b++] = 128 | ((g >> 12) & 63);
              }
              e[b++] = 128 | ((g >> 6) & 63);
            }
            e[b++] = 128 | (g & 63);
          }
        }
        e[b] = 0;
      }
    }
    var oa =
      'undefined' !== typeof TextDecoder ? new TextDecoder('utf-16le') : void 0;
    function pa(a, b) {
      var c = a >> 1;
      for (var e = c + b / 2; !(c >= e) && G[c]; ) ++c;
      c <<= 1;
      if (32 < c - a && oa) return oa.decode(F.subarray(a, c));
      c = 0;
      for (e = ''; ; ) {
        var f = H[(a + 2 * c) >> 1];
        if (0 == f || c == b / 2) return e;
        ++c;
        e += String.fromCharCode(f);
      }
    }
    function qa(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var e = b;
      c = c < 2 * a.length ? c / 2 : a.length;
      for (var f = 0; f < c; ++f) (H[b >> 1] = a.charCodeAt(f)), (b += 2);
      H[b >> 1] = 0;
      return b - e;
    }
    function ra(a) {
      return 2 * a.length;
    }
    function sa(a, b) {
      for (var c = 0, e = ''; !(c >= b / 4); ) {
        var f = I[(a + 4 * c) >> 2];
        if (0 == f) break;
        ++c;
        65536 <= f
          ? ((f -= 65536),
            (e += String.fromCharCode(55296 | (f >> 10), 56320 | (f & 1023))))
          : (e += String.fromCharCode(f));
      }
      return e;
    }
    function ta(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var e = b;
      c = e + c - 4;
      for (var f = 0; f < a.length; ++f) {
        var g = a.charCodeAt(f);
        if (55296 <= g && 57343 >= g) {
          var h = a.charCodeAt(++f);
          g = (65536 + ((g & 1023) << 10)) | (h & 1023);
        }
        I[b >> 2] = g;
        b += 4;
        if (b + 4 > c) break;
      }
      I[b >> 2] = 0;
      return b - e;
    }
    function ua(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var e = a.charCodeAt(c);
        55296 <= e && 57343 >= e && ++c;
        b += 4;
      }
      return b;
    }
    var J, va, F, H, G, I, K, wa, xa;
    function ya(a) {
      J = a;
      d.HEAP8 = va = new Int8Array(a);
      d.HEAP16 = H = new Int16Array(a);
      d.HEAP32 = I = new Int32Array(a);
      d.HEAPU8 = F = new Uint8Array(a);
      d.HEAPU16 = G = new Uint16Array(a);
      d.HEAPU32 = K = new Uint32Array(a);
      d.HEAPF32 = wa = new Float32Array(a);
      d.HEAPF64 = xa = new Float64Array(a);
    }
    var za = d.INITIAL_MEMORY || 16777216;
    d.wasmMemory
      ? (E = d.wasmMemory)
      : (E = new WebAssembly.Memory({ initial: za / 65536, maximum: 32768 }));
    E && (J = E.buffer);
    za = J.byteLength;
    ya(J);
    I[153976] = 5858944;
    function Aa(a) {
      for (; 0 < a.length; ) {
        var b = a.shift();
        if ('function' == typeof b) b(d);
        else {
          var c = b.ma;
          'number' === typeof c
            ? void 0 === b.ia
              ? d.dynCall_v(c)
              : d.dynCall_vi(c, b.ia)
            : c(void 0 === b.ia ? null : b.ia);
        }
      }
    }
    var Ba = [],
      Ca = [],
      Da = [],
      Ea = [];
    function Fa() {
      var a = d.preRun.shift();
      Ba.unshift(a);
    }
    var L = 0,
      Ga = null,
      N = null;
    d.preloadedImages = {};
    d.preloadedAudios = {};
    function A(a) {
      if (d.onAbort) d.onAbort(a);
      B(a);
      ka = !0;
      a = new WebAssembly.RuntimeError(
        'abort(' + a + '). Build with -s ASSERTIONS=1 for more info.',
      );
      ba(a);
      throw a;
    }
    function Ha(a) {
      var b = O;
      return String.prototype.startsWith ? b.startsWith(a) : 0 === b.indexOf(a);
    }
    function Ia() {
      return Ha('data:application/octet-stream;base64,');
    }
    var O = 'avif_dec.wasm';
    if (!Ia()) {
      var Ja = O;
      O = d.locateFile ? d.locateFile(Ja, w) : w + Ja;
    }
    function Ka() {
      try {
        if (D) return new Uint8Array(D);
        if (z) return z(O);
        throw 'both async and sync fetching of the wasm failed';
      } catch (a) {
        A(a);
      }
    }
    function La() {
      return D || (!u && !v) || 'function' !== typeof fetch || Ha('file://')
        ? new Promise(function (a) {
            a(Ka());
          })
        : fetch(O, { credentials: 'same-origin' })
            .then(function (a) {
              if (!a.ok) throw "failed to load wasm binary file at '" + O + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return Ka();
            });
    }
    Ca.push({
      ma: function () {
        Ma();
      },
    });
    function Na() {
      return 0 < Na.ka;
    }
    function Oa(a) {
      switch (a) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw new TypeError('Unknown type size: ' + a);
      }
    }
    var Pa = void 0;
    function P(a) {
      for (var b = ''; F[a]; ) b += Pa[F[a++]];
      return b;
    }
    var Q = {},
      R = {},
      Qa = {};
    function Ra(a) {
      if (void 0 === a) return '_unknown';
      a = a.replace(/[^a-zA-Z0-9_]/g, '$');
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? '_' + a : a;
    }
    function Sa(a, b) {
      a = Ra(a);
      return new Function(
        'body',
        'return function ' +
          a +
          '() {\n    "use strict";    return body.apply(this, arguments);\n};\n',
      )(b);
    }
    function Ta(a) {
      var b = Error,
        c = Sa(a, function (e) {
          this.name = a;
          this.message = e;
          e = Error(e).stack;
          void 0 !== e &&
            (this.stack =
              this.toString() + '\n' + e.replace(/^Error(:[^\n]*)?\n/, ''));
        });
      c.prototype = Object.create(b.prototype);
      c.prototype.constructor = c;
      c.prototype.toString = function () {
        return void 0 === this.message
          ? this.name
          : this.name + ': ' + this.message;
      };
      return c;
    }
    var Ua = void 0;
    function T(a) {
      throw new Ua(a);
    }
    var Va = void 0;
    function Wa(a, b) {
      function c(l) {
        l = b(l);
        if (l.length !== e.length)
          throw new Va('Mismatched type converter count');
        for (var k = 0; k < e.length; ++k) U(e[k], l[k]);
      }
      var e = [];
      e.forEach(function (l) {
        Qa[l] = a;
      });
      var f = Array(a.length),
        g = [],
        h = 0;
      a.forEach(function (l, k) {
        R.hasOwnProperty(l)
          ? (f[k] = R[l])
          : (g.push(l),
            Q.hasOwnProperty(l) || (Q[l] = []),
            Q[l].push(function () {
              f[k] = R[l];
              ++h;
              h === g.length && c(f);
            }));
      });
      0 === g.length && c(f);
    }
    function U(a, b, c) {
      c = c || {};
      if (!('argPackAdvance' in b))
        throw new TypeError(
          'registerType registeredInstance requires argPackAdvance',
        );
      var e = b.name;
      a || T('type "' + e + '" must have a positive integer typeid pointer');
      if (R.hasOwnProperty(a)) {
        if (c.na) return;
        T("Cannot register type '" + e + "' twice");
      }
      R[a] = b;
      delete Qa[a];
      Q.hasOwnProperty(a) &&
        ((b = Q[a]),
        delete Q[a],
        b.forEach(function (f) {
          f();
        }));
    }
    var Xa = [],
      V = [
        {},
        { value: void 0 },
        { value: null },
        { value: !0 },
        { value: !1 },
      ];
    function Ya(a) {
      4 < a && 0 === --V[a].ja && ((V[a] = void 0), Xa.push(a));
    }
    function ab(a) {
      switch (a) {
        case void 0:
          return 1;
        case null:
          return 2;
        case !0:
          return 3;
        case !1:
          return 4;
        default:
          var b = Xa.length ? Xa.pop() : V.length;
          V[b] = { ja: 1, value: a };
          return b;
      }
    }
    function bb(a) {
      return this.fromWireType(K[a >> 2]);
    }
    function cb(a) {
      if (null === a) return 'null';
      var b = typeof a;
      return 'object' === b || 'array' === b || 'function' === b
        ? a.toString()
        : '' + a;
    }
    function db(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(wa[c >> 2]);
          };
        case 3:
          return function (c) {
            return this.fromWireType(xa[c >> 3]);
          };
        default:
          throw new TypeError('Unknown float type: ' + a);
      }
    }
    function eb(a) {
      var b = Function;
      if (!(b instanceof Function))
        throw new TypeError(
          'new_ called with constructor type ' +
            typeof b +
            ' which is not a function',
        );
      var c = Sa(b.name || 'unknownFunctionName', function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }
    function fb(a) {
      for (; a.length; ) {
        var b = a.pop();
        a.pop()(b);
      }
    }
    function gb(a, b) {
      var c = d;
      if (void 0 === c[a].ga) {
        var e = c[a];
        c[a] = function () {
          c[a].ga.hasOwnProperty(arguments.length) ||
            T(
              "Function '" +
                b +
                "' called with an invalid number of arguments (" +
                arguments.length +
                ') - expects one of (' +
                c[a].ga +
                ')!',
            );
          return c[a].ga[arguments.length].apply(this, arguments);
        };
        c[a].ga = [];
        c[a].ga[e.la] = e;
      }
    }
    function hb(a, b, c) {
      d.hasOwnProperty(a)
        ? ((void 0 === c || (void 0 !== d[a].ga && void 0 !== d[a].ga[c])) &&
            T("Cannot register public name '" + a + "' twice"),
          gb(a, a),
          d.hasOwnProperty(c) &&
            T(
              'Cannot register multiple overloads of a function with the same number of arguments (' +
                c +
                ')!',
            ),
          (d[a].ga[c] = b))
        : ((d[a] = b), void 0 !== c && (d[a].pa = c));
    }
    function ib(a, b) {
      for (var c = [], e = 0; e < a; e++) c.push(I[(b >> 2) + e]);
      return c;
    }
    function jb(a, b) {
      a = P(a);
      var c = d['dynCall_' + a];
      for (var e = [], f = 1; f < a.length; ++f) e.push('a' + f);
      f =
        'return function dynCall_' +
        (a + '_' + b) +
        '(' +
        e.join(', ') +
        ') {\n';
      f +=
        '    return dynCall(rawFunction' +
        (e.length ? ', ' : '') +
        e.join(', ') +
        ');\n';
      c = new Function('dynCall', 'rawFunction', f + '};\n')(c, b);
      'function' !== typeof c &&
        T('unknown function pointer with signature ' + a + ': ' + b);
      return c;
    }
    var kb = void 0;
    function lb(a) {
      a = mb(a);
      var b = P(a);
      W(a);
      return b;
    }
    function nb(a, b) {
      function c(g) {
        f[g] || R[g] || (Qa[g] ? Qa[g].forEach(c) : (e.push(g), (f[g] = !0)));
      }
      var e = [],
        f = {};
      b.forEach(c);
      throw new kb(a + ': ' + e.map(lb).join([', ']));
    }
    function ob(a, b, c) {
      switch (b) {
        case 0:
          return c
            ? function (e) {
                return va[e];
              }
            : function (e) {
                return F[e];
              };
        case 1:
          return c
            ? function (e) {
                return H[e >> 1];
              }
            : function (e) {
                return G[e >> 1];
              };
        case 2:
          return c
            ? function (e) {
                return I[e >> 2];
              }
            : function (e) {
                return K[e >> 2];
              };
        default:
          throw new TypeError('Unknown integer type: ' + a);
      }
    }
    var pb = {};
    function qb() {
      return 'object' === typeof globalThis
        ? globalThis
        : Function('return this')();
    }
    function rb(a, b) {
      var c = R[a];
      void 0 === c && T(b + ' has unknown type ' + lb(a));
      return c;
    }
    for (
      var sb = {}, tb = [null, [], []], ub = Array(256), vb = 0;
      256 > vb;
      ++vb
    )
      ub[vb] = String.fromCharCode(vb);
    Pa = ub;
    Ua = d.BindingError = Ta('BindingError');
    Va = d.InternalError = Ta('InternalError');
    d.count_emval_handles = function () {
      for (var a = 0, b = 5; b < V.length; ++b) void 0 !== V[b] && ++a;
      return a;
    };
    d.get_first_emval = function () {
      for (var a = 5; a < V.length; ++a) if (void 0 !== V[a]) return V[a];
      return null;
    };
    kb = d.UnboundTypeError = Ta('UnboundTypeError');
    var Db = {
      u: function (a) {
        return wb(a);
      },
      r: function () {},
      t: function (a) {
        'uncaught_exception' in Na ? Na.ka++ : (Na.ka = 1);
        throw a;
      },
      D: function (a, b, c, e, f) {
        var g = Oa(c);
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (h) {
            return !!h;
          },
          toWireType: function (h, l) {
            return l ? e : f;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (h) {
            if (1 === c) var l = va;
            else if (2 === c) l = H;
            else if (4 === c) l = I;
            else throw new TypeError('Unknown boolean type size: ' + b);
            return this.fromWireType(l[h >> g]);
          },
          ha: null,
        });
      },
      C: function (a, b) {
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (c) {
            var e = V[c].value;
            Ya(c);
            return e;
          },
          toWireType: function (c, e) {
            return ab(e);
          },
          argPackAdvance: 8,
          readValueFromPointer: bb,
          ha: null,
        });
      },
      p: function (a, b, c) {
        c = Oa(c);
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (e) {
            return e;
          },
          toWireType: function (e, f) {
            if ('number' !== typeof f && 'boolean' !== typeof f)
              throw new TypeError(
                'Cannot convert "' + cb(f) + '" to ' + this.name,
              );
            return f;
          },
          argPackAdvance: 8,
          readValueFromPointer: db(b, c),
          ha: null,
        });
      },
      v: function (a, b, c, e, f, g) {
        var h = ib(b, c);
        a = P(a);
        f = jb(e, f);
        hb(
          a,
          function () {
            nb('Cannot call ' + a + ' due to unbound types', h);
          },
          b - 1,
        );
        Wa(h, function (l) {
          var k = [l[0], null].concat(l.slice(1)),
            n = (l = a),
            p = f,
            q = k.length;
          2 > q &&
            T(
              "argTypes array size mismatch! Must at least get return value and 'this' types!",
            );
          for (var y = null !== k[1] && !1, C = !1, m = 1; m < k.length; ++m)
            if (null !== k[m] && void 0 === k[m].ha) {
              C = !0;
              break;
            }
          var Za = 'void' !== k[0].name,
            M = '',
            S = '';
          for (m = 0; m < q - 2; ++m)
            (M += (0 !== m ? ', ' : '') + 'arg' + m),
              (S += (0 !== m ? ', ' : '') + 'arg' + m + 'Wired');
          n =
            'return function ' +
            Ra(n) +
            '(' +
            M +
            ') {\nif (arguments.length !== ' +
            (q - 2) +
            ") {\nthrowBindingError('function " +
            n +
            " called with ' + arguments.length + ' arguments, expected " +
            (q - 2) +
            " args!');\n}\n";
          C && (n += 'var destructors = [];\n');
          var $a = C ? 'destructors' : 'null';
          M = 'throwBindingError invoker fn runDestructors retType classParam'.split(
            ' ',
          );
          p = [T, p, g, fb, k[0], k[1]];
          y &&
            (n += 'var thisWired = classParam.toWireType(' + $a + ', this);\n');
          for (m = 0; m < q - 2; ++m)
            (n +=
              'var arg' +
              m +
              'Wired = argType' +
              m +
              '.toWireType(' +
              $a +
              ', arg' +
              m +
              '); // ' +
              k[m + 2].name +
              '\n'),
              M.push('argType' + m),
              p.push(k[m + 2]);
          y && (S = 'thisWired' + (0 < S.length ? ', ' : '') + S);
          n +=
            (Za ? 'var rv = ' : '') +
            'invoker(fn' +
            (0 < S.length ? ', ' : '') +
            S +
            ');\n';
          if (C) n += 'runDestructors(destructors);\n';
          else
            for (m = y ? 1 : 2; m < k.length; ++m)
              (q = 1 === m ? 'thisWired' : 'arg' + (m - 2) + 'Wired'),
                null !== k[m].ha &&
                  ((n += q + '_dtor(' + q + '); // ' + k[m].name + '\n'),
                  M.push(q + '_dtor'),
                  p.push(k[m].ha));
          Za && (n += 'var ret = retType.fromWireType(rv);\nreturn ret;\n');
          M.push(n + '}\n');
          k = eb(M).apply(null, p);
          m = b - 1;
          if (!d.hasOwnProperty(l))
            throw new Va('Replacing nonexistant public symbol');
          void 0 !== d[l].ga && void 0 !== m
            ? (d[l].ga[m] = k)
            : ((d[l] = k), (d[l].la = m));
          return [];
        });
      },
      d: function (a, b, c, e, f) {
        function g(n) {
          return n;
        }
        b = P(b);
        -1 === f && (f = 4294967295);
        var h = Oa(c);
        if (0 === e) {
          var l = 32 - 8 * c;
          g = function (n) {
            return (n << l) >>> l;
          };
        }
        var k = -1 != b.indexOf('unsigned');
        U(a, {
          name: b,
          fromWireType: g,
          toWireType: function (n, p) {
            if ('number' !== typeof p && 'boolean' !== typeof p)
              throw new TypeError(
                'Cannot convert "' + cb(p) + '" to ' + this.name,
              );
            if (p < e || p > f)
              throw new TypeError(
                'Passing a number "' +
                  cb(p) +
                  '" from JS side to C/C++ side to an argument of type "' +
                  b +
                  '", which is outside the valid range [' +
                  e +
                  ', ' +
                  f +
                  ']!',
              );
            return k ? p >>> 0 : p | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: ob(b, h, 0 !== e),
          ha: null,
        });
      },
      c: function (a, b, c) {
        function e(g) {
          g >>= 2;
          var h = K;
          return new f(J, h[g + 1], h[g]);
        }
        var f = [
          Int8Array,
          Uint8Array,
          Int16Array,
          Uint16Array,
          Int32Array,
          Uint32Array,
          Float32Array,
          Float64Array,
        ][b];
        c = P(c);
        U(
          a,
          {
            name: c,
            fromWireType: e,
            argPackAdvance: 8,
            readValueFromPointer: e,
          },
          { na: !0 },
        );
      },
      q: function (a, b) {
        b = P(b);
        var c = 'std::string' === b;
        U(a, {
          name: b,
          fromWireType: function (e) {
            var f = K[e >> 2];
            if (c)
              for (var g = e + 4, h = 0; h <= f; ++h) {
                var l = e + 4 + h;
                if (h == f || 0 == F[l]) {
                  g = g ? ma(F, g, l - g) : '';
                  if (void 0 === k) var k = g;
                  else (k += String.fromCharCode(0)), (k += g);
                  g = l + 1;
                }
              }
            else {
              k = Array(f);
              for (h = 0; h < f; ++h) k[h] = String.fromCharCode(F[e + 4 + h]);
              k = k.join('');
            }
            W(e);
            return k;
          },
          toWireType: function (e, f) {
            f instanceof ArrayBuffer && (f = new Uint8Array(f));
            var g = 'string' === typeof f;
            g ||
              f instanceof Uint8Array ||
              f instanceof Uint8ClampedArray ||
              f instanceof Int8Array ||
              T('Cannot pass non-string to std::string');
            var h = (c && g
                ? function () {
                    for (var n = 0, p = 0; p < f.length; ++p) {
                      var q = f.charCodeAt(p);
                      55296 <= q &&
                        57343 >= q &&
                        (q =
                          (65536 + ((q & 1023) << 10)) |
                          (f.charCodeAt(++p) & 1023));
                      127 >= q
                        ? ++n
                        : (n = 2047 >= q ? n + 2 : 65535 >= q ? n + 3 : n + 4);
                    }
                    return n;
                  }
                : function () {
                    return f.length;
                  })(),
              l = wb(4 + h + 1);
            K[l >> 2] = h;
            if (c && g) na(f, l + 4, h + 1);
            else if (g)
              for (g = 0; g < h; ++g) {
                var k = f.charCodeAt(g);
                255 < k &&
                  (W(l),
                  T('String has UTF-16 code units that do not fit in 8 bits'));
                F[l + 4 + g] = k;
              }
            else for (g = 0; g < h; ++g) F[l + 4 + g] = f[g];
            null !== e && e.push(W, l);
            return l;
          },
          argPackAdvance: 8,
          readValueFromPointer: bb,
          ha: function (e) {
            W(e);
          },
        });
      },
      j: function (a, b, c) {
        c = P(c);
        if (2 === b) {
          var e = pa;
          var f = qa;
          var g = ra;
          var h = function () {
            return G;
          };
          var l = 1;
        } else
          4 === b &&
            ((e = sa),
            (f = ta),
            (g = ua),
            (h = function () {
              return K;
            }),
            (l = 2));
        U(a, {
          name: c,
          fromWireType: function (k) {
            for (var n = K[k >> 2], p = h(), q, y = k + 4, C = 0; C <= n; ++C) {
              var m = k + 4 + C * b;
              if (C == n || 0 == p[m >> l])
                (y = e(y, m - y)),
                  void 0 === q
                    ? (q = y)
                    : ((q += String.fromCharCode(0)), (q += y)),
                  (y = m + b);
            }
            W(k);
            return q;
          },
          toWireType: function (k, n) {
            'string' !== typeof n &&
              T('Cannot pass non-string to C++ string type ' + c);
            var p = g(n),
              q = wb(4 + p + b);
            K[q >> 2] = p >> l;
            f(n, q + 4, p + b);
            null !== k && k.push(W, q);
            return q;
          },
          argPackAdvance: 8,
          readValueFromPointer: bb,
          ha: function (k) {
            W(k);
          },
        });
      },
      E: function (a, b) {
        b = P(b);
        U(a, {
          oa: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {},
        });
      },
      n: Ya,
      F: function (a) {
        if (0 === a) return ab(qb());
        var b = pb[a];
        a = void 0 === b ? P(a) : b;
        return ab(qb()[a]);
      },
      w: function (a) {
        4 < a && (V[a].ja += 1);
      },
      l: function (a, b, c, e) {
        a || T('Cannot use deleted val. handle = ' + a);
        a = V[a].value;
        var f = sb[b];
        if (!f) {
          f = '';
          for (var g = 0; g < b; ++g) f += (0 !== g ? ', ' : '') + 'arg' + g;
          var h =
            'return function emval_allocator_' +
            b +
            '(constructor, argTypes, args) {\n';
          for (g = 0; g < b; ++g)
            h +=
              'var argType' +
              g +
              " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " +
              g +
              '], "parameter ' +
              g +
              '");\nvar arg' +
              g +
              ' = argType' +
              g +
              '.readValueFromPointer(args);\nargs += argType' +
              g +
              "['argPackAdvance'];\n";
          f = new Function(
            'requireRegisteredType',
            'Module',
            '__emval_register',
            h +
              ('var obj = new constructor(' +
                f +
                ');\nreturn __emval_register(obj);\n}\n'),
          )(rb, d, ab);
          sb[b] = f;
        }
        return f(a, c, e);
      },
      k: function () {
        A();
      },
      s: function () {
        B('missing function: aom_codec_av1_cx');
        A(-1);
      },
      e: function (a, b) {
        X(a, b || 1);
        throw 'longjmp';
      },
      A: function (a, b, c) {
        F.copyWithin(a, b, b + c);
      },
      f: function (a) {
        a >>>= 0;
        var b = F.length;
        if (2147483648 < a) return !1;
        for (var c = 1; 4 >= c; c *= 2) {
          var e = b * (1 + 0.2 / c);
          e = Math.min(e, a + 100663296);
          e = Math.max(16777216, a, e);
          0 < e % 65536 && (e += 65536 - (e % 65536));
          a: {
            try {
              E.grow((Math.min(2147483648, e) - J.byteLength + 65535) >>> 16);
              ya(E.buffer);
              var f = 1;
              break a;
            } catch (g) {}
            f = void 0;
          }
          if (f) return !0;
        }
        return !1;
      },
      B: function () {
        return 0;
      },
      x: function () {},
      o: function (a, b, c, e) {
        for (var f = 0, g = 0; g < c; g++) {
          for (
            var h = I[(b + 8 * g) >> 2], l = I[(b + (8 * g + 4)) >> 2], k = 0;
            k < l;
            k++
          ) {
            var n = F[h + k],
              p = tb[a];
            0 === n || 10 === n
              ? ((1 === a ? ha : B)(ma(p, 0)), (p.length = 0))
              : p.push(n);
          }
          f += l;
        }
        I[e >> 2] = f;
        return 0;
      },
      a: function () {
        return ia | 0;
      },
      h: xb,
      y: yb,
      z: zb,
      g: Ab,
      m: Bb,
      i: Cb,
      memory: E,
      b: function (a) {
        ia = a | 0;
      },
      table: ja,
    };
    (function () {
      function a(f) {
        d.asm = f.exports;
        L--;
        d.monitorRunDependencies && d.monitorRunDependencies(L);
        0 == L &&
          (null !== Ga && (clearInterval(Ga), (Ga = null)),
          N && ((f = N), (N = null), f()));
      }
      function b(f) {
        a(f.instance);
      }
      function c(f) {
        return La()
          .then(function (g) {
            return WebAssembly.instantiate(g, e);
          })
          .then(f, function (g) {
            B('failed to asynchronously prepare wasm: ' + g);
            A(g);
          });
      }
      var e = { a: Db };
      L++;
      d.monitorRunDependencies && d.monitorRunDependencies(L);
      if (d.instantiateWasm)
        try {
          return d.instantiateWasm(e, a);
        } catch (f) {
          return (
            B('Module.instantiateWasm callback failed with error: ' + f), !1
          );
        }
      (function () {
        if (
          D ||
          'function' !== typeof WebAssembly.instantiateStreaming ||
          Ia() ||
          Ha('file://') ||
          'function' !== typeof fetch
        )
          return c(b);
        fetch(O, { credentials: 'same-origin' }).then(function (f) {
          return WebAssembly.instantiateStreaming(f, e).then(b, function (g) {
            B('wasm streaming compile failed: ' + g);
            B('falling back to ArrayBuffer instantiation');
            return c(b);
          });
        });
      })();
      return {};
    })();
    var Ma = (d.___wasm_call_ctors = function () {
        return (Ma = d.___wasm_call_ctors = d.asm.G).apply(null, arguments);
      }),
      wb = (d._malloc = function () {
        return (wb = d._malloc = d.asm.H).apply(null, arguments);
      }),
      W = (d._free = function () {
        return (W = d._free = d.asm.I).apply(null, arguments);
      }),
      mb = (d.___getTypeName = function () {
        return (mb = d.___getTypeName = d.asm.J).apply(null, arguments);
      });
    d.___embind_register_native_and_builtin_types = function () {
      return (d.___embind_register_native_and_builtin_types = d.asm.K).apply(
        null,
        arguments,
      );
    };
    var X = (d._setThrew = function () {
        return (X = d._setThrew = d.asm.L).apply(null, arguments);
      }),
      Y = (d.stackSave = function () {
        return (Y = d.stackSave = d.asm.M).apply(null, arguments);
      }),
      Z = (d.stackRestore = function () {
        return (Z = d.stackRestore = d.asm.N).apply(null, arguments);
      }),
      Eb = (d.dynCall_v = function () {
        return (Eb = d.dynCall_v = d.asm.O).apply(null, arguments);
      }),
      Fb = (d.dynCall_vi = function () {
        return (Fb = d.dynCall_vi = d.asm.P).apply(null, arguments);
      }),
      Gb = (d.dynCall_vii = function () {
        return (Gb = d.dynCall_vii = d.asm.Q).apply(null, arguments);
      }),
      Hb = (d.dynCall_viiii = function () {
        return (Hb = d.dynCall_viiii = d.asm.R).apply(null, arguments);
      });
    d.dynCall_ii = function () {
      return (d.dynCall_ii = d.asm.S).apply(null, arguments);
    };
    var Ib = (d.dynCall_iii = function () {
      return (Ib = d.dynCall_iii = d.asm.T).apply(null, arguments);
    });
    d.dynCall_iiii = function () {
      return (d.dynCall_iiii = d.asm.U).apply(null, arguments);
    };
    var Jb = (d.dynCall_iiiii = function () {
      return (Jb = d.dynCall_iiiii = d.asm.V).apply(null, arguments);
    });
    d.dynCall_viiiiii = function () {
      return (d.dynCall_viiiiii = d.asm.W).apply(null, arguments);
    };
    d.dynCall_viiiii = function () {
      return (d.dynCall_viiiii = d.asm.X).apply(null, arguments);
    };
    d.dynCall_viiiiiiii = function () {
      return (d.dynCall_viiiiiiii = d.asm.Y).apply(null, arguments);
    };
    d.dynCall_viiiiiiiiiii = function () {
      return (d.dynCall_viiiiiiiiiii = d.asm.Z).apply(null, arguments);
    };
    d.dynCall_viiiiiiiiiiii = function () {
      return (d.dynCall_viiiiiiiiiiii = d.asm._).apply(null, arguments);
    };
    d.dynCall_viii = function () {
      return (d.dynCall_viii = d.asm.$).apply(null, arguments);
    };
    d.dynCall_viiiiiii = function () {
      return (d.dynCall_viiiiiii = d.asm.aa).apply(null, arguments);
    };
    d.dynCall_iiiiiii = function () {
      return (d.dynCall_iiiiiii = d.asm.ba).apply(null, arguments);
    };
    d.dynCall_iidiiii = function () {
      return (d.dynCall_iidiiii = d.asm.ca).apply(null, arguments);
    };
    d.dynCall_i = function () {
      return (d.dynCall_i = d.asm.da).apply(null, arguments);
    };
    d.dynCall_viiiiiiiiii = function () {
      return (d.dynCall_viiiiiiiiii = d.asm.ea).apply(null, arguments);
    };
    d.dynCall_jiji = function () {
      return (d.dynCall_jiji = d.asm.fa).apply(null, arguments);
    };
    function Bb(a, b, c) {
      var e = Y();
      try {
        Gb(a, b, c);
      } catch (f) {
        Z(e);
        if (f !== f + 0 && 'longjmp' !== f) throw f;
        X(1, 0);
      }
    }
    function Cb(a, b, c, e, f) {
      var g = Y();
      try {
        Hb(a, b, c, e, f);
      } catch (h) {
        Z(g);
        if (h !== h + 0 && 'longjmp' !== h) throw h;
        X(1, 0);
      }
    }
    function xb(a, b, c) {
      var e = Y();
      try {
        return Ib(a, b, c);
      } catch (f) {
        Z(e);
        if (f !== f + 0 && 'longjmp' !== f) throw f;
        X(1, 0);
      }
    }
    function Ab(a, b) {
      var c = Y();
      try {
        Fb(a, b);
      } catch (e) {
        Z(c);
        if (e !== e + 0 && 'longjmp' !== e) throw e;
        X(1, 0);
      }
    }
    function zb(a) {
      var b = Y();
      try {
        Eb(a);
      } catch (c) {
        Z(b);
        if (c !== c + 0 && 'longjmp' !== c) throw c;
        X(1, 0);
      }
    }
    function yb(a, b, c, e, f) {
      var g = Y();
      try {
        return Jb(a, b, c, e, f);
      } catch (h) {
        Z(g);
        if (h !== h + 0 && 'longjmp' !== h) throw h;
        X(1, 0);
      }
    }
    var Kb;
    N = function Lb() {
      Kb || Mb();
      Kb || (N = Lb);
    };
    function Mb() {
      function a() {
        if (!Kb && ((Kb = !0), (d.calledRun = !0), !ka)) {
          Aa(Ca);
          Aa(Da);
          aa(d);
          if (d.onRuntimeInitialized) d.onRuntimeInitialized();
          if (d.postRun)
            for (
              'function' == typeof d.postRun && (d.postRun = [d.postRun]);
              d.postRun.length;

            ) {
              var b = d.postRun.shift();
              Ea.unshift(b);
            }
          Aa(Ea);
        }
      }
      if (!(0 < L)) {
        if (d.preRun)
          for (
            'function' == typeof d.preRun && (d.preRun = [d.preRun]);
            d.preRun.length;

          )
            Fa();
        Aa(Ba);
        0 < L ||
          (d.setStatus
            ? (d.setStatus('Running...'),
              setTimeout(function () {
                setTimeout(function () {
                  d.setStatus('');
                }, 1);
                a();
              }, 1))
            : a());
      }
    }
    d.run = Mb;
    if (d.preInit)
      for (
        'function' == typeof d.preInit && (d.preInit = [d.preInit]);
        0 < d.preInit.length;

      )
        d.preInit.pop()();
    noExitRuntime = !0;
    Mb();

    return avif_dec.ready;
  };
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = avif_dec;
else if (typeof define === 'function' && define['amd'])
  define([], function () {
    return avif_dec;
  });
else if (typeof exports === 'object') exports['avif_dec'] = avif_dec;
