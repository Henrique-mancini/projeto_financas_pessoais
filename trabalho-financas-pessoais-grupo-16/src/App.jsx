import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { FinanceiroProvider } from './contexts/FinanceiroContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Cadastro from './pages/Cadastro';

function Rotas() {
  const { autenticado } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={autenticado ? '/dashboard' : '/login'} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={autenticado ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FinanceiroProvider>
        <Router>
          <Rotas />
        </Router>
      </FinanceiroProvider>
    </AuthProvider>
  );
}