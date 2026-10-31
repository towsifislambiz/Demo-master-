import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  ShieldCheck, Package, ShoppingBag, Plus, Trash2, Edit3, 
  CheckCircle2, Clock, Phone, MapPin, DollarSign, 
  ArrowLeft, Search, Zap, Layers, Image as ImageIcon, X, 
  Eye, EyeOff, Lock, RefreshCw, Check, AlertCircle, Save, 
  TrendingUp, CreditCard, Mail, SlidersHorizontal, Sparkles,
  ExternalLink, LogOut, Key, Truck, Printer, Award, Flame, Leaf
} from 'lucide-react';
import { GHORER_BAZAR_BRAND, GHORER_BAZAR_CATEGORIES } from '../../data/ghorerBazarData';

export default function GhorerBazarAdminDashboardView() {
  const navigate = useNavigate();
  const { 
    organicProducts = [],
    addOrganicProduct,
    updateOrganicProduct,
    deleteOrganicProduct,
    toggleOrganicProductStock,
    orders = [],
    updateOrderStatus,
    isOrganicAdminAuthenticated,
    loginOrganicAdmin,
    logoutOrganicAdmin
  } = useStore();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'products' | 'orders' | 'settings'

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Search & Filters
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Modals & Toasts
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [saveToast, setSaveToast] = useState(null);

  // New Organic Product form state
  const [newProduct, setNewProduct] = useState({
    title: '',
    titleEn: '',
    category: 'honey',
    categoryBn: 'প্রাকৃতিক মধু',
    price: '',
    oldPrice: '',
    weight: '৫০০ গ্রাম',
    badge: 'হট ডিল',
    badgeType: 'hot',
    shortDesc: '',
    image: '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.webp',
    inStock: true,
    labTested: true
  });

  // Settings State
  const [deliverySettings, setDeliverySettings] = useState({
    insideDhaka: GHORER_BAZAR_BRAND.deliveryInsideDhaka,
    outsideDhaka: GHORER_BAZAR_BRAND.deliveryOutsideDhaka,
    freeThreshold: GHORER_BAZAR_BRAND.freeDeliveryThreshold,
    hotline: GHORER_BAZAR_BRAND.hotline,
    whatsapp: GHORER_BAZAR_BRAND.whatsapp,
    address: GHORER_BAZAR_BRAND.address
  });

  // Filtered orders for organic food
  const organicOrders = orders.filter(
    (ord) => ord.niche === 'organic' || ord.id?.startsWith('GB-') || ord.orderId?.startsWith('GB-')
  );

  const showToast = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginOrganicAdmin(loginEmail, loginPassword);
    if (!success) {
      setLoginError('ভুল ইমেইল বা পাসওয়ার্ড। ডেমো অ্যাক্সেসের জন্য নিচের বাটনে ক্লিক করুন।');
    } else {
      setLoginError('');
      showToast('অ্যাডমিন ড্যাশবোর্ডে স্বাগতম!');
    }
  };

  const handleDemoLogin = () => {
    loginOrganicAdmin('admin@ghorerbazar.com', 'ghorerbazar2026');
    showToast('ডেমো অ্যাডমিন হিসেবে সফলভাবে লগইন হয়েছে!');
  };

  // KPI Calculations
  const totalRevenue = organicOrders.reduce((sum, ord) => sum + (ord.total || 0), 0);
  const totalOrdersCount = organicOrders.length;
  const inStockCount = organicProducts.filter((p) => p.inStock !== false).length;
  const outOfStockCount = organicProducts.length - inStockCount;

  // Add Product Submit
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.title.trim() || !newProduct.price) {
      alert('পণ্যের নাম এবং মূল্য আবশ্যক!');
      return;
    }

    addOrganicProduct({
      ...newProduct,
      price: Number(newProduct.price),
      oldPrice: Number(newProduct.oldPrice) || Math.round(Number(newProduct.price) * 1.15),
      weights: [
        {
          label: newProduct.weight || '৫০০ গ্রাম',
          price: Number(newProduct.price),
          oldPrice: Number(newProduct.oldPrice) || Math.round(Number(newProduct.price) * 1.15),
          isDefault: true
        }
      ]
    });

    setShowAddModal(false);
    showToast(`"${newProduct.title}" সফলভাবে ক্যাটালগে যুক্ত হয়েছে!`);
    setNewProduct({
      title: '',
      titleEn: '',
      category: 'honey',
      categoryBn: 'প্রাকৃতিক মধু',
      price: '',
      oldPrice: '',
      weight: '৫০০ গ্রাম',
      badge: 'হট ডিল',
      badgeType: 'hot',
      shortDesc: '',
      image: '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.webp',
      inStock: true,
      labTested: true
    });
  };

  // Edit Product Submit
  const handleEditProductSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateOrganicProduct({
      ...editingProduct,
      price: Number(editingProduct.price),
      oldPrice: Number(editingProduct.oldPrice)
    });

    setEditingProduct(null);
    showToast(`"${editingProduct.title}" তথ্য সফলভাবে আপডেট হয়েছে!`);
  };

  // ----------------------------------------------------
  // LOGIN SCREEN (If not authenticated)
  // ----------------------------------------------------
  if (!isOrganicAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#022414] via-[#055C32] to-[#011a0e] text-white flex items-center justify-center p-4 font-sans selection:bg-amber-400 selection:text-stone-950">
        <div className="max-w-md w-full bg-white/95 text-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-500/30 backdrop-blur-xl animate-in zoom-in-95 duration-200">
          
          <div className="text-center space-y-2 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#055C32] text-white flex items-center justify-center font-black text-2xl mx-auto shadow-lg shadow-emerald-900/30">
              ঘ
            </div>
            <div>
              <h2 className="text-2xl font-black text-stone-900">ঘরের বাজার অ্যাডমিন পোর্টাল</h2>
              <p className="text-xs text-stone-500 mt-0.5">অর্গানিক ফুড ক্যাটালগ ও অর্ডার ম্যানেজমেন্ট সিস্টেম</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">অ্যাডমিন ইমেইল</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@ghorerbazar.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">অ্যাডমিন পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-[11px] text-rose-500 bg-rose-50 p-2 rounded-lg border border-rose-200 font-medium">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#055C32] hover:bg-[#077842] active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              লগইন করুন
            </button>

            <div className="relative py-1 text-center">
              <span className="text-[10px] text-stone-400 bg-white px-2 relative z-10 font-bold uppercase tracking-wider">অথবা ডেমো অ্যাক্সেস</span>
              <div className="absolute inset-0 top-1/2 border-t border-stone-200" />
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-98 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-stone-950" />
              <span>১-ক্লিকে ডেমো অ্যাডমিন প্রবেশ</span>
            </button>

            <div className="pt-2 text-center">
              <Link to="/organic" className="text-xs text-emerald-700 hover:underline font-semibold flex items-center justify-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ঘরের বাজার স্টোরফ্রন্টে ফিরে যান</span>
              </Link>
            </div>
          </form>

        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F4F8F4] text-stone-900 font-sans selection:bg-amber-300 selection:text-stone-950">
      
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#055C32] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-emerald-400 flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-amber-300" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Executive Header */}
      <header className="sticky top-0 z-40 bg-[#055C32] text-white shadow-md border-b border-emerald-700 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <Link to="/organic" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-base shadow-sm">
                ঘ
              </div>
              <div>
                <div className="text-base font-black text-white leading-tight flex items-center gap-2">
                  <span>ঘরের বাজার</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-700 text-amber-300 font-bold border border-emerald-500">
                    অ্যাডমিন প্রো
                  </span>
                </div>
                <div className="text-[10px] text-emerald-200">নিরাপদ খাদ্য ব্যবস্থাপনা সিস্টেম</div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/organic"
              target="_blank"
              className="px-3 py-1.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all border border-emerald-500/60"
              title="নতুন ট্যাবে স্টোরফ্রন্ট খুলুন"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">লাইভ স্টোর দেখুন</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                logoutOrganicAdmin();
                showToast('লগআউট সম্পন্ন হয়েছে');
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট</span>
            </button>
          </div>

        </div>
      </header>

      {/* Admin Tab Navigation Bar */}
      <div className="bg-white border-b border-emerald-100 shadow-xs px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none py-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#055C32] text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>ড্যাশবোর্ড ওভারভিউ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#055C32] text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>পণ্য ব্যবস্থাপনা ({organicProducts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#055C32] text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>অর্ডার ও ডেলিভারি ({organicOrders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#055C32] text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>স্টোর সেটিংস ও চার্জ</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        
        {/* ==================================================== */}
        {/* TAB 1: DASHBOARD OVERVIEW                            */}
        {/* ==================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* 4 Performance Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-stone-500 font-semibold">মোট সেলস / রাজস্ব</div>
                  <div className="text-2xl font-black text-[#055C32] mt-1">
                    ৳{totalRevenue.toLocaleString('bn-BD')}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+১৮.৫% এই সপ্তাহে</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#055C32] flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-stone-500 font-semibold">মোট অর্গানিক অর্ডার</div>
                  <div className="text-2xl font-black text-stone-900 mt-1">
                    {totalOrdersCount} টি
                  </div>
                  <div className="text-[10px] text-amber-600 font-bold mt-0.5">
                    ১০০% ক্যাশ অন ডেলিভারি
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-stone-500 font-semibold">ক্যাটালগ পণ্য সংখ্যা</div>
                  <div className="text-2xl font-black text-stone-900 mt-1">
                    {organicProducts.length} টি
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
                    {inStockCount} টি ইন-স্টক • {outOfStockCount} টি স্টক-আউট
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#055C32] flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-stone-500 font-semibold">ল্যাব টেস্ট সার্টিফাইড</div>
                  <div className="text-2xl font-black text-emerald-700 mt-1">
                    ১০০%
                  </div>
                  <div className="text-[10px] text-stone-500 font-medium mt-0.5">
                    বিএসটিআই অনুমোদিত
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Quick Actions & Recent Orders Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left 8 Cols: Recent Orders */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-stone-900">সাম্প্রতিক গ্রাহক অর্ডারসমূহ</h3>
                    <p className="text-xs text-stone-500">গ্রাহকদের সর্বশেষ দেওয়া অর্ডারের লাইভ তালিকা</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#055C32] font-bold hover:underline"
                  >
                    সকল অর্ডার দেখুন →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-500 pb-2">
                        <th className="py-2.5 font-bold">অর্ডার আইডি</th>
                        <th className="py-2.5 font-bold">গ্রাহকের নাম ও ফোন</th>
                        <th className="py-2.5 font-bold">মোট বিল</th>
                        <th className="py-2.5 font-bold">স্ট্যাটাস</th>
                        <th className="py-2.5 font-bold text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {organicOrders.slice(0, 5).map((ord) => (
                        <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                          <td className="py-3 font-mono font-bold text-emerald-800">
                            {ord.id || ord.orderId}
                          </td>
                          <td className="py-3">
                            <div className="font-bold text-stone-900">{ord.customerName}</div>
                            <div className="text-[11px] text-stone-500 font-mono">{ord.phone}</div>
                          </td>
                          <td className="py-3 font-black text-stone-900">
                            ৳{ord.total?.toLocaleString('bn-BD')}
                          </td>
                          <td className="py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'Processing'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-stone-100 text-stone-700'
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              type="button"
                              onClick={() => setViewingOrder(ord)}
                              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold cursor-pointer"
                            >
                              রিসিট
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right 4 Cols: Fast Product Shortlist & Quick Add */}
              <div className="lg:col-span-4 space-y-4">
                
                {/* Quick Add CTA Card */}
                <div className="bg-gradient-to-br from-[#055C32] to-[#03301a] text-white p-5 rounded-3xl shadow-md space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <h4 className="font-bold text-sm">নতুন অর্গানিক পণ্য যোগ করুন</h4>
                  </div>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    সুন্দরবনের খাঁটি মধু, ঘানির তেল বা নাটসের নতুন প্যাক সরাসরি স্টোরফ্রন্টে লাইভ করুন।
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(true)}
                    className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>পণ্য ফর্ম খুলুন</span>
                  </button>
                </div>

                {/* Popular Products Mini Preview */}
                <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-100 shadow-sm space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">
                    শীর্ষ বিক্রীত অর্গানিক খাদ্য
                  </h4>
                  <div className="space-y-2.5">
                    {organicProducts.slice(0, 3).map((p) => (
                      <div key={p.id} className="flex items-center gap-2.5 text-xs">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-10 h-10 rounded-xl object-cover border border-stone-200 shrink-0"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.webp';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-stone-900 truncate">{p.title}</div>
                          <div className="text-[11px] text-[#055C32] font-black">
                            ৳{p.weights?.[0]?.price || p.price}
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold shrink-0">
                          {p.rating || 4.9} ★
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: PRODUCT CATALOG MANAGEMENT                    */}
        {/* ==================================================== */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-emerald-100 shadow-sm space-y-5">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-stone-900">অর্গানিক ক্যাটালগ পণ্য তালিকা</h3>
                <p className="text-xs text-stone-500">পণ্য এডিট, স্টক টগল বা নতুন আইটেম যুক্ত করুন</p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#055C32] hover:bg-[#077842] active:scale-95 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>নতুন পণ্য যোগ করুন</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-2">
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="পণ্যের নাম দিয়ে খুঁজুন..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {GHORER_BAZAR_CATEGORIES.map((cat) => {
                  const isActive = categoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#055C32] text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {cat.nameBn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 pb-2">
                    <th className="py-2.5 font-bold">পণ্য</th>
                    <th className="py-2.5 font-bold">ক্যাটাগরি</th>
                    <th className="py-2.5 font-bold">ওজন ভ্যারিয়েন্ট</th>
                    <th className="py-2.5 font-bold">মূল্য</th>
                    <th className="py-2.5 font-bold">স্টক স্ট্যাটাস</th>
                    <th className="py-2.5 font-bold text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {organicProducts
                    .filter((p) => {
                      const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
                      const matchQ = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
                      return matchCat && matchQ;
                    })
                    .map((prod) => (
                      <tr key={prod.id} className="hover:bg-stone-50/80 transition-colors">
                        
                        {/* Title & Image */}
                        <td className="py-3 flex items-center gap-2.5">
                          <img
                            src={prod.image}
                            alt={prod.title}
                            className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.webp';
                            }}
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-stone-900 truncate max-w-xs">{prod.title}</div>
                            <div className="text-[11px] text-stone-400 font-mono truncate">{prod.id}</div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold">
                            {prod.categoryBn || prod.category}
                          </span>
                        </td>

                        {/* Weight Variants */}
                        <td className="py-3">
                          <div className="flex flex-wrap gap-1">
                            {prod.weights?.map((w) => (
                              <span key={w.label} className="text-[10px] px-1.5 py-0.2 rounded bg-stone-100 text-stone-700">
                                {w.label} (৳{w.price})
                              </span>
                            )) || <span className="text-[10px] text-stone-400">স্ট্যান্ডার্ড</span>}
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-3 font-black text-[#055C32]">
                          ৳{(prod.weights?.[0]?.price || prod.price)?.toLocaleString('bn-BD')}
                        </td>

                        {/* Stock Toggle */}
                        <td className="py-3">
                          <button
                            type="button"
                            onClick={() => {
                              toggleOrganicProductStock(prod.id);
                              showToast(`স্টক স্ট্যাটাস পরিবর্তিত হয়েছে!`);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                              prod.inStock !== false
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                            }`}
                          >
                            {prod.inStock !== false ? '✓ ইন স্টক' : '✕ স্টক আউট'}
                          </button>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3 text-right space-x-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(prod)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                            title="সম্পাদনা করুন"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`আপনি কি নিশ্চিত যে "${prod.title}" মুছে ফেলতে চান?`)) {
                                deleteOrganicProduct(prod.id);
                                showToast(`পণ্য মুছে ফেলা হয়েছে!`);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                            title="মুছে ফেলুন"
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

        {/* ==================================================== */}
        {/* TAB 3: ORDERS & DELIVERY TRACKING                    */}
        {/* ==================================================== */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-emerald-100 shadow-sm space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-stone-900">কাস্টমার অর্ডার ও ডেলিভারি লিস্ট</h3>
                <p className="text-xs text-stone-500">ক্যাশ অন ডেলিভারি অর্ডারসমূহের লাইভ স্ট্যাটাস আপডেট করুন</p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {['all', 'Pending', 'Processing', 'Delivered', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      orderStatusFilter === st
                        ? 'bg-[#055C32] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {st === 'all' ? 'সব অর্ডার' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 pb-2">
                    <th className="py-2.5 font-bold">অর্ডার কোড</th>
                    <th className="py-2.5 font-bold">গ্রাহকের নাম ও ফোন</th>
                    <th className="py-2.5 font-bold">ঠিকানা ও এরিয়া</th>
                    <th className="py-2.5 font-bold">পণ্য বিবরণী</th>
                    <th className="py-2.5 font-bold">মোট বিল</th>
                    <th className="py-2.5 font-bold">স্ট্যাটাস পরিবর্তন</th>
                    <th className="py-2.5 font-bold text-right">রিসিট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {organicOrders
                    .filter((ord) => orderStatusFilter === 'all' || ord.status === orderStatusFilter)
                    .map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                        
                        <td className="py-3 font-mono font-bold text-emerald-800">
                          {ord.id || ord.orderId}
                          <div className="text-[10px] text-stone-400 font-normal">{ord.date}</div>
                        </td>

                        <td className="py-3">
                          <div className="font-bold text-stone-900">{ord.customerName}</div>
                          <a href={`tel:${ord.phone}`} className="text-[11px] text-[#055C32] font-mono hover:underline">
                            {ord.phone}
                          </a>
                        </td>

                        <td className="py-3 max-w-xs">
                          <div className="text-[11px] text-stone-800 line-clamp-2">{ord.address}</div>
                          <span className="text-[10px] text-stone-500 font-medium">({ord.deliveryArea || 'ঢাকা'})</span>
                        </td>

                        <td className="py-3">
                          <div className="space-y-1">
                            {ord.items?.map((it, idx) => (
                              <div key={idx} className="text-[11px] text-stone-700">
                                • {it.title} ({it.weight || 'প্যাক'}) × {it.quantity || 1}
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="py-3 font-black text-stone-900">
                          ৳{ord.total?.toLocaleString('bn-BD')}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-3">
                          <select
                            value={ord.status || 'Processing'}
                            onChange={(e) => {
                              if (updateOrderStatus) {
                                updateOrderStatus(ord.id || ord.orderId, e.target.value);
                                showToast(`অর্ডার স্ট্যাটাস "${e.target.value}" করা হয়েছে!`);
                              }
                            }}
                            className={`py-1 px-2 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : ord.status === 'Processing'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : ord.status === 'Cancelled'
                                ? 'bg-rose-50 text-rose-700 border-rose-300'
                                : 'bg-stone-50 text-stone-800 border-stone-300'
                            }`}
                          >
                            <option value="Pending">Pending (অপেক্ষমাণ)</option>
                            <option value="Processing">Processing (প্রসেসিং)</option>
                            <option value="Delivered">Delivered (ডেলিভার্ড)</option>
                            <option value="Cancelled">Cancelled (বাতিল)</option>
                          </select>
                        </td>

                        {/* Print / View Modal */}
                        <td className="py-3 text-right">
                          <button
                            type="button"
                            onClick={() => setViewingOrder(ord)}
                            className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all cursor-pointer"
                          >
                            ইনভয়েস
                          </button>
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: STORE SETTINGS & DELIVERY CHARGES             */}
        {/* ==================================================== */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl bg-white rounded-3xl p-5 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
            
            <div>
              <h3 className="text-lg font-black text-stone-900">ডেলিভারি চার্জ ও কাস্টমার সার্ভিস সেটিংস</h3>
              <p className="text-xs text-stone-500">ডেলিভারি ফি, ফ্রি ডেলিভারি সীমা ও যোগাযোগ তথ্য নির্ধারণ করুন</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast('স্টোর সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ঢাকার ভিতরে ডেলিভারি চার্জ (টাকা)
                  </label>
                  <input
                    type="number"
                    value={deliverySettings.insideDhaka}
                    onChange={(e) => setDeliverySettings((p) => ({ ...p, insideDhaka: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ঢাকার বাইরে ডেলিভারি চার্জ (টাকা)
                  </label>
                  <input
                    type="number"
                    value={deliverySettings.outsideDhaka}
                    onChange={(e) => setDeliverySettings((p) => ({ ...p, outsideDhaka: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  ফ্রি ডেলিভারি অফারের সর্বনিম্ন অর্ডার ভ্যালু (টাকা)
                </label>
                <input
                  type="number"
                  value={deliverySettings.freeThreshold}
                  onChange={(e) => setDeliverySettings((p) => ({ ...p, freeThreshold: Number(e.target.value) }))}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    অর্ডার হেল্পলাইন হটলাইন
                  </label>
                  <input
                    type="text"
                    value={deliverySettings.hotline}
                    onChange={(e) => setDeliverySettings((p) => ({ ...p, hotline: e.target.value }))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    হোয়াটসঅ্যাপ সাপোর্ট নাম্বার
                  </label>
                  <input
                    type="text"
                    value={deliverySettings.whatsapp}
                    onChange={(e) => setDeliverySettings((p) => ({ ...p, whatsapp: e.target.value }))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  স্টোর ও অফিস ঠিকানা
                </label>
                <input
                  type="text"
                  value={deliverySettings.address}
                  onChange={(e) => setDeliverySettings((p) => ({ ...p, address: e.target.value }))}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#055C32] hover:bg-[#077842] active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-4 h-4 text-amber-300" />
                <span>সেটিংস সংরক্ষণ করুন</span>
              </button>
            </form>

          </div>
        )}

      </main>

      {/* ==================================================== */}
      {/* MODAL 1: ADD NEW PRODUCT MODAL                       */}
      {/* ==================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-emerald-100">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#055C32]" />
                <span>নতুন অর্গানিক পণ্য যুক্ত করুন</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">পণ্যের নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={newProduct.title}
                  onChange={(e) => setNewProduct((p) => ({ ...p, title: e.target.value }))}
                  placeholder="যেমন: সুন্দরবনের খাঁটি চাকের মধু"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ক্যাটাগরি নির্বাচন করুন</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => {
                    const catObj = GHORER_BAZAR_CATEGORIES.find((c) => c.id === e.target.value);
                    setNewProduct((p) => ({
                      ...p,
                      category: e.target.value,
                      categoryBn: catObj?.nameBn || 'অর্গানিক'
                    }));
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none bg-white cursor-pointer"
                >
                  {GHORER_BAZAR_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nameBn}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ওজন / প্যাক</label>
                  <input
                    type="text"
                    value={newProduct.weight}
                    onChange={(e) => setNewProduct((p) => ({ ...p, weight: e.target.value }))}
                    placeholder="৫০০ গ্রাম"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">বিক্রয় মূল্য *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct((p) => ({ ...p, price: e.target.value }))}
                    placeholder="৮৯০"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">পূর্বের মূল্য</label>
                  <input
                    type="number"
                    value={newProduct.oldPrice}
                    onChange={(e) => setNewProduct((p) => ({ ...p, oldPrice: e.target.value }))}
                    placeholder="৯৯০"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ইমেজ পাথ / URL</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct((p) => ({ ...p, image: e.target.value }))}
                  placeholder="/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.webp"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">সংক্ষিপ্ত বিবরণ</label>
                <textarea
                  rows={2}
                  value={newProduct.shortDesc}
                  onChange={(e) => setNewProduct((p) => ({ ...p, shortDesc: e.target.value }))}
                  placeholder="১০০% খাঁটি ও প্রাকৃতিক খাদ্য..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4 py-1 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-stone-800">
                  <input
                    type="checkbox"
                    checked={newProduct.inStock}
                    onChange={(e) => setNewProduct((p) => ({ ...p, inStock: e.target.checked }))}
                    className="accent-[#055C32]"
                  />
                  <span>ইন-স্টক সক্রিয়</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-stone-800">
                  <input
                    type="checkbox"
                    checked={newProduct.labTested}
                    onChange={(e) => setNewProduct((p) => ({ ...p, labTested: e.target.checked }))}
                    className="accent-[#055C32]"
                  />
                  <span>ল্যাব টেস্ট সার্টিফাইড</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#055C32] hover:bg-[#077842] text-white font-bold text-xs sm:text-sm shadow transition-all cursor-pointer mt-2"
              >
                পণ্য সংরক্ষণ করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 2: EDIT PRODUCT MODAL                          */}
      {/* ==================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-emerald-100">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#055C32]" />
                <span>পণ্য সম্পাদনা করুন</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditProductSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">পণ্যের নাম *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">বিক্রয় মূল্য *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct((p) => ({ ...p, price: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">পূর্বের মূল্য</label>
                  <input
                    type="number"
                    value={editingProduct.oldPrice || ''}
                    onChange={(e) => setEditingProduct((p) => ({ ...p, oldPrice: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ইমেজ URL</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct((p) => ({ ...p, image: e.target.value }))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center gap-4 py-1 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-stone-800">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock !== false}
                    onChange={(e) => setEditingProduct((p) => ({ ...p, inStock: e.target.checked }))}
                    className="accent-[#055C32]"
                  />
                  <span>ইন-স্টক সক্রিয়</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#055C32] hover:bg-[#077842] text-white font-bold text-xs sm:text-sm shadow transition-all cursor-pointer mt-2"
              >
                আপডেট সংরক্ষণ করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 3: VIEW ORDER INVOICE MODAL                    */}
      {/* ==================================================== */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-emerald-100 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#055C32] text-white flex items-center justify-center font-bold text-sm">
                  ঘ
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">ইনভয়েস: {viewingOrder.id || viewingOrder.orderId}</h4>
                  <p className="text-[10px] text-stone-500">{viewingOrder.date}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingOrder(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-500">গ্রাহকের নাম:</span>
                <span className="font-bold text-stone-900">{viewingOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">মোবাইল:</span>
                <span className="font-mono font-bold text-[#055C32]">{viewingOrder.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">ঠিকানা:</span>
                <span className="text-right text-stone-800 max-w-xs">{viewingOrder.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">পেমেন্ট মেথড:</span>
                <span className="font-bold text-stone-900">{viewingOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Ordered Items */}
            <div className="space-y-2">
              <h5 className="font-bold text-xs text-stone-800">অর্ডারের পণ্যসমূহ:</h5>
              <div className="divide-y divide-stone-100 border rounded-2xl p-2 bg-white">
                {viewingOrder.items?.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={it.image}
                        alt={it.title}
                        className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.webp';
                        }}
                      />
                      <div>
                        <div className="font-bold text-stone-900">{it.title}</div>
                        <div className="text-[10px] text-stone-500">{it.weight || 'প্যাক'} × {it.quantity || 1} টি</div>
                      </div>
                    </div>
                    <div className="font-bold text-stone-900">
                      ৳{((it.price || 0) * (it.quantity || 1)).toLocaleString('bn-BD')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Calculation */}
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs space-y-1">
              <div className="flex justify-between text-stone-600">
                <span>সাবটোটাল:</span>
                <span>৳{(viewingOrder.subtotal || viewingOrder.total)?.toLocaleString('bn-BD')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>ডেলিভারি চার্জ:</span>
                <span>৳{(viewingOrder.deliveryCharge || 0)?.toLocaleString('bn-BD')}</span>
              </div>
              <div className="flex justify-between font-black text-sm text-stone-900 pt-1 border-t border-emerald-200">
                <span>সর্বমোট প্রদেয় বিল:</span>
                <span className="text-[#055C32]">৳{viewingOrder.total?.toLocaleString('bn-BD')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>ইনভয়েস প্রিন্ট</span>
              </button>

              <button
                type="button"
                onClick={() => setViewingOrder(null)}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
