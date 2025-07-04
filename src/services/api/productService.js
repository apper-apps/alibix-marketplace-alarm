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
};