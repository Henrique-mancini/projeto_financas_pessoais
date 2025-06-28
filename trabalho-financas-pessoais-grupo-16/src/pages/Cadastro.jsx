import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Cadastro() {
  const navigate = useNavigate();
  const { cadastrar } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

const handleCadastro = async (e) => {
  e.preventDefault();
  const resultado = await cadastrar(email, senha);

  if (resultado.sucesso) {
    alert('Cadastro realizado com sucesso!');
    navigate('/login');
  } else {
    setErro(resultado.mensagem);
  }
};

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f7f9fa'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center' }}>Cadastro</h2>

        <form onSubmit={handleCadastro} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '0.6rem',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{
              padding: '0.6rem',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />

          {erro && <span style={{ color: 'red' }}>{erro}</span>}

          <button type="submit" style={{
            padding: '0.6rem',
            backgroundColor: '#2c3e50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1a252f'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2c3e50'}>
            Cadastrar
          </button>
        </form>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Já tem conta? <a href="/login">Faça login</a>
        </p>
      </div>
    </div>
  );
}