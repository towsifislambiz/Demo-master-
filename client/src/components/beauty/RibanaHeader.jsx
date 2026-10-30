import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Heart, Search, Sparkles, MessageCircle, ArrowRight, 
  MapPin, ShieldCheck, Leaf, Menu, X, Check, Flame, Award, 
  Droplets, Gift, Phone, ExternalLink, Compass
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function RibanaHeader({
  searchQuery = '',
  setSearchQuery = () => {},
  activeCategory = 'all',
  setActiveCategory = () => {},
  activeConcern = 'all',
  setActiveConcern = () => {},
  showCategories = true
}) {
  const navigate = useNavigate();
  const { cart = [], wishlist = [], setIsCartOpen, cartSubtotal = 0 } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const categories = [
    { id: 'all', nameBn: 'সব কালেকশন', nameEn: 'All Collection', icon: '✦' },
    { id: 'soaps', nameBn: 'হ্যান্ডমেড সোপ', nameEn: 'Artisan Soaps', icon: '🧼' },
    { id: 'serums', nameBn: 'ব্রাইটনিং সিরাম ও জেল', nameEn: 'Serums & Gels', icon: '💧' },
    { id: 'packs', nameBn: 'হারবাল ফেস প্যাক', nameEn: 'Herbal Packs', icon: '🌿' },
    { id: 'oils', nameBn: 'কোল্ড-প্রেসড ভেষজ তেল', nameEn: 'Pure Herbal Oils', icon: '🥥' },
    { id: 'combos', nameBn: 'ভ্যালু কম্বো ও গিফট সেট', nameEn: 'Gift Sets', icon: '🎁', tag: '২৫% সাশ্রয়' }
  ];

  return (
    <>
      {/* ========================================================
          A. ANNOUNCEMENT BAR (Deep Plum #35252A + Gold Foil Accents)
          ======================================================== */}
      <div className="bg-[#35252A] text-[#FFF8F5] text-[10.5px] sm:text-xs py-2 px-4 select-none border-b border-[#4A343B]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 text-center">
          
          {/* Left: Trust & Certification Ticker */}
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-pulse" />
            <span className="font-medium text-[#FFF8F5]">
              ১০০% অর্গানিক ও হ্যান্ডমেড স্কিনকেয়ার • BSTI ও হালাল সার্টিফায়েড
            </span>
            <span className="hidden lg:inline text-[#EADFDB]/50">|</span>
            <span className="hidden sm:inline text-[#F3D5D0] font-semibold">
              ৳১,৫০০+ অর্ডারে সারা দেশে সম্পূর্ণ ফ্রি ডেলিভারি!
            </span>
          </div>

          {/* Right: Flagship Showrooms & Quick Helpline */}
          <div className="flex items-center space-x-3 text-[#EADFDB] text-[10.5px] sm:text-[11px]">
            <span className="hidden lg:flex items-center gap-1 hover:text-white transition-colors">
              <MapPin className="w-3 h-3 text-[#D9A441]" />
              <span>আউটলেট: গুলশান-১ ও ধানমন্ডি</span>
            </span>
            <span className="hidden lg:inline text-[#EADFDB]/40">•</span>
            <a href="tel:01711223344" className="hover:text-white transition-colors font-mono flex items-center gap-1 font-bold">
              <Phone className="w-3 h-3 text-[#39765A]" />
              <span>01711-223344</span>
            </a>
            <span className="hidden xl:inline text-[#EADFDB]/40">•</span>
            <span className="hidden xl:inline px-2 py-0.5 rounded-full bg-white/10 text-[9.5px] font-mono text-[#F3D5D0]">
              সকাল ৯টা - রাত ১১টা খোলা
            </span>
          </div>

        </div>
      </div>

      {/* ========================================================
          B. LUXURY BOUTIQUE MAIN HEADER (Warm Cream #FFF8F5)
          Distinct from Fashion: Bespoke Jewels, Grand Crest & Action Suite
          ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#FFF8F5]/98 backdrop-blur-md border-b border-[#EADFDB] transition-all shadow-[0_4px_20px_rgba(53,37,42,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-3 lg:gap-6">
          
          {/* ----------------------------------------------------
              Left Wing: Navigation Jewels (Gateway Hub & Skin Consult)
              ---------------------------------------------------- */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-2xl bg-white border border-[#EADFDB] text-[#35252A] active:scale-95 transition-all shadow-2xs"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#9E5C61]" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Platform Master Hub Pill */}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-3 sm:px-3.5 py-1.5 rounded-full bg-[#FDF4F2] hover:bg-[#F3D5D0] text-[#35252A] border border-[#D9A59D] flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer group"
              title="সকল ক্যাটাগরি হাবে ফিরে যান"
            >
              <Compass className="w-3.5 h-3.5 text-[#9E5C61] group-hover:rotate-45 transition-transform" />
              <span className="font-bold text-[11px] sm:text-xs tracking-wide font-sans">মাস্টার হাব</span>
            </button>

            {/* Free Skin Consultation Pill */}
            <a
              href="https://wa.me/8801711223344?text=আসসালামু%20আলাইকুম!%20আমি%20RiBANA%20Organic%20এর%20প্রোডাক্ট%20সম্পর্কে%20জানতে%20চাই।"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex px-3 py-1.5 rounded-full bg-[#39765A]/10 hover:bg-[#39765A]/20 border border-[#39765A]/30 text-[#39765A] font-bold text-xs items-center gap-1.5 transition-all shadow-2xs active:scale-95 group"
              title="হোয়াটসঅ্যাপে এক্সপার্ট পরামর্শ"
            >
              <span className="w-2 h-2 rounded-full bg-[#39765A] animate-pulse" />
              <MessageCircle className="w-3.5 h-3.5 text-[#39765A] group-hover:scale-110 transition-transform" />
              <span>স্কিন কনসালটেশন</span>
            </a>

            {/* Outlets Indicator */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('featured-bestsellers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden xl:flex px-2.5 py-1.5 rounded-full bg-white hover:bg-[#FFF8F5] text-[#75666A] hover:text-[#35252A] border border-[#EADFDB] text-xs font-medium items-center gap-1 transition-all"
              title="গুলশান-১ ও ধানমন্ডি ফ্ল্যাগশিপ শোরুম"
            >
              <MapPin className="w-3 h-3 text-[#D9A441]" />
              <span>আউটলেট</span>
            </button>

          </div>

          {/* ----------------------------------------------------
              Center: RiBANA Majestic Grand Botanical Crest
              ---------------------------------------------------- */}
          <div 
            className="text-center cursor-pointer select-none group flex-1 md:flex-initial" 
            onClick={() => {
              setActiveCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {/* Royal Botanical Laurel Divider */}
            <div className="flex items-center justify-center space-x-2 text-[#9E5C61] leading-none mb-0.5">
              <span className="h-[1px] w-4 sm:w-6 bg-gradient-to-r from-transparent to-[#9E5C61]" />
              <span className="text-[10px] text-[#D9A441]">❖</span>
              <span className="h-[1px] w-4 sm:w-6 bg-gradient-to-l from-transparent to-[#9E5C61]" />
            </div>

            {/* Brand Wordmark */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.25em] uppercase text-[#35252A] font-serif group-hover:text-[#9E5C61] transition-colors leading-none">
              RiBANA
            </h1>

            {/* Botanical Sub-Crest */}
            <p className="text-[7px] sm:text-[8px] md:text-[8.5px] tracking-[0.26em] uppercase text-[#75666A] font-bold mt-1 font-mono leading-none">
              ORGANIC BOTANICALS • EST. 2015
            </p>
          </div>

          {/* ----------------------------------------------------
              Right Wing: Luxury Commerce Suite (Search, Wishlist, Admin, Cart)
              ---------------------------------------------------- */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Interactive Luxury Search Bar */}
            <div className={`hidden md:flex items-center relative transition-all duration-300 ${
              searchFocused ? 'w-56 lg:w-64' : 'w-40 lg:w-52'
            }`}>
              <input
                type="text"
                placeholder="সিরাম, সোপ বা হেয়ার অয়েল..."
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white hover:bg-white/90 border border-[#EADFDB] rounded-full py-1.5 pl-8 pr-3 text-xs text-[#35252A] focus:outline-none focus:border-[#9E5C61] focus:ring-2 focus:ring-[#9E5C61]/20 placeholder:text-[#75666A]/70 transition-all shadow-inner"
              />
              <Search className="w-3.5 h-3.5 text-[#9E5C61] absolute left-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-[#75666A] hover:text-[#35252A]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Pearl Wishlist Button */}
            <button
              type="button"
              onClick={() => navigate('/beauty/wishlist')}
              className="relative p-2 rounded-full bg-white hover:bg-[#F3D5D0]/60 border border-[#EADFDB] text-[#35252A] transition-all flex items-center justify-center shadow-2xs cursor-pointer active:scale-95"
              title="সংরক্ষিত পছন্দতালিকা"
            >
              <Heart className={`w-4 h-4 transition-colors ${wishlistCount > 0 ? 'fill-[#B54747] text-[#B54747]' : 'text-[#75666A]'}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B54747] text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Admin Console Pill */}
            <button
              type="button"
              onClick={() => navigate('/beauty/admin')}
              className="hidden sm:flex p-1.5 px-2.5 rounded-full bg-[#FFF8F5] hover:bg-[#F3D5D0] border border-[#D9A59D] text-[#35252A] transition-all items-center gap-1 shadow-2xs cursor-pointer active:scale-95 text-xs font-mono font-bold"
              title="রিভানা অর্গানিক বিউটি অ্যাডমিন কনসোল"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#9E5C61]" />
              <span className="hidden xl:inline">অ্যাডমিন</span>
            </button>

            {/* Primary Signature Rosewood Shopping Bag Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#9E5C61] hover:bg-[#7E444A] text-white transition-all flex items-center gap-2 shadow-[0_4px_14px_rgba(158,92,97,0.35)] active:scale-95 cursor-pointer border border-[#9E5C61] group"
              title="শপিং ব্যাগ দেখুন"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFF8F5] group-hover:scale-105 transition-transform" />
              <span className="text-xs font-black font-mono text-[#FFF8F5]">
                ৳{cartSubtotal.toLocaleString('en-US')}
              </span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#B54747] text-white font-black text-[9.5px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  {totalCartCount}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* ========================================================
            C. CURATED ATELIER DEPARTMENT NAVIGATION BAR
            Ultra-luxurious, clean, centered, harmonious Rosewood palette
            ======================================================== */}
        {showCategories && (
          <div className="bg-white/95 backdrop-blur-md border-t border-b border-[#EADFDB] px-4 sm:px-6 py-2 sm:py-2.5 shadow-[0_2px_12px_rgba(53,37,42,0.03)]">
            <div className="max-w-7xl mx-auto flex items-center justify-center">
              <nav className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 overflow-x-auto scrollbar-none py-0.5 px-1 max-w-full">
                {categories.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.id);
                        const el = document.getElementById('featured-bestsellers');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-[13px] font-serif transition-all duration-200 cursor-pointer flex items-center gap-2 select-none group ${
                        isSelected
                          ? 'bg-[#9E5C61] text-white font-bold shadow-[0_4px_14px_rgba(158,92,97,0.28)] ring-1 ring-[#9E5C61] scale-[1.02]'
                          : 'text-[#35252A]/85 hover:text-[#9E5C61] hover:bg-[#F3D5D0]/30 font-medium'
                      }`}
                    >
                      <span className={`text-xs transition-transform duration-200 ${
                        isSelected ? 'text-[#F3D5D0]' : 'text-[#9E5C61] group-hover:scale-110'
                      }`}>
                        {cat.icon}
                      </span>
                      <span className="tracking-wide">{cat.nameBn}</span>

                      {cat.tag && (
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-tight uppercase ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#B54747] text-white shadow-2xs'
                        }`}>
                          {cat.tag}
                        </span>
                      )}

                      {isSelected && !cat.tag && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFF8F5] opacity-80" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* ========================================================
            D. MOBILE INTERACTIVE BOUTIQUE DRAWER
            ======================================================== */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFF8F5] border-t border-[#EADFDB] p-4 space-y-4 shadow-xl">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="সিরাম, সোপ বা হেয়ার অয়েল খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#EADFDB] rounded-2xl py-2.5 pl-9 pr-3 text-xs text-[#35252A] focus:outline-none focus:border-[#9E5C61]"
              />
              <Search className="w-4 h-4 text-[#9E5C61] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Mobile Categories Navigation */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#75666A] font-bold px-1">
                কালেকশন ক্যাটাগরি
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {categories.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setMobileMenuOpen(false);
                        const el = document.getElementById('featured-bestsellers');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`p-2 rounded-xl text-left text-xs font-serif flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'bg-[#9E5C61] text-white font-bold shadow-xs'
                          : 'bg-white border border-[#EADFDB] text-[#35252A] hover:border-[#9E5C61]'
                      }`}
                    >
                      <span className="text-xs">{cat.icon}</span>
                      <span className="truncate">{cat.nameBn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <a
              href="https://wa.me/8801711223344?text=আসসালামু%20আলাইকুম!%20আমি%20RiBANA%20Organic%20এর%20প্রোডাক্ট%20সম্পর্কে%20জানতে%20চাই।"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-2xl bg-[#39765A]/15 border border-[#39765A]/30 text-[#39765A] font-bold text-xs flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#39765A] animate-pulse" />
                <span>হোয়াটসঅ্যাপে ফ্রি স্কিন পরামর্শ নিন</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <button
                type="button"
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white border border-[#EADFDB] text-[#35252A] font-bold text-center flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Compass className="w-3.5 h-3.5 text-[#9E5C61]" />
                <span>মাস্টার হাব</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate('/beauty/admin');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white border border-[#EADFDB] text-[#35252A] font-bold text-center flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#9E5C61]" />
                <span>বিউটি অ্যাডমিন</span>
              </button>
            </div>
          </div>
        )}

      </header>
    </>
  );
}
