// outerHtml support.
jq$.fn.outerHTML = function (s) {
    return s
    ? this.before(s).remove()
    : jq$("<p>").append(this.eq(0).clone()).html();
};

// Cookie support.
(function (e, b) { var a = /\+/g; function d(f) { return f } function c(f) { return decodeURIComponent(f.replace(a, " ")) } e.cookie = function (k, j, o) { if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(j)) || j == null)) { o = e.extend({}, e.cookie.defaults, o); if (j == null) { o.expires = -1 } if (typeof o.expires === "number") { var l = o.expires, n = o.expires = new Date(); n.setDate(n.getDate() + l) } j = String(j); return (b.cookie = [encodeURIComponent(k), "=", o.raw ? j : encodeURIComponent(j), o.expires ? "; expires=" + o.expires.toUTCString() : "", o.path ? "; path=" + o.path : "", o.domain ? "; domain=" + o.domain : "", o.secure ? "; secure" : ""].join("")) } o = j || e.cookie.defaults || {}; var f = o.raw ? d : c; var m = b.cookie.split("; "); for (var h = 0, g; (g = m[h] && m[h].split("=")) ; h++) { if (f(g.shift()) === k) { return f(g.join("=")) } } return null }; e.cookie.defaults = {} })(jq$, document);

// Browser detection
(function () {

    var matched, browser;

    // Use of jQuery.browser is frowned upon.
    // More details: http://api.jquery.com/jQuery.browser
    // jQuery.uaMatch maintained for back-compat
    jq$.uaMatch = function (ua) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };

    matched = jq$.uaMatch(navigator.userAgent);
    browser = {};

    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if (browser.chrome) {
        browser.webkit = true;
    } else if (browser.webkit) {
        browser.safari = true;
    }

    jq$.browser = browser;

    jq$.sub = function () {
        function jQuerySub(selector, context) {
            return new jQuerySub.fn.init(selector, context);
        }
        jq$.extend(true, jQuerySub, this);
        jQuerySub.superclass = this;
        jQuerySub.fn = jQuerySub.prototype = this();
        jQuerySub.fn.constructor = jQuerySub;
        jQuerySub.sub = this.sub;
        jQuerySub.fn.init = function init(selector, context) {
            if (context && context instanceof jq$ && !(context instanceof jQuerySub)) {
                context = jQuerySub(context);
            }

            return jq$.fn.init.call(this, selector, context, rootjQuerySub);
        };
        jQuerySub.fn.init.prototype = jQuerySub.fn;
        var rootjQuerySub = jQuerySub(document);
        return jQuerySub;
    };

})();