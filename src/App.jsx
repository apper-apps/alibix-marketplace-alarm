import React, { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import Layout from "@/components/organisms/Layout";
import Home from "@/components/pages/Home";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";

import 'react-toastify/dist/ReactToastify.css'
function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
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

return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  {/* Additional routes will be added as components are developed */}
                </Route>

                {/* Catch-all route - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
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
            className="toast-container"
          />
</WishlistProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App