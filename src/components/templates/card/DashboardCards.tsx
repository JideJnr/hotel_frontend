import React from 'react';

const ScheduleCard: React.FC<any> = ({  title, time, className  }) => {
  const cardColors = [
  'bg-pink-100 border-pink-500',
  'bg-orange-100 border-orange-500',
  'bg-sky-100 border-sky-500',
  'bg-green-100 border-green-500',
  'bg-purple-100 border-purple-500',
  'bg-yellow-100 border-yellow-500',
];

const getColorForTitle = (title: string) => {
  // Simple hash function to convert title to a number
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use absolute value and modulo to get a consistent index
  const index = Math.abs(hash) % cardColors.length;
  return cardColors[index];
};

const color = React.useMemo(() => getColorForTitle(title), [title]);

  return (
    <div className={`rounded-lg p-4 shadow-sm border-l-4 ${color} ${className}`}>
      <div className="font-semibold text-gray-800 truncate" title={title}>{title}</div>
      <div className="text-sm text-gray-600">{time}</div>
    </div>
  );
};

export default ScheduleCard;
