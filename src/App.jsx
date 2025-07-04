import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import Layout from "@/components/organisms/Layout";
import AdminLayout from "@/components/organisms/AdminLayout";
import AdminDashboard from "@/components/pages/AdminDashboard";
import AdminLogin from "@/components/pages/AdminLogin";
import AdminProducts from "@/components/pages/AdminProducts";
import Home from "@/components/pages/Home";
import Cart from "@/components/pages/Cart";
import Checkout from "@/components/pages/Checkout";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
// Protected Route Component

// Error Boundary Component for Router errors
class RouterErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Router Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">There was an error loading the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-secondary text-white rounded hover:bg-orange-600 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary via-gray-900 to-secondary">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <div className="relative">
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
        </motion.div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// App Component
const App = () => {
  return (
    <div className="min-h-screen bg-surface">
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <WishlistProvider>
                <RouterErrorBoundary>
                  <BrowserRouter>
                    <Routes>
                      {/* Public Routes */}
<Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="checkout" element={<Checkout />} />
                        {/* Additional routes will be added as components are developed */}
                      </Route>

                      {/* Admin Routes */}
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="orders" element={<div className="p-6"><h1 className="text-2xl font-bold">Orders Management</h1><p className="text-gray-600">Coming soon...</p></div>} />
                        <Route path="categories" element={<div className="p-6"><h1 className="text-2xl font-bold">Categories Management</h1><p className="text-gray-600">Coming soon...</p></div>} />
                        <Route path="users" element={<div className="p-6"><h1 className="text-2xl font-bold">Users Management</h1><p className="text-gray-600">Coming soon...</p></div>} />
                        <Route path="discounts" element={<div className="p-6"><h1 className="text-2xl font-bold">Discounts Management</h1><p className="text-gray-600">Coming soon...</p></div>} />
                        <Route path="analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics Dashboard</h1><p className="text-gray-600">Coming soon...</p></div>} />
                        <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-gray-600">Coming soon...</p></div>} />
                        <Route path="support" element={<div className="p-6"><h1 className="text-2xl font-bold">Support Messages</h1><p className="text-gray-600">Coming soon...</p></div>} />
                      </Route>

                      {/* Catch-all route - redirect to home */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </BrowserRouter>
                </RouterErrorBoundary>
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  draggable
                  pauseOnHover
                  theme="light"
                  className="toast-container"
                />
              </WishlistProvider>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
};

export default App;