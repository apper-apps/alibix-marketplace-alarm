import mockCategories from '@/services/mockData/categories.json';

let categories = [...mockCategories];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(150);
    const category = categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    return { ...category };
  },

  async getBySlug(slug) {
    await delay(150);
    const category = categories.find(c => c.slug === slug);
    if (!category) {
      throw new Error(`Category with slug ${slug} not found`);
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(250);
    const newCategory = {
      ...categoryData,
      Id: Math.max(...categories.map(c => c.Id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, categoryData) {
    await delay(250);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Category with ID ${id} not found`);
    }
    
    categories[index] = {
      ...categories[index],
      ...categoryData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString(),
    };
    
    return { ...categories[index] };
  },

  async delete(id) {
    await delay(250);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Category with ID ${id} not found`);
    }
    
    const deletedCategory = categories.splice(index, 1)[0];
    return { ...deletedCategory };
  },

  async getFeatured() {
    await delay(200);
    return categories.filter(c => c.featured === true);
  },

  async getWithProductCount() {
    await delay(300);
    // In a real app, this would join with products table
    return categories.map(category => ({
      ...category,
      productCount: Math.floor(Math.random() * 50) + 1, // Mock product count
    }));
  },

  // Generate slug from name
  generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  },

  // Validate category data
  validateCategory(categoryData) {
    const errors = [];
    
    if (!categoryData.name || categoryData.name.trim().length < 2) {
      errors.push('Category name must be at least 2 characters long');
    }
    
    if (!categoryData.nameUrdu || categoryData.nameUrdu.trim().length < 2) {
      errors.push('Urdu name must be at least 2 characters long');
    }
    
    if (!categoryData.image || !categoryData.image.startsWith('http')) {
      errors.push('Valid image URL is required');
    }
    
    return errors;
  },

  // Check if slug exists
  async isSlugExists(slug, excludeId = null) {
    await delay(100);
    return categories.some(c => c.slug === slug && c.Id !== excludeId);
  },
};