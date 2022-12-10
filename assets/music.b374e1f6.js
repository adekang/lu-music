import{r as e}from"./index.43ee1ebf.js";var t={exports:{}};function o(){}function n(){}n.resetWarningCache=o;t.exports=function(){function e(e,t,o,n,r,i){if("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"!==i){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:n,resetWarningCache:o};return r.PropTypes=r,r}();var r={},i={};Object.defineProperty(i,"__esModule",{value:!0}),i.on=function(e,t,o,n){n=n||!1,e.addEventListener?e.addEventListener(t,o,n):e.attachEvent&&e.attachEvent("on"+t,(function(t){o.call(e,t||window.event)}))},i.off=function(e,t,o,n){n=n||!1,e.removeEventListener?e.removeEventListener(t,o,n):e.detachEvent&&e.detachEvent("on"+t,o)};var a={};Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e){if(!(e instanceof HTMLElement))return document.documentElement;for(var t="absolute"===e.style.position,o=/(scroll|auto)/,n=e;n;){if(!n.parentNode)return e.ownerDocument||document.documentElement;var r=window.getComputedStyle(n),i=r.position,a=r.overflow,l=r["overflow-x"],u=r["overflow-y"];if("static"===i&&t)n=n.parentNode;else{if(o.test(a)&&o.test(l)&&o.test(u))return n;n=n.parentNode}}return e.ownerDocument||e.documentElement||document.documentElement};var l={};Object.defineProperty(l,"__esModule",{value:!0}),l.default=function(e,t,o){var n=void 0,r=void 0,i=void 0,a=void 0,l=void 0,u=function u(){var f=+new Date-a;f<t&&f>=0?n=setTimeout(u,t-f):(n=null,o||(l=e.apply(i,r),n||(i=null,r=null)))};return function(){i=this,r=arguments,a=+new Date;var f=o&&!n;return n||(n=setTimeout(u,t)),f&&(l=e.apply(i,r),i=null,r=null),l}};var u={};Object.defineProperty(u,"__esModule",{value:!0}),u.default=function(e,t,o){var n,r;return t||(t=250),function(){var i=o||this,a=+new Date,l=arguments;n&&a<n+t?(clearTimeout(r),r=setTimeout((function(){n=a,e.apply(i,l)}),t)):(n=a,e.apply(i,l))}},Object.defineProperty(r,"__esModule",{value:!0}),r.forceVisible=r.forceCheck=r.lazyload=void 0;var f=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),s=e.exports,c=y(s),d=y(t.exports),p=i,v=y(a),h=y(l),m=y(u);function y(e){return e&&e.__esModule?e:{default:e}}function b(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function w(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function g(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var E=0,_=0,O=0,T=0,P="data-lazyload-listened",j=[],C=[],x=!1;try{var N=Object.defineProperty({},"passive",{get:function(){x=!0}});window.addEventListener("test",null,N)}catch(W){}var R=!!x&&{capture:!1,passive:!0},k=function(e){var t=e.ref;if(t instanceof HTMLElement){var o=(0,v.default)(t),n=e.props.overflow&&o!==t.ownerDocument&&o!==document&&o!==document.documentElement?function(e,t){var o=e.ref,n=void 0,r=void 0,i=void 0,a=void 0;try{var l=t.getBoundingClientRect();n=l.top,r=l.left,i=l.height,a=l.width}catch(W){n=E,r=_,i=T,a=O}var u=window.innerHeight||document.documentElement.clientHeight,f=window.innerWidth||document.documentElement.clientWidth,s=Math.max(n,0),c=Math.max(r,0),d=Math.min(u,n+i)-s,p=Math.min(f,r+a)-c,v=void 0,h=void 0,m=void 0,y=void 0;try{var b=o.getBoundingClientRect();v=b.top,h=b.left,m=b.height,y=b.width}catch(W){v=E,h=_,m=T,y=O}var w=v-s,g=h-c,P=Array.isArray(e.props.offset)?e.props.offset:[e.props.offset,e.props.offset];return w-P[0]<=d&&w+m+P[1]>=0&&g-P[0]<=p&&g+y+P[1]>=0}(e,o):function(e){var t=e.ref;if(!(t.offsetWidth||t.offsetHeight||t.getClientRects().length))return!1;var o=void 0,n=void 0;try{var r=t.getBoundingClientRect();o=r.top,n=r.height}catch(W){o=E,n=T}var i=window.innerHeight||document.documentElement.clientHeight,a=Array.isArray(e.props.offset)?e.props.offset:[e.props.offset,e.props.offset];return o-a[0]<=i&&o+n+a[1]>=0}(e);n?e.visible||(e.props.once&&C.push(e),e.visible=!0,e.forceUpdate()):e.props.once&&e.visible||(e.visible=!1,e.props.unmountIfInvisible&&e.forceUpdate())}},L=function(){C.forEach((function(e){var t=j.indexOf(e);-1!==t&&j.splice(t,1)})),C=[]},M=function(){for(var e=0;e<j.length;++e){var t=j[e];k(t)}L()},A=void 0,z=null,I=function(e){function t(e){b(this,t);var o=w(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.visible=!1,o.setRef=o.setRef.bind(o),o}return g(t,s.Component),f(t,[{key:"componentDidMount",value:function(){var e=window,t=this.props.scrollContainer;t&&"string"==typeof t&&(e=e.document.querySelector(t));var o=void 0!==this.props.debounce&&"throttle"===A||"debounce"===A&&void 0===this.props.debounce;if(o&&((0,p.off)(e,"scroll",z,R),(0,p.off)(window,"resize",z,R),z=null),z||(void 0!==this.props.debounce?(z=(0,h.default)(M,"number"==typeof this.props.debounce?this.props.debounce:300),A="debounce"):void 0!==this.props.throttle?(z=(0,m.default)(M,"number"==typeof this.props.throttle?this.props.throttle:300),A="throttle"):z=M),this.props.overflow){var n=(0,v.default)(this.ref);if(n&&"function"==typeof n.getAttribute){var r=+n.getAttribute(P)+1;1===r&&n.addEventListener("scroll",z,R),n.setAttribute(P,r)}}else if(0===j.length||o){var i=this.props,a=i.scroll,l=i.resize;a&&(0,p.on)(e,"scroll",z,R),l&&(0,p.on)(window,"resize",z,R)}j.push(this),k(this)}},{key:"shouldComponentUpdate",value:function(){return this.visible}},{key:"componentWillUnmount",value:function(){if(this.props.overflow){var e=(0,v.default)(this.ref);if(e&&"function"==typeof e.getAttribute){var t=+e.getAttribute(P)-1;0===t?(e.removeEventListener("scroll",z,R),e.removeAttribute(P)):e.setAttribute(P,t)}}var o=j.indexOf(this);-1!==o&&j.splice(o,1),0===j.length&&"undefined"!=typeof window&&((0,p.off)(window,"resize",z,R),(0,p.off)(window,"scroll",z,R))}},{key:"setRef",value:function(e){e&&(this.ref=e)}},{key:"render",value:function(){var e=this.props,t=e.height,o=e.children,n=e.placeholder,r=e.className,i=e.classNamePrefix,a=e.style;return c.default.createElement("div",{className:i+"-wrapper "+r,ref:this.setRef,style:a},this.visible?o:n||c.default.createElement("div",{style:{height:t},className:i+"-placeholder"}))}}]),t}();I.propTypes={className:d.default.string,classNamePrefix:d.default.string,once:d.default.bool,height:d.default.oneOfType([d.default.number,d.default.string]),offset:d.default.oneOfType([d.default.number,d.default.arrayOf(d.default.number)]),overflow:d.default.bool,resize:d.default.bool,scroll:d.default.bool,children:d.default.node,throttle:d.default.oneOfType([d.default.number,d.default.bool]),debounce:d.default.oneOfType([d.default.number,d.default.bool]),placeholder:d.default.node,scrollContainer:d.default.oneOfType([d.default.string,d.default.object]),unmountIfInvisible:d.default.bool,style:d.default.object},I.defaultProps={className:"",classNamePrefix:"lazyload",once:!1,offset:0,overflow:!1,resize:!1,scroll:!0,unmountIfInvisible:!1};var D=function(e){return e.displayName||e.name||"Component"};r.lazyload=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(t){return function(o){function n(){b(this,n);var e=w(this,(n.__proto__||Object.getPrototypeOf(n)).call(this));return e.displayName="LazyLoad"+D(t),e}return g(n,s.Component),f(n,[{key:"render",value:function(){return c.default.createElement(I,e,c.default.createElement(t,this.props))}}]),n}()}};var H=r.default=I,S=r.forceCheck=M;r.forceVisible=function(){for(var e=0;e<j.length;++e){var t=j[e];t.visible=!0,t.forceUpdate()}L()};var U="/lu-music/assets/music.13970103.png";export{H as _,S as f,U as m};
//# sourceMappingURL=music.b374e1f6.js.map