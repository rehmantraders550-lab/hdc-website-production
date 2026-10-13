const families = ["All products", "Labels & Decals", "Products & Object Printing", "Packaging & Commercial Print", "Large Format & Brand Environments"];
const surfaces = [
  ["Glass", "Coating, curvature and handling shape the route.", "#0c8a9b", "/assets/images/illustrative-mockups/surface-glass.webp", "Generated illustrative macro mockup of a glass surface edge"],
  ["Acrylic", "Thickness, edge quality and printable area matter.", "#96d9d8", "/assets/images/illustrative-mockups/surface-acrylic.webp", "Generated illustrative macro mockup of a clear acrylic edge"],
  ["Metal", "Surface preparation and coating need review.", "#a7b4b5", "/assets/images/illustrative-mockups/surface-metal.webp", "Generated illustrative macro mockup of a brushed metal surface"],
  ["Wood", "Grain, porosity and finish can change the result.", "#c58b57", "/assets/images/illustrative-mockups/surface-wood.webp", "Generated illustrative macro mockup of wood grain and board edge"],
  ["Paper / Paperboard", "Stock, weight, folds and finishing work together.", "#bda88a", "/assets/images/illustrative-mockups/surface-paperboard.webp", "Generated illustrative macro mockup of paper and paperboard samples"],
  ["Plastics", "Polymer type and surface energy vary by object.", "#50a7ae", "/assets/images/illustrative-mockups/surface-plastics.webp", "Generated illustrative macro mockup of a rigid plastic surface"],
  ["Vinyl / Films", "Adhesive, substrate and exposure affect selection.", "#087b90", "/assets/images/illustrative-mockups/surface-vinyl-films.webp", "Generated illustrative macro mockup of a vinyl film surface"]
];
const productImagery = {
  1:{file:"/assets/images/illustrative-mockups/product-uv-dtf-transfer-application.webp",alt:"Generated illustrative mockup of a UV DTF decal transfer being applied by hand"},
  2:{file:"/assets/images/illustrative-mockups/product-labels-roll-and-sample.webp",alt:"Generated illustrative mockup of printed labels on a roll beside a sample label"},
  3:{file:"/assets/images/illustrative-mockups/product-custom-sticker-sheet-v2.webp",alt:"Custom kiss-cut sticker sheet with a selection of colorful printed designs"},
  4:{file:"HDC-2026-glass.webp",alt:"Illustrative decorated glass bottle surface"},
  5:{file:"HDC-2026-packaging.webp",alt:"Illustrative folded paperboard packaging"},
  6:{file:"/previews/engineered-tactility-2026-10-07/assets/imagery/HDC-2026-objects.webp",alt:"Illustrative mockup of a branded reusable tumbler with a printed graphic"},
  7:{file:"/assets/images/illustrative-mockups/product-brochures-catalogue.webp",alt:"Illustrative tri-fold brochure and printed brochure stack on a studio surface"},
  8:{file:"/assets/images/illustrative-mockups/product-certificates-catalogue.webp",alt:"Textured printed certificates with embossed borders and copper foil details"},
  9:{file:"/assets/images/illustrative-mockups/product-printed-bottles-catalogue.webp",alt:"Illustrative clear, amber and reusable bottles with custom printed graphics"},
  10:{file:"HDC-2026-environments.webp",alt:"Illustrative installed printed panel in an architectural space"},
  11:{file:"/assets/images/illustrative-mockups/product-posters-catalogue.webp",alt:"Illustrative large-format art posters displayed and rolled on a studio surface"},
  12:{file:"/assets/images/illustrative-mockups/product-wall-vinyls-catalogue.webp",alt:"Illustrative UV printed wall vinyl installed as a feature wall in a bright interior"}
};
const productImageSrc = image => image.file.startsWith("/") ? image.file : `/previews/engineered-tactility-2026-10-07/assets/imagery/${image.file}`;
const finishing = {
  spot:{no:"01",title:"Spot UV",desc:"A selective gloss or raised effect can create contrast against a matte field. Map it on a separate, clearly named artwork layer and check its distance from folds, trim and glue areas.",points:["Separate effect artwork from the base print.","Confirm registration and surface suitability.","Keep critical details away from scores and trim."]},
  foil:{no:"02",title:"Foil",desc:"A reflective foil area should be planned as a distinct production layer. The chosen foil, substrate, line weight and required registration need to be reviewed before the effect is confirmed.",points:["Supply a clean spot layer or vector mask.","Confirm minimum detail with the production route.","Proof the material/effect combination where needed."]},
  emboss:{no:"03",title:"Emboss / deboss",desc:"Relief changes how a printed surface catches light and hand. The artwork, paper, board thickness and nearby structural features must be considered as one specification.",points:["Keep the relief map separate from visible artwork.","Review clearance around folds, scores and edges.","Confirm stock and tool feasibility before production."]},
  laminate:{no:"04",title:"Lamination",desc:"A laminate changes the surface feel and can affect color appearance, handling and downstream finishing. Select it for the actual job environment, not as an isolated visual preference.",points:["Specify the intended finish and use.","Check compatibility with later folds or adhesives.","Review a sample when appearance is critical."]},
  cut:{no:"05",title:"Cut & route",desc:"Cut lines and routed paths define the finished shape. Keep them as clean vectors on their own production layer, with dimensions and functional clearances called out.",points:["Separate cut paths from visible print artwork.","Confirm radii, bridges and material tolerances.","Dimension holes, folds and no-print areas."]}
};
let activeFamily = "All products";
let productData = [];
let lastBrief = "";
let selectedProduct = null;
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
function escapeText(value){return String(value ?? "");}
function showToast(message){const toast=$("#toast");toast.textContent=message;toast.classList.add("is-visible");window.setTimeout(()=>toast.classList.remove("is-visible"),2600);}
function renderFilters(){const host=$("#family-filters");host.replaceChildren();families.forEach(name=>{const b=document.createElement("button");b.type="button";b.className="filter-chip";b.textContent=name;b.setAttribute("aria-pressed",String(name===activeFamily));b.addEventListener("click",()=>{activeFamily=name;renderFilters();renderProducts();});host.append(b);});}
function cardFor(p){
  const article=document.createElement("article");
  article.className="product-card";
  const image=productImagery[p.number];
  if(image){
    const trigger=document.createElement("button");
    trigger.type="button";
    trigger.className="product-card-trigger";
    trigger.setAttribute("aria-label",`View ${p.name} details`);
    const img=document.createElement("img");
    img.className="product-card-image";
    img.src=productImageSrc(image);
    img.alt=image.alt;
    img.loading="lazy";
    img.decoding="async";
    const title=document.createElement("span");
    title.className="product-card-title";
    title.setAttribute("role","heading");
    title.setAttribute("aria-level","3");
    title.textContent=p.name;
    trigger.append(img,title);
    trigger.addEventListener("click",()=>openProduct(p));
    article.append(trigger);
  }
  return article;
}
function openProduct(p){selectedProduct=p;const image=productImagery[p.number];const visual=$("#product-visual");visual.hidden=!image;if(image){$("#product-image").src=productImageSrc(image);$("#product-image").alt=image.alt;}$("#product-kicker").textContent=`${String(p.number).padStart(2,"0")} / ${p.family}`;$("#product-title").textContent=p.name;$("#product-short").textContent=p.short||"";$("#product-detail-copy").textContent=p.description||"";$("#product-uses").textContent=p.uses||"Discuss the intended application with HDC.";const list=$("#product-configure");list.replaceChildren();String(p.configure||"").split("·").map(x=>x.trim()).filter(Boolean).forEach(text=>{const li=document.createElement("li");li.textContent=text;list.append(li);});$("#product-review-note").textContent=p.mode==="TECHNICAL_REVIEW"?"Technical review required. Surface compatibility, geometry and process must be confirmed before production.":"Quote required. Product options and pricing are confirmed only against an approved production specification.";$("#product-dialog").showModal();}
function renderProducts(){const query=$("#product-search").value.trim().toLowerCase();const filtered=productData.filter(p=>(activeFamily==="All products"||p.family===activeFamily)&&(!query||[p.name,p.family,p.short,p.uses].join(" ").toLowerCase().includes(query)));const grid=$("#product-grid");grid.replaceChildren();if(!filtered.length){const p=document.createElement("p");p.className="loading-note";p.textContent="No products match that search. Try another term or family.";grid.append(p);}else filtered.forEach(p=>grid.append(cardFor(p)));$("#result-count").textContent=`${filtered.length} / ${productData.length} listed`;}
function renderSurfaces(){const host=$("#surface-grid");surfaces.forEach(([name,desc,glow,src,alt],i)=>{const card=document.createElement("article");card.className="surface-card";card.style.setProperty("--surface-glow",glow);const img=document.createElement("img");img.className="surface-card-image";img.src=src;img.alt=alt;img.loading="lazy";img.decoding="async";const n=document.createElement("small");n.textContent=`0${i+1} / SURFACE GROUP`;const h=document.createElement("h3");h.textContent=name;const p=document.createElement("p");p.textContent=desc;card.append(img,n,h,p);host.append(card);});}
function selectFinish(key){const data=finishing[key];$$("[data-finish]").forEach(btn=>btn.setAttribute("aria-selected",String(btn.dataset.finish===key)));const host=$("#finish-detail");host.replaceChildren();const e=document.createElement("p");e.className="eyebrow eyebrow--dark";e.textContent=`FINISH REGISTER / ${data.no}`;const h=document.createElement("h3");h.textContent=data.title;const p=document.createElement("p");p.textContent=data.desc;const ul=document.createElement("ul");data.points.forEach(item=>{const li=document.createElement("li");li.textContent=item;ul.append(li);});host.append(e,h,p,ul);}
function openBrief(product=null,mode="quote"){const dialog=$("#brief-dialog");const form=$("#brief-form");form.reset();$("#brief-result").hidden=true;$("#brief-kicker").textContent=mode==="technical"?"TECHNICAL REVIEW / HDC":"PROJECT ENQUIRY / HDC";$("#brief-title").textContent=mode==="technical"?"Review a surface.":"Build a job brief.";$("#brief-product").value=product?.name||"";$("#brief-product").readOnly=Boolean(product);dialog.showModal();}
function makeBrief(form){const data=new FormData(form);const lines=["HDC PRINT PROJECT BRIEF","=======================",...Array.from(data.entries()).filter(([,v])=>String(v).trim()).map(([k,v])=>`${k.replaceAll("_"," ").replace(/^./,c=>c.toUpperCase())}: ${String(v).trim()}`),"","This brief was prepared locally on your device from the HDC preview. No information was sent or stored."];return lines.join("\n");}
function downloadBrief(text){const blob=new Blob([text],{type:"text/plain;charset=utf-8"});const url=URL.createObjectURL(blob);const a=$("#download-brief");a.href=url;window.setTimeout(()=>URL.revokeObjectURL(url),60000);}
document.addEventListener("DOMContentLoaded",async()=>{
  renderSurfaces();renderFilters();selectFinish("spot");
  try{const response=await fetch("/previews/engineered-tactility-2026-10-07/assets/products.json");if(!response.ok)throw new Error("catalogue unavailable");productData=await response.json();renderProducts();}catch(err){$("#product-grid").innerHTML='<p class="loading-note">The product register could not load. Please refresh the page.</p>';}
  $("#product-search").addEventListener("input",renderProducts);
  $$("[data-service]").forEach(panel=>$(".service-trigger",panel).addEventListener("click",()=>{$$("[data-service]").forEach(other=>{const active=other===panel;other.classList.toggle("is-active",active);$(".service-trigger",other).setAttribute("aria-expanded",String(active));});}));
  $$("[data-filter-link]").forEach(link=>link.addEventListener("click",()=>{activeFamily=link.dataset.filterLink;renderFilters();renderProducts();}));
  $$("[data-finish]").forEach(button=>button.addEventListener("click",()=>selectFinish(button.dataset.finish)));
  $$("[data-open-brief]").forEach(button=>button.addEventListener("click",()=>openBrief(null,button.dataset.briefMode||"quote")));
  $$("[data-close-dialog]").forEach(button=>button.addEventListener("click",()=>$("#brief-dialog").close()));
  $$("[data-close-product]").forEach(button=>button.addEventListener("click",()=>$("#product-dialog").close()));
  $("#product-build-brief").addEventListener("click",()=>{$("#product-dialog").close();openBrief(selectedProduct,selectedProduct?.mode==="TECHNICAL_REVIEW"?"technical":"quote");});
  $("#brief-form").addEventListener("submit",event=>{event.preventDefault();if(!event.currentTarget.reportValidity())return;lastBrief=makeBrief(event.currentTarget);downloadBrief(lastBrief);$("#brief-result").hidden=false;$("#brief-result").scrollIntoView({block:"nearest",behavior:"smooth"});});
  $("#copy-brief").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(lastBrief);showToast("Brief copied to clipboard.");}catch{const box=document.createElement("textarea");box.value=lastBrief;document.body.append(box);box.select();document.execCommand("copy");box.remove();showToast("Brief copied to clipboard.");}});
  const menu=$(".menu-toggle"),nav=$("#main-nav");menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")!=="true";menu.setAttribute("aria-expanded",String(open));nav.classList.toggle("is-open",open);});$$(".main-nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("is-open");menu.setAttribute("aria-expanded","false");}));
});
