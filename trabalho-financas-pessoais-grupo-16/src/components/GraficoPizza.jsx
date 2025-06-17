import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function GraficoPizza({ lancamentos }) {
  const categorias = {};

  lancamentos.forEach((l) => {
    const key = `${l.tipo} - ${l.categoria}`;
    if (!categorias[key]) {
      categorias[key] = l.valor;
    } else {
      categorias[key] += l.valor;
    }
  });

  const data =
    Object.keys(categorias).length > 0
      ? Object.keys(categorias).map((key) => ({
          name: key,
          value: categorias[key],
        }))
      : [{ name: 'Sem Dados', value: 1 }];

  const COLORS = [
    '#2ecc71', '#3498db', '#e74c3c', '#9b59b6',
    '#f1c40f', '#e67e22', '#1abc9c', '#34495e',
    '#7f8c8d', '#d35400', '#16a085', '#c0392b'
  ];

  const NEUTRAL_COLOR = '#bdc3c7';

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '1rem',
      borderRadius: '12px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      minWidth: '500px',
      maxWidth: '700px',
      height: '400px',
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem'
    }}>
      <div style={{ width: '60%', height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.name === 'Sem Dados'
                      ? NEUTRAL_COLOR
                      : COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '40%', maxHeight: '100%', overflowY: 'auto' }}>
        <h4 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Legenda</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {data.map((entry, index) => (
            <li key={index} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <div style={{
                width: '16px',
                height: '16px',
                backgroundColor: entry.name === 'Sem Dados'
                  ? NEUTRAL_COLOR
                  : COLORS[index % COLORS.length],
                borderRadius: '4px',
                marginRight: '8px'
              }}></div>
              <span>
                {entry.name === 'Sem Dados'
                  ? 'Nenhum lançamento'
                  : `${entry.name} — R$ ${entry.value.toFixed(2)}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}