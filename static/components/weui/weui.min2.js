/*!
 * weui.js v1.0.0 (https://weui.io)
 * Copyright 2016, wechat ui team
 * MIT license
 */
! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.weui = t() : e.weui = t()
}(this, function () {
    return function (e) {
        function t(i) {
            if (n[i]) return n[i].exports;
            var a = n[i] = {
                exports: {},
                id: i,
                loaded: !1
            };
            return e[i].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(1),
            o = i(a),
            r = n(7),
            u = i(r),
            l = n(8),
            d = i(l),
            f = n(9),
            s = i(f),
            c = n(11),
            p = i(c),
            v = n(13),
            h = i(v),
            m = n(15),
            _ = i(m),
            y = n(17),
            w = i(y),
            g = n(18),
            b = i(g),
            k = n(19),
            x = i(k),
            j = n(20),
            E = i(j),
            C = n(24),
            M = n(29),
            S = i(M),
            O = n(31),
            P = i(O);
        t.default = {
            dialog: o.default,
            alert: u.default,
            confirm: d.default,
            toast: s.default,
            loading: p.default,
            actionSheet: h.default,
            topTips: _.default,
            searchBar: w.default,
            tab: b.default,
            form: x.default,
            uploader: E.default,
            picker: C.picker,
            datePicker: C.datePicker,
            gallery: S.default,
            slider: P.default,
            componentId: C.id
        }, e.exports = t.default
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a() {
            function e() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r.default.noop;
                o.addClass("weui-animate-fade-out"), a.addClass("weui-animate-fade-out").on("animationend webkitAnimationEnd", function () {
                    i.remove(), d = !1, e()
                })
            }
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (d) return d;
            var n = r.default.os.android;
            t = r.default.extend({
                title: null,
                content: "",
                className: "",
                buttons: [{
                    label: "确认",
                    type: "primary",
                    onClick: r.default.noop
                }],
                isAndroid: n
            }, t);
            var i = (0, r.default)(r.default.render(l.default, t)),
                a = i.find(".weui-dialog"),
                o = i.find(".weui-mask");
            return (0, r.default)("body").append(i), o.addClass("weui-animate-fade-in"), a.addClass("weui-animate-fade-in"), i.on("click", ".weui-dialog__btn", function (n) {
                var i = this,
                    a = (0, r.default)(this).index();
                e(function () {
                    t.buttons[a].onClick && t.buttons[a].onClick.call(i, n)
                })
            }), d = i[0], d.hide = e, d
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(2),
            r = i(o),
            u = n(6),
            l = i(u),
            d = void 0;
        t.default = a, e.exports = t.default
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a(e) {
            var t = this.os = {},
                n = e.match(/(Android);?[\s\/]+([\d.]+)?/);
            n && (t.android = !0, t.version = n[2])
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        n(3);
        var r = n(4),
            u = i(r),
            l = n(5),
            d = i(l);
        a.call(d.default, navigator.userAgent), (0, u.default)(d.default.fn, {
            append: function (e) {
                return e instanceof HTMLElement || (e = e[0]), this.forEach(function (t) {
                    t.appendChild(e)
                }), this
            },
            remove: function () {
                return this.forEach(function (e) {
                    e.parentNode.removeChild(e)
                }), this
            },
            find: function (e) {
                return (0, d.default)(e, this)
            },
            addClass: function (e) {
                return this.forEach(function (t) {
                    t.classList.add(e)
                }), this
            },
            removeClass: function (e) {
                return this.forEach(function (t) {
                    t.classList.remove(e)
                }), this
            },
            eq: function (e) {
                return (0, d.default)(this[e])
            },
            show: function () {
                return this.forEach(function (e) {
                    e.style.display = "block"
                }), this
            },
            hide: function () {
                return this.forEach(function (e) {
                    e.style.display = "none"
                }), this
            },
            html: function (e) {
                return this.forEach(function (t) {
                    t.innerHTML = e
                }), this
            },
            css: function (e) {
                var t = this;
                return Object.keys(e).forEach(function (n) {
                    t.forEach(function (t) {
                        t.style[n] = e[n]
                    })
                }), this
            },
            on: function (e, t, n) {
                var i = "string" == typeof t && "function" == typeof n;
                return i || (n = t), this.forEach(function (a) {
                    e.split(" ").forEach(function (e) {
                        a.addEventListener(e, function (e) {
                            i ? this.contains(e.target.closest(t)) && n.call(e.target, e) : n.call(this, e)
                        })
                    })
                }), this
            },
            off: function (e, t, n) {
                return "function" == typeof t && (n = t, t = null), this.forEach(function (i) {
                    e.split(" ").forEach(function (e) {
                        "string" == typeof t ? i.querySelectorAll(t).forEach(function (t) {
                            t.removeEventListener(e, n)
                        }) : i.removeEventListener(e, n)
                    })
                }), this
            },
            index: function () {
                var e = this[0],
                    t = e.parentNode;
                return Array.prototype.indexOf.call(t.children, e)
            },
            offAll: function () {
                var e = this;
                return this.forEach(function (t, n) {
                    var i = t.cloneNode(!0);
                    t.parentNode.replaceChild(i, t), e[n] = i
                }), this
            },
            val: function () {
                var e = arguments;
                return arguments.length ? (this.forEach(function (t) {
                    t.value = e[0]
                }), this) : this[0].value
            },
            attr: function () {
                var e = arguments,
                    t = this;
                if ("object" == o(arguments[0])) {
                    var n = function () {
                        var n = e[0],
                            i = t;
                        return Object.keys(n).forEach(function (e) {
                            i.forEach(function (t) {
                                t.setAttribute(e, n[e])
                            })
                        }), {
                            v: t
                        }
                    }();
                    if ("object" === ("undefined" == typeof n ? "undefined" : o(n))) return n.v
                }
                return "string" == typeof arguments[0] && arguments.length < 2 ? this[0].getAttribute(arguments[0]) : (this.forEach(function (t) {
                    t.setAttribute(e[0], e[1])
                }), this)
            }
        }), (0, u.default)(d.default, {
            extend: u.default,
            noop: function () {},
            render: function (e, t) {
                var n = "var p=[],print=function(){p.push.apply(p,arguments);};with(this){p.push('" + e.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');";
                return new Function(n).apply(t)
            },
            getStyle: function (e, t) {
                var n, i = (e.ownerDocument || document).defaultView;
                return i && i.getComputedStyle ? (t = t.replace(/([A-Z])/g, "-$1").toLowerCase(), i.getComputedStyle(e, null).getPropertyValue(t)) : e.currentStyle ? (t = t.replace(/\-(\w)/g, function (e, t) {
                    return t.toUpperCase()
                }), n = e.currentStyle[t], /^\d+(em|pt|%|ex)?$/i.test(n) ? function (t) {
                    var n = e.style.left,
                        i = e.runtimeStyle.left;
                    return e.runtimeStyle.left = e.currentStyle.left, e.style.left = t || 0, t = e.style.pixelLeft + "px", e.style.left = n, e.runtimeStyle.left = i, t
                }(n) : n) : void 0
            }
        }), t.default = d.default, e.exports = t.default
    }, function (e, t) {
        ! function (e) {
            "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) {
                for (var t = this, n = (t.document || t.ownerDocument).querySelectorAll(e), i = 0; n[i] && n[i] !== t;) ++i;
                return Boolean(n[i])
            }), "function" != typeof e.closest && (e.closest = function (e) {
                for (var t = this; t && 1 === t.nodeType;) {
                    if (t.matches(e)) return t;
                    t = t.parentNode
                }
                return null
            })
        }(window.Element.prototype)
    }, function (e, t) {
        "use strict";

        function n(e) {
            if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(e)
        }

        function i() {
            try {
                if (!Object.assign) return !1;
                var e = new String("abc");
                if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
                for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
                var i = Object.getOwnPropertyNames(t).map(function (e) {
                    return t[e]
                });
                if ("0123456789" !== i.join("")) return !1;
                var a = {};
                return "abcdefghijklmnopqrst".split("").forEach(function (e) {
                    a[e] = e
                }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, a)).join("")
            } catch (e) {
                return !1
            }
        }
        var a = Object.prototype.hasOwnProperty,
            o = Object.prototype.propertyIsEnumerable;
        e.exports = i() ? Object.assign : function (e, t) {
            for (var i, r, u = n(e), l = 1; l < arguments.length; l++) {
                i = Object(arguments[l]);
                for (var d in i) a.call(i, d) && (u[d] = i[d]);
                if (Object.getOwnPropertySymbols) {
                    r = Object.getOwnPropertySymbols(i);
                    for (var f = 0; f < r.length; f++) o.call(i, r[f]) && (u[r[f]] = i[r[f]])
                }
            }
            return u
        }
    }, function (e, t, n) {
        var i, a;
        ! function (n, o) {
            o = function (e, t, n) {
                function i(a, o, r) {
                    return r = Object.create(i.fn), a && r.push.apply(r, a[t] ? [a] : "" + a === a ? /</.test(a) ? ((o = e.createElement(o || t)).innerHTML = a, o.children) : o ? (o = i(o)[0]) ? o[n](a) : r : e[n](a) : "function" == typeof a ? e.readyState[7] ? a() : e[t]("DOMContentLoaded", a) : a), r
                }
                return i.fn = [], i.one = function (e, t) {
                    return i(e, t)[0] || null
                }, i
            }(document, "addEventListener", "querySelectorAll"), i = [], a = function () {
                return o
            }.apply(t, i), !(void 0 !== a && (e.exports = a))
        }(this)
    }, function (e, t) {
        e.exports = '<div class="<%=className%>"> <div class=weui-mask></div> <div class="weui-dialog <% if(isAndroid){ %> weui-skin_android <% } %>"> <% if(title){ %> <div class=weui-dialog__hd><strong class=weui-dialog__title><%=title%></strong></div> <% } %> <div class=weui-dialog__bd><%=content%></div> <div class=weui-dialog__ft> <% for(var i = 0; i < buttons.length; i++){ %> <a href=javascript:; class="weui-dialog__btn weui-dialog__btn_<%=buttons[i][\'type\']%>"><%=buttons[i][\'label\']%></a> <% } %> </div> </div> </div> '
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments[1],
                n = arguments[2],
                i = "object" === ("undefined" == typeof t ? "undefined" : o(t));
            return i && (n = t), n = u.default.extend({
                content: e,
                buttons: [{
                    label: "确认",
                    type: "primary",
                    onClick: i ? u.default.noop : t
                }]
            }, n), (0, d.default)(n)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            r = n(2),
            u = i(r),
            l = n(1),
            d = i(l);
        t.default = a, e.exports = t.default
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments[1],
                n = arguments[2],
                i = arguments[3],
                a = "object" === ("undefined" == typeof t ? "undefined" : o(t));
            return a && (i = t), i = u.default.extend({
                content: e,
                buttons: [{
                    label: "取消",
                    type: "default",
                    onClick: a ? u.default.noop : n
                }, {
                    label: "确认",
                    type: "primary",
                    onClick: a ? u.default.noop : t
                }]
            }, i), (0, d.default)(i)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            r = n(2),
            u = i(r),
            l = n(1),
            d = i(l);
        t.default = a, e.exports = t.default
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (d) return d;
            "number" == typeof t && (t = {
                duration: t
            }), "function" == typeof t && (t = {
                callback: t
            }), t = r.default.extend({
                content: e,
                duration: 3e3,
                callback: r.default.noop,
                className: ""
            }, t);
            var n = (0, r.default)(r.default.render(l.default, t));
            return (0, r.default)("body").append(n), n.addClass("weui-animate-fade-in"), setTimeout(function () {
                n.addClass("weui-animate-fade-out").on("animationend webkitAnimationEnd", function () {
                    n.remove(), d = !1, t.callback()
                })
            }, t.duration), d = n[0], n[0]
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(2),
            r = i(o),
            u = n(10),
            l = i(u),
            d = void 0;
        t.default = a, e.exports = t.default
    }, function (e, t) {
        e.exports = '<div class="<%= className %>"> <div class=weui-mask_transparent></div> <div class=weui-toast> <i class="weui-icon_toast weui-icon-success-no-circle"></i> <p class=weui-toast__content><%=content%></p> </div> </div> '
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a() {
            function e() {
                i.addClass("weui-animate-fade-out").on("animationend webkitAnimationEnd", function () {
                    i.remove(), d = !1
                })
            }
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (d) return d;
            n = r.default.extend({
                content: t,
                className: ""
            }, n);
            var i = (0, r.default)(r.default.render(l.default, n));
            return (0, r.default)("body").append(i), i.addClass("weui-animate-fade-in"), d = i[0], d.hide = e, d
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(2),
            r = i(o),
            u = n(12),
            l = i(u),
            d = void 0;
        t.default = a, e.exports = t.default
    }, function (e, t) {
        e.exports = '<div class="weui-loading_toast <%= className %>"> <div class=weui-mask_transparent></div> <div class=weui-toast> <i class="weui-loading weui-icon_toast"></i> <p class=weui-toast__content><%=content%></p> </div> </div> '
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a() {
            function e() {
                u.addClass(a ? "weui-animate-fade-out" : "weui-animate-slide-down"), f.addClass("weui-animate-fade-out").on("animationend webkitAnimationEnd", function () {
                    o.remove(), d = !1
                })
            }
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if (d) return d;
            var a = r.default.os.android;
            i = r.default.extend({
                menus: t,
                actions: n,
                className: "",
                isAndroid: a
            }, i);
            var o = (0, r.default)(r.default.render(l.default, i)),
                u = o.find(".weui-actionsheet"),
                f = o.find(".weui-mask");
            return (0, r.default)("body").append(o), r.default.getStyle(u[0], "transform"), u.addClass(a ? "weui-animate-fade-in" : "weui-animate-slide-up"), f.addClass("weui-animate-fade-in").on("click", e), o.find(".weui-actionsheet__menu").on("click", ".weui-actionsheet__cell", function (n) {
                var i = (0, r.default)(this).index();
                t[i].onClick.call(this, n), e()
            }), o.find(".weui-actionsheet__action").on("click", ".weui-actionsheet__cell", function (t) {
                var i = (0, r.default)(this).index();
                n[i].onClick.call(this, t), e()
            }), d = o[0], d.hide = e, d
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(2),
            r = i(o),
            u = n(14),
            l = i(u),
            d = void 0;
        t.default = a, e.exports = t.default
    }, function (e, t) {
        e.exports = '<div class="<% if(isAndroid){ %>weui-skin_android <% } %><%= className %>"> <div class=weui-mask></div> <div class=weui-actionsheet> <div class=weui-actionsheet__menu> <% for(var i = 0; i < menus.length; i++){ %> <div class=weui-actionsheet__cell><%= menus[i].label %></div> <% } %> </div> <div class=weui-actionsheet__action> <% for(var j = 0; j < actions.length; j++){ %> <div class=weui-actionsheet__cell><%= actions[j].label %></div> <% } %> </div> </div> </div> '
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a(e) {
            function t() {
                i.remove(), n.callback(), d = null
            }
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            "number" == typeof n && (n = {
                duration: n
            }), "function" == typeof n && (n = {
                callback: n
            }), n = r.default.extend({
                content: e,
                duration: 3e3,
                callback: r.default.noop,
                className: ""
            }, n);
            var i = (0, r.default)(r.default.render(l.default, n));
            return (0, r.default)("body").append(i), d && (clearTimeout(d.timeout), d.hide()), d = {
                hide: t
            }, d.timeout = setTimeout(t, n.duration), i[0].hide = t, i[0]
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(2),
            r = i(o),
            u = n(16),
            l = i(u),
            d = null;
        t.default = a, e.exports = t.default
    }, function (e, t) {
        e.exports = '<div class="weui-toptips weui-toptips_warn <%= className %>" style=display:block><%= content %></div> '
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a(e) {
            var t = (0, r.default)(e);
            return t.forEach(function (e) {
                function t() {
                    a.val(""), n.removeClass("weui-search-bar_focusing")
                }
                var n = (0, r.default)(e),
                    i = n.find(".weui-search-bar__label"),
                    a = n.find(".weui-search-bar__input"),
                    o = n.find(".weui-icon-clear"),
                    u = n.find(".weui-search-bar__cancel-btn");
                i.on("click", function () {
                    n.addClass("weui-search-bar_focusing"), a[0].focus()
                }), a.on("blur", function () {
                    this.value.length || t()
                }), o.on("click", function () {
                    a.val(""), a[0].focus()
                }), u.on("click", function () {
                    t(), a[0].blur()
                })
            }), t
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(2),
            r = i(o);
        t.default = a, e.exports = t.default
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = (0, r.default)(e);
            return t = r.default.extend({
                defaultIndex: 0,
                onChange: r.default.noop
            }, t), n.forEach(function (e) {
                var n = (0, r.default)(e),
                    i = n.find(".weui-navbar__item, .weui-tabbar__item"),
                    a = n.find(".weui-tab__content");
                i.eq(t.defaultIndex).addClass("weui-bar__item_on"), a.eq(t.defaultIndex).show(), i.on("click", function () {
                    var e = (0, r.default)(this),
                        n = e.index();
                    i.removeClass("weui-bar__item_on"), e.addClass("weui-bar__item_on"), a.hide(), a.eq(n).show(), t.onChange.call(this, n)
                })
            }), this
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(2),
            r = i(o);
        t.default = a, e.exports = t.default
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a(e) {
            return e && e.classList ? e.classList.contains("weui-cell") ? e : a(e.parentNode) : null
        }

        function o(e, t, n) {
            var i = e[0],
                a = e.val();
            if ("INPUT" == i.tagName || "TEXTAREA" == i.tagName) {
                var o = i.getAttribute("required") || i.getAttribute("pattern") || "";
                if ("radio" == i.type) {
                    for (var r = t.find('input[type="radio"][name="' + i.name + '"]'), u = 0, l = r.length; u < l; ++u)
                        if (r[u].checked) return null;
                    return "empty"
                }
                if ("checkbox" != i.type) {
                    if (e.val().length) {
                        if (o) {
                            if (/^REG_/.test(o)) {
                                if (!n) throw "RegExp " + o + " is empty.";
                                if (o = o.replace(/^REG_/, ""), !n[o]) throw "RegExp " + o + " has not found.";
                                o = n[o]
                            }
                            return new RegExp(o).test(a) ? null : "notMatch"
                        }
                        return null
                    }
                    return "empty"
                }
                if (!o) return i.checked ? null : "empty";
                var f = function () {
                    var e = t.find('input[type="checkbox"][name="' + i.name + '"]'),
                        n = o.replace(/[{\s}]/g, "").split(","),
                        a = 0;
                    if (2 != n.length) throw i.outerHTML + " regexp is wrong.";
                    return e.forEach(function (e) {
                        e.checked && ++a
                    }), a ? "" === n[1] ? a >= parseInt(n[0]) ? {
                        v: null
                    } : {
                        v: "notMatch"
                    } : parseInt(n[0]) <= a && a <= parseInt(n[1]) ? {
                        v: null
                    } : {
                        v: "notMatch"
                    } : {
                        v: "empty"
                    }
                }();
                if ("object" === ("undefined" == typeof f ? "undefined" : d(f))) return f.v
            } else if (a.length) return null;
            return "empty"
        }

        function r(e) {
            if (e) {
                var t = (0, s.default)(e.ele),
                    n = e.msg,
                    i = t.attr(n + "Tips") || t.attr("tips") || t.attr("placeholder");
                if (i && (0, p.default)(i), "checkbox" == e.ele.type || "radio" == e.ele.type) return;
                var o = a(e.ele);
                o && o.classList.add("weui-cell_warn")
            }
        }

        function u(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s.default.noop,
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                i = (0, s.default)(e);
            return i.forEach(function (e) {
                var i = (0, s.default)(e),
                    a = i.find("[required]");
                "function" != typeof t && (t = r);
                for (var u = 0, l = a.length; u < l; ++u) {
                    var d = a.eq(u),
                        f = o(d, i, n.regexp),
                        c = {
                            ele: d[0],
                            msg: f
                        };
                    if (f) return void(t(c) || r(c))
                }
                t(null)
            }), this
        }

        function l(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = (0, s.default)(e);
            return n.forEach(function (e) {
                var n = (0, s.default)(e);
                n.find("[required]").on("blur", function () {
                    if ("checkbox" != this.type && "radio" != this.type) {
                        var e = (0, s.default)(this);
                        if (!(e.val().length < 1)) {
                            var i = o(e, n, t.regexp);
                            i && r({
                                ele: e[0],
                                msg: i
                            })
                        }
                    }
                }).on("focus", function () {
                    var e = a(this);
                    e && e.classList.remove("weui-cell_warn")
                })
            }), this
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            f = n(2),
            s = i(f),
            c = n(15),
            p = i(c);
        t.default = {
            validate: u,
            checkIfBlur: l
        }, e.exports = t.default
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a(e, t) {
            function n(e, t) {
                var n = e.find('[data-id="' + t + '"]'),
                    i = n.find(".weui-uploader__file-content");
                return i.length || (i = (0, r.default)('<div class="weui-uploader__file-content"></div>'), n.append(i)), n.addClass("weui-uploader__file_status"), i
            }

            function i(e, t) {
                var n = e.find('[data-id="' + t + '"]').removeClass("weui-uploader__file_status");
                n.find(".weui-uploader__file-content").remove()
            }

            function a(e) {
                e.url = u.createObjectURL(e), e.upload = function () {
                    (0, s.default)(r.default.extend({
                        $uploader: o,
                        file: e
                    }, t))
                }, t.onQueued(e), t.auto && e.upload()
            }
            var o = (0, r.default)(e),
                u = window.URL || window.webkitURL || window.mozURL;
            t = r.default.extend({
                url: "",
                auto: !0,
                type: "file",
                fileVal: "file",
                onBeforeQueued: r.default.noop,
                onQueued: r.default.noop,
                onBeforeSend: r.default.noop,
                onSuccess: r.default.noop,
                onProgress: r.default.noop,
                onError: r.default.noop
            }, t), t.compress !== !1 && (t.compress = r.default.extend({
                width: 1600,
                height: 1600,
                quality: .8
            }, t.compress)), t.onBeforeQueued && ! function () {
                var e = t.onBeforeQueued;
                t.onBeforeQueued = function (t, n) {
                    var i = e.call(t, n);
                    if (i === !1) return !1;
                    if (i !== !0) {
                        var a = (0, r.default)(r.default.render(l.default, {
                            id: t.id
                        }));
                        o.find(".weui-uploader__files").append(a)
                    }
                }
            }(), t.onQueued && ! function () {
                var e = t.onQueued;
                t.onQueued = function (n) {
                    if (!e.call(n)) {
                        var a = o.find('[data-id="' + n.id + '"]');
                        a.css({
                            backgroundImage: 'url("' + (n.base64 || n.url) + '")'
                        }), t.auto || i(o, n.id)
                    }
                }
            }(), t.onBeforeSend && ! function () {
                var e = t.onBeforeSend;
                t.onBeforeSend = function (t, n, i) {
                    var a = e.call(t, n, i);
                    if (a === !1) return !1
                }
            }(), t.onSuccess && ! function () {
                var e = t.onSuccess;
                t.onSuccess = function (t, n) {
                    e.call(t, n) || i(o, t.id)
                }
            }(), t.onProgress && ! function () {
                var e = t.onProgress;
                t.onProgress = function (t, i) {
                    e.call(t, i) || n(o, t.id).html(i + "%")
                }
            }(), t.onError && ! function () {
                var e = t.onError;
                t.onError = function (t, i) {
                    e.call(t, i) || n(o, t.id).html('<i class="weui-icon-warn"></i>')
                }
            }(), o.find('input[type="file"]').on("change", function (e) {
                var n = e.target.files;
                0 !== n.length && (t.compress === !1 && "file" == t.type ? Array.prototype.forEach.call(n, function (e) {
                    e.id = ++c, t.onBeforeQueued(e, n) !== !1 && a(e)
                }) : Array.prototype.forEach.call(n, function (e) {
                    e.id = ++c, t.onBeforeQueued(e, n) !== !1 && (0, d.compress)(e, t, function (e) {
                        e && a(e)
                    })
                }), this.value = "")
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(2),
            r = i(o),
            u = n(21),
            l = i(u),
            d = n(22),
            f = n(23),
            s = i(f),
            c = 0;
        t.default = a, e.exports = t.default
    }, function (e, t) {
        e.exports = '<li class="weui-uploader__file weui-uploader__file_status" data-id="<%= id %>"> <div class=weui-uploader__file-content> <i class=weui-loading style=width:30px;height:30px></i> </div> </li> '
    }, function (e, t) {
        "use strict";

        function n(e) {
            var t, n = e.naturalHeight,
                i = document.createElement("canvas");
            i.width = 1, i.height = n;
            var a = i.getContext("2d");
            a.drawImage(e, 0, 0);
            try {
                t = a.getImageData(0, 0, 1, n).data
            } catch (e) {
                return 1
            }
            for (var o = 0, r = n, u = n; u > o;) {
                var l = t[4 * (u - 1) + 3];
                0 === l ? r = u : o = u, u = r + o >> 1
            }
            var d = u / n;
            return 0 === d ? 1 : d
        }

        function i(e) {
            for (var t = atob(e.split(",")[1]), n = e.split(",")[0].split(":")[1].split(";")[0], i = new ArrayBuffer(t.length), a = new Uint8Array(i), o = 0; o < t.length; o++) a[o] = t.charCodeAt(o);
            return new Blob([i], {
                type: n
            })
        }

        function a(e, t, a) {
            var o = new FileReader;
            o.onload = function (o) {
                if (t.compress === !1) return e.base64 = o.target.result, void a(e);
                var r = new Image;
                r.onload = function () {
                    var o = n(r),
                        u = document.createElement("canvas"),
                        l = u.getContext("2d"),
                        d = t.compress.width,
                        f = t.compress.height,
                        s = r.width,
                        c = r.height,
                        p = void 0;
                    if (s < c && c > f ? (s = parseInt(f * r.width / r.height), c = f) : s >= c && s > d && (c = parseInt(d * r.height / r.width), s = d), u.width = s, u.height = c, l.drawImage(r, 0, 0, s, c / o), p = /image\/jpeg/.test(e.type) || /image\/jpg/.test(e.type) ? u.toDataURL("image/jpeg", t.compress.quality) : u.toDataURL(e.type), "file" == t.type)
                        if (/;base64,null/.test(p) || /;base64,$/.test(p)) a(e);
                        else {
                            var v = i(p);
                            v.id = e.id, v.name = e.name, v.lastModified = e.lastModified, v.lastModifiedDate = e.lastModifiedDate, a(v)
                        }
                    else /;base64,null/.test(p) || /;base64,$/.test(p) ? (t.onError(e, new Error("Compress fail, dataURL is " + p + ".")), a()) : (e.base64 = p, a(e))
                }, r.src = o.target.result
            }, o.readAsDataURL(e)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.detectVerticalSquash = n, t.dataURItoBlob = i, t.compress = a
    }, function (e, t) {
        "use strict";

        function n(e) {
            var t = e.url,
                n = e.file,
                i = e.fileVal,
                a = e.onBeforeSend,
                o = e.onProgress,
                r = e.onError,
                u = e.onSuccess,
                l = n.name,
                d = n.type,
                f = n.lastModifiedDate,
                s = {
                    name: l,
                    type: d,
                    size: "file" == e.type ? n.size : n.base64.length,
                    lastModifiedDate: f
                },
                c = {};
            if (a(n, s, c) !== !1) {
                o(n, 0);
                var p = new FormData,
                    v = new XMLHttpRequest;
                n.xhr = v, Object.keys(s).forEach(function (e) {
                    p.append(e, s[e])
                }), "file" == e.type ? p.append(i, n, l) : p.append(i, n.base64), v.onreadystatechange = function () {
                    if (4 == v.readyState)
                        if (200 == v.status) try {
                            var e = JSON.parse(v.responseText);
                            u(n, e)
                        } catch (e) {
                            r(n, e)
                        } else r(n, new Error("XMLHttpRequest response status is " + v.status))
                }, v.upload.addEventListener("progress", function (e) {
                    if (0 != e.total) {
                        var t = 100 * Math.ceil(e.loaded / e.total);
                        o(n, t)
                    }
                }, !1), v.open("POST", t), Object.keys(c).forEach(function (e) {
                    v.setRequestHeader(e, c[e])
                }), v.send(p)
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = n, e.exports = t.default
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t
        }

        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function o() {
            function e(n, i) {
                if (void 0 === u[i] && o.defaultValue && void 0 !== o.defaultValue[i]) {
                    for (var a = o.defaultValue[i], f = 0, s = n.length; f < s && a != n[f].value; ++f);
                    f < s && (u[i] = f)
                }
                d.find(".weui-picker__group").eq(i).scroll({
                    items: n,
                    temp: u[i],
                    onChange: function (n, a) {
                        if (n ? r[i] = n.value : r[i] = null, u[i] = a, t) o.onChange(r);
                        else if (n.children && n.children.length > 0) d.find(".weui-picker__group").eq(i + 1).show(), !t && e(n.children, i + 1);
                        else {
                            var f = d.find(".weui-picker__group");
                            f.forEach(function (e, t) {
                                t > i && (0, l.default)(e).hide()
                            }), r.splice(i + 1), o.onChange(r)
                        }
                    },
                    onConfirm: o.onConfirm
                })
            }
            if (h) return h;
            var t = !1,
                n = void 0;
            if (arguments.length > 2) {
                var i = 0;
                for (n = []; i < arguments.length - 1;) n.push(arguments[i++]);
                t = !0
            } else n = arguments[0];
            var a = arguments[arguments.length - 1],
                o = l.default.extend({
                    id: "default",
                    className: "",
                    onChange: l.default.noop,
                    onConfirm: l.default.noop
                }, a);
            w[o.id] = w[o.id] || [];
            for (var r = [], u = w[o.id], d = (0, l.default)(l.default.render(c.default, o)), s = a.depth || (t ? n.length : f.depthOf(n[0])), p = ""; s--;) p += v.default;
            return d.find(".weui-picker__bd").html(p), _(d), t ? n.forEach(function (t, n) {
                e(t, n)
            }) : e(n, 0), d.on("click", ".weui-mask", function () {
                y(d)
            }).on("click", ".weui-picker__action", function () {
                y(d)
            }).on("click", "#weui-picker-confirm", function () {
                o.onConfirm(r)
            }).on("click","#cancel_lp",function () {
            	o.onCancel()
            }), h = d[0], h.hide = function () {
                y(d)
            }, h
        }

        function r(e) {
            for (var t = l.default.extend({
                    id: "datePicker",
                    onChange: l.default.noop,
                    onConfirm: l.default.noop,
                    start: 2e3,
                    end: 2030
                }, e), n = [], i = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], a = t.start; a <= t.end; a++) {
                var r = [];
                a % 4 == 0 && a % 100 != 0 || a % 400 == 0 ? i[1] = 29 : i[1] = 28;
                for (var u = 0; u < 12; u++) {
                    for (var d = [], f = 1; f < i[u] + 1; f++) {
                        var s = {
                            label: f + "日",
                            value: f
                        };
                        d.push(s)
                    }
                    r.push({
                        label: u + 1 + "月",
                        value: u + 1,
                        children: d
                    })
                }
                var c = {
                    label: a + "年",
                    value: a,
                    children: r
                };
                n.push(c)
            }
            return o(n, t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = n(2),
            l = a(u);
        n(25);
        var d = n(26),
            f = i(d),
            s = n(27),
            c = a(s),
            p = n(28),
            v = a(p),
            h = void 0,
            m = function (e) {
                e && (e.remove(), h = !1)
            },
            _ = function (e) {
                (0, l.default)("body").append(e), l.default.getStyle(e[0], "transform"), e.find(".weui-mask").addClass("weui-animate-fade-in"), e.find(".weui-picker").addClass("weui-animate-slide-up")
            },
            y = function (e) {
                e.find(".weui-mask").addClass("weui-animate-fade-out"), e.find(".weui-picker").addClass("weui-animate-slide-down").on("animationend webkitAnimationEnd", function () {
                    m(e)
                })
            },
            w = {};
        t.default = {
            picker: o,
            datePicker: r
        }, e.exports = t.default
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var a = n(2),
            o = i(a),
            r = function (e, t) {
                return e.css({
                    "webkitTransition": "all " + t + "s",
                    transition: "all " + t + "s"
                })
            },
            u = function (e, t) {
                return e.css({
                    "webkitTransform": "translate3d(0, " + t + "px, 0)",
                    transform: "translate3d(0, " + t + "px, 0)"
                })
            },
            l = function (e) {
                for (var t = Math.floor(e.length / 2), n = 0; e[t] && e[t].disabled;)
                    if (t = ++t % e.length, n++, n > e.length) throw new Error("No selectable item.");
                return t
            },
            d = function (e, t, n) {
                var i = l(n);
                return (e - i) * t
            },
            f = function (e, t) {
                return e * t
            },
            s = function (e, t, n) {
                return -(t * (n - e - 1))
            };
        o.default.fn.scroll = function (e) {
            var t = this,
                n = o.default.extend({
                    items: [],
                    scrollable: ".weui-picker__content",
                    offset: 3,
                    rowHeight: 34,
                    onChange: o.default.noop,
                    temp: null,
                    bodyHeight: 238
                }, e),
                i = n.items.map(function (e) {
                    return '<div class="weui-picker__item' + (e.disabled ? " weui-picker__item_disabled" : "") + '">' + e.label + "</div>"
                }).join("");
            (0, o.default)(this).find(".weui-picker__content").html(i);
            var a = (0, o.default)(this).find(n.scrollable),
                c = void 0,
                p = void 0,
                v = void 0,
                h = void 0,
                m = [],
                _ = window.innerHeight;
            if (null !== n.temp && n.temp < n.items.length) {
                var y = n.temp;
                n.onChange.call(this, n.items[y], y), h = (n.offset - y) * n.rowHeight
            } else {
                var w = l(n.items);
                n.onChange.call(this, n.items[w], w), h = d(n.offset, n.rowHeight, n.items)
            }
            u(a, h);
            var g = function (e) {
                h += e, h = Math.round(h / n.rowHeight) * n.rowHeight;
                var i = f(n.offset, n.rowHeight),
                    o = s(n.offset, n.rowHeight, n.items.length);
                h > i && (h = i), h < o && (h = o);
                for (var l = n.offset - h / n.rowHeight; n.items[l] && n.items[l].disabled;) e > 0 ? ++l : --l;
                h = (n.offset - l) * n.rowHeight, r(a, .3), u(a, h), n.onChange.call(t, n.items[l], l)
            };
            a = (0, o.default)(this).offAll().on("touchstart", function (e) {
                c = e.changedTouches[0].pageY, v = +new Date
            }).on("touchmove", function (e) {
                p = e.changedTouches[0].pageY;
                var t = p - c;
                r(a, 0), u(a, h + t), v = +new Date, m.push({
                    time: v,
                    y: p
                }), m.length > 40 && m.shift(), e.preventDefault()
            }).on("touchend", function (e) {
                var t = (new Date).getTime();
                p = e.changedTouches[0].pageY;
                var i = _ - n.bodyHeight / 2;
                if (t - v > 100) g(Math.abs(p - c) > 10 ? p - c : i - p);
                else if (Math.abs(p - c) > 10) {
                    for (var a = m.length - 1, o = a, r = a; r > 0 && v - m[r].time < 100; r--) o = r;
                    if (o !== a) {
                        var u = m[a],
                            l = m[o],
                            d = u.time - l.time,
                            f = u.y - l.y,
                            s = f / d,
                            h = 150 * s + (p - c);
                        g(h)
                    } else g(0)
                } else g(i - p)
            }).find(n.scrollable)
        }
    }, function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.depthOf = function e(t) {
            var n = 1;
            return t.children && t.children[0] && (n = e(t.children[0]) + 1), n
        }
    }, function (e, t) {
        e.exports = '<div class="<%= className %>"> <div class=weui-mask></div> <div class=weui-picker> <div class=weui-picker__hd> <a href=javascript:; data-action=cancel class=weui-picker__action id=cancel_lp>取消</a> <a href=javascript:; data-action=select class=weui-picker__action id=weui-picker-confirm>确认</a> </div> <div class=weui-picker__bd></div> </div> </div> '
    }, function (e, t) {
        e.exports = "<div class=weui-picker__group> <div class=weui-picker__mask></div> <div class=weui-picker__indicator></div> <div class=weui-picker__content></div> </div>"
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a(e) {
            function t() {
                i.addClass("weui-animate-fade-out").on("animationend webkitAnimationEnd", function () {
                    i.remove(), d = !1
                })
            }
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (d) return d;
            n = r.default.extend({
                className: "",
                onDelete: r.default.noop
            }, n);
            var i = (0, r.default)(r.default.render(l.default, r.default.extend({
                url: e
            }, n)));
            return (0, r.default)("body").append(i), i.find(".weui-gallery__img").on("click", t), i.find(".weui-gallery__del").on("click", function () {
                n.onDelete.call(this, e)
            }), i.show().addClass("weui-animate-fade-in"), d = i[0], d.hide = t, d
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(2),
            r = i(o),
            u = n(30),
            l = i(u),
            d = void 0;
        t.default = a, e.exports = t.default
    }, function (e, t) {
        e.exports = '<div class="weui-gallery <%= className %>"> <span class=weui-gallery__img style="background-image:url(<%= url %>)"><%= url %></span> <div class=weui-gallery__opr> <a href=javascript: class=weui-gallery__del> <i class="weui-icon-delete weui-icon_gallery-delete"></i> </a> </div> </div> '
    }, function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = (0, r.default)(e);
            if (t = r.default.extend({
                    step: void 0,
                    defaultValue: 0,
                    onChange: r.default.noop
                }, t), void 0 !== t.step && (t.step = parseFloat(t.step), !t.step || t.step < 0)) throw new Error("Slider step must be a positive number.");
            if (void 0 !== t.defaultValue && t.defaultValue < 0 || t.defaultValue > 100) throw new Error("Slider defaultValue must be >= 0 and <= 100.");
            return n.forEach(function (e) {
                function n() {
                    var e = r.default.getStyle(l[0], "left");
                    return e = /%/.test(e) ? d * parseFloat(e) / 100 : parseFloat(e)
                }

                function i(n) {
                    var i = void 0,
                        a = void 0;
                    t.step && (n = Math.round(n / p) * p), i = s + n, i = i < 0 ? 0 : i > d ? d : i, a = 100 * i / d, u.css({
                        width: a + "%"
                    }), l.css({
                        left: a + "%"
                    }), t.onChange.call(e, a)
                }
                var a = (0, r.default)(e),
                    o = a.find(".weui-slider__inner"),
                    u = a.find(".weui-slider__track"),
                    l = a.find(".weui-slider__handler"),
                    d = parseInt(r.default.getStyle(o[0], "width")),
                    f = o[0].offsetLeft,
                    s = 0,
                    c = 0,
                    p = void 0;
                t.step && (p = d * t.step / 100), t.defaultValue && i(d * t.defaultValue / 100), a.on("click", function (e) {
                    e.preventDefault(), s = n(), i(e.pageX - f - s)
                }), l.on("touchstart", function (e) {
                    s = n(), c = e.changedTouches[0].clientX
                }).on("touchmove", function (e) {
                    e.preventDefault(), i(e.changedTouches[0].clientX - c)
                })
            }), this
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(2),
            r = i(o);
        t.default = a, e.exports = t.default
    }])
});
