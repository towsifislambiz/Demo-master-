import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import ScrollToTop from './components/ScrollToTop';
import GatewayScreen from './components/GatewayScreen';
import NicheSwitcherBar from './components/NicheSwitcherBar';
import StorefrontView from './components/StorefrontView';
import CartDrawer from './components/CartDrawer';
import AdminDashboardView from './components/AdminDashboardView';

// Fashion (Shelai)
import ShelaiFashionStore from './components/fashion/ShelaiFashionStore';
import ShelaiProductDetailsPage from './components/fashion/ShelaiProductDetailsPage';
import ShelaiWishlistPage from './components/fashion/ShelaiWishlistPage';
import ShelaiCheckoutPage from './components/fashion/ShelaiCheckoutPage';

// Beauty (RiBANA)
import RibanaBeautyStore from './components/beauty/RibanaBeautyStore';
import RibanaProductDetailsPage from './components/beauty/RibanaProductDetailsPage';
import RibanaWishlistPage from './components/beauty/RibanaWishlistPage';
import RibanaCheckoutPage from './components/beauty/RibanaCheckoutPage';
import RibanaAdminDashboardView from './components/beauty/RibanaAdminDashboardView';

// Gadgets (ShopT Combo 01 Navy + Silver + White)
import ShopTGadgetStore from './components/gadgets/ShopTGadgetStore';
import ShopTGadgetProductDetailsPage from './components/gadgets/ShopTGadgetProductDetailsPage';
import ShopTGadgetWishlistPage from './components/gadgets/ShopTGadgetWishlistPage';
import ShopTGadgetCheckoutPage from './components/gadgets/ShopTGadgetCheckoutPage';
import ShopTGadgetAdminDashboardView from './components/gadgets/ShopTGadgetAdminDashboardView';

// Footwear & Sneakers (KicksCraft BD)
import KicksCraftHome from './components/footwear/KicksCraftHome';
import KicksCraftShopPage from './components/footwear/KicksCraftShopPage';
import KicksCraftProductDetailsPage from './components/footwear/KicksCraftProductDetailsPage';
import KicksCraftCheckoutPage from './components/footwear/KicksCraftCheckoutPage';
import KicksCraftAdminDashboardView from './components/footwear/KicksCraftAdminDashboardView';

// Organic Food (Ghorer Bazar Clone)
import GhorerBazarHome from './components/organic/GhorerBazarHome';
import GhorerBazarProductDetailsPage from './components/organic/GhorerBazarProductDetailsPage';
import GhorerBazarShopPage from './components/organic/GhorerBazarShopPage';
import GhorerBazarCheckoutPage from './components/organic/GhorerBazarCheckoutPage';
import GhorerBazarAdminDashboardView from './components/organic/GhorerBazarAdminDashboardView';

function GatewayPage() {
  const navigate = useNavigate();
  const { setActiveNiche } = useStore();

  const handleSelectNiche = (nicheId) => {
    setActiveNiche(nicheId);
    if (nicheId === 'clothing') {
      navigate('/store');
    } else if (nicheId === 'beauty') {
      navigate('/beauty');
    } else if (nicheId === 'gadgets') {
      navigate('/gadgets');
    } else if (nicheId === 'organic') {
      navigate('/organic');
    } else if (nicheId === 'footwear') {
      navigate('/footwear');
    } else {
      navigate('/store');
    }
  };

  return <GatewayScreen onSelectNiche={handleSelectNiche} />;
}

function StorePage() {
  const navigate = useNavigate();
  const { setActiveNiche } = useStore();

  useEffect(() => {
    setActiveNiche('clothing');
  }, [setActiveNiche]);

  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      <ShelaiFashionStore onBackToGateway={() => navigate('/')} />
    </div>
  );
}

function BeautyPage() {
  const navigate = useNavigate();
  const { setActiveNiche } = useStore();

  useEffect(() => {
    setActiveNiche('beauty');
  }, [setActiveNiche]);

  return (
    <div className="min-h-screen bg-[#FFF8F5]">
      <RibanaBeautyStore onBackToGateway={() => navigate('/')} />
    </div>
  );
}

function GadgetsPage() {
  const navigate = useNavigate();
  const { setActiveNiche } = useStore();

  useEffect(() => {
    setActiveNiche('gadgets');
  }, [setActiveNiche]);

  return <ShopTGadgetStore onBackToGateway={() => navigate('/')} />;
}

function OrganicPage() {
  const navigate = useNavigate();
  const { setActiveNiche } = useStore();

  useEffect(() => {
    setActiveNiche('organic');
  }, [setActiveNiche]);

  return <GhorerBazarHome onBackToGateway={() => navigate('/')} />;
}

function FootwearPage() {
  const { setActiveNiche } = useStore();

  useEffect(() => {
    setActiveNiche('footwear');
  }, [setActiveNiche]);

  return <KicksCraftHome />;
}

function AdminPage() {
  return <AdminDashboardView />;
}

function RibanaAdminPage() {
  return <RibanaAdminDashboardView />;
}

function OrganicAdminPage() {
  return <GhorerBazarAdminDashboardView />;
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<GatewayPage />} />
          <Route path="/store" element={<StorePage />} />
          
          {/* Fashion Routes */}
          <Route path="/store/product/:productId" element={<ShelaiProductDetailsPage />} />
          <Route path="/store/wishlist" element={<ShelaiWishlistPage />} />
          <Route path="/store/checkout" element={<ShelaiCheckoutPage />} />

          {/* Beauty Routes */}
          <Route path="/beauty" element={<BeautyPage />} />
          <Route path="/beauty/product/:productId" element={<RibanaProductDetailsPage />} />
          <Route path="/beauty/wishlist" element={<RibanaWishlistPage />} />
          <Route path="/beauty/checkout" element={<RibanaCheckoutPage />} />
          <Route path="/beauty/admin" element={<RibanaAdminPage />} />

          {/* Gadgets Routes (ShopT Combo 01 Navy Edition) */}
          <Route path="/gadgets" element={<GadgetsPage />} />
          <Route path="/gadgets/product/:productId" element={<ShopTGadgetProductDetailsPage />} />
          <Route path="/gadgets/wishlist" element={<ShopTGadgetWishlistPage />} />
          <Route path="/gadgets/checkout" element={<ShopTGadgetCheckoutPage />} />
          <Route path="/gadgets/admin" element={<ShopTGadgetAdminDashboardView />} />

          {/* Organic Food (Ghorer Bazar Clone) Routes */}
          <Route path="/organic" element={<OrganicPage />} />
          <Route path="/organic/shop" element={<GhorerBazarShopPage />} />
          <Route path="/organic/product/:productId" element={<GhorerBazarProductDetailsPage />} />
          <Route path="/organic/checkout" element={<GhorerBazarCheckoutPage />} />
          <Route path="/organic/admin" element={<OrganicAdminPage />} />

          {/* Footwear & Sneakers (KicksCraft BD) Routes */}
          <Route path="/footwear" element={<FootwearPage />} />
          <Route path="/footwear/shop" element={<KicksCraftShopPage />} />
          <Route path="/footwear/product/:productId" element={<KicksCraftProductDetailsPage />} />
          <Route path="/footwear/checkout" element={<KicksCraftCheckoutPage />} />
          <Route path="/footwear/admin" element={<KicksCraftAdminDashboardView />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPage />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
