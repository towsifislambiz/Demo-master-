import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Package, ShoppingBag, Plus, Trash2, Edit3, 
  Upload, CheckCircle2, Clock, Phone, MapPin, DollarSign, 
  ArrowLeft, Search, Zap, Layers, Image as ImageIcon, X, 
  Eye, EyeOff, Lock, RefreshCw, Check, AlertCircle, Save, 
  TrendingUp, CreditCard, Mail, SlidersHorizontal, Sparkles,
  ExternalLink, LogOut, Key, Info, HelpCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { optimizeImage } from '../utils/imageOptimizer';

export default function AdminDashboardView() {
  const navigate = useNavigate();
  const { 
    shelaiProducts = [],
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStock,
    orders = [],
    updateOrderStatus,
    brandingSettings = {},
    updateBranding,
    heroSlides = [],
    updateHeroSlides,
    contactSettings = {},
    updateContactSettings,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin
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
  const [demoSecurityModal, setDemoSecurityModal] = useState(false);
  const [saveToast, setSaveToast] = useState(null);

  // New product form state
  const [newProd, setNewProd] = useState({
    title: '',
    titleEn: '',
    designer: 'MARIA B • LUXURY PRET',
    category: 'clothing',
    subCategory: 'suits',
    price: '',
    originalPrice: '',
    discount: '১৫% ছাড়',
    badge: 'NEW ARRIVAL',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    stitchingOptions: ['Stitched (Ready to Wear)', 'Unstitched Fabric'],
    image: '/fashion-images/Model_posing_in_chiffon_suit_20261026161901.webp',
    fabricDesc: '১০০% পিওর ক্রিনকেল শিফন উইথ ভারী থ্রেড ও পার্ল এমব্রয়ডারি।'
  });
  const [uploadStats, setUploadStats] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Branding settings form state
  const [brandingForm, setBrandingForm] = useState({
    brandName: brandingSettings.brandName || 'Shelai Couture',
    brandNameEn: brandingSettings.brandNameEn || 'SHELAI COUTURE',
    tagline: brandingSettings.tagline || 'হাউট ক্যুচুর ফ্যাশন বুটিক',
    logoUrl: brandingSettings.logoUrl || null
  });

  // Hero slides form state (4 slides)
  const [slidesForm, setSlidesForm] = useState(heroSlides);

  // Contact & Payment gateway form state
  const [contactForm, setContactForm] = useState({
    email: contactSettings.email || 'care@shelaicouture.com',
    phone: contactSettings.phone || '+880 1629-559653',
    bkashNumber: contactSettings.bkashNumber || '01712-345678 (মার্চেন্ট)',
    nagadNumber: contactSettings.nagadNumber || '01812-345678 (মার্চেন্ট)',
    address: contactSettings.address || 'বাড়ি ৪২, রোড ১১, ব্লক ডি, বনানী, ঢাকা-১২১৩'
  });

  // Security password change form
  const [secCurrentPassword, setSecCurrentPassword] = useState('');
  const [secNewPassword, setSecNewPassword] = useState('');
  const [secConfirmPassword, setSecConfirmPassword] = useState('');

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (
      (loginEmail.trim().toLowerCase() === 'admin@webcraftbd.com' || loginEmail.trim() === 'admin') &&
      loginPassword === 'shelai2026'
    ) {
      loginAdmin();
      setLoginError('');
    } else {
      setLoginError('ভুল ইমেইল বা পাসওয়ার্ড। অনুগ্রহ করে নিচের টেস্ট ক্রেডেনশিয়াল ব্যবহার করুন।');
    }
  };

  const handleQuickDemoLogin = () => {
    setLoginEmail('admin@webcraftbd.com');
    setLoginPassword('shelai2026');
    loginAdmin();
    setLoginError('');
  };

  // Image upload with WebP conversion
  const handleImageFileChange = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsOptimizing(true);
    try {
      const optimized = await optimizeImage(file, { maxWidth: 1200, maxHeight: 1200, quality: 0.85 });
      callback(optimized.dataUrl);
      setUploadStats(optimized);
      triggerToast(`ছবি সফলভাবে WebP ফরম্যাটে অপ্টিমাইজ হয়েছে (${optimized.savingsPct} সাশ্রয়)!`);
    } catch (err) {
      alert('ছবি প্রসেস করতে সমস্যা হয়েছে: ' + err.message);
    } finally {
      setIsOptimizing(false);
    }
  };

  // Trigger brief success toast
  const triggerToast = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Add Product Handler
  const handleCreateProductSubmit = (e) => {
    e.preventDefault();
    if (!newProd.title || !newProd.price) {
      alert('দয়া করে পণ্যের নাম ও মূল্য প্রদান করুন।');
      return;
    }

    const created = {
      id: 'sh-custom-' + Date.now(),
      category: 'clothing',
      subCategory: newProd.subCategory,
      designer: newProd.designer || 'SHELAI EXCLUSIVE',
      title: newProd.title,
      titleEn: newProd.titleEn || newProd.title,
      price: Number(newProd.price),
      originalPrice: newProd.originalPrice ? Number(newProd.originalPrice) : null,
      discount: newProd.discount || null,
      badge: newProd.badge || 'NEW ARRIVAL',
      inStock: newProd.inStock,
      rating: 5.0,
      reviews: 1,
      image: newProd.image,
      sizes: newProd.sizes,
      stitchingOptions: newProd.stitchingOptions,
      fabric: {
        shirt: newProd.fabricDesc || 'প্রিমিয়াম ডিজাইনার ফেব্রিক',
        dupatta: 'এক্সক্লুসিভ ওড়না',
        trouser: 'ম্যাচিং ট্রাউজার'
      }
    };

    addProduct(created);
    setShowAddModal(false);
    setNewProd({
      title: '',
      titleEn: '',
      designer: 'MARIA B • LUXURY PRET',
      category: 'clothing',
      subCategory: 'suits',
      price: '',
      originalPrice: '',
      discount: '১৫% ছাড়',
      badge: 'NEW ARRIVAL',
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL'],
      stitchingOptions: ['Stitched (Ready to Wear)', 'Unstitched Fabric'],
      image: '/fashion-images/Model_posing_in_chiffon_suit_20261026161901.webp',
      fabricDesc: '১০০% পিওর ক্রিনকেল শিফন উইথ ভারী থ্রেড ও পার্ল এমব্রয়ডারি।'
    });
    setUploadStats(null);
    triggerToast('নতুন প্রোডাক্ট সফলভাবে আপলোড ও পাবলিশ হয়েছে!');
  };

  // Edit Product Handler
  const handleUpdateProductSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct);
    setEditingProduct(null);
    triggerToast('প্রোডাক্ট সফলভাবে আপডেট করা হয়েছে!');
  };

  // Save Branding Handler
  const handleSaveBranding = (e) => {
    e.preventDefault();
    updateBranding(brandingForm);
    triggerToast('ব্র্যান্ডিং ও লোগো সফলভাবে সংরক্ষিত হয়েছে!');
  };

  // Save Hero Slides Handler
  const handleSaveHeroSlides = (e) => {
    e.preventDefault();
    updateHeroSlides(slidesForm);
    triggerToast('৪টি ব্যানার স্লাইডার সফলভাবে আপডেট হয়েছে!');
  };

  // Save Contact & Payment Settings Handler
  const handleSaveContact = (e) => {
    e.preventDefault();
    updateContactSettings(contactForm);
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

  // Metrics Calculations
  const totalSalesRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + (o.total || 0) : sum), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const processingOrdersCount = orders.filter((o) => o.status === 'Processing').length;
  const completedOrdersCount = orders.filter((o) => o.status === 'Delivered').length;

  // Filtered Products List
  const filteredProducts = shelaiProducts.filter((p) => {
    const matchesCat = productCategoryFilter === 'all' || p.subCategory === productCategoryFilter;
    const matchesSearch = p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.designer?.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // ========================================================
  // VIEW 1: ADMIN LOGIN SCREEN (With Displayed Demo Credentials)
  // ========================================================
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#06140e] text-slate-100 font-sans flex flex-col justify-between selection:bg-[#c5a059] selection:text-[#0f291e] relative overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c5a059]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0f291e]/80 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Minimal Bar */}
        <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between z-10">
          <button
            type="button"
            onClick={() => navigate('/store')}
            className="flex items-center gap-2 text-xs font-mono font-bold text-[#c5a059] hover:text-[#fef9c3] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ফ্যাশন স্টোরে ফিরে যান</span>
          </button>
          <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            WEBCRAFT BD • CLIENT MASTER DEMO
          </span>
        </header>

        {/* Center Login Stage */}
        <main className="max-w-md w-full mx-auto px-4 py-8 z-10 space-y-6">
          
          {/* Header Monogram */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#0f291e] to-[#1e4a37] border-2 border-[#c5a059] flex items-center justify-center mx-auto shadow-2xl">
              <ShieldCheck className="w-8 h-8 text-[#fde047]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-wide">
              {brandingSettings.brandName || 'Shelai Couture'}
            </h1>
            <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">
              MASTER ADMIN CONSOLE • 10K-15K DEMO
            </p>
          </div>

          {/* Test Credentials Display Card (Requested Feature #7) */}
          <div className="rounded-3xl bg-gradient-to-r from-[#172c20] to-[#122319] p-5 border-2 border-[#c5a059]/60 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#c5a059]/30 pb-2">
              <span className="text-[11px] font-mono font-bold text-[#fde047] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#fde047]" />
                <span>টেস্ট অ্যাডমিন লগইন তথ্য (Demo Credentials)</span>
              </span>
              <span className="text-[9px] font-mono bg-[#c5a059]/20 text-[#fef9c3] px-2 py-0.5 rounded-full border border-[#c5a059]/40">
                CLIENT TEST
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">ইউজার / ইমেইল:</span>
                <span className="font-bold text-white bg-black/40 px-2 py-0.5 rounded border border-white/10">
                  admin@webcraftbd.com
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">পাসওয়ার্ড:</span>
                <span className="font-bold text-white bg-black/40 px-2 py-0.5 rounded border border-white/10">
                  shelai2026
                </span>
              </div>
            </div>

            {/* 1-Click Instant Login Button */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 rounded-2xl bg-[#c5a059] hover:bg-[#d4af37] text-[#0f291e] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#0f291e] fill-current" />
              <span>১-ক্লিকে টেস্ট লগইন করুন (Instant Access)</span>
            </button>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleLoginSubmit} className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-2xl space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>অ্যাডমিন ইমেইল / ইউজারনেম</span>
              </label>
              <input
                type="text"
                required
                placeholder="admin@webcraftbd.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c5a059] transition-all font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>পাসওয়ার্ড</span>
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c5a059] transition-all font-mono pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-rose-400 bg-rose-950/60 p-2.5 rounded-xl border border-rose-800/60">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#0f291e] hover:bg-[#16382b] text-[#fef9c3] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-[#c5a059]/40 shadow-xl active:scale-95 transition-all cursor-pointer"
            >
              <span>লগইন করুন</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </form>

        </main>

        <footer className="p-6 text-center text-xs text-slate-500 font-mono z-10">
          Powered by WebCraft BD Enterprise E-Commerce Platform • 2026
        </footer>
      </div>
    );
  }

  // ========================================================
  // VIEW 2: AUTHENTICATED ADMIN CONSOLE
  // ========================================================
  return (
    <div className="min-h-screen bg-[#070e0a] text-slate-100 font-sans selection:bg-[#c5a059] selection:text-[#0f291e] flex flex-col justify-between">
      <div>
        
        {/* Top Admin Sticky Navigation Bar */}
        <header className="sticky top-0 z-40 bg-[#0a1811]/95 backdrop-blur-md border-b border-[#1b3d2b] px-4 sm:px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Left: Brand & Store Return */}
            <div className="flex items-center space-x-3">
              <Link
                to="/store"
                className="p-2 bg-[#122e20] hover:bg-[#1b4330] text-[#c5a059] rounded-xl border border-[#c5a059]/40 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold"
                title="লাইভ ফ্যাশন স্টোর দেখুন"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">লাইভ স্টোর</span>
              </Link>

              <div>
                <h1 className="text-base sm:text-lg font-black font-serif text-white flex items-center gap-2 leading-none">
                  <ShieldCheck className="w-5 h-5 text-[#c5a059]" />
                  <span>{brandingSettings.brandName || 'Shelai Couture'} • অ্যাডমিন কনসোল</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  WEBCRAFT BD HAUTE COUTURE CONTROL SUITE
                </p>
              </div>
            </div>

            {/* Right: Quick Actions & Logout */}
            <div className="flex items-center space-x-2.5">
              <Link
                to="/beauty/admin"
                className="hidden md:flex px-3 py-2 rounded-xl bg-gradient-to-r from-[#8E2A3E]/40 to-[#63383D]/50 hover:from-[#8E2A3E]/60 hover:to-[#63383D]/70 text-[#F4E2D4] border border-[#C99A43]/40 items-center gap-1.5 text-xs font-mono font-bold transition-all shadow-sm cursor-pointer"
                title="রিভানা অর্গানিক বিউটি অ্যাডমিন কনসোলে সুইচ করুন"
              >
                <span>🌿</span>
                <span>রিভানা অ্যাডমিন</span>
              </Link>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-[#0f291e] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">+ নতুন প্রোডাক্ট</span>
              </button>

              <button
                type="button"
                onClick={logoutAdmin}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title="লগআউট করুন"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Navigation Tabs Bar */}
          <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-[#163324] flex items-center space-x-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'dashboard', label: '📊 ওভারভিউ ড্যাশবোর্ড' },
              { id: 'products', label: '👗 প্রোডাক্ট ও স্টক ম্যানেজমেন্ট' },
              { id: 'branding', label: '🎨 লোগো ও ব্যানার স্লাইডার' },
              { id: 'contact', label: '💳 পেমেন্ট ও শোরুম সেটিংস' },
              { id: 'security', label: '🔒 সিকিউরিটি ও পাসওয়ার্ড' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#c5a059] text-[#0f291e] shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-6 z-50 bg-[#0f291e] text-[#fef9c3] px-5 py-3 rounded-2xl shadow-2xl border-2 border-[#c5a059] flex items-center gap-3"
            >
              <Check className="w-4 h-4 text-[#22c55e] stroke-[3]" />
              <span className="text-xs font-bold">{saveToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* ========================================================
              TAB 1: OVERVIEW DASHBOARD (Sales, Income, Orders)
              ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* 4 Analytics Metrics Row (2-col grid on mobile, 4-col on desktop) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                
                {/* 1. Monthly Revenue */}
                <div className="bg-[#0f241a] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-[#1e4a35] shadow-lg flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-mono font-bold text-[#c5a059] uppercase tracking-wider truncate">
                      চলতি মাসের আয়
                    </p>
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black font-serif text-white mt-0.5 sm:mt-1 truncate">
                      ৳{totalSalesRevenue.toLocaleString('en-US')}
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-[#86efac] font-mono mt-0.5 flex items-center gap-1 truncate">
                      <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                      <span>+১৮% বৃদ্ধি</span>
                    </p>
                  </div>
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#c5a059]/15 text-[#c5a059] flex items-center justify-center shrink-0 ml-2">
                    <DollarSign className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                </div>

                {/* 2. Total Orders */}
                <div className="bg-[#0f241a] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-[#1e4a35] shadow-lg flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider truncate">
                      সর্বমোট অর্ডার
                    </p>
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black font-serif text-white mt-0.5 sm:mt-1">
                      {orders.length} টি
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                      ভেরিফাইড কাস্টমার
                    </p>
                  </div>
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 ml-2">
                    <ShoppingBag className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                </div>

                {/* 3. Pending Orders */}
                <div className="bg-[#0f241a] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-[#1e4a35] shadow-lg flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider truncate">
                      অপেক্ষমাণ
                    </p>
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black font-serif text-white mt-0.5 sm:mt-1">
                      {pendingOrdersCount} টি
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-amber-400 font-mono mt-0.5 flex items-center gap-1 truncate">
                      <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                      <span>কল দিন</span>
                    </p>
                  </div>
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 ml-2">
                    <Clock className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                </div>

                {/* 4. Completed / Delivered */}
                <div className="bg-[#0f241a] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-[#1e4a35] shadow-lg flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider truncate">
                      সফল ডেলিভারি
                    </p>
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black font-serif text-white mt-0.5 sm:mt-1">
                      {completedOrdersCount} টি
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-emerald-400 font-mono mt-0.5 truncate">
                      ক্যাশ আদায় সম্পন্ন
                    </p>
                  </div>
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 ml-2">
                    <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                </div>

              </div>

              {/* Recent Orders Management Table */}
              <div className="bg-[#0c1f15] rounded-3xl p-6 border border-[#1e4a35] shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1b3e2b] pb-4">
                  <div>
                    <h3 className="text-lg font-black font-serif text-white">
                      সাম্প্রতিক অর্ডার তালিকা ({orders.length}টি)
                    </h3>
                    <p className="text-xs text-slate-400">
                      অর্ডারের স্ট্যাটাস সরাসরি পরিবর্তন করতে ডানপাশের ড্রপডাউন সিলেক্ট করুন
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-[#163827] text-[#a7f3d0] px-3 py-1 rounded-full border border-[#23583e]">
                      প্রসেসিং: {processingOrdersCount}টি
                    </span>
                  </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#1b3e2b] text-slate-400 font-mono uppercase text-[10px]">
                        <th className="py-3 px-3">অর্ডার আইডি ও তারিখ</th>
                        <th className="py-3 px-3">গ্রাহক ও মোবাইল</th>
                        <th className="py-3 px-3">ঠিকানা ও এলাকা</th>
                        <th className="py-3 px-3">অর্ডারকৃত পণ্য</th>
                        <th className="py-3 px-3">মূল্য ও মেথড</th>
                        <th className="py-3 px-3 text-right">স্ট্যাটাস পরিবর্তন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#163827]">
                      {orders.map((ord) => (
                        <tr key={ord.id || ord.orderId} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-3">
                            <span className="font-mono font-bold text-white block">
                              {ord.orderId || ord.id}
                            </span>
                            <span className="text-[10px] text-slate-400 font-serif">
                              {ord.date || 'আজ'}
                            </span>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className="font-bold text-white block">{ord.customerName}</span>
                            <a href={`tel:${ord.phone}`} className="text-[11px] text-[#c5a059] font-mono hover:underline">
                              {ord.phone}
                            </a>
                          </td>

                          <td className="py-3.5 px-3 max-w-[200px]">
                            <span className="text-slate-300 line-clamp-1">{ord.address}</span>
                            <span className="text-[10px] font-mono text-slate-400 block">{ord.area || ord.city}</span>
                          </td>

                          <td className="py-3.5 px-3">
                            <div className="flex items-center space-x-2">
                              {ord.items?.[0]?.image && (
                                <img
                                  src={ord.items[0].image}
                                  alt="item"
                                  className="w-8 h-10 object-cover object-top rounded border border-white/10"
                                />
                              )}
                              <div>
                                <span className="text-white font-serif line-clamp-1 max-w-[150px] block">
                                  {ord.items?.[0]?.title || 'লাক্সারি ফ্যাশন ড্রেস'}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  মোট {ord.items?.length || 1}টি আইটেম
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className="font-serif font-black text-sm text-[#fef9c3] block">
                              ৳{(ord.total || ord.subtotal || 0).toLocaleString('en-US')}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {ord.paymentMethod}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-right">
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================
              TAB 2: PRODUCTS, STOCK & DISCOUNT CONTROL
              ======================================================== */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              
              {/* Product Search & Filter Bar */}
              <div className="bg-[#0c1f15] rounded-3xl p-5 border border-[#1e4a35] shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'all', label: 'সকল কালেকশন' },
                    { id: 'suits', label: '৩-পিস স্যুট' },
                    { id: 'sarees', label: 'ঢাকাই শাড়ি' },
                    { id: 'kurtis', label: 'রেডি কুর্তি' },
                    { id: 'abayas', label: 'দুবাই আবায়া' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setProductCategoryFilter(c.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer ${
                        productCategoryFilter === c.id
                          ? 'bg-[#c5a059] text-[#0f291e] shadow-sm'
                          : 'bg-[#122e20] text-slate-300 hover:text-white'
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
                      placeholder="নাম বা ডিজাইনার দিয়ে খুঁজুন..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-2xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2.5 rounded-2xl bg-[#c5a059] hover:bg-[#d4af37] text-[#0f291e] font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>নতুন ড্রেস আপলোড</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-[#0c1f15] rounded-3xl p-6 border border-[#1e4a35] shadow-xl overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#1b3e2b] text-slate-400 font-mono uppercase text-[10px]">
                      <th className="py-3 px-3">ছবি</th>
                      <th className="py-3 px-3">নাম ও ডিজাইনার</th>
                      <th className="py-3 px-3">ক্যাটাগরি</th>
                      <th className="py-3 px-3">মূল্য ও ছাড়</th>
                      <th className="py-3 px-3">স্টক স্ট্যাটাস</th>
                      <th className="py-3 px-3 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#163827]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-12 h-16 object-cover object-top rounded-xl border border-white/10"
                          />
                        </td>

                        <td className="py-3 px-3 max-w-[260px]">
                          <span className="text-[10px] font-mono text-[#c5a059] uppercase font-bold block">
                            {p.designer}
                          </span>
                          <span className="font-serif font-bold text-white block line-clamp-1">
                            {p.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono line-clamp-1">
                            {p.titleEn}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <span className="px-2.5 py-1 rounded-full bg-[#163827] text-[#a7f3d0] font-mono text-[10px]">
                            {p.subCategory === 'suits' ? '৩-পিস স্যুট' :
                             p.subCategory === 'sarees' ? 'ঢাকাই শাড়ি' :
                             p.subCategory === 'kurtis' ? 'কুর্তি' : 'আবায়া'}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <span className="font-serif font-black text-sm text-[#fef9c3] block">
                            ৳{p.price.toLocaleString('en-US')}
                          </span>
                          {p.originalPrice && (
                            <span className="text-[10px] text-slate-400 line-through font-mono">
                              ৳{p.originalPrice.toLocaleString('en-US')}
                            </span>
                          )}
                          {p.discount && (
                            <span className="text-[9px] bg-rose-950/80 text-rose-300 px-1.5 py-0.5 rounded ml-1 font-mono">
                              {p.discount}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-3">
                          <button
                            type="button"
                            onClick={() => {
                              toggleProductStock(p.id);
                              triggerToast(`স্টক স্ট্যাটাস আপডেট করা হয়েছে!`);
                            }}
                            className={`px-3 py-1 rounded-full text-[10.5px] font-mono font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                              p.inStock
                                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40 hover:bg-emerald-900'
                                : 'bg-rose-950/80 text-rose-400 border-rose-500/40 hover:bg-rose-900'
                            }`}
                            title="ক্লিক করে স্টক অন/অফ করুন"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                            <span>{p.inStock ? 'ইন স্টক (In Stock)' : 'স্টক আউট (Out of Stock)'}</span>
                          </button>
                        </td>

                        <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                          {/* Edit Button */}
                          <button
                            type="button"
                            onClick={() => setEditingProduct({ ...p })}
                            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#c5a059] border border-slate-700 transition-colors cursor-pointer"
                            title="এডিট করুন"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* View Button */}
                          <button
                            type="button"
                            onClick={() => window.open(`/store/product/${p.id}`, '_blank')}
                            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 border border-slate-700 transition-colors cursor-pointer"
                            title="লাইভ প্রিভিউ দেখুন"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`আপনি কি "${p.title}" ডিলিট করতে নিশ্চিত?`)) {
                                deleteProduct(p.id);
                                triggerToast('প্রোডাক্ট সফলভাবে ডিলিট করা হয়েছে!');
                              }
                            }}
                            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-900/60 text-rose-400 border border-slate-700 transition-colors cursor-pointer"
                            title="ডিলিট করুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 3: BRANDING & 4 HERO BANNER SLIDES
              ======================================================== */}
          {activeTab === 'branding' && (
            <div className="space-y-8">
              
              {/* Brand Logo & Name Settings */}
              <form onSubmit={handleSaveBranding} className="bg-[#0c1f15] rounded-3xl p-6 sm:p-7 border border-[#1e4a35] shadow-xl space-y-5">
                <div className="border-b border-[#1b3e2b] pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black font-serif text-white">
                      ওয়েবসাইট লোগো ও ব্র্যান্ড পরিচয় (Store Branding)
                    </h3>
                    <p className="text-xs text-slate-400">
                      ওয়েবসাইটের মূল লোগো এবং ব্র্যান্ডের নাম পরিবর্তন করুন
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-2xl bg-[#c5a059] hover:bg-[#d4af37] text-[#0f291e] font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>সংরক্ষণ করুন</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">ব্র্যান্ডের নাম (বাংলা / ইংলিশ)</label>
                    <input
                      type="text"
                      value={brandingForm.brandName}
                      onChange={(e) => setBrandingForm({ ...brandingForm, brandName: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">ট্যাগলাইন / সাব-টাইটেল</label>
                    <input
                      type="text"
                      value={brandingForm.tagline}
                      onChange={(e) => setBrandingForm({ ...brandingForm, tagline: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  {/* Logo Image Upload with WebP */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#c5a059]" />
                      <span>কাস্টম লোগো ছবি আপলোড (WebP অপ্টিমাইজড)</span>
                    </label>
                    <div className="flex items-center gap-4">
                      {brandingForm.logoUrl && (
                        <img
                          src={brandingForm.logoUrl}
                          alt="Logo Preview"
                          className="h-12 w-auto object-contain bg-white/5 p-2 rounded-xl border border-white/20"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange(e, (url) => setBrandingForm((b) => ({ ...b, logoUrl: url })))}
                        className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#1e4a35] file:text-[#a7f3d0] hover:file:bg-[#286348] cursor-pointer"
                      />
                      {brandingForm.logoUrl && (
                        <button
                          type="button"
                          onClick={() => setBrandingForm({ ...brandingForm, logoUrl: null })}
                          className="text-xs text-rose-400 hover:underline"
                        >
                          লোগো সরান (ডিফল্ট টেক্সট লোগো ব্যবহার)
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>

              {/* 4 Hero Banner Slides Management */}
              <form onSubmit={handleSaveHeroSlides} className="bg-[#0c1f15] rounded-3xl p-6 sm:p-7 border border-[#1e4a35] shadow-xl space-y-6">
                <div className="border-b border-[#1b3e2b] pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black font-serif text-white">
                      ওয়েবসাইট ব্যানার স্লাইডার (৪টি স্লাইড)
                    </h3>
                    <p className="text-xs text-slate-400">
                      হোমপেজের মূল ৪টি ব্যানার ইমেজ ও টেক্সট পরিবর্তন করুন
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-2xl bg-[#c5a059] hover:bg-[#d4af37] text-[#0f291e] font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>সবগুলো স্লাইড সংরক্ষণ করুন</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {slidesForm.map((slide, idx) => (
                    <div key={idx} className="bg-[#07130d] rounded-2xl p-4 border border-[#1e4a35] space-y-3">
                      <div className="flex items-center justify-between border-b border-[#163827] pb-2">
                        <span className="font-mono text-xs font-bold text-[#c5a059]">
                          ব্যানার স্লাইড #{idx + 1}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">16:9 / 1376x768</span>
                      </div>

                      {/* Image Preview & Upload */}
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/40 border border-white/10">
                        <img
                          src={slide.image}
                          alt={`Slide ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center p-3">
                          <label className="px-3 py-1.5 rounded-xl bg-[#c5a059] text-[#0f291e] text-xs font-bold cursor-pointer shadow-lg">
                            নতুন ছবি আপলোড
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageFileChange(e, (url) => {
                                const updated = [...slidesForm];
                                updated[idx].image = url;
                                setSlidesForm(updated);
                              })}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Slide Text Inputs */}
                      <div className="space-y-2 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-400">ব্যাজ / ট্যাগলাইন:</label>
                          <input
                            type="text"
                            value={slide.badge || ''}
                            onChange={(e) => {
                              const updated = [...slidesForm];
                              updated[idx].badge = e.target.value;
                              setSlidesForm(updated);
                            }}
                            className="w-full bg-[#0a1811] border border-[#1e4a35] rounded-xl p-2 text-white text-xs mt-0.5"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400">মূল শিরোনাম (Title):</label>
                          <input
                            type="text"
                            value={slide.title || ''}
                            onChange={(e) => {
                              const updated = [...slidesForm];
                              updated[idx].title = e.target.value;
                              setSlidesForm(updated);
                            }}
                            className="w-full bg-[#0a1811] border border-[#1e4a35] rounded-xl p-2 text-white text-xs mt-0.5 font-serif font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400">সাব-টাইটেল (Description):</label>
                          <input
                            type="text"
                            value={slide.subtitle || ''}
                            onChange={(e) => {
                              const updated = [...slidesForm];
                              updated[idx].subtitle = e.target.value;
                              setSlidesForm(updated);
                            }}
                            className="w-full bg-[#0a1811] border border-[#1e4a35] rounded-xl p-2 text-white text-xs mt-0.5"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </form>

            </div>
          )}

          {/* ========================================================
              TAB 4: CONTACT & PAYMENT GATEWAY NUMBERS
              ======================================================== */}
          {activeTab === 'contact' && (
            <div className="max-w-3xl mx-auto space-y-6">
              
              <form onSubmit={handleSaveContact} className="bg-[#0c1f15] rounded-3xl p-6 sm:p-8 border border-[#1e4a35] shadow-xl space-y-5">
                <div className="border-b border-[#1b3e2b] pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black font-serif text-white">
                      পেমেন্ট ও শোরুম কন্টাক্ট সেটিংস
                    </h3>
                    <p className="text-xs text-slate-400">
                      বিকাশ, নগদ নম্বর ও শোরুম যোগাযোগের তথ্য আপডেট করুন
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-2xl bg-[#c5a059] hover:bg-[#d4af37] text-[#0f291e] font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>সংরক্ষণ করুন</span>
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  
                  {/* Helpline Phone */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#c5a059]" />
                      <span>শোরুম হেল্পলাইন মোবাইল নম্বর (ফোন ও হোয়াটসঅ্যাপ)</span>
                    </label>
                    <input
                      type="text"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-2xl p-3 text-white font-mono"
                    />
                    <p className="text-[10px] text-slate-400">হেডার ও প্রোডাক্টের হোয়াটসঅ্যাপ লিংকে স্বয়ংক্রিয়ভাবে কার্যকর হবে</p>
                  </div>

                  {/* Showroom Email */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#c5a059]" />
                      <span>অফিসিয়াল ইমেইল অ্যাড্রেস</span>
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-2xl p-3 text-white font-mono"
                    />
                  </div>

                  {/* bKash Payment Number */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#e2136e]" />
                      <span>বিকাশ মার্চেন্ট / পার্সোনাল নম্বর (bKash Number)</span>
                    </label>
                    <input
                      type="text"
                      value={contactForm.bkashNumber}
                      onChange={(e) => setContactForm({ ...contactForm, bkashNumber: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-2xl p-3 text-white font-mono"
                    />
                    <p className="text-[10px] text-slate-400">চেকআউট পেজে বিকাশ সিলেক্ট করলে কাস্টমার এই নম্বরটি দেখতে পাবেন</p>
                  </div>

                  {/* Nagad Payment Number */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#ea580c]" />
                      <span>নগদ মার্চেন্ট / পার্সোনাল নম্বর (Nagad Number)</span>
                    </label>
                    <input
                      type="text"
                      value={contactForm.nagadNumber}
                      onChange={(e) => setContactForm({ ...contactForm, nagadNumber: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-2xl p-3 text-white font-mono"
                    />
                  </div>

                  {/* Showroom Physical Address */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#c5a059]" />
                      <span>ফ্ল্যাগশিপ শোরুম পূর্ণ ঠিকানা</span>
                    </label>
                    <textarea
                      rows={2}
                      value={contactForm.address}
                      onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-2xl p-3 text-white font-serif"
                    />
                  </div>

                </div>
              </form>

            </div>
          )}

          {/* ========================================================
              TAB 5: SECURITY & PASSWORD CHANGE (Demo-Safe)
              ======================================================== */}
          {activeTab === 'security' && (
            <div className="max-w-xl mx-auto space-y-6">
              
              <div className="bg-[#0c1f15] rounded-3xl p-6 sm:p-8 border border-[#1e4a35] shadow-xl space-y-5">
                <div className="border-b border-[#1b3e2b] pb-3">
                  <h3 className="text-lg font-black font-serif text-white flex items-center gap-2">
                    <Key className="w-5 h-5 text-[#c5a059]" />
                    <span>অ্যাডমিন পাসওয়ার্ড পরিবর্তন সেটিংস</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    নিরাপত্তা নিশ্চিত করতে অ্যাডমিন ক্রেডেনশিয়াল আপডেট করুন
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-600/30 text-amber-300 text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                  <span className="leading-snug">
                    <strong>ডেমো নোটিশ:</strong> এটি একটি পাবলিক ক্লায়েন্ট টেস্ট ডেমো। নিরাপত্তা রক্ষার্থে এবং পরবর্তী টেস্ট নির্বিঘ্ন রাখতে এই পেইজের টেস্ট পাসওয়ার্ড লক করে রাখা হয়েছে।
                  </span>
                </div>

                <form onSubmit={handlePasswordChangeSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">বর্তমান পাসওয়ার্ড (Current Password)</label>
                    <input
                      type="password"
                      required
                      placeholder="বর্তমান পাসওয়ার্ড দিন"
                      value={secCurrentPassword}
                      onChange={(e) => setSecCurrentPassword(e.target.value)}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-2xl p-3 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">নতুন পাসওয়ার্ড (New Password)</label>
                    <input
                      type="password"
                      required
                      placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                      value={secNewPassword}
                      onChange={(e) => setSecNewPassword(e.target.value)}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-2xl p-3 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">নতুন পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)</label>
                    <input
                      type="password"
                      required
                      placeholder="পুনরায় নতুন পাসওয়ার্ড দিন"
                      value={secConfirmPassword}
                      onChange={(e) => setSecConfirmPassword(e.target.value)}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-2xl p-3 text-white font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#c5a059] hover:bg-[#d4af37] text-[#0f291e] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>পাসওয়ার্ড আপডেট করুন</span>
                  </button>
                </form>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* ========================================================
          MODAL 1: ADD NEW PRODUCT MODAL (With WebP Conversion)
          ======================================================== */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 p-4 sm:p-6 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full bg-[#0c1f15] rounded-3xl p-6 sm:p-8 border border-[#1e4a35] shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#1b3e2b] pb-3">
                <h3 className="font-serif font-black text-lg text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#c5a059]" />
                  <span>নতুন ডিজাইনার প্রোডাক্ট আপলোড করুন</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProductSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Title (Bangla) */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold text-slate-300">পণ্যের নাম (বাংলা) *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মারিয়া বি. প্রিমিয়াম লাইলাক শিফন ৩-পিস"
                      value={newProd.title}
                      onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white"
                    />
                  </div>

                  {/* Title (English) */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">English Title</label>
                    <input
                      type="text"
                      placeholder="Maria B. Luxury Lilac Chiffon Suit"
                      value={newProd.titleEn}
                      onChange={(e) => setNewProd({ ...newProd, titleEn: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white"
                    />
                  </div>

                  {/* Designer Name */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">ডিজাইনার / ব্র্যান্ড</label>
                    <input
                      type="text"
                      placeholder="MARIA B • LUXURY PRET"
                      value={newProd.designer}
                      onChange={(e) => setNewProd({ ...newProd, designer: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white font-mono"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">ক্যাটাগরি</label>
                    <select
                      value={newProd.subCategory}
                      onChange={(e) => setNewProd({ ...newProd, subCategory: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white font-serif"
                    >
                      <option value="suits">লাক্সারি ৩-পিস স্যুট (Festive Suits)</option>
                      <option value="sarees">ঐতিহ্যবাহী ঢাকাই শাড়ি (Sarees)</option>
                      <option value="kurtis">রেডি কুর্তি সেট (Kurtis)</option>
                      <option value="abayas">দুবাই সিল্ক ও আবায়া (Abayas)</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">বিক্রয় মূল্য (৳) *</label>
                    <input
                      type="number"
                      required
                      placeholder="12800"
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white font-mono"
                    />
                  </div>

                  {/* Original Price */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">আগের মূল্য / স্ট্রাইক প্রাইস (৳)</label>
                    <input
                      type="number"
                      placeholder="14500"
                      value={newProd.originalPrice}
                      onChange={(e) => setNewProd({ ...newProd, originalPrice: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white font-mono"
                    />
                  </div>

                  {/* Discount Badge */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">ডিসকাউন্ট ব্যাজ (যেমন: ১৫% ছাড়)</label>
                    <input
                      type="text"
                      placeholder="১৫% ছাড়"
                      value={newProd.discount}
                      onChange={(e) => setNewProd({ ...newProd, discount: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white"
                    />
                  </div>

                  {/* Image Upload with WebP */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold text-slate-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Upload className="w-4 h-4 text-[#c5a059]" />
                        <span>প্রোডাক্টের ছবি আপলোড (WebP অটো কনভার্টার)</span>
                      </span>
                      {uploadStats && (
                        <span className="text-[10px] text-emerald-400 font-mono">
                          ✓ {uploadStats.originalSizeKB}KB ➔ {uploadStats.optimizedSizeKB}KB ({uploadStats.savingsPct} সেভ)
                        </span>
                      )}
                    </label>

                    <div className="flex items-center gap-4">
                      {newProd.image && (
                        <img
                          src={newProd.image}
                          alt="preview"
                          className="w-16 h-20 object-cover object-top rounded-xl border border-white/20 shrink-0"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange(e, (url) => setNewProd((p) => ({ ...p, image: url })))}
                        className="text-xs text-slate-400 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#1e4a35] file:text-[#a7f3d0] hover:file:bg-[#286348] cursor-pointer w-full"
                      />
                    </div>
                  </div>

                  {/* Fabric Description */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold text-slate-300">ফেব্রিক ও কারিগরি বিবরণ</label>
                    <textarea
                      rows={2}
                      placeholder="১০০% পিওর ক্রিনকেল শিফন উইথ ভারী থ্রেড ও পার্ল এমব্রয়ডারি..."
                      value={newProd.fabricDesc}
                      onChange={(e) => setNewProd({ ...newProd, fabricDesc: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white"
                    />
                  </div>

                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#1b3e2b]">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-[#0f291e] font-black cursor-pointer shadow-md"
                  >
                    পাবলিশ করুন
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================
          MODAL 2: EDIT EXISTING PRODUCT MODAL
          ======================================================== */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-50 p-4 sm:p-6 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingProduct(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full bg-[#0c1f15] rounded-3xl p-6 sm:p-8 border border-[#1e4a35] shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#1b3e2b] pb-3">
                <h3 className="font-serif font-black text-lg text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#c5a059]" />
                  <span>প্রোডাক্ট সম্পাদনা করুন (Edit Product)</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateProductSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Title (Bangla) */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold text-slate-300">পণ্যের নাম (বাংলা) *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.title}
                      onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white"
                    />
                  </div>

                  {/* Designer Name */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">ডিজাইনার / ব্র্যান্ড</label>
                    <input
                      type="text"
                      value={editingProduct.designer}
                      onChange={(e) => setEditingProduct({ ...editingProduct, designer: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white font-mono"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">ক্যাটাগরি</label>
                    <select
                      value={editingProduct.subCategory}
                      onChange={(e) => setEditingProduct({ ...editingProduct, subCategory: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white font-serif"
                    >
                      <option value="suits">লাক্সারি ৩-পিস স্যুট (Suits)</option>
                      <option value="sarees">ঐতিহ্যবাহী ঢাকাই শাড়ি (Sarees)</option>
                      <option value="kurtis">রেডি কুর্তি সেট (Kurtis)</option>
                      <option value="abayas">দুবাই সিল্ক ও আবায়া (Abayas)</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">বিক্রয় মূল্য (৳) *</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white font-mono"
                    />
                  </div>

                  {/* Original Price */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">আগের মূল্য / স্ট্রাইক প্রাইস (৳)</label>
                    <input
                      type="number"
                      value={editingProduct.originalPrice || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: e.target.value ? Number(e.target.value) : null })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white font-mono"
                    />
                  </div>

                  {/* Discount Badge */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">ডিসকাউন্ট ব্যাজ</label>
                    <input
                      type="text"
                      value={editingProduct.discount || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, discount: e.target.value })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white"
                    />
                  </div>

                  {/* In Stock Toggle */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">স্টক অবস্থা</label>
                    <select
                      value={editingProduct.inStock ? 'yes' : 'no'}
                      onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.value === 'yes' })}
                      className="w-full bg-[#07130d] border border-[#1e4a35] rounded-xl p-3 text-white font-mono"
                    >
                      <option value="yes">ইন স্টক (In Stock)</option>
                      <option value="no">স্টক আউট (Out of Stock)</option>
                    </select>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold text-slate-300">ছবি পরিবর্তন (WebP অপ্টিমাইজড)</label>
                    <div className="flex items-center gap-4">
                      <img
                        src={editingProduct.image}
                        alt="current"
                        className="w-16 h-20 object-cover object-top rounded-xl border border-white/20 shrink-0"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange(e, (url) => setEditingProduct((p) => ({ ...p, image: url })))}
                        className="text-xs text-slate-400 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#1e4a35] file:text-[#a7f3d0] hover:file:bg-[#286348] cursor-pointer w-full"
                      />
                    </div>
                  </div>

                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#1b3e2b]">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-[#0f291e] font-black cursor-pointer shadow-md"
                  >
                    আপডেট করুন
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================
          MODAL 3: DEMO PASSWORD SECURITY PROTECTION MODAL
          ======================================================== */}
      <AnimatePresence>
        {demoSecurityModal && (
          <div className="fixed inset-0 z-50 p-4 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDemoSecurityModal(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-md w-full bg-[#0c1f15] rounded-3xl p-6 sm:p-7 border-2 border-[#c5a059] shadow-2xl z-10 space-y-4 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#1e4a35] border border-[#c5a059] text-[#fde047] mx-auto flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest font-bold">
                  DEMO SECURITY LOCK ACTIVE
                </span>
                <h3 className="font-serif font-black text-xl text-white">
                  ডেমো পাসওয়ার্ড সুরক্ষিত রাখা হয়েছে
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  এটি একটি পাবলিক ডেমো প্ল্যাটফর্ম। সম্ভাব্য অন্যান্য ক্লায়েন্টদের নিরবচ্ছিন্ন টেস্টিং সুবিধার জন্য মাস্টার পাসওয়ার্ড পরিবর্তন সাময়িকভাবে লক করে রাখা হয়েছে। আপনার ক্রয়কৃত মূল প্রোজেক্টে এটি সরাসরি কার্যকরী থাকবে।
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDemoSecurityModal(false)}
                className="w-full py-3 rounded-2xl bg-[#c5a059] hover:bg-[#d4af37] text-[#0f291e] font-bold text-xs uppercase cursor-pointer transition-all shadow-md"
              >
                বুঝেছি, ধন্যবাদ
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Minimal Footer */}
      <footer className="border-t border-[#1b3d2b] px-6 py-4 text-center text-xs text-slate-500 font-mono">
        Shelai Couture Master Admin Console • Built for WebCraft BD Enterprise Client Demonstrations
      </footer>

    </div>
  );
}
