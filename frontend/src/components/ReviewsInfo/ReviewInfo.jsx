import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReviewFormModal from "./ReviewFormModal";
import OpenModalButton from '../OpenModalButton';
import ReviewDetails from "./ReviewDetails";

const ReviewInfo = ({ spotDetails, currUser, spotId }) => {
  const { ownerId, avgStarRating, numReviews } = spotDetails;
  const reviews = useSelector(state => Object.values(state.reviews));
  const [showNoReviewsMessage, setShowNoReviewsMessage] = useState(false);

  // Filter and sort reviews
  const userReviews = reviews.filter(review => review.userId === currUser?.id);
  const sortedReviews = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    setShowNoReviewsMessage(sortedReviews.length === 0);
  }, [sortedReviews]);

  // Helper function to render rating text
  const renderRatingText = () => {
    if (!avgStarRating) return "New";
    return `${avgStarRating.toFixed(1)}${numReviews ? `・${numReviews} ${numReviews === 1 ? 'review' : 'reviews'}` : ''}`;
  };

  // Check if user can post a review
  const canPostReview = currUser && currUser.id !== ownerId && userReviews.length === 0;

  return (
    <div className="review-section">
      <h3 className="rating-display">
        ★ {renderRatingText()}
      </h3>

      <div className="reviews-container">
        {canPostReview && (
          <div className="review-prompt">
            {showNoReviewsMessage ? (
              <>
                <OpenModalButton
                  buttonText="Post Your Review"
                  modalComponent={<ReviewFormModal spotId={spotId} />}
                />
                <p>Be the first to post a review!</p>
              </>
            ) : (
              <OpenModalButton
                buttonText="Post Your Review!"
                modalComponent={<ReviewFormModal spotId={spotId} />}
              />
            )}
          </div>
        )}

        <div className="reviews-list">
          {sortedReviews.map((review, index) => (
            <ReviewDetails
              key={review.id}
              review={review}
              currUser={currUser}
              spotId={spotId}
              className={index % 2 === 0 ? "even-review" : "odd-review"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewInfo;