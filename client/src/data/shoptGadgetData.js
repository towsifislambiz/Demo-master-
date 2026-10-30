// ShopT Gadget Store Master Dataset
// Combo 01 — Navy + Silver + White Luxury Tech Styling

import cableOled from '../assets/gadgets/cable_typec_oled_display.jpg';
import chargerGan from '../assets/gadgets/charger_gan_100w.jpg';
import chargerMagsafe from '../assets/gadgets/charger_magsafe_3in1_stand.jpg';
import earbudsGaming from '../assets/gadgets/earbuds_gaming_rgb_lowlatency.jpg';
import earbudsMatteBlack from '../assets/gadgets/earbuds_matte_black_obsidian.jpg';
import earbudsTransparent from '../assets/gadgets/earbuds_transparent_anc.jpg';
import earphonesNeckband from '../assets/gadgets/earphones_neckband_sport.jpg';
import headphonesOverear from '../assets/gadgets/headphones_overear_anc.jpg';
import keyboardMechanical from '../assets/gadgets/keyboard_mechanical_rgb.jpg';
import laptopCarbon from '../assets/gadgets/laptop_carbon_fiber_business.jpg';
import laptopDualscreen from '../assets/gadgets/laptop_dualscreen_oled.jpg';
import laptopGaming from '../assets/gadgets/laptop_gaming_rgb.jpg';
import laptopSpaceblack from '../assets/gadgets/laptop_ultrabook_spaceblack.jpg';
import mouseGaming from '../assets/gadgets/mouse_gaming_honeycomb.jpg';
import phoneVeganLeather from '../assets/gadgets/phone_curved_vegan_leather.jpg';
import phoneGamingRgb from '../assets/gadgets/phone_gaming_rgb_fan.jpg';
import phoneGlyph from '../assets/gadgets/phone_glyph_transparent.jpg';
import phoneTitanium from '../assets/gadgets/phone_titanium_flagship.jpg';
import powerbankCyber from '../assets/gadgets/powerbank_cyber_transparent.jpg';
import powerbankRugged from '../assets/gadgets/powerbank_rugged_outdoor.jpg';
import ringCeramic from '../assets/gadgets/smart_health_ring_ceramic.jpg';
import tabletAndroid from '../assets/gadgets/tablet_android_entertainment.jpg';
import watchFitness from '../assets/gadgets/watch_fitness_tracker_curved.jpg';
import watchMilanese from '../assets/gadgets/watch_milanese_executive.jpg';
import watchTactical from '../assets/gadgets/watch_tactical_gps_military.jpg';
import watchTitanium from '../assets/gadgets/watch_titanium_rugged_ultra.jpg';

export const SHOPT_NAVY_THEME = {
  navyDark: '#0A192F',      // Deep Luxury Midnight Navy
  navySurface: '#112240',   // Card / Surface Navy
  navyLight: '#1B2A4A',     // Hover / Elevated Navy
  silverMetallic: '#CBD5E1',// Chrome / Metallic Silver
  silverLight: '#E2E8F0',   // Subtle Silver Border
  pureWhite: '#FFFFFF',     // Crisp White Text & Backgrounds
  accentCyan: '#38BDF8',    // Precision Tech Glow
  accentBlue: '#2563EB',    // Brand Accent
};

export const GADGET_CATEGORIES = [
  { id: 'all', nameBn: 'সব গ্যাজেটস', nameEn: 'All Gadgets', count: 26 },
  { id: 'earbuds', nameBn: 'TWS ইয়ারবাডস ও অডিও', nameEn: 'TWS Earbuds & Audio', count: 5 },
  { id: 'smartwatches', nameBn: 'স্মার্টওয়াচ ও ট্র্যাকার', nameEn: 'Smartwatches & Bands', count: 5 },
  { id: 'chargers', nameBn: 'ফাস্ট চার্জার ও পাওয়ার', nameEn: 'Fast Chargers & Power', count: 5 },
  { id: 'smartphones', nameBn: 'ফ্ল্যাগশিপ স্মার্টফোন', nameEn: 'Flagship Smartphones', count: 4 },
  { id: 'laptops', nameBn: 'ল্যাপটপ ও আল্ট্রাবুক', nameEn: 'Laptops & Ultrabooks', count: 4 },
  { id: 'gaming', nameBn: 'গেমিং গিয়ার ও ট্যাবলেট', nameEn: 'Gaming Gear & Tablets', count: 3 },
];

export const SHOPT_GADGETS = [
  // --- TWS & Audio ---
  {
    id: 'shopt-g1',
    title: 'সাইবারপাঙ্ক ট্রান্সপারেন্ট 45dB হাইব্রিড ANC ওয়্যারলেস ইয়ারবাডস',
    titleEn: 'Cyberpunk Transparent 45dB Hybrid ANC Earbuds',
    category: 'earbuds',
    categoryBn: 'TWS ইয়ারবাডস',
    price: 3250,
    oldPrice: 4500,
    discount: '২৮% ছাড়',
    rating: 4.9,
    ratingCount: 382,
    badge: 'হট ডিল',
    badgeType: 'hot',
    image: earbudsTransparent,
    images: [earbudsTransparent, earbudsMatteBlack, earbudsGaming],
    brand: 'ShopT Cyber Edition',
    inStock: true,
    stockCount: 24,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'ট্রান্সপারেন্ট ফিউচারিস্টিক কেসিং, গোল্ড কপার কয়েল ভিউ এবং অ্যাক্টিভ নয়েজ ক্যান্সেলেশনসহ প্রিমিয়াম সাউন্ড এক্সপেরিয়েন্স। ব্যাটারির সঠিক পার্সেন্টেজ প্রদর্শনকারী মিনি এলইডি স্ক্রিন।',
    specs: {
      'ANC Rating': '45dB Hybrid Active Noise Cancelling',
      'Battery Life': '৮ ঘণ্টা একটানা প্লেব্যাক (কেসসহ ৩৮ ঘণ্টা)',
      'Bluetooth': 'V5.4 Ultra Low Latency 35ms',
      'Driver Size': '12mm Titanium Diaphragm Drivers',
      'Water Resistance': 'IPX5 Sweat & Water Resistant',
      'Charging': 'USB-C Fast Charge (১০ মিনিটে ২ ঘণ্টা ব্যাকআপ)'
    },
    features: [
      'ট্রান্সপারেন্ট ফিউচারিস্টিক বডি ডিজাইন',
      'ডিজিটাল এলইডি রিয়েলটাইম ব্যাটারি ডিসপ্লে',
      'কোয়াড-মাইক এনভায়রনমেন্টাল নয়েজ ক্যান্সেলেশন (ENC)',
      'সারা দেশে ক্যাশ অন ডেলিভারি'
    ]
  },
  {
    id: 'shopt-g2',
    title: 'আল্ট্রা-স্লিক অবসিডিয়ান ব্ল্যাক স্টেম ইয়ারবাডস গোল্ড এক্সেন্টসহ',
    titleEn: 'Ultra-Sleek Obsidian Black Matte Stem Earbuds',
    category: 'earbuds',
    categoryBn: 'TWS ইয়ারবাডস',
    price: 2850,
    oldPrice: 3800,
    discount: '২৫% ছাড়',
    rating: 4.8,
    ratingCount: 215,
    badge: 'বেস্ট সেলার',
    badgeType: 'bestseller',
    image: earbudsMatteBlack,
    images: [earbudsMatteBlack, earbudsTransparent, headphonesOverear],
    brand: 'AudioCraft Pro',
    inStock: true,
    stockCount: 31,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'ম্যাট ব্ল্যাক ফিনিশ ও ম্যাগনেটিক গোল্ড কন্টাক্টযুক্ত প্রিমিয়াম স্টেম ইয়ারবাডস। ক্লিয়ার ক্রিস্টাল ভয়েস কলিং ও ব্যালান্সড ডিপ ব্যাস সাউন্ড।',
    specs: {
      'Sound Signature': 'Hi-Fi Deep Bass Tuning',
      'Battery Life': '৭ ঘণ্টা একটানা প্লেব্যাক (কেসসহ ৩৫ ঘণ্টা)',
      'Microphones': 'ডুয়াল বিমফরমিং নয়েজ রিডাকশন মাইক',
      'Connectivity': 'Bluetooth 5.3 Instant Auto-Pairing',
      'Weight': 'প্রতিটি বাড মাত্র ৪.১ গ্রাম (পালকের মতো হালকা)'
    },
    features: [
      'প্রিমিয়াম সিল্কি ম্যাট ব্ল্যাক কোটিং',
      'টাচ জেসচার মিউজিক ও কল কন্ট্রোল',
      'আইওএস ও অ্যান্ড্রয়েড ডুয়াল ডিভাইস সুইচিং'
    ]
  },
  {
    id: 'shopt-g3',
    title: 'হাই-রেস ওয়্যারলেস ওভার-ইয়ার ANC হেডফোন ব্রাশড অ্যালুমিনিয়াম ফিনিশ',
    titleEn: 'Hi-Res Wireless Over-Ear ANC Headphones',
    category: 'earbuds',
    categoryBn: 'TWS ইয়ারবাডস ও অডিও',
    price: 6450,
    oldPrice: 8500,
    discount: '২৪% ছাড়',
    rating: 5.0,
    ratingCount: 142,
    badge: 'অফিসিয়াল চয়েস',
    badgeType: 'choice',
    image: headphonesOverear,
    images: [headphonesOverear, earphonesNeckband, earbudsTransparent],
    brand: 'SonicMaster Studio',
    inStock: true,
    stockCount: 12,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'স্পেস-গ্রে ব্রাশড অ্যালুমিনিয়াম ইয়ারকাপ ও সফট প্রোটিন লেদার মেমোরি ফোম কুশনযুক্ত স্টুডিও গ্রেড ওভার-ইয়ার হেডফোন। ৫০dB হাইব্রিড নয়েজ ব্লকিং।',
    specs: {
      'Drivers': '40mm Custom Liquid Crystal Polymer (LCP)',
      'Frequency Response': '4Hz - 40,000Hz (Hi-Res Audio Certified)',
      'Battery Life': '৫৫ ঘণ্টা ব্যাটারি ব্যাকআপ (ANC অন অবস্থায় ৪৫ ঘণ্টা)',
      'Weight': '২৫০ গ্রাম আল্ট্রা-কমফোর্ট ব্যালান্স',
      'Audio Codecs': 'LDAC, AAC, SBC Supported'
    },
    features: [
      'সনি / অ্যাপল লেভেল স্টুডিও অ্যাকোস্টিক ডিজাইন',
      'ট্রান্সপারেন্সি মোড উইথ স্মার্ট স্পিক-টু-চ্যাট',
      'ফোল্ডেবল ট্রাভেল কেস ও ৩.৫মিমি গোল্ড কেবল অন্তর্ভুক্ত'
    ]
  },
  {
    id: 'shopt-g4',
    title: 'জিরো-ল্যাটেন্সি RGB আর্মার গেমিং ওয়্যারলেস ইয়ারবাডস',
    titleEn: 'Zero-Latency RGB Armor Gaming TWS Earbuds',
    category: 'earbuds',
    categoryBn: 'TWS ইয়ারবাডস',
    price: 2450,
    oldPrice: 3200,
    discount: '২৩% ছাড়',
    rating: 4.8,
    ratingCount: 198,
    badge: 'গেমিং স্পেশাল',
    badgeType: 'gaming',
    image: earbudsGaming,
    images: [earbudsGaming, earbudsTransparent, mouseGaming],
    brand: 'CyberStrike Gear',
    inStock: true,
    stockCount: 19,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'পাবজি ও ফ্রিফায়ারে শুট ও ফুটস্টেপ নিখুঁত ট্র্যাক করার জন্য ২৫ms আল্ট্রা-লো ল্যাটেন্সি গেমিং মোড ও ব্রিদিং আরজিবি আর্মার কেস।',
    specs: {
      'Latency': '25ms Ultra-Low Gaming Mode',
      'Lighting': 'Dynamic Breathing RGB Lighting on Case & Buds',
      'Battery': '৬ ঘণ্টা গেমিং প্লেব্যাক (কেসসহ ৩০ ঘণ্টা)',
      'Microphone': '360° Omnidirectional Gaming Mic'
    },
    features: [
      '১-ক্লিকে ডেডিকেটেড গেম/মিউজিক মোড সুইচিং',
      'মেকানিকাল আর্মার স্লাইড কেস ওপেনিং মেকানিজম'
    ]
  },
  {
    id: 'shopt-g5',
    title: 'লিকুইড সিলিকন ম্যাগনেটিক স্পোর্ট নেকব্যান্ড ইয়ারফোন',
    titleEn: 'Liquid Silicone Magnetic Sport Neckband Earphones',
    category: 'earbuds',
    categoryBn: 'TWS ইয়ারবাডস ও অডিও',
    price: 1650,
    oldPrice: 2200,
    discount: '২৫% ছাড়',
    rating: 4.7,
    ratingCount: 310,
    badge: 'ডেইলি পিক',
    badgeType: 'daily',
    image: earphonesNeckband,
    images: [earphonesNeckband, earbudsMatteBlack, cableOled],
    brand: 'AudioCraft Sport',
    inStock: true,
    stockCount: 45,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'জিমে ওয়ার্কআউট ও বাইক চালানোর জন্য সুইটপ্রুফ স্কিন-ফ্রেন্ডলি লিকুইড সিলিকন নেকব্যান্ড। ম্যাগনেটিক অটো অন/অফ ফাংশন ও ৬০ ঘণ্টা সুপার ব্যাটারি।',
    specs: {
      'Battery Life': '৬০ ঘণ্টা একটানা গান ও কলিং ব্যাকআপ',
      'Waterproof': 'IPX7 Sweat & Rain Resistant',
      'Charging': 'Type-C ফাস্ট চার্জ (১৫ মিনিটে ১২ ঘণ্টা ব্যাকআপ)'
    },
    features: [
      'ম্যাগনেটিক অটো কানেক্ট ও ডিসকানেক্ট',
      'ডিপ ব্যাস ১০মিমি গ্রাফিন ড্রাইভার্স'
    ]
  },

  // --- Smartwatches ---
  {
    id: 'shopt-g6',
    title: 'আল্ট্রা টাইটানিয়াম রাগড আউটডোর স্মার্টওয়াচ 49mm AMOLED',
    titleEn: 'Ultra Titanium Rugged 49mm AMOLED Smartwatch',
    category: 'smartwatches',
    categoryBn: 'স্মার্টওয়াচ',
    price: 5850,
    oldPrice: 7500,
    discount: '২২% ছাড়',
    rating: 4.9,
    ratingCount: 450,
    badge: 'ফ্ল্যাগশিপ বেস্ট',
    badgeType: 'hot',
    image: watchTitanium,
    images: [watchTitanium, watchTactical, watchMilanese],
    brand: 'TechTitan Pro',
    inStock: true,
    stockCount: 16,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'ব্রাশড টাইটানিয়াম ফ্রেম, স্যাফায়ার ক্রিস্টাল গ্লাস ও অরেঞ্জ আলপাইন লুপ স্ট্র্যাপসহ ২.০২ ইঞ্চি ২০০০ নিটস পিক ব্রাইটনেস AMOLED ডিসপ্লে। ব্লুটুথ কলিং ও ফুল হেলথ ট্র্যাকিং।',
    specs: {
      'Display': '2.02" Super AMOLED 502x410 60Hz 2000nits',
      'Build': 'Aerospace-Grade Titanium Alloy & Sapphire Glass',
      'Calling': 'HD Bluetooth Calling with Noise-Cancelling Mic',
      'Battery': '৭-১০ দিন রেগুলার ইউজ (৩০ দিন স্ট্যান্ডবাই)',
      'Sensors': 'SpO2, Heart Rate, ECG, Compass, Sleep, Sports 150+'
    },
    features: [
      'অলওয়েজ-অন ডিসপ্লে (AOD) মোড',
      'আইওএস ও অ্যান্ড্রয়েড দুটি প্ল্যাটফর্মেই সাপোর্ট',
      'সারপ্রাইজ উপহার: এক্সট্রা সিলিকন ওভেন স্ট্র্যাপ ফ্রি'
    ]
  },
  {
    id: 'shopt-g7',
    title: 'এক্সিকিউটিভ স্টেইনলেস স্টিল মিলানিজ ম্যাগনেটিক স্মার্টওয়াচ',
    titleEn: 'Executive Stainless Steel Milanese Mesh Smartwatch',
    category: 'smartwatches',
    categoryBn: 'স্মার্টওয়াচ',
    price: 4950,
    oldPrice: 6500,
    discount: '২৪% ছাড়',
    rating: 4.9,
    ratingCount: 220,
    badge: 'এক্সিকিউটিভ চয়েস',
    badgeType: 'choice',
    image: watchMilanese,
    images: [watchMilanese, watchFitness, watchTitanium],
    brand: 'Chronos Elite',
    inStock: true,
    stockCount: 14,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'ক্লাসিক রাউন্ড ডায়াল, প্রিমিয়াম সিলভার মিলানিজ চেইন স্ট্র্যাপ ও এনালগ ডায়নামিক ওয়াচফেস। ফরমাল স্যুট কিংবা ক্যাজুয়াল যেকোনো আউটফিটের পারফেক্ট সঙ্গী।',
    specs: {
      'Display': '1.43" HD AMOLED Retina 466x466 Curved Glass',
      'Strap': 'Magnetic Infinite Adjust Milanese Steel Strap',
      'Battery': '৭ দিন একটানা ব্যাকআপ',
      'NFC': 'Built-in Multifunctional NFC Access Key'
    },
    features: [
      'সুইস ওয়াচ লাক্সারি ডিজাইন অনুপ্রেরণা',
      'হৃদস্পন্দন ও স্লিপ মনিটরিং নির্ভুল সেন্সর'
    ]
  },
  {
    id: 'shopt-g8',
    title: 'মিলিটারি গ্রিন ট্যাকটিক্যাল GPS ওয়াটারপ্রুফ স্মার্টওয়াচ',
    titleEn: 'Military Green Tactical GPS Waterproof Smartwatch',
    category: 'smartwatches',
    categoryBn: 'স্মার্টওয়াচ',
    price: 4450,
    oldPrice: 5800,
    discount: '২৩% ছাড়',
    rating: 4.8,
    ratingCount: 178,
    badge: 'মিলিটারি গ্রেড',
    badgeType: 'rugged',
    image: watchTactical,
    images: [watchTactical, watchTitanium, watchFitness],
    brand: 'G-Force Tactical',
    inStock: true,
    stockCount: 22,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'শকপ্রুফ পলিমার আর্মার বেজেল, অল্টিমিটার, ব্যারোমিটার ও বিল্ট-ইন কম্পাস সেন্সরযুক্ত মিলিটারি গ্রেড হেভি-ডিউটি আউটডোর স্মার্টওয়াচ।',
    specs: {
      'Water Resistance': '5ATM / 50M Water Resistance (সাঁতারে ব্যবহারযোগ্য)',
      'Sensors': 'Real Compass, Barometer, Altimeter, GPS Route Tracking',
      'Durability': 'MIL-STD-810H Military Shockproof Certified'
    },
    features: [
      'আউটডোর ট্র্যাকিং ও স্পোর্টস মুভমেন্ট রেকর্ডার',
      'রিভড ডাস্টপ্রুফ সিলিকন স্ট্র্যাপ'
    ]
  },
  {
    id: 'shopt-g9',
    title: 'কার্ভড 3D গ্লাস এরোডাইনামিক স্লিম ফিটনেস ব্যান্ড',
    titleEn: 'Curved 3D Glass Aerodynamic Fitness Band',
    category: 'smartwatches',
    categoryBn: 'স্মার্টওয়াচ ও ট্র্যাকার',
    price: 2450,
    oldPrice: 3200,
    discount: '২৩% ছাড়',
    rating: 4.7,
    ratingCount: 290,
    badge: 'স্লিম ও লাইট',
    badgeType: 'daily',
    image: watchFitness,
    images: [watchFitness, ringCeramic, watchMilanese],
    brand: 'PulseFit Pro',
    inStock: true,
    stockCount: 35,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'আল্ট্রা-স্লিম কার্ভড ওলেড স্ক্রিন, স্টেপ ও ক্যালোরি ট্র্যাকিং ও স্লিপ অ্যানালাইসিসযুক্ত লাইটওয়েট ফিটনেস ট্র্যাকার ব্যান্ড।',
    specs: {
      'Screen': '1.62" Full Touch Curved AMOLED Display',
      'Weight': 'মাত্র ১৩.৫ গ্রাম (হাতে থাকা বোঝাই যায় না)',
      'Battery': '১৪ দিন আল্ট্রা লং ব্যাটারি লাইফ'
    },
    features: [
      '২৪ ঘণ্টা নির্ভুল হার্ট রেট ও SpO2 ট্র্যাকিং',
      '১২০+ স্পোর্টস ও জিম ওয়ার্কআউট মোড'
    ]
  },
  {
    id: 'shopt-g10',
    title: 'স্মার্ট সিরামিক হেলথ ট্র্যাকার রিং ওয়্যারলেস ডকসহ',
    titleEn: 'Smart Ceramic Health Tracker Ring with Charging Dock',
    category: 'smartwatches',
    categoryBn: 'স্মার্টওয়াচ ও ট্র্যাকার',
    price: 5250,
    oldPrice: 7000,
    discount: '২৫% ছাড়',
    rating: 4.9,
    ratingCount: 95,
    badge: 'ফিউচার টেক',
    badgeType: 'future',
    image: ringCeramic,
    images: [ringCeramic, watchFitness, chargerMagsafe],
    brand: 'AuraRing Future',
    inStock: true,
    stockCount: 11,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'ঘড়ির ঝামেলা ছাড়াই আঙুলে পরে স্লিপ, স্ট্রেস ও শরীরের তাপমাত্রা মাপার আল্ট্রা-লাক্সারি সিরামিক স্মার্ট রিং। প্যাকেজের সাথে ম্যাগনেটিক চার্জিং ডক ফ্রি।',
    specs: {
      'Material': 'Polished Scratch-Proof Medical Ceramic & Rose Gold Inlay',
      'Sensors': 'Optical PPG, Skin Temperature, 3D Accelerometer',
      'Battery': '৬-৭ দিন পার চার্জ ব্যাকআপ (ম্যাগনেটিক ডকসহ)',
      'Waterproof': '10ATM 100M Water Resistant'
    },
    features: [
      'ঘুমের প্রতিটি ধাপ (REM, Deep, Light) পুঙ্খানুপুঙ্খ রেকর্ড',
      'কোনো স্ক্রিন নোটিফিকেশনের ডিস্ট্রাকশন ছাড়া পিওর হেলথ ট্র্যাকিং'
    ]
  },

  // --- Fast Chargers & Powerbanks ---
  {
    id: 'shopt-g11',
    title: '১০০ ওয়াট GaN ট্রিপল-পোর্ট আল্ট্রা-কম্প্যাক্ট ফাস্ট চার্জার',
    titleEn: '100W GaN Triple-Port Ultra-Compact Fast Wall Charger',
    category: 'chargers',
    categoryBn: 'ফাস্ট চার্জার ও পাওয়ার',
    price: 2650,
    oldPrice: 3500,
    discount: '২৪% ছাড়',
    rating: 4.9,
    ratingCount: 310,
    badge: 'পাওয়ার সেলার',
    badgeType: 'hot',
    image: chargerGan,
    images: [chargerGan, cableOled, chargerMagsafe],
    brand: 'VoltCraft GaN',
    inStock: true,
    stockCount: 40,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'একসাথে ম্যাকবুক, আইফোন এবং স্যামসাং ফোন ফুল স্পিডে চার্জ করার জন্য লেটেস্ট GaN III চিপসেটযুক্ত ট্রিপল পোর্ট ১০০ ওয়াট সুপার ফাস্ট চার্জার।',
    specs: {
      'Power Output': '100W Max PD 3.0, PPS, QC 4.0 Fast Charge',
      'Ports': '2x Type-C (100W Max) + 1x USB-A (22.5W Max)',
      'Safety': 'Auto Temperature & Overcharge Protection Chip',
      'Compatibility': 'MacBook Pro, iPhone, iPad, Samsung, Dell, Asus'
    },
    features: [
      'ফোল্ডেবল কমপ্যাক্ট ট্রাভেল প্লাগ',
      'সাধারণ চার্জারের তুলনায় ৪ গুণ দ্রুত চার্জ'
    ]
  },
  {
    id: 'shopt-g12',
    title: '২০,০০০mAh সাইবারপাঙ্ক ট্রান্সপারেন্ট ফাস্ট পাওয়ারব্যাংক 65W',
    titleEn: '20,000mAh Cyberpunk Transparent 65W Fast Power Bank',
    category: 'chargers',
    categoryBn: 'ফাস্ট চার্জার ও পাওয়ার',
    price: 3850,
    oldPrice: 5000,
    discount: '২৩% ছাড়',
    rating: 4.9,
    ratingCount: 420,
    badge: 'ট্রান্সপারেন্ট হিট',
    badgeType: 'hot',
    image: powerbankCyber,
    images: [powerbankCyber, powerbankRugged, cableOled],
    brand: 'CyberVolt Lab',
    inStock: true,
    stockCount: 25,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'ট্রান্সপারেন্ট কেসিংয়ে সার্কিট ও ব্যাটারি সেল দৃশ্যমান! ইনপুট-আউটপুট ওয়াট রিয়েলটাইমে প্রদর্শনের জন্য হাই-ডেফিনিশন কালার এলইডি ডিসপ্লেযুক্ত।',
    specs: {
      'Capacity': '20,000mAh (74Wh Airline Approved)',
      'Output': '65W Max Type-C Laptop Fast Charging',
      'Display': 'Real-Time Watts, Volts & Amps Color Screen',
      'Recharge Time': 'পাওয়ারব্যাংক ফুল চার্জ মাত্র ৯০ মিনিটে'
    },
    features: [
      'ল্যাপটপ ও ফোন একইসাথে ফাস্ট চার্জিং সুবিধা',
      'ইন্ডাস্ট্রিয়াল প্রিমিয়াম বিল্ড ও ট্রান্সপারেন্ট ভিউ'
    ]
  },
  {
    id: 'shopt-g13',
    title: '৩-ইন-১ ম্যাগনেটিক ম্যাগসেফ ফ্লোটিং অ্যালুমিনিয়াম চার্জিং ডক',
    titleEn: '3-in-1 Magnetic MagSafe Floating Aluminum Charging Stand',
    category: 'chargers',
    categoryBn: 'ফাস্ট চার্জার ও পাওয়ার',
    price: 3450,
    oldPrice: 4600,
    discount: '২৫% ছাড়',
    rating: 4.8,
    ratingCount: 165,
    badge: 'ডেস্ক লাক্সারি',
    badgeType: 'choice',
    image: chargerMagsafe,
    images: [chargerMagsafe, chargerGan, phoneTitanium],
    brand: 'DeskCraft Studio',
    inStock: true,
    stockCount: 18,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'সিএনসি অ্যানোডাইজড অ্যালুমিনিয়াম স্ট্যান্ডে আইফোন ভাসিয়ে রাখা, অ্যাপল ওয়াচ ও ইয়ারবাডস একসাথে চার্জ দেওয়ার অল-ইন-ওয়ান ডেক্স অর্গানাইজার।',
    specs: {
      'Total Output': '25W Fast Wireless Multi-Device Charging',
      'Phone Pad': '15W Fast MagSafe Strong Neodymium Magnets',
      'Build': 'Aerospace Anodized Space Gray Aluminum Body'
    },
    features: [
      'তারের জঞ্জালমুক্ত টেবিল সেটাপ',
      'ভার্টিক্যাল ও হরাইজন্টাল দুইভাবেই ফোন মাউন্ট করার সুবিধা'
    ]
  },
  {
    id: 'shopt-g14',
    title: '৩০,০০০mAh হেভি-ডিউটি আউটডোর রাগড পাওয়ার স্টেশন',
    titleEn: '30,000mAh Heavy-Duty Outdoor Rugged Power Station',
    category: 'chargers',
    categoryBn: 'ফাস্ট চার্জার ও পাওয়ার',
    price: 4650,
    oldPrice: 6200,
    discount: '২৫% ছাড়',
    rating: 4.9,
    ratingCount: 189,
    badge: 'আউটডোর পাওয়ার',
    badgeType: 'rugged',
    image: powerbankRugged,
    images: [powerbankRugged, powerbankCyber, chargerGan],
    brand: 'TerraVolt Rugged',
    inStock: true,
    stockCount: 15,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'শকপ্রুফ কর্নার, ব্রাইট এলইডি ক্যাম্পিং লাইট ও মাল্টিপল ফাস্ট চার্জিং পোর্টযুক্ত ট্যুর ও ট্রাভেলিংয়ের জন্য আদর্শ পাওয়ারব্যাংক।',
    specs: {
      'Capacity': '30,000mAh Ultra High Capacity',
      'Built-in Light': '3-Mode LED Camping Spotlight (Flash & SOS)',
      'Fast Charging': '22.5W QC & 20W PD Fast Charging Support'
    },
    features: [
      'ধুলো ও হালকা বৃষ্টি প্রতিরোধী সিলড পোর্ট কভার',
      'আইফোন ৭-৮ বার ফুল চার্জ করার বিপুল সক্ষমতা'
    ]
  },
  {
    id: 'shopt-g15',
    title: '২৪০ ওয়াট রিয়েলটাইম OLED ওয়াট মিটার ব্রেইডেড টাইপ-সি ক্যাবল',
    titleEn: '240W Real-time OLED Wattage Meter Braided Type-C Cable',
    category: 'chargers',
    categoryBn: 'ফাস্ট চার্জার ও পাওয়ার',
    price: 850,
    oldPrice: 1200,
    discount: '২৯% ছাড়',
    rating: 4.8,
    ratingCount: 520,
    badge: 'বেস্ট অ্যাক্সেসরি',
    badgeType: 'daily',
    image: cableOled,
    images: [cableOled, chargerGan, powerbankCyber],
    brand: 'VoltCraft Pro',
    inStock: true,
    stockCount: 80,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'ক্যাবল হেডে ছোট্ট ওলেড স্ক্রিন রিয়েলটাইমে কত ওয়াটে চার্জ হচ্ছে তা সরাসরি দেখায়। বুলেটপ্রুফ নাইলন ব্রেইডেড ফাইবার কোটিং।',
    specs: {
      'Max Wattage': '240W 48V/5A Ultra PD 3.1 Fast Charge',
      'Display': 'Real-Time Wattage OLED Display Chip',
      'Length': '1.2 Meter Heavy-Duty Braided Cable'
    },
    features: [
      '৩০,০০০+ বেন্ড টেস্ট সার্টিফাইড টেকসই বিল্ড',
      'ল্যাপটপ, ট্যাবলেট ও যেকোনো ফোনের সাথে ১০০% সুরক্ষিত'
    ]
  },

  // --- Flagship Smartphones ---
  {
    id: 'shopt-g16',
    title: 'টাইটানিয়াম ট্রিপল পেরিস্কোপ ক্যামেরা ফ্ল্যাগশিপ স্মার্টফোন',
    titleEn: 'Ultra Titanium Triple-Camera Flagship Smartphone',
    category: 'smartphones',
    categoryBn: 'স্মার্টফোন',
    price: 118000,
    oldPrice: 135000,
    discount: '১২% ছাড়',
    rating: 5.0,
    ratingCount: 78,
    badge: 'ফ্ল্যাগশিপ কিং',
    badgeType: 'flagship',
    image: phoneTitanium,
    images: [phoneTitanium, phoneGlyph, phoneVeganLeather],
    brand: 'Apex Titan 16 Pro',
    inStock: true,
    stockCount: 6,
    warranty: '১ বছরের অফিসিয়াল সার্ভিস ও রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'ন্যাচারাল টাইটানিয়াম ফ্রেম, ২০০ মেগাপিক্সেল পেরিস্কোপ টেলিফটো ক্যামেরা ও ৬.৮ ইঞ্চি ১২০Hz LTPO সুপার ব্রাইট ফ্ল্যাট স্ক্রিন।',
    specs: {
      'Display': '6.8" QHD+ LTPO AMOLED 120Hz 2600nits',
      'Processor': 'Snapdragon 8 Gen 3 Flagship 4nm Processor',
      'Camera': '200MP Main + 50MP 5x Periscope + 50MP Ultrawide',
      'Battery': '5000mAh with 100W Wired & 50W Wireless Charging'
    },
    features: [
      'অফিসিয়াল বিটিআরসি অনুমোদিত আইএমইআই স্ট্যাটাস',
      'টাইটানিয়াম গ্রেড ৫ অ্যারোস্পেস মেটাল বডি'
    ]
  },
  {
    id: 'shopt-g17',
    title: 'ফিউচারিস্টিক গ্লিফ ইন্টারফেস ট্রান্সপারেন্ট স্মার্টফোন 5G',
    titleEn: 'Futuristic Transparent Glyph Interface 5G Smartphone',
    category: 'smartphones',
    categoryBn: 'স্মার্টফোন',
    price: 54500,
    oldPrice: 62000,
    discount: '১২% ছাড়',
    rating: 4.8,
    ratingCount: 110,
    badge: 'ইউনিক ডিজাইন',
    badgeType: 'future',
    image: phoneGlyph,
    images: [phoneGlyph, phoneTitanium, phoneGamingRgb],
    brand: 'Glyph Phone 2',
    inStock: true,
    stockCount: 9,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'পেছনের গ্লাস প্যানেলে কাস্টমাইজেবল গ্লিফ এলইডি লাইট ইন্টারফেস, ফ্ল্যাট অ্যালুমিনিয়াম সাইড ও পিওর ক্লিন স্টক ওএস এক্সপেরিয়েন্স।',
    specs: {
      'Display': '6.7" Flexible OLED 120Hz Adaptive Refresh',
      'Camera': 'Dual 50MP Sony Flagship Sensors with OIS',
      'OS': 'Pure Clean Nothing-Style OS with Zero Bloatware'
    },
    features: [
      'কল আসলে গান অনুযায়ী পেছনের এলইডি ডান্স করে',
      'প্রিমিয়াম ইউনিক ডিজাইন যা সবার চোখ কাড়বে'
    ]
  },
  {
    id: 'shopt-g18',
    title: 'লাক্সারি ভেগান লেদার কার্ভড ওলেড ফ্ল্যাগশিপ স্মার্টফোন',
    titleEn: 'Luxury Curved Vegan Leather OLED Flagship Phone',
    category: 'smartphones',
    categoryBn: 'স্মার্টফোন',
    price: 68500,
    oldPrice: 79000,
    discount: '১৩% ছাড়',
    rating: 4.9,
    ratingCount: 65,
    badge: 'লাক্সারি এডিশন',
    badgeType: 'choice',
    image: phoneVeganLeather,
    images: [phoneVeganLeather, phoneTitanium, phoneGamingRgb],
    brand: 'Aura Luxe Ultra',
    inStock: true,
    stockCount: 8,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'এমারেল্ড গ্রিন ভেগান লেদার ব্যাক, গোল্ড ক্যামেরা ডায়াল ও কোয়াড কার্ভড ওলেড স্ক্রিনযুক্ত স্টাইলিশ হ্যান্ডসেট।',
    specs: {
      'Display': '6.78" 1.5K 3D Curved AMOLED 120Hz 2800nits',
      'Back Panel': 'Eco-Friendly Stain-Proof Vegan Leather',
      'Camera': 'ZEISS Optics 50MP 1-inch Master Camera Sensor'
    },
    features: [
      'হাতে নিলে প্রিমিয়াম লেদারের ক্লাসি অনুভূতি',
      '১২০ ওয়াট ফ্ল্যাশ চার্জিং (১৫ মিনিটে ১০০% চার্জ)'
    ]
  },
  {
    id: 'shopt-g19',
    title: 'সাইবার আরজিবি অ্যাক্টিভ কুলিং ফ্যানযুক্ত গেমিং ফোন 5G',
    titleEn: 'Cyber RGB Active Cooling Fan Gaming Smartphone 5G',
    category: 'smartphones',
    categoryBn: 'স্মার্টফোন ও গেমিং',
    price: 76000,
    oldPrice: 88000,
    discount: '১৪% ছাড়',
    rating: 4.9,
    ratingCount: 140,
    badge: 'গেমিং বিস্ট',
    badgeType: 'gaming',
    image: phoneGamingRgb,
    images: [phoneGamingRgb, phoneGlyph, laptopGaming],
    brand: 'RedMatrix Cyber',
    inStock: true,
    stockCount: 7,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'ফোন যাতে কখনো গরম না হয় সেজন্য ২০,০০০ আরপিএম বিল্ট-ইন কুলিং ফ্যান, শোল্ডার গেমিং বাটন ও ১৬৫Hz আল্ট্রা ফাস্ট ডিসপ্লে।',
    specs: {
      'Cooling': 'Active Internal 20,000 RPM RGB Turbofan Cooling',
      'Screen': '6.8" Seamless AMOLED 165Hz (No Notch/Hole)',
      'Controls': '520Hz Touch Dual Shoulder Triggers',
      'Battery': '6500mAh Huge Gaming Battery'
    },
    features: [
      'পাবজিতে একটানা ১২০ এফপিএস ল্যাগ ছাড়া পারফরম্যান্স',
      'হেডফোন জ্যাক ও বাইপাস চার্জিং সুবিধা'
    ]
  },

  // --- Laptops & Ultrabooks ---
  {
    id: 'shopt-g20',
    title: 'স্পেস ব্ল্যাক সিএনসি মেটাল ইউনিবডি আল্ট্রাবুক ল্যাপটপ',
    titleEn: 'Space Black CNC Metal Unibody Pro Ultrabook',
    category: 'laptops',
    categoryBn: 'ল্যাপটপ ও আল্ট্রাবুক',
    price: 142000,
    oldPrice: 165000,
    discount: '১৪% ছাড়',
    rating: 5.0,
    ratingCount: 52,
    badge: 'মাস্টারপিস',
    badgeType: 'flagship',
    image: laptopSpaceblack,
    images: [laptopSpaceblack, laptopCarbon, laptopDualscreen],
    brand: 'ZenBook Pro Craft',
    inStock: true,
    stockCount: 5,
    warranty: '২ বছরের অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি',
    description: 'ম্যাকবুক প্রো স্টাইল স্পেস ব্ল্যাক অ্যানোডাইজড অ্যালুমিনিয়াম চ্যাসিস, বর্ডারলেস লিকুইড রেটিনা স্ক্রিন ও ২২ ঘণ্টা একটানা ব্যাটারি ব্যাকআপ।',
    specs: {
      'Display': '14.2" 3K Liquid Retina 120Hz ProMotion 1600nits',
      'Processor': 'Apple M-Series / Intel Core Ultra 9 16-Core',
      'RAM / Storage': '32GB Unified RAM + 1TB PCIe 4.0 NVMe SSD',
      'Battery Life': '২২ ঘণ্টা একটানা অফিস ও কোডিং ব্যাকআপ'
    },
    features: [
      'স্টুডিও গ্রেড সিক্স-স্পিকার সাউন্ড সিস্টেম',
      'ম্যাগসেফ ও থান্ডারবোল্ট ৪ হাই-স্পিড পোর্টস'
    ]
  },
  {
    id: 'shopt-g21',
    title: 'ডুয়াল-স্ক্রিন ফিউচারিস্টিক OLED টাচস্ক্রিন ল্যাপটপ',
    titleEn: 'Dual-Screen Futuristic OLED Touchscreen Laptop',
    category: 'laptops',
    categoryBn: 'ল্যাপটপ ও আল্ট্রাবুক',
    price: 185000,
    oldPrice: 215000,
    discount: '১৪% ছাড়',
    rating: 4.9,
    ratingCount: 38,
    badge: 'ডুয়াল স্ক্রিন',
    badgeType: 'future',
    image: laptopDualscreen,
    images: [laptopDualscreen, laptopSpaceblack, tabletAndroid],
    brand: 'DuoScreen NextGen',
    inStock: true,
    stockCount: 4,
    warranty: '২ বছরের অফিসিয়াল ওয়ারেন্টি',
    description: 'কীবোর্ডের বদলে ফুল সাইজ সেকেন্ডারি ওলেড টাচস্ক্রিন! একসাথে দুটি ফুল স্ক্রিনে মাল্টিটাস্কিং, প্রোগ্রামিং ও ভিডিও এডিটিংয়ের বিপ্লব।',
    specs: {
      'Screens': 'Dual 14" 3K OLED 120Hz 100% DCI-P3 Color Accurate',
      'Keyboard': 'Detachable Full-Size Bluetooth Magnetic Keyboard',
      'Specs': 'Core Ultra 7 + 32GB RAM + 1TB SSD',
      'Stylus': 'Asus Pen 2.0 Stylus Included'
    },
    features: [
      'ভিডিও এডিটর, প্রোগ্রামার ও স্টক ট্রেডারদের জন্য ড্রিম মেশিন',
      'ইনবিল্ট কিকস্ট্যান্ডে পাশাপাশি বা উপরে-নিচে স্ক্রিন ব্যবহারের সুবিধা'
    ]
  },
  {
    id: 'shopt-g22',
    title: 'কার্বন ফাইবার ম্যাগনেসিয়াম আল্ট্রালাইট বিজনেস ল্যাপটপ',
    titleEn: 'Carbon Fiber Magnesium Ultralight Business Laptop',
    category: 'laptops',
    categoryBn: 'ল্যাপটপ ও আল্ট্রাবুক',
    price: 125000,
    oldPrice: 145000,
    discount: '১৪% ছাড়',
    rating: 4.8,
    ratingCount: 44,
    badge: 'বিজনেস এলিট',
    badgeType: 'choice',
    image: laptopCarbon,
    images: [laptopCarbon, laptopSpaceblack, laptopGaming],
    brand: 'ThinkCraft X1',
    inStock: true,
    stockCount: 7,
    warranty: '২ বছরের অনসাইট ওয়ারেন্টি',
    description: 'ম্যাট ব্ল্যাক কার্বন ফাইবার কোটিং, মিলিটারি ড্রপ সার্টিফাইড স্থায়িত্ব ও লিজেন্ডারি টাইপিং কমফোর্টের বিজনেস ফ্ল্যাগশিপ ল্যাপটপ।',
    specs: {
      'Weight': 'মাত্র ১.১২ কেজি (অত্যন্ত হালকা ও বহনযোগ্য)',
      'Display': '14" 16:10 Anti-Glare 2.8K OLED Display',
      'Security': 'Fingerprint, IR Face Unlock & Webcam Privacy Shutter'
    },
    features: [
      'সারা দিন চার্জে না লাগিয়ে মিটিং ও কাজের স্বাধীনতা',
      'ড্রপ ও স্পিল প্রতিরোধী কিবোর্ড ড্রেনেজ ডিজাইন'
    ]
  },
  {
    id: 'shopt-g23',
    title: 'হেভি এক্সহস্ট আরজিবি মেকানিক্যাল গেমিং ল্যাপটপ RTX 4080',
    titleEn: 'Heavy RGB Mechanical Gaming Laptop RTX 4080',
    category: 'laptops',
    categoryBn: 'ল্যাপটপ ও গেমিং',
    price: 215000,
    oldPrice: 245000,
    discount: '১২% ছাড়',
    rating: 5.0,
    ratingCount: 31,
    badge: 'গেমিং দানব',
    badgeType: 'gaming',
    image: laptopGaming,
    images: [laptopGaming, keyboardMechanical, mouseGaming],
    brand: 'CyberBeast ROG Edition',
    inStock: true,
    stockCount: 3,
    warranty: '২ বছরের অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি',
    description: 'RTX 4080 12GB গ্রাফিক্স, লিকুইড মেটাল কুলিং এক্সহস্ট ও পার-কী মেকানিক্যাল আরজিবি কীবোর্ডযুক্ত আল্টিমেট গেমিং রিগ।',
    specs: {
      'GPU': 'NVIDIA GeForce RTX 4080 12GB GDDR6 175W TGP',
      'CPU': 'Intel Core i9-14900HX 24-Cores 5.8GHz Max Boost',
      'Display': '16" QHD+ 240Hz 3ms 100% DCI-P3 G-Sync',
      'RAM / SSD': '32GB DDR5 5600MHz + 2TB Gen4 SSD'
    },
    features: [
      '৪K আল্ট্রা সেটিংসে যেকোনো গেম ১০০+ এফপিএস রান করে',
      'আগ্রাসী সাইবার এরোডাইনামিক এয়ারফ্লো ভেন্ট'
    ]
  },

  // --- Gaming Gear & Tablets ---
  {
    id: 'shopt-g24',
    title: 'স্লিম মেটাল এন্টারটেইনমেন্ট ট্যাবলেট 11-ইঞ্চি কোয়াড স্পিকার',
    titleEn: 'Slim Metal 11-inch Entertainment Tablet with Quad Speakers',
    category: 'gaming',
    categoryBn: 'ট্যাবলেট ও গিয়ার',
    price: 36500,
    oldPrice: 44000,
    discount: '১৭% ছাড়',
    rating: 4.8,
    ratingCount: 125,
    badge: 'এন্টারটেইনমেন্ট কিং',
    badgeType: 'choice',
    image: tabletAndroid,
    images: [tabletAndroid, laptopDualscreen, ringCeramic],
    brand: 'TabVision Elite',
    inStock: true,
    stockCount: 14,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'মুভি দেখা ও পড়াশোনার জন্য ডলবি অ্যাটমস কোয়াড স্পিকার, ১১ ইঞ্চি ২.৫কে ১২০Hz সিনেম্যাটিক ডিসপ্লে ও স্লিম মেটাল ইউনিবডি ট্যাবলেট।',
    specs: {
      'Display': '11" 2.5K Eye-Care IPS 120Hz Refresh Rate',
      'Speakers': 'Quad Stereo Speakers with Dolby Atmos Audio',
      'Battery': '8600mAh Huge Battery (১৪ ঘণ্টা ভিডিও প্লেব্যাক)',
      'Stylus Support': 'Active Stylus Pen Supported'
    },
    features: [
      'নেটফ্লিক্স ও ইউটিউবে ফুল এইচডি এইচডিআর স্ট্রিমিং',
      'স্প্লিট-স্ক্রিন মাল্টিটাস্কিং সাপোর্ট'
    ]
  },
  {
    id: 'shopt-g25',
    title: '৭৫% হট-সোয়াপ্যাবল কাস্টম আরজিবি মেকানিক্যাল কীবোর্ড',
    titleEn: '75% Hot-Swappable Custom RGB Mechanical Keyboard',
    category: 'gaming',
    categoryBn: 'গেমিং গিয়ার',
    price: 4850,
    oldPrice: 6500,
    discount: '২৫% ছাড়',
    rating: 4.9,
    ratingCount: 340,
    badge: 'কাস্টম মেকানিক্যাল',
    badgeType: 'gaming',
    image: keyboardMechanical,
    images: [keyboardMechanical, mouseGaming, laptopGaming],
    brand: 'MechCraft Custom',
    inStock: true,
    stockCount: 20,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'ফ্রস্টেড স্মোকি এক্রিলিক বডি, প্রি-লুবড স্মুথ সুইচ ও সাউথ-ফেসিং ভাইব্রেন্ট আরজিবি ব্যাকলাইটিংসহ টাইপিং ও কোডিংয়ের স্বর্গীয় অভিজ্ঞতা।',
    specs: {
      'Layout': '75% Compact (82 Keys) + CNC Aluminum Knob',
      'Switches': 'Gateron Pro Yellow Pre-Lubed Linear Switches',
      'Keycaps': 'Thick Cherry Profile PBT Dye-Sub Keycaps',
      'Connectivity': 'Bluetooth 5.1 + 2.4GHz Wireless + Type-C Wired'
    },
    features: [
      'হট-সোয়াপ্যাবল (পছন্দমতো যেকোনো সুইচ বদলানো যায়)',
      'সাউন্ড ড্যাম্পেনিং সিলিকন প্যাড (ডিপ থকি সাউন্ড)'
    ]
  },
  {
    id: 'shopt-g26',
    title: 'হানি-কম্ব ওয়্যারলেস আল্ট্রালাইট গেমিং মাউস সায়ান আন্ডার-গ্লো',
    titleEn: 'Honeycomb Wireless Ultralight Gaming Mouse Cyan Glow',
    category: 'gaming',
    categoryBn: 'গেমিং গিয়ার',
    price: 2450,
    oldPrice: 3400,
    discount: '২৮% ছাড়',
    rating: 4.8,
    ratingCount: 280,
    badge: 'আল্ট্রা-লাইট',
    badgeType: 'gaming',
    image: mouseGaming,
    images: [mouseGaming, keyboardMechanical, earbudsGaming],
    brand: 'AeroStrike Wireless',
    inStock: true,
    stockCount: 26,
    warranty: '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    description: 'হাতে কোনো ঘাম না জমিয়ে দ্রুততম রিফ্লেক্স পেতে মাত্র ৫৬ গ্রাম ওজনের হানি-কম্ব শেল, ২৬,০০০ ডিপিআই অপটিক্যাল সেন্সর ও ১০০% পিটিএফই গ্লাইড ফিট।',
    specs: {
      'Weight': '56 Grams Featherweight Honeycomb Body',
      'Sensor': 'PAW3395 Flagship 26,000 DPI Optical Sensor',
      'Switches': 'Kailh GM 8.0 80 Million Clicks Micro Switches',
      'Battery': '৮০ ঘণ্টা একটানা ওয়্যারলেস গেমিং'
    },
    features: [
      'পিটিএফই স্কেটসের কারণে মাউসপ্যাডে বরফের মতো মসৃণ চলাচল',
      'সায়ান নিয়ন আরজিবি আন্ডারগ্লো লাইটিং'
    ]
  }
];

export const TRUST_PILLARS = [
  {
    id: 'tp-1',
    icon: 'ShieldCheck',
    title: '১০০% অরিজিনাল গ্যাজেট',
    desc: 'সরাসরি ব্র্যান্ডের অফিসিয়াল সোর্স থেকে আমদানিকৃত জেনুইন প্রোডাক্ট।'
  },
  {
    id: 'tp-2',
    icon: 'Zap',
    title: '১ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি',
    desc: 'কোনো মেরামত নয়, ত্রুটি থাকলে দ্রুত নতুন প্রোডাক্ট রিপ্লেসমেন্ট সুবিধা।'
  },
  {
    id: 'tp-3',
    icon: 'Truck',
    title: '২৪-৪৮ ঘণ্টায় ফাস্ট ডেলিভারি',
    desc: 'সারা দেশে কুরিয়ার পার্টনারদের মাধ্যমে হোম ডেলিভারি ব্যবস্থা।'
  },
  {
    id: 'tp-4',
    icon: 'CreditCard',
    title: 'ক্যাশ অন ডেলিভারি ও বিকাশ',
    desc: 'পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধের সম্পূর্ণ নিরাপদ সুবিধা।'
  }
];
