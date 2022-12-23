import React from "react";

interface ContainerProps {
  className?: string,
  children?: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
  className,
  children
}) => {
  return (
    <div className={`flex flex-row justify-center py-6 items-center max-w-[100vw] overflow-hidden pl-[260px] bg-body-text w-screen min-h-screen ${className}`}>
      {children}
    </div>
  );
}
  
export default Container;