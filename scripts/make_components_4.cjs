const fs = require('fs');
const path = require('path');

// 1. KicksCraftFooter.jsx
const footerContent = `import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, RefreshCw, Truck, PackageCheck, PhoneCall, 
  Mail, MapPin, Sparkles, ExternalLink 
} from 'lucide-react';
import { FOOTWEAR_BRAND, FOOTWEAR_BRANDS, FOOTWEAR_TRUST_PILLARS } from '../../data/footwearData';

export default function KicksCraftFooter() {
  return (
    <footer className="w-full bg-[#0B0F17] text-white font-sans border-t border-orange-500/20 pt-10 sm:pt-14 pb-8">
      
      {/* 1. 4 Trust Pillars Highlight Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
          {FOOTWEAR_TRUST_PILLARS.map((pillar, i) => (
            <div key={i} className="flex flex-col items-center text-center p-2">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#FF4800] flex items-center justify-center mb-2.5 border border-orange-500/20">
                {i === 0 && <ShieldCheck className="w-5 h-5" />}
                {i === 1 && <RefreshCw className="w-5 h-5" />}
                {i === 2 && <Truck className="w-5 h-5" />}
                {i === 3 && <PackageCheck className="w-5 h-5" />}
              </div>
              <h4 className="font-black text-xs sm:text-sm text-white mb-1">
                {pillar.titleBn}
              </h4>
              <p className="text-[11px] text-slate-400 leading-tight">
                {pillar.descBn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Footer Multi-Column Links */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800 text-xs text-slate-400">
        
        {/* Col 1 & 2: Brand Info & Physical Outlets */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#FF4800] text-white flex items-center justify-center font-black italic shadow-lg shadow-orange-500/30">
              KC
            </div>
            <span className="font-black text-xl text-white uppercase tracking-tight">
              Kicks<span className="text-[#FF4800]">Craft</span> BD
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed max-w-sm">
            বাংলাদেশের শীর্ষস্থানীয় প্রিমিয়াম অথেনটিক স্নিকার্স এবং লাক্সারি লেদার ফুটওয়্যার বুটিক। আসল আন্তর্জাতিক ব্র্যান্ডের জুতো এখন আপনার হাতের নাগালে।
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#FF4800] shrink-0 mt-0.5" />
              <span><strong>বনানী আউটলেট:</strong> বাড়ি ৪২, রোড ১১, ব্লক ডি, বনানী, ঢাকা-১২১৩</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#FF4800] shrink-0 mt-0.5" />
              <span><strong>ধানমন্ডি আউটলেট:</strong> বাড়ি ৮, রোড ২৭ (পুরাতন), ধানমন্ডি, ঢাকা-১২০৯</span>
            </div>
          </div>
        </div>

        {/* Col 3: Brand Hub */}
        <div className="space-y-3">
          <h4 className="font-black text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
            জনপ্রিয় ব্র্যান্ডসমূহ
          </h4>
          <ul className="space-y-2">
            {FOOTWEAR_BRANDS.filter(b => b.id !== 'all').map((b) => (
              <li key={b.id}>
                <Link 
                  to={\`/footwear/shop?brand=\${b.id}\`}
                  className="hover:text-orange-400 transition-colors flex items-center justify-between"
                >
                  <span>{b.name}</span>
                  <span className="text-[10px] font-mono text-slate-500">({b.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Quick Navigation */}
        <div className="space-y-3">
          <h4 className="font-black text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
            গুরুত্বপূর্ণ লিংক
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/footwear/shop" className="hover:text-orange-400 transition-colors">সকল স্নিকার্স কালেকশন</Link>
            </li>
            <li>
              <Link to="/footwear/shop?category=running" className="hover:text-orange-400 transition-colors">রানিং ও জিম শু</Link>
            </li>
            <li>
              <Link to="/footwear/shop?category=leather" className="hover:text-orange-400 transition-colors">ইতালিয়ান লেদার অক্সফোর্ড</Link>
            </li>
            <li>
              <Link to="/footwear/admin" className="hover:text-orange-400 transition-colors flex items-center gap-1 font-bold text-orange-400">
                <span>🛡️ অ্যাডমিন ড্যাশবোর্ড</span>
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-orange-400 transition-colors">⚡ ডেমো গেটওয়ে হাব</Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Support & Hotline */}
        <div className="space-y-3">
          <h4 className="font-black text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
            কাস্টমার কেয়ার
          </h4>
          <div className="space-y-2.5">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">হটলাইন সাপোর্ট (সকাল ৯টা - রাত ১১টা):</span>
              <a href={\`tel:\${FOOTWEAR_BRAND.hotline}\`} className="font-mono font-black text-sm text-orange-400 hover:underline">
                {FOOTWEAR_BRAND.hotline}
              </a>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase block">হোয়াটসঅ্যাপ অর্ডার:</span>
              <span className="font-mono text-slate-300 font-bold">{FOOTWEAR_BRAND.whatsapp}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase block">ইমেইল:</span>
              <span className="font-mono text-slate-300">{FOOTWEAR_BRAND.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Copyright & Accepted Payment Methods */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© ২০২৬ {FOOTWEAR_BRAND.name}. সর্বস্বত্ব সংরক্ষিত।</p>
        
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
          <span>গৃহীত পেমেন্ট মাধ্যম:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">ক্যাশ অন ডেলিভারি</span>
          <span className="px-2 py-0.5 rounded bg-pink-900/60 text-pink-300">bKash</span>
          <span className="px-2 py-0.5 rounded bg-orange-950 text-orange-300">Nagad</span>
          <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300">Visa / Mastercard</span>
        </div>
      </div>
    </footer>
  );
}
`;

// 2. KicksCraftAdminDashboardView.jsx
const adminContent = `import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  ShieldCheck, Package, ShoppingCart, DollarSign, RefreshCw, 
  Plus, Trash2, Edit, Check, Eye, Printer, Search, 
  ArrowLeft, Lock, LogOut, ExternalLink, SlidersHorizontal 
} from 'lucide-react';
import { FOOTWEAR_PRODUCTS, FOOTWEAR_BRAND, FOOTWEAR_BRANDS, FOOTWEAR_CATEGORIES } from '../../data/footwearData';

export default function KicksCraftAdminDashboardView() {
  const navigate = useNavigate();
  const { orders = [], updateOrderStatus } = useStore();

  // Admin Auth Gate State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('kc_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [username, setUsername] = useState('admin@kickscraft.com');
  const [password, setPassword] = useState('kicks2026');
  const [loginError, setLoginError] = useState('');

  // Tabs: 'orders', 'catalog', 'settings'
  const [activeTab, setActiveTab] = useState('orders');

  // Filter States
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchOrder, setSearchOrder] = useState('');
  const [catalogSearch, setCatalogSearch] = useState('');

  // Selected Order for Printable Invoice Modal
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  // Catalog Products State
  const [catalog, setCatalog] = useState(FOOTWEAR_PRODUCTS);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nameBn: '',
    nameEn: '',
    brand: 'nike',
    brandName: 'Nike / Jordan',
    category: 'running',
    categoryName: 'রানিং ও অ্যাথলেটিক',
    price: 5500,
    originalPrice: 7500,
    image: '/footwear-images/Athletic_running_sneaker_product__fc5dbc43.jpg',
    stock: 8,
    sizes: [40, 41, 42, 43, 44]
  });

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim() === 'kicks2026') {
      sessionStorage.setItem('kc_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('ভুল ইমেইল বা পাসওয়ার্ড। ডেমো পাসওয়ার্ড: kicks2026');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('kc_admin_auth');
    setIsAuthenticated(false);
  };

  // Demo Footwear Orders (Combined from store orders + default samples)
  const footwearOrders = orders.filter(o => !o.niche || o.niche === 'footwear');
  const allOrdersList = footwearOrders.length > 0 ? footwearOrders : [
    {
      id: 'KC-928174',
      orderId: 'KC-928174',
      customerName: 'তানভীর আহমেদ',
      phone: '01711-223344',
      address: 'বাড়ি ১২, রোড ৫, সেক্টর ৩, উত্তরা, ঢাকা',
      deliveryArea: 'ঢাকা সিটির ভেতরে',
      paymentMethod: 'ক্যাশ অন ডেলিভারি (COD)',
      subtotal: 8490,
      total: 8560,
      status: 'Delivered',
      date: '২৮ অক্টোবর ২০২৬',
      items: [
        {
          id: 'kc-nike-01',
          title: 'নাইকি এয়ার জর্ডান ১ রেট্রো হাই ওজি',
          price: 8490,
          selectedSize: 42,
          quantity: 1,
          image: '/footwear-images/Retro_basketball_sneaker_studio___8667b319.jpg'
        }
      ]
    },
    {
      id: 'KC-928175',
      orderId: 'KC-928175',
      customerName: 'ফারহান চৌধুরী',
      phone: '01819-445566',
      address: 'ফ্ল্যাট ৪বি, জিইসি মোড়, চট্টগ্রাম',
      deliveryArea: 'ঢাকার বাইরে',
      paymentMethod: 'বিকাশ পেমেন্ট',
      subtotal: 6990,
      total: 7120,
      status: 'Processing',
      date: '২৯ অক্টোবর ২০২৬',
      items: [
        {
          id: 'kc-nb-01',
          title: 'নিউ ব্যালেন্স ৯৯০ভি৬ মেইড ইন ইউএসএ গ্রে',
          price: 6990,
          selectedSize: 43,
          quantity: 1,
          image: '/footwear-images/Heather-grey_everyday_lifestyle___92d54958.jpg'
        }
      ]
    },
    {
      id: 'KC-928176',
      orderId: 'KC-928176',
      customerName: 'আসিফ মাহমুদ',
      phone: '01911-778899',
      address: 'বাড়ি ১৮, রোড ১১, বনানী, ঢাকা',
      deliveryArea: 'ঢাকা সিটির ভেতরে',
      paymentMethod: 'ক্যাশ অন ডেলিভারি (COD)',
      subtotal: 7490,
      total: 7560,
      status: 'Pending',
      date: '৩০ অক্টোবর ২০২৬',
      items: [
        {
          id: 'kc-apex-01',
          title: 'অ্যাপেক্স ভেনচুরিনি রয়েল হ্যান্ডমেড অক্সফোর্ড',
          price: 7490,
          selectedSize: 41,
          quantity: 1,
          image: '/footwear-images/Handcrafted_Italian_leather_Oxfo__2f50679e.jpg'
        }
      ]
    }
  ];

  const filteredOrders = allOrdersList.filter(o => {
    if (statusFilter !== 'all' && o.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    if (searchOrder.trim()) {
      const q = searchOrder.toLowerCase();
      return (
        (o.orderId && o.orderId.toLowerCase().includes(q)) ||
        (o.customerName && o.customerName.toLowerCase().includes(q)) ||
        (o.phone && o.phone.includes(q))
      );
    }
    return true;
  });

  // KPI Calculations
  const totalRevenue = allOrdersList.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = allOrdersList.length;
  const activeProductsCount = catalog.length;

  // Add Product to Catalog
  const handleAddProduct = (e) => {
    e.preventDefault();
    const item = {
      ...newProduct,
      id: \`kc-custom-\${Date.now()}\`,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true
    };
    setCatalog([item, ...catalog]);
    setIsAddProductOpen(false);
  };

  // Delete Product
  const handleDeleteProduct = (id) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই স্নিকারটি ক্যাটালগ থেকে মুছে ফেলতে চান?')) {
      setCatalog(catalog.filter(p => p.id !== id));
    }
  };

  // 1. If not authenticated, render Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800">
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF4800] to-amber-500 text-white flex items-center justify-center font-black italic shadow-lg shadow-orange-500/30">
              KC
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-center text-slate-900 uppercase">
            KicksCraft BD অ্যাডমিন পোর্টাল
          </h2>
          <p className="text-xs text-center text-slate-500 mb-6">
            জুতো ও স্নিকার্স ক্যাটালগ ও অর্ডার ম্যানেজমেন্ট সিস্টেম
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">অ্যাডমিন ইমেইল</label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono outline-none focus:border-[#FF4800]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono outline-none focus:border-[#FF4800]"
                required
              />
            </div>

            {loginError && (
              <p className="text-xs font-bold text-red-600 bg-red-50 p-2 rounded-lg text-center">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0B0F17] hover:bg-black text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4 text-orange-400" />
              <span>লগইন করুন</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem('kc_admin_auth', 'true');
                setIsAuthenticated(true);
              }}
              className="w-full py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF4800] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-orange-200 cursor-pointer"
            >
              <span>⚡ ১-ক্লিক ডেমো লগইন</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <Link to="/footwear" className="text-xs font-bold text-slate-500 hover:text-[#FF4800]">
              ← স্নিকার্স শপ স্টোরফ্রন্টে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard Layout
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      
      {/* Top Navbar */}
      <header className="bg-[#0B0F17] text-white py-3.5 px-3 sm:px-6 sticky top-0 z-40 border-b border-orange-500/20 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF4800] text-white flex items-center justify-center font-black italic">
              KC
            </div>
            <div>
              <span className="font-black text-base uppercase tracking-tight">
                KicksCraft BD • <span className="text-orange-400">অ্যাডমিন কনসোল</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/footwear"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">স্টোরে যান</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6">
        
        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">মোট বিক্রয়</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-[#0B0F17]">
                ৳{totalRevenue.toLocaleString('en-US')}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF4800] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">মোট অর্ডার</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                {totalOrdersCount} টি
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">অ্যাক্টিভ মডেল</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                {activeProductsCount} জোড়া
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">সাইজ এক্সচেঞ্জ রেট</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600">
                ১.২%
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          {[
            { id: 'orders', label: \`অর্ডার ব্যবস্থাপনা (\${filteredOrders.length})\` },
            { id: 'catalog', label: \`স্নিকার্স ক্যাটালগ (\${catalog.length})\` },
            { id: 'settings', label: 'স্টোর ও ডেলিভারি সেটিংস' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={\`py-3 px-3 sm:px-4 font-black text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer \${
                activeTab === tab.id
                  ? 'border-[#FF4800] text-[#FF4800]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }\`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Orders Management */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-4 sm:p-6">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchOrder}
                  onChange={(e) => setSearchOrder(e.target.value)}
                  placeholder="অর্ডার আইডি, নাম বা ফোন নম্বর খুঁজুন..."
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#FF4800] w-64"
                />
              </div>

              {/* Status Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {['all', 'Pending', 'Processing', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={\`px-3 py-1.5 rounded-lg text-xs font-bold transition-all \${
                      statusFilter === st
                        ? 'bg-[#0B0F17] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }\`}
                  >
                    {st === 'all' ? 'সকল' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                    <th className="p-3">অর্ডার আইডি</th>
                    <th className="p-3">তারিখ</th>
                    <th className="p-3">গ্রাহক ও মোবাইল</th>
                    <th className="p-3">পণ্য ও সাইজ</th>
                    <th className="p-3">মোট বিল</th>
                    <th className="p-3">স্ট্যাটাস</th>
                    <th className="p-3 text-right">ইনভয়েস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-mono font-bold text-orange-600">
                        {o.orderId || o.id}
                      </td>
                      <td className="p-3 text-slate-500">{o.date || 'আজ'}</td>
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block">{o.customerName}</span>
                        <span className="font-mono text-slate-400 text-[11px]">{o.phone}</span>
                      </td>
                      <td className="p-3">
                        {o.items && o.items[0] && (
                          <div className="flex items-center gap-2">
                            <span className="truncate max-w-[160px] text-slate-800">{o.items[0].title}</span>
                            <span className="px-1.5 py-0.2 rounded font-mono text-[10px] bg-slate-100 text-slate-600">
                              EU {o.items[0].selectedSize || '42'}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="p-3 font-mono font-black text-slate-900">
                        ৳{o.total?.toLocaleString('en-US')}
                      </td>
                      <td className="p-3">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus && updateOrderStatus(o.id, e.target.value)}
                          className={\`px-2 py-1 rounded-md text-[11px] font-bold border outline-none \${
                            o.status === 'Delivered' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : o.status === 'Processing'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }\`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => setInvoiceOrder(o)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="প্রিন্ট ইনভয়েস"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Catalog CRUD Management */}
        {activeTab === 'catalog' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <input
                type="text"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                placeholder="ক্যাটালগে স্নিকার্স খুঁজুন..."
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#FF4800] w-64"
              />

              <button
                type="button"
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#FF4800] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন জুতো যোগ করুন</span>
              </button>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {catalog
                .filter(p => !catalogSearch || p.nameBn.toLowerCase().includes(catalogSearch.toLowerCase()) || p.brandName.toLowerCase().includes(catalogSearch.toLowerCase()))
                .map((p) => (
                  <div key={p.id} className="p-3 rounded-2xl border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="aspect-square bg-slate-100 rounded-xl p-2 mb-2 flex items-center justify-center overflow-hidden">
                        <img src={p.image} alt={p.nameEn} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-orange-600 block">{p.brandName}</span>
                      <h4 className="font-bold text-xs text-slate-900 truncate">{p.nameBn}</h4>
                      <span className="font-mono font-black text-sm text-[#0B0F17] block mt-1">
                        ৳{p.price.toLocaleString('en-US')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                      <span className="text-[10px] text-slate-400 font-mono">স্টক: {p.stock || 8} জোড়া</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Tab 3: Store Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 max-w-2xl space-y-4">
            <h3 className="font-black text-sm text-slate-900 uppercase">স্টোর ডেলিভারি ও সাপোর্ট সেটিংস</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ঢাকা সিটির ভিতরে ডেলিভারি ফি</label>
                <input
                  type="number"
                  defaultValue={FOOTWEAR_BRAND.deliveryInsideDhaka}
                  className="w-full p-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ঢাকার বাইরে ডেলিভারি ফি</label>
                <input
                  type="number"
                  defaultValue={FOOTWEAR_BRAND.deliveryOutsideDhaka}
                  className="w-full p-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ফ্রি ডেলিভারি থ্রেশহোল্ড (টাকা)</label>
              <input
                type="number"
                defaultValue={FOOTWEAR_BRAND.freeDeliveryThreshold}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">অফিসিয়াল হটলাইন</label>
              <input
                type="text"
                defaultValue={FOOTWEAR_BRAND.hotline}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs font-mono"
              />
            </div>

            <button
              type="button"
              onClick={() => alert('সেটিংস সফলভাবে সংরক্ষিত হয়েছে!')}
              className="py-2.5 px-5 rounded-xl bg-[#0B0F17] text-white font-bold text-xs"
            >
              পরিবর্তন সংরক্ষণ করুন
            </button>
          </div>
        )}
      </main>

      {/* Printable Invoice Modal */}
      {invoiceOrder && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setInvoiceOrder(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
              <div>
                <h3 className="font-black text-base text-slate-900">অফিসিয়াল কাস্টমার ইনভয়েস</h3>
                <span className="font-mono text-xs text-orange-600 font-bold">{invoiceOrder.orderId}</span>
              </div>
              <button
                type="button"
                onClick={() => setInvoiceOrder(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-2 mb-4">
              <p><strong>গ্রাহকের নাম:</strong> {invoiceOrder.customerName}</p>
              <p><strong>মোবাইল:</strong> {invoiceOrder.phone}</p>
              <p><strong>ঠিকানা:</strong> {invoiceOrder.address}</p>
              <p><strong>পেমেন্ট মেথড:</strong> {invoiceOrder.paymentMethod}</p>
            </div>

            <div className="border-t border-b border-slate-200 py-3 mb-4 text-xs">
              <div className="flex justify-between font-bold mb-1">
                <span>পণ্যের নাম</span>
                <span>মূল্য</span>
              </div>
              {invoiceOrder.items && invoiceOrder.items.map((it, i) => (
                <div key={i} className="flex justify-between text-slate-600">
                  <span>{it.title} (EU {it.selectedSize}) x {it.quantity || 1}</span>
                  <span className="font-mono">৳{(it.price * (it.quantity || 1)).toLocaleString('en-US')}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-black text-sm text-slate-900 mb-6">
              <span>সর্বমোট প্রদেয়:</span>
              <span className="font-mono text-[#FF4800]">৳{invoiceOrder.total?.toLocaleString('en-US')}</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2 rounded-xl bg-[#0B0F17] text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>প্রিন্ট ইনভয়েস</span>
              </button>
              <button
                type="button"
                onClick={() => setInvoiceOrder(null)}
                className="py-2 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
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
`;

fs.writeFileSync(path.resolve('client/src/components/footwear/KicksCraftFooter.jsx'), footerContent, 'utf8');
fs.writeFileSync(path.resolve('client/src/components/footwear/KicksCraftAdminDashboardView.jsx'), adminContent, 'utf8');

console.log('Successfully wrote KicksCraftFooter and KicksCraftAdminDashboardView in UTF-8');
