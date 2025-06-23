import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: '#fff',
      textAlign: 'center',
      padding: '0.8rem',
      marginTop: 'auto'
    }}>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} Controle Financeiro</p>
    </footer>
  );
}
