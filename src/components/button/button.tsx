import React from "react";

interface ButtonProps {
  text: string;
  loadingText?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  svg?: any;
}

const Button: React.FC<ButtonProps> = ({
  text,
  loading,
  onClick,
  className,
  loadingText,
  svg,
  disabled,
}) => {
  return (
    <button
      type="button"
      className={` bg-emerald-500 text-white  !font-medium !mb-0 !text-[0.85rem] !rounded-[0.35rem] !py-2 !px-3 shadow-none w-fit min-w-20 flex ${loading ? "bg-green-500/50" : ""}  ${className}`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      <span className=" text-center flex flex-1 justify-center mr-2 ">
        {loadingText ? (loading ? loadingText : text) : text}
      </span>

      {loading ? (
        <span className="loading">
          <i className="ri-refresh-line text-[0.75rem] animate-spin"></i>
        </span>
      ) : (
        <>{svg && svg}</>
      )}
    </button>
  );
};

export default Button;
