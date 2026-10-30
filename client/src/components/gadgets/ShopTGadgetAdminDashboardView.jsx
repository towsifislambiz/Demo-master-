import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  ShieldCheck, Package, ShoppingBag, Plus, Trash2, Edit3, 
  CheckCircle2, Clock, Phone, MapPin, DollarSign, 
  ArrowLeft, Search, Zap, Layers, Image as ImageIcon, X, 
  Eye, EyeOff, Lock, RefreshCw, Check, AlertCircle, Save, 
  TrendingUp, CreditCard, Mail, SlidersHorizontal, Sparkles,
  ExternalLink, LogOut, Key, Truck, Printer
} from 'lucide-react';
import { GADGET_CATEGORIES } from '../../data/shoptGadgetData';

export default function ShopTGadgetAdminDashboardView() {
  const navigate = useNavigate();
  const { 
    gadgetProducts = [],
    addGadgetProduct,
    updateGadgetProduct,
    deleteGadgetProduct,
    toggleGadgetProductStock,
    orders = [],
    updateOrderStatus,
    isGadgetAdminAuthenticated,
    loginGadgetAdmin,
    logoutGadgetAdmin
  } = useStore();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'products' | 'orders' | 'settings'

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Filter & Search
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [saveToast, setSaveToast] = useState(null);

  // New gadget form
  const [newGadget, setNewGadget] = useState({
    title: '',
    titleEn: '',
    brand: 'ShopT Cyber',
    category: 'earbuds',
    categoryBn: 'TWS ইয়ারবাডস',
    price: '',
    oldPrice: '',
    badge: 'হট ডিল',
    badgeType: 'hot',
    description: '',
    inStock: true
  });

  // Filtered orders for gadgets
  const gadgetOrders = orders.filter(ord => ord.niche === 'gadgets' || ord.id?.startsWith('ST-') || ord.id?.startsWith('SHOPT-'));

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginGadgetAdmin(loginEmail, loginPassword);
    if (!success) {
      setLoginError('ভুল ইমেইল বা পাসওয়ার্ড। (ডেমো অ্যাক্সেসের জন্য নিচের বাটনে ক্লিক করুন)');
    } else {
      setLoginError('');
    }
  };

  const handleDemoLogin = () => {
    loginGadgetAdmin('admin@shopt.com.bd', 'shopt2026');
  };

  const showToast = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 2500);
  };

  // 1. Render Login Screen if not authenticated
  if (!isGadgetAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030712] font-sans flex items-center justify-center p-4 text-white relative overflow-hidden">
        {/* Spatial background glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full bg-[#0B1428] rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center mx-auto text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.4)]">
              <Sparkles className="w-7 h-7 fill-slate-950" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ShopT Spatial Tech অ্যাডমিন পোর্টাল
            </h1>
            <p className="text-xs text-slate-400">
              গ্যাজেট ইনভেন্টরি, লাইভ অর্ডার ও ক্যাটালগ ম্যানেজমেন্ট সিস্টেম
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold block">অ্যাডমিন ইমেইল</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@shopt.com.bd"
                className="w-full bg-[#060B17] px-4 py-3 rounded-xl border border-slate-700 focus:border-cyan-400 focus:outline-none text-white placeholder-slate-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold block">সিকিউর পাসওয়ার্ড</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#060B17] px-4 py-3 rounded-xl border border-slate-700 focus:border-cyan-400 focus:outline-none text-white placeholder-slate-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 fill-slate-950" />
              <span>লগইন করুন</span>
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="pt-2 border-t border-slate-800 text-center space-y-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>⚡ ১-ক্লিক ডেমো অ্যাডমিন অ্যাক্সেস</span>
            </button>
            <div className="flex justify-between text-[11px] text-slate-500 pt-1">
              <Link to="/gadgets" className="hover:text-cyan-400 transition-colors">
                ← গ্যাজেট স্টোরে ফিরে যান
              </Link>
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                মাস্টার গেটওয়ে
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Products
  const filteredProducts = gadgetProducts.filter(item => {
    const matchCat = categoryFilter === 'all' || item.category === categoryFilter;
    const matchSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Metrics
  const totalRevenue = gadgetOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = gadgetOrders.length;
  const inStockCount = gadgetProducts.filter(p => p.inStock !== false).length;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans flex flex-col relative selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Toast */}
      {saveToast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-slate-950 font-black px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#070D1B]/95 backdrop-blur-md border-b border-slate-800/90 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-slate-950 font-black shadow-md">
            <Sparkles className="w-4 h-4 fill-slate-950" />
          </div>
          <div>
            <h1 className="text-sm font-black text-white flex items-center gap-2">
              <span>ShopT PRO GADGETS</span>
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2 py-0.5 rounded-full font-bold border border-cyan-500/30">
                অ্যাডমিন হাব
              </span>
            </h1>
            <p className="text-[10px] text-slate-400">স্প্যাশিয়াল টেক ক্যাটালগ ও লাইভ অর্ডার কন্ট্রোল</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/gadgets"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>লাইভ স্টোর দেখুন</span>
          </Link>

          <Link
            to="/"
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all"
          >
            গেটওয়ে
          </Link>

          <button
            type="button"
            onClick={logoutGadgetAdmin}
            className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer"
            title="লগআউট"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800/80">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>ওভারভিউ ড্যাশবোর্ড</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>গ্যাজেট ইনভেন্টরি ({gadgetProducts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>লাইভ অর্ডারস ({gadgetOrders.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0B1428] p-4 rounded-2xl border border-slate-800 shadow-md space-y-1">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">মোট রাজস্ব (Revenue)</span>
                <p className="text-xl sm:text-2xl font-black text-white font-mono">৳{totalRevenue.toLocaleString('bn-BD')}</p>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +১৮.৪% চলতি সপ্তাহে
                </span>
              </div>

              <div className="bg-[#0B1428] p-4 rounded-2xl border border-slate-800 shadow-md space-y-1">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">মোট গ্যাজেট অর্ডার</span>
                <p className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">{totalOrdersCount} টি</p>
                <span className="text-[10px] text-slate-400">ক্যাশ অন ডেলিভারি ও অনলাইন</span>
              </div>

              <div className="bg-[#0B1428] p-4 rounded-2xl border border-slate-800 shadow-md space-y-1">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">স্টকে আছে (Active)</span>
                <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{inStockCount} টি</p>
                <span className="text-[10px] text-slate-400">মোট ২৬টি ডিভাইসের মধ্যে</span>
              </div>

              <div className="bg-[#0B1428] p-4 rounded-2xl border border-slate-800 shadow-md space-y-1">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">ওয়ারেন্টি ক্লেইম রেট</span>
                <p className="text-xl sm:text-2xl font-black text-amber-400 font-mono">০.৪%</p>
                <span className="text-[10px] text-emerald-400">১ বছর অফিসিয়াল রিপ্লেসমেন্ট</span>
              </div>
            </div>

            {/* Recent Orders in Dashboard */}
            <div className="bg-[#0B1428] rounded-2xl border border-slate-800 p-5 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white">সাম্প্রতিক গ্যাজেট অর্ডারসমূহ</h3>
                  <p className="text-[11px] text-slate-400">সরাসরি স্টোরফ্রন্ট ও কার্ট ড্রয়ার থেকে প্রাপ্ত অর্ডার</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold underline cursor-pointer"
                >
                  সব অর্ডার দেখুন →
                </button>
              </div>

              {gadgetOrders.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  এখনো কোনো গ্যাজেট অর্ডার আসেনি।
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase font-black">
                        <th className="pb-3">অর্ডার আইডি</th>
                        <th className="pb-3">গ্রাহক</th>
                        <th className="pb-3">আইটেম</th>
                        <th className="pb-3">মূল্য</th>
                        <th className="pb-3">পেমেন্ট</th>
                        <th className="pb-3">স্ট্যাটাস</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {gadgetOrders.slice(0, 5).map(ord => (
                        <tr key={ord.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3 font-mono font-bold text-cyan-400">{ord.id || ord.orderId}</td>
                          <td className="py-3">
                            <p className="font-bold text-white">{ord.customerName}</p>
                            <p className="text-[10px] text-slate-400">{ord.phone}</p>
                          </td>
                          <td className="py-3 text-slate-300">
                            {ord.items?.length || 1} টি ডিভাইস
                          </td>
                          <td className="py-3 font-mono font-bold text-white">৳{(ord.total || 0).toLocaleString('bn-BD')}</td>
                          <td className="py-3">
                            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold">
                              {ord.paymentMethod || 'COD'}
                            </span>
                          </td>
                          <td className="py-3">
                            <select
                              value={ord.status || 'Pending'}
                              onChange={(e) => {
                                updateOrderStatus(ord.id || ord.orderId, e.target.value);
                                showToast(`অর্ডার #${ord.id || ord.orderId} স্ট্যাটাস আপডেট হয়েছে`);
                              }}
                              className="bg-[#060B17] border border-slate-700 text-[11px] rounded-lg px-2 py-1 text-cyan-300 font-bold focus:outline-none"
                            >
                              <option value="Pending">Pending (অপেক্ষমাণ)</option>
                              <option value="Processing">Processing (প্রস্তুত হচ্ছে)</option>
                              <option value="Delivered">Delivered (ডেলিভার্ড)</option>
                              <option value="Cancelled">Cancelled (বাতিল)</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS & INVENTORY */}
        {activeTab === 'products' && (
          <div className="space-y-5">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="গ্যাজেটের নাম বা মডেল সার্চ করুন..."
                  className="w-full bg-[#060B17] text-xs px-3.5 py-2.5 pl-9 rounded-xl border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন গ্যাজেট যোগ করুন</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {GADGET_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    categoryFilter === cat.id
                      ? 'bg-cyan-500 text-slate-950 font-black'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat.nameBn}
                </button>
              ))}
            </div>

            {/* Products Table */}
            <div className="bg-[#0B1428] rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#070D1B] border-b border-slate-800 text-[11px] text-slate-400 uppercase font-black">
                      <th className="p-3.5">ডিভাইস</th>
                      <th className="p-3.5">ক্যাটাগরি</th>
                      <th className="p-3.5">মূল্য</th>
                      <th className="p-3.5">রেটিং</th>
                      <th className="p-3.5">স্টক স্ট্যাটাস</th>
                      <th className="p-3.5 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredProducts.map(prod => (
                      <tr key={prod.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={prod.title}
                              className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-slate-700 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-white truncate max-w-xs">{prod.title}</p>
                              <p className="text-[10px] text-slate-400">{prod.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {prod.categoryBn || prod.category}
                        </td>
                        <td className="p-3.5 font-mono font-bold text-white">
                          ৳{prod.price?.toLocaleString('bn-BD')}
                        </td>
                        <td className="p-3.5">
                          <span className="text-amber-400 font-bold">★ {prod.rating || 4.9}</span>
                        </td>
                        <td className="p-3.5">
                          <button
                            type="button"
                            onClick={() => {
                              toggleGadgetProductStock(prod.id);
                              showToast(`${prod.title} এর স্টক স্ট্যাটাস পরিবর্তিত হয়েছে`);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-black cursor-pointer transition-all ${
                              prod.inStock !== false
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {prod.inStock !== false ? 'স্টকে আছে' : 'স্টক শেষ'}
                          </button>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingProduct(prod)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                              title="এডিট"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`আপনি কি "${prod.title}" গ্যাজেটটি ডিলিট করতে চান?`)) {
                                  deleteGadgetProduct(prod.id);
                                  showToast('গ্যাজেট সফলভাবে মুছে ফেলা হয়েছে');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 cursor-pointer"
                              title="ডিলিট"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-white">গ্যাজেট অর্ডার ইনবক্স</h3>
                <p className="text-[11px] text-slate-400">গ্রাহকের ডেলিভারি ঠিকানা, ফোন নম্বর ও আইটেমের সম্পূর্ণ বিবরণ</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">ফিল্টার:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-[#060B17] border border-slate-700 text-xs rounded-xl px-3 py-1.5 text-cyan-300 font-bold"
                >
                  <option value="all">সকল অর্ডার</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {gadgetOrders.length === 0 ? (
              <div className="py-20 text-center bg-[#0B1428] rounded-2xl border border-slate-800 text-slate-500 text-xs">
                কোনো গ্যাজেট অর্ডার পাওয়া যায়নি।
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gadgetOrders
                  .filter(o => orderStatusFilter === 'all' || o.status === orderStatusFilter)
                  .map(ord => (
                    <div 
                      key={ord.id}
                      className="bg-[#0B1428] p-4 rounded-2xl border border-slate-800 shadow-md space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span className="font-mono font-black text-cyan-400 text-xs">{ord.id || ord.orderId}</span>
                        <span className="text-[10px] text-slate-400">{ord.date}</span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <p className="font-bold text-white flex items-center gap-1.5">
                          <span>{ord.customerName}</span>
                          <span className="bg-slate-800 text-[10px] font-normal text-slate-400 px-1.5 py-0.2 rounded">
                            {ord.area || 'ঢাকা'}
                          </span>
                        </p>
                        <p className="text-cyan-300 font-mono text-[11px] flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-500" />
                          <a href={`tel:${ord.phone}`} className="hover:underline">{ord.phone}</a>
                        </p>
                        <p className="text-slate-400 text-[11px] flex items-start gap-1">
                          <MapPin className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                          <span>{ord.address}, {ord.city}</span>
                        </p>
                      </div>

                      {/* Items */}
                      <div className="p-2.5 rounded-xl bg-[#060B17] border border-slate-800/90 space-y-1.5 text-[11px]">
                        {ord.items?.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center text-slate-300">
                            <span className="truncate max-w-[70%]">{it.title} × {it.quantity || 1}</span>
                            <span className="font-mono font-bold text-white">৳{(it.price * (it.quantity || 1)).toLocaleString('bn-BD')}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-[10px] text-slate-400 block">মোট প্রদেয়</span>
                          <span className="text-base font-black text-cyan-400 font-mono">
                            ৳{(ord.total || 0).toLocaleString('bn-BD')}
                          </span>
                        </div>

                        <select
                          value={ord.status || 'Pending'}
                          onChange={(e) => {
                            updateOrderStatus(ord.id || ord.orderId, e.target.value);
                            showToast(`অর্ডার #${ord.id || ord.orderId} আপডেট হয়েছে`);
                          }}
                          className="bg-[#060B17] border border-slate-700 text-[11px] rounded-lg px-2.5 py-1.5 text-cyan-300 font-bold focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* MODAL: ADD NEW GADGET */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#0B1428] rounded-3xl p-6 border border-cyan-500/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>নতুন গ্যাজেট যোগ করুন</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addGadgetProduct({
                  ...newGadget,
                  price: Number(newGadget.price) || 2500,
                  oldPrice: Number(newGadget.oldPrice) || 3500,
                  image: gadgetProducts[0]?.image
                });
                setShowAddModal(false);
                showToast('নতুন গ্যাজেট সফলভাবে যুক্ত হয়েছে!');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="text-slate-300 font-bold block mb-1">গ্যাজেটের বাংলা নাম *</label>
                <input
                  type="text"
                  required
                  value={newGadget.title}
                  onChange={(e) => setNewGadget({ ...newGadget, title: e.target.value })}
                  placeholder="যেমন: আল্ট্রা ফাস্ট GaN 65W চার্জার"
                  className="w-full bg-[#060B17] px-3.5 py-2.5 rounded-xl border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">ইংরেজি নাম / মডেল</label>
                <input
                  type="text"
                  value={newGadget.titleEn}
                  onChange={(e) => setNewGadget({ ...newGadget, titleEn: e.target.value })}
                  placeholder="Ultra Fast GaN 65W Charger"
                  className="w-full bg-[#060B17] px-3.5 py-2.5 rounded-xl border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">ক্যাটাগরি</label>
                  <select
                    value={newGadget.category}
                    onChange={(e) => setNewGadget({ ...newGadget, category: e.target.value })}
                    className="w-full bg-[#060B17] px-3.5 py-2.5 rounded-xl border border-slate-700 text-cyan-300 font-bold"
                  >
                    <option value="earbuds">TWS ইয়ারবাডস</option>
                    <option value="smartwatches">স্মার্টওয়াচ</option>
                    <option value="chargers">ফাস্ট চার্জার</option>
                    <option value="smartphones">স্মার্টফোন</option>
                    <option value="laptops">ল্যাপটপ</option>
                    <option value="gaming">গেমিং গিয়ার</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">ব্র্যান্ড</label>
                  <input
                    type="text"
                    value={newGadget.brand}
                    onChange={(e) => setNewGadget({ ...newGadget, brand: e.target.value })}
                    className="w-full bg-[#060B17] px-3.5 py-2.5 rounded-xl border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">বিক্রয় মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    value={newGadget.price}
                    onChange={(e) => setNewGadget({ ...newGadget, price: e.target.value })}
                    placeholder="2500"
                    className="w-full bg-[#060B17] px-3.5 py-2.5 rounded-xl border border-slate-700 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">পূর্বের মূল্য (৳)</label>
                  <input
                    type="number"
                    value={newGadget.oldPrice}
                    onChange={(e) => setNewGadget({ ...newGadget, oldPrice: e.target.value })}
                    placeholder="3500"
                    className="w-full bg-[#060B17] px-3.5 py-2.5 rounded-xl border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer mt-2"
              >
                সংরক্ষণ করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT GADGET */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#0B1428] rounded-3xl p-6 border border-cyan-500/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-cyan-400" />
                <span>গ্যাজেট এডিট করুন</span>
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateGadgetProduct(editingProduct);
                setEditingProduct(null);
                showToast('গ্যাজেট সফলভাবে আপডেট হয়েছে!');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="text-slate-300 font-bold block mb-1">গ্যাজেটের নাম *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full bg-[#060B17] px-3.5 py-2.5 rounded-xl border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">বিক্রয় মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#060B17] px-3.5 py-2.5 rounded-xl border border-slate-700 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">পূর্বের মূল্য (৳)</label>
                  <input
                    type="number"
                    value={editingProduct.oldPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, oldPrice: Number(e.target.value) })}
                    className="w-full bg-[#060B17] px-3.5 py-2.5 rounded-xl border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer mt-2"
              >
                আপডেট সংরক্ষণ করুন
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
