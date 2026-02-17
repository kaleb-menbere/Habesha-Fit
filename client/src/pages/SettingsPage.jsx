// src/pages/SettingsPage.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSettings, FiUser, FiBell, FiLock, FiMoon } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import Header from '../components/layout/Header';
import './PageStyles.css';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, profileCompleted, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!profileCompleted) {
      navigate('/onboarding');
    }
  }, [profileCompleted, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!profileCompleted) return null;

  return (
    <div className="app">
      <Header
        user={user}
        category={user?.category}
        menuOpen={menuOpen}
        onMenuToggle={setMenuOpen}
        onLogout={handleLogout}
      />

      <main className={`main ${menuOpen ? 'blur' : ''}`}>
        <button className="back-button" onClick={() => navigate('/')}>
          <FiArrowLeft /> Back to Dashboard
        </button>

        <div className="page-container">
          <div className="page-header">
            <FiSettings className="page-icon" />
            <h1>Settings</h1>
            <p>Manage your account preferences</p>
          </div>

          <div className="settings-preview">
            <div className="settings-section">
              <h3><FiUser /> Profile Settings</h3>
              <div className="setting-item">
                <span>Name</span>
                <span>{user?.firstName} {user?.lastName}</span>
              </div>
              <div className="setting-item">
                <span>Age</span>
                <span>{user?.age} years</span>
              </div>
              <div className="setting-item">
                <span>Category</span>
                <span className="category-tag">{user?.category}</span>
              </div>
            </div>

            <div className="settings-section">
              <h3><FiBell /> Notifications</h3>
              <div className="setting-item">
                <span>Workout reminders</span>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <span>Progress updates</span>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="settings-section">
              <h3><FiMoon /> Appearance</h3>
              <div className="setting-item">
                <span>Dark mode</span>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="settings-section">
              <h3><FiLock /> Privacy</h3>
              <div className="setting-item">
                <span>Data sharing</span>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}