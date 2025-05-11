import { Link } from 'react-router-dom';
import { heroImage } from '../assets';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <img src={heroImage} alt="Jarral's Kitchen" />
      <div className="hero-content">
        <h1>A Tradition of Culinary Excellence</h1>
        <p>Exquisite flavors crafted with passion, bringing joy to every moment</p>
        <div className="hero-buttons">
          <Link to="/menu" className="btn btn-primary">Explore Our Creations</Link>
          <Link to="/contact" className="btn btn-secondary">Order Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
