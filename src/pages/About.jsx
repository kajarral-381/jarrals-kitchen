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
        <h1>About Sweet Delights Bakery</h1>
        <p>Our story, our passion, our commitment</p>
      </div>

      <div className="container">
        <section className="about-story">
          <div className="about-image">
            <img src={aboutImage} alt="Our bakery story" />
          </div>
          <div className="about-content">
            <h2>Our Story</h2>
            <p>Sweet Delights Bakery was founded in 2010 by Jane and Michael Thompson, a couple with a passion for baking and a dream of creating a warm, welcoming space where people could enjoy freshly baked goods made with love.</p>
            <p>What started as a small corner shop has grown into a beloved local institution, but our commitment to quality and community has never wavered. Every day, we wake up before dawn to prepare our doughs, batters, and fillings from scratch, ensuring that everything we serve is as fresh and delicious as possible.</p>
            <p>Over the years, we've expanded our menu to include a wide variety of breads, pastries, cakes, and more, but we've stayed true to our original recipes and techniques that have made us a neighborhood favorite.</p>
          </div>
        </section>

        <section className="about-values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h3>Made with Love</h3>
              <p>We believe that baking is an act of love. Every item we create is made with care, attention to detail, and a genuine desire to bring joy to our customers.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaLeaf />
              </div>
              <h3>Quality Ingredients</h3>
              <p>We source the finest, freshest ingredients, working with local farmers and suppliers whenever possible to ensure exceptional quality and flavor.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaHandsHelping />
              </div>
              <h3>Community First</h3>
              <p>We're proud to be part of our local community. We support local causes, participate in neighborhood events, and strive to create a welcoming space for everyone.</p>
            </div>
          </div>
        </section>

        <section className="about-team">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src={team1} alt="Jane Thompson" />
              <h3>Jane Thompson</h3>
              <p className="team-role">Co-Founder & Head Baker</p>
              <p>Jane has been baking since she was a child, learning traditional techniques from her grandmother. She specializes in artisanal breads and pastries.</p>
            </div>
            <div className="team-member">
              <img src={team2} alt="Michael Thompson" />
              <h3>Michael Thompson</h3>
              <p className="team-role">Co-Founder & Pastry Chef</p>
              <p>Michael trained at the Culinary Institute before opening Sweet Delights. His cakes and desserts have won multiple local awards.</p>
            </div>
            <div className="team-member">
              <img src={team3} alt="Emily Chen" />
              <h3>Emily Chen</h3>
              <p className="team-role">Cake Decorator</p>
              <p>Emily joined our team in 2015 and has amazed customers with her intricate cake designs and decorating skills.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
