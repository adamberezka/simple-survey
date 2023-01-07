import React from "react";

interface LoadingProps {
  containerClassName?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  containerClassName,
  className = "w-20 h-20"
}) => {
  return (
    <div className={containerClassName}>
      <div style={{borderTopColor: 'transparent'}} className={`border-8 border-primary border-solid rounded-full animate-spin ${className}`}></div>
    </div>
  );
}

export default Loading;