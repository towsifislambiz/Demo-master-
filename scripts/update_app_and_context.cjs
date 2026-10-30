const fs = require('fs');
const path = require('path');

// 1. Update App.jsx
const appPath = path.resolve('client/src/App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');

if (!appContent.includes('KicksCraftHome')) {
  // Add imports
  const importTarget = `// Organic Food (Ghorer Bazar Clone)`;
  const footwearImports = `// Footwear & Sneakers (KicksCraft BD)
import KicksCraftHome from './components/footwear/KicksCraftHome';
import KicksCraftShopPage from './components/footwear/KicksCraftShopPage';
import KicksCraftProductDetailsPage from './components/footwear/KicksCraftProductDetailsPage';
import KicksCraftCheckoutPage from './components/footwear/KicksCraftCheckoutPage';
import KicksCraftAdminDashboardView from './components/footwear/KicksCraftAdminDashboardView';

// Organic Food (Ghorer Bazar Clone)`;

  appContent = appContent.replace(importTarget, footwearImports);

  // Update handleSelectNiche
  const nicheTarget = `} else if (nicheId === 'organic') {
      navigate('/organic');
    } else {`;
  const nicheReplacement = `} else if (nicheId === 'organic') {
      navigate('/organic');
    } else if (nicheId === 'footwear') {
      navigate('/footwear');
    } else {`;
  appContent = appContent.replace(nicheTarget, nicheReplacement);

  // Add Routes before admin
  const routeTarget = `{/* Admin Routes */}`;
  const footwearRoutes = `{/* Footwear & Sneakers (KicksCraft BD) Routes */}
          <Route path="/footwear" element={<KicksCraftHome />} />
          <Route path="/footwear/shop" element={<KicksCraftShopPage />} />
          <Route path="/footwear/product/:productId" element={<KicksCraftProductDetailsPage />} />
          <Route path="/footwear/checkout" element={<KicksCraftCheckoutPage />} />
          <Route path="/footwear/admin" element={<KicksCraftAdminDashboardView />} />

          {/* Admin Routes */}`;
  appContent = appContent.replace(routeTarget, footwearRoutes);

  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log('Successfully updated App.jsx');
} else {
  console.log('App.jsx already has KicksCraftHome');
}

// 2. Update StoreContext.jsx
const contextPath = path.resolve('client/src/context/StoreContext.jsx');
let contextContent = fs.readFileSync(contextPath, 'utf8');

if (!contextContent.includes('addOrder: placeOrder')) {
  contextContent = contextContent.replace('placeOrder,', 'placeOrder,\n        addOrder: placeOrder,');
  fs.writeFileSync(contextPath, contextContent, 'utf8');
  console.log('Successfully added addOrder alias in StoreContext.jsx');
} else {
  console.log('StoreContext already has addOrder');
}
