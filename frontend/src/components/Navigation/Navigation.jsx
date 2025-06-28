// src/components/Navigation/Navigation.jsx
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '/logo.png';

function Navigation({ isLoaded }) {
  const user = useSelector((state) => state.session.user); // 🔥 live session user

  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <NavLink exact="true" to="/" className="logo-link">
          <img src={logo} alt="QuestStay Logo" className="logo-img" />
          <h1 className="site-title">QuestStay</h1>
        </NavLink>
      </div>

      <div className="nav-right">
        <NavLink to="/spots/new" className="nav-link">
          List a Safe Zone
        </NavLink>
        {/* Pass the user down so ProfileButton knows when you're logged in */}
        <ProfileButton user={user} />
      </div>
    </nav>
  );
}

export default Navigation;
