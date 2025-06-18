import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: '#ecf0f1',
      padding: '1rem',
      textAlign: 'center',
      marginTop: '2rem'
    }}>
      <p>© {new Date().getFullYear()} Controle Financeiro Pessoal</p>
    </footer>
  );
}