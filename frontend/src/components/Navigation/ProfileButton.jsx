import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../loginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { useNavigate } from 'react-router-dom';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = (event) => {
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleManageSpots = () => {
    navigate('/spots/current');
    setIsMenuOpen(false);
  };

  const menuClassName = `profile-dropdown ${isMenuOpen ? '' : 'profile-dropdown--hidden'}`;

  return (
    <div className="profile-button-container">
      <button 
        onClick={toggleMenu} 
        className="profile-button__toggle"
        aria-expanded={isMenuOpen}
        aria-label="User menu"
      >
        
      </button>

      <ul className={menuClassName} ref={menuRef}>
        {user ? (
          <>
            <li className="profile-dropdown__item profile-dropdown__header">
              <div className="profile-dropdown__greeting">Hello, {user.firstName}</div>
              <div className="profile-dropdown__email">{user.email}</div>
            </li>

            <li className="profile-dropdown__item">
              <button 
                onClick={handleManageSpots}
                className="profile-dropdown__button"
              >
                Manage Spots
              </button>
            </li>

            <li className="profile-dropdown__item">
              <button 
                onClick={handleLogout}
                className="profile-dropdown__button profile-dropdown__button--logout"
              >
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="profile-dropdown__item">
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
                className="profile-dropdown__link"
              />
            </li>
            <li className="profile-dropdown__item">
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
                className="profile-dropdown__link"
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;