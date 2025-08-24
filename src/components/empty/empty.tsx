import React from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data found",
  description = " We will notify you when there's an update.",
  className,
}) => {
  return (
    <div className={`flex flex-col items-center text-center p-4 ${className}`}>
      {/* Placeholder Illustration */}
      <svg
        className="mx-auto h-24 w-auto text-gray-400 "
        viewBox="0 0 178 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="27"
          y="50.5"
          width="124"
          height="39"
          rx="7.5"
          className="fill-current text-gray-200 "
        />
        <rect
          x="27"
          y="50.5"
          width="124"
          height="39"
          rx="7.5"
          className="stroke-current text-gray-300 "
        />
        <rect
          x="34.5"
          y="58"
          width="24"
          height="24"
          rx="4"
          className="fill-current text-gray-300 "
        />
        <rect
          x="66.5"
          y="61"
          width="60"
          height="6"
          rx="3"
          className="fill-current text-gray-300 "
        />
        <rect
          x="66.5"
          y="73"
          width="77"
          height="6"
          rx="3"
          className="fill-current text-gray-300 "
        />
        {/*/30 */}
        <rect
          x="19.5"
          y="28.5"
          width="139"
          height="39"
          rx="7.5"
          className="fill-current text-gray-200 "
        />
        <rect
          x="19.5"
          y="28.5"
          width="139"
          height="39"
          rx="7.5"
          className="stroke-current text-gray-300 "
        />
        <rect
          x="27"
          y="36"
          width="24"
          height="24"
          rx="4"
          className="fill-current text-gray-400 "
        />
        <rect
          x="59"
          y="39"
          width="60"
          height="6"
          rx="3"
          className="fill-current text-gray-400 "
        />
        <rect
          x="59"
          y="51"
          width="92"
          height="6"
          rx="3"
          className="fill-current text-gray-400 "
        />
        <g filter="url(#filter1)">
          <rect
            x="12"
            y="6"
            width="154"
            height="40"
            rx="8"
            className="fill-current text-gray-200 "
          />
          <rect
            x="12.5"
            y="6.5"
            width="153"
            height="39"
            rx="7.5"
            className="stroke-current text-gray-300 "
          />
          <rect
            x="20"
            y="14"
            width="24"
            height="24"
            rx="4"
            className="fill-current text-gray-400 "
          />
          <rect
            x="52"
            y="17"
            width="60"
            height="6"
            rx="3"
            className="fill-current text-gray-400 "
          />
          <rect
            x="52"
            y="29"
            width="106"
            height="6"
            rx="3"
            className="fill-current text-gray-400 "
          />
        </g>
        <defs>
          <filter
            id="filter1"
            x="0"
            y="0"
            width="178"
            height="64"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="6" />
            <feGaussianBlur stdDeviation="6" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      {/* Text */}
      <div className="mt-4">
        <p className="text-lg font-semibold text-gray-700 dark:text-neutral-200">
          {title}
        </p>
        <p className="text-sm text-gray-500 dark:text-neutral-500 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
