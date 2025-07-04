import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import ApperIcon from '@/components/ApperIcon';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { t } = useLanguage();

  const navigationItems = [
    {
      name: t('home'),
      path: '/',
      icon: 'Home',
      activeIcon: 'Home',
    },
    {
      name: t('categories'),
      path: '/categories',
      icon: 'Grid3X3',
      activeIcon: 'Grid3X3',
    },
    {
      name: t('cameraSearch'),
      path: '/camera-search',
      icon: 'Camera',
      activeIcon: 'Camera',
    },
    {
      name: t('wishlist'),
      path: '/wishlist',
      icon: 'Heart',
      activeIcon: 'Heart',
      badge: wishlistCount,
    },
    {
      name: t('cart'),
      path: '/cart',
      icon: 'ShoppingCart',
      activeIcon: 'ShoppingCart',
      badge: itemCount,
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="bottom-nav md:hidden">
      <div className="flex items-center justify-around">
        {navigationItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative">
                <ApperIcon 
                  name={isActive ? item.activeIcon : item.icon} 
                  size={20} 
                  className={isActive ? 'fill-current' : ''}
                />
                {item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;