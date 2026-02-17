import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiCheckCircle, FiAlertCircle, 
  FiFileText, FiShield, FiLock, FiUserCheck,
  FiDatabase, FiMail, FiGlobe, FiClock
} from 'react-icons/fi';
import { BiHappy, BiSolidContact } from 'react-icons/bi';
import useAuthStore from '../store/authStore';
import './Terms.css';

export default function Terms() {
  const navigate = useNavigate();
  const { user } = useAuthStore(); // Get user from auth store
  const [accepted, setAccepted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  // If user is logged in, they have already agreed
  useEffect(() => {
    if (user) {
      setAccepted(true);
    }
  }, [user]);

  // Track scroll position for "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('.terms-section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAccept = () => {
    if (accepted) {
      // Navigate back to previous page or home
      navigate(-1);
    }
  };

  const lastUpdated = "February 15, 2025";

  return (
    <div className="terms-container">
      {/* Background Decoration */}
      <div className="terms-bg">
        <div className="terms-circle circle-1"></div>
        <div className="terms-circle circle-2"></div>
        <div className="terms-circle circle-3"></div>
      </div>

      {/* Header */}
      <div className="terms-header">
        <button className="terms-back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>
        <div className="terms-logo">
          <span className="terms-logo-icon">🌿</span>
          <span className="terms-logo-text">Habesha Fit</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="terms-content">
        <div className="terms-sidebar">
          <div className="sidebar-sticky">
            <h3>Contents</h3>
            <ul className="terms-nav">
              <li className={activeSection === 'intro' ? 'active' : ''}>
                <button onClick={() => scrollToSection('intro')}>Introduction</button>
              </li>
              <li className={activeSection === 'agreement' ? 'active' : ''}>
                <button onClick={() => scrollToSection('agreement')}>User Agreement</button>
              </li>
              <li className={activeSection === 'account' ? 'active' : ''}>
                <button onClick={() => scrollToSection('account')}>Account Terms</button>
              </li>
              <li className={activeSection === 'privacy' ? 'active' : ''}>
                <button onClick={() => scrollToSection('privacy')}>Privacy Policy</button>
              </li>
              <li className={activeSection === 'data' ? 'active' : ''}>
                <button onClick={() => scrollToSection('data')}>Data Usage</button>
              </li>
              <li className={activeSection === 'health' ? 'active' : ''}>
                <button onClick={() => scrollToSection('health')}>Health Disclaimer</button>
              </li>
              <li className={activeSection === 'limitations' ? 'active' : ''}>
                <button onClick={() => scrollToSection('limitations')}>Limitations</button>
              </li>
              <li className={activeSection === 'changes' ? 'active' : ''}>
                <button onClick={() => scrollToSection('changes')}>Changes to Terms</button>
              </li>
              <li className={activeSection === 'contact' ? 'active' : ''}>
                <button onClick={() => scrollToSection('contact')}>Contact Us</button>
              </li>
            </ul>
            
            <div className="last-updated">
              <FiClock />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>

        <div className="terms-main">
          <div className="terms-paper">
            <div className="terms-title-section">
              <h1>
                <FiFileText className="title-icon" />
                Terms & Conditions
              </h1>
              <p className="terms-subtitle">
                Please read these terms carefully before using Habesha Fit
              </p>
              {user && (
                <div className="user-welcome-badge">
                  <FiUserCheck /> Welcome back, {user?.firstName || 'User'}!
                </div>
              )}
            </div>

            {/* Introduction */}
            <section id="intro" className="terms-section">
              <h2>1. Introduction</h2>
              <div className="section-content">
                <p>
                  Welcome to Habesha Fit ("Company," "we," "our," "us"). By accessing or using our mobile 
                  application and website (collectively, the "Platform"), you agree to be bound by these 
                  Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use 
                  our Platform.
                </p>
                <p>
                  Habesha Fit provides fitness and wellness services, including workout programs, exercise 
                  tutorials, progress tracking, and health-related content tailored for different age groups 
                  including Kids, Teenage, Adult, and Elderly users.
                </p>
                <div className="info-box">
                  <FiAlertCircle className="info-icon" />
                  <div>
                    <strong>Important:</strong> By using Habesha Fit, you acknowledge that you have read, 
                    understood, and agree to be bound by these Terms.
                  </div>
                </div>
              </div>
            </section>

            {/* User Agreement */}
            <section id="agreement" className="terms-section">
              <h2>2. User Agreement</h2>
              <div className="section-content">
                <p>By creating an account or using our Platform, you represent and warrant that:</p>
                <ul className="terms-list">
                  <li>
                    <FiCheckCircle className="list-icon" />
                    You are at least 4 years of age (or the minimum age in your jurisdiction)
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    You have the legal capacity to enter into a binding agreement
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    All information you provide is accurate, current, and complete
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    You will maintain the security of your account credentials
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    You are responsible for all activities that occur under your account
                  </li>
                </ul>

                <h3>Age-Specific Provisions</h3>
                <div className="age-cards">
                  <div className="age-card kids-card">
                    <h4>🧒 Kids (4-12 years)</h4>
                    <p>Parental or guardian supervision is required for all users in this age group. Parents/guardians are responsible for overseeing their child's account and activities.</p>
                  </div>
                  <div className="age-card teen-card">
                    <h4>🧑 Teenage (13-19 years)</h4>
                    <p>Teenagers may use the Platform with parental consent. Parents/guardians may monitor their teen's usage and progress.</p>
                  </div>
                  <div className="age-card adult-card">
                    <h4>👨 Adult (20-55 years)</h4>
                    <p>Adult users have full account control and responsibility for their usage and health decisions.</p>
                  </div>
                  <div className="age-card elderly-card">
                    <h4>👴 Elderly (55+ years)</h4>
                    <p>Elderly users should consult with their healthcare provider before starting any exercise program.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Account Terms */}
            <section id="account" className="terms-section">
              <h2>3. Account Terms</h2>
              <div className="section-content">
                <div className="feature-grid">
                  <div className="feature-item">
                    <FiUserCheck className="feature-icon" />
                    <h4>Account Creation</h4>
                    <p>You must provide accurate information when creating an account. One person may not maintain multiple accounts.</p>
                  </div>
                  <div className="feature-item">
                    <FiLock className="feature-icon" />
                    <h4>Account Security</h4>
                    <p>You are responsible for maintaining the security of your account. Notify us immediately of any unauthorized use.</p>
                  </div>
                  <div className="feature-item">
                    <FiShield className="feature-icon" />
                    <h4>Account Termination</h4>
                    <p>We reserve the right to suspend or terminate accounts that violate these Terms or for any other reason at our discretion.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy Policy */}
            <section id="privacy" className="terms-section">
              <h2>4. Privacy Policy</h2>
              <div className="section-content">
                <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information:</p>
                <ul className="terms-list">
                  <li>
                    <FiCheckCircle className="list-icon" />
                    We collect personal information you provide (name, age, gender, fitness data)
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    We use this information to personalize your experience and improve our services
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    We do not sell your personal information to third parties
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    We implement security measures to protect your data
                  </li>
                </ul>
                <p className="note">
                  <FiAlertCircle /> For complete details, please review our full Privacy Policy.
                </p>
              </div>
            </section>

            {/* Data Usage */}
            <section id="data" className="terms-section">
              <h2>5. Data Usage & Storage</h2>
              <div className="section-content">
                <div className="data-cards">
                  <div className="data-card">
                    <FiDatabase className="data-icon" />
                    <h4>Workout Data</h4>
                    <p>Your workout history, progress, and achievements are stored to provide you with personalized recommendations and track your fitness journey.</p>
                  </div>
                  <div className="data-card">
                    <FiDatabase className="data-icon" />
                    <h4>Health Information</h4>
                    <p>Any health information you provide (age, fitness level, goals) is used solely to tailor workout recommendations to your needs.</p>
                  </div>
                  <div className="data-card">
                    <FiDatabase className="data-icon" />
                    <h4>Local Storage</h4>
                    <p>We use local storage to save your preferences and progress. You can clear this data at any time through your browser settings.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Health Disclaimer */}
            <section id="health" className="terms-section">
              <h2>6. Health Disclaimer</h2>
              <div className="section-content">
                <div className="warning-box">
                  <FiAlertCircle className="warning-icon" />
                  <div>
                    <strong>IMPORTANT HEALTH WARNING:</strong>
                    <p>Please consult with a physician before beginning any exercise program. The exercises and workouts provided by Habesha Fit are for informational purposes only and are not a substitute for professional medical advice.</p>
                  </div>
                </div>
                
                <h3>You acknowledge that:</h3>
                <ul className="terms-list">
                  <li>
                    <FiCheckCircle className="list-icon" />
                    Exercise involves risks of injury, and you participate at your own risk
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    You should stop immediately if you experience pain, dizziness, or discomfort
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    Our workouts are general recommendations and may not be suitable for everyone
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    Elderly users and those with medical conditions should exercise with caution
                  </li>
                </ul>
              </div>
            </section>

            {/* Limitations */}
            <section id="limitations" className="terms-section">
              <h2>7. Limitations of Liability</h2>
              <div className="section-content">
                <p>To the maximum extent permitted by law, Habesha Fit shall not be liable for:</p>
                <ul className="terms-list">
                  <li>
                    <FiCheckCircle className="list-icon" />
                    Any indirect, incidental, or consequential damages
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    Loss of profits, data, or business opportunities
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    Injuries sustained while using our Platform or following our workouts
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    Third-party content or services linked from our Platform
                  </li>
                </ul>
              </div>
            </section>

            {/* Changes to Terms */}
            <section id="changes" className="terms-section">
              <h2>8. Changes to Terms</h2>
              <div className="section-content">
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of 
                  significant changes by:
                </p>
                <ul className="terms-list">
                  <li>
                    <FiCheckCircle className="list-icon" />
                    Posting the updated Terms on our Platform
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    Sending an email notification (if you have provided an email)
                  </li>
                  <li>
                    <FiCheckCircle className="list-icon" />
                    Displaying a notice upon your next login
                  </li>
                </ul>
                <p>Continued use of Habesha Fit after changes constitutes acceptance of the modified Terms.</p>
              </div>
            </section>

            {/* Contact Us */}
            <section id="contact" className="terms-section">
              <h2>9. Contact Us</h2>
              <div className="section-content">
                <p>If you have any questions about these Terms, please contact us:</p>
                
                <div className="contact-grid">
                  <div className="contact-item">
                    <FiMail className="contact-icon" />
                    <div>
                      <h4>Email</h4>
                      <a href="mailto:support@habeshafit.com">support@habeshafit.com</a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <BiSolidContact className="contact-icon" />
                    <div>
                      <h4>Contact Form</h4>
                      <p>Available in the app under Settings → Help & Support</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <FiGlobe className="contact-icon" />
                    <div>
                      <h4>Website</h4>
                      <a href="#" onClick={(e) => e.preventDefault()}>www.habeshafit.com</a>
                    </div>
                  </div>
                </div>
                
                <div className="address-box">
                  <h4>📍 Office Address</h4>
                  <p>
                    Habesha Fit<br />
                    123 Fitness Street<br />
                    Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>
            </section>

            {/* Acceptance Section */}
            <div className="terms-acceptance">
              <div className="acceptance-box">
                {!user ? (
                  // Show checkbox only for non-logged-in users
                  <>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                      />
                      <span className="checkbox-custom"></span>
                      <span className="checkbox-text">
                        I have read and agree to the Terms & Conditions and Privacy Policy
                      </span>
                    </label>
                    
                    <button 
                      className={`accept-button ${accepted ? 'active' : ''}`}
                      onClick={handleAccept}
                      disabled={!accepted}
                    >
                      {accepted ? 'Continue' : 'Please Accept Terms to Continue'}
                    </button>
                  </>
                ) : (
                  // Show message for logged-in users
                  <>
                    <div className="already-accepted">
                      <BiHappy className="accepted-icon" />
                      <div>
                        <h4>Thank you for using Health fit</h4>
                      </div>
                    </div>
                    
                    <button 
                      className="accept-button active return-button"
                      onClick={handleAccept}
                    >
                      Return to App
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}

      {/* Footer */}
      <div className="terms-footer">
        <div className="footer-content">
          <p>© 2025 Habesha Fit. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}