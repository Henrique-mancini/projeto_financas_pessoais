import React from 'react';

export default function CardResumo({ titulo, valor, cor }) {
  const estilo = {
    backgroundColor: cor,
    color: '#fff',
    borderRadius: '8px',
    padding: '1rem',
    minWidth: '150px',
    textAlign: 'center',
    flex: 1,
  };

  return (
    <div style={estilo}>
      <h3>{titulo}</h3>
      <p style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>R$ {valor.toFixed(2)}</p>
    </div>
  );
}
