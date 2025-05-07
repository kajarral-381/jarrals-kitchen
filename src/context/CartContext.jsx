import { createContext, useContext, useReducer, useEffect } from 'react';

// Create cart context
const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
  savedItems: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      let updatedItems;

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
      } else {
        // Add new item
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      // Calculate new totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice
      };
    }

    case 'REMOVE_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex === -1) return state;

      let updatedItems;

      if (state.items[existingItemIndex].quantity === 1) {
        // Remove item completely
        updatedItems = state.items.filter(item => item.id !== action.payload.id);
      } else {
        // Decrease quantity
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity - 1
        };
      }

      // Calculate new totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        // If quantity is 0 or negative, remove the item
        const updatedItems = state.items.filter(item => item.id !== id);

        // Calculate new totals
        const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        return {
          ...state,
          items: updatedItems,
          totalItems,
          totalPrice
        };
      }

      const existingItemIndex = state.items.findIndex(item => item.id === id);

      if (existingItemIndex === -1) return state;

      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity
      };

      // Calculate new totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice
      };
    }

    case 'SAVE_FOR_LATER': {
      const { id } = action.payload;

      // Find the item in the cart
      const itemIndex = state.items.findIndex(item => item.id === id);
      if (itemIndex === -1) return state;

      const itemToSave = state.items[itemIndex];

      // Remove from cart
      const updatedItems = state.items.filter(item => item.id !== id);

      // Add to saved items if not already there
      const existingInSaved = state.savedItems.findIndex(item => item.id === id);
      let updatedSavedItems;

      if (existingInSaved === -1) {
        updatedSavedItems = [...state.savedItems, itemToSave];
      } else {
        updatedSavedItems = state.savedItems;
      }

      // Calculate new totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      return {
        ...state,
        items: updatedItems,
        savedItems: updatedSavedItems,
        totalItems,
        totalPrice
      };
    }

    case 'MOVE_TO_CART': {
      const { id } = action.payload;

      // Find the item in saved items
      const itemIndex = state.savedItems.findIndex(item => item.id === id);
      if (itemIndex === -1) return state;

      const itemToMove = state.savedItems[itemIndex];

      // Remove from saved items
      const updatedSavedItems = state.savedItems.filter(item => item.id !== id);

      // Add to cart
      const existingInCart = state.items.findIndex(item => item.id === id);
      let updatedItems;

      if (existingInCart === -1) {
        updatedItems = [...state.items, itemToMove];
      } else {
        updatedItems = [...state.items];
        updatedItems[existingInCart] = {
          ...updatedItems[existingInCart],
          quantity: updatedItems[existingInCart].quantity + itemToMove.quantity
        };
      }

      // Calculate new totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      return {
        ...state,
        items: updatedItems,
        savedItems: updatedSavedItems,
        totalItems,
        totalPrice
      };
    }

    case 'REMOVE_SAVED_ITEM': {
      const { id } = action.payload;

      // Remove from saved items
      const updatedSavedItems = state.savedItems.filter(item => item.id !== id);

      return {
        ...state,
        savedItems: updatedSavedItems
      };
    }

    case 'REPLACE_CART':
      return {
        ...action.payload
      };

    default:
      return state;
  }
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('bakeryCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        Object.keys(initialState).forEach(key => {
          if (parsedCart[key] === undefined) {
            parsedCart[key] = initialState[key];
          }
        });

        // Calculate totals to ensure consistency
        const totalItems = parsedCart.items.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = parsedCart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        dispatch({
          type: 'REPLACE_CART',
          payload: {
            ...parsedCart,
            totalItems,
            totalPrice
          }
        });
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bakeryCart', JSON.stringify(state));
  }, [state]);

  // Cart actions
  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const saveForLater = (id) => {
    dispatch({ type: 'SAVE_FOR_LATER', payload: { id } });
  };

  const moveToCart = (id) => {
    dispatch({ type: 'MOVE_TO_CART', payload: { id } });
  };

  const removeSavedItem = (id) => {
    dispatch({ type: 'REMOVE_SAVED_ITEM', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        saveForLater,
        moveToCart,
        removeSavedItem,
        clearCart,
        toggleCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
