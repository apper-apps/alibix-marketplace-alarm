import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { orderService } from '@/services/api/orderService';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, itemCount, clearCart } = useCart();
  const { t, language } = useLanguage();
  const { isDark } = useTheme();

  const [step, setStep] = useState('checkout'); // 'checkout' or 'confirmation'
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: '',
    bankName: '',
    promoCode: '',
  });

  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const deliveryFee = 170;
  const codFee = formData.paymentMethod === 'cod' ? 50 : 0;
  const orderTotals = orderService.calculateOrderTotal(items, promoDiscount, codFee);

  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery (COD)', icon: 'Banknote', fee: 50 },
    { id: 'easypaisa', name: 'Easypaisa', icon: 'Smartphone', fee: 0 },
    { id: 'jazzcash', name: 'JazzCash', icon: 'Smartphone', fee: 0 },
    { id: 'bank', name: 'Bank Transfer', icon: 'Building2', fee: 0 },
  ];

  const banks = [
    'Habib Bank Limited (HBL)',
    'United Bank Limited (UBL)',
    'Meezan Bank',
    'Allied Bank',
    'Habib Metropolitan Bank',
    'National Bank of Pakistan (NBP)',
    'MCB Bank',
    'Standard Chartered Bank',
    'Faysal Bank',
    'Bank Alfalah',
  ];

  const promoCodes = {
    'SAVE10': 10, // 10% discount
    'FIRST20': 20, // 20% discount
    'NEWUSER': 15, // 15% discount
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyPromo = () => {
    const discount = promoCodes[formData.promoCode.toUpperCase()];
    if (discount) {
      const discountAmount = (total * discount) / 100;
      setPromoDiscount(discountAmount);
      setPromoApplied(true);
      toast.success(`Promo code applied! ${discount}% discount`);
    } else {
      toast.error('Invalid promo code');
      setPromoDiscount(0);
      setPromoApplied(false);
    }
  };

  const handleRemovePromo = () => {
    setPromoDiscount(0);
    setPromoApplied(false);
    setFormData(prev => ({ ...prev, promoCode: '' }));
    toast.info('Promo code removed');
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.phone.trim() || formData.phone.length < 10) errors.push('Valid phone number is required');
    if (!formData.address.trim()) errors.push('Address is required');
    if (!formData.city.trim()) errors.push('City is required');
    if (!formData.paymentMethod) errors.push('Payment method is required');
    if (formData.paymentMethod === 'bank' && !formData.bankName) errors.push('Bank selection is required');

    return errors;
  };

  const handlePlaceOrder = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    setLoading(true);
    try {
      const order = {
        items: items.map(item => ({
          productId: item.Id,
          name: item.name,
          price: item.discountPrice || item.price,
          quantity: item.quantity,
          image: item.images[0],
        })),
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
        },
        paymentMethod: formData.paymentMethod,
        bankName: formData.bankName,
        promoCode: formData.promoCode,
        promoDiscount,
        deliveryFee,
        codFee,
        subtotal: total,
        total: orderTotals.total,
      };

      const createdOrder = await orderService.create(order);
      setOrderData(createdOrder);
      setStep('confirmation');
      clearCart();
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step === 'checkout') {
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
              Add some products to checkout
            </p>
            <Button
              variant="primary"
              size="large"
              icon="ArrowLeft"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (step === 'confirmation' && orderData) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container-responsive py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`max-w-2xl mx-auto ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-8`}
          >
            {/* Success Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <ApperIcon name="CheckCircle" size={40} className="text-green-600" />
              </motion.div>
              
              <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Order Confirmed!
              </h1>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Thank you for your purchase
              </p>
            </div>

            {/* Order Details */}
            <div className={`border rounded-lg p-6 mb-6 ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Order Number</p>
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>#{orderData.Id}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Tracking Number</p>
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{orderData.trackingNumber}</p>
                </div>
              </div>
              
              <div className={`border-t pt-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Delivery Address</p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {orderData.shippingAddress.name}<br />
                  {orderData.shippingAddress.address}<br />
                  {orderData.shippingAddress.city}<br />
                  {orderData.shippingAddress.phone}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className={`border rounded-lg p-6 mb-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Subtotal ({itemCount} items)</span>
                  <span>Rs. {orderData.subtotal.toLocaleString()}</span>
                </div>
                
                {orderData.promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount ({orderData.promoCode})</span>
                    <span>-Rs. {orderData.promoDiscount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Delivery Fee</span>
                  <span>Rs. {orderData.deliveryFee.toLocaleString()}</span>
                </div>
                
                {orderData.codFee > 0 && (
                  <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span>COD Fee</span>
                    <span>Rs. {orderData.codFee.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              <div className={`border-t pt-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className={`flex justify-between text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <span>Total</span>
                  <span>Rs. {orderData.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="large"
                icon="Home"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Continue Shopping
              </Button>
              
              <Button
                variant="outline"
                size="large"
                icon="Package"
                onClick={() => navigate(`/orders/${orderData.Id}`)}
                className="flex-1"
              >
                Track Order
              </Button>
            </div>

            {/* Delivery Info */}
            <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50'}`}>
              <div className="flex items-start space-x-2">
                <ApperIcon name="Truck" size={16} className={isDark ? 'text-blue-400 mt-0.5' : 'text-blue-600 mt-0.5'} />
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>
                    Expected Delivery
                  </p>
                  <p className={`text-xs ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                    3-5 business days • You'll receive SMS updates
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container-responsive py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Checkout
          </h1>
          
          <Button
            variant="outline"
            size="small"
            icon="ArrowLeft"
            onClick={() => navigate('/cart')}
          >
            Back to Cart
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl p-6 shadow-lg border`}
            >
              <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
                
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  required
                />
                
                <div className="md:col-span-2">
                  <Input
                    label="Email (Optional)"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="House/Flat no, Street, Area"
                    required
                  />
                </div>
                
                <Input
                  label="City"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter your city"
                  required
                />
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl p-6 shadow-lg border`}
            >
              <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Payment Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`payment-method ${formData.paymentMethod === method.id ? 'selected' : ''} ${
                      isDark ? 'border-gray-600 hover:border-orange-400' : ''
                    }`}
                    onClick={() => handleInputChange('paymentMethod', method.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <ApperIcon name={method.icon} size={24} />
                      <div className="flex-1">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {method.name}
                        </p>
                        {method.fee > 0 && (
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            +Rs. {method.fee} fee
                          </p>
                        )}
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        formData.paymentMethod === method.id
                          ? 'bg-secondary border-secondary'
                          : isDark ? 'border-gray-600' : 'border-gray-300'
                      }`}>
                        {formData.paymentMethod === method.id && (
                          <ApperIcon name="Check" size={12} className="text-white ml-0.5 mt-0.5" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bank Selection */}
              {formData.paymentMethod === 'bank' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4"
                >
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Select Bank
                  </label>
                  <select
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  >
                    <option value="">Select a bank</option>
                    {banks.map((bank) => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </motion.div>
              )}
            </motion.div>

            {/* Promo Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl p-6 shadow-lg border`}
            >
              <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Promo Code
              </h2>

              <div className="flex space-x-3">
                <Input
                  type="text"
                  value={formData.promoCode}
                  onChange={(e) => handleInputChange('promoCode', e.target.value.toUpperCase())}
                  placeholder="Enter promo code"
                  className="flex-1"
                  disabled={promoApplied}
                />
                
                {!promoApplied ? (
                  <Button
                    variant="outline"
                    onClick={handleApplyPromo}
                    disabled={!formData.promoCode.trim()}
                  >
                    Apply
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleRemovePromo}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                )}
              </div>

              {promoApplied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="CheckCircle" size={16} className="text-green-600" />
                    <span className="text-green-800 text-sm font-medium">
                      Promo code applied! You saved Rs. {promoDiscount.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              )}

              <div className="mt-4">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Available codes: SAVE10, FIRST20, NEWUSER
                </p>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl p-6 shadow-lg border sticky top-8`}
            >
              <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.Id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.name}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Rs. {((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-3 mb-6">
                <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Subtotal ({itemCount} items)</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span>-Rs. {promoDiscount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Delivery Fee</span>
                  <span>Rs. {deliveryFee.toLocaleString()}</span>
                </div>
                
                {codFee > 0 && (
                  <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span>COD Fee</span>
                    <span>Rs. {codFee.toLocaleString()}</span>
                  </div>
                )}
                
                <div className={`border-t pt-3 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`flex justify-between text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <span>Total</span>
                    <span>Rs. {orderTotals.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                variant="primary"
                size="large"
                icon="CreditCard"
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </Button>

              {/* Security Info */}
              <div className={`mt-6 p-3 rounded-lg ${isDark ? 'bg-green-900/20 border border-green-700' : 'bg-green-50'}`}>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Shield" size={16} className={isDark ? 'text-green-400' : 'text-green-600'} />
                  <span className={`text-sm ${isDark ? 'text-green-300' : 'text-green-800'}`}>
                    Your payment information is secure
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;