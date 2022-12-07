import React from "react"
import TextArea from "./TextArea";

interface OpenAnswerProps {
  value: string;
  onChange: (value: string) => void;
}

const OpenAnswer: React.FC<OpenAnswerProps> = ({
  value, 
  onChange
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }

  return (
    <div>
      <TextArea 
        value={value}
        onChange={(e) => handleOnChange(e)}
        placeholder="Your answer"
      />
    </div>
  );  
}

export default OpenAnswer;