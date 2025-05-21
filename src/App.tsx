import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, App as AntApp, theme } from 'antd';
import { getSession } from './utils/supabase';
import { AuthProvider } from './contexts/AuthContext';

// Layout
import MainLayout from './components/layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Tenants from './pages/Tenants';
import TenantDetails from './pages/TenantDetails';
import Maintenance from './pages/Maintenance';
import Financial from './pages/Financial';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import './App.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await getSession();
      setAuthenticated(!!data.session);
      setLoading(false);
    };
    
    checkSession();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#2E5F85',
          borderRadius: 4,
        },
      }}
    >
      <AntApp>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={authenticated ? <Navigate to="/" /> : <Login />} />
              
              {/* Protected Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/properties" element={authenticated ? <Properties /> : <Navigate to="/login" />} />
                <Route path="/properties/:id" element={authenticated ? <PropertyDetails /> : <Navigate to="/login" />} />
                <Route path="/tenants" element={authenticated ? <Tenants /> : <Navigate to="/login" />} />
                <Route path="/tenants/:id" element={authenticated ? <TenantDetails /> : <Navigate to="/login" />} />
                <Route path="/maintenance" element={authenticated ? <Maintenance /> : <Navigate to="/login" />} />
                <Route path="/financial" element={authenticated ? <Financial /> : <Navigate to="/login" />} />
                <Route path="/documents" element={authenticated ? <Documents /> : <Navigate to="/login" />} />
                <Route path="/settings" element={authenticated ? <Settings /> : <Navigate to="/login" />} />
              </Route>
              
              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
