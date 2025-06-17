import React from 'react';

export default function ListaLancamentos({ lancamentos }) {
  return (
    <div style={{
      marginTop: '2rem',
      backgroundColor: '#fff',
      padding: '1rem',
      borderRadius: '12px',
      maxWidth: '600px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h3>Lista de Lançamentos</h3>

      {lancamentos.length === 0 ? (
        <p>Nenhum lançamento cadastrado.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Data</th>
              <th style={{ textAlign: 'left' }}>Tipo</th>
              <th style={{ textAlign: 'left' }}>Categoria</th>
              <th style={{ textAlign: 'left' }}>Descrição</th>
              <th style={{ textAlign: 'left' }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {lancamentos.map((item, index) => (
              <tr key={index}>
                <td>{item.data}</td>
                <td>{item.tipo === 'receita' ? 'Receita' : 'Despesa'}</td>
                <td>{item.categoria}</td>
                <td>{item.descricao || '-'}</td>
                <td style={{ color: item.tipo === 'receita' ? 'green' : 'red' }}>
                  R$ {item.valor.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}