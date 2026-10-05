const products={
  sheisty:{
    name:"SHEISTY", type:"01 / HEADWEAR",
    front:"images/sheisty-front.jpg", back:"images/sheisty-back.jpg",
    desc:"Black stretch face covering with the JAWZ mark across the mouth. Built for the ride, the night, and everything after."
  },
  keychain:{
    name:"KEYCHAIN", type:"02 / ACCESSORY",
    front:"images/keychain-front.jpg", back:"images/keychain-back.jpg",
    desc:"The black rectangular JAWZ MOTO keychain. Clean, heavy-looking, and made to keep the logo with you off the bike."
  }
};
let selected=null, bag=JSON.parse(localStorage.getItem("jawsmoto-bag")||"[]");

const drawer=document.getElementById("drawer");
const bagDrawer=document.getElementById("bagDrawer");
const count=document.getElementById("bagCount");

function updateCount(){count.textContent=bag.length;localStorage.setItem("jawsmoto-bag",JSON.stringify(bag))}
function openProduct(key){
 selected=key; const p=products[key];
 document.getElementById("detailFront").src=p.front;
 document.getElementById("detailBack").src=p.back;
 document.getElementById("detailFront").alt=p.name+" front";
 document.getElementById("detailBack").alt=p.name+" back";
 document.getElementById("detailName").textContent=p.name;
 document.getElementById("detailType").textContent=p.type;
 document.getElementById("detailDesc").textContent=p.desc;
 document.querySelectorAll(".sizes button").forEach(b=>b.classList.remove("active"));
 document.getElementById("sizeRow").style.display=key==="sheisty"?"flex":"none";
 drawer.classList.add("open");drawer.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
}
function closeProduct(){drawer.classList.remove("open");drawer.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.querySelectorAll(".product-card").forEach(c=>c.addEventListener("click",()=>openProduct(c.dataset.product)));
document.getElementById("closeDrawer").onclick=closeProduct;
drawer.addEventListener("click",e=>{if(e.target===drawer)closeProduct()});

document.querySelectorAll(".sizes button").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".sizes button").forEach(x=>x.classList.remove("active"));b.classList.add("active");
});
document.getElementById("addBtn").onclick=()=>{
 const size=selected==="sheisty"?(document.querySelector(".sizes button.active")?.textContent||"M"):"ONE SIZE";
 bag.push({product:selected,size});updateCount();closeProduct();openBag();
};
function renderBag(){
 const box=document.getElementById("bagItems");
 if(!bag.length){box.innerHTML='<p style="color:#666;font-size:12px">Your bag is empty.</p>';return}
 box.innerHTML=bag.map((x,i)=>`<div class="bag-item"><img src="${products[x.product].front}"><div><strong>${products[x.product].name}</strong><small>${x.size}</small><button onclick="removeItem(${i})" style="display:block;margin-top:10px;color:#777;font-size:9px;letter-spacing:2px">REMOVE</button></div></div>`).join("");
}
window.removeItem=i=>{bag.splice(i,1);updateCount();renderBag()}
function openBag(){renderBag();bagDrawer.classList.add("open");bagDrawer.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeBag(){bagDrawer.classList.remove("open");bagDrawer.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.getElementById("bagBtn").onclick=openBag;
document.getElementById("closeBag").onclick=closeBag;
bagDrawer.addEventListener("click",e=>{if(e.target===bagDrawer)closeBag()});
document.getElementById("checkoutBtn").onclick=()=>alert("Checkout is the next step — the store payment system is not connected yet.");
updateCount();
