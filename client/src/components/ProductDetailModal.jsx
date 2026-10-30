import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Star, ShieldCheck, Truck, RotateCcw, 
  ShoppingBag, MessageCircle, Check, Award, Zap, Ruler
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ProductDetailModal({ product, onClose }) {
  const { addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || null);
  const [activeImage, setActiveImage] = useState(product?.image);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, { size: selectedSize, color: selectedColor });
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 1200);
  };

  const handleWhatsAppBuy = () => {
    const text = `আসসালামু আলাইকুম! আমি "${product.title}" প্রোডাক্টটি অর্ডার করতে চাই।\nমূল্য: ৳${product.price}\n${selectedSize ? `সাইজ: ${selectedSize}\n` : ''}${selectedColor ? `কালার: ${selectedColor}\n` : ''}ডেলিভারি বিস্তারিত জানতে চাই।`;
    window.open(`https://wa.me/8801629559653?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center font-sans">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 text-white shadow-2xl overflow-hidden my-8 z-10"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={activeImage || product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Gallery thumbnails if available */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex space-x-2">
                  {product.gallery.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        activeImage === img ? 'border-amber-400 scale-95' : 'border-slate-800 opacity-60'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center text-[10px] text-slate-400">
                <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span>১০০% অথেন্টিক</span>
                </div>
                <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <Truck className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <span>ক্যাশ অন ডেলিভারি</span>
                </div>
                <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <RotateCcw className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span>সহজ রিটার্ন পলিসি</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Controls */}
            <div className="space-y-5 text-xs">
              
              <div>
                <div className="flex items-center space-x-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-slate-400 font-bold text-[11px]">{product.rating} ({product.reviewsCount} টি রিভিউ)</span>
                </div>

                <h2 className="text-lg sm:text-2xl font-black text-white mt-1.5 leading-snug">
                  {product.title}
                </h2>
                
                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                  {product.shortDesc}
                </p>
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline space-x-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                  ৳{product.price.toLocaleString('en-US')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through font-mono">
                    ৳{product.originalPrice.toLocaleString('en-US')}
                  </span>
                )}
                <span className="text-[11px] text-emerald-400 font-bold ml-auto bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  স্টকে আছে (Ready to Ship)
                </span>
              </div>

              {/* Niche: Clothing Sizes & Colors */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-300">সাইজ নির্বাচন করুন:</label>
                    <span className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                      <Ruler className="w-3 h-3" />
                      <span>সাইজ চার্ট গাইড</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-black'
                            : 'bg-slate-950 text-slate-300 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Niche: Colors Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="font-bold text-slate-300">
                    কালার: <span className="text-amber-400 font-normal">{selectedColor || product.colors[0].name}</span>
                  </label>
                  <div className="flex items-center space-x-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                          selectedColor === c.name ? 'border-amber-400 scale-110' : 'border-transparent'
                        }`}
                        title={c.name}
                      >
                        <span className="block w-full h-full rounded-full border border-black/40" style={{ backgroundColor: c.hex }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Niche: Gadget Specs Table */}
              {product.specs && (
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 text-[11px]">
                  <h4 className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1 mb-2">
                    <Zap className="w-3.5 h-3.5" />
                    <span>প্রোডাক্ট স্পেসিফিকেশন ও ওয়ারেন্টি</span>
                  </h4>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-slate-800/80 pb-1">
                      <span className="text-slate-400 capitalize">{key}:</span>
                      <span className="font-bold text-slate-200 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Niche: Beauty Ingredients & Skin Type */}
              {product.skinType && (
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">উপযোগী ত্বক:</span>
                    <span className="text-rose-300 font-bold">{product.skinType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">পরিমাণ:</span>
                    <span className="text-white font-mono">{product.weight}</span>
                  </div>
                  {product.ingredients && (
                    <div className="pt-1.5 border-t border-slate-800/80">
                      <span className="text-slate-400 block mb-0.5">মূল উপাদান:</span>
                      <span className="text-slate-300 text-[10px] leading-relaxed block">{product.ingredients}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Niche: Organic Food Purity */}
              {product.source && (
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">উৎস / উৎসস্থল:</span>
                    <span className="text-amber-400 font-bold">{product.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">নেট ওজন:</span>
                    <span className="text-white font-mono">{product.weight}</span>
                  </div>
                  {product.purity && (
                    <div className="flex justify-between pt-1 border-t border-slate-800/80">
                      <span className="text-slate-400">বিশুদ্ধতার মানদণ্ড:</span>
                      <span className="text-emerald-400 font-bold">{product.purity}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xl active:scale-95 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedNotice ? '✓ ব্যাগে যুক্ত হয়েছে!' : 'শপিং ব্যাগে যুক্ত করুন (Add to Cart)'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppBuy}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>সরাসরি হোয়াটসঅ্যাপে অর্ডার করুন</span>
                </button>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
