import { useState, useEffect } from 'react';
import { FaInstagram, FaHeart, FaComment } from 'react-icons/fa';
import {
  instagram1,
  instagram2,
  instagram3,
  instagram4,
  instagram5,
  instagram6
} from '../assets';
import './SocialFeed.css';

// Mock Instagram posts data
const mockInstagramPosts = [
  {
    id: 'post1',
    image: instagram1,
    caption: 'Our freshly baked sourdough bread is ready! 🍞 #bakery #sourdough #freshbread',
    likes: 124,
    comments: 18,
    date: '2023-06-25'
  },
  {
    id: 'post2',
    image: instagram2,
    caption: 'Start your morning right with our chocolate croissants! ☕🥐 #breakfast #croissant #chocolate',
    likes: 98,
    comments: 12,
    date: '2023-06-23'
  },
  {
    id: 'post3',
    image: instagram3,
    caption: 'Strawberry season means strawberry cheesecake! 🍓 #cheesecake #strawberry #dessert',
    likes: 156,
    comments: 24,
    date: '2023-06-20'
  },
  {
    id: 'post4',
    image: instagram4,
    caption: 'Our baker Michael creating some magic in the kitchen! 👨‍🍳 #baker #behindthescenes #bakingprocess',
    likes: 87,
    comments: 9,
    date: '2023-06-18'
  },
  {
    id: 'post5',
    image: instagram5,
    caption: 'Weekend special: Blueberry muffins! 🫐 #muffins #blueberry #weekend',
    likes: 112,
    comments: 15,
    date: '2023-06-16'
  },
  {
    id: 'post6',
    image: instagram6,
    caption: 'Apple pie fresh out of the oven! 🥧 #applepie #pie #baking',
    likes: 143,
    comments: 21,
    date: '2023-06-14'
  }
];

const SocialFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to fetch Instagram posts
    // For demo, we'll use the mock data

    // Simulate API call delay
    const timer = setTimeout(() => {
      setPosts(mockInstagramPosts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Format number for display (e.g., 1.2k instead of 1200)
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  return (
    <div className="social-feed">
      <div className="social-feed-header">
        <h2>Follow Us on Instagram</h2>
        <p>@sweetdelightsbakery</p>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-link"
        >
          <FaInstagram /> Follow
        </a>
      </div>

      {loading ? (
        <div className="loading">Loading Instagram feed...</div>
      ) : (
        <div className="instagram-grid">
          {posts.map(post => (
            <div key={post.id} className="instagram-post">
              <div className="post-image">
                <img src={post.image} alt={post.caption} />
                <div className="post-overlay">
                  <div className="post-stats">
                    <div className="stat">
                      <FaHeart /> <span>{formatNumber(post.likes)}</span>
                    </div>
                    <div className="stat">
                      <FaComment /> <span>{formatNumber(post.comments)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="post-caption">
                <p>{post.caption}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialFeed;
