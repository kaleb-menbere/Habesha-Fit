import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Page 1: Basic Info
  age: {
    type: Number,
    required: true,
    min: 13,
    max: 100
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    required: true
  },
  height: {
    value: Number,
    unit: {
      type: String,
      enum: ['cm', 'ft']
    }
  },
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['kg', 'lbs']
    }
  },
  
  // Page 2: Fitness Background
  fitnessLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  weeklyAvailability: {
    type: Number,
    min: 1,
    max: 7,
    default: 3
  },
  minutesPerSession: {
    type: Number,
    enum: [15, 30, 45, 60, 90],
    default: 30
  },
  experience: {
    type: String,
    enum: ['never', '0-6-months', '6-12-months', '1+ years'],
    default: 'never'
  },
  equipment: [{
    type: String,
    enum: ['none', 'mat', 'dumbbells', 'resistance-bands', 'kettlebell', 'full-gym']
  }],
  
  // Page 3: Goals & Body Type
  bodyType: {
    type: String,
    enum: ['skinny', 'average', 'overweight', 'obese'],
    required: true
  },
  primaryGoal: {
    type: String,
    enum: [
      'lose-weight', 
      'build-muscle', 
      'get-stronger', 
      'pain-relief', 
      'general-health',
      'improve-flexibility',
      'posture-correction'
    ],
    required: true
  },
  specificGoals: [{
    type: String,
    enum: [
      'abs', 'arms', 'chest', 'legs', 'glutes', 
      'back', 'full-body', 'cardio', 'back-pain',
      'neck-pain', 'shoulder-pain', 'knee-pain'
    ]
  }],
  limitations: [{
    type: String,
    enum: [
      'knee-pain', 'lower-back-pain', 'shoulder-injury',
      'neck-pain', 'wrist-pain', 'hip-pain', 'none'
    ]
  }],
  
  // Preferences
  preferredLanguage: {
    type: String,
    enum: ['english', 'amharic', 'both'],
    default: 'english'
  },
  
  // Weekly Goal (set in Page 4)
  weeklyGoal: {
    targetDays: {
      type: Number,
      min: 1,
      max: 7,
      default: 3
    },
    currentStreak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    },
    weeklyProgress: [{
      week: Number,
      year: Number,
      completedDays: {
        type: Number,
        default: 0
      },
      targetDays: Number,
      achieved: {
        type: Boolean,
        default: false
      }
    }]
  },
  
  completedOnboarding: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;