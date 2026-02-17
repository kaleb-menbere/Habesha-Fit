// src/pages/GoalsPage.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTarget, FiCheckCircle, FiClock } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import Header from '../components/layout/Header';
import './PageStyles.css';

export default function GoalsPage() {
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
            <FiTarget className="page-icon" />
            <h1>Your Fitness Goals</h1>
            <p>Track and manage your fitness objectives</p>
          </div>

          <div className="coming-soon">
            <div className="coming-soon-content">
              <h2>Coming Soon! 🎯</h2>
              <p>We're working on an exciting goals feature to help you track your fitness journey.</p>
              <div className="features-preview">
                <div className="feature-item">
                  <FiCheckCircle /> Set personalized fitness goals
                </div>
                <div className="feature-item">
                  <FiCheckCircle /> Track your progress over time
                </div>
                <div className="feature-item">
                  <FiCheckCircle /> Get milestone notifications
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}