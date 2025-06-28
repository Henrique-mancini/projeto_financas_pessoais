import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ParcelasContext = createContext();

export function ParcelasProvider({ children }) {
  const [parcelas, setParcelas] = useState([]);
  const API_URL = 'http://localhost:3001/parcelas';

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setParcelas(res.data))
      .catch(err => console.error('Erro ao carregar parcelas:', err));
  }, []);

  const adicionarParcela = async ({ descricao, valorTotal, categoria, dataInicial, quantidadeParcelas }) => {
    const data = new Date(dataInicial);
    const valorParcela = parseFloat((valorTotal / quantidadeParcelas).toFixed(2));

    for (let i = 0; i < quantidadeParcelas; i++) {
      const dataParcela = new Date(data);
      dataParcela.setMonth(dataParcela.getMonth() + i);

      const nova = {
        descricao: `${descricao} (Parcela ${i + 1}/${quantidadeParcelas})`,
        categoria,
        valor: valorParcela,
        data: dataParcela.toLocaleDateString('pt-BR')
      };

      try {
        const res = await axios.post(API_URL, nova);
        setParcelas((prev) => [...prev, res.data]);
      } catch (err) {
        console.error('Erro ao salvar parcela:', err);
      }
    }
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