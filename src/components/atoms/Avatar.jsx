import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Avatar = ({
  src,
  alt,
  size = 'medium',
  fallback,
  status,
  className = '',
  onClick,
  ...props
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8 text-xs';
      case 'medium':
        return 'w-12 h-12 text-sm';
      case 'large':
        return 'w-16 h-16 text-base';
      case 'extra-large':
        return 'w-20 h-20 text-lg';
      default:
        return 'w-12 h-12 text-sm';
    }
  };

  const getStatusClasses = () => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-gray-400';
      case 'away':
        return 'bg-yellow-500';
      case 'busy':
        return 'bg-red-500';
      default:
        return '';
    }
  };

  const avatarClasses = `
    relative inline-flex items-center justify-center
    rounded-full overflow-hidden
    bg-gradient-to-br from-secondary to-orange-500
    text-white font-medium
    ${getSizeClasses()}
    ${onClick ? 'cursor-pointer hover:scale-105' : ''}
    transition-all duration-200
    ${className}
  `;

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const statusSize = size === 'small' ? 'w-2 h-2' : size === 'large' ? 'w-4 h-4' : size === 'extra-large' ? 'w-5 h-5' : 'w-3 h-3';

  return (
    <motion.div
      className={avatarClasses}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {fallback ? (
            getInitials(fallback)
          ) : (
            <ApperIcon 
              name="User" 
              size={size === 'small' ? 14 : size === 'large' ? 24 : size === 'extra-large' ? 32 : 18} 
            />
          )}
        </div>
      )}
      
      {status && (
        <div className={`absolute bottom-0 right-0 ${statusSize} ${getStatusClasses()} rounded-full border-2 border-white`}></div>
      )}
    </motion.div>
  );
};

export default Avatar;