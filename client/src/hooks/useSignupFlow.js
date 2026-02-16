import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const API_URL = 'http://localhost:5000/api';

export default function useSignupFlow() {
  const navigate = useNavigate();
  const { token, updateProfileStatus } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Page 1 - Basic Info
  const [page1Data, setPage1Data] = useState({
    age: '',
    gender: '',
    height: { value: '', unit: 'cm' },
    weight: { value: '', unit: 'kg' }
  });
  
  // Page 2 - Fitness Background
  const [page2Data, setPage2Data] = useState({
    fitnessLevel: 'beginner',
    weeklyAvailability: 3,
    minutesPerSession: 30,
    experience: 'never',
    equipment: []
  });
  
  // Page 3 - Goals & Body Type
  const [page3Data, setPage3Data] = useState({
    bodyType: '',
    primaryGoal: '',
    specificGoals: [],
    limitations: []
  });
  
  // Page 4 - Weekly Goal
  const [weeklyGoal, setWeeklyGoal] = useState(3);
  const [preferredLanguage, setPreferredLanguage] = useState('english');

  // Load saved progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile/progress`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const progress = response.data;
        if (progress.page1Completed) setCurrentPage(2);
        if (progress.page2Completed) setCurrentPage(3);
        if (progress.page3Completed) setCurrentPage(4);
        if (progress.page4Completed) navigate('/');
        
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    };
    
    if (token) loadProgress();
  }, [token, navigate]);

  // Save Page 1
  const savePage1 = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${API_URL}/profile/page1`,
        page1Data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentPage(2);
      toast.success('Progress saved!');
    } catch (error) {
      toast.error('Failed to save. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Save Page 2
  const savePage2 = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${API_URL}/profile/page2`,
        page2Data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentPage(3);
      toast.success('Fitness profile saved!');
    } catch (error) {
      toast.error('Failed to save. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Save Page 3
  const savePage3 = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${API_URL}/profile/page3`,
        page3Data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentPage(4);
      toast.success('Goals saved!');
    } catch (error) {
      toast.error('Failed to save. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Complete Profile
  const completeProfile = async () => {
    setIsLoading(true);
    try {
      const fullProfile = {
        ...page1Data,
        ...page2Data,
        ...page3Data,
        weeklyGoal,
        preferredLanguage
      };
      
      await axios.post(
        `${API_URL}/profile`,
        fullProfile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      updateProfileStatus(true, true);
      toast.success('እንኳን ደህና መጡ! Welcome to Habesha Fit!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to complete profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentPage,
    isLoading,
    page1Data,
    setPage1Data,
    page2Data,
    setPage2Data,
    page3Data,
    setPage3Data,
    weeklyGoal,
    setWeeklyGoal,
    preferredLanguage,
    setPreferredLanguage,
    savePage1,
    savePage2,
    savePage3,
    completeProfile
  };
}