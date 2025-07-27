// components/forms/FormSelectObject.tsx
import React from "react";

export type Option = {
  value: string | number;
  label: string;
};

interface Props {
  label: string;
  name: string;
  value: Option | null;
  onChange: (opt: Option | null) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const FormSelect: React.FC<Props> = ({
  label, name, value, onChange,
  options, placeholder = "Select…",
  error, required = false,
  className = "",
}) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700">
      {label}{required && <span className="text-red-500"> *</span>}
    </label>
    <select
      name={name}
      value={value?.value ?? ""}
      onChange={(e) => {
        const v = e.target.value;
        const found = options.find(o => String(o.value) === v) ?? null;
        onChange(found);
      }}
      required={required}
      className={`mt-1 block bg-white w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900
        ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm ${
        error ? "border-red-500 ring-red-500" : ""
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default FormSelect;
