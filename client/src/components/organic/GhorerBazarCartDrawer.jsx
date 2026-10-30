import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, 
  Sparkles, Truck, Plus, Minus
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GHORER_BAZAR_BRAND } from '../../data/ghorerBazarData';

export default function GhorerBazarCartDrawer({
  isOpen,
  onClose
}) {
  const navigate = useNavigate();
  const { cart = [], removeFromCart, updateQuantity } = useStore();

  if (!isOpen) return null;

  const totalCartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  const freeThreshold = GHORER_BAZAR_BRAND.freeDeliveryThreshold;
  const neededForFree = Math.max(0, freeThreshold - subtotal);
  const freeProgress = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  const handleGoToCheckout = () => {
    onClose();
    navigate('/organic/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-in Drawer Container */}
      <div 
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#055C32] text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-bold text-base">আপনার শপিং ব্যাগ</h3>
              <p className="text-[11px] text-emerald-100">
                {totalCartCount > 0 ? `${totalCartCount} টি আইটেম যোগ করা হয়েছে` : 'ব্যাগ খালি'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-emerald-700 text-emerald-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-emerald-50 px-4 py-2.5 border-b border-emerald-100">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-1.5">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-700" />
              {neededForFree === 0 ? (
                <span className="text-emerald-800 font-bold">অভিনন্দন! আপনি পাচ্ছেন ফ্রি ডেলিভারি! 🎉</span>
              ) : (
                <span>আর মাত্র <strong className="text-emerald-800">৳{neededForFree.toLocaleString('bn-BD')}</strong> টাকার পণ্য কিনলেই ফ্রি ডেলিভারি!</span>
              )}
            </span>
            <span className="text-[11px] text-stone-500 font-mono">{freeProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-emerald-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#055C32] rounded-full transition-all duration-500" 
              style={{ width: `${freeProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-10 h-10 stroke-1 text-emerald-700" />
              </div>
              <h4 className="font-bold text-base text-stone-800">আপনার শপিং ব্যাগ সম্পূর্ণ খালি!</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                আমাদের খাঁটি প্রাকৃতিক মধু, গাওয়া ঘি ও সেরা অর্গানিক খাদ্যগুলো দেখুন।
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#055C32] hover:bg-[#077842] text-white text-xs font-bold shadow transition-all cursor-pointer"
              >
                পণ্য কেনাকাটা শুরু করুন
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemKey = item.variantKey || item.id;
              const itemWeight = item.selectedSize || item.weight || item.selectedWeight || 'প্যাক';
              const price = item.price || 0;
              const qty = item.quantity || 1;
              const lineTotal = price * qty;

              return (
                <div 
                  key={itemKey}
                  className="flex gap-3 p-3 rounded-2xl bg-stone-50/80 border border-stone-200 hover:border-emerald-200 transition-all items-center"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0 bg-white"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.jpg';
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                      {item.title}
                    </h5>
                    
                    <div className="flex items-center gap-2 mt-0.5 text-xs">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold">
                        {itemWeight}
                      </span>
                      <span className="font-black text-[#055C32]">
                        ৳{price.toLocaleString('bn-BD')}
                      </span>
                    </div>

                    {/* Stepper & Line Total */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-lg border border-stone-300">
                        <button
                          type="button"
                          onClick={() => updateQuantity(itemKey, -1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs text-stone-800 w-3 text-center">{qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(itemKey, 1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-xs text-stone-900">
                          ৳{lineTotal.toLocaleString('bn-BD')}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(itemKey)}
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 shrink-0 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>পণ্যের মোট মূল্য:</span>
                <span className="font-semibold text-stone-900">৳{subtotal.toLocaleString('bn-BD')}</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-semibold text-stone-900">
                  {neededForFree === 0 ? (
                    <span className="text-emerald-700 font-bold">ফ্রি</span>
                  ) : (
                    <span>চেকআউটে নির্ধারিত হবে</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-stone-900 pt-2 border-t border-stone-200">
                <span>সর্বমোট:</span>
                <span className="text-[#055C32]">৳{subtotal.toLocaleString('bn-BD')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoToCheckout}
              className="w-full py-3 px-4 rounded-xl bg-[#055C32] hover:bg-[#077842] active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <span>অর্ডার সম্পন্ন করতে এগিয়ে যান</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-stone-600 hover:text-stone-900 text-xs font-semibold text-center transition-colors cursor-pointer"
            >
              আরও কেনাকাটা করুন
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
