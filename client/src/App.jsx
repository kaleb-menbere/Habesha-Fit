// src/App.jsx

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';
import Login from './pages/Login';
import UserOnboarding from './pages/UserOnboarding';
import Home from './pages/Home';
import WorkoutPage from './pages/WorkoutPage';
import GoalsPage from './pages/GoalsPage';
import ProgressPage from './pages/ProgressPage';
import HealthPage from './pages/HealthPage';
import GuidesPage from './pages/GuidesPage';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DailyWorkoutPage from './pages/DailyWorkoutPage';

function App() {
  const { user, profileCompleted } = useAuthStore();

  return (
    <HashRouter>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#2d2d2d',
            color: '#fff',
          },
          success: {
            style: {
              background: '#078930',
            },
          },
          error: {
            style: {
              background: '#da121a',
            },
          },
        }}
      />
      
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/" /> : <Login />
        } />
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <UserOnboarding />
          </ProtectedRoute>
        } />
        <Route path="/daily-workout" element={
          <ProtectedRoute>
            {!profileCompleted ? <Navigate to="/onboarding" /> : <DailyWorkoutPage />}
          </ProtectedRoute>
        } />
        <Route path="/workouts" element={
          <ProtectedRoute>
            {!profileCompleted ? <Navigate to="/onboarding" /> : <WorkoutPage />}
          </ProtectedRoute>
        } />
        <Route path="/goals" element={
          <ProtectedRoute>
            {!profileCompleted ? <Navigate to="/onboarding" /> : <GoalsPage />}
          </ProtectedRoute>
        } />
        <Route path="/progress" element={
          <ProtectedRoute>
            {!profileCompleted ? <Navigate to="/onboarding" /> : <ProgressPage />}
          </ProtectedRoute>
        } />
        <Route path="/health" element={
          <ProtectedRoute>
            {!profileCompleted ? <Navigate to="/onboarding" /> : <HealthPage />}
          </ProtectedRoute>
        } />
        <Route path="/guides" element={
          <ProtectedRoute>
            {!profileCompleted ? <Navigate to="/onboarding" /> : <GuidesPage />}
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            {!profileCompleted ? <Navigate to="/onboarding" /> : <SettingsPage />}
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            {!profileCompleted ? <Navigate to="/onboarding" /> : <Home />}
          </ProtectedRoute>
        } />
      </Routes>
    </HashRouter>
  );
}

export default App;