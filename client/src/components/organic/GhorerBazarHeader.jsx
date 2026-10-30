import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  Search, ShoppingBag, Heart, PhoneCall, ArrowLeft, 
  Menu, X, Sparkles, ShieldCheck, ChevronRight, Leaf,
  Clock, MapPin, CheckCircle2
} from 'lucide-react';
import { GHORER_BAZAR_BRAND, GHORER_BAZAR_CATEGORIES } from '../../data/ghorerBazarData';

export default function GhorerBazarHeader({
  activeCategory = 'all',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  onOpenCart,
  onBackToGateway
}) {
  const { cart, wishlist = [] } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const totalCartCount = Array.isArray(cart) ? cart.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
  const totalCartPrice = Array.isArray(cart) ? cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0) : 0;
  const wishlistCount = Array.isArray(wishlist) ? wishlist.length : 0;

  const handleBack = onBackToGateway || (() => navigate('/'));

  return (
    <header className="sticky top-0 z-50 w-full font-sans bg-white shadow-sm transition-all border-b border-emerald-100">
      
      {/* 1. Top Green Announcement Bar */}
      <div className="bg-[#055C32] text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1.5 font-bold text-emerald-100 shrink-0">
              <Leaf className="w-3.5 h-3.5 text-amber-300" />
              <span>নিরাপদ খাদ্য, সুস্থ জীবন</span>
            </span>
            <span className="text-emerald-400 hidden sm:inline">•</span>
            <span className="text-emerald-50 hidden md:inline truncate">
              সরাসরি চাষী ও খামারিদের থেকে সংগৃহীত ১০০% বিশুদ্ধ পণ্য
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a 
              href={`tel:${GHORER_BAZAR_BRAND.hotline}`} 
              className="hover:text-amber-200 transition-colors font-medium hidden sm:flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-amber-300" />
              <span className="font-mono">{GHORER_BAZAR_BRAND.hotline}</span>
            </a>

            <Link
              to="/organic/admin"
              className="px-2.5 py-0.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-[11px] transition-all flex items-center gap-1 shadow-sm active:scale-95"
              title="অ্যাডমিন প্যানেলে প্রবেশ করুন"
            >
              <ShieldCheck className="w-3 h-3 text-stone-950" />
              <span>অ্যাডমিন</span>
            </Link>

            <button
              type="button"
              onClick={handleBack}
              className="px-2.5 py-0.5 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white border border-emerald-500/60 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
              title="মাস্টার ডেমো গেটওয়েতে ফিরে যান"
            >
              <ArrowLeft className="w-3 h-3 text-amber-300" />
              <span>ডেমো হাব</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main White Navbar (Ghorer Bazar Classic Aesthetic) */}
      <div className="bg-white py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/organic" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#055C32] to-[#0A874B] flex items-center justify-center shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform border border-emerald-400/40">
                <Leaf className="w-6 h-6 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[#055C32] leading-none">
                    ঘরের<span className="text-amber-500">বাজার</span>
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-100 text-[#055C32] border border-emerald-200">
                    PURE
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold tracking-tight mt-0.5">
                  ১০০% খাঁটি ও নিরাপদ খাদ্য
                </span>
              </div>
            </Link>

            {/* Prominent Desktop Gateway Switcher */}
            <button
              type="button"
              onClick={handleBack}
              className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#055C32] border border-emerald-200 text-xs font-bold transition-all shadow-sm active:scale-95 ml-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-600" />
              <span>ডেমো ক্যাটালগ</span>
            </button>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-xl mx-2 hidden md:block">
            <div className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                placeholder="খাঁটি মধু, দানাদার ঘি, ঘানির তেল বা খেজুর খুঁজুন..."
                className="w-full bg-slate-50 hover:bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm pl-10 pr-24 py-2.5 rounded-xl border border-emerald-200 focus:border-[#055C32] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-3.5" />
              <button 
                type="button"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#055C32] hover:bg-[#044827] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center"
              >
                খুঁজুন
              </button>
            </div>
          </div>

          {/* Right: Hotline Call & Cart Capsule */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Quick Call Button (Desktop) */}
            <a
              href={`tel:${GHORER_BAZAR_BRAND.hotline}`}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-colors shadow-sm"
              title="সরাসরি কথা বলুন"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] text-amber-800 font-bold">অর্ডার হেল্পলাইন</span>
                <span className="text-xs font-black font-mono">{GHORER_BAZAR_BRAND.hotline}</span>
              </div>
            </a>

            {/* Shopping Cart Pill */}
            <button
              type="button"
              onClick={onOpenCart}
              className="group relative flex items-center gap-2 sm:gap-3 pl-2 sm:pl-2.5 pr-3 sm:pr-4 py-2 rounded-xl bg-[#055C32] hover:bg-[#044827] text-white shadow-md shadow-emerald-950/20 transition-all active:scale-95 cursor-pointer border border-emerald-600"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-800/80 flex items-center justify-center relative border border-emerald-400/40">
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 font-black text-[10px] h-[18px] min-w-[18px] px-1 rounded-full flex items-center justify-center shadow-md border border-white">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">
                  কার্ট / ব্যাগ
                </span>
                <span className="text-xs sm:text-sm font-black font-mono text-white mt-0.5">
                  ৳{totalCartPrice.toLocaleString('bn-BD')}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden">
          <div className="w-full relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder="খাঁটি মধু, ঘি, তেল, বাদাম খুঁজুন..."
              className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-emerald-200 focus:outline-none focus:border-[#055C32]"
            />
            <Search className="w-4 h-4 text-emerald-700 absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* 3. Horizontal Category Navigation Strip */}
      <div className="bg-[#FAFDF9] border-t border-b border-emerald-100/80 px-4 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          {GHORER_BAZAR_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-[#055C32] text-white shadow-sm'
                    : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-[#055C32] border border-emerald-200/80'
                }`}
              >
                <span>{cat.nameBn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}

          <Link
            to="/organic/shop"
            className="whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 ml-auto flex items-center gap-1 shrink-0"
          >
            <span>সব পণ্য ক্যাটালগ</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-200 p-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              handleBack();
            }}
            className="w-full p-3 rounded-xl bg-gradient-to-r from-emerald-800 to-[#055C32] text-white font-bold text-xs flex items-center justify-between shadow-md"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-amber-300" />
              <span>মাস্টার ডেমো ক্যাটালগে ফিরে যান</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
              Demo Hub
            </span>
          </button>

          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 pt-1">
            পণ্য ক্যাটাগরি সমূহ
          </div>
          <div className="grid grid-cols-2 gap-2">
            {GHORER_BAZAR_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left p-2.5 rounded-xl text-xs font-bold ${
                  activeCategory === cat.id
                    ? 'bg-[#055C32] text-white'
                    : 'bg-emerald-50 text-slate-700 hover:bg-emerald-100 border border-emerald-200/70'
                }`}
              >
                {cat.nameBn}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
              <span>হেল্পলাইন: {GHORER_BAZAR_BRAND.hotline}</span>
            </span>
            <Link 
              to="/organic/checkout" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#055C32] font-black underline"
            >
              সরাসরি চেকআউট
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
