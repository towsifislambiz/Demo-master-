import React from 'react';
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
                  to={`/footwear/shop?brand=${b.id}`}
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
              <a href={`tel:${FOOTWEAR_BRAND.hotline}`} className="font-mono font-black text-sm text-orange-400 hover:underline">
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
