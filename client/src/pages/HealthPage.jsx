// src/pages/HealthPage.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiCheckCircle } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import Header from '../components/layout/Header';
import './PageStyles.css';

export default function HealthPage() {
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
            <FiHeart className="page-icon" />
            <h1>Health & Wellness</h1>
            <p>Monitor your overall health metrics</p>
          </div>

          <div className="coming-soon">
            <div className="coming-soon-content">
              <h2>Coming Soon! 💚</h2>
              <p>We're developing a comprehensive health tracking feature.</p>
              <div className="features-preview">
                <div className="feature-item">
                  <FiCheckCircle /> Heart rate monitoring
                </div>
                <div className="feature-item">
                  <FiCheckCircle /> Sleep quality tracking
                </div>
                <div className="feature-item">
                  <FiCheckCircle /> Nutrition and hydration logs
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}