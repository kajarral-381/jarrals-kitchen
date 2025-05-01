import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import SocialFeed from '../components/SocialFeed';
import { Link } from 'react-router-dom';
import { FaCookie, FaBirthdayCake, FaMugHot } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: 'Chocolate Croissant',
      description: 'Buttery, flaky croissant filled with rich chocolate.',
      price: 3.99,
      image: '/src/assets/images/chocolate-croissant.jpg'
    },
    {
      id: 2,
      name: 'Strawberry Cheesecake',
      description: 'Creamy cheesecake topped with fresh strawberry glaze.',
      price: 5.99,
      image: '/src/assets/images/strawberry-cheesecake.jpg'
    },
    {
      id: 3,
      name: 'Sourdough Bread',
      description: 'Artisanal sourdough bread with a perfect crust.',
      price: 6.99,
      image: '/src/assets/images/sourdough-bread.jpg'
    }
  ];

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

      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Treats</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
              <p>"The best croissants I've ever had outside of Paris. Absolutely delightful!"</p>
              <div className="testimonial-author">- Sarah J.</div>
            </div>
            <div className="testimonial">
              <p>"Their sourdough bread is exceptional. I drive across town just to get it fresh every week."</p>
              <div className="testimonial-author">- Michael T.</div>
            </div>
            <div className="testimonial">
              <p>"Sweet Delights made my daughter's birthday cake and it was both beautiful and delicious!"</p>
              <div className="testimonial-author">- Emily R.</div>
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
    </div>
  );
};

export default Home;
