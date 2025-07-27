import React from 'react';

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  rows = 3,
  error,
  required = false,
  className = ''
}) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      required={required}
      className={`mt-1 block w-full bg-white px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
        error ? 'border-red-500 ring-red-500' : ''
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);