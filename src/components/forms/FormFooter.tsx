import React from 'react';

export const FormFooter: React.FC<FormFooterProps> = ({
  promptText,
  linkText,
  linkPath,
  className = ''
}) => (
  <div className={className}>
    <div className="flex items-center gap-2 mt-6">
      <hr className="flex-grow border-gray-300" />
      <span className="text-sm text-gray-400">{promptText}</span>
      <hr className="flex-grow border-gray-300" />
    </div>

    <p className="text-center text-sm text-gray-600 mt-6">
      <a href={linkPath} className="text-indigo-600 hover:underline">
        {linkText}
      </a>
    </p>
  </div>
);