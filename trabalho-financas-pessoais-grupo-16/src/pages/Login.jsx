import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login(); 
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <button onClick={handleLogin} style={{ padding: '0.5rem 1rem', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Entrar
      </button>
    </div>
  );
}
