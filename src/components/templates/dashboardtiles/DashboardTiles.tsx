// src/components/DashboardCard.tsx

import React from 'react';

interface DashboardCardProps {
  title: string;
  value: number|string;
  delta: number;
  subtitle?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, delta , subtitle }) => {
  const isPositive = delta >= 0;

  return (
    <div className="bg-white rounded-xl border-gray-300 border shadow p-4 w-full">
      <h4 className="text-gray-700 font-semibold text-sm mb-1">{title}</h4>
      <div className="text-xl font-semibold text-gray-700">{value}</div>
      {subtitle &&
        <div className={`text-sm mt-1 flex items-center ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          <span className="mr-1">{isPositive ? '↑' : '↓'} {Math.abs(delta)}</span>
          <span className="text-gray-500">{subtitle}</span>
        </div>
      }
    </div>
  );
};

export default DashboardCard;
