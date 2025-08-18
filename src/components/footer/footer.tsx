import React from 'react';

interface FooterProps {
  companyName?: string;
  year?: number;
  showCopyright?: boolean;
  className?: string; // Added className prop
}

const Footer: React.FC<FooterProps> = ({
  companyName = 'Xerxex',
  year = new Date().getFullYear(),
  showCopyright = false,
  className = '', // Added default value
}) => {
  return (
    <footer className={`w-full py-8  ${className} mt-auto`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        {showCopyright && (
          <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            © {year} {companyName}. All rights reserved.
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;