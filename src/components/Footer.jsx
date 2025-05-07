import { FaFacebook, FaInstagram, FaYoutube, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = ({ id }) => {
  return (
    <footer id={id} className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Jarral's Kitchen</h3>
          <p>Bringing joy through freshly baked goods since 2020. Our passion is creating delicious treats that make your day sweeter.</p>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><FaMapMarkerAlt /> HITEC Taxila Cantt. Pakistan</p>
          <p>
            <a href="https://wa.me/923125541410" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp">
              <FaWhatsapp /> 03125541410
            </a>
          </p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/jarralskitchen381" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook"><FaFacebook /></a>
            <a href="https://www.instagram.com/jarralskitchen/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram"><FaInstagram /></a>
            <a href="https://www.youtube.com/@jarralskitchen" target="_blank" rel="noopener noreferrer" aria-label="Follow us on YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Jarral's Kitchen. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
