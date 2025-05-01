import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogPostBySlug, blogPosts } from '../data/blogData';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Scroll to top when post changes
    window.scrollTo(0, 0);
    
    // Get the post by slug
    const currentPost = getBlogPostBySlug(slug);
    
    if (currentPost) {
      setPost(currentPost);
      
      // Find index of current post
      const currentIndex = blogPosts.findIndex(p => p.id === currentPost.id);
      
      // Set previous and next posts
      if (currentIndex > 0) {
        setPrevPost(blogPosts[currentIndex - 1]);
      } else {
        setPrevPost(null);
      }
      
      if (currentIndex < blogPosts.length - 1) {
        setNextPost(blogPosts[currentIndex + 1]);
      } else {
        setNextPost(null);
      }
    } else {
      // If post not found, redirect to blog page
      navigate('/blog');
    }
    
    setLoading(false);
  }, [slug, navigate]);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!post) {
    return null;
  }
  
  return (
    <div className="blog-post-page">
      <div className="blog-post-header" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${post.image})` }}>
        <div className="container">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span><FaCalendarAlt /> {formatDate(post.date)}</span>
            <span><FaUser /> {post.author}</span>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="blog-post-content">
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <Link key={index} to={`/blog?tag=${tag}`} className="post-tag">
                <FaTag /> {tag}
              </Link>
            ))}
          </div>
          
          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          
          <div className="post-author">
            <div className="author-avatar">
              <FaUser />
            </div>
            <div className="author-info">
              <h3>About {post.author}</h3>
              <p>
                {post.author} is a passionate baker and writer at Sweet Delights Bakery. 
                With years of experience in artisanal baking, they love sharing tips, 
                recipes, and stories about the wonderful world of baked goods.
              </p>
            </div>
          </div>
          
          <div className="post-navigation">
            {prevPost && (
              <Link to={`/blog/${prevPost.slug}`} className="prev-post">
                <FaArrowLeft />
                <div>
                  <span>Previous Post</span>
                  <h4>{prevPost.title}</h4>
                </div>
              </Link>
            )}
            
            {nextPost && (
              <Link to={`/blog/${nextPost.slug}`} className="next-post">
                <div>
                  <span>Next Post</span>
                  <h4>{nextPost.title}</h4>
                </div>
                <FaArrowRight />
              </Link>
            )}
          </div>
        </div>
        
        <div className="related-posts">
          <h2>You Might Also Like</h2>
          <div className="related-posts-grid">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map(relatedPost => (
                <div key={relatedPost.id} className="related-post-card">
                  <div className="related-post-image">
                    <img src={relatedPost.image} alt={relatedPost.title} />
                  </div>
                  <div className="related-post-info">
                    <span className="related-post-date">{formatDate(relatedPost.date)}</span>
                    <h3>{relatedPost.title}</h3>
                    <Link to={`/blog/${relatedPost.slug}`} className="read-more">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
