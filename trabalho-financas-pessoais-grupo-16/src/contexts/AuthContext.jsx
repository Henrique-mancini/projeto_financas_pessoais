import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [autenticado, setAutenticado] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAtual, setUsuarioAtual] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    if (token && usuario) {
      setAutenticado(true);
      setUsuarioAtual(usuario);
    }
  }, []);

  const cadastrar = (email, senha) => {
    const jaExiste = usuarios.find((u) => u.email === email);
    if (jaExiste) {
      return { sucesso: false, mensagem: 'Usuário já cadastrado' };
    }
    const novoUsuario = { email, senha };
    setUsuarios([...usuarios, novoUsuario]);
    return { sucesso: true };
  };

  const login = (email, senha) => {
    const existe = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );
    if (existe) {
      localStorage.setItem('token', 'fake-token');
      localStorage.setItem('usuario', email);
      setAutenticado(true);
      setUsuarioAtual(email);
      return { sucesso: true };
    }
    return { sucesso: false, mensagem: 'Usuário ou senha inválidos' };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setAutenticado(false);
    setUsuarioAtual(null);
  };

  return (
    <AuthContext.Provider
      value={{ autenticado, login, logout, cadastrar, usuarioAtual }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}