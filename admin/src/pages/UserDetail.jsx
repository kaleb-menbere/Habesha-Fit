import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiEdit2, 
  FiSave, 
  FiX,
  FiMail,
  FiPhone,
  FiCalendar,
  FiAward
} from 'react-icons/fi';
import { users } from '../services/api';
import './UserDetail.css';

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await users.getById(id);
      setUser(response.data.user);
      setFormData(response.data.user);
    } catch (err) {
      setError('Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await users.update(id, formData);
      setUser(formData);
      setEditing(false);
      setError('');
    } catch (err) {
      setError('Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading user details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="user-detail">
      <div className="detail-header">
        <button onClick={() => navigate('/users')} className="back-btn">
          <FiArrowLeft /> Back to Users
        </button>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="edit-btn">
            <FiEdit2 /> Edit User
          </button>
        ) : (
          <div className="edit-actions">
            <button onClick={() => setEditing(false)} className="cancel-btn">
              <FiX /> Cancel
            </button>
            <button onClick={handleSubmit} className="save-btn" disabled={saving}>
              <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="user-profile">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.fullName?.charAt(0) || 'U'}
          </div>
          <div className="profile-title">
            <h1>{user.fullName}</h1>
            <p>Member since {new Date(user.registrationDate).toLocaleDateString()}</p>
          </div>
          <div className="profile-status">
            <span className={`status-badge ${user.status?.toLowerCase()}`}>
              {user.status}
            </span>
            <span className={`sub-badge ${user.subscriptionType?.toLowerCase()}`}>
              {user.subscriptionType}
            </span>
          </div>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  required
                  maxLength="9"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender || ''} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status || ''} onChange={handleInputChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="form-group">
                <label>Subscription Type</label>
                <select name="subscriptionType" value={formData.subscriptionType || ''} onChange={handleInputChange}>
                  <option value="Trial">Trial</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="form-group">
                <label>Points</label>
                <input
                  type="number"
                  name="point"
                  value={formData.point || 0}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Product Number</label>
                <input
                  type="text"
                  name="productNumber"
                  value={formData.productNumber || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Next Renewal</label>
                <input
                  type="datetime-local"
                  name="nextRenewalTime"
                  value={formData.nextRenewalTime ? new Date(formData.nextRenewalTime).toISOString().slice(0, 16) : ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        ) : (
          <div className="user-info">
            <div className="info-grid">
              <div className="info-item">
                <FiPhone className="info-icon" />
                <div>
                  <label>Phone Number</label>
                  <p>{user.phone}</p>
                </div>
              </div>

              <div className="info-item">
                <FiMail className="info-icon" />
                <div>
                  <label>Email</label>
                  <p>{user.email || 'Not provided'}</p>
                </div>
              </div>

              <div className="info-item">
                <FiCalendar className="info-icon" />
                <div>
                  <label>Age / Gender</label>
                  <p>{user.age || '?'} years • {user.gender || 'Not specified'}</p>
                </div>
              </div>

              <div className="info-item">
                <FiAward className="info-icon" />
                <div>
                  <label>Points</label>
                  <p>{user.point || 0} points</p>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Subscription Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Type</label>
                  <p>{user.subscriptionType || 'None'}</p>
                </div>
                <div className="info-item">
                  <label>Status</label>
                  <p>{user.status}</p>
                </div>
                <div className="info-item">
                  <label>Next Renewal</label>
                  <p>{user.nextRenewalTime ? new Date(user.nextRenewalTime).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="info-item">
                  <label>Product Number</label>
                  <p>{user.productNumber || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Registration Info</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Registration Date</label>
                  <p>{new Date(user.registrationDate).toLocaleString()}</p>
                </div>
                <div className="info-item">
                  <label>Last Login</label>
                  <p>{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}</p>
                </div>
                <div className="info-item">
                  <label>User ID</label>
                  <p className="user-id">{user.id}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}