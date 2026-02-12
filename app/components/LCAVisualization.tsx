'use client';

import { LCAResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface LCAVisualizationProps {
  lca: LCAResult;
}

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function LCAVisualization({ lca }: LCAVisualizationProps) {
  const breakdownData = [
    { name: 'Materials', value: lca.breakdown.materials },
    { name: 'Manufacturing', value: lca.breakdown.manufacturing },
    { name: 'Logistics', value: lca.breakdown.logistics },
    { name: 'Usage', value: lca.breakdown.usage },
    { name: 'End of Life', value: lca.breakdown.endOfLife },
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Total Carbon Footprint</h3>
        <div className="text-4xl font-bold text-primary-600">
          {lca.totalCarbonFootprint.toFixed(2)} <span className="text-2xl">kg CO₂e</span>
        </div>
        <p className="text-gray-600 mt-2">
          Recyclability Score: <span className="font-semibold">{lca.recyclabilityScore.toFixed(1)}%</span>
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Impact Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={breakdownData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'kg CO₂e', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={breakdownData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {breakdownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {lca.improvements.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Improvement Suggestions</h3>
          <ul className="space-y-2">
            {lca.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
