import React, { useState } from 'react';
import CardResumo from '../components/CardResumo';
import FormLancamento from '../components/FormLancamento';
import Navbar from '../components/Navbar';
import ListaLancamentos from '../components/ListaLancamentos';
import GraficoPizza from '../components/GraficoPizza';
import Footer from '../components/Footer';
import { useFinanceiro } from '../contexts/FinanceiroContext';
import { useAuth } from '../contexts/AuthContext';
import { useParcelas } from '../contexts/ParcelasContext';

export default function Dashboard() {
  const {
    adicionarLancamento,
    lancamentos
  } = useFinanceiro();

  const { usuarioAtual } = useAuth();
  const { parcelas } = useParcelas();

  const hoje = new Date();
  const [mesSelecionado, setMesSelecionado] = useState(hoje.getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(hoje.getFullYear());

  const lancamentosDoMes = lancamentos.filter((l) => {
    const [dia, mes, ano] = l.data.split('/').map(Number);
    const dataLanc = new Date(ano, mes - 1, dia);
    return dataLanc.getMonth() === mesSelecionado && dataLanc.getFullYear() === anoSelecionado;
  });

  const parcelasDoMes = parcelas.filter((p) => {
    const [dia, mes, ano] = p.data.split('/').map(Number);
    const dataParcela = new Date(ano, mes - 1, dia);
    return dataParcela.getMonth() === mesSelecionado && dataParcela.getFullYear() === anoSelecionado;
  });

  const totalReceitas = lancamentosDoMes
    .filter(l => l.tipo === 'receita')
    .reduce((acc, l) => acc + l.valor, 0);

  const totalDespesasLancamentos = lancamentosDoMes
    .filter(l => l.tipo === 'despesa')
    .reduce((acc, l) => acc + l.valor, 0);

  const totalParcelasMes = parcelasDoMes.reduce((acc, p) => acc + p.valor, 0);

  const totalDespesas = totalDespesasLancamentos + totalParcelasMes;

  const saldo = totalReceitas - totalDespesas;

  const lancamentosComParcelas = [
    ...lancamentosDoMes,
    ...parcelasDoMes.map(p => ({
      tipo: 'despesa',
      categoria: p.categoria,
      valor: p.valor,
      descricao: `${p.descricao} (Parcela ${p.numeroParcela}/${p.totalParcelas})`,
      data: p.data
    }))
  ];

  return (
    <div>
      <Navbar />

      <div style={{
        backgroundColor: '#ecf0f1',
        padding: '1rem',
        borderRadius: '8px',
        margin: '1rem',
        textAlign: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: 0 }}>
          Olá, {usuarioAtual.split('@')[0]}! Hoje é {new Date().toLocaleDateString()}.
        </h2>
        <p>Bem-vindo(a) ao seu controle financeiro pessoal.</p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div>
          <label>Mês: </label>
          <select
            value={mesSelecionado}
            onChange={(e) => setMesSelecionado(parseInt(e.target.value))}
          >
            {[
              'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
              'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ].map((mes, index) => (
              <option key={index} value={index}>{mes}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Ano: </label>
          <input
            type="number"
            value={anoSelecionado}
            onChange={(e) => setAnoSelecionado(parseInt(e.target.value))}
            style={{ width: '80px' }}
          />
        </div>
      </div>

      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <CardResumo titulo="Saldo" valor={saldo} cor="#2ecc71" />
          <CardResumo titulo="Total de Receitas" valor={totalReceitas} cor="#3498db" />
          <CardResumo titulo="Total de Despesas" valor={totalDespesas} cor="#e74c3c" />
        </div>

        <div style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}>
          <FormLancamento onAdicionar={adicionarLancamento} 
          mesSelecionado={mesSelecionado}
          anoSelecionado={anoSelecionado}
          />
          <GraficoPizza lancamentos={lancamentosComParcelas} />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <ListaLancamentos lancamentos={lancamentosComParcelas} />
        </div>
      </div>

      <Footer />
    </div>
  );
}