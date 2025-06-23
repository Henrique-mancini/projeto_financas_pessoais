import React from 'react';

export default function CardResumo({ titulo, valor, cor }) {
  return (
    <div
      style={{
        backgroundColor: cor,
        color: '#fff',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        flex: 1,
        minWidth: '220px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'transform 0.3s ease',
        cursor: 'default'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <h3>{titulo}</h3>
      <p style={{ fontSize: '1.6rem', marginTop: '0.5rem' }}>
        R$ {valor.toFixed(2)}
      </p>
    </div>
  );
}