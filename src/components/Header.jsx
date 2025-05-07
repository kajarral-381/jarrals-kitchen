import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaHeart, FaSearch } from 'react-icons/fa';
import Cart from './Cart';
import SearchBar from './SearchBar/SearchBar';
import { useWishlist } from '../context/WishlistContext';
import './Header.css';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { wishlist } = useWishlist();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Jarral's Kitchen</Link>
      </div>

      <div className="mobile-nav-toggle" onClick={toggleNav}>
        {isNavOpen ? <FaTimes /> : <FaBars />}
      </div>

      <nav id="main-navigation" className={`nav ${isNavOpen ? 'nav-open' : ''}`} aria-label="Main Navigation">
        <ul className="nav-list">
          <li><Link to="/" onClick={() => setIsNavOpen(false)}>Home</Link></li>
          <li><Link to="/menu" onClick={() => setIsNavOpen(false)}>Our Menu</Link></li>
          <li><Link to="/blog" onClick={() => setIsNavOpen(false)}>Blog</Link></li>
          <li><Link to="/about" onClick={() => setIsNavOpen(false)}>About Us</Link></li>
          <li><Link to="/contact" onClick={() => setIsNavOpen(false)}>Contact</Link></li>
        </ul>
      </nav>

      <div className="header-actions">
        <button
          className="search-icon"
          onClick={toggleSearch}
          aria-label="Search products"
        >
          <FaSearch />
        </button>
        <Link
          to="/wishlist"
          className="wishlist-icon"
          aria-label="View wishlist"
        >
          <FaHeart />
          {wishlist.items.length > 0 && (
            <span className="wishlist-count" aria-label={`${wishlist.items.length} items in wishlist`}>
              {wishlist.items.length}
            </span>
          )}
        </Link>
        <Link
          to="/account"
          className="account-icon"
          aria-label="My account"
        >
          <FaUser />
        </Link>
        <Cart />
      </div>

      {showSearch && (
        <div className="search-overlay">
          <div className="search-container">
            <SearchBar onClose={toggleSearch} />
            <button className="close-search" onClick={toggleSearch}>
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
