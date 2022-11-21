import React, { FocusEventHandler, useState } from 'react';
import TextArea from './TextArea';

interface QuestionProps {
  updateQuestion?: (value: string) => void,
  content: string
}

const Question: React.FC<QuestionProps>= ({
  updateQuestion,
  content
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuestion && updateQuestion(e.target.value);
  }

  return (
    <div className="flex flex-col w-full">
      <TextArea onChange={(e) => handleOnChange(e)} value={content} placeholder="Your question"/>
    </div>
  );
};

export default Question;
