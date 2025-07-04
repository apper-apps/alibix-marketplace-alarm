import mockProducts from '@/services/mockData/products.json';

let products = [...mockProducts];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll() {
    await delay(300);
    return [...products];
  },

  async getById(id) {
    await delay(200);
    const product = products.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return { ...product };
  },

  async getByCategory(categorySlug) {
    await delay(300);
    return products.filter(p => p.category.toLowerCase() === categorySlug.toLowerCase());
  },

  async getFeatured() {
    await delay(250);
    return products.filter(p => p.featured === true);
  },

  async getNewArrivals() {
    await delay(250);
    return products.filter(p => p.isNew === true);
  },

  async getDiscounted() {
    await delay(250);
    return products.filter(p => p.discountPrice && p.discountPrice < p.price);
  },

  async search(query) {
    await delay(300);
    const searchTerm = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.nameUrdu.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  },

  async searchByImage(imageData) {
    await delay(500);
    // Simulate image processing and matching
    // In a real app, this would send the image to an ML service
    const categories = ['electronics', 'clothing', 'shoes', 'accessories'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    return products.filter(p => p.category.toLowerCase() === randomCategory).slice(0, 10);
  },

  async getRelated(productId) {
    await delay(200);
    const product = products.find(p => p.Id === parseInt(productId));
    if (!product) return [];
    
    return products
      .filter(p => p.Id !== parseInt(productId) && p.category === product.category)
      .slice(0, 6);
  },

async create(productData) {
    await delay(300);
    const newProduct = {
      ...productData,
      Id: Math.max(...products.map(p => p.Id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sold: 0,
      reviews: 0,
      rating: 0,
    };
    products.push(newProduct);
    return { ...newProduct };
  },

  async update(id, productData) {
    await delay(300);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    products[index] = {
      ...products[index],
      ...productData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString(),
    };
    
    return { ...products[index] };
  },

  async delete(id) {
    await delay(300);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    const deletedProduct = products.splice(index, 1)[0];
    return { ...deletedProduct };
  },

  async updateStock(id, stock) {
    await delay(200);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    products[index].stock = stock;
    products[index].updatedAt = new Date().toISOString();
    
    return { ...products[index] };
  },

  async applyDiscount(id, discountPrice) {
    await delay(200);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    products[index].discountPrice = discountPrice;
    products[index].updatedAt = new Date().toISOString();
    
    return { ...products[index] };
  },

  async removeDiscount(id) {
    await delay(200);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    delete products[index].discountPrice;
    products[index].updatedAt = new Date().toISOString();
    
    return { ...products[index] };
  },

  // Calculate discount percentage
  calculateDiscountPercentage(originalPrice, discountPrice) {
    if (!discountPrice || discountPrice >= originalPrice) return 0;
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  },

  // Get products with low stock
  async getLowStock(threshold = 10) {
    await delay(250);
    return products.filter(p => p.stock <= threshold);
  },

  // Get top selling products (mock)
  async getTopSelling() {
    await delay(250);
    return products.sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 10);
  },
// AI Recommendation endpoints
  async getRecommendationsBasedOnViews(viewHistory = [], limit = 6) {
    await delay(300);
    
    if (viewHistory.length === 0) {
      return this.getFeatured().then(featured => featured.slice(0, limit));
    }
    
    // Extract categories and preferences from view history
    const categoryFrequency = {};
    const priceRanges = [];
    
    viewHistory.forEach(item => {
      categoryFrequency[item.category] = (categoryFrequency[item.category] || 0) + 1;
      priceRanges.push(item.price || 0);
    });
    
    // Find most viewed categories
    const topCategories = Object.entries(categoryFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);
    
    // Calculate average price range
    const avgPrice = priceRanges.length > 0 
      ? priceRanges.reduce((sum, price) => sum + price, 0) / priceRanges.length 
      : 5000;
    
    // Get viewed product IDs to exclude
    const viewedIds = viewHistory.map(item => item.Id);
    
    // Find similar products
    const recommendations = products.filter(product => {
      // Exclude already viewed products
      if (viewedIds.includes(product.Id)) return false;
      
      // Prefer products in viewed categories
      if (topCategories.includes(product.category)) return true;
      
      // Include products in similar price range
      const priceDiff = Math.abs(product.price - avgPrice) / avgPrice;
      return priceDiff < 0.5;
    });
    
    // Score and sort recommendations
    const scoredRecommendations = recommendations.map(product => {
      let score = 0;
      
      // Category preference score
      if (topCategories.includes(product.category)) {
        const categoryIndex = topCategories.indexOf(product.category);
        score += (3 - categoryIndex) * 10;
      }
      
      // Price similarity score
      const priceDiff = Math.abs(product.price - avgPrice) / avgPrice;
      score += Math.max(0, 5 - priceDiff * 10);
      
      // Product quality indicators
      score += (product.rating || 0) * 2;
      score += Math.log(product.reviews || 1);
      
      if (product.featured) score += 3;
      if (product.discountPrice && product.discountPrice < product.price) score += 2;
      
      return { ...product, recommendationScore: score };
    });
    
    return scoredRecommendations
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, limit);
  },

  async trackProductInteraction(productId, interactionType = 'view') {
    await delay(100);
    
    // Store interaction data for analytics
    const interactions = JSON.parse(localStorage.getItem('alibix_interactions') || '[]');
    
    const interaction = {
      productId: parseInt(productId),
      type: interactionType,
      timestamp: Date.now(),
      sessionId: this.getSessionId()
    };
    
    interactions.push(interaction);
    
    // Keep only last 200 interactions
    const limitedInteractions = interactions.slice(-200);
    localStorage.setItem('alibix_interactions', JSON.stringify(limitedInteractions));
    
    return interaction;
  },

  getSessionId() {
    let sessionId = sessionStorage.getItem('alibix_session_id');
    if (!sessionId) {
      sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      sessionStorage.setItem('alibix_session_id', sessionId);
    }
    return sessionId;
  },

  async getInteractionHistory(limit = 50) {
    await delay(150);
    
    const interactions = JSON.parse(localStorage.getItem('alibix_interactions') || '[]');
    return interactions
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
},

  // Admin-specific operations
  async uploadImage(imageFile) {
    await delay(500);
    // In a real app, this would upload to a cloud storage service
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.readAsDataURL(imageFile);
    });
  },

  async bulkUpdate(updates) {
    await delay(400);
    const updatedProducts = [];
    
    for (const update of updates) {
      const index = products.findIndex(p => p.Id === update.Id);
      if (index !== -1) {
        products[index] = {
          ...products[index],
          ...update,
          updatedAt: new Date().toISOString(),
        };
        updatedProducts.push({ ...products[index] });
      }
    }
    
    return updatedProducts;
  },

  async bulkDelete(ids) {
    await delay(400);
    const deletedProducts = [];
    
    for (const id of ids) {
      const index = products.findIndex(p => p.Id === parseInt(id));
      if (index !== -1) {
        deletedProducts.push({ ...products[index] });
        products.splice(index, 1);
      }
    }
    
    return deletedProducts;
  },

  async getStockReport() {
    await delay(300);
    const stockLevels = {
      outOfStock: products.filter(p => p.stock === 0).length,
      lowStock: products.filter(p => p.stock > 0 && p.stock <= 10).length,
      mediumStock: products.filter(p => p.stock > 10 && p.stock <= 50).length,
      highStock: products.filter(p => p.stock > 50).length,
    };
    
    return {
      ...stockLevels,
      total: products.length,
      averageStock: products.reduce((sum, p) => sum + p.stock, 0) / products.length,
    };
  },

  async getSalesReport() {
    await delay(300);
    const totalSales = products.reduce((sum, p) => sum + (p.sold || 0), 0);
    const totalRevenue = products.reduce((sum, p) => sum + (p.sold || 0) * p.price, 0);
    
    return {
      totalSales,
      totalRevenue,
      averageSalePrice: totalRevenue / totalSales || 0,
      topSellingProducts: products
        .sort((a, b) => (b.sold || 0) - (a.sold || 0))
        .slice(0, 10),
    };
  },

  async getCategoryReport() {
    await delay(300);
    const categoryStats = {};
    
    products.forEach(product => {
      if (!categoryStats[product.category]) {
        categoryStats[product.category] = {
          count: 0,
          totalValue: 0,
          averagePrice: 0,
          totalSold: 0,
        };
      }
      
      categoryStats[product.category].count++;
      categoryStats[product.category].totalValue += product.price;
      categoryStats[product.category].totalSold += product.sold || 0;
    });
    
    Object.keys(categoryStats).forEach(category => {
      categoryStats[category].averagePrice = 
        categoryStats[category].totalValue / categoryStats[category].count;
    });
    
    return categoryStats;
  },

  // Product validation
  validateProduct(productData) {
    const errors = {};
    
    if (!productData.name || productData.name.trim().length < 2) {
      errors.name = 'Product name must be at least 2 characters long';
    }
    
    if (!productData.description || productData.description.trim().length < 10) {
      errors.description = 'Product description must be at least 10 characters long';
    }
    
    if (!productData.price || productData.price <= 0) {
      errors.price = 'Product price must be greater than 0';
    }
    
    if (!productData.stock || productData.stock < 0) {
      errors.stock = 'Product stock cannot be negative';
    }
    
    if (!productData.category || productData.category.trim().length === 0) {
      errors.category = 'Product category is required';
    }
    
    if (!productData.image || productData.image.trim().length === 0) {
      errors.image = 'Product image is required';
    }
    
    if (productData.discountPrice && productData.discountPrice >= productData.price) {
      errors.discountPrice = 'Discount price must be less than regular price';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};