import React, { createContext, useContext, useState } from 'react';

const ParcelasContext = createContext();

export function ParcelasProvider({ children }) {
  const [parcelas, setParcelas] = useState([]);

  const adicionarParcela = ({ descricao, valorTotal, categoria, dataInicial, quantidadeParcelas }) => {
    const novaParcela = [];
    const data = new Date(dataInicial);

    const valorParcela = parseFloat((valorTotal / quantidadeParcelas).toFixed(2));

    for (let i = 0; i < quantidadeParcelas; i++) {
      const dataParcela = new Date(data);
      dataParcela.setMonth(data.getMonth() + i);

      novaParcela.push({
        id: `${Date.now()}-${i}`,
        descricao,
        categoria,
        valor: valorParcela,
        data: dataParcela.toLocaleDateString('pt-BR'),
        numeroParcela: i + 1,
        totalParcelas: quantidadeParcelas,
      });
    }

    setParcelas((prev) => [...prev, ...novaParcela]);
  };

  return (
    <ParcelasContext.Provider value={{ parcelas, adicionarParcela }}>
      {children}
    </ParcelasContext.Provider>
  );
}

export function useParcelas() {
  return useContext(ParcelasContext);
}