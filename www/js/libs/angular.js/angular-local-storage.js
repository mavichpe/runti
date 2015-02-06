(function() {
    "use strict";
    var a = angular.module("LocalStorageModule", []);
    a.provider("localStorageService", function() {
        this.prefix = "ls", this.storageType = "localStorage", this.cookie = {expiry: 30, path: "/"}, this.notify = {setItem: !0, removeItem: !1}, this.setPrefix = function(a) {
            this.prefix = a
        }, this.setStorageType = function(a) {
            this.storageType = a
        }, this.setStorageCookie = function(a, b) {
            this.cookie = {expiry: a, path: b}
        }, this.setStorageCookieDomain = function(a) {
            this.cookie.domain = a
        }, this.setNotify = function(a, b) {
            this.notify = {setItem: a, removeItem: b}
        }, this.$get = ["$rootScope", "$window", "$document", function(a, b, c) {
                var d, e = this, f = e.prefix, g = e.cookie, h = e.notify, i = e.storageType;
                c ? c[0] && (c = c[0]) : c = document, "." !== f.substr(-1) && (f = f ? f + "." : "");
                var j = function(a) {
                    return f + a
                }, k = function() {
                    try {
                        var c = i in b && null !== b[i], e = j("__" + Math.round(1e7 * Math.random()));
                        return c && (d = b[i], d.setItem(e, ""), d.removeItem(e)), c
                    } catch (f) {
                        return i = "cookie", a.$broadcast("LocalStorageModule.notification.error", f.message), !1
                    }
                }(), l = function(b, c) {
                    if (!k || "cookie" === e.storageType)
                        return a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), h.setItem && a.$broadcast("LocalStorageModule.notification.setitem", {key: b, newvalue: c, storageType: "cookie"}), r(b, c);
                    "undefined" == typeof c && (c = null);
                    try {
                        (angular.isObject(c) || angular.isArray(c)) && (c = angular.toJson(c)), d && d.setItem(j(b), c), h.setItem && a.$broadcast("LocalStorageModule.notification.setitem", {key: b, newvalue: c, storageType: e.storageType})
                    } catch (f) {
                        return a.$broadcast("LocalStorageModule.notification.error", f.message), r(b, c)
                    }
                    return!0
                }, m = function(b) {
                    if (!k || "cookie" === e.storageType)
                        return a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), s(b);
                    var c = d ? d.getItem(j(b)) : null;
                    return c && "null" !== c ? "{" === c.charAt(0) || "[" === c.charAt(0) ? angular.fromJson(c) : c : null
                }, n = function(b) {
                    if (!k)
                        return a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), h.removeItem && a.$broadcast("LocalStorageModule.notification.removeitem", {key: b, storageType: "cookie"}), t(b);
                    try {
                        d.removeItem(j(b)), h.removeItem && a.$broadcast("LocalStorageModule.notification.removeitem", {key: b, storageType: e.storageType})
                    } catch (c) {
                        return a.$broadcast("LocalStorageModule.notification.error", c.message), t(b)
                    }
                    return!0
                }, o = function() {
                    if (!k)
                        return a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), !1;
                    var b = f.length, c = [];
                    for (var e in d)
                        if (e.substr(0, b) === f)
                            try {
                                c.push(e.substr(b))
                            } catch (g) {
                                return a.$broadcast("LocalStorageModule.notification.error", g.Description), []
                            }
                    return c
                }, p = function(b) {
                    b = b || "";
                    var c = f.slice(0, -1), e = new RegExp(c + "." + b);
                    if (!k)
                        return a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), u();
                    var g = f.length;
                    for (var h in d)
                        if (e.test(h))
                            try {
                                n(h.substr(g))
                            } catch (i) {
                                return a.$broadcast("LocalStorageModule.notification.error", i.message), u()
                            }
                    return!0
                }, q = function() {
                    try {
                        return navigator.cookieEnabled || "cookie"in c && (c.cookie.length > 0 || (c.cookie = "test").indexOf.call(c.cookie, "test") > -1)
                    } catch (b) {
                        return a.$broadcast("LocalStorageModule.notification.error", b.message), !1
                    }
                }, r = function(b, d) {
                    if ("undefined" == typeof d)
                        return!1;
                    if (!q())
                        return a.$broadcast("LocalStorageModule.notification.error", "COOKIES_NOT_SUPPORTED"), !1;
                    try {
                        var e = "", f = new Date, h = "";
                        if (null === d ? (f.setTime(f.getTime() + -864e5), e = "; expires=" + f.toGMTString(), d = "") : 0 !== g.expiry && (f.setTime(f.getTime() + 24 * g.expiry * 60 * 60 * 1e3), e = "; expires=" + f.toGMTString()), b) {
                            var i = "; path=" + g.path;
                            g.domain && (h = "; domain=" + g.domain), c.cookie = j(b) + "=" + encodeURIComponent(d) + e + i + h
                        }
                    } catch (k) {
                        return a.$broadcast("LocalStorageModule.notification.error", k.message), !1
                    }
                    return!0
                }, s = function(b) {
                    if (!q())
                        return a.$broadcast("LocalStorageModule.notification.error", "COOKIES_NOT_SUPPORTED"), !1;
                    for (var d = c.cookie && c.cookie.split(";") || [], e = 0; e < d.length; e++) {
                        for (var g = d[e]; " " === g.charAt(0); )
                            g = g.substring(1, g.length);
                        if (0 === g.indexOf(j(b) + "="))
                            return decodeURIComponent(g.substring(f.length + b.length + 1, g.length))
                    }
                    return null
                }, t = function(a) {
                    r(a, null)
                }, u = function() {
                    for (var a = null, b = f.length, d = c.cookie.split(";"), e = 0; e < d.length; e++) {
                        for (a = d[e]; " " === a.charAt(0); )
                            a = a.substring(1, a.length);
                        var g = a.substring(b, a.indexOf("="));
                        t(g)
                    }
                }, v = function() {
                    return i
                }, w = function(a, b, c) {
                    var d = m(b);
                    null === d && angular.isDefined(c) ? d = c : angular.isObject(d) && angular.isObject(c) && (d = angular.extend(c, d)), a[b] = d, a.$watchCollection(b, function(a) {
                        l(b, a)
                    })
                };
                return{isSupported: k, getStorageType: v, set: l, add: l, get: m, keys: o, remove: n, clearAll: p, bind: w, deriveKey: j, cookie: {set: r, add: r, get: s, remove: t, clearAll: u}}
            }]
    })
}).call(this);