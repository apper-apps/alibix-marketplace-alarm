import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Authorized admin emails
  const authorizedEmails = [
    'alibix07@gmail.com',
    // Add more authorized emails here
  ];

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('alibix_admin_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = async () => {
    try {
      // Simulate Google OAuth flow
      const email = prompt('Enter your Gmail address for admin access:');
      
      if (!email) {
        throw new Error('Email is required');
      }

      // Check if email is authorized
      if (!authorizedEmails.includes(email.toLowerCase())) {
        throw new Error('Unauthorized email address. Only specific Gmail accounts can access the admin panel.');
      }

      // Simulate authentication success
      const userData = {
        email: email.toLowerCase(),
        name: email.split('@')[0],
        isAdmin: true,
        loginTime: new Date().toISOString(),
      };

      setUser(userData);
      localStorage.setItem('alibix_admin_user', JSON.stringify(userData));
      toast.success('Successfully logged in as admin!');
      
      return userData;
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('alibix_admin_user');
    toast.info('Successfully logged out');
  };

  const isAuthenticated = () => {
    return user && user.isAdmin;
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};