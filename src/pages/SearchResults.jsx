import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaFilter, FaTimes, FaSortAmountDown, FaSortAmountUp, FaSearch } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { useCurrency } from '../context/CurrencyContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './SearchResults.css';

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: 'Chocolate Croissant',
    description: 'Buttery, flaky croissant filled with rich chocolate.',
    price: 3.99,
    category: 'pastries',
    image: '/src/assets/images/chocolate-croissant.jpg',
    tags: ['chocolate', 'breakfast', 'french'],
    dietary: ['vegetarian'],
    featured: true,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Strawberry Cheesecake',
    description: 'Creamy cheesecake topped with fresh strawberry glaze.',
    price: 5.99,
    category: 'cakes',
    image: '/src/assets/images/strawberry-cheesecake.jpg',
    tags: ['strawberry', 'dessert', 'creamy'],
    dietary: ['vegetarian'],
    featured: true,
    rating: 4.6
  },
  {
    id: 3,
    name: 'Sourdough Bread',
    description: 'Artisanal sourdough bread with a perfect crust.',
    price: 6.99,
    category: 'breads',
    image: '/src/assets/images/sourdough-bread.jpg',
    tags: ['sourdough', 'artisanal', 'bread'],
    dietary: ['vegan'],
    featured: true,
    rating: 4.9
  },
  {
    id: 4,
    name: 'Blueberry Muffin',
    description: 'Moist muffin packed with juicy blueberries.',
    price: 2.99,
    category: 'pastries',
    image: '/src/assets/images/blueberry-muffin.jpg',
    tags: ['blueberry', 'breakfast', 'muffin'],
    dietary: ['vegetarian'],
    featured: false,
    rating: 4.5
  },
  {
    id: 5,
    name: 'Cinnamon Roll',
    description: 'Soft, gooey cinnamon roll with cream cheese frosting.',
    price: 3.49,
    category: 'pastries',
    image: '/src/assets/images/cinnamon-roll.jpg',
    tags: ['cinnamon', 'breakfast', 'sweet'],
    dietary: ['vegetarian'],
    featured: false,
    rating: 4.7
  },
  {
    id: 6,
    name: 'Baguette',
    description: 'Traditional French baguette with crispy crust.',
    price: 4.99,
    category: 'breads',
    image: '/src/assets/images/baguette.jpg',
    tags: ['french', 'bread', 'artisanal'],
    dietary: ['vegan'],
    featured: false,
    rating: 4.8
  },
  {
    id: 7,
    name: 'Chocolate Cake',
    description: 'Rich, moist chocolate cake with chocolate ganache.',
    price: 6.99,
    category: 'cakes',
    image: '/src/assets/images/chocolate-cake.jpg',
    tags: ['chocolate', 'dessert', 'cake'],
    dietary: ['vegetarian'],
    featured: false,
    rating: 4.9
  },
  {
    id: 8,
    name: 'Apple Pie',
    description: 'Classic apple pie with flaky crust and cinnamon filling.',
    price: 5.49,
    category: 'pies',
    image: '/src/assets/images/apple-pie.jpg',
    tags: ['apple', 'dessert', 'pie'],
    dietary: ['vegetarian'],
    featured: false,
    rating: 4.6
  },
  {
    id: 9,
    name: 'Chocolate Chip Cookie',
    description: 'Soft and chewy cookie loaded with chocolate chips.',
    price: 1.99,
    category: 'cookies',
    image: '/src/assets/images/chocolate-chip-cookie.jpg',
    tags: ['chocolate', 'cookie', 'dessert'],
    dietary: ['vegetarian'],
    featured: false,
    rating: 4.7
  }
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoriesParam = searchParams.get('categories') || '';
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const inStockParam = searchParams.get('inStock');

  const { convertPrice, formatPrice } = useCurrency();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState(
    categoriesParam ? categoriesParam.split(',') : []
  );
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [priceRange, setPriceRange] = useState([
    minPriceParam ? parseFloat(minPriceParam) : 0,
    maxPriceParam ? parseFloat(maxPriceParam) : 10000
  ]);
  const [inStockOnly, setInStockOnly] = useState(inStockParam === 'true');
  const [sortBy, setSortBy] = useState('relevance');
  const [sortOrder, setSortOrder] = useState('desc');

  // Get unique categories and dietary options
  const categories = [...new Set(mockProducts.map(product => product.category))];
  const dietaryOptions = [...new Set(mockProducts.flatMap(product => product.dietary))];

  // Search and filter products
  useEffect(() => {
    setLoading(true);

    // In a real app, this would be an API call with the search parameters
    // For demo, we'll filter the mock data

    // Search by query
    let results = mockProducts;
    if (query) {
      results = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    setProducts(results);
    setLoading(false);
  }, [query]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Filter by dietary options
    if (selectedDietary.length > 0) {
      filtered = filtered.filter(product =>
        selectedDietary.some(option => product.dietary.includes(option))
      );
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        default: // relevance - already sorted by search
          return 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategories, selectedDietary, priceRange, sortBy, sortOrder]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleDietary = (option) => {
    setSelectedDietary(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = value;
    setPriceRange(newRange);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedDietary([]);
    setPriceRange([0, 10]);
    setSortBy('relevance');
    setSortOrder('desc');
  };

  return (
    <div className="search-results-page">
      <div className="container">
        <div className="search-header">
          <h1>Search Results</h1>
          {query && <p>Showing results for "{query}"</p>}

          <div className="search-bar-wrapper">
            <button
              className="search-trigger"
              onClick={() => setShowSearchOverlay(true)}
            >
              <FaSearch /> Refine Search
            </button>

            {showSearchOverlay && (
              <div className="search-overlay">
                <div className="search-overlay-content">
                  <button
                    className="close-search-overlay"
                    onClick={() => setShowSearchOverlay(false)}
                  >
                    <FaTimes />
                  </button>
                  <h2>Refine Your Search</h2>
                  <SearchBar onClose={() => setShowSearchOverlay(false)} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="search-content">
          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className={`search-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filter-header">
              <h2>Filters</h2>
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear All
              </button>
            </div>

            <div className="filter-section">
              <h3>Categories</h3>
              <div className="filter-options">
                {categories.map(category => (
                  <label key={category} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <span className="option-label">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Dietary Preferences</h3>
              <div className="filter-options">
                {dietaryOptions.map(option => (
                  <label key={option} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedDietary.includes(option)}
                      onChange={() => toggleDietary(option)}
                    />
                    <span className="option-label">
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-range">
                <div className="price-inputs">
                  <div className="price-input">
                    <label>Min</label>
                    <div className="input-with-symbol">
                      <span>₨</span>
                      <input
                        type="number"
                        min="0"
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="price-input">
                    <label>Max</label>
                    <div className="input-with-symbol">
                      <span>₨</span>
                      <input
                        type="number"
                        min={priceRange[0]}
                        max="10000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                <div className="price-slider">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(0, parseFloat(e.target.value))}
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(1, parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="search-results">
            <div className="results-header">
              <div className="results-count">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </div>

              <div className="sort-options">
                <label htmlFor="sort-by">Sort by:</label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                </select>

                <button
                  className="sort-order-btn"
                  onClick={toggleSortOrder}
                  title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                >
                  {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                </button>
              </div>
            </div>

            {loading ? (
              <div className="loading"><LoadingSpinner /></div>
            ) : filteredProducts.length === 0 ? (
              <div className="no-results">
                <h2>No products found</h2>
                <p>Try adjusting your search or filter criteria.</p>
                {(selectedCategories.length > 0 || selectedDietary.length > 0 || priceRange[0] > 0 || priceRange[1] < 10) && (
                  <button className="clear-filters-btn" onClick={clearFilters}>
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
