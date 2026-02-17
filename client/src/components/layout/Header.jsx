import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiMenu, FiX, FiHome, FiTarget, FiTrendingUp, 
  FiHeart, FiBookOpen, FiSettings, FiLogOut, FiUser,
  FiAward, FiCalendar, FiClock
} from 'react-icons/fi';
import { BiDumbbell } from 'react-icons/bi';
import useAuthStore from '../../store/authStore';
import './Header.css';

export default function Header({ 
  user, 
  category,
  menuOpen,
  onMenuToggle,
  // Remove onLogout from props - we'll get it directly from store
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout); // Get logout directly from store
  const [activeTab, setActiveTab] = useState('dashboard');

  // Update active tab based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('dashboard');
    else if (path === '/workouts') setActiveTab('workouts');
    else if (path === '/goals') setActiveTab('goals');
    else if (path === '/progress') setActiveTab('progress');
    else if (path === '/health') setActiveTab('health');
    else if (path === '/guides') setActiveTab('guides');
    else if (path === '/settings') setActiveTab('settings');
    else if (path === '/daily-workout') setActiveTab('dashboard'); // Keep dashboard active for daily workout
  }, [location]);

  const navItems = [
    { id: 'dashboard', icon: FiHome, label: 'Dashboard', path: '/' },
    { id: 'workouts', icon: BiDumbbell, label: 'Workouts', path: '/workouts' },
    { id: 'goals', icon: FiTarget, label: 'Goals', path: '/goals' },
    { id: 'progress', icon: FiTrendingUp, label: 'Progress', path: '/progress' },
    { id: 'health', icon: FiHeart, label: 'Health', path: '/health' },
    { id: 'guides', icon: FiBookOpen, label: 'Guides', path: '/guides' },
    { id: 'settings', icon: FiSettings, label: 'Settings', path: '/settings' }
  ];

  const colors = {
    kids: { primary: '#FF9800', secondary: '#FF5722', bg: '#FFF3E0', name: 'Kids' },
    teenage: { primary: '#9C27B0', secondary: '#7B1FA2', bg: '#F3E5F5', name: 'Teenage' },
    adult: { primary: '#4CAF50', secondary: '#2E7D32', bg: '#E8F5E9', name: 'Adult' },
    elderly: { primary: '#2196F3', secondary: '#1976D2', bg: '#E3F2FD', name: 'Elderly' },
    fitness: { primary: '#9C27B0', secondary: '#7B1FA2', bg: '#F3E5F5', name: 'Fitness' },
    weightloss: { primary: '#F44336', secondary: '#D32F2F', bg: '#FFEBEE', name: 'Weight Loss' }
  };

  const currentColor = colors[category] || colors.adult;

  // Get user's display name
  const getUserName = () => {
    if (user?.firstName) return user.firstName;
    if (user?.name) return user.name.split(' ')[0];
    return 'Fitness Seeker';
  };

  // Get user's initial
  const getUserInitial = () => {
    if (user?.firstName) return user.firstName.charAt(0).toUpperCase();
    if (user?.name) return user.name.charAt(0).toUpperCase();
    return 'U';
  };

  // Get user's full name
  const getFullName = () => {
    if (user?.firstName && user?.lastName) return `${user.firstName} ${user.lastName}`;
    if (user?.name) return user.name;
    if (user?.firstName) return user.firstName;
    return 'Fitness Seeker';
  };

  // Get user's level based on category
  const getUserLevel = () => {
    if (user?.fitnessLevel) return user.fitnessLevel;
    if (category === 'kids') return 'Active Kid';
    if (category === 'teenage') return 'Young Athlete';
    if (category === 'elderly') return 'Active Senior';
    return 'Beginner';
  };

  const handleNavigation = (path) => {
    navigate(path);
    onMenuToggle(false);
  };

  const handleLogout = () => {
    console.log('Logout clicked - calling logout function');
    // Call logout from store
    logout();
    // Close menu
    onMenuToggle(false);
    // Navigate to login
    navigate('/login');
  };

  return (
    <>
      {/* Overlay */}
      {menuOpen && <div className="h-overlay" onClick={() => onMenuToggle(false)} />}

      {/* Top Bar */}
      <div className="h-top" style={{ background: currentColor.primary }}>
        <button className="h-menu" onClick={() => onMenuToggle(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <div className="h-logo" onClick={() => handleNavigation('/')}>
          <span>🌿</span>
          <span>Habesha Fit</span>
        </div>
        <div className="h-avatar" style={{ background: 'rgba(255,255,255,0.2)' }}>
          {getUserInitial()}
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`h-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="h-side-header">
          <div className="h-side-logo" onClick={() => handleNavigation('/')}>
            <span>🌿</span>
            <span>Habesha Fit</span>
          </div>
          <button className="h-side-close" onClick={() => onMenuToggle(false)}>
            <FiX />
          </button>
        </div>

        <div className="h-side-user">
          <div className="h-side-avatar" style={{ background: currentColor.primary }}>
            {getUserInitial()}
          </div>
          <div className="h-side-info">
            <h4>{getFullName()}</h4>
            <div className="h-side-badges">
              <span className="category-badge" style={{ background: currentColor.primary }}>
                {colors[category]?.name || category}
              </span>
              <span className="level-badge">{getUserLevel()}</span>
            </div>
          </div>
        </div>

        {/* User Stats Preview */}
        <div className="h-side-stats">
          <div className="stat-item">
            <FiCalendar />
            <div>
              <span className="stat-value">{user?.age || '-'}</span>
              <span className="stat-label">Age</span>
            </div>
          </div>
          <div className="stat-item">
            <FiAward />
            <div>
              <span className="stat-value">7</span>
              <span className="stat-label">Streak</span>
            </div>
          </div>
          <div className="stat-item">
            <FiClock />
            <div>
              <span className="stat-value">180</span>
              <span className="stat-label">Mins</span>
            </div>
          </div>
        </div>

        <nav className="h-side-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`h-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
              style={activeTab === item.id ? { 
                background: currentColor.primary,
                color: 'white'
              } : {}}
            >
              <item.icon />
              <span>{item.label}</span>
              {activeTab === item.id && (
                <span className="active-indicator">●</span>
              )}
            </button>
          ))}
        </nav>

        <div className="h-side-footer">
          {/* User Info Summary */}
          <div className="user-summary">
            <FiUser />
            <span>{getUserName()}'s {colors[category]?.name || category} Plan</span>
          </div>
          
          <button 
            onClick={handleLogout} 
            className="h-logout"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}