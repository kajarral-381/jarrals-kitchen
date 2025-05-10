import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import SocialShare from './SocialShare';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, description, price, isVegetarian, spiceLevel, allergens, calories, prepTime, servingInfo } = product;
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { convertPrice, formatPrice } = useCurrency();
  const inWishlist = isInWishlist(id);

  // Helper function to render spice level indicators
  const renderSpiceLevel = (level) => {
    const peppers = [];
    for (let i = 0; i < level; i++) {
      peppers.push(<span key={i} className="pepper-icon">🌶️</span>);
    }
    return peppers;
  };

  const handleAddToCart = (e) => {
    // Prevent the default action to avoid conflicts with parent links
    e.stopPropagation();

    // Add to cart with default options
    addToCart({
      ...product,
      quantity: 1,
      customizations: null
    });
  };

  const toggleWishlist = (e) => {
    // Prevent the default action to avoid conflicts with parent links
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(product);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={`/product/${id}`} className="product-image-link">
          <div className="no-image-placeholder">
            <span>{name.charAt(0)}</span>
          </div>
        </Link>
        <div className="product-actions">
          <button
            className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
            onClick={toggleWishlist}
            aria-label={inWishlist ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          >
            {inWishlist ? <FaHeart /> : <FaRegHeart />}
          </button>
          <div className="share-wrapper">
            <SocialShare
              url={`${window.location.origin}/product/${id}`}
              title={name}
              image=""
              description={description}
            />
          </div>
        </div>
        <Link to={`/product/${id}`} className="view-details">
          View Details
        </Link>
      </div>
      <div className="product-info">
        <div className="product-header">
          <h3>
            <Link to={`/product/${id}`}>{name}</Link>
          </h3>
          <div className="product-badges">
            {isVegetarian && <span className="badge vegetarian">Veg</span>}
            {spiceLevel > 0 && <div className="badge spice-level">{renderSpiceLevel(spiceLevel)}</div>}
          </div>
        </div>
        <p className="product-description">{description}</p>
        <div className="product-details">
          <div className="detail-item">
            <span className="detail-label">Prep Time:</span>
            <span className="detail-value">{prepTime}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Calories:</span>
            <span className="detail-value">{calories}</span>
          </div>
          {allergens && allergens.length > 0 && allergens[0] !== "None" && (
            <div className="detail-item allergens">
              <span className="detail-label">Allergens:</span>
              <span className="detail-value">{allergens.join(', ')}</span>
            </div>
          )}

          {servingInfo && (
            <div className="serving-info">
              <div className="detail-item">
                <span className="detail-label">Serving:</span>
                <span className="detail-value">{servingInfo.serves}</span>
              </div>

              {servingInfo.size && (
                <div className="detail-item">
                  <span className="detail-label">Size:</span>
                  <span className="detail-value">{servingInfo.size}</span>
                </div>
              )}

              {servingInfo.weight && (
                <div className="detail-item">
                  <span className="detail-label">Weight:</span>
                  <span className="detail-value">{servingInfo.weight}</span>
                </div>
              )}

              {servingInfo.quantity && (
                <div className="detail-item">
                  <span className="detail-label">Quantity:</span>
                  <span className="detail-value">{servingInfo.quantity}</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="product-footer">
          <span className="product-price">{formatPrice(convertPrice(price))}</span>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
