import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const currentUser = useSelector(state => state.session.user);

  return (
    <nav className="navigation">
      <div className="navigation__logo-container">
        <NavLink 
          to="/" 
          className="navigation__logo-link"
          aria-label="Home"
        >
          <img 
            src="/logo.png" 
            alt="Airbnb logo" 
            className="navigation__logo-img" 
          />
        </NavLink>
      </div>

      <div className="navigation__actions">
        {currentUser && (
          <NavLink 
            to="/spots/new" 
            className="navigation__create-spot-link"
          >
            <button className="navigation__create-spot-btn">
              Create a New Spot
            </button>
          </NavLink>
        )}

        {isLoaded && (
          <div className="navigation__profile">
            <ProfileButton user={currentUser} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;