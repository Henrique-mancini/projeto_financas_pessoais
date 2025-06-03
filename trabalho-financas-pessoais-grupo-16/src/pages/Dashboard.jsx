import React from 'react';
import CardResumo from '../components/CardResumo';

export default function Dashboard() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Dashboard</h2>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <CardResumo titulo="Saldo Atual" valor={1200} cor="#2ecc71" />
        <CardResumo titulo="Total de Receitas" valor={3500} cor="#3498db" />
        <CardResumo titulo="Total de Despesas" valor={2300} cor="#e74c3c" />
      </div>
    </div>
  );
}
