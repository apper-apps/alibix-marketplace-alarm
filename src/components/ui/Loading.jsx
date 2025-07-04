import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ type = 'default', count = 6 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'products':
        return (
          <div className="product-grid">
            {[...Array(count)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-4 space-y-4"
              >
                <div className="aspect-square bg-gray-200 rounded-lg shimmer"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded shimmer w-20"></div>
                  <div className="h-8 bg-gray-200 rounded shimmer w-16"></div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'categories':
        return (
          <div className="category-grid">
            {[...Array(count)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-4 space-y-3"
              >
                <div className="aspect-square bg-gray-200 rounded-lg shimmer"></div>
                <div className="h-4 bg-gray-200 rounded shimmer"></div>
              </motion.div>
            ))}
          </div>
        );

      case 'cart':
        return (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg shimmer"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded shimmer"></div>
                    <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded shimmer w-1/2"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-4">
            {[...Array(count)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-gray-200 rounded shimmer w-32"></div>
                  <div className="h-6 bg-gray-200 rounded-full shimmer w-20"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded shimmer w-2/3"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded shimmer w-24"></div>
                  <div className="h-5 bg-gray-200 rounded shimmer w-16"></div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full shimmer"></div>
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 rounded shimmer w-32"></div>
                  <div className="h-4 bg-gray-200 rounded shimmer w-48"></div>
                </div>
              </div>
              {[...Array(4)].map((_, index) => (
                <div key={index} className="mb-4">
                  <div className="h-4 bg-gray-200 rounded shimmer w-24 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded shimmer"></div>
                </div>
              ))}
            </motion.div>
          </div>
        );

      case 'admin-dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-8 bg-gray-200 rounded shimmer w-8"></div>
                    <div className="h-6 bg-gray-200 rounded shimmer w-16"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded shimmer w-20 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded shimmer w-32"></div>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(2)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 4) * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="h-6 bg-gray-200 rounded shimmer w-40 mb-4"></div>
                  <div className="h-64 bg-gray-200 rounded shimmer"></div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center min-h-[200px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 text-secondary">
                <div className="loading-spinner w-8 h-8"></div>
                <span className="text-lg font-medium">Loading...</span>
              </div>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {renderSkeleton()}
    </motion.div>
  );
};

export default Loading;