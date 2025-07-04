import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.div
      className={`lang-toggle ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={toggleLanguage}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'en' ? 'lang-toggle-active' : 'text-gray-600'
        }`}
      >
        EN
      </button>
      <button
        onClick={toggleLanguage}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'ur' ? 'lang-toggle-active' : 'text-gray-600'
        }`}
      >
        اردو
      </button>
    </motion.div>
  );
};

export default LanguageToggle;