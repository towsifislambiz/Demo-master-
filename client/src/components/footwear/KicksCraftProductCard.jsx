import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  Star, ShoppingBag, Zap, Eye, Check, ShieldCheck, Flame 
} from 'lucide-react';

export default function KicksCraftProductCard({ product, onQuickView }) {
  const navigate = useNavigate();
  const { addToCart } = useStore();
  
  // Default selected shoe size
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : 42);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleCardClick = () => {
    navigate(`/footwear/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: `${product.id}-size-${selectedSize}`,
      productId: product.id,
      title: product.nameBn,
      nameEn: product.nameEn,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: product.brandName,
      selectedSize: selectedSize,
      quantity: 1,
      niche: 'footwear'
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleDirectBuy = (e) => {
    e.stopPropagation();
    addToCart({
      id: `${product.id}-size-${selectedSize}`,
      productId: product.id,
      title: product.nameBn,
      nameEn: product.nameEn,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: product.brandName,
      selectedSize: selectedSize,
      quantity: 1,
      niche: 'footwear'
    });
    navigate('/footwear/checkout');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-orange-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Sneaker Image Box */}
      <div className="relative w-full aspect-square bg-[#F8FAFC] overflow-hidden p-3 flex items-center justify-center">
        
        {/* Floating Brand Pill */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/90 text-slate-800 shadow-sm border border-slate-200/80">
            {product.brandName}
          </span>
        </div>

        {/* Floating Discount & Status Badges */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col items-end gap-1">
          {product.discountPercent && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-[#FF4800] text-white shadow-sm">
              -{product.discountPercent}%
            </span>
          )}
          {product.badge && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#0B0F17] text-orange-400">
              {product.badge}
            </span>
          )}
        </div>

        {/* Interactive Sneaker Image */}
        <img
          src={product.image}
          alt={product.nameEn}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain object-center group-hover:scale-108 group-hover:-rotate-2 transition-transform duration-500 ease-out"
        />

        {/* Quick Zoom / View Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onQuickView) onQuickView(product);
            else navigate(`/footwear/product/${product.id}`);
          }}
          className="absolute bottom-2.5 right-2.5 p-2 rounded-xl bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          title="জুম প্রিভিউ"
        >
          <Eye className="w-4 h-4 text-slate-700" />
        </button>
      </div>

      {/* Card Details Body */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Rating & Stock Indicator */}
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || 4.9}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount || 85})</span>
            </div>
            {product.stock <= 5 && (
              <span className="text-[10px] font-bold text-red-500 flex items-center gap-0.5">
                <Flame className="w-3 h-3" />
                মাত্র {product.stock} জোড়া বাকি
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#FF4800] transition-colors line-clamp-1 leading-snug">
            {product.nameBn}
          </h3>

          <p className="text-[11px] text-slate-500 font-medium truncate mb-2.5">
            {product.nameEn}
          </p>

          {/* Interactive Shoe Size Chips */}
          <div className="mb-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
              <span>সাইজ (EU):</span>
              <span className="text-orange-600">বাছাইকৃত: {selectedSize}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              {product.sizes && product.sizes.slice(0, 5).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md text-[10px] sm:text-xs font-bold transition-all ${
                    selectedSize === size
                      ? 'bg-[#0B0F17] text-white ring-2 ring-[#FF4800]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & Action CTAs */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-baseline gap-2 mb-2.5">
            <span className="text-base sm:text-lg font-black font-mono text-[#0B0F17]">
              ৳{product.price.toLocaleString('en-US')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-mono">
                ৳{product.originalPrice.toLocaleString('en-US')}
              </span>
            )}
          </div>

          {/* Dual CTAs */}
          <div className="grid grid-cols-5 gap-1.5">
            {/* Quick Buy CTA */}
            <button
              type="button"
              onClick={handleDirectBuy}
              className="col-span-3 py-2 px-2 rounded-xl bg-gradient-to-r from-[#FF4800] to-[#FF6B00] hover:from-[#E03A00] hover:to-[#FF4800] text-white text-[11px] sm:text-xs font-black flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>অর্ডার</span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`col-span-2 py-2 px-2 rounded-xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 transition-all active:scale-95 ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
              }`}
              title="কার্টে যোগ করুন"
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>যুক্ত</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-slate-700" />
                  <span>কার্ট</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
