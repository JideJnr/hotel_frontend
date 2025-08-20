import React from 'react';

interface ScheduleCardProps {
  name: string;
  details: string;
  className?: string;
  children?: React.ReactNode;
  avatar?: React.ReactNode; // renamed from image → avatar
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ 
  name, 
  details, 
  className, 
  children, 
  avatar 
}) => {
  const cardColors = [
    'bg-pink-100 border-pink-500',
    'bg-orange-100 border-orange-500',
    'bg-sky-100 border-sky-500',
    'bg-green-100 border-green-500',
    'bg-purple-100 border-purple-500',
    'bg-yellow-100 border-yellow-500',
  ];

  const getColorForName = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return cardColors[Math.abs(hash) % cardColors.length];
  };

  const color = React.useMemo(() => getColorForName(name), [name]);

  return (
    <div className={`rounded-lg px-4 py-2 shadow-sm border-l-4 flex capitalize ${color} ${className}`}>

      <div>
        <div className="font-semibold text-sm text-gray-800 truncate " title={name}>
          {name}
        </div>
        <div className="text-sm text-gray-600">{details}</div>
      </div>
      {children && (
        <div className="flex ml-auto items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default ScheduleCard;
