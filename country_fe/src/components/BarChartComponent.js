import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const BarChartComponent = ({ data }) => {

  return (
    <div>
      <h2>Bar Chart</h2>
      <BarChart
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
        <Bar dataKey="cvalue" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
