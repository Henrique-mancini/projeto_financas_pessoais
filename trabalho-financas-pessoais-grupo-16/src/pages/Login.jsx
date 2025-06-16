import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const resultado = login(email, senha);

    if (resultado.sucesso) {
      navigate('/dashboard');
    } else {
      setErro(resultado.mensagem);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
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

        <button type="submit">Entrar</button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Ainda não tem cadastro? <a href="/cadastro">Cadastre-se</a>
      </p>
    </div>
  );
}