import{r as e,K as t,b as s,O as r,R as l,F as n,S as a}from"./index.43ee1ebf.js";import{H as o}from"./index.5355e585.js";import{S as c}from"./index.9f2d7f67.js";import"./LeftOutline.81613f0c.js";function i(t){return e.exports.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},t,{style:Object.assign({verticalAlign:"-0.125em"},t.style),className:["antd-mobile-icon",t.className].filter(Boolean).join(" ")}),e.exports.createElement("title",null,"33A15659-CFDC-4686-8D0F-7D06C2598A9B@2x"),e.exports.createElement("g",{id:"AddOutline-AddOutline",stroke:"none",strokeWidth:1,fill:"none",fillRule:"evenodd"},e.exports.createElement("g",{id:"AddOutline-add"},e.exports.createElement("rect",{id:"AddOutline-矩形",fill:"#FFFFFF",opacity:0,x:0,y:0,width:48,height:48}),e.exports.createElement("path",{d:"M25.1,6.5 C25.3209139,6.5 25.5,6.6790861 25.5,6.9 L25.5,22.5 L41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L25.5,25.5 L25.5,41.1 C25.5,41.3209139 25.3209139,41.5 25.1,41.5 L22.9,41.5 C22.6790861,41.5 22.5,41.3209139 22.5,41.1 L22.5,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L22.5,22.5 L22.5,6.9 C22.5,6.6790861 22.6790861,6.5 22.9,6.5 L25.1,6.5 Z",id:"AddOutline-路径",fill:"currentColor",fillRule:"nonzero"}))))}var p=e.exports.memo((function(){const p=t(),m=s(),[d,u]=e.exports.useState(!0),[x,f]=e.exports.useState({}),[y,E]=e.exports.useState([]),g=e.exports.useRef(),h=e.exports.useRef(),C=e.exports.useRef(),v=e.exports.useRef(),L=e.exports.useRef(),w=e.exports.useRef(),N=e.exports.useRef(0);e.exports.useEffect((()=>((async()=>{const e=await r(p.id);f(e.artist),E(e.hotSongs)})(),()=>{f({}),E([])})),[p.id]),e.exports.useEffect((()=>{g.current.style.background=`url(${x.picUrl}) no-repeat 0 0% / cover`}),[x]);e.exports.useEffect((()=>{const e=g.current.offsetHeight;N.current=e,C.current.style.top=e-5+"px",w.current.style.top=e-5+"px",v.current.refresh()}),[]);const O=e.exports.useCallback((e=>{const t=N.current,s=e.y,r=g.current,l=h.current,n=L.current,a=w.current,o=45-(t-5),c=Math.abs(s/t);s>0?(r.style.transform=`scale(${1+c})`,l.style.transform=`translate3d(0, ${s}px, 0)`,a.style.top=`${t-5+s}px`):s>=o?(a.style.top=t-5-Math.abs(s)+"px",a.style.zIndex=1,r.style.paddingTop="75%",r.style.height=0,r.style.zIndex=-1,l.style.transform=`translate3d(0, ${s}px, 0)`,l.style.opacity=""+(1-2*c)):s<o&&(a.style.top="40px",a.style.zIndex=1,n.style.zIndex=100,r.style.height="45px",r.style.paddingTop=0,r.style.zIndex=99)}),[]);return l.createElement(n,{in:d,timeout:250,classNames:"fly",appear:!0,unmountOnExit:!0,onExited:()=>m(-1)},l.createElement("div",{className:"Container"},l.createElement(o,{ref:L,title:"歌手",isMarquee:!1,onClose:()=>u(!1)}),l.createElement("div",{className:"ImgWrapper",ref:g},l.createElement("div",{className:"filter"})),l.createElement("div",{className:"CollectButton",ref:h},l.createElement("div",{className:"iconfont"},l.createElement(i,null)),l.createElement("span",{className:"text"},"收藏")),l.createElement("div",{className:"BgLayer",ref:w}),l.createElement("div",{className:"SongListWrapper",ref:C},l.createElement(a,{ref:v,onScroll:O},l.createElement("div",null,l.createElement(c,{songs:y,showCollect:!1}))))))}));export{p as default};
//# sourceMappingURL=index.9456db26.js.map