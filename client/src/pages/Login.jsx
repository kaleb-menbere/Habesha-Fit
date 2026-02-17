import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLock, FiPhone, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri';
import useAuthStore from '../store/authStore';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [agreeTnc, setAgreeTnc] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const validatePhone = (value) => {
    const clean = value.replace(/\D/g, '');
    return clean.length === 9;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.replace(/\D/g, '');

    if (!cleanPhone) {
      setError('Phone number is required');
      return;
    }

    if (!validatePhone(cleanPhone)) {
      setError('Please enter a valid 9-digit phone number');
      return;
    }

    if (!otp) {
      setError('Please enter OTP');
      return;
    }

    if (otp.length !== 4) {
      setError('OTP must be 4 digits');
      return;
    }

    if (!agreeTnc) {
      setError('Please agree to the Terms & Conditions');
      return;
    }

    const result = await login(cleanPhone, otp);
    
    if (result.success) {
      navigate(result.isNewUser ? '/onboarding' : '/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="health-login-container">
      <div className="health-bg-pattern"></div>
      <div className="health-bg-circle health-bg-circle-1"></div>
      <div className="health-bg-circle health-bg-circle-2"></div>
      
      <div className="health-login-wrapper">
        {/* Brand Section */}
        <div className="health-brand-section">
          <div className="health-brand-content">
            <div className="health-logo">
              <RiLeafLine className="health-logo-icon" />
              <span>Habesha Fit</span>
            </div>
            <h1 className="health-tagline">Your Journey to a<br />Healthier You Starts Here</h1>
<div className="health-features">
  <div className="health-feature">
    <FiCheckCircle className="health-feature-icon" />
    <span>Kids: Fun & Gamified Movement</span>
  </div>
  <div className="health-feature">
    <FiCheckCircle className="health-feature-icon" />
    <span>Adults: Strength & Performance</span>
  </div>
  <div className="health-feature">
    <FiCheckCircle className="health-feature-icon" />
    <span>Elderly: Longevity & Vitality</span>
  </div>
</div>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="health-form-section">
          <div className="health-form-card">
            <div className="health-form-header">
              <h2>Welcome Back! 👋</h2>
              <p>Please enter your details to continue</p>
            </div>

            {/* Test Accounts */}
            <div className="health-test-accounts">
              <div className="health-test-badge">Test Accounts</div>
              <div className="health-test-row">
                <span className="health-test-badge existing">Existing</span>
                <span><FiPhone /> 912345678</span>
                <span><FiLock /> 1234</span>
              </div>
              <div className="health-test-row">
                <span className="health-test-badge new">New</span>
                <span><FiPhone /> 912345677</span>
                <span><FiLock /> 1234</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="health-error-message">
                <span>⚠️</span>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="health-form">
              {/* Phone Input */}
              <div className={`health-input-group ${focusedField === 'phone' ? 'focused' : ''}`}>
                <label>
                  <FiPhone className="health-input-icon" />
                  Phone Number
                </label>
                <div className="health-input-wrapper">
                  <span className="health-country-code">+251</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, ''));
                      setError('');
                    }}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="97 695 7649"
                    maxLength="9"
                  />
                </div>
              </div>

              {/* OTP Input - Always Visible */}
              <div className={`health-input-group ${focusedField === 'otp' ? 'focused' : ''}`}>
                <label>
                  <FiLock className="health-input-icon" />
                  OTP Code
                </label>
                <div className="health-input-wrapper">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, '').slice(0, 4));
                      setError('');
                    }}
                    onFocus={() => setFocusedField('otp')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter 4-digit OTP"
                    maxLength="4"
                  />
                </div>
                <p className="health-input-hint">Use 1234 for all test accounts</p>
              </div>

              {/* Terms & Conditions */}
              <div className="health-checkbox-group">
                <label className="health-checkbox">
                  <input
                    type="checkbox"
                    checked={agreeTnc}
                    onChange={(e) => {
                      setAgreeTnc(e.target.checked);
                      setError('');
                    }}
                  />
                  <span className="health-checkmark"></span>
                  <span className="health-checkbox-text">
                    I agree to the <Link to="/terms">Terms & Conditions</Link>
                  </span>
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="health-login-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="health-loading-spinner"></span>
                ) : (
                  <>
                    Continue
                    <FiArrowRight className="health-button-icon" />
                  </>
                )}
              </button>

              {/* Signup Link */}
              <div className="health-signup-link">
                Don't have an account?{' '}
                <Link to="#">
                  Send OK to ####
                  <FiArrowRight />
                </Link>
              </div>
            </form>

            {/* Quick Info */}
            <div className="health-quick-info">
              <span>🏠 One account for the whole family. Switch between Kids, Adult, and Senior modes anytime!</span>
            </div>

            {/* Health Quote */}
            <div className="health-quote">
              <span className="health-quote-icon">🌿</span>
              <p>"A healthy outside starts from the inside"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}