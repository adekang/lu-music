!function(){function e(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,i,o=[],l=!0,a=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(s){a=!0,i=s}finally{try{l||null==n.return||n.return()}finally{if(a)throw i}}return o}(e,n)||function(e,n){if(!e)return;if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return t(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var n=document.createElement("style");n.innerHTML=".singers-module_NavContainer_aOR18{width:100%;height:100%;overflow:hidden}.singers-module_Container_gFFFM{position:fixed;top:42.666667vw;left:0;bottom:0;overflow:hidden;width:100%}.singers-module_ListWrapper_AmQLp{display:flex;margin:auto;flex-direction:column;overflow:hidden}.singers-module_ListWrapper_AmQLp>.singers-module_ListItem_Xv5k5{box-sizing:border-box;display:flex;flex-direction:row;margin:0 2.133333vw;padding:1.333333vw 0;align-items:center;border-bottom:1px solid #e4e4e4}.singers-module_ListWrapper_AmQLp>.singers-module_ListItem_Xv5k5>.singers-module_ImgWrapper_qmqi4{margin-right:5.333333vw;width:13.333333vw;height:13.333333vw}.singers-module_ListWrapper_AmQLp>.singers-module_ListItem_Xv5k5>span{font-weight:500}.ListItem{display:flex;align-items:center;height:8vw;overflow:hidden}.ListItem>span{flex:0 0 auto;font-size:4.8vw;padding:1.333333vw 2.133333vw;border-radius:2.666667vw}.ListItem>span:first-of-type{display:block;flex:0 0 auto;padding:1.333333vw 0;margin-right:1.333333vw;color:gray;font-size:3.733333vw;vertical-align:middle}.ListItem>span.selected{color:#c20c0c;border:1px solid #C20C0C;opacity:.8}\n",document.head.appendChild(n),System.register(["./index-legacy.3ccd7e09.js","./index-legacy.75555093.js","./index-legacy.52564aad.js"],(function(t){"use strict";var n,r,i,o,l,a,s,c,u,d,m,f,p,g,v,y,h,w;return{setters:[function(e){n=e.r,r=e.R,i=e.S,o=e.n,l=e.f,a=e.b,s=e.o,c=e.p,u=e.q,d=e.s,m=e.t,f=e.v,p=e.x,g=e.y,v=e.z,y=e.A},function(e){h=e.L},function(e){w=e.I}],execute:function(){var _="singers-module_NavContainer_aOR18",x="singers-module_Container_gFFFM",L="singers-module_ListWrapper_AmQLp",E="singers-module_ListItem_Xv5k5",b="singers-module_ImgWrapper_qmqi4",I=function(e){var t=e.list,o=void 0===t?[]:t,l=e.oldVal,a=void 0===l?"":l,s=e.title,c=void 0===s?"":s,u=e.handleClick,d=void 0===u?null:u,m=n.exports.useRef();return n.exports.useEffect((function(){var e=m.current,t=e.querySelectorAll("span"),n=0;Array.from(t).forEach((function(e){n+=e.offsetWidth})),e.style.width="".concat(n,"px")}),[]),r.createElement(i,{direction:"horizontal"},r.createElement("div",{className:"ListItem",ref:m},r.createElement("span",null,c),o.map((function(e){return r.createElement("span",{onClick:function(){d&&d(e.key)},className:"".concat(a===e.key?"selected":""),key:e.key},e.name)}))))};t("default",n.exports.memo((function(){var t=e(n.exports.useState(""),2),k=t[0],C=t[1],A=e(n.exports.useState(""),2),S=A[0],N=A[1],W=o((function(e){return e.singers})),j=W.singerList,q=W.enterLoading,z=W.pullDownLoading,F=W.pullUpLoading,Q=W.pageCount,M=l(),O=a();n.exports.useEffect((function(){M(s(!0)),M(c(k,S))}),[S,k]),n.exports.useEffect((function(){M(u(0)),M(s(!0)),M(d())}),[]);var R=function(e,t,n){M(n?v():y(e,t))};return r.createElement("div",null,r.createElement("div",{className:_},r.createElement(I,{list:m,title:"分类(默认热门):",oldVal:k,handleClick:function(e){C(e)}}),r.createElement(I,{list:f,oldVal:S,title:"首字母:",handleClick:function(e){N(e)}})),r.createElement("div",{className:x},r.createElement(i,{bounceTop:!0,pullUp:function(){M(u(Q+30)),M(p(!0)),R(k,S,""===k&&""===S)},pullDown:function(){M(u(0)),M(g(!0)),M(""===k&&""===S?d():c(k,S))}},r.createElement("div",{className:L},j.length?j.map((function(e,t){return r.createElement("div",{key:e.accountId+""+t,onClick:function(){return O("/singers/".concat(e.id))},className:E},r.createElement("div",{className:b},r.createElement(w,{src:"".concat(e.picUrl,"?param=300x300"),width:"100%",height:"100%",lazy:!0})),r.createElement("span",null,e.name))})):null))),q||z||F?r.createElement(h,null):null)})))}}}))}();
//# sourceMappingURL=index-legacy.661500ee.js.map
