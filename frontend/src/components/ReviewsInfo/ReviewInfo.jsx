// ReviewInfo.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReviewFormModal from "./ReviewFormModal";
import OpenModalButton from '../OpenModalButton';
import ReviewDetails from "./ReviewDetails";

const ReviewInfo = ({ spotDetails, currUser, spotId }) => {
  const { ownerId, avgStarRating, numReviews } = spotDetails;

  // ========= 1. grab only reviews that belong to THIS spot =========
  const reviews = useSelector(state =>
    Object.values(state.reviews).filter(r => r.spotId === spotId)
  );

  const [showNoReviewsMessage, setShowNoReviewsMessage] = useState(false);

  // ========= 2. correct duplicate-review check =========
  const hasUserReviewedThisSpot = reviews.some(
    r => currUser && r.userId === currUser.id
  );

  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  useEffect(() => {
    setShowNoReviewsMessage(sortedReviews.length === 0);
  }, [sortedReviews]);

  const renderRatingText = () => {
    if (!avgStarRating) return "New";
    return `${avgStarRating.toFixed(1)}・${numReviews} ${numReviews === 1 ? 'review' : 'reviews'}`;
  };

  const canPostReview =
    currUser && currUser.id !== ownerId && !hasUserReviewedThisSpot;

  return (
    <div className="review-section">
      <h3 className="rating-display">★ {renderRatingText()}</h3>

      {canPostReview && (
        <div className="review-prompt">
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<ReviewFormModal spotId={spotId} />}
          />
          {showNoReviewsMessage && <p>Be the first to post a review!</p>}
        </div>
      )}

      <div className="reviews-list">
        {sortedReviews.map((r, i) => (
          <ReviewDetails
            key={r.id}
            review={r}
            currentUser={currUser}   // prop name fixed for ReviewDetails
            spotId={spotId}
            className={i % 2 ? "odd-review" : "even-review"}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewInfo;
