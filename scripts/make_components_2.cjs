const fs = require('fs');
const path = require('path');

// 1. KicksCraftCartDrawer.jsx
const cartDrawerContent = `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, 
  Sparkles, Plus, Minus, Tag, PhoneCall, Truck, Lock 
} from 'lucide-react';
import { FOOTWEAR_BRAND } from '../../data/footwearData';

export default function KicksCraftCartDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { cart = [], removeFromCart, updateQuantity, clearCart } = useStore();
  
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  const freeThreshold = FOOTWEAR_BRAND.freeDeliveryThreshold;
  const isFreeDelivery = subtotal >= freeThreshold;
  const neededForFree = Math.max(0, freeThreshold - subtotal);
  const freeProgress = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  const deliveryCharge = isFreeDelivery ? 0 : FOOTWEAR_BRAND.deliveryInsideDhaka;
  const grandTotal = Math.max(0, subtotal + deliveryCharge - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'KICKS10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscountAmount(disc);
      setCouponApplied(true);
    }
  };

  const handleProceedToCheckout = () => {
    onClose();
    navigate('/footwear/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#0B0F17] text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FF4800] flex items-center justify-center text-white shadow-sm">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-black text-base leading-none">আপনার শপিং ব্যাগ</h3>
                <span className="text-[11px] text-orange-400 font-bold">
                  {cart.length} জোড়া আইটেম যুক্ত রয়েছে
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="p-3.5 bg-orange-50/70 border-b border-orange-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#FF4800]" />
                {isFreeDelivery ? (
                  <span className="text-emerald-700">🎉 অভিনন্দন! আপনি ফ্রি ডেলিভারি পেয়েছেন!</span>
                ) : (
                  <span>
                    আর <strong className="text-[#FF4800]">৳{neededForFree}</strong> টাকার অর্ডারে ফ্রি ডেলিভারি
                  </span>
                )}
              </span>
              <span className="font-mono text-[11px] text-orange-600 font-black">{freeProgress}%</span>
            </div>
            <div className="w-full h-2 bg-orange-200/60 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF4800] to-amber-500 rounded-full transition-all duration-500"
                style={{ width: \`\${freeProgress}%\` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-base mb-1">ব্যাগটি সম্পূর্ণ খালি!</h4>
                <p className="text-xs text-slate-500 mb-5 max-w-xs">
                  আপনার পছন্দের স্নিকার বা লেদার শু এখনো ব্যাগে যোগ করেননি।
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate('/footwear/shop');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0B0F17] text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  কালেকশন ব্রাউজ করুন
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex gap-3 sm:gap-4 items-center">
                  {/* Sneaker Thumbnail */}
                  <div className="w-20 h-20 rounded-xl bg-slate-100 p-1.5 shrink-0 overflow-hidden border border-slate-200 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 mb-2">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        সাইজ: {item.selectedSize || '42'}
                      </span>
                      {item.brand && (
                        <span className="text-[10px] text-slate-400 font-medium">
                          {item.brand}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Price */}
                      <span className="font-black font-mono text-sm sm:text-base text-[#0B0F17]">
                        ৳{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-US')}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                          className="px-2 py-1 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold font-mono text-slate-800">
                          {item.quantity || 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="px-2 py-1 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Area with Promo & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/70 space-y-3">
              
              {/* Coupon Row */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="কুপন কোড (যেমন: KICKS10)"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs uppercase font-mono bg-white outline-none focus:border-[#FF4800]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors"
                >
                  প্রয়োগ
                </button>
              </form>
              {couponApplied && (
                <p className="text-[11px] font-bold text-emerald-600">
                  ✓ কুপন কোড সফলভাবে যোগ হয়েছে! (১০% ছাড়)
                </p>
              )}

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>সাবটোটাল:</span>
                  <span className="font-mono font-bold text-slate-800">৳{subtotal.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-mono font-bold">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-600 font-bold">ফ্রি (৳০)</span>
                    ) : (
                      \`৳\${deliveryCharge}\`
                    )}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>কুপন ডিসকাউন্ট:</span>
                    <span className="font-mono font-bold">-৳{discountAmount.toLocaleString('en-US')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span className="font-mono text-base text-[#FF4800]">৳{grandTotal.toLocaleString('en-US')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF4800] to-[#FF6B00] hover:from-[#E03A00] hover:to-[#FF4800] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>চেকআউটে এগিয়ে যান</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>ক্যাশ অন ডেলিভারি ও ১০০% সিকিউর ট্রানজেকশন</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`;

// 2. KicksCraftShopPage.jsx
const shopPageContent = `import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  SlidersHorizontal, Filter, X, Search, ArrowUpDown, 
  RotateCcw, Sparkles, Check, ChevronRight, Eye, 
  Zap, Star, ShieldCheck, Flame 
} from 'lucide-react';
import KicksCraftHeader from './KicksCraftHeader';
import KicksCraftFooter from './KicksCraftFooter';
import KicksCraftProductCard from './KicksCraftProductCard';
import KicksCraftCartDrawer from './KicksCraftCartDrawer';
import { 
  FOOTWEAR_PRODUCTS, FOOTWEAR_BRANDS, FOOTWEAR_CATEGORIES 
} from '../../data/footwearData';

export default function KicksCraftShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL Query Sync
  const initialBrand = searchParams.get('brand') || 'all';
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState('all'); // 'all', 'under3000', '3000_5000', '5000_7000', 'above7000'
  const [maxPrice, setMaxPrice] = useState(12000);
  const [selectedSize, setSelectedSize] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price_low', 'price_high', 'rating'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Drawers and Modals
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [zoomModalProduct, setZoomModalProduct] = useState(null);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return FOOTWEAR_PRODUCTS.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.nameBn.toLowerCase().includes(q) || item.nameEn.toLowerCase().includes(q);
        const matchBrand = item.brandName.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand) return false;
      }

      // 2. Brand
      if (selectedBrand !== 'all' && item.brand !== selectedBrand) {
        return false;
      }

      // 3. Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 4. Price Radio Range
      if (priceRange === 'under3000' && item.price >= 3000) return false;
      if (priceRange === '3000_5000' && (item.price < 3000 || item.price > 5000)) return false;
      if (priceRange === '5000_7000' && (item.price < 5000 || item.price > 7000)) return false;
      if (priceRange === 'above7000' && item.price <= 7000) return false;

      // 5. Max Price Slider
      if (item.price > maxPrice) return false;

      // 6. Size
      if (selectedSize !== 'all') {
        const sizeNum = Number(selectedSize);
        if (!item.sizes || !item.sizes.includes(sizeNum)) return false;
      }

      // 7. In Stock
      if (inStockOnly && !item.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // Default Featured
    });
  }, [searchQuery, selectedBrand, selectedCategory, priceRange, maxPrice, selectedSize, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setSelectedBrand('all');
    setSelectedCategory('all');
    setPriceRange('all');
    setMaxPrice(12000);
    setSelectedSize('all');
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  const activeFiltersCount = 
    (selectedBrand !== 'all' ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (selectedSize !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-slate-800">
      
      {/* 1. Header */}
      <KicksCraftHeader 
        activeCategory={selectedCategory}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* 2. Breadcrumb & Storefront Hero Header */}
      <div className="bg-[#0B0F17] text-white py-6 sm:py-8 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link to="/footwear" className="hover:text-orange-400 transition-colors">হোম</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-orange-400 font-bold">সকল জুতো ও স্নিকার্স কালেকশন</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2.5">
                <span>স্নিকার্স ও ফুটওয়্যার শপ</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#FF4800] text-white">
                  {filteredProducts.length} টি পণ্য
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Nike, Adidas Originals, New Balance, Puma ও Apex এর আসল কালেকশন ফিল্টার করে সহজে বেছে নিন।
              </p>
            </div>

            {/* Mobile Filter Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>ফিল্টার প্যানেল ({activeFiltersCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Body with Sidebar + 2-Column Responsive Product Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          
          {/* Left Desktop Sidebar Filter Panel */}
          <aside className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm sticky top-24 space-y-6">
            
            {/* Filter Header & Reset */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-[#FF4800]" />
                <span>ফিল্টার সেটিংস</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#FF4800] text-white text-[10px] flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>রিসেট</span>
                </button>
              )}
            </div>

            {/* A. Brand Selector Filter */}
            <div>
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider mb-2.5">
                ব্র্যান্ড নির্বাচন করুন
              </h3>
              <div className="space-y-1.5">
                {FOOTWEAR_BRANDS.map((b) => (
                  <label
                    key={b.id}
                    className={\`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors \${
                      selectedBrand === b.id
                        ? 'bg-orange-50 text-[#FF4800] border border-orange-200'
                        : 'hover:bg-slate-50 text-slate-700'
                    }\`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="brandFilter"
                        checked={selectedBrand === b.id}
                        onChange={() => setSelectedBrand(b.id)}
                        className="text-[#FF4800] focus:ring-orange-500"
                      />
                      <span>{b.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">({b.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* B. Price Range Radio Selector */}
            <div className="pt-3 border-t border-slate-100">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider mb-2.5">
                প্রাইস রেঞ্জ (মূল্য সীমা)
              </h3>
              <div className="space-y-1.5 text-xs font-semibold text-slate-700">
                {[
                  { id: 'all', label: 'সকল মূল্য সীমা' },
                  { id: 'under3000', label: '৳৩,০০০ এর নিচে' },
                  { id: '3000_5000', label: '৳৩,০০০ - ৳৫,০০০' },
                  { id: '5000_7000', label: '৳৫,০০০ - ৳৭,০০০' },
                  { id: 'above7000', label: '৳৭,০০০ এর উপরে' }
                ].map((range) => (
                  <label
                    key={range.id}
                    className={\`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-colors \${
                      priceRange === range.id ? 'bg-orange-50 text-[#FF4800] font-bold' : 'hover:bg-slate-50'
                    }\`}
                  >
                    <input
                      type="radio"
                      name="priceRadio"
                      checked={priceRange === range.id}
                      onChange={() => setPriceRange(range.id)}
                      className="text-[#FF4800] focus:ring-orange-500"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>

              {/* Range Slider for granular control */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                  <span>সর্বোচ্চ বাজেট:</span>
                  <span className="text-[#FF4800] font-mono">৳{maxPrice.toLocaleString('en-US')}</span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="12000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#FF4800] cursor-pointer"
                />
              </div>
            </div>

            {/* C. Shoe Size Selector Filter */}
            <div className="pt-3 border-t border-slate-100">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider mb-2.5">
                জুতার সাইজ (EU)
              </h3>
              <div className="grid grid-cols-4 gap-1.5">
                {['all', 39, 40, 41, 42, 43, 44, 45].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(String(s))}
                    className={\`py-1.5 rounded-lg text-xs font-bold transition-all \${
                      selectedSize === String(s)
                        ? 'bg-[#0B0F17] text-white shadow-sm ring-2 ring-[#FF4800]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }\`}
                  >
                    {s === 'all' ? 'সকল' : s}
                  </button>
                ))}
              </div>
            </div>

            {/* D. Stock Urgency Toggle */}
            <div className="pt-3 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#FF4800] focus:ring-orange-500 w-4 h-4"
                />
                <span>শুধুমাত্র ইনস্টক স্নিকার্স দেখান</span>
              </label>
            </div>
          </aside>

          {/* Right Main Product Area */}
          <main className="lg:col-span-3">
            
            {/* Top Toolbar: Sorting & Count */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  মোট পাওয়া গেছে:
                </span>
                <span className="text-xs font-black text-slate-900 px-2 py-0.5 rounded-md bg-orange-100 text-[#FF4800]">
                  {filteredProducts.length} জোড়া জুতো
                </span>
              </div>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>সাজান:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold outline-none focus:border-[#FF4800]"
                >
                  <option value="featured">জনপ্রিয় / ফিচার্ড</option>
                  <option value="price_low">মূল্য: কম থেকে বেশি</option>
                  <option value="price_high">মূল্য: বেশি থেকে কম</option>
                  <option value="rating">সর্বোচ্চ রেটিং</option>
                </select>
              </div>
            </div>

            {/* Products Grid: 2 COLUMNS ON MOBILE (grid-cols-2), 3 on tablet, 3 on desktop */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FF4800] flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-black text-lg text-slate-800 mb-1">
                  কোনো স্নিকার পাওয়া যায়নি!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  আপনার নির্বাচিত ফিল্টার শর্ত অনুযায়ী এই মুহূর্তে কোনো পণ্য নেই। ফিল্টার রিসেট করে আবার চেষ্টা করুন।
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2 rounded-xl bg-[#0B0F17] text-white text-xs font-bold"
                >
                  সব ফিল্টার রিসেট করুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                {filteredProducts.map((product) => (
                  <KicksCraftProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setZoomModalProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 4. Interactive Product Zoom Modal (when clicking Eye icon) */}
      {zoomModalProduct && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomModalProduct(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomModalProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
              
              {/* Zoomable Image Container */}
              <div className="relative aspect-square rounded-xl bg-slate-50 border border-slate-200 p-4 flex items-center justify-center overflow-hidden group cursor-zoom-in">
                <img
                  src={zoomModalProduct.image}
                  alt={zoomModalProduct.nameEn}
                  className="w-full h-full object-contain group-hover:scale-150 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded">
                  🔍 মাউস নিয়ে জুম করুন
                </span>
              </div>

              {/* Details Info */}
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-orange-100 text-[#FF4800] mb-2 inline-block">
                  {zoomModalProduct.brandName}
                </span>
                <h3 className="font-black text-base sm:text-lg text-slate-900 leading-snug mb-1">
                  {zoomModalProduct.nameBn}
                </h3>
                <p className="text-xs text-slate-500 mb-3">{zoomModalProduct.nameEn}</p>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-black font-mono text-[#0B0F17]">
                    ৳{zoomModalProduct.price.toLocaleString('en-US')}
                  </span>
                  {zoomModalProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through font-mono">
                      ৳{zoomModalProduct.originalPrice.toLocaleString('en-US')}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-3">
                  {zoomModalProduct.description}
                </p>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setZoomModalProduct(null);
                      navigate(\`/footwear/product/\${zoomModalProduct.id}\`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#0B0F17] text-white text-xs font-bold hover:bg-black transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>সম্পূর্ণ বিস্তারিত ও সাইজ দেখুন</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Mobile Filter Drawer Sheet */}
      {mobileFilterOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end"
          onClick={() => setMobileFilterOpen(false)}
        >
          <div 
            className="w-4/5 max-w-sm h-full bg-white p-5 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-[#FF4800]" />
                  <span>ফিল্টার প্যানেল</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-md text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Brand Mobile Radio */}
              <div className="mb-5">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-2">ব্র্যান্ড</span>
                <div className="space-y-1">
                  {FOOTWEAR_BRANDS.map((b) => (
                    <label 
                      key={b.id} 
                      className="flex items-center justify-between py-1 text-xs font-bold text-slate-700"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobileBrand"
                          checked={selectedBrand === b.id}
                          onChange={() => setSelectedBrand(b.id)}
                          className="text-[#FF4800]"
                        />
                        <span>{b.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">({b.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Mobile Radio */}
              <div className="mb-5">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-2">প্রাইস রেঞ্জ</span>
                <div className="space-y-1 text-xs font-semibold text-slate-700">
                  {[
                    { id: 'all', label: 'সকল মূল্য সীমা' },
                    { id: 'under3000', label: '৳৩,০০০ এর নিচে' },
                    { id: '3000_5000', label: '৳৩,০০০ - ৳৫,০০০' },
                    { id: '5000_7000', label: '৳৫,০০০ - ৳৭,০০০' },
                    { id: 'above7000', label: '৳৭,০০০ এর উপরে' }
                  ].map((range) => (
                    <label key={range.id} className="flex items-center gap-2 py-1">
                      <input
                        type="radio"
                        name="mobilePrice"
                        checked={priceRange === range.id}
                        onChange={() => setPriceRange(range.id)}
                        className="text-[#FF4800]"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-1/2 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                রিসেট
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 rounded-xl bg-[#FF4800] text-white font-bold text-xs"
              >
                প্রয়োগ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Footer */}
      <KicksCraftFooter />

      {/* 7. Cart Drawer */}
      <KicksCraftCartDrawer 
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </div>
  );
}
`;

fs.writeFileSync(path.resolve('client/src/components/footwear/KicksCraftCartDrawer.jsx'), cartDrawerContent, 'utf8');
fs.writeFileSync(path.resolve('client/src/components/footwear/KicksCraftShopPage.jsx'), shopPageContent, 'utf8');

console.log('Successfully wrote KicksCraftCartDrawer and KicksCraftShopPage in UTF-8');
