import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const CategoryCard = ({ category, className = '' }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleCategoryClick = () => {
    navigate(`/category/${category.slug}`);
  };

  const categoryName = language === 'ur' ? category.nameUrdu : category.name;

  return (
    <motion.div
      className={`card cursor-pointer hover:shadow-xl ${className}`}
      onClick={handleCategoryClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={category.image}
          alt={categoryName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Name on Image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg drop-shadow-lg">
            {categoryName}
          </h3>
          {category.productCount && (
            <p className="text-white/90 text-sm drop-shadow-lg">
              {category.productCount} products
            </p>
          )}
        </div>

        {/* Featured Badge */}
        {category.featured && (
          <div className="absolute top-2 left-2">
            <span className="bg-gradient-to-r from-accent to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Category Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 text-center">
          {categoryName}
        </h3>
        
        {category.description && (
          <p className="text-sm text-gray-600 text-center line-clamp-2">
            {category.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default CategoryCard;