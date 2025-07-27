import React from 'react';

const ScheduleCard: React.FC<any> = ({  name, details, className  }) => {
  const cardColors = [
  'bg-pink-100 border-pink-500',
  'bg-orange-100 border-orange-500',
  'bg-sky-100 border-sky-500',
  'bg-green-100 border-green-500',
  'bg-purple-100 border-purple-500',
  'bg-yellow-100 border-yellow-500',
];

const getColorForname = (name: string) => {
  // Simple hash function to convert name to a number
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % cardColors.length;
  return cardColors[index];
};

const color = React.useMemo(() => getColorForname(name), [name]);

  return (
    <div className={`rounded-lg p-4 shadow-sm border-l-4 ${color} ${className}`}
    
    >
      <div className="font-semibold text-gray-800 truncate" title={name}>{name}</div>
      <div className="text-sm text-gray-600">{details}</div>
    </div>
  );
};

export default ScheduleCard;
