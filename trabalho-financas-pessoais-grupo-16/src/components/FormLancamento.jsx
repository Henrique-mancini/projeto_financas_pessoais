import React, { useState } from 'react';

export default function FormLancamento({ onAdicionar, mesSelecionado, anoSelecionado }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState('receita');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!descricao || !valor || !categoria) return;

    const data = `01/${(mesSelecionado + 1).toString().padStart(2, '0')}/${anoSelecionado}`;

    const novo = {
      descricao,
      valor: parseFloat(valor),
      categoria,
      tipo,
      data
    };

    onAdicionar(novo);

    setDescricao('');
    setValor('');
    setCategoria('');
    setTipo('receita');
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '400px'
    }}>
      <h3 style={{ textAlign: 'center' }}>Novo Lançamento</h3>

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
        />

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        />

        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>

        <button type="submit" style={{
          padding: '0.6rem',
          backgroundColor: '#2c3e50',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Adicionar
        </button>
      </form>
    </div>
  );
}