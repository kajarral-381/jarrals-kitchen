import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const handleRemoveItem = (product) => {
    removeFromWishlist(product);
  };
  
  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: 1
    });
    
    // Show confirmation message
    alert(`${product.name} added to cart!`);
  };
  
  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      clearWishlist();
    }
  };
  
  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>Items you've saved for later</p>
        </div>
        
        {wishlist.items.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-wishlist-icon">❤️</div>
            <h2>Your wishlist is empty</h2>
            <p>Add items to your wishlist by clicking the heart icon on product pages.</p>
            <Link to="/menu" className="continue-shopping-btn">
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="wishlist-actions">
              <button className="clear-wishlist-btn" onClick={handleClearWishlist}>
                Clear Wishlist
              </button>
            </div>
            
            <div className="wishlist-grid">
              {wishlist.items.map(item => (
                <div key={item.id} className="wishlist-item">
                  <div className="wishlist-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="wishlist-item-info">
                    <h3>
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p className="wishlist-item-description">{item.description}</p>
                    <div className="wishlist-item-price">${item.price.toFixed(2)}</div>
                    
                    <div className="wishlist-item-actions">
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(item)}
                      >
                        <FaShoppingCart /> Add to Cart
                      </button>
                      
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
