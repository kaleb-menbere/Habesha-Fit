import { useState, useEffect } from 'react';
import { FiMenu, FiBell, FiUser, FiChevronDown } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import './Header.css'; // This should be Header.css, not UserDetail.css

export default function Header({ toggleSidebar }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { admin, logout } = useAuthStore();

  useEffect(() => {
    // Fetch notifications
    setNotifications([
      { id: 1, text: 'New user registered', time: '5 min ago' },
      { id: 2, text: 'Subscription expired', time: '1 hour ago' },
    ]);
  }, []);

  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <h1 className="page-title">Welcome, {admin?.fullName || 'Admin'}</h1>
      </div>

      <div className="header-right">
        <div className="notifications">
          <button className="notification-btn">
            <FiBell />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>
        </div>

        <div className="user-menu">
          <button 
            className="user-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="user-avatar">
              <FiUser />
            </div>
            <span className="user-name">{admin?.fullName || 'Admin'}</span>
            <FiChevronDown />
          </button>

          {showDropdown && (
            <div className="dropdown-menu">
              <a href="/profile" className="dropdown-item">Profile</a>
              <a href="/settings" className="dropdown-item">Settings</a>
              <div className="dropdown-divider"></div>
              <button onClick={logout} className="dropdown-item logout">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}