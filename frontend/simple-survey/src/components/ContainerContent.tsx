import React from "react"

interface ContainerContentProps {
  children: React.ReactNode
  className?: string
}

const ContainerContent: React.FC<ContainerContentProps> = ({
  children,
  className
}) => {
  return (
    <div className={`py-6 px-12 min-h-[94vh] w-[95%] shadow-lg border-0 border-[#bbbbbb] bg-white rounded-2xl relative ${className}`}>
      {children}
    </div>
  );
}

export default ContainerContent;