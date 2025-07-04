import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  type = 'default',
  title,
  description,
  actionText,
  actionPath,
  onAction,
  showAction = true 
}) => {
  const navigate = useNavigate();

  const getEmptyConfig = () => {
    switch (type) {
      case 'cart':
        return {
          icon: 'ShoppingCart',
          title: 'Your cart is empty',
          description: 'Looks like you haven\'t added anything to your cart yet. Start shopping to fill it up!',
          actionText: 'Start Shopping',
          actionPath: '/categories',
          gradient: 'from-blue-500 to-purple-500',
          bgGradient: 'from-blue-50 to-purple-50',
        };
      case 'wishlist':
        return {
          icon: 'Heart',
          title: 'Your wishlist is empty',
          description: 'Save items you love to your wishlist so you can easily find them later.',
          actionText: 'Browse Products',
          actionPath: '/categories',
          gradient: 'from-pink-500 to-red-500',
          bgGradient: 'from-pink-50 to-red-50',
        };
      case 'orders':
        return {
          icon: 'Package',
          title: 'No orders yet',
          description: 'You haven\'t placed any orders yet. When you do, they\'ll appear here.',
          actionText: 'Shop Now',
          actionPath: '/',
          gradient: 'from-green-500 to-emerald-500',
          bgGradient: 'from-green-50 to-emerald-50',
        };
      case 'search':
        return {
          icon: 'Search',
          title: 'No results found',
          description: 'We couldn\'t find any products matching your search. Try different keywords or browse our categories.',
          actionText: 'Browse Categories',
          actionPath: '/categories',
          gradient: 'from-yellow-500 to-orange-500',
          bgGradient: 'from-yellow-50 to-orange-50',
        };
      case 'products':
        return {
          icon: 'Package2',
          title: 'No products available',
          description: 'There are no products in this category yet. Check back later for new arrivals.',
          actionText: 'View All Categories',
          actionPath: '/categories',
          gradient: 'from-indigo-500 to-blue-500',
          bgGradient: 'from-indigo-50 to-blue-50',
        };
      case 'categories':
        return {
          icon: 'Grid3X3',
          title: 'No categories found',
          description: 'Categories are being updated. Please check back soon.',
          actionText: 'Go to Home',
          actionPath: '/',
          gradient: 'from-purple-500 to-pink-500',
          bgGradient: 'from-purple-50 to-pink-50',
        };
      case 'camera':
        return {
          icon: 'Camera',
          title: 'No matches found',
          description: 'We couldn\'t find any products matching your image. Try capturing a different angle or browse our categories.',
          actionText: 'Try Again',
          actionPath: '/camera-search',
          gradient: 'from-cyan-500 to-blue-500',
          bgGradient: 'from-cyan-50 to-blue-50',
        };
      case 'admin-products':
        return {
          icon: 'Package',
          title: 'No products added',
          description: 'Start building your catalog by adding your first product.',
          actionText: 'Add Product',
          actionPath: '/admin/products',
          gradient: 'from-secondary to-orange-500',
          bgGradient: 'from-orange-50 to-red-50',
        };
      case 'admin-orders':
        return {
          icon: 'ShoppingBag',
          title: 'No orders received',
          description: 'Orders from customers will appear here when they start shopping.',
          actionText: 'View Products',
          actionPath: '/admin/products',
          gradient: 'from-green-500 to-teal-500',
          bgGradient: 'from-green-50 to-teal-50',
        };
      case 'admin-users':
        return {
          icon: 'Users',
          title: 'No users registered',
          description: 'User accounts will appear here as customers sign up.',
          actionText: 'View Dashboard',
          actionPath: '/admin',
          gradient: 'from-purple-500 to-indigo-500',
          bgGradient: 'from-purple-50 to-indigo-50',
        };
      default:
        return {
          icon: 'Inbox',
          title: title || 'Nothing here yet',
          description: description || 'This section is empty. Content will appear here when available.',
          actionText: actionText || 'Go Back',
          actionPath: actionPath || '/',
          gradient: 'from-gray-500 to-gray-600',
          bgGradient: 'from-gray-50 to-gray-100',
        };
    }
  };

  const config = getEmptyConfig();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (config.actionPath) {
      navigate(config.actionPath);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center justify-center min-h-[400px] p-4"
    >
      <div className={`max-w-md w-full text-center p-8 rounded-2xl bg-gradient-to-br ${config.bgGradient} border border-gray-200`}>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${config.gradient} text-white shadow-lg mb-6`}
        >
          <ApperIcon name={config.icon} size={40} />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 mb-3"
        >
          {config.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          {config.description}
        </motion.p>

        {showAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <motion.button
              onClick={handleAction}
              className={`inline-flex items-center space-x-2 bg-gradient-to-r ${config.gradient} text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="ArrowRight" size={16} />
              <span>{config.actionText}</span>
            </motion.button>

            {type === 'cart' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center space-x-4 text-sm text-gray-500"
              >
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Truck" size={14} />
                  <span>Free shipping over Rs. 2000</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Shield" size={14} />
                  <span>Secure checkout</span>
                </div>
              </motion.div>
            )}

            {type === 'search' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 p-4 bg-white rounded-lg border border-gray-200"
              >
                <h4 className="font-semibold text-gray-900 mb-2">Search Tips:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Try different keywords</li>
                  <li>• Check your spelling</li>
                  <li>• Use more general terms</li>
                  <li>• Browse our categories</li>
                </ul>
              </motion.div>
            )}

            {type === 'camera' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 p-4 bg-white rounded-lg border border-gray-200"
              >
                <h4 className="font-semibold text-gray-900 mb-2">Camera Search Tips:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Ensure good lighting</li>
                  <li>• Focus on the main object</li>
                  <li>• Try different angles</li>
                  <li>• Avoid cluttered backgrounds</li>
                </ul>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full opacity-20"></div>
          <div className="absolute top-8 right-6 w-1 h-1 bg-white rounded-full opacity-30"></div>
          <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-white rounded-full opacity-25"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full opacity-20"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Empty;