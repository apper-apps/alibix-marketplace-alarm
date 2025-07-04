import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { productService } from '@/services/api/productService';

const SearchBar = ({ onSearch, placeholder, className = '' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('alibix_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Auto-complete functionality
    const debounceTimer = setTimeout(() => {
      if (query.length >= 2) {
        searchForSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchForSuggestions = async (searchQuery) => {
    try {
      setIsLoading(true);
      const results = await productService.search(searchQuery);
      const uniqueSuggestions = results
        .slice(0, 8)
        .map(product => ({
          id: product.Id,
          name: language === 'ur' ? product.nameUrdu : product.name,
          category: product.category,
          image: product.images[0]
        }));
      setSuggestions(uniqueSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    // Add to recent searches
    const newRecentSearches = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('alibix_recent_searches', JSON.stringify(newRecentSearches));

    // Navigate to search results
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setShowSuggestions(false);
    setQuery('');

    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/product/${suggestion.id}`);
    setShowSuggestions(false);
    setQuery('');
  };

  const handleCameraSearch = () => {
    navigate('/camera-search');
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('alibix_recent_searches');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="search-bar">
        <ApperIcon 
          name="Search" 
          size={20} 
          className="text-gray-400 shrink-0" 
        />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder || t('search')}
          className="search-input"
        />
        
        <div className="flex items-center space-x-2 shrink-0">
          <Button
            variant="ghost"
            size="small"
            icon="Camera"
            onClick={handleCameraSearch}
            className="p-2 hover:bg-gray-200 rounded-full"
          />
          
          {query && (
            <Button
              variant="ghost"
              size="small"
              icon="X"
              onClick={() => setQuery('')}
              className="p-2 hover:bg-gray-200 rounded-full"
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto"
          >
            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Recent Searches</h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="flex items-center w-full p-2 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <ApperIcon name="Clock" size={16} className="text-gray-400 mr-3" />
                    <span className="text-sm text-gray-700">{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="p-4">
                <div className="flex items-center justify-center">
                  <div className="loading-spinner w-5 h-5 border-2 border-secondary"></div>
                  <span className="ml-2 text-sm text-gray-600">Searching...</span>
                </div>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <h3 className="text-sm font-medium text-gray-700 px-2 py-1 mb-2">Products</h3>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <img
                      src={suggestion.image}
                      alt={suggestion.name}
                      className="w-10 h-10 rounded-lg object-cover mr-3"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {suggestion.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {suggestion.category}
                      </p>
                    </div>
                    <ApperIcon name="ArrowRight" size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query && !isLoading && suggestions.length === 0 && (
              <div className="p-4 text-center">
                <ApperIcon name="Search" size={24} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No products found for "{query}"</p>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => handleSearch()}
                  className="mt-2"
                >
                  Search anyway
                </Button>
              </div>
            )}

            {/* Popular Categories */}
            {!query && recentSearches.length === 0 && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Electronics', 'Clothing', 'Shoes', 'Accessories'].map((category) => (
                    <button
                      key={category}
                      onClick={() => handleSearch(category)}
                      className="p-2 text-left hover:bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">{category}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;