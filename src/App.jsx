import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';

// Components
import Layout from '@/components/organisms/Layout';
import AdminLayout from '@/components/organisms/AdminLayout';

// Pages
import Home from '@/components/pages/Home';
import Categories from '@/components/pages/Categories';
import ProductDetail from '@/components/pages/ProductDetail';
import Cart from '@/components/pages/Cart';
import CameraSearch from '@/components/pages/CameraSearch';
import Wishlist from '@/components/pages/Wishlist';
import Profile from '@/components/pages/Profile';
import Orders from '@/components/pages/Orders';
import OrderDetail from '@/components/pages/OrderDetail';
import Checkout from '@/components/pages/Checkout';
import CategoryProducts from '@/components/pages/CategoryProducts';
import SearchResults from '@/components/pages/SearchResults';

// Admin Pages
import AdminDashboard from '@/components/pages/admin/AdminDashboard';
import AdminProducts from '@/components/pages/admin/AdminProducts';
import AdminOrders from '@/components/pages/admin/AdminOrders';
import AdminCategories from '@/components/pages/admin/AdminCategories';
import AdminUsers from '@/components/pages/admin/AdminUsers';

// Context
import { CartProvider } from '@/contexts/CartContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { WishlistProvider } from '@/contexts/WishlistContext';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              <span className="text-primary">Ali</span>
              <span className="text-secondary">Bix</span>
            </h1>
            <p className="text-gray-600 text-lg">Pakistan's Trusted Online Shopping Experience</p>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-surface to-white">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="category/:slug" element={<CategoryProducts />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="camera-search" element={<CameraSearch />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="order/:id" element={<OrderDetail />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="search" element={<SearchResults />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>
              </Routes>

              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                className="z-[9999]"
              />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;