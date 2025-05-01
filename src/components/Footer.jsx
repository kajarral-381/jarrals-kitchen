import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = ({ id }) => {
  return (
    <footer id={id} className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sweet Delights Bakery</h3>
          <p>Bringing joy through freshly baked goods since 2010. Our passion is creating delicious treats that make your day sweeter.</p>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><FaMapMarkerAlt /> 123 Bakery Lane, Sweet City</p>
          <p><FaPhone /> (555) 123-4567</p>
          <p><FaEnvelope /> info@sweetdelightsbakery.com</p>
        </div>

        <div className="footer-section">
          <h3>Opening Hours</h3>
          <p>Monday - Friday: 7:00 AM - 7:00 PM</p>
          <p>Saturday: 8:00 AM - 6:00 PM</p>
          <p>Sunday: 8:00 AM - 3:00 PM</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sweet Delights Bakery. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
