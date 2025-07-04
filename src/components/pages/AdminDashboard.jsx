import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { productService } from '@/services/api/productService';
import { orderService } from '@/services/api/orderService';
import { userService } from '@/services/api/userService';
import { categoryService } from '@/services/api/categoryService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalCategories: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    newUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load all dashboard statistics
      const [products, orders, users, categories] = await Promise.all([
        productService.getAll(),
        orderService.getAll(),
        userService.getAll(),
        categoryService.getAll(),
      ]);

      // Calculate statistics
      const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      const pendingOrders = orders.filter(order => order.status === 'pending').length;
      const lowStockProducts = products.filter(product => product.stock <= 10).length;
      const newUsers = users.filter(user => {
        const createdAt = new Date(user.createdAt);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return createdAt >= thirtyDaysAgo;
      }).length;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalCategories: categories.length,
        totalRevenue,
        pendingOrders,
        lowStockProducts,
        newUsers,
      });

      // Set recent orders (last 5)
      const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentOrders(sortedOrders.slice(0, 5));

      // Set top products
      const topSellingProducts = products
        .sort((a, b) => (b.sold || 0) - (a.sold || 0))
        .slice(0, 5);
      setTopProducts(topSellingProducts);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: 'Package',
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: 'ShoppingBag',
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: 'Users',
      color: 'bg-purple-500',
      change: '+15%',
    },
    {
      title: 'Revenue',
      value: `Rs. ${stats.totalRevenue.toLocaleString()}`,
      icon: 'DollarSign',
      color: 'bg-orange-500',
      change: '+23%',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: 'Clock',
      color: 'bg-yellow-500',
      change: '+5%',
    },
    {
      title: 'Low Stock',
      value: stats.lowStockProducts,
      icon: 'AlertTriangle',
      color: 'bg-red-500',
      change: '-2%',
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: 'Grid3X3',
      color: 'bg-indigo-500',
      change: '+3%',
    },
    {
      title: 'New Users',
      value: stats.newUsers,
      icon: 'UserPlus',
      color: 'bg-cyan-500',
      change: '+18%',
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to AliBix Admin Panel</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                <p className="text-green-600 text-sm mt-1">{card.change}</p>
              </div>
              <div className={`${card.color} rounded-full p-3`}>
                <ApperIcon name={card.icon} size={24} className="text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <ApperIcon name="ShoppingBag" size={20} className="text-gray-600" />
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.Id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Order #{order.Id}</p>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">Rs. {order.total.toLocaleString()}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Top Products</h2>
            <ApperIcon name="TrendingUp" size={20} className="text-gray-600" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.Id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">Rs. {product.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{product.sold || 0} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;