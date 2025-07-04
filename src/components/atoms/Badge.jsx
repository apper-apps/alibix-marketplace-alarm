import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  icon,
  rounded = false,
  className = '',
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'discount':
        return 'bg-gradient-to-r from-danger to-red-600 text-white';
      case 'new':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'china':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'cod':
        return 'bg-gradient-to-r from-accent to-yellow-600 text-white';
      case 'stock':
        return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'neutral':
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
      case 'primary':
        return 'bg-gradient-to-r from-secondary to-orange-500 text-white';
      case 'secondary':
        return 'bg-gradient-to-r from-primary to-gray-800 text-white';
      case 'outline':
        return 'bg-transparent border border-gray-300 text-gray-700';
      case 'light':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gradient-to-r from-secondary to-orange-500 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-0.5 text-xs';
      case 'medium':
        return 'px-2.5 py-1 text-sm';
      case 'large':
        return 'px-3 py-1.5 text-base';
      default:
        return 'px-2.5 py-1 text-sm';
    }
  };

  const badgeClasses = `
    inline-flex items-center font-medium
    ${rounded ? 'rounded-full' : 'rounded-lg'}
    ${getVariantClasses()}
    ${getSizeClasses()}
    shadow-sm
    transition-all duration-200
    ${className}
  `;

  const iconSize = size === 'small' ? 12 : size === 'large' ? 16 : 14;

  return (
    <motion.span
      className={badgeClasses}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {icon && (
        <ApperIcon 
          name={icon} 
          size={iconSize} 
          className="mr-1" 
        />
      )}
      {children}
    </motion.span>
  );
};

export default Badge;