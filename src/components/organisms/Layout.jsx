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
      
      {/* Live Chat Button */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40">
        <button
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            isDark 
              ? 'bg-gradient-to-r from-secondary to-orange-500 hover:from-orange-500 hover:to-secondary' 
              : 'bg-gradient-to-r from-secondary to-orange-500 hover:from-orange-500 hover:to-secondary'
          } text-white flex items-center justify-center`}
          title="Live Chat Support"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 20.2c-.24.48-.024 1.072.456 1.312.18.09.384.09.564 0l3.032-1.512A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="currentColor"/>
            <circle cx="8" cy="12" r="1.5" fill="white"/>
            <circle cx="12" cy="12" r="1.5" fill="white"/>
            <circle cx="16" cy="12" r="1.5" fill="white"/>
          </svg>
        </button>
        
        {/* Pulse Animation */}
        <div className={`absolute inset-0 rounded-full animate-ping ${
          isDark ? 'bg-secondary' : 'bg-secondary'
        } opacity-75`}></div>
      </div>
    </div>
  );
};

export default Layout;