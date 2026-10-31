import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  Search, ShoppingBag, Heart, Zap, 
  ArrowLeft, Menu, X, Sparkles, SlidersHorizontal,
  PhoneCall, ShieldCheck, ChevronRight
} from 'lucide-react';
import { GADGET_CATEGORIES } from '../../data/shoptGadgetData';

export default function ShopTGadgetHeader({ 
  activeCategory, 
  onSelectCategory, 
  searchQuery, 
  onSearchChange,
  onOpenCart,
  onBackToGateway 
}) {
  const { cart, wishlist = [], getNicheCart, getNicheWishlist, getProductNiche } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const gadgetItems = (getNicheCart ? getNicheCart('gadgets') : (Array.isArray(cart) ? cart : []))
    .filter((item) => (getProductNiche ? getProductNiche(item) : (item.id || '').startsWith('shopt-') || (item.id || '').startsWith('addon-')) === 'gadgets');
  const gadgetWishlist = (getNicheWishlist ? getNicheWishlist('gadgets') : (Array.isArray(wishlist) ? wishlist : []))
    .filter((item) => (getProductNiche ? getProductNiche(item) : (item.id || '').startsWith('shopt-') || (item.id || '').startsWith('addon-')) === 'gadgets');

  const totalCartCount = gadgetItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalCartPrice = gadgetItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  const wishlistCount = gadgetWishlist.length;

  const handleBack = onBackToGateway || (() => navigate('/'));

  return (
    <header className="sticky top-0 z-50 w-full font-sans transition-all">
      {/* 1. Ultra-Slim Ambient Announcement Ticker (Pure Minimalist) */}
      <div className="bg-[#030712] text-slate-300 text-[11px] py-1 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-cyan-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি</span>
            </span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">সারা দেশে ৪৮ ঘণ্টায় ক্যাশ অন ডেলিভারি</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-slate-300">
            <a href="tel:09617356818" className="hover:text-white transition-colors font-medium hidden sm:flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-cyan-400" />
              <span>০৯৬১৭-৩৫৬৮১৮</span>
            </a>
            <Link
              to="/gadgets/admin"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-bold flex items-center gap-1"
              title="অ্যাডমিন ড্যাশবোর্ড"
            >
              <Zap className="w-3 h-3" />
              <span>অ্যাডমিন</span>
            </Link>
            <button
              type="button"
              onClick={handleBack}
              className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 hover:text-white border border-cyan-400/40 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1"
              title="সব ডেমো ক্যাটাগরি পেইজে ফিরে যান"
            >
              <ArrowLeft className="w-3 h-3 text-cyan-400" />
              <span>ডেমো ক্যাটাগরি</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Sleek Floating Island Navbar (Frosted Midnight Navy + Liquid Silver) */}
      <div className="bg-[#070D1D]/90 backdrop-blur-xl border-b border-slate-800/90 py-3 px-4 sm:px-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Brand Monogram */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <Link to="/gadgets" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)] group-hover:scale-105 transition-transform border border-cyan-400/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-white">
                    Shop<span className="text-cyan-400">T</span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-800/90 text-cyan-300 border border-cyan-500/30">
                    PRO
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase">
                  Spatial Tech Edition
                </span>
              </div>
            </Link>

            {/* Prominent Desktop Back to Demo Category Button */}
            <button
              type="button"
              onClick={handleBack}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-400/40 hover:border-cyan-300 text-xs font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)] active:scale-95 cursor-pointer ml-1"
              title="সব ডেমো ক্যাটাগরি দেখুন (Master Gateway)"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>ডেমো ক্যাটাগরি</span>
            </button>
          </div>

          {/* Center: Desktop Minimalist Search Capsule */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="গ্যাজেট, মডেল বা ব্র্যান্ড সার্চ করুন..."
                className="w-full bg-[#0E172E]/90 text-slate-100 placeholder-slate-400 text-xs pl-10 pr-4 py-2.5 rounded-full border border-slate-700/80 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right: Actions (Wishlist & Cart Pill) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2.5 rounded-full bg-[#0E172E] border border-slate-800 text-slate-300 hover:text-white"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Capsule (Designer Pair) */}
            <Link
              to="/gadgets/wishlist"
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-gradient-to-r from-[#0F172A]/90 to-[#0A1124]/90 hover:from-[#131F38] hover:to-[#0E172E] border border-slate-700/80 hover:border-rose-500/40 flex items-center gap-2 text-slate-200 hover:text-white transition-all duration-300 cursor-pointer shadow-sm group"
              title="পছন্দের তালিকা"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-600/10 border border-rose-500/30 flex items-center justify-center relative group-hover:scale-105 group-hover:border-rose-400 transition-all shadow-inner">
                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-rose-400 fill-rose-400' : 'text-slate-400 group-hover:text-rose-300'}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black h-[18px] min-w-[18px] px-1 rounded-full flex items-center justify-center shadow-md border border-white/50">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:flex flex-col text-left leading-none">
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-rose-300 uppercase tracking-wider">পছন্দ</span>
                <span className="text-xs font-bold text-slate-200 mt-0.5">{wishlistCount > 0 ? `${wishlistCount}টি গ্যাজেট` : 'তালিকা'}</span>
              </div>
            </Link>

            {/* Ultra-Modern Quick Cart Capsule (Spatial Edition) */}
            <button
              type="button"
              onClick={onOpenCart}
              className="group relative flex items-center gap-3 pl-2 pr-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-[#0E172E] via-[#112042] to-[#0B1327] hover:from-[#142347] hover:to-[#101b36] border border-cyan-500/40 hover:border-cyan-400 shadow-[0_4px_20px_rgba(6,182,212,0.18)] hover:shadow-[0_0_28px_rgba(6,182,212,0.4)] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              {/* Left: High-Tech Icon Pedestal */}
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/25 via-blue-600/20 to-indigo-900/40 border border-cyan-400/50 flex items-center justify-center relative group-hover:scale-105 group-hover:border-cyan-300 transition-all shadow-inner shrink-0">
                <ShoppingBag className="w-4 h-4 text-cyan-300 group-hover:text-cyan-100 transition-colors" />
                {totalCartCount > 0 && (
                  <>
                    <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-cyan-400 animate-ping opacity-40 pointer-events-none" />
                    <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-slate-950 font-black text-[10px] h-[18px] min-w-[18px] px-1 rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(245,158,11,0.7)] border border-white/70 ring-1 ring-[#0B1327]">
                      {totalCartCount}
                    </span>
                  </>
                )}
              </div>

              {/* Center: Context & Price Stack */}
              <div className="flex flex-col text-left leading-none">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    ব্যাগ
                  </span>
                  {totalCartCount > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" title="আইটেম যুক্ত আছে" />
                  )}
                </div>
                <div className="text-xs sm:text-[13px] font-black text-white group-hover:text-cyan-200 tracking-tight leading-none mt-1">
                  ৳{totalCartPrice.toLocaleString('bn-BD')}
                </div>
              </div>

              {/* Right: Divider & Quick Trigger Chevron */}
              <div className="h-5 w-[1px] bg-slate-700/70 group-hover:bg-cyan-500/30 transition-colors hidden sm:block ml-0.5" />
              <div className="hidden sm:flex w-5 h-5 rounded-md bg-cyan-500/10 group-hover:bg-cyan-400 group-hover:text-slate-950 border border-cyan-500/20 items-center justify-center text-cyan-400 transition-all">
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Popdown */}
        {searchOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-800">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="গ্যাজেট সার্চ করুন..."
                className="w-full bg-[#0E172E] text-slate-100 placeholder-slate-400 text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>
        )}
      </div>

      {/* 3. Horizontal Floating Filter Capsules */}
      <div className="bg-[#050A16]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          {GADGET_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-slate-950 font-black shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                    : 'bg-[#0E172E] text-slate-300 hover:text-white hover:bg-[#162344] border border-slate-800'
                }`}
              >
                <span>{cat.nameBn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-slate-950 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070D1D] border-b border-slate-800 p-4 space-y-3 shadow-2xl">
          {/* Mobile Back to Demo Gateway */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              handleBack();
            }}
            className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-900/40 via-[#0E172E] to-cyan-900/30 border border-cyan-400/50 text-cyan-300 font-bold text-xs flex items-center justify-between shadow-lg active:scale-98 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>সব ডেমো ক্যাটাগরিতে ফিরে যান</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-black">
              Demo Hub
            </span>
          </button>

          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pt-1">ক্যাটাগরি সমূহ</div>
          <div className="grid grid-cols-2 gap-2">
            {GADGET_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left p-2.5 rounded-xl text-xs font-bold ${
                  activeCategory === cat.id ? 'bg-cyan-500 text-slate-950' : 'bg-[#0E172E] text-slate-300 border border-slate-800'
                }`}
              >
                {cat.nameBn}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
