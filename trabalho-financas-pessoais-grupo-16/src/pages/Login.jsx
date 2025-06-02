import React from 'react';

export default function Login() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Login</h2>
      <input type="text" placeholder="Usuário" /><br />
      <input type="password" placeholder="Senha" /><br />
      <button>Entrar</button>
    </div>
  );
}