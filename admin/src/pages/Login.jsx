import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiPhone, FiLogIn, FiInfo } from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';
import useAuthStore from '../store/authStore';
import { auth } from '../services/api';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState('phone'); // phone or otp
  const [otpMessage, setOtpMessage] = useState('');

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOtpMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.replace(/\D/g, '') })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      setStep('otp');
      
      // Show OTP in a nice message (development only)
      if (data.otp) {
        setOtpMessage(`🔐 Development OTP: ${data.otp} - Use this to login`);
        
        // Auto-fill OTP for convenience (optional)
        // setOtp(data.otp);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOtpMessage('');

    try {
      const cleanPhone = phone.replace(/\D/g, '');
      const response = await auth.login(cleanPhone, otp);
      
      // Check if user is admin
      const adminPhones = ['911111111', '922222222'];
      const isAdmin = adminPhones.includes(cleanPhone);
      
      if (!isAdmin) {
        throw new Error('Not authorized as admin');
      }

      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <RiAdminLine className="admin-icon" />
          <h1>Habesha Fit Admin</h1>
          <p>Enter your credentials to access the admin panel</p>
        </div>

        {error && (
          <div className="admin-error">
            <FiInfo /> {error}
          </div>
        )}

        {otpMessage && (
          <div className="admin-otp-message">
            <span className="otp-icon">📱</span>
            <div className="otp-content">
              <strong>{otpMessage}</strong>
            </div>
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleRequestOTP}>
            <div className="admin-input-group">
              <label>
                <FiPhone /> Admin Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="911111111"
                maxLength="9"
                required
                autoFocus
              />
              <small>Use admin phone: 911111111</small>
            </div>

            <button type="submit" disabled={loading} className="admin-btn">
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <div className="admin-input-group">
              <label>
                <FiLock /> Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="1234"
                maxLength="4"
                required
                autoFocus
              />
              <small>Enter the 4-digit OTP shown above</small>
            </div>

            <button type="submit" disabled={loading} className="admin-btn">
              {loading ? 'Verifying...' : 'Login to Admin'}
            </button>

            <button 
              type="button" 
              onClick={() => {
                setStep('phone');
                setOtpMessage('');
                setOtp('');
              }} 
              className="admin-link-btn"
            >
              ← Back to Phone Number
            </button>
          </form>
        )}

        <div className="admin-login-footer">
          <p>⚠️ Admin access only • Unauthorized access is prohibited</p>
        </div>
      </div>
    </div>
  );
}