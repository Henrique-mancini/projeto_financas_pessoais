import React, { createContext, useContext, useState } from 'react';

const FinanceiroContext = createContext();

export function FinanceiroProvider({ children }) {
  const [lancamentos, setLancamentos] = useState([]);

  const adicionarLancamento = (novo) => {
    setLancamentos((prev) => [...prev, novo]);
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
      value={{ lancamentos, adicionarLancamento, totalReceitas, totalDespesas, saldo }}
    >
      {children}
    </FinanceiroContext.Provider>
  );
}

export function useFinanceiro() {
  return useContext(FinanceiroContext);
}