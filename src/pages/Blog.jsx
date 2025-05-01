import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, getAllCategories, getAllTags } from '../data/blogData';
import { FaSearch, FaTag, FaFolder } from 'react-icons/fa';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState(blogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState('');
  
  const categories = ['All', ...getAllCategories()];
  const tags = getAllTags();
  
  // Filter posts based on search, category, and tag
  useEffect(() => {
    let filteredPosts = [...blogPosts];
    
    // Filter by search term
    if (searchTerm) {
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== 'All') {
      filteredPosts = filteredPosts.filter(post => post.category === activeCategory);
    }
    
    // Filter by tag
    if (activeTag) {
      filteredPosts = filteredPosts.filter(post => post.tags.includes(activeTag));
    }
    
    setPosts(filteredPosts);
  }, [searchTerm, activeCategory, activeTag]);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveTag(''); // Reset tag filter when changing category
  };
  
  const handleTagClick = (tag) => {
    setActiveTag(tag === activeTag ? '' : tag);
    setActiveCategory('All'); // Reset category filter when changing tag
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Our Baking Blog</h1>
        <p>Tips, recipes, and stories from our bakery</p>
      </div>
      
      <div className="container">
        <div className="blog-content">
          <div className="blog-sidebar">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="sidebar-section">
              <h3><FaFolder /> Categories</h3>
              <ul className="category-list">
                {categories.map((category, index) => (
                  <li 
                    key={index} 
                    className={activeCategory === category ? 'active' : ''}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="sidebar-section">
              <h3><FaTag /> Popular Tags</h3>
              <div className="tag-cloud">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className={`tag ${activeTag === tag ? 'active' : ''}`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="sidebar-section">
              <h3>Recent Posts</h3>
              <ul className="recent-posts">
                {blogPosts.slice(0, 3).map(post => (
                  <li key={post.id}>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    <span className="post-date">{formatDate(post.date)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="blog-main">
            {posts.length === 0 ? (
              <div className="no-posts">
                <h2>No posts found</h2>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="blog-grid">
                {posts.map(post => (
                  <div key={post.id} className="blog-card">
                    <div className="blog-image">
                      <img src={post.image} alt={post.title} />
                    </div>
                    <div className="blog-info">
                      <span className="blog-category">{post.category}</span>
                      <span className="blog-date">{formatDate(post.date)}</span>
                    </div>
                    <h2 className="blog-title">{post.title}</h2>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <div className="blog-footer">
                      <Link to={`/blog/${post.slug}`} className="read-more">
                        Read More
                      </Link>
                      <div className="blog-tags">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <span 
                            key={index} 
                            className="blog-tag"
                            onClick={(e) => {
                              e.preventDefault();
                              handleTagClick(tag);
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
