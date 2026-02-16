import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import './UserOnboarding.css';

export default function UserOnboarding() {
  const navigate = useNavigate();
  const { updateUserProfile } = useAuthStore();
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    {
      id: 'kids',
      title: 'Kids',
      age: 'Under 15',
      icon: '🧒',
      description: 'Fun, playful workouts for young ones',
      color: '#FF9800',
      features: ['Play-based exercises', 'Fun animations', 'Short attention spans']
    },
    {
      id: 'adult',
      title: 'Adult',
      age: '15 - 55',
      icon: '👨',
      description: 'Full range of fitness programs',
      color: '#4CAF50',
      features: ['Weight loss', 'Muscle gain', 'Full fitness']
    },
    {
      id: 'elderly',
      title: 'Elderly',
      age: '55+',
      icon: '👴',
      description: 'Gentle, low-impact exercises',
      color: '#2196F3',
      features: ['Low impact', 'Joint friendly', 'Balance focus']
    }
  ];

  const handleSubmit = async () => {
    if (!selectedCategory) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateUserProfile({
      category: selectedCategory,
      onboardingCompleted: true,
      joinedAt: new Date().toISOString()
    });
    
    // Redirect to home page
    navigate('/', { 
      state: { 
        welcome: true, 
        category: selectedCategory,
        message: `Welcome to Habesha Fit! We've personalized your experience for ${selectedCategory}`
      }
    });
  };

  return (
    <div className="onboarding-simple">
      {/* Decorative Background */}
      <div className="simple-bg">
        <div className="simple-circle circle-1"></div>
        <div className="simple-circle circle-2"></div>
        <div className="simple-circle circle-3"></div>
      </div>

      {/* Main Content */}
      <div className="simple-container">
        {/* Header */}
        <div className="simple-header">
          <div className="header-icon">👋</div>
          <h1>Welcome to Habesha Fit!</h1>
          <p>Please select your age group to get started</p>
        </div>

        {/* Age Categories */}
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{ '--card-color': category.color }}
              data-category={category.id}
            >
              {selectedCategory === category.id && (
                <div className="selected-badge">
                  <FiCheck />
                </div>
              )}
              
              <div className="category-icon">{category.icon}</div>
              <h2>{category.title}</h2>
              <div className="age-badge">{category.age}</div>
              <p className="category-desc">{category.description}</p>
              
              <div className="feature-list">
                {category.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-dot">•</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <button
          className={`continue-btn ${selectedCategory ? 'active' : ''}`}
          onClick={handleSubmit}
          disabled={!selectedCategory || isSubmitting}
        >
          {isSubmitting ? (
            <span className="simple-spinner"></span>
          ) : (
            <>
              Start My Journey
              <FiArrowRight className="btn-icon" />
            </>
          )}
        </button>

        {/* Quick Message */}
        <p className="simple-footer">
          Don't worry, you can always adjust your preferences later
        </p>
      </div>
    </div>
  );
}