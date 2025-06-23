import React from 'react';

export default function ListaLancamentos({ lancamentos }) {
  return (
    <div style={{
      marginTop: '2rem',
      backgroundColor: '#fff',
      padding: '1rem',
      borderRadius: '12px',
      maxWidth: '1000px',
      width: '100%',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ textAlign: 'center' }}>Lista de Lançamentos</h3>

      {lancamentos.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Nenhum lançamento cadastrado.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={thTdStyle}>Data</th>
                <th style={thTdStyle}>Tipo</th>
                <th style={thTdStyle}>Categoria</th>
                <th style={thTdStyle}>Descrição</th>
                <th style={thTdStyle}>Valor</th>
              </tr>
            </thead>
            <tbody>
              {lancamentos.map((item, index) => {
                const ehParcela = item.descricao.includes('(Parcela');
                return (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <td style={thTdStyle}>{item.data}</td>
                    <td style={thTdStyle}>
                      {item.tipo === 'receita' ? 'Receita' : 'Despesa'}
                    </td>
                    <td style={thTdStyle}>{item.categoria}</td>
                    <td style={thTdStyle}>
                      {item.descricao}{' '}
                      {ehParcela && (
                        <span style={badgeStyle}>Parcela</span>
                      )}
                    </td>
                    <td style={{
                      ...thTdStyle,
                      color: item.tipo === 'receita' ? '#2ecc71' : '#e74c3c'
                    }}>
                      R$ {item.valor.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thTdStyle = {
  borderBottom: '1px solid #ddd',
  padding: '0.6rem',
  textAlign: 'left'
};

const badgeStyle = {
  backgroundColor: '#bdc3c7',
  color: '#2c3e50',
  borderRadius: '8px',
  padding: '2px 6px',
  marginLeft: '6px',
  fontSize: '0.75rem',
  fontWeight: 'bold'
};
