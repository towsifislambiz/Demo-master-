import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  Search, SlidersHorizontal, ArrowUpDown, ChevronRight, 
  Sparkles, Filter, X, ShoppingBag, ArrowLeft
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { 
  GHORER_BAZAR_BRAND, 
  GHORER_BAZAR_CATEGORIES, 
  GHORER_BAZAR_PRODUCTS 
} from '../../data/ghorerBazarData';
import GhorerBazarHeader from './GhorerBazarHeader';
import GhorerBazarProductCard from './GhorerBazarProductCard';
import GhorerBazarQuickOrderModal from './GhorerBazarQuickOrderModal';
import GhorerBazarCartDrawer from './GhorerBazarCartDrawer';

export default function GhorerBazarShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialCat = searchParams.get('cat') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price_low' | 'price_high' | 'rating'
  const [priceRange, setPriceRange] = useState('all'); // 'all' | 'under500' | '500_1000' | '1000_2000' | 'above2000'

  const [quickOrderProduct, setQuickOrderProduct] = useState(null);
  const [quickOrderWeight, setQuickOrderWeight] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return GHORER_BAZAR_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesEn = product.titleEn && product.titleEn.toLowerCase().includes(query);
        const matchesDesc = product.shortDesc && product.shortDesc.toLowerCase().includes(query);
        if (!matchesTitle && !matchesEn && !matchesDesc) return false;
      }
      // Price range filter
      const defaultPrice = product.weights?.[0]?.price ?? product.price ?? 0;
      if (priceRange === 'under500' && defaultPrice >= 500) return false;
      if (priceRange === '500_1000' && (defaultPrice < 500 || defaultPrice > 1000)) return false;
      if (priceRange === '1000_2000' && (defaultPrice < 1000 || defaultPrice > 2000)) return false;
      if (priceRange === 'above2000' && defaultPrice <= 2000) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.weights?.[0]?.price ?? a.price ?? 0;
      const priceB = b.weights?.[0]?.price ?? b.price ?? 0;

      if (sortBy === 'price_low') return priceA - priceB;
      if (sortBy === 'price_high') return priceB - priceA;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.ratingCount || 0) - (a.ratingCount || 0); // Default: popularity
    });
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  const handleOpenQuickOrder = (product, weight) => {
    setQuickOrderProduct(product);
    setQuickOrderWeight(weight);
  };

  const handleAddToCart = (product, weight) => {
    const itemToAdd = {
      ...product,
      price: weight?.price ?? product.price,
      oldPrice: weight?.oldPrice ?? product.oldPrice,
      weight: weight?.label || 'প্যাক',
      selectedWeight: weight?.label || 'প্যাক'
    };
    if (addToCart) {
      addToCart(itemToAdd, { size: weight?.label || 'প্যাক' });
    }
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFDF9] text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Header */}
      <GhorerBazarHeader
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onBackToGateway={() => navigate('/')}
      />

      {/* Breadcrumb & Header Title */}
      <div className="bg-white border-b border-emerald-100/60 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2">
            <Link to="/organic" className="hover:text-[#055C32] font-medium">হোম</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-stone-900">সকল পণ্য সম্ভার</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900">
                সকল খাঁটি অর্গানিক ফুড ক্যাটালগ
              </h1>
              <p className="text-xs text-stone-500 mt-0.5">
                সরাসরি খামার ও সুন্দরবন থেকে সংগৃহীত ১০০% বিশুদ্ধ পণ্য (মোট {filteredProducts.length} টি পাওয়া গেছে)
              </p>
            </div>

            {/* Quick Reset Button if filtered */}
            {(selectedCategory !== 'all' || searchQuery !== '' || priceRange !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setPriceRange('all');
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold self-start sm:self-auto cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>ফিল্টার মুছুন</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Filter & Controls Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {GHORER_BAZAR_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-[#055C32] text-white border-[#055C32] shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300'
                }`}
              >
                <span>{cat.nameBn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-emerald-700 text-amber-200' : 'bg-stone-100 text-stone-600'
                }`}>
                  {cat.id === 'all' ? GHORER_BAZAR_PRODUCTS.length : cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls Row: Search, Price Range, Sort */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-emerald-100 shadow-xs mb-6 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          
          {/* Live Search Field */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্য বা ব্র্যান্ডের নাম দিয়ে খুঁজুন..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 focus:border-[#055C32] focus:outline-none"
            />
          </div>

          {/* Price Range Dropdown */}
          <div className="sm:col-span-4 flex items-center gap-2">
            <span className="text-xs text-stone-500 shrink-0 font-medium">মূল্য:</span>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs rounded-xl border border-stone-200 bg-white text-stone-800 focus:border-[#055C32] focus:outline-none cursor-pointer"
            >
              <option value="all">সব মূল্যের পণ্য</option>
              <option value="under500">৳৫০০ এর নিচে</option>
              <option value="500_1000">৳৫০০ - ৳১,০০০</option>
              <option value="1000_2000">৳১,০০০ - ৳২,০০০</option>
              <option value="above2000">৳২,০০০ এর উপরে</option>
            </select>
          </div>

          {/* Sorting Dropdown */}
          <div className="sm:col-span-3 flex items-center gap-2">
            <span className="text-xs text-stone-500 shrink-0 font-medium">সর্ট:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs rounded-xl border border-stone-200 bg-white text-stone-800 focus:border-[#055C32] focus:outline-none cursor-pointer"
            >
              <option value="popular">জনপ্রিয়তা অনুযায়ী</option>
              <option value="price_low">কম দাম থেকে বেশি</option>
              <option value="price_high">বেশি দাম থেকে কম</option>
              <option value="rating">সর্বোচ্চ রেটিং</option>
            </select>
          </div>

        </div>

        {/* Product Grid: 2 cols on mobile, 4 on desktop */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-xs">
            <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-stone-800">কোনো অর্গানিক পণ্য পাওয়া যায়নি</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              আপনার ফিল্টার পরিবর্তন করুন অথবা সার্চ ফিল্ড রিসেট করে আবার চেষ্টা করুন।
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setPriceRange('all');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#055C32] text-white text-xs font-bold shadow hover:bg-[#077842] transition-all cursor-pointer"
            >
              সব ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => (
              <GhorerBazarProductCard
                key={product.id}
                product={product}
                onQuickOrder={handleOpenQuickOrder}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-8 px-4 text-center text-xs mt-12 border-t-4 border-[#055C32]">
        <div className="max-w-7xl mx-auto space-y-2">
          <p>© ২০২৬ {GHORER_BAZAR_BRAND.name} (Ghorer Bazar Clone). খাঁটি খাদ্যে সুস্থ থাকুন।</p>
          <div className="text-stone-500 text-[11px]">হটলাইন: {GHORER_BAZAR_BRAND.hotline} | {GHORER_BAZAR_BRAND.address}</div>
        </div>
      </footer>

      {/* Floating Demo Hub Button */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-4 py-2.5 rounded-full bg-[#055C32] hover:bg-[#077842] text-white text-xs font-bold shadow-2xl border-2 border-emerald-400/80 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
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
