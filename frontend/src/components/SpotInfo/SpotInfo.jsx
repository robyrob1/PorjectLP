import "./SpotInfo.css";

const SpotInfo = ({ spotDetails }) => {
  const {
    Owner,
    SpotImages,
    avgStarRating,
    city,
    country,
    description,
    name,
    numReviews,
    price,
    state
  } = spotDetails;

  const handleReserveClick = () => {
    alert('Feature Coming Soon...');
  };

  const formatRatingText = () => {
    if (!avgStarRating) return "New";
    return `${avgStarRating.toFixed(1)}${numReviews ? `・${numReviews} ${numReviews === 1 ? 'review' : 'reviews'}` : ''}`;
  };

  return (
    <div className="spot-page">
      <div className="spot-header">
        <h2 className="spot-name">{name}</h2>
        <p className="location">{city}, {state}, {country}</p>
      </div>

      <div className="image-gallery">
        {SpotImages.sort((a, b) => b.preview - a.preview).map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt={`Spot image ${index + 1}`}
            className={index === 0 ? 'main-image' : 'thumbnail'}
          />
        ))}
      </div>

      <div className="spot-content">
        <div className="spot-details">
          <div className="host-info">
            <h3>Hosted by {Owner.firstName} {Owner.lastName}</h3>
            <p className="description">{description}</p>
          </div>
        </div>

        <div className="booking-card">
          <div className="price-rating">
            <span className="price">${price} night</span>
            <div className="rating">
              ★
              <span>{formatRatingText()}</span>
            </div>
          </div>
          <button 
            className="reserve-btn" 
            onClick={handleReserveClick}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotInfo;
