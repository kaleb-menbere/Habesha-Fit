import { useState } from 'react';
import { 
  FiSave,
  FiBell,
  FiLock,
  FiMail,
  FiGlobe,
  FiShield,
  FiDatabase
} from 'react-icons/fi';
import './Settings.css';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const tabs = [
    { id: 'general', name: 'General', icon: <FiGlobe /> },
    { id: 'notifications', name: 'Notifications', icon: <FiBell /> },
    { id: 'security', name: 'Security', icon: <FiLock /> },
    { id: 'email', name: 'Email', icon: <FiMail /> },
    { id: 'backup', name: 'Backup', icon: <FiDatabase /> }
  ];

  const handleSave = () => {
    setSaving(true);
    setMessage('');
    
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your application settings and preferences</p>
      </div>

      {message && (
        <div className="settings-message">
          {message}
        </div>
      )}

      <div className="settings-container">
        <div className="settings-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-name">{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="settings-section">
              <h2>General Settings</h2>
              
              <div className="settings-form">
                <div className="form-group">
                  <label>Site Name</label>
                  <input type="text" defaultValue="Habesha Fit" />
                </div>

                <div className="form-group">
                  <label>Site Description</label>
                  <textarea defaultValue="Your journey to a healthier you starts here" rows="3"></textarea>
                </div>

                <div className="form-group">
                  <label>Timezone</label>
                  <select defaultValue="africa/addis_ababa">
                    <option value="africa/addis_ababa">Africa/Addis Ababa</option>
                    <option value="africa/nairobi">Africa/Nairobi</option>
                    <option value="africa/cairo">Africa/Cairo</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Language</label>
                  <select defaultValue="en">
                    <option value="en">English</option>
                    <option value="am">Amharic</option>
                    <option value="om">Oromo</option>
                  </select>
                </div>

                <div className="form-checkbox">
                  <input type="checkbox" id="maintenance" />
                  <label htmlFor="maintenance">Maintenance Mode</label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Settings</h2>
              
              <div className="settings-form">
                <div className="form-group">
                  <label>Email Notifications</label>
                  <select defaultValue="daily">
                    <option value="instant">Instant</option>
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Digest</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <div className="form-checkbox">
                  <input type="checkbox" id="newUserNotify" defaultChecked />
                  <label htmlFor="newUserNotify">New user registration</label>
                </div>

                <div className="form-checkbox">
                  <input type="checkbox" id="subscriptionNotify" defaultChecked />
                  <label htmlFor="subscriptionNotify">Subscription changes</label>
                </div>

                <div className="form-checkbox">
                  <input type="checkbox" id="paymentNotify" defaultChecked />
                  <label htmlFor="paymentNotify">Payment notifications</label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              
              <div className="settings-form">
                <div className="form-group">
                  <label>JWT Secret</label>
                  <input type="password" defaultValue="••••••••••••••••" />
                </div>

                <div className="form-group">
                  <label>Session Timeout (minutes)</label>
                  <input type="number" defaultValue="60" />
                </div>

                <div className="form-checkbox">
                  <input type="checkbox" id="twoFactor" />
                  <label htmlFor="twoFactor">Enable Two-Factor Authentication</label>
                </div>

                <div className="form-checkbox">
                  <input type="checkbox" id="ipWhitelist" />
                  <label htmlFor="ipWhitelist">IP Whitelisting</label>
                </div>

                <h3>OTP Settings</h3>
                <div className="form-group">
                  <label>OTP Expiry (minutes)</label>
                  <input type="number" defaultValue="5" />
                </div>

                <div className="form-group">
                  <label>OTP Length</label>
                  <select defaultValue="4">
                    <option value="4">4 digits</option>
                    <option value="6">6 digits</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="settings-section">
              <h2>Email Configuration</h2>
              
              <div className="settings-form">
                <div className="form-group">
                  <label>SMTP Host</label>
                  <input type="text" defaultValue="smtp.gmail.com" />
                </div>

                <div className="form-group">
                  <label>SMTP Port</label>
                  <input type="number" defaultValue="587" />
                </div>

                <div className="form-group">
                  <label>SMTP User</label>
                  <input type="text" defaultValue="noreply@habeshaft.com" />
                </div>

                <div className="form-group">
                  <label>SMTP Password</label>
                  <input type="password" defaultValue="••••••••" />
                </div>

                <div className="form-checkbox">
                  <input type="checkbox" id="ssl" defaultChecked />
                  <label htmlFor="ssl">Use SSL/TLS</label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="settings-section">
              <h2>Backup Settings</h2>
              
              <div className="settings-form">
                <div className="form-group">
                  <label>Backup Frequency</label>
                  <select defaultValue="daily">
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Backup Retention (days)</label>
                  <input type="number" defaultValue="30" />
                </div>

                <div className="form-group">
                  <label>Backup Location</label>
                  <input type="text" defaultValue="/backups" />
                </div>

                <button className="backup-now-btn">
                  <FiDatabase /> Backup Now
                </button>
              </div>
            </div>
          )}

          <div className="settings-actions">
            <button onClick={handleSave} disabled={saving} className="save-settings-btn">
              <FiSave /> {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}