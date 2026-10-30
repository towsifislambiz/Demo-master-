import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Heart, Search, Sparkles, MessageCircle, ArrowRight, MapPin, ShieldCheck 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function ShelaiHeader({ 
  searchQuery = '', 
  setSearchQuery = () => {},
  activeCategory = 'all',
  setActiveCategory = () => {},
  showCategories = true
}) {
  const navigate = useNavigate();
  const { cart, wishlist = [], setIsCartOpen, cartSubtotal, brandingSettings = {}, contactSettings = {} } = useStore();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <>
      {/* 1. Announcement Bar (Slim & Elegant) */}
      <div className="bg-[#0f291e] text-[#fef9c3] text-[10px] sm:text-[11px] py-1 px-4 border-b border-[#047857]/20 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
            <span>সারাদেশে ক্যাশ অন ডেলিভারি</span>
            <span className="text-[#a7f3d0]">•</span>
            <span className="font-semibold text-white">৳২,৫০০+ টাকার অর্ডারে সম্পূর্ণ ফ্রি হোম ডেলিভারি!</span>
          </div>
          <div className="flex items-center space-x-4 text-[#d1fae5] text-[10px] sm:text-[11px]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#34d399]" />
              <span>{contactSettings.address || 'বনানী ও ধানমন্ডি ফ্ল্যাগশিপ আউটলেট'}</span>
            </span>
            <a href={`tel:${contactSettings.phone?.replace(/[^0-9+]/g, '') || '01629559653'}`} className="hover:text-white transition-colors">
              📞 হেল্পলাইন: {contactSettings.phone || '01629-559653'}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Boutique Header (Ultra-Sleek & Compact) */}
      <header className="sticky top-0 z-40 bg-[#fcfbf9]/95 backdrop-blur-md border-b border-[#e7e2d9] transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-3">
          
          {/* Left: Luxury Back to Hub & Outlet Locator */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-3 py-1.5 rounded-full bg-[#0f291e] hover:bg-[#16382b] text-white border border-[#c5a059]/50 hover:border-[#c5a059] flex items-center gap-1.5 shadow-[0_2px_10px_rgba(15,41,30,0.2)] hover:shadow-[0_4px_16px_rgba(197,160,89,0.3)] active:scale-95 transition-all cursor-pointer group"
              title="সকল ক্যাটাগরি হাবে ফিরে যান"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-white/10 flex items-center justify-center group-hover:-translate-x-0.5 transition-transform">
                <ArrowRight className="w-2.5 h-2.5 text-[#fde047] rotate-180" />
              </div>
              <span className="font-bold text-[11px] sm:text-xs tracking-wide text-[#fef9c3]">ক্যাটাগরি হাব</span>
            </button>

            <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#f4efe6] border border-[#d6cebf] text-[10px] text-[#78716c]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-medium text-[#44403c]">বনানী ফ্ল্যাগশিপ • ঢাকা</span>
            </div>
          </div>

          {/* Center: Shelai Couture High-Fashion Monogram Branding or Custom Logo */}
          <div 
            className="text-center cursor-pointer select-none group" 
            onClick={() => navigate('/store')}
          >
            {brandingSettings.logoUrl ? (
              <img
                src={brandingSettings.logoUrl}
                alt={brandingSettings.brandName || 'Brand Logo'}
                className="h-8 sm:h-10 w-auto object-contain mx-auto"
              />
            ) : (
              <>
                <div className="flex items-center justify-center space-x-1.5 text-[#c5a059] leading-none mb-0.5">
                  <span className="h-[1px] w-4 bg-gradient-to-r from-transparent to-[#c5a059]" />
                  <Sparkles className="w-2.5 h-2.5 text-[#c5a059]" />
                  <span className="h-[1px] w-4 bg-gradient-to-l from-transparent to-[#c5a059]" />
                </div>
                <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-[0.2em] uppercase text-[#0f291e] font-serif group-hover:text-[#1b4332] transition-colors drop-shadow-xs leading-none">
                  {brandingSettings.brandName || 'SHELAI COUTURE'}
                </h1>
                <p className="text-[7.5px] sm:text-[8.5px] md:text-[9px] tracking-[0.26em] uppercase text-[#92400e] font-semibold mt-0.5 font-mono leading-none">
                  {brandingSettings.tagline || 'EST. 2008 • 100% ORIGINAL DESIGNER WEAR • BANANI'}
                </p>
              </>
            )}
          </div>

          {/* Right: Search, Wishlist, WhatsApp, Admin Access & Shopping Bag */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Search Input (Desktop) */}
            <div className="hidden lg:flex items-center relative w-40 xl:w-48">
              <input
                type="text"
                placeholder="ডিজাইনার বা ড্রেস খুঁজুন..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (window.location.pathname !== '/store') {
                    navigate('/store');
                  }
                }}
                className="w-full bg-[#f4efe6] hover:bg-[#ede5d8] border border-[#d6cebf] rounded-full py-1 pl-7 pr-3 text-xs text-[#1c1917] focus:outline-none focus:border-[#0f291e] focus:bg-white placeholder:text-[#a8a29e] shadow-inner transition-all"
              />
              <Search className="w-3 h-3 text-[#854d0e] absolute left-2.5 pointer-events-none" />
            </div>

            {/* Wishlist Page Trigger Button */}
            <button
              type="button"
              onClick={() => navigate('/store/wishlist')}
              className="relative p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-[#f4efe6] hover:bg-[#ede5d8] border border-[#d6cebf] text-[#0f291e] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
              title="সংরক্ষিত পছন্দতালিকা (Wishlist)"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-[#dc2626] text-[#dc2626]' : 'text-[#78716c]'}`} />
              <span className="hidden sm:inline text-xs font-bold font-serif text-[#0f291e]">উইশলিস্ট</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#dc2626] text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Open Admin Console Button (Requested Feature: "aita akdom open rahko website a") */}
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-[#fefce8] hover:bg-[#fef9c3] border border-[#ca8a04]/40 text-[#854d0e] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
              title="অ্যাডমিন প্যানেল কনসোল"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#ca8a04]" />
              <span className="hidden sm:inline text-xs font-mono font-bold">অ্যাডমিন</span>
            </button>

            {/* WhatsApp 1-Click Consultation Button */}
            <a
              href={`https://wa.me/${contactSettings.phone?.replace(/[^0-9]/g, '') || '8801629559653'}?text=আসসালামু%20আলাইকুম!%20আমি%20${encodeURIComponent(brandingSettings.brandName || 'Shelai Couture')}%20এর%20ফ্যাশন%20কালেকশন%20সম্পর্কে%20জানতে%20চাই।`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/40 text-[#15803d] font-bold text-xs items-center gap-1.5 transition-all shadow-xs active:scale-95"
              title="হোয়াটসঅ্যাপে সরাসরি কথা বলুন"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#16a34a]" />
              <span className="hidden xl:inline">হোয়াটসঅ্যাপ</span>
            </a>

            {/* Shopping Bag Trigger Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative px-3 py-1 sm:py-1.5 rounded-full bg-[#0f291e] hover:bg-[#16382b] text-white transition-all flex items-center gap-1.5 shadow-[0_2px_10px_rgba(15,41,30,0.2)] active:scale-95 cursor-pointer border border-[#c5a059]/40"
              title="শপিং ব্যাগ দেখুন"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#fde047]" />
              <span className="hidden sm:inline text-xs font-black font-mono text-[#fef9c3]">
                ৳{cartSubtotal.toLocaleString('en-US')}
              </span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ef4444] text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Category Navigation Bar (Shelai Department Tabs) */}
        {showCategories && (
          <div className="bg-white/95 backdrop-blur-md border-t border-b border-[#e7e2d9] overflow-x-auto scrollbar-none px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center space-x-1 sm:space-x-1.5 py-1 text-xs">
              {[
                { id: 'all', nameBn: 'সব কালেকশন', icon: '✨', count: 24 },
                { id: 'suits', nameBn: 'লাক্সারি ৩-পিস স্যুট', icon: '👗', count: 6 },
                { id: 'sarees', nameBn: 'ঢাকাই শাড়ি ও বেনারসি', icon: '🥻', count: 6 },
                { id: 'kurtis', nameBn: 'কুর্তি ও প্লাজো সেট', icon: '👚', count: 6 },
                { id: 'abayas', nameBn: 'দুবাই সিল্ক আবায়া', icon: '🧕', count: 6 }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (window.location.pathname !== '/store') {
                      navigate('/store');
                    } else {
                      const el = document.getElementById('collection-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`px-3 py-1 rounded-full whitespace-nowrap text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat.id
                      ? 'bg-[#0f291e] text-[#fef9c3] border border-[#c5a059]/50 shadow-[0_2px_8px_rgba(15,41,30,0.2)] font-black'
                      : 'text-[#44403c] hover:text-[#0f291e] hover:bg-[#f4efe6] font-bold'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat.id ? 'bg-white/20 text-[#fef9c3]' : 'bg-[#e7e2d9] text-[#78716c]'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
