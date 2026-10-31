import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Star, ShieldCheck, Check, Sparkles, Zap } from 'lucide-react';

export default function GhorerBazarProductCard({
  product,
  onQuickOrder,
  onAddToCart
}) {
  // Select default weight variant or the first one
  const defaultWeight = product.weights?.find((w) => w.isDefault) || product.weights?.[0] || {
    label: '৫০০ গ্রাম',
    price: product.price || 0,
    oldPrice: product.oldPrice || 0
  };

  const [selectedWeight, setSelectedWeight] = useState(defaultWeight);
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const currentPrice = selectedWeight?.price ?? product.price ?? 0;
  const currentOldPrice = selectedWeight?.oldPrice ?? product.oldPrice ?? 0;
  const discountPercent = currentOldPrice > currentPrice 
    ? Math.round(((currentOldPrice - currentPrice) / currentOldPrice) * 100) 
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddedAnim(true);
    if (onAddToCart) {
      onAddToCart(product, selectedWeight);
    }
    setTimeout(() => setIsAddedAnim(false), 1200);
  };

  const handleQuickOrder = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickOrder) {
      onQuickOrder(product, selectedWeight);
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-emerald-100/80 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(5,92,50,0.10)] transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start pointer-events-none">
        {product.badge && (
          <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shadow-sm ${
            product.badgeType === 'hot' 
              ? 'bg-rose-500 text-white' 
              : product.badgeType === 'deal' 
              ? 'bg-amber-500 text-white' 
              : 'bg-[#055C32] text-white'
          }`}>
            {product.badge}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-sm">
            {discountPercent}% ছাড়
          </span>
        )}
      </div>

      {/* Lab Tested Pill */}
      {product.labTested && (
        <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span className="hidden sm:inline">ল্যাব টেস্টেড</span>
          </span>
        </div>
      )}

      {/* Product Image Clickable Link */}
      <Link 
        to={`/organic/product/${product.id}`}
        className="block relative w-full pt-[95%] overflow-hidden bg-gradient-to-b from-stone-50 to-emerald-50/20"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.webp';
          }}
        />
      </Link>

      {/* Card Details Body */}
      <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Category tag & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500 mb-1 gap-1">
            <span className="text-emerald-700 font-medium truncate">
              {product.categoryBn || 'অর্গানিক'}
            </span>
            <div className="flex items-center gap-1 shrink-0 text-amber-500">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-stone-700 text-[11px] sm:text-xs">{product.rating || 4.9}</span>
              <span className="text-stone-400 text-[9px] sm:text-[10px]">({product.ratingCount || 120})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link 
            to={`/organic/product/${product.id}`}
            className="block font-bold text-stone-900 text-xs sm:text-sm hover:text-[#055C32] transition-colors line-clamp-2 min-h-[32px] sm:min-h-[40px] leading-snug"
            title={product.title}
          >
            {product.title}
          </Link>

          {/* Weight Variant Selector Pills (Ghorer Bazar Signature Feature) */}
          {product.weights && product.weights.length > 1 && (
            <div className="mt-2 sm:mt-2.5">
              <div className="text-[9px] sm:text-[10px] text-stone-500 font-medium mb-1">ওজন নির্বাচন করুন:</div>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {product.weights.map((weight) => {
                  const isSelected = selectedWeight?.label === weight.label;
                  return (
                    <button
                      key={weight.label}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedWeight(weight);
                      }}
                      className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[11px] font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#055C32] text-white border-[#055C32] shadow-xs scale-102'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                      }`}
                    >
                      {weight.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Single Weight Badge if only 1 weight */}
          {product.weights && product.weights.length === 1 && (
            <div className="mt-1.5 sm:mt-2">
              <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-emerald-50 text-[#055C32] text-[9px] sm:text-[10px] font-semibold border border-emerald-200">
                প্যাক: {product.weights[0].label}
              </span>
            </div>
          )}
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-2.5 pt-2 border-t border-emerald-50">
          {/* Price display */}
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-sm sm:text-base md:text-lg font-black text-[#055C32] font-mono">
              ৳{currentPrice.toLocaleString('bn-BD')}
            </span>
            {currentOldPrice > currentPrice && (
              <span className="text-[10px] sm:text-xs text-stone-400 line-through font-mono">
                ৳{currentOldPrice.toLocaleString('bn-BD')}
              </span>
            )}
          </div>

          {/* Dual Action CTAs (Ghorer Bazar Style) */}
          <div className="grid grid-cols-2 gap-1 sm:gap-2">
            {/* 1. Quick COD Order Button */}
            <button
              type="button"
              onClick={handleQuickOrder}
              className="w-full py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl bg-[#055C32] hover:bg-[#077842] active:scale-95 text-white font-bold text-[10px] sm:text-xs flex items-center justify-center gap-0.5 sm:gap-1 shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 fill-amber-300 shrink-0" />
              <span className="truncate">অর্ডার<span className="hidden sm:inline"> করুন</span></span>
            </button>

            {/* 2. Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl border text-[10px] sm:text-xs font-bold flex items-center justify-center gap-0.5 sm:gap-1 transition-all cursor-pointer ${
                isAddedAnim
                  ? 'bg-emerald-600 text-white border-emerald-600 scale-98'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-[#055C32] border-emerald-200 hover:border-emerald-300 active:scale-95'
              }`}
            >
              {isAddedAnim ? (
                <>
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="truncate">যোগ হয়েছে</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#055C32] shrink-0" />
                  <span className="truncate">কার্ট<span className="hidden sm:inline">ে রাখুন</span></span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
