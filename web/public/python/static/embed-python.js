'use strict';
!function($, window, document, undefined) {
  /**
   * @param {string} name
   * @return {?}
   */
  function removeQuotes(name) {
    return (typeof name === "string" || name instanceof String) && (name = name.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, "")), name;
  }
  /**
   * @param {!Object} class_array
   * @return {undefined}
   */
  var header_helpers = function(class_array) {
    var i = class_array.length;
    var head = $("head");
    for (; i--;) {
      if (head.has("." + class_array[i]).length === 0) {
        head.append('<meta class="' + class_array[i] + '" />');
      }
    }
  };
  header_helpers(["foundation-mq-small", "foundation-mq-small-only", "foundation-mq-medium", "foundation-mq-medium-only", "foundation-mq-large", "foundation-mq-large-only", "foundation-mq-xlarge", "foundation-mq-xlarge-only", "foundation-mq-xxlarge", "foundation-data-attribute-namespace"]);
  $(function() {
    if (typeof FastClick !== "undefined" && typeof document.body !== "undefined") {
      FastClick.attach(document.body);
    }
  });
  /**
   * @param {!Object} type
   * @param {!Object} context
   * @return {?}
   */
  var S = function(type, context) {
    if (typeof type === "string") {
      if (context) {
        var value;
        if (context.jquery) {
          if (value = context[0], !value) {
            return context;
          }
        } else {
          /** @type {!Object} */
          value = context;
        }
        return $(value.querySelectorAll(type));
      }
      return $(document.querySelectorAll(type));
    }
    return $(type, context);
  };
  /**
   * @param {string} init
   * @return {?}
   */
  var attr_name = function(init) {
    /** @type {!Array} */
    var arr = [];
    return init || arr.push("data"), this.namespace.length > 0 && arr.push(this.namespace), arr.push(this.name), arr.join("-");
  };
  /**
   * @param {string} tag
   * @return {?}
   */
  var i = function(tag) {
    var tokens = tag.split("-");
    var i = tokens.length;
    /** @type {!Array} */
    var url = [];
    for (; i--;) {
      if (i !== 0) {
        url.push(tokens[i]);
      } else {
        if (this.namespace.length > 0) {
          url.push(this.namespace, tokens[i]);
        } else {
          url.push(tokens[i]);
        }
      }
    }
    return url.reverse().join("-");
  };
  /**
   * @param {!Function} method
   * @param {!Function} options
   * @return {?}
   */
  var bindings = function(method, options) {
    var self = this;
    /** @type {boolean} */
    var e = !S(this).data(this.attr_name(true));
    return S(this.scope).is("[" + this.attr_name() + "]") ? (S(this.scope).data(this.attr_name(true) + "-init", $.extend({}, this.settings, options || method, this.data_options(S(this.scope)))), e && this.events(this.scope)) : S("[" + this.attr_name() + "]", this.scope).each(function() {
      /** @type {boolean} */
      var e = !S(this).data(self.attr_name(true) + "-init");
      S(this).data(self.attr_name(true) + "-init", $.extend({}, self.settings, options || method, self.data_options(S(this))));
      if (e) {
        self.events(this);
      }
    }), typeof method === "string" ? this[method].call(this, options) : void 0;
  };
  /**
   * @param {!Object} image
   * @param {!Function} callback
   * @return {?}
   */
  var single_image_loaded = function(image, callback) {
    /**
     * @return {undefined}
     */
    function loaded() {
      callback(image[0]);
    }
    /**
     * @return {undefined}
     */
    function bindLoad() {
      if (this.one("load", loaded), /MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var src = this.attr("src");
        /** @type {string} */
        var param = src.match(/\?/) ? "&" : "?";
        /** @type {string} */
        param = param + ("random=" + (new Date).getTime());
        this.attr("src", src + param);
      }
    }
    return image.attr("src") ? void(image[0].complete || image[0].readyState === 4 ? loaded() : bindLoad.call(image)) : void loaded();
  };
  /** @type {function(this:Window, string): (MediaQueryList|null)} */
  window.matchMedia = window.matchMedia || function(doc) {
    var match;
    var c = doc.documentElement;
    var d = c.firstElementChild || c.firstChild;
    var e = doc.createElement("body");
    var div = doc.createElement("div");
    return div.id = "mq-test-1", div.style.cssText = "position:absolute;top:-100em", e.style.background = "none", e.appendChild(div), function(chunk_part) {
      return div.innerHTML = '&shy;<style media="' + chunk_part + '"> #mq-test-1 { width: 42px; }</style>', c.insertBefore(e, d), match = div.offsetWidth === 42, c.removeChild(e), {
        matches : match,
        media : chunk_part
      };
    };
  }(document);
  (function(klass) {
    /**
     * @return {undefined}
     */
    function raf() {
      if (d) {
        requestAnimationFrame(raf);
        if (isValDef) {
          jQuery.fx.tick();
        }
      }
    }
    var d;
    /** @type {number} */
    var i = 0;
    /** @type {!Array} */
    var vendors = ["webkit", "moz"];
    /** @type {function(!Function): ?} */
    var requestAnimationFrame = window.requestAnimationFrame;
    /** @type {function(?): undefined} */
    var cancelAnimationFrame = window.cancelAnimationFrame;
    /** @type {boolean} */
    var isValDef = typeof jQuery.fx !== "undefined";
    for (; i < vendors.length && !requestAnimationFrame; i++) {
      requestAnimationFrame = window[vendors[i] + "RequestAnimationFrame"];
      cancelAnimationFrame = cancelAnimationFrame || window[vendors[i] + "CancelAnimationFrame"] || window[vendors[i] + "CancelRequestAnimationFrame"];
    }
    if (requestAnimationFrame) {
      window.requestAnimationFrame = requestAnimationFrame;
      window.cancelAnimationFrame = cancelAnimationFrame;
      if (isValDef) {
        /**
         * @param {string} timer
         * @return {undefined}
         */
        jQuery.fx.timer = function(timer) {
          if (timer() && jQuery.timers.push(timer) && !d) {
            /** @type {boolean} */
            d = true;
            raf();
          }
        };
        /**
         * @return {undefined}
         */
        jQuery.fx.stop = function() {
          /** @type {boolean} */
          d = false;
        };
      }
    } else {
      /**
       * @param {!Function} callback
       * @return {?}
       */
      window.requestAnimationFrame = function(callback) {
        /** @type {number} */
        var line = (new Date).getTime();
        /** @type {number} */
        var d = Math.max(0, 16 - (line - i));
        var task_panel = window.setTimeout(function() {
          callback(line + d);
        }, d);
        return i = line + d, task_panel;
      };
      /**
       * @param {?} id
       * @return {undefined}
       */
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  })(jQuery);
  window.Foundation = {
    name : "Foundation",
    version : "5.5.0",
    media_queries : {
      small : S(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
      "small-only" : S(".foundation-mq-small-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
      medium : S(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
      "medium-only" : S(".foundation-mq-medium-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
      large : S(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
      "large-only" : S(".foundation-mq-large-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
      xlarge : S(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
      "xlarge-only" : S(".foundation-mq-xlarge-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
      xxlarge : S(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, "")
    },
    stylesheet : $("<style></style>").appendTo("head")[0].sheet,
    global : {
      namespace : undefined
    },
    init : function(scope, libraries, method, response, done) {
      /** @type {!Array} */
      var args = [scope, method, response, done];
      /** @type {!Array} */
      var responses = [];
      if (this.rtl = /rtl/i.test(S("html").attr("dir")), this.scope = scope || this.scope, this.set_namespace(), libraries && typeof libraries === "string" && !/reflow/i.test(libraries)) {
        if (this.libs.hasOwnProperty(libraries)) {
          responses.push(this.init_lib(libraries, args));
        }
      } else {
        var lib;
        for (lib in this.libs) {
          responses.push(this.init_lib(lib, libraries));
        }
      }
      return S(window).load(function() {
        S(window).trigger("resize.fndtn.clearing").trigger("resize.fndtn.dropdown").trigger("resize.fndtn.equalizer").trigger("resize.fndtn.interchange").trigger("resize.fndtn.joyride").trigger("resize.fndtn.magellan").trigger("resize.fndtn.topbar").trigger("resize.fndtn.slider");
      }), scope;
    },
    init_lib : function(lib, args) {
      return this.libs.hasOwnProperty(lib) ? (this.patch(this.libs[lib]), args && args.hasOwnProperty(lib) ? (typeof this.libs[lib].settings !== "undefined" ? $.extend(true, this.libs[lib].settings, args[lib]) : typeof this.libs[lib].defaults !== "undefined" && $.extend(true, this.libs[lib].defaults, args[lib]), this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]])) : (args = args instanceof Array ? args : new Array(args), this.libs[lib].init.apply(this.libs[lib], args))) : function() {
      };
    },
    patch : function(self) {
      self.scope = this.scope;
      self.namespace = this.global.namespace;
      self.rtl = this.rtl;
      self.data_options = this.utils.data_options;
      /** @type {function(string): ?} */
      self.attr_name = attr_name;
      /** @type {function(string): ?} */
      self.add_namespace = i;
      /** @type {function(!Function, !Function): ?} */
      self.bindings = bindings;
      self.S = this.utils.S;
    },
    inherit : function(scope, methods) {
      var methods_arr = methods.split(" ");
      var i = methods_arr.length;
      for (; i--;) {
        if (this.utils.hasOwnProperty(methods_arr[i])) {
          scope[methods_arr[i]] = this.utils[methods_arr[i]];
        }
      }
    },
    set_namespace : function() {
      var namespace = this.global.namespace === undefined ? $(".foundation-data-attribute-namespace").css("font-family") : this.global.namespace;
      this.global.namespace = namespace === undefined || /false/i.test(namespace) ? "" : namespace;
    },
    libs : {},
    utils : {
      S : S,
      throttle : function(handler, msDelay) {
        /** @type {null} */
        var autoCloseTimeout = null;
        return function() {
          var chartInstance = this;
          /** @type {!Arguments} */
          var _arguments = arguments;
          if (autoCloseTimeout == null) {
            /** @type {number} */
            autoCloseTimeout = setTimeout(function() {
              handler.apply(chartInstance, _arguments);
              /** @type {null} */
              autoCloseTimeout = null;
            }, msDelay);
          }
        };
      },
      debounce : function(callback, delay, immediate) {
        var timeoutId;
        var comment;
        return function() {
          var data = this;
          /** @type {!Arguments} */
          var options = arguments;
          /**
           * @return {undefined}
           */
          var delayed = function() {
            /** @type {null} */
            timeoutId = null;
            if (!immediate) {
              comment = callback.apply(data, options);
            }
          };
          var outputComments = immediate && !timeoutId;
          return clearTimeout(timeoutId), timeoutId = setTimeout(delayed, delay), outputComments && (comment = callback.apply(data, options)), comment;
        };
      },
      data_options : function(el, data_attr_name) {
        /**
         * @param {string} value
         * @return {?}
         */
        function isNumber(value) {
          return !isNaN(value - 0) && value !== null && value !== "" && value !== false && value !== true;
        }
        /**
         * @param {string} n
         * @return {?}
         */
        function trim(n) {
          return typeof n === "string" ? $.trim(n) : n;
        }
        data_attr_name = data_attr_name || "options";
        var i;
        var parts;
        var h;
        var opts = {};
        /**
         * @param {!Object} el
         * @return {?}
         */
        var data_options = function(el) {
          var namespace = Foundation.global.namespace;
          return namespace.length > 0 ? el.data(namespace + "-" + data_attr_name) : el.data(data_attr_name);
        };
        var cached_options = data_options(el);
        if (typeof cached_options === "object") {
          return cached_options;
        }
        h = (cached_options || ":").split(";");
        i = h.length;
        for (; i--;) {
          parts = h[i].split(":");
          /** @type {!Array} */
          parts = [parts[0], parts.slice(1).join(":")];
          if (/true/i.test(parts[1])) {
            /** @type {boolean} */
            parts[1] = true;
          }
          if (/false/i.test(parts[1])) {
            /** @type {boolean} */
            parts[1] = false;
          }
          if (isNumber(parts[1])) {
            if (parts[1].indexOf(".") === -1) {
              /** @type {number} */
              parts[1] = parseInt(parts[1], 10);
            } else {
              /** @type {number} */
              parts[1] = parseFloat(parts[1]);
            }
          }
          if (parts.length === 2 && parts[0].length > 0) {
            opts[trim(parts[0])] = trim(parts[1]);
          }
        }
        return opts;
      },
      register_media : function(media, media_class) {
        if (Foundation.media_queries[media] === undefined) {
          $("head").append('<meta class="' + media_class + '"/>');
          Foundation.media_queries[media] = removeQuotes($("." + media_class).css("font-family"));
        }
      },
      add_custom_rule : function(rule, media) {
        if (media === undefined && Foundation.stylesheet) {
          Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
        } else {
          var query = Foundation.media_queries[media];
          if (query !== undefined) {
            Foundation.stylesheet.insertRule("@media " + Foundation.media_queries[media] + "{ " + rule + " }");
          }
        }
      },
      image_loaded : function(images, callback) {
        var tet = this;
        var unloaded = images.length;
        if (unloaded === 0) {
          callback(images);
        }
        images.each(function() {
          single_image_loaded(tet.S(this), function() {
            /** @type {number} */
            unloaded = unloaded - 1;
            if (unloaded === 0) {
              callback(images);
            }
          });
        });
      },
      random_str : function() {
        return this.fidx || (this.fidx = 0), this.prefix = this.prefix || [this.name || "F", (+new Date).toString(36)].join("-"), this.prefix + (this.fidx++).toString(36);
      },
      match : function(query) {
        return window.matchMedia(query).matches;
      },
      is_small_up : function() {
        return this.match(Foundation.media_queries.small);
      },
      is_medium_up : function() {
        return this.match(Foundation.media_queries.medium);
      },
      is_large_up : function() {
        return this.match(Foundation.media_queries.large);
      },
      is_xlarge_up : function() {
        return this.match(Foundation.media_queries.xlarge);
      },
      is_xxlarge_up : function() {
        return this.match(Foundation.media_queries.xxlarge);
      },
      is_small_only : function() {
        return !(this.is_medium_up() || this.is_large_up() || this.is_xlarge_up() || this.is_xxlarge_up());
      },
      is_medium_only : function() {
        return this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },
      is_large_only : function() {
        return this.is_medium_up() && this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },
      is_xlarge_only : function() {
        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && !this.is_xxlarge_up();
      },
      is_xxlarge_only : function() {
        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && this.is_xxlarge_up();
      }
    }
  };
  /**
   * @return {?}
   */
  $.fn.foundation = function() {
    /** @type {!Array<?>} */
    var a = Array.prototype.slice.call(arguments, 0);
    return this.each(function() {
      return Foundation.init.apply(Foundation, [this].concat(a)), this;
    });
  };
}(jQuery, window, window.document), 

function($, metaWindow, canCreateDiscussions, isSlidingUp) {
  Foundation.libs.accordion = {
    name : "accordion",
    version : "5.5.0",
    settings : {
      content_class : "content",
      active_class : "active",
      multi_expand : false,
      toggleable : true,
      callback : function() {
      }
    },
    init : function(begin, method, options) {
      this.bindings(method, options);
    },
    events : function() {
      var self = this;
      var S = this.S;
      S(this.scope).off(".fndtn.accordion").on("click.fndtn.accordion", "[" + this.attr_name() + "] > .accordion-navigation > a", function(event) {
        var accordion = S(this).closest("[" + self.attr_name() + "]");
        var f = self.attr_name() + "=" + accordion.attr(self.attr_name());
        var settings = accordion.data(self.attr_name(true) + "-init") || self.settings;
        var target = S("#" + this.href.split("#")[1]);
        var aunts = $("> .accordion-navigation", accordion);
        var siblings = aunts.children("." + settings.content_class);
        var active_content = siblings.filter("." + settings.active_class);
        return event.preventDefault(), accordion.attr(self.attr_name()) && (siblings = siblings.add("[" + f + "] dd > ." + settings.content_class), aunts = aunts.add("[" + f + "] .accordion-navigation")), settings.toggleable && target.is(active_content) ? (target.parent(".accordion-navigation").toggleClass(settings.active_class, false), target.toggleClass(settings.active_class, false), settings.callback(target), target.triggerHandler("toggled", [accordion]), void accordion.triggerHandler("toggled", 
        [target])) : (settings.multi_expand || (siblings.removeClass(settings.active_class), aunts.removeClass(settings.active_class)), target.addClass(settings.active_class).parent().addClass(settings.active_class), settings.callback(target), target.triggerHandler("toggled", [accordion]), void accordion.triggerHandler("toggled", [target]));
      });
    },
    off : function() {
    },
    reflow : function() {
    }
  };
}(jQuery, window, window.document), 

function($, metaWindow, canCreateDiscussions, isSlidingUp) {
  Foundation.libs.alert = {
    name : "alert",
    version : "5.5.0",
    settings : {
      callback : function() {
      }
    },
    init : function(begin, method, options) {
      this.bindings(method, options);
    },
    events : function() {
      var self = this;
      var S = this.S;
      $(this.scope).off(".alert").on("click.fndtn.alert", "[" + this.attr_name() + "] .close", function(event) {
        var alertBox = S(this).closest("[" + self.attr_name() + "]");
        var toggleBanner = alertBox.data(self.attr_name(true) + "-init") || self.settings;
        event.preventDefault();
        if (Modernizr.csstransitions) {
          alertBox.addClass("alert-close");
          alertBox.on("transitionend webkitTransitionEnd oTransitionEnd", function(a) {
            S(this).trigger("close").trigger("close.fndtn.alert").remove();
            toggleBanner.callback();
          });
        } else {
          alertBox.fadeOut(300, function() {
            S(this).trigger("close").trigger("close.fndtn.alert").remove();
            toggleBanner.callback();
          });
        }
      });
    },
    reflow : function() {
    }
  };
}(jQuery, window, window.document), function($, window, docDom, canCreateDiscussions) {
  Foundation.libs.dropdown = {
    name : "dropdown",
    version : "5.5.0",
    settings : {
      active_class : "open",
      disabled_class : "disabled",
      mega_class : "mega",
      align : "bottom",
      is_hover : false,
      hover_timeout : 150,
      opened : function() {
      },
      closed : function() {
      }
    },
    init : function(begin, method, options) {
      Foundation.inherit(this, "throttle");
      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
    },
    events : function(type) {
      var self = this;
      var S = self.S;
      S(this.scope).off(".dropdown").on("click.fndtn.dropdown", "[" + this.attr_name() + "]", function(event) {
        var settings = S(this).data(self.attr_name(true) + "-init") || self.settings;
        if (!settings.is_hover || Modernizr.touch) {
          event.preventDefault();
          if (S(this).parent("[data-reveal-id]")) {
            event.stopPropagation();
          }
          self.toggle($(this));
        }
      }).on("mouseenter.fndtn.dropdown", "[" + this.attr_name() + "], [" + this.attr_name() + "-content]", function(e) {
        var dropdown;
        var target;
        var $this = S(this);
        clearTimeout(self.timeout);
        if ($this.data(self.data_attr())) {
          dropdown = S("#" + $this.data(self.data_attr()));
          target = $this;
        } else {
          dropdown = $this;
          target = S("[" + self.attr_name() + '="' + dropdown.attr("id") + '"]');
        }
        var settings = target.data(self.attr_name(true) + "-init") || self.settings;
        if (S(e.currentTarget).data(self.data_attr()) && settings.is_hover) {
          self.closeall.call(self);
        }
        if (settings.is_hover) {
          self.open.apply(self, [dropdown, target]);
        }
      }).on("mouseleave.fndtn.dropdown", "[" + this.attr_name() + "], [" + this.attr_name() + "-content]", function(a) {
        var settings;
        var $this = S(this);
        if ($this.data(self.data_attr())) {
          settings = $this.data(self.data_attr(true) + "-init") || self.settings;
        } else {
          var target = S("[" + self.attr_name() + '="' + S(this).attr("id") + '"]');
          settings = target.data(self.attr_name(true) + "-init") || self.settings;
        }
        /** @type {number} */
        self.timeout = setTimeout(function() {
          if ($this.data(self.data_attr())) {
            if (settings.is_hover) {
              self.close.call(self, S("#" + $this.data(self.data_attr())));
            }
          } else {
            if (settings.is_hover) {
              self.close.call(self, $this);
            }
          }
        }, settings.hover_timeout);
      }).on("click.fndtn.dropdown", function(e) {
        var parent = S(e.target).closest("[" + self.attr_name() + "-content]");
        var currentPageLinks = parent.find("a");
        return currentPageLinks.length > 0 && parent.attr("aria-autoclose") !== "false" && self.close.call(self, S("[" + self.attr_name() + "-content]")), S(e.target).closest("[" + self.attr_name() + "]").length > 0 ? void 0 : !S(e.target).data("revealId") && parent.length > 0 && (S(e.target).is("[" + self.attr_name() + "-content]") || $.contains(parent.first()[0], e.target)) ? void e.stopPropagation() : void self.close.call(self, S("[" + self.attr_name() + "-content]"));
      }).on("opened.fndtn.dropdown", "[" + self.attr_name() + "-content]", function() {
        self.settings.opened.call(this);
      }).on("closed.fndtn.dropdown", "[" + self.attr_name() + "-content]", function() {
        self.settings.closed.call(this);
      });
      S(window).off(".dropdown").on("resize.fndtn.dropdown", self.throttle(function() {
        self.resize.call(self);
      }, 50));
      this.resize();
    },
    close : function(dropdown) {
      var self = this;
      dropdown.each(function() {
        var $branch = $("[" + self.attr_name() + "=" + dropdown[0].id + "]") || $("aria-controls=" + dropdown[0].id + "]");
        $branch.attr("aria-expanded", "false");
        if (self.S(this).hasClass(self.settings.active_class)) {
          self.S(this).css(Foundation.rtl ? "right" : "left", "-99999px").attr("aria-hidden", "true").removeClass(self.settings.active_class).prev("[" + self.attr_name() + "]").removeClass(self.settings.active_class).removeData("target");
          self.S(this).trigger("closed").trigger("closed.fndtn.dropdown", [dropdown]);
        }
      });
      dropdown.removeClass("f-open-" + this.attr_name(true));
    },
    closeall : function() {
      var sig = this;
      $.each(sig.S(".f-open-" + this.attr_name(true)), function() {
        sig.close.call(sig, sig.S(this));
      });
    },
    open : function(dropdown, target) {
      this.css(dropdown.addClass(this.settings.active_class), target);
      dropdown.prev("[" + this.attr_name() + "]").addClass(this.settings.active_class);
      dropdown.data("target", target.get(0)).trigger("opened").trigger("opened.fndtn.dropdown", [dropdown, target]);
      dropdown.attr("aria-hidden", "false");
      target.attr("aria-expanded", "true");
      dropdown.focus();
      dropdown.addClass("f-open-" + this.attr_name(true));
    },
    data_attr : function() {
      return this.namespace.length > 0 ? this.namespace + "-" + this.name : this.name;
    },
    toggle : function(target) {
      if (!target.hasClass(this.settings.disabled_class)) {
        var dropdown = this.S("#" + target.data(this.data_attr()));
        if (dropdown.length !== 0) {
          this.close.call(this, this.S("[" + this.attr_name() + "-content]").not(dropdown));
          if (dropdown.hasClass(this.settings.active_class)) {
            this.close.call(this, dropdown);
            if (dropdown.data("target") !== target.get(0)) {
              this.open.call(this, dropdown, target);
            }
          } else {
            this.open.call(this, dropdown, target);
          }
        }
      }
    },
    resize : function() {
      var dropdown = this.S("[" + this.attr_name() + "-content].open");
      var target = this.S("[" + this.attr_name() + '="' + dropdown.attr("id") + '"]');
      if (dropdown.length && target.length) {
        this.css(dropdown, target);
      }
    },
    css : function(dropdown, target) {
      /** @type {number} */
      var left_offset = Math.max((target.width() - dropdown.width()) / 2, 8);
      var settings = target.data(this.attr_name(true) + "-init") || this.settings;
      if (this.clear_idx(), this.small()) {
        var p = this.dirs.bottom.call(dropdown, target, settings);
        dropdown.attr("style", "").removeClass("drop-left drop-right drop-top").css({
          position : "absolute",
          width : "95%",
          "max-width" : "none",
          top : p.top
        });
        dropdown.css(Foundation.rtl ? "right" : "left", left_offset);
      } else {
        this.style(dropdown, target, settings);
      }
      return dropdown;
    },
    style : function(dropdown, target, settings) {
      var css = $.extend({
        position : "absolute"
      }, this.dirs[settings.align].call(dropdown, target, settings));
      dropdown.attr("style", "").css(css);
    },
    dirs : {
      _base : function(options) {
        var offsetParent = this.offsetParent();
        var o = offsetParent.offset();
        var p = options.offset();
        p.top -= o.top;
        p.left -= o.left;
        /** @type {boolean} */
        p.missRight = false;
        /** @type {boolean} */
        p.missTop = false;
        /** @type {boolean} */
        p.missLeft = false;
        /** @type {boolean} */
        p.leftRightFlag = false;
        var actualBodyWidth;
        actualBodyWidth = docDom.getElementsByClassName("row")[0] ? docDom.getElementsByClassName("row")[0].clientWidth : window.outerWidth;
        /** @type {number} */
        var actualMarginWidth = (window.outerWidth - actualBodyWidth) / 2;
        var actualBoundary = actualBodyWidth;
        return this.hasClass("mega") || (options.offset().top <= this.outerHeight() && (p.missTop = true, actualBoundary = window.outerWidth - actualMarginWidth, p.leftRightFlag = true), options.offset().left + this.outerWidth() > options.offset().left + actualMarginWidth && options.offset().left - actualMarginWidth > this.outerWidth() && (p.missRight = true, p.missLeft = false), options.offset().left - this.outerWidth() <= 0 && (p.missLeft = true, p.missRight = false)), p;
      },
      top : function(t, s) {
        var self = Foundation.libs.dropdown;
        var p = self.dirs._base.call(this, t);
        return this.addClass("drop-top"), p.missTop == 1 && (p.top = p.top + t.outerHeight() + this.outerHeight(), this.removeClass("drop-top")), p.missRight == 1 && (p.left = p.left - this.outerWidth() + t.outerWidth()), (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) && self.adjust_pip(this, t, s, p), Foundation.rtl ? {
          left : p.left - this.outerWidth() + t.outerWidth(),
          top : p.top - this.outerHeight()
        } : {
          left : p.left,
          top : p.top - this.outerHeight()
        };
      },
      bottom : function(t, s) {
        var self = Foundation.libs.dropdown;
        var p = self.dirs._base.call(this, t);
        return p.missRight == 1 && (p.left = p.left - this.outerWidth() + t.outerWidth()), (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) && self.adjust_pip(this, t, s, p), self.rtl ? {
          left : p.left - this.outerWidth() + t.outerWidth(),
          top : p.top + t.outerHeight()
        } : {
          left : p.left,
          top : p.top + t.outerHeight()
        };
      },
      left : function(options, i) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, options);
        return this.addClass("drop-left"), p.missLeft == 1 && (p.left = p.left + this.outerWidth(), p.top = p.top + options.outerHeight(), this.removeClass("drop-left")), {
          left : p.left - this.outerWidth(),
          top : p.top
        };
      },
      right : function(t, s) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, t);
        this.addClass("drop-right");
        if (p.missRight == 1) {
          /** @type {number} */
          p.left = p.left - this.outerWidth();
          p.top = p.top + t.outerHeight();
          this.removeClass("drop-right");
        } else {
          /** @type {boolean} */
          p.triggeredRight = true;
        }
        var self = Foundation.libs.dropdown;
        return (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) && self.adjust_pip(this, t, s, p), {
          left : p.left + t.outerWidth(),
          top : p.top
        };
      }
    },
    adjust_pip : function(dropdown, target, settings, p) {
      var sheet = Foundation.stylesheet;
      /** @type {number} */
      var mf = 8;
      if (dropdown.hasClass(settings.mega_class)) {
        /** @type {number} */
        mf = p.left + target.outerWidth() / 2 - 8;
      } else {
        if (this.small()) {
          /** @type {number} */
          mf = mf + (p.left - 8);
        }
      }
      this.rule_idx = sheet.cssRules.length;
      /** @type {string} */
      var sel_before = ".f-dropdown.open:before";
      /** @type {string} */
      var sel_after = ".f-dropdown.open:after";
      /** @type {string} */
      var css_before = "left: " + mf + "px;";
      /** @type {string} */
      var css_after = "left: " + (mf - 1) + "px;";
      if (p.missRight == 1) {
        /** @type {number} */
        mf = dropdown.outerWidth() - 23;
        /** @type {string} */
        sel_before = ".f-dropdown.open:before";
        /** @type {string} */
        sel_after = ".f-dropdown.open:after";
        /** @type {string} */
        css_before = "left: " + mf + "px;";
        /** @type {string} */
        css_after = "left: " + (mf - 1) + "px;";
      }
      if (p.triggeredRight == 1) {
        /** @type {string} */
        sel_before = ".f-dropdown.open:before";
        /** @type {string} */
        sel_after = ".f-dropdown.open:after";
        /** @type {string} */
        css_before = "left:-12px;";
        /** @type {string} */
        css_after = "left:-14px;";
      }
      if (sheet.insertRule) {
        sheet.insertRule([sel_before, "{", css_before, "}"].join(" "), this.rule_idx);
        sheet.insertRule([sel_after, "{", css_after, "}"].join(" "), this.rule_idx + 1);
      } else {
        sheet.addRule(sel_before, css_before, this.rule_idx);
        sheet.addRule(sel_after, css_after, this.rule_idx + 1);
      }
    },
    clear_idx : function() {
      var sheet = Foundation.stylesheet;
      if (typeof this.rule_idx !== "undefined") {
        sheet.deleteRule(this.rule_idx);
        sheet.deleteRule(this.rule_idx);
        delete this.rule_idx;
      }
    },
    small : function() {
      return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
    },
    off : function() {
      this.S(this.scope).off(".fndtn.dropdown");
      this.S("html, body").off(".fndtn.dropdown");
      this.S(window).off(".fndtn.dropdown");
      this.S("[data-dropdown-content]").off(".fndtn.dropdown");
    },
    reflow : function() {
    }
  };
}(jQuery, window, window.document), function($, metaWindow, canCreateDiscussions, isSlidingUp) {
  Foundation.libs.offcanvas = {
    name : "offcanvas",
    version : "5.5.0",
    settings : {
      open_method : "move",
      close_on_click : false
    },
    init : function(begin, method, options) {
      this.bindings(method, options);
    },
    events : function() {
      var self = this;
      var S = self.S;
      /** @type {string} */
      var move_class = "";
      /** @type {string} */
      var right_postfix = "";
      /** @type {string} */
      var left_postfix = "";
      if (this.settings.open_method === "move") {
        /** @type {string} */
        move_class = "move-";
        /** @type {string} */
        right_postfix = "right";
        /** @type {string} */
        left_postfix = "left";
      } else {
        if (this.settings.open_method === "overlap_single") {
          /** @type {string} */
          move_class = "offcanvas-overlap-";
          /** @type {string} */
          right_postfix = "right";
          /** @type {string} */
          left_postfix = "left";
        } else {
          if (this.settings.open_method === "overlap") {
            /** @type {string} */
            move_class = "offcanvas-overlap";
          }
        }
      }
      S(this.scope).off(".offcanvas").on("click.fndtn.offcanvas", ".left-off-canvas-toggle", function(e) {
        self.click_toggle_class(e, move_class + right_postfix);
        if (self.settings.open_method !== "overlap") {
          S(".left-submenu").removeClass(move_class + right_postfix);
        }
        $(".left-off-canvas-toggle").attr("aria-expanded", "true");
      }).on("click.fndtn.offcanvas", ".left-off-canvas-menu a", function(e) {
        var settings = self.get_settings(e);
        var parent = S(this).parent();
        if (!settings.close_on_click || parent.hasClass("has-submenu") || parent.hasClass("back")) {
          if (S(this).parent().hasClass("has-submenu")) {
            e.preventDefault();
            S(this).siblings(".left-submenu").toggleClass(move_class + right_postfix);
          } else {
            if (parent.hasClass("back")) {
              e.preventDefault();
              parent.parent().removeClass(move_class + right_postfix);
            }
          }
        } else {
          self.hide.call(self, move_class + right_postfix, self.get_wrapper(e));
          parent.parent().removeClass(move_class + right_postfix);
        }
        $(".left-off-canvas-toggle").attr("aria-expanded", "true");
      }).on("click.fndtn.offcanvas", ".right-off-canvas-toggle", function(e) {
        self.click_toggle_class(e, move_class + left_postfix);
        if (self.settings.open_method !== "overlap") {
          S(".right-submenu").removeClass(move_class + left_postfix);
        }
        $(".right-off-canvas-toggle").attr("aria-expanded", "true");
      }).on("click.fndtn.offcanvas", ".right-off-canvas-menu a", function(e) {
        var settings = self.get_settings(e);
        var parent = S(this).parent();
        if (!settings.close_on_click || parent.hasClass("has-submenu") || parent.hasClass("back")) {
          if (S(this).parent().hasClass("has-submenu")) {
            e.preventDefault();
            S(this).siblings(".right-submenu").toggleClass(move_class + left_postfix);
          } else {
            if (parent.hasClass("back")) {
              e.preventDefault();
              parent.parent().removeClass(move_class + left_postfix);
            }
          }
        } else {
          self.hide.call(self, move_class + left_postfix, self.get_wrapper(e));
          parent.parent().removeClass(move_class + left_postfix);
        }
        $(".right-off-canvas-toggle").attr("aria-expanded", "true");
      }).on("click.fndtn.offcanvas", ".exit-off-canvas", function(e) {
        self.click_remove_class(e, move_class + left_postfix);
        S(".right-submenu").removeClass(move_class + left_postfix);
        if (right_postfix) {
          self.click_remove_class(e, move_class + right_postfix);
          S(".left-submenu").removeClass(move_class + left_postfix);
        }
        $(".right-off-canvas-toggle").attr("aria-expanded", "true");
      }).on("click.fndtn.offcanvas", ".exit-off-canvas", function(e) {
        self.click_remove_class(e, move_class + left_postfix);
        $(".left-off-canvas-toggle").attr("aria-expanded", "false");
        if (right_postfix) {
          self.click_remove_class(e, move_class + right_postfix);
          $(".right-off-canvas-toggle").attr("aria-expanded", "false");
        }
      });
    },
    toggle : function(i, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      if ($off_canvas.is("." + i)) {
        this.hide(i, $off_canvas);
      } else {
        this.show(i, $off_canvas);
      }
    },
    show : function(class_name, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      $off_canvas.trigger("open").trigger("open.fndtn.offcanvas");
      $off_canvas.addClass(class_name);
    },
    hide : function(el, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      $off_canvas.trigger("close").trigger("close.fndtn.offcanvas");
      $off_canvas.removeClass(el);
    },
    click_toggle_class : function(e, context) {
      e.preventDefault();
      var $off_canvas = this.get_wrapper(e);
      this.toggle(context, $off_canvas);
    },
    click_remove_class : function(e, modal) {
      e.preventDefault();
      var $off_canvas = this.get_wrapper(e);
      this.hide(modal, $off_canvas);
    },
    get_settings : function(e) {
      var open_modal = this.S(e.target).closest("[" + this.attr_name() + "]");
      return open_modal.data(this.attr_name(true) + "-init") || this.settings;
    },
    get_wrapper : function(e) {
      var $off_canvas = this.S(e ? e.target : this.scope).closest(".off-canvas-wrap");
      return $off_canvas.length === 0 && ($off_canvas = this.S(".off-canvas-wrap")), $off_canvas;
    },
    reflow : function() {
    }
  };
}(jQuery, window, window.document), function($, window, c, mixed) {
  /**
   * @param {?} str
   * @return {?}
   */
  function getAnimationData(str) {
    /** @type {boolean} */
    var fade = /fade/i.test(str);
    /** @type {boolean} */
    var pop = /pop/i.test(str);
    return {
      animate : fade || pop,
      pop : pop,
      fade : fade
    };
  }
  Foundation.libs.reveal = {
    name : "reveal",
    version : "5.5.0",
    locked : false,
    settings : {
      animation : "fadeAndPop",
      animation_speed : 250,
      close_on_background_click : true,
      close_on_esc : true,
      dismiss_modal_class : "close-reveal-modal",
      bg_class : "reveal-modal-bg",
      bg_root_element : "body",
      root_element : "body",
      open : function() {
      },
      opened : function() {
      },
      close : function() {
      },
      closed : function() {
      },
      bg : $(".reveal-modal-bg"),
      css : {
        open : {
          opacity : 0,
          visibility : "visible",
          display : "block"
        },
        close : {
          opacity : 1,
          visibility : "hidden",
          display : "none"
        }
      }
    },
    init : function(begin, method, options) {
      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
    },
    events : function(type) {
      var self = this;
      var $ = self.S;
      return $(this.scope).off(".reveal").on("click.fndtn.reveal", "[" + this.add_namespace("data-reveal-id") + "]:not([disabled])", function(event) {
        if (event.preventDefault(), !self.locked) {
          var element = $(this);
          var ajax = element.data(self.data_attr("reveal-ajax"));
          if (self.locked = true, typeof ajax === "undefined") {
            self.open.call(self, element);
          } else {
            var url = ajax === true ? element.attr("href") : ajax;
            self.open.call(self, element, {
              url : url
            });
          }
        }
      }), $(c).on("click.fndtn.reveal", this.close_targets(), function(event) {
        if (event.preventDefault(), !self.locked) {
          var settings = $("[" + self.attr_name() + "].open").data(self.attr_name(true) + "-init") || self.settings;
          /** @type {boolean} */
          var e = $(event.target)[0] === $("." + settings.bg_class)[0];
          if (e) {
            if (!settings.close_on_background_click) {
              return;
            }
            event.stopPropagation();
          }
          /** @type {boolean} */
          self.locked = true;
          self.close.call(self, e ? $("[" + self.attr_name() + "].open") : $(this).closest("[" + self.attr_name() + "]"));
        }
      }), $("[" + self.attr_name() + "]", this.scope).length > 0 ? $(this.scope).on("open.fndtn.reveal", this.settings.open).on("opened.fndtn.reveal", this.settings.opened).on("opened.fndtn.reveal", this.open_video).on("close.fndtn.reveal", this.settings.close).on("closed.fndtn.reveal", this.settings.closed).on("closed.fndtn.reveal", this.close_video) : $(this.scope).on("open.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.open).on("opened.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.opened).on("opened.fndtn.reveal", 
      "[" + self.attr_name() + "]", this.open_video).on("close.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.close).on("closed.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.closed).on("closed.fndtn.reveal", "[" + self.attr_name() + "]", this.close_video), true;
    },
    key_up_on : function(scope) {
      var self = this;
      return self.S("body").off("keyup.fndtn.reveal").on("keyup.fndtn.reveal", function(event) {
        var open_modal = self.S("[" + self.attr_name() + "].open");
        var settings = open_modal.data(self.attr_name(true) + "-init") || self.settings;
        if (settings && event.which === 27 && settings.close_on_esc && !self.locked) {
          self.close.call(self, open_modal);
        }
      }), true;
    },
    key_up_off : function(scope) {
      return this.S("body").off("keyup.fndtn.reveal"), true;
    },
    open : function(target, data) {
      var modal;
      var self = this;
      if (target) {
        if (typeof target.selector !== "undefined") {
          modal = self.S("#" + target.data(self.data_attr("reveal-id"))).first();
        } else {
          modal = self.S(this.scope);
          /** @type {!Object} */
          data = target;
        }
      } else {
        modal = self.S(this.scope);
      }
      var settings = modal.data(self.attr_name(true) + "-init");
      if (settings = settings || this.settings, modal.hasClass("open") && target.attr("data-reveal-id") == modal.attr("id")) {
        return self.close(modal);
      }
      if (!modal.hasClass("open")) {
        var open_modals = self.S("[" + self.attr_name() + "].open");
        if (typeof modal.data("css-top") === "undefined" && modal.data("css-top", parseInt(modal.css("top"), 10)).data("offset", this.cache_offset(modal)), this.key_up_on(modal), modal.trigger("open").trigger("open.fndtn.reveal"), open_modals.length < 1 && this.toggle_bg(modal, true), typeof data === "string" && (data = {
          url : data
        }), typeof data !== "undefined" && data.url) {
          var fn = typeof data.success !== "undefined" ? data.success : null;
          $.extend(data, {
            success : function(id, o, c) {
              if ($.isFunction(fn)) {
                var n = fn(id, o, c);
                if (typeof n === "string") {
                  /** @type {string} */
                  id = n;
                }
              }
              modal.html(id);
              self.S(modal).foundation("section", "reflow");
              self.S(modal).children().foundation();
              if (open_modals.length > 0) {
                self.hide(open_modals, settings.css.close);
              }
              self.show(modal, settings.css.open);
            }
          });
          $.ajax(data);
        } else {
          if (open_modals.length > 0) {
            this.hide(open_modals, settings.css.close);
          }
          this.show(modal, settings.css.open);
        }
      }
      self.S(window).trigger("resize");
    },
    close : function(modal) {
      modal = modal && modal.length ? modal : this.S(this.scope);
      var open_modals = this.S("[" + this.attr_name() + "].open");
      var settings = modal.data(this.attr_name(true) + "-init") || this.settings;
      if (open_modals.length > 0) {
        /** @type {boolean} */
        this.locked = true;
        this.key_up_off(modal);
        modal.trigger("close").trigger("close.fndtn.reveal");
        this.toggle_bg(modal, false);
        this.hide(open_modals, settings.css.close, settings);
      }
    },
    close_targets : function() {
      /** @type {string} */
      var base = "." + this.settings.dismiss_modal_class;
      return this.settings.close_on_background_click ? base + ", ." + this.settings.bg_class : base;
    },
    toggle_bg : function(modal, state, oldState) {
      var settings = modal.data(this.attr_name(true) + "-init") || this.settings;
      var $floor = settings.bg_root_element;
      if (this.S("." + this.settings.bg_class).length === 0) {
        this.settings.bg = $("<div />", {
          "class" : this.settings.bg_class
        }).appendTo($floor).hide();
      }
      /** @type {boolean} */
      var newState = this.settings.bg.filter(":visible").length > 0;
      if (oldState != newState) {
        if (oldState == mixed ? newState : !oldState) {
          this.hide(this.settings.bg);
        } else {
          this.show(this.settings.bg);
        }
      }
    },
    show : function(el, css) {
      if (css) {
        var settings = el.data(this.attr_name(true) + "-init") || this.settings;
        var selector = settings.root_element;
        if (el.parent(selector).length === 0) {
          var layersLi = el.wrap('<div style="display: none;" />').parent();
          el.on("closed.fndtn.reveal.wrapped", function() {
            el.detach().appendTo(layersLi);
            el.unwrap().unbind("closed.fndtn.reveal.wrapped");
          });
          el.detach().appendTo(selector);
        }
        var animData = getAnimationData(settings.animation);
        if (animData.animate || (this.locked = false), animData.pop) {
          /** @type {string} */
          css.top = $(selector).scrollTop() - el.data("offset") + "px";
          var end_css = {
            top : $(selector).scrollTop() + el.data("css-top") + "px",
            opacity : 1
          };
          return setTimeout(function() {
            return el.css(css).animate(end_css, settings.animation_speed, "linear", function() {
              /** @type {boolean} */
              this.locked = false;
              el.trigger("opened").trigger("opened.fndtn.reveal");
            }.bind(this)).addClass("open");
          }.bind(this), settings.animation_speed / 2);
        }
        if (animData.fade) {
          /** @type {string} */
          css.top = $(selector).scrollTop() + el.data("css-top") + "px";
          end_css = {
            opacity : 1
          };
          return setTimeout(function() {
            return el.css(css).animate(end_css, settings.animation_speed, "linear", function() {
              /** @type {boolean} */
              this.locked = false;
              el.trigger("opened").trigger("opened.fndtn.reveal");
            }.bind(this)).addClass("open");
          }.bind(this), settings.animation_speed / 2);
        }
        return el.css(css).show().css({
          opacity : 1
        }).addClass("open").trigger("opened").trigger("opened.fndtn.reveal");
      }
      settings = this.settings;
      return getAnimationData(settings.animation).fade ? el.fadeIn(settings.animation_speed / 2) : (this.locked = false, el.show());
    },
    hide : function(el, css) {
      if (css) {
        var settings = el.data(this.attr_name(true) + "-init") || this.settings;
        var shell = settings.root_element;
        var animData = getAnimationData(settings.animation);
        if (animData.animate || (this.locked = false), animData.pop) {
          var end_css = {
            top : -$(shell).scrollTop() - el.data("offset") + "px",
            opacity : 0
          };
          return setTimeout(function() {
            return el.animate(end_css, settings.animation_speed, "linear", function() {
              /** @type {boolean} */
              this.locked = false;
              el.css(css).trigger("closed").trigger("closed.fndtn.reveal");
            }.bind(this)).removeClass("open");
          }.bind(this), settings.animation_speed / 2);
        }
        if (animData.fade) {
          end_css = {
            opacity : 0
          };
          return setTimeout(function() {
            return el.animate(end_css, settings.animation_speed, "linear", function() {
              /** @type {boolean} */
              this.locked = false;
              el.css(css).trigger("closed").trigger("closed.fndtn.reveal");
            }.bind(this)).removeClass("open");
          }.bind(this), settings.animation_speed / 2);
        }
        return el.hide().css(css).removeClass("open").trigger("closed").trigger("closed.fndtn.reveal");
      }
      settings = this.settings;
      return getAnimationData(settings.animation).fade ? el.fadeOut(settings.animation_speed / 2) : el.hide();
    },
    close_video : function(e) {
      var video = $(".flex-video", e.target);
      var iframe = $("iframe", video);
      if (iframe.length > 0) {
        iframe.attr("data-src", iframe[0].src);
        iframe.attr("src", iframe.attr("src"));
        video.hide();
      }
    },
    open_video : function(e) {
      var bodyObj = $(".flex-video", e.target);
      var iframe = bodyObj.find("iframe");
      if (iframe.length > 0) {
        var data_src = iframe.attr("data-src");
        if (typeof data_src === "string") {
          iframe[0].src = iframe.attr("data-src");
        } else {
          var img_src = iframe[0].src;
          /** @type {string} */
          iframe[0].src = mixed;
          iframe[0].src = img_src;
        }
        bodyObj.show();
      }
    },
    data_attr : function(str) {
      return this.namespace.length > 0 ? this.namespace + "-" + str : str;
    },
    cache_offset : function(modal) {
      var b = modal.show().height() + parseInt(modal.css("top"), 10);
      return modal.hide(), b;
    },
    off : function() {
      $(this.scope).off(".fndtn.reveal");
    },
    reflow : function() {
    }
  };
}(jQuery, window, window.document), function($, window, canCreateDiscussions, isSlidingUp) {
  Foundation.libs.tooltip = {
    name : "tooltip",
    version : "5.5.0",
    settings : {
      additional_inheritable_classes : [],
      tooltip_class : ".tooltip",
      append_to : "body",
      touch_close_text : "Tap To Close",
      disable_for_touch : false,
      hover_delay : 200,
      show_on : "all",
      tip_template : function(selector, content) {
        return '<span data-selector="' + selector + '" id="' + selector + '" class="' + Foundation.libs.tooltip.settings.tooltip_class.substring(1) + '" role="tooltip">' + content + '<span class="nub"></span></span>';
      }
    },
    cache : {},
    init : function(begin, method, options) {
      Foundation.inherit(this, "random_str");
      this.bindings(method, options);
    },
    should_show : function(target, tip) {
      var settings = $.extend({}, this.settings, this.data_options(target));
      return settings.show_on === "all" ? true : this.small() && settings.show_on === "small" ? true : this.medium() && settings.show_on === "medium" ? true : this.large() && settings.show_on === "large" ? true : false;
    },
    medium : function() {
      return matchMedia(Foundation.media_queries.medium).matches;
    },
    large : function() {
      return matchMedia(Foundation.media_queries.large).matches;
    },
    events : function(instance) {
      var self = this;
      var S = self.S;
      self.create(this.S(instance));
      $(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", "[" + this.attr_name() + "]", function(e) {
        var $this = S(this);
        var settings = $.extend({}, self.settings, self.data_options($this));
        /** @type {boolean} */
        var g = false;
        if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && S(e.target).is("a")) {
          return false;
        }
        if (/mouse/i.test(e.type) && self.ie_touch(e)) {
          return false;
        }
        if ($this.hasClass("open")) {
          if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
            e.preventDefault();
          }
          self.hide($this);
        } else {
          if (settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
            return;
          }
          if (!settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
            e.preventDefault();
            S(settings.tooltip_class + ".open").hide();
            /** @type {boolean} */
            g = true;
          }
          if (/enter|over/i.test(e.type)) {
            /** @type {number} */
            this.timer = setTimeout(function() {
              self.showTip($this);
            }, self.settings.hover_delay);
          } else {
            if (e.type === "mouseout" || e.type === "mouseleave") {
              clearTimeout(this.timer);
              self.hide($this);
            } else {
              self.showTip($this);
            }
          }
        }
      }).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", "[" + this.attr_name() + "].open", function(e) {
        return /mouse/i.test(e.type) && self.ie_touch(e) ? false : void(($(this).data("tooltip-open-event-type") != "touch" || e.type != "mouseleave") && ($(this).data("tooltip-open-event-type") == "mouse" && /MSPointerDown|touchstart/i.test(e.type) ? self.convert_to_touch($(this)) : self.hide($(this))));
      }).on("DOMNodeRemoved DOMAttrModified", "[" + this.attr_name() + "]:not(a)", function(a) {
        self.hide(S(this));
      });
    },
    ie_touch : function(e) {
      return false;
    },
    showTip : function($target) {
      var $tip = this.getTip($target);
      return this.should_show($target, $tip) ? this.show($target) : void 0;
    },
    getTip : function($target) {
      var selector = this.selector($target);
      var settings = $.extend({}, this.settings, this.data_options($target));
      /** @type {null} */
      var tip = null;
      return selector && (tip = this.S('span[data-selector="' + selector + '"]' + settings.tooltip_class)), typeof tip === "object" ? tip : false;
    },
    selector : function($target) {
      var id = $target.attr("id");
      var dataSelector = $target.attr(this.attr_name()) || $target.attr("data-selector");
      return (id && id.length < 1 || !id) && typeof dataSelector !== "string" && (dataSelector = this.random_str(6), $target.attr("data-selector", dataSelector).attr("aria-describedby", dataSelector)), id && id.length > 0 ? id : dataSelector;
    },
    create : function($target) {
      var popover = this;
      var settings = $.extend({}, this.settings, this.data_options($target));
      var tip_template = this.settings.tip_template;
      if (typeof settings.tip_template === "string" && window.hasOwnProperty(settings.tip_template)) {
        tip_template = window[settings.tip_template];
      }
      var $component = $(tip_template(this.selector($target), $("<div></div>").html($target.attr("title")).html()));
      var classes = this.inheritable_classes($target);
      $component.addClass(classes).appendTo(settings.append_to);
      if (Modernizr.touch) {
        $component.append('<span class="tap-to-close">' + settings.touch_close_text + "</span>");
        $component.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", function(a) {
          popover.hide($target);
        });
      }
      $target.removeAttr("title").attr("title", "");
    },
    reposition : function(target, tip, classes) {
      var width;
      var nub;
      var nubHeight;
      var h;
      var objPos;
      if (tip.css("visibility", "hidden").show(), width = target.data("width"), nub = tip.children(".nub"), nubHeight = nub.outerHeight(), h = nub.outerHeight(), this.small() ? tip.css({
        width : "100%"
      }) : tip.css({
        width : width || "auto"
      }), objPos = function(obj, width, right, top, size, left) {
        return obj.css({
          top : width || "auto",
          bottom : top || "auto",
          left : size || "auto",
          right : right || "auto"
        }).end();
      }, objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", target.offset().left), this.small()) {
        objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", 12.5, $(this.scope).width());
        tip.addClass("tip-override");
        objPos(nub, -nubHeight, "auto", "auto", target.offset().left);
      } else {
        var left = target.offset().left;
        if (Foundation.rtl) {
          nub.addClass("rtl");
          /** @type {number} */
          left = target.offset().left + target.outerWidth() - tip.outerWidth();
        }
        objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", left);
        tip.removeClass("tip-override");
        if (classes && classes.indexOf("tip-top") > -1) {
          if (Foundation.rtl) {
            nub.addClass("rtl");
          }
          objPos(tip, target.offset().top - tip.outerHeight(), "auto", "auto", left).removeClass("tip-override");
        } else {
          if (classes && classes.indexOf("tip-left") > -1) {
            objPos(tip, target.offset().top + target.outerHeight() / 2 - tip.outerHeight() / 2, "auto", "auto", target.offset().left - tip.outerWidth() - nubHeight).removeClass("tip-override");
            nub.removeClass("rtl");
          } else {
            if (classes && classes.indexOf("tip-right") > -1) {
              objPos(tip, target.offset().top + target.outerHeight() / 2 - tip.outerHeight() / 2, "auto", "auto", target.offset().left + target.outerWidth() + nubHeight).removeClass("tip-override");
              nub.removeClass("rtl");
            }
          }
        }
      }
      tip.css("visibility", "visible").hide();
    },
    small : function() {
      return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
    },
    inheritable_classes : function(target) {
      var settings = $.extend({}, this.settings, this.data_options(target));
      /** @type {!Array<?>} */
      var compareTerms = ["tip-top", "tip-left", "tip-bottom", "tip-right", "radius", "round"].concat(settings.additional_inheritable_classes);
      var type = target.attr("class");
      var classes = type ? $.map(type.split(" "), function(mutationDetail, canCreateDiscussions) {
        return $.inArray(mutationDetail, compareTerms) !== -1 ? mutationDetail : void 0;
      }).join(" ") : "";
      return $.trim(classes);
    },
    convert_to_touch : function($target) {
      var self = this;
      var $tip = self.getTip($target);
      var settings = $.extend({}, self.settings, self.data_options($target));
      if ($tip.find(".tap-to-close").length === 0) {
        $tip.append('<span class="tap-to-close">' + settings.touch_close_text + "</span>");
        $tip.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose", function(a) {
          self.hide($target);
        });
      }
      $target.data("tooltip-open-event-type", "touch");
    },
    show : function($target) {
      var $tip = this.getTip($target);
      if ($target.data("tooltip-open-event-type") == "touch") {
        this.convert_to_touch($target);
      }
      this.reposition($target, $tip, $target.attr("class"));
      $target.addClass("open");
      $tip.fadeIn(150);
    },
    hide : function($target) {
      var $tip = this.getTip($target);
      $tip.fadeOut(150, function() {
        $tip.find(".tap-to-close").remove();
        $tip.off("click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose");
        $target.removeClass("open");
      });
    },
    off : function() {
      var self = this;
      this.S(this.scope).off(".fndtn.tooltip");
      this.S(this.settings.tooltip_class).each(function(c) {
        $("[" + self.attr_name() + "]").eq(c).attr("title", $(this).text());
      }).remove();
    },
    reflow : function() {
    }
  };
}(jQuery, window, window.document), function(module) {
  var storage;
  var testpage1 = {};
  var fbSubscribeEventFunctions = {};
  try {
    storage = localStorage;
  } catch (e) {
  }
  var value;
  if (storage && storage.getItem) {
    value = storage.getItem("__browser_id__");
  } else {
    /** @type {(Array<string>|null)} */
    value = document.cookie.match(/browser_id=(id\d+\.\d+);/);
    if (value) {
      /** @type {string} */
      value = value[1];
    }
  }
  if (!value) {
    /** @type {string} */
    value = "id" + Date.now() + Math.random();
    if (storage && storage.setItem) {
      storage.setItem("__browser_id__", value);
    }
  }
  /** @type {string} */
  document.cookie = "browser_id=" + value;
  module.TrinketIO = {
    "export" : function(op, b) {
      var keys = op.split(".");
      var a = keys.pop();
      var output = testpage1;
      /** @type {number} */
      var i = 0;
      for (; i < keys.length; i++) {
        if (output[keys[i]] == null) {
          output[keys[i]] = {};
        }
        output = output[keys[i]];
      }
      if (output[a]) {
        throw new Error("Module " + op + " has already been defined!");
      }
      return output[a] = b, b;
    },
    "import" : function(moduleId) {
      var overlap = moduleId.split(".");
      var output = testpage1;
      /** @type {number} */
      var i = 0;
      for (; i < overlap.length; i++) {
        if (output = output[overlap[i]], output == null) {
          throw new Error("Module " + moduleId + " could not be found!");
        }
      }
      return output;
    },
    runtime : function(name, callback) {
      return arguments.length > 1 && (fbSubscribeEventFunctions[name] = callback), fbSubscribeEventFunctions[name];
    },
    clearRuntime : function() {
      fbSubscribeEventFunctions = {};
    }
  };
}(window), function(options) {
  window.trinketConfig = {
    get : function(key) {
      return options[key];
    },
    planName : function(name) {
      var permissions = this.get("plans");
      return _.find(permissions, name)[name];
    },
    prefix : function(prefix, key) {
      if (prefix.charAt(0) !== "/" && (prefix = "/" + prefix), options.testing) {
        return prefix;
      }
      if (typeof key === "undefined") {
        var DescriptorKeys = prefix.match(/\/(\w+)\//);
        if (DescriptorKeys) {
          key = DescriptorKeys[1];
        }
      }
      return key && options.prefixes[key] ? "/" + options.prefixes[key] + prefix : "/" + options.cachePrefix + Date.now() + prefix;
    },
    component : function(key, scope) {
      return [options.vendorHost, key, options.components[key], scope].join("/");
    },
    getUrl : function(basePath) {
      return basePath.charAt(0) !== "/" && (basePath = "/" + basePath), options.protocol + "://" + options.apphostname + basePath;
    },
    getClassUrl : function(id, num) {
      /** @type {string} */
      var i = "/" + num;
      return options.usersubdomains ? "//" + id + "." + options.apphostname + i : "/u/" + id + "/classes" + i;
    },
    getPublishedTrinketUrl : function(css, i) {
      /** @type {string} */
      var d = options.usersubdomains ? css + "." + options.apphostname + "/sites/" + i : options.apphostname + "/u/" + css + "/sites/" + i;
      return options.protocol + "://" + d;
    }
  };
}(window.trinket.config), function(metaWindow, exporting) {
  /**
   * @param {string} b
   * @return {?}
   */
  function o(b) {
    return new Function("o", 'return "' + b.replace(/["\n\r\u2028\u2029]/g, function(wikiId) {
      return subwikiListsCache[wikiId];
    }).replace(/\{\{([\s\S]+?)\}\}/g, '" + (o["$1"] !== undefined ? o["$1"] : "") + "') + '";');
  }
  /**
   * @param {string} key
   * @param {number} data
   * @return {?}
   */
  function add(key, data) {
    return URLs[key] || (URLs[key] = o($("#" + key).text()), $("#" + key).remove()), URLs[key](data || {});
  }
  var subwikiListsCache = {
    "\n" : "\\n",
    '"' : '\\"',
    "\u2028" : "\\u2028",
    "\u2029" : "\\u2029"
  };
  var URLs = {};
  /** @type {function(string): ?} */
  add.compile = o;
  exporting["export"]("utils.template", add);
}(window, window.TrinketIO), function(window, exporting) {
  /**
   * @return {?}
   */
  function clone() {
    return +new Date;
  }
  /**
   * @param {!Object} selector
   * @return {?}
   */
  function $(selector) {
    return s + selector;
  }
  /**
   * @param {!Object} key
   * @return {?}
   */
  function concatKey(key) {
    return _listen_ + key;
  }
  /**
   * @param {!Object} key
   * @param {number} size
   * @return {?}
   */
  function get(key, size) {
    /** @type {number} */
    var i = parseInt(obj.getItem(concatKey(key)), 10);
    return i && i < (size || clone()) ? true : false;
  }
  /**
   * @param {!Object} key
   * @param {number} value
   * @param {number} type
   * @return {?}
   */
  function set(key, value, type) {
    if (obj && key) {
      var vkey = concatKey(key);
      if (type) {
        /** @type {number} */
        var x = 1e3 * type;
        obj.setItem(vkey, clone() + x);
      } else {
        obj.removeItem(vkey);
      }
      return value = JSON.stringify(value), obj.setItem($(key), value);
    }
  }
  /**
   * @param {!Object} key
   * @return {?}
   */
  function getData(key) {
    if (!obj || !key) {
      return null;
    }
    if (get(key)) {
      return remove(key), null;
    }
    var _data = obj.getItem($(key));
    if (_data) {
      try {
        return JSON.parse(_data);
      } catch (c) {
        return null;
      }
    }
    return _data;
  }
  /**
   * @param {!Object} key
   * @return {undefined}
   */
  function remove(key) {
    if (obj && key) {
      obj.removeItem(concatKey(key));
      obj.removeItem($(key));
    }
  }
  /**
   * @return {undefined}
   */
  function drawGraph() {
    if (obj) {
      var key;
      var length;
      var x = obj.length;
      /** @type {string} */
      var query = s;
      var value = clone();
      /** @type {number} */
      length = 0;
      for (; x > length; length++) {
        key = obj.key(length);
        if (key && key.indexOf(query) === 0) {
          key = key.substr(query.length);
          if (get(key, value)) {
            remove(key);
          }
        }
      }
    }
  }
  /** @type {string} */
  var s = "__trinket__";
  /** @type {string} */
  var _listen_ = "__trinket_expire__";
  var obj = function() {
    try {
      return window.localStorage.setItem(s, ""), window.localStorage.getItem(s), window.localStorage.removeItem(s), window.localStorage;
    } catch (b) {
    }
  }();
  exporting["export"]("utils.cache", {
    get : getData,
    set : set,
    remove : remove,
    purge : drawGraph
  });
}(window, window.TrinketIO), $("document").ready(function() {
  /**
   * @param {string} name
   * @return {?}
   */
  function dispatch(name) {
    return window.location.protocol + "//" + window.location.hostname + name;
  }
  /**
   * @param {string} audio
   * @return {?}
   */
  function done(audio) {
    var target;
    var targets;
    var name;
    var outdated;
    var i;
    var chunk = audio.split("=");
    /** @type {string} */
    var result = "";
    /** @type {boolean} */
    var j = false;
    if ((this.getType() === "console" || (this.getType() === "python3" || this.getType() === "python") && this._queryString.runMode === "console") && (j = true), chunk[0] === "code" && chunk[1]) {
      if (result = decodeURIComponent(chunk[1]), this.getType() === "java" && (outdated = result.match(/^----\{(\w[\w\.\-]*)\}----\n/), outdated && (name = outdated[1], result = result.substring(result.indexOf("\n") + 1))), target = /\n----\{(\w[\w\.\-]*)\}----\n/, targets = result.split(target), targets.length > 1 || name) {
        if (name = name || this.getMainFile()) {
          /** @type {!Array} */
          result = [{
            name : name,
            content : targets.shift()
          }];
          if (j) {
            result[0].content = filter(result[0].content);
          }
          /** @type {number} */
          i = 0;
          for (; i < targets.length; i = i + 2) {
            result.push({
              name : targets[i],
              content : typeof targets[i + 1] !== "undefined" && targets[i + 1].length ? targets[i + 1] : ""
            });
          }
          /** @type {string} */
          result = JSON.stringify(result);
        }
      } else {
        if (j) {
          result = filter(result);
        }
      }
    }
    return result;
  }
  /**
   * @param {string} input
   * @return {?}
   */
  function filter(input) {
    var p;
    var item;
    var dayEle;
    var msg;
    return /^>>>/.test(input) && (p = [], item = input.split("\n"), item.forEach(function(a) {
      if (dayEle = /^(>>>|\.\.\.) /.exec(a)) {
        msg = a.substring(4, a.length);
        if (dayEle[1] === "...") {
          p[p.length - 1] += "\\n" + msg;
        } else {
          if (typeof msg !== "undefined" && msg.length) {
            p.push(msg);
          }
        }
      }
    }), input = p.join("\n")), input;
  }
  /**
   * @param {!Object} val
   * @return {?}
   */
  function fn(val) {
    if (typeof val === "undefined" || val === null) {
      return null;
    }
    if (val instanceof Array) {
      /** @type {number} */
      var i = 0;
      for (; i < val.length; i++) {
        val[i] = fn(val[i]);
      }
    } else {
      if (typeof val === "object") {
        for (i in val) {
          if (val.hasOwnProperty(i)) {
            val[i] = fn(val[i]);
          }
        }
      } else {
        if (typeof val === "string") {
          val = _.unescape(val);
        }
      }
    }
    return val;
  }
  /**
   * @return {?}
   */
  function getSearchTerms() {
    var data = {};
    if (window.location.search) {
      /** @type {!Array<string>} */
      var paramsSplit = window.location.search.substr(1).split("&");
      /** @type {number} */
      var i = 0;
      for (; i < paramsSplit.length; i++) {
        /** @type {!Array<string>} */
        var match = paramsSplit[i].split("=");
        if (match[0] && typeof match[1] !== "undefined") {
          /** @type {string} */
          data[match[0]] = decodeURIComponent(match[1].replace(/\+/g, " "));
          if (data[match[0]] === "true") {
            /** @type {boolean} */
            data[match[0]] = true;
          }
          if (data[match[0]] === "false") {
            /** @type {boolean} */
            data[match[0]] = false;
          }
        }
      }
    }
    return data;
  }
  /**
   * @param {!Object} options
   * @param {?} proc
   * @return {undefined}
   */
  function f(options, proc) {
    if (proc) {
      config.clearRuntime();
    }
    /** @type {!Array<string>} */
    var c = Object.keys(options);
    c.forEach(function(prop) {
      config.runtime(prop, options[prop]);
    });
  }
  /**
   * @param {string} url
   * @param {?} that
   * @return {?}
   */
  function initialize(url, that) {
    return function(event, template, e) {
      var def = template ? $(template).serialize() : $("#accountForm").serialize();
      var deferred = template || "#accountForm";
      event.stopPropagation();
      event.preventDefault();
      $.ajax({
        type : "POST",
        url : url,
        data : def,
        success : $.proxy(that.onLoginComplete, that, deferred),
        dataType : "json"
      });
      that.sendInterfaceAnalytics(this, e);
    };
  }
  /**
   * @param {?} url
   * @param {string} filename
   * @param {!Document} zip
   * @return {?}
   */
  function deferredAddZip(url, filename, zip) {
    var d = $.Deferred();
    return JSZipUtils.getBinaryContent(url, function(cancelError, data) {
      if (cancelError) {
        d.reject(cancelError);
      } else {
        zip.file(filename, data, {
          binary : true
        });
        d.resolve(data);
      }
    }), d;
  }
  /**
   * @param {!Object} a
   * @param {!Object} b
   * @return {undefined}
   */
  function init(a, b) {
    var h;
    var j;
    var self = this;
    /** @type {!Array} */
    var props = ["on", "off", "trigger", "once"];
    var l = $("body").data("view-only");
    self._timing = {
      t0 : performance.now()
    };
    self._varProxy = {};
    this._$ = $(this);
    /** @type {number} */
    var i = 0;
    for (; i < props.length; i++) {
      var name = props[i];
      this[name] = $.proxy(this._$[name], this._$);
    }
    if (this.$shareModal = $("#shareModal"), this.$shareUrl = $("#shareUrl"), this.$embedModal = $("#embedModal"), this.$embedCode = $("#embedCode"), this.$emailModal = $("#emailModal"), this.$overlay = $("#content-overlay"), this.$resetModal = $("#confirmResetModal"), this.$upgradeModal = $("#upgradeModal"), this.$draftMessage = $("#draftMessage"), this.assignment = $("body").data("assignment"), this.assignmentFeedback = $("body").data("assignment-feedback"), this.assignmentViewOnly = $("body").data("view-only"), 
    config.runtime("mission-zero", $("body").data("mission-zero") || false), this.$responsiveIndicators = $(".responsive-indicator"), $(document).on("click touchstart", ".menu-button", function(event) {
      var a = $(this).data("action");
      /** @type {string} */
      var fullName = "trinket." + a;
      if (!$(this).hasClass("disabled")) {
        if (event.type === "touchstart") {
          $(this).addClass("touched");
        } else {
          if (event.type === "click" && $(this).hasClass("touched")) {
            return void $(this).removeClass("touched");
          }
        }
        $(this).trigger(fullName, {
          action : a,
          data : $(this).data("data")
        });
        if (!$(this).data("no-analytics")) {
          self.sendInterfaceAnalytics(this);
        }
      }
    }), $(document).on("trinket.sharing.share", $.proxy(this.onShareClick, this)), $(document).on("trinket.sharing.embed", $.proxy(this.onEmbedClick, this)), $(document).on("trinket.sharing.email", $.proxy(this.onEmailClick, this)), $(document).on("trinket.group.post", $.proxy(this.onGroupPostClick, this)), $(document).on("trinket.group.submit", $.proxy(this.onGroupSubmitClick, this)), $(document).on("trinket.library.add", $.proxy(this.onSaveClick, this)), $(document).on("trinket.code.save", $.proxy(this.onUpdateClick, 
    this)), $(document).on("trinket.code.fontsize", $.proxy(this.onFontSizeClick, this)), $(document).on("trinket.view.gallery", $.proxy(this.onGalleryClick, this)), $(document).on("trinket.mode.fullscreen", $.proxy(this.onFullScreenClick, this)), $(document).on("trinket.mode.download", $.proxy(this.onDownloadClick, this)), $(document).on("trinket.mode.upload", $.proxy(this.onUploadClick, this)), $(document).on("trinket.menu.upgrade", $.proxy(this.onUpgradeClick, this)), $(document).on("trinket.open.link", 
    $.proxy(this.onLinkClick, this)), $(document).on("trinket.code.reset", function() {
      self.$resetModal.foundation("reveal", "open");
    }), $(document).on("trinket.code.confirm-reset", $.proxy(this.onResetClick, this)), $(document).on("trinket.code.cancel-reset", function() {
      self.$resetModal.foundation("reveal", "close");
    }), $(document).on("trinket.code.settings", function() {
      $("#settingsModal").foundation("reveal", "open");
    }), $(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", function(a) {
      var width = $(".trinket-content-wrapper").width();
      var boundswidth = $("#editor").width();
      if (boundswidth > width) {
        $("#editor").css("width", 0.5 * width);
      }
    }), $(document).on("trinket.sharing.social", function(a, b) {
      var pixelMax;
      /** @type {boolean} */
      var d = false;
      if ($(b.data).click(), d) {
        var ext = {};
        var opts = self.serialize();
        /**
         * @return {undefined}
         */
        var e = function() {
        };
        opts.shortCode = self._trinket.shortCode;
        opts._timestamp = pixelMax;
        if (self._trinket.id) {
          self.fork(self._trinket, opts, ext, e);
        } else {
          self.create(opts, ext, e);
        }
      }
    }), $(document).on("trinket.account.login", initialize("/users/login", this)), $("#brand").click($.proxy(this.onLogoClick, this)), $("#shareUrl").click($.proxy(this.onShareFocus, this)), $("#embedCode").click($.proxy(this.onEmbedFocus, this)), $(document).on("change", "input[data-trinket-settings]", $.proxy(this.settingsChange, this)), config.runtime("settingsModified", false), BDA.init(), $("#version-toggle").change(function() {
      if ($(this).is(":checked")) {
        self.reset(self._original);
        self._viewingOriginal(false);
        $(".menu-button").not(".allow-original").removeClass("disabled");
      } else {
        $.extend(true, self._original, self.serialize());
        self.reset(self._original.original);
        self._viewingOriginal(true);
        $(".menu-button").not(".allow-original").addClass("disabled");
        $(".revert-remix").removeClass("disabled");
      }
    }), this._notification_open = false, $("#notification-container").click($.proxy(this.onNotificationClick, this)), this._currentMode = "", this._updates = {}, this._original = fn(a), this._viewingDraft = false, this._predraft = $.extend(true, {}, this._original), b) {
      if (this._original_draft = fn(b), ["code", "assets", "settings"].forEach(function(key) {
        if (self._original_draft[key]) {
          self._original[key] = self._original_draft[key];
          /** @type {boolean} */
          self._viewingDraft = true;
          if (key === "settings") {
            f(self._original_draft[key] || {});
          }
        }
      }), this._viewingDraft) {
        var ret = cb("draftTextTemplate", {
          draftText : "Viewing Draft"
        });
        this.$draftMessage.html(ret);
        $(".save-it").removeClass("disabled");
      }
    } else {
      f(this._original.settings || {});
    }
    if (this._queryString = getSearchTerms(), window.location.hash) {
      /** @type {string} */
      var pageURL = window.location.href;
      var args = done.call(this, pageURL.substr(pageURL.indexOf("#") + 1));
      if (args) {
        this._original.code = args;
      }
    }
    this.setTrinket(this._original);
    try {
      window.sessionStorage;
    } catch (w) {
      /** @type {boolean} */
      this._queryString.noStorage = true;
    }
    if (this._queryString.clearStorage) {
      this.generateGUID();
      try {
        if (window.sessionStorage) {
          window.sessionStorage.removeItem(this.guid);
        }
        store.remove(this.guid);
      } catch (w) {
      }
    }
    if (!(this._queryString.noStorage || this._queryString.outputOnly)) {
      this.generateGUID();
      if (this._queryString.autoRestore !== false && window.sessionStorage && window.sessionStorage.getItem(this.guid)) {
        this._trinket.code = window.sessionStorage.getItem(this.guid);
        if (window.parent) {
          window.parent.postMessage("autorestored", "*");
        }
      } else {
        if (this._previousSession = store.get(this.guid)) {
          store.remove(this.guid);
          if (this._queryString.autoRestore !== false) {
            this._trinket.code = this._previousSession;
            if (window.parent) {
              window.parent.postMessage("autorestored", "*");
            }
          } else {
            self.showRestoreMessage();
          }
        }
      }
    }
    this.setUI();
    if (this.getType() !== "console" && this.getUIType() !== "guest" && !this.assignment && !l && this._original && this._original.id) {
      /** @type {boolean} */
      h = true;
    }
    if (this.assignment && !l) {
      /** @type {boolean} */
      j = true;
    }
    if (h) {
      $(this).on("trinket.code.change", _.debounce(function() {
        $(".save-it").removeClass("disabled");
        self.updateDraft();
      }, trinket.config.draftDebounce));
    } else {
      if (j) {
        $(this).on("trinket.code.change", _.debounce(function() {
          $(".save-it").removeClass("disabled");
          self.autoSave();
        }, trinket.config.autosaveDebounce));
      } else {
        $(this).on("trinket.code.change", _.debounce(function() {
          self.updateSessionCache();
        }, 500));
      }
    }
    if (!this._queryString.externalInit) {
      this.initialize(this._trinket);
    }
    this.toggleUI(this.getUIType());
    $(document).keydown(function(event) {
      if (self.hasOverlay && event.keyCode === 27) {
        self.hideAll();
      }
    });
    $(document).foundation({
      offcanvas : {
        close_on_click : true
      },
      dropdown : {
        active_class : "open"
      }
    });
    $(".left-off-canvas-toggle, .right-off-canvas-toggle").on("click", function() {
    });
    $(document).on("close.fndtn.alert", function(a) {
      $("body").removeClass("has-status-bar");
    });
    this.setFontSize(this._queryString.font || "1em");
    /** @type {string} */
    this.parsedInstructions = "";
    $(document).on("click", "#edit-instructions-link", $.proxy(this.onEditInstructionsClick, this));
    $(document).on("click", "#cancel-edit-instructions", $.proxy(this.onCancelEditInstructionsClick, this));
    $(document).on("click", "#save-instructions", $.proxy(this.onSaveInstructionsClick, this));
    /** @type {number} */
    self.serversideTimeoutDelay = self.hasPremiumTrinkets() ? 6e5 : 18e4;
  }
  /**
   * @param {string} m
   * @param {!Function} s
   * @param {!Function} c
   * @param {string} type
   * @return {undefined}
   */
  function show(m, s, c, type) {
    var path = cb("statusMessageTemplate", {
      type : type || "success",
      message : m
    });
    var f = $(path);
    $("body").addClass("has-status-bar").append(f);
    if (s) {
      f.find(".yep").on("click", s);
    }
    if (c) {
      f.find(".nope").on("click", c);
    }
    $(document).foundation("alert", "reflow");
  }
  /**
   * @param {?} data
   * @param {string} e
   * @param {string} type
   * @return {?}
   */
  function render(data, e, type) {
    /** @type {boolean} */
    var sources = false;
    /** @type {!RegExp} */
    var c = new RegExp("\\." + type);
    /** @type {!RegExp} */
    var f = new RegExp("import\\s*" + e);
    /** @type {!RegExp} */
    var g = new RegExp("from\\s*" + e + "\\s*import");
    return _.map(data, function(a, b) {
      if (b.match(c) && (a.match(f) || a.match(g))) {
        /** @type {boolean} */
        sources = true;
      }
    }), sources;
  }
  var editor;
  var $ = window.jQuery;
  var config = window.TrinketIO;
  /** @type {number} */
  var versions = 1728e3;
  var store = config["import"]("utils.cache");
  var cb = config["import"]("utils.template");
  var _this = config["import"]("utils.selectText");
  var BDA = config["import"]("trinket.share");
  var $rootScope = config["import"]("trinket.roles");
  var link = typeof trinketMarkdown !== "undefined" ? trinketMarkdown({}) : void 0;
  store.purge();
  /**
   * @return {?}
   */
  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    return $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          /** @type {!Array} */
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || "");
      } else {
        o[this.name] = this.value || "";
      }
    }), o;
  };
  if ($.extend(init.prototype, {
    showRestoreMessage : function() {
      var result_code;
      var mode;
      var msg;
      var that = this;
      /** @type {string} */
      mode = 'Do you want to restore your last session? <a title="restore the previous session" data-action="code.restore" class="text-link yep"><i class="fa fa-check"></i>&nbsp;Restore</a>&nbsp;&nbsp;or&nbsp;&nbsp;<a class="text-link nope"><i class="fa fa-trash"></i>&nbsp;Discard</a>';
      /** @type {string} */
      msg = '<i class="fa fa-check-circle-o"></i>&nbsp;Your session has been restored. <a class="text-link yep"><i class="fa fa-thumbs-o-up">&nbsp;</i>Accept</a>&nbsp;&nbsp;or&nbsp;&nbsp;<a class="text-link nope"><i class="fa fa-undo"></i>&nbsp;Undo</a>';
      show(mode, function() {
        $("#statusMessages .close").click();
        result_code = that._trinket.code;
        that._trinket.code = that._previousSession;
        that.reset(that._trinket);
        $(that).trigger("trinket.code.change");
        show(msg, function() {
          $("#statusMessages .close").click();
        }, function() {
          $("#statusMessages .close").click();
          that._trinket.code = result_code;
          that.reset(that._trinket);
          $(that).trigger("trinket.code.change");
          that.showRestoreMessage();
        });
      }, function() {
        $("#statusMessages .close").click();
      });
    },
    initialize : function(editor) {
      throw new Error("initialize is not implemented");
    },
    generateGUID : function() {
      var email;
      if (!this.guid) {
        email = (this._trinket.id || JSON.stringify(this._trinket)) + (document.referrer || document.location);
        this.guid = CryptoJS.MD5(email).toString(CryptoJS.enc.Hex);
      }
    },
    getTour : function() {
      return [];
    },
    startTour : function() {
      this.tour = this.getTour();
      if (this.tour && this.tour.length) {
        this.nextStop();
      }
    },
    nextStop : function() {
      var _len1;
      var opts = this;
      var child = opts.tour;
      var children = child ? child.shift() : null;
      if (prepareStop = function(obj, item) {
        $(obj).addClass("attention");
        $(document).one("trinket." + item, function() {
          $(obj).removeClass("attention");
          if (--_len1 === 0) {
            opts.nextStop();
          }
        });
      }, children) {
        if (!(children instanceof Array)) {
          /** @type {!Array} */
          children = [children];
        }
        _len1 = children.length;
        /** @type {number} */
        var i = 0;
        for (; i < children.length; i++) {
          prepareStop(children[i].el, children[i].event);
        }
      }
    },
    onFontSizeClick : function(requestWaterMask, f) {
      this.setFontSize(f && f.data);
    },
    onFullScreenClick : function(event, tempalte) {
      /** @type {!HTMLDocument} */
      var doc = document;
      /** @type {!Element} */
      var element = doc.documentElement;
      /** @type {function(this:Element): undefined} */
      var matchesImpl = element.requestFullscreen || element.msRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
      /** @type {function(this:Document): undefined} */
      var _origCreateElement = doc.exitFullscreen || doc.msExitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen;
      try {
        if (!matchesImpl || doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement) {
          if (!_origCreateElement) {
            throw new Error("fullscreen unavailable");
          }
          _origCreateElement.call(doc);
          this.sendInterfaceAnalytics(event.target, {
            data : "exit"
          });
        } else {
          matchesImpl.call(element);
          this.sendInterfaceAnalytics(event.target, {
            data : "enter"
          });
        }
      } catch (g) {
        if (confirm("Your browser does not support fullscreen mode. Would you like to open this trinket in a new window?")) {
          /** @type {string} */
          var s = window.location.href;
          if (this.isModified()) {
            var p2 = "code=" + window.encodeURIComponent(this.getValue());
            /** @type {string} */
            s = s.indexOf("#") > 0 ? s.replace(s.substr(s.indexOf("#") + 1), p2) : s + "#" + p2;
          }
          window.open(s);
        }
      }
    },
    onDownloadClick : function(type, e) {
      var url;
      var f;
      var filename;
      var that = this.downloadable();
      var nodeClazz = this;
      var zip = new JSZip;
      /** @type {!Array} */
      var deferreds = [];
      $.each(that.assets, function(a, b) {
        url = /^data:image/.test(b.url) ? b.url : $("#proxy").val() + "/" + b.url;
        deferreds.push(deferredAddZip(url, b.name, zip));
      });
      $.when.apply($, deferreds).done(function() {
        for (f in that.files) {
          zip.file(f, that.files[f]);
        }
        filename = nodeClazz.getTrinketIdentifier();
        if (nodeClazz._trinket && nodeClazz._trinket.name) {
          /** @type {string} */
          filename = nodeClazz._trinket.name + "-" + filename;
        }
        /** @type {string} */
        filename = "Trinket Download-" + filename + ".zip";
        (new JSZip.external.Promise(function(saveNotifs, obtainGETData) {
          if (config.runtime("downloadExtra")) {
            var url = $("#proxy").val() + "/" + config.runtime("downloadExtra");
            JSZipUtils.getBinaryContent(url, function(val, notifications) {
              if (val) {
                obtainGETData(val);
              } else {
                saveNotifs(notifications);
              }
            });
          } else {
            saveNotifs();
          }
        })).then(function(data) {
          return data ? zip.loadAsync(data) : void 0;
        }).then(function() {
          zip.generateAsync({
            type : "blob"
          }).then(function(data) {
            saveAs(data, filename);
          }, function(a) {
            throw new Error("Could not generate download.");
          });
        });
      }).done(function() {
        nodeClazz.callAnalytics("Interaction", "Click", "Download");
        if (render(that.files, "sense_hat", "py")) {
          nodeClazz.callAnalytics("Sense Hat Event", "Click", "Download");
        }
      }).fail(function(items) {
        show(items, function() {
          $("#statusMessages .close").click();
        }, function() {
          $("#statusMessages .close").click();
        }, "alert");
      });
    },
    onUpgradeClick : function(a, b) {
      this.$upgradeModal.foundation("reveal", "open");
    },
    onLinkClick : function(event) {
      event.preventDefault();
      window.open(dispatch($(event.target).data("href")));
    },
    setFontSize : function(value) {
      $(".trinket-content-wrapper").children().css("font-size", value || "1em");
    },
    setUI : function() {
      this._userId = $("#user").val();
      if (this._userId) {
        if (this._trinket && this._trinket._owner === this._userId) {
          /** @type {string} */
          this._ui = "owner";
        } else {
          if (this._queryString.inLibrary) {
            /** @type {string} */
            this._ui = "library";
          } else {
            /** @type {string} */
            this._ui = "user";
          }
        }
      } else {
        /** @type {string} */
        this._ui = "guest";
      }
    },
    toggleUI : function(event) {
      var callback = this;
      var rc = cb(event + "MenuTemplate");
      $("#userMenu").empty().append(rc).foundation();
      if (event === "guest") {
        $("#login").click(initialize("/api/users/login", callback));
      }
      $(".ui-option").addClass("hide").filter("." + event + "-option").removeClass("hide");
    },
    getUIType : function() {
      return this._ui;
    },
    getUserId : function() {
      return this._userId;
    },
    hasPermission : function() {
      /** @type {!Array<?>} */
      var cmd_args = Array.prototype.slice.call(arguments);
      return $rootScope.hasPermission.apply(this, cmd_args);
    },
    hasRole : function() {
      /** @type {!Array<?>} */
      var cmd_args = Array.prototype.slice.call(arguments);
      return $rootScope.hasRole.apply(this, cmd_args);
    },
    hasPremiumTrinkets : function() {
      return this.hasRole("trinket-connect") || this.hasRole("trinket-codeplus");
    },
    triggerChange : function() {
      $(document).trigger("trinket.code.change");
      this.trigger("trinket.code.change");
      if (this.assignment && window.parent) {
        window.parent.postMessage(this.serialize(), "*");
      }
    },
    onLoginComplete : function(client, data, callback, error) {
      var Model = this;
      if (data && data.status === "success") {
        var req = $(client + ' input[name="email"]').val();
        window.TrinketIO["import"]("debug.sessions").onLogin(req, data.data);
        /** @type {string} */
        this._ui = data.data.id === this._trinket._owner ? "owner" : "user";
        this.toggleUI(this._ui);
        $(document).trigger("trinket.account.success");
        $("body").append("<input id='roles' type='hidden' value='" + data.data.roles + "'>");
        if (this.getType() !== "console" && this.getUIType() !== "guest" && this._original && this._original.id) {
          $(this).off("trinket.code.change");
          $(this).on("trinket.code.change", _.debounce(function() {
            $(".save-it").removeClass("disabled");
            Model.updateDraft();
          }, 1e3));
        }
        /** @type {string} */
        var message = "create-" + this.getType() + "-trinket";
        /** @type {boolean} */
        var h = this.hasPermission(message) ? false : true;
        if (this._ui === "owner") {
          $("a.create-remix").data("action", "code.submit");
          $("a.create-remix").attr("title", "");
          $("a.create-remix").find("i").removeClass().addClass("fa fa-save");
          $("a.create-remix").find("label").html("Save");
        } else {
          if (!h) {
            $("a.create-remix").data("action", "library.add");
          }
        }
        if (!h) {
          $("a.create-copy").data("action", "library.add");
          $("a.save-remix").data("action", "library.add");
          $("a.revert-remix").data("action", "library.add");
        }
      } else {
        if (data && data.flash && data.flash.validation) {
          $(client + " .message").addClass("error").text(data.flash.validation.email || data.flash.validation.password);
        } else {
          if (data && data.flash && data.flash.duplicates) {
            $(client + " .message").addClass("error").text("This email is already registered; try logging in.");
          } else {
            if (data && data.message) {
              $(client + " .message").addClass("error").text(data.message);
            } else {
              $(client + " .message").addClass("error").text("We were unable to log you in; please try again later.");
            }
          }
        }
      }
    },
    updateSessionCache : function() {
      var me = this;
      var status = me.getValue();
      if (status === me._original.code) {
        try {
          if (window.sessionStorage) {
            window.sessionStorage.removeItem(me.guid);
          }
          store.remove(me.guid);
        } catch (c) {
        }
      } else {
        try {
          if (window.sessionStorage) {
            window.sessionStorage.setItem(me.guid, status);
          }
          store.set(me.guid, status, versions);
        } catch (c) {
        }
      }
    },
    updateDraft : function() {
    },
    _updateDraft : function() {
      var a;
      var b;
      var c = this;
    },
    discardDraft : function(event) {
    },
    discardDraftSettings : function() {
    },
    _viewingOriginal : function(isIron) {
      return void 0 !== isIron && (this._viewingOriginalFlag = !!isIron, isIron ? $("body").addClass("viewing-original") : $("body").removeClass("viewing-original")), this._viewingOriginalFlag;
    },
    autoSave : function() {
    },
    onSaveClick : function() {
      /** @type {number} */
      var input = Date.now();
      $("body").addClass("saving");
      /**
       * @return {?}
       */
      var next = function() {
        /** @type {number} */
        var delta = Date.now() - input;
        return delta < 750 ? window.setTimeout(next, 750 - delta) : void $("body").removeClass("saving");
      };
      if (this._original && this._original.id) {
        if (this._viewingOriginal()) {
          this.restore(next);
        } else {
          if (this._original.original) {
            this.save(void 0, next);
          } else {
            this.remix(next);
          }
        }
      } else {
        this.addToLibrary(next);
      }
    },
    keys : function() {
      return this._keys || (this._keys = {
        code : 1,
        assets : 1,
        settings : 1
      });
    },
    restore : function(next) {
      var tmpCollection = this;
      var respond = cb("restoreOriginalModalTemplate", {});
      var container = $(respond);
      remix = this._original;
      original = remix.original;
      $("body").append(container);
      container.foundation("reveal", "open");
      container.on("close.fndtn.reveal", function() {
        next();
      });
      container.find(".button").click(function() {
        var name;
        var d;
        var action = $(this).data("action");
        var data = {};
        if (action === "confirm") {
          container.off("close.fndtn.reveal");
          for (name in tmpCollection.keys()) {
            data[name] = original[name];
            if (name === "code") {
              /** @type {*} */
              d = JSON.parse(data[name]);
              d = d.map(function(tenantNetwork) {
                return _.omit(tenantNetwork, "comments");
              });
              /** @type {string} */
              data[name] = JSON.stringify(d);
            }
          }
          $.extend(true, remix, data);
          $("#version-toggle").prop("checked", true).change();
          window.setTimeout(function() {
            tmpCollection.save(void 0, next);
            tmpCollection.updateSessionCache();
          });
        } else {
          next();
        }
        container.foundation("reveal", "close");
        container.remove();
      });
    },
    remix : function(arg) {
      var self = this;
      self._createCopy("Remix", function(clone) {
        $("body").addClass("has-remix");
        clone.original = self._original;
        self.setTrinket(clone, true);
        self.reset(clone);
        if (typeof arg === "function") {
          arg();
        }
      });
    },
    addToLibrary : function(callback) {
      this._createCopy("Copy", function(key) {
        var ret = cb("statusMessageTemplate", {
          type : "success",
          message : 'A copy of this trinket has been saved for you. View or edit <a class="text-link" href="/library/trinkets/' + key.shortCode + '" target="_blank">your copy here</a>.'
        });
        var err = $(ret);
        $("body").addClass("has-status-bar").append(err);
        err.parent().foundation().trigger("open.fndtn.alert");
        if (callback && typeof callback === "function") {
          callback(key);
        }
      });
    },
    _createCopy : function(name, func) {
      var self = this;
      var argv = self.serialize({
        removeComments : true
      });
      var ext = {
        library : true
      };
      var newVersion = self._original && self._original.id;
      /**
       * @param {?} x1
       * @return {undefined}
       */
      var update = function(x1) {
        self.$overlay.addClass("hide");
        if (func && typeof func === "function") {
          func(x1);
        }
        $(".save-it").addClass("disabled");
        self.$draftMessage.fadeOut("slow", function() {
          self.$draftMessage.empty();
          /** @type {boolean} */
          self._viewingDraft = false;
        });
        self.callAnalytics("Interaction", name, "Library");
        if (config.runtime("usingSenseHat")) {
          self.callAnalytics("Sense Hat Event", name, "Library");
        }
      };
      $("#statusMessages .close").click();
      self.$overlay.removeClass("hide");
      if (newVersion) {
        argv._origin_id = newVersion;
      }
      if (name == "Remix") {
        /** @type {boolean} */
        argv._remix = true;
      }
      if (self._trinket.id) {
        self.fork(self._trinket, argv, ext, update);
      } else {
        self.create(argv, ext, update);
      }
    },
    getTrinket : function(i, s) {
      var self = this;
      return typeof i === "function" && (s = i, i = void 0), self.isModified() || !self._trinket.id ? self._trinket.id ? self.fork(self._trinket, self.serialize(), i, s) : self.create(self.serialize(), i, s) : setTimeout(function() {
        s(self._trinket);
      });
    },
    setTrinket : function(value, expectedTriggered) {
      if (expectedTriggered) {
        /** @type {string} */
        this._original = value;
      }
      this._trinket = $.extend(true, {}, value);
    },
    isModified : function() {
      var value = this.getValue();
      var modified = value !== (this._trinket.code || "") || this.settingsModified();
      return modified;
    },
    settingsModified : function() {
      return config.runtime("settingsModified");
    },
    viewingDraft : function() {
      return this._viewingDraft;
    },
    getType : function() {
      throw new Error("getType is not implemented");
    },
    getValue : function() {
      throw new Error("getValue is not implemented");
    },
    getMainFile : function() {
      return "";
    },
    getShareType : function() {
      return $("#shareType").val() || this.getType();
    },
    getTimeoutDelay : function() {
      return this.serversideTimeoutDelay;
    },
    serialize : function(key) {
      return {
        code : this.getValue(key)
      };
    },
    fork : function(params, options, value, type) {
    },
    create : function(name, from, message) {
    },
    save : function(op, callback) {
    },
    onResetClick : function(button) {
      var me = this;
      this.$resetModal.foundation("reveal", "close");
      /**
       * @return {undefined}
       */
      var finish = function() {
        me.setTrinket(me._original);
        me.reset(me._trinket);
        $(document).trigger("trinket.resetted");
      };
      if (this.viewingDraft()) {
        this.discardDraft(finish);
      } else {
        finish();
      }
      try {
        if (window.sessionStorage) {
          window.sessionStorage.removeItem(this.guid);
        }
        store.remove(this.guid);
      } catch (d) {
      }
      if (window.parent) {
        window.parent.postMessage("reset", "*");
      }
      this.callAnalytics("Interaction", "Click", "Reset");
      if (config.runtime("usingSenseHat")) {
        this.callAnalytics("Sense Hat Event", "Click", "Reset");
      }
      if ($(".file-name-error").length) {
        $(".file-name-error").find(".close").trigger("click");
      }
    },
    reset : function(date) {
    },
    clickReset : function() {
      $(document).trigger("trinket.code.reset");
    },
    focus : function() {
    },
    onUpdateClick : function() {
      this.save(this.serialize());
    },
    onShareClick : function(event) {
      var that = this;
      /** @type {!Array} */
      var responseGroup = [];
      /** @type {string} */
      var level = "";
      if (!event.isDefaultPrevented()) {
        that.getTrinket(function(key) {
          var template = that.getShareInfo(key);
          var g = dispatch(template.url);
          $("#runOptionLink").data("trinket-shortCode", key.shortCode);
          $("#runOptionLink").data("trinket-runMode", that.runMode);
          $("#displayOptionLink").data("trinket-shortCode", key.shortCode);
          $("#displayOptionLink").data("trinket-runMode", that.runMode);
          if ($("#displayOptionLink").val()) {
            responseGroup.push($("#displayOptionLink").val() + "=true");
          }
          if ($("#runOptionLink").val()) {
            responseGroup.push("runOption=" + $("#runOptionLink").val());
          }
          if (that.runMode) {
            responseGroup.push("runMode=" + that.runMode);
          }
          if (responseGroup.length) {
            /** @type {string} */
            level = "?" + responseGroup.join("&");
          }
          g = g.replace(key.shortCode, key.shortCode + level);
          that.$shareUrl.text(g);
          that.$shareModal.foundation("reveal", "open");
          that.sendAnalytics("Navigation", {
            action : "View Modal",
            label : "share"
          }, {
            name : "Snippet Modal Viewed",
            modalType : "share"
          });
        });
      }
    },
    onEmailClick : function(event) {
      var $ = this;
      if (!event.isDefaultPrevented()) {
        $.getTrinket(function(b) {
          var loader = $.getShareInfo(b);
          var geoJSON_str = dispatch(loader.url);
          $.$shareUrl.text(geoJSON_str);
          $.$emailModal.foundation("reveal", "open");
          $.sendAnalytics("Navigation", {
            action : "View Modal",
            label : "email"
          }, {
            name : "Snippet Modal Viewed",
            modalType : "email"
          });
        });
      }
    },
    getShareInfo : function(a) {
      return {
        url : "/" + this.getShareType() + "/" + this.getTrinketIdentifier(a)
      };
    },
    onShareFocus : function(a) {
      _this.byId("shareUrl");
      this.updateMetric("linkShares");
      this.sendAnalytics("Shares", {
        action : "Focus",
        label : "link"
      }, {
        name : "Snippet Shared",
        shareType : "link"
      });
    },
    onEmbedClick : function(event) {
      var that = this;
      /** @type {!Array} */
      var responseGroup = [];
      /** @type {string} */
      var padding = "";
      if (!event.isDefaultPrevented()) {
        that.getTrinket(function(node) {
          var action = that.getEmbedInfo(node);
          var dispatcher = dispatch(action.url);
          /** @type {string} */
          var data = '<iframe src="' + dispatcher + '" width="100%" height="' + (action.height || 356) + '" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>';
          $("#runOptionEmbed").data("trinket-shortCode", node.shortCode);
          $("#runOptionEmbed").data("trinket-runMode", that.runMode);
          $("#displayOptionEmbed").data("trinket-shortCode", node.shortCode);
          $("#displayOptionEmbed").data("trinket-runMode", that.runMode);
          if ($("#displayOptionEmbed").val()) {
            responseGroup.push($("#displayOptionEmbed").val() + "=true");
          }
          if ($("#runOptionEmbed").val()) {
            responseGroup.push("runOption=" + $("#runOptionEmbed").val());
          }
          if ($("#autorunEmbedToggle").is(":checked")) {
            responseGroup.push("start=result");
          }
          if (that.runMode) {
            responseGroup.push("runMode=" + that.runMode);
          }
          if (responseGroup.length) {
            /** @type {string} */
            padding = "?" + responseGroup.join("&");
          }
          /** @type {string} */
          data = data.replace(node.shortCode, node.shortCode + padding);
          that.$embedCode.text(data);
          that.$embedModal.foundation("reveal", "open");
          that.sendAnalytics("Navigation", {
            action : "View Modal",
            label : "embed"
          }, {
            name : "Snippet Modal Viewed",
            modalType : "embed"
          });
        });
      }
    },
    onGroupPostClick : function(a) {
      try {
        window.parent.groups.post(this.serialize());
      } catch (conv_reverse_sort) {
        console.log(conv_reverse_sort);
      }
    },
    onGroupSubmitClick : function(a) {
      try {
        window.parent.groups.submit(this.serialize());
      } catch (conv_reverse_sort) {
        console.log(conv_reverse_sort);
      }
    },
    getEmbedInfo : function(ctx) {
      var GROUP_UPDATE_INFO_URL = "/" + this.getTrinketIdentifier(ctx);
      return {
        url : "/embed/" + this.getType() + GROUP_UPDATE_INFO_URL,
        height : 356
      };
    },
    onEmbedFocus : function(a) {
      _this.byId("embedCode");
      this.updateMetric("embedShares");
      this.sendAnalytics("Shares", {
        action : "Focus",
        label : "embed"
      }, {
        name : "Snippet Shared",
        shareType : "embed"
      });
    },
    updateMetric : function(name, token) {
      var product = $("body").data("no-metrics");
      if (name && !product && this._trinket && this._trinket.id) {
        if (token) {
          var hash = CryptoJS.MD5(token);
          token = hash.toString(CryptoJS.enc.Hex);
        } else {
          token = this._trinket.id;
        }
        if (this._updates[name] || (this._updates[name] = {}), !this._updates[name][token]) {
          /** @type {boolean} */
          this._updates[name][token] = true;
          var e = {};
          /** @type {boolean} */
          e[name] = true;
          $.ajax({
            url : "/api/trinkets/" + this._trinket.id + "/metrics",
            type : "PUT",
            dataType : "json",
            data : e
          });
        }
      }
    },
    onLogoClick : function(event) {
      var rias = this;
      event.preventDefault();
      rias.getTrinket(function(b) {
        var loader = rias.getShareInfo(b);
        rias.sendAnalytics("Navigation", {
          action : "Click",
          label : "Logo"
        }, {
          name : "Snippet Logo Clicked"
        });
        window.open(dispatch(loader.url));
      });
    },
    onGalleryClick : function(event) {
      event.preventDefault();
      window.open(dispatch("/gallery"));
    },
    onNotificationClick : function(evt) {
      evt.preventDefault();
      var rias = this;
      if (this._notification_open) {
        $("#notification-content").animate({
          "margin-top" : "-100%"
        }, 400, function() {
          /** @type {boolean} */
          rias._notification_open = false;
        });
      } else {
        $("#notification-content").animate({
          "margin-top" : 0
        }, 400, function() {
          /** @type {boolean} */
          rias._notification_open = true;
          rias.sendAnalytics("Navigation", {
            action : "Click",
            label : "Notification"
          }, {
            name : "Snippet Notification Clicked"
          });
        });
      }
    },
    onSendEmailClick : function(a) {
      var monster = this;
      if ($("#share-email").val() && $("#share-yourname").val() && $("#share-youremail").val()) {
        $(".close").click();
        $("#sendEmail").attr("value", "Sending ...");
        $("#sendEmail").addClass("disabled");
        $.post("/api/trinkets/" + monster._trinket.id + "/email", {
          email : $("#share-email").val(),
          name : $("#share-yourname").val(),
          replyTo : $("#share-youremail").val(),
          token : $("#emailToken").val(),
          "g-recaptcha-response" : a
        }).done(function(a) {
          monster.$emailModal.foundation("reveal", "close");
          /** @type {string} */
          var formattedChosenQuestion = '<div data-alert class="alert-box success"> Your email was sent! Thanks for sharing! <a href="#" class="close">&times;</a></div>';
          $("#flashMessage").show();
          $("#flashContent").html(formattedChosenQuestion);
          $(document).foundation("alert", "reflow");
          $("#share-email").val("");
          setTimeout(function() {
            $("#flashMessage .close").trigger("click");
          }, 3e3);
          monster.sendAnalytics("Shares", {
            action : "Send Email"
          }, {
            name : "Snippet Email Sent"
          });
        }).fail(function(a, canCreateDiscussions, isSlidingUp) {
          monster.$emailModal.foundation("reveal", "close");
          /** @type {string} */
          var formattedChosenQuestion = '<div data-alert class="alert-box warning"> There was a problem sending your email. Please try again later. <a href="#" class="close">&times;</a></div>';
          $("#flashMessage").show();
          $("#flashContent").html(formattedChosenQuestion);
          $(document).foundation("alert", "reflow");
        }).always(function() {
          $("#sendEmail").attr("value", "Send");
          $("#sendEmail").removeClass("disabled");
        });
      } else {
        /** @type {string} */
        var formattedChosenQuestion = '<div data-alert class="alert-box warning"> Please complete all fields to send your email. <a href="#" class="close">&times;</a></div>';
        $("#emailAlert").show().html(formattedChosenQuestion);
        $(document).foundation("alert");
      }
    },
    getAnalyticsCategory : function() {
      return "Snippet";
    },
    sendInterfaceAnalytics : function(a, data) {
      if (!data) {
        data = {};
      }
      var c = $(a);
      var newappid = c.data("action") || data.action;
      var e = c.data("data") || data.data;
      var logEvent = c.closest("[data-interface]").data("interface") || data["interface"];
      var cacheEnd = c.data("library-override") || false;
      var init = this.$responsiveIndicators.filter(function(a) {
        return $(this).css("display") !== "none";
      }).data("size") || "";
      /** @type {!Array} */
      var i = [init, logEvent, newappid.replace(/\./g, "-")];
      if (e) {
        i.push(e);
      }
      /** @type {string} */
      i = i.join(" ").replace(/[a-zA-Z0-9](?:[^\s\-\._]*)/g, function(CardNo18) {
        return CardNo18.charAt(0).toUpperCase() + CardNo18.substr(1);
      });
      this.sendAnalytics("Interface", {
        action : i,
        label : this.getTrinketIdentifier()
      }, cacheEnd);
    },
    sendAnalytics : function(child, data, last) {
      var command;
      var req = this;
      var options = req.getEmbedInfo(req._trinket);
      var distChanged = req._queryString && req._queryString.inLibrary;
      data = $.extend({
        category : "Embedded " + req.getAnalyticsCategory() + " " + child
      }, data, {
        data : {
          page : options.url
        }
      });
      /** @type {!Array} */
      command = ["send", "event", data.category, data.action];
      if (data.label) {
        command.push(data.label);
      }
      if (data.value) {
        command.push(data.value);
      }
      if (data.data) {
        command.push(data.data);
      }
      if (window.ga && !req._queryString.snapshot && (!distChanged || distChanged && last)) {
        window.ga.apply(null, command);
      }
    },
    callAnalytics : function(fn, type, text) {
      this.sendAnalytics(fn, {
        action : type,
        label : text
      });
    },
    logClientMetric : function(item) {
      if (trinket.config.logClientMetric) {
        try {
          item.lang = this.getType();
          if (this._trinket && this._trinket.id) {
            item.trinketId = this._trinket.id;
          }
          $.post("/api/trinkets/clientmetric", item).done(function() {
          });
        } catch (b) {
        }
      }
    },
    toggleOverlay : function(field) {
      $(field).toggleClass("hide");
      if ($(field).hasClass("hide")) {
        /** @type {boolean} */
        this.hasOverlay = false;
        this.onCloseOverlay();
      } else {
        /** @type {boolean} */
        this.hasOverlay = true;
        this.onOpenOverlay();
      }
    },
    closeOverlay : function(e) {
      $(e).addClass("hide");
      /** @type {boolean} */
      this.hasOverlay = false;
    },
    closeAnyModal : function() {
      if ($(".close-reveal-modal").is(":visible")) {
        $(".close-reveal-modal").click();
      }
    },
    closeAnyMessage : function() {
      if ($(".close").is(":visible")) {
        $(".close").click();
      }
    },
    draggable : function(onstop) {
      var layerE = ($("#dragbar").width(), $("#editor"));
      var sortableConfig = this;
      $(document).on("mousedown.dragbar", "#dragbar", function(event) {
        event.preventDefault();
        var width = $(".trinket-content-wrapper").width();
        $("#content-overlay").show();
        /** @type {boolean} */
        sortableConfig.dragging = true;
        var $parentDiv = $("<div>", {
          id : "ghostbar",
          css : {
            height : layerE.outerHeight(),
            top : layerE.offset().top,
            left : layerE.offset().left
          }
        }).appendTo("body");
        $(document).on("mousemove.dragbar", function(event) {
          /** @type {number} */
          var thisStart = event.pageX / width;
          /** @type {number} */
          var start = (width - event.pageX) / width;
          if (thisStart >= 0.3 && start >= 0.25) {
            $parentDiv.css("left", event.pageX + 2);
            $("#editor").css("width", event.pageX + 2);
            if (onstop) {
              onstop();
            }
          }
        });
        $(document).one("mouseup.dragbar", function(a) {
          $("#content-overlay").hide();
          if (sortableConfig.dragging) {
            $("#ghostbar").remove();
            $(document).off("mousemove.dragbar");
            /** @type {boolean} */
            sortableConfig.dragging = false;
          }
        });
      });
    },
    toggleAll : function() {
    },
    onOpenOverlay : function() {
    },
    onCloseOverlay : function() {
    },
    postSave : function() {
      /**
       * @return {?}
       */
      function next() {
        return extensionResolver.resolve();
      }
      var extensionResolver = $.Deferred();
      var trip = this;
      var id = trip._trinket.shortCode;
      return trip.saveClientSnapshot() ? (trip.captureAndSaveSnapshot(function(handleError) {
        return handleError ? void $.post("/api/trinkets/" + id + "/snapshot", {
          snapshotData : handleError
        }).done(next) : next();
      }), extensionResolver) : next();
    },
    saveClientSnapshot : function() {
      return false;
    },
    isDirty : function() {
      return this._trinket ? !(this.getValue() === this._original.code) : false;
    },
    destroy : function() {
      this._trinket = void 0;
    },
    getTrinketIdentifier : function(options) {
      return options || (options = this._trinket), options.shortCode ? options.shortCode : CryptoJS.MD5(options.code).toString(CryptoJS.enc.Hex);
    },
    getTrinketIdentifierOrNull : function() {
      /** @type {null} */
      var a = null;
      return this._trinket && (a = this._trinket.original ? this._trinket.original.shortCode : this._trinket.shortCode), a;
    },
    metadata : function() {
      var params = {};
      var ZmHtmlEditor = this.getTrinketIdentifierOrNull();
      return ZmHtmlEditor && (params.shortCode = ZmHtmlEditor), this._userId && (params.userId = this._userId, params.userPlan = this.hasRole("trinket-connect") ? "connect" : this.hasRole("trinket-codeplus") ? "codeplus" : "code"), this._trinket && this._trinket._owner && (params.ownerId = this._trinket._owner), params.lang = this.getType(), document.referrer && (params.referer = document.referrer), params;
    },
    logError : function(opts) {
      if (trinket.config.logClientCodeError) {
        opts.lang = this.getType();
        if (this._trinket && this._trinket.shortCode) {
          opts.shortCode = this._trinket.shortCode;
        }
        $.post("/api/trinkets/codeerror", opts).done(function() {
        });
      }
    },
    triggerRunModeChange : function() {
      $(document).trigger("trinket.runMode.change", {
        runMode : this.runMode
      });
      this.trigger("trinket.runMode.change", {
        runMode : this.runMode
      });
    },
    settingsChange : function(a) {
      var desktopBgTop;
      var type = $(a.target)[0].type;
      this._trinket.settings = $.extend(true, {}, this._trinket.settings);
      if (type === "checkbox") {
        desktopBgTop = $(a.target).is(":checked");
      } else {
        if (type === "range" || type === "hidden") {
          desktopBgTop = $(a.target).val();
        }
      }
      if (typeof desktopBgTop !== "undefined") {
        this._trinket.settings[a.target.id] = desktopBgTop;
        config.runtime("settingsModified", true);
      }
      if ($(a.target).data("settings-action") && typeof this[$(a.target).data("settings-action")] === "function") {
        this[$(a.target).data("settings-action")]();
      }
      if ($(a.target).data("skip-trigger")) {
        $(a.target).removeData("skip-trigger");
      } else {
        this.triggerChange();
      }
    },
    showOutput : function() {
      $("#codeOutput").removeClass("hide");
      $("#editor").addClass("hide");
      this.closeOverlay("#modules");
      $("#instructionsContainer").addClass("hide");
      $("#outputContainer").removeClass("hide");
      $("#codeOutputTab").addClass("active");
      $("#instructionsTab").removeClass("active");
    },
    showInstructions : function() {
      $("#codeOutput").removeClass("hide");
      $("#editor").addClass("hide");
      this.closeOverlay("#modules");
      if (!this.parsedInstructions) {
        this.displayInstructions();
      }
      $("#outputContainer").addClass("hide");
      $("#blocklyCodeContainer").addClass("hide");
      $("#instructionsContainer").removeClass("hide");
      $("#codeViewTab").removeClass("active");
      $("#codeOutputTab").removeClass("active");
      $("#instructionsTab").addClass("active");
    },
    displayInstructions : function() {
      if (typeof link !== "undefined") {
        var req = this;
        if (req._trinket.description || req.getUIType() !== "owner") {
          req.parsedInstructions = link(req._trinket.description);
        } else {
          req.parsedInstructions = cb("addInstructionsTemplate");
        }
        $("#instructionsOutput").html(req.parsedInstructions);
        if ($("#instructionsActions").length) {
          $("#instructionsActions").removeClass("hide");
        }
      }
    },
    onEditInstructionsClick : function() {
      var scope = this;
      $("#instructionsActions").addClass("hide");
      $("#instructionsToolbar").removeClass("hide");
      $("#instructionsContainer").addClass("editor");
      scope.parsedInstructions = cb("editInstructionsTemplate");
      $("#instructionsOutput").empty();
      $("#instructionsContainer").append(scope.parsedInstructions);
      var iThisMousePos = $("#instructionsContainer").height();
      editor = ace.edit("embedded-instructions");
      /** @type {number} */
      var iMousePos = iThisMousePos - 65;
      $("#embedded-instructions").height(iMousePos + "px");
      editor.resize();
      /** @type {number} */
      editor.$blockScrolling = 1 / 0;
      editor.setTheme("ace/theme/xcode");
      editor.getSession().setMode("ace/mode/markdown");
      editor.getSession().setUseSoftTabs(true);
      editor.getSession().setTabSize(2);
      editor.setShowPrintMargin(false);
      if (scope._trinket.description !== null && scope._trinket.description.length) {
        editor.getSession().setValue(scope._trinket.description, -1);
      }
    },
    onCancelEditInstructionsClick : function() {
      var routeBuilder = this;
      $("#instructionsContainer").removeClass("editor");
      $("#instructionsToolbar").addClass("hide");
      $("#instructionsActions").removeClass("hide");
      if (editor) {
        editor.destroy();
      }
      $("#embedded-instructions").remove();
      routeBuilder.displayInstructions();
    },
    onSaveInstructionsClick : function(a) {
    },
    setKey : function(id, status) {
      this._varProxy[id] = status;
    },
    getKey : function(scaleType) {
      return this._varProxy[scaleType];
    }
  }, window.TrinketAPI), window.TrinketApp = new init(window.trinketObject, window.draftObject), window.parent) {
    if (window.TrinketApp._queryString && window.TrinketApp._queryString.inLibrary) {
      window.parent.postMessage("TrinketApp ready", dispatch(""));
    } else {
      if (window.TrinketApp.assignment) {
        window.parent.postMessage("TrinketApp ready", "*");
        var value = window.TrinketApp.serialize();
        /** @type {boolean} */
        value._initial = true;
        window.parent.postMessage(value, "*");
      }
    }
  }
}), function() {
  /**
   * @param {string} type
   * @param {string} user
   * @return {undefined}
   */
  function init(type, user) {
    var c = window.TrinketIO["import"]("utils.cache");
    var data = c.get("user-log");
    /** @type {(Array<string>|null)} */
    var e = document.cookie.match(/session=([^;]+);/);
    type = type || $("#requestedLogin").val();
    user = user || $("#whoami").val();
    if (!data) {
      data = {
        log : [],
        user : user
      };
    }
    data.log.push({
      time : Date.now(),
      user : user || "",
      requested : type || "",
      path : window.location.href,
      referrer : document.referrer,
      userAgent : navigator.userAgent,
      sesh : e ? e[1] : ""
    });
    if (!(type && type !== user)) {
      if (!type && user) {
        data.user !== user;
      }
    }
    /** @type {string} */
    data.user = user;
    if (data.log.length > 10) {
      /** @type {!Array<?>} */
      data.log = data.log.slice(data.log.length - 10);
    }
    c.set("user-log", data);
  }
  window.TrinketIO["export"]("debug.sessions", {
    onLogin : function(name, options) {
      if (name === options.username || name === options.email) {
        name = options.username;
      }
      init(name, options.username);
    }
  });
  $(function() {
    init();
  });
}(), function(i, exporting) {
  /**
   * @param {string} str
   * @return {undefined}
   */
  function byId(str) {
    select(document.getElementById(str));
  }
  /**
   * @param {string} domRootID
   * @return {undefined}
   */
  function focusShareTextShort(domRootID) {
    $("." + domRootID).click(function(jEvent) {
      select($(jEvent.target)[0]);
    });
  }
  /**
   * @param {(Node|Window)} text
   * @return {undefined}
   */
  function select(text) {
    if (document.selection) {
      /** @type {(TextRange|null)} */
      var range = document.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else {
      if (i.getSelection) {
        /** @type {(Range|null)} */
        range = document.createRange();
        range.selectNodeContents(text);
        i.getSelection().removeAllRanges();
        i.getSelection().addRange(range);
      }
    }
  }
  exporting["export"]("utils.selectText", {
    byId : byId,
    byClass : focusShareTextShort
  });
}(window, window.TrinketIO), function(metaWindow, exporting) {
  /**
   * @return {undefined}
   */
  function init() {
    var conf_lang_text = {
      autorunEmbed : {
        paramName : "start",
        paramValue : "result"
      },
      hideGeneratedCodeEmbed : {
        paramName : "hideGeneratedCode",
        paramValue : "true"
      },
      showInstructionsEmbed : {
        paramName : "showInstructions",
        paramValue : "true"
      },
      showInstructionsShare : {
        paramName : "showInstructions",
        paramValue : "true"
      }
    };
    $("input:checkbox.checkboxToggle").change(function(b) {
      var ext;
      var re;
      var periodAdditionClean;
      var label;
      var option = $(b.target);
      var conid = $(option).val();
      var i = b.target.name;
      var paramName = conf_lang_text[i].paramName;
      var curOpt = $("#" + conid);
      var selectedText = curOpt.text();
      /** @type {!Array} */
      var responseGroup = [];
      /** @type {string} */
      var icon = "";
      if (conid === "shareUrl") {
        ext = $("#displayOptionLink").data("trinket-shortCode");
        /** @type {!RegExp} */
        re = new RegExp(ext + ".*");
        /** @type {string} */
        periodAdditionClean = "";
      } else {
        ext = $("#displayOptionEmbed").data("trinket-shortCode");
        /** @type {!RegExp} */
        re = new RegExp(ext + '[^"]*"');
        /** @type {string} */
        periodAdditionClean = '"';
      }
      if ($(option).is(":checked")) {
        options[paramName] = conf_lang_text[i].paramValue;
      } else {
        /** @type {string} */
        options[paramName] = "";
      }
      options.runMode = $(option).prev().data("trinket-runMode") || "";
      var name;
      for (name in options) {
        if (options[name]) {
          responseGroup.push(name + "=" + options[name]);
        }
      }
      if (responseGroup.length) {
        /** @type {string} */
        icon = "?" + responseGroup.join("&");
      }
      label = selectedText.replace(re, ext + icon + periodAdditionClean);
      curOpt.text(label);
    });
    $(":input.runOptions").change(function(jEvent) {
      var re;
      var periodAdditionClean;
      var label;
      var ruleOperatorSelect = $(jEvent.target);
      var g = $(ruleOperatorSelect).data("type");
      var primarykeyvalues = $(ruleOperatorSelect).val();
      var curOpt = $("#" + g);
      var selectedText = curOpt.text();
      var ext = $(ruleOperatorSelect).data("trinket-shortCode");
      /** @type {!Array} */
      var responseGroup = [];
      /** @type {string} */
      var icon = "";
      if (g === "shareUrl") {
        /** @type {!RegExp} */
        re = new RegExp(ext + ".*");
        /** @type {string} */
        periodAdditionClean = "";
      } else {
        /** @type {!RegExp} */
        re = new RegExp(ext + '[^"]*"');
        /** @type {string} */
        periodAdditionClean = '"';
      }
      options.runOption = primarykeyvalues;
      options.runMode = $(ruleOperatorSelect).data("trinket-runMode") || "";
      var i;
      for (i in options) {
        if (options[i]) {
          responseGroup.push(i + "=" + options[i]);
        }
      }
      if (responseGroup.length) {
        /** @type {string} */
        icon = "?" + responseGroup.join("&");
      }
      label = selectedText.replace(re, ext + icon + periodAdditionClean);
      curOpt.text(label);
    });
    $(":input.displayOptions").change(function(jEvent) {
      var re;
      var periodAdditionClean;
      var label;
      var ruleOperatorSelect = $(jEvent.target);
      var g = $(ruleOperatorSelect).data("type");
      var type = $(ruleOperatorSelect).val();
      var curOpt = $("#" + g);
      var selectedText = curOpt.text();
      var ext = $(ruleOperatorSelect).data("trinket-shortCode");
      /** @type {!Array} */
      var responseGroup = [];
      /** @type {string} */
      var icon = "";
      if (g === "shareUrl") {
        /** @type {!RegExp} */
        re = new RegExp(ext + ".*");
        /** @type {string} */
        periodAdditionClean = "";
      } else {
        /** @type {!RegExp} */
        re = new RegExp(ext + '[^"]*"');
        /** @type {string} */
        periodAdditionClean = '"';
      }
      /** @type {string} */
      options.outputOnly = "";
      /** @type {string} */
      options.toggleCode = "";
      if (type && typeof options[type] !== "undefined") {
        /** @type {string} */
        options[type] = "true";
      }
      options.runMode = $(ruleOperatorSelect).data("trinket-runMode") || "";
      var i;
      for (i in options) {
        if (options[i]) {
          responseGroup.push(i + "=" + options[i]);
        }
      }
      if (responseGroup.length) {
        /** @type {string} */
        icon = "?" + responseGroup.join("&");
      }
      label = selectedText.replace(re, ext + icon + periodAdditionClean);
      curOpt.text(label);
    });
  }
  /**
   * @return {undefined}
   */
  function d() {
    options = {
      outputOnly : "",
      toggleCode : "",
      runOption : "",
      start : "",
      runMode : "",
      hideGeneratedCode : "",
      showInstructions : ""
    };
  }
  var options;
  d();
  exporting["export"]("trinket.share", {
    init : init,
    resetParams : d
  });
}(window, window.TrinketIO), function(exporting) {
  /**
   * @return {undefined}
   */
  function callback() {
    if (typeof index === "undefined" && $("#roles").length && $("#roles").val().length) {
      try {
        var a = $("#roles").val().split("+");
        var c2 = a[0];
        var c1 = a.slice(1).join("+");
        var str = CryptoJS.AES.decrypt(c1, c2);
        /** @type {*} */
        index = JSON.parse(CryptoJS.enc.Utf8.stringify(str));
      } catch (size_buffer) {
        console.log("roles decrypt error:", size_buffer);
      }
    }
  }
  /**
   * @param {string} name
   * @param {string} url
   * @param {!Object} data
   * @return {?}
   */
  function init(name, url, data) {
    callback();
    data = _.extend(data || {});
    if (!url) {
      /** @type {string} */
      url = "site";
    }
    if (data.id) {
      /** @type {string} */
      url = url + ":" + data.id;
    }
    var self = _.find(index, function(state) {
      return state.context === url;
    });
    return self && self.permissions.indexOf(name) >= 0 ? self.thru && self.thru[name] ? Array.isArray(self.thru[name]) ? _.some(self.thru[name], function(data) {
      return data instanceof Object ? _.some(_.values(data), function(endSunday) {
        return moment().isBefore(endSunday);
      }) : moment().isBefore(data);
    }) : moment().isBefore(self.thru[name]) : true : false;
  }
  /**
   * @param {string} id
   * @param {string} type
   * @param {!Object} def
   * @return {?}
   */
  function create(id, type, def) {
    callback();
    def = _.extend(def || {});
    if (!type) {
      /** @type {string} */
      type = "site";
    }
    if (def.id) {
      /** @type {string} */
      type = type + ":" + def.id;
    }
    var self = _.find(index, function(a) {
      return a.context === type;
    });
    return self && self.roles.indexOf(id) >= 0 ? self.thru && self.thru[id] ? moment().isBefore(self.thru[id]) : true : false;
  }
  /**
   * @param {string} type
   * @param {!Object} query
   * @return {?}
   */
  function query(type, query) {
    callback();
    query = _.extend(query || {});
    if (!type) {
      /** @type {string} */
      type = "site";
    }
    if (query.id) {
      /** @type {string} */
      type = type + ":" + query.id;
    }
    var c = _.find(index, function(a) {
      return a.context === type;
    });
    return c && c.roles.length;
  }
  /**
   * @return {?}
   */
  function collectBoards() {
    /** @type {boolean} */
    var a = false;
    var $rootScope = this;
    return callback(), index && index.forEach(function(vm) {
      if (/^group/.test(vm.context) && $rootScope.hasRole("group-member", vm.context)) {
        /** @type {boolean} */
        a = true;
      }
    }), a;
  }
  /**
   * @param {?} context
   * @return {?}
   */
  function createContextMenuItems(context) {
    var check_token = {};
    return callback(), index && (check_token = _.find(index, function(menuItem) {
      return menuItem.context === context;
    })), check_token;
  }
  var index;
  exporting["export"]("trinket.roles", {
    hasPermission : init,
    hasRole : create,
    inGroup : collectBoards,
    getByContext : createContextMenuItems,
    hasAnyRole : query
  });
}(window.TrinketIO), function() {
  var $;
  var Ansi;
  var CLASS_ANSI;
  var CLASS_BLURRED;
  var CLASS_CURSOR;
  var CLASS_HEADER;
  var CLASS_INPUT;
  var CLASS_OLD_INPUT;
  var CLASS_OLD_PROMPT;
  var CLASS_PREFIX;
  var CLASS_PROMPT;
  var CLASS_PROMPT_TEXT;
  var width;
  var DEFAULT_PROMPT_CONINUE_LABEL;
  var DEFAULT_PROMPT_LABEL;
  var EMPTY_DIV;
  var EMPTY_SELECTOR;
  var EMPTY_SPAN;
  var s;
  var properties;
  var type;
  var JQConsole;
  var bboxMax;
  var MaxCount;
  var ArrowRight;
  var ArrowUp;
  var CsrfToken;
  var modulePathIgnorePatterns;
  var $lt;
  var showControlsOnHover;
  var config;
  var max_age;
  var remote_mta;
  var ArrowDown;
  var NEWLINE;
  var STATE_INPUT;
  var STATE_OUTPUT;
  var gearman;
  var spanHtml;
  /**
   * @param {!Function} g
   * @param {?} type
   * @return {?}
   */
  var bind = function(g, type) {
    return function() {
      return g.apply(type, arguments);
    };
  };
  /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
  var slice = [].slice;
  $ = jQuery;
  /** @type {number} */
  STATE_INPUT = 0;
  /** @type {number} */
  STATE_OUTPUT = 1;
  /** @type {number} */
  gearman = 2;
  /** @type {number} */
  CsrfToken = 13;
  /** @type {number} */
  remote_mta = 9;
  /** @type {number} */
  MaxCount = 46;
  /** @type {number} */
  bboxMax = 8;
  /** @type {number} */
  $lt = 37;
  /** @type {number} */
  max_age = 39;
  /** @type {number} */
  ArrowDown = 38;
  /** @type {number} */
  ArrowRight = 40;
  /** @type {number} */
  modulePathIgnorePatterns = 36;
  /** @type {number} */
  ArrowUp = 35;
  /** @type {number} */
  config = 33;
  /** @type {number} */
  showControlsOnHover = 34;
  /** @type {string} */
  CLASS_PREFIX = "jqconsole-";
  /** @type {string} */
  CLASS_CURSOR = CLASS_PREFIX + "cursor";
  /** @type {string} */
  CLASS_HEADER = CLASS_PREFIX + "header";
  /** @type {string} */
  CLASS_PROMPT = CLASS_PREFIX + "prompt";
  /** @type {string} */
  CLASS_PROMPT_TEXT = CLASS_PROMPT + "-text";
  /** @type {string} */
  CLASS_OLD_PROMPT = CLASS_PREFIX + "old-prompt";
  /** @type {string} */
  CLASS_INPUT = CLASS_PREFIX + "input";
  /** @type {string} */
  CLASS_OLD_INPUT = CLASS_PREFIX + "old-input";
  /** @type {string} */
  CLASS_BLURRED = CLASS_PREFIX + "blurred";
  /** @type {string} */
  type = "keypress";
  /** @type {string} */
  EMPTY_SPAN = "<span/>";
  /** @type {string} */
  EMPTY_DIV = "<div/>";
  /** @type {string} */
  EMPTY_SELECTOR = ":empty";
  /** @type {string} */
  NEWLINE = "\n";
  /** @type {string} */
  DEFAULT_PROMPT_LABEL = ">>> ";
  /** @type {string} */
  DEFAULT_PROMPT_CONINUE_LABEL = "... ";
  /** @type {number} */
  width = 2;
  /** @type {string} */
  CLASS_ANSI = CLASS_PREFIX + "ansi-";
  /** @type {string} */
  s = "\u001b";
  /** @type {!RegExp} */
  properties = /\[(\d*)(?:;(\d*))*m/;
  Ansi = function() {
    /**
     * @return {undefined}
     */
    function Ansi() {
      this.stylize = bind(this.stylize, this);
      this._closeSpan = bind(this._closeSpan, this);
      this._openSpan = bind(this._openSpan, this);
      this.getClasses = bind(this.getClasses, this);
      this._style = bind(this._style, this);
      this._color = bind(this._color, this);
      this._remove = bind(this._remove, this);
      this._append = bind(this._append, this);
      /** @type {!Array} */
      this.klasses = [];
    }
    return Ansi.prototype.COLORS = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"], Ansi.prototype._append = function(klass) {
      return klass = "" + CLASS_ANSI + klass, this.klasses.indexOf(klass) === -1 ? this.klasses.push(klass) : void 0;
    }, Ansi.prototype._remove = function() {
      var cls;
      var _i;
      var klass;
      var pseudos;
      var _len;
      var results;
      /** @type {!Array<?>} */
      pseudos = arguments.length >= 1 ? slice.call(arguments, 0) : [];
      /** @type {!Array} */
      results = [];
      /** @type {number} */
      _i = 0;
      /** @type {number} */
      _len = pseudos.length;
      for (; _len > _i; _i++) {
        klass = pseudos[_i];
        if (klass === "fonts" || klass === "color" || klass === "background-color") {
          results.push(this.klasses = function() {
            var _j;
            var URLInput;
            var _ref;
            var results1;
            _ref = this.klasses;
            /** @type {!Array} */
            results1 = [];
            /** @type {number} */
            _j = 0;
            URLInput = _ref.length;
            for (; URLInput > _j; _j++) {
              cls = _ref[_j];
              if (cls.indexOf(klass) !== CLASS_ANSI.length) {
                results1.push(cls);
              }
            }
            return results1;
          }.call(this));
        } else {
          klass = "" + CLASS_ANSI + klass;
          results.push(this.klasses = function() {
            var _j;
            var URLInput;
            var _ref;
            var results1;
            _ref = this.klasses;
            /** @type {!Array} */
            results1 = [];
            /** @type {number} */
            _j = 0;
            URLInput = _ref.length;
            for (; URLInput > _j; _j++) {
              cls = _ref[_j];
              if (cls !== klass) {
                results1.push(cls);
              }
            }
            return results1;
          }.call(this));
        }
      }
      return results;
    }, Ansi.prototype._color = function(i) {
      return this.COLORS[i];
    }, Ansi.prototype._style = function(code) {
      if (code === "" && (code = 0), code = parseInt(code), !isNaN(code)) {
        switch(code) {
          case 0:
            return this.klasses = [];
          case 1:
            return this._append("bold");
          case 2:
            return this._append("lighter");
          case 3:
            return this._append("italic");
          case 4:
            return this._append("underline");
          case 5:
            return this._append("blink");
          case 6:
            return this._append("blink-rapid");
          case 8:
            return this._append("hidden");
          case 9:
            return this._append("line-through");
          case 10:
            return this._remove("fonts");
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
            return this._remove("fonts"), this._append("fonts-" + (code - 10));
          case 20:
            return this._append("fraktur");
          case 21:
            return this._remove("bold", "lighter");
          case 22:
            return this._remove("bold", "lighter");
          case 23:
            return this._remove("italic", "fraktur");
          case 24:
            return this._remove("underline");
          case 25:
            return this._remove("blink", "blink-rapid");
          case 28:
            return this._remove("hidden");
          case 29:
            return this._remove("line-through");
          case 30:
          case 31:
          case 32:
          case 33:
          case 34:
          case 35:
          case 36:
          case 37:
            return this._remove("color"), this._append("color-" + this._color(code - 30));
          case 39:
            return this._remove("color");
          case 40:
          case 41:
          case 42:
          case 43:
          case 44:
          case 45:
          case 46:
          case 47:
            return this._remove("background-color"), this._append("background-color-" + this._color(code - 40));
          case 49:
            return this._remove("background-color");
          case 51:
            return this._append("framed");
          case 53:
            return this._append("overline");
          case 54:
            return this._remove("framed");
          case 55:
            return this._remove("overline");
        }
      }
    }, Ansi.prototype.getClasses = function() {
      return this.klasses.join(" ");
    }, Ansi.prototype._openSpan = function(text) {
      return '<span class="' + this.getClasses() + '">' + text;
    }, Ansi.prototype._closeSpan = function(text) {
      return text + "</span>";
    }, Ansi.prototype.stylize = function(text) {
      var code;
      var node;
      var i;
      var j;
      var length;
      var children;
      text = this._openSpan(text);
      /** @type {number} */
      i = 0;
      for (; (i = text.indexOf(s, i)) && i !== -1;) {
        if (node = text.slice(i).match(properties)) {
          children = node.slice(1);
          /** @type {number} */
          j = 0;
          length = children.length;
          for (; length > j; j++) {
            code = children[j];
            this._style(code);
          }
          text = this._closeSpan(text.slice(0, i)) + this._openSpan(text.slice(i + 1 + node[0].length));
        } else {
          i++;
        }
      }
      return this._closeSpan(text);
    }, Ansi;
  }();
  /**
   * @param {string} klass
   * @param {string} content
   * @return {?}
   */
  spanHtml = function(klass, content) {
    return '<span class="' + klass + '">' + (content || "") + "</span>";
  };
  JQConsole = function() {
    /**
     * @param {?} outer_container
     * @param {string} header
     * @param {string} prompt_label
     * @param {string} prompt_continue_label
     * @param {number} disable_auto_focus
     * @return {undefined}
     */
    function JQConsole(outer_container, header, prompt_label, prompt_continue_label, disable_auto_focus) {
      if (disable_auto_focus == null) {
        /** @type {boolean} */
        disable_auto_focus = false;
      }
      this._HideComposition = bind(this._HideComposition, this);
      this._ShowComposition = bind(this._ShowComposition, this);
      this._UpdateComposition = bind(this._UpdateComposition, this);
      this._EndComposition = bind(this._EndComposition, this);
      this._StartComposition = bind(this._StartComposition, this);
      this._CheckComposition = bind(this._CheckComposition, this);
      this._ProcessMatch = bind(this._ProcessMatch, this);
      this._HandleKey = bind(this._HandleKey, this);
      this._HandleChar = bind(this._HandleChar, this);
      /** @type {boolean} */
      this.isMobile = !!navigator.userAgent.match(/iPhone|iPad|iPod|Android/i);
      /** @type {boolean} */
      this.isIos = !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
      /** @type {boolean} */
      this.isAndroid = !!navigator.userAgent.match(/Android/i);
      /** @type {boolean} */
      this.auto_focus = !disable_auto_focus;
      this.$window = $(window);
      this.header = header || "";
      this.prompt_label_main = typeof prompt_label === "string" ? prompt_label : DEFAULT_PROMPT_LABEL;
      this.prompt_label_continue = prompt_continue_label || DEFAULT_PROMPT_CONINUE_LABEL;
      this.indent_width = width;
      this.state = STATE_OUTPUT;
      /** @type {!Array} */
      this.input_queue = [];
      /** @type {null} */
      this.input_callback = null;
      /** @type {null} */
      this.multiline_callback = null;
      /** @type {!Array} */
      this.history = [];
      /** @type {number} */
      this.history_index = 0;
      /** @type {string} */
      this.history_new = "";
      /** @type {boolean} */
      this.history_active = false;
      this.shortcuts = {};
      this.$container = $("<div/>").appendTo(outer_container);
      this.$container.css({
        top : 0,
        left : 0,
        right : 0,
        bottom : 0,
        position : "absolute",
        overflow : "auto"
      });
      this.$console = $('<pre class="jqconsole"/>').appendTo(this.$container);
      this.$console.css({
        margin : 0,
        position : "relative",
        "min-height" : "100%",
        "box-sizing" : "border-box",
        "-moz-box-sizing" : "border-box",
        "-webkit-box-sizing" : "border-box"
      });
      /** @type {boolean} */
      this.$console_focused = true;
      this.$input_container = $(EMPTY_DIV).appendTo(this.$container);
      this.$input_container.css({
        position : "absolute",
        width : 1,
        height : 0,
        overflow : "hidden"
      });
      this.$input_source = $(this.isAndroid ? "<input/>" : "<textarea/>");
      this.$input_source.attr({
        wrap : "off",
        autocapitalize : "off",
        autocorrect : "off",
        spellcheck : "false",
        autocomplete : "off"
      });
      this.$input_source.css({
        position : "absolute",
        width : 2
      });
      this.$input_source.appendTo(this.$input_container);
      this.$composition = $(EMPTY_DIV);
      this.$composition.addClass(CLASS_PREFIX + "composition");
      this.$composition.css({
        display : "inline",
        position : "relative"
      });
      this.matchings = {
        openings : {},
        closings : {},
        clss : []
      };
      this.ansi = new Ansi;
      this._InitPrompt();
      this._SetupEvents();
      this.Write(this.header, CLASS_HEADER);
      $(outer_container).data("jqconsole", this);
    }
    return JQConsole.prototype.ResetHistory = function() {
      return this.SetHistory([]);
    }, JQConsole.prototype.ResetShortcuts = function() {
      return this.shortcuts = {};
    }, JQConsole.prototype.ResetMatchings = function() {
      return this.matchings = {
        openings : {},
        closings : {},
        clss : []
      };
    }, JQConsole.prototype.Reset = function() {
      if (this.state !== STATE_OUTPUT) {
        this.ClearPromptText(true);
      }
      this.state = STATE_OUTPUT;
      /** @type {!Array} */
      this.input_queue = [];
      /** @type {null} */
      this.input_callback = null;
      /** @type {null} */
      this.multiline_callback = null;
      /** @type {null} */
      this.custom_control_key_handler = null;
      /** @type {null} */
      this.custom_keypress_handler = null;
      this.ResetHistory();
      this.ResetShortcuts();
      this.ResetMatchings();
      this.$prompt.detach();
      this.$input_container.detach();
      this.$console.html("");
      this.$prompt.appendTo(this.$console);
      this.$input_container.appendTo(this.$container);
      this.Write(this.header, CLASS_HEADER);
    }, JQConsole.prototype.GetHistory = function() {
      return this.history;
    }, JQConsole.prototype.SetHistory = function(history) {
      return this.history = history.slice(), this.history_index = this.history.length;
    }, JQConsole.prototype._CheckKeyCode = function(num) {
      if (num = isNaN(num) ? num.charCodeAt(0) : parseInt(num, 10), !(num > 0 && num < 256) || isNaN(num)) {
        throw new Error("Key code must be a number between 0 and 256 exclusive.");
      }
      return num;
    }, JQConsole.prototype._LetterCaseHelper = function(key_code, callback) {
      return callback(key_code), key_code >= 65 && key_code <= 90 && callback(key_code + 32), key_code >= 97 && key_code <= 122 ? callback(key_code - 32) : void 0;
    }, JQConsole.prototype.RegisterShortcut = function(key_code, callback) {
      var removeShortcut;
      if (key_code = this._CheckKeyCode(key_code), typeof callback !== "function") {
        throw new Error("Callback must be a function, not " + callback + ".");
      }
      removeShortcut = function(action) {
        return function(key) {
          return key in action.shortcuts || (action.shortcuts[key] = []), action.shortcuts[key].push(callback);
        };
      }(this);
      this._LetterCaseHelper(key_code, removeShortcut);
    }, JQConsole.prototype.UnRegisterShortcut = function(key_code, handler) {
      var removeShortcut;
      key_code = this._CheckKeyCode(key_code);
      removeShortcut = function(action) {
        return function(key) {
          return key in action.shortcuts ? handler ? action.shortcuts[key].splice(action.shortcuts[key].indexOf(handler), 1) : delete action.shortcuts[key] : void 0;
        };
      }(this);
      this._LetterCaseHelper(key_code, removeShortcut);
    }, JQConsole.prototype.GetColumn = function() {
      var lines;
      return this.$prompt_right.detach(), this.$prompt_cursor.text(""), lines = this.$console.text().split(NEWLINE), this.$prompt_cursor.html("&nbsp;"), this.$prompt_cursor.after(this.$prompt_right), lines[lines.length - 1].length;
    }, JQConsole.prototype.GetLine = function() {
      return this.$console.text().split(NEWLINE).length - 1;
    }, JQConsole.prototype.ClearPromptText = function(clear_label) {
      if (this.state === STATE_OUTPUT) {
        throw new Error("ClearPromptText() is not allowed in output state.");
      }
      this.$prompt_before.html("");
      this.$prompt_after.html("");
      this.$prompt_label.text(clear_label ? "" : this._SelectPromptLabel(false));
      this.$prompt_left.text("");
      this.$prompt_right.text("");
    }, JQConsole.prototype.GetPromptText = function(installed) {
      var after;
      var before;
      var otherCharacter;
      var getPromptLines;
      var ownedMods;
      if (this.state === STATE_OUTPUT) {
        throw new Error("GetPromptText() is not allowed in output state.");
      }
      return installed ? (this.$prompt_cursor.text(""), ownedMods = this.$prompt.text(), this.$prompt_cursor.html("&nbsp;"), ownedMods) : (getPromptLines = function(node) {
        var longTrace;
        return longTrace = [], node.children().each(function() {
          return longTrace.push($(this).children().last().text());
        }), longTrace.join(NEWLINE);
      }, before = getPromptLines(this.$prompt_before), before && (before = before + NEWLINE), otherCharacter = this.$prompt_left.text() + this.$prompt_right.text(), after = getPromptLines(this.$prompt_after), after && (after = NEWLINE + after), before + otherCharacter + after);
    }, JQConsole.prototype.SetPromptText = function(text) {
      if (this.state === STATE_OUTPUT) {
        throw new Error("SetPromptText() is not allowed in output state.");
      }
      this.ClearPromptText(false);
      this._AppendPromptText(text);
      this._ScrollToEnd();
    }, JQConsole.prototype.SetPromptLabel = function(main_label, continue_label) {
      /** @type {string} */
      this.prompt_label_main = main_label;
      if (continue_label != null) {
        /** @type {string} */
        this.prompt_label_continue = continue_label;
      }
    }, JQConsole.prototype.UpdatePromptLabel = function() {
      var full_selector;
      var prompt_selector;
      return prompt_selector = ">span+span>span:first-child", full_selector = "." + CLASS_PROMPT + prompt_selector, this.$console.find(full_selector).text(this.prompt_label_main);
    }, JQConsole.prototype.Write = function(value, cls, data) {
      var node;
      return data == null && (data = true), data && (value = this.ansi.stylize($(EMPTY_SPAN).text(value).html())), node = $(EMPTY_SPAN).html(value), cls != null && node.addClass(cls), this.Append(node);
    }, JQConsole.prototype.Append = function(value) {
      var $node;
      return $node = $(value).insertBefore(this.$prompt), this._ScrollToEnd(), this.$prompt_cursor.detach().insertAfter(this.$prompt_left), $node;
    }, JQConsole.prototype.Input = function(input_callback) {
      var current_async_multiline;
      var current_history_active;
      var current_input_callback;
      var current_multiline_callback;
      if (this.state === gearman) {
        current_input_callback = this.input_callback;
        current_multiline_callback = this.multiline_callback;
        current_history_active = this.history_active;
        current_async_multiline = this.async_multiline;
        this.AbortPrompt();
        this.input_queue.unshift(function(_this) {
          return function() {
            return _this.Prompt(current_history_active, current_input_callback, current_multiline_callback, current_async_multiline);
          };
        }(this));
      } else {
        if (this.state !== STATE_OUTPUT) {
          return void this.input_queue.push(function(_this) {
            return function() {
              return _this.Input(input_callback);
            };
          }(this));
        }
      }
      /** @type {boolean} */
      this.history_active = false;
      /** @type {string} */
      this.input_callback = input_callback;
      /** @type {null} */
      this.multiline_callback = null;
      this.state = STATE_INPUT;
      this.$prompt.attr("class", CLASS_INPUT);
      this.$prompt_label.text(this._SelectPromptLabel(false));
      this.Focus();
      this._ScrollToEnd();
    }, JQConsole.prototype.Prompt = function(history_enabled, result_callback, multiline_callback, async_multiline) {
      return this.state !== STATE_OUTPUT ? void this.input_queue.push(function(_this) {
        return function() {
          return _this.Prompt(history_enabled, result_callback, multiline_callback, async_multiline);
        };
      }(this)) : (this.history_active = history_enabled, this.input_callback = result_callback, this.multiline_callback = multiline_callback, this.async_multiline = async_multiline, this.state = gearman, this.$prompt.attr("class", CLASS_PROMPT + " " + this.ansi.getClasses()), this.$prompt_label.text(this._SelectPromptLabel(false)), this.auto_focus && this.Focus(), void this._ScrollToEnd());
    }, JQConsole.prototype.AbortPrompt = function() {
      var text;
      if (this.state === STATE_OUTPUT) {
        throw new Error("Cannot abort prompt when not in prompt or input state.");
      }
      text = this.GetPromptText(true);
      if (this.state === STATE_INPUT) {
        if (text.trim().length !== 0) {
          this.Write(text + NEWLINE, CLASS_OLD_INPUT);
        }
      } else {
        this.Write(text + NEWLINE, CLASS_OLD_PROMPT);
      }
      this.ClearPromptText(true);
      this.state = STATE_OUTPUT;
      /** @type {null} */
      this.input_callback = this.multiline_callback = null;
      this._CheckInputQueue();
    }, JQConsole.prototype.Focus = function() {
      if (!this.IsDisabled()) {
        this.$input_source.focus();
      }
    }, JQConsole.prototype.SetIndentWidth = function(width) {
      return this.indent_width = width;
    }, JQConsole.prototype.GetIndentWidth = function() {
      return this.indent_width;
    }, JQConsole.prototype.RegisterMatching = function(open, close, cls) {
      var match_config;
      return match_config = {
        opening_char : open,
        closing_char : close,
        cls : cls
      }, this.matchings.clss.push(cls), this.matchings.openings[open] = match_config, this.matchings.closings[close] = match_config;
    }, JQConsole.prototype.UnRegisterMatching = function(open, close) {
      var item;
      return item = this.matchings.openings[open].cls, delete this.matchings.openings[open], delete this.matchings.closings[close], this.matchings.clss.splice(this.matchings.clss.indexOf(item), 1);
    }, JQConsole.prototype.Dump = function() {
      var dates;
      var value;
      return dates = this.$console.find("." + CLASS_HEADER).nextUntil("." + CLASS_PROMPT).addBack(), function() {
        var i;
        var l;
        var results;
        /** @type {!Array} */
        results = [];
        /** @type {number} */
        i = 0;
        l = dates.length;
        for (; l > i; i++) {
          value = dates[i];
          if ($(value).is("." + CLASS_OLD_PROMPT)) {
            results.push($(value).text().replace(/^\s+/, ">>> "));
          } else {
            results.push($(value).text());
          }
        }
        return results;
      }().join("");
    }, JQConsole.prototype.GetState = function() {
      return this.state === STATE_INPUT ? "input" : this.state === STATE_OUTPUT ? "output" : "prompt";
    }, JQConsole.prototype.Disable = function() {
      return this.$input_source.attr("disabled", true), this.$input_source.blur();
    }, JQConsole.prototype.Enable = function() {
      return this.$input_source.attr("disabled", false);
    }, JQConsole.prototype.IsDisabled = function() {
      return Boolean(this.$input_source.attr("disabled"));
    }, JQConsole.prototype.MoveToStart = function(all_lines) {
      this._MoveTo(all_lines, true);
    }, JQConsole.prototype.MoveToEnd = function(all_lines) {
      this._MoveTo(all_lines, false);
    }, JQConsole.prototype.Clear = function() {
      var prompt_class;
      return prompt_class = this.state === STATE_INPUT ? CLASS_INPUT : CLASS_PROMPT, this.$console.find("." + CLASS_HEADER).nextUntil("." + prompt_class).addBack().text(""), this.$prompt_cursor.detach(), this.$prompt_right.before(this.$prompt_cursor);
    }, JQConsole.prototype._CheckInputQueue = function() {
      return this.input_queue.length ? this.input_queue.shift()() : void 0;
    }, JQConsole.prototype._InitPrompt = function() {
      return this.$prompt = $(spanHtml(CLASS_INPUT)).appendTo(this.$console), this.$prompt_before = $(EMPTY_SPAN).appendTo(this.$prompt), this.$prompt_current = $(EMPTY_SPAN).appendTo(this.$prompt), this.$prompt_after = $(EMPTY_SPAN).appendTo(this.$prompt), this.$prompt_label = $(EMPTY_SPAN).appendTo(this.$prompt_current), this.$prompt_left = $(EMPTY_SPAN).appendTo(this.$prompt_current), this.$prompt_right = $(EMPTY_SPAN).appendTo(this.$prompt_current), this.$prompt_right.css({
        position : "relative"
      }), this.$prompt_left.addClass(CLASS_PROMPT_TEXT), this.$prompt_cursor = $(spanHtml(CLASS_CURSOR, "&nbsp;")), this.$prompt_cursor.insertBefore(this.$prompt_right), this.$prompt_cursor.css({
        color : "transparent",
        display : "inline",
        zIndex : 0
      }), this.isMobile ? void 0 : this.$prompt_cursor.css("position", "absolute");
    }, JQConsole.prototype._SetupEvents = function() {
      return this.isMobile ? this.$console.click(function(exports) {
        return function(event) {
          return event.preventDefault(), exports.Focus();
        };
      }(this)) : this.$console.mouseup(function(exports) {
        return function(event) {
          var c;
          return event.which === 2 ? exports.Focus() : (c = function() {
            return window.getSelection().toString() ? void 0 : (event.preventDefault(), exports.Focus());
          }, setTimeout(c, 0));
        };
      }(this)), this.$input_source.focus(function(_this) {
        return function() {
          var hideTextInput;
          var removeClass;
          return _this._ScrollToEnd(), _this.$console_focused = true, _this.$console.removeClass(CLASS_BLURRED), removeClass = function() {
            return _this.$console_focused ? _this.$console.removeClass(CLASS_BLURRED) : void 0;
          }, setTimeout(removeClass, 100), hideTextInput = function() {
            return _this.isIos && _this.$console_focused ? _this.$input_source.hide() : void 0;
          }, setTimeout(hideTextInput, 500);
        };
      }(this)), this.$input_source.blur(function(_this) {
        return function() {
          var addClass;
          return _this.$console_focused = false, _this.isIos && _this.$input_source.show(), addClass = function() {
            return _this.$console_focused ? void 0 : _this.$console.addClass(CLASS_BLURRED);
          }, setTimeout(addClass, 100);
        };
      }(this)), this.$input_source.bind("paste", function(_this) {
        return function() {
          var handlePaste;
          return handlePaste = function() {
            return _this.in_composition ? void 0 : (_this._AppendPromptText(_this.$input_source.val()), _this.$input_source.val(""), _this.Focus());
          }, setTimeout(handlePaste, 0);
        };
      }(this)), this.$input_source.keypress(this._HandleChar), this.$input_source.keydown(this._HandleKey), this.$input_source.keydown(this._CheckComposition), this.$input_source.bind("compositionstart", this._StartComposition), this.$input_source.bind("compositionend", function(_this) {
        return function(e) {
          return setTimeout(function() {
            return _this._EndComposition(e);
          }, 0);
        };
      }(this)), this.isAndroid ? (this.$input_source.bind("input", this._StartComposition), this.$input_source.bind("input", this._UpdateComposition)) : this.$input_source.bind("text", this._UpdateComposition);
    }, JQConsole.prototype.SetKeyPressHandler = function(handler) {
      return this.custom_keypress_handler = handler;
    }, JQConsole.prototype.SetControlKeyHandler = function(handler) {
      return this.custom_control_key_handler = handler;
    }, JQConsole.prototype._HandleChar = function(event) {
      var keycode;
      return this.state === STATE_OUTPUT || event.metaKey || event.ctrlKey ? true : (keycode = event.which, keycode === 8 || keycode === 9 || keycode === 13 ? false : this.custom_keypress_handler != null && this.custom_keypress_handler.call(this, event) === false ? false : (this.$prompt_left.text(this.$prompt_left.text() + String.fromCharCode(keycode)), this._ScrollToEnd(), false));
    }, JQConsole.prototype._HandleKey = function(event) {
      var key;
      if (this.state === STATE_OUTPUT) {
        return true;
      }
      if (key = event.keyCode || event.which, setTimeout($.proxy(this._CheckMatchings, this), 0), this.custom_control_key_handler != null && this.custom_control_key_handler.call(this, event) === false) {
        return false;
      }
      if (event.altKey) {
        return true;
      }
      if (event.ctrlKey || event.metaKey) {
        return this._HandleCtrlShortcut(key);
      }
      if (event.shiftKey) {
        switch(key) {
          case CsrfToken:
            this._HandleEnter(true);
            break;
          case remote_mta:
            this._Unindent();
            break;
          case ArrowDown:
            this._MoveUp();
            break;
          case ArrowRight:
            this._MoveDown();
            break;
          case config:
            this._ScrollPage("up");
            break;
          case showControlsOnHover:
            this._ScrollPage("down");
            break;
          default:
            return true;
        }
        return false;
      }
      switch(key) {
        case CsrfToken:
          this._HandleEnter(false);
          break;
        case remote_mta:
          this._Indent();
          break;
        case MaxCount:
          this._Delete(false);
          break;
        case bboxMax:
          this._Backspace(false);
          break;
        case $lt:
          this._MoveLeft(false);
          break;
        case max_age:
          this._MoveRight(false);
          break;
        case ArrowDown:
          this._HistoryPrevious();
          break;
        case ArrowRight:
          this._HistoryNext();
          break;
        case modulePathIgnorePatterns:
          this.MoveToStart(false);
          break;
        case ArrowUp:
          this.MoveToEnd(false);
          break;
        case config:
          this._ScrollPage("up");
          break;
        case showControlsOnHover:
          this._ScrollPage("down");
          break;
        default:
          return true;
      }
      return false;
    }, JQConsole.prototype._HandleCtrlShortcut = function(key) {
      var drawer;
      var _i;
      var _len;
      var _ref;
      switch(key) {
        case MaxCount:
          this._Delete(true);
          break;
        case bboxMax:
          this._Backspace(true);
          break;
        case $lt:
          this._MoveLeft(true);
          break;
        case max_age:
          this._MoveRight(true);
          break;
        case ArrowDown:
          this._MoveUp();
          break;
        case ArrowRight:
          this._MoveDown();
          break;
        case ArrowUp:
          this.MoveToEnd(true);
          break;
        case modulePathIgnorePatterns:
          this.MoveToStart(true);
          break;
        default:
          if (key in this.shortcuts) {
            _ref = this.shortcuts[key];
            /** @type {number} */
            _i = 0;
            _len = _ref.length;
            for (; _len > _i; _i++) {
              drawer = _ref[_i];
              drawer.call(this);
            }
            return false;
          }
          return true;
      }
      return false;
    }, JQConsole.prototype._HandleEnter = function(shift) {
      var continuation;
      var text;
      return this._EndComposition(), shift ? this._InsertNewLine(true) : (text = this.GetPromptText(), continuation = function(_this) {
        return function(a) {
          var origCount;
          var callback;
          var cls_suffix;
          var j;
          var ref;
          var newNodeLists;
          if (a !== false) {
            _this.MoveToEnd(true);
            _this._InsertNewLine(true);
            /** @type {!Array} */
            newNodeLists = [];
            /** @type {number} */
            origCount = j = 0;
            /** @type {number} */
            ref = Math.abs(a);
            for (; ref >= 0 ? ref > j : j > ref; origCount = ref >= 0 ? ++j : --j) {
              if (a > 0) {
                newNodeLists.push(_this._Indent());
              } else {
                newNodeLists.push(_this._Unindent());
              }
            }
            return newNodeLists;
          }
          return cls_suffix = _this.state === STATE_INPUT ? "input" : "prompt", _this.Write(_this.GetPromptText(true) + NEWLINE, CLASS_PREFIX + "old-" + cls_suffix), _this.ClearPromptText(true), _this.history_active && (_this.history.length && _this.history[_this.history.length - 1] === text || _this.history.push(text), _this.history_index = _this.history.length), _this.state = STATE_OUTPUT, callback = _this.input_callback, _this.input_callback = null, callback && callback(text), _this._CheckInputQueue();
        };
      }(this), this.multiline_callback ? this.async_multiline ? this.multiline_callback(text, continuation) : continuation(this.multiline_callback(text)) : continuation(false));
    }, JQConsole.prototype._GetDirectionals = function(back) {
      var $prompt_opposite;
      var $prompt_rel_opposite;
      var $prompt_relative;
      var $prompt_which;
      var MoveDirection;
      var MoveToLimit;
      var where_append;
      var which_end;
      return $prompt_which = back ? this.$prompt_left : this.$prompt_right, $prompt_opposite = back ? this.$prompt_right : this.$prompt_left, $prompt_relative = back ? this.$prompt_before : this.$prompt_after, $prompt_rel_opposite = back ? this.$prompt_after : this.$prompt_before, MoveToLimit = back ? $.proxy(this.MoveToStart, this) : $.proxy(this.MoveToEnd, this), MoveDirection = back ? $.proxy(this._MoveLeft, this) : $.proxy(this._MoveRight, this), which_end = back ? "last" : "first", where_append = 
      back ? "prependTo" : "appendTo", {
        $prompt_which : $prompt_which,
        $prompt_opposite : $prompt_opposite,
        $prompt_relative : $prompt_relative,
        $prompt_rel_opposite : $prompt_rel_opposite,
        MoveToLimit : MoveToLimit,
        MoveDirection : MoveDirection,
        which_end : which_end,
        where_append : where_append
      };
    }, JQConsole.prototype._VerticalMove = function(up) {
      var $prompt_opposite;
      var $prompt_relative;
      var $prompt_which;
      var MoveDirection;
      var MoveToLimit;
      var pos;
      var ref;
      var mode_stack;
      return ref = this._GetDirectionals(up), $prompt_which = ref.$prompt_which, $prompt_opposite = ref.$prompt_opposite, $prompt_relative = ref.$prompt_relative, MoveToLimit = ref.MoveToLimit, MoveDirection = ref.MoveDirection, $prompt_relative.is(EMPTY_SELECTOR) ? void 0 : (pos = this.$prompt_left.text().length, MoveToLimit(), MoveDirection(), mode_stack = $prompt_which.text(), $prompt_opposite.text(up ? mode_stack.slice(pos) : mode_stack.slice(0, pos)), $prompt_which.text(up ? mode_stack.slice(0, 
      pos) : mode_stack.slice(pos)));
    }, JQConsole.prototype._MoveUp = function() {
      return this._VerticalMove(true);
    }, JQConsole.prototype._MoveDown = function() {
      return this._VerticalMove();
    }, JQConsole.prototype._HorizontalMove = function(whole_word, back) {
      var oCalen;
      var $prompt_opposite;
      var $prompt_rel_opposite;
      var $prompt_relative;
      var $prompt_which;
      var $which_line;
      var len;
      var ref;
      var regexp;
      var text;
      var tmp;
      var where_append;
      var which_end;
      var word;
      if (ref = this._GetDirectionals(back), $prompt_which = ref.$prompt_which, $prompt_opposite = ref.$prompt_opposite, $prompt_relative = ref.$prompt_relative, $prompt_rel_opposite = ref.$prompt_rel_opposite, which_end = ref.which_end, where_append = ref.where_append, regexp = back ? /\w*\W*$/ : /^\w*\W*/, text = $prompt_which.text()) {
        if (whole_word) {
          if (word = text.match(regexp), !word) {
            return;
          }
          return word = word[0], tmp = $prompt_opposite.text(), $prompt_opposite.text(back ? word + tmp : tmp + word), len = word.length, $prompt_which.text(back ? text.slice(0, -len) : text.slice(len));
        }
        return tmp = $prompt_opposite.text(), $prompt_opposite.text(back ? text.slice(-1) + tmp : tmp + text[0]), $prompt_which.text(back ? text.slice(0, -1) : text.slice(1));
      }
      return $prompt_relative.is(EMPTY_SELECTOR) ? void 0 : ($which_line = $(EMPTY_SPAN)[where_append]($prompt_rel_opposite), $which_line.append($(EMPTY_SPAN).text(this.$prompt_label.text())), $which_line.append($(EMPTY_SPAN).text($prompt_opposite.text())), oCalen = $prompt_relative.children()[which_end]().detach(), this.$prompt_label.text(oCalen.children().first().text()), $prompt_which.text(oCalen.children().last().text()), $prompt_opposite.text(""));
    }, JQConsole.prototype._MoveLeft = function(whole_word) {
      return this._HorizontalMove(whole_word, true);
    }, JQConsole.prototype._MoveRight = function(whole_word) {
      return this._HorizontalMove(whole_word);
    }, JQConsole.prototype._MoveTo = function(all_lines, back) {
      var $prompt_opposite;
      var $prompt_relative;
      var name;
      var MoveDirection;
      var MoveToLimit;
      var ref;
      var _results;
      if (ref = this._GetDirectionals(back), name = ref.$prompt_which, $prompt_opposite = ref.$prompt_opposite, $prompt_relative = ref.$prompt_relative, MoveToLimit = ref.MoveToLimit, MoveDirection = ref.MoveDirection, all_lines) {
        /** @type {!Array} */
        _results = [];
        for (; !$prompt_relative.is(EMPTY_SELECTOR) || name.text() !== "";) {
          MoveToLimit(false);
          _results.push(MoveDirection(false));
        }
        return _results;
      }
      return $prompt_opposite.text(this.$prompt_left.text() + this.$prompt_right.text()), name.text("");
    }, JQConsole.prototype._Delete = function(whole_word) {
      var oCalen;
      var css;
      var m;
      if (css = this.$prompt_right.text()) {
        if (whole_word) {
          if (m = css.match(/^\w*\W*/), !m) {
            return;
          }
          return m = m[0], this.$prompt_right.text(css.slice(m.length));
        }
        return this.$prompt_right.text(css.slice(1));
      }
      return this.$prompt_after.is(EMPTY_SELECTOR) ? void 0 : (oCalen = this.$prompt_after.children().first().detach(), this.$prompt_right.text(oCalen.children().last().text()));
    }, JQConsole.prototype._Backspace = function(whole_word) {
      var oCalen;
      var unlessExpr;
      var startPos;
      if (setTimeout($.proxy(this._ScrollToEnd, this), 0), unlessExpr = this.$prompt_left.text()) {
        if (whole_word) {
          if (startPos = unlessExpr.match(/\w*\W*$/), !startPos) {
            return;
          }
          return startPos = startPos[0], this.$prompt_left.text(unlessExpr.slice(0, -startPos.length));
        }
        return this.isAndroid ? (this.$input_source.val(unlessExpr.slice(0, -1)), this.$composition.text(unlessExpr.slice(0, -1))) : this.$prompt_left.text(unlessExpr.slice(0, -1));
      }
      return this.$prompt_before.is(EMPTY_SELECTOR) ? void 0 : (oCalen = this.$prompt_before.children().last().detach(), this.$prompt_label.text(oCalen.children().first().text()), this.$prompt_left.text(oCalen.children().last().text()));
    }, JQConsole.prototype._Indent = function() {
      var origCount;
      return this.$prompt_left.prepend(function() {
        var j;
        var ref;
        var results;
        /** @type {!Array} */
        results = [];
        /** @type {number} */
        origCount = j = 1;
        ref = this.indent_width;
        for (; ref >= 1 ? ref >= j : j >= ref; origCount = ref >= 1 ? ++j : --j) {
          results.push(" ");
        }
        return results;
      }.call(this).join(""));
    }, JQConsole.prototype._Unindent = function() {
      var origCount;
      var j;
      var data;
      var ref;
      var results;
      data = this.$prompt_left.text() + this.$prompt_right.text();
      /** @type {!Array} */
      results = [];
      /** @type {number} */
      origCount = j = 1;
      ref = this.indent_width;
      for (; (ref >= 1 ? ref >= j : j >= ref) && /^ /.test(data); origCount = ref >= 1 ? ++j : --j) {
        if (this.$prompt_left.text()) {
          this.$prompt_left.text(this.$prompt_left.text().slice(1));
        } else {
          this.$prompt_right.text(this.$prompt_right.text().slice(1));
        }
        results.push(data = data.slice(1));
      }
      return results;
    }, JQConsole.prototype._InsertNewLine = function(indent) {
      var $old_line;
      var match;
      var old_prompt;
      return indent == null && (indent = false), old_prompt = this._SelectPromptLabel(!this.$prompt_before.is(EMPTY_SELECTOR)), $old_line = $(EMPTY_SPAN).appendTo(this.$prompt_before), $old_line.append($(EMPTY_SPAN).text(old_prompt)), $old_line.append($(EMPTY_SPAN).addClass(CLASS_PROMPT_TEXT).text(this.$prompt_left.text())), this.$prompt_label.text(this._SelectPromptLabel(true)), indent && (match = this.$prompt_left.text().match(/^\s+/)) ? this.$prompt_left.text(match[0]) : this.$prompt_left.text(""), 
      this._ScrollToEnd();
    }, JQConsole.prototype._AppendPromptText = function(text) {
      var i;
      var n;
      var line;
      var lines;
      var tempLines;
      var _results;
      lines = text.split(NEWLINE);
      this.$prompt_left.text(this.$prompt_left.text() + lines[0]);
      tempLines = lines.slice(1);
      /** @type {!Array} */
      _results = [];
      /** @type {number} */
      i = 0;
      n = tempLines.length;
      for (; n > i; i++) {
        line = tempLines[i];
        this._InsertNewLine();
        _results.push(this.$prompt_left.text(line));
      }
      return _results;
    }, JQConsole.prototype._ScrollPage = function(dir) {
      var scrollTop;
      return scrollTop = this.$container[0].scrollTop, dir === "up" ? scrollTop = scrollTop - this.$container.height() : scrollTop = scrollTop + this.$container.height(), this.$container.stop().animate({
        scrollTop : scrollTop
      }, "fast");
    }, JQConsole.prototype._ScrollToEnd = function() {
      var elLocation;
      return this.$container.scrollTop(this.$container[0].scrollHeight), elLocation = this.$prompt_cursor.position(), this.$input_container.css({
        left : elLocation.left,
        top : elLocation.top
      }), this.auto_focus ? setTimeout(this.ScrollWindowToPrompt.bind(this), 50) : void 0;
    }, JQConsole.prototype.ScrollWindowToPrompt = function() {
      var doc_height;
      var line_height;
      var optimal_pos;
      var pos;
      var e;
      var screen_top;
      if (line_height = this.$prompt_cursor.height(), screen_top = this.$window.scrollTop(), e = this.$window.scrollLeft(), doc_height = document.documentElement.clientHeight, pos = this.$prompt_cursor.offset(), optimal_pos = pos.top - 2 * line_height, this.isMobile && typeof orientation !== "undefined" && orientation !== null) {
        if (screen_top < pos.top || screen_top > pos.top) {
          return this.$window.scrollTop(optimal_pos);
        }
      } else {
        if (screen_top + doc_height < pos.top) {
          return this.$window.scrollTop(pos.top - doc_height + line_height);
        }
        if (screen_top > optimal_pos) {
          return this.$window.scrollTop(pos.top);
        }
      }
    }, JQConsole.prototype._SelectPromptLabel = function(isDev) {
      return this.state === gearman ? isDev ? " \n" + this.prompt_label_continue : this.prompt_label_main : isDev ? "\n " : " ";
    }, JQConsole.prototype._Wrap = function($elem, index, cls) {
      var $linkElem;
      var text;
      return text = $elem.html(), $linkElem = text.slice(0, index) + spanHtml(cls, text[index]) + text.slice(index + 1), $elem.html($linkElem);
    }, JQConsole.prototype._WalkCharacters = function(text, char, opposing_char, current_count, back) {
      var ch;
      var index;
      var read_char;
      index = back ? text.length : 0;
      text = text.split("");
      /**
       * @return {?}
       */
      read_char = function() {
        var i;
        var args;
        var d;
        var c;
        return back ? (args = text, text = args.length >= 2 ? slice.call(args, 0, i = args.length - 1) : (i = 0, []), c = args[i++]) : (d = text, c = d[0], text = d.length >= 2 ? slice.call(d, 1) : []), c && (index = index + (back ? -1 : 1)), c;
      };
      for (; ch = read_char();) {
        if (ch === char ? current_count++ : ch === opposing_char && current_count--, current_count === 0) {
          return {
            index : index,
            current_count : current_count
          };
        }
      }
      return {
        index : -1,
        current_count : current_count
      };
    }, JQConsole.prototype._ProcessMatch = function(config, back, before_char) {
      var $collection;
      var $prompt_relative;
      var $prompt_which;
      var char;
      var current_count;
      var j;
      var index;
      var opposing_char;
      var ref;
      var ref1;
      var ref2;
      var text;
      return ref = back ? [config.closing_char, config.opening_char] : [config.opening_char, config.closing_char], char = ref[0], opposing_char = ref[1], ref1 = this._GetDirectionals(back), $prompt_which = ref1.$prompt_which, $prompt_relative = ref1.$prompt_relative, current_count = 1, j = false, text = $prompt_which.html(), back || (text = text.slice(1)), before_char && back && (text = text.slice(0, -1)), ref2 = this._WalkCharacters(text, char, opposing_char, current_count, back), index = ref2.index, 
      current_count = ref2.current_count, index > -1 ? (this._Wrap($prompt_which, index, config.cls), j = true) : ($collection = $prompt_relative.children(), $collection = back ? Array.prototype.reverse.call($collection) : $collection, $collection.each(function(_this) {
        return function(canCreateDiscussions, rawCourse) {
          var $elem;
          var ref2;
          return $elem = $(rawCourse).children().last(), text = $elem.html(), ref2 = _this._WalkCharacters(text, char, opposing_char, current_count, back), index = ref2.index, current_count = ref2.current_count, index > -1 ? (back || index--, _this._Wrap($elem, index, config.cls), j = true, false) : void 0;
        };
      }(this))), j;
    }, JQConsole.prototype._CheckMatchings = function(before_char) {
      var chapter;
      var config;
      var current_char;
      var found;
      var _i;
      var _len;
      var _ref;
      current_char = before_char ? this.$prompt_left.text().slice(this.$prompt_left.text().length - 1) : this.$prompt_right.text()[0];
      _ref = this.matchings.clss;
      /** @type {number} */
      _i = 0;
      _len = _ref.length;
      for (; _len > _i; _i++) {
        chapter = _ref[_i];
        $("." + chapter, this.$console).contents().unwrap();
      }
      if ((config = this.matchings.closings[current_char]) ? found = this._ProcessMatch(config, true, before_char) : (config = this.matchings.openings[current_char]) ? found = this._ProcessMatch(config, false, before_char) : before_char || this._CheckMatchings(true), before_char) {
        if (found) {
          return this._Wrap(this.$prompt_left, this.$prompt_left.html().length - 1, config.cls);
        }
      } else {
        if (found) {
          return this._Wrap(this.$prompt_right, 0, config.cls);
        }
      }
    }, JQConsole.prototype._HistoryPrevious = function() {
      return !this.history_active || this.history_index <= 0 ? void 0 : (this.history_index === this.history.length && (this.history_new = this.GetPromptText()), this.SetPromptText(this.history[--this.history_index]));
    }, JQConsole.prototype._HistoryNext = function() {
      return !this.history_active || this.history_index >= this.history.length ? void 0 : this.history_index === this.history.length - 1 ? (this.history_index++, this.SetPromptText(this.history_new)) : this.SetPromptText(this.history[++this.history_index]);
    }, JQConsole.prototype._CheckComposition = function(e) {
      var b;
      return b = e.keyCode || e.which, b === 229 ? this.in_composition ? this._UpdateComposition() : this._StartComposition() : void 0;
    }, JQConsole.prototype._StartComposition = function() {
      return this.in_composition ? void 0 : (this.in_composition = true, this._ShowComposition(), setTimeout(this._UpdateComposition, 0));
    }, JQConsole.prototype._EndComposition = function() {
      return this.in_composition ? (this._HideComposition(), this.$prompt_left.text(this.$prompt_left.text() + this.$composition.text()), this.$composition.text(""), this.$input_source.val(""), this.in_composition = false) : void 0;
    }, JQConsole.prototype._UpdateComposition = function(e) {
      var scrollHeightObserver;
      return scrollHeightObserver = function(_this) {
        return function() {
          return _this.in_composition ? _this.$composition.text(_this.$input_source.val()) : void 0;
        };
      }(this), setTimeout(scrollHeightObserver, 0);
    }, JQConsole.prototype._ShowComposition = function() {
      return this.$composition.css("height", this.$prompt_cursor.height()), this.$composition.empty(), this.$composition.appendTo(this.$prompt_left);
    }, JQConsole.prototype._HideComposition = function() {
      return this.$composition.detach();
    }, JQConsole;
  }();
  /**
   * @param {string} header
   * @param {string} prompt_main
   * @param {boolean} prompt_continue
   * @param {boolean} disable_auto_focus
   * @return {?}
   */
  $.fn.jqconsole = function(header, prompt_main, prompt_continue, disable_auto_focus) {
    return new JQConsole(this, header, prompt_main, prompt_continue, disable_auto_focus);
  };
  $.fn.jqconsole.JQConsole = JQConsole;
  $.fn.jqconsole.Ansi = Ansi;
}.call(this), function(metaWindow, exporting) {
  /**
   * @param {string} size
   * @param {number} len
   * @return {?}
   */
  function guid(size, len) {
    /** @type {number} */
    var candidatesWidth = Date.now();
    return ["xxxxxxxx", "xxxx", "4xxx", "yxxx", "xxxxxxxxxxxx"].join(typeof size === "string" ? size : "-").substr(0, len || 36).replace(/[xy]/g, function(c) {
      /** @type {number} */
      var r = (candidatesWidth + 16 * Math.random()) % 16 | 0;
      return candidatesWidth = Math.floor(candidatesWidth / 16), (c == "x" ? r : 3 & r | 8).toString(16);
    });
  }
  exporting["export"]("utils.guid", guid);
}(window, window.TrinketIO), $.widget("trinket.assetBrowser", {
  options : {
    assets : [],
    libraryUrl : [],
    uploadUrl : "",
    linkAddUrl : "",
    selectedClass : "selected",
    templateUrl : trinketConfig.prefix("/js/plugins/asset-browser.html"),
    eventPrefix : "asset-browser",
    openClass : "open",
    assetsHowTo : "",
    guest : true
  },
  altThumbnails : {
    audio : '<i class="fa fa-file-audio-o alt-thumbnail"></i>',
    ttf : '<i class="fa fa-font alt-thumbnail"></i>'
  },
  altMimeTypes : {
    wav : "audio",
    mp3 : "audio",
    ogg : "audio",
    mpeg : "audio",
    midi : "audio",
    webm : "audio"
  },
  _create : function() {
    var self = this;
    self._templates = {};
    /** @type {boolean} */
    self._haveHidden = false;
    /** @type {boolean} */
    self._showingHidden = false;
    $.get(this.options.templateUrl).then(function(b) {
      self._setUpView(b);
    });
    this._onAppEvent("view.addimage.show", $.proxy(self.openAddImageView, self));
    this._onAppEvent("view.upload.show", $.proxy(self.openUploadImageView, self));
    this._onAppEvent("close", $.proxy(self.hide, self));
    this._onAppEvent("image.remove", $.proxy(self.removeImage, self));
    this._onAppEvent("image.replace", $.proxy(self.replaceImage, self));
    this._onAppEvent("image.restore", $.proxy(self.restoreImage, self));
    this._onAppEvent("view.hidden", $.proxy(self.viewHidden, self));
    this._dropzones = {};
    $(this.element).on("click", "[data-event]", function(b) {
      var fn = $(this).data("event");
      var link = $(this).closest("ul").data("image-id");
      self.element.trigger(self.options.eventPrefix + "." + fn, [link]);
    });
    if (this.options.guest) {
      $(document).on("trinket.account.success", $.proxy(self.allowImageUpload, self));
    }
  },
  _onAppEvent : function(type, fn, el) {
    $(el || this.element).on(this.options.eventPrefix + "." + type, fn);
  },
  _setUpView : function(a) {
    var $results;
    var that = this;
    var el = $(a);
    if (this.options.lang === "pygame") {
      el.find("[data-replace-text]").each(function(a, b) {
        $(b).text($(b).data("replace-text"));
      });
    }
    el.find(".template[template-id]").each(function(a, anchor) {
      var type = $(anchor).attr("template-id");
      that._templates[type] = $(anchor).detach().removeClass("template").removeAttr("template-id");
      that.element.empty().append(el);
    });
    this._addTemplateEvents(el);
    this._templates.addImage.on("modal.init", $.proxy(this._loadLibrary, this));
    if (this.options.assetsHowTo) {
      $results = $(this.options.assetsHowTo);
      if ($results.is("script")) {
        $results = $($results.text());
      }
      this.element.find(".howto-message").append($results);
      this.element.find(".howto-container").show();
      this._onAppEvent("view.howto.show", $.proxy(that.openHowToView, that));
      $(document).foundation();
    }
    /** @type {boolean} */
    this._viewReady = true;
    /** @type {boolean} */
    this._dropzoneReady = false;
    this._refreshAssets();
  },
  _refreshAssets : function() {
    var self = this;
    var b = self.element.find("#trinket-asset-list");
    if (this._viewReady) {
      $("#asset-list-wrapper").show();
      if (this.options.assets.length === 0) {
        b.hide();
      } else {
        b.empty();
        b.show();
      }
      $.each(this.options.assets, function(canCreateDiscussions, signedAuthToken) {
        var e = self._templates.imageInfo.clone();
        self._initLibraryItem(e, signedAuthToken);
        b.append(e);
      });
      self._sortList(b);
      $(document).foundation("reveal", "reflow");
    }
  },
  _initLibraryItem : function(el, data) {
    var trigger;
    var self = this;
    /** @type {string} */
    var type = "image-" + data.id;
    /** @type {!RegExp} */
    var f = /(?:\.([^.]+))?$/;
    /** @type {string} */
    var id = f.exec(data.name)[1];
    if (this._addTemplateEvents(el), el.find(".title").text(data.name), id && self.altMimeTypes[id] ? el.find(".thumbnail").replaceWith(self.altThumbnails[self.altMimeTypes[id]]) : id && self.altThumbnails[id] ? el.find(".thumbnail").replaceWith(self.altThumbnails[id]) : el.find(".thumbnail").attr("src", data.thumb || data.url), el.data("asset-id", data.id), el.addClass("asset-id-" + data.id), el.find(".click-for-dropzone").attr("id", "item-dropzone-" + data.id), trigger = el.find(".owner-controls"), 
    data.isDemo) {
      el.find(".demo").show();
      trigger.hide();
    } else {
      if (trigger.attr("data-dropdown", type), trigger.next("ul").attr("id", type), trigger.next("ul").attr("data-image-id", data.id), trigger.closest("li.asset").attr("id", "item-" + data.id), data.metrics && data.metrics.trinkets) {
        /** @type {string} */
        var message = "Image used in " + data.metrics.trinkets + " ";
        /** @type {string} */
        message = message + (data.metrics.trinkets === 1 ? "trinket" : "trinkets");
        el.find(".thumbnail").after('<span class="trinket-stat"><div class="badge" title="' + message + '">' + data.metrics.trinkets + "</div></span>");
        trigger.closest("li.asset").attr("data-used", true);
      }
    }
    this._onAppEvent("assets.remove", function() {
      el.find(".controls").hide();
      el.find(".confirm-controls").show();
    }, el);
    this._onAppEvent("assets.confirm", function() {
      $.each(self.options.assets, function(idxC, depMap) {
        return depMap.id === data.id ? (self.options.assets.splice(idxC, 1), self._refreshAssets(), self.element.trigger("assets.change"), false) : void 0;
      });
    }, el);
    this._onAppEvent("assets.cancel", function() {
      el.find(".confirm-controls").hide();
      el.find(".controls").show();
    }, el);
    this._onAppEvent("assets.toggle", function() {
      if (el.hasClass(self.options.selectedClass)) {
        el.removeClass(self.options.selectedClass);
        $.each(self.options.assets, function(idxC, depMap) {
          return depMap.id === data.id ? (self.options.assets.splice(idxC, 1), self._refreshAssets(), self.element.trigger("assets.change"), el.attr("data-used") || el.find(".if-not-used").removeClass("hide"), false) : void 0;
        });
      } else {
        el.addClass(self.options.selectedClass);
        self._addToAssets(data);
        el.find(".if-not-used").addClass("hide");
      }
    }, el);
  },
  _addTemplateEvents : function(p) {
    var sailsSocket = this;
    return p.find("[events]").each(function(a, selectedImage) {
      var videoEvents;
      var z;
      var f;
      var options = $(selectedImage).attr("events").split(/\s*,\s*/);
      $(selectedImage).off();
      z = options.length;
      for (; --z >= 0;) {
        /** @type {boolean} */
        f = false;
        if ($(selectedImage).data("if-broadcasting") && $(selectedImage).data("if-broadcasting") === "disable") {
          /** @type {boolean} */
          f = true;
        }
        videoEvents = options[z].split(/\s*:\s*/);
        $(selectedImage).on(videoEvents[0], function(event) {
          if (f && void 0 !== window.window.TrinketAPI._receiverBroadcastState && window.TrinketAPI._receiverBroadcastState !== "OFF") {
            $(".broadcasting-assets-info").show().delay(5e3).fadeOut();
          } else {
            $(this).trigger(sailsSocket.options.eventPrefix + "." + videoEvents[1], {
              originalEvent : event
            });
          }
        });
      }
    }), p;
  },
  _initUpload : function() {
    var that = this;
    var acceptedFiles = this.options.acceptedFiles || "image/jpeg,image/png,image/gif,image/jpg";
    new Dropzone(that._templates.addImage.find(".dropzone")[0], {
      url : "/api/users/assets",
      acceptedFiles : acceptedFiles,
      dictDefaultMessage : "",
      clickable : "#select-to-upload",
      previewsContainer : "#preview-container",
      init : function() {
        this.on("success", function(b, result) {
          result.file.metrics = {
            trinkets : 1
          };
          that._addToLibrary(result.file, "top");
          that._addToAssets(result.file);
        });
      }
    });
    that._onAppEvent("view.upload.hide", $.proxy(that.closeUploadImageView, that));
    /** @type {boolean} */
    that._dropzoneReady = true;
  },
  _markSelected : function() {
    var i;
    var self = this;
    var taxes_by_id = {};
    /** @type {number} */
    i = 0;
    for (; i < self.options.assets.length; i++) {
      taxes_by_id[self.options.assets[i].id] = self.options.assets[i];
    }
    this._templates.addImage.find(".asset").each(function(a) {
      var el = $(this);
      el.removeClass(self.options.selectedClass);
      if (taxes_by_id[el.data("asset-id")]) {
        el.addClass(self.options.selectedClass);
      }
    });
  },
  _addToAssets : function(a) {
    this.options.assets.push({
      url : a.url,
      name : a.name,
      id : a.id
    });
    this.element.trigger("assets.change");
  },
  _addToLibrary : function(project, prop) {
    var filteredView = this._templates.addImage;
    var $menu = project.hidden ? filteredView.find("ul#hidden-asset-list") : filteredView.find("ul#my-asset-list");
    var $item = this._templates.libraryImageInfo.clone();
    return project.hidden ? $item.find(".if-hidden").removeClass("hide") : $item.find(".if-not-hidden").removeClass("hide"), project.metrics && project.metrics.trinkets && $item.find(".if-not-used").addClass("hide"), prop = prop || "", this._initLibraryItem($item, project), prop === "top" ? ($menu.prepend($item), $item.addClass(this.options.selectedClass)) : $menu.append($item), project.hidden || $item.addClass("clickable"), $(document).foundation("dropdown", "reflow"), $item;
  },
  _loadLibrary : function() {
    var that = this;
    var filteredView = this._templates.addImage;
    var b_state = filteredView.find("ul#my-asset-list");
    this._addTemplateEvents(this._templates.addImage);
    b_state.empty();
    $("#loadingContents").show();
    $.get(that.options.libraryUrl).then(function(filePickedEvent) {
      var i;
      var tools = filePickedEvent.files || [];
      /** @type {number} */
      i = 0;
      for (; i < tools.length; i++) {
        that._addToLibrary(tools[i]);
        if (!that._haveHidden && tools[i].hidden) {
          that.element.find(".have-hidden").removeClass("hide");
          /** @type {boolean} */
          that._haveHidden = true;
        }
      }
      $(document).foundation("dropdown", "reflow");
      that._markSelected();
      that._templates.addImage.on("modal.show", $.proxy(that._markSelected, that));
      that._templates.addImage.on("modal.hide", $.proxy(that._refreshAssets, that));
      $("#loadingContent").hide();
    });
  },
  _showModal : function(modal) {
    var self = this;
    if (this._modal) {
      this._modal.hide();
      this._modal.trigger("modal.hide");
    }
    if (!$.contains(document, modal[0])) {
      $("#asset-viewer-contents").append(modal);
      modal.trigger("modal.init");
      modal.find(".closer, .addimage-done").click(function() {
        if (self._modal) {
          self._modal.trigger("modal.hide");
          self._modal.hide();
          self._modal = void 0;
        }
      });
    }
    /** @type {boolean} */
    this._modal = modal;
    this._modal.show();
    this._modal.trigger("modal.show");
  },
  assets : function(assets) {
    if (void 0 !== assets) {
      if (!Array.isArray(assets)) {
        throw new Error("trinket.codeEditor.assets expects an array, but got " + assets);
      }
      /** @type {!Object} */
      this.options.assets = assets;
      this._refreshAssets();
    }
    return this.options.assets;
  },
  show : function() {
    this.element.addClass(this.options.openClass);
  },
  hide : function() {
    this.element.removeClass(this.options.openClass);
  },
  openUploadImageView : function() {
    var _this = this;
    if (_this.options.guest) {
      $("#upload-guest").fadeIn();
      $("#assetLogin").click(function(jEvent) {
        _this.element.trigger("trinket.account.login", ["#assetAccount", {
          action : $(jEvent.target).data("action")
        }]);
      });
    } else {
      $("#upload-assets").fadeIn(function() {
        if (!_this._dropzoneReady) {
          _this._initUpload();
        }
      });
    }
    $(document).foundation("dropdown", "reflow");
  },
  openAddImageView : function() {
    $("#asset-list-wrapper").hide();
    this._showModal(this._templates.addImage);
  },
  closeUploadImageView : function() {
    $("#upload-assets").fadeOut({
      complete : function() {
        $(document).foundation("dropdown", "reflow");
      }
    });
  },
  openHowToView : function() {
    $("#howto-message").show();
  },
  allowImageUpload : function() {
    /** @type {boolean} */
    this.options.guest = false;
    $("#upload-guest").hide();
    this._loadLibrary();
    this.openUploadImageView();
  },
  openLinkView : function() {
    this._showModal(this._templates.imageLink);
  },
  removeImage : function(callback, id) {
    var div;
    var request;
    var self = this;
    $.ajax({
      url : "/api/users/assets/" + id,
      method : "DELETE"
    }).done(function(a) {
      div = self.element.find("#item-" + id);
      request = self.element.find("#hidden-asset-list");
      div.fadeOut({
        complete : function() {
          request.append(div.detach());
          self._sortList(request);
          if (!self._haveHidden) {
            self.element.find(".have-hidden").fadeIn();
          }
          div.find(".if-hidden").removeClass("hide");
          div.find(".if-not-hidden").addClass("hide");
          div.fadeIn();
        }
      });
    });
  },
  replaceImage : function(url, id) {
    var that = this;
    var template = that.element.find("#item-" + id);
    var e = template.attr("data-used") || false;
    if (!that._dropzones[id]) {
      that._dropzones[id] = new Dropzone("#item-" + id, {
        url : "/api/users/assets/" + id,
        acceptedFiles : "image/jpeg,image/png,image/gif,image/jpg",
        dictDefaultMessage : "",
        clickable : "#item-dropzone-" + id,
        previewsContainer : ".hidden-previews",
        maxFiles : 1,
        init : function() {
          this.on("success", function(a, e) {
            template.find(".title").text(e.file.name);
            template.find(".thumbnail").attr("src", e.file.url);
            /** @type {number} */
            var i = 0;
            for (; i < that.options.assets.length; i++) {
              if (that.options.assets[i].id === id) {
                that.options.assets[i].url = e.file.url;
                that.options.assets[i].name = e.file.name;
              }
            }
            that.element.trigger("assets.change");
            $(document).foundation("dropdown", "reflow");
          });
          this.on("maxfilesexceeded", function(fileName) {
            try {
              this.removeAllFiles();
            } catch (b) {
            }
            this.addFile(fileName);
          });
          this.on("uploadprogress", function(a, uSectors, canCreateDiscussions) {
            if (!that.element.find("li#item-" + id).has(".upload-progress").length) {
              var photoText = that.element.find(".upload-progress").clone();
              that.element.find("li#item-" + id).find(".asset-container").append(photoText);
            }
            var emailCase = that.element.find("li#item-" + id).find(".upload-progress");
            emailCase.removeClass("hide");
            emailCase.find("span.meter").css("width", uSectors + "%");
            emailCase.find("p.percent").text(Math.floor(uSectors) + "%");
            if (uSectors === 100) {
              emailCase.fadeOut(3e3, function() {
                emailCase.remove();
              });
            }
          });
        }
      });
    }
    if (!e) {
      this.element.find("#item-dropzone-" + id).trigger("click");
    }
  },
  viewHidden : function() {
    var a = this.element.find("#hidden-asset-list");
    a.prev("a").fadeOut({
      complete : function() {
        a.fadeIn();
      }
    });
  },
  restoreImage : function(image, id) {
    var div;
    var that = this;
    $.post("/api/users/assets/restore", {
      fileId : id
    }).done(function(a) {
      div = that.element.find("#item-" + id);
      $libraryList = that.element.find("#my-asset-list");
      div.fadeOut({
        complete : function() {
          $libraryList.append(div.detach());
          that._sortList($libraryList);
          div.find(".if-hidden").addClass("hide");
          div.find(".if-not-hidden").removeClass("hide");
          div.fadeIn();
          $(document).foundation("dropdown", "reflow");
        }
      });
    });
  },
  _sortList : function(element) {
    var firstitem = element.find("li.asset");
    var c = $(firstitem, element).get();
    c.sort(function(documentationNode, pelm) {
      var MIN_DISTANCE = $(documentationNode).text().toUpperCase();
      var d = $(pelm).text().toUpperCase();
      return d > MIN_DISTANCE ? -1 : 1;
    });
    $.each(c, function(b, c) {
      element.append(c);
    });
    $(document).foundation("dropdown", "reflow");
  }
}), function($, can, tmp) {
  /**
   * @param {!Object} elem
   * @param {?} old
   * @param {number} vnode
   * @param {(!Function|number)} hydrating
   * @return {?}
   */
  function patch(elem, old, vnode, hydrating) {
    /** @type {number} */
    var e = 100;
    for (; --e > 0 && elem.height() - old <= 0;) {
      if (vnode == hydrating) {
        elem.append("<div class='lineno lineselect _lineno_" + vnode + "_' role='presentation'>" + vnode + "</div>");
      } else {
        elem.append("<div class='lineno _lineno_" + vnode + "_' role='presentation'>" + vnode + "</div>");
      }
      vnode++;
    }
    return vnode;
  }
  /**
   * @param {?} b
   * @param {!Object} opts
   * @return {?}
   */
  function create(b, opts) {
    /** @type {number} */
    var root = 1;
    var f = $(b);
    var el = $('<textarea class="lined" autocorrect="off" autocapitalize="off" tabindex="0" role="textbox" aria-multiline="true" aria-label="Code Editor"></textarea>');
    f.append(el);
    el.attr("wrap", "off");
    el.css({
      resize : "none"
    });
    el.wrap("<div class='linedtextarea' role='tabpanel'></div>");
    var parentPg = el.parent().wrap("<div class='linedwrap'></div>");
    var bubbleObject = parentPg.parent();
    bubbleObject.prepend("<div class='lines' aria-hidden='true'></div>");
    var $jRate = bubbleObject.find(".lines");
    $jRate.append("<div class='codelines' data-filename='" + opts.name + "' role='presentation'></div>");
    var node = $jRate.find(".codelines");
    if (root = patch(node, $jRate.height(), 1, opts.selectedLine), opts.selectedLine != -1 && !isNaN(opts.selectedLine)) {
      /** @type {number} */
      var fontSize = parseInt(el.height() / (root - 2));
      /** @type {number} */
      var scrollTopValue = parseInt(fontSize * opts.selectedLine) - el.height() / 2;
      /** @type {number} */
      el[0].scrollTop = scrollTopValue;
    }
    var event = _.throttle(function(a) {
      var n = el[0];
      var y = n.scrollTop;
      var a = n.clientHeight;
      node.css({
        "margin-top" : -1 * y + "px"
      });
      root = patch(node, y + a, root, opts.selectedLine);
    }, 50);
    return el.scroll(event), opts.onFocus && el.on("focus", opts.onFocus), opts.value && el.val(opts.value, -1), $(window).on("resize", event), {
      registerPlugin : function(name, init) {
      },
      destroy : function() {
        bubbleObject.remove();
        el.remove();
        f.empty();
        $(window).off("resize", event);
      },
      addCommand : function(type, params, callback) {
        if (typeof tests[type] === "undefined") {
          tests[type] = {
            key : params,
            fn : callback
          };
        }
        var array = params.win.split("-");
        if (array.length === 2 || array.length === 3) {
          el.keydown(function(binding) {
            /** @type {boolean} */
            var b = false;
            if (array.length === 2) {
              if (keys[array[1]].keyCodes.indexOf(binding.keyCode) >= 0 && binding[keys[array[0]]]) {
                /** @type {boolean} */
                b = true;
              }
            } else {
              if (array.length === 3 && keys[array[2]].keyCodes.indexOf(binding.keyCode) >= 0 && binding[keys[array[0]]] && binding[keys[array[1]]]) {
                /** @type {boolean} */
                b = true;
              }
            }
            if (b) {
              callback.call();
            }
          });
        }
      },
      change : function(fn) {
        return el.on("input propertychange", fn);
      },
      setValue : function(key) {
        el.val(key, -1);
      },
      getValue : function() {
        return el.val();
      },
      focus : function() {
        return el.focus();
      },
      blur : function() {
        return el.blur();
      },
      isFocused : function() {
        return el.is(":focus");
      },
      setModeFromName : function(rawObject) {
      },
      resize : function() {
      },
      highlight : function(code) {
        $('.codelines[data-filename="' + opts.name + '"]').find("._lineno_" + code + "_").addClass("lineselect");
        $("textarea.lined").addClass("attention-error");
      },
      addQueueMarkers : function() {
      }
    };
  }
  /**
   * @param {?} format
   * @param {?} callback
   * @param {undefined} type
   * @param {!Object} e
   * @return {undefined}
   */
  function fn(format, callback, type, e) {
    var begin;
    var end;
    var lineWidgets = this.getSession().lineWidgets;
    var startRow = e.start.row;
    /** @type {number} */
    var len = e.end.row - startRow;
    if (len !== 0) {
      if (begin = this.getSession().getLine(e.start.row), end = begin.length, lineWidgets) {
        if (e.action == "remove") {
          if (!e.start.column && map[type][e.start.row + 1]) {
            startRow--;
          }
          var res = lineWidgets.splice(startRow + 1, len);
          var listeners = map[type].splice(startRow + 1, len);
          res.forEach(function(w) {
            if (w) {
              this.removeLineWidget(w);
            }
          }, this.getSession().widgetManager);
          listeners.forEach(function(item) {
            if (item) {
              delete widgets[item._commentId];
              callback({
                _id : item._commentId,
                index : item._file
              });
              this.removeGutterDecoration(item.row, "trinket-comment");
              this.removeGutterDecoration(item.row, "data-" + item._file + "-" + item._commentId);
              if (p[item._commentId]) {
                this.removeGutterDecoration(item.row, "collapsed");
              } else {
                this.removeGutterDecoration(item.row, "open");
              }
            }
          }, this.getSession());
        } else {
          if (end && end === e.start.column) {
            startRow++;
          }
          /** @type {!Array} */
          var args = new Array(len);
          args.unshift(startRow, 0);
          lineWidgets.splice.apply(lineWidgets, args);
          map[type].splice.apply(map[type], args);
        }
        /** @type {boolean} */
        var m = true;
        map[type].forEach(function(item, attribute) {
          if (item) {
            /** @type {boolean} */
            m = false;
            if (item.row !== attribute) {
              format(item._file, item._commentId, attribute, true);
            }
          }
        });
        if (m) {
          /** @type {null} */
          this.getSession().lineWidgets = null;
        }
      } else {
        if (e.action == "remove") {
          if (!e.start.column && map[type][e.start.row + 1]) {
            startRow--;
          }
          var res = map[type].splice(startRow + 1, len);
          res.forEach(function(item) {
            if (item) {
              delete widgets[item._commentId];
              callback({
                _id : item._commentId,
                index : item._file
              });
              this.removeGutterDecoration(item.row, "trinket-comment");
              this.removeGutterDecoration(item.row, "data-" + item._file + "-" + item._commentId);
              if (p[item._commentId]) {
                this.removeGutterDecoration(item.row, "collapsed");
              } else {
                this.removeGutterDecoration(item.row, "open");
              }
            }
          }, this.getSession());
        } else {
          if (end && end === e.start.column) {
            startRow++;
          }
          /** @type {!Array} */
          args = new Array(len);
          args.unshift(startRow, 0);
          map[type].splice.apply(map[type], args);
        }
        map[type].forEach(function(item, id) {
          if (item && item.row !== id) {
            format(item._file, item._commentId, id, true);
          }
        });
      }
    }
  }
  /**
   * @param {?} node
   * @param {!Object} options
   * @return {?}
   */
  function init(node, options) {
    /**
     * @param {string} name
     * @return {undefined}
     */
    function show(name) {
      $(".comment-warning").find(".close").click();
      $(node).append(template({
        message : name
      }));
      $(document).foundation("alert", "reflow");
    }
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    function login(event) {
      if (!(event.which >= 16 && event.which <= 20)) {
        show("Since one or more selected lines has a comment, first remove any comments or move them to other lines.");
      }
    }
    /**
     * @param {!Object} data
     * @return {?}
     */
    function render(data) {
      var fn;
      var lines;
      var text = data.text;
      var commentColour = text.replace(/(?:\r\n|\r|\n)/g, "<br />");
      var h = moment(data.commentedOn).fromNow();
      var i = data.row;
      var id = data._id;
      var idx = data.index;
      /** @type {string} */
      var content = data.edited ? "(edited)" : "";
      var k = p[id] = data.collapsed || false;
      return options.editorOpts.canAddInlineComments && options.editorOpts.userId === data.userId ? lines = "inlineCommentActions" : options.editorOpts.assignmentViewOnly || (lines = "inlineCommentDismiss"), fn = callback(lines, {
        commentId : id,
        index : idx
      }), $.when(add(data.userId)).done(function(userInfo) {
        /** @type {!Object} */
        users[data.userId] = userInfo;
        var build = callback("inlineCommentTemplate", {
          comment : commentColour,
          avatar : userInfo.avatar,
          commentedOn : h,
          username : userInfo.username,
          commentId : id,
          edited : content,
          commentText : text,
          commentActions : fn
        });
        var container = dom.createElement("div");
        container.innerHTML = build;
        var w = {
          row : i,
          fixedWidth : true,
          el : container,
          _file : idx,
          _commentId : id,
          _text : text
        };
        /**
         * @return {undefined}
         */
        w.destroy = function() {
          session.widgetManager.removeLineWidget(w);
          map[idx][i] = void 0;
        };
        if (!k) {
          w = editor.session.widgetManager.addLineWidget(w);
        }
        widgets[id] = w;
        if (!map[idx]) {
          /** @type {!Array} */
          map[idx] = [];
        }
        map[idx][i] = w;
        editor.session.addGutterDecoration(i, "trinket-comment");
        if (k) {
          editor.session.addGutterDecoration(i, "collapsed");
        } else {
          editor.session.addGutterDecoration(i, "open");
        }
        editor.session.addGutterDecoration(i, "data-" + idx + "-" + id);
        $(w.el).find(".confirm-remove-comment").on("click", function(a) {
          w.destroy();
        });
      });
    }
    var modelist = tmp.require("ace/ext/modelist");
    var flags = modelist.getModeForPath("foo." + options.ext);
    var Range = tmp.require("ace/range").Range;
    var LineWidgets = tmp.require("ace/line_widgets").LineWidgets;
    var dom = tmp.require("ace/lib/dom");
    var editor = tmp.edit(node);
    /** @type {!Array} */
    var results = [];
    /** @type {!Array} */
    var releases = [];
    var users = {};
    /** @type {number} */
    editor.$blockScrolling = 1 / 0;
    editor.setTheme("ace/theme/xcode");
    editor.getSession().setMode(flags ? flags.mode : "ace/mode/text");
    editor.getSession().setUseSoftTabs(true);
    editor.getSession().setTabSize(2);
    editor.setShowPrintMargin(false);
    editor.setFontSize("inherit");
    editor._fileName = options.name;
    /** @type {boolean} */
    editor._addErrorBorder = false;
    var cmd = editor.commands.byName.del;
    var command = editor.commands.byName.backspace;
    var action = editor.commands.byName.removeline;
    if (editor.commands.addCommand({
      name : command.name,
      bindKey : command.bindKey,
      exec : function(e) {
        var pos = e.getSession().selection.getCursor();
        if (pos.column === 0 && pos.row > 0 && map[options.index] && map[options.index][pos.row] && (map[options.index][pos.row - 1] || e.getSession().getLine(pos.row - 1).length)) {
          show("Since this line has a comment, first remove the comment or move it to another line.");
        } else {
          $(".comment-warning").find(".close").click();
          command.exec.call(this, e);
        }
      }
    }), editor.commands.addCommand({
      name : cmd.name,
      bindKey : cmd.bindKey,
      exec : function(e) {
        var pos = e.getSession().selection.getCursor();
        var lineLen = e.getSession().getLine(pos.row).length;
        if (pos.column === lineLen && map[options.index]) {
          if (map[options.index][pos.row]) {
            show("Since this line has a comment, first remove the comment or move it to another line.");
          } else {
            if (map[options.index][pos.row + 1]) {
              show("Since the next line has a comment, first remove the comment or move it to another line.");
            }
          }
        } else {
          $(".comment-warning").find(".close").click();
          cmd.exec.call(this, e);
        }
      }
    }), editor.commands.addCommand({
      name : action.name,
      bindKey : action.bindKey,
      exec : function(e) {
        var cell_origin = e.getSession().selection.getCursor();
        if (map[options.index] && map[options.index][cell_origin.row]) {
          show("To remove lines with comments, first remove the comment or move it to another line.");
        } else {
          $(".comment-warning").find(".close").click();
          action.exec.call(this, e);
        }
      }
    }), editor.getSession().selection.on("changeCursor", function() {
      $(".comment-warning").find(".close").click();
    }), editor.getSession().selection.on("changeSelection", function(b) {
      if (map[options.index] && !editor.getSession().selection.isEmpty() && editor.getSession().selection.isMultiLine()) {
        var row;
        var new_current_req_range = editor.getSession().selection.getRange();
        /** @type {boolean} */
        var isReadOnly = false;
        row = new_current_req_range.start.row;
        for (; row <= new_current_req_range.end.row; row++) {
          if (map[options.index][row]) {
            /** @type {boolean} */
            isReadOnly = true;
          }
        }
        editor.setReadOnly(isReadOnly);
        if (isReadOnly) {
          if (!$(editor.textInput.getElement()).data("keydown-handler")) {
            $(editor.textInput.getElement()).on("keydown.trinket-comment", login);
            $(editor.textInput.getElement()).data("keydown-handler", true);
          }
        } else {
          if ($(editor.textInput.getElement()).data("keydown-handler")) {
            $(editor.textInput.getElement()).off("keydown.trinket-comment", login);
            $(editor.textInput.getElement()).removeData("keydown-handler");
          }
          $(".comment-warning").find(".close").click();
        }
      } else {
        editor.setReadOnly(false);
        if ($(editor.textInput.getElement()).data("keydown-handler")) {
          $(editor.textInput.getElement()).off("keydown.trinket-comment", login);
          $(editor.textInput.getElement()).removeData("keydown-handler");
        }
        $(".comment-warning").find(".close").click();
      }
    }), options.value && editor.getSession().setValue(options.value), options.onFocus && editor.on("focus", options.onFocus), options.comments && options.comments.length) {
      /**
       * @param {string} uuid
       * @return {?}
       */
      var add = function(uuid) {
        return users[uuid] ? $.Deferred().resolve(users[uuid]).promise() : $.get("/api/users/" + uuid + "/info");
      };
      var session = editor.session;
      if (!session.widgetManager) {
        session.widgetManager = new LineWidgets(session, {
          updateOnChange : fn.bind(editor, options.onCommentChange, options.onCommentRemove, options.index)
        });
        session.widgetManager.attach(editor);
      }
      /** @type {!Array} */
      var q = (session.getDocument().getLength(), []);
      /** @type {number} */
      var i = 0;
      for (; i < options.comments.length; i++) {
        q.push(render(options.comments[i]));
      }
      $.when.apply($, q).then(function() {
        get(session, options.index);
      });
    }
    return {
      registerPlugin : function(plugin, callback) {
        plugin.initialize(editor, callback);
      },
      destroy : function() {
        editor.destroy();
        $(node).empty();
      },
      addCommand : function(name, params, command) {
        editor.commands.addCommand({
          name : name,
          bindKey : params,
          exec : command
        });
      },
      change : function(callback) {
        var api = this;
        return editor.getSession().on("change", function() {
          api.removeMarkers();
          callback();
        });
      },
      setValue : function(path) {
        editor.setValue(path, -1);
      },
      getValue : function() {
        return editor.getValue();
      },
      focus : function(identifier) {
        return identifier === 0 ? editor.navigateFileStart() : identifier === -1 && editor.navigateFileEnd(), editor.focus();
      },
      blur : function() {
        editor.blur();
      },
      isFocused : function() {
        return editor.isFocused();
      },
      setModeFromName : function(name) {
        var flags = modelist.getModeForPath(name);
        var fileName = editor._fileName;
        /** @type {string} */
        editor._fileName = name;
        editor._emit("file.rename", {
          oldName : fileName,
          newName : name
        });
        editor.getSession().setMode(flags ? flags.mode : "ace/mode/text");
      },
      resize : function(a) {
        editor.resize(a);
      },
      highlight : function(to, str) {
        var indent = editor.getSession().getLine(to - 1);
        if (str) {
          results.push(to);
          /** @type {boolean} */
          editor._addErrorBorder = true;
        } else {
          var range = new Range(to - 1, 0, to - 1, indent.length);
          releases.push(editor.getSession().addMarker(range, "highlight-line-error", "fullLine"));
          $(".ace_content").addClass("attention-error");
        }
      },
      addQueueMarkers : function() {
        /** @type {number} */
        var i = 0;
        for (; i < results.length; i++) {
          this.highlight(results[i]);
        }
        /** @type {!Array} */
        results = [];
        if (editor._addErrorBorder) {
          $(".ace_content").addClass("attention-error");
          /** @type {boolean} */
          editor._addErrorBorder = false;
        }
      },
      removeMarkers : function() {
        /** @type {number} */
        var i = 0;
        for (; i < releases.length; i++) {
          editor.getSession().removeMarker(releases[i]);
        }
        /** @type {!Array} */
        releases = [];
        /** @type {!Array} */
        results = [];
      },
      getSession : function() {
        return editor.getSession();
      },
      setReadOnly : function(isReadOnly) {
        editor.setReadOnly(isReadOnly);
      },
      scrollToLine : function(line, center, animate, callback) {
        editor.scrollToLine(line, center, animate, callback);
      },
      aceInstance : editor,
      renderer : editor.renderer,
      keyBinding : editor.keyBinding,
      addCommentWidget : function() {
        var data;
        var e;
        var session;
        var self;
        var widget;
        var fakeInputElement;
        var userId = this.options.userId;
        /** @type {string} */
        var avatarUrl = "/api/users/" + userId + "/avatar";
        var inputUsername = $("#whoami").val();
        var key = options.index;
        return data = editor.getCursorPosition(), (e = _.findKey(widgets, function(r) {
          return r.row === data.row && r._file === key;
        })) ? (p[e] && $("div.ace_gutter-cell.trinket-comment.data-" + key + "-" + e).trigger("click"), void $("a.edit-inline-comment[data-comment-id='" + e + "']").trigger("click")) : (session = editor.session, session.widgetManager || (session.widgetManager = new LineWidgets(session, {
          updateOnChange : fn.bind(editor, options.onCommentChange, options.onCommentRemove, key)
        }), session.widgetManager.attach(editor)), editor.scrollToLine(data.row, true, true), self = dom.createElement("div"), self.innerHTML = callback("addInlineCommentTemplate", {
          avatar : avatarUrl,
          username : inputUsername,
          commentId : key + "_" + data.row,
          index : key
        }), widget = {
          row : data.row,
          fixedWidth : true,
          el : self,
          _file : key,
          _commentId : key + "_" + data.row
        }, widget.destroy = function() {
          session.widgetManager.removeLineWidget(widget);
          delete widgets[widget._commentId];
          get(session, widget._file);
        }, widget = session.widgetManager.addLineWidget(widget), widgets[widget._commentId] = widget, get(session, key), fakeInputElement = $(widget.el).find("textarea.inline-comment-text"), fakeInputElement.focus(), $(widget.el).find(".cancel-inline-comment").on("click", function(a) {
          widget.destroy();
        }), void $(widget.el).find(".save-inline-comment").on("click", function(canCreateDiscussions) {
          var text = fakeInputElement.val();
          var commentColour = text.replace(/(?:\r\n|\r|\n)/g, "<br />");
          var date = moment().subtract(2, "seconds");
          var message = editor._fileName + widget.row + date;
          var id = CryptoJS.MD5(message).toString(CryptoJS.enc.Hex).substring(0, 16);
          var composition = callback("inlineCommentActions", {
            commentId : id,
            index : key
          });
          var value = callback("inlineCommentTemplate", {
            comment : commentColour,
            avatar : avatarUrl,
            username : inputUsername,
            commentedOn : date.fromNow(),
            commentText : text,
            commentActions : composition,
            commentId : id
          });
          var sandbox = dom.createElement("div");
          sandbox.innerHTML = value;
          $(document).foundation("dropdown", "reflow");
          var w = {
            row : widget.row,
            fixedWidth : true,
            el : sandbox,
            _file : key,
            _commentId : id,
            _text : text
          };
          /**
           * @return {undefined}
           */
          w.destroy = function() {
            session.widgetManager.removeLineWidget(w);
            map[key][w.row] = void 0;
          };
          widget.destroy();
          w = editor.session.widgetManager.addLineWidget(w);
          editor.session.addGutterDecoration(w.row, "trinket-comment");
          editor.session.addGutterDecoration(w.row, "open");
          editor.session.addGutterDecoration(w.row, "data-" + key + "-" + id);
          widgets[id] = w;
          /** @type {boolean} */
          p[id] = false;
          if (!map[key]) {
            /** @type {!Array} */
            map[key] = [];
          }
          map[key][w.row] = w;
          get(session, key);
          $(node).trigger("comment.added", {
            row : w.row,
            text : text,
            commentedOn : date,
            _id : id,
            fileName : editor._fileName,
            index : options.index,
            userId : userId,
            edited : false,
            collapsed : false
          });
          $(node).find(".confirm-remove-comment").on("click", function(a) {
            w.destroy();
          });
        }));
      }
    };
  }
  /**
   * @param {?} Brewer
   * @param {!Object} req
   * @return {?}
   */
  function exports(Brewer, req) {
    var attr = {
      value : req.value
    };
    return {
      registerPlugin : function(name, init) {
      },
      destroy : function() {
      },
      addCommand : function(fn, command, params) {
      },
      change : function(callback) {
        callback();
      },
      setValue : function(val) {
        return attr.value = val, val;
      },
      getValue : function() {
        return attr.value;
      },
      focus : function() {
      },
      blur : function() {
      },
      isFocused : function() {
        return false;
      },
      setModeFromName : function(rawObject) {
      },
      resize : function() {
      },
      highlight : function(str) {
      },
      addQueueMarkers : function() {
      }
    };
  }
  /**
   * @param {?} href
   * @param {!Object} fn
   * @return {?}
   */
  function link(href, fn) {
    var d;
    var attr = {
      value : fn.value
    };
    return d = $("<img />", {
      src : fn.value
    }), $(href).html(d), {
      registerPlugin : function(name, init) {
      },
      destroy : function() {
      },
      addCommand : function(fn, command, params) {
      },
      change : function(callback) {
        callback();
      },
      setValue : function(val) {
        return attr.value = val, val;
      },
      getValue : function() {
        return attr.value;
      },
      focus : function() {
      },
      blur : function() {
      },
      isFocused : function() {
        return false;
      },
      setModeFromName : function(rawObject) {
      },
      resize : function() {
      },
      highlight : function(str) {
      },
      addQueueMarkers : function() {
      }
    };
  }
  /**
   * @param {string} key
   * @param {string} type
   * @param {number} i
   * @param {?} objs
   * @return {undefined}
   */
  function move(key, type, i, objs) {
    var widget = widgets[type];
    var row = widget.row;
    var session = this._files[key].editor.getSession();
    session.removeGutterDecoration(row, "trinket-comment");
    session.removeGutterDecoration(row, "data-" + key + "-" + type);
    session.addGutterDecoration(i, "trinket-comment");
    session.addGutterDecoration(i, "data-" + key + "-" + type);
    if (p[type]) {
      session.removeGutterDecoration(row, "collapsed");
      session.addGutterDecoration(i, "collapsed");
    } else {
      session.removeGutterDecoration(row, "open");
      session.addGutterDecoration(i, "open");
    }
    if (objs) {
      /** @type {number} */
      widget.row = i;
    } else {
      session.widgetManager.removeLineWidget(widget);
      /** @type {number} */
      widget.row = i;
      session.widgetManager.addLineWidget(widget);
      if (!map[key]) {
        /** @type {!Array} */
        map[key] = [];
      }
      map[key][row] = void 0;
      map[key][i] = widget;
    }
    get(session, key);
    this._updateComment({
      _id : type,
      index : key,
      data : {
        row : i
      }
    });
  }
  /**
   * @param {?} a
   * @param {number} b
   * @return {?}
   */
  function contains(a, b) {
    return _.findKey(widgets, function(config) {
      return config._file === a && config.row === b;
    });
  }
  /**
   * @param {!Object} session
   * @param {string} obj
   * @return {undefined}
   */
  function get(session, obj) {
    var columnsLength = session.getDocument().getLength();
    _.each(widgets, function(options, canCreateDiscussions) {
      if (options._file === obj) {
        if (!options.row || contains(options._file, options.row - 1)) {
          $(options.el).find(".move-comment-up").addClass("disabled");
        } else {
          $(options.el).find(".move-comment-up").removeClass("disabled");
        }
        if (columnsLength - 1 === options.row || contains(options._file, options.row + 1)) {
          $(options.el).find(".move-comment-down").addClass("disabled");
        } else {
          $(options.el).find(".move-comment-down").removeClass("disabled");
        }
      }
    });
  }
  var callback = can["import"]("utils.template");
  var results = {};
  var widgets = {};
  var p = {};
  /** @type {!Array} */
  var map = [];
  var tests = {};
  var keys = {
    Enter : {
      keyCodes : [10, 13]
    },
    Ctrl : "ctrlKey",
    Shift : "shiftKey"
  };
  var cmd_arg_element = $('<div class="code-editor" data-interface="code-editor"><div class="tab-nav"><dl class="left-options"><dd class="tab-button"><a class="tab-scroll-link left-arrow" data-direction="-1"><i class="fa fa-chevron-left"></i></a></dd><dd class="tab-button"><a class="tab-scroll-link right-arrow" data-direction="1"><i class="fa fa-chevron-right"></i></a></dd></dl><dl class="scrollable-content" role="tablist" aria-label="File tabs"></dl><dl class="right-options"></dl><div class="clearfix"></div></div><div class="file-content-container"></div><div class="info-area collapsed"><div class="info-quick"></div><div class="scroll-wrap"><div class="info-full"></div></div><a class="expander fa"></a></div></div>');
  var stubGraphDiv = $('<div class="file-content"></div>');
  var v = $('<div class="binary-file"><div><p>This is a binary file created by your program. It is not viewable and will not be saved with your trinket.</p></div></div>');
  var featureElementTemplate = $('<div class="tab-options" role="button"><ul><li><a class="file-remove-link menu-button" data-action="file.remove"><i class="fa fa-trash"></i></a></li><li><a class="file-rename-link menu-button" data-action="file.rename"><i class="fa fa-pencil"></i></a></li></ul></div>');
  var filter = callback.compile('<dd class="tab"><a class="file-tab-link" aria-label="{{name}} tab" role="tab"><span class="file-name">{{name}}</span><span class="tab-options-link menu-button" data-action="file.options" role="button" tabindex="0"></span></a></dd>');
  var helpTpl = callback.compile('<input type="text" class="file-name-input" value="{{name}}" placeholder="file name" aria-label="Edit {{name}} filename">');
  var extend = callback.compile('<div data-alert class="file-name-error alert-box alert">{{message}}<a class="close">&times;</a></div>');
  var reject = callback.compile('<div data-alert class="file-remove-info alert-box info" data-interface="code-editor">The file "{{name}}" has been deleted. <a class="file-restore-link menu-button" data-action="file.restore">Undo</a><a class="close menu-button" data-action="file-undo.close">&times;</a></div>');
  var template = callback.compile('<div data-alert class="comment-warning alert-box info">{{message}}<a class="close"><i class="fa fa-times-circle"></i></a></div>');
  /** @type {string} */
  var $closingAreaRight = "click.trinket-code-editor.tab-select";
  /** @type {string} */
  var PROCESS_MESSAGE = "mousedown.trinket-code-editor.scroll-tabs-start touchstart.trinket-code-editor.scroll-tabs-start";
  /** @type {string} */
  var selectedPF = "mouseup.trinket-code-editor.scroll-tabs-stop touchend.trinket-code-editor.scroll-tabs-stop";
  /** @type {string} */
  var THREAD_STARTED = "click.trinket-code-editor.add-file";
  /** @type {string} */
  var THREAD_STOPPED_AT = "click.trinket-code-editor.upload-file";
  /** @type {string} */
  var THREAD_FINISHED = "click.trinket-code-editor.view-assets";
  /** @type {string} */
  var CLICK = "click.trinket-code-editor.tab-options-open";
  /** @type {string} */
  var EVENT_PICK = "mousedown.trinket-code-editor.tab-options-close";
  /** @type {string} */
  var $closingAreaLeft = "click.trinket-code-editor.edit-file-name";
  /** @type {string} */
  var collapseEvent = "click.trinket-code-editor.remove-file";
  /** @type {string} */
  var firstValidEvent = "click.trinket-code-editor.hide-file";
  /** @type {string} */
  var CLASS_SELECT_ICON = ".fa.fa-exclamation-circle.warning";
  /** @type {string} */
  var O = "fa fa-exclamation-circle warning";
  var linkCont = $('<dd class="tab-button" title=\'Create text file\'><a class="add-file-link menu-button" data-action="file.add" aria-label="Add new file" role="button"><i class="fa fa-plus"></i></a></dd>');
  var header = $('<dd class="tab-button" title=\'Add comment to current line\'><a class="add-inline-comment menu-button" data-action="inline-comment.add"><i class="fa fa-comment"></i></a></dd>');
  /** @type {string} */
  var triggerHideEvent = "click.trinket-code-editor.add-inline-comment";
  var table = $('<dd class="tab-button" title=\'Upload text file\'><a class="upload-file-link menu-button" data-action="file.upload" aria-label="Upload text file" role="button"><i class="fa fa-upload"></i></a></dd>');
  var e = $("<form id='file-upload-form'><input type='file' name='file-upload' id='file-upload' class='hidden' tabindex='-1'></form>");
  var widget = {
    options : {
      selectedLine : -1,
      selectedClass : "lineselect",
      noEditor : false,
      state : "",
      defaultFileExt : "txt",
      mainFileName : "main.py",
      mainEditable : false,
      mainSuffix : null,
      showTabs : false,
      addFiles : true,
      showInfo : false,
      assets : false,
      assetsHowTo : "",
      acceptedFiles : "",
      onFocus : function() {
      },
      lang : "",
      owner : false,
      canHideTabs : false,
      canAddInlineComments : false,
      userId : null,
      disableAceEditor : false,
      assignmentViewOnly : false
    },
    _create : function() {
      var self = this;
      if (tmp) {
        tmp.require("ace/line_widgets").LineWidgets;
      } else {
        (function() {
        });
      }
      if (this._editor, this._commands = [], this._plugins = [], this._files = [], this.element.empty(), this.element.append(cmd_arg_element.clone()), this.options.addFiles && (this.element.find("dl.right-options").append(linkCont), window.FileReader && (this.element.find("dl.right-options").append(table), this.element.append(e), $("#file-upload").change(function() {
        var file = $("#file-upload")[0].files[0];
        if (!file.type || file.type.match(/text.*/)) {
          /** @type {!FileReader} */
          var reader = new FileReader;
          /**
           * @return {undefined}
           */
          reader.onload = function() {
            self.addFile({
              name : file.name,
              content : reader.result
            }, {
              override : true
            });
            if (self._onChange) {
              self._onChange();
            }
            self._selectTab(self._files.length - 1);
            $("#file-upload-form").get(0).reset();
          };
          /**
           * @return {undefined}
           */
          reader.onerror = function() {
            self.element.find(".tab-nav").after(extend({
              message : "There was a problem reading your file. Please try again."
            }));
            $(document).foundation("alert", "reflow");
            $("#file-upload-form").get(0).reset();
          };
          reader.readAsText(file);
        } else {
          self.element.find(".tab-nav").after(extend({
            message : "Only text files are currently supported."
          }));
          $(document).foundation("alert", "reflow");
        }
      }))), this.options.canAddInlineComments && this.element.find("dl.right-options").append(header), this.$tabOptions = featureElementTemplate.clone(), this.options.canHideTabs && this.$tabOptions.find("ul").append('<li><a class="file-hide-link menu-button" data-action="file.hide" title="toggle tab visibility"><i class="fa fa-eye"></i></a></li>'), $("body").append(this.$tabOptions), this.$tabBar = this.element.find(".scrollable-content"), this.$tabBar.on($closingAreaRight, ".tab", function(canCreateDiscussions) {
        if (!$(this).hasClass("active")) {
          var i = $(this).index();
          return self._files[i].editor.addQueueMarkers(), self._selectTab(i);
        }
      }), this.$contentWrapper = this.element.find(".file-content-container"), this.element.find(".tab-scroll-link").on(PROCESS_MESSAGE, function() {
        self._scrollTabBar($(this).data("direction"));
      }), this.element.find(".add-file-link").parent().on(THREAD_STARTED, function() {
        if (window.TrinketAPI._receiverBroadcastState != "BROADCASTING") {
          self.addFile("");
          self._selectTab(self.$tabBar.children().length - 1, true);
          self._editFileName();
        }
      }), this.element.find(".upload-file-link").parent().on(THREAD_STOPPED_AT, function() {
        if (window.TrinketAPI._receiverBroadcastState != "BROADCASTING") {
          $("#file-upload").trigger("click");
        }
      }), this.element.find(".add-inline-comment").parent().on(triggerHideEvent, function() {
        self._addCommentWidget();
      }), this.element.on(CLICK, ".tab-options-link", function(canCreateDiscussions) {
        if (self.$tabOptions.hasClass("open")) {
          self._closeOptionsMenu();
        } else {
          var itemElement = $(this).closest(".tab");
          if ($(itemElement).hasClass("main-editable")) {
            self.$tabOptions.find(".file-remove-link").hide();
            if (self.options.canHideTabs) {
              self.$tabOptions.find(".file-hide-link").hide();
            }
          } else {
            if ($(itemElement).data("binary")) {
              self.$tabOptions.find(".file-rename-link").hide();
              if (self.options.canHideTabs) {
                self.$tabOptions.find(".file-hide-link").hide();
              }
            } else {
              self.$tabOptions.find(".file-remove-link").show();
              if (self.options.canHideTabs) {
                self.$tabOptions.find(".file-hide-link").show();
              }
            }
          }
          var anchorBoundingBoxViewport = $(this).offset();
          self.$tabOptions.css("left", anchorBoundingBoxViewport.left - 10 + "px");
          self.$tabOptions.css("top", anchorBoundingBoxViewport.top + $(this).height() + 10 + "px");
          self.$tabOptions.addClass("open");
          self.element.on(EVENT_PICK, function(jEvent) {
            if (!$(jEvent.target).hasClass("tab-options-link")) {
              self._closeOptionsMenu();
            }
          });
        }
      }), this.$tabOptions.find(".file-rename-link").on($closingAreaLeft, function() {
        self._closeOptionsMenu();
        if (window.TrinketAPI._receiverBroadcastState != "BROADCASTING") {
          if (!$(".file-name-input").length) {
            self._editFileName();
          }
        }
      }), this.$tabOptions.find(".file-remove-link").on(collapseEvent, function() {
        self._closeOptionsMenu();
        if (window.TrinketAPI._receiverBroadcastState != "BROADCASTING") {
          self._removeFile({
            undo : true
          });
        }
      }), this.$tabOptions.find(".file-hide-link").on(firstValidEvent, function() {
        self._closeOptionsMenu();
        self._toggleFile();
      }), this.options.assets) {
        /** @type {!Array} */
        var mediaParam = ["image"];
        if (this.options.lang === "pygame") {
          mediaParam.push("audio", ".ttf");
        }
        this.$assetBrowser = $('<div class="file-content fixed-right"></div>').assetBrowser({
          modalParent : ".trinket-content-wrapper",
          libraryUrl : "/api/users/assets?type=" + mediaParam.join(","),
          assets : this.options.assets,
          openClass : "active",
          assetsHowTo : this.options.assetsHowTo,
          guest : this.options.guest,
          lang : this.options.lang,
          acceptedFiles : this.options.acceptedFiles
        });
        this.element.find(".right-options").append('<dd class="tab" title=\'Manage images\'><a class="file-tab-link add-asset-link" data-action="assets.view" title="View and Add Images"><i class="fa fa-file-image-o"></i></a></dd>');
        this.assetBrowser = this.$assetBrowser.data("trinket-assetBrowser");
        this.assetBrowser.hide();
        this.element.find(".tab-nav").addClass("allow-assets");
        this.$contentWrapper.append(this.$assetBrowser);
        this.element.find(".add-asset-link").parent().on(THREAD_FINISHED, function() {
          var brandToggle = $(this);
          if (!brandToggle.hasClass("active")) {
            self._selectTab(-1, true);
            brandToggle.addClass("active");
            self.assetBrowser.show();
          }
        });
      }
      if (!this.options.showTabs) {
        self.element.addClass("tabless");
      }
      if (this.options.showInfo) {
        self.element.addClass("with-info");
      }
      if (this.options.state) {
        this._loadState(this.options.state);
      }
      $(document).on("SkfileWrite", function(event) {
        var i;
        var node;
        var candidate;
        var part;
        var prefix;
        var path;
        var global;
        node = event.originalEvent.data.split(":");
        candidate = node[0];
        part = node.slice(1).join(":");
        /** @type {number} */
        i = 0;
        for (; i < self._files.length; i++) {
          if (self._files[i].name === candidate) {
            prefix = self._files[i].editor.getValue();
            path = prefix.length ? prefix + part : part;
            $('textarea[name="' + self._files[i].name + '"]').val(path);
            if (self.$contentWrapper.children().eq(i).hasClass("active")) {
              self._files[i].editor.setValue(path);
            } else {
              self._files[i].editor.destroy();
              global = stubGraphDiv.clone();
              self._files[i].editor = init(global[0], {
                onFocus : function() {
                },
                ext : self._files[i].name.split(".").pop() || self.options.defaultFileExt,
                index : i
              });
              self._files[i].editor.setValue(path);
              self.$contentWrapper.children().eq(i).replaceWith(global);
            }
          }
        }
      });
      $(document).on("SkfileOpen", function(event) {
        var i;
        var inputel;
        var global;
        var rawParams = event.originalEvent.data.split(":");
        var p = rawParams[0];
        var name = rawParams.slice(1).join(":");
        var namecache = {};
        self._files.map(function(o, undefined) {
          namecache[o.name] = undefined;
        });
        if (typeof namecache[name] === "undefined") {
          self.addFile({
            name : name
          });
          if (p === "w") {
            inputel = $("<textarea>", {
              id : name,
              name : name
            });
            inputel.val("\n");
            $("body").append(inputel);
          }
        } else {
          if (p === "w") {
            i = namecache[name];
            $('textarea[name="' + self._files[i].name + '"]').val("\n");
            if (self.$contentWrapper.children().eq(i).hasClass("active")) {
              self._files[i].editor.setValue("");
            } else {
              self._files[i].editor.destroy();
              global = stubGraphDiv.clone();
              self._files[i].editor = init(global[0], {
                onFocus : function() {
                },
                ext : self._files[i].name.split(".").pop() || self.options.defaultFileExt,
                index : i
              });
              self.$contentWrapper.children().eq(i).replaceWith(global);
            }
          }
        }
      });
      $(document).on("comment.added", ".file-content", function(a, loggedIn) {
        self._addComment(loggedIn);
      });
      $(document).on("click", ".edit-inline-comment", function(b) {
        var i = $(this).data("comment-id");
        var text = widgets[i]._text;
        $("#comment-container-" + i).addClass("hide");
        $("#edit-comment-container-" + i).removeClass("hide");
        $("textarea#edit-inline-comment-" + i).val(text);
        $("a[data-dropdown='comment-actions-" + i + "']").addClass("hide");
        $("#update-comment-container-" + i).removeClass("hide");
      });
      $(document).on("click", ".cancel-update-comment", function(b) {
        var articleIndex = $(this).data("comment-id");
        $("a[data-dropdown='comment-actions-" + articleIndex + "']").removeClass("hide");
        $("#update-comment-container-" + articleIndex).addClass("hide");
        $("#comment-container-" + articleIndex).removeClass("hide");
        $("#edit-comment-container-" + articleIndex).addClass("hide");
      });
      $(document).on("click", ".update-comment", function(canCreateDiscussions) {
        var i = $(this).data("comment-id");
        var fileIndex = $(this).data("file-index");
        var theText = $("textarea#edit-inline-comment-" + i).val();
        var formattedChosenQuestion = theText.replace(/(?:\r\n|\r|\n)/g, "<br />");
        widgets[i]._text = theText;
        $("#comment-container-" + i).html(formattedChosenQuestion);
        $("a[data-dropdown='comment-actions-" + i + "']").removeClass("hide");
        $("#update-comment-container-" + i).addClass("hide");
        $("#comment-container-" + i).removeClass("hide");
        $("#edit-comment-container-" + i).addClass("hide");
        self._updateComment({
          _id : i,
          index : fileIndex,
          data : {
            text : theText,
            edited : true
          }
        });
      });
      $(document).on("click", ".confirm-remove-inline-comment", function(b) {
        var commentId = $(this).data("comment-id");
        $("a[data-dropdown='comment-actions-" + commentId + "']").addClass("hide");
        $("#confirm-remove-comment-container-" + commentId).removeClass("hide");
      });
      $(document).on("click", ".cancel-remove-comment", function(b) {
        var commentId = $(this).data("comment-id");
        $("a[data-dropdown='comment-actions-" + commentId + "']").removeClass("hide");
        $("#confirm-remove-comment-container-" + commentId).addClass("hide");
      });
      $(document).on("click", ".confirm-remove-comment", function(canCreateDiscussions) {
        var name = $(this).data("comment-id");
        var i = $(this).data("file-index");
        var cell_origin = widgets[name];
        self._files[i].editor.getSession().removeGutterDecoration(cell_origin.row, "trinket-comment");
        self._files[i].editor.getSession().removeGutterDecoration(cell_origin.row, "data-" + i + "-" + name);
        if (p[name]) {
          self._files[i].editor.getSession().removeGutterDecoration(cell_origin.row, "collapsed");
        } else {
          self._files[i].editor.getSession().removeGutterDecoration(cell_origin.row, "open");
        }
        widgets[name].destroy();
        delete widgets[name];
        map[i][cell_origin.row] = void 0;
        get(self._files[i].editor.getSession(), i);
        self._removeComment({
          _id : name,
          index : i
        });
      });
      $(document).on("click", ".ace_gutter-cell.trinket-comment", function(jEvent) {
        var d;
        var k;
        var key;
        var i;
        var position;
        var type = $(jEvent.target).attr("class").split(" ");
        d = _.find(type, function(pathToDestinationFile) {
          return /^data/.test(pathToDestinationFile);
        });
        k = d.split("-");
        key = k[1];
        i = k[2];
        position = widgets[i];
        var session = self._files[key].editor.getSession();
        if (p[i]) {
          session.widgetManager.addLineWidget(widgets[i]);
          /** @type {boolean} */
          p[i] = false;
          session.removeGutterDecoration(position.row, "collapsed");
          session.addGutterDecoration(position.row, "open");
        } else {
          session.widgetManager.removeLineWidget(widgets[i]);
          /** @type {boolean} */
          p[i] = true;
          session.removeGutterDecoration(position.row, "open");
          session.addGutterDecoration(position.row, "collapsed");
        }
        self._updateComment({
          _id : i,
          index : key,
          data : {
            collapsed : p[i]
          }
        });
      });
      $(document).on("click", ".comment-actions.comment-dismiss", function(canCreateDiscussions) {
        var j = $(this).data("comment-id");
        var i = $(this).data("file-index");
        var w = widgets[j];
        self._files[i].editor.getSession().removeGutterDecoration(w.row, "trinket-comment");
        self._files[i].editor.getSession().removeGutterDecoration(w.row, "data-" + i + "-" + j);
        if (p[j]) {
          self._files[i].editor.getSession().removeGutterDecoration(w.row, "collapsed");
        } else {
          self._files[i].editor.getSession().removeGutterDecoration(w.row, "open");
        }
        widgets[j].destroy();
        delete widgets[j];
        self._removeComment({
          _id : j,
          index : i
        });
      });
      $(document).on("click", ".move-comment-up", function(canCreateDiscussions) {
        if (!$(this).hasClass("disabled")) {
          var i = $(this).data("comment-id");
          var ext = $(this).data("file-index");
          var w = widgets[i];
          /** @type {number} */
          var window = (w.row, w.row - 1);
          move.call(self, ext, i, window);
        }
      });
      $(document).on("click", ".move-comment-down", function(canCreateDiscussions) {
        if (!$(this).hasClass("disabled")) {
          var i = $(this).data("comment-id");
          var ext = $(this).data("file-index");
          var w = widgets[i];
          var window = (w.row, w.row + 1);
          move.call(self, ext, i, window);
        }
      });
      $("#outputContainer").keyup(function(event) {
        if (event.shiftKey && event.keyCode === 9) {
          event.preventDefault();
          self.focus();
        }
      });
    },
    _closeOptionsMenu : function() {
      this.element.off(EVENT_PICK);
      this.$tabOptions.removeClass("open");
    },
    _loadState : function(val) {
      var i;
      try {
        if (val = JSON.parse(val), !Array.isArray(val)) {
          throw new Error;
        }
      } catch (c) {
        /** @type {!Array} */
        val = [{
          name : this.options.mainFileName,
          content : val || ""
        }];
      }
      /** @type {number} */
      i = 0;
      for (; i < val.length; i++) {
        this.addFile(val[i]);
      }
      this._selectTab(0, true);
    },
    _getCurrentVisibleTab : function() {
      var a = this.$tabBar.find(".tab.active").first();
      var t = (this.$contentWrapper.find(".file-content.active").first(), a.index());
      var componentFileName = a.find(".file-name").text();
      return {
        tabIndex : t,
        fileName : componentFileName
      };
    },
    _selectTab : function(i, tab) {
      this.element.find(".tab.active, .file-content.active").removeClass("active");
      if (this._editor) {
        this._editor.blur();
      }
      if (void 0 !== i && this._files[i]) {
        this.$tabBar.children().eq(i).addClass("active");
        this.$contentWrapper.children().eq(i).addClass("active");
        this._editor = this._files[i].editor;
        if (!tab) {
          this._editor.focus();
        }
        this.element.trigger({
          type : "codeeditor.tabChanged",
          tabIndex : i
        });
        if (this._files[i].binary) {
          this.element.find(".add-inline-comment").addClass("disabled");
        } else {
          this.element.find(".add-inline-comment").removeClass("disabled");
        }
      } else {
        this.element.find(".add-inline-comment").addClass("disabled");
      }
    },
    _editFileName : function() {
      if (window.TrinketAPI._receiverBroadcastState != "BROADCASTING") {
        var self = this;
        var c = self.$tabBar.find(".tab.active");
        var d = c.find(".file-name");
        var text = d.text();
        var length = text.length;
        var element = $(helpTpl({
          name : text
        }));
        var keyboardHeight = d.outerWidth();
        if (c.hasClass("main-editable")) {
          if (!self.options.mainEditable) {
            return;
          }
          if (self.options.mainSuffix) {
            /** @type {number} */
            length = length - self.options.mainSuffix.length;
          }
        }
        d.hide();
        element.css("width", keyboardHeight + "px");
        d.after(element);
        element.focus();
        element[0].setSelectionRange(0, length);
        element.on("blur", function(canCreateDiscussions) {
          var fold;
          var data = element.val().replace(/^\s|\s$/g, "");
          return $(".file-name-error").remove(), data.length ? (data.length > 50 ? fold = "File names must be less than 50 characters, please choose a shorter name." : self.options.lang !== "python" && self.options.lang !== "python3" || !data.match(/\.py$/) || data.match(/^[\w][\w0-9]*(\.[a-z]+)?$/) ? data.match(/^\w[\w\.\-]*$/) ? $("#" + data).length ? fold = "The name '" + data + "' is reserved, please choose a different name." : data.toLowerCase() !== text.toLowerCase() && self.$tabBar.find(".file-name").each(function() {
            return $(this).text().toLowerCase() === data.toLowerCase() ? (fold = 'There is already a file named "' + data + '", please choose a different name.', false) : void 0;
          }) : fold = "File names must start with a letter, number, or underscore followed by zero or more letters, numbers, underscores, hyphens, and periods." : fold = "Python file names must start with a letter or underscore followed by zero or more letters, digits and underscores.", void(fold ? (self.element.find(".tab-nav").after(extend({
            message : fold
          })), $(document).foundation("alert", "reflow"), $(this).focus(), this.setSelectionRange(0, data.length)) : (d.text(data), d.show(), $(this).remove(), self._files[c.index()].name = data, self._onChange && self._onChange(), self._files[c.index()].editor.setModeFromName(data), self.element.trigger({
            type : "codeeditor.fileRenamed",
            oldFileName : text,
            newFileName : data,
            newFile : self._files[c.index()]
          })))) : void self._removeFile({
            undo : false
          });
        });
        element.on("keydown", function(event) {
          if (event.keyCode === 10 || event.keyCode === 13) {
            $(this).blur();
          } else {
            if (event.keyCode === 27) {
              element.val(text);
              $(this).blur();
            }
          }
        });
      }
    },
    _removeFile : function(spec) {
      var that = this;
      var d = this.$tabBar.find(".tab.active").first();
      var tomove = this.$contentWrapper.find(".file-content.active").first();
      var i = origIndex = d.index();
      var fontFileName = d.find(".file-name").text();
      var relevance_tab = $(reject({
        name : fontFileName
      }));
      var me = this._files.splice(origIndex, 1)[0];
      /** @type {boolean} */
      var j = origIndex === this._files.length;
      /** @type {number} */
      var autoResumeTimer = setTimeout(function() {
        relevance_tab.find(".close").click();
      }, 15e3);
      /**
       * @return {undefined}
       */
      var success = function() {
        clearTimeout(autoResumeTimer);
        me = void 0;
        d = void 0;
        tomove = void 0;
        if (relevance_tab) {
          relevance_tab.remove();
          relevance_tab = void 0;
        }
      };
      d.detach();
      tomove.detach();
      if (j) {
        /** @type {number} */
        i = i - 1;
      }
      this._selectTab(i);
      if (this._onChange && !me.binary) {
        this._onChange();
      }
      if (spec.undo || me.editor.getValue().length) {
        this.element.find(".tab-nav").after(relevance_tab);
        relevance_tab.find(".close").on("click", function() {
          me.editor.destroy();
          that.element.trigger({
            type : "codeeditor.fileRemoved",
            fileName : fontFileName
          });
        });
        $(".file-restore-link").on("click", function() {
          that._files.splice(origIndex, 0, me);
          if (j) {
            that.$tabBar.append(d);
            that.$contentWrapper.children().eq(i).after(tomove);
          } else {
            that.$tabBar.children().eq(i).before(d);
            that.$contentWrapper.children().eq(i).before(tomove);
          }
          that._selectTab(origIndex);
          success();
          if (that._onChange && !me.binary) {
            that._onChange();
          }
        });
        $(document).one("close.fndtn.alert-box", function(a) {
          success();
        });
        if ($(".file-name-error").length) {
          $(".file-name-error").remove();
        }
        $(document).foundation("alert", "reflow");
      }
    },
    _toggleFile : function() {
      var that = this;
      var c = that.$tabBar.find(".tab.active");
      if (typeof that._files[c.index()].hidden === "undefined") {
        /** @type {boolean} */
        that._files[c.index()].hidden = true;
      } else {
        /** @type {boolean} */
        that._files[c.index()].hidden = !that._files[c.index()].hidden;
      }
      if (that._files[c.index()].hidden) {
        c.find(".file-name").addClass("hidden-file-indicator");
        $('<i class="fa fa-eye-slash file-icon"></i>').insertBefore(c.find(".file-name"));
      } else {
        c.find(".file-name").removeClass("hidden-file-indicator");
        c.find(".file-name").prev("i").remove();
      }
      if (that._onChange) {
        that._onChange();
      }
    },
    _scrollTabBar : function(a) {
      var _takingTooLongTimeout;
      var cameraeased;
      var vThis = this;
      /** @type {number} */
      var moveTime = 300;
      /** @type {number} */
      var prevMoveTime = 50;
      /** @type {string} */
      var easing = "swing";
      /** @type {boolean} */
      var i = false;
      var $responders = vThis.$tabBar.children();
      if (a < 0) {
        $responders = $($responders.get().reverse());
      }
      $(document).one(selectedPF, function() {
        /** @type {boolean} */
        i = true;
        clearTimeout(_takingTooLongTimeout);
      });
      (cameraeased = function() {
        /** @type {boolean} */
        var k = true;
        $responders.each(function() {
          var b = $(this).position().left;
          return a > 0 && (b = b + $(this).outerWidth()), (a > 0 && b > 10 || a < 0 && b < -10) && (vThis.$tabBar.animate({
            scrollLeft : "+=" + b
          }, 200, easing, function() {
            if (!i) {
              /** @type {number} */
              moveTime = Math.max(0, moveTime - prevMoveTime);
              if (!moveTime) {
                /** @type {string} */
                easing = "linear";
              }
              /** @type {number} */
              _takingTooLongTimeout = setTimeout(cameraeased, moveTime);
            }
          }), k = false), k;
        });
      })();
    },
    _addCommentWidget : function() {
      var meta = this._getCurrentVisibleTab();
      if (meta.tabIndex >= 0) {
        this._files[meta.tabIndex].editor.addCommentWidget.call(this);
      }
    },
    _addComment : function(comment) {
      this._files[comment.index].comments.push(comment);
      if (this._onChange) {
        this._onChange();
      }
    },
    _removeComment : function(contact) {
      this._files[contact.index].comments = _.filter(this._files[contact.index].comments, function(selectedContact) {
        return selectedContact._id !== contact._id;
      });
      if (this._onChange) {
        this._onChange();
      }
    },
    _updateComment : function(f) {
      _.find(this._files[f.index].comments, function(value) {
        if (value._id === f._id) {
          value = _.extend(value, f.data);
        }
      });
      if (this._onChange) {
        this._onChange();
      }
    },
    resize : function(a) {
      /** @type {number} */
      var i = 0;
      for (; i < this._files.length; i++) {
        this._files[i].editor.resize(a);
      }
    },
    assets : function(assets) {
      return this.options.assets ? this.assetBrowser.assets(assets) : [];
    },
    addFile : function(opts, options) {
      var filename;
      var $tab;
      var node;
      var me;
      var i;
      var doc;
      var visible;
      var attrs;
      var n;
      var allSourceComments;
      var bin;
      var type;
      var self = this;
      /** @type {string} */
      var active = "";
      /** @type {string} */
      var status = "";
      var key = this._files.length;
      /** @type {boolean} */
      var andTmp = true;
      var e = options && options.override ? options.override : false;
      if (typeof jQueryXDomainRequest !== "undefined" && jQueryXDomainRequest && (andTmp = false), typeof opts === "string" && (opts = {
        name : opts
      }), filename = opts.name, status = opts.type || filename.split(".").pop(), active = opts.content || "", visible = opts.hidden, allSourceComments = opts.comments || [], bin = opts.binary || false, $tab = $(filter({
        name : filename
      })), node = stubGraphDiv.clone(), self.$tabBar.find(".file-name").each(function(objectkey) {
        if ($(this).text().toLowerCase() === filename.toLowerCase()) {
          /** @type {boolean} */
          n = true;
          key = objectkey;
        }
      }), n && e) {
        return $('textarea[name="' + self._files[key].name + '"]').val(active), self.$contentWrapper.children().eq(key).hasClass("active") ? self._files[key].editor.setValue(active) : opts.binary ? (self._files[key].editor = exports(node[0], {
          value : active
        }), node.html(v), self.$contentWrapper.children().eq(key).replaceWith(node)) : (self._files[key].editor.destroy(), self._files[key].editor = init(node[0], {
          onFocus : function() {
          },
          ext : self._files[key].name.split(".").pop() || self.options.defaultFileExt,
          name : filename,
          value : active,
          index : key
        }), self._files[key].editor.setValue(active), self.$contentWrapper.children().eq(key).replaceWith(node)), this._files[key];
      }
      if (visible && (self.options.owner && self.options.canHideTabs ? ($tab.find(".file-name").addClass("hidden-file-indicator"), $('<i class="fa fa-eye-slash file-icon"></i>').insertBefore($tab.find(".file-name"))) : $tab.hide()), this.options.noEditor) {
        me = exports(node[0], {
          value : active
        });
      } else {
        if (opts.image) {
          me = link(node[0], {
            name : filename,
            value : active
          });
        } else {
          if (opts.binary) {
            me = exports(node[0], {
              value : active
            });
            node.html(v);
          } else {
            if (!self.options.disableAceEditor && andTmp && tmp) {
              me = init(node[0], {
                onFocus : this.options.onFocus,
                ext : status || this.options.defaultFileExt,
                name : filename,
                value : active,
                index : key,
                comments : allSourceComments,
                editorOpts : this.options,
                onCommentChange : move.bind(this),
                onCommentRemove : this._removeComment.bind(this)
              });
            } else {
              me = create(node[0], {
                onFocus : this.options.onFocus,
                selectedLine : this.options.selectedLine,
                value : active,
                name : filename
              });
              var name;
              for (name in tests) {
                me.addCommand(name, tests[name].key, tests[name].fn);
              }
            }
          }
        }
      }
      /** @type {number} */
      i = 0;
      for (; i < this._commands.length; i++) {
        me.addCommand.apply(me, this._commands[i]);
      }
      /** @type {number} */
      i = 0;
      for (; i < this._plugins.length; i++) {
        me.registerPlugin(this._plugins[i], this);
      }
      if (this._onChange && !bin) {
        me.change(this._onChange);
      }
      type = {
        index : key
      };
      if (bin) {
        /** @type {boolean} */
        type.binary = true;
      }
      $tab.data(type);
      this.$tabBar.append($tab);
      doc = this.$contentWrapper.find(".fixed-right").first();
      return doc.length ? doc.before(node) : this.$contentWrapper.append(node), key === 0 && (this.options.mainEditable ? $tab.addClass("main-editable") : $tab.addClass("permanent")), $(".info-area .expander").click(function() {
        if ($(".info-area").hasClass("expanded")) {
          $(".info-area").removeClass("expanded").addClass("collapsed");
        } else {
          $(".info-area").removeClass("collapsed").addClass("expanded");
        }
      }), attrs = {
        name : filename,
        type : status,
        $tab : $tab,
        $content : node,
        editor : me,
        comments : allSourceComments,
        binary : bin
      }, typeof visible !== "undefined" && (attrs.hidden = visible), this._files.push(attrs), this.element.trigger({
        type : "codeeditor.fileAdded",
        fileName : filename,
        newFile : this._files[this._files.length - 1]
      }), this._files[this._files.length - 1];
    },
    hasFile : function(path) {
      var i;
      /** @type {number} */
      i = 0;
      for (; i < this._files.length; i++) {
        if (this._files[i].name === path) {
          return true;
        }
      }
      return false;
    },
    getFile : function(file) {
      var i;
      /** @type {number} */
      i = 0;
      for (; i < this._files.length; i++) {
        if (this._files[i].name === file) {
          return this._files[i].editor.getValue();
        }
      }
      return "";
    },
    selectFile : function(path) {
      var b;
      var i;
      /** @type {number} */
      i = 0;
      for (; i < this._files.length; i++) {
        if (this._files[i].name === path) {
          b = this._files[i].$tab;
          break;
        }
      }
      if (!b) {
        b = this.addFile(path).$tab;
        /** @type {number} */
        i = this._files.length - 1;
      }
      this._selectTab(i);
    },
    serialize : function(options) {
      var data;
      var i;
      var item;
      /** @type {!Array} */
      var bookmarks_items = [];
      options = _.extend(options || {
        removeComments : false
      });
      /** @type {number} */
      i = 0;
      for (; i < this._files.length; i++) {
        if (!this._files[i].binary) {
          data = this._files[i];
          item = {
            name : data.name,
            content : data.editor.getValue()
          };
          if (typeof data.hidden !== "undefined") {
            item.hidden = data.hidden;
          }
          if (!options.removeComments && data.comments.length) {
            item.comments = data.comments;
          }
          bookmarks_items.push(item);
        }
      }
      return JSON.stringify(bookmarks_items);
    },
    getAllFiles : function(result) {
      var r;
      var isLoaded;
      var files = {};
      if (result && typeof result === "object") {
        r = result.filter || false;
        isLoaded = void 0 === result.values ? true : result.values;
      } else {
        /** @type {boolean} */
        r = false;
        /** @type {boolean} */
        isLoaded = true;
      }
      if (r && typeof r !== "regexp") {
        /** @type {!RegExp} */
        r = new RegExp(r);
      }
      /** @type {number} */
      var i = 0;
      for (; i < this._files.length; i++) {
        if (!r || r.test(this._files[i].name)) {
          if (this._files[i].binary) {
            continue;
          }
          files[this._files[i].name] = isLoaded ? this._files[i].editor.getValue() : 1;
        }
      }
      return files;
    },
    getAllVisibleFiles : function() {
      var i;
      var modelsGroupsCache = {};
      /** @type {number} */
      i = 0;
      for (; i < this._files.length; i++) {
        if (!(this._files[i].hidden || this._files[i].binary)) {
          modelsGroupsCache[this._files[i].name] = this._files[i].editor.getValue();
        }
      }
      return modelsGroupsCache;
    },
    addCommand : function(name, args, scope) {
      this._commands.push([name, args, scope]);
      /** @type {number} */
      var i = 0;
      for (; i < this._files.length; i++) {
        this._files[i].editor.addCommand(name, args, scope);
      }
    },
    updateInfo : function(netInfoBox) {
      if (this.options.showInfo) {
        this._currentInfo = netInfoBox;
        $(".info-area .expander").hide();
        if (netInfoBox) {
          $(".info-area").removeClass("empty").find(".info-quick").html(this._currentInfo.title);
          this.loadFullInfo(this._currentInfo);
        } else {
          $(".info-area").removeClass("expanded").addClass("collapsed empty");
        }
      }
    },
    loadFullInfo : function(response) {
      var instance;
      if (response && response.url) {
        if (instance = results[response.url], void 0 !== instance) {
          return void(typeof instance === "string" ? instance.length && ($(".info-area .info-full").html(results[response.url]), $(".info-area .expander").show()) : instance._cancelled = false);
        }
        if (this.lastInfoRequest) {
          /** @type {boolean} */
          this.lastInfoRequest._cancelled = true;
        }
        this.lastInfoRequest = results[response.url] = function() {
          var e = $.get(response.url, "", "html");
          return e.done(function(result) {
            results[response.url] = result || "";
            if (result && !e._cancelled) {
              $(".info-area .info-full").html(result);
              $(".info-area .expander").show();
            }
          }), e;
        }();
      }
    },
    registerPlugin : function(plugin) {
      var template = this;
      if (plugin.on) {
        plugin.on("info.token", function(a, netInfoBox) {
          template.updateInfo(netInfoBox);
        });
      }
      this._plugins.push(plugin);
      /** @type {number} */
      var i = 0;
      for (; i < this._files.length; i++) {
        this._files[i].editor.registerPlugin(plugin, this);
      }
    },
    change : function(fn) {
      /** @type {!Function} */
      this._onChange = fn;
      /** @type {number} */
      var i = 0;
      for (; i < this._files.length; i++) {
        this._files[i].editor.change(fn);
      }
    },
    reset : function(callback) {
      var tab;
      for (; tab = this._files.pop();) {
        tab.editor.destroy();
        tab.$content.remove();
        tab.$tab.remove();
      }
      this._loadState(callback);
    },
    highlight : function(string, key) {
      /** @type {number} */
      var name = -1;
      /** @type {number} */
      var i = 0;
      for (; i < this._files.length; i++) {
        if (this._files[i].name === string) {
          /** @type {number} */
          name = i;
          break;
        }
      }
      if (name >= 0) {
        /** @type {boolean} */
        var className = this._files[name].$tab.hasClass("active") ? false : true;
        this._files[name].editor.highlight(key, className);
        if (!this._files[name].$tab.has(CLASS_SELECT_ICON).length) {
          this._files[name].$tab.append(" <i class='" + O + "'></i>");
        }
      }
    },
    clearTabMarkers : function() {
      /** @type {number} */
      var i = 0;
      for (; i < this._files.length; i++) {
        if (this._files[i].$tab.has(CLASS_SELECT_ICON).length) {
          this._files[i].$tab.find(CLASS_SELECT_ICON).remove();
        }
      }
      $(".ace_content").removeClass("attention-error");
      $("textarea.lined").removeClass("attention-error");
      $(".lineno").removeClass("lineselect");
    },
    gotoLine : function(val) {
      if (this._editor && this._editor.aceInstance) {
        this._editor.aceInstance.gotoLine(val);
      }
    },
    removeComments : function() {
      var i;
      var index;
      var name;
      var w;
      /** @type {number} */
      i = 0;
      for (; i < this._files.length; i++) {
        if (this._files[i].comments) {
          /** @type {number} */
          index = 0;
          for (; index < this._files[i].comments.length; index++) {
            name = this._files[i].comments[index]._id;
            w = widgets[name];
            this._files[i].editor.getSession().removeGutterDecoration(w.row, "trinket-comment");
            this._files[i].editor.getSession().removeGutterDecoration(w.row, "data-" + i + "-" + name);
            if (p[name]) {
              this._files[i].editor.getSession().removeGutterDecoration(w.row, "collapsed");
            } else {
              this._files[i].editor.getSession().removeGutterDecoration(w.row, "open");
            }
            widgets[name].destroy();
            delete widgets[name];
          }
        }
      }
    },
    activeTab : function() {
      return this._getCurrentVisibleTab();
    }
  };
  !function(folder) {
    /** @type {!Array<string>} */
    var results = "setValue getValue focus isFocused".split(" ");
    /**
     * @param {string} index
     * @return {undefined}
     */
    var createRow = function(index) {
      /**
       * @return {?}
       */
      folder[index] = function() {
        /** @type {!Array<?>} */
        var cmd_args = Array.prototype.slice.call(arguments);
        return this._editor[index].apply(this._editor, cmd_args);
      };
    };
    /** @type {number} */
    var i = 0;
    for (; i < results.length; i++) {
      createRow(results[i]);
    }
  }(widget);
  $.widget("trinket.codeEditor", widget);
}(window.jQuery, window.TrinketIO, window.ace), function($, can, canCreateDiscussions) {
  /**
   * @param {?} callback
   * @return {undefined}
   */
  function login(callback) {
    if (this.isAuthenticated() === true) {
      this.startBroadcasting();
    } else {
      this.auth(function(a) {
        if (a) {
          this.startBroadcasting();
        }
      }.bind(this));
    }
  }
  /**
   * @param {?} ngTable
   * @return {undefined}
   */
  function link(ngTable) {
    if (this.isAuthenticated() === true) {
      this.join();
    } else {
      this.auth(function(a) {
        if (a) {
          this.join();
        }
      }.bind(this));
    }
  }
  /**
   * @param {?} url
   * @param {boolean} options
   * @return {undefined}
   */
  function init(url, options) {
    $(document).on("trinket.broadcasting.start", function() {
      if (void 0 === socket) {
        socket = new connect(url, options);
      }
      $(".broadcast-start-control").find("i").removeClass().addClass("fa fa-circle-o-notch fa-spin");
      $(".broadcast-status").html("Creating room...");
      socket.connect(login);
    });
    $(document).on("trinket.broadcasting.join", function() {
      if (void 0 === socket) {
        socket = new Connection(url, options);
      }
      $(".broadcast-join-control").find("i").removeClass().addClass("fa fa-circle-o-notch fa-spin");
      $(".broadcast-status").html("Joining Room...");
      socket.connect(link);
    });
    $(document).on("trinket.broadcasting.control-room trinket.broadcasting.join-info", function(ParsleyDefaults) {
      $("#broadcastReceiverInfo").removeClass("hide");
      $("#left-broadcast-reason").empty();
      $("#keepBroadcastSessionButtons").addClass("hide");
      $("#controlRoomModal").foundation("reveal", "open");
      if (!(ParsleyDefaults.namespace !== "broadcasting.join-info" || void 0 !== socket && socket.session.state !== state)) {
        $.get(URL + "/broadcastsession/" + options.trinketIdentifier).done(function(template) {
          if (template && template.isActive) {
            $(".broadcast-status").html("Broadcast session is active.");
            $(".broadcast-join-control").removeClass("disabled");
          } else {
            $(".broadcast-join-control").addClass("disabled");
            $(".broadcast-status").html("Broadcast session is not active. Check back later.");
          }
        }).fail(function(b, canCreateDiscussions, isSlidingUp) {
          $(".broadcast-status").html("Broadcast session is not active. Check back later.");
        });
      }
    });
  }
  var socket;
  var magic = (can["import"]("utils.template"), trinketConfig.get("broadcastPort") != null && trinketConfig.get("broadcastPort") !== "" ? ":" + trinketConfig.get("broadcastPort") : "");
  var URL = trinketConfig.get("broadcastProtocol") + "://" + trinketConfig.get("broadcastHostname") + magic;
  /** @type {string} */
  var url = URL + "/broadcast";
  var socketOptions = {
    reconnection : true,
    reconnectionDelay : 1e3,
    reconnectionDelayMax : 5e3,
    reconnectionAttempts : 5
  };
  /** @type {number} */
  var msgId = 0;
  /** @type {string} */
  var state = "OFF";
  /** @type {string} */
  var PRE_DIGEST_STATE = "BROADCASTING";
  /** @type {string} */
  var status = "OFF";
  /** @type {string} */
  var id = "BROADCASTING";
  /**
   * @param {!Object} ed
   * @param {?} self
   * @return {undefined}
   */
  var connect = function(ed, self) {
    this.session = {
      hasChangeListenersAttached : false,
      state : status,
      needReconnect : false
    };
    this.socket = io.connect(url, socketOptions);
    /** @type {!Object} */
    this.codeEditor = ed;
    this.trinketIdentifier = self.trinketIdentifier;
    this.userIdentifier = self.userIdentifier;
    this.token = window.trinketBroadcast.token;
    /**
     * @return {undefined}
     */
    this.connectCallback = function() {
    };
    this.socket.on("connect", this.onConnect.bind(this));
    this.socket.on("reconnect", this.onReconnect.bind(this));
    this.socket.on("disconnect", this.onDisconnect.bind(this));
    this.socket.on("reconnect_failed", this.onReconnectFailed.bind(this));
    this.socket.on("connect_timeout", this.onConnectionTimeout.bind(this));
    this.socket.on("sync", this.onSync.bind(this));
    this.socket.on("userUpdate", this.onUserUpdate.bind(this));
    $(document).on("trinket.broadcasting.stop", this.onBroadcastingStop.bind(this));
  };
  /**
   * @param {string} type
   * @param {string} name
   * @return {undefined}
   */
  connect.prototype.updateUI = function(type, name) {
    switch(type) {
      case "stop":
        $(".broadcast-it").addClass("broadcasting");
        $(".broadcast-start-control").find("i").removeClass().addClass("fa fa-play");
        $(".broadcast-start-control").addClass("disabled");
        $(".broadcast-stop-control").removeClass("disabled");
        $(".broadcast-it").prop("title", "On Air");
        $(".broadcast-status").html(name || 'On Air! <a class="close-control-room button radius tiny">Close Control Room <i class="fa fa-times-circle"></i></a>');
        $(".close-control-room").click(function() {
          $("#controlRoomModal").foundation("reveal", "close");
        });
        break;
      case "start":
        $(".broadcast-it").removeClass("broadcasting");
        $(".broadcast-start-control").find("i").removeClass().addClass("fa fa-play");
        $(".broadcast-start-control").removeClass("disabled");
        $(".broadcast-stop-control").addClass("disabled");
        $(".broadcast-it").prop("title", "Start Broadcasting");
        $(".broadcast-status").html(name || "Not Broadcasting");
    }
  };
  /**
   * @param {!Function} callback
   * @return {undefined}
   */
  connect.prototype.connect = function(callback) {
    if (this.isConnected() === true) {
      callback.call(this, this.socket.connected);
    } else {
      /** @type {!Function} */
      this.connectCallback = callback;
      this.socket.connect();
    }
  };
  /**
   * @return {?}
   */
  connect.prototype.isConnected = function() {
    return this.socket.connected;
  };
  /**
   * @return {undefined}
   */
  connect.prototype.onConnect = function() {
    console.log("Broadcaster connected", this.socket.id);
    if (void 0 !== this.connectCallback) {
      this.connectCallback.call(this, this.socket.connected);
    }
  };
  /**
   * @return {undefined}
   */
  connect.prototype.onConnectionTimeout = function() {
    console.log("Broadcaster.onConnectionTimeout", this.session);
    this.updateUI("start", "Connection timed out. Check your internet connection then try again.");
  };
  /**
   * @param {!Function} callback
   * @return {undefined}
   */
  connect.prototype.auth = function(callback) {
    this.socket.emit("auth", {
      token : this.token
    }, this.onAuthResponse.bind(this, callback));
  };
  /**
   * @return {?}
   */
  connect.prototype.isAuthenticated = function() {
    return this.session.isAuthenticated;
  };
  /**
   * @param {!Function} app
   * @param {!Object} callback
   * @return {undefined}
   */
  connect.prototype.onAuthResponse = function(app, callback) {
    if (callback.error || !callback.success) {
      console.log("An error has occured while authentificating: " + callback.error);
      /** @type {boolean} */
      this.session.isAuthenticated = false;
      this.updateUI("start", "There was a problem creating your broadcasting room. Try refreshing the page and let us know if the problem continues.");
    } else {
      /** @type {boolean} */
      this.session.isAuthenticated = true;
      console.log("Authenticated successfully");
    }
    app.call(this, this.session.isAuthenticated);
  };
  /**
   * @param {string} allowMove
   * @return {undefined}
   */
  connect.prototype.startBroadcasting = function(allowMove) {
    var data;
    var removeHtmlElement = allowMove || false;
    if (this.session.state === status || removeHtmlElement !== false) {
      data = {
        user : this.userIdentifier,
        trinketId : this.trinketIdentifier
      };
      this.socket.emit("startBroadcasting", data, this.onStartBroadcastingResponse.bind(this));
    }
  };
  /**
   * @param {!Object} item
   * @return {undefined}
   */
  connect.prototype.onStartBroadcastingResponse = function(item) {
    if (item.status === "STARTED" || item.status === "RESTARTED") {
      this.initChangeListeners();
      if (item.status === "RESTARTED") {
        this.session.state = item.state;
        this.onSync({}, this.sendBroadcastChange.bind(this));
      } else {
        /** @type {string} */
        this.session.state = id;
      }
      this.updateUI("stop");
    } else {
      console.log("Could not start a broadcasting session", item);
      this.updateUI("start", "There was a problem creating your broadcasting room. Try refreshing the page and let us know if the problem continues.");
    }
  };
  /**
   * @return {?}
   */
  connect.prototype.getLoadStateMessage = function() {
    var state = this.codeEditor.serialize();
    var interactor = {};
    return interactor.state = state, interactor.type = "codeeditor.loadState", interactor;
  };
  /**
   * @return {?}
   */
  connect.prototype.getAssetChangeMessage = function() {
    return {
      assets : this.codeEditor.assetBrowser ? this.codeEditor.assetBrowser.options.assets : void 0,
      type : "assets.change"
    };
  };
  /**
   * @param {?} types
   * @param {?} options
   * @return {undefined}
   */
  connect.prototype.onSync = function(types, options) {
    if (this.isConnected() && this.isAuthenticated() && this.session.state !== status) {
      var data;
      var o;
      /** @type {!Array} */
      var plugins = [];
      plugins.push(this.getLoadStateMessage());
      o = this.codeEditor._getCurrentVisibleTab();
      data = {};
      data.tab = o.tabIndex;
      /** @type {string} */
      data.type = "codeeditor.tabChanged";
      plugins.push(this.getAssetChangeMessage());
      options(plugins);
    }
  };
  /**
   * @param {!Object} asyncsRunning
   * @return {undefined}
   */
  connect.prototype.onUserUpdate = function(asyncsRunning) {
    if (asyncsRunning.count) {
      $("#broadcast-receiving-count").text(asyncsRunning.count - 1);
    }
  };
  /**
   * @return {undefined}
   */
  connect.prototype.onReconnect = function() {
    if (this.session.state !== status) {
      $("#broadcastMessage").html("Reconnected!").fadeOut("slow", function() {
        $("#broadcastMessage").empty();
        $("#broadcastMessage").parent().addClass("hide");
      });
      /** @type {boolean} */
      this.session.needReconnect = true;
      this.auth(function(a) {
        if (a) {
          this.startBroadcasting(true);
        }
      }.bind(this));
    }
  };
  /**
   * @return {undefined}
   */
  connect.prototype.onReconnectFailed = function() {
    /** @type {string} */
    this.session.state = status;
    $("#broadcastMessage").empty();
    $("#broadcastMessage").parent().addClass("hide");
    if (!$("#controlRoomModal").hasClass("open")) {
      $("a.broadcast-it").trigger("click");
    }
    this.updateUI("start", "There was a problem connecting to your room. Try refreshing the page and let us know if the problem continues.");
  };
  /**
   * @return {undefined}
   */
  connect.prototype.onDisconnect = function() {
    /** @type {boolean} */
    this.session.isAuthenticated = false;
    console.log("disconnect from socket: state:", this.session.state);
    if (this.session.state !== status) {
      $("#broadcastMessage").parent().removeClass("hide");
      $("#broadcastMessage").html("Reconnecting...");
    }
  };
  /**
   * @param {!Object} self
   * @param {string} msg
   * @return {undefined}
   */
  connect.prototype._handle = function(self, msg) {
    if (this.session.state === id) {
      var filename = self.name;
      var config = {};
      switch(msg && msg.action && (msg.type = "change"), msg.type) {
        case "changeCursor":
          config = self.editor.getSession().selection.getCursor();
          break;
        case "change":
          /** @type {string} */
          config = msg;
          break;
        case "changeSelection":
          config = self.editor.getSession().selection.getRange();
          break;
        case "changeMode":
          config = {
            mode : self.editor.getSession().getMode().$id
          };
          break;
        case "blur":
          /** @type {string} */
          config.blur = "blur";
          break;
        case "focus":
          /** @type {string} */
          config.blur = "blur";
      }
      config.fileName = filename;
      config.trinketId = this.session.id;
      /** @type {string} */
      config.type = "document." + msg.type;
      this.sendBroadcastChange(config);
    }
  };
  /**
   * @param {!Object} data
   * @return {undefined}
   */
  connect.prototype.sendBroadcastChange = function(data) {
    if (this.isConnected() && this.isAuthenticated() && this.session.state === id) {
      data.trinketId = this.trinketIdentifier;
      this.socket.emit("broadcastChange", data);
      console.log("broadcastChange", data.type);
    }
  };
  /**
   * @return {undefined}
   */
  connect.prototype.initChangeListeners = function() {
    if (this.session.hasChangeListenersAttached === false) {
      this.codeEditor.element.on("codeeditor.fileRenamed", this._onFileRenamed.bind(this));
      this.codeEditor.element.on("codeeditor.fileRemoved", this._onFileRemoved.bind(this));
      this.codeEditor.element.on("codeeditor.fileAdded", this._onFileAdded.bind(this));
      this.codeEditor.element.on("codeeditor.tabChanged", this._onTabChanged.bind(this));
      $(document).on("trinket.code.run", this._onTrinketRun.bind(this));
      $(document).on("sk.system.clear", this._onTrinketClear.bind(this));
      $("#reset-output").on("click", this._onTrinketClear.bind(this));
      $(document).on("assets.change", this._onAssetsChange.bind(this));
      $(document).on("trinket.resetted", this._onTrinketReset.bind(this));
      /** @type {boolean} */
      this.session.hasChangeListenersAttached = true;
    }
    this.codeEditor._files.forEach(function(textEditor, b) {
      this.addEditorHandlers(textEditor);
    }.bind(this));
  };
  /**
   * @return {undefined}
   */
  connect.prototype._onTrinketReset = function() {
    this.sendBroadcastChange(this.getLoadStateMessage());
    this.sendBroadcastChange(this.getAssetChangeMessage());
  };
  /**
   * @return {undefined}
   */
  connect.prototype.onBroadcastingStop = function() {
    this.socket.emit("stopBroadcasting", {
      trinketId : this.trinketIdentifier
    });
    /** @type {string} */
    this.session.state = status;
    this.updateUI("start", "Broadcasting stopped.");
    $("#broadcast-receiving-count").empty();
  };
  /**
   * @param {!Element} options
   * @return {?}
   */
  connect.prototype._onTabChanged = function(options) {
    var place;
    var data = {};
    return place = this.codeEditor._files[options.tabIndex], void 0 === place || place.name === "" ? void console.log("Broadcaster._onTabChanged: skipped due to missing tab name!") : (data.tabIndex = options.tabIndex, data.type = "codeeditor.tabChanged", void this.sendBroadcastChange(data));
  };
  /**
   * @param {?} a
   * @return {undefined}
   */
  connect.prototype._onTrinketRun = function(a) {
    console.log("trinket.code.run");
    var data = {};
    data.trinketId = this.session.id;
    /** @type {string} */
    data.type = "codeeditor.run";
    this.sendBroadcastChange(data);
  };
  /**
   * @param {?} a
   * @return {undefined}
   */
  connect.prototype._onTrinketClear = function(a) {
    console.log("sk.system.clear");
    var data = {};
    data.trinketId = this.session.id;
    /** @type {string} */
    data.type = "codeeditor.clear";
    this.sendBroadcastChange(data);
  };
  /**
   * @param {?} a
   * @return {undefined}
   */
  connect.prototype._onAssetsChange = function(a) {
    console.log("assets.change");
    var data = {};
    data.trinketId = this.session.id;
    /** @type {string} */
    data.type = "assets.change";
    data.assets = this.codeEditor.assetBrowser.options.assets;
    this.sendBroadcastChange(data);
  };
  /**
   * @param {!Object} options
   * @return {undefined}
   */
  connect.prototype._onFileAdded = function(options) {
    var fileName = options.fileName || "";
    var data = options.newFile;
    /** @type {number} */
    data._fileID = msgId++;
    this.addEditorHandlers(data);
    var file = {};
    file.fileName = fileName;
    /** @type {number} */
    file.fileID = data._fileID;
    file.trinketId = this.session.id;
    /** @type {string} */
    file.type = "codeeditor.fileAdded";
  };
  /**
   * @param {!Object} mine
   * @return {undefined}
   */
  connect.prototype._onFileRenamed = function(mine) {
    var data = mine.newFile;
    var ret = {};
    ret.newFileName = mine.newFileName;
    ret.oldFileName = mine.oldFileName;
    ret.fileID = data._fileID;
    ret.trinketId = this.session.id;
    /** @type {string} */
    ret.type = "codeeditor.fileRenamed";
    this.sendBroadcastChange(ret);
  };
  /**
   * @param {!Object} challengeSpec
   * @return {undefined}
   */
  connect.prototype._onFileRemoved = function(challengeSpec) {
    var fileName = challengeSpec.fileName;
    console.log("fileRemoved", fileName);
    var data = {};
    data.fileName = fileName;
    data.trinketId = this.session.id;
    /** @type {string} */
    data.type = "codeeditor.fileRemoved";
    this.sendBroadcastChange(data);
  };
  /**
   * @param {!Object} editor
   * @return {undefined}
   */
  connect.prototype.addEditorHandlers = function(editor) {
    if (void 0 === editor._addedEditorHandlers || editor._addedEditorHandlers === false) {
      var torrent = editor.editor.getSession();
      torrent.on("change", this._handle.bind(this, editor));
      torrent.selection.on("changeCursor", this._handle.bind(this, editor));
      torrent.selection.on("changeSelection", this._handle.bind(this, editor));
      /** @type {boolean} */
      editor._addedEditorHandlers = true;
    }
  };
  /**
   * @param {!Object} connector
   * @param {?} component
   * @return {undefined}
   */
  var Connection = function(connector, component) {
    this.session = {
      state : state,
      needReconnect : false,
      lastDraft : void 0,
      lastAssets : void 0
    };
    this.socket = io.connect(url, socketOptions);
    /** @type {!Object} */
    this.codeEditor = connector;
    this.trinketIdentifier = component.trinketIdentifier;
    this.userIdentifier = component.userIdentifier;
    this.token = window.trinketBroadcast.token;
    /**
     * @return {undefined}
     */
    this.connectCallback = function() {
    };
    this.socket.on("connect", this.onConnect.bind(this));
    this.socket.on("connect_timeout", this.onConnectionTimeout.bind(this));
    this.socket.on("disconnect", this.onDisconnect.bind(this));
    this.socket.on("reconnect", this.onReconnect.bind(this));
    this.socket.on("reconnect_failed", this.onReconnectFailed.bind(this));
    this.socket.on("broadcastConnectionProblem", this.onBroadcastConnectionProblem.bind(this));
    this.socket.on("broadcasterReconnected", this.onBroadcasterReconnected.bind(this));
    this.socket.on("broadcastUpdate", this.onBroadcastChange.bind(this));
    this.socket.on("leave", this.onServerLeave.bind(this));
    $(document).on("trinket.broadcast.confirm-keep", this.saveBroadcastSession.bind(this));
    $(document).on("trinket.broadcast.cancel-keep", this.resetBroadcastSession.bind(this));
    $(document).on("trinket.broadcasting.leave", this.leave.bind(this));
  };
  /**
   * @param {!Function} callback
   * @return {undefined}
   */
  Connection.prototype.connect = function(callback) {
    if (this.isConnected() === true) {
      callback.call(this, this.socket.connected);
    } else {
      /** @type {!Function} */
      this.connectCallback = callback;
      this.socket.connect();
    }
  };
  /**
   * @return {?}
   */
  Connection.prototype.isConnected = function() {
    return this.socket.connected;
  };
  /**
   * @return {undefined}
   */
  Connection.prototype.onConnect = function() {
    console.log("Receiver connected", this.socket.id);
    if (void 0 !== this.connectCallback) {
      this.connectCallback.call(this, this.socket.connected);
      /**
       * @return {undefined}
       */
      this.connectCallback = function() {
      };
    }
  };
  /**
   * @return {undefined}
   */
  Connection.prototype.onReconnect = function() {
    if (this.session.state !== state) {
      $("#broadcastMessage").parent().removeClass("hide");
      $("#broadcastMessage").html("Reconnected!").fadeOut("slow", function() {
        $("#broadcastMessage").empty();
        $("#broadcastMessage").parent().addClass("hide");
      });
      /** @type {boolean} */
      this.session.needReconnect = true;
      this.auth(function(a) {
        if (a) {
          this.join(true);
        }
      }.bind(this));
    }
  };
  /**
   * @param {!Function} callback
   * @return {undefined}
   */
  Connection.prototype.auth = function(callback) {
    this.socket.emit("auth", {
      token : this.token
    }, this.onAuthResponse.bind(this, callback));
  };
  /**
   * @return {?}
   */
  Connection.prototype.isAuthenticated = function() {
    return this.session.isAuthenticated;
  };
  /**
   * @param {!Function} app
   * @param {!Object} callback
   * @return {undefined}
   */
  Connection.prototype.onAuthResponse = function(app, callback) {
    if (callback.error || !callback.success) {
      console.log("An error has occured while authentificating: " + callback.error);
      /** @type {boolean} */
      this.session.isAuthenticated = false;
      this.updateUI("join", "There was a problem connecting to the room. Try refreshing the page and let us know if the problem continues.");
    } else {
      /** @type {boolean} */
      this.session.isAuthenticated = true;
      console.log("Authenticated successfully");
    }
    app.call(this, this.session.isAuthenticated);
  };
  /**
   * @return {undefined}
   */
  Connection.prototype.initReceiving = function() {
    this.codeEditor._files.forEach(function(me) {
      /** @type {boolean} */
      me.editor.renderer.textarea.readOnly = true;
      me.editor.setReadOnly(true);
      me.editor.aceInstance.on("blur", function() {
        me.editor.renderer.$cursorLayer.setBlinking(true);
        me.editor.renderer.$cursorLayer.showCursor();
      });
    });
    this.setGlobalReceiverState(PRE_DIGEST_STATE);
  };
  /**
   * @return {undefined}
   */
  Connection.prototype.uninitReceiving = function() {
    this.codeEditor._files.forEach(function(me) {
      /** @type {boolean} */
      me.editor.renderer.textarea.readOnly = false;
      me.editor.setReadOnly(false);
    });
  };
  /**
   * @return {undefined}
   */
  Connection.prototype.requestSync = function() {
    this.socket.emit("sync", {
      trinketId : this.trinketIdentifier
    }, function(a) {
      if (a.error) {
        console.log("Sync request failed: ", a);
      }
    });
  };
  /**
   * @param {?} b
   * @return {undefined}
   */
  Connection.prototype.onReconnectFailed = function(b) {
    $("#broadcastMessage").empty();
    $("#broadcastMessage").parent().addClass("hide");
    this.updateUI("join");
    /** @type {string} */
    this.session.state = state;
    this.uninitReceiving();
    this.saveBroadcastOrDraft("reconnectFailed");
  };
  /**
   * @return {undefined}
   */
  Connection.prototype.onConnectionTimeout = function() {
    console.log("Receiver.onConnectionTimeout", this.session);
    this.updateUI("join", "Connection timed out. Check your internet connection then try again.");
  };
  /**
   * @return {undefined}
   */
  Connection.prototype.onDisconnect = function() {
    /** @type {boolean} */
    this.session.isAuthenticated = false;
    console.log("Receiver.disconnect from socket: state:", this.session.state);
    if (this.session.state !== state) {
      $("#broadcastMessage").parent().removeClass("hide");
      $("#broadcastMessage").html("Reconnecting...");
    }
  };
  /**
   * @return {undefined}
   */
  Connection.prototype.onBroadcastConnectionProblem = function() {
    $("#broadcastMessage").parent().removeClass("hide");
    $("#broadcastMessage").html("Reconnecting...");
  };
  /**
   * @return {undefined}
   */
  Connection.prototype.onBroadcasterReconnected = function() {
    $("#broadcastMessage").parent().removeClass("hide");
    $("#broadcastMessage").html("Reconnected!").fadeOut("slow", function() {
      $("#broadcastMessage").empty();
      $("#broadcastMessage").parent().addClass("hide");
    });
    this.requestSync();
  };
  /**
   * @param {string} name
   * @return {?}
   */
  Connection.prototype.join = function(name) {
    var data;
    var className = name || false;
    return console.log("Receiver.join force: " + name, this.session), this.session.state !== state && className === false ? void console.log("Receiver.join cannot join twice", this.session.state) : (data = {
      user : this.userIdentifier,
      trinketId : this.trinketIdentifier
    }, void this.socket.emit("join", data, this.onJoinResponse.bind(this)));
  };
  /**
   * @param {!Object} response
   * @return {?}
   */
  Connection.prototype.onJoinResponse = function(response) {
    return console.log("Receiver.onJoinResponse ", response), response.error ? (this.session.state = state, void this.updateUI("join", "There was a problem connecting to the room. Try refreshing the page and let us know if the problem continues.")) : (this.session.trinketId = response.trinketId, this.session.state = response.state, this.session.lastDraft = this.codeEditor.serialize(), this.codeEditor.assetBrowser && (this.session.lastAssets = this.codeEditor.assetBrowser.options.assets.slice()), 
    this.requestSync(), this.initReceiving(), void this.updateUI("leave"));
  };
  /**
   * @param {?} contextReference
   * @return {undefined}
   */
  Connection.prototype.onServerLeave = function(contextReference) {
    console.log("Receiver.onServerLeave", contextReference);
    if (this.isConnected() !== false && this.isAuthenticated() !== false && this.session.state !== state) {
      this.updateUI("join");
      /** @type {string} */
      this.session.state = state;
      this.uninitReceiving();
      this.saveBroadcastOrDraft("serverLeave");
    }
  };
  /**
   * @param {string} event
   * @return {undefined}
   */
  Connection.prototype.saveBroadcastOrDraft = function(event) {
    switch(console.log("saveBroadcastOrDraft event:", event), $("#controlRoomModal").hasClass("open") || $("a.broadcast-it").trigger("click"), $("#broadcastReceiverInfo").addClass("hide"), event) {
      case "leave":
        $("#left-broadcast-reason").empty();
        break;
      case "reconnectFailed":
        $("#left-broadcast-reason").html("Could not reconnect to broadcast session.");
        break;
      case "serverLeave":
        $("#left-broadcast-reason").html("The broadcast session has ended.");
        break;
      default:
        $("#left-broadcast-reason").empty();
    }
    $("#keepBroadcastSessionButtons").removeClass("hide");
    $("#broadcastMessage").empty();
    $("#broadcastMessage").parent().addClass("hide");
  };
  /**
   * @param {string} state
   * @return {undefined}
   */
  Connection.prototype.setGlobalReceiverState = function(state) {
    /** @type {string} */
    window.TrinketAPI._receiverBroadcastState = state;
  };
  /**
   * @return {undefined}
   */
  Connection.prototype.saveBroadcastSession = function() {
    this.setGlobalReceiverState(state);
    $(document).trigger("trinket.code.change");
    $("#controlRoomModal").foundation("reveal", "close");
  };
  /**
   * @return {undefined}
   */
  Connection.prototype.resetBroadcastSession = function() {
    this.setGlobalReceiverState(state);
    this.codeEditor.reset(this.session.lastDraft);
    if (this.codeEditor.assetBrowser) {
      this.codeEditor.assetBrowser.assets(this.session.lastAssets);
    }
    $("#controlRoomModal").foundation("reveal", "close");
  };
  /**
   * @return {undefined}
   */
  Connection.prototype.leave = function() {
    console.log("Receiver.leave");
    if (this.isConnected() && this.isAuthenticated() && this.session.state !== state) {
      this.socket.emit("leave", {
        trinketId : this.trinketIdentifier
      }, function(contextReference) {
        console.log("Receiver.leave.callback", contextReference);
      });
      this.updateUI("join");
      /** @type {string} */
      this.session.state = state;
      this.uninitReceiving();
      this.saveBroadcastOrDraft("leave");
    }
  };
  /**
   * @param {string} type
   * @param {string} name
   * @return {undefined}
   */
  Connection.prototype.updateUI = function(type, name) {
    switch(type) {
      case "leave":
        $(".broadcast-it").addClass("broadcasting");
        $(".broadcast-join-control").removeClass("success").addClass("warning");
        $(".broadcast-join-control").find("i").removeClass().addClass("fa fa-leave");
        $(".broadcast-join-control").data("action", "broadcasting.leave");
        $(".broadcast-join-control").find("span").text("Leave Room");
        $(".broadcast-it").prop("title", "Receiving Broadcast");
        $(".broadcast-status").html(name || 'Receiving broadcast! <a class="close-control-room button radius tiny">Close Control Room <i class="fa fa-times-circle"></i></a>');
        $(".close-control-room").click(function() {
          $("#controlRoomModal").foundation("reveal", "close");
        });
        $(".save-it").addClass("disabled");
        $("#version-toggle").attr("disabled", true);
        $(".right-menu-link").addClass("disabled");
        break;
      case "join":
        $(".broadcast-it").removeClass("broadcasting");
        $(".broadcast-it").prop("title", "Join Broadcasting");
        $(".broadcast-join-control").removeClass("warning").addClass("success");
        $(".broadcast-join-control").data("action", "broadcasting.join");
        $(".broadcast-join-control").find("i").removeClass().addClass("fa fa-enter");
        $(".broadcast-join-control").find("span").text("Join Room");
        $(".broadcast-it").prop("title", "Join Broadcasting");
        $(".broadcast-status").html(name || "Not Joined");
        $(".save-it").removeClass("disabled");
        $("#version-toggle").removeAttr("disabled");
        $(".right-menu-link").removeClass("disabled");
    }
  };
  /**
   * @param {!Array} children
   * @return {?}
   */
  Connection.prototype.onBroadcastChange = function(children) {
    if (this.isAuthenticated() === false || this.isConnected() === false || this.session.state !== PRE_DIGEST_STATE) {
      return void console.log("Receiver.onBroadcastChange dismiss event", children);
    }
    var i;
    if (!Array.isArray(children)) {
      /** @type {!Array} */
      children = [children];
    }
    /** @type {number} */
    i = 0;
    for (; i < children.length; i++) {
      var object_t = children[i].type;
      var e = children[i];
      switch(object_t) {
        case "codeeditor.fileRemoved":
          this.removeFile(e.fileName);
          break;
        case "codeeditor.fileAdded":
          this.addFile(e.name, e.fileID, e.content);
          break;
        case "codeeditor.fileRenamed":
          this.renameFile(e.oldFileName, e.newFileName, e.fileID);
          break;
        case "document.changeSelection":
          this.changeSelection(e.fileName, e);
          break;
        case "document.changeCursor":
          this.changeCursor(e.fileName, e);
          break;
        case "document.change":
          var name = e.fileName;
          this.applyChangeOnFile(name, e);
          break;
        case "document.blur":
          break;
        case "document.focus":
          break;
        case "document.changeMode":
          break;
        case "codeeditor.tabChanged":
          this._changeTab(e.tabIndex);
          break;
        case "codeeditor.run":
          $("#editor").trigger("trinket.code.run", {
            action : "code.run"
          });
          break;
        case "codeeditor.clear":
          $(document).trigger("sk.system.clear");
          break;
        case "assets.change":
          this.changeAssets(e.assets);
          break;
        case "codeeditor.loadState":
          this.codeEditor.reset(e.state);
          this.initReceiving();
      }
    }
  };
  /**
   * @param {!Object} assets
   * @return {undefined}
   */
  Connection.prototype.changeAssets = function(assets) {
    var db = this.codeEditor.assetBrowser;
    if (db) {
      db.assets(assets);
    }
  };
  /**
   * @param {undefined} i
   * @return {undefined}
   */
  Connection.prototype._changeTab = function(i) {
    this.codeEditor._selectTab(i, false);
  };
  /**
   * @param {string} e
   * @param {!Object} cursor
   * @return {undefined}
   */
  Connection.prototype.changeCursor = function(e, cursor) {
    var editor = this.getFileFromName(e);
    console.log(e, cursor);
    if (editor != null) {
      editor.editor.scrollToLine(cursor.row, true, true, function() {
      });
      editor.editor.getSession().selection.moveCursorTo(cursor.row, cursor.column);
    }
  };
  /**
   * @param {string} event
   * @param {!Object} item
   * @return {undefined}
   */
  Connection.prototype.changeSelection = function(event, item) {
    var editor = this.getFileFromName(event);
    if (editor != null) {
      editor.editor.getSession().selection.setSelectionRange(item);
      editor.editor.scrollToLine(item.end.row, true, true, function() {
      });
    }
  };
  /**
   * @param {string} file
   * @return {undefined}
   */
  Connection.prototype.removeFile = function(file) {
    var tab;
    tab = this.getFileFromName(file);
    if (tab != null) {
      tab.$tab.detach();
      tab.$content.detach();
      tab.editor.destroy();
    } else {
      this.requestSync();
    }
  };
  /**
   * @param {string} path
   * @param {!Array} json
   * @param {string} parent
   * @return {?}
   */
  Connection.prototype.addFile = function(path, json, parent) {
    var that;
    var self = {};
    return self.name = path || "", self.content = parent || "", self.hidden = false, this.codeEditor.hasFile(path) === true && this.removeFile(path), that = this.codeEditor.addFile(self), that._fileID = json, that.editor.setReadOnly(true), that.editor.renderer.textarea.readOnly = true, that.editor.aceEditor && that.editor.aceEditor.showCursor(), that.editor.renderer.$cursorLayer.isVisible = true, that.editor.renderer.$cursorLayer.restartTimer(), that.editor.aceInstance.on("blur", function() {
      that.editor.renderer.$cursorLayer.setBlinking(true);
      that.editor.renderer.$cursorLayer.showCursor();
    }), that;
  };
  /**
   * @param {string} data
   * @param {string} path
   * @param {?} oldname
   * @return {undefined}
   */
  Connection.prototype.renameFile = function(data, path, oldname) {
    var file;
    var e;
    file = this.getFileFromName(data);
    if (file == null) {
      file = this.addFile(path);
      this.codeEditor.selectFile(path);
    } else {
      file.editor.setModeFromName(path);
      /** @type {string} */
      file.name = path;
      e = file.$tab.find(".file-name");
      e.text(path);
    }
  };
  /**
   * @param {string} doc
   * @param {!Object} delta
   * @return {undefined}
   */
  Connection.prototype.applyChangeOnFile = function(doc, delta) {
    var editor = this.getFileFromName(doc);
    if (editor !== null) {
      editor.editor.getSession().getDocument().applyDeltas([delta]);
      editor.editor.scrollToLine(delta.end.row, true, true, function() {
      });
    }
  };
  /**
   * @param {string} value
   * @return {?}
   */
  Connection.prototype.getFileFromName = function(value) {
    var i;
    /** @type {number} */
    i = 0;
    for (; i < this.codeEditor._files.length; i++) {
      if (this.codeEditor._files[i].name === value) {
        return this.codeEditor._files[i];
      }
    }
    return null;
  };
  /**
   * @param {?} fs_id
   * @return {?}
   */
  Connection.prototype.getFileById = function(fs_id) {
    var i;
    /** @type {number} */
    i = 0;
    for (; i < this.codeEditor._files.length; i++) {
      if (this.codeEditor._files[i]._fileID === fs_id) {
        return this.codeEditor._files[i];
      }
    }
    return null;
  };
  window.TrinketIO["export"]("trinket.broadcast.connection", {
    initialize : init
  });
}(window.jQuery, window.TrinketIO, window.ace), function() {
  /**
   * @param {string} params
   * @param {string} data
   * @return {undefined}
   */
  function callback(params, data) {
    connect(function() {
      realtimeSocket.send(params + "," + (typeof data === "object" ? JSON.stringify(data) : data));
    });
  }
  /**
   * @param {?} color
   * @param {string} source
   * @return {undefined}
   */
  function init(color, source) {
    switch(color) {
      case "reload":
        files[source] = self.getFile(source).replace(/[^\x00-\x7F]/g, "");
        callback("file", {
          name : source,
          contents : files[source]
        });
        break;
      case "completions":
        if (editor.completer && editor.completer.detach(), !options) {
          return;
        }
        /** @type {*} */
        var result = JSON.parse(source);
        if (result.id.toString() === options.id.toString()) {
          /** @type {number} */
          var value = Date.now() - options.when;
          if (window.ga && !moved) {
            window.ga("send", "event", "Embedded Python Interface", "Autocomplete", "Timing", value);
          }
          result = result.list || [];
          /** @type {number} */
          var i = 0;
          for (; i < result.length; i++) {
            result[i] = {
              caption : result[i].desc,
              docs : result[i].docs,
              value : result[i].name,
              score : 500 - i,
              meta : result[i].type,
              type : result[i].type
            };
          }
          if (options.inImport) {
            var connectors = self.getAllFiles({
              filter : "^.*\\.py$",
              values : false
            });
            var id2;
            for (id2 in connectors) {
              /** @type {string} */
              var value = id2.replace(/\.py$/, "");
              result.push({
                caption : value,
                value : value,
                type : "import",
                meta : "import",
                score : 500
              });
            }
          }
          options.cb(null, result);
          options = void 0;
        }
    }
  }
  /**
   * @param {string} test
   * @return {?}
   */
  function connect(test) {
    return rawDataIsArray ? test() : rawDataIsList ? void(test && p.push(test)) : (rawDataIsList = true, realtimeSocket = new SockJS(url), realtimeSocket.onopen = function() {
      var mockThread1 = {
        id : sn
      };
      realtimeSocket.send("session," + JSON.stringify(mockThread1));
    }, realtimeSocket.onmessage = function(event) {
      var obj = event.data.split(/,(.+)?/);
      if (obj[0] === "session_ready") {
        /** @type {boolean} */
        rawDataIsArray = true;
        /** @type {boolean} */
        rawDataIsList = false;
        for (; p.length;) {
          p.shift()();
        }
        if (test) {
          test();
        }
      } else {
        if (rawDataIsArray) {
          init(obj[0], obj[1]);
        }
      }
    }, void(realtimeSocket.onclose = function() {
      realtimeSocket = void 0;
      /** @type {boolean} */
      rawDataIsList = false;
      /** @type {boolean} */
      rawDataIsArray = false;
    }));
  }
  /**
   * @param {!Object} callback
   * @return {undefined}
   */
  function start(callback) {
    if (!q) {
      /** @type {boolean} */
      q = true;
      /** @type {!Object} */
      self = callback;
      dmp = new diff_match_patch;
      /** @type {number} */
      dmp.Diff_Timeout = 1;
      /** @type {number} */
      dmp.Diff_EditCost = 5;
      ace.require("ace/ext/language_tools").setCompleters([{
        identifierRegexps : [/[.a-zA-Z_0-9\$\-\u00A2-\uFFFF]/],
        getCompletions : function(state, session, pos, options, cb) {
          var node;
          var data;
          var token = session.getTokenAt(pos.row, pos.column);
          return token.type === "string" || token.type === "comment" ? cb(null, []) : (options && (state.completer && state.completer.detach(), options.cb(null, [])), options = {
            id : ++nChanges,
            cb : cb
          }, node = createNode(state, pos, options), data = {
            id : String(options.id),
            line : pos.row + 1,
            column : pos.column,
            file : state._fileName
          }, node && (data.patch = node), options.when = Date.now(), void callback("autocomplete", data));
        },
        getDocTooltip : function(item) {
          if (item.type == "function" && item.docs.length) {
            var b = item.docs.split("\n", 1)[0];
            var nth = item.docs.split(/\-{2,}\s*/)[1];
            /** @type {string} */
            item.docHTML = "<b>" + b + "</b>";
            if (nth) {
              item.docHTML += "<hr></hr>" + nth;
            }
          }
        }
      }]);
    }
  }
  /**
   * @param {!Object} editor
   * @param {string} name
   * @return {undefined}
   */
  function constructor(editor, name) {
    /**
     * @param {!Object} data
     * @return {undefined}
     */
    function refresh(data) {
      files[data.newName] = files[data.oldName];
      delete files[data.oldName];
      callback("file_rename", {
        oldName : data.oldName,
        newName : data.newName
      });
    }
    /**
     * @param {?} file
     * @return {undefined}
     */
    function f(file) {
      delete files[file._fileName];
      callback("file_remove", {
        fileName : file._fileName
      });
    }
    /**
     * @return {undefined}
     */
    function init() {
      if (/python/.test(editor.session.getMode().$id)) {
        callback("file", {
          name : editor._fileName,
          contents : editor.getValue()
        });
        files[editor._fileName] = editor.getValue();
        editor.on("file.rename", refresh);
        editor.on("destroy", f);
        editor.on("blur", function() {
          options = void 0;
          if (editor.completer) {
            editor.completer.detach();
          }
        });
        editor.setOptions({
          enableBasicAutocompletion : true,
          enableLiveAutocompletion : true
        });
      } else {
        editor.off("file.rename", refresh);
        editor.off("file.remove", f);
        editor.setOptions({
          enableBasicAutocompletion : false,
          enableLiveAutocompletion : false
        });
      }
    }
    if (window.ace && debug) {
      start(name);
      editor.on("changeMode", function() {
        init();
      });
      init();
    }
  }
  var dmp;
  var realtimeSocket;
  var rawDataIsList;
  var options;
  var self;
  var k = $({});
  /** @type {number} */
  var nChanges = 0;
  var clause_list_to_str = TrinketIO["import"]("utils.guid");
  /** @type {boolean} */
  var rawDataIsArray = false;
  var sn = "s" + clause_list_to_str("", 16);
  /** @type {!Array} */
  var p = [];
  /** @type {boolean} */
  var q = false;
  /** @type {boolean} */
  var moved = false;
  var json = window.trinketSocketConfig;
  /** @type {string} */
  var url = json.protocol + "://" + json.hostname + ":" + json.port + json.autocompletePath;
  /** @type {boolean} */
  var debug = json.enabled === "true";
  var files = {};
  /**
   * @param {!Object} data
   * @param {!Object} pos
   * @param {!Object} c
   * @return {?}
   */
  var createNode = function(data, pos, c) {
    var diffs;
    var patches;
    var results;
    var text = data.getValue();
    var text1 = void 0 === files[data._fileName] ? text : files[data._fileName];
    var i = data.session.doc.positionToIndex(pos, 0);
    return text = text.replace(/[^\x00-\x7F]/g, ""), text = text.replace(/(((?:^|;)[^\S\n\r]*)(from|import)((?:[^\S\r\n]+|\\[\r\n])+))((?:[\w.,*]+(?:[^\S\n\r]*\\[\r\n])*[^\S\n\r]*)*)(?:;|$)/gm, function(value, $0, canCreateDiscussions, whichNode, isSlidingUp, b, index) {
      return b = whichNode === "from" ? b.replace(/^[\w.]*/, function(e, size) {
        var endIndex = index + $0.length + size;
        var sortedValueArrays = e.split(".");
        /** @type {string} */
        var prefix = self.hasFile(e + ".py") ? "sessions." + sn + "." : "modules.";
        return i >= endIndex && i <= index + value.length && (pos.column += prefix.length, i <= endIndex + sortedValueArrays[0].length && (c.inImport = true)), prefix + e;
      }) : b.replace(/[^,]*/g, function(list, size) {
        if (size && !list) {
          return list;
        }
        var endIndex = index + $0.length + size;
        var cmlAdditionalAttribs = list.match(/[\w.]+/g) || [list];
        var key = cmlAdditionalAttribs[0];
        /** @type {string} */
        var prefix = self.hasFile(key + ".py") ? "sessions." + sn + "." : "modules.";
        /** @type {string} */
        var n = cmlAdditionalAttribs.length === 1 && key.match(/[\w.]/) ? " as " + key : "";
        return i >= endIndex && i <= endIndex + list.length && (i <= endIndex + list.indexOf(key) + key.length ? (pos.column += prefix.length, i <= endIndex + list.split(".")[0].length && (c.inImport = true)) : pos.column += prefix.length + key.length + n.length), list.replace(key, prefix + key + n);
      }), $0 + b;
    }), text !== text1 ? (files[data._fileName] = text, diffs = dmp.diff_main(text1, text, true), diffs.length > 2 && dmp.diff_cleanupEfficiency(diffs), patches = dmp.patch_make(text1, text, diffs), results = dmp.patch_toText(patches)) : void 0;
  };
  window.TrinketIO["export"]("python.editor.autocomplete", {
    initialize : constructor,
    on : function() {
      return k.on.apply(k, arguments);
    },
    off : function() {
      return k.off.apply(k, arguments);
    },
    setInLibrary : function(page) {
      /** @type {boolean} */
      moved = page;
    }
  });
}(), function() {
  /**
   * @return {undefined}
   */
  function link() {
    if (!loadingContainer.__initialized) {
      /** @type {boolean} */
      loadingContainer.__initialized = true;
      $("body").append(loadingContainer);
    }
  }
  /**
   * @param {!Object} ed
   * @return {undefined}
   */
  function init(ed) {
    /**
     * @return {undefined}
     */
    function trigger() {
      if (w) {
        show(container);
        /** @type {boolean} */
        w = false;
      }
    }
    /**
     * @param {!Array} folder
     * @return {undefined}
     */
    function show(folder) {
      var marker;
      var errorMessageDropdown;
      var i;
      if (folder && folder.length) {
        for (; folder.length;) {
          marker = folder.pop();
          errorMessageDropdown = map[marker.range.start.row][marker.range.start.column];
          /** @type {number} */
          i = 0;
          for (; i < errorMessageDropdown.length; i++) {
            if (errorMessageDropdown[i].id === marker.id) {
              errorMessageDropdown.splice(i, 1);
              break;
            }
          }
          ed.getSession().removeMarker(marker.id);
        }
      }
    }
    /**
     * @param {!Array} init
     * @param {!Object} end
     * @param {string} date
     * @param {!Object} f
     * @return {undefined}
     */
    function callback(init, end, date, f) {
      /** @type {number} */
      var i = end.line - 1;
      var range = new Range(i, end.start, i, end.end);
      var object = {
        id : ed.getSession().addMarker(range, date || "variable-undefined"),
        data : f,
        range : range
      };
      init.push(object);
      /** @type {boolean} */
      w = true;
      if (!map[i]) {
        /** @type {!Array} */
        map[i] = [];
      }
      if (!map[i][end.start]) {
        /** @type {!Array} */
        map[i][end.start] = [];
      }
      map[i][end.start].push(object);
    }
    /**
     * @param {!Object} data
     * @param {!Object} fn
     * @return {undefined}
     */
    function traverse(data, fn) {
      var tab;
      var index;
      var val;
      var i = data && data._astname;
      if (i) {
        if (fn[i] && fn[i].enter && fn[i].enter(data), data._fields) {
          /** @type {number} */
          tab = 0;
          for (; tab < data._fields.length; tab = tab + 2) {
            if (val = data._fields[tab + 1](data)) {
              if (val._astname) {
                traverse(val, fn);
              } else {
                if (val.constructor === Array && val.length && val[0] && val[0]._astname) {
                  /** @type {number} */
                  index = 0;
                  for (; index < val.length; index++) {
                    traverse(val[index], fn);
                  }
                }
              }
            }
          }
        }
        if (fn[i] && fn[i].leave) {
          fn[i].leave(data);
        }
      }
    }
    /**
     * @return {undefined}
     */
    function end() {
      var customAnimation;
      var parse;
      var ast;
      var ret;
      var indexStack;
      var i;
      /** @type {string} */
      var filename = "main.py";
      var source = ed.getValue();
      var branch = window.TrinketApp.getKey("setup-code");
      if (branch && (source = branch + "\n" + source), trigger(), !/import\s+\*/.test(source)) {
        try {
          parse = Sk.parse(filename, source);
          ast = Sk.astFromParse(parse.cst, filename, parse.flags);
          ret = Sk.symboltable(ast, filename);
        } catch (o) {
          return;
        }
        /** @type {!Array} */
        indexStack = [];
        i = ret.top;
        customAnimation = {
          enter : function(key) {
            indexStack.push(i);
            i = ret.getStsForAst(key);
          },
          leave : function(cb) {
            i = indexStack.pop();
          }
        };
        traverse(ast, {
          FunctionDef : customAnimation,
          ClassDef : customAnimation,
          Name : {
            enter : function(e) {
              var b = e.id.v;
              var doc = i.lookup(b);
              if (!(!doc.is_global() || Sk.builtins.hasOwnProperty(b) || css.hasOwnProperty(b) || ret.global.hasOwnProperty(b) && (ret.top.lookup(b).is_assigned() || ret.top.lookup(b).is_imported()))) {
                callback(container, {
                  line : e.lineno,
                  start : e.col_offset,
                  end : e.col_offset + b.length
                }, false, {
                  message : "<code>" + b + "</code> 并没有定义. 你是不是有别的意思?"
                });
              }
            }
          }
        });
      }
    }
    /**
     * @param {number} i
     * @param {number} pos
     * @return {?}
     */
    function create(i, pos) {
      var p = ed.session.getTokenAt(i, pos);
      return (!p || p.type === "text" && /^\s+$/.test(p.value)) && (p = ed.session.getTokenAt(i, pos + 1)), p && (p.row = i, map[i] && map[i][p.start] && (p.marker = map[i][p.start][0])), p;
    }
    /**
     * @return {undefined}
     */
    function resize() {
      trigger();
      if (end_timer) {
        clearTimeout(end_timer);
      }
      /** @type {number} */
      end_timer = setTimeout(end, 883);
    }
    /**
     * @param {!Object} e
     * @return {undefined}
     */
    function onMouseMove(e) {
      var location;
      var overlay;
      if (x) {
        loadingContainer.hide();
        /** @type {boolean} */
        x = false;
      }
      if (w) {
        location = e.getDocumentPosition();
        overlay = create(location.row, location.column);
        if (overlay && overlay.marker && overlay.marker.data && overlay.marker.data.message) {
          /** @type {boolean} */
          x = true;
          loadingContainer.css({
            left : e.domEvent.pageX,
            top : e.domEvent.pageY + 10
          }).html(overlay.marker.data.message).show();
        }
      }
    }
    /**
     * @param {?} features
     * @param {!Object} input
     * @return {undefined}
     */
    function render(features, input) {
      var location = input.getCursor();
      var b = create(location.row, location.column);
      if (!(!b || a.row === b.row && a.start === b.start)) {
        if (b.type === "keyword" && o[b.value]) {
          self.trigger("info.token", {
            token : b,
            title : o[b.value],
            url : trinketConfig.prefix("/partials/python-docs/keywords/" + b.value + ".html")
          });
        } else {
          if (b.marker) {
            self.trigger("info.token", {
              token : b,
              title : b.marker.data.message
            });
          } else {
            self.trigger("info.token", void 0);
          }
        }
        a = b;
      }
    }
    /**
     * @return {undefined}
     */
    function select() {
      if (!y) {
        /** @type {boolean} */
        y = true;
        if (!Range) {
          Range = ace.require("ace/range").Range;
        }
        ed.on("change", resize);
        ed.on("mousemove", onMouseMove);
        ed.session.selection.on("changeCursor", render);
        end();
      }
    }
    /**
     * @return {undefined}
     */
    function init() {
      if (y) {
        /** @type {boolean} */
        y = false;
        ed.off("change", resize);
        ed.off("mousemove", onMouseMove);
        ed.session.selection.off("changeCursor", render);
      }
    }
    /**
     * @return {undefined}
     */
    function done() {
      if (/python/.test(ed.session.getMode().$id)) {
        select();
      } else {
        init();
      }
    }
    var end_timer;
    /** @type {!Array} */
    var container = [];
    /** @type {!Array} */
    var map = [];
    /** @type {boolean} */
    var w = false;
    /** @type {boolean} */
    var x = false;
    /** @type {boolean} */
    var y = false;
    var a = {};
    link();
    ed.on("changeMode", function() {
      done();
    });
    done();
  }
  var Range;
  var self = $({});
  var css = {
    True : 1,
    False : 1,
    None : 1,
    NotImplemented : 1,
    Ellipsis : 1,
    __debug__ : 1,
    "float" : 1,
    "int" : 1,
    "long" : 1
  };
  var loadingContainer = $('<div class="editor-tooltip"></div>').hide();
  var o = {
    and : "The boolean <code>and</code> operator.",
    as : "Module aliasing: <code>import random as rnd</code>.",
    assert : "Use <code>assert</code> to test assumptions.",
    "break" : "Use <code>break</code> to stop the (loop) cycle.",
    "class" : "Use <code>class</code> to create new user defined modules.",
    "continue" : "Use <code>continue</code> to skip to the next (loop) cycle.",
    def : "A <code>def</code> defines a function.",
    del : "Use <code>del</code> to delete an object.",
    elif : "Use <code>elif</code> for else-if conditionals.",
    "else" : "<code>else</code> is executed unless <code>if</code> is true.",
    except : "Use <code>except</code> to catch an exception.",
    exec : "<code>exec</code> is not yet implemented.",
    "finally" : "<code>finally</code> blocks are always executed.",
    "for" : "<code>for</code> iterates over a list in order.",
    from : "Use <code>from</code> to import a specific part of a module.",
    global : "<code>global</code> accesses variables defined outside functions",
    "if" : "Use <code>if</code> to conditionally execute statements.",
    "import" : "Use <code>import</code> to use external modules.",
    "in" : "<code>in</code> tests if a sequence contains a value.",
    is : "<code>is</code> tests for object identity.",
    lambda : "<code>lambda</code> creates a new anonymous function",
    not : "The boolean <code>not</code> operator.",
    or : "The boolean <code>or</code> operator.",
    pass : "<code>pass</code> does nothing at all, seriously.",
    print : "Use <code>print</code> to write output.",
    raise : "Use <code>raise</code> to create an exception.",
    "return" : "Use <code>return</code> to exit a function.",
    "try" : "Use <code>try</code> to capture exceptions.",
    "while" : "Use <code>while</code> to loop until a condition is false.",
    "with" : "<code>with</code> simplifies exception handling.",
    "yield" : "<code>yield</code> exits a generator with a value."
  };
  window.TrinketIO["export"]("python.editor.hints", {
    initialize : init,
    on : function() {
      return self.on.apply(self, arguments);
    },
    off : function() {
      return self.off.apply(self, arguments);
    }
  });
}(), function() {
  /**
   * @return {undefined}
   */
  function _addTest() {
  }
  /**
   * @param {string} trackInfoUrl
   * @return {undefined}
   */
  function refreshTagDisplay(trackInfoUrl) {
    /** @type {string} */
    yuiDir = trackInfoUrl;
    $("#test-totals").html(yuiPath + " out of " + yuiDir + " tests passed");
  }
  /**
   * @param {?} callback
   * @param {string} coords
   * @param {string} markdown
   * @return {undefined}
   */
  function show(callback, coords, markdown) {
    value = value + 1;
    yuiPath = yuiPath + 1;
    var path = cb("unittest-pass", {
      testNumber : value,
      shortDescription : coords,
      description : markdown
    });
    $("#unittest-accordion").append($(path));
    $("#test-totals").html(yuiPath + " out of " + yuiDir + " tests passed");
    $(document).foundation();
  }
  /**
   * @param {?} Knex
   * @param {string} opbeat
   * @param {string} version
   * @param {string} type
   * @return {undefined}
   */
  function exports(Knex, opbeat, version, type) {
    value = value + 1;
    type = type.replace("\n", "<br>");
    var path = cb("unittest-fail", {
      testNumber : value,
      shortDescription : opbeat,
      description : version,
      reason : type
    });
    $("#unittest-accordion").append($(path));
    $(document).foundation();
  }
  /**
   * @param {string} message
   * @param {string} val
   * @return {undefined}
   */
  function addError(message, val) {
    value = value + 1;
    val = val.replace("\n", "<br>");
    var path = cb("unittest-error", {
      testNumber : value,
      shortDescription : message,
      reason : val
    });
    $("#unittest-accordion").append($(path));
    $(document).foundation();
  }
  /**
   * @return {?}
   */
  function jsonFixer() {
    return value;
  }
  var value;
  var yuiDir;
  var yuiPath;
  var cb = window.TrinketIO["import"]("utils.template");
  window.TrinketIO["export"]("python.editor.unittests", {
    initializePlugin : function() {
      /** @type {number} */
      value = 0;
      /** @type {number} */
      yuiDir = 0;
      /** @type {number} */
      yuiPath = 0;
      $("li.accordion-navigation").remove();
      $("#unittest-accordion").on("toggled", function(a, svgID) {
        var toggle = $(".open-close-indicator.fa-angle-down");
        if (toggle.addClass("fa-angle-right"), toggle.removeClass("fa-angle-down"), $(".content.active").length) {
          var angle = $(svgID).parent().find(".open-close-indicator");
          angle.removeClass("fa-angle-right");
          angle.addClass("fa-angle-down");
        }
      });
    },
    addTest : _addTest,
    addSuccess : show,
    addFailure : exports,
    addError : addError,
    setNumberOfTests : refreshTagDisplay,
    getNumberOfTestsRun : jsonFixer
  });
}(), function(exporting) {
  exporting["export"]("sendSignalToSkulpt", function(params) {
    if (Sk.signals != null && Sk.signals.signal != null) {
      Sk.signals.signal(params);
    }
  });
}(window.TrinketIO), function(exports) {
  /**
   * @return {undefined}
   */
  function options() {
    this._eventListeners;
    /** @type {!Array} */
    this._eventQueue = [];
    /** @type {null} */
    this._threadHandler = null;
    this._isDownDict = {};
    this._signal = signal;
  }
  /**
   * @param {!Event} event
   * @return {undefined}
   */
  function onKeyDown(event) {
    var sep;
    var key;
    var i;
    if (buttons[event.which]) {
      event.preventDefault();
      /** @type {string} */
      sep = "";
      i = get(event.which);
      key = buttons[i].keyword;
      if (exports.runtime("usingSenseHat3d")) {
        $("#_sense_hat_joystick_").removeClass(p).addClass(buttons[i].transform);
        $("#_astro_pi_joystick_top_").removeClass(p).addClass(buttons[i].transform);
        $("#_astro_pi_joystick_base_").removeClass(p).addClass(buttons[i].transform);
        p = buttons[i].transform;
      } else {
        $("#_sense_hat" + _flash_api).hide();
        $("#_sense_hat" + buttons[i].state).show();
        _flash_api = buttons[i].state;
      }
      if (Sk.sense_hat.sensestick.isKeyDown(key)) {
        /** @type {number} */
        sep = options.STATE_HOLD;
      } else {
        Sk.sense_hat.sensestick.addKeyDownEventToDict(key);
      }
      window.sense_hat.sensestick.push(buttons[i].key, sep || options.STATE_PRESS);
    } else {
      if (event.ctrlKey && String.fromCharCode(event.which).toLowerCase() === "c") {
        $(document).trigger("trinket.code.stop");
      } else {
        if (exports.runtime("usingSenseHat3d") && exports.runtime("sense_hat_enclosure") === "astro-pi" && change[event.which]) {
          key = change[event.which].key;
          $("#_astro_pi_button_" + key + "_").addClass(button);
        }
      }
    }
  }
  /**
   * @param {!Event} event
   * @return {undefined}
   */
  function search(event) {
    var key;
    var i;
    if (buttons[event.which]) {
      event.preventDefault();
      i = get(event.which);
      key = buttons[i].keyword;
      if (exports.runtime("usingSenseHat3d")) {
        $("#_sense_hat_joystick_").removeClass(p).addClass(n);
        $("#_astro_pi_joystick_top_").removeClass(p).addClass(n);
        $("#_astro_pi_joystick_base_").removeClass(p).addClass(n);
        /** @type {string} */
        p = n;
      } else {
        $("#_sense_hat" + _flash_api).hide();
        $("#_sense_hat_joystick_rest_").show();
        /** @type {string} */
        _flash_api = "_joystick_rest_";
      }
      Sk.sense_hat.sensestick.removeKeyDownEventFromDict(key);
      window.sense_hat.sensestick.push(buttons[i].key, options.STATE_RELEASE);
    } else {
      if (exports.runtime("usingSenseHat3d") && exports.runtime("sense_hat_enclosure") === "astro-pi" && change[event.which]) {
        key = change[event.which].key;
        $("#_astro_pi_button_" + key + "_").removeClass(button);
      }
    }
  }
  /**
   * @param {!Event} event
   * @return {undefined}
   */
  function process(event) {
    var sep;
    var key;
    var i;
    var masterVideoId;
    if (buttons[event.which]) {
      event.preventDefault();
      /** @type {string} */
      sep = "";
      i = get(event.which);
      key = buttons[i].keyword;
      masterVideoId = exports.runtime("sense_hat_enclosure") || "sense-hat";
      /** @type {string} */
      masterVideoId = masterVideoId === "sense-hat" ? "_sense_hat" : "_astro_pi";
      $("#" + masterVideoId + _flash_api).hide();
      $("#" + masterVideoId + buttons[i].state).show();
      _flash_api = buttons[i].state;
      if (Sk.sense_hat.sensestick.isKeyDown(key)) {
        /** @type {number} */
        sep = options.STATE_HOLD;
      } else {
        Sk.sense_hat.sensestick.addKeyDownEventToDict(key);
      }
      window.sense_hat.sensestick.push(buttons[i].key, sep || options.STATE_PRESS);
    } else {
      if (event.ctrlKey && String.fromCharCode(event.which).toLowerCase() === "c") {
        $(document).trigger("trinket.code.stop");
      } else {
        if (exports.runtime("usingSenseHat3d") && exports.runtime("sense_hat_enclosure") === "astro-pi" && change[event.which]) {
          key = change[event.which].key;
          $("#_astro_pi_button_" + key + "_rest_").hide();
          $("#_astro_pi_button_" + key + "_pressed_").show();
        }
      }
    }
  }
  /**
   * @param {!Event} event
   * @return {undefined}
   */
  function handle(event) {
    var key;
    var i;
    var masterVideoId;
    if (buttons[event.which]) {
      event.preventDefault();
      i = get(event.which);
      key = buttons[i].keyword;
      masterVideoId = exports.runtime("sense_hat_enclosure") || "sense-hat";
      /** @type {string} */
      masterVideoId = masterVideoId === "sense-hat" ? "_sense_hat" : "_astro_pi";
      $("#" + masterVideoId + _flash_api).hide();
      $("#" + masterVideoId + "_joystick_rest_").show();
      /** @type {string} */
      _flash_api = "_joystick_rest_";
      Sk.sense_hat.sensestick.removeKeyDownEventFromDict(key);
      window.sense_hat.sensestick.push(buttons[i].key, options.STATE_RELEASE);
    } else {
      if (exports.runtime("usingSenseHat3d") && exports.runtime("sense_hat_enclosure") === "astro-pi" && change[event.which]) {
        key = change[event.which].key;
        $("#_astro_pi_button_" + key + "_pressed_").hide();
        $("#_astro_pi_button_" + key + "_rest_").show();
      }
    }
  }
  /**
   * @param {number} i
   * @return {?}
   */
  function get(i) {
    var n;
    return buttons[i].keyword === "Enter" ? i : (n = Math.abs($("#sense_hat_angle").val()), n && (i = i + n / 90, i > 40 && (i = i - 4)), i);
  }
  /**
   * @return {undefined}
   */
  function normalize() {
    /** @type {boolean} */
    var b = exports.runtime("usingSenseHatFlat") ? true : false;
    if (!exports.runtime("usingSenseHat3d") || b) {
      /** @type {!Array} */
      var failureRecaps = ["_sense_hat"];
      /** @type {!Array} */
      var pipelets = ["_joystick_enter_", "_joystick_up_", "_joystick_down_", "_joystick_left_", "_joystick_right_"];
      /** @type {!Array} */
      var trytes = ["_joystick_rest_"];
      if (b) {
        failureRecaps.push("_astro_pi");
      }
      failureRecaps.forEach(function(a) {
        pipelets.forEach(function(i) {
          $("#" + a + i).hide();
        });
        trytes.forEach(function(i) {
          $("#" + a + i).show();
        });
      });
    }
    if (b) {
      /** @type {function(!Event): undefined} */
      data = process;
      /** @type {function(!Event): undefined} */
      view = handle;
    } else {
      /** @type {function(!Event): undefined} */
      data = onKeyDown;
      /** @type {function(!Event): undefined} */
      view = search;
    }
    $(document).on("keydown", "#sense-hat-listener", data);
    $(document).on("keyup", "#sense-hat-listener", view);
  }
  !function(jQuery) {
    jQuery.eventEmitter = {
      _JQInit : function() {
        this._JQ = jQuery(this);
      },
      emit : function(evt, data) {
        if (!this._JQ) {
          this._JQInit();
        }
        this._JQ.trigger(evt, data);
      },
      once : function(evt, handler) {
        if (!this._JQ) {
          this._JQInit();
        }
        this._JQ.one(evt, handler);
      },
      on : function(type, callback) {
        if (!this._JQ) {
          this._JQInit();
        }
        this._JQ.bind(type, callback);
      },
      off : function(type, callback) {
        if (!this._JQ) {
          this._JQInit();
        }
        this._JQ.unbind(type, callback);
      }
    };
  }($);
  var signal = exports["import"]("sendSignalToSkulpt");
  $.extend(options.prototype, jQuery.eventEmitter);
  /**
   * @return {undefined}
   */
  options.prototype.triggerKeyboardInterrupt = function() {
    this.emit("sensestick.input", {
      type : "keyboardinterrupt"
    });
  };
  /**
   * @param {!Object} keyProp
   * @return {undefined}
   */
  options.prototype.addKeyDownEventToDict = function(keyProp) {
    /** @type {boolean} */
    this._isDownDict[keyProp] = true;
  };
  /**
   * @param {!Object} keyProp
   * @return {undefined}
   */
  options.prototype.removeKeyDownEventFromDict = function(keyProp) {
    delete this._isDownDict[keyProp];
  };
  /**
   * @param {!Object} key
   * @return {?}
   */
  options.prototype.isKeyDown = function(key) {
    return this._isDownDict[key] === true;
  };
  /**
   * @param {string} name
   * @param {?} data
   * @param {!Object} duration
   * @return {undefined}
   */
  options.prototype.push = function(name, data, duration) {
    var message = {
      type : duration != null ? parseInt(duration) : options.EV_KEY,
      key : parseInt(name),
      state : parseInt(data),
      timestamp : Date.now()
    };
    this._eventQueue.push(message);
    this.emit("sensestick.input", message);
  };
  /**
   * @return {undefined}
   */
  options.prototype.destroy = function() {
    if (this._threadHandler) {
      this.off("sensestick.input", this._threadHandler);
    }
    $(document).off("keydown", "#sense-hat-listener", data);
    $(document).off("keyup", "#sense-hat-listener", view);
    this._isDownDict = {};
    /** @type {!Array} */
    this._eventQueue = [];
  };
  /** @type {number} */
  options.EV_KEY = 1;
  /** @type {number} */
  options.STATE_RELEASE = 0;
  /** @type {number} */
  options.STATE_PRESS = 1;
  /** @type {number} */
  options.STATE_HOLD = 2;
  /** @type {number} */
  options.KEY_UP = 103;
  /** @type {number} */
  options.KEY_LEFT = 105;
  /** @type {number} */
  options.KEY_RIGHT = 106;
  /** @type {number} */
  options.KEY_DOWN = 108;
  /** @type {number} */
  options.KEY_ENTER = 28;
  var data;
  var view;
  /** @type {string} */
  var _flash_api = "_joystick_rest_";
  /** @type {string} */
  var n = "rest";
  /** @type {string} */
  var p = n;
  /** @type {string} */
  var button = "pressed";
  var buttons = {
    13 : {
      state : "_joystick_enter_",
      key : options.KEY_ENTER,
      keyword : "Enter",
      transform : "enter"
    },
    37 : {
      state : "_joystick_left_",
      key : options.KEY_LEFT,
      keyword : "ArrowLeft",
      transform : "left"
    },
    38 : {
      state : "_joystick_up_",
      key : options.KEY_UP,
      keyword : "ArrowUp",
      transform : "up"
    },
    39 : {
      state : "_joystick_right_",
      key : options.KEY_RIGHT,
      keyword : "ArrowRight",
      transform : "right"
    },
    40 : {
      state : "_joystick_down_",
      key : options.KEY_DOWN,
      keyword : "ArrowDown",
      transform : "down"
    }
  };
  var change = {
    65 : {
      key : "a"
    },
    66 : {
      key : "b"
    },
    68 : {
      key : "d"
    },
    76 : {
      key : "l"
    },
    82 : {
      key : "r"
    },
    85 : {
      key : "u"
    }
  };
  exports["export"]("python.sense-stick", {
    initJoystick : normalize,
    SenseStickDevice : options
  });
}(window.TrinketIO), function(me, setting) {
  /**
   * @return {?}
   */
  function formatDate() {
    /** @type {number} */
    var HeaderLevenshteinDistanceToLengthRatio = Date.now();
    /** @type {number} */
    var maxDistanceToConsiderSimilar = 1e3 * HeaderLevenshteinDistanceToLengthRatio;
    return maxDistanceToConsiderSimilar;
  }
  /**
   * @param {number} value
   * @return {?}
   */
  function get(value) {
    return value < 0 && (value = value + 360), Math.round(10 * value) / 10 % 361;
  }
  /**
   * @param {!Object} data
   * @return {undefined}
   */
  function init(data) {
    me.sense_hat.rtimu.raw_orientation = data.asArray();
    var length;
    var str;
    var val;
    var prop;
    var expected = {
      pitch : get(data.pitch),
      roll : get(data.roll),
      yaw : get(data.yaw),
      rotation_matrix : data.matrix
    };
    /** @type {number} */
    length = 0;
    for (; x > length; length++) {
      prop = props[length];
      /** @type {string} */
      str = "sense-hat-" + prop;
      /** @type {string} */
      val = "sense_hat_" + prop;
      if ($("span." + str).length) {
        $("span." + str).html(expected[prop]);
      }
      $("#" + val).val(expected[prop]).change();
    }
  }
  /**
   * @return {undefined}
   */
  function render() {
    var value = me.sense_hat.rtimu.timestamp;
    if (value === null || void 0 === value) {
      value = formatDate();
    }
    var timestamp = formatDate();
    /** @type {number} */
    var options = (timestamp - value) / 1e6;
    if (options === 0) {
      /** @type {number} */
      options = 1;
    }
    var g = me.sense_hat.rtimu.raw_old_orientation;
    var h = Geometry.degToRad(me.sense_hat.rtimu.raw_orientation);
    /** @type {!Array} */
    var from = [h[0] - g[0], h[1] - g[1], h[2] - g[2]];
    from = Geometry.divideArrayWithScalar(from, options);
    var a = h[0];
    var r = h[1];
    var i = h[2];
    /** @type {number} */
    var y = Math.cos(i);
    /** @type {number} */
    var f = Math.cos(r);
    /** @type {number} */
    var s = Math.cos(a);
    /** @type {number} */
    var x = Math.sin(i);
    /** @type {number} */
    var w = Math.sin(r);
    /** @type {number} */
    var z = Math.sin(a);
    /** @type {!Array} */
    var geometry = [[y * f, y * w * z - s * x, x * z + y * s * w], [f * x, y * s + x * w * z, s * x * w - y * z], [-w, f * z, f * s]];
    var node = Geometry.transpose3x3Matrix(geometry);
    var rx = Geometry.dot3x3and3x1(node, Geometry.Defaults.GRAVITY);
    var n = Geometry.dot3x3and3x1(node, Geometry.Defaults.NORTH);
    me.sense_hat.rtimu.raw_old_orientation = h;
    me.sense_hat.rtimu.fusionPose = h;
    me.sense_hat.rtimu.timestamp = timestamp;
    rx = abs(rx, 0.1);
    /** @type {!Array} */
    me.sense_hat.rtimu.accel = [Geometry.clamp(rx[0], -8, 8), Geometry.clamp(rx[1], -8, 8), Geometry.clamp(rx[2], -8, 8)];
    from = abs(from, 0.5);
    /** @type {!Array} */
    me.sense_hat.rtimu.gyro = [from[0], from[1], from[2]];
    n = abs(n, 0.01);
    /** @type {!Array} */
    me.sense_hat.rtimu.compass = [100 * n[0], 100 * n[1], 100 * n[2]];
  }
  /**
   * @param {!Array} n
   * @param {number} v
   * @param {number} x
   * @return {?}
   */
  function abs(n, v, x) {
    if (x == null) {
      /** @type {number} */
      x = 5;
    }
    /** @type {!Array} */
    var Aj = [0, 0, 0];
    /** @type {number} */
    var xStop = 0;
    for (; x > xStop; xStop++) {
      Aj[0] += log(n[0], v);
      Aj[1] += log(n[1], v);
      Aj[2] += log(n[2], v);
    }
    return Aj[0] /= x, Aj[1] /= x, Aj[2] /= x, Aj;
  }
  /**
   * @return {?}
   */
  function transform() {
    if (this.haveNextNextGaussian) {
      return this.haveNextNextGaussian = false, this.nextNextGaussian;
    }
    var v1;
    var v2;
    var w;
    do {
      /** @type {number} */
      v1 = 2 * Math.random() - 1;
      /** @type {number} */
      v2 = 2 * Math.random() - 1;
      /** @type {number} */
      w = v1 * v1 + v2 * v2;
    } while (w >= 1 || w === 0);
    /** @type {number} */
    var norm = Math.sqrt(-2 * Math.log(w) / w);
    return this.nextNextGaussian = v2 * norm, this.haveNextNextGaussian = true, v1 * norm;
  }
  /**
   * @param {number} a
   * @param {number} x
   * @param {!Function} next
   * @return {?}
   */
  function log(a, x, next) {
    /** @type {number} */
    var t = 0.2 * transform();
    var value = a + t * x;
    return next && console.info("mean: ", a, t, x, " rg:", value), value;
  }
  /**
   * @param {number} y
   * @param {number} dy
   * @return {?}
   */
  function lightOpacity(y, dy) {
    var value = transform();
    var y2 = y + value * dy;
    var ty = y + dy;
    /** @type {number} */
    var newY = y - dy;
    return Math.min(Math.max(newY, y2), ty);
  }
  /**
   * @param {number} value
   * @param {number} name
   * @param {number} ctx
   * @param {!Object} data
   * @return {undefined}
   */
  function Image(value, name, ctx, data) {
    /** @type {number} */
    this.pitch = value;
    /** @type {number} */
    this.roll = name;
    /** @type {number} */
    this.yaw = ctx;
    /** @type {!Object} */
    this.matrix = data;
  }
  /**
   * @return {undefined}
   */
  function run() {
    inputel = $(".orientation-stage");
    divel = $(".orientation-layer");
    _$compass = $("#orientation-reset-btn");
    $cancel = $("#enclosure-toggle");
    if (setting.runtime("mission-zero")) {
      $("#enclosure-toggle-container").hide();
    }
    var i;
    var h;
    /** @type {number} */
    i = 0;
    for (; i < props.length; i++) {
      /** @type {string} */
      h = "sense_hat_" + props[i];
      $("#" + h).data("skip-trigger", true);
      if (typeof setting.runtime(h) !== "undefined") {
        $("#" + h).val(setting.runtime(h));
        setting.runtime(h, void 0);
      }
    }
    $("#sense_hat_pitch").val();
    $("#sense_hat_roll").val();
    $("#sense_hat_yaw").val();
    parseInt($("#sense_hat_angle").val());
    $("#sense_hat_rotation_matrix").val();
    me.set_onrotate(function(degrees, srcWidth, val) {
      init(new Image(180 * degrees / Math.PI, 180 * srcWidth / Math.PI, 180 * val / Math.PI));
    });
    var TEST_DATA = new Image(90, 0, 0);
    init(TEST_DATA);
    _$compass.on("click", function(event) {
      event.preventDefault();
      var img_tag_small;
      /** @type {number} */
      var value = 90;
      /** @type {number} */
      var width = 0;
      /** @type {number} */
      var height = 0;
      /** @type {!Array} */
      var i = [0, 0, 1];
      if (setting.runtime("sense_hat_enclosure") === "astro-pi") {
        /** @type {number} */
        i[0] = 0;
        /** @type {number} */
        i[2] = 1;
      }
      me.rotatemodel(Geometry.degToRad(value), Geometry.degToRad(width), Geometry.degToRad(height));
      img_tag_small = Geometry.degToRad(height);
      var element = new Image(value, width, height);
      init(element);
    });
    if (setting.runtime("sense_hat_enclosure") && setting.runtime("sense_hat_enclosure") !== "sense-hat") {
      setting.runtime("sense_hat_enclosure", "sense-hat");
    } else {
      setting.runtime("sense_hat_enclosure", "astro-pi");
    }
    $("#sense_hat_enclosure").data("skip-trigger", true);
    /** @type {!Function} */
    var reject = setting.runtime("usingSenseHatFlat") ? set : update;
    reject();
    $cancel.on("click", reject);
  }
  /**
   * @param {?} apiBackendDoc
   * @return {undefined}
   */
  function update(apiBackendDoc) {
    if (setting.runtime("sense_hat_enclosure") === "sense-hat") {
      $("#_sense_hat_wrapper_").addClass("hide");
      $("#_astro_pi_wrapper_").removeClass("hide");
      setting.runtime("sense_hat_enclosure", "astro-pi");
      $("#enclosure-toggle").attr("src", "https://trinket-app-assets.trinket.io/sense-hat-v0/sense-hat-top.png");
    } else {
      $("#_sense_hat_wrapper_").removeClass("hide");
      $("#_astro_pi_wrapper_").addClass("hide");
      setting.runtime("sense_hat_enclosure", "sense-hat");
      $("#enclosure-toggle").attr("src", "https://trinket-app-assets.trinket.io/sense-hat-v0/astro-pi-top.png");
    }
    draw();
    $("#sense_hat_enclosure").val(setting.runtime("sense_hat_enclosure")).trigger("change");
  }
  /**
   * @return {undefined}
   */
  function set() {
    var a = $("#sense-hat-enclosure").attr("class") ? $("#sense-hat-enclosure").attr("class").split(/\s+/) : [];
    var b = a.indexOf("hide");
    var d = $("#_sense_hat_leds_").attr("class") ? $("#_sense_hat_leds_").attr("class").split(/\s+/) : [];
    var el = d.indexOf("hide");
    var f = $("#_sense_hat_joystick_").attr("class") ? $("#_sense_hat_joystick_").attr("class").split(/\s+/) : [];
    var e = f.indexOf("hide");
    var h = $("#_sense_hat_back_").attr("class") ? $("#_sense_hat_back_").attr("class").split(/\s+/) : [];
    var x = h.indexOf("hide");
    var ret = $("#astro-pi-enclosure").attr("class") ? $("#astro-pi-enclosure").attr("class").split(/\s+/) : [];
    var $el = ret.indexOf("hide");
    var l = $("#_astro_pi_back_").attr("class") ? $("#_astro_pi_back_").attr("class").split(/\s+/) : [];
    var items = l.indexOf("hide");
    if (setting.runtime("sense_hat_enclosure") === "sense-hat") {
      if (b < 0) {
        a.push("hide");
        $("#sense-hat-enclosure").attr("class", a.join(" "));
      }
      if (el < 0) {
        d.push("hide");
        $("#_sense_hat_leds_").attr("class", d.join(" "));
      }
      if (e < 0) {
        f.push("hide");
        $("#_sense_hat_joystick_").attr("class", f.join(" "));
      }
      if (x < 0) {
        h.push("hide");
        $("#_sense_hat_back_").attr("class", h.join(" "));
      }
      if ($el >= 0) {
        ret.splice($el, 1);
        $("#astro-pi-enclosure").attr("class", ret.join(" "));
      }
      if (items >= 0) {
        l.splice(items, 1);
        $("#_astro_pi_back_").attr("class", l.join(" "));
      }
      setting.runtime("sense_hat_enclosure", "astro-pi");
      $("#enclosure-toggle").attr("src", "https://trinket-app-assets.trinket.io/sense-hat-v0/sense-hat-top.png");
    } else {
      if (b >= 0) {
        a.splice(b, 1);
        $("#sense-hat-enclosure").attr("class", a.join(" "));
      }
      if (el >= 0) {
        d.splice(el, 1);
        $("#_sense_hat_leds_").attr("class", d.join(" "));
      }
      if (e >= 0) {
        f.splice(e, 1);
        $("#_sense_hat_joystick_").attr("class", f.join(" "));
      }
      if (x >= 0) {
        h.splice(x, 1);
        $("#_sense_hat_back_").attr("class", h.join(" "));
      }
      if ($el < 0) {
        ret.push("hide");
        $("#astro-pi-enclosure").attr("class", ret.join(" "));
      }
      if (items < 0) {
        l.push("hide");
        $("#_astro_pi_back_").attr("class", l.join(" "));
      }
      setting.runtime("sense_hat_enclosure", "sense-hat");
      $("#enclosure-toggle").attr("src", "https://trinket-app-assets.trinket.io/sense-hat-v0/astro-pi-top.png");
    }
    showOptionsOverlay();
    draw();
    $("#sense_hat_enclosure").val(setting.runtime("sense_hat_enclosure")).trigger("change");
  }
  /**
   * @return {undefined}
   */
  function showOptionsOverlay() {
    var strip_width = $(".orientation-box").width();
    var _listItemHeight = $("#_sense_hat_").height();
    /** @type {string} */
    var transform = "rotateY(180deg)";
    $(".orientation-box").css({
      width : strip_width + "px",
      height : _listItemHeight + "px"
    });
    $(".orientation-front").css({
      width : strip_width + "px",
      height : _listItemHeight + "px"
    });
    if (setting.runtime("sense_hat_enclosure") !== "astro-pi") {
      /** @type {string} */
      transform = transform + " rotateZ(180deg)";
    }
    $(".orientation-back").css({
      width : strip_width + "px",
      height : _listItemHeight + "px",
      transform : transform,
      msTransform : transform
    });
  }
  /**
   * @return {undefined}
   */
  function draw() {
    if (me.sense_hat && me.sense_hat.pixels) {
      var s;
      var idx;
      var _;
      var f;
      /** @type {number} */
      var min = 47;
      /** @type {number} */
      var max = min;
      /** @type {number} */
      var next = 0.4;
      /** @type {number} */
      var j = 180;
      /** @type {number} */
      var BITS_PER_INT = 255;
      /** @type {number} */
      var a = 0;
      /** @type {number} */
      var pos = 0;
      /** @type {number} */
      var n = 0;
      /** @type {number} */
      var defaultTitleOpacity = 1;
      /** @type {number} */
      var destinationOpacity = 1;
      /** @type {number} */
      s = 0;
      for (; s < me.sense_hat.pixels.length; s++) {
        if (a = 0, pos = 0, n = 0, defaultTitleOpacity = 1, destinationOpacity = 1, idx = me.sense_hat.pixels[s], _ = setting.runtime("sense_hat_enclosure") && setting.runtime("sense_hat_enclosure") !== "sense-hat" && setting.runtime("usingSenseHat3d") ? "_astro_pi_led_" : "_sense_hat_led_", f = $("#" + _ + encode(s) + "_"), me.sense_hat.pixels[s] = [-8 & idx[0], -4 & idx[1], -8 & idx[2]], idx[0] > max || idx[1] > max || idx[2] > max ? (a = idx[0] > max ? (idx[0] / 255 * (BITS_PER_INT - j) + j) / 
        255 : next, pos = idx[1] > max ? (idx[1] / 255 * (BITS_PER_INT - j) + j) / 255 : next, n = idx[2] > max ? (idx[2] / 255 * (BITS_PER_INT - j) + j) / 255 : next, defaultTitleOpacity = 0, destinationOpacity = 1) : f.attr("filter", ""), !val && wasOn) {
          f.children(".rled").css({
            opacity : a
          });
          f.children(".gled").css({
            opacity : pos
          });
          f.children(".bled").css({
            opacity : n
          });
          f.children(".oled").css({
            opacity : defaultTitleOpacity
          });
          f.children(".kled").css({
            opacity : destinationOpacity
          });
        } else {
          var i;
          var y;
          var h;
          var defaultTitleOpacity;
          var destinationOpacity;
          var classesLine;
          /** @type {number} */
          i = parseInt(255 * a);
          /** @type {number} */
          y = parseInt(255 * pos);
          /** @type {number} */
          h = parseInt(255 * n);
          /** @type {string} */
          classesLine = "rgb(" + [i, y, h].join(",") + ")";
          if (i + y + h === 0) {
            /** @type {number} */
            defaultTitleOpacity = 0;
            /** @type {number} */
            destinationOpacity = 1;
          } else {
            /** @type {number} */
            defaultTitleOpacity = 1;
            /** @type {number} */
            destinationOpacity = 0;
          }
          f.children(".rled").css({
            opacity : 0
          });
          f.children(".gled").css({
            opacity : 0
          });
          f.children(".bled").css({
            opacity : 0
          });
          f.children(".oled").css({
            opacity : destinationOpacity
          });
          f.children(".kled").css({
            opacity : defaultTitleOpacity
          });
          f.children(".kled").attr("fill", classesLine);
        }
      }
    }
  }
  /**
   * @param {string} n
   * @return {?}
   */
  function encode(n) {
    return n.toString().length === 2 ? n : "0" + n;
  }
  /**
   * @return {undefined}
   */
  function showTypeDialog() {
    $("#sense-hat-enclosure").attr("class", "");
    $("#_sense_hat_leds_").attr("class", "leds");
    $("#_sense_hat_joystick_").attr("class", "joystick_states");
  }
  /**
   * @return {undefined}
   */
  function reset() {
    var target = $("#graphic-wrap").width();
    /** @type {number} */
    var x = target - 0.05 * target;
    var offset = $("#sense-hat-sensor-controls-container").height();
    var i = $("#orientation-overlay").height();
    /** @type {number} */
    var count = $("#graphic").height() - offset - i;
    if (setting.runtime("usingSenseHatFlat")) {
      /** @type {number} */
      var GRID_SPACE_SIZE = Math.floor(x / count);
      if (GRID_SPACE_SIZE > 1) {
        /** @type {number} */
        x = x / GRID_SPACE_SIZE;
      }
    }
    if ($(".orientation-stage").css({
      width : x + "px",
      height : count + "px"
    }), resizer && resizer.setup({
      axis : void 0,
      angle : void 0
    }), !setting.runtime("usingSenseHatFlat") && setting.runtime("sense_hat_enclosure") === "astro-pi") {
      /** @type {number} */
      var minDecimals = 200;
      /** @type {number} */
      var scale = 500;
      /** @type {number} */
      var p = Math.min(x, count);
      /** @type {number} */
      p = Math.min(Math.max(p, minDecimals), scale);
      $("#sensehat-node").css("font-size", p + "%");
      var computedValueAsString = $("#sensehat-node").css("font-size").replace("px", "");
      /** @type {number} */
      var tt_top = 0.7 * parseFloat(computedValueAsString);
      $("#_astro_pi_wrapper_").css("font-size", tt_top + "px");
    }
  }
  var inputel;
  var divel;
  var _$compass;
  var $cancel;
  var resizer;
  /** @type {!Array} */
  var props = ["pitch", "roll", "yaw", "rotation_matrix", "angle"];
  /** @type {number} */
  var x = props.length;
  var styles = me.getComputedStyle(document.documentElement, "");
  var scenarioTitle = (Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || styles.OLink === "" && ["", "o"])[1];
  if (scenarioTitle) {
    /** @type {string} */
    scenarioTitle = "-" + scenarioTitle + "-";
  }
  Geometry = {
    _Eps : 1e-5
  };
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {undefined}
   */
  Geometry.Vector = function(x, y, z) {
    /** @type {number} */
    this.x = x;
    /** @type {number} */
    this.y = y;
    /** @type {number} */
    this.z = z;
  };
  Geometry.Vector.prototype = {
    length : function() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },
    normalize : function() {
      var length = this.length();
      if (!(length <= Geometry._Eps)) {
        this.x /= length;
        this.y /= length;
        this.z /= length;
      }
    }
  };
  /**
   * @param {!Array} geoData
   * @return {?}
   */
  Geometry.transpose3x3Matrix = function(geoData) {
    /** @type {!Array} */
    var b = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    return b[0][0] = geoData[0][0], b[0][1] = geoData[1][0], b[0][2] = geoData[2][0], b[1][0] = geoData[0][1], b[1][1] = geoData[1][1], b[1][2] = geoData[2][1], b[2][0] = geoData[0][2], b[2][1] = geoData[1][2], b[2][2] = geoData[2][2], b;
  };
  /**
   * @param {!Array} a
   * @param {!Array} b
   * @return {?}
   */
  Geometry.dot3x3and3x1 = function(a, b) {
    /** @type {!Array} */
    var c = [];
    return c[0] = a[0][0] * b[0] + a[0][1] * b[1] + a[0][2] * b[2], c[1] = a[1][0] * b[0] + a[1][1] * b[1] + a[1][2] * b[2], c[2] = a[2][0] * b[0] + a[2][1] * b[1] + a[2][2] * b[2], c;
  };
  /**
   * @param {!Array} a
   * @param {number} f
   * @return {?}
   */
  Geometry.multiplyArrayWithScalar = function(a, f) {
    return [a[0] * f, a[1] * f, a[2] * f];
  };
  /**
   * @param {!Array} a
   * @param {number} b
   * @return {?}
   */
  Geometry.divideArrayWithScalar = function(a, b) {
    return [a[0] / b, a[1] / b, a[2] / b];
  };
  Geometry.Defaults = {};
  /** @type {!Array} */
  Geometry.Defaults.O = [0, 0, 0];
  /** @type {!Array} */
  Geometry.Defaults.X = [1, 0, 0];
  /** @type {!Array} */
  Geometry.Defaults.Y = [0, 1, 0];
  /** @type {!Array} */
  Geometry.Defaults.Z = [0, 0, 1];
  Geometry.Defaults.NORTH = Geometry.multiplyArrayWithScalar(Geometry.Defaults.X, 0.33);
  /** @type {!Array} */
  Geometry.Defaults.GRAVITY = Geometry.Defaults.Z;
  /**
   * @param {?} num
   * @param {number} value
   * @param {number} x
   * @return {?}
   */
  Geometry.clamp = function(num, value, x) {
    /** @type {number} */
    var index = Math.min(x, Math.max(value, num));
    return index;
  };
  /**
   * @param {!Object} value
   * @return {?}
   */
  Geometry.degToRad = function(value) {
    return $.isArray(value) ? [value[0] * Math.PI / 180, value[1] * Math.PI / 180, value[2] * Math.PI / 180] : value * Math.PI / 180;
  };
  /**
   * @param {number} val
   * @return {?}
   */
  Geometry.radToDeg = function(val) {
    return $.isArray(val) ? [180 * val[0] / Math.PI, 180 * val[1] / Math.PI, 180 * val[2] / Math.PI] : 180 * val / Math.PI;
  };
  /**
   * @return {?}
   */
  Image.prototype.asArray = function() {
    return [this.roll, this.pitch, this.yaw];
  };
  Modernizr.addTest("mixblendmode", function() {
    return Modernizr.testProp("mixBlendMode");
  });
  var wasOn = Modernizr.mixblendmode && Detectizr.os.name !== "linux";
  /** @type {boolean} */
  var val = Detectizr.browser.name === "firefox" && Detectizr.os.name == "windows";
  me.TrinketIO["export"]("python.sense-orientation", {
    initOrientation : run,
    updateRTIMU : render,
    randomGaussian : lightOpacity,
    updateStage : reset,
    initSenseHatEnclosure : showTypeDialog
  });
}(window, window.TrinketIO), function() {
  /**
   * @param {!Object} id
   * @return {?}
   */
  function l(id) {
    /** @type {(Array<string>|null)} */
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(id);
    return result ? {
      r : parseInt(result[1], 16),
      g : parseInt(result[2], 16),
      b : parseInt(result[3], 16)
    } : null;
  }
  /**
   * @param {!Object} b
   * @return {?}
   */
  function emit(b) {
    return typeof b !== "undefined" ? (b = l(b), [b.r, b.g, b.b, parseInt((b.r + b.g + b.b) / 3)]) : [0, 0, 0, 0];
  }
  /**
   * @return {undefined}
   */
  function update() {
    var gen6_i;
    var root;
    var stmt;
    var conid;
    /** @type {number} */
    gen6_i = 0;
    for (; readersLength > gen6_i; gen6_i++) {
      stmt = gen5_items[gen6_i];
      /** @type {string} */
      conid = "sense_hat_" + stmt;
      root = $("#" + conid).val();
      setup(root, {
        sensor : stmt,
        focus : false
      });
    }
    colour = $("#sense_hat_colour").val();
    window.sense_hat.colour = emit(colour);
    /** @type {number} */
    window.sense_hat.motion = $("#sense_hat_motion").is(":checked") ? 1 : 0;
  }
  /**
   * @return {undefined}
   */
  function setIntervalVersion() {
    if (logIntervalId) {
      clearInterval(logIntervalId);
    }
    logIntervalId = window.setInterval(global.updateRTIMU, 16);
  }
  /**
   * @return {undefined}
   */
  function init() {
    var text_remaining;
    var gen6_i;
    var name;
    var h;
    /** @type {number} */
    gen6_i = 0;
    for (; readersLength > gen6_i; gen6_i++) {
      name = gen5_items[gen6_i];
      /** @type {string} */
      h = "sense_hat_" + name;
      if (typeof TrinketIO.runtime(h) !== "undefined") {
        $("#" + h).val(TrinketIO.runtime(h));
        TrinketIO.runtime(h, void 0);
      }
      foundLanguages[name] = {
        $slider : $("#" + h + "[data-rangeslider]")
      };
      foundLanguages[name].$slider.rangeslider({
        polyfill : false,
        onInit : function() {
          var sensor = this.$element[0].id.replace("sense_hat_", "");
          setup(this.value, {
            sensor : sensor,
            focus : false
          });
        },
        onSlideEnd : function() {
          focus();
        }
      }).on("input", function() {
        var sensor = this.id.replace("sense_hat_", "");
        setup(this.value, {
          sensor : sensor,
          focus : true
        });
      });
    }
    $("#sense_hat_colour").on("change", function() {
      var val = this.value;
      window.sense_hat.colour = emit(val);
    });
    $("#sense_hat_motion").on("change", function() {
      /** @type {number} */
      window.sense_hat.motion = $("#sense_hat_motion").is(":checked") ? 1 : 0;
    });
    /** @type {number} */
    _takingTooLongTimeout = setTimeout(function() {
      update();
      /** @type {number} */
      timer = setInterval(update, 250);
    }, 1500);
    if (!TrinketIO.runtime("usingSenseHat3d")) {
      if (typeof TrinketIO.runtime("sense_hat_angle") !== "undefined") {
        angle = TrinketIO.runtime("sense_hat_angle");
        TrinketIO.runtime("sense_hat_angle", void 0);
      } else {
        if (typeof angle === "undefined") {
          /** @type {number} */
          angle = 0;
        }
      }
      /** @type {number} */
      text_remaining = Math.abs(angle % 360);
      $("#sense_hat_angle").data("skip-trigger", true);
      $("#sense-hat-display-angle").html(text_remaining + "&deg;");
      if (angle > 0) {
        /** @type {number} */
        angle = angle * -1;
      }
      $("#sense_hat_angle").val(angle).trigger("change");
    }
    colour = $("#sense_hat_colour").val();
    window.sense_hat.colour = emit(colour);
    /** @type {number} */
    window.sense_hat.motion = $("#sense_hat_motion").is(":checked") ? 1 : 0;
  }
  /**
   * @return {undefined}
   */
  function normalize() {
    TrinketIO.runtime("sense_hat_enclosure", "astro-pi");
    TrinketIO.runtime("sense_hat_yaw", 180);
    TrinketIO.runtime("missionZero", true);
  }
  /**
   * @param {!Array} settings
   * @return {undefined}
   */
  function initialize(settings) {
    var gen6_i;
    var name;
    var id;
    var value;
    var f;
    /** @type {number} */
    gen6_i = 0;
    for (; readersLength > gen6_i; gen6_i++) {
      name = gen5_items[gen6_i];
      /** @type {string} */
      id = "sense_hat_" + name;
      /** @type {boolean} */
      f = $("#" + id).length ? true : false;
      if (f) {
        $("#" + id).data("skip-trigger", true);
      }
      if (typeof settings[id] !== "undefined") {
        value = settings[id];
      } else {
        if (f) {
          value = $("#" + id).prop("defaultValue");
        }
      }
      if (foundLanguages[name]) {
        foundLanguages[name].$slider.val(value).change();
      }
    }
  }
  /**
   * @return {undefined}
   */
  function next() {
    var gen6_i;
    var name;
    /** @type {number} */
    gen6_i = 0;
    for (; readersLength > gen6_i; gen6_i++) {
      name = gen5_items[gen6_i];
      foundLanguages[name].$slider.rangeslider("update", false, false);
    }
    global.updateStage();
  }
  /**
   * @return {undefined}
   */
  function Slick() {
    var gen6_i;
    var name;
    /** @type {number} */
    gen6_i = 0;
    for (; readersLength > gen6_i; gen6_i++) {
      name = gen5_items[gen6_i];
      if (Object.hasOwnProperty(foundLanguages, name)) {
        foundLanguages[name].$slider.rangeslider("destroy");
      }
    }
  }
  /**
   * @param {!Object} a
   * @return {?}
   */
  function findFileOrigin(a) {
    /** @type {boolean} */
    var x = false;
    return _.map(a, function(val, pathToDestinationFile) {
      if (/\.py$/.test(pathToDestinationFile) && (/import\s*sense_hat/.test(val) || /from\s*sense_hat\s*import/.test(val))) {
        /** @type {boolean} */
        x = true;
      }
    }), x;
  }
  /**
   * @return {undefined}
   */
  function addAttribute() {
    TrinketIO.runtime("downloadExtra", wrapper);
  }
  /**
   * @return {undefined}
   */
  function omniboxClear() {
    if (_takingTooLongTimeout) {
      clearTimeout(_takingTooLongTimeout);
    }
    if (timer) {
      clearInterval(timer);
    }
    if (logIntervalId) {
      clearInterval(logIntervalId);
    }
  }
  /**
   * @return {undefined}
   */
  function read() {
    next();
  }
  /**
   * @param {number} i
   * @param {!Object} obj
   * @return {undefined}
   */
  function setup(i, obj) {
    var d;
    var y;
    /** @type {boolean} */
    var e = !isNaN(parseFloat(i)) && isFinite(i);
    if (e) {
      switch(i = Number(parseFloat(i).toFixed(2)), obj.sensor) {
        case "temperature":
          switch(d = "&deg; C", true) {
            case i >= 15 && i <= 40:
              /** @type {number} */
              y = 0.5;
              break;
            case i >= 0 && i <= 60:
              /** @type {number} */
              y = 1;
              break;
            default:
              /** @type {number} */
              y = 2;
          }break;
        case "pressure":
          /** @type {string} */
          d = "hPa";
          /** @type {number} */
          y = 0.1;
          break;
        case "humidity":
          /** @type {string} */
          d = "%";
          /** @type {number} */
          y = i >= 20 && i <= 80 ? 3.5 : 5;
      }
      /** @type {number} */
      y = y / 3;
      /** @type {!Array} */
      window.sense_hat.rtimu[obj.sensor] = [1, global.randomGaussian(i, y)];
      $(".sense-hat-" + obj.sensor).html(i + d);
    } else {
      /** @type {!Array} */
      window.sense_hat.rtimu[obj.sensor] = [0, -1];
    }
    if (Sk.sense_hat && Sk.sense_hat.rtimu) {
      Sk.sense_hat.rtimu[obj.sensor] = window.sense_hat.rtimu[obj.sensor];
    }
    if (obj.focus) {
      focus();
    }
  }
  /**
   * @param {string} n
   * @return {?}
   */
  function padLeft(n) {
    return n.toString().length === 2 ? n : "0" + n;
  }
  /**
   * @param {number} value
   * @return {undefined}
   */
  function focus(value) {
    if (typeof value !== "undefined" && (text = value), text) {
      var roundedTop = $("#graphic-wrap").scrollTop();
      $("#sense-hat-listener").focus();
      if (roundedTop) {
        $("#graphic-wrap").scrollTop(roundedTop);
      }
    }
  }
  /**
   * @param {?} text
   * @param {?} offset
   * @param {number} length
   * @return {undefined}
   */
  function send(text, offset, length) {
    text.rotateOnWorldAxis(offset, length);
  }
  /**
   * @param {!Event} event
   * @return {undefined}
   */
  function complete(event) {
    if (!($("#canvas:hover").length <= 0)) {
      /** @type {number} */
      S = event.clientX - off_x;
      /** @type {number} */
      B = 25e-5 * (S - n0);
      /** @type {number} */
      U = event.clientY - off_y;
      /** @type {number} */
      A = 25e-5 * (U - invResolutionW);
      if (N) {
        send(window.mod, new THREE.Vector3(0, 1, 0), B);
        send(window.mod, new THREE.Vector3(1, 0, 0), A);
        if (window.callback_move != null) {
          window.callback_move(window.mod.rotation.x, window.mod.rotation.y, window.mod.rotation.y);
        }
        /** @type {number} */
        A = A * (1 - coeff);
        /** @type {number} */
        B = B * (1 - coeff);
        renderer.render(window.scene, window.camera);
      }
    }
  }
  /**
   * @param {number} b
   * @param {number} rect
   * @param {number} options
   * @param {number} cb0
   * @return {undefined}
   */
  function callback(b, rect, options, cb0) {
    if (window.mod != null) {
      /** @type {number} */
      var col2 = b % 8;
      /** @type {number} */
      var j = Math.floor(b / 8);
      var selectedMaterial = new THREE.MeshStandardMaterial({
        color : "rgb(" + rect + "," + options + "," + cb0 + ")"
      });
      var cube = window.mod.getObjectByName("circle" + col2 + "_" + (7 - j) + "-1");
      if (cube != null) {
        cube.material = selectedMaterial;
      }
      renderer.render(window.scene, window.camera);
    }
  }
  /**
   * @param {!Array} a
   * @param {!NodeList} sep
   * @return {undefined}
   */
  function add(a, sep) {
    if (window.mod != null) {
      if (a == null) {
        /** @type {!Array<?>} */
        a = Array.from(Array(64).keys());
      }
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var $orderCol = 0;
      for (; i < a.length; $orderCol++) {
        /** @type {number} */
        var key = a[$orderCol] % 8;
        /** @type {number} */
        var j = Math.floor(a[$orderCol] / 8);
        var selectedMaterial = new THREE.MeshStandardMaterial({
          color : "rgb(" + sep[i][0] + "," + sep[i][1] + "," + sep[i][2] + ")"
        });
        var cube = window.mod.getObjectByName("circle" + key + "_" + (7 - j) + "-1");
        if (cube != null) {
          cube.material = selectedMaterial;
        }
        /** @type {number} */
        i = i + 1;
      }
      renderer.render(window.scene, window.camera);
    }
  }
  Modernizr.addTest("mixblendmode", function() {
    return Modernizr.testProp("mixBlendMode");
  });
  var u = Modernizr.mixblendmode && Detectizr.os.name !== "linux";
  /** @type {boolean} */
  var user = Detectizr.browser.name === "firefox" && Detectizr.os.name == "windows" || Detectizr.browser.name === "safari";
  var w = TrinketIO["import"]("python.sense-stick");
  var global = TrinketIO["import"]("python.sense-orientation");
  /** @type {string} */
  var wrapper = "https://trinket-app-assets.trinket.io/sense-hat/v2.2.0.zip";
  /** @type {boolean} */
  var text = false;
  window.sense_hat = {
    colour : [0, 0, 0, 0],
    motion : 0,
    rtimu : {
      temperature : [1, $("#sense_hat_temperature").val()],
      humidity : [1, $("#sense_hat_humidity").val()],
      pressure : [1, $("#sense_hat_pressure").val()],
      gyro : [0, 0, 0],
      accel : [0, 0, 1],
      compass : [0, 0, 0],
      fusionPose : [0, 0, 0],
      raw_orientation : [0, 0, 0],
      raw_old_orientation : [0, 0, 0]
    },
    sensestick : new w.SenseStickDevice
  };
  /** @type {boolean} */
  window.Sk_interrupt = false;
  var angle;
  var _takingTooLongTimeout;
  var timer;
  var logIntervalId;
  var d;
  /** @type {number} */
  var a = 8;
  /** @type {number} */
  var L = 47;
  /** @type {number} */
  var command = L;
  /**
   * @param {string} m
   * @param {?} b
   * @return {undefined}
   */
  var render = function(m, b) {
    var c;
    var i;
    var _;
    var categorydiv;
    /** @type {number} */
    var pos = 0;
    /** @type {number} */
    var a = 0;
    /** @type {number} */
    var val = 0;
    /** @type {number} */
    var destinationOpacity = 1;
    /** @type {number} */
    var completeTitleOpacity = 1;
    if (m && m === "setpixel") {
      if (c = b, i = window.sense_hat.pixels[c], _ = TrinketIO.runtime("sense_hat_enclosure") && TrinketIO.runtime("sense_hat_enclosure") !== "sense-hat" && TrinketIO.runtime("usingSenseHat3d") ? "_astro_pi_led_" : "_sense_hat_led_", categorydiv = $("#" + _ + padLeft(c) + "_"), window.sense_hat.pixels[c] = [-8 & i[0], -4 & i[1], -8 & i[2]], callback(c, parseInt(255 * i[0]), parseInt(255 * i[1]), parseInt(255 * i[2])), !user && u) {
        categorydiv.children(".rled").css({
          opacity : pos
        });
        categorydiv.children(".gled").css({
          opacity : a
        });
        categorydiv.children(".bled").css({
          opacity : val
        });
        categorydiv.children(".oled").css({
          opacity : destinationOpacity
        });
        categorydiv.children(".kled").css({
          opacity : completeTitleOpacity
        });
      } else {
        var userId;
        var sessionId;
        var status;
        var destinationOpacity;
        var completeTitleOpacity;
        var classesLine;
        /** @type {number} */
        userId = parseInt(255 * pos);
        /** @type {number} */
        sessionId = parseInt(255 * a);
        /** @type {number} */
        status = parseInt(255 * val);
        /** @type {string} */
        classesLine = "rgb(" + [userId, sessionId, status].join(",") + ")";
        if (userId + sessionId + status === 0) {
          /** @type {number} */
          destinationOpacity = 0;
          /** @type {number} */
          completeTitleOpacity = 1;
        } else {
          /** @type {number} */
          destinationOpacity = 1;
          /** @type {number} */
          completeTitleOpacity = 0;
        }
        categorydiv.children(".rled").css({
          opacity : 0
        });
        categorydiv.children(".gled").css({
          opacity : 0
        });
        categorydiv.children(".bled").css({
          opacity : 0
        });
        categorydiv.children(".oled").css({
          opacity : completeTitleOpacity
        });
        categorydiv.children(".kled").css({
          opacity : destinationOpacity
        });
        categorydiv.children(".kled").attr("fill", classesLine);
      }
    } else {
      if (m && m === "changeLowlight") {
        /** @type {number} */
        command = b === true ? a : L;
      } else {
        if (m && m === "setpixels") {
          add(b, window.sense_hat.pixels);
        }
      }
    }
  };
  /** @type {!Array} */
  var gen5_items = ["temperature", "pressure", "humidity"];
  /** @type {number} */
  var readersLength = gen5_items.length;
  var foundLanguages = {};
  /** @type {boolean} */
  var M = false;
  /**
   * @return {undefined}
   */
  window.onresize = function() {
    if (TrinketIO.runtime("usingSenseHat")) {
      clearTimeout(d);
      /** @type {number} */
      d = setTimeout(read, 500);
    }
  };
  $(document).on("click", ".exit-off-canvas", function() {
    if (TrinketIO.runtime("usingSenseHat")) {
      setTimeout(function() {
        next();
      }, 500);
    }
  });
  $(document).on("click.sense-hat-focus", "#graphic", function() {
    focus(true);
  });
  $(document).on("click", "#sense-hat-info-button", function(event) {
    event.preventDefault();
    $("#sense-hat-info-button").addClass("hide");
    $("#sense-hat-info").removeClass("hide");
    $("#sense-hat-rotate-container").addClass("hide");
  });
  $(document).on("click", "#sense-hat-info-close", function(event) {
    event.preventDefault();
    $("#sense-hat-info").addClass("hide");
    $("#sense-hat-info-button").removeClass("hide");
    $("#sense-hat-rotate-container").removeClass("hide");
  });
  $(document).on("click", "#sense-hat-rotate-button", function(a) {
    if (!M) {
      /** @type {number} */
      var endAngle = angle - 90;
      /** @type {number} */
      var newFieldValue = Math.abs(endAngle % 360);
      /** @type {number} */
      var d = 0;
      /** @type {boolean} */
      M = true;
      $({
        deg : angle
      }).animate({
        deg : endAngle
      }, {
        duration : 350,
        step : function(framesToGo) {
        },
        complete : function() {
          /** @type {number} */
          angle = endAngle;
          $("#sense_hat_angle").val(newFieldValue).trigger("change");
          $("#sense-hat-display-angle").html(newFieldValue + "&deg;");
          /** @type {boolean} */
          M = false;
          if (newFieldValue === 270) {
            /** @type {string} */
            d = "10%";
          }
        }
      });
    }
  });
  $("#graphic-wrap").scroll(function() {
    if (TrinketIO.runtime("usingSenseHat")) {
      var contSize = $(this).scrollTop();
      /** @type {string} */
      var marginSize = -contSize + "px";
      $("#sense-hat-info-button").css({
        bottom : marginSize
      });
      $("#sense-hat-info").css({
        bottom : marginSize
      });
      $("#sense-hat-rotate-container").css({
        bottom : marginSize
      });
    }
  });
  /** @type {boolean} */
  var N = false;
  /** @type {number} */
  var B = 0.5;
  /** @type {number} */
  var op = 0;
  /** @type {number} */
  var A = 0.2;
  /** @type {number} */
  var className = 0;
  /** @type {number} */
  var S = 0;
  /** @type {number} */
  var n0 = 0;
  /** @type {number} */
  var U = 0;
  /** @type {number} */
  var invResolutionW = 0;
  /** @type {number} */
  var off_x = window.innerWidth / 2;
  /** @type {number} */
  var off_y = window.innerHeight / 2;
  /** @type {number} */
  var coeff = 0.25;
  /**
   * @param {?} context
   * @return {?}
   */
  window.init3D = function(context) {
    return new Promise(function(e, canCreateDiscussions) {
      /** @type {number} */
      var SCREEN_WIDTH = 500;
      /** @type {number} */
      var SCREEN_HEIGHT = 500;
      /** @type {null} */
      window.callback_move = null;
      /**
       * @param {!Function} ydui
       * @return {undefined}
       */
      window.set_onrotate = function(ydui) {
        /** @type {!Function} */
        window.callback_move = ydui;
      };
      window.camera = new THREE.PerspectiveCamera(70, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1e3);
      /** @type {number} */
      camera.position.y = 0;
      /** @type {number} */
      camera.position.x = 0;
      /** @type {number} */
      camera.position.z = 400;
      window.renderer = new THREE.WebGLRenderer({
        antialias : true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      /** @type {number} */
      renderer.toneMappingExposure = 1;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.setClearColor(12961219);
      window.scene = new THREE.Scene;
      scene.background = new THREE.Color(262119327);
      var width = new THREE.RoomEnvironment;
      var composer = new THREE.PMREMGenerator(renderer);
      scene.environment = composer.fromScene(width).texture;
      scene.add(camera);
      var object = new THREE.GridHelper(500, 10, 16777215, 16777215);
      /** @type {number} */
      object.material.opacity = 0.5;
      /** @type {boolean} */
      object.material.depthWrite = false;
      /** @type {boolean} */
      object.material.transparent = true;
      var controls = new THREE.OrbitControls(camera, renderer.domElement);
      /** @type {boolean} */
      controls.enableRotate = false;
      /** @type {boolean} */
      controls.enablePan = false;
      /** @type {boolean} */
      controls.enableZoom = false;
      /** @type {boolean} */
      controls.enabled = false;
      var connectorsFromArgs = new THREE.GLTFLoader;
      var connectorName = new THREE.DRACOLoader;
      connectorName.setDecoderPath(trinketConfig.prefix("/js/three/examples/js/libs/draco/"));
      connectorsFromArgs.setDRACOLoader(connectorName);
      connectorsFromArgs.load(trinketConfig.prefix("/models/raspi-compressed.glb"), function(app) {
        app.scene.scale.set(2e3, 2e3, 2e3);
        scene.add(app.scene);
        window.mod = app.scene;
        new THREE.MeshStandardMaterial({
          color : 16711680
        });
        window.mod.translateY(100);
        window.mod.rotateX(1.5708);
        window.mod.rotateY(0);
        window.mod.rotateZ(0);
        renderer.render(window.scene, window.camera);
        document.addEventListener("pointerup", function(a) {
          if (!($("#canvas:hover").length <= 0)) {
            /** @type {boolean} */
            N = false;
          }
        });
        document.addEventListener("pointerdown", function(event) {
          if (!($("#canvas:hover").length <= 0)) {
            /** @type {boolean} */
            N = true;
            /** @type {number} */
            n0 = event.clientX - off_x;
            op = B;
            /** @type {number} */
            invResolutionW = event.clientY - off_y;
            className = A;
          }
        });
        document.addEventListener("pointermove", complete);
        /** @type {boolean} */
        window.finished3D = true;
        /**
         * @param {number} a
         * @param {number} b
         * @param {number} n
         * @return {undefined}
         */
        window.rotatemodel = function(a, b, n) {
          /** @type {number} */
          window.mod.rotation.x = a;
          /** @type {number} */
          window.mod.rotation.y = b;
          /** @type {number} */
          window.mod.rotation.z = n;
          renderer.render(window.scene, window.camera);
        };
        e(context);
      });
    });
  };
  window.TrinketIO["export"]("python.sense-hat", {
    sense_hat_emit : render,
    focus : focus,
    initSensors : init,
    initIMU : setIntervalVersion,
    destroySliders : Slick,
    updateSliders : next,
    resetSensors : initialize,
    usingSenseHat : findFileOrigin,
    addSrc : addAttribute,
    stopSenseHat : omniboxClear,
    initMissionZero : normalize
  });
}(), function(exports, $) {
  /**
   * @param {!Object} options
   * @param {!Object} obj
   * @param {string} s
   * @param {string} t
   * @param {boolean} b
   * @param {boolean} h
   * @return {?}
   */
  function run(options, obj, s, t, b, h) {
    var key;
    var thisArg;
    var args;
    var message;
    if (obj && !obj.complete) {
      /** @type {boolean} */
      obj.stop = true;
    }
    var timelimit = {
      print_function : false,
      division : true,
      absolute_import : null,
      unicode_literals : true,
      set_repr : true,
      class_repr : true,
      inherit_from_object : true,
      super_args : true,
      octal_number_literal : true,
      bankers_rounding : true,
      python_version : true,
      dunder_next : true,
      dunder_round : true,
      exceptions : true,
      no_long_type : true,
      ceil_floor_int : true,
      l_suffix : false,
      silent_octal_literal : false
    };
    var q = {
      print_function : false,
      division : false,
      absolute_import : null,
      unicode_literals : false,
      set_repr : false,
      class_repr : false,
      inherit_from_object : false,
      super_args : false,
      octal_number_literal : false,
      bankers_rounding : false,
      python_version : false,
      dunder_next : false,
      dunder_round : false,
      exceptions : false,
      no_long_type : false,
      ceil_floor_int : false,
      l_suffix : true,
      silent_octal_literal : true
    };
    var saveSk = {
      print_function : true,
      division : true,
      absolute_import : null,
      unicode_literals : true,
      set_repr : true,
      class_repr : true,
      inherit_from_object : true,
      super_args : true,
      octal_number_literal : true,
      bankers_rounding : true,
      python_version : true,
      dunder_next : true,
      dunder_round : true,
      exceptions : true,
      no_long_type : true,
      ceil_floor_int : true,
      l_suffix : false,
      silent_octal_literal : false
    };
    t = t.replace(/\r(?!\n)/gm, "\r\n");
    var d = t.match(/^\s*#!.*?python(\d)/i);
    var u = t.match(/^\s*#\s*python\s*[=:]?\s*(\d)/i);
    if (u) {
      /** @type {({absolute_import: null, bankers_rounding: boolean, ceil_floor_int: boolean, class_repr: boolean, division: boolean, dunder_next: boolean, dunder_round: boolean, exceptions: boolean, inherit_from_object: boolean, l_suffix: boolean, no_long_type: boolean, octal_number_literal: boolean, print_function: boolean, python_version: boolean, set_repr: boolean, silent_octal_literal: boolean, super_args: boolean, unicode_literals: boolean})} */
      Sk.__future__ = u[1] === "2" ? q : timelimit;
    } else {
      if (d) {
        /** @type {({absolute_import: null, bankers_rounding: boolean, ceil_floor_int: boolean, class_repr: boolean, division: boolean, dunder_next: boolean, dunder_round: boolean, exceptions: boolean, inherit_from_object: boolean, l_suffix: boolean, no_long_type: boolean, octal_number_literal: boolean, print_function: boolean, python_version: boolean, set_repr: boolean, silent_octal_literal: boolean, super_args: boolean, unicode_literals: boolean})} */
        Sk.__future__ = d[1] === "3" ? saveSk : q;
      } else {
        Sk.__future__ = timelimit;
      }
    }
    if (exports.runtime("missionZero")) {
      Sk.__future__ = saveSk;
    }
    /**
     * @param {!Object} item
     * @return {undefined}
     */
    var run = function(item) {
      var idx;
      var s = select(item.toString());
      if (item.traceback && item.traceback.length) {
        /** @type {number} */
        idx = 0;
        for (; idx < item.traceback.length; idx++) {
          if (options.userFiles && typeof options.userFiles[item.traceback[idx].filename] !== "undefined") {
            item.filename = item.traceback[idx].filename;
            item.lineno = item.traceback[idx].lineno;
          }
        }
        if (typeof item.filename === "undefined") {
          item.traceback = item.traceback.filter(function(decoded_value) {
            return typeof decoded_value.filename !== "undefined" && decoded_value.filename === "main.py";
          });
          if (item.traceback[0]) {
            item.filename = item.traceback[0].filename;
            item.lineno = item.traceback[0].lineno;
          }
        }
      }
      if (options.includeFileInErrors && item.filename && (s = s.replace(/on line \d+/, "on line " + item.lineno), s = s + " in " + item.filename.replace(/^\.\//, "")), /^ImportError: No module named/.test(s) && (s = s + ". You can find a list of available modules at <a href='/docs/python' class='text-link' target='_blank'>docs/python</a>."), options.evalMode === "repl") {
        /** @type {string} */
        s = s + "\n";
        /** @type {number} */
        var e = -1;
        if ((e = item.toString().indexOf("on line")) !== -1) {
          /** @type {number} */
          e = parseInt(item.toString().substr(e + 8), 10);
        }
        /** @type {number} */
        var PLACEHOLDER_ELEMENT = 0;
        s = s + (thisArg ? "1>: " + args[0].substr(prefix.length) : args.map(function(a) {
          return ++PLACEHOLDER_ELEMENT + (e === PLACEHOLDER_ELEMENT ? ">" : " ") + ": " + a;
        }).join("\n"));
      }
      options.error(s, item);
      if (h && typeof h === "function") {
        h(s, item);
      }
    };
    if (Sk.configure({
      inputfun : options.inputfun,
      __future__ : Sk.__future__,
      retainglobals : options.evalMode === "repl",
      output : s,
      read : function(id) {
        return options.read(id, Sk.builtinFiles.files || {}, options.userFiles || {});
      },
      write : function() {
      },
      nonreadopen : true,
      fileopen : Event,
      filewrite : onload,
      imageProxy : options.imageProxy || "",
      uncaughtException : run,
      signals : true,
      killableWhile : r,
      killableFor : false
    }), options.suspensionHandler = {
      "*" : function() {
        if (window.Sk_interrupt === true) {
          throw new Error("interrupt");
        }
        return null;
      }
    }, Sk.externalLibraries || (Sk.externalLibraries = {}), $.extend(Sk.externalLibraries, options.externalLibraries), options.allowGraphics && (Sk.availableWidth = options.graphicsWidth(), Sk.availableHeight = options.graphicsHeight()), Sk.domOutput = function(popupWrapper) {
      return $(options.graphicsTarget()).append(popupWrapper).children().last();
    }, Sk.onBeforeImport = function(name) {
      return Sk.misceval.chain(name, function() {
        return reBlockName.test(name) ? options.allowGraphics ? void 0 !== key && key !== name && (!props[key] || props[key].indexOf(name) < 0) ? "You may only use a single graphics library at a time and the " + key + " library is already in use." : (typeof options.onGraphicsInit === "function" && options.onGraphicsInit(), Sk.misceval.promiseToSuspension(Promise.resolve(options.graphicsSetup[name](options, $(options.graphicsTarget()))).then(function() {
          /** @type {string} */
          key = name;
        }))) : "Graphics libraries are not allowed" : void 0;
      }, function(b) {
        return b || (options.onBeforeImport ? options.onBeforeImport(name) : void 0);
      });
    }, options.onAfterImport && (Sk.onAfterImport = options.onAfterImport), options.evalMode === "repl") {
      if (args = t.split("\n").filter(function(word) {
        return !startQuoteRegExp.test(word);
      }), thisArg = args.length === 1 || /"""/.test(args[0]) && /"""/.test(args[args.length - 1]), thisArg && !OBJECT_REG.test(args[0]) && !OBJECT_REG_NG.test(args[0]) && !wru.test(args[0]) && args[0].length > 0 && (rchecked.test(args[0]) || rnocache.test(args[0]) || (args.unshift(prefix + args.shift()), args.push("if not evaluationresult == None: print evaluationresult"))), args = args.filter(function(word) {
        return !startQuoteRegExp.test(word);
      }), args.length === 0) {
        return;
      }
      t = args.join("\n");
    }
    return {
      code : t,
      lines : args,
      oneLiner : thisArg,
      errorMessage : message,
      handleError : run
    };
  }
  /**
   * @param {string} name
   * @return {?}
   */
  function add(name) {
    var options;
    var type;
    if (options = Sk.externalLibraries && Sk.externalLibraries[name], !options) {
      return Promise.resolve();
    }
    if (type = typeof options === "string" ? options : options.path, typeof type !== "string") {
      throw new Sk.builtin.ImportError("Invalid path specified for " + name);
    }
    return load(type, false).then(function(canCreateDiscussions) {
      /**
       * @param {!Object} deps
       * @return {?}
       */
      function fn(deps) {
        return load(deps, true);
      }
      if (!canCreateDiscussions) {
        throw new Sk.builtin.ImportError("Failed to load remote module '" + name + "'");
      }
      var loadPropPromise;
      return loadPropPromise = options.loadDepsSynchronously ? Promise.map(options.dependencies || [], fn, {
        concurrency : 1
      }) : Promise.all((options.dependencies || []).map(fn)), loadPropPromise.then(function() {
        return canCreateDiscussions;
      })["catch"](function() {
        throw new Sk.builtin.ImportError("Failed to load dependencies required for " + name);
      });
    });
  }
  /**
   * @param {!Object} name
   * @param {boolean} prefixAgnostic
   * @return {?}
   */
  function load(name, prefixAgnostic) {
    return (new Promise(function(callback, finallyCallback) {
      if (model_data_store[name]) {
        return callback(model_data_store[name]);
      }
      var script;
      var xhr;
      if (name == null) {
        finallyCallback();
      }
      if (prefixAgnostic) {
        /** @type {!Element} */
        script = document.createElement("script");
        /** @type {string} */
        script.type = "text/javascript";
        /** @type {!Object} */
        script.src = name;
        /** @type {boolean} */
        script.async = true;
        /**
         * @return {undefined}
         */
        script.onload = function() {
          callback(true);
        };
        document.body.appendChild(script);
      } else {
        /** @type {!XMLHttpRequest} */
        xhr = new XMLHttpRequest;
        xhr.open("GET", name);
        /**
         * @return {undefined}
         */
        xhr.onload = function() {
          if (xhr.status === 200) {
            callback(xhr.responseText);
          } else {
            finallyCallback();
          }
        };
        /**
         * @return {undefined}
         */
        xhr.onerror = function() {
          finallyCallback();
        };
        xhr.send();
      }
    })).then(function(data) {
      return model_data_store[name] = data, data;
    });
  }
  /**
   * @param {string} id
   * @return {undefined}
   */
  function render(id) {
    var area = $("#console-output");
    area.removeClass("hide");
    area.html(area.html() + id);
  }
  /**
   * @param {string} text
   * @param {!Object} options
   * @return {undefined}
   */
  function start(text, options) {
    var triggerRes;
    /** @type {string} */
    var nodeType = "code-error";
    if (options instanceof Sk.builtin.ExternalError && (options = options.nativeError), options && options.type === "validation" && (nodeType = "info", text = options.message), !(options && options.message === "interrupt" || text && /\b(?:SystemExit|KeyboardInterrupt)\b/.test(text))) {
      triggerRes = trigger("statusMessageTemplate", {
        type : nodeType,
        message : text
      });
      var $mnu = $(triggerRes);
      $("body").append($mnu);
      $("body").addClass("has-status-bar");
      $mnu.parent().foundation().trigger("open.fndtn.alert");
    }
  }
  /**
   * @param {string} i
   * @param {!Object} b
   * @param {!Object} a
   * @return {?}
   */
  function all(i, b, a) {
    return Sk.misceval.promiseToSuspension(add(i).then(function(all) {
      if (all) {
        return all;
      }
      var breaker = a[i] || b[i];
      if (void 0 === breaker) {
        throw "File not found: '" + i + "'";
      }
      return breaker;
    }));
  }
  /**
   * @param {!Object} a
   * @return {undefined}
   */
  function Event(a) {
    /** @type {(Event|null)} */
    var event = document.createEvent("Event");
    /** @type {string} */
    event.data = a.mode.v + ":" + a.name;
    event.initEvent("SkfileOpen", true, true);
    document.dispatchEvent(event);
  }
  /**
   * @param {!Object} blob
   * @param {!Object} response
   * @return {undefined}
   */
  function onload(blob, response) {
    /** @type {(Event|null)} */
    var event = document.createEvent("Event");
    /** @type {string} */
    event.data = blob.name + ":" + response.v;
    event.initEvent("SkfileWrite", true, true);
    document.dispatchEvent(event);
  }
  /**
   * @param {string} selector
   * @return {?}
   */
  function select(selector) {
    return selector.replace(/[&<>]/g, function(name) {
      return __aliases[name] || name;
    });
  }
  var i;
  var categories;
  var trigger = exports["import"]("utils.template");
  var o = exports["import"]("python.sense-hat");
  var p = exports["import"]("python.sense-stick");
  var blocks = exports["import"]("python.sense-orientation");
  var type = Detectizr.browser.name;
  /** @type {string} */
  var name = type + ":" + Detectizr.os.name;
  /** @type {boolean} */
  var r = type === "midori" || type === "iceweasel" || type === "epiphany" ? false : true;
  /** @type {number} */
  var l = parseInt(Detectizr.browser.version);
  /** @type {string} */
  var template = type + "-gte-3d";
  /** @type {number} */
  var undefined = 400;
  /**
   * @param {!Object} _
   * @param {!Object} o
   * @return {undefined}
   */
  var update = function(_, o) {
    /**
     * @return {undefined}
     */
    function tryParseQRCode() {
      if ($("#_sense_hat_").height() === 0) {
        setTimeout(tryParseQRCode, 250);
      } else {
        var paneWidth = $("#_sense_hat_").height();
        /** @type {number} */
        GRID_SPACE_SIZE = Math.floor(x / paneWidth);
        if (GRID_SPACE_SIZE > 1) {
          /** @type {number} */
          x = x / GRID_SPACE_SIZE;
        }
        $(".orientation-box").css({
          width : x + "px",
          height : paneWidth + "px"
        });
        $(".orientation-front").css({
          width : x + "px",
          height : paneWidth + "px"
        });
        $(".orientation-back").css({
          width : x + "px",
          height : paneWidth + "px",
          transform : "rotateY(180deg) rotateZ(180deg)",
          msTransform : "rotateY(180deg) rotateZ(180deg)"
        });
      }
    }
    var length;
    o.html(i);
    o.css({
      height : "100%"
    });
    var target = $("#graphic-wrap").width();
    /** @type {number} */
    var x = target - 0.05 * target;
    try {
      length = $("#sense-hat-enclosure").get(0).getBBox().height;
    } catch (i) {
      /** @type {number} */
      length = undefined;
    }
    if (!length) {
      /** @type {number} */
      length = undefined;
    }
    /** @type {number} */
    var GRID_SPACE_SIZE = Math.floor(x / length);
    if (GRID_SPACE_SIZE > 1) {
      /** @type {number} */
      x = x / GRID_SPACE_SIZE;
    }
    blocks.updateStage();
    if (!exports.runtime("usingSenseHat3d")) {
      $(".orientation-box").css({
        width : x + "px",
        height : length + "px"
      });
      $(".orientation-front").css({
        width : x + "px",
        height : length + "px"
      });
    }
    (function update() {
      if ($("#sense-hat-sensor-controls-container").width() === 0) {
        setTimeout(update, 100);
      } else {
        if (exports.runtime("usingSenseHatFlat")) {
          tryParseQRCode();
        }
        if (_._3d) {
          o.find(".3d").removeClass("hide");
          exports.runtime("usingSenseHat3d", true);
          blocks.initOrientation();
          $(".save-it").removeClass("blue-highlight");
          $(".save-it").removeClass("green-highlight");
        } else {
          o.find(".2d").removeClass("hide");
          exports.runtime("usingSenseHat3d", void 0);
          blocks.initSenseHatEnclosure();
        }
        if (_.snapshot) {
          o.find(".hide-for-snapshot").addClass("hide");
          o.find(".orientation-stage").addClass("snapshot");
        }
        o.initSensors();
      }
    })();
  };
  $("#graphic-wrap").on("split-output", function(canCreateDiscussions) {
    if (exports.runtime("usingSenseHat") && $(".orientation-stage").length) {
      /** @type {number} */
      var _listItemHeight = $(".orientation-stage").height() - $("#console-wrap").height();
      $(".orientation-stage").css({
        height : _listItemHeight + "px"
      });
    }
  });
  var cb;
  var __aliases = {
    "&" : "&amp;",
    "<" : "&lt;",
    ">" : "&gt;"
  };
  /** @type {string} */
  var prefix = "evaluationresult = ";
  /** @type {!RegExp} */
  var rchecked = /^\s*print\b/;
  /** @type {!RegExp} */
  var wru = /^\s*(from\s+\w+\s+)?import\b/;
  /** @type {!RegExp} */
  var OBJECT_REG_NG = /(def|class|for|while|del)\b.*/;
  /** @type {!RegExp} */
  var startQuoteRegExp = /^\s*$/;
  /** @type {!RegExp} */
  var OBJECT_REG = /[^!=<>]=[^=]/;
  /** @type {!RegExp} */
  var rnocache = /^\s*#/;
  var model_data_store = {};
  /** @type {!RegExp} */
  var reBlockName = /^(turtle|pygal|processing|matplotlib\.pyplot|image|sense_hat)$/i;
  var props = {
    sense_hat : ["image"],
    image : ["sense_hat"]
  };
  var opts = {
    turtle : function(component, options) {
      if (typeof cb === "function") {
        cb();
      }
      var minPxPerValUnit = component.graphicsWidth();
      var dtStep = component.graphicsHeight();
      /** @type {number} */
      var text_canvas_dimensions = Math.min(minPxPerValUnit, dtStep);
      return Sk.TurtleGraphics || (Sk.TurtleGraphics = {}), Sk.TurtleGraphics.width = text_canvas_dimensions, Sk.TurtleGraphics.height = text_canvas_dimensions, Sk.TurtleGraphics.worldWidth = 400, Sk.TurtleGraphics.worldHeight = 400, Sk.TurtleGraphics.target = options[0], Sk.TurtleGraphics.assets = function(path) {
        if (component.userAssets) {
          /** @type {number} */
          var i = 0;
          for (; i < component.userAssets.length; i++) {
            if (component.userAssets[i].name === path) {
              return component.userAssets[i].url;
            }
          }
        }
      }, options.data("graphicMode", "turtle"), options.empty();
    },
    pygal : function(firename, fn) {
      return typeof cb === "function" && cb(), fn.data("graphicMode", "pygal"), fn.empty();
    },
    image : function(elem, h) {
      return h.data("graphicMode") !== "sense hat" ? (typeof cb === "function" && cb(), Sk.canvas = "graphic", typeof ImageMod !== "undefined" && (ImageMod.canvasLib = []), h.empty()) : void 0;
    },
    processing : function(file, data) {
      var icon = trinketConfig.prefix("/components/processing.sk/processing-sk-min.js");
      return data.data("graphicMode", "processing"), load(icon, true).then(function() {
        /** @type {(Element|null)} */
        var alignEl = document.getElementById("codeOutput");
        var key = trinketConfig.prefix("/components/processing.sk/skulpt_module");
        ProcessingSk.init(key, file.suspensionHandler, file.suspensionHandler["*"], function(me) {
          return me.target === document.body || alignEl && alignEl.contains(me.target);
        });
        /** @type {!Array} */
        Sk.externalLibraries["./processing/__init__.js"].dependencies = [trinketConfig.prefix("/components/Processing.js/processing.min.js")];
        if (typeof cb === "function") {
          cb();
        }
        /** @type {string} */
        var e = Sk.canvas = "processingCanvas";
        return setTimeout(function() {
          /** @type {boolean} */
          window.readyForSnapshot = true;
        }, 1e4), data.focus(), data.html('<canvas style="display:none" id="' + e + '" width="400" height="400"></canvas>');
      });
    },
    "matplotlib.pyplot" : function(isSlidingUp, $cont) {
      if (typeof cb === "function") {
        cb();
      }
      /** @type {string} */
      var c = Sk.canvas = "matplotlibCanvas";
      return $cont.data("graphicMode", "matplot"), $cont.html('<div id="' + c + '"></div>');
    },
    sense_hat : function(t, n) {
      return (new Promise(function(f, canCreateDiscussions) {
        if (Sk.sense_hat || (Sk.sense_hat = t.sense_hat), Sk.sense_hat_emit || (Sk.sense_hat_emit = t.sense_hat_emit), n.data("graphicMode", "sense hat"), !i) {
          var id;
          /** @type {boolean} */
          var isEventsProcessed = false;
          /** @type {!Array} */
          var el = ["sense-hat"];
          categories = window.senseHatConfig || {};
          if (categories[template] && l >= categories[template]) {
            /** @type {boolean} */
            isEventsProcessed = true;
          }
          if (categories[type] && !isEventsProcessed) {
            el.push(categories[type]);
          }
          if (categories[name]) {
            el.push(categories[name]);
          }
          if (!t._3d) {
            if (el.indexOf("flat") >= 0) {
              el.splice(el.indexOf("flat"), 1);
            }
            el.push("2d");
          }
          if (el.indexOf("flat") >= 0) {
            exports.runtime("usingSenseHatFlat", true);
          }
          /** @type {string} */
          id = el.join("-");
          id = trinketConfig.prefix("/partials/" + id + ".html");
          f(load(id, false).then(window.init3D).then(function(e) {
            if (i = e, update(t, n), exports.runtime("usingSenseHatFlat")) {
              var drop = trigger("statusMessageTemplate", {
                type : "info",
                message : "Try <a href='https://www.google.com/chrome/browser/desktop/' class='text-link' target='_blank'><strong>Chrome</strong></a> or Safari for a richer 3D experience."
              });
              var list = $(drop);
              $("body").append(list);
              $("body").addClass("has-status-bar");
              list.parent().foundation().trigger("open.fndtn.alert");
            }
          }));
        }
        if ($("#sense-hat-sensor-controls-container").length === 0) {
          update(t, n);
        }
        f();
      })).then(function() {
        /** @type {number} */
        var width = document.getElementById("canvas").clientWidth;
        /** @type {number} */
        var height = document.getElementById("canvas").clientHeight;
        /** @type {(Element|null)} */
        var elem = document.getElementById("canvas");
        /** @type {number} */
        window.camera.aspect = width / height;
        window.camera.updateProjectionMatrix();
        window.renderer.setSize(width, height);
        elem.appendChild(window.renderer.domElement);
        p.initJoystick();
        /**
         * @return {undefined}
         */
        cb = function() {
          o.destroySliders();
          $("#graphic-wrap").removeClass("sense-hat");
          cb = void 0;
        };
        $("#graphic-wrap").addClass("sense-hat");
      });
    }
  };
  var L = {
    "./pygal/__init__.js" : {
      path : trinketConfig.prefix("/components/pygal.js/__init__.js"),
      loadDepsSynchronously : true,
      dependencies : [trinketConfig.prefix("/js/vendor/highcharts/highcharts.js"), trinketConfig.prefix("/js/vendor/highcharts/highcharts-more.js")]
    },
    "./numpy/__init__.js" : {
      path : trinketConfig.prefix("/components/skulpt_numpy/dist/numpy/__init__.js")
    },
    "./numpy/random/__init__.js" : {
      path : trinketConfig.prefix("/components/skulpt_numpy/dist/numpy/random/__init__.js")
    },
    "./matplotlib/__init__.js" : {
      path : trinketConfig.prefix("/components/skulpt_matplotlib/matplotlib/__init__.js")
    },
    "./matplotlib/pyplot/__init__.js" : {
      path : trinketConfig.prefix("/components/skulpt_matplotlib/matplotlib/pyplot/__init__.js"),
      dependencies : [trinketConfig.component("d3", "d3.min.js")]
    },
    "./json/__init__.js" : {
      path : trinketConfig.prefix("/components/json.sk/__init__.js"),
      dependencies : [trinketConfig.prefix("/components/json.sk/stringify.js")]
    },
    "./xml/__init__.js" : {
      path : trinketConfig.prefix("/components/xml.sk/__init__.js")
    },
    "./xml/etree/__init__.js" : {
      path : trinketConfig.prefix("/components/xml.sk/etree/__init__.js")
    },
    "./xml/etree/ElementTree.js" : {
      path : trinketConfig.prefix("/components/xml.sk/etree/ElementTree.js")
    },
    "src/lib/itertools.js" : {
      path : trinketConfig.prefix("/js/skulpt/itertools.js")
    },
    "src/lib/os.js" : {
      path : trinketConfig.prefix("/js/skulpt/os.js")
    },
    "./trinket/checks.js" : {
      path : trinketConfig.prefix("/js/skulpt/trinket/checks.js")
    },
    "./trinket/tester/__init__.py" : {
      path : trinketConfig.prefix("/js/skulpt/trinket/tester/__init__.py")
    },
    "./trinket/ast/__init__.py" : {
      path : trinketConfig.prefix("/js/skulpt/trinket/ast/__init__.py")
    },
    "./_ast.js" : {
      path : trinketConfig.prefix("/js/skulpt/trinket/ast/_ast.js")
    },
    "./trinket/__init__.js" : {
      path : trinketConfig.prefix("/js/skulpt/trinket/__init__.js")
    },
    "./turtletalk.py" : {
      path : trinketConfig.prefix("/js/skulpt/turtletalk.py")
    }
  };
  exports["export"]("Skulpt", function(config) {
    var options = {
      evalMode : "main",
      allowGraphics : true,
      autoEscape : false,
      read : all,
      write : render,
      error : start,
      graphicsSetup : opts,
      includeFileInErrors : false,
      graphicsWidth : function() {
        return $(config.graphicsTarget()).parent().width();
      },
      graphicsHeight : function() {
        return $(config.graphicsTarget()).parent().height();
      },
      externalLibraries : L,
      onBeforeImport : function(hackerspace) {
        /** @type {(Element|null)} */
        var excludeNode = document.getElementById("codeOutput");
        if (hackerspace === "pygame") {
          var icon = trinketConfig.prefix("/components/pygame.sk/pygame.js");
          return Sk.misceval.promiseToSuspension(load(icon, true).then(function() {
            Pygame.init(trinketConfig.prefix("/components/pygame.sk/skulpt_module"), function(event) {
              return event.target === document.body || excludeNode && excludeNode.contains(event.target);
            });
          }));
        }
      },
      imageProxy : function(name) {
        if (!config.userAssets) {
          return name;
        }
        /** @type {number} */
        var i = 0;
        for (; i < config.userAssets.length; i++) {
          if (config.userAssets[i].name === name) {
            return config.userAssets[i].url;
          }
        }
        return name;
      }
    };
    config = $.extend({}, options, config);
    if (config.allowGraphics) {
      config.graphicsSetup = $.extend({}, opts, config.graphicsSetup);
      config.graphicsTarget = config.graphicsTarget || function() {
        return $("#graphic");
      };
    }
    var args;
    /**
     * @param {string} parent
     * @return {undefined}
     */
    var filter = function(parent) {
      if (config.autoEscape) {
        parent = select(parent);
      }
      config.write(parent);
    };
    /** @type {string} */
    var Collapse = "__abort_code__";
    /**
     * @param {?} payload
     * @param {?} deviceSid
     * @param {?} _wid_attr
     * @param {boolean} data
     * @param {?} sendResponseCallback
     * @param {?} fn
     * @return {?}
     */
    var init = function(payload, deviceSid, _wid_attr, data, sendResponseCallback, fn) {
      var img = {
        complete : false
      };
      if (config.evalMode !== "repl" && Sk.TurtleGraphics && Sk.TurtleGraphics.reset) {
        Sk.TurtleGraphics.reset();
      }
      return Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody(config.evalMode, false, payload, true);
      }, config.suspensionHandler).then(function(a) {
        /** @type {boolean} */
        img.complete = true;
        if (data && typeof data === "function") {
          data();
        }
        if (Sk.sense_hat) {
          $("#sense_hat_motion").off(".motion");
          $("#sense_hat_motion").off(".stopmotion");
          Sk.sense_hat.sensestick.destroy();
        }
      }, function(val) {
        return val === Collapse ? void(fn && typeof fn === "function" && fn()) : (img.complete = true, sendResponseCallback(val), void(Sk.sense_hat && ($("#sense_hat_motion").off(".motion"), $("#sense_hat_motion").off(".stopmotion"), Sk.sense_hat.sensestick.destroy())));
      }), img;
    };
    return function(t, opts, top, callback) {
      if (!t || /^\s*$/.test(t)) {
        return opts();
      }
      var res = run(config, args, filter, t, opts, top);
      return args = init(res.code, res.oneLiner, res.lines, opts, res.handleError, callback), res.errorMessage ? false : true;
    };
  });
  exports["export"]("SkRuntimeConfig", run);
}(window.TrinketIO, window.jQuery), function(exporting) {
  /**
   * @param {?} val
   * @return {undefined}
   */
  function self(val) {
    this._pollInterval = void 0;
    this._analytics = val;
    this._events = {};
    $(window).on("blur", $.proxy(this.poll, this));
  }
  /** @type {number} */
  self.POLL_INTERVAL = 3e4;
  /**
   * @return {undefined}
   */
  self.prototype.poll = function() {
    if (this._pollInterval) {
      var e;
      for (e in this._events) {
        if (this._events[e]) {
          this._analytics(e, this._events[e]);
        }
        /** @type {number} */
        this._events[e] = 0;
      }
      clearTimeout(this._pollInterval);
      this._pollInterval = void 0;
    }
  };
  /**
   * @param {string} name
   * @return {undefined}
   */
  self.prototype.logEvent = function(name) {
    var conn = this;
    conn._events[name] = (conn._events[name] || 0) + 1;
    if (!this._pollInterval) {
      /** @type {number} */
      this._pollInterval = setTimeout($.proxy(this.poll, this), self.POLL_INTERVAL);
    }
  };
  exporting["export"]("embed.analytics.activity", self);
}(window.TrinketIO), function() {
  /**
   * @param {!Object} a
   * @param {!Object} obj
   * @return {undefined}
   */
  function transform(a, obj) {
    var i;
    var index;
    var args;
    var type = a && a._astname;
    if (type) {
      if (type === "Call") {
        if (a.func.constructor.name === "Name") {
          obj[type].push(a.func.id.v);
        } else {
          if (a.func.constructor.name === "Attribute") {
            obj[type].push(a.func.attr.v);
          }
        }
      } else {
        if (type === "Attribute") {
          obj[type].push(a.attr.v);
        } else {
          if (type === "ImportFrom") {
            obj.Import.push(a.module.v);
          } else {
            if (type === "Import") {
              /** @type {number} */
              i = 0;
              for (; i < a.names.length; i++) {
                obj.Import.push(a.names[i].name.v);
              }
            }
          }
        }
      }
      if (a._fields) {
        /** @type {number} */
        i = 0;
        for (; i < a._fields.length; i = i + 2) {
          if (args = a._fields[i + 1](a)) {
            if (args._astname) {
              transform(args, obj);
            } else {
              if (args.constructor === Array && args.length && args[0] && args[0]._astname) {
                /** @type {number} */
                index = 0;
                for (; index < args.length; index++) {
                  transform(args[index], obj);
                }
              }
            }
          }
        }
      }
    }
  }
  /**
   * @param {!Object} editor
   * @return {?}
   */
  function internalRunCode(editor) {
    var parse;
    var key;
    /** @type {string} */
    var filename = "main.py";
    var base = editor.getValue();
    var value = {
      Call : [],
      Attribute : [],
      Import : []
    };
    try {
      parse = Sk.parse(filename, base);
      key = Sk.astFromParse(parse.cst, filename, parse.flags);
    } catch (h) {
      return;
    }
    return transform(key, value), value;
  }
  if (void 0 === Function.prototype.name && void 0 !== Object.defineProperty) {
    Object.defineProperty(Function.prototype, "name", {
      get : function() {
        /** @type {!RegExp} */
        var funcNameRegex = /function\s([^(]{1,})\(/;
        /** @type {(Array<string>|null)} */
        var b = funcNameRegex.exec(this.toString());
        return b && b.length > 1 ? b[1].trim() : "";
      },
      set : function(a) {
      }
    });
  }
  window.TrinketIO["export"]("skulpt.ast", {
    parseCode : internalRunCode
  });
}(), function(module, exports) {
  /**
   * @param {string} f
   * @return {?}
   */
  function isFunction(f) {
    var m = f.toString().match(/^(.*?)[:;]\s*(.*?)(?:on\sline\s(\d+).*)?$/i);
    return m && m[1] && m[2] ? {
      error : m[0],
      type : m[1],
      message : m[2],
      line : m[3] ? parseInt(m[3]) : -1
    } : false;
  }
  /**
   * @return {undefined}
   */
  function update() {
    if (!K) {
      /** @type {boolean} */
      K = true;
      $("#console-wrap").removeClass("hide");
      if (L) {
        next();
      } else {
        $("#console-wrap").css("height", "100%");
      }
      _this = $("#console-output").jqconsole();
      _this.Write("\u001b[0m");
      _this.Reset();
      _this.Append('<span class="jqconsole-header" aria-hidden="true" role="presentation">Powered by <img id="powered-by-trinket" src="' + trinketConfig.prefix("../img/logo.svg") + '">\n</span>');
    }
  }
  /**
   * @return {undefined}
   */
  function next() {
    if ($("#output-dragbar").hasClass("hide")) {
      $("#output-dragbar").removeClass("hide");
      var rhs_upper = $("#outputTabs").height();
      /** @type {number} */
      var kup = $(".trinket-content-wrapper").height() - rhs_upper;
      var i = $("#output-dragbar").height();
      /** @type {number} */
      var d = 0.8 * kup - i / 2;
      /** @type {number} */
      var meterPos = kup - d - i / 2;
      $("#graphic-wrap").css("height", d);
      $("#console-wrap").css("height", meterPos);
      $("#graphic-wrap").trigger("split-output");
    }
  }
  /**
   * @return {undefined}
   */
  function f() {
    $("#unittest-wrap").removeClass("hide").css("height", "100%");
  }
  /**
   * @param {?} name
   * @return {undefined}
   */
  function factory(name) {
    switch(name) {
      case "turtle":
        if (self._queryString.snapshot) {
          if (!Sk.TurtleGraphics) {
            Sk.TurtleGraphics = {};
          }
          /** @type {boolean} */
          Sk.TurtleGraphics.animate = false;
          /** @type {boolean} */
          Sk.TurtleGraphics.allowUndo = false;
          /** @type {number} */
          Sk.TurtleGraphics.width = 320;
          /** @type {number} */
          Sk.TurtleGraphics.height = 320;
        } else {
          /** @type {boolean} */
          G = true;
          if (type === "run") {
            callback(true);
          }
        }
        break;
      case "urllib.request":
        if ($("#proxy").val()) {
          var cache = {};
          var craft = Sk.sysmodules.mp$subscript(name);
          /**
           * @param {!Object} a
           * @param {?} b
           * @param {?} variableNames
           * @return {?}
           */
          craft.$d.urlopen.func_code = function(a, b, variableNames) {
            if (void 0 === cache[a.v]) {
              /** @type {string} */
              var GROUPS_END_POINT = $("#proxy").val() + "?url=" + encodeURIComponent(a.v);
              /** @type {!XMLHttpRequest} */
              var xhr = new XMLHttpRequest;
              xhr.open("GET", GROUPS_END_POINT, false);
              xhr.send(null);
              /** @type {string} */
              cache[a.v] = xhr.responseText;
              if (cache[a.v].length) {
                setTimeout(function() {
                  cache[a.v] = void 0;
                }, 10 * cache[a.v].length);
              }
            }
            return Sk.misceval.callsim(craft.$d.Response, {
              responseText : cache[a.v]
            });
          };
        }
        break;
      case "sense_hat":
        exports.runtime("usingSenseHat", true);
        exports.runtime("usingSenseHat3d", true);
        if (!exports.runtime("sense_hat_enclosure")) {
          exports.runtime("sense_hat_enclosure", "sense-hat");
        }
        state.initIMU();
        state.addSrc();
        break;
      case "pygal":
        if (self._queryString.snapshot) {
          Highcharts.setOptions({
            plotOptions : {
              series : {
                animation : false
              }
            }
          });
        }
    }
    if (typeof self.afterImport === "function") {
      self.afterImport(name);
    }
  }
  /**
   * @return {?}
   */
  function create() {
    return b || (b = $('<div class="turtle-overlay hide" data-action="graphic.focus" data-interface="output"></div>'), b.insertAfter("#graphic"), b.on("click", function() {
      callback(true);
    })), b;
  }
  /**
   * @param {number} a
   * @return {?}
   */
  function callback(a) {
    return G ? (void 0 !== a && (a = !!a, a ? (create().addClass("hide"), $("#graphic").focus(), $(document).on("keydown.turtle-focus", function(event) {
      event.preventDefault();
    }), self.sendInterfaceAnalytics(create()), $(document).on("mousedown.turtle-focus", function(a) {
      if (!$("#graphic-wrap").is(":hover")) {
        callback(false);
      }
    })) : ($(document).off("keydown.turtle-focus"), $(document).off("mousedown.turtle-focus"), create().removeClass("hide"))), Sk.TurtleGraphics.focus(a)) : void 0;
  }
  /**
   * @param {string} clearGhost
   * @return {undefined}
   */
  function reset(clearGhost) {
    editor.clearTabMarkers();
    if (_this) {
      _this.Write("\u001b[0m");
      _this.Reset();
      _this.Append('<span class="jqconsole-header" aria-hidden="true" role="presentation">Powered by <img id="powered-by-trinket" src="' + trinketConfig.prefix("/img/trinket-logo.png") + '">\n</span>');
    }
    if (!(clearGhost || exports.runtime("usingSenseHat"))) {
      $("#graphic").empty();
      $("#graphic").removeData("graphicMode");
    }
  }
  /**
   * @return {undefined}
   */
  function render() {
    var match = editor.assets();
    $("#imageAssets").empty();
    currentIndex = match.length;
    /** @type {number} */
    naiveInsertIndex = 0;
    if (currentIndex) {
      /** @type {boolean} */
      ha = true;
    }
    match.forEach(function(file) {
      var b = /^data:image/.test(file.url) ? file.url : parse(file.url);
      /** @type {!Image} */
      var node = new Image;
      node.id = file.name;
      /** @type {string} */
      node.className = "hide";
      /**
       * @return {undefined}
       */
      node.onload = function() {
        $("#imageAssets").append(node);
        naiveInsertIndex++;
        if (naiveInsertIndex >= currentIndex) {
          /** @type {boolean} */
          ha = false;
        }
      };
      node.src = b;
    });
  }
  /**
   * @param {string} s
   * @return {?}
   */
  function parse(s) {
    var url = $("#proxy").val();
    /** @type {!RegExp} */
    var NOT_PATH = new RegExp(url + "/", "g");
    return s = s.replace(NOT_PATH, ""), s = url + "/" + s;
  }
  /**
   * @param {!Object} a
   * @param {string} target
   * @return {?}
   */
  function bind(a, target) {
    var aprop;
    var property;
    var inputel;
    for (property in styles) {
      delete styles[property];
    }
    $(".hidden-file").remove();
    for (property in a) {
      if (property === target) {
        aprop = a[property];
      } else {
        if (property.match(/\.py$/)) {
          styles["./" + property] = a[property] + "\n";
        }
        if (!$("#" + property).length) {
          inputel = $("<textarea>", {
            id : property,
            text : a[property] + "\n",
            name : property,
            "class" : "hide hidden-file"
          });
          $("body").append(inputel);
        }
      }
    }
    return accRefs.length = 0, accRefs.push.apply(accRefs, editor.assets()), $("#proxy").val() && accRefs.forEach(function(req) {
      if (!/^data:image/.test(req.url)) {
        req.url = parse(req.url);
      }
    }), aprop;
  }
  /**
   * @return {undefined}
   */
  function build() {
    $(".reveal-modal").foundation("reveal", "close");
    if (Class == null) {
      Class = require(mixin);
    }
    var parent;
    var u = ($("#graphic"), self.getValue());
    parent = bind(editor.getAllFiles(), context);
    if ($("#statusMessages").children().length) {
      $("#statusMessages").trigger("close.fndtn.alert").remove();
    }
    if (typeof self.beforeRun === "function") {
      parent = self.beforeRun(parent);
    }
    /** @type {boolean} */
    G = false;
    create().addClass("hide");
    var el = document.activeElement;
    Class(parent, function() {
      cEscape = void 0;
      if (typeof self.afterRun === "function") {
        self.afterRun(parent);
      }
      self.collectErrorData(u);
      clearTimeout();
    }, function(c) {
      cEscape = void 0;
      if (typeof self.afterRun === "function") {
        self.afterRun(parent);
      }
      self.collectErrorData(u, c);
      /** @type {!RegExp} */
      var arg = /on line (\d+) in (.+)$/;
      var value = c.match(arg);
      if (value) {
        self.highlightLine(value[2], value[1]);
      }
    }, function() {
      clearTimeout();
    });
    if (G || $("#graphic").data("graphicMode") === "processing") {
      $("#graphic").focus();
    } else {
      if (!(cEscape || el !== document.activeElement)) {
        if ($("#editor").css("display") != "none") {
          self.focus();
        } else {
          if (!editor.options.noEditor) {
            $("#honeypot").focus();
          }
        }
      }
    }
    self.updateMetric("runs", u);
    if (!calcSub[u] && self.isModified()) {
      self.callAnalytics("Interaction", "Modify", "Code");
    }
    self.markCodeAsRun(u);
  }
  /**
   * @return {undefined}
   */
  function init() {
    if ($(".reveal-modal").foundation("reveal", "close"), method = "run", U) {
      quit();
      setTimeout(init, 250);
    } else {
      if (ha) {
        setTimeout(init, 500);
      } else {
        if (module.parent) {
          module.parent.postMessage("started", "*");
        }
        if (transport == null) {
          if (self._queryString.snapshot) {
            /** @type {boolean} */
            request.snapshot = true;
          }
          transport = require(request);
        }
        /** @type {boolean} */
        module.Sk_interrupt = false;
        var fn;
        var u = self.getValue();
        fn = bind(editor.getAllFiles(), EventManager);
        reset();
        $("#console-output").removeClass("console-mode");
        if ($("#statusMessages").children().length) {
          $("#statusMessages").trigger("close.fndtn.alert").remove();
        }
        if (typeof self.beforeRun === "function") {
          fn = self.beforeRun(fn);
        }
        /** @type {boolean} */
        G = false;
        create().addClass("hide");
        var wrapper = exports.runtime("usingSenseHat");
        exports.runtime("usingSenseHat", false);
        exports.runtime("downloadExtra", void 0);
        var el = document.activeElement;
        /** @type {boolean} */
        U = true;
        /** @type {number} */
        var autoResumeTimer = setTimeout(function() {
          if (U) {
            self.changeRunOption("stop");
          }
        }, 500);
        transport(fn, function() {
          cEscape = void 0;
          if (typeof self.afterRun === "function") {
            self.afterRun(fn);
          }
          self.collectErrorData(u);
          clearTimeout(autoResumeTimer);
        }, function(a) {
          if (cEscape = void 0, typeof self.afterRun === "function" && self.afterRun(fn), !/(?:interrupt|systemexit)/i.test(a)) {
            self.collectErrorData(u, a);
            /** @type {!RegExp} */
            var f = /on line (\d+) in (\S+)/;
            var names = a.match(f);
            if (names) {
              var line = names[2].replace(/\.$/, "");
              self.highlightLine(line, names[1]);
            }
            exports.runtime("usingSenseHat", wrapper);
          }
          clearTimeout(autoResumeTimer);
        }, function() {
          exports.runtime("usingSenseHat", wrapper);
          clearTimeout(autoResumeTimer);
        });
        if (G || $("#graphic").data("graphicMode") === "processing") {
          $("#graphic").focus();
        } else {
          if (exports.runtime("usingSenseHat")) {
            state.focus(true);
          } else {
            if (!(cEscape || el !== document.activeElement || W)) {
              if ($("#editor").css("display") != "none") {
                self.focus();
              } else {
                if (!(editor.options.noEditor || W)) {
                  $("#honeypot").focus();
                }
              }
            }
          }
        }
        self.updateMetric("runs", u);
        if (!calcSub[u] && self.isModified()) {
          self.callAnalytics("Interaction", "Modify", "Code");
          if (exports.runtime("usingSenseHat")) {
            self.callAnalytics("Sense Hat Event", "Modify", "Code");
          }
        }
        self.markCodeAsRun(u);
      }
    }
  }
  /**
   * @return {undefined}
   */
  function quit() {
    /** @type {boolean} */
    module.Sk_interrupt = true;
    sendToSumoLogic(0);
    module.sense_hat.sensestick.triggerKeyboardInterrupt();
    $("#sense_hat_motion").trigger("change.evt", {
      type : "interrupt"
    });
    if (exports.runtime("usingSenseHat")) {
      state.stopSenseHat();
    }
    if (error) {
      error(new Sk.builtin.SystemExit("execution halted"));
      /** @type {null} */
      error = null;
    }
    if (typeof Processing === "function" && Processing.instances && Processing.instances.length) {
      Processing.instances[0].exit();
    }
  }
  /**
   * @param {number} timeoutID
   * @return {undefined}
   */
  function clearTimeout(timeoutID) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    /** @type {boolean} */
    U = false;
    if (method) {
      self.changeRunOption(method);
    }
    if (exports.runtime("usingSenseHat")) {
      state.stopSenseHat();
    }
    /** @type {boolean} */
    module.readyForSnapshot = true;
    if (module.parent) {
      module.parent.postMessage("complete", "*");
    }
  }
  /**
   * @return {undefined}
   */
  function run() {
    if ($(".reveal-modal").foundation("reveal", "close"), method = "console", U) {
      quit();
      setTimeout(run, 250);
    } else {
      if (ha) {
        setTimeout(run, 500);
      } else {
        if (Sk.globals) {
          Sk.globals = {
            __name__ : Sk.globals.__name__
          };
        }
        update();
        $("#console-output").addClass("console-mode");
        if (html == null) {
          html = require(events);
        }
        var fn;
        /** @type {!Array} */
        var supportHistory = ($("#graphic"), self.getValue(), []);
        fn = bind(editor.getAllFiles(), EventManager);
        reset();
        if ($("#statusMessages").children().length) {
          $("#statusMessages").trigger("close.fndtn.alert").remove();
        }
        if (typeof self.beforeRun === "function") {
          fn = self.beforeRun(fn);
        }
        if (fn) {
          supportHistory = fn.split("\n");
        }
        /** @type {boolean} */
        G = false;
        create().addClass("hide");
        handler({
          history : supportHistory
        });
      }
    }
  }
  /**
   * @param {!Window} data
   * @return {undefined}
   */
  function handler(data) {
    /** @type {boolean} */
    var m = false;
    _this.Prompt(true, function(selector) {
      if (/^\s*$/.test(selector)) {
        /** @type {boolean} */
        _this._pauseHistory = false;
        handler(data);
      } else {
        /** @type {boolean} */
        module.Sk_interrupt = false;
        /** @type {boolean} */
        U = true;
        /** @type {number} */
        var autoResumeTimer = setTimeout(function() {
          if (U && exports.runtime("usingSenseHat")) {
            self.changeRunOption("stop");
          }
        }, 500);
        html(selector, function() {
          /** @type {boolean} */
          _this._pauseHistory = false;
          handler(data);
          clearTimeout(autoResumeTimer);
        }, function(a, pingErr) {
          if (!(exports.runtime("usingSenseHat") && /interrupt/i.test(pingErr.toString()))) {
            _this.Write(rgbToHex(pingErr.toString()), "jqconsole-error", false);
          }
          /** @type {boolean} */
          _this._pauseHistory = false;
          handler(data);
          clearTimeout(autoResumeTimer);
        }, function() {
          clearTimeout(autoResumeTimer);
        });
        self.callAnalytics("Interaction", "Modify", "Code");
      }
    }, function(clusterShardData) {
      var me;
      var val;
      var nameVal;
      /** @type {boolean} */
      var oringFn = false;
      return nameVal = clusterShardData.split("\n"), nameVal.length === 0 ? 0 : (val = nameVal[nameVal.length - 1], me = val.match(/^\s*/)[0], val = nameVal[nameVal.length - 1].replace(/\s+$/, ""), /"""/.test(val) && !/""".*"""/.test(val) && (m = !m), m ? oringFn = 0 : /^\s*#/.test(val) || val[val.length - 1] !== ":" ? me.length && val && val[val.length - 1].length !== 0 ? oringFn = 0 : /^\s*#/.test(val) && (oringFn = 0) : oringFn = 1, _this._enteringHistory && (me.length ? oringFn = -(me.length / 
      2) : oringFn !== false && (oringFn = 0), oringFn === false && (_this._pauseHistory = true)), oringFn);
    });
    _this.Focus();
    get(data.history);
  }
  /**
   * @param {!Array} data
   * @return {undefined}
   */
  function get(data) {
    var assignmentUrl;
    var letters;
    var i;
    var e;
    if (data.length) {
      /** @type {boolean} */
      _this._enteringHistory = true;
      assignmentUrl = data.shift();
      letters = assignmentUrl.split("");
      /** @type {number} */
      i = 0;
      for (; i < letters.length; i++) {
        e = $.Event("keypress");
        e.which = letters[i].charCodeAt(0);
        _this.$input_source.trigger(e);
      }
      if (!data.length) {
        /** @type {boolean} */
        _this._enteringHistory = false;
      }
      e = $.Event("keydown");
      /** @type {number} */
      e.which = "\r".charCodeAt(0);
      _this.$input_source.trigger(e);
      if (data.length && !_this._pauseHistory) {
        get(data);
      }
    }
  }
  /**
   * @param {string} value
   * @return {?}
   */
  function rgbToHex(value) {
    var b = {
      "&" : "&amp;",
      "<" : "&lt;",
      ">" : "&gt;",
      '"' : "&quot;",
      "'" : "&#039;"
    };
    return value.replace(/[&<>"']/g, function(inFlowOrd) {
      return b[inFlowOrd];
    });
  }
  var self;
  var editor;
  var log;
  var b;
  var k;
  var type;
  var _this;
  var method;
  var error;
  var file;
  var calcSub = {};
  /** @type {boolean} */
  var G = false;
  var require = exports["import"]("Skulpt");
  var cEscape = void 0;
  /** @type {boolean} */
  var J = false;
  /** @type {boolean} */
  var K = false;
  /** @type {boolean} */
  var L = false;
  var styles = {};
  /** @type {!Array} */
  var accRefs = [];
  /** @type {string} */
  var EventManager = "main.py";
  /** @type {string} */
  var context = "tests.py";
  var makeToggleFocusable = exports["import"]("utils.guid");
  var extend = exports["import"]("utils.template");
  var state = exports["import"]("python.sense-hat");
  var LessVariablesView = exports["import"]("embed.analytics.activity");
  /** @type {boolean} */
  var U = false;
  var sendToSumoLogic = exports["import"]("sendSignalToSkulpt");
  var W = module.userSettings && module.userSettings.disableAceEditor || false;
  try {
    file = exports["import"]("skulpt.ast");
  } catch (X) {
  }
  var transport;
  var html;
  var Class;
  /**
   * @param {string} value
   * @return {undefined}
   */
  var write = function(value) {
    update();
    value = value.replace(/\0(33)\[/g, "\u001b[");
    _this.Write(value);
  };
  /**
   * @param {string} $notyfy
   * @return {?}
   */
  var onClick = function($notyfy) {
    return update(), module.readyForSnapshot = true, new Promise(function(saveNotifs, callback) {
      error = callback;
      var oldFocus = document.activeElement;
      _this.Append('<span aria-hidden="true" role="presentation">' + $notyfy + "</span>");
      $("#console-output").addClass("console-active");
      _this.Input(function(notifications) {
        $("#console-output").removeClass("console-active");
        if (self.activityLog) {
          self.activityLog.logEvent("Text Input");
        }
        saveNotifs(notifications);
        if (oldFocus && !W) {
          $(oldFocus).focus();
        }
      });
      if (!cEscape) {
        _this.Focus();
      }
    });
  };
  /**
   * @return {undefined}
   */
  var formConfirmation = function() {
    if (!L) {
      /** @type {boolean} */
      L = true;
      $("#graphic-wrap").removeClass("hide");
      if (K) {
        next();
      } else {
        $("#graphic-wrap").css("height", "100%");
      }
    }
  };
  var request = {
    evalMode : "main",
    onAfterImport : factory,
    userFiles : styles,
    userAssets : accRefs,
    includeFileInErrors : true,
    write : write,
    inputfun : onClick,
    onGraphicsInit : formConfirmation,
    sense_hat : module.sense_hat,
    sense_hat_emit : state.sense_hat_emit,
    _3d : true
  };
  var events = {
    evalMode : "repl",
    onAfterImport : factory,
    userFiles : styles,
    userAssets : accRefs,
    includeFileInErrors : false,
    write : write,
    inputfun : onClick,
    onGraphicsInit : formConfirmation,
    sense_hat : module.sense_hat,
    sense_hat_emit : state.sense_hat_emit,
    _3d : true,
    error : function(value, total) {
    }
  };
  var mixin = {
    evalMode : "tests",
    userFiles : styles,
    userAssets : accRefs,
    includeFileInErrors : true,
    write : function(objs) {
      f();
    },
    inputfun : function(e) {
      return f(), new Promise(function(saveNotifs, b) {
        saveNotifs();
      });
    }
  };
  /** @type {boolean} */
  var ha = false;
  /** @type {number} */
  var currentIndex = 0;
  /** @type {number} */
  var naiveInsertIndex = 0;
  !function() {
    /** @type {!RegExp} */
    var a = /^(input|text|password|file|email|search|date)$/i;
    $(document).bind("keydown", function(event) {
      var elem;
      /** @type {boolean} */
      var d = true;
      if (event.keyCode === 8) {
        elem = event.srcElement || event.target;
        if (elem.tagName.toLowerCase() === "textarea" || elem.tagName.toLowerCase() === "input" && elem.type.match(a)) {
          d = elem.readOnly || elem.disabled;
        }
        if (d) {
          event.preventDefault();
        }
      }
    });
  }();
  module.TrinketAPI = {
    initialize : function(obj) {
      self = this;
      k = $("#start-value").val();
      type = $("#runOption-value").val();
      self.runMode = $("#runMode-value").val();
      /** @type {boolean} */
      cEscape = k === "result" && !$("body").hasClass("has-status-bar");
      /** @type {!Array} */
      var assets = [];
      /** @type {boolean} */
      var addFiles = true;
      var role = self.getUIType();
      if (exports.runtime("mission-zero")) {
        /** @type {boolean} */
        assets = false;
        /** @type {boolean} */
        addFiles = false;
        state.initMissionZero();
      } else {
        if (obj.assets) {
          assets = obj.assets.slice();
        }
      }
      editor = $("#editor").codeEditor({
        showTabs : !this._queryString.outputOnly,
        noEditor : !!this._queryString.outputOnly,
        disableAceEditor : W,
        mainFileName : EventManager,
        showInfo : true,
        assets : assets,
        addFiles : addFiles,
        guest : role === "guest" ? true : false,
        owner : role === "owner" ? true : false,
        canHideTabs : self.hasPermission("hide-trinket-files"),
        canAddInlineComments : self.hasPermission("add-trinket-inline-comments") && (role === "owner" || self.assignmentFeedback),
        assignmentViewOnly : self.assignmentViewOnly,
        userId : self.getUserId(),
        lang : "python",
        onFocus : function() {
          callback(false);
        },
        assetsHowTo : "#assets-howto-message"
      }).data("trinket-codeEditor");
      var statusCode = {
        trinketIdentifier : self.getTrinketIdentifierOrNull(),
        userIdentifier : self.getUserId()
      };
      if (module.trinketBroadcast && module.trinketBroadcast.connection) {
        module.trinketBroadcast.connection.initialize(editor, statusCode);
      }
      render();
      /** @type {function(!Object, !Function): undefined} */
      var output = self.save;
      /**
       * @param {!Object} op
       * @param {!Function} b
       * @return {undefined}
       */
      self.save = function(op, b) {
        output.call(self, op, function(applyBackgroundUpdates, deg) {
          if (typeof b === "function") {
            b(applyBackgroundUpdates, deg);
          }
        });
      };
      $(document).on("sk.system.clear", function() {
        reset(true);
      });
      $("#reset-output").click(function() {
        reset(true);
      });
      $(document).on("assets.change", function() {
        render();
        self.triggerChange();
      });
      $(document).on("open.fndtn.alert", function() {
        editor.resize();
      });
      $(document).on("close.fndtn.alert", function() {
        editor.resize();
        if (exports.runtime("usingSenseHat")) {
          state.updateSliders();
        }
      });
      editor.addCommand("run", {
        win : "Ctrl-Enter",
        mac : "Command-Enter"
      }, function(a) {
        $("#editor").trigger("trinket.code.run", {
          action : "code.run"
        });
      });
      editor.addCommand("test", {
        win : "Shift-Ctrl-Enter",
        mac : "Shift-Command-Enter"
      }, function(a) {
        $("#editor").trigger("trinket.code.check", {
          action : "code.check"
        });
      });
      try {
        log = exports["import"]("python.editor.hints");
        editor.registerPlugin(log);
        if (!trinketConfig.get("testing")) {
          AutoCompletePlugin = exports["import"]("python.editor.autocomplete");
          if (self._queryString && self._queryString.inLibrary) {
            AutoCompletePlugin.setInLibrary(true);
          }
          editor.registerPlugin(AutoCompletePlugin);
        }
      } catch (l) {
      }
      /** @type {number} */
      this._errorGroup = 0;
      this._sessionId = makeToggleFocusable();
      this._previousError = void 0;
      $(document).on("trinket.code.edit", $.proxy(this.showCode, this));
      $(document).on("trinket.code.run", $.proxy(this.showResult, this));
      $(document).on("trinket.code.stop", $.proxy(this.stopExecution, this));
      $(document).on("trinket.code.check", $.proxy(this.showTestResult, this));
      $(document).on("trinket.code.console", $.proxy(this.consoleResult, this));
      $(document).on("trinket.output.view", $.proxy(self.showOutput, self));
      $(document).on("trinket.instructions.view", $.proxy(self.showInstructions, self));
      /** @type {string} */
      this.viewer = "#codeOutput";
      $(document).on("trinket.code.modules", $.proxy(this.toggleModules, this));
      $("#honeypot").on("keydown", $.proxy(this.showCode, this));
      $("#menu").on("trinket.sharing.share trinket.sharing.embed trinket.sharing.email", function(event) {
        if (self.isModified() && !calcSub[self.getValue()]) {
          $("#runFirstModal").foundation("reveal", "open");
          event.preventDefault();
        }
      });
      $('.menu-toolbar .menu-button[data-action="code.run"]').on("mousedown", function(event) {
        if (editor && editor.isFocused()) {
          event.preventDefault();
        }
      });
      $('.menu-toolbar .menu-button[data-action="code.check"]').on("mousedown", function(event) {
        if (editor && editor.isFocused()) {
          event.preventDefault();
        }
      });
      $("#modalRun").click(function() {
        sendInterfaceAnalytics(this);
        $("#runFirstModal").foundation("reveal", "close");
        init();
      });
      if (obj.settings && obj.settings.testsEnabled && $(".check-it").hasClass("hide")) {
        $(".check-it").removeClass("hide");
      }
      self.reset(obj, true);
      editor.change(function() {
        self.triggerChange();
      });
      self.draggable(_.debounce(function() {
        if (exports.runtime("usingSenseHat")) {
          state.updateSliders();
        }
      }, 500));
      $("#output-dragbar").mousedown(function(event) {
        event.preventDefault();
        var delta = $("#outputTabs").height();
        /** @type {number} */
        var offset = $(".trinket-content-wrapper").height() - delta;
        var y = $(".trinket-content-wrapper").offset().top + delta;
        var padding = $("#output-dragbar").height();
        $(document).on("mousemove.output-dragbar", function(event) {
          /** @type {number} */
          var w = event.pageY - y - padding / 2;
          /** @type {number} */
          var height = offset - w - padding / 2;
          if (w >= 20 && height >= 20) {
            $("#graphic-wrap").css("height", w);
            $("#console-wrap").css("height", height);
          }
        });
        $(document).on("mouseup.output-dragbar", function(a) {
          $(document).off("mousemove.output-dragbar mouseup.output-dragbar");
        });
        self.sendInterfaceAnalytics(this);
      });
      self.activityLog = new LessVariablesView(function(commaParam, command_module_id) {
        var actionIdentity = commaParam.replace(/[a-zA-Z0-9](?:[^\s\-\._]*)/g, function(CardNo18) {
          return CardNo18.charAt(0).toUpperCase() + CardNo18.substr(1);
        });
        self.sendAnalytics("Output", {
          action : actionIdentity,
          label : self.getTrinketIdentifier(),
          value : command_module_id
        });
      });
      $(document).keydown(function(a) {
        var instanceFillValue = $("#graphic").data("graphicMode");
        if (/turtle/i.test(instanceFillValue) && $(".turtle-overlay").hasClass("hide") || /sense\s*hat/i.test(instanceFillValue) && exports.runtime("usingSenseHat")) {
          self.activityLog.logEvent(instanceFillValue + " Key");
        }
      });
      $(document).on("mousedown", "#graphic-wrap", function(jEvent) {
        var b;
        if ($(jEvent.target).attr("id") === "sense-hat-rotate-button" || $(jEvent.target).parent().attr("id") === "sense-hat-rotate-button") {
          self.callAnalytics("Sense Hat Event", "Click", "RotateButton");
        } else {
          b = $("#graphic").data("graphicMode");
          if (b) {
            self.activityLog.logEvent(b + " Click");
          } else {
            self.activityLog.logEvent("Output Click");
          }
        }
      });
      $(document).on("change", "[data-rangeslider]", function(a) {
        self.callAnalytics("Sense Hat Event", "Click", "Sensor");
      });
      if (module.parent) {
        module.parent.postMessage("initialised", "*");
      }
      if (self._queryString && self._trinket.description && self._queryString.showInstructions && self._trinket.description.length) {
        $(document).trigger("trinket.instructions.view");
      }
    },
    collectErrorData : function(value, handler) {
      var data;
      var s;
      var result = handler && isFunction(handler);
      var self = this._previousError;
      if (self) {
        self.attempt += 1;
        s = module.JsDiff.createPatch("attempt" + self.attempt, self.code, value);
        data = {
          session : this._sessionId,
          error : self.error,
          group : self.group,
          type : self.type,
          message : self.message,
          line : self.line,
          code : self.code,
          elapsed : Date.now() - self.time,
          totalElapsed : Date.now() - self.firstTime,
          delta : s.substr(s.indexOf("@")),
          attempt : self.attempt
        };
        if (result) {
          data.introduced = result.error;
        }
        if (result && self.message === result.message) {
          /** @type {string} */
          data.state = "repeated";
          this.logError(data);
          /** @type {number} */
          self.time = Date.now();
          result = void 0;
        } else {
          /** @type {string} */
          data.state = "resolved";
          this.logError(data);
          if (!result) {
            this._previousError = void 0;
          }
        }
      }
      if (result) {
        /** @type {number} */
        result.group = ++this._errorGroup;
        /** @type {string} */
        result.code = value;
        /** @type {number} */
        result.time = result.firstTime = Date.now();
        /** @type {number} */
        result.attempt = 0;
        this.logError({
          state : "encountered",
          session : this._sessionId,
          group : result.group,
          error : result.error,
          type : result.type,
          message : result.message,
          line : result.line,
          attempt : result.attempt,
          code : value
        });
        this._previousError = result;
      }
    },
    highlightLine : function(line, html) {
      editor.highlight(line, html);
    },
    getTour : function() {
      var user = this.getUIType();
      /** @type {!Array} */
      var _this = [];
      return user !== "owner" && ($(".mode-toolbar .show-for-small-only").css("display") !== "none" ? ($("#editor").hasClass("hide") || _this.push({
        el : ".run-it",
        event : "code.run"
      }), _this.push({
        el : ".edit-it",
        event : "code.edit"
      }, {
        el : ".ace_content",
        event : "code.change"
      }, {
        el : ".run-it",
        event : "code.run"
      })) : $("#start-value").val() !== "result" && this._trinket.code ? _this.push([{
        el : ".run-it",
        event : "code.run"
      }, {
        el : ".ace_content",
        event : "code.change"
      }]) : _this.push({
        el : ".ace_content",
        event : "code.change"
      }, {
        el : ".run-it",
        event : "code.run"
      }), _this.push({
        el : ".left-menu-toggle",
        event : "menu.options"
      }, {
        el : ".share-it",
        event : "sharing.share"
      }), user === "guest" && _this.push({
        el : ".right-menu-toggle",
        event : "menu.user"
      }), _this.push({
        el : ".save-it",
        event : "library.add"
      })), _this;
    },
    getEditor : function() {
      return editor;
    },
    getType : function() {
      return "python";
    },
    getValue : function(input) {
      return editor.serialize(input);
    },
    getMainFile : function() {
      return EventManager;
    },
    isDirty : function() {
      if (!this._trinket) {
        return false;
      }
      if (this.getValue() !== (this._original.code || "")) {
        return true;
      }
      var existingErrors = editor.assets();
      return existingErrors.length !== (this._original.assets || []).length ? true : JSON.stringify(existingErrors) !== JSON.stringify(this._original.assets) ? true : JSON.stringify(this._trinket.settings) !== JSON.stringify(this._original.settings) ? true : false;
    },
    getAnalyticsCategory : function() {
      return "Python";
    },
    serialize : function(options) {
      var json = {
        code : this.getValue(options),
        assets : editor.assets().slice(),
        settings : this._trinket.settings
      };
      return options && options.removeComments && editor.removeComments(), json;
    },
    showMessage : function(msg, param) {
      var clone = extend("statusMessageTemplate", {
        type : msg,
        message : param
      });
      var err = $(clone);
      $("body").addClass("has-status-bar").append(err);
      err.parent().foundation().trigger("open.fndtn.alert");
    },
    showCode : function(line) {
      $("#codeOutput").addClass("hide");
      $("#editor").removeClass("hide");
      self.closeOverlay("#modules");
      self.focus();
      callback(false);
    },
    showResult : function(event) {
      if (type !== "run" && event && $(event.target).data("button") === "run") {
        self.changeRunOption("run");
      }
      /** @type {string} */
      self.runMode = "";
      self.triggerRunModeChange();
      $("#codeOutput").removeClass("hide");
      $("#editor").addClass("hide");
      $("#unittest-wrap").addClass("hide");
      self.closeOverlay("#modules");
      $("#instructionsContainer").addClass("hide");
      $("#outputContainer").removeClass("hide");
      $("#codeOutputTab").addClass("active");
      $("#instructionsTab").removeClass("active");
      init();
      if (event) {
        self.callAnalytics("Interaction", "Click", "Run");
        if (exports.runtime("usingSenseHat")) {
          self.callAnalytics("Sense Hat Run", "Click", "Run");
        }
      }
    },
    stopExecution : function(a) {
      quit();
    },
    showTestResult : function(testClassName) {
      $("#codeOutput").removeClass("hide");
      $("#editor").addClass("hide");
      $("#console-wrap").addClass("hide");
      /** @type {boolean} */
      K = false;
      $("#graphic-wrap").addClass("hide");
      /** @type {boolean} */
      L = false;
      $("#unittest-wrap").removeClass("hide");
      $("#output-dragbar").addClass("hide");
      $("#instructionsContainer").addClass("hide");
      $("#outputContainer").removeClass("hide");
      self.closeOverlay("#modules");
      build();
      if (testClassName) {
        self.callAnalytics("Interaction", "Click", "Check");
      }
    },
    consoleResult : function(status) {
      if (type !== "console" && status && $(status.target).data("button") === "console") {
        self.changeRunOption("console");
      }
      /** @type {string} */
      self.runMode = "console";
      self.triggerRunModeChange();
      $("#codeOutput").removeClass("hide");
      $("#editor").addClass("hide");
      $("#unittest-wrap").addClass("hide");
      self.closeOverlay("#modules");
      $("#instructionsContainer").addClass("hide");
      $("#outputContainer").removeClass("hide");
      $("#codeOutputTab").addClass("active");
      $("#instructionsTab").removeClass("active");
      run();
      if (status) {
        self.callAnalytics("Interaction", "Click", "Console");
        if (exports.runtime("usingSenseHat")) {
          self.callAnalytics("Sense Hat Run", "Click", "Console");
        }
      }
    },
    toggleModules : function() {
      if (J) {
        self.toggleOverlay("#modules");
      } else {
        $.get("/api/docs/python", function(mbError) {
          $("#modules").prepend(mbError);
          $(document).foundation();
          self.toggleOverlay("#modules");
          /** @type {boolean} */
          J = true;
          self.callAnalytics("Interaction", "Click", "Documentation");
        });
      }
    },
    hideAll : function() {
      this.toggleModules();
    },
    onOpenOverlay : function() {
      $("#codeOutput").addClass("hide");
      $("#editor").addClass("hide");
    },
    onCloseOverlay : function() {
      $("#codeOutput").removeClass("hide");
      $("#editor").removeClass("hide");
      self.focus();
      callback(false);
    },
    reset : function(opts, b) {
      editor.reset(opts.code);
      editor.assets(opts.assets ? opts.assets.slice() : []);
      if (!b) {
        render();
      }
      if (type === "console" || self.runMode === "console") {
        this.consoleResult();
      } else {
        if (opts.code && k === "result" && cEscape !== false) {
          this.showResult();
        } else {
          this.showCode();
          reset();
        }
      }
    },
    replaceMain : function(source, main) {
      editor.setValue(source.code);
      editor.assets(source.assets ? source.assets.slice() : []);
      if (!main) {
        render();
      }
    },
    onChangeChecks : function(listeners) {
      var parse;
      var results;
      var i;
      var data = this;
      /**
       * @return {undefined}
       */
      parse = function() {
        /** @type {!Array} */
        results = [];
        var result;
        /** @type {*} */
        var elem = JSON.parse(data.getValue());
        /** @type {string} */
        var sel_construtor_name = "main.py";
        _.find(elem, {
          name : sel_construtor_name
        }).content;
        if (file) {
          result = file.parseCode(editor);
        }
        /** @type {number} */
        i = 0;
        for (; i < listeners.length; i++) {
          results.push({
            result : listeners[i].fn.call(data, result),
            name : listeners[i].name
          });
        }
        module.parent.postMessage(JSON.stringify({
          action : "check-results",
          results : results
        }), "*");
      };
      $(this).on("trinket.code.change", _.debounce(parse, 1e3));
      $(document).on("trinket.resetted", parse);
      parse();
    },
    focus : function() {
      if (!$("body").data("is-mobile") && $("body").data("autofocus")) {
        editor.focus();
      }
      callback(false);
    },
    markCodeAsRun : function(u) {
      /** @type {boolean} */
      calcSub[u] = true;
    },
    downloadable : function() {
      var alreadyMarked;
      var specs;
      var assets;
      /** @type {boolean} */
      var selfCompletionActive = this.getUIType() === "owner";
      return this._trinket && this._trinket._origin_id && (alreadyMarked = this._trinket._origin_id), specs = selfCompletionActive && !alreadyMarked ? editor.getAllFiles() : editor.getAllVisibleFiles(), assets = editor.assets(), exports.runtime("usingSenseHat") || state.usingSenseHat(specs) && state.addSrc(), {
        files : specs,
        assets : assets
      };
    },
    toggleCheckButton : function() {
      if ($(".check-it").hasClass("hide")) {
        $(".check-it").removeClass("hide");
      } else {
        $(".check-it").addClass("hide");
      }
    },
    changeRunOption : function(name) {
      var exports = {
        run : "fa fa-play",
        console : "fa fa-terminal",
        stop : "fa fa-stop"
      };
      var d = {
        run : "View the result.",
        console : "Run code interactively.",
        stop : "Stop program."
      };
      var api = {
        run : "\u8fd0\u884c",
        console : "\u547d\u4ee4\u884c",
        stop : "\u505c\u6b62"
      };
      $(".run-it").data("action", "code." + name);
      $(".run-it").attr("title", d[name]);
      $(".run-it").find("label").text(api[name]);
      $(".run-it").find("i").removeClass().addClass(exports[name]);
      /** @type {string} */
      type = name;
    },
    discardDraftSettings : function() {
      if (this._trinket.settings.testsEnabled !== this._predraft.settings.testsEnabled) {
        /** @type {!MouseEvent} */
        var mevt = new MouseEvent("click", {
          bubbles : true
        });
        try {
          $("#testsEnabled").data("skip-trigger", true);
          $("#testsEnabled")[0].dispatchEvent(mevt);
        } catch (size_buffer) {
          console.log("testsEnabled click err:", size_buffer);
        }
      }
      if (exports.runtime("usingSenseHat")) {
        state.resetSensors(this._predraft.settings);
      }
    }
  };
}(window, window.TrinketIO);
