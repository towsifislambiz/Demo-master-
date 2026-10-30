import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Truck, ArrowRight, Check, Sparkles, MessageCircle, 
  MapPin, Phone, User, Home, FileText, ChevronRight, ShoppingBag, 
  Tag, AlertCircle, Printer, Lock, CheckCircle2, Clock, CreditCard,
  Gift, Percent, HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../context/StoreContext';
import ShelaiHeader from './ShelaiHeader';

export default function ShelaiCheckoutPage() {
  const navigate = useNavigate();
  const { 
    cart, 
    cartSubtotal, 
    clearCart, 
    deliveryArea, 
    setDeliveryArea, 
    placeOrder,
    contactSettings = {}
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(deliveryArea === 'inside' ? 'ঢাকা সিটি' : 'চট্টগ্রাম');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const freeDeliveryThreshold = 2500;
  const isFreeDelivery = cartSubtotal >= freeDeliveryThreshold;
  const deliveryCharge = isFreeDelivery ? 0 : (deliveryArea === 'inside' ? 80 : 150);
  const finalTotal = Math.max(0, cartSubtotal + deliveryCharge - appliedDiscount);

  const handleApplyCoupon = (e) => {
    if (e) e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    if (code === 'EID2026' || code === 'SHELAI5') {
      const disc = Math.round(cartSubtotal * 0.05); // 5% discount
      setAppliedDiscount(disc);
      setCouponMessage({ type: 'success', text: `অভিনন্দন! 'EID2026' কুপন সফলভাবে প্রযোজ্য হয়েছে — ৫% (৳${disc.toLocaleString('en-US')}) সাশ্রয়!` });
    } else {
      setAppliedDiscount(0);
      setCouponMessage({ type: 'error', text: 'দুঃখিত, কুপন কোডটি সঠিক নয়। ৫% ছাড় পেতে ব্যবহার করুন: EID2026' });
    }
  };

  const handleQuickApplyCoupon = () => {
    setCouponCode('EID2026');
    const disc = Math.round(cartSubtotal * 0.05);
    setAppliedDiscount(disc);
    setCouponMessage({ type: 'success', text: `অভিনন্দন! 'EID2026' কুপন কার্যকর হয়েছে — ৫% (৳${disc.toLocaleString('en-US')}) ছাড়!` });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('আপনার শপিং ব্যাগে কোনো পণ্য নেই। ক্যাটালগ থেকে পণ্য নির্বাচন করুন।');
      return;
    }
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা প্রদান করুন।');
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      customerName,
      phone,
      altPhone,
      address,
      city,
      area: deliveryArea === 'inside' ? 'ঢাকা সিটি' : 'ঢাকার বাইরে',
      notes,
      paymentMethod,
      discount: appliedDiscount,
      coupon: appliedDiscount > 0 ? 'EID2026' : null,
      subtotal: cartSubtotal,
      deliveryCharge,
      total: finalTotal,
      items: cart,
      date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    try {
      const created = await placeOrder(orderData);
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
      setOrderSuccess(created || { orderId: 'SHL-' + Math.floor(100000 + Math.random() * 900000), ...orderData });
      clearCart();
    } catch (err) {
      console.error(err);
      alert('অর্ডার সম্পন্ন করতে সমস্যা হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order Success Screen View
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#fcfbf9] text-[#1c1917] font-sans flex flex-col justify-between selection:bg-[#0f291e] selection:text-[#fef9c3]">
        <ShelaiHeader showCategories={false} />

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#c5a059]/50 shadow-[0_20px_50px_rgba(15,41,30,0.12)] space-y-6 text-center relative overflow-hidden"
          >
            {/* Ambient Gold Header Accent */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#0f291e] via-[#c5a059] to-[#0f291e]" />

            {/* Animated Check Crest */}
            <div className="w-20 h-20 rounded-full bg-[#ecfdf5] border-2 border-[#10b981] text-[#059669] mx-auto flex items-center justify-center shadow-lg">
              <Check className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#854d0e] font-bold">
                OFFICIAL ORDER CONFIRMATION • SHELAI COUTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#0f291e]">
                ধন্যবাদ! আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে
              </h2>
              <p className="text-xs sm:text-sm text-[#78716c] max-w-md mx-auto">
                আমাদের বনানী শোরুম প্রতিনিধি শীঘ্রই <strong className="text-[#0f291e] font-mono">{orderSuccess.phone}</strong> নম্বরে কল করে ডেলিভারি ও সাইজ নিশ্চিত করবেন।
              </p>
            </div>

            {/* Order Receipt Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#f7f4ed] border border-[#e8e1d3] text-left space-y-4 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-[#e7e2d9] pb-3">
                <div>
                  <p className="text-[10px] text-[#78716c] font-mono uppercase tracking-wider">অর্ডার ট্র্যাকিং আইডি</p>
                  <p className="font-mono font-black text-lg text-[#0f291e]">{orderSuccess.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#78716c] font-mono uppercase tracking-wider">অর্ডারের তারিখ</p>
                  <p className="font-serif font-bold text-[#0f291e]">{orderSuccess.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <p className="text-[#78716c]">গ্রাহকের নাম:</p>
                  <p className="font-bold text-[#1c1917]">{orderSuccess.customerName}</p>
                </div>
                <div>
                  <p className="text-[#78716c]">ডেলিভারি ঠিকানা:</p>
                  <p className="font-bold text-[#1c1917]">{orderSuccess.address}, {orderSuccess.city}</p>
                </div>
                <div>
                  <p className="text-[#78716c]">পেমেন্ট পদ্ধতি:</p>
                  <p className="font-bold text-[#1c1917]">{orderSuccess.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-[#78716c]">সর্বমোট প্রদেয় মূল্য:</p>
                  <p className="font-serif font-black text-lg text-[#0f291e]">৳{orderSuccess.total?.toLocaleString('en-US')}</p>
                </div>
              </div>

              {orderSuccess.notes && (
                <div className="pt-2 border-t border-[#e7e2d9] text-[11px] text-[#78716c]">
                  <strong>ডেলিভারি নোট:</strong> {orderSuccess.notes}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#f4efe6] hover:bg-[#eae3d5] text-[#0f291e] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#d6cebf] transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>রসিদ প্রিন্ট করুন</span>
              </button>

              <a
                href={`https://wa.me/8801629559653?text=আসসালামু%20আলাইকুম!%20আমি%20Shelai%20Couture-এ%20একটি%20অর্ডার%20করেছি।%20অর্ডার%20আইডি:%20${orderSuccess.orderId}%20(৳${orderSuccess.total})`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপে দ্রুত নিশ্চিত করুন</span>
              </a>

              <button
                type="button"
                onClick={() => navigate('/store')}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0f291e] hover:bg-[#16382b] text-[#fef9c3] font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                আরও কেনাকাটা করুন
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1c1917] font-sans selection:bg-[#0f291e] selection:text-[#fef9c3] flex flex-col justify-between">
      <div>
        {/* Universal Header */}
        <ShelaiHeader showCategories={false} />

        {/* Breadcrumb Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 border-b border-[#e7e2d9] text-xs text-[#78716c]">
          <ol className="flex items-center space-x-2">
            <li>
              <button onClick={() => navigate('/store')} className="hover:text-[#0f291e] transition-colors cursor-pointer font-medium">
                হোম
              </button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-[#a8a29e]" /></li>
            <li>
              <button onClick={() => navigate('/store')} className="hover:text-[#0f291e] transition-colors cursor-pointer font-medium">
                ফ্যাশন বুটিক
              </button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-[#a8a29e]" /></li>
            <li className="font-bold text-[#0f291e]">নিরাপদ চেকআউট</li>
          </ol>
        </nav>

        {/* Main Checkout Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          
          {/* Top Title & Progress Stepper */}
          <div className="max-w-3xl mx-auto mb-10 text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-[#854d0e] text-[11px] font-mono font-bold tracking-[0.25em] uppercase">
              <ShieldCheck className="w-4 h-4 text-[#15803d]" />
              <span>100% SECURE SSL ENCRYPTED CHECKOUT • SHELAI COUTURE</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-[#0f291e]">
              নিরাপদ অর্ডার ও ডেলিভারি বিবরণ
            </h1>
            <p className="text-xs sm:text-sm text-[#78716c] font-light max-w-lg mx-auto">
              সঠিক নাম, মোবাইল নম্বর ও ঠিকানা দিয়ে অর্ডার সম্পন্ন করুন। ডেলিভারির সময় পণ্য দেখে বুঝে নিয়ে মূল্য পরিশোধ করতে পারবেন।
            </p>

            {/* Haute Couture 3-Step Progress Stepper */}
            <div className="pt-4 max-w-xl mx-auto">
              <div className="flex items-center justify-between relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-[2px] bg-[#e7e2d9] z-0" />
                <div 
                  className="absolute top-1/2 left-6 -translate-y-1/2 h-[2px] bg-[#c5a059] z-0 transition-all duration-500" 
                  style={{ width: customerName && phone && address ? '100%' : '50%' }}
                />

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#0f291e] text-[#fef9c3] border-2 border-[#c5a059] flex items-center justify-center text-xs font-mono font-bold shadow-md">
                    ১
                  </div>
                  <span className="text-[11px] font-bold text-[#0f291e] mt-1.5 font-serif">গ্রাহক তথ্য</span>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2 transition-all ${
                    customerName && phone 
                      ? 'bg-[#0f291e] text-[#fef9c3] border-[#c5a059] shadow-md' 
                      : 'bg-white text-[#78716c] border-[#d6cebf]'
                  }`}>
                    ২
                  </div>
                  <span className="text-[11px] font-bold text-[#0f291e] mt-1.5 font-serif">ডেলিভারি এলাকা</span>
                </div>

                {/* Step 3 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2 transition-all ${
                    customerName && phone && address 
                      ? 'bg-[#0f291e] text-[#fef9c3] border-[#c5a059] shadow-md' 
                      : 'bg-white text-[#78716c] border-[#d6cebf]'
                  }`}>
                    ৩
                  </div>
                  <span className="text-[11px] font-bold text-[#0f291e] mt-1.5 font-serif">পেমেন্ট ও নিশ্চিতকরণ</span>
                </div>
              </div>
            </div>

          </div>

          {cart.length === 0 ? (
            <div className="py-16 text-center max-w-md mx-auto space-y-4 bg-white p-8 sm:p-10 rounded-3xl border border-[#e7e2d9] shadow-md">
              <div className="w-16 h-16 rounded-full bg-[#f4efe6] text-[#c5a059] mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 opacity-80" />
              </div>
              <h3 className="font-serif font-black text-xl text-[#0f291e]">আপনার শপিং ব্যাগ বর্তমানে খালি</h3>
              <p className="text-xs text-[#78716c]">চেকআউট করার আগে আমাদের এক্সক্লুসিভ ফ্যাশন ক্যাটালগ থেকে অন্তত একটি ড্রেস নির্বাচন করুন।</p>
              <button
                type="button"
                onClick={() => navigate('/store')}
                className="px-8 py-3.5 rounded-full bg-[#0f291e] text-[#fef9c3] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#16382b] transition-all cursor-pointer"
              >
                কালেকশন এক্সপ্লোর করুন
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Delivery Form Details (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Customer Identification Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e7e2d9] shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#f0ebd9] pb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#0f291e] text-[#fef9c3] flex items-center justify-center text-xs font-mono font-bold">
                        ১
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#0f291e]">
                        গ্রাহকের পরিচিতি ও যোগাযোগের বিবরণ
                      </h3>
                    </div>
                    <span className="text-[11px] text-[#854d0e] font-mono">ধাপ ১ / ৩</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-[#44403c] flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#854d0e]" />
                        <span>আপনার পূর্ণ নাম <strong className="text-[#dc2626]">*</strong></span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: নুসরাত জাহান"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#fbf9f5] border border-[#d6cebf] rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#1c1917] focus:outline-none focus:border-[#0f291e] focus:bg-white focus:ring-2 focus:ring-[#c5a059]/30 transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#44403c] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#854d0e]" />
                        <span>মোবাইল নম্বর <strong className="text-[#dc2626]">*</strong></span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="০১XXXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#fbf9f5] border border-[#d6cebf] rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#1c1917] font-mono focus:outline-none focus:border-[#0f291e] focus:bg-white focus:ring-2 focus:ring-[#c5a059]/30 transition-all shadow-inner"
                      />
                      <p className="text-[10.5px] text-[#78716c]">অর্ডার নিশ্চিতকরণে বনানী শোরুম থেকে কল যাবে</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#44403c] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#854d0e]" />
                        <span>বিকল্প নম্বর (ঐচ্ছিক)</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="০১XXXXXXXXX"
                        value={altPhone}
                        onChange={(e) => setAltPhone(e.target.value)}
                        className="w-full bg-[#fbf9f5] border border-[#d6cebf] rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#1c1917] font-mono focus:outline-none focus:border-[#0f291e] focus:bg-white focus:ring-2 focus:ring-[#c5a059]/30 transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Zone & Full Address Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e7e2d9] shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#f0ebd9] pb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#0f291e] text-[#fef9c3] flex items-center justify-center text-xs font-mono font-bold">
                        ২
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#0f291e]">
                        ডেলিভারি অঞ্চল ও সম্পূর্ণ ঠিকানা
                      </h3>
                    </div>
                    <span className="text-[11px] text-[#854d0e] font-mono">ধাপ ২ / ৩</span>
                  </div>

                  {/* Free Delivery Banner if qualified */}
                  {isFreeDelivery && (
                    <div className="p-3 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] flex items-center justify-between text-xs text-[#065f46]">
                      <span className="flex items-center gap-2 font-bold">
                        <Sparkles className="w-4 h-4 text-[#10b981]" />
                        <span>অভিনন্দন! আপনার কার্ট ৳২,৫০০+ হওয়ায় ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!</span>
                      </span>
                      <span className="font-mono font-bold text-[11px] bg-white px-2 py-0.5 rounded-full border border-[#6ee7b7]">
                        FREE
                      </span>
                    </div>
                  )}

                  {/* Delivery Location Zone Toggle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div
                      onClick={() => {
                        setDeliveryArea('inside');
                        setCity('ঢাকা সিটি');
                      }}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        deliveryArea === 'inside'
                          ? 'border-[#0f291e] bg-[#f7f4ed] ring-2 ring-[#c5a059]/40 shadow-sm'
                          : 'border-[#e7e2d9] hover:border-[#c5a059] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#0f291e]" />
                          <span className="font-serif font-bold text-sm text-[#0f291e]">ঢাকা সিটি</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#854d0e]">
                          {isFreeDelivery ? 'সম্পূর্ণ ফ্রি' : '৳৮০'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716c] mt-1.5 leading-snug">
                        ২৪ থেকে ৪৮ ঘণ্টার মধ্যে নিজস্ব এক্সপ্রেস রাইডারে হোম ডেলিভারি
                      </p>
                    </div>

                    <div
                      onClick={() => {
                        setDeliveryArea('outside');
                        setCity('ঢাকার বাইরে');
                      }}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        deliveryArea === 'outside'
                          ? 'border-[#0f291e] bg-[#f7f4ed] ring-2 ring-[#c5a059]/40 shadow-sm'
                          : 'border-[#e7e2d9] hover:border-[#c5a059] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#0f291e]" />
                          <span className="font-serif font-bold text-sm text-[#0f291e]">ঢাকার বাইরে</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#854d0e]">
                          {isFreeDelivery ? 'সম্পূর্ণ ফ্রি' : '৳১৫০'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716c] mt-1.5 leading-snug">
                        ২ থেকে ৩ কার্যদিবসে দ্রুততম কুরিয়ারে নিরাপদ হোম ডেলিভারি
                      </p>
                    </div>
                  </div>

                  {/* Full Address Textarea */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#44403c] flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 text-[#854d0e]" />
                      <span>বিস্তারিত পূর্ণ ঠিকানা <strong className="text-[#dc2626]">*</strong></span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="বাড়ি নং, ফ্ল্যাট নং, রোড নং, এলাকা ও থানার নাম স্পষ্টভাবে লিখুন..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#fbf9f5] border border-[#d6cebf] rounded-2xl p-4 text-xs sm:text-sm text-[#1c1917] focus:outline-none focus:border-[#0f291e] focus:bg-white focus:ring-2 focus:ring-[#c5a059]/30 transition-all shadow-inner"
                    />
                  </div>

                  {/* Special Delivery Note */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#78716c] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#854d0e]" />
                      <span>ডেলিভারি নোট / অল্টারেশন নোট (ঐচ্ছিক)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: 'বিকেলের পর ডেলিভারি দিন' বা 'হাতা ১ ইঞ্চি বড় লাগবে'"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#fbf9f5] border border-[#d6cebf] rounded-2xl px-4 py-2.5 text-xs text-[#1c1917] focus:outline-none focus:border-[#0f291e] focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* 3. Payment Method Selection Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e7e2d9] shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#f0ebd9] pb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#0f291e] text-[#fef9c3] flex items-center justify-center text-xs font-mono font-bold">
                        ৩
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#0f291e]">
                        মূল্য পরিশোধ পদ্ধতি (Payment Method)
                      </h3>
                    </div>
                    <span className="text-[11px] text-[#854d0e] font-mono">ধাপ ৩ / ৩</span>
                  </div>

                  <div className="space-y-3">
                    {/* Cash on Delivery */}
                    <label className={`p-4 rounded-2xl border-2 flex items-start space-x-3 cursor-pointer transition-all ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'border-[#0f291e] bg-[#f7f4ed] ring-2 ring-[#c5a059]/40 shadow-sm'
                        : 'border-[#e7e2d9] bg-white hover:border-[#c5a059]'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="Cash on Delivery"
                        checked={paymentMethod === 'Cash on Delivery'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 text-[#0f291e] focus:ring-[#0f291e]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-[#0f291e]">
                            ক্যাশ অন ডেলিভারি (Cash on Delivery)
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#15803d]/15 text-[#15803d]">
                            জনপ্রিয় ও বিশ্বস্ত
                          </span>
                        </div>
                        <p className="text-xs text-[#78716c] mt-1 leading-snug">
                          ডেলিভারি ম্যানের সামনে প্যাকেট খুলে ড্রেসের কাপড় ও কোয়ালিটি দেখে বুঝে পেয়ে সম্পূর্ণ নিশ্চিন্তে মূল্য পরিশোধ করুন।
                        </p>
                      </div>
                    </label>

                    {/* bKash Payment */}
                    <label className={`p-4 rounded-2xl border-2 flex items-start space-x-3 cursor-pointer transition-all ${
                      paymentMethod === 'bKash'
                        ? 'border-[#0f291e] bg-[#f7f4ed] ring-2 ring-[#c5a059]/40 shadow-sm'
                        : 'border-[#e7e2d9] bg-white hover:border-[#c5a059]'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="bKash"
                        checked={paymentMethod === 'bKash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 text-[#0f291e] focus:ring-[#0f291e]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-[#0f291e]">
                            বিকাশ অনলাইন পেমেন্ট (bKash Payment)
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-[#e2136e]/15 text-[#e2136e]">
                            bKash
                          </span>
                        </div>
                        <p className="text-xs text-[#78716c] mt-1 leading-snug">
                          বিকাশ নম্বর: <strong className="text-[#e2136e] font-mono">{contactSettings.bkashNumber || '01712-345678 (মার্চেন্ট)'}</strong>। পেমেন্টের পর বনানী শোরুম প্রতিনিধি কল দিয়ে ট্রানজেকশন নিশ্চিত করবেন।
                        </p>
                      </div>
                    </label>

                    {/* Nagad Payment */}
                    <label className={`p-4 rounded-2xl border-2 flex items-start space-x-3 cursor-pointer transition-all ${
                      paymentMethod === 'Nagad'
                        ? 'border-[#0f291e] bg-[#f7f4ed] ring-2 ring-[#c5a059]/40 shadow-sm'
                        : 'border-[#e7e2d9] bg-white hover:border-[#c5a059]'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="Nagad"
                        checked={paymentMethod === 'Nagad'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 text-[#0f291e] focus:ring-[#0f291e]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-[#0f291e]">
                            নগদ অনলাইন পেমেন্ট (Nagad)
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-[#ea580c]/15 text-[#ea580c]">
                            Nagad
                          </span>
                        </div>
                        <p className="text-xs text-[#78716c] mt-1 leading-snug">
                          নগদ নম্বর: <strong className="text-[#ea580c] font-mono">{contactSettings.nagadNumber || '01812-345678 (মার্চেন্ট)'}</strong>। দ্রুততম সময়ে অর্ডার ভেরিফাই করা হবে।
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Review & Sticky Summary (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e7e2d9] shadow-xl space-y-5 sticky top-20">
                  <div className="border-b border-[#f0ebd9] pb-3 flex items-center justify-between">
                    <h3 className="font-serif font-bold text-lg text-[#0f291e]">
                      অর্ডার সারসংক্ষেপ
                    </h3>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#f4efe6] text-[#0f291e] border border-[#d6cebf]">
                      {cart.reduce((s, i) => s + i.quantity, 0)} টি আইটেম
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="max-h-72 overflow-y-auto space-y-3.5 divide-y divide-[#f5f0e6] pr-1 scrollbar-none">
                    {cart.map((item) => (
                      <div key={item.variantKey} className="pt-3.5 first:pt-0 flex space-x-3.5 text-xs">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-20 rounded-xl object-cover object-top border border-[#e7e2d9] shrink-0"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <p className="text-[9.5px] font-mono uppercase text-[#854d0e] font-bold">
                              {item.designer}
                            </p>
                            <h5 className="font-serif font-bold text-xs text-[#1c1917] line-clamp-1">
                              {item.title}
                            </h5>
                            <p className="text-[10.5px] text-[#78716c] mt-0.5">
                              সাইজ: <span className="font-bold text-[#0f291e]">{item.selectedSize || 'M'}</span> • পরিমাণ: {item.quantity}টি
                            </p>
                          </div>
                          <p className="font-serif font-black text-sm text-[#0f291e]">
                            ৳{(item.price * item.quantity).toLocaleString('en-US')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Coupon Box & Quick 1-Click Chip */}
                  <div className="space-y-2 pt-2 border-t border-[#f0ebd9]">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="কুপন কোড (যেমন: EID2026)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-[#fbf9f5] border border-[#d6cebf] rounded-xl px-3.5 py-2.5 text-xs font-mono uppercase text-[#1c1917] focus:outline-none focus:border-[#0f291e]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-4 py-2.5 rounded-xl bg-[#0f291e] text-[#fef9c3] font-bold text-xs uppercase cursor-pointer hover:bg-[#1b4332] transition-colors shrink-0"
                      >
                        প্রয়োগ
                      </button>
                    </div>

                    {/* Quick 1-Click Coupon Apply Chip */}
                    {!appliedDiscount && (
                      <button
                        type="button"
                        onClick={handleQuickApplyCoupon}
                        className="w-full p-2 rounded-xl bg-[#fefce8] border border-[#fde047] text-[#854d0e] text-[11px] font-medium flex items-center justify-between hover:bg-[#fef9c3] transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5 font-bold">
                          <Gift className="w-3.5 h-3.5 text-[#ca8a04]" />
                          <span>'EID2026' কুপনে ৫% ছাড় পান</span>
                        </span>
                        <span className="font-mono underline text-[10px]">ক্লিক করুন</span>
                      </button>
                    )}

                    {couponMessage && (
                      <p className={`text-xs ${couponMessage.type === 'success' ? 'text-[#15803d] font-bold' : 'text-[#dc2626]'}`}>
                        {couponMessage.text}
                      </p>
                    )}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="space-y-2.5 text-xs pt-2 border-t border-[#f0ebd9]">
                    <div className="flex justify-between text-[#78716c]">
                      <span>সাবটোটাল:</span>
                      <span className="font-mono font-bold text-[#1c1917]">৳{cartSubtotal.toLocaleString('en-US')}</span>
                    </div>

                    <div className="flex justify-between text-[#78716c]">
                      <span>ডেলিভারি চার্জ:</span>
                      <span className="font-mono font-bold text-[#1c1917]">
                        {deliveryCharge === 0 ? <span className="text-[#15803d]">সম্পূর্ণ ফ্রি</span> : `৳${deliveryCharge}`}
                      </span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-[#15803d] font-bold">
                        <span>কুপন ছাড় (EID2026):</span>
                        <span className="font-mono">-৳{appliedDiscount.toLocaleString('en-US')}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-base sm:text-lg font-black text-[#0f291e] font-serif pt-3 border-t border-[#e7e2d9]">
                      <span>সর্বমোট প্রদেয় মূল্য:</span>
                      <span className="font-serif">৳{finalTotal.toLocaleString('en-US')}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-[#0f291e] hover:bg-[#16382b] text-[#fef9c3] font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-xl hover:shadow-[0_4px_18px_rgba(15,41,30,0.3)] active:scale-95 transition-all cursor-pointer border border-[#c5a059]/40 group"
                  >
                    <Lock className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>{isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : `অর্ডার নিশ্চিত করুন • ৳${finalTotal.toLocaleString('en-US')}`}</span>
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </button>

                  {/* Trust Strip */}
                  <div className="space-y-2 pt-2 text-[11px] text-[#78716c] border-t border-[#f4efe6]">
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#15803d] shrink-0" />
                      <span>১০০% আসল আমদানিকৃত ডিজাইনার ড্রেস গ্যারান্টি</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#0f291e] shrink-0" />
                      <span>ডেলিভারি ম্যানের সামনে দেখে বুঝে নেওয়ার সুযোগ</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                      <span>৭ দিনের ফ্রি এক্সচেঞ্জ ও সাইজ অল্টারেশন সাপোর্ট</span>
                    </p>
                  </div>
                </div>

              </div>

            </form>
          )}

        </main>
      </div>
    </div>
  );
}