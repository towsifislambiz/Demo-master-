import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShieldCheck, CheckCircle2, Truck, ShoppingBag, 
  Trash2, Plus, Minus, Tag, PhoneCall, AlertCircle, Sparkles,
  User, Phone, MapPin, Check, Lock, ChevronRight, Award, 
  Clock, HelpCircle, DollarSign, Printer
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GHORER_BAZAR_BRAND, GHORER_BAZAR_PRODUCTS } from '../../data/ghorerBazarData';

export default function GhorerBazarCheckoutPage() {
  const navigate = useNavigate();
  const { cart = [], removeFromCart, updateQuantity, clearCart, placeOrder, getNicheCart, getProductNiche } = useStore();

  const [deliveryArea, setDeliveryArea] = useState('inside_dhaka'); // 'inside_dhaka' | 'outside_dhaka'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'bkash'
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const rawCart = getNicheCart ? getNicheCart('organic') : cart;
  const organicCart = rawCart.filter((item) => (getProductNiche ? getProductNiche(item) : (item.id || '').startsWith('gb-')) === 'organic');

  // If cart is empty and user visits directly, provide fallback product for seamless demo testing
  const effectiveCart = organicCart.length > 0 ? organicCart : [
    {
      id: GHORER_BAZAR_PRODUCTS[0].id,
      title: GHORER_BAZAR_PRODUCTS[0].title,
      price: GHORER_BAZAR_PRODUCTS[0].weights[1].price,
      selectedSize: GHORER_BAZAR_PRODUCTS[0].weights[1].label,
      image: GHORER_BAZAR_PRODUCTS[0].image,
      quantity: 1
    }
  ];

  const subtotal = effectiveCart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  const deliveryCharge = deliveryArea === 'inside_dhaka' 
    ? GHORER_BAZAR_BRAND.deliveryInsideDhaka 
    : GHORER_BAZAR_BRAND.deliveryOutsideDhaka;
  
  const freeThreshold = GHORER_BAZAR_BRAND.freeDeliveryThreshold;
  const isFreeDelivery = subtotal >= freeThreshold;
  const actualDeliveryCharge = isFreeDelivery ? 0 : deliveryCharge;
  const grandTotal = Math.max(0, subtotal + actualDeliveryCharge - discountAmount);
  const neededForFree = Math.max(0, freeThreshold - subtotal);
  const freeProgress = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  // 1-Click Quick Instruction Chips
  const QUICK_NOTES = [
    '🏢 অফিসে ডেলিভারি',
    '⏰ বিকাল ৫টার পর দিন',
    '📞 আসার আগে ফোন দিবেন',
    '🚪 দারোয়ানের কাছে দিন'
  ];

  const handleAddQuickNote = (chip) => {
    if (note.includes(chip)) return;
    setNote((prev) => (prev ? `${prev}, ${chip}` : chip));
  };

  // Apply Coupon
  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'GHORER10' || code === 'PUREFOOD') {
      const disc = Math.round(subtotal * 0.1);
      setDiscountAmount(disc);
      setCouponMessage({ type: 'success', text: `অভিনন্দন! ১০% (৳${disc}) ডিসকাউন্ট প্রযোজ্য হয়েছে!` });
    } else {
      setDiscountAmount(0);
      setCouponMessage({ type: 'error', text: 'অকার্যকর কুপন কোড! ট্রাই করুন: GHORER10' });
    }
  };

  const handleValidate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'অনুগ্রহ করে আপনার পুরো নাম লিখুন';
    if (!phone.trim()) {
      errs.phone = 'অনুগ্রহ করে ১১ ডিজিটের মোবাইল নাম্বার দিন';
    } else if (!/^01[3-9]\d{8}$/.test(phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 01712345678)';
    }
    if (!address.trim()) errs.address = 'অনুগ্রহ করে সম্পূর্ণ ঠিকানা (বাড়ি, রোড, এলাকা, থানা) লিখুন';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!handleValidate()) {
      // Scroll to top of form
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    try {
      const generatedOrderId = 'GB-' + Math.floor(100000 + Math.random() * 900000);
      const orderPayload = {
        orderId: generatedOrderId,
        id: generatedOrderId,
        niche: 'organic',
        customerName: name.trim(),
        phone: phone.trim(),
        altPhone: altPhone.trim(),
        address: address.trim(),
        deliveryArea: deliveryArea === 'inside_dhaka' ? 'ঢাকা সিটি' : 'ঢাকার বাইরে',
        deliveryCharge: actualDeliveryCharge,
        subtotal: subtotal,
        discount: discountAmount,
        total: grandTotal,
        paymentMethod: paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (Cash on Delivery)' : 'বিকাশ অনলাইন পেমেন্ট (bKash)',
        note: note.trim(),
        status: 'Processing',
        date: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
        items: effectiveCart.map((item) => ({
          id: item.id,
          title: item.title,
          weight: item.selectedSize || item.weight || 'প্যাক',
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image
        }))
      };

      if (placeOrder) {
        await placeOrder(orderPayload);
      }
      if (clearCart && cart.length > 0) {
        clearCart();
      }

      setOrderSuccess(orderPayload);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF7] text-stone-900 font-sans selection:bg-amber-300 selection:text-stone-950">
      
      {/* 1. Deluxe Executive Header with 3-Step Checkout Stepper */}
      <header className="sticky top-0 z-40 bg-white border-b border-emerald-100 shadow-xs px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link to="/organic" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-[#055C32] text-white flex items-center justify-center font-black text-xl shadow-md group-hover:bg-[#077842] transition-colors">
              ঘ
            </div>
            <div>
              <div className="text-lg font-black text-stone-900 leading-tight">
                {GHORER_BAZAR_BRAND.name}
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <span>১০০% খাঁটি ও নিরাপদ খাদ্য</span>
              </div>
            </div>
          </Link>

          {/* Stepper Progress Bar (Desktop & Tablet) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">✓</span>
              <span>১. শপিং ব্যাগ</span>
            </div>
            <div className="w-8 h-0.5 bg-emerald-300" />
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#055C32] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span className="w-5 h-5 rounded-full bg-[#055C32] text-white flex items-center justify-center text-[10px]">২</span>
              <span>২. ঠিকানা ও পেমেন্ট</span>
            </div>
            <div className="w-8 h-0.5 bg-stone-200" />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-400">
              <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center text-[10px]">৩</span>
              <span>৩. অর্ডার নিশ্চিতকরণ</span>
            </div>
          </div>

          {/* Right Support & Back Link */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href={`tel:${GHORER_BAZAR_BRAND.hotline}`}
              className="hidden lg:flex items-center gap-1.5 text-xs text-stone-700 font-bold hover:text-[#055C32] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
              <span>সহায়তা: <strong className="font-mono text-stone-900">{GHORER_BAZAR_BRAND.hotline}</strong></span>
            </a>

            <Link
              to="/organic"
              className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>শপে ফিরুন</span>
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Top Reassurance & Stock Reservation Strip */}
      <div className="bg-gradient-to-r from-emerald-800 via-[#055C32] to-emerald-900 text-white py-2 px-4 text-xs font-semibold shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="animate-pulse text-amber-300">⚡</span>
            <span>সীমিত স্টক: আপনার অর্ডারের পণ্যগুলো পরবর্তী <strong>১৫ মিনিটের জন্য সংরক্ষিত</strong> রাখা হয়েছে!</span>
          </div>
          <div className="flex items-center gap-3 text-emerald-200">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-amber-300" />
              <span>২৫৬-বিট নিরাপদ ক্যাশ অন ডেলিভারি</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Checkout Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        {/* ========================================================== */}
        {/* ORDER SUCCESS SCREEN                                       */}
        {/* ========================================================== */}
        {orderSuccess ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-emerald-200 text-center space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#055C32] flex items-center justify-center mx-auto shadow-inner animate-bounce duration-1000">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-emerald-50 text-[#055C32] border border-emerald-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>অর্ডার আইডি: {orderSuccess.orderId}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                আমাদের কাস্টমার কেয়ার প্রতিনিধি শীঘ্রই <span className="font-bold text-stone-900 font-mono">{orderSuccess.phone}</span> নাম্বারে ফোন করে ডেলিভারি কনফার্ম করবেন।
              </p>
            </div>

            {/* Estimated Delivery Notification */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-center gap-2 text-xs font-bold text-amber-900">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>আনুমানিক ডেলিভারি সময়: আগামী ২৪ থেকে ৪৮ ঘণ্টার মধ্যে</span>
            </div>

            {/* Complete Receipt Summary */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-left text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500">গ্রাহকের নাম:</span>
                <span className="font-bold text-stone-900">{orderSuccess.customerName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500">মোবাইল নাম্বার:</span>
                <span className="font-mono font-bold text-[#055C32]">{orderSuccess.phone}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500">ডেলিভারি ঠিকানা:</span>
                <span className="font-semibold text-stone-800 text-right max-w-xs">{orderSuccess.address} ({orderSuccess.deliveryArea})</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500">পেমেন্ট মেথড:</span>
                <span className="font-bold text-emerald-800">{orderSuccess.paymentMethod}</span>
              </div>

              {/* Items List in Receipt */}
              <div className="pt-1">
                <div className="font-bold text-stone-700 mb-2">অর্ডারের পণ্যসমূহ:</div>
                <div className="space-y-1.5">
                  {orderSuccess.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-stone-600">
                      <span>• {it.title} ({it.weight}) × {it.quantity} টি</span>
                      <span className="font-bold text-stone-900">৳{(it.price * it.quantity).toLocaleString('bn-BD')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-3 border-t-2 border-stone-200 font-black text-base text-stone-900">
                <span>সর্বমোট প্রদেয় বিল:</span>
                <span className="text-xl text-[#055C32]">৳{orderSuccess.total.toLocaleString('bn-BD')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>রিসিট প্রিন্ট করুন</span>
              </button>

              <Link
                to="/organic"
                className="flex-1 py-3 px-4 rounded-xl bg-[#055C32] hover:bg-[#077842] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>আরও কেনাকাটা করুন</span>
              </Link>
            </div>

          </div>
        ) : (
          /* ========================================================== */
          /* DELUXE 2-COLUMN CHECKOUT FORM VIEW                         */
          /* ========================================================== */
          <div>
            
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#055C32] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>১০০% নিরাপদ ও সুরক্ষিত চেকআউট</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
                ক্যাশ অন ডেলিভারি অর্ডার ফর্ম
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                পণ্য হাতে পেয়ে যাচাই করে মূল্য পরিশোধ করুন। অগ্রিম কোনো টাকা দিতে হবে না।
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* ======================================================== */}
              {/* LEFT 7 COLUMNS: CUSTOMER, ADDRESS & PAYMENT INFORMATION  */}
              {/* ======================================================== */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* CARD 1: Customer Personal Details */}
                <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-emerald-100/90 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                    <div className="w-8 h-8 rounded-xl bg-[#055C32] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      ১
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-stone-900">আপনার ব্যক্তিগত তথ্য</h3>
                      <p className="text-[11px] text-stone-500">ডেলিভারি যোগাযোগের জন্য সঠিক নাম্বার দিন</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        আপনার পূর্ণ নাম <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((p) => ({ ...p, name: null }));
                          }}
                          placeholder="যেমন: মোঃ ইকবাল হোসেন"
                          className={`w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border ${
                            errors.name ? 'border-rose-400 bg-rose-50/40' : 'border-stone-200 focus:border-[#055C32]'
                          } focus:outline-none transition-all shadow-2xs`}
                        />
                      </div>
                      {errors.name && <p className="text-[10px] text-rose-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Mobile Phone */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        মোবাইল নাম্বার <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors((p) => ({ ...p, phone: null }));
                          }}
                          placeholder="১১ ডিজিট (যেমন: 01712345678)"
                          className={`w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border font-mono ${
                            errors.phone ? 'border-rose-400 bg-rose-50/40' : 'border-stone-200 focus:border-[#055C32]'
                          } focus:outline-none transition-all shadow-2xs`}
                        />
                      </div>
                      {errors.phone && <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>}
                    </div>

                  </div>

                  {/* Alternative Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      বিকল্প মোবাইল নাম্বার (ঐচ্ছিক ব্যাকআপ)
                    </label>
                    <input
                      type="tel"
                      value={altPhone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      placeholder="জরুরি প্রয়োজনে যোগাযোগ করার আরেকটি নাম্বার"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* CARD 2: Delivery Area Selector (Tactile Cards) */}
                <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-emerald-100/90 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                    <div className="w-8 h-8 rounded-xl bg-[#055C32] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      ২
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-stone-900">ডেলিভারি এরিয়া নির্বাচন করুন</h3>
                      <p className="text-[11px] text-stone-500">আপনার লোকেশন অনুযায়ী অটোমেটিক ডেলিভারি চার্জ হিসাব হবে</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Inside Dhaka */}
                    <button
                      type="button"
                      onClick={() => setDeliveryArea('inside_dhaka')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer relative ${
                        deliveryArea === 'inside_dhaka'
                          ? 'border-[#055C32] bg-emerald-50/80 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-stone-200 bg-white hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-sm text-stone-900 flex items-center gap-1.5">
                          <span>🏢 ঢাকা সিটির ভিতরে</span>
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isFreeDelivery 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {isFreeDelivery ? 'ফ্রি' : `৳${GHORER_BAZAR_BRAND.deliveryInsideDhaka}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-snug">
                        ২৪ থেকে ৪৮ ঘণ্টার মধ্যে দ্রুত হোম ডেলিভারি
                      </p>
                      {deliveryArea === 'inside_dhaka' && (
                        <div className="mt-2 text-[10px] font-bold text-[#055C32] flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>নির্বাচিত হয়েছে</span>
                        </div>
                      )}
                    </button>

                    {/* Outside Dhaka */}
                    <button
                      type="button"
                      onClick={() => setDeliveryArea('outside_dhaka')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer relative ${
                        deliveryArea === 'outside_dhaka'
                          ? 'border-[#055C32] bg-emerald-50/80 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-stone-200 bg-white hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-sm text-stone-900 flex items-center gap-1.5">
                          <span>🚚 ঢাকা সিটির বাইরে (সারা দেশ)</span>
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isFreeDelivery 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {isFreeDelivery ? 'ফ্রি' : `৳${GHORER_BAZAR_BRAND.deliveryOutsideDhaka}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-snug">
                        ৪৮ থেকে ৭২ ঘণ্টার মধ্যে জেলা ও থানা সদরে হোম ডেলিভারি
                      </p>
                      {deliveryArea === 'outside_dhaka' && (
                        <div className="mt-2 text-[10px] font-bold text-[#055C32] flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>নির্বাচিত হয়েছে</span>
                        </div>
                      )}
                    </button>

                  </div>
                </div>

                {/* CARD 3: Detailed Delivery Address */}
                <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-emerald-100/90 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                    <div className="w-8 h-8 rounded-xl bg-[#055C32] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      ৩
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-stone-900">পূর্ণ ডেলিভারি ঠিকানা</h3>
                      <p className="text-[11px] text-stone-500">রাইডার যেন সহজে আপনার বাড়ি খুঁজে পায় এমন স্পষ্ট ঠিকানা দিন</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      সম্পূর্ণ ঠিকানা <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <textarea
                        rows={3}
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          if (errors.address) setErrors((p) => ({ ...p, address: null }));
                        }}
                        placeholder="বাড়ি নং, ফ্ল্যাট নং, রোড নং, এলাকা, থানা ও জেলা উল্লেখ করুন..."
                        className={`w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border ${
                          errors.address ? 'border-rose-400 bg-rose-50/40' : 'border-stone-200 focus:border-[#055C32]'
                        } focus:outline-none transition-all`}
                      />
                    </div>
                    {errors.address && <p className="text-[10px] text-rose-500 mt-1">{errors.address}</p>}
                  </div>

                  {/* Quick Instruction Chips */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1.5">
                      ডেলিভারি নোট ও বিশেষ নির্দেশিকা (১-ক্লিক যোগ করুন):
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {QUICK_NOTES.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleAddQuickNote(chip)}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-colors cursor-pointer"
                        >
                          + {chip}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="অন্য কোনো নির্দেশনা থাকলে এখানে লিখুন..."
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                    />
                  </div>
                </div>

                {/* CARD 4: Payment Method Selection */}
                <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-emerald-100/90 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                    <div className="w-8 h-8 rounded-xl bg-[#055C32] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      ৪
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-stone-900">পেমেন্ট পদ্ধতি</h3>
                      <p className="text-[11px] text-stone-500">আপনার সুবিধাজনক পরিশোধ মাধ্যম বেছে নিন</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    
                    {/* Option 1: COD (Highlighted & Default) */}
                    <label className="flex items-start gap-3.5 p-4 rounded-2xl border-2 border-[#055C32] bg-emerald-50/70 shadow-sm cursor-pointer transition-all">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="mt-1 accent-[#055C32] w-4 h-4 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-stone-900">
                          <span>ক্যাশ অন ডেলিভারি (Cash on Delivery)</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#055C32] text-white">
                            ১০০% নিরাপদ
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                          পণ্য ডেলিভারিম্যান থেকে হাতে বুঝে নিয়ে পরীক্ষা করে তারপর মূল্য পরিশোধ করুন। কোনো অগ্রিম ফি নেই।
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-[10px] text-emerald-800 font-bold">
                          <span>✓ পছন্দ না হলে রিটার্ন</span>
                          <span>✓ সরাসরি ক্যাশ পেমেন্ট</span>
                        </div>
                      </div>
                    </label>

                    {/* Option 2: bKash / Online */}
                    <label className="flex items-start gap-3.5 p-4 rounded-2xl border border-stone-200 hover:border-emerald-300 bg-white cursor-pointer transition-all">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'bkash'}
                        onChange={() => setPaymentMethod('bkash')}
                        className="mt-1 accent-[#055C32] w-4 h-4 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-2">
                          <span>বিকাশ / নগদ / কার্ড অনলাইন পেমেন্ট</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          বিকাশ মার্চেন্ট গেটওয়ের মাধ্যমে তাৎক্ষণিক পেমেন্ট সুবিধা।
                        </p>
                      </div>
                    </label>

                  </div>
                </div>

              </div>

              {/* ======================================================== */}
              {/* RIGHT 5 COLUMNS: STICKY ORDER SUMMARY & CHECKOUT BUTTON  */}
              {/* ======================================================== */}
              <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
                
                {/* Floating Invoice Card */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-emerald-100/90 space-y-4">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div>
                      <h3 className="font-bold text-base text-stone-900">অর্ডার সারসংক্ষেপ</h3>
                      <p className="text-[11px] text-stone-500">{effectiveCart.length} টি অর্গানিক আইটেম</p>
                    </div>
                    <Link to="/organic/shop" className="text-xs font-bold text-[#055C32] hover:underline">
                      + পণ্য যোগ করুন
                    </Link>
                  </div>

                  {/* Free Delivery Meter */}
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-[#055C32]" />
                        {isFreeDelivery ? (
                          <span className="text-emerald-800 font-bold">অভিনন্দন! আপনি পাচ্ছেন ফ্রি ডেলিভারি! 🎉</span>
                        ) : (
                          <span>আর মাত্র <strong>৳{neededForFree.toLocaleString('bn-BD')}</strong> টাকার পণ্য কিনলেই ফ্রি ডেলিভারি!</span>
                        )}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-800">{freeProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#055C32] rounded-full transition-all duration-500"
                        style={{ width: `${freeProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Cart Items List */}
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-stone-100">
                    {effectiveCart.map((item) => {
                      const itemKey = item.variantKey || item.id;
                      const itemWeight = item.selectedSize || item.weight || 'প্যাক';
                      const price = item.price || 0;
                      const qty = item.quantity || 1;

                      return (
                        <div key={itemKey} className="flex gap-3 pt-3 first:pt-0 items-center">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-50"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.webp';
                            }}
                          />

                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                              {item.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5 text-xs">
                              <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-100 text-emerald-900 font-semibold">
                                {itemWeight}
                              </span>
                              <span className="font-black text-[#055C32]">
                                ৳{price.toLocaleString('bn-BD')}
                              </span>
                            </div>

                            {/* Stepper Inside Checkout */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2 bg-stone-100 px-2 py-0.5 rounded-lg border border-stone-200">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity && updateQuantity(itemKey, -1)}
                                  className="w-4 h-4 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer font-bold"
                                >
                                  -
                                </button>
                                <span className="font-bold text-xs text-stone-800 w-3 text-center">{qty}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity && updateQuantity(itemKey, 1)}
                                  className="w-4 h-4 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer font-bold"
                                >
                                  +
                                </button>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-stone-900">
                                  ৳{(price * qty).toLocaleString('bn-BD')}
                                </span>
                                {effectiveCart.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeFromCart && removeFromCart(itemKey)}
                                    className="p-1 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                                    title="মুছে ফেলুন"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Promo Voucher Field */}
                  <div className="pt-2 border-t border-stone-100">
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="কুপন কোড (যেমন: GHORER10)"
                          className="w-full pl-8 pr-2 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none uppercase font-mono"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 active:scale-95 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        প্রয়োগ
                      </button>
                    </form>
                    {couponMessage && (
                      <p className={`text-[10px] mt-1 font-semibold ${
                        couponMessage.type === 'success' ? 'text-emerald-700' : 'text-rose-500'
                      }`}>
                        {couponMessage.text}
                      </p>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 text-xs pt-3 border-t border-stone-100 text-stone-600">
                    <div className="flex justify-between">
                      <span>পণ্যের মোট মূল্য (সাব-টোটাল):</span>
                      <span className="font-semibold text-stone-900">৳{subtotal.toLocaleString('bn-BD')}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>ডেলিভারি চার্জ:</span>
                      <span className="font-semibold text-stone-900">
                        {actualDeliveryCharge === 0 ? (
                          <span className="text-emerald-700 font-bold">ফ্রি ডেলিভারি</span>
                        ) : (
                          `৳${actualDeliveryCharge.toLocaleString('bn-BD')}`
                        )}
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-800 font-bold">
                        <span>কুপন ছাড় (১০%):</span>
                        <span>-৳{discountAmount.toLocaleString('bn-BD')}</span>
                      </div>
                    )}

                    <div className="flex justify-between pt-2.5 border-t border-stone-200 font-black text-base text-stone-900">
                      <span>সর্বমোট প্রদেয় বিল:</span>
                      <span className="text-2xl text-[#055C32] font-black">
                        ৳{grandTotal.toLocaleString('bn-BD')}
                      </span>
                    </div>
                  </div>

                  {/* PRIMARY SUBMIT CTA BUTTON */}
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full py-4 px-4 rounded-2xl bg-[#055C32] hover:bg-[#077842] active:scale-98 text-white font-black text-base flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>অর্ডার প্রসেস হচ্ছে...</span>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 text-amber-300 fill-amber-300" />
                        <span>অর্ডার সম্পন্ন করুন — ৳{grandTotal.toLocaleString('bn-BD')}</span>
                      </>
                    )}
                  </button>

                  {/* Trust Assurances */}
                  <div className="pt-2 text-[11px] text-stone-500 space-y-1.5 border-t border-stone-100">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>পণ্য হাতে পেয়ে চেক করে মূল্য পরিশোধ করুন</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>বিএসটিআই ও সাইন্স ল্যাব টেস্ট সার্টিফাইড ১০০% খাঁটি পণ্য</span>
                    </div>
                  </div>

                </div>

                {/* Customer Support Reassurance Card */}
                <div className="p-4 rounded-3xl bg-amber-50/80 border border-amber-200 text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-stone-900">অর্ডার করতে সমস্যা হচ্ছে?</div>
                      <div className="text-amber-900 font-mono font-bold text-xs">{GHORER_BAZAR_BRAND.hotline}</div>
                    </div>
                  </div>
                  <a
                    href={`tel:${GHORER_BAZAR_BRAND.hotline}`}
                    className="px-3 py-1.5 rounded-xl bg-[#055C32] text-white text-xs font-bold hover:bg-[#077842] transition-colors shrink-0"
                  >
                    কল দিন
                  </a>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-6 text-center text-xs border-t-4 border-[#055C32] mt-12">
        <div className="max-w-7xl mx-auto space-y-1.5">
          <p>© ২০২৬ {GHORER_BAZAR_BRAND.name} (Ghorer Bazar Clone). সুরক্ষিত ক্যাশ অন ডেলিভারি চেকআউট।</p>
          <div className="text-[11px] text-stone-500">
            হটলাইন: {GHORER_BAZAR_BRAND.hotline} | {GHORER_BAZAR_BRAND.address}
          </div>
        </div>
      </footer>

    </div>
  );
}
