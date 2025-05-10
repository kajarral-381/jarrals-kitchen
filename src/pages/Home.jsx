import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import SocialFeed from '../components/SocialFeed';
import { Link } from 'react-router-dom';
import { FaCookie, FaBirthdayCake, FaMugHot, FaMapMarkerAlt } from 'react-icons/fa';
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
import menuData from '../assets/improved-menu-with-servings.json';
import './Home.css';

const Home = () => {
  const [popularProducts, setPopularProducts] = useState([]);
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
    // Get 3 random products from menu data for popular section
    const randomProducts = [...menuData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((item, index) => ({
        id: index + 1,
        name: item.name,
        description: item.description,
        price: item.price, // Price is already in PKR
        image: getProductImage(item),
        category: item.category.toLowerCase()
      }));

    setPopularProducts(randomProducts);
    setLoading(false);
  }, []);

  return (
    <div className="home">
      <Hero />

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <FaCookie />
              </div>
              <h3>Fresh Ingredients</h3>
              <p>We use only the finest, locally-sourced ingredients in all our baked goods.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <FaBirthdayCake />
              </div>
              <h3>Handcrafted Daily</h3>
              <p>Every item is baked fresh daily by our skilled artisan bakers.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <FaMugHot />
              </div>
              <h3>Cozy Atmosphere</h3>
              <p>Enjoy our treats in our warm, welcoming café environment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-products">
        <div className="container">
          <h2 className="section-title">Popular Treats</h2>
          {loading ? (
            <div className="loading-products">Loading popular products...</div>
          ) : (
            <div className="products-grid">
              {popularProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="view-all">
            <Link to="/menu" className="btn btn-primary">View All Products</Link>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <p>"Their biryani reminds me of my grandmother's recipe from Lahore. The fragrant rice and tender meat are perfectly balanced with spices. It's now our family's Friday tradition!"</p>
              <div className="testimonial-author">- Ayesha Khan</div>
            </div>
            <div className="testimonial">
              <p>"The chai at Jarral's Kitchen is exceptional. I stop by every morning on my way to work. Their Kashmiri Pink Tea is unlike anything else in the area."</p>
              <div className="testimonial-author">- Faisal Ahmed</div>
            </div>
            <div className="testimonial">
              <p>"Jarral's Kitchen made my son's graduation party a huge success with their catering. The guests couldn't stop talking about the gulab jamun and ras malai!"</p>
              <div className="testimonial-author">- Saima Malik</div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

      <section className="instagram-section">
        <div className="container">
          <SocialFeed />
        </div>
      </section>

      <section className="location-section">
        <div className="container">
          <h2 className="section-title">Find Us</h2>
          <div className="location-content">
            <div className="location-info">
              <div className="location-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>Our Location</h3>
              <p>HITEC Taxila Cantt. Pakistan</p>
              <a
                href="https://maps.google.com/?q=33.72892099625079,72.81864076730872"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Get Directions
              </a>
            </div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.5636521264374!2d72.81605231744384!3d33.72892099625079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDQzJzQ0LjEiTiA3MsKwNDknMDcuMSJF!5e0!3m2!1sen!2s!4v1718195000000!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Jarral's Kitchen Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
