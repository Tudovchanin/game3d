import{y as c,f as t}from"./index-BHwXL7Xz.js";const l=c("products",()=>{const s=t(null),e=t(!1),o=t(null);async function a(){e.value=!0,o.value=null;try{const r=await fetch("/game3d/products.json");if(!r.ok)throw new Error("Ошибка при загрузке данных");const n=await r.json();s.value=n}catch(r){o.value=r instanceof Error?r.message:"Неизвестная ошибка"}finally{e.value=!1}}return{products:s,fetchProducts:a,error:o,loading:e}});export{l as u};
