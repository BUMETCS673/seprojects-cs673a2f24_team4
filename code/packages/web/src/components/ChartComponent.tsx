import React from 'react';

interface ChartProps {
  data: Array<{ label: string; value: number }>;
  title: string;
}

const ChartComponent: React.FC<ChartProps> = ({ data, title }) => {
  return (
    <div className="chart-container" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>{title}</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index} style={{ margin: '10px 0' }}>
            <span style={{ fontWeight: 'bold' }}>{item.label}:</span> {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChartComponent;
