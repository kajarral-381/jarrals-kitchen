import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../components/Toast';
import { FaShoppingCart, FaTimes, FaTrash, FaPlus, FaMinus, FaHeart, FaArrowRight, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, saveForLater, moveToCart, removeSavedItem, clearCart, toggleCart } = useCart();
  const { items, savedItems, totalItems, totalPrice, isOpen } = cart;
  const { convertPrice, formatPrice } = useCurrency();
  const { showSuccessToast } = useToast();
  const [editingItemId, setEditingItemId] = useState(null);
  const [editQuantity, setEditQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('cart');

  const handleSaveForLater = (id) => {
    saveForLater(id);
    showSuccessToast('Item saved for later');
  };

  const handleMoveToCart = (id) => {
    moveToCart(id);
    showSuccessToast('Item moved to cart');
  };

  const handleRemoveSavedItem = (id) => {
    removeSavedItem(id);
    showSuccessToast('Item removed from saved items');
  };

  const startEditing = (item) => {
    setEditingItemId(item.id);
    setEditQuantity(item.quantity);
  };

  const saveEdit = () => {
    if (editQuantity > 0) {
      updateQuantity(editingItemId, editQuantity);
      showSuccessToast('Quantity updated');
    }
    setEditingItemId(null);
  };

  const cancelEdit = () => {
    setEditingItemId(null);
  };

  return (
    <>
      {/* Cart Icon */}
      <div className="cart-icon" onClick={toggleCart}>
        <FaShoppingCart />
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </div>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={toggleCart}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-tabs">
          <button
            className={`cart-tab ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            Cart ({items.length})
          </button>
          <button
            className={`cart-tab ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved ({savedItems?.length || 0})
          </button>
        </div>

        {activeTab === 'cart' && items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="continue-shopping" onClick={toggleCart}>
              Continue Shopping
            </button>
          </div>
        ) : activeTab === 'saved' && (!savedItems || savedItems.length === 0) ? (
          <div className="empty-cart">
            <p>You don't have any saved items</p>
            <button className="continue-shopping" onClick={() => setActiveTab('cart')}>
              View Cart
            </button>
          </div>
        ) : (
          <>
            {activeTab === 'cart' && (
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3>
                        <Link to={`/product/${item.id}`} onClick={toggleCart}>
                          {item.name}
                        </Link>
                      </h3>
                      <p className="item-price">{formatPrice(convertPrice(item.price))}</p>
                      <div className="item-actions">
                        <button
                          className="save-for-later-btn"
                          onClick={() => handleSaveForLater(item.id)}
                        >
                          <FaHeart /> Save for later
                        </button>
                      </div>
                    </div>

                    {editingItemId === item.id ? (
                      <div className="edit-quantity">
                        <input
                          type="number"
                          min="1"
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(parseInt(e.target.value) || 1)}
                        />
                        <div className="edit-actions">
                          <button onClick={saveEdit}>Save</button>
                          <button onClick={cancelEdit}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="item-quantity">
                        <button
                          className="quantity-btn"
                          onClick={() => removeFromCart(item)}
                          aria-label="Decrease quantity"
                        >
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => addToCart(item)}
                          aria-label="Increase quantity"
                        >
                          <FaPlus />
                        </button>
                        <button
                          className="edit-quantity-btn"
                          onClick={() => startEditing(item)}
                          aria-label="Edit quantity"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}

                    <p className="item-subtotal">
                      {formatPrice(convertPrice(item.price * item.quantity))}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="saved-items">
                {savedItems.map(item => (
                  <div key={item.id} className="saved-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3>
                        <Link to={`/product/${item.id}`} onClick={toggleCart}>
                          {item.name}
                        </Link>
                      </h3>
                      <p className="item-price">{formatPrice(convertPrice(item.price))}</p>
                    </div>
                    <div className="saved-item-actions">
                      <button
                        className="move-to-cart-btn"
                        onClick={() => handleMoveToCart(item.id)}
                      >
                        <FaArrowRight /> Move to Cart
                      </button>
                      <button
                        className="remove-saved-btn"
                        onClick={() => handleRemoveSavedItem(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'cart' && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>{formatPrice(convertPrice(totalPrice))}</span>
                </div>
                <button className="clear-cart" onClick={clearCart}>
                  <FaTrash /> Clear Cart
                </button>
                <Link to="/checkout" className="checkout-btn" onClick={toggleCart}>
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {/* Overlay */}
      {isOpen && <div className="cart-overlay" onClick={toggleCart}></div>}
    </>
  );
};

export default Cart;
