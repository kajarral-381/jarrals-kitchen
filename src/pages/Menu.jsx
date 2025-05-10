import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import menuData from '../assets/menu-data.js';
import './Menu.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // Process menu data - the data is already in the correct format
    const processedProducts = menuData.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category.toLowerCase(),
      isVegetarian: item.isVegetarian,
      spiceLevel: item.spiceLevel,
      allergens: item.allergens,
      calories: item.calories,
      prepTime: item.prepTime,
      servingInfo: item.servingInfo
    }));

    setProducts(processedProducts);
    setLoading(false);
  }, []);

  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  if (loading) {
    return (
      <div className="menu-page">
        <div className="menu-header">
          <h1>Our Menu</h1>
          <p>Loading menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Explore our delicious selection of freshly prepared items</p>
      </div>

      <div className="container">
        <div className="category-filter">
          <button
            className={activeCategory === 'all' ? 'active' : ''}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
