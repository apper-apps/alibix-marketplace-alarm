import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-secondary to-orange-500 text-white hover:from-orange-500 hover:to-secondary shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'bg-gradient-to-r from-primary to-gray-800 text-white hover:from-gray-800 hover:to-primary shadow-lg hover:shadow-xl';
      case 'accent':
        return 'bg-gradient-to-r from-accent to-yellow-600 text-white hover:from-yellow-600 hover:to-accent shadow-lg hover:shadow-xl';
      case 'outline':
        return 'bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-white';
      case 'ghost':
        return 'bg-transparent text-secondary hover:bg-secondary/10';
      case 'danger':
        return 'bg-gradient-to-r from-danger to-red-600 text-white hover:from-red-600 hover:to-danger shadow-lg hover:shadow-xl';
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-emerald-500 hover:to-green-500 shadow-lg hover:shadow-xl';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-orange-500 hover:to-yellow-500 shadow-lg hover:shadow-xl';
      case 'white':
        return 'bg-white text-gray-800 hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-200';
      default:
        return 'bg-gradient-to-r from-secondary to-orange-500 text-white hover:from-orange-500 hover:to-secondary shadow-lg hover:shadow-xl';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1.5 text-sm';
      case 'medium':
        return 'px-4 py-2 text-base';
      case 'large':
        return 'px-6 py-3 text-lg';
      case 'extra-large':
        return 'px-8 py-4 text-xl';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const buttonClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-lg
    transition-all duration-200
    transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const iconSize = size === 'small' ? 14 : size === 'large' ? 20 : size === 'extra-large' ? 24 : 16;

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {loading && (
        <div className="mr-2">
          <div className="loading-spinner w-4 h-4 border-2 border-white border-t-transparent"></div>
        </div>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon 
          name={icon} 
          size={iconSize} 
          className="mr-2" 
        />
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon 
          name={icon} 
          size={iconSize} 
          className="ml-2" 
        />
      )}
    </motion.button>
  );
};

export default Button;