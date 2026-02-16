import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiClock, FiCalendar, FiTarget, FiActivity, 
  FiAward, FiTrendingUp, FiHeart, FiLogOut, FiBell,
  FiCheckCircle, FiPlay, FiUser, FiSettings, FiMoon,
  FiChevronRight, FiFilter, FiHome, FiBookOpen, FiMenu, FiX
} from 'react-icons/fi';
import { BiDumbbell, BiRun, BiWater, BiBody, BiGroup } from 'react-icons/bi';
import { GiWeightLiftingUp, GiMeditation, GiArm, GiLeg, GiBackPain, GiChest, GiMuscleUp, GiRunningNinja } from 'react-icons/gi';
import useAuthStore from '../store/authStore';
import { workoutCategories, featuredWorkouts } from '../data/WorkoutTypes';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profileCompleted, logout } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState(user?.category || 'adult');
  const [selectedBodyPart, setSelectedBodyPart] = useState('all');
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [showWelcome, setShowWelcome] = useState(location.state?.welcome || false);
  const [greeting, setGreeting] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Body parts for filtering
  const bodyParts = [
    { id: 'all', name: 'All', icon: '🔥' },
    { id: 'upper', name: 'Upper', icon: '💪' },
    { id: 'chest', name: 'Chest', icon: '🏋️' },
    { id: 'back', name: 'Back', icon: '🔙' },
    { id: 'arms', name: 'Arms', icon: '💪' },
    { id: 'lower', name: 'Lower', icon: '🦵' },
    { id: 'legs', name: 'Legs', icon: '🦵' },
    { id: 'core', name: 'Core', icon: '🎯' },
    { id: 'full', name: 'Full', icon: '🔥' }
  ];

  // Map category to appropriate workout types
  const getWorkoutsForCategory = (category) => {
    // Based on the user's category (kids/adult/elderly), return appropriate exercises
    const allExercises = [];
    
    Object.values(workoutCategories).forEach(cat => {
      cat.exercises.forEach(exercise => {
        // Add logic to filter by category if needed
        // For now, we'll include all exercises
        allExercises.push({
          ...exercise,
          categoryName: cat.name,
          categoryIcon: cat.icon,
          categoryColor: cat.color,
          suitable: [category] // This can be customized based on your logic
        });
      });
    });

    return allExercises;
  };

  // Create a database from workout types
  const workoutsDatabase = {
    kids: getWorkoutsForCategory('kids').slice(0, 4).map((ex, index) => ({
      id: `kids-${index}`,
      name: ex.name,
      duration: ex.duration,
      level: ex.difficulty,
      calories: '40-60',
      equipment: 'None',
      bodyPart: mapExerciseToBodyPart(ex.name),
      exercises: ex.instructions.slice(0, 3),
      image: ex.image,
      color: ex.categoryColor || 'linear-gradient(135deg, #FF9800, #FF5722)',
      suitable: ['kids']
    })),
    
    adult: getWorkoutsForCategory('adult').slice(0, 4).map((ex, index) => ({
      id: `adult-${index}`,
      name: ex.name,
      duration: ex.duration,
      level: ex.difficulty,
      calories: '150-250',
      equipment: 'None/Basic',
      bodyPart: mapExerciseToBodyPart(ex.name),
      exercises: ex.instructions.slice(0, 3),
      image: ex.image,
      color: ex.categoryColor || 'linear-gradient(135deg, #4CAF50, #2E7D32)',
      suitable: ['adult']
    })),
    
    elderly: getWorkoutsForCategory('elderly').slice(0, 4).map((ex, index) => ({
      id: `elderly-${index}`,
      name: ex.name,
      duration: ex.duration,
      level: 'Gentle',
      calories: '50-100',
      equipment: 'Chair/None',
      bodyPart: mapExerciseToBodyPart(ex.name),
      exercises: ex.instructions.slice(0, 3),
      image: ex.image,
      color: ex.categoryColor || 'linear-gradient(135deg, #2196F3, #1976D2)',
      suitable: ['elderly']
    }))
  };

  // Helper function to map exercise names to body parts
  function mapExerciseToBodyPart(exerciseName) {
    const name = exerciseName.toLowerCase();
    if (name.includes('push') || name.includes('chest') || name.includes('arm')) return 'upper';
    if (name.includes('squat') || name.includes('lunge') || name.includes('leg')) return 'legs';
    if (name.includes('plank') || name.includes('sit') || name.includes('crunch')) return 'core';
    if (name.includes('back')) return 'back';
    return 'full';
  }

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    if (!profileCompleted) {
      navigate('/onboarding');
      return;
    }
  }, [profileCompleted, navigate]);

  useEffect(() => {
    let workouts = workoutsDatabase[selectedCategory] || workoutsDatabase.adult;
    if (selectedBodyPart !== 'all') {
      workouts = workouts.filter(w => w.bodyPart === selectedBodyPart);
    }
    setFilteredWorkouts(workouts);
  }, [selectedCategory, selectedBodyPart]);

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  // Close mobile menu when clicking outside or on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
        setShowMobileFilter(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedBodyPart('all');
    setShowMobileFilter(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigateToWorkouts = () => {
    navigate('/workouts');
  };

  if (!profileCompleted) return null;

  const categoryColors = {
    kids: { primary: '#FF9800', secondary: '#FF5722', bg: '#FFF3E0' },
    adult: { primary: '#4CAF50', secondary: '#2E7D32', bg: '#E8F5E9' },
    elderly: { primary: '#2196F3', secondary: '#1976D2', bg: '#E3F2FD' }
  };

  const currentColor = categoryColors[selectedCategory];

  return (
    <div className="home-container">
      {/* Welcome Toast */}
      {showWelcome && (
        <div className="welcome-toast">
          <FiCheckCircle className="toast-icon" />
          <div className="toast-content">
            <h4>Welcome! 🎉</h4>
            <p>Your {selectedCategory} workouts are ready</p>
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div className="menu-overlay" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* Top Bar with Hamburger Menu */}
      <div className="top-bar" style={{ background: currentColor.primary }}>
        <button 
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <div className="top-bar-logo">
          <span className="logo-icon">🌿</span>
          <span className="logo-text">Habesha Fit</span>
        </div>
        <div className="top-bar-right">
          <button className="top-bar-notification">
            <FiBell />
            <span className="notification-dot"></span>
          </button>
          <div className="top-bar-avatar" style={{ background: 'rgba(255,255,255,0.2)' }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
      </div>

      {/* Sidebar - Full Height Navigation */}
      <aside className={`home-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🌿</span>
            <span className="logo-text">Habesha Fit</span>
          </div>
          <button className="sidebar-close" onClick={() => setMobileMenuOpen(false)}>
            <FiX />
          </button>
        </div>

        <div className="sidebar-user" style={{ background: currentColor.bg }}>
          <div className="user-avatar-large" style={{ background: currentColor.primary }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="user-info">
            <h4>{user?.name || 'Fitness Seeker'}</h4>
            <p>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} • Beginner</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {[
            { id: 'dashboard', icon: FiHome, label: 'Dashboard', path: '/' },
            { id: 'workouts', icon: BiDumbbell, label: 'Workouts', path: '/workouts' },
            { id: 'goals', icon: FiTarget, label: 'Goals', path: '/goals' },
            { id: 'progress', icon: FiTrendingUp, label: 'Progress', path: '/progress' },
            { id: 'health', icon: FiHeart, label: 'Health', path: '/health' },
            { id: 'guides', icon: FiBookOpen, label: 'Guides', path: '/guides' },
            { id: 'settings', icon: FiSettings, label: 'Settings', path: '/settings' }
          ].map(item => (
            <a
              key={item.id}
              href="#"
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.id);
                setMobileMenuOpen(false);
                if (item.path === '/workouts') {
                  navigateToWorkouts();
                }
              }}
              style={activeTab === item.id ? { background: currentColor.primary } : {}}
            >
              <item.icon />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`home-main ${mobileMenuOpen ? 'menu-open' : ''}`}>
        {/* Header */}
        <header className="home-header">
          <div className="header-top">
            <div className="greeting-area">
              <h1>{greeting}, {user?.name?.split(' ')[0] || 'Fitness Seeker'}! 👋</h1>
              <p className="welcome-message">
                Ready for your workout?
              </p>
            </div>
          </div>

          {/* Featured Categories */}
          <div className="featured-categories">
            <h3>Exercise Categories</h3>
            <div className="category-chips">
              {Object.values(workoutCategories).slice(0, 4).map(cat => (
                <button
                  key={cat.id}
                  className="category-chip"
                  onClick={navigateToWorkouts}
                  style={{ 
                    background: cat.color,
                    color: 'white'
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button 
            className="mobile-filter-toggle"
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            style={{ background: currentColor.bg, color: currentColor.primary }}
          >
            <FiFilter />
            <span>Filter Workouts</span>
            <FiChevronRight style={{ transform: showMobileFilter ? 'rotate(90deg)' : 'none' }} />
          </button>

          {/* Category Navigation */}
          <div className={`category-nav ${showMobileFilter ? 'show' : ''}`} style={{ background: currentColor.bg }}>
            {['kids', 'adult', 'elderly'].map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
                style={{ 
                  background: selectedCategory === cat ? currentColor.primary : 'transparent',
                  color: selectedCategory === cat ? 'white' : '#666'
                }}
              >
                <span className="category-icon">
                  {cat === 'kids' && '🧒'}
                  {cat === 'adult' && '👨'}
                  {cat === 'elderly' && '👴'}
                </span>
                <span className="category-label">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
              </button>
            ))}
          </div>

          {/* Body Parts Filter */}
          <div className={`body-parts-nav ${showMobileFilter ? 'show' : ''}`}>
            <div className="body-parts-scroll">
              {bodyParts.map(part => (
                <button
                  key={part.id}
                  className={`body-part-btn ${selectedBodyPart === part.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedBodyPart(part.id);
                    setShowMobileFilter(false);
                  }}
                  style={{
                    background: selectedBodyPart === part.id ? currentColor.primary : '#f5f5f5',
                    color: selectedBodyPart === part.id ? 'white' : '#666'
                  }}
                >
                  <span className="part-icon">{part.icon}</span>
                  <span className="part-name">{part.name}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="stats-wrapper">
          <div className="stats-grid">
            <div className="stat-card" style={{ borderLeftColor: currentColor.primary }}>
              <div className="stat-icon-wrapper" style={{ background: `${currentColor.primary}20` }}>
                <FiCalendar style={{ color: currentColor.primary }} />
              </div>
              <div className="stat-info">
                <h3>7</h3>
                <p>Day Streak</p>
              </div>
            </div>
            <div className="stat-card" style={{ borderLeftColor: currentColor.secondary }}>
              <div className="stat-icon-wrapper" style={{ background: `${currentColor.secondary}20` }}>
                <FiClock style={{ color: currentColor.secondary }} />
              </div>
              <div className="stat-info">
                <h3>180</h3>
                <p>Minutes</p>
              </div>
            </div>
            <div className="stat-card" style={{ borderLeftColor: '#FF9800' }}>
              <div className="stat-icon-wrapper" style={{ background: '#FF980020' }}>
                <FiAward style={{ color: '#FF9800' }} />
              </div>
              <div className="stat-info">
                <h3>850</h3>
                <p>Calories</p>
              </div>
            </div>
            <div className="stat-card" style={{ borderLeftColor: '#4CAF50' }}>
              <div className="stat-icon-wrapper" style={{ background: '#4CAF5020' }}>
                <FiTarget style={{ color: '#4CAF50' }} />
              </div>
              <div className="stat-info">
                <h3>5/7</h3>
                <p>Weekly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Workouts Grid */}
        <section className="workouts-section">
          <div className="section-header">
            <h2>
              {selectedBodyPart === 'all' ? 'Recommended for You' : bodyParts.find(p => p.id === selectedBodyPart)?.name}
              <span className="workout-count">({filteredWorkouts.length})</span>
            </h2>
            <button className="view-all-btn" onClick={navigateToWorkouts}>
              View All <FiChevronRight />
            </button>
          </div>
          
          {filteredWorkouts.length > 0 ? (
            <div className="workouts-grid">
              {filteredWorkouts.map(workout => (
                <div key={workout.id} className="workout-card" style={{ background: workout.color }}>
                  <div className="workout-card-header">
                    <span className="workout-emoji">{workout.image}</span>
                    <span className="workout-level">{workout.level}</span>
                  </div>
                  <h3>{workout.name}</h3>
                  <div className="workout-meta">
                    <span><FiClock /> {workout.duration}</span>
                    <span><BiRun /> {workout.calories}</span>
                  </div>
                  <div className="workout-exercises">
                    {workout.exercises.slice(0, 2).map((ex, idx) => (
                      <div key={idx} className="exercise-item">
                        <FiCheckCircle className="exercise-check" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                  <button className="start-workout-btn" onClick={navigateToWorkouts}>
                    <FiPlay /> Start
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-workouts">
              <p>No workouts found for this filter</p>
              <button className="browse-btn" onClick={navigateToWorkouts}>
                Browse All Workouts
              </button>
            </div>
          )}
        </section>

        {/* Browse All Workouts Button */}
        <div className="browse-all-container">
          <button 
            className="browse-all-btn"
            onClick={navigateToWorkouts}
            style={{ background: currentColor.primary }}
          >
            <BiDumbbell /> Browse All Exercises
          </button>
        </div>
      </main>
    </div>
  );
}