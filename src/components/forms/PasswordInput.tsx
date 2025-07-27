import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  className?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  className = '',
  name

}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="mt-1 bg-white text-black block w-full px-4 py-2 border border-gray-300 rounded-md 
                    shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};