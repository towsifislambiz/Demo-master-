import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Heart, Star, ShieldCheck, Truck, RotateCcw, 
  Sparkles, MessageCircle, ChevronRight, Check, CheckCircle2, 
  Plus, Minus, ArrowRight, Share2, Eye, Award, Leaf, Droplets,
  Flame, Lock, Clock, Info, AlertCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { RIBANA_PRODUCTS, RIBANA_DEPARTMENTS } from '../../data/ribanaBeautyData';
import RibanaHeader from './RibanaHeader';
import RibanaCartDrawer from './RibanaCartDrawer';

export default function RibanaProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { 
    addToCart, 
    wishlist = [], 
    toggleWishlist, 
    isInWishlist, 
    setIsCartOpen,
    ribanaProducts = RIBANA_PRODUCTS 
  } = useStore();

  const productList = ribanaProducts && ribanaProducts.length > 0 ? ribanaProducts : RIBANA_PRODUCTS;
  const product = productList.find((p) => p.id === productId) || productList[0];
  const isLiked = isInWishlist(product.id);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.size || '30ml');
  const [activeTab, setActiveTab] = useState('ingredients');
  const [addedAlert, setAddedAlert] = useState(false);
  const [liveViewers, setLiveViewers] = useState(18);

  // Gallery images array
  const gallery = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  // Fluctuate viewers realistically for social proof
  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setLiveViewers((prev) => Math.max(12, Math.min(28, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 4500);
    return () => clearInterval(interval);
  }, [productId]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, { size: selectedSize });
    }
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2400);
  };

  const handleBuyNow = () => {
    addToCart(product, { size: selectedSize });
    navigate('/beauty/checkout');
  };

  const handleWhatsAppConsultation = () => {
    const text = `আসসালামু আলাইকুম! আমি RiBANA Organic-এর "${product.title}" সম্পর্কে বিস্তারিত জানতে ও অর্ডার করতে চাই।`;
    window.open(`https://wa.me/8801711223344?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Curated Related products
  const relatedProducts = productList.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.concern === product.concern)
  ).slice(0, 3);

  // Category name in Bengali
  const categoryDept = RIBANA_DEPARTMENTS.find((d) => d.id === product.category);
  const categoryTitle = categoryDept ? categoryDept.titleBn : 'স্কিনকেয়ার কালেকশন';

  return (
    <div className="min-h-screen bg-[#FFF8F5] text-[#2D1B22] font-sans selection:bg-[#F3D5D0] selection:text-[#35252A] flex flex-col justify-between">
      {/* 1. Master Header */}
      <RibanaHeader />

      {/* 2. Floating Add-To-Cart Alert Toast */}
      <AnimatePresence>
        {addedAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 sm:right-8 z-50 bg-[#2D1B22] text-white px-5 py-3 rounded-2xl shadow-2xl border border-pink-300/30 flex items-center gap-3 backdrop-blur-xl"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold font-serif">{product.title}</p>
              <p className="text-[10px] text-pink-200">সফলভাবে আপনার বিউটি ব্যাগে যোগ করা হয়েছে!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pb-28 md:pb-16 space-y-12 sm:space-y-16">
        {/* 3. Luxury Haute Editorial Breadcrumb */}
        <div className="border-b border-[#F0D5CC]/80 bg-white/70 backdrop-blur-md">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-xs text-[#7A5B63]">
            <ol className="flex items-center space-x-2 flex-wrap">
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
                  {categoryTitle}
                </button>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5 text-[#B89FA5]" /></li>
              <li className="font-bold text-[#8E2A3E] truncate max-w-xs sm:max-w-md">
                {product.title}
              </li>
            </ol>
          </nav>
        </div>

        {/* 4. Product Hero Showcase: Dual-Column Atelier Architecture */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ====================================================
                LEFT COLUMN: Studio Gallery & Trust Accents (5 Cols)
                ==================================================== */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Main Primary Viewport Frame */}
              <div 
                className="relative aspect-[4/4.3] w-full rounded-[32px] border border-[#F0D5CC] shadow-[0_16px_40px_rgba(53,35,38,0.08)] overflow-hidden flex items-center justify-center p-6 select-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.95) 0%, ${product.bgTone || '#F8EAE0'} 65%, #FFF5EF 100%)`
                }}
              >
                {/* Ambient Warm Halo Glow */}
                <div 
                  className="absolute w-64 h-64 rounded-full blur-3xl opacity-70 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(255,225,185,0.85) 0%, rgba(244,180,195,0.45) 60%, transparent 100%)' }}
                />

                {/* Active Product Image */}
                <motion.img
                  key={activeImageIdx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={gallery[activeImageIdx] || product.image}
                  alt={product.title}
                  className="relative z-1 max-h-[340px] sm:max-h-[380px] w-auto object-contain object-center drop-shadow-[0_16px_30px_rgba(53,37,42,0.16)]"
                />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-1.5 z-10 pointer-events-none">
                  <span 
                    className="px-3.5 py-1 rounded-full text-[#2D1B22] font-mono text-[10.5px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-xs border border-[#F5D89F]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 249, 235, 0.95) 0%, rgba(255, 238, 245, 0.95) 50%, rgba(235, 249, 255, 0.95) 100%)'
                    }}
                  >
                    <span className="text-amber-500 text-xs">👑</span>
                    <span>{product.badge || 'BESTSELLER #01'}</span>
                  </span>

                  {product.discount && (
                    <span 
                      className="px-2.5 py-1 rounded-full text-white font-mono text-[11px] font-extrabold tracking-tight border-t border-white/40"
                      style={{
                        background: 'linear-gradient(180deg, #BA3E50 0%, #961A2B 55%, #751221 100%)',
                        boxShadow: '0 4px 14px rgba(150, 26, 43, 0.4)'
                      }}
                    >
                      {product.discount}
                    </span>
                  )}
                </div>

                {/* Floating Wishlist Heart */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#241518] flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-20 shadow-[0_4px_14px_rgba(0,0,0,0.1)] border border-white cursor-pointer backdrop-blur-md"
                  title={isLiked ? 'উইশলিস্ট থেকে সরান' : 'উইশলিস্টে যোগ করুন'}
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      isLiked ? 'fill-[#BA3E50] text-[#BA3E50]' : 'text-[#4A3238]'
                    }`}
                  />
                </button>
              </div>

              {/* Thumbnails Carousel */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all p-1.5 bg-white shrink-0 cursor-pointer ${
                        activeImageIdx === idx 
                          ? 'border-[#8E2A3E] ring-2 ring-[#8E2A3E]/20 shadow-md scale-105' 
                          : 'border-[#F0D5CC] opacity-70 hover:opacity-100 hover:border-[#8E2A3E]/50'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt="" 
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 rounded-2xl bg-white/90 border border-[#F0D5CC] text-center space-y-1 shadow-2xs">
                  <Leaf className="w-4 h-4 text-emerald-600 mx-auto" />
                  <p className="text-[11px] font-bold text-[#241518]">১০০% অর্গানিক</p>
                  <p className="text-[9.5px] text-[#7A5B63]">কোনো ক্ষতিকর কেমিক্যাল নেই</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/90 border border-[#F0D5CC] text-center space-y-1 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#8E2A3E] mx-auto" />
                  <p className="text-[11px] font-bold text-[#241518]">BSTI অনুমোদিত</p>
                  <p className="text-[9.5px] text-[#7A5B63]">ল্যাব টেস্টে শতভাগ নিরাপদ</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/90 border border-[#F0D5CC] text-center space-y-1 shadow-2xs">
                  <Truck className="w-4 h-4 text-amber-600 mx-auto" />
                  <p className="text-[11px] font-bold text-[#241518]">ক্যাশ অন ডেলিভারি</p>
                  <p className="text-[9.5px] text-[#7A5B63]">হাতে পেয়ে মূল্য পরিশোধ</p>
                </div>
              </div>

            </div>

            {/* ====================================================
                RIGHT COLUMN: Product Value, Pricing & Action Suite (7 Cols)
                ==================================================== */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Eyebrow & Live Social Proof */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#FAF0E8] border border-[#EEDCD2] text-[#8E2A3E] font-mono text-[11px] font-bold tracking-wider uppercase">
                    ✦ RIBANA ATELIER • {product.skinType}
                  </span>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[11px] font-bold text-amber-900 shadow-2xs">
                    <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    <span>{liveViewers} জন এই মুহূর্তে দেখছেন</span>
                  </div>
                </div>

                {/* Main Titles */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-[#241518] leading-[1.25]">
                  {product.title}
                </h1>
                <p className="text-sm font-mono text-[#8C6D74] font-medium">
                  {product.titleEn}
                </p>

                {/* Star Ratings & Verified Badge */}
                <div className="flex items-center gap-3 pt-1 flex-wrap">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50/90 border border-amber-200/80 text-xs font-black text-[#7A4E0B]">
                    <Star className="w-4 h-4 fill-[#E5A824] text-[#E5A824]" />
                    <span>{product.rating}</span>
                    <span className="text-[#8C6D45] font-normal text-[11px]">({product.reviews || 284} ভেরিফাইড রিভিউ)</span>
                  </div>

                  <span className="text-xs text-[#7A5B63] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ইন স্টক • রেডি ফর ডেলিভারি</span>
                  </span>
                </div>
              </div>

              {/* Price Shelf & Savings Capsule */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-white via-[#FFF8F5] to-white border border-[#F0D5CC] shadow-xs space-y-2">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl sm:text-4xl font-black font-serif text-[#8E2A3E] tracking-tight">
                    ৳{product.price.toLocaleString('en-US')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base sm:text-lg text-[#8C757B] line-through font-mono">
                      ৳{product.originalPrice.toLocaleString('en-US')}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span 
                      className="text-xs font-mono font-black px-2.5 py-0.8 rounded-md text-[#8C5814] border border-[#EACFA8] shadow-2xs"
                      style={{ background: 'linear-gradient(90deg, #FFF5E8 0%, #FFE9CF 100%)' }}
                    >
                      সাশ্রয় ৳{(product.originalPrice - product.price).toLocaleString('en-US')}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#7A5B63] flex items-center gap-1.5 font-light">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8E2A3E]" />
                  <span>ভ্যাট ও ট্যাক্স অন্তর্ভুক্ত • ৳১,৫০০+ অর্ডারে সম্পূর্ণ ফ্রি ডেলিভারি</span>
                </p>
              </div>

              {/* Short Description */}
              <p className="text-sm text-[#5C454B] leading-relaxed font-light">
                {product.shortDesc}
              </p>

              {/* Size / Volume Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-serif">
                  <span className="font-bold text-[#241518]">সাইজ / পরিমাণ নির্বাচন করুন:</span>
                  <span className="font-mono text-[#8E2A3E] font-bold">{selectedSize}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedSize(product.size || '30ml')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedSize === (product.size || '30ml')
                        ? 'bg-[#8E2A3E] text-white border-[#8E2A3E] shadow-sm'
                        : 'bg-white text-[#241518] border-[#F0D5CC] hover:bg-[#FAF0E8]'
                    }`}
                  >
                    {product.size || '30ml'} (স্ট্যান্ডার্ড সাইজ)
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSize('৫০ মিলি (ভ্যালু প্যাক)')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedSize === '৫০ মিলি (ভ্যালু প্যাক)'
                        ? 'bg-[#8E2A3E] text-white border-[#8E2A3E] shadow-sm'
                        : 'bg-white text-[#241518] border-[#F0D5CC] hover:bg-[#FAF0E8]'
                    }`}
                  >
                    ৫০ মিলি (ভ্যালু প্যাক • ২০% সাশ্রয়)
                  </button>
                </div>
              </div>

              {/* Quantity Counter & Primary CTA Suite */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  
                  {/* Quantity Counter */}
                  <div className="flex items-center space-x-2 bg-white border border-[#F0D5CC] rounded-full p-1.5 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-full bg-[#FAF0E8] hover:bg-[#8E2A3E] hover:text-white flex items-center justify-center transition-colors cursor-pointer text-[#241518]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-mono font-black text-[#241518] min-w-[28px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="w-8 h-8 rounded-full bg-[#FAF0E8] hover:bg-[#8E2A3E] hover:text-white flex items-center justify-center transition-colors cursor-pointer text-[#241518]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 1. SHOWSTOPPER NEON AURORA CTA BUTTON */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-full text-white font-black text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 relative group/btn"
                    style={{
                      background: 'linear-gradient(135deg, #2D1B22 0%, #3D1F28 50%, #1F1216 100%)',
                      boxShadow: '0 0 18px 3px rgba(244, 63, 94, 0.6), 0 0 30px 4px rgba(168, 85, 247, 0.4), 0 0 12px 1px rgba(56, 189, 248, 0.35)'
                    }}
                  >
                    <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none group-hover/btn:border-pink-300/60 transition-colors" />
                    <ShoppingBag className="w-4 h-4 text-pink-200 drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                    <span>ব্যাগে নিন • ৳{(product.price * quantity).toLocaleString('en-US')}</span>
                  </button>
                </div>

                {/* 2. Direct Buy Now & WhatsApp Suite */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-3 px-4 rounded-full bg-gradient-to-r from-[#8E2A3E] to-[#631B2A] hover:from-[#73192B] hover:to-[#4F1320] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>সরাসরি অর্ডার করুন (১-ক্লিক)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppConsultation}
                    className="py-3 px-4 rounded-full bg-white hover:bg-[#25D366] text-[#241518] hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-[#F0D5CC] shadow-2xs transition-all active:scale-95 cursor-pointer group/wa"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366] group-hover/wa:text-white transition-colors" />
                    <span>হোয়াটসঅ্যাপে ফ্রি পরামর্শ</span>
                  </button>
                </div>
              </div>

              {/* 5. Comprehensive Organic Skincare Accordions / Tabs */}
              <div className="pt-4 border-t border-[#F0D5CC]/80 space-y-3">
                <div className="flex border-b border-[#F0D5CC] text-xs font-serif">
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-2.5 px-3 font-bold transition-all relative ${
                      activeTab === 'ingredients'
                        ? 'text-[#8E2A3E] border-b-2 border-[#8E2A3E]'
                        : 'text-[#7A5B63] hover:text-[#241518]'
                    }`}
                  >
                    উপাদান ও কার্যকারিতা
                  </button>
                  <button
                    onClick={() => setActiveTab('usage')}
                    className={`pb-2.5 px-3 font-bold transition-all relative ${
                      activeTab === 'usage'
                        ? 'text-[#8E2A3E] border-b-2 border-[#8E2A3E]'
                        : 'text-[#7A5B63] hover:text-[#241518]'
                    }`}
                  >
                    ব্যবহারের সঠিক নিয়ম
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2.5 px-3 font-bold transition-all relative ${
                      activeTab === 'shipping'
                        ? 'text-[#8E2A3E] border-b-2 border-[#8E2A3E]'
                        : 'text-[#7A5B63] hover:text-[#241518]'
                    }`}
                  >
                    ডেলিভারি ও রিটার্ন
                  </button>
                </div>

                <div className="text-xs text-[#5C454B] leading-relaxed pt-1">
                  {activeTab === 'ingredients' && (
                    <div className="space-y-2">
                      <p>
                        <strong>মূল উপাদানসমূহ:</strong> {product.keyIngredients}
                      </p>
                      <p>
                        রিভানার প্রতিটি ফর্মুলা কোনো প্রকার কৃত্রিম রঙ, প্যারাবেন, সালফেট বা রাসায়নিক প্রিজারভেটিভ ছাড়া সম্পূর্ণ প্রাকৃতিক উপায়ে তৈরি। এটি ত্বককে ভেতর থেকে পুষ্টি জুগিয়ে প্রাকৃতিক উজ্জ্বলতা এনে দেয়।
                      </p>
                    </div>
                  )}

                  {activeTab === 'usage' && (
                    <div className="space-y-1.5">
                      <p><strong>ধাপ ১:</strong> রিভানা জাফরান সোপ বা ফেসওয়াশ দিয়ে ত্বক ভালো করে পরিষ্কার করে নিন।</p>
                      <p><strong>ধাপ ২:</strong> ২-৩ ফোঁটা সিরাম আঙুলের ডগায় নিয়ে পুরো মুখে আলতো করে ড্যাব করে ম্যাসাজ করুন।</p>
                      <p><strong>ধাপ ৩:</strong> সকালে এবং রাতে ঘুমানোর পূর্বে নিয়মিত ব্যবহারে সর্বোচ্চ ফলাফল পাওয়া যায়।</p>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-1.5">
                      <p>• <strong>ঢাকা সিটির ভিতরে:</strong> ২৪ থেকে ৪৮ ঘণ্টার মধ্যে নিশ্চিত ক্যাশ অন ডেলিভারি (চার্জ ৳৬০)।</p>
                      <p>• <strong>ঢাকার বাইরে:</strong> ৪৮ থেকে ৭২ ঘণ্টার মধ্যে স্টেডফাস্ট বা সুন্দরবন কুরিয়ারে হোম ডেলিভারি (চার্জ ৳১২০)।</p>
                      <p>• <strong>ওপেন বক্স সুবিধা:</strong> ডেলিভারিম্যানের সামনে প্যাকেট চেক করে নেয়ার সম্পূর্ণ সুবিধা রয়েছে।</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 6. Related Products Recommendation Grid (2-Columns on Mobile) */}
        {relatedProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#F0D5CC]/80 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black font-serif text-[#241518]">
                  সম্পর্কিত প্রিমিয়াম কালেকশন
                </h3>
                <p className="text-xs text-[#7A5B63]">
                  আপনার রূপচর্চার পরিপূর্ণ যত্নে বিশেষজ্ঞ নির্দেশিত কম্বিনেশন
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/beauty')}
                className="text-xs font-serif font-bold text-[#8E2A3E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>সব দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/beauty/product/${rel.id}`)}
                  className="group relative rounded-2xl sm:rounded-[32px] border border-[#F0D5CC]/90 hover:border-[#8E2A3E]/60 shadow-[0_4px_16px_rgba(53,35,38,0.06)] sm:shadow-[0_12px_36px_rgba(53,35,38,0.06)] hover:shadow-[0_24px_55px_rgba(142,42,62,0.2)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer select-none backdrop-blur-2xl bg-white/95"
                >
                  <div className="relative aspect-[4/3.8] w-full overflow-hidden rounded-t-xl sm:rounded-t-[30px] flex items-center justify-center">
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 50% 55%, rgba(255, 255, 255, 0.95) 0%, ${rel.bgTone || '#F8EAE0'} 65%, #FFF5EF 100%)`
                      }}
                    />
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="relative z-1 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div 
                      className="absolute inset-x-0 bottom-0 h-10 sm:h-16 pointer-events-none z-2"
                      style={{
                        background: 'linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.4) 40%, transparent 100%)'
                      }}
                    />
                    <span 
                      className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[#2D1B22] font-mono text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 backdrop-blur-md shadow-xs border border-[#F5D89F] z-10"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 249, 235, 0.95) 0%, rgba(255, 238, 245, 0.95) 50%, rgba(235, 249, 255, 0.95) 100%)'
                      }}
                    >
                      <span className="text-amber-500 text-[9px] sm:text-xs">👑</span>
                      <span>{rel.badge || 'BESTSELLER'}</span>
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                    <div className="space-y-1">
                      <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-[#FAF0E8] border border-[#EEDCD2] text-[#63383D] font-bold text-[9px] sm:text-[10.5px]">
                        {rel.skinType?.split(' ')[0] || 'সব ত্বক'} • অর্গানিক
                      </span>
                      <h4 className="text-xs sm:text-base font-black font-serif text-[#2B1A1E] group-hover:text-[#8E2A3E] transition-colors leading-tight sm:leading-[1.35] line-clamp-2 min-h-[30px] sm:min-h-[44px]">
                        {rel.title}
                      </h4>
                      <p className="hidden sm:flex text-xs text-[#6B555A] line-clamp-1 font-light items-center gap-1.5">
                        <span className="text-[#C99A43] font-serif text-sm">✦</span>
                        <span className="truncate">{rel.keyIngredients}</span>
                      </p>
                    </div>

                    <div className="pt-2 sm:pt-3 border-t border-[#F2D7CF]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mt-auto">
                      <span className="text-sm sm:text-xl font-black text-[#8E2A3E] font-serif">
                        ৳{rel.price.toLocaleString('en-US')}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(rel, { size: rel.size || 'Standard' });
                          setIsCartOpen(true);
                        }}
                        className="w-full sm:w-auto relative group/btn px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-white font-bold text-[10.5px] sm:text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, #2D1B22 0%, #3D1F28 50%, #1F1216 100%)',
                          boxShadow: '0 0 12px 1px rgba(244, 63, 94, 0.45), 0 0 20px 2px rgba(168, 85, 247, 0.25)'
                        }}
                      >
                        <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-200" />
                        <span className="whitespace-nowrap">ব্যাগে নিন</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky Mobile Add To Cart Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#F0D5CC] px-4 py-2.5 shadow-[0_-8px_25px_rgba(53,35,38,0.12)] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#7A5B63] block font-mono">মোট মূল্য:</span>
          <span className="text-lg font-black text-[#8E2A3E] font-serif leading-none">
            ৳{(product.price * quantity).toLocaleString('en-US')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="px-3.5 py-2 rounded-full bg-[#35252A] text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-pink-200" />
            <span>ব্যাগে নিন</span>
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#8E2A3E] via-[#C99A43] to-[#A64F5C] text-white text-xs font-bold shadow-lg active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <span>অর্ডার করুন</span>
          </button>
        </div>
      </div>

      {/* Cart Drawer */}
      <RibanaCartDrawer />
    </div>
  );
}
