import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { App as AntApp, Spin } from 'antd';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginModal from './components/LoginModal';
// Layout
import MainLayout from './components/layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Maintenance from './pages/Maintenance';
import Financial from './pages/Financial';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import './App.css';
import './styles/mobile.css';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Spin size="large" />
      </div>
    );
  }
  
  return (
    <>
      <LoginModal visible={!user} />
      {user ? children : null}
    </>
  );
};

// App Routes Component
const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Router>
      <Routes>
        {/* Redirect to dashboard if already logged in */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        
        {/* Protected routes */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AntApp>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AntApp>
    </ThemeProvider>
  );
};

export default App;
