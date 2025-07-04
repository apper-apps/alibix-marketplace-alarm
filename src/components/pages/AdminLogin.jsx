import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { useAuth } from '@/contexts/AuthContext';

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/admin');
    } catch (error) {
      // Error already handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-gray-900 to-secondary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-primary">Ali</span>
              <span className="text-secondary">Bix</span>
            </h1>
            <p className="text-gray-600">Admin Panel</p>
          </div>
          
          <div className="bg-gradient-to-r from-secondary to-orange-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Shield" size={32} className="text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Admin Access</h2>
          <p className="text-gray-600 mb-8">
            Only authorized Gmail accounts can access the admin panel
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <ApperIcon name="AlertCircle" size={20} className="text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-yellow-800 font-medium">Authorized Access Only</p>
                <p className="text-sm text-yellow-700">
                  This admin panel is restricted to specific Gmail accounts
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <ApperIcon name="Loader" size={20} className="mr-2 animate-spin" />
                Authenticating...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <ApperIcon name="Mail" size={20} className="mr-2" />
                Continue with Gmail
              </div>
            )}
          </Button>

          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ← Back to Store
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Secure authentication powered by Gmail
            </p>
            <div className="flex items-center justify-center mt-2 space-x-4">
              <div className="flex items-center text-xs text-gray-500">
                <ApperIcon name="Lock" size={14} className="mr-1" />
                Encrypted
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <ApperIcon name="Shield" size={14} className="mr-1" />
                Secure
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <ApperIcon name="CheckCircle" size={14} className="mr-1" />
                Verified
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;