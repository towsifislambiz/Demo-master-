import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ShoppingBag, Trash2, ArrowRight, MessageCircle, 
  Sparkles, ShieldCheck, ChevronRight, Check, Eye, AlertCircle,
  Truck, Star, Leaf, Award, Flame
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { RIBANA_PRODUCTS } from '../../data/ribanaBeautyData';
import RibanaHeader from './RibanaHeader';
import RibanaCartDrawer from './RibanaCartDrawer';

export default function RibanaWishlistPage() {
  const navigate = useNavigate();
  const { 
    wishlist = [], 
    toggleWishlist, 
    clearWishlist, 
    addToCart, 
    setIsCartOpen 
  } = useStore();

  // Curated demo items if user visits directly
  const effectiveWishlist = wishlist.length > 0 ? wishlist : [
    RIBANA_PRODUCTS[0],
    RIBANA_PRODUCTS[1],
    RIBANA_PRODUCTS[3]
  ];

  const handleAddAllToCart = () => {
    effectiveWishlist.forEach((item) => {
      addToCart(item, { size: item.size || 'Standard' });
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (item) => {
    addToCart(item, { size: item.size || 'Standard' });
    navigate('/beauty/checkout');
  };

  const totalWishlistValue = effectiveWishlist.reduce((sum, item) => sum + item.price, 0);
  const freeDeliveryThreshold = 1500;
  const isFreeDeliveryEligible = totalWishlistValue >= freeDeliveryThreshold;

  // Curated recommendations for empty or bottom discovery
  const recommendations = RIBANA_PRODUCTS.slice(0, 3);

  const getProductBenefits = (prod) => {
    if (prod.concern === 'brightening') return ['✨ গ্লাস-স্কিন গ্লো', '🌿 কেমিক্যালমুক্ত'];
    if (prod.concern === 'acne') return ['🌿 ব্রণ ও দাগ দূর', '🍃 অ্যান্টি-ব্যাকটেরিয়াল'];
    if (prod.concern === 'hairfall') return ['💆‍♀️ চুল পড়া ৯০% রোধ', '🌿 শক্ত চুলের গোড়া'];
    if (prod.concern === 'hydration') return ['💧 ডিপ ময়েশ্চারাইজিং', '🌸 ২৪ ঘণ্টা আর্দ্রতা'];
    return ['🌿 ১০০% অর্গানিক', '✨ ন্যাচারাল গ্লো'];
  };

  return (
    <div className="min-h-screen bg-[#FFF8F5] text-[#2D1B22] font-sans selection:bg-[#F3D5D0] flex flex-col justify-between">
      {/* 1. Master Header */}
      <RibanaHeader />

      <main className="flex-1 pb-16 space-y-8 sm:space-y-12">
        {/* 2. Breadcrumb Navigation Bar */}
        <div className="border-b border-[#F0D5CC]/80 bg-white/70 backdrop-blur-md">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-xs text-[#7A5B63]">
            <ol className="flex items-center space-x-2">
              <li>
                <button 
                  onClick={() => navigate('/beauty')} 
                  className="hover:text-[#8E2A3E] transition-colors cursor-pointer font-medium"
                >
                  হোম
                </button>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5 text-[#B89FA5]" /></li>
              <li>
                <button 
                  onClick={() => navigate('/beauty')} 
                  className="hover:text-[#8E2A3E] transition-colors cursor-pointer font-medium"
                >
                  বিউটি কালেকশন
                </button>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5 text-[#B89FA5]" /></li>
              <li className="font-bold text-[#8E2A3E]">
                সংরক্ষিত পছন্দতালিকা (Wishlist)
              </li>
            </ol>
          </nav>
        </div>

        {/* 3. Wishlist Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Suite Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F0D5CC] shadow-xs flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[#8E2A3E] text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>আপনার ব্যক্তিগত রূপচর্চা কালেকশন</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-[#241518]">
                সংরক্ষিত পছন্দতালিকা
              </h1>
              <p className="text-xs sm:text-sm text-[#7A5B63] font-light max-w-xl">
                আপনার পছন্দের প্রাকৃতিক বিউটি ও স্কিনকেয়ার প্রোডাক্টগুলো যেকোনো সময় এক ক্লিকে ব্যাগে নিয়ে সহজেই অর্ডার করুন।
              </p>
            </div>

            {effectiveWishlist.length > 0 && (
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleAddAllToCart}
                  className="px-5 py-2.5 rounded-full text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #2D1B22 0%, #3D1F28 50%, #1F1216 100%)',
                    boxShadow: '0 0 16px 2px rgba(244, 63, 94, 0.5), 0 0 25px 3px rgba(168, 85, 247, 0.3)'
                  }}
                >
                  <ShoppingBag className="w-4 h-4 text-pink-200" />
                  <span>সব প্রোডাক্ট ব্যাগে নিন ({effectiveWishlist.length})</span>
                </button>

                <button
                  type="button"
                  onClick={clearWishlist}
                  className="px-4 py-2.5 rounded-full bg-[#FAF0E8] hover:bg-[#F3D5D0] text-[#8E2A3E] border border-[#F0D5CC] font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>তালিকা মুছুন</span>
                </button>
              </div>
            )}
          </div>

          {/* Wishlist Products Grid (2 Columns on Mobile, 3 on Desktop) */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
            {effectiveWishlist.map((prod) => {
                const benefits = getProductBenefits(prod);
                return (
                  <motion.div
                    key={prod.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group relative rounded-2xl sm:rounded-[32px] border border-[#F0D5CC]/90 hover:border-[#8E2A3E]/60 shadow-[0_8px_24px_rgba(53,35,38,0.05)] sm:shadow-[0_12px_36px_rgba(53,35,38,0.06)] hover:shadow-[0_24px_55px_rgba(142,42,62,0.2),0_8px_20px_rgba(244,63,94,0.12)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col justify-between select-none backdrop-blur-2xl"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 250, 247, 0.94) 55%, rgba(253, 243, 238, 0.97) 100%)'
                    }}
                  >
                    {/* Top Specular Shine */}
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-10" />

                    {/* Pedestal Frame */}
                    <div 
                      onClick={() => navigate(`/beauty/product/${prod.id}`)}
                      className="relative aspect-[4/3.8] sm:aspect-[4/3.6] w-full overflow-hidden rounded-t-xl sm:rounded-t-[30px] flex items-center justify-center cursor-pointer"
                    >
                      {/* Ambient Backdrop */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at 50% 55%, rgba(255, 255, 255, 0.95) 0%, ${prod.bgTone || '#F8EAE0'} 65%, #FFF5EF 100%)`
                        }}
                      />
                      <div 
                        className="absolute w-32 sm:w-48 h-32 sm:h-48 rounded-full blur-2xl opacity-70 pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(255,225,185,0.85) 0%, rgba(244,180,195,0.45) 60%, transparent 100%)' }}
                      />

                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="relative z-1 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />

                      {/* Feather dissolve */}
                      <div 
                        className="absolute inset-x-0 bottom-0 h-10 sm:h-16 pointer-events-none z-2"
                        style={{
                          background: 'linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.4) 40%, transparent 100%)'
                        }}
                      />

                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-1.5 z-10 pointer-events-none max-w-[70%]">
                        <span 
                          className="px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[#2D1B22] font-mono text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 backdrop-blur-md shadow-xs border border-[#F5D89F]"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 249, 235, 0.95) 0%, rgba(255, 238, 245, 0.95) 50%, rgba(235, 249, 255, 0.95) 100%)'
                          }}
                        >
                          <span className="text-amber-500 text-[9px] sm:text-xs">👑</span>
                          <span className="truncate">{prod.badge || 'BESTSELLER'}</span>
                        </span>
                        {prod.discount && (
                          <span 
                            className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-white font-mono text-[8px] sm:text-[10.5px] font-extrabold tracking-tight border-t border-white/40"
                            style={{
                              background: 'linear-gradient(180deg, #BA3E50 0%, #961A2B 55%, #751221 100%)',
                              boxShadow: '0 4px 14px rgba(150, 26, 43, 0.4)'
                            }}
                          >
                            {prod.discount}
                          </span>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(prod);
                        }}
                        className="absolute top-2 right-2 sm:top-3.5 sm:right-3.5 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-red-500 hover:text-red-700 flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-20 shadow-md border border-white cursor-pointer"
                        title="পছন্দতালিকা থেকে সরান"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    {/* Card Content Details */}
                    <div className="p-2.5 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3.5">
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex items-center justify-between text-[9px] sm:text-xs font-mono">
                          <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-[#FAF0E8] border border-[#EEDCD2] text-[#63383D] font-bold text-[8.5px] sm:text-[10.5px] truncate max-w-[55%]">
                            {prod.skinType?.split(' ')[0] || 'সব ত্বক'}
                          </span>
                          <div className="flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full bg-amber-50/90 border border-amber-200/80 text-[9px] sm:text-[11px] font-extrabold text-[#7A4E0B]">
                            <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-[#E5A824] text-[#E5A824]" />
                            <span>{prod.rating}</span>
                          </div>
                        </div>

                        <h4 
                          onClick={() => navigate(`/beauty/product/${prod.id}`)}
                          className="text-xs sm:text-base lg:text-lg font-black font-serif text-[#2B1A1E] group-hover:text-[#8E2A3E] transition-colors leading-[1.3] line-clamp-2 min-h-[30px] sm:min-h-[44px] cursor-pointer"
                        >
                          {prod.title}
                        </h4>

                        {/* Benefit Chips: 1 on mobile, full on desktop */}
                        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                          {benefits.slice(0, 1).map((chip, idx) => (
                            <span 
                              key={idx}
                              className="sm:hidden px-1.5 py-0.5 rounded bg-white/90 border border-[#F0D5CC] text-[#7A3844] font-bold text-[8px] truncate"
                            >
                              {chip}
                            </span>
                          ))}
                          {benefits.map((chip, idx) => (
                            <span 
                              key={idx}
                              className="hidden sm:inline-block px-2.5 py-0.5 rounded-md bg-white/90 border border-[#F0D5CC] text-[#7A3844] font-bold text-[10.5px] shadow-2xs"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>

                        <p className="hidden sm:flex text-xs text-[#6B555A] line-clamp-1 font-light items-center gap-1.5 pt-0.5">
                          <span className="text-[#C99A43] font-serif text-sm">✦</span>
                          <span className="truncate">{prod.keyIngredients}</span>
                        </p>
                      </div>

                      {/* Price & Action Row */}
                      <div className="pt-2 sm:pt-3.5 border-t border-[#F2D7CF]/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-2.5 mt-auto">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-baseline space-x-1 sm:space-x-1.5">
                            <span className="text-base sm:text-2xl lg:text-[25px] font-black text-[#8E2A3E] font-serif tracking-tight leading-none">
                              ৳{prod.price.toLocaleString('en-US')}
                            </span>
                            {prod.originalPrice && (
                              <span className="text-[10px] sm:text-xs lg:text-[13px] text-[#8C757B] line-through font-mono">
                                ৳{prod.originalPrice.toLocaleString('en-US')}
                              </span>
                            )}
                          </div>
                          {prod.originalPrice && (
                            <span 
                              className="inline-block mt-0.5 sm:mt-1 text-[8px] sm:text-[10px] font-mono font-black px-1.5 sm:px-2 py-0.5 rounded text-[#8C5814] border border-[#EACFA8] w-fit shadow-2xs"
                              style={{ background: 'linear-gradient(90deg, #FFF5E8 0%, #FFE9CF 100%)' }}
                            >
                              সাশ্রয় ৳{(prod.originalPrice - prod.price).toLocaleString('en-US')}
                            </span>
                          )}
                        </div>

                        {/* NEON AURORA CTA BUTTON */}
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(prod, { size: prod.size || 'Standard' });
                            setIsCartOpen(true);
                          }}
                          className="relative group/btn w-full sm:w-auto px-2.5 sm:px-4 lg:px-5 py-1.5 sm:py-2.5 rounded-full text-white font-bold text-[10.5px] sm:text-xs lg:text-[13px] tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer transition-all duration-300 active:scale-95 shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, #2D1B22 0%, #3D1F28 50%, #1F1216 100%)',
                            boxShadow: '0 0 14px 2px rgba(244, 63, 94, 0.45), 0 0 24px 3px rgba(168, 85, 247, 0.3)'
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

          {/* Curated Recommendations Section if wishlist < 3 */}
          {wishlist.length < 3 && (
            <div className="pt-8 border-t border-[#F0D5CC]/80 space-y-6">
              <div>
                <h3 className="font-serif font-black text-xl text-[#241518]">
                  আপনার জন্য বিশেষ রিকমেন্ডেশন
                </h3>
                <p className="text-xs text-[#7A5B63]">
                  প্রাকৃতিক গ্লো ও ত্বকের গভীর যত্নে সর্বাধিক বিক্রিত অর্গানিক কালেকশন
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => navigate(`/beauty/product/${rec.id}`)}
                    className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white border border-[#F0D5CC] flex items-center gap-3 sm:gap-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all"
                  >
                    <img
                      src={rec.image}
                      alt={rec.title}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-cover bg-[#FAF0E8] border border-[#F0D5CC]/80 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h5 className="font-serif font-bold text-xs sm:text-sm text-[#241518] truncate">
                        {rec.title}
                      </h5>
                      <span className="font-serif font-black text-xs sm:text-sm text-[#8E2A3E] block mt-0.5">
                        ৳{rec.price.toLocaleString('en-US')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(rec);
                      }}
                      className="p-2 sm:p-2.5 rounded-full bg-[#FAF0E8] text-[#8E2A3E] hover:bg-[#8E2A3E] hover:text-white transition-colors shrink-0"
                      title="পছন্দতালিকায় যোগ করুন"
                    >
                      <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>
      </main>

      {/* Cart Drawer */}
      <RibanaCartDrawer />
    </div>
  );
}
