import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiUser, FiCalendar, FiUsers, FiClock, FiInfo } from 'react-icons/fi';
import { RiCalendarLine } from 'react-icons/ri';
import useAuthStore from '../store/authStore';
import './UserOnboarding.css';

export default function UserOnboarding() {
  const navigate = useNavigate();
  const { updateUserProfile } = useAuthStore();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [birthYears, setBirthYears] = useState({ gregorian: '', ethiopian: '' });
  const [calculatedCategory, setCalculatedCategory] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});

  // Age validation constants
  const MIN_AGE = 4;
  const MAX_AGE = 120; // Realistic maximum age
  const MAX_NAME_LENGTH = 50;

  // Calculate birth years and category when age changes
  useEffect(() => {
    if (formData.age && !isNaN(parseInt(formData.age))) {
      const ageNum = parseInt(formData.age);
      
      if (ageNum >= MIN_AGE && ageNum <= MAX_AGE) {
        const currentYear = new Date().getFullYear();
        const currentEthiopianYear = currentYear - 8; // Rough conversion (Ethiopian year is about 7-8 years behind)
        
        // Calculate Gregorian birth year
        const gregorianYear = currentYear - ageNum;
        
        // Calculate Ethiopian birth year (approximate)
        // Ethiopian New Year is in September, so we need to be careful with months
        const today = new Date();
        const month = today.getMonth(); // 0-11
        
        let ethiopianYear;
        if (month >= 8) { // September or later
          ethiopianYear = currentEthiopianYear - ageNum;
        } else {
          ethiopianYear = currentEthiopianYear - ageNum - 1;
        }
        
        setBirthYears({
          gregorian: gregorianYear,
          ethiopian: Math.abs(ethiopianYear) // Ensure positive number
        });

        // Automatically calculate category based on age
        if (ageNum < 13) {
          setCalculatedCategory({
            id: 'kids',
            title: 'Kids',
            ageRange: '4 - 12',
            icon: '🧒',
            description: 'Fun, playful workouts for young ones',
            color: '#FF9800',
            features: ['Play-based exercises', 'Fun animations', 'Building healthy habits']
          });
        } else if (ageNum >= 13 && ageNum <= 19) {
          setCalculatedCategory({
            id: 'teenage',
            title: 'Teenage',
            ageRange: '13 - 19',
            icon: '🧑',
            description: 'Active growth and development focus',
            color: '#9C27B0',
            features: ['Sports performance', 'Strength building', 'Flexibility']
          });
        } else if (ageNum >= 20 && ageNum <= 55) {
          setCalculatedCategory({
            id: 'adult',
            title: 'Adult',
            ageRange: '20 - 55',
            icon: '👨',
            description: 'Full range of fitness programs',
            color: '#4CAF50',
            features: ['Weight management', 'Muscle tone', 'Cardio fitness']
          });
        } else if (ageNum > 55 && ageNum <= MAX_AGE) {
          setCalculatedCategory({
            id: 'elderly',
            title: 'Elderly',
            ageRange: '55+',
            icon: '👴',
            description: 'Gentle, low-impact exercises',
            color: '#2196F3',
            features: ['Low impact', 'Joint health', 'Balance & stability']
          });
        }
      } else {
        setBirthYears({ gregorian: '', ethiopian: '' });
        setCalculatedCategory(null);
      }
    } else {
      setBirthYears({ gregorian: '', ethiopian: '' });
      setCalculatedCategory(null);
    }
  }, [formData.age]);

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (formData.firstName.length > MAX_NAME_LENGTH) {
      newErrors.firstName = `First name cannot exceed ${MAX_NAME_LENGTH} characters`;
    } else if (!/^[a-zA-Z\s\-']+$/.test(formData.firstName)) {
      newErrors.firstName = 'First name can only contain letters, spaces, hyphens and apostrophes';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    } else if (formData.lastName.length > MAX_NAME_LENGTH) {
      newErrors.lastName = `Last name cannot exceed ${MAX_NAME_LENGTH} characters`;
    } else if (!/^[a-zA-Z\s\-']+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last name can only contain letters, spaces, hyphens and apostrophes';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum)) {
        newErrors.age = 'Please enter a valid number';
      } else if (ageNum < MIN_AGE) {
        newErrors.age = `You must be at least ${MIN_AGE} years old to use this app`;
      } else if (ageNum > MAX_AGE) {
        newErrors.age = `Please enter a valid age (maximum ${MAX_AGE} years)`;
      }
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for name fields to prevent numbers and special characters
    if (name === 'firstName' || name === 'lastName') {
      // Allow only letters, spaces, hyphens, and apostrophes
      const sanitizedValue = value.replace(/[^a-zA-Z\s\-']/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFieldBlur = (fieldName) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateUserProfile({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      age: parseInt(formData.age),
      gender: formData.gender,
      category: calculatedCategory?.id,
      birthYears: birthYears,
      onboardingCompleted: true,
      joinedAt: new Date().toISOString(),
      fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`
    });
    
    // Redirect to home page with personalized welcome
    navigate('/', { 
      state: { 
        welcome: true, 
        user: {
          ...formData,
          birthYears,
          category: calculatedCategory?.title
        },
        message: `Welcome ${formData.firstName}! We've personalized your experience for ${calculatedCategory?.title}`
      }
    });
  };

  // Check if form is complete and valid
  const isFormValid = () => {
    return (
      formData.age && 
      parseInt(formData.age) >= MIN_AGE && 
      parseInt(formData.age) <= MAX_AGE &&
      formData.firstName.trim().length >= 2 &&
      formData.firstName.trim().length <= MAX_NAME_LENGTH &&
      formData.lastName.trim().length >= 2 &&
      formData.lastName.trim().length <= MAX_NAME_LENGTH &&
      formData.gender &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <div className="onboarding-simple">
      {/* Decorative Background */}
      <div className="simple-bg">
        <div className="simple-circle circle-1"></div>
        <div className="simple-circle circle-2"></div>
        <div className="simple-circle circle-3"></div>
      </div>

      {/* Main Content */}
      <div className="simple-container">
        {/* Header */}
        <div className="simple-header">
          <div className="header-icon">👋</div>
          <h1>Welcome to Habesha Fit!</h1>
          <p>Let's get to know you better</p>
        </div>

        {/* Personal Information Form */}
        <div className="personal-info-section">
          <h3 className="section-title">Personal Information</h3>
          
          <div className="form-row">
            {/* First Name */}
            <div className="form-group">
              <label htmlFor="firstName">
                <FiUser className="input-icon" />
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('firstName')}
                placeholder="Enter your first name"
                maxLength={MAX_NAME_LENGTH}
                className={touchedFields.firstName && errors.firstName ? 'error' : ''}
              />
              {touchedFields.firstName && errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
              <span className="character-count">
                {formData.firstName.length}/{MAX_NAME_LENGTH}
              </span>
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label htmlFor="lastName">
                <FiUser className="input-icon" />
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('lastName')}
                placeholder="Enter your last name"
                maxLength={MAX_NAME_LENGTH}
                className={touchedFields.lastName && errors.lastName ? 'error' : ''}
              />
              {touchedFields.lastName && errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
              <span className="character-count">
                {formData.lastName.length}/{MAX_NAME_LENGTH}
              </span>
            </div>
          </div>

          <div className="form-row">
            {/* Age */}
            <div className="form-group">
              <label htmlFor="age">
                <FiCalendar className="input-icon" />
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('age')}
                placeholder={`${MIN_AGE} - ${MAX_AGE}`}
                min={MIN_AGE}
                max={MAX_AGE}
                className={touchedFields.age && errors.age ? 'error' : ''}
              />
              {touchedFields.age && errors.age && (
                <span className="error-message">{errors.age}</span>
              )}
              
              {/* Birth Years Display - Shown directly under age input */}
              {birthYears.gregorian && !errors.age && (
                <div className="birth-years-under-age">
                  <div className="birth-year-row">
                    <span className="birth-year-label">
                      <RiCalendarLine /> Gregorian:
                    </span>
                    <span className="birth-year-value">{birthYears.gregorian}</span>
                  </div>
                  <div className="birth-year-row">
                    <span className="birth-year-label">
                      <RiCalendarLine /> Ethiopian:
                    </span>
                    <span className="birth-year-value ethiopian">{birthYears.ethiopian}</span>
                  </div>
                  <div className="birth-year-info">
                    <FiInfo className="info-icon" />
                    <span>Approximate Ethiopian year</span>
                  </div>
                </div>
              )}
            </div>

            {/* Gender */}
            <div className="form-group">
              <label>
                <FiUsers className="input-icon" />
                Gender
              </label>
              <div className="gender-options">
                <label className={`gender-option ${formData.gender === 'male' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('gender')}
                  />
                  <span className="gender-emoji">👨</span>
                  <span>Male</span>
                </label>
                <label className={`gender-option ${formData.gender === 'female' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('gender')}
                  />
                  <span className="gender-emoji">👩</span>
                  <span>Female</span>
                </label>
              </div>
              {touchedFields.gender && errors.gender && (
                <span className="error-message">{errors.gender}</span>
              )}
            </div>
          </div>
        </div>

        {/* Age warning if outside range */}
        {formData.age && (parseInt(formData.age) < MIN_AGE || parseInt(formData.age) > MAX_AGE) && (
          <div className="age-warning-message">
            <FiInfo className="warning-icon" />
            <span>
              {parseInt(formData.age) < MIN_AGE 
                ? `Sorry, you need to be at least ${MIN_AGE} years old to use this app.` 
                : `Please enter a valid age between ${MIN_AGE} and ${MAX_AGE}.`}
            </span>
          </div>
        )}

        {/* Continue Button */}
        <button
          className={`continue-btn ${isFormValid() ? 'active' : ''}`}
          onClick={handleSubmit}
          disabled={isSubmitting || !isFormValid()}
        >
          {isSubmitting ? (
            <span className="simple-spinner"></span>
          ) : (
            <>
              Start My Journey
              <FiArrowRight className="btn-icon" />
            </>
          )}
        </button>

        {/* Quick Message */}
        <p className="simple-footer">
          Don't worry, you can always adjust your preferences later
        </p>
      </div>
    </div>
  );
}