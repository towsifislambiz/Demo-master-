const fs = require('fs');
const path = require('path');

// 1. KicksCraftProductDetailsPage.jsx
const productDetailsContent = `import React, { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  Star, ShoppingBag, Zap, ShieldCheck, RefreshCw, Truck, 
  PackageCheck, Heart, ArrowLeft, ChevronRight, X, 
  ZoomIn, Check, Flame, HelpCircle, PhoneCall 
} from 'lucide-react';
import KicksCraftHeader from './KicksCraftHeader';
import KicksCraftFooter from './KicksCraftFooter';
import KicksCraftCartDrawer from './KicksCraftCartDrawer';
import KicksCraftProductCard from './KicksCraftProductCard';
import { FOOTWEAR_PRODUCTS, FOOTWEAR_BRAND } from '../../data/footwearData';

export default function KicksCraftProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const product = FOOTWEAR_PRODUCTS.find((p) => p.id === productId) || FOOTWEAR_PRODUCTS[0];

  // States
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : 42);
  const [quantity, setQuantity] = useState(1);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Mouse Magnifier Zoom Lens
  const [zoomStyle, setZoomStyle] = useState({});
  const [isHovering, setIsHovering] = useState(false);
  const imageContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: \`\${x}% \${y}%\`,
      transform: 'scale(2.2)'
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center center' });
  };

  // Add to Cart
  const handleAddToCart = () => {
    addToCart({
      id: \`\${product.id}-size-\${selectedSize}\`,
      productId: product.id,
      title: product.nameBn,
      nameEn: product.nameEn,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: product.brandName,
      selectedSize: selectedSize,
      quantity: quantity,
      niche: 'footwear'
    });
    setIsAdded(true);
    setCartDrawerOpen(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Direct 1-Click Buy
  const handleDirectBuy = () => {
    addToCart({
      id: \`\${product.id}-size-\${selectedSize}\`,
      productId: product.id,
      title: product.nameBn,
      nameEn: product.nameEn,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: product.brandName,
      selectedSize: selectedSize,
      quantity: quantity,
      niche: 'footwear'
    });
    navigate('/footwear/checkout');
  };

  // Related Sneakers (Same brand or category, excluding current)
  const relatedProducts = FOOTWEAR_PRODUCTS
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-slate-800">
      
      {/* 1. Header */}
      <KicksCraftHeader 
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* 2. Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-2.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 overflow-x-auto no-scrollbar">
          <Link to="/footwear" className="hover:text-orange-600 transition-colors">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/footwear/shop" className="hover:text-orange-600 transition-colors">ফুটওয়্যার</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-slate-400 shrink-0">{product.brandName}</span>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[#FF4800] font-bold truncate">{product.nameBn}</span>
        </div>
      </div>

      {/* 3. Main Product Details View */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Image Zoom Showcase (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Interactive Zoomable Image Box */}
            <div 
              ref={imageContainerRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              onClick={() => setIsZoomModalOpen(true)}
              className="relative w-full aspect-square bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-6 sm:p-10 flex items-center justify-center cursor-zoom-in select-none group"
            >
              {/* Floating Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-[#0B0F17] text-orange-400 shadow">
                  {product.brandName}
                </span>
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#FF4800] text-white">
                    {product.badge}
                  </span>
                )}
              </div>

              {product.discountPercent && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-[#FF4800] to-amber-500 text-white shadow-md">
                    -{product.discountPercent}% ছাড়
                  </span>
                </div>
              )}

              {/* The Zoomable Sneaker Image */}
              <img
                src={product.image}
                alt={product.nameEn}
                style={isHovering ? zoomStyle : { transition: 'transform 0.3s ease' }}
                className="w-full h-full object-contain pointer-events-none"
              />

              {/* Live Zoom Instruction Badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5 shadow pointer-events-none group-hover:opacity-0 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5 text-orange-400" />
                <span>মাউস ঘুরিয়ে জুম করুন • ক্লিক করে ফুলস্ক্রিন</span>
              </div>
            </div>

            {/* Trust Pillars under Image */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-xs font-bold text-slate-800">১০০% আসল</span>
                <span className="text-[10px] text-slate-400">অথেনটিক সার্টিফাইড</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center flex flex-col items-center">
                <RefreshCw className="w-5 h-5 text-orange-600 mb-1" />
                <span className="text-xs font-bold text-slate-800">৭ দিনের এক্সচেঞ্জ</span>
                <span className="text-[10px] text-slate-400">সহজ সাইজ রিটার্ন</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center flex flex-col items-center">
                <PackageCheck className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-xs font-bold text-slate-800">ডাবল বক্স প্যাক</span>
                <span className="text-[10px] text-slate-400">সুরক্ষিত ডেলিভারি</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sneaker Details, Sizing, & Conversion Order Form (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Title & Brand */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-orange-100 text-[#FF4800]">
                  {product.categoryName}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-bold text-slate-500 font-mono">
                  SKU: {product.id.toUpperCase()}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {product.nameBn}
              </h1>
              
              <p className="text-sm font-semibold text-slate-500 mt-1">
                {product.nameEn} {product.colorway && \`• \${product.colorway}\`}
              </p>
            </div>

            {/* Ratings & Urgency Stock Banner */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 font-bold text-xs">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">({product.reviewsCount} টি রিভিউ)</span>
              </div>

              {product.stock <= 5 && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-black animate-pulse">
                  <Flame className="w-4 h-4 text-red-600" />
                  <span>স্টকে মাত্র {product.stock} জোড়া অবশিষ্ট আছে!</span>
                </div>
              )}
            </div>

            {/* Pricing Section */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#0B0F17]">
                  ৳{product.price.toLocaleString('en-US')}
                </span>
                {product.originalPrice && (
                  <span className="text-base sm:text-lg text-slate-400 line-through font-mono">
                    ৳{product.originalPrice.toLocaleString('en-US')}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-[#FF4800] text-white">
                    -{product.discountPercent}% ছাড়
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-700 font-bold">
                ✓ আপনি পাচ্ছেন ৳{((product.originalPrice || product.price) - product.price).toLocaleString('en-US')} সাশ্রয়
              </p>
            </div>

            {/* Shoe Size Selection */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-slate-900 tracking-wider">
                    জুতার সাইজ নির্বাচন করুন (EU):
                  </span>
                  <span className="text-xs font-bold text-[#FF4800]">
                    বাছাইকৃত: EU {selectedSize}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>সাইজ গাইড</span>
                </button>
              </div>

              {/* Size Buttons */}
              <div className="flex flex-wrap gap-2">
                {product.sizes && product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={\`w-12 h-12 rounded-xl font-black text-sm transition-all flex flex-col items-center justify-center \${
                      selectedSize === size
                        ? 'bg-[#0B0F17] text-white shadow-md ring-2 ring-[#FF4800]'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/60'
                    }\`}
                  >
                    <span>{size}</span>
                    <span className="text-[9px] font-mono opacity-70">EU</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Dual Order CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600">পরিমাণ:</span>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-black font-mono text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary Direct Order Button */}
              <button
                type="button"
                onClick={handleDirectBuy}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF4800] to-[#FF6B00] hover:from-[#E03A00] hover:to-[#FF4800] text-white font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-white" />
                <span>সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার করুন</span>
              </button>

              {/* Secondary Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={\`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 border transition-all active:scale-95 cursor-pointer \${
                  isAdded
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300'
                }\`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ব্যাগে সফলভাবে যোগ হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#FF4800]" />
                    <span>কার্ট ব্যাগে যোগ করুন</span>
                  </>
                )}
              </button>
            </div>

            {/* Delivery Timeline Details Card */}
            <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Truck className="w-4 h-4 text-[#FF4800]" />
                <span>ডেলিভারি সংক্রান্ত তথ্য:</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                🏢 ঢাকা সিটির ভেতরে ডেলিভারি চার্জ মাত্র <strong>৳৭০</strong> (২৪-৪৮ ঘণ্টায় ডেলিভারি)।<br />
                🚚 ঢাকার বাইরে সারা দেশে ডেলিভারি চার্জ <strong>৳১৩০</strong> (২-৩ দিনে হোম ডেলিভারি)।<br />
                💵 পণ্য হাতে পেয়ে খুলে দেখে মূল্য পরিশোধ করার নিশ্চয়তা।
              </p>
            </div>

            {/* Technical Sneaker Specs Table */}
            {product.specs && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
                <h3 className="font-black text-xs uppercase text-slate-900 tracking-wider mb-3">
                  কারিগরি স্পেসিফিকেশন (Technical Specs)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">আপার উপাদান (Upper)</span>
                    <span className="font-bold text-slate-800">{product.specs.upper}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">মিডসোলে কুশনিং (Midsole)</span>
                    <span className="font-bold text-slate-800">{product.specs.midsole}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">আউটসোল গ্রিপ (Outsole)</span>
                    <span className="font-bold text-slate-800">{product.specs.outsole}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">ওজন ও উৎস (Weight/Origin)</span>
                    <span className="font-bold text-slate-800">{product.specs.weight} • {product.specs.origin}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Related Sneakers Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-14 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  সম্পর্কিত অন্যান্য স্নিকার্স
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">একই ব্র্যান্ড ও ক্যাটাগরির সেরা কালেকশন</p>
              </div>
              <Link 
                to="/footwear/shop" 
                className="text-xs font-bold text-[#FF4800] hover:underline flex items-center gap-1"
              >
                <span>সব দেখুন</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 2-column mobile grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {relatedProducts.map((p) => (
                <KicksCraftProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Mobile Sticky Bottom Purchase Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 block font-bold">বাছাইকৃত: EU {selectedSize}</span>
          <span className="text-lg font-black font-mono text-[#0B0F17]">
            ৳{product.price.toLocaleString('en-US')}
          </span>
        </div>
        <button
          type="button"
          onClick={handleDirectBuy}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF4800] to-[#FF6B00] text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 active:scale-95"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>অর্ডার করুন</span>
        </button>
      </div>

      {/* 6. Fullscreen High-Resolution Image Zoom Modal */}
      {isZoomModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={product.image}
              alt={product.nameEn}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl drop-shadow-2xl hover:scale-125 transition-transform duration-300 cursor-zoom-out"
              onClick={() => setIsZoomModalOpen(false)}
            />
            <p className="text-xs text-white/70 mt-4 font-mono">
              {product.nameEn} • {product.brandName} • হাই-রেজ্যুলেশন প্রিভিউ
            </p>
          </div>
        </div>
      )}

      {/* 7. Interactive Size Guide Modal */}
      {isSizeGuideOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsSizeGuideOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-black text-base text-slate-900">
                📏 জুতার সাইজ কনভার্সন চার্ট (Size Guide)
              </h3>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              আপনার পায়ের দৈর্ঘ্য অনুযায়ী নিখুঁত সাইজ নির্বাচন করুন। দ্বিধা থাকলে আমাদের নিয়মিত সাইজ নির্বাচন করুন অথবা হটলাইনে কল দিন।
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-2 border">EU সাইজ</th>
                    <th className="p-2 border">UK সাইজ</th>
                    <th className="p-2 border">US সাইজ</th>
                    <th className="p-2 border">দৈর্ঘ্য (CM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-mono">
                  {[
                    { eu: 39, uk: 5.5, us: 6.5, cm: 24.5 },
                    { eu: 40, uk: 6.0, us: 7.0, cm: 25.0 },
                    { eu: 41, uk: 7.0, us: 8.0, cm: 26.0 },
                    { eu: 42, uk: 7.5, us: 8.5, cm: 26.5 },
                    { eu: 43, uk: 8.5, us: 9.5, cm: 27.5 },
                    { eu: 44, uk: 9.5, us: 10.5, cm: 28.5 },
                    { eu: 45, uk: 10.5, us: 11.5, cm: 29.5 }
                  ].map((row) => (
                    <tr key={row.eu} className={selectedSize === row.eu ? 'bg-orange-50 font-bold text-[#FF4800]' : ''}>
                      <td className="p-2 border font-bold">{row.eu}</td>
                      <td className="p-2 border">{row.uk}</td>
                      <td className="p-2 border">{row.us}</td>
                      <td className="p-2 border">{row.cm} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>সরাসরি সাইজ পরামর্শের জন্য:</span>
              <a href={\`tel:\${FOOTWEAR_BRAND.hotline}\`} className="font-bold text-orange-600 flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{FOOTWEAR_BRAND.hotline}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 8. Footer */}
      <KicksCraftFooter />

      {/* 9. Cart Drawer */}
      <KicksCraftCartDrawer 
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </div>
  );
}
`;

// 2. KicksCraftCheckoutPage.jsx
const checkoutContent = `import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  CheckCircle2, Lock, ShieldCheck, Truck, ArrowLeft, 
  Sparkles, Tag, ShoppingBag, Clock, Phone, AlertCircle 
} from 'lucide-react';
import { FOOTWEAR_BRAND, FOOTWEAR_PRODUCTS } from '../../data/footwearData';

export default function KicksCraftCheckoutPage() {
  const navigate = useNavigate();
  const { cart = [], clearCart, addOrder } = useStore();

  // If cart is empty, populate with default featured product for seamless demo checkout
  const checkoutItems = cart.length > 0 ? cart : [
    {
      id: 'demo-nike-01',
      productId: 'kc-nike-01',
      title: 'নাইকি এয়ার জর্ডান ১ রেট্রো হাই ওজি',
      nameEn: 'Nike Air Jordan 1 Retro High OG Chicago',
      price: 8490,
      originalPrice: 11990,
      image: '/footwear-images/Retro_basketball_sneaker_studio___8667b319.jpg',
      brand: 'Nike / Jordan',
      selectedSize: 42,
      quantity: 1,
      niche: 'footwear'
    }
  ];

  // Form States
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('inside'); // 'inside' = 70, 'outside' = 130
  const [deliveryNote, setDeliveryNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'bkash'

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  // Validation & Order State
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // 15-Minute Urgency Timer Countdown
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Calculation
  const subtotal = checkoutItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  const isFreeDelivery = subtotal >= FOOTWEAR_BRAND.freeDeliveryThreshold;
  const deliveryCharge = isFreeDelivery 
    ? 0 
    : (deliveryArea === 'inside' ? FOOTWEAR_BRAND.deliveryInsideDhaka : FOOTWEAR_BRAND.deliveryOutsideDhaka);
  const grandTotal = Math.max(0, subtotal + deliveryCharge - discountAmount);

  // Handle Coupon Apply
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'KICKS10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscountAmount(disc);
      setCouponApplied(true);
    }
  };

  // Form Submission
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!customerName.trim()) {
      newErrors.customerName = 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন';
    }

    const cleanPhone = phone.trim().replace(/[-+\\s]/g, '');
    const phoneRegex = /^01[3-9]\\d{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01711223344)';
    }

    if (!address.trim() || address.trim().length < 8) {
      newErrors.address = 'অনুগ্রহ করে বিস্তারিত ডেলিভারি ঠিকানা লিখুন (বাড়ি/রোড/এলাকা)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const orderId = \`KC-\${Math.floor(100000 + Math.random() * 900000)}\`;
    const orderData = {
      id: orderId,
      orderId: orderId,
      niche: 'footwear',
      customerName: customerName.trim(),
      phone: cleanPhone,
      altPhone: altPhone.trim(),
      address: address.trim(),
      deliveryArea: deliveryArea === 'inside' ? 'ঢাকা সিটির ভেতরে' : 'ঢাকার বাইরে',
      deliveryCharge: deliveryCharge,
      paymentMethod: paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'বিকাশ পেমেন্ট',
      subtotal: subtotal,
      discount: discountAmount,
      total: grandTotal,
      status: 'Pending',
      date: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
      items: checkoutItems.map(item => ({
        id: item.productId || item.id,
        title: item.title,
        price: item.price,
        selectedSize: item.selectedSize || '42',
        quantity: item.quantity || 1,
        image: item.image,
        brand: item.brand
      }))
    };

    setTimeout(() => {
      addOrder(orderData);
      clearCart();
      setIsSubmitting(false);
      setConfirmedOrder(orderData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  // Success Confirmation Screen
  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans py-10 px-3 sm:px-6 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 text-center">
          
          {/* Animated Success Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-[#FF4800] mb-2 inline-block">
            অর্ডারটি সফল হয়েছে!
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            অভিনন্দন, {confirmedOrder.customerName}!
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            আপনার স্নিকার্স বুকিং সফলভাবে গ্রহণ করা হয়েছে। আমাদের কাস্টমার সার্ভিস প্রতিনিধি খুব শীঘ্রই আপনার মোবাইল নম্বরে (<strong className="font-mono text-slate-800">{confirmedOrder.phone}</strong>) কল করে অর্ডারটি কনফার্ম করবেন।
          </p>

          {/* Tracking Ticket Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0F17] text-white text-left mb-6 space-y-2.5">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-xs text-slate-400 font-medium">অর্ডার ট্র্যাকিং আইডি:</span>
              <span className="font-mono font-black text-orange-400 text-sm tracking-wider">
                {confirmedOrder.orderId}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">ডেলিভারি ঠিকানা:</span>
              <span className="font-medium text-slate-200 text-right truncate max-w-[200px]">
                {confirmedOrder.address}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">পেমেন্ট মেথড:</span>
              <span className="font-bold text-emerald-400">{confirmedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-300 font-bold">মোট প্রদেয় বিল:</span>
              <span className="font-mono font-black text-lg text-white">
                ৳{confirmedOrder.total.toLocaleString('en-US')}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/footwear"
              className="flex-1 py-3 rounded-xl bg-[#0B0F17] hover:bg-black text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>হোমপেজে ফিরে যান</span>
            </Link>
            <Link
              to="/footwear/shop"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF4800] to-[#FF6B00] text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <span>আরো স্নিকার্স দেখুন</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      
      {/* 1. Checkout Top Clean Brand Header */}
      <header className="bg-[#0B0F17] text-white py-3.5 px-3 sm:px-6 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/footwear" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#FF4800] text-white flex items-center justify-center font-black italic">
              KC
            </div>
            <span className="font-black text-lg tracking-tight uppercase">
              Kicks<span className="text-[#FF4800]">Craft</span> BD
            </span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold hidden sm:inline">২৫৬-বিট এনক্রিপ্টেড সিকিউর চেকআউট</span>
            <span className="font-semibold sm:hidden">সিকিউর চেকআউট</span>
          </div>
        </div>
      </header>

      {/* 2. Step Progress Bar & Urgency Timer */}
      <div className="bg-white border-b border-slate-200 py-3 px-3 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          
          {/* Visual Step Tracker */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span className="text-emerald-600 flex items-center gap-1">
              ✓ ১. ব্যাগ পর্যালোচনা
            </span>
            <span>➔</span>
            <span className="text-[#FF4800] flex items-center gap-1">
              ২. ডেলিভারি ও পেমেন্ট
            </span>
            <span>➔</span>
            <span className="text-slate-400">৩. কনফার্মেশন</span>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>
              স্টক সংরক্ষিত আছে: <strong className="font-mono">{minutes}:{seconds < 10 ? \`0\${seconds}\` : seconds}</strong> মিনিট
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Form & Order Summary Grid */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Delivery & Payment Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Delivery Area Toggle Cards */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-black text-sm text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#FF4800]" />
                  <span>১. ডেলিভারির এলাকা নির্বাচন করুন</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setDeliveryArea('inside')}
                    className={\`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 \${
                      deliveryArea === 'inside'
                        ? 'border-[#FF4800] bg-orange-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }\`}
                  >
                    <input
                      type="radio"
                      name="deliveryArea"
                      checked={deliveryArea === 'inside'}
                      onChange={() => setDeliveryArea('inside')}
                      className="mt-1 text-[#FF4800] focus:ring-orange-500"
                    />
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                        🏢 ঢাকা সিটির ভেতরে
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        ২৪-৪৮ ঘণ্টায় ডেলিভারি চার্জ ৳৭০
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setDeliveryArea('outside')}
                    className={\`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 \${
                      deliveryArea === 'outside'
                        ? 'border-[#FF4800] bg-orange-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }\`}
                  >
                    <input
                      type="radio"
                      name="deliveryArea"
                      checked={deliveryArea === 'outside'}
                      onChange={() => setDeliveryArea('outside')}
                      className="mt-1 text-[#FF4800] focus:ring-orange-500"
                    />
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                        🚚 ঢাকার বাইরে (সারাদেশে)
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        ২-৩ দিনে হোম ডেলিভারি চার্জ ৳১৩০
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information Card */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-sm text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <span>২. গ্রাহকের নাম ও ডেলিভারি ঠিকানা</span>
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="যেমন: তানভীর আহমেদ"
                    className={\`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-colors \${
                      errors.customerName ? 'border-red-500 bg-red-50/40' : 'border-slate-200 focus:border-[#FF4800]'
                    }\`}
                  />
                  {errors.customerName && (
                    <span className="text-[11px] font-bold text-red-600 mt-1 block">
                      {errors.customerName}
                    </span>
                  )}
                </div>

                {/* Phone & Alt Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      মোবাইল নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="যেমন: 01711223344"
                      className={\`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono outline-none transition-colors \${
                        errors.phone ? 'border-red-500 bg-red-50/40' : 'border-slate-200 focus:border-[#FF4800]'
                      }\`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] font-bold text-red-600 mt-1 block">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      বিকল্প ফোন নম্বর (ঐচ্ছিক)
                    </label>
                    <input
                      type="tel"
                      value={altPhone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      placeholder="বিকল্প নম্বর থাকলে লিখুন"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono outline-none focus:border-[#FF4800]"
                    />
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="বাড়ি নং, রোড নং, ফ্ল্যাট, থানা ও জেলার নাম বিস্তারিত লিখুন..."
                    className={\`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-colors \${
                      errors.address ? 'border-red-500 bg-red-50/40' : 'border-slate-200 focus:border-[#FF4800]'
                    }\`}
                  />
                  {errors.address && (
                    <span className="text-[11px] font-bold text-red-600 mt-1 block">
                      {errors.address}
                    </span>
                  )}
                </div>

                {/* Quick Delivery Instruction Chips */}
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 mb-1.5">
                    ডেলিভারি সংক্রান্ত বিশেষ নির্দেশনা:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'অফিস টাইমে ডেলিভারি দিন',
                      'আসার আগে কল দিন',
                      'গেটম্যানের কাছে দিন',
                      'শুক্রবার ডেলিভারি চাই'
                    ].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setDeliveryNote(chip)}
                        className={\`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all \${
                          deliveryNote === chip
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }\`}
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Method Selection Card */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-black text-sm text-slate-900 uppercase tracking-wide">
                  ৩. পেমেন্ট পদ্ধতি বেছে নিন
                </h3>

                <div className="space-y-2.5">
                  <label className={\`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all \${
                    paymentMethod === 'cod'
                      ? 'border-[#FF4800] bg-orange-50/40'
                      : 'border-slate-200 hover:border-slate-300'
                  }\`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-[#FF4800] focus:ring-orange-500"
                      />
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                          💵 ক্যাশ অন ডেলিভারি (Cash on Delivery)
                        </span>
                        <span className="text-[11px] text-slate-500">
                          পণ্য হাতে পেয়ে দেখে ডেলিভারিম্যানের কাছে টাকা পরিশোধ করুন
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      সবচেয়ে নিরাপদ
                    </span>
                  </label>

                  <label className={\`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all \${
                    paymentMethod === 'bkash'
                      ? 'border-[#FF4800] bg-orange-50/40'
                      : 'border-slate-200 hover:border-slate-300'
                  }\`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'bkash'}
                        onChange={() => setPaymentMethod('bkash')}
                        className="text-[#FF4800] focus:ring-orange-500"
                      />
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                          📱 বিকাশ পেমেন্ট (bKash Gateway)
                        </span>
                        <span className="text-[11px] text-slate-500">
                          বিকাশ মার্চেন্ট গেটওয়ের মাধ্যমে ইনস্ট্যান্ট পেমেন্ট
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-100 text-pink-800">
                      ইনস্ট্যান্ট
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Sticky Order Summary Card */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-black text-sm text-slate-900 uppercase">
                    অর্ডার সারসংক্ষেপ ({checkoutItems.length} টি)
                  </h3>
                  <Link to="/footwear/shop" className="text-xs font-bold text-orange-600 hover:underline">
                    এডিট করুন
                  </Link>
                </div>

                {/* Items List */}
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto space-y-2">
                  {checkoutItems.map((item, idx) => (
                    <div key={idx} className="pt-2 first:pt-0 flex gap-3 items-center">
                      <div className="w-14 h-14 rounded-lg bg-slate-100 p-1 shrink-0 border border-slate-200 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 truncate">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <span className="font-mono font-bold bg-slate-100 px-1.5 py-0.2 rounded">
                            সাইজ: {item.selectedSize || '42'}
                          </span>
                          <span>পরিমাণ: {item.quantity || 1}</span>
                        </div>
                        <span className="font-mono font-black text-xs text-slate-900 mt-0.5 block">
                          ৳{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-US')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="কুপন কোড (যেমন: KICKS10)"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs uppercase font-mono outline-none focus:border-[#FF4800]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors"
                    >
                      প্রয়োগ
                    </button>
                  </div>
                  {couponApplied && (
                    <span className="text-[11px] font-bold text-emerald-600 block mt-1">
                      ✓ কুপন কোড প্রয়োগ হয়েছে! ১০% ছাড় পেয়েছেন।
                    </span>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>পণ্যের সাবটোটাল:</span>
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
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>কুপন ডিসকাউন্ট:</span>
                      <span className="font-mono">-৳{discountAmount.toLocaleString('en-US')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                    <span>সর্বমোট প্রদেয়:</span>
                    <span className="font-mono text-xl text-[#FF4800]">
                      ৳{grandTotal.toLocaleString('en-US')}
                    </span>
                  </div>
                </div>

                {/* Place Order CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF4800] to-[#FF6B00] hover:from-[#E03A00] hover:to-[#FF4800] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : \`অর্ডার কনফার্ম করুন (৳\${grandTotal.toLocaleString('en-US')})\`}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>কোনো অগ্রিম পেমেন্ট ছাড়াই অর্ডার সম্পন্ন করুন</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
`;

fs.writeFileSync(path.resolve('client/src/components/footwear/KicksCraftProductDetailsPage.jsx'), productDetailsContent, 'utf8');
fs.writeFileSync(path.resolve('client/src/components/footwear/KicksCraftCheckoutPage.jsx'), checkoutContent, 'utf8');

console.log('Successfully wrote ProductDetailsPage and CheckoutPage in UTF-8');
