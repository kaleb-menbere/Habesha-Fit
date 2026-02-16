import express from 'express';
import { body, validationResult } from 'express-validator';
import Profile from '../models/Profile.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/profile
// @desc    Create or update full profile (called after Page 4)
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      // Page 1
      age, gender, height, weight,
      // Page 2
      fitnessLevel, weeklyAvailability, minutesPerSession,
      experience, equipment,
      // Page 3
      bodyType, primaryGoal, specificGoals, limitations,
      // Page 4
      weeklyGoal,
      // Preferences
      preferredLanguage
    } = req.body;

    // Check if profile exists
    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        {
          age, gender, height, weight,
          fitnessLevel, weeklyAvailability, minutesPerSession,
          experience, equipment,
          bodyType, primaryGoal, specificGoals, limitations,
          preferredLanguage,
          weeklyGoal: {
            targetDays: weeklyGoal,
            currentStreak: profile.weeklyGoal?.currentStreak || 0,
            longestStreak: profile.weeklyGoal?.longestStreak || 0
          },
          completedOnboarding: true
        },
        { new: true }
      );
    } else {
      // Create new profile
      profile = await Profile.create({
        user: req.user._id,
        age, gender, height, weight,
        fitnessLevel, weeklyAvailability, minutesPerSession,
        experience, equipment,
        bodyType, primaryGoal, specificGoals, limitations,
        preferredLanguage,
        weeklyGoal: {
          targetDays: weeklyGoal,
          currentStreak: 0,
          longestStreak: 0
        },
        completedOnboarding: true
      });
    }

    res.status(201).json({
      success: true,
      profile,
      message: 'Profile completed successfully!'
    });
  } catch (error) {
    console.error('Profile creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/profile/page1
// @desc    Save Page 1 (Basic Info)
// @access  Private
router.post('/page1', protect, async (req, res) => {
  try {
    const { age, gender, height, weight } = req.body;
    
    let profile = await Profile.findOne({ user: req.user._id });
    
    if (profile) {
      profile.age = age;
      profile.gender = gender;
      profile.height = height;
      profile.weight = weight;
      await profile.save();
    } else {
      profile = await Profile.create({
        user: req.user._id,
        age, gender, height, weight,
        completedOnboarding: false
      });
    }
    
    res.json({ success: true, profile });
  } catch (error) {
    console.error('Page1 error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/profile/page2
// @desc    Save Page 2 (Fitness Background)
// @access  Private
router.post('/page2', protect, async (req, res) => {
  try {
    const { 
      fitnessLevel, weeklyAvailability, minutesPerSession,
      experience, equipment 
    } = req.body;
    
    const profile = await Profile.findOne({ user: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found. Complete page 1 first.' });
    }
    
    profile.fitnessLevel = fitnessLevel;
    profile.weeklyAvailability = weeklyAvailability;
    profile.minutesPerSession = minutesPerSession;
    profile.experience = experience;
    profile.equipment = equipment;
    
    await profile.save();
    
    res.json({ success: true, profile });
  } catch (error) {
    console.error('Page2 error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/profile/page3
// @desc    Save Page 3 (Goals & Body Type)
// @access  Private
router.post('/page3', protect, async (req, res) => {
  try {
    const { bodyType, primaryGoal, specificGoals, limitations } = req.body;
    
    const profile = await Profile.findOne({ user: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found. Complete page 1 first.' });
    }
    
    profile.bodyType = bodyType;
    profile.primaryGoal = primaryGoal;
    profile.specificGoals = specificGoals;
    profile.limitations = limitations;
    
    await profile.save();
    
    res.json({ success: true, profile });
  } catch (error) {
    console.error('Page3 error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/profile/progress
// @desc    Get user's onboarding progress
// @access  Private
router.get('/progress', protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    
    let progress = {
      page1Completed: false,
      page2Completed: false,
      page3Completed: false,
      page4Completed: false
    };
    
    if (profile) {
      progress.page1Completed = !!(profile.age && profile.gender);
      progress.page2Completed = !!(profile.fitnessLevel && profile.weeklyAvailability);
      progress.page3Completed = !!(profile.bodyType && profile.primaryGoal);
      progress.page4Completed = profile.completedOnboarding || false;
    }
    
    res.json(progress);
  } catch (error) {
    console.error('Progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;