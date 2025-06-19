import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import * as spotActions from '../../store/spots';
import './ManageSpotDeleteModal.css';

const ManageSpotDeleteModal = ({ spotId }) => {
    const dispatchFunction = useDispatch();
    const { closeModalFunction } = useModal();

    const handleDeleteConfirmation = async (event) => {
        event.preventDefault();
        
        try {
            await dispatchFunction(spotActions.deleteSpotThunk(spotId));
            closeModalFunction();
        } catch (error) {
            console.error("Error deleting spot:", error);
        }
    };

    return (
        <div className="delete-spot-modal-container">
            <h1 className="delete-spot-modal-title">
                Confirm Delete
            </h1>
            
            <div className="delete-spot-modal-message">
                Are you sure you want to remove this spot from the listings?
            </div>
            
            <div className="delete-spot-modal-buttons-container">
                <button
                    onClick={handleDeleteConfirmation}
                    className="delete-spot-confirm-button"
                >
                    Yes (Delete Spot)
                </button>
                
                <button
                    onClick={closeModalFunction}
                    className="delete-spot-cancel-button"
                >
                    No (Keep Spot)
                </button>
            </div>
        </div>
    );
};

export default ManageSpotDeleteModal;