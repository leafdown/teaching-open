!(function (a, b, c, d) {
    'use strict'

    function e(a) {
        return (typeof a === 'string' || a instanceof String) && (a = a.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '')), a
    }
    var f = function (b) {
        for (var c = b.length, d = a('head'); c--;) {
            d.has('.' + b[c])
                .length === 0 && d.append('<meta class="' + b[c] + '" />')
        }
    }
    f(['foundation-mq-small', 'foundation-mq-small-only', 'foundation-mq-medium', 'foundation-mq-medium-only', 'foundation-mq-large', 'foundation-mq-large-only', 'foundation-mq-xlarge', 'foundation-mq-xlarge-only', 'foundation-mq-xxlarge', 'foundation-data-attribute-namespace']), a(function () {
        typeof FastClick !== 'undefined' && typeof c.body !== 'undefined' && FastClick.attach(c.body)
    })
    var g = function (b, d) {
        if (typeof b === 'string') {
            if (d) {
                var e
                if (d.jquery) {
                    if (e = d[0], !e) return d
                } else e = d
                return a(e.querySelectorAll(b))
            }
            return a(c.querySelectorAll(b))
        }
        return a(b, d)
    }
    var h = function (a) {
        var b = []
        return a || b.push('data'), this.namespace.length > 0 && b.push(this.namespace), b.push(this.name), b.join('-')
    }
    var i = function (a) {
        for (var b = a.split('-'), c = b.length, d = []; c--;) c !== 0 ? d.push(b[c]) : this.namespace.length > 0 ? d.push(this.namespace, b[c]) : d.push(b[c])
        return d.reverse()
            .join('-')
    }
    var j = function (b, c) {
        var d = this
        var e = !g(this)
            .data(this.attr_name(!0))
        return g(this.scope)
            .is('[' + this.attr_name() + ']') ? (g(this.scope)
                .data(this.attr_name(!0) + '-init', a.extend({}, this.settings, c || b, this.data_options(g(this.scope)))), e && this.events(this.scope)) : g('[' + this.attr_name() + ']', this.scope)
                    .each(function () {
                        var e = !g(this)
                            .data(d.attr_name(!0) + '-init')
                        g(this)
                            .data(d.attr_name(!0) + '-init', a.extend({}, d.settings, c || b, d.data_options(g(this)))), e && d.events(this)
                    }), typeof b === 'string' ? this[b].call(this, c) : void 0
    }
    var k = function (a, b) {
        function c() {
            b(a[0])
        }

        function d() {
            if (this.one('load', c), /MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                var a = this.attr('src')
                var b = a.match(/\?/) ? '&' : '?'
                b += 'random=' + (new Date())
                    .getTime(), this.attr('src', a + b)
            }
        }
        return a.attr('src') ? void (a[0].complete || a[0].readyState === 4 ? c() : d.call(a)) : void c()
    }
    b.matchMedia = b.matchMedia || (function (a) {
        var b; var c = a.documentElement
        var d = c.firstElementChild || c.firstChild
        var e = a.createElement('body')
        var f = a.createElement('div')
        return f.id = 'mq-test-1', f.style.cssText = 'position:absolute;top:-100em', e.style.background = 'none', e.appendChild(f),
            function (a) {
                return f.innerHTML = '&shy;<style media="' + a + '"> #mq-test-1 { width: 42px; }</style>', c.insertBefore(e, d), b = f.offsetWidth === 42, c.removeChild(e), {
                    matches: b,
                    media: a
                }
            }
    }(c)),
        (function (a) {
            function c() {
                d && (g(c), i && jQuery.fx.tick())
            }
            for (var d, e = 0, f = ['webkit', 'moz'], g = b.requestAnimationFrame, h = b.cancelAnimationFrame, i = typeof jQuery.fx !== 'undefined'; e < f.length && !g; e++) g = b[f[e] + 'RequestAnimationFrame'], h = h || b[f[e] + 'CancelAnimationFrame'] || b[f[e] + 'CancelRequestAnimationFrame']
            g ? (b.requestAnimationFrame = g, b.cancelAnimationFrame = h, i && (jQuery.fx.timer = function (a) {
                a() && jQuery.timers.push(a) && !d && (d = !0, c())
            }, jQuery.fx.stop = function () {
                d = !1
            })) : (b.requestAnimationFrame = function (a) {
                var c = (new Date())
                    .getTime()
                var d = Math.max(0, 16 - (c - e))
                var f = b.setTimeout(function () {
                    a(c + d)
                }, d)
                return e = c + d, f
            }, b.cancelAnimationFrame = function (a) {
                clearTimeout(a)
            })
        }(jQuery)), b.Foundation = {
            name: 'Foundation',
            version: '5.5.0',
            media_queries: {
                small: g('.foundation-mq-small')
                    .css('font-family')
                    .replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
                'small-only': g('.foundation-mq-small-only')
                    .css('font-family')
                    .replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
                medium: g('.foundation-mq-medium')
                    .css('font-family')
                    .replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
                'medium-only': g('.foundation-mq-medium-only')
                    .css('font-family')
                    .replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
                large: g('.foundation-mq-large')
                    .css('font-family')
                    .replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
                'large-only': g('.foundation-mq-large-only')
                    .css('font-family')
                    .replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
                xlarge: g('.foundation-mq-xlarge')
                    .css('font-family')
                    .replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
                'xlarge-only': g('.foundation-mq-xlarge-only')
                    .css('font-family')
                    .replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
                xxlarge: g('.foundation-mq-xxlarge')
                    .css('font-family')
                    .replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '')
            },
            stylesheet: a('<style></style>')
                .appendTo('head')[0].sheet,
            global: {
                namespace: d
            },
            init: function (a, c, d, e, f) {
                var h = [a, d, e, f]
                var i = []
                if (this.rtl = /rtl/i.test(g('html')
                    .attr('dir')), this.scope = a || this.scope, this.set_namespace(), c && typeof c === 'string' && !/reflow/i.test(c)) this.libs.hasOwnProperty(c) && i.push(this.init_lib(c, h))
                else { for (var j in this.libs) i.push(this.init_lib(j, c)) }
                return g(b)
                    .load(function () {
                        g(b)
                            .trigger('resize.fndtn.clearing')
                            .trigger('resize.fndtn.dropdown')
                            .trigger('resize.fndtn.equalizer')
                            .trigger('resize.fndtn.interchange')
                            .trigger('resize.fndtn.joyride')
                            .trigger('resize.fndtn.magellan')
                            .trigger('resize.fndtn.topbar')
                            .trigger('resize.fndtn.slider')
                    }), a
            },
            init_lib: function (b, c) {
                return this.libs.hasOwnProperty(b) ? (this.patch(this.libs[b]), c && c.hasOwnProperty(b) ? (typeof this.libs[b].settings !== 'undefined' ? a.extend(!0, this.libs[b].settings, c[b]) : typeof this.libs[b].defaults !== 'undefined' && a.extend(!0, this.libs[b].defaults, c[b]), this.libs[b].init.apply(this.libs[b], [this.scope, c[b]])) : (c = c instanceof Array ? c : new Array(c), this.libs[b].init.apply(this.libs[b], c))) : function () { }
            },
            patch: function (a) {
                a.scope = this.scope, a.namespace = this.global.namespace, a.rtl = this.rtl, a.data_options = this.utils.data_options, a.attr_name = h, a.add_namespace = i, a.bindings = j, a.S = this.utils.S
            },
            inherit: function (a, b) {
                for (var c = b.split(' '), d = c.length; d--;) this.utils.hasOwnProperty(c[d]) && (a[c[d]] = this.utils[c[d]])
            },
            set_namespace: function () {
                var b = this.global.namespace === d ? a('.foundation-data-attribute-namespace')
                    .css('font-family') : this.global.namespace
                this.global.namespace = b === d || /false/i.test(b) ? '' : b
            },
            libs: {},
            utils: {
                S: g,
                throttle: function (a, b) {
                    var c = null
                    return function () {
                        var d = this
                        var e = arguments
                        c == null && (c = setTimeout(function () {
                            a.apply(d, e), c = null
                        }, b))
                    }
                },
                debounce: function (a, b, c) {
                    var d, e
                    return function () {
                        var f = this
                        var g = arguments
                        var h = function () {
                            d = null, c || (e = a.apply(f, g))
                        }
                        var i = c && !d
                        return clearTimeout(d), d = setTimeout(h, b), i && (e = a.apply(f, g)), e
                    }
                },
                data_options: function (b, c) {
                    function d(a) {
                        return !isNaN(a - 0) && a !== null && a !== '' && a !== !1 && a !== !0
                    }

                    function e(b) {
                        return typeof b === 'string' ? a.trim(b) : b
                    }
                    c = c || 'options'
                    var f; var g; var h; var i = {}
                    var j = function (a) {
                        var b = Foundation.global.namespace
                        return b.length > 0 ? a.data(b + '-' + c) : a.data(c)
                    }
                    var k = j(b)
                    if (typeof k === 'object') return k
                    for (h = (k || ':')
                        .split(';'), f = h.length; f--;) {
                        g = h[f].split(':'), g = [g[0], g.slice(1)
                            .join(':')
                        ], /true/i.test(g[1]) && (g[1] = !0), /false/i.test(g[1]) && (g[1] = !1), d(g[1]) && (g[1].indexOf('.') === -1 ? g[1] = parseInt(g[1], 10) : g[1] = parseFloat(g[1])), g.length === 2 && g[0].length > 0 && (i[e(g[0])] = e(g[1]))
                    }
                    return i
                },
                register_media: function (b, c) {
                    Foundation.media_queries[b] === d && (a('head')
                        .append('<meta class="' + c + '"/>'), Foundation.media_queries[b] = e(a('.' + c)
                            .css('font-family')))
                },
                add_custom_rule: function (a, b) {
                    if (b === d && Foundation.stylesheet) Foundation.stylesheet.insertRule(a, Foundation.stylesheet.cssRules.length)
                    else {
                        var c = Foundation.media_queries[b]
                        c !== d && Foundation.stylesheet.insertRule('@media ' + Foundation.media_queries[b] + '{ ' + a + ' }')
                    }
                },
                image_loaded: function (a, b) {
                    var c = this
                    var d = a.length
                    d === 0 && b(a), a.each(function () {
                        k(c.S(this), function () {
                            d -= 1, d === 0 && b(a)
                        })
                    })
                },
                random_str: function () {
                    return this.fidx || (this.fidx = 0), this.prefix = this.prefix || [this.name || 'F', (+new Date())
                        .toString(36)
                    ].join('-'), this.prefix + (this.fidx++)
                        .toString(36)
                },
                match: function (a) {
                    return b.matchMedia(a)
                        .matches
                },
                is_small_up: function () {
                    return this.match(Foundation.media_queries.small)
                },
                is_medium_up: function () {
                    return this.match(Foundation.media_queries.medium)
                },
                is_large_up: function () {
                    return this.match(Foundation.media_queries.large)
                },
                is_xlarge_up: function () {
                    return this.match(Foundation.media_queries.xlarge)
                },
                is_xxlarge_up: function () {
                    return this.match(Foundation.media_queries.xxlarge)
                },
                is_small_only: function () {
                    return !(this.is_medium_up() || this.is_large_up() || this.is_xlarge_up() || this.is_xxlarge_up())
                },
                is_medium_only: function () {
                    return this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up()
                },
                is_large_only: function () {
                    return this.is_medium_up() && this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up()
                },
                is_xlarge_only: function () {
                    return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && !this.is_xxlarge_up()
                },
                is_xxlarge_only: function () {
                    return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && this.is_xxlarge_up()
                }
            }
        }, a.fn.foundation = function () {
            var a = Array.prototype.slice.call(arguments, 0)
            return this.each(function () {
                return Foundation.init.apply(Foundation, [this].concat(a)), this
            })
        }
}(jQuery, window, window.document)),
    (function (a, b, c, d) {
        'use strict'
        Foundation.libs.accordion = {
            name: 'accordion',
            version: '5.5.0',
            settings: {
                content_class: 'content',
                active_class: 'active',
                multi_expand: !1,
                toggleable: !0,
                callback: function () { }
            },
            init: function (a, b, c) {
                this.bindings(b, c)
            },
            events: function () {
                var b = this
                var c = this.S
                c(this.scope)
                    .off('.fndtn.accordion')
                    .on('click.fndtn.accordion', '[' + this.attr_name() + '] > .accordion-navigation > a', function (d) {
                        var e = c(this)
                            .closest('[' + b.attr_name() + ']')
                        var f = b.attr_name() + '=' + e.attr(b.attr_name())
                        var g = e.data(b.attr_name(!0) + '-init') || b.settings
                        var h = c('#' + this.href.split('#')[1])
                        var i = a('> .accordion-navigation', e)
                        var j = i.children('.' + g.content_class)
                        var k = j.filter('.' + g.active_class)
                        return d.preventDefault(), e.attr(b.attr_name()) && (j = j.add('[' + f + '] dd > .' + g.content_class), i = i.add('[' + f + '] .accordion-navigation')), g.toggleable && h.is(k) ? (h.parent('.accordion-navigation')
                            .toggleClass(g.active_class, !1), h.toggleClass(g.active_class, !1), g.callback(h), h.triggerHandler('toggled', [e]), void e.triggerHandler('toggled', [h])) : (g.multi_expand || (j.removeClass(g.active_class), i.removeClass(g.active_class)), h.addClass(g.active_class)
                                .parent()
                                .addClass(g.active_class), g.callback(h), h.triggerHandler('toggled', [e]), void e.triggerHandler('toggled', [h]))
                    })
            },
            off: function () { },
            reflow: function () { }
        }
    }(jQuery, window, window.document)),
    (function (a, b, c, d) {
        'use strict'
        Foundation.libs.alert = {
            name: 'alert',
            version: '5.5.0',
            settings: {
                callback: function () { }
            },
            init: function (a, b, c) {
                this.bindings(b, c)
            },
            events: function () {
                var b = this
                var c = this.S
                a(this.scope)
                    .off('.alert')
                    .on('click.fndtn.alert', '[' + this.attr_name() + '] .close', function (a) {
                        var d = c(this)
                            .closest('[' + b.attr_name() + ']')
                        var e = d.data(b.attr_name(!0) + '-init') || b.settings
                        a.preventDefault(), Modernizr.csstransitions ? (d.addClass('alert-close'), d.on('transitionend webkitTransitionEnd oTransitionEnd', function (a) {
                            c(this)
                                .trigger('close')
                                .trigger('close.fndtn.alert')
                                .remove(), e.callback()
                        })) : d.fadeOut(300, function () {
                            c(this)
                                .trigger('close')
                                .trigger('close.fndtn.alert')
                                .remove(), e.callback()
                        })
                    })
            },
            reflow: function () { }
        }
    }(jQuery, window, window.document)),
    (function (a, b, c, d) {
        'use strict'
        Foundation.libs.dropdown = {
            name: 'dropdown',
            version: '5.5.0',
            settings: {
                active_class: 'open',
                disabled_class: 'disabled',
                mega_class: 'mega',
                align: 'bottom',
                is_hover: !1,
                hover_timeout: 150,
                opened: function () { },
                closed: function () { }
            },
            init: function (b, c, d) {
                Foundation.inherit(this, 'throttle'), a.extend(!0, this.settings, c, d), this.bindings(c, d)
            },
            events: function (c) {
                var d = this
                var e = d.S
                e(this.scope)
                    .off('.dropdown')
                    .on('click.fndtn.dropdown', '[' + this.attr_name() + ']', function (b) {
                        var c = e(this)
                            .data(d.attr_name(!0) + '-init') || d.settings;
                        (!c.is_hover || Modernizr.touch) && (b.preventDefault(), e(this)
                            .parent('[data-reveal-id]') && b.stopPropagation(), d.toggle(a(this)))
                    })
                    .on('mouseenter.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (a) {
                        var b; var c; var f = e(this)
                        clearTimeout(d.timeout), f.data(d.data_attr()) ? (b = e('#' + f.data(d.data_attr())), c = f) : (b = f, c = e('[' + d.attr_name() + '="' + b.attr('id') + '"]'))
                        var g = c.data(d.attr_name(!0) + '-init') || d.settings
                        e(a.currentTarget)
                            .data(d.data_attr()) && g.is_hover && d.closeall.call(d), g.is_hover && d.open.apply(d, [b, c])
                    })
                    .on('mouseleave.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (a) {
                        var b; var c = e(this)
                        if (c.data(d.data_attr())) b = c.data(d.data_attr(!0) + '-init') || d.settings
                        else {
                            var f = e('[' + d.attr_name() + '="' + e(this)
                                .attr('id') + '"]')
                            var b = f.data(d.attr_name(!0) + '-init') || d.settings
                        }
                        d.timeout = setTimeout(function () {
                            c.data(d.data_attr()) ? b.is_hover && d.close.call(d, e('#' + c.data(d.data_attr()))) : b.is_hover && d.close.call(d, c)
                        }, b.hover_timeout)
                    })
                    .on('click.fndtn.dropdown', function (b) {
                        var c = e(b.target)
                            .closest('[' + d.attr_name() + '-content]')
                        var f = c.find('a')
                        return f.length > 0 && c.attr('aria-autoclose') !== 'false' && d.close.call(d, e('[' + d.attr_name() + '-content]')), e(b.target)
                            .closest('[' + d.attr_name() + ']')
                            .length > 0 ? void 0 : !e(b.target)
                                .data('revealId') && c.length > 0 && (e(b.target)
                                    .is('[' + d.attr_name() + '-content]') || a.contains(c.first()[0], b.target)) ? void b.stopPropagation() : void d.close.call(d, e('[' + d.attr_name() + '-content]'))
                    })
                    .on('opened.fndtn.dropdown', '[' + d.attr_name() + '-content]', function () {
                        d.settings.opened.call(this)
                    })
                    .on('closed.fndtn.dropdown', '[' + d.attr_name() + '-content]', function () {
                        d.settings.closed.call(this)
                    }), e(b)
                        .off('.dropdown')
                        .on('resize.fndtn.dropdown', d.throttle(function () {
                            d.resize.call(d)
                        }, 50)), this.resize()
            },
            close: function (b) {
                var c = this
                b.each(function () {
                    var d = a('[' + c.attr_name() + '=' + b[0].id + ']') || a('aria-controls=' + b[0].id + ']')
                    d.attr('aria-expanded', 'false'), c.S(this)
                        .hasClass(c.settings.active_class) && (c.S(this)
                            .css(Foundation.rtl ? 'right' : 'left', '-99999px')
                            .attr('aria-hidden', 'true')
                            .removeClass(c.settings.active_class)
                            .prev('[' + c.attr_name() + ']')
                            .removeClass(c.settings.active_class)
                            .removeData('target'), c.S(this)
                                .trigger('closed')
                                .trigger('closed.fndtn.dropdown', [b]))
                }), b.removeClass('f-open-' + this.attr_name(!0))
            },
            closeall: function () {
                var b = this
                a.each(b.S('.f-open-' + this.attr_name(!0)), function () {
                    b.close.call(b, b.S(this))
                })
            },
            open: function (a, b) {
                this.css(a.addClass(this.settings.active_class), b), a.prev('[' + this.attr_name() + ']')
                    .addClass(this.settings.active_class), a.data('target', b.get(0))
                        .trigger('opened')
                        .trigger('opened.fndtn.dropdown', [a, b]), a.attr('aria-hidden', 'false'), b.attr('aria-expanded', 'true'), a.focus(), a.addClass('f-open-' + this.attr_name(!0))
            },
            data_attr: function () {
                return this.namespace.length > 0 ? this.namespace + '-' + this.name : this.name
            },
            toggle: function (a) {
                if (!a.hasClass(this.settings.disabled_class)) {
                    var b = this.S('#' + a.data(this.data_attr()))
                    b.length !== 0 && (this.close.call(this, this.S('[' + this.attr_name() + '-content]')
                        .not(b)), b.hasClass(this.settings.active_class) ? (this.close.call(this, b), b.data('target') !== a.get(0) && this.open.call(this, b, a)) : this.open.call(this, b, a))
                }
            },
            resize: function () {
                var a = this.S('[' + this.attr_name() + '-content].open')
                var b = this.S('[' + this.attr_name() + '="' + a.attr('id') + '"]')
                a.length && b.length && this.css(a, b)
            },
            css: function (a, b) {
                var c = Math.max((b.width() - a.width()) / 2, 8)
                var d = b.data(this.attr_name(!0) + '-init') || this.settings
                if (this.clear_idx(), this.small()) {
                    var e = this.dirs.bottom.call(a, b, d)
                    a.attr('style', '')
                        .removeClass('drop-left drop-right drop-top')
                        .css({
                            position: 'absolute',
                            width: '95%',
                            'max-width': 'none',
                            top: e.top
                        }), a.css(Foundation.rtl ? 'right' : 'left', c)
                } else this.style(a, b, d)
                return a
            },
            style: function (b, c, d) {
                var e = a.extend({
                    position: 'absolute'
                }, this.dirs[d.align].call(b, c, d))
                b.attr('style', '')
                    .css(e)
            },
            dirs: {
                _base: function (a) {
                    var d = this.offsetParent()
                    var e = d.offset()
                    var f = a.offset()
                    f.top -= e.top, f.left -= e.left, f.missRight = !1, f.missTop = !1, f.missLeft = !1, f.leftRightFlag = !1
                    var g
                    g = c.getElementsByClassName('row')[0] ? c.getElementsByClassName('row')[0].clientWidth : b.outerWidth
                    var h = (b.outerWidth - g) / 2
                    var i = g
                    return this.hasClass('mega') || (a.offset()
                        .top <= this.outerHeight() && (f.missTop = !0, i = b.outerWidth - h, f.leftRightFlag = !0), a.offset()
                            .left + this.outerWidth() > a.offset()
                                .left + h && a.offset()
                                    .left - h > this.outerWidth() && (f.missRight = !0, f.missLeft = !1), a.offset()
                                        .left - this.outerWidth() <= 0 && (f.missLeft = !0, f.missRight = !1)), f
                },
                top: function (a, b) {
                    var c = Foundation.libs.dropdown
                    var d = c.dirs._base.call(this, a)
                    return this.addClass('drop-top'), d.missTop == 1 && (d.top = d.top + a.outerHeight() + this.outerHeight(), this.removeClass('drop-top')), d.missRight == 1 && (d.left = d.left - this.outerWidth() + a.outerWidth()), (a.outerWidth() < this.outerWidth() || c.small() || this.hasClass(b.mega_menu)) && c.adjust_pip(this, a, b, d), Foundation.rtl ? {
                        left: d.left - this.outerWidth() + a.outerWidth(),
                        top: d.top - this.outerHeight()
                    } : {
                        left: d.left,
                        top: d.top - this.outerHeight()
                    }
                },
                bottom: function (a, b) {
                    var c = Foundation.libs.dropdown
                    var d = c.dirs._base.call(this, a)
                    return d.missRight == 1 && (d.left = d.left - this.outerWidth() + a.outerWidth()), (a.outerWidth() < this.outerWidth() || c.small() || this.hasClass(b.mega_menu)) && c.adjust_pip(this, a, b, d), c.rtl ? {
                        left: d.left - this.outerWidth() + a.outerWidth(),
                        top: d.top + a.outerHeight()
                    } : {
                        left: d.left,
                        top: d.top + a.outerHeight()
                    }
                },
                left: function (a, b) {
                    var c = Foundation.libs.dropdown.dirs._base.call(this, a)
                    return this.addClass('drop-left'), c.missLeft == 1 && (c.left = c.left + this.outerWidth(), c.top = c.top + a.outerHeight(), this.removeClass('drop-left')), {
                        left: c.left - this.outerWidth(),
                        top: c.top
                    }
                },
                right: function (a, b) {
                    var c = Foundation.libs.dropdown.dirs._base.call(this, a)
                    this.addClass('drop-right'), c.missRight == 1 ? (c.left = c.left - this.outerWidth(), c.top = c.top + a.outerHeight(), this.removeClass('drop-right')) : c.triggeredRight = !0
                    var d = Foundation.libs.dropdown
                    return (a.outerWidth() < this.outerWidth() || d.small() || this.hasClass(b.mega_menu)) && d.adjust_pip(this, a, b, c), {
                        left: c.left + a.outerWidth(),
                        top: c.top
                    }
                }
            },
            adjust_pip: function (a, b, c, d) {
                var e = Foundation.stylesheet
                var f = 8
                a.hasClass(c.mega_class) ? f = d.left + b.outerWidth() / 2 - 8 : this.small() && (f += d.left - 8), this.rule_idx = e.cssRules.length
                var g = '.f-dropdown.open:before'
                var h = '.f-dropdown.open:after'
                var i = 'left: ' + f + 'px;'
                var j = 'left: ' + (f - 1) + 'px;'
                d.missRight == 1 && (f = a.outerWidth() - 23, g = '.f-dropdown.open:before', h = '.f-dropdown.open:after', i = 'left: ' + f + 'px;', j = 'left: ' + (f - 1) + 'px;'), d.triggeredRight == 1 && (g = '.f-dropdown.open:before', h = '.f-dropdown.open:after', i = 'left:-12px;', j = 'left:-14px;'), e.insertRule ? (e.insertRule([g, '{', i, '}'].join(' '), this.rule_idx), e.insertRule([h, '{', j, '}'].join(' '), this.rule_idx + 1)) : (e.addRule(g, i, this.rule_idx), e.addRule(h, j, this.rule_idx + 1))
            },
            clear_idx: function () {
                var a = Foundation.stylesheet
                typeof this.rule_idx !== 'undefined' && (a.deleteRule(this.rule_idx), a.deleteRule(this.rule_idx), delete this.rule_idx)
            },
            small: function () {
                return matchMedia(Foundation.media_queries.small)
                    .matches && !matchMedia(Foundation.media_queries.medium)
                        .matches
            },
            off: function () {
                this.S(this.scope)
                    .off('.fndtn.dropdown'), this.S('html, body')
                        .off('.fndtn.dropdown'), this.S(b)
                            .off('.fndtn.dropdown'), this.S('[data-dropdown-content]')
                                .off('.fndtn.dropdown')
            },
            reflow: function () { }
        }
    }(jQuery, window, window.document)),
    (function (a, b, c, d) {
        'use strict'
        Foundation.libs.offcanvas = {
            name: 'offcanvas',
            version: '5.5.0',
            settings: {
                open_method: 'move',
                close_on_click: !1
            },
            init: function (a, b, c) {
                this.bindings(b, c)
            },
            events: function () {
                var b = this
                var c = b.S
                var d = ''
                var e = ''
                var f = ''
                this.settings.open_method === 'move' ? (d = 'move-', e = 'right', f = 'left') : this.settings.open_method === 'overlap_single' ? (d = 'offcanvas-overlap-', e = 'right', f = 'left') : this.settings.open_method === 'overlap' && (d = 'offcanvas-overlap'), c(this.scope)
                    .off('.offcanvas')
                    .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (f) {
                        b.click_toggle_class(f, d + e), b.settings.open_method !== 'overlap' && c('.left-submenu')
                            .removeClass(d + e), a('.left-off-canvas-toggle')
                                .attr('aria-expanded', 'true')
                    })
                    .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (f) {
                        var g = b.get_settings(f)
                        var h = c(this)
                            .parent()
                        !g.close_on_click || h.hasClass('has-submenu') || h.hasClass('back') ? c(this)
                            .parent()
                            .hasClass('has-submenu') ? (f.preventDefault(), c(this)
                                .siblings('.left-submenu')
                                .toggleClass(d + e)) : h.hasClass('back') && (f.preventDefault(), h.parent()
                                    .removeClass(d + e)) : (b.hide.call(b, d + e, b.get_wrapper(f)), h.parent()
                                        .removeClass(d + e)), a('.left-off-canvas-toggle')
                                            .attr('aria-expanded', 'true')
                    })
                    .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
                        b.click_toggle_class(e, d + f), b.settings.open_method !== 'overlap' && c('.right-submenu')
                            .removeClass(d + f), a('.right-off-canvas-toggle')
                                .attr('aria-expanded', 'true')
                    })
                    .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
                        var g = b.get_settings(e)
                        var h = c(this)
                            .parent()
                        !g.close_on_click || h.hasClass('has-submenu') || h.hasClass('back') ? c(this)
                            .parent()
                            .hasClass('has-submenu') ? (e.preventDefault(), c(this)
                                .siblings('.right-submenu')
                                .toggleClass(d + f)) : h.hasClass('back') && (e.preventDefault(), h.parent()
                                    .removeClass(d + f)) : (b.hide.call(b, d + f, b.get_wrapper(e)), h.parent()
                                        .removeClass(d + f)), a('.right-off-canvas-toggle')
                                            .attr('aria-expanded', 'true')
                    })
                    .on('click.fndtn.offcanvas', '.exit-off-canvas', function (g) {
                        b.click_remove_class(g, d + f), c('.right-submenu')
                            .removeClass(d + f), e && (b.click_remove_class(g, d + e), c('.left-submenu')
                                .removeClass(d + f)), a('.right-off-canvas-toggle')
                                    .attr('aria-expanded', 'true')
                    })
                    .on('click.fndtn.offcanvas', '.exit-off-canvas', function (c) {
                        b.click_remove_class(c, d + f), a('.left-off-canvas-toggle')
                            .attr('aria-expanded', 'false'), e && (b.click_remove_class(c, d + e), a('.right-off-canvas-toggle')
                                .attr('aria-expanded', 'false'))
                    })
            },
            toggle: function (a, b) {
                b = b || this.get_wrapper(), b.is('.' + a) ? this.hide(a, b) : this.show(a, b)
            },
            show: function (a, b) {
                b = b || this.get_wrapper(), b.trigger('open')
                    .trigger('open.fndtn.offcanvas'), b.addClass(a)
            },
            hide: function (a, b) {
                b = b || this.get_wrapper(), b.trigger('close')
                    .trigger('close.fndtn.offcanvas'), b.removeClass(a)
            },
            click_toggle_class: function (a, b) {
                a.preventDefault()
                var c = this.get_wrapper(a)
                this.toggle(b, c)
            },
            click_remove_class: function (a, b) {
                a.preventDefault()
                var c = this.get_wrapper(a)
                this.hide(b, c)
            },
            get_settings: function (a) {
                var b = this.S(a.target)
                    .closest('[' + this.attr_name() + ']')
                return b.data(this.attr_name(!0) + '-init') || this.settings
            },
            get_wrapper: function (a) {
                var b = this.S(a ? a.target : this.scope)
                    .closest('.off-canvas-wrap')
                return b.length === 0 && (b = this.S('.off-canvas-wrap')), b
            },
            reflow: function () { }
        }
    }(jQuery, window, window.document)),
    (function (a, b, c, d) {
        'use strict'

        function e(a) {
            var b = /fade/i.test(a)
            var c = /pop/i.test(a)
            return {
                animate: b || c,
                pop: c,
                fade: b
            }
        }
        Foundation.libs.reveal = {
            name: 'reveal',
            version: '5.5.0',
            locked: !1,
            settings: {
                animation: 'fadeAndPop',
                animation_speed: 250,
                close_on_background_click: !1,
                close_on_esc: !0,
                dismiss_modal_class: 'close-reveal-modal',
                bg_class: 'reveal-modal-bg',
                bg_root_element: 'body',
                root_element: 'body',
                open: function () { },
                opened: function () { },
                close: function () { },
                closed: function () {  
                  console.log("dialog closed")
                },
                bg: a('.reveal-modal-bg'),
                css: {
                    open: {
                        opacity: 0,
                        visibility: 'visible',
                        display: 'block'
                    },
                    close: {
                        opacity: 1,
                        visibility: 'hidden',
                        display: 'none'
                    }
                }
            },
            init: function (b, c, d) {
                a.extend(!0, this.settings, c, d), this.bindings(c, d)
            },
            events: function (a) {
                var b = this
                var d = b.S
                return d(this.scope)
                    .off('.reveal')
                    .on('click.fndtn.reveal', '[' + this.add_namespace('data-reveal-id') + ']:not([disabled])', function (a) {
                        if (a.preventDefault(), !b.locked) {
                            var c = d(this)
                            var e = c.data(b.data_attr('reveal-ajax'))
                            if (b.locked = !0, typeof e === 'undefined') b.open.call(b, c)
                            else {
                                var f = e === !0 ? c.attr('href') : e
                                b.open.call(b, c, {
                                    url: f
                                })
                            }
                        }
                    }), d(c)
                        .on('click.fndtn.reveal', this.close_targets(), function (a) {
                            if (a.preventDefault(), !b.locked) {
                                var c = d('[' + b.attr_name() + '].open')
                                    .data(b.attr_name(!0) + '-init') || b.settings
                                var e = d(a.target)[0] === d('.' + c.bg_class)[0]
                                if (e) {
                                    if (!c.close_on_background_click) return
                                    a.stopPropagation()
                                }
                                b.locked = !0, b.close.call(b, e ? d('[' + b.attr_name() + '].open') : d(this)
                                    .closest('[' + b.attr_name() + ']'))
                            }
                        }), d('[' + b.attr_name() + ']', this.scope)
                            .length > 0 ? d(this.scope)
                                .on('open.fndtn.reveal', this.settings.open)
                                .on('opened.fndtn.reveal', this.settings.opened)
                                .on('opened.fndtn.reveal', this.open_video)
                                .on('close.fndtn.reveal', this.settings.close)
                                .on('closed.fndtn.reveal', this.settings.closed)
                                .on('closed.fndtn.reveal', this.close_video) : d(this.scope)
                                    .on('open.fndtn.reveal', '[' + b.attr_name() + ']', this.settings.open)
                                    .on('opened.fndtn.reveal', '[' + b.attr_name() + ']', this.settings.opened)
                                    .on('opened.fndtn.reveal', '[' + b.attr_name() + ']', this.open_video)
                                    .on('close.fndtn.reveal', '[' + b.attr_name() + ']', this.settings.close)
                                    .on('closed.fndtn.reveal', '[' + b.attr_name() + ']', this.settings.closed)
                                    .on('closed.fndtn.reveal', '[' + b.attr_name() + ']', this.close_video), !0
            },
            key_up_on: function (a) {
                var b = this
                return b.S('body')
                    .off('keyup.fndtn.reveal')
                    .on('keyup.fndtn.reveal', function (a) {
                        var c = b.S('[' + b.attr_name() + '].open')
                        var d = c.data(b.attr_name(!0) + '-init') || b.settings
                        d && a.which === 27 && d.close_on_esc && !b.locked && b.close.call(b, c)
                    }), !0
            },
            key_up_off: function (a) {
                return this.S('body')
                    .off('keyup.fndtn.reveal'), !0
            },
            open: function (c, d) {
                var e; var f = this
                c ? typeof c.selector !== 'undefined' ? e = f.S('#' + c.data(f.data_attr('reveal-id')))
                    .first() : (e = f.S(this.scope), d = c) : e = f.S(this.scope)
                var g = e.data(f.attr_name(!0) + '-init')
                if (g = g || this.settings, e.hasClass('open') && c.attr('data-reveal-id') == e.attr('id')) return f.close(e)
                if (!e.hasClass('open')) {
                    var h = f.S('[' + f.attr_name() + '].open')
                    if (typeof e.data('css-top') === 'undefined' && e.data('css-top', parseInt(e.css('top'), 10))
                        .data('offset', this.cache_offset(e)), this.key_up_on(e), e.trigger('open')
                            .trigger('open.fndtn.reveal'), h.length < 1 && this.toggle_bg(e, !0), typeof d === 'string' && (d = {
                                url: d
                            }), typeof d !== 'undefined' && d.url) {
                        var i = typeof d.success !== 'undefined' ? d.success : null
                        a.extend(d, {
                            success: function (b, c, d) {
                                if (a.isFunction(i)) {
                                    var j = i(b, c, d)
                                    typeof j === 'string' && (b = j)
                                }
                                e.html(b), f.S(e)
                                    .foundation('section', 'reflow'), f.S(e)
                                        .children()
                                        .foundation(), h.length > 0 && f.hide(h, g.css.close), f.show(e, g.css.open)
                            }
                        }), a.ajax(d)
                    } else h.length > 0 && this.hide(h, g.css.close), this.show(e, g.css.open)
                }
                f.S(b)
                    .trigger('resize')
            },
            close: function (a) {
                var a = a && a.length ? a : this.S(this.scope)
                var b = this.S('[' + this.attr_name() + '].open')
                var c = a.data(this.attr_name(!0) + '-init') || this.settings
                b.length > 0 && (this.locked = !0, this.key_up_off(a), a.trigger('close')
                    .trigger('close.fndtn.reveal'), this.toggle_bg(a, !1), this.hide(b, c.css.close, c))
            },
            close_targets: function () {
                var a = '.' + this.settings.dismiss_modal_class
                return this.settings.close_on_background_click ? a + ', .' + this.settings.bg_class : a
            },
            toggle_bg: function (b, c, e) {
                var f = b.data(this.attr_name(!0) + '-init') || this.settings
                var g = f.bg_root_element
                this.S('.' + this.settings.bg_class)
                    .length === 0 && (this.settings.bg = a('<div />', {
                        'class': this.settings.bg_class
                    })
                        .appendTo(g)
                        .hide())
                var h = this.settings.bg.filter(':visible')
                    .length > 0
                e != h && ((e == d ? h : !e) ? this.hide(this.settings.bg) : this.show(this.settings.bg))
            },
            show: function (b, c) {
                if (c) {
                    var d = b.data(this.attr_name(!0) + '-init') || this.settings
                    var f = d.root_element
                    if (b.parent(f)
                        .length === 0) {
                        var g = b.wrap('<div style="display: none;" />')
                            .parent()
                        b.on('closed.fndtn.reveal.wrapped', function () {
                            b.detach()
                                .appendTo(g), b.unwrap()
                                    .unbind('closed.fndtn.reveal.wrapped')
                        }), b.detach()
                            .appendTo(f)
                    }
                    var h = e(d.animation)
                    if (h.animate || (this.locked = !1), h.pop) {
                        c.top = a(f)
                            .scrollTop() - b.data('offset') + 'px'
                        var i = {
                            top: a(f)
                                .scrollTop() + b.data('css-top') + 'px',
                            opacity: 1
                        }
                        return setTimeout(function () {
                            return b.css(c)
                                .animate(i, d.animation_speed, 'linear', function () {
                                    this.locked = !1, b.trigger('opened')
                                        .trigger('opened.fndtn.reveal')
                                }.bind(this))
                                .addClass('open')
                        }.bind(this), d.animation_speed / 2)
                    }
                    if (h.fade) {
                        c.top = a(f)
                            .scrollTop() + b.data('css-top') + 'px'
                        var i = {
                            opacity: 1
                        }
                        return setTimeout(function () {
                            return b.css(c)
                                .animate(i, d.animation_speed, 'linear', function () {
                                    this.locked = !1, b.trigger('opened')
                                        .trigger('opened.fndtn.reveal')
                                }.bind(this))
                                .addClass('open')
                        }.bind(this), d.animation_speed / 2)
                    }
                    return b.css(c)
                        .show()
                        .css({
                            opacity: 1
                        })
                        .addClass('open')
                        .trigger('opened')
                        .trigger('opened.fndtn.reveal')
                }
                var d = this.settings
                return e(d.animation)
                    .fade ? b.fadeIn(d.animation_speed / 2) : (this.locked = !1, b.show())
            },
            hide: function (b, c) {
                if (c) {
                    var d = b.data(this.attr_name(!0) + '-init') || this.settings
                    var f = d.root_element
                    var g = e(d.animation)
                    if (g.animate || (this.locked = !1), g.pop) {
                        var h = {
                            top: -a(f)
                                .scrollTop() - b.data('offset') + 'px',
                            opacity: 0
                        }
                        return setTimeout(function () {
                            return b.animate(h, d.animation_speed, 'linear', function () {
                                this.locked = !1, b.css(c)
                                    .trigger('closed')
                                    .trigger('closed.fndtn.reveal')
                            }.bind(this))
                                .removeClass('open')
                        }.bind(this), d.animation_speed / 2)
                    }
                    if (g.fade) {
                        var h = {
                            opacity: 0
                        }
                        return setTimeout(function () {
                            return b.animate(h, d.animation_speed, 'linear', function () {
                                this.locked = !1, b.css(c)
                                    .trigger('closed')
                                    .trigger('closed.fndtn.reveal')
                            }.bind(this))
                                .removeClass('open')
                        }.bind(this), d.animation_speed / 2)
                    }
                    return b.hide()
                        .css(c)
                        .removeClass('open')
                        .trigger('closed')
                        .trigger('closed.fndtn.reveal')
                }
                var d = this.settings
                return e(d.animation)
                    .fade ? b.fadeOut(d.animation_speed / 2) : b.hide()
            },
            close_video: function (b) {
                var c = a('.flex-video', b.target)
                var d = a('iframe', c)
                d.length > 0 && (d.attr('data-src', d[0].src), d.attr('src', d.attr('src')), c.hide())
            },
            open_video: function (b) {
                var c = a('.flex-video', b.target)
                var e = c.find('iframe')
                if (e.length > 0) {
                    var f = e.attr('data-src')
                    if (typeof f === 'string') e[0].src = e.attr('data-src')
                    else {
                        var g = e[0].src
                        e[0].src = d, e[0].src = g
                    }
                    c.show()
                }
            },
            data_attr: function (a) {
                return this.namespace.length > 0 ? this.namespace + '-' + a : a
            },
            cache_offset: function (a) {
                var b = a.show()
                    .height() + parseInt(a.css('top'), 10)
                return a.hide(), b
            },
            off: function () {
                a(this.scope)
                    .off('.fndtn.reveal')
            },
            reflow: function () { }
        }
    }(jQuery, window, window.document)),
    (function (a, b, c, d) {
        'use strict'
        Foundation.libs.tooltip = {
            name: 'tooltip',
            version: '5.5.0',
            settings: {
                additional_inheritable_classes: [],
                tooltip_class: '.tooltip',
                append_to: 'body',
                touch_close_text: 'Tap To Close',
                disable_for_touch: !1,
                hover_delay: 200,
                show_on: 'all',
                tip_template: function (a, b) {
                    return '<span data-selector="' + a + '" id="' + a + '" class="' + Foundation.libs.tooltip.settings.tooltip_class.substring(1) + '" role="tooltip">' + b + '<span class="nub"></span></span>'
                }
            },
            cache: {},
            init: function (a, b, c) {
                Foundation.inherit(this, 'random_str'), this.bindings(b, c)
            },
            should_show: function (b, c) {
                var d = a.extend({}, this.settings, this.data_options(b))
                return d.show_on === 'all' ? !0 : this.small() && d.show_on === 'small' ? !0 : this.medium() && d.show_on === 'medium' ? !0 : this.large() && d.show_on === 'large' ? !0 : !1
            },
            medium: function () {
                return matchMedia(Foundation.media_queries.medium)
                    .matches
            },
            large: function () {
                return matchMedia(Foundation.media_queries.large)
                    .matches
            },
            events: function (b) {
                var c = this
                var d = c.S
                c.create(this.S(b)), a(this.scope)
                    .off('.tooltip')
                    .on('mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', '[' + this.attr_name() + ']', function (b) {
                        var e = d(this)
                        var f = a.extend({}, c.settings, c.data_options(e))
                        var g = !1
                        if (Modernizr.touch && /touchstart|MSPointerDown/i.test(b.type) && d(b.target)
                            .is('a')) return !1
                        if (/mouse/i.test(b.type) && c.ie_touch(b)) return !1
                        if (e.hasClass('open')) Modernizr.touch && /touchstart|MSPointerDown/i.test(b.type) && b.preventDefault(), c.hide(e)
                        else {
                            if (f.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(b.type)) return
                            !f.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(b.type) && (b.preventDefault(), d(f.tooltip_class + '.open')
                                .hide(), g = !0), /enter|over/i.test(b.type) ? this.timer = setTimeout(function () {
                                    c.showTip(e)
                                }, c.settings.hover_delay) : b.type === 'mouseout' || b.type === 'mouseleave' ? (clearTimeout(this.timer), c.hide(e)) : c.showTip(e)
                        }
                    })
                    .on('mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', '[' + this.attr_name() + '].open', function (b) {
                        return /mouse/i.test(b.type) && c.ie_touch(b) ? !1 : void ((a(this)
                            .data('tooltip-open-event-type') != 'touch' || b.type != 'mouseleave') && (a(this)
                                .data('tooltip-open-event-type') == 'mouse' && /MSPointerDown|touchstart/i.test(b.type) ? c.convert_to_touch(a(this)) : c.hide(a(this))))
                    })
                    .on('DOMNodeRemoved DOMAttrModified', '[' + this.attr_name() + ']:not(a)', function (a) {
                        c.hide(d(this))
                    })
            },
            ie_touch: function (a) {
                return !1
            },
            showTip: function (a) {
                var b = this.getTip(a)
                return this.should_show(a, b) ? this.show(a) : void 0
            },
            getTip: function (b) {
                var c = this.selector(b)
                var d = a.extend({}, this.settings, this.data_options(b))
                var e = null
                return c && (e = this.S('span[data-selector="' + c + '"]' + d.tooltip_class)), typeof e === 'object' ? e : !1
            },
            selector: function (a) {
                var b = a.attr('id')
                var c = a.attr(this.attr_name()) || a.attr('data-selector')
                return (b && b.length < 1 || !b) && typeof c !== 'string' && (c = this.random_str(6), a.attr('data-selector', c)
                    .attr('aria-describedby', c)), b && b.length > 0 ? b : c
            },
            create: function (c) {
                var d = this
                var e = a.extend({}, this.settings, this.data_options(c))
                var f = this.settings.tip_template
                typeof e.tip_template === 'string' && b.hasOwnProperty(e.tip_template) && (f = b[e.tip_template])
                var g = a(f(this.selector(c), a('<div></div>')
                    .html(c.attr('title'))
                    .html()))
                var h = this.inheritable_classes(c)
                g.addClass(h)
                    .appendTo(e.append_to), Modernizr.touch && (g.append('<span class="tap-to-close">' + e.touch_close_text + '</span>'),
                        g.on('touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', function (a) {
                            d.hide(c)
                        })), c.removeAttr('title')
                            .attr('title', '')
            },
            reposition: function (b, c, d) {
                var e, f, g, h, i
                if (c.css('visibility', 'hidden')
                    .show(), e = b.data('width'), f = c.children('.nub'), g = f.outerHeight(), h = f.outerHeight(), this.small() ? c.css({
                        width: '100%'
                    }) : c.css({
                        width: e || 'auto'
                    }), i = function (a, b, c, d, e, f) {
                        return a.css({
                            top: b || 'auto',
                            bottom: d || 'auto',
                            left: e || 'auto',
                            right: c || 'auto'
                        })
                            .end()
                    }, i(c, b.offset()
                        .top + b.outerHeight() + 10, 'auto', 'auto', b.offset()
                        .left), this.small()) {
                    i(c, b.offset()
                        .top + b.outerHeight() + 10, 'auto', 'auto', 12.5, a(this.scope)
                            .width()), c.addClass('tip-override'), i(f, -g, 'auto', 'auto', b.offset()
                                .left)
                } else {
                    var j = b.offset()
                        .left
                    Foundation.rtl && (f.addClass('rtl'), j = b.offset()
                        .left + b.outerWidth() - c.outerWidth()), i(c, b.offset()
                            .top + b.outerHeight() + 10, 'auto', 'auto', j), c.removeClass('tip-override'), d && d.indexOf('tip-top') > -1 ? (Foundation.rtl && f.addClass('rtl'), i(c, b.offset()
                                .top - c.outerHeight(), 'auto', 'auto', j)
                                .removeClass('tip-override')) : d && d.indexOf('tip-left') > -1 ? (i(c, b.offset()
                                    .top + b.outerHeight() / 2 - c.outerHeight() / 2, 'auto', 'auto', b.offset()
                                        .left - c.outerWidth() - g)
                                    .removeClass('tip-override'), f.removeClass('rtl')) : d && d.indexOf('tip-right') > -1 && (i(c, b.offset()
                                        .top + b.outerHeight() / 2 - c.outerHeight() / 2, 'auto', 'auto', b.offset()
                                            .left + b.outerWidth() + g)
                                        .removeClass('tip-override'), f.removeClass('rtl'))
                }
                c.css('visibility', 'visible')
                    .hide()
            },
            small: function () {
                return matchMedia(Foundation.media_queries.small)
                    .matches && !matchMedia(Foundation.media_queries.medium)
                        .matches
            },
            inheritable_classes: function (b) {
                var c = a.extend({}, this.settings, this.data_options(b))
                var d = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'radius', 'round'].concat(c.additional_inheritable_classes)
                var e = b.attr('class')
                var f = e ? a.map(e.split(' '), function (b, c) {
                    return a.inArray(b, d) !== -1 ? b : void 0
                })
                    .join(' ') : ''
                return a.trim(f)
            },
            convert_to_touch: function (b) {
                var c = this
                var d = c.getTip(b)
                var e = a.extend({}, c.settings, c.data_options(b))
                d.find('.tap-to-close')
                    .length === 0 && (d.append('<span class="tap-to-close">' + e.touch_close_text + '</span>'), d.on('click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose', function (a) {
                        c.hide(b)
                    })), b.data('tooltip-open-event-type', 'touch')
            },
            show: function (a) {
                var b = this.getTip(a)
                a.data('tooltip-open-event-type') == 'touch' && this.convert_to_touch(a), this.reposition(a, b, a.attr('class')), a.addClass('open'), b.fadeIn(150)
            },
            hide: function (a) {
                var b = this.getTip(a)
                b.fadeOut(150, function () {
                    b.find('.tap-to-close')
                        .remove(), b.off('click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose'), a.removeClass('open')
                })
            },
            off: function () {
                var b = this
                this.S(this.scope)
                    .off('.fndtn.tooltip'), this.S(this.settings.tooltip_class)
                        .each(function (c) {
                            a('[' + b.attr_name() + ']')
                                .eq(c)
                                .attr('title', a(this)
                                    .text())
                        })
                        .remove()
            },
            reflow: function () { }
        }
    }(jQuery, window, window.document)),
    (function (a) {
        var b; var c = {}
        var d = {}
        try {
            b = localStorage
        } catch (e) { }
        var f
        b && b.getItem ? f = b.getItem('__browser_id__') : (f = document.cookie.match(/browser_id=(id\d+\.\d+);/), f && (f = f[1])), f || (f = 'id' + Date.now() + Math.random(), b && b.setItem && b.setItem('__browser_id__', f)), document.cookie = 'browser_id=' + f, a.TrinketIO = {
            'export': function (a, b) {
                for (var d = a.split('.'), e = d.pop(), f = c, g = 0; g < d.length; g++) f[d[g]] == null && (f[d[g]] = {}), f = f[d[g]]
                if (f[e]) throw new Error('Module ' + a + ' has already been defined!')
                return f[e] = b, b
            },
            'import': function (a) {
                for (var b = a.split('.'), d = c, e = 0; e < b.length; e++) { if (d = d[b[e]], d == null) throw new Error('Module ' + a + ' could not be found!') }
                return d
            },
            runtime: function (a, b) {
                return arguments.length > 1 && (d[a] = b), d[a]
            },
            clearRuntime: function () {
                d = {}
            }
        }
    }(window)),
    (function (a) {
        window.trinketConfig = {
            get: function (b) {
                return a[b]
            },
            planName: function (a) {
                var b = this.get('plans')
                return _.find(b, a)[a]
            },
            prefix: function (b, c) {
                if (b.charAt(0) !== '/' && (b = '/' + b), a.testing) return b
                if (typeof c === 'undefined') {
                    var d = b.match(/\/(\w+)\//)
                    d && (c = d[1])
                }
                return c && a.prefixes[c] ? '/' + a.prefixes[c] + b : '/' + a.cachePrefix + Date.now() + b
            },
            component: function (b, c) {
                return [a.vendorHost, b, a.components[b], c].join('/')
            },
            getUrl: function (b) {
                return b.charAt(0) !== '/' && (b = '/' + b), a.protocol + '://' + a.apphostname + b
            },
            getClassUrl: function (b, c) {
                var d = '/' + c
                return a.usersubdomains ? '//' + b + '.' + a.apphostname + d : '/u/' + b + '/classes' + d
            },
            getPublishedTrinketUrl: function (b, c) {
                var d = a.usersubdomains ? b + '.' + a.apphostname + '/sites/' + c : a.apphostname + '/u/' + b + '/sites/' + c
                return a.protocol + '://' + d
            }
        }
    }(window.trinket.config)),
    (function (a, b) {
        'use strict'

        function c(a) {
            return new Function('o', 'return "' + a.replace(/["\n\r\u2028\u2029]/g, function (a) {
                return e[a]
            })
                .replace(/\{\{([\s\S]+?)\}\}/g, '" + (o["$1"] !== undefined ? o["$1"] : "") + "') + '";')
        }

        function d(a, b) {
            return f[a] || (f[a] = c($('#' + a)
                .text()), $('#' + a)
                    .remove()), f[a](b || {})
        }
        var e = {
            '\n': '\\n',
            '"': '\\"',
            '\u2028': '\\u2028',
            '\u2029': '\\u2029'
        }
        var f = {}
        d.compile = c, b['export']('utils.template', d)
    }(window, window.TrinketIO)),
    (function (a, b) {
        'use strict'

        function c() {
            return +new Date()
        }

        function d(a) {
            return k + a
        }

        function e(a) {
            return l + a
        }

        function f(a, b) {
            var d = parseInt(m.getItem(e(a)), 10)
            return d && d < (b || c()) ? !0 : !1
        }

        function g(a, b, f) {
            if (m && a) {
                var g = e(a)
                if (f) {
                    var h = 1e3 * f
                    m.setItem(g, c() + h)
                } else m.removeItem(g)
                return b = JSON.stringify(b), m.setItem(d(a), b)
            }
        }

        function h(a) {
            if (!m || !a) return null
            if (f(a)) return i(a), null
            var b = m.getItem(d(a))
            if (b) {
                try {
                    return JSON.parse(b)
                } catch (c) {
                    return null
                }
            }
            return b
        }

        function i(a) {
            m && a && (m.removeItem(e(a)), m.removeItem(d(a)))
        }

        function j() {
            if (m) {
                var a; var b; var d = m.length
                var e = k
                var g = c()
                for (b = 0; d > b; b++) a = m.key(b), a && a.indexOf(e) === 0 && (a = a.substr(e.length), f(a, g) && i(a))
            }
        }
        var k = '__trinket__'
        var l = '__trinket_expire__'
        var m = (function () {
            try {
                return a.localStorage.setItem(k, ''), a.localStorage.getItem(k), a.localStorage.removeItem(k), a.localStorage
            } catch (b) {

            }
        }())
        b['export']('utils.cache', {
            get: h,
            set: g,
            remove: i,
            purge: j
        })
    }(window, window.TrinketIO)), document.addEventListener("project_ready", function () {
        function a(a) {
            return window.location.protocol + '//' + window.location.hostname + a
        }

        function b(a) {
            var b; var d; var e; var f; var g; var h = a.split('=')
            var i = ''
            var j = !1
            if ((this.getType() === 'console' || (this.getType() === 'python3' || this.getType() === 'python') && this._queryString.runMode === 'console') && (j = !0), h[0] === 'code' && h[1]) {
                if (i = decodeURIComponent(h[1]), this.getType() === 'java' && (f = i.match(/^----\{(\w[\w\.\-]*)\}----\n/), f && (e = f[1], i = i.substring(i.indexOf('\n') + 1))), b = /\n----\{(\w[\w\.\-]*)\}----\n/, d = i.split(b), d.length > 1 || e) {
                    if (e = e || this.getMainFile()) {
                        for (i = [{
                            name: e,
                            content: d.shift()
                        }], j && (i[0].content = c(i[0].content)), g = 0; g < d.length; g += 2) {
                            i.push({
                                name: d[g],
                                content: typeof d[g + 1] !== 'undefined' && d[g + 1].length ? d[g + 1] : ''
                            })
                        }
                        i = JSON.stringify(i)
                    }
                } else j && (i = c(i))
            }
            return i
        }

        function c(a) {
            var b, c, d, e
            return /^>>>/.test(a) && (b = [], c = a.split('\n'), c.forEach(function (a) {
                (d = /^(>>>|\.\.\.) /.exec(a)) && (e = a.substring(4, a.length), d[1] === '...' ? b[b.length - 1] += '\\n' + e : typeof e !== 'undefined' && e.length && b.push(e))
            }), a = b.join('\n')), a
        }

        function d(a) {
            if (typeof a === 'undefined' || a === null) return null
            if (a instanceof Array) { for (var b = 0; b < a.length; b++) a[b] = d(a[b]) } else if (typeof a === 'object') { for (var b in a) a.hasOwnProperty(b) && (a[b] = d(a[b])) } else typeof a === 'string' && (a = _.unescape(a))
            return a
        }

        function e() {
            var a = {}
            if (window.location.search) {
                for (var b = window.location.search.substr(1)
                    .split('&'), c = 0; c < b.length; c++) {
                    var d = b[c].split('=')
                    d[0] && typeof d[1] !== 'undefined' && (a[d[0]] = decodeURIComponent(d[1].replace(/\+/g, ' ')), a[d[0]] === 'true' && (a[d[0]] = !0), a[d[0]] === 'false' && (a[d[0]] = !1))
                }
            }
            return a
        }

        function f(a, b) {
            b && n.clearRuntime()
            var c = Object.keys(a)
            c.forEach(function (b) {
                n.runtime(b, a[b])
            })
        }

        function g(a, b) {
            return function (c, d, e) {
                var f = d ? m(d)
                    .serialize() : m('#accountForm')
                        .serialize()
                var g = d || '#accountForm'
                c.stopPropagation(), c.preventDefault(), m.ajax({
                    type: 'POST',
                    url: a,
                    data: f,
                    success: m.proxy(b.onLoginComplete, b, g),
                    dataType: 'json'
                }), b.sendInterfaceAnalytics(this, e)
            }
        }

        function h(a, b, c) {
            var d = m.Deferred()
            return JSZipUtils.getBinaryContent(a, function (a, e) {
                a ? d.reject(a) : (c.file(b, e, {
                    binary: !0
                }), d.resolve(e))
            }), d
        }

        function i(a, c) {
            var h; var i; var j = this
            var k = ['on', 'off', 'trigger', 'once']
            var l = m('body')
                .data('view-only')
            j._timing = {
                t0: performance.now()
            }, j._varProxy = {}, this._$ = m(this)
            for (var o = 0; o < k.length; o++) {
                var r = k[o]
                this[r] = m.proxy(this._$[r], this._$)
            }
            if (this.$shareModal = m('#shareModal'), this.$shareUrl = m('#shareUrl'), this.$embedModal = m('#embedModal'), this.$embedCode = m('#embedCode'), this.$emailModal = m('#emailModal'), this.$overlay = m('#content-overlay'), this.$resetModal = m('#confirmResetModal'), this.$inputNameModal = m('#inputNameModal'), this.$pygameModal = m('#pygameModal'), this.$upgradeModal = m('#upgradeModal'), this.$draftMessage = m('#draftMessage'), this.assignment = m('body')
                .data('assignment'), this.assignmentFeedback = m('body')
                    .data('assignment-feedback'), this.assignmentViewOnly = m('body')
                        .data('view-only'), n.runtime('mission-zero', m('body')
                            .data('mission-zero') || !1), this.$responsiveIndicators = m('.responsive-indicator'), m(document)
                                .on('click touchstart', '.menu-button', function (a) {
                                    var b = m(this)
                                        .data('action')
                                    var c = 'trinket.' + b
                                    if (!m(this)
                                        .hasClass('disabled')) {
                                        if (a.type === 'touchstart') {
                                            m(this)
                                                .addClass('touched')
                                        } else if (a.type === 'click' && m(this)
                                            .hasClass('touched')) {
                                            return void m(this)
                                                .removeClass('touched')
                                        }
                                        m(this)
                                            .trigger(c, {
                                                action: b,
                                                data: m(this)
                                                    .data('data')
                                            }), m(this)
                                                .data('no-analytics') || j.sendInterfaceAnalytics(this)
                                    }
                                }), m(document)
                                    .on('trinket.sharing.share', m.proxy(this.onShareClick, this)), m(document)
                                        .on('trinket.sharing.embed', m.proxy(this.onEmbedClick, this)), m(document)
                                            .on('trinket.sharing.email', m.proxy(this.onEmailClick, this)), m(document)
                                                .on('trinket.group.post', m.proxy(this.onGroupPostClick, this)), m(document)
                                                    .on('trinket.group.submit', m.proxy(this.onGroupSubmitClick, this)), m(document)
                                                        .on('trinket.library.add', m.proxy(this.onSaveClick, this)), m(document)
                                                            .on('trinket.code.save', m.proxy(this.onUpdateClick, this)), m(document)
                                                                .on('trinket.code.fontsize', m.proxy(this.onFontSizeClick, this)), m(document)
                                                                    .on('trinket.view.gallery', m.proxy(this.onGalleryClick, this)), m(document)
                                                                        .on('trinket.mode.fullscreen', m.proxy(this.onFullScreenClick, this)), m(document)
                                                                            .on('trinket.mode.download', m.proxy(this.onDownloadClick, this)), m(document)
                                                                                .on('trinket.mode.upload', m.proxy(this.onUploadClick, this)), m(document)
                                                                                    .on('trinket.menu.upgrade', m.proxy(this.onUpgradeClick, this)), m(document)
                                                                                        .on('trinket.open.link', m.proxy(this.onLinkClick, this)), m(document)
                                                                                            .on('trinket.code.submit', function () {
                                                                                                j.$inputNameModal.foundation('reveal', 'open')
                                                                                            }), m(document)
                                                                                                .on('trinket.code.reset', function () {
                                                                                                    j.$resetModal.foundation('reveal', 'open')
                                                                                                }), m(document)
                                                                                                    .on('trinket.code.name', function () {
                                                                                                        j.$inputNameModal.foundation('reveal', 'open')
                                                                                                    }), m(document)
                                                                                                        .on('trinket.code.pygame-close', m.proxy(this.onPygameClose, this)), m(document)
                                                                                                            .on('trinket.code.confirm-reset', m.proxy(this.onResetClick, this)), m(document)
                                                                                                                .on('trinket.code.cancel-reset', function () {
                                                                                                                    j.$resetModal.foundation('reveal', 'close')
                                                                                                                }), m(document)
                                                                                                                    .on('closed', '#pygameModal', m.proxy(this.stopExecution, this)), m(document)
                                                                                                                        .on('trinket.code.confirm-name', m.proxy(this.onSubmitClick, this)), m(document)
                                                                                                                            .on('trinket.code.cancel-name', function () {
                                                                                                                                j.$inputNameModal.foundation('reveal', 'close')
                                                                                                                            }), m(document)
                                                                                                                                .on('trinket.code.settings', function () {
                                                                                                                                    m('#settingsModal')
                                                                                                                                        .foundation('reveal', 'open')
                                                                                                                                }), m(document)
                                                                                                                                    .on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function (a) {
                                                                                                                                        var b = m('.trinket-content-wrapper')
                                                                                                                                            .width()
                                                                                                                                        var c = m('#editor')
                                                                                                                                            .width()
                                                                                                                                        c > b && m('#editor')
                                                                                                                                            .css('width', 0.5 * b)
                                                                                                                                    }), m(document)
                                                                                                                                        .on('trinket.sharing.social', function (a, b) {
                                                                                                                                            var c; var d = !1
                                                                                                                                            if (m(b.data)
                                                                                                                                                .click(), d) {
                                                                                                                                                var e = {}
                                                                                                                                                var f = j.serialize()
                                                                                                                                                var g = function () { }
                                                                                                                                                f.shortCode = j._trinket.shortCode, f._timestamp = c, j._trinket.id ? j.fork(j._trinket, f, e, g) : j.create(f, e, g)
                                                                                                                                            }
                                                                                                                                        }), m(document)
                                                                                                                                            .on('trinket.account.login', g('/users/login', this)), m('#brand')
                                                                                                                                                .click(m.proxy(this.onLogoClick, this)), m('#shareUrl')
                                                                                                                                                    .click(m.proxy(this.onShareFocus, this)), m('#embedCode')
                                                                                                                                                        .click(m.proxy(this.onEmbedFocus, this)), m(document)
                                                                                                                                                            .on('change', 'input[data-trinket-settings]', m.proxy(this.settingsChange, this)), n.runtime('settingsModified', !1), s.init(), m('#version-toggle')
                                                                                                                                                                .change(function () {
                                                                                                                                                                    m(this)
                                                                                                                                                                        .is(':checked') ? (j.reset(j._original), j._viewingOriginal(!1), m('.menu-button')
                                                                                                                                                                            .not('.allow-original')
                                                                                                                                                                            .removeClass('disabled')) : (m.extend(!0, j._original, j.serialize()), j.reset(j._original.original), j._viewingOriginal(!0), m('.menu-button')
                                                                                                                                                                                .not('.allow-original')
                                                                                                                                                                                .addClass('disabled'), m('.revert-remix')
                                                                                                                                                                                    .removeClass('disabled'))
                                                                                                                                                                }), this._notification_open = !1, m('#notification-container')
                                                                                                                                                                    .click(m.proxy(this.onNotificationClick, this)), this._currentMode = '', this._updates = {}, this._original = d(a), this._viewingDraft = !1, this._predraft = m.extend(!0, {}, this._original), c) {
                if (this._original_draft = d(c), ['code', 'assets', 'settings'].forEach(function (a) {
                    j._original_draft[a] && (j._original[a] = j._original_draft[a], j._viewingDraft = !0, a === 'settings' && f(j._original_draft[a] || {}))
                }), this._viewingDraft) {
                    var t = q('draftTextTemplate', {
                        draftText: ''
                    })
                    this.$draftMessage.html(t), m('.save-it')
                        .removeClass('disabled')
                }
            } else f(this._original.settings || {})
            if (this._queryString = e(), window.location.hash) {
                var u = window.location.href
                var v = b.call(this, u.substr(u.indexOf('#') + 1))
                v && (this._original.code = v)
            }
            this.setTrinket(this._original)
            try {
                window.sessionStorage
            } catch (w) {
                this._queryString.noStorage = !0
            }
            if (this._queryString.clearStorage) {
                this.generateGUID()
                try {
                    window.sessionStorage && window.sessionStorage.removeItem(this.guid), p.remove(this.guid)
                } catch (w) { }
            }
            this._queryString.noStorage || this._queryString.outputOnly || (this.generateGUID(), this._queryString.autoRestore !== !1 && window.sessionStorage && window.sessionStorage.getItem(this.guid) ? (this._trinket.code = window.sessionStorage.getItem(this.guid), window.parent && window.parent.postMessage('autorestored', '*')) : (this._previousSession = p.get(this.guid)) && (p.remove(this.guid), this._queryString.autoRestore !== !1 ? (this._trinket.code = this._previousSession, window.parent && window.parent.postMessage('autorestored', '*')) : j.showRestoreMessage())), this.setUI(), this.getType() !== 'console' && this.getUIType() !== 'guest' && !this.assignment && !l && this._original && this._original.id && (h = !0), this.assignment && !l && (i = !0), h ? m(this)
                .on('trinket.code.change', _.debounce(function () {
                    m('.save-it')
                        .removeClass('disabled'), j.updateDraft()
                }, trinket.config.draftDebounce)) : i ? m(this)
                    .on('trinket.code.change', _.debounce(function () {
                        m('.save-it')
                            .removeClass('disabled'), j.autoSave()
                    }, trinket.config.autosaveDebounce)) : m(this)
                        .on('trinket.code.change', _.debounce(function () {
                            j.updateSessionCache()
                        }, 500)), this._queryString.externalInit || this.initialize(this._trinket), this.toggleUI(this.getUIType()), m(document)
                            .keydown(function (a) {
                                j.hasOverlay && a.keyCode === 27 && j.hideAll()
                            }), m(document)
                                .foundation({
                                    offcanvas: {
                                        close_on_click: !0
                                    },
                                    dropdown: {
                                        active_class: 'open'
                                    }
                                }), m('.left-off-canvas-toggle, .right-off-canvas-toggle')
                                    .on('click', function () { }), m(document)
                                        .on('close.fndtn.alert', function (a) {
                                            m('body')
                                                .removeClass('has-status-bar')
                                        }), this.setFontSize(this._queryString.font || '1em'), this.parsedInstructions = '', m(document)
                                            .on('click', '#edit-instructions-link', m.proxy(this.onEditInstructionsClick, this)), m(document)
                                                .on('click', '#cancel-edit-instructions', m.proxy(this.onCancelEditInstructionsClick, this)), m(document)
                                                    .on('click', '#save-instructions', m.proxy(this.onSaveInstructionsClick, this)), j.serversideTimeoutDelay = j.hasPremiumTrinkets() ? 6e5 : 18e4
        }

        function j(a, b, c, d) {
            var e = q('statusMessageTemplate', {
                type: d || 'success',
                message: a
            })
            var f = m(e)
            m('body')
                .addClass('has-status-bar')
                .append(f), b && f.find('.yep')
                    .on('click', b), c && f.find('.nope')
                        .on('click', c), m(document)
                            .foundation('alert', 'reflow')
        }

        function k(a, b, c) {
            var d = !1
            var e = new RegExp('\\.' + c)
            var f = new RegExp('import\\s*' + b)
            var g = new RegExp('from\\s*' + b + '\\s*import')
            return _.map(a, function (a, b) {
                b.match(e) && (a.match(f) || a.match(g)) && (d = !0)
            }), d
        }
        var l; var m = window.jQuery
        var n = window.TrinketIO
        var o = 1728e3
        var p = n['import']('utils.cache')
        var q = n['import']('utils.template')
        var r = n['import']('utils.selectText')
        var s = n['import']('trinket.share')
        var t = n['import']('trinket.roles')
        var u = typeof trinketMarkdown !== 'undefined' ? trinketMarkdown({}) : void 0
        p.purge(), m.fn.serializeObject = function () {
            var a = {}
            var b = this.serializeArray()
            return m.each(b, function () {
                a[this.name] ? (a[this.name].push || (a[this.name] = [a[this.name]]), a[this.name].push(this.value || '')) : a[this.name] = this.value || ''
            }), a
        }
        if (m.extend(i.prototype, {
            showRestoreMessage: function () {
                var a; var b; var c; var d = this
                b = 'Do you want to restore your last session? <a title="restore the previous session" data-action="code.restore" class="text-link yep"><i class="fa fa-check"></i>&nbsp;Restore</a>&nbsp;&nbsp;or&nbsp;&nbsp;<a class="text-link nope"><i class="fa fa-trash"></i>&nbsp;Discard</a>', c = '<i class="fa fa-check-circle-o"></i>&nbsp;Your session has been restored. <a class="text-link yep"><i class="fa fa-thumbs-o-up">&nbsp;</i>Accept</a>&nbsp;&nbsp;or&nbsp;&nbsp;<a class="text-link nope"><i class="fa fa-undo"></i>&nbsp;Undo</a>', j(b, function () {
                    m('#statusMessages .close')
                        .click(), a = d._trinket.code, d._trinket.code = d._previousSession, d.reset(d._trinket), m(d)
                            .trigger('trinket.code.change'), j(c, function () {
                                m('#statusMessages .close')
                                    .click()
                            }, function () {
                                m('#statusMessages .close')
                                    .click(), d._trinket.code = a, d.reset(d._trinket), m(d)
                                        .trigger('trinket.code.change'), d.showRestoreMessage()
                            })
                }, function () {
                    m('#statusMessages .close')
                        .click()
                })
            },
            initialize: function (a) {
                throw new Error('initialize is not implemented')
            },
            generateGUID: function () {
                var a
                if (!this.guid) {
                    var a = (this._trinket.id || JSON.stringify(this._trinket)) + (document.referrer || document.location)
                    this.guid = CryptoJS.MD5(a)
                        .toString(CryptoJS.enc.Hex)
                }
            },
            getTour: function () {
                return []
            },
            startTour: function () {
                this.tour = this.getTour(), this.tour && this.tour.length && this.nextStop()
            },
            nextStop: function () {
                var a; var b = this
                var c = b.tour
                var d = c ? c.shift() : null
                if (prepareStop = function (c, d) {
                    m(c)
                        .addClass('attention'), m(document)
                            .one('trinket.' + d, function () {
                                m(c)
                                    .removeClass('attention'), --a === 0 && b.nextStop()
                            })
                }, d) {
                    d instanceof Array || (d = [d]), a = d.length
                    for (var e = 0; e < d.length; e++) prepareStop(d[e].el, d[e].event)
                }
            },
            onFontSizeClick: function (a, b) {
                this.setFontSize(b && b.data)
            },
            onFullScreenClick: function (a, b) {
                var c = document
                var d = c.documentElement
                var e = d.requestFullscreen || d.msRequestFullscreen || d.mozRequestFullScreen || d.webkitRequestFullscreen
                var f = c.exitFullscreen || c.msExitFullscreen || c.mozCancelFullScreen || c.webkitExitFullscreen
                try {
                    if (!e || c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement || c.msFullscreenElement) {
                        if (!f) throw new Error('fullscreen unavailable')
                        f.call(c), this.sendInterfaceAnalytics(a.target, {
                            data: 'exit'
                        })
                    } else {
                        e.call(d), this.sendInterfaceAnalytics(a.target, {
                            data: 'enter'
                        })
                    }
                } catch (g) {
                    if (confirm('Your browser does not support fullscreen mode. Would you like to open this trinket in a new window?')) {
                        var h = window.location.href
                        if (this.isModified()) {
                            var i = 'code=' + window.encodeURIComponent(this.getValue())
                            h = h.indexOf('#') > 0 ? h.replace(h.substr(h.indexOf('#') + 1), i) : h + '#' + i
                        }
                        window.open(h)
                    }
                }
            },
            onDownloadClick: function (a, b) {
                var c; var d; var e; var f = this.downloadable()
                var g = this
                var i = new JSZip()
                var l = []
                m.each(f.assets, function (a, b) {
                    c = /^data:image/.test(b.url) ? b.url : m('#proxy')
                        .val() + '/' + b.url, l.push(h(c, b.name, i))
                }), m.when.apply(m, l)
                    .done(function () {
                        for (d in f.files) i.file(d, f.files[d])
                        e = g.getTrinketIdentifier(), g._trinket && g._trinket.name && (e = g._trinket.name + '-' + e), e = 'Lanqu-Python' + e + '.zip', new JSZip.external.Promise(function (a, b) {
                            if (n.runtime('downloadExtra')) {
                                var c = m('#proxy')
                                    .val() + '/' + n.runtime('downloadExtra')
                                JSZipUtils.getBinaryContent(c, function (c, d) {
                                    c ? b(c) : a(d)
                                })
                            } else a()
                        })
                            .then(function (a) {
                                return a ? i.loadAsync(a) : void 0
                            })
                            .then(function () {
                                i.generateAsync({
                                    type: 'blob'
                                })
                                    .then(function (a) {
                                        saveAs(a, e)
                                    }, function (a) {
                                        throw new Error('Could not generate download.')
                                    })
                            })
                    })
                    .done(function () {
                        g.callAnalytics('Interaction', 'Click', 'Download'), k(f.files, 'sense_hat', 'py') && g.callAnalytics('Sense Hat Event', 'Click', 'Download')
                    })
                    .fail(function (a) {
                        j(a, function () {
                            m('#statusMessages .close')
                                .click()
                        }, function () {
                            m('#statusMessages .close')
                                .click()
                        }, 'alert')
                    })
            },
            onUpgradeClick: function (a, b) {
                this.$upgradeModal.foundation('reveal', 'open')
            },
            onLinkClick: function (b) {
                b.preventDefault(), window.open(a(m(b.target)
                    .data('href')))
            },
            setFontSize: function (a) {
                m('.trinket-content-wrapper')
                    .children()
                    .css('font-size', a || '1em')
            },
            setUI: function () {
                this._userId = m('#user')
                    .val(), this._userId ? this._trinket && this._trinket._owner === this._userId ? this._ui = 'owner' : this._queryString.inLibrary ? this._ui = 'library' : this._ui = 'user' : this._ui = 'guest'
            },
            toggleUI: function (a) {
                var b = this
                var c = q(a + 'MenuTemplate')
                m('#userMenu')
                    .empty()
                    .append(c)
                    .foundation(), a === 'guest' && m('#login')
                        .click(g('/api/users/login', b)), m('.ui-option')
                            .addClass('hide')
                            .filter('.' + a + '-option')
                            .removeClass('hide')
            },
            getUIType: function () {
                return this._ui
            },
            getUserId: function () {
                return this._userId
            },
            hasPermission: function () {
                var a = Array.prototype.slice.call(arguments)
                return t.hasPermission.apply(this, a)
            },
            hasRole: function () {
                var a = Array.prototype.slice.call(arguments)
                return t.hasRole.apply(this, a)
            },
            hasPremiumTrinkets: function () {
                return this.hasRole('trinket-connect') || this.hasRole('trinket-codeplus')
            },
            triggerChange: function () {
                m(document)
                    .trigger('trinket.code.change'), this.trigger('trinket.code.change'), this.assignment && window.parent && window.parent.postMessage(this.serialize(), '*')
            },
            onLoginComplete: function (a, b, c, d) {
                var e = this
                if (b && b.status === 'success') {
                    var f = m(a + ' input[name="email"]')
                        .val()
                    window.TrinketIO['import']('debug.sessions')
                        .onLogin(f, b.data), this._ui = b.data.id === this._trinket._owner ? 'owner' : 'user', this.toggleUI(this._ui), m(document)
                            .trigger('trinket.account.success'), m('body')
                                .append("<input id='roles' type='hidden' value='" + b.data.roles + "'>"), this.getType() !== 'console' && this.getUIType() !== 'guest' && this._original && this._original.id && (m(this)
                                    .off('trinket.code.change'), m(this)
                                        .on('trinket.code.change', _.debounce(function () {
                                            m('.save-it')
                                                .removeClass('disabled'), e.updateDraft()
                                        }, 1e3)))
                    var g = 'create-' + this.getType() + '-trinket'
                    var h = this.hasPermission(g) ? !1 : !0
                    this._ui === 'owner' ? (m('a.create-remix')
                        .data('action', 'code.submit'), m('a.create-remix')
                            .attr('title', '提交代码'), m('a.create-remix')
                                .find('i')
                                .removeClass()
                                .addClass('fa fa-save'), m('a.create-remix')
                                    .find('label')
                                    .html('提交')) : h || m('a.create-remix')
                                        .data('action', 'library.add'), h || (m('a.create-copy')
                                            .data('action', 'library.add'), m('a.save-remix')
                                                .data('action', 'library.add'), m('a.revert-remix')
                                                    .data('action', 'library.add'))
                } else {
                    b && b.flash && b.flash.validation ? m(a + ' .message')
                        .addClass('error')
                        .text(b.flash.validation.email || b.flash.validation.password) : b && b.flash && b.flash.duplicates ? m(a + ' .message')
                            .addClass('error')
                            .text('This email is already registered; try logging in.') : b && b.message ? m(a + ' .message')
                                .addClass('error')
                                .text(b.message) : m(a + ' .message')
                                    .addClass('error')
                                    .text('We were unable to log you in; please try again later.')
                }
            },
            updateSessionCache: function () {
                var a = this
                var b = a.getValue()
                if (b === a._original.code) {
                    try {
                        window.sessionStorage && window.sessionStorage.removeItem(a.guid), p.remove(a.guid)
                    } catch (c) { }
                } else {
                    try {
                        window.sessionStorage && window.sessionStorage.setItem(a.guid, b), p.set(a.guid, b, o)
                    } catch (c) { }
                }
            },
            updateDraft: function () {

            },
            _updateDraft: function () {
                var a; var b; var c = this;
            },
            discardDraft: function (a) {
            },
            discardDraftSettings: function () { },
            _viewingOriginal: function (a) {
                return void 0 !== a && (this._viewingOriginalFlag = !!a, a ? m('body')
                    .addClass('viewing-original') : m('body')
                        .removeClass('viewing-original')), this._viewingOriginalFlag
            },
            autoSave: function () {

            },
            onSaveClick: function () {
                var a = Date.now()
                m('body')
                    .addClass('saving')
                var b = function () {
                    var c = Date.now() - a
                    return c < 750 ? window.setTimeout(b, 750 - c) : void m('body')
                        .removeClass('saving')
                }
                this._original && this._original.id ? this._viewingOriginal() ? this.restore(b) : this._original.original ? this.save(void 0, b) : this.remix(b) : this.addToLibrary(b)
            },
            keys: function () {
                return this._keys || (this._keys = {
                    code: 1,
                    assets: 1,
                    settings: 1
                })
            },
            restore: function (a) {
                var b = this
                var c = q('restoreOriginalModalTemplate', {})
                var d = m(c)
                remix = this._original, original = remix.original, m('body')
                    .append(d), d.foundation('reveal', 'open'), d.on('close.fndtn.reveal', function () {
                        a()
                    }), d.find('.button')
                        .click(function () {
                            var c; var e; var f = m(this)
                                .data('action')
                            var g = {}
                            if (f === 'confirm') {
                                d.off('close.fndtn.reveal')
                                for (c in b.keys()) {
                                    g[c] = original[c], c === 'code' && (e = JSON.parse(g[c]), e = e.map(function (a) {
                                        return _.omit(a, 'comments')
                                    }), g[c] = JSON.stringify(e))
                                }
                                m.extend(!0, remix, g), m('#version-toggle')
                                    .prop('checked', !0)
                                    .change(), window.setTimeout(function () {
                                        b.save(void 0, a), b.updateSessionCache()
                                    })
                            } else a()
                            d.foundation('reveal', 'close'), d.remove()
                        })
            },
            remix: function (a) {
                var b = this
                b._createCopy('Remix', function (c) {
                    m('body')
                        .addClass('has-remix'), c.original = b._original, b.setTrinket(c, !0), b.reset(c), typeof a === 'function' && a()
                })
            },
            addToLibrary: function (a) {
                this._createCopy('Copy', function (b) {
                    var c = q('statusMessageTemplate', {
                        type: 'success',
                        message: 'A copy of this trinket has been saved for you. View or edit <a class="text-link" href="/library/trinkets/' + b.shortCode + '" target="_blank">your copy here</a>.'
                    })
                    var d = m(c)
                    m('body')
                        .addClass('has-status-bar')
                        .append(d), d.parent()
                            .foundation()
                            .trigger('open.fndtn.alert'), a && typeof a === 'function' && a(b)
                })
            },
            _createCopy: function (a, b) {
                var c = this
                var d = c.serialize({
                    removeComments: !0
                })
                var e = {
                    library: !0
                }
                var f = c._original && c._original.id
                var g = function (d) {
                    c.$overlay.addClass('hide'), b && typeof b === 'function' && b(d), m('.save-it')
                        .addClass('disabled'), c.$draftMessage.fadeOut('slow', function () {
                            c.$draftMessage.empty(), c._viewingDraft = !1
                        }), c.callAnalytics('Interaction', a, 'Library'), n.runtime('usingSenseHat') && c.callAnalytics('Sense Hat Event', a, 'Library')
                }
                m('#statusMessages .close')
                    .click(), c.$overlay.removeClass('hide'), f && (d._origin_id = f), a == 'Remix' && (d._remix = !0), c._trinket.id ? c.fork(c._trinket, d, e, g) : c.create(d, e, g)
            },
            getTrinket: function (a, b) {
                var c = this
                return typeof a === 'function' && (b = a, a = void 0), c.isModified() || !c._trinket.id ? c._trinket.id ? c.fork(c._trinket, c.serialize(), a, b) : c.create(c.serialize(), a, b) : setTimeout(function () {
                    b(c._trinket)
                })
            },
            setTrinket: function (a, b) {
                b && (this._original = a), this._trinket = m.extend(!0, {}, a)
                m('#project-name')[0].value = this._original.name
            },
            isModified: function () {
                var a = this.getValue()
                var b = a !== (this._trinket.code || '') || this.settingsModified()
                return b
            },
            settingsModified: function () {
                return n.runtime('settingsModified')
            },
            viewingDraft: function () {
                return this._viewingDraft
            },
            getType: function () {
                throw new Error('getType is not implemented')
            },
            getValue: function () {
                throw new Error('getValue is not implemented')
            },
            getMainFile: function () {
                return ''
            },
            getShareType: function () {
                return m('#shareType')
                    .val() || this.getType()
            },
            getTimeoutDelay: function () {
                return this.serversideTimeoutDelay
            },
            serialize: function (a) {
                return {
                    code: this.getValue(a)
                }
            },
            fork: function (a, b, c, d) {

            },
            create: function (a, b, c) {

            },
            save: function (a, b) {

            },
            onResetClick: function (a) {
                var b = this
                this.$resetModal.foundation('reveal', 'close')
                var c = function () {
                    b.setTrinket(b._original), b.reset(b._trinket), m(document)
                        .trigger('trinket.resetted')
                }
                this.viewingDraft() ? this.discardDraft(c) : c()
                try {
                    window.sessionStorage && window.sessionStorage.removeItem(this.guid), p.remove(this.guid)
                } catch (d) { }
                window.parent && window.parent.postMessage('reset', '*'), this.callAnalytics('Interaction', 'Click', 'Reset'), n.runtime('usingSenseHat') && this.callAnalytics('Sense Hat Event', 'Click', 'Reset'), m('.file-name-error')
                    .length && m('.file-name-error')
                        .find('.close')
                        .trigger('click')
            },
            reset: function (a) { },
            clickReset: function () {
                m(document)
                    .trigger('trinket.code.reset')
            },
            focus: function () { },
            onUpdateClick: function () {
                this.save(this.serialize())
            },
            onPygameClose: function (a) {
                Sk.insertEvent("quit");
                Sk.Sk_interrupt = true;
                //this.getEditor().setReadOnly(false)
                this.$pygameModal.foundation('reveal', 'close')
            },
            onSubmitClick: function (a) {
                var b = this
                name = m('#project-name')[0].value

                if (name !== null || name !== undefined || name !== '') {
                    this.$inputNameModal.foundation('reveal', 'close')
                    code = this.serialize()
                    code.name = name;
                    code.description = this._trinket.description
                    window.submitCode && window.submitCode(code)
                }
            },
            onShareClick: function (b) {
                var c = this
                var d = []
                var e = ''
                b.isDefaultPrevented() || c.getTrinket(function (b) {
                    var f = c.getShareInfo(b)
                    var g = a(f.url)
                    m('#runOptionLink')
                        .data('trinket-shortCode', b.shortCode), m('#runOptionLink')
                            .data('trinket-runMode', c.runMode), m('#displayOptionLink')
                                .data('trinket-shortCode', b.shortCode), m('#displayOptionLink')
                                    .data('trinket-runMode', c.runMode), m('#displayOptionLink')
                                        .val() && d.push(m('#displayOptionLink')
                                            .val() + '=true'), m('#runOptionLink')
                                                .val() && d.push('runOption=' + m('#runOptionLink')
                                                    .val()), c.runMode && d.push('runMode=' + c.runMode), d.length && (e = '?' + d.join('&')), g = g.replace(b.shortCode, b.shortCode + e), c.$shareUrl.text(g), c.$shareModal.foundation('reveal', 'open'), c.sendAnalytics('Navigation', {
                                                        action: 'View Modal',
                                                        label: 'share'
                                                    }, {
                                                        name: 'Snippet Modal Viewed',
                                                        modalType: 'share'
                                                    })
                })
            },
            onEmailClick: function (b) {
                var c = this
                b.isDefaultPrevented() || c.getTrinket(function (b) {
                    var d = c.getShareInfo(b)
                    var e = a(d.url)
                    c.$shareUrl.text(e), c.$emailModal.foundation('reveal', 'open'), c.sendAnalytics('Navigation', {
                        action: 'View Modal',
                        label: 'email'
                    }, {
                        name: 'Snippet Modal Viewed',
                        modalType: 'email'
                    })
                })
            },
            getShareInfo: function (a) {
                return {
                    url: '/' + this.getShareType() + '/' + this.getTrinketIdentifier(a)
                }
            },
            onShareFocus: function (a) {
                r.byId('shareUrl'), this.updateMetric('linkShares'), this.sendAnalytics('Shares', {
                    action: 'Focus',
                    label: 'link'
                }, {
                    name: 'Snippet Shared',
                    shareType: 'link'
                })
            },
            onEmbedClick: function (b) {
                var c = this
                var d = []
                var e = ''
                b.isDefaultPrevented() || c.getTrinket(function (b) {
                    var f = c.getEmbedInfo(b)
                    var g = a(f.url)
                    var h = '<iframe src="' + g + '" width="100%" height="' + (f.height || 356) + '" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>'
                    m('#runOptionEmbed')
                        .data('trinket-shortCode', b.shortCode), m('#runOptionEmbed')
                            .data('trinket-runMode', c.runMode), m('#displayOptionEmbed')
                                .data('trinket-shortCode', b.shortCode), m('#displayOptionEmbed')
                                    .data('trinket-runMode', c.runMode), m('#displayOptionEmbed')
                                        .val() && d.push(m('#displayOptionEmbed')
                                            .val() + '=true'), m('#runOptionEmbed')
                                                .val() && d.push('runOption=' + m('#runOptionEmbed')
                                                    .val()), m('#autorunEmbedToggle')
                                                        .is(':checked') && d.push('start=result'), c.runMode && d.push('runMode=' + c.runMode), d.length && (e = '?' + d.join('&')), h = h.replace(b.shortCode, b.shortCode + e), c.$embedCode.text(h), c.$embedModal.foundation('reveal', 'open'), c.sendAnalytics('Navigation', {
                                                            action: 'View Modal',
                                                            label: 'embed'
                                                        }, {
                                                            name: 'Snippet Modal Viewed',
                                                            modalType: 'embed'
                                                        })
                })
            },
            onGroupPostClick: function (a) {
                try {
                    window.parent.groups.post(this.serialize())
                } catch (b) {
                    console.log(b)
                }
            },
            onGroupSubmitClick: function (a) {
                try {
                    window.parent.groups.submit(this.serialize())
                } catch (b) {
                    console.log(b)
                }
            },
            getEmbedInfo: function (a) {
                var b = '/' + this.getTrinketIdentifier(a)
                return {
                    url: '/embed/' + this.getType() + b,
                    height: 356
                }
            },
            onEmbedFocus: function (a) {
                r.byId('embedCode'), this.updateMetric('embedShares'), this.sendAnalytics('Shares', {
                    action: 'Focus',
                    label: 'embed'
                }, {
                    name: 'Snippet Shared',
                    shareType: 'embed'
                })
            },
            updateMetric: function (a, b) {
                var c = m('body')
                    .data('no-metrics')
                if (a && !c && this._trinket && this._trinket.id) {
                    if (b) {
                        var d = CryptoJS.MD5(b)
                        b = d.toString(CryptoJS.enc.Hex)
                    } else b = this._trinket.id
                    if (this._updates[a] || (this._updates[a] = {}), !this._updates[a][b]) {
                        this._updates[a][b] = !0
                        var e = {}
                        e[a] = !0, m.ajax({
                            url: '/api/trinkets/' + this._trinket.id + '/metrics',
                            type: 'PUT',
                            dataType: 'json',
                            data: e
                        })
                    }
                }
            },
            onLogoClick: function (b) {
                var c = this
                b.preventDefault(), c.getTrinket(function (b) {
                    var d = c.getShareInfo(b)
                    c.sendAnalytics('Navigation', {
                        action: 'Click',
                        label: 'Logo'
                    }, {
                        name: 'Snippet Logo Clicked'
                    }), window.open(a(d.url))
                })
            },
            onGalleryClick: function (b) {
                b.preventDefault(), window.open(a('/gallery'))
            },
            onNotificationClick: function (a) {
                a.preventDefault()
                var b = this
                this._notification_open ? m('#notification-content')
                    .animate({
                        'margin-top': '-100%'
                    }, 400, function () {
                        b._notification_open = !1
                    }) : m('#notification-content')
                        .animate({
                            'margin-top': 0
                        }, 400, function () {
                            b._notification_open = !0, b.sendAnalytics('Navigation', {
                                action: 'Click',
                                label: 'Notification'
                            }, {
                                name: 'Snippet Notification Clicked'
                            })
                        })
            },
            onSendEmailClick: function (a) {
                var b = this
                if (m('#share-email')
                    .val() && m('#share-yourname')
                        .val() && m('#share-youremail')
                            .val()) {
                    m('.close')
                        .click(), m('#sendEmail')
                            .attr('value', 'Sending ...'), m('#sendEmail')
                                .addClass('disabled'), m.post('/api/trinkets/' + b._trinket.id + '/email', {
                                    email: m('#share-email')
                                        .val(),
                                    name: m('#share-yourname')
                                        .val(),
                                    replyTo: m('#share-youremail')
                                        .val(),
                                    token: m('#emailToken')
                                        .val(),
                                    'g-recaptcha-response': a
                                })
                                    .done(function (a) {
                                        b.$emailModal.foundation('reveal', 'close')
                                        var c = '<div data-alert class="alert-box success"> Your email was sent! Thanks for sharing! <a href="#" class="close">&times;</a></div>'
                                        m('#flashMessage')
                                            .show(), m('#flashContent')
                                                .html(c), m(document)
                                                    .foundation('alert', 'reflow'), m('#share-email')
                                                        .val(''), setTimeout(function () {
                                                            m('#flashMessage .close')
                                                                .trigger('click')
                                                        }, 3e3), b.sendAnalytics('Shares', {
                                                            action: 'Send Email'
                                                        }, {
                                                            name: 'Snippet Email Sent'
                                                        })
                                    })
                                    .fail(function (a, c, d) {
                                        b.$emailModal.foundation('reveal', 'close')
                                        var e = '<div data-alert class="alert-box warning"> There was a problem sending your email. Please try again later. <a href="#" class="close">&times;</a></div>'
                                        m('#flashMessage')
                                            .show(), m('#flashContent')
                                                .html(e), m(document)
                                                    .foundation('alert', 'reflow')
                                    })
                                    .always(function () {
                                        m('#sendEmail')
                                            .attr('value', 'Send'), m('#sendEmail')
                                                .removeClass('disabled')
                                    })
                } else {
                    var c = '<div data-alert class="alert-box warning"> Please complete all fields to send your email. <a href="#" class="close">&times;</a></div>'
                    m('#emailAlert')
                        .show()
                        .html(c), m(document)
                            .foundation('alert')
                }
            },
            getAnalyticsCategory: function () {
                return 'Snippet'
            },
            sendInterfaceAnalytics: function (a, b) {
                b || (b = {})
                var c = m(a)
                var d = c.data('action') || b.action
                var e = c.data('data') || b.data
                var f = c.closest('[data-interface]')
                    .data('interface') || b['interface']
                var g = c.data('library-override') || !1
                var h = this.$responsiveIndicators.filter(function (a) {
                    return m(this)
                        .css('display') !== 'none'
                })
                    .data('size') || ''
                var i = [h, f, d.replace(/\./g, '-')]
                e && i.push(e), i = i.join(' ')
                    .replace(/[a-zA-Z0-9](?:[^\s\-\._]*)/g, function (a) {
                        return a.charAt(0)
                            .toUpperCase() + a.substr(1)
                    }), this.sendAnalytics('Interface', {
                        action: i,
                        label: this.getTrinketIdentifier()
                    }, g)
            },
            sendAnalytics: function (a, b, c) {
                var d; var e = this
                var f = e.getEmbedInfo(e._trinket)
                var g = e._queryString && e._queryString.inLibrary
                b = m.extend({
                    category: 'Embedded ' + e.getAnalyticsCategory() + ' ' + a
                }, b, {
                    data: {
                        page: f.url
                    }
                }), d = ['send', 'event', b.category, b.action], b.label && d.push(b.label), b.value && d.push(b.value), b.data && d.push(b.data), window.ga && !e._queryString.snapshot && (!g || g && c) && window.ga.apply(null, d)
            },
            callAnalytics: function (a, b, c) {
                this.sendAnalytics(a, {
                    action: b,
                    label: c
                })
            },
            logClientMetric: function (a) {
                if (trinket.config.logClientMetric) {
                    try {
                        a.lang = this.getType(), this._trinket && this._trinket.id && (a.trinketId = this._trinket.id), m.post('/api/trinkets/clientmetric', a)
                            .done(function () { })
                    } catch (b) { }
                }
            },
            toggleOverlay: function (a) {
                m(a)
                    .toggleClass('hide'), m(a)
                        .hasClass('hide') ? (this.hasOverlay = !1, this.onCloseOverlay()) : (this.hasOverlay = !0, this.onOpenOverlay())
            },
            closeOverlay: function (a) {
                m(a)
                    .addClass('hide'), this.hasOverlay = !1
            },
            closeAnyModal: function () {
                m('.close-reveal-modal')
                    .is(':visible') && m('.close-reveal-modal')
                        .click()
            },
            closeAnyMessage: function () {
                m('.close')
                    .is(':visible') && m('.close')
                        .click()
            },
            draggable: function (a) {
                var b = (m('#dragbar')
                    .width(), m('#editor'))
                var c = this
                m(document)
                    .on('mousedown.dragbar', '#dragbar', function (d) {
                        d.preventDefault()
                        var e = m('.trinket-content-wrapper')
                            .width()
                        m('#content-overlay')
                            .show(), c.dragging = !0
                        var f = m('<div>', {
                            id: 'ghostbar',
                            css: {
                                height: b.outerHeight(),
                                top: b.offset()
                                    .top,
                                left: b.offset()
                                    .left
                            }
                        })
                            .appendTo('body')
                        m(document)
                            .on('mousemove.dragbar', function (b) {
                                var c = b.pageX / e
                                var d = (e - b.pageX) / e
                                c >= 0.3 && d >= 0.25 && (f.css('left', b.pageX + 2), m('#editor')
                                    .css('width', b.pageX + 2), a && a())
                            }), m(document)
                                .one('mouseup.dragbar', function (a) {
                                    m('#content-overlay')
                                        .hide(), c.dragging && (m('#ghostbar')
                                            .remove(), m(document)
                                                .off('mousemove.dragbar'), c.dragging = !1)
                                })
                    })
            },
            toggleAll: function () { },
            onOpenOverlay: function () { },
            onCloseOverlay: function () { },
            postSave: function () {
                function a() {
                    return b.resolve()
                }
                var b = m.Deferred()
                var c = this
                var d = c._trinket.shortCode
                return c.saveClientSnapshot() ? (c.captureAndSaveSnapshot(function (b) {
                    return b ? void m.post('/api/trinkets/' + d + '/snapshot', {
                        snapshotData: b
                    })
                        .done(a) : a()
                }), b) : a()
            },
            saveClientSnapshot: function () {
                return !1
            },
            isDirty: function () {
                return this._trinket ? !(this.getValue() === this._original.code) : !1
            },
            destroy: function () {
                this._trinket = void 0
            },
            getTrinketIdentifier: function (a) {
                return a || (a = this._trinket), a.shortCode ? a.shortCode : CryptoJS.MD5(a.code)
                    .toString(CryptoJS.enc.Hex)
            },
            getTrinketIdentifierOrNull: function () {
                var a = null
                return this._trinket && (a = this._trinket.original ? this._trinket.original.shortCode : this._trinket.shortCode), a
            },
            metadata: function () {
                var a = {}
                var b = this.getTrinketIdentifierOrNull()
                return b && (a.shortCode = b), this._userId && (a.userId = this._userId, a.userPlan = this.hasRole('trinket-connect') ? 'connect' : this.hasRole('trinket-codeplus') ? 'codeplus' : 'code'), this._trinket && this._trinket._owner && (a.ownerId = this._trinket._owner), a.lang = this.getType(), document.referrer && (a.referer = document.referrer), a
            },
            logError: function (a) {
                trinket.config.logClientCodeError && (a.lang = this.getType(), this._trinket && this._trinket.shortCode && (a.shortCode = this._trinket.shortCode), m.post('/api/trinkets/codeerror', a)
                    .done(function () { }))
            },
            triggerRunModeChange: function () {
                m(document)
                    .trigger('trinket.runMode.change', {
                        runMode: this.runMode
                    }), this.trigger('trinket.runMode.change', {
                        runMode: this.runMode
                    })
            },
            settingsChange: function (a) {
                var b; var c = m(a.target)[0].type
                this._trinket.settings = m.extend(!0, {}, this._trinket.settings), c === 'checkbox' ? b = m(a.target)
                    .is(':checked') : (c === 'range' || c === 'hidden') && (b = m(a.target)
                        .val()), typeof b !== 'undefined' && (this._trinket.settings[a.target.id] = b, n.runtime('settingsModified', !0)), m(a.target)
                            .data('settings-action') && typeof this[m(a.target)
                                .data('settings-action')] === 'function' && this[m(a.target)
                                    .data('settings-action')](), m(a.target)
                                        .data('skip-trigger') ? m(a.target)
                                            .removeData('skip-trigger') : this.triggerChange()
            },
            showOutput: function () {
                m('#codeOutput')
                    .removeClass('hide'), m('#editor')
                        .addClass('hide'), this.closeOverlay('#modules'), m('#instructionsContainer')
                            .addClass('hide'), m('#outputContainer')
                                .removeClass('hide'), m('#codeOutputTab')
                                    .addClass('active'), m('#instructionsTab')
                                        .removeClass('active')
            },
            showInstructions: function () {
                m('#codeOutput')
                    .removeClass('hide'), m('#editor')
                        .addClass('hide'), this.closeOverlay('#modules'), this.parsedInstructions || this.displayInstructions(), m('#outputContainer')
                            .addClass('hide'), m('#blocklyCodeContainer')
                                .addClass('hide'), m('#instructionsContainer')
                                    .removeClass('hide'), m('#codeViewTab')
                                        .removeClass('active'), m('#codeOutputTab')
                                            .removeClass('active'), m('#instructionsTab')
                                                .addClass('active')
            },
            displayInstructions: function () {
                if (typeof u !== 'undefined') {
                    var a = this
                    a._trinket.description || a.getUIType() !== 'owner' ? a.parsedInstructions = u(a._trinket.description) : a.parsedInstructions = q('addInstructionsTemplate'), m('#instructionsOutput')
                        .html(a.parsedInstructions), m('#instructionsActions')
                            .length && m('#instructionsActions')
                                .removeClass('hide')
                }
            },
            onEditInstructionsClick: function () {
                var a = this
                m('#instructionsActions')
                    .addClass('hide'), m('#instructionsToolbar')
                        .removeClass('hide'), m('#instructionsContainer')
                            .addClass('editor'), a.parsedInstructions = q('editInstructionsTemplate'), m('#instructionsOutput')
                                .empty(), m('#instructionsContainer')
                                    .append(a.parsedInstructions)
                var b = m('#instructionsContainer')
                    .height()
                l = ace.edit('embedded-instructions')
                var c = b - 65
                m('#embedded-instructions')
                    .height(c + 'px'), l.resize(), l.$blockScrolling = 1 / 0, l.setTheme('ace/theme/xcode'), l.getSession()
                        .setMode('ace/mode/markdown'), l.getSession()
                            .setUseSoftTabs(!0), l.getSession()
                                .setTabSize(2), l.setShowPrintMargin(!1), a._trinket.description !== null && a._trinket.description.length && l.getSession()
                                    .setValue(a._trinket.description, -1)
            },
            onCancelEditInstructionsClick: function () {
                var a = this
                m('#instructionsContainer')
                    .removeClass('editor'), m('#instructionsToolbar')
                        .addClass('hide'), m('#instructionsActions')
                            .removeClass('hide'), l && l.destroy(), m('#embedded-instructions')
                                .remove(), a.displayInstructions()
            },
            onSaveInstructionsClick: function (a) {
                var b = this
                    , c = l.getValue();
                m("#save-instructions").find("i").removeClass().addClass("fa fa-save"),
                    b._trinket.description = c,
                    m("#instructionsContainer").removeClass("editor"),
                    m("#instructionsToolbar").addClass("hide"),
                    m("#instructionsActions").removeClass("hide"),
                    l && l.destroy(),
                    m("#embedded-instructions").remove(),
                    b.displayInstructions()
            },
            setKey: function (a, b) {
                this._varProxy[a] = b
            },
            getKey: function (a) {
                return this._varProxy[a]
            }
        }, window.TrinketAPI), window.TrinketApp = new i(window.trinketObject, window.draftObject), window.parent) {
            if (window.TrinketApp._queryString && window.TrinketApp._queryString.inLibrary) window.parent.postMessage('TrinketApp ready', a(''))
            else if (window.TrinketApp.assignment) {
                window.parent.postMessage('TrinketApp ready', '*')
                var v = window.TrinketApp.serialize()
                v._initial = !0, window.parent.postMessage(v, '*')
            }
        }
    }),
    (function () {
        function a(a, b) {
            var c = window.TrinketIO['import']('utils.cache')
            var d = c.get('user-log')
            var e = document.cookie.match(/session=([^;]+);/)
            a = a || $('#requestedLogin')
                .val(), b = b || $('#whoami')
                    .val(), d || (d = {
                        log: [],
                        user: b
                    }), d.log.push({
                        time: Date.now(),
                        user: b || '',
                        requested: a || '',
                        path: window.location.href,
                        referrer: document.referrer,
                        userAgent: navigator.userAgent,
                        sesh: e ? e[1] : ''
                    }), a && a !== b || !a && b && d.user !== b, d.user = b, d.log.length > 10 && (d.log = d.log.slice(d.log.length - 10)), c.set('user-log', d)
        }
        window.TrinketIO['export']('debug.sessions', {
            onLogin: function (b, c) {
                (b === c.username || b === c.email) && (b = c.username), a(b, c.username)
            }
        }), $(function () {
            a()
        })
    }()),
    (function (a, b) {
        'use strict'

        function c(a) {
            e(document.getElementById(a))
        }

        function d(a) {
            $('.' + a)
                .click(function (a) {
                    e($(a.target)[0])
                })
        }

        function e(b) {
            if (document.selection) {
                var c = document.body.createTextRange()
                c.moveToElementText(b), c.select()
            } else if (a.getSelection) {
                var c = document.createRange()
                c.selectNodeContents(b), a.getSelection()
                    .removeAllRanges(), a.getSelection()
                        .addRange(c)
            }
        }
        b['export']('utils.selectText', {
            byId: c,
            byClass: d
        })
    }(window, window.TrinketIO)),
    (function (a, b) {
        function c() {
            var a = {
                autorunEmbed: {
                    paramName: 'start',
                    paramValue: 'result'
                },
                hideGeneratedCodeEmbed: {
                    paramName: 'hideGeneratedCode',
                    paramValue: 'true'
                },
                showInstructionsEmbed: {
                    paramName: 'showInstructions',
                    paramValue: 'true'
                },
                showInstructionsShare: {
                    paramName: 'showInstructions',
                    paramValue: 'true'
                }
            }
            $('input:checkbox.checkboxToggle')
                .change(function (b) {
                    var c; var d; var f; var g; var h = $(b.target)
                    var i = $(h)
                        .val()
                    var j = b.target.name
                    var k = a[j].paramName
                    var l = $('#' + i)
                    var m = l.text()
                    var n = []
                    var o = ''
                    i === 'shareUrl' ? (c = $('#displayOptionLink')
                        .data('trinket-shortCode'), d = new RegExp(c + '.*'), f = '') : (c = $('#displayOptionEmbed')
                            .data('trinket-shortCode'), d = new RegExp(c + '[^"]*"'), f = '"'), $(h)
                                .is(':checked') ? e[k] = a[j].paramValue : e[k] = '', e.runMode = $(h)
                                    .prev()
                                    .data('trinket-runMode') || ''
                    for (var p in e) e[p] && n.push(p + '=' + e[p])
                    n.length && (o = '?' + n.join('&')), g = m.replace(d, c + o + f), l.text(g)
                }), $(':input.runOptions')
                    .change(function (a) {
                        var b; var c; var d; var f = $(a.target)
                        var g = $(f)
                            .data('type')
                        var h = $(f)
                            .val()
                        var i = $('#' + g)
                        var j = i.text()
                        var k = $(f)
                            .data('trinket-shortCode')
                        var l = []
                        var m = ''
                        g === 'shareUrl' ? (b = new RegExp(k + '.*'), c = '') : (b = new RegExp(k + '[^"]*"'), c = '"'), e.runOption = h, e.runMode = $(f)
                            .data('trinket-runMode') || ''
                        for (var n in e) e[n] && l.push(n + '=' + e[n])
                        l.length && (m = '?' + l.join('&')), d = j.replace(b, k + m + c), i.text(d)
                    }), $(':input.displayOptions')
                        .change(function (a) {
                            var b; var c; var d; var f = $(a.target)
                            var g = $(f)
                                .data('type')
                            var h = $(f)
                                .val()
                            var i = $('#' + g)
                            var j = i.text()
                            var k = $(f)
                                .data('trinket-shortCode')
                            var l = []
                            var m = ''
                            g === 'shareUrl' ? (b = new RegExp(k + '.*'), c = '') : (b = new RegExp(k + '[^"]*"'), c = '"'), e.outputOnly = '', e.toggleCode = '', h && typeof e[h] !== 'undefined' && (e[h] = 'true'), e.runMode = $(f)
                                .data('trinket-runMode') || ''
                            for (var n in e) e[n] && l.push(n + '=' + e[n])
                            l.length && (m = '?' + l.join('&')), d = j.replace(b, k + m + c), i.text(d)
                        })
        }

        function d() {
            e = {
                outputOnly: '',
                toggleCode: '',
                runOption: '',
                start: '',
                runMode: '',
                hideGeneratedCode: '',
                showInstructions: ''
            }
        }
        var e
        d(), b['export']('trinket.share', {
            init: c,
            resetParams: d
        })
    }(window, window.TrinketIO)),
    (function (a) {
        function b() {
            if (typeof h === 'undefined' && $('#roles')
                .length && $('#roles')
                    .val()
                    .length) {
                try {
                    var a = $('#roles')
                        .val()
                        .split('+')
                    var b = a[0]
                    var c = a.slice(1)
                        .join('+')
                    var d = CryptoJS.AES.decrypt(c, b)
                    h = JSON.parse(CryptoJS.enc.Utf8.stringify(d))
                } catch (c) {
                    console.log('roles decrypt error:', c)
                }
            }
        }

        function c(a, c, d) {
            b(), d = _.extend(d || {}), c || (c = 'site'), d.id && (c = c + ':' + d.id)
            var e = _.find(h, function (a) {
                return a.context === c
            })
            return e && e.permissions.indexOf(a) >= 0 ? e.thru && e.thru[a] ? Array.isArray(e.thru[a]) ? _.some(e.thru[a], function (a) {
                return a instanceof Object ? _.some(_.values(a), function (a) {
                    return moment()
                        .isBefore(a)
                }) : moment()
                    .isBefore(a)
            }) : moment()
                .isBefore(e.thru[a]) : !0 : !1
        }

        function d(a, c, d) {
            b(), d = _.extend(d || {}), c || (c = 'site'), d.id && (c = c + ':' + d.id)
            var e = _.find(h, function (a) {
                return a.context === c
            })
            return e && e.roles.indexOf(a) >= 0 ? e.thru && e.thru[a] ? moment()
                .isBefore(e.thru[a]) : !0 : !1
        }

        function e(a, c) {
            b(), c = _.extend(c || {}), a || (a = 'site'), c.id && (a = a + ':' + c.id)
            var d = _.find(h, function (b) {
                return b.context === a
            })
            return d && d.roles.length
        }

        function f() {
            var a = !1
            var c = this
            return b(), h && h.forEach(function (b) {
                /^group/.test(b.context) && c.hasRole('group-member', b.context) && (a = !0)
            }), a
        }

        function g(a) {
            var c = {}
            return b(), h && (c = _.find(h, function (b) {
                return b.context === a
            })), c
        }
        var h
        a['export']('trinket.roles', {
            hasPermission: c,
            hasRole: d,
            inGroup: f,
            getByContext: g,
            hasAnyRole: e
        })
    }(window.TrinketIO)),
    (function () {
        var a; var b; var c; var d; var e; var f; var g; var h; var i; var j; var k; var l; var m; var n; var o; var p; var q; var r; var s; var t; var u; var v; var w; var x; var y; var z; var A; var B; var C; var D; var E; var F; var G; var H; var I; var J; var K; var L; var M; var N = function (a, b) {
            return function () {
                return a.apply(b, arguments)
            }
        }
        var O = [].slice
        a = jQuery, J = 0, K = 1, L = 2, A = 13, G = 9, x = 46, w = 8, C = 37, F = 39, H = 38, y = 40, B = 36, z = 35, E = 33, D = 34, j = 'jqconsole-', e = j + 'cursor', f = j + 'header', k = j + 'prompt', l = k + '-text', i = j + 'old-prompt', g = j + 'input', h = j + 'old-input', d = j + 'blurred', u = 'keypress', r = '<span/>', p = '<div/>', q = ':empty', I = '\n', o = '>>> ', n = '... ', m = 2, c = j + 'ansi-', s = '', t = /\[(\d*)(?:;(\d*))*m/, b = (function () {
            function a() {
                this.stylize = N(this.stylize, this), this._closeSpan = N(this._closeSpan, this), this._openSpan = N(this._openSpan, this), this.getClasses = N(this.getClasses, this), this._style = N(this._style, this), this._color = N(this._color, this), this._remove = N(this._remove, this), this._append = N(this._append, this), this.klasses = []
            }
            return a.prototype.COLORS = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'], a.prototype._append = function (a) {
                return a = '' + c + a, this.klasses.indexOf(a) === -1 ? this.klasses.push(a) : void 0
            }, a.prototype._remove = function () {
                var a, b, d, e, f, g
                for (e = arguments.length >= 1 ? O.call(arguments, 0) : [], g = [], b = 0, f = e.length; f > b; b++) {
                    d = e[b], d === 'fonts' || d === 'color' || d === 'background-color' ? g.push(this.klasses = (function () {
                        var b, e, f, g
                        for (f = this.klasses, g = [], b = 0, e = f.length; e > b; b++) a = f[b], a.indexOf(d) !== c.length && g.push(a)
                        return g
                    }.call(this))) : (d = '' + c + d, g.push(this.klasses = (function () {
                        var b, c, e, f
                        for (e = this.klasses, f = [], b = 0, c = e.length; c > b; b++) a = e[b], a !== d && f.push(a)
                        return f
                    }.call(this))))
                }
                return g
            }, a.prototype._color = function (a) {
                return this.COLORS[a]
            }, a.prototype._style = function (a) {
                if (a === '' && (a = 0), a = parseInt(a), !isNaN(a)) {
                    switch (a) {
                        case 0:
                            return this.klasses = []
                        case 1:
                            return this._append('bold')
                        case 2:
                            return this._append('lighter')
                        case 3:
                            return this._append('italic')
                        case 4:
                            return this._append('underline')
                        case 5:
                            return this._append('blink')
                        case 6:
                            return this._append('blink-rapid')
                        case 8:
                            return this._append('hidden')
                        case 9:
                            return this._append('line-through')
                        case 10:
                            return this._remove('fonts')
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                            return this._remove('fonts'), this._append('fonts-' + (a - 10))
                        case 20:
                            return this._append('fraktur')
                        case 21:
                            return this._remove('bold', 'lighter')
                        case 22:
                            return this._remove('bold', 'lighter')
                        case 23:
                            return this._remove('italic', 'fraktur')
                        case 24:
                            return this._remove('underline')
                        case 25:
                            return this._remove('blink', 'blink-rapid')
                        case 28:
                            return this._remove('hidden')
                        case 29:
                            return this._remove('line-through')
                        case 30:
                        case 31:
                        case 32:
                        case 33:
                        case 34:
                        case 35:
                        case 36:
                        case 37:
                            return this._remove('color'), this._append('color-' + this._color(a - 30))
                        case 39:
                            return this._remove('color')
                        case 40:
                        case 41:
                        case 42:
                        case 43:
                        case 44:
                        case 45:
                        case 46:
                        case 47:
                            return this._remove('background-color'), this._append('background-color-' + this._color(a - 40))
                        case 49:
                            return this._remove('background-color')
                        case 51:
                            return this._append('framed')
                        case 53:
                            return this._append('overline')
                        case 54:
                            return this._remove('framed')
                        case 55:
                            return this._remove('overline')
                    }
                }
            }, a.prototype.getClasses = function () {
                return this.klasses.join(' ')
            }, a.prototype._openSpan = function (a) {
                return '<span class="' + this.getClasses() + '">' + a
            }, a.prototype._closeSpan = function (a) {
                return a + '</span>'
            }, a.prototype.stylize = function (a) {
                var b, c, d, e, f, g
                for (a = this._openSpan(a), d = 0;
                    (d = a.indexOf(s, d)) && d !== -1;) {
                    if (c = a.slice(d)
                        .match(t)) {
                        for (g = c.slice(1), e = 0, f = g.length; f > e; e++) b = g[e], this._style(b)
                        a = this._closeSpan(a.slice(0, d)) + this._openSpan(a.slice(d + 1 + c[0].length))
                    } else d++
                }
                return this._closeSpan(a)
            }, a
        }()), M = function (a, b) {
            return '<span class="' + a + '">' + (b || '') + '</span>'
        }, v = (function () {
            function c(c, d, e, g, h) {
                h == null && (h = !1), this._HideComposition = N(this._HideComposition, this), this._ShowComposition = N(this._ShowComposition, this), this._UpdateComposition = N(this._UpdateComposition, this), this._EndComposition = N(this._EndComposition, this), this._StartComposition = N(this._StartComposition, this), this._CheckComposition = N(this._CheckComposition, this), this._ProcessMatch = N(this._ProcessMatch, this), this._HandleKey = N(this._HandleKey, this), this._HandleChar = N(this._HandleChar, this), this.isMobile = !!navigator.userAgent.match(/iPhone|iPad|iPod|Android/i), this.isIos = !!navigator.userAgent.match(/iPhone|iPad|iPod/i), this.isAndroid = !!navigator.userAgent.match(/Android/i), this.auto_focus = !h, this.$window = a(window), this.header = d || '', this.prompt_label_main = typeof e === 'string' ? e : o, this.prompt_label_continue = g || n, this.indent_width = m, this.state = K, this.input_queue = [], this.input_callback = null, this.multiline_callback = null, this.history = [], this.history_index = 0, this.history_new = '', this.history_active = !1, this.shortcuts = {}, this.$container = a('<div/>')
                    .appendTo(c), this.$container.css({
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        position: 'absolute',
                        overflow: 'auto'
                    }), this.$console = a('<pre class="jqconsole"/>')
                        .appendTo(this.$container), this.$console.css({
                            margin: 0,
                            position: 'relative',
                            'min-height': '100%',
                            'box-sizing': 'border-box',
                            '-moz-box-sizing': 'border-box',
                            '-webkit-box-sizing': 'border-box'
                        }), this.$console_focused = !0, this.$input_container = a(p)
                            .appendTo(this.$container), this.$input_container.css({
                                position: 'absolute',
                                width: 1,
                                height: 0,
                                overflow: 'hidden'
                            }), this.$input_source = a(this.isAndroid ? '<input/>' : '<textarea/>'), this.$input_source.attr({
                                wrap: 'off',
                                autocapitalize: 'off',
                                autocorrect: 'off',
                                spellcheck: 'false',
                                autocomplete: 'off'
                            }), this.$input_source.css({
                                position: 'absolute',
                                width: 2
                            }), this.$input_source.appendTo(this.$input_container), this.$composition = a(p), this.$composition.addClass(j + 'composition'), this.$composition.css({
                                display: 'inline',
                                position: 'relative'
                            }), this.matchings = {
                                openings: {},
                                closings: {},
                                clss: []
                            }, this.ansi = new b(), this._InitPrompt(), this._SetupEvents(), this.Write(this.header, f), a(c)
                                .data('jqconsole', this)
            }
            return c.prototype.ResetHistory = function () {
                return this.SetHistory([])
            }, c.prototype.ResetShortcuts = function () {
                return this.shortcuts = {}
            }, c.prototype.ResetMatchings = function () {
                return this.matchings = {
                    openings: {},
                    closings: {},
                    clss: []
                }
            }, c.prototype.Reset = function () {
                this.state !== K && this.ClearPromptText(!0), this.state = K, this.input_queue = [], this.input_callback = null, this.multiline_callback = null, this.custom_control_key_handler = null, this.custom_keypress_handler = null, this.ResetHistory(), this.ResetShortcuts(), this.ResetMatchings(), this.$prompt.detach(), this.$input_container.detach(), this.$console.html(''), this.$prompt.appendTo(this.$console), this.$input_container.appendTo(this.$container), this.Write(this.header, f)
            }, c.prototype.GetHistory = function () {
                return this.history
            }, c.prototype.SetHistory = function (a) {
                return this.history = a.slice(), this.history_index = this.history.length
            }, c.prototype._CheckKeyCode = function (a) {
                if (a = isNaN(a) ? a.charCodeAt(0) : parseInt(a, 10), !(a > 0 && a < 256) || isNaN(a)) throw new Error('Key code must be a number between 0 and 256 exclusive.')
                return a
            }, c.prototype._LetterCaseHelper = function (a, b) {
                return b(a), a >= 65 && a <= 90 && b(a + 32), a >= 97 && a <= 122 ? b(a - 32) : void 0
            }, c.prototype.RegisterShortcut = function (a, b) {
                var c
                if (a = this._CheckKeyCode(a), typeof b !== 'function') throw new Error('Callback must be a function, not ' + b + '.')
                c = (function (a) {
                    return function (c) {
                        return c in a.shortcuts || (a.shortcuts[c] = []), a.shortcuts[c].push(b)
                    }
                }(this)), this._LetterCaseHelper(a, c)
            }, c.prototype.UnRegisterShortcut = function (a, b) {
                var c
                a = this._CheckKeyCode(a), c = (function (a) {
                    return function (c) {
                        return c in a.shortcuts ? b ? a.shortcuts[c].splice(a.shortcuts[c].indexOf(b), 1) : delete a.shortcuts[c] : void 0
                    }
                }(this)), this._LetterCaseHelper(a, c)
            }, c.prototype.GetColumn = function () {
                var a
                return this.$prompt_right.detach(), this.$prompt_cursor.text(''), a = this.$console.text()
                    .split(I), this.$prompt_cursor.html('&nbsp;'), this.$prompt_cursor.after(this.$prompt_right), a[a.length - 1].length
            }, c.prototype.GetLine = function () {
                return this.$console.text()
                    .split(I)
                    .length - 1
            }, c.prototype.ClearPromptText = function (a) {
                if (this.state === K) throw new Error('ClearPromptText() is not allowed in output state.')
                this.$prompt_before.html(''), this.$prompt_after.html(''), this.$prompt_label.text(a ? '' : this._SelectPromptLabel(!1)), this.$prompt_left.text(''), this.$prompt_right.text('')
            }, c.prototype.GetPromptText = function (b) {
                var c, d, e, f, g
                if (this.state === K) throw new Error('GetPromptText() is not allowed in output state.')
                return b ? (this.$prompt_cursor.text(''), g = this.$prompt.text(), this.$prompt_cursor.html('&nbsp;'), g) : (f = function (b) {
                    var c
                    return c = [], b.children()
                        .each(function () {
                            return c.push(a(this)
                                .children()
                                .last()
                                .text())
                        }), c.join(I)
                }, d = f(this.$prompt_before), d && (d += I), e = this.$prompt_left.text() + this.$prompt_right.text(), c = f(this.$prompt_after), c && (c = I + c), d + e + c)
            }, c.prototype.SetPromptText = function (a) {
                if (this.state === K) throw new Error('SetPromptText() is not allowed in output state.')
                this.ClearPromptText(!1), this._AppendPromptText(a), this._ScrollToEnd()
            }, c.prototype.SetPromptLabel = function (a, b) {
                this.prompt_label_main = a, b != null && (this.prompt_label_continue = b)
            }, c.prototype.UpdatePromptLabel = function () {
                var a, b
                return b = '>span+span>span:first-child', a = '.' + k + b, this.$console.find(a)
                    .text(this.prompt_label_main)
            }, c.prototype.Write = function (b, c, d) {
                var e
                return d == null && (d = !0), d && (b = this.ansi.stylize(a(r)
                    .text(b)
                    .html())), e = a(r)
                        .html(b), c != null && e.addClass(c), this.Append(e)
            }, c.prototype.Append = function (b) {
                var c
                return c = a(b)
                    .insertBefore(this.$prompt), this._ScrollToEnd(), this.$prompt_cursor.detach()
                        .insertAfter(this.$prompt_left), c
            }, c.prototype.Input = function (a) {
                var b, c, d, e
                if (this.state === L) {
                    d = this.input_callback, e = this.multiline_callback, c = this.history_active, b = this.async_multiline, this.AbortPrompt(), this.input_queue.unshift(function (a) {
                        return function () {
                            return a.Prompt(c, d, e, b)
                        }
                    }(this))
                } else if (this.state !== K) {
                    return void this.input_queue.push(function (b) {
                        return function () {
                            return b.Input(a)
                        }
                    }(this))
                }
                this.history_active = !1, this.input_callback = a, this.multiline_callback = null, this.state = J, this.$prompt.attr('class', g), this.$prompt_label.text(this._SelectPromptLabel(!1)), this.Focus(), this._ScrollToEnd()
            }, c.prototype.Prompt = function (a, b, c, d) {
                return this.state !== K ? void this.input_queue.push(function (e) {
                    return function () {
                        return e.Prompt(a, b, c, d)
                    }
                }(this)) : (this.history_active = a, this.input_callback = b, this.multiline_callback = c, this.async_multiline = d, this.state = L, this.$prompt.attr('class', k + ' ' + this.ansi.getClasses()), this.$prompt_label.text(this._SelectPromptLabel(!1)), this.auto_focus && this.Focus(), void this._ScrollToEnd())
            }, c.prototype.AbortPrompt = function () {
                var a
                if (this.state === K) throw new Error('Cannot abort prompt when not in prompt or input state.')
                a = this.GetPromptText(!0), this.state === J ? a.trim()
                    .length !== 0 && this.Write(a + I, h) : this.Write(a + I, i), this.ClearPromptText(!0), this.state = K, this.input_callback = this.multiline_callback = null, this._CheckInputQueue()
            }, c.prototype.Focus = function () {
                this.IsDisabled() || this.$input_source.focus()
            }, c.prototype.SetIndentWidth = function (a) {
                return this.indent_width = a
            }, c.prototype.GetIndentWidth = function () {
                return this.indent_width
            }, c.prototype.RegisterMatching = function (a, b, c) {
                var d
                return d = {
                    opening_char: a,
                    closing_char: b,
                    cls: c
                }, this.matchings.clss.push(c), this.matchings.openings[a] = d, this.matchings.closings[b] = d
            }, c.prototype.UnRegisterMatching = function (a, b) {
                var c
                return c = this.matchings.openings[a].cls, delete this.matchings.openings[a], delete this.matchings.closings[b], this.matchings.clss.splice(this.matchings.clss.indexOf(c), 1)
            }, c.prototype.Dump = function () {
                var b, c
                return b = this.$console.find('.' + f)
                    .nextUntil('.' + k)
                    .addBack(),
                    (function () {
                        var d, e, f
                        for (f = [], d = 0, e = b.length; e > d; d++) {
                            c = b[d], a(c)
                                .is('.' + i) ? f.push(a(c)
                                    .text()
                                    .replace(/^\s+/, '>>> ')) : f.push(a(c)
                                        .text())
                        }
                        return f
                    }())
                        .join('')
            }, c.prototype.GetState = function () {
                return this.state === J ? 'input' : this.state === K ? 'output' : 'prompt'
            }, c.prototype.Disable = function () {
                return this.$input_source.attr('disabled', !0), this.$input_source.blur()
            }, c.prototype.Enable = function () {
                return this.$input_source.attr('disabled', !1)
            }, c.prototype.IsDisabled = function () {
                return Boolean(this.$input_source.attr('disabled'))
            }, c.prototype.MoveToStart = function (a) {
                this._MoveTo(a, !0)
            }, c.prototype.MoveToEnd = function (a) {
                this._MoveTo(a, !1)
            }, c.prototype.Clear = function () {
                var a
                return a = this.state === J ? g : k, this.$console.find('.' + f)
                    .nextUntil('.' + a)
                    .addBack()
                    .text(''), this.$prompt_cursor.detach(), this.$prompt_right.before(this.$prompt_cursor)
            }, c.prototype._CheckInputQueue = function () {
                return this.input_queue.length ? this.input_queue.shift()() : void 0
            }, c.prototype._InitPrompt = function () {
                return this.$prompt = a(M(g))
                    .appendTo(this.$console), this.$prompt_before = a(r)
                        .appendTo(this.$prompt), this.$prompt_current = a(r)
                            .appendTo(this.$prompt), this.$prompt_after = a(r)
                                .appendTo(this.$prompt), this.$prompt_label = a(r)
                                    .appendTo(this.$prompt_current), this.$prompt_left = a(r)
                                        .appendTo(this.$prompt_current), this.$prompt_right = a(r)
                                            .appendTo(this.$prompt_current), this.$prompt_right.css({
                                                position: 'relative'
                                            }), this.$prompt_left.addClass(l), this.$prompt_cursor = a(M(e, '&nbsp;')), this.$prompt_cursor.insertBefore(this.$prompt_right), this.$prompt_cursor.css({
                                                color: 'transparent',
                                                display: 'inline',
                                                zIndex: 0
                                            }), this.isMobile ? void 0 : this.$prompt_cursor.css('position', 'absolute')
            }, c.prototype._SetupEvents = function () {
                return this.isMobile ? this.$console.click(function (a) {
                    return function (b) {
                        return b.preventDefault(), a.Focus()
                    }
                }(this)) : this.$console.mouseup(function (a) {
                    return function (b) {
                        var c
                        return b.which === 2 ? a.Focus() : (c = function () {
                            return window.getSelection()
                                .toString() ? void 0 : (b.preventDefault(), a.Focus())
                        }, setTimeout(c, 0))
                    }
                }(this)), this.$input_source.focus(function (a) {
                    return function () {
                        var b, c
                        return a._ScrollToEnd(), a.$console_focused = !0, a.$console.removeClass(d), c = function () {
                            return a.$console_focused ? a.$console.removeClass(d) : void 0
                        }, setTimeout(c, 100), b = function () {
                            return a.isIos && a.$console_focused ? a.$input_source.hide() : void 0
                        }, setTimeout(b, 500)
                    }
                }(this)), this.$input_source.blur(function (a) {
                    return function () {
                        var b
                        return a.$console_focused = !1, a.isIos && a.$input_source.show(), b = function () {
                            return a.$console_focused ? void 0 : a.$console.addClass(d)
                        }, setTimeout(b, 100)
                    }
                }(this)), this.$input_source.bind('paste', (function (a) {
                    return function () {
                        var b
                        return b = function () {
                            return a.in_composition ? void 0 : (a._AppendPromptText(a.$input_source.val()), a.$input_source.val(''), a.Focus())
                        }, setTimeout(b, 0)
                    }
                }(this))), this.$input_source.keypress(this._HandleChar), this.$input_source.keydown(this._HandleKey), this.$input_source.keydown(this._CheckComposition), this.$input_source.bind('compositionstart', this._StartComposition), this.$input_source.bind('compositionend', (function (a) {
                    return function (b) {
                        return setTimeout(function () {
                            return a._EndComposition(b)
                        }, 0)
                    }
                }(this))), this.isAndroid ? (this.$input_source.bind('input', this._StartComposition), this.$input_source.bind('input', this._UpdateComposition)) : this.$input_source.bind('text', this._UpdateComposition)
            }, c.prototype.SetKeyPressHandler = function (a) {
                return this.custom_keypress_handler = a
            }, c.prototype.SetControlKeyHandler = function (a) {
                return this.custom_control_key_handler = a
            }, c.prototype._HandleChar = function (a) {
                var b
                return this.state === K || a.metaKey || a.ctrlKey ? !0 : (b = a.which, b === 8 || b === 9 || b === 13 ? !1 : this.custom_keypress_handler != null && this.custom_keypress_handler.call(this, a) === !1 ? !1 : (this.$prompt_left.text(this.$prompt_left.text() + String.fromCharCode(b)), this._ScrollToEnd(), !1))
            }, c.prototype._HandleKey = function (b) {
                var c
                if (this.state === K) return !0
                if (c = b.keyCode || b.which, setTimeout(a.proxy(this._CheckMatchings, this), 0), this.custom_control_key_handler != null && this.custom_control_key_handler.call(this, b) === !1) return !1
                if (b.altKey) return !0
                if (b.ctrlKey || b.metaKey) return this._HandleCtrlShortcut(c)
                if (b.shiftKey) {
                    switch (c) {
                        case A:
                            this._HandleEnter(!0)
                            break
                        case G:
                            this._Unindent()
                            break
                        case H:
                            this._MoveUp()
                            break
                        case y:
                            this._MoveDown()
                            break
                        case E:
                            this._ScrollPage('up')
                            break
                        case D:
                            this._ScrollPage('down')
                            break
                        default:
                            return !0
                    }
                    return !1
                }
                switch (c) {
                    case A:
                        this._HandleEnter(!1)
                        break
                    case G:
                        this._Indent()
                        break
                    case x:
                        this._Delete(!1)
                        break
                    case w:
                        this._Backspace(!1)
                        break
                    case C:
                        this._MoveLeft(!1)
                        break
                    case F:
                        this._MoveRight(!1)
                        break
                    case H:
                        this._HistoryPrevious()
                        break
                    case y:
                        this._HistoryNext()
                        break
                    case B:
                        this.MoveToStart(!1)
                        break
                    case z:
                        this.MoveToEnd(!1)
                        break
                    case E:
                        this._ScrollPage('up')
                        break
                    case D:
                        this._ScrollPage('down')
                        break
                    default:
                        return !0
                }
                return !1
            }, c.prototype._HandleCtrlShortcut = function (a) {
                var b, c, d, e
                switch (a) {
                    case x:
                        this._Delete(!0)
                        break
                    case w:
                        this._Backspace(!0)
                        break
                    case C:
                        this._MoveLeft(!0)
                        break
                    case F:
                        this._MoveRight(!0)
                        break
                    case H:
                        this._MoveUp()
                        break
                    case y:
                        this._MoveDown()
                        break
                    case z:
                        this.MoveToEnd(!0)
                        break
                    case B:
                        this.MoveToStart(!0)
                        break
                    default:
                        if (a in this.shortcuts) {
                            for (e = this.shortcuts[a], c = 0, d = e.length; d > c; c++) b = e[c], b.call(this)
                            return !1
                        }
                        return !0
                }
                return !1
            }, c.prototype._HandleEnter = function (a) {
                var b, c
                return this._EndComposition(), a ? this._InsertNewLine(!0) : (c = this.GetPromptText(), b = (function (a) {
                    return function (b) {
                        var d, e, f, g, h, i
                        if (b !== !1) {
                            for (a.MoveToEnd(!0), a._InsertNewLine(!0), i = [], d = g = 0, h = Math.abs(b); h >= 0 ? h > g : g > h; d = h >= 0 ? ++g : --g) b > 0 ? i.push(a._Indent()) : i.push(a._Unindent())
                            return i
                        }
                        return f = a.state === J ? 'input' : 'prompt', a.Write(a.GetPromptText(!0) + I, j + 'old-' + f), a.ClearPromptText(!0), a.history_active && (a.history.length && a.history[a.history.length - 1] === c || a.history.push(c), a.history_index = a.history.length), a.state = K, e = a.input_callback, a.input_callback = null, e && e(c), a._CheckInputQueue()
                    }
                }(this)), this.multiline_callback ? this.async_multiline ? this.multiline_callback(c, b) : b(this.multiline_callback(c)) : b(!1))
            }, c.prototype._GetDirectionals = function (b) {
                var c, d, e, f, g, h, i, j
                return f = b ? this.$prompt_left : this.$prompt_right, c = b ? this.$prompt_right : this.$prompt_left, e = b ? this.$prompt_before : this.$prompt_after, d = b ? this.$prompt_after : this.$prompt_before, h = b ? a.proxy(this.MoveToStart, this) : a.proxy(this.MoveToEnd, this), g = b ? a.proxy(this._MoveLeft, this) : a.proxy(this._MoveRight, this), j = b ? 'last' : 'first', i = b ? 'prependTo' : 'appendTo', {
                    $prompt_which: f,
                    $prompt_opposite: c,
                    $prompt_relative: e,
                    $prompt_rel_opposite: d,
                    MoveToLimit: h,
                    MoveDirection: g,
                    which_end: j,
                    where_append: i
                }
            }, c.prototype._VerticalMove = function (a) {
                var b, c, d, e, f, g, h, i
                return h = this._GetDirectionals(a), d = h.$prompt_which, b = h.$prompt_opposite, c = h.$prompt_relative, f = h.MoveToLimit, e = h.MoveDirection, c.is(q) ? void 0 : (g = this.$prompt_left.text()
                    .length, f(), e(), i = d.text(), b.text(a ? i.slice(g) : i.slice(0, g)), d.text(a ? i.slice(0, g) : i.slice(g)))
            }, c.prototype._MoveUp = function () {
                return this._VerticalMove(!0)
            }, c.prototype._MoveDown = function () {
                return this._VerticalMove()
            }, c.prototype._HorizontalMove = function (b, c) {
                var d, e, f, g, h, i, j, k, l, m, n, o, p, s
                if (k = this._GetDirectionals(c), h = k.$prompt_which, e = k.$prompt_opposite, g = k.$prompt_relative, f = k.$prompt_rel_opposite, p = k.which_end, o = k.where_append, l = c ? /\w*\W*$/ : /^\w*\W*/, m = h.text()) {
                    if (b) {
                        if (s = m.match(l), !s) return
                        return s = s[0], n = e.text(), e.text(c ? s + n : n + s), j = s.length, h.text(c ? m.slice(0, -j) : m.slice(j))
                    }
                    return n = e.text(), e.text(c ? m.slice(-1) + n : n + m[0]), h.text(c ? m.slice(0, -1) : m.slice(1))
                }
                return g.is(q) ? void 0 : (i = a(r)[o](f), i.append(a(r)
                    .text(this.$prompt_label.text())), i.append(a(r)
                        .text(e.text())), d = g.children()[p]()
                            .detach(), this.$prompt_label.text(d.children()
                                .first()
                                .text()), h.text(d.children()
                                    .last()
                                    .text()), e.text(''))
            }, c.prototype._MoveLeft = function (a) {
                return this._HorizontalMove(a, !0)
            }, c.prototype._MoveRight = function (a) {
                return this._HorizontalMove(a)
            }, c.prototype._MoveTo = function (a, b) {
                var c, d, e, f, g, h, i
                if (h = this._GetDirectionals(b), e = h.$prompt_which, c = h.$prompt_opposite, d = h.$prompt_relative, g = h.MoveToLimit, f = h.MoveDirection, a) {
                    for (i = []; !d.is(q) || e.text() !== '';) g(!1), i.push(f(!1))
                    return i
                }
                return c.text(this.$prompt_left.text() + this.$prompt_right.text()), e.text('')
            }, c.prototype._Delete = function (a) {
                var b, c, d
                if (c = this.$prompt_right.text()) {
                    if (a) {
                        if (d = c.match(/^\w*\W*/), !d) return
                        return d = d[0], this.$prompt_right.text(c.slice(d.length))
                    }
                    return this.$prompt_right.text(c.slice(1))
                }
                return this.$prompt_after.is(q) ? void 0 : (b = this.$prompt_after.children()
                    .first()
                    .detach(), this.$prompt_right.text(b.children()
                        .last()
                        .text()))
            }, c.prototype._Backspace = function (b) {
                var c, d, e
                if (setTimeout(a.proxy(this._ScrollToEnd, this), 0), d = this.$prompt_left.text()) {
                    if (b) {
                        if (e = d.match(/\w*\W*$/), !e) return
                        return e = e[0], this.$prompt_left.text(d.slice(0, -e.length))
                    }
                    return this.isAndroid ? (this.$input_source.val(d.slice(0, -1)), this.$composition.text(d.slice(0, -1))) : this.$prompt_left.text(d.slice(0, -1))
                }
                return this.$prompt_before.is(q) ? void 0 : (c = this.$prompt_before.children()
                    .last()
                    .detach(), this.$prompt_label.text(c.children()
                        .first()
                        .text()), this.$prompt_left.text(c.children()
                            .last()
                            .text()))
            }, c.prototype._Indent = function () {
                var a
                return this.$prompt_left.prepend((function () {
                    var b, c, d
                    for (d = [], a = b = 1, c = this.indent_width; c >= 1 ? c >= b : b >= c; a = c >= 1 ? ++b : --b) d.push(' ')
                    return d
                }.call(this))
                    .join(''))
            }, c.prototype._Unindent = function () {
                var a, b, c, d, e
                for (c = this.$prompt_left.text() + this.$prompt_right.text(), e = [], a = b = 1, d = this.indent_width;
                    (d >= 1 ? d >= b : b >= d) && /^ /.test(c); a = d >= 1 ? ++b : --b) {
                    this.$prompt_left.text() ? this.$prompt_left.text(this.$prompt_left.text()
                        .slice(1)) : this.$prompt_right.text(this.$prompt_right.text()
                            .slice(1)), e.push(c = c.slice(1))
                }
                return e
            }, c.prototype._InsertNewLine = function (b) {
                var c, d, e
                return b == null && (b = !1), e = this._SelectPromptLabel(!this.$prompt_before.is(q)), c = a(r)
                    .appendTo(this.$prompt_before), c.append(a(r)
                        .text(e)), c.append(a(r)
                            .addClass(l)
                            .text(this.$prompt_left.text())), this.$prompt_label.text(this._SelectPromptLabel(!0)), b && (d = this.$prompt_left.text()
                                .match(/^\s+/)) ? this.$prompt_left.text(d[0]) : this.$prompt_left.text(''), this._ScrollToEnd()
            }, c.prototype._AppendPromptText = function (a) {
                var b, c, d, e, f, g
                for (e = a.split(I), this.$prompt_left.text(this.$prompt_left.text() + e[0]), f = e.slice(1), g = [], b = 0, c = f.length; c > b; b++) d = f[b], this._InsertNewLine(), g.push(this.$prompt_left.text(d))
                return g
            }, c.prototype._ScrollPage = function (a) {
                var b
                return b = this.$container[0].scrollTop, a === 'up' ? b -= this.$container.height() : b += this.$container.height(), this.$container.stop()
                    .animate({
                        scrollTop: b
                    }, 'fast')
            }, c.prototype._ScrollToEnd = function () {
                var a
                return this.$container.scrollTop(this.$container[0].scrollHeight), a = this.$prompt_cursor.position(), this.$input_container.css({
                    left: a.left,
                    top: a.top
                }), this.auto_focus ? setTimeout(this.ScrollWindowToPrompt.bind(this), 50) : void 0
            }, c.prototype.ScrollWindowToPrompt = function () {
                var a, b, c, d, e, f
                if (b = this.$prompt_cursor.height(), f = this.$window.scrollTop(), e = this.$window.scrollLeft(), a = document.documentElement.clientHeight, d = this.$prompt_cursor.offset(), c = d.top - 2 * b, this.isMobile && typeof orientation !== 'undefined' && orientation !== null) {
                    if (f < d.top || f > d.top) return this.$window.scrollTop(c)
                } else {
                    if (f + a < d.top) return this.$window.scrollTop(d.top - a + b)
                    if (f > c) return this.$window.scrollTop(d.top)
                }
            }, c.prototype._SelectPromptLabel = function (a) {
                return this.state === L ? a ? ' \n' + this.prompt_label_continue : this.prompt_label_main : a ? '\n ' : ' '
            }, c.prototype._Wrap = function (a, b, c) {
                var d, e
                return e = a.html(), d = e.slice(0, b) + M(c, e[b]) + e.slice(b + 1), a.html(d)
            }, c.prototype._WalkCharacters = function (a, b, c, d, e) {
                var f, g, h
                for (g = e ? a.length : 0, a = a.split(''), h = function () {
                    var b, c, d, f
                    return e ? (c = a, a = c.length >= 2 ? O.call(c, 0, b = c.length - 1) : (b = 0, []), f = c[b++]) : (d = a, f = d[0], a = d.length >= 2 ? O.call(d, 1) : []), f && (g += e ? -1 : 1), f
                }; f = h();) {
                    if (f === b ? d++ : f === c && d--, d === 0) {
                        return {
                            index: g,
                            current_count: d
                        }
                    }
                }
                return {
                    index: -1,
                    current_count: d
                }
            }, c.prototype._ProcessMatch = function (b, c, d) {
                var e, f, g, h, i, j, k, l, m, n, o, p
                return m = c ? [b.closing_char, b.opening_char] : [b.opening_char, b.closing_char], h = m[0], l = m[1], n = this._GetDirectionals(c), g = n.$prompt_which, f = n.$prompt_relative, i = 1, j = !1, p = g.html(), c || (p = p.slice(1)), d && c && (p = p.slice(0, -1)), o = this._WalkCharacters(p, h, l, i, c), k = o.index, i = o.current_count, k > -1 ? (this._Wrap(g, k, b.cls), j = !0) : (e = f.children(), e = c ? Array.prototype.reverse.call(e) : e, e.each(function (d) {
                    return function (e, f) {
                        var g, m
                        return g = a(f)
                            .children()
                            .last(), p = g.html(), m = d._WalkCharacters(p, h, l, i, c), k = m.index, i = m.current_count, k > -1 ? (c || k--, d._Wrap(g, k, b.cls), j = !0, !1) : void 0
                    }
                }(this))), j
            }, c.prototype._CheckMatchings = function (b) {
                var c, d, e, f, g, h, i
                for (e = b ? this.$prompt_left.text()
                    .slice(this.$prompt_left.text()
                        .length - 1) : this.$prompt_right.text()[0], i = this.matchings.clss, g = 0, h = i.length; h > g; g++) {
                    c = i[g], a('.' + c, this.$console)
                        .contents()
                        .unwrap()
                }
                if ((d = this.matchings.closings[e]) ? f = this._ProcessMatch(d, !0, b) : (d = this.matchings.openings[e]) ? f = this._ProcessMatch(d, !1, b) : b || this._CheckMatchings(!0), b) {
                    if (f) {
                        return this._Wrap(this.$prompt_left, this.$prompt_left.html()
                            .length - 1, d.cls)
                    }
                } else if (f) return this._Wrap(this.$prompt_right, 0, d.cls)
            }, c.prototype._HistoryPrevious = function () {
                return !this.history_active || this.history_index <= 0 ? void 0 : (this.history_index === this.history.length && (this.history_new = this.GetPromptText()), this.SetPromptText(this.history[--this.history_index]))
            }, c.prototype._HistoryNext = function () {
                return !this.history_active || this.history_index >= this.history.length ? void 0 : this.history_index === this.history.length - 1 ? (this.history_index++, this.SetPromptText(this.history_new)) : this.SetPromptText(this.history[++this.history_index])
            }, c.prototype._CheckComposition = function (a) {
                var b
                return b = a.keyCode || a.which, b === 229 ? this.in_composition ? this._UpdateComposition() : this._StartComposition() : void 0
            }, c.prototype._StartComposition = function () {
                return this.in_composition ? void 0 : (this.in_composition = !0, this._ShowComposition(), setTimeout(this._UpdateComposition, 0))
            }, c.prototype._EndComposition = function () {
                return this.in_composition ? (this._HideComposition(), this.$prompt_left.text(this.$prompt_left.text() + this.$composition.text()), this.$composition.text(''), this.$input_source.val(''), this.in_composition = !1) : void 0
            }, c.prototype._UpdateComposition = function (a) {
                var b
                return b = (function (a) {
                    return function () {
                        return a.in_composition ? a.$composition.text(a.$input_source.val()) : void 0
                    }
                }(this)), setTimeout(b, 0)
            }, c.prototype._ShowComposition = function () {
                return this.$composition.css('height', this.$prompt_cursor.height()), this.$composition.empty(), this.$composition.appendTo(this.$prompt_left)
            }, c.prototype._HideComposition = function () {
                return this.$composition.detach()
            }, c
        }()), a.fn.jqconsole = function (a, b, c, d) {
            return new v(this, a, b, c, d)
        }, a.fn.jqconsole.JQConsole = v, a.fn.jqconsole.Ansi = b
    }.call(this)),
    (function (a, b) {
        'use strict'

        function c(a, b) {
            var c = Date.now()
            return ['xxxxxxxx', 'xxxx', '4xxx', 'yxxx', 'xxxxxxxxxxxx'].join(typeof a === 'string' ? a : '-')
                .substr(0, b || 36)
                .replace(/[xy]/g, function (a) {
                    var b = (c + 16 * Math.random()) % 16 | 0
                    return c = Math.floor(c / 16), (a == 'x' ? b : 3 & b | 8)
                        .toString(16)
                })
        }
        b['export']('utils.guid', c)
    }(window, window.TrinketIO)), $.widget('trinket.assetBrowser', {
        options: {
            assets: [],
            libraryUrl: [],
            uploadUrl: '',
            linkAddUrl: '',
            selectedClass: 'selected',
            templateUrl: '/js/plugins/asset-browser.html',
            eventPrefix: 'asset-browser',
            openClass: 'open',
            assetsHowTo: '',
            guest: !0
        },
        altThumbnails: {
            audio: '<i class="fa fa-file-audio-o alt-thumbnail"></i>',
            ttf: '<i class="fa fa-font alt-thumbnail"></i>'
        },
        altMimeTypes: {
            wav: 'audio',
            mp3: 'audio',
            ogg: 'audio',
            mpeg: 'audio',
            midi: 'audio',
            webm: 'audio'
        },
        _create: function () {
            var a = this
            a._templates = {}, a._haveHidden = !1, a._showingHidden = !1, $.get(this.options.templateUrl)
                .then(function (b) {
                    a._setUpView(b)
                }), this._onAppEvent('view.addimage.show', $.proxy(a.openAddImageView, a)), this._onAppEvent('view.upload.show', $.proxy(a.openUploadImageView, a)), this._onAppEvent('close', $.proxy(a.hide, a)), this._onAppEvent('image.remove', $.proxy(a.removeImage, a)), this._onAppEvent('image.replace', $.proxy(a.replaceImage, a)), this._onAppEvent('image.restore', $.proxy(a.restoreImage, a)), this._onAppEvent('view.hidden', $.proxy(a.viewHidden, a)), this._dropzones = {}, $(this.element)
                    .on('click', '[data-event]', function (b) {
                        var c = $(this)
                            .data('event')
                        var d = $(this)
                            .closest('ul')
                            .data('image-id')
                        a.element.trigger(a.options.eventPrefix + '.' + c, [d])
                    }), this.options.guest && $(document)
                        .on('trinket.account.success', $.proxy(a.allowImageUpload, a))
        },
        _onAppEvent: function (a, b, c) {
            $(c || this.element)
                .on(this.options.eventPrefix + '.' + a, b)
        },
        _setUpView: function (a) {
            var b, c = this, d = $(a);
            this.options.lang === 'pygame' && d.find('[data-replace-text]')
                .each(function (a, b) {
                    $(b).text($(b).data('replace-text'))
                }), d.find('.template[template-id]').each(function (a, b) {
                    var e = $(b).attr('template-id')
                    c._templates[e] = $(b).detach().removeClass('template').removeAttr('template-id'),
                        c.element.empty().append(d)
                }), this._addTemplateEvents(d), this._templates.addImage.on('modal.init', $.proxy(this._loadLibrary, this)), this.options.assetsHowTo && (b = $(this.options.assetsHowTo), b.is('script') && (b = $(b.text())), this.element.find('.howto-message')
                    .append(b), this.element.find('.howto-container')
                        .show(), this._onAppEvent('view.howto.show', $.proxy(c.openHowToView, c)), $(document)
                            .foundation()), this._viewReady = !0, this._dropzoneReady = !1, this._refreshAssets()
        },
        _refreshAssets: function () {
            var a = this
            var b = a.element.find('#trinket-asset-list')
            this._viewReady && ($('#asset-list-wrapper')
                .show(), this.options.assets.length === 0 ? b.hide() : (b.empty(), b.show()), $.each(this.options.assets, function (c, d) {
                    var e = a._templates.imageInfo.clone()
                    a._initLibraryItem(e, d), b.append(e)
                }), a._sortList(b), $(document)
                    .foundation('reveal', 'reflow'))
        },
        _initLibraryItem: function (a, b) {
            var c; var d = this
            var e = 'image-' + b.id
            var f = /(?:\.([^.]+))?$/
            var g = f.exec(b.name)[1]
            if (this._addTemplateEvents(a), a.find('.title')
                .text(b.name), g && d.altMimeTypes[g] ? a.find('.thumbnail')
                    .replaceWith(d.altThumbnails[d.altMimeTypes[g]]) : g && d.altThumbnails[g] ? a.find('.thumbnail')
                        .replaceWith(d.altThumbnails[g]) : a.find('.thumbnail')
                            .attr('src', b.thumb || b.url), a.data('asset-id', b.id), a.addClass('asset-id-' + b.id), a.find('.click-for-dropzone')
                                .attr('id', 'item-dropzone-' + b.id), c = a.find('.owner-controls'), b.isDemo) {
                a.find('.demo')
                    .show(), c.hide()
            } else if (c.attr('data-dropdown', e), c.next('ul')
                .attr('id', e), c.next('ul')
                    .attr('data-image-id', b.id), c.closest('li.asset')
                        .attr('id', 'item-' + b.id), b.metrics && b.metrics.trinkets) {
                var h = 'Image used in ' + b.metrics.trinkets + ' '
                h += b.metrics.trinkets === 1 ? 'trinket' : 'trinkets', a.find('.thumbnail')
                    .after('<span class="trinket-stat"><div class="badge" title="' + h + '">' + b.metrics.trinkets + '</div></span>'), c.closest('li.asset')
                        .attr('data-used', !0)
            }
            this._onAppEvent('assets.remove', function () {
                a.find('.controls')
                    .hide(), a.find('.confirm-controls')
                        .show()
            }, a), this._onAppEvent('assets.confirm', function () {
                $.each(d.options.assets, function (a, c) {
                    return c.id === b.id ? (d.options.assets.splice(a, 1), d._refreshAssets(), d.element.trigger('assets.change'), !1) : void 0
                })
            }, a), this._onAppEvent('assets.cancel', function () {
                a.find('.confirm-controls')
                    .hide(), a.find('.controls')
                        .show()
            }, a), this._onAppEvent('assets.toggle', function () {
                a.hasClass(d.options.selectedClass) ? (a.removeClass(d.options.selectedClass), $.each(d.options.assets, function (c, e) {
                    return e.id === b.id ? (d.options.assets.splice(c, 1), d._refreshAssets(), d.element.trigger('assets.change'), a.attr('data-used') || a.find('.if-not-used')
                        .removeClass('hide'), !1) : void 0
                })) : (a.addClass(d.options.selectedClass), d._addToAssets(b), a.find('.if-not-used')
                    .addClass('hide'))
            }, a)
        },
        _addTemplateEvents: function (a) {
            var b = this
            return a.find('[events]')
                .each(function (a, c) {
                    var d; var e; var f; var g = $(c)
                        .attr('events')
                        .split(/\s*,\s*/)
                    for ($(c)
                        .off(), e = g.length; --e >= 0;) {
                        f = !1, $(c)
                            .data('if-broadcasting') && $(c)
                                .data('if-broadcasting') === 'disable' && (f = !0), d = g[e].split(/\s*:\s*/), $(c)
                                    .on(d[0], function (a) {
                                        f && void 0 !== window.window.TrinketAPI._receiverBroadcastState && window.TrinketAPI._receiverBroadcastState !== 'OFF' ? $('.broadcasting-assets-info')
                                            .show()
                                            .delay(5e3)
                                            .fadeOut() : $(this)
                                                .trigger(b.options.eventPrefix + '.' + d[1], {
                                                    originalEvent: a
                                                })
                                    })
                    }
                }), a
        },
        _initUpload: function () {
            var a = this
            var b = this.options.acceptedFiles || 'image/jpeg,image/png,image/gif,image/jpg'
            new Dropzone(a._templates.addImage.find('.dropzone')[0], {
                url: '/api/users/assets',
                acceptedFiles: b,
                dictDefaultMessage: '',
                clickable: '#select-to-upload',
                previewsContainer: '#preview-container',
                init: function () {
                    this.on('success', function (b, c) {
                        c.file.metrics = {
                            trinkets: 1
                        }, a._addToLibrary(c.file, 'top'), a._addToAssets(c.file)
                    })
                }
            }), a._onAppEvent('view.upload.hide', $.proxy(a.closeUploadImageView, a)), a._dropzoneReady = !0
        },
        _markSelected: function () {
            var a; var b = this
            var c = {}
            for (a = 0; a < b.options.assets.length; a++) c[b.options.assets[a].id] = b.options.assets[a]
            this._templates.addImage.find('.asset')
                .each(function (a) {
                    var d = $(this)
                    d.removeClass(b.options.selectedClass), c[d.data('asset-id')] && d.addClass(b.options.selectedClass)
                })
        },
        _addToAssets: function (a) {
            this.options.assets.push({
                url: a.url,
                name: a.name,
                id: a.id
            }), this.element.trigger('assets.change')
        },
        _addToLibrary: function (a, b) {
            var c = this._templates.addImage
            var d = a.hidden ? c.find('ul#hidden-asset-list') : c.find('ul#my-asset-list')
            var e = this._templates.libraryImageInfo.clone()
            return a.hidden ? e.find('.if-hidden')
                .removeClass('hide') : e.find('.if-not-hidden')
                    .removeClass('hide'), a.metrics && a.metrics.trinkets && e.find('.if-not-used')
                        .addClass('hide'), b = b || '', this._initLibraryItem(e, a), b === 'top' ? (d.prepend(e), e.addClass(this.options.selectedClass)) : d.append(e), a.hidden || e.addClass('clickable'), $(document)
                            .foundation('dropdown', 'reflow'), e
        },
        _loadLibrary: function () {
            var a = this
            var b = this._templates.addImage
            var c = b.find('ul#my-asset-list')
            this._addTemplateEvents(this._templates.addImage), c.empty(), $('#loadingContents')
                .show(), $.get(a.options.libraryUrl)
                    .then(function (b) {
                        var c; var d = b.files || []
                        for (c = 0; c < d.length; c++) {
                            a._addToLibrary(d[c]), !a._haveHidden && d[c].hidden && (a.element.find('.have-hidden')
                                .removeClass('hide'), a._haveHidden = !0)
                        }
                        $(document)
                            .foundation('dropdown', 'reflow'), a._markSelected(), a._templates.addImage.on('modal.show', $.proxy(a._markSelected, a)), a._templates.addImage.on('modal.hide', $.proxy(a._refreshAssets, a)), $('#loadingContent')
                                .hide()
                    })
        },
        _showModal: function (a) {
            var b = this
            this._modal && (this._modal.hide(), this._modal.trigger('modal.hide')), $.contains(document, a[0]) || ($('#asset-viewer-contents')
                .append(a), a.trigger('modal.init'), a.find('.closer, .addimage-done')
                    .click(function () {
                        b._modal && (b._modal.trigger('modal.hide'), b._modal.hide(), b._modal = void 0)
                    })), this._modal = a, this._modal.show(), this._modal.trigger('modal.show')
        },
        assets: function (a) {
            if (void 0 !== a) {
                if (!Array.isArray(a)) throw new Error('trinket.codeEditor.assets expects an array, but got ' + a)
                this.options.assets = a, this._refreshAssets()
            }
            return this.options.assets
        },
        show: function () {
            this.element.addClass(this.options.openClass)
        },
        hide: function () {
            this.element.removeClass(this.options.openClass)
        },
        openUploadImageView: function () {
            var a = this
            a.options.guest ? ($('#upload-guest')
                .fadeIn(), $('#assetLogin')
                    .click(function (b) {
                        a.element.trigger('trinket.account.login', ['#assetAccount', {
                            action: $(b.target)
                                .data('action')
                        }])
                    })) : $('#upload-assets')
                        .fadeIn(function () {
                            a._dropzoneReady || a._initUpload()
                        }), $(document)
                            .foundation('dropdown', 'reflow')
        },
        openAddImageView: function () {
            $('#asset-list-wrapper')
                .hide(), this._showModal(this._templates.addImage)
        },
        closeUploadImageView: function () {
            $('#upload-assets')
                .fadeOut({
                    complete: function () {
                        $(document)
                            .foundation('dropdown', 'reflow')
                    }
                })
        },
        openHowToView: function () {
            $('#howto-message')
                .show()
        },
        allowImageUpload: function () {
            this.options.guest = !1, $('#upload-guest')
                .hide(), this._loadLibrary(), this.openUploadImageView()
        },
        openLinkView: function () {
            this._showModal(this._templates.imageLink)
        },
        removeImage: function (a, b) {
            var c; var d; var e = this
            $.ajax({
                url: '/api/users/assets/' + b,
                method: 'DELETE'
            })
                .done(function (a) {
                    c = e.element.find('#item-' + b), d = e.element.find('#hidden-asset-list'), c.fadeOut({
                        complete: function () {
                            d.append(c.detach()), e._sortList(d), e._haveHidden || e.element.find('.have-hidden')
                                .fadeIn(), c.find('.if-hidden')
                                    .removeClass('hide'), c.find('.if-not-hidden')
                                        .addClass('hide'), c.fadeIn()
                        }
                    })
                })
        },
        replaceImage: function (a, b) {
            var c = this
            var d = c.element.find('#item-' + b)
            var e = d.attr('data-used') || !1
            c._dropzones[b] || (c._dropzones[b] = new Dropzone('#item-' + b, {
                url: '/api/users/assets/' + b,
                acceptedFiles: 'image/jpeg,image/png,image/gif,image/jpg',
                dictDefaultMessage: '',
                clickable: '#item-dropzone-' + b,
                previewsContainer: '.hidden-previews',
                maxFiles: 1,
                init: function () {
                    this.on('success', function (a, e) {
                        d.find('.title')
                            .text(e.file.name), d.find('.thumbnail')
                                .attr('src', e.file.url)
                        for (var f = 0; f < c.options.assets.length; f++) c.options.assets[f].id === b && (c.options.assets[f].url = e.file.url, c.options.assets[f].name = e.file.name)
                        c.element.trigger('assets.change'), $(document)
                            .foundation('dropdown', 'reflow')
                    }), this.on('maxfilesexceeded', function (a) {
                        try {
                            this.removeAllFiles()
                        } catch (b) { }
                        this.addFile(a)
                    }), this.on('uploadprogress', function (a, d, e) {
                        if (!c.element.find('li#item-' + b)
                            .has('.upload-progress')
                            .length) {
                            var f = c.element.find('.upload-progress')
                                .clone()
                            c.element.find('li#item-' + b)
                                .find('.asset-container')
                                .append(f)
                        }
                        var g = c.element.find('li#item-' + b)
                            .find('.upload-progress')
                        g.removeClass('hide'), g.find('span.meter')
                            .css('width', d + '%'), g.find('p.percent')
                                .text(Math.floor(d) + '%'), d === 100 && g.fadeOut(3e3, function () {
                                    g.remove()
                                })
                    })
                }
            })), e || this.element.find('#item-dropzone-' + b)
                .trigger('click')
        },
        viewHidden: function () {
            var a = this.element.find('#hidden-asset-list')
            a.prev('a')
                .fadeOut({
                    complete: function () {
                        a.fadeIn()
                    }
                })
        },
        restoreImage: function (a, b) {
            var c; var d = this
            $.post('/api/users/assets/restore', {
                fileId: b
            })
                .done(function (a) {
                    c = d.element.find('#item-' + b), $libraryList = d.element.find('#my-asset-list'), c.fadeOut({
                        complete: function () {
                            $libraryList.append(c.detach()), d._sortList($libraryList), c.find('.if-hidden')
                                .addClass('hide'), c.find('.if-not-hidden')
                                    .removeClass('hide'), c.fadeIn(), $(document)
                                        .foundation('dropdown', 'reflow')
                        }
                    })
                })
        },
        _sortList: function (a) {
            var b = a.find('li.asset')
            var c = $(b, a)
                .get()
            c.sort(function (a, b) {
                var c = $(a)
                    .text()
                    .toUpperCase()
                var d = $(b)
                    .text()
                    .toUpperCase()
                return d > c ? -1 : 1
            }), $.each(c, function (b, c) {
                a.append(c)
            }), $(document)
                .foundation('dropdown', 'reflow')
        }
    }),
    (function (a, b, c) {
        function d(a, b, c, d) {
            for (var e = 100; --e > 0 && a.height() - b <= 0;) c == d ? a.append("<div class='lineno lineselect _lineno_" + c + "_' role='presentation'>" + c + '</div>') : a.append("<div class='lineno _lineno_" + c + "_' role='presentation'>" + c + '</div>'), c++
            return c
        }

        function e(b, c) {
            var e = 1
            var f = a(b)
            var g = a('<textarea class="lined" autocorrect="off" autocapitalize="off" tabindex="0" role="textbox" aria-multiline="true" aria-label="Code Editor"></textarea>')
            f.append(g), g.attr('wrap', 'off'), g.css({
                resize: 'none'
            }), g.wrap("<div class='linedtextarea' role='tabpanel'></div>")
            var h = g.parent()
                .wrap("<div class='linedwrap'></div>")
            var i = h.parent()
            i.prepend("<div class='lines' aria-hidden='true'></div>")
            var j = i.find('.lines')
            j.append("<div class='codelines' data-filename='" + c.name + "' role='presentation'></div>")
            var k = j.find('.codelines')
            if (e = d(k, j.height(), 1, c.selectedLine), c.selectedLine != -1 && !isNaN(c.selectedLine)) {
                var l = parseInt(g.height() / (e - 2))
                var m = parseInt(l * c.selectedLine) - g.height() / 2
                g[0].scrollTop = m
            }
            var n = _.throttle(function (a) {
                var b = g[0]
                var f = b.scrollTop
                var h = b.clientHeight
                k.css({
                    'margin-top': -1 * f + 'px'
                }), e = d(k, f + h, e, c.selectedLine)
            }, 50)
            return g.scroll(n), c.onFocus && g.on('focus', c.onFocus), c.value && g.val(c.value, -1), a(window)
                .on('resize', n), {
                registerPlugin: function (a, b) { },
                destroy: function () {
                    i.remove(), g.remove(), f.empty(), a(window)
                        .off('resize', n)
                },
                addCommand: function (a, b, c) {
                    typeof r[a] === 'undefined' && (r[a] = {
                        key: b,
                        fn: c
                    })
                    var d = b.win.split('-');
                    (d.length === 2 || d.length === 3) && g.keydown(function (a) {
                        var b = !1
                        d.length === 2 ? s[d[1]].keyCodes.indexOf(a.keyCode) >= 0 && a[s[d[0]]] && (b = !0) : d.length === 3 && s[d[2]].keyCodes.indexOf(a.keyCode) >= 0 && a[s[d[0]]] && a[s[d[1]]] && (b = !0), b && c.call()
                    })
                },
                change: function (a) {
                    return g.on('input propertychange', a)
                },
                setValue: function (a) {
                    g.val(a, -1)
                },
                getValue: function () {
                    return g.val()
                },
                focus: function () {
                    return g.focus()
                },
                blur: function () {
                    return g.blur()
                },
                isFocused: function () {
                    return g.is(':focus')
                },
                setModeFromName: function (a) { },
                resize: function () { },
                highlight: function (b) {
                    a('.codelines[data-filename="' + c.name + '"]')
                        .find('._lineno_' + b + '_')
                        .addClass('lineselect'), a('textarea.lined')
                            .addClass('attention-error')
                },
                addQueueMarkers: function () { }
            }
        }

        function f(a, b, c, d) {
            var e; var f; var g = this.getSession()
                .lineWidgets
            var h = d.start.row
            var i = d.end.row - h
            if (i !== 0) {
                if (e = this.getSession()
                    .getLine(d.start.row), f = e.length, g) {
                    if (d.action == 'remove') {
                        !d.start.column && q[c][d.start.row + 1] && h--
                        var j = g.splice(h + 1, i)
                        var k = q[c].splice(h + 1, i)
                        j.forEach(function (a) {
                            a && this.removeLineWidget(a)
                        }, this.getSession()
                            .widgetManager), k.forEach(function (a) {
                                a && (delete o[a._commentId], b({
                                    _id: a._commentId,
                                    index: a._file
                                }), this.removeGutterDecoration(a.row, 'trinket-comment'), this.removeGutterDecoration(a.row, 'data-' + a._file + '-' + a._commentId), p[a._commentId] ? this.removeGutterDecoration(a.row, 'collapsed') : this.removeGutterDecoration(a.row, 'open'))
                            }, this.getSession())
                    } else {
                        f && f === d.start.column && h++
                        var l = new Array(i)
                        l.unshift(h, 0), g.splice.apply(g, l), q[c].splice.apply(q[c], l)
                    }
                    var m = !0
                    q[c].forEach(function (b, c) {
                        b && (m = !1, b.row !== c && a(b._file, b._commentId, c, !0))
                    }), m && (this.getSession()
                        .lineWidgets = null)
                } else {
                    if (d.action == 'remove') {
                        !d.start.column && q[c][d.start.row + 1] && h--
                        var n = q[c].splice(h + 1, i)
                        n.forEach(function (a) {
                            a && (delete o[a._commentId], b({
                                _id: a._commentId,
                                index: a._file
                            }), this.removeGutterDecoration(a.row, 'trinket-comment'), this.removeGutterDecoration(a.row, 'data-' + a._file + '-' + a._commentId), p[a._commentId] ? this.removeGutterDecoration(a.row, 'collapsed') : this.removeGutterDecoration(a.row, 'open'))
                        }, this.getSession())
                    } else {
                        f && f === d.start.column && h++
                        var l = new Array(i)
                        l.unshift(h, 0), q[c].splice.apply(q[c], l)
                    }
                    q[c].forEach(function (b, c) {
                        b && b.row !== c && a(b._file, b._commentId, c, !0)
                    })
                }
            }
        }

        function g(b, d) {
            function e(c) {
                a('.comment-warning')
                    .find('.close')
                    .click(), a(b)
                        .append(B({
                            message: c
                        })), a(document)
                            .foundation('alert', 'reflow')
            }

            function g(a) {
                a.which >= 16 && a.which <= 20 || e('Since one or more selected lines has a comment, first remove any comments or move them to other lines.')
            }

            function h(b) {
                var c; var e; var f = b.text
                var g = f.replace(/(?:\r\n|\r|\n)/g, '<br />')
                var h = moment(b.commentedOn)
                    .fromNow()
                var i = b.row
                var j = b._id
                var k = b.index
                var l = b.edited ? '(edited)' : ''
                var n = p[j] = b.collapsed || !1
                return d.editorOpts.canAddInlineComments && d.editorOpts.userId === b.userId ? e = 'inlineCommentActions' : d.editorOpts.assignmentViewOnly || (e = 'inlineCommentDismiss'), c = m(e, {
                    commentId: j,
                    index: k
                }), a.when(z(b.userId))
                    .done(function (d) {
                        v[b.userId] = d
                        var e = m('inlineCommentTemplate', {
                            comment: g,
                            avatar: d.avatar,
                            commentedOn: h,
                            username: d.username,
                            commentId: j,
                            edited: l,
                            commentText: f,
                            commentActions: c
                        })
                        var p = r.createElement('div')
                        p.innerHTML = e
                        var t = {
                            row: i,
                            fixedWidth: !0,
                            el: p,
                            _file: k,
                            _commentId: j,
                            _text: f
                        }
                        t.destroy = function () {
                            A.widgetManager.removeLineWidget(t), q[k][i] = void 0
                        }, n || (t = s.session.widgetManager.addLineWidget(t)), o[j] = t, q[k] || (q[k] = []), q[k][i] = t, s.session.addGutterDecoration(i, 'trinket-comment'), n ? s.session.addGutterDecoration(i, 'collapsed') : s.session.addGutterDecoration(i, 'open'), s.session.addGutterDecoration(i, 'data-' + k + '-' + j), a(t.el)
                            .find('.confirm-remove-comment')
                            .on('click', function (a) {
                                t.destroy()
                            })
                    })
            }
            var i = c.require('ace/ext/modelist')
            var j = i.getModeForPath('foo.' + d.ext)
            var k = c.require('ace/range')
                .Range
            var n = c.require('ace/line_widgets')
                .LineWidgets
            var r = c.require('ace/lib/dom')
            var s = c.edit(b)
            var t = []
            var u = []
            var v = {}
            s.$blockScrolling = 1 / 0, s.setTheme('ace/theme/xcode'), s.getSession()
                .setMode(j ? j.mode : 'ace/mode/text'), s.getSession()
                    .setUseSoftTabs(!0), s.getSession()
                        .setTabSize(2), s.setShowPrintMargin(!1), s.setFontSize('inherit'), s._fileName = d.name, s._addErrorBorder = !1
            var w = s.commands.byName.del
            var x = s.commands.byName.backspace
            var y = s.commands.byName.removeline
            if (s.commands.addCommand({
                name: x.name,
                bindKey: x.bindKey,
                exec: function (b) {
                    var c = b.getSession()
                        .selection.getCursor()
                    c.column === 0 && c.row > 0 && q[d.index] && q[d.index][c.row] && (q[d.index][c.row - 1] || b.getSession()
                        .getLine(c.row - 1)
                        .length) ? e('Since this line has a comment, first remove the comment or move it to another line.') : (a('.comment-warning')
                            .find('.close')
                            .click(), x.exec.call(this, b))
                }
            }), s.commands.addCommand({
                name: w.name,
                bindKey: w.bindKey,
                exec: function (b) {
                    var c = b.getSession()
                        .selection.getCursor()
                    var f = b.getSession()
                        .getLine(c.row)
                        .length
                    c.column === f && q[d.index] ? q[d.index][c.row] ? e('Since this line has a comment, first remove the comment or move it to another line.') : q[d.index][c.row + 1] && e('Since the next line has a comment, first remove the comment or move it to another line.') : (a('.comment-warning')
                        .find('.close')
                        .click(), w.exec.call(this, b))
                }
            }), s.commands.addCommand({
                name: y.name,
                bindKey: y.bindKey,
                exec: function (b) {
                    var c = b.getSession()
                        .selection.getCursor()
                    q[d.index] && q[d.index][c.row] ? e('To remove lines with comments, first remove the comment or move it to another line.') : (a('.comment-warning')
                        .find('.close')
                        .click(), y.exec.call(this, b))
                }
            }), s.getSession()
                .selection.on('changeCursor', function () {
                    a('.comment-warning')
                        .find('.close')
                        .click()
                }), s.getSession()
                    .selection.on('changeSelection', function (b) {
                        if (q[d.index] && !s.getSession()
                            .selection.isEmpty() && s.getSession()
                                .selection.isMultiLine()) {
                            var c; var e = s.getSession()
                                .selection.getRange()
                            var f = !1
                            for (c = e.start.row; c <= e.end.row; c++) q[d.index][c] && (f = !0)
                            s.setReadOnly(f), f ? a(s.textInput.getElement())
                                .data('keydown-handler') || (a(s.textInput.getElement())
                                    .on('keydown.trinket-comment', g), a(s.textInput.getElement())
                                        .data('keydown-handler', !0)) : (a(s.textInput.getElement())
                                            .data('keydown-handler') && (a(s.textInput.getElement())
                                                .off('keydown.trinket-comment', g), a(s.textInput.getElement())
                                                    .removeData('keydown-handler')), a('.comment-warning')
                                                        .find('.close')
                                                        .click())
                        } else {
                            s.setReadOnly(!1), a(s.textInput.getElement())
                                .data('keydown-handler') && (a(s.textInput.getElement())
                                    .off('keydown.trinket-comment', g), a(s.textInput.getElement())
                                        .removeData('keydown-handler')), a('.comment-warning')
                                            .find('.close')
                                            .click()
                        }
                    }), d.value && s.getSession()
                        .setValue(d.value), d.onFocus && s.on('focus', d.onFocus), d.comments && d.comments.length) {
                var z = function (b) {
                    return v[b] ? a.Deferred()
                        .resolve(v[b])
                        .promise() : a.get('/api/users/' + b + '/info')
                }
                var A = s.session
                A.widgetManager || (A.widgetManager = new n(A, {
                    updateOnChange: f.bind(s, d.onCommentChange, d.onCommentRemove, d.index)
                }), A.widgetManager.attach(s))
                for (var C = (A.getDocument()
                    .getLength(), []), D = 0; D < d.comments.length; D++) C.push(h(d.comments[D]))
                a.when.apply(a, C)
                    .then(function () {
                        l(A, d.index)
                    })
            }
            return {
                registerPlugin: function (a, b) {
                    a.initialize(s, b)
                },
                destroy: function () {
                    s.destroy(), a(b)
                        .empty()
                },
                addCommand: function (a, b, c) {
                    s.commands.addCommand({
                        name: a,
                        bindKey: b,
                        exec: c
                    })
                },
                change: function (a) {
                    var b = this
                    return s.getSession()
                        .on('change', function () {
                            b.removeMarkers(), a()
                        })
                },
                setValue: function (a) {
                    s.setValue(a, -1)
                },
                getValue: function () {
                    return s.getValue()
                },
                focus: function (a) {
                    return a === 0 ? s.navigateFileStart() : a === -1 && s.navigateFileEnd(), s.focus()
                },
                blur: function () {
                    s.blur()
                },
                isFocused: function () {
                    return s.isFocused()
                },
                setModeFromName: function (a) {
                    var b = i.getModeForPath(a)
                    var c = s._fileName
                    s._fileName = a, s._emit('file.rename', {
                        oldName: c,
                        newName: a
                    }), s.getSession()
                        .setMode(b ? b.mode : 'ace/mode/text')
                },
                resize: function (a) {
                    s.resize(a)
                },
                highlight: function (b, c) {
                    var d = s.getSession()
                        .getLine(b - 1)
                    if (c) t.push(b), s._addErrorBorder = !0
                    else {
                        var e = new k(b - 1, 0, b - 1, d.length)
                        u.push(s.getSession()
                            .addMarker(e, 'highlight-line-error', 'fullLine')), a('.ace_content')
                                .addClass('attention-error')
                    }
                },
                addQueueMarkers: function () {
                    for (var b = 0; b < t.length; b++) this.highlight(t[b])
                    t = [], s._addErrorBorder && (a('.ace_content')
                        .addClass('attention-error'), s._addErrorBorder = !1)
                },
                removeMarkers: function () {
                    for (var a = 0; a < u.length; a++) {
                        s.getSession()
                            .removeMarker(u[a])
                    }
                    u = [], t = []
                },
                getSession: function () {
                    return s.getSession()
                },
                setReadOnly: function (a) {
                    s.setReadOnly(a)
                },
                scrollToLine: function (a, b, c, d) {
                    s.scrollToLine(a, b, c, d)
                },
                aceInstance: s,
                renderer: s.renderer,
                keyBinding: s.keyBinding,
                addCommentWidget: function () {
                    var c; var e; var g; var h; var i; var j; var k = this.options.userId
                    var t = '/api/users/' + k + '/avatar'
                    var u = a('#whoami')
                        .val()
                    var v = d.index
                    return c = s.getCursorPosition(), (e = _.findKey(o, function (a) {
                        return a.row === c.row && a._file === v
                    })) ? (p[e] && a('div.ace_gutter-cell.trinket-comment.data-' + v + '-' + e)
                        .trigger('click'), void a("a.edit-inline-comment[data-comment-id='" + e + "']")
                            .trigger('click')) : (g = s.session, g.widgetManager || (g.widgetManager = new n(g, {
                                updateOnChange: f.bind(s, d.onCommentChange, d.onCommentRemove, v)
                            }), g.widgetManager.attach(s)), s.scrollToLine(c.row, !0, !0), h = r.createElement('div'), h.innerHTML = m('addInlineCommentTemplate', {
                                avatar: t,
                                username: u,
                                commentId: v + '_' + c.row,
                                index: v
                            }), i = {
                                row: c.row,
                                fixedWidth: !0,
                                el: h,
                                _file: v,
                                _commentId: v + '_' + c.row
                            }, i.destroy = function () {
                                g.widgetManager.removeLineWidget(i), delete o[i._commentId], l(g, i._file)
                            }, i = g.widgetManager.addLineWidget(i), o[i._commentId] = i, l(g, v), j = a(i.el)
                                .find('textarea.inline-comment-text'),
                                j.focus(), a(i.el)
                                    .find('.cancel-inline-comment')
                                    .on('click', function (a) {
                                        i.destroy()
                                    }), void a(i.el)
                                        .find('.save-inline-comment')
                                        .on('click', function (c) {
                                            var e = j.val()
                                            var f = e.replace(/(?:\r\n|\r|\n)/g, '<br />')
                                            var h = moment()
                                                .subtract(2, 'seconds')
                                            var n = s._fileName + i.row + h
                                            var w = CryptoJS.MD5(n)
                                                .toString(CryptoJS.enc.Hex)
                                                .substring(0, 16)
                                            var x = m('inlineCommentActions', {
                                                commentId: w,
                                                index: v
                                            })
                                            var y = m('inlineCommentTemplate', {
                                                comment: f,
                                                avatar: t,
                                                username: u,
                                                commentedOn: h.fromNow(),
                                                commentText: e,
                                                commentActions: x,
                                                commentId: w
                                            })
                                            var z = r.createElement('div')
                                            z.innerHTML = y, a(document)
                                                .foundation('dropdown', 'reflow')
                                            var A = {
                                                row: i.row,
                                                fixedWidth: !0,
                                                el: z,
                                                _file: v,
                                                _commentId: w,
                                                _text: e
                                            }
                                            A.destroy = function () {
                                                g.widgetManager.removeLineWidget(A), q[v][A.row] = void 0
                                            }, i.destroy(), A = s.session.widgetManager.addLineWidget(A), s.session.addGutterDecoration(A.row, 'trinket-comment'), s.session.addGutterDecoration(A.row, 'open'), s.session.addGutterDecoration(A.row, 'data-' + v + '-' + w), o[w] = A, p[w] = !1, q[v] || (q[v] = []), q[v][A.row] = A, l(g, v), a(b)
                                                .trigger('comment.added', {
                                                    row: A.row,
                                                    text: e,
                                                    commentedOn: h,
                                                    _id: w,
                                                    fileName: s._fileName,
                                                    index: d.index,
                                                    userId: k,
                                                    edited: !1,
                                                    collapsed: !1
                                                }), a(b)
                                                    .find('.confirm-remove-comment')
                                                    .on('click', function (a) {
                                                        A.destroy()
                                                    })
                                        }))
                }
            }
        }

        function h(a, b) {
            var c = {
                value: b.value
            }
            return {
                registerPlugin: function (a, b) { },
                destroy: function () { },
                addCommand: function (a, b, c) { },
                change: function (a) {
                    a()
                },
                setValue: function (a) {
                    return c.value = a, a
                },
                getValue: function () {
                    return c.value
                },
                focus: function () { },
                blur: function () { },
                isFocused: function () {
                    return !1
                },
                setModeFromName: function (a) { },
                resize: function () { },
                highlight: function (a) { },
                addQueueMarkers: function () { }
            }
        }

        function i(b, c) {
            var d; var e = {
                value: c.value
            }
            return d = a('<img />', {
                src: c.value
            }), a(b)
                .html(d), {
                registerPlugin: function (a, b) { },
                destroy: function () { },
                addCommand: function (a, b, c) { },
                change: function (a) {
                    a()
                },
                setValue: function (a) {
                    return e.value = a, a
                },
                getValue: function () {
                    return e.value
                },
                focus: function () { },
                blur: function () { },
                isFocused: function () {
                    return !1
                },
                setModeFromName: function (a) { },
                resize: function () { },
                highlight: function (a) { },
                addQueueMarkers: function () { }
            }
        }

        function j(a, b, c, d) {
            var e = o[b]
            var f = e.row
            var g = this._files[a].editor.getSession()
            g.removeGutterDecoration(f, 'trinket-comment'), g.removeGutterDecoration(f, 'data-' + a + '-' + b), g.addGutterDecoration(c, 'trinket-comment'), g.addGutterDecoration(c, 'data-' + a + '-' + b), p[b] ? (g.removeGutterDecoration(f, 'collapsed'), g.addGutterDecoration(c, 'collapsed')) : (g.removeGutterDecoration(f, 'open'), g.addGutterDecoration(c, 'open')), d ? e.row = c : (g.widgetManager.removeLineWidget(e), e.row = c, g.widgetManager.addLineWidget(e), q[a] || (q[a] = []), q[a][f] = void 0, q[a][c] = e), l(g, a), this._updateComment({
                _id: b,
                index: a,
                data: {
                    row: c
                }
            })
        }

        function k(a, b) {
            return _.findKey(o, function (c) {
                return c._file === a && c.row === b
            })
        }

        function l(b, c) {
            var d = b.getDocument()
                .getLength()
            _.each(o, function (b, e) {
                b._file === c && (!b.row || k(b._file, b.row - 1) ? a(b.el)
                    .find('.move-comment-up')
                    .addClass('disabled') : a(b.el)
                        .find('.move-comment-up')
                        .removeClass('disabled'), d - 1 === b.row || k(b._file, b.row + 1) ? a(b.el)
                            .find('.move-comment-down')
                            .addClass('disabled') : a(b.el)
                                .find('.move-comment-down')
                                .removeClass('disabled'))
            })
        }
        var m = b['import']('utils.template')
        var n = {}
        var o = {}
        var p = {}
        var q = []
        var r = {}
        var s = {
            Enter: {
                keyCodes: [10, 13]
            },
            Ctrl: 'ctrlKey',
            Shift: 'shiftKey'
        }
        var t = a('<div class="code-editor" data-interface="code-editor"><div class="tab-nav"><dl class="left-options"><dd class="tab-button"><a class="tab-scroll-link left-arrow" data-direction="-1"><i class="fa fa-chevron-left"></i></a></dd><dd class="tab-button"><a class="tab-scroll-link right-arrow" data-direction="1"><i class="fa fa-chevron-right"></i></a></dd></dl><dl class="scrollable-content" role="tablist" aria-label="File tabs"></dl><dl class="right-options"></dl><div class="clearfix"></div></div><div class="file-content-container"></div><div class="info-area collapsed"><div class="info-quick"></div><div class="scroll-wrap"><div class="info-full"></div></div><a class="expander fa"></a></div></div>')
        var u = a('<div class="file-content"></div>')
        var v = a('<div class="binary-file"><div><p>This is a binary file created by your program. It is not viewable and will not be saved with your trinket.</p></div></div>')
        var w = a('<div class="tab-options" role="button"><ul><li><a class="file-remove-link menu-button" data-action="file.remove"><i class="fa fa-trash"></i></a></li><li><a class="file-rename-link menu-button" data-action="file.rename"><i class="fa fa-pencil"></i></a></li></ul></div>')
        var x = m.compile('<dd class="tab"><a class="file-tab-link" aria-label="{{name}} tab" role="tab"><span class="file-name">{{name}}</span><span class="tab-options-link menu-button" data-action="file.options" role="button" tabindex="0"></span></a></dd>')
        var y = m.compile('<input type="text" class="file-name-input" value="{{name}}" placeholder="file name" aria-label="Edit {{name}} filename">')
        var z = m.compile('<div data-alert class="file-name-error alert-box alert">{{message}}<a class="close">&times;</a></div>')
        var A = m.compile('<div data-alert class="file-remove-info alert-box info" data-interface="code-editor">The file "{{name}}" has been deleted. <a class="file-restore-link menu-button" data-action="file.restore">Undo</a><a class="close menu-button" data-action="file-undo.close">&times;</a></div>')
        var B = m.compile('<div data-alert class="comment-warning alert-box info">{{message}}<a class="close"><i class="fa fa-times-circle"></i></a></div>')
        var C = 'click.trinket-code-editor.tab-select'
        var D = 'mousedown.trinket-code-editor.scroll-tabs-start touchstart.trinket-code-editor.scroll-tabs-start'
        var E = 'mouseup.trinket-code-editor.scroll-tabs-stop touchend.trinket-code-editor.scroll-tabs-stop'
        var F = 'click.trinket-code-editor.add-file'
        var G = 'click.trinket-code-editor.upload-file'
        var H = 'click.trinket-code-editor.view-assets'
        var I = 'click.trinket-code-editor.tab-options-open'
        var J = 'mousedown.trinket-code-editor.tab-options-close'
        var K = 'click.trinket-code-editor.edit-file-name'
        var L = 'click.trinket-code-editor.remove-file'
        var M = 'click.trinket-code-editor.hide-file'
        var N = '.fa.fa-exclamation-circle.warning'
        var O = 'fa fa-exclamation-circle warning'
        var P = a('<dd class="tab-button" title=\'Create text file\'><a class="add-file-link menu-button" data-action="file.add" aria-label="Add new file" role="button"><i class="fa fa-plus"></i></a></dd>')
        var Q = a('<dd class="tab-button" title=\'Add comment to current line\'><a class="add-inline-comment menu-button" data-action="inline-comment.add"><i class="fa fa-comment"></i></a></dd>')
        var R = 'click.trinket-code-editor.add-inline-comment'
        var S = a('<dd class="tab-button" title=\'Upload text file\'><a class="upload-file-link menu-button" data-action="file.upload" aria-label="Upload text file" role="button"><i class="fa fa-upload"></i></a></dd>')
        var T = a("<form id='file-upload-form'><input type='file' name='file-upload' id='file-upload' class='hidden' tabindex='-1'></form>")
        var U = {
            options: {
                selectedLine: -1,
                selectedClass: 'lineselect',
                noEditor: !1,
                state: '',
                defaultFileExt: 'txt',
                mainFileName: 'main.py',
                mainEditable: !1,
                mainSuffix: null,
                showTabs: !1,
                addFiles: !0,
                showInfo: !0,
                assets: !1,
                assetsHowTo: '',
                acceptedFiles: '',
                onFocus: function () { },
                lang: '',
                owner: !1,
                canHideTabs: !1,
                canAddInlineComments: !1,
                userId: null,
                disableAceEditor: !1,
                assignmentViewOnly: !1
            },
            _create: function () {
                var b = this
                c ? c.require('ace/line_widgets')
                    .LineWidgets : function () { }
                if (this._editor, this._commands = [], this._plugins = [], this._files = [], this.element.empty(), this.element.append(t.clone()), this.options.addFiles && (this.element.find('dl.right-options')
                    .append(P), window.FileReader && (this.element.find('dl.right-options')
                        .append(S), this.element.append(T), a('#file-upload')
                            .change(function () {
                                var c = a('#file-upload')[0].files[0]
                                if (!c.type || c.type.match(/text.*/)) {
                                    var d = new FileReader()
                                    d.onload = function () {
                                        b.addFile({
                                            name: c.name,
                                            content: d.result
                                        }, {
                                            override: !0
                                        }), b._onChange && b._onChange(), b._selectTab(b._files.length - 1), a('#file-upload-form')
                                            .get(0)
                                            .reset()
                                    }, d.onerror = function () {
                                        b.element.find('.tab-nav')
                                            .after(z({
                                                message: 'There was a problem reading your file. Please try again.'
                                            })), a(document)
                                                .foundation('alert', 'reflow'), a('#file-upload-form')
                                                    .get(0)
                                                    .reset()
                                    }, d.readAsText(c)
                                } else {
                                    b.element.find('.tab-nav')
                                        .after(z({
                                            message: 'Only text files are currently supported.'
                                        })), a(document)
                                            .foundation('alert', 'reflow')
                                }
                            }))), this.options.canAddInlineComments && this.element.find('dl.right-options')
                                .append(Q), this.$tabOptions = w.clone(), this.options.canHideTabs && this.$tabOptions.find('ul')
                                    .append('<li><a class="file-hide-link menu-button" data-action="file.hide" title="toggle tab visibility"><i class="fa fa-eye"></i></a></li>'), a('body')
                                        .append(this.$tabOptions), this.$tabBar = this.element.find('.scrollable-content'), this.$tabBar.on(C, '.tab', function (c) {
                                            if (!a(this)
                                                .hasClass('active')) {
                                                var d = a(this)
                                                    .index()
                                                return b._files[d].editor.addQueueMarkers(), b._selectTab(d)
                                            }
                                        }), this.$contentWrapper = this.element.find('.file-content-container'), this.element.find('.tab-scroll-link')
                                            .on(D, function () {
                                                b._scrollTabBar(a(this)
                                                    .data('direction'))
                                            }), this.element.find('.add-file-link')
                                                .parent()
                                                .on(F, function () {
                                                    window.TrinketAPI._receiverBroadcastState != 'BROADCASTING' && (b.addFile(''), b._selectTab(b.$tabBar.children()
                                                        .length - 1, !0), b._editFileName())
                                                }), this.element.find('.upload-file-link')
                                                    .parent()
                                                    .on(G, function () {
                                                        window.TrinketAPI._receiverBroadcastState != 'BROADCASTING' && a('#file-upload')
                                                            .trigger('click')
                                                    }), this.element.find('.add-inline-comment')
                                                        .parent()
                                                        .on(R, function () {
                                                            b._addCommentWidget()
                                                        }), this.element.on(I, '.tab-options-link', function (c) {
                                                            if (b.$tabOptions.hasClass('open')) b._closeOptionsMenu()
                                                            else {
                                                                var d = a(this)
                                                                    .closest('.tab')
                                                                a(d)
                                                                    .hasClass('main-editable') ? (b.$tabOptions.find('.file-remove-link')
                                                                        .hide(), b.options.canHideTabs && b.$tabOptions.find('.file-hide-link')
                                                                            .hide()) : a(d)
                                                                                .data('binary') ? (b.$tabOptions.find('.file-rename-link')
                                                                                    .hide(), b.options.canHideTabs && b.$tabOptions.find('.file-hide-link')
                                                                                        .hide()) : (b.$tabOptions.find('.file-remove-link')
                                                                                            .show(), b.options.canHideTabs && b.$tabOptions.find('.file-hide-link')
                                                                                                .show())
                                                                var e = a(this)
                                                                    .offset()
                                                                b.$tabOptions.css('left', e.left - 10 + 'px'), b.$tabOptions.css('top', e.top + a(this)
                                                                    .height() + 10 + 'px'), b.$tabOptions.addClass('open'), b.element.on(J, function (c) {
                                                                        a(c.target)
                                                                            .hasClass('tab-options-link') || b._closeOptionsMenu()
                                                                    })
                                                            }
                                                        }), this.$tabOptions.find('.file-rename-link')
                                                            .on(K, function () {
                                                                b._closeOptionsMenu(), window.TrinketAPI._receiverBroadcastState != 'BROADCASTING' && (a('.file-name-input')
                                                                    .length || b._editFileName())
                                                            }), this.$tabOptions.find('.file-remove-link')
                                                                .on(L, function () {
                                                                    b._closeOptionsMenu(), window.TrinketAPI._receiverBroadcastState != 'BROADCASTING' && b._removeFile({
                                                                        undo: !0
                                                                    })
                                                                }), this.$tabOptions.find('.file-hide-link')
                                                                    .on(M, function () {
                                                                        b._closeOptionsMenu(), b._toggleFile()
                                                                    }), this.options.assets) {
                    var d = ['image']
                    this.options.lang === 'pygame' && d.push('audio', '.ttf'), this.$assetBrowser = a('<div class="file-content fixed-right"></div>')
                        .assetBrowser({
                            modalParent: '.trinket-content-wrapper',
                            libraryUrl: '/api/users/assets?type=' + d.join(','),
                            assets: this.options.assets,
                            openClass: 'active',
                            assetsHowTo: this.options.assetsHowTo,
                            guest: this.options.guest,
                            lang: this.options.lang,
                            acceptedFiles: this.options.acceptedFiles
                        }), this.element.find('.right-options')
                            .append('<dd class="tab" title=\'Manage images\'><a class="file-tab-link add-asset-link disable" data-action="assets.view" title="View and Add Images"><i class="fa fa-file-image-o"  aria-hidden="true"></i></a></dd>'), this.assetBrowser = this.$assetBrowser.data('trinket-assetBrowser'), this.assetBrowser.hide(), this.element.find('.tab-nav')
                                .addClass('allow-assets'), this.$contentWrapper.append(this.$assetBrowser), this.element.find('.add-asset-link')
                                    .parent()
                                    .on(H, function () {
                                        return
                                        var c = a(this)
                                        c.hasClass('active') || (b._selectTab(-1, !0), c.addClass('active'), b.assetBrowser.show())
                                    })
                }
                this.options.showTabs || b.element.addClass('tabless'), this.options.showInfo && b.element.addClass('with-info'), this.options.state && this._loadState(this.options.state), a(document)
                    .on('SkfileWrite', function (c) {
                        var d, e, f, h, i, j, k
                        for (e = c.originalEvent.data.split(':'), f = e[0], h = e.slice(1)
                            .join(':'), d = 0; d < b._files.length; d++) {
                            b._files[d].name === f && (i = b._files[d].editor.getValue(), j = i.length ? i + h : h, a('textarea[name="' + b._files[d].name + '"]')
                                .val(j), b.$contentWrapper.children()
                                    .eq(d)
                                    .hasClass('active') ? b._files[d].editor.setValue(j) : (b._files[d].editor.destroy(), k = u.clone(), b._files[d].editor = g(k[0], {
                                        onFocus: function () { },
                                        ext: b._files[d].name.split('.')
                                            .pop() || b.options.defaultFileExt,
                                        index: d
                                    }), b._files[d].editor.setValue(j), b.$contentWrapper.children()
                                        .eq(d)
                                        .replaceWith(k)))
                        }
                    }), a(document)
                        .on('SkfileOpen', function (c) {
                            var d; var e; var f; var h = c.originalEvent.data.split(':')
                            var i = h[0]
                            var j = h.slice(1)
                                .join(':')
                            var k = {}
                            b._files.map(function (a, b) {
                                k[a.name] = b
                            }), typeof k[j] === 'undefined' ? (b.addFile({
                                name: j
                            }), i === 'w' && (e = a('<textarea>', {
                                id: j,
                                name: j
                            }), e.val('\n'), a('body')
                                .append(e))) : i === 'w' && (d = k[j], a('textarea[name="' + b._files[d].name + '"]')
                                    .val('\n'), b.$contentWrapper.children()
                                        .eq(d)
                                        .hasClass('active') ? b._files[d].editor.setValue('') : (b._files[d].editor.destroy(), f = u.clone(), b._files[d].editor = g(f[0], {
                                            onFocus: function () { },
                                            ext: b._files[d].name.split('.')
                                                .pop() || b.options.defaultFileExt,
                                            index: d
                                        }), b.$contentWrapper.children()
                                            .eq(d)
                                            .replaceWith(f)))
                        }), a(document)
                            .on('comment.added', '.file-content', function (a, c) {
                                b._addComment(c)
                            }), a(document)
                                .on('click', '.edit-inline-comment', function (b) {
                                    var c = a(this)
                                        .data('comment-id')
                                    var d = o[c]._text
                                    a('#comment-container-' + c)
                                        .addClass('hide'), a('#edit-comment-container-' + c)
                                            .removeClass('hide'), a('textarea#edit-inline-comment-' + c)
                                                .val(d), a("a[data-dropdown='comment-actions-" + c + "']")
                                                    .addClass('hide'), a('#update-comment-container-' + c)
                                                        .removeClass('hide')
                                }), a(document)
                                    .on('click', '.cancel-update-comment', function (b) {
                                        var c = a(this)
                                            .data('comment-id')
                                        a("a[data-dropdown='comment-actions-" + c + "']")
                                            .removeClass('hide'), a('#update-comment-container-' + c)
                                                .addClass('hide'), a('#comment-container-' + c)
                                                    .removeClass('hide'), a('#edit-comment-container-' + c)
                                                        .addClass('hide')
                                    }), a(document)
                                        .on('click', '.update-comment', function (c) {
                                            var d = a(this)
                                                .data('comment-id')
                                            var e = a(this)
                                                .data('file-index')
                                            var f = a('textarea#edit-inline-comment-' + d)
                                                .val()
                                            var g = f.replace(/(?:\r\n|\r|\n)/g, '<br />')
                                            o[d]._text = f, a('#comment-container-' + d)
                                                .html(g), a("a[data-dropdown='comment-actions-" + d + "']")
                                                    .removeClass('hide'), a('#update-comment-container-' + d)
                                                        .addClass('hide'), a('#comment-container-' + d)
                                                            .removeClass('hide'), a('#edit-comment-container-' + d)
                                                                .addClass('hide'), b._updateComment({
                                                                    _id: d,
                                                                    index: e,
                                                                    data: {
                                                                        text: f,
                                                                        edited: !0
                                                                    }
                                                                })
                                        }), a(document)
                                            .on('click', '.confirm-remove-inline-comment', function (b) {
                                                var c = a(this)
                                                    .data('comment-id')
                                                a("a[data-dropdown='comment-actions-" + c + "']")
                                                    .addClass('hide'), a('#confirm-remove-comment-container-' + c)
                                                        .removeClass('hide')
                                            }), a(document)
                                                .on('click', '.cancel-remove-comment', function (b) {
                                                    var c = a(this)
                                                        .data('comment-id')
                                                    a("a[data-dropdown='comment-actions-" + c + "']")
                                                        .removeClass('hide'), a('#confirm-remove-comment-container-' + c)
                                                            .addClass('hide')
                                                }), a(document)
                                                    .on('click', '.confirm-remove-comment', function (c) {
                                                        var d = a(this)
                                                            .data('comment-id')
                                                        var e = a(this)
                                                            .data('file-index')
                                                        var f = o[d]
                                                        b._files[e].editor.getSession()
                                                            .removeGutterDecoration(f.row, 'trinket-comment'), b._files[e].editor.getSession()
                                                                .removeGutterDecoration(f.row, 'data-' + e + '-' + d), p[d] ? b._files[e].editor.getSession()
                                                                    .removeGutterDecoration(f.row, 'collapsed') : b._files[e].editor.getSession()
                                                                        .removeGutterDecoration(f.row, 'open'), o[d].destroy(), delete o[d], q[e][f.row] = void 0, l(b._files[e].editor.getSession(), e), b._removeComment({
                                                                            _id: d,
                                                                            index: e
                                                                        })
                                                    }), a(document)
                                                        .on('click', '.ace_gutter-cell.trinket-comment', function (c) {
                                                            var d; var e; var f; var g; var h; var i = a(c.target)
                                                                .attr('class')
                                                                .split(' ')
                                                            d = _.find(i, function (a) {
                                                                return /^data/.test(a)
                                                            }), e = d.split('-'), f = e[1], g = e[2], h = o[g]
                                                            var j = b._files[f].editor.getSession()
                                                            p[g] ? (j.widgetManager.addLineWidget(o[g]), p[g] = !1, j.removeGutterDecoration(h.row, 'collapsed'), j.addGutterDecoration(h.row, 'open')) : (j.widgetManager.removeLineWidget(o[g]), p[g] = !0, j.removeGutterDecoration(h.row, 'open'), j.addGutterDecoration(h.row, 'collapsed')), b._updateComment({
                                                                _id: g,
                                                                index: f,
                                                                data: {
                                                                    collapsed: p[g]
                                                                }
                                                            })
                                                        }), a(document)
                                                            .on('click', '.comment-actions.comment-dismiss', function (c) {
                                                                var d = a(this)
                                                                    .data('comment-id')
                                                                var e = a(this)
                                                                    .data('file-index')
                                                                var f = o[d]
                                                                b._files[e].editor.getSession()
                                                                    .removeGutterDecoration(f.row, 'trinket-comment'), b._files[e].editor.getSession()
                                                                        .removeGutterDecoration(f.row, 'data-' + e + '-' + d), p[d] ? b._files[e].editor.getSession()
                                                                            .removeGutterDecoration(f.row, 'collapsed') : b._files[e].editor.getSession()
                                                                                .removeGutterDecoration(f.row, 'open'), o[d].destroy(), delete o[d], b._removeComment({
                                                                                    _id: d,
                                                                                    index: e
                                                                                })
                                                            }), a(document)
                                                                .on('click', '.move-comment-up', function (c) {
                                                                    if (!a(this)
                                                                        .hasClass('disabled')) {
                                                                        var d = a(this)
                                                                            .data('comment-id')
                                                                        var e = a(this)
                                                                            .data('file-index')
                                                                        var f = o[d]
                                                                        var g = (f.row, f.row - 1)
                                                                        j.call(b, e, d, g)
                                                                    }
                                                                }), a(document)
                                                                    .on('click', '.move-comment-down', function (c) {
                                                                        if (!a(this)
                                                                            .hasClass('disabled')) {
                                                                            var d = a(this)
                                                                                .data('comment-id')
                                                                            var e = a(this)
                                                                                .data('file-index')
                                                                            var f = o[d]
                                                                            var g = (f.row, f.row + 1)
                                                                            j.call(b, e, d, g)
                                                                        }
                                                                    }), a('#outputContainer')
                                                                        .keyup(function (a) {
                                                                            a.shiftKey && a.keyCode === 9 && (a.preventDefault(), b.focus())
                                                                        })
            },
            _closeOptionsMenu: function () {
                this.element.off(J), this.$tabOptions.removeClass('open')
            },
            _loadState: function (a) {
                var b
                try {
                    if (a = JSON.parse(a), !Array.isArray(a)) throw new Error()
                } catch (c) {
                    a = [{
                        name: this.options.mainFileName,
                        content: a || ''
                    }]
                }
                for (b = 0; b < a.length; b++) this.addFile(a[b])
                this._selectTab(0, !0)
            },
            _getCurrentVisibleTab: function () {
                var a = this.$tabBar.find('.tab.active')
                    .first()
                var b = (this.$contentWrapper.find('.file-content.active')
                    .first(), a.index())
                var c = a.find('.file-name')
                    .text()
                return {
                    tabIndex: b,
                    fileName: c
                }
            },
            _selectTab: function (a, b) {
                this.element.find('.tab.active, .file-content.active')
                    .removeClass('active'), this._editor && this._editor.blur(), void 0 !== a && this._files[a] ? (this.$tabBar.children()
                        .eq(a)
                        .addClass('active'), this.$contentWrapper.children()
                            .eq(a)
                            .addClass('active'), this._editor = this._files[a].editor, b || this._editor.focus(), this.element.trigger({
                                type: 'codeeditor.tabChanged',
                                tabIndex: a
                            }), this._files[a].binary ? this.element.find('.add-inline-comment')
                                .addClass('disabled') : this.element.find('.add-inline-comment')
                                    .removeClass('disabled')) : this.element.find('.add-inline-comment')
                                        .addClass('disabled')
            },
            _editFileName: function () {
                if (window.TrinketAPI._receiverBroadcastState != 'BROADCASTING') {
                    var b = this
                    var c = b.$tabBar.find('.tab.active')
                    var d = c.find('.file-name')
                    var e = d.text()
                    var f = e.length
                    var g = a(y({
                        name: e
                    }))
                    var h = d.outerWidth()
                    if (c.hasClass('main-editable')) {
                        if (!b.options.mainEditable) return
                        b.options.mainSuffix && (f -= b.options.mainSuffix.length)
                    }
                    d.hide(), g.css('width', h + 'px'), d.after(g), g.focus(), g[0].setSelectionRange(0, f), g.on('blur', function (f) {
                        var h; var i = g.val()
                            .replace(/^\s|\s$/g, '')
                        return a('.file-name-error')
                            .remove(), i.length ? (i.length > 50 ? h = 'File names must be less than 50 characters, please choose a shorter name.' : b.options.lang !== 'python' && b.options.lang !== 'python3' || !i.match(/\.py$/) || i.match(/^[\w][\w0-9]*(\.[a-z]+)?$/) ? i.match(/^\w[\w\.\-]*$/) ? a('#' + i)
                                .length ? h = "The name '" + i + "' is reserved, please choose a different name." : i.toLowerCase() !== e.toLowerCase() && b.$tabBar.find('.file-name')
                                    .each(function () {
                                        return a(this)
                                            .text()
                                            .toLowerCase() === i.toLowerCase() ? (h = 'There is already a file named "' + i + '", please choose a different name.', !1) : void 0
                                    }) : h = 'File names must start with a letter, number, or underscore followed by zero or more letters, numbers, underscores, hyphens, and periods.' : h = 'Python file names must start with a letter or underscore followed by zero or more letters, digits and underscores.', void (h ? (b.element.find('.tab-nav')
                                        .after(z({
                                            message: h
                                        })), a(document)
                                            .foundation('alert', 'reflow'), a(this)
                                                .focus(), this.setSelectionRange(0, i.length)) : (d.text(i), d.show(), a(this)
                                                    .remove(), b._files[c.index()].name = i, b._onChange && b._onChange(), b._files[c.index()].editor.setModeFromName(i), b.element.trigger({
                                                        type: 'codeeditor.fileRenamed',
                                                        oldFileName: e,
                                                        newFileName: i,
                                                        newFile: b._files[c.index()]
                                                    })))) : void b._removeFile({
                                                        undo: !1
                                                    })
                    }), g.on('keydown', function (b) {
                        b.keyCode === 10 || b.keyCode === 13 ? a(this)
                            .blur() : b.keyCode === 27 && (g.val(e), a(this)
                                .blur())
                    })
                }
            },
            _removeFile: function (b) {
                var c = this
                var d = this.$tabBar.find('.tab.active')
                    .first()
                var e = this.$contentWrapper.find('.file-content.active')
                    .first()
                var f = origIndex = d.index()
                var g = d.find('.file-name')
                    .text()
                var h = a(A({
                    name: g
                }))
                var i = this._files.splice(origIndex, 1)[0]
                var j = origIndex === this._files.length
                var k = setTimeout(function () {
                    h.find('.close')
                        .click()
                }, 15e3)
                var l = function () {
                    clearTimeout(k), i = void 0, d = void 0, e = void 0, h && (h.remove(), h = void 0)
                }
                d.detach(), e.detach(), j && (f -= 1), this._selectTab(f), this._onChange && !i.binary && this._onChange(), (b.undo || i.editor.getValue()
                    .length) && (this.element.find('.tab-nav')
                        .after(h), h.find('.close')
                            .on('click', function () {
                                i.editor.destroy(), c.element.trigger({
                                    type: 'codeeditor.fileRemoved',
                                    fileName: g
                                })
                            }), a('.file-restore-link')
                                .on('click', function () {
                                    c._files.splice(origIndex, 0, i), j ? (c.$tabBar.append(d), c.$contentWrapper.children()
                                        .eq(f)
                                        .after(e)) : (c.$tabBar.children()
                                            .eq(f)
                                            .before(d), c.$contentWrapper.children()
                                                .eq(f)
                                                .before(e)), c._selectTab(origIndex), l(), c._onChange && !i.binary && c._onChange()
                                }), a(document)
                                    .one('close.fndtn.alert-box', function (a) {
                                        l()
                                    }), a('.file-name-error')
                                        .length && a('.file-name-error')
                                            .remove(), a(document)
                                                .foundation('alert', 'reflow'))
            },
            _toggleFile: function () {
                var b = this
                var c = b.$tabBar.find('.tab.active')
                typeof b._files[c.index()].hidden === 'undefined' ? b._files[c.index()].hidden = !0 : b._files[c.index()].hidden = !b._files[c.index()].hidden, b._files[c.index()].hidden ? (c.find('.file-name')
                    .addClass('hidden-file-indicator'), a('<i class="fa fa-eye-slash file-icon"></i>')
                        .insertBefore(c.find('.file-name'))) : (c.find('.file-name')
                            .removeClass('hidden-file-indicator'), c.find('.file-name')
                                .prev('i')
                                .remove()), b._onChange && b._onChange()
            },
            _scrollTabBar: function (b) {
                var c; var d; var e = this
                var f = 300
                var g = 50
                var h = 'swing'
                var i = !1
                var j = e.$tabBar.children()
                b < 0 && (j = a(j.get()
                    .reverse())), a(document)
                        .one(E, function () {
                            i = !0, clearTimeout(c)
                        }), (d = function () {
                            var k = !0
                            j.each(function () {
                                var j = a(this)
                                    .position()
                                    .left
                                return b > 0 && (j += a(this)
                                    .outerWidth()), (b > 0 && j > 10 || b < 0 && j < -10) && (e.$tabBar.animate({
                                        scrollLeft: '+=' + j
                                    }, 200, h, function () {
                                        i || (f = Math.max(0, f - g), f || (h = 'linear'), c = setTimeout(d, f))
                                    }), k = !1), k
                            })
                        })()
            },
            _addCommentWidget: function () {
                var a = this._getCurrentVisibleTab()
                a.tabIndex >= 0 && this._files[a.tabIndex].editor.addCommentWidget.call(this)
            },
            _addComment: function (a) {
                this._files[a.index].comments.push(a), this._onChange && this._onChange()
            },
            _removeComment: function (a) {
                this._files[a.index].comments = _.filter(this._files[a.index].comments, function (b) {
                    return b._id !== a._id
                }), this._onChange && this._onChange()
            },
            _updateComment: function (a) {
                _.find(this._files[a.index].comments, function (b) {
                    b._id === a._id && (b = _.extend(b, a.data))
                }), this._onChange && this._onChange()
            },
            resize: function (a) {
                for (var b = 0; b < this._files.length; b++) this._files[b].editor.resize(a)
            },
            assets: function (a) {
                return this.options.assets ? this.assetBrowser.assets(a) : []
            },
            addFile: function (b, d) {
                var f; var k; var l; var m; var n; var o; var p; var q; var s; var t; var w; var y; var z = this
                var A = ''
                var B = ''
                var C = this._files.length
                var D = !0
                var E = d && d.override ? d.override : !1
                if (typeof jQueryXDomainRequest !== 'undefined' && jQueryXDomainRequest && (D = !1), typeof b === 'string' && (b = {
                    name: b
                }), f = b.name, B = b.type || f.split('.')
                    .pop(), A = b.content || '', p = b.hidden, t = b.comments || [], w = b.binary || !1, k = a(x({
                        name: f
                    })), l = u.clone(), z.$tabBar.find('.file-name')
                        .each(function (b) {
                            a(this)
                                .text()
                                .toLowerCase() === f.toLowerCase() && (s = !0, C = b)
                        }), s && E) {
                    return a('textarea[name="' + z._files[C].name + '"]')
                        .val(A), z.$contentWrapper.children()
                            .eq(C)
                            .hasClass('active') ? z._files[C].editor.setValue(A) : b.binary ? (z._files[C].editor = h(l[0], {
                                value: A
                            }), l.html(v), z.$contentWrapper.children()
                                .eq(C)
                                .replaceWith(l)) : (z._files[C].editor.destroy(), z._files[C].editor = g(l[0], {
                                    onFocus: function () { },
                                    ext: z._files[C].name.split('.')
                                        .pop() || z.options.defaultFileExt,
                                    name: f,
                                    value: A,
                                    index: C
                                }), z._files[C].editor.setValue(A), z.$contentWrapper.children()
                                    .eq(C)
                                    .replaceWith(l)), this._files[C]
                }
                if (p && (z.options.owner && z.options.canHideTabs ? (k.find('.file-name')
                    .addClass('hidden-file-indicator'), a('<i class="fa fa-eye-slash file-icon"></i>')
                        .insertBefore(k.find('.file-name'))) : k.hide()), this.options.noEditor) {
                    m = h(l[0], {
                        value: A
                    })
                } else if (b.image) {
                    m = i(l[0], {
                        name: f,
                        value: A
                    })
                } else if (b.binary) {
                    m = h(l[0], {
                        value: A
                    }), l.html(v)
                } else if (!z.options.disableAceEditor && D && c) {
                    m = g(l[0], {
                        onFocus: this.options.onFocus,
                        ext: B || this.options.defaultFileExt,
                        name: f,
                        value: A,
                        index: C,
                        comments: t,
                        editorOpts: this.options,
                        onCommentChange: j.bind(this),
                        onCommentRemove: this._removeComment.bind(this)
                    })
                } else {
                    m = e(l[0], {
                        onFocus: this.options.onFocus,
                        selectedLine: this.options.selectedLine,
                        value: A,
                        name: f
                    })
                    for (var F in r) m.addCommand(F, r[F].key, r[F].fn)
                }
                for (n = 0; n < this._commands.length; n++) m.addCommand.apply(m, this._commands[n])
                for (n = 0; n < this._plugins.length; n++) m.registerPlugin(this._plugins[n], this)
                this._onChange && !w && m.change(this._onChange), y = {
                    index: C
                }, w && (y.binary = !0), k.data(y), this.$tabBar.append(k)
                var o = this.$contentWrapper.find('.fixed-right')
                    .first()
                return o.length ? o.before(l) : this.$contentWrapper.append(l), C === 0 && (this.options.mainEditable ? k.addClass('main-editable') : k.addClass('permanent')), a('.info-area .expander')
                    .click(function () {
                        a('.info-area')
                            .hasClass('expanded') ? a('.info-area')
                                .removeClass('expanded')
                                .addClass('collapsed') : a('.info-area')
                                    .removeClass('collapsed')
                                    .addClass('expanded')
                    }), q = {
                        name: f,
                        type: B,
                        $tab: k,
                        $content: l,
                        editor: m,
                        comments: t,
                        binary: w
                    }, typeof p !== 'undefined' && (q.hidden = p), this._files.push(q), this.element.trigger({
                        type: 'codeeditor.fileAdded',
                        fileName: f,
                        newFile: this._files[this._files.length - 1]
                    }), this._files[this._files.length - 1]
            },
            hasFile: function (a) {
                var b
                for (b = 0; b < this._files.length; b++) { if (this._files[b].name === a) return !0 }
                return !1
            },
            getFile: function (a) {
                var b
                for (b = 0; b < this._files.length; b++) { if (this._files[b].name === a) return this._files[b].editor.getValue() }
                return ''
            },
            selectFile: function (a) {
                var b, c
                for (c = 0; c < this._files.length; c++) {
                    if (this._files[c].name === a) {
                        b = this._files[c].$tab
                        break
                    }
                } b || (b = this.addFile(a)
                    .$tab, c = this._files.length - 1), this._selectTab(c)
            },
            serialize: function (a) {
                var b; var c; var d; var e = []
                var a = _.extend(a || {
                    removeComments: !1
                })
                for (c = 0; c < this._files.length; c++) {
                    this._files[c].binary || (b = this._files[c], d = {
                        name: b.name,
                        content: b.editor.getValue()
                    }, typeof b.hidden !== 'undefined' && (d.hidden = b.hidden), !a.removeComments && b.comments.length && (d.comments = b.comments), e.push(d))
                }
                return JSON.stringify(e)
            },
            getAllFiles: function (a) {
                var b; var c; var d = {}
                a && typeof a === 'object' ? (b = a.filter || !1, c = void 0 === a.values ? !0 : a.values) : (b = !1, c = !0), b && typeof b !== 'regexp' && (b = new RegExp(b))
                for (var e = 0; e < this._files.length; e++) {
                    if (!b || b.test(this._files[e].name)) {
                        if (this._files[e].binary) continue
                        d[this._files[e].name] = c ? this._files[e].editor.getValue() : 1
                    }
                } return d
            },
            getAllVisibleFiles: function () {
                var a; var b = {}
                for (a = 0; a < this._files.length; a++) this._files[a].hidden || this._files[a].binary || (b[this._files[a].name] = this._files[a].editor.getValue())
                return b
            },
            addCommand: function (a, b, c) {
                this._commands.push([a, b, c])
                for (var d = 0; d < this._files.length; d++) this._files[d].editor.addCommand(a, b, c)
            },
            updateInfo: function (b) { //Todo
                return
                this.options.showInfo && (this._currentInfo = b, a('.info-area .expander')
                    .hide(), b ? (a('.info-area')
                        .removeClass('empty')
                        .find('.info-quick')
                        .html(this._currentInfo.title), this.loadFullInfo(this._currentInfo)) : a('.info-area')
                            .removeClass('expanded')
                            .addClass('collapsed empty'))
            },
            loadFullInfo: function (b) {
                var c
                if (b && b.url) {
                    if (c = n[b.url], void 0 !== c) {
                        return void (typeof c === 'string' ? c.length && (a('.info-area .info-full')
                            .html(n[b.url]), a('.info-area .expander')
                                .show()) : c._cancelled = !1)
                    }
                    this.lastInfoRequest && (this.lastInfoRequest._cancelled = !0), this.lastInfoRequest = n[b.url] = (function () {
                        var c = a.get(b.url, '', 'html')
                        return c.done(function (d) {
                            n[b.url] = d || '', d && !c._cancelled && (a('.info-area .info-full')
                                .html(d), a('.info-area .expander')
                                    .show())
                        }), c
                    }())
                }
            },
            registerPlugin: function (a) {
                var b = this
                a.on && a.on('info.token', function (a, c) {
                    b.updateInfo(c)
                }), this._plugins.push(a)
                for (var c = 0; c < this._files.length; c++) this._files[c].editor.registerPlugin(a, this)
            },
            change: function (a) {
                this._onChange = a
                for (var b = 0; b < this._files.length; b++) this._files[b].editor.change(a)
            },
            reset: function (a) {
                for (var b; b = this._files.pop();) b.editor.destroy(), b.$content.remove(), b.$tab.remove()
                this._loadState(a)
            },
            highlight: function (a, b) {
                for (var c = -1, d = 0; d < this._files.length; d++) {
                    if (this._files[d].name === a) {
                        c = d
                        break
                    }
                } if (c >= 0) {
                    var e = this._files[c].$tab.hasClass('active') ? !1 : !0
                    this._files[c].editor.highlight(b, e), this._files[c].$tab.has(N)
                        .length || this._files[c].$tab.append(" <i class='" + O + "'></i>")
                }
            },
            clearTabMarkers: function () {
                for (var b = 0; b < this._files.length; b++) {
                    this._files[b].$tab.has(N)
                        .length && this._files[b].$tab.find(N)
                            .remove()
                }
                a('.ace_content')
                    .removeClass('attention-error'), a('textarea.lined')
                        .removeClass('attention-error'), a('.lineno')
                            .removeClass('lineselect')
            },
            gotoLine: function (a) {
                this._editor && this._editor.aceInstance && this._editor.aceInstance.gotoLine(a)
            },
            removeComments: function () {
                var a, b, c, d
                for (a = 0; a < this._files.length; a++) {
                    if (this._files[a].comments) {
                        for (b = 0; b < this._files[a].comments.length; b++) {
                            c = this._files[a].comments[b]._id, d = o[c], this._files[a].editor.getSession()
                                .removeGutterDecoration(d.row, 'trinket-comment'), this._files[a].editor.getSession()
                                    .removeGutterDecoration(d.row, 'data-' + a + '-' + c), p[c] ? this._files[a].editor.getSession()
                                        .removeGutterDecoration(d.row, 'collapsed') : this._files[a].editor.getSession()
                                            .removeGutterDecoration(d.row, 'open'), o[c].destroy(), delete o[c]
                        }
                    }
                }
            },
            activeTab: function () {
                return this._getCurrentVisibleTab()
            }
        }
        !(function (a) {
            for (var b = 'setValue getValue focus isFocused'.split(' '), c = function (b) {
                a[b] = function () {
                    var a = Array.prototype.slice.call(arguments)
                    return this._editor[b].apply(this._editor, a)
                }
            }, d = 0; d < b.length; d++) c(b[d])
        }(U)), a.widget('trinket.codeEditor', U)
    }(window.jQuery, window.TrinketIO, window.ace)),
    (function (a, b, c) {
        function d(a) {
            this.isAuthenticated() === !0 ? this.startBroadcasting() : this.auth(function (a) {
                a && this.startBroadcasting()
            }.bind(this))
        }

        function e(a) {
            this.isAuthenticated() === !0 ? this.join() : this.auth(function (a) {
                a && this.join()
            }.bind(this))
        }

        function f(b, c) {
            a(document)
                .on('trinket.broadcasting.start', function () {
                    void 0 === g && (g = new q(b, c)), a('.broadcast-start-control')
                        .find('i')
                        .removeClass()
                        .addClass('fa fa-circle-o-notch fa-spin'), a('.broadcast-status')
                            .html('Creating room...'), g.connect(d)
                }), a(document)
                    .on('trinket.broadcasting.join', function () {
                        void 0 === g && (g = new r(b, c)), a('.broadcast-join-control')
                            .find('i')
                            .removeClass()
                            .addClass('fa fa-circle-o-notch fa-spin'), a('.broadcast-status')
                                .html('Joining Room...'), g.connect(e)
                    }), a(document)
                        .on('trinket.broadcasting.control-room trinket.broadcasting.join-info', function (b) {
                            a('#broadcastReceiverInfo')
                                .removeClass('hide'), a('#left-broadcast-reason')
                                    .empty(), a('#keepBroadcastSessionButtons')
                                        .addClass('hide'), a('#controlRoomModal')
                                            .foundation('reveal', 'open'), b.namespace !== 'broadcasting.join-info' || void 0 !== g && g.session.state !== m || a.get(i + '/broadcastsession/' + c.trinketIdentifier)
                                                .done(function (b) {
                                                    b && b.isActive ? (a('.broadcast-status')
                                                        .html('Broadcast session is active.'), a('.broadcast-join-control')
                                                            .removeClass('disabled')) : (a('.broadcast-join-control')
                                                                .addClass('disabled'), a('.broadcast-status')
                                                                    .html('Broadcast session is not active. Check back later.'))
                                                })
                                                .fail(function (b, c, d) {
                                                    a('.broadcast-status')
                                                        .html('Broadcast session is not active. Check back later.')
                                                })
                        })
        }
        var g; var h = (b['import']('utils.template'), trinketConfig.get('broadcastPort') != null && trinketConfig.get('broadcastPort') !== '' ? ':' + trinketConfig.get('broadcastPort') : '')
        var i = trinketConfig.get('broadcastProtocol') + '://' + trinketConfig.get('broadcastHostname') + h
        var j = i + '/broadcast'
        var k = {
            reconnection: !0,
            reconnectionDelay: 1e3,
            reconnectionDelayMax: 5e3,
            reconnectionAttempts: 5
        }
        var l = 0
        var m = 'OFF'
        var n = 'BROADCASTING'
        var o = 'OFF'
        var p = 'BROADCASTING'
        var q = function (b, c) {
            this.session = {
                hasChangeListenersAttached: !1,
                state: o,
                needReconnect: !1
            }, this.socket = io.connect(j, k), this.codeEditor = b, this.trinketIdentifier = c.trinketIdentifier, this.userIdentifier = c.userIdentifier, this.token = window.trinketBroadcast.token, this.connectCallback = function () { }, this.socket.on('connect', this.onConnect.bind(this)), this.socket.on('reconnect', this.onReconnect.bind(this)), this.socket.on('disconnect', this.onDisconnect.bind(this)), this.socket.on('reconnect_failed', this.onReconnectFailed.bind(this)), this.socket.on('connect_timeout', this.onConnectionTimeout.bind(this)), this.socket.on('sync', this.onSync.bind(this)),
                this.socket.on('userUpdate', this.onUserUpdate.bind(this)), a(document)
                    .on('trinket.broadcasting.stop', this.onBroadcastingStop.bind(this))
        }
        q.prototype.updateUI = function (b, c) {
            switch (b) {
                case 'stop':
                    a('.broadcast-it')
                        .addClass('broadcasting'), a('.broadcast-start-control')
                            .find('i')
                            .removeClass()
                            .addClass('fa fa-play'), a('.broadcast-start-control')
                                .addClass('disabled'), a('.broadcast-stop-control')
                                    .removeClass('disabled'), a('.broadcast-it')
                                        .prop('title', 'On Air'), a('.broadcast-status')
                                            .html(c || 'On Air! <a class="close-control-room button radius tiny">Close Control Room <i class="fa fa-times-circle"></i></a>'), a('.close-control-room')
                                                .click(function () {
                                                    a('#controlRoomModal')
                                                        .foundation('reveal', 'close')
                                                })
                    break
                case 'start':
                    a('.broadcast-it')
                        .removeClass('broadcasting'), a('.broadcast-start-control')
                            .find('i')
                            .removeClass()
                            .addClass('fa fa-play'), a('.broadcast-start-control')
                                .removeClass('disabled'), a('.broadcast-stop-control')
                                    .addClass('disabled'), a('.broadcast-it')
                                        .prop('title', 'Start Broadcasting'), a('.broadcast-status')
                                            .html(c || 'Not Broadcasting')
            }
        }, q.prototype.connect = function (a) {
            this.isConnected() === !0 ? a.call(this, this.socket.connected) : (this.connectCallback = a, this.socket.connect())
        }, q.prototype.isConnected = function () {
            return this.socket.connected
        }, q.prototype.onConnect = function () {
            console.log('Broadcaster connected', this.socket.id), void 0 !== this.connectCallback && this.connectCallback.call(this, this.socket.connected)
        }, q.prototype.onConnectionTimeout = function () {
            console.log('Broadcaster.onConnectionTimeout', this.session), this.updateUI('start', 'Connection timed out. Check your internet connection then try again.')
        }, q.prototype.auth = function (a) {
            this.socket.emit('auth', {
                token: this.token
            }, this.onAuthResponse.bind(this, a))
        }, q.prototype.isAuthenticated = function () {
            return this.session.isAuthenticated
        }, q.prototype.onAuthResponse = function (a, b) {
            b.error || !b.success ? (console.log('An error has occured while authentificating: ' + b.error), this.session.isAuthenticated = !1, this.updateUI('start', 'There was a problem creating your broadcasting room. Try refreshing the page and let us know if the problem continues.')) : (this.session.isAuthenticated = !0, console.log('Authenticated successfully')), a.call(this, this.session.isAuthenticated)
        }, q.prototype.startBroadcasting = function (a) {
            var b; var c = a || !1;
            (this.session.state === o || c !== !1) && (b = {
                user: this.userIdentifier,
                trinketId: this.trinketIdentifier
            }, this.socket.emit('startBroadcasting', b, this.onStartBroadcastingResponse.bind(this)))
        }, q.prototype.onStartBroadcastingResponse = function (a) {
            a.status === 'STARTED' || a.status === 'RESTARTED' ? (this.initChangeListeners(), a.status === 'RESTARTED' ? (this.session.state = a.state, this.onSync({}, this.sendBroadcastChange.bind(this))) : this.session.state = p, this.updateUI('stop')) : (console.log('Could not start a broadcasting session', a), this.updateUI('start', 'There was a problem creating your broadcasting room. Try refreshing the page and let us know if the problem continues.'))
        }, q.prototype.getLoadStateMessage = function () {
            var a = this.codeEditor.serialize()
            var b = {}
            return b.state = a, b.type = 'codeeditor.loadState', b
        }, q.prototype.getAssetChangeMessage = function () {
            return {
                assets: this.codeEditor.assetBrowser ? this.codeEditor.assetBrowser.options.assets : void 0,
                type: 'assets.change'
            }
        }, q.prototype.onSync = function (a, b) {
            if (this.isConnected() && this.isAuthenticated() && this.session.state !== o) {
                var c; var d; var e = []
                e.push(this.getLoadStateMessage()), d = this.codeEditor._getCurrentVisibleTab(), c = {}, c.tab = d.tabIndex, c.type = 'codeeditor.tabChanged', e.push(this.getAssetChangeMessage()), b(e)
            }
        }, q.prototype.onUserUpdate = function (b) {
            b.count && a('#broadcast-receiving-count')
                .text(b.count - 1)
        }, q.prototype.onReconnect = function () {
            this.session.state !== o && (a('#broadcastMessage')
                .html('Reconnected!')
                .fadeOut('slow', function () {
                    a('#broadcastMessage')
                        .empty(), a('#broadcastMessage')
                            .parent()
                            .addClass('hide')
                }), this.session.needReconnect = !0, this.auth(function (a) {
                    a && this.startBroadcasting(!0)
                }.bind(this)))
        }, q.prototype.onReconnectFailed = function () {
            this.session.state = o, a('#broadcastMessage')
                .empty(), a('#broadcastMessage')
                    .parent()
                    .addClass('hide'), a('#controlRoomModal')
                        .hasClass('open') || a('a.broadcast-it')
                            .trigger('click'), this.updateUI('start', 'There was a problem connecting to your room. Try refreshing the page and let us know if the problem continues.')
        }, q.prototype.onDisconnect = function () {
            this.session.isAuthenticated = !1, console.log('disconnect from socket: state:', this.session.state), this.session.state !== o && (a('#broadcastMessage')
                .parent()
                .removeClass('hide'), a('#broadcastMessage')
                    .html('Reconnecting...'))
        }, q.prototype._handle = function (a, b) {
            if (this.session.state === p) {
                var c = a.name
                var d = {}
                switch (b && b.action && (b.type = 'change'), b.type) {
                    case 'changeCursor':
                        d = a.editor.getSession()
                            .selection.getCursor()
                        break
                    case 'change':
                        d = b
                        break
                    case 'changeSelection':
                        d = a.editor.getSession()
                            .selection.getRange()
                        break
                    case 'changeMode':
                        d = {
                            mode: a.editor.getSession()
                                .getMode()
                                .$id
                        }
                        break
                    case 'blur':
                        d.blur = 'blur'
                        break
                    case 'focus':
                        d.blur = 'blur'
                }
                d.fileName = c, d.trinketId = this.session.id, d.type = 'document.' + b.type, this.sendBroadcastChange(d)
            }
        }, q.prototype.sendBroadcastChange = function (a) {
            this.isConnected() && this.isAuthenticated() && this.session.state === p && (a.trinketId = this.trinketIdentifier, this.socket.emit('broadcastChange', a), console.log('broadcastChange', a.type))
        }, q.prototype.initChangeListeners = function () {
            this.session.hasChangeListenersAttached === !1 && (this.codeEditor.element.on('codeeditor.fileRenamed', this._onFileRenamed.bind(this)), this.codeEditor.element.on('codeeditor.fileRemoved', this._onFileRemoved.bind(this)), this.codeEditor.element.on('codeeditor.fileAdded', this._onFileAdded.bind(this)), this.codeEditor.element.on('codeeditor.tabChanged', this._onTabChanged.bind(this)), a(document)
                .on('trinket.code.run', this._onTrinketRun.bind(this)), a(document)
                    .on('sk.system.clear', this._onTrinketClear.bind(this)), a('#reset-output')
                        .on('click', this._onTrinketClear.bind(this)), a(document)
                            .on('assets.change', this._onAssetsChange.bind(this)), a(document)
                                .on('trinket.resetted', this._onTrinketReset.bind(this)), this.session.hasChangeListenersAttached = !0), this.codeEditor._files.forEach(function (a, b) {
                                    this.addEditorHandlers(a)
                                }.bind(this))
        }, q.prototype._onTrinketReset = function () {
            this.sendBroadcastChange(this.getLoadStateMessage()), this.sendBroadcastChange(this.getAssetChangeMessage())
        }, q.prototype.onBroadcastingStop = function () {
            this.socket.emit('stopBroadcasting', {
                trinketId: this.trinketIdentifier
            }), this.session.state = o, this.updateUI('start', 'Broadcasting stopped.'), a('#broadcast-receiving-count')
                .empty()
        }, q.prototype._onTabChanged = function (a) {
            var b; var c = {}
            return b = this.codeEditor._files[a.tabIndex], void 0 === b || b.name === '' ? void console.log('Broadcaster._onTabChanged: skipped due to missing tab name!') : (c.tabIndex = a.tabIndex, c.type = 'codeeditor.tabChanged', void this.sendBroadcastChange(c))
        }, q.prototype._onTrinketRun = function (a) {
            console.log('trinket.code.run')
            var b = {}
            b.trinketId = this.session.id, b.type = 'codeeditor.run', this.sendBroadcastChange(b)
        }, q.prototype._onTrinketClear = function (a) {
            console.log('sk.system.clear')
            var b = {}
            b.trinketId = this.session.id, b.type = 'codeeditor.clear', this.sendBroadcastChange(b)
        }, q.prototype._onAssetsChange = function (a) {
            console.log('assets.change')
            var b = {}
            b.trinketId = this.session.id, b.type = 'assets.change', b.assets = this.codeEditor.assetBrowser.options.assets, this.sendBroadcastChange(b)
        }, q.prototype._onFileAdded = function (a) {
            var b = a.fileName || ''
            var c = a.newFile
            c._fileID = l++, this.addEditorHandlers(c)
            var d = {}
            d.fileName = b, d.fileID = c._fileID, d.trinketId = this.session.id, d.type = 'codeeditor.fileAdded'
        }, q.prototype._onFileRenamed = function (a) {
            var b = a.newFile
            var c = {}
            c.newFileName = a.newFileName, c.oldFileName = a.oldFileName, c.fileID = b._fileID, c.trinketId = this.session.id, c.type = 'codeeditor.fileRenamed', this.sendBroadcastChange(c)
        }, q.prototype._onFileRemoved = function (a) {
            var b = a.fileName
            console.log('fileRemoved', b)
            var c = {}
            c.fileName = b, c.trinketId = this.session.id, c.type = 'codeeditor.fileRemoved', this.sendBroadcastChange(c)
        }, q.prototype.addEditorHandlers = function (a) {
            if (void 0 === a._addedEditorHandlers || a._addedEditorHandlers === !1) {
                var b = a.editor.getSession()
                b.on('change', this._handle.bind(this, a)), b.selection.on('changeCursor', this._handle.bind(this, a)), b.selection.on('changeSelection', this._handle.bind(this, a)), a._addedEditorHandlers = !0
            }
        }
        var r = function (b, c) {
            this.session = {
                state: m,
                needReconnect: !1,
                lastDraft: void 0,
                lastAssets: void 0
            }, this.socket = io.connect(j, k), this.codeEditor = b, this.trinketIdentifier = c.trinketIdentifier, this.userIdentifier = c.userIdentifier, this.token = window.trinketBroadcast.token, this.connectCallback = function () { }, this.socket.on('connect', this.onConnect.bind(this)), this.socket.on('connect_timeout', this.onConnectionTimeout.bind(this)), this.socket.on('disconnect', this.onDisconnect.bind(this)), this.socket.on('reconnect', this.onReconnect.bind(this)), this.socket.on('reconnect_failed', this.onReconnectFailed.bind(this)), this.socket.on('broadcastConnectionProblem', this.onBroadcastConnectionProblem.bind(this)), this.socket.on('broadcasterReconnected', this.onBroadcasterReconnected.bind(this)), this.socket.on('broadcastUpdate', this.onBroadcastChange.bind(this)), this.socket.on('leave', this.onServerLeave.bind(this)), a(document)
                .on('trinket.broadcast.confirm-keep', this.saveBroadcastSession.bind(this)), a(document)
                    .on('trinket.broadcast.cancel-keep', this.resetBroadcastSession.bind(this)), a(document)
                        .on('trinket.broadcasting.leave', this.leave.bind(this))
        }
        r.prototype.connect = function (a) {
            this.isConnected() === !0 ? a.call(this, this.socket.connected) : (this.connectCallback = a, this.socket.connect())
        }, r.prototype.isConnected = function () {
            return this.socket.connected
        }, r.prototype.onConnect = function () {
            console.log('Receiver connected', this.socket.id), void 0 !== this.connectCallback && (this.connectCallback.call(this, this.socket.connected), this.connectCallback = function () { })
        }, r.prototype.onReconnect = function () {
            this.session.state !== m && (a('#broadcastMessage')
                .parent()
                .removeClass('hide'), a('#broadcastMessage')
                    .html('Reconnected!')
                    .fadeOut('slow', function () {
                        a('#broadcastMessage')
                            .empty(), a('#broadcastMessage')
                                .parent()
                                .addClass('hide')
                    }), this.session.needReconnect = !0, this.auth(function (a) {
                        a && this.join(!0)
                    }.bind(this)))
        }, r.prototype.auth = function (a) {
            this.socket.emit('auth', {
                token: this.token
            }, this.onAuthResponse.bind(this, a))
        }, r.prototype.isAuthenticated = function () {
            return this.session.isAuthenticated
        }, r.prototype.onAuthResponse = function (a, b) {
            b.error || !b.success ? (console.log('An error has occured while authentificating: ' + b.error), this.session.isAuthenticated = !1, this.updateUI('join', 'There was a problem connecting to the room. Try refreshing the page and let us know if the problem continues.')) : (this.session.isAuthenticated = !0, console.log('Authenticated successfully')), a.call(this, this.session.isAuthenticated)
        }, r.prototype.initReceiving = function () {
            this.codeEditor._files.forEach(function (a) {
                a.editor.renderer.textarea.readOnly = !0, a.editor.setReadOnly(!0), a.editor.aceInstance.on('blur', function () {
                    a.editor.renderer.$cursorLayer.setBlinking(!0), a.editor.renderer.$cursorLayer.showCursor()
                })
            }), this.setGlobalReceiverState(n)
        }, r.prototype.uninitReceiving = function () {
            this.codeEditor._files.forEach(function (a) {
                a.editor.renderer.textarea.readOnly = !1, a.editor.setReadOnly(!1)
            })
        }, r.prototype.requestSync = function () {
            this.socket.emit('sync', {
                trinketId: this.trinketIdentifier
            }, function (a) {
                a.error && console.log('Sync request failed: ', a)
            })
        }, r.prototype.onReconnectFailed = function (b) {
            a('#broadcastMessage')
                .empty(), a('#broadcastMessage')
                    .parent()
                    .addClass('hide'), this.updateUI('join'), this.session.state = m, this.uninitReceiving(), this.saveBroadcastOrDraft('reconnectFailed')
        }, r.prototype.onConnectionTimeout = function () {
            console.log('Receiver.onConnectionTimeout', this.session), this.updateUI('join', 'Connection timed out. Check your internet connection then try again.')
        }, r.prototype.onDisconnect = function () {
            this.session.isAuthenticated = !1, console.log('Receiver.disconnect from socket: state:', this.session.state), this.session.state !== m && (a('#broadcastMessage')
                .parent()
                .removeClass('hide'), a('#broadcastMessage')
                    .html('Reconnecting...'))
        }, r.prototype.onBroadcastConnectionProblem = function () {
            a('#broadcastMessage')
                .parent()
                .removeClass('hide'), a('#broadcastMessage')
                    .html('Reconnecting...')
        }, r.prototype.onBroadcasterReconnected = function () {
            a('#broadcastMessage')
                .parent()
                .removeClass('hide'), a('#broadcastMessage')
                    .html('Reconnected!')
                    .fadeOut('slow', function () {
                        a('#broadcastMessage')
                            .empty(), a('#broadcastMessage')
                                .parent()
                                .addClass('hide')
                    }), this.requestSync()
        }, r.prototype.join = function (a) {
            var b; var c = a || !1
            return console.log('Receiver.join force: ' + a, this.session), this.session.state !== m && c === !1 ? void console.log('Receiver.join cannot join twice', this.session.state) : (b = {
                user: this.userIdentifier,
                trinketId: this.trinketIdentifier
            }, void this.socket.emit('join', b, this.onJoinResponse.bind(this)))
        }, r.prototype.onJoinResponse = function (a) {
            return console.log('Receiver.onJoinResponse ', a), a.error ? (this.session.state = m, void this.updateUI('join', 'There was a problem connecting to the room. Try refreshing the page and let us know if the problem continues.')) : (this.session.trinketId = a.trinketId, this.session.state = a.state, this.session.lastDraft = this.codeEditor.serialize(), this.codeEditor.assetBrowser && (this.session.lastAssets = this.codeEditor.assetBrowser.options.assets.slice()), this.requestSync(), this.initReceiving(), void this.updateUI('leave'))
        }, r.prototype.onServerLeave = function (a) {
            console.log('Receiver.onServerLeave', a), this.isConnected() !== !1 && this.isAuthenticated() !== !1 && this.session.state !== m && (this.updateUI('join'), this.session.state = m, this.uninitReceiving(), this.saveBroadcastOrDraft('serverLeave'))
        }, r.prototype.saveBroadcastOrDraft = function (b) {
            switch (console.log('saveBroadcastOrDraft event:', b), a('#controlRoomModal')
                .hasClass('open') || a('a.broadcast-it')
                    .trigger('click'), a('#broadcastReceiverInfo')
                        .addClass('hide'), b) {
                case 'leave':
                    a('#left-broadcast-reason')
                        .empty()
                    break
                case 'reconnectFailed':
                    a('#left-broadcast-reason')
                        .html('Could not reconnect to broadcast session.')
                    break
                case 'serverLeave':
                    a('#left-broadcast-reason')
                        .html('The broadcast session has ended.')
                    break
                default:
                    a('#left-broadcast-reason')
                        .empty()
            }
            a('#keepBroadcastSessionButtons')
                .removeClass('hide'), a('#broadcastMessage')
                    .empty(), a('#broadcastMessage')
                        .parent()
                        .addClass('hide')
        }, r.prototype.setGlobalReceiverState = function (a) {
            window.TrinketAPI._receiverBroadcastState = a
        }, r.prototype.saveBroadcastSession = function () {
            this.setGlobalReceiverState(m), a(document)
                .trigger('trinket.code.change'), a('#controlRoomModal')
                    .foundation('reveal', 'close')
        }, r.prototype.resetBroadcastSession = function () {
            this.setGlobalReceiverState(m), this.codeEditor.reset(this.session.lastDraft), this.codeEditor.assetBrowser && this.codeEditor.assetBrowser.assets(this.session.lastAssets), a('#controlRoomModal')
                .foundation('reveal', 'close')
        }, r.prototype.leave = function () {
            console.log('Receiver.leave'), this.isConnected() && this.isAuthenticated() && this.session.state !== m && (this.socket.emit('leave', {
                trinketId: this.trinketIdentifier
            }, function (a) {
                console.log('Receiver.leave.callback', a)
            }), this.updateUI('join'), this.session.state = m, this.uninitReceiving(), this.saveBroadcastOrDraft('leave'))
        }, r.prototype.updateUI = function (b, c) {
            switch (b) {
                case 'leave':
                    a('.broadcast-it')
                        .addClass('broadcasting'), a('.broadcast-join-control')
                            .removeClass('success')
                            .addClass('warning'), a('.broadcast-join-control')
                                .find('i')
                                .removeClass()
                                .addClass('fa fa-leave'), a('.broadcast-join-control')
                                    .data('action', 'broadcasting.leave'), a('.broadcast-join-control')
                                        .find('span')
                                        .text('Leave Room'), a('.broadcast-it')
                                            .prop('title', 'Receiving Broadcast'), a('.broadcast-status')
                                                .html(c || 'Receiving broadcast! <a class="close-control-room button radius tiny">Close Control Room <i class="fa fa-times-circle"></i></a>'), a('.close-control-room')
                                                    .click(function () {
                                                        a('#controlRoomModal')
                                                            .foundation('reveal', 'close')
                                                    }), a('.save-it')
                                                        .addClass('disabled'), a('#version-toggle')
                                                            .attr('disabled', !0), a('.right-menu-link')
                                                                .addClass('disabled')
                    break
                case 'join':
                    a('.broadcast-it')
                        .removeClass('broadcasting'), a('.broadcast-it')
                            .prop('title', 'Join Broadcasting'), a('.broadcast-join-control')
                                .removeClass('warning')
                                .addClass('success'), a('.broadcast-join-control')
                                    .data('action', 'broadcasting.join'), a('.broadcast-join-control')
                                        .find('i')
                                        .removeClass()
                                        .addClass('fa fa-enter'), a('.broadcast-join-control')
                                            .find('span')
                                            .text('Join Room'), a('.broadcast-it')
                                                .prop('title', 'Join Broadcasting'), a('.broadcast-status')
                                                    .html(c || 'Not Joined'), a('.save-it')
                                                        .removeClass('disabled'), a('#version-toggle')
                                                            .removeAttr('disabled'), a('.right-menu-link')
                                                                .removeClass('disabled')
            }
        }, r.prototype.onBroadcastChange = function (b) {
            if (this.isAuthenticated() === !1 || this.isConnected() === !1 || this.session.state !== n) return void console.log('Receiver.onBroadcastChange dismiss event', b)
            var c
            for (Array.isArray(b) || (b = [b]), c = 0; c < b.length; c++) {
                var d = b[c].type
                var e = b[c]
                switch (d) {
                    case 'codeeditor.fileRemoved':
                        this.removeFile(e.fileName)
                        break
                    case 'codeeditor.fileAdded':
                        this.addFile(e.name, e.fileID, e.content)
                        break
                    case 'codeeditor.fileRenamed':
                        this.renameFile(e.oldFileName, e.newFileName, e.fileID)
                        break
                    case 'document.changeSelection':
                        this.changeSelection(e.fileName, e)
                        break
                    case 'document.changeCursor':
                        this.changeCursor(e.fileName, e)
                        break
                    case 'document.change':
                        var f = e.fileName
                        this.applyChangeOnFile(f, e)
                        break
                    case 'document.blur':
                        break
                    case 'document.focus':
                        break
                    case 'document.changeMode':
                        break
                    case 'codeeditor.tabChanged':
                        this._changeTab(e.tabIndex)
                        break
                    case 'codeeditor.run':
                        a('#editor')
                            .trigger('trinket.code.run', {
                                action: 'code.run'
                            })
                        break
                    case 'codeeditor.clear':
                        a(document)
                            .trigger('sk.system.clear')
                        break
                    case 'assets.change':
                        this.changeAssets(e.assets)
                        break
                    case 'codeeditor.loadState':
                        this.codeEditor.reset(e.state), this.initReceiving()
                }
            }
        }, r.prototype.changeAssets = function (a) {
            var b = this.codeEditor.assetBrowser
            b && b.assets(a)
        }, r.prototype._changeTab = function (a) {
            this.codeEditor._selectTab(a, !1)
        }, r.prototype.changeCursor = function (a, b) {
            var c = this.getFileFromName(a)
            console.log(a, b), c != null && (c.editor.scrollToLine(b.row, !0, !0, function () { }), c.editor.getSession()
                .selection.moveCursorTo(b.row, b.column))
        }, r.prototype.changeSelection = function (a, b) {
            var c = this.getFileFromName(a)
            c != null && (c.editor.getSession()
                .selection.setSelectionRange(b), c.editor.scrollToLine(b.end.row, !0, !0, function () { }))
        }, r.prototype.removeFile = function (a) {
            var b
            b = this.getFileFromName(a), b != null ? (b.$tab.detach(), b.$content.detach(), b.editor.destroy()) : this.requestSync()
        }, r.prototype.addFile = function (a, b, c) {
            var d; var e = {}
            return e.name = a || '', e.content = c || '', e.hidden = !1, this.codeEditor.hasFile(a) === !0 && this.removeFile(a), d = this.codeEditor.addFile(e), d._fileID = b, d.editor.setReadOnly(!0), d.editor.renderer.textarea.readOnly = !0, d.editor.aceEditor && d.editor.aceEditor.showCursor(), d.editor.renderer.$cursorLayer.isVisible = !0, d.editor.renderer.$cursorLayer.restartTimer(), d.editor.aceInstance.on('blur', function () {
                d.editor.renderer.$cursorLayer.setBlinking(!0), d.editor.renderer.$cursorLayer.showCursor()
            }), d
        }, r.prototype.renameFile = function (a, b, c) {
            var d, e
            d = this.getFileFromName(a), d == null ? (d = this.addFile(b), this.codeEditor.selectFile(b)) : (d.editor.setModeFromName(b), d.name = b, e = d.$tab.find('.file-name'), e.text(b))
        }, r.prototype.applyChangeOnFile = function (a, b) {
            var c = this.getFileFromName(a)
            c !== null && (c.editor.getSession()
                .getDocument()
                .applyDeltas([b]), c.editor.scrollToLine(b.end.row, !0, !0, function () { }))
        }, r.prototype.getFileFromName = function (a) {
            var b
            for (b = 0; b < this.codeEditor._files.length; b++) { if (this.codeEditor._files[b].name === a) return this.codeEditor._files[b] }
            return null
        }, r.prototype.getFileById = function (a) {
            var b
            for (b = 0; b < this.codeEditor._files.length; b++) { if (this.codeEditor._files[b]._fileID === a) return this.codeEditor._files[b] }
            return null
        }, window.TrinketIO['export']('trinket.broadcast.connection', {
            initialize: f
        })
    }(window.jQuery, window.TrinketIO, window.ace)),
    (function () {
        'use strict'

        function a(a, b) {
            c(function () {
                g.send(a + ',' + (typeof b === 'object' ? JSON.stringify(b) : b))
            })
        }

        function b(b, c) {
            switch (b) {
                case 'reload':
                    v[c] = j.getFile(c)
                        .replace(/[^\x00-\x7F]/g, ''), a('file', {
                            name: c,
                            contents: v[c]
                        })
                    break
                case 'completions':
                    if (editor.completer && editor.completer.detach(), !i) return
                    var d = JSON.parse(c)
                    if (d.id.toString() === i.id.toString()) {
                        var e = Date.now() - i.when
                        window.ga && !r && window.ga('send', 'event', 'Embedded Python Interface', 'Autocomplete', 'Timing', e), d = d.list || []
                        for (var f = 0; f < d.length; f++) {
                            d[f] = {
                                caption: d[f].desc,
                                docs: d[f].docs,
                                value: d[f].name,
                                score: 500 - f,
                                meta: d[f].type,
                                type: d[f].type
                            }
                        }
                        if (i.inImport) {
                            var g = j.getAllFiles({
                                filter: '^.*\\.py$',
                                values: !1
                            })
                            for (var h in g) {
                                var k = h.replace(/\.py$/, '')
                                d.push({
                                    caption: k,
                                    value: k,
                                    type: 'import',
                                    meta: 'import',
                                    score: 500
                                })
                            }
                        }
                        i.cb(null, d), i = void 0
                    }
            }
        }

        function c(a) {
            return n ? a() : h ? void (a && p.push(a)) : (h = !0, g = new SockJS(t), g.onopen = function () {
                var a = {
                    id: o
                }
                g.send('session,' + JSON.stringify(a))
            }, g.onmessage = function (c) {
                var d = c.data.split(/,(.+)?/)
                if (d[0] === 'session_ready') {
                    for (n = !0, h = !1; p.length;) p.shift()()
                    a && a()
                } else n && b(d[0], d[1])
            }, void (g.onclose = function () {
                g = void 0, h = !1, n = !1
            }))
        }

        function d(b) {
            q || (q = !0, j = b, f = new diff_match_patch(), f.Diff_Timeout = 1, f.Diff_EditCost = 5, ace.require('ace/ext/language_tools')
                .setCompleters([{
                    identifierRegexps: [/[.a-zA-Z_0-9\$\-\u00A2-\uFFFF]/],
                    getCompletions: function (b, c, d, e, f) {
                        var g; var h; var j = c.getTokenAt(d.row, d.column)
                        return j.type === 'string' || j.type === 'comment' ? f(null, []) : (i && (b.completer && b.completer.detach(), i.cb(null, [])), i = {
                            id: ++l,
                            cb: f
                        }, g = w(b, d, i), h = {
                            id: String(i.id),
                            line: d.row + 1,
                            column: d.column,
                            file: b._fileName
                        }, g && (h.patch = g), i.when = Date.now(), void a('autocomplete', h))
                    },
                    getDocTooltip: function (a) {
                        if (a.type == 'function' && a.docs.length) {
                            var b = a.docs.split('\n', 1)[0]
                            var c = a.docs.split(/\-{2,}\s*/)[1]
                            a.docHTML = '<b>' + b + '</b>', c && (a.docHTML += '<hr></hr>' + c)
                        }
                    }
                }]))
        }

        function e(b, c) {
            function e(b) {
                v[b.newName] = v[b.oldName], delete v[b.oldName], a('file_rename', {
                    oldName: b.oldName,
                    newName: b.newName
                })
            }

            function f(b) {
                delete v[b._fileName], a('file_remove', {
                    fileName: b._fileName
                })
            }

            function g() {
                /python/.test(b.session.getMode()
                    .$id) ? (a('file', {
                        name: b._fileName,
                        contents: b.getValue()
                    }), v[b._fileName] = b.getValue(), b.on('file.rename', e), b.on('destroy', f), b.on('blur', function () {
                        i = void 0, b.completer && b.completer.detach()
                    }), b.setOptions({
                        enableBasicAutocompletion: !0,
                        enableLiveAutocompletion: !0
                    })) : (b.off('file.rename', e), b.off('file.remove', f), b.setOptions({
                        enableBasicAutocompletion: !1,
                        enableLiveAutocompletion: !1
                    }))
            }
            window.ace && u && (d(c), b.on('changeMode', function () {
                g()
            }), g())
        }
        var f; var g; var h; var i; var j; var k = $({})
        var l = 0
        var m = TrinketIO['import']('utils.guid')
        var n = !1
        var o = 's' + m('', 16)
        var p = []
        var q = !1
        var r = !1
        var s = window.trinketSocketConfig
        var t = s.protocol + '://' + s.hostname + ':' + s.port + s.autocompletePath
        var u = s.enabled === 'true'
        var v = {}
        var w = function (a, b, c) {
            var d; var e; var g; var h = a.getValue()
            var i = void 0 === v[a._fileName] ? h : v[a._fileName]
            var k = a.session.doc.positionToIndex(b, 0)
            return h = h.replace(/[^\x00-\x7F]/g, ''), h = h.replace(/(((?:^|;)[^\S\n\r]*)(from|import)((?:[^\S\r\n]+|\\[\r\n])+))((?:[\w.,*]+(?:[^\S\n\r]*\\[\r\n])*[^\S\n\r]*)*)(?:;|$)/gm, function (a, d, e, f, g, h, i) {
                return h = f === 'from' ? h.replace(/^[\w.]*/, function (e, f) {
                    var g = i + d.length + f
                    var h = e.split('.')
                    var l = j.hasFile(e + '.py') ? 'sessions.' + o + '.' : 'modules.'
                    return k >= g && k <= i + a.length && (b.column += l.length, k <= g + h[0].length && (c.inImport = !0)), l + e
                }) : h.replace(/[^,]*/g, function (a, e) {
                    if (e && !a) return a
                    var f = i + d.length + e
                    var g = a.match(/[\w.]+/g) || [a]
                    var h = g[0]
                    var l = j.hasFile(h + '.py') ? 'sessions.' + o + '.' : 'modules.'
                    var m = g.length === 1 && h.match(/[\w.]/) ? ' as ' + h : ''
                    return k >= f && k <= f + a.length && (k <= f + a.indexOf(h) + h.length ? (b.column += l.length, k <= f + a.split('.')[0].length && (c.inImport = !0)) : b.column += l.length + h.length + m.length), a.replace(h, l + h + m)
                }), d + h
            }), h !== i ? (v[a._fileName] = h, d = f.diff_main(i, h, !0), d.length > 2 && f.diff_cleanupEfficiency(d), e = f.patch_make(i, h, d), g = f.patch_toText(e)) : void 0
        }
        window.TrinketIO['export']('python.editor.autocomplete', {
            initialize: e,
            on: function () {
                return k.on.apply(k, arguments)
            },
            off: function () {
                return k.off.apply(k, arguments)
            },
            setInLibrary: function (a) {
                r = a
            }
        })
    }()),
    (function () {
        'use strict'

        function a() {
            f.__initialized || (f.__initialized = !0, $('body')
                .append(f))
        }

        function b(b) {
            function h() {
                w && (i(u), w = !1)
            }

            function i(a) {
                var c, d, e
                if (a && a.length) {
                    for (; a.length;) {
                        for (c = a.pop(), d = v[c.range.start.row][c.range.start.column], e = 0; e < d.length; e++) {
                            if (d[e].id === c.id) {
                                d.splice(e, 1)
                                break
                            }
                        } b.getSession()
                            .removeMarker(c.id)
                    }
                }
            }

            function j(a, d, e, f) {
                var g = d.line - 1
                var h = new c(g, d.start, g, d.end)
                var i = {
                    id: b.getSession()
                        .addMarker(h, e || 'variable-undefined'),
                    data: f,
                    range: h
                }
                a.push(i), w = !0, v[g] || (v[g] = []), v[g][d.start] || (v[g][d.start] = []), v[g][d.start].push(i)
            }

            function k(a, b) {
                var c; var d; var e; var f = a && a._astname
                if (f) {
                    if (b[f] && b[f].enter && b[f].enter(a), a._fields) {
                        for (c = 0; c < a._fields.length; c += 2) {
                            if (e = a._fields[c + 1](a)) {
                                if (e._astname) k(e, b)
                                else if (e.constructor === Array && e.length && e[0] && e[0]._astname) { for (d = 0; d < e.length; d++) k(e[d], b) }
                            }
                        }
                    }
                    b[f] && b[f].leave && b[f].leave(a)
                }
            }

            function l() {
                var a; var c; var d; var f; var g; var i; var l = 'main.py'
                var m = b.getValue()
                var n = ""
                if (n && (m = n + '\n' + m), h(), !/import\s+\*/.test(m)) {
                    try {
                        c = Sk.parse(l, m), d = Sk.astFromParse(c.cst, l, c.flags), f = Sk.symboltable(d, l)
                    } catch (o) {
                        return
                    }
                    g = [], i = f.top, a = {
                        enter: function (a) {
                            g.push(i), i = f.getStsForAst(a)
                        },
                        leave: function (a) {
                            i = g.pop()
                        }
                    }, k(d, {
                        FunctionDef: a,
                        ClassDef: a,
                        Name: {
                            enter: function (a) {
                                var b = a.id.v
                                var c = i.lookup(b)
                                !c.is_global() || Sk.builtins.hasOwnProperty(b) || e.hasOwnProperty(b) || f.global.hasOwnProperty(b) && (f.top.lookup(b)
                                    .is_assigned() || f.top.lookup(b)
                                        .is_imported()) || j(u, {
                                            line: a.lineno,
                                            start: a.col_offset,
                                            end: a.col_offset + b.length
                                        }, !1, {
                                            message: "<code>" + b + "</code> 并没有定义. 你是不是有别的意思?"
                                        })
                            }
                        }
                    })
                }
            }

            function m(a, c) {
                var d = b.session.getTokenAt(a, c)
                return (!d || d.type === 'text' && /^\s+$/.test(d.value)) && (d = b.session.getTokenAt(a, c + 1)), d && (d.row = a, v[a] && v[a][d.start] && (d.marker = v[a][d.start][0])), d
            }

            function n() {
                h(), t && clearTimeout(t), t = setTimeout(l, 883)
            }

            function o(a) {
                var b, c
                x && (f.hide(), x = !1), w && (b = a.getDocumentPosition(), c = m(b.row, b.column), c && c.marker && c.marker.data && c.marker.data.message && (x = !0, f.css({
                    left: a.domEvent.pageX,
                    top: a.domEvent.pageY + 10
                })
                    .html(c.marker.data.message)
                    .show()))
            }

            function p(a, b) {
                var c = b.getCursor()
                var e = m(c.row, c.column)
                !e || z.row === e.row && z.start === e.start || (e.type === 'keyword' && g[e.value] ? d.trigger('info.token', {
                    token: e,
                    title: g[e.value],
                    url: trinketConfig.prefix('/partials/python-docs/keywords/' + e.value + '.html')
                }) : e.marker ? d.trigger('info.token', {
                    token: e,
                    title: e.marker.data.message
                }) : d.trigger('info.token', void 0), z = e)
            }

            function q() {
                y || (y = !0, c || (c = ace.require('ace/range')
                    .Range), b.on('change', n), b.on('mousemove', o), b.session.selection.on('changeCursor', p), l())
            }

            function r() {
                y && (y = !1, b.off('change', n), b.off('mousemove', o), b.session.selection.off('changeCursor', p))
            }

            function s() {
                /python/.test(b.session.getMode()
                    .$id) ? q() : r()
            }
            var t; var u = []
            var v = []
            var w = !1
            var x = !1
            var y = !1
            var z = {}
            a(), b.on('changeMode', function () {
                s()
            }), s()
        }
        var c; var d = $({})
        var e = {
            True: 1,
            False: 1,
            None: 1,
            NotImplemented: 1,
            Ellipsis: 1,
            __debug__: 1,
            'float': 1,
            'int': 1,
            'long': 1
        }
        var f = $('<div class="editor-tooltip"></div>')
            .hide()
        var g = {
            and: 'The boolean <code>and</code> operator.',
            as: 'Module aliasing: <code>import random as rnd</code>.',
            assert: 'Use <code>assert</code> to test assumptions.',
            'break': 'Use <code>break</code> to stop the (loop) cycle.',
            'class': 'Use <code>class</code> to create new user defined modules.',
            'continue': 'Use <code>continue</code> to skip to the next (loop) cycle.',
            def: 'A <code>def</code> defines a function.',
            del: 'Use <code>del</code> to delete an object.',
            elif: 'Use <code>elif</code> for else-if conditionals.',
            'else': '<code>else</code> is executed unless <code>if</code> is true.',
            except: 'Use <code>except</code> to catch an exception.',
            exec: '<code>exec</code> is not yet implemented.',
            'finally': '<code>finally</code> blocks are always executed.',
            'for': '<code>for</code> iterates over a list in order.',
            from: 'Use <code>from</code> to import a specific part of a module.',
            global: '<code>global</code> accesses variables defined outside functions',
            'if': 'Use <code>if</code> to conditionally execute statements.',
            'import': 'Use <code>import</code> to use external modules.',
            'in': '<code>in</code> tests if a sequence contains a value.',
            is: '<code>is</code> tests for object identity.',
            lambda: '<code>lambda</code> creates a new anonymous function',
            not: 'The boolean <code>not</code> operator.',
            or: 'The boolean <code>or</code> operator.',
            pass: '<code>pass</code> does nothing at all, seriously.',
            print: 'Use <code>print</code> to write output.',
            raise: 'Use <code>raise</code> to create an exception.',
            'return': 'Use <code>return</code> to exit a function.',
            'try': 'Use <code>try</code> to capture exceptions.',
            'while': 'Use <code>while</code> to loop until a condition is false.',
            'with': '<code>with</code> simplifies exception handling.',
            'yield': '<code>yield</code> exits a generator with a value.'
        }
        window.TrinketIO['export']('python.editor.hints', {
            initialize: b,
            on: function () {
                return d.on.apply(d, arguments)
            },
            off: function () {
                return d.off.apply(d, arguments)
            }
        })
    }()),
    (function () {
        function a() { }

        function b(a) {
            h = a, $('#test-totals')
                .html(i + ' out of ' + h + ' tests passed')
        }

        function c(a, b, c) {
            g += 1, i += 1
            var d = j('unittest-pass', {
                testNumber: g,
                shortDescription: b,
                description: c
            })
            $('#unittest-accordion')
                .append($(d)), $('#test-totals')
                    .html(i + ' out of ' + h + ' tests passed'), $(document)
                        .foundation()
        }

        function d(a, b, c, d) {
            g += 1
            var d = d.replace('\n', '<br>')
            var e = j('unittest-fail', {
                testNumber: g,
                shortDescription: b,
                description: c,
                reason: d
            })
            $('#unittest-accordion')
                .append($(e)), $(document)
                    .foundation()
        }

        function e(a, b) {
            g += 1
            var b = b.replace('\n', '<br>')
            var c = j('unittest-error', {
                testNumber: g,
                shortDescription: a,
                reason: b
            })
            $('#unittest-accordion')
                .append($(c)), $(document)
                    .foundation()
        }

        function f() {
            return g
        }
        var g; var h; var i; var j = window.TrinketIO['import']('utils.template')
        window.TrinketIO['export']('python.editor.unittests', {
            initializePlugin: function () {
                g = 0, h = 0, i = 0, $('li.accordion-navigation')
                    .remove(), $('#unittest-accordion')
                        .on('toggled', function (a, b) {
                            var c = $('.open-close-indicator.fa-angle-down')
                            if (c.addClass('fa-angle-right'), c.removeClass('fa-angle-down'), $('.content.active')
                                .length) {
                                var d = $(b)
                                    .parent()
                                    .find('.open-close-indicator')
                                d.removeClass('fa-angle-right'), d.addClass('fa-angle-down')
                            }
                        })
            },
            addTest: a,
            addSuccess: c,
            addFailure: d,
            addError: e,
            setNumberOfTests: b,
            getNumberOfTestsRun: f
        })
    }()),
    (function (a) {
        a['export']('sendSignalToSkulpt', function (a) {
            Sk.signals != null && Sk.signals.signal != null && Sk.signals.signal(a)
        })
    }(window.TrinketIO)),
    (function (a) {
        function b() {
            this._eventListeners, this._eventQueue = [], this._threadHandler = null, this._isDownDict = {}, this._signal = i
        }

        function c(c) {
            var d, e, f
            p[c.which] ? (c.preventDefault(), d = '', f = g(c.which), e = p[f].keyword, a.runtime('usingSenseHat3d') ? ($('#_sense_hat_joystick_')
                .removeClass(n)
                .addClass(p[f].transform), $('#_astro_pi_joystick_top_')
                    .removeClass(n)
                    .addClass(p[f].transform), $('#_astro_pi_joystick_base_')
                        .removeClass(n)
                        .addClass(p[f].transform), n = p[f].transform) : ($('#_sense_hat' + l)
                            .hide(), $('#_sense_hat' + p[f].state)
                                .show(), l = p[f].state), Sk.sense_hat.sensestick.isKeyDown(e) ? d = b.STATE_HOLD : Sk.sense_hat.sensestick.addKeyDownEventToDict(e), window.sense_hat.sensestick.push(p[f].key, d || b.STATE_PRESS)) : c.ctrlKey && String.fromCharCode(c.which)
                                    .toLowerCase() === 'c' ? $(document)
                                        .trigger('trinket.code.stop') : a.runtime('usingSenseHat3d') && a.runtime('sense_hat_enclosure') === 'astro-pi' && q[c.which] && (e = q[c.which].key, $('#_astro_pi_button_' + e + '_')
                                            .addClass(o))
        }

        function d(c) {
            var d, e
            p[c.which] ? (c.preventDefault(), e = g(c.which), d = p[e].keyword, a.runtime('usingSenseHat3d') ? ($('#_sense_hat_joystick_')
                .removeClass(n)
                .addClass(m), $('#_astro_pi_joystick_top_')
                    .removeClass(n)
                    .addClass(m), $('#_astro_pi_joystick_base_')
                        .removeClass(n)
                        .addClass(m), n = m) : ($('#_sense_hat' + l)
                            .hide(), $('#_sense_hat_joystick_rest_')
                                .show(), l = '_joystick_rest_'), Sk.sense_hat.sensestick.removeKeyDownEventFromDict(d), window.sense_hat.sensestick.push(p[e].key, b.STATE_RELEASE)) : a.runtime('usingSenseHat3d') && a.runtime('sense_hat_enclosure') === 'astro-pi' && q[c.which] && (d = q[c.which].key, $('#_astro_pi_button_' + d + '_')
                                    .removeClass(o))
        }

        function e(c) {
            var d, e, f, h
            p[c.which] ? (c.preventDefault(), d = '', f = g(c.which),
                e = p[f].keyword, h = a.runtime('sense_hat_enclosure') || 'sense-hat', h = h === 'sense-hat' ? '_sense_hat' : '_astro_pi', $('#' + h + l)
                    .hide(), $('#' + h + p[f].state)
                        .show(), l = p[f].state, Sk.sense_hat.sensestick.isKeyDown(e) ? d = b.STATE_HOLD : Sk.sense_hat.sensestick.addKeyDownEventToDict(e), window.sense_hat.sensestick.push(p[f].key, d || b.STATE_PRESS)) : c.ctrlKey && String.fromCharCode(c.which)
                            .toLowerCase() === 'c' ? $(document)
                                .trigger('trinket.code.stop') : a.runtime('usingSenseHat3d') && a.runtime('sense_hat_enclosure') === 'astro-pi' && q[c.which] && (e = q[c.which].key, $('#_astro_pi_button_' + e + '_rest_')
                                    .hide(), $('#_astro_pi_button_' + e + '_pressed_')
                                        .show())
        }

        function f(c) {
            var d, e, f
            p[c.which] ? (c.preventDefault(), e = g(c.which), d = p[e].keyword, f = a.runtime('sense_hat_enclosure') || 'sense-hat', f = f === 'sense-hat' ? '_sense_hat' : '_astro_pi', $('#' + f + l)
                .hide(), $('#' + f + '_joystick_rest_')
                    .show(), l = '_joystick_rest_', Sk.sense_hat.sensestick.removeKeyDownEventFromDict(d), window.sense_hat.sensestick.push(p[e].key, b.STATE_RELEASE)) : a.runtime('usingSenseHat3d') && a.runtime('sense_hat_enclosure') === 'astro-pi' && q[c.which] && (d = q[c.which].key, $('#_astro_pi_button_' + d + '_pressed_')
                        .hide(), $('#_astro_pi_button_' + d + '_rest_')
                            .show())
        }

        function g(a) {
            var b
            return p[a].keyword === 'Enter' ? a : (b = Math.abs($('#sense_hat_angle')
                .val()), b && (a += b / 90, a > 40 && (a -= 4)), a)
        }

        function h() {
            var b = a.runtime('usingSenseHatFlat') ? !0 : !1
            if (!a.runtime('usingSenseHat3d') || b) {
                var g = ['_sense_hat']
                var h = ['_joystick_enter_', '_joystick_up_', '_joystick_down_', '_joystick_left_', '_joystick_right_']
                var i = ['_joystick_rest_']
                b && g.push('_astro_pi'), g.forEach(function (a) {
                    h.forEach(function (b) {
                        $('#' + a + b)
                            .hide()
                    }), i.forEach(function (b) {
                        $('#' + a + b)
                            .show()
                    })
                })
            }
            b ? (j = e, k = f) : (j = c, k = d), $(document)
                .on('keydown', '#sense-hat-listener', j), $(document)
                    .on('keyup', '#sense-hat-listener', k)
        } !(function (a) {
            a.eventEmitter = {
                _JQInit: function () {
                    this._JQ = a(this)
                },
                emit: function (a, b) {
                    !this._JQ && this._JQInit(), this._JQ.trigger(a, b)
                },
                once: function (a, b) {
                    !this._JQ && this._JQInit(), this._JQ.one(a, b)
                },
                on: function (a, b) {
                    !this._JQ && this._JQInit(), this._JQ.bind(a, b)
                },
                off: function (a, b) {
                    !this._JQ && this._JQInit(), this._JQ.unbind(a, b)
                }
            }
        }($))
        var i = a['import']('sendSignalToSkulpt')
        $.extend(b.prototype, jQuery.eventEmitter), b.prototype.triggerKeyboardInterrupt = function () {
            this.emit('sensestick.input', {
                type: 'keyboardinterrupt'
            })
        }, b.prototype.addKeyDownEventToDict = function (a) {
            this._isDownDict[a] = !0
        }, b.prototype.removeKeyDownEventFromDict = function (a) {
            delete this._isDownDict[a]
        }, b.prototype.isKeyDown = function (a) {
            return this._isDownDict[a] === !0
        }, b.prototype.push = function (a, c, d) {
            var e = {
                type: d != null ? parseInt(d) : b.EV_KEY,
                key: parseInt(a),
                state: parseInt(c),
                timestamp: Date.now()
            }
            this._eventQueue.push(e), this.emit('sensestick.input', e)
        }, b.prototype.destroy = function () {
            this._threadHandler && this.off('sensestick.input', this._threadHandler), $(document)
                .off('keydown', '#sense-hat-listener', j), $(document)
                    .off('keyup', '#sense-hat-listener', k), this._isDownDict = {}, this._eventQueue = []
        }, b.EV_KEY = 1, b.STATE_RELEASE = 0, b.STATE_PRESS = 1, b.STATE_HOLD = 2, b.KEY_UP = 103, b.KEY_LEFT = 105, b.KEY_RIGHT = 106, b.KEY_DOWN = 108, b.KEY_ENTER = 28
        var j; var k; var l = '_joystick_rest_'
        var m = 'rest'
        var n = m
        var o = 'pressed'
        var p = {
            13: {
                state: '_joystick_enter_',
                key: b.KEY_ENTER,
                keyword: 'Enter',
                transform: 'enter'
            },
            37: {
                state: '_joystick_left_',
                key: b.KEY_LEFT,
                keyword: 'ArrowLeft',
                transform: 'left'
            },
            38: {
                state: '_joystick_up_',
                key: b.KEY_UP,
                keyword: 'ArrowUp',
                transform: 'up'
            },
            39: {
                state: '_joystick_right_',
                key: b.KEY_RIGHT,
                keyword: 'ArrowRight',
                transform: 'right'
            },
            40: {
                state: '_joystick_down_',
                key: b.KEY_DOWN,
                keyword: 'ArrowDown',
                transform: 'down'
            }
        }
        var q = {
            65: {
                key: 'a'
            },
            66: {
                key: 'b'
            },
            68: {
                key: 'd'
            },
            76: {
                key: 'l'
            },
            82: {
                key: 'r'
            },
            85: {
                key: 'u'
            }
        }
        a['export']('python.sense-stick', {
            initJoystick: h,
            SenseStickDevice: b
        })
    }(window.TrinketIO)),
    (function (a, b) {
        function c() {
            var a = Date.now()
            var b = 1e3 * a
            return b
        }

        function d(a) {
            return a < 0 && (a += 360), Math.round(10 * a) / 10 % 361
        }

        function e(b) {
            a.sense_hat.rtimu.raw_orientation = b.asArray()
            var c; var e; var f; var g; var h = {
                pitch: d(b.pitch),
                roll: d(b.roll),
                yaw: d(b.yaw),
                rotation_matrix: b.matrix
            }
            for (c = 0; z > c; c++) {
                g = y[c], e = 'sense-hat-' + g, f = 'sense_hat_' + g, $('span.' + e)
                    .length && $('span.' + e)
                        .html(h[g]), $('#' + f)
                            .val(h[g])
                            .change()
            }
        }

        function f() {
            var b = a.sense_hat.rtimu.timestamp;
            (b === null || void 0 === b) && (b = c())
            var d = c()
            var e = (d - b) / 1e6
            e === 0 && (e = 1)
            var f = a.sense_hat.rtimu.raw_old_orientation
            var h = Geometry.degToRad(a.sense_hat.rtimu.raw_orientation)
            var i = [h[0] - f[0], h[1] - f[1], h[2] - f[2]]
            i = Geometry.divideArrayWithScalar(i, e)
            var j = h[0]
            var k = h[1]
            var l = h[2]
            var m = Math.cos(l)
            var n = Math.cos(k)
            var o = Math.cos(j)
            var p = Math.sin(l)
            var q = Math.sin(k)
            var r = Math.sin(j)
            var s = [
                [m * n, m * q * r - o * p, p * r + m * o * q],
                [n * p, m * o + p * q * r, o * p * q - m * r],
                [-q, n * r, n * o]
            ]
            var t = Geometry.transpose3x3Matrix(s)
            var u = Geometry.dot3x3and3x1(t, Geometry.Defaults.GRAVITY)
            var v = Geometry.dot3x3and3x1(t, Geometry.Defaults.NORTH)
            a.sense_hat.rtimu.raw_old_orientation = h, a.sense_hat.rtimu.fusionPose = h, a.sense_hat.rtimu.timestamp = d, u = g(u, 0.1), a.sense_hat.rtimu.accel = [Geometry.clamp(u[0], -8, 8), Geometry.clamp(u[1], -8, 8), Geometry.clamp(u[2], -8, 8)], i = g(i, 0.5), a.sense_hat.rtimu.gyro = [i[0], i[1], i[2]], v = g(v, 0.01), a.sense_hat.rtimu.compass = [100 * v[0], 100 * v[1], 100 * v[2]]
        }

        function g(a, b, c) {
            c == null && (c = 5)
            for (var d = [0, 0, 0], e = 0; c > e; e++) d[0] += i(a[0], b), d[1] += i(a[1], b), d[2] += i(a[2], b)
            return d[0] /= c, d[1] /= c, d[2] /= c, d
        }

        function h() {
            if (this.haveNextNextGaussian) return this.haveNextNextGaussian = !1, this.nextNextGaussian
            var a, b, c
            do a = 2 * Math.random() - 1, b = 2 * Math.random() - 1, c = a * a + b * b; while (c >= 1 || c === 0)
            var d = Math.sqrt(-2 * Math.log(c) / c)
            return this.nextNextGaussian = b * d, this.haveNextNextGaussian = !0, a * d
        }

        function i(a, b, c) {
            var d = 0.2 * h()
            var e = a + d * b
            return c && console.info('mean: ', a, d, b, ' rg:', e), e
        }

        function j(a, b) {
            var c = h()
            var d = a + c * b
            var e = a + b
            var f = a - b
            return Math.min(Math.max(f, d), e)
        }

        function k(a, b, c, d) {
            this.pitch = a, this.roll = b, this.yaw = c, this.matrix = d
        }

        function l() {
            t = $('.orientation-stage'), u = $('.orientation-layer'), v = $('#orientation-reset-btn'), w = $('#enclosure-toggle'), b.runtime('mission-zero') && $('#enclosure-toggle-container')
                .hide()
            var c, d
            for (c = 0; c < y.length; c++) {
                d = 'sense_hat_' + y[c], $('#' + d)
                    .data('skip-trigger', !0), typeof b.runtime(d) !== 'undefined' && ($('#' + d)
                        .val(b.runtime(d)), b.runtime(d, void 0))
            }
            $('#sense_hat_pitch')
                .val(), $('#sense_hat_roll')
                    .val(), $('#sense_hat_yaw')
                        .val(), parseInt($('#sense_hat_angle')
                            .val()), $('#sense_hat_rotation_matrix')
                                .val()
            a.set_onrotate(function (a, b, c) {
                e(new k(180 * a / Math.PI, 180 * b / Math.PI, 180 * c / Math.PI))
            })
            var f = new k(90, 0, 0)
            e(f), v.on('click', function (c) {
                c.preventDefault()
                var d; var f = 90
                var g = 0
                var h = 0
                var i = [0, 0, 1]
                b.runtime('sense_hat_enclosure') === 'astro-pi' && (i[0] = 0, i[2] = 1), a.rotatemodel(Geometry.degToRad(f), Geometry.degToRad(g), Geometry.degToRad(h)), d = Geometry.degToRad(h)
                var j = new k(f, g, h)
                e(j)
            }), b.runtime('sense_hat_enclosure') && b.runtime('sense_hat_enclosure') !== 'sense-hat' ? b.runtime('sense_hat_enclosure', 'sense-hat') : b.runtime('sense_hat_enclosure', 'astro-pi'), $('#sense_hat_enclosure')
                .data('skip-trigger', !0)
            var g = b.runtime('usingSenseHatFlat') ? n : m
            g(), w.on('click', g)
        }

        function m(a) {
            b.runtime('sense_hat_enclosure') === 'sense-hat' ? ($('#_sense_hat_wrapper_')
                .addClass('hide'), $('#_astro_pi_wrapper_')
                    .removeClass('hide'), b.runtime('sense_hat_enclosure', 'astro-pi'), $('#enclosure-toggle')
                        .attr('src', 'https://trinket-app-assets.trinket.io/sense-hat-v0/sense-hat-top.png')) : ($('#_sense_hat_wrapper_')
                            .removeClass('hide'), $('#_astro_pi_wrapper_')
                                .addClass('hide'), b.runtime('sense_hat_enclosure', 'sense-hat'), $('#enclosure-toggle')
                                    .attr('src', 'https://trinket-app-assets.trinket.io/sense-hat-v0/astro-pi-top.png')), p(), $('#sense_hat_enclosure')
                                        .val(b.runtime('sense_hat_enclosure'))
                                        .trigger('change')
        }

        function n() {
            var a = $('#sense-hat-enclosure')
                .attr('class') ? $('#sense-hat-enclosure')
                    .attr('class')
                    .split(/\s+/) : []
            var c = a.indexOf('hide')
            var d = $('#_sense_hat_leds_')
                .attr('class') ? $('#_sense_hat_leds_')
                    .attr('class')
                    .split(/\s+/) : []
            var e = d.indexOf('hide')
            var f = $('#_sense_hat_joystick_')
                .attr('class') ? $('#_sense_hat_joystick_')
                    .attr('class')
                    .split(/\s+/) : []
            var g = f.indexOf('hide')
            var h = $('#_sense_hat_back_')
                .attr('class') ? $('#_sense_hat_back_')
                    .attr('class')
                    .split(/\s+/) : []
            var i = h.indexOf('hide')
            var j = $('#astro-pi-enclosure')
                .attr('class') ? $('#astro-pi-enclosure')
                    .attr('class')
                    .split(/\s+/) : []
            var k = j.indexOf('hide')
            var l = $('#_astro_pi_back_')
                .attr('class') ? $('#_astro_pi_back_')
                    .attr('class')
                    .split(/\s+/) : []
            var m = l.indexOf('hide')
            b.runtime('sense_hat_enclosure') === 'sense-hat' ? (c < 0 && (a.push('hide'), $('#sense-hat-enclosure')
                .attr('class', a.join(' '))), e < 0 && (d.push('hide'), $('#_sense_hat_leds_')
                    .attr('class', d.join(' '))), g < 0 && (f.push('hide'), $('#_sense_hat_joystick_')
                        .attr('class', f.join(' '))), i < 0 && (h.push('hide'), $('#_sense_hat_back_')
                            .attr('class', h.join(' '))), k >= 0 && (j.splice(k, 1), $('#astro-pi-enclosure')
                                .attr('class', j.join(' '))), m >= 0 && (l.splice(m, 1), $('#_astro_pi_back_')
                                    .attr('class', l.join(' '))), b.runtime('sense_hat_enclosure', 'astro-pi'), $('#enclosure-toggle')
                                        .attr('src', 'https://trinket-app-assets.trinket.io/sense-hat-v0/sense-hat-top.png')) : (c >= 0 && (a.splice(c, 1), $('#sense-hat-enclosure')
                                            .attr('class', a.join(' '))), e >= 0 && (d.splice(e, 1), $('#_sense_hat_leds_')
                                                .attr('class', d.join(' '))), g >= 0 && (f.splice(g, 1), $('#_sense_hat_joystick_')
                                                    .attr('class', f.join(' '))), i >= 0 && (h.splice(i, 1), $('#_sense_hat_back_')
                                                        .attr('class', h.join(' '))), k < 0 && (j.push('hide'), $('#astro-pi-enclosure')
                                                            .attr('class', j.join(' '))), m < 0 && (l.push('hide'), $('#_astro_pi_back_')
                                                                .attr('class', l.join(' '))), b.runtime('sense_hat_enclosure', 'sense-hat'), $('#enclosure-toggle')
                                                                    .attr('src', 'https://trinket-app-assets.trinket.io/sense-hat-v0/astro-pi-top.png')), o(), p(), $('#sense_hat_enclosure')
                                                                        .val(b.runtime('sense_hat_enclosure'))
                                                                        .trigger('change')
        }

        function o() {
            var a = $('.orientation-box')
                .width()
            var c = $('#_sense_hat_')
                .height()
            var d = 'rotateY(180deg)'
            $('.orientation-box')
                .css({
                    width: a + 'px',
                    height: c + 'px'
                }), $('.orientation-front')
                    .css({
                        width: a + 'px',
                        height: c + 'px'
                    }), b.runtime('sense_hat_enclosure') !== 'astro-pi' && (d += ' rotateZ(180deg)'), $('.orientation-back')
                        .css({
                            width: a + 'px',
                            height: c + 'px',
                            transform: d,
                            msTransform: d
                        })
        }

        function p() {
            if (a.sense_hat && a.sense_hat.pixels) {
                var c; var d; var e; var f; var g = 47
                var h = g
                var i = 0.4
                var j = 180
                var k = 255
                var l = 0
                var m = 0
                var n = 0
                var o = 1
                var p = 1
                for (c = 0; c < a.sense_hat.pixels.length; c++) {
                    if (l = 0, m = 0, n = 0, o = 1, p = 1, d = a.sense_hat.pixels[c], e = b.runtime('sense_hat_enclosure') && b.runtime('sense_hat_enclosure') !== 'sense-hat' && b.runtime('usingSenseHat3d') ? '_astro_pi_led_' : '_sense_hat_led_', f = $('#' + e + q(c) + '_'), a.sense_hat.pixels[c] = [-8 & d[0], -4 & d[1], -8 & d[2]], d[0] > h || d[1] > h || d[2] > h ? (l = d[0] > h ? (d[0] / 255 * (k - j) + j) / 255 : i, m = d[1] > h ? (d[1] / 255 * (k - j) + j) / 255 : i, n = d[2] > h ? (d[2] / 255 * (k - j) + j) / 255 : i, o = 0, p = 1) : f.attr('filter', ''), !D && C) {
                        f.children('.rled')
                            .css({
                                opacity: l
                            }), f.children('.gled')
                                .css({
                                    opacity: m
                                }), f.children('.bled')
                                    .css({
                                        opacity: n
                                    }), f.children('.oled')
                                        .css({
                                            opacity: o
                                        }), f.children('.kled')
                                            .css({
                                                opacity: p
                                            })
                    } else {
                        var r, s, t, u, v, w
                        r = parseInt(255 * l), s = parseInt(255 * m), t = parseInt(255 * n), w = 'rgb(' + [r, s, t].join(',') + ')', r + s + t === 0 ? (u = 0, v = 1) : (u = 1, v = 0), f.children('.rled')
                            .css({
                                opacity: 0
                            }), f.children('.gled')
                                .css({
                                    opacity: 0
                                }), f.children('.bled')
                                    .css({
                                        opacity: 0
                                    }), f.children('.oled')
                                        .css({
                                            opacity: v
                                        }), f.children('.kled')
                                            .css({
                                                opacity: u
                                            }), f.children('.kled')
                                                .attr('fill', w)
                    }
                }
            }
        }

        function q(a) {
            return a.toString()
                .length === 2 ? a : '0' + a
        }

        function r() {
            $('#sense-hat-enclosure')
                .attr('class', ''), $('#_sense_hat_leds_')
                    .attr('class', 'leds'), $('#_sense_hat_joystick_')
                        .attr('class', 'joystick_states')
        }

        function s() {
            var a = $('#graphic-wrap')
                .width()
            var c = a - 0.05 * a
            var d = $('#sense-hat-sensor-controls-container')
                .height()
            var e = $('#orientation-overlay')
                .height()
            var f = $('#graphic')
                .height() - d - e
            if (b.runtime('usingSenseHatFlat')) {
                var g = Math.floor(c / f)
                g > 1 && (c /= g)
            }
            if ($('.orientation-stage')
                .css({
                    width: c + 'px',
                    height: f + 'px'
                }), x && x.setup({
                    axis: void 0,
                    angle: void 0
                }), !b.runtime('usingSenseHatFlat') && b.runtime('sense_hat_enclosure') === 'astro-pi') {
                var h = 200
                var i = 500
                var j = Math.min(c, f)
                j = Math.min(Math.max(j, h), i), $('#sensehat-node')
                    .css('font-size', j + '%')
                var k = $('#sensehat-node')
                    .css('font-size')
                    .replace('px', '')
                var l = 0.7 * parseFloat(k)
                $('#_astro_pi_wrapper_')
                    .css('font-size', l + 'px')
            }
        }
        var t; var u; var v; var w; var x; var y = ['pitch', 'roll', 'yaw', 'rotation_matrix', 'angle']
        var z = y.length
        var A = a.getComputedStyle(document.documentElement, '')
        var B = (Array.prototype.slice.call(A)
            .join('')
            .match(/-(moz|webkit|ms)-/) || A.OLink === '' && ['', 'o'])[1]
        B && (B = '-' + B + '-'), Geometry = {
            _Eps: 1e-5
        }, Geometry.Vector = function (a, b, c) {
            this.x = a, this.y = b, this.z = c
        }, Geometry.Vector.prototype = {
            length: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
            },
            normalize: function () {
                var a = this.length()
                a <= Geometry._Eps || (this.x /= a, this.y /= a, this.z /= a)
            }
        }, Geometry.transpose3x3Matrix = function (a) {
            var b = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
            return b[0][0] = a[0][0], b[0][1] = a[1][0], b[0][2] = a[2][0], b[1][0] = a[0][1], b[1][1] = a[1][1], b[1][2] = a[2][1], b[2][0] = a[0][2], b[2][1] = a[1][2], b[2][2] = a[2][2], b
        }, Geometry.dot3x3and3x1 = function (a, b) {
            var c = []
            return c[0] = a[0][0] * b[0] + a[0][1] * b[1] + a[0][2] * b[2], c[1] = a[1][0] * b[0] + a[1][1] * b[1] + a[1][2] * b[2], c[2] = a[2][0] * b[0] + a[2][1] * b[1] + a[2][2] * b[2], c
        }, Geometry.multiplyArrayWithScalar = function (a, b) {
            return [a[0] * b, a[1] * b, a[2] * b]
        }, Geometry.divideArrayWithScalar = function (a, b) {
            return [a[0] / b, a[1] / b, a[2] / b]
        }, Geometry.Defaults = {}, Geometry.Defaults.O = [0, 0, 0], Geometry.Defaults.X = [1, 0, 0], Geometry.Defaults.Y = [0, 1, 0], Geometry.Defaults.Z = [0, 0, 1], Geometry.Defaults.NORTH = Geometry.multiplyArrayWithScalar(Geometry.Defaults.X, 0.33), Geometry.Defaults.GRAVITY = Geometry.Defaults.Z, Geometry.clamp = function (a, b, c) {
            var d = Math.min(c, Math.max(b, a))
            return d
        }, Geometry.degToRad = function (a) {
            return $.isArray(a) ? [a[0] * Math.PI / 180, a[1] * Math.PI / 180, a[2] * Math.PI / 180] : a * Math.PI / 180
        }, Geometry.radToDeg = function (a) {
            return $.isArray(a) ? [180 * a[0] / Math.PI, 180 * a[1] / Math.PI, 180 * a[2] / Math.PI] : 180 * a / Math.PI
        }, k.prototype.asArray = function () {
            return [this.roll, this.pitch, this.yaw]
        }, Modernizr.addTest('mixblendmode', function () {
            return Modernizr.testProp('mixBlendMode')
        })
        var C = Modernizr.mixblendmode && Detectizr.os.name !== 'linux'
        var D = Detectizr.browser.name === 'firefox' && Detectizr.os.name == 'windows'
        a.TrinketIO['export']('python.sense-orientation', {
            initOrientation: l,
            updateRTIMU: f,
            randomGaussian: j,
            updateStage: s,
            initSenseHatEnclosure: r
        })
    }(window, window.TrinketIO)),
    (function () {
        function a(a) {
            var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a)
            return b ? {
                r: parseInt(b[1], 16),
                g: parseInt(b[2], 16),
                b: parseInt(b[3], 16)
            } : null
        }

        function b(b) {
            return typeof b !== 'undefined' ? (b = a(b), [b.r, b.g, b.b, parseInt((b.r + b.g + b.b) / 3)]) : [0, 0, 0, 0]
        }

        function c() {
            var a, c, d, e
            for (a = 0; K > a; a++) {
                d = J[a], e = 'sense_hat_' + d, c = $('#' + e)
                    .val(), n(c, {
                        sensor: d,
                        focus: !1
                    })
            }
            colour = $('#sense_hat_colour')
                .val(), window.sense_hat.colour = b(colour), window.sense_hat.motion = $('#sense_hat_motion')
                    .is(':checked') ? 1 : 0
        }

        function d() {
            D && clearInterval(D), D = window.setInterval(x.updateRTIMU, 16)
        }

        function e() {
            var a, d, e, f
            for (d = 0; K > d; d++) {
                e = J[d], f = 'sense_hat_' + e, typeof TrinketIO.runtime(f) !== 'undefined' && ($('#' + f)
                    .val(TrinketIO.runtime(f)), TrinketIO.runtime(f, void 0)), L[e] = {
                        $slider: $('#' + f + '[data-rangeslider]')
                    }, L[e].$slider.rangeslider({
                        polyfill: !1,
                        onInit: function () {
                            var a = this.$element[0].id.replace('sense_hat_', '')
                            n(this.value, {
                                sensor: a,
                                focus: !1
                            })
                        },
                        onSlideEnd: function () {
                            p()
                        }
                    })
                        .on('input', function () {
                            var a = this.id.replace('sense_hat_', '')
                            n(this.value, {
                                sensor: a,
                                focus: !0
                            })
                        })
            }
            $('#sense_hat_colour')
                .on('change', function () {
                    var a = this.value
                    window.sense_hat.colour = b(a)
                }), $('#sense_hat_motion')
                    .on('change', function () {
                        window.sense_hat.motion = $('#sense_hat_motion')
                            .is(':checked') ? 1 : 0
                    }), B = setTimeout(function () {
                        c(), C = setInterval(c, 250)
                    }, 1500), TrinketIO.runtime('usingSenseHat3d') || (typeof TrinketIO.runtime('sense_hat_angle') !== 'undefined' ? (A = TrinketIO.runtime('sense_hat_angle'), TrinketIO.runtime('sense_hat_angle', void 0)) : typeof A === 'undefined' && (A = 0), a = Math.abs(A % 360), $('#sense_hat_angle')
                        .data('skip-trigger', !0), $('#sense-hat-display-angle')
                            .html(a + '&deg;'), A > 0 && (A *= -1), $('#sense_hat_angle')
                                .val(A)
                                .trigger('change')), colour = $('#sense_hat_colour')
                                    .val(), window.sense_hat.colour = b(colour), window.sense_hat.motion = $('#sense_hat_motion')
                                        .is(':checked') ? 1 : 0
        }

        function f() {
            TrinketIO.runtime('sense_hat_enclosure', 'astro-pi'), TrinketIO.runtime('sense_hat_yaw', 180), TrinketIO.runtime('missionZero', !0)
        }

        function g(a) {
            var b, c, d, e, f
            for (b = 0; K > b; b++) {
                c = J[b], d = 'sense_hat_' + c, f = $('#' + d)
                    .length ? !0 : !1, f && $('#' + d)
                        .data('skip-trigger', !0), typeof a[d] !== 'undefined' ? e = a[d] : f && (e = $('#' + d)
                            .prop('defaultValue')), L[c] && L[c].$slider.val(e)
                                .change()
            }
        }

        function h() {
            var a, b
            for (a = 0; K > a; a++) b = J[a], L[b].$slider.rangeslider('update', !1, !1)
            x.updateStage()
        }

        function i() {
            var a, b
            for (a = 0; K > a; a++) b = J[a], Object.hasOwnProperty(L, b) && L[b].$slider.rangeslider('destroy')
        }

        function j(a) {
            var b = !1
            return _.map(a, function (a, c) {
                /\.py$/.test(c) && (/import\s*sense_hat/.test(a) || /from\s*sense_hat\s*import/.test(a)) && (b = !0)
            }), b
        }

        function k() {
            TrinketIO.runtime('downloadExtra', y)
        }

        function l() {
            B && clearTimeout(B), C && clearInterval(C), D && clearInterval(D)
        }

        function m() {
            h()
        }

        function n(a, b) {
            var c; var d; var e = !isNaN(parseFloat(a)) && isFinite(a)
            if (e) {
                switch (a = Number(parseFloat(a)
                    .toFixed(2)), b.sensor) {
                    case 'temperature':
                        switch (c = '&deg; C', !0) {
                            case a >= 15 && a <= 40:
                                d = 0.5
                                break
                            case a >= 0 && a <= 60:
                                d = 1
                                break
                            default:
                                d = 2
                        }
                        break
                    case 'pressure':
                        c = 'hPa', d = 0.1
                        break
                    case 'humidity':
                        c = '%', d = a >= 20 && a <= 80 ? 3.5 : 5
                }
                d /= 3, window.sense_hat.rtimu[b.sensor] = [1, x.randomGaussian(a, d)], $('.sense-hat-' + b.sensor)
                    .html(a + c)
            } else window.sense_hat.rtimu[b.sensor] = [0, -1]
            Sk.sense_hat && Sk.sense_hat.rtimu && (Sk.sense_hat.rtimu[b.sensor] = window.sense_hat.rtimu[b.sensor]), b.focus && p()
        }

        function o(a) {
            return a.toString()
                .length === 2 ? a : '0' + a
        }

        function p(a) {
            if (typeof a !== 'undefined' && (z = a), z) {
                var b = $('#graphic-wrap')
                    .scrollTop()
                $('#sense-hat-listener')
                    .focus(), b && $('#graphic-wrap')
                        .scrollTop(b)
            }
        }

        function q(a, b, c) {
            a.rotateOnWorldAxis(b, c)
        }

        function r(a) {
            $('#canvas:hover')
                .length <= 0 || (S = a.clientX - W, O = 25e-5 * (S - T), U = a.clientY - X, Q = 25e-5 * (U - V), N && (q(window.mod, new THREE.Vector3(0, 1, 0), O), q(window.mod, new THREE.Vector3(1, 0, 0), Q), window.callback_move != null && window.callback_move(window.mod.rotation.x, window.mod.rotation.y, window.mod.rotation.y), Q *= 1 - Y, O *= 1 - Y, renderer.render(window.scene, window.camera)))
        }

        function s(a, b, c, d) {
            if (window.mod != null) {
                var e = a % 8
                var f = Math.floor(a / 8)
                var g = new THREE.MeshStandardMaterial({
                    color: 'rgb(' + b + ',' + c + ',' + d + ')'
                })
                var h = window.mod.getObjectByName('circle' + e + '_' + (7 - f) + '-1')
                h != null && (h.material = g), renderer.render(window.scene, window.camera)
            }
        }

        function t(a, b) {
            if (window.mod != null) {
                a == null && (a = Array.from(Array(64)
                    .keys()))
                for (var c = 0, d = 0; c < a.length; d++) {
                    var e = a[d] % 8
                    var f = Math.floor(a[d] / 8)
                    var g = new THREE.MeshStandardMaterial({
                        color: 'rgb(' + b[c][0] + ',' + b[c][1] + ',' + b[c][2] + ')'
                    })
                    var h = window.mod.getObjectByName('circle' + e + '_' + (7 - f) + '-1')
                    h != null && (h.material = g), c += 1
                }
                renderer.render(window.scene, window.camera)
            }
        }
        Modernizr.addTest('mixblendmode', function () {
            return Modernizr.testProp('mixBlendMode')
        })
        var u = Modernizr.mixblendmode && Detectizr.os.name !== 'linux'
        var v = Detectizr.browser.name === 'firefox' && Detectizr.os.name == 'windows' || Detectizr.browser.name === 'safari'
        var w = TrinketIO['import']('python.sense-stick')
        var x = TrinketIO['import']('python.sense-orientation')
        var y = 'https://trinket-app-assets.trinket.io/sense-hat/v2.2.0.zip'
        var z = !1
        window.sense_hat = {
            colour: [0, 0, 0, 0],
            motion: 0,
            rtimu: {
                temperature: [1, $('#sense_hat_temperature')
                    .val()
                ],
                humidity: [1, $('#sense_hat_humidity')
                    .val()
                ],
                pressure: [1, $('#sense_hat_pressure')
                    .val()
                ],
                gyro: [0, 0, 0],
                accel: [0, 0, 1],
                compass: [0, 0, 0],
                fusionPose: [0, 0, 0],
                raw_orientation: [0, 0, 0],
                raw_old_orientation: [0, 0, 0]
            },
            sensestick: new w.SenseStickDevice()
        }, window.Sk_interrupt = !1
        var A; var B; var C; var D; var E; var F = 8
        var G = 47
        var H = G
        var I = function (a, b) {
            var c; var d; var e; var f; var g = 0
            var h = 0
            var i = 0
            var j = 1
            var k = 1
            if (a && a === 'setpixel') {
                if (c = b, d = window.sense_hat.pixels[c], e = TrinketIO.runtime('sense_hat_enclosure') && TrinketIO.runtime('sense_hat_enclosure') !== 'sense-hat' && TrinketIO.runtime('usingSenseHat3d') ? '_astro_pi_led_' : '_sense_hat_led_', f = $('#' + e + o(c) + '_'), window.sense_hat.pixels[c] = [-8 & d[0], -4 & d[1], -8 & d[2]], s(c, parseInt(255 * d[0]), parseInt(255 * d[1]), parseInt(255 * d[2])), !v && u) {
                    f.children('.rled')
                        .css({
                            opacity: g
                        }), f.children('.gled')
                            .css({
                                opacity: h
                            }), f.children('.bled')
                                .css({
                                    opacity: i
                                }), f.children('.oled')
                                    .css({
                                        opacity: j
                                    }), f.children('.kled')
                                        .css({
                                            opacity: k
                                        })
                } else {
                    var l, m, n, p, q, r
                    l = parseInt(255 * g), m = parseInt(255 * h), n = parseInt(255 * i), r = 'rgb(' + [l, m, n].join(',') + ')', l + m + n === 0 ? (p = 0, q = 1) : (p = 1, q = 0), f.children('.rled')
                        .css({
                            opacity: 0
                        }), f.children('.gled')
                            .css({
                                opacity: 0
                            }), f.children('.bled')
                                .css({
                                    opacity: 0
                                }), f.children('.oled')
                                    .css({
                                        opacity: q
                                    }), f.children('.kled')
                                        .css({
                                            opacity: p
                                        }), f.children('.kled')
                                            .attr('fill', r)
                }
            } else a && a === 'changeLowlight' ? H = b === !0 ? F : G : a && a === 'setpixels' && t(b, window.sense_hat.pixels)
        }
        var J = ['temperature', 'pressure', 'humidity']
        var K = J.length
        var L = {}
        var M = !1
        window.onresize = function () {
            TrinketIO.runtime('usingSenseHat') && (clearTimeout(E), E = setTimeout(m, 500))
        }, $(document)
            .on('click', '.exit-off-canvas', function () {
                TrinketIO.runtime('usingSenseHat') && setTimeout(function () {
                    h()
                }, 500)
            }), $(document)
                .on('click.sense-hat-focus', '#graphic', function () {
                    p(!0)
                }), $(document)
                    .on('click', '#sense-hat-info-button', function (a) {
                        a.preventDefault(), $('#sense-hat-info-button')
                            .addClass('hide'), $('#sense-hat-info')
                                .removeClass('hide'), $('#sense-hat-rotate-container')
                                    .addClass('hide')
                    }), $(document)
                        .on('click', '#sense-hat-info-close', function (a) {
                            a.preventDefault(), $('#sense-hat-info')
                                .addClass('hide'), $('#sense-hat-info-button')
                                    .removeClass('hide'), $('#sense-hat-rotate-container')
                                        .removeClass('hide')
                        }), $(document)
                            .on('click', '#sense-hat-rotate-button', function (a) {
                                if (!M) {
                                    var b = A - 90
                                    var c = Math.abs(b % 360)
                                    var d = 0
                                    M = !0, $({
                                        deg: A
                                    })
                                        .animate({
                                            deg: b
                                        }, {
                                            duration: 350,
                                            step: function (a) { },
                                            complete: function () {
                                                A = b, $('#sense_hat_angle')
                                                    .val(c)
                                                    .trigger('change'), $('#sense-hat-display-angle')
                                                        .html(c + '&deg;'), M = !1, c === 270 && (d = '10%')
                                            }
                                        })
                                }
                            }), $('#graphic-wrap')
                                .scroll(function () {
                                    if (TrinketIO.runtime('usingSenseHat')) {
                                        var a = $(this)
                                            .scrollTop()
                                        var b = -a + 'px'
                                        $('#sense-hat-info-button')
                                            .css({
                                                bottom: b
                                            }), $('#sense-hat-info')
                                                .css({
                                                    bottom: b
                                                }), $('#sense-hat-rotate-container')
                                                    .css({
                                                        bottom: b
                                                    })
                                    }
                                })
        var N = !1
        var O = 0.5
        var P = 0
        var Q = 0.2
        var R = 0
        var S = 0
        var T = 0
        var U = 0
        var V = 0
        var W = window.innerWidth / 2
        var X = window.innerHeight / 2
        var Y = 0.25
        window.init3D = function (a) {
            return new Promise(function (b, c) {
                var d = 500
                var e = 500
                window.callback_move = null, window.set_onrotate = function (a) {
                    window.callback_move = a
                }, window.camera = new THREE.PerspectiveCamera(70, d / e, 1, 1e3), camera.position.y = 0, camera.position.x = 0, camera.position.z = 400, window.renderer = new THREE.WebGLRenderer({
                    antialias: !0
                }), renderer.setPixelRatio(window.devicePixelRatio), renderer.setSize(window.innerWidth, window.innerHeight), renderer.toneMapping = THREE.ACESFilmicToneMapping, renderer.toneMappingExposure = 1, renderer.outputEncoding = THREE.sRGBEncoding, renderer.setClearColor(12961219), window.scene = new THREE.Scene(), scene.background = new THREE.Color(262119327)
                var f = new THREE.RoomEnvironment()
                var g = new THREE.PMREMGenerator(renderer)
                scene.environment = g.fromScene(f)
                    .texture, scene.add(camera)
                var h = new THREE.GridHelper(500, 10, 16777215, 16777215)
                h.material.opacity = 0.5, h.material.depthWrite = !1, h.material.transparent = !0
                var i = new THREE.OrbitControls(camera, renderer.domElement)
                i.enableRotate = !1, i.enablePan = !1, i.enableZoom = !1, i.enabled = !1
                var j = new THREE.GLTFLoader()
                var k = new THREE.DRACOLoader()
                k.setDecoderPath(trinketConfig.prefix('/js/three/examples/js/libs/draco/')), j.setDRACOLoader(k), j.load(trinketConfig.prefix('/models/raspi-compressed.glb'), function (c) {
                    c.scene.scale.set(2e3, 2e3, 2e3), scene.add(c.scene), window.mod = c.scene
                    new THREE.MeshStandardMaterial({
                        color: 16711680
                    })
                    window.mod.translateY(100), window.mod.rotateX(1.5708), window.mod.rotateY(0), window.mod.rotateZ(0), renderer.render(window.scene, window.camera), document.addEventListener('pointerup', function (a) {
                        $('#canvas:hover')
                            .length <= 0 || (N = !1)
                    }), document.addEventListener('pointerdown', function (a) {
                        $('#canvas:hover')
                            .length <= 0 || (N = !0, T = a.clientX - W, P = O, V = a.clientY - X, R = Q)
                    }), document.addEventListener('pointermove', r), window.finished3D = !0, window.rotatemodel = function (a, b, c) {
                        window.mod.rotation.x = a, window.mod.rotation.y = b, window.mod.rotation.z = c, renderer.render(window.scene, window.camera)
                    }, b(a)
                })
            })
        }, window.TrinketIO['export']('python.sense-hat', {
            sense_hat_emit: I,
            focus: p,
            initSensors: e,
            initIMU: d,
            destroySliders: i,
            updateSliders: h,
            resetSensors: g,
            usingSenseHat: j,
            addSrc: k,
            stopSenseHat: l,
            initMissionZero: f
        })
    }()),
    (function (a, b) {
        function prepareArrows() {
            var arrows = new Array(4);

            var direction = ["left", "right", "up", "down"];
            for (var i = 0; i < 4; i++) {
                arrows[i] = document.getElementById('pygame_' + direction[i])
            }

            var swapIcon = function (id) {
                $(arrows[id].firstChild).removeClass("fa-arrow-" + direction[id]).addClass("fa-arrow-circle-" + direction[id]);
            }

            var returnIcon = function (id) {
                $(arrows[id].firstChild).removeClass("fa-arrow-circle-" + direction[id]).addClass("fa-arrow-" + direction[id]);
            }

            $(arrows[0]).on('mousedown', function () {
                Sk.insertEvent("left");
                swapIcon(0);
            });
            $(arrows[0]).on('mouseup', function () {
                returnIcon(0);
            });
            $(arrows[1]).on('mousedown', function () {
                Sk.insertEvent("right");
                swapIcon(1);
            });
            $(arrows[1]).on('mouseup', function () {
                returnIcon(1);
            });
            $(arrows[2]).on('mousedown', function () {
                Sk.insertEvent("up");
                swapIcon(2);
            });
            $(arrows[2]).on('mouseup', function () {
                returnIcon(2);
            });
            $(arrows[3]).on('mousedown', function () {
                Sk.insertEvent("down");
                swapIcon(3);
            });
            $(arrows[3]).on('mouseup', function () {
                returnIcon(3);
            });

            $(document).keydown(function (e) {
                switch (e.which) {
                    case 37:
                        swapIcon(0);
                        break;
                    case 38:
                        swapIcon(2);
                        break;
                    case 39:
                        swapIcon(1);
                        break;
                    case 40:
                        swapIcon(3);
                        break;
                }
            });

            $(document).keyup(function (e) {
                switch (e.which) {
                    case 37:
                        returnIcon(0);
                        break;
                    case 38:
                        returnIcon(2);
                        break;
                    case 39:
                        returnIcon(1);
                        break;
                    case 40:
                        returnIcon(3);
                        break;
                }
            });
        };
        function resetTarget() {
            return $('#graphic');
        }

        function addModal() {
            $(Sk.main_canvas).css("border", "1px solid blue");
            var currentTarget = document.createElement("p");

            var div1 = document.createElement("div");
            currentTarget.appendChild(div1);
            $(div1).addClass("modal");
            $(div1).css("text-align", "center");

            var btn1 = document.createElement("span");
            $(btn1).addClass("btn btn-primary btn-sm pull-right");
            var ic = document.createElement("i");
            $(ic).addClass("fas fa-times");
            btn1.appendChild(ic);

            $(btn1).on('click', function (e) {
                Sk.insertEvent("quit");
            });

            var div2 = document.createElement("div");
            $(div2).addClass("modal-dialog modal-lg");
            $(div2).css("display", "inline-block");
            $(div2).width(self.width + 42);
            $(div2).attr("role", "document");
            div1.appendChild(div2);

            var div3 = document.createElement("div");
            $(div3).addClass("modal-content");
            div2.appendChild(div3);

            var div4 = document.createElement("div");
            $(div4).addClass("modal-header d-flex justify-content-between");
            var div5 = document.createElement("div");
            $(div5).addClass("modal-body");
            var div6 = document.createElement("div");
            $(div6).addClass("modal-footer");
            var div7 = document.createElement("div");
            $(div7).addClass("col-md-8");
            var div8 = document.createElement("div");
            $(div8).addClass("col-md-4");
            var header = document.createElement("h5");
            Sk.title_container = header;
            $(header).addClass("modal-title");


            div3.appendChild(div4);
            div3.appendChild(div5);
            div3.appendChild(div6);

            div4.appendChild(header);
            div4.appendChild(btn1);
            // div7.appendChild(header);
            // div8.appendChild(btn1);
            var b = document.getElementById('graphic')

            div5.appendChild(b);

            createArrows(div6);
            $(div1).modal({
                backdrop: 'static',
                keyboard: false
            });
        }

        function c(c, d, e, f, g, h) {
            var l, m, n, o
            d && !d.complete && (d.stop = !0)
            var p = {
                print_function: !1,
                division: !0,
                absolute_import: null,
                unicode_literals: !0,
                set_repr: !0,
                class_repr: !0,
                inherit_from_object: !0,
                super_args: !0,
                octal_number_literal: !0,
                bankers_rounding: !0,
                python_version: !0,
                dunder_next: !0,
                dunder_round: !0,
                exceptions: !0,
                no_long_type: !0,
                ceil_floor_int: !0,
                l_suffix: !1,
                silent_octal_literal: !1
            }
            var q = {
                print_function: !1,
                division: !1,
                absolute_import: null,
                unicode_literals: !1,
                set_repr: !1,
                class_repr: !1,
                inherit_from_object: !1,
                super_args: !1,
                octal_number_literal: !1,
                bankers_rounding: !1,
                python_version: !1,
                dunder_next: !1,
                dunder_round: !1,
                exceptions: !1,
                no_long_type: !1,
                ceil_floor_int: !1,
                l_suffix: !0,
                silent_octal_literal: !0
            }
            var r = {
                print_function: !0,
                division: !0,
                absolute_import: null,
                unicode_literals: !0,
                set_repr: !0,
                class_repr: !0,
                inherit_from_object: !0,
                super_args: !0,
                octal_number_literal: !0,
                bankers_rounding: !0,
                python_version: !0,
                dunder_next: !0,
                dunder_round: !0,
                exceptions: !0,
                no_long_type: !0,
                ceil_floor_int: !0,
                l_suffix: !1,
                silent_octal_literal: !1
            }
            f = f.replace(/\r(?!\n)/gm, '\r\n')
            var s = f.match(/^\s*#!.*?python(\d)/i)
            var u = f.match(/^\s*#\s*python\s*[=:]?\s*(\d)/i)
            u ? Sk.__future__ = u[1] === '2' ? q : p : s ? Sk.__future__ = s[1] === '3' ? r : q : Sk.__future__ = p, a.runtime('missionZero') && (Sk.__future__ = r)
            var v = function (a) {
                var b; var d = k(a.toString())
                if (a.traceback && a.traceback.length) {
                    for (b = 0; b < a.traceback.length; b++) c.userFiles && typeof c.userFiles[a.traceback[b].filename] !== 'undefined' && (a.filename = a.traceback[b].filename, a.lineno = a.traceback[b].lineno)
                    typeof a.filename === 'undefined' && (a.traceback = a.traceback.filter(function (a) {
                        return typeof a.filename !== 'undefined' && a.filename === 'main.py'
                    }), a.traceback[0] && (a.filename = a.traceback[0].filename, a.lineno = a.traceback[0].lineno))
                }
                if (c.includeFileInErrors && a.filename && (d = d.replace(/on line \d+/, 'on line ' + a.lineno), d = d + ' in ' + a.filename.replace(/^\.\//, '')), /^ImportError: No module named/.test(d) && (d += ". You can find a list of available modules at <a href='/docs/python' class='text-link' target='_blank'>docs/python</a>."), c.evalMode === 'repl') {
                    d += '\n'
                    var e = -1; (e = a.toString()
                        .indexOf('on line')) !== -1 && (e = parseInt(a.toString()
                            .substr(e + 8), 10))
                    var f = 0
                    d += m ? '1>: ' + n[0].substr(A.length) : n.map(function (a) {
                        return ++f + (e === f ? '>' : ' ') + ': ' + a
                    })
                        .join('\n')
                }
                c.error(d, a), h && typeof h === 'function' && h(d, a)
            }
            if (Sk.configure({
                inputfun: c.inputfun,
                __future__: Sk.__future__,
                retainglobals: c.evalMode === 'repl',
                output: e,
                read: function (a) {
                    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][a] === undefined)
                        return c.read(a, Sk.builtinFiles.files || {}, c.userFiles || {})
                    return Sk.builtinFiles["files"][a];
                },
                write: function () { },
                nonreadopen: !0,
                fileopen: i,
                filewrite: j,
                imageProxy: c.imageProxy || '',
                uncaughtException: v,
                signals: !0,
                killableWhile: t,
                killableFor: !1
            }), c.suspensionHandler = {
                '*': function () {
                    if (window.Sk_interrupt === !0) throw new Error('interrupt')
                    return null
                }
            }, Sk.externalLibraries || (Sk.externalLibraries = {}), b.extend(Sk.externalLibraries, c.externalLibraries), c.allowGraphics && (Sk.availableWidth = c.graphicsWidth(), Sk.availableHeight = c.graphicsHeight()), Sk.domOutput = function (a) {
                return b(c.graphicsTarget())
                    .append(a)
                    .children()
                    .last()
            }, Sk.onBeforeImport = function (a) {
                return Sk.misceval.chain(a, function () {
                    return I.test(a) ? c.allowGraphics ? void 0 !== l && l !== a && (!J[l] || J[l].indexOf(a) < 0) ? 'You may only use a single graphics library at a time and the ' + l + ' library is already in use.' : (typeof c.onGraphicsInit === 'function' && c.onGraphicsInit(), Sk.misceval.promiseToSuspension(Promise.resolve(c.graphicsSetup[a](c, b(c.graphicsTarget())))
                        .then(function () {
                            l = a
                        }))) : 'Graphics libraries are not allowed' : void 0
                }, function (b) {
                    return b || (c.onBeforeImport ? c.onBeforeImport(a) : void 0)
                })
            }, c.onAfterImport && (Sk.onAfterImport = c.onAfterImport), c.evalMode === 'repl') {
                if (n = f.split('\n')
                    .filter(function (a) {
                        return !E.test(a)
                    }), m = n.length === 1 || /"""/.test(n[0]) && /"""/.test(n[n.length - 1]), m && !F.test(n[0]) && !D.test(n[0]) && !C.test(n[0]) && n[0].length > 0 && (B.test(n[0]) || G.test(n[0]) || (n.unshift(A + n.shift()), n.push('if not evaluationresult == None: print evaluationresult'))), n = n.filter(function (a) {
                        return !E.test(a)
                    }), n.length === 0) return
                f = n.join('\n')
            }
            return {
                code: f,
                lines: n,
                oneLiner: m,
                errorMessage: o,
                handleError: v
            }
        }

        function d(a) {
            var b, c
            if (b = Sk.externalLibraries && Sk.externalLibraries[a], !b) return Promise.resolve()
            if (c = typeof b === 'string' ? b : b.path, typeof c !== 'string') throw new Sk.builtin.ImportError('Invalid path specified for ' + a)
            return e(c, !1)
                .then(function (c) {
                    function d(a) {
                        return e(a, !0)
                    }
                    if (!c) throw new Sk.builtin.ImportError("Failed to load remote module '" + a + "'")
                    var f
                    return f = b.loadDepsSynchronously ? Promise.map(b.dependencies || [], d, {
                        concurrency: 1
                    }) : Promise.all((b.dependencies || [])
                        .map(d)), f.then(function () {
                            return c
                        })['catch'](function () {
                            throw new Sk.builtin.ImportError('Failed to load dependencies required for ' + a)
                        })
                })
        }

        function e(a, b) {
            return new Promise(function (c, d) {
                if (H[a]) return c(H[a])
                var e, f
                a == null && d(), b ? (e = document.createElement('script'), e.type = 'text/javascript', e.src = a, e.async = !0, e.onload = function () {
                    c(!0)
                }, document.body.appendChild(e)) : (f = new XMLHttpRequest(), f.open('GET', a), f.onload = function () {
                    f.status === 200 ? c(f.responseText) : d()
                }, f.onerror = function () {
                    d()
                }, f.send())
            })
                .then(function (b) {
                    return H[a] = b, b
                })
        }

        function f(a) {
            var c = b('#console-output')
            c.removeClass('hide'), c.html(c.html() + a)
        }

        function g(a, c) {
            var d; var e = 'code-error'
            if (c instanceof Sk.builtin.ExternalError && (c = c.nativeError), c && c.type === 'validation' && (e = 'info', a = c.message), !(c && c.message === 'interrupt' || a && /\b(?:SystemExit|KeyboardInterrupt)\b/.test(a))) {
                var d = n('statusMessageTemplate', {
                    type: e,
                    message: a
                })
                var f = b(d)
                b('body')
                    .append(f), b('body')
                        .addClass('has-status-bar'), f.parent()
                            .foundation()
                            .trigger('open.fndtn.alert')
            }
        }

        function h(a, b, c) {
            return Sk.misceval.promiseToSuspension(d(a)
                .then(function (d) {
                    if (d) return d
                    var e = c[a] || b[a]
                    if (void 0 === e) throw "File not found: '" + a + "'"
                    return e
                }))
        }

        function i(a) {
            var b = document.createEvent('Event')
            b.data = a.mode.v + ':' + a.name, b.initEvent('SkfileOpen', !0, !0), document.dispatchEvent(b)
        }

        function j(a, b) {
            var c = document.createEvent('Event')
            c.data = a.name + ':' + b.v, c.initEvent('SkfileWrite', !0, !0), document.dispatchEvent(c)
        }

        function k(a) {
            return a.replace(/[&<>]/g, function (a) {
                return z[a] || a
            })
        }
        var l; var m; var n = a['import']('utils.template')
        var o = a['import']('python.sense-hat')
        var p = a['import']('python.sense-stick')
        var q = a['import']('python.sense-orientation')
        var r = Detectizr.browser.name
        var s = r + ':' + Detectizr.os.name
        var t = r === 'midori' || r === 'iceweasel' || r === 'epiphany' ? !1 : !0
        var u = parseInt(Detectizr.browser.version)
        var v = r + '-gte-3d'
        var w = 400
        var x = function (c, d) {
            function e() {
                if (b('#_sense_hat_')
                    .height() === 0) setTimeout(e, 250)
                else {
                    var a = b('#_sense_hat_')
                        .height()
                    j = Math.floor(h / a), j > 1 && (h /= j), b('.orientation-box')
                        .css({
                            width: h + 'px',
                            height: a + 'px'
                        }), b('.orientation-front')
                            .css({
                                width: h + 'px',
                                height: a + 'px'
                            }), b('.orientation-back')
                                .css({
                                    width: h + 'px',
                                    height: a + 'px',
                                    transform: 'rotateY(180deg) rotateZ(180deg)',
                                    msTransform: 'rotateY(180deg) rotateZ(180deg)'
                                })
                }
            }
            var f
            d.html(l), d.css({
                height: '100%'
            })
            var g = b('#graphic-wrap')
                .width()
            var h = g - 0.05 * g
            try {
                f = b('#sense-hat-enclosure')
                    .get(0)
                    .getBBox()
                    .height
            } catch (i) {
                f = w
            }
            f || (f = w)
            var j = Math.floor(h / f)
            j > 1 && (h /= j), q.updateStage(), a.runtime('usingSenseHat3d') || (b('.orientation-box')
                .css({
                    width: h + 'px',
                    height: f + 'px'
                }), b('.orientation-front')
                    .css({
                        width: h + 'px',
                        height: f + 'px'
                    })),
                (function k() {
                    b('#sense-hat-sensor-controls-container')
                        .width() === 0 ? setTimeout(k, 100) : (a.runtime('usingSenseHatFlat') && e(), c._3d ? (d.find('.3d')
                            .removeClass('hide'), a.runtime('usingSenseHat3d', !0), q.initOrientation(), b('.save-it')
                                .removeClass('blue-highlight'), b('.save-it')
                                    .removeClass('green-highlight')) : (d.find('.2d')
                                        .removeClass('hide'), a.runtime('usingSenseHat3d', void 0), q.initSenseHatEnclosure()), c.snapshot && (d.find('.hide-for-snapshot')
                                            .addClass('hide'), d.find('.orientation-stage')
                                                .addClass('snapshot')), o.initSensors())
                }())
        }
        b('#graphic-wrap')
            .on('split-output', function (c) {
                if (a.runtime('usingSenseHat') && b('.orientation-stage')
                    .length) {
                    var d = b('.orientation-stage')
                        .height() - b('#console-wrap')
                            .height()
                    b('.orientation-stage')
                        .css({
                            height: d + 'px'
                        })
                }
            })
        var y; var z = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;'
        }
        var A = 'evaluationresult = '
        var B = /^\s*print\b/
        var C = /^\s*(from\s+\w+\s+)?import\b/
        var D = /(def|class|for|while|del)\b.*/
        var E = /^\s*$/
        var F = /[^!=<>]=[^=]/
        var G = /^\s*#/
        var H = {}
        var I = /^(turtle|pygal|pygame|processing|matplotlib\.pyplot|image|sense_hat)$/i
        var J = {
            sense_hat: ['image'],
            image: ['sense_hat']
        }
        var K = {
            turtle: function (a, b) {
                typeof y === 'function' && y()
                var c = a.graphicsWidth()
                var d = a.graphicsHeight()
                var e = Math.min(c, d)
                return Sk.TurtleGraphics || (Sk.TurtleGraphics = {}), Sk.TurtleGraphics.width = e, Sk.TurtleGraphics.height = e, Sk.TurtleGraphics.worldWidth = 400, Sk.TurtleGraphics.worldHeight = 400, Sk.TurtleGraphics.target = b[0], Sk.TurtleGraphics.assets = function (b) {
                    if (a.userAssets) {
                        for (var c = 0; c < a.userAssets.length; c++) { if (a.userAssets[c].name === b) return a.userAssets[c].url }
                    }
                }, b.data('graphicMode', 'turtle'), b.empty()
            },
            pygal: function (a, b) {
                return typeof y === 'function' && y(), b.data('graphicMode', 'pygal'), b.empty()
            },

            pygame: function (a, b) {
                typeof y === 'function' && y()

                let m = window.jQuery
                $p = m('#pygameModal')
                $p.foundation('reveal', 'open')
                var c = Sk.canvas = 'pygameCanvas'
                var ret = (b.data('graphicMode', 'pygame'), b.html(''))
                Sk.main_canvas = document.getElementById('pygameMainCanvas')
                Sk.title_container = document.getElementById('pygameTitle')
                Sk.quitHandler = function () {
                    try {
                        if (PygameLib !== null || PygameLib !== undefined || PygameLib !== '')
                            PygameLib.running = false;
                    }
                    catch (e) {
                        console.log("No Pygame");
                    }
                    $p.foundation('reveal', 'close')
                };
                prepareArrows();
                return ret
            },
            image: function (a, b) {
                return b.data('graphicMode') !== 'sense hat' ? (typeof y === 'function' && y(), Sk.canvas = 'graphic', typeof ImageMod !== 'undefined' && (ImageMod.canvasLib = []), b.empty()) : void 0
            },
            processing: function (a, b) {
                var c = trinketConfig.prefix('/components/processing.sk/processing-sk-min.js')
                return b.data('graphicMode', 'processing'), e(c, !0)
                    .then(function () {
                        var c = document.getElementById('codeOutput')
                        var d = trinketConfig.prefix('/components/processing.sk/skulpt_module')
                        ProcessingSk.init(d, a.suspensionHandler, a.suspensionHandler['*'], function (a) {
                            return a.target === document.body || c && c.contains(a.target)
                        }), Sk.externalLibraries['./processing/__init__.js'].dependencies = [trinketConfig.prefix('/components/Processing.js/processing.min.js')], typeof y === 'function' && y()
                        var e = Sk.canvas = 'processingCanvas'
                        return setTimeout(function () {
                            window.readyForSnapshot = !0
                        }, 1e4), b.focus(), b.html('<canvas style="display:none" id="' + e + '" width="400" height="400"></canvas>')
                    })
            },
            'matplotlib.pyplot': function (a, b) {
                typeof y === 'function' && y()
                var c = Sk.canvas = 'matplotlibCanvas'
                return b.data('graphicMode', 'matplot'), b.html('<div id="' + c + '"></div>')
            },
            sense_hat: function (c, d) {
                return new Promise(function (f, g) {
                    if (Sk.sense_hat || (Sk.sense_hat = c.sense_hat), Sk.sense_hat_emit || (Sk.sense_hat_emit = c.sense_hat_emit), d.data('graphicMode', 'sense hat'), !l) {
                        var h; var i = !1
                        var j = ['sense-hat']
                        m = window.senseHatConfig || {}, m[v] && u >= m[v] && (i = !0), m[r] && !i && j.push(m[r]), m[s] && j.push(m[s]), c._3d || (j.indexOf('flat') >= 0 && j.splice(j.indexOf('flat'), 1), j.push('2d')), j.indexOf('flat') >= 0 && a.runtime('usingSenseHatFlat', !0), h = j.join('-'), h = trinketConfig.prefix('/partials/' + h + '.html'), f(e(h, !1)
                            .then(window.init3D)
                            .then(function (e) {
                                if (l = e, x(c, d), a.runtime('usingSenseHatFlat')) {
                                    var f = n('statusMessageTemplate', {
                                        type: 'info',
                                        message: "Try <a href='https://www.google.com/chrome/browser/desktop/' class='text-link' target='_blank'><strong>Chrome</strong></a> or Safari for a richer 3D experience."
                                    })
                                    var g = b(f)
                                    b('body')
                                        .append(g), b('body')
                                            .addClass('has-status-bar'), g.parent()
                                                .foundation()
                                                .trigger('open.fndtn.alert')
                                }
                            }))
                    }
                    b('#sense-hat-sensor-controls-container')
                        .length === 0 && x(c, d), f()
                })
                    .then(function () {
                        var a = document.getElementById('canvas')
                            .clientWidth
                        var c = document.getElementById('canvas')
                            .clientHeight
                        var d = document.getElementById('canvas')
                        window.camera.aspect = a / c, window.camera.updateProjectionMatrix(), window.renderer.setSize(a, c), d.appendChild(window.renderer.domElement), p.initJoystick(), y = function () {
                            o.destroySliders(), b('#graphic-wrap')
                                .removeClass('sense-hat'), y = void 0
                        }, b('#graphic-wrap')
                            .addClass('sense-hat')
                    })
            }
        }
        var L = {
            './pygal/__init__.js': {
                path: trinketConfig.prefix('/components/pygal.js/__init__.js'),
                loadDepsSynchronously: !0,
                dependencies: [trinketConfig.prefix('/js/vendor/highcharts/highcharts.js'), trinketConfig.prefix('/js/vendor/highcharts/highcharts-more.js')]
            },
            './numpy/__init__.js': {
                path: trinketConfig.prefix('/components/skulpt_numpy/dist/numpy/__init__.js')
            },
            './numpy/random/__init__.js': {
                path: trinketConfig.prefix('/components/skulpt_numpy/dist/numpy/random/__init__.js')
            },
            './matplotlib/__init__.js': {
                path: trinketConfig.prefix('/components/skulpt_matplotlib/matplotlib/__init__.js')
            },
            './matplotlib/pyplot/__init__.js': {
                path: trinketConfig.prefix('/components/skulpt_matplotlib/matplotlib/pyplot/__init__.js'),
                dependencies: [trinketConfig.component('d3', 'd3.min.js')]
            },
            './json/__init__.js': {
                path: trinketConfig.prefix('/components/json.sk/__init__.js'),
                dependencies: [trinketConfig.prefix('/components/json.sk/stringify.js')]
            },
            './xml/__init__.js': {
                path: trinketConfig.prefix('/components/xml.sk/__init__.js')
            },
            './xml/etree/__init__.js': {
                path: trinketConfig.prefix('/components/xml.sk/etree/__init__.js')
            },
            './xml/etree/ElementTree.js': {
                path: trinketConfig.prefix('/components/xml.sk/etree/ElementTree.js')
            },
            'src/lib/itertools.js': {
                path: trinketConfig.prefix('/js/skulpt/itertools.js')
            },
            'src/lib/os.js': {
                path: trinketConfig.prefix('/js/skulpt/os.js')
            },
            './trinket/checks.js': {
                path: trinketConfig.prefix('/js/skulpt/trinket/checks.js')
            },
            './trinket/tester/__init__.py': {
                path: trinketConfig.prefix('/js/skulpt/trinket/tester/__init__.py')
            },
            './trinket/ast/__init__.py': {
                path: trinketConfig.prefix('/js/skulpt/trinket/ast/__init__.py')
            },
            './_ast.js': {
                path: trinketConfig.prefix('/js/skulpt/trinket/ast/_ast.js')
            },
            './trinket/__init__.js': {
                path: trinketConfig.prefix('/js/skulpt/trinket/__init__.js')
            },
            './turtletalk.py': {
                path: trinketConfig.prefix('/js/skulpt/turtletalk.py')
            },
            /*
            './pygame.js': {
              path: trinketConfig.prefix('/components/pygame/__init__.js')},        
            'src/builtin/display.js': {
              path: trinketConfig.prefix('/components/pygame/display.js'),
            },
            'pygame.draw': {
              path: trinketConfig.prefix('/components/pygame/draw.js'),
            },
            'pygame.event': {
              path: trinketConfig.prefix('/components/pygame/event.js'),
            },
            'pygame.font': {
              path: trinketConfig.prefix('/components/pygame/font.js'),
            },
            'pygame.image': {
              path: trinketConfig.prefix('/components/pygame/image.js'),
            },
            'pygame.key': {
              path: trinketConfig.prefix('/components/pygame/key.js'),
            },
            'pygame.mouse': {
              path: trinketConfig.prefix('/components/pygame/mouse.js'),
            },
            'pygame.time': {
              path: trinketConfig.prefix('/components/pygame/time.js'),
            },
            'pygame.transform': {
              path: trinketConfig.prefix('/components/pygame/transform.js'),
            },
            'pygame.version': {
              path: trinketConfig.prefix('/components/pygame/version.js'),
            },*/
        }
        a['export']('Skulpt', function (a) {
            var d = {
                evalMode: 'main',
                allowGraphics: !0,
                autoEscape: !1,
                read: h,
                write: f,
                error: g,
                graphicsSetup: K,
                includeFileInErrors: !1,
                graphicsWidth: function () {
                    return b(a.graphicsTarget())
                        .parent()
                        .width()
                },
                graphicsHeight: function () {
                    return b(a.graphicsTarget())
                        .parent()
                        .height()
                },
                externalLibraries: L,
                onBeforeImport: function (a) {
                    var b = document.getElementById('codeOutput')
                    if (a === 'pygame') {
                        //prepareArrows()
                        //let j = window.TrinketApp
                        //TrinketApp.$pygameModal.foundation('reveal', 'open')
                        return true
                        var c = trinketConfig.prefix('/components/pygame/__init__.js')
                        return Sk.misceval.promiseToSuspension(e(c, !0)
                            .then(function () {
                                return true
                                //return a.target === document.body || b && b.contains(a.target)
                            }))
                    }
                },
                imageProxy: function (b) {
                    if (!a.userAssets) return b
                    for (var c = 0; c < a.userAssets.length; c++) { if (a.userAssets[c].name === b) return a.userAssets[c].url }
                    return b
                }
            }
            a = b.extend({}, d, a), a.allowGraphics && (a.graphicsSetup = b.extend({}, K, a.graphicsSetup), a.graphicsTarget = a.graphicsTarget || function () {
                return b('#graphic')
            })
            var i; var j = function (b) {
                a.autoEscape && (b = k(b)), a.write(b)
            }
            var l = '__abort_code__'
            var m = function (c, d, e, f, g, h) {
                var i = {
                    complete: !1
                }
                a.evalMode !== 'repl' && Sk.TurtleGraphics && Sk.TurtleGraphics.reset && Sk.TurtleGraphics.reset()
                return Sk.misceval.asyncToPromise(function () {
                    return Sk.importMainWithBody(a.evalMode, !1, c, !0)
                }, a.suspensionHandler)
                    .then(function (a) {
                        i.complete = !0, f && typeof f === 'function' && f(), Sk.sense_hat && (b('#sense_hat_motion')
                            .off('.motion'), b('#sense_hat_motion')
                                .off('.stopmotion'), Sk.sense_hat.sensestick.destroy())
                    }, function (a) {
                        return a === l ? void (h && typeof h === 'function' && h()) : (i.complete = !0, g(a), void (Sk.sense_hat && (b('#sense_hat_motion')
                            .off('.motion'), b('#sense_hat_motion')
                                .off('.stopmotion'), Sk.sense_hat.sensestick.destroy())))
                    }), i
            }
            return function (b, d, e, f) {
                if (!b || /^\s*$/.test(b)) return d()
                var g = c(a, i, j, b, d, e)
                return i = m(g.code, g.oneLiner, g.lines, d, g.handleError, f), g.errorMessage ? !1 : !0
            }
        }), a['export']('SkRuntimeConfig', c)
    }(window.TrinketIO, window.jQuery)),
    (function (a) {
        function b(a) {
            this._pollInterval = void 0, this._analytics = a, this._events = {}, $(window)
                .on('blur', $.proxy(this.poll, this))
        }
        b.POLL_INTERVAL = 3e4, b.prototype.poll = function () {
            if (this._pollInterval) {
                for (var a in this._events) this._events[a] && this._analytics(a, this._events[a]), this._events[a] = 0
                clearTimeout(this._pollInterval), this._pollInterval = void 0
            }
        }, b.prototype.logEvent = function (a) {
            var c = this
            c._events[a] = (c._events[a] || 0) + 1, this._pollInterval || (this._pollInterval = setTimeout($.proxy(this.poll, this), b.POLL_INTERVAL))
        }, a['export']('embed.analytics.activity', b)
    }(window.TrinketIO)),
    (function () {
        'use strict'

        function a(b, c) {
            var d; var e; var f; var g = b && b._astname
            if (g) {
                if (g === 'Call') b.func.constructor.name === 'Name' ? c[g].push(b.func.id.v) : b.func.constructor.name === 'Attribute' && c[g].push(b.func.attr.v)
                else if (g === 'Attribute') c[g].push(b.attr.v)
                else if (g === 'ImportFrom') c.Import.push(b.module.v)
                else if (g === 'Import') { for (d = 0; d < b.names.length; d++) c.Import.push(b.names[d].name.v) }
                if (b._fields) {
                    for (d = 0; d < b._fields.length; d += 2) {
                        if (f = b._fields[d + 1](b)) {
                            if (f._astname) a(f, c)
                            else if (f.constructor === Array && f.length && f[0] && f[0]._astname) { for (e = 0; e < f.length; e++) a(f[e], c) }
                        }
                    }
                }
            }
        }

        function b(b) {
            var c; var d; var e = 'main.py'
            var f = b.getValue()
            var g = {
                Call: [],
                Attribute: [],
                Import: []
            }
            try {
                c = Sk.parse(e, f), d = Sk.astFromParse(c.cst, e, c.flags)
            } catch (h) {
                return
            }
            return a(d, g), g
        }
        void 0 === Function.prototype.name && void 0 !== Object.defineProperty && Object.defineProperty(Function.prototype, 'name', {
            get: function () {
                var a = /function\s([^(]{1,})\(/
                var b = a.exec(this.toString())
                return b && b.length > 1 ? b[1].trim() : ''
            },
            set: function (a) { }
        }), window.TrinketIO['export']('skulpt.ast', {
            parseCode: b
        })
    }()),
    (function (a, b) {
        function c(a) {
            var b = a.toString()
                .match(/^(.*?)[:;]\s*(.*?)(?:on\sline\s(\d+).*)?$/i)
            return b && b[1] && b[2] ? {
                error: b[0],
                type: b[1],
                message: b[2],
                line: b[3] ? parseInt(b[3]) : -1
            } : !1
        }

        function d() {
            K || (K = !0, $('#console-wrap')
                .removeClass('hide'), L ? e() : $('#console-wrap')
                    .css('height', '100%'), B = $('#console-output')
                        .jqconsole(), B.Write('[0m'), B.Reset(), B.Append('<span class="jqconsole-header" aria-hidden="true" role="presentation">Powered by <img id="powered-by-trinket" src="' + trinketConfig.prefix('../img/logo.svg') + '">\n</span>'))
        }

        function e() {
            if ($('#output-dragbar')
                .hasClass('hide')) {
                $('#output-dragbar')
                    .removeClass('hide')
                var a = $('#outputTabs')
                    .height()
                var b = $('.trinket-content-wrapper')
                    .height() - a
                var c = $('#output-dragbar')
                    .height()
                var d = 0.8 * b - c / 2
                var e = b - d - c / 2
                $('#graphic-wrap')
                    .css('height', d), $('#console-wrap')
                        .css('height', e), $('#graphic-wrap')
                            .trigger('split-output')
            }
        }

        function f() {
            $('#unittest-wrap')
                .removeClass('hide')
                .css('height', '100%')
        }

        function g(a) {
            switch (a) {
                case 'turtle':
                    v._queryString.snapshot ? (Sk.TurtleGraphics || (Sk.TurtleGraphics = {}), Sk.TurtleGraphics.animate = !1, Sk.TurtleGraphics.allowUndo = !1, Sk.TurtleGraphics.width = 320, Sk.TurtleGraphics.height = 320) : (G = !0, A === 'run' && i(!0))
                    break
                case 'urllib.request':
                    if ($('#proxy')
                        .val()) {
                        var c = {}
                        var d = Sk.sysmodules.mp$subscript(a)
                        d.$d.urlopen.func_code = function (a, b, e) {
                            if (void 0 === c[a.v]) {
                                var f = $('#proxy')
                                    .val() + '?url=' + encodeURIComponent(a.v)
                                var g = new XMLHttpRequest()
                                g.open('GET', f, !1), g.send(null), c[a.v] = g.responseText, c[a.v].length && setTimeout(function () {
                                    c[a.v] = void 0
                                }, 10 * c[a.v].length)
                            }
                            return Sk.misceval.callsim(d.$d.Response, {
                                responseText: c[a.v]
                            })
                        }
                    }
                    break
                case 'sense_hat':
                    b.runtime('usingSenseHat', !0), b.runtime('usingSenseHat3d', !0), b.runtime('sense_hat_enclosure') || b.runtime('sense_hat_enclosure', 'sense-hat'), S.initIMU(), S.addSrc()
                    break
                case 'pygal':
                    v._queryString.snapshot && Highcharts.setOptions({
                        plotOptions: {
                            series: {
                                animation: !1
                            }
                        }
                    })
            }
            typeof v.afterImport === 'function' && v.afterImport(a)
        }

        function h() {
            return y || (y = $('<div class="turtle-overlay hide" data-action="graphic.focus" data-interface="output"></div>'), y.insertAfter('#graphic'), y.on('click', function () {
                i(!0)
            })), y
        }

        function i(a) {
            return G ? (void 0 !== a && (a = !!a, a ? (h()
                .addClass('hide'), $('#graphic')
                    .focus(), $(document)
                        .on('keydown.turtle-focus', function (a) {
                            a.preventDefault()
                        }), v.sendInterfaceAnalytics(h()), $(document)
                            .on('mousedown.turtle-focus', function (a) {
                                $('#graphic-wrap')
                                    .is(':hover') || i(!1)
                            })) : ($(document)
                                .off('keydown.turtle-focus'), $(document)
                                    .off('mousedown.turtle-focus'), h()
                                        .removeClass('hide'))), Sk.TurtleGraphics.focus(a)) : void 0
        }

        function j(a) {
            w.clearTabMarkers(), B && (B.Write('[0m'), B.Reset(), B.Append('<span class="jqconsole-header" aria-hidden="true" role="presentation">Powered by <img id="powered-by-trinket" src="' + trinketConfig.prefix('../img/logo.svg') + '">\n</span>')), a || b.runtime('usingSenseHat') || ($('#graphic')
                .empty(), $('#graphic')
                    .removeData('graphicMode'))
        }

        function k() {
            var a = w.assets()
            $('#imageAssets')
                .empty(), ia = a.length, ja = 0, ia && (ha = !0), a.forEach(function (a) {
                    var b = /^data:image/.test(a.url) ? a.url : l(a.url)
                    var c = new Image()
                    c.id = a.name, c.className = 'hide', c.onload = function () {
                        $('#imageAssets')
                            .append(c), ja++, ja >= ia && (ha = !1)
                    }, c.src = b
                })
        }

        function l(a) {
            var b = $('#proxy')
                .val()
            var c = new RegExp(b + '/', 'g')
            return a = a.replace(c, ''), a = b + '/' + a
        }

        function m(a, b) {
            var c, d, e
            for (d in M) delete M[d]
            $('.hidden-file')
                .remove()
            for (d in a) {
                d === b ? c = a[d] : (d.match(/\.py$/) && (M['./' + d] = a[d] + '\n'), $('#' + d)
                    .length || (e = $('<textarea>', {
                        id: d,
                        text: a[d] + '\n',
                        name: d,
                        'class': 'hide hidden-file'
                    }), $('body')
                        .append(e)))
            }
            return N.length = 0, N.push.apply(N, w.assets()), $('#proxy')
                .val() && N.forEach(function (a) {
                    /^data:image/.test(a.url) || (a.url = l(a.url))
                }), c
        }

        function n() {
            $('.reveal-modal')
                .foundation('reveal', 'close'), aa == null && (aa = H(ga))
            var a; var b = ($('#graphic'), v.getValue())
            a = m(w.getAllFiles(), P), $('#statusMessages')
                .children()
                .length && $('#statusMessages')
                    .trigger('close.fndtn.alert')
                    .remove(), typeof v.beforeRun === 'function' && (a = v.beforeRun(a)), G = !1, h()
                        .addClass('hide')
            var c = document.activeElement
            aa(a, function () {
                I = void 0, typeof v.afterRun === 'function' && v.afterRun(a), v.collectErrorData(b), q()
            }, function (c) {
                I = void 0, typeof v.afterRun === 'function' && v.afterRun(a), v.collectErrorData(b, c)
                var d = /on line (\d+) in (.+)$/
                var e = c.match(d)
                e && v.highlightLine(e[2], e[1])
            }, function () {
                q()
            }), G || $('#graphic')
                .data('graphicMode') === 'processing' ? $('#graphic')
                    .focus() : I || c !== document.activeElement || ($('#editor')
                        .css('display') != 'none' ? v.focus() : w.options.noEditor || $('#honeypot')
                            .focus()), v.updateMetric('runs', b), !F[b] && v.isModified() && v.callAnalytics('Interaction', 'Modify', 'Code'), v.markCodeAsRun(b)
        }

        function o() {
            if ($('.reveal-modal')
                .foundation('reveal', 'close'), C = 'run', U) p(), setTimeout(o, 250)
            else if (ha) setTimeout(o, 500)
            else {
                a.parent && a.parent.postMessage('started', '*'), Y == null && (v._queryString.snapshot && (ea.snapshot = !0), Y = H(ea)), a.Sk_interrupt = !1
                var c; var d = v.getValue()
                c = m(w.getAllFiles(), O), j(), $('#console-output')
                    .removeClass('console-mode'), $('#statusMessages')
                        .children()
                        .length && $('#statusMessages')
                            .trigger('close.fndtn.alert')
                            .remove(), typeof v.beforeRun === 'function' && (c = v.beforeRun(c)), G = !1, h()
                                .addClass('hide')
                var e = b.runtime('usingSenseHat')
                b.runtime('usingSenseHat', !1), b.runtime('downloadExtra', void 0)
                var f = document.activeElement
                U = !0
                var g = setTimeout(function () {
                    U && v.changeRunOption('stop')
                }, 500)
                Y(c, function () {
                    I = void 0, typeof v.afterRun === 'function' && v.afterRun(c), v.collectErrorData(d), q(g)
                }, function (a) {
                    if (I = void 0, typeof v.afterRun === 'function' && v.afterRun(c), !/(?:interrupt|systemexit)/i.test(a)) {
                        v.collectErrorData(d, a)
                        var f = /on line (\d+) in (\S+)/
                        var h = a.match(f)
                        if (h) {
                            var i = h[2].replace(/\.$/, '')
                            v.highlightLine(i, h[1])
                        }
                        b.runtime('usingSenseHat', e)
                    }
                    q(g)
                }, function () {
                    b.runtime('usingSenseHat', e), q(g)
                }), G || $('#graphic')
                    .data('graphicMode') === 'processing' ? $('#graphic')
                        .focus() : b.runtime('usingSenseHat') ? S.focus(!0) : I || f !== document.activeElement || W || ($('#editor')
                            .css('display') != 'none' ? v.focus() : w.options.noEditor || W || $('#honeypot')
                                .focus()), v.updateMetric('runs', d), !F[d] && v.isModified() && (v.callAnalytics('Interaction', 'Modify', 'Code'), b.runtime('usingSenseHat') && v.callAnalytics('Sense Hat Event', 'Modify', 'Code')), v.markCodeAsRun(d)
            }
        }

        function p() {
            a.Sk_interrupt = !0,
                V(0),
                a.sense_hat.sensestick.triggerKeyboardInterrupt(),
                $("#sense_hat_motion").trigger("change.evt", {
                    type: "interrupt"
                }),
                b.runtime("usingSenseHat") && S.stopSenseHat(),
                D && (D(new Sk.builtin.SystemExit("execution halted")),
                    D = null),
                "function" == typeof Processing && Processing.instances && Processing.instances.length && Processing.instances[0].exit()
        }

        function q(c) {
            c && clearTimeout(c), U = !1, C && v.changeRunOption(C), b.runtime('usingSenseHat') && S.stopSenseHat(), a.readyForSnapshot = !0, a.parent && a.parent.postMessage('complete', '*')
        }

        function r() {
            if ($('.reveal-modal')
                .foundation('reveal', 'close'), C = 'console', U) p(), setTimeout(r, 250)
            else if (ha) setTimeout(r, 500)
            else {
                Sk.globals && (Sk.globals = {
                    __name__: Sk.globals.__name__
                }), d(), $('#console-output')
                    .addClass('console-mode'), Z == null && (Z = H(fa))
                var a; var b = ($('#graphic'), v.getValue(), [])
                a = m(w.getAllFiles(), O), j(), $('#statusMessages')
                    .children()
                    .length && $('#statusMessages')
                        .trigger('close.fndtn.alert')
                        .remove(), typeof v.beforeRun === 'function' && (a = v.beforeRun(a)), a && (b = a.split('\n')), G = !1, h()
                            .addClass('hide'), s({
                                history: b
                            })
            }
        }

        function s(c) {
            var d = !1
            B.Prompt(!0, function (d) {
                if (/^\s*$/.test(d)) B._pauseHistory = !1, s(c)
                else {
                    a.Sk_interrupt = !1, U = !0
                    var e = setTimeout(function () {
                        U && b.runtime('usingSenseHat') && v.changeRunOption('stop')
                    }, 500)
                    Z(d, function () {
                        B._pauseHistory = !1, s(c), q(e)
                    }, function (a, d) {
                        b.runtime('usingSenseHat') && /interrupt/i.test(d.toString()) || B.Write(u(d.toString()), 'jqconsole-error', !1), B._pauseHistory = !1, s(c), q(e)
                    }, function () {
                        q(e)
                    }), v.callAnalytics('Interaction', 'Modify', 'Code')
                }
            }, function (a) {
                var b; var c; var e; var f = !1
                return e = a.split('\n'), e.length === 0 ? 0 : (c = e[e.length - 1], b = c.match(/^\s*/)[0], c = e[e.length - 1].replace(/\s+$/, ''), /"""/.test(c) && !/""".*"""/.test(c) && (d = !d), d ? f = 0 : /^\s*#/.test(c) || c[c.length - 1] !== ':' ? b.length && c && c[c.length - 1].length !== 0 ? f = 0 : /^\s*#/.test(c) && (f = 0) : f = 1, B._enteringHistory && (b.length ? f = -(b.length / 2) : f !== !1 && (f = 0), f === !1 && (B._pauseHistory = !0)), f)
            }), B.Focus(), t(c.history)
        }

        function t(a) {
            var b, c, d, e
            if (a.length) {
                for (B._enteringHistory = !0, b = a.shift(), c = b.split(''), d = 0; d < c.length; d++) e = $.Event('keypress'), e.which = c[d].charCodeAt(0), B.$input_source.trigger(e)
                a.length || (B._enteringHistory = !1), e = $.Event('keydown'), e.which = '\r'.charCodeAt(0), B.$input_source.trigger(e), a.length && !B._pauseHistory && t(a)
            }
        }

        function u(a) {
            var b = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }
            return a.replace(/[&<>"']/g, function (a) {
                return b[a]
            })
        }
        var v; var w; var x; var y; var z; var A; var B; var C; var D; var E; var F = {}
        var G = !1
        var H = b['import']('Skulpt')
        var I = void 0
        var J = !1
        var K = !1
        var L = !1
        var M = {}
        var N = []
        var O = 'main.py'
        var P = 'tests.py'
        var Q = b['import']('utils.guid')
        var R = b['import']('utils.template')
        var S = b['import']('python.sense-hat')
        var T = b['import']('embed.analytics.activity')
        var U = !1
        var V = b['import']('sendSignalToSkulpt')
        var W = a.userSettings && a.userSettings.disableAceEditor || !1
        try {
            E = b['import']('skulpt.ast')
        } catch (X) { }
        var Y; var Z; var aa; var ba = function (a) {
            d(), a = a.replace(/\0(33)\[/g, '['), B.Write(a)
        }
        var ca = function (b) {
            return d(), a.readyForSnapshot = !0, new Promise(function (a, c) {
                D = c
                var d = document.activeElement
                B.Append('<span aria-hidden="true" role="presentation">' + b + '</span>'), $('#console-output')
                    .addClass('console-active'), B.Input(function (b) {
                        $('#console-output')
                            .removeClass('console-active'), v.activityLog && v.activityLog.logEvent('Text Input'), a(b), d && !W && $(d)
                                .focus()
                    }), I || B.Focus()
            })
        }
        var da = function () {
            L || (L = !0, $('#graphic-wrap')
                .removeClass('hide'), K ? e() : $('#graphic-wrap')
                    .css('height', '100%'))
        }
        var ea = {
            evalMode: 'main',
            onAfterImport: g,
            userFiles: M,
            userAssets: N,
            includeFileInErrors: !0,
            write: ba,
            inputfun: ca,
            onGraphicsInit: da,
            sense_hat: a.sense_hat,
            sense_hat_emit: S.sense_hat_emit,
            _3d: !0
        }
        var fa = {
            evalMode: 'repl',
            onAfterImport: g,
            userFiles: M,
            userAssets: N,
            includeFileInErrors: !1,
            write: ba,
            inputfun: ca,
            onGraphicsInit: da,
            sense_hat: a.sense_hat,
            sense_hat_emit: S.sense_hat_emit,
            _3d: !0,
            error: function (a, b) { }
        }
        var ga = {
            evalMode: 'tests',
            userFiles: M,
            userAssets: N,
            includeFileInErrors: !0,
            write: function (a) {
                f()
            },
            inputfun: function (a) {
                return f(), new Promise(function (a, b) {
                    a()
                })
            }
        }
        var ha = !1
        var ia = 0
        var ja = 0
        !(function () {
            var a = /^(input|text|password|file|email|search|date)$/i
            $(document)
                .bind('keydown', function (b) {
                    var c; var d = !0
                    b.keyCode === 8 && (c = b.srcElement || b.target, (c.tagName.toLowerCase() === 'textarea' || c.tagName.toLowerCase() === 'input' && c.type.match(a)) && (d = c.readOnly || c.disabled), d && b.preventDefault())
                })
        }()), a.TrinketAPI = {
            initialize: function (c) {
                v = this, z = $('#start-value')
                    .val(), A = $('#runOption-value')
                        .val(), v.runMode = $('#runMode-value')
                            .val(), I = z === 'code' && !$('body')
                                .hasClass('has-status-bar')
                var d = []
                var e = !0
                var f = v.getUIType()
                b.runtime('mission-zero') ? (d = !1, e = !1, S.initMissionZero()) : c.assets && (d = c.assets.slice()), w = $('#editor')
                    .codeEditor({
                        showTabs: !this._queryString.outputOnly,
                        noEditor: !!this._queryString.outputOnly,
                        disableAceEditor: W,
                        mainFileName: O,
                        showInfo: !0,
                        assets: d,
                        addFiles: e,
                        guest: f === 'guest' ? !0 : !1,
                        owner: f === 'owner' ? !0 : !1,
                        canHideTabs: v.hasPermission('hide-trinket-files'),
                        canAddInlineComments: v.hasPermission('add-trinket-inline-comments') && (f === 'owner' || v.assignmentFeedback),
                        assignmentViewOnly: v.assignmentViewOnly,
                        userId: v.getUserId(),
                        lang: 'python',
                        onFocus: function () {
                            i(!1)
                        },
                        assetsHowTo: '#assets-howto-message'
                    })
                    .data('trinket-codeEditor')
                var g = {
                    trinketIdentifier: v.getTrinketIdentifierOrNull(),
                    userIdentifier: v.getUserId()
                }
                a.trinketBroadcast && a.trinketBroadcast.connection && a.trinketBroadcast.connection.initialize(w, g), k()
                var h = v.save
                v.save = function (a, b) {
                    h.call(v, a, function (a, c) {
                        typeof b === 'function' && b(a, c)
                    })
                }, $(document)
                    .on('sk.system.clear', function () {
                        j(!0)
                    }), $('#reset-output')
                        .click(function () {
                            j(!0)
                        }), $(document)
                            .on('assets.change', function () {
                                k(), v.triggerChange()
                            }), $(document)
                                .on('open.fndtn.alert', function () {
                                    w.resize()
                                }), $(document)
                                    .on('close.fndtn.alert', function () {
                                        w.resize(), b.runtime('usingSenseHat') && S.updateSliders()
                                    }), w.addCommand('run', {
                                        win: 'Ctrl-Enter',
                                        mac: 'Command-Enter'
                                    }, function (a) {
                                        $('#editor')
                                            .trigger('trinket.code.run', {
                                                action: 'code.run'
                                            })
                                    }), w.addCommand('test', {
                                        win: 'Shift-Ctrl-Enter',
                                        mac: 'Shift-Command-Enter'
                                    }, function (a) {
                                        $('#editor')
                                            .trigger('trinket.code.check', {
                                                action: 'code.check'
                                            })
                                    })
                try {
                    x = b['import']('python.editor.hints'), w.registerPlugin(x), trinketConfig.get('testing') || (AutoCompletePlugin = b['import']('python.editor.autocomplete'), v._queryString && v._queryString.inLibrary && AutoCompletePlugin.setInLibrary(!0), w.registerPlugin(AutoCompletePlugin))
                } catch (l) { }
                this._errorGroup = 0, this._sessionId = Q(), this._previousError = void 0, $(document)
                    .on('trinket.code.edit', $.proxy(this.showCode, this)), $(document)
                        .on('trinket.code.run', $.proxy(this.showResult, this)), $(document)
                            .on('trinket.code.stop', $.proxy(this.stopExecution, this)), $(document)
                                .on('trinket.code.check', $.proxy(this.showTestResult, this)), $(document)
                                    .on('trinket.code.console', $.proxy(this.consoleResult, this)), $(document)
                                        .on('trinket.output.view', $.proxy(v.showOutput, v)), $(document)
                                            .on('trinket.instructions.view', $.proxy(v.showInstructions, v)), this.viewer = '#codeOutput', $(document)
                                                .on('trinket.code.modules', $.proxy(this.toggleModules, this)), $('#honeypot')
                                                    .on('keydown', $.proxy(this.showCode, this)), $('#menu')
                                                        .on('trinket.sharing.share trinket.sharing.embed trinket.sharing.email', function (a) {
                                                            v.isModified() && !F[v.getValue()] && ($('#runFirstModal')
                                                                .foundation('reveal', 'open'), a.preventDefault())
                                                        }), $('.menu-toolbar .menu-button[data-action="code.run"]')
                                                            .on('mousedown', function (a) {
                                                                w && w.isFocused() && a.preventDefault()
                                                            }), $('.menu-toolbar .menu-button[data-action="code.check"]')
                                                                .on('mousedown', function (a) {
                                                                    w && w.isFocused() && a.preventDefault()
                                                                }), $('#modalRun')
                                                                    .click(function () {
                                                                        sendInterfaceAnalytics(this), $('#runFirstModal')
                                                                            .foundation('reveal', 'close'), o()
                                                                    }), c.settings && c.settings.testsEnabled && $('.check-it')
                                                                        .hasClass('hide') && $('.check-it')
                                                                            .removeClass('hide'), v.reset(c, !0), w.change(function () {
                                                                                v.triggerChange()
                                                                            }), v.draggable(_.debounce(function () {
                                                                                b.runtime('usingSenseHat') && S.updateSliders()
                                                                            }, 500)), $('#output-dragbar')
                                                                                .mousedown(function (a) {
                                                                                    a.preventDefault()
                                                                                    var b = $('#outputTabs')
                                                                                        .height()
                                                                                    var c = $('.trinket-content-wrapper')
                                                                                        .height() - b
                                                                                    var d = $('.trinket-content-wrapper')
                                                                                        .offset()
                                                                                        .top + b
                                                                                    var e = $('#output-dragbar')
                                                                                        .height()
                                                                                    $(document)
                                                                                        .on('mousemove.output-dragbar', function (a) {
                                                                                            var b = a.pageY - d - e / 2
                                                                                            var f = c - b - e / 2
                                                                                            b >= 20 && f >= 20 && ($('#graphic-wrap')
                                                                                                .css('height', b), $('#console-wrap')
                                                                                                    .css('height', f))
                                                                                        }), $(document)
                                                                                            .on('mouseup.output-dragbar', function (a) {
                                                                                                $(document)
                                                                                                    .off('mousemove.output-dragbar mouseup.output-dragbar')
                                                                                            }), v.sendInterfaceAnalytics(this)
                                                                                }), v.activityLog = new T(function (a, b) {
                                                                                    var c = a.replace(/[a-zA-Z0-9](?:[^\s\-\._]*)/g, function (a) {
                                                                                        return a.charAt(0)
                                                                                            .toUpperCase() + a.substr(1)
                                                                                    })
                                                                                    v.sendAnalytics('Output', {
                                                                                        action: c,
                                                                                        label: v.getTrinketIdentifier(),
                                                                                        value: b
                                                                                    })
                                                                                }), $(document)
                                                                                    .keydown(function (a) {
                                                                                        var c = $('#graphic')
                                                                                            .data('graphicMode');
                                                                                        (/turtle/i.test(c) && $('.turtle-overlay')
                                                                                            .hasClass('hide') || /sense\s*hat/i.test(c) && b.runtime('usingSenseHat')) && v.activityLog.logEvent(c + ' Key')
                                                                                    }), $(document)
                                                                                        .on('mousedown', '#graphic-wrap', function (a) {
                                                                                            var b
                                                                                            $(a.target)
                                                                                                .attr('id') === 'sense-hat-rotate-button' || $(a.target)
                                                                                                    .parent()
                                                                                                    .attr('id') === 'sense-hat-rotate-button' ? v.callAnalytics('Sense Hat Event', 'Click', 'RotateButton') : (b = $('#graphic')
                                                                                                        .data('graphicMode'), b ? v.activityLog.logEvent(b + ' Click') : v.activityLog.logEvent('Output Click'))
                                                                                        }), $(document)
                                                                                            .on('change', '[data-rangeslider]', function (a) {
                                                                                                v.callAnalytics('Sense Hat Event', 'Click', 'Sensor')
                                                                                            }), a.parent && a.parent.postMessage('initialised', '*'), v._queryString && v._trinket.description && v._queryString.showInstructions && v._trinket.description.length && $(document)
                                                                                                .trigger('trinket.instructions.view')
            },
            collectErrorData: function (b, d) {
                var e; var f; var g = d && c(d)
                var h = this._previousError
                h && (h.attempt += 1, f = a.JsDiff.createPatch('attempt' + h.attempt, h.code, b), e = {
                    session: this._sessionId,
                    error: h.error,
                    group: h.group,
                    type: h.type,
                    message: h.message,
                    line: h.line,
                    code: h.code,
                    elapsed: Date.now() - h.time,
                    totalElapsed: Date.now() - h.firstTime,
                    delta: f.substr(f.indexOf('@')),
                    attempt: h.attempt
                }, g && (e.introduced = g.error), g && h.message === g.message ? (e.state = 'repeated', this.logError(e), h.time = Date.now(), g = void 0) : (e.state = 'resolved', this.logError(e), g || (this._previousError = void 0))), g && (g.group = ++this._errorGroup, g.code = b, g.time = g.firstTime = Date.now(), g.attempt = 0, this.logError({
                    state: 'encountered',
                    session: this._sessionId,
                    group: g.group,
                    error: g.error,
                    type: g.type,
                    message: g.message,
                    line: g.line,
                    attempt: g.attempt,
                    code: b
                }), this._previousError = g)
            },
            highlightLine: function (a, b) {
                w.highlight(a, b)
            },
            getTour: function () {
                var a = this.getUIType()
                var b = []
                return a !== 'owner' && ($('.mode-toolbar .show-for-small-only')
                    .css('display') !== 'none' ? ($('#editor')
                        .hasClass('hide') || b.push({
                            el: '.run-it',
                            event: 'code.run'
                        }), b.push({
                            el: '.edit-it',
                            event: 'code.edit'
                        }, {
                            el: '.ace_content',
                            event: 'code.change'
                        }, {
                            el: '.run-it',
                            event: 'code.run'
                        })) : $('#start-value')
                            .val() !== 'result' && this._trinket.code ? b.push([{
                                el: '.run-it',
                                event: 'code.run'
                            }, {
                                el: '.ace_content',
                                event: 'code.change'
                            }]) : b.push({
                                el: '.ace_content',
                                event: 'code.change'
                            }, {
                                el: '.run-it',
                                event: 'code.run'
                            }), b.push({
                                el: '.left-menu-toggle',
                                event: 'menu.options'
                            }, {
                                el: '.share-it',
                                event: 'sharing.share'
                            }), a === 'guest' && b.push({
                                el: '.right-menu-toggle',
                                event: 'menu.user'
                            }), b.push({
                                el: '.save-it',
                                event: 'library.add'
                            })), b
            },
            getEditor: function () {
                return w
            },
            getType: function () {
                return 'python'
            },
            getValue: function (a) {
                return w.serialize(a)
            },
            getMainFile: function () {
                return O
            },
            isDirty: function () {
                if (!this._trinket) return !1
                if (this.getValue() !== (this._original.code || '')) return !0
                var a = w.assets()
                return a.length !== (this._original.assets || [])
                    .length ? !0 : JSON.stringify(a) !== JSON.stringify(this._original.assets) ? !0 : JSON.stringify(this._trinket.settings) !== JSON.stringify(this._original.settings) ? !0 : !1
            },
            getAnalyticsCategory: function () {
                return 'Python'
            },
            serialize: function (a) {
                var b = {
                    code: this.getValue(a),
                    assets: w.assets()
                        .slice(),
                    settings: this._trinket.settings
                }
                return a && a.removeComments && w.removeComments(), b
            },
            showMessage: function (a, b) {
                var c = R('statusMessageTemplate', {
                    type: a,
                    message: b
                })
                var d = $(c)
                $('body')
                    .addClass('has-status-bar')
                    .append(d), d.parent()
                        .foundation()
                        .trigger('open.fndtn.alert')
            },
            showCode: function (a) {
                $('#codeOutput')
                    .addClass('hide'), $('#editor')
                        .removeClass('hide'), v.closeOverlay('#modules'), v.focus(), i(!1)
            },
            showResult: function (a) {
                "run" !== A && a && "run" === $(a.target).data("button") && v.changeRunOption("run"),
                    v.runMode = "",
                    v.triggerRunModeChange(),
                    $("#codeOutput").removeClass("hide"),
                    $("#editor").addClass("hide"),
                    $("#unittest-wrap").addClass("hide"),
                    v.closeOverlay("#modules"),
                    $("#instructionsContainer").addClass("hide"),
                    $("#outputContainer").removeClass("hide"),
                    $("#codeOutputTab").addClass("active"),
                    $("#instructionsTab").removeClass("active"),
                    o(),
                    a && (v.callAnalytics("Interaction", "Click", "Run"),
                        b.runtime("usingSenseHat") && v.callAnalytics("Sense Hat Run", "Click", "Run"))
            },
            stopExecution: function (a) {
                try {
                    if (PygameLib !== null || PygameLib !== undefined || PygameLib !== '')
                        PygameLib.running = false;
                }
                catch (e) {
                    console.log("No Pygame");
                }

                Sk.Sk_interrupt = true;
                //this.getEditor().setReadOnly(false)
                p()
            },
            showTestResult: function (a) {
                $("#codeOutput").removeClass("hide"),
                    $("#editor").addClass("hide"),
                    $("#console-wrap").addClass("hide"),
                    K = !1,
                    $("#graphic-wrap").addClass("hide"),
                    L = !1,
                    $("#unittest-wrap").removeClass("hide"),
                    $("#output-dragbar").addClass("hide"),
                    $("#instructionsContainer").addClass("hide"),
                    $("#outputContainer").removeClass("hide"),
                    v.closeOverlay("#modules"),
                    n(),
                    a && v.callAnalytics("Interaction", "Click", "Check")
            },
            consoleResult: function (a) {
                "console" !== A && a && "console" === $(a.target).data("button") && v.changeRunOption("console"),
                    v.runMode = "console",
                    v.triggerRunModeChange(),
                    $("#codeOutput").removeClass("hide"),
                    $("#editor").addClass("hide"),
                    $("#unittest-wrap").addClass("hide"),
                    v.closeOverlay("#modules"),
                    $("#instructionsContainer").addClass("hide"),
                    $("#outputContainer").removeClass("hide"),
                    $("#codeOutputTab").addClass("active"),
                    $("#instructionsTab").removeClass("active"),
                    r(),
                    a && (v.callAnalytics("Interaction", "Click", "Console"),
                        b.runtime("usingSenseHat") && v.callAnalytics("Sense Hat Run", "Click", "Console"))
            },
            toggleModules: function () {
                J ? v.toggleOverlay('#modules') : $.get('/api/docs/python', function (a) {
                    $('#modules')
                        .prepend(a), $(document)
                            .foundation(), v.toggleOverlay('#modules'), J = !0, v.callAnalytics('Interaction', 'Click', 'Documentation')
                })
            },
            hideAll: function () {
                this.toggleModules()
            },
            onOpenOverlay: function () {
                $('#codeOutput')
                    .addClass('hide'), $('#editor')
                        .addClass('hide')
            },
            onCloseOverlay: function () {
                $('#codeOutput')
                    .removeClass('hide'), $('#editor')
                        .removeClass('hide'), v.focus(), i(!1)
            },
            reset: function (a, b) {
                w.reset(a.code), w.assets(a.assets ? a.assets.slice() : []), b || k(), A === 'console' || v.runMode === 'console' ? this.consoleResult() : a.code && z === 'result' && I !== !1 ? this.showResult() : (this.showCode(), j())
            },
            replaceMain: function (a, b) {
                w.setValue(a.code), w.assets(a.assets ? a.assets.slice() : []), b || k()
            },
            onChangeChecks: function (b) {
                var c; var d; var e; var f = this
                c = function () {
                    d = []
                    var c; var g = JSON.parse(f.getValue())
                    var h = 'main.py'
                    _.find(g, {
                        name: h
                    })
                        .content
                    for (E && (c = E.parseCode(w)), e = 0; e < b.length; e++) {
                        d.push({
                            result: b[e].fn.call(f, c),
                            name: b[e].name
                        })
                    }
                    a.parent.postMessage(JSON.stringify({
                        action: 'check-results',
                        results: d
                    }), '*')
                }, $(this)
                    .on('trinket.code.change', _.debounce(c, 1e3)), $(document)
                        .on('trinket.resetted', c), c()
            },
            focus: function () {
                !$('body')
                    .data('is-mobile') && $('body')
                        .data('autofocus') && w.focus(), i(!1)
            },
            markCodeAsRun: function (a) {
                F[a] = !0
            },
            downloadable: function () {
                var a; var c; var d; var e = this.getUIType() === 'owner'
                return this._trinket && this._trinket._origin_id && (a = this._trinket._origin_id), c = e && !a ? w.getAllFiles() : w.getAllVisibleFiles(), d = w.assets(), b.runtime('usingSenseHat') || S.usingSenseHat(c) && S.addSrc(), {
                    files: c,
                    assets: d
                }
            },
            toggleCheckButton: function () {
                $('.check-it')
                    .hasClass('hide') ? $('.check-it')
                        .removeClass('hide') : $('.check-it')
                            .addClass('hide')
            },
            changeRunOption: function (a) {
                var b = {
                    run: 'fa fa-play',
                    console: 'fa fa-terminal',
                    stop: 'fa fa-stop'
                }
                var c = {
                    run: 'View the result.',
                    console: 'Run code interactively.',
                    stop: 'Stop program.'
                }
                var d = {
                    run: '运行',
                    console: '命令行',
                    stop: '停止'
                }
                $('.run-it')
                    .data('action', 'code.' + a), $('.run-it')
                        .attr('title', c[a]), $('.run-it')
                            .find('label')
                            .text(d[a]), $('.run-it')
                                .find('i')
                                .removeClass()
                                .addClass(b[a]), A = a
            },
            discardDraftSettings: function () {
                if (this._trinket.settings.testsEnabled !== this._predraft.settings.testsEnabled) {
                    var a = new MouseEvent('click', {
                        bubbles: !0
                    })
                    try {
                        $('#testsEnabled')
                            .data('skip-trigger', !0), $('#testsEnabled')[0].dispatchEvent(a)
                    } catch (c) {
                        console.log('testsEnabled click err:', c)
                    }
                }
                b.runtime('usingSenseHat') && S.resetSensors(this._predraft.settings)
            }
        }
    }(window, window.TrinketIO))
