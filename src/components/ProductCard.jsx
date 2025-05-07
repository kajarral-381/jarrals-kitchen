import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import SocialShare from './SocialShare';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, description, price, image } = product;
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { convertPrice, formatPrice } = useCurrency();
  const inWishlist = isInWishlist(id);

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
          <img src={image} alt={name} />
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
              image={image}
              description={description}
            />
          </div>
        </div>
        <Link to={`/product/${id}`} className="view-details">
          View Details
        </Link>
      </div>
      <div className="product-info">
        <h3>
          <Link to={`/product/${id}`}>{name}</Link>
        </h3>
        <p className="product-description">{description}</p>
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
