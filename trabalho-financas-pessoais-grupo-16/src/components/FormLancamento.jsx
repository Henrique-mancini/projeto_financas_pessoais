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

  const categoriasReceita = ['Salário', 'Investimentos', 'Freelance', 'Outros'];
  const categoriasDespesa = ['Alimentação', 'Moradia', 'Transporte', 'Lazer', 'Outros'];

  return (
    <form onSubmit={handleSubmit} style={{
      marginTop: '2rem',
      backgroundColor: '#fff',
      padding: '1rem',
      borderRadius: '12px',
      maxWidth: '500px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h3>Lançar Receita ou Despesa</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>

        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
          <option value="">Selecione a categoria</option>
          {(tipo === 'receita' ? categoriasReceita : categoriasDespesa).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
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