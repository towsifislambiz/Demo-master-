import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ArrowLeft, Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import ShopTGadgetHeader from './ShopTGadgetHeader';
import ShopTGadgetCartDrawer from './ShopTGadgetCartDrawer';

export default function ShopTGadgetWishlistPage() {
  const { wishlist = [], removeFromWishlist, addToCart } = useStore();
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleMoveToCart = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Header */}
      <ShopTGadgetHeader
        activeCategory="all"
        onSelectCategory={() => navigate('/gadgets')}
        searchQuery=""
        onSearchChange={() => {}}
        onOpenCart={() => setCartOpen(true)}
        onBackToGateway={() => navigate('/')}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center shadow-inner">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>সংরক্ষিত পছন্দের গ্যাজেট</span>
                <span className="text-cyan-400 text-sm font-mono">({wishlist.length})</span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                আপনার পছন্দের ডিভাইসসমূহ সংরক্ষিত রয়েছে, যেকোনো সময় ১-ক্লিকে কার্টে যোগ করতে পারেন
              </p>
            </div>
          </div>

          <Link
            to="/gadgets"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>গ্যাজেট স্টোরে ফিরুন</span>
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-[#0B1325] rounded-3xl p-12 text-center border border-slate-800 max-w-md mx-auto space-y-4 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto text-slate-500 border border-slate-800">
              <Heart className="w-8 h-8 text-slate-600" />
            </div>
            <h2 className="text-base font-black text-white">আপনার পছন্দের তালিকা বর্তমানে খালি</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              যেকোনো গ্যাজেট কার্ডের ওপর হার্ট আইকন ক্লিক করে সহজেই পছন্দের তালিকায় সংরক্ষণ করে রাখুন।
            </p>
            <Link
              to="/gadgets"
              className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black px-6 py-3 rounded-2xl shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>গ্যাজেট ক্যাটালগ এক্সপ্লোর করুন</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map(item => (
              <div 
                key={item.id}
                className="bg-[#0C152B] hover:bg-[#0E1933] rounded-2xl p-4 border border-slate-800 hover:border-cyan-500/40 shadow-lg flex flex-col justify-between space-y-3 transition-all"
              >
                <div className="w-full h-48 bg-gradient-to-b from-[#132244]/60 to-[#070D1B] rounded-xl flex items-center justify-center p-3 relative overflow-hidden border border-slate-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors shadow-sm cursor-pointer"
                    title="তালিকা থেকে সরান"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">{item.brand || 'ShopT Pro'}</span>
                  <h3 className="font-bold text-xs text-white line-clamp-2 mt-0.5 leading-snug">
                    {item.title}
                  </h3>
                  <div className="pt-2 flex items-baseline gap-2">
                    <span className="font-mono font-black text-sm text-white">
                      ৳{(item.price || 0).toLocaleString('bn-BD')}
                    </span>
                    {item.oldPrice && (
                      <span className="text-xs text-slate-500 line-through font-mono">
                        ৳{(item.oldPrice || 0).toLocaleString('bn-BD')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-white hover:bg-slate-100 text-slate-950 text-xs font-black py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>কার্টে নিন</span>
                  </button>

                  <Link
                    to={`/gadgets/product/${item.id}`}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
                    title="ডিটেইলস"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <ShopTGadgetCartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </div>
  );
}
