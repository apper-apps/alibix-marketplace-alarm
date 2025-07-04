import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const CategoryCard = ({ category, className = '' }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isDark } = useTheme();

  const handleCategoryClick = () => {
    navigate(`/category/${category.slug}`);
  };

  const categoryName = language === 'ur' ? category.nameUrdu : category.name;

  // Enhanced category image mapping with fallbacks
  const getCategoryImage = (category) => {
    const imageMap = {
      'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=500&fit=crop',
      'clothing': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&h=500&fit=crop',
      'shoes': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
      'men shoes': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
      'women shoes': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop',
      'accessories': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      'home-garden': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
      'beauty-health': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
      'sports-fitness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
      'books-media': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
      'toys-games': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop',
      'automotive': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop'
    };

    const slug = category.slug?.toLowerCase() || '';
    const name = category.name?.toLowerCase() || '';
    
    // Try exact slug match first
    if (imageMap[slug]) return imageMap[slug];
    
    // Try name match
    if (imageMap[name]) return imageMap[name];
    
    // Try partial matches
    const partialMatch = Object.keys(imageMap).find(key => 
      slug.includes(key) || name.includes(key) || key.includes(slug) || key.includes(name)
    );
    
    if (partialMatch) return imageMap[partialMatch];
    
    // Fallback to original image or default
    return category.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop';
  };

return (
  <motion.div
    className={`card cursor-pointer hover:shadow-xl transition-colors duration-300 ${isDark ? "bg-gray-800 border border-gray-700 hover:border-gray-600" : "bg-white"} ${className}`}
    onClick={handleCategoryClick}
    whileHover={{
        y: -5
    }}
    whileTap={{
        scale: 0.95
    }}
    transition={{
        duration: 0.2
    }}>
    <div
        className={`relative aspect-square rounded-lg overflow-hidden mb-4 ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
        <img
            src={getCategoryImage(category)}
            alt={categoryName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
        {/* Gradient Overlay */}
        <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Category Name on Image */}
        <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-lg drop-shadow-lg">
                {categoryName}
            </h3>
            {category.productCount && <p className="text-white/90 text-sm drop-shadow-lg">
                {category.productCount}products
                            </p>}
        </div>
        {/* Featured Badge */}
        {category.featured && <div className="absolute top-2 left-2">
            <span
                className="bg-gradient-to-r from-accent to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-medium">Featured
                            </span>
        </div>}
    </div>
    {/* Category Info */}
    {/* Category Info */}
    <div className="p-4">
        <h3
            className={`font-semibold mb-2 text-center ${isDark ? "text-white" : "text-gray-900"}`}>
            {categoryName}
        </h3>
        {category.description && <p
            className={`text-sm text-center line-clamp-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {category.description}
        </p>}
    </div></motion.div>
  );
};

export default CategoryCard;