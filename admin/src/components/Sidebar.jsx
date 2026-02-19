import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiSettings, 
  FiLogOut,
  FiPieChart,
  FiCalendar,
  FiAward
} from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';
import useAuthStore from '../store/authStore';
import './Sidebar.css';

export default function Sidebar() {
  const { logout } = useAuthStore();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FiHome /> },
    { path: '/users', name: 'Users', icon: <FiUsers /> },
    { path: '/analytics', name: 'Analytics', icon: <FiPieChart /> },
    { path: '/subscriptions', name: 'Subscriptions', icon: <FiCalendar /> },
    { path: '/rewards', name: 'Rewards', icon: <FiAward /> },
    { path: '/settings', name: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <RiAdminLine className="sidebar-logo" />
        <h2>Habesha Fit</h2>
        <p>Admin Panel</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-name">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="logout-btn">
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}