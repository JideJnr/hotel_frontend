import React from 'react';

export const FormContainer: React.FC<FormContainerProps> = ({ 
  title, 
  subtitle, 
  children, 
  className = '' 
}) => (
  <div className={`flex items-center justify-center min-h-screen px-6 bg-white ${className}`}>
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600">{subtitle}</p>
      {children}
    </div>
  </div>
);