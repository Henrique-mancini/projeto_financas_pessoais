import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { FinanceiroProvider } from './contexts/FinanceiroContext';

export default function App() {
  const isAutenticado = !!localStorage.getItem('token');

  return (
    <FinanceiroProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={isAutenticado ? '/dashboard' : '/login'} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={isAutenticado ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </FinanceiroProvider>
  );
}