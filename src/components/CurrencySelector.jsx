import { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import './CurrencySelector.css';

const CurrencySelector = () => {
  const { currency, changeCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleCurrencyChange = (newCurrency) => {
    changeCurrency(newCurrency);
    setIsOpen(false);
  };
  
  return (
    <div className="currency-selector">
      <button 
        className="currency-toggle" 
        onClick={toggleDropdown}
        aria-label="Select currency"
        aria-expanded={isOpen}
      >
        {currency} <span className="dropdown-arrow">▼</span>
      </button>
      
      {isOpen && (
        <div className="currency-dropdown">
          <button 
            className={`currency-option ${currency === 'USD' ? 'active' : ''}`}
            onClick={() => handleCurrencyChange('USD')}
          >
            USD ($)
          </button>
          <button 
            className={`currency-option ${currency === 'PKR' ? 'active' : ''}`}
            onClick={() => handleCurrencyChange('PKR')}
          >
            PKR (₨)
          </button>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
