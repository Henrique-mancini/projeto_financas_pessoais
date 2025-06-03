import React, { useState } from 'react';
import CardResumo from '../components/CardResumo';
import FormLancamento from '../components/FormLancamento';

export default function Dashboard() {
  const [lancamentos, setLancamentos] = useState([]);

  const receitas = lancamentos.filter((l) => l.tipo === 'receita');
  const despesas = lancamentos.filter((l) => l.tipo === 'despesa');

  const totalReceitas = receitas.reduce((acc, item) => acc + item.valor, 0);
  const totalDespesas = despesas.reduce((acc, item) => acc + item.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  const handleAdicionar = (novo) => {
    setLancamentos([...lancamentos, novo]);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Dashboard</h2>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <CardResumo titulo="Saldo Atual" valor={saldo} cor="#2ecc71" />
        <CardResumo titulo="Total de Receitas" valor={totalReceitas} cor="#3498db" />
        <CardResumo titulo="Total de Despesas" valor={totalDespesas} cor="#e74c3c" />
      </div>

      <FormLancamento onAdicionar={handleAdicionar} />
    </div>
  );
}
