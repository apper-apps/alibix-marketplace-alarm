import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const Price = ({
  originalPrice,
  discountPrice,
  currency = 'Rs.',
  size = 'medium',
  showDiscount = true,
  className = '',
  ...props
}) => {
  const { language } = useLanguage();
  
  const formatPrice = (price) => {
    if (language === 'ur') {
      return `${price.toLocaleString()} ${currency}`;
    }
    return `${currency} ${price.toLocaleString()}`;
  };

  const calculateDiscountPercentage = () => {
    if (!discountPrice || discountPrice >= originalPrice) return 0;
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          price: 'text-sm',
          original: 'text-xs',
          discount: 'text-xs'
        };
      case 'medium':
        return {
          price: 'text-lg',
          original: 'text-sm',
          discount: 'text-sm'
        };
      case 'large':
        return {
          price: 'text-xl',
          original: 'text-base',
          discount: 'text-sm'
        };
      case 'extra-large':
        return {
          price: 'text-2xl',
          original: 'text-lg',
          discount: 'text-base'
        };
      default:
        return {
          price: 'text-lg',
          original: 'text-sm',
          discount: 'text-sm'
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const discountPercentage = calculateDiscountPercentage();
  const hasDiscount = discountPrice && discountPrice < originalPrice;

  return (
    <div className={`flex items-center flex-wrap gap-2 ${className}`} {...props}>
      {hasDiscount ? (
        <>
          <motion.span
            className={`font-bold text-danger ${sizeClasses.price}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {formatPrice(discountPrice)}
          </motion.span>
          
          <motion.span
            className={`text-gray-500 line-through ${sizeClasses.original}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {formatPrice(originalPrice)}
          </motion.span>
          
          {showDiscount && discountPercentage > 0 && (
            <motion.span
              className={`bg-gradient-to-r from-danger to-red-600 text-white px-2 py-1 rounded-full font-medium ${sizeClasses.discount}`}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
            >
              -{discountPercentage}%
            </motion.span>
          )}
        </>
      ) : (
        <motion.span
          className={`font-bold text-primary ${sizeClasses.price}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {formatPrice(originalPrice)}
        </motion.span>
      )}
    </div>
  );
};

export default Price;