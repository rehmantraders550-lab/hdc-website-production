(() => {
  const sharedReview = [
    "Object / application",
    "Material and coating, if known",
    "Dimensions and geometry",
    "Use environment and handling",
    "Desired visual effect",
    "Quantity and sample availability"
  ];

  window.HDCSurfaceLabData = Object.freeze({
    version: "2.0.0",
    statusModel: "UNTESTED → EXPERIMENTAL → VALIDATED → PRODUCTION APPROVED → RESTRICTED → RETIRED",
    decisionSteps: [
      { id:"object", index:"01", label:"Object", prompt:"What are you making?", detail:"Start with the physical object or application rather than a machine or process." },
      { id:"material", index:"02", label:"Material", prompt:"What is it made from?", detail:"Identify the substrate family as closely as possible." },
      { id:"coating", index:"03", label:"Coating", prompt:"Any existing finish?", detail:"The printable surface may be a coating, sealer, paint, laminate or treatment rather than the base material." },
      { id:"geometry", index:"04", label:"Geometry", prompt:"Form, size and detail", detail:"Shape, curvature, recesses, print area and machine clearance can change the viable route." },
      { id:"environment", index:"05", label:"Environment", prompt:"Where will it be used?", detail:"Handling, cleaning, abrasion, moisture, temperature and indoor/outdoor exposure affect validation." },
      { id:"visual", index:"06", label:"Visual requirement", prompt:"Appearance and effect", detail:"Colour, opacity, white ink, gloss, texture and finish expectations are part of the brief." },
      { id:"candidate", index:"07", label:"Process candidate", prompt:"Route to test", detail:"Only after the object and surface are understood should a production route become a candidate." },
      { id:"validation", index:"08", label:"Validation status", prompt:"Confirm feasibility", detail:"Candidate does not mean approved. Sample review or testing may still be required." },
      { id:"recommendation", index:"09", label:"Recommendation", prompt:"Qualified next step", detail:"The outcome is a qualified recommendation, test requirement or alternate route—not an automatic promise." }
    ],
    materials: [
      {
        key:"SURF-GLASS-001", slug:"glass", index:"01", name:"Glass",
        summary:"Glass can support direct UV, UV-DTF, vinyl, or specialist decoration routes depending on the exact glass, coating, geometry, print face, and how the finished piece will be handled and cleaned.",
        variants:"Soda-lime · Borosilicate · Aluminosilicate · Coated / treated glass · Unknown glass",
        signals:["Exact glass / coating","Geometry + print face","Handling + cleaning"],
        candidates:["Direct UV","UV-DTF","Vinyl"],
        publicStatus:"Assessment required", internalStatus:"UNTESTED",
        image:"assets/images/imagery-2026-09-24/HDC-2026-glass.webp",
        imageAlt:"Glass surface study showing a printed application on a transparent rigid surface",
        review:sharedReview
      },
      {
        key:"SURF-ACRYLIC-001", slug:"acrylic", index:"02", name:"Acrylic / PMMA",
        summary:"Acrylic is a strong candidate for high-detail rigid-surface graphics, but performance depends on acrylic type, surface finish, stress state, fabrication history, and the chosen print or transfer method.",
        variants:"Cast · Extruded · Impact-modified · UV-stabilized · Frosted / textured · Hard-coated",
        signals:["Acrylic type","Surface finish + stress","Fabrication history"],
        candidates:["Direct UV","UV-DTF","Vinyl"],
        publicStatus:"Assessment required", internalStatus:"UNTESTED",
        image:"assets/images/imagery-2026-09-24/HDC-2026-acrylic.webp",
        imageAlt:"Acrylic surface study showing printed detail on a transparent rigid polymer",
        review:sharedReview
      },
      {
        key:"SURF-COATED-METAL-001", slug:"coated-metal", index:"03", name:"Coated Metal",
        summary:"Coated metal can be decorated by several print and graphic methods, but the real printable surface is the coating system—not simply the metal underneath.",
        variants:"Coating system must be identified before the base metal is treated as the printable surface.",
        signals:["Coating chemistry","Surface condition","Use environment"],
        candidates:["Direct UV","UV-DTF","Vinyl"],
        publicStatus:"Assessment required", internalStatus:"UNTESTED",
        image:null, imageAlt:"",
        review:sharedReview
      },
      {
        key:"SURF-ACM-001", slug:"acm", index:"04", name:"ACM / Dibond-type Panels",
        summary:"ACM is well suited to signage, display, and brand-environment work, but coating family, panel construction, finishing, and installation conditions must be known before the graphic method is locked.",
        variants:"PE-core display · FR-core architectural · A2-core architectural · Digital-print specialized",
        signals:["Coating family","Panel construction","Installation condition"],
        candidates:["Direct UV","UV-DTF","Vinyl"],
        publicStatus:"Assessment required", internalStatus:"UNTESTED",
        image:null, imageAlt:"",
        review:sharedReview
      },
      {
        key:"SURF-PVC-001", slug:"pvc", index:"05", name:"PVC / Foamex",
        summary:"PVC and foam-board products are common display surfaces, but board density, skin type, heat sensitivity, fabrication method, and adhesive migration can materially change the correct print route.",
        variants:"Solid rigid PVC · Expanded free-foam · Integral-skin Celuka · Coloured / black · UV-stabilized exterior · Lightweight display board",
        signals:["Board density + skin","Heat sensitivity","Adhesive migration"],
        candidates:["Direct UV","UV-DTF","Vinyl"],
        publicStatus:"Assessment required", internalStatus:"UNTESTED",
        image:null, imageAlt:"",
        review:sharedReview
      },
      {
        key:"SURF-WOOD-001", slug:"wood", index:"06", name:"Wood & Engineered Board",
        summary:"Wood and engineered boards can produce highly tactile print results, but porosity, moisture, grain, sealers, coatings, and dimensional movement determine what process is suitable.",
        variants:"Hardwood · Softwood · Oily / resinous wood · MDF · MR / FR MDF · Particleboard · Plywood",
        signals:["Porosity + moisture","Grain + coating","Dimensional movement"],
        candidates:["Direct UV","UV-DTF","Vinyl"],
        publicStatus:"Assessment required", internalStatus:"UNTESTED",
        image:"assets/images/HDC-IMG-FLATBED-WOOD-GEOMETRY-01.webp",
        imageAlt:"Wood object study used for geometry and surface assessment",
        review:sharedReview
      },
      {
        key:"SURF-RIGID-PLASTICS-001", slug:"rigid-plastics", index:"07", name:"Rigid Plastics",
        summary:"Rigid plastics vary widely. Some accept printing readily, while others need surface treatment or an alternative method, so the exact polymer and surface state must be identified first.",
        variants:"ABS · HIPS · PC · PP · PE · HDPE · PET · PETG",
        signals:["Exact polymer","Surface energy / state","Treatment requirement"],
        candidates:["Direct UV","UV-DTF","Vinyl"],
        publicStatus:"Assessment required", internalStatus:"UNTESTED",
        image:null, imageAlt:"",
        review:sharedReview
      },
      {
        key:"SURF-UNKNOWN-001", slug:"unknown", index:"08", name:"Experimental / Unknown Surfaces",
        summary:"If the material or coating is unknown, HDC can first assess the object and determine whether a safe print, transfer, film, or alternate production route is worth testing.",
        variants:"Thermoplastics · Thermosets · Composites · Coated metals · Glass-like · Unbranded imports",
        signals:["Identify material first","Inspect coating / finish","Sample or test may be required"],
        candidates:[],
        publicStatus:"Exact surface review required", internalStatus:"UNTESTED",
        image:null, imageAlt:"",
        review:sharedReview
      }
    ]
  });
})();