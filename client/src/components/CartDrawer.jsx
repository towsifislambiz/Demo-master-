import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, 
  CheckCircle2, ArrowRight, ShieldCheck, MapPin, Phone, User, MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const { 
    cart, isCartOpen, setIsCartOpen, removeFromCart, 
    updateQuantity, cartSubtotal, deliveryArea, setDeliveryArea, 
    deliveryCharge, cartTotal, placeOrder, activeNiche 
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customerName || !phone || !address || cart.length === 0) {
      alert('দয়া করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ডেলিভারি ঠিকানা প্রদান করুন।');
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await placeOrder({
        customerName,
        phone,
        address,
        city: deliveryArea === 'inside' ? 'Dhaka' : 'Outside Dhaka',
        paymentMethod
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (_) {}

      setCompletedOrder(order);
    } catch (err) {
      alert('অর্ডার সম্পন্ন করতে সমস্যা হয়েছে: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const itemList = cart.map((i) => `• ${i.title} (${i.quantity}x) - ৳${i.price * i.quantity}`).join('\n');
    const msg = `আসসালামু আলাইকুম, আমি WebCraft BD স্টোর থেকে অর্ডার করতে চাই:\n\n${itemList}\n\nসাবটোটাল: ৳${cartSubtotal}\nডেলিভারি চার্জ: ৳${deliveryCharge}\nসর্বমোট বিল: ৳${cartTotal}\n\nআমার নাম: ${customerName || 'N/A'}\nফোন: ${phone || 'N/A'}\nঠিকানা: ${address || 'N/A'}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/8801629559653?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
          />

          {/* Slide Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col justify-between shadow-2xl"
            >
              
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-base text-white">শপিং ব্যাগ ({cart.length} টি আইটেম)</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Confirmation Screen */}
              {completedOrder ? (
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 overflow-y-auto">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center ring-4 ring-emerald-500/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40">
                      ORDER PLACED
                    </span>
                    <h2 className="text-xl font-black text-white mt-2">অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h2>
                    <p className="text-xs text-slate-300 mt-1">
                      অর্ডার নম্বর: <strong className="font-mono text-amber-400">{completedOrder.orderId}</strong>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      ধন্যবাদ {completedOrder.customerName}! আমাদের ডেলিভারি টিম খুব শীঘ্রই আপনার নম্বরে কল করে অর্ডার নিশ্চিত করবে।
                    </p>
                  </div>

                  {/* Order summary box */}
                  <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>পণ্য সংখ্যা:</span>
                      <span className="text-white font-bold">{completedOrder.items.length} টি</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>পেমেন্ট মেথড:</span>
                      <span className="text-white font-bold">{completedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>ডেলিভারি এলাকা:</span>
                      <span className="text-white font-bold">{completedOrder.city}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-emerald-400">
                      <span>সর্বমোট বিল:</span>
                      <span>৳{completedOrder.total.toLocaleString('en-US')}</span>
                    </div>
                  </div>

                  <div className="w-full space-y-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCompletedOrder(null);
                        setIsCartOpen(false);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black rounded-xl text-xs shadow-lg cursor-pointer"
                    >
                      আরো শপিং করুন
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 divide-y divide-slate-800/60">
                    {cart.length === 0 ? (
                      <div className="h-64 flex flex-col items-center justify-center text-center space-y-3 text-slate-500">
                        <ShoppingBag className="w-12 h-12 stroke-1" />
                        <p className="text-xs">আপনার শপিং ব্যাগ বর্তমানে খালি আছে।</p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.variantKey} className="pt-3.5 flex items-start space-x-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                            <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                              {item.selectedSize && <span>সাইজ: {item.selectedSize}</span>}
                              {item.selectedColor && <span>কালার: {item.selectedColor}</span>}
                            </div>
                            <div className="text-xs font-black text-amber-400 mt-1">
                              ৳{item.price.toLocaleString('en-US')}
                            </div>

                            {/* Qty & Remove */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-1.5 bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.variantKey, -1)}
                                  className="p-1 hover:text-white text-slate-400 cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold px-2 font-mono text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.variantKey, 1)}
                                  className="p-1 hover:text-white text-slate-400 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.variantKey || item.id)}
                                className="text-slate-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer rounded-lg hover:bg-red-500/10"
                                title="মুছে ফেলুন"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Checkout & Delivery Form Section */}
                  {cart.length > 0 && (
                    <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 space-y-4 text-xs">
                      
                      {/* Delivery Area Selection */}
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-bold block text-[11px]">ডেলিভারি এরিয়া নির্বাচন করুন:</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setDeliveryArea('inside')}
                            className={`p-2 rounded-xl text-left border cursor-pointer transition-all ${
                              deliveryArea === 'inside'
                                ? 'bg-cyan-950/60 border-cyan-500 text-white font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span className="block text-xs">ঢাকার ভেতর</span>
                            <span className="text-[10px] text-cyan-400 font-mono">৳৮০ চার্জ</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeliveryArea('outside')}
                            className={`p-2 rounded-xl text-left border cursor-pointer transition-all ${
                              deliveryArea === 'outside'
                                ? 'bg-cyan-950/60 border-cyan-500 text-white font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span className="block text-xs">ঢাকার বাইরে</span>
                            <span className="text-[10px] text-cyan-400 font-mono">৳১৫০ চার্জ</span>
                          </button>
                        </div>
                      </div>

                      {/* Customer Details Form */}
                      <form onSubmit={handleSubmitOrder} className="space-y-2.5">
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="আপনার নাম *"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div>
                          <input
                            type="tel"
                            required
                            placeholder="১১ ডিজিটের মোবাইল নম্বর *"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div>
                          <textarea
                            rows={2}
                            required
                            placeholder="সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা/জেলা) *"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                          />
                        </div>

                        {/* Bill Breakdown */}
                        <div className="pt-2 border-t border-slate-800/80 space-y-1 text-slate-400 text-[11px]">
                          <div className="flex justify-between">
                            <span>পণ্য উপমোট:</span>
                            <span className="font-mono text-white">৳{cartSubtotal.toLocaleString('en-US')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>ডেলিভারি চার্জ:</span>
                            <span className="font-mono text-white">৳{deliveryCharge}</span>
                          </div>
                          <div className="flex justify-between text-sm font-black text-amber-400 pt-1 border-t border-slate-800">
                            <span>সর্বমোট প্রদেয়:</span>
                            <span>৳{cartTotal.toLocaleString('en-US')}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-lg active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                          >
                            <span>{isSubmitting ? 'প্রসেসিং...' : 'ক্যাশ অন ডেলিভারি অর্ডার'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={handleWhatsAppOrder}
                            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>হোয়াটসঅ্যাপে অর্ডার</span>
                          </button>
                        </div>
                      </form>

                    </div>
                  )}
                </>
              )}

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
