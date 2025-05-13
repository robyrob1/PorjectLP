// frontend/src/components/Navigation/Navigation.jsx
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        {isLoaded && (
          <li>
            {sessionUser ? (
              <ProfileButton user={sessionUser} />
            ) : (
              <div className="auth-buttons">
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                  className="login-button"
                />
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                  className="signup-button"
                />
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;