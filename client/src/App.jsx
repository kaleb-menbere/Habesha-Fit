import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';
import Login from './pages/Login';
import UserOnboarding from './pages/UserOnboarding'; // Add this
import Home from './pages/Home';
import ProtectedRoute from './components/auth/ProtectedRoute';
import WorkoutPage from './pages/WorkoutPage';

function App() {
  const { user, token, profileCompleted } = useAuthStore();

  return (
    <>
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
       <Route
          path="/workouts"
          element={
            <ProtectedRoute>
              <WorkoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={
          <ProtectedRoute>
            {!profileCompleted ? <Navigate to="/onboarding" /> : <Home />}
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;