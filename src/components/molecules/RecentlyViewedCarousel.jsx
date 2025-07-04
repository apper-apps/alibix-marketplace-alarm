import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import ApperIcon from '@/components/ApperIcon';
import ProductCard from '@/components/molecules/ProductCard';
import Button from '@/components/atoms/Button';
import { viewTrackingService } from '@/services/api/viewTrackingService';

const RecentlyViewedCarousel = ({ className = '' }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const loadRecentlyViewed = async () => {
    try {
      setLoading(true);
      const viewed = await viewTrackingService.getRecentlyViewed();
      setRecentlyViewed(viewed.slice(0, 12)); // Show max 12 items
    } catch (error) {
      console.error('Error loading recently viewed:', error);
      setRecentlyViewed([]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const itemWidth = 280; // Card width + gap
      const scrollPosition = index * itemWidth;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const maxIndex = Math.max(0, recentlyViewed.length - 3);
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  const handleClearAll = async () => {
    try {
      await viewTrackingService.clearRecentlyViewed();
      setRecentlyViewed([]);
      setShowClearConfirm(false);
    } catch (error) {
      console.error('Error clearing recently viewed:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const updated = await viewTrackingService.removeFromRecentlyViewed(productId);
      setRecentlyViewed(updated);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return (
      <div className={`py-8 ${className}`}>
        <div className="container-responsive">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="flex space-x-4 overflow-hidden">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-72 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse">
                <div className="aspect-square bg-gray-300 dark:bg-gray-600 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className={`py-8 ${isDark ? 'bg-gray-900' : 'bg-white'} ${className}`}>
      <div className="container-responsive">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Clock" size={24} className={isDark ? 'text-white' : 'text-gray-900'} />
            <h2 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recently Viewed
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              {recentlyViewed.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="small"
              icon="ChevronLeft"
              onClick={scrollLeft}
              disabled={currentIndex === 0}
              className={`p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            />
            <Button
              variant="ghost"
              size="small"
              icon="ChevronRight"
              onClick={scrollRight}
              disabled={currentIndex >= Math.max(0, recentlyViewed.length - 3)}
              className={`p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            />
            
            {/* Clear All Button */}
            <Button
              variant="ghost"
              size="small"
              icon="Trash2"
              onClick={() => setShowClearConfirm(true)}
              className={`p-2 ${isDark ? 'hover:bg-red-900 text-red-400' : 'hover:bg-red-50 text-red-600'}`}
            />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence>
              {recentlyViewed.map((product, index) => (
                <motion.div
                  key={product.Id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative group min-w-[280px]"
                >
                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(product.Id);
                    }}
                    className={`absolute top-2 left-2 z-10 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                      isDark ? 'bg-gray-800 text-white hover:bg-red-600' : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                    } shadow-lg`}
                  >
                    <ApperIcon name="X" size={14} />
                  </button>

                  {/* View Count Badge */}
                  {product.viewCount > 1 && (
                    <div className={`absolute top-2 right-2 z-10 px-2 py-1 rounded-full text-xs font-medium ${
                      isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      {product.viewCount}x
                    </div>
                  )}

                  <ProductCard 
                    product={product} 
                    variant="compact"
                    className={`h-full ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Gradient Overlays */}
          <div className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r ${
            isDark ? 'from-gray-900 to-transparent' : 'from-white to-transparent'
          } pointer-events-none`}></div>
          <div className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l ${
            isDark ? 'from-gray-900 to-transparent' : 'from-white to-transparent'
          } pointer-events-none`}></div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => navigate('/recently-viewed')}
            className={`${isDark ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            View All Recently Viewed
            <ApperIcon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>

        {/* Clear Confirmation Modal */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setShowClearConfirm(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md mx-4`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center mb-4">
                  <ApperIcon name="AlertTriangle" size={24} className="text-red-500 mr-3" />
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Clear Recently Viewed
                  </h3>
                </div>
                <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Are you sure you want to clear all recently viewed products? This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleClearAll}
                    className="flex-1"
                  >
                    Clear All
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecentlyViewedCarousel;