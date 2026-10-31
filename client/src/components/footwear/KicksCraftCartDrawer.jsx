import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, 
  Sparkles, Plus, Minus, Tag, PhoneCall, Truck, Lock 
} from 'lucide-react';
import { FOOTWEAR_BRAND } from '../../data/footwearData';

export default function KicksCraftCartDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { cart = [], removeFromCart, updateQuantity, clearCart, getNicheCart, getProductNiche } = useStore();
  
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  if (!isOpen) return null;

  const rawCart = getNicheCart ? getNicheCart('footwear') : cart;
  const footwearCart = (Array.isArray(rawCart) ? rawCart : []).filter((item) => (getProductNiche ? getProductNiche(item) : (item.id || '').startsWith('kc-')) === 'footwear');

  const subtotal = footwearCart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
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

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-full sm:w-[420px] max-w-full bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          
          {/* Header */}
          <div className="p-3.5 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-2 bg-[#0B0F17] text-white">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#FF4800] flex items-center justify-center text-white shadow-sm shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-black text-sm sm:text-base leading-none truncate">আপনার শপিং ব্যাগ</h3>
                <span className="text-[10px] sm:text-[11px] text-orange-400 font-bold truncate block mt-0.5">
                  {footwearCart.length} জোড়া আইটেম যুক্ত রয়েছে
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
                style={{ width: `${freeProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100 space-y-3">
            {footwearCart.length === 0 ? (
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
              footwearCart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex gap-3 sm:gap-4 items-center">
                  {/* Sneaker Thumbnail */}
                  <div className="w-20 h-20 rounded-xl bg-slate-100 p-1.5 shrink-0 overflow-hidden border border-slate-200 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
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
          {footwearCart.length > 0 && (
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
                      `৳${deliveryCharge}`
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
