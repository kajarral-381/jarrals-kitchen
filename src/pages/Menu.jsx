import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import {
  chocolateCroissant,
  strawberryCheesecake,
  sourdoughBread,
  blueberryMuffin,
  cinnamonRoll,
  baguette,
  chocolateCake,
  applePie,
  chocolateChipCookie
} from '../assets';
import menuData from '../assets/menu.json';
import './Menu.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map of product names to images
  const productImages = {
    'Chocolate Croissant': chocolateCroissant,
    'Strawberry Cheesecake': strawberryCheesecake,
    'Sourdough Bread': sourdoughBread,
    'Blueberry Muffin': blueberryMuffin,
    'Cinnamon Roll': cinnamonRoll,
    'Baguette': baguette,
    'Chocolate Cake': chocolateCake,
    'Apple Pie': applePie,
    'Chocolate Chip Cookie': chocolateChipCookie,
    // Default images for other products by category
    'BRUNCH': chocolateCroissant,
    'PAKISTANI': sourdoughBread,
    'CHINESE': baguette,
    'ITALIAN': applePie,
    'DESSERTS': cinnamonRoll,
    'CAKES': chocolateCake,
    'CUPCAKES': blueberryMuffin,
    'MUFFINS': blueberryMuffin,
    'BROWNIES': chocolateChipCookie
  };

  // Get image for a product
  const getProductImage = (product) => {
    // Try to match by exact name
    if (productImages[product.name]) {
      return productImages[product.name];
    }
    // Fall back to category
    if (productImages[product.category]) {
      return productImages[product.category];
    }
    // Default fallback
    return chocolateCroissant;
  };

  useEffect(() => {
    // Process menu data
    const processedProducts = menuData.map((item, index) => ({
      id: index + 1,
      name: item.name,
      description: item.description,
      price: item.price, // Price is already in PKR
      image: getProductImage(item),
      category: item.category.toLowerCase()
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
              {category.charAt(0).toUpperCase() + category.slice(1)}
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
