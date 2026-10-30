const fs = require('fs');
const path = require('path');

const homeContent = `import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Flame, Zap, Sparkles, ArrowRight, ShieldCheck, 
  ChevronRight, Star, TrendingUp, CheckCircle2, 
  Layers, Package, PhoneCall, Mail 
} from 'lucide-react';
import KicksCraftHeader from './KicksCraftHeader';
import KicksCraftHeroSlider from './KicksCraftHeroSlider';
import KicksCraftProductCard from './KicksCraftProductCard';
import KicksCraftFooter from './KicksCraftFooter';
import KicksCraftCartDrawer from './KicksCraftCartDrawer';
import { 
  FOOTWEAR_PRODUCTS, FOOTWEAR_BRANDS, FOOTWEAR_REVIEWS, FOOTWEAR_BRAND 
} from '../../data/footwearData';

export default function KicksCraftHome() {
  const navigate = useNavigate();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered by selected category pill from Header if active
  const displayedProducts = activeCategory === 'all'
    ? FOOTWEAR_PRODUCTS
    : FOOTWEAR_PRODUCTS.filter(p => p.category === activeCategory);

  // Trending & Hot Drops (Top 4)
  const trendingDrops = FOOTWEAR_PRODUCTS.filter(p => p.isFeatured || p.isTrending).slice(0, 4);

  // New Arrivals (Next 8)
  const newArrivals = displayedProducts.slice(0, 8);

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    if (catId !== 'all') {
      const el = document.getElementById('catalog-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-slate-800">
      
      {/* 1. KicksCraft Modern Boutique Header */}
      <KicksCraftHeader 
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) navigate(\`/footwear/shop?search=\${encodeURIComponent(q)}\`);
        }}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* 2. High-Impact Dynamic Banner Slider */}
      <KicksCraftHeroSlider />

      {/* 3. High-Energy Trending Drops Section */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-3 sm:px-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF4800] text-xs font-black uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 fill-[#FF4800]" />
              <span>হট ড্রপস ২০২৬</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              ট্রেন্ডিং স্নিকার ড্রপস ও হাইপ কালেকশন
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              স্নিকারহেডদের সর্বাধিক চাহিদাসম্পন্ন সীমিত এডিশন ও ফ্ল্যাগশিপ মডেল
            </p>
          </div>

          <Link
            to="/footwear/shop"
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#0B0F17] hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>সবগুলো দেখুন</span>
            <ChevronRight className="w-4 h-4 text-orange-400" />
          </Link>
        </div>

        {/* 2 Columns on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {trendingDrops.map((product) => (
            <KicksCraftProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Authentic Brand Boutique Showcase Cards */}
      <section className="py-10 bg-[#0B0F17] text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-orange-400 font-bold text-xs uppercase tracking-widest block mb-1">
              AUTHORIZED HERITAGE BRANDS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              বিশ্বখ্যাত ৫টি ব্র্যান্ডের অফিশিয়াল কালেকশন
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
              শতভাগ জেনুইন অরিজিনাল স্নিকার্স, স্পোর্টস ও প্রিমিয়াম লেদার জুতো
            </p>
          </div>

          {/* 5 Brand Interactive Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              { id: 'nike', name: 'Nike / Jordan', tag: 'BASKETBALL & HYPED', bg: 'from-orange-500/20 to-red-500/20', count: '৬টি মডেল' },
              { id: 'adidas', name: 'Adidas Originals', tag: 'SAMBA & BOOST', bg: 'from-blue-500/20 to-cyan-500/20', count: '৫টি মডেল' },
              { id: 'newbalance', name: 'New Balance', tag: '990v6 & 550 RETRO', bg: 'from-emerald-500/20 to-teal-500/20', count: '৫টি মডেল' },
              { id: 'puma', name: 'Puma Motorsport', tag: 'FERRARI & NITRO', bg: 'from-red-500/20 to-amber-500/20', count: '৪টি মডেল' },
              { id: 'apex', name: 'Apex Heritage', tag: 'ROYAL LEATHER OXFORD', bg: 'from-amber-500/20 to-stone-500/20', count: '৪টি মডেল' }
            ].map((brand) => (
              <Link
                key={brand.id}
                to={\`/footwear/shop?brand=\${brand.id}\`}
                className="group relative p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 block mb-1">
                    {brand.tag}
                  </span>
                  <h3 className="font-black text-sm sm:text-base text-white group-hover:text-[#FF4800] transition-colors">
                    {brand.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-800 text-xs text-slate-400">
                  <span className="font-mono text-[11px]">{brand.count}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Main Catalog New Arrivals Grid (2 Columns on Mobile!) */}
      <section id="catalog-grid" className="py-10 sm:py-14 max-w-7xl mx-auto px-3 sm:px-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#FF4800]" />
              <span>নতুন সংগ্রহ ২০২৬</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              সর্বশেষ সংযোজিত স্নিকার্স ও লেদার শু
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ইউরোপ ও ইউএসএ স্ট্যান্ডার্ড সাইজিং ও অথেনটিক ম্যাটেরিয়ালস
            </p>
          </div>

          <Link
            to="/footwear/shop"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF4800] to-[#FF6B00] text-white font-black text-xs sm:text-sm shadow-md shadow-orange-500/20 active:scale-95 transition-all self-start sm:self-auto flex items-center gap-2"
          >
            <span>সম্পূর্ণ শপ ব্রাউজ করুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2 COLUMNS ON MOBILE (grid-cols-2) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {newArrivals.map((product) => (
            <KicksCraftProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button Bottom CTA */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            to="/footwear/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#0B0F17] hover:bg-black text-white font-black text-sm shadow-xl active:scale-95 transition-all"
          >
            <span>সব ২৪টি স্নিকার্স দেখুন</span>
            <ChevronRight className="w-4 h-4 text-orange-400" />
          </Link>
        </div>
      </section>

      {/* 6. Customer Reviews & Sneaker Unboxing Stories */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-black uppercase text-[#FF4800] tracking-wider block mb-1">
              VERIFIED BUYERS FEEDBACK
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
              স্নিকারহেড ও কাস্টমারদের বাস্তব অভিজ্ঞতা
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              কিকসক্রাফট থেকে সংগৃহীত অরিজিনাল স্নিকার্স নিয়ে গ্রাহকদের মূল্যবান মতামত
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FOOTWEAR_REVIEWS.map((rev) => (
              <div 
                key={rev.id} 
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-3">
                    "{rev.comment}"
                  </p>
                  
                  <span className="text-[11px] font-bold text-[#FF4800] block truncate">
                    ক্রয়কৃত জুতো: {rev.product}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900">{rev.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VIP Sneaker Drop Newsletter Banner */}
      <section className="py-12 bg-gradient-to-br from-[#0B0F17] via-[#161B26] to-[#0B0F17] text-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-black border border-orange-500/30">
            <Zap className="w-3.5 h-3.5" />
            <span>VIP SNEAKER DROP ALERTS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            পরবর্তী হাইপ ড্রপের সবার আগে নোটিফিকেশন পান!
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            লিমিটেড এডিশন স্নিকার্স রিলিজের সাথে সাথে এসএমএস ও ইমেইলে অ্যালার্ট পেতে আজই সাবস্ক্রাইব করুন।
          </p>

          <form 
            onSubmit={(e) => { e.preventDefault(); alert('ধন্যবাদ! আপনি সফলভাবে ভিআইপি ড্রপ এলার্টে যোগ দিয়েছেন।'); }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              placeholder="আপনার ইমেইল বা ফোন নম্বর দিন..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-xs sm:text-sm outline-none focus:border-[#FF4800]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF4800] to-[#FF6B00] hover:from-[#E03A00] hover:to-[#FF4800] text-white font-black text-xs sm:text-sm shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              সাবস্ক্রাইব
            </button>
          </form>
        </div>
      </section>

      {/* 8. Footer */}
      <KicksCraftFooter />

      {/* 9. Slide-Over Cart Drawer */}
      <KicksCraftCartDrawer 
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </div>
  );
}
`;

fs.writeFileSync(path.resolve('client/src/components/footwear/KicksCraftHome.jsx'), homeContent, 'utf8');

console.log('Successfully wrote KicksCraftHome in UTF-8');
