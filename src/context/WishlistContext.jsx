import { createContext, useContext, useReducer, useEffect } from 'react';

// Create wishlist context
const WishlistContext = createContext();

// Initial state
const initialState = {
  items: []
};

// Wishlist reducer
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Check if item already exists in wishlist
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return state; // Item already in wishlist, no change
      }
      
      // Add new item to wishlist
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
    
    case 'REMOVE_ITEM': {
      // Remove item from wishlist
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    }
    
    case 'CLEAR_WISHLIST': {
      return {
        ...state,
        items: []
      };
    }
    
    case 'REPLACE_WISHLIST': {
      return action.payload;
    }
    
    default:
      return state;
  }
};

// Wishlist provider component
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('bakeryWishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        dispatch({
          type: 'REPLACE_WISHLIST',
          payload: parsedWishlist
        });
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bakeryWishlist', JSON.stringify(state));
  }, [state]);
  
  // Wishlist actions
  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  const removeFromWishlist = (product) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
  };
  
  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };
  
  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };
  
  return (
    <WishlistContext.Provider
      value={{
        wishlist: state,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
