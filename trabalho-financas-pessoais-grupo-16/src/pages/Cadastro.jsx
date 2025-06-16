import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Cadastro() {
  const navigate = useNavigate();
  const { cadastrar } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleCadastro = (e) => {
    e.preventDefault();

    const resultado = cadastrar(email, senha);

    if (resultado.sucesso) {
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } else {
      setErro(resultado.mensagem);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Cadastro de Usuário</h2>

      <form onSubmit={handleCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {erro && <span style={{ color: 'red' }}>{erro}</span>}

        <button type="submit">Cadastrar</button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Já tem conta? <a href="/login">Faça login</a>
      </p>
    </div>
  );
}