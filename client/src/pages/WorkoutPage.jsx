import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiClock, FiCalendar, FiTarget, FiAward,
  FiCheckCircle, FiPlay, FiChevronRight, FiArrowLeft,
  FiSearch, FiFilter, FiX, FiInfo, FiAlertCircle
} from 'react-icons/fi';
import { BiDumbbell, BiRun, BiWater, BiTime } from 'react-icons/bi';
import { GiStrong, GiMuscleUp, GiFlexibleStar } from 'react-icons/gi';
import useAuthStore from '../store/authStore';
import Header from '../components/layout/Header';
import { 
  kidsWorkouts,
  teenageWorkouts,
  adultWorkouts,
  elderlyWorkouts,
  fitnessWorkouts,
  weightLossWorkouts,
  getCategoryDisplay
} from '../data/WorkoutTypes';
import './WorkoutPage.css';

export default function WorkoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profileCompleted, logout } = useAuthStore();
  
  const [userCategory, setUserCategory] = useState(user?.category || 'adult');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Get workouts based on user's age category
  const getWorkoutsForCategory = () => {
    switch(userCategory) {
      case 'kids':
        return kidsWorkouts;
      case 'teenage':
        return teenageWorkouts;
      case 'adult':
        return adultWorkouts;
      case 'elderly':
        return elderlyWorkouts;
      case 'fitness':
        return fitnessWorkouts;
      case 'weightloss':
        return weightLossWorkouts;
      default:
        return adultWorkouts;
    }
  };

  const workoutsData = getWorkoutsForCategory();
  const categoryInfo = getCategoryDisplay(userCategory);

  // Get category-specific colors and styles
  const categoryStyles = {
    kids: {
      primary: '#FF9800',
      secondary: '#FF5722',
      bg: '#FFF3E0',
      accent: '#FFB74D',
      text: '#E65100'
    },
    teenage: {
      primary: '#9C27B0',
      secondary: '#7B1FA2',
      bg: '#F3E5F5',
      accent: '#BA68C8',
      text: '#4A148C'
    },
    adult: {
      primary: '#4CAF50',
      secondary: '#2E7D32',
      bg: '#E8F5E9',
      accent: '#81C784',
      text: '#1B5E20'
    },
    elderly: {
      primary: '#2196F3',
      secondary: '#1976D2',
      bg: '#E3F2FD',
      accent: '#64B5F6',
      text: '#0D47A1'
    },
    fitness: {
      primary: '#9C27B0',
      secondary: '#7B1FA2',
      bg: '#F3E5F5',
      accent: '#BA68C8',
      text: '#4A148C'
    },
    weightloss: {
      primary: '#F44336',
      secondary: '#D32F2F',
      bg: '#FFEBEE',
      accent: '#EF5350',
      text: '#B71C1C'
    }
  };

  const currentStyle = categoryStyles[userCategory] || categoryStyles.adult;

  // Flatten all exercises for search
  const allExercises = Object.values(workoutsData).flatMap(section =>
    section.exercises.map(ex => ({
      ...ex,
      sectionName: section.name,
      sectionIcon: section.icon,
      sectionColor: section.color,
      sectionId: section.id
    }))
  );

  // Filter exercises based on search and difficulty
  const filteredExercises = allExercises.filter(ex => {
    const matchesSearch = searchTerm === '' || 
      ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ex.instructions && ex.instructions.some(inst => 
        inst.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    
    const matchesDifficulty = difficultyFilter === 'all' || 
      ex.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    
    return matchesSearch && matchesDifficulty;
  });

  useEffect(() => {
    if (!profileCompleted) {
      navigate('/onboarding');
    }
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('workout-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [profileCompleted, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleFavorite = (exerciseId) => {
    const newFavorites = favorites.includes(exerciseId)
      ? favorites.filter(id => id !== exerciseId)
      : [...favorites, exerciseId];
    
    setFavorites(newFavorites);
    localStorage.setItem('workout-favorites', JSON.stringify(newFavorites));
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner':
      case 'easy':
      case 'fun':
      case 'gentle':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getCategoryMessage = () => {
    switch(userCategory) {
      case 'kids':
        return "🎮 Fun, playful exercises designed just for you!";
      case 'teenage':
        return "⚡ Level up your fitness with these sports-focused workouts!";
      case 'adult':
        return "💪 Build strength and endurance with these adult workouts!";
      case 'elderly':
        return "🌿 Gentle, safe exercises to keep you active and healthy!";
      case 'fitness':
        return "🔥 Push your limits with these advanced fitness workouts!";
      case 'weightloss':
        return "⚖️ Burn calories and reach your goals with these exercises!";
      default:
        return "Ready for your workout?";
    }
  };

  if (!profileCompleted) return null;

  return (
    <div className="app">
      <Header
        user={user}
        category={userCategory}
        menuOpen={menuOpen}
        onMenuToggle={setMenuOpen}
        onLogout={handleLogout}
      />

      <main className={`main ${menuOpen ? 'blur' : ''}`}>
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate('/')}>
          <FiArrowLeft /> Back to Dashboard
        </button>

        {/* Category Banner */}
        <div 
          className="category-banner"
          style={{ 
            background: `linear-gradient(135deg, ${currentStyle.primary} 0%, ${currentStyle.secondary} 100%)` 
          }}
        >
          <div className="banner-content">
            <div className="banner-icon">{categoryInfo.icon}</div>
            <div className="banner-text">
              <h1>{categoryInfo.name} Workouts</h1>
              <p>{getCategoryMessage()}</p>
              {user?.age && (
                <div className="age-indicator">
                  <FiCalendar /> Age: {user.age} years
                </div>
              )}
            </div>
          </div>
          <button className="info-button" onClick={() => setShowInfo(!showInfo)}>
            <FiInfo />
          </button>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <div className="info-panel" style={{ borderLeftColor: currentStyle.primary }}>
            <div className="info-content">
              <h4>About {categoryInfo.name} Workouts</h4>
              <p>These workouts are specifically selected for {categoryInfo.name} users based on age-appropriate exercises and safety considerations.</p>
              <div className="info-stats">
                <div className="info-stat">
                  <span className="stat-label">Total Exercises:</span>
                  <span className="stat-value">{allExercises.length}</span>
                </div>
                <div className="info-stat">
                  <span className="stat-label">Categories:</span>
                  <span className="stat-value">{Object.keys(workoutsData).length}</span>
                </div>
              </div>
            </div>
            <button className="close-info" onClick={() => setShowInfo(false)}>
              <FiX />
            </button>
          </div>
        )}

        {/* Search and Filter */}
        <div className="workout-controls">
          <div className="search-box" style={{ borderColor: currentStyle.primary }}>
            <FiSearch className="search-icon" style={{ color: currentStyle.primary }} />
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                <FiX />
              </button>
            )}
          </div>
          <button 
            className={`filter-toggle ${filterOpen ? 'active' : ''}`}
            onClick={() => setFilterOpen(!filterOpen)}
            style={filterOpen ? { background: currentStyle.primary } : {}}
          >
            <FiFilter /> Filter
          </button>
        </div>

        {/* Filter Options */}
        {filterOpen && (
          <div className="filter-options" style={{ borderColor: currentStyle.primary }}>
            <label>Difficulty Level:</label>
            <select 
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              style={{ borderColor: currentStyle.primary }}
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="gentle">Gentle</option>
              <option value="fun">Fun</option>
              <option value="easy">Easy</option>
            </select>
          </div>
        )}

        {/* Search Results */}
        {searchTerm && (
          <div className="search-results">
            <h3>
              Search Results 
              <span className="result-count">({filteredExercises.length})</span>
            </h3>
            {filteredExercises.length > 0 ? (
              <div className="exercises-grid">
                {filteredExercises.slice(0, 6).map((exercise, index) => (
                  <div 
                    key={index}
                    className="exercise-card"
                    style={{ background: exercise.sectionColor }}
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    <div className="card-header">
                      <span className="exercise-icon">{exercise.image}</span>
                      <span 
                        className="exercise-difficulty"
                        style={{ background: getDifficultyColor(exercise.difficulty) }}
                      >
                        {exercise.difficulty}
                      </span>
                    </div>
                    <h3>{exercise.name}</h3>
                    <div className="exercise-meta">
                      <span><FiClock /> {exercise.duration}</span>
                    </div>
                    <p className="exercise-description">{exercise.description}</p>
                    <button 
                      className="view-exercise-btn"
                      style={{ background: currentStyle.primary }}
                    >
                      View Exercise
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <FiAlertCircle />
                <p>No exercises found matching "{searchTerm}"</p>
                <button onClick={() => setSearchTerm('')}>Clear Search</button>
              </div>
            )}
          </div>
        )}

        {/* Workout Sections - Only show if no search term and no exercise selected */}
        {!searchTerm && !selectedSection && !selectedExercise && (
          <div className="workout-sections">
            {Object.entries(workoutsData).map(([key, section]) => (
              <section key={key} className="workout-section">
                <div className="section-header">
                  <h2>
                    <span className="section-icon">{section.icon}</span>
                    {section.name}
                  </h2>
                  <p className="section-description">{section.description}</p>
                </div>

                <div className="exercises-grid">
                  {section.exercises.slice(0, 3).map((exercise, index) => (
                    <div 
                      key={index}
                      className="exercise-card"
                      style={{ background: section.color }}
                      onClick={() => setSelectedExercise(exercise)}
                    >
                      <div className="card-header">
                        <span className="exercise-icon">{exercise.image}</span>
                        <span 
                          className="exercise-difficulty"
                          style={{ background: getDifficultyColor(exercise.difficulty) }}
                        >
                          {exercise.difficulty}
                        </span>
                      </div>
                      <h3>{exercise.name}</h3>
                      <div className="exercise-meta">
                        <span><FiClock /> {exercise.duration}</span>
                      </div>
                      <p className="exercise-description">{exercise.description}</p>
                      <button 
                        className="view-exercise-btn"
                        style={{ background: currentStyle.primary }}
                      >
                        View Exercise
                      </button>
                    </div>
                  ))}
                </div>

                {section.exercises.length > 3 && (
                  <button 
                    className="view-all-section"
                    onClick={() => setSelectedSection(section)}
                    style={{ color: currentStyle.primary }}
                  >
                    View All {section.exercises.length} {section.name} Exercises 
                    <FiChevronRight />
                  </button>
                )}
              </section>
            ))}
          </div>
        )}

        {/* Selected Section View */}
        {selectedSection && !selectedExercise && (
          <div className="section-detail">
            <button 
              className="back-to-sections"
              onClick={() => setSelectedSection(null)}
            >
              <FiArrowLeft /> Back to All Workouts
            </button>

            <div 
              className="section-detail-header"
              style={{ background: `linear-gradient(135deg, ${currentStyle.primary} 0%, ${currentStyle.secondary} 100%)` }}
            >
              <span className="section-big-icon">{selectedSection.icon}</span>
              <div>
                <h2>{selectedSection.name}</h2>
                <p>{selectedSection.description}</p>
              </div>
            </div>

            <div className="exercises-grid">
              {selectedSection.exercises.map((exercise, index) => (
                <div 
                  key={index}
                  className="exercise-card"
                  style={{ background: selectedSection.color }}
                  onClick={() => setSelectedExercise(exercise)}
                >
                  <div className="card-header">
                    <span className="exercise-icon">{exercise.image}</span>
                    <span 
                      className="exercise-difficulty"
                      style={{ background: getDifficultyColor(exercise.difficulty) }}
                    >
                      {exercise.difficulty}
                    </span>
                  </div>
                  <h3>{exercise.name}</h3>
                  <div className="exercise-meta">
                    <span><FiClock /> {exercise.duration}</span>
                  </div>
                  <p className="exercise-description">{exercise.description}</p>
                  <button 
                    className="view-exercise-btn"
                    style={{ background: currentStyle.primary }}
                  >
                    View Exercise
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Exercise Detail */}
        {selectedExercise && (
          <div className="exercise-detail">
            <button 
              className="back-to-exercises"
              onClick={() => setSelectedExercise(null)}
            >
              <FiArrowLeft /> Back to Exercises
            </button>

            <div 
              className="exercise-header"
              style={{ background: selectedExercise.sectionColor }}
            >
              <div className="exercise-header-content">
                <span className="exercise-big-icon">{selectedExercise.image}</span>
                <div className="exercise-header-info">
                  <h1>{selectedExercise.name}</h1>
                  <div className="exercise-tags">
                    <span 
                      className="difficulty-tag"
                      style={{ background: getDifficultyColor(selectedExercise.difficulty) }}
                    >
                      {selectedExercise.difficulty}
                    </span>
                    <span className="duration-tag">
                      <FiClock /> {selectedExercise.duration}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                className={`favorite-btn ${favorites.includes(selectedExercise.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(selectedExercise.id)}
              >
                {favorites.includes(selectedExercise.id) ? '❤️' : '🤍'}
              </button>
            </div>

            <div className="exercise-content">
              <div className="exercise-description-section">
                <h3>Description</h3>
                <p>{selectedExercise.description}</p>
              </div>

              {selectedExercise.instructions && (
                <div className="exercise-instructions">
                  <h3>Instructions</h3>
                  <ol>
                    {selectedExercise.instructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              {selectedExercise.benefits && (
                <div className="exercise-benefits">
                  <h3>Benefits</h3>
                  <ul>
                    {selectedExercise.benefits.map((benefit, index) => (
                      <li key={index}>
                        <FiCheckCircle className="benefit-icon" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedExercise.tips && (
                <div className="exercise-tips">
                  <h3>Pro Tips</h3>
                  <ul>
                    {selectedExercise.tips.map((tip, index) => (
                      <li key={index}>
                        <span className="tip-bullet">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button 
                className="start-workout-btn"
                style={{ background: currentStyle.primary }}
              >
                <FiPlay /> Start This Workout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}