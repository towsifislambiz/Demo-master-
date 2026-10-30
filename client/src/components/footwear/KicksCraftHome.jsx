import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Flame, Zap, Sparkles, ArrowRight, ShieldCheck, 
  ChevronRight, Star, TrendingUp, CheckCircle2, 
  Layers, Package, PhoneCall, Mail, ArrowUpRight, Award
} from 'lucide-react';
import KicksCraftHeader from './KicksCraftHeader';
import KicksCraftHeroSlider from './KicksCraftHeroSlider';
import KicksCraftProductCard from './KicksCraftProductCard';
import KicksCraftFooter from './KicksCraftFooter';
import KicksCraftCartDrawer from './KicksCraftCartDrawer';
import { 
  FOOTWEAR_PRODUCTS, FOOTWEAR_BRANDS, FOOTWEAR_REVIEWS, FOOTWEAR_BRAND 
} from '../../data/footwearData';

// 5 Iconic Brand Showcase Config with real shoe hero photos & premium aesthetic
const BRAND_SHOWCASE = [
  {
    id: 'nike',
    name: 'Nike / Jordan',
    tag: 'BASKETBALL & HYPED',
    tagBn: 'বাস্কেটবল ও হাইপ ড্রপস',
    motto: 'আইকনিক শিকাগো রেট্রো ও জুম স্পিড',
    image: '/footwear-images/Retro_basketball_sneaker_studio___8667b319.jpg',
    modelsCount: 6,
    startingPrice: 4490,
    accentGlow: 'from-red-600/30 via-orange-500/15 to-transparent',
    borderHover: 'hover:border-red-500/70',
    tagColor: 'text-red-400 bg-red-500/15 border-red-500/30',
    watermark: 'NIKE'
  },
  {
    id: 'adidas',
    name: 'Adidas Originals',
    tag: 'SAMBA & BOOST',
    tagBn: 'সাম্বা ও বুস্ট কালেকশন',
    motto: 'ক্লাসিক থ্রি-স্ট্রাইপস ও ট্রেইল রানার',
    image: '/footwear-images/White_leather_sneaker_product_photo_5bbc90fa.jpg',
    modelsCount: 5,
    startingPrice: 3890,
    accentGlow: 'from-blue-600/30 via-cyan-500/15 to-transparent',
    borderHover: 'hover:border-cyan-500/70',
    tagColor: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30',
    watermark: 'ADIDAS'
  },
  {
    id: 'newbalance',
    name: 'New Balance',
    tag: '990v6 & 550 RETRO',
    tagBn: 'মেইড ইন ইউএসএ লাইফস্টাইল',
    motto: 'অর্থোপেডিক কমফোর্ট ও ভিন্টেজ লুক',
    image: '/footwear-images/Heather-grey_everyday_lifestyle___92d54958.jpg',
    modelsCount: 5,
    startingPrice: 4390,
    accentGlow: 'from-emerald-600/30 via-teal-500/15 to-transparent',
    borderHover: 'hover:border-emerald-500/70',
    tagColor: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
    watermark: 'NB 990'
  },
  {
    id: 'puma',
    name: 'Puma Motorsport',
    tag: 'FERRARI & NITRO',
    tagBn: 'মোটারস্পোর্ট ও নাইট্রো এলিট',
    motto: 'ফেরারি অফিসিয়াল রেস কার্ট শু',
    image: '/footwear-images/Red_motorsport_driving_shoe_1218bb70.jpg',
    modelsCount: 4,
    startingPrice: 4290,
    accentGlow: 'from-red-600/35 via-amber-500/15 to-transparent',
    borderHover: 'hover:border-orange-500/70',
    tagColor: 'text-orange-400 bg-orange-500/15 border-orange-500/30',
    watermark: 'PUMA'
  },
  {
    id: 'apex',
    name: 'Apex Heritage',
    tag: 'ROYAL LEATHER OXFORD',
    tagBn: 'হ্যান্ডমেড লাক্সারি লেদার',
    motto: 'ইতালিয়ান ডিজাইনের রয়েল অক্সফোর্ড',
    image: '/footwear-images/Handcrafted_Italian_leather_Oxfo__2f50679e.jpg',
    modelsCount: 4,
    startingPrice: 4990,
    accentGlow: 'from-amber-600/30 via-yellow-600/15 to-transparent',
    borderHover: 'hover:border-amber-500/70',
    tagColor: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
    watermark: 'APEX'
  }
];

export default function KicksCraftHome() {
  const navigate = useNavigate();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);

  // Filtered by selected category pill from Header if active
  const displayedProducts = activeCategory === 'all'
    ? FOOTWEAR_PRODUCTS
    : FOOTWEAR_PRODUCTS.filter(p => p.category === activeCategory);

  // Trending & Hot Drops (Top 4)
  const trendingDrops = FOOTWEAR_PRODUCTS.filter(p => p.isFeatured || p.isTrending).slice(0, 4);

  // New Arrivals (Initially 8, expandable with Load More)
  const newArrivals = displayedProducts.slice(0, visibleCount);

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    setVisibleCount(8);
    if (catId !== 'all') {
      const el = document.getElementById('catalog-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-slate-800">
      
      {/* 1. KicksCraft Modern Boutique Header */}
      <KicksCraftHeader 
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) navigate(`/footwear/shop?search=${encodeURIComponent(q)}`);
        }}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* 2. High-Impact Dynamic Banner Slider (UPGRADED) */}
      <KicksCraftHeroSlider />

      {/* 3. High-Energy Trending Drops Section */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-3 sm:px-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF4800] text-xs font-black uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 fill-[#FF4800]" />
              <span>হট ড্রপস ২০২৬</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              ট্রেন্ডিং স্নিকার ড্রপস ও হাইপ কালেকশন
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              স্নিকারহেডদের সর্বাধিক চাহিদাসম্পন্ন সীমিত এডিশন ও ফ্ল্যাগশিপ মডেল
            </p>
          </div>

          <Link
            to="/footwear/shop"
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#0B0F17] hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>সবগুলো দেখুন</span>
            <ChevronRight className="w-4 h-4 text-orange-400" />
          </Link>
        </div>

        {/* 2 Columns on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {trendingDrops.map((product) => (
            <KicksCraftProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. UPGRADED & SPECTACULAR: Authentic Brand Boutique Showcase Cards */}
      <section className="py-12 sm:py-16 bg-[#070A0F] text-white relative overflow-hidden border-y border-orange-500/20">
        
        {/* Subtle Background Glow Orbs */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
          
          {/* Header Title with Athletic Luxury Styling */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>OFFICIAL HERITAGE BRAND SHOWROOM</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              বিশ্বখ্যাত ৫টি ব্র্যান্ডের অফিশিয়াল কালেকশন
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
              সরাসরি অফিশিয়াল সোর্স থেকে সংগৃহীত শতভাগ জেনুইন স্নিকার্স, স্পোর্টস ও প্রিমিয়াম ইতালিয়ান লেদার শু কালেকশন।
            </p>
          </div>

          {/* 5 Rich, 3D Floating Brand Cards (2-cols on Mobile with 5th spanning) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
            {BRAND_SHOWCASE.map((brand, idx) => {
              const isLast = idx === BRAND_SHOWCASE.length - 1;
              return (
                <Link
                  key={brand.id}
                  to={`/footwear/shop?brand=${brand.id}`}
                  className={`group relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-900/95 to-[#0B0F17] border border-slate-800 ${brand.borderHover} p-3 sm:p-5 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                    isLast ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  {/* Dynamic Brand Color Aura */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${brand.accentGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  {/* Background Watermark Initials */}
                  <span className="absolute -bottom-4 -right-3 text-4xl sm:text-6xl font-black text-slate-800/25 pointer-events-none tracking-tighter select-none font-mono group-hover:text-slate-800/40 transition-colors">
                    {brand.watermark}
                  </span>

                  {/* Top Part: Category Pill & Model Count */}
                  <div className="relative z-10 space-y-1.5 sm:space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-black border uppercase tracking-wider ${brand.tagColor}`}>
                        {brand.tag}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 bg-slate-800/80 px-1.5 sm:px-2 py-0.5 rounded-full border border-slate-700/60">
                        {brand.modelsCount}টি
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-[#FF4800] transition-colors leading-tight">
                        {brand.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 truncate mt-0.5 font-medium">
                        {brand.motto}
                      </p>
                    </div>
                  </div>

                  {/* Center Part: 3D Perspective Floating Shoe Image */}
                  <div className="relative z-10 my-3 sm:my-5 py-1 flex items-center justify-center">
                    
                    {/* Subtle Circular Radial Glow behind shoe */}
                    <div className="absolute w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-white/5 blur-xl group-hover:bg-[#FF4800]/20 transition-colors duration-500" />

                    {/* The Floating Sneaker Image */}
                    <div className="w-32 sm:w-44 h-24 sm:h-32 flex items-center justify-center">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        loading="lazy"
                        decoding="async"
                        className="max-w-full max-h-full object-contain filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.8)] group-hover:scale-115 group-hover:-rotate-3 group-hover:-translate-y-2 transition-all duration-500 ease-out"
                      />
                    </div>
                  </div>

                  {/* Bottom Part: Starting Price & Explore Arrow CTA */}
                  <div className="relative z-10 pt-2.5 sm:pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase block font-bold">শুরু হচ্ছে</span>
                      <span className="font-mono font-black text-xs sm:text-sm text-white group-hover:text-orange-400 transition-colors">
                        ৳{brand.startingPrice.toLocaleString('en-US')}
                      </span>
                    </div>

                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-slate-800 group-hover:bg-[#FF4800] text-slate-300 group-hover:text-white flex items-center justify-center shadow-md transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Main Catalog New Arrivals Grid (2 Columns on Mobile!) */}
      <section id="catalog-grid" className="py-10 sm:py-14 max-w-7xl mx-auto px-3 sm:px-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#FF4800]" />
              <span>নতুন সংগ্রহ ২০২৬</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              সর্বশেষ সংযোজিত স্নিকার্স ও লেদার শু
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ইউরোপ ও ইউএসএ স্ট্যান্ডার্ড সাইজিং ও অথেনটিক ম্যাটেরিয়ালস
            </p>
          </div>

          <Link
            to="/footwear/shop"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF4800] to-[#FF6B00] text-white font-black text-xs sm:text-sm shadow-md shadow-orange-500/20 active:scale-95 transition-all self-start sm:self-auto flex items-center gap-2"
          >
            <span>সম্পূর্ণ শপ ব্রাউজ করুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2 COLUMNS ON MOBILE (grid-cols-2) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {newArrivals.map((product) => (
            <KicksCraftProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More & Go To Dedicated Shop Page CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {visibleCount < displayedProducts.length && (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(prev + 4, displayedProducts.length))}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-orange-50 text-slate-900 hover:text-[#FF4800] border-2 border-slate-200 hover:border-[#FF4800] font-black text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-[#FF4800]" />
              <span>আরও ৪টি স্নিকার্স লোড করুন ({visibleCount}/{displayedProducts.length})</span>
            </button>
          )}

          <Link
            to="/footwear/shop"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#0B0F17] hover:bg-black text-white font-black text-xs sm:text-sm shadow-xl hover:shadow-orange-500/10 active:scale-95 transition-all w-full sm:w-auto group"
          >
            <span>সম্পূর্ণ শপ পেজে সব ২৪টি দেখুন</span>
            <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 6. Customer Reviews & Sneaker Unboxing Stories */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-black uppercase text-[#FF4800] tracking-wider block mb-1">
              VERIFIED BUYERS FEEDBACK
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
              স্নিকারহেড ও কাস্টমারদের বাস্তব অভিজ্ঞতা
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              কিকসক্রাফট থেকে সংগৃহীত অরিজিনাল স্নিকার্স নিয়ে গ্রাহকদের মূল্যবান মতামত
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FOOTWEAR_REVIEWS.map((rev) => (
              <div 
                key={rev.id} 
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-3">
                    "{rev.comment}"
                  </p>
                  
                  <span className="text-[11px] font-bold text-[#FF4800] block truncate">
                    ক্রয়কৃত জুতো: {rev.product}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900">{rev.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VIP Sneaker Drop Newsletter Banner */}
      <section className="py-12 bg-gradient-to-br from-[#0B0F17] via-[#161B26] to-[#0B0F17] text-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-black border border-orange-500/30">
            <Zap className="w-3.5 h-3.5" />
            <span>VIP SNEAKER DROP ALERTS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            পরবর্তী হাইপ ড্রপের সবার আগে নোটিফিকেশন পান!
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            লিমিটেড এডিশন স্নিকার্স রিলিজের সাথে সাথে এসএমএস ও ইমেইলে অ্যালার্ট পেতে আজই সাবস্ক্রাইব করুন।
          </p>

          <form 
            onSubmit={(e) => { e.preventDefault(); alert('ধন্যবাদ! আপনি সফলভাবে ভিআইপি ড্রপ এলার্টে যোগ দিয়েছেন।'); }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              placeholder="আপনার ইমেইল বা ফোন নম্বর দিন..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-xs sm:text-sm outline-none focus:border-[#FF4800]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF4800] to-[#FF6B00] hover:from-[#E03A00] hover:to-[#FF4800] text-white font-black text-xs sm:text-sm shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              সাবস্ক্রাইব
            </button>
          </form>
        </div>
      </section>

      {/* 8. Footer */}
      <KicksCraftFooter />

      {/* 9. Slide-Over Cart Drawer */}
      <KicksCraftCartDrawer 
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </div>
  );
}
