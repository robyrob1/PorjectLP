import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ManageSpotDeleteModal from "./ManageSpotDeleteModal";
import './ManageSpotCard.css';

const ManageSpotCard = ({ spot }) => {
    const navigateFunction = useNavigate();
    const [showTooltipState, setShowTooltipState] = useState(false);

    const handleCardClick = () => {
        navigateFunction(`/spots/${spot.id}`);
    };

    const handleUpdateButtonClick = (event) => {
        event.stopPropagation();
        navigateFunction(`/spots/${spot.id}/edit`);
    };

    const handleModalButtonClick = (event) => {
        event.stopPropagation();
    };

    const handleMouseEnter = () => {
        setShowTooltipState(true);
    };

    const handleMouseLeave = () => {
        setShowTooltipState(false);
    };

    return (
        <div
            className="manage-spot-card-container"
            onClick={handleCardClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer' }}
        >
            <div className="manage-spot-image-container">
                <img
                    src={spot.previewImage}
                    alt={`${spot.name} preview`}
                    className="manage-spot-image"
                />
                {showTooltipState && (
                    <div className="manage-spot-tooltip">
                        {spot.name}
                    </div>
                )}
            </div>

            <div className="manage-spot-details-container">
                <div className="manage-spot-location-rating-container">
                    <span className="manage-spot-location-text">
                        {spot.city}, {spot.state}
                    </span>
                    <span className="manage-spot-rating-container">
                        ★
                        <span className="manage-spot-rating-text">
                            {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}
                        </span>
                    </span>
                </div>

                <p className="manage-spot-price-text">
                    ${spot.price.toLocaleString()} / night
                </p>
            </div>

            <div className="manage-spot-buttons-container">
                <button 
                    className="manage-spot-update-button"
                    onClick={handleUpdateButtonClick}
                >
                    Update
                </button>
                
                <div className="manage-spot-delete-button-container">
                    <OpenModalButton
                        buttonText="Delete"
                        onButtonClick={handleModalButtonClick}
                        modalComponent={
                            <ManageSpotDeleteModal 
                                spotId={spot.id} 
                            />
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageSpotCard;