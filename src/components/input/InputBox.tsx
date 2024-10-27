import React from "react";

interface InputBoxProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  required?: boolean;
  className?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
  id,
  name,
  type = "text",
  placeholder = "",
  onChange,
  value,
  required = false,
  className = "",
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required={required}
      autoComplete={type === "password" ? "current-password" : "on"}
      className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
    />
  );
};

export default InputBox;
