import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, Truck, 
  CreditCard, PhoneCall, ShoppingBag, Sparkles, ChevronRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ShopTGadgetCheckoutPage() {
  const { cart, clearCart, placeOrder, getNicheCart, getProductNiche } = useStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    altPhone: '',
    district: 'ঢাকা',
    address: '',
    notes: ''
  });

  const [deliveryLocation, setDeliveryLocation] = useState('inside_dhaka'); // 'inside_dhaka' | 'outside_dhaka'
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'bkash' | 'nagad'
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState('');

  const rawCart = getNicheCart ? getNicheCart('gadgets') : (Array.isArray(cart) ? cart : []);
  const cartItems = rawCart.filter((item) => (getProductNiche ? getProductNiche(item) : (item.id || '').startsWith('shopt-') || (item.id || '').startsWith('addon-')) === 'gadgets');
  const subtotal = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  
  const deliveryCharge = deliveryLocation === 'inside_dhaka' ? 60 : 120;
  const isFreeDelivery = subtotal >= 5000;
  const finalDeliveryCharge = isFreeDelivery ? 0 : deliveryCharge;
  const grandTotal = subtotal + finalDeliveryCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('দয়া করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা পূরণ করুন।');
      return;
    }

    const orderId = 'ST-' + Math.floor(100000 + Math.random() * 900000);
    setCompletedOrderId(orderId);

    if (placeOrder) {
      placeOrder({
        orderId,
        id: orderId,
        niche: 'gadgets',
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.district,
        area: deliveryLocation === 'inside_dhaka' ? 'ঢাকা মেট্রো' : 'ঢাকার বাইরে',
        paymentMethod: paymentMethod.toUpperCase(),
        subtotal,
        deliveryCharge: finalDeliveryCharge,
        discount: 0,
        total: grandTotal,
        status: 'Pending',
        date: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
        items: cartItems.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image
        }))
      });
    }

    setOrderCompleted(true);

    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 }
    });

    clearCart();
  };

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-[#030712] font-sans flex items-center justify-center p-4 text-white">
        <div className="max-w-md w-full bg-[#0B1325] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white">
            ধন্যবাদ! অর্ডার সফল হয়েছে!
          </h1>
          <p className="text-xs text-slate-400">
            আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের কাস্টমার কেয়ার টিম শীঘ্রই ফোন করে অর্ডার কনফার্ম করবে।
          </p>

          <div className="bg-[#0E172C] p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400 font-semibold">অর্ডার আইডি:</span>
              <strong className="text-cyan-400 font-mono text-sm">{completedOrderId}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-semibold">গ্রাহকের নাম:</span>
              <strong className="text-white">{formData.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-semibold">মোবাইল:</span>
              <strong className="text-white">{formData.phone}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-semibold">ডেলিভারি ঠিকানা:</span>
              <span className="text-slate-200 text-right">{formData.address}, {formData.district}</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-2 font-bold">
              <span className="text-slate-300">সর্বমোট প্রদেয়:</span>
              <span className="text-cyan-400 font-black text-base">৳{grandTotal.toLocaleString('bn-BD')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-semibold">পেমেন্ট মেথড:</span>
              <span className="text-emerald-400 uppercase font-black">{paymentMethod}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/gadgets"
              className="w-full bg-white hover:bg-slate-100 text-slate-950 font-black py-3 rounded-xl text-xs transition-colors shadow"
            >
              আরও গ্যাজেট দেখুন
            </Link>
            <Link
              to="/"
              className="w-full bg-[#0E172C] hover:bg-slate-800 text-slate-300 font-bold py-2.5 rounded-xl text-xs transition-colors border border-slate-800"
            >
              মাস্টার ডেমো গেটওয়ে
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] font-sans text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <header className="bg-[#070D1D] text-white py-3 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/gadgets" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-white">
              Shop<span className="text-cyan-400">T</span> PRO GADGETS
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 bg-[#0E172C] hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-800 transition-colors"
              title="সব ডেমো ক্যাটাগরি দেখুন"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>ডেমো ক্যাটাগরি</span>
            </Link>
            <Link
              to="/gadgets"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 bg-[#0E172C] hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-800 transition-colors"
            >
              <span>স্টোরে ফিরুন</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Checkout Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-6 space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-white">
            ক্যাশ অন ডেলিভারি চেকআউট
          </h1>
          <p className="text-xs text-slate-400">
            পণ্য হাতে পেয়ে চেক করে টাকা পরিশোধের সম্পূর্ণ নিরাপদ পদ্ধতি
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-[#0B1325] rounded-3xl p-12 text-center border border-slate-800 max-w-lg mx-auto space-y-4">
            <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
            <h2 className="text-base font-bold text-slate-300">আপনার কার্টে কোনো প্রোডাক্ট নেই</h2>
            <Link
              to="/gadgets"
              className="inline-block bg-white text-slate-950 text-xs font-black px-6 py-3 rounded-xl shadow"
            >
              গ্যাজেট স্টোরে যান
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Shipping Form & Payment */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Delivery Address Box */}
              <div className="bg-[#0B1325] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Truck className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-sm font-black text-white">১. ডেলিভারির তথ্য দিন</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">আপনার পূর্ণ নাম *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="যেমন: মোঃ সাকিব আহমেদ"
                      className="w-full bg-[#0E172C] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">মোবাইল নম্বর *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="01XXXXXXXXX"
                      className="w-full bg-[#0E172C] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">বিকল্প মোবাইল (যদি থাকে)</label>
                    <input
                      type="tel"
                      name="altPhone"
                      value={formData.altPhone}
                      onChange={handleInputChange}
                      placeholder="জরুরি যোগাযোগের জন্য"
                      className="w-full bg-[#0E172C] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">জেলা / শহর *</label>
                    <input
                      type="text"
                      name="district"
                      required
                      value={formData.district}
                      onChange={handleInputChange}
                      placeholder="যেমন: ঢাকা, চট্টগ্রাম, সিলেট"
                      className="w-full bg-[#0E172C] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-300 font-bold mb-1">সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা) *</label>
                  <textarea
                    name="address"
                    required
                    rows="2"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="বাড়ি নং, রোড নং, এলাকা ও থানার নাম স্পষ্টভাবে লিখুন..."
                    className="w-full bg-[#0E172C] border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Delivery Zone Selector */}
              <div className="bg-[#0B1325] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-3">
                <h2 className="text-sm font-black text-white">২. ডেলিভারি এলাকা নির্বাচন করুন</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    deliveryLocation === 'inside_dhaka' ? 'border-cyan-400 bg-cyan-950/20' : 'border-slate-800 bg-[#0E172C] hover:border-slate-700'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="delivery_loc"
                        checked={deliveryLocation === 'inside_dhaka'}
                        onChange={() => setDeliveryLocation('inside_dhaka')}
                        className="text-cyan-400"
                      />
                      <div>
                        <strong className="block text-white">ঢাকা সিটির ভেতর</strong>
                        <span className="text-[11px] text-slate-400">২৪ ঘণ্টার মধ্যে হোম ডেলিভারি</span>
                      </div>
                    </div>
                    <span className="font-black text-white">{isFreeDelivery ? 'ফ্রি' : '৳৬০'}</span>
                  </label>

                  <label className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    deliveryLocation === 'outside_dhaka' ? 'border-cyan-400 bg-cyan-950/20' : 'border-slate-800 bg-[#0E172C] hover:border-slate-700'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="delivery_loc"
                        checked={deliveryLocation === 'outside_dhaka'}
                        onChange={() => setDeliveryLocation('outside_dhaka')}
                        className="text-cyan-400"
                      />
                      <div>
                        <strong className="block text-white">ঢাকার বাইরে (সারা দেশ)</strong>
                        <span className="text-[11px] text-slate-400">৪৮ ঘণ্টার মধ্যে হোম ডেলিভারি</span>
                      </div>
                    </div>
                    <span className="font-black text-white">{isFreeDelivery ? 'ফ্রি' : '৳১২০'}</span>
                  </label>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-[#0B1325] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-3">
                <h2 className="text-sm font-black text-white">৩. মূল্য পরিশোধ পদ্ধতি</h2>
                <div className="space-y-2 text-xs">
                  
                  {/* COD */}
                  <label className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-cyan-400 bg-cyan-950/30' : 'border-slate-800 bg-[#0E172C] hover:border-slate-700'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payment_opt"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <div>
                        <strong className="text-white">ক্যাশ অন ডেলিভারি (Cash on Delivery)</strong>
                        <p className="text-[11px] text-slate-400">পণ্য হাতে পেয়ে চেক করে টাকা দিন</p>
                      </div>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      জনপ্রিয়
                    </span>
                  </label>

                  {/* bKash */}
                  <label className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'bkash' ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800 bg-[#0E172C] hover:border-slate-700'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payment_opt"
                        checked={paymentMethod === 'bkash'}
                        onChange={() => setPaymentMethod('bkash')}
                      />
                      <div>
                        <strong className="text-white">বিকাশ পেমেন্ট (bKash)</strong>
                        <p className="text-[11px] text-slate-400">অর্ডার প্লেস করার পর বিকাশ মার্চেন্টে পে করুন</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-rose-400">bKash</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Order Summary Card */}
            <div className="lg:col-span-5 bg-[#0B1325] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5 sticky top-24">
              <h2 className="text-sm font-black text-white border-b border-slate-800 pb-3">
                অর্ডার সামারি ({cartItems.length} টি গ্যাজেট)
              </h2>

              {/* Items List */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1 text-xs">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain bg-[#0E172C] rounded-xl p-1 border border-slate-800 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white truncate">{item.title}</h4>
                      <p className="text-[11px] text-slate-400">পরিমাণ: {item.quantity || 1} টি</p>
                    </div>
                    <span className="font-black text-cyan-400">
                      ৳{((item.price || 0) * (item.quantity || 1)).toLocaleString('bn-BD')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Summary Breakdown */}
              <div className="space-y-2 text-xs pt-2">
                <div className="flex justify-between text-slate-400">
                  <span>সাবটোটাল</span>
                  <span className="font-bold text-white">৳{subtotal.toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>ডেলিভারি চার্জ</span>
                  <span className="font-bold text-white">
                    {finalDeliveryCharge === 0 ? (
                      <span className="text-emerald-400">ফ্রি ডেলিভারি</span>
                    ) : (
                      `৳${finalDeliveryCharge.toLocaleString('bn-BD')}`
                    )}
                  </span>
                </div>
                <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-black text-white">
                  <span>সর্বমোট প্রদেয়</span>
                  <span className="text-cyan-400 text-lg">৳{grandTotal.toLocaleString('bn-BD')}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-white hover:bg-slate-100 text-slate-950 font-black py-3.5 rounded-xl shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all active:scale-98 cursor-pointer uppercase tracking-wider text-xs flex items-center justify-center gap-2"
              >
                <span>অর্ডার নিশ্চিত করুন (৳{grandTotal.toLocaleString('bn-BD')})</span>
              </button>

              <div className="bg-[#0E172C] rounded-2xl p-3 border border-slate-800 text-center space-y-1 text-[11px] text-slate-400">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি</span>
                </div>
                <p>পণ্য পৌঁছানোর পর ডেলিভারি ম্যানের সামনে চেক করার সম্পূর্ণ অধিকার থাকবে।</p>
              </div>

            </div>

          </form>
        )}
      </main>

    </div>
  );
}
