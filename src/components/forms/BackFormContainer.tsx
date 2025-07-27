import React from 'react';

interface FormContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

export const BackFormContainer: React.FC<FormContainerProps> = ({ 
  title, 
  subtitle, 
  children, 
  className = '' 
}) => (
  <div className={`flex pt-12 xl:pt-18 justify-center h-full px-6 bg-white ${className} overflow-y-auto`}>
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600">{subtitle}</p>
      {children}
    </div>
  </div>
);