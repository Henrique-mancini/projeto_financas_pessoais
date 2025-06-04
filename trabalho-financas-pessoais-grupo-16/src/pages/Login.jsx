import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('token', 'fake-token');
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}