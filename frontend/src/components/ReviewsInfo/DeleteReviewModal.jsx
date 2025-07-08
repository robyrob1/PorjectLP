// DeleteReviewModal.jsx
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from "../../store/reviews";
import * as spotActions from "../../store/spots";
import "./DeleteReviewModal.css";

function DeleteReviewModal({ reviewId, spotId }) {
  const dispatch   = useDispatch();
  const { closeModal } = useModal();

  // ————————— handlers —————————
  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      // delete review ➜ update spot data ➜ close modal
      await dispatch(reviewActions.deleteReviewsThunk(reviewId));
      await dispatch(spotActions.readSpotThunk(spotId));
      closeModal();
    } catch (err) {
      console.error("Failed to delete review:", err);
      // (optional) surface an error toast / state here
    }
  };

  // ————————— UI —————————
  return (
    <div className="delete-review-modal">
      <h1 className="delete-review-modal__title">Confirm Delete</h1>

      <p className="delete-review-modal__message">
        Are you sure you want to delete this review?
      </p>

      <button
        className="delete-review-modal__btn delete-review-modal__btn--confirm"
        onClick={handleConfirm}
      >
        Yes (Delete Review)
      </button>

      <button
        className="delete-review-modal__btn delete-review-modal__btn--cancel"
        onClick={closeModal}
      >
        No (Keep Review)
      </button>
    </div>
  );
}

export default DeleteReviewModal;
