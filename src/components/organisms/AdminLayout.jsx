import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: 'BarChart3',
    },
    {
      name: 'Products',
      path: '/admin/products',
      icon: 'Package',
    },
    {
      name: 'Orders',
      path: '/admin/orders',
      icon: 'ShoppingBag',
    },
    {
      name: 'Categories',
      path: '/admin/categories',
      icon: 'Grid3X3',
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: 'Users',
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleBackToStore = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-30">
        <div className="p-6">
          <div className="flex items-center mb-8">
            <h1 className="text-2xl font-bold">
              <span className="text-primary">Ali</span>
              <span className="text-secondary">Bix</span>
            </h1>
            <span className="ml-2 text-sm text-gray-500">Admin</span>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-secondary text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ApperIcon name={item.icon} size={20} />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={handleBackToStore}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ApperIcon name="ArrowLeft" size={20} />
              <span className="font-medium">Back to Store</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg z-50 sticky top-0">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">
              <span className="text-primary">Ali</span>
              <span className="text-secondary">Bix</span>
            </h1>
            <span className="ml-2 text-sm text-gray-500">Admin</span>
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-secondary transition-colors duration-200"
          >
            <ApperIcon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 lg:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">
                    <span className="text-primary">Ali</span>
                    <span className="text-secondary">Bix</span>
                  </h1>
                  <span className="ml-2 text-sm text-gray-500">Admin</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-700 hover:text-secondary transition-colors duration-200"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-secondary text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <ApperIcon name={item.icon} size={20} />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={handleBackToStore}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <ApperIcon name="ArrowLeft" size={20} />
                  <span className="font-medium">Back to Store</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;