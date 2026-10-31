import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, ShieldCheck, Truck, ArrowLeft, PhoneCall, ShoppingBag, 
  ShoppingCart, Check, Zap, CheckCircle2, ChevronRight, Award,
  Sparkles, Heart, AlertCircle, Share2, Layers
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { 
  GHORER_BAZAR_BRAND, 
  GHORER_BAZAR_PRODUCTS 
} from '../../data/ghorerBazarData';
import GhorerBazarHeader from './GhorerBazarHeader';
import GhorerBazarProductCard from './GhorerBazarProductCard';
import GhorerBazarQuickOrderModal from './GhorerBazarQuickOrderModal';
import GhorerBazarCartDrawer from './GhorerBazarCartDrawer';

export default function GhorerBazarProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, placeOrder } = useStore();

  const product = GHORER_BAZAR_PRODUCTS.find((p) => p.id === productId) || GHORER_BAZAR_PRODUCTS[0];

  const defaultWeight = product.weights?.find((w) => w.isDefault) || product.weights?.[0] || {
    label: '৫০০ গ্রাম',
    price: product.price || 0,
    oldPrice: product.oldPrice || 0
  };

  const [selectedWeight, setSelectedWeight] = useState(defaultWeight);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc'); // 'desc' | 'benefits' | 'lab'
  const [isAddedAnim, setIsAddedAnim] = useState(false);
  const [quickOrderProduct, setQuickOrderProduct] = useState(null);
  const [quickOrderWeight, setQuickOrderWeight] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Inline Fast Checkout Form State (Ghorer Bazar Signature Feature)
  const [deliveryArea, setDeliveryArea] = useState('inside_dhaka');
  const [inlineName, setInlineName] = useState('');
  const [inlinePhone, setInlinePhone] = useState('');
  const [inlineAddress, setInlineAddress] = useState('');
  const [inlineErrors, setInlineErrors] = useState({});
  const [inlineSubmitting, setInlineSubmitting] = useState(false);
  const [inlineSuccess, setInlineSuccess] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const def = product.weights?.find((w) => w.isDefault) || product.weights?.[0] || {
      label: '৫০০ গ্রাম',
      price: product.price || 0,
      oldPrice: product.oldPrice || 0
    };
    setSelectedWeight(def);
    setQuantity(1);
    setInlineSuccess(null);
    setInlineErrors({});
  }, [productId, product]);

  const currentPrice = selectedWeight?.price ?? product.price ?? 0;
  const currentOldPrice = selectedWeight?.oldPrice ?? product.oldPrice ?? 0;
  const discountPercent = currentOldPrice > currentPrice 
    ? Math.round(((currentOldPrice - currentPrice) / currentOldPrice) * 100) 
    : 0;

  const deliveryCharge = deliveryArea === 'inside_dhaka' 
    ? GHORER_BAZAR_BRAND.deliveryInsideDhaka 
    : GHORER_BAZAR_BRAND.deliveryOutsideDhaka;
  
  const lineSubtotal = currentPrice * quantity;
  const isFreeDelivery = lineSubtotal >= GHORER_BAZAR_BRAND.freeDeliveryThreshold;
  const actualDeliveryCharge = isFreeDelivery ? 0 : deliveryCharge;
  const grandTotal = lineSubtotal + actualDeliveryCharge;

  const handleAddToCart = () => {
    setIsAddedAnim(true);
    const itemToAdd = {
      ...product,
      price: currentPrice,
      oldPrice: currentOldPrice,
      weight: selectedWeight?.label || 'প্যাক',
      selectedWeight: selectedWeight?.label || 'প্যাক',
      quantity: quantity
    };
    if (addToCart) {
      for (let i = 0; i < quantity; i++) {
        addToCart(itemToAdd, { size: selectedWeight?.label || 'প্যাক' });
      }
    }
    setTimeout(() => setIsAddedAnim(false), 1500);
    setIsCartOpen(true);
  };

  const handleQuickOrderOpen = () => {
    setQuickOrderProduct(product);
    setQuickOrderWeight(selectedWeight);
  };

  // Inline Fast Order Submission
  const handleInlineSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!inlineName.trim()) errs.name = 'আপনার নাম লিখুন';
    if (!inlinePhone.trim()) {
      errs.phone = 'মোবাইল নাম্বার লিখুন';
    } else if (!/^01[3-9]\d{8}$/.test(inlinePhone.replace(/[\s-]/g, ''))) {
      errs.phone = 'সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন';
    }
    if (!inlineAddress.trim()) errs.address = 'সম্পূর্ণ ঠিকানা লিখুন';

    if (Object.keys(errs).length > 0) {
      setInlineErrors(errs);
      return;
    }

    setInlineSubmitting(true);
    try {
      const generatedOrderId = 'GB-' + Math.floor(100000 + Math.random() * 900000);
      const orderPayload = {
        orderId: generatedOrderId,
        id: generatedOrderId,
        niche: 'organic',
        customerName: inlineName.trim(),
        phone: inlinePhone.trim(),
        address: inlineAddress.trim(),
        deliveryArea: deliveryArea === 'inside_dhaka' ? 'ঢাকা সিটি' : 'ঢাকার বাইরে',
        deliveryCharge: actualDeliveryCharge,
        subtotal: lineSubtotal,
        discount: 0,
        total: grandTotal,
        paymentMethod: 'ক্যাশ অন ডেলিভারি (Cash on Delivery)',
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
      setInlineSuccess(orderPayload);
    } catch (err) {
      console.error(err);
    } finally {
      setInlineSubmitting(false);
    }
  };

  // Related products from same category or others
  const relatedProducts = GHORER_BAZAR_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAFDF9] text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Header */}
      <GhorerBazarHeader
        activeCategory={product.category}
        onOpenCart={() => setIsCartOpen(true)}
        onBackToGateway={() => navigate('/')}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-emerald-100/60 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
          <Link to="/organic" className="hover:text-[#055C32] font-medium flex items-center gap-1">
            <span>হোম</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link to="/organic/shop" className="hover:text-[#055C32] font-medium">
            {product.categoryBn || 'অর্গানিক ফুড'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="font-bold text-stone-900 truncate max-w-[200px] sm:max-w-md">
            {product.title}
          </span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-emerald-100 shadow-md aspect-square group">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.webp';
                }}
              />

              {/* Lab Tested & Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                {product.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#055C32] text-white shadow-md">
                    {product.badge}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950 shadow-md">
                    {discountPercent}% ছাড়
                  </span>
                )}
              </div>

              {product.labTested && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-emerald-800 shadow-md border border-emerald-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>ল্যাব টেস্ট সার্টিফাইড</span>
                  </span>
                </div>
              )}
            </div>

            {/* Quick Guarantees Strip */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white border border-emerald-100 text-center text-xs">
              <div className="p-2">
                <Truck className="w-5 h-5 text-[#055C32] mx-auto mb-1" />
                <div className="font-bold text-stone-900">দ্রুত ডেলিভারি</div>
                <div className="text-[10px] text-stone-500">২৪-৭২ ঘণ্টায় পৌঁছাবে</div>
              </div>
              <div className="p-2 border-x border-stone-100">
                <Award className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <div className="font-bold text-stone-900">১০০% খাঁটি পণ্য</div>
                <div className="text-[10px] text-stone-500">সম্পূর্ণ কেমিক্যাল মুক্ত</div>
              </div>
              <div className="p-2">
                <CheckCircle2 className="w-5 h-5 text-[#055C32] mx-auto mb-1" />
                <div className="font-bold text-stone-900">ক্যাশ অন ডেলিভারি</div>
                <div className="text-[10px] text-stone-500">দেখে নেওয়ার সুবিধা</div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Weight Selectors, Price, CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#055C32] mb-2">
                {product.categoryBn || 'প্রাকৃতিক খাদ্য'}
              </span>

              <h1 className="text-xl sm:text-3xl font-black text-stone-900 leading-snug">
                {product.title}
              </h1>

              {product.titleEn && (
                <p className="text-xs sm:text-sm text-stone-500 mt-1 font-mono">
                  {product.titleEn}
                </p>
              )}

              {/* Rating & Stock */}
              <div className="flex items-center gap-3 mt-3 text-xs">
                <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-stone-900">{product.rating || 4.9}</span>
                  <span className="text-stone-500">({product.ratingCount || 150} রিভিউ)</span>
                </div>

                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>স্টকে আছে</span>
                </span>
              </div>
            </div>

            {/* Dynamic Price Display */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-baseline justify-between">
              <div>
                <div className="text-xs text-stone-500 font-medium">বিক্রয় মূল্য:</div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-[#055C32]">
                    ৳{currentPrice.toLocaleString('bn-BD')}
                  </span>
                  {currentOldPrice > currentPrice && (
                    <span className="text-sm sm:text-base text-stone-400 line-through">
                      ৳{currentOldPrice.toLocaleString('bn-BD')}
                    </span>
                  )}
                </div>
              </div>

              {discountPercent > 0 && (
                <span className="px-3 py-1 rounded-xl text-xs font-black bg-amber-500 text-stone-950 shadow-sm">
                  {discountPercent}% ছাড় পাচ্ছেন
                </span>
              )}
            </div>

            {/* Weight Variant Selector Pills (Ghorer Bazar Hallmark) */}
            {product.weights && product.weights.length > 1 && (
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-2">
                  ওজন / সাইজ নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.weights.map((weight) => {
                    const isSelected = selectedWeight?.label === weight.label;
                    return (
                      <button
                        key={weight.label}
                        type="button"
                        onClick={() => setSelectedWeight(weight)}
                        className={`p-3 rounded-2xl text-center border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#055C32] bg-[#055C32] text-white shadow-md scale-102'
                            : 'border-stone-200 bg-white text-stone-800 hover:border-emerald-300 hover:bg-emerald-50/40'
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-bold">{weight.label}</div>
                        <div className={`text-xs mt-0.5 ${isSelected ? 'text-amber-200 font-bold' : 'text-stone-500'}`}>
                          ৳{weight.price}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 py-2">
              <span className="text-xs font-bold text-stone-800">পরিমাণ:</span>
              <div className="flex items-center gap-3 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-lg bg-white text-stone-800 font-bold hover:bg-stone-200 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                >
                  -
                </button>
                <span className="font-bold text-sm w-6 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 rounded-lg bg-[#055C32] text-white font-bold hover:bg-[#077842] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                >
                  +
                </button>
              </div>

              <span className="text-xs text-stone-500">
                সর্বমোট: <strong className="text-stone-900 font-bold">৳{(currentPrice * quantity).toLocaleString('bn-BD')}</strong>
              </span>
            </div>

            {/* Dual CTAs (Order Now + Add to Cart) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              {/* Order Now (Direct Cash on Delivery) */}
              <button
                type="button"
                onClick={handleQuickOrderOpen}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#055C32] hover:bg-[#077842] active:scale-95 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span>সরাসরি অর্ডার করুন</span>
              </button>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-3.5 px-4 rounded-2xl border-2 text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAddedAnim
                    ? 'bg-emerald-600 text-white border-emerald-600 scale-98'
                    : 'bg-white hover:bg-emerald-50 text-[#055C32] border-[#055C32] active:scale-95'
                }`}
              >
                {isAddedAnim ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>ব্যাগে যোগ হয়েছে</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 text-[#055C32]" />
                    <span>কার্টে রাখুন</span>
                  </>
                )}
              </button>
            </div>

            {/* Hotline Call to Order Strip */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">ফোনে সরাসরি অর্ডার করুন:</div>
                  <div className="text-xs font-mono font-bold text-amber-900">{GHORER_BAZAR_BRAND.hotline}</div>
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

      {/* 2. Signature Feature: Inline Fast COD Order Form on Product Page */}
      <section className="py-8 bg-emerald-50/60 border-y border-emerald-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl border border-emerald-100">
            
            <div className="text-center max-w-lg mx-auto mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#055C32] text-white inline-block mb-1.5 shadow-sm">
                ঝামেলাহীন অর্ডার
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-stone-900">
                অর্ডার করতে নিচের ফর্মটি পূরণ করুন
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                কোনো অগ্রিম পেমেন্ট নেই! পণ্য হাতে পেয়ে যাচাই করে মূল্য পরিশোধ করুন।
              </p>
            </div>

            {inlineSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#055C32] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black text-stone-900">
                  আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!
                </h4>
                <p className="text-xs text-stone-600">
                  অর্ডার আইডি: <strong className="text-stone-900">{inlineSuccess.orderId}</strong> | ফোন: <strong className="text-stone-900">{inlineSuccess.phone}</strong>
                </p>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs max-w-sm mx-auto space-y-1.5">
                  <div className="flex justify-between font-bold text-stone-800">
                    <span>পণ্য:</span>
                    <span className="text-[#055C32]">{product.title}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>প্যাকেট:</span>
                    <span>{selectedWeight?.label} ({quantity} টি)</span>
                  </div>
                  <div className="flex justify-between font-black text-sm text-stone-900 pt-1.5 border-t border-stone-200">
                    <span>মোট প্রদেয় টাকা:</span>
                    <span className="text-[#055C32]">৳{grandTotal.toLocaleString('bn-BD')}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setInlineSuccess(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#055C32] text-white text-xs font-bold"
                >
                  নতুন আরেকটি অর্ডার করুন
                </button>
              </div>
            ) : (
              <form onSubmit={handleInlineSubmit} className="space-y-4">
                
                {/* Product Summary Row */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                    <div className="truncate">
                      <div className="font-bold text-stone-900 truncate">{product.title}</div>
                      <div className="text-stone-500">{selectedWeight?.label} × {quantity} টি</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-emerald-800 font-black text-sm">৳{lineSubtotal.toLocaleString('bn-BD')}</div>
                  </div>
                </div>

                {/* Delivery Zone Selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    ডেলিভারি এরিয়া নির্বাচন করুন:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryArea('inside_dhaka')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        deliveryArea === 'inside_dhaka'
                          ? 'border-[#055C32] bg-emerald-50 text-[#055C32] ring-2 ring-emerald-500/20'
                          : 'border-stone-200 bg-white text-stone-700'
                      }`}
                    >
                      <div className="text-xs font-bold">ঢাকার ভিতরে</div>
                      <div className="text-[11px] text-stone-500">চার্জ: ৳{GHORER_BAZAR_BRAND.deliveryInsideDhaka}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryArea('outside_dhaka')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        deliveryArea === 'outside_dhaka'
                          ? 'border-[#055C32] bg-emerald-50 text-[#055C32] ring-2 ring-emerald-500/20'
                          : 'border-stone-200 bg-white text-stone-700'
                      }`}
                    >
                      <div className="text-xs font-bold">ঢাকার বাইরে</div>
                      <div className="text-[11px] text-stone-500">চার্জ: ৳{GHORER_BAZAR_BRAND.deliveryOutsideDhaka}</div>
                    </button>
                  </div>
                </div>

                {/* Name, Phone, Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      আপনার নাম <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={inlineName}
                      onChange={(e) => {
                        setInlineName(e.target.value);
                        if (inlineErrors.name) setInlineErrors((p) => ({ ...p, name: null }));
                      }}
                      placeholder="পুরো নাম লিখুন"
                      className={`w-full px-3 py-2 text-xs rounded-xl border ${
                        inlineErrors.name ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 focus:border-[#055C32]'
                      } focus:outline-none`}
                    />
                    {inlineErrors.name && <p className="text-[10px] text-rose-500 mt-0.5">{inlineErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      মোবাইল নাম্বার <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={inlinePhone}
                      onChange={(e) => {
                        setInlinePhone(e.target.value);
                        if (inlineErrors.phone) setInlineErrors((p) => ({ ...p, phone: null }));
                      }}
                      placeholder="১১ ডিজিটের মোবাইল নাম্বার"
                      className={`w-full px-3 py-2 text-xs rounded-xl border font-mono ${
                        inlineErrors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 focus:border-[#055C32]'
                      } focus:outline-none`}
                    />
                    {inlineErrors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{inlineErrors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    সম্পূর্ণ ঠিকানা <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={inlineAddress}
                    onChange={(e) => {
                      setInlineAddress(e.target.value);
                      if (inlineErrors.address) setInlineErrors((p) => ({ ...p, address: null }));
                    }}
                    placeholder="বাড়ি নং, রোড নং, এলাকা, থানা ও জেলা..."
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${
                      inlineErrors.address ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 focus:border-[#055C32]'
                    } focus:outline-none`}
                  />
                  {inlineErrors.address && <p className="text-[10px] text-rose-500 mt-0.5">{inlineErrors.address}</p>}
                </div>

                {/* Total & Submit Button */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs text-stone-600 mb-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span>ডেলিভারি চার্জ: {actualDeliveryCharge === 0 ? <strong className="text-emerald-700">ফ্রি</strong> : `৳${actualDeliveryCharge}`}</span>
                    <span>সর্বমোট প্রদেয় বিল: <strong className="text-base text-[#055C32] font-black">৳{grandTotal.toLocaleString('bn-BD')}</strong></span>
                  </div>

                  <button
                    type="submit"
                    disabled={inlineSubmitting}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#055C32] hover:bg-[#077842] active:scale-98 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
                  >
                    {inlineSubmitting ? (
                      <span>অর্ডার প্রসেস হচ্ছে...</span>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5 text-amber-300" />
                        <span>অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি) — ৳{grandTotal.toLocaleString('bn-BD')}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* 3. Product Description & Benefits Tabs */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-stone-200 gap-4 sm:gap-8 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('desc')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'desc'
                  ? 'border-[#055C32] text-[#055C32]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              বিস্তারিত বিবরণ
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('benefits')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'benefits'
                  ? 'border-[#055C32] text-[#055C32]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              উপকারিতা ও পুষ্টিগুণ
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('lab')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'lab'
                  ? 'border-[#055C32] text-[#055C32]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              বিশুদ্ধতার গ্যারান্টি ও ল্যাব টেস্ট
            </button>
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'desc' && (
            <div className="space-y-4 max-w-4xl text-xs sm:text-sm text-stone-700 leading-relaxed">
              <p>{product.shortDesc}</p>
              
              {product.features && product.features.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-bold text-stone-900 mb-2">এই পণ্যের বিশেষ বৈশিষ্ট্যসমূহ:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#055C32] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Benefits */}
          {activeTab === 'benefits' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                <h5 className="font-bold text-[#055C32]">প্রাকৃতিক রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি</h5>
                <p className="text-stone-600">নিয়মিত সেবনে শরীরের ইমিউন সিস্টেম শক্তিশালী হয় ও সর্দি-কাশি থেকে সুরক্ষা দেয়।</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                <h5 className="font-bold text-[#055C32]">হজমশক্তি ও বিপাকক্রিয়া উন্নয়ন</h5>
                <p className="text-stone-600">খাবারের সঠিক হজমে সহায়তা করে এবং পেটের গ্যাস বা এসিডিটি নিরাময়ে কার্যকরী ভূমিকা রাখে।</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                <h5 className="font-bold text-[#055C32]">দৈনন্দিন স্ট্যামিনা ও এনার্জি</h5>
                <p className="text-stone-600">ক্লান্তি দূর করে তাৎক্ষণিক প্রাকৃতিক শক্তি জোগাতে অত্যন্ত নির্ভরযোগ্য।</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                <h5 className="font-bold text-[#055C32]">ত্বক ও হৃদপিণ্ডের যত্ন</h5>
                <p className="text-stone-600">অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ উপাদান শরীরের ক্ষতিকর ফ্রি র‍্যাডিকেল দূর করতে সাহায্য করে।</p>
              </div>
            </div>
          )}

          {/* Tab 3: Lab Test */}
          {activeTab === 'lab' && (
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 max-w-4xl text-xs sm:text-sm space-y-3">
              <div className="flex items-center gap-2 font-bold text-stone-900">
                <Award className="w-5 h-5 text-amber-600" />
                <span>বিএসটিআই অনুমোদিত ল্যাব টেস্ট মানদণ্ড</span>
              </div>
              <p className="text-stone-600">
                আমাদের প্রতিটি পণ্যের ব্যাচ ল্যাবরেটরিতে এইচএমএফ (HMF), আর্দ্রতা (Moisture), পলিন কাউন্ট এবং সুক্রোজ উপাদান নিখুঁতভাবে পরীক্ষা করা হয়। কোনো প্রকার সিন্থেটিক সুগার, প্রিজারভেটিভ বা কেমিক্যাল অ্যাডাল্টারেশন পাওয়া যায়নি।
              </p>
              <div className="text-[11px] text-emerald-800 font-bold">
                ✓ ল্যাব রিপোর্ট ব্যাচ কোড: GB-LAB-2026-OCT-88
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-8 sm:py-12 bg-[#FAFDF9] border-t border-emerald-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-2xl font-black text-stone-900">
                সম্পর্কিত আরও খাঁটি খাদ্য
              </h3>
              <Link to="/organic/shop" className="text-xs sm:text-sm font-bold text-[#055C32] hover:underline">
                সবগুলো দেখুন
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {relatedProducts.map((relProduct) => (
                <GhorerBazarProductCard
                  key={relProduct.id}
                  product={relProduct}
                  onQuickOrder={(p, w) => {
                    setQuickOrderProduct(p);
                    setQuickOrderWeight(w);
                  }}
                  onAddToCart={(p, w) => {
                    const itemToAdd = {
                      ...p,
                      price: w?.price ?? p.price,
                      oldPrice: w?.oldPrice ?? p.oldPrice,
                      weight: w?.label || 'প্যাক',
                      selectedWeight: w?.label || 'প্যাক'
                    };
                    if (addToCart) {
                      addToCart(itemToAdd, { size: w?.label || 'প্যাক' });
                    }
                    setIsCartOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Footer */}
      <footer className="bg-stone-900 text-stone-300 py-8 px-4 text-center text-xs border-t-4 border-[#055C32] mb-14 md:mb-0">
        <div className="max-w-7xl mx-auto space-y-2">
          <p>© ২০২৬ {GHORER_BAZAR_BRAND.name} (Ghorer Bazar Clone). খাঁটি ও স্বাস্থ্যকর খাবার সরাসরি আপনার ঘরে।</p>
          <div className="text-stone-500 text-[11px]">হটলাইন: {GHORER_BAZAR_BRAND.hotline} | {GHORER_BAZAR_BRAND.address}</div>
        </div>
      </footer>

      {/* 6. Mobile Sticky Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 p-2.5 px-4 shadow-[0_-5px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-10 h-10 rounded-xl object-cover border border-emerald-100 shrink-0"
          />
          <div className="min-w-0">
            <div className="text-[10px] text-stone-500 font-medium truncate">
              {selectedWeight?.label || 'প্যাক'}
            </div>
            <div className="text-sm font-black text-[#055C32] font-mono leading-none">
              ৳{(currentPrice * quantity).toLocaleString('bn-BD')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleAddToCart}
            className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-[#055C32] font-bold text-xs flex items-center gap-1 active:scale-95"
            title="কার্ট"
          >
            <ShoppingBag className="w-4 h-4 text-[#055C32]" />
          </button>

          <button
            type="button"
            onClick={handleQuickOrderOpen}
            className="py-2.5 px-4 rounded-xl bg-[#055C32] text-white font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 uppercase"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>সরাসরি অর্ডার</span>
          </button>
        </div>
      </div>

      {/* Floating Demo Hub Button */}
      <div className="fixed bottom-16 md:bottom-5 left-5 z-40">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-full bg-[#055C32] hover:bg-[#077842] text-white text-xs font-bold shadow-2xl border-2 border-emerald-400/80 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
          <span>ডেমো হাব</span>
        </button>
      </div>

      {/* Quick Order Modal */}
      <GhorerBazarQuickOrderModal
        isOpen={!!quickOrderProduct}
        onClose={() => {
          setQuickOrderProduct(null);
          setQuickOrderWeight(null);
        }}
        product={quickOrderProduct}
        initialWeight={quickOrderWeight}
      />

      {/* Cart Drawer */}
      <GhorerBazarCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

    </div>
  );
}
