// SpotInfo.jsx
import "./SpotInfo.css";
import ReviewInfo from "../ReviewsInfo/ReviewInfo";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
    state,
    // Reviews = []
  } = spotDetails;

  const { spotId } = useParams();
  const currentUser = useSelector((state) => state.session.user);

  const handleReserveClick = () => {
    alert("Feature Coming Soon...");
  };

  const formatRatingText = () => {
    if (!avgStarRating) return "New";
    return `${avgStarRating.toFixed(1)}${numReviews ? `・${numReviews} ${numReviews === 1 ? "review" : "reviews"}` : ""}`;
  };

  const sortedImages = SpotImages.sort((a, b) => b.preview - a.preview);
  const mainImage = sortedImages[0];
  const otherImages = sortedImages.slice(1, 5); 

  // ——— Logic for showing "Post Your Review" ———
  // const userIsLoggedIn = !!currentUser;
  // const isOwner = currentUser?.id === Owner?.id;
  // const userHasReviewed = Reviews.some((rev) => rev.userId === currentUser?.id);
  // const canPostReview = userIsLoggedIn && !isOwner && !userHasReviewed;

  return (
    <div className="page">
      <div className="spot-header">
        <h2 className="spot-title">{name}</h2>
        <p className="spot-location">{city}, {state}, {country}</p>
      </div>

      <div className="image-gallery">
        <img
          src={mainImage?.url}
          alt="Main Spot"
          className="gallery-thumb gallery-main"
        />
        {otherImages.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt={`Spot image ${index + 2}`}
            className="gallery-thumb"
          />
        ))}
      </div>

      <div className="details-section">
        <div className="spot-description">
          <h3>Hosted by {Owner.firstName} {Owner.lastName}</h3>
          <p>{description}</p>

          
        </div>

        <div className="booking-card">
          <div className="price-rating">
            <span className="price">${price} night</span>
            <div className="rating">
              ★ <span>{formatRatingText()}</span>
            </div>
          </div>
          <button className="book-button" onClick={handleReserveClick}>
            Reserve
          </button>
        </div>
      </div>

      {/* Inject Review section here */}
      <ReviewInfo
        spotDetails={spotDetails}
        currUser={currentUser}
        spotId={Number(spotId)}
      />
    </div>
  );
};

export default SpotInfo;
