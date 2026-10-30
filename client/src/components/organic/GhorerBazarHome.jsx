import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Flame, ShieldCheck, Award, Truck, CheckCircle2, 
  ArrowRight, Heart, PhoneCall, ChevronRight, ChevronLeft, Star, Clock, 
  ShoppingBag, Check, Zap, HelpCircle, RefreshCw, Layers
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { 
  GHORER_BAZAR_BRAND, 
  GHORER_BAZAR_CATEGORIES, 
  GHORER_BAZAR_TRUST_PILLARS, 
  GHORER_BAZAR_PRODUCTS 
} from '../../data/ghorerBazarData';
import GhorerBazarHeader from './GhorerBazarHeader';
import GhorerBazarProductCard from './GhorerBazarProductCard';
import GhorerBazarQuickOrderModal from './GhorerBazarQuickOrderModal';
import GhorerBazarCartDrawer from './GhorerBazarCartDrawer';

// Flash sale countdown timer component (Structured matching keynote design)
function FlashCountdown({ timeLeft }) {
  const time = timeLeft || { hours: 11, minutes: 42, seconds: 14 };

  return (
    <div className="flex items-center gap-1.5 text-stone-900">
      <div className="bg-white border border-emerald-200/90 px-2.5 py-1 rounded-xl text-center min-w-[38px] shadow-xs">
        <span className="text-sm font-black text-[#055C32] font-mono">
          {String(time.hours).padStart(2, '0')}
        </span>
        <span className="block text-[8px] text-stone-500 -mt-0.5 uppercase font-bold">ঘণ্টা</span>
      </div>
      <span className="font-bold text-emerald-600">:</span>
      <div className="bg-white border border-emerald-200/90 px-2.5 py-1 rounded-xl text-center min-w-[38px] shadow-xs">
        <span className="text-sm font-black text-[#055C32] font-mono">
          {String(time.minutes).padStart(2, '0')}
        </span>
        <span className="block text-[8px] text-stone-500 -mt-0.5 uppercase font-bold">মিনিট</span>
      </div>
      <span className="font-bold text-emerald-600">:</span>
      <div className="bg-white border border-emerald-200/90 px-2.5 py-1 rounded-xl text-center min-w-[38px] shadow-xs">
        <span className="text-sm font-black text-[#055C32] font-mono">
          {String(time.seconds).padStart(2, '0')}
        </span>
        <span className="block text-[8px] text-stone-500 -mt-0.5 uppercase font-bold">সেকেন্ড</span>
      </div>
    </div>
  );
}

// 3 Keynote Flagship Presets
const ORGANIC_FLAGSHIPS = [
  {
    id: 'gb-honey-sundarban',
    tabLabel: '🍯 সুন্দরবন চাকের মধু',
    pill: '১০০% খাঁটি ও প্রাকৃতিক খাবারের বিশ্বস্ত ঠিকানা',
    titlePrefix: 'প্রকৃতির খাঁটি উপহার, আপনার পরিবারের',
    titleAccent: 'সুস্থতার অঙ্গীকার',
    subtitle: 'সুন্দরবনের প্রাকৃতিক চাকের খাঁটি মধু, গ্রাম্য ঘানির সরিষার তেল, ঐতিহ্যবাহী গাওয়া ঘি ও বাছাইকৃত প্রিমিয়াম খেজুর—কোনো প্রকার প্রিজারভেটিভ বা ক্ষতিকর কেমিক্যাল ছাড়া সরাসরি আপনার ঘরে।',
    chips: [
      { icon: '🍯', label: '১০০% কাঁচা প্রাকৃতিক মধু' },
      { icon: '🧈', label: 'পাবনার দানাদার গাওয়া ঘি' },
      { icon: '🔬', label: 'বিএসটিআই ল্যাব টেস্টেড' }
    ],
    price: 890,
    oldPrice: 990,
    discount: '১২% ছাড়',
    image: '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.jpg',
    pin1: '🧭 সরাসরি সুন্দরবনের চাক থেকে',
    pin2: '🌿 ১০০% কাঁচা অপরিশোধিত মধু',
    productId: 'gb-honey-sundarban'
  },
  {
    id: 'gb-ghee-pabna',
    tabLabel: '🧈 পাবনার খাঁটি ঘি',
    pill: 'পাবনার ঐতিহ্যবাহী সুস্বাদু গাওয়া ঘি',
    titlePrefix: 'গ্রাম্য চরাঞ্চলের খাঁটি গরুর দুধের',
    titleAccent: 'সুবাসিত দানাদার গাওয়া ঘি',
    subtitle: 'পাবনা ও সিরাজগঞ্জের চরাঞ্চলের খাঁটি ননী থেকে প্রস্তুতকৃত অতুলনীয় সুবাস ও স্বাদ। গরম ভাত, পোলাও ও খিচুড়ির আসল পুষ্টিকর তৃপ্তি ও প্রাকৃতিক স্বাস্থ্য সুরক্ষা।',
    chips: [
      { icon: '🧈', label: '১০০% গরুর দুধের খাঁটি ননী' },
      { icon: '✨', label: 'অরিজিনাল দানাদার টেক্সচার' },
      { icon: '🛡️', label: '১০০% মানিব্যাক গ্যারান্টি' }
    ],
    price: 950,
    oldPrice: 1050,
    discount: '১০% ছাড়',
    image: '/organic-images/Spoon_scooping_ghee_from_jar_b3e93d06.jpg',
    pin1: '🌾 পাবনার খামারের খাঁটি ননী',
    pin2: '🏆 ল্যাব টেস্টে ১০০% নির্ভেজাল',
    productId: 'gb-ghee-pabna'
  },
  {
    id: 'gb-honey-nuts',
    tabLabel: '⚡ হানি নাটস পাওয়ার বুস্টার',
    pill: 'রাজকীয় পুষ্টি ও এনার্জির সেরা কম্বো',
    titlePrefix: 'প্রাকৃতিক চাকের মধু ও প্রিমিয়াম বাদামের',
    titleAccent: 'হানি নাটস পাওয়ার বুস্টার',
    subtitle: 'খাঁটি চাকের মধুতে ভেজানো কাজুবাদাম, কাঠবাদাম, পেস্তা, আখরোট ও রোস্টেড পাম্পকিন সিডস। দ্রুত শারীরিক শক্তি ও স্ট্যামিনা বৃদ্ধির সেরা পুষ্টিকর সুপারফুড।',
    chips: [
      { icon: '🥜', label: '৫টি প্রিমিয়াম ড্রাই ফ্রুটস' },
      { icon: '🍯', label: 'সুন্দরবনের খাঁটি মধু মিশ্রিত' },
      { icon: '⚡', label: 'তাৎক্ষণিক এনার্জি বুস্টার' }
    ],
    price: 1490,
    oldPrice: 1690,
    discount: '১৫% ছাড়',
    image: '/organic-images/Honey_jar_on_wooden_board_d5a41667.jpg',
    pin1: '⚡ প্রিমিয়াম এনার্জি বুস্টার',
    pin2: '💎 ৮০০ গ্রাম মেগা ফ্যামিলি প্যাক',
    productId: 'gb-honey-nuts'
  }
];

export default function GhorerBazarHome({ onBackToGateway }) {
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const [quickOrderProduct, setQuickOrderProduct] = useState(null);
  const [quickOrderWeight, setQuickOrderWeight] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedFlagshipIndex, setSelectedFlagshipIndex] = useState(0);

  // Synchronized Flash Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 42, seconds: 14 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setVisibleCount(8);
  }, [activeCategory, searchQuery]);

  const currentFlagship = ORGANIC_FLAGSHIPS[selectedFlagshipIndex];
  const flagshipProduct = GHORER_BAZAR_PRODUCTS.find(p => p.id === currentFlagship.productId) || GHORER_BAZAR_PRODUCTS[0];

  // 2 Hot Spotlight Deals for Right Card (Mini Flash Sales)
  const flashSaleItems = useMemo(() => [
    GHORER_BAZAR_PRODUCTS.find(p => p.id === 'gb-ghee-pabna') || GHORER_BAZAR_PRODUCTS[5],
    GHORER_BAZAR_PRODUCTS.find(p => p.id === 'gb-honey-nuts') || GHORER_BAZAR_PRODUCTS[1]
  ], []);

  const handleOpenQuickOrder = (product, weight) => {
    setQuickOrderProduct(product);
    setQuickOrderWeight(weight || product?.weights?.[0]);
  };

  const handleAddToCart = (product, weight) => {
    const itemToAdd = {
      ...product,
      price: weight?.price ?? product.price,
      oldPrice: weight?.oldPrice ?? product.oldPrice,
      weight: weight?.label || product.weights?.[0]?.label || 'প্যাক',
      selectedWeight: weight?.label || product.weights?.[0]?.label || 'প্যাক'
    };
    if (addToCart) {
      addToCart(itemToAdd, { size: itemToAdd.weight });
    }
    setIsCartOpen(true);
  };

  const handleBack = onBackToGateway || (() => navigate('/'));

  // Filtered products for active category
  const filteredProducts = GHORER_BAZAR_PRODUCTS.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.titleEn && item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Featured sections
  const hotDeals = GHORER_BAZAR_PRODUCTS.filter((p) => p.badgeType === 'hot' || p.badgeType === 'deal').slice(0, 4);
  const honeyCollection = GHORER_BAZAR_PRODUCTS.filter((p) => p.category === 'honey').slice(0, 4);
  const gheeOilCollection = GHORER_BAZAR_PRODUCTS.filter((p) => p.category === 'ghee-oil').slice(0, 4);
  const datesNutsCollection = GHORER_BAZAR_PRODUCTS.filter((p) => p.category === 'dates' || p.category === 'nuts-seeds').slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAFDF9] text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* 1. Header with live search, hotline, categories & cart */}
      <GhorerBazarHeader
        activeCategory={activeCategory}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          if (catId !== 'all') {
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onBackToGateway={handleBack}
      />

      {/* 2. Redesigned Flagship Keynote Banner (Exact High-Converting Structure matching ShopT Pro Gadget Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8 pb-4 sm:pb-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Main Stage (8 Cols): Flagship Organic Showcase */}
          <div className="lg:col-span-8 bg-gradient-to-br from-white via-emerald-50/30 to-[#FAFDF9] rounded-3xl p-4 sm:p-6 lg:p-8 border border-emerald-200/90 shadow-[0_15px_45px_rgba(5,92,50,0.06)] relative overflow-hidden flex flex-col justify-between group">
            
            {/* Organic ambient background texture and soft glows */}
            <div className="absolute inset-0 bg-[radial-gradient(#055c32_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/15 transition-colors" />
            <div className="absolute bottom-0 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
              
              {/* Left Column: Specs, Headline, Pricing & CTA (7 Cols) */}
              <div className="md:col-span-7 space-y-3">
                
                {/* Top Keynote Pill */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-100/70 border border-emerald-300 text-[#055C32] px-2.5 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-black shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#055C32] shrink-0" />
                  <span className="truncate">{currentFlagship.pill}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse ml-1 shrink-0" />
                </div>

                {/* Headline with Brand Accent Highlights */}
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-stone-900 leading-snug sm:leading-tight tracking-tight">
                  {currentFlagship.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#055C32] via-emerald-600 to-amber-600">{currentFlagship.titleAccent}</span>
                </h1>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md line-clamp-3 sm:line-clamp-none">
                  {currentFlagship.subtitle}
                </p>

                {/* Interactive Flagship Preset Switcher Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {ORGANIC_FLAGSHIPS.map((flagship, idx) => (
                    <button
                      key={flagship.id}
                      type="button"
                      onClick={() => setSelectedFlagshipIndex(idx)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                        selectedFlagshipIndex === idx
                          ? 'bg-[#055C32] text-white shadow-xs'
                          : 'bg-white hover:bg-emerald-50 text-stone-700 border border-emerald-200/70'
                      }`}
                    >
                      {flagship.tabLabel}
                    </button>
                  ))}
                </div>

                {/* Precision Quality Matrix Chips */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
                  {currentFlagship.chips.map((chip, cIdx) => (
                    <span 
                      key={cIdx}
                      className="px-2 sm:px-2.5 py-1 rounded-lg bg-emerald-50/80 border border-emerald-200/80 text-[10px] sm:text-[11px] font-bold text-[#055C32] flex items-center gap-1 sm:gap-1.5 shadow-xs"
                    >
                      <span>{chip.icon}</span>
                      <span>{chip.label}</span>
                    </span>
                  ))}
                </div>

                {/* Price & Action Hub */}
                <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex items-baseline gap-2 bg-white px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl border border-emerald-200 shadow-xs">
                    <span className="text-lg sm:text-2xl font-black text-[#055C32] font-mono">
                      ৳{currentFlagship.price.toLocaleString('bn-BD')}
                    </span>
                    <span className="text-xs text-stone-400 line-through font-bold font-mono">
                      ৳{currentFlagship.oldPrice.toLocaleString('bn-BD')}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-black text-amber-800 bg-amber-100 px-1.5 sm:px-2 py-0.5 rounded-full border border-amber-300">
                      {currentFlagship.discount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleOpenQuickOrder(flagshipProduct, flagshipProduct.weights?.[0])}
                      className="flex-1 sm:flex-none bg-[#055C32] hover:bg-[#077842] text-white font-black px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-[0_10px_25px_rgba(5,92,50,0.25)] hover:shadow-[0_15px_30px_rgba(5,92,50,0.35)] transition-all cursor-pointer active:scale-95 uppercase tracking-wider"
                    >
                      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
                      <span>সরাসরি অর্ডার করুন</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                    </button>

                    <Link
                      to={`/organic/product/${flagshipProduct.id}`}
                      className="px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-2xl bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 border border-stone-200 text-xs font-bold transition-all shadow-xs text-center shrink-0"
                    >
                      বিস্তারিত
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Showcase Floating Pedestal (5 Cols) */}
              <div className="md:col-span-5 h-52 sm:h-64 md:h-72 flex items-center justify-center relative mt-3 md:mt-0">
                {/* Radial spotlight behind product */}
                <div className="absolute inset-0 bg-radial from-amber-400/25 via-emerald-400/10 to-transparent blur-2xl pointer-events-none" />
                
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden border-2 border-emerald-100/90 shadow-2xl bg-stone-50">
                  <img
                    src={currentFlagship.image}
                    alt={currentFlagship.titleAccent}
                    className="w-full h-full object-cover group-hover:scale-108 group-hover:-rotate-1 transition-transform duration-700 ease-out relative z-10"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.jpg';
                    }}
                  />
                </div>

                {/* Floating Pin 1 (Top Right) */}
                <div className="absolute top-1 sm:top-2 right-1 sm:right-2 z-20 bg-white/95 backdrop-blur-md border border-emerald-300 text-[9px] sm:text-[10px] font-bold text-[#055C32] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md flex items-center gap-1.5 animate-bounce max-w-[190px] sm:max-w-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="truncate">{currentFlagship.pin1}</span>
                </div>

                {/* Floating Pin 2 (Bottom Left) */}
                <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 z-20 bg-white/95 backdrop-blur-md border border-amber-300 text-[9px] sm:text-[10px] font-bold text-amber-900 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full shadow-md flex items-center gap-1 max-w-[190px] sm:max-w-none">
                  <span className="text-amber-500 font-bold shrink-0">★</span>
                  <span className="truncate">{currentFlagship.pin2}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: High-End Live Deal & Trust Cards (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 justify-between">
            
            {/* Card 1: Flash Deals Vault */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-100/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-200">
                    <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-stone-900">ফ্ল্যাশ ডিলস ভল্ট</h3>
                    <p className="text-[10px] text-stone-500">সীমিত সময়ের স্টক অফার</p>
                  </div>
                </div>

                <span className="text-[10px] font-black uppercase text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  ২৮% ছাড়
                </span>
              </div>

              {/* Countdown ticker */}
              <div className="bg-emerald-50/40 p-3 rounded-2xl border border-emerald-100/80 mb-3 flex items-center justify-between">
                <span className="text-[11px] font-bold text-stone-600">অফার শেষ হতে:</span>
                <FlashCountdown timeLeft={timeLeft} />
              </div>

              {/* Mini Spotlight Products */}
              <div className="space-y-2">
                {flashSaleItems.map((item) => {
                  if (!item) return null;
                  const defaultWeight = item.weights?.find(w => w.isDefault) || item.weights?.[0];
                  const itemPrice = item.price ?? defaultWeight?.price ?? 0;
                  const itemOldPrice = item.oldPrice ?? defaultWeight?.oldPrice ?? itemPrice;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2 rounded-xl bg-stone-50/80 hover:bg-emerald-50/60 border border-stone-200/70 hover:border-emerald-200 transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-lg bg-white p-0.5 border border-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 truncate">{item.title}</h4>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-xs font-black text-[#055C32]">৳{itemPrice.toLocaleString('bn-BD')}</span>
                          {itemOldPrice > itemPrice && (
                            <span className="text-[10px] text-stone-400 line-through">৳{itemOldPrice.toLocaleString('bn-BD')}</span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item, defaultWeight)}
                        className="p-2 rounded-xl bg-emerald-100 hover:bg-[#055C32] text-[#055C32] hover:text-white border border-emerald-200 transition-all cursor-pointer shadow-xs active:scale-95"
                        title="কার্টে যোগ করুন"
                      >
                        <Zap className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 2: 100% Purity & COD Trust Card */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-100/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-[#055C32] flex items-center justify-center border border-emerald-200">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-stone-900">১০০% গ্যারান্টিড প্রিমিয়াম খাদ্য</h3>
                  <p className="text-[10px] text-stone-500">কোনো নকল বা ভেজাল নেই, সম্পূর্ণ খাঁটি</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-stone-700">
                <div className="flex items-center gap-2 bg-stone-50/80 p-2.5 rounded-xl border border-stone-200/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-medium">১০০% মানিব্যাক গ্যারান্টি — পছন্দ না হলে সাথে সাথে ফেরত</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-50/80 p-2.5 rounded-xl border border-stone-200/70">
                  <CheckCircle2 className="w-4 h-4 text-[#055C32] shrink-0" />
                  <span className="text-[11px] font-medium">পণ্য হাতে চেক করে টাকা দেওয়ার সুবিধা (COD)</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Minimalist Trust Pillar Badges (Exact 4-Column Strip matching ShopT Pro Gadget Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-3 w-full relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-white border border-emerald-100/90 hover:border-emerald-300 p-3.5 rounded-2xl flex items-center gap-3 transition-colors shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#055C32] flex items-center justify-center shrink-0 border border-emerald-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-stone-900">১০০% নির্ভেজাল খাদ্য</h4>
              <p className="text-[10px] text-stone-500 truncate">সরাসরি মৌয়াল ও কৃষক থেকে সংগৃহীত</p>
            </div>
          </div>

          <div className="bg-white border border-emerald-100/90 hover:border-emerald-300 p-3.5 rounded-2xl flex items-center gap-3 transition-colors shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
              <Award className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-stone-900">ল্যাব টেস্ট সার্টিফাইড</h4>
              <p className="text-[10px] text-stone-500 truncate">বিএসটিআই ও নিজস্ব ল্যাবে পরীক্ষিত</p>
            </div>
          </div>

          <div className="bg-white border border-emerald-100/90 hover:border-emerald-300 p-3.5 rounded-2xl flex items-center gap-3 transition-colors shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#055C32] flex items-center justify-center shrink-0 border border-emerald-100">
              <Truck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-stone-900">২৪-৪৮ ঘণ্টায় ফাস্ট ডেলিভারি</h4>
              <p className="text-[10px] text-stone-500 truncate">সারা দেশে নিরাপদ সুরক্ষা প্যাকেজিং</p>
            </div>
          </div>

          <div className="bg-white border border-emerald-100/90 hover:border-emerald-300 p-3.5 rounded-2xl flex items-center gap-3 transition-colors shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#055C32] flex items-center justify-center shrink-0 border border-emerald-100">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-stone-900">ক্যাশ অন ডেলিভারি ও চেক</h4>
              <p className="text-[10px] text-stone-500 truncate">পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Hot Deals & Flash Sale Section with Countdown */}
      {hotDeals.length > 0 && (
        <section className="py-8 sm:py-12 bg-gradient-to-b from-emerald-50/30 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            {/* Flash Sale Banner Header */}
            <div className="bg-[#055C32] rounded-3xl p-4 sm:p-6 text-white mb-6 sm:mb-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500 text-stone-950">
                  <Flame className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white uppercase tracking-wider">
                      সীমিত সময়ের অফার
                    </span>
                    <span className="text-amber-300 text-xs font-semibold">আজকের সেরা মূল্যছাড়</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black mt-0.5">হট ডিল ও ফ্ল্যাশ সেল</h3>
                </div>
              </div>

              {/* Countdown Pills */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                <span className="text-xs text-emerald-100 font-medium">অফার শেষ হতে বাকি:</span>
                <div className="flex items-center gap-1 font-mono font-bold text-sm">
                  <span className="px-2 py-1 rounded-lg bg-emerald-900/80 text-amber-300 border border-emerald-700">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span>:</span>
                  <span className="px-2 py-1 rounded-lg bg-emerald-900/80 text-amber-300 border border-emerald-700">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span>:</span>
                  <span className="px-2 py-1 rounded-lg bg-emerald-900/80 text-amber-300 border border-emerald-700">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* Flash Sale Product Grid: 2 columns on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {hotDeals.map((product) => (
                <GhorerBazarProductCard
                  key={product.id}
                  product={product}
                  onQuickOrder={handleOpenQuickOrder}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 5. Main Catalog / Category Browsing Section */}
      <section id="products-section" className="py-8 sm:py-12 bg-white border-t border-emerald-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#055C32] uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>আমাদের সমৃদ্ধ ক্যাটালগ</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-stone-900">
                {activeCategory === 'all' 
                  ? 'সকল খাঁটি অর্গানিক খাদ্য সম্ভার' 
                  : GHORER_BAZAR_CATEGORIES.find((c) => c.id === activeCategory)?.nameBn || 'পণ্য তালিকা'}
              </h2>
            </div>

            <Link
              to="/organic/shop"
              className="text-xs sm:text-sm font-bold text-[#055C32] hover:text-[#077842] flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
            >
              <span>সকল পণ্য ফিল্টার করুন ({GHORER_BAZAR_PRODUCTS.length} টি)</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {GHORER_BAZAR_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-[#055C32] text-white border-[#055C32] shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                >
                  <span>{cat.nameBn}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-emerald-700 text-amber-200' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {cat.id === 'all' ? GHORER_BAZAR_PRODUCTS.length : cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Product Grid: 2 columns on mobile, 4 on desktop */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-stone-50 rounded-3xl border border-stone-200">
              <ShoppingBag className="w-12 h-12 text-stone-400 mx-auto mb-2" />
              <h4 className="font-bold text-base text-stone-800">কোনো পণ্য পাওয়া যায়নি</h4>
              <p className="text-xs text-stone-500 mt-1">অন্য কোনো ক্যাটাগরি অথবা সার্চ শব্দ দিয়ে চেষ্টা করুন।</p>
              <button
                type="button"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="mt-3 px-4 py-2 rounded-xl bg-[#055C32] text-white text-xs font-bold"
              >
                সব পণ্য দেখুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <GhorerBazarProductCard
                  key={product.id}
                  product={product}
                  onQuickOrder={handleOpenQuickOrder}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

          {/* Load More & Go To Dedicated Shop Page CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {visibleCount < filteredProducts.length && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 4, filteredProducts.length))}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-[#055C32] border-2 border-emerald-300 hover:border-[#055C32] font-black text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>আরও ৪টি প্রোডাক্ট লোড করুন ({visibleCount}/{filteredProducts.length})</span>
              </button>
            )}

            <Link
              to="/organic/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#055C32] hover:bg-[#034424] text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer w-full sm:w-auto group"
            >
              <span>সকল ২৮টি পণ্য শপ পেজে দেখুন</span>
              <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. Curated Category Showcase: Pure Honey Collection */}
      <section className="py-8 sm:py-12 bg-[#FAFDF9] border-t border-emerald-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                মৌমাছির খাঁটি চাকের মধু
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                প্রাকৃতিক মধু ও হানি স্পেশাল
              </h3>
            </div>
            <Link
              to="/organic/shop?cat=honey"
              className="text-xs sm:text-sm font-bold text-[#055C32] hover:underline flex items-center gap-1"
            >
              <span>সবগুলো দেখুন</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {honeyCollection.map((product) => (
              <GhorerBazarProductCard
                key={product.id}
                product={product}
                onQuickOrder={handleOpenQuickOrder}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 7. Why Choose Ghorer Bazar? Story & Lab Quality Showcase */}
      <section className="py-10 sm:py-16 bg-white border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Story Visual */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-emerald-50 aspect-4/3 sm:aspect-square">
                <img
                  src="/organic-images/Organic_feast_on_wooden_table_0f0af9b2.jpg"
                  alt="ঘরের বাজারের খাঁটি অর্গানিক ফুড ফিস্ট"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-emerald-100 max-w-xs">
                <div className="flex items-center gap-2 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs font-bold text-stone-900">“ঘরে বসেই খাঁটি মধুর আসল স্বাদ পেলাম!”</div>
                <div className="text-[11px] text-stone-500 mt-0.5">— ব্যারিস্টার রফিকুল ইসলাম, গুলশান ২</div>
              </div>
            </div>

            {/* Content & 4 Distinct Pillars */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#055C32] text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>আমাদের বিশুদ্ধতার অঙ্গীকার</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 leading-tight">
                কেন হাজারো পরিবার নিশ্চিন্তে <br />
                <span className="text-[#055C32]">{GHORER_BAZAR_BRAND.name}</span> এর ওপর আস্থা রাখেন?
              </h2>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                বাজারে যখন ভেজাল আর রাসায়নিকের ছড়াছড়ি, তখন আমরা সংকল্প করেছি আপনার পরিবারকে দেব শতভাগ খাঁটি ও নিরাপদ প্রাকৃতিক পুষ্টি। কোনো মধ্যস্বত্বভোগী ছাড়া সরাসরি তৃণমূল কৃষক, খামারি ও সুন্দরবনের মৌয়ালদের হাত থেকে সংগৃহীত হয় প্রতিটি পণ্য।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-stone-900 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#055C32]" />
                    <span>কোনো হিটিং বা রিফাইনিং নেই</span>
                  </div>
                  <p className="text-[11px] text-stone-500">প্রাকৃতিক এনজাইম ও পুষ্টি উপাদান সম্পূর্ণ অটুট থাকে।</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-stone-900 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#055C32]" />
                    <span>শতভাগ স্বাস্থ্যসম্মত ফুড-গ্রেড প্যাক</span>
                  </div>
                  <p className="text-[11px] text-stone-500">উচ্চমানের কাঁচের জার ও সিল করা এয়ারটাইট প্যাকেজিং।</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-stone-900 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#055C32]" />
                    <span>ডেলিভারিম্যানের সামনে চেক</span>
                  </div>
                  <p className="text-[11px] text-stone-500">পণ্য হাতে নিয়ে রঙ, ঘ্রাণ ও সিল পরীক্ষা করে মূল্য পরিশোধ।</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-stone-900 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#055C32]" />
                    <span>১০০% মানিব্যাক গ্যারান্টি</span>
                  </div>
                  <p className="text-[11px] text-stone-500">পণ্য পছন্দ না হলে কোনো প্রশ্ন ছাড়াই তাৎক্ষণিক রিটার্ন।</p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 8. Verified Customer Testimonials */}
      <section className="py-10 sm:py-14 bg-[#FAFDF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold text-[#055C32] bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
              গ্রাহকদের অভিজ্ঞতা
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-stone-900">
              আমাদের নিয়মিত শুভাকাঙ্ক্ষীরা কী বলছেন
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              সারা দেশের হাজারো সন্তুষ্ট গ্রাহকের খাঁটি অনুভূতির কিছু ঝলক
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                  “সুন্দরবনের খলিসা ফুলের মধুটা এক কথায় অসাধারণ! ঢাকনা খুলতেই যে বুনো সুবাস পেলাম, তা অনেক বছর পর খেলাম। প্যাকেজিংও খুব প্রিমিয়াম ছিল।”
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-stone-900">ডাঃ মাহমুদুর রহমান</h5>
                  <span className="text-[11px] text-stone-500">ধানমন্ডি, ঢাকা</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">ভেরিফাইড ক্রেতা</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                  “গাওয়া ঘি এর ঘ্রাণেই খিচুড়ি রান্না জমজমাট হয়ে গেছে! বাচ্চারা প্রতিদিন সকালে টোস্টে মেখে খাচ্ছে। সবচেয়ে ভালো লেগেছে ডেলিভারিম্যানের সামনে চেক করতে পারা।”
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-stone-900">ফারহানা আক্তার মিলি</h5>
                  <span className="text-[11px] text-stone-500">পাঁচলাইশ, চট্টগ্রাম</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">ভেরিফাইড ক্রেতা</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                  “হানি নাটসটা এনার্জির পাওয়ার হাউজ! জিম করার আগে ১ চামচ খেলে সারাদিন তরতাজা লাগে। কাঠবাদাম, কাজু ও আখরোটের কোয়ালিটি সেরা।”
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-stone-900">ইঞ্জিঃ তানভীর আহমেদ</h5>
                  <span className="text-[11px] text-stone-500">উপশহর, সিলেট</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">ভেরিফাইড ক্রেতা</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. Full Comprehensive Footer (Ghorer Bazar Style) */}
      <footer className="bg-stone-900 text-stone-300 font-sans border-t-4 border-[#055C32]">
        
        {/* Main Footer Links & Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#055C32] flex items-center justify-center text-white font-black text-lg shadow">
                  ঘ
                </div>
                <div>
                  <div className="text-xl font-black text-white leading-tight">{GHORER_BAZAR_BRAND.name}</div>
                  <div className="text-[10px] text-emerald-400 font-medium">{GHORER_BAZAR_BRAND.tagline}</div>
                </div>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed">
                {GHORER_BAZAR_BRAND.subTagline}। সরাসরি নিজস্ব সোর্সিং ও কঠোর ল্যাব পরীক্ষার মাধ্যমে আমরা স্বাস্থ্যকর খাবার সরবরাহ করি।
              </p>

              <div className="pt-2 text-xs space-y-1.5 text-stone-300">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>হটলাইন: <strong className="text-white">{GHORER_BAZAR_BRAND.hotline}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-xs">💬</span>
                  <span>হোয়াটসঅ্যাপ: <strong className="text-white">{GHORER_BAZAR_BRAND.whatsapp}</strong></span>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider border-b border-stone-800 pb-2">
                জনপ্রিয় ক্যাটাগরি
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/organic/shop?cat=honey" className="hover:text-amber-400 transition-colors">
                    সুন্দরবনের খাঁটি মধু
                  </Link>
                </li>
                <li>
                  <Link to="/organic/shop?cat=ghee-oil" className="hover:text-amber-400 transition-colors">
                    গাওয়া ঘি ও সরিষার তেল
                  </Link>
                </li>
                <li>
                  <Link to="/organic/shop?cat=dates" className="hover:text-amber-400 transition-colors">
                    মদিনার প্রিমিয়াম খেজুর
                  </Link>
                </li>
                <li>
                  <Link to="/organic/shop?cat=nuts-seeds" className="hover:text-amber-400 transition-colors">
                    হানি নাটস ও সুপারফুড
                  </Link>
                </li>
                <li>
                  <Link to="/organic/shop?cat=spices" className="hover:text-amber-400 transition-colors">
                    খাঁটি জাতের গুঁড়া মসলা
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Care */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider border-b border-stone-800 pb-2">
                কাস্টমার সাপোর্ট
              </h4>
              <ul className="space-y-2 text-xs">
                <li><span className="hover:text-amber-400 cursor-pointer">কীভাবে অর্ডার করবেন?</span></li>
                <li><span className="hover:text-amber-400 cursor-pointer">ডেলিভারি ও চার্জ পলিসি</span></li>
                <li><span className="hover:text-amber-400 cursor-pointer">রিটার্ন ও মানিব্যাক পলিসি</span></li>
                <li><span className="hover:text-amber-400 cursor-pointer">ল্যাব টেস্ট রিপোর্টসমূহ</span></li>
                <li><span className="hover:text-amber-400 cursor-pointer">গোপনীয়তা নীতিমালা</span></li>
              </ul>
            </div>

            {/* Column 4: Address & Demo Gateway */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider border-b border-stone-800 pb-2">
                ঠিকানা ও হাব
              </h4>
              <p className="text-xs text-stone-400">
                {GHORER_BAZAR_BRAND.address}
              </p>
              
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-emerald-600 transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300 rotate-180" />
                  <span>মাস্টার ডেমো গেটওয়েতে ফিরে যান</span>
                </button>
              </div>

              <div className="text-[11px] text-stone-500 pt-1">
                পেমেন্ট মেথড: ক্যাশ অন ডেলিভারি, বিকাশ, নগদ ও কার্ড
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="border-t border-stone-800 py-4 px-4 text-center text-xs text-stone-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© ২০২৬ {GHORER_BAZAR_BRAND.name} (Ghorer Bazar Clone). সর্বস্বত্ব সংরক্ষিত।</span>
            <span className="text-[11px] text-stone-400">খাঁটি ও প্রাকৃতিক খাদ্যে সুস্থ থাকুন সর্বদা।</span>
          </div>
        </div>

      </footer>

      {/* Floating Bottom-Left Demo Gateway Return Button */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2.5 rounded-full bg-[#055C32] hover:bg-[#077842] text-white text-xs font-bold shadow-2xl border-2 border-emerald-400/80 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          title="মাস্টার ডেমো গেটওয়েতে ফিরে যান"
        >
          <ArrowRight className="w-3.5 h-3.5 text-amber-300 rotate-180" />
          <span>ডেমো ক্যাটাগরি হাব</span>
        </button>
      </div>

      {/* 1-Click Quick COD Order Modal */}
      <GhorerBazarQuickOrderModal
        isOpen={!!quickOrderProduct}
        onClose={() => {
          setQuickOrderProduct(null);
          setQuickOrderWeight(null);
        }}
        product={quickOrderProduct}
        initialWeight={quickOrderWeight}
      />

      {/* Side Cart Drawer */}
      <GhorerBazarCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

    </div>
  );
}
