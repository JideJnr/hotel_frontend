import React from 'react';

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = true,
  error,
  className = ''
}) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="mt-1 block text-black bg-white w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);