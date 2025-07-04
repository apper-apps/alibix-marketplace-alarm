import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Common
    home: 'Home',
    categories: 'Categories',
    cart: 'Cart',
    profile: 'Profile',
    search: 'Search',
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    
    // Navigation
    cameraSearch: 'Camera Search',
    wishlist: 'Wishlist',
    orders: 'Orders',
    
    // Shopping
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    price: 'Price',
    discount: 'Discount',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    
    // Product
    productDetails: 'Product Details',
    description: 'Description',
    reviews: 'Reviews',
    rating: 'Rating',
    
    // Cart
    yourCart: 'Your Cart',
    total: 'Total',
    checkout: 'Checkout',
    quantity: 'Quantity',
    
    // Payment
    paymentMethod: 'Payment Method',
    cod: 'Cash on Delivery',
    onlinePayment: 'Online Payment',
    
    // Status
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    
    // Messages
    welcome: 'Welcome to AliBix',
    tagline: "Pakistan's Trusted Online Shopping Experience",
    noItems: 'No items found',
    emptyCart: 'Your cart is empty',
    
    // Admin
    dashboard: 'Dashboard',
    products: 'Products',
    users: 'Users',
    analytics: 'Analytics',
    
    // Common Actions
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    view: 'View',
    update: 'Update',
  },
  ur: {
    // Common
    home: 'ہوم',
    categories: 'کیٹیگریز',
    cart: 'کارٹ',
    profile: 'پروفائل',
    search: 'تلاش',
    loading: 'لوڈ ہو رہا ہے...',
    error: 'خرابی',
    retry: 'دوبارہ کوشش',
    
    // Navigation
    cameraSearch: 'کیمرہ سرچ',
    wishlist: 'پسندیدہ',
    orders: 'آرڈرز',
    
    // Shopping
    addToCart: 'کارٹ میں شامل کریں',
    buyNow: 'ابھی خریدیں',
    price: 'قیمت',
    discount: 'رعایت',
    outOfStock: 'اسٹاک ختم',
    inStock: 'اسٹاک میں',
    
    // Product
    productDetails: 'پروڈکٹ کی تفصیلات',
    description: 'تفصیل',
    reviews: 'جائزے',
    rating: 'ریٹنگ',
    
    // Cart
    yourCart: 'آپ کا کارٹ',
    total: 'کل',
    checkout: 'چیک آؤٹ',
    quantity: 'مقدار',
    
    // Payment
    paymentMethod: 'ادائیگی کا طریقہ',
    cod: 'ڈیلیوری پر ادائیگی',
    onlinePayment: 'آن لائن پیمنٹ',
    
    // Status
    pending: 'انتظار میں',
    processing: 'پروسیسنگ',
    shipped: 'بھیجا گیا',
    delivered: 'پہنچایا گیا',
    cancelled: 'منسوخ',
    
    // Messages
    welcome: 'علی بکس میں خوش آمدید',
    tagline: 'پاکستان کا قابل اعتماد آن لائن شاپنگ تجربہ',
    noItems: 'کوئی آئٹم نہیں ملا',
    emptyCart: 'آپ کا کارٹ خالی ہے',
    
    // Admin
    dashboard: 'ڈیش بورڈ',
    products: 'پروڈکٹس',
    users: 'صارفین',
    analytics: 'تجزیات',
    
    // Common Actions
    save: 'محفوظ کریں',
    cancel: 'منسوخ',
    delete: 'حذف کریں',
    edit: 'تبدیل کریں',
    add: 'شامل کریں',
    view: 'دیکھیں',
    update: 'اپ ڈیٹ',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('alibix_language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
      setIsRTL(savedLanguage === 'ur');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('alibix_language', language);
    setIsRTL(language === 'ur');
    
    // Update document direction
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ur' : 'en');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    isRTL,
    setLanguage,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};