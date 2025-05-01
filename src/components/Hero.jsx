import { Link } from 'react-router-dom';
import { heroImage } from '../assets';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <img src={heroImage} alt="Sweet Delights Bakery" />
      <div className="hero-content">
        <h1>Fresh Baked Goodness Every Day</h1>
        <p>Handcrafted with love using only the finest ingredients</p>
        <div className="hero-buttons">
          <Link to="/menu" className="btn btn-primary">View Our Menu</Link>
          <Link to="/contact" className="btn btn-secondary">Order Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
