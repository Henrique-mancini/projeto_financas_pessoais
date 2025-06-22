import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Cadastro from './pages/Cadastro';
import Parcelas from './pages/Parcelas';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FinanceiroProvider } from './contexts/FinanceiroContext';
import { ParcelasProvider } from './contexts/ParcelasContext';

function Rotas() {
  const { autenticado } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={autenticado ? '/dashboard' : '/login'} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/dashboard"
        element={autenticado ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/parcelas"
        element={autenticado ? <Parcelas /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FinanceiroProvider>
        <ParcelasProvider>
          <Router>
            <Rotas />
          </Router>
        </ParcelasProvider>
      </FinanceiroProvider>
    </AuthProvider>
  );
}