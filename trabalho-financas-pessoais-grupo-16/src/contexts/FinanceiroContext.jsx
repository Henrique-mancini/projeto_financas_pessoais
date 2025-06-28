import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const FinanceiroContext = createContext();

export function FinanceiroProvider({ children }) {
  const [lancamentos, setLancamentos] = useState([]);
  const API_URL = 'http://localhost:3001/lancamentos';

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setLancamentos(res.data))
      .catch(err => console.error('Erro ao carregar lançamentos:', err));
  }, []);

  const adicionarLancamento = (novo) => {
    axios.post(API_URL, novo)
      .then(res => setLancamentos((prev) => [...prev, res.data]))
      .catch(err => console.error('Erro ao adicionar lançamento:', err));
  };

  const totalReceitas = lancamentos
    .filter((l) => l.tipo === 'receita')
    .reduce((acc, l) => acc + l.valor, 0);

  const totalDespesas = lancamentos
    .filter((l) => l.tipo === 'despesa')
    .reduce((acc, l) => acc + l.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  return (
    <FinanceiroContext.Provider
      value={{
        lancamentos,
        adicionarLancamento,
        totalReceitas,
        totalDespesas,
        saldo
      }}
    >
      {children}
    </FinanceiroContext.Provider>
  );
}

export function useFinanceiro() {
  return useContext(FinanceiroContext);
}