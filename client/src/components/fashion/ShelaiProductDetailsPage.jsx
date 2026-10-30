import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Heart, ArrowRight, ShieldCheck, Truck, RotateCcw, 
  MapPin, Star, Sparkles, MessageCircle, Ruler, Check, X, Eye, 
  ChevronRight, Maximize2, Share2, Award, Clock, Scissors, Gem,
  CheckCircle2, Flame, RefreshCw, AlertCircle, HelpCircle
} from 'lucide-react';
import { SHELAI_PRODUCTS } from '../../data/shelaiFashionData';
import { useStore } from '../../context/StoreContext';
import ShelaiHeader from './ShelaiHeader';
import ShelaiCartDrawer from './ShelaiCartDrawer';

export default function ShelaiProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, isInWishlist, shelaiProducts = SHELAI_PRODUCTS } = useStore();

  const product = shelaiProducts.find((p) => p.id === productId) || shelaiProducts[0];

  const [activePhoto, setActivePhoto] = useState(product?.image);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M');
  const [selectedStitching, setSelectedStitching] = useState(product?.stitchingOptions?.[0] || 'Stitched (Ready to Wear)');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('story');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(false);
  const [addedAlert, setAddedAlert] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync active photo when product changes
  useEffect(() => {
    if (product) {
      setActivePhoto(product.image);
      setSelectedSize(product.sizes?.[0] || 'M');
      setSelectedStitching(product.stitchingOptions?.[0] || 'Stitched (Ready to Wear)');
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fcfbf9] text-[#1c1917] flex flex-col justify-between font-sans">
        <ShelaiHeader showCategories={false} />
        <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#f4efe6] text-[#0f291e] mx-auto flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-[#c5a059]" />
          </div>
          <h2 className="text-2xl font-serif font-black text-[#0f291e]">পণ্যটি খুঁজে পাওয়া যায়নি</h2>
          <p className="text-xs text-[#78716c]">দয়া করে আমাদের মূল ফ্যাশন ক্যাটালগে ফিরে গিয়ে কালেকশন দেখুন।</p>
          <button
            onClick={() => navigate('/store')}
            className="px-8 py-3.5 rounded-full bg-[#0f291e] text-[#fef9c3] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#16382b] transition-all cursor-pointer"
          >
            ফ্যাশন ক্যাটালগে ফিরুন
          </button>
        </div>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);
  const relatedProducts = shelaiProducts
    .filter((p) => p.subCategory === product.subCategory && p.id !== product.id)
    .slice(0, 4);

  // 4 Gallery Angles (Primary + 3 auxiliary high-fashion angles)
  const galleryPhotos = [
    { id: 1, label: 'সামনের পূর্ণ ভিউ', img: product.image },
    { id: 2, label: 'জারদৌসি ও নেকলাইন ডিটেইল', img: relatedProducts[0]?.image || product.image },
    { id: 3, label: 'ওড়না ও কাটওয়ার্ক বর্ডার', img: relatedProducts[1]?.image || product.image },
    { id: 4, label: 'মডেল সাইড পোজ ও ব্যাক', img: relatedProducts[2]?.image || product.image }
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, { size: selectedSize, stitching: selectedStitching, color: selectedColor });
    }
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2600);
  };

  const handleInstantBuy = () => {
    addToCart(product, { size: selectedSize, stitching: selectedStitching, color: selectedColor });
    navigate('/store/checkout');
  };

  const handleWhatsAppConsultation = () => {
    const text = `আসসালামু আলাইকুম! আমি Shelai Couture থেকে "${product.title}" (${product.designer}) সম্পর্কে জানতে আগ্রহী।\nমূল্য: ৳${product.price.toLocaleString('en-US')}\nসাইজ: ${selectedSize}\nসেলাই: ${selectedStitching}\nকালার: ${selectedColor}\nঅনুগ্রহ করে ডেলিভারি ও বিস্তারিত পরামর্শ প্রদান করুন।`;
    window.open(`https://wa.me/8801629559653?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Shelai Couture - ${product.title} (${product.designer})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1c1917] font-sans selection:bg-[#0f291e] selection:text-[#fef9c3]">
      {/* 1. Universal Shelai Header */}
      <ShelaiHeader showCategories={false} />

      {/* 2. Haute Couture Breadcrumb Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 border-b border-[#e7e2d9] text-xs text-[#78716c]">
        <ol className="flex items-center space-x-2 overflow-x-auto scrollbar-none whitespace-nowrap">
          <li>
            <button onClick={() => navigate('/store')} className="hover:text-[#0f291e] transition-colors cursor-pointer font-medium">
              হোম
            </button>
          </li>
          <li><ChevronRight className="w-3.5 h-3.5 text-[#a8a29e]" /></li>
          <li>
            <button onClick={() => navigate('/store')} className="hover:text-[#0f291e] transition-colors cursor-pointer font-medium">
              {product.subCategory === 'suits' ? 'লাক্সারি ৩-পিস স্যুট কালেকশন' :
               product.subCategory === 'sarees' ? 'ঐতিহ্যবাহী ঢাকাই শাড়ি' :
               product.subCategory === 'kurtis' ? 'রেডি কুর্তি ও কো-অর্ড সেট' : 'দুবাই সিল্ক ও আবায়া'}
            </button>
          </li>
          <li><ChevronRight className="w-3.5 h-3.5 text-[#a8a29e]" /></li>
          <li className="font-bold text-[#0f291e] truncate max-w-xs">{product.title}</li>
        </ol>
      </nav>

      {/* Added to Bag Floating Notification Toast */}
      <AnimatePresence>
        {addedAlert && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 bg-[#0f291e] text-[#fef9c3] px-6 py-4 rounded-2xl shadow-2xl border-2 border-[#c5a059] flex items-center space-x-3.5 backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-full bg-[#22c55e] text-white flex items-center justify-center shrink-0 shadow-md">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <p className="font-serif font-black text-sm">ড্রেসটি সফলভাবে ব্যাগে যুক্ত হয়েছে!</p>
              <p className="text-[11px] text-[#a7f3d0] font-mono">
                সাইজ: {selectedSize} • {selectedStitching.split(' ')[0]} • পরিমাণ: {quantity}টি
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Product Editorial Details Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: High-Fashion Portrait Showcase & Thumbnail Reel (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
            
            {/* Primary Portrait View Frame */}
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-[#f4efe6] border-2 border-[#c5a059]/40 shadow-[0_20px_50px_rgba(15,41,30,0.1)] group">
              <img
                src={activePhoto}
                alt={product.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 cursor-zoom-in"
                onClick={() => setZoomedImage(true)}
              />

              {/* Ambient Dark Bottom Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />

              {/* Top Floating Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full bg-[#0f291e]/95 text-[#fef08a] font-mono text-[10px] font-bold tracking-wider uppercase border border-[#c5a059]/50 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#fde047]" />
                  <span>{product.badge || 'SHELAI EXCLUSIVE'}</span>
                </span>
                {product.discount && (
                  <span className="px-3 py-1 rounded-full bg-[#831843]/95 text-[#fce7f3] font-mono text-[10px] font-bold tracking-wide border border-[#f43f5e]/30 backdrop-blur-md shadow-md">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Top-Right Control Buttons */}
              <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0f291e] flex items-center justify-center shadow-lg border border-white/60 transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
                  title="শেয়ার করুন"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0f291e] flex items-center justify-center shadow-lg border border-white/60 transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
                  title="উইশলিস্টে সেভ করুন"
                >
                  <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-[#dc2626] text-[#dc2626]' : 'text-[#78716c]'}`} />
                </button>

                <button
                  type="button"
                  onClick={() => setZoomedImage(true)}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0f291e] flex items-center justify-center shadow-lg border border-white/60 transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
                  title="ফুল স্ক্রিন জুম দেখুন"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom In-Frame Caption */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between text-white text-xs z-10">
                <div>
                  <p className="font-mono text-[#c5a059] tracking-wider uppercase text-[10px] font-bold flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-[#fde047]" />
                    <span>FESTIVE LOOKBOOK 2026 • 1376x768 HD SHOOT</span>
                  </p>
                  <p className="font-serif font-bold text-sm sm:text-base text-white/95 line-clamp-1 mt-0.5">
                    {product.title}
                  </p>
                </div>
                <span className="text-[10px] font-bold bg-white/20 text-white px-3 py-1.5 rounded-full backdrop-blur-md border border-white/30 shrink-0 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>জুম করুন</span>
                </span>
              </div>
            </div>

            {/* Multi-Angle Interactive Thumbnail Reel */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {galleryPhotos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setActivePhoto(photo.img)}
                  className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer group ${
                    activePhoto === photo.img
                      ? 'border-[#0f291e] ring-2 ring-[#c5a059] shadow-md scale-102'
                      : 'border-[#e7e1d5] opacity-75 hover:opacity-100 hover:border-[#c5a059]'
                  }`}
                >
                  <img
                    src={photo.img}
                    alt={photo.label}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-1 bg-black/75 text-white text-[8.5px] font-mono text-center truncate">
                    0{photo.id} • ভিউ
                  </div>
                </button>
              ))}
            </div>

            {/* Model & Fit Authenticity Strip */}
            <div className="p-4 rounded-2xl bg-[#f7f4ed] border border-[#e8e1d3] flex items-center justify-between text-xs text-[#78716c]">
              <span className="flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4 text-[#0f291e]" />
                <span>মডেলের উচ্চতা: ৫ ফুট ৬ ইঞ্চি • পরিহিত সাইজ: <strong className="text-[#0f291e]">M</strong></span>
              </span>
              <span className="font-mono font-bold text-[#854d0e] bg-white px-2.5 py-1 rounded-full border border-[#d6cebf] shadow-2xs">
                ১০০% রিয়েল আউটলুক
              </span>
            </div>

            {/* Live Shopper Urgency Strip */}
            <div className="p-3.5 rounded-2xl bg-[#fef2f2] border border-[#fecaca] flex items-center justify-between text-xs text-[#991b1b]">
              <span className="flex items-center gap-2 font-medium">
                <Flame className="w-4 h-4 text-[#dc2626] animate-bounce" />
                <span>এই মুহূর্তে <strong>৪ জন ক্রেতা</strong> এই ড্রেসটি দেখছেন</span>
              </span>
              <span className="font-mono text-[11px] font-bold bg-white px-2 py-0.5 rounded-full border border-[#fca5a5]">
                সীমিত স্টক
              </span>
            </div>

          </div>

          {/* Right Column: Luxury Purchase Specifications & Poetic Copy (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 1. Header: Monogram, Title & Trust Badges */}
            <div className="space-y-3 border-b border-[#e7e2d9] pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="h-[1.5px] w-6 bg-[#c5a059]" />
                  <span className="text-xs font-mono font-black tracking-[0.25em] uppercase text-[#854d0e]">
                    {product.designer}
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#15803d] flex items-center gap-1.5 bg-[#dcfce7] px-3 py-1 rounded-full border border-[#86efac]">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                  ইন স্টক • সরাসরি ডেলিভারি যোগ্য
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-[#0f291e] leading-snug">
                {product.title}
              </h1>

              {product.titleEn && (
                <p className="text-xs text-[#78716c] font-mono tracking-wide">{product.titleEn}</p>
              )}

              {/* Rating & Verified Feedback Link */}
              <div className="flex items-center space-x-3 pt-1 text-xs">
                <div className="flex items-center text-[#eab308]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#0f291e] font-mono">{product.rating || '4.9'} / 5.0</span>
                <span className="text-[#a8a29e]">•</span>
                <span className="text-[#854d0e] font-medium underline cursor-pointer hover:text-[#0f291e]">
                  {product.reviews || 48}টি ভেরিফাইড কাস্টমার রিভিউ
                </span>
                <span className="text-[#a8a29e]">•</span>
                <span className="text-[#15803d] font-bold">১০০% আসল প্রোডাক্ট গ্যারান্টি</span>
              </div>
            </div>

            {/* 2. Price Showcase & Festive Savings Banner */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#fbf8f2] via-[#f7f3eb] to-[#fbf8f2] border-2 border-[#c5a059]/40 flex items-baseline justify-between shadow-xs">
              <div>
                <p className="text-[10px] font-mono font-bold text-[#854d0e] uppercase tracking-wider">
                  অফিসিয়াল বুটিক প্রাইস
                </p>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#0f291e] font-serif tracking-tight">
                    ৳{product.price.toLocaleString('en-US')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-[#a8a29e] line-through font-mono">
                      ৳{product.originalPrice.toLocaleString('en-US')}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#78716c] mt-1 font-mono">
                  ভ্যাট অন্তর্ভুক্ত • ৳২,৫০০+ টাকার অর্ডারে সম্পূর্ণ ফ্রি হোম ডেলিভারি
                </p>
              </div>

              {product.originalPrice && (
                <div className="text-right">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#15803d]/15 text-[#15803d] font-mono font-bold text-xs border border-[#15803d]/30 inline-block shadow-2xs">
                    সাশ্রয় ৳{(product.originalPrice - product.price).toLocaleString('en-US')}
                  </span>
                </div>
              )}
            </div>

            {/* 3. Poetic Craftsmanship & Fabric Story (Boutique Storytelling) */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#e7e2d9] shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-[#0f291e]">
                <Gem className="w-4 h-4 text-[#c5a059]" />
                <h4 className="font-serif font-black text-sm sm:text-base tracking-wide">
                  কারিগরি ও নকশার আভিজাত্য (Artisan Craftsmanship)
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#44403c] leading-relaxed font-light">
                {product.subCategory === 'suits' && 
                  'মূল পাকিস্তানি ডিজাইনার মাস্টারপিস — পিওর ক্রিনকেল শিফনের ওপর সুক্ষ্ম রেশম সুতার সূচিকর্ম, জারদৌসি ও নিখুঁত পার্লের নকশা। সাথে স্ক্যালপ কাটওয়ার্ক বর্ডারের প্রিমিয়াম অর্গানজা ওড়না, যা প্রতিটি আলোকচ্ছটায় রাজকীয় আভা ছড়ায়।'}
                {product.subCategory === 'sarees' && 
                  'শতবর্ষী ঐতিহ্যবাহী তাঁতীদের বোনা আসল ঢাকai জামদানি — সোনালী জরি ও রেশম সুতার জ্যামিতিক নকশায় সৃষ্টি করা হয়েছে এক অপূর্ব নান্দনিক মোহ। প্রতিটি উৎসব ও বিয়ের অনুষ্ঠানে অনন্য কেন্দ্রবিন্দু হওয়ার শতভাগ নিশ্চয়তা।'}
                {product.subCategory === 'kurtis' && 
                  'প্রিমিয়াম জ্যাকার্ড ও কটন লন ফেব্রিক — গ্রীষ্মকালীন স্বস্তি ও উৎসবের গ্ল্যামারকে মিলিয়ে রেডি-টু-ওয়্যার কালেকশন। নেকলাইন ও হাতায় কাটওয়ার্ক লেইসের সাথে ম্যাচিং স্টাইলিশ ট্রাউজার।'}
                {product.subCategory === 'abayas' && 
                  'দুবাইয়ের প্রিমিয়াম চেরি সিল্কের ওপর হাতে বসানো স্পার্কলিং ক্রিস্টাল স্টোন ও আধুনিক ফ্লেয়ার্ড কাটিং। শালীনতা ও আভিজাত্যের নিখুঁত মেলবন্ধনে সাথে থাকছে ম্যাচিং সফট শিফন হিজাব।'}
              </p>
              
              {/* Highlight Features */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f4efe6] text-[11px] text-[#78716c]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>হাতে বসানো নিখুঁত পার্ল ও সিকুইন</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>সফট মলমল ইনার লাইনিং সংযুক্ত</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>রং ও সুতার ১০০% টেকসই গ্যারান্টি</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>বনানী শোরুম ট্রায়াল ও সাইজ ফিটিং</span>
                </div>
              </div>
            </div>

            {/* 4. Stitching Option Selector */}
            {product.stitchingOptions && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#0f291e] font-serif flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>সেলাই / স্ট্রিচিং নির্বাচন করুন:</span>
                  </label>
                  <span className="text-[10px] text-[#78716c] font-mono">ফ্রি সাইজ অল্টারেশন সুবিধা</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.stitchingOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedStitching(opt)}
                      className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                        selectedStitching === opt
                          ? 'bg-[#0f291e] text-[#fef9c3] border-[#c5a059] shadow-md ring-1 ring-[#c5a059]'
                          : 'bg-white text-[#44403c] border-[#e7e2d9] hover:bg-[#fbf9f5]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xs sm:text-sm">
                          {opt.includes('Stitched') ? 'রেডি-টু-ওয়্যার (Stitched)' : 'আনস্টিচড ফেব্রিক (Unstitched)'}
                        </span>
                        {selectedStitching === opt && <Check className="w-4 h-4 text-[#fde047]" />}
                      </div>
                      <p className={`text-[11px] mt-1.5 leading-snug ${
                        selectedStitching === opt ? 'text-[#a7f3d0]' : 'text-[#78716c]'
                      }`}>
                        {opt.includes('Stitched') 
                          ? 'আমাদের দক্ষ মাস্টার টেইলর দ্বারা সেলাইকৃত ও ইনার সংযুক্ত'
                          : 'সম্পূর্ণ ফেব্রিক ও লেইস প্যাচ — আপনার ইচ্ছেমতো মাপের জন্য'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Size Selector with Live Inch Measurements */}
            {product.sizes && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#0f291e] font-serif">
                    সাইজ নির্বাচন করুন: <span className="font-mono text-[#854d0e] font-black">{selectedSize}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs text-[#854d0e] hover:text-[#0f291e] font-bold flex items-center gap-1 cursor-pointer underline"
                  >
                    <Ruler className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>সাইজ ও ফিটিং গাইড</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                  {[
                    { s: 'S', bust: 'বুক ৩৬"' },
                    { s: 'M', bust: 'বুক ৩৮"-৪০"' },
                    { s: 'L', bust: 'বুক ৪২"' },
                    { s: 'XL', bust: 'বুক ৪৪"-৪৬"' },
                    { s: 'Custom', bust: 'কাস্টম ফিট' }
                  ].map((item) => (
                    <button
                      key={item.s}
                      type="button"
                      onClick={() => setSelectedSize(item.s)}
                      className={`p-2.5 rounded-2xl text-center border-2 transition-all cursor-pointer flex flex-col justify-center items-center ${
                        selectedSize === item.s
                          ? 'bg-[#0f291e] text-[#fef9c3] border-[#c5a059] shadow-md scale-102'
                          : 'bg-white text-[#44403c] border-[#e7e2d9] hover:border-[#0f291e] hover:bg-[#fbf9f5]'
                      }`}
                    >
                      <span className="font-mono font-black text-sm">{item.s}</span>
                      <span className={`text-[9.5px] mt-0.5 truncate w-full ${
                        selectedSize === item.s ? 'text-[#a7f3d0]' : 'text-[#78716c]'
                      }`}>
                        {item.bust}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Quantity Stepper & High-Converting Action Hub */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border-2 border-[#d6cebf] rounded-full bg-white px-3 py-2 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-[#78716c] hover:text-[#1c1917] px-2 font-black text-base cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono font-black text-base px-3 text-[#0f291e]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-[#78716c] hover:text-[#1c1917] px-2 font-black text-base cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-2xl bg-[#0f291e] hover:bg-[#16382b] text-[#fef9c3] font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-xl hover:shadow-[0_4px_18px_rgba(15,41,30,0.3)] active:scale-95 transition-all cursor-pointer border border-[#c5a059]/40 group"
                >
                  <ShoppingBag className="w-4 h-4 text-[#fde047] group-hover:scale-110 transition-transform shrink-0" />
                  <span>শপিং ব্যাগে যোগ করুন</span>
                </button>
              </div>

              {/* Instant Buy & WhatsApp Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleInstantBuy}
                  className="px-4 py-3.5 rounded-2xl bg-[#c5a059] hover:bg-[#d4af37] text-[#0f291e] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer group text-center"
                >
                  <span className="leading-snug">সরাসরি ক্যাশ অন ডেলিভারি</span>
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppConsultation}
                  className="px-4 py-3.5 rounded-2xl bg-[#25d366]/15 hover:bg-[#25d366]/25 border-2 border-[#25d366]/40 text-[#15803d] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer group text-center"
                >
                  <MessageCircle className="w-4 h-4 text-[#16a34a] shrink-0 transition-transform group-hover:scale-110" />
                  <span className="leading-snug">হোয়াটসঅ্যাপে পরামর্শ নিন</span>
                </button>
              </div>
            </div>

            {/* 7. Boutique Assurances & Guarantees Strip */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#e7e2d9] text-xs text-[#44403c]">
              <div className="flex items-center space-x-2.5 p-3 rounded-2xl bg-[#f7f4ed] border border-[#e8e1d3]">
                <Truck className="w-4 h-4 text-[#0f291e] shrink-0" />
                <span className="text-[11px] font-medium leading-tight">সারাদেশে ক্যাশ অন ডেলিভারি (COD)</span>
              </div>
              <div className="flex items-center space-x-2.5 p-3 rounded-2xl bg-[#f7f4ed] border border-[#e8e1d3]">
                <ShieldCheck className="w-4 h-4 text-[#0f291e] shrink-0" />
                <span className="text-[11px] font-medium leading-tight">ডেলিভারিতে দেখে বুঝে নেওয়ার সুযোগ</span>
              </div>
              <div className="flex items-center space-x-2.5 p-3 rounded-2xl bg-[#f7f4ed] border border-[#e8e1d3]">
                <RotateCcw className="w-4 h-4 text-[#0f291e] shrink-0" />
                <span className="text-[11px] font-medium leading-tight">৭ দিনে ফ্রি সাইজ এক্সচেঞ্জ সুবিধা</span>
              </div>
              <div className="flex items-center space-x-2.5 p-3 rounded-2xl bg-[#f7f4ed] border border-[#e8e1d3]">
                <MapPin className="w-4 h-4 text-[#0f291e] shrink-0" />
                <span className="text-[11px] font-medium leading-tight">বনানী ও ধানমন্ডি শোরুম ট্রায়াল</span>
              </div>
            </div>

          </div>

        </div>

        {/* 4. Luxury Tabbed Editorial Specifications */}
        <div className="mt-16 pt-10 border-t border-[#e7e2d9] space-y-8">
          
          <div className="flex items-center justify-start sm:justify-center space-x-2 sm:space-x-6 border-b border-[#e7e2d9] overflow-x-auto scrollbar-none pb-2 px-2">
            {[
              { id: 'story', label: '✦ ফেব্রিক ও কারিগরি কাব্য' },
              { id: 'styling', label: '✦ স্টাইলিং ও উপলক্ষ গাইড' },
              { id: 'care', label: '✦ ওয়াশ ও যত্নবিধি' },
              { id: 'delivery', label: '✦ ডেলিভারি, ট্রায়াল ও রিটার্ন' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-3 text-xs sm:text-sm font-serif font-bold transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#0f291e] text-[#0f291e] scale-105'
                    : 'border-transparent text-[#78716c] hover:text-[#1c1917]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#e7e2d9] shadow-sm text-xs sm:text-sm text-[#44403c] leading-relaxed">
            
            {activeTab === 'story' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif font-black text-base sm:text-lg text-[#0f291e]">
                    আভিজাত্যের প্রতিটি ভাঁজে খাঁটি কারিগরি
                  </h4>
                  <p className="text-xs sm:text-sm text-[#78716c] mt-1 font-light">
                    প্রতিটি ড্রেসের সুতো, রং এবং এমব্রয়ডারি ওয়ার্ক নির্বাচন করা হয়েছে রাজকীয় রুচির গ্রাহকদের জন্য।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#f7f4ed] border border-[#e8e1d3] space-y-1.5">
                    <p className="font-bold text-[#854d0e] font-mono text-xs uppercase flex items-center gap-1.5">
                      <span>👗 জামা / কামিজ</span>
                    </p>
                    <p className="font-serif font-bold text-[#0f291e]">
                      {product.fabric?.shirt || 'পিওর ক্রিনকেল শিফন উইথ পার্ল ও জারদৌসি এমব্রয়ডারি'}
                    </p>
                    <p className="text-[11px] text-[#78716c]">
                      প্রিমিয়াম সফট মলমল ইনার লাইনিং সহ সেলাইকৃত।
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#f7f4ed] border border-[#e8e1d3] space-y-1.5">
                    <p className="font-bold text-[#854d0e] font-mono text-xs uppercase flex items-center gap-1.5">
                      <span>🧣 ওড়না / দোপাট্টা</span>
                    </p>
                    <p className="font-serif font-bold text-[#0f291e]">
                      {product.fabric?.dupatta || 'স্ক্যালপ কাটওয়ার্ক বর্ডারের প্রিমিয়াম শিয়ার অর্গানজা'}
                    </p>
                    <p className="text-[11px] text-[#78716c]">
                      পূর্ণ ২.৭৫ গজ দৈর্ঘ্য এবং চারদিকে সূক্ষ্ম কারুকাজ।
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#f7f4ed] border border-[#e8e1d3] space-y-1.5">
                    <p className="font-bold text-[#854d0e] font-mono text-xs uppercase flex items-center gap-1.5">
                      <span>👖 ট্রাউজার / বটম</span>
                    </p>
                    <p className="font-serif font-bold text-[#0f291e]">
                      {product.fabric?.trouser || 'টেইলরড র সিল্ক স্ট্রেইট ট্রাউজার'}
                    </p>
                    <p className="text-[11px] text-[#78716c]">
                      অ্যাঙ্কেল এমব্রয়ডারি প্যানেল ও স্ট্রেচ-ফিটিং কমফোর্ট।
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'styling' && (
              <div className="space-y-4">
                <h4 className="font-serif font-black text-base sm:text-lg text-[#0f291e]">
                  স্টাইলিস্টের পরামর্শ ও পরিধানের উপলক্ষ
                </h4>
                <div className="space-y-3 text-[#44403c] leading-relaxed">
                  <p>
                    • <strong>উপযুক্ত উপলক্ষ:</strong> পবিত্র ঈদুল ফিতর, ঈদুল আযহা, পারিবারিক মেহেন্দী সন্ধ্যা, বিয়ে কিংবা যেকোনো প্রিমিয়াম রিসেপশনে পরিধানের জন্য এটি অনন্য।
                  </p>
                  <p>
                    • <strong>জুয়েলারি ম্যাচিং:</strong> কুন্দন, পোলকি বা হালকা মুক্তার ঝুমকা ও গলার হারের সাথে এই ড্রেসটি সবচেয়ে ভালো মানাবে।
                  </p>
                  <p>
                    • <strong>জুতো ও ক্লাচ:</strong> সোনালী বা মেটালিক হাই হিলস এবং একটি সিল্ক বা ভেলভেট এমব্রয়ডারি ক্লাচ ব্যাগ নিয়ে আপনার লুকটি সম্পূর্ণ করুন।
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3">
                <h4 className="font-serif font-black text-base sm:text-lg text-[#0f291e]">
                  ওয়াশ ও রক্ষণাবেক্ষণের নির্দেশাবলী
                </h4>
                <div className="space-y-2 text-[#78716c]">
                  <p>• সূক্ষ্ম জারদৌসি, পার্ল ও জরি সুতার কাজ অক্ষুণ্ণ রাখতে কেবলমাত্র <strong>ড্রাই ওয়াশ (Dry Clean Only)</strong> করান।</p>
                  <p>• কোনো ধরনের ক্ষারযুক্ত ব্লিচ বা কঠোর রাসায়নিক ডিটারজেন্ট ব্যবহার করবেন না।</p>
                  <p>• সরাসরি রোদ পরিহার করে ছায়াযুক্ত স্থানে শুকাতে দিন।</p>
                  <p>• উল্টো পিঠ থেকে হালকা তাপে আয়রন করুন; এমব্রয়ডারি বা সুতার ওপর সরাসরি গরম আয়রন ছোঁয়াবেন না।</p>
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-3">
                <h4 className="font-serif font-black text-base sm:text-lg text-[#0f291e]">
                  ডেলিভারি ট্রায়াল ও রিটার্ন গ্যারান্টি
                </h4>
                <div className="space-y-2 text-[#78716c]">
                  <p>• <strong>ডেলিভারি সময়সীমা:</strong> ঢাকা সিটিতে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২ থেকে ৩ কার্যদিবসের মধ্যে দ্রুত ডেলিভারি সম্পন্ন হয়।</p>
                  <p>• <strong>ফ্রি হোম ডেলিভারি:</strong> ৳২,৫০০ বা তদূর্ধ্ব অর্ডারে সারা দেশে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি।</p>
                  <p>• <strong>দেখে নেওয়ার শতভাগ সুযোগ:</strong> ডেলিভারিম্যানের সামনে প্যাকেট খুলে ড্রেসের ফেব্রিক ও কালার যাচাই করে বুঝে নেওয়ার সুযোগ রয়েছে। কোনো অমিল থাকলে তাৎক্ষণিক রিটার্নযোগ্য।</p>
                  <p>• <strong>শোরুম ট্রায়াল ও ফ্রি অল্টারেশন:</strong> বনানী ও ধানমন্ডি আউটলেটে এসে ড্রেস ট্রায়াল দিতে পারেন অথবা নিজস্ব টেইলর দ্বারা ফ্রি সাইজ অল্টারেশন করিয়ে নিতে পারেন।</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 5. Verified Customer Testimonials Runway */}
        <div className="mt-16 pt-10 border-t border-[#e7e2d9] space-y-6">
          <div className="text-center space-y-1">
            <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#854d0e]">
              REAL CLIENT EXPERIENCES
            </p>
            <h3 className="text-xl sm:text-2xl font-black font-serif text-[#0f291e]">
              ভেরিফাইড কাস্টমার রিভিউ ও মতামত
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                name: 'ফারহানা চৌধুরী',
                loc: 'গুলশান-২, ঢাকা',
                review: 'মারিয়া বি-এর এই ড্রেসটির পার্ল ও জারদৌসি কাজ ছবিতে যেমন দেখেছি, বাস্তবে তার চেয়েও অনেক বেশি চমৎকার ও রাজকীয়! ডেলিভারি খুব দ্রুত পেয়েছি।',
                rating: 5,
                verified: 'Verified Purchase'
              },
              {
                name: 'সামিয়া রহমান',
                loc: 'ধানমন্ডি, ঢাকা',
                review: 'ফেব্রিক কোয়ালিটি ১০০% আসল পাকিস্তানি শিফন। ওড়নার স্ক্যালপ কাটওয়ার্কের ফিনিশিং এতো সুন্দর যে সবাই প্রশংসা করেছে। বনানী শোরুমের সার্ভিস অসাধারণ।',
                rating: 5,
                verified: 'Verified Purchase'
              },
              {
                name: 'তানজিলা তাসনিম',
                loc: 'খুলশী, চট্টগ্রাম',
                review: 'ঢাকার বাইরে মাত্র ২ দিনে পেয়েছি। ডেলিভারির সময় খুলে দেখার সুযোগ পেয়ে অনেক আশ্বস্ত হয়েছি। সাইজ একদম পারফেক্ট হয়েছে।',
                rating: 5,
                verified: 'Verified Purchase'
              }
            ].map((rev, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-[#e7e2d9] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#eab308]">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[9.5px] font-mono font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded">
                    ✓ {rev.verified}
                  </span>
                </div>
                <p className="text-xs text-[#44403c] italic leading-relaxed">
                  "{rev.review}"
                </p>
                <div className="border-t border-[#f5f0e6] pt-2">
                  <p className="font-serif font-bold text-xs text-[#0f291e]">{rev.name}</p>
                  <p className="text-[10px] text-[#78716c] font-mono">{rev.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Related Collections Runway */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#e7e2d9] space-y-6">
            <div className="text-center space-y-1">
              <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#854d0e]">
                CURATED COLLECTIONS
              </p>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-[#0f291e]">
                সম্পর্কিত অন্যান্য ডিজাইনার কালেকশন
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    navigate(`/store/product/${rel.id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-[#e8e2d5] hover:border-[#c5a059] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#f4efe6]">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5">
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#0f291e]/90 text-[#fef08a] font-mono text-[8px] sm:text-[9px] font-bold">
                        {rel.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 space-y-1">
                    <p className="text-[9px] sm:text-[9.5px] font-mono uppercase text-[#854d0e] font-bold truncate">{rel.designer}</p>
                    <h5 className="font-serif font-bold text-xs sm:text-sm text-[#1c1917] line-clamp-1 group-hover:text-[#0f291e]">
                      {rel.title}
                    </h5>
                    <p className="text-sm sm:text-base font-black font-serif text-[#0f291e] pt-1">
                      ৳{rel.price.toLocaleString('en-US')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Action Bar for Mobile Screens */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#e7e2d9] p-3 sm:hidden z-40 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-[#854d0e] font-mono block">প্রাইস:</span>
          <span className="text-base font-black font-serif text-[#0f291e]">
            ৳{product.price.toLocaleString('en-US')}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            type="button"
            onClick={handleAddToCart}
            className="px-4 py-2.5 rounded-2xl bg-[#f4efe6] text-[#0f291e] font-bold text-xs flex items-center gap-1.5 border border-[#d6cebf] cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#0f291e] shrink-0" />
            <span>ব্যাগে নিন</span>
          </button>
          <button
            type="button"
            onClick={handleInstantBuy}
            className="px-5 py-2.5 rounded-2xl bg-[#0f291e] text-[#fef9c3] font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer shrink-0"
          >
            <span>এখনই অর্ডার</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <div className="fixed inset-0 z-50 p-4 flex items-center justify-center font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeGuide(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#e7e2d9] z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#e7e2d9] pb-3">
                <h4 className="font-serif font-black text-base text-[#0f291e] flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#c5a059]" />
                  <span>লেডিস ড্রেস সাইজ পরিমাপ চার্ট (ইঞ্চি)</span>
                </h4>
                <button onClick={() => setShowSizeGuide(false)} className="text-[#a8a29e] hover:text-[#1c1917] cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f7f4ed] text-[#0f291e] font-serif">
                      <th className="p-2.5 border border-[#e7e2d9]">সাইজ</th>
                      <th className="p-2.5 border border-[#e7e2d9]">বুক (Chest)</th>
                      <th className="p-2.5 border border-[#e7e2d9]">কোমর (Waist)</th>
                      <th className="p-2.5 border border-[#e7e2d9]">হিপ (Hip)</th>
                      <th className="p-2.5 border border-[#e7e2d9]">লং (Length)</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-[#44403c]">
                    <tr>
                      <td className="p-2.5 border border-[#e7e2d9] font-bold">Small (S)</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৩৬"</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৩২"</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৩৮"</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৪২"-৪৪"</td>
                    </tr>
                    <tr className="bg-[#fbf9f5]">
                      <td className="p-2.5 border border-[#e7e2d9] font-bold">Medium (M)</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৩৮"-৪০"</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৩৪"-৩৬"</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৪১"-৪২"</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৪৪"-৪৫"</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-[#e7e2d9] font-bold">Large (L)</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৪২"</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৩৮"</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৪৪"</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৪৫"</td>
                    </tr>
                    <tr className="bg-[#fbf9f5]">
                      <td className="p-2.5 border border-[#e7e2d9] font-bold">XL</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৪৪"-৪৬"</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৪০"-৪২"</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৪৬"-৪৮"</td>
                      <td className="p-2.5 border border-[#e7e2d9]">৪৬"</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-[#78716c]">
                * কোনো নির্দিষ্ট সাইজে কাস্টমাইজেশন বা অল্টারেশন প্রয়োজন হলে অর্ডারের পর আমাদের বনানী শোরুম প্রতিনিধি সরাসরি কল করে সাইজ নিশ্চিত করবেন।
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen HD Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <div className="fixed inset-0 z-50 p-4 sm:p-8 flex items-center justify-center font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomedImage(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center z-10"
            >
              <button
                type="button"
                onClick={() => setZoomedImage(false)}
                className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-[#c5a059] text-white hover:text-[#0f291e] border border-white/30 flex items-center justify-center transition-all z-20 cursor-pointer shadow-2xl"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#c5a059]/60 shadow-[0_0_80px_rgba(197,160,89,0.35)] bg-black">
                <img
                  src={activePhoto}
                  alt={product.title}
                  className="max-h-[82vh] w-auto max-w-full object-contain"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-mono text-[#fde047] uppercase tracking-wider">{product.designer}</span>
                    <h3 className="text-base sm:text-xl font-serif font-bold">{product.title}</h3>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#0f291e] text-[#fef9c3] border border-[#c5a059]/50 font-mono">
                    1376 × 768 HD SHOOT
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <ShelaiCartDrawer />
    </div>
  );
}