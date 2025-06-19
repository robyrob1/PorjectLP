import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./ReviewDetails.css";
import PropTypes from 'prop-types';

const ReviewDetails = ({ review, currentUser, spotId, className }) => {
  if (!review) return null;

  const formatReviewDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", { 
      year: "numeric", 
      month: "long" 
    }).format(date);
  };

  const isReviewOwner = currentUser?.id === review.userId;

  return (
    <div className={`review-details ${className}`}>
      <div className="review-details__header">
        <h4 className="review-details__user-name">
          {review.User?.firstName || currentUser.firstName}
        </h4>
        <p className="review-details__date">
          {formatReviewDate(review.createdAt)}
        </p>
      </div>

      <p className="review-details__content">
        {review.review}
      </p>

      {isReviewOwner && (
        <div className="review-details__actions">
          <OpenModalButton
            buttonText="Delete"
            buttonClassName="review-details__delete-button"
            modalComponent={
              <DeleteReviewModal 
                reviewId={review.id} 
                spotId={spotId} 
              />
            }
          />
        </div>
      )}
    </div>
  );
};

ReviewDetails.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      firstName: PropTypes.string
    }),
    userId: PropTypes.number,
    review: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string
  }),
  spotId: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default ReviewDetails;