import React from "react"

interface RadioButtonProps {
  checked?: boolean,
  onClick?: () => void
}

const RadioButton: React.FC<RadioButtonProps> = ({
  checked = true,
  onClick
}) => {
  return (
    <div className="h-6 w-6 border-solid border-2 border-primary rounded-full flex items-center justify-center">
      {checked &&
        <div className="h-4 w-4 bg-primary rounded-full"></div>
      }
    </div>
  );
}

export default RadioButton;