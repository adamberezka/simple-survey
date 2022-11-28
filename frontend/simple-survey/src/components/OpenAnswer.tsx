import React from "react"
import TextArea from "./TextArea";

interface OpenAnswerProps {
  value: string;
  onChange: () => void;
}

const OpenAnswer: React.FC<OpenAnswerProps> = ({
  value, 
  onChange
}) => {
  return (
    <div>
      <TextArea 
        value={value}
        onChange={onChange}
      />
    </div>
  );  
}

export default OpenAnswer;