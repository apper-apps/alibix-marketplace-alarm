import mockUsers from '@/services/mockData/users.json';

let users = [...mockUsers];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  async getAll() {
    await delay(300);
    return [...users];
  },

  async getById(id) {
    await delay(200);
    const user = users.find(u => u.Id === parseInt(id));
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return { ...user };
  },

  async getByEmail(email) {
    await delay(200);
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return { ...user };
  },

  async create(userData) {
    await delay(300);
    const newUser = {
      ...userData,
      Id: Math.max(...users.map(u => u.Id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(newUser);
    return { ...newUser };
  },

  async update(id, userData) {
    await delay(300);
    const index = users.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    users[index] = {
      ...users[index],
      ...userData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString(),
    };
    
    return { ...users[index] };
  },

  async delete(id) {
    await delay(300);
    const index = users.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    const deletedUser = users.splice(index, 1)[0];
    return { ...deletedUser };
  },

  async updateWishlist(id, wishlist) {
    await delay(200);
    const index = users.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    users[index].wishlist = wishlist;
    users[index].updatedAt = new Date().toISOString();
    
    return { ...users[index] };
  },

  async updateAddresses(id, addresses) {
    await delay(200);
    const index = users.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    users[index].addresses = addresses;
    users[index].updatedAt = new Date().toISOString();
    
    return { ...users[index] };
  },

  async updatePreferences(id, preferences) {
    await delay(200);
    const index = users.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    users[index].preferences = {
      ...users[index].preferences,
      ...preferences,
    };
    users[index].updatedAt = new Date().toISOString();
    
    return { ...users[index] };
  },

  async getUserStats() {
    await delay(200);
    const stats = {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      inactive: users.filter(u => u.status === 'inactive').length,
      newThisMonth: users.filter(u => {
        const userDate = new Date(u.createdAt);
        const now = new Date();
        return userDate.getMonth() === now.getMonth() && userDate.getFullYear() === now.getFullYear();
      }).length,
    };
    
    return stats;
  },

  // Validate user data
  validateUser(userData) {
    const errors = [];
    
    if (!userData.name || userData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    
    if (!userData.email || !isValidEmail(userData.email)) {
      errors.push('Valid email address is required');
    }
    
    if (!userData.phone || userData.phone.length < 10) {
      errors.push('Valid phone number is required');
    }
    
    return errors;
  },

  // Check if email exists
  async isEmailExists(email, excludeId = null) {
    await delay(100);
    return users.some(u => u.email === email && u.Id !== excludeId);
  },

  // Get user's order history
  async getUserOrders(userId) {
    await delay(200);
    // This would typically join with orders table
    // For now, we'll return mock data
    return [];
  },

  // Get user's wishlist with product details
  async getUserWishlist(userId) {
    await delay(200);
    const user = users.find(u => u.Id === parseInt(userId));
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    return user.wishlist || [];
  },
};

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}