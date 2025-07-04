import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

const initialState = {
  items: [],
  itemCount: 0,
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const exists = state.items.find(item => item.Id === action.payload.Id);
      if (exists) {
        return state;
      }
      const newItems = [...state.items, action.payload];
      return {
        items: newItems,
        itemCount: newItems.length,
      };
    }

    case 'REMOVE_FROM_WISHLIST': {
      const newItems = state.items.filter(item => item.Id !== action.payload);
      return {
        items: newItems,
        itemCount: newItems.length,
      };
    }

    case 'CLEAR_WISHLIST': {
      return initialState;
    }

    case 'LOAD_WISHLIST': {
      return {
        items: action.payload,
        itemCount: action.payload.length,
      };
    }

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('alibix_wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: parsedWishlist });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('alibix_wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    toast.success(`${product.name} added to wishlist!`);
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    toast.info('Item removed from wishlist');
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
    toast.info('Wishlist cleared');
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item.Id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.Id)) {
      removeFromWishlist(product.Id);
    } else {
      addToWishlist(product);
    }
  };

  const value = {
    ...state,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    toggleWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};