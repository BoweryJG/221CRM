import React from 'react'; // Removed useState, useEffect, Navigate
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, App as AntApp, theme } from 'antd';
import { AuthProvider } from './contexts/AuthContext'; // Import the mock AuthProvider
// Layout
import MainLayout from './components/layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Financial from './pages/Financial';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import './App.css';

const App: React.FC = () => {
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
        <AuthProvider> {/* Wrap with AuthProvider */}
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              {/* All routes are now accessible */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/tenants" element={<Tenants />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
