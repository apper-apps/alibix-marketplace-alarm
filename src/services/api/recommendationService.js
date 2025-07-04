import { productService } from './productService';
import { viewTrackingService } from './viewTrackingService';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// AI recommendation weights and configurations
const RECOMMENDATION_CONFIG = {
  viewHistoryWeight: 0.4,
  searchHistoryWeight: 0.3,
  categoryPreferenceWeight: 0.2,
  popularityWeight: 0.1,
  maxRecommendations: 12,
  accuracyRate: 0.6 // 60% accuracy as requested
};

export const recommendationService = {
  async getPersonalizedRecommendations(limit = 8) {
    await delay(400);
    
    try {
      const [allProducts, viewHistory, searchHistory] = await Promise.all([
        productService.getAll(),
        viewTrackingService.getRecentlyViewed(),
        this.getSearchHistory()
      ]);

      // Analyze user preferences
      const userPreferences = this.analyzeUserPreferences(viewHistory, searchHistory);
      
      // Generate recommendations with AI simulation
      const recommendations = this.generateRecommendations(
        allProducts, 
        userPreferences, 
        viewHistory.map(v => v.Id)
      );

      // Apply 60% accuracy simulation
      const finalRecommendations = this.applyAccuracySimulation(recommendations, limit);
      
      return finalRecommendations;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      // Fallback to featured products
      return await productService.getFeatured().then(products => products.slice(0, limit));
    }
  },

  async getRecommendationsBasedOnProduct(productId, limit = 6) {
    await delay(300);
    
    try {
      const [currentProduct, allProducts, viewHistory] = await Promise.all([
        productService.getById(productId),
        productService.getAll(),
        viewTrackingService.getRecentlyViewed()
      ]);

      // Find similar products based on category and attributes
      const similarProducts = allProducts.filter(product => {
        if (product.Id === parseInt(productId)) return false;
        
        // Category match (high weight)
        if (product.category === currentProduct.category) return true;
        
        // Price range similarity
        const priceDiff = Math.abs(product.price - currentProduct.price) / currentProduct.price;
        if (priceDiff < 0.3) return true;
        
        return false;
      });

      // Score and sort recommendations
      const scoredProducts = similarProducts.map(product => ({
        ...product,
        recommendationScore: this.calculateSimilarityScore(product, currentProduct, viewHistory)
      }));

      return scoredProducts
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, limit);
        
    } catch (error) {
      console.error('Error getting product recommendations:', error);
      return await productService.getRelated(productId);
    }
  },

  async getCategoryBasedRecommendations(category, limit = 8) {
    await delay(250);
    
    try {
      const [categoryProducts, viewHistory] = await Promise.all([
        productService.getByCategory(category),
        viewTrackingService.getRecentlyViewed()
      ]);

      // Filter out already viewed products and score remaining
      const viewedIds = viewHistory.map(v => v.Id);
      const unviewedProducts = categoryProducts.filter(p => !viewedIds.includes(p.Id));
      
      // Score based on popularity and user preferences
      const scoredProducts = unviewedProducts.map(product => ({
        ...product,
        recommendationScore: this.calculateCategoryScore(product, viewHistory)
      }));

      return scoredProducts
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, limit);
        
    } catch (error) {
      console.error('Error getting category recommendations:', error);
      return [];
    }
  },

  async getSearchHistory() {
    const searchHistory = localStorage.getItem('alibix_search_history');
    return searchHistory ? JSON.parse(searchHistory) : [];
  },

  async addToSearchHistory(query, resultCount = 0) {
    const searchHistory = await this.getSearchHistory();
    const searchEntry = {
      query: query.toLowerCase(),
      timestamp: Date.now(),
      resultCount,
      frequency: 1
    };

    // Update frequency if search exists
    const existingIndex = searchHistory.findIndex(s => s.query === searchEntry.query);
    if (existingIndex >= 0) {
      searchHistory[existingIndex].frequency += 1;
      searchHistory[existingIndex].timestamp = Date.now();
    } else {
      searchHistory.unshift(searchEntry);
    }

    // Keep only last 50 searches
    const limitedHistory = searchHistory.slice(0, 50);
    localStorage.setItem('alibix_search_history', JSON.stringify(limitedHistory));
    
    return limitedHistory;
  },

  analyzeUserPreferences(viewHistory, searchHistory) {
    const preferences = {
      categories: {},
      priceRanges: {},
      brands: {},
      searchTerms: {}
    };

    // Analyze view history
    viewHistory.forEach(product => {
      preferences.categories[product.category] = 
        (preferences.categories[product.category] || 0) + 1;
      
      // Price range analysis
      const priceRange = this.getPriceRange(product.price);
      preferences.priceRanges[priceRange] = 
        (preferences.priceRanges[priceRange] || 0) + 1;
      
      if (product.brand) {
        preferences.brands[product.brand] = 
          (preferences.brands[product.brand] || 0) + 1;
      }
    });

    // Analyze search history
    searchHistory.forEach(search => {
      preferences.searchTerms[search.query] = 
        (preferences.searchTerms[search.query] || 0) + search.frequency;
    });

    return preferences;
  },

  generateRecommendations(allProducts, userPreferences, excludeIds = []) {
    return allProducts
      .filter(product => !excludeIds.includes(product.Id))
      .map(product => ({
        ...product,
        recommendationScore: this.calculateRecommendationScore(product, userPreferences)
      }))
      .sort((a, b) => b.recommendationScore - a.recommendationScore);
  },

  calculateRecommendationScore(product, preferences) {
    let score = 0;
    const config = RECOMMENDATION_CONFIG;

    // Category preference score
    const categoryScore = preferences.categories[product.category] || 0;
    score += categoryScore * config.categoryPreferenceWeight;

    // Price range preference score
    const priceRange = this.getPriceRange(product.price);
    const priceScore = preferences.priceRanges[priceRange] || 0;
    score += priceScore * config.viewHistoryWeight;

    // Brand preference score
    if (product.brand && preferences.brands[product.brand]) {
      score += preferences.brands[product.brand] * 0.15;
    }

    // Search term relevance
    const searchRelevance = this.calculateSearchRelevance(product, preferences.searchTerms);
    score += searchRelevance * config.searchHistoryWeight;

    // Popularity factors
    const popularityScore = (product.rating || 0) * 2 + 
                           Math.log(product.reviews || 1) * 0.5 +
                           (product.featured ? 5 : 0);
    score += popularityScore * config.popularityWeight;

    // Discount boost
    if (product.discountPrice && product.discountPrice < product.price) {
      score += 3;
    }

    return Math.max(0, score);
  },

  calculateSimilarityScore(product, currentProduct, viewHistory) {
    let score = 0;

    // Category match
    if (product.category === currentProduct.category) {
      score += 10;
    }

    // Price similarity
    const priceDiff = Math.abs(product.price - currentProduct.price) / currentProduct.price;
    score += Math.max(0, 5 - priceDiff * 10);

    // Rating similarity
    const ratingDiff = Math.abs((product.rating || 0) - (currentProduct.rating || 0));
    score += Math.max(0, 3 - ratingDiff);

    // Brand match
    if (product.brand && product.brand === currentProduct.brand) {
      score += 4;
    }

    return score;
  },

  calculateCategoryScore(product, viewHistory) {
    let score = (product.rating || 0) * 2 + Math.log(product.reviews || 1);
    
    if (product.featured) score += 3;
    if (product.discountPrice && product.discountPrice < product.price) score += 2;
    if (product.isNew) score += 1;
    
    return score;
  },

  calculateSearchRelevance(product, searchTerms) {
    let relevance = 0;
    
    Object.entries(searchTerms).forEach(([term, frequency]) => {
      const productText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      if (productText.includes(term)) {
        relevance += frequency * 2;
      }
    });
    
    return relevance;
  },

  getPriceRange(price) {
    if (price < 1000) return 'under-1k';
    if (price < 5000) return '1k-5k';
    if (price < 10000) return '5k-10k';
    if (price < 25000) return '10k-25k';
    if (price < 50000) return '25k-50k';
    return 'over-50k';
  },

  applyAccuracySimulation(recommendations, limit) {
    const accurateCount = Math.floor(limit * RECOMMENDATION_CONFIG.accuracyRate);
    const randomCount = limit - accurateCount;
    
    // Take top accurate recommendations
    const accurateRecommendations = recommendations.slice(0, accurateCount);
    
    // Add some random recommendations to simulate 60% accuracy
    const remainingProducts = recommendations.slice(accurateCount);
    const randomRecommendations = remainingProducts
      .sort(() => Math.random() - 0.5)
      .slice(0, randomCount);
    
    return [...accurateRecommendations, ...randomRecommendations].slice(0, limit);
  }
};