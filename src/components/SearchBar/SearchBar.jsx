import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes, FaHistory, FaFilter } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: 0, max: 10000 },
    inStock: false
  });
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Categories for filter
  const categories = ['breads', 'pastries', 'cakes', 'cookies', 'pies'];

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse search history:', error);
      }
    }
    
    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

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

  // Generate suggestions based on query
  useEffect(() => {
    if (query.trim().length > 1) {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      const mockProducts = [
        'Chocolate Croissant',
        'Strawberry Cheesecake',
        'Sourdough Bread',
        'Blueberry Muffin',
        'Cinnamon Roll',
        'Baguette',
        'Chocolate Cake',
        'Apple Pie',
        'Chocolate Chip Cookie'
      ];
      
      const filteredSuggestions = mockProducts
        .filter(product => product.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      // Add to search history if not already present
      if (!searchHistory.includes(searchQuery)) {
        const newHistory = [searchQuery, ...searchHistory].slice(0, 10);
        setSearchHistory(newHistory);
      }
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('q', searchQuery);
      
      // Add filters if they are set
      if (filters.categories.length > 0) {
        params.append('categories', filters.categories.join(','));
      }
      
      if (filters.priceRange.min > 0) {
        params.append('minPrice', filters.priceRange.min);
      }
      
      if (filters.priceRange.max < 10000) {
        params.append('maxPrice', filters.priceRange.max);
      }
      
      if (filters.inStock) {
        params.append('inStock', 'true');
      }
      
      // Navigate to search results page
      navigate(`/search?${params.toString()}`);
      
      // Close search overlay if onClose is provided
      if (onClose) {
        onClose();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleHistoryClick = (historyItem) => {
    setQuery(historyItem);
    handleSearch(historyItem);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => {
      const updatedCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return {
        ...prev,
        categories: updatedCategories
      };
    });
  };

  const handlePriceChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };

  const toggleInStock = () => {
    setFilters(prev => ({
      ...prev,
      inStock: !prev.inStock
    }));
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: { min: 0, max: 10000 },
      inStock: false
    });
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <FaSearch className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          className="search-input"
        />
        {query && (
          <button 
            className="clear-search" 
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
        <button 
          className={`filter-button ${showFilters ? 'active' : ''}`} 
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Toggle filters"
          aria-expanded={showFilters}
        >
          <FaFilter />
        </button>
        <button 
          className="search-button" 
          onClick={() => handleSearch()}
          aria-label="Search"
        >
          Search
        </button>
      </div>
      
      {showFilters && (
        <div className="search-filters">
          <div className="filter-section">
            <h4>Categories</h4>
            <div className="category-filters">
              {categories.map(category => (
                <label key={category} className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-section">
            <h4>Price Range (PKR)</h4>
            <div className="price-range">
              <div className="price-input">
                <label>Min:</label>
                <input
                  type="number"
                  min="0"
                  max={filters.priceRange.max}
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceChange('min', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="price-input">
                <label>Max:</label>
                <input
                  type="number"
                  min={filters.priceRange.min}
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceChange('max', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>
          
          <div className="filter-section">
            <label className="stock-checkbox">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={toggleInStock}
              />
              <span>In Stock Only</span>
            </label>
          </div>
          
          <div className="filter-actions">
            <button className="reset-filters" onClick={resetFilters}>Reset Filters</button>
            <button className="apply-filters" onClick={() => handleSearch()}>Apply Filters</button>
          </div>
        </div>
      )}
      
      {showSuggestions && (
        <div className="search-suggestions" ref={suggestionsRef}>
          {suggestions.length > 0 ? (
            <div className="suggestions-list">
              <h4>Suggestions</h4>
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <FaSearch className="suggestion-icon" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          ) : null}
          
          {searchHistory.length > 0 && (
            <div className="search-history">
              <div className="history-header">
                <h4>Recent Searches</h4>
                <button 
                  className="clear-history" 
                  onClick={clearHistory}
                  aria-label="Clear search history"
                >
                  Clear
                </button>
              </div>
              {searchHistory.map((item, index) => (
                <div 
                  key={index} 
                  className="history-item"
                  onClick={() => handleHistoryClick(item)}
                >
                  <FaHistory className="history-icon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
