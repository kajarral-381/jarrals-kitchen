import { FaStar, FaRegStar } from 'react-icons/fa';
import './ReviewSystem.css';

const ReviewSummary = ({ reviews }) => {
  // Only count approved reviews
  const approvedReviews = reviews.filter(review => review.status === 'approved');
  
  // Calculate average rating
  const totalRating = approvedReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = approvedReviews.length > 0 
    ? (totalRating / approvedReviews.length).toFixed(1) 
    : 0;
  
  // Calculate rating distribution
  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  };
  
  approvedReviews.forEach(review => {
    ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
  });
  
  // Calculate percentages for each rating
  const ratingPercentages = {};
  Object.keys(ratingCounts).forEach(rating => {
    ratingPercentages[rating] = approvedReviews.length > 0 
      ? (ratingCounts[rating] / approvedReviews.length) * 100 
      : 0;
  });
  
  // Count reviews with images
  const reviewsWithImages = approvedReviews.filter(
    review => review.images && review.images.length > 0
  ).length;
  
  // Count verified purchase reviews
  const verifiedPurchaseReviews = approvedReviews.filter(
    review => review.isVerifiedPurchase
  ).length;
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star-icon filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-icon" />);
      }
    }
    
    return stars;
  };
  
  return (
    <div className="review-summary">
      <div className="average-rating">
        <div className="rating-number">{averageRating}</div>
        <div className="rating-stars">
          {renderStars(averageRating)}
          <span className="rating-count">
            {approvedReviews.length} {approvedReviews.length === 1 ? 'review' : 'reviews'}
          </span>
        </div>
      </div>
      
      <div className="rating-breakdown">
        {[5, 4, 3, 2, 1].map(rating => (
          <div key={rating} className="rating-bar">
            <div className="rating-label">{rating} star</div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${ratingPercentages[rating]}%` }}
              ></div>
            </div>
            <div className="rating-percentage">
              {Math.round(ratingPercentages[rating])}%
            </div>
          </div>
        ))}
      </div>
      
      <div className="review-stats">
        <div className="stat-item">
          <div className="stat-label">With Photos</div>
          <div className="stat-value">{reviewsWithImages}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Verified Purchases</div>
          <div className="stat-value">{verifiedPurchaseReviews}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
