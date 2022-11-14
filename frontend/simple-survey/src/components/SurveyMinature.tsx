import React from 'react';

interface SurveyMinatureProps {
  className?: string,
  children?: React.ReactNode,
  title?: string
}

const SurveyMinature: React.FC<SurveyMinatureProps> = ({
  className,
  children,
  title
}) => {
  return (
    <div className={`text-body-text bg-primary flex flex-row justify-center items-center w-56 h-52 rounded-2xl ${className}`}>
      {title}
      {children}
    </div>
  );
}
  
export default SurveyMinature;