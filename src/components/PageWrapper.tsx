import React, { ReactNode } from "react";

interface PageWrapperProp {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProp) => {
  return (
    <div className="w-[90%] mx-auto pt-12  pb-5 !overflow-hidden">
      {children}
    </div>
  );
};

export default PageWrapper;
