import React, { useState } from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const AreaChartComponent = ({ data }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const handlePointClick = (point) => {
    setSelectedPoint(point);
  };

  return (
    <div>
      <h2>Area Chart</h2>
      <AreaChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="decimal_1" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="cvalue"
          fill="#8884d8"
          stroke="#8884d8"
          onClick={handlePointClick}
        />
      </AreaChart>
      {selectedPoint && (
        <div>
          <p>Selected Point: {selectedPoint.decimal_1}</p>
          <button onClick={() => alert(`Saved point: ${selectedPoint.decimal_1}`)}>Save</button>
        </div>
      )}
    </div>
  );
};

export default AreaChartComponent;
