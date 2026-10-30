import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  Search, ShoppingBag, Heart, PhoneCall, ArrowLeft, 
  Menu, X, Sparkles, ShieldCheck, ChevronRight, Zap,
  Flame, SlidersHorizontal, RefreshCw
} from 'lucide-react';
import { FOOTWEAR_BRAND, FOOTWEAR_CATEGORIES, FOOTWEAR_BRANDS } from '../../data/footwearData';

export default function KicksCraftHeader({
  activeCategory = 'all',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  onOpenCart,
  onBackToGateway
}) {
  const { cart = [], wishlist = [] } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  const totalCartCount = Array.isArray(cart) ? cart.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
  const totalCartPrice = Array.isArray(cart) ? cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0) : 0;

  const handleBack = onBackToGateway || (() => navigate('/'));

  return (
    <header className="sticky top-0 z-50 w-full font-sans bg-white shadow-sm border-b border-slate-200 transition-all">
      
      {/* 1. Top High-Energy Midnight Bar */}
      <div className="bg-[#0B0F17] text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1.5 font-bold text-orange-400 shrink-0">
              <Flame className="w-3.5 h-3.5 text-[#FF4800] animate-pulse" />
              <span>{FOOTWEAR_BRAND.tagline}</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden md:inline truncate">
              {FOOTWEAR_BRAND.subTagline}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a 
              href={`tel:${FOOTWEAR_BRAND.hotline}`} 
              className="hover:text-orange-300 transition-colors font-medium hidden sm:flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-[#FF4800]" />
              <span className="font-mono text-slate-200">{FOOTWEAR_BRAND.hotline}</span>
            </a>

            {/* Dedicated Admin Portal Quick-Launch Button */}
            <Link
              to="/footwear/admin"
              className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-stone-950 font-black text-[11px] transition-all flex items-center gap-1 shadow-sm active:scale-95"
              title="অ্যাডমিন প্যানেল"
            >
              <ShieldCheck className="w-3 h-3 text-stone-950" />
              <span>অ্যাডমিন</span>
            </Link>

            {/* Demo Hub Button */}
            <button
              type="button"
              onClick={handleBack}
              className="px-2.5 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
            >
              <ArrowLeft className="w-3 h-3 text-orange-400" />
              <span>ডেমো হাব</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Brand Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Mobile Toggle & Monogram Athletic Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
            aria-label="মেনু খুলুন"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/footwear" className="flex items-center gap-2 sm:gap-3 group">
            {/* Athletic Monogram Emblem */}
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#FF4800] to-[#E03A00] flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform duration-300">
              <span className="font-black italic text-white text-lg sm:text-xl tracking-tighter leading-none select-none">
                KC
              </span>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping opacity-75" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl sm:text-2xl tracking-tighter text-[#0B0F17] leading-none uppercase">
                  KICKS<span className="text-[#FF4800]">CRAFT</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black tracking-widest bg-orange-100 text-[#FF4800] border border-orange-200">
                  BD
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-wider">
                {FOOTWEAR_BRAND.nameBn} • স্নিকার বুটিক
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Live Instant Search Input */}
        <div className="flex-1 max-w-xl mx-2 hidden sm:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="স্নিকার, ব্র্যান্ড (Nike, Adidas, Puma) বা মডেল খুঁজুন..."
              className="w-full pl-10 pr-10 py-2 sm:py-2.5 rounded-xl border border-slate-200 focus:border-[#FF4800] focus:ring-2 focus:ring-orange-500/20 outline-none text-xs sm:text-sm bg-slate-50/80 hover:bg-white focus:bg-white transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => onSearchChange && onSearchChange('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Icons: Shop / See All, Hotline & Cart Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Direct "সকল পণ্য / Shop" Navigation Pill */}
          <Link
            to="/footwear/shop"
            className="px-3 sm:px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 border border-slate-200"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF4800]" />
            <span className="hidden sm:inline">সকল স্নিকার্স</span>
            <span className="sm:hidden">শপ</span>
          </Link>

          {/* Cart Capsule Trigger */}
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0B0F17] hover:bg-black text-white transition-all shadow-md active:scale-95 group cursor-pointer border border-slate-800"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 group-hover:scale-110 transition-transform" />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#FF4800] text-white text-[10px] font-black flex items-center justify-center animate-bounce shadow">
                  {totalCartCount}
                </span>
              )}
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-[10px] text-slate-400 font-medium">কার্ট ব্যাগ</span>
              <span className="text-xs sm:text-sm font-black font-mono text-orange-400">
                ৳{totalCartPrice.toLocaleString('en-US')}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Row */}
      <div className="sm:hidden px-3 pb-2.5">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="স্নিকার, ব্র্যান্ড বা মডেল সার্চ..."
            className="w-full pl-9 pr-9 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white outline-none focus:border-[#FF4800]"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button 
              type="button"
              onClick={() => onSearchChange && onSearchChange('')} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Horizontal Category Navigation Bar */}
      <div className="bg-slate-50/90 border-t border-slate-100 overflow-x-auto no-scrollbar py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2">
          {FOOTWEAR_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-[#FF4800] text-white shadow-sm shadow-orange-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span>{cat.nameBn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}

          <div className="h-4 w-[1px] bg-slate-300 mx-1 shrink-0" />

          {/* Quick Brand Links */}
          {FOOTWEAR_BRANDS.filter(b => b.id !== 'all').map((b) => (
            <Link
              key={b.id}
              to={`/footwear/shop?brand=${b.id}`}
              className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-500 hover:text-[#FF4800] hover:bg-orange-50 transition-colors whitespace-nowrap shrink-0"
            >
              {b.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="w-4/5 max-w-sm h-full bg-white p-5 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FF4800] text-white flex items-center justify-center font-black">
                    KC
                  </div>
                  <span className="font-black text-lg text-slate-900 uppercase">
                    KicksCraft BD
                  </span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1 mb-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  ক্যাটাগরি
                </span>
                {FOOTWEAR_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      onSelectCategory && onSelectCategory(cat.id);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-orange-50 hover:text-[#FF4800] transition-colors flex items-center justify-between"
                  >
                    <span>{cat.nameBn}</span>
                    <span className="text-xs text-slate-400 font-mono">({cat.count})</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <Link
                  to="/footwear/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 rounded-xl bg-orange-50 text-[#FF4800] font-bold text-sm flex items-center justify-between"
                >
                  <span>সকল পণ্য ব্রাউজ করুন</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/footwear/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-between"
                >
                  <span>🛡️ অ্যাডমিন ড্যাশবোর্ড</span>
                  <ChevronRight className="w-4 h-4 text-orange-400" />
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <p className="font-bold text-slate-700">হটলাইন সাপোর্ট:</p>
              <p className="font-mono text-[#FF4800] font-bold">{FOOTWEAR_BRAND.hotline}</p>
              <p className="text-[11px] text-slate-400">{FOOTWEAR_BRAND.address}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
