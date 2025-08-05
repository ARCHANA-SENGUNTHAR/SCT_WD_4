import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    updateUser();
    window.addEventListener('storage', updateUser);
    return () => window.removeEventListener('storage', updateUser);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">📋 FocusNest</Link>
      </div>

      <div className="navbar-right">
        {!isLoggedIn() ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/tasks">My Tasks</Link>
            <div
              className="profile-wrapper"
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              <div className="profile-icon">
                <img src="/user-icon.png" alt="profile" />
                <span>{user ? user.name : ''}</span>
              </div>

              {showDropdown && (
                <div className="profile-dropdown">
                  <Link to="/profile">👤 View Profile</Link>
                  <button onClick={handleLogout}>🚪 Logout</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
