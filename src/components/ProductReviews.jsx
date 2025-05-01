import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaStar, FaStarHalfAlt, FaRegStar, FaUser } from 'react-icons/fa';
import './ProductReviews.css';

// Mock reviews data
const mockReviews = {
  1: [
    {
      id: 1,
      userId: 3,
      userName: 'Jane Smith',
      rating: 5,
      title: 'Absolutely delicious!',
      comment: 'These chocolate croissants are the best I\'ve ever had. Perfectly flaky and the chocolate is high quality.',
      date: '2023-06-15',
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      userId: 4,
      userName: 'Robert Johnson',
      rating: 4,
      title: 'Great taste, but a bit pricey',
      comment: 'The croissants are delicious, but I wish they were a bit larger for the price.',
      date: '2023-05-22',
      helpful: 5,
      verified: true
    },
    {
      id: 3,
      userId: 5,
      userName: 'Emily Davis',
      rating: 5,
      title: 'Perfect breakfast treat',
      comment: 'I get these every weekend as a special treat. They\'re consistently amazing!',
      date: '2023-04-10',
      helpful: 8,
      verified: true
    }
  ],
  2: [
    {
      id: 1,
      userId: 3,
      userName: 'Jane Smith',
      rating: 5,
      title: 'Creamy and delicious',
      comment: 'This cheesecake is absolutely divine! The strawberry topping is made with fresh berries and not too sweet.',
      date: '2023-06-10',
      helpful: 7,
      verified: true
    },
    {
      id: 2,
      userId: 5,
      userName: 'Emily Davis',
      rating: 3,
      title: 'Good but not great',
      comment: 'The cheesecake was a bit too dense for my liking. The strawberry topping was delicious though.',
      date: '2023-05-18',
      helpful: 3,
      verified: true
    }
  ],
  3: [
    {
      id: 1,
      userId: 4,
      userName: 'Robert Johnson',
      rating: 5,
      title: 'Best sourdough in town',
      comment: 'The crust is perfect and the inside is so soft. This is now my go-to bread!',
      date: '2023-06-20',
      helpful: 15,
      verified: true
    },
    {
      id: 2,
      userId: 3,
      userName: 'Jane Smith',
      rating: 4,
      title: 'Great texture and flavor',
      comment: 'This sourdough has a wonderful tang and chewy texture. I just wish it stayed fresh a bit longer.',
      date: '2023-05-30',
      helpful: 6,
      verified: true
    }
  ]
};

const ProductReviews = ({ productId }) => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  const [errors, setErrors] = useState({});
  
  // Fetch reviews for the product
  useEffect(() => {
    // In a real app, this would be an API call
    const productReviews = mockReviews[productId] || [];
    
    // Sort reviews based on selected option
    const sortedReviews = sortReviews(productReviews, sortBy);
    
    setReviews(sortedReviews);
    
    // Calculate average rating
    if (productReviews.length > 0) {
      const total = productReviews.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating(total / productReviews.length);
      
      // Calculate rating counts
      const counts = [0, 0, 0, 0, 0];
      productReviews.forEach(review => {
        counts[review.rating - 1]++;
      });
      setRatingCounts(counts);
    }
  }, [productId, sortBy]);
  
  // Sort reviews based on selected option
  const sortReviews = (reviewsToSort, sortOption) => {
    const sorted = [...reviewsToSort];
    
    switch (sortOption) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'highest':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return sorted.sort((a, b) => a.rating - b.rating);
      case 'helpful':
        return sorted.sort((a, b) => b.helpful - a.helpful);
      default:
        return sorted;
    }
  };
  
  // Handle review form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Validate review form
  const validateForm = () => {
    const newErrors = {};
    
    if (!newReview.title.trim()) {
      newErrors.title = 'Please enter a review title';
    }
    
    if (!newReview.comment.trim()) {
      newErrors.comment = 'Please enter a review comment';
    } else if (newReview.comment.length < 10) {
      newErrors.comment = 'Review comment must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Submit new review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // In a real app, this would be an API call
    const newReviewObj = {
      id: reviews.length + 1,
      userId: currentUser?.id || 0,
      userName: currentUser?.name || 'Anonymous',
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: !!currentUser
    };
    
    // Add new review to the list
    const updatedReviews = [newReviewObj, ...reviews];
    setReviews(updatedReviews);
    
    // Update average rating and counts
    const total = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
    setAverageRating(total / updatedReviews.length);
    
    const counts = [...ratingCounts];
    counts[newReview.rating - 1]++;
    setRatingCounts(counts);
    
    // Reset form
    setNewReview({
      rating: 5,
      title: '',
      comment: ''
    });
    
    // Hide form
    setShowReviewForm(false);
    
    // Show success message
    alert('Thank you for your review!');
  };
  
  // Mark review as helpful
  const markAsHelpful = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
    ));
  };
  
  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half" />);
      } else {
        stars.push(<FaRegStar key={i} className="star empty" />);
      }
    }
    
    return stars;
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="product-reviews">
      <h2>Customer Reviews</h2>
      
      <div className="reviews-summary">
        <div className="average-rating">
          <div className="rating-number">{averageRating.toFixed(1)}</div>
          <div className="rating-stars">{renderStars(averageRating)}</div>
          <div className="rating-count">Based on {reviews.length} reviews</div>
        </div>
        
        <div className="rating-bars">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="rating-bar">
              <div className="rating-label">{rating} star</div>
              <div className="bar-container">
                <div 
                  className="bar-fill" 
                  style={{ 
                    width: reviews.length > 0 
                      ? `${(ratingCounts[rating - 1] / reviews.length) * 100}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
              <div className="rating-percentage">
                {reviews.length > 0 
                  ? `${Math.round((ratingCounts[rating - 1] / reviews.length) * 100)}%` 
                  : '0%'
                }
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="reviews-actions">
        <button 
          className="write-review-btn"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {showReviewForm ? 'Cancel Review' : 'Write a Review'}
        </button>
        
        <div className="sort-reviews">
          <label htmlFor="sort-by">Sort by:</label>
          <select 
            id="sort-by" 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>
      
      {showReviewForm && (
        <div className="review-form-container">
          <h3>Write Your Review</h3>
          <form className="review-form" onSubmit={handleSubmitReview}>
            <div className="form-group">
              <label>Your Rating</label>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map(rating => (
                  <label key={rating} className="rating-label">
                    <input 
                      type="radio" 
                      name="rating" 
                      value={rating} 
                      checked={newReview.rating === rating}
                      onChange={handleInputChange}
                    />
                    <FaStar className={newReview.rating >= rating ? 'star filled' : 'star empty'} />
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="title">Review Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={newReview.title}
                onChange={handleInputChange}
                placeholder="Summarize your experience"
              />
              {errors.title && <div className="error">{errors.title}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="comment">Review</label>
              <textarea 
                id="comment" 
                name="comment" 
                value={newReview.comment}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tell others about your experience with this product"
              ></textarea>
              {errors.comment && <div className="error">{errors.comment}</div>}
            </div>
            
            <button type="submit" className="submit-review-btn">Submit Review</button>
          </form>
        </div>
      )}
      
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <p>There are no reviews yet for this product. Be the first to leave a review!</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    <FaUser />
                  </div>
                  <div>
                    <div className="reviewer-name">{review.userName}</div>
                    {review.verified && <div className="verified-badge">Verified Purchase</div>}
                  </div>
                </div>
                <div className="review-date">{formatDate(review.date)}</div>
              </div>
              
              <div className="review-rating">
                {renderStars(review.rating)}
              </div>
              
              <h4 className="review-title">{review.title}</h4>
              <p className="review-comment">{review.comment}</p>
              
              <div className="review-footer">
                <button 
                  className="helpful-btn"
                  onClick={() => markAsHelpful(review.id)}
                >
                  Was this helpful? ({review.helpful})
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
