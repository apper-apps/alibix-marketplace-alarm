import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import ApperIcon from '@/components/ApperIcon';

const ThemeToggle = ({ variant = 'button', className = '' }) => {
  const { theme, isDark, toggleTheme, isLoading } = useTheme();

  if (isLoading) {
    return (
      <div className={`w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse ${className}`} />
    );
  }

  if (variant === 'switch') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <ApperIcon name="Sun" size={18} className={`${isDark ? 'text-gray-400' : 'text-yellow-500'}`} />
        <button
          onClick={toggleTheme}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isDark ? 'bg-gray-600' : 'bg-gray-300'
          }`}
        >
          <motion.span
            layout
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
              isDark ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <ApperIcon name="Moon" size={18} className={`${isDark ? 'text-blue-400' : 'text-gray-400'}`} />
      </div>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-2 rounded-full transition-all duration-300 ${
        isDark 
          ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${className}`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ApperIcon 
          name={isDark ? 'Moon' : 'Sun'} 
          size={20} 
          className="transition-all duration-300"
        />
      </motion.div>
      
      {/* Ripple effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className={`absolute inset-0 rounded-full ${
          isDark ? 'bg-yellow-400' : 'bg-gray-600'
        }`}
        key={theme}
      />
    </motion.button>
  );
};

export default ThemeToggle;