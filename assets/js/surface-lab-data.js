/* HDC Surface Lab — customer-safe material projection v2
   Source: approved content already present in surface-lab.html before redesign.
   No new suitability claims are introduced here. */
window.HDC_SURFACE_LAB_MATERIALS = [
  {
    key:"SURF-GLASS-001", slug:"glass", index:"01", name:"Glass", thumb:"/assets/images/renewal-20261020/glass.webp", thumbAlt:"Illustrative flat glass panel with a printed botanical graphic and transparent edges.",
    summary:"Glass can support direct UV, UV-DTF, vinyl, or specialist decoration routes depending on the exact glass, coating, geometry, print face, and how the finished piece will be handled and cleaned.",
    status:"Assessment required",
    candidates:[["Direct UV","May suit"],["UV-DTF","May suit"],["Vinyl","May suit"]],
    variants:["Soda-lime","Borosilicate","Aluminosilicate","Coated / treated glass","Unknown glass"],
    review:["Object / application","Material and coating, if known","Dimensions and geometry","Use environment and handling","Desired visual effect","Quantity and sample availability"],
    action:"Request a sample test",
    image:{src:"/assets/images/renewal-20261020/glass.webp",alt:"Illustrative flat glass panel with a printed botanical graphic and transparent edges."}
  },
  {
    key:"SURF-ACRYLIC-001", slug:"acrylic", index:"02", name:"Acrylic / PMMA", thumb:"/assets/images/renewal-20261020/acrylic.webp", thumbAlt:"Illustrative clear acrylic sheets with geometric print and polished edges.",
    summary:"Acrylic is a strong candidate for high-detail rigid-surface graphics, but performance depends on acrylic type, surface finish, stress state, fabrication history, and the chosen print or transfer method.",
    status:"Assessment required",
    candidates:[["Direct UV","May suit"],["UV-DTF","May suit"],["Vinyl","May suit"]],
    variants:["Cast (ISO 7823-1)","Extruded (ISO 7823-2)","Impact-modified","UV-stabilized","Frosted / textured","Hard-coated (optical)"],
    review:["Object / application","Material and coating, if known","Dimensions and geometry","Use environment and handling","Desired visual effect","Quantity and sample availability"],
    action:"Request a sample test",
    image:{src:"/assets/images/renewal-20261020/acrylic.webp",alt:"Illustrative clear acrylic sheets with geometric print and polished edges."}
  },
  {
    key:"SURF-COATED-METAL-001", slug:"coated-metal", index:"03", name:"Coated Metal", thumb:"/assets/images/renewal-20261020/metal.webp", thumbAlt:"Illustrative printed brushed aluminium and coated metal sample panels.",
    summary:"Coated metal can be decorated by several print and graphic methods, but the real printable surface is the coating system—not simply the metal underneath.",
    status:"Assessment required",
    candidates:[["Direct UV","May suit"],["UV-DTF","May suit"],["Vinyl","May suit"]],
    variants:[],
    review:["Object / application","Material and coating, if known","Dimensions and geometry","Use environment and handling","Desired visual effect","Quantity and sample availability"],
    action:"Send your object/surface for review", image:null
  },
  {
    key:"SURF-ACM-001", slug:"acm", index:"04", name:"ACM / Dibond-type Panels", thumb:"/assets/images/renewal-20261020/acm.webp", thumbAlt:"Illustrative printed aluminium-composite panel with a visible layered edge.",
    summary:"ACM is well suited to signage, display, and brand-environment work, but coating family, panel construction, finishing, and installation conditions must be known before the graphic method is locked.",
    status:"Assessment required",
    candidates:[["Direct UV","May suit"],["UV-DTF","May suit"],["Vinyl","May suit"]],
    variants:["PE-core display","FR-core architectural","A2-core architectural","Digital-print specialized"],
    review:["Object / application","Material and coating, if known","Dimensions and geometry","Use environment and handling","Desired visual effect","Quantity and sample availability"],
    action:"Ask for a material/process recommendation", image:null
  },
  {
    key:"SURF-PVC-001", slug:"pvc", index:"05", name:"PVC / Foamex", thumb:"/assets/images/renewal-20261020/plastics.webp", thumbAlt:"Illustrative printed rigid plastic sheets and a rectangular faceplate.",
    summary:"PVC and foam-board products are common display surfaces, but board density, skin type, heat sensitivity, fabrication method, and adhesive migration can materially change the correct print route.",
    status:"Assessment required",
    candidates:[["Direct UV","May suit"],["UV-DTF","May suit"],["Vinyl","May suit"]],
    variants:["Solid rigid PVC","Expanded free-foam PVC","Integral-skin Celuka PVC","Colored / black PVC","UV-stabilized exterior PVC","Lightweight economy display board"],
    review:["Object / application","Material and coating, if known","Dimensions and geometry","Use environment and handling","Desired visual effect","Quantity and sample availability"],
    action:"Ask for a material/process recommendation", image:null
  },
  {
    key:"SURF-WOOD-001", slug:"wood", index:"06", name:"Wood & Engineered Board", thumb:"/assets/images/renewal-20261020/wood.webp", thumbAlt:"Illustrative geometric print on birch plywood with visible grain and layered edges.",
    summary:"Wood and engineered boards can produce highly tactile print results, but porosity, moisture, grain, sealers, coatings, and dimensional movement determine what process is suitable.",
    status:"Assessment required",
    candidates:[["Direct UV","May suit"],["UV-DTF","May suit"],["Vinyl","May suit"]],
    variants:["Hardwood open / closed grain","Softwood","Oily / resinous wood","Standard MDF","MR MDF","FR MDF","Particleboard","Birch plywood"],
    review:["Object / application","Material and coating, if known","Dimensions and geometry","Use environment and handling","Desired visual effect","Quantity and sample availability"],
    action:"Send your object/surface for review",
    image:{src:"/assets/images/renewal-20261020/wood.webp",alt:"Illustrative geometric print on birch plywood with visible grain and layered edges."}
  },
  {
    key:"SURF-RIGID-PLASTICS-001", slug:"rigid-plastics", index:"07", name:"Rigid Plastics", thumb:"/assets/images/renewal-20261020/plastics.webp", thumbAlt:"Illustrative printed rigid plastic sheets and a rectangular faceplate.",
    summary:"Rigid plastics vary widely. Some accept printing readily, while others need surface treatment or an alternative method, so the exact polymer and surface state must be identified first.",
    status:"Assessment required",
    candidates:[["Direct UV","May suit"],["UV-DTF","May suit"],["Vinyl","May suit"]],
    variants:["ABS","HIPS","PC","PP","PE","HDPE","PET","PETG"],
    review:["Object / application","Material and coating, if known","Dimensions and geometry","Use environment and handling","Desired visual effect","Quantity and sample availability"],
    action:"Send your object/surface for review", image:null
  },
  {
    key:"SURF-UNKNOWN-001", slug:"unknown", index:"08", name:"Experimental / Unknown Surfaces", thumb:"/assets/images/renewal-20261020/unknown.webp", thumbAlt:"Illustrative mixed material coupons arranged for surface assessment.",
    summary:"If the material or coating is unknown, HDC can first assess the object and determine whether a safe print, transfer, film, or alternate production route is worth testing.",
    status:"Exact surface review required",
    candidates:[["Direct UV","May suit"],["UV-DTF","May suit"],["Vinyl","May suit"]],
    variants:["Thermoplastics","Thermosets","Composites","Coated metals","Glass-like","Unbranded imports"],
    review:["Object / application","Material and coating, if known","Dimensions and geometry","Use environment and handling","Desired visual effect","Quantity and sample availability"],
    action:"Send your object/surface for review", image:null
  }
];