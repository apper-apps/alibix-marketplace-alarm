import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Price from '@/components/atoms/Price';

const ProductCard = ({ product, variant = 'default', className = '' }) => {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t, language } = useLanguage();

  const handleProductClick = () => {
    navigate(`/product/${product.Id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const productName = language === 'ur' ? product.nameUrdu : product.name;
  const inWishlist = isInWishlist(product.Id);
  const inCart = isInCart(product.Id);

  const getCardClasses = () => {
    switch (variant) {
      case 'compact':
        return 'w-full max-w-xs';
      case 'wide':
        return 'w-full';
      case 'featured':
        return 'w-full max-w-sm transform hover:scale-105';
      default:
        return 'w-full max-w-sm';
    }
  };

  return (
    <motion.div
      className={`card cursor-pointer ${getCardClasses()} ${className}`}
      onClick={handleProductClick}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img
            src={product.images[0]}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 ${
              inWishlist ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <ApperIcon 
              name={inWishlist ? 'Heart' : 'Heart'} 
              size={18} 
              className={`transition-colors duration-200 ${inWishlist ? 'fill-current' : ''}`}
            />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discountPrice && product.discountPrice < product.price && (
            <Badge variant="discount" size="small">
              -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
            </Badge>
          )}
          {product.isNew && (
            <Badge variant="new" size="small">
              New
            </Badge>
          )}
          {product.isFromChina && (
            <Badge variant="china" size="small" icon="Plane">
              China
            </Badge>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <Badge variant="warning" size="small">
              Low Stock
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="error" size="small">
              Out of Stock
            </Badge>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-secondary transition-colors duration-200">
          {productName}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <ApperIcon
                key={i}
                name="Star"
                size={14}
                className={`${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-500 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <Price
            originalPrice={product.price}
            discountPrice={product.discountPrice}
            size="medium"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.isCODAllowed && (
              <Badge variant="cod" size="small">
                COD
              </Badge>
            )}
            {product.isFromChina && (
              <span className="text-xs text-gray-500">
                22 days delivery
              </span>
            )}
          </div>

          <Button
            variant={inCart ? 'success' : 'primary'}
            size="small"
            icon={inCart ? 'Check' : 'Plus'}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {inCart ? 'Added' : 'Add'}
          </Button>
        </div>

        {/* COD Warning for China Products */}
        {product.isFromChina && (
          <div className="mt-3 p-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800 flex items-center">
              <ApperIcon name="Info" size={12} className="mr-1" />
              Online payment only - COD not available
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;