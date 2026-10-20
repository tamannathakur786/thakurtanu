/**
 * Riwaaz Clothing - Curated Product Catalog
 * Contact / WhatsApp: +91 8580540470
 */

const PRODUCTS_DATA = [
  {
    id: "RWZ-101",
    title: "Gulnaar Raw Silk Embroidered Anarkali Set",
    subtitle: "3-Piece Set with Organza Zardozi Dupatta & Churidar",
    handle: "gulnaar-raw-silk-embroidered-anarkali-set",
    category: "anarkali",
    categoryLabel: "Anarkali Suit",
    occasion: "wedding",
    occasionLabel: "Wedding & Festive",
    fabric: "Raw Silk",
    color: "Deep Ruby Crimson",
    colorHex: "#7A1A2E",
    price: 3899,
    compareAtPrice: 6499,
    discount: "40% OFF",
    rating: 4.9,
    reviewsCount: 48,
    isNew: true,
    isBestseller: true,
    featured: true,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/Purple_anarkali_suit_for_women.png?v=1776174043",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/002-03_17.jpg?v=1776174043",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/002-03_3.jpg?v=1776174043"
    ],
    description: "An ode to royal Rajputana grace. Handcrafted in luxurious pure raw silk with fine zardozi and antique tilla thread embroidery along the sweetheart neckline and cuffs. Paired with a featherweight sheer organza dupatta adorned with hand-placed scalloped gota borders and matching tailored churidar.",
    details: [
      "Kurta Fabric: Pure Raw Silk with soft inner cotton mulmul lining",
      "Dupatta: Sheer scalloped Organza with handcrafted Gota Patti work",
      "Bottom: Matching Raw Silk blend tailored churidar with elasticated back",
      "Work: Zardozi, Tilla Embroidery & Hand Sequin Work",
      "Fit: Flared Anarkali Silhouette with 4.5m flare",
      "Care: Dry Clean Only"
    ]
  },
  {
    id: "RWZ-102",
    title: "Noor Chanderi Silk Kurta Dupatta Set",
    subtitle: "Embroidered Straight Kurta with Tonal Zari Dupatta",
    handle: "noor-chanderi-silk-kurta-dupatta-set",
    category: "kurta-sets",
    categoryLabel: "Kurta Dupatta Set",
    occasion: "festive",
    occasionLabel: "Festive & Puja",
    fabric: "Chanderi Silk",
    color: "Royal Emerald Sage",
    colorHex: "#1E5E4E",
    price: 2699,
    compareAtPrice: 4299,
    discount: "37% OFF",
    rating: 4.8,
    reviewsCount: 34,
    isNew: true,
    isBestseller: false,
    featured: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/018-04.png?v=1781847342",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/018-04_2_ff.jpg?v=1771221101",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/018-04_5.jpg?v=1771221101"
    ],
    description: "Exquisite hand-woven Chanderi silk kurta featuring fine floral thread motifs and a flattering V-neckline framed with micro-pearl detailing. Accompanied by straight cropped trousers with ankle slit work and a luminous Chanderi woven zari dupatta.",
    details: [
      "Kurta Fabric: Authentic Chanderi Silk with Mulmul Lining",
      "Dupatta: Chanderi with woven Gold Zari Borders",
      "Bottom: Straight Pants with side pocket and drawstring waist",
      "Work: Hand Ari Thread Embroidery & Micro-Pearl highlights",
      "Fit: Straight Comfort Fit",
      "Care: Gentle Hand Wash or Dry Clean"
    ]
  },
  {
    id: "RWZ-103",
    title: "Mehrunisa Velvet Embroidered Kurta Ensemble",
    subtitle: "Heavy Kashmiri Tilla & Dori Embroidered Kurta with Silk Dupatta",
    handle: "mehrunisa-velvet-embroidered-kurta-ensemble",
    category: "velvet-luxe",
    categoryLabel: "Velvet Luxe",
    occasion: "wedding",
    occasionLabel: "Winter Wedding & Reception",
    fabric: "Micro Velvet",
    color: "Imperial Wine Purple",
    colorHex: "#4A0E17",
    price: 4599,
    compareAtPrice: 7999,
    discount: "43% OFF",
    rating: 5.0,
    reviewsCount: 62,
    isNew: false,
    isBestseller: true,
    featured: true,
    sizes: ["M", "L", "XL", "XXL", "3XL"],
    images: [
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/002-03_17.jpg?v=1776174043",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/Purple_anarkali_suit_for_women.png?v=1776174043",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/002-03_8.jpg?v=1"
    ],
    description: "Indulge in royal opulence with our signature plush micro-velvet ensemble. Rich Kashmiri tilla embroidery graces the neckline, hemline, and sleeves, reflecting heritage artisan craftsmanship. Paired with a contrast tissue silk dupatta and velvet straight trousers.",
    details: [
      "Kurta Fabric: Premium 9000 Micro Velvet with satin lining",
      "Dupatta: Dual-tone Banarasi Silk Tissue with antique golden fringe",
      "Bottom: Plush Velvet tailored trousers",
      "Work: Dense Kashmiri Tilla Needlework and Gota detailing",
      "Fit: Regular Royal Fit",
      "Care: Strictly Dry Clean"
    ]
  },
  {
    id: "RWZ-104",
    title: "Riwaaz Festive Co-Ord Set in Rosewood Crepe",
    subtitle: "Asymmetrical High-Low Peplum Tunic with Flared Palazzos",
    handle: "festive-coord-set-rosewood-crepe",
    category: "co-ords",
    categoryLabel: "Co-Ord Sets",
    occasion: "festive",
    occasionLabel: "Festive & Cocktail",
    fabric: "Georgette Crepe",
    color: "Rosewood Rust",
    colorHex: "#B85D43",
    price: 2299,
    compareAtPrice: 3899,
    discount: "41% OFF",
    rating: 4.7,
    reviewsCount: 29,
    isNew: true,
    isBestseller: false,
    featured: false,
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/Green_shirt_for_women.jpg?v=1773645469",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/347-03_2.jpg?v=1773645469",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/347-03_4.jpg?v=1773645469"
    ],
    description: "A contemporary take on traditional festive wear. Designed in fluid georgette crepe, this modern co-ord features a cinched waistline with metallic thread tassels, subtle mirror work, and voluminous wide-leg flared palazzos for effortless glamour.",
    details: [
      "Fabric: Breathable Heavy Georgette Crepe",
      "Top: Asymmetrical high-low peplum silhouette with bell sleeves",
      "Bottom: High-waisted wide-leg palazzo pants with concealed zipper",
      "Work: Foil Mirror Accents & Metallic Thread Highlights",
      "Fit: Relaxed Flattering Fit",
      "Care: Hand Wash Separately in Cold Water"
    ]
  },
  {
    id: "RWZ-105",
    title: "Sufiya Hand-Block Printed Cotton Kurta Set",
    subtitle: "Bagru Block Printed Pure Cotton Kurta with Kota Doria Dupatta",
    handle: "sufiya-hand-block-printed-cotton-kurta-set",
    category: "daily-cotton",
    categoryLabel: "Everyday Cotton",
    occasion: "office",
    occasionLabel: "Office & Everyday Chic",
    fabric: "Pure Cotton",
    color: "Indigo & Ivory",
    colorHex: "#2C3E50",
    price: 1899,
    compareAtPrice: 2999,
    discount: "36% OFF",
    rating: 4.9,
    reviewsCount: 51,
    isNew: false,
    isBestseller: true,
    featured: true,
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    images: [
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/347-03_5.jpg?v=1773645469",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/Green_shirt_for_women.jpg?v=1773645469",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/347-03_8.jpg?v=1773645469"
    ],
    description: "Rooted in the timeless artisan heritage of Rajasthan. Crafted from 100% natural breathable 60s cotton using authentic Bagru hand-block botanical stamps. Paired with a delicate Kota Doria dupatta that floats effortlessly in summer breezes.",
    details: [
      "Kurta Fabric: 100% Cambric 60s Pure Cotton",
      "Dupatta: Hand-dyed pure Kota Doria with tassel trim",
      "Bottom: Breathable cigarette pants with deep utility pockets",
      "Work: Traditional Hand Block Printing with natural vegetable dyes",
      "Fit: Straight Day-long Comfort Cut",
      "Care: Cold Machine Wash or Gentle Hand Wash"
    ]
  },
  {
    id: "RWZ-106",
    title: "Chandrika Georgette Gharara Festive Suit",
    subtitle: "Short Embroidered Kurti with Tiered Flared Gharara & Net Dupatta",
    handle: "chandrika-georgette-gharara-festive-suit",
    category: "anarkali",
    categoryLabel: "Anarkali & Gharara",
    occasion: "wedding",
    occasionLabel: "Wedding & Sangeet",
    fabric: "Faux Georgette",
    color: "Mustard Gold & Haldi Yellow",
    colorHex: "#E6A100",
    price: 3299,
    compareAtPrice: 5499,
    discount: "40% OFF",
    rating: 4.8,
    reviewsCount: 22,
    isNew: true,
    isBestseller: false,
    featured: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/018-04_9.jpg?v=1771221101",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/018-04.png?v=1781847342",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/018-04_10.jpg?v=1771221101"
    ],
    description: "The quintessential Haldi & Sangeet showstopper. Featuring a luminous mustard gold short tunic heavily embroidered with sequin lattices and mirror laces, paired with a lavishly flared tiered gharara that sweeps with dramatic flair as you twirl.",
    details: [
      "Kurta Fabric: Lightweight Soft Georgette with Shantoon lining",
      "Gharara: Dramatic double-tier flared silhouette",
      "Dupatta: Soft net with embroidered booti and four-sided golden lace",
      "Work: Sequin, Thread Embroidery & Gota Patti Lace",
      "Fit: Royal Festive Fit",
      "Care: Dry Clean Only"
    ]
  },
  {
    id: "RWZ-107",
    title: "Tara Embroidered Sharara Set for Girls",
    subtitle: "Mini Festive Sharara Suit with Tie-up Back & Tassels",
    handle: "tara-embroidered-sharara-set-for-girls",
    category: "girls-festive",
    categoryLabel: "Girls Festive",
    occasion: "festive",
    occasionLabel: "Kids Festive & Party",
    fabric: "Georgette with Cotton Lining",
    color: "Blush Baby Pink",
    colorHex: "#F4C2C2",
    price: 1599,
    compareAtPrice: 2799,
    discount: "43% OFF",
    rating: 4.9,
    reviewsCount: 41,
    isNew: false,
    isBestseller: true,
    featured: false,
    sizes: ["4-5 Yrs", "6-7 Yrs", "8-9 Yrs", "10-11 Yrs", "12-13 Yrs", "14-15 Yrs"],
    images: [
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/Gemini_Generated_Image_texqcatexqcatexq.png?v=1769519042",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/Gemini_Generated_Image_nhe6zinhe6zinhe6.png?v=1769519042",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/Gemini_Generated_Image_gs9al0gs9al0gs9a.png?v=1769519042"
    ],
    description: "Dress your little princess in whimsical royal charm! Soft blush pink kurti adorned with delicate floral threadwork and skin-friendly soft cotton lining. The twirly sharara guarantees joy without itchiness for long festive celebrations.",
    details: [
      "Fabric: Soft Georgette outer with 100% Breathable Cotton inner",
      "Bottom: Elasticated tiered sharara for ultimate ease of movement",
      "Dupatta: Lightweight net scarf with playful pompoms",
      "Work: Gentle Resham Embroidery & Subdued Foil Sequins",
      "Fit: Comfortable Kids Festive Fit",
      "Care: Gentle Hand Wash"
    ]
  },
  {
    id: "RWZ-108",
    title: "Zehra Pure Organza Silk Kurta Set",
    subtitle: "Pastel Mint Organza Kurta with Handpainted Florals & Scallop Dupatta",
    handle: "zehra-pure-organza-silk-kurta-set",
    category: "kurta-sets",
    categoryLabel: "Kurta Dupatta Set",
    occasion: "wedding",
    occasionLabel: "Day Wedding & Mehendi",
    fabric: "Organza Silk",
    color: "Pastel Mint Green",
    colorHex: "#A2C4C9",
    price: 3499,
    compareAtPrice: 5999,
    discount: "42% OFF",
    rating: 4.8,
    reviewsCount: 19,
    isNew: true,
    isBestseller: false,
    featured: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/Green_shirt_for_women.jpg?v=1773645469",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/018-04_5.jpg?v=1771221101",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/018-04.png?v=1781847342"
    ],
    description: "Breathe fresh ethereal elegance with our pastel mint organza masterpiece. Featuring delicate hand-painted pastel floral bouquets highlighted with micro-sequins, paired with a matching scalloped cutwork dupatta and silk cigarette pants.",
    details: [
      "Kurta Fabric: Premium Sheer Organza Silk with Butter Crepe lining",
      "Dupatta: Organza with hand cutwork scalloped borders",
      "Bottom: Santoon Silk straight pants",
      "Work: Hand-painted Botanicals & Cutdana Embroidery",
      "Fit: Straight Elegant Fit",
      "Care: Dry Clean Only"
    ]
  },
  {
    id: "RWZ-109",
    title: "Ananya Banarasi Brocade Kalidar Kurta Set",
    subtitle: "Heavy Golden Zari Woven Kurta with Silk Dupatta",
    handle: "ananya-banarasi-brocade-kalidar-kurta-set",
    category: "kurta-sets",
    categoryLabel: "Kurta Dupatta Set",
    occasion: "wedding",
    occasionLabel: "Festive & Wedding",
    fabric: "Banarasi Silk",
    color: "Royal Peacock Teal",
    colorHex: "#0F4D59",
    price: 4199,
    compareAtPrice: 6999,
    discount: "40% OFF",
    rating: 4.9,
    reviewsCount: 38,
    isNew: false,
    isBestseller: true,
    featured: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/002-03_17.jpg?v=1776174043",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/018-04_2_ff.jpg?v=1771221101",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/018-04.png?v=1781847342"
    ],
    description: "Rich Banarasi weaving meets contemporary kalidar tailoring. Woven with antique golden zari motifs along the kalis, this regal ensemble commands attention at festive soirées and royal wedding receptions.",
    details: [
      "Kurta Fabric: Handloom Banarasi Brocade Silk",
      "Dupatta: Dual-tone tissue silk with woven temple borders",
      "Bottom: Raw silk flared pants",
      "Work: Authentic Kadwa Banarasi Zari Weave",
      "Fit: Structured Kalidar Silhouette",
      "Care: Dry Clean Recommended"
    ]
  },
  {
    id: "RWZ-110",
    title: "Aafreen Velvet Kaftan Kurta with Embroidered Belt",
    subtitle: "Comfort Luxe Velvet Kaftan with Dori Embellished Neck",
    handle: "aafreen-velvet-kaftan-kurta",
    category: "velvet-luxe",
    categoryLabel: "Velvet Luxe",
    occasion: "festive",
    occasionLabel: "Evening & Party",
    fabric: "Micro Velvet",
    color: "Midnight Royal Navy",
    colorHex: "#152238",
    price: 2999,
    compareAtPrice: 4899,
    discount: "39% OFF",
    rating: 4.7,
    reviewsCount: 16,
    isNew: true,
    isBestseller: false,
    featured: false,
    sizes: ["Free Size (S to XXL)"],
    images: [
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/Purple_anarkali_suit_for_women.png?v=1776174043",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/002-03_3.jpg?v=1776174043",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/Green_shirt_for_women.jpg?v=1773645469"
    ],
    description: "Luxe comfort redefined. A rich midnight navy micro-velvet kaftan adorned with antique gold marodi and sequin borders. Features an adjustable interior drawstring and a complimentary embroidered belt to cinch the waist as desired.",
    details: [
      "Fabric: 9000 Micro Velvet with ultra-soft drape",
      "Silhouette: Flowing Kaftan with side slits and kimono sleeves",
      "Belt: Detachable zardozi embroidered statement belt",
      "Work: Marodi Stitch & Hand Sequin Work",
      "Fit: Relaxed Free-Size silhouette",
      "Care: Dry Clean Only"
    ]
  },
  {
    id: "RWZ-111",
    title: "Maya Cotton Slub Embroidered Everyday Suit",
    subtitle: "Straight Kurta with Straight Pants & Mulmul Floral Dupatta",
    handle: "maya-cotton-slub-embroidered-everyday-suit",
    category: "daily-cotton",
    categoryLabel: "Everyday Cotton",
    occasion: "office",
    occasionLabel: "Daily & Workwear",
    fabric: "Cotton Slub",
    color: "Warm Sand Taupe",
    colorHex: "#C2B29D",
    price: 1699,
    compareAtPrice: 2799,
    discount: "39% OFF",
    rating: 4.8,
    reviewsCount: 45,
    isNew: false,
    isBestseller: true,
    featured: false,
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/347-03_4.jpg?v=1773645469",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/347-03_2.jpg?v=1773645469",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/347-03_5.jpg?v=1773645469"
    ],
    description: "Designed for all-day breathability and effortless grace. Crafted from premium textured cotton slub fabric with subtle threadwork on the yoke, paired with comfortable ankle-length cigarette trousers and a light mulmul printed dupatta.",
    details: [
      "Kurta Fabric: 100% Breathable Slub Cotton",
      "Dupatta: Soft Malmal with hand screen print",
      "Bottom: Tailored straight cotton trousers with side pockets",
      "Work: Subtle Yoke Threadwork & Fabric Buttons",
      "Fit: Classic Regular Fit",
      "Care: Machine Wash Friendly"
    ]
  },
  {
    id: "RWZ-112",
    title: "Roshni Dola Silk Gota Patti Kurta Set",
    subtitle: "Heavy Gota Patti Embellished Kurta with Banarasi Dupatta",
    handle: "roshni-dola-silk-gota-patti-kurta-set",
    category: "kurta-sets",
    categoryLabel: "Kurta Dupatta Set",
    occasion: "festive",
    occasionLabel: "Festive Celebrations",
    fabric: "Dola Silk",
    color: "Rani Hot Pink",
    colorHex: "#C71585",
    price: 2899,
    compareAtPrice: 4799,
    discount: "40% OFF",
    rating: 4.9,
    reviewsCount: 27,
    isNew: true,
    isBestseller: true,
    featured: true,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/002-03_3.jpg?v=1776174043",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/Purple_anarkali_suit_for_women.png?v=1776174043",
      "https://cdn.shopify.com/s/files/1/0632/9031/0809/files/018-04.png?v=1781847342"
    ],
    description: "Celebrate the festive glow with radiant Rani Pink Dola silk. Lavishly accented with authentic Jaipur Gota Patti ribbons and mirror motifs, accompanied by a rich contrast dupatta and comfortable silk bottoms.",
    details: [
      "Kurta Fabric: Pure Dola Silk with soft lining",
      "Dupatta: Woven Art Silk with scalloped Gota border",
      "Bottom: Silk blend tapered pants",
      "Work: Jaipur Gota Patti, Zari ribbons & Mirror work",
      "Fit: Straight Festive Cut",
      "Care: Dry Clean Only"
    ]
  }
];

// WhatsApp Configuration
const WHATSAPP_CONFIG = {
  phoneNumber: "8580540470",
  internationalNumber: "+918580540470",
  formattedNumber: "+91 85805 40470",
  brandName: "Riwaaz Clothing",
  defaultGreeting: "Hi Riwaaz Clothing! I am interested in your ethnic wear collection. Could you please assist me?"
};

// Size Guide Data (Inches & CM)
const SIZE_GUIDE_DATA = {
  inches: [
    { size: "XS", bust: "32-34", waist: "26-28", hip: "36-38", kurtaLength: "46" },
    { size: "S", bust: "34-36", waist: "28-30", hip: "38-40", kurtaLength: "46" },
    { size: "M", bust: "36-38", waist: "30-32", hip: "40-42", kurtaLength: "47" },
    { size: "L", bust: "38-40", waist: "32-34", hip: "42-44", kurtaLength: "47" },
    { size: "XL", bust: "40-42", waist: "34-36", hip: "44-46", kurtaLength: "48" },
    { size: "XXL", bust: "42-44", waist: "36-38", hip: "46-48", kurtaLength: "48" },
    { size: "3XL", bust: "44-46", waist: "38-40", hip: "48-50", kurtaLength: "48" }
  ],
  cm: [
    { size: "XS", bust: "81-86", waist: "66-71", hip: "91-96", kurtaLength: "117" },
    { size: "S", bust: "86-91", waist: "71-76", hip: "96-101", kurtaLength: "117" },
    { size: "M", bust: "91-96", waist: "76-81", hip: "101-106", kurtaLength: "119" },
    { size: "L", bust: "96-101", waist: "81-86", hip: "106-111", kurtaLength: "119" },
    { size: "XL", bust: "101-106", waist: "86-91", hip: "111-116", kurtaLength: "122" },
    { size: "XXL", bust: "106-111", waist: "91-96", hip: "116-121", kurtaLength: "122" },
    { size: "3XL", bust: "111-116", waist: "96-101", hip: "121-127", kurtaLength: "122" }
  ]
};

// Customer Reviews Data
const CUSTOMER_REVIEWS = [
  {
    name: "Pooja Sharma",
    city: "New Delhi",
    rating: 5,
    date: "August 2026",
    product: "Gulnaar Raw Silk Embroidered Anarkali Set",
    comment: "The quality of the raw silk and the zardozi work is breathtaking! It looks like a designer couture piece worth ₹20,000+. I contacted them on WhatsApp and their team answered all my questions within minutes and helped me pick the right size.",
    verified: true
  },
  {
    name: "Aanya Deshmukh",
    city: "Mumbai",
    rating: 5,
    date: "August 2026",
    product: "Mehrunisa Velvet Embroidered Kurta Ensemble",
    comment: "Ordered this for my sister's wedding reception. The velvet is super rich and the tilla embroidery is authentic and soft against the skin. WhatsApp ordering was effortless!",
    verified: true
  },
  {
    name: "Rituja Agarwal",
    city: "Jaipur",
    rating: 5,
    date: "July 2026",
    product: "Sufiya Hand-Block Printed Cotton Kurta Set",
    comment: "Being from Jaipur, I know authentic block prints, and Riwaaz nails it! Pure breathable cotton, gorgeous fit, and having deep pockets in the pants is such a blessing. Highly recommended!",
    verified: true
  },
  {
    name: "Simran Kaur",
    city: "Chandigarh",
    rating: 5,
    date: "July 2026",
    product: "Chandrika Georgette Gharara Festive Suit",
    comment: "Wore this for a sangeet night and received non-stop compliments all evening. The flare of the gharara is unreal! Direct WhatsApp customer care gave me real-time tracking updates.",
    verified: true
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUCTS_DATA, WHATSAPP_CONFIG, SIZE_GUIDE_DATA, CUSTOMER_REVIEWS };
}
