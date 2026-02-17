import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiClock, FiCalendar, FiTarget, FiAward,
  FiCheckCircle, FiPlay, FiChevronRight, FiUser, FiZap,
  FiBarChart2, FiTrendingUp, FiActivity, FiSun,
  FiMoon, FiSunrise, FiCoffee, FiMapPin
} from 'react-icons/fi';
import { BiDumbbell, BiRun, BiWater, BiHeart } from 'react-icons/bi';
import { 
  GiStrong, GiMuscleUp, GiFlexibleStar, GiMeditation,
  GiHealthNormal, GiWeightLiftingUp, GiRunningShoe
} from 'react-icons/gi';
import useAuthStore from '../store/authStore';
import Header from '../components/layout/Header';
import { getWorkoutsByCategory, getCategoryDisplay } from '../data/WorkoutTypes';
import { getAllDailyWorkouts, getDailyWorkout } from '../data/DailyWorkouts';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profileCompleted } = useAuthStore();
  
  const [userCat, setUserCat] = useState(user?.category || 'adult');
  const [bodyPart, setBodyPart] = useState('all');
  const [workouts, setWorkouts] = useState([]);
  const [workoutSections, setWorkoutSections] = useState([]);
  const [showWelcome, setShowWelcome] = useState(location.state?.welcome || false);
  const [greeting, setGreeting] = useState('');
  const [greetIcon, setGreetIcon] = useState('☀️');
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selDay, setSelDay] = useState(null);
  const [progress, setProgress] = useState({});
  const [activeRpt, setActiveRpt] = useState('weekly');
  const [streak, setStreak] = useState(0);
  const [totalMins, setTotalMins] = useState(0);
  const [totalCals, setTotalCals] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(7);
  const [weeklyDone, setWeeklyDone] = useState(0);
  const [dailyWorkouts, setDailyWorkouts] = useState([]);

  const userAge = user?.age || 30;
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  // Load daily workouts based on user category
  useEffect(() => {
    if (userCat) {
      const workouts = getAllDailyWorkouts(userCat);
      setDailyWorkouts(workouts);
    }
  }, [userCat]);

  // Create weekly plan from daily workouts
  const weeklyPlan = days.map((day, index) => {
    const workout = dailyWorkouts[index % dailyWorkouts.length] || {
      id: `default-${index}`,
      name: 'Daily Workout',
      icon: '💪',
      duration: '15 min',
      level: 'Beginner',
      description: 'Your daily exercise routine',
      exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3', 'Exercise 4', 'Exercise 5'],
      benefits: ['Health', 'Fitness', 'Wellness']
    };
    
    return {
      day,
      name: workout.name,
      icon: workout.icon,
      duration: workout.duration,
      level: workout.level,
      description: workout.description,
      exercises: workout.exercises || [],
      benefits: workout.benefits || []
    };
  });

  useEffect(() => {
    const saved = localStorage.getItem(`prog-${user?.id}`);
    if (saved) {
      setProgress(JSON.parse(saved));
    }
    
    const savedStats = localStorage.getItem(`stats-${user?.id}`);
    if (savedStats) {
      const s = JSON.parse(savedStats);
      setStreak(s.streak || 0);
      setTotalMins(s.totalMins || 0);
      setTotalCals(s.totalCals || 0);
      setWeeklyDone(s.weeklyDone || 0);
    }
  }, [user]);

  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem(`prog-${user?.id}`, JSON.stringify(progress));
      
      const doneCount = weeklyPlan.filter((p) => progress[p.day]).length;
      setWeeklyDone(doneCount);
      
      const todayDone = progress[today];
      if (todayDone) {
        setStreak(prev => Math.max(prev, 1));
      }
      
      localStorage.setItem(`stats-${user?.id}`, JSON.stringify({
        streak,
        totalMins,
        totalCals,
        weeklyDone
      }));
    }
  }, [progress, user]);

  useEffect(() => {
    if (user?.category) {
      setUserCat(user.category);
    }
  }, [user]);

  const bodyParts = [
    { id: 'all', name: 'All', icon: '🔥' },
    { id: 'upper', name: 'Upper', icon: '💪' },
    { id: 'lower', name: 'Lower', icon: '🦵' },
    { id: 'core', name: 'Core', icon: '🎯' },
    { id: 'full', name: 'Full', icon: '🔥' }
  ];

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) {
      setGreeting('Good Morning');
      setGreetIcon('☀️');
    } else if (h < 18) {
      setGreeting('Good Afternoon');
      setGreetIcon('⛅');
    } else {
      setGreeting('Good Evening');
      setGreetIcon('🌙');
    }

    if (!profileCompleted) {
      navigate('/onboarding');
    }
  }, [profileCompleted, navigate]);

  useEffect(() => {
    if (userCat) {
      const data = getWorkoutsByCategory(userCat, userAge);
      const sections = Object.values(data);
      setWorkoutSections(sections);
      
      const all = sections.flatMap(s => 
        s.exercises.map(ex => ({
          ...ex,
          secName: s.name,
          secIcon: s.icon,
          secColor: s.color
        }))
      );
      
      setWorkouts(all);
    }
  }, [userCat, userAge]);

  const filtered = workouts.filter(w => {
    if (bodyPart === 'all') return true;
    const n = w.name.toLowerCase();
    const d = w.description?.toLowerCase() || '';
    
    switch(bodyPart) {
      case 'upper': return n.includes('push') || n.includes('pull') || n.includes('arm') || n.includes('chest');
      case 'lower': return n.includes('squat') || n.includes('lunge') || n.includes('leg') || n.includes('glute');
      case 'core': return n.includes('plank') || n.includes('sit') || n.includes('crunch') || n.includes('ab');
      default: return true;
    }
  });

  useEffect(() => {
    if (showWelcome) {
      setTimeout(() => setShowWelcome(false), 5000);
    }
  }, [showWelcome]);

  const catInfo = getCategoryDisplay(userCat);

  const handleComplete = (day) => {
    setProgress(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
    
    const w = weeklyPlan.find(p => p.day === day);
    if (w && !progress[day]) {
      const mins = parseInt(w.duration) || 15;
      setTotalMins(prev => prev + mins);
      
      let calsPerMin = 5;
      if (userCat === 'kids') calsPerMin = 3;
      else if (userCat === 'elderly') calsPerMin = 4;
      else if (userCat === 'adult') calsPerMin = 7;
      else if (userCat === 'fitness') calsPerMin = 10;
      else if (userCat === 'weightloss') calsPerMin = 8;
      
      setTotalCals(prev => prev + (mins * calsPerMin));
    }
  };

  const progPercent = (weeklyDone / weeklyGoal) * 100;

  if (!profileCompleted) return null;

  return (
    <div className="app">
      {showWelcome && (
        <div className="toast" style={{ borderLeftColor: catInfo.color }}>
          <FiCheckCircle className="toast-icon" style={{ color: catInfo.color }} />
          <div>
            <h4>Welcome back! 🎉</h4>
            <p>Your {catInfo.name} workouts are ready</p>
          </div>
        </div>
      )}

      <Header
        user={user}
        category={userCat}
        bodyPart={bodyPart}
        onBodyPartChange={setBodyPart}
        filterOpen={filterOpen}
        onFilterToggle={() => setFilterOpen(!filterOpen)}
        menuOpen={menuOpen}
        onMenuToggle={setMenuOpen}
        onNavigateToWorkouts={() => navigate('/workouts')}
      />

      <main className={`main ${menuOpen ? 'blur' : ''}`}>
        <div className="welcome">
          <div className="welcome-txt">
            <div className="greet">
              <span className="greet-ico">{greetIcon}</span>
              <h1>{greeting}, {user?.firstName || 'Fitness Seeker'}! 👋</h1>
            </div>
            <p>
              {userCat === 'kids' && "Let's have fun today! 🎮"}
              {userCat === 'teenage' && "Ready to level up? ⚡"}
              {userCat === 'adult' && "Crush your goals! 💪"}
              {userCat === 'elderly' && "Stay healthy! 🌿"}
              {userCat === 'fitness' && "Push your limits! 🔥"}
              {userCat === 'weightloss' && "Every rep counts! ⚖️"}
            </p>
          </div>
          <div className="badge" style={{ background: catInfo.color }}>
            <FiUser />
            <span>{catInfo.name}</span>
          </div>
        </div>

        {user?.age && (
          <div className="age-card" style={{ borderLeftColor: catInfo.color }}>
            <span className="age-ico">📅</span>
            <span>Age: {user.age} • {catInfo.name} Plan</span>
          </div>
        )}

        <div className="today">
          <div className="today-hdr">
            <h3>
              <FiSun className="today-ico" />
              Today: {today}
            </h3>
            <span className="today-count">{weeklyDone}/7 Done</span>
          </div>
          
          {weeklyPlan.find(d => d.day === today) && (
            <div className="today-card" style={{ background: `linear-gradient(135deg, ${catInfo.color} 0%, ${catInfo.color}dd 100%)` }}>
              <div className="today-main">
                <div className="today-left">
                  <span className="today-ico-lg">{weeklyPlan.find(d => d.day === today).icon}</span>
                  <div className="today-info">
                    <h4>{weeklyPlan.find(d => d.day === today).name}</h4>
                    <div className="today-meta">
                      <span><FiClock /> {weeklyPlan.find(d => d.day === today).duration}</span>
                      <span><BiRun /> {weeklyPlan.find(d => d.day === today).level}</span>
                    </div>
                  </div>
                </div>
                <div className="today-actions">
                  <button className={`btn-complete ${progress[today] ? 'done' : ''}`} onClick={() => handleComplete(today)}>
                    {progress[today] ? '✓ Done' : 'Mark Done'}
                  </button>
                  <button className="btn-start" onClick={() => navigate('/daily-workout')}>
                    <FiPlay /> Start
                  </button>
                </div>
              </div>
              
              <div className="today-preview">
                {weeklyPlan.find(d => d.day === today).exercises.slice(0, 3).map((e, i) => {
                  // Handle both string and object exercises
                  const exerciseName = typeof e === 'object' ? e.name : e;
                  return (
                    <div key={i} className="preview-item">
                      <FiCheckCircle className="preview-check" />
                      <span>{exerciseName}</span>
                    </div>
                  );
                })}
                {weeklyPlan.find(d => d.day === today).exercises.length > 3 && (
                  <div className="preview-item more-item">
                    <span>+{weeklyPlan.find(d => d.day === today).exercises.length - 3} more</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="stats">
          <div className="stats-hdr">
            <h3>
              <FiBarChart2 className="stats-ico" />
              Progress
            </h3>
            <div className="rpt-tabs">
              {['daily', 'weekly', 'monthly', 'yearly'].map(r => (
                <button key={r} className={`rpt-tab ${activeRpt === r ? 'active' : ''}`} onClick={() => setActiveRpt(r)}>
                  {r[0].toUpperCase() + r.slice(1, 3)}
                </button>
              ))}
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card" style={{ borderLeftColor: catInfo.color }}>
              <div className="stat-ico" style={{ background: `${catInfo.color}20` }}>
                <FiActivity style={{ color: catInfo.color }} />
              </div>
              <div className="stat-info">
                <span className="stat-lbl">Streak</span>
                <span className="stat-val">{streak}d</span>
                <span className="stat-trend">+2</span>
              </div>
            </div>

            <div className="stat-card" style={{ borderLeftColor: '#4CAF50' }}>
              <div className="stat-ico" style={{ background: '#4CAF5020' }}>
                <FiClock style={{ color: '#4CAF50' }} />
              </div>
              <div className="stat-info">
                <span className="stat-lbl">Time</span>
                <span className="stat-val">{totalMins}m</span>
                <span className="stat-trend">{activeRpt === 'daily' ? '45m' : '180m'}</span>
              </div>
            </div>

            <div className="stat-card" style={{ borderLeftColor: '#FF9800' }}>
              <div className="stat-ico" style={{ background: '#FF980020' }}>
                <BiWater style={{ color: '#FF9800' }} />
              </div>
              <div className="stat-info">
                <span className="stat-lbl">Calories</span>
                <span className="stat-val">{totalCals}</span>
                <span className="stat-trend">{activeRpt === 'daily' ? '500' : '3500'}</span>
              </div>
            </div>

            <div className="stat-card" style={{ borderLeftColor: '#9C27B0' }}>
              <div className="stat-ico" style={{ background: '#9C27B020' }}>
                <BiHeart style={{ color: '#9C27B0' }} />
              </div>
              <div className="stat-info">
                <span className="stat-lbl">Goal</span>
                <span className="stat-val">{weeklyDone}/{weeklyGoal}</span>
                <div className="prog-bar">
                  <div className="prog-fill" style={{ width: `${progPercent}%`, background: catInfo.color }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="weekly">
          <h3>
            <FiCalendar className="weekly-ico" />
            7-Day Plan
          </h3>
          <div className="days">
            {weeklyPlan.map((d, i) => {
              // Debug: log the exercise type
              console.log(`Day ${d.day} exercises:`, d.exercises);
              
              return (
                <div 
                  key={i} 
                  className={`day ${d.day === today ? 'is-today' : ''} ${progress[d.day] ? 'is-done' : ''}`} 
                  onClick={() => setSelDay(selDay === d.day ? null : d.day)}
                >
                  <div className="day-hdr">
                    <span className="day-name">{d.day.substring(0, 3)}</span>
                    {progress[d.day] && <span className="day-badge">✓</span>}
                  </div>
                  <span className="day-ico">{d.icon}</span>
                  <h4 className="day-title">{d.name}</h4>
                  <div className="day-meta">
                    <span><FiClock /> {d.duration}</span>
                  </div>
                  
                  {selDay === d.day && (
                    <div className="day-detail">
                      <div className="day-ex">
                        {d.exercises && d.exercises.length > 0 ? (
                          d.exercises.slice(0, 4).map((e, idx) => {
                            // Handle different exercise formats
                            if (typeof e === 'string') {
                              return (
                                <div key={idx} className="day-ex-item">
                                  <FiCheckCircle className="ex-check" />
                                  <span>{e}</span>
                                </div>
                              );
                            } else if (e && typeof e === 'object') {
                              return (
                                <div key={idx} className="day-ex-item">
                                  <span className="ex-icon">{e.icon || '•'}</span>
                                  <span className="ex-name">{e.name || 'Exercise'}</span>
                                </div>
                              );
                            } else {
                              return (
                                <div key={idx} className="day-ex-item">
                                  <span>Unknown exercise</span>
                                </div>
                              );
                            }
                          })
                        ) : (
                          <div className="day-ex-item">No exercises listed</div>
                        )}
                        {d.exercises && d.exercises.length > 4 && (
                          <div className="day-ex-item more">
                            <span>+{d.exercises.length - 4} more</span>
                          </div>
                        )}
                      </div>
                      <button 
                        className="day-start" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          navigate('/daily-workout'); 
                        }}
                      >
                        Start
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {workoutSections.length > 0 && (
          <div className="rec">
            <h3>
              <FiTarget className="rec-ico" />
              Recommended
            </h3>
            <div className="rec-grid">
              {workoutSections.slice(0, 3).map((s, i) => {
                const ex = s.exercises[0];
                return (
                  <div key={i} className="rec-card" style={{ background: s.color }} onClick={() => navigate('/workouts', { state: { section: s.id } })}>
                    <div className="rec-hdr">
                      <span className="rec-ico-lg">{s.icon}</span>
                      <span className="rec-badge">{s.name}</span>
                    </div>
                    <h4>{ex?.name}</h4>
                    <p>{ex?.description?.substring(0, 50)}...</p>
                    <div className="rec-footer">
                      <span><FiClock /> {ex?.duration}</span>
                      <button className="rec-btn">Try →</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {workouts.length > 0 && (
          <div className="browse">
            <button className="browse-btn" onClick={() => navigate('/workouts')} style={{ background: catInfo.color }}>
              <BiDumbbell /> Browse All {catInfo.name} Exercises
            </button>
          </div>
        )}
      </main>
    </div>
  );
}