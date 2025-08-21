// src/components/Loading.tsx
import React from "react";

const LoadingPage: React.FC = () => {
  return (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent" />
            </div>
  );
};

export default LoadingPage;