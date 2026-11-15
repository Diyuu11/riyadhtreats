/* ===== EDIT THESE DETAILS ===== */
const C={name:"Riyadh Treats",address:"Muhuti Avenue, near Caravan Cafe, South C, Nairobi",area:"Serving South C and nearby neighborhoods. Add delivery areas here.",map:"https://maps.app.goo.gl/wygmx8yv3VLUYhL39",
phone:"+254 743 950 116",wa:"254743950116",
hours:[["Monday – Friday","7:00 am – 9:00 pm"],["Saturday","8:00 am – 10:00 pm"],["Sunday","8:00 am – 8:00 pm"]],
social:{instagram:"https://instagram.com/",facebook:"https://facebook.com/",tiktok:"https://tiktok.com/"}};
const PRICE="KSh —";
const IMG={pour:"images/hero-latte-pour.jpg",room:"images/restaurant-interior.jpg",latte:"images/cappuccino.jpg",black:"images/black-cup.jpg",kraft:"images/kraft-cup.jpg",cups:"images/white-cups.jpg",
mocha:"images/iced-mocha.jpg",iced:"images/iced-coffee.jpg",choco:"images/hot-chocolate.jpg",pastry:"images/pastries.jpg",breakfast:"images/breakfast-plate.jpg",sandwich:"images/sandwiches.jpg"};
const M=[
{n:"Espresso",c:"Coffee",d:"Rich, concentrated and finished with a golden crest.",i:"black"},
{n:"Cappuccino",c:"Coffee",d:"Espresso, steamed milk and a cap of velvety foam.",i:"latte"},
{n:"Caffè Latte",c:"Coffee",d:"Smooth and milky, poured with latte art.",i:"pour"},
{n:"Mocha",c:"Coffee",d:"Espresso and chocolate, topped with steamed milk.",i:"mocha"},
{n:"Americano",c:"Coffee",d:"Espresso lengthened with hot water for a clean cup.",i:"kraft"},
{n:"Iced Coffee",c:"Beverages",d:"Chilled coffee over ice, refreshing and bold.",i:"iced"},
{n:"Hot Chocolate",c:"Beverages",d:"Thick, creamy chocolate made for cold mornings.",i:"choco"},
{n:"Fresh Pastries",c:"Bakery",d:"Baked fresh each morning. Ask what’s warm today.",i:"pastry"},
{n:"Breakfast Plate",c:"Breakfast",d:"A hearty start to the day, made to order.",i:"breakfast"},
{n:"Sandwiches & Light Meals",c:"Light meals",d:"Fresh, filling and ready for lunch or takeaway.",i:"sandwich"}];
const CATS=["All",...new Set(M.map(x=>x.c))];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* reveal images as they enter the viewport (skips the full-screen hero image) */
let io;
if("IntersectionObserver"in window)io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.08,rootMargin:"0px 0px -40px 0px"});
function revealImages(){if(!io)return;$$("img").forEach(i=>{if(i.classList.contains("reveal")||i.closest(".hero"))return;i.classList.add("reveal");io.observe(i)})}
const cart={};
const waURL=t=>`https://wa.me/${C.wa}?text=${encodeURIComponent(t)}`;
const tel=C.phone.replace(/[^+\d]/g,"");
$$("[data-c]").forEach(e=>e.textContent=C[e.dataset.c]);
$$("[data-tel]").forEach(e=>{e.href="tel:"+tel;if(!e.classList.contains("btn"))e.textContent=C.phone;else e.textContent="Call "+C.phone});
$$("[data-wa]").forEach(e=>e.href=waURL(`Hello ${C.name}, I’d like to ask about…`));
$$("[data-s]").forEach(e=>e.href=C.social[e.dataset.s]);
$("#hours").innerHTML=C.hours.map(h=>`<li><span>${h[0]}</span><span>${h[1]}</span></li>`).join("");
$("#maplink").href=C.map||"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(C.address);
$("#yr").textContent=new Date().getFullYear();
function card(x){const v=x.i?`<div class="${x.i==="pour"?"":"pp"}" style="aspect-ratio:4/3;${x.i==="pour"?"overflow:hidden":""}"><img src="${IMG[x.i]}" alt="${x.n}" loading="lazy" style="width:100%;height:100%;object-fit:${x.i==="pour"?"cover":"contain"};${x.i==="latte"?"padding:6%":""}"></div>`:`<div class="ph" aria-hidden="true">${x.n[0]}</div>`;
return `<article class="item">${v}<div class="b"><h3>${x.n}</h3><p>${x.d}</p><div class="foot"><span class="price">${PRICE}</span><button class="add" data-add="${x.n}">Add to order</button></div></div></article>`}
$("#featured").innerHTML=M.map(card).join("");
refreshArrows();
let cat="All";
function drawMenu(){$("#tabs").innerHTML=CATS.map(c=>`<button aria-pressed="${c===cat}" data-cat="${c}">${c}</button>`).join("");
$("#menugrid").innerHTML=M.filter(x=>cat==="All"||x.c===cat).map(card).join("");
refreshArrows();revealImages()}
drawMenu();
const G=[["pour","Latte art being poured","cover"],["room","Our dining room","cover"],["latte","Cappuccino with coffee beans and chocolate","pp"],["black","Takeaway cup with a chocolate splash","pp"],["kraft","Kraft takeaway cup","pp"],["cups","Takeaway cups","pp"]];
const gal=n=>G.slice(0,n).map(g=>`<figure>${g[2]==="pp"?`<div class="pp"><img loading="lazy" src="${IMG[g[0]]}" alt="${g[1]}" style="padding:8%"></div>`:`<img loading="lazy" src="${IMG[g[0]]}" alt="${g[1]}">`}</figure>`).join("");
$("#galhome").innerHTML=gal(4);$("#galfull").innerHTML=gal(6);revealImages();
function drawOrder(){$("#orderlist").innerHTML=M.map(x=>`<div class="row2"><span>${x.n}</span><span class="step"><button type="button" data-q="-1" data-n="${x.n}" aria-label="Remove one ${x.n}">−</button><b>${cart[x.n]||0}</b><button type="button" data-q="1" data-n="${x.n}" aria-label="Add one ${x.n}">+</button></span></div>`).join("");
const ks=Object.keys(cart).filter(k=>cart[k]>0),t=ks.reduce((a,k)=>a+cart[k],0);
$("#summary").innerHTML=ks.length?ks.map(k=>`<div class="row2"><span>${k}</span><b>× ${cart[k]}</b></div>`).join(""):"Nothing added yet.";
const b=$("#cnt");b.hidden=!t;b.textContent=t;
const ccb=$("#cartcount");ccb.hidden=!t;ccb.textContent=t;
$("#cartbody").innerHTML=ks.length?ks.map(k=>`<div class="crow"><span class="cname">${k}</span><span class="step"><button type="button" data-q="-1" data-n="${k}" aria-label="Remove one ${k}">−</button><b>${cart[k]}</b><button type="button" data-q="1" data-n="${k}" aria-label="Add one ${k}">+</button></span></div>`).join(""):`<p class="mute" style="padding:8px 0">Your cart is empty. Add an item from the menu.</p>`}
drawOrder();
let mode="Takeaway";
document.addEventListener("click",e=>{const t=e.target;
if(t.dataset.cat){cat=t.dataset.cat;drawMenu()}
if(t.dataset.add){cart[t.dataset.add]=(cart[t.dataset.add]||0)+1;drawOrder();t.textContent="Added ✓";setTimeout(()=>t.textContent="Add to order",1200)}
if(t.dataset.q){const n=t.dataset.n;cart[n]=Math.max(0,(cart[n]||0)+ +t.dataset.q);drawOrder()}
if(t.dataset.m){mode=t.dataset.m;$$("#mode button").forEach(b=>b.setAttribute("aria-pressed",b===t));$("#addrbox").hidden=mode!=="Delivery"}
if(t.closest("[data-cartclose]")||t.closest(".cartfoot a"))closeCart();
if(t.closest("nav a")||!t.closest("header"))closeNav()});
$("#send").addEventListener("click",e=>{const ks=Object.keys(cart).filter(k=>cart[k]>0),nm=$("#nm").value.trim(),ph=$("#ph").value.trim(),ad=$("#ad").value.trim();
let er=!ks.length?"Add at least one item to your order.":!nm?"Enter your name.":!ph?"Enter your phone number.":mode==="Delivery"&&!ad?"Enter a delivery address.":"";
$("#err").textContent=er;if(er){e.preventDefault();return}
const msg=`New ${mode.toLowerCase()} order\n\n${ks.map(k=>`• ${k} × ${cart[k]}`).join("\n")}\n\nName: ${nm}\nPhone: ${ph}${mode==="Delivery"?"\nAddress: "+ad:""}${$("#nt").value.trim()?"\nNotes: "+$("#nt").value.trim():""}`;
e.target.closest("a").href=waURL(msg);e.target.closest("a").target="_blank"});
function closeNav(){$("#nav").classList.remove("open");$("#burger").setAttribute("aria-expanded","false")}
$("#burger").onclick=()=>{const o=$("#nav").classList.toggle("open");$("#burger").setAttribute("aria-expanded",o)};
function openCart(){$("#cartwrap").classList.add("open");$("#cartbtn").setAttribute("aria-expanded","true");closeNav()}
function closeCart(){$("#cartwrap").classList.remove("open");$("#cartbtn").setAttribute("aria-expanded","false")}
$("#cartbtn").onclick=()=>{$("#cartwrap").classList.contains("open")?closeCart():openCart()};
addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});
const T={home:"Brew & Bean Café | Best Coffee Shop & Breakfast Restaurant in Nairobi",story:"Our Story | Brew & Bean Café, Nairobi",menu:"Menu: Coffee, Breakfast & Light Meals | Brew & Bean Café Nairobi",gallery:"Gallery | Brew & Bean Café Nairobi",contact:"Contact, Location & Opening Hours | Brew & Bean Café Nairobi",order:"Order Coffee Takeaway & Delivery in Nairobi | Brew & Bean Café"};
function route(){let p=location.hash.slice(1);if(!T[p])p="home";
$$(".page").forEach(e=>e.classList.toggle("show",e.id==="p-"+p));
$$("nav a[data-p]").forEach(a=>a.classList.toggle("on",a.dataset.p===p));
document.title=T[p];document.body.dataset.page=p;closeNav();window.scrollTo(0,0);refreshArrows()}
addEventListener("hashchange",route);route();

/* horizontal product sliders: arrows + disabled state */
function updateArrows(box){const wrap=box.closest(".slider");if(!wrap)return;
const max=box.scrollWidth-box.clientWidth-2,prev=wrap.querySelector(".snav.prev"),next=wrap.querySelector(".snav.next");
if(prev)prev.disabled=box.scrollLeft<=2;if(next)next.disabled=box.scrollLeft>=max}
function refreshArrows(){$$(".slider .grid").forEach(updateArrows)}
document.addEventListener("click",e=>{const b=e.target.closest(".snav");if(!b||b.disabled)return;
const box=document.getElementById(b.getAttribute("aria-controls"));if(!box)return;
const it=box.querySelector(".item"),gap=parseFloat(getComputedStyle(box).columnGap)||20;
const step=(it?it.getBoundingClientRect().width:280)+gap;
box.scrollBy({left:step*(+b.dataset.slide),behavior:"smooth"})});
document.addEventListener("scroll",e=>{if(e.target instanceof Element&&e.target.classList.contains("grid"))updateArrows(e.target)},true);
addEventListener("resize",refreshArrows);
