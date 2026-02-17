import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiClock, FiCheckCircle, FiPlay,
  FiTarget, FiUser
} from 'react-icons/fi';
import { BiRun } from 'react-icons/bi';
import useAuthStore from '../store/authStore';
import Header from '../components/layout/Header';
import { getTodaysWorkout } from '../data/DailyWorkouts';
import './DailyWorkoutPage.css';

export default function DailyWorkoutPage() {
  const navigate = useNavigate();
  const { user, profileCompleted, logout } = useAuthStore();
  
  const [userCat, setUserCat] = useState(user?.category || 'adult');
  const [menuOpen, setMenuOpen] = useState(false);
  const [todaysWorkout, setTodaysWorkout] = useState(null);
  const [currentSection, setCurrentSection] = useState('warmup');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);

  useEffect(() => {
    if (!profileCompleted) {
      navigate('/onboarding');
    }
  }, [profileCompleted, navigate]);

  useEffect(() => {
    if (user?.category) {
      setUserCat(user.category);
    }
  }, [user]);

  useEffect(() => {
    const workout = getTodaysWorkout(userCat);
    setTodaysWorkout(workout);
  }, [userCat]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleStartWorkout = () => {
    setIsStarted(true);
    setCurrentSection('warmup');
    setCurrentExercise(0);
    setCompletedExercises([]);
  };

  const handleNextExercise = () => {
    if (!todaysWorkout) return;

    if (currentSection === 'warmup') {
      if (currentExercise < todaysWorkout.warmup.length - 1) {
        setCurrentExercise(currentExercise + 1);
      } else {
        setCurrentSection('exercises');
        setCurrentExercise(0);
      }
    } else if (currentSection === 'exercises') {
      if (currentExercise < todaysWorkout.exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
      } else {
        setCurrentSection('cooldown');
        setCurrentExercise(0);
      }
    } else if (currentSection === 'cooldown') {
      if (currentExercise < todaysWorkout.cooldown.length - 1) {
        setCurrentExercise(currentExercise + 1);
      } else {
        // Workout complete
        setIsStarted(false);
        setCurrentSection('warmup');
        setCurrentExercise(0);
        alert('🎉 Great job! You completed today\'s workout!');
      }
    }
  };

  const handleCompleteExercise = () => {
    if (!todaysWorkout) return;

    const exerciseId = `${currentSection}-${currentExercise}`;
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId]);
    }
    handleNextExercise();
  };

  const getCurrentExerciseDisplay = () => {
    if (!todaysWorkout) return null;

    if (currentSection === 'warmup') {
      return {
        type: 'Warm Up',
        name: todaysWorkout.warmup[currentExercise],
        icon: '🔥',
        duration: '30 sec'
      };
    } else if (currentSection === 'exercises') {
      const ex = todaysWorkout.exercises[currentExercise];
      return {
        type: 'Exercise',
        name: ex.name,
        reps: ex.reps,
        icon: ex.icon,
        muscles: ex.muscles,
        duration: '45 sec'
      };
    } else {
      return {
        type: 'Cool Down',
        name: todaysWorkout.cooldown[currentExercise],
        icon: '🧘',
        duration: '30 sec'
      };
    }
  };

  const getProgress = () => {
    if (!todaysWorkout) return 0;
    const total = (todaysWorkout.warmup?.length || 0) + 
                  (todaysWorkout.exercises?.length || 0) + 
                  (todaysWorkout.cooldown?.length || 0);
    const completed = completedExercises.length;
    return (completed / total) * 100;
  };

  if (!profileCompleted || !todaysWorkout) return null;

  const currentEx = getCurrentExerciseDisplay();
  const categoryColors = {
    kids: { primary: '#FF9800', secondary: '#FF5722' },
    teenage: { primary: '#9C27B0', secondary: '#7B1FA2' },
    adult: { primary: '#4CAF50', secondary: '#2E7D32' },
    elderly: { primary: '#2196F3', secondary: '#1976D2' },
    fitness: { primary: '#9C27B0', secondary: '#7B1FA2' },
    weightloss: { primary: '#F44336', secondary: '#D32F2F' }
  };
  const colors = categoryColors[userCat] || categoryColors.adult;

  return (
    <div className="app">
      <Header
        user={user}
        category={userCat}
        menuOpen={menuOpen}
        onMenuToggle={setMenuOpen}
        onLogout={handleLogout}
      />

      <main className={`main ${menuOpen ? 'blur' : ''}`}>
        <button className="back-btn" onClick={() => navigate('/')}>
          <FiArrowLeft /> Back to Dashboard
        </button>

        <div className="daily-header" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }}>
          <div className="header-content">
            <div className="header-icon">{todaysWorkout.icon}</div>
            <div className="header-text">
              <h1>{todaysWorkout.name}</h1>
              <div className="header-meta">
                <span><FiClock /> {todaysWorkout.duration}</span>
                <span><BiRun /> {todaysWorkout.level}</span>
                <span><FiTarget /> {todaysWorkout.focus}</span>
              </div>
            </div>
          </div>
        </div>

        {!isStarted ? (
          <div className="workout-preview">
            <div className="preview-card">
              <h3>Today's Focus</h3>
              <div className="focus-tags">
                {todaysWorkout.bodyParts.map((part, i) => (
                  <span key={i} className="focus-tag" style={{ background: colors.primary }}>
                    {part}
                  </span>
                ))}
              </div>

              <div className="workout-structure">
                <h4>Workout Structure</h4>
                <div className="structure-grid">
                  <div className="structure-item">
                    <span className="structure-icon">🔥</span>
                    <div>
                      <span className="structure-label">Warm Up</span>
                      <span className="structure-value">{todaysWorkout.warmup.length} exercises</span>
                    </div>
                  </div>
                  <div className="structure-item">
                    <span className="structure-icon">💪</span>
                    <div>
                      <span className="structure-label">Main Workout</span>
                      <span className="structure-value">{todaysWorkout.exercises.length} exercises</span>
                    </div>
                  </div>
                  <div className="structure-item">
                    <span className="structure-icon">🧘</span>
                    <div>
                      <span className="structure-label">Cool Down</span>
                      <span className="structure-value">{todaysWorkout.cooldown.length} exercises</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="preview-exercises">
                <h4>Preview Exercises</h4>
                <div className="preview-list">
                  {todaysWorkout.exercises.slice(0, 3).map((ex, i) => (
                    <div key={i} className="preview-ex-item">
                      <span className="preview-ex-icon">{ex.icon}</span>
                      <span className="preview-ex-name">{ex.name}</span>
                      <span className="preview-ex-reps">{ex.reps}</span>
                    </div>
                  ))}
                  {todaysWorkout.exercises.length > 3 && (
                    <div className="preview-more">
                      +{todaysWorkout.exercises.length - 3} more exercises
                    </div>
                  )}
                </div>
              </div>

              <div className="preview-benefits">
                <h4>Benefits</h4>
                <div className="benefits-list">
                  {todaysWorkout.benefits.map((benefit, i) => (
                    <div key={i} className="benefit-item">
                      <FiCheckCircle className="benefit-check" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="start-workout-btn" onClick={handleStartWorkout} style={{ background: colors.primary }}>
                <FiPlay /> Start Workout
              </button>
            </div>
          </div>
        ) : (
          <div className="active-workout">
            <div className="workout-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${getProgress()}%`, background: colors.primary }}></div>
              </div>
              <span className="progress-text">{completedExercises.length} / {(todaysWorkout.warmup.length + todaysWorkout.exercises.length + todaysWorkout.cooldown.length)} completed</span>
            </div>

            <div className="current-exercise-card" style={{ borderColor: colors.primary }}>
              <div className="exercise-type-badge" style={{ background: colors.primary }}>
                {currentEx.type}
              </div>
              
              <div className="exercise-main">
                <span className="exercise-icon-large">{currentEx.icon}</span>
                <div className="exercise-info">
                  <h2>{currentEx.name}</h2>
                  {currentEx.reps && <p className="exercise-reps">{currentEx.reps}</p>}
                  {currentEx.muscles && <p className="exercise-muscles">Targets: {currentEx.muscles}</p>}
                </div>
              </div>

              <div className="exercise-timer">
                <FiClock className="timer-icon" />
                <span className="timer-display">{currentEx.duration}</span>
              </div>

              <div className="exercise-actions">
                <button className="complete-btn" onClick={handleCompleteExercise} style={{ background: colors.primary }}>
                  <FiCheckCircle /> Complete & Next
                </button>
              </div>
            </div>

            <div className="upcoming-preview">
              <h4>Coming Up Next</h4>
              <div className="upcoming-list">
                {currentSection === 'warmup' && currentExercise < todaysWorkout.warmup.length - 1 && (
                  <div className="upcoming-item">
                    <span className="upcoming-icon">🔥</span>
                    <span className="upcoming-name">{todaysWorkout.warmup[currentExercise + 1]}</span>
                  </div>
                )}
                {currentSection === 'warmup' && currentExercise === todaysWorkout.warmup.length - 1 && (
                  <div className="upcoming-item">
                    <span className="upcoming-icon">💪</span>
                    <span className="upcoming-name">Start Main Workout</span>
                  </div>
                )}
                {currentSection === 'exercises' && currentExercise < todaysWorkout.exercises.length - 1 && (
                  <div className="upcoming-item">
                    <span className="upcoming-icon">{todaysWorkout.exercises[currentExercise + 1].icon}</span>
                    <span className="upcoming-name">{todaysWorkout.exercises[currentExercise + 1].name}</span>
                  </div>
                )}
                {currentSection === 'exercises' && currentExercise === todaysWorkout.exercises.length - 1 && (
                  <div className="upcoming-item">
                    <span className="upcoming-icon">🧘</span>
                    <span className="upcoming-name">Cool Down</span>
                  </div>
                )}
                {currentSection === 'cooldown' && currentExercise < todaysWorkout.cooldown.length - 1 && (
                  <div className="upcoming-item">
                    <span className="upcoming-icon">🧘</span>
                    <span className="upcoming-name">{todaysWorkout.cooldown[currentExercise + 1]}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}