import React, { useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

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
      transformOrigin: `${x}% ${y}%`,
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
      id: `${product.id}-size-${selectedSize}`,
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
      id: `${product.id}-size-${selectedSize}`,
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
                decoding="async"
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
                {product.nameEn} {product.colorway && `• ${product.colorway}`}
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
                    className={`w-12 h-12 rounded-xl font-black text-sm transition-all flex flex-col items-center justify-center ${
                      selectedSize === size
                        ? 'bg-[#0B0F17] text-white shadow-md ring-2 ring-[#FF4800]'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/60'
                    }`}
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
                className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 border transition-all active:scale-95 cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300'
                }`}
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
              decoding="async"
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
              <a href={`tel:${FOOTWEAR_BRAND.hotline}`} className="font-bold text-orange-600 flex items-center gap-1">
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
