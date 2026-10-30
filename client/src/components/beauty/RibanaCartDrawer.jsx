import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, 
  Truck, Sparkles, MessageCircle, Gift, Check, Tag, ChevronRight,
  Flame, RefreshCw, Heart
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { RIBANA_PRODUCTS } from '../../data/ribanaBeautyData';

export default function RibanaCartDrawer() {
  const navigate = useNavigate();
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    addToCart,
    deliveryArea,
    setDeliveryArea
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Multi-tier reward thresholds (Unique feature!)
  const freeDeliveryThreshold = 1500;
  const freeGiftThreshold = 2500;
  
  const isFreeDelivery = cartSubtotal >= freeDeliveryThreshold;
  const isFreeGift = cartSubtotal >= freeGiftThreshold;

  const deliveryCharge = isFreeDelivery ? 0 : (deliveryArea === 'inside' ? 60 : 120);
  
  const discountAmount = appliedCoupon ? Math.round(cartSubtotal * 0.1) : 0; // 10% discount
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + deliveryCharge);
  
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeGiftThreshold) * 100));
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const remainingForFreeGift = Math.max(0, freeGiftThreshold - cartSubtotal);

  // Quick 1-Click Upsell Products (Unique RiBANA companion products)
  const upsellCandidates = RIBANA_PRODUCTS.filter(
    (p) => !cart.some((c) => c.id === p.id)
  ).slice(0, 3);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'GLOW10' || code === 'RIBANAGLOW') {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('অবৈধ কোড! GLOW10 ব্যবহার করুন ১০% ছাড়ে');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/beauty/checkout');
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemList = cart
      .map((item, idx) => `${idx + 1}. ${item.title} (${item.size || 'Standard'}) - পরিমাণ: ${item.quantity}টি, মূল্য: ৳${(item.price * item.quantity).toLocaleString('en-US')}`)
      .join('\n');
    const msg = `আসসালামু আলাইকুম! আমি RiBANA Organic থেকে নিচের প্রোডাক্টগুলো অর্ডার করতে চাই:\n\n${itemList}\n\nসাবটোটাল: ৳${cartSubtotal.toLocaleString('en-US')}\nডেলিভারি এরিয়া: ${deliveryArea === 'inside' ? 'ঢাকা সিটি (৳৬০)' : 'ঢাকার বাইরে (৳১২০)'}\nসর্বমোট: ৳${cartTotal.toLocaleString('en-US')}\nদয়া করে আমার অর্ডারটি কনফার্ম করুন।`;
    window.open(`https://wa.me/8801711223344?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#25161A]/60 backdrop-blur-md transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-gradient-to-b from-[#FFFDFB] via-[#FFF9F6] to-[#FAF1EB] text-[#2D1B22] shadow-[0_20px_60px_rgba(45,27,34,0.3)] flex flex-col justify-between border-l border-[#F0D5CC]/90"
            >
              {/* 1. Atelier Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-[#F0D5CC]/80 bg-white/80 backdrop-blur-lg sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8E2A3E] to-[#5C1625] text-white flex items-center justify-center shadow-md shadow-[#8E2A3E]/20">
                      <ShoppingBag className="w-4 h-4 text-pink-200" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-serif font-black text-base sm:text-lg text-[#241518] leading-tight">
                          আপনার বিউটি ব্যাগ
                        </h3>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <p className="text-[11px] font-mono text-[#8C6D74] font-medium">
                        {cart.length > 0 
                          ? `${cart.reduce((sum, i) => sum + i.quantity, 0)}টি খাঁটি অর্গানিক প্রোডাক্ট যুক্ত হয়েছে` 
                          : 'ব্যাগ খালি'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#FAF0E8] text-[#241518] flex items-center justify-center transition-all cursor-pointer border border-[#F0D5CC] shadow-2xs hover:scale-105 active:scale-95"
                    title="বন্ধ করুন"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. UNIQUE FEATURE: Multi-Tier Reward Progress Meter */}
                {cart.length > 0 && (
                  <div className="mt-3.5 p-3 rounded-2xl bg-gradient-to-br from-white to-[#FFF5EF] border border-[#F0D5CC] shadow-2xs space-y-2">
                    <div className="flex items-center justify-between text-xs font-serif">
                      <div className="flex items-center gap-1.5 font-bold text-[#241518]">
                        {isFreeGift ? (
                          <>
                            <Gift className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                            <span className="text-emerald-700 font-black">অভিনন্দন! ফ্রি গিফট ও ফ্রি ডেলিভারি আনলকড! 🎉</span>
                          </>
                        ) : isFreeDelivery ? (
                          <>
                            <Truck className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">ফ্রি ডেলিভারি আনলকড! আর ৳{remainingForFreeGift.toLocaleString('en-US')} অর্ডারে ফ্রি গিফট!</span>
                          </>
                        ) : (
                          <>
                            <Truck className="w-3.5 h-3.5 text-[#8E2A3E]" />
                            <span>আর মাত্র ৳{remainingForFreeDelivery.toLocaleString('en-US')} অর্ডারে <strong>ফ্রি হোম ডেলিভারি</strong>!</span>
                          </>
                        )}
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#8E2A3E]">{progressPercent}%</span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-2 rounded-full bg-[#EFE3DB] overflow-hidden relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-[#8E2A3E] via-[#BA3E50] to-[#E5A824]"
                      />
                    </div>

                    {/* Milestone Badges */}
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#7A5B63] pt-0.5">
                      <span className={isFreeDelivery ? 'text-emerald-700 flex items-center gap-0.5' : ''}>
                        {isFreeDelivery && <Check className="w-3 h-3 text-emerald-600 inline" />} ৳১,৫০০: ফ্রি ডেলিভারি
                      </span>
                      <span className={isFreeGift ? 'text-emerald-700 flex items-center gap-0.5' : ''}>
                        {isFreeGift && <Check className="w-3 h-3 text-emerald-600 inline" />} ৳২,৫০০: ফ্রি মিনি গিফট
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Cart Items Scrollable Container */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FAF0E8] to-[#FFEBE4] border border-[#F0D5CC] flex items-center justify-center text-[#8E2A3E] shadow-inner">
                      <ShoppingBag className="w-9 h-9 stroke-[1.4] text-[#8E2A3E]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-black text-lg text-[#241518]">আপনার ব্যাগ খালি</h4>
                      <p className="text-xs text-[#7A5B63] max-w-xs font-light">
                        আপনার স্কিনকেয়ার ও রূপচর্চায় রিভানার খাঁটি অর্গানিক পণ্য যুক্ত করে প্রাকৃতিক আভিজাত্য উপভোগ করুন।
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/beauty');
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#8E2A3E] hover:bg-[#6E1C2C] text-white font-bold text-xs tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      কালেকশন দেখুন
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Item Cards */}
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <motion.div
                          layout
                          key={item.variantKey || item.id}
                          className="p-3.5 rounded-2xl bg-white/90 border border-[#F0D5CC] shadow-xs flex items-center gap-3.5 hover:border-[#8E2A3E]/40 transition-all"
                        >
                          {/* Thumbnail */}
                          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-[#FAF0E8] border border-[#F0D5CC]/80 shrink-0 relative flex items-center justify-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h5 className="font-serif font-bold text-xs sm:text-sm text-[#241518] truncate leading-tight">
                              {item.title}
                            </h5>
                            <p className="text-[10.5px] font-mono text-[#8C6D74] mt-0.5">
                              {item.size || 'Standard'} • ১০০% অর্গানিক
                            </p>
                            
                            <div className="flex items-baseline space-x-2 mt-1">
                              <span className="font-serif font-black text-sm text-[#8E2A3E]">
                                ৳{(item.price * item.quantity).toLocaleString('en-US')}
                              </span>
                              {item.quantity > 1 && (
                                <span className="text-[10px] font-mono text-[#7A5B63]">
                                  (৳{item.price.toLocaleString('en-US')}/টি)
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls & Delete */}
                          <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.variantKey || item.id)}
                              className="text-[#9C7A82] hover:text-[#BA3E50] p-1 transition-colors cursor-pointer"
                              title="সরিয়ে ফেলুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="flex items-center space-x-1.5 bg-[#FAF1EB] border border-[#EEDCD2] rounded-full px-2 py-0.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.variantKey || item.id, -1)}
                                className="w-4 h-4 rounded-full flex items-center justify-center text-[#241518] hover:bg-white active:scale-90 transition-all cursor-pointer"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="text-xs font-mono font-black text-[#241518] min-w-[14px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.variantKey || item.id, 1)}
                                className="w-4 h-4 rounded-full flex items-center justify-center text-[#241518] hover:bg-white active:scale-90 transition-all cursor-pointer"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* 4. UNIQUE QUICK UPSELL: "Complete Your Skincare Ritual" Carousel */}
                    {upsellCandidates.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-[#F0D5CC]/70 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-serif font-black text-[#241518]">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>স্কিনকেয়ার রুটিন পূর্ণ করুন (১-ক্লিক অ্যাড)</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#8E2A3E] font-bold">স্পেশাল অফার</span>
                        </div>

                        <div className="space-y-2">
                          {upsellCandidates.map((upsell) => (
                            <div 
                              key={upsell.id}
                              className="p-2.5 rounded-xl bg-white/70 border border-[#F0D5CC] flex items-center justify-between gap-2.5 hover:bg-white transition-all shadow-2xs"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img
                                  src={upsell.image}
                                  alt={upsell.title}
                                  className="w-10 h-10 rounded-lg object-cover bg-[#FAF0E8] border border-[#F0D5CC]/80 shrink-0"
                                />
                                <div className="min-w-0">
                                  <h6 className="font-serif font-bold text-xs text-[#241518] truncate">
                                    {upsell.title}
                                  </h6>
                                  <span className="text-[11px] font-mono font-black text-[#8E2A3E]">
                                    ৳{upsell.price.toLocaleString('en-US')}
                                  </span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => addToCart(upsell, { size: upsell.size || 'Standard' })}
                                className="px-3 py-1 rounded-full bg-[#8E2A3E]/10 hover:bg-[#8E2A3E] text-[#8E2A3E] hover:text-white font-bold text-[11px] tracking-wide transition-all active:scale-95 shrink-0 flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                                <span>যোগ করুন</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 5. Delivery Area Selector */}
                    <div className="mt-4 pt-3 border-t border-[#F0D5CC]/70 space-y-2">
                      <span className="text-xs font-serif font-bold text-[#241518] flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#8E2A3E]" />
                        <span>ডেলিভারি এলাকা নির্বাচন করুন:</span>
                      </span>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setDeliveryArea('inside')}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            deliveryArea === 'inside'
                              ? 'bg-white border-[#8E2A3E] text-[#8E2A3E] font-bold shadow-2xs ring-1 ring-[#8E2A3E]/20'
                              : 'bg-white/60 border-[#F0D5CC] text-[#7A5B63] hover:bg-white'
                          }`}
                        >
                          <div>ঢাকা সিটি</div>
                          <div className="text-[10px] font-mono mt-0.5 font-bold">
                            {isFreeDelivery ? 'ফ্রি ডেলিভারি' : '৳৬০'}
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeliveryArea('outside')}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            deliveryArea === 'outside'
                              ? 'bg-white border-[#8E2A3E] text-[#8E2A3E] font-bold shadow-2xs ring-1 ring-[#8E2A3E]/20'
                              : 'bg-white/60 border-[#F0D5CC] text-[#7A5B63] hover:bg-white'
                          }`}
                        >
                          <div>ঢাকার বাইরে</div>
                          <div className="text-[10px] font-mono mt-0.5 font-bold">
                            {isFreeDelivery ? 'ফ্রি ডেলিভারি' : '৳১২০'}
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* 6. Coupon Voucher Input */}
                    <div className="pt-2">
                      {appliedCoupon ? (
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                          <span className="flex items-center gap-1.5 font-bold">
                            <Tag className="w-3.5 h-3.5 text-emerald-600" />
                            <span>কুপন '{appliedCoupon}' প্রযোজ্য (-৳{discountAmount})</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setAppliedCoupon(null)}
                            className="text-red-500 hover:text-red-700 font-bold text-xs cursor-pointer"
                          >
                            মুছুন
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                          <input
                            type="text"
                            placeholder="ডিসকাউন্ট কুপন (যেমন: GLOW10)"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 bg-white border border-[#F0D5CC] rounded-xl px-3 py-1.5 text-xs text-[#241518] focus:outline-none focus:border-[#8E2A3E] placeholder:text-[#9C7A82]"
                          />
                          <button
                            type="submit"
                            className="px-3.5 py-1.5 rounded-xl bg-[#FAF0E8] hover:bg-[#8E2A3E] hover:text-white border border-[#F0D5CC] text-[#8E2A3E] font-bold text-xs transition-colors cursor-pointer"
                          >
                            প্রয়োগ
                          </button>
                        </form>
                      )}
                      {couponError && (
                        <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* 7. Drawer Footer: Calculations & Neon Aurora Checkout */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-[#F0D5CC] bg-white/95 backdrop-blur-md space-y-3 sticky bottom-0 z-10 shadow-[0_-10px_30px_rgba(45,27,34,0.05)]">
                  {/* Calculation Breakdown */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#7A5B63]">
                      <span>সাবটোটাল</span>
                      <span className="font-mono font-bold text-[#241518]">
                        ৳{cartSubtotal.toLocaleString('en-US')}
                      </span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>কুপন ডিসকাউন্ট (১০%)</span>
                        <span className="font-mono font-bold">-৳{discountAmount.toLocaleString('en-US')}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[#7A5B63]">
                      <span>ডেলিভারি চার্জ</span>
                      <span className="font-mono font-bold">
                        {isFreeDelivery ? (
                          <span className="text-emerald-700 font-bold">ফ্রি (৳০)</span>
                        ) : (
                          `৳${deliveryCharge}`
                        )}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#F0D5CC]/80 flex justify-between items-baseline">
                      <div>
                        <span className="font-serif font-black text-sm text-[#241518]">মোট প্রদেয় মূল্য:</span>
                        <p className="text-[10px] text-[#8C6D74]">ভ্যাট ও ট্যাক্স অন্তর্ভুক্ত</p>
                      </div>
                      <span className="font-serif font-black text-xl sm:text-2xl text-[#8E2A3E]">
                        ৳{cartTotal.toLocaleString('en-US')}
                      </span>
                    </div>
                  </div>

                  {/* Primary Neon Aurora Glow Checkout Button */}
                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 px-6 rounded-full text-white font-black text-sm sm:text-[15px] tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-95 cursor-pointer relative group/btn"
                    style={{
                      background: 'linear-gradient(135deg, #2D1B22 0%, #3D1F28 50%, #1F1216 100%)',
                      boxShadow: '0 0 18px 3px rgba(244, 63, 94, 0.6), 0 0 30px 4px rgba(168, 85, 247, 0.4), 0 0 12px 1px rgba(56, 189, 248, 0.35)'
                    }}
                  >
                    <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none group-hover/btn:border-pink-300/60 transition-colors" />
                    <ShoppingBag className="w-4 h-4 text-pink-200 drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                    <span>চেকআউট সম্পন্ন করুন</span>
                    <ArrowRight className="w-4 h-4 text-pink-200 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  {/* Secondary WhatsApp 1-Click Order */}
                  <button
                    type="button"
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-2.5 px-4 rounded-full bg-[#FAF0E8] hover:bg-[#25D366] text-[#241518] hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-[#F0D5CC] transition-all cursor-pointer shadow-2xs active:scale-95 group/wa"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366] group-hover/wa:text-white transition-colors" />
                    <span>হোয়াটসঅ্যাপে সরাসরি অর্ডার করুন</span>
                  </button>

                  {/* Trust Footer Seals */}
                  <div className="pt-1 flex items-center justify-center gap-4 text-[10px] text-[#7A5B63] font-serif">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>১০০% নিরাপদ চেকআউট</span>
                    </span>
                    <span>•</span>
                    <span>ক্যাশ অন ডেলিভারি সুবিধা</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
