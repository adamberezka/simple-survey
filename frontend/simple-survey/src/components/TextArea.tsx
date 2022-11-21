import React, { ChangeEvent, FocusEventHandler, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

interface TextAreaProps {
  placeholder?: string,
  value?: string,
  disabled?: boolean,
  label?: string,
  onChange: (e: any) => void,
  onFocus?: () => void,
  onBlur?: FocusEventHandler<HTMLTextAreaElement>,
  className?: string,
  inputClassName?: string,
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  value,
  disabled,
  label,
  onChange,
  onFocus,
  onBlur,
  className,
  inputClassName
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div>{label}</div>
      <TextareaAutosize  
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        value={value}
        defaultValue={""}
        spellCheck={false}
        className={`w-full resize-none rounded-2xl p-2 border border-[#d7d7d7] ${inputClassName}`}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}

export default TextArea;