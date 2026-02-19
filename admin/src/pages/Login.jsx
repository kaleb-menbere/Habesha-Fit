import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiPhone, FiLogIn, FiInfo, FiSend } from 'react-icons/fi';
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
  const [otpMessage, setOtpMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const adminPhones = ['911111111', '922222222', '923456789']; // Add your admin numbers

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length === 9;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
    setError('');
    setOtpMessage('');
    
    // Check if it's an admin number as they type
    if (value.length === 9) {
      setIsAdmin(adminPhones.includes(value));
    } else {
      setIsAdmin(false);
    }
  };

  const handleSendOTP = async () => {
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Validate phone
    if (!cleanPhone) {
      setError('Phone number is required');
      return;
    }

    if (cleanPhone.length !== 9) {
      setError('Please enter a valid 9-digit phone number');
      return;
    }

    // Check if admin
    if (!adminPhones.includes(cleanPhone)) {
      setError('This number is not authorized as admin');
      return;
    }

    setLoading(true);
    setError('');
    setOtpMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      setOtpSent(true);
      
      // Show OTP in development
      if (data.otp) {
        setOtpMessage(`🔐 Development OTP: ${data.otp}`);
        // Auto-fill OTP for faster testing
        setOtp(data.otp);
      } else {
        setOtpMessage('✅ OTP sent successfully! Check your phone.');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const cleanPhone = phone.replace(/\D/g, '');
      const response = await auth.login(cleanPhone, otp);
      
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOtpSent(false);
    setOtp('');
    setOtpMessage('');
    setError('');
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
          <div className={`admin-otp-message ${otpMessage.includes('🔐') ? 'development' : 'success'}`}>
            <span className="otp-icon">{otpMessage.includes('🔐') ? '🔐' : '✅'}</span>
            <div className="otp-content">
              <strong>{otpMessage}</strong>
            </div>
            {otpMessage.includes('🔐') && (
              <button className="otp-copy-btn" onClick={() => navigator.clipboard.writeText(otp)}>
                Copy
              </button>
            )}
          </div>
        )}

        <div className="admin-input-group">
          <label>
            <FiPhone /> Admin Phone Number
          </label>
          <div className="input-with-indicator">
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="911111111"
              maxLength="9"
              required
              disabled={otpSent}
              className={isAdmin ? 'valid-phone' : ''}
            />
            {phone.length === 9 && (
              <span className="phone-indicator">
                {isAdmin ? '👑 Admin' : '❌ Not Admin'}
              </span>
            )}
          </div>
          <small>Enter your 9-digit Ethiopian phone number</small>
        </div>

        <div className="admin-input-group">
          <label>
            <FiLock /> OTP Code
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="Enter 4-digit OTP"
            maxLength="4"
            disabled={!otpSent}
          />
          <small>OTP will be sent to your phone</small>
        </div>

        <div className="admin-button-group">
          {!otpSent ? (
            <button 
              onClick={handleSendOTP} 
              disabled={loading || phone.length !== 9 || !isAdmin} 
              className="admin-btn send-btn"
            >
              {loading ? (
                <>Sending... <span className="spinner"></span></>
              ) : (
                <>Send OTP <FiSend /></>
              )}
            </button>
          ) : (
            <>
              <button 
                onClick={handleVerifyOTP} 
                disabled={loading || otp.length !== 4} 
                className="admin-btn verify-btn"
              >
                {loading ? (
                  <>Verifying... <span className="spinner"></span></>
                ) : (
                  <>Login to Admin <FiLogIn /></>
                )}
              </button>
              <button 
                onClick={handleReset} 
                className="admin-link-btn"
                disabled={loading}
              >
                ← Use different number
              </button>
            </>
          )}
        </div>

        <div className="admin-login-footer">
          <p>⚠️ Admin access only • Unauthorized access is prohibited</p>
          <div className="admin-hint">
            <small>Admin numbers: 911111111, 922222222</small>
          </div>
        </div>
      </div>
    </div>
  );
}