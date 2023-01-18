import React from "react"
import TextArea from "./TextArea";

interface OpenAnswerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean
}

const OpenAnswer: React.FC<OpenAnswerProps> = ({
  value, 
  onChange,
  disabled
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }

  return (
    <div className={disabled ? "pointer-events-none" : ""}>
      <TextArea 
        value={value}
        onChange={(e) => handleOnChange(e)}
        placeholder="Your answer"
      />
    </div>
  );  
}

export default OpenAnswer;