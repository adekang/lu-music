import{n as e,f as a,b as t,B as l,r as s,C as n,R as c,S as r}from"./index.43ee1ebf.js";import{L as i}from"./index.0a9bf4c3.js";const m=function(){const{loading:m,rankList:d}=e((e=>e.rank)),o=a(),p=t(),u=l(d),E=d.slice(0,u),f=d.slice(u);s.exports.useEffect((()=>{d.length||o(n())}),[]);const y=(e,a)=>c.createElement("ul",{className:"RankList",style:a?{display:"flex"}:{display:""}},e.map((e=>c.createElement("li",{style:e.tracks.length?{display:"flex"}:{display:""},className:"RankListItem",key:e.updateTime,onClick:()=>{return a=e.id,void p(`./${a}`);var a}},c.createElement("div",{className:"img_wrapper",style:e.tracks.length?{width:"27vw",height:"27vw"}:{width:"32vw",height:"32vw"}},c.createElement("img",{src:e.coverImgUrl,alt:""}),c.createElement("div",{className:"decorate"}),c.createElement("span",{className:"update_frequecy"},e.updateFrequency)),(e=>e.length?c.createElement("ul",{className:"RankSongList"},e.map(((e,a)=>c.createElement("li",{key:a},a+1,". ",e.first," - ",e.second)))):null)(e.tracks))))),g=m?{display:"none"}:{display:""};return c.createElement(c.Fragment,null,c.createElement("div",{className:"RankContainer"},c.createElement(r,null,c.createElement("div",null,c.createElement("h1",{className:"offical",style:g},"官方榜"),y(E),c.createElement("h1",{className:"global",style:g},"全球榜"),y(f,!0),m?c.createElement(i,null):null))))};export{m as default};
//# sourceMappingURL=index.77a63020.js.map