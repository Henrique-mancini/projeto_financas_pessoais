import React from 'react';
import CardResumo from '../components/CardResumo';
import FormLancamento from '../components/FormLancamento';
import Navbar from '../components/Navbar';
import ListaLancamentos from '../components/ListaLancamentos';
import { useFinanceiro } from '../contexts/FinanceiroContext';

export default function Dashboard() {
  const {
    saldo,
    totalReceitas,
    totalDespesas,
    adicionarLancamento,
    lancamentos
  } = useFinanceiro();

  return (
    <div>
      <Navbar />

      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <CardResumo titulo="Saldo Atual" valor={saldo} cor="#2ecc71" />
          <CardResumo titulo="Total de Receitas" valor={totalReceitas} cor="#3498db" />
          <CardResumo titulo="Total de Despesas" valor={totalDespesas} cor="#e74c3c" />
        </div>

        <FormLancamento onAdicionar={adicionarLancamento} />

        <ListaLancamentos lancamentos={lancamentos} />
      </div>
    </div>
  );
}