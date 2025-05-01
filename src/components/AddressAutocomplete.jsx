import { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import './AddressAutocomplete.css';

const AddressAutocomplete = ({ onAddressSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const inputRef = useRef(null);

  // Mock address suggestions - in a real app, this would be an API call
  const mockAddressSuggestions = [
    {
      id: 1,
      fullAddress: '123 Main Street, Islamabad, Pakistan',
      street: '123 Main Street',
      city: 'Islamabad',
      state: 'Islamabad Capital Territory',
      postalCode: '44000',
      country: 'Pakistan'
    },
    {
      id: 2,
      fullAddress: '456 Park Avenue, Lahore, Pakistan',
      street: '456 Park Avenue',
      city: 'Lahore',
      state: 'Punjab',
      postalCode: '54000',
      country: 'Pakistan'
    },
    {
      id: 3,
      fullAddress: '789 Ocean Boulevard, Karachi, Pakistan',
      street: '789 Ocean Boulevard',
      city: 'Karachi',
      state: 'Sindh',
      postalCode: '75600',
      country: 'Pakistan'
    },
    {
      id: 4,
      fullAddress: '101 Mountain View, Peshawar, Pakistan',
      street: '101 Mountain View',
      city: 'Peshawar',
      state: 'Khyber Pakhtunkhwa',
      postalCode: '25000',
      country: 'Pakistan'
    },
    {
      id: 5,
      fullAddress: '202 Valley Road, Quetta, Pakistan',
      street: '202 Valley Road',
      city: 'Quetta',
      state: 'Balochistan',
      postalCode: '87300',
      country: 'Pakistan'
    }
  ];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch address suggestions based on query
  useEffect(() => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);

    // Simulate API call delay
    const timer = setTimeout(() => {
      // Filter mock suggestions based on query
      const filteredSuggestions = mockAddressSuggestions.filter(address => 
        address.fullAddress.toLowerCase().includes(query.toLowerCase())
      );
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.fullAddress);
    setShowSuggestions(false);
    onAddressSelect(suggestion);
  };

  return (
    <div className="address-autocomplete">
      <div className="autocomplete-input-wrapper">
        <FaMapMarkerAlt className="address-icon" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Start typing your address..."
          className="autocomplete-input"
          onFocus={() => query.trim().length >= 3 && setShowSuggestions(true)}
        />
        {loading && <FaSpinner className="loading-icon spin" />}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="address-suggestions" ref={suggestionsRef}>
          {suggestions.map(suggestion => (
            <li 
              key={suggestion.id} 
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <FaMapMarkerAlt className="suggestion-icon" />
              <span>{suggestion.fullAddress}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
