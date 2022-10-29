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
    <div className={`flex flex-row justify-center items-center ${className}`}>
      {children}
    </div>
  );
}
  
export default Container;