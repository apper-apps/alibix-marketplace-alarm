import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import BottomNavigation from '@/components/organisms/BottomNavigation';

const Layout = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-surface to-white'
    }`}>
      <Header />
      
      <main className={`min-h-screen pb-20 md:pb-0 transition-colors duration-300 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        <Outlet />
      </main>
      
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default Layout;