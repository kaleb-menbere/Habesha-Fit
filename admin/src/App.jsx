import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthStore from './store/authStore';

// Layout Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';
import CreateUser from './pages/CreateUser';
import Settings from './pages/Settings';

// Styles
import './App.css';

function App() {
  const { loadAdmin, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdmin();
    setLoading(false);
  }, [loadAdmin]);

  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;