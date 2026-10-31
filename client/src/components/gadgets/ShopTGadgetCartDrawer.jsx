import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, 
  ShieldCheck, Tag, Zap, Gift, Truck, Check, Sparkles,
  Phone, MapPin, ChevronRight
} from 'lucide-react';
import cableOled from '../../assets/gadgets/cable_typec_oled_display.webp';
import chargerGan from '../../assets/gadgets/charger_gan_100w.webp';

export default function ShopTGadgetCartDrawer({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart, clearCart, addToCart, getNicheCart, getProductNiche } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickCity, setQuickCity] = useState('dhaka');
  const [quickOrderSuccess, setQuickOrderSuccess] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const rawCart = getNicheCart ? getNicheCart('gadgets') : (Array.isArray(cart) ? cart : []);
  const cartItems = rawCart.filter((item) => (getProductNiche ? getProductNiche(item) : (item.id || '').startsWith('shopt-') || (item.id || '').startsWith('addon-')) === 'gadgets');
  const subtotal = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  
  // Gamified Milestones: 2,000 for free shipping, 5,000 for free 100W cable
  const freeShippingThreshold = 2000;
  const freeGiftThreshold = 5000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeGiftThreshold) * 100));

  const handleApplyCoupon = (codeToApply) => {
    const code = (typeof codeToApply === 'string' ? codeToApply : couponCode).trim().toUpperCase();
    if (code === 'SHOPT10' || code === 'GADGET10') {
      const discountVal = Math.round(subtotal * 0.1);
      setDiscount(discountVal);
      setCouponMsg('১০% প্রোমো ডিসকাউন্ট যুক্ত হয়েছে!');
    } else {
      setDiscount(0);
      setCouponMsg('সঠিক কুপন দিন। (ক্লিক করুন: SHOPT10)');
    }
  };

  const handleQuickOrder = (e) => {
    e.preventDefault();
    if (!quickPhone || quickPhone.length < 11) {
      alert('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।');
      return;
    }
    setQuickOrderSuccess(true);
    setTimeout(() => {
      clearCart();
      setQuickOrderSuccess(false);
      onClose();
      navigate('/gadgets/checkout');
    }, 2000);
  };

  const finalTotal = Math.max(0, subtotal - discount);

  // Quick Upsell items that can be added in 1 click
  const quickUpsells = [
    {
      id: 'addon-1',
      title: '100W GaN ব্রেডেড টাইপ-সি ক্যাবল',
      price: 290,
      oldPrice: 450,
      image: cableOled
    },
    {
      id: 'addon-2',
      title: '65W ফাস্ট ট্রাভেল চার্জিং অ্যাডাপ্টার',
      price: 690,
      oldPrice: 950,
      image: chargerGan
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-full sm:w-[420px] max-w-full bg-gradient-to-b from-[#080E1C] via-[#0C152B] to-[#060A14] text-white flex flex-col shadow-2xl border-l border-cyan-500/30">
          
          {/* 1. Header with Tech Telemetry */}
          <div className="p-3.5 sm:p-4 bg-[#060B17]/95 border-b border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-inner shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-black text-white flex items-center gap-1.5 truncate">
                  <span>স্প্যাশিয়াল কার্ট ডেক</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                </h2>
                <p className="text-[10.5px] sm:text-[11px] text-slate-400 font-medium truncate">
                  {cartItems.length} টি গ্যাজেট আইটেম সংরক্ষিত
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer border border-slate-700/60"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Gamified Free Shipping & Gift Progress Bar */}
          <div className="bg-[#0A1224] px-4 py-3 border-b border-cyan-500/20">
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              {subtotal >= freeGiftThreshold ? (
                <span className="text-amber-300 flex items-center gap-1 font-black">
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  🎉 ফ্রি ডেলিভারি + 100W ফাস্ট ক্যাবল গিফট আনলকড!
                </span>
              ) : subtotal >= freeShippingThreshold ? (
                <span className="text-emerald-400 flex items-center gap-1 font-black">
                  <Truck className="w-3.5 h-3.5" />
                  ফ্রি হোম ডেলিভারি একটিভ! (আর ৳{(freeGiftThreshold - subtotal).toLocaleString('bn-BD')} এ ফ্রি গিফট 🎁)
                </span>
              ) : (
                <span className="text-slate-300 text-[11px]">
                  আর <strong className="text-cyan-400">৳{(freeShippingThreshold - subtotal).toLocaleString('bn-BD')}</strong> যোগ করলেই <span className="text-emerald-400 font-black">ফ্রি ডেলিভারি</span>!
                </span>
              )}
              <span className="text-cyan-400 font-mono text-[11px]">{progressPercent}%</span>
            </div>
            
            {/* Multi-tier Progress bar */}
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
              <span>৳০</span>
              <span className={subtotal >= freeShippingThreshold ? 'text-emerald-400' : ''}>৳২,০০০ (ফ্রি ডেলিভারি)</span>
              <span className={subtotal >= freeGiftThreshold ? 'text-amber-400' : ''}>৳৫,০০০ (ফ্রি গিফট)</span>
            </div>
          </div>

          {/* 3. Cart Items Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 shadow-inner">
                  <ShoppingBag className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-sm font-black text-slate-200">আপনার কার্ট বর্তমানে খালি</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  আমাদের ফিউচারিস্টিক TWS ইয়ারবাডস, স্মার্টওয়াচ ও ফাস্ট চার্জার কালেকশন থেকে পছন্দসই প্রোডাক্ট যোগ করুন।
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  গ্যাজেট ব্রাউজ করুন
                </button>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-2.5">
                  {cartItems.map((item, idx) => (
                    <div 
                      key={item.variantKey || item.id || idx}
                      className="bg-[#0D1830] p-3 rounded-2xl border border-slate-800/90 hover:border-cyan-500/30 flex gap-3 relative group transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-slate-700/80 shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-black text-slate-100 line-clamp-1 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs font-black text-cyan-400 mt-0.5">
                            ৳{(item.price || 0).toLocaleString('bn-BD')}
                          </p>
                        </div>

                        {/* Quantity and Delete Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900/90 overflow-hidden">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateQuantity(item.variantKey || item.id, -1);
                              }}
                              className="px-2.5 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                              title="সংখ্যা কমান"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-black text-white font-mono min-w-[20px] text-center">
                              {item.quantity || 1}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateQuantity(item.variantKey || item.id, 1);
                              }}
                              className="px-2.5 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                              title="সংখ্যা বাড়ান"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeFromCart(item.variantKey || item.id);
                            }}
                            className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/15 border border-slate-700/80 hover:border-rose-500/40 rounded-lg p-2 transition-all cursor-pointer flex items-center justify-center active:scale-90"
                            title="কার্ট থেকে মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 4. One-Click Quick Accessory Upsells (Distinct Feature) */}
                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      প্রয়োজনীয় গ্যাজেট গিয়ার (১-ক্লিকে অ্যাড)
                    </span>
                  </div>
                  <div className="space-y-2">
                    {quickUpsells.map((addon) => (
                      <div 
                        key={addon.id}
                        className="bg-[#091122] p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img 
                            src={addon.image} 
                            alt={addon.title} 
                            className="w-10 h-10 object-contain bg-white rounded-lg p-0.5 border border-slate-700 shrink-0" 
                          />
                          <div className="truncate">
                            <p className="font-bold text-slate-200 truncate text-[11px]">{addon.title}</p>
                            <p className="text-cyan-400 font-black text-xs">
                              ৳{addon.price}{' '}
                              <span className="text-slate-500 line-through text-[10px]">৳{addon.oldPrice}</span>
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart({ ...addon, brand: 'ShopT Gear' }, 1)}
                          className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-black text-xs border border-cyan-500/30 transition-all shrink-0 cursor-pointer"
                        >
                          + যোগ
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. 1-Click Fast Cash on Delivery Order Box (Radically Unique) */}
                <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-br from-[#0B152B] to-[#080E1C] border border-cyan-400/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      সরাসরি দ্রুত ক্যাশ অন ডেলিভারি
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded">
                      সবচেয়ে দ্রুত
                    </span>
                  </div>

                  {quickOrderSuccess ? (
                    <div className="p-3 bg-emerald-600/20 border border-emerald-500/40 rounded-xl text-center space-y-1">
                      <p className="text-xs font-black text-emerald-400 flex items-center justify-center gap-1">
                        <Check className="w-4 h-4" /> আপনার অর্ডার নিশ্চিত হয়েছে!
                      </p>
                      <p className="text-[10px] text-slate-300">চেকআউট পেজে রিডাইরেক্ট করা হচ্ছে...</p>
                    </div>
                  ) : (
                    <form onSubmit={handleQuickOrder} className="space-y-2">
                      <input
                        type="tel"
                        required
                        value={quickPhone}
                        onChange={(e) => setQuickPhone(e.target.value)}
                        placeholder="আপনার ১১ ডিজিটের মোবাইল নম্বর দিন..."
                        className="w-full bg-[#050A14] text-xs px-3 py-2 rounded-xl border border-slate-700 focus:border-cyan-400 focus:outline-none text-slate-100 placeholder-slate-500"
                      />
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setQuickCity('dhaka')}
                          className={`py-1.5 px-2 rounded-lg border font-bold text-center cursor-pointer transition-all ${
                            quickCity === 'dhaka' 
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          ঢাকা মেট্রো (৬০৳)
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuickCity('outside')}
                          className={`py-1.5 px-2 rounded-lg border font-bold text-center cursor-pointer transition-all ${
                            quickCity === 'outside' 
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          ঢাকার বাইরে (১২০৳)
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5 fill-slate-950" />
                        <span>১-ক্লিকে ক্যাশ অন ডেলিভারি কনফার্ম করুন</span>
                      </button>
                    </form>
                  )}
                </div>

                {/* 6. Promo Coupon Code */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="কুপন কোড (যেমন: SHOPT10)"
                      className="flex-1 bg-[#091122] text-xs px-3 py-2 rounded-xl border border-slate-700 text-slate-100 placeholder-slate-500 uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-black text-xs rounded-xl border border-slate-700 cursor-pointer"
                    >
                      প্রয়োগ
                    </button>
                  </div>
                  {couponMsg && (
                    <p className="text-[10px] text-cyan-300 mt-1 font-bold">{couponMsg}</p>
                  )}
                  <button 
                    type="button" 
                    onClick={() => { setCouponCode('SHOPT10'); handleApplyCoupon('SHOPT10'); }}
                    className="mt-1 text-[10px] text-slate-400 hover:text-cyan-400 underline cursor-pointer"
                  >
                    💡 ১০% ডিসকাউন্ট পেতে ট্যাপ করুন: <strong>SHOPT10</strong>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* 7. Drawer Footer: Price Telemetry & Detailed Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-[#050A14] border-t border-slate-800 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>সাবটোটাল</span>
                  <span className="font-mono text-slate-200">৳{subtotal.toLocaleString('bn-BD')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>কুপন ছাড় (১০%)</span>
                    <span className="font-mono">-৳{discount.toLocaleString('bn-BD')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>ডেলিভারি চার্জ</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {subtotal >= freeShippingThreshold ? 'ফ্রি' : '৬০৳ (চেকআউটে যুক্ত হবে)'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                  <span>সর্বমোট প্রদেয়</span>
                  <span className="font-mono text-cyan-400 text-base">
                    ৳{finalTotal.toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>

              {/* Detailed Checkout Link Button */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/gadgets/checkout');
                }}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg group"
              >
                <span>বিস্তারিত ঠিকানা ও পেমেন্ট পেজে যান</span>
                <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>১ বছরের অফিসিয়াল রিপ্লেসমেন্ট কাভারেজ অন্তর্ভুক্ত</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
