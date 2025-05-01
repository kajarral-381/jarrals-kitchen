import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './SearchBar.css';

// Mock product data for search suggestions
const mockProducts = [
  { id: 1, name: 'Chocolate Croissant', category: 'pastries' },
  { id: 2, name: 'Strawberry Cheesecake', category: 'cakes' },
  { id: 3, name: 'Sourdough Bread', category: 'breads' },
  { id: 4, name: 'Blueberry Muffin', category: 'pastries' },
  { id: 5, name: 'Cinnamon Roll', category: 'pastries' },
  { id: 6, name: 'Baguette', category: 'breads' },
  { id: 7, name: 'Chocolate Cake', category: 'cakes' },
  { id: 8, name: 'Apple Pie', category: 'pies' },
  { id: 9, name: 'Chocolate Chip Cookie', category: 'cookies' }
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  // Load recent searches from localStorage on initial render
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error('Failed to parse recent searches from localStorage:', error);
      }
    }
  }, []);
  
  // Save recent searches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);
  
  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Update suggestions when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    const filteredProducts = mockProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSuggestions(filteredProducts.slice(0, 5)); // Limit to 5 suggestions
  }, [searchTerm]);
  
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };
  
  const handleInputFocus = () => {
    setShowSuggestions(true);
  };
  
  const handleSearch = (term = searchTerm) => {
    if (term.trim() === '') return;
    
    // Add to recent searches (avoid duplicates and limit to 5)
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== term);
      return [term, ...filtered].slice(0, 5);
    });
    
    // Navigate to search results page
    navigate(`/search?q=${encodeURIComponent(term)}`);
    
    // Clear search term and hide suggestions
    setSearchTerm('');
    setShowSuggestions(false);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    navigate(`/product/${suggestion.id}`);
    setSearchTerm('');
    setShowSuggestions(false);
  };
  
  const handleRecentSearchClick = (term) => {
    handleSearch(term);
  };
  
  const clearRecentSearches = () => {
    setRecentSearches([]);
  };
  
  const clearSearchTerm = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };
  
  return (
    <div className="search-bar" ref={searchRef}>
      <div className="search-input-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
        />
        {searchTerm && (
          <button className="clear-search" onClick={clearSearchTerm}>
            <FaTimes />
          </button>
        )}
        <button className="search-button" onClick={() => handleSearch()}>
          Search
        </button>
      </div>
      
      {showSuggestions && (searchTerm || recentSearches.length > 0) && (
        <div className="search-suggestions">
          {searchTerm && suggestions.length > 0 && (
            <div className="suggestions-section">
              <h3>Product Suggestions</h3>
              <ul>
                {suggestions.map(suggestion => (
                  <li 
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <FaSearch className="suggestion-icon" />
                    <span className="suggestion-name">{suggestion.name}</span>
                    <span className="suggestion-category">{suggestion.category}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {searchTerm && suggestions.length === 0 && (
            <div className="no-suggestions">
              <p>No products found matching "{searchTerm}"</p>
            </div>
          )}
          
          {recentSearches.length > 0 && (
            <div className="suggestions-section">
              <div className="recent-searches-header">
                <h3>Recent Searches</h3>
                <button 
                  className="clear-recent"
                  onClick={clearRecentSearches}
                >
                  Clear
                </button>
              </div>
              <ul>
                {recentSearches.map((term, index) => (
                  <li 
                    key={index}
                    onClick={() => handleRecentSearchClick(term)}
                  >
                    <FaSearch className="suggestion-icon" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
