import React from 'react';

interface SurveyMinatureProps {
  title: string,
  description: string,
  closeDate: Date,
  className?: string,
}

const SurveyMinature: React.FC<SurveyMinatureProps> = ({
  title,
  description,
  closeDate,
  className,
}) => {
  return (
    <div className={`flex flex-col justify-between text-body-text bg-primary cursor-pointer p-4 w-56 h-52 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-[shadow, transform] duration-300 ${className}`}>
      <div>
        <div className="text-xl font-semibold">
          {title}
        </div>
        <div className="mt-1">
          {description}
        </div>
      </div>
      <div>
        Close: {new Date(closeDate).toDateString()}
      </div>
    </div>
  );
}
  
export default SurveyMinature;