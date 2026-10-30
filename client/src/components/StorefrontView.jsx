import React, { useState } from 'react';
import { 
  ShoppingBag, Star, Eye, ShieldCheck, Truck, 
  RotateCcw, Sparkles, MessageCircle, SlidersHorizontal, ArrowRight, Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductDetailModal from './ProductDetailModal';

export default function StorefrontView({ onBackToGateway }) {
  const { currentNicheData, activeProducts, addToCart, setIsCartOpen, totalItemsCount } = useStore();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterTab, setFilterTab] = useState('all');

  const filteredProducts = activeProducts.filter((p) => {
    if (filterTab === 'bestsellers') return p.rating >= 4.9;
    if (filterTab === 'under2000') return p.price <= 2000;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24 lg:pb-12">
      
      {/* Dynamic Niche Hero Banner */}
      <section className={`relative overflow-hidden bg-gradient-to-b ${currentNicheData.theme.heroGradient} border-b border-slate-800 text-white py-16 sm:py-24 px-6`}>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-bold text-amber-400 shadow-xl backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>{currentNicheData.tagline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl leading-tight">
            {currentNicheData.heroTitle}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {currentNicheData.heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#products-section"
              className={`px-6 py-3 rounded-xl font-black text-xs sm:text-sm shadow-xl active:scale-95 transition-all ${currentNicheData.theme.accentButton}`}
            >
              কালেকশন দেখুন ➔
            </a>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>শপিং ব্যাগ ({totalItemsCount})</span>
            </button>
          </div>

          {/* Niche USP Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl pt-8 text-left">
            {currentNicheData.usp.map((u, i) => (
              <div key={i} className="p-3.5 bg-slate-900/60 rounded-2xl border border-slate-800/80 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">{u.title}</h4>
                  <p className="text-[10px] text-slate-400">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      </section>

      {/* Filter Tabs & Products Grid */}
      <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-white flex items-center gap-2">
              <span>{currentNicheData.nameBn} কালেকশন</span>
              <span className="text-xs bg-slate-800 text-amber-400 font-mono px-2.5 py-0.5 rounded-full border border-slate-700">
                {filteredProducts.length} আইটেম
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              যেকোনো প্রোডাক্টের ওপর ক্লিক করে সাইজ, স্পেসিফিকেশন ও বিস্তারিত রিভিউ চেক করুন।
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                filterTab === 'all' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              সব পণ্য
            </button>
            <button
              type="button"
              onClick={() => setFilterTab('bestsellers')}
              className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                filterTab === 'bestsellers' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              ⭐ বেস্টসেলার
            </button>
            <button
              type="button"
              onClick={() => setFilterTab('under2000')}
              className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                filterTab === 'under2000' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              ৳২,০০০ এর নিচে
            </button>
          </div>
        </div>

        {/* Product Cards Grid (3 Cols on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image & Badges */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
                    {product.discount}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white backdrop-blur-xs border border-slate-700/80 transition-colors cursor-pointer"
                  title="বিস্তারিত দেখুন"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Niche specific tag banner */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                  {product.sizes && (
                    <span className="bg-black/80 backdrop-blur-xs text-[10px] text-slate-300 px-2 py-0.5 rounded-md border border-white/10 font-mono">
                      সাইজ: {product.sizes.slice(0, 3).join(', ')}...
                    </span>
                  )}
                  {product.specs?.warranty && (
                    <span className="bg-cyan-950/90 backdrop-blur-xs text-[10px] text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-500/30">
                      ১ বছরের ওয়ারেন্টি
                    </span>
                  )}
                  {product.purity && (
                    <span className="bg-amber-950/90 backdrop-blur-xs text-[10px] text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/30">
                      ১০০% কাঁচা ও চিনিমুক্ত
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold text-white">{product.rating}</span>
                    <span className="text-[10px] text-slate-500">({product.reviewsCount})</span>
                  </div>

                  <h3
                    onClick={() => setSelectedProduct(product)}
                    className="font-bold text-sm text-white mt-1 group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {product.title}
                  </h3>

                  <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                    {product.shortDesc}
                  </p>
                </div>

                {/* Price & Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-500 block">মূল্য:</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-lg font-black text-amber-400 font-mono">
                        ৳{product.price.toLocaleString('en-US')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-slate-500 line-through font-mono">
                          ৳{product.originalPrice.toLocaleString('en-US')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      বিস্তারিত
                    </button>

                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="px-3.5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1 shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>অর্ডার</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Floating Mobile Bottom Navigation Bar (App-like experience) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 py-2.5 px-4 lg:hidden flex items-center justify-around text-xs shadow-2xl">
        <button
          type="button"
          onClick={onBackToGateway}
          className="flex flex-col items-center space-y-1 text-slate-400 hover:text-white"
        >
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px]">সকল ডেমো</span>
        </button>

        <a
          href="#products-section"
          className="flex flex-col items-center space-y-1 text-slate-400 hover:text-white"
        >
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span className="text-[10px]">পণ্যসমূহ</span>
        </a>

        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center space-y-1 text-slate-400 hover:text-white"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">ব্যাগ</span>
        </button>

        <a
          href="https://wa.me/8801629559653"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center space-y-1 text-emerald-400"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-[10px]">হোয়াটসঅ্যাপ</span>
        </a>
      </div>

    </div>
  );
}
