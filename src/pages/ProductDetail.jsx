import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../components/Toast';
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaArrowLeft, FaSearch, FaSearchMinus, FaSearchPlus } from 'react-icons/fa';
import ProductCustomization from '../components/ProductCustomization';
import ReviewSystem from '../components/ReviewSystem';
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
import './ProductDetail.css';

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: 'Chocolate Croissant',
    description: 'Buttery, flaky croissant filled with rich chocolate.',
    longDescription: `
      <p>Our Chocolate Croissants are a perfect harmony of buttery, flaky pastry and rich, high-quality chocolate. Each croissant is carefully crafted by hand, following traditional French techniques that have been perfected over generations.</p>

      <p>We start with premium European-style butter that's folded into our dough multiple times to create those signature flaky layers. Then we fill each croissant with a generous amount of fine Belgian chocolate that melts perfectly when baked.</p>

      <p>Baked fresh every morning, these croissants have a golden, crispy exterior that gives way to a soft, airy interior with a decadent chocolate center. They're perfect for breakfast, as an afternoon treat with coffee, or whenever you need a little indulgence.</p>

      <h3>Ingredients</h3>
      <p>Enriched flour (wheat flour, malted barley flour, niacin, iron, thiamin mononitrate, riboflavin, folic acid), butter, chocolate (cocoa mass, sugar, cocoa butter, soy lecithin, natural vanilla flavor), water, sugar, yeast, salt, eggs.</p>

      <h3>Allergens</h3>
      <p>Contains: Wheat, Milk, Soy, Eggs</p>
    `,
    price: 3.99,
    category: 'pastries',
    image: chocolateCroissant,
    gallery: [
      chocolateCroissant,
      chocolateCroissant,
      chocolateCroissant
    ],
    stock: 25,
    featured: true,
    nutritionalInfo: {
      calories: 320,
      fat: 18,
      carbs: 34,
      protein: 5,
      sodium: 240
    },
    dimensions: {
      weight: '85g',
      size: 'Approximately 15cm x 8cm'
    }
  },
  {
    id: 2,
    name: 'Strawberry Cheesecake',
    description: 'Creamy cheesecake topped with fresh strawberry glaze.',
    longDescription: `
      <p>Our Strawberry Cheesecake is a delightful blend of creamy, tangy cheesecake and sweet, fresh strawberries. Each cake is made with care using our time-tested recipe that creates the perfect balance of flavors and textures.</p>

      <p>We start with a buttery graham cracker crust that provides a crunchy foundation. The cheesecake filling is made with premium cream cheese, farm-fresh eggs, and just the right amount of sugar, resulting in a smooth, rich texture that's not too sweet. The cake is then topped with our homemade strawberry glaze made from locally sourced strawberries when in season.</p>

      <p>Each slice offers a perfect harmony of creamy cheesecake, buttery crust, and fruity sweetness that makes for an unforgettable dessert experience.</p>

      <h3>Ingredients</h3>
      <p>Cream cheese, sugar, eggs, graham crackers, butter, strawberries, cornstarch, lemon juice, vanilla extract.</p>

      <h3>Allergens</h3>
      <p>Contains: Milk, Eggs, Wheat</p>
    `,
    price: 5.99,
    category: 'cakes',
    image: strawberryCheesecake,
    gallery: [
      strawberryCheesecake,
      strawberryCheesecake,
      strawberryCheesecake
    ],
    stock: 15,
    featured: true,
    nutritionalInfo: {
      calories: 450,
      fat: 28,
      carbs: 42,
      protein: 7,
      sodium: 320
    },
    dimensions: {
      weight: '120g per slice',
      size: 'Slice is approximately 1/8 of a 9-inch cake'
    }
  },
  {
    id: 3,
    name: 'Sourdough Bread',
    description: 'Artisanal sourdough bread with a perfect crust.',
    longDescription: `
      <p>Our Artisanal Sourdough Bread is the pride of our bakery, crafted with patience and expertise. Each loaf begins with our own sourdough starter that we've maintained for over a decade, giving our bread its distinctive tangy flavor and character.</p>

      <p>The bread-making process spans over 24 hours, allowing for slow fermentation that develops complex flavors and creates the bread's signature open, airy crumb. We use only the simplest, highest-quality ingredients: organic flour, water, salt, and our sourdough culture – no additives or preservatives.</p>

      <p>Each loaf is shaped by hand and baked in a stone hearth oven, resulting in a crackling crust and tender interior that's perfect for everything from sandwiches to sopping up soup or simply enjoying with good butter.</p>

      <h3>Ingredients</h3>
      <p>Organic unbleached flour, water, sea salt, sourdough culture.</p>

      <h3>Allergens</h3>
      <p>Contains: Wheat</p>
    `,
    price: 6.99,
    category: 'breads',
    image: sourdoughBread,
    gallery: [
      sourdoughBread,
      sourdoughBread,
      sourdoughBread
    ],
    stock: 10,
    featured: true,
    nutritionalInfo: {
      calories: 120,
      fat: 0.5,
      carbs: 25,
      protein: 4,
      sodium: 180
    },
    dimensions: {
      weight: '500g',
      size: 'Approximately 20cm diameter'
    }
  },
  {
    id: 4,
    name: 'Blueberry Muffin',
    description: 'Moist muffin packed with juicy blueberries.',
    longDescription: `
      <p>Our Blueberry Muffins are bursting with plump, juicy blueberries in every bite. Made with a light, tender batter that bakes up moist and flavorful, these muffins are a perfect breakfast treat or afternoon snack.</p>

      <p>We use only the freshest ingredients, including real butter, farm-fresh eggs, and premium blueberries. Each muffin is topped with a sprinkle of sugar for a delicate, sweet crunch on top.</p>

      <h3>Ingredients</h3>
      <p>All-purpose flour, sugar, butter, eggs, milk, blueberries, baking powder, salt, vanilla extract.</p>

      <h3>Allergens</h3>
      <p>Contains: Wheat, Milk, Eggs</p>
    `,
    price: 2.99,
    category: 'pastries',
    image: blueberryMuffin,
    gallery: [
      blueberryMuffin,
      blueberryMuffin,
      blueberryMuffin
    ],
    stock: 20,
    featured: false,
    nutritionalInfo: {
      calories: 280,
      fat: 12,
      carbs: 38,
      protein: 4,
      sodium: 210
    },
    dimensions: {
      weight: '95g',
      size: 'Approximately 7cm diameter'
    }
  },
  {
    id: 5,
    name: 'Cinnamon Roll',
    description: 'Soft, gooey cinnamon roll with cream cheese frosting.',
    longDescription: `
      <p>Our Cinnamon Rolls are the ultimate comfort food, featuring soft, pillowy dough swirled with a generous filling of cinnamon, butter, and brown sugar, then topped with a rich cream cheese frosting.</p>

      <p>Each roll is made from scratch daily and baked to golden perfection. The result is a gooey, aromatic treat that's perfect for breakfast or as an indulgent snack any time of day.</p>

      <h3>Ingredients</h3>
      <p>Enriched flour, butter, sugar, eggs, milk, cream cheese, cinnamon, brown sugar, vanilla extract, salt.</p>

      <h3>Allergens</h3>
      <p>Contains: Wheat, Milk, Eggs</p>
    `,
    price: 3.49,
    category: 'pastries',
    image: cinnamonRoll,
    gallery: [
      cinnamonRoll,
      cinnamonRoll,
      cinnamonRoll
    ],
    stock: 15,
    featured: false,
    nutritionalInfo: {
      calories: 420,
      fat: 22,
      carbs: 52,
      protein: 6,
      sodium: 290
    },
    dimensions: {
      weight: '110g',
      size: 'Approximately 10cm diameter'
    }
  },
  {
    id: 6,
    name: 'Baguette',
    description: 'Traditional French baguette with crispy crust.',
    longDescription: `
      <p>Our Traditional French Baguettes are crafted using authentic techniques to create that perfect combination of crispy crust and light, airy interior. Each baguette is shaped by hand and scored with our signature pattern before baking.</p>

      <p>We use a slow fermentation process that develops deep flavor and that distinctive chew that makes a great baguette so satisfying. Perfect for sandwiches, alongside soups, or simply enjoyed with butter and jam.</p>

      <h3>Ingredients</h3>
      <p>Unbleached flour, water, salt, yeast.</p>

      <h3>Allergens</h3>
      <p>Contains: Wheat</p>
    `,
    price: 4.99,
    category: 'breads',
    image: baguette,
    gallery: [
      baguette,
      baguette,
      baguette
    ],
    stock: 12,
    featured: false,
    nutritionalInfo: {
      calories: 130,
      fat: 0.5,
      carbs: 26,
      protein: 4,
      sodium: 270
    },
    dimensions: {
      weight: '250g',
      size: 'Approximately 60cm length'
    }
  },
  {
    id: 7,
    name: 'Chocolate Cake',
    description: 'Rich, moist chocolate cake with chocolate ganache.',
    longDescription: `
      <p>Our Chocolate Cake is a chocolate lover's dream, featuring layers of rich, moist chocolate cake covered in a smooth, decadent chocolate ganache. Made with high-quality cocoa and real chocolate, this cake delivers intense chocolate flavor in every bite.</p>

      <p>Perfect for celebrations or whenever you need a special dessert to impress, our chocolate cake is a customer favorite that never disappoints.</p>

      <h3>Ingredients</h3>
      <p>All-purpose flour, sugar, cocoa powder, butter, eggs, milk, heavy cream, chocolate, vanilla extract, baking soda, salt.</p>

      <h3>Allergens</h3>
      <p>Contains: Wheat, Milk, Eggs</p>
    `,
    price: 6.99,
    category: 'cakes',
    image: chocolateCake,
    gallery: [
      chocolateCake,
      chocolateCake,
      chocolateCake
    ],
    stock: 8,
    featured: false,
    nutritionalInfo: {
      calories: 480,
      fat: 26,
      carbs: 58,
      protein: 5,
      sodium: 340
    },
    dimensions: {
      weight: '130g per slice',
      size: 'Slice is approximately 1/8 of a 9-inch cake'
    }
  },
  {
    id: 8,
    name: 'Apple Pie',
    description: 'Classic apple pie with flaky crust and cinnamon filling.',
    longDescription: `
      <p>Our Classic Apple Pie features a buttery, flaky crust filled with tart-sweet apples, cinnamon, and a touch of nutmeg. Each pie is carefully crafted by hand and baked until the crust is golden and the filling is perfectly tender.</p>

      <p>We use a mix of apple varieties for the best flavor and texture, creating a pie that's both nostalgic and exceptional. Delicious on its own or served warm with a scoop of vanilla ice cream.</p>

      <h3>Ingredients</h3>
      <p>All-purpose flour, butter, apples, sugar, brown sugar, cinnamon, nutmeg, lemon juice, salt.</p>

      <h3>Allergens</h3>
      <p>Contains: Wheat, Milk</p>
    `,
    price: 5.49,
    category: 'pies',
    image: applePie,
    gallery: [
      applePie,
      applePie,
      applePie
    ],
    stock: 6,
    featured: false,
    nutritionalInfo: {
      calories: 380,
      fat: 18,
      carbs: 52,
      protein: 3,
      sodium: 220
    },
    dimensions: {
      weight: '120g per slice',
      size: 'Slice is approximately 1/8 of a 9-inch pie'
    }
  },
  {
    id: 9,
    name: 'Chocolate Chip Cookie',
    description: 'Soft and chewy cookie loaded with chocolate chips.',
    longDescription: `
      <p>Our Chocolate Chip Cookies are the perfect balance of soft and chewy, with crisp edges and a buttery, vanilla-rich dough studded with generous chunks of high-quality chocolate. Each cookie is hand-formed and baked to golden perfection.</p>

      <p>These classic cookies are made with real butter and brown sugar for depth of flavor, and we don't skimp on the chocolate! Perfect with a glass of milk or cup of coffee.</p>

      <h3>Ingredients</h3>
      <p>All-purpose flour, butter, brown sugar, white sugar, eggs, chocolate chips, vanilla extract, baking soda, salt.</p>

      <h3>Allergens</h3>
      <p>Contains: Wheat, Milk, Eggs</p>
    `,
    price: 1.99,
    category: 'cookies',
    image: chocolateChipCookie,
    gallery: [
      chocolateChipCookie,
      chocolateChipCookie,
      chocolateChipCookie
    ],
    stock: 30,
    featured: false,
    nutritionalInfo: {
      calories: 220,
      fat: 11,
      carbs: 28,
      protein: 2,
      sodium: 150
    },
    dimensions: {
      weight: '50g',
      size: 'Approximately 8cm diameter'
    }
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const { cart, addToCart, updateQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { convertPrice, formatPrice } = useCurrency();
  const { showSuccessToast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [customizations, setCustomizations] = useState(null);
  const [additionalPrice, setAdditionalPrice] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isInCart, setIsInCart] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);
  const imageRef = useRef(null);

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

  // Check if product is in cart
  useEffect(() => {
    if (product) {
      const cartItem = cart.items.find(item => item.id === product.id);
      if (cartItem) {
        setIsInCart(true);
        setCartItemId(cartItem.id);
        setQuantity(cartItem.quantity);
        if (cartItem.customizations) {
          setCustomizations(cartItem.customizations);
        }
      } else {
        setIsInCart(false);
        setCartItemId(null);
      }
    }
  }, [cart.items, product]);

  // Initialize customizations when product is loaded
  useEffect(() => {
    if (product && !customizations) {
      // Set default customizations based on product category
      const defaultCustomizations = {
        size: 'regular',
        extras: [],
        specialInstructions: ''
      };
      setCustomizations(defaultCustomizations);
    }
  }, [product, customizations]);

  useEffect(() => {
    // Find the product in the menu data
    const menuProduct = menuData.find((item, index) => (index + 1) === parseInt(id));

    if (menuProduct) {
      // Create a product object with the necessary properties
      const productImage = getProductImage(menuProduct);

      // Generate detailed description based on category
      let detailedDescription = '';
      let ingredients = '';
      let allergens = 'May contain wheat, dairy, nuts, and spices. Please ask our staff for specific allergen information.';
      let nutritionalInfo = {
        calories: 350,
        fat: 15,
        carbs: 40,
        protein: 8,
        sodium: 250
      };
      let dimensions = {
        weight: '150g',
        size: 'Standard serving'
      };

      // Customize details based on category
      switch(menuProduct.category.toLowerCase()) {
        case 'brunch':
          detailedDescription = `<p>${menuProduct.description}</p>
            <p>Our ${menuProduct.name} is a delicious brunch option prepared with authentic Pakistani recipes passed down through generations. Each serving is freshly made to order, ensuring you get the best taste and quality.</p>
            <p>Perfect for a hearty breakfast or a satisfying lunch, this dish combines traditional spices and cooking techniques to create a memorable dining experience.</p>`;
          ingredients = 'Fresh vegetables, aromatic spices, premium quality meat (where applicable), herbs, and traditional Pakistani seasonings.';
          allergens = 'May contain wheat, dairy, nuts, and spices. Please ask our staff for specific allergen information.';
          dimensions.weight = '250g';
          dimensions.size = 'Standard serving (serves 1)';
          break;

        case 'pakistani':
          detailedDescription = `<p>${menuProduct.description}</p>
            <p>Our ${menuProduct.name} is a classic Pakistani dish prepared with authentic recipes and techniques. We use only the freshest ingredients and traditional spice blends to create this flavorful dish that captures the essence of Pakistani cuisine.</p>
            <p>Each dish is carefully prepared by our skilled chefs who have mastered the art of balancing spices and flavors to create an unforgettable dining experience.</p>`;
          ingredients = 'Premium quality meat or vegetables, authentic Pakistani spice blend, fresh herbs, ghee, and traditional seasonings.';
          allergens = 'May contain wheat, dairy, nuts, and various spices. Please ask our staff for specific allergen information.';
          dimensions.weight = '300g';
          dimensions.size = 'Standard serving (serves 1-2)';
          break;

        case 'chinese':
          detailedDescription = `<p>${menuProduct.description}</p>
            <p>Our ${menuProduct.name} brings the authentic flavors of Chinese cuisine right to your table. We use traditional cooking methods and high-quality ingredients to create this delicious dish that's both satisfying and flavorful.</p>
            <p>Our chefs have been trained in authentic Chinese cooking techniques to ensure each dish maintains its traditional taste while incorporating the freshest local ingredients.</p>`;
          ingredients = 'Fresh vegetables, premium quality meat (where applicable), authentic Chinese sauces, aromatic spices, and herbs.';
          allergens = 'May contain soy, wheat, sesame, shellfish, and nuts. Please ask our staff for specific allergen information.';
          dimensions.weight = '275g';
          dimensions.size = 'Standard serving (serves 1)';
          break;

        case 'italian':
          detailedDescription = `<p>${menuProduct.description}</p>
            <p>Our ${menuProduct.name} is inspired by traditional Italian recipes, bringing the authentic taste of Italy to your dining experience. We use premium ingredients and time-honored cooking methods to create this delicious dish.</p>
            <p>Each Italian dish is prepared with attention to detail and a passion for capturing the true essence of Italian cuisine, resulting in flavors that transport you straight to Italy.</p>`;
          ingredients = 'Imported Italian ingredients, fresh herbs, premium quality olive oil, and authentic seasonings.';
          allergens = 'May contain wheat, dairy, eggs, and nuts. Please ask our staff for specific allergen information.';
          dimensions.weight = '280g';
          dimensions.size = 'Standard serving (serves 1)';
          break;

        case 'desserts':
          detailedDescription = `<p>${menuProduct.description}</p>
            <p>Our ${menuProduct.name} is a delightful sweet treat that perfectly concludes any meal. Made with the finest ingredients and prepared with care, this dessert offers a perfect balance of flavors and textures.</p>
            <p>Our pastry chefs take pride in creating desserts that not only look beautiful but taste amazing, ensuring each bite is a moment to savor.</p>`;
          ingredients = 'Premium quality flour, fresh dairy, natural sweeteners, and high-quality flavorings.';
          allergens = 'Contains wheat, dairy, eggs, and may contain nuts. Please ask our staff for specific allergen information.';
          nutritionalInfo.calories = 420;
          nutritionalInfo.fat = 22;
          nutritionalInfo.carbs = 52;
          nutritionalInfo.protein = 6;
          dimensions.weight = '120g';
          dimensions.size = 'Standard serving (serves 1)';
          break;

        default:
          detailedDescription = `<p>${menuProduct.description}</p>
            <p>Our ${menuProduct.name} is prepared with the finest ingredients and traditional recipes to ensure an authentic and delicious dining experience.</p>
            <p>Each dish is carefully crafted by our skilled chefs who take pride in delivering exceptional quality and taste with every serving.</p>`;
          ingredients = 'Premium quality ingredients selected for freshness and flavor.';
          allergens = 'May contain allergens. Please ask our staff for details.';
      }

      // Create the long description with the detailed information
      const longDescription = `${detailedDescription}
        <h3>Ingredients</h3>
        <p>${ingredients}</p>`;

      const foundProduct = {
        id: parseInt(id),
        name: menuProduct.name,
        description: menuProduct.description,
        longDescription: longDescription,
        price: menuProduct.price,
        category: menuProduct.category.toLowerCase(),
        image: productImage,
        gallery: [productImage, productImage, productImage],
        stock: 20,
        featured: true,
        nutritionalInfo: nutritionalInfo,
        dimensions: dimensions,
        allergens: allergens
      };

      setProduct(foundProduct);
      // Reset state when product changes
      setQuantity(1);
      setActiveImage(0);
      setActiveTab('description');
      setCustomizations(null);
      setAdditionalPrice(0);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/menu" className="back-to-menu">
          <FaArrowLeft /> Back to Menu
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity,
      price: product.price + additionalPrice,
      customizations
    };

    if (isInCart) {
      // Update existing cart item
      updateQuantity(product.id, quantity, customizations, product.price + additionalPrice);
      showSuccessToast(`Cart updated with ${quantity} ${product.name}${quantity > 1 ? 's' : ''}!`);
    } else {
      // Add new item to cart
      addToCart(productToAdd);
      showSuccessToast(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart!`);
    }
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product);
      showSuccessToast(`${product.name} removed from your wishlist`);
    } else {
      addToWishlist(product);
      showSuccessToast(`${product.name} added to your wishlist!`);
    }
  };

  const handleImageZoom = (e) => {
    if (!isZoomed) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setZoomLevel(2.5); // Zoom in
    } else {
      setZoomLevel(1); // Zoom out
    }
  };

  const increaseZoom = () => {
    if (zoomLevel < 4) {
      setZoomLevel(zoomLevel + 0.5);
      setIsZoomed(true);
    }
  };

  const decreaseZoom = () => {
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 0.5);
      if (zoomLevel - 0.5 <= 1) {
        setIsZoomed(false);
      }
    }
  };

  const handleCustomizationChange = (newCustomizations) => {
    setCustomizations(newCustomizations);

    // Calculate additional price
    let additionalCost = 0;

    // Add size price if applicable
    if (newCustomizations.size) {
      const options = getCustomizationOptions();
      const selectedSize = options.sizes.find(size => size.id === newCustomizations.size);
      if (selectedSize) {
        additionalCost += selectedSize.price;
      }

      // Add extras price
      newCustomizations.extras.forEach(extraId => {
        const extra = options.extras.find(e => e.id === extraId);
        if (extra) {
          additionalCost += extra.price;
        }
      });
    }

    setAdditionalPrice(additionalCost);
  };

  const getCustomizationOptions = () => {
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

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> /
          <Link to="/menu">Menu</Link> /
          <Link to={`/menu?category=${product.category}`}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link> /
          <span>{product.name}</span>
        </div>

        <div className="product-detail">
          <div className="product-gallery">
            <div
              className={`main-image ${isZoomed ? 'zoomed' : ''}`}
              onMouseMove={handleImageZoom}
              onClick={toggleZoom}
            >
              <div className="image-container" ref={imageRef}>
                <img
                  src={product.gallery[activeImage]}
                  alt={product.name}
                  style={{
                    transform: isZoomed ? `scale(${zoomLevel})` : 'scale(1)',
                    transformOrigin: isZoomed ? `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%` : 'center center'
                  }}
                />
              </div>
              <div className="zoom-controls">
                <button onClick={(e) => { e.stopPropagation(); decreaseZoom(); }} disabled={zoomLevel <= 1}>
                  <FaSearchMinus />
                </button>
                <button onClick={(e) => { e.stopPropagation(); toggleZoom(); }}>
                  {isZoomed ? <FaSearchMinus /> : <FaSearchPlus />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); increaseZoom(); }} disabled={zoomLevel >= 4}>
                  <FaSearchPlus />
                </button>
              </div>
              {!isZoomed && <div className="zoom-hint"><FaSearch /> Click to zoom</div>}
            </div>

            <div className="thumbnail-gallery">
              {product.gallery.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt={`${product.name} - view ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>

            <div className="product-meta">
              <div className="product-rating" onClick={() => setActiveTab('reviews')}>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star ${star <= 4 ? 'filled' : star <= 4.5 ? 'half' : ''}`}
                    />
                  ))}
                </div>
                <span className="rating-count">4.5 (12 reviews)</span>
              </div>

              <div className="product-category">
                Category: <Link to={`/menu?category=${product.category}`}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link>
              </div>
            </div>

            <div className="product-price">
              {formatPrice(convertPrice(product.price + additionalPrice))}
              {additionalPrice > 0 && (
                <span className="base-price">
                  {formatPrice(convertPrice(product.price))}
                </span>
              )}
            </div>

            <div className="product-short-description">
              {product.description}
            </div>

            <ProductCustomization
              product={product}
              onCustomizationChange={handleCustomizationChange}
              initialCustomizations={customizations}
            />

            <div className="product-actions">
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button
                  className="quantity-btn"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <FaShoppingCart /> {isInCart ? 'Update Cart' : 'Add to Cart'}
              </button>

              <button
                className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={toggleWishlist}
              >
                {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>

            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Additional Information
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-pane">
                <div dangerouslySetInnerHTML={{ __html: product.longDescription }}></div>
                <h3>Allergens</h3>
                <p>{product.allergens || 'May contain wheat, dairy, nuts, and spices. Please ask our staff for specific allergen information.'}</p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="tab-pane">
                <h3>Product Specifications</h3>

                <div className="specifications">
                  <div className="spec-group">
                    <h4>Dimensions</h4>
                    <ul>
                      <li><strong>Weight:</strong> {product.dimensions.weight}</li>
                      <li><strong>Size:</strong> {product.dimensions.size}</li>
                    </ul>
                  </div>

                  <div className="spec-group">
                    <h4>Nutritional Information (per serving)</h4>
                    <ul>
                      <li><strong>Calories:</strong> {product.nutritionalInfo.calories} kcal</li>
                      <li><strong>Fat:</strong> {product.nutritionalInfo.fat}g</li>
                      <li><strong>Carbohydrates:</strong> {product.nutritionalInfo.carbs}g</li>
                      <li><strong>Protein:</strong> {product.nutritionalInfo.protein}g</li>
                      <li><strong>Sodium:</strong> {product.nutritionalInfo.sodium}mg</li>
                    </ul>
                  </div>
                </div>

                <h3>Storage Instructions</h3>
                <p>For best quality, consume on the day of purchase. Can be stored in an airtight container at room temperature for up to 2 days. For longer storage, freeze for up to 1 month and thaw at room temperature before serving.</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-pane">
                <ReviewSystem productId={product.id} />
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default ProductDetail;
