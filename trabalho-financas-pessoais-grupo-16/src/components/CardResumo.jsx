import React from 'react';

export default function CardResumo({ titulo, valor, cor }) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        minWidth: '200px',
        flex: 1,
      }}
    >
      <h4 style={{ marginBottom: '0.5rem', color: '#666' }}>{titulo}</h4>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: cor }}>R$ {valor.toFixed(2)}</p>
    </div>
  );
}
