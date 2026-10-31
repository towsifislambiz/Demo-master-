import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, ArrowLeft, Check, CheckCircle2, ShoppingBag, 
  Truck, Tag, Sparkles, MessageCircle, AlertCircle, Phone, 
  MapPin, Lock, ChevronRight, Gift, RotateCcw
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { RIBANA_PRODUCTS } from '../../data/ribanaBeautyData';
import RibanaCartDrawer from './RibanaCartDrawer';

export default function RibanaCheckoutPage() {
  const navigate = useNavigate();
  const { 
    cart, 
    clearCart, 
    deliveryArea, 
    setDeliveryArea, 
    placeOrder,
    getNicheCart,
    getProductNiche
  } = useStore();

  const rawCart = getNicheCart ? getNicheCart('beauty') : (Array.isArray(cart) ? cart : []);
  const beautyCart = rawCart.filter((item) => (getProductNiche ? getProductNiche(item) : (item.id || '').startsWith('rb-')) === 'beauty');

  // If cart is empty, provide default luxury demo items so page is always rich & interactive
  const effectiveCart = beautyCart.length > 0 ? beautyCart : [
    {
      ...RIBANA_PRODUCTS[0],
      quantity: 1,
      variantKey: 'rb-serum-1-30ml-def'
    },
    {
      ...RIBANA_PRODUCTS[1],
      quantity: 1,
      variantKey: 'rb-gel-1-130ml-def'
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'ঢাকা',
    notes: '',
    paymentMethod: 'Cash on Delivery'
  });

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const cartSubtotal = effectiveCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeDeliveryThreshold = 1500;
  const isFreeDelivery = cartSubtotal >= freeDeliveryThreshold;
  const deliveryCharge = isFreeDelivery ? 0 : (deliveryArea === 'inside' ? 60 : 120);
  const discountAmount = appliedCoupon ? Math.round(cartSubtotal * 0.1) : 0;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + deliveryCharge);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'GLOW10' || code === 'RIBANAGLOW') {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('অবৈধ কুপন! GLOW10 ব্যবহার করুন ১০% ছাড়ে');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'আপনার সম্পূর্ণ নাম লিখুন';
    if (!formData.phone.trim()) {
      errors.phone = 'সচল মোবাইল নম্বর লিখুন';
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      errors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)';
    }
    if (!formData.address.trim()) errors.address = 'সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (cart.length === 0) return;

    setIsSubmitting(true);

    const orderId = 'RBN-' + Math.floor(100000 + Math.random() * 900000);
    const orderPayload = {
      orderId,
      id: orderId,
      orderPrefix: 'RBN-',
      niche: 'beauty',
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      area: deliveryArea === 'inside' ? 'ঢাকা সিটি' : 'ঢাকার বাইরে',
      notes: formData.notes,
      paymentMethod: formData.paymentMethod,
      subtotal: cartSubtotal,
      deliveryCharge,
      discount: discountAmount,
      total: grandTotal,
      items: effectiveCart,
      date: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    try {
      await placeOrder(orderPayload);
      setOrderConfirmed(orderPayload);
      clearCart();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If order was successfully placed, render Order Confirmation View
  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-[#FFF8F5] text-[#2D1B22] font-sans selection:bg-[#F3D5D0] flex flex-col justify-between p-4 sm:p-6 lg:p-10">
        <div className="max-w-2xl mx-auto w-full my-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="p-6 sm:p-10 rounded-3xl bg-white border border-[#F0D5CC] shadow-[0_20px_60px_rgba(53,35,38,0.08)] text-center space-y-6"
          >
            {/* Animated Success Badge */}
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-bold uppercase tracking-wider">
                অর্ডার নিশ্চিত হয়েছে • ধন্যবাদ!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#241518]">
                আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে
              </h2>
              <p className="text-xs sm:text-sm text-[#7A5B63] max-w-md mx-auto font-light">
                অর্ডার ট্র্যাকিং আইডি: <strong className="font-mono text-[#8E2A3E] text-base">{orderConfirmed.orderId}</strong>
              </p>
            </div>

            {/* Order Details Brief Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF9F6] border border-[#F0D5CC] text-left text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-[#F0D5CC]">
                <span className="text-[#7A5B63]">গ্রাহকের নাম:</span>
                <span className="font-bold text-[#241518]">{orderConfirmed.customerName}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#F0D5CC]">
                <span className="text-[#7A5B63]">মোবাইল নম্বর:</span>
                <span className="font-mono font-bold text-[#241518]">{orderConfirmed.phone}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#F0D5CC]">
                <span className="text-[#7A5B63]">ডেলিভারি ঠিকানা:</span>
                <span className="font-bold text-[#241518] text-right max-w-xs truncate">{orderConfirmed.address}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#F0D5CC]">
                <span className="text-[#7A5B63]">পেমেন্ট মেথড:</span>
                <span className="font-bold text-emerald-700">{orderConfirmed.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-serif font-black text-sm text-[#241518]">সর্বমোট প্রদেয়:</span>
                <span className="font-serif font-black text-xl text-[#8E2A3E]">৳{orderConfirmed.total.toLocaleString('en-US')}</span>
              </div>
            </div>

            {/* Delivery Estimation Pill */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-center justify-center gap-2">
              <Truck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {deliveryArea === 'inside' 
                  ? 'ঢাকা সিটির ভিতরে ২৪-৪৮ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হবে।' 
                  : 'ঢাকার বাইরে ৪৮-৭২ ঘণ্টার মধ্যে হোম ডেলিভারি সম্পন্ন হবে।'}
              </span>
            </div>

            {/* Actions Button Row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  const text = `আসসালামু আলাইকুম! আমি RiBANA থেকে ${orderConfirmed.orderId} অর্ডারের রিসিট পেয়েছি। অনুগ্রহ করে দ্রুত পাঠিয়ে দিন।`;
                  window.open(`https://wa.me/8801711223344?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="flex-1 py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#1eb857] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপে রিসিট দেখুন</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/beauty')}
                className="flex-1 py-3 px-5 rounded-full bg-[#8E2A3E] hover:bg-[#6E1C2C] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>আরও কেনাকাটা করুন</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-[#FFF8F5] text-[#2D1B22] font-sans selection:bg-[#F3D5D0] flex flex-col justify-between">
      
      {/* 1. Haute Couture Minimal Checkout Top Bar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-[#F0D5CC] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/beauty')}
            className="text-xs font-serif font-bold text-[#8E2A3E] hover:text-[#5C1625] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>কালেকশনে ফিরুন</span>
          </button>

          {/* Center Brand Crest */}
          <div className="flex items-center space-x-2">
            <span className="font-serif font-black text-lg sm:text-xl text-[#241518] tracking-widest">
              RiBANA
            </span>
            <span className="text-[10px] font-mono text-[#8E2A3E] border-l border-[#F0D5CC] pl-2 uppercase tracking-widest font-bold">
              ORGANIC CHECKOUT
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">১০০% নিরাপদ চেকআউট</span>
          </div>
        </div>
      </header>

      {/* 2. Main Checkout Two-Column Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ====================================================
              LEFT COLUMN: Customer Delivery & Payment Information (7 Cols)
              ==================================================== */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Contact & Delivery Details */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#F0D5CC] shadow-sm space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-[#F0D5CC]/80">
                <div className="w-7 h-7 rounded-full bg-[#8E2A3E] text-white font-mono font-bold text-xs flex items-center justify-center">
                  ১
                </div>
                <div>
                  <h3 className="font-serif font-black text-base sm:text-lg text-[#241518] leading-tight">
                    ডেলিভারি ঠিকানা ও যোগাযোগের তথ্য
                  </h3>
                  <p className="text-[11px] text-[#7A5B63]">সঠিক তথ্য দিন যাতে কুরিয়ার প্রতিনিধি সরাসরি আপনার সাথে যোগাযোগ করতে পারেন</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                {/* Full Name */}
                <div>
                  <label className="block font-serif font-bold text-[#241518] mb-1.5">
                    আপনার সম্পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: নুসরাত জাহান"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full p-3 rounded-xl bg-[#FFF9F6] border text-xs text-[#241518] focus:outline-none transition-all ${
                      formErrors.name ? 'border-red-500 ring-1 ring-red-500/20' : 'border-[#F0D5CC] focus:border-[#8E2A3E]'
                    }`}
                  />
                  {formErrors.name && <p className="text-[11px] text-red-600 mt-1">{formErrors.name}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block font-serif font-bold text-[#241518] mb-1.5">
                    সচল মোবাইল নম্বর (কুরিয়ারের জন্য) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="যেমন: 01712345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full p-3 pl-10 rounded-xl bg-[#FFF9F6] border text-xs text-[#241518] font-mono focus:outline-none transition-all ${
                        formErrors.phone ? 'border-red-500 ring-1 ring-red-500/20' : 'border-[#F0D5CC] focus:border-[#8E2A3E]'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-[#8E2A3E] absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {formErrors.phone && <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>}
                </div>

                {/* Delivery Zone Selector */}
                <div>
                  <label className="block font-serif font-bold text-[#241518] mb-1.5">
                    ডেলিভারি এরিয়া নির্বাচন করুন <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryArea('inside')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        deliveryArea === 'inside'
                          ? 'bg-gradient-to-br from-[#FFF5EF] to-white border-[#8E2A3E] text-[#8E2A3E] ring-1 ring-[#8E2A3E]/30 shadow-xs'
                          : 'bg-[#FFF9F6] border-[#F0D5CC] text-[#7A5B63] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-serif text-xs">ঢাকা সিটির ভিতরে</span>
                        <span className="text-[11px] font-mono font-black">
                          {isFreeDelivery ? 'ফ্রি!' : '৳৬০'}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#8C6D74] mt-1 font-light">২৪-৪৮ ঘণ্টার মধ্যে হোম ডেলিভারি</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryArea('outside')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        deliveryArea === 'outside'
                          ? 'bg-gradient-to-br from-[#FFF5EF] to-white border-[#8E2A3E] text-[#8E2A3E] ring-1 ring-[#8E2A3E]/30 shadow-xs'
                          : 'bg-[#FFF9F6] border-[#F0D5CC] text-[#7A5B63] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-serif text-xs">ঢাকা সিটির বাইরে</span>
                        <span className="text-[11px] font-mono font-black">
                          {isFreeDelivery ? 'ফ্রি!' : '৳১২০'}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#8C6D74] mt-1 font-light">৪৮-৭২ ঘণ্টার মধ্যে সারা বাংলাদেশ</p>
                    </button>
                  </div>
                </div>

                {/* Full Delivery Address */}
                <div>
                  <label className="block font-serif font-bold text-[#241518] mb-1.5">
                    সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা/উপজেলা) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="যেমন: বাড়ি ১২, রোড ৪, সেক্টর ৭, উত্তরা, ঢাকা"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full p-3 rounded-xl bg-[#FFF9F6] border text-xs text-[#241518] focus:outline-none transition-all ${
                      formErrors.address ? 'border-red-500 ring-1 ring-red-500/20' : 'border-[#F0D5CC] focus:border-[#8E2A3E]'
                    }`}
                  />
                  {formErrors.address && <p className="text-[11px] text-red-600 mt-1">{formErrors.address}</p>}
                </div>

                {/* Optional Notes */}
                <div>
                  <label className="block font-serif font-bold text-[#7A5B63] mb-1.5">
                    বিশেষ কোনো নির্দেশনা (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: বিকেলে ডেলিভারি করবেন / কল দিয়ে আসবেন"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#FFF9F6] border border-[#F0D5CC] text-xs text-[#241518] focus:outline-none focus:border-[#8E2A3E]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method Selection */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#F0D5CC] shadow-sm space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-[#F0D5CC]/80">
                <div className="w-7 h-7 rounded-full bg-[#8E2A3E] text-white font-mono font-bold text-xs flex items-center justify-center">
                  ২
                </div>
                <div>
                  <h3 className="font-serif font-black text-base sm:text-lg text-[#241518] leading-tight">
                    মূল্য পরিশোধের পদ্ধতি
                  </h3>
                  <p className="text-[11px] text-[#7A5B63]">আপনার সুবিধাজনক পেমেন্ট মেথডটি নির্বাচন করুন</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                {/* Cash on Delivery (Primary) */}
                <label 
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    formData.paymentMethod === 'Cash on Delivery'
                      ? 'bg-gradient-to-r from-[#FFF5EF] to-white border-[#8E2A3E] ring-1 ring-[#8E2A3E]/30 shadow-xs'
                      : 'bg-[#FFF9F6] border-[#F0D5CC] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === 'Cash on Delivery'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-4 h-4 text-[#8E2A3E] focus:ring-[#8E2A3E]"
                    />
                    <div>
                      <div className="font-serif font-black text-sm text-[#241518] flex items-center gap-2">
                        <span>ক্যাশ অন ডেলিভারি (Cash on Delivery)</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          সবচেয়ে জনপ্রিয়
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A5B63] font-light mt-0.5">
                        পণ্য হাতে পেয়ে চেক করে ডেলিভারিম্যানকে টাকা পরিশোধ করুন।
                      </p>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                </label>

                {/* bKash Payment */}
                <label 
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    formData.paymentMethod === 'bKash'
                      ? 'bg-gradient-to-r from-pink-50 to-white border-pink-500 ring-1 ring-pink-500/30 shadow-xs'
                      : 'bg-[#FFF9F6] border-[#F0D5CC] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bKash"
                      checked={formData.paymentMethod === 'bKash'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-4 h-4 text-[#8E2A3E] focus:ring-[#8E2A3E]"
                    />
                    <div>
                      <div className="font-serif font-black text-sm text-[#241518] flex items-center gap-2">
                        <span>বিকাশ ইনস্ট্যান্ট পেমেন্ট (bKash)</span>
                        <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-mono text-[10px] font-bold">
                          ইনস্ট্যান্ট কনফার্ম
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A5B63] font-light mt-0.5">
                        বিকাশ মার্চেন্ট একাউন্টে নিরাপদ পেমেন্ট করুন।
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#E2136E] text-white flex items-center justify-center font-bold text-xs">
                    bK
                  </div>
                </label>
              </div>
            </div>

            {/* Reassurance Guarantee Box */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[#FAF0E8]/70 border border-[#F0D5CC] flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 text-[#8E2A3E] shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <h4 className="font-serif font-bold text-[#241518]">রিভানা ১০০% স্যাটিসফ্যাকশন ও অরিজিনাল গ্যারান্টি</h4>
                <p className="text-[#684B52] font-light leading-relaxed">
                  আমরা সম্পূর্ণ বিশুদ্ধ প্রাকৃতিক উপাদান ও কোল্ড-প্রসেস মেথডে পণ্য তৈরি করি। ডেলিভারির সময় পার্সেল চেক করে নেওয়ার সম্পূর্ণ সুযোগ রয়েছে। কোনো সমস্যা হলে ৭ দিনের মধ্যে সহজে রিটার্ন সুবিধা পাবেন।
                </p>
              </div>
            </div>

          </div>

          {/* ====================================================
              RIGHT COLUMN: Order Summary & Aurora Neon Button (5 Cols)
              ==================================================== */}
          <div className="lg:col-span-5 space-y-5 sticky top-20">
            
            <div className="p-5 sm:p-7 rounded-3xl bg-white border border-[#F0D5CC] shadow-md space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0D5CC]">
                <h3 className="font-serif font-black text-base sm:text-lg text-[#241518]">
                  অর্ডার রিভিউ ({effectiveCart.reduce((s, i) => s + i.quantity, 0)}টি প্রোডাক্ট)
                </h3>
                <span className="text-xs font-mono font-bold text-[#8E2A3E]">রিভানা অ্যাটেলিয়ার</span>
              </div>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {effectiveCart.map((item) => (
                  <div key={item.variantKey || item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-cover bg-[#FAF0E8] border border-[#F0D5CC]/80 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif font-bold text-xs text-[#241518] truncate">
                        {item.title}
                      </h5>
                      <p className="text-[10px] font-mono text-[#8C6D74]">
                        {item.size || 'Standard'} • পরিমাণ: {item.quantity}টি
                      </p>
                    </div>
                    <span className="font-serif font-black text-xs sm:text-sm text-[#8E2A3E] shrink-0">
                      ৳{(item.price * item.quantity).toLocaleString('en-US')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Voucher Box */}
              <div className="pt-3 border-t border-[#F0D5CC]/80">
                {appliedCoupon ? (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>কুপন '{appliedCoupon}' প্রয়োগ করা হয়েছে (-৳{discountAmount})</span>
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
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="কুপন কোড (যেমন: GLOW10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-[#FFF9F6] border border-[#F0D5CC] rounded-xl px-3 py-2 text-xs text-[#241518] focus:outline-none focus:border-[#8E2A3E]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 rounded-xl bg-[#FAF0E8] hover:bg-[#8E2A3E] hover:text-white border border-[#F0D5CC] text-[#8E2A3E] font-bold text-xs transition-colors cursor-pointer"
                    >
                      প্রয়োগ
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs pt-3 border-t border-[#F0D5CC]/80">
                <div className="flex justify-between text-[#7A5B63]">
                  <span>সাবটোটাল</span>
                  <span className="font-mono font-bold text-[#241518]">৳{cartSubtotal.toLocaleString('en-US')}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>কুপন ছাড় (১০%)</span>
                    <span className="font-mono">-৳{discountAmount.toLocaleString('en-US')}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#7A5B63]">
                  <span>ডেলিভারি চার্জ ({deliveryArea === 'inside' ? 'ঢাকা সিটি' : 'ঢাকার বাইরে'})</span>
                  <span className="font-mono font-bold">
                    {isFreeDelivery ? (
                      <span className="text-emerald-700 font-bold">ফ্রি (৳০)</span>
                    ) : (
                      `৳${deliveryCharge}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#F0D5CC] flex justify-between items-baseline">
                  <div>
                    <span className="font-serif font-black text-base text-[#241518]">সর্বমোট প্রদেয় মূল্য:</span>
                    <p className="text-[10px] text-[#8C6D74]">ভ্যাট ও ট্যাক্স অন্তর্ভুক্ত</p>
                  </div>
                  <span className="font-serif font-black text-2xl sm:text-3xl text-[#8E2A3E]">
                    ৳{grandTotal.toLocaleString('en-US')}
                  </span>
                </div>
              </div>

              {/* SHOWSTOPPER NEON AURORA CONFIRM BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-full text-white font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-95 cursor-pointer relative group/btn disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #2D1B22 0%, #3D1F28 50%, #1F1216 100%)',
                  boxShadow: '0 0 18px 3px rgba(244, 63, 94, 0.6), 0 0 32px 5px rgba(168, 85, 247, 0.4), 0 0 12px 1px rgba(56, 189, 248, 0.35)'
                }}
              >
                <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none group-hover/btn:border-pink-300/60 transition-colors" />
                <Sparkles className="w-4 h-4 text-pink-200 drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                <span>{isSubmitting ? 'প্রসেসিং হচ্ছে...' : `নিশ্চিত অর্ডার সম্পন্ন করুন • ৳${grandTotal.toLocaleString('en-US')}`}</span>
              </button>

              {/* Trust Footer */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#7A5B63] font-serif text-center">
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>আপনার তথ্য সম্পূর্ণ সুরক্ষিত ও এনক্রিপ্টেড</span>
              </div>
            </div>

          </div>

        </form>
      </main>

      {/* Cart Drawer */}
      <RibanaCartDrawer />
    </div>
  );
}
