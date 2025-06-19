import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteReviewModal.css';
import * as reviewActions from '../../store/reviews';
import * as spotActions from '../../store/spots';

const DeleteReviewModal = ({ reviewId, spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const currentSpotId = useSelector((state) => state.spots.id);

  const handleDeleteReview = async (event) => {
    event.preventDefault();
    
    try {
      await dispatch(reviewActions.deleteReviewsThunk(reviewId, currentSpotId));
      await dispatch(spotActions.readSpotThunk(spotId));
      closeModal();
    } catch (error) {
      console.error('Error deleting review:', error);
      // You could add error state handling here
    }
  };

  return (
    <div className="delete-review-modal">
      <h1 className="delete-review-modal__title">Confirm Delete</h1>
      
      <div className="delete-review-modal__message">
        Are you sure you want to delete this review?
      </div>

      <div className="delete-review-modal__buttons">
        <button
          onClick={handleDeleteReview}
          className="delete-review-modal__button delete-review-modal__button--confirm"
        >
          Yes (Delete Review)
        </button>
        
        <button
          onClick={closeModal}
          className="delete-review-modal__button delete-review-modal__button--cancel"
        >
          No (Keep Review)
        </button>
      </div>
    </div>
  );
};

export default DeleteReviewModal;