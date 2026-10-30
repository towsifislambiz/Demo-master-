import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Heart, Search, Phone, ShieldCheck, Truck, RotateCcw, 
  MapPin, Star, ArrowRight, X, Plus, Minus, Check, ChevronLeft, ChevronRight,
  MessageCircle, Sparkles, SlidersHorizontal, Eye, Ruler, Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SHELAI_PRODUCTS, SHELAI_CATEGORIES, SHELAI_HERO_SLIDES } from '../../data/shelaiFashionData';
import { useStore } from '../../context/StoreContext';
import ShelaiHeader from './ShelaiHeader';
import ShelaiCartDrawer from './ShelaiCartDrawer';

export default function ShelaiFashionStore({ onBackToGateway }) {
  const navigate = useNavigate();
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    isCartOpen, 
    setIsCartOpen, 
    clearCart,
    deliveryArea,
    setDeliveryArea,
    wishlist = [],
    toggleWishlist,
    isInWishlist,
    shelaiProducts = SHELAI_PRODUCTS,
    heroSlides = SHELAI_HERO_SLIDES,
    contactSettings = {}
  } = useStore();
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortBy, setSortBy] = useState('popular');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedStitching, setSelectedStitching] = useState('Stitched (Ready to Wear)');
  const [addedAlert, setAddedAlert] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Checkout Form state
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Hero auto-slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    setVisibleCount(8);
  }, [activeCategory, searchQuery, sortBy]);

  // Filter & sort products by category, search & sorting option
  const filteredProducts = shelaiProducts.filter((prod) => {
    const matchesCategory = activeCategory === 'all' || prod.subCategory === activeCategory;
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.designer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'discount') {
      const discA = a.originalPrice ? (a.originalPrice - a.price) : 0;
      const discB = b.originalPrice ? (b.originalPrice - b.price) : 0;
      return discB - discA;
    }
    return 0; // 'popular' / default
  });

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes?.[0] || 'M');
    setSelectedStitching(product.stitchingOptions?.[0] || 'Stitched (Ready to Wear)');
  };

  const handleAddToCartWithVariants = (product) => {
    addToCart(product, { size: selectedSize, stitching: selectedStitching });
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2000);
  };

  const handleWhatsAppOrder = (product) => {
    const text = `আসসালামু আলাইকুম! আমি Shelai Couture থেকে "${product.title}" (${product.designer}) ড্রেসটি অর্ডার করতে চাই।\nমূল্য: ৳${product.price.toLocaleString('en-US')}\nসাইজ: ${selectedSize}\nস্লোট/স্ট্রিচিং: ${selectedStitching}\nডেলিভারি বিস্তারিত জানতে চাই।`;
    window.open(`https://wa.me/8801629559653?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = cartSubtotal >= 2500 ? 0 : (deliveryArea === 'inside' ? 80 : 150);
  const cartTotal = cartSubtotal + deliveryCharge;
  const freeDeliveryThreshold = 2500;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!customerName || !phone || !address || cart.length === 0) {
      alert('দয়া করে নাম, ফোন নম্বর এবং সম্পূর্ণ ঠিকানা পূরণ করুন।');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = {
        id: 'SHL-' + Math.floor(100000 + Math.random() * 900000),
        customerName,
        phone,
        address,
        area: deliveryArea === 'inside' ? 'ঢাকা সিটি' : 'ঢাকার বাইরে',
        paymentMethod,
        items: [...cart],
        subtotal: cartSubtotal,
        deliveryCharge,
        total: cartTotal,
        date: new Date().toLocaleDateString('bn-BD')
      };

      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } catch (_) {}

      setOrderSuccess(order);
      clearCart();
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1c1917] font-sans selection:bg-[#0f291e] selection:text-white">
      
      {/* Universal Shelai Luxury Header & Department Bar */}
      <ShelaiHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        showCategories={true}
      />

      {/* 3. Grand Panoramic Editorial Hero Showcase (Full Image Displayed, Zero Crop) */}
      <section className="relative overflow-hidden bg-[#07130e] text-white min-h-[82vh] lg:min-h-[88vh] max-h-[920px] flex flex-col justify-between pt-6 pb-4 sm:pb-6">
        {/* Background Ambient Glow & Lighting matching current slide */}
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Ambient Blurred Background Fill */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover blur-3xl opacity-25 scale-110 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07130e] via-[#07130e]/85 to-[#07130e]/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07130e] via-transparent to-[#07130e]/70" />
            </div>

            {/* Split Editorial Layout: Left Text & Right Pristine 16:9 Model Shoot Frame */}
            <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 py-2 sm:py-4 my-auto">
              
              {/* Left Column: Headlines & Call to Actions */}
              <div className="w-full lg:w-5/12 text-left space-y-3.5 sm:space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-[0.25em] font-mono uppercase px-3 py-1 rounded-full bg-[#c5a059]/20 text-[#fef08a] border border-[#c5a059]/40 backdrop-blur-md shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#fde047]" />
                    <span>{slide.tag}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif leading-[1.18] text-white drop-shadow-md">
                  {slide.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#d1fae5] leading-relaxed font-light">
                  {slide.subtitle}
                </p>

                {/* Trust Badges Strip */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#a7f3d0] pt-1">
                  <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#34d399] shrink-0" />
                    <span className="truncate">১০০% আসল ডিজাইনার ওয়্যার</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    <Truck className="w-3.5 h-3.5 text-[#fde047] shrink-0" />
                    <span className="truncate">সারাদেশে ফ্রি হোম ডেলিভারি</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    <RotateCcw className="w-3.5 h-3.5 text-[#6ee7b7] shrink-0" />
                    <span className="truncate">৭ দিনে সহজ এক্সচেঞ্জ</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span className="truncate">বনানী শোরুম ট্রায়াল সুবিধা</span>
                  </span>
                </div>

                {/* Call to Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(slide.targetCategory);
                      const el = document.getElementById('collection-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-full bg-[#c5a059] hover:bg-[#d4af37] text-[#0f291e] font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-xl hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{slide.accentText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://wa.me/8801629559653?text=আসসালামু%20আলাইকুম!%20আমি%20Shelai%20Couture%20এর%20ফ্যাশন%20কালেকশন%20সম্পর্কে%20জানতে%20চাই।"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 flex items-center gap-2 transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25d366]" />
                    <span>হোয়াটসঅ্যাপ অর্ডার</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Full Cinematic 16:9 Image Frame (Zero Cropping!) */}
              <div className="w-full lg:w-7/12 flex flex-col items-center">
                <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#c5a059]/60 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(197,160,89,0.3)] group bg-black/60">
                  {/* The Complete 16:9 High-Res Image - 100% full view with zero cutting! */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain sm:object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                  />

                  {/* Top-Left Luxury Designer Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-[#0f291e]/90 text-[#fef08a] font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-[#c5a059]/40 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#fde047]" />
                      <span>SHELAI EXCLUSIVE • HD শুট</span>
                    </span>
                  </div>

                  {/* Top-Right HD Fullscreen Zoom Trigger */}
                  <button
                    type="button"
                    onClick={() => setZoomedImage(slide)}
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 px-3 py-1 rounded-full bg-black/70 hover:bg-[#c5a059] text-white hover:text-[#0f291e] border border-white/20 hover:border-[#c5a059] font-mono text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-lg cursor-pointer"
                    title="সম্পূর্ণ ছবি বড় করে জুম দেখুন"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">ফুল জুম ভিউ</span>
                  </button>

                  {/* Bottom Vignette Caption */}
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-xs">
                    <div>
                      <p className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider">Festive Lookbook '26</p>
                      <p className="font-bold text-white font-serif text-xs sm:text-sm">{slide.title}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory(slide.targetCategory);
                        const el = document.getElementById('collection-grid');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-full bg-white text-[#0f291e] hover:bg-[#c5a059] font-bold text-[10px] sm:text-xs transition-all shadow-md flex items-center gap-1 cursor-pointer"
                    >
                      <span>কালেকশন দেখুন</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}

        {/* Hero Slider Navigation Arrows */}
        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-[#c5a059] text-white hover:text-[#0f291e] border border-white/20 hover:border-[#c5a059] flex items-center justify-center transition-all shadow-xl cursor-pointer"
          title="পূর্ববর্তী স্লাইড"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-[#c5a059] text-white hover:text-[#0f291e] border border-white/20 hover:border-[#c5a059] flex items-center justify-center transition-all shadow-xl cursor-pointer"
          title="পরবর্তী স্লাইড"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Interactive 4-Slide Department Thumbnail Strip */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-8 mt-auto pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 bg-black/60 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl border border-white/10">
            {heroSlides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`p-1.5 sm:p-2 rounded-xl transition-all text-left flex items-center space-x-2 sm:space-x-2.5 cursor-pointer border ${
                  currentSlide === idx
                    ? 'bg-[#c5a059]/25 border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.35)] ring-1 ring-[#c5a059]'
                    : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                }`}
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg overflow-hidden shrink-0 border border-white/20 bg-black">
                  <img src={s.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden">
                  <p className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase truncate ${
                    currentSlide === idx ? 'text-[#fef08a]' : 'text-[#a8a29e]'
                  }`}>
                    0{idx + 1} • {s.tag.split(' ')[0]}
                  </p>
                  <p className={`text-[11px] sm:text-xs font-bold truncate ${
                    currentSlide === idx ? 'text-white' : 'text-stone-300'
                  }`}>
                    {s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Luxury Curated Boutique Department Showcase (Arched Royal Architecture) */}
      <section className="bg-gradient-to-b from-[#fbf9f5] via-[#f5f0e6] to-[#fbf9f5] py-12 sm:py-16 border-b border-[#e7e2d9] relative overflow-hidden">
        {/* Subtle Decorative Ambient Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#c5a059]/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#0f291e]/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Section Royal Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2.5">
            <div className="flex items-center justify-center space-x-2 text-[#854d0e]">
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#c5a059]" />
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#854d0e]">
                CURATED DEPARTMENTS
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#c5a059]" />
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-[#0f291e] tracking-tight">
              জনপ্রিয় কালেকশন গ্যালারি
            </h3>

            <p className="text-xs sm:text-sm text-[#78716c] font-light max-w-lg mx-auto">
              প্রতিটি কালেকশনে রয়েছে আসল ফেব্রিক, নিখুঁত কারিগরি ও প্রিমিয়াম ফিনিশিংয়ের নিশ্চয়তা
            </p>
          </div>

          {/* 4 Majestic Arched Department Cards (2-cols on mobile, 4-cols on desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { 
                id: 'suits', 
                title: 'লাক্সারি ৩-পিস স্যুট', 
                badge: 'অরিজিনাল পাকিস্তানি',
                count: '৬টি মাস্টারপিস',
                price: '৳৭,৮০০ থেকে শুরু',
                img: '/fashion-images/Model_posing_in_chiffon_suit_20261026161901.webp', 
                tag: 'মারিয়া বি. • আসিম জোফা • বারোক'
              },
              { 
                id: 'sarees', 
                title: 'ঐতিহ্যবাহী ঢাকাই শাড়ি', 
                badge: 'হ্যান্ডলুম উইভিং',
                count: '৬টি এক্সক্লুসিভ পিস',
                price: '৳৯,২০০ থেকে শুরু',
                img: '/fashion-images/Model_wearing_Dhakai_Jamdani_saree_20261026161931.webp', 
                tag: 'ঢাকাই জামদানি • বেনারসি কাতান'
              },
              { 
                id: 'kurtis', 
                title: 'রেডি কুর্তি ও প্লাজো সেট', 
                badge: 'রেডি টু ওয়্যার প্রেট',
                count: '৬টি ট্রেন্ডি স্টাইল',
                price: '৳৪,৫০০ থেকে শুরু',
                img: '/fashion-images/Model_wearing_yellow_kurti_and_20261026162023.webp', 
                tag: 'চিকনকারি লন • জ্যাকার্ড টিউনিস'
              },
              { 
                id: 'abayas', 
                title: 'দুবাই চেরি সিল্ক আবায়া', 
                badge: 'দুবাই মডেস্ট ওয়্যার',
                count: '৬টি রাজকীয় ডিজাইন',
                price: '৳৬,৯০০ থেকে শুরু',
                img: '/fashion-images/Model_wearing_luxury_silk_abaya_20261026161845.webp', 
                tag: 'চেরি সিল্ক • ক্রিস্টাল ও হিজাব'
              }
            ].map((item) => {
              const isSelected = activeCategory === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveCategory(item.id);
                    const el = document.getElementById('collection-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group relative bg-white rounded-3xl p-3 sm:p-3.5 border-2 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-1.5 ${
                    isSelected 
                      ? 'border-[#0f291e] ring-2 ring-[#c5a059] shadow-xl' 
                      : 'border-[#e7e2d9] hover:border-[#c5a059]'
                  }`}
                >
                  {/* Arched Architectural Image Frame */}
                  <div className="relative aspect-[4/5] rounded-2xl sm:rounded-[2rem] overflow-hidden bg-[#0f291e]/5">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Dark gradient for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30 group-hover:opacity-95 transition-opacity" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded-full bg-[#0f291e]/90 text-[#fef08a] font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border border-[#c5a059]/40 shadow-sm">
                        {item.badge}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/60 text-white font-mono text-[9px] backdrop-blur-md border border-white/20">
                        {item.count}
                      </span>
                    </div>

                    {/* In-Frame Bottom Caption */}
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white z-10 space-y-1">
                      <p className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider">
                        {item.tag}
                      </p>
                      <h4 className="text-base sm:text-lg font-bold font-serif leading-snug group-hover:text-[#fef08a] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-3 px-1 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-mono text-[#854d0e] uppercase">প্রাইস রেঞ্জ</p>
                      <p className="text-xs font-bold text-[#0f291e] font-serif">{item.price}</p>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-[#0f291e] text-[#fef9c3]' 
                        : 'bg-[#f4efe6] text-[#0f291e] group-hover:bg-[#c5a059] group-hover:text-[#0f291e]'
                    }`}>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Active Selection Glow Pill */}
                  {isSelected && (
                    <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#0f291e] text-[#fef9c3] font-mono text-[9px] font-black tracking-wider uppercase border border-[#c5a059] shadow-md">
                      ✓ নির্বাচিত
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Shelai Signature High-Fashion Product Grid */}
      <section id="collection-grid" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        
        {/* Luxury Grid Header & Filter Runway Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#e7e2d9] pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-[#854d0e] text-[11px] font-mono font-bold tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>SHELAI EXCLUSIVE CATALOG • 2026</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#0f291e] flex items-center gap-3">
              <span>
                {activeCategory === 'all' ? 'সকল ফ্যাশন কালেকশন' : 
                 activeCategory === 'suits' ? 'লাক্সারি ৩-পিস স্যুট' :
                 activeCategory === 'sarees' ? 'ঐতিহ্যবাহী ঢাকাই শাড়ি' :
                 activeCategory === 'kurtis' ? 'রেডি কুর্তি ও প্লাজো সেট' : 'দুবাই চেরি সিল্ক আবায়া'}
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#0f291e] text-[#fef9c3] border border-[#c5a059]/40 shadow-sm">
                {filteredProducts.length} টি ড্রেস
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-[#78716c] font-light">
              ১০০% অরিজিনাল ডিজাইনার কালেকশন • সরাসরি ইমপোর্ট ও নিজস্ব তাঁতে বোনা • ছবি ও ফেব্রিক গ্যারান্টি
            </p>
          </div>

          {/* Interactive Department Pills & Sort Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Department Switchers */}
            <div className="flex items-center space-x-1 bg-[#f4efe6] p-1 rounded-full border border-[#d6cebf]">
              {[
                { id: 'all', label: 'সবগুলো' },
                { id: 'suits', label: '৩-পিস' },
                { id: 'sarees', label: 'শাড়ি' },
                { id: 'kurtis', label: 'কুর্তি' },
                { id: 'abayas', label: 'আবায়া' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#0f291e] text-[#fef9c3] shadow-xs'
                      : 'text-[#57534e] hover:text-[#0f291e]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-1.5 bg-[#f4efe6] px-3 py-1.5 rounded-full border border-[#d6cebf] text-xs">
              <span className="text-[#78716c] text-[11px] font-mono">সর্ট:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#0f291e] focus:outline-none cursor-pointer"
              >
                <option value="popular">জনপ্রিয় কালেকশন</option>
                <option value="price-low">দাম: কম থেকে বেশি</option>
                <option value="price-high">দাম: বেশি থেকে কম</option>
                <option value="discount">সর্বোচ্চ ছাড়</option>
              </select>
            </div>
          </div>
        </div>

        {/* 24 Products Grid in Ultra-Luxury Editorial Format (2-cols on mobile, 3 on tablet, 4 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.slice(0, visibleCount).map((prod) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onClick={() => navigate(`/store/product/${prod.id}`)}
              className="group bg-white rounded-2xl sm:rounded-3xl border border-[#e8e2d5] hover:border-[#c5a059] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(15,41,30,0.12)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer relative"
            >
              {/* Product Image Frame (High-Fashion 3:4 Portrait Ratio) */}
              <div className="relative aspect-[3/4] w-full bg-[#f6f2ea] overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Ambient Dark Bottom Vignette on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Floating Designer & Discount Badges */}
                <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 flex flex-col gap-1 z-10 pointer-events-none">
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#0f291e]/90 text-[#fef08a] font-mono text-[8px] sm:text-[9px] font-bold tracking-wider uppercase backdrop-blur-md border border-[#c5a059]/40 shadow-sm flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-[#fde047]" />
                    <span>{prod.badge}</span>
                  </span>
                  {prod.discount && (
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#831843]/90 text-[#fce7f3] font-mono text-[8px] sm:text-[9px] font-bold tracking-wide backdrop-blur-md border border-[#f43f5e]/30 shadow-sm">
                      {prod.discount}
                    </span>
                  )}
                </div>

                {/* Wishlist Heart Icon */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(prod);
                  }}
                  className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#0f291e] flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-10 shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-white/60 backdrop-blur-md cursor-pointer"
                  title={isInWishlist(prod.id) ? 'উইশলিস্ট থেকে সরান' : 'উইশলিস্টে যোগ করুন'}
                >
                  <Heart
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                      isInWishlist(prod.id) ? 'fill-[#dc2626] text-[#dc2626]' : 'text-[#78716c]'
                    }`}
                  />
                </button>

                {/* Interactive Dual Action Bar on Hover (Desktop) */}
                <div className="hidden sm:flex absolute inset-x-0 bottom-3 px-3 items-center justify-center gap-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/store/product/${prod.id}`);
                    }}
                    className="flex-1 py-2 rounded-full bg-white/95 hover:bg-[#0f291e] text-[#0f291e] hover:text-[#fef9c3] font-bold text-xs flex items-center justify-center gap-1.5 shadow-xl border border-[#c5a059]/40 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>বিস্তারিত দেখুন</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppOrder(prod);
                    }}
                    className="w-9 h-9 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-90 shrink-0 cursor-pointer"
                    title="হোয়াটসঅ্যাপে প্রশ্ন বা অর্ডার করুন"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Info Section (Refined Luxury Editorial Typography) */}
              <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                <div className="space-y-1">
                  {/* Designer Monogram & Stock Status */}
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono">
                    <span className="font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#854d0e] truncate max-w-[70%]">
                      {prod.designer}
                    </span>
                    <span className="text-[#15803d] flex items-center gap-1 font-semibold shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                      <span className="hidden xs:inline">ইন স্টক</span>
                    </span>
                  </div>

                  {/* Complete 2-Line Product Title */}
                  <h4 className="text-xs sm:text-[15px] font-black font-serif text-[#1c1917] group-hover:text-[#0f291e] transition-colors leading-snug line-clamp-2 min-h-[34px] sm:min-h-[42px]">
                    {prod.title}
                  </h4>

                  {/* Fabric Breakdown */}
                  <p className="text-[10.5px] sm:text-xs text-[#78716c] line-clamp-1 font-light flex items-center gap-1">
                    <span className="text-[#c5a059]">✦</span>
                    <span className="truncate">{prod.fabric.shirt}</span>
                  </p>
                </div>

                {/* Price & Action Row */}
                <div className="pt-2 sm:pt-3 border-t border-[#f0ebd9] flex items-center justify-between gap-1.5 sm:gap-2 mt-auto">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-sm sm:text-xl font-black text-[#0f291e] font-serif tracking-tight">
                        ৳{prod.price.toLocaleString('en-US')}
                      </span>
                      {prod.originalPrice && (
                        <span className="hidden sm:inline text-xs text-[#a8a29e] line-through font-mono">
                          ৳{prod.originalPrice.toLocaleString('en-US')}
                        </span>
                      )}
                    </div>
                    {prod.originalPrice && (
                      <span className="text-[8.5px] sm:text-[9.5px] font-mono font-bold text-[#15803d] truncate">
                        সাশ্রয় ৳{(prod.originalPrice - prod.price).toLocaleString('en-US')}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCartWithVariants(prod);
                    }}
                    className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#0f291e] hover:bg-[#16382b] text-white hover:text-[#fef9c3] font-bold text-[11px] sm:text-xs flex items-center gap-1 sm:gap-1.5 shadow-[0_3px_12px_rgba(15,41,30,0.2)] hover:shadow-[0_4px_16px_rgba(197,160,89,0.35)] active:scale-95 transition-all cursor-pointer border border-[#c5a059]/40 group/btn shrink-0"
                  >
                    <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#fde047] group-hover/btn:scale-110 transition-transform" />
                    <span>ব্যাগে নিন</span>
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Load More & View All Action Buttons */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(prev + 4, filteredProducts.length))}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#0f291e] border-2 border-[#c5a059]/40 hover:border-[#c5a059] font-black text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span>আরও ৪টি কালেকশন লোড করুন ({visibleCount}/{filteredProducts.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setVisibleCount(filteredProducts.length)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0f291e] hover:bg-[#16382b] text-[#fef9c3] font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer w-full sm:w-auto border border-[#c5a059]/40"
            >
              <span>সব {filteredProducts.length}টি কালেকশন একসাথে দেখুন</span>
              <ArrowRight className="w-4 h-4 text-[#fde047]" />
            </button>
          </div>
        )}

      </section>

      {/* 6. Physical Boutique Trust & Guarantee Strip */}
      <section className="bg-[#f4efe6] border-y border-[#e7e2d9] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          
          <div className="flex items-center space-x-3.5 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#0f291e] text-[#fef08a] flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0f291e]">১০০% অরিজিনাল ডিজাইনার</h4>
              <p className="text-xs text-[#78716c]">সব প্রোডাক্ট সরাসরি ব্র্যান্ড ইমপোর্টেড</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#0f291e] text-[#fef08a] flex items-center justify-center shrink-0 shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0f291e]">ফাস্ট হোম ডেলিভারি</h4>
              <p className="text-xs text-[#78716c]">ঢাকা ২৪ ঘণ্টা ও ঢাকার বাইরে ৪৮ ঘণ্টা</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#0f291e] text-[#fef08a] flex items-center justify-center shrink-0 shadow-md">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0f291e]">৭ দিনের সহজ এক্সচেঞ্জ</h4>
              <p className="text-xs text-[#78716c]">সাইজ বা রঙের যেকোনো পরিবর্তনে ট্রায়াল</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#0f291e] text-[#fef08a] flex items-center justify-center shrink-0 shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0f291e]">ফিজিক্যাল আউটলেটস</h4>
              <p className="text-xs text-[#78716c]">বনানী ব্লক জি ও ধানমন্ডি সাতমসজিদ রোড</p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Shelai Luxury Boutique Footer */}
      <footer className="bg-[#0f291e] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-white/10 pb-8 text-center md:text-left">
          
          <div className="space-y-3">
            <h3 className="text-xl font-black font-serif tracking-widest uppercase text-white">
              SHELAI COUTURE
            </h3>
            <p className="text-xs text-[#d1fae5] leading-relaxed">
              বাংলাদেশের প্রিমিয়ার ফ্যাশন বুটিক ডেসটিনেশন। মারিয়া বি, সানা সাফিনাজ, ঢাকাই জামদানি এবং এক্সক্লুসিভ দুবাই সিল্কের বিশ্বস্ত প্রতিষ্ঠান।
            </p>
            <p className="text-[11px] font-mono text-[#a7f3d0]">
              Powered by <strong>WebCraft BD Enterprise D2C Engine</strong>
            </p>
          </div>

          <div className="space-y-2 text-xs text-[#d1fae5]">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase font-serif">
              ক্যাটাগরি
            </h4>
            <p className="hover:text-white cursor-pointer" onClick={() => setActiveCategory('suits')}>লাক্সারি ৩-পিস স্যুট</p>
            <p className="hover:text-white cursor-pointer" onClick={() => setActiveCategory('sarees')}>ঢাকাই জামদানি ও সিল্ক</p>
            <p className="hover:text-white cursor-pointer" onClick={() => setActiveCategory('kurtis')}>কুর্তি ও প্লাজো সেট</p>
            <p className="hover:text-white cursor-pointer" onClick={() => setActiveCategory('abayas')}>দুবাই সিল্ক আবায়া</p>
          </div>

          <div className="space-y-2 text-xs text-[#d1fae5]">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase font-serif">
              আউটলেট লোকেশন
            </h4>
            <p>📍 বনানী আউটলেট: ব্লক জি, রোড ১১, ঢাকা</p>
            <p>📍 ধানমন্ডি আউটলেট: সাতমসজিদ রোড, ঢাকা</p>
            <p>📍 মিরপুর-১২ শোরুম</p>
            <p>📞 হটলাইন: 01629-559653</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase font-serif">
              নিরাপদ পেমেন্ট পার্টনার
            </h4>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-white/10 text-[#fde047] font-bold">বিকাশ</span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-[#f97316] font-bold">নগদ</span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-white font-bold">ক্যাশ অন ডেলিভারি</span>
            </div>
            <p className="text-[11px] text-[#a7f3d0]">
              অর্ডার করার সময় ডেলিভারি ম্যানের সামনে দেখে নেওয়ার সম্পূর্ণ সুযোগ রয়েছে।
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 text-center text-xs text-[#a7f3d0] font-mono">
          © 2026 SHELAI COUTURE. Designed with Enterprise Excellence by WebCraft BD.
        </div>
      </footer>

      {/* ======================================================== */}
      {/* 8. Shelai Product Detail Modal (Luxury Boutique Look)   */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 text-[#1c1917] shadow-2xl overflow-hidden my-8 z-10 border border-[#e7e2d9]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f4efe6] hover:bg-[#eae3d5] text-[#1c1917] flex items-center justify-center transition-colors z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                {/* Left: High-Res 3:4 Model Photo */}
                <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-[#f4efe6] shadow-md relative">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-md bg-[#0f291e] text-[#fef08a] font-mono text-xs font-bold shadow-md">
                      {selectedProduct.badge}
                    </span>
                  </div>
                </div>

                {/* Right: Detailed Boutique Information */}
                <div className="space-y-4 text-left">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#854d0e]">
                      {selectedProduct.designer}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black font-serif text-[#0f291e] mt-1">
                      {selectedProduct.title}
                    </h3>
                    <p className="text-xs text-[#78716c] font-sans mt-0.5">
                      {selectedProduct.titleEn}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="p-3 bg-[#f7f4ed] rounded-xl border border-[#e7e2d9] flex items-baseline space-x-3">
                    <span className="text-2xl font-black text-[#0f291e] font-mono">
                      ৳{selectedProduct.price.toLocaleString('en-US')}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm text-[#78716c] line-through font-mono">
                        ৳{selectedProduct.originalPrice.toLocaleString('en-US')}
                      </span>
                    )}
                    <span className="text-xs font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded-full">
                      {selectedProduct.discount}
                    </span>
                  </div>

                  {/* Fabric Specification Breakdown */}
                  <div className="space-y-1.5 p-3.5 bg-white rounded-xl border border-[#e7e2d9] text-xs">
                    <h5 className="font-bold text-[#0f291e] font-serif flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>ফেব্রিক ও উপাদান বিবরণ:</span>
                    </h5>
                    <p className="text-[#44403c]"><strong>জামা:</strong> {selectedProduct.fabric.shirt}</p>
                    <p className="text-[#44403c]"><strong>ওড়না:</strong> {selectedProduct.fabric.dupatta}</p>
                    <p className="text-[#44403c]"><strong>ট্রাউজার:</strong> {selectedProduct.fabric.trouser}</p>
                  </div>

                  {/* Stitching Options Toggle */}
                  {selectedProduct.stitchingOptions && selectedProduct.stitchingOptions.length > 1 && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#0f291e] block">
                        স্টিচিং টাইপ সিলেক্ট করুন:
                      </label>
                      <div className="flex gap-2">
                        {selectedProduct.stitchingOptions.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedStitching(opt)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                              selectedStitching === opt
                                ? 'bg-[#0f291e] text-white border-[#0f291e]'
                                : 'bg-[#f4efe6] text-[#44403c] border-[#d6cebf]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes Selection */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#0f291e]">
                        সাইজ বেছে নিন:
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowSizeGuide(!showSizeGuide)}
                        className="text-[11px] font-bold text-[#854d0e] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Ruler className="w-3 h-3" />
                        <span>সাইজ চার্ট গাইড</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((sz, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                            selectedSize === sz
                              ? 'bg-[#c5a059] text-[#0f291e] border-[#c5a059] shadow-sm'
                              : 'bg-[#f4efe6] text-[#44403c] border-[#d6cebf] hover:bg-[#eae3d5]'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => handleAddToCartWithVariants(selectedProduct)}
                      className="flex-1 py-3 rounded-full bg-[#0f291e] hover:bg-[#1b4332] text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#fde047]" />
                      <span>ব্যাগ-এ যোগ করুন</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWhatsAppOrder(selectedProduct)}
                      className="px-5 py-3 rounded-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>১-ক্লিক হোয়াটসঅ্যাপ</span>
                    </button>
                  </div>

                  {/* Added notification toast */}
                  {addedAlert && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2.5 rounded-xl bg-[#dcfce7] border border-[#86efac] text-[#166534] text-xs font-bold text-center flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>ড্রেসটি সফলভাবে শপিং ব্যাগে যুক্ত হয়েছে!</span>
                    </motion.div>
                  )}

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. Upgraded Shelai Luxury Slide-Over Cart Drawer */}
      <ShelaiCartDrawer />

      {/* 10. HD Full-Screen Shoot Lightbox Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <div className="fixed inset-0 z-50 p-4 sm:p-8 flex items-center justify-center font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomedImage(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-6xl max-h-[92vh] w-full flex flex-col items-center z-10"
            >
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-[#c5a059] text-white hover:text-[#0f291e] border border-white/30 flex items-center justify-center transition-all z-20 cursor-pointer shadow-2xl"
                title="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative rounded-2xl overflow-hidden border-2 border-[#c5a059]/60 shadow-[0_0_80px_rgba(197,160,89,0.35)] bg-black">
                <img
                  src={zoomedImage.image}
                  alt={zoomedImage.title}
                  className="max-h-[82vh] w-auto max-w-full object-contain"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-mono text-[#fde047] uppercase tracking-wider">{zoomedImage.tag}</span>
                    <h3 className="text-base sm:text-xl font-serif font-bold">{zoomedImage.title}</h3>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#0f291e] text-[#fef9c3] border border-[#c5a059]/50 font-mono">
                    1376 × 768 HD SHOOT
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Admin Demo Access Pill for Testing Clients */}
      <button
        type="button"
        onClick={() => navigate('/admin')}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#0f291e] hover:bg-[#16382b] text-[#fef9c3] border-2 border-[#c5a059] shadow-2xl flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold cursor-pointer active:scale-95 transition-all hover:scale-105"
        title="অ্যাডমিন প্যানেল কনসোলে প্রবেশ করুন"
      >
        <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
        <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
        <span>অ্যাডমিন ডেমো প্যানেল</span>
      </button>

    </div>
  );
}
