import React from "react";
import { useMatch } from "react-router-dom";

interface ContainerProps {
  className?: string,
  children?: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
  className,
  children
}) => {
  const loginMatch = useMatch('/login')?.pathname === '/login';

  return (
    <div className={`py-5 flex flex-row justify-center items-center max-w-[100vw] overflow-x-hidden ${!loginMatch && "pl-[260px]"} bg-body-text w-screen min-h-screen ${className}`}>
      {children}
    </div>
  );
}
  
export default Container;