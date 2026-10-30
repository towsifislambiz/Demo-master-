import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, 
  Truck, Sparkles, MessageCircle 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function ShelaiCartDrawer() {
  const navigate = useNavigate();
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    deliveryArea,
    setDeliveryArea
  } = useStore();

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeDeliveryThreshold = 2500;
  const deliveryCharge = cartSubtotal >= freeDeliveryThreshold ? 0 : (deliveryArea === 'inside' ? 80 : 150);
  const cartTotal = cartSubtotal + deliveryCharge;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));
  const remainingForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/store/checkout');
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemList = cart
      .map((item, idx) => `${idx + 1}. ${item.title} (${item.designer || ''}) - সাইজ: ${item.selectedSize || 'Standard'}, পরিমাণ: ${item.quantity}টি, মূল্য: ৳${(item.price * item.quantity).toLocaleString('en-US')}`)
      .join('\n');
    const msg = `আসসালামু আলাইকুম! আমি Shelai Couture থেকে নিচের পণ্যগুলো অর্ডার করতে চাই:\n\n${itemList}\n\nসাবটোটাল: ৳${cartSubtotal.toLocaleString('en-US')}\nডেলিভারি এরিয়া: ${deliveryArea === 'inside' ? 'ঢাকা সিটি' : 'ঢাকার বাইরে'}\nসর্বমোট: ৳${cartTotal.toLocaleString('en-US')}\nদয়া করে ডেলিভারি কনফার্ম করুন।`;
    window.open(`https://wa.me/8801629559653?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#fcfbf9] text-[#1c1917] shadow-2xl flex flex-col justify-between border-l border-[#e7e2d9]"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-[#e7e2d9] bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#0f291e] text-[#fef08a] flex items-center justify-center shadow-sm">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#0f291e] leading-tight">
                        আপনার শপিং ব্যাগ
                      </h3>
                      <p className="text-[10px] font-mono text-[#854d0e] uppercase tracking-wider">
                        {cart.length > 0 ? `${cart.reduce((sum, i) => sum + i.quantity, 0)}টি ড্রেস যোগ করা হয়েছে` : 'ব্যাগ খালি'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#f4efe6] hover:bg-[#eae3d5] text-[#1c1917] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                    title="বন্ধ করুন"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Free Delivery Threshold Meter */}
                {cart.length > 0 && (
                  <div className="mt-3.5 p-3 rounded-2xl bg-[#f7f4ed] border border-[#e8e1d3]">
                    <div className="flex items-center justify-between text-xs font-serif mb-1.5">
                      <span className="font-bold text-[#0f291e] flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>ফ্রি ডেলিভারি স্ট্যাটাস</span>
                      </span>
                      <span className="text-[11px] font-mono font-bold text-[#854d0e]">
                        {cartSubtotal >= freeDeliveryThreshold ? 'প্রাপ্ত!' : `৳${cartSubtotal} / ৳${freeDeliveryThreshold}`}
                      </span>
                    </div>

                    <div className="w-full bg-[#e7e0d3] h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#c5a059] to-[#0f291e] rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    <p className="text-[10.5px] text-[#78716c] mt-1.5 leading-snug">
                      {remainingForFree === 0 ? (
                        <span className="text-[#15803d] font-bold">
                          🎉 অভিনন্দন! আপনি সম্পূর্ণ ফ্রি হোম ডেলিভারি সুবিধা পাচ্ছেন!
                        </span>
                      ) : (
                        <span>
                          আর মাত্র <strong className="text-[#0f291e] font-mono">৳{remainingForFree.toLocaleString('en-US')}</strong> টাকার পণ্য যোগ করলেই ডেলিভারি সম্পূর্ণ ফ্রি!
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Drawer Items Scrollable List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 divide-y divide-[#f0ebd9]">
                {cart.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#f4efe6] text-[#c5a059] mx-auto flex items-center justify-center shadow-inner">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-base text-[#1c1917]">
                        আপনার শপিং ব্যাগ বর্তমানে খালি
                      </h4>
                      <p className="text-xs text-[#78716c] max-w-xs mx-auto">
                        আমাদের এক্সক্লুসিভ ডিজাইনার ৩-পিস স্যুট, ঢাকাই শাড়ি ও দুবাই আবায়া কালেকশন থেকে পছন্দ করুন।
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/store');
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#0f291e] text-[#fef9c3] font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#1b4332] transition-all cursor-pointer"
                    >
                      কালেকশন দেখুন
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.variantKey} className="pt-3.5 first:pt-0 flex space-x-3.5 group">
                      {/* Thumbnail */}
                      <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#f4efe6] shrink-0 border border-[#e7e2d9]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <div>
                              <p className="text-[9.5px] font-mono uppercase font-bold text-[#854d0e]">
                                {item.designer}
                              </p>
                              <h5 className="font-serif font-bold text-xs sm:text-sm text-[#1c1917] line-clamp-1 group-hover:text-[#0f291e]">
                                {item.title}
                              </h5>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.variantKey || item.id)}
                              className="text-[#a8a29e] hover:text-[#dc2626] p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Selected Variants */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px]">
                            {item.selectedSize && (
                              <span className="px-2 py-0.5 rounded bg-[#f4efe6] font-mono font-bold text-[#44403c] border border-[#e7e2d9]">
                                সাইজ: {item.selectedSize}
                              </span>
                            )}
                            {item.selectedStitching && (
                              <span className="px-2 py-0.5 rounded bg-[#f4efe6] font-mono text-[#78716c] border border-[#e7e2d9] truncate max-w-[140px]">
                                {item.selectedStitching.split(' ')[0]}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stepper & Price */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-2 bg-white border border-[#d6cebf] rounded-full px-2 py-0.5 shadow-xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.variantKey, -1)}
                              className="text-[#78716c] hover:text-[#1c1917] p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-black text-[#0f291e] px-1">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.variantKey, 1)}
                              className="text-[#78716c] hover:text-[#1c1917] p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-black text-[#0f291e] font-serif">
                              ৳{(item.price * item.quantity).toLocaleString('en-US')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout Action */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 bg-white border-t border-[#e7e2d9] space-y-3.5 shadow-lg">
                  {/* Delivery Location Switcher */}
                  <div className="flex items-center justify-between text-xs bg-[#f7f4ed] p-2 rounded-xl border border-[#e8e1d3]">
                    <span className="font-bold text-[#44403c]">ডেলিভারি এরিয়া:</span>
                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        onClick={() => setDeliveryArea('inside')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          deliveryArea === 'inside'
                            ? 'bg-[#0f291e] text-[#fef9c3]'
                            : 'text-[#78716c] hover:text-[#0f291e]'
                        }`}
                      >
                        ঢাকা সিটি (৳৮০)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryArea('outside')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          deliveryArea === 'outside'
                            ? 'bg-[#0f291e] text-[#fef9c3]'
                            : 'text-[#78716c] hover:text-[#0f291e]'
                        }`}
                      >
                        ঢাকার বাইরে (৳১৫০)
                      </button>
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#78716c]">
                      <span>সাবটোটাল:</span>
                      <span className="font-mono font-bold text-[#1c1917]">
                        ৳{cartSubtotal.toLocaleString('en-US')}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#78716c]">
                      <span>ডেলিভারি চার্জ:</span>
                      <span className="font-mono font-bold text-[#1c1917]">
                        {deliveryCharge === 0 ? (
                          <span className="text-[#15803d]">সম্পূর্ণ ফ্রি</span>
                        ) : (
                          `৳${deliveryCharge}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-black text-[#0f291e] font-serif pt-2 border-t border-[#f0ebd9]">
                      <span>সর্বমোট প্রদেয়:</span>
                      <span className="font-serif">৳{cartTotal.toLocaleString('en-US')}</span>
                    </div>
                  </div>

                  {/* High-Converting Primary Checkout CTA */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={handleProceedToCheckout}
                      className="w-full py-3.5 rounded-full bg-[#0f291e] hover:bg-[#16382b] text-[#fef9c3] font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_4px_18px_rgba(15,41,30,0.3)] active:scale-95 transition-all cursor-pointer border border-[#c5a059]/40"
                    >
                      <span>চেকআউট পেজে এগিয়ে যান</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-2.5 rounded-full bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/40 text-[#15803d] font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#16a34a]" />
                      <span>হোয়াটসঅ্যাপে সরাসরি অর্ডার দিন</span>
                    </button>
                  </div>

                  {/* Trust Footer */}
                  <div className="flex items-center justify-center space-x-3 text-[10px] text-[#a8a29e] pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#15803d]" />
                      <span>১০০% আসল পণ্য</span>
                    </span>
                    <span>•</span>
                    <span>ডেলিভারিতে দেখে নেওয়ার সুযোগ</span>
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
