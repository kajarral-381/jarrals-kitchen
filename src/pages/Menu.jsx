import { useState } from 'react';
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
import './Menu.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Product data
  const products = [
    {
      id: 1,
      name: 'Chocolate Croissant',
      description: 'Buttery, flaky croissant filled with rich chocolate.',
      price: 3.99,
      image: chocolateCroissant,
      category: 'pastries'
    },
    {
      id: 2,
      name: 'Strawberry Cheesecake',
      description: 'Creamy cheesecake topped with fresh strawberry glaze.',
      price: 5.99,
      image: strawberryCheesecake,
      category: 'cakes'
    },
    {
      id: 3,
      name: 'Sourdough Bread',
      description: 'Artisanal sourdough bread with a perfect crust.',
      price: 6.99,
      image: sourdoughBread,
      category: 'breads'
    },
    {
      id: 4,
      name: 'Blueberry Muffin',
      description: 'Moist muffin packed with juicy blueberries.',
      price: 2.99,
      image: blueberryMuffin,
      category: 'pastries'
    },
    {
      id: 5,
      name: 'Cinnamon Roll',
      description: 'Soft, gooey cinnamon roll with cream cheese frosting.',
      price: 3.49,
      image: cinnamonRoll,
      category: 'pastries'
    },
    {
      id: 6,
      name: 'Baguette',
      description: 'Traditional French baguette with crispy crust.',
      price: 4.99,
      image: baguette,
      category: 'breads'
    },
    {
      id: 7,
      name: 'Chocolate Cake',
      description: 'Rich, moist chocolate cake with chocolate ganache.',
      price: 6.99,
      image: chocolateCake,
      category: 'cakes'
    },
    {
      id: 8,
      name: 'Apple Pie',
      description: 'Classic apple pie with flaky crust and cinnamon filling.',
      price: 5.49,
      image: applePie,
      category: 'pies'
    },
    {
      id: 9,
      name: 'Chocolate Chip Cookie',
      description: 'Soft and chewy cookie loaded with chocolate chips.',
      price: 1.99,
      image: chocolateChipCookie,
      category: 'cookies'
    }
  ];

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Explore our delicious selection of freshly baked goods</p>
      </div>

      <div className="container">
        <div className="category-filter">
          <button
            className={activeCategory === 'all' ? 'active' : ''}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button
            className={activeCategory === 'breads' ? 'active' : ''}
            onClick={() => setActiveCategory('breads')}
          >
            Breads
          </button>
          <button
            className={activeCategory === 'pastries' ? 'active' : ''}
            onClick={() => setActiveCategory('pastries')}
          >
            Pastries
          </button>
          <button
            className={activeCategory === 'cakes' ? 'active' : ''}
            onClick={() => setActiveCategory('cakes')}
          >
            Cakes
          </button>
          <button
            className={activeCategory === 'cookies' ? 'active' : ''}
            onClick={() => setActiveCategory('cookies')}
          >
            Cookies
          </button>
          <button
            className={activeCategory === 'pies' ? 'active' : ''}
            onClick={() => setActiveCategory('pies')}
          >
            Pies
          </button>
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
