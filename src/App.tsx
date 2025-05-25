import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, App as AntApp, theme } from 'antd';
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
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} /> {/* Keep login page for now, can be removed later if not needed */}
            
            {/* Routes accessible without login */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/tenants" element={<Tenants />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            
            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
