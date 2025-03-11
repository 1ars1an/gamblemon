import React from 'react';

export const StatBar = ({
  value,
  color,
}: {
  value: number;
  color: string;
}) => (
  <div className="relative w-full h-2 bg-gray-300 rounded-full overflow-hidden">
    <div
      className={`absolute top-0 left-0 h-full ${color}`}
      style={{ width: `${Math.min(value, 100)}%` }} // Capped at 100% for UI
    ></div>
  </div>
);
