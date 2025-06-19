import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as reviewActions from '../../store/reviews';
import * as spotActions from '../../store/spots';
import './ReviewFormModal.css';

function ReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector(state => state.session.user);
  const spotReviews = useSelector(state => Object.values(state.reviews));
  
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  
  // Check if user already left a review
  const hasReviewed = spotReviews.some(review => review.userId === sessionUser.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {};
    if (review.length < 10) newErrors.review = 'Review must be at least 10 characters';
    if (stars === 0) newErrors.stars = 'Please select a star rating';
    if (hasReviewed) newErrors.review = 'You already reviewed this spot';
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await dispatch(reviewActions.createReviewsThunk(spotId, { review, stars }));
      await dispatch(spotActions.readSpotThunk(spotId));
      closeModal();
    } catch (error) {
      setErrors({ server: 'Failed to submit review. Please try again.' });
    }
  };

  return (
    <div className="review-modal">
      <h1>How was your stay?</h1>
      
      {errors.server && <p className="error">{errors.server}</p>}
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here..."
          className="review-textarea"
        />
        {errors.review && <p className="error">{errors.review}</p>}

        <div className="stars-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star}>
              <input
                type="radio"
                name="rating"
                value={star}
                onChange={() => setStars(star)}
                style={{ display: 'none' }}
              />
              ★
            </label>
          ))}
          <span>Stars</span>
        </div>
        {errors.stars && <p className="error">{errors.stars}</p>}

        <button 
          type="submit" 
          className="submit-button"
          disabled={hasReviewed}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewFormModal;