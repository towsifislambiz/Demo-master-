// Ghorer Bazar (ঘরের বাজার) - Pure & Organic Food Catalog Data

export const GHORER_BAZAR_BRAND = {
  name: 'ঘরের বাজার',
  nameEn: 'Ghorer Bazar',
  tagline: 'নিরাপদ খাদ্য, সুস্থ জীবন',
  subTagline: '১০০% বিশুদ্ধ ও প্রাকৃতিক খাদ্য সরাসরি আপনার ঘরে',
  hotline: '০১৭৯৯-৮৮৭৭৬৬',
  whatsapp: '০১৯৭৭-১১২২৩৩',
  email: 'support@ghorerbazar.com',
  address: 'বাড়ি ১২, রোড ৫, সেক্টর ৩, উত্তরা, ঢাকা-১২৩০',
  deliveryInsideDhaka: 70,
  deliveryOutsideDhaka: 130,
  freeDeliveryThreshold: 2000
};

export const GHORER_BAZAR_CATEGORIES = [
  { id: 'all', nameBn: 'সব পণ্য', nameEn: 'All Products', icon: 'Sparkles', count: 28 },
  { id: 'honey', nameBn: 'প্রাকৃতিক মধু', nameEn: 'Pure Honey', icon: 'Flame', count: 5 },
  { id: 'ghee-oil', nameBn: 'গাওয়া ঘি ও তেল', nameEn: 'Ghee & Oils', icon: 'Droplets', count: 6 },
  { id: 'dates', nameBn: 'প্রিমিয়াম খেজুর', nameEn: 'Royal Dates', icon: 'Sun', count: 5 },
  { id: 'nuts-seeds', nameBn: 'বাদাম ও সুপারফুড', nameEn: 'Nuts & Seeds', icon: 'Nut', count: 5 },
  { id: 'spices', nameBn: 'খাঁটি গুঁড়া মসলা', nameEn: 'Pure Spices', icon: 'Flame', count: 4 },
  { id: 'tea-jaggery', nameBn: 'চা ও খাঁটি গুড়', nameEn: 'Tea & Jaggery', icon: 'Coffee', count: 3 }
];

export const GHORER_BAZAR_TRUST_PILLARS = [
  {
    icon: 'ShieldCheck',
    titleBn: '১০০% নির্ভেজাল গ্যারান্টি',
    descBn: 'কোনো কেমিক্যাল বা প্রিজারভেটিভ নেই, সম্পূর্ণ খাঁটি'
  },
  {
    icon: 'Award',
    titleBn: 'ল্যাব টেস্ট সার্টিফাইড',
    descBn: 'প্রতিটি লট অনুমোদিত ল্যাবে কঠোরভাবে পরীক্ষিত'
  },
  {
    icon: 'Truck',
    titleBn: 'দ্রুত হোম ডেলিভারি',
    descBn: 'সারা দেশে ৪৮ থেকে ৭২ ঘণ্টার মধ্যে পৌঁছানো হয়'
  },
  {
    icon: 'CheckCircle2',
    titleBn: 'পণ্য দেখে মূল্য পরিশোধ',
    descBn: 'ডেলিভারিম্যানের সামনে চেক করে ক্যাশ অন ডেলিভারি'
  }
];

export const GHORER_BAZAR_PRODUCTS = [
  // 1. HONEY
  {
    id: 'gb-honey-sundarban',
    title: 'সুন্দরবনের প্রাকৃতিক চাকের খাঁটি মধু',
    titleEn: 'Sundarban Raw Wild Forest Honey',
    category: 'honey',
    categoryBn: 'প্রাকৃতিক মধু',
    image: '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.webp',
    badge: 'বেস্ট সেলার',
    badgeType: 'bestseller',
    rating: 4.9,
    ratingCount: 512,
    labTested: true,
    inStock: true,
    shortDesc: 'সুন্দরবনের গভীর ম্যানগ্রোভ থেকে সরাসরি মৌয়ালদের মাধ্যমে সংগৃহীত অপরিশোধিত ও খাঁটি প্রাকৃতিক মধু।',
    weights: [
      { label: '২৫০ গ্রাম', price: 480, oldPrice: 550 },
      { label: '৫০০ গ্রাম', price: 890, oldPrice: 990, isDefault: true },
      { label: '১ কেজি', price: 1750, oldPrice: 1950 }
    ],
    features: [
      'সুন্দরবনের গভীর খলিসা ও গরান ফুলের খাঁটি চাকের মধু',
      'কোনো প্রকার কৃত্রিম চিনি বা হিট প্রসেসিং ছাড়া অপরিশোধিত',
      'প্রাকৃতিক রোগ প্রতিরোধ ক্ষমতা ও হজমশক্তি বাড়াতে অত্যন্ত কার্যকরী',
      'বিএসটিআই ও ল্যাব টেস্টে ১০০% বিশুদ্ধ প্রমাণিত'
    ]
  },
  {
    id: 'gb-honey-nuts',
    title: 'প্রিমিয়াম হানি নাটস এনার্জি বুস্টার',
    titleEn: 'Premium Honey Infused Mixed Nuts',
    category: 'honey',
    categoryBn: 'প্রাকৃতিক মধু',
    image: '/organic-images/Honey_jar_on_wooden_board_d5a41667.webp',
    badge: 'হট ডিল',
    badgeType: 'hot',
    rating: 4.9,
    ratingCount: 388,
    labTested: true,
    inStock: true,
    shortDesc: 'খাঁটি চাকের মধুতে ভেজানো কাজুবাদাম, কাঠবাদাম, পেস্তা, আখরোট ও রোস্টেড সিডসের রাজকীয় পুষ্টি মিশ্রণ।',
    weights: [
      { label: '৪০০ গ্রাম', price: 790, oldPrice: 890 },
      { label: '৮০০ গ্রাম', price: 1490, oldPrice: 1690, isDefault: true }
    ],
    features: [
      'প্রিমিয়াম গ্রেড কাজু, কাঠবাদাম, আখরোট ও পাম্পকিন সিডস',
      'সুন্দরবনের আসল চাকের মধুতে পরিপক্বভাবে ভেজানো',
      'দ্রুত শারীরিক শক্তি ও স্ট্যামিনা বৃদ্ধিতে সহায়ক',
      'বাচ্চা ও বড়দের দৈনন্দিন স্বাস্থ্যকর নাশতার জন্য সেরা'
    ]
  },
  {
    id: 'gb-honey-mustard',
    title: 'সরিষা ফুলের ক্রিমি সাদা মধু',
    titleEn: 'Mustard Flower Creamy Crystallized Honey',
    category: 'honey',
    categoryBn: 'প্রাকৃতিক মধু',
    image: '/organic-images/Jar_of_mustard_flower_honey_c9fc8162.webp',
    badge: 'প্রাকৃতিক',
    badgeType: 'pure',
    rating: 4.8,
    ratingCount: 245,
    labTested: true,
    inStock: true,
    shortDesc: 'শীতকালে সরিষা ফুলের খাঁটি নেকটার থেকে তৈরি প্রাকৃতিকভাবে জমাট বাঁধা সুস্বাদু ক্রিম মধু।',
    weights: [
      { label: '৫০০ গ্রাম', price: 450, oldPrice: 500, isDefault: true },
      { label: '১ কেজি', price: 850, oldPrice: 950 }
    ],
    features: [
      'সরিষা ফুলের মৌমাছি পালনের প্রাকৃতিকভাবে জমাট সাদা মধু',
      'ঘি বা মাখনের মতো ব্রেডে স্প্রেড করে খাওয়ার জন্য চমৎকার',
      'সর্দি, কাশি ও গলার খুশখুশ উপশমে চমৎকার কাজ করে',
      '১০০% প্রাকৃতিক গ্লুকোজে ভরপুর'
    ]
  },
  {
    id: 'gb-honey-khalisa',
    title: 'সুন্দরবনের খলিসা ফুলের বিরল মধু',
    titleEn: 'Sundarban Rare Khalisa Flower Honey',
    category: 'honey',
    categoryBn: 'প্রাকৃতিক মধু',
    image: '/organic-images/Honey_dripping_from_wooden_drizzler_9704f3eb.webp',
    badge: 'এক্সক্লুসিভ',
    badgeType: 'hot',
    rating: 5.0,
    ratingCount: 176,
    labTested: true,
    inStock: true,
    shortDesc: 'সুন্দরবনের সবচেয়ে দামি ও সুগন্ধযুক্ত খলিসা ফুলের সীমিত সময়ের আসল মৌসুমী মধু।',
    weights: [
      { label: '২৫০ গ্রাম', price: 580, oldPrice: 650 },
      { label: '৫০০ গ্রাম', price: 1100, oldPrice: 1250, isDefault: true },
      { label: '১ কেজি', price: 2150, oldPrice: 2400 }
    ],
    features: [
      'বছরের নির্দিষ্ট কয়েক সপ্তাহে ফোটা খলিসা ফুলের নেকটার',
      'হালকা সোনালী রঙ ও অতুলনীয় প্রাকৃতিক সুবাস',
      'মেডিসিনাল ভ্যালু ও অ্যান্টিঅক্সিডেন্টে অত্যন্ত সমৃদ্ধ',
      'ল্যাব টেস্টে এইচএমএফ লেভেল আন্তর্জাতিক মানসম্পন্ন'
    ]
  },
  {
    id: 'gb-honey-kalojira',
    title: 'কালোজিরা ফুলের গাঢ় ভেষজ মধু',
    titleEn: 'Black Seed (Kalojira) Flower Raw Honey',
    category: 'honey',
    categoryBn: 'প্রাকৃতিক মধু',
    image: '/organic-images/Glass_jar_of_honey_13be82ed.webp',
    badge: 'ভেষজ গুণ',
    badgeType: 'pure',
    rating: 4.9,
    ratingCount: 290,
    labTested: true,
    inStock: true,
    shortDesc: 'কালোজিরা ফুলের খেত থেকে সংগৃহীত বিশেষ সুগন্ধি ও মহাঔষধি গুণসম্পন্ন গাঢ় মধু।',
    weights: [
      { label: '৫০০ গ্রাম', price: 650, oldPrice: 750, isDefault: true },
      { label: '১ কেজি', price: 1250, oldPrice: 1450 }
    ],
    features: [
      'কালোজিরা ফুল ও মধুর দ্বৈত স্বাস্থ্য উপকারিতা',
      'গলাব্যথা, শ্বাসকষ্ট ও ঠান্ডাজনিত সমস্যায় অব্যর্থ',
      'রক্তের সুগার নিয়ন্ত্রণে প্রাকৃতিক সহায়ক মিষ্টি'
    ]
  },

  // 2. GHEE & OILS
  {
    id: 'gb-ghee-pabna',
    title: 'পাবনার ঐতিহ্যবাহী খাঁটি দানাদার গাওয়া ঘি',
    titleEn: 'Traditional Granular Cow Gawa Ghee',
    category: 'ghee-oil',
    categoryBn: 'গাওয়া ঘি ও তেল',
    image: '/organic-images/Spoon_scooping_ghee_from_jar_b3e93d06.webp',
    badge: 'বেস্ট সেলার',
    badgeType: 'bestseller',
    rating: 4.9,
    ratingCount: 680,
    labTested: true,
    inStock: true,
    shortDesc: 'পাবনা ও সিরাজগঞ্জের চরাঞ্চলের খাঁটি গরুর দুধের সর থেকে জ্বাল দিয়ে তৈরি সুবাসিত দানাদার গাওয়া ঘি।',
    weights: [
      { label: '২৫০ গ্রাম', price: 490, oldPrice: 550 },
      { label: '৫০০ গ্রাম', price: 950, oldPrice: 1050, isDefault: true },
      { label: '১ কেজি', price: 1850, oldPrice: 2050 }
    ],
    features: [
      'ঘাসের পাতা খাওয়া দেশি গরুর দুধের ১০০% খাঁটি মাখন',
      'অতুলনীয় গ্রাম্য ঘ্রাণ ও মুখে মিহি গলে যাওয়া দানা টেক্সচার',
      'কোনো কেমিক্যাল, ডালডা বা কৃত্রিম ফ্লেভার নেই',
      'পোলাও, বিরিয়ানি, গরম ভাত ও ভর্তায় আসল স্বাদ আনে'
    ]
  },
  {
    id: 'gb-oil-mustard-amber',
    title: 'কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল',
    titleEn: 'Cold Wood-Pressed Pure Mustard Oil',
    category: 'ghee-oil',
    categoryBn: 'গাওয়া ঘি ও তেল',
    image: '/organic-images/Amber_glass_bottle_with_mustard_a5fcc99f.webp',
    badge: '১০০% খাঁটি',
    badgeType: 'pure',
    rating: 4.9,
    ratingCount: 520,
    labTested: true,
    inStock: true,
    shortDesc: 'কাঠের ঘানিতে ধীরগতিতে ভাঙানো তীব্র ঝাঁঝালো ও গাঢ় প্রাকৃতিক সরিষার তেল।',
    weights: [
      { label: '১ লিটার', price: 340, oldPrice: 380, isDefault: true },
      { label: '২ লিটার', price: 670, oldPrice: 750 },
      { label: '৫ লিটার', price: 1650, oldPrice: 1850 }
    ],
    features: [
      'কোনো হিট ছাড়াই কাঠের ঘানিতে কোল্ড-প্রেসড প্রক্রিয়ায় প্রস্তুত',
      'তীব্র খাঁটি ঝাঁঝ ও সুন্দর সোনালী-লালচে প্রাকৃতিক রঙ',
      'হৃদযন্ত্রের জন্য উপকারী ওমেগা-৩ ও ওমেগা-৬ ফ্যাটি অ্যাসিড সমৃদ্ধ',
      'ভর্তা, ইলিশ ভাজি, আচার ও রান্নায় খাঁটি স্বাদ'
    ]
  },
  {
    id: 'gb-oil-mustard-bottle',
    title: 'দেশি মাঘী সরিষার স্পেশাল ঘানি তেল',
    titleEn: 'Deshi Maghi Mustard Cold Pressed Oil',
    category: 'ghee-oil',
    categoryBn: 'গাওয়া ঘি ও তেল',
    image: '/organic-images/Bottle_of_mustard_oil_and_fcd29f88.webp',
    badge: 'ঝাঁঝালো',
    badgeType: 'hot',
    rating: 4.8,
    ratingCount: 310,
    labTested: true,
    inStock: true,
    shortDesc: 'ছোট দানার দেশি মাঘী সরিষা থেকে তৈরি সর্বোচ্চ ঝাঁঝের স্বাস্থ্যকর রান্নার তেল।',
    weights: [
      { label: '১ লিটার', price: 360, oldPrice: 400, isDefault: true },
      { label: '৫ লিটার', price: 1750, oldPrice: 1950 }
    ],
    features: [
      'দেশি লাল মাঘী সরিষার প্রথম কোয়ালিটি এক্সট্র্যাক্ট',
      'ন্যাচারাল অ্যান্টিব্যাকটেরিয়াল ও প্রিজারভেটিভ হিসেবে আচার দীর্ঘস্থায়ী করে',
      'কোলেস্টেরল ফ্রি ও পুরোপুরি অপরিশোধিত'
    ]
  },
  {
    id: 'gb-oil-coconut-ev',
    title: 'কোল্ড প্রেসড এক্সট্রা ভার্জিন নারিকেল তেল',
    titleEn: 'Cold-Pressed Extra Virgin Coconut Oil',
    category: 'ghee-oil',
    categoryBn: 'গাওয়া ঘি ও তেল',
    image: '/organic-images/Glass_bottle_with_coconut_oil_21da08b7.webp',
    badge: 'খাদ্য ও রূপচর্চা',
    badgeType: 'pure',
    rating: 4.9,
    ratingCount: 275,
    labTested: true,
    inStock: true,
    shortDesc: 'তাজা পাকা নারিকেলের দুধ থেকে ড্রায়ার ছাড়া কোল্ড প্রেসড পদ্ধতিতে নিষ্কাশিত খাবার উপযোগী তেল।',
    weights: [
      { label: '২৫০ মিলি', price: 390, oldPrice: 450 },
      { label: '৫০০ মিলি', price: 750, oldPrice: 850, isDefault: true }
    ],
    features: [
      '১০০% কাঁচা নারিকেলের দুধ থেকে ফার্স্ট প্রেস এক্সট্রাকশন',
      'রান্না, স্যালাড ড্রেসিং এবং শিশু ও বড়দের ত্বক-চুলের যত্নে সেরা',
      'লরিক অ্যাসিড সমৃদ্ধ ও হজমশক্তি দ্রুত বৃদ্ধিকারী'
    ]
  },
  {
    id: 'gb-oil-black-seed',
    title: 'ফার্স্ট কোল্ড প্রেসড খাঁটি কালোজিরা তেল',
    titleEn: 'Pure Black Seed (Nigella Sativa) Oil',
    category: 'ghee-oil',
    categoryBn: 'গাওয়া ঘি ও তেল',
    image: '/organic-images/Black_seed_oil_bottle_dropper_c3181174.webp',
    badge: 'মহাঔষধ',
    badgeType: 'hot',
    rating: 5.0,
    ratingCount: 410,
    labTested: true,
    inStock: true,
    shortDesc: 'রাসুল (সা.)-এর সুন্নাহ ও আধুনিক চিকিৎসায় স্বীকৃত সর্বোৎকৃষ্ট মানের কালোজিরার তেল।',
    weights: [
      { label: '১০০ মিলি', price: 290, oldPrice: 330 },
      { label: '২৫০ মিলি', price: 650, oldPrice: 750, isDefault: true },
      { label: '৫০০ মিলি', price: 1250, oldPrice: 1400 }
    ],
    features: [
      'উচ্চমানের ছোট দানার কালোজিরা থেকে সিঙ্গেল প্রেস এক্সট্র্যাক্ট',
      'থাইমোকুইনোন (Thymoquinone) উপাদানে ভরপুর শক্তিশালী অ্যান্টিঅক্সিডেন্ট',
      'বাতব্যথা, মাইগ্রেন ও রোগ প্রতিরোধে ম্যাজিকের মতো কাজ করে'
    ]
  },
  {
    id: 'gb-oil-sesame',
    title: 'খাঁটি কাঠের ঘানির তিলের তেল',
    titleEn: 'Pure Wood-Pressed Sesame (Til) Oil',
    category: 'ghee-oil',
    categoryBn: 'গাওয়া ঘি ও তেল',
    image: '/organic-images/Sesame_oil_in_glass_bottle_80b0ca24.webp',
    badge: 'প্রাকৃতিক',
    badgeType: 'pure',
    rating: 4.8,
    ratingCount: 155,
    labTested: true,
    inStock: true,
    shortDesc: 'হাড় মজবুত ও জয়েন্ট পেইন দূর করতে শতভাগ খাঁটি কাঠের ঘানির সাদা তিলের তেল।',
    weights: [
      { label: '২৫০ মিলি', price: 320, oldPrice: 370 },
      { label: '৫০০ মিলি', price: 590, oldPrice: 680, isDefault: true }
    ],
    features: [
      'উচ্চমাত্রার প্রাকৃতিক ক্যালসিয়াম ও ভিটামিন ই সমৃদ্ধ',
      'মাথার তালু ঠান্ডা ও গভীর ঘুমের জন্য মালিশে অত্যন্ত উপকারী'
    ]
  },

  // 3. DATES (KHEJUR) & DRIED FRUITS
  {
    id: 'gb-dates-ajwa',
    title: 'মদিনার রাজকীয় ভিআইপি আজওয়া খেজুর',
    titleEn: 'Royal Madinah VIP Ajwa Dates',
    category: 'dates',
    categoryBn: 'প্রিমিয়াম খেজুর',
    image: '/organic-images/Ajwa_dates_in_wooden_bowl_32a90840.webp',
    badge: 'পবিত্র সুন্নাহ',
    badgeType: 'bestseller',
    rating: 5.0,
    ratingCount: 620,
    labTested: true,
    inStock: true,
    shortDesc: 'মদিনা মোনাওয়ারা থেকে সরাসরি আমদানিকৃত নরম, রসালো ও কালো কুচকুচে আসল আজওয়া খেজুর।',
    weights: [
      { label: '২৫০ গ্রাম', price: 420, oldPrice: 480 },
      { label: '৫০০ গ্রাম', price: 790, oldPrice: 890, isDefault: true },
      { label: '১ কেজি', price: 1550, oldPrice: 1750 }
    ],
    features: [
      'আসল মদিনা শরিফের খামারের এ-গ্রেড সিলগালা আজওয়া',
      'হাদিস বর্ণিত হৃদরোগ ও রোগবালাই প্রতিরোধী বরকতময় ফল',
      'প্রাকৃতিক ফ্রুক্টোজ সমৃদ্ধ যা ডায়াবেটিকদের জন্যও পরিমিত সেবন উপযোগী'
    ]
  },
  {
    id: 'gb-dates-maryam',
    title: 'প্রিমিয়াম ভিআইপি মরিয়ম খেজুর',
    titleEn: 'Premium Maryam (Mabroom) Dates',
    category: 'dates',
    categoryBn: 'প্রিমিয়াম খেজুর',
    image: '/organic-images/Maryam_dates_on_bamboo_tray_b850603f.webp',
    badge: 'বেস্ট সেলার',
    badgeType: 'bestseller',
    rating: 4.9,
    ratingCount: 470,
    labTested: true,
    inStock: true,
    shortDesc: 'লম্বাটে লালচে-বাদামি রঙের চর্বিমুক্ত চিউয়ি ও মিষ্টি প্রিমিয়াম মরিয়ম খেজুর।',
    weights: [
      { label: '৫০০ গ্রাম', price: 590, oldPrice: 680, isDefault: true },
      { label: '১ কেজি', price: 1150, oldPrice: 1300 }
    ],
    features: [
      'উন্নত জাতের পরিষ্কার ও চকচকে মরিয়ম খেজুর',
      'দীর্ঘক্ষণ এনার্জি ধরে রাখতে সকালের সেরা খাদ্য'
    ]
  },
  {
    id: 'gb-dates-medjool',
    title: 'কিং জাম্বো সাইজ মেডজুল খেজুর',
    titleEn: 'King Jumbo Royal Medjool Dates',
    category: 'dates',
    categoryBn: 'প্রিমিয়াম খেজুর',
    image: '/organic-images/Medjool_dates_on_ceramic_plate_5110c179.webp',
    badge: 'লার্জ সাইজ',
    badgeType: 'hot',
    rating: 4.9,
    ratingCount: 395,
    labTested: true,
    inStock: true,
    shortDesc: 'খেজুরে রাজাধিরাজ জাম্বো সাইজ মেডজুল—মাংসল, মিষ্টি ক্যারামেল স্বাদের অতুলনীয় খেজুর।',
    weights: [
      { label: '৫০০ গ্রাম', price: 850, oldPrice: 950, isDefault: true },
      { label: '১ কেজি', price: 1650, oldPrice: 1850 }
    ],
    features: [
      'বড় আকৃতির নরম শাঁসযুক্ত রাজকীয় স্বাদ',
      'পটাশিয়াম, ম্যাগনেশিয়াম ও ন্যাচারাল ডায়েটারি ফাইবার সমৃদ্ধ'
    ]
  },
  {
    id: 'gb-dates-sukkari',
    title: 'সোনালী নরম সুক্কারি খেজুর',
    titleEn: 'Golden Sukkari Soft Melting Dates',
    category: 'dates',
    categoryBn: 'প্রিমিয়াম খেজুর',
    image: '/organic-images/Sukkari_dates_on_ceramic_platter_b9264460.webp',
    badge: 'মিষ্টি ও নরম',
    badgeType: 'pure',
    rating: 4.8,
    ratingCount: 230,
    labTested: true,
    inStock: true,
    shortDesc: 'মুখে দিলেই মিলিয়ে যায় এমন মধুর মতো মিষ্টি সোনালী আল কাসিম সুক্কারি খেজুর।',
    weights: [
      { label: '৫০০ গ্রাম', price: 490, oldPrice: 560, isDefault: true },
      { label: '১ কেজি', price: 950, oldPrice: 1100 }
    ],
    features: [
      'নরম ক্রিমি মিষ্টি টেক্সচার যা বয়োবৃদ্ধ ও শিশুদের খুব পছন্দের',
      'চা বা কফির সাথে প্রাকৃতিক চিনির সেরা বিকল্প'
    ]
  },
  {
    id: 'gb-dates-figs',
    title: 'আফগান অর্গানিক ড্রাই আনজির ও খুবানি',
    titleEn: 'Organic Dried Figs (Anjeer) & Turkish Apricots',
    category: 'dates',
    categoryBn: 'প্রিমিয়াম খেজুর',
    image: '/organic-images/Dried_figs_and_apricots_displayed_6d52fadb.webp',
    badge: 'ন্যাচারাল',
    badgeType: 'pure',
    rating: 4.8,
    ratingCount: 185,
    labTested: true,
    inStock: true,
    shortDesc: 'রোদে শুকানো খাঁটি পাহাড়ি ডুমুর (আনজির) এবং উজ্জ্বল সুমিষ্টি খুবানি।',
    weights: [
      { label: '২৫০ গ্রাম', price: 450, oldPrice: 520 },
      { label: '৫০০ গ্রাম', price: 880, oldPrice: 990, isDefault: true }
    ],
    features: [
      'কোষ্ঠকাঠিন্য ও পাইলসের জন্য প্রাচীন প্রমাণিত প্রাকৃতিক সমাধান',
      'আয়রন ও উচ্চ ফাইবারে ভরপুর মিষ্টি ফল'
    ]
  },

  // 4. NUTS, SEEDS & SUPERFOODS
  {
    id: 'gb-nuts-mixed-roasted',
    title: 'প্রিমিয়াম রোস্টেড সল্টেড মিক্সড নাটস',
    titleEn: 'Premium Roasted Salted 5-in-1 Mixed Nuts',
    category: 'nuts-seeds',
    categoryBn: 'বাদাম ও সুপারফুড',
    image: '/organic-images/Mixed_nuts_tumbling_into_bowl_17866944.webp',
    badge: 'বেস্ট সেলার',
    badgeType: 'bestseller',
    rating: 4.9,
    ratingCount: 420,
    labTested: true,
    inStock: true,
    shortDesc: 'হালকা লবণ ও তাওয়া রোস্টেড কাজু, কাঠবাদাম, পেস্তা, আখরোট ও পাম্পকিন সিডসের মচমচে মিক্স।',
    weights: [
      { label: '২৫০ গ্রাম', price: 420, oldPrice: 480 },
      { label: '৫০০ গ্রাম', price: 790, oldPrice: 890, isDefault: true },
      { label: '১ কেজি', price: 1550, oldPrice: 1750 }
    ],
    features: [
      'প্রতিটি বাদাম ফ্রেশ ও মুচমুচে রোস্ট করা',
      'মস্তিষ্কের কার্যক্ষমতা ও হৃদপিণ্ড সুস্থ রাখার প্রাকৃতিক সুপারফুড',
      'জিপলক ফয়েল প্যাকেজিং যাতে কুড়মুড়ে ভাব অটুট থাকে'
    ]
  },
  {
    id: 'gb-nuts-raw-cashew-almond',
    title: 'অর্গানিক কাঁচা কাজুবাদাম ও আস্ত কাঠবাদাম',
    titleEn: 'Raw Premium Cashews & California Almonds',
    category: 'nuts-seeds',
    categoryBn: 'বাদাম ও সুপারফুড',
    image: '/organic-images/Cashews_and_almonds_on_dish_24eed017.webp',
    badge: 'ফ্রেশ স্টক',
    badgeType: 'pure',
    rating: 4.9,
    ratingCount: 310,
    labTested: true,
    inStock: true,
    shortDesc: 'তেল বা লবণ ছাড়া শতভাগ আনরোস্টেড কাঁচা মিষ্টি কাজু ও ক্যালিফোর্নিয়া কাঠবাদাম।',
    weights: [
      { label: '২৫০ গ্রাম', price: 380, oldPrice: 440 },
      { label: '৫০০ গ্রাম', price: 720, oldPrice: 820, isDefault: true }
    ],
    features: [
      'কাঁচা খাওয়ার উপযোগী বা পানিতে ভিজিয়ে খাওয়ার জন্য সেরা',
      'প্রোটিন, ভিটামিন ই এবং মনো-আনস্যাচুরেটেড ফ্যাটের পাওয়ারহাউস'
    ]
  },
  {
    id: 'gb-seeds-chia',
    title: 'অর্গানিক প্রিমিয়াম ব্ল্যাক চিয়া সিডস',
    titleEn: '100% Organic Black Chia Seeds',
    category: 'nuts-seeds',
    categoryBn: 'বাদাম ও সুপারফুড',
    image: '/organic-images/Chia_seeds_overflowing_from_scoop_646e44ba.webp',
    badge: 'ওয়েট লস',
    badgeType: 'hot',
    rating: 4.9,
    ratingCount: 540,
    labTested: true,
    inStock: true,
    shortDesc: 'ওজন নিয়ন্ত্রণ ও শরীরের টক্সিন দূর করতে সেরা মানের অপরিশোধিত প্রাকৃতিক কালো চিয়া সিডস।',
    weights: [
      { label: '২৫০ গ্রাম', price: 290, oldPrice: 350 },
      { label: '৫০০ গ্রাম', price: 550, oldPrice: 650, isDefault: true }
    ],
    features: [
      'দুধের চেয়ে ৫ গুণ বেশি ক্যালসিয়াম ও স্যামন মাছের চেয়ে ৮ গুণ বেশি ওমেগা-৩',
      'পেট দীর্ঘক্ষণ ভরা রাখে এবং অতিরিক্ত ক্ষুধা নিবারণে দারুণ সহায়ক'
    ]
  },
  {
    id: 'gb-seeds-pumpkin-sunflower',
    title: 'রোস্টেড পাম্পকিন ও সানফ্লাওয়ার সিডস',
    titleEn: 'Roasted Pumpkin & Sunflower Super Seeds',
    category: 'nuts-seeds',
    categoryBn: 'বাদাম ও সুপারফুড',
    image: '/organic-images/Pepitas_and_sunflower_seeds_in_7d79023d.webp',
    badge: 'জিঙ্ক সমৃদ্ধ',
    badgeType: 'pure',
    rating: 4.8,
    ratingCount: 190,
    labTested: true,
    inStock: true,
    shortDesc: 'পুরুষ ও নারীর সার্বিক হরমোনাল স্বাস্থ্য ও ভালো ঘুমের জন্য প্রাকৃতিক জিঙ্ক ও ম্যাগনেশিয়াম সমৃদ্ধ বীজ।',
    weights: [
      { label: '২০০ গ্রাম', price: 280, oldPrice: 320 },
      { label: '৪০০ গ্রাম', price: 540, oldPrice: 620, isDefault: true }
    ],
    features: [
      'সহজে চিবাতে পারা মুচমুচে রোস্টেড পেপিতা',
      'চুলের গ্রোথ ও ত্বকের তারুণ্য ধরে রাখতে কার্যকর'
    ]
  },
  {
    id: 'gb-seeds-psyllium',
    title: 'খাঁটি আস্ত ইসবগুলের ভুষি (Isabgol)',
    titleEn: 'Pure Organic White Psyllium Husk',
    category: 'nuts-seeds',
    categoryBn: 'বাদাম ও সুপারফুড',
    image: '/organic-images/Psyllium_husk_in_glass_jar_96f26a40.webp',
    badge: 'হজমশক্তি',
    badgeType: 'pure',
    rating: 4.9,
    ratingCount: 360,
    labTested: true,
    inStock: true,
    shortDesc: 'পেটের গ্যাস, অ্যাসিডিটি ও কোষ্ঠকাঠিন্য দূর করতে সাদা ফ্রেশ ভুষি।',
    weights: [
      { label: '১০০ গ্রাম', price: 160, oldPrice: 190 },
      { label: '২৫০ গ্রাম', price: 380, oldPrice: 440, isDefault: true }
    ],
    features: [
      'গুঁড়ো ছাড়া বড় দানার পরিষ্কার খাঁটি ইসবগুল',
      'প্রাকৃতিক ডায়াবেটিস ও কোলেস্টেরল নিয়ন্ত্রণকারী দ্রবণীয় ফাইবার'
    ]
  },

  // 5. STONE-GROUND SPICES
  {
    id: 'gb-spice-turmeric',
    title: 'হাতে ভাঙা খাঁটি পাহাড়ি হলুদ গুঁড়া',
    titleEn: 'Stone-Ground Farm Fresh Turmeric Powder',
    category: 'spices',
    categoryBn: 'খাঁটি গুঁড়া মসলা',
    image: '/organic-images/Turmeric_powder_in_bowl_fcb47f6b.webp',
    badge: 'রংমুক্ত',
    badgeType: 'pure',
    rating: 4.9,
    ratingCount: 340,
    labTested: true,
    inStock: true,
    shortDesc: 'কোনো কৃত্রিম রং বা লেড-ক্রোমেট ছাড়া পাহাড়ি হলুদ থেকে রোদে শুকিয়ে চূর্ণ করা খাঁটি হলুদ গুঁড়া।',
    weights: [
      { label: '২৫০ গ্রাম', price: 140, oldPrice: 170 },
      { label: '৫০০ গ্রাম', price: 260, oldPrice: 300, isDefault: true }
    ],
    features: [
      'উচ্চ কারকিউমিন (Curcumin) সমৃদ্ধ তীব্র প্রাকৃতিক সুবাস',
      'রান্নায় অল্প দিলেই আসে অপূর্ব খাঁটি বর্ণ ও স্বাদ',
      'ল্যাব টেস্টে ১০০% আর্সেনিক ও রাসায়নিকমুক্ত'
    ]
  },
  {
    id: 'gb-spice-chili',
    title: 'পাথরে ভাঙা খাঁটি শুকনো মরিচ গুঁড়া',
    titleEn: 'Stone-Ground Pure Sun-Dried Red Chili',
    category: 'spices',
    categoryBn: 'খাঁটি গুঁড়া মসলা',
    image: '/organic-images/Chili_powder_in_mortar_21c1695e.webp',
    badge: 'ঝাঁঝ ও বর্ণ',
    badgeType: 'hot',
    rating: 4.8,
    ratingCount: 280,
    labTested: true,
    inStock: true,
    shortDesc: 'বোঁটা ছাড়িয়ে রোদে শুকানো খাঁটি লাল মরিচ দিয়ে তৈরি প্রাকৃতিক রঙ ও ঝালের মরিচ গুঁড়া।',
    weights: [
      { label: '২৫০ গ্রাম', price: 180, oldPrice: 210 },
      { label: '৫০০ গ্রাম', price: 340, oldPrice: 390, isDefault: true }
    ],
    features: [
      'ইটের গুঁড়ো বা লাল কৃত্রিম রঙ মুক্ত ১০০% বিশ্বস্ত',
      'পেটে জ্বালাপোড়া ছাড়া প্রাকৃতিক সুস্বাদু ঝাল স্বাদ দেয়'
    ]
  },
  {
    id: 'gb-spice-cumin-coriander',
    title: 'সুগন্ধি টালা জিরা ও ধনে গুঁড়া কম্বো প্যাক',
    titleEn: 'Roasted Cumin & Fragrant Coriander Spice Duo',
    category: 'spices',
    categoryBn: 'খাঁটি গুঁড়া মসলা',
    image: '/organic-images/Glass_spice_jars_with_powder_10c13bbe.webp',
    badge: 'কম্বো অফার',
    badgeType: 'bestseller',
    rating: 4.9,
    ratingCount: 220,
    labTested: true,
    inStock: true,
    shortDesc: 'হালকা আঁচে টালা সুবাসিত ভাজা জিরার গুঁড়া ও খাঁটি ধনে গুঁড়ার পারফেক্ট কিচেন ডুও।',
    weights: [
      { label: '২৫০ গ্রাম + ২৫০ গ্রাম', price: 360, oldPrice: 420, isDefault: true }
    ],
    features: [
      'আসল ভারতীয় জিরা ও দেশি ধনের প্রথম প্রেসার পাউডার',
      'তরকারি ও রোস্টে দেবে অতুলনীয় বাঙালি শাহী ঘ্রাণ'
    ]
  },
  {
    id: 'gb-spice-pink-salt',
    title: 'অরিজিনাল হিমালয়ান পিঙ্ক রক সল্ট (Pink Salt)',
    titleEn: 'Original Natural Himalayan Pink Rock Salt',
    category: 'spices',
    categoryBn: 'খাঁটি গুঁড়া মসলা',
    image: '/organic-images/Pink_salt_in_wooden_bowl_c02785b8.webp',
    badge: '৮৪+ মিনারেল',
    badgeType: 'pure',
    rating: 4.9,
    ratingCount: 460,
    labTested: true,
    inStock: true,
    shortDesc: 'হিমালয়ের খনি থেকে পাওয়া ৮৪টি প্রাকৃতিক খনিজ সমৃদ্ধ পিঙ্ক ক্রিস্টাল লবণ।',
    weights: [
      { label: '৫০০ গ্রাম', price: 180, oldPrice: 220 },
      { label: '১ কেজি', price: 330, oldPrice: 390, isDefault: true }
    ],
    features: [
      'উচ্চ রক্তচাপ ও ব্লাড প্রেসার নিয়ন্ত্রণে সাধারণ লবণের সেরা স্বাস্থ্যকর বিকল্প',
      'প্রাকৃতিক আয়োডিন ও ইলেক্টোলাইট সমৃদ্ধ'
    ]
  },

  // 6. TEA, JAGGERY & HERBALS
  {
    id: 'gb-tea-sreemangal',
    title: 'শ্রীমঙ্গলের প্রিমিয়াম ফার্স্ট ফ্লাশ অর্থোডক্স চা',
    titleEn: 'Sreemangal Premium Orthodox Black Tea',
    category: 'tea-jaggery',
    categoryBn: 'চা ও খাঁটি গুড়',
    image: '/organic-images/Tea_leaves_in_glass_jar_71db72a5.webp',
    badge: 'রয়েল ব্লেন্ড',
    badgeType: 'bestseller',
    rating: 4.9,
    ratingCount: 310,
    labTested: true,
    inStock: true,
    shortDesc: 'শ্রীমঙ্গলের উঁচু বাগানের দুটি পাতা একটি কুঁড়ি থেকে তৈরি সুবাসিত লাল লিকারের অর্থোডক্স ব্ল্যাক টি।',
    weights: [
      { label: '২০০ গ্রাম', price: 280, oldPrice: 340 },
      { label: '৪০০ গ্রাম', price: 540, oldPrice: 650, isDefault: true }
    ],
    features: [
      'কড়া লিকার ও মন মাতানো মিষ্টি প্রাকৃতিক সুগন্ধ',
      'কোনো কৃত্রিম কালার বা ডাস্ট মেশানো নেই'
    ]
  },
  {
    id: 'gb-tea-green',
    title: 'দার্জিলিং হোল-লিফ গ্রিন টি ও জুঁই ব্লেন্ড',
    titleEn: 'Whole Leaf Darjeeling Green Tea',
    category: 'tea-jaggery',
    categoryBn: 'চা ও খাঁটি গুড়',
    image: '/organic-images/Brewing_green_tea_in_teapot_24a4c7cd.webp',
    badge: 'অ্যান্টিঅক্সিডেন্ট',
    badgeType: 'pure',
    rating: 4.8,
    ratingCount: 195,
    labTested: true,
    inStock: true,
    shortDesc: 'মেদ কমাতে ও সারাদিন সতেজ থাকতে তাজা গোটা পাতার গ্রিন টি।',
    weights: [
      { label: '১০০ গ্রাম', price: 290, oldPrice: 350, isDefault: true }
    ],
    features: [
      'তিতা ভাবহীন মিষ্টি হালকা প্রাকৃতিক স্বাদ',
      'মেটাবলিজম বৃদ্ধি ও স্কিন গ্লো করতে দারুণ সহায়ক'
    ]
  },
  {
    id: 'gb-jaggery-patali',
    title: 'যশোরের ঐতিহ্যবাহী খাঁটি খেজুরের পাটালি গুড়',
    titleEn: 'Traditional Jashore Pure Date Palm Jaggery',
    category: 'tea-jaggery',
    categoryBn: 'চা ও খাঁটি গুড়',
    image: '/organic-images/Jaggery_and_molasses_in_pot_cbf64839.webp',
    badge: 'শীতের সুবাস',
    badgeType: 'hot',
    rating: 5.0,
    ratingCount: 390,
    labTested: true,
    inStock: true,
    shortDesc: 'কোনো চিনি বা সোডা ছাড়া গাছিদের খাঁটি খেজুরের রস থেকে তৈরি নরম পাটালি ও ঝোলা গুড়।',
    weights: [
      { label: '৫০০ গ্রাম', price: 380, oldPrice: 450 },
      { label: '১ কেজি', price: 720, oldPrice: 850, isDefault: true }
    ],
    features: [
      'চিনির কোনো রকম ভেজালমুক্ত শতভাগ খাঁটি খেজুর রস',
      'পায়েস, পিঠা, চায়ের সাথে অতুলনীয় গ্রাম্য ঘ্রাণ'
    ]
  },
  {
    id: 'gb-moringa-powder',
    title: 'অর্গানিক সজনে পাতা / মোরিঙ্গা মিরাকল পাউডার',
    titleEn: 'Pure Organic Moringa Oleifera Miracle Leaf Powder',
    category: 'tea-jaggery',
    categoryBn: 'চা ও খাঁটি গুড়',
    image: '/organic-images/Moringa_powder_in_black_bowl_bc82ea6e.webp',
    badge: 'সুপারফুড',
    badgeType: 'pure',
    rating: 4.9,
    ratingCount: 270,
    labTested: true,
    inStock: true,
    shortDesc: '৩০০+ রোগের প্রতিরোধক ও পুষ্টির আধার সজনে পাতার সূক্ষ্ম সবুজ পাউডার।',
    weights: [
      { label: '২০০ গ্রাম', price: 290, oldPrice: 350, isDefault: true },
      { label: '৪০০ গ্রাম', price: 550, oldPrice: 650 }
    ],
    features: [
      'ছায়ায় শুকিয়ে তৈরি প্রাকৃতিকভাবে পুষ্টি সুরক্ষিত পাউডার',
      'দুধের চেয়ে ১৭ গুণ বেশি ক্যালসিয়াম ও কমলার চেয়ে ৭ গুণ বেশি ভিটামিন সি'
    ]
  }
];
