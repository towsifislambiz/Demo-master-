import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Zap, Flame, ShieldCheck, 
  ArrowRight, Sparkles, Tag, ShoppingBag, CheckCircle2, 
  Star, Award 
} from 'lucide-react';
import { FOOTWEAR_HERO_BANNERS } from '../../data/footwearData';

export default function KicksCraftHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const totalSlides = FOOTWEAR_HERO_BANNERS.length;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const banner = FOOTWEAR_HERO_BANNERS[currentSlide];

  // Specific glow colors for each slide to create cinematic ambiance
  const slideGlows = [
    'from-orange-500/20 via-[#FF4800]/15 to-transparent',
    'from-cyan-500/20 via-orange-500/15 to-transparent',
    'from-amber-600/20 via-yellow-500/10 to-transparent',
    'from-rose-500/20 via-amber-500/15 to-transparent',
    'from-emerald-500/20 via-stone-500/15 to-transparent'
  ];

  return (
    <section 
      className="relative w-full bg-[#070A0F] text-white overflow-hidden select-none font-sans border-b border-orange-500/20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Cinematic Background Mesh & Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-gradient-to-br ${slideGlows[currentSlide]} transition-all duration-1000`} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] bg-orange-600/10" />
        
        {/* Subtle Cyber Grid Lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      {/* 2. Main Hero Content Stage */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 lg:pt-14 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Specs & High-Impact Order Actions (7 cols) */}
          <div className="lg:col-span-6 xl:col-span-6 z-10 order-2 lg:order-1 space-y-4 sm:space-y-5">
            
            {/* Top Glowing Status Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/25 to-amber-500/15 border border-orange-500/40 text-orange-400 text-xs font-black tracking-wide shadow-lg shadow-orange-500/10 backdrop-blur-md">
                <Flame className="w-4 h-4 text-[#FF4800] animate-pulse" />
                <span>{banner.badge}</span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 text-[11px] font-mono border border-slate-700">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>DROP #0{currentSlide + 1}</span>
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-black tracking-tight leading-[1.12] text-white">
                {banner.headline.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF4800] to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                  {banner.headline.split(' ').slice(-2).join(' ')}
                </span>
              </h1>

              {/* Sub-headline & Colorway Badge */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs sm:text-sm font-bold text-orange-400 font-mono tracking-wide">
                  {banner.headlineEn}
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800/90 text-slate-300 border border-slate-700">
                  {banner.colorway}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {banner.description}
            </p>

            {/* Technical Specs Feature Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {banner.specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold bg-slate-900/90 text-slate-200 border border-slate-800 hover:border-orange-500/40 transition-colors shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4800]" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* Pricing Section & Direct CTAs */}
            <div className="pt-2 sm:pt-3 space-y-3">
              <div className="flex flex-wrap items-baseline gap-3">
                <div className="flex items-baseline gap-2.5 bg-slate-900/95 border border-orange-500/35 px-4 py-2.5 rounded-2xl shadow-xl">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#FF4800] tracking-tight">
                    ৳{banner.price.toLocaleString('en-US')}
                  </span>
                  <span className="text-sm sm:text-base text-slate-400 line-through font-mono">
                    ৳{banner.originalPrice.toLocaleString('en-US')}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-black rounded-lg bg-[#FF4800] text-white shadow-sm">
                    -{banner.discountPercent}% ছাড়
                  </span>
                </div>
                <span className="text-xs text-emerald-400 font-bold hidden sm:inline">
                  ✓ ৳{(banner.originalPrice - banner.price).toLocaleString('en-US')} সাশ্রয় হচ্ছে!
                </span>
              </div>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => navigate('/footwear/shop')}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#FF4800] via-[#FF5500] to-[#FF6B00] hover:from-[#E03A00] hover:to-[#FF4800] text-white font-black text-xs sm:text-sm flex items-center gap-2.5 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 active:scale-95 transition-all cursor-pointer group"
                >
                  <Zap className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                  <span>সরাসরি ক্যাশ অন ডেলিভারি অর্ডার</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/footwear/shop')}
                  className="px-5 py-3.5 sm:py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700/80 hover:border-slate-500 transition-all cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-orange-400" />
                  <span>কালেকশন দেখুন</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Expansive Cinematic Sneaker Showcase (6 cols) */}
          <div className="lg:col-span-6 xl:col-span-6 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-xl group">
              
              {/* Outer Atmospheric Aura */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#FF4800]/40 via-amber-500/20 to-orange-600/40 blur-xl opacity-75 group-hover:opacity-100 transition duration-700" />

              {/* Main Showcase Frame */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/70 shadow-2xl">
                
                {/* Sneaker Image */}
                <img
                  src={banner.image}
                  alt={banner.headlineEn}
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F]/90 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Top Authentic Badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex items-center gap-2">
                  <div className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>AUTHENTIC HERITAGE</span>
                  </div>
                </div>

                {/* Floating Bottom Left Tag */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-10">
                  <span className="px-3 py-1 rounded-xl bg-[#FF4800] text-white text-xs font-black uppercase tracking-wider shadow-lg">
                    {banner.tag}
                  </span>
                </div>

                {/* Floating Bottom Right Specs */}
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-10 hidden sm:flex items-center gap-1 text-[11px] font-mono font-bold text-white/90 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>TOP RATED 4.9 ★</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Interactive 5-Banner Mini Preview Cards (Replaces boring dots!) */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>এক্সক্লুসিভ ৫টি ড্রপস ব্রাউজ করুন</span>
            </span>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="w-9 h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                aria-label="পূর্ববর্তী স্লাইড"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-9 h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                aria-label="পরবর্তী স্লাইড"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5 Interactive Thumbnail Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {FOOTWEAR_HERO_BANNERS.map((item, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`group relative p-2.5 rounded-xl text-left transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-[#FF4800] shadow-lg shadow-orange-500/20'
                      : 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-700 bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.headlineEn}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <span className={`text-[10px] font-mono font-bold block leading-none mb-1 ${
                      isActive ? 'text-orange-400' : 'text-slate-500'
                    }`}>
                      0{idx + 1} • {item.tag}
                    </span>
                    <h4 className={`text-xs font-bold truncate leading-tight ${
                      isActive ? 'text-white' : 'text-slate-300'
                    }`}>
                      {item.headline.split(' ').slice(0, 3).join(' ')}
                    </h4>
                  </div>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#FF4800] rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
