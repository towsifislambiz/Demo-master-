import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Package, ShoppingBag, Plus, Trash2, Edit3, 
  Upload, CheckCircle2, Clock, Phone, MapPin, DollarSign, 
  ArrowLeft, Search, Zap, Layers, Image as ImageIcon, X, 
  Eye, EyeOff, Lock, RefreshCw, Check, AlertCircle, Save, 
  TrendingUp, CreditCard, Mail, Sparkles, MessageCircle,
  ExternalLink, LogOut, Key, Info, HelpCircle, Leaf, Award,
  Droplets, Gem, SlidersHorizontal
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { optimizeImage } from '../../utils/imageOptimizer';
import { RIBANA_PRODUCTS, RIBANA_HERO_SLIDES, RIBANA_DEPARTMENTS, RIBANA_CONCERNS } from '../../data/ribanaBeautyData';

export default function RibanaAdminDashboardView() {
  const navigate = useNavigate();
  const { 
    ribanaProducts = RIBANA_PRODUCTS,
    addRibanaProduct,
    updateRibanaProduct,
    deleteRibanaProduct,
    toggleRibanaProductStock,
    orders = [],
    updateOrderStatus,
    ribanaBrandingSettings = {},
    updateRibanaBranding,
    ribanaHeroSlides = RIBANA_HERO_SLIDES,
    updateRibanaHeroSlides,
    ribanaContactSettings = {},
    updateRibanaContactSettings,
    isRibanaAdminAuthenticated,
    loginRibanaAdmin,
    logoutRibanaAdmin
  } = useStore();

  // Active admin tab: 'dashboard' | 'products' | 'branding' | 'contact' | 'security'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Login credentials state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Products filter & search
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [productSearch, setProductSearch] = useState('');

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [demoSecurityModal, setDemoSecurityModal] = useState(false);
  const [saveToast, setSaveToast] = useState(null);

  // New product form state
  const [newProd, setNewProd] = useState({
    title: '',
    titleEn: '',
    category: 'serums',
    concern: 'brightening',
    price: '',
    originalPrice: '',
    discount: '১৫% ছাড়',
    badge: 'BESTSELLER',
    inStock: true,
    size: '30 ml',
    skinType: 'সকল ত্বকের জন্য উপযোগী',
    keyIngredients: 'খাঁটি কাশ্মীরি জাফরান, আলফা আরবুটিন, ভিটামিন সি',
    image: '/beauty-images/saffron_serum_card_exact.webp',
    desc: 'ত্বকের গভীরে গিয়ে পিগমেন্টেশন ও ব্রণের দাগ দূর করে এনে দেয় প্রাকৃতিক গ্লাস-স্কিন আভা।'
  });
  const [uploadStats, setUploadStats] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Branding settings form state
  const [brandingForm, setBrandingForm] = useState({
    brandName: ribanaBrandingSettings.brandName || 'RiBANA Organic',
    brandNameEn: ribanaBrandingSettings.brandNameEn || 'RIBANA ORGANIC',
    tagline: ribanaBrandingSettings.tagline || 'খাঁটি কোল্ড-প্রসেস অর্গানিক রূপচর্চা ও বিউটি কেয়ার',
    logoUrl: ribanaBrandingSettings.logoUrl || null,
    bstiVerified: ribanaBrandingSettings.bstiVerified ?? true,
    halalCertified: ribanaBrandingSettings.halalCertified ?? true
  });

  // Hero slides form state (Slides)
  const [slidesForm, setSlidesForm] = useState(ribanaHeroSlides);

  // Contact & Payment gateway form state
  const [contactForm, setContactForm] = useState({
    email: ribanaContactSettings.email || 'care@ribana.com.bd',
    phone: ribanaContactSettings.phone || '+880 1711-223344',
    bkashNumber: ribanaContactSettings.bkashNumber || '01711-223344 (মার্চেন্ট)',
    nagadNumber: ribanaContactSettings.nagadNumber || '01811-223344 (মার্চেন্ট)',
    address: ribanaContactSettings.address || 'ফ্ল্যাগশিপ আউটলেট: বাড়ি ৮, রোড ৪, ব্লক এ, গুলশান-১ ও ধানমন্ডি, ঢাকা'
  });

  // Security password change form
  const [secCurrentPassword, setSecCurrentPassword] = useState('');
  const [secNewPassword, setSecNewPassword] = useState('');
  const [secConfirmPassword, setSecConfirmPassword] = useState('');

  // Toast helper
  const triggerToast = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (
      (loginEmail.trim().toLowerCase() === 'admin@webcraftbd.com' || loginEmail.trim() === 'admin') &&
      (loginPassword === 'ribana2026' || loginPassword === 'shelai2026')
    ) {
      loginRibanaAdmin();
      setLoginError('');
      triggerToast('অ্যাডমিন কনসোলে সফলভাবে লগইন হয়েছে!');
    } else {
      setLoginError('ভুল ইমেইল বা পাসওয়ার্ড। অনুগ্রহ করে নিচের টেস্ট ক্রেডেনশিয়াল ব্যবহার করুন।');
    }
  };

  const handleQuickDemoLogin = () => {
    setLoginEmail('admin@webcraftbd.com');
    setLoginPassword('ribana2026');
    loginRibanaAdmin();
    setLoginError('');
    triggerToast('১-ক্লিকে টেস্ট লগইন সফল!');
  };

  // Image upload with WebP conversion
  const handleImageFileChange = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsOptimizing(true);
    try {
      const optimized = await optimizeImage(file, { maxWidth: 1000, maxHeight: 1000, quality: 0.85 });
      callback(optimized.dataUrl);
      setUploadStats(optimized);
      triggerToast(`ছবি WebP ফরম্যাটে অপ্টিমাইজ হয়েছে (${optimized.savingsPct} সাইজ সাশ্রয়)!`);
    } catch (err) {
      alert('ছবি প্রসেস করতে সমস্যা হয়েছে: ' + err.message);
    } finally {
      setIsOptimizing(false);
    }
  };

  // Add Product Handler
  const handleCreateProductSubmit = (e) => {
    e.preventDefault();
    if (!newProd.title || !newProd.price) {
      alert('দয়া করে পণ্যের নাম ও মূল্য প্রদান করুন।');
      return;
    }

    const created = {
      id: 'rb-custom-' + Date.now(),
      category: newProd.category || 'serums',
      concern: newProd.concern || 'brightening',
      title: newProd.title,
      titleEn: newProd.titleEn || newProd.title,
      price: Number(newProd.price),
      originalPrice: newProd.originalPrice ? Number(newProd.originalPrice) : null,
      discount: newProd.discount || null,
      badge: newProd.badge || 'BESTSELLER',
      inStock: newProd.inStock,
      rating: 5.0,
      reviews: 1,
      image: newProd.image || '/beauty-images/saffron_serum_card_exact.webp',
      size: newProd.size || '30 ml',
      skinType: newProd.skinType || 'সকল ত্বকের জন্য উপযোগী',
      keyIngredients: newProd.keyIngredients || '১০০% ভেষজ উপাদান',
      benefits: ['🌿 ১০০% অর্গানিক', '✨ ন্যাচারাল গ্লো'],
      desc: newProd.desc || 'ত্বকের গভীর থেকে পুষ্টি জোগায় ও সুস্থ রাখে।'
    };

    addRibanaProduct(created);
    setShowAddModal(false);
    setNewProd({
      title: '',
      titleEn: '',
      category: 'serums',
      concern: 'brightening',
      price: '',
      originalPrice: '',
      discount: '১৫% ছাড়',
      badge: 'BESTSELLER',
      inStock: true,
      size: '30 ml',
      skinType: 'সকল ত্বকের জন্য উপযোগী',
      keyIngredients: 'খাঁটি কাশ্মীরি জাফরান, আলফা আরবুটিন, ভিটামিন সি',
      image: '/beauty-images/saffron_serum_card_exact.webp',
      desc: 'ত্বকের গভীরে গিয়ে পিগমেন্টেশন ও ব্রণের দাগ দূর করে এনে দেয় প্রাকৃতিক গ্লাস-স্কিন আভা।'
    });
    setUploadStats(null);
    triggerToast('নতুন বিউটি প্রোডাক্ট সফলভাবে পাবলিশ হয়েছে!');
  };

  // Edit Product Handler
  const handleUpdateProductSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateRibanaProduct(editingProduct);
    setEditingProduct(null);
    triggerToast('প্রোডাক্ট সফলভাবে আপডেট করা হয়েছে!');
  };

  // Delete Product Handler
  const handleDeleteProduct = (prodId, prodTitle) => {
    if (window.confirm(`আপনি কি নিশ্চিত যে "${prodTitle}" প্রোডাক্টটি ডিলিট করতে চান?`)) {
      deleteRibanaProduct(prodId);
      triggerToast('প্রোডাক্ট সফলভাবে মুছে ফেলা হয়েছে!');
    }
  };

  // Save Branding Handler
  const handleSaveBranding = (e) => {
    e.preventDefault();
    updateRibanaBranding(brandingForm);
    triggerToast('ব্র্যান্ডিং ও লোগো সফলভাবে সংরক্ষিত হয়েছে!');
  };

  // Save Hero Slides Handler
  const handleSaveHeroSlides = (e) => {
    e.preventDefault();
    updateRibanaHeroSlides(slidesForm);
    triggerToast('ব্যানার স্লাইডার সফলভাবে আপডেট হয়েছে!');
  };

  // Save Contact & Payment Settings Handler
  const handleSaveContact = (e) => {
    e.preventDefault();
    updateRibanaContactSettings(contactForm);
    triggerToast('পেমেন্ট ও কন্টাক্ট ইনফরমেশন সংরক্ষিত হয়েছে!');
  };

  // Security password submit (Demo-safe)
  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    setDemoSecurityModal(true);
    setSecCurrentPassword('');
    setSecNewPassword('');
    setSecConfirmPassword('');
  };

  // Filter Orders for Beauty store
  const beautyOrders = orders.filter((o) => o.niche === 'beauty' || (o.id && o.id.startsWith('RBN-')));

  // Metrics Calculations
  const totalBeautyRevenue = beautyOrders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + (o.total || 0) : sum), 0);
  const pendingBeautyOrders = beautyOrders.filter((o) => o.status === 'Pending').length;
  const processingBeautyOrders = beautyOrders.filter((o) => o.status === 'Processing').length;
  const completedBeautyOrders = beautyOrders.filter((o) => o.status === 'Delivered').length;

  // Filtered Products List
  const filteredProducts = (ribanaProducts || RIBANA_PRODUCTS).filter((p) => {
    const matchesCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    const matchesSearch = p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.titleEn?.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.keyIngredients?.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // ========================================================
  // VIEW 1: ADMIN LOGIN SCREEN (Luxury Wine & Amber Palette)
  // ========================================================
  if (!isRibanaAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#110508] text-[#FFF8F5] font-sans flex flex-col justify-between selection:bg-[#8E2A3E] selection:text-[#FFF8F5] relative overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8E2A3E]/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C99A43]/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Minimal Bar */}
        <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between z-10">
          <button
            type="button"
            onClick={() => navigate('/beauty')}
            className="flex items-center gap-2 text-xs font-mono font-bold text-[#C99A43] hover:text-[#F4E2D4] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>বিউটি স্টোরে ফিরে যান</span>
          </button>
          <span className="text-[11px] font-mono tracking-widest text-[#B89B9E] uppercase">
            WEBCRAFT BD • CLIENT MASTER DEMO
          </span>
        </header>

        {/* Center Login Stage */}
        <main className="max-w-md w-full mx-auto px-4 py-8 z-10 space-y-6">
          
          {/* Header Monogram */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#2D0D15] via-[#4A1622] to-[#8E2A3E] border-2 border-[#C99A43] flex items-center justify-center mx-auto shadow-[0_10px_35px_rgba(142,42,62,0.4)]">
              <Leaf className="w-8 h-8 text-[#E6B85C]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-[#FFF8F5] tracking-wide">
              {brandingForm.brandName || 'RiBANA Organic'}
            </h1>
            <p className="text-xs text-[#C99A43] font-mono tracking-widest uppercase">
              MASTER ADMIN CONSOLE • 10K-15K DEMO
            </p>
          </div>

          {/* Test Credentials Display Card */}
          <div className="rounded-3xl bg-gradient-to-r from-[#200B10] to-[#17060A] p-5 border-2 border-[#C99A43]/60 shadow-[0_15px_40px_rgba(0,0,0,0.5)] space-y-3">
            <div className="flex items-center justify-between border-b border-[#C99A43]/30 pb-2">
              <span className="text-[11px] font-mono font-bold text-[#E6B85C] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E6B85C]" />
                <span>টেস্ট অ্যাডমিন লগইন তথ্য (Demo Credentials)</span>
              </span>
              <span className="text-[9px] font-mono bg-[#8E2A3E]/30 text-[#F4E2D4] px-2 py-0.5 rounded-full border border-[#C99A43]/40">
                BEAUTY DEMO
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-[#F4E2D4]">
                <span className="text-[#B89B9E]">ইউজার / ইমেইল:</span>
                <span className="font-bold text-white bg-black/50 px-2 py-0.5 rounded border border-white/10">
                  admin@webcraftbd.com
                </span>
              </div>
              <div className="flex items-center justify-between text-[#F4E2D4]">
                <span className="text-[#B89B9E]">পাসওয়ার্ড:</span>
                <span className="font-bold text-white bg-black/50 px-2 py-0.5 rounded border border-white/10">
                  ribana2026
                </span>
              </div>
            </div>

            {/* 1-Click Instant Login Button */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#C99A43] via-[#E6B85C] to-[#C99A43] hover:brightness-110 text-[#1F080D] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#1F080D] fill-current" />
              <span>১-ক্লিকে টেস্ট লগইন করুন (Instant Access)</span>
            </button>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleLoginSubmit} className="bg-[#1A080C]/90 rounded-3xl p-6 sm:p-7 border border-[#3E131E] shadow-2xl space-y-4 backdrop-blur-md">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#F4E2D4] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#C99A43]" />
                <span>অ্যাডমিন ইমেইল / ইউজারনেম</span>
              </label>
              <input
                type="text"
                required
                placeholder="admin@webcraftbd.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-[#100407] border border-[#3E131E] rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C99A43] transition-all font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#F4E2D4] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#C99A43]" />
                <span>পাসওয়ার্ড</span>
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-[#100407] border border-[#3E131E] rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C99A43] transition-all font-mono pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B89B9E] hover:text-white cursor-pointer"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-rose-300 bg-rose-950/70 p-2.5 rounded-xl border border-rose-800/60">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#8E2A3E] hover:bg-[#A6354C] text-[#FFF8F5] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-[#C99A43]/50 shadow-xl active:scale-95 transition-all cursor-pointer"
            >
              <span>লগইন করুন</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </form>

        </main>

        <footer className="p-6 text-center text-xs text-[#8E7277] font-mono z-10">
          Powered by WebCraft BD Enterprise E-Commerce Platform • 2026
        </footer>
      </div>
    );
  }

  // ========================================================
  // VIEW 2: AUTHENTICATED ADMIN CONSOLE
  // ========================================================
  return (
    <div className="min-h-screen bg-[#0E0407] text-[#FFF8F5] font-sans selection:bg-[#8E2A3E] selection:text-[#FFF8F5] flex flex-col justify-between">
      <div>
        
        {/* Top Admin Sticky Navigation Bar */}
        <header className="sticky top-0 z-40 bg-[#16060B]/95 backdrop-blur-md border-b border-[#360F1A] px-4 sm:px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Left: Brand & Store Return */}
            <div className="flex items-center space-x-3">
              <Link
                to="/beauty"
                className="p-2 bg-[#260B12] hover:bg-[#38101B] text-[#C99A43] rounded-xl border border-[#C99A43]/40 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold"
                title="লাইভ বিউটি স্টোরে ফিরে যান"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">লাইভ বিউটি স্টোর</span>
              </Link>

              <div>
                <h1 className="text-base sm:text-lg font-black font-serif text-white flex items-center gap-2 leading-none">
                  <Leaf className="w-5 h-5 text-[#C99A43]" />
                  <span>{brandingForm.brandName || 'RiBANA Organic'} • অ্যাডমিন কনসোল</span>
                </h1>
                <p className="text-[10px] text-[#B89B9E] font-mono mt-0.5">
                  WEBCRAFT BD ORGANIC BEAUTY CONTROL SUITE
                </p>
              </div>
            </div>

            {/* Right: Quick Actions & Switcher & Logout */}
            <div className="flex items-center space-x-2.5">
              <Link
                to="/admin"
                className="hidden md:flex px-3 py-2 rounded-xl bg-gradient-to-r from-[#0f291e] to-[#1b4330] hover:brightness-110 text-[#a7f3d0] border border-[#c5a059]/40 items-center gap-1.5 text-xs font-mono font-bold transition-all shadow-sm cursor-pointer"
                title="শেলাই ফ্যাশন অ্যাডমিন কনসোলে সুইচ করুন"
              >
                <span>👗</span>
                <span>ফ্যাশন অ্যাডমিন</span>
              </Link>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C99A43] via-[#E6B85C] to-[#C99A43] hover:brightness-110 text-[#1F080D] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">+ নতুন প্রোডাক্ট</span>
              </button>

              <button
                type="button"
                onClick={logoutRibanaAdmin}
                className="p-2 rounded-xl bg-[#260B12] hover:bg-[#38101B] text-[#B89B9E] hover:text-white border border-[#3E131E] transition-colors cursor-pointer"
                title="লগআউট করুন"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Navigation Tabs Bar */}
          <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-[#2B0C15] flex items-center space-x-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'dashboard', label: '📊 ওভারভিউ ও অর্ডারস' },
              { id: 'products', label: '🌸 প্রোডাক্ট ও স্টক ক্যাটালগ' },
              { id: 'branding', label: '🎨 লোগো ও ব্যানার স্লাইডার' },
              { id: 'contact', label: '💳 পেমেন্ট ও শোরুম আউটলেট' },
              { id: 'security', label: '🔒 সিকিউরিটি ও পাসওয়ার্ড' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#8E2A3E] to-[#A6354C] text-white shadow-[0_4px_16px_rgba(142,42,62,0.4)] border border-[#C99A43]/50'
                    : 'text-[#C99A43] hover:bg-[#20070D] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* Global Save Toast Notification */}
        <AnimatePresence>
          {saveToast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-20 right-4 sm:right-8 z-50 bg-[#1D080D] text-[#FFF8F5] px-5 py-3 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] border border-[#C99A43]/60 flex items-center gap-3 backdrop-blur-xl"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <p className="text-xs font-mono font-bold text-white">{saveToast}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

          {/* ========================================================
              TAB 1: DASHBOARD OVERVIEW & ORDERS
              ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* 4 KPI Metrics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
                
                {/* 1. Total Beauty Revenue */}
                <div className="bg-[#1A080D] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-[#3E131E] shadow-xl flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-mono font-bold text-[#C99A43] uppercase tracking-wider truncate">
                      মোট বিউটি বিক্রয় রেভিনিউ
                    </p>
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black font-serif text-[#FFF8F5] mt-0.5 sm:mt-1 truncate">
                      ৳{totalBeautyRevenue.toLocaleString('en-US')}
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-emerald-400 font-mono mt-0.5 truncate flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 inline" />
                      <span>+১৮% গ্রোথ</span>
                    </p>
                  </div>
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#C99A43]/15 text-[#E6B85C] flex items-center justify-center shrink-0 ml-2 border border-[#C99A43]/30">
                    <DollarSign className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                </div>

                {/* 2. Pending Orders */}
                <div className="bg-[#1A080D] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-[#3E131E] shadow-xl flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider truncate">
                      অপেক্ষমাণ বিউটি অর্ডার
                    </p>
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black font-serif text-white mt-0.5 sm:mt-1">
                      {pendingBeautyOrders} টি
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-amber-300 font-mono mt-0.5 truncate flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                      <span>দ্রুত কনফার্ম করুন</span>
                    </p>
                  </div>
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 ml-2 border border-amber-500/30">
                    <Package className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                </div>

                {/* 3. Processing Orders */}
                <div className="bg-[#1A080D] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-[#3E131E] shadow-xl flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider truncate">
                      প্রসেসিং ও প্যাকিং
                    </p>
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black font-serif text-white mt-0.5 sm:mt-1">
                      {processingBeautyOrders} টি
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-sky-300 font-mono mt-0.5 truncate flex items-center gap-1">
                      <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                      <span>গ্রাহককে কল দিন</span>
                    </p>
                  </div>
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0 ml-2 border border-sky-500/30">
                    <Clock className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                </div>

                {/* 4. Completed / Delivered */}
                <div className="bg-[#1A080D] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-[#3E131E] shadow-xl flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider truncate">
                      সফল ডেলিভারি
                    </p>
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black font-serif text-white mt-0.5 sm:mt-1">
                      {completedBeautyOrders} টি
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-emerald-300 font-mono mt-0.5 truncate flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span>ক্যাশ আদায় সম্পন্ন</span>
                    </p>
                  </div>
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 ml-2 border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                </div>

              </div>

              {/* Beauty Orders Management Table */}
              <div className="bg-[#15060A] rounded-3xl p-6 border border-[#360F1A] shadow-2xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2D0C15] pb-4">
                  <div>
                    <h3 className="text-lg font-black font-serif text-[#FFF8F5] flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-[#C99A43]" />
                      <span>রিভানা বিউটি অর্ডার তালিকা ({beautyOrders.length}টি)</span>
                    </h3>
                    <p className="text-xs text-[#B89B9E]">
                      অর্ডারের স্ট্যাটাস সরাসরি পরিবর্তন করতে ডানপাশের ড্রপডাউন সিলেক্ট করুন
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-[#2A0D15] text-[#F4E2D4] px-3 py-1 rounded-full border border-[#8E2A3E]/50">
                      প্রসেসিং: {processingBeautyOrders}টি
                    </span>
                  </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#2D0C15] text-[#B89B9E] font-mono uppercase text-[10px]">
                        <th className="py-3 px-3">অর্ডার আইডি ও তারিখ</th>
                        <th className="py-3 px-3">গ্রাহক ও মোবাইল</th>
                        <th className="py-3 px-3">ডেলিভারি ঠিকানা ও এলাকা</th>
                        <th className="py-3 px-3">অর্ডারকৃত পণ্য</th>
                        <th className="py-3 px-3">মূল্য ও মেথড</th>
                        <th className="py-3 px-3">স্ট্যাটাস ড্রপডাউন</th>
                        <th className="py-3 px-3 text-right">ইনভয়েস</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#260B12]">
                      {beautyOrders.map((ord) => (
                        <tr key={ord.id || ord.orderId} className="hover:bg-white/[0.03] transition-colors">
                          <td className="py-3.5 px-3">
                            <span className="font-mono font-bold text-white block">
                              {ord.orderId || ord.id}
                            </span>
                            <span className="text-[10px] text-[#B89B9E] font-serif">
                              {ord.date || 'আজ'}
                            </span>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className="font-bold text-white block">{ord.customerName}</span>
                            <a href={`tel:${ord.phone}`} className="text-[11px] text-[#C99A43] font-mono hover:underline">
                              {ord.phone}
                            </a>
                          </td>

                          <td className="py-3.5 px-3 max-w-[200px]">
                            <span className="text-[#F4E2D4] line-clamp-1">{ord.address}</span>
                            <span className="text-[10px] font-mono text-[#B89B9E] block">{ord.area || ord.city}</span>
                          </td>

                          <td className="py-3.5 px-3">
                            <div className="flex items-center space-x-2">
                              {ord.items?.[0]?.image && (
                                <img
                                  src={ord.items[0].image}
                                  alt="item"
                                  className="w-9 h-10 object-cover object-center rounded-lg border border-white/10"
                                />
                              )}
                              <div>
                                <span className="text-white font-serif line-clamp-1 max-w-[160px] block">
                                  {ord.items?.[0]?.title || 'রিভানা জাফরান সিরাম'}
                                </span>
                                <span className="text-[10px] text-[#B89B9E] font-mono">
                                  মোট {ord.items?.length || 1}টি আইটেম
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className="font-serif font-black text-sm text-[#FDE047] block">
                              ৳{(ord.total || ord.subtotal || 0).toLocaleString('en-US')}
                            </span>
                            <span className="text-[10px] font-mono text-[#B89B9E]">
                              {ord.paymentMethod}
                            </span>
                          </td>

                          <td className="py-3.5 px-3">
                            <select
                              value={ord.status || 'Pending'}
                              onChange={(e) => {
                                updateOrderStatus(ord.id || ord.orderId, e.target.value);
                                triggerToast(`অর্ডার ${ord.id || ord.orderId} স্ট্যাটাস '${e.target.value}' করা হয়েছে!`);
                              }}
                              className={`text-[11px] font-mono font-bold px-3 py-1.5 rounded-xl border focus:outline-none transition-colors cursor-pointer ${
                                ord.status === 'Delivered'
                                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-600/40'
                                  : ord.status === 'Processing'
                                  ? 'bg-sky-950/80 text-sky-400 border-sky-600/40'
                                  : ord.status === 'Cancelled'
                                  ? 'bg-rose-950/80 text-rose-400 border-rose-600/40'
                                  : 'bg-amber-950/80 text-amber-400 border-amber-600/40'
                              }`}
                            >
                              <option value="Pending">অপেক্ষমাণ (Pending)</option>
                              <option value="Processing">প্রসেসিং (Processing)</option>
                              <option value="Delivered">ডেলিভার্ড (Delivered)</option>
                              <option value="Cancelled">বাতিল (Cancelled)</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => setViewingOrder(ord)}
                              className="p-1.5 px-2.5 rounded-lg bg-[#2A0D15] hover:bg-[#3E131E] text-[#C99A43] border border-[#C99A43]/40 text-xs font-mono transition-colors cursor-pointer"
                              title="ইনভয়েস বিস্তারিত দেখুন"
                            >
                              <Eye className="w-3.5 h-3.5 inline mr-1" />
                              <span>ভিউ</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================
              TAB 2: PRODUCTS, STOCK & CONCERNS
              ======================================================== */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              
              {/* Product Search & Category Filters */}
              <div className="bg-[#15060A] rounded-3xl p-5 border border-[#360F1A] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'all', label: 'সকল স্কিনকেয়ার' },
                    { id: 'soaps', label: 'আর্টিসান সোপ' },
                    { id: 'serums', label: 'সিরাম ও জেল' },
                    { id: 'face-packs', label: 'প্যাক ও স্ক্রাব' },
                    { id: 'oils', label: 'অর্গানিক অয়েল' },
                    { id: 'combos', label: 'গিফট কম্বো' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setProductCategoryFilter(c.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer ${
                        productCategoryFilter === c.id
                          ? 'bg-gradient-to-r from-[#8E2A3E] to-[#A6354C] text-white shadow-sm border border-[#C99A43]/60'
                          : 'bg-[#20070D] text-[#B89B9E] hover:text-white border border-[#360F1A]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative flex-1 sm:w-64">
                    <input
                      type="text"
                      placeholder="নাম বা উপাদান দিয়ে খুঁজুন..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full bg-[#100407] border border-[#360F1A] rounded-2xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#C99A43]"
                    />
                    <Search className="w-4 h-4 text-[#B89B9E] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#C99A43] via-[#E6B85C] to-[#C99A43] hover:brightness-110 text-[#1F080D] font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer shrink-0 shadow-lg active:scale-95"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>নতুন প্রোডাক্ট যোগ করুন</span>
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-[#16060B] rounded-3xl border border-[#360F1A] hover:border-[#8E2A3E] overflow-hidden shadow-xl flex flex-col justify-between group transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-black/40">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                        {prod.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-[#C99A43] text-[#1F080D] font-mono text-[9px] font-black uppercase">
                            {prod.badge}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-[#8E2A3E]/90 text-white font-mono text-[9px] font-bold">
                          {prod.size || 'Standard'}
                        </span>
                      </div>

                      {/* In-Stock Toggle Badge on Image */}
                      <button
                        type="button"
                        onClick={() => {
                          toggleRibanaProductStock(prod.id);
                          triggerToast(`'${prod.title}' স্টক স্ট্যাটাস পরিবর্তন হয়েছে!`);
                        }}
                        className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border shadow-md cursor-pointer transition-colors ${
                          prod.inStock
                            ? 'bg-emerald-950/90 text-emerald-400 border-emerald-500/50'
                            : 'bg-rose-950/90 text-rose-400 border-rose-500/50'
                        }`}
                        title="স্টক পরিবর্তন করতে ক্লিক করুন"
                      >
                        {prod.inStock ? '✓ ইন-স্টক' : '✕ স্টক আউট'}
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#C99A43] uppercase tracking-wider block">
                          {prod.titleEn || prod.category}
                        </span>
                        <h4 className="text-sm font-bold font-serif text-white line-clamp-2 leading-snug">
                          {prod.title}
                        </h4>
                        <p className="text-[11px] text-[#B89B9E] line-clamp-1">
                          {prod.keyIngredients || prod.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#260B12] flex items-center justify-between">
                        <div>
                          <span className="text-base font-black font-serif text-[#FDE047]">
                            ৳{prod.price?.toLocaleString('en-US')}
                          </span>
                          {prod.originalPrice && (
                            <span className="text-[11px] text-[#8E7277] line-through ml-1.5">
                              ৳{prod.originalPrice?.toLocaleString('en-US')}
                            </span>
                          )}
                        </div>

                        {/* Edit & Delete Action Buttons */}
                        <div className="flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(prod)}
                            className="p-1.5 rounded-lg bg-[#2A0D15] hover:bg-[#3E131E] text-[#C99A43] border border-[#C99A43]/40 transition-colors cursor-pointer"
                            title="এডিট করুন"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(prod.id, prod.title)}
                            className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/70 text-rose-300 border border-rose-800/50 transition-colors cursor-pointer"
                            title="ডিলিট করুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 3: BRANDING & HERO SLIDES
              ======================================================== */}
          {activeTab === 'branding' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Brand Profile Form */}
              <form onSubmit={handleSaveBranding} className="bg-[#15060A] rounded-3xl p-6 sm:p-7 border border-[#360F1A] shadow-2xl space-y-5">
                <div className="border-b border-[#2D0C15] pb-3">
                  <h3 className="text-lg font-black font-serif text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#C99A43]" />
                    <span>রিভানা ব্র্যান্ডিং ও আইডেন্টিটি</span>
                  </h3>
                  <p className="text-xs text-[#B89B9E]">
                    ওয়েবসাইটের হেডার, ফুটার ও ব্র্যান্ড মনোগ্রাম টেক্সট নিয়ন্ত্রণ করুন
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#F4E2D4]">ব্র্যান্ডের নাম (বাংলা)</label>
                    <input
                      type="text"
                      value={brandingForm.brandName}
                      onChange={(e) => setBrandingForm({ ...brandingForm, brandName: e.target.value })}
                      className="w-full bg-[#100407] border border-[#360F1A] rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C99A43]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#F4E2D4]">ব্র্যান্ডের নাম (English Monogram)</label>
                    <input
                      type="text"
                      value={brandingForm.brandNameEn}
                      onChange={(e) => setBrandingForm({ ...brandingForm, brandNameEn: e.target.value })}
                      className="w-full bg-[#100407] border border-[#360F1A] rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C99A43] font-mono uppercase"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#F4E2D4]">ট্যাগলাইন / স্লোগান</label>
                    <input
                      type="text"
                      value={brandingForm.tagline}
                      onChange={(e) => setBrandingForm({ ...brandingForm, tagline: e.target.value })}
                      className="w-full bg-[#100407] border border-[#360F1A] rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C99A43]"
                    />
                  </div>

                  {/* Certifications Switches */}
                  <div className="pt-2 grid grid-cols-2 gap-3">
                    <label className="p-3 rounded-2xl bg-[#20070D] border border-[#360F1A] flex items-center justify-between cursor-pointer">
                      <span className="text-xs font-serif font-bold text-[#F4E2D4]">BSTI সার্টিফায়েড</span>
                      <input
                        type="checkbox"
                        checked={brandingForm.bstiVerified}
                        onChange={(e) => setBrandingForm({ ...brandingForm, bstiVerified: e.target.checked })}
                        className="w-4 h-4 accent-[#8E2A3E]"
                      />
                    </label>

                    <label className="p-3 rounded-2xl bg-[#20070D] border border-[#360F1A] flex items-center justify-between cursor-pointer">
                      <span className="text-xs font-serif font-bold text-[#F4E2D4]">১০০% হালাল উপাদান</span>
                      <input
                        type="checkbox"
                        checked={brandingForm.halalCertified}
                        onChange={(e) => setBrandingForm({ ...brandingForm, halalCertified: e.target.checked })}
                        className="w-4 h-4 accent-[#8E2A3E]"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#8E2A3E] to-[#A6354C] hover:brightness-110 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer border border-[#C99A43]/50"
                  >
                    <Save className="w-4 h-4" />
                    <span>ব্র্যান্ডিং সংরক্ষণ করুন</span>
                  </button>
                </div>
              </form>

              {/* Hero Banner Slides Overview & Edit */}
              <form onSubmit={handleSaveHeroSlides} className="bg-[#15060A] rounded-3xl p-6 sm:p-7 border border-[#360F1A] shadow-2xl space-y-5">
                <div className="border-b border-[#2D0C15] pb-3">
                  <h3 className="text-lg font-black font-serif text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#C99A43]" />
                    <span>হিরো ব্যানার স্লাইডার কনফিগারেশন ({slidesForm.length}টি স্লাইড)</span>
                  </h3>
                  <p className="text-xs text-[#B89B9E]">
                    লাইভ হোমপেজের ব্যানার হেডিং, সাবটাইটেল ও ইমেজ পরিবর্তন করুন
                  </p>
                </div>

                <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin">
                  {slidesForm.map((slide, sIdx) => (
                    <div key={slide.id || sIdx} className="p-4 rounded-2xl bg-[#1F080E] border border-[#360F1A] space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-[#C99A43]">
                        <span>স্লাইড #{sIdx + 1} ({slide.tag || 'অর্গানিক ব্যানার'})</span>
                        <span className="text-[10px] font-mono text-[#8E7277]">{slide.id}</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-[#B89B9E]">ব্যানার হেডিং</label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => {
                            const updated = [...slidesForm];
                            updated[sIdx] = { ...updated[sIdx], title: e.target.value };
                            setSlidesForm(updated);
                          }}
                          className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C99A43]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-[#B89B9E]">ব্যানার সাবটাইটেল</label>
                        <textarea
                          rows={2}
                          value={slide.subtitle}
                          onChange={(e) => {
                            const updated = [...slidesForm];
                            updated[sIdx] = { ...updated[sIdx], subtitle: e.target.value };
                            setSlidesForm(updated);
                          }}
                          className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C99A43]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-[#B89B9E]">ইমেজ পাথ / URL</label>
                        <input
                          type="text"
                          value={slide.image}
                          onChange={(e) => {
                            const updated = [...slidesForm];
                            updated[sIdx] = { ...updated[sIdx], image: e.target.value };
                            setSlidesForm(updated);
                          }}
                          className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C99A43] font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#8E2A3E] to-[#A6354C] hover:brightness-110 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer border border-[#C99A43]/50"
                >
                  <Save className="w-4 h-4" />
                  <span>ব্যানার স্লাইডার সেভ করুন</span>
                </button>
              </form>

            </div>
          )}

          {/* ========================================================
              TAB 4: PAYMENT & OUTLETS
              ======================================================== */}
          {activeTab === 'contact' && (
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSaveContact} className="bg-[#15060A] rounded-3xl p-6 sm:p-8 border border-[#360F1A] shadow-2xl space-y-6">
                <div className="border-b border-[#2D0C15] pb-3">
                  <h3 className="text-lg font-black font-serif text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#C99A43]" />
                    <span>পেমেন্ট গেটওয়ে ও শোরুম আউটলেট সেটিংস</span>
                  </h3>
                  <p className="text-xs text-[#B89B9E]">
                    চেকআউট পেজে প্রদর্শিত বিকাশ ও নগদ নম্বর এবং হেল্পলাইন সাপোর্ট
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#F4E2D4] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#C99A43]" />
                      <span>অফিসিয়াল কাস্টমার সাপোর্ট ইমেইল</span>
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-[#100407] border border-[#360F1A] rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C99A43] font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#F4E2D4] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#C99A43]" />
                      <span>অফিসিয়াল হেল্পলাইন মোবাইল নম্বর</span>
                    </label>
                    <input
                      type="text"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-[#100407] border border-[#360F1A] rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C99A43] font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#F4E2D4] flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-pink-600 text-white text-[9px] font-black flex items-center justify-center">b</span>
                      <span>bKash মার্চেন্ট ওয়ালেট নম্বর</span>
                    </label>
                    <input
                      type="text"
                      value={contactForm.bkashNumber}
                      onChange={(e) => setContactForm({ ...contactForm, bkashNumber: e.target.value })}
                      className="w-full bg-[#100407] border border-[#360F1A] rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C99A43] font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#F4E2D4] flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-orange-600 text-white text-[9px] font-black flex items-center justify-center">N</span>
                      <span>Nagad মার্চেন্ট ওয়ালেট নম্বর</span>
                    </label>
                    <input
                      type="text"
                      value={contactForm.nagadNumber}
                      onChange={(e) => setContactForm({ ...contactForm, nagadNumber: e.target.value })}
                      className="w-full bg-[#100407] border border-[#360F1A] rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C99A43] font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#F4E2D4] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C99A43]" />
                      <span>ফ্ল্যাগশিপ শোরুম / আউটলেটের ঠিকানা</span>
                    </label>
                    <textarea
                      rows={2}
                      value={contactForm.address}
                      onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                      className="w-full bg-[#100407] border border-[#360F1A] rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C99A43]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#8E2A3E] to-[#A6354C] hover:brightness-110 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer border border-[#C99A43]/50"
                  >
                    <Save className="w-4 h-4" />
                    <span>পেমেন্ট ও শোরুম ইনফো সংরক্ষণ করুন</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================
              TAB 5: SECURITY & ACCESS
              ======================================================== */}
          {activeTab === 'security' && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Demo Credentials Reminder Card */}
              <div className="rounded-3xl bg-gradient-to-r from-[#200B10] to-[#17060A] p-5 border-2 border-[#C99A43]/60 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-[#C99A43]/30 pb-2">
                  <span className="text-xs font-mono font-bold text-[#E6B85C] uppercase tracking-wider flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-[#E6B85C]" />
                    <span>ডেমো সিকিউরিটি অ্যাক্সেস তথ্য</span>
                  </span>
                  <span className="text-[10px] font-mono bg-[#8E2A3E]/30 text-[#F4E2D4] px-2.5 py-0.5 rounded-full border border-[#C99A43]/40">
                    STATUS: ACTIVE
                  </span>
                </div>
                <div className="space-y-1 text-xs font-mono text-[#F4E2D4]">
                  <p>ইউজারনেম / ইমেইল: <strong className="text-white">admin@webcraftbd.com</strong></p>
                  <p>পাসওয়ার্ড: <strong className="text-white">ribana2026</strong></p>
                  <p className="text-[11px] text-[#B89B9E] font-serif pt-1">
                    * ক্লায়েন্ট প্রেজেন্টেশন চলাকালীন যে কেউ এই ক্রেডেনশিয়াল ব্যবহার করে অ্যাডমিন প্যানেলের টেস্ট ইন্টারফেসে প্রবেশ করতে পারবেন।
                  </p>
                </div>
              </div>

              {/* Password Change Form */}
              <form onSubmit={handlePasswordChangeSubmit} className="bg-[#15060A] rounded-3xl p-6 sm:p-8 border border-[#360F1A] shadow-2xl space-y-5">
                <div className="border-b border-[#2D0C15] pb-3">
                  <h3 className="text-lg font-black font-serif text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#C99A43]" />
                    <span>অ্যাডমিন পাসওয়ার্ড পরিবর্তন</span>
                  </h3>
                  <p className="text-xs text-[#B89B9E]">
                    আপনার সিকিউরিটি সুরক্ষার জন্য শক্তিশালী পাসওয়ার্ড সেট করুন
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#F4E2D4]">বর্তমান পাসওয়ার্ড</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={secCurrentPassword}
                      onChange={(e) => setSecCurrentPassword(e.target.value)}
                      className="w-full bg-[#100407] border border-[#360F1A] rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C99A43] font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#F4E2D4]">নতুন পাসওয়ার্ড</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={secNewPassword}
                      onChange={(e) => setSecNewPassword(e.target.value)}
                      className="w-full bg-[#100407] border border-[#360F1A] rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C99A43] font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#F4E2D4]">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={secConfirmPassword}
                      onChange={(e) => setSecConfirmPassword(e.target.value)}
                      className="w-full bg-[#100407] border border-[#360F1A] rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C99A43] font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#8E2A3E] to-[#A6354C] hover:brightness-110 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer border border-[#C99A43]/50"
                  >
                    <Lock className="w-4 h-4" />
                    <span>পাসওয়ার্ড আপডেট করুন</span>
                  </button>
                </div>
              </form>

            </div>
          )}

        </main>
      </div>

      {/* Footer Minimal */}
      <footer className="p-6 text-center text-xs text-[#8E7277] font-mono border-t border-[#260B12] bg-[#0A0205]">
        RiBANA Organic Beauty Master Admin • WebCraft BD 2026
      </footer>

      {/* ========================================================
          MODAL 1: ADD NEW BEAUTY PRODUCT
          ======================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#18070C] rounded-3xl border border-[#3E131E] shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-w-2xl w-full p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-[#2D0C15] pb-3">
              <h3 className="text-lg font-black font-serif text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#C99A43]" />
                <span>নতুন বিউটি প্রোডাক্ট আপলোড করুন</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-xl text-[#B89B9E] hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#F4E2D4]">পণ্যের নাম (বাংলা) *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: রিভানা জাফরান ব্রাইটনিং সিরাম"
                    value={newProd.title}
                    onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#F4E2D4]">English Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Saffron Brightening Serum"
                    value={newProd.titleEn}
                    onChange={(e) => setNewProd({ ...newProd, titleEn: e.target.value })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#F4E2D4]">ক্যাটাগরি</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43]"
                  >
                    <option value="serums">সিরাম ও ফেস জেল</option>
                    <option value="soaps">আর্টিসান সোপ বার</option>
                    <option value="face-packs">ফেস প্যাক ও স্ক্রাব</option>
                    <option value="oils">কোল্ড-প্রেসড অয়েল</option>
                    <option value="combos">লাক্সারি গিফট কম্বো</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#F4E2D4]">স্কিন কনসার্ন / বেনিফিট</label>
                  <select
                    value={newProd.concern}
                    onChange={(e) => setNewProd({ ...newProd, concern: e.target.value })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43]"
                  >
                    <option value="brightening">✨ গ্লাস-স্কিন ও ব্রাইটনিং</option>
                    <option value="acne">🌿 ব্রণ ও ডার্ক স্পট নির্মূল</option>
                    <option value="hairfall">💆‍♀️ চুল পড়া রোধ ও গ্রোথ</option>
                    <option value="hydration">💧 ডিপ হাইড্রেটিং ও ময়েশ্চার</option>
                    <option value="anti-aging">🌸 অ্যান্টি-এজিং ও টানটান ত্বক</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#F4E2D4]">সাইজ / ভলিউম</label>
                  <input
                    type="text"
                    placeholder="যেমন: 30 ml বা 110 gm"
                    value={newProd.size}
                    onChange={(e) => setNewProd({ ...newProd, size: e.target.value })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#F4E2D4]">বিক্রয় মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    placeholder="1250"
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43] font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#F4E2D4]">পূর্বের মূল্য (৳)</label>
                  <input
                    type="number"
                    placeholder="1450"
                    value={newProd.originalPrice}
                    onChange={(e) => setNewProd({ ...newProd, originalPrice: e.target.value })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43] font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#F4E2D4]">ব্যাজ / ট্যাগ</label>
                  <input
                    type="text"
                    placeholder="BESTSELLER"
                    value={newProd.badge}
                    onChange={(e) => setNewProd({ ...newProd, badge: e.target.value })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43] font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#F4E2D4]">মূল ভেষজ উপাদানসমূহ (Key Ingredients)</label>
                <input
                  type="text"
                  placeholder="যেমন: কাশ্মীরি জাফরান, আলফা আরবুটিন, নিয়াসিনামাইড ৫%, ছাগলের দুধ"
                  value={newProd.keyIngredients}
                  onChange={(e) => setNewProd({ ...newProd, keyIngredients: e.target.value })}
                  className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43]"
                />
              </div>

              {/* Image Upload with Client-side WebP Conversion */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-[#130408] border border-[#360F1A]">
                <label className="font-bold text-[#F4E2D4] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#C99A43]" />
                    <span>প্রোডাক্টের ছবি আপলোড (স্বয়ংক্রিয় WebP কনভার্সন)</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#C99A43]">WebP Client Optimizer</span>
                </label>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileChange(e, (url) => setNewProd({ ...newProd, image: url }))}
                    className="text-xs text-[#B89B9E] file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#8E2A3E] file:text-white hover:file:bg-[#A6354C] cursor-pointer"
                  />
                  {isOptimizing && (
                    <span className="text-xs text-amber-400 flex items-center gap-1">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>অপ্টিমাইজ হচ্ছে...</span>
                    </span>
                  )}
                </div>

                {uploadStats && (
                  <p className="text-[10px] font-mono text-emerald-400">
                    ✓ ছবি WebP ফরম্যাটে সফলভাবে কনভার্ট হয়েছে (আকার সাশ্রয়: {uploadStats.savingsPct})
                  </p>
                )}

                <div className="space-y-1 pt-1">
                  <label className="text-[10px] text-[#8E7277]">অথবা ছবির ইউআরএল / পাথ পেস্ট করুন:</label>
                  <input
                    type="text"
                    value={newProd.image}
                    onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#C99A43] font-mono"
                  />
                </div>
              </div>

              {/* In-Stock Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={newProd.inStock}
                  onChange={(e) => setNewProd({ ...newProd, inStock: e.target.checked })}
                  className="w-4 h-4 accent-[#8E2A3E]"
                />
                <span className="font-bold text-[#F4E2D4]">এই পণ্যটি বর্তমানে স্টকে আছে (ইন-স্টক)</span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2D0C15]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#260B12] text-[#B89B9E] hover:text-white"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8E2A3E] to-[#A6354C] text-white font-bold flex items-center gap-2 shadow-lg"
                >
                  <Check className="w-4 h-4" />
                  <span>পাবলিশ করুন</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: EDIT EXISTING BEAUTY PRODUCT
          ======================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#18070C] rounded-3xl border border-[#3E131E] shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-w-2xl w-full p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-[#2D0C15] pb-3">
              <h3 className="text-lg font-black font-serif text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#C99A43]" />
                <span>প্রোডাক্ট এডিট করুন: {editingProduct.title}</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-xl text-[#B89B9E] hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProductSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#F4E2D4]">পণ্যের নাম (বাংলা)</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#F4E2D4]">English Title</label>
                  <input
                    type="text"
                    value={editingProduct.titleEn || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, titleEn: e.target.value })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#F4E2D4]">বিক্রয় মূল্য (৳)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43] font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#F4E2D4]">পূর্বের মূল্য (৳)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: e.target.value ? Number(e.target.value) : null })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43] font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#F4E2D4]">সাইজ / ভলিউম</label>
                  <input
                    type="text"
                    value={editingProduct.size || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, size: e.target.value })}
                    className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#F4E2D4]">মূল ভেষজ উপাদানসমূহ</label>
                <input
                  type="text"
                  value={editingProduct.keyIngredients || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, keyIngredients: e.target.value })}
                  className="w-full bg-[#100407] border border-[#360F1A] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C99A43]"
                />
              </div>

              {/* Image Preview & Replacement */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-[#130408] border border-[#360F1A]">
                <label className="font-bold text-[#F4E2D4]">ছবি পরিবর্তন (WebP Upload)</label>
                <div className="flex items-center gap-4">
                  {editingProduct.image && (
                    <img
                      src={editingProduct.image}
                      alt="preview"
                      className="w-14 h-14 object-cover rounded-xl border border-white/20"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileChange(e, (url) => setEditingProduct({ ...editingProduct, image: url }))}
                    className="text-xs text-[#B89B9E] file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#8E2A3E] file:text-white hover:file:bg-[#A6354C] cursor-pointer"
                  />
                </div>
              </div>

              {/* In-Stock Toggle */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={editingProduct.inStock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  className="w-4 h-4 accent-[#8E2A3E]"
                />
                <span className="font-bold text-[#F4E2D4]">এই পণ্যটি বর্তমানে স্টকে আছে (ইন-স্টক)</span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2D0C15]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-[#260B12] text-[#B89B9E] hover:text-white"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8E2A3E] to-[#A6354C] text-white font-bold flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>পরিবর্তন সংরক্ষণ করুন</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: VIEW ORDER INVOICE DETAILS
          ======================================================== */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#18070C] rounded-3xl border border-[#3E131E] shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-w-xl w-full p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-[#2D0C15] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#C99A43] uppercase tracking-wider block">
                  INVOICE DETAILS
                </span>
                <h3 className="text-lg font-black font-serif text-white">
                  অর্ডার {viewingOrder.orderId || viewingOrder.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingOrder(null)}
                className="p-1 rounded-xl text-[#B89B9E] hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              
              {/* Customer Info Card */}
              <div className="p-4 rounded-2xl bg-[#130408] border border-[#2D0C15] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#B89B9E]">গ্রাহকের নাম:</span>
                  <span className="font-bold text-white text-sm">{viewingOrder.customerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#B89B9E]">মোবাইল নম্বর:</span>
                  <a href={`tel:${viewingOrder.phone}`} className="font-mono font-bold text-[#C99A43] hover:underline">
                    {viewingOrder.phone}
                  </a>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[#B89B9E] shrink-0">ঠিকানা:</span>
                  <span className="text-right text-[#F4E2D4]">{viewingOrder.address}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#B89B9E]">পেমেন্ট মেথড:</span>
                  <span className="font-mono text-[#F4E2D4]">{viewingOrder.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#B89B9E]">স্ট্যাটাস:</span>
                  <span className="font-bold text-[#E6B85C]">{viewingOrder.status}</span>
                </div>
              </div>

              {/* Ordered Items List */}
              <div className="space-y-2">
                <p className="text-[11px] font-mono font-bold text-[#C99A43] uppercase tracking-wider">
                  অর্ডারকৃত পণ্যসমূহ:
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {viewingOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#20070D] border border-[#360F1A]">
                      <div className="flex items-center gap-3 min-w-0">
                        {item.image && (
                          <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate max-w-[200px]">{item.title}</p>
                          <p className="text-[10px] text-[#B89B9E] font-mono">
                            পরিমাণ: {item.quantity} | একক মূল্য: ৳{item.price}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#FDE047] shrink-0">
                        ৳{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-US')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Calculation */}
              <div className="p-3 rounded-2xl bg-[#130408] border border-[#2D0C15] space-y-1.5 font-mono">
                <div className="flex justify-between text-[#B89B9E]">
                  <span>সাবটোটাল:</span>
                  <span>৳{(viewingOrder.subtotal || 0).toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between text-[#B89B9E]">
                  <span>ডেলিভারি চার্জ:</span>
                  <span>৳{(viewingOrder.deliveryCharge ?? 60).toLocaleString('en-US')}</span>
                </div>
                {viewingOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>কুপন ছাড়:</span>
                    <span>-৳{viewingOrder.discount.toLocaleString('en-US')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-white pt-1.5 border-t border-white/10">
                  <span className="font-serif">সর্বমোট আদায়যোগ্য:</span>
                  <span className="text-[#FDE047]">৳{(viewingOrder.total || 0).toLocaleString('en-US')}</span>
                </div>
              </div>

              {/* WhatsApp Contact Action */}
              <a
                href={`https://wa.me/88${(viewingOrder.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `আসসালামু আলাইকুম ${viewingOrder.customerName}! RiBANA Organic থেকে আপনার অর্ডার #${viewingOrder.orderId || viewingOrder.id} কনফার্ম করার জন্য যোগাযোগ করছি। সর্বমোট বিল: ৳${viewingOrder.total}।`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>গ্রাহককে হোয়াটসঅ্যাপে মেসেজ দিন</span>
              </a>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 4: DEMO SECURITY NOTICE
          ======================================================== */}
      {demoSecurityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#18070C] rounded-3xl border border-[#3E131E] shadow-2xl max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white font-serif">
              ক্লায়েন্ট ডেমো মোড সক্রিয়
            </h4>
            <p className="text-xs text-[#B89B9E] leading-relaxed">
              এটি একটি ক্লায়েন্ট প্রেজেন্টেশন ডেমো সিস্টেম। সিকিউরিটি সুরক্ষার কারণে মূল টেস্ট পাসওয়ার্ড অপরিবর্তিত রাখা হয়েছে যাতে অন্যান্য ক্লায়েন্টও পরীক্ষা করতে পারেন।
            </p>
            <button
              type="button"
              onClick={() => setDemoSecurityModal(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#8E2A3E] to-[#A6354C] text-white font-bold text-xs"
            >
              ঠিক আছে, বুঝেছি
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
