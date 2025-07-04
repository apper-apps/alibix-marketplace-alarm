import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Price from '@/components/atoms/Price';
import QuantitySelector from '@/components/molecules/QuantitySelector';
import { orderService } from '@/services/api/orderService';

const Cart = () => {
  const navigate = useNavigate();
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { t, language } = useLanguage();
  const { isDark } = useTheme();

  const deliveryFee = 170;
  const orderTotal = total + deliveryFee;

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container-responsive py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-16 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg`}
          >
            <ApperIcon name="ShoppingCart" size={64} className={`mx-auto mb-6 ${isDark ? 'text-gray-400' : 'text-gray-300'}`} />
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Your cart is empty
            </h2>
            <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Add some products to get started
            </p>
            <Button
              variant="primary"
              size="large"
              icon="ArrowLeft"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Shopping Cart ({itemCount} items)
          </motion.h1>
          
          <Button
            variant="outline"
            size="small"
            icon="Trash2"
            onClick={clearCart}
            className="text-red-600 hover:text-red-700"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl p-6 shadow-lg border`}
              >
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'ur' ? item.nameUrdu : item.name}
                    </h3>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <Price
                        originalPrice={item.price}
                        discountPrice={item.discountPrice}
                        size="medium"
                      />
                      
                      {item.stock <= 5 && item.stock > 0 && (
                        <span className="text-yellow-600 text-sm font-medium">
                          Only {item.stock} left!
                        </span>
                      )}
                    </div>

                    {/* Quantity and Remove */}
                    <div className="flex items-center justify-between">
                      <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={(newQuantity) => handleQuantityChange(item.Id, newQuantity)}
                        min={1}
                        max={Math.min(item.stock, 10)}
                        className="w-32"
                      />

                      <div className="flex items-center space-x-4">
                        <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Rs. {((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item.Id)}
                          className={`p-2 rounded-lg hover:bg-red-100 transition-colors ${
                            isDark ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600'
                          }`}
                        >
                          <ApperIcon name="Trash2" size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl p-6 shadow-lg border sticky top-8`}
            >
              <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Subtotal ({itemCount} items)</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
                
                <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Delivery Fee</span>
                  <span>Rs. {deliveryFee.toLocaleString()}</span>
                </div>
                
                <div className={`border-t pt-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`flex justify-between text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <span>Total</span>
                    <span>Rs. {orderTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="large"
                  icon="CreditCard"
                  onClick={handleCheckout}
                  className="w-full"
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  variant="outline"
                  size="large"
                  icon="ArrowLeft"
                  onClick={handleContinueShopping}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>

              {/* Delivery Info */}
              <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50'}`}>
                <div className="flex items-start space-x-2">
                  <ApperIcon name="Truck" size={16} className={isDark ? 'text-blue-400 mt-0.5' : 'text-blue-600 mt-0.5'} />
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>
                      Standard Delivery
                    </p>
                    <p className={`text-xs ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                      3-5 business days • Rs. {deliveryFee}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;