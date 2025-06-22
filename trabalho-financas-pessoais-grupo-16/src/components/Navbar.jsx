import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { logout, usuarioAtual } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.8rem' }}> Controle Financeiro</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            backgroundColor: '#3498db',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '0.4rem 0.8rem',
            cursor: 'pointer'
          }}
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate('/parcelas')}
          style={{
            backgroundColor: '#2980b9',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '0.4rem 0.8rem',
            cursor: 'pointer'
          }}
        >
          Parcelas
        </button>

        <span>👤 {usuarioAtual.split('@')[0]}</span>

        <button onClick={handleLogout} style={{
          backgroundColor: '#e74c3c',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '0.4rem 0.8rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}>
          Sair
        </button>
      </div>
    </header>
  );
}