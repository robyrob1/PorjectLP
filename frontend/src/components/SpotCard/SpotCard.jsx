import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SpotCard.css';

const SpotCard = ({ spot }) => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const goToSpot = () => navigate(`/spots/${spot.id}`);
  const showName = () => setShowTooltip(true);
  const hideName = () => setShowTooltip(false);

  return (
    <div className="spot-card" onClick={goToSpot}>
      <div 
        className="spot-image-container" 
        onMouseEnter={showName}
        onMouseLeave={hideName}
      >
        <img
          src={spot.previewImage}
          alt={spot.name}
          className="spot-img"
        />
        {showTooltip && <div className="name-tooltip">{spot.name}</div>}
      </div>

      <div className="info">
        <div className="location">
          <span>{spot.city}, {spot.state}</span>
          <span className="rating">
            ★ {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}
          </span>
        </div>
        <div className="price">${spot.price} night</div>
      </div>
    </div>
  );
};

export default SpotCard;