// ReviewFormModal.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from "../../store/reviews";
import * as spotActions from "../../store/spots";
import "./ReviewFormModal.css";

function ReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const currUser = useSelector(state => state.session.user);
  const spotReviews = useSelector(state =>
    Object.values(state.reviews).filter(r => r.spotId === spotId)
  );

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});

  const hasReviewedAlready = spotReviews.some(
    r => r.userId === currUser?.id
  );

  const validate = () => {
    const e = {};
    if (review.trim().length < 10) e.review = "Review must be at least 10 characters";
    if (!stars) e.stars = "Please select a star rating";
    if (hasReviewedAlready) e.duplicate = "You already reviewed this spot";
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const valErrs = validate();
    if (Object.keys(valErrs).length) return setErrors(valErrs);

    try {
      await dispatch(reviewActions.createReviewsThunk(spotId, { review, stars }));
      await dispatch(spotActions.readSpotThunk(spotId)); // refresh spot avg rating
      closeModal();
    } catch {
      setErrors({ server: "Something went wrong — please try again." });
    }
  };

  const isDisabled = !!Object.keys(validate()).length;

  return (
    <div className="review-modal">
      <h1 className="modal-title">How was your stay?</h1>

      {errors.server && <p className="error-text">{errors.server}</p>}
      {errors.duplicate && <p className="error-text">{errors.duplicate}</p>}

      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          className="review-text"
          placeholder="Leave your review here..."
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        {errors.review && <p className="error-text">{errors.review}</p>}

        <div className="star-container">
          {[1, 2, 3, 4, 5].map(num => (
            <label key={num}>
              <input
                type="radio"
                name="stars"
                value={num}
                onChange={() => setStars(num)}
              />
              <span className={num <= stars ? "star filled" : "star"}>★</span>
            </label>
          ))}
          <span>Stars</span>
        </div>
        {errors.stars && <p className="error-text">{errors.stars}</p>}

        <button type="submit" disabled={isDisabled} className="submit-button">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewFormModal;
