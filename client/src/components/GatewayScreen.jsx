import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Zap, ShieldCheck, Smartphone, 
  ExternalLink, ShieldAlert, X
} from 'lucide-react';

import gadgetEarbuds from '../assets/gadgets/earbuds_transparent_anc.webp';

function InteractiveCosmicBackground() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Adaptive particle count for guaranteed 60-120fps with zero lag
    const isMobile = width < 768;
    const particleCount = isMobile ? 20 : 40;

    const colors = ['#06b6d4', '#f472b6', '#10b981', '#f59e0b', '#a855f7', '#ffffff'];
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.5 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Draw faint constellation connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap edges smoothly
        if (p1.x < -10) p1.x = width + 10;
        else if (p1.x > width + 10) p1.x = -10;
        if (p1.y < -10) p1.y = height + 10;
        else if (p1.y > height + 10) p1.y = -10;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 10000) { // 100px max distance
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 100) * 0.15;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle node
        const pulse = Math.sin(time * p1.pulseSpeed * 50 + p1.pulseOffset);
        const currentAlpha = Math.max(0.1, p1.baseAlpha + pulse * 0.2);

        ctx.fillStyle = p1.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-0 overflow-hidden w-full max-w-full">
      {/* 1. Interactive Mouse Spotlight Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.08), transparent 65%)`
        }}
      />

      {/* 2. Three GPU-Accelerated Cosmic Aurora Floating Orbs */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-600/15 blur-[140px] animate-aurora-1 pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full bg-pink-600/12 blur-[150px] animate-aurora-2 pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-[550px] h-[550px] rounded-full bg-emerald-600/12 blur-[150px] animate-aurora-3 pointer-events-none" />

      {/* 3. Subtle Cyber Dot Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />

      {/* 4. Futuristic 3D Perspective Cyber Floor Grid at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none overflow-hidden opacity-30 [perspective:700px]">
        <div className="w-full h-full [transform:rotateX(62deg)] [transform-origin:bottom] animate-cyber-grid bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_top,black_25%,transparent_95%)]" />
      </div>

      {/* 5. Cosmic Shooting Meteors */}
      <div className="absolute top-8 right-12 w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-meteor-1 pointer-events-none opacity-0" />
      <div className="absolute top-28 right-1/3 w-36 h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-meteor-2 pointer-events-none opacity-0" />

      {/* 6. Lightweight Lag-Free Canvas Particle Constellation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />
    </div>
  );
}

export default function GatewayScreen({ onSelectNiche }) {
  const [hoveredCard, setHoveredCard] = useState('clothing');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const categories = [
    {
      id: 'clothing',
      brandName: 'SHELAI BURO',
      brandTagBn: 'লাক্সারি ফ্যাশন ও বুটিক',
      nameBn: 'ফ্যাশন ও বুটিক',
      nameEn: 'Luxury Ethnic & Modern Couture',
      accentColor: '#10b981',
      borderClass: 'border-emerald-500/40 hover:border-emerald-400',
      activeBorderClass: 'border-emerald-400',
      glowNormal: 'shadow-[0_0_20px_rgba(16,185,129,0.18)]',
      glowActive: 'shadow-[0_0_35px_rgba(16,185,129,0.55),0_0_70px_rgba(16,185,129,0.25)]',
      haloGradient: 'from-emerald-500/40 via-teal-400/25 to-emerald-600/30',
      pillBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      btnGrad: 'from-emerald-500 to-teal-600 text-slate-950 font-black hover:from-emerald-400 hover:to-teal-500',
      image: '/fashion-images/Model_wearing_Banarasi_silk_saree_20261026161927.webp',
      badge: '২৮+ কালেকশন',
      heroHighlight: 'বেনারসি ও জামদানি ড্রেস',
      features: ['👗 সাইজ ও কালার চিপস', '🔍 ২.৫x মেগা জুম', '⚡ ক্যাশ অন ডেলিভারি'],
      adminUrl: '/admin',
      adminName: 'Shelai Admin'
    },
    {
      id: 'beauty',
      brandName: 'RiBANA ORGANIC',
      brandTagBn: 'অরগানিক স্কিন ও হেয়ার কেয়ার',
      nameBn: 'বিউটি ও স্কিনকেয়ার',
      nameEn: 'Pure Handmade Skin & Hair Care',
      accentColor: '#f472b6',
      borderClass: 'border-pink-500/40 hover:border-pink-400',
      activeBorderClass: 'border-pink-400',
      glowNormal: 'shadow-[0_0_20px_rgba(244,114,182,0.18)]',
      glowActive: 'shadow-[0_0_35px_rgba(244,114,182,0.55),0_0_70px_rgba(244,114,182,0.25)]',
      haloGradient: 'from-pink-500/40 via-rose-400/25 to-fuchsia-600/30',
      pillBg: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
      btnGrad: 'from-pink-500 to-rose-600 text-white font-black hover:from-pink-400 hover:to-rose-500',
      image: '/beauty-images/Saffron_soap_and_serum_display_20261027235409.webp',
      badge: '১০০% কোল্ড-প্রসেস্ড',
      heroHighlight: 'জাফরান গোট মিল্ক সিরাম',
      features: ['🌿 ন্যাচারাল ইনগ্রেডিয়েন্টস', '✨ স্কিন বেনিফিটস ফিল্টার', '📦 কম্বো প্যাক কার্ট'],
      adminUrl: '/beauty/admin',
      adminName: 'RiBANA Admin'
    },
    {
      id: 'gadgets',
      brandName: 'ShopT CYBER GEAR',
      brandTagBn: 'নেক্সট-জেন স্মার্ট গ্যাজেটস',
      nameBn: 'স্মার্ট গ্যাজেটস',
      nameEn: 'Next-Gen Audio, Wearables & Tech',
      accentColor: '#06b6d4',
      borderClass: 'border-cyan-500/40 hover:border-cyan-400',
      activeBorderClass: 'border-cyan-400',
      glowNormal: 'shadow-[0_0_22px_rgba(6,182,212,0.2)]',
      glowActive: 'shadow-[0_0_40px_rgba(6,182,212,0.65),0_0_80px_rgba(6,182,212,0.3)]',
      haloGradient: 'from-cyan-500/40 via-blue-500/25 to-indigo-600/30',
      pillBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      btnGrad: 'from-cyan-400 to-blue-600 text-slate-950 font-black hover:from-cyan-300 hover:to-blue-500',
      image: gadgetEarbuds,
      badge: '২৪+ গ্যাজেট',
      heroHighlight: 'ট্রান্সপারেন্ট ANC ইয়ারবাডস',
      features: ['⚡ ১ বছর ওয়ারেন্টি', '⏱️ ফ্ল্যাশ সেল টাইমার', '🎧 লাইভ অডিও স্পেকস'],
      adminUrl: '/gadgets/admin',
      adminName: 'ShopT Admin'
    },
    {
      id: 'organic',
      brandName: 'GHORER BAZAR',
      brandTagBn: 'খাঁটি পুষ্টিকর অর্গানিক ফুড',
      nameBn: 'অর্গানিক ফুড ও মধু',
      nameEn: 'Pure Mustard Oil, Ghee & Honey',
      accentColor: '#f59e0b',
      borderClass: 'border-amber-500/40 hover:border-amber-400',
      activeBorderClass: 'border-amber-400',
      glowNormal: 'shadow-[0_0_20px_rgba(245,158,11,0.18)]',
      glowActive: 'shadow-[0_0_35px_rgba(245,158,11,0.55),0_0_70px_rgba(245,158,11,0.25)]',
      haloGradient: 'from-amber-500/40 via-yellow-400/25 to-orange-600/30',
      pillBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      btnGrad: 'from-amber-400 to-orange-500 text-slate-950 font-black hover:from-amber-300 hover:to-orange-400',
      image: '/organic-images/Glass_jar_filled_with_honey_a0f0a2a1.webp',
      badge: '১০০% খাঁটি নিশ্চয়তা',
      heroHighlight: 'সুন্দরবনের খাঁটি কাঁচা মধু',
      features: ['🍯 ন্যাচারাল চাকের মধু', '🌱 কোল্ড প্রেস সরিষার তেল', '⚡ ১-ক্লিক ফাস্ট অর্ডার'],
      adminUrl: '/organic/admin',
      adminName: 'Ghorer Bazar Admin'
    },
    {
      id: 'footwear',
      brandName: 'KICKSCRAFT BD',
      brandTagBn: 'অফিসিয়াল হাইপ স্নিকার্স',
      nameBn: 'স্নিকার্স ও ফুটওয়্যার',
      nameEn: 'Nike, Adidas & Hyped Kicks',
      accentColor: '#f97316',
      borderClass: 'border-orange-500/40 hover:border-orange-400',
      activeBorderClass: 'border-orange-400',
      glowNormal: 'shadow-[0_0_20px_rgba(249,115,22,0.18)]',
      glowActive: 'shadow-[0_0_35px_rgba(249,115,22,0.55),0_0_70px_rgba(249,115,22,0.25)]',
      haloGradient: 'from-orange-500/40 via-red-500/25 to-amber-600/30',
      pillBg: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
      btnGrad: 'from-orange-500 to-red-600 text-white font-black hover:from-orange-400 hover:to-red-500',
      image: '/footwear-images/Retro_basketball_sneaker_studio___8667b319.webp',
      badge: '২৪টি অফিশিয়াল ড্রপ',
      heroHighlight: 'এয়ার জর্ডান ১ রেট্রো শিকাগো',
      features: ['👟 EU ৪০-৪৪ সাইজ চিপস', '🔍 ২.২x মাউস জুম লেন্স', '📊 ফিল্টার শপ ক্যাটালগ'],
      adminUrl: '/footwear/admin',
      adminName: 'KicksCraft Admin'
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col justify-between overflow-x-hidden w-full max-w-full relative select-none font-sans">
      
      {/* Ultra High-End Lag-Free Cosmic Animated Background */}
      <InteractiveCosmicBackground />

      {/* Top Navigation Bar - Floating Frosted Glassmorphism Capsule ("Glassy Vibes") */}
      <header className="relative z-30 max-w-7xl mx-auto w-full px-2.5 sm:px-6 pt-2.5 sm:pt-4">
        <div className="w-full px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-slate-900/50 backdrop-blur-2xl border border-white/[0.12] shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.18)] flex items-center justify-between transition-all duration-300 hover:border-white/20 hover:bg-slate-900/60">
          
          {/* Brand Logo & Monogram */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-500 p-[1.5px] shadow-[0_0_15px_rgba(99,102,241,0.5)] shrink-0">
              <div className="w-full h-full bg-[#030712] rounded-[6.5px] sm:rounded-[10px] flex items-center justify-center">
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 text-sm sm:text-xl leading-none">
                  W
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="font-black text-xs sm:text-base tracking-wider text-white whitespace-nowrap">
                WEBCRAFT
              </span>
              <span className="px-1 sm:px-1.5 py-0.2 rounded text-[8px] sm:text-[9px] font-black bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 uppercase tracking-tight whitespace-nowrap">
                PRO
              </span>
            </div>
          </div>

          {/* Center: Live Platform Badge inside Glass Pill (Desktop/Tablet) */}
          <div className="hidden lg:flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 shadow-inner backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-xs font-bold text-slate-200 whitespace-nowrap">
              ৫টি নিশের সম্পূর্ণ আলাদা ডিজাইন ও আর্কিটেকচার
            </span>
          </div>

          {/* Right Actions: Central Admin Modal & Live Indicator */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 hover:border-cyan-400/50 text-slate-100 hover:text-white text-[11px] sm:text-xs font-bold transition-all shadow-sm cursor-pointer backdrop-blur-md whitespace-nowrap shrink-0 active:scale-95"
              title="অ্যাডমিন কন্ট্রোল হাব"
            >
              <ShieldAlert className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 shrink-0" />
              <span className="whitespace-nowrap tracking-tight">অ্যাডমিন হাব</span>
            </button>

            <div className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10.5px] sm:text-xs font-bold backdrop-blur-md shadow-sm whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399] shrink-0" />
              <span className="whitespace-nowrap tracking-tight">৫টি লাইভ</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Showcase Section - 100% Vertical Flow with ZERO Horizontal Scroll */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-3.5 sm:px-6 py-5 sm:py-8 flex flex-col items-center justify-center my-auto">
        
        {/* Hero Header Area */}
        <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-8 max-w-3xl mx-auto text-center">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-0.8 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Enterprise Multi-Niche D2C Solution 2026
            </span>
          </div>

          {/* Master Glowing Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2] sm:leading-tight"
          >
            <span className="text-white drop-shadow-sm">আপনার বিজনেসের </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400 animate-gradient-x drop-shadow-[0_0_35px_rgba(249,115,22,0.35)]">
              ক্যাটাগরি বেছে নিন
            </span>
          </motion.h1>

          <p className="text-slate-400 text-xs sm:text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
            সরাসরি সম্পূর্ণ লাইভ ওয়েবসাইট দেখতে ক্যাটাগরিতে ক্লিক করুন • মোবাইল ও পিসিতে ১০০% রেসপনসিভ
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PURE RESPONSIVE GRID (ZERO HORIZONTAL SCROLL GUARANTEED ON EVERY DEVICE)  */}
        {/* Desktop: 5 Cols | Tablet: 3 Cols | Mobile: 2 Cols + Wide Featured 5th Card*/}
        {/* ========================================================================= */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-4 w-full">
            {categories.map((cat, idx) => {
              const isFifthCard = idx === 4;
              const isHovered = hoveredCard === cat.id;

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  onClick={() => onSelectNiche(cat.id)}
                  onMouseEnter={() => setHoveredCard(cat.id)}
                  className={`group relative rounded-[20px] sm:rounded-[26px] border-2 ${
                    isHovered ? cat.activeBorderClass : cat.borderClass
                  } ${cat.glowNormal} hover:${cat.glowActive} bg-[#070e1e]/90 backdrop-blur-xl p-2.5 sm:p-4 flex flex-col justify-between text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden ${
                    isFifthCard ? 'col-span-2 md:col-span-1 xl:col-span-1' : 'col-span-1'
                  }`}
                >
                  
                  {/* Subtle 360-degree color bloom on hover */}
                  {isHovered && (
                    <div 
                      className={`absolute -inset-2.5 rounded-[30px] bg-gradient-to-r ${cat.haloGradient} opacity-50 blur-xl -z-10 pointer-events-none transition-opacity duration-300`} 
                    />
                  )}

                  {/* Standard Card Layout */}
                  <div className={isFifthCard ? "flex flex-col sm:flex-col md:flex-col justify-between h-full min-w-0" : "flex flex-col justify-between h-full min-w-0"}>
                    
                    <div className="min-w-0">
                      {/* Top Brand Header */}
                      <div className="flex items-center justify-between gap-1 mb-2 sm:mb-2.5">
                        <span className="text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors truncate">
                          {cat.brandName}
                        </span>
                        <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[7.5px] sm:text-[9px] font-bold border truncate shrink-0 ${cat.pillBg}`}>
                          {cat.badge}
                        </span>
                      </div>

                      {/* 3D Floating Product Showcase Window */}
                      <div className="relative aspect-[16/11] w-full rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/[0.06] to-black/40 border border-white/10 overflow-hidden p-1.5 sm:p-2 flex items-center justify-center shadow-inner group-hover:border-white/20 transition-all duration-300">
                        
                        {/* Radial Accent Glow behind Product */}
                        <div 
                          className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                          style={{ backgroundColor: cat.accentColor }}
                        />

                        {/* Real Showcase Product Cutout */}
                        <img
                          src={cat.image}
                          alt={cat.nameEn}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.85)] group-hover:scale-108 group-hover:-rotate-2 group-hover:-translate-y-1 transition-all duration-500 ease-out relative z-10"
                        />

                        {/* Micro Highlight Pill */}
                        <div className="absolute bottom-1 sm:bottom-1.5 left-1 sm:left-1.5 z-20">
                          <span className="px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-md text-[7.5px] sm:text-[9px] font-bold text-slate-200 border border-white/10 shadow-sm truncate max-w-[105px] sm:max-w-[130px] inline-block">
                            {cat.heroHighlight}
                          </span>
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="space-y-0.5 my-2 sm:my-3 min-w-0">
                        <h3 className="text-[13px] sm:text-base lg:text-lg font-black text-white tracking-wide leading-snug group-hover:text-cyan-300 transition-colors truncate">
                          {cat.nameBn}
                        </h3>
                        <p className="text-[9.5px] sm:text-[11px] text-slate-400 line-clamp-1 font-medium truncate">
                          {cat.nameEn}
                        </p>
                      </div>

                      {/* Key Features Chips */}
                      <div className="space-y-1 mb-2.5 sm:mb-3">
                        {cat.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[8.5px] sm:text-[10px] text-slate-300 font-medium truncate">
                            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: cat.accentColor }} />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80 mt-auto min-w-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectNiche(cat.id);
                        }}
                        className={`w-full py-2 px-2 rounded-xl bg-gradient-to-r ${cat.btnGrad} text-[10.5px] sm:text-xs shadow-md flex items-center justify-center gap-1 sm:gap-1.5 transition-transform active:scale-95 cursor-pointer truncate`}
                      >
                        <span className="truncate">লাইভ স্টোর দেখুন</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
                      </button>

                      <a
                        href={cat.adminUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-0.5 text-center block text-[8.5px] sm:text-[10px] font-mono text-slate-400 hover:text-white transition-colors truncate"
                      >
                        ⚡ অ্যাডমিন ড্যাশবোর্ড ➔
                      </a>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Bottom Architectural Trust Bar - Matching Floating Glassmorphism Capsule */}
      <footer className="relative z-30 max-w-7xl mx-auto w-full px-3 sm:px-6 pb-3 sm:pb-4">
        <div className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl sm:rounded-full bg-slate-900/40 backdrop-blur-2xl border border-white/[0.1] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.12)] flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-bold text-slate-300 text-[11px] sm:text-xs">WebCraft BD Enterprise D2C Engine</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-slate-500 text-[11px]">v2.6 Multi-Niche Live</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] font-mono">
            <span className="flex items-center gap-1 text-slate-400">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>&lt;০.৮ সে. স্পিড</span>
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>বিকাশ/সিওডি রেডি</span>
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Smartphone className="w-3 h-3 text-cyan-400" />
              <span>১০০% রেসপনসিভ</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Central Admin Hub Floating Modal */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-[#0b1329] border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base">সেন্ট্রাল অ্যাডমিন কন্ট্রোল হাব</h3>
                    <p className="text-xs text-slate-400">যেকোনো নিশের অ্যাডমিন প্যানেল ১-ক্লিকে টেস্ট করুন</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Demo Credentials Alert */}
              <div className="my-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-200 flex items-center justify-between">
                <div>
                  <span className="font-bold block">ডেমো লগইন তথ্য:</span>
                  <span className="font-mono text-[11px] text-slate-300">admin@demo.com / admin123</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                  1-Click Auto Login
                </span>
              </div>

              {/* 5 Admin Route Cards */}
              <div className="space-y-2">
                {categories.map((cat) => (
                  <a
                    key={cat.id}
                    href={cat.adminUrl}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.accentColor }} />
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {cat.adminName}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-mono">{cat.brandTagBn}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-white">
                      <span>প্রবেশ করুন</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 text-center">
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
