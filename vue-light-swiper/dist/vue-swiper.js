/*!
 * vue-light-swiper v1.0.3
 * vue swiper for vue 2.0. light weight and simple
 * https://github.com/zhengjiaqi/vue-light-swiper
 * @author zhengjiaqi <971682460@qq.com>
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueSwiper"] = factory();
	else
		root["VueSwiper"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(7)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_swiper_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_swiper_slide_vue__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "vueSwiper", function() { return __WEBPACK_IMPORTED_MODULE_0__vue_swiper_vue__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "vueSwiperSlide", function() { return __WEBPACK_IMPORTED_MODULE_1__vue_swiper_slide_vue__["a"]; });
/**
 * @file vue swpier组件
 * @author zhengjiaqi01<zhnegjiaqi01@baidu.com>
 */





/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_swiper_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2575f707_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_vue_swiper_vue__ = __webpack_require__(9);
function injectStyle (ssrContext) {
  __webpack_require__(5)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_swiper_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2575f707_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_vue_swiper_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("2a71ae6c", content, true);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".swiper{overflow:hidden}.swiper,.swiper-track{width:100%;position:relative}.swiper-track{height:100%;display:flex;align-items:center;top:0;left:0}.swiper-indicators{position:absolute;height:0;bottom:20px;left:0;width:100%;text-align:center}.swiper-dot{display:inline-block;width:6px;height:6px;margin:3px;border-radius:100%;background:rgba(0,0,0,.5);border:1px solid hsla(0,0%,100%,.5);transition:all .5s ease}.swiper-dot.active{background:#05b4ff}.swiper.vertical .swiper-track{flex-direction:column}.swiper.vertical .swiper-indicators{left:auto;right:20px;bottom:auto;top:50%;width:8px;height:auto;transform:translate3d(0,-50%,0)}", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'vueSwiper',
    props: {
        // the swiper item show index, start with 0
        showIndex: {
            type: Number,
            default: 0
        },
        // the swiper autoplay interval time，accept Number, unit ms
        auto: {
            type: Number,
            default: 0
        },
        // the swiper defaultDuration for transitionDuration
        defaultDuration: {
            type: Number,
            default: 300
        },
        // set whether you need loop
        loop: {
            type: Boolean,
            default: false
        },
        // set whether you need a vertical swiper
        vertical: {
            type: Boolean,
            default: false
        },
        // set swiper base width, unit px. default width is swiper's width,
        // but when you init a swiper with invisible, default width can not be set right,
        // you need set base width in this time.
        baseWidth: {
            type: Number,
            default: 0
        },
        // set swiper base height, unit px. need when vertical, default height is swiper's height,
        // but when you init a swiper with invisible, default height can not be set right,
        // you need set base height in this time.
        baseHeight: {
            type: Number,
            default: 0
        },
        // set swiper base width and height with a dom or a selector. default size is swiper's size,
        // but when you init a swiper with invisible, default width and height can not be set right,
        // you need set base size dom in this time, base width and height will according to this dom.
        baseSizeDom: {},
        // set whether you need indicators
        indicators: {
            type: Boolean,
            default: false
        },
        // the limit of swiper slide change, unit px
        limit: {
            type: Number,
            default: 20
        },
        // whether use lazyload
        uselazyload: {
            type: Boolean,
            default: false
        },
        // lazyload preload number
        preload: {
            type: Number,
            default: 0
        }
    },
    data: function data() {
        return {
            addonBefore: '',
            addonBefore2: '',
            addonAfter: '',
            addonAfter2: '',
            translateX: 0,
            translateY: 0,
            timer: 0,
            activeIndex: 0,
            oldActiveIndex: '',
            slotsList: [],
            childrenList: [],
            style: {
                height: '',
                paddingBottom: ''
            },
            addonStyle: {
                width: 100 + '%',
                height: 'auto'
            },
            transitionDuration: this.defaultDuration
        };
    },

    watch: {
        auto: function auto() {
            this._setTimer();
        },
        showIndex: function showIndex(val) {
            var _this = this;

            setTimeout(function () {
                _this._transitionToPage(val);
            }, 30);
        }
    },
    created: function created() {
        this.slotsList = this.$slots.default;
        this.childrenList = this.$children;
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    },
    mounted: function mounted() {
        this.activeIndex = this.showIndex;
        this._setTimer();
        this._resize();
        this._handleUpdate();
        this.$on('childUpdate', throttle(function () {
            this._handleUpdate();
        }, this.defaultDuration + 100));
        window.addEventListener('resize', this._resize);
        document.addEventListener('touchmove', this.onTouchMove, { passive: false }, false);
        document.addEventListener('touchend', this.onTouchEnd, { passive: false }, false);
        document.addEventListener('mousemove', this.onTouchMove, { passive: false }, false);
        document.addEventListener('mouseup', this.onTouchEnd, { passive: false }, false);
    },
    destoryed: function destoryed() {
        window.removeEventListener('resize', this._resize);
        this._clearTimer();
    },


    methods: {
        _handleUpdate: function _handleUpdate() {
            this.slotsList = this.$slots.default;
            this._setHelperDOM();
            this._lazyLoad();
        },
        onTouchstart: function onTouchstart(e) {
            if (this.slotsList.length == 1) {
                return;
            }
            this.transitionDuration = 0;
            var pos = this._getTouchPos(e);
            this.x = pos.x;
            this.y = pos.y;
            this._clearTimer();
            this.touchStart = true;
        },
        onTouchMove: function onTouchMove(e) {
            if (!this.touchStart) {
                return;
            }
            var pos = this._calculatePos(e);
            if (!this.vertical && pos.absX > pos.absY) {
                e.preventDefault();
                this._slid(this.activeIndex, pos.deltaX);
            }

            if (this.vertical) {
                e.preventDefault();
                this._slid(this.activeIndex, pos.deltaY);
            }
        },
        onTouchEnd: function onTouchEnd(e) {
            if (!this.touchStart) {
                return;
            }
            var loop = this.loop,
                slotsList = this.slotsList,
                limit = this.limit,
                activeIndex = this.activeIndex;

            var pos = this._calculatePos(e);
            var newIndex = activeIndex;
            if (pos.abs > limit) {
                newIndex = newIndex + pos.abs / pos.delta;
                if (!loop) {
                    newIndex = Math.max(Math.min(newIndex, slotsList.length - 1), 0);
                }
            }
            this._transitionToPage(newIndex);
            this.touchStart = false;
        },
        onTouchcancel: function onTouchcancel(e) {
            this._transitionToPage(this.activeIndex);
        },
        onTransitionend: function onTransitionend(e) {
            if (this.loop && (this.activeIndex === 0 || this.activeIndex === this.slotsList.length - 1)) {
                this.transitionDuration = 0;
                this._slid(this.activeIndex, 0);
            }
            this.$emit('slide-end', this.activeIndex);
            if (this.oldActiveIndex !== this.activeIndex) {
                this.$emit('slide-change', this.activeIndex, this.oldActiveIndex);
                this.$emit('update:showIndex', this.activeIndex);
                this.oldActiveIndex = this.activeIndex;
            }
        },
        _lazyLoad: function _lazyLoad() {
            if (!this.uselazyload) {
                return;
            }
            var i = 0;
            while (i <= this.preload) {
                var child = this.slotsList[this.activeIndex + i] || {};
                var $el = child.elm;
                if ($el) {
                    var lazy = $el.querySelectorAll('.lazy');
                    for (var k = 0; k < lazy.length; k++) {
                        var item = lazy[k];
                        item.setAttribute('src', item.dataset.src);
                        item.classList.remove('lazy');
                    }
                }
                i++;
            }
        },
        _setHelperDOM: function _setHelperDOM() {
            var len = this.slotsList.length;
            if (len > 1 && this.loop) {
                this.addonBefore = this.slotsList[len - 1].elm.innerHTML;
                this.addonBefore2 = this.slotsList[len - 2].elm.innerHTML;
                this.addonAfter = this.slotsList[0].elm.innerHTML;
                this.addonAfter2 = this.slotsList[1].elm.innerHTML;
            }
        },
        _slid: function _slid(index, displacement) {
            var loop = this.loop,
                slotsList = this.slotsList;

            var len = slotsList.length;
            if (len === 0) {
                return;
            }
            if (len === 1) {
                loop = false;
            }
            if (!loop) {
                index = (index + len) % len;
            }
            var translate = -this._getTranslateOfPage() * (index + (loop ? 2 : 0)) - displacement;
            this._setTranslate(translate);
            this.activeIndex = (index + len) % len;
        },
        _calculatePos: function _calculatePos(e) {
            var pos = this._getTouchPos(e);
            var x = pos.x;
            var y = pos.y;
            var xd = this.x - x;
            var yd = this.y - y;
            var axd = Math.abs(xd);
            var ayd = Math.abs(yd);
            var absName = this.vertical ? 'absY' : 'absX';
            var deltaName = this.vertical ? 'deltaY' : 'deltaX';
            var res = {
                deltaX: xd,
                deltaY: yd,
                absX: axd,
                absY: ayd
            };
            res.abs = res[absName];
            res.delta = res[deltaName];
            return res;
        },
        _setTimer: function _setTimer() {
            var _this2 = this;

            var auto = this.auto,
                slotsList = this.slotsList;

            var len = slotsList.length;
            if (auto && len > 1) {
                this.timer = setInterval(function () {
                    _this2._transitionToPage(_this2.activeIndex + 1);
                }, auto);
            }
        },
        _clearTimer: function _clearTimer() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },
        _transitionToPage: function _transitionToPage(index, duration) {
            this._clearTimer();
            this.transitionDuration = duration || this.defaultDuration;
            this._slid(index, 0);
            this._setTimer();
        },
        _getTouchPos: function _getTouchPos(e) {
            var x = 0;
            var y = 0;
            if (e.changedTouches) {
                x = e.changedTouches[0].clientX;
                y = e.changedTouches[0].clientY;
            } else {
                x = e.clientX;
                y = e.clientY;
            }
            return { x: x, y: y };
        },
        _resize: function _resize() {
            var width = 0;
            var height = 0;
            var baseSizeDom = this.baseSizeDom;
            if (baseSizeDom) {
                if (typeof baseSizeDom === 'string') {
                    baseSizeDom = document.querySelector(baseSizeDom) || { style: { width: 0, height: 0 } };
                }
                width = baseSizeDom.offsetWidth || parseInt(baseSizeDom.style.width) || 0;
                height = baseSizeDom.offsetHeight || parseInt(baseSizeDom.style.height) || 0;
            }

            if (this.baseWidth) {
                width = this.baseWidth;
            } else {
                width = this.$el.offsetWidth;
            }
            if (width !== 0) {
                this.width = width;
                this.addonStyle.width = width + 'px';
            }

            if (this.vertical) {
                if (this.baseHeight) {
                    height = this.baseHeight;
                } else {
                    height = this.$el.offsetHeight;
                }
                if (height !== 0) {
                    this.height = height;
                    this.addonStyle.height = height + 'px';
                }
            }

            if (width !== 0 || height !== 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.$children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var children = _step.value;

                        children.$emit('sizeResized', { width: width, height: height });
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }

            this.$nextTick(function afterResize() {
                this._transitionToPage(this.activeIndex, '0');
            }, this);
        },
        _setTranslate: function _setTranslate(value) {
            var translateName = this.vertical ? 'translateY' : 'translateX';
            this[translateName] = value;
        },
        _getTranslate: function _getTranslate() {
            var translateName = this.vertical ? 'translateY' : 'translateX';
            return this[translateName];
        },
        _getTranslateOfPage: function _getTranslateOfPage() {
            var translateName = this.vertical ? 'height' : 'width';
            return this[translateName];
        }
    }

});

function throttle(fn, delay) {
    var timer = null;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"swiper",class:{vertical: _vm.vertical},on:{"touchstart":_vm.onTouchstart,"mousedown":_vm.onTouchstart,"touchcancel":_vm.onTouchcancel}},[_c('div',{staticClass:"swiper-track",style:({
         'transform' : 'translate3d(' + _vm.translateX + 'px,' + _vm.translateY + 'px, 0)',
         'transition-duration': _vm.transitionDuration + 'ms'
     }),on:{"transitionend":_vm.onTransitionend}},[(_vm.loop && _vm.addonBefore2)?_c('div',{staticClass:"swiper-item b2",style:(_vm.addonStyle),domProps:{"innerHTML":_vm._s(_vm.addonBefore2)}}):_vm._e(),_vm._v(" "),(_vm.loop && _vm.addonBefore)?_c('div',{staticClass:"swiper-item b1",style:(_vm.addonStyle),domProps:{"innerHTML":_vm._s(_vm.addonBefore)}}):_vm._e(),_vm._v(" "),_vm._t("default"),_vm._v(" "),(_vm.loop && _vm.addonAfter)?_c('div',{staticClass:"swiper-item a1",style:(_vm.addonStyle),domProps:{"innerHTML":_vm._s(_vm.addonAfter)}}):_vm._e(),_vm._v(" "),(_vm.loop && _vm.addonAfter2)?_c('div',{staticClass:"swiper-item a2",style:(_vm.addonStyle),domProps:{"innerHTML":_vm._s(_vm.addonAfter2)}}):_vm._e()],2),_vm._v(" "),(_vm.indicators)?_c('div',{staticClass:"swiper-indicators"},_vm._l((_vm.childrenList),function(item,index){return _c('div',{key:index,class:{'swiper-dot': true,'active': index === _vm.activeIndex},on:{"click":function($event){$event.stopPropagation();_vm._transitionToPage(index)}}})})):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_swiper_slide_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6ce59d7b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_vue_swiper_slide_vue__ = __webpack_require__(14);
function injectStyle (ssrContext) {
  __webpack_require__(11)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_swiper_slide_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6ce59d7b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_vue_swiper_slide_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("1bf9c0ec", content, true);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".swiper-item{width:1200px;box-sizing:border-box;flex-shrink:0;display:flex;height:100%}", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'vueSwiperSlide',
    created: function created() {
        var me = this;
        var width = this.$parent.width;
        var height = this.$parent.height;
        width && (this.style.width = width + 'px');
        height && (this.style.height = height + 'px');
        this.$on('sizeResized', function (_ref) {
            var width = _ref.width,
                height = _ref.height;

            width && (me.style.width = width + 'px');
            height && (me.style.height = height + 'px');
        });
    },
    data: function data() {
        return {
            style: {
                width: 100 + '%',
                height: 'auto'
            }
        };
    },
    updated: function updated(val, oldval) {
        this.$parent.$emit('childUpdate');
    }
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"swiper-item",style:(_vm.style)},[_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
/******/ ]);
});