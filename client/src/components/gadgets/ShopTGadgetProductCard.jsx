import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  Heart, Star, ShoppingBag, Eye, Zap, 
  ShieldCheck, Truck, Check, Sparkles, Flame
} from 'lucide-react';

const ShopTGadgetProductCard = memo(({ product }) => {
  const { addToCart, wishlist = [], toggleWishlist } = useStore();
  const [addedToast, setAddedToast] = useState(false);

  if (!product) return null;

  const {
    id,
    title,
    titleEn,
    price,
    oldPrice,
    discount,
    rating = 4.8,
    ratingCount = 240,
    badge = 'বেস্ট সেলার',
    badgeType = 'bestseller',
    image,
    categoryBn = 'গ্যাজেট',
    brand = 'ShopT Pro',
    specs = {}
  } = product;

  const isWishlisted = Array.isArray(wishlist) && wishlist.some(
    (item) => String(item.id) === String(id) || item.title === title
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1600);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleWishlist) {
      toggleWishlist(product);
    }
  };

  // Top 2 short technical specs
  const specEntries = Object.entries(specs);
  const specChip1 = specEntries[0] ? specEntries[0][1].split('(')[0].trim() : 'Active ANC';
  const specChip2 = specEntries[1] ? specEntries[1][1].split('(')[0].trim() : 'ফাস্ট চার্জিং';

  const discountBadge = discount || (oldPrice ? `${Math.round(((oldPrice - price) / oldPrice) * 100)}% ছাড়` : '২৫% ছাড়');

  return (
    <div className="bg-[#0C152B]/95 hover:bg-[#0E1933] border border-slate-800/90 hover:border-cyan-400/60 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full font-sans group relative overflow-hidden">
      
      {/* Top Ambient Glow Reflection */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-cyan-500/10 blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />

      {/* 1. Full-Width Showcase Stage for Product Image */}
      <div className="w-full h-36 xs:h-44 sm:h-56 rounded-lg sm:rounded-xl bg-gradient-to-b from-[#132244]/60 via-[#0E1830]/80 to-[#070D1B] p-2 sm:p-3 border border-slate-800/80 group-hover:border-slate-700/80 relative overflow-hidden flex items-center justify-center mb-2 sm:mb-3.5">
        
        {/* Soft Radial Ambient Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.14),transparent_70%)] pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity" />

        {/* Top-Left: Glowing Laser Pill Badge */}
        {badge && (
          <span className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 bg-slate-950/90 backdrop-blur-md text-cyan-300 border border-cyan-400/40 font-black text-[8px] sm:text-[10px] tracking-wider uppercase px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full shadow-sm z-10 flex items-center gap-1">
            {badgeType === 'hot' ? (
              <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 fill-amber-400 animate-pulse" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            )}
            <span>{badge}</span>
          </span>
        )}

        {/* Top-Right: Quick Actions (Wishlist & View) */}
        <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 flex flex-col gap-1 z-10">
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm border ${
              isWishlisted
                ? 'bg-rose-500 border-rose-400 text-white'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border-slate-700/80'
            }`}
            title={isWishlisted ? "পছন্দের তালিকা থেকে সরান" : "পছন্দের তালিকায় রাখুন"}
          >
            <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Floating Product Image */}
        <Link
          to={`/gadgets/product/${id}`}
          className="w-full h-full flex items-center justify-center cursor-pointer relative z-0"
        >
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Bottom Floating Spec Chips */}
        <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 flex items-center gap-1 z-10 pointer-events-none">
          <span className="bg-slate-950/90 backdrop-blur-md text-slate-300 border border-slate-800 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 sm:px-2 rounded truncate max-w-[65%] sm:max-w-[50%]">
            {specChip1}
          </span>
          <span className="hidden sm:inline bg-slate-950/90 backdrop-blur-md text-cyan-300 border border-cyan-900/50 text-[9px] font-bold px-2 py-0.5 rounded truncate max-w-[50%]">
            {specChip2}
          </span>
        </div>
      </div>

      {/* 2. Product Metadata: Brand, Title, Rating */}
      <div className="space-y-0.5 sm:space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400" />
            <span className="truncate max-w-[85px] sm:max-w-none">{brand}</span>
          </span>
          <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-bold text-slate-300">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 fill-amber-400" />
            <span>{rating}</span>
          </div>
        </div>

        <Link to={`/gadgets/product/${id}`}>
          <h3 className="text-xs sm:text-[15px] font-black text-white group-hover:text-cyan-300 transition-colors line-clamp-2 sm:line-clamp-1 leading-snug" title={title}>
            {title}
          </h3>
        </Link>
        <p className="text-[10px] sm:text-xs text-slate-400 truncate hidden xs:block">
          {titleEn}
        </p>
      </div>

      {/* 3. Price & Discount Row */}
      <div className="flex items-baseline gap-1.5 sm:gap-2 pt-1.5 sm:pt-2.5">
        <span className="text-sm sm:text-xl font-black text-white tracking-tight font-mono">
          ৳{price.toLocaleString('bn-BD')}
        </span>
        {oldPrice && (
          <span className="text-[10px] sm:text-xs line-through text-slate-500 font-bold font-mono">
            ৳{oldPrice.toLocaleString('bn-BD')}
          </span>
        )}
        <span className="bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-black text-[8px] sm:text-[10px] px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full ml-auto">
          {discountBadge}
        </span>
      </div>

      {/* 4. Action Buttons (Tactile Pure White CTA & Quick View) */}
      <div className="pt-2 sm:pt-3 flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 py-1.5 sm:py-2.5 px-2 rounded-lg sm:rounded-xl font-black text-[11px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 cursor-pointer shadow-md active:scale-95 ${
            addedToast
              ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
              : 'bg-white hover:bg-slate-100 text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]'
          }`}
        >
          {addedToast ? (
            <>
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-950 shrink-0" />
              <span className="truncate">যুক্ত হয়েছে</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-950 shrink-0" />
              <span className="truncate sm:hidden">কার্ট</span>
              <span className="truncate hidden sm:inline">কার্টে যোগ করুন</span>
            </>
          )}
        </button>

        <Link
          to={`/gadgets/product/${id}`}
          className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/50 text-slate-400 hover:text-cyan-300 transition-colors flex items-center justify-center cursor-pointer shadow-sm shrink-0"
          title="ডিটেইলস দেখুন"
        >
          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </Link>
      </div>

      {/* 5. Micro Trust Footer */}
      <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400">
        <span className="flex items-center gap-0.5 sm:gap-1">
          <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400 shrink-0" />
          <span className="truncate">১ বছর ওয়ারেন্টি</span>
        </span>
        <span className="flex items-center gap-0.5 sm:gap-1">
          <Truck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 shrink-0" />
          <span className="truncate">COD</span>
        </span>
      </div>

    </div>
  );
});

export default ShopTGadgetProductCard;
