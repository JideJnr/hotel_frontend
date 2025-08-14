import React from "react";
import Select from "react-select";

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  label: string;
  name: string;
  value: Option[]; // selected options
  onChange: (selected: Option[]) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export const FormMultiSelect: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select…",
  error,
  required = false,
  className = "",
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <Select
        isMulti
        name={name}
        options={options}
        value={value}
        onChange={(selected) => onChange(selected as Option[])}
        placeholder={placeholder}
        classNamePrefix="Select2"
        className={error ? "ring-1 ring-red-500" : ""}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

