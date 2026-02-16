import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Mock users for testing (since we're not connecting to real backend yet)
const MOCK_USERS = {
  '976957649': { // Existing user
    _id: '1',
    name: 'John Doe',
    phone: '976957649',
    fitnessLevel: 'beginner',
    age: 28,
    gender: 'male',
    height: 175,
    weight: 70,
    primaryGoal: 'lose_weight',
    hasProfile: true,
    profileCompleted: true
  },
  '976957648': { // New user
    _id: '2',
    phone: '976957648',
    hasProfile: false,
    profileCompleted: false
  }
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      hasProfile: false,
      profileCompleted: false,
      isLoading: false,

      setAuth: (user, token, hasProfile, profileCompleted) => {
        set({ 
          user, 
          token, 
          hasProfile: hasProfile || false,
          profileCompleted: profileCompleted || false
        });
        
        // Set default axios header
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      },

      // Updated login to work with phone and OTP
      login: async (phone, otp) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // For testing - always accept 1234 as OTP
          if (otp !== '1234') {
            throw new Error('Invalid OTP');
          }

          // Check if user exists in mock database
          const existingUser = MOCK_USERS[phone];
          
          if (existingUser) {
            // Existing user found
            const { hasProfile, profileCompleted, ...userData } = existingUser;
            
            set({ 
              user: userData,
              token: 'mock-token-' + Date.now(),
              hasProfile: hasProfile || false,
              profileCompleted: profileCompleted || false,
              isLoading: false 
            });
            
            axios.defaults.headers.common['Authorization'] = `Bearer mock-token`;
            
            return { 
              success: true, 
              isNewUser: false,
              user: userData 
            };
          } else {
            // New user - create basic profile
            const newUser = {
              _id: 'new-' + Date.now(),
              phone: phone,
              name: '', // Will be filled during onboarding
              hasProfile: false,
              profileCompleted: false
            };
            
            set({ 
              user: newUser,
              token: 'mock-token-' + Date.now(),
              hasProfile: false,
              profileCompleted: false,
              isLoading: false 
            });
            
            axios.defaults.headers.common['Authorization'] = `Bearer mock-token`;
            
            return { 
              success: true, 
              isNewUser: true,
              user: newUser 
            };
          }
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error.message || 'Login failed' 
          };
        }
      },

      // Send OTP (simulated)
      sendOtp: async (phone) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Always succeed for testing
          set({ isLoading: false });
          return { 
            success: true, 
            message: 'OTP sent successfully' 
          };
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error.message || 'Failed to send OTP' 
          };
        }
      },

      // Complete user profile during onboarding
      completeProfile: async (profileData) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const currentUser = get().user;
          
          // Merge existing user data with new profile data
          const updatedUser = {
            ...currentUser,
            ...profileData,
            hasProfile: true,
            profileCompleted: true
          };
          
          set({ 
            user: updatedUser,
            hasProfile: true,
            profileCompleted: true,
            isLoading: false 
          });
          
          // In a real app, you would save this to your backend
          // await axios.post(`${API_URL}/users/profile`, profileData);
          
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error.message || 'Failed to save profile' 
          };
        }
      },

      // Update user profile
      updateUserProfile: (profileData) => {
        const currentUser = get().user;
        const updatedUser = {
          ...currentUser,
          ...profileData
        };
        
        set({ 
          user: updatedUser,
          profileCompleted: true
        });
        
        return { success: true };
      },

      // Check if user needs to complete onboarding
      needsOnboarding: () => {
        const state = get();
        return !state.profileCompleted || !state.hasProfile;
      },

      // Register with email (keeping for backward compatibility)
      register: async (name, email, password) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newUser = {
            _id: 'new-' + Date.now(),
            name,
            email,
            hasProfile: false,
            profileCompleted: false
          };
          
          set({ 
            user: newUser,
            token: 'mock-token-' + Date.now(),
            hasProfile: false,
            profileCompleted: false,
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error.message || 'Registration failed' 
          };
        }
      },

      logout: () => {
        set({ 
          user: null, 
          token: null,
          hasProfile: false,
          profileCompleted: false 
        });
        delete axios.defaults.headers.common['Authorization'];
      },

      updateProfileStatus: (hasProfile, completed) => {
        set({ 
          hasProfile, 
          profileCompleted: completed 
        });
      }
    }),
    {
      name: 'habesha-fit-auth',
      getStorage: () => localStorage
    }
  )
);

export default useAuthStore;