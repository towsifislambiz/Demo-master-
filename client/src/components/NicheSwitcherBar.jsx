import React, { useState } from 'react';
import { 
  Sparkles, Layers, Sliders, ShoppingBag, Heart, 
  Smartphone, Apple, Footprints, ShieldCheck, ArrowLeft, ChevronDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';

export default function NicheSwitcherBar({ onBackToGateway }) {
  const { activeNiche, setActiveNiche, currentNicheData, niches, cart } = useStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const nicheIcons = {
    clothing: ShoppingBag,
    beauty: Heart,
    gadgets: Smartphone,
    organic: Apple,
    footwear: Footprints
  };

  const CurrentIcon = nicheIcons[activeNiche] || ShoppingBag;

  return (
    <div className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white px-4 py-2.5 shadow-xl transition-all font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Back to Gateway & Brand */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onBackToGateway}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="সব ক্যাটাগরির মেনু খুলুন"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline font-bold">সকল ডেমো হাব</span>
          </button>

          {/* Current Niche Indicator */}
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-300 hidden md:inline">সক্রিয় ডেমো:</span>
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-700">
              <CurrentIcon className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-black text-white">{currentNicheData.nameBn}</span>
            </div>
          </div>
        </div>

        {/* Center/Switching Tabs for Desktop */}
        <div className="hidden lg:flex items-center space-x-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
          {Object.values(niches).map((niche) => {
            const Icon = nicheIcons[niche.id];
            const isActive = activeNiche === niche.id;
            return (
              <button
                key={niche.id}
                type="button"
                onClick={() => {
                  setActiveNiche(niche.id);
                  if (niche.id === 'beauty') navigate('/beauty');
                  else if (niche.id === 'gadgets') navigate('/gadgets');
                  else navigate('/store');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{niche.nameBn}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Mobile Dropdown & Admin Portal Button */}
        <div className="flex items-center space-x-2">
          {/* Mobile Niche Dropdown */}
          <div className="relative lg:hidden">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 flex items-center space-x-1"
            >
              <span>ক্যাটাগরি সুইচ</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-2xl space-y-1 z-50">
                {Object.values(niches).map((niche) => {
                  const Icon = nicheIcons[niche.id];
                  return (
                    <button
                      key={niche.id}
                      type="button"
                      onClick={() => {
                        setActiveNiche(niche.id);
                        setDropdownOpen(false);
                        if (niche.id === 'beauty') navigate('/beauty');
                        else if (niche.id === 'gadgets') navigate('/gadgets');
                        else navigate('/store');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 ${
                        activeNiche === niche.id ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{niche.nameBn}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Admin Dashboard Switcher Button */}
          <Link
            to="/admin"
            className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">লাইভ এডমিন প্যানেল</span>
            <span className="sm:hidden">এডমিন</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
