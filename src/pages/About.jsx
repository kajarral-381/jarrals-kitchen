import { FaHeart, FaLeaf, FaHandsHelping } from 'react-icons/fa';
import { aboutImage } from '../assets';
import team1 from '../assets/images/about/team-1.jpg';
import team2 from '../assets/images/about/team-2.jpg';
import team3 from '../assets/images/about/team-3.jpg';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>The Legacy of Jarral's Kitchen</h1>
        <p>A tradition of culinary excellence, passion, and cultural heritage</p>
      </div>

      <div className="container">
        <section className="about-story">
          <div className="about-image">
            <img src={aboutImage} alt="Our culinary journey" />
          </div>
          <div className="about-content">
            <h2>Our Cherished Heritage</h2>
            <p>Jarral's Kitchen embodies the rich culinary traditions of Pakistan, founded in 2020 with a vision to create not just a restaurant, but a cultural institution where the art of authentic cooking is celebrated and preserved.</p>
            <p>What began as an intimate establishment has blossomed into a beloved culinary landmark, while our dedication to excellence remains unwavering. Each day before dawn, our master chefs meticulously prepare every element from scratch—from hand-kneading doughs to grinding fresh spices—ensuring an unparalleled dining experience.</p>
            <p>Through the years, we have thoughtfully expanded our repertoire to include a diverse array of culinary treasures, yet we remain steadfastly committed to the time-honored recipes and techniques that have earned us distinction among discerning patrons, including diplomats and distinguished visitors to Pakistan.</p>
          </div>
        </section>

        <section className="about-values">
          <h2>Our Guiding Principles</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h3>Crafted with Devotion</h3>
              <p>We believe that culinary creation is an expression of love and artistry. Each dish we present is crafted with meticulous attention to detail, reflecting our genuine passion for bringing moments of joy and delight to our esteemed guests.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaLeaf />
              </div>
              <h3>Exceptional Ingredients</h3>
              <p>We curate only the finest, premium-quality ingredients, partnering with select local farmers and artisanal suppliers to ensure that every flavor is authentic, vibrant, and of the highest standard—a foundation for culinary excellence.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaHandsHelping />
              </div>
              <h3>Cultural Stewardship</h3>
              <p>We take pride in our role as custodians of Pakistan's rich culinary heritage. Through our creations, we honor traditions while fostering community connections, supporting local initiatives, and creating an elegant sanctuary where memories are crafted.</p>
            </div>
          </div>
        </section>

        <section className="about-team">
          <h2>The Artisans Behind Our Creations</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src={team1} alt="Jane Thompson" />
              <h3>Jane Thompson</h3>
              <p className="team-role">Executive Chef & Culinary Director</p>
              <p>Jane's culinary journey began in her grandmother's kitchen, where she absorbed centuries-old techniques and recipes. Her masterful creations blend traditional methods with innovative approaches, resulting in dishes that evoke nostalgia while delighting modern palates.</p>
            </div>
            <div className="team-member">
              <img src={team2} alt="Michael Thompson" />
              <h3>Michael Thompson</h3>
              <p className="team-role">Master Pastry Artisan</p>
              <p>After refining his craft at the prestigious Culinary Institute, Michael brings unparalleled expertise to our pastry kitchen. His award-winning creations have earned acclaim for their exquisite balance of flavors, textures, and artistic presentation.</p>
            </div>
            <div className="team-member">
              <img src={team3} alt="Emily Chen" />
              <h3>Emily Chen</h3>
              <p className="team-role">Artistic Confectionery Specialist</p>
              <p>Emily's extraordinary talent for transforming simple ingredients into breathtaking visual masterpieces has captivated our patrons since 2015. Her intricate designs and meticulous attention to detail elevate each creation into a work of edible art.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
