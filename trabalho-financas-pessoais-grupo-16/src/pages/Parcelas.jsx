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

      <div style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '500px'
        }}>
          <h2 style={{ textAlign: 'center' }}>Cadastro de Compras Parceladas</h2>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Valor Total"
              value={valorTotal}
              onChange={(e) => setValorTotal(e.target.value)}
              required
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
              style={inputStyle}
            />

            <input
              type="date"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
              required
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Quantidade de Parcelas"
              value={quantidadeParcelas}
              onChange={(e) => setQuantidadeParcelas(e.target.value)}
              required
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>
              Adicionar Parcelamento
            </button>
          </form>
        </div>

        <div style={{
          backgroundColor: '#fff',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '1000px'
        }}>
          <h3 style={{ textAlign: 'center' }}>Parcelas Cadastradas</h3>

          {parcelas.length === 0 ? (
            <p style={{ textAlign: 'center' }}>Nenhuma parcela cadastrada.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={thTdStyle}>Data</th>
                    <th style={thTdStyle}>Descrição</th>
                    <th style={thTdStyle}>Categoria</th>
                    <th style={thTdStyle}>Parcela</th>
                    <th style={thTdStyle}>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {parcelas.map((p) => (
                    <tr key={p.id}>
                      <td style={thTdStyle}>{p.data}</td>
                      <td style={thTdStyle}>{p.descricao}</td>
                      <td style={thTdStyle}>{p.categoria}</td>
                      <td style={thTdStyle}>{p.numeroParcela}/{p.totalParcelas}</td>
                      <td style={{
                        ...thTdStyle,
                        color: '#e74c3c'
                      }}>
                        R$ {p.valor.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

const inputStyle = {
  padding: '0.6rem',
  borderRadius: '8px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '0.6rem',
  backgroundColor: '#2c3e50',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

const thTdStyle = {
  borderBottom: '1px solid #ddd',
  padding: '0.5rem',
  textAlign: 'left'
};