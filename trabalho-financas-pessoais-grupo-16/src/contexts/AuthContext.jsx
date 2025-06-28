import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [autenticado, setAutenticado] = useState(false);
  const [usuarioAtual, setUsuarioAtual] = useState(null);

  const API_URL = 'http://localhost:3001/usuarios';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    if (token && usuario) {
      setAutenticado(true);
      setUsuarioAtual(usuario);
    }
  }, []);

  const cadastrar = async (email, senha) => {
    try {
      const res = await axios.get(`${API_URL}?email=${email}`);
      if (res.data.length > 0) {
        return { sucesso: false, mensagem: 'Usuário já cadastrado' };
      }

      await axios.post(API_URL, { email, senha });
      return { sucesso: true };
    } catch {
      return { sucesso: false, mensagem: 'Erro ao cadastrar usuário' };
    }
  };

  const login = async (email, senha) => {
    try {
      const res = await axios.get(`${API_URL}?email=${email}&senha=${senha}`);
      if (res.data.length > 0) {
        localStorage.setItem('token', 'fake-token');
        localStorage.setItem('usuario', email);
        setAutenticado(true);
        setUsuarioAtual(email);
        return { sucesso: true };
      } else {
        return { sucesso: false, mensagem: 'Usuário ou senha inválidos' };
      }
    } catch {
      return { sucesso: false, mensagem: 'Erro ao fazer login' };
    }
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