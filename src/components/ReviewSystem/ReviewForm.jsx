import { useState, useRef } from 'react';
import { FaStar, FaCamera, FaTimes, FaCheck, FaUser, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../Toast';
import { Link } from 'react-router-dom';
import './ReviewSystem.css';

const ReviewForm = ({ productId, onReviewSubmit, onCancel }) => {
  const { currentUser } = useAuth();
  const { showSuccessToast, showErrorToast } = useToast();
  const fileInputRef = useRef(null);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
    // Clear rating error if it exists
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const handleRatingHover = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    // Clear title error if it exists
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: '' }));
    }
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
    // Clear review error if it exists
    if (errors.review) {
      setErrors(prev => ({ ...prev, review: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Limit to 3 images
    if (images.length + files.length > 3) {
      showErrorToast('You can upload a maximum of 3 images');
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB max

      if (!isValidType) {
        showErrorToast(`${file.name} is not a valid image type. Please use JPEG or PNG.`);
      }

      if (!isValidSize) {
        showErrorToast(`${file.name} is too large. Maximum size is 5MB.`);
      }

      return isValidType && isValidSize;
    });

    if (validFiles.length === 0) return;

    // Create preview URLs for valid files
    const newImagePreviewUrls = validFiles.map(file => URL.createObjectURL(file));

    setImages(prev => [...prev, ...validFiles]);
    setImagePreviewUrls(prev => [...prev, ...newImagePreviewUrls]);

    // Clear image error if it exists
    if (errors.images) {
      setErrors(prev => ({ ...prev, images: '' }));
    }
  };

  const removeImage = (index) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index]);

    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!title.trim()) {
      newErrors.title = 'Please enter a review title';
    }

    if (!review.trim()) {
      newErrors.review = 'Please enter your review';
    } else if (review.trim().length < 10) {
      newErrors.review = 'Review must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      showErrorToast('Please log in to submit a review');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // In a real app, you would upload the images to a server
    // and get back URLs to store with the review
    // For this demo, we'll simulate the process

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newReview = {
        id: `review-${Date.now()}`,
        productId,
        userId: currentUser.id,
        userName: currentUser.name || 'Anonymous',
        userAvatar: currentUser.avatar || null,
        rating,
        title,
        review,
        images: imagePreviewUrls,
        date: new Date().toISOString(),
        isVerifiedPurchase: Math.random() > 0.3, // Randomly assign verified status for demo
        status: 'pending', // Initial status is pending for moderation
        likes: 0,
        dislikes: 0,
        replies: []
      };

      onReviewSubmit(newReview);

      // Reset form
      setRating(0);
      setTitle('');
      setReview('');
      setImages([]);
      setImagePreviewUrls([]);

      showSuccessToast('Your review has been submitted and is pending approval');
    } catch (error) {
      showErrorToast('Failed to submit review. Please try again.');
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form-container">
      <h3>Write a Review</h3>

      {!currentUser ? (
        <div className="login-prompt">
          <div className="login-prompt-icon">
            <FaUser />
          </div>
          <h4>Please log in to write a review</h4>
          <p>Your review helps other customers make better decisions. Please log in to share your experience.</p>
          <div className="login-prompt-buttons">
            <Link to="/login" className="login-button">
              <FaSignInAlt /> Log In
            </Link>
            <Link to="/register" className="register-button">
              Create Account
            </Link>
          </div>
        </div>
      ) : (
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Rating</label>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${(hoverRating || rating) >= star ? 'active' : ''}`}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => handleRatingHover(star)}
                  onMouseLeave={handleRatingLeave}
                >
                  <FaStar />
                </span>
              ))}
            </div>
            {errors.rating && <div className="error-message">{errors.rating}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="review-title">Review Title</label>
            <input
              type="text"
              id="review-title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Summarize your experience"
              maxLength="100"
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="review-content">Your Review</label>
            <textarea
              id="review-content"
              value={review}
              onChange={handleReviewChange}
              placeholder="What did you like or dislike? How was the quality?"
              rows="5"
              maxLength="1000"
            ></textarea>
            <div className="character-count">
              {review.length}/1000 characters
            </div>
            {errors.review && <div className="error-message">{errors.review}</div>}
          </div>

          <div className="form-group">
            <label>Add Photos (Optional)</label>
            <div className="image-upload-container">
              <button
                type="button"
                className="image-upload-button"
                onClick={() => fileInputRef.current.click()}
              >
                <FaCamera /> Add Photos
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/jpeg, image/png"
                multiple
                style={{ display: 'none' }}
              />
              <span className="image-limit-text">
                Up to 3 images (5MB each, JPEG or PNG)
              </span>
            </div>

            {imagePreviewUrls.length > 0 && (
              <div className="image-previews">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="image-preview">
                    <img src={url} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => removeImage(index)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="review-guidelines">
            <h4>Review Guidelines</h4>
            <ul>
              <li>Your review should focus on the product and your experience with it</li>
              <li>Reviews are moderated and will be published within 48 hours if approved</li>
              <li>Inappropriate or offensive content will not be published</li>
            </ul>
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="cancel-review-button"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-review-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
              {isSubmitting && <span className="spinner"></span>}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
