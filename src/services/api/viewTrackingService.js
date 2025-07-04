import { productService } from './productService';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEY = 'alibix_recently_viewed';
const MAX_VIEWED_PRODUCTS = 20;

export const viewTrackingService = {
  async trackProductView(productId) {
    await delay(100);
    
    try {
      // Get product details
      const product = await productService.getById(productId);
      
      // Get current viewed products
      const recentlyViewed = await this.getRecentlyViewed();
      
      // Create view entry
      const viewEntry = {
        ...product,
        viewedAt: Date.now(),
        viewCount: 1
      };
      
      // Remove if already exists and add to beginning
      const filtered = recentlyViewed.filter(item => item.Id !== parseInt(productId));
      
      // Update view count if product was viewed before
      const existingView = recentlyViewed.find(item => item.Id === parseInt(productId));
      if (existingView) {
        viewEntry.viewCount = existingView.viewCount + 1;
      }
      
      const updatedViewed = [viewEntry, ...filtered].slice(0, MAX_VIEWED_PRODUCTS);
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedViewed));
      
      // Simulate database sync (in real app, this would sync with backend)
      await this.syncWithDatabase(updatedViewed);
      
      return updatedViewed;
    } catch (error) {
      console.error('Error tracking product view:', error);
      return await this.getRecentlyViewed();
    }
  },

  async getRecentlyViewed() {
    await delay(150);
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const recentlyViewed = stored ? JSON.parse(stored) : [];
      
      // Filter out any invalid entries and ensure proper structure
      const validViewed = recentlyViewed.filter(item => 
        item && item.Id && item.name && item.images && item.images.length > 0
      );
      
      return validViewed;
    } catch (error) {
      console.error('Error getting recently viewed:', error);
      return [];
    }
  },

  async clearRecentlyViewed() {
    await delay(100);
    
    localStorage.removeItem(STORAGE_KEY);
    await this.syncWithDatabase([]);
    
    return [];
  },

  async removeFromRecentlyViewed(productId) {
    await delay(100);
    
    try {
      const recentlyViewed = await this.getRecentlyViewed();
      const filtered = recentlyViewed.filter(item => item.Id !== parseInt(productId));
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      await this.syncWithDatabase(filtered);
      
      return filtered;
    } catch (error) {
      console.error('Error removing from recently viewed:', error);
      return await this.getRecentlyViewed();
    }
  },

  async getViewHistory(limit = 50) {
    await delay(200);
    
    try {
      const recentlyViewed = await this.getRecentlyViewed();
      
      // Sort by most recent and limit results
      return recentlyViewed
        .sort((a, b) => b.viewedAt - a.viewedAt)
        .slice(0, limit)
        .map(item => ({
          productId: item.Id,
          productName: item.name,
          category: item.category,
          viewedAt: item.viewedAt,
          viewCount: item.viewCount
        }));
    } catch (error) {
      console.error('Error getting view history:', error);
      return [];
    }
  },

  async getViewStats() {
    await delay(150);
    
    try {
      const recentlyViewed = await this.getRecentlyViewed();
      const viewHistory = await this.getViewHistory();
      
      // Calculate category preferences
      const categoryStats = {};
      recentlyViewed.forEach(item => {
        categoryStats[item.category] = (categoryStats[item.category] || 0) + item.viewCount;
      });
      
      // Calculate viewing patterns
      const now = Date.now();
      const last24Hours = recentlyViewed.filter(item => now - item.viewedAt < 24 * 60 * 60 * 1000);
      const lastWeek = recentlyViewed.filter(item => now - item.viewedAt < 7 * 24 * 60 * 60 * 1000);
      
      return {
        totalViewed: recentlyViewed.length,
        totalViewCount: recentlyViewed.reduce((sum, item) => sum + item.viewCount, 0),
        last24Hours: last24Hours.length,
        lastWeek: lastWeek.length,
        categoryPreferences: Object.entries(categoryStats)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5),
        mostViewedProducts: recentlyViewed
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, 5)
          .map(item => ({
            id: item.Id,
            name: item.name,
            viewCount: item.viewCount
          }))
      };
    } catch (error) {
      console.error('Error getting view stats:', error);
      return {
        totalViewed: 0,
        totalViewCount: 0,
        last24Hours: 0,
        lastWeek: 0,
        categoryPreferences: [],
        mostViewedProducts: []
      };
    }
  },

  async syncWithDatabase(viewedProducts) {
    // Simulate database synchronization
    await delay(200);
    
    try {
      // In a real application, this would send data to backend
      // For now, we simulate the API call and store in a separate key
      const syncData = {
        userId: 'guest', // In real app, this would be actual user ID
        viewedProducts: viewedProducts.map(item => ({
          productId: item.Id,
          viewedAt: item.viewedAt,
          viewCount: item.viewCount
        })),
        syncedAt: Date.now()
      };
      
      localStorage.setItem(`${STORAGE_KEY}_sync`, JSON.stringify(syncData));
      
      return { success: true, syncedAt: syncData.syncedAt };
    } catch (error) {
      console.error('Error syncing with database:', error);
      return { success: false, error: error.message };
    }
  },

  async loadFromDatabase() {
    // Simulate loading from database
    await delay(300);
    
    try {
      const syncData = localStorage.getItem(`${STORAGE_KEY}_sync`);
      if (!syncData) return [];
      
      const parsed = JSON.parse(syncData);
      
      // In real app, this would fetch full product details from backend
      // For simulation, we'll reconstruct from product service
      const productIds = parsed.viewedProducts.map(item => item.productId);
      const products = await Promise.all(
        productIds.map(async (id) => {
          try {
            const product = await productService.getById(id);
            const viewData = parsed.viewedProducts.find(item => item.productId === id);
            return {
              ...product,
              viewedAt: viewData.viewedAt,
              viewCount: viewData.viewCount
            };
          } catch (error) {
            return null;
          }
        })
      );
      
      return products.filter(Boolean);
    } catch (error) {
      console.error('Error loading from database:', error);
      return [];
    }
  },

  async mergeLocalAndRemoteData() {
    await delay(250);
    
    try {
      const [localViewed, remoteViewed] = await Promise.all([
        this.getRecentlyViewed(),
        this.loadFromDatabase()
      ]);
      
      // Merge local and remote data, preferring most recent views
      const merged = [...localViewed];
      
      remoteViewed.forEach(remoteItem => {
        const localIndex = merged.findIndex(local => local.Id === remoteItem.Id);
        
        if (localIndex >= 0) {
          // Keep the most recent view data
          if (remoteItem.viewedAt > merged[localIndex].viewedAt) {
            merged[localIndex] = remoteItem;
          }
        } else {
          merged.push(remoteItem);
        }
      });
      
      // Sort by most recent and limit
      const finalMerged = merged
        .sort((a, b) => b.viewedAt - a.viewedAt)
        .slice(0, MAX_VIEWED_PRODUCTS);
      
      // Save merged data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalMerged));
      await this.syncWithDatabase(finalMerged);
      
      return finalMerged;
    } catch (error) {
      console.error('Error merging view data:', error);
      return await this.getRecentlyViewed();
    }
  }
};