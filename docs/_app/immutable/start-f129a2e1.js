import{S as tt,i as nt,s as at,a as rt,e as C,c as ot,b as z,g as ue,t as F,d as de,f as B,h as J,j as st,o as Oe,k as it,l as lt,m as ct,n as ve,p as D,q as ft,r as ut,u as dt,v as H,w as W,x as Ae,y as Y,z as X,A as le}from"./chunks/index-6358928a.js";import{S as Qe,I as q,g as Me,f as Ee,s as K,a as $e,i as pt,P as He,b as ht,c as mt}from"./chunks/singletons-baa8f4ed.js";import{_ as ee}from"./chunks/preload-helper-9b728935.js";import{s as _t}from"./chunks/paths-e102dacb.js";function gt(n,e){return n==="/"||e==="ignore"?n:e==="never"?n.endsWith("/")?n.slice(0,-1):n:e==="always"&&!n.endsWith("/")?n+"/":n}function wt(n){return n.split("%25").map(decodeURI).join("%25")}function yt(n){for(const e in n)n[e]=decodeURIComponent(n[e]);return n}const bt=["href","pathname","search","searchParams","toString","toJSON"];function vt(n,e){const t=new URL(n);for(const i of bt){let o=t[i];Object.defineProperty(t,i,{get(){return e(),o},enumerable:!0,configurable:!0})}return Et(t),t}function Et(n){Object.defineProperty(n,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const kt="/__data.json";function St(n){return n.replace(/\/$/,"")+kt}function Rt(n){let e=5381;if(typeof n=="string"){let t=n.length;for(;t;)e=e*33^n.charCodeAt(--t)}else if(ArrayBuffer.isView(n)){const t=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let i=t.length;for(;i;)e=e*33^t[--i]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const pe=window.fetch;window.fetch=(n,e)=>{if((n instanceof Request?n.method:(e==null?void 0:e.method)||"GET")!=="GET"){const i=new URL(n instanceof Request?n.url:n.toString(),document.baseURI).href;ne.delete(i)}return pe(n,e)};const ne=new Map;function It(n,e){const t=xe(n,e),i=document.querySelector(t);if(i!=null&&i.textContent){const{body:o,...f}=JSON.parse(i.textContent),a=i.getAttribute("data-ttl");return a&&ne.set(t,{body:o,init:f,ttl:1e3*Number(a)}),Promise.resolve(new Response(o,f))}return pe(n,e)}function Ot(n,e,t){if(ne.size>0){const i=xe(n,t),o=ne.get(i);if(o){if(performance.now()<o.ttl)return new Response(o.body,o.init);ne.delete(i)}}return pe(e,t)}function xe(n,e){let i=`script[data-sveltekit-fetched][data-url=${JSON.stringify(n instanceof Request?n.url:n)}]`;return(e==null?void 0:e.body)&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&(i+=`[data-hash="${Rt(e.body)}"]`),i}const $t=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function jt(n){const e=[];return{pattern:n==="/"?/^\/$/:new RegExp(`^${Pt(n).map(i=>{const o=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(i);if(o)return e.push({name:o[1],matcher:o[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const f=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(i);if(f)return e.push({name:f[1],matcher:f[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!i)return;const a=i.split(/\[(.+?)\](?!\])/);return"/"+a.map((m,_)=>{if(_%2){if(m.startsWith("x+"))return ke(String.fromCharCode(parseInt(m.slice(2),16)));if(m.startsWith("u+"))return ke(String.fromCharCode(...m.slice(2).split("-").map(V=>parseInt(V,16))));const w=$t.exec(m);if(!w)throw new Error(`Invalid param: ${m}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,E,S,U,L]=w;return e.push({name:U,matcher:L,optional:!!E,rest:!!S,chained:S?_===1&&a[0]==="":!1}),S?"(.*?)":E?"([^/]*)?":"([^/]+?)"}return ke(m)}).join("")}).join("")}/?$`),params:e}}function Lt(n){return!/^\([^)]+\)$/.test(n)}function Pt(n){return n.slice(1).split("/").filter(Lt)}function At(n,e,t){const i={},o=n.slice(1);let f="";for(let a=0;a<e.length;a+=1){const u=e[a];let m=o[a];if(u.chained&&u.rest&&f&&(m=m?f+"/"+m:f),f="",m===void 0)u.rest&&(i[u.name]="");else{if(u.matcher&&!t[u.matcher](m)){if(u.optional&&u.chained){let _=o.indexOf(void 0,a);if(_===-1){const w=e[a+1];if((w==null?void 0:w.rest)&&w.chained)f=m;else return}for(;_>=a;)o[_]=o[_-1],_-=1;continue}return}i[u.name]=m}}if(!f)return i}function ke(n){return n.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function Nt(n,e,t,i){const o=new Set(e);return Object.entries(t).map(([u,[m,_,w]])=>{const{pattern:E,params:S}=jt(u),U={id:u,exec:L=>{const V=E.exec(L);if(V)return At(V,S,i)},errors:[1,...w||[]].map(L=>n[L]),layouts:[0,..._||[]].map(a),leaf:f(m)};return U.errors.length=U.layouts.length=Math.max(U.errors.length,U.layouts.length),U});function f(u){const m=u<0;return m&&(u=~u),[m,n[u]]}function a(u){return u===void 0?u:[o.has(u),n[u]]}}function Ut(n){let e,t,i;var o=n[0][0];function f(a){return{props:{data:a[2],form:a[1]}}}return o&&(e=H(o,f(n))),{c(){e&&W(e.$$.fragment),t=C()},l(a){e&&Ae(e.$$.fragment,a),t=C()},m(a,u){e&&Y(e,a,u),z(a,t,u),i=!0},p(a,u){const m={};if(u&4&&(m.data=a[2]),u&2&&(m.form=a[1]),o!==(o=a[0][0])){if(e){ue();const _=e;F(_.$$.fragment,1,0,()=>{X(_,1)}),de()}o?(e=H(o,f(a)),W(e.$$.fragment),B(e.$$.fragment,1),Y(e,t.parentNode,t)):e=null}else o&&e.$set(m)},i(a){i||(e&&B(e.$$.fragment,a),i=!0)},o(a){e&&F(e.$$.fragment,a),i=!1},d(a){a&&J(t),e&&X(e,a)}}}function Tt(n){let e,t,i;var o=n[0][0];function f(a){return{props:{data:a[2],$$slots:{default:[Dt]},$$scope:{ctx:a}}}}return o&&(e=H(o,f(n))),{c(){e&&W(e.$$.fragment),t=C()},l(a){e&&Ae(e.$$.fragment,a),t=C()},m(a,u){e&&Y(e,a,u),z(a,t,u),i=!0},p(a,u){const m={};if(u&4&&(m.data=a[2]),u&523&&(m.$$scope={dirty:u,ctx:a}),o!==(o=a[0][0])){if(e){ue();const _=e;F(_.$$.fragment,1,0,()=>{X(_,1)}),de()}o?(e=H(o,f(a)),W(e.$$.fragment),B(e.$$.fragment,1),Y(e,t.parentNode,t)):e=null}else o&&e.$set(m)},i(a){i||(e&&B(e.$$.fragment,a),i=!0)},o(a){e&&F(e.$$.fragment,a),i=!1},d(a){a&&J(t),e&&X(e,a)}}}function Dt(n){let e,t,i;var o=n[0][1];function f(a){return{props:{data:a[3],form:a[1]}}}return o&&(e=H(o,f(n))),{c(){e&&W(e.$$.fragment),t=C()},l(a){e&&Ae(e.$$.fragment,a),t=C()},m(a,u){e&&Y(e,a,u),z(a,t,u),i=!0},p(a,u){const m={};if(u&8&&(m.data=a[3]),u&2&&(m.form=a[1]),o!==(o=a[0][1])){if(e){ue();const _=e;F(_.$$.fragment,1,0,()=>{X(_,1)}),de()}o?(e=H(o,f(a)),W(e.$$.fragment),B(e.$$.fragment,1),Y(e,t.parentNode,t)):e=null}else o&&e.$set(m)},i(a){i||(e&&B(e.$$.fragment,a),i=!0)},o(a){e&&F(e.$$.fragment,a),i=!1},d(a){a&&J(t),e&&X(e,a)}}}function We(n){let e,t=n[5]&&Ye(n);return{c(){e=it("div"),t&&t.c(),this.h()},l(i){e=lt(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var o=ct(e);t&&t.l(o),o.forEach(J),this.h()},h(){ve(e,"id","svelte-announcer"),ve(e,"aria-live","assertive"),ve(e,"aria-atomic","true"),D(e,"position","absolute"),D(e,"left","0"),D(e,"top","0"),D(e,"clip","rect(0 0 0 0)"),D(e,"clip-path","inset(50%)"),D(e,"overflow","hidden"),D(e,"white-space","nowrap"),D(e,"width","1px"),D(e,"height","1px")},m(i,o){z(i,e,o),t&&t.m(e,null)},p(i,o){i[5]?t?t.p(i,o):(t=Ye(i),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},d(i){i&&J(e),t&&t.d()}}}function Ye(n){let e;return{c(){e=ft(n[6])},l(t){e=ut(t,n[6])},m(t,i){z(t,e,i)},p(t,i){i&64&&dt(e,t[6])},d(t){t&&J(e)}}}function qt(n){let e,t,i,o,f;const a=[Tt,Ut],u=[];function m(w,E){return w[0][1]?0:1}e=m(n),t=u[e]=a[e](n);let _=n[4]&&We(n);return{c(){t.c(),i=rt(),_&&_.c(),o=C()},l(w){t.l(w),i=ot(w),_&&_.l(w),o=C()},m(w,E){u[e].m(w,E),z(w,i,E),_&&_.m(w,E),z(w,o,E),f=!0},p(w,[E]){let S=e;e=m(w),e===S?u[e].p(w,E):(ue(),F(u[S],1,1,()=>{u[S]=null}),de(),t=u[e],t?t.p(w,E):(t=u[e]=a[e](w),t.c()),B(t,1),t.m(i.parentNode,i)),w[4]?_?_.p(w,E):(_=We(w),_.c(),_.m(o.parentNode,o)):_&&(_.d(1),_=null)},i(w){f||(B(t),f=!0)},o(w){F(t),f=!1},d(w){u[e].d(w),w&&J(i),_&&_.d(w),w&&J(o)}}}function Vt(n,e,t){let{stores:i}=e,{page:o}=e,{components:f}=e,{form:a}=e,{data_0:u=null}=e,{data_1:m=null}=e;st(i.page.notify);let _=!1,w=!1,E=null;return Oe(()=>{const S=i.page.subscribe(()=>{_&&(t(5,w=!0),t(6,E=document.title||"untitled page"))});return t(4,_=!0),S}),n.$$set=S=>{"stores"in S&&t(7,i=S.stores),"page"in S&&t(8,o=S.page),"components"in S&&t(0,f=S.components),"form"in S&&t(1,a=S.form),"data_0"in S&&t(2,u=S.data_0),"data_1"in S&&t(3,m=S.data_1)},n.$$.update=()=>{n.$$.dirty&384&&i.page.set(o)},[f,a,u,m,_,w,E,i,o]}class Ct extends tt{constructor(e){super(),nt(this,e,Vt,qt,at,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const Ft={},he=[()=>ee(()=>import("./chunks/0-5459dbad.js"),["./chunks/0-5459dbad.js","./chunks/_layout-df126b6f.js","./components/pages/_layout.svelte-4a4de9a9.js","./chunks/index-6358928a.js","./assets/_layout-372f5a27.css"],import.meta.url),()=>ee(()=>import("./chunks/1-17c09a8b.js"),["./chunks/1-17c09a8b.js","./components/pages/_error.svelte-32f319a3.js","./chunks/index-6358928a.js","./chunks/singletons-baa8f4ed.js","./chunks/paths-e102dacb.js"],import.meta.url),()=>ee(()=>import("./chunks/2-ea1f2a1b.js"),["./chunks/2-ea1f2a1b.js","./components/pages/_page.svelte-1faa2fe3.js","./chunks/index-6358928a.js","./chunks/preload-helper-9b728935.js","./assets/_page-7378a989.css"],import.meta.url),()=>ee(()=>import("./chunks/3-90c430bc.js"),["./chunks/3-90c430bc.js","./components/pages/demo/elements/_page.svelte-8ccbbe0f.js","./chunks/index-6358928a.js","./assets/_page-83b17d31.css"],import.meta.url),()=>ee(()=>import("./chunks/4-2b1e76b1.js"),["./chunks/4-2b1e76b1.js","./components/pages/demo/fonts/_page.svelte-c405709e.js","./chunks/index-6358928a.js","./chunks/paths-e102dacb.js","./assets/_page-694798f8.css"],import.meta.url)],Bt=[],Jt={"/":[-3],"/demo/elements":[3],"/demo/fonts":[4]},Gt={handleError:({error:n})=>{console.error(n)}};class je{constructor(e,t){this.status=e,typeof t=="string"?this.body={message:t}:t?this.body=t:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class Xe{constructor(e,t){this.status=e,this.location=t}}async function Kt(n){var e;for(const t in n)if(typeof((e=n[t])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(n).map(async([i,o])=>[i,await o])));return n}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const zt=-1,Mt=-2,Ht=-3,Wt=-4,Yt=-5,Xt=-6;function Zt(n){if(typeof n=="number")return i(n,!0);if(!Array.isArray(n)||n.length===0)throw new Error("Invalid input");const e=n,t=Array(e.length);function i(o,f=!1){if(o===zt)return;if(o===Ht)return NaN;if(o===Wt)return 1/0;if(o===Yt)return-1/0;if(o===Xt)return-0;if(f)throw new Error("Invalid input");if(o in t)return t[o];const a=e[o];if(!a||typeof a!="object")t[o]=a;else if(Array.isArray(a))if(typeof a[0]=="string")switch(a[0]){case"Date":t[o]=new Date(a[1]);break;case"Set":const m=new Set;t[o]=m;for(let E=1;E<a.length;E+=1)m.add(i(a[E]));break;case"Map":const _=new Map;t[o]=_;for(let E=1;E<a.length;E+=2)_.set(i(a[E]),i(a[E+1]));break;case"RegExp":t[o]=new RegExp(a[1],a[2]);break;case"Object":t[o]=Object(a[1]);break;case"BigInt":t[o]=BigInt(a[1]);break;case"null":const w=Object.create(null);t[o]=w;for(let E=1;E<a.length;E+=2)w[a[E]]=i(a[E+1]);break}else{const u=new Array(a.length);t[o]=u;for(let m=0;m<a.length;m+=1){const _=a[m];_!==Mt&&(u[m]=i(_))}}else{const u={};t[o]=u;for(const m in a){const _=a[m];u[m]=i(_)}}return t[o]}return i(0)}const Se=Nt(he,Bt,Jt,Ft),Le=he[0],Pe=he[1];Le();Pe();let ae={};try{ae=JSON.parse(sessionStorage[Qe])}catch{}function Re(n){ae[n]=$e()}function Qt({target:n,base:e}){var Ge;const t=[];let i=null;const o={before_navigate:[],after_navigate:[]};let f={branch:[],error:null,url:null},a=!1,u=!1,m=!0,_=!1,w=!1,E=!1,S=!1,U,L=(Ge=history.state)==null?void 0:Ge[q];L||(L=Date.now(),history.replaceState({...history.state,[q]:L},"",location.href));const V=ae[L];V&&(history.scrollRestoration="manual",scrollTo(V.x,V.y));let G,Ne,re;async function Ue(){re=re||Promise.resolve(),await re,re=null;const r=new URL(location.href),s=we(r,!0);i=null,await De(s,r,[])}async function me(r,{noScroll:s=!1,replaceState:l=!1,keepFocus:c=!1,state:d={},invalidateAll:h=!1},p,b){return typeof r=="string"&&(r=new URL(r,Me(document))),ye({url:r,scroll:s?$e():null,keepfocus:c,redirect_chain:p,details:{state:d,replaceState:l},nav_token:b,accepted:()=>{h&&(S=!0)},blocked:()=>{},type:"goto"})}async function Te(r){const s=we(r,!1);if(!s)throw new Error(`Attempted to preload a URL that does not belong to this app: ${r}`);return i={id:s.id,promise:Ce(s).then(l=>(l.type==="loaded"&&l.state.error&&(i=null),l))},i.promise}async function oe(...r){const l=Se.filter(c=>r.some(d=>c.exec(d))).map(c=>Promise.all([...c.layouts,c.leaf].map(d=>d==null?void 0:d[1]())));await Promise.all(l)}async function De(r,s,l,c,d={},h){var b,v;Ne=d;let p=r&&await Ce(r);if(p||(p=await Je(s,{id:null},await te(new Error(`Not found: ${s.pathname}`),{url:s,params:{},route:{id:null}}),404)),s=(r==null?void 0:r.url)||s,Ne!==d)return!1;if(p.type==="redirect")if(l.length>10||l.includes(s.pathname))p=await se({status:500,error:await te(new Error("Redirect loop"),{url:s,params:{},route:{id:null}}),url:s,route:{id:null}});else return me(new URL(p.location,s).href,{},[...l,s.pathname],d),!1;else((v=(b=p.props)==null?void 0:b.page)==null?void 0:v.status)>=400&&await K.updated.check()&&await ie(s);if(t.length=0,S=!1,_=!0,c&&c.details){const{details:y}=c,k=y.replaceState?0:1;y.state[q]=L+=k,history[y.replaceState?"replaceState":"pushState"](y.state,"",s)}if(i=null,u){f=p.state,p.props.page&&(p.props.page.url=s);const y=fe();U.$set(p.props),y()}else qe(p);if(c){const{scroll:y,keepfocus:k}=c;if(k||Ie(),await le(),m){const I=s.hash&&document.getElementById(s.hash.slice(1));y?scrollTo(y.x,y.y):I?I.scrollIntoView():scrollTo(0,0)}}else await le();m=!0,p.props.page&&(G=p.props.page),h&&h(),_=!1}function qe(r){var d,h;f=r.state;const s=document.querySelector("style[data-sveltekit]");s&&s.remove(),G=r.props.page;const l=fe();U=new Ct({target:n,props:{...r.props,stores:K},hydrate:!0}),l();const c={from:null,to:ce("to",{params:f.params,route:{id:(h=(d=f.route)==null?void 0:d.id)!=null?h:null},url:new URL(location.href)}),willUnload:!1,type:"enter"};o.after_navigate.forEach(p=>p(c)),u=!0}async function Z({url:r,params:s,branch:l,status:c,error:d,route:h,form:p}){var A;const b=l.filter(Boolean);let v="never";for(const O of l)(O==null?void 0:O.slash)!==void 0&&(v=O.slash);r.pathname=gt(r.pathname,v),r.search=r.search;const y={type:"loaded",state:{url:r,params:s,branch:l,error:d,route:h},props:{components:b.map(O=>O.node.component)}};p!==void 0&&(y.props.form=p);let k={},I=!G;for(let O=0;O<b.length;O+=1){const P=b[O];k={...k,...P.data},(I||!f.branch.some(T=>T===P))&&(y.props[`data_${O}`]=k,I=I||Object.keys((A=P.data)!=null?A:{}).length>0)}if(I||(I=Object.keys(G.data).length!==Object.keys(k).length),!f.url||r.href!==f.url.href||f.error!==d||p!==void 0||I){y.props.page={error:d,params:s,route:h,status:c,url:new URL(r),form:p,data:I?k:G.data},Object.defineProperty(y.props.page,"routeId",{get(){throw new Error("$page.routeId has been replaced by $page.route.id")},enumerable:!1});const O=(P,T)=>{Object.defineProperty(y.props.page,P,{get:()=>{throw new Error(`$page.${P} has been replaced by $page.url.${T}`)}})};O("origin","origin"),O("path","pathname"),O("query","searchParams")}return y}async function _e({loader:r,parent:s,url:l,params:c,route:d,server_data_node:h}){var y,k,I,N,A,O,P;let p=null;const b={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},v=await r();if((y=v.shared)!=null&&y.load){let T=function(...g){for(const R of g){const{href:$}=new URL(R,l);b.dependencies.add($)}};const Q={route:{get id(){return b.route=!0,d.id}},params:new Proxy(c,{get:(g,R)=>(b.params.add(R),g[R])}),data:(k=h==null?void 0:h.data)!=null?k:null,url:vt(l,()=>{b.url=!0}),async fetch(g,R){let $;g instanceof Request?($=g.url,R={body:g.method==="GET"||g.method==="HEAD"?void 0:await g.blob(),cache:g.cache,credentials:g.credentials,headers:g.headers,integrity:g.integrity,keepalive:g.keepalive,method:g.method,mode:g.mode,redirect:g.redirect,referrer:g.referrer,referrerPolicy:g.referrerPolicy,signal:g.signal,...R}):$=g;const j=new URL($,l).href;return T(j),u?Ot($,j,R):It($,R)},setHeaders:()=>{},depends:T,parent(){return b.parent=!0,s()}};Object.defineProperties(Q,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},routeId:{get(){throw new Error("routeId has been replaced by route.id")},enumerable:!1}}),p=(I=await v.shared.load.call(null,Q))!=null?I:null,p=p?await Kt(p):null}return{node:v,loader:r,server:h,shared:(N=v.shared)!=null&&N.load?{type:"data",data:p,uses:b}:null,data:(A=p!=null?p:h==null?void 0:h.data)!=null?A:null,slash:(P=(O=v.shared)==null?void 0:O.trailingSlash)!=null?P:h==null?void 0:h.slash}}function Ve(r,s,l,c,d){if(S)return!0;if(!c)return!1;if(c.parent&&r||c.route&&s||c.url&&l)return!0;for(const h of c.params)if(d[h]!==f.params[h])return!0;for(const h of c.dependencies)if(t.some(p=>p(new URL(h))))return!0;return!1}function ge(r,s){var l,c;return(r==null?void 0:r.type)==="data"?{type:"data",data:r.data,uses:{dependencies:new Set((l=r.uses.dependencies)!=null?l:[]),params:new Set((c=r.uses.params)!=null?c:[]),parent:!!r.uses.parent,route:!!r.uses.route,url:!!r.uses.url},slash:r.slash}:(r==null?void 0:r.type)==="skip"&&s!=null?s:null}async function Ce({id:r,invalidating:s,url:l,params:c,route:d}){var Q;if((i==null?void 0:i.id)===r)return i.promise;const{errors:h,layouts:p,leaf:b}=d,v=[...p,b];h.forEach(g=>g==null?void 0:g().catch(()=>{})),v.forEach(g=>g==null?void 0:g[1]().catch(()=>{}));let y=null;const k=f.url?r!==f.url.pathname+f.url.search:!1,I=f.route?r!==f.route.id:!1,N=v.reduce((g,R,$)=>{var x;const j=f.branch[$],M=!!(R!=null&&R[0])&&((j==null?void 0:j.loader)!==R[1]||Ve(g.some(Boolean),I,k,(x=j.server)==null?void 0:x.uses,c));return g.push(M),g},[]);if(N.some(Boolean)){try{y=await Ze(l,N)}catch(g){return se({status:500,error:await te(g,{url:l,params:c,route:{id:d.id}}),url:l,route:d})}if(y.type==="redirect")return y}const A=y==null?void 0:y.nodes;let O=!1;const P=v.map(async(g,R)=>{var x;if(!g)return;const $=f.branch[R],j=A==null?void 0:A[R];if((!j||j.type==="skip")&&g[1]===($==null?void 0:$.loader)&&!Ve(O,I,k,(x=$.shared)==null?void 0:x.uses,c))return $;if(O=!0,(j==null?void 0:j.type)==="error")throw j;return _e({loader:g[1],url:l,params:c,route:d,parent:async()=>{var ze;const Ke={};for(let be=0;be<R;be+=1)Object.assign(Ke,(ze=await P[be])==null?void 0:ze.data);return Ke},server_data_node:ge(j===void 0&&g[0]?{type:"skip"}:j!=null?j:null,$==null?void 0:$.server)})});for(const g of P)g.catch(()=>{});const T=[];for(let g=0;g<v.length;g+=1)if(v[g])try{T.push(await P[g])}catch(R){if(R instanceof Xe)return{type:"redirect",location:R.location};let $=500,j;A!=null&&A.includes(R)?($=(Q=R.status)!=null?Q:$,j=R.error):R instanceof je?($=R.status,j=R.body):j=await te(R,{params:c,url:l,route:{id:d.id}});const M=await Fe(g,T,h);return M?await Z({url:l,params:c,branch:T.slice(0,M.idx).concat(M.node),status:$,error:j,route:d}):await Je(l,{id:d.id},j,$)}else T.push(void 0);return await Z({url:l,params:c,branch:T,status:200,error:null,route:d,form:s?void 0:null})}async function Fe(r,s,l){for(;r--;)if(l[r]){let c=r;for(;!s[c];)c-=1;try{return{idx:c+1,node:{node:await l[r](),loader:l[r],data:{},server:null,shared:null}}}catch{continue}}}async function se({status:r,error:s,url:l,route:c}){var y;const d={},h=await Le();let p=null;if(h.server)try{const k=await Ze(l,[!0]);if(k.type!=="data"||k.nodes[0]&&k.nodes[0].type!=="data")throw 0;p=(y=k.nodes[0])!=null?y:null}catch{(l.origin!==location.origin||l.pathname!==location.pathname||a)&&await ie(l)}const b=await _e({loader:Le,url:l,params:d,route:c,parent:()=>Promise.resolve({}),server_data_node:ge(p)}),v={node:await Pe(),loader:Pe,shared:null,server:null,data:null};return await Z({url:l,params:d,branch:[b,v],status:r,error:s,route:null})}function we(r,s){if(pt(r,e))return;const l=wt(r.pathname.slice(e.length)||"/");for(const c of Se){const d=c.exec(l);if(d)return{id:r.pathname+r.search,invalidating:s,route:c,params:yt(d),url:r}}}function Be({url:r,type:s,intent:l,delta:c}){var b,v,y,k,I;let d=!1;const h={from:ce("from",{params:f.params,route:{id:(v=(b=f.route)==null?void 0:b.id)!=null?v:null},url:f.url}),to:ce("to",{params:(y=l==null?void 0:l.params)!=null?y:null,route:{id:(I=(k=l==null?void 0:l.route)==null?void 0:k.id)!=null?I:null},url:r}),willUnload:!l,type:s};c!==void 0&&(h.delta=c);const p={...h,cancel:()=>{d=!0}};return w||o.before_navigate.forEach(N=>N(p)),d?null:h}async function ye({url:r,scroll:s,keepfocus:l,redirect_chain:c,details:d,type:h,delta:p,nav_token:b,accepted:v,blocked:y}){const k=we(r,!1),I=Be({url:r,type:h,delta:p,intent:k});if(!I){y();return}Re(L),v(),w=!0,u&&K.navigating.set(I),await De(k,r,c,{scroll:s,keepfocus:l,details:d},b,()=>{w=!1,o.after_navigate.forEach(N=>N(I)),K.navigating.set(null)})}async function Je(r,s,l,c){return r.origin===location.origin&&r.pathname===location.pathname&&!a?await se({status:c,error:l,url:r,route:s}):await ie(r)}function ie(r){return location.href=r.href,new Promise(()=>{})}function et(){let r;n.addEventListener("mousemove",h=>{const p=h.target;clearTimeout(r),r=setTimeout(()=>{c(p,2)},20)});function s(h){c(h.composedPath()[0],1)}n.addEventListener("mousedown",s),n.addEventListener("touchstart",s,{passive:!0});const l=new IntersectionObserver(h=>{for(const p of h)p.isIntersecting&&(oe(new URL(p.target.href).pathname),l.unobserve(p.target))},{threshold:0});function c(h,p){const{url:b,options:v,external:y}=Ee(h,e);y||(p<=v.preload_data?Te(b):p<=v.preload_code&&oe(b.pathname))}function d(){l.disconnect();for(const h of n.querySelectorAll("a")){const{url:p,external:b,options:v}=Ee(h,e);b||(v.preload_code===He.viewport&&l.observe(h),v.preload_code===He.eager&&oe(p.pathname))}}o.after_navigate.push(d),d()}return{after_navigate:r=>{Oe(()=>(o.after_navigate.push(r),()=>{const s=o.after_navigate.indexOf(r);o.after_navigate.splice(s,1)}))},before_navigate:r=>{Oe(()=>(o.before_navigate.push(r),()=>{const s=o.before_navigate.indexOf(r);o.before_navigate.splice(s,1)}))},disable_scroll_handling:()=>{(_||!u)&&(m=!1)},goto:(r,s={})=>{if("keepfocus"in s&&!("keepFocus"in s))throw new Error("`keepfocus` has been renamed to `keepFocus` (note the difference in casing)");if("noscroll"in s&&!("noScroll"in s))throw new Error("`noscroll` has been renamed to `noScroll` (note the difference in casing)");return me(r,s,[])},invalidate:r=>{if(r===void 0)throw new Error("`invalidate()` (with no arguments) has been replaced by `invalidateAll()`");if(typeof r=="function")t.push(r);else{const{href:s}=new URL(r,location.href);t.push(l=>l.href===s)}return Ue()},invalidateAll:()=>(S=!0,Ue()),preload_data:async r=>{const s=new URL(r,Me(document));await Te(s)},preload_code:oe,apply_action:async r=>{if(r.type==="error"){const s=new URL(location.href),{branch:l,route:c}=f;if(!c)return;const d=await Fe(f.branch.length,l,c.errors);if(d){const h=await Z({url:s,params:f.params,branch:l.slice(0,d.idx).concat(d.node),status:500,error:r.error,route:c});f=h.state;const p=fe();U.$set(h.props),p(),le().then(Ie)}}else if(r.type==="redirect")me(r.location,{invalidateAll:!0},[]);else{const s={form:r.data,page:{...G,form:r.data,status:r.status}},l=fe();U.$set(s),l(),r.type==="success"&&le().then(Ie)}},_start_router:()=>{var r;history.scrollRestoration="manual",addEventListener("beforeunload",s=>{var c,d;let l=!1;if(!w){const h={from:ce("from",{params:f.params,route:{id:(d=(c=f.route)==null?void 0:c.id)!=null?d:null},url:f.url}),to:null,willUnload:!0,type:"leave",cancel:()=>l=!0};o.before_navigate.forEach(p=>p(h))}l?(s.preventDefault(),s.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Re(L);try{sessionStorage[Qe]=JSON.stringify(ae)}catch{}}}),(r=navigator.connection)!=null&&r.saveData||et(),n.addEventListener("click",s=>{if(s.button||s.which!==1||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||s.defaultPrevented)return;const{a:l,url:c,options:d,has:h}=Ee(s.composedPath()[0],e);if(!l||!c||!(l instanceof SVGAElement)&&c.protocol!==location.protocol&&!(c.protocol==="https:"||c.protocol==="http:")||h.download)return;if(d.reload||h.rel_external||h.target){Be({url:c,type:"link"})||s.preventDefault(),w=!0;return}const[b,v]=c.href.split("#");if(v!==void 0&&b===location.href.split("#")[0]){E=!0,Re(L),f.url=c,K.page.set({...G,url:c}),K.page.notify();return}ye({url:c,scroll:d.noscroll?$e():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:c.href===location.href},accepted:()=>s.preventDefault(),blocked:()=>s.preventDefault(),type:"link"})}),addEventListener("popstate",s=>{var l;if((l=s.state)!=null&&l[q]){if(s.state[q]===L)return;const c=s.state[q]-L;ye({url:new URL(location.href),scroll:ae[s.state[q]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{L=s.state[q]},blocked:()=>{history.go(-c)},type:"popstate",delta:c})}}),addEventListener("hashchange",()=>{E&&(E=!1,history.replaceState({...history.state,[q]:++L},"",location.href))});for(const s of document.querySelectorAll("link"))s.rel==="icon"&&(s.href=s.href);addEventListener("pageshow",s=>{s.persisted&&K.navigating.set(null)})},_hydrate:async({status:r,error:s,node_ids:l,params:c,route:d,data:h,form:p})=>{var y;a=!0;const b=new URL(location.href);let v;try{const k=l.map(async(I,N)=>{const A=h[N];return _e({loader:he[I],url:b,params:c,route:d,parent:async()=>{const O={};for(let P=0;P<N;P+=1)Object.assign(O,(await k[P]).data);return O},server_data_node:ge(A)})});v=await Z({url:b,params:c,branch:await Promise.all(k),status:r,error:s,form:p,route:(y=Se.find(({id:I})=>I===d.id))!=null?y:null})}catch(k){if(k instanceof Xe){await ie(new URL(k.location,location.href));return}v=await se({status:k instanceof je?k.status:500,error:await te(k,{url:b,params:c,route:d}),url:b,route:d})}qe(v)}}}async function Ze(n,e){var f;const t=new URL(n);t.pathname=St(n.pathname);const i=await pe(t.href,{headers:{"x-sveltekit-invalidated":e.map(a=>a?"1":"").join(",")}}),o=await i.json();if(!i.ok)throw new Error(o);return(f=o.nodes)==null||f.forEach(a=>{var u,m;(a==null?void 0:a.type)==="data"&&(a.data=Zt(a.data),a.uses={dependencies:new Set((u=a.uses.dependencies)!=null?u:[]),params:new Set((m=a.uses.params)!=null?m:[]),parent:!!a.uses.parent,route:!!a.uses.route,url:!!a.uses.url})}),o}function te(n,e){var t;return n instanceof je?n.body:(t=Gt.handleError({error:n,event:e}))!=null?t:{message:e.route.id!=null?"Internal Error":"Not Found"}}const xt=["hash","href","host","hostname","origin","pathname","port","protocol","search","searchParams","toString","toJSON"];function ce(n,e){for(const t of xt)Object.defineProperty(e,t,{get(){throw new Error(`The navigation shape changed - ${n}.${t} should now be ${n}.url.${t}`)},enumerable:!1});return Object.defineProperty(e,"routeId",{get(){throw new Error(`The navigation shape changed - ${n}.routeId should now be ${n}.route.id`)},enumerable:!1}),e}function fe(){return()=>{}}function Ie(){const n=document.querySelector("[autofocus]");if(n)n.focus();else{const e=document.body,t=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0}),setTimeout(()=>{var i;(i=getSelection())==null||i.removeAllRanges()}),t!==null?e.setAttribute("tabindex",t):e.removeAttribute("tabindex")}}async function rn({env:n,hydrate:e,paths:t,target:i,version:o}){_t(t),mt(o);const f=Qt({target:i,base:t.base});ht({client:f}),e?await f._hydrate(e):f.goto(location.href,{replaceState:!0}),f._start_router()}export{rn as start};
