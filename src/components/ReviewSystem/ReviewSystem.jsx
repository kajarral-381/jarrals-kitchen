import { useState, useEffect } from 'react';
import ReviewSummary from './ReviewSummary';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import { useToast } from '../Toast';
import './ReviewSystem.css';

const ReviewSystem = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { showErrorToast } = useToast();
  
  useEffect(() => {
    // In a real app, this would be an API call to fetch reviews for the product
    // For demo purposes, we'll use mock data
    const fetchReviews = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock reviews data
        const mockReviews = [
          {
            id: 'review-1',
            productId,
            userId: 'user-1',
            userName: 'Ahmed Khan',
            userAvatar: null,
            rating: 5,
            title: 'Absolutely Delicious!',
            review: 'I ordered this for my daughter\'s birthday and it was a huge hit! The cake was moist, flavorful, and beautifully decorated. The delivery was prompt and the cake arrived in perfect condition. Will definitely order again for special occasions.',
            images: [
              'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D',
              'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNha2V8ZW58MHx8MHx8fDA%3D'
            ],
            date: '2023-05-10T14:30:00Z',
            isVerifiedPurchase: true,
            status: 'approved',
            likes: 12,
            dislikes: 1,
            replies: []
          },
          {
            id: 'review-2',
            productId,
            userId: 'user-2',
            userName: 'Fatima Ali',
            userAvatar: null,
            rating: 4,
            title: 'Great Taste, Slight Delay',
            review: 'The bread was excellent - crusty on the outside and soft on the inside. The only issue was that delivery was about 30 minutes late. Otherwise, would have been 5 stars!',
            images: [],
            date: '2023-05-05T09:15:00Z',
            isVerifiedPurchase: true,
            status: 'approved',
            likes: 5,
            dislikes: 0,
            replies: []
          },
          {
            id: 'review-3',
            productId,
            userId: 'user-3',
            userName: 'Mohammad Raza',
            userAvatar: null,
            rating: 2,
            title: 'Disappointing Quality',
            review: 'I was really looking forward to trying these pastries, but they arrived stale and didn\'t taste fresh at all. The packaging was also damaged. I\'ve had better experiences with other bakeries.',
            images: [
              'https://images.unsplash.com/photo-1586985290301-8db40143d525?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzdHJ5fGVufDB8fDB8fHww'
            ],
            date: '2023-04-28T16:45:00Z',
            isVerifiedPurchase: false,
            status: 'approved',
            likes: 3,
            dislikes: 7,
            replies: []
          },
          {
            id: 'review-4',
            productId,
            userId: 'user-4',
            userName: 'Ayesha Malik',
            userAvatar: null,
            rating: 5,
            title: 'Perfect for My Wedding!',
            review: 'We ordered several dozen cookies for our wedding favors and they were absolutely perfect! The guests loved them and many asked where we got them. The customization options were exactly what we wanted and the quality was outstanding. Highly recommend for any special event!',
            images: [
              'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvb2tpZXN8ZW58MHx8MHx8fDA%3D',
              'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29va2llc3xlbnwwfHwwfHx8MA%3D%3D',
              'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvb2tpZXN8ZW58MHx8MHx8fDA%3D'
            ],
            date: '2023-04-15T11:20:00Z',
            isVerifiedPurchase: true,
            status: 'approved',
            likes: 24,
            dislikes: 0,
            replies: []
          },
          {
            id: 'review-5',
            productId,
            userId: 'user-5',
            userName: 'Zain Ahmed',
            userAvatar: null,
            rating: 3,
            title: 'Average Experience',
            review: 'The product was okay, nothing special. Delivery was on time and the packaging was good, but the taste was just average. I might try something else next time.',
            images: [],
            date: '2023-04-10T13:50:00Z',
            isVerifiedPurchase: true,
            status: 'approved',
            likes: 2,
            dislikes: 1,
            replies: []
          },
          {
            id: 'review-6',
            productId,
            userId: 'user-6',
            userName: 'Sara Khan',
            userAvatar: null,
            rating: 5,
            title: 'Best Bread in Town!',
            review: 'I\'ve tried many bakeries in the city, and this is by far the best sourdough bread I\'ve had. The texture is perfect and the flavor is amazing. I\'ve been ordering weekly for the past month and the quality is consistently excellent.',
            images: [],
            date: '2023-04-05T10:10:00Z',
            isVerifiedPurchase: true,
            status: 'approved',
            likes: 15,
            dislikes: 0,
            replies: []
          },
          {
            id: 'review-7',
            productId,
            userId: 'user-7',
            userName: 'Imran Hussain',
            userAvatar: null,
            rating: 4,
            title: 'Good Value for Money',
            review: 'The quality is good for the price. I ordered a variety of pastries and most of them were delicious. A couple were a bit dry, but overall I was satisfied with my purchase.',
            images: [],
            date: '2023-03-28T09:30:00Z',
            isVerifiedPurchase: false,
            status: 'approved',
            likes: 4,
            dislikes: 1,
            replies: []
          }
        ];
        
        setReviews(mockReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        showErrorToast('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [productId, showErrorToast]);
  
  const handleReviewSubmit = (newReview) => {
    // In a real app, this would be an API call to submit the review
    // For demo purposes, we'll just add it to our local state
    setReviews(prev => [newReview, ...prev]);
    setShowReviewForm(false);
  };
  
  const toggleReviewForm = () => {
    setShowReviewForm(prev => !prev);
  };
  
  if (loading) {
    return (
      <div className="review-system-loading">
        <div className="spinner"></div>
        <p>Loading reviews...</p>
      </div>
    );
  }
  
  return (
    <div className="review-system">
      <h2 className="review-system-title">Customer Reviews</h2>
      
      <div className="review-system-content">
        <div className="review-summary-section">
          <ReviewSummary reviews={reviews} />
          
          <button 
            className="write-review-button"
            onClick={toggleReviewForm}
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>
        
        {showReviewForm && (
          <div className="review-form-section">
            <ReviewForm 
              productId={productId} 
              onReviewSubmit={handleReviewSubmit} 
            />
          </div>
        )}
        
        <div className="review-list-section">
          <ReviewList reviews={reviews} productId={productId} />
        </div>
      </div>
    </div>
  );
};

export default ReviewSystem;
