import React from "react"

interface CheckboxProps {
  checked?: boolean,
  onClick?: () => void
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = true,
  onClick
}) => {
  return (
    <div className={`h-6 w-6 border-solid border-2 border-primary rounded-md ${checked && "bg-primary"}`}>
      {checked &&
        <div className="h-5 w-3 border-solid border-2 border-white border-t-0 border-l-0 rotate-45 -mt-1 ml-1"></div>
      }
    </div>
  );
}

export default Checkbox;