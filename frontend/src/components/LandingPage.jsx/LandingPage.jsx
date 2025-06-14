// frontend/src/components/LandingPage/LandingPage.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import './LandingPage.css';

function LandingPage() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.allSpots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (!spots) return <div>Loading...</div>;

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero">
        <h1>Find your next adventure</h1>
        <p>Discover unique stays and experiences.</p>
      </div>

      {/* Spots Grid */}
      <div className="spots-grid">
        {Object.values(spots).map(spot => (
          <NavLink key={spot.id} to={`/spots/${spot.id}`} className="spot-card">
            <img src={spot.previewImage || 'default-image-url.jpg'} alt={spot.name} />
            <div className="spot-info">
              <h3>{spot.city}, {spot.state}</h3>
              <p>${spot.price} night</p>
              <div className="rating">
                ★ {spot.avgRating || 'New'}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;