import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const AboutUs = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const features = [
    {
      icon: 'Shield',
      title: 'Secure Shopping',
      description: 'SSL encryption and secure payment gateways protect your data',
      color: 'text-green-500'
    },
    {
      icon: 'Truck',
      title: 'Fast Delivery',
      description: '2-3 business days delivery across Pakistan',
      color: 'text-blue-500'
    },
    {
      icon: 'RefreshCw',
      title: 'Easy Returns',
      description: '7-day hassle-free return policy',
      color: 'text-purple-500'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Round-the-clock customer service',
      color: 'text-orange-500'
    },
    {
      icon: 'Star',
      title: 'Quality Products',
      description: 'Handpicked products from trusted sellers',
      color: 'text-yellow-500'
    },
    {
      icon: 'Users',
      title: 'Trusted Community',
      description: 'Join thousands of satisfied customers',
      color: 'text-indigo-500'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '100,000+', label: 'Products' },
    { number: '500+', label: 'Cities Covered' },
    { number: '99.5%', label: 'Customer Satisfaction' }
  ];

  const team = [
    {
      name: 'Muhammad Ali',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      description: 'Visionary leader with 10+ years in e-commerce'
    },
    {
      name: 'Fatima Khan',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=300&h=300&fit=crop&crop=face',
      description: 'Expert in logistics and supply chain management'
    },
    {
      name: 'Ahmad Hassan',
      role: 'Technology Lead',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      description: 'Tech innovator building next-gen shopping experiences'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Hero Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-primary' 
          : 'bg-gradient-to-br from-primary via-gray-800 to-secondary'
      } text-white`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-secondary">AliBix</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Pakistan's most trusted online shopping platform, delivering quality products 
              and exceptional service since 2020.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="white" size="large" icon="Phone">
                Contact Us
              </Button>
              <Button variant="outline" size="large" icon="MessageCircle" 
                      className="border-white text-white hover:bg-white hover:text-primary">
                Live Chat
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Our Mission
              </h2>
              <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                To revolutionize online shopping in Pakistan by providing a seamless, 
                secure, and enjoyable e-commerce experience that connects customers 
                with quality products from trusted sellers.
              </p>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                We believe in empowering Pakistani consumers with access to global 
                products while supporting local businesses and entrepreneurs.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-secondary to-accent rounded-2xl blur-2xl opacity-20`}></div>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                alt="Our Mission"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              AliBix by Numbers
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Growing stronger every day with our amazing community
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-3xl md:text-4xl font-bold mb-2 text-secondary`}>
                  {stat.number}
                </div>
                <div className={`text-sm md:text-base ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Why Choose AliBix?
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We're committed to providing the best shopping experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-xl ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                } shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-secondary to-accent flex items-center justify-center mb-4`}>
                  <ApperIcon name={feature.icon} size={24} className="text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Meet Our Team
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              The passionate people behind AliBix
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`text-center p-6 rounded-xl ${
                  isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {member.name}
                </h3>
                <p className="text-secondary font-medium mb-3">{member.role}</p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
        isDark 
          ? 'bg-gradient-to-r from-secondary to-orange-600' 
          : 'bg-gradient-to-r from-secondary to-orange-500'
      } text-white`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Join thousands of satisfied customers and discover amazing products today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="white" size="large" icon="ShoppingBag">
                Start Shopping
              </Button>
              <Button variant="outline" size="large" icon="Download" 
                      className="border-white text-white hover:bg-white hover:text-secondary">
                Download App
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;