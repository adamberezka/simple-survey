import React, { ChangeEvent, FocusEventHandler, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

interface TextAreaProps {
  placeholder?: string,
  value?: string,
  disabled?: boolean,
  label?: string,
  onChange?: () => void,
  onFocus?: () => void,
  onBlur?: FocusEventHandler<HTMLTextAreaElement>,
  className?: string
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  value,
  disabled,
  label,
  onChange,
  onFocus,
  onBlur,
  className
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div>{label}</div>
      <TextareaAutosize  
        placeholder={placeholder}
        onChange={onChange}
        // value={value}
        defaultValue={""}
        spellCheck={false}
        className="w-full resize-none rounded-2xl p-2 border border-[#d7d7d7]"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}

export default TextArea;