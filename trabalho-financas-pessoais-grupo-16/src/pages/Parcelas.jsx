import React, { useState } from 'react';
import { useParcelas } from '../contexts/ParcelasContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Parcelas() {
  const { adicionarParcela, parcelas } = useParcelas();

  const [descricao, setDescricao] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [categoria, setCategoria] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [quantidadeParcelas, setQuantidadeParcelas] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descricao || !valorTotal || !categoria || !dataInicial || !quantidadeParcelas) return;

    adicionarParcela({
      descricao,
      valorTotal: parseFloat(valorTotal),
      categoria,
      dataInicial,
      quantidadeParcelas: parseInt(quantidadeParcelas),
    });

    setDescricao('');
    setValorTotal('');
    setCategoria('');
    setDataInicial('');
    setQuantidadeParcelas('');
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: '1rem' }}>
        <h2>Controle de Compras Parceladas</h2>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '500px',
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Valor Total"
            value={valorTotal}
            onChange={(e) => setValorTotal(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />

          <input
            type="date"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Quantidade de Parcelas"
            value={quantidadeParcelas}
            onChange={(e) => setQuantidadeParcelas(e.target.value)}
            required
          />

          <button type="submit" style={{
            padding: '0.6rem',
            backgroundColor: '#2c3e50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Adicionar Parcelamento
          </button>
        </form>

        <div style={{ marginTop: '2rem' }}>
          <h3>Parcelas Cadastradas</h3>

          {parcelas.length === 0 ? (
            <p>Nenhuma parcela cadastrada.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Parcela</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {parcelas.map((p) => (
                  <tr key={p.id}>
                    <td>{p.data}</td>
                    <td>{p.descricao}</td>
                    <td>{p.categoria}</td>
                    <td>{p.numeroParcela}/{p.totalParcelas}</td>
                    <td>R$ {p.valor.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}