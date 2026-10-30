// Master Multi-Niche Storefront & Product Catalog
// Carefully separated: zero category cross-mixing, authentic real-world products & high-res photography

export const NICHES = {
  clothing: {
    id: 'clothing',
    name: 'Fashion & Clothing',
    nameBn: 'প্রিমিয়াম ফ্যাশন ও বুটিক',
    tagline: 'সৌন্দর্য ও আভিজাত্যের নিখুঁত মেলবন্ধন',
    heroTitle: 'লন্ডন ও দুবাই কালেকশনের এক্সক্লুসিভ লাক্সারি ওয়্যার',
    heroSubtitle: 'খাঁটি জর্জেট, দুবাই চেরি সিল্ক ও পিওর কটন ফেব্রিকের নিখুঁত কারুকাজ। আধুনিক নারীদের জন্য সেরা স্টাইল।',
    reference: 'Shelai.com.bd Style',
    theme: {
      primary: '#064e3b', // Deep Emerald
      accent: '#d97706',  // Amber Gold
      headerBg: 'bg-emerald-950',
      heroGradient: 'from-emerald-950 via-slate-950 to-emerald-950',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      accentButton: 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950'
    },
    usp: [
      { icon: 'Sparkles', title: '১০০% অরিজিনাল ফেব্রিক', desc: 'দুবাই চেরি ও প্রিমিয়াম জর্জেট' },
      { icon: 'Ruler', title: 'লাইভ সাইজ গাইড', desc: '৩৮ থেকে ৪৮ ইঞ্চি বডি মাপ' },
      { icon: 'Truck', title: 'ক্যাশ অন ডেলিভারি', desc: 'দেখে নেওয়ার সুবিধা' }
    ],
    products: [
      {
        id: 'cloth-1',
        title: 'রয়্যাল এমব্রয়ডারি দুবাই চেরি সিল্ক আবায়া',
        category: 'clothing',
        price: 3850,
        originalPrice: 4800,
        discount: '২০% ছাড়',
        rating: 4.9,
        reviewsCount: 128,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80'
        ],
        sizes: ['38', '40', '42', '44', '46'],
        colors: [
          { name: 'মিডনাইট ব্ল্যাক', hex: '#0f172a' },
          { name: 'এমেরাল্ড গ্রিন', hex: '#064e3b' },
          { name: 'রয়্যাল মেরুন', hex: '#831843' }
        ],
        fabric: 'অরিজিনাল দুবাই চেরি সিল্ক',
        work: 'হাতে করা সুক্ষ্ম জারি এমব্রয়ডারি ও স্টোন ওয়ার্ক',
        shortDesc: 'হাতে করা সূক্ষ্ম স্টোন ওয়ার্ক এবং খাঁটি দুবাই চেরি কাপড়ে তৈরি রাজকীয় আবায়া। পার্টি ও দৈনন্দিন ব্যবহারের জন্য অত্যন্ত আরামদায়ক।'
      },
      {
        id: 'cloth-2',
        title: 'লাক্সারি হ্যান্ড-ক্রাফটেড প্রিমিয়াম সিল্ক পাঞ্জাবি',
        category: 'clothing',
        price: 2950,
        originalPrice: 3600,
        discount: '১৮% ছাড়',
        rating: 4.8,
        reviewsCount: 94,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80',
        sizes: ['40', '42', '44', '46'],
        colors: [
          { name: 'আইভরি হোয়াইট', hex: '#f8fafc' },
          { name: 'নেভি ব্লু', hex: '#1e3a8a' },
          { name: 'অলিভ গোল্ড', hex: '#65a30d' }
        ],
        fabric: 'পিওর রেমি কটন ও সিল্ক ব্লেন্ড',
        work: 'ম্যান্ডারিন কলার কাফ এমব্রয়ডারি',
        shortDesc: 'উৎসব ও জুমার নামাজের জন্য প্রিমিয়াম ডিজাইনার পাঞ্জাবি। সফট ব্রিদেবল কাপড় ও আন্তর্জাতিক মানের ফিটিংস।'
      },
      {
        id: 'cloth-3',
        title: 'ফ্লোরাল ডিজাইনার অর্গানজা পার্টি থ্রি-পিস',
        category: 'clothing',
        price: 4200,
        originalPrice: 5500,
        discount: '২৪% ছাড়',
        rating: 4.9,
        reviewsCount: 156,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&auto=format&fit=crop&q=80',
        sizes: ['38', '40', '42', '44'],
        colors: [
          { name: 'পেস্টেল পিংক', hex: '#f472b6' },
          { name: 'স্কাই ব্লু', hex: '#38bdf8' }
        ],
        fabric: 'ডিজিটাল প্রিন্টেড পিওর অর্গানজা',
        work: 'গ্লিটার সিকুইন ও কাটওয়ার্ক ওড়না',
        shortDesc: 'আধুনিক ট্রেন্ডি কালার ও জমকালো অর্গানজা ওড়না সহ কমপ্লিট পার্টি সেট। গায়েহলুদ ও ওয়েডিং রিসেপশনের বেস্ট চয়েস।'
      },
      {
        id: 'cloth-4',
        title: 'মিনিমালিস্ট এলিগেন্ট রেয়ন কুর্তি ও প্লাজো সেট',
        category: 'clothing',
        price: 1850,
        originalPrice: 2400,
        discount: '২৩% ছাড়',
        rating: 4.7,
        reviewsCount: 81,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&auto=format&fit=crop&q=80',
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: [
          { name: 'মাস্টার্ড ইয়েলো', hex: '#eab308' },
          { name: 'টি-গ্রিন', hex: '#14b8a6' }
        ],
        fabric: '১০০% প্রিমিয়াম সুতি রেয়ন',
        work: 'থ্রেড বাটন ও লেস ফিনিশিং',
        shortDesc: 'অফিস, ভার্সিটি ও ক্যাজুয়াল আউটিংয়ের জন্য সারাদিন পরার মতো সুপার কমফোর্টেবল কুর্তি সেট।'
      },
      {
        id: 'cloth-5',
        title: 'এক্সক্লুসিভ ঢাকাই মসলিন সিল্ক শাড়ি',
        category: 'clothing',
        price: 6500,
        originalPrice: 8500,
        discount: '২৩% ছাড়',
        rating: 5.0,
        reviewsCount: 67,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop&q=80',
        sizes: ['১২ হাত স্ট্যান্ডার্ড'],
        colors: [
          { name: 'রয়্যাল রেড', hex: '#dc2626' },
          { name: 'ডিপ ম্যাজেন্টা', hex: '#c026d3' }
        ],
        fabric: 'শতভাগ আদি ঢাকাই মসলিন সিল্ক',
        work: 'অল-ওভার হ্যান্ডলুম জারি মোটিফ',
        shortDesc: 'ঐতিহ্যবাহী বুনন শৈলী ও প্রিমিয়াম জারি পাড়ের মসলিন শাড়ি। পারিবারিক যেকোনো জমকালো অনুষ্ঠানের মধ্যমণি।'
      },
      {
        id: 'cloth-6',
        title: 'ভিক্টোরিয়ান ভেলভেট ব্লেজার ও ট্রাউজার সুট',
        category: 'clothing',
        price: 5200,
        originalPrice: 6800,
        discount: '২৪% ছাড়',
        rating: 4.8,
        reviewsCount: 42,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=1000&auto=format&fit=crop&q=80',
        sizes: ['38', '40', '42', '44'],
        colors: [
          { name: 'রয়্যাল ব্লু ভেলভেট', hex: '#1e40af' },
          { name: 'জেট ব্ল্যাক', hex: '#000000' }
        ],
        fabric: 'ইমপোর্টেড ভেলভেট ও সাটিন লাইনিং',
        work: 'ট্যাকটিক্যাল ফিটিংস ও গোল্ডেন বাটন',
        shortDesc: 'শীতকালীন পার্টি ও কর্পোরেট ইভেন্টে প্রিমিয়াম লুক দিতে অসাধারণ ডিজাইনের ভেলভেট স্যুট।'
      }
    ]
  },

  beauty: {
    id: 'beauty',
    name: 'Beauty & Skincare',
    nameBn: 'অর্গানিক স্কিনকেয়ার ও বিউটি',
    tagline: 'প্রাকৃতিক উপাদানে নিখুঁত উজ্জ্বলতার নিশ্চয়তা',
    heroTitle: 'ডার্মাটোলজিস্ট অনুমোদিত ১০০% খাঁটি স্কিন সল্যুশন',
    heroSubtitle: 'কোনো ক্ষতিকারক কেমিক্যাল ছাড়া ক্যাস্টাইল সোপ, জাফরান গোট মিল্ক ও ভিটামিন সি সিরাম দিয়ে ত্বকের স্থায়ী যত্ন নিন।',
    reference: 'Ribana.com.bd Style',
    theme: {
      primary: '#9d174d', // Deep Rose
      accent: '#f43f5e',  // Rose Gold
      headerBg: 'bg-rose-950',
      heroGradient: 'from-rose-950 via-slate-950 to-pink-950',
      badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      buttonBg: 'bg-rose-600 hover:bg-rose-500 text-white',
      accentButton: 'bg-gradient-to-r from-rose-400 to-pink-500 text-white'
    },
    usp: [
      { icon: 'ShieldCheck', title: '১০০% কেমিক্যাল ফ্রি', desc: 'বিএসটিআই ও ল্যাব সার্টিফাইড' },
      { icon: 'Heart', title: 'ত্বকের ধরন অনুযায়ী', desc: 'অয়েলি, ড্রাই ও একনে প্রোন' },
      { icon: 'Award', title: '৭ দিনে দৃশ্যমান ফল', desc: 'হাজারো সন্তুষ্ট কাস্টমার' }
    ],
    products: [
      {
        id: 'beauty-1',
        title: 'জাফরান ও গোট মিল্ক ব্রাইটনিং অর্গানিক সোপ',
        category: 'beauty',
        price: 950,
        originalPrice: 1200,
        discount: '২১% ছাড়',
        rating: 4.9,
        reviewsCount: 340,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1607006314644-884d63d08593?w=1000&auto=format&fit=crop&q=80',
        weight: '১০০ গ্রাম',
        skinType: 'সব ধরনের ত্বক (All Skin Types)',
        ingredients: 'কাশ্মীরি জাফরান, পিওর গোট মিল্ক, এক্সট্রা ভার্জিন অলিভ অয়েল',
        benefits: 'ত্বকের কালো দাগ দূর করে প্রাকৃতিক উজ্জ্বলতা ও মসৃণতা ফিরিয়ে আনে।',
        shortDesc: 'হাতে তৈরি খাঁটি জাফরান ও ছাগলের দুধের মিশ্রণে প্রস্তুত সাবান। সানবার্ন ও মেছতার দাগ হালকা করতে জাদুকরী ভূমিকা রাখে।'
      },
      {
        id: 'beauty-2',
        title: 'নিয়াসিনামাইড ১০% + জিংক ১% গ্লো বুস্টিং সিরাম',
        category: 'beauty',
        price: 1350,
        originalPrice: 1750,
        discount: '২৩% ছাড়',
        rating: 5.0,
        reviewsCount: 215,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1000&auto=format&fit=crop&q=80',
        weight: '৩০ মিলি',
        skinType: 'অয়েলি ও একনে-প্রোন ত্বক',
        ingredients: '১০% পিওর নিয়াসিনামাইড, ১% জিংক পিসিএ, হায়ালুরোনিক এসিড',
        benefits: 'অতিরিক্ত তেল নিঃসরণ কমায় ও লোমকূপ সংকুচিত করে।',
        shortDesc: 'ত্বকের অতিরিক্ত তেল নিয়ন্ত্রণ ও ব্রণের গর্ত ও কালো দাগ দূর করে মসৃণ করতে আন্তর্জাতিক মানের লাইটওয়েট সিরাম।'
      },
      {
        id: 'beauty-3',
        title: 'হায়ালুরোনিক ডিপ হাইড্রেশন ময়েশ্চারাইজিং জেল',
        category: 'beauty',
        price: 1150,
        originalPrice: 1500,
        discount: '২৩% ছাড়',
        rating: 4.8,
        reviewsCount: 168,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1000&auto=format&fit=crop&q=80',
        weight: '৫০ গ্রাম',
        skinType: 'ডিহাইড্রেটেড ও ড্রাই স্কিন',
        ingredients: '৩-লেয়ার হায়ালুরোনিক এসিড, সেন্টেলা এশিয়াটিকা, অ্যালোভেরা জুস',
        benefits: '৭২ ঘণ্টা গভীর ময়েশ্চার লক করে স্কিন ব্যারিয়ার রিপেয়ার করে।',
        shortDesc: 'নন-গ্রিজি ফর্মুলা যা ত্বকে সাথে সাথে শুষে নেয় এবং ত্বককে সারাদিন কাঁচের মতো সতেজ ও ডালনেস-মুক্ত রাখে।'
      },
      {
        id: 'beauty-4',
        title: 'অ্যালো ও টি-ট্রি অয়েল একনে কন্ট্রোল ফেসওয়াশ',
        category: 'beauty',
        price: 650,
        originalPrice: 850,
        discount: '২৪% ছাড়',
        rating: 4.7,
        reviewsCount: 189,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1000&auto=format&fit=crop&q=80',
        weight: '১২০ মিলি',
        skinType: 'সংবেদনশীল ও ব্রণের প্রবণ ত্বক',
        ingredients: 'টি-ট্রি এসেন্সিয়াল অয়েল, নিম এক্সট্র্যাক্ট, অ্যালোভেরা জেল',
        benefits: 'ব্যাকটেরিয়া ধ্বংস করে লালচে ভাব ও নতুন ব্রণ হওয়া বন্ধ করে।',
        shortDesc: 'সালফেট-মুক্ত মৃদু জেল ফেসওয়াশ যা ত্বক অতিরিক্ত শুষ্ক না করেই গভীরে থাকা ময়লা ও জীবাণু পরিষ্কার করে।'
      },
      {
        id: 'beauty-5',
        title: 'আল্ট্রা-লাইট SPF 50+ PA++++ ওয়াটারপ্রুফ সানস্ক্রিন',
        category: 'beauty',
        price: 1250,
        originalPrice: 1600,
        discount: '২২% ছাড়',
        rating: 4.9,
        reviewsCount: 290,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1567928804445-d85c8f42fa2e?w=1000&auto=format&fit=crop&q=80',
        weight: '৫০ মিলি',
        skinType: 'সব ধরনের ত্বকের জন্য উপযোগী',
        ingredients: 'টাইটেনিয়াম ডাই-অক্সাইড, সিরামাইডস, গ্রিন টি নির্যাস',
        benefits: 'কোনো হোয়াইট কাস্ট ছাড়া সূর্যের ক্ষতিকর UVA/UVB থেকে ১২ ঘণ্টা সুরক্ষা।',
        shortDesc: 'কোনো আঠালো ভাব নেই! ঘামে ও পানিতে নষ্ট হয় না। মেকআপের নিচে প্রাইমার হিসেবেও দারুণ কাজ করে।'
      },
      {
        id: 'beauty-6',
        title: 'অর্গানিক কোল্ড-প্রেসড এক্সট্রা ভার্জিন কোকোনাট অয়েল',
        category: 'beauty',
        price: 750,
        originalPrice: 950,
        discount: '২১% ছাড়',
        rating: 4.9,
        reviewsCount: 144,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1608248597359-00994f30ad8a?w=1000&auto=format&fit=crop&q=80',
        weight: '২৫০ মিলি',
        skinType: 'চুল ও ত্বকের গভীর পুষ্টি',
        ingredients: '১০০% র কচি নারিকেলের দুধ থেকে তৈরি ঠান্ডা তেলের নির্যাস',
        benefits: 'চুল পড়া বন্ধ করে ঘন ও রেশমি করে এবং স্কিন ময়েশ্চারাইজার হিসেবে কাজ করে।',
        shortDesc: 'কোনো গন্ধ বা প্রিজারভেটিভ ছাড়া প্রাচীন পদ্ধতিতে তৈরি শতভাগ ভোজ্য ও স্কিন-গ্রেড নারিকেল তেল।'
      }
    ]
  },

  gadgets: {
    id: 'gadgets',
    name: 'Smart Gadgets & Gear',
    nameBn: 'স্মার্ট গ্যাজেট ও ইলেকট্রনিক্স',
    tagline: 'ভবিষ্যতের প্রযুক্তি এখন আপনার হাতের মুঠোয়',
    heroTitle: 'অরিজিনাল স্মার্ট ডিভাইস ও ১ বছরের অফিশিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    heroSubtitle: 'অ্যাক্টিভ নয়েজ ক্যান্সেলেশন এয়ারবাডস, অ্যামোলেড স্মার্টওয়াচ ও ফাস্ট চার্জিং গ্যাজেটে সেরা ক্যাশ অন ডেলিভারি ডিল।',
    reference: 'ShopT Upgraded Cyber Style',
    theme: {
      primary: '#0f172a', // Midnight Cyber
      accent: '#06b6d4',  // Cyber Cyan
      headerBg: 'bg-slate-950',
      heroGradient: 'from-slate-950 via-cyan-950 to-slate-950',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      buttonBg: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold',
      accentButton: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950'
    },
    usp: [
      { icon: 'Zap', title: '১ বছরের রিপ্লেসমেন্ট', desc: 'কোনো ঝামেলা ছাড়াই নতুন প্রোডাক্ট' },
      { icon: 'Shield', title: '১০০% জেনুইন গ্যাজেট', desc: 'অফিশিয়াল বারকোড ভেরিফিকেশন' },
      { icon: 'Clock', title: '২৪ ঘণ্টার মধ্যে ডেলিভারি', desc: 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি' }
    ],
    products: [
      {
        id: 'gadget-1',
        title: 'প্রো-সাউন্ড হাইব্রিড 45dB অ্যাক্টিভ নয়েজ ক্যান্সেলেশন বাডস',
        category: 'gadgets',
        price: 2650,
        originalPrice: 3500,
        discount: '২৪% ছাড়',
        rating: 4.9,
        reviewsCount: 312,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1000&auto=format&fit=crop&q=80',
        specs: {
          anc: '45dB Hybrid ANC + Transparency Mode',
          battery: '40 Hours Playback with Charging Case',
          bluetooth: 'Bluetooth v5.3 (Low Latency 40ms)',
          waterproof: 'IPX5 Sweat & Water Resistance',
          warranty: '১ বছরের অফিশিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি'
        },
        shortDesc: 'হাই-ফাই ডিপ বাস ও আল্ট্রা-ক্লিয়ার কলিং সহ ট্রেন্ডি সাইবার এয়ারবাডস। গেমিং ও মিউজিকের জন্য সেরা সাউন্ড কোয়ালিটি।'
      },
      {
        id: 'gadget-2',
        title: 'আল্ট্রা ২.০৪ ইঞ্চি এইচডি অ্যামোলেড মেটালিক স্মার্টওয়াচ',
        category: 'gadgets',
        price: 3200,
        originalPrice: 4200,
        discount: '২৪% ছাড়',
        rating: 4.8,
        reviewsCount: 198,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1000&auto=format&fit=crop&q=80',
        specs: {
          display: '2.04" Super AMOLED (1000 Nits Brightness)',
          calling: 'HD Bluetooth Calling with Speaker & Mic',
          health: 'SpO2, 24/7 Heart Rate & Sleep Tracker',
          battery: 'Up to 7 Days Normal Use, 15 Days Standby',
          warranty: '১ বছরের রিপ্লেসমেন্ট গ্যারান্টি'
        },
        shortDesc: 'অলওয়েজ-অন ডিসপ্লে, ব্লুটুথ কলিং ও জিংক অ্যালয় বডি সহ আধুনিক প্রিমিয়াম লুকিং স্মার্টওয়াচ।'
      },
      {
        id: 'gadget-3',
        title: '৪কে ইআইএস জিম্বল ক্যামেরা মিনি জিপিএস ড্রোন',
        category: 'gadgets',
        price: 8500,
        originalPrice: 11500,
        discount: '২৬% ছাড়',
        rating: 4.9,
        reviewsCount: 88,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=1000&auto=format&fit=crop&q=80',
        specs: {
          camera: '4K Ultra HD Dual Camera with EIS Gimbal',
          range: '1.2 KM FPV Live Video Transmission',
          battery: '28 Mins Flight Time per Battery',
          features: 'Auto Return to Home, Optical Flow Hover',
          warranty: '৬ মাসের সার্ভিসিং ও পার্টস সাপোর্ট'
        },
        shortDesc: 'সহজে ফোল্ডেবল পকেট ড্রোন। ট্রাভেল ভ্লগিং ও ইউটিউব শুটের জন্য ঝাঁকুনি-মুক্ত ক্রিস্প ৪কে ফুটেজ দিতে সক্ষম।'
      },
      {
        id: 'gadget-4',
        title: '৬৫ ওয়াট GaN সুপারফাস্ট ট্রিপল-পোর্ট অ্যাডাপ্টার',
        category: 'gadgets',
        price: 1850,
        originalPrice: 2400,
        discount: '২৩% ছাড়',
        rating: 4.8,
        reviewsCount: 145,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=1000&auto=format&fit=crop&q=80',
        specs: {
          power: '65W Max Power Delivery 3.0 + QC 4.0',
          ports: '2x Type-C + 1x USB-A (Charge 3 devices)',
          tech: 'Gallium Nitride (GaN) Cool Running Tech',
          compatibility: 'iPhone, Samsung, MacBook & Laptops',
          warranty: '১ বছরের সরাসরি বদল গ্যারান্টি'
        },
        shortDesc: 'ল্যাপটপ, ট্যাবলেট ও মোবাইল একসাথে সুপার স্পিডে চার্জ করার জন্য কমপ্যাক্ট গ্যালিয়াম নাইট্রাইড চার্জার।'
      },
      {
        id: 'gadget-5',
        title: '২০,০০০ mAh ডিজিটাল ডিসপ্লে ৬৫W পাওয়ার ব্যাংক',
        category: 'gadgets',
        price: 2450,
        originalPrice: 3200,
        discount: '২৩% ছাড়',
        rating: 4.9,
        reviewsCount: 220,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=1000&auto=format&fit=crop&q=80',
        specs: {
          capacity: '20000mAh Lithium Polymer Battery',
          output: '65W Fast Charging (Laptop & Phone)',
          display: 'Smart LED Percentage & Wattage Display',
          safety: '9-Layer Circuit Protection against Heat',
          warranty: '১ বছরের অফিশিয়াল ওয়ারেন্টি'
        },
        shortDesc: 'ভ্রমণ ও লোডশেডিংয়ের জন্য আদর্শ পাওয়ার ব্যাংক। স্মার্ট এলইডি ডিসপ্লেতে ব্যাটারির ওয়াট ও পার্সেন্টেজ দেখা যায়।'
      },
      {
        id: 'gadget-6',
        title: 'আরজিবি মেকানিক্যাল ওয়্যারলেস গেমিং কিবোর্ড',
        category: 'gadgets',
        price: 3600,
        originalPrice: 4800,
        discount: '২৫% ছাড়',
        rating: 4.9,
        reviewsCount: 76,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&auto=format&fit=crop&q=80',
        specs: {
          switches: 'Hot-Swappable Red/Blue Mechanical Switches',
          connectivity: 'Tri-Mode: 2.4Ghz + Bluetooth + Type-C',
          rgb: '16.8 Million Colors with 20 RGB Presets',
          battery: '4000mAh Rechargeable (200 Hours)',
          warranty: '১ বছরের ব্র্যান্ড ওয়ারেন্টি'
        },
        shortDesc: 'কাস্টমাইজেবল হট-সোয়াপ সুইচ ও জমকালো ব্যাকলাইট সহ টাইপিং ও গেমিংয়ের সেরা মেকানিক্যাল কিবোর্ড।'
      }
    ]
  },

  organic: {
    id: 'organic',
    name: 'Organic Food & Honey',
    nameBn: 'খাঁটি মধু ও অর্গানিক সুপারফুড',
    tagline: 'প্রকৃতির খাঁটি পুষ্টি আপনার পরিবারের টেবিলে',
    heroTitle: 'সুন্দরবনের ১০০% র কাঁচা মধু ও গাওয়া ঘিয়ের বিশ্বস্ত ঠিকানা',
    heroSubtitle: 'কোনো ভেজাল ও প্রিজারভেটিভ ছাড়া সরাসরি সুন্দরবনের মৌয়ালদের থেকে সংগৃহীত খাঁটি মধু, ড্রপশিপিং বাদ দিয়ে নিজস্ব তত্ত্বাবধানে প্যাকেটজাত।',
    reference: 'GhorerBazar.com Style',
    theme: {
      primary: '#78350f', // Honey Gold Amber
      accent: '#f59e0b',  // Golden Amber
      headerBg: 'bg-amber-950',
      heroGradient: 'from-amber-950 via-slate-950 to-amber-950',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      buttonBg: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold',
      accentButton: 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950'
    },
    usp: [
      { icon: 'CheckCircle', title: 'বিএসটিআই ও ল্যাব টেস্টেড', desc: 'ভেজাল প্রমাণে ১০ গুণ জরিমানা' },
      { icon: 'Shield', title: 'ক্যাশ অন ডেলিভারি', desc: 'খেয়ে পরখ করে টাকা পরিশোধ' },
      { icon: 'Truck', title: '২৪ ঘণ্টায় ঢাকা হোম ডেলিভারি', desc: 'সারা দেশে দ্রুত কুরিয়ার' }
    ],
    products: [
      {
        id: 'food-1',
        title: 'সুন্দরবনের খাঁটি প্রাকৃতিক খলিশা ফুলের কাঁচা মধু',
        category: 'organic',
        price: 950,
        originalPrice: 1200,
        discount: '২১% ছাড়',
        rating: 5.0,
        reviewsCount: 480,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1000&auto=format&fit=crop&q=80',
        weight: '১ কেজি (গ্লাস জার)',
        source: 'সুন্দরবনের গভীরে প্রাকৃতিক মৌচাক',
        purity: '১০০% কাঁচা, অপ্রক্রিয়াজাত ও চিনিমুক্ত',
        shortDesc: 'সুন্দরবনের খলিশা ফুলের মিষ্টি সুবাসযুক্ত কাঁচা মধু। কোনো তাপ ছাড়া সরাসরি বোতলজাত করা হয়, যাতে মধুর এনজাইম অক্ষুণ্ণ থাকে।'
      },
      {
        id: 'food-2',
        title: 'পাবনার খাঁটি সুবাসিত দানাদার গাওয়া ঘি',
        category: 'organic',
        price: 1350,
        originalPrice: 1700,
        discount: '২১% ছাড়',
        rating: 4.9,
        reviewsCount: 310,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=1000&auto=format&fit=crop&q=80',
        weight: '৯০০ গ্রাম জার',
        source: 'পাবনার চারণভূমির দেশি গাভীর কাঁচা দুধ',
        purity: 'শতভাগ ভেজালমুক্ত প্রাচীন ননী জ্বালানো ঘি',
        shortDesc: 'ভাত, পোলাও বা ভর্তায় এক চামচ দিলেই ঘর ভরে উঠবে মাতাল করা ঘ্রাণে। কোনো কৃত্রিম ফ্লেভার বা কেমিক্যাল নেই।'
      },
      {
        id: 'food-3',
        title: 'রয়েল প্রিমিয়াম হানি নাটস (১৫টি ড্রাই ফ্রুটস কম্বো)',
        category: 'organic',
        price: 1150,
        originalPrice: 1450,
        discount: '২১% ছাড়',
        rating: 4.9,
        reviewsCount: 265,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=1000&auto=format&fit=crop&q=80',
        weight: '৭৫০ গ্রাম জার',
        source: 'আমেরিকা ও মধ্যপ্রাচ্যের প্রিমিয়াম বাদাম + সুন্দরবনের মধু',
        purity: 'আখরোট, কাজু, পেস্তা, কাঠবাদাম, খুরমা খেজুর ও তীন ফল',
        shortDesc: 'শরীর ও মনের তাৎক্ষণিক শক্তির পাওয়ারহাউজ। সকালের নাস্তা বা বিকেলে এক চামচ হানি নাটস ক্লান্তি দূর করে পুষ্টি জোগায়।'
      },
      {
        id: 'food-4',
        title: 'কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল',
        category: 'organic',
        price: 450,
        originalPrice: 550,
        discount: '১৮% ছাড়',
        rating: 4.8,
        reviewsCount: 195,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1000&auto=format&fit=crop&q=80',
        weight: '১ লিটার বোতল',
        source: 'উত্তরবঙ্গের দেশি মাঘী সরিষা',
        purity: 'কোল্ড প্রেসড কাঠের ঘানি — ঝাঁজ ও পুষ্টি অক্ষুণ্ণ',
        shortDesc: 'রান্না ও ভর্তায় তীব্র খাঁটি ঝাঁজ। কাঠের ঘানিতে তৈরি হওয়ায় সরিষার পুষ্টিগুণ নষ্ট হয় না।'
      },
      {
        id: 'food-5',
        title: 'প্রিমিয়াম মেডজুল জাম্বো খেজুর (সৌদি আরবের বাছাইকৃত)',
        category: 'organic',
        price: 1450,
        originalPrice: 1850,
        discount: '২২% ছাড়',
        rating: 5.0,
        reviewsCount: 175,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1000&auto=format&fit=crop&q=80',
        weight: '১ কেজি বক্স',
        source: 'মদিনা মুনাওয়ারা, সৌদি আরব',
        purity: 'শতভাগ মিষ্টি রসাল ও নরম চামড়া',
        shortDesc: 'মধুসম মিষ্টি ও ক্যারামেল স্বাদের রাজা মেডজুল খেজুর। সম্পূর্ণ রাসায়নিক মুক্ত এবং এয়ার-টাইট বক্সে সিল করা।'
      },
      {
        id: 'food-6',
        title: '১০০% পিওর অস্ট্রেলিয়ান চিয়া সিডস ও তিসির বীজ',
        category: 'organic',
        price: 650,
        originalPrice: 850,
        discount: '২৪% ছাড়',
        rating: 4.8,
        reviewsCount: 132,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=1000&auto=format&fit=crop&q=80',
        weight: '৫০০ গ্রাম প্যাক',
        source: 'অস্ট্রেলিয়ার অনুমোদিত অর্গানিক ফার্ম',
        purity: 'ওমেগা-৩ ও ডায়েটারি ফাইবারে ভরপুর',
        shortDesc: 'ওজন নিয়ন্ত্রণ ও হৃদযন্ত্রের যত্নে প্রাকৃতিক সুপারফুড। সকালের কুসুম গরম পানি বা শরবতে খাওয়ার জন্য উপযুক্ত।'
      }
    ]
  },

  footwear: {
    id: 'footwear',
    name: 'Footwear & Sneakers',
    nameBn: 'প্রিমিয়াম স্নিকার্স ও জুতা',
    tagline: 'প্রতিটি পদক্ষেপে আধুনিকতা ও অতুলনীয় আরাম',
    heroTitle: 'হাই-এনার্জি আল্ট্রা কমফোর্ট স্নিকার্স ও লেদার শু কালেকশন',
    heroSubtitle: '৭ দিনের সাইজ এক্সচেঞ্জ গ্যারান্টি, হালকা ব্রিদেবল কুশন সোল এবং আন্তর্জাতিক মানের ডিজাইনার ফুটওয়্যার।',
    reference: 'ShopT Upgraded Sports Style',
    theme: {
      primary: '#18181b', // Carbon Black
      accent: '#ea580c',  // Fire Orange
      headerBg: 'bg-zinc-950',
      heroGradient: 'from-zinc-950 via-neutral-900 to-zinc-950',
      badgeBg: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
      buttonBg: 'bg-orange-600 hover:bg-orange-500 text-white font-bold',
      accentButton: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
    },
    usp: [
      { icon: 'RotateCcw', title: '৭ দিনের সাইজ এক্সচেঞ্জ', desc: 'সাইজ না মিললে ঘরে বসেই বদল' },
      { icon: 'Shield', title: '১০০% জেনুইন কোয়ালিটি', desc: 'টেকসই কুশন ও আসল লেদার' },
      { icon: 'Check', title: 'ক্যাশ অন ডেলিভারি', desc: 'পায়ে দিয়ে দেখে পেমেন্ট' }
    ],
    products: [
      {
        id: 'shoe-1',
        title: 'এয়ার-কুশন প্রো আল্ট্রা-লাইট রানিং স্নিকার্স',
        category: 'footwear',
        price: 2450,
        originalPrice: 3200,
        discount: '২৩% ছাড়',
        rating: 4.9,
        reviewsCount: 188,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=80',
        sizes: ['40', '41', '42', '43', '44'],
        colors: [
          { name: 'রেড ব্লাস্ট', hex: '#ef4444' },
          { name: 'ম্যাট ব্ল্যাক', hex: '#18181b' },
          { name: 'আইস হোয়াইট', hex: '#f8fafc' }
        ],
        sole: 'এয়ার কুশন ইভিএ শক-এবজরবিং সোল',
        upper: 'ব্রিদেবল ফ্লাইনিট মেশ ফেব্রিক',
        shortDesc: 'রানিং, জিম ও স্ট্রিট ফ্যাশনের জন্য অসাধারণ লাইটওয়েট স্নিকার্স। পায়ের ক্লান্তি দূর করে স্প্রিংয়ের মতো জাম্পিং আরাম দেয়।'
      },
      {
        id: 'shoe-2',
        title: 'ক্লাসিক হ্যান্ডমেড ফুল-গ্রেইন লেদার অক্সফোর্ড শু',
        category: 'footwear',
        price: 3600,
        originalPrice: 4800,
        discount: '২৫% ছাড়',
        rating: 4.8,
        reviewsCount: 112,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=1000&auto=format&fit=crop&q=80',
        sizes: ['40', '41', '42', '43', '44'],
        colors: [
          { name: 'রয়্যাল ট্যান ব্রাউন', hex: '#78350f' },
          { name: 'ক্লাসিক ব্ল্যাক', hex: '#09090b' }
        ],
        sole: 'প্রিমিয়াম অ্যান্টি-স্কিড লেদার সোল',
        upper: 'শতভাগ খাঁটি কাউ ক্রাস্ট লেদার',
        shortDesc: 'অফিসিয়াল মিটিং, বিয়ে ও ফর্মাল স্যুট-প্যান্টের সাথে ক্লাসি লুক নিশ্চিত করতে হাতে সেলাই করা পিওর লেদার শু।'
      },
      {
        id: 'shoe-3',
        title: 'রেট্রো কোর্ট হাই-টপ আরবান স্ট্রিটওয়্যার স্নিকার্স',
        category: 'footwear',
        price: 2750,
        originalPrice: 3500,
        discount: '২১% ছাড়',
        rating: 4.9,
        reviewsCount: 145,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1000&auto=format&fit=crop&q=80',
        sizes: ['41', '42', '43', '44'],
        colors: [
          { name: 'হোয়াইট অ্যান্ড ব্ল্যাক', hex: '#27272a' },
          { name: 'পাণ্ডা থিম', hex: '#ffffff' }
        ],
        sole: 'ভালকানাইজড রাবার গ্রিপ সোল',
        upper: 'স্মুথ পিইউ ও স্যুয়েড প্যানেল',
        shortDesc: 'তরুণদের জনপ্রিয় পাণ্ডা ও হাই-টপ স্ট্রিটওয়্যার ডিজাইন। জিন্স ও জগার্সের সাথে সুপার ট্রেন্ডি ও আরামদায়ক।'
      },
      {
        id: 'shoe-4',
        title: 'সফট-কুশন ক্যাজুয়াল স্লিপ-অন ড্রাইভিং লোফার্স',
        category: 'footwear',
        price: 2150,
        originalPrice: 2800,
        discount: '২৩% ছাড়',
        rating: 4.7,
        reviewsCount: 96,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1000&auto=format&fit=crop&q=80',
        sizes: ['40', '41', '42', '43', '44'],
        colors: [
          { name: 'চকলেট ডার্ক ব্রাউন', hex: '#451a03' },
          { name: 'নেভি ব্লু স্যুয়েড', hex: '#1e3a8a' }
        ],
        sole: 'ফ্লেক্সিবল ড্রাইভার্স প্যাডেড সোল',
        upper: 'সফট জেনুইন স্যুয়েড লেদার',
        shortDesc: 'কোনো ফিতা বাঁধার ঝামেলা ছাড়া সহজে পায়ে পরার লোফার্স। গাড়ি ড্রাইভ ও সারাদিনের হাঁটাচলার জন্য এক নম্বর পছন্দ।'
      },
      {
        id: 'shoe-5',
        title: 'ট্রেইল-মাস্টার ওয়াটারপ্রুফ হাইকিং ও ট্রেকিং বুট',
        category: 'footwear',
        price: 3400,
        originalPrice: 4400,
        discount: '২৩% ছাড়',
        rating: 4.9,
        reviewsCount: 78,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=1000&auto=format&fit=crop&q=80',
        sizes: ['41', '42', '43', '44', '45'],
        colors: [
          { name: 'আর্মি গ্রিন', hex: '#3f6212' },
          { name: 'মরু ক্যাকটাস', hex: '#78350f' }
        ],
        sole: 'ডিপ লাগড মাড অ্যান্ড রক ট্র্যাকার সোল',
        upper: 'ওয়াটার-রেপেলেন্ট নাইলন ও থার্মো টিপিইউ',
        shortDesc: 'পাহাড় ট্র্যাকিং, ভ্রমণ ও রাফ ব্যবহারের জন্য মজবুত নকশা। গোড়ালি সুরক্ষিত রেখে পিচ্ছিল পাথরেও দৃঢ় গ্রিপ ধরে রাখে।'
      },
      {
        id: 'shoe-6',
        title: 'আল্ট্রা-সফট ক্লাউড মেমোরি ফোম কমফোর্ট স্লাইডস',
        category: 'footwear',
        price: 950,
        originalPrice: 1300,
        discount: '২৭% ছাড়',
        rating: 4.8,
        reviewsCount: 162,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=1000&auto=format&fit=crop&q=80',
        sizes: ['40/41', '42/43', '44/45'],
        colors: [
          { name: 'ম্যাট ব্ল্যাক', hex: '#18181b' },
          { name: 'অলিভ গ্রিন', hex: '#4d7c0f' }
        ],
        sole: '৪.৫ সেমি ক্লাউড ফোম ইভিএ সোল',
        upper: 'ওয়ান-পিস মোল্ডেড ইভিএ',
        shortDesc: 'তুলোর মতো নরম ও পানিরোধী স্লাইডার। গোড়ালি বা পায়ের ব্যথায় যারা আরাম চান তাদের জন্য সেরা চটি।'
      }
    ]
  }
};
