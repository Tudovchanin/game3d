import{u as E}from"./products.store-BRm09opf.js";import{e as x,f as r,g as p,u as q,h as L,i as M,c as v,a as l,F as D,j as w,n as I,k as N,o as u,l as W,r as X,m as z,w as F,t as $,p as T,v as j,_ as A,q as H,s as U,b as G}from"./index-BHwXL7Xz.js";const J={class:"pagination"},K={class:"pagination__cards"},O={class:"pagination__card-img"},Q=["src","alt"],Y={class:"pagination__card-text"},Z=["onClick"],tt=x({__name:"AppPagination",props:{cardsData:{},pageItemCount:{},linkCard:{},linkPage:{},visibleBtn:{},gapBtn:{}},setup(k){const c="/game3d/",t=k,f=W(),g=q(),o=r(null),m=r(null),i=r(null),h=p(()=>{if(t.cardsData)return Math.ceil(t.cardsData.length/t.pageItemCount)}),P=r(0),B=p(()=>{const a=g.query.page;if(a&&typeof a=="string")return parseInt(a)||1}),e=r(B.value),S=p(()=>{if(e.value&&t.cardsData){const a=e.value*t.pageItemCount;return a>t.cardsData.length?t.cardsData.length:a}}),b=p(()=>{if(B.value)return B.value*t.pageItemCount-t.pageItemCount}),V=(a,s)=>{e.value=a,f.replace(`${t.linkPage}?page=${e.value}`),P.value=s},R=p(()=>({"--btn-gap":t.gapBtn}));let d=null;return L(()=>{if(!o.value)return;const a=o.value[0];if(a){const _=a.getBoundingClientRect().width;d=_+parseInt(t.gapBtn);const n=_*t.visibleBtn+parseInt(t.gapBtn)*(t.visibleBtn-1);m.value&&(m.value.style.width=n+"px")}let s=0;e.value&&(e.value>t.visibleBtn&&(s=(e.value-(t.visibleBtn-1))*-d),e.value===t.visibleBtn&&(s=-d),e.value===o.value.length&&(s+=d),i.value&&(i.value.style.transform=`translateX(${s}px)`))}),M(()=>{!e.value||!o.value||!i.value||(e.value>=t.visibleBtn&&e.value!==o.value.length&&(i.value.style.transform=`translateX(${(e.value-(t.visibleBtn-1))*-d}px)`),e.value<t.visibleBtn&&(i.value.style.transform="translateX(0px)"))}),(a,s)=>{const _=X("RouterLink");return u(),v("div",J,[l("div",K,[(u(!0),v(D,null,w(a.cardsData.slice(b.value,S.value),n=>(u(),z(_,{to:`${a.linkCard}${n.id}`,key:n.id,class:"pagination__card"},{default:F(()=>[l("span",O,[l("img",{src:`${c}/images/${n.images[0]}`,alt:n.name},null,8,Q)]),l("span",Y,$(n.name),1)]),_:2},1032,["to"]))),128))]),l("div",{style:N(R.value),class:"pagination__footer"},[l("div",{ref_key:"wrapperVisibleWidth",ref:m,class:"pagination__hidden-btn"},[l("div",{ref_key:"containerBtn",ref:i,class:"pagination__container-btn"},[(u(!0),v(D,null,w(h.value,(n,C)=>{var y;return T((u(),v("button",{ref_for:!0,ref_key:"allBtn",ref:o,onClick:it=>V(n,C),class:I(["pagination__btn no-select",{"active-btn":n===e.value}]),key:C},$(n),11,Z)),[[j,b.value<=t.cardsData.length&&((y=o.value)==null?void 0:y.length)!==1]])}),128))],512)],512),l("div",{class:I([{"hidden-dots":b.value>a.cardsData.length||e.value===h.value||P.value+a.visibleBtn>h.value},"pagination__dots no-select"]),"aria-hidden":"true"},s[0]||(s[0]=[l("button",{style:{"background-color":"black"}},"...",-1)]),2)],4)])}}}),et=A(tt,[["__scopeId","data-v-100338be"]]),at={key:0,class:"all-products x-center width-common"},nt="/product/",st="/products/",lt="16px",ot=3,rt=x({__name:"PageAllProducts",setup(k){const c=E(),t=r(null),f=r(6);return H(async()=>{await c.fetchProducts(),c.products&&(t.value=c.products.map(g=>({...g})))}),(g,o)=>t.value?(u(),v("section",at,[G(et,{gapBtn:lt,cardsData:t.value,pageItemCount:f.value,linkCard:nt,linkPage:st,visibleBtn:ot},null,8,["cardsData","pageItemCount"])])):U("",!0)}}),dt=A(rt,[["__scopeId","data-v-f33a8dfa"]]);export{dt as default};
