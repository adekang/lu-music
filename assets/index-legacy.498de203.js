!function(){function e(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,i,a=[],o=!0,l=!1;try{for(r=r.call(e);!(o=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);o=!0);}catch(c){l=!0,i=c}finally{try{o||null==r.return||r.return()}finally{if(l)throw i}}return a}(e,r)||function(e,r){if(!e)return;if("string"==typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return t(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var r=document.createElement("style");r.innerHTML='.Container{position:fixed;top:0;left:0;right:0;bottom:0;width:100%;z-index:100;overflow:hidden;background:#f2f3f4;transform-origin:right bottom}.Container.fly-enter,.Container.fly-appear{transform:translate3d(100%,0,0)}.Container.fly-enter-active,.Container.fly-appear-active{transition:all .3s;transform:translateZ(0)}.Container.fly-exit{transform:translateZ(0)}.Container.fly-exit-active{transition:all .3s;transform:translate3d(100%,0,0)}.ShortcutWrapper{position:absolute;top:10.666667vw;bottom:0;width:100%}.HotKey{margin:0 5.333333vw 5.333333vw}.HotKey .title{padding-top:9.333333vw;margin-bottom:5.333333vw;font-size:4.8vw;color:#bba8a8}.HotKey .item{display:inline-block;padding:1.333333vw 2.666667vw;margin:0 5.333333vw 2.666667vw 0;border-radius:1.6vw;background:#fff;font-size:4.8vw;color:#2e3030}.SearchHistory{position:relative;margin:0 5.333333vw}.SearchHistory .title{display:flex;align-items:center;height:10.666667vw;font-size:4.8vw;color:#bba8a8}.SearchHistory .title .text{flex:1}.SearchHistory .title .clear{position:relative}.SearchHistory .title .clear:before{content:"";position:absolute;top:-2.666667vw;bottom:-2.666667vw;left:-2.666667vw;right:-2.666667vw}.SearchHistory .title .icon-clear{font-size:4.8vw;color:#2e3030}.SearchHistory .history_item{display:flex;align-items:center;height:10.666667vw;overflow:hidden;color:#bba8a8;border-bottom:1px solid #e4e4e4}.SearchHistory .history_item .text{flex:1;font-size:3.733333vw;color:#2e3030}.SearchHistory .history_item .icon{position:relative;font-size:3.733333vw}.SearchHistory .history_item .icon:before{content:"";position:absolute;top:-2.666667vw;bottom:-2.666667vw;left:-2.666667vw;right:-2.666667vw}.SearchHistory .history_item .icon .icon_delete{color:#2e3030}.SearchSongItem>li{display:flex;height:16vw;align-items:center}.SearchSongItem>li .index{flex-basis:16vw;width:16vw;height:16vw;line-height:16vw;text-align:center}.SearchSongItem>li .info{box-sizing:border-box;flex:1;display:flex;height:100%;padding:1.333333vw 0;margin-right:2.133333vw;flex-direction:column;justify-content:space-around;border-bottom:1px solid #e4e4e4}.SearchSongItem>li .info>span{display:-webkit-box;overflow:hidden;-webkit-line-clamp:1;-webkit-box-orient:vertical}.SearchSongItem>li>span{display:-webkit-box;overflow:hidden;-webkit-line-clamp:1;-webkit-box-orient:vertical}.SearchSongItem>li>span:first-child{color:#2e3030}.SearchSongItem>li>span:last-child{font-size:4.8vw;color:#bba8a8}.SearchList{display:flex;margin:auto;flex-direction:column;overflow:hidden}.SearchList .title{margin:2.666667vw 0 2.666667vw 2.666667vw;color:#2e3030;font-size:3.733333vw}.SearchListItem{min-height:13.333333vw;display:flex;flex-direction:row;align-items:center;margin:0 1.333333vw;padding:1.333333vw 0;border-bottom:1px solid #e4e4e4}.SearchListItem .img_wrapper{margin-right:20px;width:50px;height:50px}.SearchListItem .img_wrapper img{border-radius:3px}.SearchListItem .name{color:#2e3030;font-size:4.8vw;font-weight:500}.SearchBoxWrapper{display:flex;align-items:center;box-sizing:border-box;width:100%;padding:0 5.333333vw 0 1.6vw;height:12vw;background:#C20C0C}.SearchBoxWrapper .icon-back{font-size:6.4vw;color:#f1f1f1}.SearchBoxWrapper .box{flex:1;margin:0 1.333333vw;line-height:4.8vw;background:#C20C0C;color:#fff;font-size:4.8vw;outline:none;border:none}.SearchBoxWrapper .box::-moz-placeholder{color:#f1f1f1}.SearchBoxWrapper .box:-ms-input-placeholder{color:#f1f1f1}.SearchBoxWrapper .box::placeholder{color:#f1f1f1}.SearchBoxWrapper .icon-delete{font-size:4.266667vw;color:#f2f3f4}\n',document.head.appendChild(r),System.register(["./index-legacy.3ccd7e09.js","./index-legacy.75555093.js","./music-legacy.7df90039.js","./LeftOutline-legacy.13214667.js"],(function(t){"use strict";var r,n,i,a,o,l,c,s,m,f,u,d,p,h,v,g,w,y;return{setters:[function(e){r=e.R,n=e.r,i=e.D,a=e.n,o=e.f,l=e.b,c=e.E,s=e.F,m=e.S,f=e.G,u=e.H,d=e.I,p=e.J},function(e){h=e.L},function(e){v=e.f,g=e._,w=e.m},function(e){y=e.L}],execute:function(){var b=r.memo((function(t){var a=n.exports.useRef(),o=e(n.exports.useState(""),2),l=o[0],c=o[1],s=t.newQuery,m=t.handleQuery,f=l?{display:"block"}:{display:"none"};n.exports.useEffect((function(){a.current.focus()}),[]);var u=n.exports.useMemo((function(){return i(m,500)}),[m]);n.exports.useEffect((function(){u(l)}),[l]),n.exports.useEffect((function(){s!==l&&c(s)}),[s]);return r.createElement("div",{className:"SearchBoxWrapper"},r.createElement("div",{className:"icon-back",onClick:function(){return t.back()}},r.createElement(y,null)),r.createElement("input",{ref:a,className:"box",placeholder:"搜索歌曲、歌手、专辑",value:l,onChange:function(e){c(e.currentTarget.value)}}),r.createElement("i",{className:"iconfont icon-delete",onClick:function(){c(""),a.current.focus()},style:f},""))}));t("default",n.exports.memo((function(){var t=a((function(e){return e.search})),i=t.hotList,y=t.suggestList,x=t.enterLoading,S=t.songsList,E=o(),k=l(),N=e(n.exports.useState(!1),2),C=N[0],I=N[1],L=e(n.exports.useState(""),2),H=L[0],z=L[1];n.exports.useEffect((function(){I(!0),i.length||E(c())}),[]);var _,W=n.exports.useCallback((function(){I(!1)}),[]);return r.createElement(s,{in:C,timeout:300,appear:!0,classNames:"fly",unmountOnExit:!0,onExited:function(){return k(-1)}},r.createElement("div",{className:"Container"},r.createElement("div",{className:"search_box_wrapper"},r.createElement(b,{back:W,newQuery:H,handleQuery:function(e){z(e),e&&(E(u(!0)),E(d(e)))}})),r.createElement("div",{className:"ShortcutWrapper",style:{display:"".concat(H?"none":"")}},r.createElement(m,null,r.createElement("div",null,r.createElement("div",{className:"HotKey"},r.createElement("h1",{className:"title"},"热门搜索"),(_=i||[],r.createElement("ul",null,_.map((function(e){return r.createElement("li",{className:"item",key:e.first,onClick:function(){return z(e.first)}},r.createElement("span",null,e.first))})))))))),r.createElement("div",{className:"ShortcutWrapper",style:{display:"".concat(H?"":"none")}},r.createElement(m,{onScroll:v},r.createElement("div",null,function(){var e=y.artists;if(e&&e.length)return r.createElement("div",{className:"SearchList"},r.createElement("h1",{className:"title"},"相关歌手"),e.map((function(e,t){return r.createElement("div",{className:"SearchListItem",key:e.accountId+""+t,onClick:function(){return k("/singers/".concat(e.id))}},r.createElement("div",{className:"img_wrapper"},r.createElement(g,{placeholder:r.createElement("img",{width:"100%",height:"100%",src:"/lu-music/assets/singer.a215b051.png",alt:"singer"})},r.createElement("img",{src:e.picUrl,width:"100%",height:"100%",alt:"music"}))),r.createElement("span",{className:"name"},"歌手: ",e.name))})))}(),function(){var e=y.playlists;if(e&&e.length)return r.createElement("div",{className:"SearchList"},r.createElement("h1",{className:"title"},"相关歌单"),e.map((function(e,t){return r.createElement("div",{className:"SearchListItem",key:e.accountId+""+t,onClick:function(){return k("/album/".concat(e.id))}},r.createElement("div",{className:"img_wrapper"},r.createElement(g,{placeholder:r.createElement("img",{width:"100%",height:"100%",src:w,alt:"music"})},r.createElement("img",{src:e.coverImgUrl,width:"100%",height:"100%",alt:"music"}))),r.createElement("span",{className:"name"},"歌单: ",e.name))})))}(),r.createElement("div",{className:"SearchSongItem",style:{paddingLeft:"20px"}},S.map((function(e){return r.createElement("li",{key:e.id,onClick:function(t){return r=Number(e.id),void E(p(r));var r}},r.createElement("div",{className:"info"},r.createElement("span",null,e.name),r.createElement("span",null,f(e.artists)," - ",e.album.name)))})))))),x?r.createElement(h,null):null))})))}}}))}();
//# sourceMappingURL=index-legacy.498de203.js.map