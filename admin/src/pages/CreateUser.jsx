import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSave, 
  FiX, 
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiAward
} from 'react-icons/fi';
import { users } from '../services/api';
import './CreateUser.css';

export default function CreateUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    fullName: '',
    email: '',
    age: '',
    gender: '',
    subscriptionType: 'Trial',
    status: 'Active',
    point: 0,
    productNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await users.create(formData);
      navigate('/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-user-page">
      <div className="create-user-header">
        <h1>Create New User</h1>
        <p>Add a new user to the system</p>
      </div>

      {error && <div className="create-user-error">{error}</div>}

      <form onSubmit={handleSubmit} className="create-user-form">
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>
                <FiUser /> Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter full name"
              />
            </div>

            <div className="form-group">
              <label>
                <FiPhone /> Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                maxLength="9"
                placeholder="912345678"
              />
              <small>9-digit Ethiopian phone number</small>
            </div>

            <div className="form-group">
              <label>
                <FiMail /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="user@example.com"
              />
            </div>

            <div className="form-group">
              <label>
                <FiCalendar /> Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="13"
                max="120"
                placeholder="25"
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Subscription Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Subscription Type</label>
              <select name="subscriptionType" value={formData.subscriptionType} onChange={handleInputChange}>
                <option value="Trial">Trial</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <FiAward /> Points
              </label>
              <input
                type="number"
                name="point"
                value={formData.point}
                onChange={handleInputChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Product Number</label>
              <input
                type="text"
                name="productNumber"
                value={formData.productNumber}
                onChange={handleInputChange}
                placeholder="PROD001"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/users')} className="cancel-btn">
            <FiX /> Cancel
          </button>
          <button type="submit" disabled={loading} className="submit-btn">
            <FiSave /> {loading ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
}