import mockOrders from '@/services/mockData/orders.json';

let orders = [...mockOrders];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const orderService = {
  async getAll() {
    await delay(300);
    return [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getById(id) {
    await delay(200);
    const order = orders.find(o => o.Id === parseInt(id));
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return { ...order };
  },

  async getByUserId(userId) {
    await delay(250);
    return orders.filter(o => o.userId === parseInt(userId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async create(orderData) {
    await delay(400);
    const newOrder = {
      ...orderData,
      Id: Math.max(...orders.map(o => o.Id)) + 1,
      status: 'pending',
      trackingNumber: generateTrackingNumber(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    return { ...newOrder };
  },

  async update(id, orderData) {
    await delay(300);
    const index = orders.findIndex(o => o.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Order with ID ${id} not found`);
    }
    
    orders[index] = {
      ...orders[index],
      ...orderData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString(),
    };
    
    return { ...orders[index] };
  },

  async updateStatus(id, status) {
    await delay(250);
    const index = orders.findIndex(o => o.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Order with ID ${id} not found`);
    }
    
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid order status: ${status}`);
    }
    
    orders[index].status = status;
    orders[index].updatedAt = new Date().toISOString();
    
    // Add status history
    if (!orders[index].statusHistory) {
      orders[index].statusHistory = [];
    }
    orders[index].statusHistory.push({
      status,
      timestamp: new Date().toISOString(),
      note: `Order ${status}`,
    });
    
    return { ...orders[index] };
  },

  async delete(id) {
    await delay(300);
    const index = orders.findIndex(o => o.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Order with ID ${id} not found`);
    }
    
    const deletedOrder = orders.splice(index, 1)[0];
    return { ...deletedOrder };
  },

  async getByStatus(status) {
    await delay(250);
    return orders.filter(o => o.status === status)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getRecentOrders(limit = 10) {
    await delay(200);
    return orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  },

  async getOrdersByDateRange(startDate, endDate) {
    await delay(300);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return orders.filter(o => {
      const orderDate = new Date(o.createdAt);
      return orderDate >= start && orderDate <= end;
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getOrderStats() {
    await delay(200);
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      totalRevenue: orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.total, 0),
    };
    
    return stats;
  },

  // Calculate order totals
calculateOrderTotal(items, promoDiscount = 0, codFee = 0) {
    const subtotal = items.reduce((sum, item) => {
      const price = item.discountPrice || item.price;
      return sum + (price * item.quantity);
    }, 0);
    
    const deliveryFee = 170; // Fixed delivery fee Rs. 170
    const discountAmount = Math.min(promoDiscount, subtotal * 0.5); // Max 50% discount
    const total = subtotal + deliveryFee + codFee - discountAmount;
    
    return {
      subtotal,
      deliveryFee,
      promoDiscount: discountAmount,
      codFee,
      total: Math.max(total, 0),
    };
  },

  // Validate order data
  validateOrder(orderData) {
    const errors = [];
    
    if (!orderData.items || orderData.items.length === 0) {
      errors.push('Order must contain at least one item');
    }
    
    if (!orderData.shippingAddress) {
      errors.push('Shipping address is required');
    }
    
    if (!orderData.paymentMethod) {
      errors.push('Payment method is required');
    }
    
    if (!orderData.phone || orderData.phone.length < 10) {
      errors.push('Valid phone number is required');
    }
    
    return errors;
  },

  // Generate tracking number
  generateTrackingNumber() {
    const prefix = 'AB';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  },
};

// Helper function to generate tracking number
function generateTrackingNumber() {
  const prefix = 'AB';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}