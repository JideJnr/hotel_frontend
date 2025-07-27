import React from 'react';

interface FormDatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
  maxDate?: string;
  error?: string;
  className?: string;
  required?: boolean;
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  error,
  className = '',
  required = false
}) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={minDate}
      max={maxDate}
      className={`mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
        error ? 'border-red-500 ring-red-500' : ''
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);