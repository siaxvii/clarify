export interface Ingredient {
  name: string;
  safe: boolean;
  concern?: string;
}

export interface Recall {
  date: string;
  reason: string;
  source: string;
}

export interface Product {
  barcode: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  overallSafe: boolean;
  safetyScore: number; // 0-100
  ingredients: Ingredient[];
  recalls: Recall[];
  description: string;
}

// Helper for barcodes with leading zeros
function digitsOnly(s: string) {
  return String(s ?? "").replace(/\D/g, "");
}

export const products: Record<string, Product> = {
  "667559304043": {
    barcode: "667559304043",
    name: "Champagne Toast Antibacterial Moisturizing Hand Sanitizer",
    brand: "Bath & Body Works",
    category: "Hand Care",
    imageUrl: "https://cdn1.skinsafeproducts.com/photo/D234E41DA91461/large_1732690152.pngpng?1732690152",
    overallSafe: true,
    safetyScore: 78,
    description:
      "A sparkling blend of bubbly champagne, sparkling berries, and juicy orange with moisturizing aloe and vitamin E.",
    ingredients: [
  { name: "Water (Aqua, Eau)", safe: true, concern: "Solvent/base of the formula. Generally low concern." },

  {
    name: "Fragrance (Parfum)",
    safe: false,
    concern:
      "Catch-all term that can include many undisclosed aroma chemicals. Common trigger for irritation/allergies in sensitive skin.",
  },

  { name: "Dimethicone", safe: true, concern: "Silicone emollient that smooths and reduces moisture loss. Generally low irritation risk." },
  { name: "Acrylates/C10-30 Alkyl Acrylate Crosspolymer", safe: true, concern: "Thickener/stabilizer that gives gel texture. Generally low concern." },
  { name: "Isopropyl Myristate", safe: true, concern: "Emollient/slip agent. Can feel heavy; may be comedogenic for acne-prone skin." },
  { name: "Hydroxypropylcellulose", safe: true, concern: "Thickener/film former. Generally low concern." },
  { name: "Aminomethyl Propanol", safe: true, concern: "pH adjuster to keep formula stable. Can be mildly irritating in very sensitive skin." },
  { name: "Mannitol", safe: true, concern: "Humectant/sugar alcohol that helps hydration. Generally low concern." },
  { name: "Cellulose", safe: true, concern: "Texture/viscosity support. Generally low concern." },
  { name: "Dimethiconol", safe: true, concern: "Silicone conditioning agent for smooth feel. Generally low concern." },
  { name: "Laureth-4", safe: true, concern: "Surfactant/solubilizer (helps mix oils/fragrance). Can irritate very sensitive skin for some." },
  { name: "Laureth-23", safe: true, concern: "Solubilizer/surfactant. Generally low concern; irritation possible for very sensitive users." },
  { name: "Vitamin E", safe: true, concern: "Antioxidant/skin conditioning. Rarely can cause irritation in sensitive users." },
  { name: "Shea Butter Extract", safe: true, concern: "Emollient extract; helps soften skin. Generally low concern." },
  { name: "Aloe Barbadensis Leaf Juice", safe: true, concern: "Soothing/hydrating plant extract. Rare allergy possible." },
  { name: "Silica", safe: true, concern: "Absorbent/texture agent. Generally low concern in non-powder products." },
  { name: "Kaolin", safe: true, concern: "Clay absorbent; helps texture. Generally low concern; can be drying." },
  {
    name: "Retinyl Palmitate",
    safe: false,
    concern:
      "Vitamin A derivative. Can irritate sensitive skin and may increase sun sensitivity. Often marked ‘caution’ for sensitive users.",
  },

  { name: "Caprylic/Capric Triglyceride", safe: true, concern: "Emollient (often from coconut/glycerin). Generally low concern." },

  { name: "Hydroxypropyl Methylcellulose", safe: true, concern: "Thickener/stabilizer. Generally low concern." },

  {
    name: "Titanium Dioxide",
    safe: false,
    concern:
      "Pigment/whitener. Primary concern is inhalation in powders/sprays; in creams/serums it’s typically lower concern.",
  },

  { name: "Ultramarines (CI 77007)", safe: true, concern: "Mineral pigment colorant. Generally low concern." },
],
    recalls: [
      {
        date: "2023-11-15",
        reason:
          "Voluntary recall due to potential microbial contamination in select batches manufactured between June–August 2023.",
        source: "FDA Consumer Alert",
      },
    ],
  },

  "667659368280": {
  barcode: "667659368280",
  name: "Gingham All American Shea Butter Hand Cream",
  brand: "Bath & Body Works",
  category: "Hand Care",
  imageUrl:
    "https://worldofscent.ch/media/26/9a/0e/1755949401/bath-and-body-works-handcreme-gingham-all-american-29ml.jpg?ts=1755951229",
  overallSafe: true,
  safetyScore: 82,
  description:
    "Ultra-rich hand cream with shea butter, cocoa butter, and vitamin E. Bright blend of cherry blossoms and fresh citrus.",

  ingredients: [
    {
      name: "Water",
      safe: true,
      concern: "Primary solvent. Very low concern."
    },
    {
      name: "Glycerin",
      safe: true,
      concern: "Humectant that draws moisture to the skin. Low concern."
    },
    {
      name: "Cetearyl Alcohol",
      safe: true,
      concern: "Fatty alcohol that softens and stabilizes creams. Non-drying."
    },
    {
      name: "Dimethicone",
      safe: true,
      concern: "Forms a protective moisture barrier. Low irritation risk."
    },
    {
      name: "Shea Butter",
      safe: true,
      concern: "Deeply moisturizing butter. Low concern unless allergies."
    },
    {
      name: "Cocoa Seed Butter",
      safe: true,
      concern: "Rich emollient for softening skin. Very low concern."
    },
    {
      name: "Vitamin E",
      safe: true,
      concern: "Antioxidant; helps support skin repair. Rare sensitivities."
    },

    {
      name: "Fragrance",
      safe: false,
      concern:
        "Non-transparent blend of scent ingredients; can trigger irritation or allergies."
    },

    {
      name: "Ceteareth-20",
      safe: true,
      concern: "Emulsifier. Safe in leave-on cosmetics at low levels."
    },

    {
      name: "Methylparaben",
      safe: false,
      concern:
        "Paraben preservative linked to endocrine disruption concerns."
    },
    {
      name: "Propylparaben",
      safe: false,
      concern:
        "Paraben with stronger estrogenic activity; restricted in some countries."
    },
    {
      name: "DMDM Hydantoin",
      safe: false,
      concern:
        "Releases formaldehyde over time. Can cause allergic reactions."
    },

    /* ——— Newly Added Ingredients ——— */

    {
      name: "Phenoxyethanol",
      safe: true,
      concern:
        "Common preservative. Safe in low concentrations; may cause irritation for very sensitive skin."
    },
    {
      name: "PEG-100 Stearate",
      safe: true,
      concern:
        "Emulsifier that helps blend oils and water. Low concern, but PEGs can increase skin penetration of other ingredients."
    },
    {
      name: "Disodium EDTA",
      safe: true,
      concern:
        "Stabilizer that prevents formula separation. Very low irritation risk."
    },
    {
      name: "Linalool",
      safe: false,
      concern:
        "Fragrance allergen that can oxidize and lead to irritation or contact dermatitis."
    },
    {
      name: "Limonene",
      safe: false,
      concern:
        "Citrus-derived fragrance component; oxidizes easily and can cause allergic reactions."
    },
    {
      name: "Hydroxycitronellal",
      safe: false,
      concern:
        "Common fragrance allergen; known skin sensitizer in patch-test studies."
    }
  ],

  recalls: [
    {
      date: "2023-11-15",
      reason:
        "Voluntary recall due to potential microbial contamination in select batches manufactured between June–August 2023.",
      source: "FDA Consumer Alert"
    }
  ]
},


  "800897267001": {
    barcode: "800897267001",
    name: "Lip IV Hydrating Gloss Serum — Mocha Me Wet",
    brand: "NYX Professional Makeup",
    category: "Lip Care",
    imageUrl: "https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dw4ab8c7dd/ProductImages/2025/LIPS/LIP-IV-UPDATES/5-MOCHA-ME-WET/NYX-PMU-Makeup-Lip-LIP-GLOSS-Lip-IV-Hydrating-Gloss-Stain-WSLS05-MOCHA-ME-WET-0800897267001-PackshotWithTexture.jpg",
    overallSafe: true,
    safetyScore: 85,
    description:
      "Glossy lip serum hybrid that delivers high-shine color and deep hydration with hyaluronic acid and vitamin E.",
    ingredients: [
  { name: "Water", safe: true, concern: "Solvent/base. Generally low concern." },
  { name: "Diisostearyl Malate", safe: true, concern: "Emollient that improves slip and comfort. Generally low concern." },
  { name: "Polyglyceryl-2 Triisostearate", safe: true, concern: "Emulsifier/emollient. Generally low concern." },
  { name: "Glycerin", safe: true, concern: "Humectant that draws moisture. Generally low concern." },
  { name: "Octyldodecanol", safe: true, concern: "Emollient fatty alcohol for slip. Can irritate very sensitive users (uncommon)." },
  { name: "Cetyl Dimethicone", safe: true, concern: "Silicone emulsifier for smooth texture. Generally low concern." },
  { name: "Polyglyceryl-6 Polyhydroxystearate", safe: true, concern: "Emulsifier/texture agent. Generally low concern." },
  { name: "Polyglyceryl-6 Polyricinoleate", safe: true, concern: "Emulsifier derived from castor oil. Generally low concern." },
  { name: "Synthetic Wax", safe: false, concern: "Used as a softener and moisturizer in cosmetic products. Toxic impurities may remain present, particularly MOAH, a group of hydrocarbons whose compounds are suspected of being carcinogenic and genotoxic." },

  {
    name: "Titanium Dioxide",
    safe: false,
    concern:
      "Colorant/whitener. Main concern is inhalation in powders/sprays. The IARC has classified it as a possible human carcinogen. Has been banned in the EU as a food additive",
  },

  { name: "1,2-Hexanediol", safe: true, concern: "Humectant/preservative booster. Generally low concern." },
  { name: "Sodium Chloride", safe: true, concern: "Viscosity/texture adjustment. Generally low concern." },
  { name: "Dicaprylyl Carbonate", safe: true, concern: "Lightweight emollient for silky feel. Generally low concern." },

  {
    name: "Phenoxyethanol",
    safe: false,
    concern:
      "Preservative, used to prevent the growth of microorganisms. Commonly used; can irritate very sensitive users. Often marked ‘caution’ for people prone to reactions.",
  },

  { name: "Disteardimonium Hectorite", safe: true, concern: "Thickener/stabilizer (clay-like). Generally low concern." },
  { name: "Ethylcellulose", safe: true, concern: "Thickener/film former. Generally low concern." },
  { name: "Propylene Copolymer", safe: true, concern: "Film former for long-wear feel. Generally low concern." },
  { name: "Caprylyl Glycol", safe: true, concern: "Humectant + preservative booster. Generally low concern." },
  { name: "Polyglycerin-6", safe: true, concern: "Humectant/emollient. Generally low concern." },

  { name: "Yellow 5", safe: false, concern: "Synthetic dye. Can trigger sensitivity in a small number of users." },
  { name: "Magnesium Sulfate", safe: true, concern: "Viscosity/texture support. Generally low concern." },
  { name: "Red 33", safe: false, concern: "Synthetic dye. Potential irritant for sensitive users." },
  { name: "Yellow 6", safe: false, concern: "Synthetic dye. Potential sensitivity for some users." },

  {
    name: "Aroma / Flavor",
    safe: false,
    concern:
      "Flavoring can irritate sensitive lips for some users. If you get stinging, consider avoiding flavored products.",
  },

  { name: "Red 28", safe: false, concern: "Colorant. May cause sensitivity in some users." },
  { name: "Blue 1", safe: false, concern: "Colorant. May cause sensitivity in some users." },

  { name: "Cyanocobalamin", safe: true, concern: "Vitamin B12 (color/conditioning). Generally low concern." },
  { name: "Tocopherol", safe: true, concern: "Vitamin E antioxidant. Rare irritation possible." },

  { name: "Pentaerythrityl Hydroxyhydrocinnamate", safe: true, concern: "Antioxidant stabilizer. Generally low concern in small amounts." },

  { name: "Coconut Liquid Endosperm", safe: true, concern: "Coconut-derived conditioning component. Generally low concern." },
],
    recalls: [],
  },

  "792850897687": {
    barcode: "792850897687",
    name: "Strawberry Moisturizing Lip Balm",
    brand: "Burt's Bees",
    category: "Lip Care",
    imageUrl: "https://images.heb.com/is/image/HEBGrocery/002178573-1",
    overallSafe: true,
    safetyScore: 94,
    description:
      "Natural moisturizing lip balm made with beeswax and fruit extracts. Conditions and softens lips with strawberry flavor.",
    ingredients: [
  { name: "Sunflower Seed Oil", safe: true, concern: "Emollient oil that helps soften and protect lips. Generally low concern." },
  { name: "Coconut Oil", safe: true, concern: "Moisturizing oil. Can be comedogenic for some skin types (less relevant on lips)." },
  { name: "Beeswax", safe: true, concern: "Occlusive wax that forms a protective barrier. Generally low concern." },
  { name: "Castor Seed Oil", safe: true, concern: "Glossy emollient that helps bind and smooth. Rare sensitivity possible." },

  {
    name: "Fragrance* (Natural Fragrance)",
    safe: false,
    concern:
      "Even ‘natural fragrance’ can contain allergenic compounds. Common trigger for lip sensitivity/irritation in some users.",
  },

  {
    name: "Lanolin",
    safe: false,
    concern:
      "Moisturizing wax from wool. Helpful for dryness, but can trigger allergies/sensitivity in some people (especially on lips).",
  },

  { name: "Shea Butter", safe: true, concern: "Rich emollient butter that reduces dryness. Generally low concern." },
  { name: "Cocoa Seed Butter", safe: true, concern: "Butter that softens/conditions. Generally low concern." },

  { name: "Vitamin E", safe: true, concern: "Antioxidant that helps stabilize oils. Rare irritation possible." },

  { name: "Rebaudioside A", safe: true, concern: "Stevia-derived sweetener/flavor component. Generally low concern." },

  {
    name: "Soybean Oil",
    safe: true,
    concern:
      "Emollient oil. Generally low concern, but note for users with soy allergies/sensitivities.",
  },
],

    recalls: [],
  },
};

export function lookupProduct(barcodeRaw: string): Product | null {
  const key = digitsOnly(barcodeRaw);

  // exact match
  if (products[key]) return products[key];

  // trim leading zeros for scans 
  const noLeadingZeros = key.replace(/^0+/, "");
  for (const k of Object.keys(products)) {
    const kk = digitsOnly(k);
    if (kk === noLeadingZeros) return products[k];
  }

  return null;
}