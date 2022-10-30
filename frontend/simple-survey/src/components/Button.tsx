import React from "react";

interface ButtonProps {
  className?: string,
  children?: React.ReactNode,
  onClick: () => void,
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  onClick
}) => {
  return (
    <div onClick={() => onClick()} className={`flex flex-row justify-center items-center rounded-2xl cursor-pointer ${className}`}>
      {children}
    </div>
  );
}
  
export default Button;