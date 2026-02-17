// src/pages/ProgressPage.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import Header from '../components/layout/Header';
import './PageStyles.css';

export default function ProgressPage() {
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
            <FiTrendingUp className="page-icon" />
            <h1>Your Progress</h1>
            <p>Track your fitness journey over time</p>
          </div>

          <div className="coming-soon">
            <div className="coming-soon-content">
              <h2>Coming Soon! 📈</h2>
              <p>We're building a comprehensive progress tracker to help you see your improvements.</p>
              <div className="features-preview">
                <div className="feature-item">
                  <FiCheckCircle /> Workout history and statistics
                </div>
                <div className="feature-item">
                  <FiCheckCircle /> Progress photos and measurements
                </div>
                <div className="feature-item">
                  <FiCheckCircle /> Achievement badges and milestones
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}