import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const isAutenticado = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAutenticado ? '/dashboard' : '/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAutenticado ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}