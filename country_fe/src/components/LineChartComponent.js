import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const LineChartComponent = ({ data }) => {
  return (
    <div>
      <h2>Line Chart</h2>
      <LineChart
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
        <Line type="monotone" dataKey="cvalue" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
