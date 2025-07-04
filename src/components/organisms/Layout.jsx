import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import BottomNavigation from '@/components/organisms/BottomNavigation';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface to-white">
      <Header />
      
      <main className="min-h-screen pb-20 md:pb-0">
        <Outlet />
      </main>
      
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default Layout;