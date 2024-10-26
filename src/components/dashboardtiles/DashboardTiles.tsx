import React from "react";

interface DashboardTileProps {
  label: string;
  unit: string | number; // Define the type for unit
  svg?: React.ReactNode; // Use React.ReactNode for SVG or any other JSX elements
}

const DashboardTile: React.FC<DashboardTileProps> = ({ label, unit, svg }) => {
  return (
    <div className="rounded-md sm:border border-dashed border-gray-200 p-2 sm:p-4 flex bg-emerald-500 text-white">
      <div>
        <div className="flex mb-0.5 w-fit">
          <p className="text-xl font-semibold">{unit}</p>
        </div>
        <span className="text-white text-sm">{label}</span>
      </div>
      <div className="ml-auto h-fit my-auto mr-2">{svg}</div>
    </div>
  );
};

export default DashboardTile;
