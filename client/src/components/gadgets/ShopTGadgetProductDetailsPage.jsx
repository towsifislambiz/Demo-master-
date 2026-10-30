import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  ArrowLeft, Star, ShieldCheck, Truck, RefreshCw, 
  ShoppingBag, Heart, CheckCircle2, ChevronRight, Share2, PhoneCall, Zap
} from 'lucide-react';
import { SHOPT_GADGETS } from '../../data/shoptGadgetData';
import ShopTGadgetProductCard from './ShopTGadgetProductCard';
import ShopTGadgetHeader from './ShopTGadgetHeader';
import ShopTGadgetCartDrawer from './ShopTGadgetCartDrawer';

export default function ShopTGadgetProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist = [], toggleWishlist, gadgetProducts = [] } = useStore();
  const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('নেভি / টাইটানিয়াম');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'features'

  const activeCatalog = gadgetProducts.length > 0 ? gadgetProducts : SHOPT_GADGETS;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const product = useMemo(() => {
    return activeCatalog.find(p => p.id === productId) || activeCatalog[0];
  }, [activeCatalog, productId]);

  const relatedProducts = useMemo(() => {
    return activeCatalog
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [activeCatalog, product]);

  const isWishlisted = Array.isArray(wishlist) && wishlist.some(
    item => String(item.id) === String(product.id) || item.title === product.title
  );

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];
  const activeImage = imagesList[selectedImageIdx] || product.image;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/gadgets/checkout');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Header */}
      <ShopTGadgetHeader
        activeCategory={product.category}
        onSelectCategory={() => navigate('/gadgets')}
        searchQuery=""
        onSearchChange={() => {}}
        onOpenCart={() => setCartOpen(true)}
        onBackToGateway={() => navigate('/')}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-[#050A16] border-b border-slate-800/80 py-2.5 px-4 text-xs font-semibold text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-white transition-colors">গেটওয়ে</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link to="/gadgets" className="hover:text-white transition-colors">ShopT গ্যাজেটস</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-500">{product.categoryBn}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-cyan-400 font-bold truncate max-w-xs">{product.title}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#0B1325]/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          
          {/* Left Column: Image Gallery (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Big Stage Canvas */}
            <div className="w-full h-80 sm:h-96 bg-gradient-to-b from-[#131D35] via-[#0E172C] to-[#080D1A] rounded-2xl flex items-center justify-center p-6 border border-slate-800 relative overflow-hidden group">
              {product.badge && (
                <span className="absolute top-4 left-4 bg-slate-900/90 text-cyan-300 font-black text-xs px-3 py-1 rounded-full border border-cyan-400/30 uppercase tracking-wider shadow z-10 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{product.badge}</span>
                </span>
              )}
              <img
                src={activeImage}
                alt={product.title}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] group-hover:scale-106 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Thumbnail Strip */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-20 h-20 rounded-xl p-2 bg-[#0E172C] border-2 transition-all cursor-pointer flex-shrink-0 ${
                      selectedImageIdx === idx ? 'border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Purchase Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Brand & Stock */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/80">
                {product.brand}
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>স্টকে আছে (৪৮ ঘণ্টায় ডেলিভারি)</span>
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-3xl font-black text-white leading-snug">
              {product.title}
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide">মডেল কোড: {product.id.toUpperCase()}</p>

            {/* Ratings & Warranty Pill */}
            <div className="flex flex-wrap items-center gap-3 py-1 text-xs">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-bold text-white ml-1">({product.rating})</span>
                <span className="text-slate-400">({product.ratingCount} টি ভেরিফাইড রিভিউ)</span>
              </div>
              <span className="text-slate-700">|</span>
              <span className="font-bold text-cyan-300 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>{product.warranty}</span>
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-[#0E172C] p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-white">
                ৳{product.price.toLocaleString('bn-BD')}
              </span>
              {product.oldPrice && (
                <span className="text-base text-slate-500 line-through">
                  ৳{product.oldPrice.toLocaleString('bn-BD')}
                </span>
              )}
              {product.discount && (
                <span className="bg-rose-950/80 text-rose-300 text-xs font-black px-3 py-1 rounded-full border border-rose-800">
                  {product.discount}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Variant Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300">কালার ভ্যারিয়েন্ট নির্বাচন করুন:</span>
              <div className="flex items-center gap-2">
                {['নেভি / টাইটানিয়াম', 'ম্যাট অবসিডিয়ান ব্ল্যাক', 'সিলভার ক্রোম'].map((variant) => (
                  <button
                    key={variant}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`text-xs px-4 py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                      selectedVariant === variant
                        ? 'bg-white text-slate-950 border-white font-black shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                        : 'bg-[#0E172C] text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Buy Buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-800 rounded-xl bg-[#0E172C] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2.5 text-slate-300 hover:bg-slate-800 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-black text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2.5 text-slate-300 hover:bg-slate-800 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-white hover:bg-slate-100 text-slate-950 font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all active:scale-98 cursor-pointer uppercase text-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-950" />
                  <span>কার্টে যোগ করুন</span>
                </button>

                {/* Wishlist toggle */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isWishlisted ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'bg-[#0E172C] border-slate-800 text-slate-400 hover:text-rose-400'
                  }`}
                  title="উইশলিস্ট"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white font-black py-3.5 rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer uppercase tracking-wider text-xs flex items-center justify-center gap-2"
              >
                <span>সরাসরি অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Delivery Info Box */}
            <div className="bg-[#0E172C] rounded-2xl p-4 border border-slate-800 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span><strong>হোম ডেলিভারি:</strong> ঢাকা সিটিতে ৬০৳ (২৪ ঘণ্টায়), ঢাকার বাইরে ১২০৳ (৪৮ ঘণ্টায়)।</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>ওয়ারেন্টি নিশ্চয়তা:</strong> ১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি।</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span><strong>রিটার্ন পলিসি:</strong> ত্রুটি থাকলে ৭ দিনের মধ্যে ক্যাশ ফেরত বা বদল সুবিধা।</span>
              </div>
            </div>

          </div>
        </div>

        {/* Technical Specification Matrix */}
        <section className="mt-8 bg-[#0B1325]/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-4 border-b border-slate-800 pb-3 mb-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`text-sm font-black pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'specs' ? 'border-cyan-400 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              টেকনিক্যাল স্পেসিফিকেশন
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`text-sm font-black pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'features' ? 'border-cyan-400 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              মূল ফিচারসমূহ
            </button>
          </div>

          {activeTab === 'specs' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-800 rounded-2xl overflow-hidden">
                <tbody>
                  {product.specs && Object.entries(product.specs).map(([key, val], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-[#0E172C]' : 'bg-[#091122]'}>
                      <td className="px-5 py-3.5 font-bold text-cyan-300 w-1/3 border-b border-slate-800">{key}</td>
                      <td className="px-5 py-3.5 text-slate-200 border-b border-slate-800">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              {product.features && product.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2 bg-[#0E172C] p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-black text-white mb-6">একই ক্যাটাগরির অন্যান্য গ্যাজেটস</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
              {relatedProducts.map(p => (
                <ShopTGadgetProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Cart Drawer */}
      <ShopTGadgetCartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      {/* Sticky Mobile Bottom CTA Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070D1D]/95 backdrop-blur-xl border-t border-slate-800 p-3 flex items-center justify-between gap-3 shadow-2xl">
        <div className="leading-tight">
          <span className="text-[10px] text-slate-400 block font-bold">মূল্য:</span>
          <span className="text-base font-black text-white font-mono">৳{product.price?.toLocaleString('bn-BD')}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400"
            title="কার্ট"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-950 font-black text-xs shadow-md uppercase tracking-wider flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>অর্ডার করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
}
