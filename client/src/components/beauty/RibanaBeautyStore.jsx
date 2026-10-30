import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Heart, Eye, ShieldCheck, Truck, RotateCcw, 
  Sparkles, MessageCircle, ArrowRight, Check, Star, Leaf, 
  Award, Droplets, ChevronLeft, ChevronRight, X, Phone, 
  CheckCircle2, Clock, Flame, SlidersHorizontal, Search, Gem,
  Mail, Send, CreditCard, Lock, Globe, Share2, LayoutGrid, StretchHorizontal
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { 
  RIBANA_HERO_SLIDES, 
  RIBANA_DEPARTMENTS, 
  RIBANA_CONCERNS, 
  RIBANA_PRODUCTS 
} from '../../data/ribanaBeautyData';
import RibanaHeader from './RibanaHeader';
import RibanaCartDrawer from './RibanaCartDrawer';

export default function RibanaBeautyStore({ onBackToGateway = () => {} }) {
  const navigate = useNavigate();
  const { 
    addToCart, 
    wishlist = [], 
    toggleWishlist, 
    isInWishlist, 
    setIsCartOpen,
    ribanaProducts = RIBANA_PRODUCTS,
    ribanaHeroSlides = RIBANA_HERO_SLIDES,
    ribanaBrandingSettings = {}
  } = useStore();

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeConcern, setActiveConcern] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [addedAlert, setAddedAlert] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [cardViewMode, setCardViewMode] = useState('grid'); // 'grid' (3 cols) | 'wide' (wide studio atelier)

  // Dynamic high-converting visual benefit pills for each product
  const getProductBenefits = (prod) => {
    if (prod.concern === 'brightening') return ['✨ গ্লাস-স্কিন গ্লো', '🌿 কেমিক্যালমুক্ত'];
    if (prod.concern === 'acne') return ['🌿 ব্রণ ও দাগ নির্মূল', '🍃 অ্যান্টি-ব্যাকটেরিয়াল'];
    if (prod.concern === 'hairfall') return ['💆‍♀️ চুল পড়া ৯০% রোধ', '🌿 শক্ত চুলের গোড়া'];
    if (prod.concern === 'hydration') return ['💧 ডিপ ময়েশ্চারাইজিং', '🌸 ২৪ ঘণ্টা আর্দ্রতা'];
    if (prod.category === 'soaps') return ['🥛 খাঁটি ছাগলের দুধ', '✨ উজ্জ্বল ও কোমল ত্বক'];
    if (prod.category === 'oils') return ['🥥 ১০০% কোল্ড-প্রেসড', '🌿 খাঁটি ভেষজ ফর্মুলা'];
    if (prod.category === 'combos') return ['🎁 লাক্সারি গিফট সেট', '💰 স্পেশাল সাশ্রয়'];
    return ['🌿 ১০০% অর্গানিক', '✨ ন্যাচারাল গ্লো'];
  };

  // Auto-rotate hero slides every 7 seconds
  useEffect(() => {
    if (!ribanaHeroSlides || ribanaHeroSlides.length === 0) return;
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % ribanaHeroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [ribanaHeroSlides]);

  useEffect(() => {
    setVisibleCount(8);
  }, [activeCategory, activeConcern, searchQuery]);

  const currentSlide = (ribanaHeroSlides && ribanaHeroSlides[heroSlideIdx]) || (ribanaHeroSlides && ribanaHeroSlides[0]) || RIBANA_HERO_SLIDES[0];

  const prevSlide = () => {
    if (!ribanaHeroSlides || ribanaHeroSlides.length === 0) return;
    setHeroSlideIdx((prev) => (prev - 1 + ribanaHeroSlides.length) % ribanaHeroSlides.length);
  };

  const nextSlide = () => {
    if (!ribanaHeroSlides || ribanaHeroSlides.length === 0) return;
    setHeroSlideIdx((prev) => (prev + 1) % ribanaHeroSlides.length);
  };

  // Filter products by category, skin concern, and search query
  const filteredProducts = (ribanaProducts || RIBANA_PRODUCTS).filter((prod) => {
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
    const matchesConcern = activeConcern === 'all' || prod.concern === activeConcern;
    const matchesSearch = !searchQuery.trim() || 
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.keyIngredients && prod.keyIngredients.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesConcern && matchesSearch;
  });

  const handleQuickAdd = (product, e) => {
    if (e) e.stopPropagation();
    addToCart(product, { size: product.size || 'Standard' });
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2400);
  };

  const handleModalAdd = () => {
    if (!selectedProduct) return;
    for (let i = 0; i < modalQuantity; i++) {
      addToCart(selectedProduct, { size: selectedProduct.size || 'Standard' });
    }
    setAddedAlert(true);
    setTimeout(() => {
      setAddedAlert(false);
      setSelectedProduct(null);
      setModalQuantity(1);
    }, 1800);
  };

  const handleWhatsAppConsultation = (product = null) => {
    let msg = `আসসালামু আলাইকুম! আমি RiBANA Organic থেকে বিউটি কনসাল্টেশন নিতে চাই।`;
    if (product) {
      msg = `আসসালামু আলাইকুম! আমি RiBANA Organic-এর "${product.title}" (${product.titleEn}) সম্পর্কে জানতে চাই। মূল্য: ৳${product.price}। এটি কি আমার ত্বকের জন্য উপযুক্ত?`;
    }
    window.open(`https://wa.me/8801711223344?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F5] text-[#35252A] font-sans selection:bg-[#F3D5D0] selection:text-[#35252A] flex flex-col justify-between">
      
      {/* ========================================================
          A & B. ANNOUNCEMENT BAR & NAVBAR (Inside RibanaHeader)
          ======================================================== */}
      <RibanaHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeConcern={activeConcern}
        setActiveConcern={setActiveConcern}
      />

      <main className="flex-1 space-y-16 sm:space-y-24 pb-12">

        {/* ========================================================
            C. HERO SECTION (Dynamic Background Matched to Each Image)
            Full-width Edge-to-Edge Banner with Live Changing Texts & Background Blending
            "lheka gula o change hoibo ar image jaita ase aita sundor moto pura section er bg te boisa jaibo ar image er background er sathe match koira same colour o bg te bosaiya rhakbi"
            ======================================================== */}
        <section 
          className="relative overflow-hidden min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] border-b border-[#EADFDB] transition-all duration-700 ease-in-out select-none flex items-center"
          style={{
            background: currentSlide.bgGradient || 'linear-gradient(135deg, #fbeee9 0%, #f6e3d9 30%, #f3ded3 50%, #f1c9b4 85%, #edbca8 100%)'
          }}
        >
          {/* Subtle Ambient Glow Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#9E5C61]/10 blur-3xl pointer-events-none" />

          {/* Background Image Layer (Positioned across the right / section background with seamless left-edge feather into section bg) */}
          <div className="absolute inset-y-0 right-0 w-full md:w-[62%] lg:w-[58%] h-full pointer-events-none overflow-hidden z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="w-full h-full relative"
              >
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover object-center md:object-right"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, black 35%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, black 35%, black 100%)'
                  }}
                />
                {/* Subtle bottom fade to blend with bottom border */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${currentSlide.bgTone || '#f3ded3'} 0%, transparent 100%)`
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Navigation Left/Right Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-[#35252A] border border-[#EADFDB] shadow-lg flex items-center justify-center transition-all z-30 cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#35252A]" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-[#35252A] border border-[#EADFDB] shadow-lg flex items-center justify-center transition-all z-30 cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#35252A]" />
          </button>

          {/* Mobile Readability Ambient Overlay */}
          <div 
            className="md:hidden absolute inset-0 pointer-events-none z-0"
            style={{
              background: `linear-gradient(to top, ${currentSlide.bgTone || '#f3ded3'} 68%, rgba(255,255,255,0.2) 100%)`
            }}
          />

          {/* Foreground Live HTML Text Layer that Changes Dynamically */}
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full py-12 sm:py-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column (6 to 7 Cols): Live Changing Texts */}
              <div className="lg:col-span-7 xl:col-span-6 space-y-5 text-center lg:text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    {/* Brand Micro-Badge */}
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/85 border border-[#EADFDB] shadow-2xs backdrop-blur-xs">
                      <span className="w-2 h-2 rounded-full bg-[#9E5C61] animate-pulse" />
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#35252A]">
                        {currentSlide.badge}
                      </span>
                    </div>

                    {/* Dynamic Changing Headline */}
                    <div className="space-y-1.5">
                      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black font-serif leading-[1.16] tracking-tight ${
                        currentSlide.isDarkSlide ? 'text-white' : 'text-[#35252A]'
                      }`}>
                        {currentSlide.id === 'slide-master-glow' ? (
                          <>
                            Get your <span className="font-serif italic font-normal text-[#9E5C61]">Glow</span> with RiBANA
                          </>
                        ) : (
                          currentSlide.title
                        )}
                      </h2>
                      <p className={`text-base sm:text-xl font-serif font-light ${
                        currentSlide.isDarkSlide ? 'text-[#EADFDB]' : 'text-[#75666A]'
                      }`}>
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    {/* Dynamic Supporting Description */}
                    <p className={`text-xs sm:text-sm max-w-lg mx-auto lg:mx-0 leading-relaxed font-light ${
                      currentSlide.isDarkSlide ? 'text-[#EADFDB]/80' : 'text-[#75666A]'
                    }`}>
                      {currentSlide.desc}
                    </p>

                    {/* Trust Pillars */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs font-medium pt-1">
                      {currentSlide.trustPills?.map((pill, pIdx) => (
                        <span 
                          key={pIdx} 
                          className="flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-full border border-[#EADFDB] shadow-2xs text-[#35252A]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#39765A]" />
                          <span>{pill}</span>
                        </span>
                      ))}
                    </div>

                    {/* Dynamic Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (currentSlide.category) setActiveCategory(currentSlide.category);
                          const el = document.getElementById('featured-bestsellers');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-7 py-3.5 rounded-full bg-[#9E5C61] hover:bg-[#7E444A] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_16px_rgba(158,92,97,0.35)] active:scale-95 transition-all cursor-pointer group"
                      >
                        <span>{currentSlide.primaryBtn || 'কালেকশন এক্সপ্লোর করুন'}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleWhatsAppConsultation()}
                        className="px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#35252A] border border-[#D9A59D] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-2xs"
                      >
                        <MessageCircle className="w-4 h-4 text-[#39765A]" />
                        <span>{currentSlide.secondaryBtn || 'হোয়াটসঅ্যাপে ফ্রি পরামর্শ'}</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Slide Navigation Indicator Pills */}
            <div className="flex items-center justify-center lg:justify-start space-x-1.5 sm:space-x-2 pt-8 sm:pt-10">
              {RIBANA_HERO_SLIDES.map((slide, idx) => {
                const isAct = heroSlideIdx === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setHeroSlideIdx(idx)}
                    className={`transition-all duration-300 rounded-full flex items-center gap-1.5 py-1 px-2.5 sm:px-3 text-xs font-mono font-bold cursor-pointer ${
                      isAct
                        ? 'bg-[#35252A] text-white shadow-md scale-105'
                        : 'bg-white/70 hover:bg-white text-[#75666A] border border-[#EADFDB]'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isAct ? 'bg-[#F3D5D0] animate-pulse' : 'bg-[#9E5C61]/50'}`} />
                    <span className="text-[10px] sm:text-[11px] font-sans">{slide.tag}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================
            D. CURATED DEPARTMENTS / SHOP BY CATEGORY
            Using the authentic high-definition luxury background image:
            /beauty-images/ribana_category_master_bg.webp
            ======================================================== */}
        <section className="relative overflow-hidden py-14 sm:py-20 border-y border-[#EADBD3] bg-[#FFF8F3]">
          
          {/* Authentic Panoramic Master Category Background */}
          <div className="absolute inset-0 z-0">
            <img
              src="/beauty-images/ribana_category_master_bg.webp"
              alt=""
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* Subtle Whisper-light Warm Veil for Text Contrast & Luxury Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F3]/40 via-transparent to-[#FFF8F3]/50 pointer-events-none" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12 z-10">
            
            {/* Centered Section Header */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="flex items-center justify-center space-x-3 text-[#A64F5C]">
                <span className="h-[1px] w-8 sm:w-14 bg-[#A64F5C]/60" />
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.28em] uppercase text-[#A64F5C]">
                  CURATED DEPARTMENTS
                </span>
                <span className="h-[1px] w-8 sm:w-14 bg-[#A64F5C]/60" />
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-[#352326] tracking-tight">
                ক্যাটাগরি অনুযায়ী ব্রাউজ করুন
              </h3>
              <p className="text-xs sm:text-sm text-[#786568] font-medium">
                ত্বক ও চুলের সঠিক যত্নে আমাদের প্রিমিয়াম অর্গানিক সেগমেন্ট
              </p>
            </div>

            {/* 4 Premium Category Cards Grid (2-Columns on Mobile, 4-Columns on Desktop) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
              {RIBANA_DEPARTMENTS.map((dept) => {
                const isSelected = activeCategory === dept.id;
                return (
                  <div
                    key={dept.id}
                    onClick={() => {
                      setActiveCategory(dept.id);
                      const el = document.getElementById('featured-bestsellers');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`group relative rounded-2xl sm:rounded-3xl p-2 sm:p-3.5 bg-white border transition-all duration-400 cursor-pointer flex flex-col justify-between shadow-[0_4px_16px_rgba(53,35,38,0.05)] sm:shadow-[0_8px_24px_rgba(53,35,38,0.06)] hover:shadow-[0_16px_36px_rgba(53,35,38,0.12)] hover:-translate-y-1 select-none ${
                      isSelected
                        ? 'border-[#A64F5C] ring-2 ring-[#A64F5C]/40 shadow-[0_12px_28px_rgba(166,79,92,0.18)] scale-[1.01]'
                        : 'border-[#EADBD3] hover:border-[#A64F5C]'
                    }`}
                  >
                    {/* Top Image Frame with Overlaid Badges */}
                    <div className="relative aspect-[4/3.5] rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF3EC]">
                      <img
                        src={dept.image}
                        alt={dept.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-600 ease-out"
                        loading="lazy"
                      />
                      {/* Subtle Vignette for Badge Contrast */}
                      <div className="absolute inset-x-0 top-0 h-10 sm:h-12 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />

                      {/* Top Badges (Left Category Chip & Right Status Badge) */}
                      <div className="absolute top-1.5 left-1.5 right-1.5 sm:top-2.5 sm:left-2.5 sm:right-2.5 flex items-center justify-between z-10 gap-1">
                        {/* Left Category Badge */}
                        <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#352326]/85 backdrop-blur-xs text-white text-[8px] sm:text-[10px] font-sans font-medium flex items-center gap-1 shadow-xs truncate max-w-[60%] sm:max-w-none">
                          {dept.badgeLeftType === 'droplet' ? (
                            <Droplets className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#EADBD3] shrink-0" />
                          ) : (
                            <Leaf className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#EADBD3] shrink-0" />
                          )}
                          <span className="truncate">{dept.badgeLeft}</span>
                        </span>

                        {/* Right Status Badge */}
                        <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#FFF8F3]/95 backdrop-blur-xs text-[#63383D] border border-[#EADBD3] text-[8px] sm:text-[10px] font-sans font-bold flex items-center gap-1 shadow-xs shrink-0">
                          {dept.badgeRightType === 'flame' ? (
                            <>
                              <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#B54747] text-[#B54747] shrink-0" />
                              <span className="text-[#A64F5C] truncate">{dept.badgeRight}</span>
                            </>
                          ) : (
                            <>
                              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#C99A43] text-[#C99A43] shrink-0" />
                              <span className="truncate">{dept.badgeRight}</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Card Content & Circular Rosewood Button */}
                    <div className="pt-2 sm:pt-3.5 pb-0.5 px-0.5 sm:px-1 flex items-end justify-between gap-1.5 sm:gap-2">
                      <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
                        {/* English Eyebrow */}
                        <p className="text-[8px] sm:text-[9.5px] font-mono font-bold tracking-[0.16em] uppercase text-[#A64F5C] truncate">
                          {dept.nameEn}
                        </p>
                        
                        {/* Bengali Title */}
                        <h4 className="text-xs sm:text-base font-black font-serif text-[#352326] group-hover:text-[#A64F5C] transition-colors leading-tight sm:leading-snug truncate">
                          {dept.name}
                        </h4>

                        {/* Bengali Short Description */}
                        <p className="text-[10px] sm:text-xs text-[#786568] leading-tight line-clamp-1 font-light">
                          {dept.desc}
                        </p>
                      </div>

                      {/* Circular Rosewood Arrow Button */}
                      <div 
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 shrink-0 mb-0.5 ${
                          isSelected
                            ? 'bg-[#8D3B47] text-white shadow-md scale-105 ring-2 ring-[#FFF8F3]'
                            : 'bg-[#A64F5C] group-hover:bg-[#8D3B47] text-white shadow-xs group-hover:scale-105'
                        }`}
                        title="ক্যাটাগরি দেখুন"
                      >
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================
            E. FEATURED PRODUCTS / BESTSELLERS
            Section bg: #FFF8F5, Card bg: #FFFFFF, Price: #9E5C61,
            Sale badge: #B54747, Star: #D9A441, Border: #EADFDB
            ======================================================== */}
        <section id="featured-bestsellers" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          
          {/* Section Header & Interactive Filter Suite */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#EADFDB] shadow-[0_4px_20px_rgba(53,37,42,0.03)] space-y-5">
            
            {/* Top Row: Title, Eyebrow, Badge & Reset CTA */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5">
                {/* Eyebrow */}
                <div className="flex items-center space-x-2 text-[#9E5C61] text-[11px] font-mono font-bold uppercase tracking-[0.2em]">
                  <span className="w-2 h-2 rounded-full bg-[#9E5C61] animate-pulse" />
                  <span>RIBANA ATELIER COLLECTION • 2026</span>
                </div>

                {/* Main Heading & Discrete Count Pill */}
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-[#35252A] tracking-tight">
                    {activeCategory === 'all' ? 'বেস্টসেলার অর্গানিক কালেকশন' :
                     activeCategory === 'soaps' ? 'হ্যান্ডমেড সোপ কালেকশন' :
                     activeCategory === 'serums' ? 'ব্রাইটেনিং সিরাম ও ফেস জেল' :
                     activeCategory === 'packs' ? 'হারবাল ফেস প্যাক ও স্ক্রাব' :
                     activeCategory === 'oils' ? 'কোল্ড-প্রেসড ভেষজ তেল' : 'ভ্যালু কম্বো ও গিফট সেট'}
                  </h3>

                  <span className="px-3 py-1 rounded-full bg-[#F3D5D0]/60 border border-[#D9A59D]/60 text-[#63383D] font-mono text-xs font-bold shadow-2xs">
                    {filteredProducts.length}টি প্রিমিয়াম প্রোডাক্ট
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-[#75666A] font-light">
                  ১০০% খাঁটি কোল্ড-প্রসেস উপাদান, প্রাকৃতিক ভেষজ নির্যাস ও কাশ্মীরি জাফরানের পুষ্টি
                </p>
              </div>

              {/* Actions Right: Reset Filter & View Mode Switcher */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
                {/* View Switcher: 3-Col Luxury Grid vs Wide Atelier */}
                <div className="flex items-center gap-1 p-1 rounded-full bg-[#FFF8F5] border border-[#EADFDB] shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setCardViewMode('grid')}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      cardViewMode === 'grid'
                        ? 'bg-[#8E2A3E] text-white shadow-xs'
                        : 'text-[#63383D] hover:bg-white/80'
                    }`}
                    title="৩ কলাম গ্রিড ভিউ"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>৩ কলাম ভিউ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCardViewMode('wide')}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      cardViewMode === 'wide'
                        ? 'bg-[#8E2A3E] text-white shadow-xs'
                        : 'text-[#63383D] hover:bg-white/80'
                    }`}
                    title="ওয়াইড স্টুডিও ভিউ"
                  >
                    <StretchHorizontal className="w-3.5 h-3.5" />
                    <span>ওয়াইড অ্যাটেলিয়ার</span>
                  </button>
                </div>

                {/* Reset Filter Button (Shown when filters are applied) */}
                {(activeCategory !== 'all' || activeConcern !== 'all') && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('all');
                      setActiveConcern('all');
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#FFF8F5] hover:bg-[#F3D5D0] border border-[#D9A59D] text-[#63383D] text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#9E5C61]" />
                    <span>সব ফিল্টার মুছুন</span>
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Row: Skin Concern Quick Selectors */}
            <div className="pt-4 border-t border-[#EADFDB]/80 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs font-serif text-[#35252A] shrink-0">
                <Sparkles className="w-4 h-4 text-[#C99A43]" />
                <span className="font-bold tracking-wide">ত্বক ও চুলের সমাধান বাছুন:</span>
              </div>

              {/* Pills Row */}
              <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto scrollbar-none py-1 max-w-full">
                {RIBANA_CONCERNS.map((c) => {
                  const isConcernActive = activeConcern === c.id;
                  const matchingCount = c.id === 'all'
                    ? RIBANA_PRODUCTS.filter(p => activeCategory === 'all' || p.category === activeCategory).length
                    : RIBANA_PRODUCTS.filter(p => (activeCategory === 'all' || p.category === activeCategory) && p.concern === c.id).length;

                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveConcern(c.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 select-none group ${
                        isConcernActive
                          ? 'bg-[#9E5C61] text-white font-bold shadow-[0_3px_12px_rgba(158,92,97,0.28)] ring-1 ring-[#9E5C61]'
                          : 'bg-[#FFF8F5] hover:bg-[#F3D5D0]/40 text-[#35252A] border border-[#EADFDB] hover:border-[#D9A59D]'
                      }`}
                    >
                      <span className={`text-xs transition-transform ${isConcernActive ? 'text-[#F3D5D0]' : 'text-[#9E5C61] group-hover:scale-110'}`}>
                        {c.icon}
                      </span>
                      <span>{c.label}</span>
                      <span className={`text-[9.5px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                        isConcernActive ? 'bg-white/20 text-white' : 'bg-white text-[#75666A] border border-[#EADFDB]'
                      }`}>
                        {matchingCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Products Container: 2-Col Mobile / 3-Col Luxury Grid OR Wide Studio Atelier */}
          <div className={
            cardViewMode === 'grid'
              ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8"
              : "grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
          }>
            {filteredProducts.slice(0, visibleCount).map((prod) => {
              const isLiked = isInWishlist(prod.id);
              const benefits = getProductBenefits(prod);

              if (cardViewMode === 'wide') {
                {/* WIDE STUDIO ATELIER CARD (Direct reference match to media_1793132789352_f7589b0c.png) */}
                return (
                  <motion.div
                    key={prod.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
                    onClick={() => navigate(`/beauty/product/${prod.id}`)}
                    className="group relative rounded-[32px] border border-[#F0D5CC]/90 hover:border-[#8E2A3E]/60 shadow-[0_12px_36px_rgba(53,35,38,0.06),0_2px_8px_rgba(166,79,92,0.04)] hover:shadow-[0_24px_55px_rgba(142,42,62,0.2),0_8px_20px_rgba(244,63,94,0.12)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col sm:flex-row cursor-pointer select-none backdrop-blur-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 250, 247, 0.94) 50%, rgba(253, 243, 238, 0.96) 100%)'
                    }}
                  >
                    {/* Specular hairline top shine */}
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-10" />

                    {/* Left: Product Photography Pedestal (42% width) */}
                    <div className="w-full sm:w-[42%] relative min-h-[260px] sm:min-h-full overflow-hidden p-5 flex items-center justify-center shrink-0">
                      {/* Ambient radial glow backdrop */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.95) 0%, ${prod.bgTone || '#F8EAE0'} 65%, #FFF5EF 100%)`
                        }}
                      />
                      {/* Radiant warm glow spot */}
                      <div 
                        className="absolute w-44 h-44 rounded-full blur-2xl opacity-70 pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(255,225,185,0.85) 0%, rgba(244,180,195,0.45) 60%, transparent 100%)' }}
                      />

                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="relative z-1 max-h-[220px] sm:max-h-[240px] w-auto object-contain object-center group-hover:scale-108 transition-transform duration-700 ease-out drop-shadow-[0_12px_24px_rgba(53,37,42,0.14)]"
                        loading="lazy"
                      />

                      {/* Right feather dissolve into text body on sm+ */}
                      <div 
                        className="hidden sm:block absolute inset-y-0 right-0 w-12 pointer-events-none z-2"
                        style={{
                          background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.8) 100%)'
                        }}
                      />
                    </div>

                    {/* Right: Rich Content, Badges & Neon Aurora Button (58% width) */}
                    <div className="w-full sm:w-[58%] p-5 sm:p-6 flex flex-col justify-between space-y-3 relative z-1">
                      {/* Top Header Row: Bestseller Badge, Discount & Wishlist */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span 
                            className="px-3 py-1 rounded-full text-[#2D1B22] font-mono text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-xs border border-[#F5D89F]"
                            style={{
                              background: 'linear-gradient(135deg, rgba(255, 249, 235, 0.95) 0%, rgba(255, 238, 245, 0.95) 50%, rgba(235, 249, 255, 0.95) 100%)'
                            }}
                          >
                            <span className="text-amber-500 text-xs">👑</span>
                            <span>{prod.badge || 'BESTSELLER #01'}</span>
                          </span>

                          {prod.discount && (
                            <span 
                              className="px-2.5 py-1 rounded-full text-white font-mono text-[10.5px] font-extrabold tracking-tight border-t border-white/40"
                              style={{
                                background: 'linear-gradient(180deg, #BA3E50 0%, #961A2B 55%, #751221 100%)',
                                boxShadow: '0 4px 14px rgba(150, 26, 43, 0.4)'
                              }}
                            >
                              {prod.discount}
                            </span>
                          )}
                        </div>

                        {/* Wishlist Glass Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(prod);
                          }}
                          className="w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#35252A] flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-white/90 backdrop-blur-md cursor-pointer shrink-0"
                          title={isLiked ? 'উইশলিস্ট থেকে সরান' : 'উইশলিস্টে যোগ করুন'}
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              isLiked ? 'fill-[#BA3E50] text-[#BA3E50]' : 'text-[#4A3238]'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Title */}
                      <div className="space-y-1">
                        <h4 className="text-lg sm:text-xl font-black font-serif text-[#2B1A1E] group-hover:text-[#8E2A3E] transition-colors leading-[1.3] line-clamp-2">
                          {prod.title}
                        </h4>
                        <p className="text-[11px] font-mono text-[#8C6D74] font-medium">
                          {prod.size} • ১০০% খাঁটি কোল্ড-প্রসেস উপাদান
                        </p>
                      </div>

                      {/* Micro Pills: Skin Type & Rating */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0E8] border border-[#EEDCD2] text-[#63383D] font-bold text-[10.5px]">
                          {prod.skinType.split(' ')[0]}
                        </span>
                        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50/90 border border-amber-200/80 text-[11px] font-extrabold text-[#7A4E0B]">
                          <Star className="w-3.5 h-3.5 fill-[#E5A824] text-[#E5A824]" />
                          <span>{prod.rating}</span>
                          <span className="text-[#8C6D45] font-normal text-[10px]">({prod.reviews || 240})</span>
                        </div>
                      </div>

                      {/* Selling Benefit Chips */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {benefits.map((chip, idx) => (
                          <span 
                            key={idx}
                            className="px-2.5 py-0.5 rounded-md bg-white/90 border border-[#F0D5CC] text-[#7A3844] font-bold text-[10.5px] shadow-2xs"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      {/* Ingredients Teaser */}
                      <p className="text-xs text-[#6B555A] line-clamp-1 font-light flex items-center gap-1.5 pt-0.5">
                        <span className="text-[#C99A43] font-serif text-sm">✦</span>
                        <span className="truncate">{prod.keyIngredients}</span>
                      </p>

                      {/* Bottom Pricing & Neon Aurora Button Shelf */}
                      <div className="pt-3 border-t border-[#F2D7CF]/80 flex items-center justify-between gap-3 mt-auto">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-baseline space-x-1.5">
                            <span className="text-2xl sm:text-[25px] font-black text-[#8E2A3E] font-serif tracking-tight leading-none">
                              ৳{prod.price.toLocaleString('en-US')}
                            </span>
                            {prod.originalPrice && (
                              <span className="text-xs sm:text-[13px] text-[#8C757B] line-through font-mono">
                                ৳{prod.originalPrice.toLocaleString('en-US')}
                              </span>
                            )}
                          </div>
                          {prod.originalPrice && (
                            <span 
                              className="inline-block mt-1 text-[10px] font-mono font-black px-2 py-0.5 rounded-md text-[#8C5814] border border-[#EACFA8] w-fit shadow-2xs"
                              style={{ background: 'linear-gradient(90deg, #FFF5E8 0%, #FFE9CF 100%)' }}
                            >
                              সাশ্রয় ৳{(prod.originalPrice - prod.price).toLocaleString('en-US')}
                            </span>
                          )}
                        </div>

                        {/* Neon Aurora Glow CTA Button */}
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(prod, e)}
                          className="relative group/btn px-4 sm:px-5 py-2.5 rounded-full text-white font-bold text-xs sm:text-[13px] tracking-wide flex items-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, #2D1B22 0%, #3D1F28 50%, #1F1216 100%)',
                            boxShadow: '0 0 16px 2px rgba(244, 63, 94, 0.55), 0 0 28px 4px rgba(168, 85, 247, 0.35), 0 0 10px 1px rgba(56, 189, 248, 0.35)'
                          }}
                          title="শপিং ব্যাগে যোগ করুন"
                        >
                          <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none group-hover/btn:border-pink-300/60 transition-colors" />
                          <ShoppingBag className="w-3.5 h-3.5 text-pink-200 shrink-0 drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                          <span className="drop-shadow-sm font-black">ব্যাগে নিন</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              {/* DEFAULT 3-COLUMNS LUXURY ATELIER STATUESQUE CARD */}
              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  onClick={() => navigate(`/beauty/product/${prod.id}`)}
                  className="group relative rounded-2xl sm:rounded-[32px] border border-[#F0D5CC]/90 hover:border-[#8E2A3E]/60 shadow-[0_4px_16px_rgba(53,35,38,0.06)] sm:shadow-[0_12px_36px_rgba(53,35,38,0.06),0_2px_8px_rgba(166,79,92,0.04)] hover:shadow-[0_24px_55px_rgba(142,42,62,0.2),0_8px_20px_rgba(244,63,94,0.12)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer select-none backdrop-blur-2xl"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 250, 247, 0.94) 55%, rgba(253, 243, 238, 0.97) 100%)'
                  }}
                >
                  {/* Specular hairline top shine */}
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-10" />

                  {/* Product Photography Frame (Pedestal Background) */}
                  <div className="relative aspect-[4/3.8] sm:aspect-[4/3.6] w-full overflow-hidden rounded-t-xl sm:rounded-t-[30px] flex items-center justify-center">
                    {/* Ambient radial glow backdrop */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 50% 55%, rgba(255, 255, 255, 0.95) 0%, ${prod.bgTone || '#F8EAE0'} 65%, #FFF5EF 100%)`
                      }}
                    />

                    {/* Soft radiant warm glow orb behind bottle */}
                    <div 
                      className="absolute w-32 h-32 sm:w-48 sm:h-48 rounded-full blur-2xl opacity-70 pointer-events-none"
                      style={{ background: 'radial-gradient(circle, rgba(255,225,185,0.85) 0%, rgba(244,180,195,0.45) 60%, transparent 100%)' }}
                    />

                    {/* Product Image */}
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="relative z-1 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Feather dissolve at bottom into card body */}
                    <div 
                      className="absolute inset-x-0 bottom-0 h-10 sm:h-16 pointer-events-none z-2"
                      style={{
                        background: 'linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.4) 40%, transparent 100%)'
                      }}
                    />

                    {/* Top Floating Badges (Adapted for 2-column mobile display) */}
                    <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-1.5 z-10 pointer-events-none max-w-[70%]">
                      {/* 👑 Iridescent Bestseller Badge */}
                      <span 
                        className="px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[#2D1B22] font-mono text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 backdrop-blur-md shadow-xs border border-[#F5D89F] truncate"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 249, 235, 0.95) 0%, rgba(255, 238, 245, 0.95) 50%, rgba(235, 249, 255, 0.95) 100%)'
                        }}
                      >
                        <span className="text-amber-500 text-[9px] sm:text-xs">👑</span>
                        <span className="truncate">{prod.badge || 'BESTSELLER'}</span>
                      </span>

                      {/* 3D Glossy Ruby Discount Pill */}
                      {prod.discount && (
                        <span 
                          className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-white font-mono text-[8px] sm:text-[10.5px] font-extrabold tracking-tight border-t border-white/40 shadow-xs"
                          style={{
                            background: 'linear-gradient(180deg, #BA3E50 0%, #961A2B 55%, #751221 100%)',
                            boxShadow: '0 2px 8px rgba(150, 26, 43, 0.35)'
                          }}
                        >
                          {prod.discount}
                        </span>
                      )}
                    </div>

                    {/* Floating Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod);
                      }}
                      className="absolute top-2 right-2 sm:top-3.5 sm:right-3.5 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/85 hover:bg-white text-[#35252A] flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-20 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-white/90 backdrop-blur-md cursor-pointer"
                      title={isLiked ? 'উইশলিস্ট থেকে সরান' : 'উইশলিস্টে যোগ করুন'}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                          isLiked ? 'fill-[#BA3E50] text-[#BA3E50]' : 'text-[#4A3238]'
                        }`}
                      />
                    </button>

                    {/* Desktop Hover Quick Action Bar (Slide-Up) */}
                    <div className="hidden sm:flex absolute inset-x-4 bottom-3 items-center justify-center gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/beauty/product/${prod.id}`);
                        }}
                        className="flex-1 py-2.5 rounded-full bg-white/95 hover:bg-[#8E2A3E] text-[#2D1B22] hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md border border-[#F0D5CC] backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>বিস্তারিত দেখুন</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppConsultation(prod);
                        }}
                        className="w-9 h-9 rounded-full bg-[#2E7D5B] hover:bg-[#236348] text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-90 shrink-0 cursor-pointer"
                        title="হোয়াটসঅ্যাপে পরামর্শ"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Content Details (Optimized for 2-column mobile) */}
                  <div className="p-2.5 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3.5">
                    
                    <div className="space-y-1 sm:space-y-2">
                      {/* Category / Skin Concern & Star Rating */}
                      <div className="flex items-center justify-between text-xs font-mono gap-1">
                        <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-[#FAF0E8] border border-[#EEDCD2] text-[#63383D] font-bold text-[9px] sm:text-[10.5px] truncate">
                          {prod.skinType.split(' ')[0]} • অর্গানিক
                        </span>
                        <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-50/90 border border-amber-200/80 text-[9.5px] sm:text-[11px] font-extrabold text-[#7A4E0B] shrink-0">
                          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#E5A824] text-[#E5A824]" />
                          <span>{prod.rating}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-xs sm:text-base lg:text-lg font-black font-serif text-[#2B1A1E] group-hover:text-[#8E2A3E] transition-colors leading-tight sm:leading-[1.35] line-clamp-2 min-h-[30px] sm:min-h-[44px]">
                        {prod.title}
                      </h4>

                      {/* Benefit Chips */}
                      <div className="flex items-center gap-1 flex-wrap">
                        {benefits.slice(0, 1).map((chip, idx) => (
                          <span 
                            key={idx}
                            className="px-1.5 py-0.5 rounded bg-white/90 border border-[#F0D5CC] text-[#7A3844] font-bold text-[9px] sm:hidden truncate"
                          >
                            {chip}
                          </span>
                        ))}
                        <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                          {benefits.map((chip, idx) => (
                            <span 
                              key={idx}
                              className="px-2.5 py-0.5 rounded-md bg-white/90 border border-[#F0D5CC] text-[#7A3844] font-bold text-[10.5px] shadow-2xs"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Ingredients Teaser (Desktop/Tablet) */}
                      <p className="hidden sm:flex text-xs text-[#6B555A] line-clamp-1 font-light items-center gap-1.5 pt-0.5">
                        <span className="text-[#C99A43] font-serif text-sm">✦</span>
                        <span className="truncate">{prod.keyIngredients}</span>
                      </p>
                    </div>

                    {/* Hairline Divider & Bottom Pricing / Neon Aurora CTA Row */}
                    <div className="pt-2 sm:pt-3.5 border-t border-[#F2D7CF]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2.5 mt-auto">
                      <div className="flex items-baseline justify-between sm:justify-start space-x-1.5">
                        <span className="text-sm sm:text-xl lg:text-[23px] font-black text-[#8E2A3E] font-serif tracking-tight leading-none">
                          ৳{prod.price.toLocaleString('en-US')}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-[10px] sm:text-[13px] text-[#8C757B] line-through font-mono">
                            ৳{prod.originalPrice.toLocaleString('en-US')}
                          </span>
                        )}
                      </div>

                      {/* Primary Luxury Aurora Glow CTA Button */}
                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(prod, e)}
                        className="w-full sm:w-auto relative group/btn px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full text-white font-bold text-[10.5px] sm:text-xs tracking-wide flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 active:scale-95 shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, #2D1B22 0%, #3D1F28 50%, #1F1216 100%)',
                          boxShadow: '0 0 12px 1px rgba(244, 63, 94, 0.45), 0 0 20px 2px rgba(168, 85, 247, 0.25)'
                        }}
                        title="শপিং ব্যাগে যোগ করুন"
                      >
                        <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none group-hover/btn:border-pink-300/60 transition-colors" />
                        <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-200 shrink-0 drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                        <span className="drop-shadow-sm font-black whitespace-nowrap">ব্যাগে নিন</span>
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Load More & View All Action Buttons */}
          {visibleCount < filteredProducts.length && (
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 4, filteredProducts.length))}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#FFF5F2] text-[#8E2A3E] border-2 border-[#F0D5CC] hover:border-[#8E2A3E] font-black text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                <Sparkles className="w-4 h-4 text-[#8E2A3E]" />
                <span>আরও ৪টি প্রোডাক্ট লোড করুন ({visibleCount}/{filteredProducts.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setVisibleCount(filteredProducts.length)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#8E2A3E] hover:bg-[#722030] text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                <span>সব {filteredProducts.length}টি প্রোডাক্ট দেখুন</span>
                <ArrowRight className="w-4 h-4 text-pink-200" />
              </button>
            </div>
          )}

        </section>

        {/* ========================================================
            F. SPECIAL OFFERS / PROMOTIONAL BANNER
            Background: #9E5C61, Text: #FFFFFF
            ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#9E5C61] rounded-3xl p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden shadow-xl">
            
            {/* Ambient Background Circles */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="md:col-span-7 space-y-4 text-center md:text-left">
                <span className="px-3.5 py-1 rounded-full bg-white/20 text-[#FFF8F5] font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase border border-white/30 inline-block">
                  LIMITED TIME SPECIAL PROMOTION
                </span>
                
                <h3 className="text-2xl sm:text-4xl font-black font-serif text-white leading-tight">
                  কমপ্লিট গ্লো-আপ কম্বো সেটে <br className="hidden sm:inline" />
                  <span className="text-[#F3D5D0]">২৫% পর্যন্ত বিশেষ সাশ্রয়!</span>
                </h3>

                <p className="text-xs sm:text-sm text-[#F3D5D0] max-w-lg leading-relaxed font-light">
                  জাফরান সোপ, ব্রাইটনিং সিরাম এবং ফেস জেলের সম্পূর্ণ কম্বিনেশন একসাথে কিনলে পাচ্ছেন স্পেশাল ডিসকাউন্ট সাথে সারা দেশে ফ্রি হোম ডেলিভারি।
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('combos');
                      const el = document.getElementById('featured-bestsellers');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-full bg-white hover:bg-[#FFF8F5] text-[#9E5C61] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    অফার কম্বো দেখুন
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppConsultation()}
                    className="px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-[#F3D5D0]" />
                    <span>হোয়াটসঅ্যাপে বুক করুন</span>
                  </button>
                </div>
              </div>

              {/* Promo Image with Dynamic Dark Tone & Soft Feather */}
              <div className="md:col-span-5 flex justify-center">
                <div 
                  className="w-full max-w-sm rounded-2xl overflow-hidden border border-white/20 shadow-2xl p-2 transition-colors duration-500"
                  style={{ backgroundColor: '#251C18' }}
                >
                  <img
                    src="/beauty-images/Skincare_gift_set_in_box_20261027235417.webp"
                    alt="Luxury Gift Set Promotion"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                    }}
                    className="w-full aspect-[4/3] object-cover rounded-xl"
                  />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================
            G. WHY CHOOSE US / BEAUTY BENEFITS
            Background: #F3D5D0, Headings & Text: #35252A
            ======================================================== */}
        <section className="bg-[#F3D5D0] py-14 sm:py-20 border-y border-[#EADFDB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#9E5C61]">
                WHY RIBANA ORGANIC
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-[#35252A]">
                কেন রিভানা অর্গানিক সবচেয়ে বিশ্বস্ত?
              </h3>
              <p className="text-xs sm:text-sm text-[#75666A]">
                আমাদের প্রতিটি উপাদান বিশুদ্ধতার সর্বোচ্চ মানদণ্ডে তৈরি
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-3xl border border-[#EADFDB] shadow-2xs space-y-3 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8F5] text-[#9E5C61] flex items-center justify-center mx-auto sm:mx-0 border border-[#EADFDB]">
                  <Leaf className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#35252A]">১০০% হ্যান্ডমেড ও প্রাকৃতিক</h4>
                <p className="text-xs text-[#75666A] leading-relaxed">
                  কোনো প্যারাবেন, সালফেট বা ক্ষতিকারক প্রিজারভেটিভ ছাড়া সম্পূর্ণ প্রাকৃতিক উপায়ে হাতে তৈরি।
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#EADFDB] shadow-2xs space-y-3 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8F5] text-[#9E5C61] flex items-center justify-center mx-auto sm:mx-0 border border-[#EADFDB]">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#35252A]">বিএসটিআই ও ল্যাব সার্টিফায়েড</h4>
                <p className="text-xs text-[#75666A] leading-relaxed">
                  সরকারি ল্যাব টেস্টেড ও কোয়ালিটি সার্টিফায়েড, যা প্রতিদিনের ব্যবহারে সম্পূর্ণ নিরাপদ।
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#EADFDB] shadow-2xs space-y-3 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8F5] text-[#9E5C61] flex items-center justify-center mx-auto sm:mx-0 border border-[#EADFDB]">
                  <Truck className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#35252A]">ক্যাশ অন ডেলিভারি (COD)</h4>
                <p className="text-xs text-[#75666A] leading-relaxed">
                  সারা দেশে দ্রুততম হোম ডেলিভারি এবং ডেলিভারি ম্যানের সামনে পণ্য দেখে বুঝে নেওয়ার সুবিধা।
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#EADFDB] shadow-2xs space-y-3 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8F5] text-[#9E5C61] flex items-center justify-center mx-auto sm:mx-0 border border-[#EADFDB]">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#35252A]">৭ দিনের মান নিশ্চয়তা</h4>
                <p className="text-xs text-[#75666A] leading-relaxed">
                  যেকোনো ত্রুটি বা প্রয়োজনে আমাদের কাস্টমার কেয়ার টিম সবসময় আপনার সেবায় প্রস্তুত।
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================
            H. CUSTOMER REVIEWS / TESTIMONIALS
            Background: #FFFFFF, Cards: #FFF8F5, Headings: #35252A,
            Text: #75666A, Stars: #D9A441
            ======================================================== */}
        <section className="bg-white py-14 sm:py-20 border-b border-[#EADFDB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
            
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#9E5C61]">
                REAL CUSTOMER FEEDBACK
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-[#35252A]">
                গ্রাহকদের বাস্তব অভিজ্ঞতা ও রিভিউ
              </h3>
              <p className="text-xs sm:text-sm text-[#75666A]">
                হাজারো সন্তুষ্ট গ্রাহকের ভালোবাসা ও প্রশংসাই আমাদের অনুপ্রেরণা
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'সানজিদা ইসলাম',
                  location: 'উত্তরা, ঢাকা',
                  product: 'জাফরান সিরাম ও গোট মিল্ক সোপ',
                  rating: 5,
                  comment: 'আমার মুখের ব্রণের জেদি দাগগুলো ৩ সপ্তাহ নিয়মিত ব্যবহারের পর একদম হালকা হয়ে গেছে! কোনো সাইড ইফেক্ট নেই, স্কিনে ন্যাচারাল গ্লো এসেছে।'
                },
                {
                  name: 'রাবেয়া সুলতানা',
                  location: 'ধানমন্ডি, ঢাকা',
                  product: 'ভৃঙ্গরাজ হেয়ার অয়েল',
                  rating: 5,
                  comment: 'চুল পড়া নিয়ে খুবই হতাশ ছিলাম। রিভানার ভৃঙ্গরাজ অয়েল ব্যবহারের ১০ দিনেই চুল পড়া অর্ধেকের বেশি কমে গেছে। খাঁটি ভেষজ তেলের সুবাস।'
                },
                {
                  name: 'মেহজাবীন চৌধুরী',
                  location: 'চট্টগ্রাম',
                  product: 'লাক্সারি উডেন গিফট বক্স',
                  rating: 5,
                  comment: 'আমার বোনের জন্মদিনে গিফট করেছিলাম। প্যাকেজিং যেমন রাজকীয়, ভিতরের জাফরান সাবান ও সিরামের কোয়ালিটিও ১০০% প্রিমিয়াম!'
                }
              ].map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFF8F5] p-6 sm:p-7 rounded-3xl border border-[#EADFDB] shadow-2xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    {/* Star Ratings (#D9A441) */}
                    <div className="flex items-center space-x-1 text-[#D9A441]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#75666A] leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EADFDB] flex items-center justify-between text-xs">
                    <div>
                      <h5 className="font-bold text-[#35252A]">{rev.name}</h5>
                      <p className="text-[10px] text-[#75666A]">{rev.location}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#39765A] bg-[#39765A]/10 px-2.5 py-0.5 rounded-full font-bold">
                      ✓ ভেরিফাইড ক্রেতা
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================
            I. NEWSLETTER SUBSCRIPTION
            Background: #F3D5D0, Headings & Text: #35252A,
            Input bg: #FFFFFF, Input border: #EADFDB, Button: #9E5C61
            ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#F3D5D0] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto border border-[#EADFDB] space-y-5 shadow-sm">
            
            <div className="w-12 h-12 rounded-2xl bg-white text-[#9E5C61] flex items-center justify-center mx-auto border border-[#EADFDB]">
              <Mail className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#35252A]">
                রিভানা অর্গানিক বিউটি ক্লাবে যোগ দিন
              </h3>
              <p className="text-xs sm:text-sm text-[#75666A] max-w-md mx-auto">
                নতুন প্রোডাক্টের আগমন, স্কিনকেয়ার টিপস এবং এক্সক্লুসিভ ডিসকাউন্ট ভাউচার সরাসরি ইমেইলে পেতে সাবস্ক্রাইব করুন।
              </p>
            </div>

            {newsletterSubscribed ? (
              <div className="p-3.5 rounded-2xl bg-[#39765A]/15 border border-[#39765A]/40 text-[#39765A] text-xs font-bold max-w-md mx-auto flex items-center justify-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>ধন্যবাদ! আপনি সফলভাবে রিভানা বিউটি ক্লাবে যুক্ত হয়েছেন।</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="আপনার ইমেইল অ্যাড্রেস লিখুন..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white border border-[#EADFDB] rounded-full px-5 py-3 text-xs sm:text-sm text-[#35252A] focus:outline-none focus:border-[#9E5C61] focus:ring-1 focus:ring-[#9E5C61]/30 shadow-inner"
                />
                <button
                  type="submit"
                  className="px-7 py-3 rounded-full bg-[#9E5C61] hover:bg-[#7E444A] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  সাবস্ক্রাইব
                </button>
              </form>
            )}

            <p className="text-[10px] text-[#75666A]">
              * আপনার তথ্য শতভাগ নিরাপদ। আমরা কোনো স্প্যাম মেইল পাঠাই না।
            </p>

          </div>
        </section>

      </main>

      {/* ========================================================
          J. FOOTER
          Background: #35252A, Main text: #FFF8F5, Secondary: #EADFDB
          ======================================================== */}
      <footer className="bg-[#35252A] text-[#FFF8F5] pt-14 pb-8 border-t border-[#35252A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Col 1: Brand Info (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="space-y-1">
                <h4 className="text-2xl font-black font-serif text-[#FFF8F5] tracking-widest uppercase">
                  RiBANA
                </h4>
                <p className="text-[10px] font-mono text-[#F3D5D0] tracking-wider uppercase">
                  ORGANIC & HANDMADE SKINCARE BD
                </p>
              </div>
              
              <p className="text-xs text-[#EADFDB] leading-relaxed">
                ২০১৫ সাল থেকে বাংলাদেশে ১০০% অর্গানিক ও ক্ষতিকর কেমিক্যাল মুক্ত ভেষজ স্কিনকেয়ার ও হেয়ারকেয়ার প্রোডাক্ট প্রস্তুতকারী শীর্ষস্থানীয় ব্র্যান্ড।
              </p>

              <div className="flex items-center space-x-3 text-[#EADFDB] pt-1">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#9E5C61] flex items-center justify-center transition-colors text-white" aria-label="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#9E5C61] flex items-center justify-center transition-colors text-white" aria-label="Instagram">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#9E5C61] flex items-center justify-center transition-colors text-white" aria-label="YouTube">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Col 2: Navigation Links (3 Cols) */}
            <div className="lg:col-span-3 space-y-3 text-xs">
              <h5 className="font-serif font-bold text-sm text-[#F3D5D0] uppercase tracking-wider">
                ক্যাটাগরি
              </h5>
              <ul className="space-y-2 text-[#EADFDB]">
                <li><button onClick={() => setActiveCategory('soaps')} className="hover:text-white transition-colors cursor-pointer">হ্যান্ডমেড সোপ বার</button></li>
                <li><button onClick={() => setActiveCategory('serums')} className="hover:text-white transition-colors cursor-pointer">জাফরান ব্রাইটনিং সিরাম</button></li>
                <li><button onClick={() => setActiveCategory('packs')} className="hover:text-white transition-colors cursor-pointer">হারবাল ফেস প্যাক ও স্ক্রাব</button></li>
                <li><button onClick={() => setActiveCategory('oils')} className="hover:text-white transition-colors cursor-pointer">ভৃঙ্গরাজ ও কোল্ড-প্রেসড অয়েল</button></li>
                <li><button onClick={() => setActiveCategory('combos')} className="hover:text-white transition-colors cursor-pointer">ভ্যালু কম্বো ও গিফট সেট</button></li>
              </ul>
            </div>

            {/* Col 3: Customer Care (2 Cols) */}
            <div className="lg:col-span-2 space-y-3 text-xs">
              <h5 className="font-serif font-bold text-sm text-[#F3D5D0] uppercase tracking-wider">
                গ্রাহক সেবা
              </h5>
              <ul className="space-y-2 text-[#EADFDB]">
                <li><a href="#" className="hover:text-white transition-colors">ডেলিভারি পলিসি</a></li>
                <li><a href="#" className="hover:text-white transition-colors">রিটার্ন ও রিফান্ড</a></li>
                <li><a href="#" className="hover:text-white transition-colors">বিএসটিআই সনদপত্র</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ব্যবহার নির্দেশিকা</a></li>
                <li><a href="#" className="hover:text-white transition-colors">প্রাইভেসি পলিসি</a></li>
              </ul>
            </div>

            {/* Col 4: Contact & Outlets (3 Cols) */}
            <div className="lg:col-span-3 space-y-3 text-xs">
              <h5 className="font-serif font-bold text-sm text-[#F3D5D0] uppercase tracking-wider">
                যোগাযোগ ও শোরুম
              </h5>
              <p className="text-[#EADFDB] leading-relaxed">
                📍 ফ্ল্যাগশিপ আউটলেট: বাড়ি ১২, রোড ৪, ব্লক সি, গুলশান-১, ঢাকা-১২১২
              </p>
              <p className="text-[#EADFDB] font-mono">
                📞 হেল্পলাইন: 01711-223344
              </p>
              <p className="text-[#EADFDB] font-mono">
                ✉️ ইমেইল: care@ribana.com.bd
              </p>
              <div className="pt-1">
                <span className="inline-block px-2.5 py-1 rounded bg-white/10 text-[#F3D5D0] text-[10px] font-mono font-bold">
                  সকাল ৯টা - রাত ১১টা খোলা
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Security Strip */}
          <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EADFDB]/80 text-center sm:text-left">
            <p>
              © ২০২৬ RiBANA Organic Bangladesh • All Rights Reserved. Powered by WebCraft BD Enterprise.
            </p>
            <div className="flex items-center space-x-2 text-[11px]">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#39765A]" />
                <span>100% Secure SSL Payment</span>
              </span>
              <span>•</span>
              <span>Cash on Delivery</span>
              <span>•</span>
              <span>bKash / Nagad</span>
            </div>
          </div>

        </div>
      </footer>

      {/* ========================================================
          QUICK PRODUCT PREVIEW LIGHTBOX MODAL
          ======================================================== */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 p-4 sm:p-6 flex items-center justify-center font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-[#35252A]/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-3xl w-full bg-[#FFF8F5] rounded-3xl p-5 sm:p-8 shadow-2xl border border-[#EADFDB] z-10 max-h-[90vh] overflow-y-auto space-y-6"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white hover:bg-[#9E5C61] text-[#35252A] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs border border-[#EADFDB]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                
                {/* Modal Photo Frame with Dynamic Matching Tone & Soft Melt */}
                <div 
                  className="sm:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#EADFDB] transition-colors duration-500"
                  style={{ backgroundColor: selectedProduct.bgTone || '#FFF8F5' }}
                >
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                    }}
                    className="w-full h-full object-cover object-center"
                  />
                  <div 
                    className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, #ffffff 15%, transparent 100%)'
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#35252A] text-[#FFF8F5] font-mono text-[9px] font-bold uppercase shadow-sm">
                      {selectedProduct.badge}
                    </span>
                  </div>
                </div>

                {/* Modal Product Specs */}
                <div className="sm:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#9E5C61]">
                      RiBANA ORGANIC • BSTI APPROVED
                    </p>
                    <h3 className="text-xl sm:text-2xl font-black font-serif text-[#35252A] leading-snug">
                      {selectedProduct.title}
                    </h3>
                    <p className="text-xs text-[#75666A] font-mono">{selectedProduct.titleEn}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline space-x-2 pt-1 border-t border-[#EADFDB]">
                    <span className="text-2xl font-black text-[#9E5C61] font-serif">
                      ৳{selectedProduct.price.toLocaleString('en-US')}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm text-[#75666A] line-through font-mono">
                        ৳{selectedProduct.originalPrice.toLocaleString('en-US')}
                      </span>
                    )}
                    {selectedProduct.originalPrice && (
                      <span className="text-xs font-mono font-bold text-[#39765A] bg-[#39765A]/10 px-2.5 py-0.5 rounded-full">
                        সাশ্রয় ৳{(selectedProduct.originalPrice - selectedProduct.price).toLocaleString('en-US')}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#75666A] leading-relaxed">
                    {selectedProduct.shortDesc}
                  </p>

                  {/* Highlights */}
                  <div className="p-3 rounded-2xl bg-white border border-[#EADFDB] space-y-1.5 text-xs">
                    <p className="text-[#35252A] font-bold flex items-center gap-1.5">
                      <span className="text-[#9E5C61]">✦</span>
                      <span>উপাদান: <strong className="font-normal text-[#75666A]">{selectedProduct.keyIngredients}</strong></span>
                    </p>
                    <p className="text-[#35252A] font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39765A]" />
                      <span>উপযুক্ততা: <strong className="font-normal text-[#75666A]">{selectedProduct.skinType}</strong></span>
                    </p>
                  </div>

                  {/* Quantity Stepper & Actions */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-[#EADFDB] rounded-full bg-white px-3 py-1.5 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
                          className="px-2 text-[#75666A] hover:text-[#35252A] font-bold text-base cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-mono font-black text-sm px-2 text-[#35252A]">{modalQuantity}</span>
                        <button
                          type="button"
                          onClick={() => setModalQuantity((q) => q + 1)}
                          className="px-2 text-[#75666A] hover:text-[#35252A] font-bold text-base cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleModalAdd}
                        className="flex-1 py-3 px-5 rounded-full bg-[#9E5C61] hover:bg-[#7E444A] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 text-white" />
                        <span>শপিং ব্যাগে যোগ করুন</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleWhatsAppConsultation(selectedProduct)}
                      className="w-full py-2.5 rounded-full bg-white hover:bg-[#F3D5D0] border border-[#D9A59D] text-[#35252A] font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#39765A]" />
                      <span>হোয়াটসঅ্যাপে প্রশ্ন বা অর্ডার দিন</span>
                    </button>
                  </div>

                  {/* Toast Alert */}
                  {addedAlert && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2.5 rounded-xl bg-[#39765A]/15 border border-[#39765A]/40 text-[#39765A] text-xs font-bold text-center flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-[#39765A]" />
                      <span>প্রোডাক্ট সফলভাবে শপিং ব্যাগে যুক্ত হয়েছে!</span>
                    </motion.div>
                  )}

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Slide-Over RiBANA Luxury Cart Drawer */}
      <RibanaCartDrawer />

      {/* Floating Admin Console Pill */}
      <button
        type="button"
        onClick={() => navigate('/beauty/admin')}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#35252A] hover:bg-[#9E5C61] text-[#FFF8F5] border-2 border-[#D9A59D] shadow-2xl flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold cursor-pointer active:scale-95 transition-all hover:scale-105"
        title="রিভানা বিউটি অ্যাডমিন প্যানেল"
      >
        <span className="w-2 h-2 rounded-full bg-[#39765A] animate-pulse" />
        <ShieldCheck className="w-4 h-4 text-[#F3D5D0]" />
        <span>বিউটি অ্যাডমিন</span>
      </button>

    </div>
  );
}
