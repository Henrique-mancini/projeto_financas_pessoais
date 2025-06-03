import React, { useState } from 'react';

export default function FormLancamento({ onAdicionar }) {
  const [tipo, setTipo] = useState('receita');
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoria || !valor || isNaN(valor)) return;

    const novoLancamento = {
      tipo,
      categoria,
      valor: parseFloat(valor),
      descricao,
      data: new Date().toLocaleDateString(),
    };

    onAdicionar(novoLancamento);
    setCategoria('');
    setValor('');
    setDescricao('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <h3>Lançar Receita ou Despesa</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>

        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descrição (opcional)"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button type="submit">Adicionar</button>
      </div>
    </form>
  );
}
