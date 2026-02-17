// src/pages/GuidesPage.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBookOpen, FiCheckCircle } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import Header from '../components/layout/Header';
import './PageStyles.css';

export default function GuidesPage() {
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
            <FiBookOpen className="page-icon" />
            <h1>Fitness Guides</h1>
            <p>Learn proper form and techniques</p>
          </div>

          <div className="coming-soon">
            <div className="coming-soon-content">
              <h2>Coming Soon! 📚</h2>
              <p>We're creating comprehensive guides to help you master your workouts.</p>
              <div className="features-preview">
                <div className="feature-item">
                  <FiCheckCircle /> Video tutorials for each exercise
                </div>
                <div className="feature-item">
                  <FiCheckCircle /> Form correction tips
                </div>
                <div className="feature-item">
                  <FiCheckCircle /> Nutrition and recovery guides
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}