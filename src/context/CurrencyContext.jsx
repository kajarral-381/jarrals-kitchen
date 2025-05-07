import { createContext, useContext } from 'react';

// Create currency context
const CurrencyContext = createContext();

// Currency provider component
export const CurrencyProvider = ({ children }) => {
  // Function to convert price - now just returns the price as is since we only use PKR
  // We keep this function for compatibility with existing code
  const convertPrice = (price) => {
    // No conversion needed, prices are already in PKR
    return price;
  };

  // Function to format price with currency symbol
  const formatPrice = (price) => {
    return `₨${price.toFixed(0)}`; // PKR typically shown without decimal places
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency: 'PKR',
        convertPrice,
        formatPrice
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook to use currency context
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
