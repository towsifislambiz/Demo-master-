import React, { useState } from 'react';
import { 
  X, CheckCircle2, ShieldCheck, Truck, Phone, User, 
  MapPin, ShoppingBag, Sparkles, AlertCircle, ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GHORER_BAZAR_BRAND } from '../../data/ghorerBazarData';

export default function GhorerBazarQuickOrderModal({
  isOpen,
  onClose,
  product,
  initialWeight
}) {
  const { placeOrder } = useStore();

  const [selectedWeight, setSelectedWeight] = useState(initialWeight || product?.weights?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState('inside_dhaka'); // 'inside_dhaka' | 'outside_dhaka'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Sync initialWeight when product changes
  React.useEffect(() => {
    if (initialWeight) {
      setSelectedWeight(initialWeight);
    } else if (product?.weights?.length) {
      const def = product.weights.find((w) => w.isDefault) || product.weights[0];
      setSelectedWeight(def);
    }
    setQuantity(1);
    setErrors({});
    setOrderSuccess(null);
  }, [product, initialWeight]);

  if (!isOpen || !product) return null;

  const currentPrice = selectedWeight?.price ?? product.price ?? 0;
  const deliveryCharge = deliveryArea === 'inside_dhaka' 
    ? GHORER_BAZAR_BRAND.deliveryInsideDhaka 
    : GHORER_BAZAR_BRAND.deliveryOutsideDhaka;
  
  const subtotal = currentPrice * quantity;
  const isFreeDelivery = subtotal >= GHORER_BAZAR_BRAND.freeDeliveryThreshold;
  const actualDeliveryCharge = isFreeDelivery ? 0 : deliveryCharge;
  const grandTotal = subtotal + actualDeliveryCharge;

  const handleValidate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'অনুগ্রহ করে আপনার নাম লিখুন';
    if (!phone.trim()) {
      errs.phone = 'অনুগ্রহ করে মোবাইল নাম্বার লিখুন';
    } else if (!/^01[3-9]\d{8}$/.test(phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 01712345678)';
    }
    if (!address.trim()) errs.address = 'অনুগ্রহ করে পূর্ণ ঠিকানা লিখুন';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!handleValidate()) return;

    setIsSubmitting(true);
    try {
      const generatedOrderId = 'GB-' + Math.floor(100000 + Math.random() * 900000);
      const orderPayload = {
        orderId: generatedOrderId,
        id: generatedOrderId,
        niche: 'organic',
        customerName: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        deliveryArea: deliveryArea === 'inside_dhaka' ? 'ঢাকা সিটি' : 'ঢাকার বাইরে',
        deliveryCharge: actualDeliveryCharge,
        subtotal: subtotal,
        discount: 0,
        total: grandTotal,
        paymentMethod: 'ক্যাশ অন ডেলিভারি (Cash on Delivery)',
        note: note.trim(),
        status: 'Processing',
        date: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
        items: [
          {
            id: product.id,
            title: product.title,
            weight: selectedWeight?.label || 'প্যাক',
            price: currentPrice,
            quantity: quantity,
            image: product.image
          }
        ]
      };

      if (placeOrder) {
        await placeOrder(orderPayload);
      }

      setOrderSuccess(orderPayload);
    } catch (err) {
      console.error('Order submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden border border-emerald-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#055C32] text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-600/80 text-amber-300">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-base leading-tight">১-ক্লিক দ্রুত ক্যাশ অন ডেলিভারি</h3>
              <p className="text-[11px] text-emerald-100">অগ্রিম কোনো টাকা দিতে হবে না, পণ্য দেখে মূল্য পরিশোধ করুন</p>
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

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {orderSuccess ? (
            /* Order Success View */
            <div className="text-center py-6 px-2 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#055C32] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#055C32] border border-emerald-200 mb-2">
                  অর্ডার আইডি: {orderSuccess.orderId}
                </span>
                <h4 className="text-xl font-black text-stone-900">
                  ধন্যবাদ, আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!
                </h4>
                <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                  আমাদের কাস্টমার কেয়ার টিম শীঘ্রই <span className="font-bold text-stone-900">{orderSuccess.phone}</span> নাম্বারে ফোন করে ডেলিভারি নিশ্চিত করবেন।
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-left text-xs space-y-2">
                <div className="flex justify-between pb-2 border-b border-stone-200 font-bold text-stone-800">
                  <span>পণ্য:</span>
                  <span className="text-[#055C32] text-right truncate max-w-[200px]">{product.title}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>প্যাকেট / ওজন:</span>
                  <span className="font-semibold text-stone-800">{selectedWeight?.label} ({quantity} টি)</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>ডেলিভারি ঠিকানা:</span>
                  <span className="font-medium text-stone-800 text-right">{orderSuccess.address}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 font-black text-sm text-stone-900">
                  <span>সর্বমোট প্রদেয় টাকা:</span>
                  <span className="text-[#055C32]">৳{grandTotal.toLocaleString('bn-BD')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-[#055C32] hover:bg-[#077842] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                আরও কেনাকাটা করুন
              </button>
            </div>
          ) : (
            /* Order Form View */
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              
              {/* Product Preview Card */}
              <div className="flex gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/80 items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.webp';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 line-clamp-1">{product.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-emerald-800 font-black text-sm">
                      ৳{currentPrice.toLocaleString('bn-BD')}
                    </span>
                    {selectedWeight && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                        {selectedWeight.label}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Weight Variant Selector inside modal */}
              {product.weights && product.weights.length > 1 && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    ওজন পরিবর্তন করুন:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {product.weights.map((weight) => {
                      const isSelected = selectedWeight?.label === weight.label;
                      return (
                        <button
                          key={weight.label}
                          type="button"
                          onClick={() => setSelectedWeight(weight)}
                          className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            isSelected
                              ? 'bg-[#055C32] text-white border-[#055C32] shadow-sm'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300'
                          }`}
                        >
                          <div>{weight.label}</div>
                          <div className={`text-[10px] ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                            ৳{weight.price}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between py-2 border-y border-stone-100">
                <span className="text-xs font-bold text-stone-700">পরিমাণ (Quantity):</span>
                <div className="flex items-center gap-3 bg-stone-100 px-3 py-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-6 h-6 rounded-lg bg-white text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm w-4 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-6 h-6 rounded-lg bg-[#055C32] text-white font-bold hover:bg-[#077842] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Delivery Zone Radio Buttons */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  ডেলিভারি লোকেশন নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryArea('inside_dhaka')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      deliveryArea === 'inside_dhaka'
                        ? 'border-[#055C32] bg-emerald-50/70 text-[#055C32] ring-2 ring-emerald-500/20'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-xs font-bold">ঢাকার ভিতরে</div>
                    <div className="text-[11px] text-stone-500">
                      চার্জ: ৳{GHORER_BAZAR_BRAND.deliveryInsideDhaka}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryArea('outside_dhaka')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      deliveryArea === 'outside_dhaka'
                        ? 'border-[#055C32] bg-emerald-50/70 text-[#055C32] ring-2 ring-emerald-500/20'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-xs font-bold">ঢাকার বাইরে</div>
                    <div className="text-[11px] text-stone-500">
                      চার্জ: ৳{GHORER_BAZAR_BRAND.deliveryOutsideDhaka}
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Input Fields */}
              <div className="space-y-3">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    আপনার নাম <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                      }}
                      placeholder="যেমন: মোঃ ইকবাল হোসেন"
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border ${
                        errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 focus:border-[#055C32]'
                      } focus:outline-none transition-all`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-rose-500 mt-0.5">{errors.name}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    মোবাইল নাম্বার <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
                      }}
                      placeholder="১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 01712345678)"
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border ${
                        errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 focus:border-[#055C32]'
                      } focus:outline-none transition-all font-mono`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{errors.phone}</p>}
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (errors.address) setErrors((prev) => ({ ...prev, address: null }));
                      }}
                      placeholder="বাড়ি নং, রোড নং, এলাকা, থানা ও জেলা লিখুন..."
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border ${
                        errors.address ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 focus:border-[#055C32]'
                      } focus:outline-none transition-all`}
                    />
                  </div>
                  {errors.address && <p className="text-[10px] text-rose-500 mt-0.5">{errors.address}</p>}
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-emerald-50/60 rounded-2xl p-3 border border-emerald-100 text-xs space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>পণ্যের মূল্য ({quantity} টি):</span>
                  <span className="font-semibold text-stone-800">৳{subtotal.toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-semibold text-stone-800">
                    {actualDeliveryCharge === 0 ? (
                      <span className="text-emerald-700 font-bold">ফ্রি ডেলিভারি</span>
                    ) : (
                      `৳${actualDeliveryCharge.toLocaleString('bn-BD')}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-emerald-200/60 font-black text-sm text-stone-900">
                  <span>মোট বিল (ক্যাশ অন ডেলিভারি):</span>
                  <span className="text-[#055C32] text-base">৳{grandTotal.toLocaleString('bn-BD')}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-around py-1 text-[11px] text-stone-500">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  ১০০% খাঁটি পণ্য
                </span>
                <span className="inline-flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  পণ্য দেখে টাকা পরিশোধ
                </span>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-2xl bg-[#055C32] hover:bg-[#077842] active:scale-98 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>অর্ডার প্রসেস হচ্ছে...</span>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-amber-300" />
                    <span>অর্ডার কনফার্ম করুন — ৳{grandTotal.toLocaleString('bn-BD')}</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
