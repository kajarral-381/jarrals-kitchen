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
          <h2 className="section-title">The Jarral's Kitchen Experience</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <FaCookie />
              </div>
              <h3>Artisanal Quality</h3>
              <p>We meticulously select premium ingredients, sourced from trusted local farmers and suppliers, to create exceptional flavors in every bite.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <FaBirthdayCake />
              </div>
              <h3>Culinary Heritage</h3>
              <p>Our master bakers blend time-honored traditions with innovative techniques to craft delicacies that delight the senses and create lasting memories.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <FaMugHot />
              </div>
              <h3>Elegant Ambiance</h3>
              <p>Immerse yourself in our refined atmosphere where every detail is designed to elevate your dining experience and create moments of joy.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-products">
        <div className="container">
          <h2 className="section-title">Our Signature Creations</h2>
          <p className="section-subtitle">Indulge in our most beloved culinary masterpieces, each one crafted to perfection</p>
          {loading ? (
            <div className="loading-products">Preparing our exquisite selection...</div>
          ) : (
            <div className="products-grid">
              {popularProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="view-all">
            <Link to="/menu" className="btn btn-primary">Explore Our Complete Collection</Link>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">Cherished Moments & Memories</h2>
          <p className="section-subtitle">The experiences of our esteemed patrons who have made us part of their special occasions</p>
          <div className="testimonials-grid">
            <div className="testimonial">
              <p>"Jarral's Kitchen's biryani evokes the cherished memories of my grandmother's kitchen in Lahore. The aromatic rice and perfectly seasoned meat create a symphony of flavors that has become our family's treasured Friday tradition."</p>
              <div className="testimonial-author">- Ayesha Khan, Loyal Patron</div>
            </div>
            <div className="testimonial">
              <p>"The artistry in their Kashmiri Pink Tea is unparalleled. Each morning, I indulge in this exquisite blend that awakens my senses and prepares me for the day ahead. It's a small luxury that has become an essential part of my daily ritual."</p>
              <div className="testimonial-author">- Faisal Ahmed, Tea Connoisseur</div>
            </div>
            <div className="testimonial">
              <p>"For my son's graduation celebration, Jarral's Kitchen transformed an ordinary gathering into an extraordinary event. Their meticulously crafted desserts—especially the velvety gulab jamun and delicate ras malai—left our guests enchanted and created memories we'll cherish forever."</p>
              <div className="testimonial-author">- Saima Malik, Celebration Host</div>
            </div>
          </div>
        </div>
      </section>

      <section className="legacy-section">
        <div className="container">
          <h2 className="section-title">The Classic Culinary Tradition</h2>
          <p className="section-subtitle">A heritage of excellence spanning generations</p>

          <div className="legacy-content">
            <div className="legacy-text">
              <h3>A Culinary Journey Through Time</h3>
              <p>Jarral's Kitchen embodies the rich tapestry of Pakistani culinary arts, with recipes and techniques passed down through generations. Our establishment is more than a restaurant—it's a living museum of gastronomic heritage.</p>

              <p>We believe in preserving the authentic flavors that have delighted discerning palates for centuries while introducing subtle innovations that speak to contemporary tastes.</p>

              <div className="legacy-highlight">
                <span className="legacy-years">Since 2020</span>
                <p>Creating memorable dining experiences and becoming a beloved culinary landmark</p>
              </div>

              <p>Our kitchen is a sanctuary where time-honored traditions meet meticulous craftsmanship, resulting in creations that not only satisfy hunger but nourish the soul and create lasting memories.</p>

              <div className="legacy-signature">
                <p>We invite you to become part of our continuing story.</p>
                <Link to="/about" className="btn btn-secondary">Discover Our Heritage</Link>
              </div>
            </div>

            <div className="legacy-image">
              <div className="legacy-image-frame">
                <img src={aboutImage} alt="Jarral's Kitchen Legacy" />
              </div>
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
          <h2 className="section-title">Visit Our Culinary Haven</h2>
          <p className="section-subtitle">Experience the warmth and elegance of our establishment</p>
          <div className="location-content">
            <div className="location-info">
              <div className="location-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>Our Distinguished Address</h3>
              <p>HITEC Taxila Cantt. Pakistan</p>
              <p className="location-description">
                Our elegant establishment welcomes you to a world of culinary delights in the heart of Taxila.
                Visit us to experience the perfect blend of tradition and innovation in every creation.
              </p>
              <a
                href="https://maps.google.com/?q=33.72892099625079,72.81864076730872"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Navigate to Us
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
