import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import ProductCard from '@/components/molecules/ProductCard';
import CategoryCard from '@/components/molecules/CategoryCard';
import RecentlyViewedCarousel from '@/components/molecules/RecentlyViewedCarousel';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { productService } from '@/services/api/productService';
import { categoryService } from '@/services/api/categoryService';
import { recommendationService } from '@/services/api/recommendationService';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  useEffect(() => {
    loadHomeData();
  }, []);

const loadHomeData = async () => {
  try {
    setLoading(true);
    setError(null);

    const [featured, newItems, discounted, categories, recommended] = await Promise.all([
      productService.getFeatured(),
      productService.getNewArrivals(),
      productService.getDiscounted(),
      categoryService.getFeatured(),
      recommendationService.getPersonalizedRecommendations(8),
    ]);

    setFeaturedProducts(featured.slice(0, 8));
    setNewArrivals(newItems.slice(0, 8));
    setDiscountedProducts(discounted.slice(0, 8));
    setFeaturedCategories(categories.slice(0, 6));
    setRecommendedProducts(recommended);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  const handleCameraSearch = () => {
    navigate('/camera-search');
  };

  const handleViewAllProducts = () => {
    navigate('/categories');
  };

  if (loading) {
    return <Loading type="products" count={8} />;
  }

  if (error) {
    return <Error message={error} onRetry={loadHomeData} />;
  }

return (
  <div className="min-h-screen">
    {/* Hero Section */}
    <section className={`text-white py-20 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-primary via-gray-800 to-secondary'
    }`}>
      <div className="container-responsive">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 mb-10 lg:mb-0"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t('welcome')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                {t('tagline')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="white"
                  size="large"
                  icon="ShoppingBag"
                  onClick={handleViewAllProducts}
                  className="text-primary hover:bg-gray-100"
                >
                  Start Shopping
                </Button>
                <Button
                  variant="outline"
                  size="large"
                  icon="Camera"
                  onClick={handleCameraSearch}
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Camera Search
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent rounded-full blur-3xl opacity-20"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 glass">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 rounded-xl p-4 text-center">
                      <ApperIcon name="Package" size={32} className="mx-auto mb-2" />
                      <p className="text-sm">Free Shipping</p>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4 text-center">
                      <ApperIcon name="Shield" size={32} className="mx-auto mb-2" />
                      <p className="text-sm">Secure Payment</p>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4 text-center">
                      <ApperIcon name="RefreshCw" size={32} className="mx-auto mb-2" />
                      <p className="text-sm">Easy Returns</p>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4 text-center">
                      <ApperIcon name="Headphones" size={32} className="mx-auto mb-2" />
                      <p className="text-sm">24/7 Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
</section>

    {/* Recently Viewed Carousel */}
    <RecentlyViewedCarousel />

    {/* AI Recommendations */}
    {recommendedProducts.length > 0 && (
      <section className={`py-16 transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}>
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <ApperIcon name="Brain" size={32} className={`mr-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Recommended for You
              </h2>
            </div>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              AI-powered suggestions based on your browsing history
            </p>
            <div className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm ${
              isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            }`}>
              <ApperIcon name="Zap" size={14} className="mr-1" />
              60% Accuracy
            </div>
          </motion.div>

          <div className="product-grid">
            {recommendedProducts.map((product, index) => (
              <motion.div
                key={product.Id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* Featured Categories */}
    <section className={`py-16 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Shop by Category
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover products in your favorite categories
          </p>
        </motion.div>

        <div className="category-grid">
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category.Id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
{/* Flash Deals */}
    <section className={`py-16 text-white transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-r from-red-700 to-red-800' 
        : 'bg-gradient-to-r from-danger to-red-600'
    }`}>
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Flash Deals
          </h2>
          <p className={`text-lg ${isDark ? 'text-red-200' : 'text-red-100'}`}>
            Limited time offers - Don't miss out!
          </p>
        </motion.div>

        <div className="product-grid">
          {discountedProducts.map((product, index) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* New Arrivals */}
{/* New Arrivals */}
    <section className={`py-16 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            New Arrivals
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Latest products just added to our store
          </p>
        </motion.div>

        <div className="product-grid">
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Products */}
{/* Featured Products */}
    <section className={`py-16 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-surface to-gray-50'
    }`}>
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Featured Products
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Handpicked products our customers love
          </p>
        </motion.div>

        <div className="product-grid">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
{/* Features Section */}
    <section className={`py-16 text-white transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-r from-orange-600 to-red-600' 
        : 'bg-gradient-to-r from-secondary to-orange-500'
    }`}>
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose AliBix?
          </h2>
          <p className={`text-lg ${isDark ? 'text-orange-200' : 'text-orange-100'}`}>
            Your trusted shopping partner in Pakistan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: 'Truck',
              title: 'Free Shipping',
              description: 'Free delivery on orders over Rs. 2000',
            },
            {
              icon: 'Shield',
              title: 'Secure Payments',
              description: 'Multiple payment options available',
            },
            {
              icon: 'RefreshCw',
              title: 'Easy Returns',
              description: '7-day return policy',
            },
            {
              icon: 'Headphones',
              title: '24/7 Support',
              description: 'Round the clock customer service',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name={feature.icon} size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className={isDark ? 'text-orange-200' : 'text-orange-100'}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
  );
};

export default Home;