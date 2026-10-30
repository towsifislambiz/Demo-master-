import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// In-memory / synced cache for instant responses
let orders = [];
let customProducts = [];

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'WebCraft Master Demos API Server',
    categories: ['clothing', 'beauty', 'gadgets', 'organic', 'footwear']
  });
});

// Categories list with metadata
app.get('/api/categories', (req, res) => {
  res.json([
    {
      id: 'clothing',
      name: 'Fashion & Clothing',
      nameBn: 'প্রিমিয়াম ফ্যাশন ও বুটিক',
      reference: 'Shelai.com.bd Style',
      themeColor: '#064e3b',
      accentColor: '#d97706',
      badge: 'Editorial Luxury'
    },
    {
      id: 'beauty',
      name: 'Beauty & Skincare',
      nameBn: 'অর্গানিক স্কিনকেয়ার ও বিউটি',
      reference: 'Ribana.com.bd Style',
      themeColor: '#be185d',
      accentColor: '#f43f5e',
      badge: '100% Organic & Halal'
    },
    {
      id: 'gadgets',
      name: 'Smart Gadgets & Gear',
      nameBn: 'স্মার্ট গ্যাজেট ও ইলেকট্রনিক্স',
      reference: 'ShopT Upgraded Cyber Style',
      themeColor: '#0f172a',
      accentColor: '#06b6d4',
      badge: '1-Year Official Warranty'
    },
    {
      id: 'organic',
      name: 'Organic Food & Honey',
      nameBn: 'খাঁটি মধু ও অর্গানিক সুপারফুড',
      reference: 'GhorerBazar.com Style',
      themeColor: '#78350f',
      accentColor: '#f59e0b',
      badge: 'BSTI & Lab Tested Purity'
    },
    {
      id: 'footwear',
      name: 'Footwear & Sneakers',
      nameBn: 'প্রিমিয়াম স্নিকার্স ও জুতা',
      reference: 'ShopT Upgraded Sports Style',
      themeColor: '#18181b',
      accentColor: '#ea580c',
      badge: '7-Day Size Exchange'
    }
  ]);
});

// Get orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Place new order
app.post('/api/orders', (req, res) => {
  const { customerName, phone, address, city, paymentMethod, items, subtotal, deliveryCharge, total, category } = req.body;
  
  if (!customerName || !phone || !address || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required order fields' });
  }

  const newOrder = {
    id: 'WCM-' + Math.floor(100000 + Math.random() * 900000),
    customerName,
    phone,
    address,
    city: city || 'Dhaka',
    paymentMethod: paymentMethod || 'Cash on Delivery',
    items,
    subtotal: Number(subtotal),
    deliveryCharge: Number(deliveryCharge),
    total: Number(total),
    category: category || 'general',
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  orders.unshift(newOrder);
  console.log(`[Order Placed] ID: ${newOrder.id} - ${customerName} (${phone}) - ৳${total}`);
  res.status(201).json({ success: true, order: newOrder });
});

// Update order status
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  
  order.status = status;
  res.json({ success: true, order });
});

// Dashboard stats
app.get('/api/stats', (req, res) => {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  res.json({
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pending').length,
    deliveredOrders: orders.filter(o => o.status === 'Delivered').length,
    totalRevenue,
    activeNiches: 5
  });
});

app.listen(PORT, () => {
  console.log(`[WebCraft API Server] Running on http://localhost:${PORT}`);
});
