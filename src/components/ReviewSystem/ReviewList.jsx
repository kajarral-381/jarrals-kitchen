import { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaThumbsUp, FaThumbsDown, FaCheck, FaImage, FaSort, FaFilter } from 'react-icons/fa';
import './ReviewSystem.css';

const ReviewList = ({ reviews, productId }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState(0);
  const [showImagesOnly, setShowImagesOnly] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState([]);
  
  // Only show approved reviews
  const approvedReviews = reviews.filter(review => review.status === 'approved');
  
  // Apply filters
  const filteredReviews = approvedReviews.filter(review => {
    if (filterRating > 0 && review.rating !== filterRating) {
      return false;
    }
    
    if (showImagesOnly && (!review.images || review.images.length === 0)) {
      return false;
    }
    
    if (showVerifiedOnly && !review.isVerifiedPurchase) {
      return false;
    }
    
    return true;
  });
  
  // Apply sorting
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'mostHelpful':
        return (b.likes - b.dislikes) - (a.likes - a.dislikes);
      default:
        return 0;
    }
  });
  
  const toggleExpandReview = (reviewId) => {
    setExpandedReviews(prev => 
      prev.includes(reviewId)
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  const handleFilterRating = (rating) => {
    setFilterRating(prev => prev === rating ? 0 : rating);
  };
  
  const toggleImagesOnly = () => {
    setShowImagesOnly(prev => !prev);
  };
  
  const toggleVerifiedOnly = () => {
    setShowVerifiedOnly(prev => !prev);
  };
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star-icon filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star-icon filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-icon" />);
      }
    }
    
    return stars;
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const isReviewExpanded = (reviewId) => {
    return expandedReviews.includes(reviewId);
  };
  
  return (
    <div className="review-list-container">
      <div className="review-filters">
        <div className="review-sort">
          <label htmlFor="sort-reviews">
            <FaSort /> Sort by:
          </label>
          <select 
            id="sort-reviews" 
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="mostHelpful">Most Helpful</option>
          </select>
        </div>
        
        <div className="review-filter-options">
          <div className="filter-label">
            <FaFilter /> Filter:
          </div>
          
          <div className="star-filters">
            {[5, 4, 3, 2, 1].map(star => (
              <button
                key={star}
                className={`star-filter-btn ${filterRating === star ? 'active' : ''}`}
                onClick={() => handleFilterRating(star)}
              >
                {star} ★
              </button>
            ))}
          </div>
          
          <button
            className={`filter-btn ${showImagesOnly ? 'active' : ''}`}
            onClick={toggleImagesOnly}
          >
            <FaImage /> With Images
          </button>
          
          <button
            className={`filter-btn ${showVerifiedOnly ? 'active' : ''}`}
            onClick={toggleVerifiedOnly}
          >
            <FaCheck /> Verified Purchases
          </button>
        </div>
      </div>
      
      {sortedReviews.length === 0 ? (
        <div className="no-reviews">
          <p>No reviews match your filters. Try adjusting your filter criteria.</p>
        </div>
      ) : (
        <div className="reviews-list">
          {sortedReviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.userAvatar ? (
                      <img src={review.userAvatar} alt={review.userName} />
                    ) : (
                      <div className="avatar-placeholder">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="reviewer-details">
                    <div className="reviewer-name">{review.userName}</div>
                    {review.isVerifiedPurchase && (
                      <div className="verified-badge">
                        <FaCheck /> Verified Purchase
                      </div>
                    )}
                  </div>
                </div>
                <div className="review-date">
                  {formatDate(review.date)}
                </div>
              </div>
              
              <div className="review-rating">
                <div className="stars">{renderStars(review.rating)}</div>
                <h4 className="review-title">{review.title}</h4>
              </div>
              
              <div className={`review-content ${isReviewExpanded(review.id) ? 'expanded' : ''}`}>
                <p>{review.review}</p>
                
                {!isReviewExpanded(review.id) && review.review.length > 200 && (
                  <button 
                    className="read-more"
                    onClick={() => toggleExpandReview(review.id)}
                  >
                    Read More
                  </button>
                )}
                
                {isReviewExpanded(review.id) && (
                  <button 
                    className="read-less"
                    onClick={() => toggleExpandReview(review.id)}
                  >
                    Show Less
                  </button>
                )}
              </div>
              
              {review.images && review.images.length > 0 && (
                <div className="review-images">
                  {review.images.map((image, index) => (
                    <div key={index} className="review-image">
                      <img src={image} alt={`Review image ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="review-actions">
                <div className="review-helpful">
                  <span>Was this review helpful?</span>
                  <button className="helpful-btn">
                    <FaThumbsUp /> Yes ({review.likes})
                  </button>
                  <button className="helpful-btn">
                    <FaThumbsDown /> No ({review.dislikes})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
