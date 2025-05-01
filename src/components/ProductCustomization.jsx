import { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import './ProductCustomization.css';

const ProductCustomization = ({ product, onCustomizationChange }) => {
  const { convertPrice, formatPrice } = useCurrency();
  const [customizations, setCustomizations] = useState({
    size: 'regular',
    extras: [],
    specialInstructions: ''
  });

  // Define available options based on product category
  const getAvailableOptions = () => {
    switch (product.category) {
      case 'pastries':
        return {
          sizes: [
            { id: 'regular', name: 'Regular', price: 0 },
            { id: 'large', name: 'Large', price: 1.50 }
          ],
          extras: [
            { id: 'extra-chocolate', name: 'Extra Chocolate', price: 0.75 },
            { id: 'powdered-sugar', name: 'Powdered Sugar', price: 0.50 },
            { id: 'nuts', name: 'Chopped Nuts', price: 1.00 }
          ]
        };
      case 'cakes':
        return {
          sizes: [
            { id: 'slice', name: 'Slice', price: 0 },
            { id: 'small', name: 'Small (6")', price: 15.00 },
            { id: 'medium', name: 'Medium (8")', price: 25.00 },
            { id: 'large', name: 'Large (10")', price: 35.00 }
          ],
          extras: [
            { id: 'extra-frosting', name: 'Extra Frosting', price: 2.00 },
            { id: 'birthday-message', name: 'Birthday Message', price: 3.00 },
            { id: 'candles', name: 'Candles', price: 1.00 }
          ]
        };
      case 'breads':
        return {
          sizes: [
            { id: 'regular', name: 'Regular Loaf', price: 0 },
            { id: 'half', name: 'Half Loaf', price: -2.00 },
            { id: 'rolls', name: 'Dinner Rolls (6)', price: 1.00 }
          ],
          extras: [
            { id: 'sliced', name: 'Pre-sliced', price: 0.50 },
            { id: 'sesame-seeds', name: 'Sesame Seeds', price: 0.75 },
            { id: 'herbs', name: 'Herbs & Garlic', price: 1.25 }
          ]
        };
      default:
        return {
          sizes: [
            { id: 'regular', name: 'Regular', price: 0 }
          ],
          extras: []
        };
    }
  };

  const options = getAvailableOptions();

  const handleSizeChange = (e) => {
    const newCustomizations = {
      ...customizations,
      size: e.target.value
    };

    setCustomizations(newCustomizations);
    onCustomizationChange(newCustomizations);
  };

  const handleExtraToggle = (extraId) => {
    let newExtras;

    if (customizations.extras.includes(extraId)) {
      newExtras = customizations.extras.filter(id => id !== extraId);
    } else {
      newExtras = [...customizations.extras, extraId];
    }

    const newCustomizations = {
      ...customizations,
      extras: newExtras
    };

    setCustomizations(newCustomizations);
    onCustomizationChange(newCustomizations);
  };

  const handleInstructionsChange = (e) => {
    const newCustomizations = {
      ...customizations,
      specialInstructions: e.target.value
    };

    setCustomizations(newCustomizations);
    onCustomizationChange(newCustomizations);
  };

  // Calculate additional price based on customizations
  const calculateAdditionalPrice = () => {
    let additionalPrice = 0;

    // Add size price
    const selectedSize = options.sizes.find(size => size.id === customizations.size);
    if (selectedSize) {
      additionalPrice += selectedSize.price;
    }

    // Add extras price
    customizations.extras.forEach(extraId => {
      const extra = options.extras.find(e => e.id === extraId);
      if (extra) {
        additionalPrice += extra.price;
      }
    });

    return additionalPrice;
  };

  return (
    <div className="product-customization">
      <h3>Customize Your Order</h3>

      {options.sizes.length > 1 && (
        <div className="customization-section">
          <h4>Size Options</h4>
          <div className="size-options">
            {options.sizes.map(size => (
              <label key={size.id} className="size-option">
                <input
                  type="radio"
                  name="size"
                  value={size.id}
                  checked={customizations.size === size.id}
                  onChange={handleSizeChange}
                />
                <span className="option-label">
                  {size.name}
                  {size.price !== 0 && (
                    <span className="option-price">
                      {size.price > 0
                        ? `+${formatPrice(convertPrice(size.price)).replace('₨', '₨')}`
                        : `-${formatPrice(convertPrice(Math.abs(size.price))).replace('₨', '₨')}`}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {options.extras.length > 0 && (
        <div className="customization-section">
          <h4>Add Extras</h4>
          <div className="extras-options">
            {options.extras.map(extra => (
              <label key={extra.id} className="extra-option">
                <input
                  type="checkbox"
                  value={extra.id}
                  checked={customizations.extras.includes(extra.id)}
                  onChange={() => handleExtraToggle(extra.id)}
                />
                <span className="option-label">
                  {extra.name}
                  <span className="option-price">+{formatPrice(convertPrice(extra.price)).replace('₨', '₨')}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="customization-section">
        <h4>Special Instructions</h4>
        <textarea
          placeholder="Any special requests or allergies we should know about?"
          value={customizations.specialInstructions}
          onChange={handleInstructionsChange}
          rows="3"
        ></textarea>
      </div>

      {calculateAdditionalPrice() !== 0 && (
        <div className="additional-price">
          Additional cost:
          <span className="price-amount">
            {calculateAdditionalPrice() > 0
              ? `+${formatPrice(convertPrice(calculateAdditionalPrice())).replace('₨', '₨')}`
              : `-${formatPrice(convertPrice(Math.abs(calculateAdditionalPrice()))).replace('₨', '₨')}`
            }
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCustomization;
