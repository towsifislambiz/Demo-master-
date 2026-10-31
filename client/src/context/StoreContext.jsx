import React, { createContext, useContext, useState, useEffect } from 'react';
import { NICHES } from '../data/masterStoresData';
import { SHELAI_PRODUCTS, SHELAI_HERO_SLIDES } from '../data/shelaiFashionData';
import { RIBANA_PRODUCTS, RIBANA_HERO_SLIDES } from '../data/ribanaBeautyData';
import { SHOPT_GADGETS } from '../data/shoptGadgetData';
import { GHORER_BAZAR_PRODUCTS } from '../data/ghorerBazarData';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

const StoreContext = createContext();

// Initial realistic sample orders for demo (Both Beauty & Fashion)
const INITIAL_DEMO_ORDERS = [
  {
    id: 'GB-982141',
    orderId: 'GB-982141',
    niche: 'organic',
    customerName: 'ড. রফিকুল ইসলাম',
    phone: '01715-998877',
    address: 'বাড়ি ১২, রোড ৭, সেক্টর ৪, উত্তরা, ঢাকা',
    city: 'ঢাকা সিটি',
    area: 'ঢাকা সিটি',
    paymentMethod: 'ক্যাশ অন ডেলিভারি (Cash on Delivery)',
    subtotal: 1780,
    deliveryCharge: 0,
    discount: 0,
    total: 1780,
    status: 'Delivered',
    date: '২৮ অক্টোবর ২০২৬',
    items: [
      {
        id: 'gb-honey-sundarban',
        title: 'সুন্দরবনের প্রাকৃতিক চাকের খাঁটি মধু',
        price: 890,
        weight: '৫০০ গ্রাম',
        quantity: 2,
        image: '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.webp'
      }
    ]
  },
  {
    id: 'GB-982142',
    orderId: 'GB-982142',
    niche: 'organic',
    customerName: 'সামসুন্নাহার মিলি',
    phone: '01819-445566',
    address: 'ফ্ল্যাট ৪বি, ধানমন্ডি রোড ৮/এ, ঢাকা',
    city: 'ঢাকা সিটি',
    area: 'ঢাকা সিটি',
    paymentMethod: 'ক্যাশ অন ডেলিভারি (Cash on Delivery)',
    subtotal: 1490,
    deliveryCharge: 70,
    discount: 0,
    total: 1560,
    status: 'Processing',
    date: '২৯ অক্টোবর ২০২৬',
    items: [
      {
        id: 'gb-honey-nuts',
        title: 'প্রিমিয়াম হানি নাটস এনার্জি বুস্টার',
        price: 1490,
        weight: '৮০০ গ্রাম',
        quantity: 1,
        image: '/organic-images/Honey_jar_on_wooden_board_d5a41667.webp'
      }
    ]
  },
  {
    id: 'SHOPT-9921',
    orderId: 'SHOPT-9921',
    niche: 'gadgets',
    customerName: 'তানভীর আহমেদ',
    phone: '01711-224466',
    address: 'বাড়ি ১৪, রোড ৪, ধানমন্ডি, ঢাকা',
    city: 'ঢাকা সিটি',
    area: 'ঢাকা মেট্রো',
    paymentMethod: 'Cash on Delivery',
    subtotal: 5850,
    deliveryCharge: 0,
    discount: 0,
    total: 5850,
    status: 'Processing',
    date: '২৮ অক্টোবর ২০২৬',
    items: [
      {
        id: 'shopt-g6',
        title: 'আল্ট্রা টাইটানিয়াম রাগড আউটডোর স্মার্টওয়াচ 49mm AMOLED',
        price: 5850,
        quantity: 1,
        image: SHOPT_GADGETS[5]?.image
      }
    ]
  },
  {
    id: 'SHOPT-9922',
    orderId: 'SHOPT-9922',
    niche: 'gadgets',
    customerName: 'রাফসান সাইদ',
    phone: '01819-335577',
    address: 'রোড ২, ও আর নিজাম রোড, জিইসি মোড়, চট্টগ্রাম',
    city: 'চট্টগ্রাম',
    area: 'ঢাকার বাইরে',
    paymentMethod: 'bKash',
    subtotal: 3250,
    deliveryCharge: 0,
    discount: 0,
    total: 3250,
    status: 'Delivered',
    date: '২৭ অক্টোবর ২০২৬',
    items: [
      {
        id: 'shopt-g1',
        title: 'সাইবারপাঙ্ক ট্রান্সপারেন্ট 45dB হাইব্রিড ANC ওয়্যারলেস ইয়ারবাডস',
        price: 3250,
        quantity: 1,
        image: SHOPT_GADGETS[0]?.image
      }
    ]
  },
  {
    id: 'RBN-784210',
    orderId: 'RBN-784210',
    niche: 'beauty',
    customerName: 'নুসরাত জাহান',
    phone: '01712-349812',
    address: 'বাড়ি ১৮, রোড ৭, সেক্টর ৪, উত্তরা, ঢাকা',
    city: 'ঢাকা সিটি',
    area: 'ঢাকা সিটি',
    paymentMethod: 'Cash on Delivery',
    subtotal: 2000,
    deliveryCharge: 0,
    discount: 0,
    total: 2000,
    status: 'Delivered',
    date: '২৫ অক্টোবর ২০২৬',
    items: [
      {
        id: 'rb-serum-1',
        title: 'রিভানা জাফরান ব্রাইটনিং সিরাম (৩০ মিলি)',
        price: 1250,
        quantity: 1,
        image: '/beauty-images/saffron_serum_card_exact.webp'
      },
      {
        id: 'rb-gel-1',
        title: 'রিভানা জাফরান ব্রাইটনিং ফেস জেল (১৩০ মিলি)',
        price: 750,
        quantity: 1,
        image: '/beauty-images/Saffron_face_gel_in_jar_20261027235337.webp'
      }
    ]
  },
  {
    id: 'RBN-784211',
    orderId: 'RBN-784211',
    niche: 'beauty',
    customerName: 'মেহজাবীন চৌধুরী',
    phone: '01819-876543',
    address: 'রোড ১২/এ, ধানমন্ডি, ঢাকা',
    city: 'ঢাকা সিটি',
    area: 'ঢাকা সিটি',
    paymentMethod: 'bKash',
    subtotal: 550,
    deliveryCharge: 60,
    discount: 0,
    total: 610,
    status: 'Delivered',
    date: '২৬ অক্টোবর ২০২৬',
    items: [
      {
        id: 'rb-soap-1',
        title: 'রিভানা জাফরান গোট মিল্ক সোপ (১১০ গ্রাম)',
        price: 550,
        quantity: 1,
        image: '/beauty-images/Goat_milk_soap_on_packaging_20261027235322.webp'
      }
    ]
  },
  {
    id: 'RBN-784212',
    orderId: 'RBN-784212',
    niche: 'beauty',
    customerName: 'আনিকা তাবাসসুম',
    phone: '01911-223344',
    address: 'প্লট ১২, ব্লক বি, বসুন্ধরা আ/এ, ঢাকা',
    city: 'ঢাকা সিটি',
    area: 'ঢাকা সিটি',
    paymentMethod: 'Cash on Delivery',
    subtotal: 850,
    deliveryCharge: 60,
    discount: 0,
    total: 910,
    status: 'Processing',
    date: '২৭ অক্টোবর ২০২৬',
    items: [
      {
        id: 'rb-oil-1',
        title: 'ভৃঙ্গরাজ ও কোল্ড-প্রেসড তেল (২০০ মিলি)',
        price: 850,
        quantity: 1,
        image: '/beauty-images/Bhringraj_herbal_hair_oil_bottle_20261027235350.webp'
      }
    ]
  },
  {
    id: 'RBN-784213',
    orderId: 'RBN-784213',
    niche: 'beauty',
    customerName: 'তানজিনা রহমান',
    phone: '01733-445566',
    address: 'উপশহর ব্লক ডি, সিলেট',
    city: 'সিলেট',
    area: 'ঢাকার বাইরে',
    paymentMethod: 'bKash',
    subtotal: 2450,
    deliveryCharge: 0,
    discount: 245,
    total: 2205,
    status: 'Pending',
    date: '২৮ অক্টোবর ২০২৬',
    items: [
      {
        id: 'rb-combo-1',
        title: 'কমপ্লিট অর্গানিক গিফট বক্স',
        price: 2450,
        quantity: 1,
        image: '/beauty-images/Skincare_gift_set_in_box_20261027235417.webp'
      }
    ]
  },
  {
    id: 'SHL-894210',
    customerName: 'নুসরাত জাহান',
    phone: '01712-349812',
    address: 'বাড়ি ১৮, রোড ৭, সেক্টর ৪, উত্তরা',
    city: 'ঢাকা সিটি',
    area: 'ঢাকা সিটি',
    paymentMethod: 'Cash on Delivery',
    subtotal: 12800,
    deliveryCharge: 0,
    discount: 0,
    total: 12800,
    status: 'Delivered',
    date: '২৫ অক্টোবর ২০২৬',
    items: [
      {
        id: 'sh-3p-1',
        title: 'মারিয়া বি. প্রিমিয়াম লাইলাক শিফন ৩-পিস',
        designer: 'MARIA B • LUXURY PRET',
        price: 12800,
        selectedSize: 'M',
        selectedStitching: 'Stitched',
        quantity: 1,
        image: '/fashion-images/Model_posing_in_chiffon_suit_20261026161901.webp'
      }
    ]
  },
  {
    id: 'SHL-894211',
    customerName: 'মেহজাবীন চৌধুরী',
    phone: '01819-876543',
    address: 'রোড ১২/এ, ধানমন্ডি',
    city: 'ঢাকা সিটি',
    area: 'ঢাকা সিটি',
    paymentMethod: 'bKash',
    subtotal: 16500,
    deliveryCharge: 0,
    discount: 825,
    total: 15675,
    status: 'Delivered',
    date: '২৫ অক্টোবর ২০২৬',
    items: [
      {
        id: 'sh-sr-1',
        title: 'আসল ঢাকাই জামদানি শাড়ি (সোনালী জরি)',
        designer: 'SHELAI HERITAGE • DHAKAI',
        price: 16500,
        selectedSize: 'Standard',
        selectedStitching: 'With Blouse Piece',
        quantity: 1,
        image: '/fashion-images/Model_wearing_Dhakai_Jamdani_saree_20261026161931.webp'
      }
    ]
  },
  {
    id: 'SHL-894212',
    customerName: 'সাবরিনা তাসনিম',
    phone: '01911-223344',
    address: 'প্লট ১২, ব্লক বি, বসুন্ধরা আ/এ',
    city: 'ঢাকা সিটি',
    area: 'ঢাকা সিটি',
    paymentMethod: 'Cash on Delivery',
    subtotal: 6200,
    deliveryCharge: 0,
    discount: 0,
    total: 6200,
    status: 'Processing',
    date: '২৬ অক্টোবর ২০২৬',
    items: [
      {
        id: 'sh-ab-2',
        title: 'সফট ডাস্টি মভ ফ্লেয়ার্ড ক্রিপ সিল্ক আবায়া',
        designer: 'MODEST CHIC',
        price: 6200,
        selectedSize: 'M',
        selectedStitching: 'Ready to Wear',
        quantity: 1,
        image: '/fashion-images/Model_wearing_charcoal_abaya_20261026162054.webp'
      }
    ]
  },
  {
    id: 'SHL-894213',
    customerName: 'জান্নাতুল ফেরদৌস',
    phone: '01622-998877',
    address: 'বাড়ি ৫, রোড ৩, খুলশী',
    city: 'চট্টগ্রাম',
    area: 'ঢাকার বাইরে',
    paymentMethod: 'Cash on Delivery',
    subtotal: 13500,
    deliveryCharge: 0,
    discount: 675,
    total: 12825,
    status: 'Pending',
    date: '২৬ অক্টোবর ২০২৬',
    items: [
      {
        id: 'sh-3p-2',
        title: 'সানিয়া মাসকাতিয়া রয়েল নেভি জারদৌসি ৩-পিস',
        designer: 'SANIA MASKATIYA • REGAL',
        price: 13500,
        selectedSize: 'L',
        selectedStitching: 'Stitched',
        quantity: 1,
        image: '/fashion-images/Model_posing_in_heritage_palace_20261026161853.webp'
      }
    ]
  },
  {
    id: 'SHL-894214',
    customerName: 'সুমাইয়া আক্তার',
    phone: '01733-445566',
    address: 'উপশহর ব্লক ডি, সিলেট',
    city: 'সিলেট',
    area: 'ঢাকার বাইরে',
    paymentMethod: 'Nagad',
    subtotal: 4200,
    deliveryCharge: 150,
    discount: 0,
    total: 4350,
    status: 'Processing',
    date: '২৬ অক্টোবর ২০২৬',
    items: [
      {
        id: 'sh-kt-3',
        title: 'রয়েল মারুন এমব্রয়ডার্ড লিনেন কুর্তি সেট',
        designer: 'GENES • CONTEMPORARY',
        price: 4200,
        selectedSize: 'M',
        selectedStitching: 'Ready to Wear',
        quantity: 1,
        image: '/fashion-images/Model_wearing_linen_kurti_20261026162041.webp'
      }
    ]
  },
  {
    id: 'SHL-894215',
    customerName: 'ফারহানা আহমেদ',
    phone: '01844-556677',
    address: 'বাড়ি ১৪, রোড ১১, বনানী',
    city: 'ঢাকা সিটি',
    area: 'ঢাকা সিটি',
    paymentMethod: 'Cash on Delivery',
    subtotal: 14800,
    deliveryCharge: 0,
    discount: 0,
    total: 14800,
    status: 'Pending',
    date: '২৭ অক্টোবর ২০২৬',
    items: [
      {
        id: 'sh-3p-5',
        title: 'অঘানূর এমব্রয়ডার্ড রয়েল ভেলভেট ৩-পিস',
        designer: 'AGHA NOOR • COUTURE',
        price: 14800,
        selectedSize: 'M',
        selectedStitching: 'Stitched',
        quantity: 1,
        image: '/fashion-images/Model_wearing_formal_pink_suit_20261026161859.webp'
      }
    ]
  },
  {
    id: 'SHL-894216',
    customerName: 'নাদিয়া সুলতানা',
    phone: '01955-667788',
    address: 'লেন ৪, ডিওএইচএস মিরপুর',
    city: 'ঢাকা সিটি',
    area: 'ঢাকা সিটি',
    paymentMethod: 'bKash',
    subtotal: 7500,
    deliveryCharge: 0,
    discount: 375,
    total: 7125,
    status: 'Delivered',
    date: '২৭ অক্টোবর ২০২৬',
    items: [
      {
        id: 'sh-ab-1',
        title: 'দুবাই ব্ল্যাক রয়াল এমব্রয়ডার্ড ফ্লেয়ার্ড আবায়া',
        designer: 'SHELAI DUBAI MODEST',
        price: 7500,
        selectedSize: '54',
        selectedStitching: 'Stitched',
        quantity: 1,
        image: '/fashion-images/Model_posing_in_silk_abaya_20261026162102.webp'
      }
    ]
  },
  {
    id: 'SHL-894217',
    customerName: 'তাসনুভা রহমান',
    phone: '01677-889900',
    address: 'কান্দিরপাড়, কুমিল্লা',
    city: 'কুমিল্লা',
    area: 'ঢাকার বাইরে',
    paymentMethod: 'Cash on Delivery',
    subtotal: 12200,
    deliveryCharge: 0,
    discount: 0,
    total: 12200,
    status: 'Pending',
    date: '২৭ অক্টোবর ২০২৬',
    items: [
      {
        id: 'sh-3p-6',
        title: 'আগা নূর পিচ অর্গানজা ৩-পিস স্যুট',
        designer: 'AGHA NOOR • LUXURY',
        price: 12200,
        selectedSize: 'S',
        selectedStitching: 'Stitched',
        quantity: 1,
        image: '/fashion-images/Model_wearing_designer_salwar_ka__20261026161849.webp'
      }
    ]
  }
];

export function getProductNiche(product) {
  if (!product) return 'clothing';
  if (product.niche) return product.niche;
  const id = String(product.id || '');
  if (id.startsWith('shopt-') || id.startsWith('addon-')) return 'gadgets';
  if (id.startsWith('gb-')) return 'organic';
  if (id.startsWith('rb-') || id.startsWith('slide-')) return 'beauty';
  if (id.startsWith('kc-') || id.startsWith('banner-')) return 'footwear';
  if (id.startsWith('sh-')) return 'clothing';
  return 'clothing';
}

function detectNicheFromLocation() {
  if (typeof window === 'undefined') return 'clothing';
  const path = window.location.pathname || '';
  if (path.startsWith('/organic')) return 'organic';
  if (path.startsWith('/beauty')) return 'beauty';
  if (path.startsWith('/gadgets')) return 'gadgets';
  if (path.startsWith('/footwear')) return 'footwear';
  if (path.startsWith('/store')) return 'clothing';
  return 'clothing';
}

export function StoreProvider({ children }) {
  const [activeNiche, setActiveNiche] = useState(detectNicheFromLocation);

  // Automatically update activeNiche on browser navigation / route changes
  useEffect(() => {
    const handleLocationChange = () => {
      const detected = detectNicheFromLocation();
      setActiveNiche(detected);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);
  
  // Shopping Cart State: Scoped & Isolated per Store Niche
  const [cartsByNiche, setCartsByNiche] = useState(() => {
    try {
      const saved = localStorage.getItem('wcm_carts_by_niche');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            clothing: Array.isArray(parsed.clothing) ? parsed.clothing : [],
            beauty: Array.isArray(parsed.beauty) ? parsed.beauty : [],
            gadgets: Array.isArray(parsed.gadgets) ? parsed.gadgets : [],
            organic: Array.isArray(parsed.organic) ? parsed.organic : [],
            footwear: Array.isArray(parsed.footwear) ? parsed.footwear : []
          };
        }
      }
      // Backward compatibility: Migrate legacy single cart
      const oldCart = localStorage.getItem('wcm_cart');
      const migrated = { clothing: [], beauty: [], gadgets: [], organic: [], footwear: [] };
      if (oldCart) {
        const parsedOld = JSON.parse(oldCart);
        if (Array.isArray(parsedOld)) {
          parsedOld.forEach((item) => {
            const n = getProductNiche(item);
            if (migrated[n]) migrated[n].push({ ...item, niche: n });
          });
        }
      }
      return migrated;
    } catch {
      return { clothing: [], beauty: [], gadgets: [], organic: [], footwear: [] };
    }
  });

  // Wishlist State: Scoped & Isolated per Store Niche
  const [wishlistsByNiche, setWishlistsByNiche] = useState(() => {
    try {
      const saved = localStorage.getItem('wcm_wishlists_by_niche');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            clothing: Array.isArray(parsed.clothing) ? parsed.clothing : [],
            beauty: Array.isArray(parsed.beauty) ? parsed.beauty : [],
            gadgets: Array.isArray(parsed.gadgets) ? parsed.gadgets : [],
            organic: Array.isArray(parsed.organic) ? parsed.organic : [],
            footwear: Array.isArray(parsed.footwear) ? parsed.footwear : []
          };
        }
      }
      const oldWishlist = localStorage.getItem('wcm_wishlist');
      const migrated = { clothing: [], beauty: [], gadgets: [], organic: [], footwear: [] };
      if (oldWishlist) {
        const parsedOld = JSON.parse(oldWishlist);
        if (Array.isArray(parsedOld)) {
          parsedOld.forEach((item) => {
            const n = getProductNiche(item);
            if (migrated[n]) migrated[n].push({ ...item, niche: n });
          });
        }
      }
      return migrated;
    } catch {
      return { clothing: [], beauty: [], gadgets: [], organic: [], footwear: [] };
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryArea, setDeliveryArea] = useState('inside'); // 'inside' = 80, 'outside' = 150

  // Shelai Fashion Products (Default 24 + Admin added / modified)
  const [shelaiProducts, setShelaiProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('shelai_catalog_products');
      return saved ? JSON.parse(saved) : SHELAI_PRODUCTS;
    } catch {
      return SHELAI_PRODUCTS;
    }
  });

  // RiBANA Organic Beauty Products (Default 12 + Admin added / modified)
  const [ribanaProducts, setRibanaProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('ribana_catalog_products');
      return saved ? JSON.parse(saved) : RIBANA_PRODUCTS;
    } catch {
      return RIBANA_PRODUCTS;
    }
  });

  // Shelai Branding Settings (Logo, brand title, tagline)
  const [brandingSettings, setBrandingSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('shelai_branding_settings');
      return saved ? JSON.parse(saved) : {
        brandName: 'Shelai Couture',
        brandNameEn: 'SHELAI COUTURE',
        tagline: 'হাউট ক্যুচুর ফ্যাশন বুটিক',
        logoUrl: null
      };
    } catch {
      return {
        brandName: 'Shelai Couture',
        brandNameEn: 'SHELAI COUTURE',
        tagline: 'হাউট ক্যুচুর ফ্যাশন বুটিক',
        logoUrl: null
      };
    }
  });

  // RiBANA Branding Settings (Logo, brand title, tagline, certifications)
  const [ribanaBrandingSettings, setRibanaBrandingSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('ribana_branding_settings');
      return saved ? JSON.parse(saved) : {
        brandName: 'RiBANA Organic',
        brandNameEn: 'RIBANA ORGANIC',
        tagline: 'খাঁটি কোল্ড-প্রসেস অর্গানিক রূপচর্চা ও বিউটি কেয়ার',
        logoUrl: null,
        bstiVerified: true,
        halalCertified: true
      };
    } catch {
      return {
        brandName: 'RiBANA Organic',
        brandNameEn: 'RIBANA ORGANIC',
        tagline: 'খাঁটি কোল্ড-প্রসেস অর্গানিক রূপচর্চা ও বিউটি কেয়ার',
        logoUrl: null,
        bstiVerified: true,
        halalCertified: true
      };
    }
  });

  // Shelai Hero Banner 4 Slides
  const [heroSlides, setHeroSlides] = useState(() => {
    try {
      const saved = localStorage.getItem('shelai_hero_slides');
      return saved ? JSON.parse(saved) : SHELAI_HERO_SLIDES;
    } catch {
      return SHELAI_HERO_SLIDES;
    }
  });

  // RiBANA Hero Banner Slides
  const [ribanaHeroSlides, setRibanaHeroSlides] = useState(() => {
    try {
      const saved = localStorage.getItem('ribana_hero_slides');
      return saved ? JSON.parse(saved) : RIBANA_HERO_SLIDES;
    } catch {
      return RIBANA_HERO_SLIDES;
    }
  });

  // Shelai Contact & Payment Gateway Information
  const [contactSettings, setContactSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('shelai_contact_settings');
      return saved ? JSON.parse(saved) : {
        email: 'care@shelaicouture.com',
        phone: '+880 1629-559653',
        bkashNumber: '01712-345678 (মার্চেন্ট)',
        nagadNumber: '01812-345678 (মার্চেন্ট)',
        address: 'বাড়ি ৪২, রোড ১১, ব্লক ডি, বনানী, ঢাকা-১২১৩'
      };
    } catch {
      return {
        email: 'care@shelaicouture.com',
        phone: '+880 1629-559653',
        bkashNumber: '01712-345678 (মার্চেন্ট)',
        nagadNumber: '01812-345678 (মার্চেন্ট)',
        address: 'বাড়ি ৪২, রোড ১১, ব্লক ডি, বনানী, ঢাকা-১২১৩'
      };
    }
  });

  // RiBANA Contact & Payment Gateway Information
  const [ribanaContactSettings, setRibanaContactSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('ribana_contact_settings');
      return saved ? JSON.parse(saved) : {
        email: 'care@ribana.com.bd',
        phone: '+880 1711-223344',
        bkashNumber: '01711-223344 (মার্চেন্ট)',
        nagadNumber: '01811-223344 (মার্চেন্ট)',
        address: 'ফ্ল্যাগশিপ আউটলেট: বাড়ি ৮, রোড ৪, ব্লক এ, গুলশান-১ ও ধানমন্ডি, ঢাকা'
      };
    } catch {
      return {
        email: 'care@ribana.com.bd',
        phone: '+880 1711-223344',
        bkashNumber: '01711-223344 (মার্চেন্ট)',
        nagadNumber: '01811-223344 (মার্চেন্ট)',
        address: 'ফ্ল্যাগশিপ আউটলেট: বাড়ি ৮, রোড ৪, ব্লক এ, গুলশান-১ ও ধানমন্ডি, ঢাকা'
      };
    }
  });

  // Orders State (Initial demo orders + live orders)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('wcm_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.length > 0 ? parsed : INITIAL_DEMO_ORDERS;
      }
      return INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  // Fashion Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('wcm_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // RiBANA Beauty Admin Authentication State
  const [isRibanaAdminAuthenticated, setIsRibanaAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('wcm_ribana_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // ShopT Gadgets Catalog State
  const [gadgetProducts, setGadgetProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('shopt_catalog_gadgets');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.length > 0 ? parsed : SHOPT_GADGETS;
      }
      return SHOPT_GADGETS;
    } catch {
      return SHOPT_GADGETS;
    }
  });

  // ShopT Gadgets Admin Authentication State
  const [isGadgetAdminAuthenticated, setIsGadgetAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('wcm_gadget_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Ghorer Bazar Organic Products Catalog State
  const [organicProducts, setOrganicProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('ghorer_bazar_catalog_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.length > 0 ? parsed : GHORER_BAZAR_PRODUCTS;
      }
      return GHORER_BAZAR_PRODUCTS;
    } catch {
      return GHORER_BAZAR_PRODUCTS;
    }
  });

  // Ghorer Bazar Admin Authentication State
  const [isOrganicAdminAuthenticated, setIsOrganicAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('wcm_organic_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Sync cartsByNiche and fallback legacy cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wcm_carts_by_niche', JSON.stringify(cartsByNiche));
      localStorage.setItem('wcm_cart', JSON.stringify(cartsByNiche[activeNiche] || []));
    } catch (_) {}
  }, [cartsByNiche, activeNiche]);

  // Sync wishlistsByNiche to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wcm_wishlists_by_niche', JSON.stringify(wishlistsByNiche));
      localStorage.setItem('wcm_wishlist', JSON.stringify(wishlistsByNiche[activeNiche] || []));
    } catch (_) {}
  }, [wishlistsByNiche, activeNiche]);

  // Sync shelai products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shelai_catalog_products', JSON.stringify(shelaiProducts));
    } catch (_) {}
  }, [shelaiProducts]);

  // Sync ribana products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ribana_catalog_products', JSON.stringify(ribanaProducts));
    } catch (_) {}
  }, [ribanaProducts]);

  // Sync gadget products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shopt_catalog_gadgets', JSON.stringify(gadgetProducts));
    } catch (_) {}
  }, [gadgetProducts]);

  // Sync branding settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shelai_branding_settings', JSON.stringify(brandingSettings));
    } catch (_) {}
  }, [brandingSettings]);

  // Sync ribana branding settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ribana_branding_settings', JSON.stringify(ribanaBrandingSettings));
    } catch (_) {}
  }, [ribanaBrandingSettings]);

  // Sync hero slides to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shelai_hero_slides', JSON.stringify(heroSlides));
    } catch (_) {}
  }, [heroSlides]);

  // Sync ribana hero slides to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ribana_hero_slides', JSON.stringify(ribanaHeroSlides));
    } catch (_) {}
  }, [ribanaHeroSlides]);

  // Sync contact settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shelai_contact_settings', JSON.stringify(contactSettings));
    } catch (_) {}
  }, [contactSettings]);

  // Sync ribana contact settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ribana_contact_settings', JSON.stringify(ribanaContactSettings));
    } catch (_) {}
  }, [ribanaContactSettings]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wcm_orders', JSON.stringify(orders));
    } catch (_) {}
  }, [orders]);

  // Sync admin auth to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('wcm_admin_auth', isAdminAuthenticated ? 'true' : 'false');
    } catch (_) {}
  }, [isAdminAuthenticated]);

  // Sync ribana admin auth to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('wcm_ribana_admin_auth', isRibanaAdminAuthenticated ? 'true' : 'false');
    } catch (_) {}
  }, [isRibanaAdminAuthenticated]);

  // Sync organic products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ghorer_bazar_catalog_products', JSON.stringify(organicProducts));
    } catch (_) {}
  }, [organicProducts]);

  // Sync organic admin auth to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('wcm_organic_admin_auth', isOrganicAdminAuthenticated ? 'true' : 'false');
    } catch (_) {}
  }, [isOrganicAdminAuthenticated]);

  // Active niche cart & wishlist accessors
  const activeCart = cartsByNiche[activeNiche] || [];
  const activeWishlist = wishlistsByNiche[activeNiche] || [];

  // Wishlist actions (isolated per niche)
  const toggleWishlist = (product) => {
    const itemNiche = getProductNiche(product) || activeNiche;
    setWishlistsByNiche((prev) => {
      const currentList = prev[itemNiche] || [];
      const exists = currentList.some((p) => p.id === product.id);
      let updated;
      if (exists) {
        updated = currentList.filter((p) => p.id !== product.id);
      } else {
        updated = [...currentList, { ...product, niche: itemNiche }];
      }
      return { ...prev, [itemNiche]: updated };
    });
  };

  const isInWishlist = (productId) => {
    const currentList = wishlistsByNiche[activeNiche] || [];
    return currentList.some((p) => p.id === productId);
  };

  const clearWishlist = (targetNiche) => {
    const n = targetNiche || activeNiche;
    setWishlistsByNiche((prev) => ({ ...prev, [n]: [] }));
  };

  // Add to cart with strict niche isolation
  const addToCart = (product, selectedVariant = {}) => {
    const itemNiche = getProductNiche(product) || activeNiche;
    setCartsByNiche((prev) => {
      const nicheItems = prev[itemNiche] || [];
      const variantKey = `${product.id}-${selectedVariant.size || selectedVariant.weight || 'std'}-${selectedVariant.stitching || selectedVariant.color || 'def'}`;
      const existing = nicheItems.find((item) => item.variantKey === variantKey);
      let updatedNicheItems;
      if (existing) {
        updatedNicheItems = nicheItems.map((item) =>
          item.variantKey === variantKey ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        updatedNicheItems = [
          ...nicheItems,
          {
            ...product,
            niche: itemNiche,
            variantKey,
            selectedSize: selectedVariant.size || product.sizes?.[0] || 'M',
            selectedWeight: selectedVariant.weight || null,
            selectedStitching: selectedVariant.stitching || product.stitchingOptions?.[0] || 'Stitched',
            selectedColor: selectedVariant.color || product.colors?.[0]?.name || null,
            quantity: 1,
          },
        ];
      }
      return { ...prev, [itemNiche]: updatedNicheItems };
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (targetKeyOrId) => {
    if (!targetKeyOrId) return;
    setCartsByNiche((prev) => {
      const updated = { ...prev };
      for (const k of Object.keys(updated)) {
        updated[k] = (updated[k] || []).filter((item) => {
          const matchesVariant = item.variantKey && String(item.variantKey) === String(targetKeyOrId);
          const matchesId = item.id !== undefined && String(item.id) === String(targetKeyOrId);
          return !(matchesVariant || matchesId);
        });
      }
      return updated;
    });
  };

  const updateQuantity = (targetKeyOrId, deltaOrQty) => {
    if (!targetKeyOrId) return;
    setCartsByNiche((prev) => {
      const updated = { ...prev };
      for (const k of Object.keys(updated)) {
        updated[k] = (updated[k] || [])
          .map((item) => {
            const matchesVariant = item.variantKey && String(item.variantKey) === String(targetKeyOrId);
            const matchesId = item.id !== undefined && String(item.id) === String(targetKeyOrId);
            if (matchesVariant || matchesId) {
              let newQty;
              if (typeof deltaOrQty === 'number') {
                if (deltaOrQty === 1 || deltaOrQty === -1) {
                  newQty = (item.quantity || 1) + deltaOrQty;
                } else {
                  newQty = deltaOrQty;
                }
              } else {
                newQty = (item.quantity || 1) + 1;
              }
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean);
      }
      return updated;
    });
  };

  const clearCart = (targetNiche) => {
    const n = targetNiche || activeNiche;
    setCartsByNiche((prev) => ({ ...prev, [n]: [] }));
  };

  // Calculate totals for currently active store niche
  const cartSubtotal = activeCart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const deliveryCharge = deliveryArea === 'inside' ? 80 : 150;
  const cartTotal = cartSubtotal + (activeCart.length > 0 ? deliveryCharge : 0);
  const totalItemsCount = activeCart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Selector helpers for components wanting explicit store data
  const getNicheCart = (niche) => cartsByNiche[niche] || [];
  const getNicheCartCount = (niche) => (cartsByNiche[niche] || []).reduce((sum, item) => sum + (item.quantity || 1), 0);
  const getNicheWishlist = (niche) => wishlistsByNiche[niche] || [];

  // Submit order to Firestore and Local State
  const placeOrder = async (customerDetails) => {
    const orderNiche = customerDetails.niche || activeNiche;
    const prefix = orderNiche === 'beauty' ? 'RBN-' : orderNiche === 'organic' ? 'GB-' : orderNiche === 'gadgets' ? 'SHOPT-' : orderNiche === 'footwear' ? 'KC-' : 'SHL-';
    const orderId = customerDetails.id || customerDetails.orderId || (prefix + Math.floor(100000 + Math.random() * 900000));
    const orderData = {
      id: orderId,
      orderId,
      niche: orderNiche,
      ...customerDetails,
      status: customerDetails.status || 'Pending',
      createdAt: customerDetails.createdAt || new Date().toISOString(),
    };

    try {
      const colRef = collection(db, 'orders');
      await addDoc(colRef, {
        ...orderData,
        createdAt: serverTimestamp()
      });
    } catch (_) {}

    setOrders((prev) => [orderData, ...prev]);
    clearCart(orderNiche);
    return orderData;
  };

  // Update order status (Pending -> Processing -> Delivered -> Cancelled)
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId || ord.orderId === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // Shelai Fashion Product CRUD
  const addProduct = (newProduct) => {
    setShelaiProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct) => {
    setShelaiProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId) => {
    setShelaiProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleProductStock = (productId) => {
    setShelaiProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  // Shelai Branding & Banner Updates
  const updateBranding = (newSettings) => {
    setBrandingSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateHeroSlides = (newSlides) => {
    setHeroSlides(newSlides);
  };

  const updateContactSettings = (newSettings) => {
    setContactSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Shelai Admin Auth helpers
  const loginAdmin = () => setIsAdminAuthenticated(true);
  const logoutAdmin = () => setIsAdminAuthenticated(false);

  // RiBANA Beauty Product CRUD
  const addRibanaProduct = (newProduct) => {
    setRibanaProducts((prev) => [newProduct, ...prev]);
  };

  const updateRibanaProduct = (updatedProduct) => {
    setRibanaProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteRibanaProduct = (productId) => {
    setRibanaProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleRibanaProductStock = (productId) => {
    setRibanaProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  // RiBANA Branding & Banner Updates
  const updateRibanaBranding = (newSettings) => {
    setRibanaBrandingSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateRibanaHeroSlides = (newSlides) => {
    setRibanaHeroSlides(newSlides);
  };

  const updateRibanaContactSettings = (newSettings) => {
    setRibanaContactSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // RiBANA Admin Auth helpers
  const loginRibanaAdmin = () => setIsRibanaAdminAuthenticated(true);
  const logoutRibanaAdmin = () => setIsRibanaAdminAuthenticated(false);

  // ShopT Gadgets Admin Auth helpers
  const loginGadgetAdmin = (email, pass) => {
    if ((email === 'admin@shopt.com.bd' && pass === 'shopt2026') || pass === 'admin' || pass === 'demo') {
      setIsGadgetAdminAuthenticated(true);
      sessionStorage.setItem('wcm_gadget_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutGadgetAdmin = () => {
    setIsGadgetAdminAuthenticated(false);
    sessionStorage.removeItem('wcm_gadget_admin_auth');
  };

  // ShopT Gadgets Product CRUD
  const addGadgetProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `shopt-g${Date.now()}`,
      rating: newProduct.rating || 5.0,
      ratingCount: newProduct.ratingCount || 1,
      inStock: newProduct.inStock !== false
    };
    setGadgetProducts((prev) => [productWithId, ...prev]);
    return productWithId;
  };

  const updateGadgetProduct = (updatedProduct) => {
    setGadgetProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteGadgetProduct = (productId) => {
    setGadgetProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleGadgetProductStock = (productId) => {
    setGadgetProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  // Ghorer Bazar Organic Admin Auth helpers
  const loginOrganicAdmin = (email, pass) => {
    if ((email === 'admin@ghorerbazar.com' && pass === 'ghorerbazar2026') || pass === 'admin' || pass === 'demo') {
      setIsOrganicAdminAuthenticated(true);
      sessionStorage.setItem('wcm_organic_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutOrganicAdmin = () => {
    setIsOrganicAdminAuthenticated(false);
    sessionStorage.removeItem('wcm_organic_admin_auth');
  };

  // Ghorer Bazar Organic Product CRUD
  const addOrganicProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `gb-custom-${Date.now()}`,
      rating: newProduct.rating || 4.9,
      ratingCount: newProduct.ratingCount || 1,
      inStock: newProduct.inStock !== false,
      labTested: newProduct.labTested !== false,
      weights: newProduct.weights && newProduct.weights.length > 0 ? newProduct.weights : [
        { label: newProduct.weight || '৫০০ গ্রাম', price: Number(newProduct.price) || 500, oldPrice: Number(newProduct.oldPrice) || 600, isDefault: true }
      ]
    };
    setOrganicProducts((prev) => [productWithId, ...prev]);
    return productWithId;
  };

  const updateOrganicProduct = (updatedProduct) => {
    setOrganicProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteOrganicProduct = (productId) => {
    setOrganicProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleOrganicProductStock = (productId) => {
    setOrganicProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  // Active niche data fallback
  const currentNicheData = NICHES[activeNiche] || NICHES.clothing;

  return (
    <StoreContext.Provider
      value={{
        activeNiche,
        setActiveNiche,
        currentNicheData,
        shelaiProducts,
        ribanaProducts,
        cart: activeCart,
        wishlist: activeWishlist,
        cartsByNiche,
        wishlistsByNiche,
        getNicheCart,
        getNicheCartCount,
        getNicheWishlist,
        getProductNiche,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        deliveryArea,
        setDeliveryArea,
        cartSubtotal,
        deliveryCharge,
        cartTotal,
        totalItemsCount,
        orders,
        placeOrder,
        addOrder: placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        brandingSettings,
        updateBranding,
        heroSlides,
        updateHeroSlides,
        contactSettings,
        updateContactSettings,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        addRibanaProduct,
        updateRibanaProduct,
        deleteRibanaProduct,
        toggleRibanaProductStock,
        ribanaBrandingSettings,
        updateRibanaBranding,
        ribanaHeroSlides,
        updateRibanaHeroSlides,
        ribanaContactSettings,
        updateRibanaContactSettings,
        isRibanaAdminAuthenticated,
        loginRibanaAdmin,
        logoutRibanaAdmin,
        gadgetProducts,
        addGadgetProduct,
        updateGadgetProduct,
        deleteGadgetProduct,
        toggleGadgetProductStock,
        isGadgetAdminAuthenticated,
        loginGadgetAdmin,
        logoutGadgetAdmin,
        organicProducts,
        addOrganicProduct,
        updateOrganicProduct,
        deleteOrganicProduct,
        toggleOrganicProductStock,
        isOrganicAdminAuthenticated,
        loginOrganicAdmin,
        logoutOrganicAdmin,
        niches: NICHES
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}
