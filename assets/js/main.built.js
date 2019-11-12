! function() {
    function t(e, i, r) {
        function n(o, a) {
            if (!i[o]) {
                if (!e[o]) {
                    var l = "function" == typeof require && require;
                    if (!a && l) return l(o, !0);
                    if (s) return s(o, !0);
                    var c = new Error("Cannot find module '" + o + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var u = i[o] = {
                    exports: {}
                };
                e[o][0].call(u.exports, function(t) {
                    var i = e[o][1][t];
                    return n(i ? i : t)
                }, u, u.exports, t, e, i, r)
            }
            return i[o].exports
        }
        for (var s = "function" == typeof require && require, o = 0; o < r.length; o++) n(r[o]);
        return n
    }
    return t
}()({
    1: [function(t, e, i) {
        "use strict";
        var r = t("./helpers/TabManager"),
            n = t("./helpers/hideSiblingElements"),
            s = t("./helpers/showSiblingElements"),
            o = function(t, e) {
                e = e || {}, this._tabbables = null, this._excludeHidden = e.excludeHidden, this._firstTabbableElement = e.firstFocusElement, this._lastTabbableElement = null, this._relatedTarget = null, this.el = t, this._handleOnFocus = this._handleOnFocus.bind(this)
            },
            a = o.prototype;
        a.start = function() {
            this.updateTabbables(), n(this.el, null, this._excludeHidden), this._firstTabbableElement ? this.el.contains(document.activeElement) || this._firstTabbableElement.focus() : console.warn("this._firstTabbableElement is null, CircularTab needs at least one tabbable element."), this._relatedTarget = document.activeElement, document.addEventListener("focus", this._handleOnFocus, !0)
        }, a.stop = function() {
            s(this.el), document.removeEventListener("focus", this._handleOnFocus, !0)
        }, a.updateTabbables = function() {
            this._tabbables = r.getTabbableElements(this.el, this._excludeHidden), this._firstTabbableElement = this._firstTabbableElement || this._tabbables[0], this._lastTabbableElement = this._tabbables[this._tabbables.length - 1]
        }, a._handleOnFocus = function(t) {
            if (this.el.contains(t.target)) this._relatedTarget = t.target;
            else {
                if (t.preventDefault(), this.updateTabbables(), this._relatedTarget === this._lastTabbableElement || null === this._relatedTarget) return this._firstTabbableElement.focus(), void(this._relatedTarget = this._firstTabbableElement);
                if (this._relatedTarget === this._firstTabbableElement) return this._lastTabbableElement.focus(), void(this._relatedTarget = this._lastTabbableElement)
            }
        }, a.destroy = function() {
            this.stop(), this.el = null, this._tabbables = null, this._firstTabbableElement = null, this._lastTabbableElement = null, this._relatedTarget = null, this._handleOnFocus = null
        }, e.exports = o
    }, {
        "./helpers/TabManager": 2,
        "./helpers/hideSiblingElements": 4,
        "./helpers/showSiblingElements": 8
    }],
    2: [function(t, e, i) {
        "use strict";
        var r = t("./../maps/focusableElement"),
            n = function() {
                this.focusableSelectors = r.join(",")
            },
            s = n.prototype;
        s.isFocusableElement = function(t, e, i) {
            if (e && !this._isDisplayed(t)) return !1;
            var n = t.nodeName.toLowerCase(),
                s = r.indexOf(n) > -1;
            return "a" === n || (s ? !t.disabled : !t.contentEditable || (i = i || parseFloat(t.getAttribute("tabindex")), !isNaN(i)))
        }, s.isTabbableElement = function(t, e) {
            if (e && !this._isDisplayed(t)) return !1;
            var i = t.getAttribute("tabindex");
            return i = parseFloat(i), isNaN(i) ? this.isFocusableElement(t, e, i) : i >= 0
        }, s._isDisplayed = function(t) {
            var e = t.getBoundingClientRect();
            return (0 !== e.top || 0 !== e.left || 0 !== e.width || 0 !== e.height) && "hidden" !== window.getComputedStyle(t).visibility
        }, s.getTabbableElements = function(t, e) {
            for (var i = t.querySelectorAll(this.focusableSelectors), r = i.length, n = [], s = 0; s < r; s++) this.isTabbableElement(i[s], e) && n.push(i[s]);
            return n
        }, s.getFocusableElements = function(t, e) {
            for (var i = t.querySelectorAll(this.focusableSelectors), r = i.length, n = [], s = 0; s < r; s++) this.isFocusableElement(i[s], e) && n.push(i[s]);
            return n
        }, e.exports = new n
    }, {
        "./../maps/focusableElement": 10
    }],
    3: [function(t, e, i) {
        "use strict";
        var r = t("./setAttributes"),
            n = t("./../maps/ariaMap"),
            s = t("./TabManager"),
            o = "data-original-",
            a = "tabindex",
            l = function(t, e) {
                var i = t.getAttribute(o + e);
                i || (i = t.getAttribute(e) || "", r(t, o + e, i))
            };
        e.exports = function(t, e) {
            if (s.isFocusableElement(t, e)) l(t, a), r(t, a, -1);
            else
                for (var i = s.getTabbableElements(t, e), o = i.length; o--;) l(i[o], a), r(i[o], a, -1);
            l(t, n.HIDDEN), r(t, n.HIDDEN, !0)
        }
    }, {
        "./../maps/ariaMap": 9,
        "./TabManager": 2,
        "./setAttributes": 6
    }],
    4: [function(t, e, i) {
        "use strict";
        var r = t("./hide");
        e.exports = function n(t, e, i) {
            e = e || document.body;
            for (var s = t, o = t; s = s.previousElementSibling;) r(s, i);
            for (; o = o.nextElementSibling;) r(o, i);
            t.parentElement && t.parentElement !== e && n(t.parentElement)
        }
    }, {
        "./hide": 3
    }],
    5: [function(t, e, i) {
        "use strict";
        var r = function(t, e) {
                if ("string" == typeof e)
                    for (var i = e.split(/\s+/), r = 0; r < i.length; r++) t.getAttribute(i[r]) && t.removeAttribute(i[r])
            },
            n = function(t, e) {
                if (t.length)
                    for (var i = 0; i < t.length; i++) r(t[i], e);
                else r(t, e)
            };
        e.exports = n
    }, {}],
    6: [function(t, e, i) {
        "use strict";
        var r = function(t, e, i) {
                t && 1 === t.nodeType && t.setAttribute(e, i)
            },
            n = function(t, e, i) {
                if ("string" != typeof i && (i = i.toString()), t)
                    if (t.length)
                        for (var n = 0; n < t.length; n++) r(t[n], e, i);
                    else r(t, e, i)
            };
        e.exports = n
    }, {}],
    7: [function(t, e, i) {
        "use strict";
        var r = t("./removeAttributes"),
            n = t("./setAttributes"),
            s = t("./../maps/ariaMap"),
            o = "data-original-",
            a = "tabindex",
            l = function(t, e) {
                var i = t.getAttribute(o + e);
                "string" == typeof i && (i.length ? n(t, e, i) : r(t, e), r(t, o + e))
            };
        e.exports = function(t) {
            r(t, a + " " + s.HIDDEN), l(t, a), l(t, s.HIDDEN);
            for (var e = t.querySelectorAll("[" + o + a + "]"), i = e.length; i--;) l(e[i], a)
        }
    }, {
        "./../maps/ariaMap": 9,
        "./removeAttributes": 5,
        "./setAttributes": 6
    }],
    8: [function(t, e, i) {
        "use strict";
        var r = t("./show");
        e.exports = function n(t, e) {
            e = e || document.body;
            for (var i = t, s = t; i = i.previousElementSibling;) r(i);
            for (; s = s.nextElementSibling;) r(s);
            t.parentElement && t.parentElement !== e && n(t.parentElement)
        }
    }, {
        "./show": 7
    }],
    9: [function(t, e, i) {
        "use strict";
        e.exports = {
            AUTOCOMPLETE: "aria-autocomplete",
            CHECKED: "aria-checked",
            DISABLED: "aria-disabled",
            EXPANDED: "aria-expanded",
            HASPOPUP: "aria-haspopup",
            HIDDEN: "aria-hidden",
            INVALID: "aria-invalid",
            LABEL: "aria-label",
            LEVEL: "aria-level",
            MULTILINE: "aria-multiline",
            MULTISELECTABLE: "aria-multiselectable",
            ORIENTATION: "aria-orientation",
            PRESSED: "aria-pressed",
            READONLY: "aria-readonly",
            REQUIRED: "aria-required",
            SELECTED: "aria-selected",
            SORT: "aria-sort",
            VALUEMAX: "aria-valuemax",
            VALUEMIN: "aria-valuemin",
            VALUENOW: "aria-valuenow",
            VALUETEXT: "aria-valuetext",
            ATOMIC: "aria-atomic",
            BUSY: "aria-busy",
            LIVE: "aria-live",
            RELEVANT: "aria-relevant",
            DROPEFFECT: "aria-dropeffect",
            GRABBED: "aria-grabbed",
            ACTIVEDESCENDANT: "aria-activedescendant",
            CONTROLS: "aria-controls",
            DESCRIBEDBY: "aria-describedby",
            FLOWTO: "aria-flowto",
            LABELLEDBY: "aria-labelledby",
            OWNS: "aria-owns",
            POSINSET: "aria-posinset",
            SETSIZE: "aria-setsize"
        }
    }, {}],
    10: [function(t, e, i) {
        "use strict";
        e.exports = ["input", "select", "textarea", "button", "optgroup", "option", "menuitem", "fieldset", "object", "a[href]", "*[tabindex]", "*[contenteditable]"]
    }, {}],
    11: [function(t, e, i) {
        "use strict";
        var r = function() {
            function t(t) {
                for (var e = 0; e < l.length; e++) {
                    var r = i[e] + t;
                    if (void 0 !== a.style[r]) return r
                }
            }

            function e(t) {
                for (var e = 0; e < c.length; e++) {
                    var i = c[e] + t;
                    if (void 0 !== a.style[i]) return i
                }
            }
            var i = ["", "-webkit-", "-moz-", "-o-", "-ms-"],
                r = {
                    "animation-delay": "transitionend",
                    "-o-animation-delay": "oTransitionEnd",
                    "-moz-animation-delay": "transitionend",
                    "-webkit-animation-delay": "webkitTransitionEnd",
                    "-ms-animation-delay": "transitionend"
                },
                n = {
                    "animation-delay": "animationstart",
                    "-o-animation-delay": "oanimationstart",
                    "-moz-animation-delay": "animationstart",
                    "-webkit-animation-delay": "webkitAnimationStart",
                    "-ms-animation-delay": "MSAnimationStart"
                },
                s = {
                    "animation-delay": "animationiteration",
                    "-o-animation-delay": "oanimationiteration",
                    "-moz-animation-delay": "animationiteration",
                    "-webkit-animation-delay": "webkitAnimationIteration",
                    "-ms-animation-delay": "MSAnimationIteration"
                },
                o = {
                    "animation-delay": "animationend",
                    "-o-animation-delay": "oanimationend",
                    "-moz-animation-delay": "animationend",
                    "-webkit-animation-delay": "webkitAnimationEnd",
                    "-ms-animation-delay": "MSAnimationEnd"
                },
                a = document.createElement("_"),
                l = ["", "-webkit-", "-moz-", "-o-", "-ms-"],
                c = ["-webkit-", "", "-moz-", "-o-", "-ms-"];
            return {
                filter: e("filter"),
                transform: t("transform"),
                transformOrigin: t("transform-origin"),
                transition: t("transition"),
                transitionDelay: t("transition-delay"),
                transitionDuration: t("transition-duration"),
                transitionProperty: t("transition-property"),
                transitionTimingFunction: t("transition-timing-function"),
                transitionEnd: r[t("animation-delay")],
                animation: t("animation"),
                animationDelay: t("animation-delay"),
                animationDirection: t("animation-direction"),
                animationDuration: t("animation-duration"),
                animationFillMode: t("animation-fill-mode"),
                animationIterationCount: t("animation-iteration-count"),
                animationName: t("animation-name"),
                animationTimingFunction: t("animation-timing-function"),
                animationPlayState: t("animation-play-state"),
                animationStart: n[t("animation-delay")],
                animationIteration: s[t("animation-delay")],
                animationEnd: o[t("animation-delay")]
            }
        }();
        e.exports = r
    }, {}],
    12: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (this.el = t, this._options = n(u, e || {}), !c()) {
                this._isRightToLeft = "rtl" === s(this.el, "direction").direction, this._inlineStart = this._isRightToLeft ? "right" : "left", this._inlineEnd = this._isRightToLeft ? "left" : "right", this._scrollType = this._scrollDirection();
                var i = this._isRightToLeft ? this._options.rightPaddleSelector : this._options.leftPaddleSelector,
                    r = this._isRightToLeft ? this._options.leftPaddleSelector : this._options.rightPaddleSelector;
                this._wrapper = this.el.querySelector(this._options.itemsSelector), this._paddleStart = this.el.querySelector(i), this._paddleEnd = this.el.querySelector(r), this._children = o(this._wrapper), this._childCount = this._children.length, this._onScrollClipUpdate = this._onScrollClipUpdate.bind(this), this._onScrollClipComplete = this._onScrollClipComplete.bind(this), this._onPaddleStartClick = this._onPaddleStartClick.bind(this), this._paddleStart.addEventListener("click", this._onPaddleStartClick), this._onPaddleEndClick = this._onPaddleEndClick.bind(this), this._paddleEnd.addEventListener("click", this._onPaddleEndClick), this._onScroll = this._onScroll.bind(this), this._wrapper.addEventListener("scroll", this._onScroll), this._updateElementMetrics = this._updateElementMetrics.bind(this), window.addEventListener("resize", this._updateElementMetrics), window.addEventListener("orientationchange", this._updateElementMetrics), this._updateElementMetrics()
            }
        }
        var n = t("@marcom/ac-object/defaults"),
            s = t("@marcom/ac-dom-styles/getStyle"),
            o = t("@marcom/ac-dom-traversal/children"),
            a = t("@marcom/ac-dom-metrics/getPosition"),
            l = t("@marcom/ac-clip").Clip,
            c = t("@marcom/ac-feature/touchAvailable"),
            u = {
                itemsSelector: ".chapternav-items",
                leftPaddleSelector: ".chapternav-paddle-left",
                rightPaddleSelector: ".chapternav-paddle-right",
                scrollEasing: "ease-out",
                scrollDuration: .4
            },
            h = r.prototype;
        h._updateElementMetrics = function() {
            this._scrollStart = this._wrapper.scrollLeft, this._wrapperWidth = this._wrapper.offsetWidth, this._contentWidth = this._wrapper.scrollWidth, this._paddleWidth = this._paddleStart.offsetWidth, this._updatePaddleDisplay()
        }, h._onScroll = function() {
            this._lockPaddles || (this._scrollStart = this._wrapper.scrollLeft, this._updatePaddleDisplay())
        }, h._updatePaddleDisplay = function() {
            var t = this._getNormalizedScroll(this._scrollStart) + this._wrapperWidth,
                e = 1;
            this._paddleStart.disabled = this._getNormalizedScroll(this._scrollStart) <= e, this._paddleEnd.disabled = t >= this._contentWidth - e
        }, h._onPaddleStartClick = function(t) {
            this._smoothScrollTo(this._getPaddleStartScrollDestination())
        }, h._getPaddleStartScrollDestination = function() {
            var t, e, i = this._getNormalizedScroll(this._scrollStart);
            for (e = this._childCount - 1; e > 0; e--)
                if (t = this._normalizePosition(a(this._children[e])), t[this._inlineStart] < i) return t[this._inlineEnd] - this._wrapperWidth;
            return 0
        }, h._onPaddleEndClick = function(t) {
            this._smoothScrollTo(this._getPaddleEndScrollDestination())
        }, h._getPaddleEndScrollDestination = function() {
            var t, e, i = this._getNormalizedScroll(this._scrollStart) + this._wrapperWidth;
            for (e = 0; e < this._childCount; e++)
                if (t = this._normalizePosition(a(this._children[e])), t[this._inlineEnd] > i) return t[this._inlineStart];
            return this._contentWidth
        }, h._getBoundedScrollX = function(t) {
            var e = this._contentWidth - this._wrapperWidth;
            return Math.max(Math.min(t, e), 0)
        }, h._smoothScrollTo = function(t) {
            if (this._updateElementMetrics(), !this._lockPaddles && t !== this._scrollStart) {
                this._lockPaddles = !0;
                var e = {
                        scrollLeft: this._wrapper.scrollLeft
                    },
                    i = {
                        scrollLeft: this._setNormalizedScroll(this._getBoundedScrollX(t))
                    },
                    r = {
                        ease: this._options.scrollEasing,
                        onUpdate: this._onScrollClipUpdate,
                        onComplete: this._onScrollClipComplete
                    };
                l.to(e, this._options.scrollDuration, i, r)
            }
        }, h._onScrollClipUpdate = function(t) {
            this._scrollStart = this._wrapper.scrollLeft = Math.round(t.target().scrollLeft)
        }, h._onScrollClipComplete = function() {
            this._updatePaddleDisplay(), this._lockPaddles = !1
        }, h._scrollDirection = function() {
            var t = "reverse",
                e = document.createElement("div");
            return e.style.cssText = "width:2px; height:1px; position:absolute; top:-1000px; overflow:scroll; font-size: 14px;", e.style.direction = "rtl", e.innerHTML = "test", document.body.appendChild(e), e.scrollLeft > 0 ? t = "default" : (e.scrollLeft = 1, 0 === e.scrollLeft && (t = "negative")), document.body.removeChild(e), t
        }, h._getNormalizedScroll = function(t) {
            if (!this._isRightToLeft) return t;
            var e = Math.abs(t);
            return "default" === this._scrollType && (e = this._contentWidth - this._wrapperWidth - e), e
        }, h._setNormalizedScroll = function(t) {
            return this._isRightToLeft && "reverse" !== this._scrollType ? "negative" === this._scrollType ? -t : -(t - this._contentWidth + this._wrapperWidth) : t
        }, h._normalizePosition = function(t) {
            return this._isRightToLeft ? {
                top: t.top,
                right: this._wrapperWidth - t.right + this._paddleWidth,
                bottom: t.bottom,
                left: this._wrapperWidth - t.left + this._paddleWidth
            } : {
                top: t.top,
                right: t.right - this._paddleWidth,
                bottom: t.bottom,
                left: t.left - this._paddleWidth
            }
        }, e.exports = r
    }, {
        "@marcom/ac-clip": 19,
        "@marcom/ac-dom-metrics/getPosition": 59,
        "@marcom/ac-dom-styles/getStyle": 76,
        "@marcom/ac-dom-traversal/children": 80,
        "@marcom/ac-feature/touchAvailable": 125,
        "@marcom/ac-object/defaults": 170
    }],
    13: [function(t, e, i) {
        "use strict";
        t("@marcom/ac-polyfills/Array/prototype.slice"), t("@marcom/ac-polyfills/Element/prototype.classList");
        var r = t("./className/add");
        e.exports = function() {
            var t, e = Array.prototype.slice.call(arguments),
                i = e.shift(e);
            if (i.classList && i.classList.add) return void i.classList.add.apply(i.classList, e);
            for (t = 0; t < e.length; t++) r(i, e[t])
        }
    }, {
        "./className/add": 14,
        "@marcom/ac-polyfills/Array/prototype.slice": void 0,
        "@marcom/ac-polyfills/Element/prototype.classList": void 0
    }],
    14: [function(t, e, i) {
        "use strict";
        var r = t("./contains");
        e.exports = function(t, e) {
            r(t, e) || (t.className += " " + e)
        }
    }, {
        "./contains": 15
    }],
    15: [function(t, e, i) {
        "use strict";
        var r = t("./getTokenRegExp");
        e.exports = function(t, e) {
            return r(e).test(t.className)
        }
    }, {
        "./getTokenRegExp": 16
    }],
    16: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return new RegExp("(\\s|^)" + t + "(\\s|$)")
        }
    }, {}],
    17: [function(t, e, i) {
        "use strict";
        var r = t("./contains"),
            n = t("./getTokenRegExp");
        e.exports = function(t, e) {
            r(t, e) && (t.className = t.className.replace(n(e), "$1").trim())
        }
    }, {
        "./contains": 15,
        "./getTokenRegExp": 16
    }],
    18: [function(t, e, i) {
        "use strict";
        t("@marcom/ac-polyfills/Array/prototype.slice"), t("@marcom/ac-polyfills/Element/prototype.classList");
        var r = t("./className/remove");
        e.exports = function() {
            var t, e = Array.prototype.slice.call(arguments),
                i = e.shift(e);
            if (i.classList && i.classList.remove) return void i.classList.remove.apply(i.classList, e);
            for (t = 0; t < e.length; t++) r(i, e[t])
        }
    }, {
        "./className/remove": 17,
        "@marcom/ac-polyfills/Array/prototype.slice": void 0,
        "@marcom/ac-polyfills/Element/prototype.classList": void 0
    }],
    19: [function(t, e, i) {
        "use strict";
        e.exports = {
            Clip: t("./ac-clip/Clip")
        }
    }, {
        "./ac-clip/Clip": 20
    }],
    20: [function(t, e, i) {
        "use strict";

        function r(t, e, i, n) {
            n = n || {}, this._options = n, this._isYoyo = n.yoyo, this._direction = 1, this._timeScale = 1, this._loop = n.loop || 0, this._loopCount = 0, this._target = t, this.duration(e), this._delay = 1e3 * (n.delay || 0), this._remainingDelay = this._delay, this._progress = 0, this._clock = n.clock || a, this._playing = !1, this._getTime = Date.now || function() {
                return (new Date).getTime()
            }, this._propsTo = i || {}, this._propsFrom = n.propsFrom || {}, this._onStart = n.onStart || null, this._onUpdate = n.onUpdate || null, this._onDraw = n.onDraw || null, this._onComplete = n.onComplete || null;
            var s = n.ease || u;
            this._ease = "function" == typeof s ? new l(s) : o(s), this._start = this._start.bind(this), this._update = this._update.bind(this), this._draw = this._draw.bind(this), this._isPrepared = !1, r._add(this), c.call(this)
        }
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        t("@marcom/ac-polyfills/Array/isArray");
        var s = t("@marcom/ac-object/create"),
            o = t("@marcom/ac-easing").createPredefined,
            a = t("@marcom/ac-clock"),
            l = t("@marcom/ac-easing").Ease,
            c = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            u = "ease",
            h = r.prototype = s(c.prototype);
        r.COMPLETE = "complete", r.PAUSE = "pause", r.PLAY = "play", h.play = function() {
            return this._playing || (this._playing = !0, 0 === this._delay || 0 === this._remainingDelay ? this._start() : (this._isPrepared || (this._setDiff(), this._updateProps()), this._startTimeout = setTimeout(this._start, this._remainingDelay / this._timeScale), this._delayStart = this._getTime())), this
        }, h.pause = function() {
            return this._playing && (this._startTimeout && (this._remainingDelay = this._getTime() - this._delayStart, clearTimeout(this._startTimeout)), this._stop(), this.trigger(r.PAUSE, this)), this
        }, h.destroy = function() {
            return this.pause(), this._options = null, this._target = null, this._storeTarget = null, this._ease = null, this._clock = null, this._propsTo = null, this._propsFrom = null, this._storePropsTo = null, this._storePropsFrom = null, this._propsDiff = null, this._propsEase = null, this._onStart = null, this._onUpdate = null, this._onDraw = null, this._onComplete = null, r._remove(this), c.prototype.destroy.call(this), this
        }, h.reset = function() {
            if (this._isPrepared) return this._stop(), this._resetLoop(this._target, this._storeTarget), this._direction = 1, this._loop = this._options.loop || 0, this._loopCount = 0, this._propsFrom = this._storePropsFrom, this._propsTo = this._storePropsTo, this._progress = 0, this._setStartTime(), this._onUpdate && this._onUpdate.call(this, this), this._onDraw && this._onDraw.call(this, this), this
        }, h.playing = function() {
            return this._playing
        }, h.target = function() {
            return this._target
        }, h.duration = function(t) {
            return void 0 !== t && (this._duration = t, this._durationMs = 1e3 * t / this._timeScale, this._playing && this._setStartTime()), this._duration
        }, h.timeScale = function(t) {
            return void 0 !== t && (this._timeScale = t, this.duration(this._duration)), this._timeScale
        }, h.currentTime = function(t) {
            return void 0 !== t ? this.progress(t / this._duration) * this._duration : this.progress() * this._duration
        }, h.progress = function(t) {
            return void 0 !== t && (this._progress = Math.min(1, Math.max(0, t)), this._setStartTime(), this._isPrepared || this._setDiff(), this._playing && 1 === t ? (this._completeProps(), this._onUpdate && this._onUpdate.call(this, this), this._onDraw && this._onDraw.call(this, this), this._complete()) : (this._updateProps(), this._onUpdate && this._onUpdate.call(this, this), this._onDraw && this._onDraw.call(this, this))), this._progress
        }, h._resetLoop = function(t, e) {
            var i;
            for (i in e) e.hasOwnProperty(i) && null !== e[i] && ("object" === n(e[i]) ? this._resetLoop(t[i], e[i]) : t[i] = e[i])
        }, h._cloneObjects = function() {
            var t = {},
                e = {},
                i = {};
            return this._cloneObjectsLoop(this._target, this._propsTo, this._propsFrom, t, e, i), {
                target: t,
                propsTo: e,
                propsFrom: i
            }
        }, h._cloneObjectsLoop = function(t, e, i, r, s, o) {
            var a, l;
            for (l in i) i.hasOwnProperty(l) && void 0 === e[l] && void 0 !== t[l] && (r[l] = t[l], s[l] = t[l], o[l] = i[l]);
            for (l in e) t.hasOwnProperty(l) && (a = n(t[l]), null !== t[l] && "object" === a ? (Array.isArray(t[l]) ? (r[l] = [], s[l] = [], o[l] = []) : (r[l] = {}, s[l] = {}, o[l] = {}), this._cloneObjectsLoop(t[l], e[l] || {}, i[l] || {}, r[l], s[l], o[l])) : null !== e[l] && "number" === a && (r[l] = t[l], s[l] = e[l], i && void 0 !== i[l] && (o[l] = i[l])))
        }, h._prepareProperties = function() {
            if (!this._isPrepared) {
                var t = this._cloneObjects();
                this._storeTarget = t.target, this._propsTo = t.propsTo, this._storePropsTo = this._propsTo, this._propsFrom = t.propsFrom, this._storePropsFrom = this._propsFrom, this._isPrepared = !0
            }
        }, h._setStartTime = function() {
            this._startTime = this._getTime() - this.progress() * this._durationMs
        }, h._setDiff = function() {
            this._isPrepared || this._prepareProperties(), this._propsDiff = {}, this._setDiffLoop(this._propsTo, this._propsFrom, this._target, this._propsDiff)
        }, h._setDiffLoop = function(t, e, i, r) {
            var s, o;
            for (o in t) t.hasOwnProperty(o) && (s = n(t[o]), null !== t[o] && "object" === s ? (e[o] = e[o] || {}, r[o] = r[o] || {}, this._setDiffLoop(t[o], e[o], i[o], r[o])) : "number" === s && void 0 !== i[o] ? (void 0 !== e[o] ? i[o] = e[o] : e[o] = i[o], r[o] = t[o] - i[o]) : (t[o] = null, e[o] = null))
        }, h._start = function() {
            this._startTimeout = null, this._remainingDelay = 0, this._setStartTime(), this._clock.on("update", this._update), this._clock.on("draw", this._draw), this._clock.isRunning() || this._clock.start(), this._setDiff(), this._playing = !0, this._running = !0, this._onStart && this._onStart.call(this, this), this.trigger(r.PLAY, this)
        }, h._stop = function() {
            this._playing = !1, this._running = !1, this._clock.off("update", this._update), this._clock.off("draw", this._draw)
        }, h._updateProps = function() {
            var t;
            t = 1 === this._direction ? this._ease.getValue(this._progress) : 1 - this._ease.getValue(1 - this._progress), this._updatePropsLoop(this._propsTo, this._propsFrom, this._target, this._propsDiff, t)
        }, h._updatePropsLoop = function(t, e, i, r, n) {
            var s;
            for (s in t) t.hasOwnProperty(s) && null !== t[s] && ("number" != typeof t[s] ? this._updatePropsLoop(t[s], e[s], i[s], r[s], n) : i[s] = e[s] + r[s] * n)
        }, h._completeProps = function() {
            this._completePropsLoop(this._propsTo, this._target)
        }, h._completePropsLoop = function(t, e) {
            var i;
            for (i in t) t.hasOwnProperty(i) && null !== t[i] && ("number" != typeof t[i] ? this._completePropsLoop(t[i], e[i]) : e[i] = t[i])
        }, h._complete = function() {
            this._isYoyo && (this._loop > 0 && this._loopCount <= this._loop || 0 === this._loop && 0 === this._loopCount) ? (this._propsFrom = 1 === this._direction ? this._storePropsTo : this._storePropsFrom, this._propsTo = 1 === this._direction ? this._storePropsFrom : this._storePropsTo, this._direction *= -1, this._direction === -1 && ++this._loopCount, this.progress(0), this._start()) : this._loopCount < this._loop ? (++this._loopCount, this.progress(0), this._start()) : (this.trigger(r.COMPLETE, this), this._onComplete && this._onComplete.call(this, this), this._options && this._options.destroyOnComplete && this.destroy())
        }, h._update = function(t) {
            this._running && (this._progress = (t.timeNow - this._startTime) / this._durationMs, this._progress >= 1 ? (this._progress = 1, this._running = !1, this._completeProps()) : this._updateProps(), this._onUpdate && this._onUpdate.call(this, this))
        }, h._draw = function(t) {
            this._onDraw && this._onDraw.call(this, this), this._running || (this._stop(), 1 === this._progress && this._complete())
        }, r._instantiate = function() {
            return this._clips = [], this
        }, r._add = function(t) {
            this._clips.push(t)
        }, r._remove = function(t) {
            var e = this._clips.indexOf(t);
            e > -1 && this._clips.splice(e, 1)
        }, r.getAll = function(t) {
            if (void 0 !== t) {
                for (var e = [], i = this._clips.length; i--;) this._clips[i].target() === t && e.push(this._clips[i]);
                return e
            }
            return Array.prototype.slice.call(this._clips)
        }, r.destroyAll = function(t) {
            var e = this.getAll(t);
            this._clips.length === e.length && (this._clips = []);
            for (var i = e.length; i--;) e[i].destroy();
            return e
        }, r.to = function(t, e, i, n) {
            return n = n || {}, void 0 === n.destroyOnComplete && (n.destroyOnComplete = !0), new r(t, e, i, n).play()
        }, r.from = function(t, e, i, n) {
            return n = n || {}, n.propsFrom = i, void 0 === n.destroyOnComplete && (n.destroyOnComplete = !0), new r(t, e, n.propsTo, n).play()
        }, e.exports = r._instantiate()
    }, {
        "@marcom/ac-clock": 21,
        "@marcom/ac-easing": 88,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-object/create": 169,
        "@marcom/ac-polyfills/Array/isArray": void 0
    }],
    21: [function(t, e, i) {
        "use strict";
        var r = t("./ac-clock/Clock"),
            n = t("./ac-clock/ThrottledClock"),
            s = t("./ac-clock/sharedClockInstance");
        s.Clock = r, s.ThrottledClock = n, e.exports = s
    }, {
        "./ac-clock/Clock": 22,
        "./ac-clock/ThrottledClock": 23,
        "./ac-clock/sharedClockInstance": 24
    }],
    22: [function(t, e, i) {
        "use strict";

        function r() {
            s.call(this), this.lastFrameTime = null, this._animationFrame = null, this._active = !1, this._startTime = null, this._boundOnAnimationFrame = this._onAnimationFrame.bind(this), this._getTime = Date.now || function() {
                return (new Date).getTime()
            }
        }
        t("@marcom/ac-polyfills/Function/prototype.bind"), t("@marcom/ac-polyfills/requestAnimationFrame");
        var n, s = t("@marcom/ac-event-emitter-micro").EventEmitterMicro;
        (new Date).getTime();
        n = r.prototype = new s(null), n.start = function() {
            this._active || this._tick()
        }, n.stop = function() {
            this._active && window.cancelAnimationFrame(this._animationFrame), this._animationFrame = null, this.lastFrameTime = null, this._active = !1
        }, n.destroy = function() {
            this.stop(), this.off();
            var t;
            for (t in this) this.hasOwnProperty(t) && (this[t] = null)
        }, n.isRunning = function() {
            return this._active
        }, n._tick = function() {
            this._active || (this._active = !0), this._animationFrame = window.requestAnimationFrame(this._boundOnAnimationFrame)
        }, n._onAnimationFrame = function(t) {
            null === this.lastFrameTime && (this.lastFrameTime = t);
            var e = t - this.lastFrameTime,
                i = 0;
            if (e >= 1e3 && (e = 0), 0 !== e && (i = 1e3 / e), this._firstFrame === !0 && (e = 0, this._firstFrame = !1), 0 === i) this._firstFrame = !0;
            else {
                var r = {
                    time: t,
                    delta: e,
                    fps: i,
                    naturalFps: i,
                    timeNow: this._getTime()
                };
                this.trigger("update", r), this.trigger("draw", r)
            }
            this._animationFrame = null, this.lastFrameTime = t, this._active !== !1 ? this._tick() : this.lastFrameTime = null
        }, e.exports = r
    }, {
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-polyfills/Function/prototype.bind": void 0,
        "@marcom/ac-polyfills/requestAnimationFrame": void 0
    }],
    23: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            null !== t && (o.call(this), e = e || {}, this._fps = t || null, this._clock = e.clock || s, this._lastThrottledTime = null, this._clockEvent = null, this._boundOnClockDraw = this._onClockDraw.bind(this), this._boundOnClockUpdate = this._onClockUpdate.bind(this), this._clock.on("update", this._boundOnClockUpdate))
        }
        t("@marcom/ac-polyfills/requestAnimationFrame");
        var n, s = t("./sharedClockInstance"),
            o = t("@marcom/ac-event-emitter-micro").EventEmitterMicro;
        n = r.prototype = new o(null), n.setFps = function(t) {
            return this._fps = t, this
        }, n.getFps = function() {
            return this._fps
        }, n.start = function() {
            return this._clock.start(), this
        }, n.stop = function() {
            return this._clock.stop(), this
        }, n.isRunning = function() {
            return this._clock.isRunning()
        }, n.destroy = function() {
            this._clock.off("update", this._boundOnClockUpdate), this._clock.destroy.call(this)
        }, n._onClockUpdate = function(t) {
            null === this._lastThrottledTime && (this._lastThrottledTime = this._clock.lastFrameTime);
            var e = t.time - this._lastThrottledTime;
            if (!this._fps) throw new TypeError("FPS is not defined.");
            Math.ceil(1e3 / e) >= this._fps + 2 || (this._clockEvent = t, this._clockEvent.delta = e, this._clockEvent.fps = 1e3 / e, this._lastThrottledTime = this._clockEvent.time, this._clock.once("draw", this._boundOnClockDraw), this.trigger("update", this._clockEvent))
        }, n._onClockDraw = function() {
            this.trigger("draw", this._clockEvent)
        }, e.exports = r
    }, {
        "./sharedClockInstance": 24,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-polyfills/requestAnimationFrame": void 0
    }],
    24: [function(t, e, i) {
        "use strict";
        var r = t("./Clock");
        e.exports = new r
    }, {
        "./Clock": 22
    }],
    25: [function(t, e, i) {
        "use strict";
        var r = t("./ac-color/Color");
        r.decimalToHex = t("./ac-color/static/decimalToHex"), r.hexToDecimal = t("./ac-color/static/hexToDecimal"), r.hexToRgb = t("./ac-color/static/hexToRgb"), r.isColor = t("./ac-color/static/isColor"), r.isHex = t("./ac-color/static/isHex"), r.isRgb = t("./ac-color/static/isRgb"), r.isRgba = t("./ac-color/static/isRgba"), r.mixColors = t("./ac-color/static/mixColors"), r.rgbaToArray = t("./ac-color/static/rgbaToArray"), r.rgbToArray = t("./ac-color/static/rgbToArray"), r.rgbToDecimal = t("./ac-color/static/rgbToDecimal"), r.rgbToHex = t("./ac-color/static/rgbToHex"), r.rgbToHsl = t("./ac-color/static/rgbToHsl"), r.rgbToHsv = t("./ac-color/static/rgbToHsv"), r.rgbaToObject = t("./ac-color/static/rgbaToObject"), r.rgbToObject = t("./ac-color/static/rgbToObject"), r.shortToLongHex = t("./ac-color/static/shortToLongHex"), e.exports = {
            Color: r
        }
    }, {
        "./ac-color/Color": 26,
        "./ac-color/static/decimalToHex": 28,
        "./ac-color/static/hexToDecimal": 29,
        "./ac-color/static/hexToRgb": 30,
        "./ac-color/static/isColor": 31,
        "./ac-color/static/isHex": 32,
        "./ac-color/static/isRgb": 33,
        "./ac-color/static/isRgba": 34,
        "./ac-color/static/mixColors": 35,
        "./ac-color/static/rgbToArray": 36,
        "./ac-color/static/rgbToDecimal": 37,
        "./ac-color/static/rgbToHex": 38,
        "./ac-color/static/rgbToHsl": 39,
        "./ac-color/static/rgbToHsv": 40,
        "./ac-color/static/rgbToObject": 41,
        "./ac-color/static/rgbaToArray": 42,
        "./ac-color/static/rgbaToObject": 43,
        "./ac-color/static/shortToLongHex": 44
    }],
    26: [function(t, e, i) {
        "use strict";

        function r(t) {
            if (!o(t) && !n.nameToRgbObject[t]) throw new Error(t + " is not a supported color.");
            this._setColor(t)
        }
        var n = t("./helpers/cssColorNames"),
            s = t("./static/hexToRgb"),
            o = t("./static/isColor"),
            a = t("./static/isHex"),
            l = t("./static/isRgba"),
            c = t("./static/mixColors"),
            u = t("./static/rgbaToArray"),
            h = t("./static/rgbToArray"),
            m = t("./static/rgbToDecimal"),
            d = t("./static/rgbToHex"),
            p = t("./static/rgbaToObject"),
            f = t("./static/rgbToObject"),
            _ = t("./static/shortToLongHex"),
            g = r.prototype;
        g._setColor = function(t) {
            if (this._color = {}, a(t)) this._color.hex = _(t), this._color.rgb = {
                color: s(t)
            };
            else if (l(t)) {
                this._color.rgba = {
                    color: t
                };
                var e = this.rgbaObject();
                this._color.rgb = {
                    color: "rgb(" + e.r + ", " + e.g + ", " + e.b + ")"
                }
            } else if (n.nameToRgbObject[t]) {
                var i = n.nameToRgbObject[t];
                this._color.rgb = {
                    object: i,
                    color: "rgb(" + i.r + ", " + i.g + ", " + i.b + ")"
                }
            } else this._color.rgb = {
                color: t
            }
        }, g.rgb = function() {
            return this._color.rgb.color
        }, g.rgba = function() {
            if (void 0 === this._color.rgba) {
                var t = this.rgbObject();
                this._color.rgba = {
                    color: "rgba(" + t.r + ", " + t.g + ", " + t.b + ", 1)"
                }
            }
            return this._color.rgba.color
        }, g.hex = function() {
            return void 0 === this._color.hex && (this._color.hex = d.apply(this, this.rgbArray())), this._color.hex
        }, g.decimal = function() {
            return void 0 === this._color.decimal && (this._color.decimal = m(this.rgb())), this._color.decimal
        }, g.cssName = function() {
            return n.rgbToName[this.rgb()] || null
        }, g.rgbArray = function() {
            return void 0 === this._color.rgb.array && (this._color.rgb.array = h(this.rgb())), this._color.rgb.array
        }, g.rgbaArray = function() {
            return void 0 === this._color.rgba && this.rgba(), void 0 === this._color.rgba.array && (this._color.rgba.array = u(this.rgba())), this._color.rgba.array
        }, g.rgbObject = function() {
            return void 0 === this._color.rgb.object && (this._color.rgb.object = f(this.rgb())), this._color.rgb.object
        }, g.rgbaObject = function() {
            return void 0 === this._color.rgba && this.rgba(), void 0 === this._color.rgba.object && (this._color.rgba.object = p(this.rgba())), this._color.rgba.object
        }, g.getRed = function() {
            return this.rgbObject().r
        }, g.getGreen = function() {
            return this.rgbObject().g
        }, g.getBlue = function() {
            return this.rgbObject().b
        }, g.getAlpha = function() {
            return void 0 === this._color.rgba ? 1 : this.rgbaObject().a
        }, g.setRed = function(t) {
            return t !== this.getRed() && this._setColor("rgba(" + t + ", " + this.getGreen() + ", " + this.getBlue() + ", " + this.getAlpha() + ")"), this.rgbObject().r
        }, g.setGreen = function(t) {
            return t !== this.getGreen() && this._setColor("rgba(" + this.getRed() + ", " + t + ", " + this.getBlue() + ", " + this.getAlpha() + ")"), this.rgbObject().g
        }, g.setBlue = function(t) {
            return t !== this.getBlue() && this._setColor("rgba(" + this.getRed() + ", " + this.getGreen() + ", " + t + ", " + this.getAlpha() + ")"), this.rgbObject().b
        }, g.setAlpha = function(t) {
            return t !== this.getAlpha() && this._setColor("rgba(" + this.getRed() + ", " + this.getGreen() + ", " + this.getBlue() + ", " + t + ")"), this.rgbaObject().a
        }, g.mix = function(t, e) {
            var i = f(c(this.rgb(), t, e));
            return this._setColor("rgba(" + i.r + ", " + i.g + ", " + i.b + ", " + this.getAlpha() + ")"), this.rgb()
        }, g.clone = function() {
            return new r(this.rgb())
        }, e.exports = r
    }, {
        "./helpers/cssColorNames": 27,
        "./static/hexToRgb": 30,
        "./static/isColor": 31,
        "./static/isHex": 32,
        "./static/isRgba": 34,
        "./static/mixColors": 35,
        "./static/rgbToArray": 36,
        "./static/rgbToDecimal": 37,
        "./static/rgbToHex": 38,
        "./static/rgbToObject": 41,
        "./static/rgbaToArray": 42,
        "./static/rgbaToObject": 43,
        "./static/shortToLongHex": 44
    }],
    27: [function(t, e, i) {
        "use strict";
        var r = {
                "rgb(240, 248, 255)": "aliceblue",
                "rgb(250, 235, 215)": "antiquewhite",
                "rgb(0, 0, 0)": "black",
                "rgb(0, 0, 255)": "blue",
                "rgb(0, 255, 255)": "cyan",
                "rgb(0, 0, 139)": "darkblue",
                "rgb(0, 139, 139)": "darkcyan",
                "rgb(0, 100, 0)": "darkgreen",
                "rgb(0, 206, 209)": "darkturquoise",
                "rgb(0, 191, 255)": "deepskyblue",
                "rgb(0, 128, 0)": "green",
                "rgb(0, 255, 0)": "lime",
                "rgb(0, 0, 205)": "mediumblue",
                "rgb(0, 250, 154)": "mediumspringgreen",
                "rgb(0, 0, 128)": "navy",
                "rgb(0, 255, 127)": "springgreen",
                "rgb(0, 128, 128)": "teal",
                "rgb(25, 25, 112)": "midnightblue",
                "rgb(30, 144, 255)": "dodgerblue",
                "rgb(32, 178, 170)": "lightseagreen",
                "rgb(34, 139, 34)": "forestgreen",
                "rgb(46, 139, 87)": "seagreen",
                "rgb(47, 79, 79)": "darkslategray",
                "rgb(50, 205, 50)": "limegreen",
                "rgb(60, 179, 113)": "mediumseagreen",
                "rgb(64, 224, 208)": "turquoise",
                "rgb(65, 105, 225)": "royalblue",
                "rgb(70, 130, 180)": "steelblue",
                "rgb(72, 61, 139)": "darkslateblue",
                "rgb(72, 209, 204)": "mediumturquoise",
                "rgb(75, 0, 130)": "indigo",
                "rgb(85, 107, 47)": "darkolivegreen",
                "rgb(95, 158, 160)": "cadetblue",
                "rgb(100, 149, 237)": "cornflowerblue",
                "rgb(102, 205, 170)": "mediumaquamarine",
                "rgb(105, 105, 105)": "dimgray",
                "rgb(106, 90, 205)": "slateblue",
                "rgb(107, 142, 35)": "olivedrab",
                "rgb(112, 128, 144)": "slategray",
                "rgb(119, 136, 153)": "lightslategray",
                "rgb(123, 104, 238)": "mediumslateblue",
                "rgb(124, 252, 0)": "lawngreen",
                "rgb(127, 255, 212)": "aquamarine",
                "rgb(127, 255, 0)": "chartreuse",
                "rgb(128, 128, 128)": "gray",
                "rgb(128, 0, 0)": "maroon",
                "rgb(128, 128, 0)": "olive",
                "rgb(128, 0, 128)": "purple",
                "rgb(135, 206, 250)": "lightskyblue",
                "rgb(135, 206, 235)": "skyblue",
                "rgb(138, 43, 226)": "blueviolet",
                "rgb(139, 0, 139)": "darkmagenta",
                "rgb(139, 0, 0)": "darkred",
                "rgb(139, 69, 19)": "saddlebrown",
                "rgb(143, 188, 143)": "darkseagreen",
                "rgb(144, 238, 144)": "lightgreen",
                "rgb(147, 112, 219)": "mediumpurple",
                "rgb(148, 0, 211)": "darkviolet",
                "rgb(152, 251, 152)": "palegreen",
                "rgb(153, 50, 204)": "darkorchid",
                "rgb(154, 205, 50)": "yellowgreen",
                "rgb(160, 82, 45)": "sienna",
                "rgb(165, 42, 42)": "brown",
                "rgb(169, 169, 169)": "darkgray",
                "rgb(173, 255, 47)": "greenyellow",
                "rgb(173, 216, 230)": "lightblue",
                "rgb(175, 238, 238)": "paleturquoise",
                "rgb(176, 196, 222)": "lightsteelblue",
                "rgb(176, 224, 230)": "powderblue",
                "rgb(178, 34, 34)": "firebrick",
                "rgb(184, 134, 11)": "darkgoldenrod",
                "rgb(186, 85, 211)": "mediumorchid",
                "rgb(188, 143, 143)": "rosybrown",
                "rgb(189, 183, 107)": "darkkhaki",
                "rgb(192, 192, 192)": "silver",
                "rgb(199, 21, 133)": "mediumvioletred",
                "rgb(205, 92, 92)": "indianred",
                "rgb(205, 133, 63)": "peru",
                "rgb(210, 105, 30)": "chocolate",
                "rgb(210, 180, 140)": "tan",
                "rgb(211, 211, 211)": "lightgray",
                "rgb(216, 191, 216)": "thistle",
                "rgb(218, 165, 32)": "goldenrod",
                "rgb(218, 112, 214)": "orchid",
                "rgb(219, 112, 147)": "palevioletred",
                "rgb(220, 20, 60)": "crimson",
                "rgb(220, 220, 220)": "gainsboro",
                "rgb(221, 160, 221)": "plum",
                "rgb(222, 184, 135)": "burlywood",
                "rgb(224, 255, 255)": "lightcyan",
                "rgb(230, 230, 250)": "lavender",
                "rgb(233, 150, 122)": "darksalmon",
                "rgb(238, 232, 170)": "palegoldenrod",
                "rgb(238, 130, 238)": "violet",
                "rgb(240, 255, 255)": "azure",
                "rgb(240, 255, 240)": "honeydew",
                "rgb(240, 230, 140)": "khaki",
                "rgb(240, 128, 128)": "lightcoral",
                "rgb(244, 164, 96)": "sandybrown",
                "rgb(245, 245, 220)": "beige",
                "rgb(245, 255, 250)": "mintcream",
                "rgb(245, 222, 179)": "wheat",
                "rgb(245, 245, 245)": "whitesmoke",
                "rgb(248, 248, 255)": "ghostwhite",
                "rgb(250, 250, 210)": "lightgoldenrodyellow",
                "rgb(250, 240, 230)": "linen",
                "rgb(250, 128, 114)": "salmon",
                "rgb(253, 245, 230)": "oldlace",
                "rgb(255, 228, 196)": "bisque",
                "rgb(255, 235, 205)": "blanchedalmond",
                "rgb(255, 127, 80)": "coral",
                "rgb(255, 248, 220)": "cornsilk",
                "rgb(255, 140, 0)": "darkorange",
                "rgb(255, 20, 147)": "deeppink",
                "rgb(255, 250, 240)": "floralwhite",
                "rgb(255, 215, 0)": "gold",
                "rgb(255, 105, 180)": "hotpink",
                "rgb(255, 255, 240)": "ivory",
                "rgb(255, 240, 245)": "lavenderblush",
                "rgb(255, 250, 205)": "lemonchiffon",
                "rgb(255, 182, 193)": "lightpink",
                "rgb(255, 160, 122)": "lightsalmon",
                "rgb(255, 255, 224)": "lightyellow",
                "rgb(255, 0, 255)": "magenta",
                "rgb(255, 228, 225)": "mistyrose",
                "rgb(255, 228, 181)": "moccasin",
                "rgb(255, 222, 173)": "navajowhite",
                "rgb(255, 165, 0)": "orange",
                "rgb(255, 69, 0)": "orangered",
                "rgb(255, 239, 213)": "papayawhip",
                "rgb(255, 218, 185)": "peachpuff",
                "rgb(255, 192, 203)": "pink",
                "rgb(255, 0, 0)": "red",
                "rgb(255, 245, 238)": "seashell",
                "rgb(255, 250, 250)": "snow",
                "rgb(255, 99, 71)": "tomato",
                "rgb(255, 255, 255)": "white",
                "rgb(255, 255, 0)": "yellow",
                "rgb(102, 51, 153)": "rebeccapurple"
            },
            n = {
                aqua: {
                    r: 0,
                    g: 255,
                    b: 255
                },
                aliceblue: {
                    r: 240,
                    g: 248,
                    b: 255
                },
                antiquewhite: {
                    r: 250,
                    g: 235,
                    b: 215
                },
                black: {
                    r: 0,
                    g: 0,
                    b: 0
                },
                blue: {
                    r: 0,
                    g: 0,
                    b: 255
                },
                cyan: {
                    r: 0,
                    g: 255,
                    b: 255
                },
                darkblue: {
                    r: 0,
                    g: 0,
                    b: 139
                },
                darkcyan: {
                    r: 0,
                    g: 139,
                    b: 139
                },
                darkgreen: {
                    r: 0,
                    g: 100,
                    b: 0
                },
                darkturquoise: {
                    r: 0,
                    g: 206,
                    b: 209
                },
                deepskyblue: {
                    r: 0,
                    g: 191,
                    b: 255
                },
                green: {
                    r: 0,
                    g: 128,
                    b: 0
                },
                lime: {
                    r: 0,
                    g: 255,
                    b: 0
                },
                mediumblue: {
                    r: 0,
                    g: 0,
                    b: 205
                },
                mediumspringgreen: {
                    r: 0,
                    g: 250,
                    b: 154
                },
                navy: {
                    r: 0,
                    g: 0,
                    b: 128
                },
                springgreen: {
                    r: 0,
                    g: 255,
                    b: 127
                },
                teal: {
                    r: 0,
                    g: 128,
                    b: 128
                },
                midnightblue: {
                    r: 25,
                    g: 25,
                    b: 112
                },
                dodgerblue: {
                    r: 30,
                    g: 144,
                    b: 255
                },
                lightseagreen: {
                    r: 32,
                    g: 178,
                    b: 170
                },
                forestgreen: {
                    r: 34,
                    g: 139,
                    b: 34
                },
                seagreen: {
                    r: 46,
                    g: 139,
                    b: 87
                },
                darkslategray: {
                    r: 47,
                    g: 79,
                    b: 79
                },
                darkslategrey: {
                    r: 47,
                    g: 79,
                    b: 79
                },
                limegreen: {
                    r: 50,
                    g: 205,
                    b: 50
                },
                mediumseagreen: {
                    r: 60,
                    g: 179,
                    b: 113
                },
                turquoise: {
                    r: 64,
                    g: 224,
                    b: 208
                },
                royalblue: {
                    r: 65,
                    g: 105,
                    b: 225
                },
                steelblue: {
                    r: 70,
                    g: 130,
                    b: 180
                },
                darkslateblue: {
                    r: 72,
                    g: 61,
                    b: 139
                },
                mediumturquoise: {
                    r: 72,
                    g: 209,
                    b: 204
                },
                indigo: {
                    r: 75,
                    g: 0,
                    b: 130
                },
                darkolivegreen: {
                    r: 85,
                    g: 107,
                    b: 47
                },
                cadetblue: {
                    r: 95,
                    g: 158,
                    b: 160
                },
                cornflowerblue: {
                    r: 100,
                    g: 149,
                    b: 237
                },
                mediumaquamarine: {
                    r: 102,
                    g: 205,
                    b: 170
                },
                dimgray: {
                    r: 105,
                    g: 105,
                    b: 105
                },
                dimgrey: {
                    r: 105,
                    g: 105,
                    b: 105
                },
                slateblue: {
                    r: 106,
                    g: 90,
                    b: 205
                },
                olivedrab: {
                    r: 107,
                    g: 142,
                    b: 35
                },
                slategray: {
                    r: 112,
                    g: 128,
                    b: 144
                },
                slategrey: {
                    r: 112,
                    g: 128,
                    b: 144
                },
                lightslategray: {
                    r: 119,
                    g: 136,
                    b: 153
                },
                lightslategrey: {
                    r: 119,
                    g: 136,
                    b: 153
                },
                mediumslateblue: {
                    r: 123,
                    g: 104,
                    b: 238
                },
                lawngreen: {
                    r: 124,
                    g: 252,
                    b: 0
                },
                aquamarine: {
                    r: 127,
                    g: 255,
                    b: 212
                },
                chartreuse: {
                    r: 127,
                    g: 255,
                    b: 0
                },
                gray: {
                    r: 128,
                    g: 128,
                    b: 128
                },
                grey: {
                    r: 128,
                    g: 128,
                    b: 128
                },
                maroon: {
                    r: 128,
                    g: 0,
                    b: 0
                },
                olive: {
                    r: 128,
                    g: 128,
                    b: 0
                },
                purple: {
                    r: 128,
                    g: 0,
                    b: 128
                },
                lightskyblue: {
                    r: 135,
                    g: 206,
                    b: 250
                },
                skyblue: {
                    r: 135,
                    g: 206,
                    b: 235
                },
                blueviolet: {
                    r: 138,
                    g: 43,
                    b: 226
                },
                darkmagenta: {
                    r: 139,
                    g: 0,
                    b: 139
                },
                darkred: {
                    r: 139,
                    g: 0,
                    b: 0
                },
                saddlebrown: {
                    r: 139,
                    g: 69,
                    b: 19
                },
                darkseagreen: {
                    r: 143,
                    g: 188,
                    b: 143
                },
                lightgreen: {
                    r: 144,
                    g: 238,
                    b: 144
                },
                mediumpurple: {
                    r: 147,
                    g: 112,
                    b: 219
                },
                darkviolet: {
                    r: 148,
                    g: 0,
                    b: 211
                },
                palegreen: {
                    r: 152,
                    g: 251,
                    b: 152
                },
                darkorchid: {
                    r: 153,
                    g: 50,
                    b: 204
                },
                yellowgreen: {
                    r: 154,
                    g: 205,
                    b: 50
                },
                sienna: {
                    r: 160,
                    g: 82,
                    b: 45
                },
                brown: {
                    r: 165,
                    g: 42,
                    b: 42
                },
                darkgray: {
                    r: 169,
                    g: 169,
                    b: 169
                },
                darkgrey: {
                    r: 169,
                    g: 169,
                    b: 169
                },
                greenyellow: {
                    r: 173,
                    g: 255,
                    b: 47
                },
                lightblue: {
                    r: 173,
                    g: 216,
                    b: 230
                },
                paleturquoise: {
                    r: 175,
                    g: 238,
                    b: 238
                },
                lightsteelblue: {
                    r: 176,
                    g: 196,
                    b: 222
                },
                powderblue: {
                    r: 176,
                    g: 224,
                    b: 230
                },
                firebrick: {
                    r: 178,
                    g: 34,
                    b: 34
                },
                darkgoldenrod: {
                    r: 184,
                    g: 134,
                    b: 11
                },
                mediumorchid: {
                    r: 186,
                    g: 85,
                    b: 211
                },
                rosybrown: {
                    r: 188,
                    g: 143,
                    b: 143
                },
                darkkhaki: {
                    r: 189,
                    g: 183,
                    b: 107
                },
                silver: {
                    r: 192,
                    g: 192,
                    b: 192
                },
                mediumvioletred: {
                    r: 199,
                    g: 21,
                    b: 133
                },
                indianred: {
                    r: 205,
                    g: 92,
                    b: 92
                },
                peru: {
                    r: 205,
                    g: 133,
                    b: 63
                },
                chocolate: {
                    r: 210,
                    g: 105,
                    b: 30
                },
                tan: {
                    r: 210,
                    g: 180,
                    b: 140
                },
                lightgray: {
                    r: 211,
                    g: 211,
                    b: 211
                },
                lightgrey: {
                    r: 211,
                    g: 211,
                    b: 211
                },
                thistle: {
                    r: 216,
                    g: 191,
                    b: 216
                },
                goldenrod: {
                    r: 218,
                    g: 165,
                    b: 32
                },
                orchid: {
                    r: 218,
                    g: 112,
                    b: 214
                },
                palevioletred: {
                    r: 219,
                    g: 112,
                    b: 147
                },
                crimson: {
                    r: 220,
                    g: 20,
                    b: 60
                },
                gainsboro: {
                    r: 220,
                    g: 220,
                    b: 220
                },
                plum: {
                    r: 221,
                    g: 160,
                    b: 221
                },
                burlywood: {
                    r: 222,
                    g: 184,
                    b: 135
                },
                lightcyan: {
                    r: 224,
                    g: 255,
                    b: 255
                },
                lavender: {
                    r: 230,
                    g: 230,
                    b: 250
                },
                darksalmon: {
                    r: 233,
                    g: 150,
                    b: 122
                },
                palegoldenrod: {
                    r: 238,
                    g: 232,
                    b: 170
                },
                violet: {
                    r: 238,
                    g: 130,
                    b: 238
                },
                azure: {
                    r: 240,
                    g: 255,
                    b: 255
                },
                honeydew: {
                    r: 240,
                    g: 255,
                    b: 240
                },
                khaki: {
                    r: 240,
                    g: 230,
                    b: 140
                },
                lightcoral: {
                    r: 240,
                    g: 128,
                    b: 128
                },
                sandybrown: {
                    r: 244,
                    g: 164,
                    b: 96
                },
                beige: {
                    r: 245,
                    g: 245,
                    b: 220
                },
                mintcream: {
                    r: 245,
                    g: 255,
                    b: 250
                },
                wheat: {
                    r: 245,
                    g: 222,
                    b: 179
                },
                whitesmoke: {
                    r: 245,
                    g: 245,
                    b: 245
                },
                ghostwhite: {
                    r: 248,
                    g: 248,
                    b: 255
                },
                lightgoldenrodyellow: {
                    r: 250,
                    g: 250,
                    b: 210
                },
                linen: {
                    r: 250,
                    g: 240,
                    b: 230
                },
                salmon: {
                    r: 250,
                    g: 128,
                    b: 114
                },
                oldlace: {
                    r: 253,
                    g: 245,
                    b: 230
                },
                bisque: {
                    r: 255,
                    g: 228,
                    b: 196
                },
                blanchedalmond: {
                    r: 255,
                    g: 235,
                    b: 205
                },
                coral: {
                    r: 255,
                    g: 127,
                    b: 80
                },
                cornsilk: {
                    r: 255,
                    g: 248,
                    b: 220
                },
                darkorange: {
                    r: 255,
                    g: 140,
                    b: 0
                },
                deeppink: {
                    r: 255,
                    g: 20,
                    b: 147
                },
                floralwhite: {
                    r: 255,
                    g: 250,
                    b: 240
                },
                fuchsia: {
                    r: 255,
                    g: 0,
                    b: 255
                },
                gold: {
                    r: 255,
                    g: 215,
                    b: 0
                },
                hotpink: {
                    r: 255,
                    g: 105,
                    b: 180
                },
                ivory: {
                    r: 255,
                    g: 255,
                    b: 240
                },
                lavenderblush: {
                    r: 255,
                    g: 240,
                    b: 245
                },
                lemonchiffon: {
                    r: 255,
                    g: 250,
                    b: 205
                },
                lightpink: {
                    r: 255,
                    g: 182,
                    b: 193
                },
                lightsalmon: {
                    r: 255,
                    g: 160,
                    b: 122
                },
                lightyellow: {
                    r: 255,
                    g: 255,
                    b: 224
                },
                magenta: {
                    r: 255,
                    g: 0,
                    b: 255
                },
                mistyrose: {
                    r: 255,
                    g: 228,
                    b: 225
                },
                moccasin: {
                    r: 255,
                    g: 228,
                    b: 181
                },
                navajowhite: {
                    r: 255,
                    g: 222,
                    b: 173
                },
                orange: {
                    r: 255,
                    g: 165,
                    b: 0
                },
                orangered: {
                    r: 255,
                    g: 69,
                    b: 0
                },
                papayawhip: {
                    r: 255,
                    g: 239,
                    b: 213
                },
                peachpuff: {
                    r: 255,
                    g: 218,
                    b: 185
                },
                pink: {
                    r: 255,
                    g: 192,
                    b: 203
                },
                red: {
                    r: 255,
                    g: 0,
                    b: 0
                },
                seashell: {
                    r: 255,
                    g: 245,
                    b: 238
                },
                snow: {
                    r: 255,
                    g: 250,
                    b: 250
                },
                tomato: {
                    r: 255,
                    g: 99,
                    b: 71
                },
                white: {
                    r: 255,
                    g: 255,
                    b: 255
                },
                yellow: {
                    r: 255,
                    g: 255,
                    b: 0
                },
                rebeccapurple: {
                    r: 102,
                    g: 51,
                    b: 153
                }
            };
        e.exports = {
            rgbToName: r,
            nameToRgbObject: n
        }
    }, {}],
    28: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return "#" + t.toString(16)
        }
    }, {}],
    29: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return parseInt(t.substr(1), 16)
        }
    }, {}],
    30: [function(t, e, i) {
        "use strict";
        var r = t("./shortToLongHex");
        e.exports = function(t) {
            t = r(t);
            var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
            return e ? "rgb(" + parseInt(e[1], 16) + ", " + parseInt(e[2], 16) + ", " + parseInt(e[3], 16) + ")" : null
        }
    }, {
        "./shortToLongHex": 44
    }],
    31: [function(t, e, i) {
        "use strict";
        var r = t("./isRgb"),
            n = t("./isRgba"),
            s = t("./isHex");
        e.exports = function(t) {
            return s(t) || r(t) || n(t)
        }
    }, {
        "./isHex": 32,
        "./isRgb": 33,
        "./isRgba": 34
    }],
    32: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
            return e.test(t)
        }
    }, {}],
    33: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = /^rgb\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\)$/;
            return null !== e.exec(t)
        }
    }, {}],
    34: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = /^rgba\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/;
            return null !== e.exec(t)
        }
    }, {}],
    35: [function(t, e, i) {
        "use strict";
        var r = t("./isHex"),
            n = t("./hexToRgb"),
            s = t("./rgbToObject");
        e.exports = function(t, e, i) {
            t = r(t) ? n(t) : t, e = r(e) ? n(e) : e, t = s(t), e = s(e);
            var o = t.r + (e.r - t.r) * i,
                a = t.g + (e.g - t.g) * i,
                l = t.b + (e.b - t.b) * i;
            return "rgb(" + Math.round(o) + ", " + Math.round(a) + ", " + Math.round(l) + ")"
        }
    }, {
        "./hexToRgb": 30,
        "./isHex": 32,
        "./rgbToObject": 41
    }],
    36: [function(t, e, i) {
        "use strict";
        var r = t("./rgbToObject");
        e.exports = function(t) {
            var e = r(t);
            return [e.r, e.g, e.b]
        }
    }, {
        "./rgbToObject": 41
    }],
    37: [function(t, e, i) {
        "use strict";
        var r = t("./hexToDecimal"),
            n = t("./rgbToArray"),
            s = t("./rgbToHex");
        e.exports = function(t) {
            var e = s.apply(this, n(t));
            return r(e)
        }
    }, {
        "./hexToDecimal": 29,
        "./rgbToArray": 36,
        "./rgbToHex": 38
    }],
    38: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            return "#" + ((1 << 24) + (t << 16) + (e << 8) + i).toString(16).slice(1)
        }
    }, {}],
    39: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            if (3 !== arguments.length) return !1;
            t /= 255, e /= 255, i /= 255;
            var r, n, s = Math.max(t, e, i),
                o = Math.min(t, e, i),
                a = s + o,
                l = s - o,
                c = a / 2;
            if (s === o) r = n = 0;
            else {
                switch (n = c > .5 ? l / (2 - s - o) : l / a, s) {
                    case t:
                        r = (e - i) / l;
                        break;
                    case e:
                        r = 2 + (i - t) / l;
                        break;
                    case i:
                        r = 4 + (t - e) / l
                }
                r *= 60, r < 0 && (r += 360)
            }
            return [r, Math.round(100 * n), Math.round(100 * c)]
        }
    }, {}],
    40: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            if (3 !== arguments.length) return !1;
            var r, n, s = t / 255,
                o = e / 255,
                a = i / 255,
                l = Math.max(s, o, a),
                c = Math.min(s, o, a),
                u = l,
                h = l - c;
            if (n = 0 === l ? 0 : h / l, l === c) r = 0;
            else {
                switch (l) {
                    case s:
                        r = (o - a) / h + (o < a ? 6 : 0);
                        break;
                    case o:
                        r = (a - s) / h + 2;
                        break;
                    case a:
                        r = (s - o) / h + 4
                }
                r /= 6
            }
            return [Math.round(360 * r), Math.round(100 * n), Math.round(100 * u)]
        }
    }, {}],
    41: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/,
                i = e.exec(t);
            return {
                r: Number(i[1]),
                g: Number(i[2]),
                b: Number(i[3])
            }
        }
    }, {}],
    42: [function(t, e, i) {
        "use strict";
        var r = t("./rgbaToObject");
        e.exports = function(t) {
            var e = r(t);
            return [e.r, e.g, e.b, e.a]
        }
    }, {
        "./rgbaToObject": 43
    }],
    43: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = /rgba\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0(\.\d+)?|1(\.0+)?)\s*\)/,
                i = e.exec(t);
            return {
                r: Number(i[1]),
                g: Number(i[2]),
                b: Number(i[3]),
                a: Number(i[4])
            }
        }
    }, {}],
    44: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            return t = t.replace(e, function(t, e, i, r) {
                return "#" + e + e + i + i + r + r
            })
        }
    }, {}],
    45: [function(t, e, i) {
        "use strict";
        e.exports = {
            DOMEmitter: t("./ac-dom-emitter/DOMEmitter")
        }
    }, {
        "./ac-dom-emitter/DOMEmitter": 46
    }],
    46: [function(t, e, i) {
        "use strict";

        function r(t) {
            null !== t && (this.el = t, this._bindings = {}, this._delegateFuncs = {}, this._eventEmitter = new o)
        }
        var n, s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            o = t("ac-event-emitter").EventEmitter,
            a = t("./DOMEmitterEvent"),
            l = {
                addEventListener: t("@marcom/ac-dom-events/addEventListener"),
                removeEventListener: t("@marcom/ac-dom-events/removeEventListener"),
                dispatchEvent: t("@marcom/ac-dom-events/dispatchEvent")
            },
            c = {
                querySelectorAll: t("@marcom/ac-dom-traversal/querySelectorAll"),
                matchesSelector: t("@marcom/ac-dom-traversal/matchesSelector")
            },
            u = "dom-emitter";
        n = r.prototype, n.on = function() {
            return this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments, 0), this._on), this
        }, n.once = function() {
            return this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments, 0), this._once), this
        }, n.off = function() {
            return this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments, 0), this._off), this
        }, n.has = function(t, e, i, r) {
            var n, s;
            if ("string" == typeof e ? (n = e, s = i) : (s = e, r = i), n) {
                var o = this._getDelegateFuncBindingIdx(t, n, s, r, !0);
                return o > -1
            }
            return !(!this._eventEmitter || !this._eventEmitter.has.apply(this._eventEmitter, arguments))
        }, n.trigger = function(t, e, i, r) {
            t = this._parseEventNames(t), t = this._cleanStringData(t);
            var n, s, o, a = t.length;
            for ("string" == typeof e ? (n = this._cleanStringData(e), s = i) : (s = e, r = i), o = 0; o < a; o++) this._triggerDOMEvents(t[o], s, n);
            return this
        }, n.emitterTrigger = function(t, e, i) {
            if (!this._eventEmitter) return this;
            t = this._parseEventNames(t), t = this._cleanStringData(t), e = new a(e, this);
            var r, n = t.length;
            for (r = 0; r < n; r++) this._eventEmitter.trigger(t[r], e, i);
            return this
        }, n.propagateTo = function(t, e) {
            return this._eventEmitter.propagateTo(t, e), this
        }, n.stopPropagatingTo = function(t) {
            return this._eventEmitter.stopPropagatingTo(t), this
        }, n.stopImmediatePropagation = function() {
            return this._eventEmitter.stopImmediatePropagation(), this
        }, n.destroy = function() {
            this._triggerInternalEvent("willdestroy"), this.off();
            var t;
            for (t in this) this.hasOwnProperty(t) && (this[t] = null)
        }, n._parseEventNames = function(t) {
            return t ? t.split(" ") : [t]
        }, n._onListenerEvent = function(t, e) {
            var i = new a(e, this);
            this._eventEmitter.trigger(t, i, !1)
        }, n._setListener = function(t) {
            this._bindings[t] = this._onListenerEvent.bind(this, t), l.addEventListener(this.el, t, this._bindings[t])
        }, n._removeListener = function(t) {
            l.removeEventListener(this.el, t, this._bindings[t]), this._bindings[t] = null
        }, n._triggerInternalEvent = function(t, e) {
            this.emitterTrigger(u + ":" + t, e)
        }, n._normalizeArgumentsAndCall = function(t, e) {
            var i = {};
            if (0 === t.length) return void e.call(this, i);
            if ("string" == typeof t[0] || null === t[0]) return t = this._cleanStringData(t), i.events = t[0], "string" == typeof t[1] ? (i.delegateQuery = t[1], i.callback = t[2], i.context = t[3]) : (i.callback = t[1], i.context = t[2]), void e.call(this, i);
            var r, n, s = ":",
                o = t[0];
            for (r in o) o.hasOwnProperty(r) && (i = {}, n = this._cleanStringData(r.split(s)), i.events = n[0], i.delegateQuery = n[1], i.callback = o[r], i.context = t[1], e.call(this, i))
        }, n._registerDelegateFunc = function(t, e, i, r, n) {
            var s = this._delegateFunc.bind(this, t, e, i, n);
            return this._delegateFuncs[e] = this._delegateFuncs[e] || {}, this._delegateFuncs[e][t] = this._delegateFuncs[e][t] || [], this._delegateFuncs[e][t].push({
                func: r,
                context: n,
                delegateFunc: s
            }), s
        }, n._cleanStringData = function(t) {
            var e = !1;
            "string" == typeof t && (t = [t], e = !0);
            var i, r, n, s = [],
                o = t.length;
            for (i = 0; i < o; i++) {
                if (r = t[i], "string" == typeof r) {
                    if ("" === r || " " === r) continue;
                    for (n = r.length;
                        " " === r[0];) r = r.slice(1, n), n--;
                    for (;
                        " " === r[n - 1];) r = r.slice(0, n - 1), n--
                }
                s.push(r)
            }
            return e ? s[0] : s
        }, n._unregisterDelegateFunc = function(t, e, i, r) {
            if (this._delegateFuncs[e] && this._delegateFuncs[e][t]) {
                var n, s = this._getDelegateFuncBindingIdx(t, e, i, r);
                return s > -1 && (n = this._delegateFuncs[e][t][s].delegateFunc, this._delegateFuncs[e][t].splice(s, 1), 0 === this._delegateFuncs[e][t].length && (this._delegateFuncs[e][t] = null)), n
            }
        }, n._unregisterDelegateFuncs = function(t, e) {
            if (this._delegateFuncs[e] && (null === t || this._delegateFuncs[e][t]))
                if (null !== t) this._unbindDelegateFunc(t, e);
                else {
                    var i;
                    for (i in this._delegateFuncs[e]) this._delegateFuncs[e].hasOwnProperty(i) && this._unbindDelegateFunc(i, e)
                }
        }, n._unbindDelegateFunc = function(t, e) {
            for (var i, r, n = 0; this._delegateFuncs[e][t] && this._delegateFuncs[e][t][n];) i = this._delegateFuncs[e][t][n], r = this._delegateFuncs[e][t][n].length, this._off({
                events: t,
                delegateQuery: e,
                callback: i.func,
                context: i.context
            }), this._delegateFuncs[e][t] && r === this._delegateFuncs[e][t].length && n++;
            i = r = null
        }, n._unregisterDelegateFuncsByEvent = function(t) {
            var e;
            for (e in this._delegateFuncs) this._delegateFuncs.hasOwnProperty(e) && this._unregisterDelegateFuncs(t, e)
        }, n._delegateFunc = function(t, e, i, r, n) {
            if (this._targetHasDelegateAncestor(n.target, e)) {
                var o = Array.prototype.slice.call(arguments, 0),
                    a = o.slice(4, o.length);
                r = r || window, "object" === s(n.detail) && (a[0] = n.detail), i.apply(r, a)
            }
        }, n._targetHasDelegateAncestor = function(t, e) {
            for (var i = t; i && i !== this.el && i !== document.documentElement;) {
                if (c.matchesSelector(i, e)) return !0;
                i = i.parentNode
            }
            return !1
        }, n._on = function(t) {
            var e = t.events,
                i = t.callback,
                r = t.delegateQuery,
                n = t.context,
                s = t.unboundCallback || i;
            e = this._parseEventNames(e), e.forEach(function(t, e, i, r, n) {
                this.has(n) || this._setListener(n), "string" == typeof r && (t = this._registerDelegateFunc(n, r, t, e, i)), this._triggerInternalEvent("willon", {
                    evt: n,
                    callback: t,
                    context: i,
                    delegateQuery: r
                }), this._eventEmitter.on(n, t, i), this._triggerInternalEvent("didon", {
                    evt: n,
                    callback: t,
                    context: i,
                    delegateQuery: r
                })
            }.bind(this, i, s, n, r)), e = i = s = r = n = null
        }, n._off = function(t) {
            var e = t.events,
                i = t.callback,
                r = t.delegateQuery,
                n = t.context,
                s = t.unboundCallback || i;
            if ("undefined" != typeof e) e = this._parseEventNames(e), e.forEach(function(t, e, i, r, n) {
                if ("string" != typeof r || "function" != typeof e || (t = this._unregisterDelegateFunc(n, r, e, i))) return "string" == typeof r && "undefined" == typeof t ? void this._unregisterDelegateFuncs(n, r) : void("string" == typeof n && "undefined" == typeof t && (this._unregisterDelegateFuncsByEvent(n), "string" == typeof r) || (this._triggerInternalEvent("willoff", {
                    evt: n,
                    callback: t,
                    context: i,
                    delegateQuery: r
                }), this._eventEmitter.off(n, t, i), this._triggerInternalEvent("didoff", {
                    evt: n,
                    callback: t,
                    context: i,
                    delegateQuery: r
                }), this.has(n) || this._removeListener(n)))
            }.bind(this, i, s, n, r)), e = i = s = r = n = null;
            else {
                this._eventEmitter.off();
                var o;
                for (o in this._bindings) this._bindings.hasOwnProperty(o) && this._removeListener(o);
                for (o in this._delegateFuncs) this._delegateFuncs.hasOwnProperty(o) && (this._delegateFuncs[o] = null)
            }
        }, n._once = function(t) {
            var e = t.events,
                i = t.callback,
                r = t.delegateQuery,
                n = t.context;
            e = this._parseEventNames(e), e.forEach(function(t, e, i, r) {
                return "string" == typeof i ? this._handleDelegateOnce(r, t, e, i) : (this.has(r) || this._setListener(r), this._triggerInternalEvent("willonce", {
                    evt: r,
                    callback: t,
                    context: e,
                    delegateQuery: i
                }), this._eventEmitter.once.call(this, r, t, e), void this._triggerInternalEvent("didonce", {
                    evt: r,
                    callback: t,
                    context: e,
                    delegateQuery: i
                }))
            }.bind(this, i, n, r)), e = i = r = n = null
        }, n._handleDelegateOnce = function(t, e, i, r) {
            return this._triggerInternalEvent("willonce", {
                evt: t,
                callback: e,
                context: i,
                delegateQuery: r
            }), this._on({
                events: t,
                context: i,
                delegateQuery: r,
                callback: this._getDelegateOnceCallback.bind(this, t, e, i, r),
                unboundCallback: e
            }), this._triggerInternalEvent("didonce", {
                evt: t,
                callback: e,
                context: i,
                delegateQuery: r
            }), this
        }, n._getDelegateOnceCallback = function(t, e, i, r) {
            var n = Array.prototype.slice.call(arguments, 0),
                s = n.slice(4, n.length);
            e.apply(i, s), this._off({
                events: t,
                delegateQuery: r,
                callback: e,
                context: i
            })
        }, n._getDelegateFuncBindingIdx = function(t, e, i, r, n) {
            var s = -1;
            if (this._delegateFuncs[e] && this._delegateFuncs[e][t]) {
                var o, a, l = this._delegateFuncs[e][t].length;
                for (o = 0; o < l; o++)
                    if (a = this._delegateFuncs[e][t][o], n && "undefined" == typeof i && (i = a.func), a.func === i && a.context === r) {
                        s = o;
                        break
                    }
            }
            return s
        }, n._triggerDOMEvents = function(t, e, i) {
            var r = [this.el];
            i && (r = c.querySelectorAll(i, this.el));
            var n, s = r.length;
            for (n = 0; n < s; n++) l.dispatchEvent(r[n], t, {
                bubbles: !0,
                cancelable: !0,
                detail: e
            })
        }, e.exports = r
    }, {
        "./DOMEmitterEvent": 47,
        "@marcom/ac-dom-events/addEventListener": 48,
        "@marcom/ac-dom-events/dispatchEvent": 49,
        "@marcom/ac-dom-events/removeEventListener": 51,
        "@marcom/ac-dom-traversal/matchesSelector": 84,
        "@marcom/ac-dom-traversal/querySelectorAll": 85,
        "ac-event-emitter": 296
    }],
    47: [function(t, e, i) {
        "use strict";
        var r, n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            s = {
                preventDefault: t("@marcom/ac-dom-events/preventDefault"),
                stopPropagation: t("@marcom/ac-dom-events/stopPropagation"),
                target: t("@marcom/ac-dom-events/target")
            },
            o = function(t, e) {
                this._domEmitter = e, this.originalEvent = t || {}, this._originalTarget = s.target(this.originalEvent), this.target = this._originalTarget || this._domEmitter.el, this.currentTarget = this._domEmitter.el, this.timeStamp = this.originalEvent.timeStamp || Date.now(), this._isDOMEvent(this.originalEvent) ? "object" === n(this.originalEvent.detail) && (this.data = this.originalEvent.detail) : t && (this.data = this.originalEvent, this.originalEvent = {})
            };
        r = o.prototype, r.preventDefault = function() {
            s.preventDefault(this.originalEvent)
        }, r.stopPropagation = function() {
            s.stopPropagation(this.originalEvent)
        }, r.stopImmediatePropagation = function() {
            this.originalEvent.stopImmediatePropagation && this.originalEvent.stopImmediatePropagation(), this._domEmitter.stopImmediatePropagation()
        }, r._isDOMEvent = function(t) {
            return !!(this._originalTarget || "undefined" !== document.createEvent && "undefined" != typeof CustomEvent && t instanceof CustomEvent)
        }, e.exports = o
    }, {
        "@marcom/ac-dom-events/preventDefault": 50,
        "@marcom/ac-dom-events/stopPropagation": 53,
        "@marcom/ac-dom-events/target": 54
    }],
    48: [function(t, e, i) {
        "use strict";
        var r = t("./utils/addEventListener"),
            n = t("./shared/getEventType");
        e.exports = function(t, e, i, s) {
            return e = n(t, e), r(t, e, i, s)
        }
    }, {
        "./shared/getEventType": 52,
        "./utils/addEventListener": 55
    }],
    49: [function(t, e, i) {
        "use strict";
        var r = t("./utils/dispatchEvent"),
            n = t("./shared/getEventType");
        e.exports = function(t, e, i) {
            return e = n(t, e), r(t, e, i)
        }
    }, {
        "./shared/getEventType": 52,
        "./utils/dispatchEvent": 56
    }],
    50: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            t = t || window.event, t.preventDefault ? t.preventDefault() : t.returnValue = !1
        }
    }, {}],
    51: [function(t, e, i) {
        "use strict";
        var r = t("./utils/removeEventListener"),
            n = t("./shared/getEventType");
        e.exports = function(t, e, i, s) {
            return e = n(t, e), r(t, e, i, s)
        }
    }, {
        "./shared/getEventType": 52,
        "./utils/removeEventListener": 57
    }],
    52: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-prefixer/getEventType");
        e.exports = function(t, e) {
            var i, n;
            return i = "tagName" in t ? t.tagName : t === window ? "window" : "document", n = r(e, i), n ? n : e
        }
    }, {
        "@marcom/ac-prefixer/getEventType": 176
    }],
    53: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            t = t || window.event, t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
        }
    }, {}],
    54: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return t = t || window.event, "undefined" != typeof t.target ? t.target : t.srcElement
        }
    }, {}],
    55: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i, r) {
            return t.addEventListener ? t.addEventListener(e, i, !!r) : t.attachEvent("on" + e, i), t
        }
    }, {}],
    56: [function(t, e, i) {
        "use strict";
        t("@marcom/ac-polyfills/CustomEvent"), e.exports = function(t, e, i) {
            var r;
            return t.dispatchEvent ? (r = i ? new CustomEvent(e, i) : new CustomEvent(e), t.dispatchEvent(r)) : (r = document.createEventObject(), i && "detail" in i && (r.detail = i.detail), t.fireEvent("on" + e, r)), t
        }
    }, {
        "@marcom/ac-polyfills/CustomEvent": void 0
    }],
    57: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i, r) {
            return t.removeEventListener ? t.removeEventListener(e, i, !!r) : t.detachEvent("on" + e, i), t
        }
    }, {}],
    58: [function(t, e, i) {
        "use strict";
        var r = t("./utils/getBoundingClientRect");
        e.exports = function(t, e) {
            var i;
            return e ? (i = r(t), {
                width: i.width,
                height: i.height
            }) : {
                width: t.offsetWidth,
                height: t.offsetHeight
            }
        }
    }, {
        "./utils/getBoundingClientRect": 62
    }],
    59: [function(t, e, i) {
        "use strict";
        var r = t("./getDimensions"),
            n = t("./utils/getBoundingClientRect");
        e.exports = function(t, e) {
            var i, s, o;
            return e ? (i = n(t), t.offsetParent && (s = n(t.offsetParent), i.top -= s.top, i.left -= s.left)) : (o = r(t, e), i = {
                top: t.offsetTop,
                left: t.offsetLeft,
                width: o.width,
                height: o.height
            }), {
                top: i.top,
                right: i.left + i.width,
                bottom: i.top + i.height,
                left: i.left
            }
        }
    }, {
        "./getDimensions": 58,
        "./utils/getBoundingClientRect": 62
    }],
    60: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e;
            if (t = t || window, t === window) {
                if (e = window.pageXOffset) return e;
                t = document.documentElement || document.body.parentNode || document.body
            }
            return t.scrollLeft
        }
    }, {}],
    61: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e;
            if (t = t || window, t === window) {
                if (e = window.pageYOffset) return e;
                t = document.documentElement || document.body.parentNode || document.body
            }
            return t.scrollTop
        }
    }, {}],
    62: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.getBoundingClientRect();
            return {
                top: e.top,
                right: e.right,
                bottom: e.bottom,
                left: e.left,
                width: e.width || e.right - e.left,
                height: e.height || e.bottom - e.top
            }
        }
    }, {}],
    63: [function(t, e, i) {
        "use strict";
        e.exports = 8
    }, {}],
    64: [function(t, e, i) {
        "use strict";
        e.exports = 11
    }, {}],
    65: [function(t, e, i) {
        "use strict";
        e.exports = 9
    }, {}],
    66: [function(t, e, i) {
        "use strict";
        e.exports = 1
    }, {}],
    67: [function(t, e, i) {
        "use strict";
        e.exports = 3
    }, {}],
    68: [function(t, e, i) {
        "use strict";
        t("@marcom/ac-polyfills/Array/prototype.slice"), t("@marcom/ac-polyfills/Array/prototype.filter");
        var r = t("./internal/isNodeType"),
            n = t("./ELEMENT_NODE");
        e.exports = function(t, e) {
            return e = e || n, t = Array.prototype.slice.call(t), t.filter(function(t) {
                return r(t, e)
            })
        }
    }, {
        "./ELEMENT_NODE": 66,
        "./internal/isNodeType": 69,
        "@marcom/ac-polyfills/Array/prototype.filter": void 0,
        "@marcom/ac-polyfills/Array/prototype.slice": void 0
    }],
    69: [function(t, e, i) {
        "use strict";
        var r = t("../isNode");
        e.exports = function(t, e) {
            return !!r(t) && ("number" == typeof e ? t.nodeType === e : e.indexOf(t.nodeType) !== -1)
        }
    }, {
        "../isNode": 73
    }],
    70: [function(t, e, i) {
        "use strict";
        var r = t("./isNodeType"),
            n = t("../COMMENT_NODE"),
            s = t("../DOCUMENT_FRAGMENT_NODE"),
            o = t("../ELEMENT_NODE"),
            a = t("../TEXT_NODE"),
            l = [o, a, n, s],
            c = " must be an Element, TextNode, Comment, or Document Fragment",
            u = [o, a, n],
            h = " must be an Element, TextNode, or Comment",
            m = [o, s],
            d = " must be an Element, or Document Fragment",
            p = " must have a parentNode";
        e.exports = {
            parentNode: function(t, e, i, n) {
                if (n = n || "target", (t || e) && !r(t, m)) throw new TypeError(i + ": " + n + d)
            },
            childNode: function(t, e, i, n) {
                if (n = n || "target", (t || e) && !r(t, u)) throw new TypeError(i + ": " + n + h)
            },
            insertNode: function(t, e, i, n) {
                if (n = n || "node", (t || e) && !r(t, l)) throw new TypeError(i + ": " + n + c)
            },
            hasParentNode: function(t, e, i) {
                if (i = i || "target", !t.parentNode) throw new TypeError(e + ": " + i + p)
            }
        }
    }, {
        "../COMMENT_NODE": 63,
        "../DOCUMENT_FRAGMENT_NODE": 64,
        "../ELEMENT_NODE": 66,
        "../TEXT_NODE": 67,
        "./isNodeType": 69
    }],
    71: [function(t, e, i) {
        "use strict";
        var r = t("./internal/isNodeType"),
            n = t("./DOCUMENT_FRAGMENT_NODE");
        e.exports = function(t) {
            return r(t, n)
        }
    }, {
        "./DOCUMENT_FRAGMENT_NODE": 64,
        "./internal/isNodeType": 69
    }],
    72: [function(t, e, i) {
        "use strict";
        var r = t("./internal/isNodeType"),
            n = t("./ELEMENT_NODE");
        e.exports = function(t) {
            return r(t, n)
        }
    }, {
        "./ELEMENT_NODE": 66,
        "./internal/isNodeType": 69
    }],
    73: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return !(!t || !t.nodeType)
        }
    }, {}],
    74: [function(t, e, i) {
        "use strict";
        var r = t("./internal/validate");
        e.exports = function(t) {
            return r.childNode(t, !0, "remove"), t.parentNode ? t.parentNode.removeChild(t) : t
        }
    }, {
        "./internal/validate": 70
    }],
    75: [function(t, e, i) {
        "use strict";
        e.exports = {
            getStyle: t("./getStyle"),
            setStyle: t("./setStyle")
        }
    }, {
        "./getStyle": 76,
        "./setStyle": 78
    }],
    76: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-prefixer/getStyleProperty"),
            n = t("@marcom/ac-prefixer/stripPrefixes");
        e.exports = function() {
            var t, e, i, s, o = Array.prototype.slice.call(arguments),
                a = o.shift(o),
                l = window.getComputedStyle(a),
                c = {};
            for ("string" != typeof o[0] && (o = o[0]), s = 0; s < o.length; s++) t = o[s], e = r(t), e ? (t = n(e), i = l[e], i && "auto" !== i || (i = null), i && (i = n(i))) : i = null, c[t] = i;
            return c
        }
    }, {
        "@marcom/ac-prefixer/getStyleProperty": 178,
        "@marcom/ac-prefixer/stripPrefixes": 186
    }],
    77: [function(t, e, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        e.exports = function(t) {
            var e, i, n;
            if (!t && 0 !== t) return "";
            if (Array.isArray(t)) return t + "";
            if ("object" === ("undefined" == typeof t ? "undefined" : r(t))) {
                for (e = "", i = Object.keys(t), n = 0; n < i.length; n++) e += i[n] + "(" + t[i[n]] + ") ";
                return e.trim()
            }
            return t
        }
    }, {}],
    78: [function(t, e, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            n = t("@marcom/ac-prefixer/getStyleCSS"),
            s = t("@marcom/ac-prefixer/getStyleProperty"),
            o = t("./internal/normalizeValue");
        e.exports = function(t, e) {
            var i, a, l, c, u, h = "";
            if ("object" !== ("undefined" == typeof e ? "undefined" : r(e))) throw new TypeError("setStyle: styles must be an Object");
            for (a in e) c = o(e[a]), c || 0 === c ? (i = n(a, c), i !== !1 && (h += " " + i)) : (l = s(a), "removeAttribute" in t.style ? t.style.removeAttribute(l) : t.style[l] = "");
            return h.length && (u = t.style.cssText, ";" !== u.charAt(u.length - 1) && (u += ";"), u += h, t.style.cssText = u), t
        }
    }, {
        "./internal/normalizeValue": 77,
        "@marcom/ac-prefixer/getStyleCSS": 177,
        "@marcom/ac-prefixer/getStyleProperty": 178
    }],
    79: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-dom-nodes/isElement"),
            n = t("./matchesSelector"),
            s = t("./internal/validate");
        e.exports = function(t, e, i, o) {
            var a = [];
            if (s.childNode(t, !0, "ancestors"), s.selector(e, !1, "ancestors"), i && r(t) && (!e || n(t, e)) && a.push(t), o = o || document.body, t !== o)
                for (;
                    (t = t.parentNode) && r(t) && (e && !n(t, e) || a.push(t), t !== o););
            return a
        }
    }, {
        "./internal/validate": 83,
        "./matchesSelector": 84,
        "@marcom/ac-dom-nodes/isElement": 72
    }],
    80: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-dom-nodes/filterByNodeType"),
            n = t("./filterBySelector"),
            s = t("./internal/validate");
        e.exports = function(t, e) {
            var i;
            return s.parentNode(t, !0, "children"), s.selector(e, !1, "children"), i = t.children || t.childNodes, i = r(i), e && (i = n(i, e)), i
        }
    }, {
        "./filterBySelector": 81,
        "./internal/validate": 83,
        "@marcom/ac-dom-nodes/filterByNodeType": 68
    }],
    81: [function(t, e, i) {
        "use strict";
        t("@marcom/ac-polyfills/Array/prototype.slice"), t("@marcom/ac-polyfills/Array/prototype.filter");
        var r = t("./matchesSelector"),
            n = t("./internal/validate");
        e.exports = function(t, e) {
            return n.selector(e, !0, "filterBySelector"), t = Array.prototype.slice.call(t), t.filter(function(t) {
                return r(t, e)
            })
        }
    }, {
        "./internal/validate": 83,
        "./matchesSelector": 84,
        "@marcom/ac-polyfills/Array/prototype.filter": void 0,
        "@marcom/ac-polyfills/Array/prototype.slice": void 0
    }],
    82: [function(t, e, i) {
        "use strict";
        e.exports = window.Element ? function(t) {
            return t.matches || t.matchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector
        }(Element.prototype) : null
    }, {}],
    83: [function(t, e, i) {
        "use strict";
        t("@marcom/ac-polyfills/Array/prototype.indexOf");
        var r = t("@marcom/ac-dom-nodes/isNode"),
            n = t("@marcom/ac-dom-nodes/COMMENT_NODE"),
            s = t("@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE"),
            o = t("@marcom/ac-dom-nodes/DOCUMENT_NODE"),
            a = t("@marcom/ac-dom-nodes/ELEMENT_NODE"),
            l = t("@marcom/ac-dom-nodes/TEXT_NODE"),
            c = function(t, e) {
                return !!r(t) && ("number" == typeof e ? t.nodeType === e : e.indexOf(t.nodeType) !== -1)
            },
            u = [a, o, s],
            h = " must be an Element, Document, or Document Fragment",
            m = [a, l, n],
            d = " must be an Element, TextNode, or Comment",
            p = " must be a string";
        e.exports = {
            parentNode: function(t, e, i, r) {
                if (r = r || "node", (t || e) && !c(t, u)) throw new TypeError(i + ": " + r + h)
            },
            childNode: function(t, e, i, r) {
                if (r = r || "node", (t || e) && !c(t, m)) throw new TypeError(i + ": " + r + d)
            },
            selector: function(t, e, i, r) {
                if (r = r || "selector", (t || e) && "string" != typeof t) throw new TypeError(i + ": " + r + p)
            }
        }
    }, {
        "@marcom/ac-dom-nodes/COMMENT_NODE": 63,
        "@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE": 64,
        "@marcom/ac-dom-nodes/DOCUMENT_NODE": 65,
        "@marcom/ac-dom-nodes/ELEMENT_NODE": 66,
        "@marcom/ac-dom-nodes/TEXT_NODE": 67,
        "@marcom/ac-dom-nodes/isNode": 73,
        "@marcom/ac-polyfills/Array/prototype.indexOf": void 0
    }],
    84: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-dom-nodes/isElement"),
            n = t("./internal/validate"),
            s = t("./internal/nativeMatches"),
            o = t("./shims/matchesSelector");
        e.exports = function(t, e) {
            return n.selector(e, !0, "matchesSelector"),
                !!r(t) && (s ? s.call(t, e) : o(t, e))
        }
    }, {
        "./internal/nativeMatches": 82,
        "./internal/validate": 83,
        "./shims/matchesSelector": 86,
        "@marcom/ac-dom-nodes/isElement": 72
    }],
    85: [function(t, e, i) {
        "use strict";
        t("@marcom/ac-polyfills/Array/prototype.slice");
        var r = t("./internal/validate"),
            n = t("./shims/querySelectorAll"),
            s = "querySelectorAll" in document;
        e.exports = function(t, e) {
            return e = e || document, r.parentNode(e, !0, "querySelectorAll", "context"), r.selector(t, !0, "querySelectorAll"), s ? Array.prototype.slice.call(e.querySelectorAll(t)) : n(t, e)
        }
    }, {
        "./internal/validate": 83,
        "./shims/querySelectorAll": 87,
        "@marcom/ac-polyfills/Array/prototype.slice": void 0
    }],
    86: [function(t, e, i) {
        "use strict";
        var r = t("../querySelectorAll");
        e.exports = function(t, e) {
            var i, n = t.parentNode || document,
                s = r(e, n);
            for (i = 0; i < s.length; i++)
                if (s[i] === t) return !0;
            return !1
        }
    }, {
        "../querySelectorAll": 85
    }],
    87: [function(t, e, i) {
        "use strict";
        t("@marcom/ac-polyfills/Array/prototype.indexOf");
        var r = t("@marcom/ac-dom-nodes/isElement"),
            n = t("@marcom/ac-dom-nodes/isDocumentFragment"),
            s = t("@marcom/ac-dom-nodes/remove"),
            o = "_ac_qsa_",
            a = function(t, e) {
                var i;
                if (e === document) return !0;
                for (i = t;
                    (i = i.parentNode) && r(i);)
                    if (i === e) return !0;
                return !1
            },
            l = function(t) {
                "recalc" in t ? t.recalc(!1) : document.recalc(!1), window.scrollBy(0, 0)
            };
        e.exports = function(t, e) {
            var i, r = document.createElement("style"),
                c = o + (Math.random() + "").slice(-6),
                u = [];
            for (e = e || document, document[c] = [], n(e) ? e.appendChild(r) : document.documentElement.firstChild.appendChild(r), r.styleSheet.cssText = "*{display:recalc;}" + t + '{ac-qsa:expression(document["' + c + '"] && document["' + c + '"].push(this));}', l(e); document[c].length;) i = document[c].shift(), i.style.removeAttribute("ac-qsa"), u.indexOf(i) === -1 && a(i, e) && u.push(i);
            return document[c] = null, s(r), l(e), u
        }
    }, {
        "@marcom/ac-dom-nodes/isDocumentFragment": 71,
        "@marcom/ac-dom-nodes/isElement": 72,
        "@marcom/ac-dom-nodes/remove": 74,
        "@marcom/ac-polyfills/Array/prototype.indexOf": void 0
    }],
    88: [function(t, e, i) {
        "use strict";
        e.exports = {
            createBezier: t("./ac-easing/createBezier"),
            createPredefined: t("./ac-easing/createPredefined"),
            createStep: t("./ac-easing/createStep"),
            Ease: t("./ac-easing/Ease")
        }
    }, {
        "./ac-easing/Ease": 89,
        "./ac-easing/createBezier": 90,
        "./ac-easing/createPredefined": 91,
        "./ac-easing/createStep": 92
    }],
    89: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if ("function" != typeof t) throw new TypeError(n);
            this.easingFunction = t, this.cssString = e || null
        }
        var n = "Ease expects an easing function.",
            s = r.prototype;
        s.getValue = function(t) {
            return this.easingFunction(t, 0, 1, 1)
        }, e.exports = r
    }, {}],
    90: [function(t, e, i) {
        "use strict";
        t("@marcom/ac-polyfills/Array/prototype.every");
        var r = t("./Ease"),
            n = t("./helpers/KeySpline"),
            s = "Bezier curve expects exactly four (4) numbers. Given: ";
        e.exports = function(t, e, i, o) {
            var a = Array.prototype.slice.call(arguments),
                l = a.every(function(t) {
                    return "number" == typeof t
                });
            if (4 !== a.length || !l) throw new TypeError(s + a);
            var c = new n(t, e, i, o),
                u = function(t, e, i, r) {
                    return c.get(t / r) * i + e
                },
                h = "cubic-bezier(" + a.join(", ") + ")";
            return new r(u, h)
        }
    }, {
        "./Ease": 89,
        "./helpers/KeySpline": 93,
        "@marcom/ac-polyfills/Array/prototype.every": void 0
    }],
    91: [function(t, e, i) {
        "use strict";
        var r = t("./createStep"),
            n = t("./helpers/cssAliases"),
            s = t("./helpers/easingFunctions"),
            o = t("./Ease"),
            a = 'Easing function "%TYPE%" not recognized among the following: ' + Object.keys(s).join(", ");
        e.exports = function(t) {
            var e;
            if ("step-start" === t) return r(1, "start");
            if ("step-end" === t) return r(1, "end");
            if (e = s[t], !e) throw new Error(a.replace("%TYPE%", t));
            return new o(e, n[t])
        }
    }, {
        "./Ease": 89,
        "./createStep": 92,
        "./helpers/cssAliases": 94,
        "./helpers/easingFunctions": 95
    }],
    92: [function(t, e, i) {
        "use strict";
        var r = t("./Ease"),
            n = "Step function expects a numeric value greater than zero. Given: ",
            s = 'Step function direction must be either "start" or "end" (default). Given: ';
        e.exports = function(t, e) {
            if (e = e || "end", "number" != typeof t || t < 1) throw new TypeError(n + t);
            if ("start" !== e && "end" !== e) throw new TypeError(s + e);
            var i = function(i, r, n, s) {
                    var o = n / t,
                        a = Math["start" === e ? "floor" : "ceil"](i / s * t);
                    return r + o * a
                },
                o = "steps(" + t + ", " + e + ")";
            return new r(i, o)
        }
    }, {
        "./Ease": 89
    }],
    93: [function(t, e, i) {
        "use strict";

        function r(t, e, i, r) {
            function n(t, e) {
                return 1 - 3 * e + 3 * t
            }

            function s(t, e) {
                return 3 * e - 6 * t
            }

            function o(t) {
                return 3 * t
            }

            function a(t, e, i) {
                return ((n(e, i) * t + s(e, i)) * t + o(e)) * t
            }

            function l(t, e, i) {
                return 3 * n(e, i) * t * t + 2 * s(e, i) * t + o(e)
            }

            function c(e) {
                for (var r = e, n = 0; n < 4; ++n) {
                    var s = l(r, t, i);
                    if (0 === s) return r;
                    var o = a(r, t, i) - e;
                    r -= o / s
                }
                return r
            }
            this.get = function(n) {
                return t === e && i === r ? n : a(c(n), e, r)
            }
        }
        e.exports = r
    }, {}],
    94: [function(t, e, i) {
        "use strict";
        var r = {
            linear: "cubic-bezier(0, 0, 1, 1)",
            ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
            "ease-out": "cubic-bezier(0, 0, 0.58, 1)",
            "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)",
            "ease-in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
            "ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
            "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",
            "ease-in-quad": "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
            "ease-out-quad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            "ease-in-out-quad": "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
            "ease-in-quart": "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
            "ease-out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
            "ease-in-out-quart": "cubic-bezier(0.77, 0, 0.175, 1)",
            "ease-in-quint": "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
            "ease-out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
            "ease-in-out-quint": "cubic-bezier(0.86, 0, 0.07, 1)",
            "ease-in-sine": "cubic-bezier(0.47, 0, 0.745, 0.715)",
            "ease-out-sine": "cubic-bezier(0.39, 0.575, 0.565, 1)",
            "ease-in-out-sine": "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
            "ease-in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
            "ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
            "ease-in-out-expo": "cubic-bezier(1, 0, 0, 1)",
            "ease-in-circ": "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
            "ease-out-circ": "cubic-bezier(0.075, 0.82, 0.165, 1)",
            "ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
            "ease-in-back": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
            "ease-out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            "ease-in-out-back": "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        };
        r.easeIn = r["ease-in"], r.easeOut = r["ease-out"], r.easeInOut = r["ease-in-out"], r.easeInCubic = r["ease-in-cubic"], r.easeOutCubic = r["ease-out-cubic"], r.easeInOutCubic = r["ease-in-out-cubic"], r.easeInQuad = r["ease-in-quad"], r.easeOutQuad = r["ease-out-quad"], r.easeInOutQuad = r["ease-in-out-quad"], r.easeInQuart = r["ease-in-quart"], r.easeOutQuart = r["ease-out-quart"], r.easeInOutQuart = r["ease-in-out-quart"], r.easeInQuint = r["ease-in-quint"], r.easeOutQuint = r["ease-out-quint"], r.easeInOutQuint = r["ease-in-out-quint"], r.easeInSine = r["ease-in-sine"], r.easeOutSine = r["ease-out-sine"], r.easeInOutSine = r["ease-in-out-sine"], r.easeInExpo = r["ease-in-expo"], r.easeOutExpo = r["ease-out-expo"], r.easeInOutExpo = r["ease-in-out-expo"], r.easeInCirc = r["ease-in-circ"], r.easeOutCirc = r["ease-out-circ"], r.easeInOutCirc = r["ease-in-out-circ"], r.easeInBack = r["ease-in-back"], r.easeOutBack = r["ease-out-back"], r.easeInOutBack = r["ease-in-out-back"], e.exports = r
    }, {}],
    95: [function(t, e, i) {
        "use strict";
        var r = t("../createBezier"),
            n = r(.25, .1, .25, 1).easingFunction,
            s = r(.42, 0, 1, 1).easingFunction,
            o = r(0, 0, .58, 1).easingFunction,
            a = r(.42, 0, .58, 1).easingFunction,
            l = function(t, e, i, r) {
                return i * t / r + e
            },
            c = function(t, e, i, r) {
                return i * (t /= r) * t + e
            },
            u = function(t, e, i, r) {
                return -i * (t /= r) * (t - 2) + e
            },
            h = function(t, e, i, r) {
                return (t /= r / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e
            },
            m = function(t, e, i, r) {
                return i * (t /= r) * t * t + e
            },
            d = function(t, e, i, r) {
                return i * ((t = t / r - 1) * t * t + 1) + e
            },
            p = function(t, e, i, r) {
                return (t /= r / 2) < 1 ? i / 2 * t * t * t + e : i / 2 * ((t -= 2) * t * t + 2) + e
            },
            f = function(t, e, i, r) {
                return i * (t /= r) * t * t * t + e
            },
            _ = function(t, e, i, r) {
                return -i * ((t = t / r - 1) * t * t * t - 1) + e
            },
            g = function(t, e, i, r) {
                return (t /= r / 2) < 1 ? i / 2 * t * t * t * t + e : -i / 2 * ((t -= 2) * t * t * t - 2) + e
            },
            v = function(t, e, i, r) {
                return i * (t /= r) * t * t * t * t + e
            },
            y = function(t, e, i, r) {
                return i * ((t = t / r - 1) * t * t * t * t + 1) + e
            },
            b = function(t, e, i, r) {
                return (t /= r / 2) < 1 ? i / 2 * t * t * t * t * t + e : i / 2 * ((t -= 2) * t * t * t * t + 2) + e
            },
            E = function(t, e, i, r) {
                return -i * Math.cos(t / r * (Math.PI / 2)) + i + e
            },
            w = function(t, e, i, r) {
                return i * Math.sin(t / r * (Math.PI / 2)) + e
            },
            T = function(t, e, i, r) {
                return -i / 2 * (Math.cos(Math.PI * t / r) - 1) + e
            },
            S = function(t, e, i, r) {
                return 0 === t ? e : i * Math.pow(2, 10 * (t / r - 1)) + e
            },
            x = function(t, e, i, r) {
                return t === r ? e + i : i * (-Math.pow(2, -10 * t / r) + 1) + e
            },
            C = function(t, e, i, r) {
                return 0 === t ? e : t === r ? e + i : (t /= r / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + e : i / 2 * (-Math.pow(2, -10 * --t) + 2) + e
            },
            A = function(t, e, i, r) {
                return -i * (Math.sqrt(1 - (t /= r) * t) - 1) + e
            },
            O = function(t, e, i, r) {
                return i * Math.sqrt(1 - (t = t / r - 1) * t) + e
            },
            I = function(t, e, i, r) {
                return (t /= r / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + e : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + e
            },
            P = function(t, e, i, r) {
                var n = 1.70158,
                    s = 0,
                    o = i;
                return 0 === t ? e : 1 === (t /= r) ? e + i : (s || (s = .3 * r), o < Math.abs(i) ? (o = i, n = s / 4) : n = s / (2 * Math.PI) * Math.asin(i / o), -(o * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * r - n) * (2 * Math.PI) / s)) + e)
            },
            k = function(t, e, i, r) {
                var n = 1.70158,
                    s = 0,
                    o = i;
                return 0 === t ? e : 1 === (t /= r) ? e + i : (s || (s = .3 * r), o < Math.abs(i) ? (o = i, n = s / 4) : n = s / (2 * Math.PI) * Math.asin(i / o), o * Math.pow(2, -10 * t) * Math.sin((t * r - n) * (2 * Math.PI) / s) + i + e)
            },
            M = function(t, e, i, r) {
                var n = 1.70158,
                    s = 0,
                    o = i;
                return 0 === t ? e : 2 === (t /= r / 2) ? e + i : (s || (s = r * (.3 * 1.5)), o < Math.abs(i) ? (o = i, n = s / 4) : n = s / (2 * Math.PI) * Math.asin(i / o), t < 1 ? -.5 * (o * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * r - n) * (2 * Math.PI) / s)) + e : o * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * r - n) * (2 * Math.PI) / s) * .5 + i + e)
            },
            D = function(t, e, i, r, n) {
                return void 0 === n && (n = 1.70158), i * (t /= r) * t * ((n + 1) * t - n) + e
            },
            F = function(t, e, i, r, n) {
                return void 0 === n && (n = 1.70158), i * ((t = t / r - 1) * t * ((n + 1) * t + n) + 1) + e
            },
            R = function(t, e, i, r, n) {
                return void 0 === n && (n = 1.70158), (t /= r / 2) < 1 ? i / 2 * (t * t * (((n *= 1.525) + 1) * t - n)) + e : i / 2 * ((t -= 2) * t * (((n *= 1.525) + 1) * t + n) + 2) + e
            },
            N = function(t, e, i, r) {
                return (t /= r) < 1 / 2.75 ? i * (7.5625 * t * t) + e : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
            },
            L = function(t, e, i, r) {
                return i - N(r - t, 0, i, r) + e
            },
            U = function(t, e, i, r) {
                return t < r / 2 ? .5 * L(2 * t, 0, i, r) + e : .5 * N(2 * t - r, 0, i, r) + .5 * i + e
            };
        e.exports = {
            linear: l,
            ease: n,
            easeIn: s,
            "ease-in": s,
            easeOut: o,
            "ease-out": o,
            easeInOut: a,
            "ease-in-out": a,
            easeInCubic: m,
            "ease-in-cubic": m,
            easeOutCubic: d,
            "ease-out-cubic": d,
            easeInOutCubic: p,
            "ease-in-out-cubic": p,
            easeInQuad: c,
            "ease-in-quad": c,
            easeOutQuad: u,
            "ease-out-quad": u,
            easeInOutQuad: h,
            "ease-in-out-quad": h,
            easeInQuart: f,
            "ease-in-quart": f,
            easeOutQuart: _,
            "ease-out-quart": _,
            easeInOutQuart: g,
            "ease-in-out-quart": g,
            easeInQuint: v,
            "ease-in-quint": v,
            easeOutQuint: y,
            "ease-out-quint": y,
            easeInOutQuint: b,
            "ease-in-out-quint": b,
            easeInSine: E,
            "ease-in-sine": E,
            easeOutSine: w,
            "ease-out-sine": w,
            easeInOutSine: T,
            "ease-in-out-sine": T,
            easeInExpo: S,
            "ease-in-expo": S,
            easeOutExpo: x,
            "ease-out-expo": x,
            easeInOutExpo: C,
            "ease-in-out-expo": C,
            easeInCirc: A,
            "ease-in-circ": A,
            easeOutCirc: O,
            "ease-out-circ": O,
            easeInOutCirc: I,
            "ease-in-out-circ": I,
            easeInBack: D,
            "ease-in-back": D,
            easeOutBack: F,
            "ease-out-back": F,
            easeInOutBack: R,
            "ease-in-out-back": R,
            easeInElastic: P,
            "ease-in-elastic": P,
            easeOutElastic: k,
            "ease-out-elastic": k,
            easeInOutElastic: M,
            "ease-in-out-elastic": M,
            easeInBounce: L,
            "ease-in-bounce": L,
            easeOutBounce: N,
            "ease-out-bounce": N,
            easeInOutBounce: U,
            "ease-in-out-bounce": U
        }
    }, {
        "../createBezier": 90
    }],
    96: [function(t, e, i) {
        "use strict";

        function r(t, e, i, r) {
            return t.nodeType ? void 0 === n || r && r.inlineStyles ? new a(t, e, i, r) : new l(t, e, i, r) : new o(t, e, i, r)
        }
        t("./helpers/Float32Array");
        var n = t("./helpers/transitionEnd"),
            s = t("@marcom/ac-clip").Clip,
            o = t("./clips/ClipEasing"),
            a = t("./clips/ClipInlineCss"),
            l = t("./clips/ClipTransitionCss");
        for (var c in s) "function" == typeof s[c] && "_" !== c.substr(0, 1) && (r[c] = s[c].bind(s));
        r.to = function(t, e, i, n) {
            return n = n || {}, void 0 === n.destroyOnComplete && (n.destroyOnComplete = !0), new r(t, e, i, n).play()
        }, r.from = function(t, e, i, n) {
            return n = n || {}, n.propsFrom = i, void 0 === n.destroyOnComplete && (n.destroyOnComplete = !0), new r(t, e, n.propsTo, n).play()
        }, e.exports = r
    }, {
        "./clips/ClipEasing": 99,
        "./clips/ClipInlineCss": 100,
        "./clips/ClipTransitionCss": 101,
        "./helpers/Float32Array": 104,
        "./helpers/transitionEnd": 113,
        "@marcom/ac-clip": 19
    }],
    97: [function(t, e, i) {
        "use strict";
        e.exports = t("./timeline/Timeline")
    }, {
        "./timeline/Timeline": 115
    }],
    98: [function(t, e, i) {
        "use strict";
        e.exports = {
            Clip: t("./Clip"),
            Timeline: t("./Timeline")
        }
    }, {
        "./Clip": 96,
        "./Timeline": 97
    }],
    99: [function(t, e, i) {
        "use strict";

        function r(t, e, i, r) {
            r && a(r.ease) && (r.ease = l.create(r.ease).toEasingFunction()), r = r || {}, this._propsEase = r.propsEase || {}, c.call(this, t, e, i, r)
        }
        var n = t("@marcom/ac-object/clone"),
            s = t("@marcom/ac-object/create"),
            o = t("@marcom/ac-easing").createPredefined,
            a = t("../helpers/isCssCubicBezierString"),
            l = t("../helpers/BezierCurveCssManager"),
            c = t("@marcom/ac-clip").Clip,
            u = t("@marcom/ac-easing").Ease,
            h = c.prototype,
            m = r.prototype = s(h);
        m.reset = function() {
            var t = h.reset.call(this);
            if (this._clips)
                for (var e = this._clips.length; e--;) this._clips[e].reset();
            return t
        }, m.destroy = function() {
            if (this._clips) {
                for (var t = this._clips.length; t--;) this._clips[t].destroy();
                this._clips = null
            }
            return this._eases = null, this._storeOnUpdate = null, h.destroy.call(this)
        }, m._prepareProperties = function() {
            var t, e, i = 0,
                r = {},
                s = {},
                m = {};
            if (this._propsEase) {
                for (t in this._propsTo) this._propsTo.hasOwnProperty(t) && (e = this._propsEase[t], a(e) && (e = l.create(e).toEasingFunction()), void 0 === e ? (void 0 === r[this._ease] && (r[this._ease] = {}, s[this._ease] = {}, m[this._ease] = this._ease.easingFunction, i++), r[this._ease][t] = this._propsTo[t], s[this._ease][t] = this._propsFrom[t]) : "function" == typeof e ? (r[i] = {}, s[i] = {}, r[i][t] = this._propsTo[t], s[i][t] = this._propsFrom[t], m[i] = e, i++) : (void 0 === r[e] && (r[e] = {}, s[e] = {}, m[e] = e, i++), r[e][t] = this._propsTo[t], s[e][t] = this._propsFrom[t]));
                if (i > 1) {
                    var d = n(this._options || {}, !0),
                        p = .001 * this._duration;
                    this._storeOnUpdate = this._onUpdate, this._onUpdate = this._onUpdateClips, d.onStart = null, d.onUpdate = null, d.onDraw = null, d.onComplete = null, this._clips = [];
                    for (e in r) r.hasOwnProperty(e) && (d.ease = m[e], d.propsFrom = s[e], this._clips.push(new c(this._target, p, r[e], d)));
                    e = "linear", this._propsTo = {}, this._propsFrom = {}
                } else
                    for (t in m) m.hasOwnProperty(t) && (e = m[t]);
                void 0 !== e && (this._ease = "function" == typeof e ? new u(e) : o(e))
            }
            return h._prepareProperties.call(this)
        }, m._onUpdateClips = function(t) {
            for (var e = 1 === this._direction ? t.progress() : 1 - t.progress(), i = this._clips.length; i--;) this._clips[i].progress(e);
            "function" == typeof this._storeOnUpdate && this._storeOnUpdate.call(this, this)
        }, e.exports = r
    }, {
        "../helpers/BezierCurveCssManager": 103,
        "../helpers/isCssCubicBezierString": 109,
        "@marcom/ac-clip": 19,
        "@marcom/ac-easing": 88,
        "@marcom/ac-object/clone": 168,
        "@marcom/ac-object/create": 169
    }],
    100: [function(t, e, i) {
        "use strict";

        function r(t, e, i, r) {
            r = r || {}, this._el = t, this._storeOnStart = r.onStart || null, this._storeOnDraw = r.onDraw || null, this._storeOnComplete = r.onComplete || null, r.onStart = this._onStart, r.onDraw = this._onDraw, r.onComplete = this._onComplete, u.call(this, {}, e, i, r)
        }
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            s = t("@marcom/ac-dom-styles/setStyle"),
            o = t("../helpers/convertToStyleObject"),
            a = t("../helpers/convertToTransitionableObjects"),
            l = t("@marcom/ac-object/create"),
            c = t("../helpers/removeTransitions"),
            u = t("./ClipEasing"),
            h = u.prototype,
            m = r.prototype = l(h);
        m.play = function() {
            var t = h.play.call(this);
            return 0 !== this._remainingDelay && s(this._el, o(this._target)), t
        }, m.reset = function() {
            var t = h.reset.call(this);
            return s(this._el, o(this._target)), t
        }, m.destroy = function() {
            return this._el = null, this._completeStyles = null, this._storeOnStart = null, this._storeOnDraw = null, this._storeOnComplete = null, h.destroy.call(this)
        }, m.target = function() {
            return this._el
        }, m._prepareProperties = function() {
            var t = a(this._el, this._propsTo, this._propsFrom);
            this._target = t.target, this._propsFrom = t.propsFrom, this._propsTo = t.propsTo, c(this._el, this._target);
            var e = this._isYoyo ? this._propsFrom : this._propsTo;
            if (this._completeStyles = o(e), void 0 !== this._options.removeStylesOnComplete) {
                var i, r = this._options.removeStylesOnComplete;
                if ("boolean" == typeof r && r)
                    for (i in this._completeStyles) this._completeStyles.hasOwnProperty(i) && (this._completeStyles[i] = null);
                else if ("object" === ("undefined" == typeof r ? "undefined" : n(r)) && r.length)
                    for (var s = r.length; s--;) i = r[s], this._completeStyles.hasOwnProperty(i) && (this._completeStyles[i] = null)
            }
            return h._prepareProperties.call(this)
        }, m._onStart = function(t) {
            this.playing() && 1 === this._direction && 0 === this._delay && s(this._el, o(this._propsFrom)), "function" == typeof this._storeOnStart && this._storeOnStart.call(this, this)
        }, m._onDraw = function(t) {
            s(this._el, o(this._target)), "function" == typeof this._storeOnDraw && this._storeOnDraw.call(this, this)
        }, m._onComplete = function(t) {
            s(this._el, this._completeStyles), "function" == typeof this._storeOnComplete && this._storeOnComplete.call(this, this)
        }, e.exports = r
    }, {
        "../helpers/convertToStyleObject": 106,
        "../helpers/convertToTransitionableObjects": 107,
        "../helpers/removeTransitions": 110,
        "./ClipEasing": 99,
        "@marcom/ac-dom-styles/setStyle": 78,
        "@marcom/ac-object/create": 169
    }],
    101: [function(t, e, i) {
        "use strict";

        function r(t, e, i, r) {
            if (r = r || {}, this._el = t, this._storeEase = r.ease, "function" == typeof this._storeEase) throw new Error(w);
            this._storeOnStart = r.onStart || null, this._storeOnComplete = r.onComplete || null, r.onStart = this._onStart.bind(this), r.onComplete = this._onComplete.bind(this), this._stylesTo = c(i, !0), this._stylesFrom = r.propsFrom ? c(r.propsFrom, !0) : {}, this._propsEase = r.propsEase ? c(r.propsEase, !0) : {}, m(r.ease) && (r.ease = _.create(r.ease).toEasingFunction()), g.call(this, {}, e, {}, r), this._propsFrom = {}
        }
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            s = t("@marcom/ac-dom-styles/setStyle"),
            o = t("@marcom/ac-dom-styles/getStyle"),
            a = t("../helpers/convertToStyleObject"),
            l = t("../helpers/convertToTransitionableObjects"),
            c = t("@marcom/ac-object/clone"),
            u = t("@marcom/ac-object/create"),
            h = t("@marcom/ac-easing").createPredefined,
            m = t("../helpers/isCssCubicBezierString"),
            d = t("../helpers/removeTransitions"),
            p = t("../helpers/transitionEnd"),
            f = t("../helpers/waitAnimationFrames"),
            _ = t("../helpers/BezierCurveCssManager"),
            g = t("@marcom/ac-clip").Clip,
            v = t("./ClipEasing"),
            y = t("@marcom/ac-page-visibility").PageVisibilityManager,
            b = "ease",
            E = "%EASE% is not a supported predefined ease when transitioning with Elements and CSS transition. If you need to use %EASE% then pass the inlineStyle:true option.",
            w = "Function eases are not supported when using CSS transitions with Elements. Either use a cubic-bezier string (e.g. 'cubic-bezier(0, 0, 1, 1)' or pass the inlineStyle option as `true` to render styles each frame instead of using CSS transitions.",
            T = g.prototype,
            S = r.prototype = u(T);
        S.play = function() {
            var t = T.play.call(this);
            return 1 === this._direction && 0 === this.progress() && 0 !== this._remainingDelay && this._applyStyles(0, a(this._stylesFrom)), t
        }, S.reset = function() {
            var t = T.reset.call(this);
            return this._stylesClip.reset(), this._applyStyles(0, a(this._styles)), t
        }, S.destroy = function() {
            return y.off("changed", this._onVisibilityChanged), this._removeTransitionListener(), this.off("pause", this._onPaused), this._onPaused(), this._stylesClip.destroy(), this._stylesClip = null, this._el = null, this._propsArray = null, this._styles = null, this._stylesFrom = null, this._stylesTo = null, this._completeStyles = null, this._storeOnStart = null, this._storeOnComplete = null, this._onTransitionEnded = null, T.destroy.call(this)
        }, S.target = function() {
            return this._el
        }, S.duration = function(t) {
            var e = T.duration.call(this, t);
            return void 0 === t ? e : (this.playing() && this.progress(this._progress), e)
        }, S.progress = function(t) {
            var e = T.progress.call(this, t);
            return void 0 === t ? e : (t = 1 === this._direction ? t : 1 - t, this._stylesClip.progress(t), this._applyStyles(0, a(this._styles)), this.playing() && (this._isWaitingForStylesToBeApplied = !0, f(this._setStylesAfterWaiting, 2)), e)
        }, S._prepareProperties = function() {
            var t = l(this._el, this._stylesTo, this._stylesFrom);
            this._styles = t.target, this._stylesTo = t.propsTo, this._stylesFrom = t.propsFrom;
            var e = this._storeEase || b;
            this._eases = {}, this._propsArray = [];
            var i;
            this._styleCompleteTo = a(this._stylesTo), this._styleCompleteFrom = a(this._stylesFrom), this._propsEaseKeys = {};
            var r;
            for (r in this._stylesTo) this._stylesTo.hasOwnProperty(r) && (this._propsArray[this._propsArray.length] = r, void 0 === this._propsEase[r] ? (void 0 === this._eases[e] && (i = this._convertEase(e), this._eases[e] = i.css), this._propsEaseKeys[r] = e) : void 0 === this._eases[this._propsEase[r]] ? (i = this._convertEase(this._propsEase[r]), this._eases[this._propsEase[r]] = i.css, this._propsEaseKeys[r] = this._propsEase[r], this._propsEase[r] = i.js) : m(this._propsEase[r]) && (this._propsEaseKeys[r] = this._propsEase[r], this._propsEase[r] = this._eases[this._propsEase[r]][1].toEasingFunction()));
            if (this._onPaused = this._onPaused.bind(this), this.on("pause", this._onPaused), this._setOtherTransitions(), this._currentTransitionStyles = this._otherTransitions, this._completeStyles = a(this._isYoyo ? this._stylesFrom : this._stylesTo), void 0 !== this._options.removeStylesOnComplete) {
                var s = this._options.removeStylesOnComplete;
                if ("boolean" == typeof s && s)
                    for (r in this._stylesTo) this._completeStyles[r] = null;
                else if ("object" === ("undefined" == typeof s ? "undefined" : n(s)) && s.length)
                    for (var o = s.length; o--;) this._completeStyles[s[o]] = null
            }
            return this._onTransitionEnded = this._onTransitionEnded.bind(this), this._setStylesAfterWaiting = this._setStylesAfterWaiting.bind(this), this._onVisibilityChanged = this._onVisibilityChanged.bind(this), y.on(y.CHANGED, this._onVisibilityChanged), this._stylesClip = new v(this._styles, 1, this._stylesTo, {
                ease: this._options.ease,
                propsFrom: this._stylesFrom,
                propsEase: this._options.propsEase
            }), g._remove(this._stylesClip), T._prepareProperties.call(this)
        }, S._convertEase = function(t) {
            if ("function" == typeof t) throw new Error(w);
            var e, i;
            if (m(t)) e = _.create(t), i = e.toEasingFunction();
            else {
                var r = h(t);
                if (null === r.cssString) throw new Error(E.replace(/%EASE%/g, t));
                e = _.create(r.cssString), i = t
            }
            return {
                css: {
                    1: e,
                    "-1": e.reversed()
                },
                js: i
            }
        }, S._complete = function() {
            !this._isWaitingForStylesToBeApplied && !this._isTransitionEnded && this._isListeningForTransitionEnd || 1 !== this.progress() || (this._isWaitingForStylesToBeApplied = !1, T._complete.call(this))
        }, S._onTransitionEnded = function() {
            this._isTransitionEnded = !0, this._complete()
        }, S._addTransitionListener = function() {
            !this._isListeningForTransitionEnd && this._el && this._onTransitionEnded && (this._isListeningForTransitionEnd = !0, this._isTransitionEnded = !1, this._el.addEventListener(p, this._onTransitionEnded))
        }, S._removeTransitionListener = function() {
            this._isListeningForTransitionEnd && this._el && this._onTransitionEnded && (this._isListeningForTransitionEnd = !1, this._isTransitionEnded = !1, this._el.removeEventListener(p, this._onTransitionEnded))
        }, S._applyStyles = function(t, e) {
            if (t > 0) {
                var i, r = "",
                    n = {};
                for (i in this._eases) this._eases.hasOwnProperty(i) && (n[i] = this._eases[i][this._direction].splitAt(this.progress()).toCSSString());
                for (i in this._stylesTo) this._stylesTo.hasOwnProperty(i) && (r += i + " " + t + "ms " + n[this._propsEaseKeys[i]] + " 0ms, ");
                this._currentTransitionStyles = r.substr(0, r.length - 2), this._doStylesMatchCurrentStyles(e) ? this._removeTransitionListener() : this._addTransitionListener()
            } else this._currentTransitionStyles = "", this._removeTransitionListener();
            e.transition = this._getOtherClipTransitionStyles() + this._currentTransitionStyles, s(this._el, e)
        }, S._doStylesMatchCurrentStyles = function(t) {
            var e, i = o.apply(this, [this._el].concat([this._propsArray]));
            for (e in t)
                if (t.hasOwnProperty(e) && i.hasOwnProperty(e) && t[e] !== i[e]) return !1;
            return !0
        }, S._setStylesAfterWaiting = function() {
            if (this._isWaitingForStylesToBeApplied = !1, this.playing()) {
                var t = this._durationMs * (1 - this.progress()),
                    e = this._direction > 0 ? this._styleCompleteTo : this._styleCompleteFrom;
                this._applyStyles(t, e)
            }
        }, S._setOtherTransitions = function() {
            d(this._el, this._stylesTo);
            for (var t = g.getAll(this._el), e = t.length; e--;)
                if (t[e] !== this && t[e].playing() && t[e]._otherTransitions && t[e]._otherTransitions.length) return void(this._otherTransitions = t[e]._otherTransitions);
            this._otherTransitions = o(this._el, "transition").transition, null !== this._otherTransitions && "all 0s ease 0s" !== this._otherTransitions || (this._otherTransitions = "")
        }, S._getTransitionStyles = function() {
            var t = this._getOtherClipTransitionStyles();
            return this._otherTransitions.length ? t += this._otherTransitions : t.length && (t = t.substr(0, t.length - 2)), t
        }, S._getOtherClipTransitionStyles = function() {
            for (var t = "", e = g.getAll(this._el), i = e.length; i--;) e[i] !== this && e[i].playing() && e[i]._currentTransitionStyles && e[i]._currentTransitionStyles.length && (t += e[i]._currentTransitionStyles + ", ");
            return t
        }, S._onVisibilityChanged = function(t) {
            if (this.playing() && !t.isHidden) {
                this._update({
                    timeNow: this._getTime()
                });
                var e = this.progress();
                e < 1 && this.progress(e)
            }
        }, S._onPaused = function(t) {
            var e = o.apply(this, [this._el].concat([this._propsArray]));
            e.transition = this._getTransitionStyles(), this._removeTransitionListener(), s(this._el, e)
        }, S._onStart = function(t) {
            var e = 1 === this._direction && 0 === this.progress() && 0 === this._delay ? 2 : 0;
            e && (this._isWaitingForStylesToBeApplied = !0, this._applyStyles(0, this._styleCompleteFrom)), f(this._setStylesAfterWaiting, e), "function" == typeof this._storeOnStart && this._storeOnStart.call(this, this)
        }, S._onComplete = function(t) {
            this._removeTransitionListener(), this._completeStyles.transition = this._getTransitionStyles(), s(this._el, this._completeStyles), "function" == typeof this._storeOnComplete && this._storeOnComplete.call(this, this)
        }, e.exports = r
    }, {
        "../helpers/BezierCurveCssManager": 103,
        "../helpers/convertToStyleObject": 106,
        "../helpers/convertToTransitionableObjects": 107,
        "../helpers/isCssCubicBezierString": 109,
        "../helpers/removeTransitions": 110,
        "../helpers/transitionEnd": 113,
        "../helpers/waitAnimationFrames": 114,
        "./ClipEasing": 99,
        "@marcom/ac-clip": 19,
        "@marcom/ac-dom-styles/getStyle": 76,
        "@marcom/ac-dom-styles/setStyle": 78,
        "@marcom/ac-easing": 88,
        "@marcom/ac-object/clone": 168,
        "@marcom/ac-object/create": 169,
        "@marcom/ac-page-visibility": 172
    }],
    102: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            this.manager = e, this.p1 = {
                x: t[0],
                y: t[1]
            }, this.p2 = {
                x: t[2],
                y: t[3]
            }, this._isLinear = this.p1.x === this.p1.y && this.p2.x === this.p2.y, this._cacheSplits = {}
        }
        var n = t("@marcom/ac-easing").createBezier,
            s = r.prototype;
        s.splitAt = function(t) {
            if (this._isLinear) return this;
            if (t = Math.round(40 * t) / 40, 0 === t) return this;
            if (void 0 !== this._cacheSplits[t]) return this._cacheSplits[t];
            for (var e = [this.p1.x, this.p2.x], i = [this.p1.y, this.p2.y], r = 0, n = t, s = 0, o = 1, a = this._getStartX(t, e); n !== a && r < 1e3;) n < a ? o = t : s = t, t = s + .5 * (o - s), a = this._getStartX(t, e), ++r;
            var l = this._splitBezier(t, e, i),
                c = this._normalize(l),
                u = this.manager.create(c);
            return this._cacheSplits[n] = u, u
        }, s.reversed = function() {
            var t = this.toArray();
            return this.manager.create([.5 - (t[2] - .5), .5 - (t[3] - .5), .5 - (t[0] - .5), .5 - (t[1] - .5)])
        }, s.toArray = function() {
            return [this.p1.x, this.p1.y, this.p2.x, this.p2.y]
        }, s.toCSSString = function() {
            return "cubic-bezier(" + this.p1.x + ", " + this.p1.y + ", " + this.p2.x + ", " + this.p2.y + ")"
        }, s.toEasingFunction = function() {
            return n.apply(this, this.toArray()).easingFunction
        }, s._getStartX = function(t, e) {
            var i = t - 1,
                r = t * t,
                n = i * i,
                s = r * t;
            return s - 3 * r * i * e[1] + 3 * t * n * e[0]
        }, s._splitBezier = function(t, e, i) {
            var r = t - 1,
                n = t * t,
                s = r * r,
                o = n * t;
            return [o - 3 * n * r * e[1] + 3 * t * s * e[0], o - 3 * n * r * i[1] + 3 * t * s * i[0], n - 2 * t * r * e[1] + s * e[0], n - 2 * t * r * i[1] + s * i[0], t - r * e[1], t - r * i[1]]
        }, s._normalize = function(t) {
            return [(t[2] - t[0]) / (1 - t[0]), (t[3] - t[1]) / (1 - t[1]), (t[4] - t[0]) / (1 - t[0]), (t[5] - t[1]) / (1 - t[1])]
        }, e.exports = r
    }, {
        "@marcom/ac-easing": 88
    }],
    103: [function(t, e, i) {
        "use strict";

        function r() {
            this._instances = {}
        }
        var n = t("./BezierCurveCss"),
            s = r.prototype;
        s.create = function(t) {
            var e;
            if (e = "string" == typeof t ? t.replace(/ /g, "") : "cubic-bezier(" + t.join(",") + ")", void 0 === this._instances[e]) {
                if ("string" == typeof t) {
                    t = t.match(/\d*\.?\d+/g);
                    for (var i = t.length; i--;) t[i] = Number(t[i])
                }
                this._instances[e] = new n(t, this)
            }
            return this._instances[e]
        }, e.exports = new r
    }, {
        "./BezierCurveCss": 102
    }],
    104: [function(t, e, i) {
        "use strict";
        "undefined" == typeof window.Float32Array && (window.Float32Array = function() {})
    }, {}],
    105: [function(t, e, i) {
        "use strict";

        function r(t, e, i) {
            this._transform = t;
            var r, n, o;
            for (o in i) i.hasOwnProperty(o) && "function" == typeof this._transform[o] && (r = s(i[o]), n = "%" === r.unit ? this._convertPercentToPixelValue(o, r.value, e) : r.value, this._transform[o].call(this._transform, n))
        }
        var n = t("@marcom/ac-dom-metrics/getDimensions"),
            s = t("./splitUnits"),
            o = {
                translateX: "width",
                translateY: "height"
            },
            a = r.prototype;
        a._convertPercentToPixelValue = function(t, e, i) {
            t = o[t];
            var r = n(i);
            return r[t] ? (e *= .01, r[t] * e) : e
        }, a.toArray = function() {
            return this._transform.toArray()
        }, a.toCSSString = function() {
            return this._transform.toCSSString()
        }, e.exports = r
    }, {
        "./splitUnits": 111,
        "@marcom/ac-dom-metrics/getDimensions": 58
    }],
    106: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e, i, r = {};
            for (i in t) t.hasOwnProperty(i) && null !== t[i] && (t[i].isColor ? t[i].isRgb ? r[i] = "rgb(" + Math.round(t[i].r) + ", " + Math.round(t[i].g) + ", " + Math.round(t[i].b) + ")" : t[i].isRgba && (r[i] = "rgba(" + Math.round(t[i].r) + ", " + Math.round(t[i].g) + ", " + Math.round(t[i].b) + ", " + t[i].a + ")") : "transform" === i ? (e = 6 === t[i].length ? "matrix" : "matrix3d", r[i] = e + "(" + t[i].join(",") + ")") : t[i].unit ? r[i] = t[i].value + t[i].unit : r[i] = t[i].value);
            return r
        }
    }, {}],
    107: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-dom-styles/getStyle"),
            n = t("@marcom/ac-object/clone"),
            s = t("./splitUnits"),
            o = t("./toCamCase"),
            a = t("@marcom/ac-color").Color,
            l = t("@marcom/ac-feature/cssPropertyAvailable"),
            c = t("@marcom/ac-transform").Transform,
            u = t("./TransformMatrix"),
            h = function(t) {
                return a.isRgba(t) ? (t = new a(t).rgbaObject(), t.isRgba = !0) : (t = new a(t).rgbObject(), t.isRgb = !0), t.isColor = !0, t
            },
            m = function(t) {
                t.isRgb && (t.isRgb = !1, t.isRgba = !0, t.a = 1)
            },
            d = function(t, e, i) {
                (t.isRgba || e.isRgba || i.isRgba) && (m(t), m(e), m(i))
            },
            p = function(t) {
                return [t[0], t[1], 0, 0, t[2], t[3], 0, 0, 0, 0, 1, 0, t[4], t[5], 0, 1]
            },
            f = function(t, e, i) {
                16 !== t.transform.length && 16 !== e.transform.length && 16 !== i.transform.length || (6 === t.transform.length && (t.transform = p(t.transform)), 6 === e.transform.length && (e.transform = p(e.transform)), 6 === i.transform.length && (i.transform = p(i.transform)))
            };
        e.exports = function(t, e, i) {
            var m = {};
            e = n(e, !0), i = n(i, !0);
            var p, _, g, v, y, b = l("transform");
            for (y in e) e.hasOwnProperty(y) && null !== e[y] && ("transform" === y ? (b && (_ = new c, p = r(t, "transform").transform || "none", _.setMatrixValue(p), g = new u(new c, t, e[y])), g && g.toCSSString() !== _.toCSSString() ? (v = new u(i[y] ? new c : _.clone(), t, i[y]), m[y] = _.toArray(), e[y] = g.toArray(), i[y] = v.toArray()) : (m[y] = null, e[y] = null)) : (p = r(t, y)[o(y)] || i[y], a.isColor(p) ? (m[y] = h(p), i[y] = void 0 !== i[y] ? h(i[y]) : n(m[y], !0), e[y] = h(e[y])) : (m[y] = s(p), i[y] = void 0 !== i[y] ? s(i[y]) : n(m[y], !0), e[y] = s(e[y]))));
            for (y in i) !i.hasOwnProperty(y) || null === i[y] || void 0 !== e[y] && null !== e[y] || ("transform" === y ? (b && (_ = new c, _.setMatrixValue(getComputedStyle(t).transform || getComputedStyle(t).webkitTransform || "none"), v = new u(new c, t, i[y])), v && v.toCSSString() !== _.toCSSString() ? (g = new u(_.clone()), m[y] = _.toArray(), e[y] = g.toArray(), i[y] = v.toArray()) : (m[y] = null, e[y] = null, i[y] = null)) : (p = r(t, y)[o(y)], a.isColor(p) ? (m[y] = h(p), e[y] = n(m[y], !0), i[y] = h(i[y])) : (m[y] = s(p), i[y] = s(i[y]), e[y] = n(m[y], !0)))), m[y] && m[y].isColor && d(m[y], i[y], e[y]);
            return m.transform && f(m, i, e), {
                target: m,
                propsTo: e,
                propsFrom: i
            }
        }
    }, {
        "./TransformMatrix": 105,
        "./splitUnits": 111,
        "./toCamCase": 112,
        "@marcom/ac-color": 25,
        "@marcom/ac-dom-styles/getStyle": 76,
        "@marcom/ac-feature/cssPropertyAvailable": 123,
        "@marcom/ac-object/clone": 168,
        "@marcom/ac-transform": 211
    }],
    108: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            if (t.transitionProperty) {
                for (var e = "", i = t.transitionProperty.split(", "), r = t.transitionDuration.split(", "), n = t.transitionTimingFunction.replace(/\d+[,]+[\s]/gi, function(t) {
                        return t.substr(0, t.length - 1)
                    }).split(", "), s = t.transitionDelay.split(", "), o = i.length; o--;) e += i[o] + " " + r[o] + " " + n[o] + " " + s[o] + ", ";
                return e.substr(0, e.length - 2)
            }
            return !1
        }
    }, {}],
    109: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return "string" == typeof t && "cubic-bezier(" === t.substr(0, 13)
        }
    }, {}],
    110: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-dom-styles/setStyle"),
            n = t("@marcom/ac-dom-styles/getStyle"),
            s = t("./getShorthandTransition");
        e.exports = function(t, e) {
            var i = n(t, "transition", "transition-property", "transition-duration", "transition-timing-function", "transition-delay");
            if (i = i.transition || s(i), i && i.length) {
                i = i.split(",");
                for (var o, a = 0, l = i.length; l--;) o = i[l].trim().split(" ")[0], void 0 !== e[o] && (i.splice(l, 1), ++a);
                a && (0 === i.length && (i = ["all"]), r(t, {
                    transition: i.join(",").trim()
                }))
            }
        }
    }, {
        "./getShorthandTransition": 108,
        "@marcom/ac-dom-styles/getStyle": 76,
        "@marcom/ac-dom-styles/setStyle": 78
    }],
    111: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            if (t = String(t), t.indexOf(" ") > -1) throw new Error("Shorthand CSS is not supported. Please use longhand CSS only.");
            var e = /(\d*\.?\d*)(.*)/,
                i = 1;
            t && "-" === t.substr(0, 1) && (t = t.substr(1), i = -1);
            var r = String(t).match(e);
            return {
                value: Number(r[1]) * i,
                unit: r[2]
            }
        }
    }, {}],
    112: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = function(t, e, i, r) {
                return 0 === i && "moz" !== r.substr(1, 3) ? e : e.toUpperCase()
            };
            return t.replace(/-(\w)/g, e)
        }
    }, {}],
    113: [function(t, e, i) {
        "use strict";
        var r;
        e.exports = function() {
            if (r) return r;
            var t, e = document.createElement("fakeelement"),
                i = {
                    transition: "transitionend",
                    OTransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd"
                };
            for (t in i)
                if (void 0 !== e.style[t]) return r = i[t]
        }()
    }, {}],
    114: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-page-visibility").PageVisibilityManager;
        e.exports = function(t, e) {
            if (e) {
                var i = function(t) {
                        r.isHidden ? setTimeout(t, 16) : window.requestAnimationFrame(t)
                    },
                    n = 0,
                    s = function o() {
                        n === e ? t.call(this) : (++n, i(o))
                    };
                s()
            } else t.call(this)
        }
    }, {
        "@marcom/ac-page-visibility": 172
    }],
    115: [function(t, e, i) {
        "use strict";

        function r(t) {
            t = t || {}, t.ease = t.ease || "linear", t.destroyOnComplete = !1, this.options = t, s.call(this, {
                t: 0
            }, 0, {
                t: 1
            }, t), this._itemList = new l
        }
        var n = t("@marcom/ac-object/create"),
            s = t("@marcom/ac-clip").Clip,
            o = t("./TimelineClip"),
            a = t("./TimelineCallback"),
            l = t("./TimelineItemList"),
            c = s.prototype,
            u = r.prototype = n(c);
        r.prototype.constructor = r, u._update = function(t) {
            c._update.call(this, t), this._render()
        }, u.progress = function(t) {
            return c.progress.call(this, t), void 0 !== t && this._render(), this._progress
        }, u._render = function() {
            if (0 !== this._itemList.length)
                for (var t = this._target.t * this._duration, e = this._itemList.head, i = e; i;) {
                    i = e.next;
                    var r = t - e.position;
                    e.currentTime(r), e = i
                }
        }, u.addClip = function(t, e) {
            e = void 0 === e ? this.duration() : e;
            var i = t._delay / 1e3;
            this._itemList.append(new o(t, e + i)), this._updateDuration()
        }, u.addCallback = function(t, e) {
            e = void 0 === e ? this.duration() : e, this._itemList.append(new a(t, e)), this._updateDuration()
        }, u.remove = function(t) {
            var e = this._itemList.getItem(t);
            e && (this._itemList.remove(e), this._updateDuration())
        }, u._updateDuration = function() {
            var t = this._itemList.head,
                e = t.position + t.duration();
            this._itemList.forEach(function(i) {
                var r = i.position + i.duration();
                r >= e && (t = i, e = r)
            }), this.duration(e)
        }, u.destroy = function() {
            for (var t = this._itemList.head; t;) {
                var e = t;
                t = e.next, this._itemList.remove(e)
            }
            return this._duration = 0, c.destroy.call(this)
        }, e.exports = r
    }, {
        "./TimelineCallback": 116,
        "./TimelineClip": 117,
        "./TimelineItemList": 118,
        "@marcom/ac-clip": 19,
        "@marcom/ac-object/create": 169
    }],
    116: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            this.callback = t, this._delay = 0, this.position = e, this._hasTriggered = !1, this.prev = null, this.next = null
        }
        var n = r.prototype;
        n.duration = function() {
            return 0
        }, n.currentTime = function(t) {
            return t >= 0 && !this._hasTriggered && (this.callback(), this._hasTriggered = !0), t < 0 && this._hasTriggered && (this.callback(), this._hasTriggered = !1), 0
        }, e.exports = r
    }, {}],
    117: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            this.clip = t, this.position = e, this.duration = this.clip.duration.bind(this.clip), this.lastProgress = -1, this.prev = null, this.next = null
        }
        var n = r.prototype;
        n.currentTime = function(t) {
            var e = Math.min(1, Math.max(0, t / this.clip._duration));
            return e !== e && (e = 1), this.lastProgress === e ? this.lastProgress : (0 !== this.lastProgress && 0 !== e && this.lastProgress !== -1 || this.clip._storeOnStart && this.clip._storeOnStart(this.clip), this.clip._playing = e * this.clip._duration === this.clip._duration, this.lastProgress = this.clip.progress(e), this.lastProgress)
        }, n.destroy = function() {
            this.clip.destroy(), this.prev = null, this.next = null, this.duration = null
        }, e.exports = r
    }, {}],
    118: [function(t, e, i) {
        "use strict";
        var r = t("./TimelineClip"),
            n = t("./TimelineCallback"),
            s = function() {
                this.head = null, this.tail = null, this.length = 0
            },
            o = s.prototype;
        o.append = function(t) {
            t.prev = null, t.next = null, this.tail ? (this.tail.next = t, t.prev = this.tail) : this.head = t, this.tail = t, this.length++
        }, o.remove = function(t) {
            t === this.head ? this.head = this.head.next : t === this.tail && (this.tail = this.tail.prev), t.prev && (t.prev.next = t.next), t.next && (t.next.prev = t.prev), t.next = t.prev = null, null === this.head && (this.tail = null), this.length--
        }, o.getItem = function(t) {
            for (var e = this.head; e;) {
                var i = e;
                if (i instanceof r && i.clip === t || i instanceof n && i.callback === t) return i;
                e = i.next
            }
            return null
        }, o.forEach = function(t) {
            for (var e = 0, i = this.head; i;) {
                var r = i;
                t(r, e, this.length), i = r.next
            }
        }, o.destroy = function() {
            for (; this.head;) {
                var t = this.head;
                this.remove(t), t.destroy()
            }
        }, e.exports = s
    }, {
        "./TimelineCallback": 116,
        "./TimelineClip": 117
    }],
    119: [function(t, e, i) {
        "use strict";
        e.exports = {
            EventEmitterMicro: t("./ac-event-emitter-micro/EventEmitterMicro")
        }
    }, {
        "./ac-event-emitter-micro/EventEmitterMicro": 120
    }],
    120: [function(t, e, i) {
        "use strict";

        function r() {
            this._events = {}
        }
        var n = r.prototype;
        n.on = function(t, e) {
            this._events[t] = this._events[t] || [], this._events[t].unshift(e)
        }, n.once = function(t, e) {
            function i(n) {
                r.off(t, i), void 0 !== n ? e(n) : e()
            }
            var r = this;
            this.on(t, i)
        }, n.off = function(t, e) {
            if (this.has(t)) {
                var i = this._events[t].indexOf(e);
                i !== -1 && this._events[t].splice(i, 1)
            }
        }, n.trigger = function(t, e) {
            if (this.has(t))
                for (var i = this._events[t].length - 1; i >= 0; i--) void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
        }, n.has = function(t) {
            return t in this._events != !1 && 0 !== this._events[t].length
        }, n.destroy = function() {
            for (var t in this._events) this._events[t] = null;
            this._events = null
        }, e.exports = r
    }, {}],
    121: [function(t, e, i) {
        "use strict";
        e.exports.EventEmitter = t("./ac-event-emitter/EventEmitter")
    }, {
        "./ac-event-emitter/EventEmitter": 122
    }],
    122: [function(t, e, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            n = "EventEmitter:propagation",
            s = function(t) {
                t && (this.context = t)
            },
            o = s.prototype,
            a = function() {
                return this.hasOwnProperty("_events") || "object" === r(this._events) || (this._events = {}), this._events
            },
            l = function(t, e) {
                var i = t[0],
                    n = t[1],
                    s = t[2];
                if ("string" != typeof i && "object" !== ("undefined" == typeof i ? "undefined" : r(i)) || null === i || Array.isArray(i)) throw new TypeError("Expecting event name to be a string or object.");
                if ("string" == typeof i && !n) throw new Error("Expecting a callback function to be provided.");
                if (n && "function" != typeof n) {
                    if ("object" !== ("undefined" == typeof i ? "undefined" : r(i)) || "object" !== ("undefined" == typeof n ? "undefined" : r(n))) throw new TypeError("Expecting callback to be a function.");
                    s = n
                }
                if ("object" === ("undefined" == typeof i ? "undefined" : r(i)))
                    for (var o in i) e.call(this, o, i[o], s);
                "string" == typeof i && (i = i.split(" "), i.forEach(function(t) {
                    e.call(this, t, n, s)
                }, this))
            },
            c = function(t, e) {
                var i, r, n;
                if (i = a.call(this)[t], i && 0 !== i.length)
                    for (i = i.slice(), this._stoppedImmediatePropagation = !1, r = 0, n = i.length; r < n && (!this._stoppedImmediatePropagation && !e(i[r], r)); r++);
            },
            u = function(t, e, i) {
                var r = -1;
                c.call(this, e, function(t, e) {
                    if (t.callback === i) return r = e, !0
                }), r !== -1 && t[e].splice(r, 1)
            };
        o.on = function() {
            var t = a.call(this);
            return l.call(this, arguments, function(e, i, r) {
                t[e] = t[e] || (t[e] = []), t[e].push({
                    callback: i,
                    context: r
                })
            }), this
        }, o.once = function() {
            return l.call(this, arguments, function(t, e, i) {
                var r = function n(r) {
                    e.call(i || this, r), this.off(t, n)
                };
                this.on(t, r, this)
            }), this
        }, o.off = function(t, e) {
            var i = a.call(this);
            if (0 === arguments.length) this._events = {};
            else if (!t || "string" != typeof t && "object" !== ("undefined" == typeof t ? "undefined" : r(t)) || Array.isArray(t)) throw new TypeError("Expecting event name to be a string or object.");
            if ("object" === ("undefined" == typeof t ? "undefined" : r(t)))
                for (var n in t) u.call(this, i, n, t[n]);
            if ("string" == typeof t) {
                var s = t.split(" ");
                1 === s.length ? e ? u.call(this, i, t, e) : i[t] = [] : s.forEach(function(t) {
                    i[t] = []
                })
            }
            return this
        }, o.trigger = function(t, e, i) {
            if (!t) throw new Error("trigger method requires an event name");
            if ("string" != typeof t) throw new TypeError("Expecting event names to be a string.");
            if (i && "boolean" != typeof i) throw new TypeError("Expecting doNotPropagate to be a boolean.");
            return t = t.split(" "), t.forEach(function(t) {
                c.call(this, t, function(t) {
                    t.callback.call(t.context || this.context || this, e)
                }.bind(this)), i || c.call(this, n, function(i) {
                    var r = t;
                    i.prefix && (r = i.prefix + r), i.emitter.trigger(r, e)
                })
            }, this), this
        }, o.propagateTo = function(t, e) {
            var i = a.call(this);
            i[n] || (this._events[n] = []), i[n].push({
                emitter: t,
                prefix: e
            })
        }, o.stopPropagatingTo = function(t) {
            var e = a.call(this);
            if (!t) return void(e[n] = []);
            var i, r = e[n],
                s = r.length;
            for (i = 0; i < s; i++)
                if (r[i].emitter === t) {
                    r.splice(i, 1);
                    break
                }
        }, o.stopImmediatePropagation = function() {
            this._stoppedImmediatePropagation = !0
        }, o.has = function(t, e, i) {
            var r = a.call(this),
                n = r[t];
            if (0 === arguments.length) return Object.keys(r);
            if (!n) return !1;
            if (!e) return n.length > 0;
            for (var s = 0, o = n.length; s < o; s++) {
                var l = n[s];
                if (i && e && l.context === i && l.callback === e) return !0;
                if (e && !i && l.callback === e) return !0
            }
            return !1
        }, e.exports = s
    }, {}],
    123: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            return "undefined" != typeof e ? !!n(t, e) : !!s(t)
        }
        var n = t("@marcom/ac-prefixer/getStyleValue"),
            s = t("@marcom/ac-prefixer/getStyleProperty"),
            o = t("@marcom/ac-function/memoize");
        e.exports = o(r), e.exports.original = r
    }, {
        "@marcom/ac-function/memoize": 126,
        "@marcom/ac-prefixer/getStyleProperty": 178,
        "@marcom/ac-prefixer/getStyleValue": 179
    }],
    124: [function(t, e, i) {
        "use strict";
        e.exports = {
            getWindow: function() {
                return window
            },
            getDocument: function() {
                return document
            },
            getNavigator: function() {
                return navigator
            }
        }
    }, {}],
    125: [function(t, e, i) {
        "use strict";

        function r() {
            var t = n.getWindow(),
                e = n.getDocument(),
                i = n.getNavigator();
            return !!("ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch || i.maxTouchPoints > 0 || i.msMaxTouchPoints > 0)
        }
        var n = t("./helpers/globals"),
            s = t("@marcom/ac-function/once");
        e.exports = s(r), e.exports.original = r
    }, {
        "./helpers/globals": 124,
        "@marcom/ac-function/once": 127
    }],
    126: [function(t, e, i) {
        "use strict";
        var r = function() {
            var t, e = "";
            for (t = 0; t < arguments.length; t++) t > 0 && (e += ","), e += arguments[t];
            return e
        };
        e.exports = function(t, e) {
            e = e || r;
            var i = function n() {
                var i = arguments,
                    r = e.apply(this, i);
                return r in n.cache || (n.cache[r] = t.apply(this, i)), n.cache[r]
            };
            return i.cache = {}, i
        }
    }, {}],
    127: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e;
            return function() {
                return "undefined" == typeof e && (e = t.apply(this, arguments)), e
            }
        }
    }, {}],
    128: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            var i = null;
            return function() {
                null === i && (t.apply(this, arguments), i = setTimeout(function() {
                    i = null
                }, e))
            }
        }
    }, {}],
    129: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            var i;
            return e ? (i = t.getBoundingClientRect(), {
                width: i.width,
                height: i.height
            }) : {
                width: t.offsetWidth,
                height: t.offsetHeight
            }
        }
    }, {}],
    130: [function(t, e, i) {
        "use strict";
        var r = t("./getDimensions"),
            n = t("./getScrollX"),
            s = t("./getScrollY");
        e.exports = function(t, e) {
            var i, o, a, l;
            if (e) return i = t.getBoundingClientRect(), o = n(), a = s(), {
                top: i.top + a,
                right: i.right + o,
                bottom: i.bottom + a,
                left: i.left + o
            };
            for (l = r(t, e), i = {
                    top: t.offsetTop,
                    left: t.offsetLeft,
                    width: l.width,
                    height: l.height
                }; t = t.offsetParent;) i.top += t.offsetTop, i.left += t.offsetLeft;
            return {
                top: i.top,
                right: i.left + i.width,
                bottom: i.top + i.height,
                left: i.left
            }
        }
    }, {
        "./getDimensions": 129,
        "./getScrollX": 133,
        "./getScrollY": 134
    }],
    131: [function(t, e, i) {
        "use strict";
        var r = t("./getDimensions"),
            n = t("./getPixelsInViewport");
        e.exports = function(t, e) {
            var i = n(t, e),
                s = r(t, e).height;
            return i / s
        }
    }, {
        "./getDimensions": 129,
        "./getPixelsInViewport": 132
    }],
    132: [function(t, e, i) {
        "use strict";
        var r = t("./getViewportPosition");
        e.exports = function(t, e) {
            var i, n = window.innerHeight,
                s = r(t, e);
            return s.top >= n || s.bottom <= 0 ? 0 : (i = s.bottom - s.top, s.top < 0 && (i += s.top), s.bottom > n && (i -= s.bottom - n), i)
        }
    }, {
        "./getViewportPosition": 135
    }],
    133: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return t = t || window, t === window ? window.scrollX || window.pageXOffset : t.scrollLeft
        }
    }, {}],
    134: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return t = t || window, t === window ? window.scrollY || window.pageYOffset : t.scrollTop
        }
    }, {}],
    135: [function(t, e, i) {
        "use strict";
        var r = t("./getPagePosition"),
            n = t("./getScrollX"),
            s = t("./getScrollY");
        e.exports = function(t, e) {
            var i, o, a;
            return e ? (i = t.getBoundingClientRect(), {
                top: i.top,
                right: i.right,
                bottom: i.bottom,
                left: i.left
            }) : (i = r(t), o = n(), a = s(), {
                top: i.top - a,
                right: i.right - o,
                bottom: i.bottom - a,
                left: i.left - o
            })
        }
    }, {
        "./getPagePosition": 130,
        "./getScrollX": 133,
        "./getScrollY": 134
    }],
    136: [function(t, e, i) {
        "use strict";
        var r = t("./getPixelsInViewport"),
            n = t("./getPercentInViewport");
        e.exports = function(t, e, i) {
            var s;
            return i = i || 0, "string" == typeof i && "px" === i.slice(-2) ? (i = parseInt(i, 10), s = r(t, e)) : s = n(t, e), s > 0 && s >= i
        }
    }, {
        "./getPercentInViewport": 131,
        "./getPixelsInViewport": 132
    }],
    137: [function(t, e, i) {
        "use strict";

        function r(t) {
            t = t || {}, this._wrapAround = t.wrapAround || !1, this._itemType = t.itemType || o, this._items = [], this._itemsIdLookup = {}, this._itemChanged = !1, this.showNext = this.showNext.bind(this), this.showPrevious = this.showPrevious.bind(this), this._update = this._update.bind(this), this._updateItems = this._updateItems.bind(this), s.call(this), t.startAt && this._startAt(t.startAt), r._add(this, t.analyticsOptions)
        }
        var n = t("./singletons/analyticsManager"),
            s = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            o = t("./Item");
        r.FADE = "fade", r.FADE_SELECTOR = "[data-ac-gallery-fade]", r.SLIDE = "slide", r.SLIDE_SELECTOR = "[data-ac-gallery-slide]", r.UPDATE = "update", r.UPDATE_COMPLETE = "update:complete";
        var a = s.prototype,
            l = r.prototype = Object.create(a);
        l.addItem = function(t, e) {
            if (t.nodeType) t = new this._itemType(t);
            else if (this._items.indexOf(t) > -1) return t;
            return "number" == typeof e ? this._items.splice(e, 0, t) : this._items.push(t), 1 === this._items.length ? (t.show(), this._setCurrentItem(t)) : (t.hide(), this.getNextItem() === t && this._setNextItem(t), this.getPreviousItem() === t && this._setPreviousItem(t)), null !== t.getElementId() && (this._itemsIdLookup[t.getElementId()] = t), t.on(o.SELECTED, this._update), t
        }, l.removeItem = function(t, e) {
            e = e || {}, "number" == typeof t && (t = this._items[t]);
            var i = this._items.indexOf(t);
            if (i > -1) {
                var r = this.getNextItem(),
                    n = this.getPreviousItem();
                this._items.splice(i, 1), t.off(o.SELECTED, this._update), r === t && this._setNextItem(this.getNextItem()), n === t && this._setPreviousItem(this.getPreviousItem())
            }
            return t === this._currentItem && this._items.length && e.setCurrentItem !== !1 && (this._update({
                item: this._items[0]
            }), this._setLastItem(null)), e.destroyItem && t.getElement() && t.destroy(), t
        }, l.show = function(t, e) {
            return "number" == typeof t ? t = this._items[t] : "string" == typeof t && (t = this._itemsIdLookup[t]), t && (e = e || {}, this._update({
                item: t,
                interactionEvent: e.interactionEvent
            })), t || null
        }, l.showNext = function(t) {
            var e = this.getNextItem();
            return e && this.show(e, t), e
        }, l.showPrevious = function(t) {
            var e = this.getPreviousItem();
            return e && this.show(e, t), e
        }, l.isInView = function() {
            return this._currentItem && this._currentItem.isInView()
        }, l.getTotalItems = function() {
            return this._items.length
        }, l.getItems = function() {
            return this._items
        }, l.getItem = function(t) {
            return "number" == typeof t ? this.getItemAt(t) : "string" == typeof t ? this.getItemById(t) : void 0
        }, l.getItemAt = function(t) {
            return this._items[t] || null
        }, l.getItemById = function(t) {
            return this._itemsIdLookup[t] || null
        }, l.getItemIndex = function(t) {
            return this._items.indexOf(t)
        }, l.getCurrentItem = function() {
            return this._currentItem || null
        }, l.getLastItem = function() {
            return this._lastItem || null
        }, l.getNextItem = function() {
            var t, e = this._items.indexOf(this._currentItem);
            return e < this._items.length - 1 ? t = this._items[e + 1] : this._wrapAround && (t = this._items[0]), t || null
        }, l.getPreviousItem = function() {
            var t, e = this._items.indexOf(this._currentItem);
            return e > 0 ? t = this._items[e - 1] : this._wrapAround && (t = this._items[this._items.length - 1]), t || null
        }, l.getId = function() {
            return this._id
        }, l.destroy = function(t) {
            if (t = t || {}, void 0 === t.destroyItems && (t.destroyItems = !0), this._setCurrentItem(null), t.destroyItems)
                for (var e; this._items.length;) e = this._items[0], e.off(o.SELECTED, this._update), this.removeItem(e, {
                    destroyItem: !0,
                    setCurrentItem: !1
                });
            return this._items = null, this._itemsIdLookup = null, r._remove(this), a.destroy.call(this)
        }, l._startAt = function(t) {
            var e = this._items[t];
            e && this._currentItem !== e && (this._currentItem.hide(), this._setCurrentItem(e), this._currentItem.show(), this.trigger(r.UPDATE, this._items))
        }, l._setCurrentItem = function(t) {
            this._currentItem && this._currentItem.getElement() && this._currentItem !== t && (this._currentItem.getElement().classList.remove(o.CSS_CURRENT_ITEM), this._setLastItem(this._currentItem)), this._currentItem = t, this._currentItem && this._currentItem.getElement() && (this._currentItem.getElement().classList.add(o.CSS_CURRENT_ITEM), this._setNextItem(this.getNextItem()), this._setPreviousItem(this.getPreviousItem()))
        }, l._setLastItem = function(t) {
            this._lastItem && this._lastItem.getElement() && this._lastItem !== t && this._lastItem.getElement().classList.remove(o.CSS_LAST_ITEM), this._lastItem = t, this._lastItem && this._lastItem.getElement() && this._lastItem.getElement().classList.add(o.CSS_LAST_ITEM)
        }, l._setNextItem = function(t) {
            this._nextItem && this._nextItem.getElement() && this._nextItem !== t && this._nextItem.getElement().classList.remove(o.CSS_NEXT_ITEM), this._nextItem = t, this._nextItem && this._nextItem.getElement() && this._nextItem.getElement().classList.add(o.CSS_NEXT_ITEM)
        }, l._setPreviousItem = function(t) {
            this._previousItem && this._previousItem.getElement() && this._previousItem !== t && this._previousItem.getElement().classList.remove(o.CSS_PREVIOUS_ITEM), this._previousItem = t, this._previousItem && this._previousItem.getElement() && this._previousItem.getElement().classList.add(o.CSS_PREVIOUS_ITEM)
        }, l._updateItems = function(t) {
            t.outgoing[0] && t.outgoing[0].hide(), t.incoming[0].show(), this._itemChanged && (this.trigger(r.UPDATE_COMPLETE, t), this._itemChanged = !1)
        }, l._update = function(t) {
            var e = this._currentItem !== t.item;
            e && this._setCurrentItem(t.item);
            var i = {
                incoming: [t.item],
                outgoing: this._lastItem ? [this._lastItem] : [],
                interactionEvent: t.interactionEvent || null
            };
            e && (this.trigger(r.UPDATE, i), this._itemChanged = !0), this._updateItems(i)
        }, r._instantiate = function() {
            return this._galleries = [], this._idCounter = 0, this
        }, r._add = function(t, e) {
            this._galleries.push(t), t._id = ++this._idCounter, n.add(t, e)
        }, r._remove = function(t) {
            var e = this._galleries.indexOf(t);
            e > -1 && (this._galleries.splice(e, 1), n.remove(t))
        }, r.getAll = function() {
            return Array.prototype.slice.call(this._galleries)
        }, r.getAllInView = function() {
            for (var t = [], e = this._galleries.length; e--;) this._galleries[e].isInView() && t.push(this._galleries[e]);
            return t
        }, r.destroyAll = function() {
            for (var t = this._galleries.length; t--;) this._galleries[t].destroy();
            this._galleries = []
        }, e.exports = r._instantiate()
    }, {
        "./Item": 138,
        "./singletons/analyticsManager": 150,
        "@marcom/ac-event-emitter-micro": 119
    }],
    138: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            this._el = t, e = e || {}, this._triggerKeys = [], this._triggerEls = {}, this._isShown = !1, this._isACaption = void 0 !== e.isACaption && e.isACaption, this._onKeyboardInteraction = this._onKeyboardInteraction.bind(this), this._onTriggered = this._onTriggered.bind(this), this._isACaption || this._el.setAttribute("role", "tabpanel"), l.call(this)
        }
        t("@marcom/ac-polyfills/Array/from");
        var n = t("@marcom/ac-dom-metrics/isInViewport"),
            s = t("@marcom/ac-dom-metrics/getPercentInViewport"),
            o = t("@marcom/ac-accessibility/helpers/TabManager"),
            a = t("@marcom/ac-keyboard/keyMap"),
            l = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            c = t("@marcom/ac-keyboard"),
            u = "current";
        r.CSS_CURRENT_ITEM = "ac-gallery-currentitem", r.CSS_LAST_ITEM = "ac-gallery-lastitem", r.CSS_NEXT_ITEM = "ac-gallery-nextitem", r.CSS_PREVIOUS_ITEM = "ac-gallery-previousitem", r.SELECTED = "selected", r.SHOW = "show", r.HIDE = "hide";
        var h = r.prototype = Object.create(l.prototype);
        h.show = function() {
            this._isShown = !0, this._addCurrentClassToTriggers(), this._setTabIndexOnFocusableItems(null), this._el.removeAttribute("aria-hidden"), this.trigger(r.SHOW, this)
        }, h.hide = function() {
            this._isShown = !1, this._removeCurrentClassFromTriggers(), this._setTabIndexOnFocusableItems("-1"), this._el.setAttribute("aria-hidden", "true"), this.trigger(r.HIDE, this)
        }, h.addElementTrigger = function(t, e) {
            e = e || "click", void 0 === this._triggerEls[e] && (this._triggerEls[e] = []);
            var i = this._triggerEls[e].indexOf(t);
            if (i < 0) {
                t.setAttribute("role", "tab"), t.setAttribute("tabindex", "0");
                var r = this.getElementId();
                r && t.setAttribute("aria-controls", r), r = t.getAttribute("id"), r && null === this._el.getAttribute("aria-labelledby") && this._el.setAttribute("aria-labelledby", r), t.addEventListener(e, this._onTriggered), this._triggerEls[e].push(t), this._isShown ? (t.setAttribute("aria-selected", "true"), t.classList.add(u)) : t.setAttribute("aria-selected", "false")
            }
        }, Object.defineProperty(h, "triggerElements", {
            get: function() {
                var t = this._triggerEls;
                return Object.keys(t).reduce(function(e, i) {
                    return e.concat(t[i])
                }, [])
            }
        }), h.removeElementTrigger = function(t, e) {
            if (e = e || "click", void 0 !== this._triggerEls[e]) {
                var i = this._triggerEls[e].indexOf(t);
                i > -1 && this._cleanElementTrigger(t, e), 0 === this._triggerEls[e].length && (this._triggerEls[e] = void 0)
            }
        }, h.addKeyTrigger = function(t) {
            if ("string" == typeof t && (t = a[t.toUpperCase()]), "number" == typeof t) {
                var e = this._triggerKeys.indexOf(t);
                e < 0 && (c.onDown(t, this._onKeyboardInteraction), this._triggerKeys.push(t))
            }
        }, h.removeKeyTrigger = function(t) {
            if ("string" == typeof t && (t = a[t.toUpperCase()]), "number" == typeof t) {
                var e = this._triggerKeys.indexOf(t);
                e > -1 && (c.offDown(t, this._onKeyboardInteraction), this._triggerKeys.splice(e, 1))
            }
        }, h.removeAllTriggers = function() {
            for (var t, e = this._triggerKeys.length; e--;) t = this._triggerKeys[e], c.offDown(t, this._onKeyboardInteraction);
            this._triggerKeys = [];
            var i, r;
            for (r in this._triggerEls)
                for (e = this._triggerEls[r].length; e--;) i = this._triggerEls[r][e], this._cleanElementTrigger(i, r);
            this._triggerEls = {}
        }, Object.defineProperty(h, "isShown", {
            get: function() {
                return this._isShown
            }
        }), h.isInView = function() {
            return !!this._el && n(this._el)
        }, h.percentageInView = function() {
            return this._el ? s(this._el) : 0
        }, h.getElement = function() {
            return this._el
        }, h.getElementId = function() {
            return void 0 !== this._elId ? this._elId : (this._elId = this._el.getAttribute("id") || null, this._elId)
        }, h.destroy = function() {
            this._isShown && (this._isShown = null, this._el.classList.remove(r.CSS_CURRENT_ITEM, r.CSS_LAST_ITEM, r.CSS_NEXT_ITEM, r.CSS_PREVIOUS_ITEM), this._removeCurrentClassFromTriggers()), this.removeAllTriggers(), this._setTabIndexOnFocusableItems(null), this._el.removeAttribute("aria-hidden"), this._el.removeAttribute("role"), this._el.removeAttribute("aria-labelledby"), this._isACaption = null, this._triggerKeys = null, this._triggerEls = null, this._el = null
        }, h._addCurrentClassToTriggers = function() {
            var t, e, i;
            for (e in this._triggerEls)
                for (i = this._triggerEls[e].length; i--;) t = this._triggerEls[e][i], t.setAttribute("aria-selected", "true"), t.classList.add(u)
        }, h._removeCurrentClassFromTriggers = function() {
            var t, e, i;
            for (e in this._triggerEls)
                for (i = this._triggerEls[e].length; i--;) t = this._triggerEls[e][i], t.setAttribute("aria-selected", "false"), t.classList.remove(u)
        }, h._cleanElementTrigger = function(t, e) {
            t.removeAttribute("aria-selected"), t.removeAttribute("role"), t.removeAttribute("tabindex"), t.removeAttribute("aria-controls"), t.removeEventListener(e, this._onTriggered), this._isShown && t.classList.remove(u)
        }, h._onKeyboardInteraction = function(t) {
            this.isInView() && this._onTriggered(t)
        }, h._setTabIndexOnFocusableItems = function(t) {
            var e = null === t,
                i = [];
            this._currentTabbableEls = this._currentTabbableEls || o.getTabbableElements(this._el), e || (i = o.getTabbableElements(this._el), this._currentTabbableEls = i);
            for (var r = this._currentTabbableEls.length; r--;) e ? this._currentTabbableEls[r].removeAttribute("tabindex") : this._currentTabbableEls[r].setAttribute("tabindex", t)
        }, h._onTriggered = function(t) {
            t.preventDefault(), this.trigger(r.SELECTED, {
                item: this,
                interactionEvent: t
            })
        }, e.exports = r
    }, {
        "@marcom/ac-accessibility/helpers/TabManager": 2,
        "@marcom/ac-dom-metrics/getPercentInViewport": 131,
        "@marcom/ac-dom-metrics/isInViewport": 136,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-keyboard": 156,
        "@marcom/ac-keyboard/keyMap": 158,
        "@marcom/ac-polyfills/Array/from": void 0
    }],
    139: [function(t, e, i) {
        "use strict";
        var r = t("./helpers/extendProto"),
            n = t("./Gallery"),
            s = t("./auto/AutoGallery"),
            o = t("./fade/FadeGallery"),
            a = t("./fade/FadeItem"),
            l = t("./slide/SlideGallery"),
            c = t("./slide/SlideItem"),
            u = t("./Item");
        n.create = t("./factories/create"), n.autoCreate = t("./factories/autoCreate"), n.extend = r, s.extend = r, o.extend = r, a.extend = r, l.extend = r, c.extend = r, u.extend = r, e.exports = {
            Gallery: n,
            AutoGallery: s,
            FadeGallery: o,
            FadeGalleryItem: a,
            SlideGallery: l,
            SlideGalleryItem: c,
            Item: u,
            TabNav: t("./navigation/TabNav")
        }
    }, {
        "./Gallery": 137,
        "./Item": 138,
        "./auto/AutoGallery": 141,
        "./factories/autoCreate": 142,
        "./factories/create": 143,
        "./fade/FadeGallery": 144,
        "./fade/FadeItem": 145,
        "./helpers/extendProto": 146,
        "./navigation/TabNav": 149,
        "./slide/SlideGallery": 151,
        "./slide/SlideItem": 152
    }],
    140: [function(t, e, i) {
        "use strict";

        function r() {
            this._observers = {}
        }
        var n;
        try {
            n = t("ac-analytics").observer.Gallery
        } catch (s) {}
        var o = "data-analytics-gallery-id",
            a = r.prototype;
        a.add = function(t, e) {
            var i = t.getId();
            if (n && !this._observers[i]) {
                e = e || {}, e.galleryName || (e.galleryName = this._getAnalyticsId(t, e.dataAttribute) || i), e.beforeUpdateEvent || (e.beforeUpdateEvent = "update"), e.afterUpdateEvent || (e.afterUpdateEvent = "update:complete");
                var r = new n(t, e);
                r.gallery && (this._observers[i] = r)
            }
        }, a.remove = function(t) {
            var e = t.getId();
            n && this._observers[e] && ("function" == typeof this._observers[e].destroy && this._observers[e].destroy(), this._observers[e] = null)
        }, a._getAnalyticsId = function(t, e) {
            if ("function" == typeof t.getElement) {
                e = e || o;
                var i = t.getElement();
                return i.getAttribute(e) || i.getAttribute("id")
            }
            return null
        }, e.exports = r
    }, {
        "ac-analytics": void 0
    }],
    141: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (e = e || {}, !t || 1 !== t.nodeType) throw new Error(y);
            if (this._el = t, c.call(this, e), this._itemHeights = [], this._itemHeightsLookup = {}, this._tabNavDuration = e.tabNavDuration, this._tabNavPaddles = e.tabNavPaddles !== !1, this._isRightToLeft = void 0 === e.rightToLeft ? "rtl" === window.getComputedStyle(t).direction : e.rightToLeft, this._keyboardThrottleDelay = 1e3 * (void 0 === e.keyboardThrottleDelay ? g : e.keyboardThrottleDelay), this._resizeContainer = !!e.resizeContainer, this._setUpContainerAutoResize(e.resizeContainerOnUpdate), this._createTabNav(), this._addPaddleNav(e.addPaddleNav), this._isACaptionsGallery = "" === t.getAttribute("data-ac-gallery-captions"), this._addItems(e.itemSelector || _), this._wrapAround || this._updatePaddleNavState(), e.enableArrowKeys !== !1 && (this._enableArrowKeys = !0, this._addKeyboardListener()), e.updateOnWindowResize !== !1 && (this._onWindowResize = this._onWindowResize.bind(this), window.addEventListener("resize", this._onWindowResize)), this._componentsContainer = document.getElementById(e.container), e.startAt && this._startAt(e.startAt), this.stopAutoPlay = this.stopAutoPlay.bind(this), e.autoPlay) {
                if (!this._componentsContainer) throw new Error(b);
                var i = "number" == typeof e.autoPlay ? e.autoPlay : p;
                this.startAutoPlay(i)
            }
            if (e.deeplink !== !1) {
                var r = this._getDeeplinkedItem();
                r && r !== this._currentItem && this.show(r)
            }
            if (this._containerResizeDuration !== !1) {
                var n = this._itemHeightsLookup[this._currentItem.getElementId()];
                n && this._setElHeight(n)
            }
            this._tabNav && this._tabNav.start(), this._setUpSwiping(e.touch && a(), e.desktopSwipe), this._componentsContainer && this._componentsContainer.setAttribute("tabIndex", -1);
            var s = t.getAttribute("data-related-gallery");
            if (s && (this._captionsContainer = document.querySelector(s)), e.enableCaptions) {
                if (!this._captionsContainer) throw new Error(E);
                this._captionsOptions = !!e.captionsOptions && e.captionsOptions, this.enableCaptions()
            }
        }
        t("@marcom/ac-polyfills/Array/from");
        var n = t("@marcom/ac-keyboard/keyMap"),
            s = t("./../helpers/inputHasFocus"),
            o = t("@marcom/ac-function/throttle"),
            a = t("@marcom/ac-feature/touchAvailable"),
            l = t("@marcom/ac-browser-prefixed"),
            c = t("./../Gallery"),
            u = t("@marcom/ac-keyboard"),
            h = t("@marcom/ac-pointer-tracker").PointerTracker,
            m = t("./../navigation/TabNav"),
            d = "disabled",
            p = 3,
            f = .5,
            _ = "[data-ac-gallery-item]",
            g = .12,
            v = t("../templates/paddlenav.js"),
            y = "No element supplied.",
            b = 'Container element needed when autoPlay is on. Use the "container" option when you instantiate your gallery.',
            E = 'Captions datatag needed when enableCaptions is on. Use the "data-related-gallery" tag (with an ID of the related captions container) on your gallery container to automatically use captions.';
        r.RESIZED = "resized", r.UPDATE = c.UPDATE, r.UPDATE_COMPLETE = c.UPDATE_COMPLETE;
        var w = c.prototype,
            T = r.prototype = Object.create(w);
        T.addItem = function(t, e) {
            if (t.nodeType) {
                var i = this._isACaptionsGallery;
                t = new this._itemType(t, {
                    isACaption: i
                })
            } else if (this._items.indexOf(t) > -1) return t;
            return this._resizeContainer && this._storeItemHeight(t, this._containerResizeDuration === !1), this._addItemTriggers(t), w.addItem.call(this, t, e)
        }, T.removeItem = function(t, e) {
            if (this._resizeContainer)
                for (var i = this._itemHeights.length; i--;) this._itemHeights[i].item === t && (this._itemHeights.splice(i, 1), 0 === i && this._itemHeights.length && this._setElHeight(this._itemHeights[0].height));
            return w.removeItem.call(this, t, e)
        }, T.startAutoPlay = function(t, e) {
            if (e = e || {}, this._isAutoPlaying = !0, this._autoPlayDelay = 1e3 * (t || p), this._cancelAutoPlayOnInteraction = void 0 === e.cancelOnInteraction || e.cancelOnInteraction, clearTimeout(this._autoPlayTimeoutId), this._autoPlayTimeoutId = setTimeout(this._onAutoPlayToNextItem.bind(this), this._autoPlayDelay), this._cancelAutoPlayOnInteraction && this.on(c.UPDATE, this.stopAutoPlay), !this._componentsContainer) throw new Error(b);
            this._componentsContainer.addEventListener("focus", this.stopAutoPlay, !0), this._componentsContainer.addEventListener("touchend", this.stopAutoPlay, !0), this._componentsContainer.addEventListener("click", this.stopAutoPlay, !0)
        }, T.stopAutoPlay = function() {
            this._isAutoPlaying = !1, clearTimeout(this._autoPlayTimeoutId), this._cancelAutoPlayOnInteraction && this.off(c.UPDATE, this.stopAutoPlay), this._componentsContainer && (this._componentsContainer.removeEventListener("focus", this.stopAutoPlay, !0), this._componentsContainer.removeEventListener("touchend", this.stopAutoPlay, !0), this._componentsContainer.removeEventListener("click", this.stopAutoPlay, !0))
        }, T.getElement = function() {
            return this._el
        }, T.getTabNav = function() {
            return this._tabNav || null
        }, T.resize = function(t, e) {
            if (this._resizeContainer) {
                this._itemHeights = [];
                for (var i = this._items.length; i--;) this._storeItemHeight(this._items[i], !1);
                this._containerResizeDuration !== !1 ? this._setElHeight(this._itemHeightsLookup[this._currentItem.getElementId()]) : this._setElHeight(this._itemHeights[0].height)
            }
            this._tabNav && this._tabNav.resize(), this.trigger(r.RESIZED, this)
        }, T.enableKeyboard = function() {
            this._enableArrowKeys || (this._enableArrowKeys = !0, this._addKeyboardListener())
        }, T.disableKeyboard = function() {
            this._enableArrowKeys && (this._enableArrowKeys = !1, u.offDown(n.ARROW_RIGHT, this._rightArrowFunc), u.offDown(n.ARROW_LEFT, this._leftArrowFunc))
        }, T.enableTouch = function() {
            this._touchSwipe || this._setUpSwiping(!0, !1)
        }, T.disableTouch = function() {
            this._touchSwipe && (this._touchSwipe.off(h.END, this._onSwipeEnd), this._touchSwipe.destroy(), this._touchSwipe = null)
        }, T.enableDesktopSwipe = function() {
            this._clickSwipe || this._setUpSwiping(!1, !0)
        }, T.disableDesktopSwipe = function() {
            this._clickSwipe && (this._clickSwipe.off(h.END, this._onSwipeEnd), this._clickSwipe.destroy(), this._clickSwipe = null)
        }, T.enableCaptions = function() {
            this._galleryWithCaptions || this._initCaptionsGallery(this._captionsContainer, this._captionsOptions)
        }, T.disableCaptions = function() {
            this._galleryWithCaptions && this._galleryWithCaptions.destroy()
        }, T.destroy = function(t) {
            this._isAutoPlaying && this.stopAutoPlay(), this._componentsContainer && (this._componentsContainer.removeEventListener("focus", this.stopAutoPlay, !0), this._componentsContainer.removeEventListener("touchend", this.stopAutoPlay, !0), this._componentsContainer.removeEventListener("click", this.stopAutoPlay, !0)), this._resizeContainer && (this._el.style.height = null, this._el.style[l.transition] = null), this._enableArrowKeys && (u.offDown(n.ARROW_RIGHT, this._rightArrowFunc), u.offDown(n.ARROW_LEFT, this._leftArrowFunc));
            var e;
            if (this._previousButtons) {
                for (e = this._previousButtons.length; e--;) this._previousButtons[e].removeEventListener("click", this._onPaddlePrevious);
                this._setPaddleDisabledState(this._previousButtons, !1)
            }
            if (this._nextButtons) {
                for (e = this._nextButtons.length; e--;) this._nextButtons[e].removeEventListener("click", this._onPaddleNext);
                this._setPaddleDisabledState(this._nextButtons, !1)
            }
            return this._dynamicPaddleNav && this._el.removeChild(this._dynamicPaddleNav), this._hasPaddleNavStateHandler && this.off(c.UPDATE, this._updatePaddleNavState), this.disableTouch(), this.disableDesktopSwipe(), this.disableCaptions(), this._tabNav && (this._tabNav.destroy(), this._tabNav = null), window.removeEventListener("resize", this._onWindowResize), this._el = null, this._itemHeights = null, this._itemHeightsLookup = null, this._resizeContainer = null, this._isRightToLeft = null, this._enableArrowKeys = null, this._previousButtons = null, this._onPaddlePrevious = null, this._nextButtons = null, this._onPaddleNext = null, this._isACaptionsGallery = null, this._componentsContainer = null, this._galleryWithCaptions = null, this._captionsContainer = null, this._captionsOptions = null, w.destroy.call(this, t)
        }, T._getDeeplinkedItem = function() {
            for (var t, e = window.location.hash.substr(1), i = this._items.length; i--;)
                if (t = this._items[i], e === t.getElementId()) return t;
            return null
        }, T._addItems = function(t) {
            var e, i = this._el.querySelectorAll(t),
                r = 0,
                n = i.length,
                s = this._isACaptionsGallery;
            for (r; r < n; r++) e = new this._itemType(i[r], {
                isACaption: s
            }), this.addItem(e), this._addItemTriggers(e)
        }, T._createTabNav = function() {
            var t = this._getElementId(),
                e = '[data-ac-gallery-tabnav="' + t + '"]',
                i = document.querySelector(e);
            i && (this._tabNav = new m(i, this, {
                duration: this._tabNavDuration,
                usePaddles: this._tabNavPaddles
            }))
        }, T._addItemTriggers = function(t, e) {
            var i = Array.from(document.querySelectorAll('[data-ac-gallery-trigger="' + t.getElementId() + '"]'));
            e && e.length && (i = i.concat(e));
            var r = 0,
                n = i.length;
            for (r; r < n; r++) t.addElementTrigger(i[r]), this._tabNav && this._tabNav.addTrigger(i[r], t)
        }, T._addPaddleNav = function(t) {
            var e, i = this._getElementId();
            if (t) {
                var r = "string" == typeof t ? t : v;
                r = r.replace(/%ID%/g, this._getElementId()), this._dynamicPaddleNav = document.createElement("div"), this._dynamicPaddleNav.innerHTML = r, this._el.insertBefore(this._dynamicPaddleNav, this._el.firstChild)
            }
            this._previousButtons = document.querySelectorAll('[data-ac-gallery-previous-trigger="' + i + '"]'), this._nextButtons = document.querySelectorAll('[data-ac-gallery-next-trigger="' + i + '"]');
            var n = this._el.getAttribute("aria-label") || "";
            if (n.length && (n = "(" + n + ")"), this._onPaddlePrevious = this._onPaddleInteraction.bind(null, this.showPrevious), e = this._previousButtons.length) {
                var s = this._el.getAttribute("data-ac-gallery-previouslabel");
                for (s && n.length && (this._isRightToLeft ? s = n + " " + s : s += " " + n); e--;) s && null === this._previousButtons[e].getAttribute("aria-label") && this._previousButtons[e].setAttribute("aria-label", s), this._previousButtons[e].addEventListener("click", this._onPaddlePrevious)
            }
            if (this._onPaddleNext = this._onPaddleInteraction.bind(null, this.showNext), e = this._nextButtons.length) {
                var o = this._el.getAttribute("data-ac-gallery-nextlabel");
                for (o && n.length && (this._isRightToLeft ? o = n + " " + o : o += " " + n); e--;) o && null === this._nextButtons[e].getAttribute("aria-label") && this._nextButtons[e].setAttribute("aria-label", o), this._nextButtons[e].addEventListener("click", this._onPaddleNext)
            }(this._nextButtons.length || this._previousButtons.length) && (this._hasPaddleNavStateHandler = !0, this._updatePaddleNavState = this._updatePaddleNavState.bind(this), this.on(c.UPDATE, this._updatePaddleNavState))
        }, T._onPaddleInteraction = function(t, e) {
            e.preventDefault(), t.call(null, {
                interactionEvent: e
            })
        }, T._updatePaddleNavState = function() {
            if (this._wrapAround) this._setPaddleDisabledState(this._previousButtons, !1), this._setPaddleDisabledState(this._nextButtons, !1);
            else {
                var t = this._items.indexOf(this._currentItem);
                0 === t && this._previousButtons.length ? (this._setPaddleDisabledState(this._previousButtons, !0), this._setPaddleDisabledState(this._nextButtons, !1)) : t === this._items.length - 1 && this._nextButtons.length ? (this._setPaddleDisabledState(this._nextButtons, !0), this._setPaddleDisabledState(this._previousButtons, !1)) : (this._setPaddleDisabledState(this._previousButtons, !1), this._setPaddleDisabledState(this._nextButtons, !1))
            }
        }, T._setPaddleDisabledState = function(t, e) {
            for (var i = t.length; i--;) t[i].disabled = e, e ? t[i].classList.add(d) : t[i].classList.remove(d)
        }, T._addKeyboardListener = function() {
            if (this._enableArrowKeys) {
                this._onKeyboardInteraction = this._onKeyboardInteraction.bind(this);
                var t, e;
                this._isRightToLeft ? (t = this.showPrevious, e = this.showNext) : (t = this.showNext, e = this.showPrevious), this._rightArrowFunc = o(this._onKeyboardInteraction.bind(null, t), this._keyboardThrottleDelay), this._leftArrowFunc = o(this._onKeyboardInteraction.bind(null, e), this._keyboardThrottleDelay), u.onDown(n.ARROW_RIGHT, this._rightArrowFunc), u.onDown(n.ARROW_LEFT, this._leftArrowFunc)
            }
        }, T._onKeyboardInteraction = function(t, e) {
            if (this.isInView() && !s()) {
                var i = c.getAllInView();
                if (i.length > 1 && (i.sort(function(t, e) {
                        return t = t._enableArrowKeys ? t.getCurrentItem().percentageInView() : 0, e = e._enableArrowKeys ? e.getCurrentItem().percentageInView() : 0, e - t
                    }), this !== i[0])) return;
                t.call(null, {
                    interactionEvent: e
                })
            }
        }, T._setUpSwiping = function(t, e) {
            this._onSwipeEnd = this._onSwipeEnd.bind(this), t && (this._touchSwipe = new h(this._el, h.TOUCH_EVENTS), this._touchSwipe.on(h.END, this._onSwipeEnd)), e && (this._clickSwipe = new h(this._el, h.MOUSE_EVENTS), this._clickSwipe.on(h.END, this._onSwipeEnd))
        }, T._onSwipeEnd = function(t) {
            var e, i, r = t.interactionEvent,
                n = "touchend" !== r.type || "touchstart" !== r.type || "touchmove" !== r.type;
            n && (i = {
                type: "touchmove",
                target: r.target,
                srcElement: r.srcElement
            });
            var s = {
                interactionEvent: i || r
            };
            return t.swipe === h.SWIPE_RIGHT ? e = this._isRightToLeft ? this.showNext : this.showPrevious : t.swipe === h.SWIPE_LEFT && (e = this._isRightToLeft ? this.showPrevious : this.showNext), e ? e.call(this, s) : (r = null, null)
        }, T._getElementId = function() {
            return void 0 === this._elementId && (this._elementId = this._el.getAttribute("id")), this._elementId
        }, T._setUpContainerAutoResize = function(t) {
            "number" == typeof t ? this._containerResizeDuration = t : t ? this._containerResizeDuration = f : this._containerResizeDuration = !1, this._containerResizeDuration !== !1 && (this._resizeContainer = !0, this._updateContainerSize = this._updateContainerSize.bind(this), this.on(c.UPDATE, this._updateContainerSize))
        }, T._updateContainerSize = function(t) {
            if (t.incoming) {
                var e = this._itemHeightsLookup[t.incoming[0].getElementId()];
                e && this._setElHeight(e, this._containerResizeDuration)
            }
        }, T._storeItemHeight = function(t, e) {
            this._itemHeights.push({
                item: t,
                height: t.getElement().scrollHeight
            }), this._itemHeightsLookup[t.getElementId()] = t.getElement().scrollHeight, this._itemHeights.sort(function(t, e) {
                return e.height - t.height
            }), e && this._itemHeights[0].item === t && this._setElHeight(t.getElement().scrollHeight)
        }, T._setElHeight = function(t, e) {
            null !== e && "number" == typeof e && (this._el.style[l.transition] = "height " + e + "s"), this._el.style.height = t + "px"
        }, T._initCaptionsGallery = function(t, e) {
            t && (this._galleryWithCaptions = c.create(t, "fade", e ? e : {
                crossFade: !0
            }), this._enableArrowKeys && (this._galleryWithCaptions._enableArrowKeys = !1), this.on(c.UPDATE, function(t) {
                var e = this.getItemIndex(t.incoming[0]);
                this._galleryWithCaptions.show(e)
            }.bind(this)))
        }, T._onAutoPlayToNextItem = function() {
            if (this._isAutoPlaying)
                if (!document.hidden && this._currentItem.isInView()) {
                    this._cancelAutoPlayOnInteraction && this.off(c.UPDATE, this.stopAutoPlay);
                    var t = this.showNext();
                    null !== t && (this._cancelAutoPlayOnInteraction && this.on(c.UPDATE, this.stopAutoPlay), clearTimeout(this._autoPlayTimeoutId), this._autoPlayTimeoutId = setTimeout(this._onAutoPlayToNextItem.bind(this), this._autoPlayDelay))
                } else clearTimeout(this._autoPlayTimeoutId), this._autoPlayTimeoutId = setTimeout(this._onAutoPlayToNextItem.bind(this), this._autoPlayDelay)
        }, T._onWindowResize = function(t) {
            window.requestAnimationFrame(function() {
                this._el && this.resize()
            }.bind(this))
        }, e.exports = r
    }, {
        "../templates/paddlenav.js": 154,
        "./../Gallery": 137,
        "./../helpers/inputHasFocus": 148,
        "./../navigation/TabNav": 149,
        "@marcom/ac-browser-prefixed": 11,
        "@marcom/ac-feature/touchAvailable": 125,
        "@marcom/ac-function/throttle": 128,
        "@marcom/ac-keyboard": 156,
        "@marcom/ac-keyboard/keyMap": 158,
        "@marcom/ac-pointer-tracker": 174,
        "@marcom/ac-polyfills/Array/from": void 0
    }],
    142: [function(t, e, i) {
        "use strict";
        var r = t("./create"),
            n = t("./../Gallery");
        e.exports = function(t) {
            t = t || {};
            var e, i, s = t.context || document.body;
            for (e = s.querySelectorAll(n.SLIDE_SELECTOR), i = e.length; i--;) r(e[i], n.SLIDE, t);
            for (e = s.querySelectorAll(n.FADE_SELECTOR), i = e.length; i--;) r(e[i], n.FADE, t);
            return n.getAll()
        }
    }, {
        "./../Gallery": 137,
        "./create": 143
    }],
    143: [function(t, e, i) {
        "use strict";
        var r = t("./../fade/FadeGallery"),
            n = t("./../Gallery"),
            s = t("./../slide/SlideGallery"),
            o = "%TYPE% is not a supported gallery type and el has no gallery data attribute.",
            a = n.FADE_SELECTOR.replace(/\[|\]/g, ""),
            l = n.SLIDE_SELECTOR.replace(/\[|\]/g, "");
        e.exports = function(t, e, i) {
            var c;
            if ("string" == typeof e && (e === n.SLIDE ? c = s : e === n.FADE && (c = r)), void 0 === c && (null !== t.getAttribute(l) ? c = s : null !== t.getAttribute(a) && (c = r)), void 0 === c) throw new Error(o.replace(/%TYPE%/g, e));
            return new c(t, i)
        }
    }, {
        "./../Gallery": 137,
        "./../fade/FadeGallery": 144,
        "./../slide/SlideGallery": 151
    }],
    144: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (e = Object.assign({}, e), e.itemType = e.itemType || n, this._fadeDuration = void 0 !== e.duration ? e.duration : o, e.tabNavDuration = void 0 !== e.tabNavDuration ? e.tabNavDuration : this._fadeDuration, this._crossFade = e.crossFade, this._zIndexBase = e.startZIndex || 1, this._ease = e.ease, e.resizeContainerOnUpdate === !0 && (e.resizeContainerOnUpdate = this._fadeDuration), this._onItemShowComplete = this._onItemShowComplete.bind(this), s.call(this, t, e), e.startZIndex)
                for (var i, r = this._items.length; r--;) i = this._items[r], i.getElement().style.zIndex = this._zIndexBase;
            this._currentItem && this._currentItem.fadeIn(0, this._ease, this._zIndexBase + l)
        }
        t("@marcom/ac-polyfills/Object/assign");
        var n = t("./FadeItem"),
            s = t("./../auto/AutoGallery"),
            o = .5,
            a = 1,
            l = 2;
        r.RESIZED = s.RESIZED, r.UPDATE = s.UPDATE, r.UPDATE_COMPLETE = s.UPDATE_COMPLETE;
        var c = s.prototype,
            u = r.prototype = Object.create(c);
        u.addItem = function(t, e) {
            t.nodeType && (t = new this._itemType(t));
            var i = c.addItem.call(this, t, e);
            return t !== this._currentItem ? t.fadeOut() : t.fadeIn(0), i
        }, u.destroy = function(t) {
            var e = c.destroy.call(this, t);
            return this._fadeDuration = null, this._crossFade = null, this._zIndexBase = null, this._ease = null, this._onItemShowComplete = null, e
        }, u._startAt = function(t) {
            var e = this._items[t];
            e && this._currentItem !== e && (this._currentItem.fadeOut(0), this._currentItem.hide(), this._setCurrentItem(e), this._currentItem.show(), this._currentItem.fadeIn(0), this.trigger(r.UPDATE, this._items))
        }, u._onItemShowComplete = function(t) {
            return t && t.target() !== this._currentItem.getElement() ? void(this._currentItem.isFading() || (this._prepareForTransition(), this._currentItem.fadeIn(this._fadeDuration, this._ease, this._zIndexBase + l, this._onItemShowComplete))) : (this._prepareForTransition(!0), void(this._incomingOutgoingItems && this.trigger(r.UPDATE_COMPLETE, this._incomingOutgoingItems)))
        }, u._updateItems = function(t) {
            if (this._itemChanged) {
                if (this._crossFade) {
                    this._prepareForTransition();
                    var e = function() {
                        this.trigger(r.UPDATE_COMPLETE, t), this._itemChanged = !1
                    }.bind(this);
                    t.outgoing[0].fadeOut(.99 * this._fadeDuration, this._ease), t.incoming[0].fadeIn(this._fadeDuration, this._ease, this._zIndexBase + l, e)
                } else this._incomingOutgoingItems = t, t.outgoing[0].isFading() || (this._prepareForTransition(), t.incoming[0].fadeIn(this._fadeDuration, this._ease, this._zIndexBase + l, this._onItemShowComplete));
                t.outgoing[0].hide(), t.incoming[0].show()
            }
        }, u._prepareForTransition = function(t) {
            for (var e, i = this._items.length; i--;) e = this._items[i], e !== this._currentItem && (t && e.fadeOut(), e.getElement().style.zIndex = this._zIndexBase);
            this._lastItem._el.style.zIndex = this._zIndexBase + a
        }, e.exports = r
    }, {
        "./../auto/AutoGallery": 141,
        "./FadeItem": 145,
        "@marcom/ac-polyfills/Object/assign": void 0
    }],
    145: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            a.call(this, t, e), t.style.position = "absolute"
        }
        var n = t("@marcom/ac-solar/fade"),
            s = t("@marcom/ac-solar/fadeIn"),
            o = t("@marcom/ac-solar/fadeOut"),
            a = t("./../Item");
        r.SELECTED = a.SELECTED, r.SHOW = a.SHOW, r.HIDE = a.HIDE;
        var l = a.prototype,
            c = r.prototype = Object.create(l);
        c.fadeIn = function(t, e, i, r) {
            this._el.style.zIndex = i || 1, t ? (this._destroyCurrentClip(), this._clip = n(this._el, 0, 1, t, {
                ease: e,
                onComplete: r
            })) : s(this._el, 0)
        }, c.fadeOut = function(t, e) {
            t ? (this._destroyCurrentClip(), this._clip = o(this._el, t, {
                ease: e
            })) : o(this._el, 0)
        }, c.isFading = function() {
            return !(!this._clip || !this._clip.playing())
        }, c.destroy = function() {
            this._el.style.position = null, this._el.style.opacity = null, this._el.style.zIndex = null, l.destroy.call(this), this._destroyCurrentClip(), this._clip = null
        }, c._destroyCurrentClip = function() {
            this._clip && this._clip._el && this._clip.destroy()
        }, e.exports = r
    }, {
        "./../Item": 138,
        "@marcom/ac-solar/fade": 205,
        "@marcom/ac-solar/fadeIn": 206,
        "@marcom/ac-solar/fadeOut": 207
    }],
    146: [function(t, e, i) {
        "use strict";
        t("@marcom/ac-polyfills/Object/assign"), e.exports = function(t) {
            var e = this,
                i = function() {
                    e.apply(this, arguments)
                },
                r = Object.create(this.prototype);
            return i.prototype = Object.assign(r, t), Object.assign(i, this), i
        }
    }, {
        "@marcom/ac-polyfills/Object/assign": void 0
    }],
    147: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            var i = window.getComputedStyle(t),
                r = e ? t.clientWidth : t.scrollWidth;
            return Math.round(r + parseFloat(i.marginRight) + parseFloat(i.marginLeft))
        }
    }, {}],
    148: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            var t = ["input", "select", "textarea"];
            return t.indexOf(document.activeElement.nodeName.toLowerCase()) > -1
        }
    }, {}],
    149: [function(t, e, i) {
        "use strict";

        function r(t, e, i) {
            i = i || {}, this._el = t, this._gallery = e, this._triggers = {}, this._ordered = [], i.scrollDuration = "undefined" == typeof i.duration ? l : i.duration, this.tabnav = new s(t, i), o.call(this)
        }
        var n = t("@marcom/ac-dom-traversal/ancestors"),
            s = t("@marcom/ac-tabnav"),
            o = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            a = t("./../Gallery"),
            l = .5,
            c = o.prototype,
            u = r.prototype = Object.create(c);
        u.start = function() {
            this._onWindowLoad = this._onWindowLoad.bind(this), this._onGalleryUpdated = this._onGalleryUpdated.bind(this), this._gallery.on(a.UPDATE, this._onGalleryUpdated), this.resize(), window.addEventListener("load", this._onWindowLoad)
        }, u.addTrigger = function(t, e) {
            if (void 0 === this._triggers[e.getElementId()]) {
                var i = n(t);
                if (i.indexOf(this._el) > -1) {
                    var r = {
                        el: t
                    };
                    this._triggers[e.getElementId()] = r, this._ordered.push(r)
                }
            }
        }, u.resize = function() {
            var t;
            this._ordered.length && this.tabnav._wrapper.scrollWidth > this.tabnav.el.scrollWidth && (t = this._triggers[this._gallery.getCurrentItem().getElementId()], t && this.tabnav.centerItem(t.el))
        }, u.destroy = function() {
            return this._gallery.off(a.UPDATE, this._onGalleryUpdated), window.removeEventListener("load", this._onWindowLoad), this._el = null, this._gallery = null, this._triggers = null, this._ordered = null, this._clip = null, c.destroy.call(this)
        }, u._onWindowLoad = function() {
            window.removeEventListener("load", this._onWindowLoad), this.resize()
        }, u._onGalleryUpdated = function(t) {
            var e = this._triggers[t.incoming[0].getElementId()];
            e && this.tabnav.centerItem(e.el)
        }, e.exports = r
    }, {
        "./../Gallery": 137,
        "@marcom/ac-dom-traversal/ancestors": 79,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-tabnav": 210
    }],
    150: [function(t, e, i) {
        "use strict";
        var r = t("./../analytics/AnalyticsManager");
        e.exports = new r
    }, {
        "./../analytics/AnalyticsManager": 140
    }],
    151: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            e = Object.assign({}, e), e.itemType = e.itemType || c, this._itemsPerSlide = e.itemsPerSlide || 1;
            var i = e.deeplink !== !1;
            if (e.deeplink = !1, this._slideDuration = void 0 !== e.duration ? e.duration : m, e.tabNavDuration = void 0 !== e.tabNavDuration ? e.tabNavDuration : this._slideDuration, this._itemCenterPoint = void 0 !== e.itemCenterPoint ? e.itemCenterPoint : h, this._edgePullResistance = e.edgePullResistance ? e.edgePullResistance : d, this._useClientWidthForItemWidth = e.useItemClientWidth || !1, this._slideOptions = {
                    ease: e.ease
                }, e.resizeContainerOnUpdate === !0 && (e.resizeContainerOnUpdate = this._slideDuration), e.touch = e.touch !== !1, this._originalWrapAround = e.wrapAround || !1, a.call(this, t, e), i) {
                var r = this._getDeeplinkedItem();
                r && this._currentItem !== r && (this._currentItem.hide(), this._setCurrentItem(r), this._currentItem.show())
            }
            this._positionItems = this._positionItems.bind(this), this._createContainer(), 0 !== this._items.length && this._positionItems(), this._isInstantiated = !0
        }
        t("@marcom/ac-polyfills/Array/from"), t("@marcom/ac-polyfills/Object/assign");
        var n = t("./../helpers/getElementFullWidth"),
            s = t("@marcom/ac-solar/moveX"),
            o = t("@marcom/ac-browser-prefixed"),
            a = t("./../auto/AutoGallery"),
            l = t("@marcom/ac-pointer-tracker").PointerTracker,
            c = t("./SlideItem"),
            u = t("./SlideItemWrapper"),
            h = .5,
            m = .5,
            d = !0;
        r.RESIZED = a.RESIZED, r.UPDATE = a.UPDATE, r.UPDATE_COMPLETE = a.UPDATE_COMPLETE;
        var p = a.prototype,
            f = r.prototype = Object.create(p);
        f.addItem = function(t, e) {
            t.nodeType && (t = new this._itemType(t));
            var i = p.addItem.call(this, t, e);
            return void 0 !== this._containerEl && (this._addItemToContainer(t), this._positionItems()), this._updateWrapAround(), i
        }, f.removeItem = function(t, e) {
            if (this._containerEl && t.getElement().parentElement === this._containerEl) {
                var i = t.getOriginalParentElement();
                i ? i.appendChild(t.getElement()) : "function" == typeof t.removeItems && (t.removeItems(), e.destroyItem = !0);
                var r = p.removeItem.call(this, t, e);
                return this._currentItem && this._positionItems(this._currentItem), this._updateWrapAround(), r
            }
            return p.removeItem.call(this, t, e)
        }, f.resize = function() {
            return this._positionItems(), this._snapToPosition(this._currentItem.position()), p.resize.call(this)
        }, f.destroy = function(t) {
            this._destroyCurrentClip(), this._clip = null;
            for (var e = this._items.length; e--;) this._items[e].off(c.CENTER_POINT_CHANGED, this._positionItems);
            this._touchSwipe && (this._touchSwipe.off(l.START, this._onSwipeStart), this._touchSwipe.off(l.UPDATE, this._onSwipeUpdate)), this._clickSwipe && (this._clickSwipe.off(l.START, this._onSwipeStart), this._clickSwipe.off(l.UPDATE, this._onSwipeUpdate));
            var i = this._el,
                r = p.destroy.call(this, t);
            return i.removeChild(this._containerEl), this._containerEl = null, this._slideDuration = null, this._itemCenterPoint = null, this._positionItems = null, this._slideOptions = null, r
        }, f._addItems = function(t) {
            if (this._itemsPerSlide > 1) {
                var e, i, r, n = this._el.querySelectorAll(t),
                    s = 0,
                    o = 0,
                    a = n.length;
                for (o; o < a; o++) 0 === s && (e = new u(this._useClientWidthForItemWidth)), e.addItem(n[o]), r = n[o].getAttribute("id"), r && (i = Array.from(document.querySelectorAll("[data-ac-gallery-trigger=" + r + "]")), this._addItemTriggers(e, i)), ++s !== this._itemsPerSlide && o !== a - 1 || (s = 0, e.resize(), this.addItem(e))
            } else p._addItems.call(this, t)
        }, f._createContainer = function() {
            this._containerEl = document.createElement("div"), this._containerEl.classList.add("ac-gallery-slidecontainer"), this._containerEl.style.position = "absolute", this._containerEl.style.top = "0", this._containerEl.style.left = "0", this._containerEl.style.width = "100%", this._containerEl.style.height = "100%", this._el.appendChild(this._containerEl);
            var t = 0,
                e = this._items.length;
            for (t; t < e; t++) this._addItemToContainer(this._items[t])
        }, f._addItemToContainer = function(t) {
            this._containerEl.appendChild(t.getElement()), this._resizeContainer && this._itemsPerSlide > 1 && this._storeItemHeight(t, this._containerResizeDuration === !1), t.on(c.CENTER_POINT_CHANGED, this._positionItems)
        }, f._positionItems = function(t) {
            t = t || this._currentItem;
            var e = this._items;
            this._wrapAround && (e = this._shuffleItems());
            var i, r, s, o, a, l = this._getActualPositionX() - t.position() || 0,
                c = parseInt(window.getComputedStyle(this._el).width, 10),
                u = 0,
                h = 0,
                m = e.length;
            for (h; h < m; h++) i = e[h], i.resize(), r = i.getElement(), r.style.left = u + "px", s = n(r, this._useClientWidthForItemWidth), o = c - s, a = i.centerPoint && null !== i.centerPoint() ? i.centerPoint() : this._itemCenterPoint, i.position(u * -1 + o * a), this._isRightToLeft ? u -= s : u += s;
            u = t.position() + l, this._snapToPosition(u)
        }, f._getActualPositionX = function() {
            var t = window.getComputedStyle(this._containerEl)[o.transform];
            if (t === this._transformStyles && void 0 !== this._actualPositionX) return this._actualPositionX;
            this._transformStyles = t;
            var e = this._transformStyles.split(",");
            return this._actualPositionX = e[4] || this._currentItem.position(), 1 * this._actualPositionX
        }, f._snapToPosition = function(t) {
            this._destroyCurrentClip(), this._positionX = t, this._containerEl.style[o.transition] = "transform 0s, left 0s", s(this._containerEl, t, 0, this._slideOptions)
        }, f._slideToPosition = function(t, e, i) {
            this._positionX = t, this._clip = s(this._containerEl, t, e, {
                ease: this._slideOptions.ease,
                onComplete: i
            })
        }, f._setUpSwiping = function(t, e) {
            var i = p._setUpSwiping.call(this, t, e);
            return this._onSwipeStart = this._onSwipeStart.bind(this), this._onSwipeUpdate = this._onSwipeUpdate.bind(this), this._touchSwipe && (this._touchSwipe.on(l.START, this._onSwipeStart), this._touchSwipe.on(l.UPDATE, this._onSwipeUpdate)), this._clickSwipe && (this._clickSwipe.on(l.START, this._onSwipeStart), this._clickSwipe.on(l.UPDATE, this._onSwipeUpdate)), i
        }, f._onSwipeStart = function(t) {
            this._clip && this._clip.playing() && (this._destroyCurrentClip(), this._positionX = this._getActualPositionX())
        }, f._onSwipeUpdate = function(t) {
            this._destroyCurrentClip();
            var e = this.getItems().slice(-1)[0].position(),
                i = this._positionX > 0 || this._positionX < e,
                r = t.diffX;
            this._edgePullResistance && !this._wrapAround && i && (r *= .5), this._snapToPosition(this._positionX - r)
        }, f._onSwipeEnd = function(t) {
            var e = p._onSwipeEnd.call(this, t);
            return null === e && (e = this.show(this._currentItem, {
                interactionEvent: t.interactionEvent
            })), e
        }, f._shuffleItems = function() {
            var t = 2 === this._items.length && !this._isAutoPlaying;
            if (t) return this._items.slice();
            var e, i, r, n = this._items.length,
                s = this._items.indexOf(this._currentItem),
                o = Math.floor(.5 * n);
            if (s < o) {
                e = o - s;
                var a = n - e;
                return i = this._items.slice(a), r = this._items.slice(0, a), i.concat(r)
            }
            return s > o ? (e = s - o, i = this._items.slice(0, e), r = this._items.slice(e), r.concat(i)) : this._items
        }, f._storeItemHeight = function(t, e) {
            var i;
            if (this._itemsPerSlide > 1) {
                for (var r = [], n = 0; n < t.getElement().children.length; n++) r.push(t.getElement().children[n].scrollHeight);
                i = Math.max.apply(null, r)
            } else i = t.getElement().scrollHeight;
            i && (this._itemHeights.push({
                item: t,
                height: i
            }), this._itemHeightsLookup[t.getElementId()] = i, this._itemHeights.sort(function(t, e) {
                return e.height - t.height
            }), e && this._itemHeights[0].item === t && this._setElHeight(i))
        }, f._updateItems = function(t) {
            if (this._destroyCurrentClip(), this._wrapAround && this._positionItems(t.outgoing[0]), this.getItemIndex(t.outgoing[0]) > -1) {
                var e = this._itemChanged ? function() {
                        this.trigger(r.UPDATE_COMPLETE, t), this._itemChanged = !1
                    }.bind(this) : null,
                    i = this._slideDuration;
                this._slideToPosition(t.incoming[0].position(), i, e), t.incoming[0] !== t.outgoing[0] && (t.incoming[0].show(), t.outgoing[0].hide())
            } else this._slideToPosition(this._currentItem.position(), this._slideDuration), t.incoming[0].show(), this._itemChanged && (this.trigger(r.UPDATE_COMPLETE, t), this._itemChanged = !1)
        }, f._updateWrapAround = function() {
            this._items.length <= 2 ? this._wrapAround = !1 : this._originalWrapAround && (this._wrapAround = this._originalWrapAround), this._isInstantiated && (this._previousButtons || this._nextButtons) && this._updatePaddleNavState()
        }, f._destroyCurrentClip = function() {
            this._clip && this._clip.playing() && this._clip.destroy()
        }, e.exports = r
    }, {
        "./../auto/AutoGallery": 141,
        "./../helpers/getElementFullWidth": 147,
        "./SlideItem": 152,
        "./SlideItemWrapper": 153,
        "@marcom/ac-browser-prefixed": 11,
        "@marcom/ac-pointer-tracker": 174,
        "@marcom/ac-polyfills/Array/from": void 0,
        "@marcom/ac-polyfills/Object/assign": void 0,
        "@marcom/ac-solar/moveX": 209
    }],
    152: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            s.call(this, t, e), t.style.position = "absolute", t.style[n.transform] = "translateZ(0)", this._parentElement = t.parentElement
        }
        var n = t("@marcom/ac-browser-prefixed"),
            s = t("./../Item");
        r.CENTER_POINT_CHANGED = "centerpointchanged", r.SELECTED = s.SELECTED, r.SHOW = s.SHOW, r.HIDE = s.HIDE;
        var o = s.prototype,
            a = r.prototype = Object.create(o);
        a.position = function(t) {
            return void 0 !== t && (this._position = t), this._position || 0
        }, a.centerPoint = function(t) {
            return void 0 !== t && (this._centerPoint = t, this.trigger(r.CENTER_POINT_CHANGED)), void 0 !== this._centerPoint ? this._centerPoint : null
        }, a.getOriginalParentElement = function() {
            return this._parentElement
        }, a.resize = function() {}, a.destroy = function() {
            this._el.style.position = null, this._el.style.left = null, this._el.style[n.transform] = null, o.destroy.call(this)
        }, e.exports = r
    }, {
        "./../Item": 138,
        "@marcom/ac-browser-prefixed": 11
    }],
    153: [function(t, e, i) {
        "use strict";

        function r(t) {
            s.call(this, document.createElement("div")), this._useClientWidthForItemWidth = t, this._items = [], this._currentWidth = 0, this._el.classList.add(o)
        }
        t("@marcom/ac-polyfills/Array/from");
        var n = t("./../helpers/getElementFullWidth"),
            s = t("./SlideItem"),
            o = "ac-gallery-slideitemwrapper",
            a = s.prototype,
            l = r.prototype = Object.create(a);
        l.addItem = function(t) {
            this._items.push({
                el: t,
                parentElement: t.parentElement
            }), this._el.appendChild(t);
            var e = t.getAttribute("id");
            if (e) {
                var i = this._el.getAttribute("id") || "",
                    r = i.length ? "-" : "";
                i += r + e, this._el.setAttribute("id", i)
            }
        }, l.removeItems = function() {
            var t, e, i = 0,
                r = this._items.length;
            for (i; i < r; i++) t = this._items[i].el, t.style.position = null, t.style.left = null, e = this._items[i].parentElement, e && e.appendChild(t)
        }, l.resize = function() {
            this._currentWidth = 0;
            var t, e = 0,
                i = this._items.length,
                r = "rtl" === document.dir ? "right" : "left";
            for (e; e < i; e++) t = this._items[e].el, t.style.position = "absolute", t.style[r] = this._currentWidth + "px", this._currentWidth += n(t, this._useClientWidthForItemWidth);
            this._el.style.width = this._currentWidth + "px"
        }, l.destroy = function() {
            this.removeItems(), this._items = null, this._currentWidth = null;
            var t = this._el.parentElement;
            t && t.removeChild(this._el), a.destroy.call(this)
        }, e.exports = r
    }, {
        "./../helpers/getElementFullWidth": 147,
        "./SlideItem": 152,
        "@marcom/ac-polyfills/Array/from": void 0
    }],
    154: [function(t, e, i) {
        "use strict";
        var r = "";
        r += '<div class="paddlenav" data-analytics-gallery-interaction-type="paddlenav">', r += "<ul>", r += '<li><button class="paddlenav-arrow paddlenav-arrow-previous" data-ac-gallery-previous-trigger="%ID%"></button></li>', r += '<li><button class="paddlenav-arrow paddlenav-arrow-next" data-ac-gallery-next-trigger="%ID%"></button></li>', r += "</ul>", r += "</div>", e.exports = r
    }, {}],
    155: [function(t, e, i) {
        "use strict";

        function r(t) {
            this._keysDown = {}, this._DOMKeyDown = this._DOMKeyDown.bind(this), this._DOMKeyUp = this._DOMKeyUp.bind(this), this._context = t || document, s(this._context, c, this._DOMKeyDown, !0), s(this._context, u, this._DOMKeyUp, !0), n.call(this)
        }
        var n = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            s = t("@marcom/ac-dom-events/utils/addEventListener"),
            o = t("@marcom/ac-dom-events/utils/removeEventListener"),
            a = t("@marcom/ac-object/create"),
            l = t("./internal/KeyEvent"),
            c = "keydown",
            u = "keyup",
            h = r.prototype = a(n.prototype);
        h.onDown = function(t, e) {
            return this.on(c + ":" + t, e)
        }, h.onceDown = function(t, e) {
            return this.once(c + ":" + t, e)
        }, h.offDown = function(t, e) {
            return this.off(c + ":" + t, e)
        }, h.onUp = function(t, e) {
            return this.on(u + ":" + t, e)
        }, h.onceUp = function(t, e) {
            return this.once(u + ":" + t, e)
        }, h.offUp = function(t, e) {
            return this.off(u + ":" + t, e)
        }, h.isDown = function(t) {
            return t += "", this._keysDown[t] || !1
        }, h.isUp = function(t) {
            return !this.isDown(t)
        }, h.destroy = function() {
            return o(this._context, c, this._DOMKeyDown, !0), o(this._context, u, this._DOMKeyUp, !0), this._keysDown = null, this._context = null, n.prototype.destroy.call(this), this
        }, h._DOMKeyDown = function(t) {
            var e = this._normalizeKeyboardEvent(t),
                i = e.keyCode += "";
            this._trackKeyDown(i), this.trigger(c + ":" + i, e)
        }, h._DOMKeyUp = function(t) {
            var e = this._normalizeKeyboardEvent(t),
                i = e.keyCode += "";
            this._trackKeyUp(i), this.trigger(u + ":" + i, e)
        }, h._normalizeKeyboardEvent = function(t) {
            return new l(t)
        }, h._trackKeyUp = function(t) {
            this._keysDown[t] && (this._keysDown[t] = !1)
        }, h._trackKeyDown = function(t) {
            this._keysDown[t] || (this._keysDown[t] = !0)
        }, e.exports = r
    }, {
        "./internal/KeyEvent": 157,
        "@marcom/ac-dom-events/utils/addEventListener": 55,
        "@marcom/ac-dom-events/utils/removeEventListener": 57,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-object/create": 169
    }],
    156: [function(t, e, i) {
        "use strict";
        var r = t("./Keyboard");
        e.exports = new r
    }, {
        "./Keyboard": 155
    }],
    157: [function(t, e, i) {
        "use strict";

        function r(t) {
            this.originalEvent = t;
            var e;
            for (e in t) n.indexOf(e) === -1 && "function" != typeof t[e] && (this[e] = t[e]);
            this.location = void 0 !== this.originalEvent.location ? this.originalEvent.location : this.originalEvent.keyLocation
        }
        var n = ["keyLocation"];
        r.prototype = {
            preventDefault: function() {
                return "function" != typeof this.originalEvent.preventDefault ? void(this.originalEvent.returnValue = !1) : this.originalEvent.preventDefault()
            },
            stopPropagation: function() {
                return this.originalEvent.stopPropagation()
            }
        }, e.exports = r
    }, {}],
    158: [function(t, e, i) {
        "use strict";
        e.exports = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CONTROL: 17,
            ALT: 18,
            COMMAND: 91,
            CAPSLOCK: 20,
            ESCAPE: 27,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            DELETE: 46,
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_ZERO: 96,
            NUMPAD_ONE: 97,
            NUMPAD_TWO: 98,
            NUMPAD_THREE: 99,
            NUMPAD_FOUR: 100,
            NUMPAD_FIVE: 101,
            NUMPAD_SIX: 102,
            NUMPAD_SEVEN: 103,
            NUMPAD_EIGHT: 104,
            NUMPAD_NINE: 105,
            NUMPAD_ASTERISK: 106,
            NUMPAD_PLUS: 107,
            NUMPAD_DASH: 109,
            NUMPAD_DOT: 110,
            NUMPAD_SLASH: 111,
            NUMPAD_EQUALS: 187,
            TICK: 192,
            LEFT_BRACKET: 219,
            RIGHT_BRACKET: 221,
            BACKSLASH: 220,
            SEMICOLON: 186,
            APOSTRAPHE: 222,
            APOSTROPHE: 222,
            SPACEBAR: 32,
            CLEAR: 12,
            COMMA: 188,
            DOT: 190,
            SLASH: 191
        }
    }, {}],
    159: [function(t, e, i) {
        "use strict";
        e.exports = {
            Modal: t("./ac-modal-basic/Modal"),
            Renderer: t("./ac-modal-basic/Renderer"),
            classNames: t("./ac-modal-basic/classNames"),
            dataAttributes: t("./ac-modal-basic/dataAttributes")
        }
    }, {
        "./ac-modal-basic/Modal": 160,
        "./ac-modal-basic/Renderer": 161,
        "./ac-modal-basic/classNames": 162,
        "./ac-modal-basic/dataAttributes": 163
    }],
    160: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            c.call(this), this.options = o.defaults(h, t), this.renderer = new u(e), this.opened = !1, this._keysToClose = [l.ESCAPE], this._attachedKeysToClose = [], this.close = this.close.bind(this)
        }
        var n = {
                addEventListener: t("@marcom/ac-dom-events/addEventListener"),
                removeEventListener: t("@marcom/ac-dom-events/removeEventListener"),
                target: t("@marcom/ac-dom-events/target")
            },
            s = {
                getScrollX: t("@marcom/ac-dom-metrics/getScrollX"),
                getScrollY: t("@marcom/ac-dom-metrics/getScrollY")
            },
            o = {
                create: t("@marcom/ac-object/create"),
                defaults: t("@marcom/ac-object/defaults")
            },
            a = t("@marcom/ac-keyboard"),
            l = t("@marcom/ac-keyboard/keyMap"),
            c = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            u = t("./Renderer"),
            h = {
                retainScrollPosition: !1
            },
            m = r.prototype = o.create(c.prototype);
        m.open = function() {
            this.options.retainScrollPosition && this._saveScrollPosition(), this.opened || (this._attachEvents(), this.trigger("willopen"), this.renderer.open(), this.opened = !0, this.trigger("open"))
        }, m.close = function(t) {
            var e, i;
            if (this.opened) {
                if (t && "click" === t.type && (e = n.target(t), i = this.renderer.options.dataAttributes.close, !e.hasAttribute(i))) return;
                this.trigger("willclose"), this._removeEvents(), this.renderer.close(), this.options.retainScrollPosition && this._restoreScrollPosition(), this.opened = !1, this.trigger("close")
            }
        }, m.render = function() {
            this.renderer.render()
        }, m.appendContent = function(t, e) {
            this.renderer.appendContent(t, e)
        }, m.removeContent = function(t) {
            this.renderer.removeContent(t)
        }, m.destroy = function() {
            this._removeEvents(), this.renderer.destroy();
            for (var t in this) this.hasOwnProperty(t) && (this[t] = null)
        }, m.addKeyToClose = function(t) {
            var e = this._keysToClose.indexOf(t);
            e === -1 && (this._keysToClose.push(t), this._bindKeyToClose(t))
        }, m.removeKeyToClose = function(t) {
            var e = this._keysToClose.indexOf(t);
            e !== -1 && this._keysToClose.splice(e, 1), this._releaseKeyToClose(t)
        }, m._bindKeyToClose = function(t) {
            var e = this._attachedKeysToClose.indexOf(t);
            e === -1 && (a.onUp(t, this.close), this._attachedKeysToClose.push(t))
        }, m._releaseKeyToClose = function(t) {
            var e = this._attachedKeysToClose.indexOf(t);
            e !== -1 && (a.offUp(t, this.close), this._attachedKeysToClose.splice(e, 1))
        }, m._removeEvents = function() {
            this.renderer.modalElement && n.removeEventListener(this.renderer.modalElement, "click", this.close), this._keysToClose.forEach(this._releaseKeyToClose, this);
        }, m._attachEvents = function() {
            this.renderer.modalElement && n.addEventListener(this.renderer.modalElement, "click", this.close), this._keysToClose.forEach(this._bindKeyToClose, this)
        }, m._restoreScrollPosition = function() {
            window.scrollTo(this._scrollX || 0, this._scrollY || 0)
        }, m._saveScrollPosition = function() {
            this._scrollX = s.getScrollX(), this._scrollY = s.getScrollY()
        }, e.exports = r
    }, {
        "./Renderer": 161,
        "@marcom/ac-dom-events/addEventListener": 48,
        "@marcom/ac-dom-events/removeEventListener": 51,
        "@marcom/ac-dom-events/target": 54,
        "@marcom/ac-dom-metrics/getScrollX": 60,
        "@marcom/ac-dom-metrics/getScrollY": 61,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-keyboard": 156,
        "@marcom/ac-keyboard/keyMap": 158,
        "@marcom/ac-object/create": 169,
        "@marcom/ac-object/defaults": 170
    }],
    161: [function(t, e, i) {
        "use strict";
        var r = {
                add: t("@marcom/ac-classlist/add"),
                remove: t("@marcom/ac-classlist/remove")
            },
            n = {
                defaults: t("@marcom/ac-object/defaults")
            },
            s = {
                remove: t("@marcom/ac-dom-nodes/remove"),
                isElement: t("@marcom/ac-dom-nodes/isElement")
            },
            o = t("./classNames"),
            a = t("./dataAttributes"),
            l = {
                modalElement: null,
                contentElement: null,
                closeButton: null,
                classNames: o,
                dataAttributes: a
            },
            c = function(t) {
                t = t || {}, this.options = n.defaults(l, t), this.options.classNames = n.defaults(l.classNames, t.classNames), this.options.dataAttributes = n.defaults(l.dataAttributes, t.dataAttributes), this.modalElement = this.options.modalElement, this.contentElement = this.options.contentElement, this.closeButton = this.options.closeButton
            },
            u = c.prototype;
        u.render = function() {
            return s.isElement(this.modalElement) || (this.modalElement = this.renderModalElement(this.options.classNames.modalElement)), s.isElement(this.contentElement) || (this.contentElement = this.renderContentElement(this.options.classNames.contentElement)), this.closeButton !== !1 && (s.isElement(this.closeButton) || (this.closeButton = this.renderCloseButton(this.options.classNames.closeButton)), this.modalElement.appendChild(this.closeButton)), this.modalElement.appendChild(this.contentElement), document.body.appendChild(this.modalElement), this.modalElement
        }, u.renderCloseButton = function(t) {
            var e;
            return t = t || this.options.classNames.closeButton, e = this._renderElement("button", t), e.setAttribute(this.options.dataAttributes.close, ""), e
        }, u.renderModalElement = function(t) {
            return t = t || this.options.classNames.modalElement, this._renderElement("div", t)
        }, u.renderContentElement = function(t) {
            return t = t || this.options.classNames.contentElement, this._renderElement("div", t)
        }, u.appendContent = function(t, e) {
            s.isElement(t) && (void 0 === arguments[1] ? this.contentElement.appendChild(t) : s.isElement(e) && e.appendChild(t))
        }, u.removeContent = function(t) {
            t ? this.modalElement.contains(t) && s.remove(t) : this._emptyContent()
        }, u.open = function() {
            var t = [document.documentElement].concat(this.options.classNames.documentElement),
                e = [this.modalElement].concat(this.options.classNames.modalOpen);
            r.add.apply(null, t), r.add.apply(null, e)
        }, u.close = function() {
            var t = [document.documentElement].concat(this.options.classNames.documentElement),
                e = [this.modalElement].concat(this.options.classNames.modalOpen);
            r.remove.apply(null, t), r.remove.apply(null, e)
        }, u.destroy = function() {
            var t = [document.documentElement].concat(this.options.classNames.documentElement);
            this.modalElement && document.body.contains(this.modalElement) && (this.close(), document.body.removeChild(this.modalElement)), r.remove.apply(null, t);
            for (var e in this) this.hasOwnProperty(e) && (this[e] = null)
        }, u._renderElement = function(t, e) {
            var i = document.createElement(t),
                n = [i];
            return e && (n = n.concat(e)), r.add.apply(null, n), i
        }, u._emptyContent = function() {
            this.contentElement.innerHTML = ""
        }, e.exports = c
    }, {
        "./classNames": 162,
        "./dataAttributes": 163,
        "@marcom/ac-classlist/add": 13,
        "@marcom/ac-classlist/remove": 18,
        "@marcom/ac-dom-nodes/isElement": 72,
        "@marcom/ac-dom-nodes/remove": 74,
        "@marcom/ac-object/defaults": 170
    }],
    162: [function(t, e, i) {
        "use strict";
        e.exports = {
            modalElement: "modal",
            modalOpen: "modal-open",
            documentElement: "has-modal",
            contentElement: "modal-content",
            closeButton: "modal-close"
        }
    }, {}],
    163: [function(t, e, i) {
        "use strict";
        e.exports = {
            close: "data-modal-close"
        }
    }, {}],
    164: [function(t, e, i) {
        "use strict";
        e.exports = {
            Modal: t("./ac-modal/Modal"),
            createStandardModal: t("./ac-modal/factory/createStandardModal"),
            createFullViewportModal: t("./ac-modal/factory/createFullViewportModal")
        }
    }, {
        "./ac-modal/Modal": 165,
        "./ac-modal/factory/createFullViewportModal": 166,
        "./ac-modal/factory/createStandardModal": 167
    }],
    165: [function(t, e, i) {
        "use strict";

        function r(t) {
            s.call(this), this.options = t || {}, this._modal = new n(t, this.options.renderer), this.opened = !1, this._render(), this.closeButton = this._modal.renderer.closeButton, this.modalElement = this._modal.renderer.modalElement, this.contentElement = this._modal.renderer.contentElement, this.modalElement.setAttribute("role", "dialog"), this.modalElement.setAttribute("aria-label", "Modal"), this.modalElement.setAttribute("tabindex", "-1"), this.closeButton.setAttribute("aria-label", "Close"), this._circularTab = new o(this.modalElement), this._onWillOpen = this._onWillOpen.bind(this), this._onOpen = this._onOpen.bind(this), this._onWillClose = this._onWillClose.bind(this), this._onClose = this._onClose.bind(this), this._bindEvents()
        }
        var n = t("@marcom/ac-modal-basic").Modal,
            s = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            o = t("@marcom/ac-accessibility/CircularTab"),
            a = r.prototype = Object.create(s.prototype);
        a.open = function() {
            this._modal.open(), this.opened = this._modal.opened
        }, a.close = function() {
            this._modal.close()
        }, a.appendContent = function(t) {
            this._modal.appendContent(t)
        }, a.removeContent = function(t) {
            this._modal.removeContent(t)
        }, a.destroy = function() {
            this._releaseEvents(), this._modal.destroy(), this._removeModalFocus(), this._circularTab.destroy(), this._focusObj = null;
            for (var t in this) this.hasOwnProperty(t) && (this[t] = null)
        }, a.addKeyToClose = function(t) {
            this._modal.addKeyToClose(t)
        }, a.removeKeyToClose = function(t) {
            this._modal.removeKeyToClose(t)
        }, a._render = function() {
            this._modal.render(), this._modal.renderer.modalElement.setAttribute("aria-hidden", "true")
        }, a._bindEvents = function() {
            this._modal.on("willopen", this._onWillOpen), this._modal.on("open", this._onOpen), this._modal.on("willclose", this._onWillClose), this._modal.on("close", this._onClose)
        }, a._releaseEvents = function() {
            this._modal.off("willopen", this._onWillOpen), this._modal.off("open", this._onOpen), this._modal.off("willclose", this._onWillClose), this._modal.off("close", this._onClose)
        }, a._onWillOpen = function() {
            this.trigger("willopen")
        }, a._onOpen = function() {
            this.opened = this._modal.opened, this._giveModalFocus(), this.trigger("open")
        }, a._onWillClose = function() {
            this.trigger("willclose"), this._removeModalFocus()
        }, a._onClose = function() {
            this.opened = this._modal.opened, this.trigger("close")
        }, a._giveModalFocus = function() {
            this.modalElement.removeAttribute("aria-hidden"), this._activeElement = document.activeElement, this.modalElement.focus(), this._circularTab.start()
        }, a._removeModalFocus = function() {
            this._circularTab.stop(), this.modalElement.setAttribute("aria-hidden", "true"), this._activeElement && (this._activeElement.focus(), this._activeElement = null)
        }, e.exports = r
    }, {
        "@marcom/ac-accessibility/CircularTab": 1,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-modal-basic": 159
    }],
    166: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            var i = new n(o),
                r = e || {};
            return t && i.appendContent(t), r.removeContainerPadding && i.modalElement.classList.add("remove-container-padding"), i
        }
        var n = t("../Modal"),
            s = t("@marcom/ac-modal-basic").classNames,
            o = {
                retainScrollPosition: !0,
                renderer: {
                    classNames: {
                        documentElement: [s.documentElement].concat("has-modal-full-viewport"),
                        modalElement: [s.modalElement].concat("modal-full-viewport")
                    }
                }
            };
        e.exports = r
    }, {
        "../Modal": 165,
        "@marcom/ac-modal-basic": 159
    }],
    167: [function(t, e, i) {
        "use strict";

        function r(t) {
            var e = new n(l);
            t && e.appendContent(t);
            var i = document.createElement("div"),
                r = document.createElement("div"),
                s = document.createElement("div"),
                c = document.createElement("div");
            return a.add(i, "content-table"), a.add(r, "content-cell"), a.add(s, "content-wrapper"), a.add(c, "content-padding", "large-8", "medium-10"), e.modalElement.setAttribute(o.close, ""), s.setAttribute(o.close, ""), r.setAttribute(o.close, ""), i.appendChild(r), r.appendChild(s), s.appendChild(c), e.modalElement.appendChild(i), c.appendChild(e.contentElement), c.appendChild(e.closeButton), e
        }
        var n = t("../Modal"),
            s = t("@marcom/ac-modal-basic").classNames,
            o = t("@marcom/ac-modal-basic").dataAttributes,
            a = {
                add: t("@marcom/ac-classlist/add")
            },
            l = {
                renderer: {
                    classNames: {
                        documentElement: [s.documentElement].concat("has-modal-standard"),
                        modalElement: [s.modalElement].concat("modal-standard")
                    }
                }
            };
        e.exports = r
    }, {
        "../Modal": 165,
        "@marcom/ac-classlist/add": 13,
        "@marcom/ac-modal-basic": 159
    }],
    168: [function(t, e, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        t("@marcom/ac-polyfills/Array/isArray");
        var n = t("./extend"),
            s = Object.prototype.hasOwnProperty,
            o = function a(t, e) {
                var i;
                for (i in e) s.call(e, i) && (null === e[i] ? t[i] = null : "object" === r(e[i]) ? (t[i] = Array.isArray(e[i]) ? [] : {}, a(t[i], e[i])) : t[i] = e[i]);
                return t
            };
        e.exports = function(t, e) {
            return e ? o({}, t) : n({}, t)
        }
    }, {
        "./extend": 171,
        "@marcom/ac-polyfills/Array/isArray": void 0
    }],
    169: [function(t, e, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            n = function() {};
        e.exports = function(t) {
            if (arguments.length > 1) throw new Error("Second argument not supported");
            if (null === t || "object" !== ("undefined" == typeof t ? "undefined" : r(t))) throw new TypeError("Object prototype may only be an Object.");
            return "function" == typeof Object.create ? Object.create(t) : (n.prototype = t, new n)
        }
    }, {}],
    170: [function(t, e, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            n = t("./extend");
        e.exports = function(t, e) {
            if ("object" !== ("undefined" == typeof t ? "undefined" : r(t))) throw new TypeError("defaults: must provide a defaults object");
            if (e = e || {}, "object" !== ("undefined" == typeof e ? "undefined" : r(e))) throw new TypeError("defaults: options must be a typeof object");
            return n({}, t, e)
        }
    }, {
        "./extend": 171
    }],
    171: [function(t, e, i) {
        "use strict";
        t("@marcom/ac-polyfills/Array/prototype.forEach");
        var r = Object.prototype.hasOwnProperty;
        e.exports = function() {
            var t, e;
            return t = arguments.length < 2 ? [{}, arguments[0]] : [].slice.call(arguments), e = t.shift(), t.forEach(function(t) {
                if (null != t)
                    for (var i in t) r.call(t, i) && (e[i] = t[i])
            }), e
        }
    }, {
        "@marcom/ac-polyfills/Array/prototype.forEach": void 0
    }],
    172: [function(t, e, i) {
        "use strict";
        e.exports = {
            PageVisibilityManager: t("./ac-page-visibility/PageVisibilityManager")
        }
    }, {
        "./ac-page-visibility/PageVisibilityManager": 173
    }],
    173: [function(t, e, i) {
        "use strict";

        function r() {
            if ("undefined" != typeof document.addEventListener) {
                var t;
                "undefined" != typeof document.hidden ? (this._hidden = "hidden", t = "visibilitychange") : "undefined" != typeof document.mozHidden ? (this._hidden = "mozHidden", t = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (this._hidden = "msHidden", t = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (this._hidden = "webkitHidden", t = "webkitvisibilitychange"), "undefined" == typeof document[this._hidden] ? this.isHidden = !1 : this.isHidden = document[this._hidden], t && document.addEventListener(t, this._handleVisibilityChange.bind(this), !1), s.call(this)
            }
        }
        var n = t("@marcom/ac-object/create"),
            s = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            o = r.prototype = n(s.prototype);
        o.CHANGED = "changed", o._handleVisibilityChange = function(t) {
            this.isHidden = document[this._hidden], this.trigger(this.CHANGED, {
                isHidden: this.isHidden
            })
        }, e.exports = new r
    }, {
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-object/create": 169
    }],
    174: [function(t, e, i) {
        "use strict";
        e.exports = {
            PointerTracker: t("./ac-pointer-tracker/PointerTracker")
        }
    }, {
        "./ac-pointer-tracker/PointerTracker": 175
    }],
    175: [function(t, e, i) {
        "use strict";

        function r(t, e, i) {
            this._el = t, i = i || {}, this._lockVertical = i.lockVertical !== !1, this._swipeThreshold = i.swipeThreshold || r.DEFAULT_SWIPE_THRESHOLD, this._pointerEvents = e || {}, this._trackHover = i.trackHover, this._trackHover ? (this._pointerEvents.down = this._pointerEvents.down || r.MOUSE_EVENTS.over, this._pointerEvents.up = this._pointerEvents.up || r.MOUSE_EVENTS.out) : (this._pointerEvents.down = this._pointerEvents.down || (a ? r.TOUCH_EVENTS.down : r.MOUSE_EVENTS.down), this._pointerEvents.up = this._pointerEvents.up || (a ? r.TOUCH_EVENTS.up : r.MOUSE_EVENTS.up)), this._pointerEvents.out = this._pointerEvents.out || (a ? r.TOUCH_EVENTS.out : r.MOUSE_EVENTS.out), this._pointerEvents.move = this._pointerEvents.move || (a ? r.TOUCH_EVENTS.move : r.MOUSE_EVENTS.move), this._onMouseDown = this._onMouseDown.bind(this), this._onMouseUp = this._onMouseUp.bind(this), this._onMouseOut = this._onMouseOut.bind(this), this._onMouseMove = this._onMouseMove.bind(this), l.call(this), this._el.addEventListener(this._pointerEvents.down, this._onMouseDown, o), this._setCursorStyle("grab")
        }
        var n = t("@marcom/useragent-detect"),
            s = n.os.android,
            o = !n.browser.ie && {
                passive: !1
            },
            a = t("@marcom/ac-feature/touchAvailable")(),
            l = t("@marcom/ac-event-emitter-micro").EventEmitterMicro;
        r.START = "start", r.END = "end", r.UPDATE = "update", r.SWIPE_RIGHT = "swiperight", r.SWIPE_LEFT = "swipeleft", r.DEFAULT_SWIPE_THRESHOLD = s ? 2 : 8, r.TOUCH_EVENTS = {
            down: "touchstart",
            up: "touchend",
            out: "mouseout",
            move: "touchmove"
        }, r.MOUSE_EVENTS = {
            down: "mousedown",
            up: "mouseup",
            out: "mouseout",
            move: "mousemove",
            over: "mouseover"
        };
        var c = l.prototype,
            u = r.prototype = Object.create(c);
        u.destroy = function() {
            return this._isDragging && this._onMouseUp(), this._el.removeEventListener(this._pointerEvents.down, this._onMouseDown), this._setCursorStyle(null), this._el = null, this._pointerEvents = null, this._lockVertical = null, this._swipeThreshold = null, this._checkForTouchScrollY = null, this._isDragging = null, this._currentX = null, this._currentY = null, this._velocityX = null, this._velocityY = null, this._lastX = null, this._lastY = null, c.destroy.call(this)
        }, u._onMouseDown = function(t) {
            if (!this._isDragging) {
                this._isDragging = !0, this._setCursorStyle("grabbing"), this._el.removeEventListener(this._pointerEvents.down, this._onMouseDown), document.body.addEventListener(this._pointerEvents.up, this._onMouseUp, o), document.addEventListener(this._pointerEvents.out, this._onMouseOut, o), document.body.addEventListener(this._pointerEvents.move, this._onMouseMove, o), this._checkForTouchScrollY = this._lockVertical && !(!t.touches || !t.touches[0]), this._checkForTouchScrollY && (this._lastY = this._getTouchY(t));
                var e = this._storeAndGetValues(t);
                this._velocityX = e.diffX = 0, this._velocityY = e.diffY = 0, this.trigger(r.START, e)
            }
        }, u._onMouseUp = function(t) {
            if (this._isDragging) {
                this._isDragging = !1, this._setCursorStyle("grab"), this._el.addEventListener(this._pointerEvents.down, this._onMouseDown, o), document.body.removeEventListener(this._pointerEvents.up, this._onMouseUp), document.removeEventListener(this._pointerEvents.out, this._onMouseOut), document.body.removeEventListener(this._pointerEvents.move, this._onMouseMove);
                var e;
                this._checkForTouchScrollY || this._trackHover ? e = null : this._velocityX > this._swipeThreshold ? e = r.SWIPE_LEFT : this._velocityX * -1 > this._swipeThreshold && (e = r.SWIPE_RIGHT);
                var i = this._storeAndGetValues(t);
                i.swipe = e, this.trigger(r.END, i), e && !this._trackHover && this.trigger(e, i)
            }
        }, u._onMouseOut = function(t) {
            t = t ? t : window.event;
            var e = t.relatedTarget || t.toElement;
            e && "HTML" !== e.nodeName || this._onMouseUp(t)
        }, u._onMouseMove = function(t) {
            return this._checkForTouchScrollY && this._isVerticalTouchMove(t) ? void this._onMouseUp(t) : (t.preventDefault(), void this.trigger(r.UPDATE, this._storeAndGetValues(t)))
        }, u._storeAndGetValues = function(t) {
            if (void 0 === t) return {};
            this._currentX = this._getPointerX(t), this._currentY = this._getPointerY(t), this._velocityX = this._lastX - this._currentX, this._velocityY = this._lastY - this._currentY;
            var e = {
                x: this._currentX,
                y: this._currentY,
                lastX: this._lastX,
                lastY: this._lastY,
                diffX: this._velocityX,
                diffY: this._velocityY,
                interactionEvent: t
            };
            return this._lastX = this._currentX, this._lastY = this._currentY, e
        }, u._getPointerX = function(t) {
            return t.pageX ? t.pageX : t.touches && t.touches[0] ? t.touches[0].pageX : t.clientX ? t.clientX : 0
        }, u._getPointerY = function(t) {
            return t.pageY ? t.pageY : t.touches && t.touches[0] ? t.touches[0].pageY : t.clientY ? t.clientY : 0
        }, u._getTouchX = function(t) {
            return t.touches && t.touches[0] ? t.touches[0].pageX : 0
        }, u._getTouchY = function(t) {
            return t.touches && t.touches[0] ? t.touches[0].pageY : 0
        }, u._isVerticalTouchMove = function(t) {
            var e = this._getTouchX(t),
                i = this._getTouchY(t),
                r = Math.abs(e - this._lastX),
                n = Math.abs(i - this._lastY);
            return this._checkForTouchScrollY = r < n, this._checkForTouchScrollY
        }, u._setCursorStyle = function(t) {
            this._el.style.cursor = t
        }, e.exports = r
    }, {
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-feature/touchAvailable": 125,
        "@marcom/useragent-detect": 295
    }],
    176: [function(t, e, i) {
        "use strict";
        var r = t("./utils/eventTypeAvailable"),
            n = t("./shared/camelCasedEventTypes"),
            s = t("./shared/windowFallbackEventTypes"),
            o = t("./shared/prefixHelper"),
            a = {};
        e.exports = function l(t, e) {
            var i, c, u;
            if (e = e || "div", t = t.toLowerCase(), e in a || (a[e] = {}), c = a[e], t in c) return c[t];
            if (r(t, e)) return c[t] = t;
            if (t in n)
                for (u = 0; u < n[t].length; u++)
                    if (i = n[t][u], r(i.toLowerCase(), e)) return c[t] = i;
            for (u = 0; u < o.evt.length; u++)
                if (i = o.evt[u] + t, r(i, e)) return o.reduce(u), c[t] = i;
            return "window" !== e && s.indexOf(t) ? c[t] = l(t, "window") : c[t] = !1
        }
    }, {
        "./shared/camelCasedEventTypes": 180,
        "./shared/prefixHelper": 182,
        "./shared/windowFallbackEventTypes": 185,
        "./utils/eventTypeAvailable": 187
    }],
    177: [function(t, e, i) {
        "use strict";
        var r = t("./shared/stylePropertyCache"),
            n = t("./getStyleProperty"),
            s = t("./getStyleValue");
        e.exports = function(t, e) {
            var i;
            if (t = n(t), !t) return !1;
            if (i = r[t].css, "undefined" != typeof e) {
                if (e = s(t, e), e === !1) return !1;
                i += ":" + e + ";"
            }
            return i
        }
    }, {
        "./getStyleProperty": 178,
        "./getStyleValue": 179,
        "./shared/stylePropertyCache": 183
    }],
    178: [function(t, e, i) {
        "use strict";
        var r = t("./shared/stylePropertyCache"),
            n = t("./shared/getStyleTestElement"),
            s = t("./utils/toCSS"),
            o = t("./utils/toDOM"),
            a = t("./shared/prefixHelper"),
            l = function(t, e) {
                var i = s(t),
                    n = e !== !1 && s(e);
                return r[t] = r[e] = r[i] = r[n] = {
                    dom: e,
                    css: n
                }, e
            };
        e.exports = function(t) {
            var e, i, s, c;
            if (t += "", t in r) return r[t].dom;
            for (s = n(), t = o(t), i = t.charAt(0).toUpperCase() + t.substring(1), e = "filter" === t ? ["WebkitFilter", "filter"] : (t + " " + a.dom.join(i + " ") + i).split(" "), c = 0; c < e.length; c++)
                if ("undefined" != typeof s.style[e[c]]) return 0 !== c && a.reduce(c - 1), l(t, e[c]);
            return l(t, !1)
        }
    }, {
        "./shared/getStyleTestElement": 181,
        "./shared/prefixHelper": 182,
        "./shared/stylePropertyCache": 183,
        "./utils/toCSS": 188,
        "./utils/toDOM": 189
    }],
    179: [function(t, e, i) {
        "use strict";
        var r = t("./getStyleProperty"),
            n = t("./shared/styleValueAvailable"),
            s = t("./shared/prefixHelper"),
            o = t("./shared/stylePropertyCache"),
            a = {},
            l = /(\([^\)]+\))/gi,
            c = /([^ ,;\(]+(\([^\)]+\))?)/gi;
        e.exports = function(t, e) {
            var i;
            return e += "", !!(t = r(t)) && (n(t, e) ? e : (i = o[t].css, e = e.replace(c, function(e) {
                var r, o, c, u;
                if ("#" === e[0] || !isNaN(e[0])) return e;
                if (o = e.replace(l, ""), c = i + ":" + o, c in a) return a[c] === !1 ? "" : e.replace(o, a[c]);
                for (r = s.css.map(function(t) {
                        return t + e
                    }), r = [e].concat(r), u = 0; u < r.length; u++)
                    if (n(t, r[u])) return 0 !== u && s.reduce(u - 1), a[c] = r[u].replace(l, ""), r[u];
                return a[c] = !1, ""
            }), e = e.trim(), "" !== e && e))
        }
    }, {
        "./getStyleProperty": 178,
        "./shared/prefixHelper": 182,
        "./shared/stylePropertyCache": 183,
        "./shared/styleValueAvailable": 184
    }],
    180: [function(t, e, i) {
        "use strict";
        e.exports = {
            transitionend: ["webkitTransitionEnd", "MSTransitionEnd"],
            animationstart: ["webkitAnimationStart", "MSAnimationStart"],
            animationend: ["webkitAnimationEnd", "MSAnimationEnd"],
            animationiteration: ["webkitAnimationIteration", "MSAnimationIteration"],
            fullscreenchange: ["MSFullscreenChange"],
            fullscreenerror: ["MSFullscreenError"]
        }
    }, {}],
    181: [function(t, e, i) {
        "use strict";
        var r;
        e.exports = function() {
            return r ? (r.style.cssText = "", r.removeAttribute("style")) : r = document.createElement("_"), r
        }, e.exports.resetElement = function() {
            r = null
        }
    }, {}],
    182: [function(t, e, i) {
        "use strict";
        var r = ["-webkit-", "-moz-", "-ms-"],
            n = ["Webkit", "Moz", "ms"],
            s = ["webkit", "moz", "ms"],
            o = function() {
                this.initialize()
            },
            a = o.prototype;
        a.initialize = function() {
            this.reduced = !1, this.css = r, this.dom = n, this.evt = s
        }, a.reduce = function(t) {
            this.reduced || (this.reduced = !0, this.css = [this.css[t]], this.dom = [this.dom[t]], this.evt = [this.evt[t]])
        }, e.exports = new o
    }, {}],
    183: [function(t, e, i) {
        "use strict";
        e.exports = {}
    }, {}],
    184: [function(t, e, i) {
        "use strict";
        var r, n, s = t("./stylePropertyCache"),
            o = t("./getStyleTestElement"),
            a = !1,
            l = function() {
                var t;
                if (!a) {
                    a = !0, r = "CSS" in window && "supports" in window.CSS, n = !1, t = o();
                    try {
                        t.style.width = "invalid"
                    } catch (e) {
                        n = !0
                    }
                }
            };
        e.exports = function(t, e) {
            var i, a;
            if (l(), r) return t = s[t].css, CSS.supports(t, e);
            if (a = o(), i = a.style[t], n) try {
                a.style[t] = e
            } catch (c) {
                return !1
            } else a.style[t] = e;
            return a.style[t] && a.style[t] !== i
        }, e.exports.resetFlags = function() {
            a = !1
        }
    }, {
        "./getStyleTestElement": 181,
        "./stylePropertyCache": 183
    }],
    185: [function(t, e, i) {
        "use strict";
        e.exports = ["transitionend", "animationstart", "animationend", "animationiteration"]
    }, {}],
    186: [function(t, e, i) {
        "use strict";
        var r = /(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;
        e.exports = function(t) {
            return t = String.prototype.replace.call(t, r, ""), t.charAt(0).toLowerCase() + t.substring(1)
        }
    }, {}],
    187: [function(t, e, i) {
        "use strict";
        var r = {
            window: window,
            document: document
        };
        e.exports = function(t, e) {
            var i;
            return t = "on" + t, e in r || (r[e] = document.createElement(e)), i = r[e], t in i || "setAttribute" in i && (i.setAttribute(t, "return;"), "function" == typeof i[t])
        }
    }, {}],
    188: [function(t, e, i) {
        "use strict";
        var r = /^(webkit|moz|ms)/gi;
        e.exports = function(t) {
            return "cssfloat" === t.toLowerCase() ? "float" : (r.test(t) && (t = "-" + t), t.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase())
        }
    }, {}],
    189: [function(t, e, i) {
        "use strict";
        var r = /-([a-z])/g;
        e.exports = function(t) {
            return "float" === t.toLowerCase() ? "cssFloat" : (t = t.replace(r, function(t, e) {
                return e.toUpperCase()
            }), "Ms" === t.substr(0, 2) && (t = "ms" + t.substring(2)), t)
        }
    }, {}],
    190: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-shared-instance").SharedInstance,
            n = "ac-raf-emitter-id-generator:sharedRAFEmitterIDGeneratorInstance",
            s = "1.0.3",
            o = function() {
                this._currentID = 0
            };
        o.prototype.getNewID = function() {
            return this._currentID++, "raf:" + this._currentID
        }, e.exports = r.share(n, s, o)
    }, {
        "@marcom/ac-shared-instance": 203
    }],
    191: [function(t, e, i) {
        "use strict";
        e.exports = {
            EventEmitterMicro: t("./ac-event-emitter-micro/EventEmitterMicro")
        }
    }, {
        "./ac-event-emitter-micro/EventEmitterMicro": 192
    }],
    192: [function(t, e, i) {
        "use strict";

        function r() {
            this._events = {}
        }
        var n = r.prototype;
        n.on = function(t, e) {
            this._events[t] = this._events[t] || [], this._events[t].unshift(e)
        }, n.once = function(t, e) {
            function i(n) {
                r.off(t, i), void 0 !== n ? e(n) : e()
            }
            var r = this;
            this.on(t, i)
        }, n.off = function(t, e) {
            if (this.has(t)) {
                if (1 === arguments.length) return this._events[t] = null, void delete this._events[t];
                var i = this._events[t].indexOf(e);
                i !== -1 && this._events[t].splice(i, 1)
            }
        }, n.trigger = function(t, e) {
            if (this.has(t))
                for (var i = this._events[t].length - 1; i >= 0; i--) void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
        }, n.has = function(t) {
            return t in this._events != !1 && 0 !== this._events[t].length
        }, n.destroy = function() {
            for (var t in this._events) this._events[t] = null;
            this._events = null
        }, e.exports = r
    }, {}],
    193: [function(t, e, i) {
        "use strict";

        function r(t) {
            t = t || {}, s.call(this), this.id = a.getNewID(), this.executor = t.executor || o, this._reset(), this._willRun = !1, this._didDestroy = !1
        }
        var n, s = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            o = t("@marcom/ac-raf-executor/sharedRAFExecutorInstance"),
            a = t("@marcom/ac-raf-emitter-id-generator/sharedRAFEmitterIDGeneratorInstance");
        n = r.prototype = Object.create(s.prototype), n.run = function() {
            return this._willRun || (this._willRun = !0), this._subscribe()
        }, n.cancel = function() {
            this._unsubscribe(), this._willRun && (this._willRun = !1), this._reset()
        }, n.destroy = function() {
            var t = this.willRun();
            return this.cancel(), this.executor = null, s.prototype.destroy.call(this), this._didDestroy = !0, t
        }, n.willRun = function() {
            return this._willRun
        }, n.isRunning = function() {
            return this._isRunning
        }, n._subscribe = function() {
            return this.executor.subscribe(this)
        }, n._unsubscribe = function() {
            return this.executor.unsubscribe(this)
        }, n._onAnimationFrameStart = function(t) {
            this._isRunning = !0, this._willRun = !1, this._didEmitFrameData || (this._didEmitFrameData = !0, this.trigger("start", t))
        }, n._onAnimationFrameEnd = function(t) {
            this._willRun || (this.trigger("stop", t), this._reset())
        }, n._reset = function() {
            this._didEmitFrameData = !1, this._isRunning = !1
        }, e.exports = r
    }, {
        "@marcom/ac-event-emitter-micro": 191,
        "@marcom/ac-raf-emitter-id-generator/sharedRAFEmitterIDGeneratorInstance": 190,
        "@marcom/ac-raf-executor/sharedRAFExecutorInstance": 200
    }],
    194: [function(t, e, i) {
        "use strict";
        var r = t("./SingleCallRAFEmitter"),
            n = function(t) {
                this.rafEmitter = new r, this.rafEmitter.on(t, this._onRAFExecuted.bind(this)), this.requestAnimationFrame = this.requestAnimationFrame.bind(this), this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this), this._frameCallbacks = [], this._nextFrameCallbacks = [], this._currentFrameID = -1, this._cancelFrameIdx = -1, this._frameCallbackLength = 0, this._nextFrameCallbacksLength = 0, this._frameCallbackIteration = 0
            },
            s = n.prototype;
        s.requestAnimationFrame = function(t) {
            return this._currentFrameID = this.rafEmitter.run(), this._nextFrameCallbacks.push(this._currentFrameID, t), this._nextFrameCallbacksLength += 2, this._currentFrameID
        }, s.cancelAnimationFrame = function(t) {
            this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(t), this._cancelFrameIdx !== -1 && (this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2), this._nextFrameCallbacksLength -= 2, 0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel())
        }, s._onRAFExecuted = function(t) {
            for (this._frameCallbacks = this._nextFrameCallbacks, this._frameCallbackLength = this._nextFrameCallbacksLength, this._nextFrameCallbacks = [], this._nextFrameCallbacksLength = 0, this._frameCallbackIteration = 0; this._frameCallbackIteration < this._frameCallbackLength; this._frameCallbackIteration += 2) this._frameCallbacks[this._frameCallbackIteration + 1](t.time, t)
        }, e.exports = n
    }, {
        "./SingleCallRAFEmitter": 196
    }],
    195: [function(t, e, i) {
        "use strict";
        var r = t("./RAFInterface"),
            n = function() {
                this.events = {}
            },
            s = n.prototype;
        s.requestAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new r(t)), this.events[t].requestAnimationFrame
        }, s.cancelAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new r(t)), this.events[t].cancelAnimationFrame
        }, e.exports = new n
    }, {
        "./RAFInterface": 194
    }],
    196: [function(t, e, i) {
        "use strict";
        var r = t("./RAFEmitter"),
            n = function(t) {
                r.call(this, t)
            },
            s = n.prototype = Object.create(r.prototype);
        s._subscribe = function() {
            return this.executor.subscribe(this, !0)
        }, e.exports = n
    }, {
        "./RAFEmitter": 193
    }],
    197: [function(t, e, i) {
        "use strict";
        var r = t("./RAFInterfaceController");
        e.exports = r.requestAnimationFrame("draw")
    }, {
        "./RAFInterfaceController": 195
    }],
    198: [function(t, e, i) {
        "use strict";
        var r = t("./RAFInterfaceController");
        e.exports = r.requestAnimationFrame("update")
    }, {
        "./RAFInterfaceController": 195
    }],
    199: [function(t, e, i) {
        "use strict";

        function r(t) {
            t = t || {}, this._reset(), this._willRun = !1, this._totalSubscribeCount = -1, this._requestAnimationFrame = window.requestAnimationFrame, this._cancelAnimationFrame = window.cancelAnimationFrame, this._boundOnAnimationFrame = this._onAnimationFrame.bind(this), this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this)
        }
        t("@marcom/ac-polyfills/performance/now");
        var n;
        n = r.prototype, n.subscribe = function(t, e) {
            return this._totalSubscribeCount++, this._nextFrameSubscribers[t.id] || (e ? this._nextFrameSubscribersOrder.unshift(t.id) : this._nextFrameSubscribersOrder.push(t.id), this._nextFrameSubscribers[t.id] = t, this._nextFrameSubscriberArrayLength++, this._nextFrameSubscriberCount++, this._run()), this._totalSubscribeCount
        }, n.unsubscribe = function(t) {
            return !!this._nextFrameSubscribers[t.id] && (this._nextFrameSubscribers[t.id] = null, this._nextFrameSubscriberCount--, 0 === this._nextFrameSubscriberCount && this._cancel(), !0)
        }, n.trigger = function(t, e) {
            var i;
            for (i = 0; i < this._subscriberArrayLength; i++) null !== this._subscribers[this._subscribersOrder[i]] && this._subscribers[this._subscribersOrder[i]]._didDestroy === !1 && this._subscribers[this._subscribersOrder[i]].trigger(t, e)
        }, n.destroy = function() {
            var t = this._cancel();
            return this._subscribers = null, this._subscribersOrder = null, this._nextFrameSubscribers = null, this._nextFrameSubscribersOrder = null, this._rafData = null, this._boundOnAnimationFrame = null, this._onExternalAnimationFrame = null, t
        }, n.useExternalAnimationFrame = function(t) {
            if ("boolean" == typeof t) {
                var e = this._isUsingExternalAnimationFrame;
                return t && this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), !this._willRun || t || this._animationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), this._isUsingExternalAnimationFrame = t, t ? this._boundOnExternalAnimationFrame : e || !1
            }
        }, n._run = function() {
            if (!this._willRun) return this._willRun = !0, 0 === this.lastFrameTime && (this.lastFrameTime = performance.now()), this._animationFrameActive = !0, this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), !0
        }, n._cancel = function() {
            var t = !1;
            return this._animationFrameActive && (this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), this._animationFrameActive = !1, this._willRun = !1, t = !0), this._isRunning || this._reset(), t
        }, n._onSubscribersAnimationFrameStart = function(t) {
            var e;
            for (e = 0; e < this._subscriberArrayLength; e++) null !== this._subscribers[this._subscribersOrder[e]] && this._subscribers[this._subscribersOrder[e]]._didDestroy === !1 && this._subscribers[this._subscribersOrder[e]]._onAnimationFrameStart(t)
        }, n._onSubscribersAnimationFrameEnd = function(t) {
            var e;
            for (e = 0; e < this._subscriberArrayLength; e++) null !== this._subscribers[this._subscribersOrder[e]] && this._subscribers[this._subscribersOrder[e]]._didDestroy === !1 && this._subscribers[this._subscribersOrder[e]]._onAnimationFrameEnd(t)
        }, n._onAnimationFrame = function(t) {
            this._subscribers = this._nextFrameSubscribers, this._subscribersOrder = this._nextFrameSubscribersOrder, this._subscriberArrayLength = this._nextFrameSubscriberArrayLength, this._subscriberCount = this._nextFrameSubscriberCount, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this._isRunning = !0, this._willRun = !1, this._didRequestNextRAF = !1, this._rafData.delta = t - this.lastFrameTime, this.lastFrameTime = t, this._rafData.fps = 0, this._rafData.delta >= 1e3 && (this._rafData.delta = 0), 0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta), this._rafData.time = t, this._rafData.naturalFps = this._rafData.fps, this._rafData.timeNow = Date.now(), this._onSubscribersAnimationFrameStart(this._rafData), this.trigger("update", this._rafData), this.trigger("external", this._rafData), this.trigger("draw", this._rafData), this._onSubscribersAnimationFrameEnd(this._rafData), this._willRun || this._reset()
        }, n._onExternalAnimationFrame = function(t) {
            this._isUsingExternalAnimationFrame && this._onAnimationFrame(t)
        }, n._reset = function() {
            this._rafData = {
                time: 0,
                delta: 0,
                fps: 0,
                naturalFps: 0,
                timeNow: 0
            }, this._subscribers = {}, this._subscribersOrder = [], this._subscriberArrayLength = 0, this._subscriberCount = 0, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this._didEmitFrameData = !1, this._animationFrame = null, this._animationFrameActive = !1, this._isRunning = !1, this._shouldReset = !1, this.lastFrameTime = 0
        }, e.exports = r
    }, {
        "@marcom/ac-polyfills/performance/now": void 0
    }],
    200: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-shared-instance").SharedInstance,
            n = "ac-raf-executor:sharedRAFExecutorInstance",
            s = "2.0.1",
            o = t("./RAFExecutor");
        e.exports = r.share(n, s, o)
    }, {
        "./RAFExecutor": 199,
        "@marcom/ac-shared-instance": 203
    }],
    201: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            this.el = t, this._options = e || {}, this._wrapper = this.el.querySelector(this._options.itemsSelector), this._items = Array.prototype.slice.call(this.el.querySelectorAll(this._options.itemSelector)),
                this.lastCenteredItem = this._items[0], this._isRightToLeft = "rtl" === window.getComputedStyle(t).direction, this._inlineStart = this._isRightToLeft ? "right" : "left", this._inlineEnd = this._isRightToLeft ? "left" : "right", this._scrollType = this._scrollDirection(), this._usePaddles = void 0 === this._options.usePaddles ? a() : this._options.usePaddles, this.centerItem = this.centerItem.bind(this), this._onScrollClipUpdate = this._onScrollClipUpdate.bind(this), this._init()
        }
        var n = t("@marcom/ac-dom-metrics/getDimensions"),
            s = t("@marcom/ac-dom-metrics/getPosition"),
            o = t("@marcom/ac-clip").Clip,
            a = t("@marcom/ac-feature/touchAvailable"),
            l = r.prototype;
        l._init = function() {
            this._usePaddles && this._setupPaddles()
        }, l.centerItem = function(t, e) {
            this.lastCenteredItem = t;
            var i = n(this.el).width,
                r = .5 * i,
                o = s(t).left,
                a = n(t).width,
                l = o + .5 * a,
                c = Math.round(l - r);
            return e ? void(this.el.scrollLeft = this._setNormalizedScroll(c)) : (this._destroyCurrentClip(), this._isRightToLeft && (c *= -1), void this._smoothScrollTo(c))
        }, l._getPaddles = function() {
            var t = this._isRightToLeft ? this._options.rightPaddleSelector : this._options.leftPaddleSelector,
                e = this._isRightToLeft ? this._options.leftPaddleSelector : this._options.rightPaddleSelector;
            return {
                start: this.el.querySelector(t),
                end: this.el.querySelector(e)
            }
        }, l._setupPaddles = function() {
            this.el.classList.add("with-paddles"), this._paddles = this._getPaddles(), this._children = this._wrapper.children, this._childCount = this._wrapper.children.length, this._onScrollClipComplete = this._onScrollClipComplete.bind(this), this._onPaddleStartClick = this._onPaddleStartClick.bind(this), this._paddles.start.addEventListener("click", this._onPaddleStartClick), this._onPaddleEndClick = this._onPaddleEndClick.bind(this), this._paddles.end.addEventListener("click", this._onPaddleEndClick), this._onScroll = this._onScroll.bind(this), this._wrapper.addEventListener("scroll", this._onScroll), this._updateElementMetrics = this._updateElementMetrics.bind(this), window.addEventListener("resize", this._updateElementMetrics), window.addEventListener("orientationchange", this._updateElementMetrics), this._updateElementMetrics()
        }, l._updateElementMetrics = function() {
            this._wrapperWidth = this._wrapper.offsetWidth, this._contentWidth = this._wrapper.scrollWidth, this._contentWidth <= this._wrapperWidth && (this._destroyCurrentClip(), 0 !== this._wrapper.scrollLeft && (this._wrapper.scrollLeft = 0)), this._scrollStart = this._wrapper.scrollLeft, this._usePaddles && (this._paddleWidth = this._paddles.start.offsetWidth, this._updatePaddleDisplay())
        }, l._onScroll = function() {
            this._lockPaddles || (this._scrollStart = this._wrapper.scrollLeft, this._updatePaddleDisplay())
        }, l._updatePaddleDisplay = function() {
            var t = this._getNormalizedScroll(this._scrollStart) + this._wrapperWidth,
                e = 1;
            this._paddles.start.disabled = this._getNormalizedScroll(this._scrollStart) <= e, this._paddles.end.disabled = t >= this._contentWidth - e
        }, l._onPaddleStartClick = function(t) {
            this._smoothScrollTo(this._getPaddleStartScrollDestination())
        }, l._getPaddleStartScrollDestination = function() {
            var t, e, i = this._getNormalizedScroll(this._scrollStart);
            for (e = this._childCount - 1; e > 0; e--)
                if (t = this._normalizePosition(s(this._children[e])), t[this._inlineStart] < i) return t[this._inlineEnd] - this._wrapperWidth;
            return 0
        }, l._onPaddleEndClick = function(t) {
            this._smoothScrollTo(this._getPaddleEndScrollDestination())
        }, l._getPaddleEndScrollDestination = function() {
            var t, e, i = this._getNormalizedScroll(this._scrollStart) + this._wrapperWidth;
            for (e = 0; e < this._childCount; e++)
                if (t = this._normalizePosition(s(this._children[e])), t[this._inlineEnd] > i) return t[this._inlineStart];
            return this._contentWidth
        }, l._getBoundedScrollX = function(t) {
            var e = this._contentWidth - this._wrapperWidth;
            return Math.max(Math.min(t, e), 0)
        }, l._smoothScrollTo = function(t) {
            if (this._updateElementMetrics(), !this._lockPaddles && t !== this._scrollStart) {
                var e = {
                        scrollLeft: this._wrapper.scrollLeft
                    },
                    i = {
                        scrollLeft: this._setNormalizedScroll(t)
                    },
                    r = {
                        ease: this._options.scrollEasing,
                        onUpdate: this._onScrollClipUpdate
                    };
                this._usePaddles && (this._lockPaddles = !0, r.onComplete = this._onScrollClipComplete), this._clip = o.to(e, this._options.scrollDuration, i, r)
            }
        }, l._onScrollClipUpdate = function(t) {
            this._scrollStart = this._wrapper.scrollLeft = Math.round(t.target().scrollLeft)
        }, l._onScrollClipComplete = function() {
            this._updatePaddleDisplay(), this._lockPaddles = !1
        }, l._scrollDirection = function() {
            var t = "reverse",
                e = document.createElement("div");
            return e.style.cssText = "width:2px; height:1px; position:absolute; top:-1000px; overflow:scroll; font-size: 14px;", e.style.direction = "rtl", e.innerHTML = "test", document.body.appendChild(e), e.scrollLeft > 0 ? t = "default" : (e.scrollLeft = 1, 0 === e.scrollLeft && (t = "negative")), document.body.removeChild(e), t
        }, l._getNormalizedScroll = function(t) {
            if (!this._isRightToLeft) return t;
            var e = Math.abs(t);
            return "default" === this._scrollType && (e = this._contentWidth - this._wrapperWidth - e), e
        }, l._setNormalizedScroll = function(t) {
            var e = this._getBoundedScrollX(t);
            return this._isRightToLeft && "reverse" !== this._scrollType ? "negative" === this._scrollType ? -e : -(e - this._contentWidth + this._wrapperWidth) : e
        }, l._normalizePosition = function(t) {
            return this._isRightToLeft ? {
                top: t.top,
                right: this._wrapperWidth - t.right + this._paddleWidth,
                bottom: t.bottom,
                left: this._wrapperWidth - t.left + this._paddleWidth
            } : {
                top: t.top,
                right: t.right - this._paddleWidth,
                bottom: t.bottom,
                left: t.left - this._paddleWidth
            }
        }, l._destroyCurrentClip = function() {
            this._clip && this._clip.playing() && (this._clip.destroy(), this._lockPaddles = !1)
        }, l._destroyPaddles = function() {
            this._paddles.start.removeEventListener("click", this._onPaddleStartClick), this._paddles.end.removeEventListener("click", this._onPaddleEndClick), this._wrapper.removeEventListener("scroll", this._onScroll), this._paddles = null
        }, l.destroy = function() {
            this._items = null, this._destroyCurrentClip(), this._destroyPaddles(), window.removeEventListener("resize", this._updateElementMetrics), window.removeEventListener("orientationchange", this._updateElementMetrics)
        }, e.exports = r
    }, {
        "@marcom/ac-clip": 19,
        "@marcom/ac-dom-metrics/getDimensions": 58,
        "@marcom/ac-dom-metrics/getPosition": 59,
        "@marcom/ac-feature/touchAvailable": 125
    }],
    202: [function(t, e, i) {
        "use strict";
        var r = t("./ScrollContainer");
        e.exports = {
            ScrollContainer: r
        }
    }, {
        "./ScrollContainer": 201
    }],
    203: [function(t, e, i) {
        "use strict";
        e.exports = {
            SharedInstance: t("./ac-shared-instance/SharedInstance")
        }
    }, {
        "./ac-shared-instance/SharedInstance": 204
    }],
    204: [function(t, e, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            n = window,
            s = "AC",
            o = "SharedInstance",
            a = n[s],
            l = function() {
                var t = {};
                return {
                    get: function(e, i) {
                        var r = null;
                        return t[e] && t[e][i] && (r = t[e][i]), r
                    },
                    set: function(e, i, r) {
                        return t[e] || (t[e] = {}), "function" == typeof r ? t[e][i] = new r : t[e][i] = r, t[e][i]
                    },
                    share: function(t, e, i) {
                        var r = this.get(t, e);
                        return r || (r = this.set(t, e, i)), r
                    },
                    remove: function(e, i) {
                        var n = "undefined" == typeof i ? "undefined" : r(i);
                        if ("string" === n || "number" === n) {
                            if (!t[e] || !t[e][i]) return;
                            return void(t[e][i] = null)
                        }
                        t[e] && (t[e] = null)
                    }
                }
            }();
        a || (a = n[s] = {}), a[o] || (a[o] = l), e.exports = a[o]
    }, {}],
    205: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-eclipse").Clip,
            n = t("@marcom/ac-feature/cssPropertyAvailable");
        e.exports = function(t, e, i, s, o) {
            if (n("opacity")) {
                if (o = o || {}, s) return o.autoplay = o.autoplay !== !1 || o.autoplay, o.propsFrom = o.propsFrom || {}, o.propsFrom.opacity = e, o.autoplay ? r.to(t, s, {
                    opacity: i
                }, o) : new r(t, s, {
                    opacity: i
                }, o);
                t.style.opacity = i, "function" == typeof o.onStart && o.onStart(), "function" == typeof o.onComplete && o.onComplete()
            } else t.style.visibility = i ? "visible" : "hidden", "function" == typeof o.onStart && o.onStart(), "function" == typeof o.onComplete && o.onComplete()
        }
    }, {
        "@marcom/ac-eclipse": 98,
        "@marcom/ac-feature/cssPropertyAvailable": 123
    }],
    206: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-eclipse").Clip,
            n = t("@marcom/ac-feature/cssPropertyAvailable");
        e.exports = function(t, e, i) {
            var s = 1;
            if (i = i || {}, n("opacity")) {
                if (e) return i.autoplay = i.autoplay !== !1 || i.autoplay, i.autoplay ? r.to(t, e, {
                    opacity: s
                }, i) : new r(t, e, {
                    opacity: s
                }, i);
                t.style.opacity = s, "function" == typeof i.onStart && i.onStart(), "function" == typeof i.onComplete && i.onComplete()
            } else t.style.visibility = "visible", "function" == typeof i.onStart && i.onStart(), "function" == typeof i.onComplete && i.onComplete()
        }
    }, {
        "@marcom/ac-eclipse": 98,
        "@marcom/ac-feature/cssPropertyAvailable": 123
    }],
    207: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-eclipse").Clip,
            n = t("@marcom/ac-feature/cssPropertyAvailable");
        e.exports = function(t, e, i) {
            var s = 0;
            if (i = i || {}, n("opacity")) {
                if (e) return i.autoplay = i.autoplay !== !1 || i.autoplay, i.autoplay ? r.to(t, e, {
                    opacity: s
                }, i) : new r(t, e, {
                    opacity: s
                }, i);
                t.style.opacity = s, "function" == typeof i.onStart && i.onStart(), "function" == typeof i.onComplete && i.onComplete()
            } else t.style.visibility = "hidden", "function" == typeof i.onStart && i.onStart(), "function" == typeof i.onComplete && i.onComplete()
        }
    }, {
        "@marcom/ac-eclipse": 98,
        "@marcom/ac-feature/cssPropertyAvailable": 123
    }],
    208: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-eclipse").Clip,
            n = t("@marcom/ac-dom-styles");
        e.exports = function(t, e, i, s, o) {
            o = o || {}, o.autoplay = o.autoplay !== !1 || o.autoplay;
            var a, l = o.onStart || null,
                c = o.onComplete || null;
            return a = {
                transform: {
                    translateX: e + "px",
                    translateY: i + "px"
                }
            }, s ? (o.onStart = function() {
                t.style.willChange = "transform", null !== l && l.call(this)
            }, o.onComplete = function() {
                t.style.willChange = "", null !== c && c.call(this)
            }, o.autoplay ? r.to(t, s, a, o) : new r(t, s, a, o)) : (n.setStyle(t, a), "function" == typeof o.onStart && o.onStart(), void("function" == typeof o.onComplete && o.onComplete()))
        }
    }, {
        "@marcom/ac-dom-styles": 75,
        "@marcom/ac-eclipse": 98
    }],
    209: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-browser-prefixed"),
            n = t("@marcom/ac-transform").Transform,
            s = t("./move");
        e.exports = function(t, e, i, o) {
            var a = new n;
            return a.setMatrixValue(getComputedStyle(t)[r.transform]), s(t, e, a.getTranslateY(), i, o)
        }
    }, {
        "./move": 208,
        "@marcom/ac-browser-prefixed": 11,
        "@marcom/ac-transform": 211
    }],
    210: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            return e = Object.assign({}, s, e), new n(t, e)
        }
        var n = t("@marcom/ac-scroll-container").ScrollContainer,
            s = {
                itemsSelector: ".tabnav-items",
                itemSelector: ".tabnav-link",
                leftPaddleSelector: ".tabnav-paddle-left",
                rightPaddleSelector: ".tabnav-paddle-right",
                scrollEasing: "ease-out",
                scrollDuration: .5,
                usePaddles: !0
            };
        e.exports = r
    }, {
        "@marcom/ac-scroll-container": 202
    }],
    211: [function(t, e, i) {
        "use strict";
        e.exports = {
            Transform: t("./ac-transform/Transform")
        }
    }, {
        "./ac-transform/Transform": 212
    }],
    212: [function(t, e, i) {
        "use strict";

        function r() {
            this.m = n.create()
        }
        var n = t("./gl-matrix/mat4"),
            s = t("./gl-matrix/vec3"),
            o = t("./gl-matrix/vec4"),
            a = Math.PI / 180,
            l = 180 / Math.PI,
            c = 0,
            u = 0,
            h = 1,
            m = 1,
            d = 2,
            p = 3,
            f = 4,
            _ = 4,
            g = 5,
            v = 5,
            y = 6,
            b = 7,
            E = 8,
            w = 9,
            T = 10,
            S = 11,
            x = 12,
            C = 12,
            A = 13,
            O = 13,
            I = 14,
            P = 15,
            k = r.prototype;
        k.rotateX = function(t) {
            var e = a * t;
            return n.rotateX(this.m, this.m, e), this
        }, k.rotateY = function(t) {
            var e = a * t;
            return n.rotateY(this.m, this.m, e), this
        }, k.rotateZ = function(t) {
            var e = a * t;
            return n.rotateZ(this.m, this.m, e), this
        }, k.rotate = k.rotateZ, k.rotate3d = function(t, e, i, r) {
            null !== e && void 0 !== e || (e = t), null !== i && void 0 !== e || (i = t);
            var s = a * r;
            return n.rotate(this.m, this.m, s, [t, e, i]), this
        }, k.rotateAxisAngle = k.rotate3d, k.scale = function(t, e) {
            return e = e || t, n.scale(this.m, this.m, [t, e, 1]), this
        }, k.scaleX = function(t) {
            return n.scale(this.m, this.m, [t, 1, 1]), this
        }, k.scaleY = function(t) {
            return n.scale(this.m, this.m, [1, t, 1]), this
        }, k.scaleZ = function(t) {
            return n.scale(this.m, this.m, [1, 1, t]), this
        }, k.scale3d = function(t, e, i) {
            return n.scale(this.m, this.m, [t, e, i]), this
        }, k.skew = function(t, e) {
            if (null === e || void 0 === e) return this.skewX(t);
            t = a * t, e = a * e;
            var i = n.create();
            return i[_] = Math.tan(t), i[m] = Math.tan(e), n.multiply(this.m, this.m, i), this
        }, k.skewX = function(t) {
            t = a * t;
            var e = n.create();
            return e[_] = Math.tan(t), n.multiply(this.m, this.m, e), this
        }, k.skewY = function(t) {
            t = a * t;
            var e = n.create();
            return e[m] = Math.tan(t), n.multiply(this.m, this.m, e), this
        }, k.translate = function(t, e) {
            return e = e || 0, n.translate(this.m, this.m, [t, e, 0]), this
        }, k.translate3d = function(t, e, i) {
            return n.translate(this.m, this.m, [t, e, i]), this
        }, k.translateX = function(t) {
            return n.translate(this.m, this.m, [t, 0, 0]), this
        }, k.translateY = function(t) {
            return n.translate(this.m, this.m, [0, t, 0]), this
        }, k.translateZ = function(t) {
            return n.translate(this.m, this.m, [0, 0, t]), this
        }, k.perspective = function(t) {
            var e = n.create();
            0 !== t && (e[S] = -1 / t), n.multiply(this.m, this.m, e)
        }, k.inverse = function() {
            var t = this.clone();
            return t.m = n.invert(t.m, this.m), t
        }, k.reset = function() {
            return n.identity(this.m), this
        }, k.getTranslateXY = function() {
            var t = this.m;
            return this.isAffine() ? [t[C], t[O]] : [t[x], t[A]]
        }, k.getTranslateXYZ = function() {
            var t = this.m;
            return this.isAffine() ? [t[C], t[O], 0] : [t[x], t[A], t[I]]
        }, k.getTranslateX = function() {
            var t = this.m;
            return this.isAffine() ? t[C] : t[x]
        }, k.getTranslateY = function() {
            var t = this.m;
            return this.isAffine() ? t[O] : t[A]
        }, k.getTranslateZ = function() {
            var t = this.m;
            return this.isAffine() ? 0 : t[I]
        }, k.clone = function() {
            var t = new r;
            return t.m = n.clone(this.m), t
        }, k.toArray = function() {
            var t = this.m;
            return this.isAffine() ? [t[u], t[m], t[_], t[v], t[C], t[O]] : [t[c], t[h], t[d], t[p], t[f], t[g], t[y], t[b], t[E], t[w], t[T], t[S], t[x], t[A], t[I], t[P]]
        }, k.fromArray = function(t) {
            return this.m = Array.prototype.slice.call(t), this
        }, k.setMatrixValue = function(t) {
            t = String(t).trim();
            var e = n.create();
            if ("none" === t) return this.m = e, this;
            var i, r, s = t.slice(0, t.indexOf("("));
            if ("matrix3d" === s)
                for (i = t.slice(9, -1).split(","), r = 0; r < i.length; r++) e[r] = parseFloat(i[r]);
            else {
                if ("matrix" !== s) throw new TypeError("Invalid Matrix Value");
                for (i = t.slice(7, -1).split(","), r = i.length; r--;) i[r] = parseFloat(i[r]);
                e[c] = i[0], e[h] = i[1], e[x] = i[4], e[f] = i[2], e[g] = i[3], e[A] = i[5]
            }
            return this.m = e, this
        };
        var M = function(t) {
            return Math.abs(t) < 1e-4
        };
        k.decompose = function(t) {
            t = t || !1;
            for (var e = n.clone(this.m), i = s.create(), r = s.create(), a = s.create(), c = o.create(), u = o.create(), h = (s.create(), 0); h < 16; h++) e[h] /= e[P];
            var m = n.clone(e);
            m[p] = 0, m[b] = 0, m[S] = 0, m[P] = 1;
            var d = (e[3], e[7], e[11], e[12]),
                f = e[13],
                _ = e[14],
                g = (e[15], o.create());
            if (M(e[p]) && M(e[b]) && M(e[S])) c = o.fromValues(0, 0, 0, 1);
            else {
                g[0] = e[p], g[1] = e[b], g[2] = e[S], g[3] = e[P];
                var v = n.invert(n.create(), m),
                    y = n.transpose(n.create(), v);
                c = o.transformMat4(c, g, y)
            }
            i[0] = d, i[1] = f, i[2] = _;
            var E = [s.create(), s.create(), s.create()];
            E[0][0] = e[0], E[0][1] = e[1], E[0][2] = e[2], E[1][0] = e[4], E[1][1] = e[5], E[1][2] = e[6], E[2][0] = e[8], E[2][1] = e[9], E[2][2] = e[10], r[0] = s.length(E[0]), s.normalize(E[0], E[0]), a[0] = s.dot(E[0], E[1]), E[1] = this._combine(E[1], E[0], 1, -a[0]), r[1] = s.length(E[1]), s.normalize(E[1], E[1]), a[0] /= r[1], a[1] = s.dot(E[0], E[2]), E[2] = this._combine(E[2], E[0], 1, -a[1]), a[2] = s.dot(E[1], E[2]), E[2] = this._combine(E[2], E[1], 1, -a[2]), r[2] = s.length(E[2]), s.normalize(E[2], E[2]), a[1] /= r[2], a[2] /= r[2];
            var w = s.cross(s.create(), E[1], E[2]);
            if (s.dot(E[0], w) < 0)
                for (h = 0; h < 3; h++) r[h] *= -1, E[h][0] *= -1, E[h][1] *= -1, E[h][2] *= -1;
            u[0] = .5 * Math.sqrt(Math.max(1 + E[0][0] - E[1][1] - E[2][2], 0)), u[1] = .5 * Math.sqrt(Math.max(1 - E[0][0] + E[1][1] - E[2][2], 0)), u[2] = .5 * Math.sqrt(Math.max(1 - E[0][0] - E[1][1] + E[2][2], 0)), u[3] = .5 * Math.sqrt(Math.max(1 + E[0][0] + E[1][1] + E[2][2], 0)), E[2][1] > E[1][2] && (u[0] = -u[0]), E[0][2] > E[2][0] && (u[1] = -u[1]), E[1][0] > E[0][1] && (u[2] = -u[2]);
            var T = o.fromValues(u[0], u[1], u[2], 2 * Math.acos(u[3])),
                x = this._rotationFromQuat(u);
            return t && (a[0] = Math.round(a[0] * l * 100) / 100, a[1] = Math.round(a[1] * l * 100) / 100, a[2] = Math.round(a[2] * l * 100) / 100, x[0] = Math.round(x[0] * l * 100) / 100, x[1] = Math.round(x[1] * l * 100) / 100, x[2] = Math.round(x[2] * l * 100) / 100, T[3] = Math.round(T[3] * l * 100) / 100), {
                translation: i,
                scale: r,
                skew: a,
                perspective: c,
                quaternion: u,
                eulerRotation: x,
                axisAngle: T
            }
        }, k.recompose = function(t, e, i, r, a) {
            t = t || s.create(), e = e || s.create(), i = i || s.create(), r = r || o.create(), a = a || o.create();
            var l = n.fromRotationTranslation(n.create(), a, t);
            l[p] = r[0], l[b] = r[1], l[S] = r[2], l[P] = r[3];
            var c = n.create();
            return 0 !== i[2] && (c[w] = i[2], n.multiply(l, l, c)), 0 !== i[1] && (c[w] = 0, c[E] = i[1], n.multiply(l, l, c)), i[0] && (c[E] = 0, c[4] = i[0], n.multiply(l, l, c)), n.scale(l, l, e), this.m = l, this
        }, k.isAffine = function() {
            return 0 === this.m[d] && 0 === this.m[p] && 0 === this.m[y] && 0 === this.m[b] && 0 === this.m[E] && 0 === this.m[w] && 1 === this.m[T] && 0 === this.m[S] && 0 === this.m[I] && 1 === this.m[P]
        }, k.toString = function() {
            var t = this.m;
            return this.isAffine() ? "matrix(" + t[u] + ", " + t[m] + ", " + t[_] + ", " + t[v] + ", " + t[C] + ", " + t[O] + ")" : "matrix3d(" + t[c] + ", " + t[h] + ", " + t[d] + ", " + t[p] + ", " + t[f] + ", " + t[g] + ", " + t[y] + ", " + t[b] + ", " + t[E] + ", " + t[w] + ", " + t[T] + ", " + t[S] + ", " + t[x] + ", " + t[A] + ", " + t[I] + ", " + t[P] + ")"
        }, k.toCSSString = k.toString, k._combine = function(t, e, i, r) {
            var n = s.create();
            return n[0] = i * t[0] + r * e[0], n[1] = i * t[1] + r * e[1], n[2] = i * t[2] + r * e[2], n
        }, k._matrix2dToMat4 = function(t) {
            for (var e = n.create(), i = 0; i < 4; i++)
                for (var r = 0; r < 4; r++) e[4 * i + r] = t[i][r];
            return e
        }, k._mat4ToMatrix2d = function(t) {
            for (var e = [], i = 0; i < 4; i++) {
                e[i] = [];
                for (var r = 0; r < 4; r++) e[i][r] = t[4 * i + r]
            }
            return e
        }, k._rotationFromQuat = function(t) {
            var e, i, r, n = t[3] * t[3],
                o = t[0] * t[0],
                a = t[1] * t[1],
                l = t[2] * t[2],
                c = o + a + l + n,
                u = t[0] * t[1] + t[2] * t[3];
            return u > .499 * c ? (i = 2 * Math.atan2(t[0], t[3]), r = Math.PI / 2, e = 0, s.fromValues(e, i, r)) : u < -.499 * c ? (i = -2 * Math.atan2(t[0], t[3]), r = -Math.PI / 2, e = 0, s.fromValues(e, i, r)) : (i = Math.atan2(2 * t[1] * t[3] - 2 * t[0] * t[2], o - a - l + n), r = Math.asin(2 * u / c), e = Math.atan2(2 * t[0] * t[3] - 2 * t[1] * t[2], -o + a - l + n), s.fromValues(e, i, r))
        }, e.exports = r
    }, {
        "./gl-matrix/mat4": 213,
        "./gl-matrix/vec3": 214,
        "./gl-matrix/vec4": 215
    }],
    213: [function(t, e, i) {
        "use strict";
        var r = {
            create: t("gl-mat4/create"),
            rotate: t("gl-mat4/rotate"),
            rotateX: t("gl-mat4/rotateX"),
            rotateY: t("gl-mat4/rotateY"),
            rotateZ: t("gl-mat4/rotateZ"),
            scale: t("gl-mat4/scale"),
            multiply: t("gl-mat4/multiply"),
            translate: t("gl-mat4/translate"),
            invert: t("gl-mat4/invert"),
            clone: t("gl-mat4/clone"),
            transpose: t("gl-mat4/transpose"),
            identity: t("gl-mat4/identity"),
            fromRotationTranslation: t("gl-mat4/fromRotationTranslation")
        };
        e.exports = r
    }, {
        "gl-mat4/clone": 298,
        "gl-mat4/create": 299,
        "gl-mat4/fromRotationTranslation": 300,
        "gl-mat4/identity": 301,
        "gl-mat4/invert": 302,
        "gl-mat4/multiply": 303,
        "gl-mat4/rotate": 304,
        "gl-mat4/rotateX": 305,
        "gl-mat4/rotateY": 306,
        "gl-mat4/rotateZ": 307,
        "gl-mat4/scale": 308,
        "gl-mat4/translate": 309,
        "gl-mat4/transpose": 310
    }],
    214: [function(t, e, i) {
        "use strict";
        var r = {
            create: t("gl-vec3/create"),
            dot: t("gl-vec3/dot"),
            normalize: t("gl-vec3/normalize"),
            length: t("gl-vec3/length"),
            cross: t("gl-vec3/cross"),
            fromValues: t("gl-vec3/fromValues")
        };
        e.exports = r
    }, {
        "gl-vec3/create": 311,
        "gl-vec3/cross": 312,
        "gl-vec3/dot": 313,
        "gl-vec3/fromValues": 314,
        "gl-vec3/length": 315,
        "gl-vec3/normalize": 316
    }],
    215: [function(t, e, i) {
        "use strict";
        var r = {
            create: t("gl-vec4/create"),
            transformMat4: t("gl-vec4/transformMat4"),
            fromValues: t("gl-vec4/fromValues")
        };
        e.exports = r
    }, {
        "gl-vec4/create": 317,
        "gl-vec4/fromValues": 318,
        "gl-vec4/transformMat4": 319
    }],
    216: [function(t, e, i) {
        "use strict";
        var r = {
            ua: window.navigator.userAgent,
            platform: window.navigator.platform,
            vendor: window.navigator.vendor
        };
        e.exports = t("./parseUserAgent")(r)
    }, {
        "./parseUserAgent": 219
    }],
    217: [function(t, e, i) {
        "use strict";
        e.exports = {
            browser: {
                safari: !1,
                chrome: !1,
                firefox: !1,
                ie: !1,
                opera: !1,
                android: !1,
                edge: !1,
                version: {
                    name: "",
                    major: 0,
                    minor: 0,
                    patch: 0,
                    documentMode: !1
                }
            },
            os: {
                osx: !1,
                ios: !1,
                android: !1,
                windows: !1,
                linux: !1,
                fireos: !1,
                chromeos: !1,
                version: {
                    name: "",
                    major: 0,
                    minor: 0,
                    patch: 0
                }
            }
        }
    }, {}],
    218: [function(t, e, i) {
        "use strict";
        e.exports = {
            browser: [{
                name: "edge",
                userAgent: "Edge",
                version: ["rv", "Edge"],
                test: function(t) {
                    return t.ua.indexOf("Edge") > -1 || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" === t.ua
                }
            }, {
                name: "chrome",
                userAgent: "Chrome"
            }, {
                name: "firefox",
                test: function(t) {
                    return t.ua.indexOf("Firefox") > -1 && t.ua.indexOf("Opera") === -1
                },
                version: "Firefox"
            }, {
                name: "android",
                userAgent: "Android"
            }, {
                name: "safari",
                test: function(t) {
                    return t.ua.indexOf("Safari") > -1 && t.vendor.indexOf("Apple") > -1
                },
                version: "Version"
            }, {
                name: "ie",
                test: function(t) {
                    return t.ua.indexOf("IE") > -1 || t.ua.indexOf("Trident") > -1
                },
                version: ["MSIE", "rv"],
                parseDocumentMode: function() {
                    var t = !1;
                    return document.documentMode && (t = parseInt(document.documentMode, 10)), t
                }
            }, {
                name: "opera",
                userAgent: "Opera",
                version: ["Version", "Opera"]
            }],
            os: [{
                name: "windows",
                test: function(t) {
                    return t.platform.indexOf("Win") > -1
                },
                version: "Windows NT"
            }, {
                name: "osx",
                userAgent: "Mac",
                test: function(t) {
                    return t.platform.indexOf("Mac") > -1
                }
            }, {
                name: "ios",
                test: function(t) {
                    return t.ua.indexOf("iPhone") > -1 || t.ua.indexOf("iPad") > -1
                },
                version: ["iPhone OS", "CPU OS"]
            }, {
                name: "linux",
                userAgent: "Linux",
                test: function(t) {
                    return t.platform.indexOf("Linux") > -1 && t.ua.indexOf("Android") === -1
                }
            }, {
                name: "fireos",
                test: function(t) {
                    return t.ua.indexOf("Firefox") > -1 && t.ua.indexOf("Mobile") > -1
                },
                version: "rv"
            }, {
                name: "android",
                userAgent: "Android"
            }, {
                name: "chromeos",
                userAgent: "CrOS"
            }]
        }
    }, {}],
    219: [function(t, e, i) {
        "use strict";

        function r(t) {
            return new RegExp(t + "[a-zA-Z\\s/:]+([0-9_.]+)", "i")
        }

        function n(t, e) {
            if ("function" == typeof t.parseVersion) return t.parseVersion(e);
            var i = t.version || t.userAgent;
            "string" == typeof i && (i = [i]);
            for (var n, s = i.length, o = 0; o < s; o++)
                if (n = e.match(r(i[o])), n && n.length > 1) return n[1].replace(/_/g, ".")
        }

        function s(t, e, i) {
            for (var r, s, o = t.length, a = 0; a < o; a++)
                if ("function" == typeof t[a].test ? t[a].test(i) === !0 && (r = t[a].name) : i.ua.indexOf(t[a].userAgent) > -1 && (r = t[a].name), r) {
                    if (e[r] = !0, s = n(t[a], i.ua), "string" == typeof s) {
                        var l = s.split(".");
                        e.version.name = s, l && l.length > 0 && (e.version.major = parseInt(l[0] || 0), e.version.minor = parseInt(l[1] || 0), e.version.patch = parseInt(l[2] || 0))
                    } else "edge" === r && (e.version.name = "12.0.0", e.version.major = "12", e.version.minor = "0", e.version.patch = "0");
                    return "function" == typeof t[a].parseDocumentMode && (e.version.documentMode = t[a].parseDocumentMode()), e
                } return e
        }

        function o(t) {
            var e = {};
            return e.browser = s(l.browser, a.browser, t), e.os = s(l.os, a.os, t), e
        }
        var a = t("./defaults"),
            l = t("./dictionary");
        e.exports = o
    }, {
        "./defaults": 217,
        "./dictionary": 218
    }],
    220: [function(t, e, i) {
        "use strict";
        e.exports = {
            WindowDelegate: t("./ac-window-delegate/WindowDelegate"),
            WindowDelegateOptimizer: t("./ac-window-delegate/WindowDelegateOptimizer"),
            WindowDelegateCustomEvent: t("./ac-window-delegate/WindowDelegateCustomEvent")
        }
    }, {
        "./ac-window-delegate/WindowDelegate": 223,
        "./ac-window-delegate/WindowDelegateCustomEvent": 224,
        "./ac-window-delegate/WindowDelegateOptimizer": 225
    }],
    221: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-event-emitter").EventEmitter,
            n = function() {
                this._emitter = new r, this._customEvents = {}
            },
            s = n.prototype;
        s.on = function(t, e, i) {
            return this._activateCustomEvents(t), this._emitterOn.apply(this, arguments), this
        }, s.once = function(t, e, i) {
            return this._emitterOnce.apply(this, arguments), this
        }, s.off = function(t, e, i) {
            return this._emitterOff.apply(this, arguments), this._deactivateCustomEvents(t), this
        }, s.has = function(t, e, i) {
            return this._emitter.has.apply(this._emitter, arguments)
        }, s.trigger = function() {
            return this._emitter.trigger.apply(this._emitter, arguments), this
        }, s.propagateTo = function() {
            return this._emitter.propagateTo.apply(this._emitter, arguments), this
        }, s.stopPropagatingTo = function() {
            return this._emitter.stopPropagatingTo.apply(this._emitter, arguments), this
        }, s.add = function(t) {
            this._customEvents[t.name] = t
        }, s.canHandleCustomEvent = function(t) {
            return this._customEvents.hasOwnProperty(t)
        }, s.isHandlingCustomEvent = function(t) {
            return !(!this._customEvents[t] || !this._customEvents[t].active)
        }, s._activateCustomEvents = function(t) {
            var e, i, r = t.split(" "),
                n = r.length;
            for (i = 0; i < n; i++) e = r[i], this._customEvents[e] && !this._customEvents[e].active && (this._customEvents[e].initialize(), this._customEvents[e].active = !0)
        }, s._deactivateCustomEvents = function(t) {
            var e;
            if (t && 0 !== t.length) {
                var i = t.split(" "),
                    r = i.length;
                for (e = 0; e < r; e++) this._deactivateCustomEvent(i[e])
            } else
                for (e in this._customEvents) this._customEvents.hasOwnProperty(e) && this._deactivateCustomEvent(e)
        }, s._deactivateCustomEvent = function(t) {
            !this.has(t) && this._customEvents[t] && this._customEvents[t].active && (this._customEvents[t].deinitialize(), this._customEvents[t].active = !1)
        }, s._emitterOn = function() {
            this._emitter.on.apply(this._emitter, arguments)
        }, s._emitterOnce = function() {
            this._emitter.once.apply(this._emitter, arguments)
        }, s._emitterOff = function() {
            this._emitter.off.apply(this._emitter, arguments)
        }, e.exports = n
    }, {
        "@marcom/ac-event-emitter": 121
    }],
    222: [function(t, e, i) {
        "use strict";
        var r, n = t("@marcom/ac-event-emitter").EventEmitter,
            s = function(t) {
                n.call(this), this.optimizers = t, this._events = {}, this._properties = {}, this._initialize()
            };
        r = s.prototype = new n(null), r.canOptimizeEvent = function(t) {
            return this._events.hasOwnProperty(t)
        }, r.canOptimizeProperty = function(t) {
            return this._properties.hasOwnProperty(t)
        }, r.isOptimizingEvent = function(t) {
            return !(!this._events[t] || !this._events[t].active)
        }, r.isOptimizingProperty = function(t) {
            return !(!this._properties[t] || !this._properties[t].active)
        }, r.add = function(t) {
            this._setOptimizerEvents(t), this._setOptimizerProperties(t), t.on("update", this._onUpdate, this), t.on("activate", this._onActivate, this), t.on("deactivate", this._onDeactivate, this)
        }, r.get = function(t) {
            return this.isOptimizingProperty(t) ? this._properties[t].value : null
        }, r.set = function(t, e) {
            return !!this._properties[t] && (this._properties[t].value = e, this)
        }, r.getOptimizerByEvent = function(t) {
            return this._events[t] ? this._events[t] : null
        }, r._initialize = function() {
            var t;
            for (t in this.optimizers) this.optimizers.hasOwnProperty(t) && this.add(this.optimizers[t])
        }, r._onUpdate = function(t) {
            this.set(t.prop, t.val)
        }, r._onActivate = function(t) {
            var e, i = t.propertyNames,
                r = i.length;
            for (e = 0; e < r; e++) this._properties[i[e]].active = !0
        }, r._onDeactivate = function(t) {
            var e, i = t.propertyNames,
                r = i.length;
            for (e = 0; e < r; e++) this._properties[i[e]].active = !1
        }, r._setOptimizerEvents = function(t) {
            var e, i = t.eventNames,
                r = i.length;
            for (e = 0; e < r; e++) this._setOptimizerEvent(i[e], t)
        }, r._setOptimizerEvent = function(t, e) {
            this._events[t] || (this._events[t] = e)
        }, r._setOptimizerProperties = function(t) {
            var e, i = t.propertyNames,
                r = i.length;
            for (e = 0; e < r; e++) this._setOptimizerProperty(i[e])
        }, r._setOptimizerProperty = function(t) {
            this._properties.hasOwnProperty(t) || (this._properties[t] = {}, this._properties[t].active = !1, this._properties[t].value = null)
        }, e.exports = s
    }, {
        "@marcom/ac-event-emitter": 121
    }],
    223: [function(t, e, i) {
        "use strict";

        function r() {
            this._emitter = new o(window), this._controllers = {
                optimizer: new a(u),
                customEvent: new l
            };
            var t;
            for (t in c) c.hasOwnProperty(t) && (this[t] = this._getProperty.bind(this, t), c[t] = c[t].bind(this));
            this._bindEvents()
        }
        var n, s = t("@marcom/ac-shared-instance").SharedInstance,
            o = t("@marcom/ac-dom-emitter").DOMEmitter,
            a = t("./OptimizerController"),
            l = t("./CustomEventController"),
            c = t("./queries/queries"),
            u = t("./optimizers/optimizers"),
            h = "ac-window-delegate:WindowDelegate",
            m = "3.0.2";
        n = r.prototype, n.on = function(t, e, i) {
            var r = this._seperateCustomEvents(t);
            return this._optimizeEvents(r.standardEvents), this._customEventOn(r.customEvents, e, i), this._emitterOn.apply(this, arguments), this
        }, n.once = function(t, e, i) {
            var r = this._seperateCustomEvents(t);
            return this._optimizeEvents(r.standardEvents), this._customEventOnce(r.customEvents, e, i), this._emitterOnce.apply(this, arguments), this
        }, n.off = function(t, e, i) {
            var r = this._seperateCustomEvents(t),
                n = !1;
            if (t || (n = !0), this._customEventOff(r.customEvents, e, i, n), this._emitterOff.apply(this, arguments), n) try {
                var s;
                for (s in this._controllers.optimizer._events) this._controllers.optimizer._events.hasOwnProperty(s) && this._shouldDeoptimizeEvent(s, !0) && this._deoptimizeEvent(s);
                this._bindEvents()
            } catch (o) {}
            return this
        }, n.has = function(t, e, i) {
            return this._emitter.has.apply(this._emitter, arguments)
        }, n.trigger = function() {
            return this._emitter.trigger.apply(this._emitter, arguments), this
        }, n.emitterTrigger = function() {
            return this._emitter.emitterTrigger.apply(this._emitter, arguments), this
        }, n.propagateTo = function() {
            return this._emitter.propagateTo.apply(this._emitter, arguments), this
        }, n.stopPropagatingTo = function() {
            return this._emitter.stopPropagatingTo.apply(this._emitter, arguments), this
        }, n.addOptimizer = function(t) {
            return this._controllers.optimizer.add(t), this
        }, n.addCustomEvent = function(t) {
            return this._controllers.customEvent.add(t), this
        }, n._emitterOn = function() {
            this._emitter.on.apply(this._emitter, arguments)
        }, n._emitterOnce = function() {
            this._emitter.once.apply(this._emitter, arguments)
        }, n._emitterOff = function() {
            this._emitter.off.apply(this._emitter, arguments)
        }, n._onEventUnbound = function(t) {
            var e = t.data.evt;
            this._shouldDeoptimizeEvent(e) && this._deoptimizeEvent(e)
        }, n._customEventOn = function(t, e, i) {
            0 !== t.length && this._controllers.customEvent.on(t.join(" "), e, i)
        }, n._customEventOnce = function(t, e, i) {
            0 !== t.length && this._controllers.customEvent.once(t.join(" "), e, i)
        }, n._customEventOff = function(t, e, i, r) {
            if (r || 0 !== t.length) return r && 0 === t.length ? void this._controllers.customEvent.off() : void this._controllers.customEvent.off(t.join(" "), e, i)
        }, n._getProperty = function(t, e) {
            var i = null;
            return e || (i = this._getOptimizedValue(t)), null === i && (i = c[t].call(this, e)), i
        }, n._optimizeEvents = function(t) {
            var e, i, r = t.length;
            for (i = 0; i < r; i++) e = t[i], this._shouldOptimizeEvent(e) && this._optimizeEvent(e)
        }, n._shouldOptimizeEvent = function(t) {
            return !(!this._controllers.optimizer.canOptimizeEvent(t) || this._controllers.optimizer.isOptimizingEvent(t))
        }, n._shouldDeoptimizeEvent = function(t, e) {
            return !(!this._controllers.optimizer.isOptimizingEvent(t) || !(e || this._emitter._eventEmitter._events[t].length <= 1))
        }, n._optimizeEvent = function(t) {
            var e = this._controllers.optimizer.getOptimizerByEvent(t);
            e.activate(), this._emitterOn(t, e.callback, e)
        }, n._deoptimizeEvent = function(t) {
            var e = this._controllers.optimizer.getOptimizerByEvent(t);
            e.deactivate(), this._emitterOff(t, e.callback, e)
        }, n._getOptimizedValue = function(t) {
            return this._controllers.optimizer.get(t)
        }, n._seperateCustomEvents = function(t) {
            var e = {
                customEvents: [],
                standardEvents: []
            };
            if ("string" == typeof t) {
                var i, r, n = t.split(" "),
                    s = n.length;
                for (r = 0; r < s; r++) i = n[r], this._controllers.customEvent.canHandleCustomEvent(i) ? e.customEvents.push(i) : e.standardEvents.push(i)
            }
            return e
        }, n._bindEvents = function() {
            this._emitter.on("dom-emitter:didoff", this._onEventUnbound, this)
        }, e.exports = s.share(h, m, r)
    }, {
        "./CustomEventController": 221,
        "./OptimizerController": 222,
        "./optimizers/optimizers": 228,
        "./queries/queries": 237,
        "@marcom/ac-dom-emitter": 45,
        "@marcom/ac-shared-instance": 203
    }],
    224: [function(t, e, i) {
        "use strict";

        function r(t, e, i) {
            n.call(this), this.name = t, this.active = !1, this._initializeFunc = e, this._deinitializeFunc = i
        }
        var n = t("@marcom/ac-event-emitter").EventEmitter,
            s = r.prototype = new n(null);
        s.initialize = function() {
            return this._initializeFunc && this._initializeFunc(), this
        }, s.deinitialize = function() {
            return this._deinitializeFunc && this._deinitializeFunc(), this
        }, e.exports = r
    }, {
        "@marcom/ac-event-emitter": 121
    }],
    225: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            n.call(this), this.active = !1, this.eventNames = t.eventNames, this.propertyNames = t.propertyNames, this.options = t.options || {}, this.callback = e
        }
        var n = t("@marcom/ac-event-emitter").EventEmitter,
            s = r.prototype = new n(null);
        s.update = function(t, e) {
            this.trigger("update", {
                prop: t,
                val: e
            })
        }, s.activate = function() {
            this.active = !0, this.trigger("activate", this)
        }, s.deactivate = function() {
            this.active = !1, this.trigger("deactivate", this)
        }, e.exports = r
    }, {
        "@marcom/ac-event-emitter": 121
    }],
    226: [function(t, e, i) {
        "use strict";
        var r = t("../../WindowDelegateOptimizer"),
            n = t("../../queries/queries"),
            s = {
                eventNames: ["resize"],
                propertyNames: ["clientWidth", "clientHeight", "innerWidth", "innerHeight"]
            },
            o = new r(s, function(t) {
                var e, i = s.propertyNames,
                    r = i.length;
                for (e = 0; e < r; e++) this.update(i[e], n[i[e]](!0))
            });
        e.exports = o
    }, {
        "../../WindowDelegateOptimizer": 225,
        "../../queries/queries": 237
    }],
    227: [function(t, e, i) {
        "use strict";
        var r = t("../../WindowDelegateOptimizer"),
            n = t("../../queries/queries"),
            s = {
                eventNames: ["scroll"],
                propertyNames: ["scrollX", "scrollY", "maxScrollX", "maxScrollY"]
            },
            o = new r(s, function(t) {
                var e, i = s.propertyNames,
                    r = i.length;
                for (e = 0; e < r; e++) this.update(i[e], n[i[e]](!0))
            });
        e.exports = o
    }, {
        "../../WindowDelegateOptimizer": 225,
        "../../queries/queries": 237
    }],
    228: [function(t, e, i) {
        "use strict";
        var r = t("./events/resize"),
            n = t("./events/scroll");
        e.exports = [r, n]
    }, {
        "./events/resize": 226,
        "./events/scroll": 227
    }],
    229: [function(t, e, i) {
        "use strict";
        var r = function(t) {
            return document.documentElement.clientHeight
        };
        e.exports = r
    }, {}],
    230: [function(t, e, i) {
        "use strict";
        var r = function(t) {
            return document.documentElement.clientWidth
        };
        e.exports = r
    }, {}],
    231: [function(t, e, i) {
        "use strict";
        var r = function(t) {
            return window.innerHeight || this.clientHeight(t)
        };
        e.exports = r
    }, {}],
    232: [function(t, e, i) {
        "use strict";
        var r = function(t) {
            return window.innerWidth || this.clientWidth(t)
        };
        e.exports = r
    }, {}],
    233: [function(t, e, i) {
        "use strict";
        var r = function(t) {
            return document.body.scrollWidth - this.innerWidth()
        };
        e.exports = r
    }, {}],
    234: [function(t, e, i) {
        "use strict";
        var r = function(t) {
            return document.body.scrollHeight - this.innerHeight()
        };
        e.exports = r
    }, {}],
    235: [function(t, e, i) {
        "use strict";
        var r = function(t) {
            var e = window.pageXOffset;
            if (!e) {
                var i = document.documentElement || document.body.parentNode || document.body;
                e = i.scrollLeft
            }
            return e
        };
        e.exports = r
    }, {}],
    236: [function(t, e, i) {
        "use strict";
        var r = function(t) {
            var e = window.pageYOffset;
            if (!e) {
                var i = document.documentElement || document.body.parentNode || document.body;
                e = i.scrollTop
            }
            return e
        };
        e.exports = r
    }, {}],
    237: [function(t, e, i) {
        "use strict";
        var r = t("./methods/innerWidth"),
            n = t("./methods/innerHeight"),
            s = t("./methods/clientWidth"),
            o = t("./methods/clientHeight"),
            a = t("./methods/scrollX"),
            l = t("./methods/scrollY"),
            c = t("./methods/maxScrollX"),
            u = t("./methods/maxScrollY");
        e.exports = {
            innerWidth: r,
            innerHeight: n,
            clientWidth: s,
            clientHeight: o,
            scrollX: a,
            scrollY: l,
            maxScrollX: c,
            maxScrollY: u
        }
    }, {
        "./methods/clientHeight": 229,
        "./methods/clientWidth": 230,
        "./methods/innerHeight": 231,
        "./methods/innerWidth": 232,
        "./methods/maxScrollX": 233,
        "./methods/maxScrollY": 234,
        "./methods/scrollX": 235,
        "./methods/scrollY": 236
    }],
    238: [function(t, e, i) {
        arguments[4][191][0].apply(i, arguments)
    }, {
        "./ac-event-emitter-micro/EventEmitterMicro": 239,
        dup: 191
    }],
    239: [function(t, e, i) {
        arguments[4][192][0].apply(i, arguments)
    }, {
        dup: 192
    }],
    240: [function(t, e, i) {
        "use strict";
        e.exports = {
            majorVersionNumber: "3.x"
        }
    }, {}],
    241: [function(t, e, i) {
        "use strict";

        function r(t) {
            t = t || {}, s.call(this), this.id = a.getNewID(), this.executor = t.executor || o, this._reset(), this._willRun = !1, this._didDestroy = !1
        }
        var n, s = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            o = t("./sharedRAFExecutorInstance"),
            a = t("./sharedRAFEmitterIDGeneratorInstance");
        n = r.prototype = Object.create(s.prototype), n.run = function() {
            return this._willRun || (this._willRun = !0), this._subscribe()
        }, n.cancel = function() {
            this._unsubscribe(), this._willRun && (this._willRun = !1), this._reset()
        }, n.destroy = function() {
            var t = this.willRun();
            return this.cancel(), this.executor = null, s.prototype.destroy.call(this), this._didDestroy = !0, t
        }, n.willRun = function() {
            return this._willRun
        }, n.isRunning = function() {
            return this._isRunning
        }, n._subscribe = function() {
            return this.executor.subscribe(this)
        }, n._unsubscribe = function() {
            return this.executor.unsubscribe(this)
        }, n._onAnimationFrameStart = function(t) {
            this._isRunning = !0, this._willRun = !1, this._didEmitFrameData || (this._didEmitFrameData = !0, this.trigger("start", t))
        }, n._onAnimationFrameEnd = function(t) {
            this._willRun || (this.trigger("stop", t), this._reset())
        }, n._reset = function() {
            this._didEmitFrameData = !1, this._isRunning = !1
        }, e.exports = r
    }, {
        "./sharedRAFEmitterIDGeneratorInstance": 249,
        "./sharedRAFExecutorInstance": 250,
        "@marcom/ac-event-emitter-micro": 238
    }],
    242: [function(t, e, i) {
        "use strict";

        function r(t) {
            t = t || {}, this._reset(), this.updatePhases(), this.eventEmitter = new s, this._willRun = !1, this._totalSubscribeCount = -1, this._requestAnimationFrame = window.requestAnimationFrame, this._cancelAnimationFrame = window.cancelAnimationFrame, this._boundOnAnimationFrame = this._onAnimationFrame.bind(this), this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this)
        }
        var n, s = t("@marcom/ac-event-emitter-micro/EventEmitterMicro");
        n = r.prototype, n.frameRequestedPhase = "requested", n.startPhase = "start", n.runPhases = ["update", "external", "draw"], n.endPhase = "end", n.disabledPhase = "disabled", n.beforePhaseEventPrefix = "before:", n.afterPhaseEventPrefix = "after:", n.subscribe = function(t, e) {
            return this._totalSubscribeCount++, this._nextFrameSubscribers[t.id] || (e ? this._nextFrameSubscribersOrder.unshift(t.id) : this._nextFrameSubscribersOrder.push(t.id), this._nextFrameSubscribers[t.id] = t, this._nextFrameSubscriberArrayLength++, this._nextFrameSubscriberCount++, this._run()), this._totalSubscribeCount
        }, n.subscribeImmediate = function(t, e) {
            return this._totalSubscribeCount++, this._subscribers[t.id] || (e ? this._subscribersOrder.splice(this._currentSubscriberIndex + 1, 0, t.id) : this._subscribersOrder.unshift(t.id), this._subscribers[t.id] = t, this._subscriberArrayLength++, this._subscriberCount++), this._totalSubscribeCount
        }, n.unsubscribe = function(t) {
            return !!this._nextFrameSubscribers[t.id] && (this._nextFrameSubscribers[t.id] = null, this._nextFrameSubscriberCount--, 0 === this._nextFrameSubscriberCount && this._cancel(), !0)
        }, n.getSubscribeID = function() {
            return this._totalSubscribeCount += 1
        }, n.destroy = function() {
            var t = this._cancel();
            return this.eventEmitter.destroy(), this.eventEmitter = null, this.phases = null, this._subscribers = null, this._subscribersOrder = null, this._nextFrameSubscribers = null, this._nextFrameSubscribersOrder = null, this._rafData = null, this._boundOnAnimationFrame = null, this._onExternalAnimationFrame = null, t
        }, n.useExternalAnimationFrame = function(t) {
            if ("boolean" == typeof t) {
                var e = this._isUsingExternalAnimationFrame;
                return t && this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), !this._willRun || t || this._animationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), this._isUsingExternalAnimationFrame = t, t ? this._boundOnExternalAnimationFrame : e || !1
            }
        }, n.updatePhases = function() {
            this.phases || (this.phases = []), this.phases.length = 0, this.phases.push(this.frameRequestedPhase), this.phases.push(this.startPhase), Array.prototype.push.apply(this.phases, this.runPhases), this.phases.push(this.endPhase), this._runPhasesLength = this.runPhases.length, this._phasesLength = this.phases.length
        }, n._run = function() {
            if (!this._willRun) return this._willRun = !0, 0 === this.lastFrameTime && (this.lastFrameTime = performance.now()), this._animationFrameActive = !0, this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), this.phase === this.disabledPhase && (this.phaseIndex = 0, this.phase = this.phases[this.phaseIndex]), !0
        }, n._cancel = function() {
            var t = !1;
            return this._animationFrameActive && (this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), this._animationFrameActive = !1, this._willRun = !1, t = !0), this._isRunning || this._reset(), t
        }, n._onAnimationFrame = function(t) {
            for (this._subscribers = this._nextFrameSubscribers, this._subscribersOrder = this._nextFrameSubscribersOrder, this._subscriberArrayLength = this._nextFrameSubscriberArrayLength, this._subscriberCount = this._nextFrameSubscriberCount, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this.phaseIndex = 0, this.phase = this.phases[this.phaseIndex], this._isRunning = !0, this._willRun = !1, this._didRequestNextRAF = !1, this._rafData.delta = t - this.lastFrameTime, this.lastFrameTime = t, this._rafData.fps = 0, this._rafData.delta >= 1e3 && (this._rafData.delta = 0), 0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta), this._rafData.time = t, this._rafData.naturalFps = this._rafData.fps, this._rafData.timeNow = Date.now(), this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy === !1 && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameStart(this._rafData);
            for (this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase), this._runPhaseIndex = 0; this._runPhaseIndex < this._runPhasesLength; this._runPhaseIndex++) {
                for (this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy === !1 && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]].trigger(this.phase, this._rafData);
                this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase)
            }
            for (this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy === !1 && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameEnd(this._rafData);
            this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase), this._willRun ? (this.phaseIndex = 0, this.phaseIndex = this.phases[this.phaseIndex]) : this._reset()
        }, n._onExternalAnimationFrame = function(t) {
            this._isUsingExternalAnimationFrame && this._onAnimationFrame(t)
        }, n._reset = function() {
            this._rafData || (this._rafData = {}), this._rafData.time = 0, this._rafData.delta = 0, this._rafData.fps = 0, this._rafData.naturalFps = 0, this._rafData.timeNow = 0, this._subscribers = {}, this._subscribersOrder = [], this._currentSubscriberIndex = -1, this._subscriberArrayLength = 0, this._subscriberCount = 0, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this._didEmitFrameData = !1, this._animationFrame = null, this._animationFrameActive = !1, this._isRunning = !1, this._shouldReset = !1, this.lastFrameTime = 0, this._runPhaseIndex = -1, this.phaseIndex = -1, this.phase = this.disabledPhase
        }, e.exports = r
    }, {
        "@marcom/ac-event-emitter-micro/EventEmitterMicro": 239
    }],
    243: [function(t, e, i) {
        "use strict";
        var r = t("./SingleCallRAFEmitter"),
            n = function(t) {
                this.phase = t, this.rafEmitter = new r, this._cachePhaseIndex(), this.requestAnimationFrame = this.requestAnimationFrame.bind(this), this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this), this._onBeforeRAFExecutorStart = this._onBeforeRAFExecutorStart.bind(this), this._onBeforeRAFExecutorPhase = this._onBeforeRAFExecutorPhase.bind(this), this._onAfterRAFExecutorPhase = this._onAfterRAFExecutorPhase.bind(this), this.rafEmitter.on(this.phase, this._onRAFExecuted.bind(this)), this.rafEmitter.executor.eventEmitter.on("before:start", this._onBeforeRAFExecutorStart), this.rafEmitter.executor.eventEmitter.on("before:" + this.phase, this._onBeforeRAFExecutorPhase), this.rafEmitter.executor.eventEmitter.on("after:" + this.phase, this._onAfterRAFExecutorPhase), this._frameCallbacks = [], this._currentFrameCallbacks = [], this._nextFrameCallbacks = [], this._phaseActive = !1, this._currentFrameID = -1, this._cancelFrameIdx = -1, this._frameCallbackLength = 0, this._currentFrameCallbacksLength = 0, this._nextFrameCallbacksLength = 0, this._frameCallbackIteration = 0
            },
            s = n.prototype;
        s.requestAnimationFrame = function(t, e) {
            return e === !0 && this.rafEmitter.executor.phaseIndex > 0 && this.rafEmitter.executor.phaseIndex <= this.phaseIndex ? this._phaseActive ? (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !0), this._frameCallbacks.push(this._currentFrameID, t), this._frameCallbackLength += 2) : (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !1), this._currentFrameCallbacks.push(this._currentFrameID, t), this._currentFrameCallbacksLength += 2) : (this._currentFrameID = this.rafEmitter.run(), this._nextFrameCallbacks.push(this._currentFrameID, t), this._nextFrameCallbacksLength += 2), this._currentFrameID
        }, s.cancelAnimationFrame = function(t) {
            this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(t), this._cancelFrameIdx > -1 ? this._cancelNextAnimationFrame() : (this._cancelFrameIdx = this._currentFrameCallbacks.indexOf(t), this._cancelFrameIdx > -1 ? this._cancelCurrentAnimationFrame() : (this._cancelFrameIdx = this._frameCallbacks.indexOf(t), this._cancelFrameIdx > -1 && this._cancelRunningAnimationFrame()))
        }, s._onRAFExecuted = function(t) {
            for (this._frameCallbackIteration = 0; this._frameCallbackIteration < this._frameCallbackLength; this._frameCallbackIteration += 2) this._frameCallbacks[this._frameCallbackIteration + 1](t.time, t);
            this._frameCallbacks.length = 0, this._frameCallbackLength = 0
        }, s._onBeforeRAFExecutorStart = function() {
            Array.prototype.push.apply(this._currentFrameCallbacks, this._nextFrameCallbacks.splice(0, this._nextFrameCallbacksLength)), this._currentFrameCallbacksLength = this._nextFrameCallbacksLength, this._nextFrameCallbacks.length = 0, this._nextFrameCallbacksLength = 0
        }, s._onBeforeRAFExecutorPhase = function() {
            this._phaseActive = !0, Array.prototype.push.apply(this._frameCallbacks, this._currentFrameCallbacks.splice(0, this._currentFrameCallbacksLength)), this._frameCallbackLength = this._currentFrameCallbacksLength, this._currentFrameCallbacks.length = 0, this._currentFrameCallbacksLength = 0
        }, s._onAfterRAFExecutorPhase = function() {
            this._phaseActive = !1
        }, s._cachePhaseIndex = function() {
            this.phaseIndex = this.rafEmitter.executor.phases.indexOf(this.phase)
        }, s._cancelRunningAnimationFrame = function() {
            this._frameCallbacks.splice(this._cancelFrameIdx, 2), this._frameCallbackLength -= 2
        }, s._cancelCurrentAnimationFrame = function() {
            this._currentFrameCallbacks.splice(this._cancelFrameIdx, 2), this._currentFrameCallbacksLength -= 2
        }, s._cancelNextAnimationFrame = function() {
            this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2), this._nextFrameCallbacksLength -= 2, 0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel()
        }, e.exports = n
    }, {
        "./SingleCallRAFEmitter": 245
    }],
    244: [function(t, e, i) {
        "use strict";
        var r = t("./RAFInterface"),
            n = function() {
                this.events = {}
            },
            s = n.prototype;
        s.requestAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new r(t)), this.events[t].requestAnimationFrame
        }, s.cancelAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new r(t)), this.events[t].cancelAnimationFrame
        }, e.exports = new n
    }, {
        "./RAFInterface": 243
    }],
    245: [function(t, e, i) {
        "use strict";
        var r = t("./RAFEmitter"),
            n = function(t) {
                r.call(this, t)
            },
            s = n.prototype = Object.create(r.prototype);
        s._subscribe = function() {
            return this.executor.subscribe(this, !0)
        }, e.exports = n
    }, {
        "./RAFEmitter": 241
    }],
    246: [function(t, e, i) {
        "use strict";
        var r = t("./RAFInterfaceController");
        e.exports = r.cancelAnimationFrame("update")
    }, {
        "./RAFInterfaceController": 244
    }],
    247: [function(t, e, i) {
        "use strict";
        var r = t("./RAFInterfaceController");
        e.exports = r.requestAnimationFrame("draw")
    }, {
        "./RAFInterfaceController": 244
    }],
    248: [function(t, e, i) {
        "use strict";
        var r = t("./RAFInterfaceController");
        e.exports = r.requestAnimationFrame("external")
    }, {
        "./RAFInterfaceController": 244
    }],
    249: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-shared-instance").SharedInstance,
            n = t("../.release-info.js").majorVersionNumber,
            s = function() {
                this._currentID = 0
            };
        s.prototype.getNewID = function() {
            return this._currentID++, "raf:" + this._currentID
        }, e.exports = r.share("@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance", n, s)
    }, {
        "../.release-info.js": 240,
        "@marcom/ac-shared-instance": 252
    }],
    250: [function(t, e, i) {
        "use strict";
        var r = t("@marcom/ac-shared-instance").SharedInstance,
            n = t("../.release-info.js").majorVersionNumber,
            s = t("./RAFExecutor");
        e.exports = r.share("@marcom/ac-raf-emitter/sharedRAFExecutorInstance", n, s)
    }, {
        "../.release-info.js": 240,
        "./RAFExecutor": 242,
        "@marcom/ac-shared-instance": 252
    }],
    251: [function(t, e, i) {
        "use strict";
        var r = t("./RAFInterfaceController");
        e.exports = r.requestAnimationFrame("update")
    }, {
        "./RAFInterfaceController": 244
    }],
    252: [function(t, e, i) {
        arguments[4][203][0].apply(i, arguments)
    }, {
        "./ac-shared-instance/SharedInstance": 253,
        dup: 203
    }],
    253: [function(t, e, i) {
        arguments[4][204][0].apply(i, arguments)
    }, {
        dup: 204
    }],
    254: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function n(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var o = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            a = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            l = t("./Model/AnimSystemModel"),
            c = t("./Keyframes/Keyframe"),
            u = t("./Keyframes/KeyframeCSSClass"),
            h = t("./Keyframes/KeyframeDiscreteEvent"),
            m = t("./ScrollGroup"),
            d = t("./TimeGroup"),
            p = t("./utils/arrayToObject"),
            f = {
                create: t("@marcom/ac-raf-emitter/RAFEmitter"),
                update: t("@marcom/ac-raf-emitter/update"),
                cancelUpdate: t("@marcom/ac-raf-emitter/cancelUpdate"),
                external: t("@marcom/ac-raf-emitter/external"),
                draw: t("@marcom/ac-raf-emitter/draw")
            },
            _ = null,
            g = function(t) {
                function e() {
                    r(this, e);
                    var t = n(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                    if (_) throw "You cannot create multiple AnimSystems. You probably want to create multiple groups instead. You can have unlimited groups on a page";
                    return _ = t, t.groups = [], t.scrollSystems = [], t.timeSystems = [], t._forceUpdateRAFId = -1, t.setupEvents(), t
                }
                return s(e, t), o(e, [{
                    key: "initialize",
                    value: function() {
                        this.initializeModel(), this.createDOMGroups(), this.createDOMKeyframes()
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.groups.forEach(function(t) {
                            return t.destroy()
                        }), this.groups = null, this.scrollSystems = null, this.timeSystems = null, window.clearTimeout(l.RESIZE_TIMEOUT), window.removeEventListener("scroll", this.onScroll), window.removeEventListener("resize", this.onResizeImmediate)
                    }
                }, {
                    key: "createTimeGroup",
                    value: function(t) {
                        var e = new d(t, this);
                        return this.groups.push(e), this.timeSystems.push(e), this.trigger(l.EVENTS.ON_GROUP_CREATED, e), e
                    }
                }, {
                    key: "createScrollGroup",
                    value: function(t) {
                        if (!t) throw "AnimSystem scroll based groups must supply an HTMLElement";
                        var e = new m(t, this);
                        return this.groups.push(e), this.scrollSystems.push(e), this.trigger(l.EVENTS.ON_GROUP_CREATED, e), e
                    }
                }, {
                    key: "removeGroup",
                    value: function(t) {
                        var e = this;
                        t.keyframeControllers.forEach(function(e) {
                            return t.removeKeyframeController(e)
                        }), f.update(function() {
                            var i = e.groups.indexOf(t);
                            i !== -1 && e.groups.splice(i, 1), i = e.scrollSystems.indexOf(t), i !== -1 && e.scrollSystems.splice(i, 1), i = e.timeSystems.indexOf(t), i !== -1 && e.timeSystems.splice(i, 1), f.update(function() {
                                return t.destroy()
                            })
                        })
                    }
                }, {
                    key: "createDOMGroups",
                    value: function() {
                        var t = this;
                        document.body.setAttribute("data-anim-scroll-group", "body"), document.querySelectorAll("[data-anim-scroll-group]").forEach(function(e) {
                            return t.createScrollGroup(e)
                        }), document.querySelectorAll("[data-anim-time-group]").forEach(function(e) {
                            return t.createTimeGroup(e)
                        }), this.trigger(l.EVENTS.ON_DOM_GROUPS_CREATED, this.groups)
                    }
                }, {
                    key: "createDOMKeyframes",
                    value: function() {
                        var t = this,
                            e = [];
                        [c.DATA_ATTRIBUTE, u.DATA_ATTRIBUTE, h.DATA_ATTRIBUTE].forEach(function(t) {
                            for (var i = 0; i < 12; i++) e.push(t + (0 === i ? "" : "-" + (i - 1)))
                        });
                        for (var i = 0; i < e.length; i++)
                            for (var r = e[i], n = document.querySelectorAll("[" + r + "]"), s = 0; s < n.length; s++) {
                                var o = n[s],
                                    a = JSON.parse(o.getAttribute(r));
                                this.addKeyframe(o, a)
                            }
                        f.update(function() {
                            return t.groups.forEach(function(t) {
                                return t.onKeyframesDirty({
                                    preventOnScroll: !0
                                })
                            })
                        }, !0), f.update(function() {
                            t.groups.forEach(function(t) {
                                return t.trigger(l.EVENTS.ON_DOM_KEYFRAMES_CREATED, t)
                            }), t.trigger(l.EVENTS.ON_DOM_KEYFRAMES_CREATED, t), t.groups.forEach(function(t) {
                                return t.reconcile()
                            }), t.onScroll()
                        }, !0)
                    }
                }, {
                    key: "initializeModel",
                    value: function() {
                        l.pageMetrics.windowHeight = window.innerHeight, l.pageMetrics.windowWidth = window.innerWidth, l.pageMetrics.scrollY = window.scrollY || window.pageYOffset, l.pageMetrics.scrollX = window.scrollX || window.pageXOffset, l.pageMetrics.breakpoint = l.getBreakpoint();
                        var t = document.documentElement.getBoundingClientRect();
                        l.pageMetrics.documentOffsetX = t.left + l.pageMetrics.scrollX, l.pageMetrics.documentOffsetY = t.top + l.pageMetrics.scrollY
                    }
                }, {
                    key: "setupEvents",
                    value: function() {
                        this.onScroll = this.onScroll.bind(this), this.onResizedDebounced = this.onResizedDebounced.bind(this), this.onResizeImmediate = this.onResizeImmediate.bind(this), window.addEventListener("scroll", this.onScroll), window.addEventListener("resize", this.onResizeImmediate)
                    }
                }, {
                    key: "determineActiveKeyframes",
                    value: function() {
                        for (var t = p(Array.from(document.documentElement.classList)), e = 0, i = this.groups.length; e < i; e++) this.groups[e].determineActiveKeyframes(t)
                    }
                }, {
                    key: "onScroll",
                    value: function() {
                        l.pageMetrics.scrollY = window.scrollY || window.pageYOffset, l.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                        for (var t = 0, e = this.scrollSystems.length; t < e; t++) this.scrollSystems[t]._onScroll();
                        this.trigger(l.PageEvents.ON_SCROLL, l.pageMetrics)
                    }
                }, {
                    key: "onResizeImmediate",
                    value: function() {
                        l.pageMetrics.windowHeight = window.innerHeight, l.pageMetrics.windowWidth = window.innerWidth, l.pageMetrics.scrollY = window.scrollY || window.pageYOffset, l.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                        var t = document.documentElement.getBoundingClientRect();
                        l.pageMetrics.documentOffsetX = t.left + l.pageMetrics.scrollX, l.pageMetrics.documentOffsetY = t.top + l.pageMetrics.scrollY, window.clearTimeout(l.RESIZE_TIMEOUT), l.RESIZE_TIMEOUT = window.setTimeout(this.onResizedDebounced, 250), this.trigger(l.PageEvents.ON_RESIZE_IMMEDIATE, l.pageMetrics)
                    }
                }, {
                    key: "onResizedDebounced",
                    value: function() {
                        var t = this;
                        f.update(function() {
                            var e = l.pageMetrics.breakpoint,
                                i = l.getBreakpoint(),
                                r = i !== e;
                            if (r) {
                                l.pageMetrics.previousBreakpoint = e, l.pageMetrics.breakpoint = i;
                                for (var n = 0, s = t.groups.length; n < s; n++) t.groups[n]._onBreakpointChange();
                                t.trigger(l.PageEvents.ON_BREAKPOINT_CHANGE, l.pageMetrics)
                            }
                            for (var o = 0, a = t.groups.length; o < a; o++) t.groups[o].forceUpdate({
                                recalculateActiveKeyframes: r,
                                waitForNextUpdate: !1
                            });
                            t.trigger(l.PageEvents.ON_RESIZE_DEBOUNCED, l.pageMetrics)
                        }, !0)
                    }
                }, {
                    key: "forceUpdate",
                    value: function() {
                        var t = this,
                            e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            i = e.recalculateActiveKeyframes,
                            r = void 0 !== i && i,
                            n = e.waitForNextUpdate,
                            s = void 0 === n || n;
                        this._forceUpdateRAFId !== -1 && f.cancelUpdate(this._forceUpdateRAFId);
                        var o = function() {
                            for (var e = 0, i = t.groups.length; e < i; e++) {
                                var n = t.groups[e];
                                n.forceUpdate({
                                    recalculateActiveKeyframes: r,
                                    waitForNextUpdate: !1
                                })
                            }
                            return -1
                        };
                        this._forceUpdateRAFId = s ? f.update(o, !0) : o()
                    }
                }, {
                    key: "addKeyframe",
                    value: function(t, e) {
                        var i = this.getGroupForTarget(t);
                        return i = i || this.getGroupForTarget(document.body), i.addKeyframe(t, e)
                    }
                }, {
                    key: "getGroupForTarget",
                    value: function(t) {
                        if (t._animInfo && t._animInfo.group) return t._animInfo.group;
                        for (var e = t; e;) {
                            if (e._animInfo && e._animInfo.isGroup) return e._animInfo.group;
                            e = e.parentElement
                        }
                    }
                }, {
                    key: "getControllerForTarget",
                    value: function(t) {
                        return t._animInfo && t._animInfo.controller ? t._animInfo.controller : null
                    }
                }]), e
            }(a);
        e.exports = new g
    }, {
        "./Keyframes/Keyframe": 256,
        "./Keyframes/KeyframeCSSClass": 257,
        "./Keyframes/KeyframeDiscreteEvent": 258,
        "./Model/AnimSystemModel": 259,
        "./ScrollGroup": 268,
        "./TimeGroup": 269,
        "./utils/arrayToObject": 270,
        "@marcom/ac-event-emitter-micro": 238,
        "@marcom/ac-raf-emitter/RAFEmitter": 241,
        "@marcom/ac-raf-emitter/cancelUpdate": 246,
        "@marcom/ac-raf-emitter/draw": 247,
        "@marcom/ac-raf-emitter/external": 248,
        "@marcom/ac-raf-emitter/update": 251
    }],
    255: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function n(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var o = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            a = function g(t, e, i) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(t);
                    return null === n ? void 0 : g(n, e, i)
                }
                if ("value" in r) return r.value;
                var s = r.get;
                if (void 0 !== s) return s.call(i)
            },
            l = t("./Model/AnimSystemModel"),
            c = (t("./Keyframes/Keyframe"), t("./Keyframes/KeyframeCSSClass")),
            u = t("./Model/InferKeyframeFromProps"),
            h = t("./utils/arrayToObject"),
            m = t("./Model/UUID"),
            d = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            p = t("@marcom/decompose-css-transform"),
            f = {
                update: t("@marcom/ac-raf-emitter/update"),
                external: t("@marcom/ac-raf-emitter/external"),
                draw: t("@marcom/ac-raf-emitter/draw")
            },
            _ = function(t) {
                function e(t, i) {
                    r(this, e);
                    var s = n(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                    return s.uuid = m(), s.group = t, s.element = i, s._ownerIsElement = s.element instanceof Element, s._ownerIsElement ? s.friendlyName = s.element.tagName + "." + Array.from(s.element.classList).join(".") : s.friendlyName = s.element.friendlyName || s.uuid, s.element._animInfo = s.element._animInfo || new l.AnimInfo(t, s), s.element._animInfo.controller = s, s.element._animInfo.group = s.group, s.element._animInfo.controllers.push(s), s.tweenProps = {}, s.eventObject = new l.EventObject(s), s.needsStyleUpdate = !1, s.needsClassUpdate = !1, s.elementMetrics = s.group.metrics.add(s.element), s._parentElementMetrics = null, s.attributes = [], s.keyframes = {}, s._allKeyframes = [], s._activeKeyframes = [], s.keyframesRequiringDispatch = [], s.updateCachedValuesFromElement(), s.boundsMin = 0, s.boundsMax = 0, s
                }
                return s(e, t), o(e, [{
                    key: "destroy",
                    value: function() {
                        if (this.element._animInfo) {
                            this.element._animInfo.controller === this && (this.element._animInfo.controller = null);
                            var t = this.element._animInfo.controllers.indexOf(this);
                            t !== -1 && this.element._animInfo.controllers.splice(t, 1), 0 === this.element._animInfo.controllers.length ? this.element._animInfo = null : (this.element._animInfo.controller = this.element._animInfo.controllers[this.element._animInfo.controllers.length - 1], this.element._animInfo.group = this.element._animInfo.controller.group)
                        }
                        this._parentElementMetrics = null, this.eventObject.controller = null, this.eventObject.element = null, this.eventObject.keyframe = null, this.eventObject.tweenProps = null, this.eventObject = null, this.elementMetrics = null, this.group = null, this.keyframesRequiringDispatch = null;
                        for (var i = 0; i < this._allKeyframes.length; i++) this._allKeyframes[i].destroy();
                        this._allKeyframes = null, this._activeKeyframes = null, this.attributes = null, this.keyframes = null, this.element = null, this.tweenProps = null, a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "destroy", this).call(this)
                    }
                }, {
                    key: "remove",
                    value: function() {
                        this.group.removeKeyframeController(this)
                    }
                }, {
                    key: "updateCachedValuesFromElement",
                    value: function() {
                        if (this._ownerIsElement) {
                            var t = getComputedStyle(this.element),
                                e = p(this.element, !0),
                                i = l.KeyframeDefaults.epsilon,
                                r = !1;
                            this.tweenProps.x = new l.TargetValue(e.translation[0], i, r), this.tweenProps.y = new l.TargetValue(e.translation[1], i, r), this.tweenProps.z = new l.TargetValue(e.translation[2], i, r), this.tweenProps.rotation = new l.TargetValue(e.eulerRotation[2], i, r), this.tweenProps.rotationX = new l.TargetValue(e.eulerRotation[0], i, r), this.tweenProps.rotationY = new l.TargetValue(e.eulerRotation[1], i, r), this.tweenProps.rotationZ = new l.TargetValue(e.eulerRotation[2], i, r), this.tweenProps.scale = new l.TargetValue(e.scale[0], i, r), this.tweenProps.scaleX = new l.TargetValue(e.scale[0], i, r), this.tweenProps.scaleY = new l.TargetValue(e.scale[1], i, r), this.tweenProps.opacity = new l.TargetValue(parseFloat(t.opacity), i, r)
                        }
                    }
                }, {
                    key: "addKeyframe",
                    value: function(t) {
                        var e = u(t);
                        if (!e) throw new Error("AnimSystem Cannot create keyframe for from options `" + t + "`");
                        var i = new e(this, t);
                        return i.parseOptions(t), i.id = this._allKeyframes.length, this._allKeyframes.push(i), i
                    }
                }, {
                    key: "needsUpdate",
                    value: function() {
                        for (var t = 0, e = this.attributes.length; t < e; t++) {
                            var i = this.attributes[t],
                                r = this.tweenProps[i],
                                n = Math.abs(r.current - r.target);
                            if (n > r.epsilon) return !0
                        }
                        return !1
                    }
                }, {
                    key: "updateLocalProgress",
                    value: function(t) {
                        for (var e = 0, i = this.attributes.length; e < i; e++) {
                            var r = this.attributes[e],
                                n = this.keyframes[this.attributes[e]];
                            if (1 !== n.length) {
                                var s = this.getNearestKeyframeForAttribute(t, r);
                                s && s.updateLocalProgress(t)
                            } else n[0].updateLocalProgress(t)
                        }
                    }
                }, {
                    key: "reconcile",
                    value: function() {
                        for (var t = 0, e = this.attributes.length; t < e; t++) {
                            var i = this.attributes[t],
                                r = this.getNearestKeyframeForAttribute(this.group.timelines.local, i);
                            r.updateLocalProgress(this.group.timelines.local), r.snapAtCreation && r.reconcile(i)
                        }
                    }
                }, {
                    key: "determineActiveKeyframes",
                    value: function(t) {
                        var e = this;
                        t = t || h(Array.from(document.documentElement.classList));
                        var i = this._activeKeyframes,
                            r = this.attributes;
                        this._activeKeyframes = [], this.attributes = [], this.keyframes = {};
                        for (var n = 0; n < this._allKeyframes.length; n++) {
                            var s = this._allKeyframes[n];
                            if (s.setEnabled(t)) {
                                this._activeKeyframes.push(s);
                                for (var o in s.animValues) this.keyframes[o] = this.keyframes[o] || [], this.keyframes[o].push(s), this.attributes.indexOf(o) === -1 && this.attributes.push(o)
                            }
                        }
                        var a = i.filter(function(t) {
                            return e._activeKeyframes.indexOf(t) === -1
                        });
                        if (0 !== a.length) {
                            var l = r.filter(function(t) {
                                return e.attributes.indexOf(t) === -1
                            });
                            0 !== l.length && this._ownerIsElement && f.external(function() {
                                var t = ["x", "y", "z", "scale", "scaleX", "scaleY", "rotation", "rotationX", "rotationY", "rotationZ"],
                                    i = l.filter(function(e) {
                                        return t.indexOf(e) !== -1
                                    });
                                i.length > 0 && e.element.style.removeProperty("transform");
                                for (var r = 0, n = l.length; r < n; ++r) {
                                    var s = l[r],
                                        o = e.tweenProps[s];
                                    o.current = o.target = o.initialValue, "opacity" === s && e.element.style.removeProperty("opacity")
                                }
                                for (var u = 0, h = a.length; u < h; ++u) {
                                    var m = a[u];
                                    m instanceof c && m._unapply()
                                }
                            }, !0)
                        }
                    }
                }, {
                    key: "onDOMRead",
                    value: function(t) {
                        for (var e = 0, i = this.attributes.length; e < i; e++) {
                            var r = this.attributes[e],
                                n = this.getNearestKeyframeForAttribute(t.local, r);
                            n && n.onDOMRead(r)
                        }
                    }
                }, {
                    key: "onDOMWrite",
                    value: function() {
                        this._ownerIsElement ? this.onDOMWriteForElement() : this.onDOMWriteForObject(), this.handleEventDispatch()
                    }
                }, {
                    key: "onDOMWriteForObject",
                    value: function() {
                        for (var t = 0, e = this.attributes.length; t < e; t++) {
                            var i = this.attributes[t];
                            this.element[i] = this.tweenProps[i].current
                        }
                    }
                }, {
                    key: "onDOMWriteForElement",
                    value: function() {
                        var t = this.tweenProps,
                            e = "";
                        if ("undefined" != typeof this.keyframes.z ? e += "translate3d(" + t.x.current + "px," + t.y.current + "px, " + t.z.current + "px)" : "undefined" == typeof this.keyframes.x && "undefined" == typeof this.keyframes.y || (e += "translate(" + t.x.current + "px," + t.y.current + "px)"), "undefined" != typeof this.keyframes.rotation ? e += "rotate(" + t.rotation.current + "deg) " : ("undefined" != typeof this.keyframes.rotationX && (e += "rotateX(" + t.rotationX.current + "deg) "), "undefined" != typeof this.keyframes.rotationY && (e += "rotateY(" + t.rotationY.current + "deg) "), "undefined" != typeof this.keyframes.rotationZ && (e += "rotateZ(" + t.rotationZ.current + "deg) ")), "undefined" != typeof this.keyframes.scale) e += "scale(" + t.scale.current + "," + t.scale.current + ") ";
                        else {
                            var i = "undefined" != typeof this.keyframes.scaleX,
                                r = "undefined" != typeof this.keyframes.scaleY;
                            (i || r) && (e += "scale(" + t.scaleX.current + "," + t.scaleY.current + ") ")
                        }
                        if ("" !== e && (this.element.style.transform = e), "undefined" != typeof this.keyframes.opacity && (this.element.style.opacity = t.opacity.current), this.needsStyleUpdate) {
                            for (var n in this.tweenProps.targetStyles) null !== this.tweenProps.targetStyles[n] && (this.element.style[n] = this.tweenProps.targetStyles[n]), this.tweenProps.targetStyles[n] = null;
                            this.needsStyleUpdate = !1
                        }
                        this.needsClassUpdate && (this.tweenProps.targetClasses.add.length > 0 && this.element.classList.add.apply(this.element.classList, this.tweenProps.targetClasses.add), this.tweenProps.targetClasses.remove.length > 0 && this.element.classList.remove.apply(this.element.classList, this.tweenProps.targetClasses.remove), this.tweenProps.targetClasses.add.length = 0, this.tweenProps.targetClasses.remove.length = 0, this.needsClassUpdate = !1)
                    }
                }, {
                    key: "handleEventDispatch",
                    value: function() {
                        if (0 !== this.keyframesRequiringDispatch.length) {
                            for (var t = 0, e = this.keyframesRequiringDispatch.length; t < e; t++) {
                                var i = this.keyframesRequiringDispatch[t];
                                i.needsEventDispatch = !1, this.eventObject.keyframe = i, this.eventObject.pageMetrics = l.pageMetrics, this.eventObject.event = i.event, this.trigger(i.event, this.eventObject)
                            }
                            this.keyframesRequiringDispatch.length = 0
                        }
                    }
                }, {
                    key: "updateAnimationConstraints",
                    value: function() {
                        for (var t = this, e = 0, i = this._activeKeyframes.length; e < i; e++) this._activeKeyframes[e].updateAnimationConstraints();
                        this.attributes.forEach(function(e) {
                            1 !== t.keyframes[e].length && t.keyframes[e].sort(l.KeyframeComparison)
                        }), this.updateDeferredPropertyValues()
                    }
                }, {
                    key: "refreshMetrics",
                    value: function() {
                        var t = new Set;
                        t.add(this.element), this._parentElementMetrics && t.add(this.element.parentElement), this._allKeyframes.forEach(function(e) {
                            return t.add(e.relativeTo)
                        }), this.group.metrics.refreshCollection(t), this.group.keyframesDirty = !0
                    }
                }, {
                    key: "updateDeferredPropertyValues",
                    value: function() {
                        for (var t = 0, e = this.attributes.length; t < e; t++) {
                            var i = this.attributes[t],
                                r = this.keyframes[i],
                                n = r[0];
                            if (!(n.keyframeType > l.KeyframeTypes.InterpolationForward))
                                for (var s = 0, o = r.length; s < o; s++) {
                                    var a = r[s];
                                    if (null === a.jsonProps[i][0]) {
                                        if (0 === s) {
                                            a.animValues[i][0] = this.tweenProps[i].initialValue;
                                            continue
                                        }
                                        a.animValues[i][0] = r[s - 1].animValues[i][1]
                                    }
                                    if (null === a.jsonProps[i][1]) {
                                        if (s === o - 1) throw new RangeError("AnimSystem - last keyframe cannot defer it's end value! " + i + ":[" + a.jsonProps[i][0] + ",null]");
                                        a.animValues[i][1] = r[s + 1].animValues[i][0]
                                    }
                                }
                        }
                    }
                }, {
                    key: "getBounds",
                    value: function(t) {
                        this.boundsMin = Number.MAX_VALUE, this.boundsMax = -Number.MAX_VALUE;
                        for (var e = 0, i = this.attributes.length; e < i; e++)
                            for (var r = this.keyframes[this.attributes[e]], n = 0; n < r.length; n++) {
                                var s = r[n];
                                this.boundsMin = Math.min(s.start, this.boundsMin), this.boundsMax = Math.max(s.end, this.boundsMax), t.min = Math.min(s.start, t.min), t.max = Math.max(s.end, t.max)
                            }
                    }
                }, {
                    key: "getNearestKeyframeForAttribute",
                    value: function(t, e) {
                        var i = null,
                            r = Number.POSITIVE_INFINITY,
                            n = this.keyframes[e];
                        if (void 0 === n) return null;
                        var s = n.length;
                        if (0 === s) return null;
                        if (1 === s) return n[0];
                        for (var o = 0; o < s; o++) {
                            var a = n[o];
                            if (a.isInRange(t)) {
                                i = a;
                                break
                            }
                            var l = Math.min(Math.abs(t - a.start), Math.abs(t - a.end));
                            l < r && (r = l, i = a)
                        }
                        return i
                    }
                }, {
                    key: "getAllKeyframesForAttribute",
                    value: function(t) {
                        return this.keyframes[t]
                    }
                }, {
                    key: "updateKeyframe",
                    value: function(t, e) {
                        var i = this;
                        t.parseOptions(e), t.updateAnimationConstraints(), this.group.keyframesDirty = !0, f.update(function() {
                            i.trigger(l.EVENTS.ON_KEYFRAME_UPDATED, t), i.group.trigger(l.EVENTS.ON_KEYFRAME_UPDATED, t)
                        }, !0)
                    }
                }, {
                    key: "removeKeyframe",
                    value: function(t) {
                        var e = this._allKeyframes.indexOf(t);
                        e !== -1 && (this._allKeyframes.splice(e, 1), this.group.keyframesDirty = !0)
                    }
                }, {
                    key: "updateAnimation",
                    value: function(t, e) {
                        return this.group.gui && console.warn("KeyframeController.updateAnimation(keyframe,props) has been deprecated. Please use updateKeyframe(keyframe,props)"), this.updateKeyframe(t, e)
                    }
                }]), e
            }(d);
        Object.defineProperty(_.prototype, "parentElementMetrics", {
            get: function() {
                return null === this._parentElementMetrics && (this._parentElementMetrics = this.group.metrics.add(this.element.parentElement)), this._parentElementMetrics
            }
        }), e.exports = _
    }, {
        "./Keyframes/Keyframe": 256,
        "./Keyframes/KeyframeCSSClass": 257,
        "./Model/AnimSystemModel": 259,
        "./Model/InferKeyframeFromProps": 262,
        "./Model/UUID": 263,
        "./utils/arrayToObject": 270,
        "@marcom/ac-event-emitter-micro": 238,
        "@marcom/ac-raf-emitter/draw": 247,
        "@marcom/ac-raf-emitter/external": 248,
        "@marcom/ac-raf-emitter/update": 251,
        "@marcom/decompose-css-transform": 286
    }],
    256: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            s = t("../Model/AnimSystemModel"),
            o = t("@marcom/sm-math-utils"),
            a = t("../Model/EasingFunctions"),
            l = t("../Model/UnitBezier"),
            c = t("../utils/arrayToObject"),
            u = function() {
                function t(e, i) {
                    r(this, t), this.controller = e, this.relativeTo = e.element, this.jsonProps = i, this.ease = e.group.defaultEase, this.easeFunctionString = s.KeyframeDefaults.easeFunctionString, this.easeFunction = a[this.easeFunctionString], this.start = 0, this.end = 0, this.localT = 0, this.curvedT = 0, this.id = 0, this.event = "", this.needsEventDispatch = !1, this.snapAtCreation = !1, this.isEnabled = !1, this.animValues = {}, this.breakpointMask = "SMLX", this.disabledWhen = [], this.keyframeType = s.KeyframeTypes.Interpolation, this.hold = !1
                }
                return n(t, [{
                    key: "destroy",
                    value: function() {
                        this.controller = null, this.relativeTo = null, this.jsonProps = null, this.easeFunction = null, this.animValues = null
                    }
                }, {
                    key: "remove",
                    value: function() {
                        return this.controller.removeKeyframe(this)
                    }
                }, {
                    key: "parseOptions",
                    value: function(t) {
                        if (this.jsonProps = t, "" !== t.relativeTo && t.relativeTo ? t.relativeTo && (this.relativeTo = this.controller.group.element.querySelector(t.relativeTo) || document.querySelector(t.relativeTo), null === this.relativeTo && (console.warn("Keyframe for", this.controller.element.className, " .relativeTo failed to find " + t.relativeTo + "' via querySelector"), this.relativeTo = this.controller.element), this.controller.group.metrics.add(this.relativeTo)) : this.relativeTo = this.controller.element, t.ease ? this.ease = parseFloat(t.ease) : t.ease = this.ease, t.hasOwnProperty("snapAtCreation") ? this.snapAtCreation = t.snapAtCreation : t.snapAtCreation = this.snapAtCreation, t.easeFunction ? this.easeFunction = t.easeFunction : t.easeFunction = this.easeFunctionString, t.breakpointMask ? this.breakpointMask = t.breakpointMask : t.breakpointMask = this.breakpointMask, t.disabledWhen ? this.disabledWhen = Array.isArray(t.disabledWhen) ? t.disabledWhen : [t.disabledWhen] : t.disabledWhen = this.disabledWhen, t.hasOwnProperty("hold") ? this.hold = t.hold : t.hold = this.hold, this.easeFunction = a[t.easeFunction], !a.hasOwnProperty(t.easeFunction)) {
                            var e = l.fromCSSString(t.easeFunction);
                            e ? this.easeFunction = e : console.error("Keyframe parseOptions cannot find EasingFunction named '" + t.easingFunction + "'")
                        }
                        for (var i in t)
                            if (s.KeyframeJSONReservedWords.indexOf(i) === -1) {
                                var r = t[i];
                                if (Array.isArray(r)) {
                                    if (this.animValues[i] = this.controller.group.expressionParser.parse(this, r), void 0 === this.controller.tweenProps[i] || !this.controller._ownerIsElement) {
                                        var n = 0;
                                        this.controller._ownerIsElement || (n = this.controller.element[i]);
                                        var o = new s.TargetValue(n, s.KeyframeDefaults.epsilon, this.snapAtCreation);
                                        this.controller.tweenProps[i] = o
                                    }
                                    var c = this.controller.tweenProps[i];
                                    if (t.epsilon) c.epsilon = t.epsilon;
                                    else {
                                        var u = Math.abs(this.animValues[i][0] - this.animValues[i][1]),
                                            h = Math.min(.001 * u, c.epsilon, s.KeyframeDefaults.epsilon);
                                        c.epsilon = Math.max(h, 1e-4)
                                    }
                                }
                            } this.keyframeType = this.hold ? s.KeyframeTypes.InterpolationForward : s.KeyframeTypes.Interpolation, t.event && (this.event = t.event)
                    }
                }, {
                    key: "overwriteProps",
                    value: function(t) {
                        this.animValues = {};
                        var e = Object.assign({}, this.jsonProps, t);
                        this.controller.updateKeyframe(this, e)
                    }
                }, {
                    key: "updateLocalProgress",
                    value: function(t) {
                        if (this.start === this.end || t > this.end) return this.localT = 1, void(this.curvedT = this.easeFunction(this.localT));
                        var e = (t - this.start) / (this.end - this.start),
                            i = this.hold ? this.localT : 0;
                        this.localT = o.clamp(e, i, 1), this.curvedT = this.easeFunction(this.localT)
                    }
                }, {
                    key: "reconcile",
                    value: function(t) {
                        var e = this.animValues[t],
                            i = this.controller.tweenProps[t];
                        i.initialValue = e[0], i.target = e[0] + this.curvedT * (e[1] - e[0]), i.current !== i.target && (i.current = i.target, this.needsEventDispatch || (this.needsEventDispatch = !0, this.controller.keyframesRequiringDispatch.push(this)))
                    }
                }, {
                    key: "reset",
                    value: function(t) {
                        this.localT = t || 0;
                        var e = this.ease;
                        this.ease = 1;
                        for (var i in this.animValues) this.reconcile(i);
                        this.ease = e
                    }
                }, {
                    key: "onDOMRead",
                    value: function(t) {
                        var e = this.animValues[t],
                            i = this.controller.tweenProps[t];
                        i.target = e[0] + this.curvedT * (e[1] - e[0]);
                        var r = i.current;
                        i.current += (i.target - i.current) * this.ease;
                        var n = i.current - i.target;
                        n < i.epsilon && n > -i.epsilon && (i.current = i.target, n = 0), "" === this.event || this.needsEventDispatch || (n > i.epsilon || n < -i.epsilon || 0 === n && r !== i.current) && (this.needsEventDispatch = !0, this.controller.keyframesRequiringDispatch.push(this))
                    }
                }, {
                    key: "isInRange",
                    value: function(t) {
                        return t >= this.start && t <= this.end
                    }
                }, {
                    key: "setEnabled",
                    value: function(t) {
                        t = t || c(Array.from(document.documentElement.classList));
                        var e = this.breakpointMask.indexOf(s.pageMetrics.breakpoint) !== -1,
                            i = !1;
                        return this.disabledWhen.length > 0 && (i = this.disabledWhen.some(function(e) {
                            return "undefined" != typeof t[e]
                        })), this.isEnabled = e && !i, this.isEnabled
                    }
                }, {
                    key: "updateAnimationConstraints",
                    value: function() {
                        this.start = this.controller.group.timeParser.parse(this, this.jsonProps.start), this.end = this.controller.group.timeParser.parse(this, this.jsonProps.end), this.updateAnimatedValueConstraints()
                    }
                }, {
                    key: "updateAnimatedValueConstraints",
                    value: function() {
                        for (var t in this.animValues) {
                            var e = this.jsonProps[t];
                            this.animValues[t] = this.controller.group.expressionParser.parse(this, e)
                        }
                    }
                }]), t
            }();
        u.DATA_ATTRIBUTE = "data-anim-tween", e.exports = u
    }, {
        "../Model/AnimSystemModel": 259,
        "../Model/EasingFunctions": 260,
        "../Model/UnitBezier": 264,
        "../utils/arrayToObject": 270,
        "@marcom/sm-math-utils": 291
    }],
    257: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function n(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            a = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            l = t("./Keyframe"),
            c = t("../Model/AnimSystemModel.js"),
            u = function(t) {
                function e(t, i) {
                    r(this, e);
                    var s = n(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i));
                    return s.keyframeType = c.KeyframeTypes.CSSClass, s._triggerType = e.TRIGGER_TYPE_CSS_CLASS, s.cssClass = "", s.friendlyName = "", s.style = {
                        on: null,
                        off: null
                    }, s.toggle = !1, s.isApplied = !1, s
                }
                return s(e, t), a(e, [{
                    key: "parseOptions",
                    value: function(t) {
                        if (!this.controller._ownerIsElement) throw new TypeError("CSS Keyframes cannot be applied to JS Objects");
                        if (t.x = void 0, t.y = void 0, t.scale = void 0, t.scaleX = void 0, t.scaleY = void 0, t.rotation = void 0, t.opacity = void 0, t.hold = void 0, void 0 !== t.toggle && (this.toggle = t.toggle), void 0 !== t.cssClass) this._triggerType = e.TRIGGER_TYPE_CSS_CLASS, this.cssClass = t.cssClass, this.friendlyName = "." + this.cssClass, void 0 === this.controller.tweenProps.targetClasses && (this.controller.tweenProps.targetClasses = {
                            add: [],
                            remove: []
                        });
                        else {
                            if (void 0 === t.style || !this.isValidStyleProperty(t.style)) throw new TypeError("KeyframeCSSClass no 'cssClass` property found. If using `style` property its also missing or invalid");
                            if (this._triggerType = e.TRIGGER_TYPE_STYLE_PROPERTY, this.style = t.style, this.friendlyName = "style", this.toggle = void 0 !== this.style.off || this.toggle, this.toggle && void 0 === this.style.off) {
                                this.style.off = {};
                                for (var i in this.style.on) this.style.off[i] = ""
                            }
                            void 0 === this.controller.tweenProps.targetStyles && (this.controller.tweenProps.targetStyles = {})
                        }
                        if (void 0 === t.end && (t.end = t.start), t.toggle = this.toggle, this._triggerType === e.TRIGGER_TYPE_CSS_CLASS) this.isApplied = this.controller.element.classList.contains(this.cssClass);
                        else {
                            var r = getComputedStyle(this.controller.element);
                            this.isApplied = !0;
                            for (var n in this.style.on)
                                if (r[n] !== this.style.on[n]) {
                                    this.isApplied = !1;
                                    break
                                }
                        }
                        l.prototype.parseOptions.call(this, t), this.animValues[this.friendlyName] = [0, 0], void 0 === this.controller.tweenProps[this.friendlyName] && (this.controller.tweenProps[this.friendlyName] = new c.TargetValue(0, 1, (!1))), this.keyframeType = c.KeyframeTypes.CSSClass
                    }
                }, {
                    key: "updateLocalProgress",
                    value: function(t) {
                        this.isApplied && !this.toggle || (this.start !== this.end ? !this.isApplied && t >= this.start && t <= this.end ? this._apply() : this.isApplied && this.toggle && (t < this.start || t > this.end) && this._unapply() : !this.isApplied && t >= this.start ? this._apply() : this.isApplied && this.toggle && t < this.start && this._unapply())
                    }
                }, {
                    key: "_apply",
                    value: function() {
                        if (this._triggerType === e.TRIGGER_TYPE_CSS_CLASS) this.controller.tweenProps.targetClasses.add.push(this.cssClass), this.controller.needsClassUpdate = !0;
                        else {
                            for (var t in this.style.on) this.controller.tweenProps.targetStyles[t] = this.style.on[t];
                            this.controller.needsStyleUpdate = !0
                        }
                        this.isApplied = !0
                    }
                }, {
                    key: "_unapply",
                    value: function() {
                        if (this._triggerType === e.TRIGGER_TYPE_CSS_CLASS) this.controller.tweenProps.targetClasses.remove.push(this.cssClass), this.controller.needsClassUpdate = !0;
                        else {
                            for (var t in this.style.off) this.controller.tweenProps.targetStyles[t] = this.style.off[t];
                            this.controller.needsStyleUpdate = !0
                        }
                        this.isApplied = !1
                    }
                }, {
                    key: "isValidStyleProperty",
                    value: function(t) {
                        if (!t.hasOwnProperty("on")) return !1;
                        if ("object" !== o(t.on)) throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:hidden, otherProperty: value}}");
                        if (this.toggle && t.hasOwnProperty("off") && "object" !== o(t.off)) throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:hidden, otherProperty: value}}");
                        return !0
                    }
                }, {
                    key: "reconcile",
                    value: function(t, e) {}
                }, {
                    key: "onDOMRead",
                    value: function(t, e) {}
                }, {
                    key: "updateAnimatedValueConstraints",
                    value: function() {}
                }]), e
            }(l);
        u.TRIGGER_TYPE_CSS_CLASS = 0, u.TRIGGER_TYPE_STYLE_PROPERTY = 1, u.DATA_ATTRIBUTE = "data-anim-classname", e.exports = u
    }, {
        "../Model/AnimSystemModel.js": 259,
        "./Keyframe": 256
    }],
    258: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function n(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var o = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            a = function h(t, e, i) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(t);
                    return null === n ? void 0 : h(n, e, i)
                }
                if ("value" in r) return r.value;
                var s = r.get;
                if (void 0 !== s) return s.call(i)
            },
            l = t("./Keyframe"),
            c = t("../Model/AnimSystemModel.js"),
            u = function(t) {
                function e(t, i) {
                    r(this, e);
                    var s = n(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i));
                    return s.keyframeType = c.KeyframeTypes.Event, s.isApplied = !1, s.hasDuration = !1, s.isCurrentlyInRange = !1, s
                }
                return s(e, t), o(e, [{
                    key: "parseOptions",
                    value: function(t) {
                        t.x = void 0, t.y = void 0, t.scale = void 0, t.scaleX = void 0, t.scaleY = void 0, t.rotation = void 0, t.style = void 0, t.cssClass = void 0, t.rotation = void 0, t.opacity = void 0, t.hold = void 0, void 0 === t.end && (t.end = t.start), this.event = t.event, this.animValues[this.event] = [0, 0], "undefined" == typeof this.controller.tweenProps[this.event] && (this.controller.tweenProps[this.event] = new c.TargetValue(0, 1, (!1))), a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "parseOptions", this).call(this, t), this.keyframeType = c.KeyframeTypes.Event
                    }
                }, {
                    key: "updateLocalProgress",
                    value: function(t) {
                        if (this.hasDuration) {
                            var e = this.isCurrentlyInRange,
                                i = t >= this.start && t <= this.end;
                            if (e === i) return;
                            return i && !e ? this._trigger(this.event + ":enter") : e && !i && this._trigger(this.event + ":exit"), void(this.isCurrentlyInRange = i)
                        }!this.isApplied && t >= this.start ? (this._trigger(this.event), this.isApplied = !0) : this.isApplied && t < this.start && (this._trigger(this.event + ":reverse"), this.isApplied = !1)
                    }
                }, {
                    key: "_trigger",
                    value: function(t) {
                        this.controller.eventObject.event = t, this.controller.eventObject.keyframe = this, this.controller.trigger(t, this.controller.eventObject)
                    }
                }, {
                    key: "updateAnimationConstraints",
                    value: function() {
                        a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateAnimationConstraints", this).call(this), this.hasDuration = this.start !== this.end
                    }
                }, {
                    key: "reset",
                    value: function(t) {
                        this.isApplied = !1, this.isCurrentlyInRange = !1, a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "reset", this).call(this, t)
                    }
                }, {
                    key: "onDOMRead",
                    value: function(t, e) {}
                }, {
                    key: "reconcile",
                    value: function(t, e) {}
                }, {
                    key: "updateAnimatedValueConstraints",
                    value: function() {}
                }]), e
            }(l);
        u.DATA_ATTRIBUTE = "data-anim-event", e.exports = u
    }, {
        "../Model/AnimSystemModel.js": 259,
        "./Keyframe": 256
    }],
    259: [function(t, e, i) {
        "use strict";
        var r = {
            GUI_INSTANCE: null,
            ANIM_INSTANCE: null,
            VIEWPORT_EMITTER_ELEMENT: void 0,
            LOCAL_STORAGE_KEYS: {
                GuiPosition: "GuiPosition-0"
            },
            RESIZE_TIMEOUT: -1,
            BREAKPOINTS: [{
                name: "S",
                longName: "small",
                mediaQuery: "only screen and (max-width: 735px)"
            }, {
                name: "M",
                longName: "medium",
                mediaQuery: "only screen and (max-width: 1068px)"
            }, {
                name: "L",
                longName: "xlarge",
                mediaQuery: "only screen and (min-width: 1442px)"
            }, {
                name: "L",
                longName: "large",
                mediaQuery: "only screen and (min-width: 1069px)"
            }],
            getBreakpoint: function() {
                for (var t = 0; t < r.BREAKPOINTS.length; t++) {
                    var e = r.BREAKPOINTS[t],
                        i = window.matchMedia(e.mediaQuery);
                    if (i.matches) return e.name
                }
            },
            KeyframeDefaults: {
                ease: .1,
                epsilon: .05,
                easeFunctionString: "linear",
                easeFunction: "linear",
                hold: !1,
                snapAtCreation: !1,
                toggle: !1,
                breakpointMask: "SMLX",
                event: "",
                disabledWhen: [],
                cssClass: ""
            },
            KeyframeTypes: {
                Interpolation: 0,
                InterpolationForward: 1,
                CSSClass: 2,
                Event: 3
            },
            EVENTS: {
                ON_DOM_KEYFRAMES_CREATED: "ON_DOM_KEYFRAMES_CREATED",
                ON_DOM_GROUPS_CREATED: "ON_DOM_GROUPS_CREATED",
                ON_GROUP_CREATED: "ON_GROUP_CREATED",
                ON_KEYFRAME_UPDATED: "ON_KEYFRAME_UPDATED",
                ON_TIMELINE_START: "ON_TIMELINE_START",
                ON_TIMELINE_UPDATE: "ON_TIMELINE_UPDATE",
                ON_TIMELINE_COMPLETE: "ON_TIMELINE_COMPLETE"
            },
            PageEvents: {
                ON_SCROLL: "ON_SCROLL",
                ON_RESIZE_IMMEDIATE: "ON_RESIZE_IMMEDIATE",
                ON_RESIZE_DEBOUNCED: "ON_RESIZE_DEBOUNCED",
                ON_BREAKPOINT_CHANGE: "ON_BREAKPOINT_CHANGE"
            },
            KeyframeJSONReservedWords: ["event", "cssClass", "style", "relativeTo", "start", "end", "epsilon", "easeFunction", "ease", "breakpointMask", "disabledWhen"],
            TargetValue: function(t, e, i) {
                this.epsilon = parseFloat(e), this.snapAtCreation = i, this.initialValue = t, this.target = t, this.current = t
            },
            Timeline: function() {
                this.local = 0, this.localUnclamped = 0
            },
            ViewableRange: function(t, e) {
                this.a = t.top - e, this.a < 0 && (this.a = t.top), this.b = t.top, this.d = t.bottom, this.c = Math.max(this.d - e, this.b)
            },
            pageMetrics: new function() {
                this.scrollX = 0, this.scrollY = 0, this.windowWidth = 0, this.windowHeight = 0, this.documentOffsetX = 0, this.documentOffsetY = 0, this.previousBreakpoint = "", this.breakpoint = ""
            },
            EventObject: function(t) {
                this.controller = t, this.element = this.controller.element, this.keyframe = null, this.event = "", this.tweenProps = this.controller.tweenProps
            },
            KeyframeComparison: function(t, e) {
                return t.start < e.start ? -1 : t.start > e.start ? 1 : 0
            },
            AnimInfo: function(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                this.isGroup = i, this.group = t, this.controller = e, this.controllers = []
            }
        };
        e.exports = r
    }, {}],
    260: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function s() {
            r(this, s), this.linear = function(t) {
                return t
            }, this.easeInQuad = function(t) {
                return t * t
            }, this.easeOutQuad = function(t) {
                return t * (2 - t)
            }, this.easeInOutQuad = function(t) {
                return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            }, this.easeInSin = function(t) {
                return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2)
            }, this.easeOutSin = function(t) {
                return Math.sin(Math.PI / 2 * t)
            }, this.easeInOutSin = function(t) {
                return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2
            }, this.easeInElastic = function(t) {
                return 0 === t ? t : (.04 - .04 / t) * Math.sin(25 * t) + 1
            }, this.easeOutElastic = function(t) {
                return .04 * t / --t * Math.sin(25 * t)
            }, this.easeInOutElastic = function(t) {
                return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1
            }, this.easeOutBack = function(t) {
                return t -= 1, t * t * (2.70158 * t + 1.70158) + 1
            }, this.easeInCubic = function(t) {
                return t * t * t
            }, this.easeOutCubic = function(t) {
                return --t * t * t + 1
            }, this.easeInOutCubic = function(t) {
                return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
            }, this.easeInQuart = function(t) {
                return t * t * t * t
            }, this.easeOutQuart = function(t) {
                return 1 - --t * t * t * t
            }, this.easeInOutQuart = function(t) {
                return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
            }, this.easeInQuint = function(t) {
                return t * t * t * t * t
            }, this.easeOutQuint = function(t) {
                return 1 + --t * t * t * t * t
            }, this.easeInOutQuint = function(t) {
                return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
            }
        };
        e.exports = new n
    }, {}],
    261: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            s = t("./AnimSystemModel"),
            o = function(t, e) {
                return void 0 === t || null === t ? e : t
            },
            a = function() {
                function t() {
                    r(this, t), this._metrics = new WeakMap
                }
                return n(t, [{
                    key: "destroy",
                    value: function() {
                        this._metrics = null
                    }
                }, {
                    key: "add",
                    value: function(t) {
                        var e = this._metrics.get(t);
                        if (e) return e;
                        var i = new l(t);
                        return this._metrics.set(t, i), this._refreshMetrics(t, i)
                    }
                }, {
                    key: "get",
                    value: function(t) {
                        return this._metrics.get(t)
                    }
                }, {
                    key: "refreshCollection",
                    value: function(t) {
                        var e = this;
                        t.forEach(function(t) {
                            return e._refreshMetrics(t, null)
                        })
                    }
                }, {
                    key: "refreshMetrics",
                    value: function(t) {
                        return this._refreshMetrics(t)
                    }
                }, {
                    key: "_refreshMetrics",
                    value: function(t, e) {
                        if (e = e || this._metrics.get(t), !(t instanceof Element)) return e.width = o(t.width, 0), e.height = o(t.height, 0), e.top = o(t.top, 0), e.left = o(t.left, 0), e.right = e.left + e.width, e.bottom = e.top + e.height, e;
                        if (void 0 === t.offsetWidth) {
                            var i = t.getBoundingClientRect();
                            return e.width = i.width, e.height = i.height, e.top = s.pageMetrics.scrollY + i.top, e.left = s.pageMetrics.scrollX + i.left, e.right = e.left + e.width, e.bottom = e.top + e.height, e
                        }
                        e.width = t.offsetWidth, e.height = t.offsetHeight, e.top = s.pageMetrics.documentOffsetY, e.left = s.pageMetrics.documentOffsetX;
                        for (var r = t; r;) e.top += r.offsetTop, e.left += r.offsetLeft, r = r.offsetParent;
                        return e.right = e.left + e.width, e.bottom = e.top + e.height, e
                    }
                }]), t
            }(),
            l = function() {
                function t(e) {
                    r(this, t), this.top = 0, this.bottom = 0, this.left = 0, this.right = 0, this.height = 0, this.width = 0
                }
                return n(t, [{
                    key: "toString",
                    value: function() {
                        return "top:" + this.top + ", bottom:" + this.bottom + ", left:" + this.left + ", right:" + this.right + ", height:" + this.height + ", width:" + this.width
                    }
                }, {
                    key: "toObject",
                    value: function() {
                        return {
                            top: this.top,
                            bottom: this.bottom,
                            left: this.left,
                            right: this.right,
                            height: this.height,
                            width: this.width
                        }
                    }
                }]), t
            }();
        e.exports = a
    }, {
        "./AnimSystemModel": 259
    }],
    262: [function(t, e, i) {
        "use strict";
        var r = t("./AnimSystemModel"),
            n = t("../Keyframes/Keyframe"),
            s = t("../Keyframes/KeyframeDiscreteEvent"),
            o = t("../Keyframes/KeyframeCSSClass"),
            a = function(t) {
                for (var e in t) {
                    var i = t[e];
                    if (r.KeyframeJSONReservedWords.indexOf(e) === -1 && Array.isArray(i)) return !0
                }
                return !1
            };
        e.exports = function(t) {
            if (void 0 !== t.cssClass || void 0 !== t.style) {
                if (a(t)) throw "CSS Keyframes cannot tween values, please use multiple keyframes instead";
                return o
            }
            if (a(t)) return n;
            if (t.event) return s;
            throw "Could not determine tween type based on " + JSON.stringify(t)
        }
    }, {
        "../Keyframes/Keyframe": 256,
        "../Keyframes/KeyframeCSSClass": 257,
        "../Keyframes/KeyframeDiscreteEvent": 258,
        "./AnimSystemModel": 259
    }],
    263: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            for (var t = "", e = 0; e < 8; e++) {
                var i = 16 * Math.random() | 0;
                8 !== e && 12 !== e && 16 !== e && 20 !== e || (t += "-"), t += (12 === e ? 4 : 16 === e ? 3 & i | 8 : i).toString(16)
            }
            return t
        }
    }, {}],
    264: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            s = 1e-5,
            o = Math.abs,
            a = 5,
            l = function() {
                function t(e, i, n, s) {
                    r(this, t), this.cp = new Float32Array(6), this.cp[0] = 3 * e, this.cp[1] = 3 * (n - e) - this.cp[0], this.cp[2] = 1 - this.cp[0] - this.cp[1], this.cp[3] = 3 * i, this.cp[4] = 3 * (s - i) - this.cp[3], this.cp[5] = 1 - this.cp[3] - this.cp[4]
                }
                return n(t, [{
                    key: "sampleCurveX",
                    value: function(t) {
                        return ((this.cp[2] * t + this.cp[1]) * t + this.cp[0]) * t
                    }
                }, {
                    key: "sampleCurveY",
                    value: function(t) {
                        return ((this.cp[5] * t + this.cp[4]) * t + this.cp[3]) * t
                    }
                }, {
                    key: "sampleCurveDerivativeX",
                    value: function(t) {
                        return (3 * this.cp[2] * t + 2 * this.cp[1]) * t + this.cp[0]
                    }
                }, {
                    key: "solveCurveX",
                    value: function(t) {
                        var e, i, r, n, l, c;
                        for (r = t, c = 0; c < a; c++) {
                            if (n = this.sampleCurveX(r) - t, o(n) < s) return r;
                            if (l = this.sampleCurveDerivativeX(r), o(l) < s) break;
                            r -= n / l
                        }
                        if (e = 0, i = 1, r = t, r < e) return e;
                        if (r > i) return i;
                        for (; e < i;) {
                            if (n = this.sampleCurveX(r), o(n - t) < s) return r;
                            t > n ? e = r : i = r, r = .5 * (i - e) + e
                        }
                        return r
                    }
                }, {
                    key: "solve",
                    value: function(t) {
                        return this.sampleCurveY(this.solveCurveX(t))
                    }
                }]), t
            }(),
            c = /\d*\.?\d+/g;
        l.fromCSSString = function(t) {
            var e = t.match(c);
            if (4 !== e.length) throw "UnitBezier could not convert " + t + " to cubic-bezier";
            var i = e.map(Number),
                r = new l(i[0], i[1], i[2], i[3]);
            return r.solve.bind(r)
        }, e.exports = l
    }, {}],
    265: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            s = t("../Model/AnimSystemModel"),
            o = t("./Operations"),
            a = /([-|+])?(\d+\.?\d*)(px|vh|vw|pw|ph|%w|%h|rw|rh|%)?|([-+*\/])/g,
            l = /^[-+]?(?:[0-9]{0,30}\.)?[0-9]{1,30}(?:[Ee][-+]?[1-2]?[0-9])?$/g,
            c = function() {
                function t(e) {
                    r(this, t), this.group = e
                }
                return n(t, [{
                    key: "parse",
                    value: function(t, e) {
                        if (Array.isArray(e)) return this.parseArray(t, e);
                        throw new Error("Keyframe value `" + e + "` is not supported. Only arrays in the form of [start,end] are currently supported")
                    }
                }, {
                    key: "parseArray",
                    value: function(t, e) {
                        var i = this.parseExpression(t, e[0]),
                            r = this.parseExpression(t, e[1]);
                        return [i, r]
                    }
                }, {
                    key: "parseExpression",
                    value: function(t, e) {
                        if (null === e) return 0;
                        if ("number" == typeof e) return e;
                        for (var i = 5, r = void 0;
                            (r = e.indexOf("(")) !== -1 && --i > 0;) {
                            var n = this.captureParenthesis(e, r),
                                s = this.parseExpression(t, n);
                            e = e.replace("(" + n + ")", s)
                        }
                        for (var l = void 0, c = []; null !== (l = a.exec(e));)
                            if (l.index === a.lastIndex && a.lastIndex++, l[4]) c.push(o.GetOpCode(l[4]));
                            else {
                                var u = l[1],
                                    h = parseFloat(l[2]),
                                    m = l[3];
                                "-" === u && (h *= -1);
                                var d = this.parseSplitUnit(t, h, m);
                                c.push(d)
                            } var p = c.length;
                        if (3 === p && "function" == typeof c[1]) return c[1](c[0], c[2]);
                        for (var f = 0; f < p; f++)
                            if ("function" == typeof c[f] && 1 === c[f].priority) {
                                var _ = c[f - 1],
                                    g = c[f + 1],
                                    v = c[f](_, g);
                                c[f - 1] = null, c[f + 0] = null, c[f + 1] = v, f += 1
                            } for (var y = 0; null == c[y] && y < p;) y += 1;
                        var b = c[y],
                            E = null,
                            w = null;
                        for (y += 1; y < p; y++) null !== c[y] ? c[y] instanceof Function ? E = c[y] : (null === w && (w = c[y]), null !== w && (E = E || o.add, b = E(b, w), E = null, w = null)) : y += 1;
                        return b
                    }
                }, {
                    key: "parseSplitUnit",
                    value: function(t, e, i) {
                        if ("undefined" == typeof i) return parseFloat(e);
                        switch (i) {
                            case "vh":
                                return .01 * e * s.pageMetrics.windowHeight;
                            case "%":
                                return .01 * e * t.controller.elementMetrics.height;
                            case "px":
                                return e;
                            case "rh":
                                return .01 * e * this.group.metrics.get(t.relativeTo).height;
                            case "vw":
                                return .01 * e * s.pageMetrics.windowWidth;
                            case "rw":
                                return .01 * e * this.group.metrics.get(t.relativeTo).width;
                            case "%w":
                                return .01 * e * t.controller.elementMetrics.width;
                            case "%h":
                                return .01 * e * t.controller.elementMetrics.height;
                            case "pw":
                                return .01 * e * t.controller.parentElementMetrics.width;
                            case "ph":
                                return .01 * e * t.controller.parentElementMetrics.height;
                            default:
                                throw new Error("ExpressionParser: no strategy found for unit `" + i + "` only `vh, vw, %, ph, pw` are supported")
                        }
                    }
                }, {
                    key: "captureParenthesis",
                    value: function(t, e) {
                        for (var i = "", r = 0, n = !1, s = t.length, o = e; o < s; o++)
                            if ("(" === t[o] ? (r += 1, n && (i += t[o]), n = !0) : ")" === t[o] ? (r -= 1, 0 !== r && (i += t[o])) : n && (i += t[o]), n && 0 === r) return i
                    }
                }, {
                    key: "isUnitlessNumber",
                    value: function(t) {
                        return String(t).match(l)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.group = null
                    }
                }, {
                    key: "logParts",
                    value: function(t) {
                        console.log(t.reduce(function(t, e) {
                            return "function" == typeof e ? t + e.friendlyName + " " : t + (e + " ")
                        }, ""))
                    }
                }]), t
            }();
        e.exports = c
    }, {
        "../Model/AnimSystemModel": 259,
        "./Operations": 266
    }],
    266: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function s() {
            r(this, s), this.add = function(t, e) {
                return t + e
            }, this.sub = function(t, e) {
                return t - e
            }, this.mul = function(t, e) {
                return t * e
            }, this.div = function(t, e) {
                return t / e
            }, this.add.friendlyName = "add", this.sub.friendlyName = "sub", this.mul.friendlyName = "mul", this.div.friendlyName = "div", this.add.priority = 0, this.sub.priority = 0, this.mul.priority = 1, this.div.priority = 1, this.GetOpCode = function(t) {
                switch (t) {
                    case "-":
                        return this.sub;
                    case "+":
                        return this.add;
                    case "*":
                        return this.mul;
                    case "/":
                        return this.div;
                    default:
                        throw new Error('AnimSystem.parsing.Operations - op code "' + t + "\" was found. Only '+ - * /' are supported. Check expression for typos/spacing issues")
                }
            }
        };
        e.exports = new n
    }, {}],
    267: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            s = function() {
                function t(e) {
                    var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    r(this, t), this.group = e, this.groupIsTimeBased = i
                }
                return n(t, [{
                    key: "parse",
                    value: function(t, e) {
                        if ("number" == typeof e) return e;
                        var i = this.groupIsTimeBased ? 0 : this.group.metrics.get(t.relativeTo).top,
                            r = this.group.expressionParser.parseExpression(t, e),
                            n = r + i;
                        return this.group.convertScrollPositionToTValue(n)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.group = null
                    }
                }]), t
            }();
        e.exports = s
    }, {}],
    268: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function n(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var o = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            a = function v(t, e, i) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(t);
                    return null === n ? void 0 : v(n, e, i)
                }
                if ("value" in r) return r.value;
                var s = r.get;
                if (void 0 !== s) return s.call(i)
            },
            l = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            c = t("@marcom/sm-math-utils"),
            u = t("./utils/arrayToObject"),
            h = t("./Model/AnimSystemModel"),
            m = t("./Model/ElementMetricsLookup"),
            d = t("./Parsing/ExpressionParser"),
            p = t("./Parsing/TimeParser"),
            f = t("./KeyframeController"),
            _ = {
                create: t("@marcom/ac-raf-emitter/RAFEmitter"),
                update: t("@marcom/ac-raf-emitter/update"),
                draw: t("@marcom/ac-raf-emitter/draw")
            },
            g = function(t) {
                function e(t, i) {
                    r(this, e);
                    var s = n(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                    return s.anim = i, s.element = t, s.name = s.name || t.getAttribute("data-anim-scroll-group"), s.isEnabled = !0, s.timelines = new h.Timeline, s.metrics = new m, s.metrics.add(s.element),
                        s.expressionParser = new d(s), s.timeParser = new p(s), s.boundsMin = 0, s.boundsMax = 0, s.lastPosition = 0, s.timelineUpdateRequired = !1, s._keyframesDirty = !1, s.viewableRange = s.createViewableRange(), s.defaultEase = h.KeyframeDefaults.ease, s.keyframeControllers = [], s.updateProgress(s.getPosition()), s.onDOMRead = s.onDOMRead.bind(s), s.onDOMWrite = s.onDOMWrite.bind(s), s.gui = null, s.finalizeInit(), s
                }
                return s(e, t), o(e, [{
                    key: "finalizeInit",
                    value: function() {
                        this.element._animInfo = new h.AnimInfo(this, null, (!0)), this.setupRAFEmitter()
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.expressionParser.destroy(), this.expressionParser = null, this.timeParser.destroy(), this.timeParser = null;
                        for (var t = 0, i = this.keyframeControllers.length; t < i; t++) this.keyframeControllers[t].destroy();
                        this.timelines = null, this.viewableRange = null, this.gui && (this.gui.destroy(), this.gui = null), this.metrics.destroy(), this.metrics = null, this.rafEmitter.destroy(), this.rafEmitter = null, this.anim = null, this.element._animInfo && this.element._animInfo.group === this && (this.element._animInfo.group = null, this.element._animInfo = null), this.element = null, this.isEnabled = !1, a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "destroy", this).call(this)
                    }
                }, {
                    key: "removeKeyframeController",
                    value: function(t) {
                        var e = this;
                        if (this.keyframeControllers.includes(t)) {
                            var i = t._allKeyframes;
                            t._allKeyframes = [], this.keyframesDirty = !0, _.draw(function() {
                                var r = e.keyframeControllers.indexOf(t);
                                r !== -1 && (e.keyframeControllers.splice(r, 1), t.onDOMWrite(), i.forEach(function(t) {
                                    return t.destroy()
                                }), t.destroy(), e.gui && e.gui.create())
                            }, !0)
                        }
                    }
                }, {
                    key: "remove",
                    value: function() {
                        this.anim.removeGroup(this)
                    }
                }, {
                    key: "setupRAFEmitter",
                    value: function(t) {
                        var e = this;
                        this.rafEmitter && this.rafEmitter.destroy(), this.rafEmitter = t || new _.create, this.rafEmitter.on("update", this.onDOMRead), this.rafEmitter.on("draw", this.onDOMWrite), this.rafEmitter.once("external", function() {
                            return e.reconcile()
                        })
                    }
                }, {
                    key: "requestDOMChange",
                    value: function() {
                        return !!this.isEnabled && this.rafEmitter.run()
                    }
                }, {
                    key: "onDOMRead",
                    value: function() {
                        this.keyframesDirty && this.onKeyframesDirty();
                        for (var t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].onDOMRead(this.timelines)
                    }
                }, {
                    key: "onDOMWrite",
                    value: function() {
                        for (var t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].onDOMWrite(this.timelines);
                        this.needsUpdate() && this.requestDOMChange()
                    }
                }, {
                    key: "needsUpdate",
                    value: function() {
                        if (this._keyframesDirty) return !0;
                        for (var t = 0, e = this.keyframeControllers.length; t < e; t++)
                            if (this.keyframeControllers[t].needsUpdate()) return !0;
                        return !1
                    }
                }, {
                    key: "addKeyframe",
                    value: function(t, e) {
                        var i = this.getControllerForTarget(t);
                        return null === i && (i = new f(this, t), this.keyframeControllers.push(i)), this.keyframesDirty = !0, i.addKeyframe(e)
                    }
                }, {
                    key: "forceUpdate",
                    value: function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            e = t.waitForNextUpdate,
                            i = void 0 === e || e;
                        this.isEnabled && (this.refreshActiveMetrics(), this.viewableRange = this.createViewableRange(), this.timelineUpdateRequired = !0, i ? this.keyframesDirty = !0 : this.onKeyframesDirty())
                    }
                }, {
                    key: "onKeyframesDirty",
                    value: function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            e = t.preventOnScroll,
                            i = void 0 !== e && e;
                        this.determineActiveKeyframes(), this.keyframesDirty = !1;
                        for (var r = 0, n = this.keyframeControllers.length; r < n; r++) this.keyframeControllers[r].updateAnimationConstraints();
                        this.updateProgress(this.getPosition()), this.updateBounds(), i || this._onScroll(), this.gui && this.gui.create()
                    }
                }, {
                    key: "refreshActiveMetrics",
                    value: function() {
                        var t = new Set;
                        t.add(this.element), this.keyframeControllers.forEach(function(e) {
                            t.add(e.element), e._parentElementMetrics && t.add(e.element.parentElement), e._allKeyframes.forEach(function(e) {
                                return t.add(e.relativeTo)
                            })
                        }), this.metrics.refreshCollection(t)
                    }
                }, {
                    key: "reconcile",
                    value: function() {
                        for (var t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].reconcile()
                    }
                }, {
                    key: "determineActiveKeyframes",
                    value: function(t) {
                        t = t || u(Array.from(document.documentElement.classList));
                        for (var e = 0, i = this.keyframeControllers.length; e < i; e++) this.keyframeControllers[e].determineActiveKeyframes(t)
                    }
                }, {
                    key: "updateBounds",
                    value: function() {
                        if (0 === this.keyframeControllers.length) return this.boundsMin = 0, void(this.boundsMax = 0);
                        for (var t = {
                                min: Number.POSITIVE_INFINITY,
                                max: Number.NEGATIVE_INFINITY
                            }, e = 0, i = this.keyframeControllers.length; e < i; e++) this.keyframeControllers[e].getBounds(t);
                        var r = this.convertTValueToScrollPosition(t.min),
                            n = this.convertTValueToScrollPosition(t.max);
                        n - r < h.pageMetrics.windowHeight ? (t.min = this.convertScrollPositionToTValue(r - .5 * h.pageMetrics.windowHeight), t.max = this.convertScrollPositionToTValue(n + .5 * h.pageMetrics.windowHeight)) : (t.min -= .001, t.max += .001), this.boundsMin = t.min, this.boundsMax = t.max, this.timelineUpdateRequired = !0
                    }
                }, {
                    key: "createViewableRange",
                    value: function() {
                        return new h.ViewableRange(this.metrics.get(this.element), h.pageMetrics.windowHeight)
                    }
                }, {
                    key: "_onBreakpointChange",
                    value: function(t, e) {
                        this.keyframesDirty = !0, this.determineActiveKeyframes()
                    }
                }, {
                    key: "updateProgress",
                    value: function(t) {
                        return this.hasDuration() ? void(this.timelines.localUnclamped = (t - this.viewableRange.a) / (this.viewableRange.d - this.viewableRange.a)) : void(this.timelines.local = this.timelines.localUnclamped = 0)
                    }
                }, {
                    key: "performTimelineDispatch",
                    value: function() {
                        for (var t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].updateLocalProgress(this.timelines.local);
                        this.trigger(h.EVENTS.ON_TIMELINE_UPDATE, this.timelines.local), this.timelineUpdateRequired = !1, this.lastPosition !== this.timelines.local && (this.lastPosition <= this.boundsMin && this.timelines.localUnclamped > this.boundsMin ? this.trigger(h.EVENTS.ON_TIMELINE_START, this) : this.lastPosition >= this.boundsMin && this.timelines.localUnclamped < this.boundsMin ? this.trigger(h.EVENTS.ON_TIMELINE_START + ":reverse", this) : this.lastPosition <= this.boundsMax && this.timelines.localUnclamped >= this.boundsMax ? this.trigger(h.EVENTS.ON_TIMELINE_COMPLETE, this) : this.lastPosition >= this.boundsMax && this.timelines.localUnclamped < this.boundsMax && this.trigger(h.EVENTS.ON_TIMELINE_COMPLETE + ":reverse", this)), null !== this.gui && this.gui.onScrollUpdate(this.timelines)
                    }
                }, {
                    key: "_onScroll",
                    value: function(t) {
                        if (!this.isEnabled) return !1;
                        void 0 === t && (t = this.getPosition()), this.updateProgress(t);
                        var e = this.lastPosition === this.boundsMin || this.lastPosition === this.boundsMax,
                            i = this.timelines.localUnclamped === this.boundsMin || this.timelines.localUnclamped === this.boundsMax;
                        if (!this.timelineUpdateRequired && e && i && this.lastPosition === t) return void(this.timelines.local = this.timelines.localUnclamped);
                        if (this.timelineUpdateRequired || this.timelines.localUnclamped > this.boundsMin && this.timelines.localUnclamped < this.boundsMax) return this.timelines.local = c.clamp(this.timelines.localUnclamped, this.boundsMin, this.boundsMax), this.performTimelineDispatch(), this.requestDOMChange(), void(this.lastPosition = this.timelines.localUnclamped);
                        var r = this.lastPosition > this.boundsMin && this.lastPosition < this.boundsMax,
                            n = this.timelines.localUnclamped <= this.boundsMin || this.timelines.localUnclamped >= this.boundsMax;
                        return r && n ? (this.timelines.local = c.clamp(this.timelines.localUnclamped, this.boundsMin, this.boundsMax), this.performTimelineDispatch(), this.requestDOMChange(), void(this.lastPosition = this.timelines.localUnclamped)) : void(null !== this.gui && this.gui.onScrollUpdate(this.timelines))
                    }
                }, {
                    key: "convertScrollPositionToTValue",
                    value: function(t) {
                        return this.hasDuration() ? c.map(t, this.viewableRange.a, this.viewableRange.d, 0, 1) : 0
                    }
                }, {
                    key: "convertTValueToScrollPosition",
                    value: function(t) {
                        return this.hasDuration() ? c.map(t, 0, 1, this.viewableRange.a, this.viewableRange.d) : 0
                    }
                }, {
                    key: "hasDuration",
                    value: function() {
                        return this.viewableRange.a !== this.viewableRange.d
                    }
                }, {
                    key: "getPosition",
                    value: function() {
                        return h.pageMetrics.scrollY
                    }
                }, {
                    key: "getControllerForTarget",
                    value: function(t) {
                        if (!t._animInfo || !t._animInfo.controllers) return null;
                        if (t._animInfo.controller && t._animInfo.controller.group === this) return t._animInfo.controller;
                        for (var e = t._animInfo.controllers, i = 0, r = e.length; i < r; i++)
                            if (e[i].group === this) return e[i];
                        return null
                    }
                }, {
                    key: "trigger",
                    value: function(t, e) {
                        if ("undefined" != typeof this._events[t])
                            for (var i = this._events[t].length - 1; i >= 0; i--) void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
                    }
                }, {
                    key: "keyframesDirty",
                    set: function(t) {
                        this._keyframesDirty = t, this._keyframesDirty && this.requestDOMChange()
                    },
                    get: function() {
                        return this._keyframesDirty
                    }
                }, {
                    key: "keyFrames",
                    get: function() {
                        return this.viewableRange
                    }
                }]), e
            }(l);
        e.exports = g
    }, {
        "./KeyframeController": 255,
        "./Model/AnimSystemModel": 259,
        "./Model/ElementMetricsLookup": 261,
        "./Parsing/ExpressionParser": 265,
        "./Parsing/TimeParser": 267,
        "./utils/arrayToObject": 270,
        "@marcom/ac-event-emitter-micro": 238,
        "@marcom/ac-raf-emitter/RAFEmitter": 241,
        "@marcom/ac-raf-emitter/draw": 247,
        "@marcom/ac-raf-emitter/update": 251,
        "@marcom/sm-math-utils": 291
    }],
    269: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function n(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var o = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            a = function d(t, e, i) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(t);
                    return null === n ? void 0 : d(n, e, i)
                }
                if ("value" in r) return r.value;
                var s = r.get;
                if (void 0 !== s) return s.call(i)
            },
            l = t("./ScrollGroup"),
            c = t("@marcom/sm-math-utils"),
            u = 0,
            h = {
                create: t("@marcom/ac-raf-emitter/RAFEmitter")
            },
            m = function(t) {
                function e(t, i) {
                    r(this, e), t || (t = document.createElement("div"), t.className = "TimeGroup-" + u++);
                    var s = n(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i));
                    return s.name = s.name || t.getAttribute("data-anim-time-group"), s.timeParser.groupIsTimeBased = !0, s._isPaused = !0, s._repeats = 0, s._isReversed = !1, s._timeScale = 1, s
                }
                return s(e, t), o(e, [{
                    key: "finalizeInit",
                    value: function() {
                        if (!this.anim) throw "TimeGroup not instantiated correctly. Please use `AnimSystem.createTimeGroup(el)`";
                        this.onPlayTimeUpdate = this.onPlayTimeUpdate.bind(this), a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "finalizeInit", this).call(this)
                    }
                }, {
                    key: "progress",
                    value: function(t, e) {
                        if (void 0 === t) return 0 === this.boundsMax ? 0 : this.timelines.local / this.boundsMax;
                        var i = t * this.boundsMax;
                        this.timelineUpdateRequired = e || !1, this._onScroll(i)
                    }
                }, {
                    key: "time",
                    value: function(t, e) {
                        return void 0 === t ? this.timelines.local : (t = c.clamp(t, this.boundsMin, this.boundsMax), this.timelineUpdateRequired = e || !1, void this._onScroll(t))
                    }
                }, {
                    key: "play",
                    value: function(t) {
                        this.reversed(!1), this.isEnabled = !0, this._isPaused = !1, this.time(t, !0), this._playheadEmitter.run()
                    }
                }, {
                    key: "reverse",
                    value: function(t) {
                        this.reversed(!0), this.isEnabled = !0, this._isPaused = !1, this.time(t, !0), this._playheadEmitter.run()
                    }
                }, {
                    key: "reversed",
                    value: function(t) {
                        return void 0 === t ? this._isReversed : (this._isReversed = t, this)
                    }
                }, {
                    key: "restart",
                    value: function() {
                        this._isReversed ? (this.progress(1, !0), this.reverse(this.time())) : (this.progress(0, !0), this.play(this.time()))
                    }
                }, {
                    key: "pause",
                    value: function(t) {
                        this.time(t), this._isPaused = !0
                    }
                }, {
                    key: "paused",
                    value: function(t) {
                        return void 0 === t ? this._isPaused : (this._isPaused = t, this._isPaused || this.play(), this)
                    }
                }, {
                    key: "onPlayTimeUpdate",
                    value: function(t) {
                        if (!this._isPaused) {
                            var i = c.clamp(t.delta / 1e3, 0, .5);
                            this._isReversed && (i = -i);
                            var r = this.time(),
                                n = r + i * this._timeScale;
                            if (this._repeats === e.REPEAT_FOREVER || this._repeats > 0) {
                                var s = !1;
                                !this._isReversed && n > this.boundsMax ? (n -= this.boundsMax, s = !0) : this._isReversed && n < 0 && (n = this.boundsMax + n, s = !0), s && (this._repeats = this._repeats === e.REPEAT_FOREVER ? e.REPEAT_FOREVER : this._repeats - 1)
                            }
                            this.time(n);
                            var o = !this._isReversed && this.timelines.local !== this.duration,
                                a = this._isReversed && 0 !== this.timelines.local;
                            (o || a) && this._playheadEmitter.run()
                        }
                    }
                }, {
                    key: "updateProgress",
                    value: function(t) {
                        return this.hasDuration() ? void(this.timelines.localUnclamped = t) : void(this.timelines.local = this.timelines.localUnclamped = 0)
                    }
                }, {
                    key: "updateBounds",
                    value: function() {
                        if (0 === this.keyframeControllers.length) return this.boundsMin = 0, void(this.boundsMax = 0);
                        for (var t = {
                                min: Number.POSITIVE_INFINITY,
                                max: Number.NEGATIVE_INFINITY
                            }, e = 0, i = this.keyframeControllers.length; e < i; e++) this.keyframeControllers[e].getBounds(t);
                        this.boundsMin = 0, this.boundsMax = t.max, this.viewableRange.a = this.viewableRange.b = 0, this.viewableRange.c = this.viewableRange.d = this.boundsMax, this.timelineUpdateRequired = !0
                    }
                }, {
                    key: "setupRAFEmitter",
                    value: function(t) {
                        this._playheadEmitter = new h.create, this._playheadEmitter.on("update", this.onPlayTimeUpdate), a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "setupRAFEmitter", this).call(this, t)
                    }
                }, {
                    key: "timeScale",
                    value: function(t) {
                        return void 0 === t ? this._timeScale : (this._timeScale = t, this)
                    }
                }, {
                    key: "repeats",
                    value: function(t) {
                        return void 0 === t ? this._repeats : (this._repeats = t, this)
                    }
                }, {
                    key: "getPosition",
                    value: function() {
                        return this.timelines.local
                    }
                }, {
                    key: "convertScrollPositionToTValue",
                    value: function(t) {
                        return t
                    }
                }, {
                    key: "convertTValueToScrollPosition",
                    value: function(t) {
                        return t
                    }
                }, {
                    key: "hasDuration",
                    value: function() {
                        return this.duration > 0
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this._playheadEmitter.destroy(), this._playheadEmitter = null, a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "destroy", this).call(this)
                    }
                }, {
                    key: "duration",
                    get: function() {
                        return this.keyframesDirty && this.onKeyframesDirty({
                            preventOnScroll: !0
                        }), this.boundsMax
                    }
                }]), e
            }(l);
        m.REPEAT_FOREVER = -1, e.exports = m
    }, {
        "./ScrollGroup": 268,
        "@marcom/ac-raf-emitter/RAFEmitter": 241,
        "@marcom/sm-math-utils": 291
    }],
    270: [function(t, e, i) {
        "use strict";
        var r = function(t) {
            return t.reduce(function(t, e) {
                return t[e] = e, t
            }, {})
        };
        e.exports = r
    }, {}],
    271: [function(t, e, i) {
        arguments[4][191][0].apply(i, arguments)
    }, {
        "./ac-event-emitter-micro/EventEmitterMicro": 272,
        dup: 191
    }],
    272: [function(t, e, i) {
        arguments[4][192][0].apply(i, arguments)
    }, {
        dup: 192
    }],
    273: [function(t, e, i) {
        arguments[4][240][0].apply(i, arguments)
    }, {
        dup: 240
    }],
    274: [function(t, e, i) {
        arguments[4][241][0].apply(i, arguments)
    }, {
        "./sharedRAFEmitterIDGeneratorInstance": 280,
        "./sharedRAFExecutorInstance": 281,
        "@marcom/ac-event-emitter-micro": 271,
        dup: 241
    }],
    275: [function(t, e, i) {
        arguments[4][242][0].apply(i, arguments)
    }, {
        "@marcom/ac-event-emitter-micro/EventEmitterMicro": 272,
        dup: 242
    }],
    276: [function(t, e, i) {
        arguments[4][243][0].apply(i, arguments)
    }, {
        "./SingleCallRAFEmitter": 278,
        dup: 243
    }],
    277: [function(t, e, i) {
        arguments[4][244][0].apply(i, arguments)
    }, {
        "./RAFInterface": 276,
        dup: 244
    }],
    278: [function(t, e, i) {
        arguments[4][245][0].apply(i, arguments)
    }, {
        "./RAFEmitter": 274,
        dup: 245
    }],
    279: [function(t, e, i) {
        arguments[4][247][0].apply(i, arguments)
    }, {
        "./RAFInterfaceController": 277,
        dup: 247
    }],
    280: [function(t, e, i) {
        arguments[4][249][0].apply(i, arguments)
    }, {
        "../.release-info.js": 273,
        "@marcom/ac-shared-instance": 203,
        dup: 249
    }],
    281: [function(t, e, i) {
        arguments[4][250][0].apply(i, arguments)
    }, {
        "../.release-info.js": 273,
        "./RAFExecutor": 275,
        "@marcom/ac-shared-instance": 203,
        dup: 250
    }],
    282: [function(t, e, i) {
        arguments[4][251][0].apply(i, arguments)
    }, {
        "./RAFInterfaceController": 277,
        dup: 251
    }],
    283: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function n(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var o = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            a = function d(t, e, i) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(t);
                    return null === n ? void 0 : d(n, e, i)
                }
                if ("value" in r) return r.value;
                var s = r.get;
                if (void 0 !== s) return s.call(i)
            },
            l = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            c = {
                create: t("@marcom/ac-raf-emitter/RAFEmitter"),
                update: t("@marcom/ac-raf-emitter/update"),
                draw: t("@marcom/ac-raf-emitter/draw")
            },
            u = function() {},
            h = 0,
            m = function(t) {
                function e(t) {
                    r(this, e);
                    var i = n(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                    return i.el = t.el, i.gum = t.gum, i._keyframeController = null, i
                }
                return s(e, t), o(e, [{
                    key: "destroy",
                    value: function() {
                        this.el = null, this.gum = null, this._keyframeController = null, a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "destroy", this).call(this)
                    }
                }, {
                    key: "addKeyframe",
                    value: function(t) {
                        var e = t.el || this.el;
                        return this.anim.addKeyframe(e, t)
                    }
                }, {
                    key: "addDiscreteEvent",
                    value: function(t) {
                        t.event = t.event || "Generic-Event-Name-" + h++;
                        var e = void 0 !== t.end && t.end !== t.start,
                            i = this.addKeyframe(t);
                        return e ? (this._addCallbackIfNotNull(i, t.event + ":enter", t.onEnter), this._addCallbackIfNotNull(i, t.event + ":exit", t.onExit)) : (this._addCallbackIfNotNull(i, t.event, t.onEvent), this._addCallbackIfNotNull(i, t.event + ":reverse", t.onEventReverse)), i
                    }
                }, {
                    key: "addRAFLoop",
                    value: function(t) {
                        var e = ["start", "end"];
                        if (!e.every(function(e) {
                                return t.hasOwnProperty(e)
                            })) return void console.log("BubbleGum.BaseComponent::addRAFLoop required options are missing: " + e.join(" "));
                        var i = new c.create;
                        i.on("update", t.onUpdate || u), i.on("draw", t.onDraw || u), i.on("draw", function() {
                            return i.run()
                        });
                        var r = t.onEnter,
                            n = t.onExit;
                        return t.onEnter = function() {
                            i.run(), r ? r() : 0
                        }, t.onExit = function() {
                            i.cancel(), n ? n() : 0
                        }, this.addDiscreteEvent(t)
                    }
                }, {
                    key: "addContinuousEvent",
                    value: function(t) {
                        t.onDraw || console.log("BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"), t.event = t.event || "Generic-Event-Name-" + h++;
                        var e = this.addKeyframe(t);
                        return e.controller.on(t.event, t.onDraw), e
                    }
                }, {
                    key: "mounted",
                    value: function() {
                        if (this.onComponentWillAppear || this.onComponentWillDisappear) {
                            this.onComponentWillAppear = this.onComponentWillAppear ? this.onComponentWillAppear.bind(this) : void 0, this.onComponentWillDisappear = this.onComponentWillDisappear ? this.onComponentWillDisappear.bind(this) : void 0;
                            var t = {
                                start: "-100vh - 1px",
                                end: "100% + 1px",
                                event: "_appear" + h++
                            };
                            t.onEnter = this.onComponentWillAppear, t.onExit = this.onComponentWillDisappear, this.addDiscreteEvent(t)
                        }
                    }
                }, {
                    key: "_addCallbackIfNotNull",
                    value: function(t, e, i) {
                        return !!i && (t.controller.on(e, i), !0)
                    }
                }, {
                    key: "onResizeImmediate",
                    value: function(t) {}
                }, {
                    key: "onResizeDebounced",
                    value: function(t) {}
                }, {
                    key: "onBreakpointChange",
                    value: function(t) {}
                }, {
                    key: "anim",
                    get: function() {
                        return this.gum.anim
                    }
                }, {
                    key: "keyframeController",
                    get: function() {
                        return this._keyframeController || (this._keyframeController = this.anim.getControllerForTarget(this.el))
                    }
                }]), e
            }(l);
        e.exports = m
    }, {
        "@marcom/ac-event-emitter-micro": 271,
        "@marcom/ac-raf-emitter/RAFEmitter": 274,
        "@marcom/ac-raf-emitter/draw": 279,
        "@marcom/ac-raf-emitter/update": 282
    }],
    284: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function n(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var o = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            a = t("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            l = t("@marcom/delayed-initializer"),
            c = t("@marcom/anim-system"),
            u = t("@marcom/anim-system/Model/AnimSystemModel"),
            h = t("./ComponentMap"),
            m = {},
            d = function(t) {
                function e(t) {
                    r(this, e);
                    var i = n(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                    return i.el = t, i.anim = c, i.components = [], i.el.getAttribute("data-anim-scroll-group") || i.el.setAttribute("data-anim-scroll-group", "bubble-gum-group"), c.on(u.EVENTS.ON_DOM_GROUPS_CREATED, function(t) {
                        i.componentsInitialized = !1, i.initComponents(), i.setupEvents()
                    }), c.on(u.EVENTS.ON_DOM_KEYFRAMES_CREATED, function() {
                        i.components.forEach(function(t) {
                            return t.mounted()
                        }), i.trigger(e.EVENTS.DOM_COMPONENTS_MOUNTED)
                    }), l.add(function() {
                        return c.initialize()
                    }), i
                }
                return s(e, t), o(e, [{
                    key: "initComponents",
                    value: function() {
                        var t = Array.prototype.slice.call(this.el.querySelectorAll("[data-component-list]"));
                        this.el.hasAttribute("data-component-list") && t.push(this.el);
                        for (var e = 0; e < t.length; e++)
                            for (var i = t[e], r = i.getAttribute("data-component-list"), n = r.split(" "), s = 0, o = n.length; s < o; s++) {
                                var a = n[s];
                                "" !== a && " " !== a && this.addComponent({
                                    el: i,
                                    componentName: a
                                })
                            }
                        this.componentsInitialized = !0
                    }
                }, {
                    key: "setupEvents",
                    value: function() {
                        this.onResizeDebounced = this.onResizeDebounced.bind(this), this.onResizeImmediate = this.onResizeImmediate.bind(this), this.onBreakpointChange = this.onBreakpointChange.bind(this), c.on(u.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate), c.on(u.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced), c.on(u.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange)
                    }
                }, {
                    key: "addComponent",
                    value: function(t) {
                        var i = t.el,
                            r = t.componentName,
                            n = t.data;
                        if (!h.hasOwnProperty(r)) throw "BubbleGum::addComponent could not add component to" + i.className + " no component type '" + r + "'found!";
                        var s = h[r];
                        if (!e.componentIsSupported(s, r)) return void 0 === m[r] && (console.log("BubbleGum::addComponent unsupported component '" + r + "'. Reason: '" + r + ".IS_SUPPORTED' returned false"), m[r] = !0), null;
                        var o = i.dataset.componentList || "";
                        o.includes(r) || (i.dataset.componentList = o.split(" ").concat(r).join(" "));
                        var a = new s({
                            el: i,
                            data: n,
                            gum: this,
                            pageMetrics: u.pageMetrics
                        });
                        return this.components.push(a), this.componentsInitialized && a.mounted(), a
                    }
                }, {
                    key: "removeComponent",
                    value: function(t) {
                        var e = this.components.indexOf(t);
                        e !== -1 && (this.components.splice(e, 1), t.el.dataset.componentList = t.el.dataset.componentList.replace(t.constructor.name, ""), t.destroy())
                    }
                }, {
                    key: "getComponentOfType",
                    value: function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.documentElement,
                            i = "[data-component-list*=" + t + "]",
                            r = e.matches(i) ? e : e.querySelector(i);
                        return r ? this.components.find(function(e) {
                            return e instanceof h[t] && e.el === r
                        }) : null
                    }
                }, {
                    key: "getComponentsOfType",
                    value: function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.documentElement,
                            i = "[data-component-list*=" + t + "]",
                            r = e.matches(i) ? [e] : Array.from(e.querySelectorAll(i));
                        return this.components.filter(function(e) {
                            return e instanceof h[t] && r.includes(e.el)
                        })
                    }
                }, {
                    key: "getComponentsForElement",
                    value: function(t) {
                        return this.components.filter(function(e) {
                            return e.el === t
                        })
                    }
                }, {
                    key: "onResizeImmediate",
                    value: function() {
                        this.components.forEach(function(t) {
                            return t.onResizeImmediate(u.pageMetrics)
                        })
                    }
                }, {
                    key: "onResizeDebounced",
                    value: function() {
                        this.components.forEach(function(t) {
                            return t.onResizeDebounced(u.pageMetrics)
                        })
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function() {
                        this.components.forEach(function(t) {
                            return t.onBreakpointChange(u.pageMetrics)
                        })
                    }
                }], [{
                    key: "componentIsSupported",
                    value: function(t, e) {
                        var i = t.IS_SUPPORTED;
                        if (void 0 === i) return !0;
                        if ("function" != typeof i) return console.error('BubbleGum::addComponent error in "' + e + '".IS_SUPPORTED - it should be a function which returns true/false'), !0;
                        var r = t.IS_SUPPORTED();
                        return void 0 === r ? (console.error('BubbleGum::addComponent error in "' + e + '".IS_SUPPORTED - it should be a function which returns true/false'), !0) : r
                    }
                }]), e
            }(a);
        d.EVENTS = {
            DOM_COMPONENTS_MOUNTED: "DOM_COMPONENTS_MOUNTED"
        }, e.exports = d
    }, {
        "./ComponentMap": 285,
        "@marcom/ac-event-emitter-micro": 271,
        "@marcom/anim-system": 254,
        "@marcom/anim-system/Model/AnimSystemModel": 259,
        "@marcom/delayed-initializer": 287
    }],
    285: [function(t, e, i) {
        "use strict";
        e.exports = {
            BaseComponent: t("./BaseComponent")
        }
    }, {
        "./BaseComponent": 283
    }],
    286: [function(t, e, i) {
        "use strict";
        var r = {
                create: t("gl-mat4/create"),
                invert: t("gl-mat4/invert"),
                clone: t("gl-mat4/clone"),
                transpose: t("gl-mat4/transpose")
            },
            n = {
                create: t("gl-vec3/create"),
                dot: t("gl-vec3/dot"),
                normalize: t("gl-vec3/normalize"),
                length: t("gl-vec3/length"),
                cross: t("gl-vec3/cross"),
                fromValues: t("gl-vec3/fromValues")
            },
            s = {
                create: t("gl-vec4/create"),
                transformMat4: t("gl-vec4/transformMat4"),
                fromValues: t("gl-vec4/fromValues")
            },
            o = (Math.PI / 180, 180 / Math.PI),
            a = 0,
            l = 1,
            c = 3,
            u = 4,
            h = 5,
            m = 7,
            d = 11,
            p = 12,
            f = 13,
            _ = 15,
            g = function(t, e) {
                e = e || !1;
                for (var i = r.clone(t), a = n.create(), l = n.create(), u = n.create(), h = s.create(), p = s.create(), f = (n.create(), 0); f < 16; f++) i[f] /= i[_];
                var g = r.clone(i);
                g[c] = 0, g[m] = 0, g[d] = 0, g[_] = 1;
                var E = (i[3], i[7], i[11], i[12]),
                    w = i[13],
                    T = i[14],
                    S = (i[15], s.create());
                if (b(i[c]) && b(i[m]) && b(i[d])) h = s.fromValues(0, 0, 0, 1);
                else {
                    S[0] = i[c], S[1] = i[m], S[2] = i[d], S[3] = i[_];
                    var x = r.invert(r.create(), g),
                        C = r.transpose(r.create(), x);
                    h = s.transformMat4(h, S, C)
                }
                a[0] = E, a[1] = w, a[2] = T;
                var A = [n.create(), n.create(), n.create()];
                A[0][0] = i[0], A[0][1] = i[1], A[0][2] = i[2], A[1][0] = i[4], A[1][1] = i[5], A[1][2] = i[6], A[2][0] = i[8], A[2][1] = i[9], A[2][2] = i[10], l[0] = n.length(A[0]), n.normalize(A[0], A[0]), u[0] = n.dot(A[0], A[1]), A[1] = v(A[1], A[0], 1, -u[0]), l[1] = n.length(A[1]), n.normalize(A[1], A[1]), u[0] /= l[1], u[1] = n.dot(A[0], A[2]), A[2] = v(A[2], A[0], 1, -u[1]), u[2] = n.dot(A[1], A[2]), A[2] = v(A[2], A[1], 1, -u[2]), l[2] = n.length(A[2]), n.normalize(A[2], A[2]), u[1] /= l[2], u[2] /= l[2];
                var O = n.cross(n.create(), A[1], A[2]);
                if (n.dot(A[0], O) < 0)
                    for (f = 0; f < 3; f++) l[f] *= -1, A[f][0] *= -1, A[f][1] *= -1, A[f][2] *= -1;
                p[0] = .5 * Math.sqrt(Math.max(1 + A[0][0] - A[1][1] - A[2][2], 0)), p[1] = .5 * Math.sqrt(Math.max(1 - A[0][0] + A[1][1] - A[2][2], 0)), p[2] = .5 * Math.sqrt(Math.max(1 - A[0][0] - A[1][1] + A[2][2], 0)), p[3] = .5 * Math.sqrt(Math.max(1 + A[0][0] + A[1][1] + A[2][2], 0)), A[2][1] > A[1][2] && (p[0] = -p[0]), A[0][2] > A[2][0] && (p[1] = -p[1]), A[1][0] > A[0][1] && (p[2] = -p[2]);
                var I = s.fromValues(p[0], p[1], p[2], 2 * Math.acos(p[3])),
                    P = y(p);
                return e && (u[0] = Math.round(u[0] * o * 100) / 100, u[1] = Math.round(u[1] * o * 100) / 100, u[2] = Math.round(u[2] * o * 100) / 100, P[0] = Math.round(P[0] * o * 100) / 100, P[1] = Math.round(P[1] * o * 100) / 100, P[2] = Math.round(P[2] * o * 100) / 100, I[3] = Math.round(I[3] * o * 100) / 100), {
                    translation: a,
                    scale: l,
                    skew: u,
                    perspective: h,
                    quaternion: p,
                    eulerRotation: P,
                    axisAngle: I
                }
            },
            v = function(t, e, i, r) {
                var s = n.create();
                return s[0] = i * t[0] + r * e[0], s[1] = i * t[1] + r * e[1], s[2] = i * t[2] + r * e[2], s
            },
            y = function(t) {
                var e, i, r, s = t[3] * t[3],
                    o = t[0] * t[0],
                    a = t[1] * t[1],
                    l = t[2] * t[2],
                    c = o + a + l + s,
                    u = t[0] * t[1] + t[2] * t[3];
                return u > .499 * c ? (i = 2 * Math.atan2(t[0], t[3]), r = Math.PI / 2, e = 0, n.fromValues(e, i, r)) : u < -.499 * c ? (i = -2 * Math.atan2(t[0], t[3]), r = -Math.PI / 2, e = 0, n.fromValues(e, i, r)) : (i = Math.atan2(2 * t[1] * t[3] - 2 * t[0] * t[2], o - a - l + s), r = Math.asin(2 * u / c), e = Math.atan2(2 * t[0] * t[3] - 2 * t[1] * t[2], -o + a - l + s), n.fromValues(e, i, r))
            },
            b = function(t) {
                return Math.abs(t) < 1e-4
            },
            E = function(t) {
                var e = String(getComputedStyle(t).transform).trim(),
                    i = r.create();
                if ("none" === e || "" === e) return i;
                var n, s, o = e.slice(0, e.indexOf("("));
                if ("matrix3d" === o)
                    for (n = e.slice(9, -1).split(","), s = 0; s < n.length; s++) i[s] = parseFloat(n[s]);
                else {
                    if ("matrix" !== o) throw new TypeError("Invalid Matrix Value");
                    for (n = e.slice(7, -1).split(","), s = n.length; s--;) n[s] = parseFloat(n[s]);
                    i[a] = n[0], i[l] = n[1], i[p] = n[4], i[u] = n[2], i[h] = n[3], i[f] = n[5]
                }
                return i
            };
        e.exports = function(t, e) {
            var i = E(t);
            return g(i, e)
        }
    }, {
        "gl-mat4/clone": 298,
        "gl-mat4/create": 299,
        "gl-mat4/invert": 302,
        "gl-mat4/transpose": 310,
        "gl-vec3/create": 311,
        "gl-vec3/cross": 312,
        "gl-vec3/dot": 313,
        "gl-vec3/fromValues": 314,
        "gl-vec3/length": 315,
        "gl-vec3/normalize": 316,
        "gl-vec4/create": 317,
        "gl-vec4/fromValues": 318,
        "gl-vec4/transformMat4": 319
    }],
    287: [function(t, e, i) {
        "use strict";
        var r = !1,
            n = !1,
            s = [];
        e.exports = {
            NUMBER_OF_FRAMES_TO_WAIT: 30,
            add: function(t) {
                var e = this;
                if (n && t(), s.push(t), !r) {
                    r = !0;
                    var i = document.documentElement.scrollHeight,
                        o = 0,
                        a = function l() {
                            var t = document.documentElement.scrollHeight;
                            if (i !== t) o = 0;
                            else if (o++, o >= e.NUMBER_OF_FRAMES_TO_WAIT) return void s.forEach(function(t) {
                                return t()
                            });
                            i = t, requestAnimationFrame(l)
                        };
                    requestAnimationFrame(a)
                }
            }
        }
    }, {}],
    288: [function(t, e, i) {
        "use strict";
        e.exports = {
            getWindow: function() {
                return window
            },
            getDocument: function() {
                return document
            },
            getNavigator: function() {
                return navigator
            }
        }
    }, {}],
    289: [function(t, e, i) {
        "use strict";

        function r() {
            var t = n.getWindow(),
                e = n.getDocument(),
                i = n.getNavigator();
            return !!("ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch || i.maxTouchPoints > 0 || i.msMaxTouchPoints > 0)
        }
        var n = t("./helpers/globals"),
            s = t("@marcom/function-utils/once");
        e.exports = s(r), e.exports.original = r
    }, {
        "./helpers/globals": 288,
        "@marcom/function-utils/once": 290
    }],
    290: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e;
            return function() {
                return "undefined" == typeof e && (e = t.apply(this, arguments)), e
            }
        }
    }, {}],
    291: [function(t, e, i) {
        "use strict";
        e.exports = {
            lerp: function(t, e, i) {
                return e + (i - e) * t
            },
            map: function(t, e, i, r, n) {
                return r + (n - r) * (t - e) / (i - e)
            },
            mapClamp: function(t, e, i, r, n) {
                var s = r + (n - r) * (t - e) / (i - e);
                return Math.max(r, Math.min(n, s))
            },
            norm: function(t, e, i) {
                return (t - e) / (i - e)
            },
            clamp: function(t, e, i) {
                return Math.max(e, Math.min(i, t))
            },
            randFloat: function(t, e) {
                return Math.random() * (e - t) + t
            },
            randInt: function(t, e) {
                return Math.floor(Math.random() * (e - t) + t)
            }
        }
    }, {}],
    292: [function(t, e, i) {
        "use strict";
        e.exports = {
            browser: {
                safari: !1,
                chrome: !1,
                firefox: !1,
                ie: !1,
                opera: !1,
                android: !1,
                edge: !1,
                version: {
                    string: "",
                    major: 0,
                    minor: 0,
                    patch: 0,
                    documentMode: !1
                }
            },
            os: {
                osx: !1,
                ios: !1,
                android: !1,
                windows: !1,
                linux: !1,
                fireos: !1,
                chromeos: !1,
                version: {
                    string: "",
                    major: 0,
                    minor: 0,
                    patch: 0
                }
            }
        }
    }, {}],
    293: [function(t, e, i) {
        "use strict";
        e.exports = {
            browser: [{
                name: "edge",
                userAgent: "Edge",
                version: ["rv", "Edge"],
                test: function(t) {
                    return t.ua.indexOf("Edge") > -1 || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" === t.ua
                }
            }, {
                name: "chrome",
                userAgent: "Chrome"
            }, {
                name: "firefox",
                test: function(t) {
                    return t.ua.indexOf("Firefox") > -1 && t.ua.indexOf("Opera") === -1
                },
                version: "Firefox"
            }, {
                name: "android",
                userAgent: "Android"
            }, {
                name: "safari",
                test: function(t) {
                    return t.ua.indexOf("Safari") > -1 && t.vendor.indexOf("Apple") > -1
                },
                version: "Version"
            }, {
                name: "ie",
                test: function(t) {
                    return t.ua.indexOf("IE") > -1 || t.ua.indexOf("Trident") > -1
                },
                version: ["MSIE", "rv"],
                parseDocumentMode: function() {
                    var t = !1;
                    return document.documentMode && (t = parseInt(document.documentMode, 10)), t
                }
            }, {
                name: "opera",
                userAgent: "Opera",
                version: ["Version", "Opera"]
            }],
            os: [{
                name: "windows",
                test: function(t) {
                    return t.ua.indexOf("Windows") > -1
                },
                version: "Windows NT"
            }, {
                name: "osx",
                userAgent: "Mac",
                test: function(t) {
                    return t.ua.indexOf("Macintosh") > -1
                }
            }, {
                name: "ios",
                test: function(t) {
                    return t.ua.indexOf("iPhone") > -1 || t.ua.indexOf("iPad") > -1
                },
                version: ["iPhone OS", "CPU OS"]
            }, {
                name: "linux",
                userAgent: "Linux",
                test: function(t) {
                    return (t.ua.indexOf("Linux") > -1 || t.platform.indexOf("Linux") > -1) && t.ua.indexOf("Android") === -1
                }
            }, {
                name: "fireos",
                test: function(t) {
                    return t.ua.indexOf("Firefox") > -1 && t.ua.indexOf("Mobile") > -1
                },
                version: "rv"
            }, {
                name: "android",
                userAgent: "Android",
                test: function(t) {
                    return t.ua.indexOf("Android") > -1
                }
            }, {
                name: "chromeos",
                userAgent: "CrOS"
            }]
        }
    }, {}],
    294: [function(t, e, i) {
        "use strict";

        function r(t) {
            return new RegExp(t + "[a-zA-Z\\s/:]+([0-9_.]+)", "i")
        }

        function n(t, e) {
            if ("function" == typeof t.parseVersion) return t.parseVersion(e);
            var i = t.version || t.userAgent;
            "string" == typeof i && (i = [i]);
            for (var n, s = i.length, o = 0; o < s; o++)
                if (n = e.match(r(i[o])), n && n.length > 1) return n[1].replace(/_/g, ".");
            return !1
        }

        function s(t, e, i) {
            for (var r, s, o = t.length, a = 0; a < o; a++)
                if ("function" == typeof t[a].test ? t[a].test(i) === !0 && (r = t[a].name) : i.ua.indexOf(t[a].userAgent) > -1 && (r = t[a].name),
                    r) {
                    if (e[r] = !0, s = n(t[a], i.ua), "string" == typeof s) {
                        var l = s.split(".");
                        e.version.string = s, l && l.length > 0 && (e.version.major = parseInt(l[0] || 0), e.version.minor = parseInt(l[1] || 0), e.version.patch = parseInt(l[2] || 0))
                    } else "edge" === r && (e.version.string = "12.0.0", e.version.major = "12", e.version.minor = "0", e.version.patch = "0");
                    return "function" == typeof t[a].parseDocumentMode && (e.version.documentMode = t[a].parseDocumentMode()), e
                } return e
        }

        function o(t) {
            var e = {};
            return e.browser = s(l.browser, a.browser, t), e.os = s(l.os, a.os, t), e
        }
        var a = t("./defaults"),
            l = t("./dictionary");
        e.exports = o
    }, {
        "./defaults": 292,
        "./dictionary": 293
    }],
    295: [function(t, e, i) {
        "use strict";
        var r = {
            ua: window.navigator.userAgent,
            platform: window.navigator.platform,
            vendor: window.navigator.vendor
        };
        e.exports = t("./parseUserAgent")(r)
    }, {
        "./parseUserAgent": 294
    }],
    296: [function(t, e, i) {
        e.exports.EventEmitter = t("./ac-event-emitter/EventEmitter")
    }, {
        "./ac-event-emitter/EventEmitter": 297
    }],
    297: [function(t, e, i) {
        "use strict";
        var r = "EventEmitter:propagation",
            n = function(t) {
                t && (this.context = t)
            },
            s = n.prototype,
            o = function() {
                return this.hasOwnProperty("_events") || "object" == typeof this._events || (this._events = {}), this._events
            },
            a = function(t, e) {
                var i = t[0],
                    r = t[1],
                    n = t[2];
                if ("string" != typeof i && "object" != typeof i || null === i || Array.isArray(i)) throw new TypeError("Expecting event name to be a string or object.");
                if ("string" == typeof i && !r) throw new Error("Expecting a callback function to be provided.");
                if (r && "function" != typeof r) {
                    if ("object" != typeof i || "object" != typeof r) throw new TypeError("Expecting callback to be a function.");
                    n = r
                }
                if ("object" == typeof i)
                    for (var s in i) e.call(this, s, i[s], n);
                "string" == typeof i && (i = i.split(" "), i.forEach(function(t) {
                    e.call(this, t, r, n)
                }, this))
            },
            l = function(t, e) {
                var i, r, n;
                if (i = o.call(this)[t], i && 0 !== i.length)
                    for (i = i.slice(), this._stoppedImmediatePropagation = !1, r = 0, n = i.length; r < n && (!this._stoppedImmediatePropagation && !e(i[r], r)); r++);
            },
            c = function(t, e, i) {
                var r = -1;
                l.call(this, e, function(t, e) {
                    if (t.callback === i) return r = e, !0
                }), r !== -1 && t[e].splice(r, 1)
            };
        s.on = function() {
            var t = o.call(this);
            return a.call(this, arguments, function(e, i, r) {
                t[e] = t[e] || (t[e] = []), t[e].push({
                    callback: i,
                    context: r
                })
            }), this
        }, s.once = function() {
            return a.call(this, arguments, function(t, e, i) {
                var r = function(n) {
                    e.call(i || this, n), this.off(t, r)
                };
                this.on(t, r, this)
            }), this
        }, s.off = function(t, e) {
            var i = o.call(this);
            if (0 === arguments.length) this._events = {};
            else if (!t || "string" != typeof t && "object" != typeof t || Array.isArray(t)) throw new TypeError("Expecting event name to be a string or object.");
            if ("object" == typeof t)
                for (var r in t) c.call(this, i, r, t[r]);
            if ("string" == typeof t) {
                var n = t.split(" ");
                1 === n.length ? e ? c.call(this, i, t, e) : i[t] = [] : n.forEach(function(t) {
                    i[t] = []
                })
            }
            return this
        }, s.trigger = function(t, e, i) {
            if (!t) throw new Error("trigger method requires an event name");
            if ("string" != typeof t) throw new TypeError("Expecting event names to be a string.");
            if (i && "boolean" != typeof i) throw new TypeError("Expecting doNotPropagate to be a boolean.");
            return t = t.split(" "), t.forEach(function(t) {
                l.call(this, t, function(t) {
                    t.callback.call(t.context || this.context || this, e)
                }.bind(this)), i || l.call(this, r, function(i) {
                    var r = t;
                    i.prefix && (r = i.prefix + r), i.emitter.trigger(r, e)
                })
            }, this), this
        }, s.propagateTo = function(t, e) {
            var i = o.call(this);
            i[r] || (this._events[r] = []), i[r].push({
                emitter: t,
                prefix: e
            })
        }, s.stopPropagatingTo = function(t) {
            var e = o.call(this);
            if (!t) return void(e[r] = []);
            var i, n = e[r],
                s = n.length;
            for (i = 0; i < s; i++)
                if (n[i].emitter === t) {
                    n.splice(i, 1);
                    break
                }
        }, s.stopImmediatePropagation = function() {
            this._stoppedImmediatePropagation = !0
        }, s.has = function(t, e, i) {
            var r = o.call(this),
                n = r[t];
            if (0 === arguments.length) return Object.keys(r);
            if (!n) return !1;
            if (!e) return n.length > 0;
            for (var s = 0, a = n.length; s < a; s++) {
                var l = n[s];
                if (i && e && l.context === i && l.callback === e) return !0;
                if (e && !i && l.callback === e) return !0
            }
            return !1
        }, e.exports = n
    }, {}],
    298: [function(t, e, i) {
        function r(t) {
            var e = new Float32Array(16);
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
        }
        e.exports = r
    }, {}],
    299: [function(t, e, i) {
        function r() {
            var t = new Float32Array(16);
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }
        e.exports = r
    }, {}],
    300: [function(t, e, i) {
        function r(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = r + r,
                l = n + n,
                c = s + s,
                u = r * a,
                h = r * l,
                m = r * c,
                d = n * l,
                p = n * c,
                f = s * c,
                _ = o * a,
                g = o * l,
                v = o * c;
            return t[0] = 1 - (d + f), t[1] = h + v, t[2] = m - g, t[3] = 0, t[4] = h - v, t[5] = 1 - (u + f), t[6] = p + _, t[7] = 0, t[8] = m + g, t[9] = p - _, t[10] = 1 - (u + d), t[11] = 0, t[12] = i[0], t[13] = i[1], t[14] = i[2], t[15] = 1, t
        }
        e.exports = r
    }, {}],
    301: [function(t, e, i) {
        function r(t) {
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }
        e.exports = r
    }, {}],
    302: [function(t, e, i) {
        function r(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2],
                s = e[3],
                o = e[4],
                a = e[5],
                l = e[6],
                c = e[7],
                u = e[8],
                h = e[9],
                m = e[10],
                d = e[11],
                p = e[12],
                f = e[13],
                _ = e[14],
                g = e[15],
                v = i * a - r * o,
                y = i * l - n * o,
                b = i * c - s * o,
                E = r * l - n * a,
                w = r * c - s * a,
                T = n * c - s * l,
                S = u * f - h * p,
                x = u * _ - m * p,
                C = u * g - d * p,
                A = h * _ - m * f,
                O = h * g - d * f,
                I = m * g - d * _,
                P = v * I - y * O + b * A + E * C - w * x + T * S;
            return P ? (P = 1 / P, t[0] = (a * I - l * O + c * A) * P, t[1] = (n * O - r * I - s * A) * P, t[2] = (f * T - _ * w + g * E) * P, t[3] = (m * w - h * T - d * E) * P, t[4] = (l * C - o * I - c * x) * P, t[5] = (i * I - n * C + s * x) * P, t[6] = (_ * b - p * T - g * y) * P, t[7] = (u * T - m * b + d * y) * P, t[8] = (o * O - a * C + c * S) * P, t[9] = (r * C - i * O - s * S) * P, t[10] = (p * w - f * b + g * v) * P, t[11] = (h * b - u * w - d * v) * P, t[12] = (a * x - o * A - l * S) * P, t[13] = (i * A - r * x + n * S) * P, t[14] = (f * y - p * E - _ * v) * P, t[15] = (u * E - h * y + m * v) * P, t) : null
        }
        e.exports = r
    }, {}],
    303: [function(t, e, i) {
        function r(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = e[4],
                l = e[5],
                c = e[6],
                u = e[7],
                h = e[8],
                m = e[9],
                d = e[10],
                p = e[11],
                f = e[12],
                _ = e[13],
                g = e[14],
                v = e[15],
                y = i[0],
                b = i[1],
                E = i[2],
                w = i[3];
            return t[0] = y * r + b * a + E * h + w * f, t[1] = y * n + b * l + E * m + w * _, t[2] = y * s + b * c + E * d + w * g, t[3] = y * o + b * u + E * p + w * v, y = i[4], b = i[5], E = i[6], w = i[7], t[4] = y * r + b * a + E * h + w * f, t[5] = y * n + b * l + E * m + w * _, t[6] = y * s + b * c + E * d + w * g, t[7] = y * o + b * u + E * p + w * v, y = i[8], b = i[9], E = i[10], w = i[11], t[8] = y * r + b * a + E * h + w * f, t[9] = y * n + b * l + E * m + w * _, t[10] = y * s + b * c + E * d + w * g, t[11] = y * o + b * u + E * p + w * v, y = i[12], b = i[13], E = i[14], w = i[15], t[12] = y * r + b * a + E * h + w * f, t[13] = y * n + b * l + E * m + w * _, t[14] = y * s + b * c + E * d + w * g, t[15] = y * o + b * u + E * p + w * v, t
        }
        e.exports = r
    }, {}],
    304: [function(t, e, i) {
        function r(t, e, i, r) {
            var n, s, o, a, l, c, u, h, m, d, p, f, _, g, v, y, b, E, w, T, S, x, C, A, O = r[0],
                I = r[1],
                P = r[2],
                k = Math.sqrt(O * O + I * I + P * P);
            return Math.abs(k) < 1e-6 ? null : (k = 1 / k, O *= k, I *= k, P *= k, n = Math.sin(i), s = Math.cos(i), o = 1 - s, a = e[0], l = e[1], c = e[2], u = e[3], h = e[4], m = e[5], d = e[6], p = e[7], f = e[8], _ = e[9], g = e[10], v = e[11], y = O * O * o + s, b = I * O * o + P * n, E = P * O * o - I * n, w = O * I * o - P * n, T = I * I * o + s, S = P * I * o + O * n, x = O * P * o + I * n, C = I * P * o - O * n, A = P * P * o + s, t[0] = a * y + h * b + f * E, t[1] = l * y + m * b + _ * E, t[2] = c * y + d * b + g * E, t[3] = u * y + p * b + v * E, t[4] = a * w + h * T + f * S, t[5] = l * w + m * T + _ * S, t[6] = c * w + d * T + g * S, t[7] = u * w + p * T + v * S, t[8] = a * x + h * C + f * A, t[9] = l * x + m * C + _ * A, t[10] = c * x + d * C + g * A, t[11] = u * x + p * C + v * A, e !== t && (t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t)
        }
        e.exports = r
    }, {}],
    305: [function(t, e, i) {
        function r(t, e, i) {
            var r = Math.sin(i),
                n = Math.cos(i),
                s = e[4],
                o = e[5],
                a = e[6],
                l = e[7],
                c = e[8],
                u = e[9],
                h = e[10],
                m = e[11];
            return e !== t && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[4] = s * n + c * r, t[5] = o * n + u * r, t[6] = a * n + h * r, t[7] = l * n + m * r, t[8] = c * n - s * r, t[9] = u * n - o * r, t[10] = h * n - a * r, t[11] = m * n - l * r, t
        }
        e.exports = r
    }, {}],
    306: [function(t, e, i) {
        function r(t, e, i) {
            var r = Math.sin(i),
                n = Math.cos(i),
                s = e[0],
                o = e[1],
                a = e[2],
                l = e[3],
                c = e[8],
                u = e[9],
                h = e[10],
                m = e[11];
            return e !== t && (t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[0] = s * n - c * r, t[1] = o * n - u * r, t[2] = a * n - h * r, t[3] = l * n - m * r, t[8] = s * r + c * n, t[9] = o * r + u * n, t[10] = a * r + h * n, t[11] = l * r + m * n, t
        }
        e.exports = r
    }, {}],
    307: [function(t, e, i) {
        function r(t, e, i) {
            var r = Math.sin(i),
                n = Math.cos(i),
                s = e[0],
                o = e[1],
                a = e[2],
                l = e[3],
                c = e[4],
                u = e[5],
                h = e[6],
                m = e[7];
            return e !== t && (t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[0] = s * n + c * r, t[1] = o * n + u * r, t[2] = a * n + h * r, t[3] = l * n + m * r, t[4] = c * n - s * r, t[5] = u * n - o * r, t[6] = h * n - a * r, t[7] = m * n - l * r, t
        }
        e.exports = r
    }, {}],
    308: [function(t, e, i) {
        function r(t, e, i) {
            var r = i[0],
                n = i[1],
                s = i[2];
            return t[0] = e[0] * r, t[1] = e[1] * r, t[2] = e[2] * r, t[3] = e[3] * r, t[4] = e[4] * n, t[5] = e[5] * n, t[6] = e[6] * n, t[7] = e[7] * n, t[8] = e[8] * s, t[9] = e[9] * s, t[10] = e[10] * s, t[11] = e[11] * s, t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
        }
        e.exports = r
    }, {}],
    309: [function(t, e, i) {
        function r(t, e, i) {
            var r, n, s, o, a, l, c, u, h, m, d, p, f = i[0],
                _ = i[1],
                g = i[2];
            return e === t ? (t[12] = e[0] * f + e[4] * _ + e[8] * g + e[12], t[13] = e[1] * f + e[5] * _ + e[9] * g + e[13], t[14] = e[2] * f + e[6] * _ + e[10] * g + e[14], t[15] = e[3] * f + e[7] * _ + e[11] * g + e[15]) : (r = e[0], n = e[1], s = e[2], o = e[3], a = e[4], l = e[5], c = e[6], u = e[7], h = e[8], m = e[9], d = e[10], p = e[11], t[0] = r, t[1] = n, t[2] = s, t[3] = o, t[4] = a, t[5] = l, t[6] = c, t[7] = u, t[8] = h, t[9] = m, t[10] = d, t[11] = p, t[12] = r * f + a * _ + h * g + e[12], t[13] = n * f + l * _ + m * g + e[13], t[14] = s * f + c * _ + d * g + e[14], t[15] = o * f + u * _ + p * g + e[15]), t
        }
        e.exports = r
    }, {}],
    310: [function(t, e, i) {
        function r(t, e) {
            if (t === e) {
                var i = e[1],
                    r = e[2],
                    n = e[3],
                    s = e[6],
                    o = e[7],
                    a = e[11];
                t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = i, t[6] = e[9], t[7] = e[13], t[8] = r, t[9] = s, t[11] = e[14], t[12] = n, t[13] = o, t[14] = a
            } else t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15];
            return t
        }
        e.exports = r
    }, {}],
    311: [function(t, e, i) {
        function r() {
            var t = new Float32Array(3);
            return t[0] = 0, t[1] = 0, t[2] = 0, t
        }
        e.exports = r
    }, {}],
    312: [function(t, e, i) {
        function r(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = i[0],
                a = i[1],
                l = i[2];
            return t[0] = n * l - s * a, t[1] = s * o - r * l, t[2] = r * a - n * o, t
        }
        e.exports = r
    }, {}],
    313: [function(t, e, i) {
        function r(t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
        }
        e.exports = r
    }, {}],
    314: [function(t, e, i) {
        function r(t, e, i) {
            var r = new Float32Array(3);
            return r[0] = t, r[1] = e, r[2] = i, r
        }
        e.exports = r
    }, {}],
    315: [function(t, e, i) {
        function r(t) {
            var e = t[0],
                i = t[1],
                r = t[2];
            return Math.sqrt(e * e + i * i + r * r)
        }
        e.exports = r
    }, {}],
    316: [function(t, e, i) {
        function r(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2],
                s = i * i + r * r + n * n;
            return s > 0 && (s = 1 / Math.sqrt(s), t[0] = e[0] * s, t[1] = e[1] * s, t[2] = e[2] * s), t
        }
        e.exports = r
    }, {}],
    317: [function(t, e, i) {
        function r() {
            var t = new Float32Array(4);
            return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t
        }
        e.exports = r
    }, {}],
    318: [function(t, e, i) {
        function r(t, e, i, r) {
            var n = new Float32Array(4);
            return n[0] = t, n[1] = e, n[2] = i, n[3] = r, n
        }
        e.exports = r
    }, {}],
    319: [function(t, e, i) {
        function r(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3];
            return t[0] = i[0] * r + i[4] * n + i[8] * s + i[12] * o, t[1] = i[1] * r + i[5] * n + i[9] * s + i[13] * o, t[2] = i[2] * r + i[6] * n + i[10] * s + i[14] * o, t[3] = i[3] * r + i[7] * n + i[11] * s + i[15] * o, t
        }
        e.exports = r
    }, {}],
    320: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            s = function() {
                function t(e) {
                    r(this, t), this.tryItFreeLink = e, this._updateTryItFreeLink()
                }
                return n(t, [{
                    key: "_updateTryItFreeLink",
                    value: function() {
                        this.tryItFreeLink.removeAttribute("data-analytics-click"), this.tryItFreeLink.removeAttribute("data-analytics-intrapage-link"), this.tryItFreeLink.setAttribute("data-rid-relay", '{"288":"itsct"}'), this.tryItFreeLink.setAttribute("data-analytics-exit-link", "")
                    }
                }]), t
            }();
        e.exports = s
    }, {}],
    321: [function(t, e, i) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function o(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            l = t("@marcom/bubble-gum/BaseComponent"),
            c = r(l),
            u = t("@marcom/ac-gallery").FadeGallery,
            h = function(t) {
                function e(t) {
                    n(this, e);
                    var i = s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
                    return i.galleryContainer = i.el.querySelector("[data-ac-gallery-fade]"), i.captionGalleryContainer = i.el.querySelector("[data-ac-gallery-captions]"), i.gallery = new u(i.galleryContainer, {
                        tabNavPaddles: !1,
                        deeplink: !1,
                        crossFade: !0,
                        enableArrowKeys: !0,
                        touch: !0
                    }), i.captionGallery = new u(i.captionGalleryContainer, {
                        resizeContainerOnUpdate: !0,
                        deeplink: !1,
                        crossFade: !0,
                        enableArrowKeys: !1
                    }), i._addCaptions(u), i
                }
                return o(e, t), a(e, [{
                    key: "_addCaptions",
                    value: function(t) {
                        var e = this;
                        this.gallery.on(u.UPDATE, function(t) {
                            var i = e.gallery.getItemIndex(t.incoming[0]);
                            e.captionGallery.show(i)
                        })
                    }
                }], [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        return !0
                    }
                }]), e
            }(c["default"]);
        e.exports = h
    }, {
        "@marcom/ac-gallery": 139,
        "@marcom/bubble-gum/BaseComponent": 283
    }],
    322: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            s = t("@marcom/ac-modal").createStandardModal,
            o = t("@marcom/ac-raf-emitter/update"),
            a = t("@marcom/ac-raf-emitter/draw"),
            l = "#notify-me",
            c = function() {
                function t(e, i) {
                    var n = this;
                    r(this, t), this.button = e, this.button.setAttribute("data-analytics-click", "prop3: try it free modal"), this._openModal = this._openModal.bind(this), o(function() {
                        var t = i.getAttribute("data-modal-close-label");
                        a(function() {
                            n.modal = s(i);
                            var e = n.element = n.modal.modalElement;
                            n.element.classList.add("modal-notify"), t && n.modal.closeButton.setAttribute("aria-label", t), n.element.setAttribute("aria-labelledby", "modal-notify-headline"), n.element.tabIndex = -1, n.modal._giveModalFocus = function() {
                                this.modalElement.removeAttribute("aria-hidden"), this._activeElement = document.activeElement, a(function() {
                                    return e.focus()
                                }), this._circularTab.start()
                            }, n._onDeepLinkLoad()
                        })
                    }), this._addLinkEvents()
                }
                return n(t, [{
                    key: "_onDeepLinkLoad",
                    value: function() {
                        var t = window.location.hash,
                            e = new RegExp(l, "i");
                        e.test(t) && this._openModal()
                    }
                }, {
                    key: "_addLinkEvents",
                    value: function() {
                        var t = this;
                        a(function() {
                            return t.button.setAttribute("role", "button")
                        }), this.button.addEventListener("click", this._openModal, !0)
                    }
                }, {
                    key: "_openModal",
                    value: function(t) {
                        var e = this;
                        t && t.preventDefault(), a(function() {
                            e.modal.open()
                        })
                    }
                }]), t
            }();
        e.exports = c
    }, {
        "@marcom/ac-modal": 164,
        "@marcom/ac-raf-emitter/draw": 197,
        "@marcom/ac-raf-emitter/update": 198
    }],
    323: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function n(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var o = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            a = t("@marcom/bubble-gum/BaseComponent"),
            l = t("@marcom/ac-raf-emitter/update"),
            c = t("@marcom/ac-raf-emitter/draw"),
            u = "downloadComplete",
            h = "downloadBegan",
            m = "data-progressive-image",
            d = function(t) {
                function e(t) {
                    r(this, e);
                    var i = n(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
                    return i.DATA_ATTRIBUTE = m, i.DATA_LOADED_ATTRIBUTE = "data-progressive-image-status", i.loadAndSetVisible = i.loadAndSetVisible.bind(i), i._didLoad = !1, i
                }
                return s(e, t), o(e, [{
                    key: "loadAndSetVisible",
                    value: function() {
                        var t = this;
                        if (!this._didLoad) return this.startTime = Date.now(), this.el.dispatchEvent(this._createNewEvent(e.LOAD_STARTED)), this.el.setAttribute(this.DATA_LOADED_ATTRIBUTE, "loading"), new Promise(function(i, r) {
                            t.setVisible().then(function() {
                                return t._getBackgroundImageSrc()
                            }).then(function(e) {
                                return t._loadImage(e)
                            }).then(function(r) {
                                c(function() {
                                    t.el.setAttribute(t.DATA_LOADED_ATTRIBUTE, e.LOAD_COMPLETE), t._didLoad = !0;
                                    var n = t._createNewEvent(e.LOAD_COMPLETE);
                                    n.finalTarget = t.el, n.proxyObject = r, n.loadTime = Date.now() - t.startTime, t.el.dispatchEvent(n), i()
                                }, !0)
                            })
                        })
                    }
                }, {
                    key: "_getBackgroundImageSrc",
                    value: function() {
                        var t = this;
                        return new Promise(function(e, i) {
                            l(function() {
                                var i = t.el.currentStyle;
                                return i || (i = window.getComputedStyle(t.el, !1)), 0 === i.backgroundImage.indexOf("url(") ? void e(i.backgroundImage.slice(4, -1).replace(/"/g, "")) : void e(null)
                            }, !0)
                        })
                    }
                }, {
                    key: "_loadImage",
                    value: function(t) {
                        return new Promise(this._loadImagePromiseFunc.bind(this, t))
                    }
                }, {
                    key: "_loadImagePromiseFunc",
                    value: function(t, e, i) {
                        function r() {
                            this.removeEventListener("load", r), e(this), e = null
                        }
                        if (!t) return void e(null);
                        var n = new Image;
                        n.addEventListener("load", r), n.src = t
                    }
                }, {
                    key: "_createNewEvent",
                    value: function(t) {
                        if ("function" == typeof Event) var e = new Event(t);
                        else {
                            var e = document.createEvent("Event");
                            e.initEvent(t, !0, !0)
                        }
                        return e
                    }
                }, {
                    key: "setVisible",
                    value: function() {
                        var t = this;
                        return new Promise(function(e, i) {
                            c(function() {
                                t.el.removeAttribute(t.DATA_ATTRIBUTE), e()
                            }, !0)
                        })
                    }
                }, {
                    key: "mounted",
                    value: function() {
                        var t = this;
                        if (!this._didLoad) {
                            this.addDiscreteEvent({
                                start: "0% - 200vh",
                                end: "100% + 100vh",
                                event: "ProgressiveImageLoad",
                                onEnter: function() {
                                    return t.loadAndSetVisible()
                                }
                            })
                        }
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function(t) {
                        this._didLoad = !1
                    }
                }]), e
            }(a);
        d.LOAD_COMPLETE = u, d.LOAD_STARTED = h, d.DATA_ATTRIBUTE = m, e.exports = d
    }, {
        "@marcom/ac-raf-emitter/draw": 197,
        "@marcom/ac-raf-emitter/update": 198,
        "@marcom/bubble-gum/BaseComponent": 283
    }],
    324: [function(t, e, i) {
        "use strict";
        var r = t("./shared/ChapterNavController"),
            n = t("@marcom/bubble-gum"),
            s = t("@marcom/bubble-gum/ComponentMap"),
            o = t("./model/SiteComponentMap"),
            a = t("@marcom/ac-modal").createStandardModal,
            l = t("@marcom/data-relay"),
            c = t("@marcom/ac-useragent"),
            u = t("@marcom/feature-detect/touchAvailable"),
            h = t("./components/ArcadeLink"),
            m = t("./components/NotifyModal"),
            d = function() {
                return {
                    initialize: function() {
                        this.chapterNav = new r, Object.assign(s, o);
                        var t = document.querySelector(".main");
                        new n(t);
                        var e = document.querySelector('[data-link-type="free-trial"]');
                        return e && this.initializeFreeTrialLink(e), d.setupDataRelay(), d.setupArcadeLink(), this
                    },
                    initializeFreeTrialLink: function(t) {
                        var e = document.getElementById("trial-modal"),
                            i = e.content.querySelector("[data-modal-content]");
                        t.addEventListener("click", function(e) {
                            e.preventDefault();
                            var r = document.documentElement.classList.contains("trial-support");
                            if (r) {
                                var n = t.getAttribute("data-trial-url");
                                window.location.href = n
                            } else {
                                var s = a(i);
                                s.open()
                            }
                        })
                    },
                    setupArcadeLink: function() {
                        var t = document.querySelector("#arcade-try-it-free"),
                            e = document.querySelector("[data-notify-modal]"),
                            i = c.os.version.major,
                            r = c.os.version.minor,
                            n = c.os.ios && i >= 13,
                            s = c.os.osx && i >= 10 && r >= 15 && u(),
                            o = c.os.osx && i >= 10 && r >= 15;
                        n || s || o ? new h(t) : new m(t, e)
                    },
                    setupDataRelay: function() {
                        if (l) {
                            var t = {
                                    properties: {
                                        customAnalyticsAttribute: "data-analytics-exit-link"
                                    }
                                },
                                e = new l(t);
                            e && e.passiveTrackingOptions && (e.passiveTrackingOptions.overwriteAppMeasurementValues = !0)
                        }
                    }
                }
            }();
        e.exports = d.initialize()
    }, {
        "./components/ArcadeLink": 320,
        "./components/NotifyModal": 322,
        "./model/SiteComponentMap": 325,
        "./shared/ChapterNavController": 326,
        "@marcom/ac-modal": 164,
        "@marcom/ac-useragent": 216,
        "@marcom/bubble-gum": 284,
        "@marcom/bubble-gum/ComponentMap": 285,
        "@marcom/data-relay": void 0,
        "@marcom/feature-detect/touchAvailable": 289
    }],
    325: [function(t, e, i) {
        "use strict";
        e.exports = {
            GalleryComponent: t("../components/GalleryComponent"),
            ProgressiveImageLoader: t("../components/ProgressiveImageLoader")
        }
    }, {
        "../components/GalleryComponent": 321,
        "../components/ProgressiveImageLoader": 323
    }],
    326: [function(t, e, i) {
        "use strict";

        function r() {
            this.init()
        }
        var n = t("@marcom/ac-chapternav/ChapterNav"),
            s = t("@marcom/ac-window-delegate").WindowDelegate,
            o = r.prototype;
        o.init = function() {
            this.chapterNavEl = document.getElementById("chapternav"), this.htmlEl = document.querySelector("html"), this.lastChapterNavItem = document.querySelector(".chapternav-item:last-of-type"), this.chapterNavLeftPaddle = document.querySelector(".chapternav-paddle-left"), this.chapterNavRightPaddle = document.querySelector(".chapternav-paddle-right"), this.isDesktopLarge = s.clientWidth() >= 949 && s.clientWidth() <= 1441 && this.htmlEl.classList.contains("fluid-support"), this.isRTL = this.htmlEl.hasAttribute("dir") && "rtl" === this.htmlEl.getAttribute("dir"), this.chapterNav = new n(this.chapterNavEl, {}), this.boundOnAnimationStart = this._onAnimationStart.bind(this), this.prefixedEventListener(this.lastChapterNavItem, "AnimationEnd", this.boundOnAnimationStart)
        }, o.prefixedEventListener = function(t, e, i) {
            var r, n = ["webkit", "moz", "MS", "o", ""];
            for (r = 0; r < n.length; r++) n[r] || (e = e.toLowerCase()), t.addEventListener(n[r] + e, i, !1)
        }, o._onAnimationStart = function() {
            this.isDesktopLarge && this.isRTL ? this.chapterNavLeftPaddle.disabled = !0 : this.isDesktopLarge && !this.isRTL && (this.chapterNavRightPaddle.disabled = !0)
        }, e.exports = r
    }, {
        "@marcom/ac-chapternav/ChapterNav": 12,
        "@marcom/ac-window-delegate": 220
    }]
}, {}, [324]);