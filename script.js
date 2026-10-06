const products={
  sheisty:{name:"SHEISTY",type:"01 / HEADWEAR",front:"images/sheisty-front.jpg",back:"images/sheisty-back.jpg",desc:"Black stretch face covering with the JAWZ mark across the mouth. Built for the ride, the night, and everything after."},
  keychain:{name:"KEYCHAIN",type:"02 / ACCESSORY",front:"images/keychain-front.jpg",back:"images/keychain-back.jpg",desc:"The black rectangular JAWZ MOTO keychain. Clean, heavy-looking, and made to keep the logo with you off the bike."}
};
let selected=null;
let bag=JSON.parse(localStorage.getItem("jawsmoto-bag")||"[]");
const drawer=document.getElementById("drawer"), bagDrawer=document.getElementById("bagDrawer"), count=document.getElementById("bagCount");
const money=()=>"—";
function updateCount(){count.textContent=bag.reduce((n,x)=>n+(x.qty||1),0);localStorage.setItem("jawsmoto-bag",JSON.stringify(bag));}
function openProduct(key){
  selected=key; const p=products[key];
  const front=document.getElementById("detailFront"), back=document.getElementById("detailBack");
  front.src=p.front; back.src=p.back; front.alt=p.name+" front"; back.alt=p.name+" back";
  document.getElementById("detailName").textContent=p.name;
  document.getElementById("detailType").textContent=p.type;
  document.getElementById("detailDesc").textContent=p.desc;
  document.querySelectorAll(".sizes button").forEach(b=>b.classList.remove("active"));
  document.getElementById("sizeRow").style.display=key==="sheisty"?"flex":"none";
  drawer.classList.add("open"); drawer.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
}
function closeProduct(){drawer.classList.remove("open");drawer.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.querySelectorAll(".product-card").forEach(c=>c.addEventListener("click",()=>openProduct(c.dataset.product)));
document.getElementById("closeDrawer").onclick=closeProduct;
drawer.addEventListener("click",e=>{if(e.target===drawer)closeProduct()});
document.querySelectorAll(".sizes button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".sizes button").forEach(x=>x.classList.remove("active"));b.classList.add("active")});

document.getElementById("addBtn").onclick=()=>{
  const size=selected==="sheisty"?(document.querySelector(".sizes button.active")?.textContent||"M"):"ONE SIZE";
  const key=selected+"|"+size; const old=bag.find(x=>x.key===key);
  if(old) old.qty=(old.qty||1)+1; else bag.push({key,product:selected,size,qty:1});
  updateCount(); closeProduct(); openBag();
};
function renderBag(){
  const box=document.getElementById("bagItems");
  if(!bag.length){box.innerHTML='<div class="bag-empty"><p style="color:#777;font-size:11px;letter-spacing:2px">YOUR BAG IS EMPTY.</p></div>';document.getElementById("bagTotal").textContent="—";return;}
  box.innerHTML=bag.map((x,i)=>`<div class="bag-item"><img src="${products[x.product].front}" alt=""><div><strong>${products[x.product].name}</strong><small>${x.size}</small><div class="bag-controls"><button onclick="changeQty(${i},-1)">−</button><span>${x.qty||1}</span><button onclick="changeQty(${i},1)">+</button></div></div><button class="bag-remove" onclick="removeItem(${i})">REMOVE</button></div>`).join("");
  document.getElementById("bagTotal").textContent=money();
}
window.changeQty=(i,d)=>{bag[i].qty=(bag[i].qty||1)+d;if(bag[i].qty<=0)bag.splice(i,1);updateCount();renderBag()};
window.removeItem=i=>{bag.splice(i,1);updateCount();renderBag()};
function openBag(){renderBag();bagDrawer.classList.add("open");bagDrawer.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeBag(){bagDrawer.classList.remove("open");bagDrawer.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.getElementById("bagBtn").onclick=openBag;
document.getElementById("closeBag").onclick=closeBag;
bagDrawer.addEventListener("click",e=>{if(e.target===bagDrawer)closeBag()});
document.getElementById("checkoutBtn").onclick=()=>alert("Checkout is ready for the payment link to be connected.");
updateCount();
