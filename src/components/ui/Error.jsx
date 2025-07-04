import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = 'Something went wrong', 
  onRetry, 
  type = 'default',
  showRetry = true 
}) => {
  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: 'WifiOff',
          title: 'Connection Error',
          description: 'Please check your internet connection and try again.',
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
        };
      case 'notFound':
        return {
          icon: 'SearchX',
          title: 'Not Found',
          description: 'The item you are looking for could not be found.',
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
        };
      case 'server':
        return {
          icon: 'ServerCrash',
          title: 'Server Error',
          description: 'Our servers are experiencing issues. Please try again later.',
          color: 'text-orange-500',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
        };
      case 'permission':
        return {
          icon: 'ShieldAlert',
          title: 'Access Denied',
          description: 'You do not have permission to access this resource.',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
        };
      default:
        return {
          icon: 'AlertCircle',
          title: 'Error',
          description: message,
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
        };
    }
  };

  const config = getErrorConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center justify-center min-h-[300px] p-4"
    >
      <div className={`max-w-md w-full text-center p-8 rounded-2xl border-2 ${config.bgColor} ${config.borderColor}`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${config.color} bg-white shadow-lg mb-6`}
        >
          <ApperIcon name={config.icon} size={32} />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold text-gray-900 mb-2"
        >
          {config.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6 leading-relaxed"
        >
          {config.description}
        </motion.p>

        {showRetry && onRetry && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onRetry}
            className="inline-flex items-center space-x-2 btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="RefreshCw" size={16} />
            <span>Try Again</span>
          </motion.button>
        )}

        {type === 'network' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 bg-white rounded-lg border border-gray-200"
          >
            <h4 className="font-semibold text-gray-900 mb-2">Quick Solutions:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check your internet connection</li>
              <li>• Refresh the page</li>
              <li>• Try again in a few moments</li>
            </ul>
          </motion.div>
        )}

        {type === 'server' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 bg-white rounded-lg border border-gray-200"
          >
            <p className="text-sm text-gray-600">
              We're working to fix this issue. Please try again in a few minutes.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Error;