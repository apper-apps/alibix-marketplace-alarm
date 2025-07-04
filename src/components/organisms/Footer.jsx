import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import ApperIcon from '@/components/ApperIcon';

const Footer = () => {
  const { t, language } = useLanguage();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '/careers' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Track Order', path: '/track' },
      { name: 'Returns', path: '/returns' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Size Guide', path: '/size-guide' },
    ],
    categories: [
      { name: 'Electronics', path: '/category/electronics' },
      { name: 'Clothing', path: '/category/clothing' },
      { name: 'Shoes', path: '/category/shoes' },
      { name: 'Accessories', path: '/category/accessories' },
      { name: 'Home & Garden', path: '/category/home-garden' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'Instagram', icon: 'Instagram', url: '#' },
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'YouTube', icon: 'Youtube', url: '#' },
  ];

  const paymentMethods = [
    { name: 'Visa', icon: 'CreditCard' },
    { name: 'Mastercard', icon: 'CreditCard' },
    { name: 'Easypaisa', icon: 'Smartphone' },
    { name: 'JazzCash', icon: 'Smartphone' },
  ];

  return (
    <footer className="bg-gradient-to-br from-primary to-gray-900 text-white">
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-white">Ali</span>
                <span className="text-secondary">Bix</span>
              </h2>
              <p className="text-gray-300 mb-4">
                {t('tagline')}
              </p>
              <div className="flex items-center space-x-2 text-gray-300">
                <ApperIcon name="MapPin" size={16} />
                <span className="text-sm">Pakistan</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ApperIcon name={social.icon} size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

{/* Trust Badges Section */}
        <div className="border-t border-gray-600 mt-12 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Shield" size={24} className="text-green-400" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">Secure Shopping</h4>
              <p className="text-gray-300 text-xs">SSL Protected</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Truck" size={24} className="text-blue-400" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">Fast Delivery</h4>
              <p className="text-gray-300 text-xs">2-3 Business Days</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="RefreshCw" size={24} className="text-purple-400" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">Easy Returns</h4>
              <p className="text-gray-300 text-xs">7-Day Policy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Headphones" size={24} className="text-orange-400" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">24/7 Support</h4>
              <p className="text-gray-300 text-xs">Always Here</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            {/* Copyright */}
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 AliBix. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <span className="text-gray-300 text-sm">We Accept:</span>
              <div className="flex items-center space-x-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center space-x-1 bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors duration-200"
                  >
                    <ApperIcon name={method.icon} size={18} />
                    <span className="text-xs font-medium">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile App Promotion */}
          <div className="text-center py-6 bg-white/5 rounded-lg">
            <p className="text-gray-300 text-sm mb-3">Download our mobile app for better experience</p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                <ApperIcon name="Smartphone" size={16} />
                <span className="text-xs">Coming Soon</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                <ApperIcon name="TabletSmartphone" size={16} />
                <span className="text-xs">PWA Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;