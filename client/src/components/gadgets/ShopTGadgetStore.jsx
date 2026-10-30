import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  Sparkles, Zap, ShieldCheck, Truck, Headphones, 
  ArrowRight, ArrowLeft, Clock, Star, Flame, ChevronRight, 
  CheckCircle2, Laptop, Smartphone, Watch, BatteryCharging, Gamepad2,
  Send, PhoneCall, Award, RotateCcw, Lock
} from 'lucide-react';
import { 
  SHOPT_GADGETS, 
  GADGET_CATEGORIES, 
  TRUST_PILLARS 
} from '../../data/shoptGadgetData';
import ShopTGadgetProductCard from './ShopTGadgetProductCard';
import ShopTGadgetHeader from './ShopTGadgetHeader';
import ShopTGadgetCartDrawer from './ShopTGadgetCartDrawer';

// Flash sale countdown timer component
function FlashCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-white">
      <div className="bg-[#030712] border border-cyan-500/30 px-2.5 py-1 rounded-xl text-center min-w-[38px] shadow-inner">
        <span className="text-sm font-black text-cyan-400 font-mono">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="block text-[8px] text-slate-400 -mt-0.5 uppercase font-bold">ঘণ্টা</span>
      </div>
      <span className="font-bold text-cyan-400">:</span>
      <div className="bg-[#030712] border border-cyan-500/30 px-2.5 py-1 rounded-xl text-center min-w-[38px] shadow-inner">
        <span className="text-sm font-black text-cyan-400 font-mono">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="block text-[8px] text-slate-400 -mt-0.5 uppercase font-bold">মিনিট</span>
      </div>
      <span className="font-bold text-cyan-400">:</span>
      <div className="bg-[#030712] border border-cyan-500/30 px-2.5 py-1 rounded-xl text-center min-w-[38px] shadow-inner">
        <span className="text-sm font-black text-cyan-400 font-mono">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="block text-[8px] text-slate-400 -mt-0.5 uppercase font-bold">সেকেন্ড</span>
      </div>
    </div>
  );
}

export default function ShopTGadgetStore({ onBackToGateway }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const [cartOpen, setCartOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const { addToCart, gadgetProducts = [] } = useStore();
  const navigate = useNavigate();

  const activeCatalog = gadgetProducts.length > 0 ? gadgetProducts : SHOPT_GADGETS;

  // Filter products by category & search
  const filteredProducts = useMemo(() => {
    return activeCatalog.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = !searchQuery || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.titleEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCatalog, activeCategory, searchQuery]);

  useEffect(() => {
    setVisibleCount(8);
  }, [activeCategory, searchQuery]);

  // Featured items
  const flagshipShowcase = activeCatalog[5] || activeCatalog[0] || SHOPT_GADGETS[5]; // Ultra Titanium Rugged Smartwatch
  const flashSaleItems = useMemo(() => [activeCatalog[0] || SHOPT_GADGETS[0], activeCatalog[1] || SHOPT_GADGETS[1]], [activeCatalog]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 3000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* Ambient background spatial glows */}
      <div className="fixed top-0 left-1/4 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed top-1/3 right-10 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* 1. Sleek Modern Header */}
      <ShopTGadgetHeader
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setCartOpen(true)}
        onBackToGateway={onBackToGateway}
      />

      {/* 2. Redesigned Ultra-Professional Flagship Keynote Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Main Stage (8 Cols): Keynote Showcase */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#0A1224] via-[#070D1B] to-[#03060E] rounded-3xl p-6 sm:p-8 lg:p-9 border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col justify-between group">
            
            {/* Tech grid texture overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/25 transition-colors" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Specs, Headline, CTA (7 Cols) */}
              <div className="md:col-span-7 space-y-3.5">
                {/* Keynote Pill */}
                <div className="inline-flex items-center gap-2 bg-[#0E1B38] border border-cyan-400/40 text-cyan-300 px-3.5 py-1 rounded-full text-xs font-black shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>2026 NEXT-GEN FLAGSHIP SHOWCASE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-1" />
                </div>

                {/* Headline */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                  ভবিষ্যতের <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-white">আল্ট্রা টাইটানিয়াম</span> প্রযুক্তি, এখন আপনার কবজিতে
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                  ২.০২ ইঞ্চি সুপার অ্যামোলেড ডিসপ্লে, স্যাফায়ার ক্রিস্টাল গ্লাস ও ১ বছরের অফিশিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি। চেক করে ক্যাশ অন ডেলিভারিতে নেওয়ার নিশ্চয়তা।
                </p>

                {/* Precision Specs Matrix Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-[#0E172E] border border-slate-700/80 text-[11px] font-bold text-slate-300">
                    💎 49mm Titanium Case
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#0E172E] border border-slate-700/80 text-[11px] font-bold text-slate-300">
                    ⚡ 2.02" Super AMOLED
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#0E172E] border border-slate-700/80 text-[11px] font-bold text-slate-300">
                    🔋 7-Day Ultra Battery
                  </span>
                </div>

                {/* Price & Action Hub */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <div className="flex items-baseline gap-2 bg-[#0C152B] px-3.5 py-2 rounded-2xl border border-cyan-500/30 shadow-inner">
                    <span className="text-xl sm:text-2xl font-black text-white font-mono">
                      ৳{flagshipShowcase.price.toLocaleString('bn-BD')}
                    </span>
                    <span className="text-xs text-slate-500 line-through font-bold">
                      ৳{flagshipShowcase.oldPrice.toLocaleString('bn-BD')}
                    </span>
                    <span className="text-[10px] font-black text-cyan-400 bg-cyan-950/90 px-2 py-0.5 rounded-full border border-cyan-700">
                      {flagshipShowcase.discount}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(flagshipShowcase, 1);
                      setCartOpen(true);
                    }}
                    className="bg-white hover:bg-slate-100 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.35)] hover:shadow-[0_0_35px_rgba(255,255,255,0.55)] transition-all cursor-pointer active:scale-95 uppercase tracking-wider"
                  >
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>সরাসরি অর্ডার করুন</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>

                  <Link
                    to={`/gadgets/product/${flagshipShowcase.id}`}
                    className="px-3.5 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all"
                  >
                    স্পেক্স দেখুন
                  </Link>
                </div>
              </div>

              {/* Right Column: 3D Showcase Floating Pedestal (5 Cols) */}
              <div className="md:col-span-5 h-64 sm:h-72 flex items-center justify-center relative">
                {/* Radial spotlight behind watch */}
                <div className="absolute inset-0 bg-radial from-cyan-500/25 via-transparent to-transparent blur-2xl pointer-events-none" />
                <img
                  src={flagshipShowcase.image}
                  alt={flagshipShowcase.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-700 ease-out relative z-10"
                />

                {/* Floating Pin 1 */}
                <div className="absolute top-2 right-2 z-20 bg-slate-900/90 backdrop-blur-md border border-cyan-400/40 text-[10px] font-bold text-cyan-300 px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>🧭 Dual GPS</span>
                </div>
                <div className="absolute bottom-2 left-2 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[10px] font-bold text-slate-300 px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                  <span>🩸 SpO2 Monitor</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: High-End Live Deal & Trust Cards (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 justify-between">
            
            {/* Card 1: Flash Deals Vault */}
            <div className="bg-gradient-to-br from-[#0E172E] to-[#070D1B] rounded-3xl p-5 border border-cyan-500/20 shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                    <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">ফ্ল্যাশ ডিলস ভল্ট</h3>
                    <p className="text-[10px] text-slate-400">সীমিত সময়ের স্টক অফার</p>
                  </div>
                </div>

                <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-800">
                  ২৮% ছাড়
                </span>
              </div>

              {/* Countdown ticker */}
              <div className="bg-[#050A14] p-3 rounded-2xl border border-slate-800 mb-3 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">অফার শেষ হতে:</span>
                <FlashCountdown />
              </div>

              {/* Mini Spotlight Products */}
              <div className="space-y-2">
                {flashSaleItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 rounded-xl bg-[#081020] hover:bg-[#0D1830] border border-slate-800/80 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain rounded-lg bg-white p-1 border border-slate-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-xs font-black text-cyan-400">৳{item.price.toLocaleString('bn-BD')}</span>
                        <span className="text-[10px] text-slate-500 line-through">৳{item.oldPrice.toLocaleString('bn-BD')}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(item, 1)}
                      className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 transition-all cursor-pointer"
                      title="কার্টে যোগ করুন"
                    >
                      <Zap className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: 1-Year Guarantee & COD Trust Card */}
            <div className="bg-gradient-to-br from-[#0B1528] to-[#050A14] rounded-3xl p-5 border border-cyan-500/20 shadow-xl flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white">১০০% গ্যারান্টিড প্রিমিয়াম গ্যাজেটস</h3>
                  <p className="text-[10px] text-slate-400">কোনো নকল পণ্য নেই, সম্পূর্ণ অফিশিয়াল</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 bg-[#081020] p-2.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-medium">১ বছরের সরাসরি রিপ্লেসমেন্ট ওয়ারেন্টি</span>
                </div>
                <div className="flex items-center gap-2 bg-[#081020] p-2.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-[11px] font-medium">পণ্য হাতে চেক করে টাকা দেওয়ার সুবিধা (COD)</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Minimalist Trust Pillar Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 w-full relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon === 'ShieldCheck' ? ShieldCheck :
                         pillar.icon === 'Truck' ? Truck :
                         pillar.icon === 'Zap' ? Zap : Headphones;
            return (
              <div 
                key={pillar.id || pillar.title || idx}
                className="bg-[#091122]/90 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/40 p-3.5 rounded-2xl flex items-center gap-3 transition-colors shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-white truncate">{pillar.title}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Products Showcase Grid (Using High-End White Porcelain Cards as requested in Image 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full relative z-10 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span>{activeCategory === 'all' ? 'সব গ্যাজেটস কালেকশন' : GADGET_CATEGORIES.find(c => c.id === activeCategory)?.nameBn}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              সর্বাধুনিক প্রযুক্তির ২৬টি প্রিমিয়াম ডিভাইস ও আনুষঙ্গিক • ১ বছরের ওয়ারেন্টি
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>মোট গ্যাজেট: <strong className="text-cyan-400">{filteredProducts.length}</strong> টি</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[#081020] rounded-3xl border border-slate-800">
            <p className="text-base font-bold text-slate-300">কোনো গ্যাজেট পাওয়া যায়নি</p>
            <p className="text-xs text-slate-500">অনুগ্রহ করে অন্য কোনো কি-ওয়ার্ড দিয়ে সার্চ করুন অথবা ফিল্টার রিসেট করুন।</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              সব গ্যাজেট দেখুন
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <ShopTGadgetProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 4, filteredProducts.length))}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 font-black text-xs sm:text-sm shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>আরও ৪টি গ্যাজেট লোড করুন ({visibleCount}/{filteredProducts.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVisibleCount(filteredProducts.length)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
                >
                  <span>সব {filteredProducts.length}টি গ্যাজেট একসাথে দেখুন</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* 5. Executive Spatial Tech Flagship Mega-Footer */}
      <footer className="bg-[#02050E] text-slate-400 border-t border-slate-800/90 pt-12 pb-8 px-4 sm:px-6 relative z-10 text-xs font-sans mt-auto">
        
        {/* VIP Member Access & Newsletter Bar */}
        <div className="max-w-7xl mx-auto mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0C152B] via-[#091122] to-[#060A14] border border-cyan-500/30 shadow-[0_10px_35px_rgba(6,182,212,0.1)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left max-w-lg">
            <span className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              ShopT VIP গ্যাজেট ক্লাব
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white">
              এক্সক্লুসিভ অফার ও নতুন লঞ্চের খবর পান সবার আগে
            </h3>
            <p className="text-xs text-slate-400">
              আমাদের ভিআইপি ক্লাবে সাবস্ক্রাইব করে প্রথম অর্ডারে ১০% ডিসকাউন্ট উপভোগ করুন।
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex-1 max-w-md">
            {newsletterSuccess ? (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-center text-emerald-300 font-bold text-xs">
                🎉 ধন্যবাদ! আপনি সফলভাবে ভিআইপি ক্লাবে যুক্ত হয়েছেন।
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="আপনার মোবাইল নম্বর বা ইমেইল লিখুন..."
                  className="flex-1 bg-[#050A14] text-xs px-4 py-3 rounded-2xl border border-slate-700 focus:border-cyan-400 focus:outline-none text-slate-100 placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>জয়েন করুন</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* 4-Column Mega Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand Info & Bio */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-slate-950 font-black shadow-md">
                <Sparkles className="w-4 h-4 fill-slate-950" />
              </div>
              <span className="text-base font-black text-white tracking-tight">ShopT PRO GADGETS</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              বাংলাদেশের আধুনিক ফ্ল্যাগশিপ গ্যাজেট হাব। বিশ্ববিখ্যাত ব্র্যান্ডের ১০০% জেনুইন ডিভাইস, অফিশিয়াল ১ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি ও দ্রুততম ডেলিভারি সেবা।
            </p>
            <div className="space-y-1 text-xs">
              <div className="text-cyan-400 font-black flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" />
                হটলাইন: ০৯৬১৭-৩৫৬৮১৮ (সকাল ১০টা - রাত ১০টা)
              </div>
              <div className="text-slate-400 text-[11px]">
                শোরুম: লেভেল ৪, পান্থপথ, বসুন্ধরা সিটি এরিয়া, ঢাকা-১২০৫।
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
              গ্যাজেট কালেকশন
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => { setActiveCategory('earbuds'); window.scrollTo({ top: 500, behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center justify-between w-full pr-4">
                  <span>TWS ইয়ারবাডস ও হেডফোন</span>
                  <span className="text-[10px] text-slate-600 font-mono">5</span>
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('smartwatches'); window.scrollTo({ top: 500, behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center justify-between w-full pr-4">
                  <span>স্মার্টওয়াচ ও হেলথ ট্র্যাকার</span>
                  <span className="text-[10px] text-slate-600 font-mono">5</span>
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('chargers'); window.scrollTo({ top: 500, behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center justify-between w-full pr-4">
                  <span>GaN ফাস্ট চার্জার ও পাওয়ার</span>
                  <span className="text-[10px] text-slate-600 font-mono">5</span>
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('smartphones'); window.scrollTo({ top: 500, behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center justify-between w-full pr-4">
                  <span>ফ্ল্যাগশিপ স্মার্টফোন</span>
                  <span className="text-[10px] text-slate-600 font-mono">4</span>
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('laptops'); window.scrollTo({ top: 500, behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center justify-between w-full pr-4">
                  <span>ওলেড ও গেমিং ল্যাপটপ</span>
                  <span className="text-[10px] text-slate-600 font-mono">4</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
              গ্রাহক সেবা ও নীতি
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>১ বছরের অফিসিয়াল রিপ্লেসমেন্ট পলিসি</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>৭ দিনের নো-কোশ্চেন রিটার্ন পলিসি</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Truck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>ঢাকা মেট্রোয় ২৪ ঘণ্টায় হোম ডেলিভারি</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>সারাদেশে ক্যাশ অন ডেলিভারি নিয়মাবলী</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>প্রোডাক্ট ভেরিফিকেশন ও নিরাপত্তা</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Payment Methods & Security */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
              পেমেন্ট মেথডস ও নিরাপত্তা
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              ক্যাশ অন ডেলিভারি ছাড়াও বিকাশ, নগদ ও যেকোনো ডেবিট/ক্রেডিট কার্ডের মাধ্যমে নিরাপদে মূল্য পরিশোধ করুন।
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-[#091122] px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-rose-400 font-bold">bKash</span>
              <span className="bg-[#091122] px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-amber-400 font-bold">Nagad</span>
              <span className="bg-[#091122] px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-purple-400 font-bold">Rocket</span>
              <span className="bg-[#091122] px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-blue-400 font-bold">Visa / Master</span>
              <span className="bg-[#091122] px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-emerald-400 font-bold">Cash On Delivery</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#091122] border border-slate-800 flex items-center gap-2 text-[10px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>256-Bit SSL এনক্রিপ্টেড পেমেন্ট গেটওয়ে</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto border-t border-slate-800/80 pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <span>© ২০২৬ ShopT Pro Gadgets | Spatial Tech Edition. All rights reserved.</span>
          <button
            onClick={onBackToGateway}
            className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer flex items-center gap-1"
          >
            <span>← মাস্টার ডেমো গেটওয়েতে ফিরে যান</span>
          </button>
        </div>
      </footer>

      {/* Unique Spatial Cart Drawer */}
      <ShopTGadgetCartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      {/* 6. Persistent Floating Back to Demo Hub Quick Pill */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
        <button
          type="button"
          onClick={onBackToGateway || (() => navigate('/'))}
          className="group flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#070D1D]/95 hover:bg-[#0E172E] text-slate-200 hover:text-white border border-cyan-500/50 hover:border-cyan-400 shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_22px_rgba(6,182,212,0.45)] backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer text-xs font-bold ring-1 ring-cyan-500/20"
          title="সব ডেমো ক্যাটাগরি দেখুন (Master Hub)"
        >
          <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center text-slate-950">
            <ArrowLeft className="w-3 h-3 text-slate-950 stroke-[3]" />
          </div>
          <span className="tracking-wide">ডেমো ক্যাটাগরি</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-mono hidden xs:inline">Hub</span>
        </button>
      </div>
    </div>
  );
}
