import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ShoppingBag, Trash2, ArrowRight, MessageCircle, 
  Sparkles, ShieldCheck, ChevronRight, Check, Eye, AlertCircle,
  Truck, Gem, Flame
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { SHELAI_PRODUCTS } from '../../data/shelaiFashionData';
import ShelaiHeader from './ShelaiHeader';
import ShelaiCartDrawer from './ShelaiCartDrawer';

export default function ShelaiWishlistPage() {
  const navigate = useNavigate();
  const { 
    wishlist = [], 
    toggleWishlist, 
    clearWishlist, 
    addToCart, 
    setIsCartOpen,
    isInWishlist,
    shelaiProducts = SHELAI_PRODUCTS
  } = useStore();

  const handleAddAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart(item, { size: item.sizes?.[0] || 'M', stitching: item.stitchingOptions?.[0] || 'Stitched' });
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (item) => {
    addToCart(item, { size: item.sizes?.[0] || 'M', stitching: item.stitchingOptions?.[0] || 'Stitched' });
    navigate('/store/checkout');
  };

  const totalWishlistValue = wishlist.reduce((sum, item) => sum + item.price, 0);
  const freeDeliveryThreshold = 2500;
  const isFreeDeliveryEligible = totalWishlistValue >= freeDeliveryThreshold;

  // Curated recommendations for empty or bottom discovery
  const trendingRecommendations = shelaiProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1c1917] font-sans selection:bg-[#0f291e] selection:text-[#fef9c3] flex flex-col justify-between">
      <div>
        {/* 1. Shelai Universal Header */}
        <ShelaiHeader showCategories={false} />

        {/* 2. Haute Couture Breadcrumb Navigation Bar */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 border-b border-[#e7e2d9] text-xs text-[#78716c]">
          <ol className="flex items-center space-x-2">
            <li>
              <button onClick={() => navigate('/store')} className="hover:text-[#0f291e] transition-colors cursor-pointer font-medium">
                হোম
              </button>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#a8a29e]" /></li>
            <li>
              <button onClick={() => navigate('/store')} className="hover:text-[#0f291e] transition-colors cursor-pointer font-medium">
                ফ্যাশন বুটিক
              </button>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#a8a29e]" /></li>
            <li className="font-bold text-[#0f291e]">পছন্দতালিকা (Wishlist)</li>
          </ol>
        </nav>

        {/* 3. Wishlist Content Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          
          {/* Royal Editorial Header */}
          <div className="rounded-3xl bg-gradient-to-r from-[#0f291e] via-[#16382b] to-[#0f291e] text-white p-6 sm:p-10 border-2 border-[#c5a059]/50 shadow-xl relative overflow-hidden mb-10">
            {/* Ambient Gold Pattern Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#c5a059]/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2 text-[#fde047] text-[11px] font-mono font-bold tracking-[0.25em] uppercase">
                  <Heart className="w-4 h-4 fill-[#fde047]" />
                  <span>SHELAI PRIVATE VAULT • আপনার সংরক্ষিত স্বপ্নের কালেকশন</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-[#fef9c3] tracking-tight">
                  আপনার সংরক্ষিত রাজকীয় কালেকশন
                </h1>
                <p className="text-xs sm:text-sm text-[#d1fae5] font-light leading-relaxed">
                  আপনার পছন্দের ড্রেসগুলো সহজে খুঁজে নিন এবং স্টক শেষ হওয়ার আগেই শপিং ব্যাগে নিয়ে অর্ডার নিশ্চিত করুন।
                </p>
              </div>

              {wishlist.length > 0 && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs">
                    <p className="text-[10px] text-[#fde047] font-mono uppercase">মোট সংরক্ষিত মূল্য</p>
                    <p className="font-serif font-black text-lg text-white">৳{totalWishlistValue.toLocaleString('en-US')}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddAllToCart}
                    className="px-6 py-3.5 rounded-full bg-[#c5a059] hover:bg-[#d4af37] text-[#0f291e] font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#0f291e] shrink-0" />
                    <span>সবগুলো ব্যাগে নিন</span>
                  </button>
                </div>
              )}
            </div>

            {/* Live Stats Pill Bar */}
            {wishlist.length > 0 && (
              <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs text-[#a7f3d0]">
                <span className="flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#fde047]" />
                  <span>সংরক্ষিত ড্রেস: <strong className="text-white">{wishlist.length}টি</strong></span>
                </span>
                <span className="text-white/40">•</span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#fde047]" />
                  <span>
                    {isFreeDeliveryEligible 
                      ? <strong className="text-[#86efac]">সারা দেশে সম্পূর্ণ ফ্রি হোম ডেলিভারি যোগ্য!</strong>
                      : `আর মাত্র ৳${(freeDeliveryThreshold - totalWishlistValue).toLocaleString('en-US')} অর্ডারে ফ্রি ডেলিভারি`}
                  </span>
                </span>
                <span className="text-white/40">•</span>
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="text-white/70 hover:text-white underline cursor-pointer text-[11px] ml-auto"
                >
                  উইশলিস্ট খালি করুন
                </button>
              </div>
            )}
          </div>

          {/* Empty Wishlist State with Rich Discovery Hub */}
          {wishlist.length === 0 ? (
            <div className="space-y-12">
              <div className="py-16 text-center max-w-lg mx-auto space-y-5 bg-white p-8 sm:p-12 rounded-3xl border border-[#e7e2d9] shadow-sm">
                <div className="w-20 h-20 rounded-full bg-[#f4efe6] text-[#dc2626] mx-auto flex items-center justify-center shadow-inner border border-[#e7e2d9] relative">
                  <Heart className="w-10 h-10 stroke-1 fill-[#fee2e2]" />
                  <Sparkles className="w-4 h-4 text-[#c5a059] absolute -top-1 -right-1" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-black text-2xl text-[#0f291e]">
                    আপনার উইশলিস্ট বর্তমানে খালি রয়েছে
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78716c] leading-relaxed">
                    আমাদের পাকিস্তানি ডিজাইনার ৩-পিস স্যুট, ঐতিহ্যবাহী ঢাকাই শাড়ি ও দুবাই সিল্ক আবায়া কালেকশন থেকে আপনার পছন্দের ড্রেসটি লাভ আইকনে ক্লিক করে সেভ করুন।
                  </p>
                </div>

                {/* Quick Discovery Category Chips */}
                <div className="pt-2 flex flex-wrap justify-center gap-2">
                  {[
                    'লাক্সারি ৩-পিস স্যুট',
                    'ঐতিহ্যবাহী ঢাকাই শাড়ি',
                    'রেডি কুর্তি সেট',
                    'দুবাই সিল্ক আবায়া'
                  ].map((cat, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => navigate('/store')}
                      className="px-3.5 py-1.5 rounded-full bg-[#f7f4ed] hover:bg-[#0f291e] hover:text-[#fef9c3] text-[#0f291e] text-xs font-serif font-bold border border-[#d6cebf] transition-all cursor-pointer"
                    >
                      ✦ {cat}
                    </button>
                  ))}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => navigate('/store')}
                    className="px-8 py-3.5 rounded-full bg-[#0f291e] hover:bg-[#16382b] text-[#fef9c3] font-black text-xs uppercase tracking-wider shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>সম্পূর্ণ ফ্যাশন ক্যাটালগ এক্সপ্লোর করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Trending Recommendations Showcase */}
              <div className="space-y-6 pt-6">
                <div className="text-center space-y-1">
                  <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#854d0e]">
                    FEATURED COUTURE PICKS
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black font-serif text-[#0f291e]">
                    জনপ্রিয় ট্রেন্ডিং ড্রেস থেকে বেছে নিন
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                  {trendingRecommendations.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-white rounded-3xl border border-[#e8e2d5] hover:border-[#c5a059] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                    >
                      <div className="relative aspect-[3/4] bg-[#f6f2ea] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                          onClick={() => navigate(`/store/product/${item.id}`)}
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full bg-[#0f291e]/90 text-[#fef08a] font-mono text-[9px] font-bold">
                            {item.badge}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(item)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#0f291e] flex items-center justify-center shadow-md cursor-pointer transition-all hover:scale-110 ${
                            isInWishlist(item.id) ? 'text-[#dc2626]' : 'text-[#78716c]'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist(item.id) ? 'fill-[#dc2626] text-[#dc2626]' : ''}`} />
                        </button>
                      </div>

                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[9.5px] font-mono uppercase text-[#854d0e] font-bold">{item.designer}</p>
                          <h4 
                            onClick={() => navigate(`/store/product/${item.id}`)}
                            className="text-xs sm:text-sm font-serif font-bold text-[#1c1917] hover:text-[#0f291e] line-clamp-1 cursor-pointer"
                          >
                            {item.title}
                          </h4>
                        </div>
                        <div className="pt-2 border-t border-[#f4efe6] flex items-center justify-between">
                          <span className="font-serif font-black text-sm text-[#0f291e]">
                            ৳{item.price.toLocaleString('en-US')}
                          </span>
                          <button
                            type="button"
                            onClick={() => navigate(`/store/product/${item.id}`)}
                            className="text-xs text-[#854d0e] font-bold hover:underline"
                          >
                            বিস্তারিত দেখুন →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Wishlist Products Grid (2-columns on mobile, 3 on tablet, 4 on desktop) */
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-[#e8e2d5] hover:border-[#c5a059] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[3/4] w-full bg-[#f6f2ea] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                      onClick={() => navigate(`/store/product/${item.id}`)}
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 pointer-events-none">
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#0f291e]/90 text-[#fef08a] font-mono text-[8px] sm:text-[9px] font-bold tracking-wider uppercase border border-[#c5a059]/40 backdrop-blur-md shadow-sm">
                        {item.badge || 'EXCLUSIVE'}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(item)}
                      className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-[#dc2626] text-[#78716c] hover:text-white flex items-center justify-center transition-all z-10 shadow-md border border-white/60 cursor-pointer"
                      title="উইশলিস্ট থেকে সরান"
                    >
                      <Trash2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                    </button>

                    {/* In-stock indicator badge at bottom */}
                    <div className="absolute bottom-2 sm:bottom-2.5 left-2 sm:left-2.5 z-10">
                      <span className="text-[8px] sm:text-[9px] font-mono font-bold bg-white/90 backdrop-blur-md text-[#15803d] px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/60 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                        <span className="hidden xs:inline">ইন স্টক</span>
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                    <div className="space-y-1">
                      <p className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#854d0e] truncate">
                        {item.designer}
                      </p>
                      <h4 
                        onClick={() => navigate(`/store/product/${item.id}`)}
                        className="text-xs sm:text-sm font-bold font-serif text-[#1c1917] hover:text-[#0f291e] transition-colors leading-snug line-clamp-1 cursor-pointer"
                      >
                        {item.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-[#78716c] line-clamp-1 font-light">
                        {item.fabric?.shirt || item.titleEn}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#f0ebd9]">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm sm:text-base font-black text-[#0f291e] font-serif">
                          ৳{item.price.toLocaleString('en-US')}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[11px] sm:text-xs text-[#a8a29e] line-through font-mono">
                            ৳{item.originalPrice.toLocaleString('en-US')}
                          </span>
                        )}
                      </div>

                      {/* Dual Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(item, { size: item.sizes?.[0] || 'M' });
                          }}
                          className="py-1.5 sm:py-2 px-2 sm:px-2.5 rounded-xl bg-[#f4efe6] hover:bg-[#e8dfcf] text-[#0f291e] font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 border border-[#d6cebf] active:scale-95 transition-all cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0f291e] shrink-0" />
                          <span>ব্যাগে নিন</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleBuyNow(item)}
                          className="py-1.5 sm:py-2 px-2 sm:px-2.5 rounded-xl bg-[#0f291e] hover:bg-[#16382b] text-[#fef9c3] font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer border border-[#c5a059]/40"
                        >
                          <span>অর্ডার</span>
                          <ArrowRight className="w-3 h-3 shrink-0" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Boutique Consultation Banner */}
          <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#f7f4ed] border border-[#e8e1d3] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <h4 className="font-serif font-black text-base sm:text-lg text-[#0f291e]">
                ড্রেসের সাইজ বা ফেব্রিক নিয়ে কোনো প্রশ্ন আছে?
              </h4>
              <p className="text-xs text-[#78716c]">
                আমাদের বনানী শোরুমের অভিজ্ঞ ফ্যাশন ডিজাইনার প্রতিনিধির সাথে হোয়াটসঅ্যাপে সরাসরি পরামর্শ করুন।
              </p>
            </div>
            <a
              href="https://wa.me/8801629559653?text=আসসালামু%20আলাইকুম!%20আমি%20Shelai%20Couture%20এর%20কালেকশন%20সম্পর্কে%20জানতে%20চাই।"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md active:scale-95 transition-all shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপ কনসাল্টেশন</span>
            </a>
          </div>

        </main>
      </div>

      {/* Cart Drawer */}
      <ShelaiCartDrawer />
    </div>
  );
}