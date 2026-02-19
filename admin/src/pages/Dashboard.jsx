import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUsers, 
  FiUserCheck, 
  FiUserX, 
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiActivity,
  FiClock,
  FiAward
} from 'react-icons/fi';
import { users } from '../services/api';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log("Fetching dashboard data...");
      
      const [statsRes, usersRes] = await Promise.all([
        users.getStats().catch(err => {
          console.error("Stats error:", err);
          return { data: { stats: {
            totalUsers: 0,
            activeUsers: 0,
            inactiveUsers: 0,
            suspendedUsers: 0,
            recentUsers: 0,
            subscriptionBreakdown: {}
          }}};
        }),
        users.getAll({ limit: 5, sortBy: 'createdAt', sortOrder: 'DESC' }).catch(err => {
          console.error("Users error:", err);
          return { data: { users: [] }};
        })
      ]);

      console.log("Stats received:", statsRes.data);
      setStats(statsRes.data.stats);
      setRecentUsers(usersRes.data.users || []);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="dashboard-loading">Loading dashboard...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  // Ensure stats exists with defaults
  const safeStats = stats || {
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    suspendedUsers: 0,
    recentUsers: 0,
    subscriptionBreakdown: {}
  };

  const statCards = [
    {
      title: 'Total Users',
      value: safeStats.totalUsers || 0,
      icon: <FiUsers />,
      color: '#667eea',
      bgColor: '#e8ecff',
      link: '/users',
      change: '+12%'
    },
    {
      title: 'Active Users',
      value: safeStats.activeUsers || 0,
      icon: <FiUserCheck />,
      color: '#48bb78',
      bgColor: '#e3f9e5',
      link: '/users?status=Active',
      change: '+5%'
    },
    {
      title: 'Inactive Users',
      value: safeStats.inactiveUsers || 0,
      icon: <FiUserX />,
      color: '#f56565',
      bgColor: '#ffe5e5',
      link: '/users?status=Inactive',
      change: '-2%'
    },
    {
      title: 'New Users (30d)',
      value: safeStats.recentUsers || 0,
      icon: <FiTrendingUp />,
      color: '#ed8936',
      bgColor: '#fff3e0',
      link: '/users',
      change: '+8%'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your platform.</p>
        </div>
        <div className="time-range-selector">
          <button 
            className={timeRange === 'week' ? 'active' : ''} 
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button 
            className={timeRange === 'month' ? 'active' : ''} 
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button 
            className={timeRange === 'year' ? 'active' : ''} 
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <Link to={stat.link} key={index} className="stat-card">
            <div className="stat-icon" style={{ background: stat.bgColor, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value.toLocaleString()}</h3>
              <p>{stat.title}</p>
            </div>
            <div className="stat-change" style={{ color: stat.change.startsWith('+') ? '#48bb78' : '#f56565' }}>
              {stat.change}
            </div>
          </Link>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card recent-users">
          <div className="card-header">
            <h2>Recent Users</h2>
            <Link to="/users" className="view-all">View All →</Link>
          </div>
          <div className="table-responsive">
            <table className="recent-users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Phone</th>
                  <th>Subscription</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar-small">
                          {user.fullName?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <div className="user-name">{user.fullName}</div>
                          <div className="user-email">{user.email || 'No email'}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.phone}</td>
                    <td>
                      <span className={`sub-badge ${user.subscriptionType?.toLowerCase() || user.subscription_type?.toLowerCase() || 'none'}`}>
                        {user.subscriptionType || user.subscription_type || 'None'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${user.status?.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{new Date(user.registrationDate || user.registration_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-card subscription-stats">
          <h2>Subscription Distribution</h2>
          {safeStats.subscriptionBreakdown && Object.keys(safeStats.subscriptionBreakdown).length > 0 ? (
            <div className="subscription-list">
              {Object.entries(safeStats.subscriptionBreakdown).map(([type, count]) => {
                const percentage = safeStats.totalUsers > 0 
                  ? ((count / safeStats.totalUsers) * 100).toFixed(1) 
                  : '0';
                return (
                  <div key={type} className="subscription-item">
                    <div className="sub-info">
                      <span className="sub-type">{type || 'Unknown'}</span>
                      <span className="sub-count">{count} users</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${percentage}%`,
                          background: type === 'Monthly' ? '#48bb78' : 
                                     type === 'Yearly' ? '#667eea' : 
                                     type === 'Trial' ? '#ed8936' : 
                                     type === 'Admin' ? '#9f7aea' : '#a0aec0'
                        }}
                      ></div>
                    </div>
                    <span className="sub-percentage">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-data">No subscription data available</div>
          )}
        </div>

        <div className="dashboard-card quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/users/create" className="action-item">
              <div className="action-icon" style={{ background: '#e8ecff', color: '#667eea' }}>
                <FiUsers />
              </div>
              <span>Add User</span>
            </Link>
            <Link to="/users" className="action-item">
              <div className="action-icon" style={{ background: '#e3f9e5', color: '#48bb78' }}>
                <FiUserCheck />
              </div>
              <span>Manage Users</span>
            </Link>
            <Link to="/reports" className="action-item">
              <div className="action-icon" style={{ background: '#fff3e0', color: '#ed8936' }}>
                <FiActivity />
              </div>
              <span>Reports</span>
            </Link>
            <Link to="/settings" className="action-item">
              <div className="action-icon" style={{ background: '#f3e8ff', color: '#9f7aea' }}>
                <FiClock />
              </div>
              <span>Settings</span>
            </Link>
          </div>
        </div>

        <div className="dashboard-card recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon" style={{ background: '#e8ecff' }}>
                <FiUserCheck />
              </div>
              <div className="activity-details">
                <p><strong>Abebe Kebede</strong> logged in</p>
                <span className="activity-time">5 minutes ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon" style={{ background: '#e3f9e5' }}>
                <FiAward />
              </div>
              <div className="activity-details">
                <p><strong>Tigist Haile</strong> earned 50 points</p>
                <span className="activity-time">1 hour ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon" style={{ background: '#fff3e0' }}>
                <FiDollarSign />
              </div>
              <div className="activity-details">
                <p>New subscription: <strong>Monthly</strong></p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}